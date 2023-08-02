const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get the Command List",
  aliases: ["commands", "cmd", "h"],
  botPerms: ["EmbedLinks"],
  run: async (client, message, args) => {
    let helpMenu = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
      .setCustomId("help_menu")
      .setPlaceholder('Help Menu')
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions([
        {
          label: "Settings",
          description: "Change the bot settings",
          value: "settings",
          emoji: "🛠"
        },
        {
          label: "Activities",
          description: "Access the new Discord Activities Feature",
          value: "activities",
          emoji: "🎮"
        },
        {
          label: "Fun",
          description: "Shows all the fun commands",
          value: "fun",
          emoji: "🎲"
        },
        {
          label: "Image",
          description: "Shows all the image commands",
          value: "image",
          emoji: "🖼"
        },
        {
          label: "Information",
          description: "Shows all the information commands",
          value: "info",
          emoji: "📢"
        },
        {
          label: "Moderation",
          description: "Shows all the moderation commands",
          value: "moderation",
          emoji: "🔒"
        },
        {
          label: "Music",
          description: "Shows all the Music commands!",
          value: "music",
          emoji: "🎵"
        },
        {
          label: "Especial",
          description: "Shows all the special commands",
          value: "special",
          emoji: "⭐"
        },
        {
          label: "Utility",
          description: "Shows all the utility commands",
          value: "utility",
          emoji: "🔧"
        },
        {
          label: "Games",
          description: "Shows all the game commands",
          value: "game",
          emoji: "🎮"
        }
      ])
    )

    let editEmbed = new EmbedBuilder()
    .setTitle('Help Menu')
    .setDescription('Choose an option from the menu below!')
    .setColor("Green")
    const msg = await message.channel.send({ embeds: [editEmbed], components: [helpMenu]})

      
    const coletor = msg.createMessageComponentCollector({ filter: i => i.user.id == message.author.id, componentType: 3, })

coletor.on('collect', (i) =>{

if(i.values[0] == "settings"){

const exampleEmbed = new EmbedBuilder()
    .setTitle('Comandos de configuração')
    .setDescription('__**Prefix:**__ Comando base para prefixo');

msg.edit({ embeds: [exampleEmbed], components: [helpMenu] });

}

if(i.values[0] == "moderation"){

const exampleEmbed = new EmbedBuilder()
    .setTitle('Comandos de Moderação')
    .setDescription('__**Ban:**__ Banir um usuário do servidor\n__**Clear:**__ Apague mensagens de um canal\n__**Kick:**__ Expulse um usuário do servidor\n__**Timeout:**__ Puna um usuário\n__**Unban**__ Desbana um usuário');

msg.edit({ embeds: [exampleEmbed], components: [helpMenu] });

}
if(i.values[0] == "special"){

const exampleEmbed = new EmbedBuilder()
    .setTitle('Comandos especiais <a:IconAlert:1051925517546299422>')
    .setDescription('__**Nuke:**__ Comando de destruição em massa');

msg.edit({ embeds: [exampleEmbed], components: [helpMenu] });

}
    
})
}
}
    