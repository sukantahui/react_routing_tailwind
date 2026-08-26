// src/components/study/java-core/file-handling/Topic32.jsx
// Topic 32: Real-World Example – Log File Writing
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Scoped keyframes – zero config animations
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(16px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic32 extends Component {
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
            Real-World Example: Log File Writing
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Log files are the <strong>diary of an application</strong>.
            When something fails in production, logs are often the
            <strong>only reliable evidence</strong>.
          </p>
        </header>

        {/* ======================================================
            WHY LOG FILES MATTER
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Log Files Are Critical
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            In real systems (schools, banks, servers),
            errors rarely happen in front of the developer.
            Logs help us understand:
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>What happened</li>
            <li>When it happened</li>
            <li>Why it happened</li>
          </ul>
        </section>

        {/* ======================================================
            KEY DESIGN RULES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Key Design Rules for Log Files
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Logs must <strong>append</strong>, not overwrite</li>
            <li>Logs must be human-readable</li>
            <li>Each entry should include date & message</li>
            <li>Logging should never crash the app</li>
          </ul>
        </section>

        {/* ======================================================
            SIMPLE LOG WRITING PROGRAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Simple Log File Writing Program
          </h2>

          <JavaCodeBlock
            code={`import java.io.*;
import java.time.LocalDateTime;

public class AppLogger {

    public static void main(String[] args) {
        try (BufferedWriter bw =
                new BufferedWriter(
                    new FileWriter("app.log", true))) {

            bw.write(LocalDateTime.now()
                + " - Application started");
            bw.newLine();

        } catch (IOException e) {
            System.out.println("Logging failed");
        }
    }
}`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Notice the use of:
            <code>FileWriter("app.log", true)</code>  
            → ensures <strong>append mode</strong>.
          </p>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            4. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            In a school system at <strong>Naihati</strong>,
            Swadeep reported that attendance records disappeared.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Logs showed the file was overwritten instead of appended —
            a single missing <code>true</code> caused data loss.
          </p>
        </section>

        {/* ======================================================
            COMMON MISTAKES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Beginner Mistakes
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Overwriting log files</li>
            <li>Logging inside tight loops</li>
            <li>Not handling IOException</li>
            <li>Using System.out instead of files</li>
          </ul>
        </section>

        {/* ======================================================
            PROFESSIONAL TIPS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Professional Tips & Tricks
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Keep log writing lightweight</li>
            <li>Never let logging stop the program</li>
            <li>Separate logs from main data files</li>
            <li>Use timestamps consistently</li>
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
            Think about what information would help you
            debug this program one year later.
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
            <li>Append logs, never overwrite</li>
            <li>Include timestamps</li>
            <li>Handle failures safely</li>
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
            Logging teaches responsibility.
            Students who respect logs understand real-world software,
            not just classroom programs.
          </p>
        </section>
      </div>
    );
  }
}
