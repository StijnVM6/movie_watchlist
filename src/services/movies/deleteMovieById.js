import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteMovieById = async (id) => {
    const prisma = new PrismaClient();

    const movie = await prisma.movie.deleteMany({
        where: { id: id }
    });

    if (movie.count <= 0) {
        throw new NotFoundError("Movie", id);
    } else return id;
};

export default deleteMovieById;