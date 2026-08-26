// src/components/study/java-core/file-handling/Topic31.jsx
// Topic 31: Performance Considerations in File I/O
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

export default class Topic30 extends Component {
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
            Performance Considerations in File I/O
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            File I/O performance is often the <strong>hidden bottleneck</strong>
            in Java applications. This topic explains why some file-handling
            programs feel slow, how professionals avoid that, and what decisions
            matter most in real systems.
          </p>
        </header>

        {/* ======================================================
            WHY PERFORMANCE MATTERS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why File I/O Performance Matters
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            File operations interact with the operating system and disk.
            Compared to memory operations, disk I/O is <strong>very slow</strong>.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            A poorly written file loop can slow an entire application —
            even if the logic is correct.
          </p>
        </section>

        {/* ======================================================
            BUFFERING CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Buffering – The Biggest Performance Booster
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Buffering reduces the number of physical disk accesses
            by reading or writing data in chunks.
          </p>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            <strong>Professional rule:</strong>  
            Avoid unbuffered streams for large or repeated file operations.
          </p>
        </section>

        {/* ======================================================
            UNBUFFERED VS BUFFERED
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Unbuffered vs Buffered Streams
          </h2>

          <JavaCodeBlock
            code={`// Slow: unbuffered
FileReader fr = new FileReader("data.txt");
int ch;
while ((ch = fr.read()) != -1) {
    // process
}

// Faster: buffered
BufferedReader br = new BufferedReader(
    new FileReader("data.txt")
);
String line;
while ((line = br.readLine()) != null) {
    // process
}`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Buffered streams dramatically reduce system calls,
            especially for large files.
          </p>
        </section>

        {/* ======================================================
            CHOOSING RIGHT API
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Choosing the Right API
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>BufferedReader</strong> → text files, line-by-line</li>
            <li><strong>BufferedWriter</strong> → text output</li>
            <li><strong>FileInputStream</strong> → binary data</li>
            <li><strong>Scanner</strong> → small files, user-friendly parsing</li>
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
            In a reporting system at <strong>Barrackpore</strong>,
            daily attendance logs grew to thousands of lines.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Switching from <code>Scanner</code> to
            <code>BufferedReader</code> reduced processing time
            from minutes to seconds.
          </p>
        </section>

        {/* ======================================================
            COMMON PERFORMANCE MISTAKES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Performance Mistakes
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Reading one byte/character at a time</li>
            <li>Using Scanner for large files</li>
            <li>Frequent open/close operations inside loops</li>
            <li>Ignoring buffering completely</li>
          </ul>
        </section>

        {/* ======================================================
            PROFESSIONAL TIPS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Professional Tips & Tricks
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Open files once, process fully, then close</li>
            <li>Use buffering by default</li>
            <li>Measure performance before optimizing further</li>
            <li>Keep file-handling code small and isolated</li>
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
            Observe how often your code touches the disk.
            Fewer touches usually mean better performance.
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
            <li>Prefer buffered streams</li>
            <li>Avoid unnecessary disk access</li>
            <li>Choose the correct I/O class</li>
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
            Performance problems are often invisible at first.
            Teach students to think about *how often* I/O happens,
            not just whether it works.
          </p>
        </section>
      </div>
    );
  }
}
