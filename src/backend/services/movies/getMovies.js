import { PrismaClient } from "@prisma/client";
import axios from "axios";
import "dotenv/config";

const getMovies = async (name) => {
    // const prisma = new PrismaClient();
    // const movies = await prisma.movie.findMany({
    //     where: { name: name }
    // });

    // if (movies.count <= 0) return null;
    // else return movies;

    const key = process.env.OMDB_API_KEY;
    await axios.get(`http://www.omdbapi.com/?s=${name}&apikey=${key}`)
        .then(response => {
            const movies = response.data.Search || [];
            console.log("movies : ", movies);
            return (movies);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error fetching data from OMDb');
        });
};

export default getMovies;