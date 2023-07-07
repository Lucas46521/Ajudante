const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const client = require('..');
const config = require('../config.json');


const cooldown = new Collection();

client.on('messageCreate', async message => {
  const prefix = await db.get(`guild_prefix_${message.guild.id}`) || client.prefix;

  if (message.author.bot) return;
  if (message.channel.type !== 0) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  // Verifica se o autor do comando está na lista negra
  const bl = await db.get(`blacklist_${message.author.id}`)
  if (bl) {
    return message.reply('Você está na lista negra e não pode usar comandos.');
  }


  if (command) {
    if (command.cooldown) {
      if (cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: 'You are on `<duration>` cooldown!'.replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })) });
      if (command.userPerms || command.botPerms) {
        if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
          const userPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({ embeds: [userPerms] })
        }
        if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
          const botPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({ embeds: [botPerms] })
        }
      }

      command.run(client, message, args)
      cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
      setTimeout(() => {
        cooldown.delete(`${command.name}${message.author.id}`)
      }, command.cooldown);
    } else {
      if (command.userPerms || command.botPerms) {
        if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
          const userPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({ embeds: [userPerms] })
        }

        if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
          const botPerms = new EmbedBuilder()
            .setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
            .setColor('Red')
          return message.reply({ embeds: [botPerms] })
        }
      }
      command.run(client, message, args)
    }
  }

});