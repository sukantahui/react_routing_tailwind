// src/components/study/isc/class11/logic/Topic6.jsx
// Topic 7: Logical Connectives – NOT (¬), AND (∧), OR (∨)
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

export default class Topic6 extends Component {
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
          Logical Connectives – NOT (¬), AND (∧), OR (∨)
        </h1>
        <p className="text-lg">
          Logical connectives join or modify propositions to form compound statements.
          They are the building blocks of all conditions used in programming.
        </p>
      </div>

      {/* Connectives Explanation */}
      <div className={`grid md:grid-cols-3 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">¬ NOT (Negation)</h2>
          <p>
            Prototype: ¬p <br/>
            Purpose: Reverses the truth value of p. <br/>
            Example: p: “The lab is open” → ¬p: “The lab is not open”.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">∧ AND (Conjunction)</h2>
          <p>
            Prototype: p ∧ q <br/>
            Purpose: True only if both p and q are true. <br/>
            Example: “Swadeep is present and the class is silent.”
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">∨ OR (Disjunction)</h2>
          <p>
            Prototype: p ∨ q <br/>
            Purpose: True if at least one is true. <br/>
            Example: “Abhronila is present or the lab is open.”
          </p>
        </div>
      </div>

      {/* Truth Table */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-3">Truth Table</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-2">p</th>
                <th className="p-2">q</th>
                <th className="p-2">¬p</th>
                <th className="p-2">p ∧ q</th>
                <th className="p-2">p ∨ q</th>
              </tr>
            </thead>
            <tbody>
              {["T","F"].map((p,i)=>["T","F"].map((q,j)=>(
                <tr key={`${i}${j}`} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <td className="p-2 text-center">{p}</td>
                  <td className="p-2 text-center">{q}</td>
                  <td className="p-2 text-center">{p==="T"?"F":"T"}</td>
                  <td className="p-2 text-center">{p==="T" && q==="T"?"T":"F"}</td>
                  <td className="p-2 text-center">{p==="T" || q==="T"?"T":"F"}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
          <p>
            Let p be true and q be false. Find the truth value of:  
            <strong>p ∧ q</strong> and <strong>p ∨ q</strong>.
          </p>
          <p className="mt-2 text-emerald-600 dark:text-emerald-400">
            Answer: p ∧ q = False, p ∨ q = True
          </p>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className={`mt-12 ${reveal} animation-delay-[480ms]`}>
        <div className={`${card} border-l-4 border-amber-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <AlertTriangle size={20}/> Common Pitfalls
          </h2>
          <ul className="list-disc pl-5">
            <li>Confusing OR with AND.</li>
            <li>Forgetting to negate the entire statement.</li>
            <li>Missing brackets in compound expressions.</li>
          </ul>
        </div>
      </div>

      {/* Hint */}
      <div className={`mt-12 ${reveal} animation-delay-[600ms]`}>
        <div className={`${card} border-l-4 border-sky-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <HelpCircle size={20}/> Hint
          </h2>
          <p>
            Think about real-life examples like attendance and lab status to understand
            how AND / OR behave.
          </p>
        </div>
      </div>

      {/* Mini Checklist */}
      <div className={`mt-12 ${reveal} animation-delay-[720ms]`}>
        <div className={`${card} border-l-4 border-emerald-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <CheckCircle2 size={20}/> Mini Checklist
          </h2>
          <ul className="list-disc pl-5">
            <li>Can I write truth tables for ¬, ∧, ∨?</li>
            <li>Do I understand when OR becomes false?</li>
            <li>Can I translate English sentences into symbols?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
