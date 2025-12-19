// src/components/study/java-core/Topic1.jsx
// Topic 2: Rules of Java syntax and statement termination (;)
// React 19 – Class-based component
// Tailwind CSS only (no config, no plugins)
// Zero-config animations using Tailwind arbitrary values + inline scoped keyframes
// SVGs are semantic and instructional

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    return (
      <div className="relative space-y-16 px-4 sm:px-6 lg:px-10 py-10 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950">
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "0ms" }}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">
            Rules of Java Syntax &amp; Statement Termination
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Java is a <strong>strictly structured language</strong>.  
            Even a small syntax mistake—especially a missing semicolon—can stop
            the program from compiling.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section
          className={`space-y-6 ${reveal}`}
          style={{ animationDelay: "120ms" }}
        >
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. What is Java Syntax?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Syntax</strong> refers to the set of rules that defines how a Java
            program must be written so that the compiler can understand it.
            Java does <em>not guess your intention</em>.  
            If the rules are violated, compilation fails.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Imagine a classroom in <strong>Shyamnagar</strong> where students like
            <strong> Abhronila</strong> must submit answer scripts in a fixed format.
            Even if the answer is correct, a wrong format can cause rejection.
            Java syntax works exactly the same way.
          </p>
        </section>

        {/* ======================================================
            SVG – SYNTAX & SEMICOLON FLOW
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "220ms" }}
        >
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. How Java Reads Statements
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-slate-50 dark:bg-slate-900">
            <svg
              viewBox="0 0 720 260"
              className="w-full h-auto"
              role="img"
              aria-label="Java statement termination diagram"
            >
              {/* Statement */}
              <rect
                x="40"
                y="40"
                width="640"
                height="60"
                rx="10"
                fill="none"
                stroke="currentColor"
                className="text-sky-500"
                strokeWidth="2"
              />
              <text
                x="360"
                y="75"
                textAnchor="middle"
                className="fill-current text-slate-700 dark:text-slate-300 text-sm"
              >
                int x = 10;
              </text>

              {/* Arrow */}
              <line
                x1="360"
                y1="100"
                x2="360"
                y2="160"
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
              </line>

              {/* Compiler */}
              <rect
                x="200"
                y="160"
                width="320"
                height="60"
                rx="10"
                fill="none"
                stroke="currentColor"
                className="text-emerald-500"
                strokeWidth="2"
              />
              <text
                x="360"
                y="195"
                textAnchor="middle"
                className="fill-current text-emerald-600 dark:text-emerald-400 text-sm font-semibold"
              >
                Compiler understands statement
              </text>
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL RULES
        ====================================================== */}
        <section
          className={`space-y-10 ${reveal}`}
          style={{ animationDelay: "320ms" }}
        >
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Core Syntax Rules (Must Know)
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>
              Every <strong>executable statement</strong> must end with a semicolon
              <code> ; </code>
            </li>
            <li>
              Java is <strong>case-sensitive</strong> (<code>Main</code> ≠{" "}
              <code>main</code>)
            </li>
            <li>
              Blocks of code are enclosed within <code>{`{ }`}</code>
            </li>
            <li>
              Keywords must be written exactly as defined (e.g., <code>class</code>,
              not <code>Class</code>)
            </li>
          </ul>
        </section>

        {/* ======================================================
            SEMICOLON – TECHNICAL EXPLANATION
        ====================================================== */}
        <section
          className={`space-y-6 ${reveal}`}
          style={{ animationDelay: "420ms" }}
        >
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400">
            4. Statement Termination (;)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li><strong>Symbol:</strong> <code>;</code></li>
            <li><strong>Return type:</strong> Not applicable</li>
            <li>
              <strong>Purpose:</strong> Tells the compiler that a statement is complete
            </li>
            <li>
              <strong>When &amp; why:</strong> Required after variable declarations,
              assignments, and method calls
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section
          className={`space-y-6 ${reveal}`}
          style={{ animationDelay: "520ms" }}
        >
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            5. Correct vs Incorrect Examples
          </h2>

          <JavaCodeBlock
            code={`// Correct
int a = 5;
System.out.println(a);

// Incorrect (missing semicolon)
int b = 10
System.out.println(b);`}
          />
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "620ms" }}
        >
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
            Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Missing semicolons</li>
            <li>Extra semicolons after <code>if</code> or <code>for</code></li>
            <li>Wrong capitalization of keywords</li>
            <li>Unmatched braces causing cascading errors</li>
          </ul>
        </section>

        {/* ======================================================
            HINT SECTION
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "720ms" }}
        >
          <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
            Hint
          </h2>
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Observe carefully where Java expects a complete instruction.
            Try removing or adding a semicolon and watch how the compiler reacts.
          </p>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "820ms" }}
        >
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
            Best Practices
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Write one statement per line</li>
            <li>Use proper indentation</li>
            <li>Let the IDE highlight syntax issues early</li>
          </ul>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section
          className={`space-y-3 ${reveal}`}
          style={{ animationDelay: "920ms" }}
        >
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Mini Checklist
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Statements end with <code>;</code></li>
            <li>Java is case-sensitive</li>
            <li>Braces define blocks clearly</li>
          </ul>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section
          className={`rounded-xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-slate-50 dark:bg-slate-900 ${reveal}`}
          style={{ animationDelay: "1020ms" }}
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            🎓 Teacher’s Note
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Beginners often underestimate syntax rules, especially semicolons.
            Reinforce the habit of slow, structured writing. Once syntax discipline
            is built, logical thinking improves naturally.
          </p>
        </section>
      </div>
    );
  }
}
