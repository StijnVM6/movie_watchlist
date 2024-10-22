import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getGenreById = async (id) => {
    const prisma = new PrismaClient();

    const genre = await prisma.genre.findUnique({
        where: { id: id },
        include: {
            movies: true,  // Include the related genre data
        },
    });

    if (!genre) {
        throw new NotFoundError("Genre", id);
    } else return genre;
};

export default getGenreById;