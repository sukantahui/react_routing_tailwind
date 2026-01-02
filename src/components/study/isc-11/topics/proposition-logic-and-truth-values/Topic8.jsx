// src/components/study/isc/class11/logic/Topic8.jsx
// Topic 9: Conjunction (AND) & Disjunction (OR) – Real-Life Examples
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

export default class Topic8 extends Component {
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
          Conjunction (AND) & Disjunction (OR) – Real-Life Examples
        </h1>
        <p className="text-lg">
          Conjunction and Disjunction combine two propositions to form a single logical statement.
          These operators are the backbone of decision-making in both logic and computer programs.
        </p>
      </div>

      {/* Meaning Section */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">∧ Conjunction (AND)</h2>
          <p>
            Prototype: <strong>p ∧ q</strong><br/>
            Return Type: <strong>Boolean</strong><br/>
            Purpose: True only when both p and q are true.
          </p>
          <p className="mt-3">
            Example: “Swadeep is present AND the lab is open.”
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">∨ Disjunction (OR)</h2>
          <p>
            Prototype: <strong>p ∨ q</strong><br/>
            Return Type: <strong>Boolean</strong><br/>
            Purpose: True if at least one of p or q is true.
          </p>
          <p className="mt-3">
            Example: “Abhronila is present OR the lab is open.”
          </p>
        </div>
      </div>

      {/* Truth Table */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-3">Truth Table</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b dark:border-slate-700">
                <th className="p-2">p</th>
                <th className="p-2">q</th>
                <th className="p-2">p ∧ q</th>
                <th className="p-2">p ∨ q</th>
              </tr>
            </thead>
            <tbody>
              {["T","F"].map((p,i)=>["T","F"].map((q,j)=>(
                <tr key={`${i}${j}`} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <td className="p-2 text-center">{p}</td>
                  <td className="p-2 text-center">{q}</td>
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
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Questions</h2>
          <ul className="list-disc pl-5">
            <li>Let p = True, q = False. Find p ∧ q.</li>
            <li>State the truth value of: “7 is even AND 3 is prime.”</li>
            <li>Write the symbolic form of: “Tuhina is present or the class is silent.”</li>
          </ul>
        </div>
      </div>

      {/* Professional Insight */}
      <div className={`mt-12 ${reveal} animation-delay-[480ms]`}>
        <div className={`${card} border-l-4 border-indigo-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Lightbulb size={20}/> Professional Insight
          </h2>
          <p>
            In programming, AND is written as <code>&&</code> and OR as <code>||</code>.  
            Example: <code>if(isLoggedIn && hasPermission)</code>
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
            <li>Assuming OR means exactly one must be true.</li>
            <li>Ignoring brackets in complex expressions.</li>
            <li>Mixing up English meaning of OR with logical OR.</li>
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
            Think about exam rules: to pass, you need attendance AND marks. That is conjunction.
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
            <li>Can I build truth tables for AND & OR?</li>
            <li>Can I convert English sentences into symbols?</li>
            <li>Do I understand when OR is false?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
