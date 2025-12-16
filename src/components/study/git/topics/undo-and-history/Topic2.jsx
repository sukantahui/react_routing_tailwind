import React, { Component } from "react";
import {
  GitBranch,
  RotateCcw,
  Layers,
  AlertTriangle,
  Eye,
} from "lucide-react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-rose-300 tracking-wide">
            <GitBranch size={22} /> git restore & git reset (Intro)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            These commands are used when you want to <strong>undo work</strong>,
            but at <strong>different levels</strong> of Git.
          </p>

          <p className="text-xs text-slate-500">
            Teacher:{" "}
            <a
              href="https://github.com/sukantahui"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline"
            >
              github.com/sukantahui
            </a>{" "}
            | Official GitHub:{" "}
            <a
              href="https://github.com/codernaccotax"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline"
            >
              github.com/codernaccotax
            </a>
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <RotateCcw size={18} /> Core Idea
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            <strong>git restore</strong> works mainly with
            <strong> files</strong>,  
            while <strong>git reset</strong> works mainly with
            <strong> commits and history pointers</strong>.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Understanding this difference prevents serious mistakes.
          </p>
        </section>

        {/* ================= git restore ================= */}
        <section className="bg-slate-900 border border-emerald-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <GitBranch size={18} /> git restore (File-Level Undo)
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            <strong>git restore</strong> is the modern, safer way to undo
            changes in files.
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Restore a file from last commit</li>
            <li>Unstage a file safely</li>
            <li>Does NOT rewrite history</li>
          </ul>

          <div className="mt-3 bg-black rounded-lg p-4 text-sm text-green-400">
            git restore file.txt<br />
            git restore --staged file.txt
          </div>
        </section>

        {/* ================= git reset ================= */}
        <section className="bg-slate-900 border border-red-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-red-300 font-medium">
            <AlertTriangle size={18} /> git reset (History Pointer Control)
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            <strong>git reset</strong> moves the current branch pointer
            (<code>HEAD</code>) to another commit.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            This can affect the staging area and working directory,
            depending on the mode used.
          </p>
        </section>

        {/* ================= RESET MODES ================= */}
        <section className="space-y-5">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Layers size={18} /> Reset Modes (Intro Overview)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Mode</th>
                <th className="p-2 border">What Changes</th>
                <th className="p-2 border">Safe?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--soft", "Moves HEAD only", "✔ Safe"],
                ["--mixed (default)", "Moves HEAD + unstages files", "⚠ Careful"],
                ["--hard", "Moves HEAD + deletes changes", "❌ Dangerous"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-slate-800 hover:text-rose-300"
                >
                  <td className="p-2 border font-mono">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                  <td className="p-2 border">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= ANIMATED RESET MODEL ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Eye size={18} /> reset Effect (Animated Concept)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 180" className="w-full h-36">

              {/* Areas */}
              {[
                { x: 40, label: "Working Dir", color: "#38bdf8" },
                { x: 280, label: "Staging Area", color: "#34d399" },
                { x: 520, label: "Repository", color: "#f43f5e" },
              ].map((box) => (
                <g key={box.label}>
                  <rect
                    x={box.x}
                    y="80"
                    width="180"
                    height="50"
                    rx="8"
                    fill="#0f172a"
                    stroke={box.color}
                  />
                  <text
                    x={box.x + 90}
                    y="110"
                    textAnchor="middle"
                    fill={box.color}
                    fontSize="12"
                  >
                    {box.label}
                  </text>
                </g>
              ))}

              {/* Animated pointer */}
              <circle cx="610" cy="50" r="6" fill="#facc15">
                <animate
                  attributeName="cx"
                  from="610"
                  to="300"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              <text x="420" y="40" fill="#facc15" fontSize="10">
                HEAD moves backward
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animation shows HEAD moving to an older commit
            </p>
          </div>
        </section>

        {/* ================= SAFETY RULE ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Critical Safety Rule:</strong><br />
          Never use <code>git reset --hard</code> on commits already pushed to
          <strong> shared repositories</strong> like{" "}
          <code>github.com/codernaccotax</code>.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          <code>git restore</code> is your safe eraser.  
          <code>git reset</code> is your scalpel.  
          Use both with understanding, not speed.
        </section>

      </div>
    );
  }
}
