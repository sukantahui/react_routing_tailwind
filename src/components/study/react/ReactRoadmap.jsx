// src/components/study/ReactRoadmap.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Code2,
  ShieldCheck,
  Sparkles,
  Clock,
  Linkedin,
  Twitter,
  Globe,
  Github,
  Mail,
} from "lucide-react";

import roadmapData from "./react19-roadmap.json";
import teacherPhoto from "../../../assets/teachers/teacher1.jpg";

const ReactRoadmap = () => {
  // ==========================================================
  // State
  // ==========================================================
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [lastVisited, setLastVisited] = useState("");

  // ==========================================================
  // Dynamic Segment Colors
  // ==========================================================
  const colorThemes = [
    { from: "#38bdf8", to: "#a855f7", title: "text-sky-300" },
    { from: "#4ade80", to: "#22d3ee", title: "text-emerald-300" },
    { from: "#f59e0b", to: "#ef4444", title: "text-amber-300" },
    { from: "#6366f1", to: "#ec4899", title: "text-indigo-300" },
  ];

  // ==========================================================
  // LocalStorage helpers (Completion Tracking)
  // ==========================================================
  const STORAGE_KEY = "react-module-completed";
  const LAST_VISITED_KEY = "react-last-visited-module";

  const isCompleted = (moduleId) => {
    return localStorage.getItem(`${STORAGE_KEY}::${moduleId}`) === "true";
  };

  const toggleCompleted = (moduleId) => {
    const key = `${STORAGE_KEY}::${moduleId}`;
    const current = isCompleted(moduleId);
    localStorage.setItem(key, (!current).toString());
    // Force re-render
    setSearch(prev => prev + " ");
    setTimeout(() => setSearch(prev => prev.trim()), 10);
  };

  // ==========================================================
  // Search logic
  // ==========================================================
  const matchesSearch = (module) => {
    const searchText = search.toLowerCase();
    if (levelFilter && module.level !== levelFilter) return false;
    
    const searchInTopics = Array.isArray(module.topics) &&
      module.topics.some((t) => t.toLowerCase().includes(searchText));
    
    return (
      module.title.toLowerCase().includes(searchText) ||
      (module.summary && module.summary.toLowerCase().includes(searchText)) ||
      searchInTopics
    );
  };

  // ==========================================================
  // Initialize last visited module
  // ==========================================================
  useEffect(() => {
    const lastModule = localStorage.getItem(LAST_VISITED_KEY);
    if (lastModule) {
      setLastVisited(lastModule);
    }
  }, []);

  const saveLastVisited = (directURL) => {
    localStorage.setItem(LAST_VISITED_KEY, directURL);
    setLastVisited(directURL);
  };

  // ==========================================================
  // Render Module Card Component
  // ==========================================================
  const ModuleCard = ({ module, index, segmentIndex }) => {
    const completed = isCompleted(module.moduleId);
    const directURL = `${window.location.origin}/${roadmapData.folder}/module/${module.slug}`;
    const theme = colorThemes[segmentIndex % colorThemes.length];

    return (
      <div
        key={module.moduleId}
        className={`
          relative rounded-2xl p-4 sm:p-5 transition-all duration-300
          ${completed
            ? "border border-emerald-500/60 bg-emerald-900/10"
            : "border border-slate-700/60 bg-slate-800/50"
          }
          hover:scale-[1.01]
          hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
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

            <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
              <Code2 size={16} className="text-sky-400" />
              {module.title}
            </h3>

            {/* Topic Preview */}
            {module.topics && (
              <p className="mt-1 text-[11px] text-slate-400 italic line-clamp-2">
                {module.topics.slice(0, 3).join(" • ")}...
              </p>
            )}

            {completed && (
              <span className="inline-block mt-2 text-[10px] px-2 py-1 rounded-full border border-emerald-500 text-emerald-300 bg-emerald-700/20">
                ✓ Completed
              </span>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={`/${roadmapData.folder}/module/${module.slug}`}
                onClick={() => saveLastVisited(directURL)}
                className="
                  px-3 py-2 rounded-full border border-sky-500
                  text-sky-300 text-xs hover:bg-sky-500/10 transition-colors
                "
              >
                Explore Module →
              </Link>

              <button
                onClick={() => toggleCompleted(module.moduleId)}
                className={`
                  px-3 py-2 rounded-full text-xs border transition-colors
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
                className="text-sky-400 hover:underline"
              >
                {directURL}
              </a>
            </p>

            <button
              onClick={() => navigator.clipboard.writeText(directURL)}
              className="text-[10px] text-emerald-400 hover:underline mr-3"
            >
              Copy link
            </button>

            {module.summary && (
              <p className="mt-2 text-sm text-slate-300">
                {module.summary}
              </p>
            )}
          </div>
        </div>

        {/* Meta Information */}
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-400">
          <span className="px-2 py-1 rounded-full bg-slate-900 flex items-center gap-1">
            <ShieldCheck size={11} className="text-emerald-400" />
            {module.level}
          </span>

          <span className="px-2 py-1 rounded-full bg-slate-900 flex items-center gap-1">
            <Sparkles size={11} className="text-purple-400" />
            {module.difficulty || "Medium"}
          </span>

          <span className="px-2 py-1 rounded-full bg-slate-900 flex items-center gap-1">
            <Clock size={11} className="text-yellow-400" />
            {module.estimatedHours || 4} hrs
          </span>
        </div>
      </div>
    );
  };

  // ==========================================================
  // Render Segment Component
  // ==========================================================
  const Segment = ({ segment, index }) => {
    const filteredModules = segment.modules.filter(matchesSearch);
    
    if (filteredModules.length === 0) return null;

    const theme = colorThemes[index % colorThemes.length];
    const completedCount = segment.modules.filter(m => isCompleted(m.moduleId)).length;
    const percent = Math.round((completedCount / segment.modules.length) * 100);

    return (
      <section className="relative border border-slate-800 bg-slate-900/70 rounded-3xl p-5 sm:p-6 md:p-10 mb-14 shadow-[0_0_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
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

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Progress: {completedCount}/{segment.modules.length} modules ({percent}%)
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredModules.map((module, i) => (
            <ModuleCard 
              key={module.moduleId} 
              module={module} 
              index={i} 
              segmentIndex={index}
            />
          ))}
        </div>
      </section>
    );
  };

  // ==========================================================
  // Main Component Render
  // ==========================================================
  const visibleSegments = roadmapData.segments.filter((seg) =>
    seg.modules.some(matchesSearch)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
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

          {lastVisited && (
            <a
              href={lastVisited}
              className="inline-block mt-4 text-sm text-sky-400 hover:underline"
            >
              ▶ Resume where you left off
            </a>
          )}
        </div>

        {/* Teacher Profile */}
        <div className="max-w-4xl mx-auto mb-14 border border-slate-800 bg-slate-900/70 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          {/* Teacher Image */}
          <div className="shrink-0">
            <img
              src={teacherPhoto}
              alt="Sukanta Hui"
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
              Sukanta Hui
            </h3>

            <p className="text-sky-400 text-sm font-medium mt-1">
              Educator · Software Trainer · Mentor
            </p>

            <p className="text-emerald-400 text-sm mt-1">
              Founder, Coder & AccoTax · Barrackpore
            </p>

            <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-xl">
              This roadmap is designed to take you from <strong>clear fundamentals</strong> to
              <strong>professional-level confidence</strong>.
              Every module focuses on <em>why things work</em>, not just how to write code —
              so you can think like a real programmer.
            </p>

            {/* Social Icons */}
            <div className="mt-4 flex justify-center sm:justify-start gap-4">
              <a
                href="https://www.linkedin.com/in/sukantahui/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-700 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/10 transition-all hover:scale-110"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="https://twitter.com/sukantahui"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-slate-400 hover:bg-slate-500/10 transition-all hover:scale-110"
              >
                <Twitter size={18} />
              </a>

              <a
                href="https://www.codernaccotax.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-700 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all hover:scale-110"
              >
                <Globe size={18} />
              </a>

              <a
                href="https://github.com/sukantahui"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-slate-700 text-purple-400 hover:text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition-all hover:scale-110"
              >
                <Github size={18} />
              </a>

              <a
                href="mailto:contact@codernaccotax.co.in"
                className="p-2 rounded-full border border-slate-700 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400 hover:bg-yellow-500/10 transition-all hover:scale-110"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          {/* Level Filter */}
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="
              w-52 px-3 py-2 text-sm
              rounded-md bg-slate-900 border border-slate-700
              text-slate-300 focus:ring-1 focus:ring-sky-500
              focus:outline-none
            "
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          {/* Topic Search */}
          <input
            type="text"
            placeholder="Search topics, modules…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-72 px-3 py-2 text-sm rounded-md
              bg-slate-900 border border-slate-700 text-slate-300
              focus:outline-none focus:ring-1 focus:ring-sky-500
            "
          />
        </div>

        {/* Segments */}
        {visibleSegments.map((segment, index) => (
          <Segment key={segment.segmentId} segment={segment} index={index} />
        ))}

        <div className="text-center text-slate-600 text-xs mt-12">
          © {new Date().getFullYear()} Coder & AccoTax · {roadmapData.trackTitle}
        </div>
      </div>
    </div>
  );
};

export default ReactRoadmap;