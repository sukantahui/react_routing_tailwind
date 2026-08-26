// src/components/study/java-core/file-handling/Topic31.jsx
// Topic 31: Best Practices for File Handling
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Scoped keyframes – zero config animations
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic31 extends Component {
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
            Best Practices for File Handling
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            File handling is not only about making programs work.
            It is about writing code that is <strong>safe</strong>,
            <strong>maintainable</strong>, and
            <strong>predictable in real systems</strong>.
          </p>
        </header>

        {/* ======================================================
            PRACTICE 1
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Always Close File Resources
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Files are external OS-level resources.
            If they are not closed properly, they can cause
            file locks, memory leaks, and system instability.
          </p>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            <strong>Best practice:</strong>  
            Always use <code>try-with-resources</code>.
          </p>

          <JavaCodeBlock
            code={`try (BufferedReader br =
         new BufferedReader(new FileReader("data.txt"))) {

    System.out.println(br.readLine());

} catch (IOException e) {
    e.printStackTrace();
}`}
          />
        </section>

        {/* ======================================================
            PRACTICE 2
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Prefer Buffered Streams
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Buffered streams reduce the number of disk access operations,
            significantly improving performance.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Use <code>BufferedReader</code> for text input</li>
            <li>Use <code>BufferedWriter</code> for text output</li>
            <li>Avoid reading character-by-character</li>
          </ul>
        </section>

        {/* ======================================================
            PRACTICE 3
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Choose the Correct I/O API
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Selecting the wrong API can hurt performance
            and reduce code readability.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Text files → Reader / Writer</li>
            <li>Binary files → InputStream / OutputStream</li>
            <li>Small parsing tasks → Scanner</li>
          </ul>
        </section>

        {/* ======================================================
            PRACTICE 4
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Handle Exceptions Meaningfully
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            File operations frequently fail due to missing files,
            permission issues, or locked resources.
          </p>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Never ignore exceptions — log them or handle them gracefully.
          </p>
        </section>

        {/* ======================================================
            PRACTICE 5
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Never Assume File Operations Succeed
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Methods such as <code>delete()</code> and <code>renameTo()</code>
            return <code>boolean</code> values.
          </p>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Always check the return value before proceeding.
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
            <li>Forgetting to close streams</li>
            <li>Using Scanner for large files</li>
            <li>Overwriting files unintentionally</li>
            <li>Ignoring exception handling</li>
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
            Ask yourself: “What happens if this file does not exist
            or cannot be accessed?”
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
            <li>Use try-with-resources</li>
            <li>Prefer buffered streams</li>
            <li>Handle failures safely</li>
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
            Students often focus on “making it work”.
            Train them to think about safety and future failures —
            that is where professional coding begins.
          </p>
        </section>
      </div>
    );
  }
}
