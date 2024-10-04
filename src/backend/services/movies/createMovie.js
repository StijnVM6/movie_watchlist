import { PrismaClient } from "@prisma/client";

const createMovie = async (
    imdbID,
    Title,
    Year,
    Genre,
    Poster,
    Runtime,
    Director,
    Plot,
    imdbRating,
    imdbVotes,
    Metascore
) => {
    const prisma = new PrismaClient();

    const newMovie = await prisma.movie.create({
        data: {
            imdbId: imdbID,
            title: Title,
            year: Year,
            genre: Genre,
            poster: Poster,
            runtime: Runtime,
            director: Director,
            plot: Plot,
            imdbRating: imdbRating,
            imdbVotes: imdbVotes,
            metascore: Metascore
        }
    });

    return newMovie;
};

export default createMovie;