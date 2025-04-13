const express = require("express");
const usersRoutes = require("./users");
const itemsRoutes = require("./clothingItem");

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/items", itemsRoutes);

module.exports = router;
