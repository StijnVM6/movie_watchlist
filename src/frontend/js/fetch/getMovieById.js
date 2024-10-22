import getAuthToken from "../getAuthToken.js";

const getMoviesFromWatchlist = async (id) => {
    const token = getAuthToken();

    try {
        const response = await fetch(`/movies/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        });

        const movieData = await response.json();

        // Convert the genres array into a comma-separated string of genre names
        if (Array.isArray(movieData.genre)) {
            const genres = movieData.genre.map((element) => element.name).join(", ");
            movieData.genre = genres;
        } else {
            movieData.genre = movieData.genre.name;
        }

        // Convert the types array into a comma-separated string of types
        if (Array.isArray(movieData.genre)) {
            const types = movieData.type.map((element) => element.name).join(", ");
            movieData.type = types;
        } else {
            movieData.type = movieData.type.name;
        }

        return movieData;
    } catch (err) {
        console.error("Error in request:", err);
    }
}

export default getMoviesFromWatchlist;