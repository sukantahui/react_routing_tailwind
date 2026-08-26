// src/components/study/java-core/Topic3.jsx
// Topic 4: Identifiers and Java Keywords
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

export default class Topic3 extends Component {
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
            Identifiers and Java Keywords
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            In Java, <strong>names matter</strong>. Identifiers give identity to variables,
            classes, and methods, while keywords are <em>reserved words</em> that define
            the language itself. Confusing the two leads to errors and unreadable code.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. What are Identifiers?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            An <strong>identifier</strong> is the name used to identify a programming
            element such as a variable, method, class, or interface. Java uses
            identifiers to refer to memory locations and behaviors.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Imagine a school in <strong>Ichapur</strong>. Each student like
            <strong> Swadeep</strong> or <strong>Tuhina</strong> has a unique name.
            Calling everyone “student” would create confusion. Identifiers
            provide that uniqueness in Java programs.
          </p>
        </section>

        {/* ======================================================
            SVG – IDENTIFIER vs KEYWORD
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. Identifier vs Keyword (Visual Separation)
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <svg
              viewBox="0 0 760 260"
              className="w-full h-auto"
              role="img"
              aria-label="Identifiers vs Java keywords diagram"
            >
              {/* Identifier Box */}
              <rect
                x="40"
                y="60"
                width="300"
                height="120"
                rx="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-sky-500"
              />
              <text
                x="190"
                y="95"
                textAnchor="middle"
                className="fill-current text-sky-600 dark:text-sky-400 font-semibold text-sm"
              >
                Identifiers
              </text>
              <text
                x="190"
                y="125"
                textAnchor="middle"
                className="fill-current text-slate-600 dark:text-slate-300 text-xs"
              >
                user-defined names
              </text>
              <text
                x="190"
                y="150"
                textAnchor="middle"
                className="fill-current text-slate-500 dark:text-slate-400 text-xs"
              >
                (marks, StudentName)
              </text>

              {/* Keyword Box */}
              <rect
                x="420"
                y="60"
                width="300"
                height="120"
                rx="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-emerald-500"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.5s"
                  begin="0.2s"
                  fill="freeze"
                />
              </rect>
              <text
                x="570"
                y="95"
                textAnchor="middle"
                className="fill-current text-emerald-600 dark:text-emerald-400 font-semibold text-sm"
              >
                Java Keywords
              </text>
              <text
                x="570"
                y="125"
                textAnchor="middle"
                className="fill-current text-slate-600 dark:text-slate-300 text-xs"
              >
                reserved by Java
              </text>
              <text
                x="570"
                y="150"
                textAnchor="middle"
                className="fill-current text-slate-500 dark:text-slate-400 text-xs"
              >
                (class, int, public)
              </text>
            </svg>
          </div>
        </section>

        {/* ======================================================
            IDENTIFIER RULES – TECHNICAL
        ====================================================== */}
        <section className={`${reveal} space-y-8`} style={{ animationDelay: "320ms" }}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Rules for Identifiers
          </h2>

          <ul className="list-disc pl-6 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>Must start with a letter, <code>_</code>, or <code>$</code></li>
            <li>Cannot start with a digit</li>
            <li>Cannot be a Java keyword</li>
            <li>No spaces allowed</li>
            <li>Case-sensitive (<code>marks</code> ≠ <code>Marks</code>)</li>
          </ul>
        </section>

        {/* ======================================================
            JAVA KEYWORDS – TECHNICAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "420ms" }}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400">
            4. Java Keywords
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Java keywords</strong> are predefined, reserved words that have
            special meaning to the compiler. They cannot be used as identifiers.
          </p>

          <ul className="list-disc pl-6 space-y-2 leading-relaxed text-slate-600 dark:text-slate-300">
            <li><strong>Prototype / Signature:</strong> Not applicable</li>
            <li><strong>Return type:</strong> Not applicable</li>
            <li><strong>Purpose:</strong> Define Java language structure and behavior</li>
            <li>
              <strong>When & why:</strong> Used to instruct the compiler
              (<code>class</code>, <code>int</code>, <code>return</code>, etc.)
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "520ms" }}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            5. Valid vs Invalid Identifiers
          </h2>

          <JavaCodeBlock
            code={`// Valid identifiers
int marks;
int studentAge;
double totalAmount;

// Invalid identifiers
int 1number;      // starts with digit
int class;        // keyword
int student name; // space not allowed`}
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
            <li>Using keywords as variable names</li>
            <li>Creating unclear or meaningless identifiers</li>
            <li>Ignoring case sensitivity</li>
            <li>Using special characters unnecessarily</li>
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
            Observe carefully which words are highlighted by your IDE.
            If Java colors a word differently, ask yourself: is it a keyword?
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
            <li>Use meaningful, descriptive identifiers</li>
            <li>Follow camelCase for variables and methods</li>
            <li>Avoid using <code>$</code> unless necessary</li>
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
            <li>Identifiers follow naming rules</li>
            <li>Keywords are reserved and cannot be reused</li>
            <li>Case sensitivity matters</li>
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
            Encourage students to treat identifiers as self-documenting labels.
            Good naming reduces the need for comments and improves confidence
            when reading or debugging code later.
          </p>
        </section>
      </div>
    );
  }
}
