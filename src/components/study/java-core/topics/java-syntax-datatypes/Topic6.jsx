// src/components/study/java-core/Topic6.jsx
// Topic 7: Character data type (char) and Unicode
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

export default class Topic6 extends Component {
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
            Character Data Type (char) & Unicode in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Java is a <strong>global language</strong>. To support characters from
            all languages, symbols, and emojis, Java uses the
            <strong>char data type</strong> based on <strong>Unicode</strong>.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL EXPLANATION
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            1. What is the char Data Type?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>char</code> data type is used to store a <strong>single character</strong>
            such as a letter, digit, or symbol. Unlike many languages, Java’s
            <code>char</code> is <strong>2 bytes (16 bits)</strong> because it is
            designed to support Unicode characters.
          </p>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think of student roll initials in a school at <strong>Ichapur</strong>.
            A single letter like <strong>‘A’</strong> for <strong>Abhronila</strong>
            or <strong>‘S’</strong> for <strong>Swadeep</strong> fits perfectly into
            a <code>char</code>.
          </p>
        </section>

        {/* ======================================================
            SVG – CHAR & UNICODE FLOW
        ====================================================== */}
        <section className={`${reveal} space-y-4`} style={{ animationDelay: "220ms" }}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            2. How char Uses Unicode (Visual Flow)
          </h2>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <svg
              viewBox="0 0 760 260"
              className="w-full h-auto"
              role="img"
              aria-label="Java char and Unicode mapping diagram"
            >
              {/* Character */}
              <rect x="40" y="80" width="200" height="100" rx="12" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-sky-500" />
              <text x="140" y="120" textAnchor="middle"
                className="fill-current text-sky-600 dark:text-sky-400 font-semibold text-sm">
                'A'
              </text>
              <text x="140" y="145" textAnchor="middle"
                className="fill-current text-slate-600 dark:text-slate-300 text-xs">
                Character
              </text>

              {/* Arrow */}
              <line x1="240" y1="130" x2="360" y2="130"
                stroke="currentColor" strokeWidth="2" className="text-emerald-500">
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.2s" fill="freeze" />
              </line>

              {/* Unicode */}
              <rect x="360" y="80" width="200" height="100" rx="12" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-emerald-500" />
              <text x="460" y="120" textAnchor="middle"
                className="fill-current text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                Unicode Value
              </text>
              <text x="460" y="145" textAnchor="middle"
                className="fill-current text-slate-600 dark:text-slate-300 text-xs">
                65
              </text>

              {/* Storage */}
              <rect x="600" y="80" width="120" height="100" rx="12" fill="none"
                stroke="currentColor" strokeWidth="2" className="text-indigo-500" />
              <text x="660" y="125" textAnchor="middle"
                className="fill-current text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                16-bit
              </text>
            </svg>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL DETAILS
        ====================================================== */}
        <section className={`${reveal} space-y-10`} style={{ animationDelay: "320ms" }}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Technical Explanation of char
          </h2>

          <ul className="list-disc pl-6 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <li>
              <strong>Prototype / Signature:</strong> <code>char ch = 'A';</code>
            </li>
            <li>
              <strong>Return type:</strong> Not applicable (primitive type)
            </li>
            <li>
              <strong>Size:</strong> 2 bytes (16 bits)
            </li>
            <li>
              <strong>Purpose:</strong> Store a single Unicode character
            </li>
            <li>
              <strong>When & why:</strong> Needed for internationalization and symbols
            </li>
          </ul>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} space-y-6`} style={{ animationDelay: "520ms" }}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            4. char and Unicode Examples
          </h2>

          <JavaCodeBlock
            code={`char letter = 'A';
char digit = '7';
char symbol = '#';
char unicodeChar = '\\u0905'; // Hindi letter 'अ'

System.out.println(letter);
System.out.println(digit);
System.out.println(symbol);
System.out.println(unicodeChar);`}
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
            <li>Using double quotes instead of single quotes</li>
            <li>Trying to store multiple characters in <code>char</code></li>
            <li>Confusing <code>char</code> with <code>String</code></li>
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
            Observe how single quotes and double quotes behave differently in Java.
            Try replacing <code>'A'</code> with <code>"A"</code> and see the error.
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
            <li>Use <code>char</code> only for single characters</li>
            <li>Use <code>String</code> for words or sentences</li>
            <li>Leverage Unicode for multilingual applications</li>
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
            <li><code>char</code> stores one character</li>
            <li>Uses Unicode internally</li>
            <li>2 bytes in size</li>
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
            Emphasize early that Java uses Unicode, not ASCII. This single idea
            explains why <code>char</code> is 2 bytes and prepares students for
            global software development.
          </p>
        </section>
      </div>
    );
  }
}
