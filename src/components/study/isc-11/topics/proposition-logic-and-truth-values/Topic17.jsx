// src/components/study/isc/class11/logic/Topic17.jsx
// Topic 18: Common Errors in Forming Propositions
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

export default class Topic17 extends Component {
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
          Common Errors in Forming Propositions
        </h1>
        <p className="text-lg">
          Many mistakes in propositional logic occur not in calculation,
          but in <strong>misunderstanding what is a proposition</strong>.
        </p>
      </div>

      {/* Error Types */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">❌ Using Commands</h2>
          <p>
            Commands do not have truth values.
          </p>
          <p className="mt-2">
            Example: <em>“Open the door.”</em> – Not a proposition.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">❌ Using Questions</h2>
          <p>
            Questions cannot be true or false.
          </p>
          <p className="mt-2">
            Example: <em>“Is Swadeep present?”</em> – Not a proposition.
          </p>
        </div>
      </div>

      {/* Confusion Section */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">❌ Mixing Opinions</h2>
          <p>
            Statements like <em>“Math is fun”</em> depend on feelings — not facts.
            Hence they are not propositions.
          </p>
        </div>
      </div>

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Question</h2>
          <p>
            Identify which of the following are propositions:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>“Barrackpore is in West Bengal.”</li>
            <li>“Please bring my notebook.”</li>
            <li>“Is today Monday?”</li>
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
            In programming, conditions must evaluate to either true or false.
            If your condition is ambiguous, your program logic breaks.
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
            <li>Assuming every English sentence is a proposition.</li>
            <li>Confusing facts with opinions.</li>
            <li>Not checking truth value possibility.</li>
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
            Ask yourself: “Can this sentence be clearly true or clearly false?”
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
            <li>Does it have a truth value?</li>
            <li>Is it free from emotion or command?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
