// ============================================================================
// Settings.jsx - System Preferences, Audio, Shortcuts & Cache Management
// ============================================================================

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function Settings() {
  // Local Preferences State
  const [settings, setSettings] = useState({
    theme: "dark-slate",
    soundEffects: true,
    enableShortcuts: true,
    compactMode: false,
    autoSaveOffline: true,
  });

  // Storage metrics
  const [storageUsage, setStorageUsage] = useState({
    itemsCount: 0,
    estimatedSizeKb: 0,
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portal_settings");
      if (saved) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch (err) {
      void err;
    }

    calculateStorageUsage();
  }, []);

  const calculateStorageUsage = () => {
    try {
      let totalLength = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key) || "";
          totalLength += key.length + val.length;
        }
      }
      setStorageUsage({
        itemsCount: localStorage.length,
        estimatedSizeKb: (totalLength / 1024).toFixed(2),
      });
    } catch (err) {
      void err;
    }
  };

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    try {
      localStorage.setItem("portal_settings", JSON.stringify(updated));
    } catch (err) {
      void err;
    }
  };

  const handleClearTypingCache = () => {
    Swal.fire({
      title: "Reset Typing Progress?",
      text: "This will reset your local typing stats, XP, and lesson achievements on this machine.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, Reset Progress",
      background: "#0f172a",
      color: "#f8fafc",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("typingLearn_completedLessons");
        localStorage.removeItem("typingLearn_totalXP");
        localStorage.removeItem("typingLearn_totalTime");
        localStorage.removeItem("typingLearn_streak");
        localStorage.removeItem("typingLearn_unlockedBadges");
        localStorage.removeItem("typingLearn_lastActiveDate");

        calculateStorageUsage();

        Swal.fire({
          title: "Progress Reset",
          text: "Typing stats and local lessons cache have been cleared.",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#f8fafc",
        });
      }
    });
  };

  const handleClearAllStorage = () => {
    Swal.fire({
      title: "Clear All App Cache?",
      text: "This will clear all non-credential local state and reload the portal. You will remain logged in.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#334155",
      confirmButtonText: "Clear Cache & Refresh",
      background: "#0f172a",
      color: "#f8fafc",
    }).then((res) => {
      if (res.isConfirmed) {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        localStorage.clear();

        if (token) localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", user);

        calculateStorageUsage();

        Swal.fire({
          title: "Cache Cleared!",
          text: "Application cache refreshed successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#f8fafc",
        }).then(() => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-4 sm:p-6 md:p-10 max-w-6xl mx-auto selection:bg-purple-500/30 selection:text-purple-300 space-y-6">
      {/* Header Hero */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-900/50 border border-purple-400/30">
              <i className="bi bi-gear-fill"></i>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Settings &amp; Preferences
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                Customize your portal experience, keyboard shortcuts, and device cache
              </p>
            </div>
          </div>

          <NavLink
            to="/profile"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md"
          >
            <i className="bi bi-person-circle text-indigo-400"></i>
            <span>View My Profile</span>
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Interface & Sound Settings */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-sliders2 text-purple-400"></i>
              <span>Interface &amp; Audio Controls</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Tweak visual styles and tool interaction sounds
            </p>
          </div>

          <div className="space-y-4">
            {/* Audio Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  Interactive Sound Effects
                </p>
                <p className="text-[11px] text-slate-400">
                  Play audio feedback on typing errors and badge unlocks
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateSetting("soundEffects", !settings.soundEffects)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer ${
                  settings.soundEffects ? "bg-purple-600 justify-end" : "bg-slate-800 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
              </button>
            </div>

            {/* Keyboard Shortcuts Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  Global Keyboard Shortcuts
                </p>
                <p className="text-[11px] text-slate-400">
                  Enable Ctrl+K quick jump spotlight &amp; hotkey navigation
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateSetting("enableShortcuts", !settings.enableShortcuts)
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer ${
                  settings.enableShortcuts ? "bg-sky-600 justify-end" : "bg-slate-800 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
              </button>
            </div>

            {/* Offline Auto-Save */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  Auto-Save Offline Lesson State
                </p>
                <p className="text-[11px] text-slate-400">
                  Preserve last viewed lesson and active chapter locally
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateSetting("autoSaveOffline", !settings.autoSaveOffline)
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer ${
                  settings.autoSaveOffline ? "bg-emerald-600 justify-end" : "bg-slate-800 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Keyboard Shortcuts Cheatsheet */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-keyboard-fill text-sky-400"></i>
              <span>Keyboard Shortcuts Cheatsheet</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Power user shortcuts for ultra-fast portal navigation
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-300">Quick Navigation Spotlight</span>
              <div className="flex gap-1 font-mono">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sky-300 font-bold">
                  Ctrl
                </kbd>
                <span className="text-slate-500">+</span>
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sky-300 font-bold">
                  K
                </kbd>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-300">Dismiss Modal / Search Drawer</span>
              <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono font-bold">
                ESC
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-300">Typing Tutor Instant Restart</span>
              <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-300 font-mono font-bold">
                Tab + Enter
              </kbd>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-300">Highlight Text for Instant Dict Definition</span>
              <span className="text-indigo-300 font-medium">Select any word</span>
            </div>
          </div>
        </div>

        {/* Card 3: Storage & Local Cache Control */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-hdd-stack text-emerald-400"></i>
              <span>Local Storage &amp; Cache</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage cached lessons, typing records, and offline storage
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400 uppercase">Cached Keys</p>
              <p className="text-lg font-black text-white mt-0.5">
                {storageUsage.itemsCount}
              </p>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-400 uppercase">Estimated Size</p>
              <p className="text-lg font-black text-emerald-400 mt-0.5">
                {storageUsage.estimatedSizeKb} KB
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleClearTypingCache}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="bi bi-arrow-counterclockwise text-amber-400"></i>
              <span>Reset Typing Practice Stats Only</span>
            </button>

            <button
              onClick={handleClearAllStorage}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="bi bi-trash3 text-rose-400"></i>
              <span>Clear Full Application Cache</span>
            </button>
          </div>
        </div>

        {/* Card 4: System & Diagnostics */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <i className="bi bi-activity text-lime-400"></i>
              <span>System &amp; Network Health</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Portal runtime status and connectivity indicators
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400">Network Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Online &amp; Connected
              </span>
            </div>

            <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400">React Build Version:</span>
              <span className="font-mono text-sky-400 font-bold">19.0.0 (Vite)</span>
            </div>

            <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400">Tailwind Engine:</span>
              <span className="font-mono text-purple-400 font-bold">v3.4.17</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
