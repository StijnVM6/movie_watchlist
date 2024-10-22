import { PrismaClient } from "@prisma/client";
import formatGenre from "../genres/formatGenre.js";

const createType = async (
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

    // check if type already exists
    const existCheck = await prisma.type.findUnique({
        where: { imdbId: imdbID }
    });

    if (existCheck === null) { // type is not in watchlist 
        const formattedGenre = formatGenre(Genre);

        // create type
        const newType = await prisma.type.create({
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

        return newType;
    } else { // type already is in watchlist
        console.log(`Type is already in the watchlist with id: ${existCheck.id}`);
        return null;
    }
};

export default createType;