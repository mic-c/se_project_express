const express = require("express");
const {
  getItems,
  createItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Route to get all items (does not require authorization)
router.get("/", getItems);

// Protected routes (require authorization)
router.post("/", authMiddleware, createItem);
router.put("/:itemId/likes", authMiddleware, likeItem);
router.delete("/:itemId/likes", authMiddleware, dislikeItem);

module.exports = router;
