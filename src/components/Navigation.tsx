import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tasks", path: "/tasks" },
  { name: "Flow", path: "/flow" },
  { name: "Settings", path: "/settings" },
];

export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav className="w-full bg-[#F3F8F4] shadow-sm fixed top-0 left-0 z-50">
      <div className="w-full flex items-center justify-between px-6 h-14">
        {/* Left: Logo */}
        <h1 className="text-xl font-semibold text-[#3F4A3F]">ForgetMeNot</h1>

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