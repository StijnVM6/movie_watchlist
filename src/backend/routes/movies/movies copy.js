import express from "express";
// import notFoundErrorHandler from "../../../middleware/notFoundErrorHandler.js";
import getMovies from "../../services/movies/getMovies.js";

const router = express.Router();

router.get("/search/:name", async (req, res, next) => {
    try {
        const { name } = req.params;
        console.log("name is: ", name);
        // const { name } = req.query.query;
        const movies = await getMovies(name);

        if (movies === null)
            res.status(404).json({ message: "No movies found from request." });
        else
            res.status(200).json(movies);
        // res.render('index', { movies: rows });
    } catch (err) {
        next(err)
    }
});

export default router;

app.get('/api/movie/:id', async (req, res) => {
    const { id } = req.params;
    const apiKey = process.env.OMDB_API_KEY;

    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from OMDB API' });
    }
});