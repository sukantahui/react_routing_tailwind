// src/components/study/isc/class11/logic/Topic0.jsx
// Topic 1: Meaning and Definition of a Proposition
// React 19 – CLASS-BASED COMPONENT
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import { Lightbulb, AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";

/* =========================================================
   Inline Scoped Animations – Fade + Slide Up
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic0 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all duration-300";

    return (
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* Header */}
        <div className={`${reveal}`}>
          <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Meaning and Definition of a Proposition
          </h1>
          <p className="text-lg">
            In computer science, a <strong>proposition</strong> is the smallest unit
            of logic that can be evaluated as either <strong>True</strong> or
            <strong> False</strong>. This topic builds the foundation of all logical
            decision-making in programming.
          </p>
        </div>

        {/* Theory */}
        <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">📘 Definition</h2>
            <p>
              A <strong>proposition</strong> is a declarative sentence that is either
              true or false, but not both.
            </p>
            <p className="mt-3">
              Example: <br />
              <strong>“Barrackpore is in West Bengal.”</strong> → True
            </p>
          </div>

          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">🧠 Why Propositions Matter</h2>
            <p>
              All decisions in programs — like <em>if Swadeep scores above 90, show
              merit list</em> — are built on propositions.
            </p>
            <p className="mt-3">
              Without propositions, computers cannot make logical decisions.
            </p>
          </div>
        </div>

        {/* SVG Illustration */}
        <div className={`mt-12 ${reveal} animation-delay-[200ms]`}>
          <h2 className="text-xl font-semibold mb-4">How a Proposition Works</h2>
          <svg
            viewBox="0 0 600 180"
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 p-4"
          >
            <rect x="40" y="60" width="180" height="50" rx="10" fill="#38bdf8" />
            <text x="70" y="92" fill="white" fontSize="14">Statement</text>

            <rect x="260" y="60" width="180" height="50" rx="10" fill="#4ade80" />
            <text x="310" y="92" fill="black" fontSize="14">Evaluate</text>

            <rect x="480" y="60" width="80" height="50" rx="10" fill="#facc15" />
            <text x="495" y="92" fill="black" fontSize="14">True / False</text>

            <line x1="220" y1="85" x2="260" y2="85" stroke="#64748b" strokeWidth="2" />
            <line x1="440" y1="85" x2="480" y2="85" stroke="#64748b" strokeWidth="2" />
          </svg>
        </div>

        {/* Real Life Examples */}
        <div className={`grid md:grid-cols-2 gap-6 mt-12 ${reveal} animation-delay-[280ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">🌍 Real World Examples</h2>
            <ul className="list-disc pl-5">
              <li>“Tuhina is present today.”</li>
              <li>“Naihati is near Barrackpore.”</li>
              <li>“The computer lab is open.”</li>
            </ul>
          </div>

          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
            <p>
              State whether the following is a proposition and justify: <br />
              <strong>“Open the door.”</strong>
            </p>
            <p className="mt-2 text-emerald-600 dark:text-emerald-400">
              Answer: Not a proposition — it is a command.
            </p>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
          <div className={`${card} border-l-4 border-amber-400`}>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
              <AlertTriangle size={20} /> Common Pitfalls
            </h2>
            <ul className="list-disc pl-5">
              <li>Assuming questions are propositions.</li>
              <li>Using emotional sentences like “God is great”.</li>
              <li>Using variables like x &gt; 5 directly.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className={`mt-12 ${reveal} animation-delay-[440ms]`}>
          <div className={`${card} border-l-4 border-sky-400`}>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
              <HelpCircle size={20} /> Hint
            </h2>
            <p>
              Think about whether a sentence can be checked as either only True or
              False. If not, it is not a proposition.
            </p>
          </div>
        </div>

        {/* Best Practices */}
        <div className={`mt-12 ${reveal} animation-delay-[520ms]`}>
          <div className={`${card} border-l-4 border-emerald-400`}>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
              <CheckCircle2 size={20} /> Best Practices
            </h2>
            <ul className="list-disc pl-5">
              <li>Always verify truth value.</li>
              <li>Use simple, clear sentences.</li>
              <li>Avoid variables in propositions.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
