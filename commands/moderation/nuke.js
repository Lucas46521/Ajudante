const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'nuke',
  description: 'Recria o canal de texto e apaga todas as mensagens',
  run: async (client, message, args) => {
    // Verifica se o autor do comando tem permissão para gerenciar canais
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply('Você não tem permissão para usar este comando.');
    }

    // Obtém o canal mencionado (se houver)
    const targetChannel = message.mentions.channels.first() || message.channel;

    // Obtém o nome e a menção do canal
    const channelName = targetChannel.name;
    const channelMention = targetChannel.toString();

    // Obtém a posição do canal
    const channelPosition = targetChannel.position;

    // Cria um novo canal com o mesmo nome e posição
    const newChannel = await targetChannel.clone();

    // Deleta o canal antigo
    await targetChannel.delete();

    // Envia uma mensagem informando que o canal foi recriado e menciona o novo canal
    const embed = new EmbedBuilder()
      .setTitle('Nuke')
      .setDescription(`O canal ${channelMention} foi recriado e todas as mensagens foram apagadas.`)
      .setColor('#ff0000');

    newChannel.send(embed);
  },
};