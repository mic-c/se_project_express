const express = require("express");
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const {
  getItems,
  createItem,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/clothingItem");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Custom URL validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Route to get all items (does not require authorization)
router.get("/", getItems);

// Protected routes (require authorization)
router.post(
  "/",
  authMiddleware,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'The "imageUrl" field must be a valid URL',
      }),
      weather: Joi.string().valid("hot", "warm", "cold").required().messages({
        "string.empty": 'The "weather" field must be filled in',
        "any.only": 'The "weather" field must be one of: hot, warm, cold',
      }),
    }),
  }),
  createItem
);

router.put(
  "/:itemId/likes",
  authMiddleware,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).messages({
        "string.hex": 'The "itemId" must be a valid hex string',
        "string.length": 'The "itemId" must be 24 characters long',
      }),
    }),
  }),
  likeItem
);

router.delete(
  "/:itemId/likes",
  authMiddleware,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).messages({
        "string.hex": 'The "itemId" must be a valid hex string',
        "string.length": 'The "itemId" must be 24 characters long',
      }),
    }),
  }),
  dislikeItem
);

router.delete(
  "/:itemId",
  authMiddleware,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).messages({
        "string.hex": 'The "itemId" must be a valid hex string',
        "string.length": 'The "itemId" must be 24 characters long',
      }),
    }),
  }),
  deleteItem
);

module.exports = router;
