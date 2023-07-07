const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const os = require('os');

const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "eval",
    aliases: ['ev'],
run: async(client, message, args) => {
try {
 const allowedIds = [ "769969803526930504", "955095844275781693" ]
    if (!allowedIds.includes(message.author.id)) {
      return message.reply('Desculpe, você não tem permissão para usar este comando.');
    }

    if (!args[0]) return message.channel.send('**( ❌ ) Digite algo para que eu possa executar**')
    let entrada = args.join(" ");
    let saida = eval(entrada);
    if (typeof saida !== "string")
    saida = require("util").inspect(saida, { depth: 0 });
      const embed = new EmbedBuilder()
        .setTitle('**( 🎠 ) Eval**')
    .setColor('#303136')
    .addFields(
        { name: `**Entrada:**`, value: `\`\`\`js\n${entrada}\`\`\`` },
        { name: `**Saída:**`, value: `\`\`\`js\n${saida}\`\`\`` }
    )
    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` })
    message.channel.send({ embeds: [embed] });
} catch (err) {
        let entrada = args.join(" ");
    const embed = new EmbedBuilder()
    .setTitle('**( 🎠 ) Eval**')
    .setColor('#303136')
    .addFields(
        { name: `**Entrada:**`, value: `\`\`\`js\n${entrada}\`\`\`` },
        { name: `**Saída:**`, value: `\`\`\`js\n${err}\`\`\`` }
    )
    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` })
    message.channel.send({ embeds: [embed] });    
}
}}