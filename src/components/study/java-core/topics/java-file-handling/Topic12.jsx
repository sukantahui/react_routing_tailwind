// src/components/study/java-core/file-handling/Topic12.jsx
// Topic 13: Reading and Writing Bytes from Files
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

export default class Topic12 extends Component {
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
            Reading and Writing Bytes from Files
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Reading and writing bytes is the most fundamental operation
            in Java file handling.  
            This topic shows <strong>safe, correct, and professional patterns</strong>
            for working with binary data.
          </p>
        </header>

        {/* ======================================================
            CORE IDEA
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Core Idea
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Byte-based file operations always follow this logic:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Open input stream</li>
            <li>Read bytes until end of file</li>
            <li>Write bytes to output</li>
            <li>Close streams</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Missing even one step can cause data corruption or resource leaks.
          </p>
        </section>

        {/* ======================================================
            READING BYTES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Reading Bytes Using <code>read()</code>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong> <code>int read()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> int</li>
            <li><strong>Purpose:</strong> Reads one byte</li>
            <li><strong>Returns:</strong> 0–255 or <code>-1</code> at end of file</li>
          </ul>

          <JavaCodeBlock
            code={`FileInputStream fis = new FileInputStream("input.bin");

int data;
while ((data = fis.read()) != -1) {
    System.out.println(data);
}

fis.close();`}
          />
        </section>

        {/* ======================================================
            WRITING BYTES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Writing Bytes Using <code>write()</code>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong> <code>void write(int b)</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> void</li>
            <li><strong>Purpose:</strong> Writes one byte</li>
            <li><strong>Note:</strong> Only lower 8 bits are written</li>
          </ul>

          <JavaCodeBlock
            code={`FileOutputStream fos = new FileOutputStream("output.bin");

fos.write(97);  // writes byte value
fos.close();`}
          />
        </section>

        {/* ======================================================
            FILE COPY PATTERN
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Standard File Copy Pattern
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            This loop is the backbone of almost all binary file operations.
          </p>

          <JavaCodeBlock
            code={`FileInputStream in = new FileInputStream("source.jpg");
FileOutputStream out = new FileOutputStream("backup.jpg");

int byteData;
while ((byteData = in.read()) != -1) {
    out.write(byteData);
}

in.close();
out.close();`}
          />
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            In a backup system used in <strong>Naihati</strong>,
            students like <strong>Tuhina</strong> upload documents.
            The system copies files byte-by-byte to a secure location.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            This guarantees that files remain unchanged.
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
            <li>Forgetting to check <code>-1</code></li>
            <li>Not closing streams</li>
            <li>Using byte streams for text files</li>
            <li>Writing outside the loop</li>
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
            <li>Always use loops for reading bytes</li>
            <li>Close streams in all cases</li>
            <li>Prefer buffered streams for performance</li>
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
            If you see <code>-1</code>, stop immediately.
            That is Java’s signal that the file has ended.
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
            <li>read() returns int</li>
            <li>-1 means end of file</li>
            <li>Loops are mandatory for full read</li>
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
            This loop is sacred.  
            Once students master it, file handling becomes predictable,
            testable, and safe across all applications.
          </p>
        </section>
      </div>
    );
  }
}
