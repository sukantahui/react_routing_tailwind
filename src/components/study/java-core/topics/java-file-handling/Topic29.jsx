// src/components/study/java-core/file-handling/Topic29.jsx
// Topic 30: Common File Handling Mistakes (Master Summary)
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic29 extends Component {
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
            Common File Handling Mistakes (Master Summary)
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Most file-handling bugs do not come from syntax —
            they come from <strong>wrong assumptions</strong>.
            This topic exposes those mistakes clearly.
          </p>
        </header>

        {/* ======================================================
            MISTAKE 1
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            1. Forgetting to Close Files
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Open files consume system resources.
            Forgetting to close them leads to memory leaks,
            file locks, and crashes.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Common in beginner code</li>
            <li>Very dangerous in production</li>
            <li>Fixed by try-with-resources</li>
          </ul>
        </section>

        {/* ======================================================
            MISTAKE 2
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-3">
            2. Using Scanner for Large Files
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Scanner is convenient but slow.
            Using it for large files causes performance issues.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Scanner → token parsing overhead</li>
            <li>BufferedReader → faster & scalable</li>
          </ul>
        </section>

        {/* ======================================================
            MISTAKE 3
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
            3. Ignoring Return Values
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Methods like <code>delete()</code> and <code>renameTo()</code>
            return <code>boolean</code> for a reason.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>false means failure</li>
            <li>Never assume success</li>
            <li>Always log or handle failures</li>
          </ul>
        </section>

        {/* ======================================================
            MISTAKE 4
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Overwriting Files Accidentally
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Forgetting the append flag
            can permanently destroy important data.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Logs must always append</li>
            <li>Reports may overwrite</li>
            <li>Decide intentionally</li>
          </ul>
        </section>

        {/* ======================================================
            MISTAKE 5
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Assuming Garbage Collector Closes Files
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Garbage Collection manages memory —
            not external resources like files.
          </p>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Files must be closed explicitly or via try-with-resources.
          </p>
        </section>

        {/* ======================================================
            MISTAKE 6
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-3">
            6. Misusing Serialization
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization is not a database and not encryption.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Do not store passwords</li>
            <li>Do not serialize everything</li>
            <li>Understand versioning risks</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD FAILURE STORY
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            7. Real-World Failure Story
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A reporting tool in <strong>Barrackpore</strong>
            overwrote logs daily instead of appending.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            When an incident occurred, no historical logs were available.
            The bug wasn’t complex — just a missing <code>true</code>.
          </p>
        </section>

        {/* ======================================================
            PROFESSIONAL CHECKLIST
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Professional Safety Checklist
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Use try-with-resources</li>
            <li>Choose correct I/O class</li>
            <li>Check return values</li>
            <li>Never overwrite blindly</li>
            <li>Log failures</li>
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
            File handling is about trust.
            Treat every operation as potentially failing.
          </p>
        </section>

        {/* ======================================================
            FINAL MINI CHECKLIST
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            Final Mini Checklist
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Files are external resources</li>
            <li>Failures are common</li>
            <li>Discipline prevents disasters</li>
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
            This topic is more important than many features.
            Students who internalize these mistakes
            avoid years of production pain.
          </p>
        </section>
      </div>
    );
  }
}
