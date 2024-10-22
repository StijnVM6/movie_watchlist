import removeFromWatchlist from "./fetch/removeFromWatchlist.js";
import getMovieById from "./fetch/getMovieById.js";

const showMyMovieDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    const movieData = await getMovieById(movieId);
    console.log("movieData genre = ", movieData.genre);
    console.log("movieData type = ", movieData.type);

    if (movieData) {
        document.getElementById("posterImage").src = movieData.poster;
        document.getElementById("movieTitle").textContent = movieData.title;
        document.getElementById("movieYear").textContent = movieData.year;
        document.getElementById("movieGenre").textContent = movieData.genre;
        document.getElementById("movieRuntime").textContent = movieData.runtime;
        document.getElementById("movieType").textContent = movieData.type;
        document.getElementById("movieDirector").textContent = movieData.director;
        document.getElementById("moviePlot").textContent = movieData.plot;
        document.getElementById("movieRating").textContent = movieData.imdbRating;
        document.getElementById("movieImdbVotes").textContent = movieData.imdbVotes;
        document.getElementById("movieMetascore").textContent = movieData.metascore;

        // Set the IMDB button link
        document.getElementById("imdbButton").onclick = () => {
            window.open(`https://www.imdb.com/title/${movieData.imdbId}`, "_blank");
        };
    } else {
        console.error("Error fetching movie details.");
    }

    // Remove from Watchlist button logic
    document.getElementById("removeFromWatchlistButton").addEventListener("click", () => {
        removeFromWatchlist(movieData.id);
    });

    // Close button logic to navigate back to the search page
    const closeMovieDetails = () => {
        // Redirect the watchlist
        window.location.href = "/watchlist";
    };
    const closeButton = document.querySelector("button.close-button");
    if (closeButton) {
        closeButton.addEventListener("click", closeMovieDetails);
    }
};

export default showMyMovieDetails;
