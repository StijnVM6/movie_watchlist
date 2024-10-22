import getAuthToken from "../js/getAuthToken.js";

const omdbFetchBy_title = async (title) => {
    const token = getAuthToken();

    const response = await fetch(`/omdb/searchByTitle/${title}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
        },
    });

    const data = await response.json();
    return data;
};

export default omdbFetchBy_title;