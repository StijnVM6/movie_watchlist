const formatGenre = (data) => {
    const genres = data.split(",");

    const genresTrimmed = genres.map((genre) => {
        return genre.trim();
    });

    const genresToLowerCase = genresTrimmed.map((genre) => {
        return genre.toLowerCase();
    });

    const genresFirstletterToUpperCase = genresToLowerCase.map((genre) => {
        const firstLetter = genre.charAt(0).toUpperCase();
        const rest = genre.substring(1, genre.length);
        return firstLetter + rest;
    });

    return genresFirstletterToUpperCase;
};

export default formatGenre;