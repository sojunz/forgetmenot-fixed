import { useState } from "react";
import { useMemoStore } from "../store/memoStore";

export default function MemoInput() {
  const [text, setText] = useState("");
  const addMemo = useMemoStore((state) => state.addMemo);

  const handleAdd = () => {
    if (!text.trim()) return;
    addMemo(text);
    setText("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        placeholder="Write a quick memo..."
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white
             focus:outline-none focus:ring-2 focus:ring-[#6BAF7C]"
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
