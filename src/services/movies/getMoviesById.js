import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getMovieById = async (id) => {
    const prisma = new PrismaClient();

    const movie = await prisma.movie.findUnique({
        where: { id: id }
    });

    if (!movie) {
        throw new NotFoundError("Movie", id);
    } else return movie;
};

export default getMovieById;