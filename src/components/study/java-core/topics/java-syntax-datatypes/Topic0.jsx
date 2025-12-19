// src/components/study/java-core/Topic0.jsx
// Topic 1: Java program structure (class, main method, braces)
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
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    // Trigger section-based reveal after mount
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    return (
      <div className="relative space-y-16 px-4 sm:px-6 lg:px-10 py-10 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950">
        {/* Scoped animations */}
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "0ms" }}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide text-slate-900 dark:text-slate-100">
            Java Program Structure
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Every Java program follows a <strong>strict, readable structure</strong>.
            Understanding this structure early prevents confusion later when programs
            grow larger and more complex.
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
            1. What is Java Program Structure?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A Java program is built using a <strong>class</strong>. Inside that class,
            the <strong>main method</strong> acts as the <em>starting point</em> of execution.
            Curly braces <code>{`{ }`}</code> define blocks of code and help Java understand
            where each part begins and ends.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think of a Java program like a school building in <strong>Barrackpore</strong>:
            the <strong>class</strong> is the building, the <strong>main method</strong> is
            the main gate, and braces define the rooms inside. Without proper structure,
            students like <strong>Swadeep</strong> or <strong>Tuhina</strong> would not know
            where to enter or what happens first.
          </p>
        </section>

        {/* ======================================================
            SVG – PROGRAM STRUCTURE FLOW
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "220ms" }}
        >
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. Visual Flow of a Java Program
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-slate-50 dark:bg-slate-900">
            <svg
              viewBox="0 0 700 260"
              className="w-full h-auto"
              role="img"
              aria-label="Java program structure diagram"
            >
              {/* Class Box */}
              <rect
                x="40"
                y="30"
                width="620"
                height="200"
                rx="12"
                fill="none"
                stroke="currentColor"
                className="text-sky-500"
                strokeWidth="2"
              />
              <text
                x="350"
                y="55"
                textAnchor="middle"
                className="fill-current text-sky-600 dark:text-sky-400 text-sm font-semibold"
              >
                Class Declaration
              </text>

              {/* Main Method Box */}
              <rect
                x="140"
                y="90"
                width="420"
                height="100"
                rx="10"
                fill="none"
                stroke="currentColor"
                className="text-emerald-500"
                strokeWidth="2"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.6s"
                  begin="0.2s"
                  fill="freeze"
                />
              </rect>

              <text
                x="350"
                y="120"
                textAnchor="middle"
                className="fill-current text-emerald-600 dark:text-emerald-400 text-sm font-semibold"
              >
                main() Method
              </text>

              <text
                x="350"
                y="150"
                textAnchor="middle"
                className="fill-current text-slate-600 dark:text-slate-300 text-xs"
              >
                Program execution starts here
              </text>
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL BREAKDOWN
        ====================================================== */}
        <section
          className={`space-y-10 ${reveal}`}
          style={{ animationDelay: "320ms" }}
        >
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Technical Breakdown (Line by Line)
          </h2>

          {/* CLASS */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Class</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
              <li><strong>Prototype:</strong> <code>class ClassName { }</code></li>
              <li><strong>Return type:</strong> Not applicable</li>
              <li><strong>Purpose:</strong> Groups variables and methods into a single unit</li>
              <li>
                <strong>When &amp; why:</strong> Java is class-based; every program must
                be inside a class
              </li>
            </ul>
          </div>

          {/* MAIN METHOD */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">main() Method</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
              <li>
                <strong>Prototype:</strong>{" "}
                <code>public static void main(String[] args)</code>
              </li>
              <li><strong>Return type:</strong> <code>void</code></li>
              <li>
                <strong>Purpose:</strong> Entry point where JVM starts execution
              </li>
              <li>
                <strong>When &amp; why:</strong> Required for standalone Java applications
              </li>
            </ul>
          </div>

          {/* BRACES */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Curly Braces {`{ }`}</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
              <li><strong>Purpose:</strong> Define scope and block boundaries</li>
              <li>
                <strong>Why important:</strong> Missing or misplaced braces cause
                compilation errors
              </li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            CODE EXAMPLE
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "420ms" }}
        >
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400">
            4. First Java Program Example
          </h2>

          <JavaCodeBlock
            code={`class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`}
          />
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "520ms" }}
        >
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Pitfalls
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>Forgetting <code>main()</code> method</li>
            <li>Mismatched braces</li>
            <li>Wrong method signature for <code>main</code></li>
            <li>Class name and file name mismatch</li>
          </ul>
        </section>

        {/* ======================================================
            HINT SECTION
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "620ms" }}
        >
          <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
            Hint
          </h2>
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think about what would happen if the <code>main()</code> method is removed.
            Observe carefully how the JVM looks for a starting point.
          </p>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section
          className={`space-y-4 ${reveal}`}
          style={{ animationDelay: "720ms" }}
        >
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
            Best Practices
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed">
            <li>Keep class names meaningful and capitalized</li>
            <li>Indent braces properly</li>
            <li>Write clean, readable structure first</li>
          </ul>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section
          className={`space-y-3 ${reveal}`}
          style={{ animationDelay: "820ms" }}
        >
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Mini Checklist
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Every Java program has a class</li>
            <li><code>main()</code> is mandatory for execution</li>
            <li>Braces define structure and scope</li>
          </ul>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section
          className={`rounded-xl border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-slate-50 dark:bg-slate-900 ${reveal}`}
          style={{ animationDelay: "920ms" }}
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
            🎓 Teacher’s Note
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Students often rush into writing logic without respecting structure.
            Emphasize that a strong foundation—class, main method, and braces—is
            non-negotiable. Once this becomes natural, advanced topics feel much easier.
          </p>
        </section>
      </div>
    );
  }
}
