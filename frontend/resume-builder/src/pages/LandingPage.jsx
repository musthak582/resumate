import React, { useState } from 'react';
import HERO_IMG from '../assets/hero-img.png';
import { useNavigate } from 'react-router-dom';
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from '../components/Modal';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { motion , AnimatePresence} from 'framer-motion';
import { fadeIn, staggerContainer, textVariant, zoomIn } from '../utils/motion';
import { FiFileText, FiEdit, FiLayout, FiDownload, FiArrowRight } from 'react-icons/fi';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-full bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 py-6">
        {/* header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="bg-gradient-to-r from-blue-500 to-green-400 p-2 rounded-lg">
              <FiFileText className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              ResuMate
            </span>
          </motion.div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-400 text-sm font-semibold text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Get Started <FiArrowRight className="text-sm" />
            </motion.button>
          )}
        </motion.header>

        {/* hero */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-center"
        >
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="w-full md:w-1/2 pr-4 mb-8 md:mb-0"
          >
            <motion.h1
              variants={textVariant(0.5)}
              className="text-5xl font-bold mb-6 leading-tight text-gray-800"
            >
              Build Your{" "}
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 bg-[length:200%_200%]"
              >
                Perfect Resume
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeIn('right', 'tween', 0.4, 1)}
              className="text-lg text-gray-600 mb-8"
            >
              Create a professional resume in minutes with our easy-to-use builder.
              Stand out from the crowd and land your dream job.
            </motion.p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-400 text-sm font-semibold text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
                onClick={handleCTA}
              >
                Start Building <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 text-sm font-semibold text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                See Templates
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={zoomIn(0.5, 1)}
            className="w-full md:w-1/2"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={HERO_IMG}
              alt="Resume example"
              className="w-full rounded-xl shadow-lg border border-gray-100"
            />
          </motion.div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32"
        >
          <motion.h2
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4 text-gray-800"
          >
            Why Choose ResuMate?
          </motion.h2>
          <motion.p
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 text-center max-w-2xl mx-auto mb-12"
          >
            Our platform is designed to help you create the perfect resume with minimal effort
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
              whileHover={{ y: -10, boxShadow: "0px 10px 25px rgba(0,0,0,0.05)" }}
              className="bg-white p-8 rounded-xl border border-gray-100 hover:border-transparent shadow-sm hover:shadow-lg transition-all"
            >
              <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiEdit className="text-blue-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Easy Editing</h3>
              <p className="text-gray-600">Update your resume sections with live preview and instant formatting</p>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              whileHover={{ y: -10, boxShadow: "0px 10px 25px rgba(0,0,0,0.05)" }}
              className="bg-white p-8 rounded-xl border border-gray-100 hover:border-transparent shadow-sm hover:shadow-lg transition-all"
            >
              <div className="bg-green-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiLayout className="text-green-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Professional Templates</h3>
              <p className="text-gray-600">Choose from modern, ATS-friendly templates that get you noticed</p>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.6, 1)}
              whileHover={{ y: -10, boxShadow: "0px 10px 25px rgba(0,0,0,0.05)" }}
              className="bg-white p-8 rounded-xl border border-gray-100 hover:border-transparent shadow-sm hover:shadow-lg transition-all"
            >
              <div className="bg-purple-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FiDownload className="text-purple-500 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">One-Click Export</h3>
              <p className="text-gray-600">Download your resume as a polished PDF in seconds</p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-32 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12 text-center"
        >
          <motion.h2
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-gray-800"
          >
            Ready to Build Your Dream Resume?
          </motion.h2>
          <motion.p
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Join thousands of professionals who landed their dream jobs with ResuMate
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-blue-500 to-green-400 text-sm font-semibold text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
            onClick={handleCTA}
          >
            Get Started for Free <FiArrowRight />
          </motion.button>
        </motion.section>
      </div>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm bg-white text-gray-500 text-center p-6 mt-20 border-t border-gray-100"
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-blue-500 to-green-400 p-2 rounded-lg">
              <FiFileText className="text-white text-lg" />
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              ResuMate
            </span>
          </div>
          <p>© {new Date().getFullYear()} ResuMate. All rights reserved.</p>
        </div>
      </motion.footer>

      {/* <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage('login');
        }}
        hideHeader
      >
        <div>
          {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === 'signup' && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal> */}
      {/* Auth Modal */}
      <AnimatePresence>
        {openAuthModal && (
          <Modal
            isOpen={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
              setCurrentPage('login');
            }}
            hideHeader
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {currentPage === "login" && (
                <Login setCurrentPage={setCurrentPage} />
              )}
              {currentPage === "signup" && (
                <SignUp setCurrentPage={setCurrentPage} />
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;