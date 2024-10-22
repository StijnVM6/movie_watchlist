const getAuthToken = () => {
    return localStorage.getItem("jwtToken");
};

export default getAuthToken;