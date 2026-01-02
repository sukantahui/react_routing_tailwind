// src/components/study/isc/class11/logic/Topic18.jsx
// Topic 19: Practice Set on Truth Value Evaluation
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

export default class Topic18 extends Component {
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
          Practice Set on Truth Value Evaluation
        </h1>
        <p className="text-lg">
          This practice set will help you master identifying truth values of
          simple and compound propositions — a core skill for ISC exams.
        </p>
      </div>

      {/* Instructions */}
      <div className={`mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📝 Instructions</h2>
          <p>
            For each question, decide whether the given statement or expression
            is <strong>True (T)</strong> or <strong>False (F)</strong>.
          </p>
        </div>
      </div>

      {/* Practice Questions */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-4">📘 Practice Questions</h2>
          <div className="space-y-3">
            <p>1. “Barrackpore is in West Bengal.”</p>
            <p>2. “29 is divisible by 3.”</p>
            <p>3. Let p: “Swadeep is present.” State the truth value of ¬p if p is True.</p>
            <p>4. Let p: True, q: False. Find the truth value of p ∧ q.</p>
            <p>5. Let p: False, q: False. Find the truth value of p ∨ q.</p>
            <p>6. “A square has three sides.”</p>
            <p>7. Let p: True. Find truth value of p ∨ ¬p.</p>
            <p>8. Let p: False. Find truth value of p ∧ ¬p.</p>
            <p>9. “Ichapur is north of Barrackpore.”</p>
            <p>10. Let p: True, q: True. Find truth value of p ∧ q.</p>
          </div>
        </div>
      </div>

      {/* Professional Insight */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={`${card} border-l-4 border-indigo-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Lightbulb size={20}/> Professional Insight
          </h2>
          <p>
            In programming, every condition is evaluated to either True or False.
            Understanding truth values is the foundation of all decision-making logic.
          </p>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className={`mt-12 ${reveal} animation-delay-[480ms]`}>
        <div className={`${card} border-l-4 border-amber-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <AlertTriangle size={20}/> Common Pitfalls
          </h2>
          <div>
            <ul className="list-disc pl-5">
              <li>Forgetting to negate properly.</li>
              <li>Assuming OR means both must be true.</li>
              <li>Not checking given truth values.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className={`mt-12 ${reveal} animation-delay-[600ms]`}>
        <div className={`${card} border-l-4 border-sky-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <HelpCircle size={20}/> Hint
          </h2>
          <p>
            Always write down p and q values first before evaluating expressions.
          </p>
        </div>
      </div>

      {/* Mini Checklist */}
      <div className={`mt-12 ${reveal} animation-delay-[720ms]`}>
        <div className={`${card} border-l-4 border-emerald-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <CheckCircle2 size={20}/> Mini Checklist
          </h2>
          <div>
            <ul className="list-disc pl-5">
              <li>Did I identify the proposition correctly?</li>
              <li>Did I apply NOT before AND / OR?</li>
              <li>Did I check real-world truth carefully?</li>
            </ul>
          </div>
        </div>
      </div>

      </section>
    );
  }
}
