import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navs = [
  { to: "/", label: "홈" },
  { to: "/rice-price", label: "쌀 제작" },
  { to: "/rice-schedule", label: "오늘의 쌀 일정" },
];

const MapleHeader: React.FC = () => {
  const location = useLocation();
  return (
    <div className="w-full flex items-center justify-between px-8 py-4 bg-orange-100 shadow-md border-b-2 border-orange-200">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-orange-400 drop-shadow">
          Ssal Maple
        </span>
      </div>
      <nav className="flex gap-4 relative">
        {/* moving highlight: navs 전체를 감싸는 컨테이너에서 위치/크기 계산 */}
        <div className="flex gap-4 relative">
          {navs.map((nav) => {
            const isActive = location.pathname === nav.to;
            return (
              <div key={nav.to} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 z-0 rounded-full bg-orange-300"
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  />
                )}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative z-10 rounded-full px-4 py-2 font-bold transition-all duration-150 text-orange-900 hover:bg-orange-200 hover:text-orange-700 ${
                    isActive ? "text-orange-800" : ""
                  }`}
                  style={{ background: "none", border: "none" }}
                  onClick={() =>
                    window.location.pathname !== nav.to &&
                    (window.location.href = nav.to)
                  }
                >
                  {nav.label}
                </motion.button>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MapleHeader;
