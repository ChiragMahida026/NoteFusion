const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    project_id: {
      type: String,
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },

    environment_type: {
      type: String,
      required: true,
      enum: ["dev", "qa", "prod", "stage"],
      default: "dev",
    },

    service_id: {
      type: String,
      require: true,
    },
    servicename: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    Port: {
      type: String,
      required: true,
    },
    Command: {
      type: String,
      required: true,
    },
    environment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes", noteSchema);
