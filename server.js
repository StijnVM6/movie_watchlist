import express from "express";
import "dotenv/config";
import path from "path";
// import fetch from "node-fetch";
import omdbRouter from "./src/backend/routes/movies/omdb.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/omdb", omdbRouter);

// Create __dirname variable
const __dirname = path.resolve();

// Serve static files from the views directory
app.use("/", express.static(path.join(__dirname, "src", "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "frontend", "views", "index.html"));
});

app.get("/movieDetails", (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'frontend', 'views', 'movieDetails.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`);
});