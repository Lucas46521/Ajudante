module.exports = {
	name: 'snake',
	description: "Check bot's ping.",
	cooldown: 3000,
	userPerms: [],
	botPerms: [],
	run: async (client, message, args) => {
const { Snake } = require('discord-gamecord');

const Game = new Snake({
  message: message,
  isSlashGame: false,
  embed: {
    title: '🐍 Cobrinha 🐍',
    overTitle: 'Fim de jogo 💀',
    color: '#5865F2'
  },
  emojis: {
    board: '⬛',
    food: '🍎',
    up: '⬆️', 
    down: '⬇️',
    left: '⬅️',
    right: '➡️',
  },
  stopButton: 'Parar',
  timeoutTime: 60000,
  snake: { head: '<:emoji_14:1018273489255415808>', body: '<:emoji_15:1018288584190603315>', tail: '<:emoji_16:1018295435485524040>', over: '💀' },
  foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽', '🍓', '🍐', '🍏', '🥥', '🍍', '🍌', '🍒', '🍑', '🥭'],
  playerOnlyMessage: 'Apenas {player} pode usar esses botões.'
});

Game.startGame();
Game.on('gameOver', result => {
  console.log(result);  // =>  { result... }
});
	}
};