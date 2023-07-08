const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'timeout',
  description: 'Aplica um timeout em um usuário do servidor',
  usage: '<usuário> <tempo> <motivo>',
  userPermissions: ['KICK_MEMBERS'],
  clientPermissions: ['MANAGE_ROLES'],
  run: async (client, message, args) => {
    const [user, durationArg, ...reason] = args;
    const durationRegex = /(\d+)\s*(d|h|m|s)/gi;
    const durationMatches = Array.from(durationArg.matchAll(durationRegex));
    let durationMs = 0;

    // Verifica se os argumentos estão corretos
    if (!user || !durationArg || !durationMatches.length) {
      return message.reply('Por favor, forneça um usuário, uma duração e um motivo válidos. Exemplo: !!timeout @usuário 1d 3h 30m 20s motivo');
    }

    // Verifica se o usuário mencionado é válido
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply('Por favor, mencione um usuário válido.');
    }
    if (member.id === client.user.id) {
      return message.reply('Não posso dar timeout em mim mesmo.');
    }
    // Verifica se o usuário mencionado é um admin
    if (member.permissions.has('Administrator')) {
      return message.reply('Não posso dar timeout em um administrador.');
    }
    

    // Calcula a duração em milissegundos
    durationMatches.forEach(match => {
      const amount = parseInt(match[1]);
      const unit = match[2].toLowerCase();
      switch (unit) {
        case 'd':
          durationMs += amount * 24 * 60 * 60 * 1000;
          break;
        case 'h':
          durationMs += amount * 60 * 60 * 1000;
          break;
        case 'm':
          durationMs += amount * 60 * 1000;
          break;
        case 's':
          durationMs += amount * 1000;
          break;
      }
    });

    // Aplica o timeout
    await member.timeout(durationMs);

    // Envia uma mensagem confirmando o timeout
    const durationString = durationMatches.map(match => `${match[1]}${match[2]}`).join(' ');
    const confirmationEmbed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle(`Timeout aplicado em ${member.user.tag}`)
      .setDescription(`Duração: ${durationString}`)
      .addFields({ name: 'Motivo', value: reason.join(' ') || 'Não especificado' })
      .setFooter({ text: `Aplicado por ${message.author.tag}` });
    await message.channel.send({ embeds: [confirmationEmbed] });

    // Envia uma mensagem no DM do usuário castigado
    const dmEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle(`Timeout aplicado em ${message.guild.name}`)
      .setDescription(`Você foi castigado por ${durationString} devido ao seguinte motivo:`)
      .addFields(
		{ name: 'Motivo', value: reason.join(' ') || 'Não especificado' },
      );
    try {
      await member.send({ embeds: [dmEmbed] });
    } catch (error) {
      console.error(`Não foi possível enviar mensagem no DM para ${member.user.tag}:`, error);
    }
  },
};