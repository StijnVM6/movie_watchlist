import { PrismaClient } from "@prisma/client";
import formatGenre from "./formatGenre.js";

const createGenre = async (name) => {
    const prisma = new PrismaClient();

    const genre = formatGenre(name);

    genre.forEach(async (genre) => {
        // check if genre already exists
        const existCheck = await prisma.genre.findUnique({
            where: { name: genre }
        });

        if (existCheck === null) {
            // create genre
            await prisma.genre.create({
                data: { name: genre }
            });
            console.log(`[${genre}] added to the database.`);
        } else { // movie already is in watchlist
            console.log(`[${genre}] is already in the database with id: ${existCheck.id}`);
        }
    });
};

export default createGenre;