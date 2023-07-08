const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'qrread',
  description: 'Lê o conteúdo de um código QR a partir de uma imagem',
  usage: '<URL da imagem do código QR>',
  run: async (client, message, args) => {
    // Verifica se o usuário informou a URL da imagem
    if (args.length < 1) {
      return message.reply('Por favor, informe a URL da imagem contendo o código QR.');
    }

    const imageUrl = args[0];

    try {
      // Faz uma requisição GET para ler o código QR
      const response = await axios.get(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURIComponent(imageUrl)}`);
      
      // Obtém o conteúdo do código QR decodificado
      const qrCodeContent = response.data[0].symbol[0].data;

      // Limita o conteúdo do código QR de acordo com o limite do Discord (4096 caracteres)
      const trimmedContent = qrCodeContent.slice(0, 4096);

      // Cria um embed com as informações do código QR
      const embed = new EmbedBuilder ()
        .setColor('#FF0000')
        .setTitle('Leitura de Código QR')
        .setDescription(`Conteúdo do código QR: ${trimmedContent}`)
        .setTimestamp();

      // Envia o embed
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao ler o código QR.');
    }
  },
};