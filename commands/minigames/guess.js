module.exports = {
  name: 'guess',
  description: 'Guess a number between 1 and 100',
  run: async (client, message, args) => {
    const numberToGuess = Math.floor(Math.random() * 100) + 1;
    const maxAttempts = 30;
    let attempts = 0;
    let guess = '';

    message.channel.send('Estou pensando em um número entre 1 e 100. Tente adivinhá-lo!');

    const filter = m => !isNaN(m.content) && m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { time: 60000 });

    collector.on('collect', m => {
      attempts++;

      const guess = parseInt(m.content);

      if (guess === numberToGuess) {
        collector.stop();
        message.channel.send(`Você ganhou! Levou ${attempts} tentativas para adivinhar o número.`);
      } else if (guess < numberToGuess) {
        message.channel.send('Muito baixo! Tente novamente.');
      } else if (guess > numberToGuess) {
        message.channel.send('Muito alto! Tente novamente.');
      }

      if (attempts >= maxAttempts) {
        collector.stop();
        message.channel.send(`Você perdeu! O número era ${numberToGuess}.`);
      }
    });

    collector.on('end', () => {
      if (attempts < maxAttempts && guess !== numberToGuess) {
        message.channel.send(`Fim do jogo! O número era ${numberToGuess}.`);
      }
    });
  }
};
              