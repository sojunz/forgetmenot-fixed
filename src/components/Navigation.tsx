import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const navItems = [
  { name: "Home", path: "/", icon: "🏠" },
  { name: "Tasks", path: "/tasks", icon: "✅" },
  { name: "Flow", path: "/flow", icon: "🌿" },
  { name: "Leave", path: "/leave", icon: "🚪" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  return (
    <>
      {/* 데스크탑 상단 네비 */}
      <nav className="hidden md:block w-full bg-[#F3F8F4] shadow-sm fixed top-0 left-0 z-40">
        <div className="w-full flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-[#3F4A3F]">ForgetMeNot</h1>
            {user && (
              <span className="text-sm text-gray-400">
                👋 {user.username}
              </span>
            )}
          </div>
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

      {/* 모바일 상단 로고 */}
      <div className="md:hidden w-full bg-[#F3F8F4] shadow-sm fixed top-0 left-0 z-40">
        <div className="flex items-center justify-between px-6 h-14">
          <h1 className="text-xl font-semibold text-[#3F4A3F]">ForgetMeNot</h1>
          {user && (
            <span className="text-sm text-gray-400">
              👋 {user.username}
            </span>
          )}
        </div>
      </div>

      {/* 모바일 하단 탭바 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                pathname === item.path
                  ? "text-[#6BAF7C]"
                  : "text-gray-400"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}