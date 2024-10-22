import login from "./fetch/login.js";

const showLogin = () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const loginData = { email, password };
        login(loginData);
    });
};

export default showLogin;