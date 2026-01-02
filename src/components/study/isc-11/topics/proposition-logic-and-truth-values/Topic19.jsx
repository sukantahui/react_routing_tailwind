// src/components/study/isc/class11/logic/Topic19.jsx
// Topic 20: Word Problems Based on Propositions
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

export default class Topic19 extends Component {
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
          In ISC exams, you are often given real-life sentences and asked to
          convert them into symbolic form and evaluate them logically.
        </p>
      </div>

      {/* Concept */}
      <div className={`mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📖 What is a Word Problem?</h2>
          <p>
            A word problem describes situations using English sentences.
            Your task is to:
          </p>
          <div className="mt-2">
            <ul className="list-disc pl-5">
              <li>Identify propositions.</li>
              <li>Assign propositional variables.</li>
              <li>Write symbolic expressions.</li>
              <li>Find truth values.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Example 1 */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🧠 Example 1</h2>
          <p>
            Swadeep lives in Barrackpore and the school is closed today.
          </p>
          <div className="mt-2">
            <p>Let p: “Swadeep lives in Barrackpore”</p>
            <p>Let q: “The school is closed today”</p>
            <p className="mt-2 font-semibold">
              Symbolic form: p ∧ q
            </p>
          </div>
        </div>
      </div>

      {/* Example 2 */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🧠 Example 2</h2>
          <p>
            Abhronila is present or the computer lab in Ichapur is open.
          </p>
          <div className="mt-2">
            <p>Let p: “Abhronila is present”</p>
            <p>Let q: “The computer lab in Ichapur is open”</p>
            <p className="mt-2 font-semibold">
              Symbolic form: p ∨ q
            </p>
          </div>
        </div>
      </div>

      {/* ISC Pattern Questions */}
      <div className={`mt-12 ${reveal} animation-delay-[480ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Questions</h2>
          <div className="mt-2">
            <ul className="list-decimal pl-5 space-y-2">
              <li>
                Tuhina is in class XI and the library is open. Write symbolic form.
              </li>
              <li>
                The train reaches Naihati or the exam is postponed.
              </li>
              <li>
                Swadeep is absent and today is Monday.
              </li>
              <li>
                Barrackpore is in West Bengal or Ichapur is in Kolkata.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Insight */}
      <div className={`mt-12 ${reveal} animation-delay-[600ms]`}>
        <div className={`${card} border-l-4 border-indigo-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <Lightbulb size={20}/> Professional Insight
          </h2>
          <p>
            Software engineers convert real-world requirements into Boolean
            conditions exactly like these word problems.
          </p>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className={`mt-12 ${reveal} animation-delay-[720ms]`}>
        <div className={`${card} border-l-4 border-amber-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <AlertTriangle size={20}/> Common Pitfalls
          </h2>
          <div>
            <ul className="list-disc pl-5">
              <li>Assigning wrong variables.</li>
              <li>Using AND instead of OR.</li>
              <li>Forgetting to define p and q.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className={`mt-12 ${reveal} animation-delay-[840ms]`}>
        <div className={`${card} border-l-4 border-sky-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <HelpCircle size={20}/> Hint
          </h2>
          <p>
            Break every long sentence into two simple facts before assigning symbols.
          </p>
        </div>
      </div>

      {/* Mini Checklist */}
      <div className={`mt-12 ${reveal} animation-delay-[960ms]`}>
        <div className={`${card} border-l-4 border-emerald-400`}>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
            <CheckCircle2 size={20}/> Mini Checklist
          </h2>
          <div>
            <ul className="list-disc pl-5">
              <li>Did I split the sentence correctly?</li>
              <li>Did I assign symbols clearly?</li>
              <li>Did I choose the right connective?</li>
            </ul>
          </div>
        </div>
      </div>

      </section>
    );
  }
}
