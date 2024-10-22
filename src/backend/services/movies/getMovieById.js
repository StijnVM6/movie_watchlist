import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getMovieById = async (id) => {
    const prisma = new PrismaClient();

    const movie = await prisma.movie.findUnique({
        where: { id: id },
        include: {
            genre: true,  // Include the related genre data
            type: true, // Include the related type data
        },
    });

    if (!movie) {
        throw new NotFoundError("Movie", id);
    } else return movie;
};

export default getMovieById;