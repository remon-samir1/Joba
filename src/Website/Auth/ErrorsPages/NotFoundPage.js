import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center"
      >
        <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-2">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-main text-white rounded-full shadow hover:bg-opacity-90 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
