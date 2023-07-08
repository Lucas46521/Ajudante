const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const canvacord = require("canvacord");

module.exports = {
  name: 'trash',
  description: 'Transforma o avatar da pessoa mencionada em um png "trash"',
  usage: '<@usuário>',
  run: async (client, message, args) => {
    // Verifica se o usuário mencionou alguém
    
    // Obtém o primeiro usuário mencionado
    
    try {
const usuario = message.mentions.users.first() || message.author;
const avatar = usuario.avatarURL({dynamic: true, format: "png", size: 1024})
const cva = await canvacord.Canvas.trash(avatar)
const attachment = new AttachmentBuilder(cva, { name: 'trash.png' });
const tembed = new EmbedBuilder()
.setTitle('🗑️ Trash 🗑️')
.setImage('attachment://trash.png')
await message.channel.send({ embeds: [tembed], files: [attachment] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao transformar o usuário em um png "trash".');
    }
  },
};
              