import express from "express";
import "dotenv/config";
import path from "path";
// import fetch from "node-fetch";
import omdbRouter from "./src/backend/routes/omdb.js";
import moviesRouter from "./src/backend/routes/movies.js";
import loginRouter from "./src/backend/routes/login.js";
import genresRouter from "./src/backend/routes/genres.js";
import typesRouter from "./src/backend/routes/types.js";
import logger from "./src/backend/middleware/logger.js";

import customErrorHandler from "./src/backend/middleware/customErrorHandler.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use("/omdb", omdbRouter);
app.use("/movies", moviesRouter);
app.use("/loginServer", loginRouter);
app.use("/genres", genresRouter);
app.use("/types", typesRouter);

app.use(customErrorHandler);

// Create __dirname variable
const __dirname = path.resolve();

// Serve static files from the views directory
app.use("/", express.static(path.join(__dirname, "src", "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "frontend", "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'frontend', 'views', 'login.html'));
});

app.get("/movieDetails", (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'frontend', 'views', 'movieDetails.html'));
});

app.get("/watchlist", (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'frontend', 'views', 'watchlist.html'));
});

app.get("/myMovieDetails", (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'frontend', 'views', 'myMovieDetails.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`);
});