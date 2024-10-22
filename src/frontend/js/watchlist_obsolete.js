// Mocked movie data (you will fetch this from your backend in real usage)
const watchlistMovies = [
    { Title: "Inception", Year: 2010, Genre: "Action, Sci-Fi", Poster: "https://via.placeholder.com/100x150?text=Inception" },
    { Title: "Interstellar", Year: 2014, Genre: "Adventure, Drama, Sci-Fi", Poster: "https://via.placeholder.com/100x150?text=Interstellar" },
    { Title: "The Dark Knight", Year: 2008, Genre: "Action, Crime, Drama", Poster: "https://via.placeholder.com/100x150?text=The+Dark+Knight" },
    { Title: "The Prestige", Year: 2006, Genre: "Drama, Mystery, Sci-Fi", Poster: "https://via.placeholder.com/100x150?text=The+Prestige" }
];

// Group movies by their first genre and sort them by year (descending)
const groupMoviesByGenre = (movies) => {
    const genreGroups = {};

    movies.forEach(movie => {
        const genre = movie.Genre.split(", ")[0]; // Get the first listed genre
        if (!genreGroups[genre]) genreGroups[genre] = [];
        genreGroups[genre].push(movie);
    });

    // Sort each genre group by year in descending order
    for (const genre in genreGroups) {
        genreGroups[genre].sort((a, b) => b.Year - a.Year);
    }

    return genreGroups;
};

// Render movies grouped by genre
const renderMovies = (groupedMovies) => {
    const container = document.getElementById("movieGroupsContainer");
    container.innerHTML = "";

    for (const genre in groupedMovies) {
        const group = groupedMovies[genre];

        // Create genre group container
        const genreDiv = document.createElement("div");
        genreDiv.classList.add("movie-group");

        // Genre title (collapsible)
        const genreTitle = document.createElement("div");
        genreTitle.classList.add("movie-group-title");
        genreTitle.innerHTML = `${genre} <span class="collapse-icon">[-]</span>`;
        genreDiv.appendChild(genreTitle);

        // Movie list (collapsible section)
        const movieList = document.createElement("div");
        movieList.classList.add("movie-list");

        group.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            const posterDiv = document.createElement("div");
            posterDiv.classList.add("movie-poster");
            posterDiv.innerHTML = `<img src="${movie.Poster}" alt="${movie.Title} Poster">`;
            movieCard.appendChild(posterDiv);

            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("movie-details");
            detailsDiv.innerHTML = `<div class="movie-title">${movie.Title}</div>
                                    <div class="movie-year">${movie.Year}</div>`;
            movieCard.appendChild(detailsDiv);

            movieList.appendChild(movieCard);
        });

        genreDiv.appendChild(movieList);
        container.appendChild(genreDiv);

        // Event listener for collapsing/expanding genres
        genreTitle.addEventListener("click", () => {
            movieList.classList.toggle("collapsed");
            genreTitle.querySelector(".collapse-icon").textContent = movieList.classList.contains("collapsed") ? "[+]" : "[-]";
        });
    }
};

// Sort function for year (descending)
document.getElementById("sortBy").addEventListener("change", () => {
    const groupedMovies = groupMoviesByGenre(watchlistMovies);
    renderMovies(groupedMovies);
});

// Initial render
const groupedMovies = groupMoviesByGenre(watchlistMovies);
renderMovies(groupedMovies);
