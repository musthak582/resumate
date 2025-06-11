const cloudinary = require('cloudinary').v2;
const Resume = require('../models/Resume');


// @desc Create a new resume
// @route POST /api/resumes
// @access Private
const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        }
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        }
      ],
      skills: [
        {
          name: "",
          progress: 0,
        }
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        }
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        }
      ],
      languages: [
        {
          name: "",
          progress: 0,
        }
      ],
      interests: [""],
    }

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });


    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating resume', error: error.message });
  }
};

// @desc Get all resumes for the authenticated user
// @route GET /api/resumes
// @access Private
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching resumes', error: error.message });
  }
};


// @desc Get a resume by ID
// @route GET /api/resumes/:id
// @access Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching resume', error: error.message });
  }
};

// @desc Update a resume by ID
// @route PUT /api/resumes/:id
// @access Private
const updateResume = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Merge updates from req.body into the resume object
    Object.assign(resume, req.body);

    // save the updated resume
    const savedResume = await resume.save();
    console.log("savedResume", savedResume);
    res.status(200).json(savedResume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating resume', error: error.message });
  }
};

// @desc Delete a resume by ID
// @route DELETE /api/resumes/:id
// @access Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Delete images from Cloudinary
    try {
      if (resume.thumbnailLink) {
        const publicId = resume.thumbnailLink.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      if (resume.profileInfo?.profilePreviewUrl) {
        const publicId = resume.profileInfo.profilePreviewUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (cloudinaryError) {
      console.error('Error deleting Cloudinary assets:', cloudinaryError);
      // Continue with deletion even if Cloudinary cleanup fails
    }

    // delete the resume
    const deletedResume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting resume', error: error.message });
  }
};


module.exports = {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};