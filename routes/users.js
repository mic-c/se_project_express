const express = require("express");
const {
  getCurrentUser,
  createUser,
  login,
  updateUser,
} = require("../../controllers/users");

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
