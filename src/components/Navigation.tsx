import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tasks", path: "/tasks" },
  { name: "Flow", path: "/flow" },
  { name: "Leave", path: "/leave" },
  { name: "Settings", path: "/settings" },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  return (
    <nav className="w-full bg-[#F3F8F4] shadow-sm fixed top-0 left-0 z-50">
      <div className="w-full flex items-center justify-between px-6 h-14">
        {/* Left: Logo + 유저 이름 */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-[#3F4A3F]">ForgetMeNot</h1>
          {user && (
            <span className="text-sm text-gray-400">
              👋 {user.username}
            </span>
          )}
        </div>

        {/* Right: Text Tabs */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-all duration-200 ${
                pathname === item.path
                  ? "text-[#6BAF7C] font-bold"
                  : "text-[#3F4A3F] opacity-50 hover:opacity-100"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}