const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'hug',
  description: 'Envia uma imagem de abraço',
  usage: '[usuário]',
  run: async (client, message, args) => {
    // Verifica se um usuário foi mencionado
    const user = message.mentions.users.first();

    try {
      // Array de endpoints de imagens de beijo
      const kissEndpoints = [          'https://anime-api.hisoka17.repl.co/img/hug',
  'https://api.waifu.pics/sfw/hug',
  'https://api.otakugifs.xyz/gif?reaction=hug',
        // Adicione mais endpoints aqui, se desejar
      ];

      // Seleciona aleatoriamente um endpoint de beijo
      const randomEndpoint = kissEndpoints[Math.floor(Math.random() * kissEndpoints.length)];

      // Faz a solicitação GET para obter a imagem de beijo
      const response = await axios.get(randomEndpoint, { responseType: 'json' });
      const gen = response.data ? response.data.url || response.data.link : null
      // Cria um EmbedBuilder com a mensagem
      const embedBuilder = new EmbedBuilder()
        .setDescription(user ? `🤗 ${message.author} abracou ${user}! 🤗` : ` ${message.author} está precisando de um abraço 🤗`)
        .setColor('#ff00ff')
        .setImage(gen);
            // Envia o embed e a imagem
      message.reply({ embeds: [embedBuilder] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao enviar o abraço. Tente novamente mais tarde.');
    }
  },
};
              