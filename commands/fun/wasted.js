const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const canvacord = require("canvacord");

module.exports = {
  name: 'wasted',
  description: 'Transforma o avatar da pessoa mencionada em um png "wasted"',
  usage: '<@usuário>',
  run: async (client, message, args) => {
    // Verifica se o usuário mencionou alguém
    
    // Obtém o primeiro usuário mencionado
    
    try {
const usuario = message.mentions.users.first() || message.author;
const avatar = usuario.avatarURL({dynamic: true, format: "png", size: 1024})
const cva = await canvacord.Canvas.wasted(avatar)
const attachment = new AttachmentBuilder(cva, { name: 'wasted.png' });
const tembed = new EmbedBuilder()
.setTitle('Wasted')
.setImage('attachment://wasted.png')
await message.channel.send({ embeds: [tembed], files: [attachment] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao transformar o usuário em um png "wasted".');
    }
  },
};