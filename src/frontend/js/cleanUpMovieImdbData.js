import convertRuntime from "./convertRuntime.js";

const cleanUpMovieImdbData = (movie) => {
    const keysToRemove = [
        "Rated",
        "Released",
        "Writer",
        "Actors",
        "Language",
        "Country",
        "Awards",
        "Ratings",
        "DVD",
        "BoxOffice",
        "Production",
        "Website"
    ];

    // Remove unwanted movie data
    const cleanedMovie = Object.fromEntries(
        Object.entries(movie).filter(([key]) => !keysToRemove.includes(key))
    );

    // convert the runtime from minutes to hours and minutes
    cleanedMovie.Runtime = convertRuntime(cleanedMovie.Runtime);

    return cleanedMovie;
};

export default cleanUpMovieImdbData;