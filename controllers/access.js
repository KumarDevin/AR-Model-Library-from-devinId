const fs = require("fs");

function handleGetImageFile(req, res) {
  const imageFilename = req.params.image_filename;
  const decodedFilename = decodeURIComponent(imageFilename);

  const imagePath = path.resolve(__dirname, "..", "uploads", "images", decodedFilename);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "image not found" });
  }
}

function handleGetModelFile(req, res) {
  const modelFilename = req.params.model_filename;

  const decodedFilename = decodeURIComponent(modelFilename);

  const modelPath = path.resolve(__dirname, "..", "uploads", "models", decodedFilename);

  if (fs.existsSync(modelPath)) {
    res.sendFile(modelPath);
  } else {
    res.status(404).json({ error: "model not found" });
  }
}

module.exports = { handleGetImageFile, handleGetModelFile}
