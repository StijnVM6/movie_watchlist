import omdbFetchBy_title from "../omdb/omdbFetchBy_title.js";

const searchMovies = async () => {
    // Get elements
    const searchField = document.getElementById("searchField");
    const suggestionsContainer = document.getElementById("suggestions");

    // Process searchfield text
    const search = searchField.value.toLowerCase();
    const query = search.replaceAll(" ", "%20");
    // console.log("Query:", query); // Log the query
    suggestionsContainer.innerHTML = "";

    // If the query is empty, hide the suggestions list
    if (query === "") {
        suggestionsContainer.style.display = "none";
        return;
    }

    // Do the search
    try {
        // Fetch data from the OMDB API
        const data = await omdbFetchBy_title(query);

        // Check if the response contains movies
        if (data.Response === "True") {
            const movies = data.Search;
            suggestionsContainer.innerHTML = "";

            // Display suggestions for matching movies
            movies.forEach(movie => {
                const listItem = document.createElement("li");
                listItem.textContent = `${movie.Title} (${movie.Year})`;

                // Redirect to the movie details page with the movie ID as a query parameter
                listItem.onclick = () => {
                    window.location.href = `movieDetails?id=${movie.imdbID}`;
                };

                suggestionsContainer.appendChild(listItem);
            });
            // Display the suggestions
            suggestionsContainer.style.display = "block";
        } else {
            // If no matches, hide the suggestions list
            suggestionsContainer.style.display = "none";
        }
    } catch (err) {
        console.error('Error fetching movie data:', err);
        suggestionsContainer.style.display = "none";
    }
};

export default searchMovies;