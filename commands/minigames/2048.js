module.exports = {
	name: '2048',
	description: "Check bot's ping.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
const { TwoZeroFourEight } = require('discord-gamecord');

const Game = new TwoZeroFourEight({
  message: message,
  isSlashGame: false,
  embed: {
    title: '2048',
    color: '#5865F2'
  },
  emojis: {
    up: '⬆️',
    down: '⬇️',
    left: '⬅️',
    right: '➡️',
  },
  timeoutTime: 60000,
  buttonStyle: 'PRIMARY',
  playerOnlyMessage: 'Only {player} can use these buttons.'
});

Game.startGame();
Game.on('gameOver', result => {
  console.log(result);  // =>  { result... }
});
	}
};