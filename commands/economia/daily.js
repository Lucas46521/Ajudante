const { QuickDB } = require("quick.db");
const db = new QuickDB({ filePath: "./database/main.sqlite" });
const moment = require('moment');

const cooldownDuration = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

module.exports = {
  name: 'daily',
  description: 'Recebe uma recompensa diária.',
  usage: '',
  cooldown: cooldownDuration,
  run: async (client, message, args) => {
    const user = message.author;
    const lastDaily = await db.get(`lastDaily_${user.id}`);

    if (lastDaily) {
      const now = moment();
      const lastDailyDate = moment(lastDaily);
      const diff = now.diff(lastDailyDate, 'hours');

      if (diff < 24) {
        const remainingHours = 24 - diff;
        return message.reply(`Você já coletou sua recompensa diária. Volte em ${remainingHours} horas.`);
      }
    }

    const dailyAmount = 1000;

    await db.add(`money_${user.id}`, dailyAmount);
    await db.set(`lastDaily_${user.id}`, moment().format());

    message.reply(`Você coletou sua recompensa diária de $${dailyAmount}. Volte em 24 horas para coletar novamente.`);
  },
};
      