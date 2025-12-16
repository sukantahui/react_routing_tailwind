import React, { Component } from "react";
import {
  GitBranch,
  RotateCcw,
  ShieldCheck,
  History,
  Eye,
} from "lucide-react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-rose-300 tracking-wide">
            <GitBranch size={22} /> git revert
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>git revert</strong> is the safest way to undo a commit
            that has already become part of the project history.
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
            <ShieldCheck size={18} /> Core Idea of git revert
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Unlike <code>git reset</code>, <strong>git revert does not delete history</strong>.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Instead, it creates a <strong>new commit</strong> that
            reverses the effect of an earlier commit.
          </p>
        </section>

        {/* ================= BASIC SYNTAX ================= */}
        <section className="bg-slate-900 border border-emerald-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <RotateCcw size={18} /> Basic Syntax
          </h3>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400">
            git revert &lt;commit-hash&gt;
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Git automatically opens an editor to confirm the revert message.
          </p>
        </section>

        {/* ================= WHEN TO USE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <History size={18} /> When Should You Use git revert?
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-2">
            <li>A buggy commit was already pushed to GitHub</li>
            <li>Multiple people have pulled the changes</li>
            <li>You want a transparent, auditable fix</li>
          </ul>
        </section>

        {/* ================= REAL-LIFE EXAMPLE ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <GitBranch size={18} /> Real-Life Example
          </h3>

          <p className="text-slate-300 text-sm mt-3">
            Suppose a commit introduced a bug in production:
          </p>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400 mt-2">
            git revert a3f5c9d
          </div>

          <p className="text-slate-400 text-sm mt-2">
            This creates a new commit that cancels the buggy changes
            without deleting any history.
          </p>
        </section>

        {/* ================= ANIMATED HISTORY MODEL ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Eye size={18} /> How git revert Works (Animated)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 170" className="w-full h-36">

              {/* Commit line */}
              <line
                x1="100"
                y1="90"
                x2="660"
                y2="90"
                stroke="#64748b"
              />

              {/* Commits */}
              {[150, 250, 350, 450].map((x, i) => (
                <circle key={i} cx={x} cy="90" r="8" fill="#f43f5e" />
              ))}

              {/* Revert commit */}
              <circle cx="550" cy="90" r="8" fill="#22c55e" />

              {/* Animated arrow */}
              <line
                x1="450"
                y1="50"
                x2="550"
                y2="85"
                stroke="#facc15"
                strokeDasharray="5 5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="10"
                  to="0"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </line>

              <text x="420" y="45" fill="#facc15" fontSize="10">
                revert creates new commit
              </text>

              <text x="530" y="120" fill="#22c55e" fontSize="10">
                revert commit
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animation shows history preserved with a corrective commit
            </p>
          </div>
        </section>

        {/* ================= COMMON CONFUSION ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Common Student Confusion:</strong><br />
          <code>git revert</code> does NOT remove the bad commit.  
          It adds a new commit that neutralizes it.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          In professional teams, <code>git revert</code> is a sign of maturity.  
          It values transparency over ego and safety over shortcuts.
        </section>

      </div>
    );
  }
}
