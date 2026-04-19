import { motion } from "framer-motion";

export default function Tasks() {
  return (
    <motion.div
    className="min-h-screen pt-20 px-6 bg-[#F3F8F4]"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.25 }}
  >  
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-[#3F4A3F] mb-6">
          Tasks
        </h1>

        <div className="bg-white shadow-sm rounded-xl p-6">
          <p className="text-gray-600">
            여기에 Tasks 기능을 넣을 수 있어.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
