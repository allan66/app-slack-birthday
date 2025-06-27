require('dotenv').config();
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY);

async function testarGiphy() {
  try {
    const res = await giphy.search({
      q: 'happy birthday',
      limit: 5,
      rating: 'g',
    });

    console.log('Giphy resultado:', res.data.map(g => g.images.original.url));
  } catch (err) {
    console.error('Erro ao acessar Giphy:', err);
  }
}

testarGiphy();
