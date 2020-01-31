const preguntas = require('./questions.json');
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
        if(estado[user] != undefined && estado[user] != -1){
            //Informar de que ha perdido la pregunta.
            texto += preguntas.existente;
        }

        //Obtener nueva pregunta.
        const rand = Math.floor(Math.random() * preguntas.preguntas.length);
        pregunta = preguntas.preguntas[rand];

        //Mezclar opciones y correcta.
        var correcta = pregunta.opciones[0]; 
        var opciones = pregunta.opciones;
        shuffle(opciones);
        const isRight = (element) => element == correcta;

        //Guardar estado del usuario
        estado[user] = {numCorrecta: (opciones.findIndex(isRight) +1),  strCorrecta: correcta};

        //Devolver string para el chat.
        texto += pregunta.pregunta +" "+ preguntas.opciones +" "+ numera(opciones);
        callback(texto);
    },
    responde: (user,respuesta,callback) => {
        text = "/me ";
        if(estado[user].numCorrecta == respuesta){
            text += preguntas.correcta.replace('#name', user).replace('#answer', estado[user].strCorrecta);
        }
        else{
            text += preguntas.erronea.replace('#name', user).replace('#answer', estado[user].strCorrecta);
        }
        estado[user].numCorrecta = -1;
        callback(text);
    },
    puntuacion: (user) => {
        //TODO
    }
}

