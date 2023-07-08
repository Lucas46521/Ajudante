const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: process.env.GPT,
});

module.exports = {
  name: 'gpt',
  description: 'Responde com base no prompt fornecido usando a API da OpenAI GPT-3',
  run: async (client, message, args) => {
     
const openai = new OpenAIApi(config);
    if (args.length < 1) {
      return message.reply('Por favor, forneça o texto.');
    }
const text = args.join(' ')
    
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-instruct",
        messages: [
        { role: 'system', content: 'Você é um bot do discord chamado Ajudante.' },
        { role: 'system', content: 'Você está dentro de ambiente com node.js' },
        {role: "user", content: `${text}`}, // Conteúdo da mensagem do usuário
      ],
        user: message.author.username,
    });
const responsech = await response.data.choices[0].message 
await message.reply(responsech)
  }
  }