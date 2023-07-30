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
    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${text}`,
        user: message.author.username,
    });
const responsech = await response.data.choices[0].text 
await message.reply(responsech)
  }
        }