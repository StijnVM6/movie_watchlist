import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteGenreById = async (id) => {
    const prisma = new PrismaClient();

    const genre = await prisma.genre.deleteMany({
        where: { id: id }
    });

    if (genre.count <= 0) {
        throw new NotFoundError("Genre", id);
    } else return id;
};

export default deleteGenreById;