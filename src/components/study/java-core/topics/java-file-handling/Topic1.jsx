// src/components/study/java-core/file-handling/Topic1.jsx
// Topic 2: Why File Handling is Required in Real Applications
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)
// Standardized content depth, hover animations, and structure
// Maintained exactly as promised for every topic

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

export default class Topic1 extends Component {
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
            Why File Handling is Required in Real Applications
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            File handling is not an optional feature in programming.
            It is a <strong>fundamental requirement</strong> for building
            real, usable, and reliable applications.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Programs Without Files Are Short-Lived
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            By default, Java programs store data in memory (RAM).
            This data exists only while the program is running.
            The moment the program stops, the data disappears.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            File handling solves this limitation by allowing programs
            to store information on disk, making it available even
            after the application is closed.
          </p>
        </section>


        {/* ======================================================
            VISUAL: MEMORY VS FILE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
            How Data Lives (Memory vs File)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
            Students often confuse <strong>memory</strong> with <strong>storage</strong>.
            This visual makes the difference clear.
          </p>

          <svg viewBox="0 0 760 240" className="w-full h-auto transition-transform duration-300 hover:scale-[1.01]">
            {/* Memory */}
            <rect x="40" y="60" width="280" height="120" rx="14"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-sky-500" />
            <text x="180" y="105" textAnchor="middle" className="fill-current text-sm font-semibold">
              Program Memory (RAM)
            </text>
            <text x="180" y="130" textAnchor="middle" className="fill-current text-xs">
              Data disappears when program stops
            </text>

            {/* Arrow */}
            <line x1="320" y1="120" x2="440" y2="120"
              stroke="currentColor" strokeWidth="2"
              className="text-emerald-500" />
            <polygon points="440,115 450,120 440,125" fill="currentColor"
              className="text-emerald-500" />

            {/* File */}
            <rect x="450" y="60" width="280" height="120" rx="14"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-emerald-500" />
            <text x="590" y="105" textAnchor="middle" className="fill-current text-sm font-semibold">
              File Storage (Disk)
            </text>
            <text x="590" y="130" textAnchor="middle" className="fill-current text-xs">
              Data remains even after shutdown
            </text>
          </svg>
        </section>


        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Real-World Scenario: School Management System
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Consider a school software used in <strong>Naihati</strong>.
            Student <strong>Tuhina</strong> logs in, checks her marks,
            and logs out.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            If the program does not use files:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Marks must be re-entered every time</li>
            <li>No history can be maintained</li>
            <li>The software becomes useless</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            File handling ensures that student data is stored safely
            and retrieved whenever required.
          </p>
        </section>

        {/* ======================================================
            USE CASES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Where File Handling Is Used
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Saving user data (profiles, preferences)</li>
            <li>Generating reports and result sheets</li>
            <li>Writing application logs</li>
            <li>Reading configuration files</li>
            <li>Storing backup and audit data</li>
          </ul>
        </section>

        {/* ======================================================
            DAILY LIFE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
            4. Everyday Applications Students Already Use
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            File handling is not a “computer concept”.
            Students already depend on it every day.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Mobile Camera:</strong> photos are saved as image files
            </li>
            <li>
              <strong>Music Apps:</strong> songs are stored as audio files
            </li>
            <li>
              <strong>ATM Machine:</strong> transaction logs are written to files
            </li>
            <li>
              <strong>School Software:</strong> marksheets stored as files or reports
            </li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Without file handling, all these apps would forget everything
            the moment they are closed.
          </p>
        </section>


        {/* ======================================================
            TECHNICAL INSIGHT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            5. Technical Perspective (Why Developers Care)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            From a technical standpoint, file handling allows:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Separation of data and logic</li>
            <li>Efficient memory usage</li>
            <li>Data sharing across programs</li>
            <li>Crash recovery and debugging</li>
          </ul>
        </section>

        {/* ======================================================
            SIMPLE CODE EXAMPLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            6. Example: Storing Data Permanently
          </h2>

          <JavaCodeBlock
            code={`// Without file handling
int marks = 85; // Lost when program ends

// With file handling (conceptual)
File file = new File("marks.txt");
// Data written here can be read tomorrow`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This simple idea is what transforms a basic program
            into a real application.
          </p>
        </section>

        {/* ======================================================
            PRACTICAL EXAMPLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            7. Practical Thinking: Before vs After File Handling
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300 mb-3">
            Let us compare two situations clearly.
          </p>

          <JavaCodeBlock
            code={`// Case 1: Without file handling
int score = 92;
System.out.println(score);
// Value lost after program ends`}
          />

          <JavaCodeBlock
            code={`// Case 2: With file handling (conceptual)
File file = new File("score.txt");
// Score written to file
// Score can be read tomorrow`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This single difference decides whether a program is
            a <strong>practice exercise</strong> or a
            <strong>real application</strong>.
          </p>
        </section>

        {/* ======================================================
            TEXT VS BINARY (LIGHT INTRO)
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-3">
            Text Files vs Binary Files (Early Awareness)
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Not all files are readable by humans.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Text files:</strong> marks, names, configuration</li>
            <li><strong>Binary files:</strong> images, videos, PDFs</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Java treats them differently, which is why different
            classes exist for file handling.
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
            <li>Assuming memory data is permanent</li>
            <li>Ignoring file I/O exceptions</li>
            <li>Writing data without proper structure</li>
            <li>Overwriting important files accidentally</li>
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
            <li>Decide early what data needs persistence</li>
            <li>Use files responsibly and securely</li>
            <li>Separate file logic from business logic</li>
            <li>Always validate file operations</li>
          </ul>
        </section>

        {/* ======================================================
            HINT SECTION
        ====================================================== */}
        <section className={`${reveal} ${card} border-dashed border-teal-400/50`}>
          <h2 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
            💡 Hint
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Think about apps you use daily.
            Ask yourself: what information would be lost
            if files were not used?
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
            <li>Memory data is temporary</li>
            <li>Files provide persistence</li>
            <li>Real applications always use files</li>
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
            Students must clearly understand that persistence is the
            defining line between toy programs and professional software.
            Once this idea clicks, file handling becomes meaningful
            instead of mechanical.
          </p>
        </section>
      </div>
    );
  }
}
