const express = require("express");
const router = express.Router();

const {
  handleGetImageFile,
  handleGetModelFile,
} = require("../controllers/access");

router
  .get("/images/:image_filename", handleGetImageFile)
  .get("/models/:model_filename", handleGetModelFile);

module.exports = router;
