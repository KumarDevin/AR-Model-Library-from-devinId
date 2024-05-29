const AR = require("../models/ar"); const os = require("os"); const fs = require("fs"); const path = require("path");

function handleHomepage_get(req, res) {
  return res.render("home");
}
function handleUploadPage_get(req, res) {
  return res.render("index", { arEntry: false });
}
async function handleGetList_get(req, res) {
  const alldocs = await AR.find({});
  return res.json(alldocs);
}
async function handleGetFiles_get(req, res) {
  const alldocs = await AR.find({});
  console.log(alldocs)
  return res.render("files", { alldocs: alldocs, err: false });
}
async function handleDeleteFiles_post(req, res) {
  const toBeDeletedFiles = req.body.files;
  try {
    const deletingFile = await AR.findOne({ image_filename: toBeDeletedFiles });
    const imageFilePath = path.join(__dirname,"../uploads","images",deletingFile.image_filename);
    const modelFilePath = path.join(__dirname,"../uploads","models",deletingFile.model_filename);
    try {
      fs.unlink(imageFilePath, (err) => {
        if (err) { return res.render("files", { err: true }); }
      });
      fs.unlink(modelFilePath, (err) => {
        if (err) { return res.render("files", { err: true }); }
      });
    } catch (err) {
      return res.render("files", { err: true });
    }
    await AR.deleteOne({ image_filename: toBeDeletedFiles });
    return res.redirect("/api/ar/files");
  } catch (err) {
    res.render("files", { err: true });
  }
}

async function handleUpload_post(req, res) {
  try {
    const encodedImageName = encodeURIComponent(req.files.image[0].filename);
    const encodedmodelName = encodeURIComponent(req.files.model[0].filename);
    const ipAddress = os.networkInterfaces().WiFi.find((element) => element.family === "IPv4").address;
    const entry = {
      image_filename: req.files.image[0].filename,
      image_url: `http://${ipAddress}:5000/images/${encodedImageName}`,
      model_filename: req.files.model[0].filename,
      model_url: `http://${ipAddress}:5000/models/${encodedmodelName}`,
    };
    const arEntry = await AR.create(entry);
    return res.render("index", { arEntry: "uploaded" });
  } catch (error) {
    return res.render("index", { arEntry: "empty" });
  }
}

module.exports = { handleHomepage_get, handleUploadPage_get, handleGetList_get, handleUpload_post, handleGetFiles_get, handleDeleteFiles_post };