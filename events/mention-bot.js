const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('..');


client.on("messageCreate", async message => {
  const prefix = await db.get(`guild_prefix_${message.guild.id}`) || client.prefix;
  
    if (message.author.bot) return;
    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return;
  
    if(message.channel.type !== 0) return;
    if (message.mentions.has(client.user.id)) {
        message.channel.send(`Ola ${message.author.username} meu prefixo neste servidor é ${prefix}`);
    }
});