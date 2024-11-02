const multer = require("multer");
const path = require("path");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"./uploads")
    //cb(null, path.join(__dirname,"./uploads")); // Directory to save uploaded file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
