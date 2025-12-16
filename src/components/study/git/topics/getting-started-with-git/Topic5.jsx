import React, { Component } from "react";
import {
  FolderGit2,
  Database,
  Cloud,
  Layers,
  Info,
  Eye,
} from "lucide-react";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-cyan-300 tracking-wide">
            Understanding Git Repositories
          </h2>
          <p className="text-slate-300 text-sm">
            This topic builds the <strong>mental foundation</strong> of Git.
            Understand this well, and everything else becomes logical.
          </p>
        </header>

        {/* ================= WHAT IS A REPOSITORY ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-cyan-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-cyan-200 font-medium">
            <FolderGit2 size={18} /> What is a Repository?
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            A <strong>Git Repository</strong> (repo) is a special folder that contains:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Project files</li>
            <li>Complete change history</li>
            <li>Branch information</li>
            <li>Configuration and metadata</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            In short: <strong>Repository = Code + History + Intelligence</strong>
          </p>
        </section>

        {/* ================= LOCAL VS REMOTE ================= */}
        <section className="grid md:grid-cols-2 gap-6">

          {/* Local Repo */}
          <div
            className="group bg-slate-900 border border-slate-700 rounded-lg p-5
                       transition-all duration-300 hover:border-cyan-400
                       hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-cyan-300 font-medium">
              <Database size={18} /> Local Repository
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              A <strong>Local Repository</strong> exists on your own computer.
              It is where you work, experiment, commit, and test safely.
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
              <li>Works without internet</li>
              <li>Contains full project history</li>
              <li>Very fast operations</li>
            </ul>

            <div className="mt-3 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition">
              Created using <code className="text-cyan-300">git init</code>
            </div>
          </div>

          {/* Remote Repo */}
          <div
            className="group bg-slate-900 border border-slate-700 rounded-lg p-5
                       transition-all duration-300 hover:border-cyan-400
                       hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-cyan-300 font-medium">
              <Cloud size={18} /> Remote Repository
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              A <strong>Remote Repository</strong> is hosted on a server
              (GitHub, GitLab, Bitbucket) and is used for sharing and backup.
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
              <li>Central collaboration point</li>
              <li>Backup of local work</li>
              <li>Used for team workflows</li>
            </ul>

            <div className="mt-3 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition">
              Connected using <code className="text-cyan-300">git remote</code>
            </div>
          </div>
        </section>

        {/* ================= COMPARISON TABLE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-cyan-200 font-medium">
            <Layers size={18} /> Local vs Remote (Hover Rows)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Aspect</th>
                <th className="p-2 border">Local Repo</th>
                <th className="p-2 border">Remote Repo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Location", "Your computer", "Server (GitHub etc.)"],
                ["Internet required", "No", "Yes"],
                ["Purpose", "Development & testing", "Sharing & backup"],
                ["Speed", "Very fast", "Network dependent"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-cyan-300"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= .GIT FOLDER ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-cyan-200 font-medium">
            <Eye size={18} /> The Hidden <code className="text-cyan-300">.git</code> Folder
          </h3>

          <p className="text-slate-300 text-sm">
            The <code className="text-cyan-300">.git</code> folder is the
            <strong> brain of the repository</strong>.
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Stores commit history</li>
            <li>Manages branches</li>
            <li>Keeps configuration</li>
            <li>Tracks object database</li>
          </ul>

          <div className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
            <strong>Warning:</strong>  
            Deleting the <code>.git</code> folder means the project
            is <strong>no longer a Git repository</strong>.
          </div>
        </section>

        {/* ================= SVG MENTAL MODEL ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-cyan-200 font-medium">
            <Info size={18} /> Repository Mental Model (Hover Diagram)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <svg viewBox="0 0 700 140" className="w-full h-32">

              {/* Local */}
              <g className="group cursor-pointer">
                <rect x="40" y="40" width="220" height="60" rx="8"
                  fill="#0f172a" stroke="#22d3ee"
                  className="transition group-hover:stroke-[#67e8f9]" />
                <text x="150" y="65" textAnchor="middle" fill="#67e8f9" fontSize="12">
                  Local Repository
                </text>
                <text x="150" y="82" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Code + History
                </text>
              </g>

              {/* Arrow */}
              <line x1="260" y1="70" x2="440" y2="70" stroke="#22d3ee" />

              {/* Remote */}
              <g className="group cursor-pointer">
                <rect x="440" y="40" width="220" height="60" rx="8"
                  fill="#0f172a" stroke="#22d3ee"
                  className="transition group-hover:stroke-[#67e8f9]" />
                <text x="550" y="65" textAnchor="middle" fill="#67e8f9" fontSize="12">
                  Remote Repository
                </text>
                <text x="550" y="82" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  Share + Backup
                </text>
              </g>

            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Hover to reinforce the local–remote relationship
            </p>
          </div>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Students often think GitHub is Git.  
          Remember clearly: <strong>Git is the system, GitHub is just a service</strong>.  
          Your real power always lies in the <strong>local repository</strong>.
        </section>

      </div>
    );
  }
}
