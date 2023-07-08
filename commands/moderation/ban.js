const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bane um membro do servidor',
  usage: '<@usuário> [motivo]',
  userPermissions: ['BAN_MEMBERS'],
  run: async (client, message, args) => {
    const user = message.mentions.users.first();

    if (!user) {
      return message.reply('Por favor, mencione o usuário que deseja banir.');
    }

    const member = message.guild.members.cache.get(user.id);

    if (!member) {
      return message.reply('O usuário mencionado não é um membro do servidor.');
    }

    if (!member.bannable) {
      return message.reply('Não é possível banir esse usuário.');
    }

    const reason = args.slice(1).join(' ');

    member.ban({ reason: reason })
      .then(() => {
        const banEmbed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle('Usuário Banido')
          .addField('Usuário', user.tag)
          .addField('Moderador', message.author.tag)
          .addField('Motivo', reason || 'Nenhum motivo fornecido');

        message.reply(`O usuário ${user.tag} foi banido com sucesso.`, { embeds: [banEmbed] });
      })
      .catch((error) => {
        console.error(error);
        message.reply('Ocorreu um erro ao banir o usuário.');
      });
  },
};
    