import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setSent(true);
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
          <h1 className="text-3xl font-semibold text-[#3F4A3F]">Forgot Password</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {sent ? (
          <div className="bg-white shadow-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">📬</div>
            <p className="text-[#3F4A3F] font-medium mb-2">Email sent!</p>
            <p className="text-gray-400 text-sm mb-4">
              Check your inbox for the reset link. It expires in 1 hour.
            </p>
            <Link to="/login" className="text-[#6BAF7C] text-sm font-medium">
              Back to Sign In
            </Link>
          </div>
        ) : (
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
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2 bg-[#6BAF7C] text-white rounded-lg font-medium hover:bg-[#5a9e6b] transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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