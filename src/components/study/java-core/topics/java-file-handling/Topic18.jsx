// src/components/study/java-core/file-handling/Topic18.jsx
// Topic 19: Reading Files Line by Line using BufferedReader
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

export default class Topic18 extends Component {
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
            Reading Files Line by Line using BufferedReader
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Line-by-line file reading is the <strong>most common</strong> and
            <strong> most efficient</strong> way to process text files in Java.
            This topic teaches the correct and professional way to do it.
          </p>
        </header>

        {/* ======================================================
            WHY LINE BY LINE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Read Files Line by Line?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Most real-world text files are structured as lines:
            logs, reports, CSVs, configuration files, and exam data.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Each line represents one record</li>
            <li>Easy to process and debug</li>
            <li>Memory-efficient for large files</li>
          </ul>
        </section>

        {/* ======================================================
            readLine() METHOD
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. The <code>readLine()</code> Method
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong>
            <br />
            <code>String readLine()</code>
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> String</li>
            <li><strong>Purpose:</strong> Reads one complete line</li>
            <li><strong>EOF signal:</strong> Returns <code>null</code></li>
            <li><strong>Newline:</strong> Removed automatically</li>
          </ul>
        </section>

        {/* ======================================================
            STANDARD LOOP PATTERN
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Standard Line-by-Line Reading Pattern
          </h2>

          <JavaCodeBlock
            code={`BufferedReader reader =
    new BufferedReader(new FileReader("data.txt"));

String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}

reader.close();`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This loop is <strong>interview-ready</strong> and
            <strong>production-safe</strong>.
          </p>
        </section>

        {/* ======================================================
            WHY NULL MATTERS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Why <code>null</code> Is Important
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <code>readLine()</code> returns <code>null</code> when the end of file
            is reached — not an empty string.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>null</code> → no more lines</li>
            <li><code>""</code> → empty line</li>
            <li>Confusing these causes bugs</li>
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
            A marks processing system in <strong>Barrackpore</strong>
            reads one student record per line:
            <strong> Swadeep</strong>, <strong>Tuhina</strong>,
            <strong> Abhronila</strong>.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Line-by-line reading makes validation and reporting easy.
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
            <li>Using <code>!= ""</code> instead of <code>!= null</code></li>
            <li>Reading entire file into memory</li>
            <li>Forgetting to close BufferedReader</li>
            <li>Assuming newline is included</li>
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
            <li>Always use while-loop with <code>readLine()</code></li>
            <li>Process one line at a time</li>
            <li>Close reader in all cases</li>
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
            If your file has records separated by new lines,
            this is the correct approach — no alternatives needed.
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
            <li>Use BufferedReader</li>
            <li>Loop until <code>null</code></li>
            <li>One line = one record</li>
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
            This pattern appears everywhere — exams, interviews,
            real systems.  
            Make students memorize the logic, not the syntax.
          </p>
        </section>
      </div>
    );
  }
}
