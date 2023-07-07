const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'deposit',
  aliases: ['dep'],
  description: 'Deposita dinheiro no banco',
  usage: 'deposit <quantidade>',
  run: async (client, message, args) => {
    const amount = args[0];

    if (!amount) {
      return message.reply('Por favor, forneça uma quantidade válida.');
    }

    const userBalance = await db.get(`money_${message.author.id}`) || 0;
    const userBankBalance = await db.get(`bank_${message.author.id}`) || 0;

    if (amount.toLowerCase() === 'all') {
      if (userBalance <= 0) {
        return message.reply('Você não tem dinheiro para depositar.');
      }

      db.sub(`money_${message.author.id}`, userBalance);
      db.add(`bank_${message.author.id}`, userBalance);

      return message.reply(`Você depositou ${userBalance} moedas no banco.`);
    }

    const parsedAmount = parseInt(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return message.reply('Por favor, forneça uma quantidade válida.');
    }

    if (parsedAmount > userBalance) {
      return message.reply('Você não tem dinheiro suficiente para depositar essa quantidade.');
    }

    db.sub(`money_${message.author.id}`, parsedAmount);
    db.add(`bank_${message.author.id}`, parsedAmount);

    message.reply(`Você depositou ${parsedAmount} moedas no banco.`);
  },
};
      