require('dotenv').config();

async function getBirthdayGif() {
    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=happy+birthday&limit=50&offset=0&rating=pg&lang=en`);
        const json = await res.json();

        const gifs = json.data;

        if (!gifs || !gifs.length) {
            throw new Error('Nenhum GIF encontrado com o termo "happy birthday".');
        }

        const gifsFiltrados = gifs.filter(gif =>
            gif.title.toLowerCase().includes('birthday') ||
            gif.slug.toLowerCase().includes('birthday')
        );

        const listaFinal = gifsFiltrados.length ? gifsFiltrados : gifs;

        const escolhido = listaFinal[Math.floor(Math.random() * listaFinal.length)];
        return escolhido.images.original.url;
    } catch (err) {
        console.error('Erro ao buscar GIF de aniversário:', err.message);
        return null;
    }
}

module.exports = { getBirthdayGif };
