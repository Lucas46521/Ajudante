const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const canvacord = require("canvacord");

module.exports = {
  name: 'bed',
  description: 'Transforma o avatar da pessoa mencionada em um gif "triggered"',
  usage: '<@usuário>',
  run: async (client, message, args) => {
    // Verifica se o usuário mencionou alguém
    
    // Obtém o primeiro usuário mencionado
    
    try {
const usuario = message.mentions.members.first() || await message.guild.member.cache.get(args[0]) || await message.guild.members.fetch(args[0]) 

      
const usuario2 = message.mentions.members.first(2)[1] || await message.guild.member.cache.get(args[1]) || await message.guild.members.fetch(args[1]) 

      
const avatar = usuario.displayAvatarURL({dynamic: true, format: "png", size: 1024})
const avatar2 = usuario2.displayAvatarURL({dynamic: true, format: "png", size: 1024})
const cva = await canvacord.Canvas.bed(avatar,avatar2)
const attachment = new AttachmentBuilder(cva, { name: 'bed.gif' });
const tembed = new EmbedBuilder()
.setTitle('🛏️ Bed 🛏️')
.setImage('attachment://bed.gif')
await message.channel.send({ embeds: [tembed], files: [attachment] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao transformar o usuário em um gif "bed".');
    }
  },
};
    