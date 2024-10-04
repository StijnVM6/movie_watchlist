import cleanUpMovieImdbData from "../js/cleanUpMovieImdbData.js";

const omdbFetchBy_imdb_id = async (movieId) => {
    const response = await fetch(`/omdb/searchById/${movieId}`);
    const data = await response.json();
    const movieData = cleanUpMovieImdbData(data);
    return movieData;
};

export default omdbFetchBy_imdb_id;