// src/components/study/java-core/Topic4.jsx
// Topic 5: Primitive data types – byte, short, int, long
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

export default class Topic4 extends Component {
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
            Primitive Integer Data Types in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Java provides <strong>primitive data types</strong> to store simple values
            efficiently. Among them, <code>byte</code>, <code>short</code>,
            <code>int</code>, and <code>long</code> are used to store whole numbers
            of different sizes.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. What are Primitive Integer Data Types?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Primitive data types</strong> are the most basic data types in Java.
            They store <em>actual values</em> directly in memory and do not provide
            additional methods or behavior.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Imagine recording attendance in a school at <strong>Barrackpore</strong>.
            Small classes may need only a small register, while the whole school
            requires a much bigger register. Similarly, Java offers multiple
            integer data types depending on how large the number can be.
          </p>
        </section>

        {/* ======================================================
            SVG – INTEGER TYPE RANGE FLOW
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. Integer Types by Size (Visual Comparison)
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <svg
              viewBox="0 0 760 260"
              className="w-full h-auto"
              role="img"
              aria-label="Java integer data types size comparison"
            >
              {[
                { x: 40, label: "byte (1B)", color: "text-sky-500" },
                { x: 200, label: "short (2B)", color: "text-emerald-500" },
                { x: 360, label: "int (4B)", color: "text-indigo-500" },
                { x: 520, label: "long (8B)", color: "text-rose-500" },
              ].map((item, index) => (
                <g key={item.label}>
                  <rect
                    x={item.x}
                    y="80"
                    width="140"
                    height="100"
                    rx="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={item.color}
                  >
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      dur="0.4s"
                      begin={`${0.1 * index}s`}
                      fill="freeze"
                    />
                  </rect>
                  <text
                    x={item.x + 70}
                    y="135"
                    textAnchor="middle"
                    className="fill-current text-slate-700 dark:text-slate-300 text-sm font-semibold"
                  >
                    {item.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL BREAKDOWN
        ====================================================== */}
        <section className={`${reveal} space-y-10`} style={{ animationDelay: "320ms" }}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Technical Details of Integer Types
          </h2>

          <ul className="list-disc pl-6 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>
              <strong>byte</strong> → 1 byte (8 bits), range: -128 to 127  
              <br />Used when memory is critical (e.g., file handling, streams)
            </li>
            <li>
              <strong>short</strong> → 2 bytes, range: -32,768 to 32,767  
              <br />Rarely used, but saves memory compared to <code>int</code>
            </li>
            <li>
              <strong>int</strong> → 4 bytes, range: approx ±2 billion  
              <br />Default and most commonly used integer type
            </li>
            <li>
              <strong>long</strong> → 8 bytes, very large range  
              <br />Used for large values like population or timestamps
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "520ms" }}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            4. Integer Data Type Examples
          </h2>

          <JavaCodeBlock
            code={`byte age = 12;
short totalStudents = 1500;
int distanceInMeters = 45000;
long populationOfIndia = 1400000000L;

System.out.println(age);
System.out.println(totalStudents);
System.out.println(distanceInMeters);
System.out.println(populationOfIndia);`}
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
            <li>Assigning values beyond the allowed range</li>
            <li>Forgetting <code>L</code> suffix with <code>long</code> literals</li>
            <li>Using <code>byte</code> or <code>short</code> unnecessarily</li>
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
            Think about the maximum value your variable might store in the future,
            not just the current input.
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
            <li>Use <code>int</code> by default unless there is a strong reason</li>
            <li>Use <code>long</code> for large numeric values</li>
            <li>Prefer clarity over micro-optimizations</li>
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
            <li>Choose data type based on range</li>
            <li>Remember size differences</li>
            <li>Use suffix <code>L</code> for long values</li>
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
            Beginners often overthink data type selection. Teach them to start
            with <code>int</code>, understand ranges clearly, and only optimize
            when the problem truly demands it.
          </p>
        </section>
      </div>
    );
  }
}
