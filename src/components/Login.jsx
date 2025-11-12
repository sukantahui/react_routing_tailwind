import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/loginService";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginService.login(formData);

      if (res?.status && res?.data?.token) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));

        Swal.fire({
          title: "Welcome Back!",
          text: `${user.employee?.employeeName || user.userName ||  "User"}, you're logged in successfully.`,
          icon: "success",
          confirmButtonColor: "#2563eb",
          background: "#111827",
          color: "#f9fafb",
        }).then(() => {
          navigate("/dashboard");
        });;

        // navigate("/dashboard");
      } else {
        setError(res?.message || "Invalid login credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute w-[600px] h-[600px] bg-blue-700/30 rounded-full blur-[160px] -top-20 -left-20"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-[160px] bottom-0 right-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8 z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-400 mb-2 tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 text-red-400 border border-red-700/40 rounded-md px-3 py-2 mb-4 text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-md px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-2.5 rounded-md text-white font-semibold tracking-wide shadow-lg transition-all duration-300 ${
              loading
                ? "bg-blue-600/40 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-gray-700" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="w-full border-gray-700" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="flex items-center gap-2 border border-gray-700 bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-300">
              Sign in with Google
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 font-medium hover:underline cursor-pointer"
          >
            Create one
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
