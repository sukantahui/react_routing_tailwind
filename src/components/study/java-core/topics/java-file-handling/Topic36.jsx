// src/components/study/java-core/file-handling/Topic36.jsx
// Topic 36: Difference Between Text Files and Binary Files
// React 19 – CLASS-BASED component
// Tailwind CSS – ZERO config, ZERO plugins

import React, { Component } from "react";

/* =========================================================
   Inline Scoped Animations (Zero Config)
========================================================= */
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic36 extends Component {
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
      "rounded-xl border border-slate-200 dark:border-slate-800 " +
      "bg-white/80 dark:bg-slate-900/70 p-6 shadow-sm " +
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-md";

    return (
      <div className="space-y-28 leading-relaxed text-slate-700 dark:text-slate-300">
        <style>{animationStyles}</style>

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            Difference Between Text Files and Binary Files
          </h2>

          <p className="text-sm">
            One of the most important decisions in Java file handling is
            choosing whether a file should be treated as a
            <strong> text file</strong> or a
            <strong> binary file</strong>.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            A wrong choice may lead to data corruption, performance issues,
            or unreadable output.
          </p>
        </header>

        {/* =====================================================
            CORE CONCEPT
        ===================================================== */}
        <section className={`${reveal} animation-delay-[100ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Core Concept
            </h3>

            <p className="text-sm mt-2">
              The fundamental difference between text and binary files lies in
              <strong> how data is interpreted</strong>, not merely how it is stored.
            </p>

            <p className="text-sm mt-2">
              A computer stores everything as binary, but text files apply
              an additional layer called <strong>character encoding</strong>,
              whereas binary files do not.
            </p>
          </div>
        </section>

        {/* =====================================================
            TEXT FILES – DEEP EXPLANATION
        ===================================================== */}
        <section className={`${reveal} animation-delay-[200ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Text Files – In Depth
            </h3>

            <p className="text-sm">
              A <strong>text file</strong> stores information as characters
              using a specific encoding such as ASCII or Unicode (UTF-8).
            </p>

            <ul className="list-disc list-inside text-sm mt-3 space-y-1">
              <li>Each character is converted into bytes using encoding</li>
              <li>Line breaks and spaces have meaning</li>
              <li>Readable and editable by humans</li>
            </ul>

            <p className="text-sm mt-3">
              In Java, text files are handled using:
            </p>

            <ul className="list-disc list-inside text-sm mt-1 space-y-1">
              <li><strong>FileReader</strong></li>
              <li><strong>BufferedReader</strong></li>
              <li><strong>FileWriter</strong></li>
            </ul>

            <p className="text-xs text-slate-500 mt-3">
              Common examples: .txt, .csv, .json, .xml, .java
            </p>
          </div>
        </section>

        {/* =====================================================
            BINARY FILES – DEEP EXPLANATION
        ===================================================== */}
        <section className={`${reveal} animation-delay-[300ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Binary Files – In Depth
            </h3>

            <p className="text-sm">
              A <strong>binary file</strong> stores data exactly as raw bytes
              without any character interpretation or encoding.
            </p>

            <ul className="list-disc list-inside text-sm mt-3 space-y-1">
              <li>No concept of characters or lines</li>
              <li>Compact and efficient storage</li>
              <li>Faster read/write operations</li>
            </ul>

            <p className="text-sm mt-3">
              In Java, binary files are handled using:
            </p>

            <ul className="list-disc list-inside text-sm mt-1 space-y-1">
              <li><strong>FileInputStream</strong></li>
              <li><strong>BufferedInputStream</strong></li>
              <li><strong>FileOutputStream</strong></li>
            </ul>

            <p className="text-xs text-slate-500 mt-3">
              Common examples: .jpg, .png, .mp3, .mp4, .pdf, .exe
            </p>
          </div>
        </section>

        {/* =====================================================
            PERFORMANCE & STORAGE
        ===================================================== */}
        <section className={`${reveal} animation-delay-[400ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Performance & Storage Perspective
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Text files are larger due to encoding overhead</li>
              <li>Binary files are compact and faster to process</li>
              <li>Binary files are preferred for large datasets and media</li>
              <li>Text files are preferred for configuration and logs</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            PROFESSIONAL DECISION RULE
        ===================================================== */}
        <section className={`${reveal} animation-delay-[500ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              How Professionals Decide
            </h3>

            <p className="text-sm">
              Engineers usually ask one question before choosing:
            </p>

            <p className="text-sm mt-2 italic">
              “Does a human need to read or edit this file?”
            </p>

            <ul className="list-disc list-inside text-sm mt-3 space-y-1">
              <li>If yes → Text file</li>
              <li>If no → Binary file</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            COMMON PITFALLS (EXPANDED)
        ===================================================== */}
        <section className={`${reveal} animation-delay-[600ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-red-500">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Using FileReader for images or PDFs</li>
              <li>Assuming all files are text-based</li>
              <li>Opening binary files in Notepad and expecting meaning</li>
              <li>Ignoring encoding while reading text files</li>
              <li>Mixing Reader and InputStream in the same logic</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            BEST PRACTICES (EXPANDED)
        ===================================================== */}
        <section className={`${reveal} animation-delay-[700ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-emerald-500">
              Best Practices
            </h3>

            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Always classify file type before coding</li>
              <li>Use buffered streams for performance</li>
              <li>Never rely on file extension alone</li>
              <li>Test files after read/write operations</li>
              <li>Handle encoding explicitly for text files</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            HINT SECTION (THINKING PROMPTS)
        ===================================================== */}
        <section className={`${reveal} animation-delay-[800ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-amber-500">
              Hint for Students
            </h3>

            <p className="text-sm">
              Observe carefully what happens when you:
            </p>

            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Open a PDF in a text editor</li>
              <li>Save a text file using different encodings</li>
              <li>Read a binary file using FileReader</li>
            </ul>

            <p className="text-sm mt-2">
              These observations explain the theory better than memorization.
            </p>
          </div>
        </section>

        {/* =====================================================
            MINI CHECKLIST
        ===================================================== */}
        <section className={`${reveal} animation-delay-[900ms]`}>
          <div className={card}>
            <h3 className="text-lg font-semibold text-indigo-500">
              Quick Revision Checklist
            </h3>

            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Definition of text file</li>
              <li>Definition of binary file</li>
              <li>Role of encoding</li>
              <li>Java APIs for each type</li>
              <li>When to use which</li>
            </ul>
          </div>
        </section>

        {/* =====================================================
            TEACHER NOTE
        ===================================================== */}
        <section
          className={`${reveal} animation-delay-[1000ms] rounded-xl border 
          border-indigo-300/40 dark:border-indigo-700/40 
          bg-indigo-50/60 dark:bg-indigo-900/20 p-6 
          transition-all duration-300 hover:shadow-md`}
        >
          <h3 className="text-indigo-600 dark:text-indigo-400 font-semibold">
            Teacher’s Note
          </h3>

          <p className="text-sm mt-2">
            Do not rush this topic. If students clearly understand the
            <strong> conceptual difference</strong>, binary file handling,
            serialization, and streams become intuitive later.
          </p>
        </section>

      </div>
    );
  }
}
