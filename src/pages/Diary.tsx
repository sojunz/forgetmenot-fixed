import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDiaryStore } from "../store/diaryStore";

const moods = ["😊", "🥰", "😴", "🤔", "😢", "😡", "😤"];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-NZ", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export default function Diary() {
  const { diaries, fetchDiaries, addDiary, updateDiary, deleteDiary } = useDiaryStore();

  const [showForm, setShowForm] = useState(false);
  const [mood, setMood] = useState("😊");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleSave = async () => {
    if (!content.trim()) return;
    setLoading(true);
    if (editTarget) {
      await updateDiary(editTarget, mood, content);
      setEditTarget(null);
    } else {
      await addDiary(mood, content, today);
    }
    setContent("");
    setMood("😊");
    setShowForm(false);
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen pt-16 flex flex-col items-center bg-[#F3F8F4] px-6 pb-24"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-md mt-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-[#3F4A3F] mb-1">
          My Haru Diary 🌸
        </h1>
        <p className="text-sm text-gray-400 italic mb-6">
          "Every day is a new beginning." 🌱
        </p>

        {/* 새 일기 버튼 */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-[#6BAF7C] text-white py-3 rounded-xl font-medium mb-6 shadow-sm"
          >
            + Write Today's Entry
          </button>
        )}

        {/* 일기 작성 폼 */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="bg-white shadow-sm rounded-xl p-6 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-sm text-gray-400 mb-3">
                {formatDate(today)}
              </p>

              {/* 기분 선택 */}
              <p className="text-sm text-[#3F4A3F] font-medium mb-2">How are you feeling?</p>
              <div className="flex gap-3 mb-4">
                {moods.map((m) => (
                  <button