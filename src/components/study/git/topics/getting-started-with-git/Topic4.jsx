import React, { Component } from "react";
import {
  Terminal,
  User,
  Mail,
  Settings,
  Info,
  AlertTriangle,
} from "lucide-react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-rose-300 tracking-wide">
            git --version & git config
          </h2>
          <p className="text-slate-300 text-sm">
            This topic explains how Git <strong>identifies you</strong> and
            verifies its own installation.
          </p>
        </header>

        {/* ================= git --version ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-rose-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Terminal size={18} /> git --version
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            The <strong>git --version</strong> command checks whether Git is:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Installed correctly</li>
            <li>Accessible from the command line</li>
            <li>Available in the system PATH</li>
          </ul>

          <div
            className="mt-3 bg-black rounded-lg p-4 text-sm text-green-400
                       transition hover:ring-1 hover:ring-rose-400"
          >
            git --version
          </div>

          <p className="text-slate-400 text-sm mt-2">
            If Git is installed correctly, it will display the current version number.
          </p>
        </section>

        {/* ================= WHY CONFIG IS REQUIRED ================= */}
        <section
          className="bg-slate-900 border border-slate-700 rounded-lg p-5
                     transition-all duration-300 hover:border-rose-400
                     hover:shadow-lg hover:-translate-y-1"
        >
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Info size={18} /> Why git config Is Mandatory
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            Git records <strong>who made each change</strong>.  
            Without configuration, Git does not know the author of commits.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            This is not optional — Git will refuse to commit if identity is missing.
          </p>
        </section>

        {/* ================= USER CONFIG ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <User size={18} /> Setting User Identity (Hover Rows)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Command</th>
                <th className="p-2 border">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["git config --global user.name \"Your Name\"", "Sets author name"],
                ["git config --global user.email \"you@email.com\"", "Sets author email"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-rose-300"
                >
                  <td className="p-2 border font-mono text-xs">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-slate-400 text-sm">
            The <strong>--global</strong> flag applies the configuration
            to all repositories on this machine.
          </p>
        </section>

        {/* ================= CONFIG SCOPE ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Settings size={18} /> Configuration Levels (Scope)
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Level</th>
                <th className="p-2 border">Applies To</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["System", "All users on the system"],
                ["Global", "Current user (most common)"],
                ["Local", "Single repository only"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-rose-300"
                >
                  <td className="p-2 border">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= COMMON WARNINGS ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <AlertTriangle size={18} /> Common Beginner Mistakes
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
                ["Wrong email address", "Use same email as GitHub"],
                ["Skipping configuration", "Always configure before first commit"],
                ["Using --global blindly", "Use local config for shared machines"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-200
                             hover:bg-slate-800 hover:text-rose-300"
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
          A Git commit is not anonymous work.  
          It is a professional record.  
          Always treat your Git identity like a <strong>digital signature</strong>.
        </section>

      </div>
    );
  }
}
