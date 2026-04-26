import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemoStore } from "../store/memoStore";
import { useFlowStore } from "../store/flowStore";
import { useTaskStore } from "../store/taskStore";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-NZ", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MemoList() {
  const { memos, removeMemo } = useMemoStore();
  const { categories, addMemoToCategory } = useFlowStore();
  const { addTask } = useTaskStore();

  const [moveTarget, setMoveTarget] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  if (memos.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        No memos yet. Write something above!
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-3 max-w-md mx-auto">
      {memos.map((memo) => (
        <div
          key={memo._id}
          className="bg-[#F3F8F4] p-4 rounded-xl shadow-sm flex justify-between items-center"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[#3F4A3F]">{memo.text}</span>
            <span className="text-xs text-gray-400">
              {formatDate(memo.createdAt)}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            {/* → Task 버튼 */}
            <button
              onClick={async () => {
                await addTask(memo.text);
                await removeMemo(memo._id);
              }}
              className="px-3 py-1 rounded-full bg-[#fff3e0] text-[#e0933a] text-xs font-medium hover:bg-[#ffe0b2] transition"
            >
              → Task
            </button>

            {/* Move 버튼 */}
            <button
              onClick={() => setMoveTarget(memo._id)}
              className="px-3 py-1 rounded-full bg-[#E6F7EC] text-[#3F4A3F] text-xs font-medium hover:bg-[#d7f0e0] transition"
            >
              Move
            </button>

            {/* 삭제 버튼 */}
            <button
              onClick={() => removeMemo(memo._id)}
              className="text-red-400 text-sm hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <AnimatePresence>
        {moveTarget !== null && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-1 mb-3" />
              <div className="w-full flex justify-center mb-4 text-2xl">🌿</div>
              <p className="text-[#3F4A3F] mb-3 font-medium">Move memo to:</p>

              <div className="flex flex-col gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full py-2 px-4 rounded-xl text-sm font-medium transition ${
                      selectedCategory === cat.name
                        ? "bg-[#6BAF7C] text-white"
                        : "bg-[#F3F8F4] text-[#3F4A3F] hover:bg-[#d7f0e0]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <button
                onClick={async () => {
                  if (!selectedCategory) return;
                  const memo = memos.find((m) => m._id === moveTarget);
                  if (!memo) return;
                  await addMemoToCategory(selectedCategory, memo.text);
                  await removeMemo(moveTarget);
                  setMoveTarget(null);
                  setSelectedCategory("");
                }}
                className="w-full py-2 rounded-full bg-[#6BAF7C] text-white font-medium hover:bg-[#5a9e6b] transition"
              >
                Move
              </button>
              <button
                onClick={() => {
                  setMoveTarget(null);
                  setSelectedCategory("");
                }}
                className="w-full text-gray-400 mt-2 text-sm"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}