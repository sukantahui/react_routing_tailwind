import React, { Component } from "react";
import {
  GitBranch,
  FileX,
  AlertTriangle,
  Eye,
  RotateCcw,
} from "lucide-react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-rose-300 tracking-wide">
            <GitBranch size={22} /> git checkout -- &lt;file&gt;
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            This command is used to <strong>discard local changes</strong>
            made to a file in the <strong>working directory</strong>.
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

        {/* ================= WHAT IT DOES ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <RotateCcw size={18} /> What This Command Actually Does
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            <code className="text-rose-300">git checkout -- &lt;file&gt;</code>
            replaces the current version of a file with the
            <strong> last committed version</strong>.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Any uncommitted changes in that file are
            <strong className="text-red-400"> permanently lost</strong>.
          </p>
        </section>

        {/* ================= BASIC SYNTAX ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <FileX size={18} /> Basic Syntax
          </h3>

          <div className="bg-black rounded-lg p-4 text-sm text-green-400">
            git checkout -- index.html
          </div>

          <p className="text-slate-400 text-sm mt-2">
            This command affects only the specified file,
            not the entire project.
          </p>
        </section>

        {/* ================= WHEN TO USE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Eye size={18} /> When Should You Use It?
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-2">
            <li>You experimented and want to abandon the changes</li>
            <li>You broke a file and want the last committed version</li>
            <li>You edited the wrong file accidentally</li>
          </ul>
        </section>

        {/* ================= ANIMATED FILE-LEVEL MODEL ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Eye size={18} /> File-Level Undo (Animated View)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 160" className="w-full h-36">

              {/* Working Directory */}
              <rect x="60" y="60" width="220" height="50" rx="8"
                fill="#0f172a" stroke="#38bdf8" />
              <text x="170" y="90" textAnchor="middle" fill="#38bdf8" fontSize="12">
                Working Directory (edited file)
              </text>

              {/* Repository */}
              <rect x="480" y="60" width="220" height="50" rx="8"
                fill="#0f172a" stroke="#f43f5e" />
              <text x="590" y="90" textAnchor="middle" fill="#f43f5e" fontSize="12">
                Repository (last commit)
              </text>

              {/* Animated arrow */}
              <line
                x1="280"
                y1="85"
                x2="480"
                y2="85"
                stroke="#facc15"
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

              <text x="330" y="65" fill="#facc15" fontSize="10">
                git checkout -- file
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animation shows file restored from last commit
            </p>
          </div>
        </section>

        {/* ================= IMPORTANT WARNING ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Danger Warning:</strong><br />
          This command <strong>cannot be undone</strong>.  
          Always run <code>git status</code> or <code>git diff</code>
          before using it.
        </section>

        {/* ================= MODERN NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-emerald-400 p-4 text-sm text-slate-300">
          <strong>Modern Git Note:</strong><br />
          Newer Git versions recommend <code>git restore &lt;file&gt;</code>
          instead.  
          You will learn that in the next topic.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          <code>git checkout -- &lt;file&gt;</code> is powerful but unforgiving.  
          Professionals use it only after inspection — never in panic.
        </section>

      </div>
    );
  }
}
