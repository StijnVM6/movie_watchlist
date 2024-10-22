import { PrismaClient } from "@prisma/client";

const getGenre = async () => {
    const prisma = new PrismaClient();
    const genres = await prisma.genre.findMany({
        include: {
            movies: true,  // Include the related genre data
        },
    });

    if (genres.count <= 0) return null;
    else return genres;
};

export default getGenre;