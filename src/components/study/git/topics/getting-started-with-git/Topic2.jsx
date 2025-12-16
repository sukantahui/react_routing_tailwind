import React, { Component } from "react";
import {
  GitCommit,
  Hash,
  Layers,
  Database,
  Info,
  Cpu,
} from "lucide-react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-purple-300 tracking-wide">
            Git – What It Is & How It Works Internally (High Level)
          </h2>
          <p className="text-slate-300 text-sm">
            Hover over terms, cards, and diagrams to understand
            <strong> how Git thinks internally</strong>.
          </p>
        </header>

        {/* ================= WHAT IS GIT ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-purple-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-purple-200 font-medium">
            <Cpu size={18} /> What is Git?
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            <strong>Git</strong> is a <strong>Distributed Version Control System (DVCS)</strong>
            designed to handle everything from small projects to very large systems
            with <strong>speed, accuracy, and data integrity</strong>.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Git does not merely save files — it records the <strong>state of your project</strong>
            at every important moment.
          </p>
        </section>

        {/* ================= SNAPSHOT MODEL ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-purple-200 font-medium">
            <Layers size={18} /> Git’s Snapshot Model (Hover Cards)
          </h3>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              [
                "Traditional Systems",
                "Store file differences (line-by-line)",
              ],
              [
                "Git Approach",
                "Stores full snapshots of the project",
              ],
              [
                "Benefit",
                "Fast operations and strong history",
              ],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-700 rounded-lg p-4
                           transition-all duration-300 hover:border-purple-400
                           hover:shadow-lg hover:-translate-y-1"
              >
                <h4 className="text-slate-200 font-medium">{title}</h4>
                <p className="text-slate-400 text-sm mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= KEY INTERNAL TERMS ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-purple-200 font-medium">
            <Database size={18} /> Core Internal Concepts (Hover for Meaning)
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              ["Repository", "Complete project + full history"],
              ["Commit", "A saved snapshot of the project"],
              ["Hash", "Unique cryptographic ID"],
              ["Branch", "Independent line of development"],
            ].map(([term, meaning]) => (
              <div
                key={term}
                className="relative group bg-slate-900 border border-slate-700
                           rounded-lg p-4 text-center cursor-help
                           transition hover:border-purple-400"
              >
                <span className="text-slate-200 font-medium">{term}</span>
                <Info size={14} className="inline ml-1 text-slate-400" />

                {/* Tooltip */}
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                             opacity-0 group-hover:opacity-100 transition
                             bg-black text-slate-200 text-xs
                             px-3 py-2 rounded shadow-lg w-52 z-10"
                >
                  {meaning}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= COMMIT & HASH ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-purple-200 font-medium">
            <GitCommit size={18} /> Commit & Hash (Conceptual Understanding)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Concept</th>
                <th className="p-2 border">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Commit", "Represents a complete project snapshot"],
                ["Hash", "Uniquely identifies a commit"],
                ["Integrity", "Any change alters the hash"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-purple-300"
                >
                  <td className="p-2 border">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= SVG INTERNAL FLOW ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-purple-200 font-medium">
            <Hash size={18} /> Internal Flow (Hover Diagram)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <svg viewBox="0 0 700 120" className="w-full h-28">

              {[
                { x: 20, label: "Files" },
                { x: 220, label: "Snapshot" },
                { x: 420, label: "Commit" },
                { x: 580, label: "Hash ID" },
              ].map((step, i) => (
                <g key={i} className="group cursor-pointer">
                  <rect
                    x={step.x}
                    y="40"
                    width="120"
                    height="40"
                    rx="8"
                    fill="#0f172a"
                    stroke="#c084fc"
                    className="transition-all duration-300
                               group-hover:stroke-[#e9d5ff]"
                  />
                  <text
                    x={step.x + 60}
                    y="65"
                    textAnchor="middle"
                    fill="#e9d5ff"
                    fontSize="11"
                  >
                    {step.label}
                  </text>
                </g>
              ))}

              <line x1="140" y1="60" x2="220" y2="60" stroke="#c084fc" />
              <line x1="340" y1="60" x2="420" y2="60" stroke="#c084fc" />
              <line x1="540" y1="60" x2="580" y2="60" stroke="#c084fc" />
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Hover each block to mentally trace how Git stores data
            </p>
          </div>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Beginners fear Git because they don’t understand its internals.  
          Once you realize Git stores <strong>snapshots with strong identity</strong>,
          everything — branching, merging, undoing — becomes logical.
        </section>

      </div>
    );
  }
}
