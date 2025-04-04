const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "You have access to this protected route",
    user: req.user,
  });
});

module.exports = router;
