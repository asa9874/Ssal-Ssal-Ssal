import React from "react";
import { motion } from "framer-motion";

interface MapleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const MapleInput: React.FC<MapleInputProps> = ({ label, className, ...props }) => (
  <label className="block text-orange-900 font-semibold mb-2">
    {label && <span className="block mb-1">{label}</span>}
    <motion.input
      whileFocus={{ scale: 1.04, boxShadow: "0 0 0 2px #fdba74" }}
      transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.2 }}
      {...(props as any)}
      className={`rounded-full bg-orange-50 border-2 border-orange-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner ${className || ""}`}
    />
  </label>
);

export default MapleInput;
