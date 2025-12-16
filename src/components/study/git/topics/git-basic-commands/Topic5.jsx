import React, { Component } from "react";
import {
  FileDiff,
  Eye,
  Layers,
  Database,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            git diff
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>git diff</strong> is your safety mirror.  
            It shows exactly <strong>what has changed</strong> before you stage or commit.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Eye size={18} /> Why git diff Exists
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Git never assumes your changes are correct.  
            <strong>git diff forces you to review</strong> before taking action.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Professionals rarely stage or commit without checking differences first.
          </p>
        </section>

        {/* ================= WHAT IT SHOWS ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <FileDiff size={18} /> What git diff Shows
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Symbol</th>
                <th className="p-2 border">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["+ line", "Added content"],
                ["- line", "Removed content"],
                ["No prefix", "Unchanged context"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-sky-300"
                >
                  <td className="p-2 border font-mono text-xs">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= BASIC USAGE ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-emerald-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <ArrowRight size={18} /> Basic Usage
          </h3>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400">
            git diff
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Shows differences between:
            <strong> Working Directory</strong> and <strong>Staging Area</strong>
          </p>
        </section>

        {/* ================= STAGED DIFF ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-purple-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-purple-300 font-medium">
            <Layers size={18} /> Viewing Staged Changes
          </h3>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400">
            git diff --staged
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Shows differences between:
            <strong> Staging Area</strong> and <strong> Repository</strong>
          </p>
        </section>

        {/* ================= WORKFLOW DIAGRAM ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Database size={18} /> Where git diff Fits (Animated)
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

              {/* Animated inspection arrows */}
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
                  dur="1.2s"
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
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>

              <text x="240" y="65" fill="#38bdf8" fontSize="10">
                git diff
              </text>
              <text x="500" y="65" fill="#34d399" fontSize="10">
                git diff --staged
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animated lines show where git diff inspects changes
            </p>
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Common Beginner Mistakes:</strong><br />
          • Committing without checking differences  
          • Confusing staged and unstaged diffs  
          • Ignoring small changes that cause big bugs
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          <code>git diff</code> is the pause button in Git.  
          Developers who skip this step are the ones who debug production issues later.
        </section>

      </div>
    );
  }
}
