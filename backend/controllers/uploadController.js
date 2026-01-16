const cloudinary = require("../config/cloudinary");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",   // 🔥 THIS is the key
      use_filename: true,
      unique_filename: false,
    });
    console.log("✅ Cloudinary upload success");
    console.log("PDF URL:", result.secure_url);
    console.log("Public ID:", result.public_id);
    console.log("Resource type:", result.resource_type);
    console.log("Format:", result.format);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};

module.exports = { uploadFile };
