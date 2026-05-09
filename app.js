require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./utils/errorHandler");
const { login, createUser } = require("./controllers/users");
const usersRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItem");
const NotFoundError = require("./errors/NotFoundError");

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

// Custom URL validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Public routes
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        "string.email": 'The "email" field must be a valid email',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
      }),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required().messages({
        "string.email": 'The "email" field must be a valid email',
        "string.empty": 'The "email" field must be filled in',
      }),
      password: Joi.string().required().messages({
        "string.empty": 'The "password" field must be filled in',
      }),
      name: Joi.string().min(2).max(30).required().messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().custom(validateURL).messages({
        "string.uri": 'The "avatar" field must be a valid URL',
      }),
    }),
  }),
  createUser
);

// Main routes
app.use("/users", usersRoutes);
app.use("/items", clothingItemRoutes);

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
