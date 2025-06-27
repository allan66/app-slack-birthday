const { WebClient } = require('@slack/web-api');
const frases = require('./frases');
const { getBirthdayGif } = require('./giphyClient');
require('dotenv').config();

const slack = new WebClient(process.env.SLACK_TOKEN);
const channel = `#${process.env.SLACK_CHANNEL}`;

async function getSheetData() {
  const url = process.env.SHEET_URL;
  const res = await fetch(url);
  const csv = await res.text();

  const rows = csv.split('\n').map(row => row.split(','));
  return rows.slice(1);
}

function parseDateString(dateStr) {
  const [dia, mes, ano] = dateStr.replace(/"/g, '').trim().split('/');
  return new Date(Date.UTC(ano, mes - 1, dia));
}

async function getSlackUserIdByEmail(email) {
  try {
    const res = await slack.users.lookupByEmail({ email: email.trim() });
    return res.user.id;
  } catch (err) {
    console.warn(`Usuário com email ${email} não encontrado no Slack. Erro:`, err);
    return null;
  }
}

async function checkBirthdays() {
  const today = new Date();
  const todayDay = today.getUTCDate();
  const todayMonth = today.getUTCMonth();

  const rows = await getSheetData();

  const aniversariantes = rows.filter(([nome, email, data]) => {
    if (!data) return false;

    const birthDate = parseDateString(data);
    const birthDay = birthDate.getUTCDate();
    const birthMonth = birthDate.getUTCMonth();

    return birthDay === todayDay && birthMonth === todayMonth;
  });

  if (aniversariantes.length) {
    const blocks = [];

    for (const [nome, email] of aniversariantes) {
      const slackId = await getSlackUserIdByEmail(email);
      const mencionavel = slackId ? `<@${slackId}>` : nome;
      const fraseFn = frases[Math.floor(Math.random() * frases.length)];
      const mensagem = fraseFn(mencionavel) + '\n';
      const gifAleatorio = await getBirthdayGif();

      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: mensagem,
        },
      });

      if (gifAleatorio) {
        blocks.push({
          type: "image",
          image_url: gifAleatorio,
          alt_text: "GIF de aniversário 🎂",
        });
      } else {
        console.warn('GIF não encontrado para aniversariante:', nome);
      }
    }

    await slack.chat.postMessage({
      channel,
      text: '🎉 Hoje temos aniversariantes especiais!',
      blocks,
    });
  }
}

checkBirthdays();
