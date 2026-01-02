// src/components/study/isc/class11/logic/Topic1.jsx
// Topic 2: Difference between Proposition and Non-Proposition
// React 19 – CLASS-BASED COMPONENT ONLY
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, MessageSquare } from "lucide-react";

/* =========================================================
   Inline Scoped Animations – Fade + Slide Up
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic1 extends Component {
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
            Difference between Proposition and Non-Proposition
          </h1>
          <p className="text-lg">
            In real life we speak in many forms — statements, questions, orders and
            emotions. But in logic, only those sentences that can be evaluated as
            <strong> True or False</strong> are valid propositions.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">✔ What is a Proposition?</h2>
            <p>
              A proposition is a declarative sentence that has a definite truth value.
            </p>
            <ul className="list-disc pl-5 mt-3">
              <li>“Abhronila is present today.”</li>
              <li>“Barrackpore is in West Bengal.”</li>
              <li>“7 is a prime number.”</li>
            </ul>
          </div>

          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">✖ What is NOT a Proposition?</h2>
            <p>
              Any sentence that does not have a clear truth value is a non-proposition.
            </p>
            <ul className="list-disc pl-5 mt-3">
              <li>Commands – “Close the door.”</li>
              <li>Questions – “Where are you going?”</li>
              <li>Exclamations – “What a beautiful day!”</li>
            </ul>
          </div>
        </div>

        {/* SVG Flow Diagram */}
        <div className={`mt-12 ${reveal} animation-delay-[200ms]`}>
          <h2 className="text-xl font-semibold mb-4">How to Identify a Proposition</h2>
          <svg
            viewBox="0 0 700 200"
            className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 p-4"
          >
            <rect x="40" y="70" width="180" height="50" rx="10" fill="#38bdf8" />
            <text x="75" y="100" fill="white" fontSize="14">Sentence</text>

            <rect x="270" y="70" width="200" height="50" rx="10" fill="#4ade80" />
            <text x="285" y="100" fill="black" fontSize="14">Has True / False?</text>

            <rect x="520" y="30" width="140" height="50" rx="10" fill="#facc15" />
            <text x="545" y="60" fill="black" fontSize="14">Proposition</text>

            <rect x="520" y="110" width="140" height="50" rx="10" fill="#fb7185" />
            <text x="535" y="140" fill="black" fontSize="14">Not Proposition</text>

            <line x1="220" y1="95" x2="270" y2="95" stroke="#64748b" strokeWidth="2" />
            <line x1="470" y1="95" x2="520" y2="55" stroke="#64748b" strokeWidth="2" />
            <line x1="470" y1="95" x2="520" y2="135" stroke="#64748b" strokeWidth="2" />
          </svg>
        </div>

        {/* ISC Pattern Question */}
        <div className={`mt-12 ${reveal} animation-delay-[280ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <MessageSquare size={20} /> ISC Pattern Question
            </h2>
            <p>
              State whether the following is a proposition and justify: <br />
              <strong>“Please switch off the fan.”</strong>
            </p>
            <p className="mt-2 text-emerald-600 dark:text-emerald-400">
              Answer: It is not a proposition because it is a command.
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
              <li>Thinking all sentences are propositions.</li>
              <li>Considering questions as logical statements.</li>
              <li>Using emotional expressions in logic problems.</li>
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
              Ask yourself: <em>Can this sentence be checked as True or False?</em>
              If not, it is not a proposition.
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
              <li>Rewrite commands as statements before checking logic.</li>
              <li>Remove emotional words and variables.</li>
              <li>Keep sentences simple and declarative.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
