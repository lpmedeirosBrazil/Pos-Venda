const axios = require("axios");
const fs = require('fs');

let rawData = fs.readFileSync('pessoas.json');

console.log(rawData);
let pessoas = JSON.parse(rawData);


module.exports = function (controller) {

    setInterval(function teste() {
        var data = new Date();
        var dia_Semana = data.getDay();
        var horas = data.getHours();
        var min = data.getMinutes();


        //Para sexta-feira (dia = 5)
        console.log(dia_Semana);

        if (dia_Semana == 5 && horas == 17 && min == 41) {

            for (let i = 0; i < pessoas.length; i++) {
                let email = pessoas[i].email;
                //  stringEmail = JSON.parse(email),
                console.log(email);

                axios.post('https://api.ciscospark.com/v1/messages', {
                    "toPersonEmail": email,
                    "text": "Bom dia! Quantas horas de pós vendas foram feitas essa semana? Digite pos para iniciar! \n Lembrando que terá até às 18h para enviar a sua mensagem"
                }, {
                    headers: {
                        Authorization: 'Bearer YzhkOTEwOTMtMmM0OC00NjkwLWE3ZDUtMzc0ZDIyY2Q2YWJjNDY4NmZjMjEtYmVi_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f'
                    }
                }).then((response) => {
                    //console.log(response);
                }).catch((e) => {
                    console.log(e);
                });
                console.log("mensagem enviada para : " + email);
            }

        } else {
            console.log("não foi");
        }
    }, 60000);

}