// src/components/study/java-core/control-flow/Topic3.jsx
// Topic 4: Nested if Statement — MERMAID v11 SAFE

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";
import mermaid from "mermaid";
import { Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0%{opacity:0; transform:translateY(18px);}
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
      startOnLoad: false,
      securityLevel: "loose",
      theme: "default",
    });

    setTimeout(() => {
      mermaid.run({ nodes: document.querySelectorAll(".mermaid") });
    }, 0);
  }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-slate-900/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        <h1 className={`text-3xl font-semibold text-slate-900 dark:text-white mb-6 ${reveal}`}>
          Java Control Flow – Nested if Statement
        </h1>

        {/* ===== THEORY ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[120ms]`}>
          <p>
            Nested if means an if condition inside another if.
            The inner condition is evaluated only when the outer condition is true.
          </p>
        </div>

        {/* ===== MERMAID DIAGRAM ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[240ms]`}>
          <div className="mermaid">
            {`
flowchart TD
  A["Is Student Present?"] -->|Yes| B["Attendance >= 75?"]
  A -->|No| D["Reject : Absent"]
  B -->|Yes| C["Allow Exam"]
  B -->|No| E["Reject : Low Attendance"]
            `}
          </div>
        </div>

        {/* ===== EXAMPLES ===== */}
        <div className={`${card} mb-6 ${reveal} animation-delay-[360ms]`}>
          <JavaCodeBlock code={`boolean present=true; int attendance=78;
if(present){
  if(attendance>=75){
    System.out.println("Allow Exam");
  }
}`} />
        </div>

        <div className={`${card} mb-6 ${reveal} animation-delay-[480ms]`}>
          <JavaCodeBlock code={`boolean cardInserted=true; int balance=3000;
if(cardInserted){
  if(balance>=2000){
    System.out.println("Withdraw Cash");
  }
}`} />
        </div>

        <div className={`${card} mb-10 ${reveal} animation-delay-[600ms]`}>
          <JavaCodeBlock code={`boolean registered=true; boolean fineClear=false;
if(registered){
  if(fineClear){
    System.out.println("Library Access Granted");
  }
}`} />
        </div>

        {/* ===== HINT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[720ms]`}>
          <h2 className="flex items-center gap-2"><Lightbulb size={18}/> Hint</h2>
          <p>Try writing else blocks for both outer and inner if.</p>
        </div>

        {/* ===== PITFALLS ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
          <h2 className="flex items-center gap-2"><AlertTriangle size={18}/> Common Pitfalls</h2>
          <ul className="list-disc pl-5">
            <li>Deep nesting</li>
            <li>Unreadable indentation</li>
          </ul>
        </div>

        {/* ===== CHECKLIST ===== */}
        <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[960ms]`}>
          <h2 className="flex items-center gap-2"><CheckCircle2 size={18}/> Mini Checklist</h2>
          <ul className="list-disc pl-5">
            <li>Outer condition first</li>
            <li>Inner condition meaningful</li>
          </ul>
        </div>

      </section>
    );
  }
}
