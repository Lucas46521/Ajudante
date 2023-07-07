const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  description: 'Obtém informações do servidor.',
  run: async (client, message, args) => {
    const guild = message.guild;
    const guildOwner = message.guild.owner;
    const region = guild ? guild.region : 'Não encontrado';
    const owner = await message.guild.fetchOwner()
    const guildOwnerName = owner ? owner.user.username : 'Não encontrado';
    const date = moment(guild.createdAt).format('DD/MM/YYYY');
    
    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .addFields(
        { name: 'Nome', value: guild.name.toString(), inline: true },
        { name: 'ID', value: guild.id.toString(), inline: true },
        { name: 'Membros', value: guild.memberCount.toString(), inline: true },
        { name: 'Canais', value: guild.channels.cache.size.toString(), inline: true },
        { name: 'Emojis', value: guild.emojis.cache.size.toString(), inline: true },
        { name: 'Dono', value: guildOwnerName, inline: true },
        { name: 'Criado em', value: date.toString(), inline: true },
        { name: 'Cargos', value: guild.roles.cache.size.toString(), inline: true }
      )


    message.channel.send({ embeds: [embed] });
  },
};