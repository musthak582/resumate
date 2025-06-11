const cloudinary = require('cloudinary').v2;
const Resume = require('../models/Resume');
const { upload, uploadToCloudinary } = require("../middlewares/uploadMiddleware");

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([
      { name: 'thumbnail' },
      { name: 'profileImage' },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading images', error: err.message });
      }

      const resumeId = req.params.id;
      const resume = await Resume.findOne({
        _id: resumeId,
        userId: req.user._id,
      });

      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }

      const newThumbnail = req.files.thumbnail?.[0];
      const newProfileImage = req.files.profileImage?.[0];

      try {
        // If a new thumbnail image is uploaded, update the thumbnail link
        if (newThumbnail) {
          if (resume.thumbnailLink) {
            // Delete old thumbnail from Cloudinary if it exists
            const publicId = resume.thumbnailLink.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          }

          const result = await uploadToCloudinary(newThumbnail.buffer);
          resume.thumbnailLink = result.secure_url;
        }

        // If a new profile image is uploaded, update the profilePreviewUrl
        if (newProfileImage) {
          if (resume.profileInfo?.profilePreviewUrl) {
            // Delete old profile image from Cloudinary if it exists
            const publicId = resume.profileInfo.profilePreviewUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          }

          const result = await uploadToCloudinary(newProfileImage.buffer);
          resume.profileInfo.profilePreviewUrl = result.secure_url;
        }

        await resume.save();

        res.status(200).json({
          message: 'Images uploaded successfully',
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo.profilePreviewUrl
        });
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        res.status(500).json({ message: 'Error uploading images to Cloudinary', error: uploadError.message });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading images', error: error.message });
  }
};

module.exports = { uploadResumeImages };