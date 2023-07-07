const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'withdraw',
  aliases: ['with'],
  description: 'Retira dinheiro do banco',
  usage: 'withdraw <quantidade>',
  run: async (client, message, args) => {
    const amount = args[0];

    if (!amount) {
      return message.reply('Por favor, forneça uma quantidade válida.');
    }

    const userBankBalance = await db.get(`bank_${message.author.id}`) || 0;

    if (amount.toLowerCase() === 'all') {
      if (userBankBalance <= 0) {
        return message.reply('Você não tem dinheiro no banco para retirar.');
      }

      db.sub(`bank_${message.author.id}`, userBankBalance);
      db.add(`money_${message.author.id}`, userBankBalance);

      return message.reply(`Você sacou ${userBankBalance} moedas do banco.`);
    }

    const parsedAmount = parseInt(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return message.reply('Por favor, forneça uma quantidade válida.');
    }

    if (parsedAmount > userBankBalance) {
      return message.reply('Você não tem dinheiro suficiente no banco para sacar essa quantidade.');
    }

    db.sub(`bank_${message.author.id}`, parsedAmount);
    db.add(`money_${message.author.id}`, parsedAmount);

    message.reply(`Você sacou ${parsedAmount} moedas do banco.`);
  },
};