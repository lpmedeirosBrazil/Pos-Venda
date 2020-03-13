const {
    BotkitConversation
} = require('botkit');

module.exports = function (controller) {

    const convo = new BotkitConversation('coffee_chat', controller);

    convo.ask('Deseja iniciar (sim / não / cancelar)', [{
            pattern: 'sim|si|yeah|siim|s',
            handler: async (response, convo) => {

                await convo.gotoThread('ask_drink');
            }
        },
        {
            pattern: 'no|não|non|nein|na|noa',
            handler: async (response, convo) => {

                await convo.gotoThread('confirm');
            }
        },
        {
            pattern: 'cancelar|cancela|stop|exit',
            handler: async (response, convo) => {

                await convo.gotoThread('cancel');
            }
        },
        {
            default: true,
            handler: async (response, convo) => {
                await convo.gotoThread('bad_response');
            }
        }
    ])

    convo.addMessage({
        text: 'Tudo bem faremos outro horário',
        action: 'complete'
    }, 'confirm');

    convo.addMessage({
        text: 'Beleza, cancelando',
        action: 'complete'
    }, 'cancel');

    convo.addMessage({
        text: 'Desculpe, mas não entendi!\nDica: digite "sim", "não", ou "cancelar"',
        action: 'default'
    }, 'bad_response');

    convo.addMessage({
        text: 'Desculpe, mas esse valor é inválido.\nDica para 2 horas. 2:00 - 2,0 - 2 ou `cancelar`',
        action: 'default'
    }, 'bad_response02');

    // Thread: ask for Commercial
    convo.addQuestion('Quantas horas foram gastas em pós vendas de Commercial?', [{
            pattern: /^\d+,\d$/,
            pattern: /^\d/,
            handler: async (response, convo) => {

                await convo.gotoThread('ask_drink2');
            }

        },
        {
            default: true,
            handler: async (response, convo) => {
                await convo.gotoThread('bad_response02');
            }
        }

    ], 'statedDrink', 'ask_drink');

    
    // Thread: ask for Enterprise
    convo.addQuestion('Quantas horas foram gastas em pós vendas de Enterprise?', [{
            pattern: /^\d+,\d$/,
            pattern: /^\d/,
            handler: async (response, convo) => {

                await convo.gotoThread('ask_drink3');
            }

        },
        {
            default: true,
            handler: async (response, convo) => {
                await convo.gotoThread('bad_response02');
            }
        }

    ], 'statedDrink', 'ask_drink2');

    
    // Thread: ask for Public Sector
    convo.addQuestion('Quantas horas foram gastas em pós vendas de Public Sector?', [{
            pattern: /^\d+,\d$/,
            pattern: /^\d/,
            handler: async (response, convo) => {

                await convo.gotoThread('ask_drink4');
            }

        },
        {
            default: true,
            handler: async (response, convo) => {
                await convo.gotoThread('bad_response02');
            }
        }
    ], 'statedDrink', 'ask_drink3');

    convo.addQuestion('As respostas acima estão corretas? (sim ou não)', [{
            pattern: "sim|si|s",
            handler: async (response, convo) => {
                await convo.gotoThread('ask_end');
            },


        },

        {
            pattern: "não|na|nao",
            handler: async (response, convo) => {

                await convo.gotoThread('ask_drink');
            }
        }


    ], 'statedDrink', 'ask_drink4');

    convo.addMessage({
        text: 'Obrigado! As respostas foram enviadas. Bom final de semana!',
        action: 'complete'
    }, 'ask_end');


    controller.addDialog(convo);

    controller.hears('pos', 'message,direct_message', async (bot, message) => {

        await bot.beginDialog('coffee_chat');
    });

    controller.commandHelp.push({
        command: 'pos',
        text: 'Responder o tempo gasto de pós vendas em cada segmento'
    });


}

