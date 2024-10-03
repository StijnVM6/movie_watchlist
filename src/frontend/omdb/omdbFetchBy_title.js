const omdbFetchBy_title = async (title) => {
    const response = await fetch(`/omdb/searchByTitle/${title}`);
    // console.log("Response status:", response.status);
    const data = await response.json();
    // console.log("Data:", data);
    return data;
};

export default omdbFetchBy_title;