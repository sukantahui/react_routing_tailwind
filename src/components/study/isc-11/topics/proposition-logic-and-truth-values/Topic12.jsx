// src/components/study/isc/class11/logic/Topic12.jsx
// Topic 13: Identification of Propositions in a Paragraph
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

export default class Topic12 extends Component {
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
          Identification of Propositions in a Paragraph
        </h1>
        <p className="text-lg">
          In ISC exams, you are often asked to identify which sentences in a paragraph
          are propositions and which are not.
        </p>
      </div>

      {/* Concept */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🔍 What is Identification?</h2>
          <p>
            Identification means separating <strong>declarative sentences</strong>
            that have truth values from commands, questions and exclamations.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🎯 Why Important?</h2>
          <p>
            Only propositions can be converted into symbolic logic and truth tables.
          </p>
        </div>
      </div>

      {/* Paragraph Example */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">Paragraph Example</h2>
          <p>
            “Swadeep is present in class. Please close the door.  
            The lab is open. How are you today?”
          </p>
          <p className="mt-3">
            Propositions:
            <ul className="list-disc pl-5">
              <li>Swadeep is present in class.</li>
              <li>The lab is open.</li>
            </ul>
          </p>
        </div>
      </div>

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
          <p>
            Identify propositions from:  
            “Abhronila is absent. Sit down. The classroom is silent. What is your name?”
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
            In programming, only Boolean expressions are allowed inside conditions —
            similar to using only propositions in logic.
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
            <li>Considering questions as propositions.</li>
            <li>Including commands.</li>
            <li>Missing emotional sentences.</li>
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
            Ask yourself — can this sentence be true or false?
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
            <li>Is the sentence declarative?</li>
            <li>Does it avoid commands/questions?</li>
            <li>Can it be true or false?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
