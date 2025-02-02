import { PrismaClient } from "@prisma/client";
import formatGenre from "../genres/formatGenre.js";

const createMovie = async (
    imdbID,
    Title,
    Year,
    Genre,
    Poster,
    Runtime,
    Type,
    Director,
    Plot,
    imdbRating,
    imdbVotes,
    Metascore
) => {
    const prisma = new PrismaClient();

    // check if movie already exists
    const existCheck = await prisma.movie.findUnique({
        where: { imdbId: imdbID }
    });

    if (existCheck === null) { // movie is not in watchlist 
        const formattedGenre = formatGenre(Genre);

        // create movie
        const newMovie = await prisma.movie.create({
            data: {
                imdbId: imdbID,
                title: Title,
                year: Year,
                poster: Poster,
                runtime: Runtime,
                type: {
                    connectOrCreate: {
                        where: { name: Type }, // Try to connect by name
                        create: { name: Type } // Create if not found
                    }
                },
                director: Director,
                plot: Plot,
                imdbRating: imdbRating,
                imdbVotes: imdbVotes,
                metascore: Metascore,
                // Handle many-to-many genre relationship
                genre: {
                    connectOrCreate: formattedGenre.map((genreName) => ({
                        where: { name: genreName }, // Try to connect by name
                        create: { name: genreName }  // Create if not found
                    }))
                }
            }
        });

        return newMovie;
    } else { // movie already is in watchlist
        console.log(`Movie is already in the watchlist with id: ${existCheck.id}`);
        return null;
    }
};

export default createMovie;