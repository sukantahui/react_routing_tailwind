import React, { Component } from "react";
import {
  GitBranch,
  AlertTriangle,
  Eye,
  CheckCircle2,
  FileText,
} from "lucide-react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-red-300 tracking-wide">
            <GitBranch size={22} /> Merge Conflicts and Resolution
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>merge conflict</strong> happens when Git cannot
            automatically decide which change should be kept.
          </p>

          <p className="text-slate-400 text-sm">
            Conflicts are normal in teamwork — they are not mistakes.
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

        {/* ================= WHY CONFLICTS HAPPEN ================= */}
        <section className="bg-slate-900 border border-red-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-red-300 font-medium">
            <AlertTriangle size={18} /> Why Do Merge Conflicts Happen?
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-2">
            <li>The same file was modified in two branches</li>
            <li>The same lines were edited differently</li>
            <li>Git cannot guess the correct version</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            Git stops and asks <strong>you</strong> to decide.
          </p>
        </section>

        {/* ================= SIMPLE SCENARIO ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <FileText size={18} /> Simple Conflict Scenario
          </h3>

          <p className="text-slate-300 text-sm mt-3">
            Two developers edited the same file:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Developer A changed a function name</li>
            <li>Developer B changed the logic inside it</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            Git cannot auto-merge because both edits touch the same lines.
          </p>
        </section>

        {/* ================= CONFLICT VISUAL ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Eye size={18} /> What a Conflict Looks Like (Visual)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 200" className="w-full h-40">

              {/* main */}
              <line x1="120" y1="100" x2="640" y2="100" stroke="#64748b" />
              <circle cx="260" cy="100" r="7" fill="#38bdf8" />
              <circle cx="360" cy="100" r="7" fill="#38bdf8" />

              {/* branch */}
              <line x1="360" y1="100" x2="360" y2="60" stroke="#a855f7" />
              <circle cx="480" cy="60" r="7" fill="#a855f7" />

              {/* conflict */}
              <line x1="480" y1="60" x2="560" y2="100" stroke="#ef4444" />
              <circle cx="560" cy="100" r="9" fill="#ef4444" />

              <text x="520" y="135" fill="#ef4444" fontSize="11">
                conflict detected
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Git stops when conflicting changes meet
            </p>
          </div>
        </section>

        {/* ================= CONFLICT MARKERS ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <FileText size={18} /> Conflict Markers in Code
          </h3>

          <pre className="bg-black rounded-lg p-4 text-sm text-slate-300 overflow-x-auto">
{`<<<<<<< HEAD
function calculateTotal() {
  return price + tax;
}
=======
function calculateTotal() {
  return price + tax + discount;
}
>>>>>>> feature-branch`}
          </pre>

          <p className="text-slate-400 text-sm mt-2">
            Git shows both versions and waits for your decision.
          </p>
        </section>

        {/* ================= RESOLUTION STEPS ================= */}
        <section className="bg-slate-900 border border-emerald-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <CheckCircle2 size={18} /> Step-by-Step Conflict Resolution
          </h3>

          <ol className="list-decimal list-inside text-slate-400 text-sm mt-3 space-y-2">
            <li>Open the conflicted file</li>
            <li>Understand both versions</li>
            <li>Edit the file to the correct final code</li>
            <li>Remove all conflict markers</li>
            <li>Save the file</li>
            <li>Run <code>git add &lt;file&gt;</code></li>
            <li>Run <code>git commit</code></li>
          </ol>
        </section>

        {/* ================= AFTER RESOLUTION ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <GitBranch size={18} /> After Conflict Is Resolved
          </h3>

          <p className="text-slate-300 text-sm mt-2">
            Git creates a normal merge commit and history continues safely.
          </p>
        </section>

        {/* ================= GOLDEN RULE ================= */}
        <section className="bg-slate-900 border-l-4 border-emerald-400 p-4 text-sm text-slate-300">
          <strong>Golden Rule:</strong><br />
          Never rush through a merge conflict.
          Read, understand, then resolve.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Merge conflicts teach responsibility.
          Once students resolve their first conflict calmly,
          Git becomes a trusted partner.
        </section>

      </div>
    );
  }
}
