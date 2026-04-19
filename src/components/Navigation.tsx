import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navigation() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "Flow", path: "/flow" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="w-full bg-[#F3F8F4] shadow-sm fixed top-0 left-0 z-50">
        <div className="w-full flex items-center justify-between px-6 h-14">
          {/* Left: Logo */}
          <h1 className="text-xl font-semibold text-[#3F4A3F]">ForgetMeNot</h1>

          {/* Right: Hamburger (Animated) */}
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
          >
            <span
              className={`block h-0.5 w-6 bg-[#3F4A3F] transition-all duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#3F4A3F] transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#3F4A3F] transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Background overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50
          transform transition-all duration-300 ease-out
          ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        `}
      >
        <div className="flex flex-col p-6 gap-6">

          {/* Profile Section */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#6BAF7C]"
            />
            <div>
              <p className="font-semibold text-[#3F4A3F]">SoHyung</p>
              <p className="text-sm text-gray-500">sinchonblues@gmail.com</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`text-lg transition-colors ${
                  pathname === item.path
                    ? "text-[#6BAF7C] font-semibold"
                    : "text-[#3F4A3F] hover:text-[#6BAF7C]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
