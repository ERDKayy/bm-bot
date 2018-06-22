const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

const token = 'NDUxNjQyNDI2NTIwNTAyMjcz.DfExrA.IGwQnaSqmS28aBPD21BIx0AjQAk'
const myId = '169678656195526657';
const prefix = '!';

const eightBall = [
    'Yes',
    'Maybe',
    'Unsure',
    'Try again',
    'Signs point to yes',
    'You don\'t want to know',
    'You can try...'
]

const responseObject = {
    ".stats": "OMEGALUL",
    "kid": "kid in *current year*, LUL",
    "overwatch": "People still play overwatch? Trihard 7",
    "ow": "People still play overwatch? Trihard 7"
}

function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}

client.on('ready', () => {
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });

client.on("guildDelete", guild => {
// this event triggers when the bot is removed from a guild.
console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
client.user.setActivity(`Serving ${client.guilds.size} servers`);
});



client.on('message', async message => {
    if (message.author.bot) return; // ignore commands sent by bots.

    if(message.attachments != 0) {
        console.log(message.attachments)
        console.log('Caught an embeded IMAGE!!!!!!');
        message.channel.send(`:rage: No images in general.`);

    }


    if(message.content.indexOf(config.prefix) !== 0) return;
  
    // Here we separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args[0].toLowerCase();



    if(command == "ping") {
        console.log('test')
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      }


    if (command == "cookie") { // creates the command cookie
        if (args[1]) message.channel.send(message.author.toString() + " has given " + args[1].toString() + " a cookie! :cookie:") // sends the message saying someone has given someone else a cookie if someone mentions someone else
        else message.channel.send("Who do you want to send a cookie to? :cookie: (Correct usage: !cookie @username)") // sends the error message if no-one is mentioned
    }

    if (command == "8ball") { // creates the command 8ball
        if (args[1] != null) message.reply(eightball[Math.floor(Math.random() * eightball.length).toString(16)]); // if args[1], post random answer
        else message.channel.send("Ummmm, what is your question? :rolling_eyes: (Correct usage: *8ball [question])"); // if not, error
    }

    if(command === "purge") {
        var isNum = false;
        if (!isNaN(args[1])) {
            let messagecount = parseInt(args[1]);
            isNum = true;
        } else {
            let messagecount = parseInt(args[2]);
        }

        var deletedMessages = -1;

        message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
            if (isNum == true) {
                messages.forEach(m => {
                    m.delete().catch(console.error);
                    deletedMessages++;
                });
            } else {
                messages.forEach(m => {
                    if (m.author.id == args[1].toString) {
                        m.delete().catch(console.error);
                        deletedMessages++;
                    }
                });
            }
        }).then(() => {
                if (deletedMessages === -1) deletedMessages = 0;
                message.channel.send(`:white_check_mark: Purged \`${deletedMessages}\` messages.`)
                    .then(m => m.delete(2000));
        }).catch(console.error);

    }

    if(command === "botpurge") {
        let messagecount = parseInt(args[1]) || 1;

        var deletedMessages = -1;

        message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
            messages.forEach(m => {
                if (m.author.id == 451642426520502273) {
                    m.delete().catch(console.error);
                    deletedMessages++;
                }
            });
        }).then(() => {
                if (deletedMessages === -1) deletedMessages = 0;
                message.channel.send(`:white_check_mark: Purged \`${deletedMessages}\` messages.`)
                    .then(m => m.delete(2000));
        }).catch(console.error);
    }



// If a message includes any commands from the array, post the value associated with it.

    if (responseObject[message.content]) {
        message.channel.send(responseObject[message.content]);
    }


});



client.login(token);