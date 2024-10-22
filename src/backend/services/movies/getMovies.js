import { PrismaClient } from "@prisma/client";

const getMovies = async () => {
    const prisma = new PrismaClient();
    const movies = await prisma.movie.findMany({
        include: {
            genre: true,  // Include the related genre data
            type: true, // Include the related type data
        },
    });

    if (movies.count <= 0) return null;
    else return movies;
};

export default getMovies;