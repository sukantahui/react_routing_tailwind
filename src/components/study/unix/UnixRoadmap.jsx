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

import roadmapData from "./unix-basic-to-ultra-expert-roadmap.json";
import teacherPhoto from "../../../assets/teachers/teacher1.jpg";
import {
  Linkedin,
  Twitter,
  Globe,
  Github,
  Mail,
} from "lucide-react";


export default class UnixRoadmap extends Component {
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
    levelFilter: ""
  };

  // ==========================================================
  // LocalStorage helpers (Completion Tracking)
  // ==========================================================
  STORAGE_KEY = "unix-module-completed";
  isCompleted(moduleId) {
    return localStorage.getItem(`${this.STORAGE_KEY}::${moduleId}`) === "true";
  }

  toggleCompleted(moduleId) {
    const key = `${this.STORAGE_KEY}::${moduleId}`;
    const current = this.isCompleted(moduleId);
    localStorage.setItem(key, (!current).toString());
    this.setState({});
  }

  // ==========================================================
  // Search logic
  // ==========================================================
  matchesSearch(module) {
    const searchText = this.state.search.toLowerCase();
    if (this.state.levelFilter && module.level !== this.state.levelFilter)
      return false;
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
    const filteredModules = segment.modules.filter((m) =>
      this.matchesSearch(m)
    );

    if (filteredModules.length === 0) return null;

    const theme = this.colorThemes[index % this.colorThemes.length];
    const completedCount = segment.modules.filter(m => this.isCompleted(m.moduleId)).length;
    const percent = Math.round((completedCount / segment.modules.length) * 100);

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



        <div className="mb-4">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-sky-500 to-emerald-400 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Progress: {completedCount}/{segment.modules.length} modules ({percent}%)
          </p>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredModules.map((module, i) =>
            this.renderModule(module, i)
          )}
        </div>
      </section>
    );
  }

  // ==========================================================
  // Render Module Card
  // ==========================================================
  renderModule(module, index) {
    const completed = this.isCompleted(module.moduleId);
    const directURL = `${window.location.origin}/${roadmapData.folder}/module/${module.slug}`;

    return (
      <div
        key={module.moduleId}
        className={`
          relative rounded-2xl p-4 sm:p-5 transition-all
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

            {/* ===== Topic Preview ===== */}
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
                onClick={() => localStorage.setItem("unix-last-visited-module", directURL)}
                className="
    px-3 py-2 rounded-full border border-sky-500
    text-sky-300 text-xs hover:bg-sky-500/10
  "
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
                className="text-sky-400 hover:underline"
              >
                {directURL}
              </a>
            </p>

            <button
              onClick={() => navigator.clipboard.writeText(directURL)}
              className="text-[10px] text-emerald-400 hover:underline"
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

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-400">
          <span className="px-2 py-1 rounded-full bg-slate-900 flex items-center gap-1">
            <ShieldCheck size={11} className="text-emerald-400" />
            {module.level}
          </span>

          <span className="px-2 py-1 rounded-full bg-slate-900 flex items-center gap-1">
            <Sparkles size={11} className="text-purple-400" />
            {module.difficulty}
          </span>

          <span className="px-2 py-1 rounded-full bg-slate-900 flex items-center gap-1">
            <Clock size={11} className="text-yellow-400" />
            {module.estimatedHours} hrs
          </span>
        </div>
      </div>
    );
  }

  // ==========================================================
  // Page Render
  // ==========================================================
  render() {
    const visibleSegments = roadmapData.segments.filter((seg) =>
      seg.modules.some((m) => this.matchesSearch(m))
    );
    const lastVisited = localStorage.getItem("unix-last-visited-module");


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



          {/* ================= TEACHER PROFILE ================= */}
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

              {/* ===== SOCIAL ICONS (HERE 👇) ===== */}
              <div className="mt-4 flex justify-center sm:justify-start gap-4">

                <a
                  href="https://www.linkedin.com/in/sukantahui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-slate-700 text-sky-400 hover:text-sky-300 hover:border-sky-400 hover:bg-sky-500/10 transition hover:scale-110"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href="https://twitter.com/sukantahui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-slate-400 hover:bg-slate-500/10 transition hover:scale-110"
                >
                  <Twitter size={18} />
                </a>

                <a
                  href="https://www.codernaccotax.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-slate-700 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/10 transition hover:scale-110"
                >
                  <Globe size={18} />
                </a>

                <a
                  href="https://github.com/sukantahui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-slate-700 text-purple-400 hover:text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition hover:scale-110"
                >
                  <Github size={18} />
                </a>

                <a
                  href="mailto:contact@codernaccotax.co.in"
                  className="p-2 rounded-full border border-slate-700 text-yellow-400 hover:text-yellow-300 hover:border-yellow-400 hover:bg-yellow-500/10 transition hover:scale-110"
                >
                  <Mail size={18} />
                </a>

              </div>
            </div>
          </div>

           <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">

            {/* Level Filter */}
            <select
              onChange={(e) => this.setState({ levelFilter: e.target.value })}
              className="
                w-52 px-2 py-1 text-sm
                rounded-md bg-slate-900 border border-slate-700
                text-slate-300 focus:ring-1 focus:ring-sky-500
              "
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Ultra Expert">Ultra Expert</option>
            </select>

            {/* Topic Search */}
            <input
              type="text"
              placeholder="Search topics, modules…"
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value })}
              className="
              w-72 px-3 py-1 text-sm rounded-md
              bg-slate-900 border border-slate-700 text-slate-300
              focus:outline-none focus:ring-1 focus:ring-sky-500
            "
            />
          </div>



          {/* Segments */}
          {visibleSegments.map((seg, i) =>
            this.renderSegment(seg, i)
          )}

          <div className="text-center text-slate-600 text-xs mt-12">
            © {new Date().getFullYear()} Coder & AccoTax · {roadmapData.trackTitle}
          </div>
        </div>
      </div>
    );
  }
}
