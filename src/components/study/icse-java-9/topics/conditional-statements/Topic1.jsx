// src/components/study/java-core/control-flow/Topic1.jsx
// Topic 2: if-else Statement
// React 19 – CLASS BASED COMPONENT

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";
import { Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import QuizIfElse from "./QuizIfElse";
const animationStyles = `
@keyframes fadeSlideUp {
  0%{opacity:0; transform:translateY(20px);}
  100%{opacity:1; transform:translateY(0);}
}
`;

export default class Topic1 extends Component {
  constructor(props){
    super(props);
    this.state={mounted:false};
  }
  componentDidMount(){ this.setState({mounted:true}); }

  render(){
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.7s_ease-out_forwards]"
      : "opacity-0";

    const card="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white/80 dark:bg-slate-900/80 hover:shadow-xl transition-all duration-300";

    return(
      <section className="max-w-6xl mx-auto px-6 py-12 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        <h1 className={`text-3xl font-semibold text-slate-900 dark:text-white mb-6 ${reveal}`}>
          Java Control Flow – if-else Statement
        </h1>

        {/* ===== THEORY ===== */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[120ms]`}>
          <p>
            The <strong>if-else</strong> structure is used when a program must make
            a strict binary decision. Either one path runs or the other.
            This is the foundation of decision-making systems like
            attendance validation, result declaration, or access control.
          </p>
        </div>

        {/* ===== FULL SVG FLOW ===== */}
        <div className={`${card} mb-10 flex justify-center ${reveal} animation-delay-[240ms]`}>
          <svg viewBox="0 0 500 260" className="w-full max-w-xl group">

            <rect x="200" y="10" width="100" height="40" rx="6"
              className="fill-sky-200 dark:fill-sky-900"/>
            <text x="250" y="35" textAnchor="middle">Start</text>

            <polygon points="250,70 310,120 250,170 190,120"
              className="fill-amber-200 dark:fill-amber-900"/>
            <text x="250" y="125" textAnchor="middle" className="text-xs">Condition?</text>

            <rect x="50" y="210" width="150" height="35" rx="6"
              className="fill-emerald-200 dark:fill-emerald-900"/>
            <text x="125" y="233" textAnchor="middle">if block</text>

            <rect x="300" y="210" width="150" height="35" rx="6"
              className="fill-rose-200 dark:fill-rose-900"/>
            <text x="375" y="233" textAnchor="middle">else block</text>

            {/* Animated arrows */}
            <line x1="250" y1="50" x2="250" y2="70" stroke="black" strokeWidth="2">
              <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1s" repeatCount="indefinite"/>
            </line>

            <line x1="220" y1="150" x2="125" y2="210" stroke="black" strokeWidth="2"/>
            <line x1="280" y1="150" x2="375" y2="210" stroke="black" strokeWidth="2"/>

          </svg>
        </div>

        {/* ===== 3 ALIGNED EXAMPLES ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[360ms]`}>
          <h3 className="font-medium mb-2">Example 1 – Pass / Fail</h3>
          <JavaCodeBlock code={`int marks = 38;
if(marks >= 40){
  System.out.println("Abhronila passed.");
}else{
  System.out.println("Reappear required.");
}`} />
        </div>

        <div className={`${card} mb-8 ${reveal} animation-delay-[480ms]`}>
          <h3 className="font-medium mb-2">Example 2 – Attendance Check</h3>
          <JavaCodeBlock code={`int attendance = 68;
if(attendance >= 75){
  System.out.println("Debangshu eligible.");
}else{
  System.out.println("Not eligible.");
}`} />
        </div>

        <div className={`${card} mb-10 ${reveal} animation-delay-[600ms]`}>
          <h3 className="font-medium mb-2">Example 3 – Train Delay</h3>
          <JavaCodeBlock code={`int delay = 20;
if(delay <= 10){
  System.out.println("Swadeep on time.");
}else{
  System.out.println("Late arrival.");
}`} />
        </div>

        {/* ===== HINT ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[720ms]`}>
          <h2 className="flex items-center gap-2"><Lightbulb size={18}/> Hint</h2>
          <p>Think how online exams allow submission only before deadline.</p>
        </div>

        {/* ===== PITFALLS ===== */}
        <div className={`${card} mb-8 ${reveal} animation-delay-[840ms]`}>
          <h2 className="flex items-center gap-2"><AlertTriangle size={18}/> Common Pitfalls</h2>
          <ul className="list-disc pl-5">
            <li>Using = instead of ==</li>
            <li>Forgetting braces</li>
            <li>Placing semicolon after if()</li>
          </ul>
        </div>

        {/* ===== TEACHER NOTE ===== */}
        <div className={`${card} border-l-4 border-sky-400 ${reveal} animation-delay-[960ms]`}>
          <h2 className="font-medium mb-1">Teacher’s Note</h2>
          <p>
            Every real-life rule is an if-else. Train students to
            convert daily decisions into code.
          </p>
        </div>
        <QuizIfElse/>
      </section>

        
    );
  }
}
