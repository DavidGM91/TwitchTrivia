const tmi = require('tmi.js');
const trivia = require('./Trivia.js');
const fs = require('fs');
const readline = require('readline');
var config;
var client;

if(!fs.existsSync('./config.json'))
{
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  var _config = new Object();
  console.log("No configuration file found, please complete the following to create yours.");
  rl.question("The username of your bot: ", function(res){
    _config.username = res;
    rl.question("The oAuth token of your bot: ", function(res){
      _config.token = res;
      rl.question("The channels where you want your bot to work separated by spaces if more than one: ", function(res){
        _config.channels = res.split(" ");
        rl.question("The command to request a question(starting with !): ", function(res){
          _config.questionComand = res;
          rl.question("The command to answer a question(starting with !): ", function(res){
            _config.answerComand = res;
            console.log("Congratulations you've completed the configuration of your bot");
            _config.defaultCategories = ["General"];
            _config.customCategories = new Object();
            config = _config;
            fs.writeFile('config.json',JSON.stringify(_config,null,2), function (err){
              console.log('Saved new configuration file.');
            });
            client = connect_to_Twitch();
          });
        });
      });
    });
  });
}
else
{
  config = require('./config.json');
  client = connect_to_Twitch();
}

function connect_to_Twitch()
{
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
  return client;
}

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
        if (msg[0] === config.questionComand)
        {
           trivia.nueva(user, target.substr(1), function (texto){
                client.say(target, texto );
            });    
        }
        else if (msg[0] === config.answerComand)
        {
            trivia.responde(user, msg[1], function (texto){
                client.say(target, texto );
            });  
        }
    }
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}