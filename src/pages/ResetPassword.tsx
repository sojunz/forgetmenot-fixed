import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../utils/api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    if (!password || !confirm) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
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
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌱</div>
          <h1 className="text-3xl font-semibold text-[#3F4A3F]">Reset Password</h1>
          <p className="text-gray-400 mt-2 text-sm">Enter your new password</p>
        </div>

        {success ? (
          <div className="bg-white shadow-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-[#3F4A3F] font-medium mb-2">Password reset!</p>
            <p className="text-gray-400 text-sm">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col gap-4">
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C] text-sm"
            />
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#6BAF7C] text-sm"
            />
            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full py-2 bg-[#6BAF7C] text-white rounded-lg font-medium hover:bg-[#5a9e6b] transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-400 mt-4">
          <Link to="/login" className="text-[#6BAF7C] font-medium">
            Back to Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}