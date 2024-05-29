const mongoose = require("mongoose");

// Schema
const arSchema = new mongoose.Schema(
  {
    image_filename: {
      type: String
    },
    image_url: {
      type: String
    },
    model_filename: {
      type: String
    },
    model_url: {
      type: String
    }
  },
  { timestamps: true }
);

const AR = mongoose.model("ar", arSchema);

module.exports = AR;
