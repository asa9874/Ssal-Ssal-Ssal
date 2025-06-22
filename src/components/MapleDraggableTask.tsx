import React from "react";
import { motion } from "framer-motion";

interface MapleDraggableTaskProps {
  label: string;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  bgColor?: string; // 배경색 클래스 prop 추가
  onClick?: () => void; // 클릭 핸들러 prop 추가
}

const MapleDraggableTask: React.FC<MapleDraggableTaskProps> = ({ label, onDragStart, onDragEnd, bgColor, onClick }) => {
  return (
    <div
      className={`rounded-full font-bold px-4 py-2 mb-2 shadow text-center cursor-grab select-none ${bgColor ?? "bg-orange-200 text-orange-900"}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{ userSelect: "none" }}
    >
      <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.04 }}>
        {label}
      </motion.div>
    </div>
  );
};

export default MapleDraggableTask;
