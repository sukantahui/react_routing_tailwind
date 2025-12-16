import React, { Component } from "react";
import {
  GitBranch,
  Shuffle,
  Layers,
  Eye,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-300 tracking-wide">
            <GitBranch size={22} /> git merge (Detailed Explanation)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>git merge</strong> is the process of combining the work
            of two branches into one unified history.
          </p>

          <p className="text-slate-400 text-sm">
            This topic explains <strong>what Git actually does</strong>
            when you run a merge command.
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

        {/* ================= WHAT MERGE REALLY MEANS ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Layers size={18} /> What Does “Merge” Actually Mean?
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Merging does <strong>not</strong> mean copying files from one
            branch to another.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Git performs a <strong>three-way comparison</strong>:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>The common ancestor commit</li>
            <li>The current branch</li>
            <li>The branch being merged</li>
          </ul>
        </section>

        {/* ================= BASIC MERGE WORKFLOW ================= */}
        <section className="bg-slate-900 border border-indigo-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Shuffle size={18} /> Correct Merge Workflow
          </h3>

          <p className="text-slate-300 text-sm mt-2">
            Always remember:
          </p>

          <p className="text-slate-400 text-sm mt-2">
            👉 You merge <strong>into</strong> the branch you are currently on.
          </p>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400 mt-3">
            git switch main<br />
            git merge feature-payment
          </div>

          <p className="text-slate-400 text-sm mt-2">
            This merges <code>feature-payment</code> into <code>main</code>.
          </p>
        </section>

        {/* ================= PRE-MERGE CHECKLIST ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <CheckCircle2 size={18} /> Pre-Merge Checklist (Very Important)
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-2">
            <li>Working directory is clean</li>
            <li>All changes are committed</li>
            <li>You are on the correct target branch</li>
            <li>You have pulled latest changes (if team repo)</li>
          </ul>
        </section>

        {/* ================= AUTOMATIC MERGE ================= */}
        <section className="bg-slate-900 border border-emerald-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <CheckCircle2 size={18} /> Automatic Merge
          </h3>

          <p className="text-slate-300 text-sm mt-2">
            Git performs an automatic merge when:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Different files were changed</li>
            <li>Different lines were modified</li>
            <li>No ambiguity exists</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            In this case, Git finishes the merge silently.
          </p>
        </section>

        {/* ================= MERGE CONFLICT INTRO ================= */}
        <section className="bg-slate-900 border border-red-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-red-300 font-medium">
            <AlertTriangle size={18} /> When Git Stops (Merge Conflict)
          </h3>

          <p className="text-slate-300 text-sm mt-2">
            Git stops the merge when:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>The same file was edited in both branches</li>
            <li>The same lines were changed differently</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            This is not an error — it is Git asking for your decision.
          </p>
        </section>

        {/* ================= ANIMATED MERGE GRAPH ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Eye size={18} /> How Git Merges (Animated Graph)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 220" className="w-full h-44">

              {/* main */}
              <line x1="100" y1="130" x2="650" y2="130" stroke="#64748b" />
              <circle cx="200" cy="130" r="7" fill="#38bdf8" />
              <circle cx="300" cy="130" r="7" fill="#38bdf8" />

              {/* branch */}
              <line x1="300" y1="130" x2="300" y2="80" stroke="#a855f7" />
              <circle cx="420" cy="80" r="7" fill="#a855f7" />
              <circle cx="520" cy="80" r="7" fill="#a855f7" />

              {/* merge */}
              <line x1="520" y1="80" x2="620" y2="130" stroke="#22c55e" />
              <circle cx="620" cy="130" r="9" fill="#22c55e" />

              {/* animation */}
              <line
                x1="520"
                y1="80"
                x2="620"
                y2="130"
                stroke="#facc15"
                strokeDasharray="6 6"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="12"
                  to="0"
                  dur="1.3s"
                  repeatCount="indefinite"
                />
              </line>

              <text x="190" y="160" fill="#38bdf8" fontSize="10">
                main
              </text>
              <text x="430" y="60" fill="#a855f7" fontSize="10">
                feature
              </text>
              <text x="600" y="165" fill="#22c55e" fontSize="10">
                merge commit
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animation shows Git creating a merge commit
            </p>
          </div>
        </section>

        {/* ================= GOLDEN RULE ================= */}
        <section className="bg-slate-900 border-l-4 border-emerald-400 p-4 text-sm text-slate-300">
          <strong>Golden Rule of git merge:</strong><br />
          Merge is safe when history matters.
          Never fear merge commits — fear unclear decisions.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Students struggle with merge until they understand
          that Git works with <strong>history graphs</strong>, not files.
          Once this clicks, merge becomes logical.
        </section>

      </div>
    );
  }
}
