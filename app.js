const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const { NOT_FOUND_STATUS_CODE } = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Middleware to parse JSON
app.use(express.json());

// Middleware to mock user authentication
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

// Main router
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
