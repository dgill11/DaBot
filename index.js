require("dotenv").config();
const { Client, Intents, Message } = require('discord.js');
const { ClientApplicationAssetTypes } = require('discord.js/src/util/Constants');
const commands = ["-help", "-joke", "-commands"];
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]});
const channelId = '923809298784608268';
var memberCountServer = {};

const membercounter = async (client) => {
    const guild = await client.guilds.cache.get('879156561560358963');
    setInterval(() => {
        const memberCount = guild.memberCount;
        memberCountServer.people = memberCount;
    }, 5000)
}

const spamchecker = async (msg) => {
    const messageTotal = await msg.channel.messages.fetch();
    let specificMessages = messageTotal.filter((msg) => msg.author.id);
    let secondLastMessage = specificMessages.at(-2); // Second Last Message being Collected 
    let secondTimeCreated = secondLastMessage.createdTimestamp;
    let lastMessage = specificMessages.at(-1); // Last Message being collected 
    let lastTimeCreated = lastMessage.createdTimestamp;
    let spam = (secondTimeCreated - lastTimeCreated);  // Difference in timestamp between two messages 
    if (spam < 250) {
        console.log(spam);
        lastMessage.reply("Stop spamming.");
    }    // Reply to the ID of the last message, and then add mute role // 
 }


// Sends welcome message to new guild members 

client.on('guildMemberAdd', member => {
    console.log("New member");
    const welcomemess = [`Yea Yea, welcome <@${member.id}> to the server.`,
    `I needed some shit with some BOP in it, welcome <@${member.id}> to the server.`, `Welcome <@${member.id}> to the server.`];
    const messagefinal = welcomemess[Math.floor(Math.random()*welcomemess.length)];
    console.log(messagefinal);

    let ordinalcheck = memberCountServer.people % 10;
    if (ordinalcheck = 1) {
        ordinal = "st";
    }
    if (ordinalcheck = 2) {
        ordinal = "nd"
    }
    if (ordinalcheck = 3) {
        ordinal = "rd";
    }
    else {
        ordinal = "th"; 
    }
    const messagecount = "You are the" + " " + memberCountServer.people + ordinal + " " + "member in this server";
    member.guild.channels.cache.get(channelId).send(messagefinal + messagecount); 
})

// Constanty Updates Membercount 

client.once('ready', () =>  {
    console.log("Dabot is on");
    membercounter(client);
});

// Responsible for checking any false commands 

client.on("message", (message) => {
    if (message.author.bot == true) { 
        return;
    }
    if (message.author.bot == false) {
        var args = message.content.split('');
        let indicator = args[0];
        console.log(commands.indexOf(message));
        if (indicator == "-" && commands.indexOf(message) == -1) {
            message.reply(`<@${message.author.id}>, this is not a valid command, please use **-help** to see all valid commands.` )
            console.log("Invalid command by" + " " + message.author + " " + "at" + " " + new Date()); 
        }
    }
})

// Checking ifthe author of the message is a human, and also inside joke 

client.on("message", msg => {
    if (msg.content === "burger") {
        msg.reply("fob shipping point");
        console.log("burgerreloaded");
    }
    if  (msg.author.bot == false) {
        console.log("Human sent message");
        spamchecker(msg);
    }
})

// API Key

client.login(process.env.KEY);