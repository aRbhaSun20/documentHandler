const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const USER_ROLES_ENUM = ["USER", "ADMIN", "GUEST"];

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
  updatedAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
  roles: {
    type: [String],
    required: true,
    enum: USER_ROLES_ENUM,
  },
  activeStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("Users", userSchema);
