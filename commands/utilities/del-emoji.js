const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'removeemoji',
  description: 'Remove um emoji do servidor',
  usage: '<emoji>',
  userPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
  run: async (client, message, args) => {
    const emojiName = args[0];

    // Verifica se foi passado um nome ou um id
    const emoji = message.guild.emojis.cache.find(
      emoji => emoji.name === emojiName || emoji.id === emojiName
    );

    // Se não encontrar o emoji, retorna uma mensagem de erro
    if (!emoji) {
      return message.reply('Não foi possível encontrar o emoji.');
    }

    try {
      // Remove o emoji
      await emoji.delete();
      const embed = new EmbedBuilder()
        .setTitle(`( <a:trash:1094647270881898646> ) Emoji ${emoji.name} removido com sucesso!`)
        .setColor('Red');
      return message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.reply('Ocorreu um erro ao remover o emoji.');
    }
  },
};
  