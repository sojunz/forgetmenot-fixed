import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMemoStore } from "../store/memoStore";
import { useTaskStore } from "../store/taskStore";
import { useLeaveStore } from "../store/leaveStore";
import { useAuthStore } from "../store/authStore";

export default function Settings() {
  const { memos } = useMemoStore();
  const { tasks } = useTaskStore();
  const { items } = useLeaveStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [coachVisible, setCoachVisible] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const clearAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      className="min-h-screen pt-16 flex flex-col items-center bg-[#F3F8F4] px-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-md mt-8">
        <h1 className="text-3xl font-semibold text-[#3F4A3F] mb-6">Settings</h1>

        {/* 프로필 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-4 flex items-center gap-4">
          <img
            src="/profile.png"
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#6BAF7C]"
          />
          <div>
            <p className="font-semibold text-[#3F4A3F]">{user?.username}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* 데이터 요약 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-4">
          <p className="text-[#3F4A3F] font-medium mb-3">My Data</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#F3F8F4] rounded-xl p-3">
              <p className="text-2xl font-bold text-[#6BAF7C]">{memos.length}</p>
              <p className="text-xs text-gray-400 mt-1">Memos</p>
            </div>
            <div className="bg-[#F3F8F4] rounded-xl p-3">
              <p className="text-2xl font-bold text-[#6BAF7C]">{tasks.length}</p>
              <p className="text-xs text-gray-400 mt-1">Tasks</p>
            </div>
            <div className="bg-[#F3F8F4] rounded-xl p-3">
              <p className="text-2xl font-bold text-[#6BAF7C]">{items.length}</p>
              <p className="text-xs text-gray-400 mt-1">Leave items</p>
            </div>
          </div>
        </div>

        {/* CoachBubble 토글 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-4 flex justify-between items-center">
          <div>
            <p className="text-[#3F4A3F] font-medium">CoachBubble 🌱</p>
            <p className="text-sm text-gray-400">Show gentle reminders on Home</p>
          </div>
          <button
            onClick={() => setCoachVisible(!coachVisible)}
            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
              coachVisible ? "bg-[#6BAF7C]" : "bg-gray-300"
            } relative`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                coachVisible ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>

        {/* 앱 정보 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-4">
          <p className="text-[#3F4A3F] font-medium mb-3">App Info</p>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Theme</span>
              <span>Natural Green 🌿</span>
            </div>
          </div>
        </div>

        {/* 데이터 초기화 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-4">
          <p className="text-[#3F4A3F] font-medium mb-1">Reset Data</p>
          <p className="text-sm text-gray-400 mb-4">
            Clear all memos, tasks, and leave items.
          </p>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full py-2 rounded-xl bg-red-50 text-red-400 text-sm font-medium hover:bg-red-100 transition"
            >
              Reset All Data
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="flex-1 py-2 rounded-xl bg-red-400 text-white text-sm font-medium hover:bg-red-500 transition"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* 로그아웃 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-8">
          <p className="text-[#3F4A3F] font-medium mb-1">Account</p>
          <p className="text-sm text-gray-400 mb-4">
            Signed in as {user?.email}
          </p>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-xl bg-gray-50 text-gray-500 text-sm font-medium hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        </div>

      </div>
    </motion.div>
  );
}