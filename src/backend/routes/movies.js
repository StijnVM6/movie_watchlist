import express from "express";
import createMovie from "../services/movies/createMovie.js";
import getMovies from "../services/movies/getMovies.js";
import deleteMovieById from "../services/movies/deleteMovieById.js";
import getMovieById from "../services/movies/getMovieById.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addMovie", authMiddleware, async (req, res, next) => {
    try {
        const {
            imdbID,
            Title,
            Year,
            Genre,
            Poster,
            Runtime,
            Type,
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
            Type,
            Director,
            Plot,
            imdbRating,
            imdbVotes,
            Metascore
        );

        if (newMovie === null) {
            res.status(400).json({ message: "Movie already exists in watchlist." })
        } else {
            res.status(201).json(newMovie);
        }
    } catch (err) {
        next(err);
    }
});

router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const movies = await getMovies();
        if (movies === null) {
            res.status(404).json({ message: "No such movies found from request queries." });
        } else {
            res.status(200).json(movies);
        }
    } catch (err) {
        next(err);
    }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await getMovieById(id);
        res.status(200).json(movie);
    } catch (err) {
        next(err);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteMovieById(id);
        res.status(200).json({ message: `Movie with IMDB id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err);
    }
}, notFoundErrorHandler);

export default router;