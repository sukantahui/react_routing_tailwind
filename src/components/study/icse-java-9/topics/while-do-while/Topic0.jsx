// src/components/study/icse-java-9/topics/while-do-while/Topic0.jsx
// Topic 1: while loop — ICSE Class IX

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

export default class Topic0 extends Component {
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
          Iterative Constructs – while Loop
        </h1>

        {/* ===== CONCEPT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[120ms]`}>
          <h2 className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white">
            <BookOpen size={18}/> What is a while loop?
          </h2>
          <p>
            A <strong>while loop</strong> executes a block of code repeatedly
            as long as the given condition remains <strong>true</strong>.
            The condition is checked <em>before</em> the loop body runs.
          </p>
          <p className="mt-2">
            Example: In Barrackpore coaching centre, Ritaja keeps checking the
            attendance list <em>while</em> students are still entering the room.
          </p>
        </div>

        {/* ===== MERMAID FLOW ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[240ms]`}>
          <div className="mermaid">
{`
flowchart TD
  A["Start"] --> B["Check Condition"]
  B -->|True| C["Execute Statements"]
  C --> D["Update Variable"]
  D --> B
  B -->|False| E["Exit Loop"]
`}
          </div>
        </div>

        {/* ===== SYNTAX ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[360ms]`}>
          <p className="font-medium text-slate-900 dark:text-white">Prototype / Signature:</p>
          <code className="block mt-1">while(condition) &#123; statements; &#125;</code>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Return type:</strong> none</li>
            <li><strong>Purpose:</strong> repeat unknown number of times</li>
            <li><strong>When to use:</strong> when iteration count is not fixed</li>
          </ul>
        </div>

        {/* ===== EXAMPLES ===== */}
        <div className={`${card} mb-6 ${reveal} animation-delay-[480ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 1 – Print numbers from 1 to 5
          </h3>
          <JavaCodeBlock code={`int i = 1;
while(i <= 5){
  System.out.print(i + " ");
  i++;
}`} />
        </div>

        <div className={`${card} mb-6 ${reveal} animation-delay-[600ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 2 – Sum of digits
          </h3>
          <JavaCodeBlock code={`int n = 248, sum = 0;
while(n > 0){
  sum += n % 10;
  n = n / 10;
}`} />
        </div>

        <div className={`${card} mb-10 ${reveal} animation-delay-[720ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 3 – Reverse a number
          </h3>
          <JavaCodeBlock code={`int n = 1234, rev = 0;
while(n > 0){
  rev = rev * 10 + (n % 10);
  n = n / 10;
}`} />
        </div>

        {/* ===== HINT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
          <h2 className="flex items-center gap-2"><Lightbulb size={18}/> Hint</h2>
          <p>Think about what will happen if the update statement is removed.</p>
        </div>

        {/* ===== PITFALLS ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[960ms]`}>
          <h2 className="flex items-center gap-2"><AlertTriangle size={18}/> Common Pitfalls</h2>
          <ul className="list-disc pl-5">
            <li>Forgetting to update loop variable → infinite loop</li>
            <li>Wrong condition causing zero execution</li>
            <li>Not initializing variables</li>
          </ul>
        </div>

        {/* ===== CHECKLIST ===== */}
        <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[1080ms]`}>
          <h2 className="flex items-center gap-2"><CheckCircle2 size={18}/> Mini Checklist</h2>
          <ul className="list-disc pl-5">
            <li>Initialization done</li>
            <li>Condition meaningful</li>
            <li>Update included</li>
          </ul>
        </div>

      </section>
    );
  }
}
