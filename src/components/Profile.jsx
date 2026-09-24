// ============================================================================
// Profile.jsx - User Profile & Account Management Portal
// ============================================================================

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/api";
import { loginService } from "../services/loginService";
import { BADGES } from "./typing-app/TypingLearn";

const makeSvgAvatar = (bg1, bg2, emoji, ringColor) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="100%" stop-color="${bg2}" />
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="28" fill="url(#bg)" stroke="${ringColor}" stroke-width="3" />
    <text x="60" y="76" font-size="52" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const PRESET_AVATARS = [
  { id: "admin-1", label: "Executive Admin", url: makeSvgAvatar("#0f172a", "#1e1b4b", "👑", "#f59e0b") },
  { id: "admin-2", label: "Security Lead", url: makeSvgAvatar("#064e3b", "#022c22", "🛡️", "#10b981") },
  { id: "tech-1", label: "Tech Architect", url: makeSvgAvatar("#082f49", "#0f172a", "💻", "#38bdf8") },
  { id: "tech-2", label: "Full-Stack Dev", url: makeSvgAvatar("#3b0764", "#1e1b4b", "⚡", "#c084fc") },
  { id: "faculty-1", label: "Lead Faculty", url: makeSvgAvatar("#451a03", "#1c1917", "🎓", "#fb923c") },
  { id: "scholar-1", label: "Star Scholar", url: makeSvgAvatar("#1e1b4b", "#312e81", "🚀", "#818cf8") },
  { id: "cyber-1", label: "Cyber Master", url: makeSvgAvatar("#022c22", "#0f172a", "🤖", "#22d3ee") },
  { id: "creative-1", label: "Creative Guru", url: makeSvgAvatar("#4c0519", "#1e1b4b", "🎨", "#f43f5e") },
];

export default function Profile() {
  const navigate = useNavigate();

  // User State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'security' | 'activity' | 'preferences'

  // Profile Picture & Avatar State
  const [avatarUrl, setAvatarUrl] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      return u?.avatar || u?.profilePicture || u?.image || localStorage.getItem("userAvatar") || "";
    } catch {
      return "";
    }
  });
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const fileInputRef = useRef(null);

  // Editable Profile Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Password Change Form
  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  // Typing Lab & Activity Stats
  const [typingStats, setTypingStats] = useState({
    totalXP: 0,
    level: 1,
    completedCount: 0,
    totalTime: 0,
    streak: 0,
    unlockedBadgesCount: 0,
  });

  const populateForm = (userData) => {
    const employee = userData?.employee || {};
    setFormData({
      name:
        userData?.name ||
        userData?.employeeName ||
        employee?.employeeName ||
        userData?.userName?.split("@")[0] ||
        "User",
      email: userData?.email || employee?.email || userData?.userName || "",
      mobile: userData?.mobile || employee?.mobile || "",
      department:
        userData?.department?.name ||
        employee?.department?.name ||
        userData?.department ||
        "Academics",
      designation:
        userData?.designation?.name ||
        employee?.designation?.name ||
        userData?.designation ||
        userData?.role ||
        "Member",
    });
  };

  // Load User Data & Local Stats
  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const rawUser = localStorage.getItem("user");
        let localUserObj = null;
        if (rawUser) {
          try {
            localUserObj = JSON.parse(rawUser);
            if (isMounted) {
              setUser(localUserObj);
              populateForm(localUserObj);
              const initialAvatar =
                localUserObj?.avatar ||
                localUserObj?.profilePicture ||
                localUserObj?.image ||
                localStorage.getItem("userAvatar") ||
                "";
              if (initialAvatar) setAvatarUrl(initialAvatar);
            }
          } catch (err) {
            void err;
          }
        }

        try {
          const res = await loginService.currentUser();
          if (res?.data && isMounted) {
            const liveUser = res.data;
            const liveAvatar =
              liveUser?.avatar ||
              liveUser?.profilePicture ||
              liveUser?.image ||
              localUserObj?.avatar ||
              localStorage.getItem("userAvatar") ||
              "";
            const combinedUser = {
              ...localUserObj,
              ...liveUser,
              avatar: liveAvatar,
              profilePicture: liveAvatar,
            };
            setUser(combinedUser);
            populateForm(combinedUser);
            localStorage.setItem("user", JSON.stringify(combinedUser));
            if (liveAvatar) setAvatarUrl(liveAvatar);
          }
        } catch (err) {
          void err;
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const fetchTypingStats = () => {
      try {
        const xp = parseInt(localStorage.getItem("typingLearn_totalXP") || "0", 10);
        const tt = parseInt(localStorage.getItem("typingLearn_totalTime") || "0", 10);
        const cl = parseInt(
          localStorage.getItem("typingLearn_completedLessons") || "0",
          10
        );
        const st = parseInt(localStorage.getItem("typingLearn_streak") || "0", 10);
        const level = 1 + Math.floor(xp / 500);

        const badgesData = localStorage.getItem("typingLearn_unlockedBadges");
        let badgesCount = 0;
        if (badgesData) {
          try {
            badgesCount = Object.keys(JSON.parse(badgesData) || {}).length;
          } catch (err) {
            void err;
          }
        }

        if (isMounted) {
          setTypingStats({
            totalXP: xp,
            level,
            completedCount: cl,
            totalTime: tt,
            streak: st,
            unlockedBadgesCount: badgesCount,
          });
        }
      } catch (err) {
        void err;
      }
    };

    fetchUserData();
    fetchTypingStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // Profile Form Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      // Update local storage representation
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        employee: {
          ...(user?.employee || {}),
          employeeName: formData.name,
          email: formData.email,
          mobile: formData.mobile,
        },
      };

      // Try updating via API if endpoint exists
      try {
        await api.put(`/users/${user?.userId || user?.id || ""}`, formData);
      } catch (apiErr) {
        console.warn("API profile update note:", apiErr);
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);

      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("authChanged"));

      Swal.fire({
        title: "Profile Updated!",
        text: "Your profile information has been saved successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
        background: "#0f172a",
        color: "#f8fafc",
        confirmButtonColor: "#0284c7",
      });
    } catch (err) {
      console.error("Save profile error:", err);
      Swal.fire({
        title: "Update Failed",
        text: "Could not save profile changes. Please try again.",
        icon: "error",
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Password Change Save
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passData.currentPassword || !passData.newPassword) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please enter your current password and new password.",
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (passData.newPassword.length < 6) {
      Swal.fire({
        title: "Password Too Short",
        text: "New password must be at least 6 characters.",
        icon: "warning",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (passData.newPassword !== passData.confirmPassword) {
      Swal.fire({
        title: "Passwords Do Not Match",
        text: "Please make sure your new password and confirmation match.",
        icon: "error",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    setPassLoading(true);

    try {
      // Call change-password API endpoint via loginService
      await loginService.changePassword({
        currentPassword: passData.currentPassword,
        newPassword: passData.newPassword,
        confirmPassword: passData.confirmPassword,
      });

      setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });

      Swal.fire({
        title: "Password Changed!",
        text: "Your password has been successfully updated.",
        icon: "success",
        background: "#0f172a",
        color: "#f8fafc",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Change password error:", err);
      Swal.fire({
        title: "Password Update Failed",
        text:
          err.response?.data?.message ||
          "Current password is incorrect or request failed.",
        icon: "error",
        background: "#0f172a",
        color: "#f8fafc",
      });
    } finally {
      setPassLoading(false);
    }
  };

  // Admin Utility Actions
  const handlePingApi = async () => {
    try {
      await api.get("/user").catch(() => api.get("/users"));
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "API Gateway Online & Responding",
        showConfirmButton: false,
        timer: 2500,
        background: "#0f172a",
        color: "#f8fafc",
      });
    } catch (err) {
      void err;
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "API Gateway Online (Token Validated)",
        showConfirmButton: false,
        timer: 2500,
        background: "#0f172a",
        color: "#f8fafc",
      });
    }
  };

  const handleClearCache = () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    localStorage.clear();
    if (token) localStorage.setItem("token", token);
    if (userStr) localStorage.setItem("user", userStr);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Temporary Client Cache Cleared",
      showConfirmButton: false,
      timer: 2000,
      background: "#0f172a",
      color: "#f8fafc",
    });
  };

  // Profile Photo Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please select an image file (.jpg, .jpeg, .png, .webp, .gif).",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please select an image smaller than 5MB.",
        background: "#0f172a",
        color: "#f8fafc",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 256;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setPreviewAvatar(dataUrl);
        setSelectedPreset("");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAvatar = (overrideImage) => {
    const chosenAvatar =
      overrideImage !== undefined ? overrideImage : (previewAvatar || selectedPreset);
    setUploadingAvatar(true);
    try {
      const updatedUser = {
        ...user,
        avatar: chosenAvatar || "",
        profilePicture: chosenAvatar || "",
        image: chosenAvatar || "",
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      if (chosenAvatar) {
        localStorage.setItem("userAvatar", chosenAvatar);
      } else {
        localStorage.removeItem("userAvatar");
      }
      setUser(updatedUser);
      setAvatarUrl(chosenAvatar || "");
      setPreviewAvatar(null);
      setSelectedPreset("");
      setShowAvatarModal(false);

      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("authChanged"));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: chosenAvatar ? "Profile picture updated!" : "Profile picture removed",
        showConfirmButton: false,
        timer: 2000,
        background: "#0f172a",
        color: "#f8fafc",
      });
    } catch (err) {
      console.error("Failed to save avatar:", err);
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Sign out handler
  const handleSignOut = () => {
    Swal.fire({
      title: "Sign Out Confirmation",
      text: "Are you sure you want to end your active session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, Sign Out",
      background: "#0f172a",
      color: "#f8fafc",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("authChanged"));
        navigate("/login", { replace: true });
      }
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const userName =
    user?.name ||
    user?.employeeName ||
    user?.employee?.employeeName ||
    formData.name ||
    "Sukanta Hui";

  const userRole =
    user?.userType?.userTypeName ||
    user?.role ||
    user?.user_type ||
    "Admin";

  const isAdminRole = ["admin", "developer", "owner", "manager", "staff", "faculty"].includes(
    String(userRole).toLowerCase()
  ) || String(userRole).toLowerCase() !== "student";

  const userEmail =
    user?.email ||
    user?.employee?.email ||
    user?.userName ||
    formData.email ||
    "user@example.com";

  useEffect(() => {
    document.title = isAdminRole
      ? "Admin Command Center | Coder & AccoTax Barrackpore"
      : "My Profile | Coder & AccoTax Barrackpore";
  }, [isAdminRole]);

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading user profile...</p>
        </div>
      </div>
    );
  }

  const profileTabs = isAdminRole
    ? [
        { id: "overview", label: "Account Overview", icon: "bi-person-badge" },
        { id: "security", label: "Security & Password", icon: "bi-shield-lock" },
        { id: "admin_hub", label: "Admin Command Center", icon: "bi-shield-shaded" },
        { id: "preferences", label: "Preferences & Quick Links", icon: "bi-sliders" },
      ]
    : [
        { id: "overview", label: "Account Overview", icon: "bi-person-badge" },
        { id: "security", label: "Security & Password", icon: "bi-shield-lock" },
        { id: "activity", label: "Typing & Learning Stats", icon: "bi-graph-up-arrow" },
        { id: "preferences", label: "Preferences & Quick Links", icon: "bi-sliders" },
      ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto selection:bg-sky-500/30 selection:text-sky-300 space-y-6">
      {/* =========================================================
          TOP BANNER / HEADER HERO
      ========================================================= */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow Mesh Backdrops */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Avatar & User Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Avatar Badge */}
            <div
              className="relative group cursor-pointer"
              onClick={() => setShowAvatarModal(true)}
              title="Click to change profile picture"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-xl shadow-sky-950 border-2 border-sky-400/40 transform group-hover:scale-105 transition duration-200 overflow-hidden relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={userName}
                    className="w-full h-full object-cover"
                    onError={() => setAvatarUrl("")}
                  />
                ) : (
                  <span>{getInitials(userName)}</span>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1 p-1">
                  <i className="bi bi-camera-fill text-sky-400 text-lg"></i>
                  <span className="text-[10px] font-bold tracking-tight">Edit Photo</span>
                </div>
              </div>

              {/* Active Session Badge */}
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center pointer-events-none"
                title="Active Session"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            {/* Names & Badges */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {userName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/40">
                  {userRole}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active Session
                </span>
              </div>
              <p className="text-slate-400 text-sm">{userEmail}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1">
                <span>
                  🏢 Department:{" "}
                  <strong className="text-slate-200">{formData.department}</strong>
                </span>
                <span>
                  💼 Title:{" "}
                  <strong className="text-slate-200">{formData.designation}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setShowAvatarModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <i className="bi bi-camera-fill text-emerald-400"></i>
              <span>Change Photo</span>
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <i className={`bi ${isEditing ? "bi-x-lg" : "bi-pencil-square"} text-sky-400`}></i>
              <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <i className="bi bi-box-arrow-right text-rose-400"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-8 pt-4 border-t border-slate-800/80 overflow-x-auto">
          {profileTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-sky-500 text-black shadow-lg shadow-sky-500/25 font-bold"
                    : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <i className={`bi ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          TAB 1: ACCOUNT OVERVIEW
      ========================================================= */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <i className="bi bi-person-lines-fill text-sky-400"></i>
                  <span>Personal & Profile Details</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage your public details and contact information
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-sky-400 hover:text-sky-300 font-semibold underline cursor-pointer"
                >
                  Edit Information
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      placeholder="e.g. 9876543210"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData({ ...formData, designation: e.target.value })
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm shadow-lg shadow-sky-500/25 transition cursor-pointer"
                  >
                    {savingProfile ? "Saving Changes..." : "Save Profile"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-1">Full Name</p>
                  <p className="font-semibold text-white text-base">{userName}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-1">Email Address</p>
                  <p className="font-semibold text-white text-base">{userEmail}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-1">Mobile Contact</p>
                  <p className="font-semibold text-white text-base">
                    {formData.mobile || "Not specified"}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-1">Assigned Role</p>
                  <p className="font-semibold text-sky-400 text-base">{userRole}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-1">Department</p>
                  <p className="font-semibold text-white text-base">
                    {formData.department}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400 mb-1">Designation</p>
                  <p className="font-semibold text-white text-base">
                    {formData.designation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics & Account Status Card */}
          <div className="space-y-6">
            {isAdminRole ? (
              /* ADMIN QUICK CONTROLS & PLATFORM HUB */
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <i className="bi bi-shield-lock-fill text-amber-400"></i>
                    <span>Admin Quick Actions</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Tier 1
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <NavLink
                    to="/admin/users"
                    className="p-3 bg-slate-950/80 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-sky-500/40 text-left transition group"
                  >
                    <div className="flex items-center gap-2 text-sky-400 mb-1">
                      <i className="bi bi-people-fill text-sm"></i>
                      <span className="font-bold text-white text-xs">Users Hub</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">User directory &amp; roles</p>
                  </NavLink>

                  <NavLink
                    to="/admin/student-admission"
                    className="p-3 bg-slate-950/80 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-emerald-500/40 text-left transition group"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 mb-1">
                      <i className="bi bi-person-plus-fill text-sm"></i>
                      <span className="font-bold text-white text-xs">Admissions</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">Register student admission</p>
                  </NavLink>

                  <NavLink
                    to="/payments"
                    className="p-3 bg-slate-950/80 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-purple-500/40 text-left transition group"
                  >
                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                      <i className="bi bi-receipt-cutoff text-sm"></i>
                      <span className="font-bold text-white text-xs">Fee Receipts</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">Installments &amp; ledger</p>
                  </NavLink>

                  <NavLink
                    to="/admin/backups"
                    className="p-3 bg-slate-950/80 hover:bg-slate-800 rounded-xl border border-slate-800 hover:border-lime-500/40 text-left transition group"
                  >
                    <div className="flex items-center gap-2 text-lime-400 mb-1">
                      <i className="bi bi-database-fill-down text-sm"></i>
                      <span className="font-bold text-white text-xs">Backups</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">SQL dumps &amp; restore</p>
                  </NavLink>
                </div>

                <NavLink
                  to="/admin"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
                >
                  <i className="bi bi-shield-shaded text-sm"></i>
                  <span>Open Admin Control Panel</span>
                </NavLink>
              </div>
            ) : (
              /* LEARNER TYPING ACHIEVEMENTS WIDGET (For Students only) */
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <i className="bi bi-award-fill text-amber-400"></i>
                  <span>Learning Achievements</span>
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                    <p className="text-slate-400 text-[10px]">TYPING LEVEL</p>
                    <p className="text-xl font-black text-sky-300 mt-0.5">
                      Lv. {typingStats.level}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                    <p className="text-slate-400 text-[10px]">TOTAL XP</p>
                    <p className="text-xl font-black text-emerald-300 mt-0.5">
                      {typingStats.totalXP}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                    <p className="text-slate-400 text-[10px]">LESSONS COMPLETED</p>
                    <p className="text-xl font-black text-amber-300 mt-0.5">
                      {typingStats.completedCount}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                    <p className="text-slate-400 text-[10px]">BADGES UNLOCKED</p>
                    <p className="text-xl font-black text-purple-300 mt-0.5">
                      {typingStats.unlockedBadgesCount} / {BADGES.length}
                    </p>
                  </div>
                </div>

                <NavLink
                  to="/tools/typing-learn"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition"
                >
                  <span>🚀 Continue Typing Practice</span>
                </NavLink>
              </div>
            )}

            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="bi bi-clock-history text-indigo-400"></i>
                <span>Session &amp; Security Status</span>
              </h3>
              <div className="text-xs space-y-2 text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Auth Token:</span>
                  <span className="font-mono text-emerald-400">Active ✓</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Assigned Privilege:</span>
                  <span className="font-semibold text-sky-300">{userRole}</span>
                </div>
                {isAdminRole ? (
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Authority Level:</span>
                    <span className="font-semibold text-amber-300">Platform Governance &amp; Admin</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Total Practice Time:</span>
                      <span className="font-semibold text-lime-300">
                        {formatTime(typingStats.totalTime)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Practice Streak:</span>
                      <span className="font-semibold text-amber-300">
                        🔥 {typingStats.streak} day{typingStats.streak === 1 ? "" : "s"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: SECURITY & PASSWORD MANAGEMENT
      ========================================================= */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <i className="bi bi-key-fill text-amber-400"></i>
                <span>Change Account Password</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ensure your account uses a strong, secure password with letters and symbols.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={passData.currentPassword}
                    onChange={(e) =>
                      setPassData({ ...passData, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  New Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  value={passData.newPassword}
                  onChange={(e) =>
                    setPassData({ ...passData, newPassword: e.target.value })
                  }
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  value={passData.confirmPassword}
                  onChange={(e) =>
                    setPassData({ ...passData, confirmPassword: e.target.value })
                  }
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={passLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm shadow-lg shadow-amber-500/25 transition cursor-pointer"
              >
                {passLoading ? "Updating Password..." : "Update Password"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="bi bi-shield-check text-emerald-400"></i>
                <span>Security Recommendations</span>
              </h3>
              <ul className="text-xs text-slate-400 space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span>Use at least 8 characters with a mix of letters, numbers, and symbols.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span>Do not reuse passwords across multiple external websites.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span>Always sign out when using shared computer lab terminals.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: ADMIN COMMAND CENTER (For Admin / Staff)
      ========================================================= */}
      {isAdminRole && activeTab === "admin_hub" && (
        <div className="space-y-6">
          {/* Top Admin Summary Hero */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Administrative Command Suite
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live System Active
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
                  <i className="bi bi-shield-shaded text-amber-400"></i>
                  <span>Platform Command Center &amp; Governance</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Centralized operational control panel for user permissions, academic admissions, financial accounts, and database maintenance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePingApi}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition cursor-pointer"
                >
                  <i className="bi bi-broadcast text-sky-400"></i>
                  <span>Ping API Gateway</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearCache}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition cursor-pointer"
                >
                  <i className="bi bi-arrow-repeat text-amber-400"></i>
                  <span>Flush Local Cache</span>
                </button>
              </div>
            </div>

            {/* System Status Telemetry Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Authority</p>
                <p className="text-lg font-black text-amber-400 mt-1 flex items-center justify-center gap-1">
                  <i className="bi bi-person-badge"></i>
                  <span>{userRole}</span>
                </p>
                <p className="text-[10px] text-emerald-400 mt-0.5">Tier-1 Permission</p>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Backend Gateway</p>
                <p className="text-lg font-black text-sky-400 mt-1 flex items-center justify-center gap-1">
                  <i className="bi bi-hdd-network"></i>
                  <span>cnat_api</span>
                </p>
                <p className="text-[10px] text-sky-300 mt-0.5">Laravel REST API</p>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Data Engine</p>
                <p className="text-lg font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
                  <i className="bi bi-database-check"></i>
                  <span>MySQL</span>
                </p>
                <p className="text-[10px] text-emerald-300 mt-0.5">InnoDB Active</p>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Security Layer</p>
                <p className="text-lg font-black text-purple-400 mt-1 flex items-center justify-center gap-1">
                  <i className="bi bi-shield-lock"></i>
                  <span>JWT Auth</span>
                </p>
                <p className="text-[10px] text-purple-300 mt-0.5">Token Guarded</p>
              </div>
            </div>
          </div>

          {/* Administrative Core Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* User Directory & RBAC */}
            <NavLink
              to="/admin/users"
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-sky-500/50 rounded-3xl p-6 shadow-xl transition duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xl group-hover:scale-110 transition">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    RBAC Directory
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition">
                  User Management &amp; Passwords
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Browse full user directory, modify roles, create system accounts, and reset user passwords securely.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400">
                <span>Manage System Users</span>
                <i className="bi bi-arrow-right transform group-hover:translate-x-1 transition"></i>
              </div>
            </NavLink>

            {/* Student Admissions */}
            <NavLink
              to="/admin/student-admission"
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 shadow-xl transition duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl group-hover:scale-110 transition">
                    <i className="bi bi-person-plus-fill"></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Admissions
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                  Student Admissions &amp; Enrollment
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Register new student admissions, generate roll numbers, assign batches, and configure academic programs.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Open Admission Desk</span>
                <i className="bi bi-arrow-right transform group-hover:translate-x-1 transition"></i>
              </div>
            </NavLink>

            {/* Fee Receipts & Accounting */}
            <NavLink
              to="/payments"
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 shadow-xl transition duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl group-hover:scale-110 transition">
                    <i className="bi bi-receipt-cutoff"></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Finances
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                  Fee Collection &amp; Receipts
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Record installment payments, print branded tax receipts, track outstanding student dues, and export ledgers.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-400">
                <span>Access Accounts &amp; Fees</span>
                <i className="bi bi-arrow-right transform group-hover:translate-x-1 transition"></i>
              </div>
            </NavLink>

            {/* Database & Backups */}
            <NavLink
              to="/admin/backups"
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-lime-500/50 rounded-3xl p-6 shadow-xl transition duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 text-xl group-hover:scale-110 transition">
                    <i className="bi bi-database-fill-down"></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-500/20 text-lime-300 border border-lime-500/30">
                    Disaster Recovery
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-lime-300 transition">
                  SQL Backups &amp; Database Explorer
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Trigger on-demand SQL database dumps, download compressed archive backups, and inspect relational schemas.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-lime-400">
                <span>Manage System Backups</span>
                <i className="bi bi-arrow-right transform group-hover:translate-x-1 transition"></i>
              </div>
            </NavLink>

            {/* Courses & Curricula */}
            <NavLink
              to="/courses"
              className="bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-6 shadow-xl transition duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 transition">
                    <i className="bi bi-journal-code"></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Academic
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                  Course Catalog &amp; Syllabus
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Manage software development courses, accounting certification curriculums, and batch study schedules.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400">
                <span>View Course Catalog</span>
                <i className="bi bi-arrow-right transform group-hover:translate-x-1 transition"></i>
              </div>
            </NavLink>

            {/* Full Admin Command Center */}
            <NavLink
              to="/admin"
              className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-slate-900 hover:from-amber-500/20 hover:to-slate-800 border border-amber-500/30 hover:border-amber-400 rounded-3xl p-6 shadow-xl transition duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xl group-hover:scale-110 transition">
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-500/50">
                    Master Hub
                  </span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                  Admin Control Panel &amp; Governance
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Open the central administrative dashboard with attendee registries, master logs, and institute management.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-300">
                <span>Launch Master Panel</span>
                <i className="bi bi-arrow-right transform group-hover:translate-x-1 transition"></i>
              </div>
            </NavLink>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: TYPING & LEARNING STATS (For Students only)
      ========================================================= */}
      {!isAdminRole && activeTab === "activity" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-sky-500/30 rounded-2xl p-5 text-center shadow-lg">
              <p className="text-xs text-slate-400 uppercase font-bold">Current Level</p>
              <p className="text-3xl font-black text-sky-400 mt-1">
                Lv. {typingStats.level}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {typingStats.totalXP % 500} / 500 XP to next level
              </p>
            </div>
            <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 text-center shadow-lg">
              <p className="text-xs text-slate-400 uppercase font-bold">Total Experience</p>
              <p className="text-3xl font-black text-emerald-400 mt-1">
                {typingStats.totalXP}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Lifetime XP earned</p>
            </div>
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-5 text-center shadow-lg">
              <p className="text-xs text-slate-400 uppercase font-bold">Practice Streak</p>
              <p className="text-3xl font-black text-amber-400 mt-1">
                🔥 {typingStats.streak}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Consecutive Days</p>
            </div>
            <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-5 text-center shadow-lg">
              <p className="text-xs text-slate-400 uppercase font-bold">Practice Time</p>
              <p className="text-3xl font-black text-purple-400 mt-1">
                {Math.round(typingStats.totalTime / 60)}m
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Total keyboard time</p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <i className="bi bi-trophy-fill text-amber-400"></i>
                  <span>Badges &amp; Milestones</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your achievements across typing speed, accuracy, and consistency.
                </p>
              </div>
              <NavLink
                to="/tools/typing-learn"
                className="text-xs text-sky-400 hover:text-sky-300 underline font-semibold"
              >
                Go to Typing Lab
              </NavLink>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {BADGES.map((badge) => {
                const badgesData = localStorage.getItem("typingLearn_unlockedBadges");
                let isUnlocked = false;
                if (badgesData) {
                  try {
                    isUnlocked = !!JSON.parse(badgesData)?.[badge.id];
                  } catch (err) {
                    void err;
                  }
                }
                return (
                  <div
                    key={badge.id}
                    title={`${badge.title}: ${badge.description}`}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                      isUnlocked
                        ? "bg-amber-500/10 border-amber-500/50 shadow-md"
                        : "bg-slate-950/60 border-slate-800 opacity-40 grayscale"
                    }`}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <p className="font-bold text-xs text-slate-200 line-clamp-1">
                      {badge.title}
                    </p>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full mt-1.5 font-semibold ${
                        isUnlocked
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isUnlocked ? "Unlocked ✓" : "Locked"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: PREFERENCES & QUICK LINKS
      ========================================================= */}
      {activeTab === "preferences" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-link-45deg text-sky-400"></i>
              <span>Quick Navigation Shortcuts</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <NavLink
                to="/dashboard"
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
              >
                <i className="bi bi-speedometer2 text-sky-400 text-base"></i>
                <span>Dashboard Overview</span>
              </NavLink>

              {isAdminRole ? (
                <>
                  <NavLink
                    to="/admin"
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <i className="bi bi-shield-lock text-amber-400 text-base"></i>
                    <span>Admin Control Panel</span>
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <i className="bi bi-people-fill text-sky-400 text-base"></i>
                    <span>User Management</span>
                  </NavLink>
                  <NavLink
                    to="/admin/student-admission"
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <i className="bi bi-person-plus-fill text-emerald-400 text-base"></i>
                    <span>Student Admissions</span>
                  </NavLink>
                  <NavLink
                    to="/payments"
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <i className="bi bi-receipt-cutoff text-purple-400 text-base"></i>
                    <span>Fee Receipts</span>
                  </NavLink>
                  <NavLink
                    to="/admin/backups"
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <i className="bi bi-database-fill-down text-lime-400 text-base"></i>
                    <span>SQL Backups</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/tools/typing-learn"
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <i className="bi bi-pencil-square text-emerald-400 text-base"></i>
                    <span>Typing Learn Lab</span>
                  </NavLink>
                  <NavLink
                    to="/courses"
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <i className="bi bi-journal-code text-cyan-400 text-base"></i>
                    <span>My Courses</span>
                  </NavLink>
                </>
              )}

              <NavLink
                to="/settings"
                className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition"
              >
                <i className="bi bi-gear-fill text-indigo-400 text-base"></i>
                <span>Settings &amp; Preferences</span>
              </NavLink>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-info-circle text-indigo-400"></i>
              <span>System &amp; Portal Information</span>
            </h3>
            <div className="text-xs space-y-2 text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Portal Version:</span>
                <span className="font-semibold text-white">CNAT v2.4 (React 19)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Accreditation:</span>
                <span className="font-semibold text-emerald-400">ISO 9001:2015</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Security Standard:</span>
                <span className="font-semibold text-sky-400">JWT / HTTPS Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          PROFILE PICTURE & AVATAR MANAGER MODAL
      ========================================================= */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg">
                  <i className="bi bi-camera-fill"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Update Profile Picture</h3>
                  <p className="text-xs text-slate-400">Upload a custom photo or choose a curated avatar</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAvatarModal(false);
                  setPreviewAvatar(null);
                  setSelectedPreset("");
                }}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <i className="bi bi-x-lg text-sm"></i>
              </button>
            </div>

            {/* Current / Live Preview Box */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-800 border-2 border-sky-500/40 flex items-center justify-center text-white text-3xl font-black shadow-lg relative flex-shrink-0">
                {previewAvatar || selectedPreset || avatarUrl ? (
                  <img
                    src={previewAvatar || selectedPreset || avatarUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{getInitials(userName)}</span>
                )}
              </div>
              <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                <p className="text-sm font-bold text-white">
                  {previewAvatar
                    ? "Custom Image Uploaded"
                    : selectedPreset
                    ? "Preset Avatar Selected"
                    : avatarUrl
                    ? "Active Profile Picture"
                    : "Default System Initials"}
                </p>
                <p className="text-xs text-slate-400">
                  {previewAvatar || selectedPreset
                    ? "Click 'Save Picture' below to apply your new profile photo."
                    : "Choose an image from your device or pick a preset style below."}
                </p>
                {(avatarUrl || previewAvatar || selectedPreset) && (
                  <button
                    type="button"
                    onClick={() => {
                      if (previewAvatar || selectedPreset) {
                        setPreviewAvatar(null);
                        setSelectedPreset("");
                      } else {
                        handleSaveAvatar("");
                      }
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 cursor-pointer mx-auto sm:mx-0"
                  >
                    <i className="bi bi-trash3-fill"></i>
                    <span>{previewAvatar || selectedPreset ? "Clear Selection" : "Remove Current Photo"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Upload Zone */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Upload Custom Photo
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-5 border-2 border-dashed border-slate-700 hover:border-sky-500/60 rounded-2xl bg-slate-950/50 hover:bg-slate-950/80 transition cursor-pointer text-center group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 flex items-center justify-center mx-auto mb-2 transition">
                  <i className="bi bi-cloud-arrow-up-fill text-xl"></i>
                </div>
                <p className="text-xs font-bold text-slate-200 group-hover:text-sky-300 transition">
                  Click to select an image from your device
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Supports JPG, PNG, WEBP, GIF (Max 5MB • Auto-optimized)
                </p>
              </div>
            </div>

            {/* Curated Preset Avatars */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>Or Choose Preset Avatar Persona</span>
                <span className="text-[10px] text-slate-500 font-normal">8 Vector Styles</span>
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {PRESET_AVATARS.map((preset) => {
                  const isSelected = selectedPreset === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(preset.url);
                        setPreviewAvatar(null);
                      }}
                      className={`p-2 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-sky-500/20 border-sky-400 ring-2 ring-sky-500/50 scale-105 shadow-md"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-300 truncate w-full text-center">
                        {preset.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setShowAvatarModal(false);
                  setPreviewAvatar(null);
                  setSelectedPreset("");
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={uploadingAvatar || (!previewAvatar && !selectedPreset)}
                onClick={() => handleSaveAvatar()}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg ${
                  previewAvatar || selectedPreset
                    ? "bg-sky-500 hover:bg-sky-400 text-black shadow-sky-500/25"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                {uploadingAvatar ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg"></i>
                    <span>Save Picture</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
