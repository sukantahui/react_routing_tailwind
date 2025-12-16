import React, { Component } from "react";
import {
  GitBranch,
  Layers,
  Shuffle,
  AlertTriangle,
  Eye,
  BookOpen,
} from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-20">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-300 tracking-wide">
            <GitBranch size={22} /> Branching & Merging in Git
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Branching is Git’s most powerful feature.  
            It allows you to work on <strong>new ideas safely</strong>
            without breaking the main project.
          </p>

          <p className="text-slate-400 text-sm">
            Professionals never work directly on <strong>main</strong>.
            They use branches.
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

        {/* ================= WHY BRANCHES EXIST ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6 space-y-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <BookOpen size={18} /> Why Do We Need Branches?
          </h3>

          <p className="text-slate-300 text-sm">
            Editing production code directly is risky.
            Branches create a <strong>safe workspace</strong>.
          </p>

          {/* SVG — RISKY VS SAFE */}
          <svg viewBox="0 0 760 160" className="w-full h-36">
            {/* Risky */}
            <rect x="60" y="40" width="260" height="60" rx="8" fill="#020617" stroke="#ef4444" />
            <text x="190" y="65" textAnchor="middle" fill="#ef4444" fontSize="12">
              Working directly on main ❌
            </text>
            <text x="190" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">
              High risk
            </text>

            {/* Safe */}
            <rect x="440" y="40" width="260" height="60" rx="8" fill="#020617" stroke="#22c55e" />
            <text x="570" y="65" textAnchor="middle" fill="#22c55e" fontSize="12">
              Working on branch ✅
            </text>
            <text x="570" y="85" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Safe & controlled
            </text>
          </svg>
        </section>

        {/* ================= WHAT A BRANCH IS ================= */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Layers size={18} /> What Is a Branch Really?
          </h3>

          <p className="text-slate-300 text-sm">
            A branch is <strong>not a copy</strong>.  
            It is a <strong>pointer</strong> to a commit.
          </p>

          {/* SVG — POINTER MODEL */}
          <svg viewBox="0 0 760 180" className="w-full h-40">
            <line x1="100" y1="90" x2="660" y2="90" stroke="#64748b" />

            {[220, 360, 500].map((x, i) => (
              <circle key={i} cx={x} cy="90" r="8" fill="#38bdf8" />
            ))}

            {/* main pointer */}
            <text x="360" y="130" fill="#38bdf8" fontSize="11">
              main → commit
            </text>

            {/* animated HEAD */}
            <circle cx="360" cy="90" r="14" fill="none" stroke="#facc15">
              <animate
                attributeName="r"
                from="12"
                to="16"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </section>

        {/* ================= BRANCH CREATION ================= */}
        <section className="space-y-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Eye size={18} /> Creating a Branch (Visual)
          </h3>

          <p className="text-slate-300 text-sm">
            Creating a branch does <strong>not move HEAD</strong>.
          </p>

          {/* SVG — BRANCH CREATION */}
          <svg viewBox="0 0 760 220" className="w-full h-44">
            <line x1="80" y1="140" x2="680" y2="140" stroke="#64748b" />

            {/* main commits */}
            {[200, 320, 440].map((x, i) => (
              <circle key={i} cx={x} cy="140" r="7" fill="#38bdf8" />
            ))}

            {/* branch split */}
            <line x1="440" y1="140" x2="440" y2="80" stroke="#a855f7" />
            <circle cx="560" cy="80" r="7" fill="#a855f7" />

            {/* HEAD */}
            <circle cx="440" cy="140" r="12" fill="none" stroke="#facc15">
              <animate
                attributeName="cx"
                from="200"
                to="440"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            <text x="180" y="170" fill="#38bdf8" fontSize="10">main</text>
            <text x="550" y="60" fill="#a855f7" fontSize="10">feature</text>
            <text x="360" y="30" fill="#22c55e" fontSize="12">
              git branch feature
            </text>
          </svg>
        </section>

        {/* ================= MERGE IDEA ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6 space-y-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Shuffle size={18} /> What Does Merging Mean?
          </h3>

          <p className="text-slate-300 text-sm">
            Merging means combining histories — not overwriting code.
          </p>

          {/* SVG — MERGE IDEA */}
          <svg viewBox="0 0 760 200" className="w-full h-40">
            <line x1="120" y1="120" x2="640" y2="120" stroke="#64748b" />

            <circle cx="260" cy="120" r="7" fill="#38bdf8" />
            <circle cx="360" cy="120" r="7" fill="#38bdf8" />

            <line x1="360" y1="120" x2="360" y2="70" stroke="#a855f7" />
            <circle cx="480" cy="70" r="7" fill="#a855f7" />

            <line x1="480" y1="70" x2="560" y2="120" stroke="#22c55e" />
            <circle cx="560" cy="120" r="9" fill="#22c55e" />

            <text x="520" y="150" fill="#22c55e" fontSize="10">
              merge commit
            </text>
          </svg>
        </section>

        {/* ================= CONFLICT INTRO ================= */}
        <section className="bg-slate-900 border border-red-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-red-300 font-medium">
            <AlertTriangle size={18} /> Why Merge Conflicts Happen
          </h3>

          <p className="text-slate-300 text-sm">
            Conflicts occur when Git cannot decide automatically.
            This is normal and solvable.
          </p>
        </section>

        {/* ================= GOLDEN RULE ================= */}
        <section className="bg-slate-900 border-l-4 border-emerald-400 p-4 text-sm text-slate-300">
          <strong>Golden Rule:</strong><br />
          Never experiment directly on <strong>main</strong>.
          Branch → Work → Merge.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          When students see branches visually,
          Git becomes logical instead of scary.
        </section>

      </div>
    );
  }
}
