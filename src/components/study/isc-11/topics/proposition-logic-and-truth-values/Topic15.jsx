// src/components/study/isc/class11/logic/Topic15.jsx
// Topic 16: Introduction to Tautology and Contradiction
// React 19 – CLASS-BASED COMPONENT ONLY
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import { AlertTriangle, CheckCircle2, HelpCircle, Lightbulb } from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic15 extends Component {
  constructor(props){
    super(props);
    this.state = { mounted:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });
  }

  render(){

    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
      <style>{animationStyles}</style>

      {/* Header */}
      <div className={reveal}>
        <h1 className="text-3xl font-semibold mb-4">
          Introduction to Tautology and Contradiction
        </h1>
        <p className="text-lg">
          Some logical expressions are always true, while some are always false,
          regardless of the truth values of individual propositions.
        </p>
      </div>

      {/* Meaning Section */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🟢 Tautology</h2>
          <p>
            A tautology is a compound proposition that is <strong>always true</strong>
            for all possible truth values.
          </p>
          <p className="mt-3">
            Example: <strong>p ∨ ¬p</strong>
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🔴 Contradiction</h2>
          <p>
            A contradiction is a compound proposition that is <strong>always false</strong>
            for all possible truth values.
          </p>
          <p className="mt-3">
            Example: <strong>p ∧ ¬p</strong>
          </p>
        </div>
      </div>

      {/* Truth Table */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-3">
            Truth Table for p ∨ ¬p and p ∧ ¬p
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-2">p</th>
                <th className="p-2">¬p</th>
                <th className="p-2">p ∨ ¬p</th>
                <th className="p-2">p ∧ ¬p</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <td className="p-2 text-center">T</td>
                <td className="p-2 text-center">F</td>
                <td className="p-2 text-center">T</td>
                <td className="p-2 text-center">F</td>
              </tr>
              <tr className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <td className="p-2 text-center">F</td>
                <td className="p-2 text-center">T</td>
                <td className="p-2 text-center">T</td>
                <td className="p-2 text-center">F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
          <p>
            Show that the expression <strong>p ∨ ¬p</strong> is a tautology using a truth table.
          </p>
        </div>
      </div>

      {/* Professional Insight */}
      <div className={`mt-12 ${reveal} animation-delay-[480ms]`}>
        <div className={`${card} border-l-4 border-indigo-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Lightbulb size={20}/> Professional Insight
          </h2>
          <p>
            In software testing, a tautology is like a rule that always passes —
            while a contradiction is a rule that never passes.
          </p>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className={`mt-12 ${reveal} animation-delay-[600ms]`}>
        <div className={`${card} border-l-4 border-amber-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <AlertTriangle size={20}/> Common Pitfalls
          </h2>
          <ul className="list-disc pl-5">
            <li>Assuming a statement is tautology without checking truth table.</li>
            <li>Mixing tautology with implication.</li>
            <li>Not constructing complete truth tables.</li>
          </ul>
        </div>
      </div>

      {/* Hint */}
      <div className={`mt-12 ${reveal} animation-delay-[720ms]`}>
        <div className={`${card} border-l-4 border-sky-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <HelpCircle size={20}/> Hint
          </h2>
          <p>
            Look at the final column — if all values are T, it’s a tautology.
          </p>
        </div>
      </div>

      {/* Mini Checklist */}
      <div className={`mt-12 ${reveal} animation-delay-[840ms]`}>
        <div className={`${card} border-l-4 border-emerald-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <CheckCircle2 size={20}/> Mini Checklist
          </h2>
          <ul className="list-disc pl-5">
            <li>Did I build a full truth table?</li>
            <li>Are all results True or False?</li>
            <li>Did I classify correctly?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
