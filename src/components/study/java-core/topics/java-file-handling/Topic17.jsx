// src/components/study/java-core/file-handling/Topic17.jsx
// Topic 18: BufferedReader and BufferedWriter
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

export default class Topic17 extends Component {
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
            BufferedReader &amp; BufferedWriter
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            <code>BufferedReader</code> and <code>BufferedWriter</code> are
            the most practical tools for <strong>reading and writing text files efficiently</strong>,
            especially when working line-by-line.
          </p>
        </header>

        {/* ======================================================
            WHY BUFFERED CHARACTER STREAMS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why BufferedReader &amp; BufferedWriter
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Reading text character-by-character works, but it is inefficient
            and inconvenient for real applications.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Buffered character streams add:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Internal buffering (performance)</li>
            <li>Line-based reading and writing</li>
            <li>Cleaner, more readable code</li>
          </ul>
        </section>

        {/* ======================================================
            BUFFEREDREADER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. BufferedReader
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor:</strong>
            <br />
            <code>BufferedReader(Reader in)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method signature:</strong>
            <br />
            <code>String readLine()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> String</li>
            <li><strong>Purpose:</strong> Reads one full line</li>
            <li><strong>Returns:</strong> null at end of file</li>
          </ul>

          <JavaCodeBlock
            code={`BufferedReader reader =
    new BufferedReader(new FileReader("notes.txt"));

String line;
while ((line = reader.readLine()) != null) {
    System.out.println(line);
}

reader.close();`}
          />
        </section>

        {/* ======================================================
            BUFFEREDWRITER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. BufferedWriter
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor:</strong>
            <br />
            <code>BufferedWriter(Writer out)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Common methods:</strong>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>void write(String s)</code></li>
            <li><code>void newLine()</code></li>
            <li><code>void flush()</code></li>
          </ul>

          <JavaCodeBlock
            code={`BufferedWriter writer =
    new BufferedWriter(new FileWriter("log.txt", true));

writer.write("Application started");
writer.newLine();
writer.flush();
writer.close();`}
          />
        </section>

        {/* ======================================================
            READLINE VS READ
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. readLine() vs read()
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>read()</code> → reads one character</li>
            <li><code>readLine()</code> → reads entire line</li>
            <li><code>readLine()</code> is faster and cleaner for text</li>
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
            A school system in <strong>Naihati</strong> generates daily reports.
            Each line represents one student record.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            <code>BufferedReader</code> and <code>BufferedWriter</code>
            make reading and writing such reports simple and fast.
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
            <li>Forgetting that <code>readLine()</code> returns null</li>
            <li>Not calling <code>newLine()</code></li>
            <li>Forgetting to flush buffered output</li>
            <li>Using FileReader directly for large files</li>
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
            <li>Use BufferedReader for line-based input</li>
            <li>Use BufferedWriter for logs and reports</li>
            <li>Always close the buffered stream</li>
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
            If your logic works but feels slow,
            buffering is often the missing piece.
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
            <li>BufferedReader → readLine()</li>
            <li>BufferedWriter → write + newLine()</li>
            <li>Best for text processing</li>
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
            Once students learn BufferedReader,
            their code style improves immediately.
            It encourages thinking in lines, not characters.
          </p>
        </section>
      </div>
    );
  }
}
