const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Desbane um usuário do servidor',
  usage: '<ID ou nome do usuário>',
  userPermissions: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    const userIdentifier = args[0];

    if (!userIdentifier) {
      return message.reply('Por favor, forneça o ID ou o nome do usuário que deseja desbanir.');
    }

    try {
      const bannedUsers = await message.guild.bans.fetch();
      const bannedUser = bannedUsers.find((user) => user.user.id === userIdentifier || user.user.username === userIdentifier);

      if (!bannedUser) {
        return message.reply('Não foi possível encontrar o usuário banido com base no ID ou nome fornecido.');
      }

      await message.guild.members.unban(bannedUser.user);

      const embed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('Usuário Desbanido')
        .setDescription(`O usuário **${bannedUser.user.tag}** foi desbanido com sucesso.`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao desbanir o usuário.');
    }
  },
};
        