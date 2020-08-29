const Discord = require("discord.js");
const {prefix, token} = require("./config.json");
const client = new Discord.Client();

client.on('ready',
            ()=>{
                console.log("listening.....");
            });


client.on('message',
            (message)=>{
                console.log(message.content);
                if(message.content.startsWith(prefix)){
                    console.log("caught it");
                }
            });

client.login(token);