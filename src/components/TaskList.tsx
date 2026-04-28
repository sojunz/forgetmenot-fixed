import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTaskStore } from "../store/taskStore";
import { useFlowStore } from "../store/flowStore";

export default function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const { categories, addMemoToCategory } = useFlowStore();

  const [moveTarget, setMoveTarget] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-4">
        No tasks yet. Add something above!
      </p>
    );
  }

  return (
    <>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task._id)}
                className="w-4 h-4 accent-[#6BAF7C]"
              />
              <span
                className={`text-sm ${
                  task.done ? "line-through text-gray-400" : "text-[#3F4A3F]"
                }`}
              >
                {task.text}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Move 버튼 */}
              <button
                onClick={() => setMoveTarget(task._id)}
                className="px-3 py-1 rounded-full bg-[#E6F7EC] text-[#3F4A3F] text-xs font-medium hover:bg-[#d7f0e0] transition"
              >
                Move
              </button>
              <button
                onClick={() => removeTask(task._id)}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Move 모달 */}
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
              <p className="text-[#3F4A3F] mb-3 font-medium">Move task to Flow:</p>

              {categories.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400 text-sm mb-2">No categories yet! 🌿</p>
                  <p className="text-gray-400 text-xs mb-4">Go to Flow to create one first.</p>
                  <Link
                    to="/flow"
                    onClick={() => setMoveTarget(null)}
                    className="px-4 py-2 bg-[#6BAF7C] text-white rounded-lg text-sm"
                  >
                    Go to Flow →
                  </Link>
                </div>
              ) : (
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
              )}

              <button
                onClick={async () => {
                  if (!selectedCategory) return;
                  const task = tasks.find((t) => t._id === moveTarget);
                  if (!task) return;
                  await addMemoToCategory(selectedCategory, task.text);
                  await removeTask(moveTarget);
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
    </>
  );
}