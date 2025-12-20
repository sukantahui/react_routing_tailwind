// src/components/study/java-core/file-handling/Topic15.jsx
// Topic 16: Buffered Streams – Need and Advantages
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

export default class Topic15 extends Component {
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
            Buffered Streams – Need and Advantages
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Buffered streams improve file I/O performance by reducing
            the number of direct interactions with the file system.
            They are a <strong>performance upgrade</strong> over basic streams.
          </p>
        </header>

        {/* ======================================================
            CORE PROBLEM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. The Problem Without Buffering
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            When reading or writing data byte-by-byte or character-by-character,
            each operation may trigger a costly system call.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            For large files, this results in:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Slower performance</li>
            <li>Higher CPU usage</li>
            <li>Inefficient disk access</li>
          </ul>
        </section>

        {/* ======================================================
            WHAT IS BUFFERING
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. What is Buffering?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A <strong>buffer</strong> is a temporary memory area that stores data
            before it is read from or written to a file.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Instead of accessing the disk every time,
            data is transferred in chunks, making I/O operations faster.
          </p>
        </section>

        {/* ======================================================
            BUFFERED STREAMS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Buffered Streams in Java
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Java provides buffered stream classes that wrap existing streams:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>BufferedInputStream</code></li>
            <li><code>BufferedOutputStream</code></li>
            <li><code>BufferedReader</code></li>
            <li><code>BufferedWriter</code></li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            These classes do not replace streams — they enhance them.
          </p>
        </section>

        {/* ======================================================
            BASIC USAGE PATTERN
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Basic Buffered Stream Pattern
          </h2>

          <JavaCodeBlock
            code={`FileInputStream fis = new FileInputStream("data.bin");
BufferedInputStream bis = new BufferedInputStream(fis);

int data;
while ((data = bis.read()) != -1) {
    // process data
}

bis.close();`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Notice how the buffered stream wraps the basic stream.
          </p>
        </section>

        {/* ======================================================
            ADVANTAGES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Advantages of Buffered Streams
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Significant performance improvement</li>
            <li>Fewer disk access operations</li>
            <li>Smoother reading and writing for large files</li>
            <li>Cleaner and more professional code</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            6. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A log-processing system in <strong>Ichapur</strong> reads
            thousands of lines daily.
            Without buffering, the system slows down.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Buffered streams make the same program faster
            without changing business logic.
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
            <li>Assuming buffering changes file content</li>
            <li>Forgetting to flush buffered output</li>
            <li>Not closing the outer buffered stream</li>
            <li>Using unbuffered streams for large files</li>
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
            <li>Always buffer file I/O unless files are tiny</li>
            <li>Close only the buffered stream</li>
            <li>Flush output streams when needed</li>
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
            Buffering improves performance, not correctness.
            The output remains exactly the same.
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
            <li>Buffers reduce disk access</li>
            <li>Buffered streams wrap basic streams</li>
            <li>Performance improves automatically</li>
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
            Teach buffering as an *upgrade*, not a replacement.
            Students should first understand basic streams,
            then appreciate buffering as a performance layer.
          </p>
        </section>
      </div>
    );
  }
}
