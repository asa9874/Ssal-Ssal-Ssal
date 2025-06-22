import React from "react";
import { motion } from "framer-motion";

interface MapleBadgeProps {
  children: React.ReactNode;
  color?: string;
}

const MapleBadge: React.FC<MapleBadgeProps> = ({ children, color = "bg-orange-300" }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, type: "spring" }}
    className={`inline-block rounded-full px-3 py-1 text-sm font-bold text-orange-900 shadow ${color}`}
  >
    {children}
  </motion.span>
);

export default MapleBadge;
