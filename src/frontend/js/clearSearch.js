const clearSearch = window.onload = () => {
    const searchField = document.getElementById("searchField");
    if (searchField) {
        searchField.value = ""; // Clear the search input
    }
};

export default clearSearch