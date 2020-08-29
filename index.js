const Discord = require("discord.js");
const {prefix, token, bot_info} = require("./config.json");
const client = new Discord.Client();
const fs = require('fs');
const { error } = require("console");
const schedule = require('node-schedule');
let current_schedules = {}

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));


client.on('ready', () => {
    console.log("listening.....");
});


client.on('message', (message) => {
    console.log(message.content);
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    console.log(args)
    console.log(command);

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, schedule, current_schedules)
    }catch(err){
        console.error(err);
        message.reply('There was an issue executing that command.')
    }

});

client.login(token);


for (const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}
console.log('here');