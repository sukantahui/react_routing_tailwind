// src/components/study/JavaScriptRoadmap.jsx

import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  Code2,
  FolderKanban,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import roadmapData from "./javascript-roadmap-enhanced.json";

export default class JavaScriptRoadmap extends Component {
  // ==========================================================
  // Render each SEGMENT
  // ==========================================================
  renderSegment(segment) {
    return (
      <section
        key={segment.segmentId}
        className="
          relative border border-slate-800 bg-slate-900/70
          rounded-3xl p-6 md:p-10 mb-16 shadow-[0_0_35px_rgba(0,0,0,0.4)]
          backdrop-blur-xl overflow-hidden
        "
      >

        {/* Decorative gradient waves */}
        <svg className="absolute -top-10 right-0 w-64 opacity-20">
          <defs>
            <linearGradient id="segWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M0 80 C 80 0, 160 160, 240 80 L 240 200 L 0 200 Z"
            fill="url(#segWave)"
          />
        </svg>

        {/* Segment Heading */}
        <div className="relative z-10 space-y-2 mb-6">
          <h2 className="text-xl md:text-3xl font-extrabold text-sky-300 flex items-center gap-3">
            <Layers size={22} className="text-sky-400" />
            {segment.title}
          </h2>

          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            {segment.summary}
          </p>

          {/* Optional Tools */}
          {segment.tools?.length > 0 && (
            <p className="text-xs text-slate-500">
              <span className="text-sky-400 font-semibold">Tools:</span>{" "}
              {segment.tools.join(", ")}
            </p>
          )}
        </div>

        {/* MODULE LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segment.modules.map((module, index) =>
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
    return (
      <div
        key={module.moduleId}
        className="
          relative border border-slate-700/60 bg-slate-800/50
          rounded-2xl p-5 md:p-6 shadow-lg transition-all
          hover:scale-[1.02] hover:bg-slate-800/70
          hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Module number */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-200 shadow">
                {index + 1}
              </span>
              <span>{module.moduleId}</span>
              {module.slug && (
                <span className="hidden md:inline text-slate-500">
                  · {module.slug}
                </span>
              )}
            </div>

            {/* Module title */}
            <h3 className="text-base md:text-lg font-semibold text-slate-100 flex items-center gap-2">
              <Code2 size={16} className="text-sky-400" />
              {module.title}
            </h3>

            {/* Explore button */}
            <Link
              to={`/${roadmapData.folder}/module/${module.slug}`}
              className="
                inline-flex items-center gap-1 mt-3 px-3 py-1.5
                rounded-full border border-sky-500 text-sky-300
                hover:bg-sky-500/10 transition text-[11px]
              "
            >
              Explore Module →
            </Link>

            {/* Summary */}
            {module.summary && (
              <p className="mt-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                {module.summary}
              </p>
            )}
          </div>

          {/* Badge */}
          {module.badge && (
            <div
              className="
                text-[10px] px-3 py-1 rounded-full border border-purple-500
                text-purple-300 bg-purple-700/20 shadow
              "
            >
              {module.badge}
            </div>
          )}
        </div>

        {/* Meta info */}
        <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-400">
          <span className="px-2 py-[3px] rounded-full bg-slate-900 flex items-center gap-1">
            <ShieldCheck size={12} className="text-emerald-400" />
            {module.level}
          </span>

          <span className="px-2 py-[3px] rounded-full bg-slate-900 flex items-center gap-1">
            <Sparkles size={12} className="text-purple-400" />
            {module.difficulty}
          </span>

          <span className="px-2 py-[3px] rounded-full bg-slate-900 flex items-center gap-1">
            <Clock size={12} className="text-yellow-400" />
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
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">

        {/* Background SVG Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-[0.4]">
          {/* Blue blob */}
          <svg className="absolute -top-32 -left-40 w-[500px]">
            <defs>
              <radialGradient id="blobA" cx="0" cy="0" r="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="250" cy="250" r="250" fill="url(#blobA)" />
          </svg>

          {/* Purple blob */}
          <svg className="absolute bottom-[-200px] right-[-150px] w-[500px]">
            <defs>
              <radialGradient id="blobB" cx="0" cy="0" r="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="250" cy="250" r="250" fill="url(#blobB)" />
          </svg>

          {/* Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
            <defs>
              <pattern id="gridRoadmap" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" stroke="#1e293b" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridRoadmap)" />
          </svg>
        </div>

        {/* ----------- Main Container ----------- */}
        <div className="max-w-6xl mx-auto px-4 py-14 relative z-10">

          {/* Header */}
          <div className="mb-14 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-sky-400 drop-shadow-lg flex justify-center gap-3">
              <FolderKanban size={36} className="text-sky-500" />
              {roadmapData.trackTitle}
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
              A structured journey from <span className="text-sky-300">absolute beginner</span>  
              to <span className="text-purple-300">Ultra Expert</span>, designed by  
              <span className="text-emerald-300 font-medium"> Coder & AccoTax</span>.
            </p>
          </div>

          {/* Segments */}
          {roadmapData.segments.map((segment) => this.renderSegment(segment))}

          {/* Footer */}
          <div className="text-center text-slate-600 text-xs mt-12">
            © {new Date().getFullYear()} Coder & AccoTax · {roadmapData.trackTitle}
          </div>

        </div>
      </div>
    );
  }
}
