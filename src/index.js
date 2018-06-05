const Discord = require('discord.js');

const bot = new Discord.Client();

const token = 'NDUxNjQyNDI2NTIwNTAyMjcz.DfExrA.IGwQnaSqmS28aBPD21BIx0AjQAk';
const myId = '451642426520502273';
const responseObject = {
    ".stats": "OMEGALUL",
    "kid": "kid in *current year*, LUL",
    "overwatch": "People still play overwatch? Trihard 7",
    "ow": "People still play overwatch? Trihard 7"
}
bot.on('ready', () => {
    console.log('Ready to bm!');
});


bot.on('message', message => {
    // No self-reply
    if (message.author.bot) return;

    //Check for command and stats +target
    if (message.content.includes('ez')) {
        var stat = '.stats'
        var lul = 'OMEGALUL'
        message.channel.send(stat + lul)

    }
    if (message.author.id == myId){
        // Purge function from github --> "https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/examples/miscellaneous-examples.md"
        const user = message.mentions.users.first();
        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        if (!amount) return message.reply('Must specify an amount to delete!');
        if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
        message.channel.fetchMessages({
        limit: amount,
        }).then((messages) => {
        if (user) {
        const filterBy = user ? user.id : Client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        });
    }

// If a message includes any commands from the array, post the value associated with it.

    if (responseObject[message.content]) {
        message.channel.send(responseObject[message.content]);
    }

});



bot.login(token);