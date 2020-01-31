const tmi = require('tmi.js');
const config = require('./config.json');
const trivia = require('./Trivia.js');

// Define configuration options
const opts = {
  identity: {
    username: config.username,
    password: config.token
  },
  channels: config.channels
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msgraw, self) {
    if (self) { return; } // Ignore messages from the bot

    //Si no es un comando lo ignoramos
    if(msgraw[0] === '!')
    {
        // Remove whitespace from chat message
        const msg = msgraw.split(" ");
        const user = context['display-name'];
        // If the command is known, let's execute it
        if (msg[0] === '!pregunta')
        {
           trivia.nueva(user, function (texto){
                client.say(target, texto );
            });   
        }
        else if (msg[0] === '!respuesta')
        {
            if(typeof parseInt(msg[1]) == "number")
            {
                trivia.responde(user, msg[1], function (texto){
                    client.say(target, texto );
                });  
            }
            else 
            {
                client.say("/me Debes responder el número de la respuesta.");
            }
        }
    }
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}