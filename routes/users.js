const express = require("express");
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const { getCurrentUser, updateUser } = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Custom URL validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Protected routes (require authorization)
router.get("/me", authMiddleware, getCurrentUser);

router.patch(
  "/me",
  authMiddleware,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      avatar: Joi.string().custom(validateURL).messages({
        "string.uri": 'The "avatar" field must be a valid URL',
      }),
    }),
  }),
  updateUser
);

module.exports = router;
