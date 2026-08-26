// src/components/study/java-core/file-handling/Topic24.jsx
// Topic 25: Appending vs Overwriting Files
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

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

export default class Topic24 extends Component {
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
            Appending vs Overwriting Files
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            One small boolean flag can decide whether your application
            <strong> preserves data</strong> or
            <strong> destroys it permanently</strong>.
            This topic explains that decision clearly.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Core Concept
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            When writing to a file, Java gives two choices:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Overwrite</strong> → erase existing content</li>
            <li><strong>Append</strong> → add content at the end</li>
          </ul>
        </section>

        {/* ======================================================
            OVERWRITING FILES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Overwriting a File
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor signature:</strong>
            <br />
            <code>FileWriter(String fileName)</code>
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            This mode deletes existing content before writing new data.
          </p>

          <JavaCodeBlock
            code={`FileWriter writer = new FileWriter("report.txt");
writer.write("New report generated");
writer.close();`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            ⚠️ Old data is permanently lost.
          </p>
        </section>

        {/* ======================================================
            APPENDING FILES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Appending to a File
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor signature:</strong>
            <br />
            <code>FileWriter(String fileName, boolean append)</code>
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Passing <code>true</code> enables append mode.
          </p>

          <JavaCodeBlock
            code={`FileWriter writer = new FileWriter("log.txt", true);
writer.write("Application started");
writer.write(System.lineSeparator());
writer.close();`}
          />
        </section>

        {/* ======================================================
            SIDE-BY-SIDE COMPARISON
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Overwrite vs Append – Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-200 dark:bg-slate-800">
                <tr>
                  <th className="border px-4 py-2">Aspect</th>
                  <th className="border px-4 py-2">Overwrite</th>
                  <th className="border px-4 py-2">Append</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Existing Data</td>
                  <td className="border px-4 py-2">Deleted</td>
                  <td className="border px-4 py-2">Preserved</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Use Case</td>
                  <td className="border px-4 py-2">Reports</td>
                  <td className="border px-4 py-2">Logs</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Risk</td>
                  <td className="border px-4 py-2">High</td>
                  <td className="border px-4 py-2">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A logging system in <strong>Naihati</strong> appends messages
            to avoid losing history.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            A marksheet generator overwrites files to avoid mixing old data.
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
            <li>Forgetting append flag</li>
            <li>Accidentally overwriting logs</li>
            <li>Not adding new lines</li>
            <li>Using overwrite for audit data</li>
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
            <li>Use append for logs and history</li>
            <li>Overwrite only when intentional</li>
            <li>Add line separators explicitly</li>
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
            Ask yourself: “If the program runs twice,
            should old data remain or vanish?”
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
            <li>Append = true preserves data</li>
            <li>Overwrite = default behavior</li>
            <li>Choose consciously</li>
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
            Many production failures start with accidental overwrites.
            Teach students to treat file-writing as a *dangerous operation*
            unless explicitly safe.
          </p>
        </section>
      </div>
    );
  }
}
