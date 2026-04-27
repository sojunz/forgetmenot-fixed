import { motion } from "framer-motion";
import { useState } from "react";
import { useLeaveStore } from "../store/leaveStore";

export default function Leave() {
  const { items, addItem, toggleItem, removeItem } = useLeaveStore();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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
        <h1 className="text-3xl font-semibold text-[#3F4A3F] mb-1">
          Before I Leave 🚪
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {checkedCount} / {total} checked
        </p>

        <div className="bg-white shadow-sm rounded-xl p-6 mb-4">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={async () => {
                      await toggleItem(item._id);
                    }}
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
                  onClick={async () => {
                    await removeItem(item._id);
                  }}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && text.trim() && !loading) {
                setLoading(true);
                await addItem(text);
                setText("");
                setLoading(false);
              }
            }}
            placeholder="Add an item..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C]"
          />
          <button
            disabled={loading}
            onClick={async () => {
              if (!text.trim()) return;
              setLoading(true);
              await addItem(text);
              setText("");
              setLoading(false);
            }}
            className="px-4 py-2 bg-[#6BAF7C] text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}