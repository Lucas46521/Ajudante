const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'kill',
  description: 'Envia uma imagem de morte',
  usage: '[usuário]',
  run: async (client, message, args) => {
    // Verifica se um usuário foi mencionado
    const user = message.mentions.users.first();

    try {
      // Array de endpoints de imagens de beijo
      const kissEndpoints = [
       'https://api.waifu.pics/sfw/kill',
         'https://anime-api.hisoka17.repl.co/img/kill',
        'https://api.satou-chan.xyz/api/endpoint/kill',
        // Adicione mais endpoints aqui, se desejar
      ];

      // Seleciona aleatoriamente um endpoint de beijo
      const randomEndpoint = kissEndpoints[Math.floor(Math.random() * kissEndpoints.length)];

      // Faz a solicitação GET para obter a imagem de beijo
      const response = await axios.get(randomEndpoint, { responseType: 'json' });
      const gen = response.data ? response.data.url : null
      // Cria um AttachmentBuilder com a imagem
      
      // Cria um EmbedBuilder com a mensagem
      const embedBuilder = new EmbedBuilder()
        .setDescription(user ? `🗡️ ${message.author} matou ${user}! 🗡️` : ` ${message.author} está com sede de sangue ⚔️`)
        .setColor('#ff00ff')
        .setImage(gen);

      // Envia o embed e a imagem
      message.reply({ embeds: [embedBuilder] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao enviar o beijo. Tente novamente mais tarde.');
    }
  },
};
              