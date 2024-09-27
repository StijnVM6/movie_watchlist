import { PrismaClient } from "@prisma/client";

const getMovies = async (name) => {
    const prisma = new PrismaClient();
    const amenities = await prisma.movie.findMany({
        where: { name: name }
    });

    if (amenities.count <= 0) return null;
    else return amenities;
};

export default getMovies;

// Route: Search movies via OMDb API
app.get('/search', (req, res) => {
    const query = req.query.query;
    axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`)
        .then(response => {
            const movies = response.data.Search || [];
            res.json(movies);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching data from OMDb');
        });
});