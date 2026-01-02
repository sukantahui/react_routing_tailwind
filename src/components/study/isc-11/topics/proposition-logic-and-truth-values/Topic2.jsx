// src/components/study/isc/class11/logic/Topic2.jsx
// Topic 3: Simple Propositions and Compound Propositions
// React 19 – CLASS-BASED COMPONENT ONLY
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import { Layers, AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react";

/* =========================================================
   Inline Scoped Animations – Fade + Slide Up
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic2 extends Component {
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
      "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300";

    return (
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* Header */}
        <div className={reveal}>
          <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Simple Propositions and Compound Propositions
          </h1>
          <p className="text-lg">
            Every logical statement is built from smaller units. In this topic,
            you will learn how small <strong>simple propositions</strong> combine
            to form powerful <strong>compound propositions</strong>.
          </p>
        </div>

        {/* Definition Cards */}
        <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">📌 Simple Proposition</h2>
            <p>
              A <strong>simple proposition</strong> is a statement that cannot be
              broken into smaller logical parts.
            </p>
            <p className="mt-3">
              Example: <br />
              <strong>“Swadeep is present today.”</strong>
            </p>
          </div>

          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">🧩 Compound Proposition</h2>
            <p>
              A <strong>compound proposition</strong> is formed by combining two or
              more simple propositions using logical connectives.
            </p>
            <p className="mt-3">
              Example: <br />
              <strong>“Swadeep is present and the computer lab is open.”</strong>
            </p>
          </div>
        </div>

        {/* SVG Illustration */}
        <div className={`mt-12 ${reveal} animation-delay-[200ms]`}>
          <h2 className="text-xl font-semibold mb-4">Formation of a Compound Proposition</h2>
          <svg
            viewBox="0 0 700 200"
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 p-4"
          >
            <rect x="40" y="70" width="160" height="50" rx="10" fill="#38bdf8" />
            <text x="65" y="100" fill="white" fontSize="14">p</text>

            <rect x="260" y="70" width="160" height="50" rx="10" fill="#4ade80" />
            <text x="320" y="100" fill="black" fontSize="14">AND / OR</text>

            <rect x="480" y="70" width="160" height="50" rx="10" fill="#38bdf8" />
            <text x="505" y="100" fill="white" fontSize="14">q</text>

            <line x1="200" y1="95" x2="260" y2="95" stroke="#64748b" strokeWidth="2" />
            <line x1="420" y1="95" x2="480" y2="95" stroke="#64748b" strokeWidth="2" />
          </svg>
        </div>

        {/* ISC Pattern */}
        <div className={`mt-12 ${reveal} animation-delay-[280ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
            <p>
              Identify the simple propositions in the statement: <br />
              <strong>“Abhronila is in class XI and the lab is open.”</strong>
            </p>
            <p className="mt-2 text-emerald-600 dark:text-emerald-400">
              Answer: <br />p: Abhronila is in class XI <br />q: The lab is open
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
              <li>Breaking a simple proposition incorrectly.</li>
              <li>Forgetting the connecting word while forming compound statements.</li>
              <li>Using variables directly instead of sentences.</li>
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
              Think about whether a sentence can stand alone. If yes, it is simple.
              If not, it is compound.
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
              <li>Always separate compound statements into parts.</li>
              <li>Use clear logical connectors.</li>
              <li>Check grammar before logic.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
