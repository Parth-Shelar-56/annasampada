import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function ApiErrorCard({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="rounded-xl p-6 shadow-lg text-center border-2 border-red-500 bg-red-50 dark:bg-red-900/30"
    >
      <div className="flex justify-center mb-3">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h2 className="text-xl font-bold mb-2 text-red-800 dark:text-red-200">
        Prediction Failed
      </h2>
      <p className="text-red-700 dark:text-red-300 text-sm">{message}</p>
    </motion.div>
  );
}
