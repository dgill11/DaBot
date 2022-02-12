const commands = ["-help", "-joke", "-commandslist"];
const joke = require('./joke');
const help = require ('./help');

module.exports = async (message) => {
    if (message.author.bot == true) { 
        return;
    }
    if (message.author.bot == false) {
        var args = message.content.split('');
        let indicator = args[0];
        if (indicator == "-" && commands.indexOf(message) == -1) {
            message.reply(`<@${message.author.id}>, this is not a valid command, please use **-help** to see all valid commands.` )
            console.log("Invalid command by" + " " + message.author + " " + "at" + " " + new Date()); 
        }
        if (indicator == "-")
    }
}