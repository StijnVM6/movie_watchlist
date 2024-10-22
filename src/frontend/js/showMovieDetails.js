import omdbFetchBy_imdb_id from "../omdb/omdbFetchBy_imdb_id.js";
import addToWatchlist from "./fetch/addToWatchlist.js";

const showMovieDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    const movieData = await omdbFetchBy_imdb_id(movieId);

    if (movieData.Response === "True") {
        document.getElementById("posterImage").src = movieData.Poster;
        document.getElementById("movieTitle").textContent = movieData.Title;
        document.getElementById("movieYear").textContent = movieData.Year;
        document.getElementById("movieGenre").textContent = movieData.Genre;
        document.getElementById("movieRuntime").textContent = movieData.Runtime;
        document.getElementById("movieType").textContent = movieData.Type;
        document.getElementById("movieDirector").textContent = movieData.Director;
        document.getElementById("moviePlot").textContent = movieData.Plot;
        document.getElementById("movieRating").textContent = movieData.imdbRating;
        document.getElementById("movieImdbVotes").textContent = movieData.imdbVotes;
        document.getElementById("movieMetascore").textContent = movieData.Metascore;

        // Set the IMDB button link
        document.getElementById("imdbButton").onclick = () => {
            window.open(`https://www.imdb.com/title/${movieData.imdbID}`, '_blank');
        };
    } else {
        console.error('Error fetching movie details:', movieData.Error);
    }

    // Add to Watchlist button logic
    document.getElementById("addToWatchlistButton").addEventListener("click", () => {
        addToWatchlist(movieData);
    });

    // Close button logic to navigate back to the search page
    const closeMovieDetails = () => {
        // Redirect the user back to the main page (index.html)
        window.location.href = "/";
    };
    const closeButton = document.querySelector("button.close-button"); // Assuming this is your close button
    if (closeButton) {
        closeButton.addEventListener("click", closeMovieDetails);
    }
};

export default showMovieDetails;
