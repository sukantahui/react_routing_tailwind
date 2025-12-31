// src/components/study/icse-java-9/topics/while-do-while/Topic3.jsx
// Topic 4: Jump Statements – break and continue

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";
import mermaid from "mermaid";
import { Lightbulb, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

/* =========================================================
   Inline Scoped Animations — ZERO CONFIG
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0%{opacity:0; transform:translateY(16px);}
  100%{opacity:1; transform:translateY(0);}
}
`;

export default class Topic3 extends Component {
  constructor(props){
    super(props);
    this.state = { mounted:false };
  }

  componentDidMount(){
    this.setState({ mounted:true });

    mermaid.initialize({
      startOnLoad:false,
      securityLevel:"loose",
      theme:"default"
    });

    setTimeout(()=>{
      mermaid.run({ nodes: document.querySelectorAll(".mermaid") });
    },0);
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-slate-900/80 hover:shadow-lg transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        <h1 className={`text-3xl font-semibold text-slate-900 dark:text-white mb-6 ${reveal}`}>
          Jump Statements – break and continue
        </h1>

        {/* ===== CONCEPT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[120ms]`}>
          <h2 className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white">
            <BookOpen size={18}/> What are Jump Statements?
          </h2>
          <p>
            Jump statements allow you to <strong>change the normal flow</strong>
            of a loop. The most commonly used jump statements are
            <strong> break</strong> and <strong>continue</strong>.
          </p>
          <p className="mt-2">
            Example: At Naihati centre, Swadeep stops checking answer sheets as soon
            as he finds a wrong format – that is like <strong>break</strong>.
            But Abhronila skips absent students and continues attendance – that is
            like <strong>continue</strong>.
          </p>
        </div>

        {/* ===== MERMAID FLOW ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[240ms]`}>
          <div className="mermaid">
{`
flowchart TD
  A["Loop Start"] --> B["Check Condition"]
  B -->|True| C["Execute Body"]
  C --> D{"break ?"}
  D -->|Yes| E["Exit Loop"]
  D -->|No| F{"continue ?"}
  F -->|Yes| B
  F -->|No| G["Next Statement"]
  G --> B
  B -->|False| E
`}
          </div>
        </div>

        {/* ===== BREAK ===== */}
        <div className={`${card} mb-6 ${reveal} animation-delay-[360ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            break Statement
          </h3>
          <p className="mb-2">
            <strong>Prototype / Signature:</strong> <code>break;</code><br/>
            <strong>Purpose:</strong> Immediately terminate the loop.
          </p>
          <JavaCodeBlock code={`for(int i=1;i<=10;i++){
  if(i==5)
    break;
  System.out.print(i + " ");
}`} />
        </div>

        {/* ===== CONTINUE ===== */}
        <div className={`${card} mb-6 ${reveal} animation-delay-[480ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            continue Statement
          </h3>
          <p className="mb-2">
            <strong>Prototype / Signature:</strong> <code>continue;</code><br/>
            <strong>Purpose:</strong> Skip current iteration and move to next.
          </p>
          <JavaCodeBlock code={`for(int i=1;i<=5;i++){
  if(i==3)
    continue;
  System.out.print(i + " ");
}`} />
        </div>

        {/* ===== REAL WORLD ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[600ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Real-World Example
          </h3>
          <JavaCodeBlock code={`for(int roll=1; roll<=10; roll++){
  if(roll==6)  // student absent
    continue;
  if(roll==9)  // fire drill!
    break;
  System.out.println("Checked roll " + roll);
}`} />
        </div>

        {/* ===== HINT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[720ms]`}>
          <h2 className="flex items-center gap-2"><Lightbulb size={18}/> Hint</h2>
          <p>Try placing break and continue inside different conditions.</p>
        </div>

        {/* ===== PITFALLS ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
          <h2 className="flex items-center gap-2"><AlertTriangle size={18}/> Common Pitfalls</h2>
          <ul className="list-disc pl-5">
            <li>Using break when continue is needed</li>
            <li>Placing break outside loop → compiler error</li>
            <li>Forgetting that continue skips remaining statements</li>
          </ul>
        </div>

        {/* ===== CHECKLIST ===== */}
        <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[960ms]`}>
          <h2 className="flex items-center gap-2"><CheckCircle2 size={18}/> Mini Checklist</h2>
          <ul className="list-disc pl-5">
            <li>break exits loop completely</li>
            <li>continue skips only current iteration</li>
            <li>Use carefully to avoid logic errors</li>
          </ul>
        </div>

      </section>
    );
  }
}
