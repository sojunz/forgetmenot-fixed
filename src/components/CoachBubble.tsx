import { useMemoStore } from "../store/memoStore";

const messages = [
  { max: 0, text: "What's on your mind today? 🌿" },
  { max: 3, text: "Nice, you're on a roll! 👍" },
  { max: 7, text: "Quite a busy day, huh? 🌸" },
  { max: Infinity, text: "Wow, that's a lot to remember! 🌱" },
];

export default function CoachBubble() {
  const { memos } = useMemoStore();
  const count = memos.length;

  const current = messages.find((m) => count <= m.max) ?? messages[0];

  return (
    <div className="flex items-end gap-3 mb-6 w-full max-w-md">
      <div className="text-4xl select-none">🌱</div>
      <div className="bg-white border border-[#c8dfc8] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm text-sm text-[#3F4A3F]">
        {current.text}
      </div>
    </div>
  );
}