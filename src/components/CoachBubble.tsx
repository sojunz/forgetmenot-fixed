import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMemoStore } from "../store/memoStore";
import { useNotificationStore } from "../store/notificationStore";

const messages = [
  { max: 0, text: "What's on your mind today? 🌿" },
  { max: 3, text: "Nice, you're on a roll! 👍" },
  { max: 4, text: "Quite a busy day, huh? 🌸" },
  { max: 5, text: "You have 5 memos! Want to organize them in Flow? 🌿" },
  { max: 7, text: "Things are piling up! Flow can help 📂" },
  { max: Infinity, text: "Wow, that's a lot to remember! 🌱" },
];

export default function CoachBubble() {
  const { memos } = useMemoStore();
  const { permission } = useNotificationStore();
  const navigate = useNavigate();
  const count = memos.length;
  const current = messages.find((m) => count <= m.max) ?? messages[0];

  // 메모 5개 되면 알림
  useEffect(() => {
    if (count === 5 && permission === "granted") {
      new Notification("Time to organize! 🌿", {
        body: "You have 5 memos. Want to move them to Flow?",
        icon: "/favicon.svg",
      });
    }
  }, [count]);

  return (
    <div className="flex items-end gap-3 mb-6 w-full max-w-md">
      <div className="text-4xl select-none">🌱</div>
      <div
        className="bg-white border border-[#c8dfc8] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm text-sm text-[#3F4A3F] cursor-pointer"
        onClick={() => count >= 5 ? navigate("/flow") : null}
      >
        {current.text}
        {count >= 5 && (
          <span className="block text-xs text-[#6BAF7C] mt-1">
            Tap to go to Flow →
          </span>
        )}
      </div>
    </div>
  );
}