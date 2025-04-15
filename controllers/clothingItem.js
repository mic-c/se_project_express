const ClothingItem = require("../models/clothingItem");
const {
  NOT_FOUND_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error("Error fetching items:", err);
      res.status(500).send({ message: "An error occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error("Error creating item:", err);
      res.status(400).send({ message: "Invalid data provided" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      console.error("Error fetching item:", err);
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      console.error("Error fetching item:", err);
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      if (item.owner.toString() !== userId) {
        return res
          .status(FORBIDDEN_STATUS_CODE)
          .send({ message: "You do not have permission to delete this item" });
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({ message: "Item deleted successfully" })
      );
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  getItems,
  createItem,
  likeItem,
  dislikeItem,
  deleteItem,
};
