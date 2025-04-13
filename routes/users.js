const express = require("express");
const {
  getCurrentUser,
  createUser,
  login,
  updateUser,
} = require("../../controllers/users.js");
const authMiddleware = require("../../middlewares/auth.js");

const router = express.Router();

// Routes for signing up and signing in (do not require authorization)
router.post("/signup", createUser);
router.post("/signin", login);

// Protected routes (require authorization)
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, updateUser);

module.exports = router;
