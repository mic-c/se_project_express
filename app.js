const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { login, createUser } = require("./controllers/users");
const authMiddleware = require("./.github/middlewares/auth");
const mainRouter = require("./.github/routes/index");
const { NOT_FOUND_STATUS_CODE } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

// Middleware to parse JSON
app.use(express.json());

// Routes for signing up and signing in
app.post("/signup", createUser);
app.post("/signin", login);

// Use the main router for all other routes
app.use("/", mainRouter);

// Handle unknown routes
app.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: "The requested resource was not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
