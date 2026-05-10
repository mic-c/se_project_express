const express = require("express");
const {
  getItems,
  createItem,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItem");
const authMiddleware = require("../middlewares/auth");
const { validateCreateItem, validateItemId } = require("../middlewares/validation");

const router = express.Router();

// Route to get all items (does not require authorization)
router.get("/", getItems);

// Protected routes (require authorization)
router.post("/", authMiddleware, validateCreateItem, createItem);
router.put("/:itemId/likes", authMiddleware, validateItemId, likeItem);
router.delete("/:itemId/likes", authMiddleware, validateItemId, dislikeItem);
router.delete("/:itemId", authMiddleware, validateItemId, deleteItem);

module.exports = router;
