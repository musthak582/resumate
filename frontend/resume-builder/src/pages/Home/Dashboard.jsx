import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LuCirclePlus } from "react-icons/lu"
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from './CreateResumeForm';
import Modal from '../../components/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../utils/motion';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResume = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResume();
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0"
      >
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(149, 117, 205, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-[300px] flex flex-col items-center justify-center gap-5 bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <motion.div
            whileHover={{ rotate: 90, scale: 1.1 }}
            className="w-12 h-12 flex items-center justify-center bg-purple-200/50 rounded-2xl"
          >
            <LuCirclePlus className="text-xl text-purple-500" />
          </motion.div>

          <motion.h3
            whileHover={{ color: "#7e22ce" }}
            className="font-medium text-gray-800"
          >
            Add New Resume
          </motion.h3>
        </motion.div>

        <AnimatePresence>
          {allResumes?.map((resume, index) => (
            <motion.div
              key={resume?._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{ y: -5 }}
              layout
            >
              <ResumeSummaryCard
                imgUrl={resume?.thumbnailLink || null}
                title={resume.title}
                lastUpdated={
                  resume?.updatedAt
                    ? moment(resume.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/resume/${resume?._id}`)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {openCreateModal && (
          <Modal
            isOpen={openCreateModal}
            onClose={() => setOpenCreateModal(false)}
            hideHeader
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <CreateResumeForm
                onSuccess={() => {
                  setOpenCreateModal(false);
                  fetchAllResume();
                }}
              />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

export default Dashboard;