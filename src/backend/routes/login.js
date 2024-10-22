import express from "express";
import login from "../auth/login.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const token = await login(username, password);
        // const tokenObject = { token: token }; 

        if (!token) {
            res.status(401).json({ message: `Incorrect login credentials.` });
        } else {
            // res.status(200).json({ message: `Succesful login, token created: ${token}` });
            res.status(200).json(token); // return the object instead of string. 
        }

    } catch (err) {
        next(err);
    }
});

export default router;