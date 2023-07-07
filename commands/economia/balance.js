const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'bal',
  description: 'Verifica o saldo do usuário',
  run: async(client, message, ARGS) => {
    const user = message.mentions.users.first() || message.author;
    const moneyBalance = await db.get(`money_${user.id}`) || 0;
    const bankBalance = await db.get(`bank_${user.id}`) || 0;
    const totalBalance = moneyBalance+bankBalance;

    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle(`Saldo de ${user.username}`)
      .addFields(
{ name: `Saldo em dinheiro`, value: `${moneyBalance}` },
{ name: `Saldo bancário`, value: `${bankBalance}` },
{ name: `Saldo total`, value: `${totalBalance}` },
)
    message.reply({ embeds: [embed] })
  },
};
    