import express from "express";
import createType from "../services/types/createType.js";
import getTypes from "../services/types/getTypes.js";
import deleteTypeById from "../services/types/deleteTypeById.js";
import getTypeById from "../services/types/getTypeById.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/addType", authMiddleware, async (req, res, next) => {
    try {
        const { name } = req.body;
        const newType = await createType(name);

        if (newType === null) {
            res.status(400).json({ message: "Type already exists in watchlist." })
        } else {
            res.status(201).json(newType);
        }
    } catch (err) {
        next(err);
    }
});

router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const types = await getTypes();
        if (types === null) {
            res.status(404).json({ message: "No such types found from request queries." });
        } else {
            res.status(200).json(types);
        }
    } catch (err) {
        next(err);
    }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const type = await getTypeById(id);
        res.status(200).json(type);
    } catch (err) {
        next(err);
    }
}, notFoundErrorHandler);

router.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTypeById(id);
        res.status(200).json({ message: `Type with IMDB id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err);
    }
}, notFoundErrorHandler);

export default router;