// src/components/study/java-core/file-handling/Topic33.jsx
// Topic 33: Real-World Example – Reading Configuration Files
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

export default class Topic33 extends Component {
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
            Real-World Example: Reading Configuration Files
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Professional applications never hard-code values like
            database paths, file locations, or limits.
            These values are kept in <strong>configuration files</strong>.
          </p>
        </header>

        {/* ======================================================
            WHY CONFIG FILES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Configuration Files Are Used
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Configuration files allow changes without modifying
            or recompiling the program.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Easy maintenance</li>
            <li>Environment-specific values</li>
            <li>Cleaner and safer code</li>
          </ul>
        </section>

        {/* ======================================================
            COMMON CONFIG FORMAT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. A Simple Configuration File
          </h2>

          <JavaCodeBlock
            code={`# config.txt
appName=SchoolApp
maxUsers=100
dataFile=students.txt`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Each line stores a <strong>key=value</strong> pair,
            making it easy to read and modify.
          </p>
        </section>

        {/* ======================================================
            READING CONFIG FILE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Reading Configuration Using BufferedReader
          </h2>

          <JavaCodeBlock
            code={`import java.io.*;

public class ConfigReader {
    public static void main(String[] args) {
        try (BufferedReader br =
                new BufferedReader(
                    new FileReader("config.txt"))) {

            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }

        } catch (IOException e) {
            System.out.println("Failed to read config file");
        }
    }
}`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            This approach is fast, simple, and suitable
            for small to medium configuration files.
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
            In a library system at <strong>Shyamnagar</strong>,
            Debangshu needed to change the maximum number
            of users allowed.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Instead of changing code, he updated the
            configuration file — no recompilation needed.
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
            <li>Hard-coding values in source code</li>
            <li>Not handling missing config files</li>
            <li>Ignoring malformed lines</li>
            <li>Storing passwords in plain text</li>
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
            <li>Keep config files small and readable</li>
            <li>Validate values after reading</li>
            <li>Use defaults when config is missing</li>
            <li>Never commit sensitive configs to Git</li>
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
            Think about which values in your program
            might change in the future.
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
            <li>Separate config from code</li>
            <li>Use BufferedReader</li>
            <li>Handle missing files safely</li>
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
            Configuration files teach flexibility.
            Students who master this concept
            naturally write more maintainable systems.
          </p>
        </section>
      </div>
    );
  }
}
