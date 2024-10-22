const login = async (loginData) => {
    try {
        // Make a POST request to the backend login route
        const response = await fetch("/loginServer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const token = await response.json();

        if (token) {
            // If login is successful, store the JWT
            localStorage.setItem("jwtToken", token);
            // Redirect the user to the main page
            window.location.href = "/";
        } else {
            // Display error message
            document.getElementById("error-message").textContent = "Error: no token generated.";
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("error-message").textContent = "Something went wrong. Please try again.";
    }
};

export default login;