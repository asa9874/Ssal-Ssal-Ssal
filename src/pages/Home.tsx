import React from "react";
import { MapleButton, MapleCard } from "../components";
import MapleHeader from "../components/MapleHeader";

const Home: React.FC = () => {
  return (
    <>
      <MapleHeader />
      <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-orange-50 to-orange-100 gap-8 py-10 relative overflow-x-hidden">
        {/* 상단 이모지 구름/별/쌀 */}
        <div className="w-full flex justify-between items-start px-16 pt-4 text-5xl select-none pointer-events-none">
          <span className="animate-float-slow">☁️</span>
          <span className="animate-twinkle">🌟</span>
          <span className="animate-float">☁️</span>
          <span className="animate-twinkle">🍚</span>
          <span className="animate-float">☁️</span>
        </div>
        {/* 중앙 카드 */}
        <MapleCard className="w-full max-w-5xl flex flex-col items-center gap-10 py-14 px-12 bg-white/80 shadow-2xl border-4 border-orange-200 relative z-10 mt-8">
          <h1 className="text-6xl font-extrabold text-orange-400 mb-2 drop-shadow-lg text-center animate-pop">🍚 Ssal Maple 🍚</h1>
          <p className="text-orange-900 text-2xl mb-2 text-center font-bold">메이플스토리 쌀 제작을 쉽고 빠르게!</p>
          <div className="w-full flex flex-col items-center gap-4">
            <span className="text-orange-700 text-lg text-center">이 사이트는 메이플스토리에서 쌀(곡물) 제작과 관련된 일정 관리와 제작 비용 계산을 돕기 위해 만들어졌습니다.<br/>
              시간별로 해야 할 쌀 관련 작업을 한눈에 정리하고, 재료 가격을 입력해 제작 비용을 간편하게 확인하세요.<br/>
              쌀 제작 루틴을 효율적으로 관리하고, 반복 작업을 더 편하게 할 수 있습니다.
            </span>
          </div>
          <div className="flex flex-wrap gap-10 justify-center w-full mt-8">
            <MapleCard className="w-96 bg-orange-50/80 border-orange-100 shadow-md flex flex-col items-center gap-4 p-8 text-center text-xl">
              <span className="text-3xl font-bold text-orange-500 flex items-center gap-2">🗓️ 쌀 일정표</span>
              <span className="text-orange-700 text-base">시간별로 쌀 관련 태스크를 드래그&드롭으로 배치하고, 일정 관리를 쉽게!</span>
              <a href="/rice-schedule"><MapleButton className="mt-4 w-full text-lg">일정표 바로가기</MapleButton></a>
            </MapleCard>
            <MapleCard className="w-96 bg-orange-50/80 border-orange-100 shadow-md flex flex-col items-center gap-4 p-8 text-center text-xl">
              <span className="text-3xl font-bold text-orange-500 flex items-center gap-2">🧮 쌀 제작 계산기</span>
              <span className="text-orange-700 text-base">쌀 및 재료 가격을 입력하면 제작 비용을 자동으로 계산!</span>
              <a href="/rice-price"><MapleButton className="mt-4 w-full text-lg">제작 계산기</MapleButton></a>
            </MapleCard>
          </div>
        </MapleCard>
        {/* 하단 이모지 이펙트 */}
        <div className="w-full flex justify-between items-end px-16 pb-4 text-5xl select-none pointer-events-none mt-8">
          <span className="animate-float-reverse">☁️</span>
          <span className="animate-twinkle">🌟</span>
          <span className="animate-float">🍚</span>
          <span className="animate-twinkle">☁️</span>
          <span className="animate-float">🌾</span>
        </div>
        {/* 애니메이션 스타일 */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
            100% { transform: translateY(0); }
          }
          @keyframes float-reverse {
            0% { transform: translateY(0); }
            50% { transform: translateY(16px); }
            100% { transform: translateY(0); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; filter: drop-shadow(0 0 8px #fff7); }
          }
          @keyframes pop {
            0% { transform: scale(0.7); opacity: 0; }
            80% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-float { animation: float 4s ease-in-out infinite; }
          .animate-float-slow { animation: float 7s ease-in-out infinite; }
          .animate-float-reverse { animation: float-reverse 5s ease-in-out infinite; }
          .animate-twinkle { animation: twinkle 2.5s ease-in-out infinite; }
          .animate-pop { animation: pop 0.7s cubic-bezier(.68,-0.55,.27,1.55) 1; }
        `}</style>
      </div>
    </>
  );
};

export default Home;
