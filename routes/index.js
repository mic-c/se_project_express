const express = require("express");
const userRoutes = require("./users");
const clothingItemRoutes = require("./clothingItems");

const router = express.Router();

// Use the user routes
router.use("/users", userRoutes);

// Use the clothing item routes
router.use("/items", clothingItemRoutes);

module.exports = router;
