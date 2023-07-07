const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });

module.exports = {
  name: 'coinflip',
  description: 'Joga uma moeda (cara ou coroa)',
  run: async (client, message, args) => {
    // Opções de moeda (cara e coroa)
    const coinOptions = ['cara', 'coroa'];

    // Escolhe uma opção aleatória
    const randomOption = coinOptions[Math.floor(Math.random() * coinOptions.length)];

    // Verifica a opção escolhida pelo usuário (se fornecida)
    const userOption = args[0] && coinOptions.includes(args[0].toLowerCase()) ? args[0].toLowerCase() : null;

    // Quantidade de aposta do usuário
    let betAmount = parseInt(args[1]);

    // Verifica se o usuário informou uma quantidade de aposta válida
    const isValidBetAmount = !isNaN(betAmount) && betAmount > 0;
    // Verifica se o usuário apostou "all" para apostar todo o seu dinheiro
    if (args[1] && args[1].toLowerCase() === 'all') {
      const userBalance = db.get(`money_${message.author.id}`);
      if (betAmount > userBalance) {
    return message.reply('Você não tem a quantia apostada')
    }
      if (userBalance) {
        betAmount = userBalance;
      }
    }
    // Porcentagem de ganho quando acerta
    const winPercentage = 0.5; // 50% (exemplo)

    // Calcula o valor ganho caso o usuário acerte
    const winAmount = isValidBetAmount ? Math.ceil(betAmount * winPercentage) : 0;

    // Cria um embed com o resultado
    const embed = new EmbedBuilder()
      .setTitle('Coinflip')
      .setDescription(`A moeda caiu em ${randomOption}.`);

    if (userOption) {
      embed.addFields({ name: 'Sua Escolha', value: userOption });
      if (userOption === randomOption) {
        embed.addFields({ name: 'Resultado', value: `Parabéns, você acertou! Ganhou ${winAmount} moedas.` });
        db.add(`money_${message.author.id}`, winAmount);
      } else {
        embed.addFields({ name: 'Resultado', value: 'Você errou, tente novamente.' });
        db.sub(`money_${message.author.id}`, betAmount);
      }
    }

    if (isValidBetAmount) {
      embed.addFields({ name: 'Quantidade Apostada', value: betAmount });
    }

    // Envia o embed como resposta
    message.reply({ embeds: [embed] });
  },
};