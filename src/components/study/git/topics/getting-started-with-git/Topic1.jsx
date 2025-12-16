import React, { Component } from "react";
import {
  Network,
  Server,
  Laptop,
  Users,
  Info,
  GitBranch,
} from "lucide-react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300 tracking-wide">
            Centralized vs Distributed Version Control
          </h2>
          <p className="text-slate-300 text-sm">
            Hover over cards, table rows, and diagrams to understand
            <strong> how repository architecture affects teamwork</strong>.
          </p>
        </header>

        {/* ================= BASIC IDEA ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-emerald-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-emerald-200 font-medium">
            <Network size={18} /> Core Classification
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Version Control Systems are classified based on
            <strong> where the repository and history are stored</strong>.
            This classification directly affects speed, safety,
            offline work, and collaboration.
          </p>
        </section>

        {/* ================= TWO SYSTEM CARDS ================= */}
        <section className="grid md:grid-cols-2 gap-6">

          {/* Centralized */}
          <div
            className="group bg-slate-900 border border-slate-700 rounded-lg p-5
                       transition-all duration-300 hover:border-red-400
                       hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-red-300 font-medium">
              <Server size={18} /> Centralized Version Control (CVCS)
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              A single <strong>central server</strong> stores the complete repository.
              All developers connect to this server to get and save changes.
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
              <li>One main repository</li>
              <li>Server dependency</li>
              <li>Limited offline work</li>
            </ul>

            <div className="mt-3 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition">
              Example: CVS, Subversion (SVN)
            </div>
          </div>

          {/* Distributed */}
          <div
            className="group bg-slate-900 border border-slate-700 rounded-lg p-5
                       transition-all duration-300 hover:border-emerald-400
                       hover:shadow-lg hover:-translate-y-1"
          >
            <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
              <GitBranch size={18} /> Distributed Version Control (DVCS)
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              Every developer has a <strong>complete copy</strong> of the repository,
              including full history, on their own machine.
            </p>

            <ul className="list-disc list-inside text-slate-400 text-sm mt-3 space-y-1">
              <li>Full local history</li>
              <li>Offline work possible</li>
              <li>Faster operations</li>
            </ul>

            <div className="mt-3 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition">
              Example: Git, Mercurial
            </div>
          </div>
        </section>

        {/* ================= COMPARISON TABLE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-emerald-200 font-medium">
            <Users size={18} /> Side-by-Side Comparison (Hover Rows)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Aspect</th>
                <th className="p-2 border">Centralized</th>
                <th className="p-2 border">Distributed</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Repository location", "Single server", "Every developer machine"],
                ["Offline work", "Not possible", "Fully possible"],
                ["Speed", "Network dependent", "Mostly local, very fast"],
                ["Failure risk", "Server is single point", "No single point of failure"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-emerald-300"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= SVG DIAGRAM ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-emerald-200 font-medium">
            <Laptop size={18} /> Architectural View (Hover Sections)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <svg viewBox="0 0 700 180" className="w-full h-44">

              {/* Centralized */}
              <g className="group cursor-pointer">
                <text x="110" y="20" fill="#fca5a5" fontSize="12" textAnchor="middle">
                  Centralized
                </text>

                <rect x="70" y="40" width="80" height="40" rx="6"
                  fill="#0f172a" stroke="#f87171"
                  className="transition group-hover:stroke-[#fecaca]" />
                <text x="110" y="65" textAnchor="middle" fill="#fecaca" fontSize="11">
                  Server
                </text>

                <line x1="110" y1="80" x2="50" y2="120" stroke="#f87171" />
                <line x1="110" y1="80" x2="110" y2="120" stroke="#f87171" />
                <line x1="110" y1="80" x2="170" y2="120" stroke="#f87171" />

                {["Dev A", "Dev B", "Dev C"].map((d, i) => (
                  <text key={i} x={50 + i * 60} y={140}
                    textAnchor="middle" fill="#cbd5f5" fontSize="10">
                    {d}
                  </text>
                ))}
              </g>

              {/* Distributed */}
              <g className="group cursor-pointer">
                <text x="540" y="20" fill="#6ee7b7" fontSize="12" textAnchor="middle">
                  Distributed
                </text>

                {["Dev A", "Dev B", "Dev C"].map((d, i) => (
                  <g key={i}>
                    <rect x={480 + i * 60} y="60" width="60" height="40" rx="6"
                      fill="#0f172a" stroke="#34d399"
                      className="transition group-hover:stroke-[#a7f3d0]" />
                    <text x={510 + i * 60} y="85"
                      textAnchor="middle" fill="#a7f3d0" fontSize="10">
                      {d}
                    </text>
                  </g>
                ))}
              </g>

            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Hover left or right to focus on architecture differences
            </p>
          </div>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Centralized systems taught discipline, but distributed systems
          brought freedom and speed.  
          Modern development demands <strong>offline capability, safety,
          and flexibility</strong> — that is why Git dominates.
        </section>

      </div>
    );
  }
}
