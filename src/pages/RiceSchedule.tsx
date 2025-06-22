import React, { useState } from "react";
import MapleHeader from "../components/MapleHeader";
import { MapleCard } from "../components";
import MapleDraggableTask from "../components/MapleDraggableTask";

const today = new Date();
const getDateString = (date: Date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
const getHourString = (h: number) => `${h.toString().padStart(2, "0")}` + `~${(h+1).toString().padStart(2, "0")}`;

const RiceSchedule: React.FC = () => {
  const [selectedDate] = useState(getDateString(today));
  // 태스크 목록(예시)
  const [tasks, setTasks] = useState([
    { label: "경매장", color: "bg-blue-100" },
    { label: "경험치 비약 만들기", color: "bg-red-100" },
    { label: "채집", color: "bg-yellow-100" },
    { label: "사냥", color: "bg-pink-100" },
    { label: "일퀘", color: "bg-gray-100" },
    { label: "제작", color: "bg-green-100" },
  ]);

  // 일정: { [date: string]: (null | { label: string; color: string })[] }
  const [schedule, setSchedule] = useState<Record<string, (null | { label: string; color: string })[]>>({
    [getDateString(today)]: Array(24).fill(null)
  });
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  // 태스크 추가용 상태
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [newTaskColor, setNewTaskColor] = useState("bg-gray-100");

  return (
    <>
      <MapleHeader />
      <div className="min-h-screen flex flex-row items-start justify-center bg-gradient-to-b from-orange-50 to-orange-100 gap-8 py-10 w-full">
        {/* 오늘의 쌀 일정: 좌측 70% */}
        <div className="flex-1 max-w-[700px] min-w-[700px] flex flex-col items-center">
          <MapleCard className="w-full flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold text-orange-400 mb-2">오늘의 쌀 일정</h2>
            {/* 날짜 선택 input 제거 */}
            <div className="w-full grid grid-cols-4 gap-2 mt-4" id="rice-schedule-table">
              {/* 1열: 0~11시 시간 */}
              <div className="flex flex-col gap-1 items-end pr-2">
                {Array.from({ length: 12 }).map((_, h) => (
                  <div key={h} className="h-14 flex items-center justify-end text-orange-700 font-bold text-sm min-w-[38px]">
                    {getHourString(h)}
                  </div>
                ))}
              </div>
              {/* 2열: 0~11시 테스크 */}
              <div className="flex flex-col gap-1 w-full">
                {Array.from({ length: 12 }).map((_, h) => {
                  const task = schedule[selectedDate]?.[h];
                  return (
                    <div
                      key={h}
                      className={`h-14 flex items-center w-full rounded-lg border-2 transition-all cursor-pointer ${selectedHour === h ? "ring-2 ring-orange-400" : ""} ${task ? `${task.color} text-gray-900 border-orange-200` : "bg-orange-50 border-orange-200"}`}
                      style={{ fontWeight: 600, fontSize: '1rem', minHeight: '56px', height: '56px', minWidth: '100%', width: '100%' }}
                      onClick={() => {
                        if (task) {
                          setSchedule((prev) => ({
                            ...prev,
                            [selectedDate]: Array.isArray(prev[selectedDate]) ? prev[selectedDate].map((v, i) => i === h ? null : v) : Array(24).fill(null)
                          }));
                        }
                      }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        const data = e.dataTransfer.getData("application/json");
                        if (!data) return;
                        const droppedTask = JSON.parse(data);
                        setSchedule((prev) => ({
                          ...prev,
                          [selectedDate]: Array.isArray(prev[selectedDate]) ? prev[selectedDate].map((v, i) => i === h ? droppedTask : v) : Array(24).fill(null)
                        }));
                      }}
                    >
                      {task ? (
                        <span className="w-full text-center select-none whitespace-nowrap overflow-hidden text-ellipsis block" style={{width:'100%'}}>{task.label}</span>
                      ) : (
                        <span className="text-gray-300 text-sm w-full px-3 select-none">일정 없음</span>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* 3열: 12~23시 시간 */}
              <div className="flex flex-col gap-1 items-end pr-2">
                {Array.from({ length: 12 }).map((_, h) => (
                  <div key={h+12} className="h-14 flex items-center justify-end text-orange-700 font-bold text-sm min-w-[38px]">
                    {getHourString(h+12)}
                  </div>
                ))}
              </div>
              {/* 4열: 12~23시 테스크 */}
              <div className="flex flex-col gap-1 w-full">
                {Array.from({ length: 12 }).map((_, h) => {
                  const task = schedule[selectedDate]?.[h+12];
                  return (
                    <div
                      key={h+12}
                      className={`h-14 flex items-center w-full rounded-lg border-2 transition-all cursor-pointer ${selectedHour === h+12 ? "ring-2 ring-orange-400" : ""} ${task ? `${task.color} text-gray-900 border-orange-200` : "bg-orange-50 border-orange-200"}`}
                      style={{ fontWeight: 600, fontSize: '1rem', minHeight: '56px', height: '56px', minWidth: '100%', width: '100%' }}
                      onClick={() => {
                        if (task) {
                          setSchedule((prev) => ({
                            ...prev,
                            [selectedDate]: Array.isArray(prev[selectedDate]) ? prev[selectedDate].map((v, i) => i === h+12 ? null : v) : Array(24).fill(null)
                          }));
                        }
                      }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        const data = e.dataTransfer.getData("application/json");
                        if (!data) return;
                        const droppedTask = JSON.parse(data);
                        setSchedule((prev) => ({
                          ...prev,
                          [selectedDate]: Array.isArray(prev[selectedDate]) ? prev[selectedDate].map((v, i) => i === h+12 ? droppedTask : v) : Array(24).fill(null)
                        }));
                      }}
                    >
                      {task ? (
                        <span className="w-full text-center select-none whitespace-nowrap overflow-hidden text-ellipsis block" style={{width:'100%'}}>{task.label}</span>
                      ) : (
                        <span className="text-gray-300 text-sm w-full px-3 select-none">일정 없음</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </MapleCard>
        </div>
        {/* 태스크 목록: 우상단(오른쪽 30%) */}
        <div className="w-[200px] flex-shrink-0 flex flex-col items-center gap-2 bg-orange-50 rounded-2xl shadow-lg py-4 px-2 border-2 border-orange-200 mt-2">
          <div className="text-orange-700 font-bold mb-2">태스크 목록</div>
          {/* 태스크 추가 폼 */}
          <form
            className="flex flex-col gap-2 w-full mb-2"
            onSubmit={e => {
              e.preventDefault();
              if (!newTaskLabel.trim()) return;
              setTasks(prev => [...prev, { label: newTaskLabel, color: newTaskColor }]);
              setNewTaskLabel("");
            }}
          >
            <input
              className="rounded px-2 py-1 border border-orange-200 text-sm"
              placeholder="새 태스크 이름"
              value={newTaskLabel}
              onChange={e => setNewTaskLabel(e.target.value)}
              maxLength={16}
            />
            <select
              className="rounded px-2 py-1 border border-orange-200 text-sm"
              value={newTaskColor}
              onChange={e => setNewTaskColor(e.target.value)}
            >
              <option value="bg-green-100">연두</option>
              <option value="bg-blue-100">연파랑</option>
              <option value="bg-red-100">연빨강</option>
              <option value="bg-yellow-100">연노랑</option>
              <option value="bg-pink-100">연분홍</option>
              <option value="bg-gray-100">연회색</option>
            </select>
            <button type="submit" className="bg-orange-300 hover:bg-orange-400 text-white rounded px-2 py-1 text-sm font-bold">추가</button>
          </form>
          {tasks.map((task) => (
            <MapleDraggableTask
              key={task.label}
              label={task.label}
              bgColor={task.color}
              onDragStart={e => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("application/json", JSON.stringify(task));
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RiceSchedule;
