
//
// Fallback Command
//
module.exports = function (controller) {

    controller.on( 'message,direct_message', async( bot, message ) => {

        let markDown = `Desculpe, eu não entendi!  \nTente ${ controller.checkAddMention( message.roomType, 'ajuda' ) }`;
            
        await bot.reply( message, { markdown: markDown } );
    });
}