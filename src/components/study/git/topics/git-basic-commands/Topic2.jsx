import React, { Component } from "react";
import {
  ListChecks,
  History,
  Terminal,
  Eye,
  ArrowRight,
} from "lucide-react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            git status & git log
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            These two commands answer the most important Git questions:
            <strong> “What is happening now?”</strong> and
            <strong> “What happened before?”</strong>
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Eye size={18} /> Observation Commands
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Unlike <code>git add</code> or <code>git commit</code>,
            these commands <strong>do not change anything</strong>.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            They only help you <strong>understand the state of your repository</strong>.
          </p>
        </section>

        {/* ================= git status ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-emerald-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <ListChecks size={18} /> git status (Present State)
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            The <strong>git status</strong> command tells you:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Which files are modified</li>
            <li>Which files are staged</li>
            <li>Which files are untracked</li>
            <li>Which branch you are on</li>
          </ul>

          <div className="mt-3 bg-black rounded-lg p-4 text-sm text-green-400">
            git status
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Professionals run <code>git status</code> frequently — sometimes after every step.
          </p>
        </section>

        {/* ================= git log ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-purple-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-purple-300 font-medium">
            <History size={18} /> git log (Historical Record)
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            The <strong>git log</strong> command shows the <strong>commit history</strong>
            of the repository.
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Commit hash</li>
            <li>Author information</li>
            <li>Date and time</li>
            <li>Commit message</li>
          </ul>

          <div className="mt-3 bg-black rounded-lg p-4 text-sm text-green-400">
            git log
          </div>

          <p className="text-slate-400 text-sm mt-2">
            This is your project’s <strong>audit trail</strong>.
          </p>
        </section>

        {/* ================= COMPARISON ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Terminal size={18} /> status vs log (Hover Rows)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Aspect</th>
                <th className="p-2 border">git status</th>
                <th className="p-2 border">git log</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Time focus", "Current state", "Past history"],
                ["Shows files?", "Yes", "No"],
                ["Shows commits?", "No", "Yes"],
                ["Used when", "Before next step", "To review work"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-sky-300"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= ANIMATED WORKFLOW (SAME STYLE) ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <ArrowRight size={18} /> Where status & log Fit (Animated)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 160" className="w-full h-36">

              {[
                { x: 20, label: "Working Directory", color: "#38bdf8" },
                { x: 280, label: "Staging Area", color: "#34d399" },
                { x: 540, label: "Repository", color: "#c084fc" },
              ].map((box, i) => (
                <g key={i}>
                  <rect
                    x={box.x}
                    y="50"
                    width="200"
                    height="60"
                    rx="10"
                    fill="#0f172a"
                    stroke={box.color}
                  />
                  <text
                    x={box.x + 100}
                    y="80"
                    textAnchor="middle"
                    fill={box.color}
                    fontSize="12"
                  >
                    {box.label}
                  </text>
                </g>
              ))}

              {/* Animated inspection lines */}
              <line
                x1="120"
                y1="40"
                x2="120"
                y2="110"
                stroke="#38bdf8"
                strokeDasharray="4 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="8"
                  to="0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>

              <line
                x1="640"
                y1="40"
                x2="640"
                y2="110"
                stroke="#c084fc"
                strokeDasharray="4 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="8"
                  to="0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>

              <text x="90" y="30" fill="#38bdf8" fontSize="10">
                git status
              </text>
              <text x="610" y="30" fill="#c084fc" fontSize="10">
                git log
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animated markers show which area each command inspects
            </p>
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Common Beginner Mistake:</strong><br />
          Students often run <code>git log</code> expecting to see uncommitted changes.
          Remember: <strong>only committed work appears in history</strong>.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          A professional developer checks <code>git status</code> before every
          important Git command and checks <code>git log</code> to understand
          the story of the project.
        </section>

      </div>
    );
  }
}
