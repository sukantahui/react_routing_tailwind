// src/components/study/icse-java-9/topics/while-do-while/Topic1.jsx
// Topic 2: do-while loop — ICSE Class IX

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

export default class Topic1 extends Component {
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
          Iterative Constructs – do-while Loop
        </h1>

        {/* ===== CONCEPT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[120ms]`}>
          <h2 className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white">
            <BookOpen size={18}/> What is a do-while loop?
          </h2>
          <p>
            A <strong>do-while loop</strong> is similar to the while loop,
            but the condition is checked <em>after</em> the loop body executes.
            Therefore, the loop body is guaranteed to run at least once.
          </p>
          <p className="mt-2">
            Example: Abhronila at Ichapur always shows the menu at least once,
            even if the user immediately chooses to exit.
          </p>
        </div>

        {/* ===== MERMAID FLOW ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[240ms]`}>
          <div className="mermaid">
{`
flowchart TD
  A["Start"] --> B["Execute Statements"]
  B --> C["Check Condition"]
  C -->|True| B
  C -->|False| D["Exit Loop"]
`}
          </div>
        </div>

        {/* ===== SYNTAX ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[360ms]`}>
          <p className="font-medium text-slate-900 dark:text-white">Prototype / Signature:</p>
          <code className="block mt-1">
            do &#123; statements; &#125; while(condition);
          </code>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Return type:</strong> none</li>
            <li><strong>Purpose:</strong> execute at least once</li>
            <li><strong>When to use:</strong> menu-driven programs</li>
          </ul>
        </div>

        {/* ===== EXAMPLES ===== */}
        <div className={`${card} mb-6 ${reveal} animation-delay-[480ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 1 – Print numbers 1 to 5
          </h3>
          <JavaCodeBlock code={`int i = 1;
do{
  System.out.print(i + " ");
  i++;
}while(i <= 5);`} />
        </div>

        <div className={`${card} mb-6 ${reveal} animation-delay-[600ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 2 – Menu shown at least once
          </h3>
          <JavaCodeBlock code={`int choice;
do{
  System.out.println("1. Add");
  System.out.println("2. Exit");
  choice = 2;
}while(choice != 2);`} />
        </div>

        <div className={`${card} mb-10 ${reveal} animation-delay-[720ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 3 – Reverse digits using do-while
          </h3>
          <JavaCodeBlock code={`int n = 120, rev = 0;
do{
  rev = rev * 10 + (n % 10);
  n = n / 10;
}while(n > 0);`} />
        </div>

        {/* ===== HINT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
          <h2 className="flex items-center gap-2"><Lightbulb size={18}/> Hint</h2>
          <p>Observe carefully how do-while behaves when the condition is false initially.</p>
        </div>

        {/* ===== PITFALLS ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[960ms]`}>
          <h2 className="flex items-center gap-2"><AlertTriangle size={18}/> Common Pitfalls</h2>
          <ul className="list-disc pl-5">
            <li>Missing semicolon after while(condition)</li>
            <li>Assuming it behaves like while loop</li>
            <li>Forgetting update statement</li>
          </ul>
        </div>

        {/* ===== CHECKLIST ===== */}
        <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[1080ms]`}>
          <h2 className="flex items-center gap-2"><CheckCircle2 size={18}/> Mini Checklist</h2>
          <ul className="list-disc pl-5">
            <li>Body executes at least once</li>
            <li>Condition placed at bottom</li>
            <li>Update present</li>
          </ul>
        </div>

      </section>
    );
  }
}
