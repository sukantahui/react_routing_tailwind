// ============================================================================
// Login.jsx - Next-Level Ultra-Modern Authentication Portal
// ============================================================================

import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { loginService } from "../services/loginService";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import cnat from "../assets/cnat.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginService.login(formData);

      if (res?.status && res?.data?.token) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("authChanged"));

        const userName = user?.employee?.employeeName || user?.userName || user?.name || "User";

        Swal.fire({
          title: "Welcome Back!",
          text: `Hello ${userName}, you have successfully signed in.`,
          icon: "success",
          confirmButtonColor: "#0284c7",
          background: "#0f172a",
          color: "#f8fafc",
          iconColor: "#38bdf8",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: "border border-slate-800 rounded-2xl shadow-2xl shadow-sky-950",
          },
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        setError(res?.message || "Invalid login credentials. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Incorrect email or password. Please verify credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 selection:bg-sky-500/30 selection:text-sky-300">
      {/* Dynamic Background Glowing Orbs */}
      <div className="absolute w-[600px] h-[600px] bg-sky-600/15 rounded-full blur-[140px] -top-32 -left-20 pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] -bottom-20 -right-20 pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      {/* Subtle Background Grid Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card Container with Glassmorphism */}
        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/10">
          
          {/* Top Multi-Color Accent Glow Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-90" />

          <div className="p-6 sm:p-9">
            {/* Header: Brand Logo & Title */}
            <div className="flex flex-col items-center text-center mb-6">
              <NavLink to="/" className="group mb-3 relative flex items-center justify-center focus:outline-none">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 opacity-30 group-hover:opacity-80 blur transition duration-300" />
                <img
                  src={cnat}
                  alt="Coder & AccoTax"
                  className="relative w-12 h-12 sm:w-14 sm:h-14 object-contain transform group-hover:scale-105 transition duration-200"
                />
              </NavLink>

              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  Coder<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">&</span>AccoTax
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ISO 9001:2015 Certified Portal
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-200 tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Access faculty, student & academic dashboards
              </p>
            </div>

            {/* Animated Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-5 overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs shadow-sm">
                    <i className="bi bi-exclamation-octagon-fill text-rose-400 text-sm mt-0.5 flex-shrink-0"></i>
                    <div className="flex-1 min-w-0 font-medium leading-relaxed">{error}</div>
                    <button
                      type="button"
                      onClick={() => setError("")}
                      className="text-rose-400 hover:text-rose-200 ml-1 flex-shrink-0 cursor-pointer"
                      aria-label="Dismiss error"
                    &gt;
                      <i className="bi bi-x-lg text-xs"></i>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-300 mb-1.5"
                >
                  Email or Username
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-500 pointer-events-none">
                    <i className="bi bi-envelope-at-fill text-sm"></i>
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="name@coderaccotax.in"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950/90 border border-slate-700/80 hover:border-slate-600 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-inner transition-all duration-150"
                  />
                </div>
              </div>

              {/* Password Field with Show/Hide Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-slate-300"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      Swal.fire({
                        title: "Account Recovery",
                        text: "Please contact the institute administrator to reset your credentials.",
                        icon: "info",
                        confirmButtonColor: "#0284c7",
                        background: "#0f172a",
                        color: "#f8fafc",
                      });
                    }}
                    className="text-[11px] text-sky-400 hover:text-sky-300 hover:underline font-medium cursor-pointer"
                  &gt;
                    Forgot password?
                  </button>
                </div>

                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-500 pointer-events-none">
                    <i className="bi bi-shield-lock-fill text-sm"></i>
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950/90 border border-slate-700/80 hover:border-slate-600 rounded-xl pl-9 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-inner transition-all duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-200 text-sm focus:outline-none cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  &gt;
                    <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-sky-500 focus:ring-offset-0 transition cursor-pointer"
                  /&gt;
                  <span className="text-xs text-slate-400 font-medium">Keep me signed in</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-200 cursor-pointer ${
                  loading
                    ? "bg-slate-700/60 text-slate-400 cursor-not-allowed border border-slate-700"
                    : "bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-sky-500/25 hover:shadow-sky-500/40"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <i className="bi bi-arrow-right text-sm"></i>
                  </>
                )}
              </motion.button>
            </form>

            {/* Trust Badges & Security */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <i className="bi bi-shield-check text-emerald-400 text-xs"></i>
                <span>256-bit SSL Secure Portal</span>
              </span>
              <NavLink
                to="/"
                className="text-slate-400 hover:text-sky-400 flex items-center gap-1 transition"
              >
                <i className="bi bi-arrow-left text-[10px]"></i>
                <span>Back to Home</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Support Note */}
        <div className="text-center mt-5 text-xs text-slate-500">
          Need registration or enrollment assistance?{" "}
          <NavLink to="/#contact" className="text-sky-400 hover:text-sky-300 font-medium hover:underline">
            Contact Institute
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
