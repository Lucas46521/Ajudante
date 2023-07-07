const { EmbedBuilder } = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

module.exports = {
    name: 'emoji',
    description: 'Mostra informações do emoji solicitado',
    run: async (client, message, args) => {
        const arg = args[0];
        if (!arg) return message.channel.send('**( ❌ ) Digite algum emoji para ver as informações.**');

        const regex = /^(?:<a?:)?(\w{2,32}):(\d{17,19})>?$/;
        const match = arg.match(regex);

        let emoji;
        if (match) {
            // Se o argumento é uma string de emoji com formato personalizado, use o ID do emoji
            emoji = message.guild.emojis.cache.get(match[2]);
        } else {
            // Caso contrário, use o nome do emoji
            emoji = message.guild.emojis.cache.find(e => e.name === arg);
        }

        if (!emoji) {
            return message.channel.send('**( ❌ ) Este emoji não existe, ou não está no servidor.**');
        }

        const created = moment(emoji.createdAt).format('LL');
        const embed = new EmbedBuilder()
            .setTitle(`**( <:Stats:1093942055794905159> ) Emoji Info**`)
            .setDescription(`**Nome:** \`${emoji.name}\`\n **ID:** \`${emoji.id}\`\n **Identifier:** \`${emoji.identifier}\`\n **Data de criação:** \`${created}\``)
            .setImage(`${emoji.url}`)
            .setColor('#303136')
            .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });

        message.channel.send({ embeds: [embed] });
    },
};
  