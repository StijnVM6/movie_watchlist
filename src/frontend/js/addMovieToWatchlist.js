const addMovieToWatchlist = async (movie) => {
    try {
        const response = await fetch("/movies/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Movie added to watchlist!");
        } else {
            console.error("Error adding movie:", data.message);
        }
    } catch (err) {
        console.error("Error in request:", err);
    }
};

export default addMovieToWatchlist;