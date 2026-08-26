// src/components/study/java-core/file-handling/Topic19.jsx
// Topic 20: Scanner Class with Files
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic19 extends Component {
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
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

    return (
      <div className="space-y-16 px-4 sm:px-6 lg:px-10 py-10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Scanner Class with Files
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>Scanner</code> class can read data not only from the keyboard
            but also from files. It is especially useful when data is
            <strong> structured into tokens</strong> like numbers, words, or fields.
          </p>
        </header>

        {/* ======================================================
            WHY USE SCANNER WITH FILES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Use Scanner with Files?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Unlike <code>BufferedReader</code>, which reads lines,
            <code>Scanner</code> reads <strong>tokens</strong>
            (words, integers, doubles).
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Easy parsing of numbers</li>
            <li>Automatic type conversion</li>
            <li>Beginner-friendly syntax</li>
          </ul>
        </section>

        {/* ======================================================
            CREATING SCANNER WITH FILE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Creating Scanner for a File
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor signature:</strong>
            <br />
            <code>Scanner(File source)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Throws:</strong> <code>FileNotFoundException</code>
          </p>

          <JavaCodeBlock
            code={`File file = new File("data.txt");
Scanner sc = new Scanner(file);`}
          />
        </section>

        {/* ======================================================
            READING DATA
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Reading Data from File using Scanner
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Common methods:</strong>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>boolean hasNext()</code> – checks next token</li>
            <li><code>boolean hasNextInt()</code> – checks integer token</li>
            <li><code>String next()</code> – reads word</li>
            <li><code>int nextInt()</code> – reads integer</li>
            <li><code>String nextLine()</code> – reads full line</li>
          </ul>

          <JavaCodeBlock
            code={`Scanner sc = new Scanner(new File("marks.txt"));

while (sc.hasNextInt()) {
    int marks = sc.nextInt();
    System.out.println(marks);
}

sc.close();`}
          />
        </section>

        {/* ======================================================
            TOKEN VS LINE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Token-Based vs Line-Based Reading
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>Scanner</code> → tokens (words, numbers)</li>
            <li><code>BufferedReader</code> → full lines</li>
            <li>Scanner is slower but easier</li>
            <li>BufferedReader is faster and scalable</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A result-processing tool in <strong>Shyamnagar</strong>
            reads roll numbers and marks from a file.
            <code> Scanner</code> simplifies numeric extraction
            without manual parsing.
          </p>
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Pitfalls
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Mixing <code>next()</code> and <code>nextLine()</code> incorrectly</li>
            <li>Not checking <code>hasNextX()</code> before reading</li>
            <li>Using Scanner for very large files</li>
            <li>Forgetting to close the Scanner</li>
          </ul>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Best Practices
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Use Scanner for small to medium structured files</li>
            <li>Validate tokens with <code>hasNextX()</code></li>
            <li>Prefer BufferedReader for large text files</li>
          </ul>
        </section>

        {/* ======================================================
            HINT
        ====================================================== */}
        <section className={`${reveal} ${card} border-dashed border-teal-400/50`}>
          <h2 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
            💡 Hint
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            If you are converting strings to numbers manually,
            Scanner might already solve that for you.
          </p>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            Mini Checklist
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Scanner reads tokens</li>
            <li>hasNextX() prevents errors</li>
            <li>Close Scanner always</li>
          </ul>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section
          className={`${reveal} rounded-xl border border-slate-300 dark:border-slate-700 p-6 bg-slate-100 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎓 Teacher’s Note
          </h2>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Teach Scanner as a convenience tool, not a performance tool.
            Knowing *when not to use it* is a sign of maturity.
          </p>
        </section>
      </div>
    );
  }
}
