const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const cloudinary = require("cloudinary");
const asyncHandler = require("express-async-handler");
const { auth, admin } = require("../middleware/authMiddleware");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image
router.post(
  "/upload",
  auth,
  admin,
  asyncHandler((req, res) => {
    if (!req.files) {
      return res.status(400).json({ message: "Please upload a file!" });
    }

    const file = req.files.file;

    if (!file.mimetype.startsWith("image")) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ message: "Incorrct file formate!" });
    }

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ message: "File is too large. Allowed just 1mb!" });
    }

    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "shop" }, async (err, result) => {
      if (err) throw err;
      removeTmp(file.tempFilePath);
      res.json({ public_id: result.public_id, url: result.secure_url });
    });
  })
);

// Delete image
router.post(
  "/destroy",
  auth,
  admin,
  asyncHandler((req, res) => {
    const { public_id } = req.body;

    if (!public_id) return res.status(400).json({ message: "No image selected!" });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ message: "Image deleted!" });
    });
  })
);

const removeTmp = path => {
  fs.unlink(path, err => {
    if (err) throw err;
  });
};

module.exports = router;
