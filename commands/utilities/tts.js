const { getAudioBuffer } = require('simple-tts-mp3');
const { AttachmentBuilder } = require('discord.js');
const supportedLanguages = ['af', 'sq', 'de', 'ar', 'bn', 'my', 'bs', 'bg', 'km', 'kn', 'ca', 'cs', 'zh', 'zh-TW', 'si', 'ko', 'hr', 'da', 'sk', 'es', 'et', 'fi', 'fr', 'el', 'gu', 'hi', 'nl', 'hu', 'id', 'en', 'is', 'it', 'ja', 'la', 'lv', 'ml', 'ms', 'mr', 'ne', 'no', 'pl', 'pt', 'ro', 'ru', 'sr', 'sw', 'sv', 'su', 'tl', 'th', 'ta', 'te', 'tr', 'uk', 'ur', 'vi'];

module.exports = {
  name: 'tts',
  description: 'Envia uma mensagem de áudio com o texto informado por TTS',
  usage: '<texto> [linguagem]',
  userPermissions: ['ATTACH_FILES'],
  run: async (client, message, args) => {
    // Verifica se o usuário informou o texto
    if (args.length < 1) {
      return message.reply('Por favor, informe um texto para ser convertido em áudio.');
    }

    let text = '';
    let lang = 'pt';

    // Verifica se o usuário informou a linguagem
    if (args.length > 1) {
      lang = args[args.length - 1].toLowerCase();

      // Verifica se a linguagem é suportada
      if (!supportedLanguages.includes(lang)) {
        message.reply('A linguagem informada não é suportada, utilizarei "pt" como padrão.');
        lang = 'pt';
      }

      // Junta o texto sem a linguagem
      text = args.slice(0, args.length - 1).join(' ');
    } else {
      // Caso não tenha informado a linguagem, usa a padrão
      text = args[0];
    }
    
    try {
      // Faz a conversão do texto em áudio com a voz da linguagem escolhida
      const audioBuffer = await getAudioBuffer(text, lang);

      // Envia a mensagem de áudio para o canal
      message.channel.send({ content: 'Aqui está o arquivo de áudio:', files: [new AttachmentBuilder(audioBuffer, { name: 'audio.ogg' })] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao converter o texto em áudio.');
    }
  },
};