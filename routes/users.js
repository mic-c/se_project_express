const express = require("express");
const { celebrate } = require("celebrate");
const { getCurrentUser, updateUser } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const { validateUpdateUser } = require("../middlewares/validation");

const router = express.Router();

// Protected routes (require authorization)
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, celebrate(validateUpdateUser), updateUser);

module.exports = router;
