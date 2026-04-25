import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useFlowStore } from "../store/flowStore";

export default function CategoryDetail() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { categories, addMemoToCategory, removeMemoFromCategory } = useFlowStore();
  const [text, setText] = useState("");

  if (!name) return null;

  const category = categories.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (!category) return <p>Category not found</p>;

  return (
    <motion.div
      className="min-h-screen pt-16 flex flex-col items-center bg-[#F3F8F4] px-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-md mt-8">
        {/* 뒤로가기 */}
        <button
          onClick={() => navigate("/flow")}
          className="text-sm text-gray-400 hover:text-[#3F4A3F] mb-4 transition-colors"
        >
          ← Back to Flow
        </button>

        {/* Header */}
        <h1 className="text-3xl font-semibold text-[#3F4A3F] mb-1">
          {category.name}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {category.memos.length} items
        </p>

        {/* 메모 리스트 */}
        <div className="bg-white shadow-sm rounded-xl p-6 mb-4">
          {category.memos.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">
              No memos yet. Add something below!
            </p>
          ) : (
            <ul className="space-y-3">
              {category.memos.map((m, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <span className="text-sm text-[#3F4A3F]">{m}</span>
                  <button
                    onClick={() => removeMemoFromCategory(category.name, m)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 메모 추가 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a memo..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C]"
          />
          <button
            onClick={() => {
              if (!text.trim()) return;
              addMemoToCategory(category.name, text);
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