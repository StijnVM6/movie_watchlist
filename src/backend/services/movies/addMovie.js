import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const createMovie = async (name) => {
    const prisma = new PrismaClient();
    const imdb_id = req.body.imdb_id;
    const key = process.env.OMDB_API_KEY;

    // Fetch movie details from OMDb by IMDb ID
    await axios.get(`http://www.omdbapi.com/?i=${imdb_id}&apikey=${key}`)
        .then(async (response) => {
            const movie = response.data;
            const { title, year, genre, poster } = movie;

            // Insert movie into SQLite database
            const addedMovie = await prisma.movie.create({
                data: {
                    title: title,
                    year: year,
                    genre: genre,
                    poster: poster
                }
            });

            return movie;

        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error adding movie');
        });
    return movie;
};

export default createMovie;