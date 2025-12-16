import React, { Component } from "react";
import {
  GitBranch,
  PlusCircle,
  Repeat,
  Eye,
  AlertTriangle,
} from "lucide-react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-300 tracking-wide">
            <GitBranch size={22} /> git branch & git checkout / git switch
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            These commands allow you to <strong>create branches</strong>
            and <strong>move between them</strong>.
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

        {/* ================= git branch ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <PlusCircle size={18} /> git branch – Creating & Viewing Branches
          </h3>

          <p className="text-slate-300 text-sm mt-3">
            The <strong>git branch</strong> command is used to
            <strong> create</strong>, <strong>list</strong>, and
            <strong> manage</strong> branches.
          </p>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400 mt-3">
            git branch<br />
            git branch feature-login
          </div>

          <p className="text-slate-400 text-sm mt-2">
            Creating a branch does <strong>not</strong> switch to it automatically.
          </p>
        </section>

        {/* ================= git checkout / switch ================= */}
        <section className="bg-slate-900 border border-indigo-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Repeat size={18} /> Switching Branches
          </h3>

          <p className="text-slate-300 text-sm mt-3">
            After creating a branch, you must switch to it.
          </p>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400 mt-3">
            git checkout feature-login<br />
            git switch feature-login
          </div>

          <p className="text-slate-400 text-sm mt-2">
            <code>git switch</code> is the modern, clearer alternative.
          </p>
        </section>

        {/* ================= CREATE + SWITCH ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <GitBranch size={18} /> Create & Switch in One Step
          </h3>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400">
            git checkout -b feature-cart<br />
            git switch -c feature-cart
          </div>

          <p className="text-slate-400 text-sm mt-2">
            This is commonly used in daily development.
          </p>
        </section>

        {/* ================= ANIMATED HEAD MOVEMENT ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Eye size={18} /> Switching Branches (Animated View)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 200" className="w-full h-44">

              {/* Main line */}
              <line x1="80" y1="120" x2="680" y2="120" stroke="#64748b" />

              {/* Commits */}
              {[200, 320, 440].map((x, i) => (
                <circle key={i} cx={x} cy="120" r="7" fill="#38bdf8" />
              ))}

              {/* Branch up */}
              <line x1="440" y1="120" x2="440" y2="70" stroke="#a855f7" />

              {/* Branch commit */}
              <circle cx="540" cy="70" r="7" fill="#a855f7" />

              {/* Animated HEAD */}
              <circle cx="200" cy="120" r="10" fill="none" stroke="#facc15">
                <animate
                  attributeName="cx"
                  from="200"
                  to="540"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  from="120"
                  to="70"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              <text x="210" y="150" fill="#38bdf8" fontSize="10">
                main
              </text>
              <text x="520" y="45" fill="#a855f7" fontSize="10">
                feature branch
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animation shows HEAD moving to a different branch
            </p>
          </div>
        </section>

        {/* ================= SAFETY WARNING ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Important Safety Rule:</strong><br />
          Git will block switching branches if it causes file conflicts.
          Always commit or stash changes first.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Students should practice creating and switching branches early.
          It builds confidence and prevents fear of experimentation.
        </section>

      </div>
    );
  }
}
