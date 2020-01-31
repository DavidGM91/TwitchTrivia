const questions = require('./questions.json');
const shuffle = require('shuffle-array')

var estado = new Object();

function numera(array)
{
    var text = "";
    var count = 1;
    array.forEach(element => {
        if(count != 1) text += " | "
        text += count + "-" + element;
        count ++;
    });
    return text;
}

module.exports = {
    nueva: (user, callback) => {
        var texto = "/me ";
        //Mirar si ya existe una pregunta activa
        if(estado[user] == undefined)
            estado[user] = {numCorrecta: -1,  strCorrecta: ""};
        if(estado[user].numCorrecta != -1){
            //Informar de que ha perdido la pregunta.
            texto += questions.unanswered;
        }

        //Obtener nueva pregunta.
        const rand = Math.floor(Math.random() * questions.questions.length);
        question = questions.questions[rand];

        //Mezclar opciones y correcta.
        var correcta = question.options[0]; 
        var options = question.options;
        shuffle(options);
        const isRight = (element) => element == correcta;

        //Guardar estado del usuario
        estado[user] = {numCorrecta: (options.findIndex(isRight) +1),  strCorrecta: correcta};

        //Devolver string para el chat.
        texto += question.question +" "+ questions.options +" "+ numera(options);
        callback(texto);
    },
    responde: (user,respuesta,callback) => {
        //Mirar si ya existe una pregunta activa
        if(estado[user] == undefined)
            estado[user] = {numCorrecta: -1,  strCorrecta: ""};
        if(estado[user].numCorrecta == -1){
            //Informar de que ha perdido la pregunta.
            callback("/me "+questions.noQuestion.replace('#comand', questions.questionComand));
            return;
        }

        text = "/me ";
        if(estado[user].numCorrecta == respuesta){
            text += questions.right.replace('#name', user).replace('#answer', estado[user].strCorrecta);
        }
        else{
            text += questions.wrong.replace('#name', user).replace('#answer', estado[user].strCorrecta);
        }
        estado[user].numCorrecta = -1;
        callback(text);
    },
    puntuacion: (user) => {
        //TODO
    }
}

