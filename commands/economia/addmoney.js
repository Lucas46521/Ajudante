const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
module.exports = {
  name: 'addmoney',
  description: 'Adiciona dinheiro a um usuário',
  permissions: ['MANAGE_MEMBERS'],
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    const amount = parseInt(args[1]);

    if (!user) return message.reply('Você deve mencionar um usuário válido.');
    if (isNaN(amount) || amount <= 0) return message.reply('Você deve fornecer um valor numérico válido.');

    // Adiciona o valor ao saldo do usuário
    const userBalance = await db.get(`money_${user.id}`) || 0;
    await db.add(`money_${user.id}`, amount);

    message.reply(`Foram adicionadas ${amount} moedas para ${user.username}.`);
  },
};
    