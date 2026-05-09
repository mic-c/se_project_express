const express = require("express");
const { celebrate } = require("celebrate");
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
router.post("/", authMiddleware, celebrate(validateCreateItem), createItem);
router.put("/:itemId/likes", authMiddleware, celebrate(validateItemId), likeItem);
router.delete("/:itemId/likes", authMiddleware, celebrate(validateItemId), dislikeItem);
router.delete("/:itemId", authMiddleware, celebrate(validateItemId), deleteItem);

module.exports = router;
