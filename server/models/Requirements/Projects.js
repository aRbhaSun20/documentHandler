const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const PROJECT_ROLES_ENUM = ["Administrator", "Commentor", "Author"];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
    required: true,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: () => DateTime.now().toString(),
  },
  userAccess: {
    type: [
      {
        roles: {
          type: String,
          required: true,
          enum: PROJECT_ROLES_ENUM,
        },
        userId: {
          type: String,
          required: true,
          ref: "Users",
        },
      },
    ],
    required: true,
  },
  activeStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("RequirementProjects", userSchema);
