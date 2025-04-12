const express = require("express");
const { deleteItem } = require("../controllers/clothingItem");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Items route is working!" });
});

router.delete("/:itemId", authMiddleware, deleteItem);

module.exports = router;
