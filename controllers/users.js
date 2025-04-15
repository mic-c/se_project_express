const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const ClothingItem = require("../models/clothingItem");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
} = require("../utils/errors");

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        avatar,
        email,
        password: hashedPassword,
      })
    )
    .then((user) => {
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;
      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        res
          .status(CONFLICT_STATUS_CODE)
          .send({ message: "Email already exists" });
      } else if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data provided" });
      } else {
        res
          .status(SERVER_ERROR_STATUS_CODE)
          .send({ message: "An error occurred on the server" });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ message: "Email and password are required" });
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED_STATUS_CODE)
          .send({ message: "Incorrect email or password" });
      }

      console.error("Error during login:", err);
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" }); // Ensure a value is returned
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      return res
        .status(SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error occurred on the server" }); // Ensure a value is returned
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
  createUser,
  login,
  getCurrentUser,
  updateUser,
  deleteItem,
};
