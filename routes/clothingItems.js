const express = require("express");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const router = express.Router();

// Route to get all items
router.get("/", getItems);

// Route to create a new item
router.post("/", createItem);

// Route to delete an item by ID
router.delete("/:itemId", deleteItem);

// Route to like an item
router.put("/:itemId/likes", likeItem);

// Route to dislike an item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
