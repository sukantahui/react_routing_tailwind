// src/components/study/java-core/file-handling/Topic7.jsx
// Topic 8: Introduction to Java I/O Streams
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

export default class Topic7 extends Component {
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
            Introduction to Java I/O Streams
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            In Java, all file input and output operations are performed using
            <strong> streams</strong>.  
            Understanding streams is the foundation of all file handling,
            buffering, and data transfer operations.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What is a Stream?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A <strong>stream</strong> is a continuous flow of data between
            a program and an external source such as a file, keyboard,
            or network.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Java does not read or write data all at once.
            Instead, it transfers data <em>step by step</em> through streams.
          </p>
        </section>

        {/* ======================================================
            DIRECTION OF STREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Direction of Data Flow
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Streams are classified based on the direction of data flow.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Input Stream</strong> → Data flows <em>into</em> the program
            </li>
            <li>
              <strong>Output Stream</strong> → Data flows <em>out of</em> the program
            </li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This direction is always from the program’s point of view.
          </p>
        </section>

        {/* ======================================================
            REAL-WORLD ANALOGY
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Real-World Analogy
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think of water flowing through a pipe.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>The pipe → Stream</li>
            <li>Water entering the house → Input Stream</li>
            <li>Water leaving the house → Output Stream</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Similarly, Java uses streams as pipelines to move data.
          </p>
        </section>

        {/* ======================================================
            STREAM TYPES PREVIEW
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Types of Streams (High-Level View)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Java broadly divides streams into two categories:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Byte Streams</strong> – handle raw binary data</li>
            <li><strong>Character Streams</strong> – handle text data</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            We will study each of these in detail in upcoming topics.
          </p>
        </section>

        {/* ======================================================
            TECHNICAL FOUNDATION
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Core Stream Classes (Conceptual)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>InputStream</code> – base class for input byte streams</li>
            <li><code>OutputStream</code> – base class for output byte streams</li>
            <li><code>Reader</code> – base class for character input</li>
            <li><code>Writer</code> – base class for character output</li>
          </ul>
        </section>

        {/* ======================================================
            SIMPLE CODE VIEW
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            6. Conceptual Code View
          </h2>

          <JavaCodeBlock
            code={`// Input Stream example (conceptual)
InputStream in = new FileInputStream("data.txt");

// Output Stream example (conceptual)
OutputStream out = new FileOutputStream("output.txt");`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            These lines show how Java connects files to streams.
            Actual reading and writing will be covered next.
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
            <li>Confusing streams with files</li>
            <li>Not closing streams</li>
            <li>Using character streams for binary data</li>
            <li>Ignoring exceptions during I/O</li>
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
            <li>Understand data type before choosing stream</li>
            <li>Always close streams after use</li>
            <li>Use buffering for performance</li>
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
            Ask yourself: is my data text or binary?
            The answer determines which stream to use.
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
            <li>Streams move data</li>
            <li>Input vs Output direction matters</li>
            <li>Streams are the base of file handling</li>
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
            Do not rush streams. This concept reappears in files, networking,
            serialization, and even databases. A strong foundation here
            makes advanced Java far easier.
          </p>
        </section>
      </div>
    );
  }
}
