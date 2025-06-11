const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');
const {uploadResumeImages} = require('../controllers/uploadImages');

const router = express.Router();


// Route to create a new resume
router.post('/', protect, createResume);
// Route to get all resumes for the authenticated user
router.get('/', protect, getUserResumes);
// Route to get a specific resume by ID
router.get('/:id', protect, getResumeById);
// Route to update a resume by ID
router.put('/:id', protect, updateResume);
// Route to upload resume images
router.put('/:id/upload-images', protect, uploadResumeImages);
// Route to delete a resume by ID
router.delete('/:id', protect, deleteResume);


module.exports = router;