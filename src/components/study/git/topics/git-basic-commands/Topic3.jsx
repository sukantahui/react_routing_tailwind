import React, { Component } from "react";
import {
  PlusSquare,
  Save,
  Layers,
  Database,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            git add & git commit
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            These are <strong>action commands</strong>.  
            They do not observe Git — they <strong>change Git’s state</strong>.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <ArrowRight size={18} /> From Work to History
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Git never saves your work automatically.  
            You must <strong>explicitly tell Git</strong> what to save and when.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            This happens in two deliberate steps:
            <strong> stage → commit</strong>
          </p>
        </section>

        {/* ================= git add ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-emerald-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <PlusSquare size={18} /> git add (Staging Changes)
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            The <strong>git add</strong> command moves changes from the
            <strong> Working Directory</strong> to the <strong>Staging Area</strong>.
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
            <li>Selects which changes to include</li>
            <li>Allows partial commits</li>
            <li>Prevents accidental history pollution</li>
          </ul>

          <div className="mt-3 bg-black rounded-lg p-4 text-sm text-green-400">
            git add filename<br />
            git add .
          </div>

          <p className="text-xs text-slate-500 mt-2">
            Think of staging as <strong>packing items before shipping</strong>.
          </p>
        </section>

        {/* ================= git commit ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-purple-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-purple-300 font-medium">
            <Save size={18} /> git commit (Saving to History)
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            The <strong>git commit</strong> command takes everything in the
            <strong> Staging Area</strong> and saves it permanently in the
            <strong> Repository</strong>.
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
            <li>Creates a snapshot</li>
            <li>Generates a unique commit hash</li>
            <li>Becomes part of project history</li>
          </ul>

          <div className="mt-3 bg-black rounded-lg p-4 text-sm text-green-400">
            git commit -m "Meaningful message"
          </div>
        </section>

        {/* ================= COMPARISON ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Layers size={18} /> git add vs git commit (Hover Rows)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Aspect</th>
                <th className="p-2 border">git add</th>
                <th className="p-2 border">git commit</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Moves changes to", "Staging Area", "Repository"],
                ["Purpose", "Select changes", "Save history"],
                ["Reversible?", "Yes (before commit)", "No (by default)"],
                ["Frequency", "Often", "Carefully"],
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
            <ArrowRight size={18} /> Action Flow (Animated)
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

              {/* Animated arrows */}
              <line
                x1="220"
                y1="80"
                x2="280"
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

              <line
                x1="480"
                y1="80"
                x2="540"
                y2="80"
                stroke="#c084fc"
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

              <text x="240" y="65" fill="#34d399" fontSize="10">
                git add
              </text>
              <text x="500" y="65" fill="#c084fc" fontSize="10">
                git commit
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animated arrows show intentional movement of changes
            </p>
          </div>
        </section>

        {/* ================= COMMON WARNINGS ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Common Beginner Mistakes:</strong><br />
          • Editing files and forgetting to stage  
          • Using <code>git add .</code> blindly  
          • Committing too many unrelated changes together
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          A good developer does not commit code —
          a good developer commits <strong>decisions</strong>.
          Stage carefully, commit responsibly.
        </section>

      </div>
    );
  }
}
