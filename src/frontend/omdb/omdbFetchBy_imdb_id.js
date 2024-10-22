import cleanUpMovieImdbData from "../js/cleanUpMovieImdbData.js";
import getAuthToken from "../js/getAuthToken.js";

const omdbFetchBy_imdb_id = async (movieId) => {
    const token = getAuthToken();

    const response = await fetch(`/omdb/searchById/${movieId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        },
    });
    const data = await response.json();
    const movieData = cleanUpMovieImdbData(data);
    return movieData;
};

export default omdbFetchBy_imdb_id;