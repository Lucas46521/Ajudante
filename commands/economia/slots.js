const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });

module.exports = {
  name: 'slots',
  description: 'Gire os slots para tentar ganhar dinheiro.',
  usage: '<valor>',
  run: async (client, message, args) => {
    const user = message.author;
    let betAmount = parseInt(args[0]);

    // Verifica se foi fornecido um valor de aposta válido
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      return message.reply('Por favor, forneça um valor de aposta válido.');
    }

    const money = await db.get(`money_${user.id}`) || 0;

    // Verifica se o usuário possui dinheiro suficiente para jogar
    if (money < betAmount) {
      return message.reply('Desculpe, você não tem dinheiro suficiente para fazer essa aposta.');
    }

    // Array com os possíveis ícones dos slots
    const slots = ['🍇', '🍊', '🍒', '🍓', '🍉', '🍎', '🍌', '🍐', '🍈'];

    // Realiza a rotação dos slots
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];
    const slot4 = slots[Math.floor(Math.random() * slots.length)];
    const slot5 = slots[Math.floor(Math.random() * slots.length)];
    const slot6 = slots[Math.floor(Math.random() * slots.length)];
    const slot7 = slots[Math.floor(Math.random() * slots.length)];
    const slot8 = slots[Math.floor(Math.random() * slots.length)];
    const slot9 = slots[Math.floor(Math.random() * slots.length)];

    // Verifica se o jogador ganhou ou perdeu
    let win = false;
    if (
      (slot1 === slot2 && slot2 === slot3) ||
      (slot4 === slot5 && slot5 === slot6) ||
      (slot7 === slot8 && slot8 === slot9) ||
      (slot1 === slot4 && slot4 === slot7) ||
      (slot2 === slot5 && slot5 === slot8) ||
      (slot3 === slot6 && slot6 === slot9) ||
      (slot1 === slot5 && slot5 === slot9) ||
      (slot3 === slot5 && slot5 === slot7)
    ) {
      win = true;
    }

    // Calcula o valor ganho ou perdido
    let payoutMultiplier = 0;
    if (win) {
      if (slot1 === slot2 && slot2 === slot3 && slot3 === slot4 && slot4 === slot5 && slot5 === slot6 && slot6 === slot7 && slot7 === slot8 && slot8 === slot9) {
        payoutMultiplier = 10;
      } else {
        payoutMultiplier = 3;
      }
    }

    const payoutAmount = betAmount * payoutMultiplier;
    
    if (win) {
      await db.add(`money_${user.id}`, payoutAmount);
    } else {
      await db.sub(`money_${user.id}`, betAmount);
    }
    
    const newBalance = await db.get(`money_${user.id}`) || 0;

    // Cria um embed com o resultado do jogo
    const embed = new EmbedBuilder()
      .setColor(win ? 'Green' : 'Red')
      .setTitle('🎰 Slots')
      .addFields(
        { name: 'Resultado', value: `${slot1} | ${slot2} | ${slot3}\n${slot4} | ${slot5} | ${slot6}\n${slot7} | ${slot8} | ${slot9}` },
        { name: 'Aposta', value: `$${betAmount}` },
        { name: 'Pagamento', value: `$${payoutAmount}` },
        { name: 'Dinheiro', value: `Você tem $${newBalance}` }
      );

    // Envia o embed como resposta
    message.channel.send({ embeds: [embed] });
  },
};
              