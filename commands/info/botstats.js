const os = require('os');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'botstats',
  aliases: ['stats', 'botinfo', 'bi', 'bs'],
  description: 'Mostra algumas estatísticas do bot',
  run: async (client, message, args) => {
    const guilds = await client.guilds.cache.size;
    const prefix = client.prefix
    const users = await client.users.cache.size;
    const channels = await client.channels.cache.size;
    const uptime = client.uptime / 1000;
    const uptimeFormatted = `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h ${Math.floor(((uptime % 86400) % 3600) / 60)}m ${Math.floor(((uptime % 86400) % 3600) % 60)}s`;

    const embed = new EmbedBuilder()
      .setColor('#00FF7F')
      .setTitle(`Estatísticas do ${client.user.username}`)
      .addFields(
        { name: '🌐 Servidores', value: `${guilds}`, inline: true },
        { name: '👥 Usuários', value: `${users}`, inline: true },
        { name: '💬 Canais', value: `${channels}`, inline: true },
        { name: '💾 Memória Ram', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(parseInt(os.totalmem() / 1024 / 1024).toFixed(2))} MB`, inline: true },
        { name: '✏️ Prefixo', value: `${prefix}`, inline: true },
        { name: '🗂️ Comandos', value: `${client.commands.size}`, inline: true },
        { name: '🕰️ Tempo de atividade', value: `${uptimeFormatted}`, inline: true },
        { name: '👨‍💻 Desenvolvedor', value: '𝕷𝖚𝖈𝖆𝖘 𝕲𝖆𝖒𝖊𝖗#2091', inline: true },
      );

    message.channel.send({ embeds: [embed] });
  },
};
        