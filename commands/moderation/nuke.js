const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'nuke',
  description: 'Recria o canal de texto e apaga todas as mensagens, canais ou cargos, ou clona o canal.',
  run: async (client, message, args) => {
    // Verifica se o autor do comando é um administrador
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('Você precisa ser um administrador para usar este comando.');
    }

    // Verifica se o bot é um administrador
    if (!message.guild.me.permissions.has('Administrator')) {
      return message.reply('O bot precisa ser um administrador para usar este comando.');
    }  
    // Mapeamento dos subcomandos e seus aliases
    const subcommands = {
      'channels': { description: 'apagar os canais', aliases: ['canais', 'chan', 'ch'] },
      'roles': { description: 'apagar os cargos', aliases: ['cargos', 'role', 'rol'] },
      'all': { description: 'apagar todos os canais e cargos', aliases: [] },
      'clone': { description: 'clonar o canal', aliases: ['clonar', 'cl'] },
    };

    const subcommand = args[0]?.toLowerCase();
    let validSubcommand = null;

    // Verifica se o subcomando ou algum alias é válido
    for (const key in subcommands) {
      if (key === subcommand || subcommands[key].aliases.includes(subcommand)) {
        validSubcommand = key;
        break;
      }
    }

    if (!validSubcommand) {
      return message.reply('Subcomando inválido. Use `channels`, `roles`, `all` ou `clone`.');
    }

    // Variáveis para identificar se há canais, cargos ou ambos para apagar
    let hasChannelsToDelete = false;
    let hasRolesToDelete = false;

    // Executa a ação de acordo com o subcomando fornecido
    switch (validSubcommand) {
      case 'channels':
        message.guild.channels.cache.forEach(channel => {
         
          if (channel.type === 'GUILD_TEXT' && channel.deletable && !channel.isThread()) {
            channel.delete().catch(console.error);
            hasChannelsToDelete = true;
          }
        });
        break;
      case 'roles':
        const highestBotRolePosition = message.guild.me.roles.highest.position;
        message.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.managed && role.position < highestBotRolePosition).forEach(role => {
          role.delete().catch(console.error);
          hasRolesToDelete = true;
        });
        break;
      case 'all':
        const highestRolePosition = message.guild.me.roles.highest.position;
        message.guild.channels.cache.forEach(channel => {
          if (channel.type === 'GUILD_TEXT' && channel.deletable && !channel.isThread()) {
            channel.delete().catch(console.error);
            hasChannelsToDelete = true;
          }
        });
        message.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.managed && role.position < highestRolePosition).forEach(role => {
          role.delete().catch(console.error);
          hasRolesToDelete = true;
        });
        break;
      case 'clone':
        // Obtém o canal mencionado (se houver) ou o canal atual
        const targetChannel = message.mentions.channels.first() || message.channel;

        // Cria um novo canal com o mesmo nome e posição
        const newChannel = await targetChannel.clone();

        // Envia uma mensagem informando que o canal foi recriado
        const embedClone = new EmbedBuilder()
          .setTitle('Clone Nuke')
          .setDescription(`O canal ${targetChannel.toString()} foi clonado com sucesso.`)
          .setColor('#00ff00');

        newChannel.send(embedClone);
        break;
    }

    // Cria uma mensagem para informar quais ações foram concluídas
    let responseMessage = `Ação "${subcommands[validSubcommand].description}" concluída com sucesso.`;

    if (hasChannelsToDelete) {
      responseMessage += '\nCanais apagados.';
    }

    if (hasRolesToDelete) {
      responseMessage += '\nCargos apagados.';
    }

    // Envia uma mensagem informando que a ação foi concluída
    const embed = new EmbedBuilder()
      .setTitle('Nuke')
      .setDescription(responseMessage)
      .setColor('#ff0000');

    message.channel.send(embed);
  },
};
