const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name must be at most 30 characters long"],
  },
  avatar: {
    type: String,
    required: [true, "Avatar URL is required"],
    validate: {
      validator: function (value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL.",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
