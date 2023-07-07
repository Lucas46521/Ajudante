const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });

module.exports = {
  name: 'unblacklist',
  description: 'Remove um usuário da lista negra.',
  run: async (client, message, args) => {
    // Verifica se o autor do comando tem permissões necessárias
    if (message.author.id !== "769969803526930504") return message.channel.send('**( ❌ ) Só meu dono pode executar este comando**')

    // Verifica se foi mencionado um usuário a ser removido da lista negra
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Por favor, mencione o usuário que deseja remover da lista negra.');
    }

    // Remove o ID do usuário da lista negra
    db.delete(`blacklist_${user.id}`);

    message.reply(`${user.username} foi removido da lista negra.`);
  },
};