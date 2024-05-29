



const multer = require("multer");
const path = require("path");

// storage object
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      return cb(null, path.join(__dirname, "..", "uploads", "images"));
    } else {
      // mimetype for .glb 'application/octet-stream'
      return cb(null, path.join(__dirname, "..", "uploads", "models"));
    }
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
