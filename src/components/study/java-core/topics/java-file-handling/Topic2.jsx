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
            The <code>java.io</code> package is the foundation of file handling in Java.
            It provides classes and interfaces to work with files, streams, and
            data input/output operations.
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
            The <strong>java.io</strong> package contains classes that allow Java programs
            to interact with the outside world using streams.
            These streams help in transferring data between a program
            and external sources like files, keyboard, or network.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            In simple words, <code>java.io</code> acts as a bridge between
            Java programs and external data storage.
          </p>
        </section>

        {/* ======================================================
            WHY java.io
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Why Java Uses the java.io Package
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>To read data from files</li>
            <li>To write data into files</li>
            <li>To handle large data efficiently</li>
            <li>To support platform-independent file operations</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Without <code>java.io</code>, Java programs would remain
            isolated from real-world data.
          </p>
        </section>

        {/* ======================================================
            STREAM CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Stream Concept (Very Important)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A <strong>stream</strong> is a sequence of data.
            Java treats all input and output as streams of bytes or characters.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Input Stream → Data coming <em>into</em> the program</li>
            <li>Output Stream → Data going <em>out of</em> the program</li>
          </ul>
        </section>

        {/* ======================================================
            CLASS GROUPS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Major Class Groups in java.io
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>File</strong> – represents files and directories</li>
            <li><strong>Byte Streams</strong> – FileInputStream, FileOutputStream</li>
            <li><strong>Character Streams</strong> – FileReader, FileWriter</li>
            <li><strong>Buffered Streams</strong> – BufferedReader, BufferedWriter</li>
          </ul>
        </section>

        {/* ======================================================
            SIMPLE CODE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            5. Example: Using java.io.File
          </h2>

          <JavaCodeBlock
            code={`import java.io.File;

public class FileInfo {
    public static void main(String[] args) {
        File file = new File("student.txt");

        System.out.println(file.exists());
        System.out.println(file.getName());
    }
}`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This program demonstrates how the <code>File</code> class
            represents a file and provides useful information about it.
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
            <li>Assuming File reads or writes data directly</li>
            <li>Confusing File with streams</li>
            <li>Ignoring checked exceptions</li>
            <li>Hardcoding system-specific file paths</li>
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
            <li>Understand streams before writing file code</li>
            <li>Use buffering for better performance</li>
            <li>Separate file handling logic from core logic</li>
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
            Observe how Java treats every input and output as a stream.
            This idea will repeat across many classes.
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
            <li>java.io supports file handling</li>
            <li>Streams are the core concept</li>
            <li>File class represents files, not data</li>
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
            Students often rush into coding without understanding streams.
            Spend time here. Once streams are clear, file handling becomes logical
            instead of confusing.
          </p>
        </section>
      </div>
    );
  }
}
