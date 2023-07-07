const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
module.exports = {
  name: 'removeuser',
  description: 'Remove um usuário da database',
  permissions: ['MANAGE_MEMBERS'],
  run: async (client, message, args) => {
    const user = message.mentions.users.first();

    if (!user) return message.reply('Você deve mencionar um usuário válido.');

    // Remove o usuário da database
    await db.delete(`money_${user.id}`);
    await db.delete(`bank_${user.id}`);
      
    message.reply(`O usuário ${user.username} foi removido da database.`);
  },
};