const express = require("express");
const userRoutes = require("./users");

const router = express.Router();

// Use the user routes
router.use("/users", userRoutes);

module.exports = router;
