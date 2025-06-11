import React, { useState } from 'react'
import HERO_IMG from '../assets/hero-img.png';
import { useNavigate } from 'react-router-dom';
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Modal from '../components/Modal';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant, zoomIn } from '../utils/motion';

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
  }

  return (
    <div className="w-full min-h-full bg-white">
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
            className="text-xl font-bold"
          >
            ResuMate
          </motion.div>
          {user ? <ProfileInfoCard /> :
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login/Sign Up
            </motion.button>}
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
              className="text-5xl font-semibold mb-6 leading-tight"
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
                className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%]"
              >
                Resume Effortlessly
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeIn('right', 'tween', 0.4, 1)}
              className="text-lg text-gray-600 mb-8"
            >
              Create a professional resume in minutes with our easy-to-use builder.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={handleCTA}
            >
              Get Started
            </motion.button>
          </motion.div>

          <motion.div
            variants={zoomIn(0.5, 1)}
            className="w-full md:w-1/2"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={HERO_IMG}
              alt="Hero Img"
              className="w-full rounded-lg"
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
            className="text-2xl font-bold text-center mb-12"
          >
            Features That Make You Shine
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
              <p className="text-gray-600">Update your resume sections with live preview and instant formatting</p>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-3">Resume Templates</h3>
              <p className="text-gray-600">Choose from modern, professional templates that are easy to customize.</p>
            </motion.div>

            <motion.div
              variants={fadeIn('up', 'tween', 0.6, 1)}
              whileHover={{ y: -10 }}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">Download your resume as a PDF in seconds</p>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-sm bg-gray-50 text-secondary text-center p-5 mt-20"
      >
        Made with ❤️... Happy Coding
      </motion.footer>

      <Modal
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
      </Modal>
    </div>
  )
}

export default LandingPage