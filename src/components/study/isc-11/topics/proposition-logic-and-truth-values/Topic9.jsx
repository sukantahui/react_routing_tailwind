// src/components/study/isc/class11/logic/Topic9.jsx
// Topic 10: Truth Tables for Compound Statements
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

export default class Topic9 extends Component {
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

    const card =
      "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
      <style>{animationStyles}</style>

      {/* Header */}
      <div className={reveal}>
        <h1 className="text-3xl font-semibold mb-4">
          Truth Tables for Compound Statements
        </h1>
        <p className="text-lg">
          Truth tables help us systematically evaluate complex logical expressions
          involving multiple propositions and connectives.
        </p>
      </div>

      {/* Why Truth Tables */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📌 Purpose</h2>
          <p>
            Truth tables allow us to compute the final truth value of expressions like
            <strong> (p ∧ q) ∨ ¬r </strong> for all possible combinations.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🎯 Return Type</h2>
          <p>
            Every column in a truth table results in a Boolean output:
            <strong> True (T)</strong> or <strong> False (F)</strong>.
          </p>
        </div>
      </div>

      {/* Example Table */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-3">
            Truth Table for (p ∧ q) ∨ ¬p
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-2">p</th>
                <th className="p-2">q</th>
                <th className="p-2">p ∧ q</th>
                <th className="p-2">¬p</th>
                <th className="p-2">(p ∧ q) ∨ ¬p</th>
              </tr>
            </thead>
            <tbody>
              {["T","F"].map((p,i)=>["T","F"].map((q,j)=>(
                <tr key={`${i}${j}`} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <td className="p-2 text-center">{p}</td>
                  <td className="p-2 text-center">{q}</td>
                  <td className="p-2 text-center">{p==="T" && q==="T"?"T":"F"}</td>
                  <td className="p-2 text-center">{p==="T"?"F":"T"}</td>
                  <td className="p-2 text-center">
                    {(p==="T" && q==="T") || p==="F" ? "T" : "F"}
                  </td>
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
            Construct the truth table for:  
            <strong> (p ∨ q) ∧ ¬q </strong>
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
            In programming, complex conditions are evaluated exactly like truth tables —
            step by step from inner expressions to the final condition.
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
            <li>Skipping intermediate columns.</li>
            <li>Applying NOT to wrong variable.</li>
            <li>Ignoring operator precedence.</li>
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
            Always compute from the smallest bracketed expression first.
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
            <li>Have I written all combinations?</li>
            <li>Did I create intermediate columns?</li>
            <li>Is my final column correct?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
