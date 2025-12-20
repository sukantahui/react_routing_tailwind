// src/components/study/java-core/file-handling/Topic9.jsx
// Topic 10: InputStream and OutputStream – Overview
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

export default class Topic9 extends Component {
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
            InputStream and OutputStream – Overview
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            <code>InputStream</code> and <code>OutputStream</code> are the
            <strong> foundation of all byte-based I/O</strong> in Java.
            Almost every file, network, or binary I/O class is built on top of them.
          </p>
        </header>

        {/* ======================================================
            CORE IDEA
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why InputStream and OutputStream Matter
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Java uses an inheritance-based design for I/O.
            At the top of the byte stream hierarchy are:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>InputStream</strong> – for reading bytes</li>
            <li><strong>OutputStream</strong> – for writing bytes</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Understanding these two classes makes it easier to learn
            file streams, buffered streams, and even socket streams later.
          </p>
        </section>

        {/* ======================================================
            INPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. InputStream
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>InputStream</strong> is an abstract class used to
            read raw byte data from a source.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong>
            <code> int read()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> int</li>
            <li><strong>Purpose:</strong> Reads one byte at a time</li>
            <li><strong>Returns:</strong> byte value (0–255) or -1 at end of stream</li>
          </ul>

          <JavaCodeBlock
            code={`InputStream in = new FileInputStream("data.bin");
int byteData = in.read();
in.close();`}
          />
        </section>

        {/* ======================================================
            OUTPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. OutputStream
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>OutputStream</strong> is an abstract class used to
            write raw byte data to a destination.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong>
            <code> void write(int b)</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> void</li>
            <li><strong>Purpose:</strong> Writes one byte</li>
            <li><strong>Parameter:</strong> lower 8 bits are written</li>
          </ul>

          <JavaCodeBlock
            code={`OutputStream out = new FileOutputStream("out.bin");
out.write(65); // writes byte value
out.close();`}
          />
        </section>

        {/* ======================================================
            DATA FLOW
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Data Flow Perspective
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Always remember:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>InputStream → data flows <em>into</em> the program</li>
            <li>OutputStream → data flows <em>out of</em> the program</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            The direction is always from the program’s point of view.
          </p>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A file-upload system used in <strong>Ichapur</strong> reads
            uploaded files using <code>InputStream</code> and stores
            backup copies using <code>OutputStream</code>.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            This same design is used in servers, cloud storage,
            and desktop applications.
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
            <li>Reading byte-by-byte without buffering</li>
            <li>Assuming read() returns a byte, not int</li>
            <li>Using OutputStream for text files directly</li>
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
            <li>Use buffering for performance</li>
            <li>Always close streams (or use try-with-resources)</li>
            <li>Use character streams for text</li>
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
            Notice that <code>read()</code> returns an <code>int</code>.
            This is intentional and important for detecting end-of-stream.
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
            <li>InputStream reads bytes</li>
            <li>OutputStream writes bytes</li>
            <li>Both are abstract base classes</li>
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
            Emphasize method signatures early.
            Students who understand why <code>read()</code> returns int
            develop stronger debugging and reasoning skills.
          </p>
        </section>
      </div>
    );
  }
}
