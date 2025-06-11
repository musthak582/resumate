const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload, uploadToCloudinary } = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);
// Route for user login
router.post("/login", loginUser);
// Route for getting user profile
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const result = await uploadToCloudinary(req.file.buffer);
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: "Error uploading image to Cloudinary" });
  }
});

module.exports = router;