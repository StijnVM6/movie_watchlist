import getAuthToken from "../getAuthToken.js";

const getMoviesFromWatchlist = async () => {
    const token = getAuthToken();

    try {
        const response = await fetch("/movies", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        });

        const data = await response.json();

        return data;
    } catch (err) {
        console.error("Error in request:", err);
    }
}

export default getMoviesFromWatchlist;