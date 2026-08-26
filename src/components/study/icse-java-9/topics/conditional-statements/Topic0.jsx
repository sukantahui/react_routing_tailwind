// src/components/study/java-core/control-flow/Topic0.jsx
// Topic 1: if Statement
// React 19 – CLASS-BASED component
// Tailwind CSS – ZERO config, ZERO plugins

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";
import { Lightbulb, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

/* =========================================================
   Inline Scoped Animations — ZERO CONFIG
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic0 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300";

    return (
      <section className="max-w-6xl mx-auto px-6 py-10 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* ================= Header ================= */}
        <div className={`mb-10 ${reveal}`}>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Java Control Flow – <span className="text-sky-500">if Statement</span>
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            The <strong>if statement</strong> allows a program to make decisions.
            It executes a block of code only when a condition is true.
          </p>
        </div>

        {/* ================= Concept ================= */}
        <div className={`grid md:grid-cols-2 gap-6 mb-10 ${reveal} animation-delay-[120ms]`}>
          <div className={card}>
            <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen size={20} /> What is an if statement?
            </h2>
            <p>
              In real life, Swadeep goes to school in Barrackpore <em>only if</em> it is
              not raining. This decision logic is exactly what the Java
              <code className="mx-1 px-1 rounded bg-slate-100 dark:bg-slate-800">if</code>
              statement does in programs.
            </p>

            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>It checks a condition.</li>
              <li>If condition is <strong>true</strong>, block executes.</li>
              <li>If condition is <strong>false</strong>, block is skipped.</li>
            </ul>
          </div>

          {/* ================= SVG Flow ================= */}
          <div className={`${card} flex items-center justify-center`}>
            <svg
              viewBox="0 0 320 220"
              className="w-full h-auto group"
              aria-label="if statement flow diagram"
            >
              <rect x="110" y="10" width="100" height="40" rx="8"
                className="fill-sky-100 dark:fill-sky-900 group-hover:fill-sky-200 transition-all"/>
              <text x="160" y="35" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 text-sm">Start</text>

              <polygon points="160,70 210,110 160,150 110,110"
                className="fill-amber-100 dark:fill-amber-900 group-hover:fill-amber-200 transition-all"/>
              <text x="160" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 text-xs">Condition?</text>

              <rect x="20" y="170" width="120" height="35" rx="6"
                className="fill-emerald-100 dark:fill-emerald-900 group-hover:fill-emerald-200 transition-all"/>
              <text x="80" y="192" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 text-xs">Execute Block</text>

              <rect x="180" y="170" width="120" height="35" rx="6"
                className="fill-rose-100 dark:fill-rose-900 group-hover:fill-rose-200 transition-all"/>
              <text x="240" y="192" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 text-xs">Skip Block</text>

              <line x1="160" y1="50" x2="160" y2="70" stroke="currentColor"/>
              <line x1="130" y1="130" x2="80" y2="170" stroke="currentColor"/>
              <line x1="190" y1="130" x2="240" y2="170" stroke="currentColor"/>
            </svg>
          </div>
        </div>

        {/* ================= Syntax & Code ================= */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[240ms]`}>
          <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-3">
            Syntax, Signature & Purpose
          </h2>

          <p><strong>Prototype / Signature:</strong></p>
          <p className="mt-1 mb-3">
            <code>if(boolean condition) &#123; statements; &#125;</code>
          </p>

          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li><strong>Return type:</strong> None (it controls flow)</li>
            <li><strong>Purpose:</strong> Execute code conditionally</li>
            <li><strong>Why used:</strong> To make decisions in programs</li>
          </ul>

          <JavaCodeBlock
            code={`int marks = 78;

if(marks >= 60){
    System.out.println("Swadeep passed the exam in Barrackpore school!");
}`}
          />
        </div>

        {/* ================= Common Pitfalls ================= */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[360ms]`}>
          <h2 className="text-xl font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <AlertTriangle size={20} /> Common Pitfalls
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Using <code>=</code> instead of <code>==</code> in conditions.</li>
            <li>Forgetting curly braces for multiple lines.</li>
            <li>Using non-boolean expressions inside if.</li>
            <li>Placing semicolon right after if: <code>if(x&gt;5);</code></li>
          </ul>
        </div>

        {/* ================= Best Practices ================= */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[480ms]`}>
          <h2 className="text-xl font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <CheckCircle2 size={20} /> Best Practices
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Always use braces even for single statements.</li>
            <li>Keep conditions readable.</li>
            <li>Avoid deep nesting – keep logic clean.</li>
          </ul>
        </div>

        {/* ================= Hint Section ================= */}
        <div className={`${card} mb-10 ${reveal} animation-delay-[600ms]`}>
          <h2 className="text-xl font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Lightbulb size={20} /> Hint
          </h2>
          <p>
            Think about what happens if Tuhina’s train from Naihati arrives late.
            How would you express that logic using an if statement?
          </p>
        </div>

        {/* ================= Teacher's Note ================= */}
        <div className={`${card} ${reveal} animation-delay-[720ms] border-l-4 border-sky-400`}>
          <h2 className="text-xl font-medium text-slate-900 dark:text-white mb-2">
            Teacher’s Note
          </h2>
          <p>
            Students often memorize syntax but forget logic. Always relate
            <strong> if </strong> conditions to real life decisions — attendance,
            marks, or pass/fail systems in schools of Ichapur or Shyamnagar.
            This habit builds strong programming intuition.
          </p>
        </div>
      </section>
    );
  }
}
