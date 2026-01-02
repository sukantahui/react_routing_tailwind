// src/components/study/isc/class11/logic/Topic3.jsx
// Topic 4: Propositional Variables and Symbolic Representation
// React 19 – CLASS-BASED COMPONENT ONLY
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import { Tag, AlertTriangle, CheckCircle2, HelpCircle, BookOpen } from "lucide-react";

/* =========================================================
   Inline Scoped Animations – Fade + Slide Up
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic3 extends Component {
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

    const symbols = [
      { sym: "¬", name: "NOT", pronounce: "not", meaning: "Negation of a statement", example: "¬p → p is false" },
      { sym: "∧", name: "AND", pronounce: "and", meaning: "Both statements must be true", example: "p ∧ q" },
      { sym: "∨", name: "OR", pronounce: "or", meaning: "At least one statement true", example: "p ∨ q" },
      { sym: "→", name: "IMPLIES", pronounce: "implies", meaning: "If p then q", example: "p → q" },
      { sym: "↔", name: "IFF", pronounce: "if and only if", meaning: "Both true or both false", example: "p ↔ q" }
    ];

    return (
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* Header */}
        <div className={reveal}>
          <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Propositional Variables & Symbolic Representation
          </h1>
          <p className="text-lg">
            Long English sentences are hard to analyze logically. We replace them
            using <strong>propositional variables</strong> like <em>p, q, r</em>
            to simplify reasoning and truth table construction.
          </p>
        </div>

        {/* Core Theory */}
        <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">🔤 Meaning</h2>
            <p>A <strong>propositional variable</strong> is a symbol used to represent a proposition.</p>
            <p className="mt-3">
              p : “Debangshu is in class XI.” <br />
              q : “The lab is open.”
            </p>
          </div>

          <div className={card}>
            <h2 className="text-xl font-semibold mb-2">🎯 Purpose</h2>
            <p>
              Variables make large expressions manageable and help us construct truth
              tables without repeating full sentences.
            </p>
          </div>
        </div>

        {/* SVG Mapping */}
        <div className={`mt-12 ${reveal} animation-delay-[200ms]`}>
          <h2 className="text-xl font-semibold mb-4">Mapping Statements to Symbols</h2>
          <svg viewBox="0 0 700 200" className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 p-4">
            <rect x="40" y="70" width="240" height="50" rx="10" fill="#38bdf8" />
            <text x="60" y="100" fill="white" fontSize="13">“The lab is open.”</text>
            <rect x="350" y="70" width="120" height="50" rx="10" fill="#4ade80" />
            <text x="395" y="100" fill="black" fontSize="14">q</text>
            <line x1="280" y1="95" x2="350" y2="95" stroke="#64748b" strokeWidth="2" />
          </svg>
        </div>

        {/* Logical Symbols Table */}
        <div className={`mt-16 ${reveal} animation-delay-[360ms]`}>
          <div className={card}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={20} /> Logical Symbols – Meaning, Pronunciation & Usage
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b dark:border-slate-700">
                  <th className="p-2">Symbol</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Pronunciation</th>
                  <th className="p-2">Meaning</th>
                  <th className="p-2">Example</th>
                </tr>
              </thead>
              <tbody>
                {symbols.map((s, i) => (
                  <tr key={i} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <td className="p-2 font-bold text-center">{s.sym}</td>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2 italic">{s.pronounce}</td>
                    <td className="p-2">{s.meaning}</td>
                    <td className="p-2 text-emerald-600">{s.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hint & Best Practices kept intact */}
        <div className={`mt-12 ${reveal} animation-delay-[520ms]`}>
          <div className={`${card} border-l-4 border-sky-400`}>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-2"><HelpCircle size={20}/> Hint</h2>
            <p>Think about how programmers use variables — logic variables work the same way.</p>
          </div>
        </div>

      </section>
    );
  }
}
