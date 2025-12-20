// src/components/study/java-core/file-handling/Topic8.jsx
// Topic 9: Types of Streams – Byte Streams vs Character Streams
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

export default class Topic8 extends Component {
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
            Byte Streams vs Character Streams
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Java provides two different types of streams to handle data:
            <strong> byte streams</strong> and
            <strong> character streams</strong>.
            Choosing the correct one is essential for correctness,
            performance, and data safety.
          </p>
        </header>

        {/* ======================================================
            CORE IDEA
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Two Types of Streams?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Not all data is the same. Some data is pure binary
            (images, audio, video), while some data is text
            (letters, symbols, numbers).
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Java separates streams to handle these two categories efficiently
            and correctly.
          </p>
        </section>

        {/* ======================================================
            BYTE STREAMS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Byte Streams
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Byte streams</strong> handle data as raw bytes (8-bit units).
            They are suitable for all kinds of binary data.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Base classes:</strong>
            <code> InputStream</code> and <code>OutputStream</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Work with binary files</li>
            <li>No character encoding involved</li>
            <li>Used for images, audio, video, PDFs</li>
          </ul>

          <JavaCodeBlock
            code={`// Byte stream example
InputStream in = new FileInputStream("photo.jpg");
OutputStream out = new FileOutputStream("copy.jpg");`}
          />
        </section>

        {/* ======================================================
            CHARACTER STREAMS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Character Streams
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Character streams</strong> handle data as characters (16-bit Unicode).
            They automatically manage character encoding and decoding.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Base classes:</strong>
            <code> Reader</code> and <code>Writer</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Work with text files</li>
            <li>Handle Unicode characters</li>
            <li>Ideal for reading and writing text</li>
          </ul>

          <JavaCodeBlock
            code={`// Character stream example
Reader reader = new FileReader("notes.txt");
Writer writer = new FileWriter("output.txt");`}
          />
        </section>

        {/* ======================================================
            COMPARISON
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Byte Streams vs Character Streams (Comparison)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Byte streams handle raw binary data</li>
            <li>Character streams handle text data</li>
            <li>Byte streams do not handle encoding</li>
            <li>Character streams handle Unicode automatically</li>
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
            A school application in <strong>Shyamnagar</strong> stores:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Student photos → Byte streams</li>
            <li>Student names and marks → Character streams</li>
          </ul>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Using the wrong stream can corrupt data or cause errors.
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
            <li>Using character streams for binary files</li>
            <li>Ignoring encoding issues</li>
            <li>Assuming both streams work the same way</li>
            <li>Not closing streams properly</li>
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
            <li>Use byte streams for binary data</li>
            <li>Use character streams for text</li>
            <li>Always close streams after use</li>
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
            Before choosing a stream, ask:
            “Is my data text or binary?”
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
            <li>Byte streams → binary data</li>
            <li>Character streams → text data</li>
            <li>Correct stream choice prevents data corruption</li>
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
            This decision—byte vs character—is foundational.
            If students master this early, many future bugs
            in file handling and networking simply disappear.
          </p>
        </section>
      </div>
    );
  }
}
