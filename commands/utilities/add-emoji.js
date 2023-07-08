const { Permissions, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'addemoji',
  description: 'Adiciona um emoji ao servidor',
  usage: '<emoji> <nome>',
  userPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
  run: async (client, message, args) => {
    const [emoji, nome] = args;

    try {
      // Verifica se o emoji é uma URL de imagem
      if (isValidURL(emoji)) {
        // Faz o download da imagem
        const response = await fetch(emoji);
        const buffer = await response.buffer();

        // Verifica se o emoji já existe
        const existingEmoji = message.guild.emojis.cache.find(
          emoji => emoji.url === emoji && emoji.name === nome
        );
        if (existingEmoji) {
          return message.reply('Este emoji já existe neste servidor.');
        }

        // Adiciona o emoji
        const createdEmoji = await message.guild.emojis.create({ attachment: buffer, name: nome });
        const embed = new EmbedBuilder()
          .setTitle(`Emoji ${nome} adicionado com sucesso!`)
          .setColor('#00FF00')
          .setImage(createdEmoji.url);
        return message.reply({ embeds: [embed] });
      } else {
        return message.reply('O emoji fornecido não é uma URL de imagem válida.');
      }
    } catch (error) {
      console.error(error);
      return message.reply('Ocorreu um erro ao adicionar o emoji.');
    }
  },
};

// Função para verificar se uma string é uma URL válida
function isValidURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocolo
                             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domínio
                             '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR endereço IP (v4) ou
                             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // porta e caminho
                             '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                             '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
    }
          