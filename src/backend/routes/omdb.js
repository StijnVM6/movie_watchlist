import express from "express";
import "dotenv/config";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/searchByTitle/:title", authMiddleware, async (req, res) => {
    const { title } = req.params;
    const apiKey = process.env.OMDB_API_KEY;

    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        // next(err);
        res.status(500).json({ err: "Error fetching data from OMDB API." });
    }
});

router.get("/searchById/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const apiKey = process.env.OMDB_API_KEY;

    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        // next(err);
        res.status(500).json({ err: "Error fetching data from OMDB API." });
    }
});

export default router;