// src/components/study/java-core/file-handling/Topic0.jsx
// Topic 1: Introduction to File Handling in Java
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic0 extends Component {
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

        {/* ================= HEADER ================= */}
        <header className={`${reveal} space-y-4`}>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Introduction to File Handling in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            File handling allows Java programs to <strong>store, retrieve, and manage data permanently</strong>.
            It is the bridge between simple classroom programs and real-world software systems.
          </p>
        </header>

        {/* ================= CONCEPT ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What is File Handling?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <strong>File handling</strong> is the technique of working with files using a program.
            It includes creating files, writing data into them, reading data back, updating content,
            and sometimes deleting files when they are no longer needed.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            In simple terms, file handling allows a program to <em>remember information</em>.
            Without files, all data exists only temporarily in memory and disappears
            as soon as the program stops.
          </p>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Why File Handling is Important in Real Life
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Consider a student management system used in a school at <strong>Barrackpore</strong>.
            If student <strong>Abhronila</strong>’s marks are stored only in variables,
            everything is lost when the application closes.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            By storing data in files:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Student records remain safe</li>
            <li>Reports can be generated anytime</li>
            <li>Applications can restart without data loss</li>
            <li>Multiple programs can share the same data</li>
          </ul>
        </section>

        {/* ================= MEMORY VS FILE ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
            3. Memory Data vs File Data (Key Concept)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
            Understanding the difference between memory and file storage is crucial.
          </p>

          <div className="transition-transform duration-300 hover:scale-[1.01]">
            <svg viewBox="0 0 760 260" className="w-full h-auto">
              <rect x="40" y="70" width="260" height="120" rx="12"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="text-sky-500" />
              <text x="170" y="120" textAnchor="middle" className="fill-current text-sm">
                Program Memory (Temporary)
              </text>

              <line x1="300" y1="130" x2="460" y2="130"
                stroke="currentColor" strokeWidth="2"
                className="text-emerald-500">
                <animate attributeName="opacity" from="0" to="1" dur="0.6s" fill="freeze" />
              </line>

              <rect x="460" y="70" width="260" height="120" rx="12"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="text-emerald-500" />
              <text x="590" y="120" textAnchor="middle" className="fill-current text-sm">
                File Storage (Permanent)
              </text>
            </svg>
          </div>
        </section>

        {/* ================= JAVA SUPPORT ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. How Java Supports File Handling
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Java provides file handling mainly through the <code>java.io</code> package.
            This package contains classes that represent files and streams used
            to read or write data.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>File</strong> – represents files and directories</li>
            <li><strong>Input/Output Streams</strong> – work with raw data</li>
            <li><strong>Reader/Writer</strong> – work with text data</li>
          </ul>
        </section>

        {/* ================= CODE ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            5. First Program Insight
          </h2>

          <JavaCodeBlock
            code={`import java.io.File;

public class FileDemo {
    public static void main(String[] args) {
        File file = new File("data.txt");
        System.out.println(file.exists());
    }
}`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This program does not read or write data yet. It simply checks
            whether a file exists. Even this small step is part of safe
            professional file handling.
          </p>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Pitfalls
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Assuming files always exist</li>
            <li>Ignoring checked exceptions</li>
            <li>Hardcoding absolute paths</li>
            <li>Mixing file logic with business logic</li>
          </ul>
        </section>

        {/* ================= HINT ================= */}
        <section className={`${reveal} ${card} border-dashed border-teal-400/50`}>
          <h2 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
            💡 Hint
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think about what information should survive program execution.
            Ask yourself: <em>Should this data be remembered tomorrow?</em>
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`${reveal} rounded-xl border border-slate-300 dark:border-slate-700 p-6 bg-slate-100 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎓 Teacher’s Note
          </h2>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            File handling marks the transition from beginner-level programs
            to real-world applications. Encourage students to think about
            data lifecycle, safety, and responsibility from the very beginning.
          </p>
        </section>

                {/* ================= TEXT VS BINARY ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
            6. Text Files vs Binary Files (Important Distinction)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Not all files store data in the same way. In Java, file handling
            is broadly divided into <strong>text file handling</strong> and
            <strong> binary file handling</strong>.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Text files</strong> store readable characters
              (example: <code>.txt</code>, <code>.csv</code>, <code>.properties</code>)
            </li>
            <li>
              <strong>Binary files</strong> store raw bytes
              (example: images, audio, PDFs, serialized objects)
            </li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Java uses <strong>Reader / Writer</strong> classes for text files
            and <strong>InputStream / OutputStream</strong> classes for binary files.
            Mixing them incorrectly can corrupt data.
          </p>
        </section>

        {/* ================= REAL APPLICATIONS ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-violet-600 dark:text-violet-400 mb-3">
            7. File Handling in Real Java Applications
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            File handling is rarely used in isolation. In professional Java
            applications, it supports core system features.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Logging:</strong> writing application activity to log files
            </li>
            <li>
              <strong>Configuration:</strong> reading settings from property files
            </li>
            <li>
              <strong>Reports:</strong> generating result sheets or invoices
            </li>
            <li>
              <strong>Data exchange:</strong> sharing data between programs
            </li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            For example, a small billing application used in
            <strong> Shyamnagar</strong> may store daily sales reports in files,
            while a larger system may later move the same logic to a database.
          </p>
        </section>

        {/* ================= MINI CHECKLIST ================= */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            Mini Checklist (What Students Should Remember)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Files provide permanent data storage</li>
            <li>Memory data is temporary and volatile</li>
            <li>Java uses <code>java.io</code> for file handling</li>
            <li>Text and binary files are handled differently</li>
            <li>Always think about data safety and lifecycle</li>
          </ul>
        </section>


      </div>
    );
  }
}
