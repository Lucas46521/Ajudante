const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'mc-convert',
  description: 'Converte um IP de Minecraft Bedrock em um link para adicionar o servidor diretamente ao Minecraft Bedrock',
  run: async (client, message, args) => {
    // Verifica se o IP e o nome foram fornecidos
    if (!args[0] || !args[1]) {
      return message.reply('Por favor, forneça um IP de Minecraft Bedrock válido e um nome para o servidor.');
    }

    const ipAddress = args[0];
    const serverName = args.slice(1).join(' ');

    // Monta a URL da API para obter informações do servidor
    const apiUrl = `https://api.mcsrvstat.us/bedrock/2/${ipAddress}`;

    try {
      // Faz uma requisição à API para obter as informações do servidor
      const response = await axios.get(apiUrl);
      const serverData = response.data;

      // Verifica se o servidor está online
      if (!serverData.online) {
        return message.reply('O servidor especificado está offline ou não é válido.');
      }

      // Obtém o IP e a porta do servidor da resposta da API
      const serverIp = serverData.hostname;
      const serverPort = serverData.port;
      const serverStatus = serverData.online ? 'Online' : 'Offline';
      const serverHost = serverData.hostname

      // Monta o link para adicionar o servidor ao Minecraft Bedrock
      const link = `https://suinua.github.io/AddExternalServer/?name=${encodeURIComponent(serverName)}&ip=${encodeURIComponent(serverIp)}&port=${encodeURIComponent(serverPort)}`;

      // Cria o botão de exportar
      const exportButton = new ButtonBuilder()
        .setEmoji('📤')
        .setLabel('Exportar')
        .setURL(link)
        .setStyle(5);

      // Cria uma ação de linha contendo o botão de exportar
      const row = new ActionRowBuilder().addComponents(exportButton);

      // Cria um embed com as informações do servidor
      const embed = new EmbedBuilder()
        .setTitle('Link de Adição de Servidor Minecraft Bedrock')
        .setDescription(`Clique no botão abaixo para adicionar o servidor "${serverName}" ao Minecraft Bedrock.\n**IP do Servidor:** ${serverIp}\n**Status:**${serverStatus}\n**Porta:** ${serverPort}`);

      // Envia o embed com o botão como resposta
      message.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao obter as informações do servidor.');
    }
  },
};
        