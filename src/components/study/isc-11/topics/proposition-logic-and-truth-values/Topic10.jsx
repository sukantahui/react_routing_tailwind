// src/components/study/isc/class11/logic/Topic10.jsx
// Topic 11: Translation of English Statements into Symbolic Form
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

export default class Topic10 extends Component {
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

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
      <style>{animationStyles}</style>

      {/* Header */}
      <div className={reveal}>
        <h1 className="text-3xl font-semibold mb-4">
          Translation of English Statements into Symbolic Form
        </h1>
        <p className="text-lg">
          Translating English statements into symbolic logic is a core skill for
          solving ISC examination questions on propositional logic.
        </p>
      </div>

      {/* Concept Explanation */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🔤 What is Translation?</h2>
          <p>
            Translation means converting real-world English sentences into
            logical symbols like <strong>p ∧ q</strong> or <strong>¬p</strong>.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🎯 Purpose</h2>
          <p>
            Symbolic representation removes ambiguity and makes truth table
            construction easier and faster.
          </p>
        </div>
      </div>

      {/* Step-by-Step */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">Step-by-Step Translation</h2>
          <p>
            Sentence: “Swadeep is present and the lab is open.”
          </p>
          <p className="mt-2">
            Let p = “Swadeep is present” <br/>
            Let q = “The lab is open” <br/>
            Symbolic form: <strong>p ∧ q</strong>
          </p>
        </div>
      </div>

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Questions</h2>
          <ul className="list-disc pl-5">
            <li>Translate: “Abhronila is absent or the class is silent.”</li>
            <li>Translate: “It is not raining.”</li>
            <li>Translate: “The computer lab is open and students are present.”</li>
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
            Software engineers mentally convert conditions into symbols while
            writing <code>if()</code> statements — exactly what you practise here.
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
            <li>Ignoring words like “not”.</li>
            <li>Using wrong connective.</li>
            <li>Not defining p and q clearly.</li>
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
            Think about each small sentence separately before joining them with symbols.
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
            <li>Did I define variables?</li>
            <li>Did I identify AND / OR / NOT correctly?</li>
            <li>Is the final symbolic form clear?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
