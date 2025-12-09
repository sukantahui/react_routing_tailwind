import React, { Component } from "react";
import { Link } from "react-router-dom";
import roadmapData from "./javascript-roadmap-enhanced.json";

export default class JavaScriptRoadmap extends Component {
  renderSegment(segment) {
    return (
      <div
        key={segment.segmentId}
        className="border border-slate-800 bg-slate-900/60 rounded-3xl p-6 md:p-8 mb-10 shadow-xl"
      >
        {/* Segment Heading */}
        <h2 className="text-xl md:text-2xl font-bold text-sky-300 mb-1">
          {segment.title}
        </h2>
        <p className="text-sm md:text-base text-slate-400 mb-4">
          {segment.summary}
        </p>

        {/* Tools (Optional) */}
        {segment.tools && (
          <p className="text-xs text-slate-500 mb-4">
            Tools: {segment.tools.join(", ")}
          </p>
        )}

        {/* Modules */}
        <div className="space-y-6">
          {segment.modules.map((module, index) =>
            this.renderModule(module, index)
          )}
        </div>
      </div>
    );
  }

  renderModule(module, index) {
    return (
      <div
        key={module.moduleId}
        className="border border-slate-700 bg-slate-800/40 rounded-2xl p-5 md:p-6 hover:bg-slate-800/60 transition"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-100">
                {index + 1}
              </span>
              <span>{module.moduleId}</span>
              {module.slug && (
                <span className="hidden md:inline text-slate-500">
                  · {module.slug}
                </span>
              )}
            </div>

            <h3 className="text-sm md:text-base font-semibold text-slate-50">
              {module.title}
            </h3>

            {/* Explore Button */}
            <div className="mt-2">
              <Link
                to={`/javascript/module/${module.slug}`}
                className="inline-flex items-center rounded-full border border-sky-500 text-sky-300 hover:bg-sky-500/10 transition px-3 py-1 text-[11px] md:text-xs"
              >
                Explore Module →
              </Link>
            </div>

            {module.summary && (
              <p className="mt-2 text-xs md:text-sm text-slate-300 max-w-xl">
                {module.summary}
              </p>
            )}
          </div>

          {/* Badge */}
          {module.badge && (
            <div className="text-[10px] px-2 py-1 rounded-full border border-purple-500 text-purple-300 bg-purple-500/10">
              {module.badge}
            </div>
          )}
        </div>

        {/* Time + Level */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
          <span className="px-2 py-[2px] rounded-full bg-slate-800">
            {module.level}
          </span>
          <span className="px-2 py-[2px] rounded-full bg-slate-800">
            {module.difficulty}
          </span>
          <span className="px-2 py-[2px] rounded-full bg-slate-800">
            {module.estimatedHours} hrs
          </span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Page Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-sky-400">
              JavaScript Roadmap  
            </h1>
            <p className="text-slate-400 mt-2">
              A complete journey from Beginner → Ultra Expert, designed for
              Coder & AccoTax students.
            </p>
          </div>

          {/* Segments */}
          {roadmapData.segments.map((segment) => this.renderSegment(segment))}

          {/* Footer */}
          <div className="text-center text-slate-600 text-xs mt-12">
            © {new Date().getFullYear()} Coder & AccoTax · JavaScript Track
          </div>
        </div>
      </div>
    );
  }
}
