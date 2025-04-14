const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Protected routes (require authorization)
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, updateUser);

module.exports = router;
