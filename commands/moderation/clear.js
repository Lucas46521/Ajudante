const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Limpa um número específico de mensagens de um usuário em um canal.',
  usage: '<quantidade> [@usuário]',
  run: async (client, message, args) => {
    // Verifica se o autor do comando tem permissão para gerenciar mensagens
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('Desculpe, você não tem permissão para executar esse comando.');
    }

    // Verifica se o número de mensagens a serem limpas foi fornecido
    if (!args[0] || isNaN(args[0])) {
      return message.reply('Por favor, forneça um número válido de mensagens a serem limpas.');
    }

    const amount = parseInt(args[0]) + 1;

    // Verifica se a quantidade de mensagens é válida
    if (amount <= 0 || amount > 100) {
      return message.reply('Por favor, forneça um número entre 1 e 100 para limpar as mensagens.');
    }

    let targetUser = null;

    // Verifica se um usuário foi mencionado
    if (message.mentions.users.size > 0) {
      targetUser = message.mentions.users.first();
    }

    // Limpa as mensagens no canal, ignorando a mensagem do autor e do usuário alvo (se especificado)
    try {
      let deletedMessages;

      if (targetUser) {
        // Filtra as mensagens do usuário alvo
        deletedMessages = await message.channel.messages.fetch({ limit: amount })
          .then(messages => messages.filter(msg => msg.author.id === targetUser.id && msg.id !== message.id));

        // Apaga as mensagens filtradas
        await message.channel.bulkDelete(deletedMessages, true);
      } else {
        // Limpa as mensagens normalmente, ignorando a mensagem do autor
        deletedMessages = await message.channel.bulkDelete(amount, true, true);
      }

      const clearedAmount = deletedMessages.size;

      // Remove as mensagens fixadas da quantidade total
      const pinnedMessages = deletedMessages.filter((msg) => msg.pinned);
      const pinnedAmount = pinnedMessages.size;
      const actualClearedAmount = clearedAmount - pinnedAmount;

      let ignoredAmount = amount - clearedAmount;

      if (ignoredAmount === amount) {
        ignoredAmount = 'Nenhuma mensagem foi ignorada.';
      }

      // Cria um embed para a mensagem de confirmação
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`🧹 Limpeza de Mensagens`)
        .setDescription(`Foram limpas ${actualClearedAmount} mensagens.\n${ignoredAmount} mensagens não foram removidas.`);

      // Envia a mensagem de confirmação
      const confirmationMessage = await message.channel.send({ embeds: [embed] });

      // Remove a mensagem de confirmação após 5 segundos
      setTimeout(() => {
        confirmationMessage.delete().catch(console.error);
      }, 50000);

      // Remove a mensagem do autor após a limpeza
      // message.delete().catch(console.error);
    } catch (error) {
      console.error('Erro ao limpar as mensagens:', error);
      message.reply('Ocorreu um erro ao limpar as mensagens.');
    }
  },
};