const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'flood',
	description: "Check bot's ping.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
if (!args[0]) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Please provide a difficulty.")
          .setColor("Red")
      ]
    });
const { Flood } = require('discord-gamecord');
    
if(args.join(' ') == 'normal'){
    
const Game = new Flood({
  message: message,
  isSlashGame: false,
  embed: {
    title: 'Flood Normal',
    color: '#5865F2',
  },
  difficulty: 13,
  timeoutTime: 60000,
  buttonStyle: 'PRIMARY',
  emojis: ['🟥', '🟧', '🟨', '🟩', '🟦'],
  winMessage: 'You won! You took **{turns}** turns.',
  loseMessage: 'You lost! You took **{turns}** turns.',
  playerOnlyMessage: 'Only {player} can use these buttons.'
});

Game.startGame();
Game.on('gameOver', result => {
  console.log(result);  // =>  { result... }
});
} else if(args.join(' ') == 'fácil'){
const Game = new Flood({
  message: message,
  isSlashGame: false,
  embed: {
    title: 'Flood Fácil',
    color: '#5865F2',
  },
  difficulty: 8,
  timeoutTime: 60000,
  buttonStyle: 'PRIMARY',
  emojis: ['🟥', '🟧', '🟨', '🟩', '🟦',],
  winMessage: 'You won! You took **{turns}** turns.',
  loseMessage: 'You lost! You took **{turns}** turns.',
  playerOnlyMessage: 'Only {player} can use these buttons.'
});

Game.startGame();
Game.on('gameOver', result => {
  console.log(result);  // =>  { result... }
});
} else if(args.join(' ') == 'difícil'){
const Game = new Flood({
  message: message,
  isSlashGame: false,
  embed: {
    title: 'Flood Difícil',
    color: '#5865F2',
  },
  difficulty: 18,
  timeoutTime: 60000,
  buttonStyle: 'PRIMARY',
  emojis: ['🟥', '🟧', '🟨', '🟩', '🟦'],
  winMessage: 'You won! You took **{turns}** turns.',
  loseMessage: 'You lost! You took **{turns}** turns.',
  playerOnlyMessage: 'Only {player} can use these buttons.'
});

Game.startGame();
Game.on('gameOver', result => {
  console.log(result);  // =>  { result... }
});
} else {(message.channel.send('Dificuldade desconhecida'))
  }
	}
};