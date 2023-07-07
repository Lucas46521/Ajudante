const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
module.exports = {
  name: 'pix',
  description: 'Realiza um pagamento PIX para outro usuário',
  run: async (client, message, args) => {
    const sender = message.author;
    const recipient = message.mentions.users.first();
    const amount = parseInt(args[1]);

    if (!recipient) return message.reply('Você deve mencionar um usuário válido.');
    if (isNaN(amount) || amount <= 0) return message.reply('Você deve fornecer um valor numérico válido.');

    // Obtém o saldo do remetente
    const senderBalance = await db.get(`money_${sender.id}`) || 0;

    // Verifica se o remetente possui saldo suficiente para fazer o pagamento
    if (senderBalance < amount) return message.reply('Saldo insuficiente.');

    // Realiza o pagamento subtraindo o valor do remetente e adicionando ao destinatário
    await db.sub(`money_${sender.id}`, amount);
    await db.add(`money_${recipient.id}`, amount);

    message.reply(`Pagamento de ${amount} moedas realizado com sucesso para ${recipient.username}.`);
  },
};
      