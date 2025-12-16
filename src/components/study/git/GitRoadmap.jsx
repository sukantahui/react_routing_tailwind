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
import gitLogo from "../../../assets/logos/git-logo.svg";

import roadmapData from "./git-roadmap.json";

export default class GitRoadmap extends Component {
  // ==========================================================
  // Dynamic Segment Colors
  // ==========================================================
  colorThemes = [
    {
      from: "#38bdf8", // blue
      to: "#a855f7", // purple
      title: "text-sky-300",
    },
    {
      from: "#4ade80", // green
      to: "#22d3ee", // cyan
      title: "text-emerald-300",
    },
    {
      from: "#f59e0b", // amber
      to: "#ef4444", // red
      title: "text-amber-300",
    },
    {
      from: "#6366f1", // indigo
      to: "#ec4899", // pink
      title: "text-indigo-300",
    },
  ];

  // ==========================================================
  // Search State
  // ==========================================================
  state = {
    search: "",
  };

  matchesSearch(module) {
    const searchText = this.state.search.toLowerCase();
    const inTitle = module.title.toLowerCase().includes(searchText);

    const inSummary = module.summary
      ? module.summary.toLowerCase().includes(searchText)
      : false;

    const inTopics = Array.isArray(module.topics)
      ? module.topics.some((t) => t.toLowerCase().includes(searchText))
      : false;

    return inTitle || inSummary || inTopics;
  }

  // ==========================================================
  // Render each SEGMENT (color added)
  // ==========================================================
  renderSegment(segment, index) {
    const filteredModules = segment.modules.filter((m) =>
      this.matchesSearch(m)
    );

    if (filteredModules.length === 0) return null;

    const theme = this.colorThemes[index % this.colorThemes.length];

    return (
      <section
        key={segment.segmentId}
        className="
          relative border border-slate-800 bg-slate-900/70
          rounded-3xl p-5 sm:p-6 md:p-10 mb-14 sm:mb-16
          shadow-[0_0_35px_rgba(0,0,0,0.4)] backdrop-blur-xl
          overflow-hidden
        "
      >
        {/* Decorative gradient waves */}
        <svg
          className="absolute -top-14 right-0 w-40 sm:w-52 md:w-64 opacity-15 sm:opacity-20"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`segWave-${segment.segmentId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={theme.from} />
              <stop offset="100%" stopColor={theme.to} />
            </linearGradient>
          </defs>
          <path
            d="M0 80 C 80 0, 160 160, 240 80 L 240 200 L 0 200 Z"
            fill={`url(#segWave-${segment.segmentId})`}
          />
        </svg>

        {/* Segment Heading */}
        <div className="relative z-10 space-y-2 mb-5 sm:mb-6">
          <h2
            className={`text-lg sm:text-xl md:text-3xl font-extrabold ${theme.title} flex items-center gap-2`}
          >
            <Layers size={20} />
            {segment.title}
          </h2>

          <p className="text-[13px] sm:text-sm md:text-base text-slate-400">
            {segment.summary}
          </p>

          {segment.tools?.length > 0 && (
            <p className="text-[11px] sm:text-xs text-slate-500">
              <span className="font-semibold">Tools:</span>{" "}
              {segment.tools.join(", ")}
            </p>
          )}
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {filteredModules.map((module, index) =>
            this.renderModule(module, index)
          )}
        </div>
      </section>
    );
  }

  // ==========================================================
  // Render each MODULE CARD
  // ==========================================================
  renderModule(module, index) {
    const directURL = `${window.location.origin}/${roadmapData.folder}/module/${module.slug}`;

    return (
      <div
        key={module.moduleId}
        className="
          relative border border-slate-700/60 bg-slate-800/50
          rounded-2xl p-4 sm:p-5 shadow-lg transition-all
          hover:scale-[1.01] hover:bg-slate-800/70
          hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">

            {/* Module numbering */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-200 shadow">
                {index + 1}
              </span>
              <span>{module.moduleId}</span>
              {module.slug && (
                <span className="hidden sm:inline text-slate-500">
                  · {module.slug}
                </span>
              )}
            </div>

            <h3 className="text-base md:text-lg font-semibold text-slate-100 flex items-center gap-2">
              <Code2 size={16} className="text-sky-400" />
              {module.title}
            </h3>

            <Link
              to={`/${roadmapData.folder}/module/${module.slug}`}
              className="
                inline-flex items-center gap-1 mt-3 px-3 py-2 rounded-full
                border border-sky-500 text-sky-300 hover:bg-sky-500/10
                text-xs sm:text-sm transition
              "
            >
              Explore Module →
            </Link>

            <p className="mt-2 text-[11px] text-slate-400 break-all">
              Direct Link:{" "}
              <a
                href={directURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline"
              >
                {directURL}
              </a>
            </p>

            {module.summary && (
              <p className="mt-2 text-xs md:text-sm text-slate-300">
                {module.summary}
              </p>
            )}
          </div>

          {module.badge && (
            <div
              className="
                text-[10px] px-2 py-1 rounded-full border border-purple-500
                text-purple-300 bg-purple-700/20 shadow
              "
            >
              {module.badge}
            </div>
          )}
        </div>

        {/* Meta info */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">

          <span className="px-2 py-[3px] rounded-full bg-slate-900 flex items-center gap-1">
            <ShieldCheck size={11} className="text-emerald-400" />
            {module.level}
          </span>

          <span className="px-2 py-[3px] rounded-full bg-slate-900 flex items-center gap-1">
            <Sparkles size={11} className="text-purple-400" />
            {module.difficulty}
          </span>

          <span className="px-2 py-[3px] rounded-full bg-slate-900 flex items-center gap-1">
            <Clock size={11} className="text-yellow-400" />
            {module.estimatedHours} hrs
          </span>

        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE LAYOUT
  // ==========================================================
  render() {
    const search = this.state.search;

    const visibleSegments = roadmapData.segments.filter((seg) =>
      seg.modules.some((m) => this.matchesSearch(m))
    );

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">

        {/* Background SVG Effects */}
        <div className="absolute inset-0 -z-10 opacity-[0.2]">
          <svg className="absolute -top-40 -left-44 w-[400px] opacity-60" aria-hidden="true">
            <defs>
              <radialGradient id="blobA">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="200" fill="url(#blobA)" />
          </svg>

          <svg className="absolute bottom-[-200px] right-[-160px] w-[400px] opacity-60" aria-hidden="true">
            <defs>
              <radialGradient id="blobB">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="200" fill="url(#blobB)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">

          

          {/* Page Header */}
          <div className="text-center mb-12">

            {/* Logo + Title */}
            <div className="flex items-center justify-center gap-4 text-center">
              <img
                src={gitLogo}
                alt={roadmapData.subjectLogo.alt}
                className="h-12 w-12 sm:h-14 sm:w-14 drop-shadow-md"
              />

              <h1 className="text-4xl md:text-5xl font-extrabold text-sky-400 drop-shadow-lg">
                {roadmapData.trackTitle}
              </h1>
            </div>

            {/* Description */}
            <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
              A structured journey from{" "}
              <span className="text-sky-300">absolute beginner</span>
              {" "}to{" "}
              <span className="text-purple-300">Ultra Expert</span>, designed by
              <span className="text-emerald-300 font-medium"> Coder & AccoTax</span>.
            </p>

          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Search topics, modules…"
              value={search}
              onChange={(e) => this.setState({ search: e.target.value })}
              className="
                w-full px-4 py-2 pr-10 rounded-lg bg-slate-800 border border-slate-700 
                text-slate-200 placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-sky-500
              "
            />

            {search.length > 0 && (
              <button
                onClick={() => this.setState({ search: "" })}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-slate-400 hover:text-slate-200
                  text-lg z-20
                "
              >
                ✕
              </button>
            )}
          </div>


          {/* Segments with colors */}
          {visibleSegments.map((segment, i) => this.renderSegment(segment, i))}

          <div className="text-center text-slate-600 text-xs mt-10">
            © {new Date().getFullYear()} Coder & AccoTax · {roadmapData.trackTitle}
          </div>

        </div>
      </div>
    );
  }
}
