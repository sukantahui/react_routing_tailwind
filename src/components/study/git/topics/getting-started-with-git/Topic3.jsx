import React, { Component } from "react";
import {
  Download,
  Terminal,
  CheckCircle2,
  Settings,
  Info,
  Laptop,
} from "lucide-react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-amber-300 tracking-wide">
            Installing Git & Initial Environment Setup
          </h2>
          <p className="text-slate-300 text-sm">
            This topic ensures Git is <strong>properly installed, verified,
            and ready</strong> before real usage.
          </p>
        </header>

        {/* ================= WHY INSTALLATION MATTERS ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-amber-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-amber-200 font-medium">
            <Info size={18} /> Why Proper Installation Matters
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Ensures correct command availability</li>
            <li>Avoids path and environment issues</li>
            <li>Prevents version mismatch problems</li>
            <li>Guarantees compatibility with GitHub / GitLab</li>
          </ul>
        </section>

        {/* ================= INSTALLATION TABLE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-amber-200 font-medium">
            <Download size={18} /> Installation Methods (Hover Rows)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Operating System</th>
                <th className="p-2 border">Recommended Method</th>
                <th className="p-2 border">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Windows", "Git for Windows Installer", "Includes Git Bash"],
                ["Linux", "apt / dnf / yum", "Best via package manager"],
                ["macOS", "Homebrew / Xcode tools", "Terminal-based setup"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-amber-300"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= FIRST VERIFICATION ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-amber-200 font-medium">
            <Terminal size={18} /> First Verification (After Installation)
          </h3>

          <div
            className="bg-black rounded-lg p-4 text-sm text-green-400
                       transition hover:shadow-lg hover:ring-1 hover:ring-amber-400"
          >
            git --version
          </div>

          <p className="text-slate-400 text-sm">
            This command confirms that Git is installed and available
            in your system path.
          </p>
        </section>

        {/* ================= SVG TERMINAL FLOW ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-amber-200 font-medium">
            <Laptop size={18} /> Installation → Verification Flow
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <svg viewBox="0 0 700 120" className="w-full h-28">

              {[
                { x: 20, label: "Install Git" },
                { x: 230, label: "Open Terminal" },
                { x: 440, label: "Run git --version" },
              ].map((step, i) => (
                <g key={i} className="group cursor-pointer">
                  <rect
                    x={step.x}
                    y="40"
                    width="200"
                    height="40"
                    rx="8"
                    fill="#0f172a"
                    stroke="#fbbf24"
                    className="transition-all duration-300
                               group-hover:stroke-[#fde68a]"
                  />
                  <text
                    x={step.x + 100}
                    y="65"
                    textAnchor="middle"
                    fill="#fde68a"
                    fontSize="11"
                  >
                    {step.label}
                  </text>
                </g>
              ))}

              <line x1="220" y1="60" x2="230" y2="60" stroke="#fbbf24" />
              <line x1="430" y1="60" x2="440" y2="60" stroke="#fbbf24" />
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Hover each step to reinforce the correct setup sequence
            </p>
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-amber-200 font-medium">
            <CheckCircle2 size={18} /> Common Beginner Mistakes
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Mistake</th>
                <th className="p-2 border">Correct Practice</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Skipping verification", "Always run git --version"],
                ["Using outdated Git", "Install latest stable version"],
                ["Not using terminal", "Learn basic terminal usage"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-amber-300"
                >
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Never assume Git is installed correctly.  
          Professionals always <strong>verify first</strong> — this habit
          saves hours of debugging later.
        </section>

      </div>
    );
  }
}
