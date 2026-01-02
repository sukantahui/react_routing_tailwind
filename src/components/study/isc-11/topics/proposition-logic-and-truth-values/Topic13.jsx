// src/components/study/isc/class11/logic/Topic13.jsx
// Topic 14: Common Logical Symbols and Their Meanings
// React 19 – CLASS-BASED COMPONENT ONLY
// Tailwind CSS – ZERO CONFIG, NO PLUGINS, NO EXTERNAL ANIMATION LIBRARIES

import React, { Component } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  BookOpen,
} from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity:0; transform: translateY(18px); }
  100% { opacity:1; transform: translateY(0); }
}
`;

export default class Topic13 extends Component {
  constructor(props){
    super(props);
    this.state={ mounted:false };
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

    const symbols = [
      { sym:"¬", name:"Negation", pronounce:"not", meaning:"Reverses the truth value", example:"¬p" },
      { sym:"∧", name:"Conjunction", pronounce:"and", meaning:"True only if both are true", example:"p ∧ q" },
      { sym:"∨", name:"Disjunction", pronounce:"or", meaning:"True if at least one is true", example:"p ∨ q" },
      { sym:"→", name:"Implication", pronounce:"implies", meaning:"If p then q", example:"p → q" },
      { sym:"↔", name:"Biconditional", pronounce:"if and only if", meaning:"Both same truth value", example:"p ↔ q" }
    ];

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
      <style>{animationStyles}</style>

      {/* Header */}
      <div className={reveal}>
        <h1 className="text-3xl font-semibold mb-4">
          Common Logical Symbols and Their Meanings
        </h1>
        <p className="text-lg">
          Logical symbols are the language of logic. They allow us to write long
          English statements in compact symbolic form.
        </p>
      </div>

      {/* Symbol Table */}
      <div className={`mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
            <BookOpen size={20}/> Symbol Table
          </h2>
          <table className="w-full border-collapse text-sm">
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
              {symbols.map((s,i)=>(
                <tr key={i} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <td className="p-2 text-center font-bold">{s.sym}</td>
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

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
          <p>
            Write the symbolic form of:  
            “If Swadeep is present then the lab is open.”
          </p>
          <p className="mt-2 text-emerald-600 dark:text-emerald-400">
            Answer: p → q
          </p>
        </div>
      </div>

      {/* Professional Insight */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={`${card} border-l-4 border-indigo-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Lightbulb size={20}/> Professional Insight
          </h2>
          <p>
            In programming languages, logical symbols appear as:
            <code>!</code>, <code>&&</code>, <code>||</code>, <code>if</code>.
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
            <li>Confusing → with cause-effect.</li>
            <li>Thinking ↔ means only both true.</li>
            <li>Using OR when AND is needed.</li>
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
            Always read symbols aloud — it prevents interpretation mistakes.
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
            <li>Can I name each symbol?</li>
            <li>Can I pronounce them?</li>
            <li>Can I apply them in questions?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
