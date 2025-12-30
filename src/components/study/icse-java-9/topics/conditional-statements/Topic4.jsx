// src/components/study/java-core/control-flow/Topic4.jsx
// Topic 5: switch-case Statement — MERMAID v11 SAFE
// React 19 – CLASS BASED COMPONENT

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";
import mermaid from "mermaid";
import { Lightbulb, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

const animationStyles = `
@keyframes fadeSlideUp {
  0%{opacity:0; transform:translateY(18px);}
  100%{opacity:1; transform:translateY(0);}
}
`;

export default class Topic4 extends Component {
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
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-slate-900/80 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        <h1 className={`text-3xl font-semibold text-slate-900 dark:text-white mb-6 ${reveal}`}>
          Java Control Flow – switch-case Statement
        </h1>

        {/* ===== THEORY ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[120ms]`}>
          <h2 className="flex items-center gap-2 text-slate-900 dark:text-white mb-2">
            <BookOpen size={18}/> Concept Explanation
          </h2>
          <p>
            The <strong>switch-case</strong> statement is used when a variable must
            be compared against multiple fixed values. It is cleaner and faster
            than writing many <code>else-if</code> conditions.
          </p>
          <p className="mt-2">
            Example: In Barrackpore school, student grade is decided based on
            grade code — A, B, C, D — this fits perfectly with switch-case.
          </p>
        </div>

        {/* ===== MERMAID FLOW ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[240ms]`}>
          <div className="mermaid">
{`
flowchart TD
  A["Read gradeCode"] --> B{"gradeCode"}
  B -->|A| C["Excellent"]
  B -->|B| D["Very Good"]
  B -->|C| E["Good"]
  B -->|D| F["Needs Improvement"]
  B -->|default| G["Invalid Grade"]
`}
          </div>
        </div>

        {/* ===== SYNTAX ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[360ms]`}>
          <p><strong>Prototype / Signature:</strong></p>
          <p className="mb-2">
            <code>switch(expression) &#123; case value: ... break; default: ... &#125;</code>
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Return type:</strong> None</li>
            <li><strong>Purpose:</strong> Multi-way selection</li>
            <li><strong>Used when:</strong> One variable compared with many values</li>
          </ul>
        </div>

        {/* ===== EXAMPLES ===== */}
        <div className={`${card} mb-6 ${reveal} animation-delay-[480ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 1 – Grade Display
          </h3>
          <JavaCodeBlock code={`char grade='B';

switch(grade){
  case 'A': System.out.println("Excellent"); break;
  case 'B': System.out.println("Very Good"); break;
  case 'C': System.out.println("Good"); break;
  default: System.out.println("Invalid Grade");
}`} />
        </div>

        <div className={`${card} mb-6 ${reveal} animation-delay-[600ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 2 – Day Message in Naihati
          </h3>
          <JavaCodeBlock code={`int day=2;

switch(day){
  case 1: System.out.println("Monday"); break;
  case 2: System.out.println("Tuesday"); break;
  case 3: System.out.println("Wednesday"); break;
  default: System.out.println("Invalid Day");
}`} />
        </div>

        <div className={`${card} mb-10 ${reveal} animation-delay-[720ms]`}>
          <h3 className="font-medium text-slate-900 dark:text-white mb-2">
            Example 3 – Menu Choice
          </h3>
          <JavaCodeBlock code={`int choice=3;

switch(choice){
  case 1: System.out.println("Tea"); break;
  case 2: System.out.println("Coffee"); break;
  case 3: System.out.println("Juice"); break;
  default: System.out.println("No Item");
}`} />
        </div>

        {/* ===== HINT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
          <h2 className="flex items-center gap-2"><Lightbulb size={18}/> Hint</h2>
          <p>Think about what happens if you remove <code>break</code> from a case.</p>
        </div>

        {/* ===== PITFALLS ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[960ms]`}>
          <h2 className="flex items-center gap-2"><AlertTriangle size={18}/> Common Pitfalls</h2>
          <ul className="list-disc pl-5">
            <li>Missing break causing fall-through</li>
            <li>Forgetting default case</li>
            <li>Using wrong data type</li>
          </ul>
        </div>

        {/* ===== CHECKLIST ===== */}
        <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[1080ms]`}>
          <h2 className="flex items-center gap-2"><CheckCircle2 size={18}/> Mini Checklist</h2>
          <ul className="list-disc pl-5">
            <li>All cases have break</li>
            <li>Default case added</li>
            <li>Expression type supported</li>
          </ul>
        </div>

      </section>
    );
  }
}
