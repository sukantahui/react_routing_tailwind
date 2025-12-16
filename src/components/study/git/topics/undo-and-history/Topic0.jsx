import React, { Component } from "react";
import {
  GitBranch,
  History,
  Filter,
  List,
  Clock,
  Eye,
} from "lucide-react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-rose-300 tracking-wide">
            <GitBranch size={22} /> git log – Options & Usage
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>git log</strong> shows the history of your project.  
            With options, it becomes a <strong>powerful investigation tool</strong>.
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

        {/* ================= WHY git log OPTIONS ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <History size={18} /> Why git log Needs Options
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            In real projects, commit history can contain
            <strong> hundreds or thousands of commits</strong>.
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Options help you:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Focus on recent changes</li>
            <li>Search specific commits</li>
            <li>Understand branching visually</li>
            <li>Debug issues faster</li>
          </ul>
        </section>

        {/* ================= COMMON OPTIONS ================= */}
        <section className="space-y-5">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Filter size={18} /> Most Common git log Options
          </h3>

          <table className="w-full text-sm border border-slate-700 text-slate-300">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-2 border">Command</th>
                <th className="p-2 border">Purpose</th>
                <th className="p-2 border">Example Use</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["git log --oneline", "Compact one-line history", "Quick overview"],
                ["git log -5", "Show last 5 commits", "Recent activity"],
                ["git log --author=\"Name\"", "Filter by author", "Team audit"],
                ["git log --since=\"2 days ago\"", "Filter by time", "Recent bug hunt"],
                ["git log --stat", "Show file changes", "Impact analysis"],
              ].map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors hover:bg-slate-800 hover:text-rose-300"
                >
                  <td className="p-2 border font-mono text-xs">{row[0]}</td>
                  <td className="p-2 border">{row[1]}</td>
                  <td className="p-2 border">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ================= PRACTICAL EXAMPLES ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <List size={18} /> Practical Examples
          </h3>

          <div className="space-y-4 text-sm">
            <div className="bg-black rounded-lg p-4 text-green-400">
              git log --oneline
            </div>
            <p className="text-slate-400">
              ✔ Used during daily development to quickly scan history.
            </p>

            <div className="bg-black rounded-lg p-4 text-green-400">
              git log --author="Sukanta"
            </div>
            <p className="text-slate-400">
              ✔ Useful in classrooms and teams to track contributions.
            </p>

            <div className="bg-black rounded-lg p-4 text-green-400">
              git log --since="1 week ago"
            </div>
            <p className="text-slate-400">
              ✔ Ideal when debugging a recently introduced issue.
            </p>
          </div>
        </section>

        {/* ================= ANIMATED HISTORY VIEW ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-rose-200 font-medium">
            <Eye size={18} /> Commit History (Animated Timeline)
          </h3>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-hidden">
            <svg viewBox="0 0 760 170" className="w-full h-36">

              {/* Commit dots */}
              {[100, 200, 300, 400, 500, 600].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy="85" r="8" fill="#f43f5e" />
                  <text
                    x={x}
                    y="110"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="9"
                  >
                    commit
                  </text>
                </g>
              ))}

              {/* Animated focus */}
              <circle cx="100" cy="85" r="12" fill="none" stroke="#facc15">
                <animate
                  attributeName="cx"
                  from="100"
                  to="600"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Line */}
              <line
                x1="80"
                y1="85"
                x2="620"
                y2="85"
                stroke="#64748b"
              />

              <text x="280" y="40" fill="#facc15" fontSize="10">
                git log options move your focus through history
              </text>
            </svg>

            <p className="text-slate-400 text-xs mt-2 text-center">
              Animation shows how options narrow your view of history
            </p>
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="bg-slate-900 border-l-4 border-red-400 p-4 text-sm text-slate-300">
          <strong>Common Beginner Mistakes:</strong><br />
          • Reading full log without filters  
          • Ignoring author and date filters  
          • Using log only after problems arise
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          A developer who understands <code>git log</code> options
          can debug faster than one who only knows how to commit.
          History is knowledge — learn to read it properly.
        </section>

      </div>
    );
  }
}
