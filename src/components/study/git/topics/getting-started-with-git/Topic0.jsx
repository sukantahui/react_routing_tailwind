import React, { Component } from "react";
import {
  BookOpen,
  History,
  ShieldCheck,
  FileDiff,
  RotateCcw,
  Info,
} from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            Version Control – Concept, Purpose & Importance
          </h2>
          <p className="text-slate-300 text-sm">
            Hover over sections, rows, and diagrams to <strong>see concepts come alive</strong>.
          </p>
        </header>

        {/* ================= DEFINITION CARD ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400 hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <BookOpen size={18} /> What is Version Control?
          </h3>

          <p className="text-slate-300 text-sm mt-2">
            Version Control is a system that <strong>records every meaningful change</strong>
            made to files, allowing safe tracking, comparison, and restoration.
          </p>
        </section>

        {/* ================= WHY IT MATTERS ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <ShieldCheck size={18} /> Why It Matters (Hover Rows)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Problem</th>
                <th className="p-2 border">Version Control Solution</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Accidental deletion", "Restore previous version instantly"],
                ["Bug introduced", "Compare change history"],
                ["Multiple developers", "Parallel safe collaboration"],
              ].map(([p, s], i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-sky-300"
                >
                  <td className="p-2 border">{p}</td>
                  <td className="p-2 border">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= KEYWORDS WITH TOOLTIP ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <FileDiff size={18} /> Important Keywords (Hover for Meaning)
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["Version", "A saved state of a project"],
              ["History", "Complete record of changes"],
              ["Restore", "Go back to earlier state"],
              ["Change", "Any modification in content"],
            ].map(([term, meaning]) => (
              <div
                key={term}
                className="relative group bg-slate-900 border border-slate-700
                           rounded-lg p-4 text-center cursor-help
                           transition hover:border-sky-400"
              >
                <span className="text-slate-200 font-medium">{term}</span>
                <Info size={14} className="inline ml-1 text-slate-400" />

                {/* Tooltip */}
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                             opacity-0 group-hover:opacity-100
                             transition bg-black text-slate-200 text-xs
                             px-3 py-2 rounded shadow-lg w-48 z-10"
                >
                  {meaning}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SVG WITH HOVER ANIMATION ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <RotateCcw size={18} /> How Version Control Works (Hover Diagram)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <svg viewBox="0 0 600 120" className="w-full h-28">
              {[
                { x: 20, label: "Edit File" },
                { x: 230, label: "Save Version" },
                { x: 440, label: "History Stored" },
              ].map((step, i) => (
                <g key={i} className="group cursor-pointer">
                  <rect
                    x={step.x}
                    y="40"
                    width="140"
                    height="40"
                    rx="8"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    className="transition-all duration-300
                               group-hover:fill-[#020617]
                               group-hover:stroke-[#7dd3fc]"
                  />
                  <text
                    x={step.x + 70}
                    y="65"
                    textAnchor="middle"
                    fill="#7dd3fc"
                    fontSize="12"
                  >
                    {step.label}
                  </text>
                </g>
              ))}

              <line x1="160" y1="60" x2="230" y2="60" stroke="#38bdf8" />
              <line x1="370" y1="60" x2="440" y2="60" stroke="#38bdf8" />
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Hover each step to reinforce the workflow mentally
            </p>
          </div>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Interactive learning is not decoration.  
          Hover effects here are designed to make students <strong>pause, observe, and think</strong> —
          exactly how concepts should be absorbed.
        </section>

      </div>
    );
  }
}
