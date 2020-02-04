const questions = require('./questions.json');
const config = require('./config.json');
const sqlite3 = require('sqlite3');

var estado = new Object();

var db = new sqlite3.Database('./puntos.sqlite3', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

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

function aleatoria(_array) {
    var array = _array.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {
    nueva: (user, target, callback) => {
        var texto = "/me ";
        //Mirar si ya existe una pregunta activa
        if(estado[user] == undefined)
            estado[user] = {numCorrecta: -1,  strCorrecta: ""};
        if(estado[user].numCorrecta != -1){
            //Informar de que ha perdido la pregunta.
            texto += questions.unanswered;
        }

        //Obtener categoría.
        let categories = config.defaultCategories || ["General"];
        if(config.customCategories.hasOwnProperty(target)){
            categories = categories.concat(config.customCategories[target]);
        }
        let randCat = Math.floor(Math.random() * categories.length);
        let category = categories[randCat];

        //Obtener pregunta
        let rand = Math.floor(Math.random() * questions.category[category].questions.length);
        let question = questions.category[category].questions[rand];

        //Mezclar opciones y correcta.
        let correcta = question.options[0]; 
        let options = aleatoria(question.options);
        const isRight = (element) => element == correcta;

        //Guardar estado del usuario
        estado[user] = {
            numCorrecta: (options.findIndex(isRight) +1),  
            strCorrecta: correcta,
            maxPreg: question.options.length
        };

        //Devolver string para el chat.
        texto += question.question.replace('#name', user) +" "+ questions.options +" "+ numera(options);
        callback(texto);
    },
    responde: (user,resp,callback) => {
        //Mirar si ya existe una pregunta activa
        if(estado[user] == undefined)
            estado[user] = {numCorrecta: -1,  strCorrecta: ""};
        if(estado[user].numCorrecta == -1){
            //Informar de que no hay ninguna pregunta
            callback("/me "+questions.noQuestion.replace('#name', user));
            return;
        }

        var respuesta = parseInt(resp)
        text = "/me ";
        if(resp > 0 && resp <= estado[user].maxPreg)
        {
            if(estado[user].numCorrecta == respuesta){
                text += questions.right.replace('#name', user).replace('#answer', estado[user].strCorrecta);
            }
            else{
                text += questions.wrong.replace('#name', user).replace('#answer', estado[user].strCorrecta);
            }
            estado[user].numCorrecta = -1; 
        }
        else 
        {
            text += questions.nonNumeralResponse.replace('#name', user);
        }
        
        
        callback(text);
    },
    puntuacion: (user) => {
        //TODO
    }
}

