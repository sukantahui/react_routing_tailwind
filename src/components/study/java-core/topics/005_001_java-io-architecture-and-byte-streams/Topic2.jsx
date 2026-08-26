// src/components/study/java-core/file-handling/Topic2.jsx
// Topic 3: java.io Package Overview
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

export default class Topic2 extends Component {
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
            java.io Package Overview
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>java.io</code> package is the backbone of Java file handling.
            It defines <strong>how data moves</strong> between a Java program
            and the outside world.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What is the java.io Package?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The <strong>java.io</strong> package contains classes and interfaces
            for performing <strong>input and output operations</strong>.
            It allows Java programs to communicate with:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Files on disk</li>
            <li>Keyboard and console</li>
            <li>Other programs or devices</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Think of <code>java.io</code> as a <strong>communication layer</strong>
            between Java memory and the real world.
          </p>
        </section>

        {/* ======================================================
            WHY java.io
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Why Java Needs the java.io Package
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Java programs run inside memory, but real applications must
            work with permanent data.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>To save marks of <strong>Swadeep</strong> permanently</li>
            <li>To read configuration files when an app starts</li>
            <li>To write logs for debugging errors</li>
            <li>To process large data efficiently</li>
          </ul>
        </section>

        {/* ======================================================
            STREAM CONCEPT (WITH SVG)
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Stream Concept (MOST IMPORTANT IDEA)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
            A <strong>stream</strong> is a continuous flow of data.
            Java never reads or writes data in one go —
            it flows step by step like water.
          </p>

          <svg viewBox="0 0 760 220" className="w-full h-auto transition-transform duration-300 hover:scale-[1.01]">
            {/* Source */}
            <rect x="40" y="70" width="200" height="80" rx="12"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-sky-500" />
            <text x="140" y="115" textAnchor="middle" className="fill-current text-sm font-semibold">
              Data Source
            </text>

            {/* Arrow */}
            <line x1="240" y1="110" x2="380" y2="110"
              stroke="currentColor" strokeWidth="2"
              className="text-emerald-500" />
            <polygon points="380,105 390,110 380,115" fill="currentColor"
              className="text-emerald-500" />

            {/* Stream */}
            <rect x="390" y="70" width="200" height="80" rx="12"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-amber-500" />
            <text x="490" y="115" textAnchor="middle" className="fill-current text-sm font-semibold">
              Stream
            </text>

            {/* Arrow */}
            <line x1="590" y1="110" x2="720" y2="110"
              stroke="currentColor" strokeWidth="2"
              className="text-emerald-500" />

            {/* Destination */}
            <rect x="590" y="70" width="200" height="80" rx="12"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-fuchsia-500" />
            <text x="690" y="115" textAnchor="middle" className="fill-current text-sm font-semibold">
              Java Program
            </text>
          </svg>

          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Input Stream</strong>: data comes into the program</li>
            <li><strong>Output Stream</strong>: data goes out of the program</li>
          </ul>
        </section>

        {/* ======================================================
            CLASS GROUPS (EXPANDED)
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Major Class Groups in java.io
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-300">
            <li>
              <strong>File</strong> – represents files and directories (metadata only)
            </li>
            <li>
              <strong>Byte Streams</strong> – handle binary data (images, PDFs)
            </li>
            <li>
              <strong>Character Streams</strong> – handle text data (letters, words)
            </li>
            <li>
              <strong>Buffered Streams</strong> – improve performance
            </li>
          </ul>
        </section>

        {/* ======================================================
            PRACTICAL EXAMPLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            5. Example: File Object vs Stream
          </h2>

          <JavaCodeBlock
            code={`File file = new File("notes.txt");
// File knows WHERE the file is

FileReader reader = new FileReader(file);
// Reader knows HOW to read data`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This distinction is critical:
            <strong> File represents a path, streams handle data.</strong>
          </p>
        </section>

                {/* ======================================================
            java.io HIERARCHY (MENTAL MAP)
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
            6. java.io Class Hierarchy (Mental Map)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
            One reason students struggle with file handling is because
            they never see the <strong>big picture</strong>.
            java.io is not random — it is carefully layered.
          </p>

          <svg viewBox="0 0 800 360" className="w-full h-auto hover:scale-[1.01] transition-transform">
            <text x="400" y="30" textAnchor="middle" className="fill-current font-semibold">
              java.io (Core I/O Layer)
            </text>

            {/* Input */}
            <rect x="60" y="80" width="300" height="80" rx="12"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-sky-500" />
            <text x="210" y="125" textAnchor="middle" className="fill-current">
              InputStream → Reader
            </text>

            {/* Output */}
            <rect x="440" y="80" width="300" height="80" rx="12"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-emerald-500" />
            <text x="590" y="125" textAnchor="middle" className="fill-current">
              OutputStream → Writer
            </text>

            {/* Examples */}
            <text x="210" y="190" textAnchor="middle" className="fill-current text-sm">
              FileInputStream → BufferedInputStream
            </text>
            <text x="590" y="190" textAnchor="middle" className="fill-current text-sm">
              FileWriter → BufferedWriter
            </text>
          </svg>

          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
            If this hierarchy is clear, choosing the right class becomes logical,
            not confusing.
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
            <li>Thinking File reads or writes data</li>
            <li>Using wrong stream type (text vs binary)</li>
            <li>Forgetting to close streams</li>
            <li>Ignoring IOException</li>
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
            <li>Understand streams before coding</li>
            <li>Choose correct stream type</li>
            <li>Use buffering for large files</li>
            <li>Handle exceptions properly</li>
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
            Whenever you feel confused, ask:
            “Am I working with a file location or data flow?”
          </p>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            Mini Checklist
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>java.io enables input/output</li>
            <li>Streams move data</li>
            <li>File represents path only</li>
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
            If students truly understand streams here, they will
            never blindly memorize file handling code.
            This topic decides long-term confidence.
          </p>
        </section>
      </div>
    );
  }
}
