const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });

module.exports = {
  name: 'prefix',
  description: 'Gerencia o prefixo do bot no servidor',
  usage: '<set | reset | info> [novo prefixo]',
  run: async (client, message, args) => {  // Verifica se o usuário tem permissão de administrador
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Você não tem permissão para usar este comando.');
    }

    const subCommand = args[0];

    if (subCommand === 'set') {
      const newPrefix = args[1];

      if (!newPrefix) {
        return message.reply('Por favor, forneça um novo prefixo.');
      }

      // Salva o novo prefixo no banco de dados
      db.set(`guild_prefix_${message.guild.id}`, newPrefix);

      message.channel.send(`O prefixo do bot foi atualizado para: ${newPrefix}`);
    } else if (subCommand === 'reset') {
      // Remove o prefixo personalizado do banco de dados
      db.delete(`guild_prefix_${message.guild.id}`);

      message.channel.send('O prefixo do bot foi redefinido para o padrão.');
    } else if (subCommand === 'info') {
      // Obtém o prefixo atual do servidor do banco de dados
      const guildPrefix = await db.get(`guild_prefix_${message.guild.id}`);

      if (guildPrefix) {
        message.channel.send(`O prefixo atual do bot neste servidor é: ${guildPrefix}`);
      } else {
        message.channel.send('O prefixo atual do bot neste servidor é o padrão.');
      }
    } else {
      message.reply('Comando inválido. Use `set`, `reset` ou `info`.');
    }
  },
};