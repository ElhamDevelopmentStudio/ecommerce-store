"use client";
import React from "react";
import { motion } from "framer-motion";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 blur-3xl" />
      <div className="relative">{children}</div>
    </motion.div>
  );
};

export default Container;
