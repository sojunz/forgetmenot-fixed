import { useTaskStore } from "../store/taskStore";
import { useState } from "react";

export default function TaskInput() {
  const [text, setText] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addTask(text);
    setText("");
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
        className="px-4 py-2 bg-[#6BAF7C] text-white rounded-lg"
      >
        Add
      </button>
    </div>
  );
}