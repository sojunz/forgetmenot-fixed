import { useMemoStore } from "../store/memoStore";

export default function MemoList() {
  const memos = useMemoStore((state) => state.memos);
  const removeMemo = useMemoStore((state) => state.removeMemo);

  return (
    <ul className="space-y-2">
      {memos.map((memo) => (
        <li
          key={memo.id}
          className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
        >
          <span>{memo.text}</span>
          <button
            onClick={() => removeMemo(memo.id)}
            className="text-red-500"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
