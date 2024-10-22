const checkAuth = () => {
    // Redirect user to the login page if not authenticated
    const token = localStorage.getItem("jwtToken");
    if (!token) {
        window.location.href = "/login";
    }
};

export default checkAuth;