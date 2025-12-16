import React, { Component } from "react";
import {
  FolderPlus,
  Terminal,
  Database,
  EyeOff,
  Layers,
  Info,
} from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            git init & Repository Structure
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            This topic explains how a normal folder becomes a <strong>Git repository</strong>
            and what Git creates internally.
          </p>
        </header>

        {/* ================= WHAT git init DOES ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-sky-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Terminal size={18} /> What does <code className="text-sky-300">git init</code> do?
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            The <strong>git init</strong> command initializes a new Git repository.
            It tells Git:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>This folder should be tracked</li>
            <li>Store history and metadata here</li>
            <li>Prepare for version control operations</li>
          </ul>

          <div className="mt-3 bg-black rounded-lg p-4 text-sm text-green-400">
            git init
          </div>

          <p className="text-slate-400 text-sm mt-2">
            After this command, the folder becomes a <strong>Git repository</strong>.
          </p>
        </section>

        {/* ================= BEFORE vs AFTER ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <FolderPlus size={18} /> Before & After <code className="text-sky-300">git init</code>
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Before</th>
                <th className="p-2 border">After</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Normal folder", "Git repository"],
                ["No history", "History tracking enabled"],
                ["No Git commands", "Full Git functionality"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-sky-300"
                >
                  <td className="p-2 border">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= .GIT FOLDER ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <EyeOff size={18} /> The Hidden <code className="text-sky-300">.git</code> Folder
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            When you run <code className="text-sky-300">git init</code>,
            Git creates a hidden folder named <strong>.git</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            This folder contains everything Git needs to manage your project.
          </p>
        </section>

        {/* ================= REPO STRUCTURE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Layers size={18} /> Inside the <code className="text-sky-300">.git</code> Folder
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Item</th>
                <th className="p-2 border">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["HEAD", "Points to the current branch"],
                ["objects/", "Stores all commits and files"],
                ["refs/", "Stores branch references"],
                ["config", "Repository configuration"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-sky-300"
                >
                  <td className="p-2 border font-mono text-xs">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= SVG VISUAL ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-sky-200 font-medium">
            <Database size={18} /> Repository Structure (Conceptual View)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <svg viewBox="0 0 700 160" className="w-full h-36">

              {/* Project folder */}
              <rect x="40" y="50" width="260" height="60" rx="10"
                fill="#0f172a" stroke="#38bdf8" />
              <text x="170" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="12">
                Project Folder
              </text>
              <text x="170" y="92" textAnchor="middle" fill="#94a3b8" fontSize="10">
                (Your files)
              </text>

              {/* Arrow */}
              <line x1="300" y1="80" x2="400" y2="80" stroke="#38bdf8" />

              {/* .git */}
              <rect x="400" y="50" width="260" height="60" rx="10"
                fill="#020617" stroke="#38bdf8" />
              <text x="530" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="12">
                .git Folder
              </text>
              <text x="530" y="92" textAnchor="middle" fill="#94a3b8" fontSize="10">
                (History & metadata)
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Hover to reinforce separation of files and Git data
            </p>
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-red-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-red-300 font-medium">
            <Info size={18} /> Common Beginner Mistakes
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Running <code>git init</code> inside the wrong folder</li>
            <li>Deleting the <code>.git</code> folder accidentally</li>
            <li>Re-initializing an already existing repository</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          <code>git init</code> is not just a command — it is a commitment.
          Once you initialize a repository, every change can and should be
          tracked responsibly.
        </section>

      </div>
    );
  }
}
