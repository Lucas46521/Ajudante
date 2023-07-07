const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'work',
  description: 'Trabalhe e ganhe dinheiro',
  cooldown: 600, // Tempo em segundos (10 minutos)
  run: async(client, message, args) => {
    const jobs = [
      { name: 'Programador', salary: 200 },
      { name: 'Designer', salary: 150 },
      { name: 'Garçom', salary: 100 },
      { name: 'Atendente', salary: 150 },
      { name: 'Admin', salary: 175 },
      // Adicione outros empregos aqui...
    ];

    // Verifica se o usuário ainda está no cooldown
    const lastWorkTimestamp = await db.get(`workCooldown_${message.author.id}`) || 0;
    const currentTime = Date.now();
    const cooldown = Number(client.commands.get('work').cooldown) * 1000;

    if (lastWorkTimestamp + cooldown > currentTime) {
      const remainingTime = Math.ceil((lastWorkTimestamp + cooldown - currentTime) / 1000);
      
function formatSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}m ${remainingSeconds}s`;
}

      return message.reply(`Você precisa esperar mais ${formatSeconds(remainingTime)} antes de poder trabalhar novamente.`);
    }

    // Seleciona um emprego aleatório
    const job = jobs[Math.floor(Math.random() * jobs.length)];

    // Define o valor do salário do emprego selecionado
    const earnings = job.salary;

    // Adiciona o valor ganho ao saldo do usuário
    await db.add(`money_${message.author.id}`, earnings);

    // Atualiza o timestamp do último trabalho realizado
    await db.set(`workCooldown_${message.author.id}`, currentTime);

    // Cria o embed de resposta
    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setDescription(`Você trabalhou como ${job.name} e ganhou ${earnings} moedas! Bom trabalho!`);

    message.reply({ embeds: [embed] });
  },
};