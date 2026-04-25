import { useEffect } from "react";
import { motion } from "framer-motion";
import MemoInput from "../components/MemoInput";
import MemoList from "../components/MemoList";
import CoachBubble from "../components/CoachBubble";
import { useMemoStore } from "../store/memoStore";
import { useTaskStore } from "../store/taskStore";

const quotes = [
  "Small steps make a big difference. 🌿",
  "You've got this. One thing at a time. 🌱",
  "A clear mind starts with a small note. 📝",
  "Today is a good day to remember. ✨",
];

export default function Home() {
  const { memos, fetchMemos } = useMemoStore();
  const { tasks, fetchTasks } = useTaskStore();

  const pendingTasks = tasks.filter((t) => !t.done).length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const quote = quotes[new Date().getDay() % quotes.length];

  // 페이지 열릴 때 데이터 가져오기
  useEffect(() => {
    fetchMemos();
    fetchTasks();
  }, []);

  return (
    <motion.div
      className="min-h-screen pt-16 flex flex-col items-center bg-[#F3F8F4] px-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      {/* 날짜 + 한마디 */}
      <div className="w-full max-w-md text-center mt-8 mb-6">
        <p className="text-sm text-gray-400">{today}</p>
        <h1 className="text-4xl font-semibold text-gray-800 mt-1">
          ForgetMeNot
        </h1>
        <p className="text-gray-500 mt-2 text-sm">{quote}</p>
      </div>

      {/* CoachBubble */}
      <CoachBubble />

      {/* 메모 박스 */}
      <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6">
        <MemoInput />
        <MemoList />
      </div>

      {/* 요약 카드 */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-[#6BAF7C]">{memos.length}</p>
          <p className="text-sm text-gray-500 mt-1">Memos today</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <p className="text-2xl font-bold text-[#6BAF7C]">{pendingTasks}</p>
          <p className="text-sm text-gray-500 mt-1">Tasks pending</p>
        </div>
      </div>

      <div className="h-12" />
    </motion.div>
  );
}