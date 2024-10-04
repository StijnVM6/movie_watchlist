import express from "express";
// import notFoundErrorHandler from "../../../middleware/notFoundErrorHandler.js";
// import getMovies from "../../services/movies/getMovies.js";
import createMovie from "../services/movies/createMovie.js";

const router = express.Router();

router.post("/addMovie", async (req, res, next) => {
    try {
        const {
            imdbID,
            Title,
            Year,
            Genre,
            Poster,
            Runtime,
            Director,
            Plot,
            imdbRating,
            imdbVotes,
            Metascore
        } = req.body;

        const newMovie = await createMovie(
            imdbID,
            Title,
            Year,
            Genre,
            Poster,
            Runtime,
            Director,
            Plot,
            imdbRating,
            imdbVotes,
            Metascore
        );

        res.status(201).json(newMovie);
    } catch (err) {
        next(err)
    }
});

export default router;