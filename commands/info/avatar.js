const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
module.exports ={
name: "avatar",
run: async(client, message, args) => {
let user = message.mentions.users.first() || message.author
let avatar = user.avatarURL({dynamic: true, format: "PNG", size: 1024})
let embed_avatar = new EmbedBuilder()
.setTitle(`**( 🖼️ ) ${user.username}'s Avatar**`)
.setColor('#303136')
.setImage(avatar);

let botao_avatar = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setLabel("Download")
.setStyle(5)
.setURL(avatar)
.setEmoji("⭐")
)
message.channel.send({ embeds: [embed_avatar], components: [botao_avatar]})
},
};