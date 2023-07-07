const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const { statSync } = require('fs');
const directorySearch = require('node-recursive-directory');

module.exports = {
  name: 'reload',
  description: 'Recarrega os comandos prefix handled',
  run: async (client, message, args) => {
    if (message.author.id !== "769969803526930504") return message.channel.send('**( ❌ ) Só meu dono pode executar este comando**')
    const rootPath = './commands'; // Caminho raiz onde estão localizados os comandos

    const reloadCommands = async (directory) => {
      const commandFiles = await directorySearch(directory);
      let reloadedCommands = 0;
      let addedCommands = 0;
      let removedCommands = 0;

      const oldCommandNames = client.commands.map((command) => command.name);

      commandFiles.forEach((commandFile) => {
        if (statSync(commandFile).isDirectory()) return;

        const command = require(commandFile);
        const commandName = command.name;

        // Verifica se o comando deve ser ignorado ou se os campos obrigatórios estão presentes
        if (command.ignore || !commandName || !command.run) return;

        // Deleta o cache do módulo para que seja possível recarregar o comando
        delete require.cache[require.resolve(commandFile)];

        // Carrega o novo comando
        const newCommand = require(commandFile);

        if (client.commands.has(commandName)) {
          // Se o comando já existir, atualiza-o na coleção de comandos do bot
          client.commands.set(commandName, newCommand);
          reloadedCommands++;
        } else {
          // Se o comando for novo, adiciona-o à coleção de comandos do bot
          client.commands.set(commandName, newCommand);
          addedCommands++;
        }

        // Remove o comando da lista de comandos antigos
        const index = oldCommandNames.indexOf(commandName);
        if (index !== -1) {
          oldCommandNames.splice(index, 1);
        }
      });

      // Os comandos restantes na lista de comandos antigos foram removidos
      removedCommands = oldCommandNames.length;

      return {
        reloaded: reloadedCommands,
        added: addedCommands,
        removed: removedCommands,
      };
    };

    // Chama a função para recarregar os comandos passando o diretório onde eles estão localizados
    const { reloaded, added, removed } = await reloadCommands(rootPath);

    // Cria o embed com as informações sobre a recarga dos comandos
    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('Recarga dos Comandos')
      .setDescription('Os comandos prefixados foram recarregados com sucesso.')
      .addFields(
		{ name: 'Comandos Recarregados', value: `${reloaded}` },
		{ name: 'Comandos Adicionados', value: `${added}` },
		{ name: 'Comandos Removidos', value: `${removed}` },
	);

    // Envia o embed como resposta
    message.reply({ embeds: [embed] });
  },
};
              