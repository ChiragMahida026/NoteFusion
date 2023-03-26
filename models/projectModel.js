const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("project", projectSchema);
