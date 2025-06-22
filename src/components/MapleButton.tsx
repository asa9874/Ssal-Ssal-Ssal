import React from "react";
import { motion } from "framer-motion";

interface MapleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MapleButton: React.FC<MapleButtonProps> = ({ children, className, ...props }) => (
  <motion.button
    whileTap={{ scale: 0.93 }}
    whileHover={{ scale: 1.04 }}
    className={`rounded-full bg-orange-200 hover:bg-orange-300 text-orange-900 font-bold px-6 py-2 shadow-md transition-all duration-200 border-2 border-orange-300 outline-none focus:ring-2 focus:ring-orange-400 ${className || ""}`}
    {...(props as any)}
  >
    {children}
  </motion.button>
);

export default MapleButton;
