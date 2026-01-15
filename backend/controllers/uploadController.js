const uploadFile = (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    success: true,
    url: req.file.path,
    public_id: req.file.filename,
  });
};

module.exports = { uploadFile };
