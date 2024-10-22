import express from "express";
import createGenre from "../services/genres/createGenre.js";
import getGenres from "../services/genres/getGenres.js";
import deleteGenreById from "../services/genres/deleteGenreById.js";
import getGenreById from "../services/genres/getGenreById.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addGenre", authMiddleware, async (req, res, next) => {
    try {
        const { name } = req.body;
        const newGenre = await createGenre(name);

        if (newGenre === null) {
            res.status(400).json({ message: "Genre already exists in watchlist." })
        } else {
            res.status(201).json(newGenre);
        }
    } catch (err) {
        next(err);
    }
});

router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const genres = await getGenres();
        if (genres === null) {
            res.status(404).json({ message: "No such genres found from request queries." });
        } else {
            res.status(200).json(genres);
        }
    } catch (err) {
        next(err);
    }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const genre = await getGenreById(id);
        res.status(200).json(genre);
    } catch (err) {
        next(err);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteGenreById(id);
        res.status(200).json({ message: `Genre with IMDB id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err);
    }
}, notFoundErrorHandler);

export default router;