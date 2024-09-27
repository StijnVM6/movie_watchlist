import express from "express";
import notFoundErrorHandler from "../../../middleware/notFoundErrorHandler.js";


const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query;
        const amenities = await getAmenities(name);

        if (amenities === null)
            res.status(404).json({ message: "No such amenities found from request queries." });
        else
            res.status(200).json(amenities);
    } catch (err) {
        next(err)
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await updateAmenityById(id, name);
        res.status(200).json({ message: `Amenity with id: ${id} succesfully updated.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteAmenityById(id);
        res.status(200).json({ message: `Amenity with id: ${id} succesfully deleted.` });
    } catch (err) {
        next(err)
    }
}, notFoundErrorHandler);

export default router;