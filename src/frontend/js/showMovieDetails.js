import omdbFetchBy_imdb_id from "../omdb/omdbFetchBy_imdb_id.js";

const showMovieDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    const data = await omdbFetchBy_imdb_id(movieId);

    if (data.Response === "True") {
        document.getElementById("posterImage").src = data.Poster;
        document.getElementById("movieTitle").textContent = data.Title;
        document.getElementById("movieYear").textContent = data.Year;
        document.getElementById("movieGenre").textContent = data.Genre;
        document.getElementById("movieDirector").textContent = data.Director;
        document.getElementById("moviePlot").textContent = data.Plot;
        document.getElementById("movieRating").textContent = data.imdbRating;
        document.getElementById("imdbVotes").textContent = data.imdbVotes;
        document.getElementById("Metascore").textContent = data.Metascore;

        // Set the IMDB button link
        document.getElementById("imdbButton").onclick = () => {
            window.open(`https://www.imdb.com/title/${data.imdbID}`, '_blank');
        };
    } else {
        console.error('Error fetching movie details:', data.Error);
    }

    // Add to Watchlist button logic
    document.getElementById("addToWatchlistButton").onclick = () => {
        // Logic to add to watchlist (e.g., save to local storage, etc.)
        alert("Added to Watchlist!");
    };

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
