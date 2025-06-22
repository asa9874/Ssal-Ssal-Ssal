import React from "react";
import { motion } from "framer-motion";

interface MapleAvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

const MapleAvatar: React.FC<MapleAvatarProps> = ({ src, alt = "avatar", size = 64 }) => (
  <motion.img
    src={src}
    alt={alt}
    width={size}
    height={size}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, type: "spring" }}
    className="rounded-full border-4 border-orange-200 bg-orange-50 shadow-md object-cover"
    style={{ width: size, height: size }}
  />
);

export default MapleAvatar;
