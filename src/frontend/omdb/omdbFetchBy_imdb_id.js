const omdbFetchBy_imdb_id = async (movieId) => {
    const response = await fetch(`/omdb/searchById/${movieId}`);
    const data = await response.json();
    return data;
};

export default omdbFetchBy_imdb_id;