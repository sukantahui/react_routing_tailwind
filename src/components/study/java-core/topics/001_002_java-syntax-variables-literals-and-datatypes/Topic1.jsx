// src/components/study/java-core/Topic1.jsx
// Topic 2: Rules of Java syntax and statement termination (;)
// React 19 – CLASS-BASED component
// Tailwind CSS only (no config, no plugins)
// Zero-config animations using Tailwind arbitrary values + inline scoped keyframes
// Semantic, instructional SVGs (no decorative SVGs)

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

export default class Topic1 extends Component {
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
            Rules of Java Syntax & Statement Termination
          </h1>
          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Java follows <strong>precise syntax rules</strong>. These rules tell the compiler
            exactly where a statement starts and ends. Even a single missing semicolon
            can prevent your program from running.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. Understanding Java Syntax
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Syntax</strong> is the grammar of a programming language. In Java,
            syntax defines how statements must be written so that the compiler
            can understand them. Java does not interpret intent—only correctness.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think of a classroom exam in <strong>Naihati</strong>. Even if
            <strong> Debangshu</strong> knows the answer, writing it outside the
            required format may lead to lost marks. Java syntax works the same way:
            format and structure matter.
          </p>
        </section>

        {/* ======================================================
            SVG – STATEMENT TERMINATION FLOW
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. How Java Identifies a Complete Statement
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <svg
              viewBox="0 0 760 260"
              className="w-full h-auto"
              role="img"
              aria-label="Java syntax and semicolon flow diagram"
            >
              {/* Code line */}
              <rect x="40" y="40" width="680" height="56" rx="10" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-sky-500" />
              <text x="380" y="75" textAnchor="middle"
                className="fill-current text-slate-700 dark:text-slate-300 text-sm">
                int count = 10;
              </text>

              {/* Arrow */}
              <line x1="380" y1="96" x2="380" y2="160"
                stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.2s" fill="freeze" />
              </line>

              {/* Compiler box */}
              <rect x="220" y="160" width="320" height="60" rx="10" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
              <text x="380" y="195" textAnchor="middle"
                className="fill-current text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                Compiler accepts the statement
              </text>
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL RULES
        ====================================================== */}
        <section className={`${reveal} space-y-8`} style={{ animationDelay: "320ms" }}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Core Java Syntax Rules
          </h2>

          <ul className="list-disc pl-6 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>
              Every <strong>executable statement</strong> must end with a semicolon
              <code className="px-1">;</code>
            </li>
            <li>
              Java is <strong>case-sensitive</strong> (<code>main</code> ≠ <code>Main</code>)
            </li>
            <li>
              Code blocks are enclosed within curly braces <code>{`{ }`}</code>
            </li>
            <li>
              Java keywords must be written exactly as defined (lowercase)
            </li>
          </ul>
        </section>

        {/* ======================================================
            SEMICOLON – TECHNICAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "420ms" }}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400">
            4. Statement Termination (;)
          </h2>

          <ul className="list-disc pl-6 space-y-2 leading-relaxed text-slate-600 dark:text-slate-300">
            <li><strong>Symbol:</strong> <code>;</code></li>
            <li><strong>Prototype / Signature:</strong> Not applicable</li>
            <li><strong>Return type:</strong> Not applicable</li>
            <li>
              <strong>Purpose:</strong> Marks the end of a Java statement
            </li>
            <li>
              <strong>When & why:</strong> Required after declarations, assignments,
              and method calls so the compiler knows where instructions end
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "520ms" }}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            5. Correct vs Incorrect Syntax
          </h2>

          <JavaCodeBlock
            code={`// Correct syntax
int marks = 90;
System.out.println(marks);

// Incorrect syntax (missing semicolon)
int age = 18
System.out.println(age);`}
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
            <li>Forgetting semicolons at the end of statements</li>
            <li>Using extra semicolons after <code>if</code> or <code>for</code></li>
            <li>Incorrect capitalization of keywords</li>
            <li>Confusing braces <code>{`{ }`}</code> with semicolons</li>
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
            Observe carefully where Java expects a complete instruction.
            Try removing one semicolon and see how the compiler responds.
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
            <li>Write one statement per line</li>
            <li>Indent code consistently</li>
            <li>Let the IDE help you catch syntax errors early</li>
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
            <li>Every statement ends with <code>;</code></li>
            <li>Java is case-sensitive</li>
            <li>Braces define blocks clearly</li>
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
            Most beginner errors are syntax-related, not logical.
            Train students to read compiler errors calmly and fix one issue at a time.
            Once syntax discipline is developed, confidence grows rapidly.
          </p>
        </section>
      </div>
    );
  }
}
