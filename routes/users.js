const express = require("express");
const { getUsers, createUser, getUser } = require("../controllers/users");

const router = express.Router();

// Route to get all users
router.get("/", getUsers);

// Route to create a user
router.post("/", createUser);

// Route to get a user by ID
router.get("/:userId", getUser);

module.exports = router;
