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
                    key={m}
                    onClick={() => setMood(m)}
                    className={`text-2xl transition-all duration-200 ${
                      mood === m ? "scale-125" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* 내용 입력 */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write about your day..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C] text-sm resize-none"
              />

              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 py-2 bg-[#6BAF7C] text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditTarget(null);
                    setContent("");
                    setMood("😊");
                  }}
                  className="flex-1 py-2 bg-gray-100 text-gray-500 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 일기 카드 리스트 */}
        {diaries.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-8">
            No entries yet. Write your first one! 🌸
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {diaries.map((diary) => (
              <motion.div
                key={diary._id}
                className="bg-white shadow-sm rounded-xl p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === diary._id ? null : diary._id)}
                whileTap={{ scale: 0.98 }}
              >
                {/* 카드 헤더 */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{diary.mood}</span>
                    <p className="text-sm font-medium text-[#3F4A3F]">
                      {formatDate(diary.date)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditTarget(diary._id);
                        setMood(diary.mood);
                        setContent(diary.content);
                        setShowForm(true);
                      }}
                      className="text-gray-300 hover:text-[#6BAF7C] text-sm transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDiary(diary._id);
                      }}
                      className="text-gray-300 hover:text-red-400 text-sm transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* 내용 미리보기 / 전체보기 */}
                <p className={`text-sm text-gray-500 ${expandedId === diary._id ? "" : "line-clamp-2"}`}>
                  {diary.content}
                </p>
                {diary.content.length > 100 && (
                  <p className="text-xs text-[#6BAF7C] mt-1">
                    {expandedId === diary._id ? "Show less" : "Read more..."}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}