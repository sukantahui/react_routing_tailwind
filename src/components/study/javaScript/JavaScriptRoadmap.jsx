// src/components/study/JavaScriptRoadmap.jsx

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Code2,
  ShieldCheck,
  Sparkles,
  Clock,
} from "lucide-react";

import roadmapData from "./javascript-roadmap-enhanced.json";

import {
  Linkedin,
  Twitter,
  Globe,
  Github,
  Mail,
  Phone
} from "lucide-react";


export default class JavaScriptRoadmap extends Component {
  // ==========================================================
  // Dynamic Segment Colors
  // ==========================================================
  colorThemes = [
    { from: "#38bdf8", to: "#a855f7", title: "text-sky-300" },
    { from: "#4ade80", to: "#22d3ee", title: "text-emerald-300" },
    { from: "#f59e0b", to: "#ef4444", title: "text-amber-300" },
    { from: "#6366f1", to: "#ec4899", title: "text-indigo-300" },
  ];

  // ==========================================================
  // State
  // ==========================================================
  state = {
    search: "",
    forceUpdate: 0,
  };

  // ==========================================================
  // Lifecycle Methods
  // ==========================================================
  componentDidMount() {
    window.addEventListener("storage", this.handleAuthChange);
    window.addEventListener("authChange", this.handleAuthChange);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.handleAuthChange);
    window.removeEventListener("authChange", this.handleAuthChange);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  // ==========================================================
  // Event Handlers
  // ==========================================================
  handleAuthChange = () => {
    this.setState(prev => ({ forceUpdate: prev.forceUpdate + 1 }));
  };

  handleVisibilityChange = () => {
    if (!document.hidden) {
      this.setState(prev => ({ forceUpdate: prev.forceUpdate + 1 }));
    }
  };

  // ==========================================================
  // Helper to check if user is logged in from localStorage
  // ==========================================================
  isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  };

  // ==========================================================
  // Module Visibility Check
  // ==========================================================
  isModuleVisible = (module) => {
    // If no visibility key exists, show the module (public by default)
    if (!module.hasOwnProperty("visibility")) {
      return true;
    }
    
    // Convert visibility to lowercase for case-insensitive comparison
    const visibility = module.visibility.toLowerCase();
    
    // If visibility is public, show the module
    if (visibility === "public") {
      return true;
    }
    
    // If visibility is loggedin, check if user is logged in
    if (visibility === "loggedin") {
      return this.isLoggedIn();
    }
    
    // Default to false for any other visibility values
    return false;
  };

  // ==========================================================
  // LocalStorage helpers (Completion Tracking)
  // ==========================================================
  isCompleted(moduleId) {
    return (
      localStorage.getItem(`c-module-completed::${moduleId}`) === "true"
    );
  }

  toggleCompleted(moduleId) {
    const key = `c-module-completed::${moduleId}`;
    const current = this.isCompleted(moduleId);
    localStorage.setItem(key, (!current).toString());
    this.setState({});
  }

  // ==========================================================
  // Search logic
  // ==========================================================
  matchesSearch(module) {
    const searchText = this.state.search.toLowerCase();

    return (
      module.title.toLowerCase().includes(searchText) ||
      (module.summary &&
        module.summary.toLowerCase().includes(searchText)) ||
      (Array.isArray(module.topics) &&
        module.topics.some((t) => t.toLowerCase().includes(searchText)))
    );
  }

  // ==========================================================
  // Render Segment
  // ==========================================================
  renderSegment(segment, index) {
    const filteredModules = segment.modules.filter((m) => {
      const visible = this.isModuleVisible(m);
      const matches = this.matchesSearch(m);
      return visible && matches;
    });

    if (filteredModules.length === 0) return null;

    const theme = this.colorThemes[index % this.colorThemes.length];

    return (
      <section key={segment.segmentId} className="relative border border-slate-800 bg-slate-900/70 rounded-3xl p-5 sm:p-6 md:p-10 mb-14 shadow-[0_0_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* Segment Header */}
        <div className="space-y-2 mb-6">
          <h2
            className={`text-xl md:text-3xl font-extrabold ${theme.title} flex items-center gap-2`}
          >
            <Layers size={20} />
            {segment.title}
          </h2>
          <p className="text-slate-400 text-sm">{segment.summary}</p>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredModules.map((module, i) =>
            this.renderModule(module, i)
          )}
        </div>

        {/* Show login prompt if segment has locked modules and user is not logged in */}
        {!this.isLoggedIn() && segment.modules.some(m => m.visibility === "loggedIn") && (
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-xl">
            <p className="text-blue-300 text-sm text-center">
              🔒 Some modules in this segment are locked. 
              <Link to="/login" className="text-blue-400 font-semibold ml-2 hover:underline">
                Sign in to access all modules
              </Link>
            </p>
          </div>
        )}
      </section>
    );
  }

  // ==========================================================
  // Render Module Card
  // ==========================================================
  renderModule(module, index) {
    const completed = this.isCompleted(module.moduleId);
    const directURL = `${window.location.origin}/${roadmapData.folder}/module/${module.slug}`;
    const isVisible = this.isModuleVisible(module);
    const isLocked = !isVisible && module.visibility === "loggedIn";
    
    // Check if this is a loggedIn-only module (visible because user is logged in)
    const isLoggedInOnlyModule = module.visibility === "loggedIn" && this.isLoggedIn();

    // If module is locked, show a locked card with amber color
    if (isLocked) {
      return (
        <div
          key={module.moduleId}
          className="relative rounded-2xl p-4 sm:p-5 border border-amber-500/60 bg-amber-900/10"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-[10px]">
                  {index + 1}
                </span>
                <span>{module.moduleId}</span>
              </div>

              <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
                <Code2 size={16} className="text-amber-500" />
                {module.title}
              </h3>

              <div className="mt-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-amber-900/30 text-amber-400 text-xs border border-amber-500/50 hover:bg-amber-500/20 transition"
                >
                  <span className="text-base">🔒</span>
                  Login to access this module
                </Link>
              </div>

              {module.summary && (
                <p className="mt-2 text-sm text-slate-500">
                  {module.summary.substring(0, 100)}...
                </p>
              )}
            </div>
          </div>

          {/* Meta with amber colors */}
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            <span className="px-2 py-1 rounded-full bg-amber-900/30 flex items-center gap-1 text-amber-400">
              <ShieldCheck size={11} className="text-amber-400" />
              {module.level}
            </span>
            <span className="px-2 py-1 rounded-full bg-amber-900/30 flex items-center gap-1 text-amber-400">
              <Sparkles size={11} className="text-amber-400" />
              {module.difficulty}
            </span>
            <span className="px-2 py-1 rounded-full bg-amber-900/30 flex items-center gap-1 text-amber-400">
              <Clock size={11} className="text-amber-400" />
              {module.estimatedHours} hrs
            </span>
          </div>
        </div>
      );
    }

    // Normal visible module with conditional styling based on module type
    return (
      <div
        key={module.moduleId}
        className={`
          relative rounded-2xl p-4 sm:p-5 transition-all
          ${completed
            ? "border border-emerald-500/60 bg-emerald-900/10"
            : isLoggedInOnlyModule
              ? "border border-purple-500/60 bg-purple-900/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
              : "border border-slate-700/60 bg-slate-800/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]"
          }
          hover:scale-[1.01]
        `}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-[10px]">
                {index + 1}
              </span>
              <span>{module.moduleId}</span>
            </div>

            <h3 className={`text-lg font-semibold flex items-center gap-2 ${
              isLoggedInOnlyModule ? "text-purple-300" : "text-slate-100"
            }`}>
              <Code2 size={16} className={isLoggedInOnlyModule ? "text-purple-400" : "text-sky-400"} />
              {module.title}
            </h3>

            {completed && (
              <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded-full border border-emerald-500 text-emerald-300 bg-emerald-700/20">
                ✓ Completed
              </span>
            )}

            {/* Badge for loggedIn-only modules */}
            {isLoggedInOnlyModule && (
              <span className="inline-block mt-2 ml-2 text-[10px] px-2 py-1 rounded-full border border-purple-500 text-purple-300 bg-purple-700/20">
                🔒 Premium Content
              </span>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={`/${roadmapData.folder}/module/${module.slug}`}
                className={`
                  px-3 py-2 rounded-full border text-xs transition
                  ${isLoggedInOnlyModule
                    ? "border-purple-500 text-purple-300 hover:bg-purple-500/10"
                    : "border-sky-500 text-sky-300 hover:bg-sky-500/10"
                  }
                `}
              >
                Explore Module →
              </Link>

              <button
                onClick={() => this.toggleCompleted(module.moduleId)}
                className={`
                  px-3 py-2 rounded-full text-xs border transition
                  ${completed
                    ? "border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
                    : "border-slate-600 text-slate-400 hover:bg-slate-700/30"
                  }
                `}
              >
                {completed ? "Mark Incomplete" : "Mark Completed"}
              </button>
            </div>

            <p className="mt-2 text-[11px] text-slate-400 break-all">
              <a
                href={directURL}
                target="_blank"
                rel="noopener noreferrer"
                className={isLoggedInOnlyModule ? "text-purple-400 hover:underline" : "text-sky-400 hover:underline"}
              >
                {directURL}
              </a>
            </p>

            {module.summary && (
              <p className="mt-2 text-sm text-slate-300">
                {module.summary}
              </p>
            )}
          </div>
        </div>

        {/* Meta section with different colors for loggedIn modules */}
        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${
            isLoggedInOnlyModule 
              ? "bg-purple-900/30 text-purple-400" 
              : "bg-slate-900 text-slate-400"
          }`}>
            <ShieldCheck size={11} className={isLoggedInOnlyModule ? "text-purple-400" : "text-emerald-400"} />
            {module.level}
          </span>

          <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${
            isLoggedInOnlyModule 
              ? "bg-purple-900/30 text-purple-400" 
              : "bg-slate-900 text-slate-400"
          }`}>
            <Sparkles size={11} className={isLoggedInOnlyModule ? "text-purple-400" : "text-purple-400"} />
            {module.difficulty}
          </span>

          <span className={`px-2 py-1 rounded-full flex items-center gap-1 ${
            isLoggedInOnlyModule 
              ? "bg-purple-900/30 text-purple-400" 
              : "bg-slate-900 text-slate-400"
          }`}>
            <Clock size={11} className={isLoggedInOnlyModule ? "text-purple-400" : "text-yellow-400"} />
            {module.estimatedHours} hrs
          </span>

          {/* Show visibility badge */}
          {module.visibility && (
            <span className={`px-2 py-1 rounded-full text-[10px] ${
              isLoggedInOnlyModule
                ? "bg-purple-900/30 text-purple-400"
                : "bg-slate-900 text-slate-500"
            }`}>
              {module.visibility === "loggedIn" ? "🔒 Premium" : "🌐 Public"}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ==========================================================
  // Page Render
  // ==========================================================
  render() {
    // Filter segments that have at least one visible module
    const visibleSegments = roadmapData.segments.filter((seg) =>
      seg.modules.some((m) => {
        const visible = this.isModuleVisible(m);
        const matches = this.matchesSearch(m);
        return visible && matches;
      })
    );

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-12">

          {/* Search */}
          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Search topics, modules…"
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value })}
              className="
                w-full px-4 py-2 rounded-lg bg-slate-800
                border border-slate-700 text-slate-200
                focus:outline-none focus:ring-2 focus:ring-sky-500
              "
            />
          </div>

          {/* Header */}
          <div className="text-center mb-12">

            {/* Logo + Title */}
            <div className="flex items-center justify-center gap-4 mb-4">
              {roadmapData.subjectLogo?.path && (
                <img
                  src={roadmapData.subjectLogo.path}
                  alt={roadmapData.subjectLogo.alt || roadmapData.subject}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain brightness-0 invert"
                />
              )}

              <h1 className="text-4xl md:text-5xl font-extrabold text-sky-400">
                {roadmapData.trackTitle}
              </h1>
            </div>

            <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
              {roadmapData.description}
              <br />
              <span className="text-emerald-300 font-medium">
                {roadmapData.institute.name}
              </span>
            </p>
          </div>

          {/* ================= TEACHER PROFILE ================= */}
          {roadmapData.teacher && (
            <div className="max-w-4xl mx-auto mb-14 border border-slate-800 bg-slate-900/70 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">

              {/* Teacher Image */}
              <div className="shrink-0">
                <img
                  src={roadmapData.teacher.photo}
                  alt={roadmapData.teacher.name}
                  className="
                    w-28 h-28 sm:w-32 sm:h-32
                    rounded-full object-cover
                    border-4 border-sky-500/40
                    shadow-lg
                    transition-transform duration-300
                    hover:scale-105
                  "
                />
              </div>

              {/* Teacher Info */}
              <div className="text-center sm:text-left">

                <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                  {roadmapData.teacher.name}
                </h3>

                <p className="text-sky-400 text-sm font-medium mt-1">
                  {roadmapData.teacher.designation}
                </p>

                <p className="text-emerald-400 text-sm mt-1">
                  {roadmapData.teacher.organization} · {roadmapData.teacher.location}
                </p>

                <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl">
                  {roadmapData.teacher.bio}
                </p>

                {/* ===== SOCIAL ICONS ===== */}
                <div className="mt-4 flex justify-center sm:justify-start gap-4">

                  {roadmapData.teacher.social.linkedin && (
                    <a
                      href={roadmapData.teacher.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-slate-700 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/10 transition hover:scale-110"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}

                  {roadmapData.teacher.social.twitter && (
                    <a
                      href={roadmapData.teacher.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-slate-400 hover:bg-slate-500/10 transition hover:scale-110"
                    >
                      <Twitter size={18} />
                    </a>
                  )}

                  {roadmapData.teacher.social.website && (
                    <a
                      href={roadmapData.teacher.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-slate-700 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/10 transition hover:scale-110"
                    >
                      <Globe size={18} />
                    </a>
                  )}

                  {roadmapData.teacher.social.github && (
                    <a
                      href={roadmapData.teacher.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-slate-700 text-purple-400 hover:text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition hover:scale-110"
                    >
                      <Github size={18} />
                    </a>
                  )}

                  {roadmapData.teacher.social.email && (
                    <a
                      href={`mailto:${roadmapData.teacher.social.email}`}
                      className="p-2 rounded-full border border-slate-700 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400 hover:bg-yellow-500/10 transition hover:scale-110"
                    >
                      <Mail size={18} />
                    </a>
                  )}

                  {roadmapData.teacher.social.phone && (
                    <a
                      href={`tel:${roadmapData.teacher.social.phone}`}
                      aria-label="Phone"
                      className="
                        p-2 rounded-full border border-slate-700
                        text-green-400 hover:text-green-300
                        hover:border-green-400 hover:bg-green-500/10
                        transition hover:scale-110
                      "
                    >
                      <Phone size={18} />
                    </a>
                  )}

                  {roadmapData.teacher.social.whatsapp && (
                    <a
                      href={`https://wa.me/${roadmapData.teacher.social.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="
                        p-2 rounded-full border border-slate-700
                        text-green-500 hover:text-green-400
                        hover:border-green-400 hover:bg-green-500/10
                        transition hover:scale-110
                      "
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-[18px] h-[18px]"
                      >
                        <path d="M12.04 2.003c-5.514 0-9.998 4.486-9.998 9.998 0 1.762.458 3.479 1.33 4.995L2 22l5.14-1.35a9.96 9.96 0 0 0 4.9 1.29h.004c5.514 0 9.998-4.486 9.998-9.998 0-2.67-1.04-5.182-2.928-7.07A9.935 9.935 0 0 0 12.04 2.003zm5.86 14.43c-.246.69-1.45 1.322-1.994 1.404-.52.078-1.19.11-1.92-.12-.442-.14-1.01-.33-1.744-.64-3.07-1.33-5.07-4.45-5.225-4.66-.15-.21-1.26-1.68-1.26-3.2 0-1.52.8-2.27 1.08-2.58.28-.31.61-.39.82-.39.2 0 .41.002.59.01.19.01.45-.07.7.53.25.6.85 2.08.92 2.23.07.15.12.33.02.54-.1.21-.15.33-.3.51-.15.18-.32.4-.45.54-.15.15-.31.31-.13.6.18.29.8 1.32 1.72 2.14 1.18 1.05 2.17 1.38 2.46 1.53.29.15.46.13.63-.08.17-.21.73-.85.92-1.14.19-.29.38-.24.63-.15.25.09 1.6.75 1.87.89.27.14.45.21.52.33.07.12.07.69-.18 1.38z" />
                      </svg>
                    </a>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* Login Status Banner */}
          {!this.isLoggedIn() && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-amber-900/20 border border-amber-700/30 rounded-xl">
              <p className="text-amber-300 text-sm text-center">
                🔓 You're viewing public modules only. 
                <Link to="/login" className="text-amber-400 font-semibold ml-2 hover:underline">
                  Sign in to unlock premium modules
                </Link>
              </p>
            </div>
          )}

          {this.isLoggedIn() && (
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-emerald-900/20 border border-emerald-700/30 rounded-xl">
              <p className="text-emerald-300 text-sm text-center">
                ✅ You're logged in! Premium modules are now available.
              </p>
            </div>
          )}

          {/* Segments */}
          {visibleSegments.length > 0 ? (
            visibleSegments.map((seg, i) =>
              this.renderSegment(seg, i)
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">No modules found matching your search.</p>
            </div>
          )}

          <div className="text-center text-slate-600 text-xs mt-12">
            © {new Date().getFullYear()} Coder & AccoTax · {roadmapData.trackTitle}
          </div>
        </div>
      </div>
    );
  }
}