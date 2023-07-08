const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Expulsa um membro do servidor',
  usage: '<ID ou nome do usuário> [motivo]',
  userPermissions: ["KICK_MEMBERS"],
  run: async (client, message, args) => {
    const userIdentifier = args[0];

    if (!userIdentifier) {
      return message.reply('Por favor, forneça o ID ou o nome do usuário que deseja expulsar.');
    }

    try {
      const member = message.mentions.members.first() || message.guild.members.cache.get(userIdentifier) || message.guild.members.cache.find((m) => m.user.username === userIdentifier);

      if (!member) {
        return message.reply('Não foi possível encontrar o usuário com base no ID ou nome fornecido.');
      }

      // Verifica se o bot tem permissão para expulsar o membro
      if (!member.kickable) {
        return message.reply({ content: 'Não tenho permissão para expulsar esse membro.', ephemeral: true });
      }

      const reason = args.slice(1).join(' ');

       await member.kick(reason);

      const embed = new EmbedBuilder ()
        .setColor('#ff0000')
        .setTitle('Membro Expulso')
        .setDescription(`O membro **${member.user.tag}** foi expulso com sucesso.`);

      message.channel.send({ embeds: [embed] });

      // Envia o motivo para o usuário via mensagem privada
      if (reason) {
        const kickReasonEmbed = new EmbedBuilder ()
          .setColor('#ff0000')
          .setTitle('Você foi Expulso')
          .setDescription(`Você foi expulso do servidor **${message.guild.name}**.`)
          .addFields([
            { name: 'Motivo', value: reason, inline: false },
            ]);

        try {
          await member.send({ embeds: [kickReasonEmbed] });
        } catch (error) {
          console.error(`Não foi possível enviar uma mensagem para ${member.user.tag}.`);
        }
      }
    } catch (error) {
      console.error(error);
      message.reply({ content: 'Ocorreu um erro ao expulsar o membro.', ephemeral: true });
    }
  },
};
    