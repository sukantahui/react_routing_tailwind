import React, { Component } from "react";
import {
  GitBranch,
  ArrowRight,
  Shuffle,
  Eye,
  AlertCircle,
} from "lucide-react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-16">

        {/* ================= HEADER ================= */}
        <header className="space-y-4">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-300 tracking-wide">
            <GitBranch size={22} /> Fast-Forward vs Non-Fast-Forward Merge
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Not all merges create a merge commit.  
            Git chooses the merge strategy based on branch history.
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

        {/* ================= BIG IDEA ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Shuffle size={18} /> The Big Idea
          </h3>

          <p className="text-slate-300 text-sm mt-3 leading-relaxed">
            Git looks at the commit graph and asks:
          </p>

          <p className="text-slate-400 text-sm mt-2">
            👉 “Can I just move the branch pointer forward?”  
            👉 Or “Do I need to create a merge commit?”
          </p>
        </section>

        {/* ================= FAST-FORWARD ================= */}
        <section className="bg-slate-900 border border-emerald-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-emerald-300 font-medium">
            <ArrowRight size={18} /> Fast-Forward Merge
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            A <strong>fast-forward merge</strong> happens when:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>No new commits exist on the target branch</li>
            <li>History is a straight line</li>
            <li>Git simply moves the branch pointer</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            No merge commit is created.
          </p>
        </section>

        {/* ================= NON-FAST-FORWARD ================= */}
        <section className="bg-slate-900 border border-purple-400 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-purple-300 font-medium">
            <Shuffle size={18} /> Non-Fast-Forward Merge
          </h3>

          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            A <strong>non-fast-forward merge</strong> happens when:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm mt-2 space-y-1">
            <li>Both branches have new commits</li>
            <li>Histories diverged</li>
            <li>Git must record the merge explicitly</li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            A <strong>merge commit</strong> is created.
          </p>
        </section>

        {/* ================= SIDE-BY-SIDE ANIMATION ================= */}
        <section className="space-y-4">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <Eye size={18} /> Visual Comparison (Animated)
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {/* FAST-FORWARD SVG */}
            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-400 overflow-hidden">
              <p className="text-emerald-300 text-sm mb-2 text-center">
                Fast-Forward Merge
              </p>

              <svg viewBox="0 0 340 160" className="w-full h-32">
                <line x1="40" y1="80" x2="300" y2="80" stroke="#64748b" />
                {[100, 160, 220].map((x, i) => (
                  <circle key={i} cx={x} cy="80" r="6" fill="#38bdf8" />
                ))}

                {/* Animated pointer */}
                <circle cx="100" cy="80" r="10" fill="none" stroke="#22c55e">
                  <animate
                    attributeName="cx"
                    from="100"
                    to="220"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                <text x="130" y="110" fill="#22c55e" fontSize="10">
                  pointer moves forward
                </text>
              </svg>
            </div>

            {/* NON-FAST-FORWARD SVG */}
            <div className="bg-slate-900 p-4 rounded-lg border border-purple-400 overflow-hidden">
              <p className="text-purple-300 text-sm mb-2 text-center">
                Non-Fast-Forward Merge
              </p>

              <svg viewBox="0 0 340 160" className="w-full h-32">
                {/* main */}
                <line x1="40" y1="90" x2="300" y2="90" stroke="#64748b" />
                <circle cx="120" cy="90" r="6" fill="#38bdf8" />
                <circle cx="200" cy="90" r="6" fill="#38bdf8" />

                {/* branch */}
                <line x1="120" y1="90" x2="120" y2="50" stroke="#a855f7" />
                <circle cx="200" cy="50" r="6" fill="#a855f7" />

                {/* merge */}
                <line x1="200" y1="50" x2="260" y2="90" stroke="#22c55e" />
                <circle cx="260" cy="90" r="8" fill="#22c55e" />

                {/* animated arrow */}
                <line
                  x1="200"
                  y1="50"
                  x2="260"
                  y2="90"
                  stroke="#facc15"
                  strokeDasharray="6 6"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="12"
                    to="0"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </line>

                <text x="190" y="120" fill="#22c55e" fontSize="10">
                  merge commit created
                </text>
              </svg>
            </div>

          </div>
        </section>

        {/* ================= WHEN YOU SEE EACH ================= */}
        <section className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="flex items-center gap-2 text-indigo-200 font-medium">
            <AlertCircle size={18} /> When You See Each Type
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-2">
            <li>Fast-forward → simple feature branch, no parallel work</li>
            <li>Non-fast-forward → real teamwork or long-running branches</li>
          </ul>
        </section>

        {/* ================= GOLDEN RULE ================= */}
        <section className="bg-slate-900 border-l-4 border-emerald-400 p-4 text-sm text-slate-300">
          <strong>Golden Rule:</strong><br />
          Merge commits are not bad.  
          They preserve <strong>context and teamwork history</strong>.
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="bg-slate-900 border-l-4 border-amber-400 p-4 text-sm text-slate-300">
          <strong>Teacher’s Note – Sukanta Hui (Coder & AccoTax):</strong><br />
          Students often try to avoid merge commits.
          Professionals understand when they are meaningful.
        </section>

      </div>
    );
  }
}
