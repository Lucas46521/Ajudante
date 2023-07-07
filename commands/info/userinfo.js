const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'user'],
  description: 'Obtém informações do usuário.',
  run: async (client, message, args) => {
    const target = message.mentions.users.first() || message.author;

    const member = message.guild.members.cache.get(target.id);

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: 'Nome', value: `${target.username}#${target.discriminator}`, inline: true },
        { name: 'ID', value: target.id, inline: true },
        { name: 'Tag', value: target.tag, inline: true },
        { name: 'Apelido', value: member.nickname || 'Nenhum', inline: true },
        { name: 'Status', value: member.presence.status, inline: true },
        { name: 'Entrou no Discord em', value: target.createdAt.toUTCString(), inline: true },
        { name: 'Entrou no Servidor em', value: member.joinedAt.toUTCString(), inline: true },
        { name: 'Cargos', value: member.roles.cache.map(role => role.toString()).join(', ') || 'Nenhum', inline: true }
      )
      
    message.channel.send({ embeds: [embed] });
  },
};