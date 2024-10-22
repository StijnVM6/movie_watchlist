import getMoviesFromWatchlist from "./fetch/getMoviesFromWatchlist.js";
import createMovieCards from "./ui_elements/createMovieCards.js";

const showWatchlist = async () => {
    try {
        // get all movies in watchlist
        const movies = await getMoviesFromWatchlist();

        // render the movie cards
        createMovieCards(movies);
    } catch (err) {
        console.error("Error in request:", err);
    }
};

export default showWatchlist;