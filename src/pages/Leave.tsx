import { motion } from "framer-motion";
import { useState } from "react";
import { useLeaveStore } from "../store/leaveStore";

export default function Leave() {
  const { items, addItem, toggleItem, removeItem } = useLeaveStore();
  const [text, setText] = useState("");

  const checkedCount = items.filter((i) => i.checked).length;
  const total = items.length;

  return (
    <motion.div
      className="min-h-screen pt-16 flex flex-col items-center bg-[#F3F8F4] px-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-md mt-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-[#3F4A3F] mb-1">
          Before I Leave 🚪
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {checkedCount} / {total} checked
        </p>

        {/* 체크리스트 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-4">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                    className="w-4 h-4 accent-[#6BAF7C]"
                  />
                  <span
                    className={`text-sm ${
                      item.checked
                        ? "line-through text-gray-400"
                        : "text-[#3F4A3F]"
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 추가 입력 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add an item..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C]"
          />
          <button
            onClick={() => {
              if (!text.trim()) return;
              addItem(text);
              setText("");
            }}
            className="px-4 py-2 bg-[#6BAF7C] text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}