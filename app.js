require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./utils/errorHandler");
const { login, createUser } = require("./controllers/users");
const routes = require("./routes");
const NotFoundError = require("./errors/NotFoundError");
const { validateSignIn, validateSignUp } = require("./middlewares/validation");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

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

// Request logger
app.use(requestLogger);

// Mock user middleware (for testing purposes)
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

// Public routes
app.post("/signin", validateSignIn, login);
app.post("/signup", validateSignUp, createUser);

// Main routes
app.use(routes);

// Handle unknown routes
app.use((req, res, next) => {
  next(new NotFoundError("The requested resource was not found"));
});

// Error logger
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
