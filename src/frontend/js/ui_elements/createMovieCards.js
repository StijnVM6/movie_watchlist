const createMovieCards = (movies) => {
    const watchlistContainer = document.getElementById("watchlistContainer");
    watchlistContainer.innerHTML = ""; // Clear any existing content

    // Loop through each movie in the list
    movies.forEach(movie => {
        // Create a card element
        const card = document.createElement("div");
        card.classList.add("movie-card");

        // Poster image
        const poster = document.createElement("img");
        poster.src = movie.poster;
        poster.alt = `${movie.title} poster`;
        card.appendChild(poster);

        // Movie Title
        const title = document.createElement("h3");
        title.textContent = movie.title;
        card.appendChild(title);

        // Movie Year
        const year = document.createElement("h4");
        year.textContent = `(${movie.year})`;
        card.appendChild(year);

        // Add a click event to navigate to the details page with the "from" parameter
        card.addEventListener("click", () => {
            window.location.href = `myMovieDetails?id=${movie.id}`;
        });

        // Append the card to the watchlist container
        watchlistContainer.appendChild(card);
    });
}

export default createMovieCards;
