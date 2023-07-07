const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: './database/main.sqlite' });

module.exports = {
  name: 'snailrace',
  description: 'Participe de uma corrida de caracóis e faça apostas.',
  usage: '<aposta>',
  run: async (client, message, args) => {
    const user = message.author;
    const betAmount = parseInt(args[0]);

    // Verifica se foi fornecida uma aposta válida
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      return message.reply('Por favor, forneça um valor de aposta válido.');
    }

    const money = await db.get(`money_${user.id}`) || 0;

    // Verifica se o usuário possui dinheiro suficiente para apostar
    if (money < betAmount) {
      return message.reply('Desculpe, você não tem dinheiro suficiente para fazer essa aposta.');
    }

    const snailNames = ['Lentilda', 'Velozinho', 'Caracolino', 'Turbo', 'Bolinha'];
    const snailSpeeds = [1, 2, 3, 4, 5]; // Velocidades dos caracóis (1 é a velocidade mais baixa e 5 é a mais alta)

    const snailIndex = Math.floor(Math.random() * snailNames.length);
    const winningSnailName = snailNames[snailIndex];
    const winningSnailSpeed = snailSpeeds[snailIndex];

    const playerSpeed = Math.floor(Math.random() * 5) + 1; // Velocidade do caracol do jogador

    const isPlayerWinner = playerSpeed > winningSnailSpeed;

    let payoutAmount = 0;
    if (isPlayerWinner) {
      payoutAmount = betAmount * 2;
      await db.add(`money_${user.id}`, payoutAmount);
    } else {
      await db.sub(`money_${user.id}`, betAmount);
    }

    const resultMessage = isPlayerWinner ? 'Você ganhou a aposta!' : 'Você perdeu a aposta.';

    const embed = new EmbedBuilder()
      .setColor(isPlayerWinner ? 'Green' : 'Red')
      .setTitle('🐌 Corrida de Caracóis')
      .setDescription(`Os caracóis estão correndo!\n\n${winningSnailName} está na frente!`)
      .addFields(
        { name: 'Seu caracol', value: `Velocidade: ${playerSpeed} cm/min` },
        { name: 'Aposta', value: `$${betAmount}` },
        { name: 'Resultado', value: resultMessage },
        { name: 'Prêmio', value: `$${payoutAmount}` }
      );

    message.channel.send({ embeds: [embed] });
  },
};
              