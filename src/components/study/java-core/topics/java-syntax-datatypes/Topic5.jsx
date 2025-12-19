// src/components/study/java-core/Topic5.jsx
// Topic 6: Floating-point data types – float, double
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

export default class Topic5 extends Component {
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
            Floating-Point Data Types in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Not all numbers are whole numbers. Java uses <strong>floating-point data
            types</strong> to represent decimal and fractional values accurately in
            scientific, financial, and real-world calculations.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. What are Floating-Point Data Types?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Floating-point data types</strong> are used to store numbers that
            have decimal points or require fractional precision. Unlike integer
            types, they can represent values like <code>3.14</code>,
            <code>75.5</code>, or <code>0.001</code>.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Consider measuring the distance between <strong>Barrackpore</strong> and
            <strong> Shyamnagar</strong>. The distance may not be a whole number of
            kilometers. Students like <strong>Abhronila</strong> need floating-point
            numbers to represent such real-world values accurately.
          </p>
        </section>

        {/* ======================================================
            SVG – FLOAT vs DOUBLE COMPARISON
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. float vs double (Visual Comparison)
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <svg
              viewBox="0 0 760 260"
              className="w-full h-auto"
              role="img"
              aria-label="Java float vs double comparison diagram"
            >
              {/* float */}
              <rect x="80" y="80" width="240" height="100" rx="12" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-sky-500" />
              <text x="200" y="115" textAnchor="middle"
                className="fill-current text-sky-600 dark:text-sky-400 font-semibold text-sm">
                float
              </text>
              <text x="200" y="145" textAnchor="middle"
                className="fill-current text-slate-600 dark:text-slate-300 text-xs">
                4 bytes · less precision
              </text>

              {/* double */}
              <rect x="440" y="80" width="240" height="100" rx="12" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.2s" fill="freeze" />
              </rect>
              <text x="560" y="115" textAnchor="middle"
                className="fill-current text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                double
              </text>
              <text x="560" y="145" textAnchor="middle"
                className="fill-current text-slate-600 dark:text-slate-300 text-xs">
                8 bytes · higher precision
              </text>
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL BREAKDOWN
        ====================================================== */}
        <section className={`${reveal} space-y-10`} style={{ animationDelay: "320ms" }}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Technical Details of float and double
          </h2>

          <ul className="list-disc pl-6 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>
              <strong>float</strong> → 4 bytes, single precision  
              <br />Prototype: <code>float value = 3.14f;</code>
            </li>
            <li>
              <strong>double</strong> → 8 bytes, double precision  
              <br />Prototype: <code>double value = 3.14;</code>
            </li>
            <li>
              <strong>Return type:</strong> Not applicable (primitive types)
            </li>
            <li>
              <strong>Purpose:</strong> Store decimal and fractional numbers
            </li>
            <li>
              <strong>When & why:</strong> Use <code>double</code> by default for
              better accuracy
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "520ms" }}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            4. Floating-Point Examples
          </h2>

          <JavaCodeBlock
            code={`float temperature = 36.6f;
double distance = 45.75;
double pi = 3.141592653589793;

System.out.println(temperature);
System.out.println(distance);
System.out.println(pi);`}
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
            <li>Forgetting the <code>f</code> suffix with <code>float</code></li>
            <li>Comparing floating-point numbers using <code>==</code></li>
            <li>Expecting exact precision in decimal calculations</li>
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
            Observe how Java treats decimal values by default.
            Try removing the <code>f</code> and watch the compiler error.
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
            <li>Use <code>double</code> by default</li>
            <li>Use <code>float</code> only when memory is critical</li>
            <li>Avoid equality checks with floating-point values</li>
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
            <li>Decimals require floating-point types</li>
            <li><code>double</code> is more precise than <code>float</code></li>
            <li><code>f</code> suffix is mandatory for <code>float</code></li>
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
            Students often worry about choosing between <code>float</code> and
            <code>double</code>. Teach them to default to <code>double</code>
            and focus more on logic than premature optimization.
          </p>
        </section>
      </div>
    );
  }
}
