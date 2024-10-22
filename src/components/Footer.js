import React from 'react'
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-lg mt-8">
    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
      <div className="w-full lg:w-1/2">
        <motion.header
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-secondary">Call Us</h3>
        </motion.header>
        <p className="text-lg mt-2">
          <a
            className="text-primary hover:underline"
            href="tel:0705237806"
          >
            020-123-789
          </a>
        </p>

        <motion.header
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-6"
        >
          <h3 className="text-2xl font-semibold text-secondary">Email Us</h3>
        </motion.header>
        <p className="text-lg mt-2">
          <a
            href="mailto:vikakamau04@gmail.com"
            className="text-primary hover:underline"
          >
            MunchinKenya@gmail.com
          </a>
        </p>

        <motion.header
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-6"
        >
          <h3 className="text-2xl font-semibold text-secondary">
            Reach Us Through
          </h3>
        </motion.header>
        <div className="flex gap-4 mt-2">
          <img
            src="https://img.freepik.com/free-vector/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.jpg"
            className="w-8 h-8"
            alt="Instagram"
          />
          <img
            src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
            className="w-8 h-8"
            alt="Twitter"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png"
            className="w-8 h-8"
            alt="Facebook"
          />
        </div>
      </div>

      {/* Business Hours */}
      <div className="w-full lg:w-1/2 sm:text-right">
        <motion.header
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-secondary">
            Business Hours
          </h3>
        </motion.header>
        <p className="text-lg mt-4 text-gray-700">
          <strong>Monday-Friday:</strong> 6:30am to 11:30pm
        </p>
        <p className="text-lg mt-2 text-gray-700">
          <strong>Saturday:</strong> 7:00am to 9:00pm
        </p>
        <p className="text-lg mt-2 text-gray-700">
          <strong>Sunday:</strong> 10:00am to 7:00pm
        </p>
      </div>
    </div>
  </div>
  )
}

export default Footer
