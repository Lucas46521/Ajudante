const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'qrgen',
  description: 'Gera um código QR com base em uma URL',
  usage: '<URL>',
  run: async (client, message, args) => {
    // Verifica se o usuário informou a URL
    if (args.length < 1) {
      return message.reply('Por favor, informe uma URL para gerar o código QR.');
    }

    const url = args.join(' ');
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}&&format=jpg`;
    const trimmedContent = qrCodeContent.slice(0, 4096);

      // Verifica se o conteúdo foi cortado devido ao limite de caracteres
      if (qrCodeContent.length > 4096) {
        message.channel.send('Aviso: O conteúdo do código QR excede o limite de caracteres do Discord e foi cortado.');
      }
    // Cria o embed com a imagem do código QR
    const embed = new EmbedBuilder()
      .setTitle('Código QR Gerado')
      .setDescription(`**Conteudo:** ${encodeURIComponent(url)}`)
      .setImage(qrCodeUrl);

    // Envia o embed como resposta
    message.reply({ embeds: [embed] });
  },
};
        