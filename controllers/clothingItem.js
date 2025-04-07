const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        const errorMessages = Object.values(err.errors).map((e) => e.message);
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data provided", errors: errorMessages });
      } else {
        res
          .status(SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error has occurred on the server" });
      }
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

const updateLike = (req, res, method) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { [method]: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND_STATUS_CODE;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      } else if (err.statusCode === NOT_FOUND_STATUS_CODE) {
        res.status(NOT_FOUND_STATUS_CODE).send({ message: err.message });
      } else {
        res
          .status(SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const likeItem = (req, res) => {
  updateLike(req, res, "$addToSet");
};

const dislikeItem = (req, res) => {
  updateLike(req, res, "$pull");
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
