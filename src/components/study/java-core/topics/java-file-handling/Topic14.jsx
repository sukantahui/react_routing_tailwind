// src/components/study/java-core/file-handling/Topic14.jsx
// Topic 15: Reading and Writing Text Files (Practical Patterns)
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

export default class Topic14 extends Component {
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
            Reading and Writing Text Files
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            This topic demonstrates <strong>practical, safe patterns</strong>
            for reading and writing text files using character streams.
            These patterns are used in logs, reports, notes, and configuration files.
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
            Text file handling follows a predictable structure:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Open a Reader to read characters</li>
            <li>Open a Writer to write characters</li>
            <li>Use a loop until end-of-file</li>
            <li>Close both resources</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Skipping these steps can cause partial reads or data loss.
          </p>
        </section>

        {/* ======================================================
            READING TEXT (CHAR-BY-CHAR)
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Reading Text using <code>FileReader</code>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong> <code>int read()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> int</li>
            <li><strong>Purpose:</strong> Reads one character</li>
            <li><strong>Returns:</strong> Unicode value or <code>-1</code> at end of file</li>
          </ul>

          <JavaCodeBlock
            code={`FileReader reader = new FileReader("notes.txt");

int ch;
while ((ch = reader.read()) != -1) {
    System.out.print((char) ch);
}

reader.close();`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This approach is simple and reliable, though not the fastest
            for very large files.
          </p>
        </section>

        {/* ======================================================
            WRITING TEXT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Writing Text using <code>FileWriter</code>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong> <code>void write(int c)</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> void</li>
            <li><strong>Purpose:</strong> Writes one character</li>
            <li><strong>Append mode:</strong> Optional (prevents overwrite)</li>
          </ul>

          <JavaCodeBlock
            code={`FileWriter writer = new FileWriter("notes.txt", true);

writer.write('H');
writer.write('i');
writer.write('\\n');

writer.close();`}
          />
        </section>

        {/* ======================================================
            TEXT COPY PATTERN
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Standard Text Copy Pattern
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            This pattern safely copies text from one file to another.
          </p>

          <JavaCodeBlock
            code={`FileReader in = new FileReader("input.txt");
FileWriter out = new FileWriter("output.txt");

int ch;
while ((ch = in.read()) != -1) {
    out.write(ch);
}

in.close();
out.close();`}
          />
        </section>

        {/* ======================================================
            APPEND VS OVERWRITE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Append vs Overwrite
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>new FileWriter("file.txt")</code> → overwrites file</li>
            <li><code>new FileWriter("file.txt", true)</code> → appends content</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Logs and reports almost always use append mode.
          </p>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            6. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A daily attendance system in <strong>Barrackpore</strong>
            stores student remarks as text.
            Each new entry is appended without deleting older records.
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
            <li>Forgetting <code>-1</code> check</li>
            <li>Overwriting files unintentionally</li>
            <li>Not closing reader/writer</li>
            <li>Using byte streams for text</li>
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
            <li>Prefer character streams for text</li>
            <li>Use append mode carefully</li>
            <li>Switch to buffered streams for large files</li>
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
            If performance feels slow, buffering is the next logical step.
            We will cover that next.
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
            <li>Use FileReader/FileWriter for text</li>
            <li>Always check <code>-1</code></li>
            <li>Append mode prevents data loss</li>
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
            This topic bridges fundamentals and performance.
            Once students master these patterns, buffered I/O
            becomes an easy upgrade—not a mystery.
          </p>
        </section>
      </div>
    );
  }
}
