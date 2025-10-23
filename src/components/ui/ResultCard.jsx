import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldOff, AlertCircle } from "lucide-react";

export default function ResultCard({ result }) {
  const { status, message, is_safe } = result || {};

  const isSafe = is_safe === true;
  const isUnsafe = is_safe === false;
  const isCaution = is_safe === null;

  const borderColor = isSafe
    ? "border-green-500"
    : isUnsafe
    ? "border-red-500"
    : "border-yellow-500";
  const bgColor = isSafe
    ? "bg-green-50 dark:bg-green-900/30"
    : isUnsafe
    ? "bg-red-50 dark:bg-red-900/30"
    : "bg-yellow-50 dark:bg-yellow-900/30";
  const iconColor = isSafe
    ? "text-green-500"
    : isUnsafe
    ? "text-red-500"
    : "text-yellow-500";
  const titleColor = isSafe
    ? "text-green-800 dark:text-green-200"
    : isUnsafe
    ? "text-red-800 dark:text-red-200"
    : "text-yellow-800 dark:text-yellow-200";
  const textColor = isSafe
    ? "text-green-700 dark:text-green-300"
    : isUnsafe
    ? "text-red-700 dark:text-red-300"
    : "text-yellow-700 dark:text-yellow-300";

  const Icon = isSafe ? CheckCircle2 : isUnsafe ? ShieldOff : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`rounded-xl p-6 shadow-lg text-center border-2 ${borderColor} ${bgColor}`}
    >
      <div className="flex justify-center mb-3">
        <Icon className={`w-12 h-12 ${iconColor}`} />
      </div>
      <h2 className={`text-2xl font-bold mb-2 ${titleColor}`}>{status}</h2>
      <p className={`text-md ${textColor}`}>{message}</p>
    </motion.div>
  );
}
