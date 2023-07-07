const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
module.exports = {
  name: 'removemoney',
  description: 'Remove dinheiro de um usuário',
  permissions: ['MANAGE_MEMBERS'],
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    const amount = parseInt(args[1]);

    if (!user) return message.reply('Você deve mencionar um usuário válido.');
    if (isNaN(amount) || amount <= 0) return message.reply('Você deve fornecer um valor numérico válido.');

    // Verifica o saldo atual do usuário
    const userBalance = await db.get(`money_${user.id}`) || 0;

    // Verifica se o usuário tem saldo suficiente para remover
    if (userBalance < amount) return message.reply('O usuário não possui saldo suficiente.');

    // Remove o valor do saldo do usuário
    await db.sub(`money_${user.id}`, amount);
    const userBalance1 = await db.get(`money_${user.id}`) || 0;
    
    message.reply(`Foram removidas ${amount} moedas de ${user.username} agora lhe restam ${userBalance1}.`);
  },
};
    