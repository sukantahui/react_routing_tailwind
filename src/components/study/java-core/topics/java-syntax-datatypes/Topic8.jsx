// src/components/study/java-core/Topic8.jsx
// Topic 9: Size and range of primitive data types
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

export default class Topic8 extends Component {
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
            Size and Range of Primitive Data Types in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Every primitive data type in Java occupies a fixed amount of memory
            and can store values only within a specific <strong>range</strong>.
            Understanding size and range helps you write safe, efficient, and
            error-free programs.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. Why Size and Range Matter
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Each primitive type reserves a fixed number of bytes in memory.
            The <strong>size</strong> decides how much memory is used, while the
            <strong>range</strong> decides the minimum and maximum values that can
            be stored.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think of assigning lockers in a school at <strong>Barrackpore</strong>.
            A small locker cannot store large bags. Similarly, a data type with
            small size cannot store large values—students like <strong>Swadeep</strong>
            quickly learn this when values overflow.
          </p>
        </section>

        {/* ======================================================
            SVG – SIZE & RANGE OVERVIEW
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. Primitive Types: Memory vs Capacity
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <svg
              viewBox="0 0 780 280"
              className="w-full h-auto"
              role="img"
              aria-label="Primitive data types size and range diagram"
            >
              {[
                { x: 30, label: "byte\n1B\n-128 to 127", c: "text-sky-500" },
                { x: 150, label: "short\n2B\n-32,768 to 32,767", c: "text-emerald-500" },
                { x: 300, label: "int\n4B\n±2.1B", c: "text-indigo-500" },
                { x: 430, label: "long\n8B\nVery Large", c: "text-rose-500" },
                { x: 560, label: "float\n4B\n~7 digits", c: "text-amber-500" },
                { x: 680, label: "double\n8B\n~15 digits", c: "text-purple-500" },
              ].map((t, i) => (
                <g key={t.label}>
                  <rect
                    x={t.x}
                    y="70"
                    width="110"
                    height="140"
                    rx="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={t.c}
                  >
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      dur="0.35s"
                      begin={`${i * 0.08}s`}
                      fill="freeze"
                    />
                  </rect>
                  <text
                    x={t.x + 55}
                    y="115"
                    textAnchor="middle"
                    className="fill-current text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    {t.label.split("\n")[0]}
                  </text>
                  <text
                    x={t.x + 55}
                    y="140"
                    textAnchor="middle"
                    className="fill-current text-slate-500 dark:text-slate-400 text-[11px]"
                  >
                    {t.label.split("\n")[1]}
                  </text>
                  <text
                    x={t.x + 55}
                    y="165"
                    textAnchor="middle"
                    className="fill-current text-slate-500 dark:text-slate-400 text-[11px]"
                  >
                    {t.label.split("\n")[2]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL TABLE (EXPLAINED)
        ====================================================== */}
        <section className={`${reveal} space-y-10`} style={{ animationDelay: "320ms" }}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Technical Breakdown (Type-wise)
          </h2>

          <ul className="list-disc pl-6 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>
              <strong>byte</strong> → 1 byte (8 bits)  
              <br />Range: −128 to 127
            </li>
            <li>
              <strong>short</strong> → 2 bytes (16 bits)  
              <br />Range: −32,768 to 32,767
            </li>
            <li>
              <strong>int</strong> → 4 bytes (32 bits)  
              <br />Range: −2,147,483,648 to 2,147,483,647
            </li>
            <li>
              <strong>long</strong> → 8 bytes (64 bits)  
              <br />Range: Very large (use <code>L</code> suffix)
            </li>
            <li>
              <strong>float</strong> → 4 bytes  
              <br />Approx. 6–7 decimal digits precision
            </li>
            <li>
              <strong>double</strong> → 8 bytes  
              <br />Approx. 15 decimal digits precision
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "520ms" }}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            4. Checking Limits Using Wrapper Classes
          </h2>

          <JavaCodeBlock
            code={`System.out.println(Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
System.out.println(Short.MIN_VALUE + " to " + Short.MAX_VALUE);
System.out.println(Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
System.out.println(Long.MIN_VALUE + " to " + Long.MAX_VALUE);`}
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
            <li>Ignoring range limits and causing overflow</li>
            <li>Assuming all numbers fit into <code>int</code></li>
            <li>Confusing precision with range</li>
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
            Think about what happens if a value crosses its maximum range.
            Try assigning <code>130</code> to a <code>byte</code> and observe the error.
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
            <li>Choose data types based on required range</li>
            <li>Use wrapper constants for safe limits</li>
            <li>Prefer clarity over saving a few bytes</li>
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
            <li>Each primitive has fixed size</li>
            <li>Range depends on number of bits</li>
            <li>Overflow causes errors or wrong results</li>
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
            Stress that most runtime bugs in beginner programs come from ignoring
            limits. Teaching size and range early builds a strong mental model
            for safe programming.
          </p>
        </section>
      </div>
    );
  }
}
