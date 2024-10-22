import getAuthToken from "../getAuthToken.js";

const addToWatchlist = async (movie) => {
    const token = getAuthToken();

    try {
        const response = await fetch("/movies/addMovie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            },
            body: JSON.stringify(movie),
        });

        const data = await response.json();
        // console.log("data = ", data);
        // console.log("response = ", response);

        if (response.status === 201) {
            alert("Movie added to watchlist!");
        } else if (response.status === 400) {
            alert("Add skipped. Movie already in watchlist.");
        } else {
            console.error("Error adding movie:", data.message);
        }
    } catch (err) {
        console.error("Error in request:", err);
    }
};

export default addToWatchlist;