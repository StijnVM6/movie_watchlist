import { PrismaClient } from "@prisma/client";
import moviesData from "../src/data/movies.json" assert { type: "json"};

const prisma = new PrismaClient({ log: ["query", "info", "error"] });

const main = async () => {
    const { movies } = moviesData;

    for (const movie of movies) {
        await prisma.movie.upsert({
            where: { id: movie.id },
            update: {},
            create: movie,
        });
    };
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })