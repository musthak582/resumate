import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import ProjectsDetailsForm from "./Forms/ProjectsDetailsForm";
import CertificationsInfoForm from "./Forms/CertificationsInfoForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import { fixTailwindColors, captureElementAsImage, dataURLtoFile } from "../../utils/helper";
import ThemeSelector from "./ThemeSelector";
import Modal from "../../components/Modal";



const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: ""
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
        startDate: "", // e.g. "2022-01-01"
        endDate: "", // e.g. "2022-12-31"
        description: "",
      }
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "", // e.g. "2022-01-01"
        endDate: "", // e.g. "2022-12-31"
      }
    ],
    skills: [
      {
        name: "",
        progress: 0, // percentage value (0-100)
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
        year: "", // e.g. "2022-01-01"
      }
    ],
    languages: [
      {
        name: "",
        progress: 0, // percentage value (0-100)
      }
    ],
    interests: [""],
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  // validate inputs
  const validateAndNext = (e) => {
    const error = [];

    switch (currentPage) {
      case "profile-info":
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) error.push("Please enter your full name");
        if (!designation.trim()) error.push("Please enter your designation");
        if (!summary.trim()) error.push("Please enter your summary");
        break;

      case "contact-info":
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) error.push("Please enter a valid email address");
        if (!phone.trim()) error.push("valid 10-digit phone number is required");
        break;

      case "work-experience":
        resumeData.workExperience.forEach(({ company, role, startDate, endDate }, index) => {
          if (!company.trim()) error.push(`Please enter company name for experience #${index + 1}`);
          if (!role.trim()) error.push(`Please enter role for experience #${index + 1}`);
          if (!startDate || !endDate) error.push(`Please enter start and end date for experience #${index + 1}`);
        });
        break;

      case "education-info":
        resumeData.education.forEach(({ degree, institution, startDate, endDate }, index) => {
          if (!degree.trim()) error.push(`Please enter degree for education #${index + 1}`);
          if (!institution.trim()) error.push(`Please enter institution for education #${index + 1}`);
          if (!startDate || !endDate) error.push(`Please enter start and end date for education #${index + 1}`);
        });
        break;

      case "skills":
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim()) error.push(`Please enter skill #${index + 1}`);
          if (progress < 1 || progress > 100) error.push(`Skill progress must be between 1 and 100 #${index + 1}`);
        });
        break;

      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim()) error.push(`Please enter title for project #${index + 1}`);
          if (!description.trim()) error.push(`Please enter description for project #${index + 1}`);
        });
        break;

      case "certifications":
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim()) error.push(`Please enter title for certification #${index + 1}`);
          if (!issuer.trim()) error.push(`Please enter issuer for certification #${index + 1}`);
        });
        break;

      case "additional-info":
        if (
          resumeData.languages.length === 0 ||
          !resumeData.languages[0].name?.trim()
        ) {
          error.push("At least one language i required")
        }

        if (
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        ) {
          error.push("At least one interest i required")
        }
        break;

      default:
        break;
    }

    if (error.length > 0) {
      setErrorMsg(error.join(", "))
      return;
    }

    // Move to next step
    setErrorMsg("");
    goToNextStep()


  }

  // function to navigate to next page
  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additional-info",
    ];

    if (currentPage === "additional-info") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentPage(pages[newIndex]);

      // set progress as percentage
      const percentage = Math.round((newIndex / (pages.length - 1)) * 100);
      setProgress(percentage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // function to navigate to previous page
  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additional-info",
    ];

    if (currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      // set progress as percentage
      const percentage = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percentage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => updateSection("profileInfo", key, value)}
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => updateSection("contactInfo", key, value)}
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => updateArrayItem("workExperience", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) => removeArrayItem("workExperience", index)}
          />
        );

      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => updateArrayItem("education", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => updateArrayItem("skills", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );

      case "projects":
        return (
          <ProjectsDetailsForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => updateArrayItem("projects", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );

      case "certifications":
        return (
          <CertificationsInfoForm
            certificationInfo={resumeData?.certifications}
            updateArrayItem={(index, key, value) => updateArrayItem("certifications", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) => removeArrayItem("certifications", index)}
          />
        );

      case "additional-info":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={(section, index, key, value) => updateArrayItem(section, index, key, value)}
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) => removeArrayItem(section, index)}
          />
        );


      default:
        return null;
    }
  }

  // update simple nested object (like , profileInfo, contactInfo,etc..)
  const updateSection = (section, key, value) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value
      }
    }))
  }

  // update array item ( like workExerience[0], skills[1], etc..)

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prevState) => {
      const updatedArray = [...prevState[section]];

      if (key === null) {
        updatedArray[index] = value; // for simple strings like in `interest`
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value
        }
      }
      return {
        ...prevState,
        [section]: updatedArray
      }
    })
  }

  // add item to array
  const addArrayItem = (section, newItem) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: [...prevState[section], newItem]
    }))
  }

  // remove item from array
  const removeArrayItem = (section, index) => {
    setResumeData((prevState) => {
      const updatedArray = [...prevState[section]];
      updatedArray.splice(index, 1);
      return {
        ...prevState,
        [section]: updatedArray,
      }
    })
  }

  // fetch resume info by id
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }))
      }

    } catch (error) {
      console.log("Error fetching resume details:", error);
    }
  }

  // upload thumbnail and resume profile img
  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);

      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementAsImage(resumeRef.current);
      console.log("imageDataUrl", imageDataUrl);


      // Conver base64 to file
      const thumbnailFile = dataURLtoFile(imageDataUrl, `resume-${resumeId}.png`);
      console.log("thumbnailFile", thumbnailFile);


      const profileImageFile = resumeData?.profileInfo?.profileImg || null;

      console.log("profileImageFile", profileImageFile);

      const formData = new FormData();
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      console.log("formData", formData);

      const uploadResponse = await axiosInstance.put(API_PATHS.RESUME.UPLOAD_IMAGES(resumeId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("uploadResponse", uploadResponse);

      const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;

      console.log("RESUME_DATA_____", resumeData);

      // call the second api to update other resume data
      await updateResumeDetails(thumbnailLink, profilePreviewUrl);

      toast.success("Resume updated successfully");
      navigate("/dashboard");

    } catch (error) {
      console.error("Error uploading resume images:", error);
      toast.error("Error uploading resume images");
    } finally {
      setIsLoading(false);
    }
  }

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId),
        {
          ...resumeData,
          thumbnailLink: thumbnailLink || "",
          profileInfo: {
            ...resumeData.profileInfo,
            profilePreviewUrl: profilePreviewUrl || "",
          },
        });
    } catch (error) {
      console.error("Error updating resume details:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // delete resume
  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Resume deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Error deleting resume");
    } finally {
      setIsLoading(false);
    }
  }

  // download resume
  const reactToPrintFn = useReactToPrint({
    contentRef: resumeDownloadRef,
  });

  // function to update basewidth based on the resume container size
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  }

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))}
          />

          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-[16px]" />
              <span className="hidden md:block">Change Theme</span>
            </button>

            <button className="btn-small-light" onClick={handleDeleteResume}>
              <LuTrash2 className="text-[16px]" />
              <span className="hidden md:block">Delete Resume</span>
            </button>

            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-[16px]" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">

            <StepProgress progress={progress} />



            {renderForm()}

            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-md" /> {errorMsg}
                </div>
              )}

              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button className="btn-small-light" onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className="text-[16px]" /> back
                </button>
                <button className="btn-small-light" onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className="text-[16px]" />
                  {isLoading ? "Updating..." : "Save & Exit"}
                </button>
                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === 'additional-info' && (
                    <LuDownload className="text-[16px]" />
                  )}

                  {currentPage === "additional-info" ? "Preview & Download" : "Next"}

                  {currentPage !== "additional-info" && (
                    <LuArrowLeft className="text-[16px] rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div ref={resumeRef} className="h-[100vh]">
            {/* Resume Template */}
            <RenderResume
              templateId={resumeData?.template.theme || ""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Change Theme"
      >
        <div className="w-[90vw] h-[80vh]">
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value) => {
              setResumeData((prevState) => ({
                ...prevState,
                template: value || prevState.template,
              }));
              setOpenThemeSelector(false);
            }}
            resumeData={null}
            onClose={() => setOpenThemeSelector(false)}
          />
        </div>
      </Modal>
      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnIcon={<LuDownload className="text-[16px]" />}
        actionBtnText="Download"
        onActionClick={() => reactToPrintFn()}
      >
        <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
          <RenderResume
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default EditResume