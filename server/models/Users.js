const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
  roles: {
    type: [String],
    required: true,
  },
  activeStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("Users", userSchema);
