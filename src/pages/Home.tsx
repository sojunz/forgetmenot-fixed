import { motion } from "framer-motion";
import MemoInput from "../components/MemoInput";
import MemoList from "../components/MemoList";

export default function Home() {
  return (
    <motion.div
    className="min-h-screen pt-20 flex flex-col items-center justify-center bg-[#F3F8F4] px-6"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.25 }}
  >  
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">
          ForgetMeNot
        </h1>
        <p className="text-gray-500 mt-2">
          Capture your thoughts quickly and clearly
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-sm rounded-xl p-6">
        <MemoInput />
        <MemoList />
      </div>
    </motion.div>
  );
}
