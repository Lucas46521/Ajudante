const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'slut',
  description: 'Realiza uma atividade arriscada com chance de perda de dinheiro',
  cooldown: 600, // Tempo em segundos (10 minutos)
  run: async (client, message, args) => {
    //Empregos
    const jobs = [
      { name: 'Garoto(a) de prograna', salary: 250, lost: 250 },
      { name: 'Vendedor de fotos +18 falsificadas', salary: 150, lost: 300 },
      { name: 'Vendedor de dvd pirata', salary: 100, lost: 150 },
      { name: 'Vendedor de dorgas', salary: 300, lost: 600 },
      // Adicione outros empregos aqui...
    ];

    // Verifica se o usuário ainda está no cooldown
    const lastSlutTimestamp = await db.get(`slutCooldown_${message.author.id}`) || 0;
    const currentTime = Date.now();
    const cooldown = Number(client.commands.get('slut').cooldown) * 1000;

    if (lastSlutTimestamp + cooldown > currentTime) {
      const remainingTime = Math.ceil((lastSlutTimestamp + cooldown - currentTime) / 1000);
      
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
      
    const successRate = 0.25; // Chance de sucesso (25%)
    const amountLost = job.lost; // Quantidade de dinheiro perdida em caso de falha

    // Verifica se o usuário possui dinheiro suficiente para realizar a atividade
    const userBalance = await db.get(`money_${message.author.id}`) || 0;
    // Realiza a atividade com base na chance de sucesso
    const success = Math.random() < successRate;

    if (success) {
      // Caso de sucesso
      const amountWon = earnings ; // Quantidade de dinheiro ganha em caso de sucesso

      // Adiciona a quantia ganha ao saldo do usuário
      await db.add(`money_${message.author.id}`, amountWon);
      // Atualiza o timestamp do último trabalho realizado
    await db.set(`slutCooldown_${message.author.id}`, currentTime);
      
  const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setDescription(`Você trabalhou como ${job.name} e ganhou ${earnings} moedas! Bom trabalho!`);

    message.reply({ embeds: [embed] });
    } else {
      // Caso de falha
      // Remove a quantia perdida do saldo do usuário
      await db.sub(`money_${message.author.id}`, amountLost);

      const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setDescription(`Você foi pego(a) enquanto trabalhava como ${job.name} e perdeu ${amountLost} moedas! Parabéns!`);

    message.reply({ embeds: [embed] });
    }
  },
};
              