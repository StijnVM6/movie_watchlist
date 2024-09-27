import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const createMovie = async (name) => {
    const prisma = new PrismaClient();

    const movie = await prisma.movie.create({
        data: { name: name }
    });

    return movie;

    /*
    const check = await prisma.movie.findFirst({
        where: { name: name }
    });

    if (check === null) {
        const movie = await prisma.movie.create({
            data: { name: name }
        });

        return movie;
    } else { return null }
    */
};

export default createMovie;

app.post('/add_movie', (req, res) => {
    const imdb_id = req.body.imdb_id;
    const key = process.env.OMDB_API_KEY;
    // Fetch movie details from OMDb by IMDb ID
    axios.get(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${key}`)
        .then(response => {
            const movie = response.data;
            const { Title, Year, Genre, Poster } = movie;

            // Insert movie into SQLite database
            db.run(`INSERT INTO movies (imdb_id, title, year, genre, poster) VALUES (?, ?, ?, ?, ?)`,
                [imdb_id, Title, Year, Genre, Poster],
                (err) => {
                    if (err) {
                        console.error('Error inserting movie into database:', err.message);
                        return res.redirect('/');
                    }
                    res.redirect('/');
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error adding movie');
        });
});