// src/components/study/java-core/Topic7.jsx
// Topic 8: Boolean data type
// React 19 – CLASS-BASED component
// Tailwind CSS only (no config, no plugins)
// Zero-config animations using Tailwind arbitrary values + inline scoped keyframes
// Semantic, instructional SVGs only

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic7 extends Component {
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

    return (
      <div className="relative space-y-16 px-4 sm:px-6 lg:px-10 py-10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header className={`${reveal} space-y-4`} style={{ animationDelay: "0ms" }}>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">
            Boolean Data Type in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Decision-making is at the heart of programming. Java uses the
            <strong> boolean </strong> data type to represent logical states:
            <em> true </em> or <em> false </em>.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. What is the boolean Data Type?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>boolean</code> data type is used to store a
            <strong> logical value </strong>—either <code>true</code> or
            <code>false</code>. It is the foundation of conditions, decisions,
            and control flow in Java programs.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Imagine a classroom in <strong>Shyamnagar</strong>. When the teacher
            checks attendance, the answer is either <em>present</em> or
            <em>absent</em>. Students like <strong>Debangshu</strong> experience
            boolean logic daily without realizing it.
          </p>
        </section>

        {/* ======================================================
            SVG – BOOLEAN DECISION FLOW
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. How boolean Drives Decisions
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <svg
              viewBox="0 0 760 260"
              className="w-full h-auto"
              role="img"
              aria-label="Java boolean decision flow diagram"
            >
              {/* Condition */}
              <rect x="60" y="40" width="280" height="60" rx="10" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-sky-500" />
              <text x="200" y="75" textAnchor="middle"
                className="fill-current text-slate-700 dark:text-slate-300 text-sm">
                marks &gt;= 40
              </text>

              {/* True path */}
              <line x1="200" y1="100" x2="120" y2="160"
                stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.2s" fill="freeze" />
              </line>
              <rect x="40" y="160" width="160" height="60" rx="10" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
              <text x="120" y="195" textAnchor="middle"
                className="fill-current text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                true
              </text>

              {/* False path */}
              <line x1="200" y1="100" x2="360" y2="160"
                stroke="currentColor" strokeWidth="2" className="text-rose-500" />
              <rect x="320" y="160" width="160" height="60" rx="10" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-rose-500" />
              <text x="400" y="195" textAnchor="middle"
                className="fill-current text-rose-600 dark:text-rose-400 text-sm font-semibold">
                false
              </text>
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL DETAILS
        ====================================================== */}
        <section className={`${reveal} space-y-10`} style={{ animationDelay: "320ms" }}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Technical Explanation of boolean
          </h2>

          <ul className="list-disc pl-6 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>
              <strong>Prototype / Signature:</strong> <code>boolean result = true;</code>
            </li>
            <li>
              <strong>Return type:</strong> <code>boolean</code>
            </li>
            <li>
              <strong>Size:</strong> JVM-dependent (conceptually 1 bit)
            </li>
            <li>
              <strong>Purpose:</strong> Store logical outcomes
            </li>
            <li>
              <strong>When & why:</strong> Used in conditions, loops, and decision-making
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "520ms" }}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            4. boolean Examples
          </h2>

          <JavaCodeBlock
            code={`boolean isPassed = true;
boolean hasIDCard = false;

int marks = 65;
boolean eligible = marks >= 40;

System.out.println(isPassed);
System.out.println(hasIDCard);
System.out.println(eligible);`}
          />
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "620ms" }}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
            Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Using <code>1</code> or <code>0</code> instead of <code>true</code>/<code>false</code></li>
            <li>Confusing assignment <code>=</code> with comparison <code>==</code></li>
            <li>Comparing boolean values unnecessarily</li>
          </ul>
        </section>

        {/* ======================================================
            HINT SECTION
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "720ms" }}>
          <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
            Hint
          </h2>
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think about questions that have only two answers—yes or no.
            Those situations are perfect for boolean variables.
          </p>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "820ms" }}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
            Best Practices
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Name boolean variables clearly (<code>isActive</code>, <code>hasAccess</code>)</li>
            <li>Avoid comparing boolean values with <code>== true</code></li>
            <li>Use boolean expressions directly in conditions</li>
          </ul>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section className={`${reveal} space-y-3`} style={{ animationDelay: "920ms" }}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Mini Checklist
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>boolean</code> stores true or false</li>
            <li>Used in decisions and loops</li>
            <li>Clear naming improves readability</li>
          </ul>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section
          className={`${reveal} rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          style={{ animationDelay: "1020ms" }}
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            🎓 Teacher’s Note
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Emphasize that boolean logic is the backbone of control flow.
            Once students master true/false thinking, topics like
            <code>if</code>, loops, and conditions become intuitive.
          </p>
        </section>
      </div>
    );
  }
}
