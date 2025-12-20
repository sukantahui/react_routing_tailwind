// src/components/study/java-core/file-handling/Topic10.jsx
// Topic 11: Reader and Writer – Overview
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

export default class Topic10 extends Component {
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
            Reader and Writer – Overview
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            <code>Reader</code> and <code>Writer</code> are the
            <strong> foundation of character-based I/O</strong> in Java.
            They are designed specifically to handle text and Unicode characters
            safely and correctly.
          </p>
        </header>

        {/* ======================================================
            WHY READER & WRITER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Reader and Writer Are Needed
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            While byte streams handle raw binary data, text data requires
            proper handling of characters, symbols, and encoding.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Reader</strong> and <strong>Writer</strong> automatically
            manage character encoding (Unicode), making them ideal
            for reading and writing text files.
          </p>
        </section>

        {/* ======================================================
            READER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Reader
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Reader</strong> is an abstract class used to read
            character data from a source such as a file or stream.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong>
            <code> int read()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> int</li>
            <li><strong>Purpose:</strong> Reads a single character</li>
            <li><strong>Returns:</strong> Unicode value or -1 at end of stream</li>
          </ul>

          <JavaCodeBlock
            code={`Reader reader = new FileReader("notes.txt");
int ch = reader.read();
reader.close();`}
          />
        </section>

        {/* ======================================================
            WRITER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Writer
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>Writer</strong> is an abstract class used to write
            character data to a destination such as a file or stream.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong>
            <code> void write(int c)</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> void</li>
            <li><strong>Purpose:</strong> Writes a single character</li>
            <li><strong>Parameter:</strong> Unicode character value</li>
          </ul>

          <JavaCodeBlock
            code={`Writer writer = new FileWriter("output.txt");
writer.write('A');
writer.close();`}
          />
        </section>

        {/* ======================================================
            BYTE VS CHARACTER REMINDER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Reader/Writer vs InputStream/OutputStream
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Reader/Writer → text data</li>
            <li>InputStream/OutputStream → binary data</li>
            <li>Reader/Writer handle Unicode automatically</li>
            <li>Byte streams do not handle encoding</li>
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
            A student record system in <strong>Shyamnagar</strong>
            stores names like <strong>Swadeep</strong> and
            <strong> Abhronila</strong>.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Using byte streams could corrupt text,
            but <code>Reader</code> and <code>Writer</code>
            preserve characters correctly.
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
            <li>Using byte streams for text files</li>
            <li>Ignoring encoding issues</li>
            <li>Forgetting to close readers and writers</li>
            <li>Assuming characters are always one byte</li>
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
            <li>Use Reader/Writer for all text operations</li>
            <li>Use buffering for performance</li>
            <li>Always close streams or use try-with-resources</li>
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
            If your data contains letters, symbols, or languages,
            prefer <code>Reader</code> and <code>Writer</code>.
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
            <li>Reader reads characters</li>
            <li>Writer writes characters</li>
            <li>Best for text and Unicode data</li>
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
            Reinforce that text is not bytes.
            Once students internalize this, encoding bugs
            practically disappear from their code.
          </p>
        </section>
      </div>
    );
  }
}
