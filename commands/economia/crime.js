const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
module.exports = {
  name: 'crime',
  description: 'Realiza uma atividade criminosa com chance de perda de dinheiro',
  run: async (client, message, args) => {
    const successRate = 0.5; // Chance de sucesso (50%)
    const amountLost = 100; // Quantidade de dinheiro perdida em caso de falha

    // Verifica se o usuário possui dinheiro suficiente para realizar o crime
    const userBalance = await db.get(`money_${message.author.id}`) || 0;
    if (userBalance < amountLost) return message.reply('Você não possui dinheiro suficiente para realizar o crime.');

    // Realiza o crime com base na chance de sucesso
    const success = Math.random() < successRate;

    if (success) {
      // Caso de sucesso
      const amountWon = 200; // Quantidade de dinheiro ganha em caso de sucesso

      // Adiciona a quantia ganha ao saldo do usuário
      await db.add(`money_${message.author.id}`, amountWon);

      message.reply(`Você realizou um crime com sucesso e ganhou ${amountWon} moedas.`);
    } else {
      // Caso de falha
      // Remove a quantia perdida do saldo do usuário
      await db.sub(`money_${message.author.id}`, amountLost);

      message.reply(`Você tentou realizar um crime, mas falhou e perdeu ${amountLost} moedas.`);
    }
  },
};
        