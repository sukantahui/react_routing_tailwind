// src/components/study/isc/class11/logic/Topic14.jsx
// Topic 15: Word Problems Based on Propositions
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

export default class Topic14 extends Component {
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
          Word Problems Based on Propositions
        </h1>
        <p className="text-lg">
          Word problems require translating real-life situations into symbolic
          logic expressions before evaluation.
        </p>
      </div>

      {/* Concept */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🔍 What are Word Problems?</h2>
          <p>
            These are descriptive questions where students must identify propositions,
            assign variables, and form logical expressions.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🎯 Purpose</h2>
          <p>
            They develop logical reasoning and prepare students for complex truth
            table questions in ISC exams.
          </p>
        </div>
      </div>

      {/* Worked Example */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">Worked Example</h2>
          <p>
            Statement: “Swadeep is present and the computer lab is open.”  
            Let p = “Swadeep is present”  
            Let q = “The computer lab is open”
          </p>
          <p className="mt-2 text-emerald-600 dark:text-emerald-400">
            Symbolic form: p ∧ q
          </p>
        </div>
      </div>

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Questions</h2>
          <ul className="list-disc pl-5">
            <li>
              Let p: “Abhronila is present”, q: “The class is silent”.  
              Write symbolic form of: “Abhronila is present or the class is silent”.
            </li>
            <li>
              Translate into symbols: “It is not raining.”
            </li>
            <li>
              Let p: “The library is open”, q: “Students are inside”.  
              Write symbolic form of: “The library is open and students are inside”.
            </li>
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
            In programming, every real-life rule (like login validation) is first
            converted into logical conditions — just like these word problems.
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
            <li>Forgetting to define variables.</li>
            <li>Using wrong logical connectives.</li>
            <li>Skipping negation words like “not”.</li>
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
            Break each long sentence into small parts before converting into symbols.
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
            <li>Did I define p, q, r?</li>
            <li>Did I translate every word?</li>
            <li>Is my symbolic form clear?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
