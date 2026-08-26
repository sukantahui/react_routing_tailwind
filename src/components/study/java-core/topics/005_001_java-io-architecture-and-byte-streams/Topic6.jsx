// src/components/study/java-core/file-handling/Topic6.jsx
// Topic 7: Difference between Absolute and Relative Paths
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

export default class Topic6 extends Component {
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
            Absolute vs Relative Paths in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Correctly specifying file paths is critical in Java file handling.
            Understanding the difference between <strong>absolute</strong> and
            <strong> relative</strong> paths helps avoid file-not-found errors
            and makes programs portable.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What is a File Path?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A <strong>file path</strong> is the address of a file or directory
            in the file system. Java uses paths to locate files when performing
            file operations.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            If the path is wrong, the program cannot find the file,
            even if it exists.
          </p>
        </section>

        {/* ======================================================
            ABSOLUTE PATH
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Absolute Path
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            An <strong>absolute path</strong> specifies the complete location
            of a file starting from the root directory of the system.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Example (Windows):</strong>
            <code> C:/Users/Student/Documents/data.txt</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Example (Linux/Mac):</strong>
            <code> /home/student/data.txt</code>
          </p>

          <JavaCodeBlock
            code={`File file = new File("C:/Users/Student/Documents/data.txt");`}
          />
        </section>

        {/* ======================================================
            RELATIVE PATH
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Relative Path
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A <strong>relative path</strong> specifies the location of a file
            relative to the current working directory of the Java program.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            It does not start from the root; instead, it depends on
            where the program is running.
          </p>

          <JavaCodeBlock
            code={`File file = new File("data.txt");
File report = new File("reports/result.txt");`}
          />
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            4. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A Java application developed in <strong>Barrackpore</strong>
            works perfectly on one computer but fails on another in
            <strong>Naihati</strong>.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            The reason? Absolute paths pointing to local folders
            that do not exist on the second system.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Using relative paths fixes this problem.
          </p>
        </section>

        {/* ======================================================
            COMPARISON
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            5. Absolute vs Relative Path (Comparison)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Absolute path is system-dependent</li>
            <li>Relative path is portable</li>
            <li>Absolute path is longer and rigid</li>
            <li>Relative path adapts to project structure</li>
          </ul>
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Pitfalls
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Hardcoding absolute paths</li>
            <li>Assuming working directory incorrectly</li>
            <li>Mixing path separators</li>
            <li>Ignoring platform differences</li>
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
            <li>Prefer relative paths in applications</li>
            <li>Keep project directory structure consistent</li>
            <li>Avoid system-specific hardcoded paths</li>
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
            Try printing the current working directory using
            <code> System.getProperty("user.dir")</code>
            to understand how relative paths work.
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
            <li>Absolute paths start from root</li>
            <li>Relative paths depend on working directory</li>
            <li>Relative paths improve portability</li>
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
            Emphasize portability early. Students who rely on absolute paths
            struggle later in real projects and deployment environments.
          </p>
        </section>
      </div>
    );
  }
}
