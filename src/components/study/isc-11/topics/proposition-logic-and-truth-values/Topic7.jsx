// src/components/study/isc/class11/logic/Topic7.jsx
// Topic 8: Negation of a Proposition & Common Mistakes
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

export default class Topic7 extends Component {
  constructor(props){
    super(props);
    this.state={ mounted:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });
  }

  render(){

    const reveal=this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
      <style>{animationStyles}</style>

      {/* Header */}
      <div className={reveal}>
        <h1 className="text-3xl font-semibold mb-4">
          Negation of a Proposition – NOT (¬)
        </h1>
        <p className="text-lg">
          Negation changes the truth value of a proposition. If a statement is true,
          its negation becomes false and vice-versa.
        </p>
      </div>

      {/* Core Explanation */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🔁 Meaning of Negation</h2>
          <p>
            Prototype: <strong>¬p</strong> <br/>
            Return Type: <strong>Boolean</strong> (True / False)
          </p>
          <p className="mt-3">
            If p: “The computer lab is open.” <br/>
            Then ¬p: “The computer lab is not open.”
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🎯 Purpose</h2>
          <p>
            Negation is used when we need the opposite condition —
            for example in programming when checking for failure or absence.
          </p>
        </div>
      </div>

      {/* Truth Table */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-3">Truth Table for Negation</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-2">p</th>
                <th className="p-2">¬p</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <td className="p-2 text-center">T</td>
                <td className="p-2 text-center">F</td>
              </tr>
              <tr className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <td className="p-2 text-center">F</td>
                <td className="p-2 text-center">T</td>
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
            Let p be: “Swadeep is present in class”. Write the negation of p.
          </p>
          <p className="mt-2 text-emerald-600 dark:text-emerald-400">
            Answer: ¬p : “Swadeep is not present in class.”
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
            In JavaScript, negation is written as <code>!</code>.  
            Example: <code>if(!isLoggedIn)</code> checks if the user is NOT logged in.
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
            <li>Writing “not p” without changing the full meaning.</li>
            <li>Negating only part of the sentence.</li>
            <li>Negating questions or commands.</li>
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
            Think about opposite situations in real life — present vs absent,
            open vs closed.
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
            <li>Can I form ¬p correctly?</li>
            <li>Do I reverse the truth value properly?</li>
            <li>Am I negating the complete statement?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
