import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download,
  CheckCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  Mic,
  Video,
  Monitor,
  HardDrive,
  Cpu,
  FileCode,
  Sparkles,
  Info,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Sliders,
  Eye,
  Check,
} from "lucide-react";

export default function ScreenRecorder() {
  const [copied, setCopied] = useState(false);
  const [downloadCount, setDownloadCount] = useState(148);
  const [activeFaq, setActiveFaq] = useState(null);

  const downloadUrl =
    "https://github.com/sukantahui/CNAT_Screen_recorder/releases/download/v1.0.1/CNAT_Screen_Recorder.exe";
  const releaseUrl =
    "https://github.com/sukantahui/CNAT_Screen_recorder/releases/tag/v1.0.1";
  const repoUrl = "https://github.com/sukantahui/CNAT_Screen_recorder";

  useEffect(() => {
    document.title = "CNAT Screen Recorder v1.0.1 | Free Windows Desktop Screen & Audio Recorder";
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadClick = () => {
    setDownloadCount((prev) => prev + 1);
  };

  const features = [
    {
      icon: <Monitor className="w-6 h-6 text-sky-400" />,
      title: "Crystal Clear Screen Capture",
      desc: "Record crisp HD video of your full desktop display, active application windows, or customized regions at high framerates.",
      badge: "60 FPS Support",
    },
    {
      icon: <Mic className="w-6 h-6 text-emerald-400" />,
      title: "Dual Audio Synchronization",
      desc: "Simultaneously capture system sound and microphone narration with low-latency audio mixing, ideal for teaching and presentations.",
      badge: "Mic & System Audio",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Zero Setup & Portable (.exe)",
      desc: "Single standalone executable file. No bulky installers, no registry edits, and no administrator privileges required to get started.",
      badge: "Standalone EXE",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: "100% Offline & Private",
      desc: "Runs completely offline on your Windows machine with zero telemetry, no cloud uploads, and total privacy for your recordings.",
      badge: "Zero Tracking",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      title: "No Watermarks & No Limits",
      desc: "Unlimited recording duration with clean video outputs. Free forever for students, teachers, developers, and educators.",
      badge: "100% Free",
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: "Low CPU & RAM Footprint",
      desc: "Optimized hardware-accelerated video pipeline ensures smooth recordings even during intensive coding sessions and games.",
      badge: "Lightweight",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Download Executable",
      desc: "Click the Download button to obtain the official `CNAT_Screen_Recorder.exe` (Version 1.0.1).",
      icon: <Download className="w-5 h-5 text-sky-400" />,
    },
    {
      step: "02",
      title: "Launch the Application",
      desc: "Open your Downloads folder and run the EXE. If Windows SmartScreen prompts on first run, click 'More info' ➔ 'Run anyway'.",
      icon: <FileCode className="w-5 h-5 text-indigo-400" />,
    },
    {
      step: "03",
      title: "Start Recording",
      desc: "Select your audio sources & screen area, hit Record, and capture high-resolution tutorials with ease!",
      icon: <Video className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const faqs = [
    {
      q: "Why is CNAT Screen Recorder provided as an .EXE download?",
      a: "Browsers run web applications inside a restricted sandbox that cannot access native desktop hardware capture with low overhead or write direct local files without memory constraints. This standalone Windows .exe desktop software gives you direct hardware capture, high FPS, dual-audio mixing, and unrestricted offline recording.",
    },
    {
      q: "Does this software require installation or admin privileges?",
      a: "No installation is required! It is a portable single-file executable. You can run it directly from your Downloads folder, Desktop, or even from a USB flash drive.",
    },
    {
      q: "Why did Windows SmartScreen show a blue warning banner?",
      a: "Windows SmartScreen displays an informational prompt for newly published executable files that do not have thousands of historical telemetry logs yet. Simply click 'More info' and then click 'Run anyway' to launch the application safely.",
    },
    {
      q: "Are there any watermarks or recording time limits?",
      a: "There are zero watermarks, no hidden subscriptions, and no arbitrary recording time limits. It is completely free for academic, professional, and personal use.",
    },
    {
      q: "What are the minimum system requirements?",
      a: "Windows 10 or Windows 11 (64-bit), 4 GB RAM or more, and standard audio/microphone input device.",
    },
  ];

  const relatedTools = [
    {
      to: "/tools/audioextract",
      label: "Audio Extractor",
      desc: "Extract MP3/WAV tracks from video files",
      icon: "bi-soundwave",
    },
    {
      to: "/tools/image-compressor",
      label: "Image Compressor & Resizer",
      desc: "Optimize images to target KB/MB & resolution",
      icon: "bi-file-earmark-image",
    },
    {
      to: "/whiteBoard",
      label: "Interactive Smart Whiteboard",
      desc: "Live drawing canvas for diagrams & lecture notes",
      icon: "bi-easel2-fill",
    },
    {
      to: "/python-play",
      label: "Python Playground",
      desc: "In-browser Python code execution & sandbox",
      icon: "bi-filetype-py",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/80">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* Version Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Windows Desktop Application • v1.0.1 Release</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
            >
              CNAT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
                Screen Recorder
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
            >
              Lightweight, high-performance desktop screen and dual-audio recording software
              developed for teachers, students, programmers, and content creators.
            </motion.p>

            {/* Notice Badge: Exe clarification */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-2.5 p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left text-xs sm:text-sm text-slate-300 max-w-xl"
            >
              <Info className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Desktop Software Download: </span>
                Since this is a native Windows application (<code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-xs">.exe</code> file), web browsers cannot run it directly. Download and launch the EXE to enjoy fast, offline, unlimited recording!
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap items-center justify-center gap-3.5 pt-2 w-full"
            >
              {/* Primary Direct Download Button */}
              <a
                href={downloadUrl}
                download="CNAT_Screen_Recorder.exe"
                onClick={handleDownloadClick}
                className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-0.5 transition-transform" />
                <span>Download for Windows (.exe)</span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-lg text-xs font-semibold bg-white/20 border border-white/30 text-white">
                  v1.0.1
                </span>
              </a>

              {/* Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700/80 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Direct Download Link</span>
                  </>
                )}
              </button>

              {/* GitHub Releases Link */}
              <a
                href={releaseUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>GitHub Releases</span>
              </a>
            </motion.div>

            {/* Quick Metadata Line */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Portable Standalone EXE
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Windows 10 / 11 (64-bit)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                No Watermarks or Subscriptions
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. 3-STEP QUICK START GUIDE */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Sliders className="w-5 h-5 text-sky-400" />
              <span>How to Run &amp; Start Recording</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Get up and running in less than 30 seconds with zero configuration required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((s, idx) => (
              <div
                key={s.step}
                className="relative bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-3 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-sky-400">
                    {s.step}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. KEY FEATURES GRID */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Powerful Desktop Recording Capabilities</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Built with developer-focused ergonomics, crisp audio-video capture, and zero clutter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-3 hover:bg-slate-900/90 hover:border-slate-700 transition duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/80 group-hover:scale-105 transition">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. TECHNICAL SPECIFICATIONS MATRIX */}
        {/* ========================================================================= */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Technical Specifications</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                Operating System
              </span>
              <p className="font-bold text-white">Windows 10 / 11 (64-bit)</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                Distribution Type
              </span>
              <p className="font-bold text-white">Standalone EXE (Portable)</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                Latest Version
              </span>
              <p className="font-bold text-white">v1.0.1 Stable</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
              <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                License &amp; Cost
              </span>
              <p className="font-bold text-emerald-400">100% Free / Academic</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. FAQS & TROUBLESHOOTING */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      activeFaq === idx ? "rotate-180 text-sky-400" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 border-t border-slate-800/60 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. RELATED ACADEMIC TOOLS */}
        {/* ========================================================================= */}
        <div className="border-t border-slate-800/80 pt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-white">Explore More Tools &amp; Utilities</h3>
            <Link
              to="/courses"
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
            >
              <span>View Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800/80 hover:border-slate-700 transition group"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 group-hover:scale-105 transition">
                  <i className={`bi ${tool.icon} text-sm`}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white group-hover:text-sky-300 truncate">
                    {tool.label}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
