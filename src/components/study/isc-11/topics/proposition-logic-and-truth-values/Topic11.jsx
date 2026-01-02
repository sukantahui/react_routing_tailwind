// src/components/study/isc/class11/logic/Topic11.jsx
// Topic 12: Translation of Symbolic Statements into English Form
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

export default class Topic11 extends Component {
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
          Translation of Symbolic Statements into English Form
        </h1>
        <p className="text-lg">
          Converting symbolic expressions back into English sentences helps verify
          that the original meaning is correctly understood.
        </p>
      </div>

      {/* Meaning */}
      <div className={`grid md:grid-cols-2 gap-6 mt-10 ${reveal} animation-delay-[120ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🔤 What is Reverse Translation?</h2>
          <p>
            Reverse translation means converting expressions like 
            <strong> p ∧ q </strong> into meaningful English sentences.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">🎯 Purpose</h2>
          <p>
            It ensures that symbolic statements actually reflect the original meaning.
          </p>
        </div>
      </div>

      {/* Example */}
      <div className={`mt-12 ${reveal} animation-delay-[240ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">Example</h2>
          <p>
            Let p = “Tuhina is present”  
            Let q = “The class is silent”  
          </p>
          <p className="mt-2">
            Symbolic Form: <strong> p ∧ q </strong>  
            English: “Tuhina is present and the class is silent.”
          </p>
        </div>
      </div>

      {/* ISC Pattern */}
      <div className={`mt-12 ${reveal} animation-delay-[360ms]`}>
        <div className={card}>
          <h2 className="text-xl font-semibold mb-2">📄 ISC Pattern Questions</h2>
          <ul className="list-disc pl-5">
            <li>Let p: “It is raining” and q: “The playground is wet”. Translate: p ∨ q.</li>
            <li>Translate ¬p where p: “The library is open”.</li>
            <li>Let p: “Students are present”, q: “The lab is open”. Translate p ∧ q.</li>
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
            Programmers often debug code by converting logical conditions into plain English.
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
            <li>Forgetting the meaning of variables.</li>
            <li>Ignoring negation.</li>
            <li>Using incorrect English connectors.</li>
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
            Always rewrite p and q in words before forming the full sentence.
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
            <li>Did I replace every symbol correctly?</li>
            <li>Did I keep the sentence meaningful?</li>
            <li>Does the English match the logic?</li>
          </ul>
        </div>
      </div>

      </section>
    );
  }
}
