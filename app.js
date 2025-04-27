const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { login, createUser } = require("./controllers/users");
const usersRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItem");
const { NOT_FOUND_STATUS_CODE } = require("./utils/errors");

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

// Mock user middleware (for testing purposes)
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});

// Routes
app.use("/users", usersRoutes);
app.use("/items", clothingItemRoutes);

// Public routes
app.post("/signin", login);
app.post("/signup", createUser);

// Routes
app.use("/users", usersRoutes);
app.use("/items", clothingItemRoutes);

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
