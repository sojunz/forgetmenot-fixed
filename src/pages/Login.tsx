import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { API } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-[#F3F8F4] px-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌱</div>
          <h1 className="text-3xl font-semibold text-[#3F4A3F]">Welcome back</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to ForgetMeNot</p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col gap-4">
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C] text-sm"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C] text-sm"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 bg-[#6BAF7C] text-white rounded-lg font-medium hover:bg-[#5a9e6b] transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

          <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-[#6BAF7C]">
          Forgot password?
          </Link>
            </div>

        {/* Register 링크 */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#6BAF7C] font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}