import { motion } from "framer-motion";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

export default function Tasks() {
  return (
    <motion.div
      className="min-h-screen pt-16 flex flex-col items-center bg-[#F3F8F4] px-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-md mt-8">
        <h1 className="text-3xl font-semibold text-[#3F4A3F] mb-6">Tasks</h1>
        <div className="bg-white shadow-sm rounded-xl p-6">
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </motion.div>
  );
}