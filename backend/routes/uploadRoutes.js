const express = require("express");
const upload = require("../middleware/multer");
const { uploadFile } = require("../controllers/uploadController");

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.json({ message: "uploads route working" });
});

// Upload route
router.post("/", upload.single("file"), uploadFile);

module.exports = router;
