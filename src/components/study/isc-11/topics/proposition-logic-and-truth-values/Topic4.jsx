// src/components/study/isc/class11/logic/Topic4.jsx
// Topic 5: Well-Formed Formula (WFF)
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

export default class Topic4 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });
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
            Well-Formed Formula (WFF)
          </h1>
          <p className="text-lg">
            In logic, not every combination of symbols makes sense. Only expressions
            that follow strict formation rules are called <strong>Well-Formed Formulae</strong>.
          </p>
        </div>

        {/* Definition & Purpose */}
        <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">📘 Meaning</h2>
            <p>
              A <strong>Well-Formed Formula (WFF)</strong> is a logical expression built
              correctly using propositional variables, connectives and brackets
              according to defined syntax rules.
            </p>
          </div>

          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">🎯 Purpose</h2>
            <p>
              WFF ensures that logical expressions are unambiguous and machine-readable.
              Computers cannot evaluate ill-formed expressions.
            </p>
          </div>
        </div>

        {/* Syntax Rules */}
        <div className={`mt-12 ${reveal} animation-delay-[200ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-3">📜 Syntax Rules of WFF</h2>
            <ul className="list-disc pl-5">
              <li>A single propositional variable is a WFF. (Example: p)</li>
              <li>If p is a WFF then ¬p is also a WFF.</li>
              <li>If p and q are WFF then (p ∧ q), (p ∨ q) are WFF.</li>
              <li>Every opening bracket must have a closing bracket.</li>
              <li>No symbol should appear without meaning.</li>
            </ul>
          </div>
        </div>

        {/* SVG Illustration */}
        <div className={`mt-12 ${reveal} animation-delay-[280ms]`}>
          <h2 className="text-xl font-semibold mb-4">Valid vs Invalid Formula</h2>
          <svg viewBox="0 0 700 200" className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 p-4">
            <rect x="80" y="70" width="200" height="50" rx="10" fill="#4ade80" />
            <text x="115" y="100" fill="black" fontSize="14">(p ∧ q)</text>

            <rect x="420" y="70" width="200" height="50" rx="10" fill="#fb7185" />
            <text x="455" y="100" fill="black" fontSize="14">p ∧ ∧ q</text>

            <text x="145" y="140" fill="#22c55e" fontSize="12">WFF</text>
            <text x="490" y="140" fill="#ef4444" fontSize="12">Not WFF</text>
          </svg>
        </div>

        {/* ISC Pattern Question */}
        <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
            <p>
              State whether the following is a WFF and justify:  
              <strong>¬(p ∨ q</strong>
            </p>
            <p className="mt-2 text-emerald-600 dark:text-emerald-400">
              Answer: Not a WFF – closing bracket is missing.
            </p>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className={`mt-12 ${reveal} animation-delay-[440ms]`}>
          <div className={`${card} border-l-4 border-amber-400`}>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
              <AlertTriangle size={20} /> Common Pitfalls
            </h2>
            <ul className="list-disc pl-5">
              <li>Missing brackets.</li>
              <li>Using double operators like ∧∧ or ∨∨.</li>
              <li>Placing negation at wrong position.</li>
            </ul>
          </div>
        </div>

        {/* Hint */}
        <div className={`mt-12 ${reveal} animation-delay-[520ms]`}>
          <div className={`${card} border-l-4 border-sky-400`}>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
              <HelpCircle size={20} /> Hint
            </h2>
            <p>
              Observe carefully whether each symbol in the formula has a logical
              purpose and correct pairing.
            </p>
          </div>
        </div>

        {/* Best Practices */}
        <div className={`mt-12 ${reveal} animation-delay-[600ms]`}>
          <div className={`${card} border-l-4 border-emerald-400`}>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
              <CheckCircle2 size={20} /> Best Practices
            </h2>
            <ul className="list-disc pl-5">
              <li>Always balance brackets first.</li>
              <li>Write expressions step by step.</li>
              <li>Verify syntax before building truth tables.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}
