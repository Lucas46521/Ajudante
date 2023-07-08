const { EmbedBuilder } = require('discord.js');

const fetch = require('node-fetch');
const giphyApiKey = 'o7GuR2yVAKaOsfzhtRqNwgVuxFYDyvIK';

module.exports = {
  name: 'giphy',
  description: 'Pesquisa e envia um GIF do Giphy',
  aliases: ['gif'],
  run: async (client, message, args) => {
    // Verifica se foi informada alguma pesquisa
    if (!args.length) {
      return message.channel.send('Por favor, informe o que você gostaria de buscar.');
    }

    // Formata a pesquisa para ser usada na URL da API
    const query = args.join(' ').trim().toLowerCase().replace(/ /g, '+');

    // Faz a requisição para a API do Giphy
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&lang=pt`;
    const response = await fetch(url);
    const data = await response.json();

    // Verifica se a pesquisa retornou algum resultado
    if (!data.data.length) {
      return message.channel.send('Não foi possível encontrar nenhum GIF relacionado a sua pesquisa.');
    }

    // Seleciona um GIF aleatório da lista de resultados e envia para o canal
    const gif = data.data[Math.floor(Math.random() * data.data.length)];
    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Gif encontrado")
          .setDescription(`Title: ${gif.images.original.title}`)
          .setImage(gif.images.original.url)
          .setColor("Random")
      ]
    });
  },
};
    