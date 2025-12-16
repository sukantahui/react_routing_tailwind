import React, { Component } from "react";
import {
  Edit3,
  Layers,
  Database,
  ArrowRight,
  Workflow,
} from "lucide-react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            Working Directory, Staging Area & Repository
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            This topic explains the <strong>core internal workflow</strong> of Git.
            Every Git command operates on one of these three areas.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Workflow size={18} /> The Core Git Model
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Git does <strong>not</strong> directly save every file change.
            Instead, it follows a controlled process:
          </p>

          <p className="text-slate-400 text-sm mt-2">
            <strong>Edit → Stage → Commit</strong>
          </p>
        </section>

        {/* ================= THREE AREAS ================= */}
        <section className="grid md:grid-cols-3 gap-6">

          {/* Working Directory */}
          <div
            className="group bg-slate-900 border border-slate-700 rounded-lg p-5
                       transition-all duration-300 hover:border-sky-400
                       hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-sky-300 font-medium">
              <Edit3 size={18} /> Working Directory
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              The Working Directory is where you <strong>edit files normally</strong>.
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
              <li>Create files</li>
              <li>Edit code</li>
              <li>Delete files</li>
            </ul>

            <p className="text-xs text-slate-500 mt-3">
              Changes here are <strong>not yet tracked</strong>.
            </p>
          </div>

          {/* Staging Area */}
          <div
            className="group bg-slate-900 border border-slate-700 rounded-lg p-5
                       transition-all duration-300 hover:border-emerald-400
                       hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
              <Layers size={18} /> Staging Area
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              The Staging Area is a <strong>preparation zone</strong>.
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
              <li>Select changes intentionally</li>
              <li>Review before committing</li>
              <li>Create clean commits</li>
            </ul>

            <p className="text-xs text-slate-500 mt-3">
              Filled using <code className="text-emerald-300">git add</code>
            </p>
          </div>

          {/* Repository */}
          <div
            className="group bg-slate-900 border border-slate-700 rounded-lg p-5
                       transition-all duration-300 hover:border-purple-400
                       hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-purple-300 font-medium">
              <Database size={18} /> Repository
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              The Repository is where Git <strong>permanently stores history</strong>.
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
              <li>Commits are saved</li>
              <li>History is immutable</li>
              <li>Branches are maintained</li>
            </ul>

            <p className="text-xs text-slate-500 mt-3">
              Created using <code className="text-purple-300">git commit</code>
            </p>
          </div>
        </section>

        {/* ================= ANIMATED SVG WORKFLOW ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <ArrowRight size={18} /> Visual Workflow (Animated)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 160" className="w-full h-36">

              {/* Boxes */}
              {[
                { x: 20, label: "Working Directory", color: "#38bdf8" },
                { x: 280, label: "Staging Area", color: "#34d399" },
                { x: 540, label: "Repository", color: "#c084fc" },
              ].map((box, i) => (
                <g key={i} className="group">
                  <rect
                    x={box.x}
                    y="50"
                    width="200"
                    height="60"
                    rx="10"
                    fill="#0f172a"
                    stroke={box.color}
                    className="transition-all duration-300
                               group-hover:stroke-width-[3]"
                  />
                  <text
                    x={box.x + 100}
                    y="85"
                    textAnchor="middle"
                    fill={box.color}
                    fontSize="12"
                  >
                    {box.label}
                  </text>
                </g>
              ))}

              {/* Animated arrows */}
              <line
                x1="220"
                y1="80"
                x2="280"
                y2="80"
                stroke="#38bdf8"
                strokeDasharray="6 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="12"
                  to="0"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>

              <line
                x1="480"
                y1="80"
                x2="540"
                y2="80"
                stroke="#34d399"
                strokeDasharray="6 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="12"
                  to="0"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Labels */}
              <text x="250" y="65" fill="#38bdf8" fontSize="10">
                git add
              </text>
              <text x="500" y="65" fill="#34d399" fontSize="10">
                git commit
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Continuous arrow motion shows how changes flow through Git
            </p>
          </div>
        </section>

        {/* ================= COMMON CONFUSION ================= */}
        <section
          className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300"
        >
          <strong>Common Student Confusion:</strong><br />
          Editing a file does NOT mean it is committed.  
          Staging is a deliberate step — Git forces you to think before saving history.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300"
        >
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          If a student understands only one thing in Git, it should be this model.  
          Everything — status, add, commit, diff — is built on these three areas.
        </section>

      </div>
    );
  }
}
