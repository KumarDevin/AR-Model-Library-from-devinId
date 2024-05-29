const express = require("express");
const router = express.Router();
const { accessWhenLoggedIn } = require("../middleware/auth");
const upload = require("../middleware/multer");

const {
  handleHomepage_get,
  handleUploadPage_get,
  handleUpload_post,
  handleGetList_get,
  handleGetFiles_get,
  handleDeleteFiles_post,
} = require("../controllers/ar");

router
  .get("/", handleHomepage_get)
  .get("/list", handleGetList_get)
  .get("/files", accessWhenLoggedIn, handleGetFiles_get)
  .post("/files", accessWhenLoggedIn, handleDeleteFiles_post)
  .get("/uploads", accessWhenLoggedIn, handleUploadPage_get)
  .post("/uploads", accessWhenLoggedIn, upload.fields([ { name: "image", maxCount: 1 }, { name: "model", maxCount: 1 }]), handleUpload_post );

module.exports = router;
