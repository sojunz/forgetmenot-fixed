import { useTaskStore } from "../store/taskStore";
import { useState } from "react";

export default function TaskInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleAdd = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    await addTask(text);
    setText("");
    setLoading(false);
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        placeholder="Add a task..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C]"
      />
      <button
        onClick={handleAdd}
        disabled={loading}
        className="px-4 py-2 bg-[#6BAF7C] text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}