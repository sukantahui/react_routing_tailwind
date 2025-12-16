import React, { Component } from "react";
import {
  GitBranch,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ArrowRight,
} from "lucide-react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-rose-300 tracking-wide">
            <GitBranch size={22} /> Common Undo Scenarios
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Git undo commands are not random tools.  
            Each one solves a <strong>specific problem scenario</strong>.
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

        {/* ================= WHY SCENARIOS MATTER ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <HelpCircle size={18} /> Why Learn Undo by Scenarios?
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Most Git mistakes happen not because of lack of commands,
            but because of <strong>wrong command choice</strong>.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Professionals think in scenarios first — commands second.
          </p>
        </section>

        {/* ================= DECISION TABLE ================= */}
        <section className="space-y-5">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <CheckCircle2 size={18} /> Scenario → Correct Command
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Situation</th>
                <th className="p-2 border">What Happened?</th>
                <th className="p-2 border">Use This</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Edited file wrongly",
                  "Uncommitted changes",
                  "git restore file",
                ],
                [
                  "Added wrong file",
                  "File staged by mistake",
                  "git restore --staged file",
                ],
                [
                  "Bad commit message",
                  "Last commit only",
                  "git commit --amend",
                ],
                [
                  "Buggy commit pushed",
                  "Shared history",
                  "git revert",
                ],
                [
                  "Undo local commits",
                  "Not pushed yet",
                  "git reset (soft/mixed)",
                ],
                [
                  "Delete everything",
                  "Local disaster",
                  "git reset --hard (⚠)",
                ],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-slate-800 hover:text-rose-300"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= REAL-LIFE CASES ================= */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <GitBranch size={18} /> Real-Life Classroom Scenarios
          </h3>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-5">
            <p className="text-slate-300 text-sm">
              <strong>Scenario 1:</strong>  
              You edited <code>index.js</code>, broke it, and want to discard changes.
            </p>
            <p className="text-green-400 text-sm mt-2 bg-black p-3 rounded">
              git restore index.js
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-5">
            <p className="text-slate-300 text-sm">
              <strong>Scenario 2:</strong>  
              You pushed a commit that caused errors on production.
            </p>
            <p className="text-green-400 text-sm mt-2 bg-black p-3 rounded">
              git revert &lt;commit-hash&gt;
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg p-5">
            <p className="text-slate-300 text-sm">
              <strong>Scenario 3:</strong>  
              You committed too early but haven’t pushed yet.
            </p>
            <p className="text-green-400 text-sm mt-2 bg-black p-3 rounded">
              git reset --soft HEAD~1
            </p>
          </div>
        </section>

        {/* ================= ANIMATED DECISION FLOW ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Eye size={18} /> Undo Decision Flow (Animated)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 200" className="w-full h-44">

              {/* Boxes */}
              {[
                { x: 60, y: 40, text: "Uncommitted?", color: "#38bdf8" },
                { x: 300, y: 40, text: "Staged?", color: "#34d399" },
                { x: 540, y: 40, text: "Pushed?", color: "#f43f5e" },
              ].map((b, i) => (
                <g key={i}>
                  <rect
                    x={b.x}
                    y={b.y}
                    width="160"
                    height="50"
                    rx="8"
                    fill="#0f172a"
                    stroke={b.color}
                  />
                  <text
                    x={b.x + 80}
                    y={b.y + 30}
                    textAnchor="middle"
                    fill={b.color}
                    fontSize="12"
                  >
                    {b.text}
                  </text>
                </g>
              ))}

              {/* Animated arrows */}
              <line x1="220" y1="65" x2="300" y2="65"
                stroke="#facc15" strokeDasharray="6 6">
                <animate
                  attributeName="stroke-dashoffset"
                  from="12"
                  to="0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>

              <line x1="460" y1="65" x2="540" y2="65"
                stroke="#facc15" strokeDasharray="6 6">
                <animate
                  attributeName="stroke-dashoffset"
                  from="12"
                  to="0"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>

              <text x="320" y="100" fill="#facc15" fontSize="10">
                choose command carefully
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animation shows decision checkpoints before undoing
            </p>
          </div>
        </section>

        {/* ================= FINAL WARNING ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Final Warning:</strong><br />
          If you are unsure, <strong>do NOT run destructive commands</strong>.  
          Inspect first using <code>git status</code> and <code>git log</code>.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Git mastery is not about memorizing commands.  
          It is about choosing the right command at the right moment.
        </section>

      </div>
    );
  }
}
