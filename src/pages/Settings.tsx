import { motion } from "framer-motion";

export default function Settings() {
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
          Settings
        </h1>

        <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col gap-6">

          {/* Theme */}
          <div>
            <p className="text-[#3F4A3F] font-medium mb-1">Theme</p>
            <p className="text-gray-500 text-sm">Natural Green</p>
          </div>

          {/* Notifications */}
          <div>
            <p className="text-[#3F4A3F] font-medium mb-1">Notifications</p>
            <p className="text-gray-500 text-sm">Enabled</p>
          </div>

          {/* Version */}
          <div>
            <p className="text-[#3F4A3F] font-medium mb-1">App Version</p>
            <p className="text-gray-500 text-sm">1.0.0</p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
