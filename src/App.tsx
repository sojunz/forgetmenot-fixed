import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useMemoStore } from "./store/memoStore";
import { useTaskStore } from "./store/taskStore";
import { useFlowStore } from "./store/flowStore";
import { useLeaveStore } from "./store/leaveStore";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Flow from "./pages/Flow";
import CategoryDetail from "./pages/CategoryDetail";
import Settings from "./pages/Settings";
import Leave from "./pages/Leave";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AnimatedRoutes() {
  const location = useLocation();
  const { token } = useAuthStore();

  if (!token) {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/flow" element={<Flow />} />
        <Route path="/flow/:name" element={<CategoryDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const { token } = useAuthStore();
  const { fetchMemos } = useMemoStore();
  const { fetchTasks } = useTaskStore();
  const { fetchCategories } = useFlowStore();
  const { fetchItems } = useLeaveStore();

  // 로그인 후 한번만 fetch
  useEffect(() => {
    if (token) {
      fetchMemos();
      fetchTasks();
      fetchCategories();
      fetchItems();
    }
  }, [token]);

  return (
    <BrowserRouter>
      {token && <Navigation />}
      <AnimatedRoutes />
    </BrowserRouter>
  );
}