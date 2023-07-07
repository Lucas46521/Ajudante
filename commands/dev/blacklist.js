const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });

module.exports = {
  name: 'blacklist',
  description: 'Adiciona um usuário à lista negra.',
  run: async (client, message, args) => {
    // Verifica se o autor do comando tem permissões necessárias
    if (message.author.id !== "769969803526930504") return message.channel.send('**( ❌ ) Só meu dono pode executar este comando**')

    // Verifica se foi mencionado um usuário a ser adicionado à lista negra
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Por favor, mencione o usuário que deseja adicionar à lista negra.');
    }

    // Adiciona o ID do usuário à lista negra
    db.set(`blacklist_${user.id}`, true);

    message.reply(`${user.username} foi adicionado à lista negra.`);
  },
};
        