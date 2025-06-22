import React from "react";
import { motion } from "framer-motion";

interface MapleCardProps {
  children: React.ReactNode;
  className?: string;
}

const MapleCard: React.FC<MapleCardProps> = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 30, scale: 0.97 }}
    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
    className={`rounded-3xl bg-orange-100 shadow-lg p-6 border-2 border-orange-200 ${className || ""}`}
  >
    {children}
  </motion.div>
);

export default MapleCard;
