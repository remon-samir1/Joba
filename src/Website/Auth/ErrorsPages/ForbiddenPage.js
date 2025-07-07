import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForbiddenPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You don't have permission to view this page. Please contact the administrator or go back to a safe place.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
