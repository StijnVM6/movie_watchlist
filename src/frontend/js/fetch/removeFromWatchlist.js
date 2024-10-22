import getAuthToken from "../getAuthToken.js";

const removeFromWatchlist = async (id) => {
    const token = getAuthToken();

    try {
        const response = await fetch(`/movies/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert("Movie removed from watchlist!");
            window.location.href = "watchlist"; // Redirect back to watchlist after deletion
        } else {
            console.error("Error adding movie:", data.message);
        }
    } catch (err) {
        console.error("Failed to remove movie from watchlist.", err);
    }
};

export default removeFromWatchlist;