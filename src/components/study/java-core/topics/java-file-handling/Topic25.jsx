// src/components/study/java-core/file-handling/Topic25.jsx
// Topic 26: File Deletion & Renaming
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic25 extends Component {
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
            File Deletion &amp; Renaming
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Deleting or renaming files affects the file system directly.
            These operations are <strong>irreversible</strong> and must be handled
            with care in real applications.
          </p>
        </header>

        {/* ======================================================
            FILE CLASS ROLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Role of the File Class
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Java performs file deletion and renaming using the
            <code> java.io.File</code> class.
            These operations do <strong>not</strong> throw exceptions —
            they return a boolean result.
          </p>
        </section>

        {/* ======================================================
            FILE DELETION
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Deleting a File
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong>
            <br />
            <code>boolean delete()</code>
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> boolean</li>
            <li><strong>true</strong> → file deleted</li>
            <li><strong>false</strong> → deletion failed</li>
          </ul>

          <JavaCodeBlock
            code={`File file = new File("old.txt");

if (file.delete()) {
    System.out.println("File deleted successfully");
} else {
    System.out.println("Deletion failed");
}`}
          />
        </section>

        {/* ======================================================
            WHY DELETE FAILS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            3. Why File Deletion May Fail
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>File does not exist</li>
            <li>File is open in another program</li>
            <li>Insufficient permissions</li>
            <li>Directory is not empty</li>
          </ul>
        </section>

        {/* ======================================================
            FILE RENAMING
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            4. Renaming a File
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong>
            <br />
            <code>boolean renameTo(File dest)</code>
          </p>

          <JavaCodeBlock
            code={`File oldFile = new File("data.txt");
File newFile = new File("data_backup.txt");

if (oldFile.renameTo(newFile)) {
    System.out.println("File renamed");
} else {
    System.out.println("Rename failed");
}`}
          />
        </section>

        {/* ======================================================
            PLATFORM DEPENDENCE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Platform Dependence
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            File renaming behavior may vary across operating systems:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Windows may block renaming if file is open</li>
            <li>Linux allows renaming open files</li>
            <li>Always check return value</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            6. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A cleanup utility in <strong>Shyamnagar</strong>
            deletes temporary files daily.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Failed deletions are logged instead of ignored
            to prevent disk overflow.
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
            <li>Ignoring boolean return value</li>
            <li>Assuming delete always works</li>
            <li>Deleting files without confirmation</li>
            <li>Renaming files while streams are open</li>
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
            <li>Close all streams before delete or rename</li>
            <li>Always check return value</li>
            <li>Log failures for diagnostics</li>
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
            If a file operation returns <code>false</code>,
            Java is telling you “something went wrong” — listen to it.
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
            <li>delete() returns boolean</li>
            <li>renameTo() is platform-dependent</li>
            <li>Always validate outcome</li>
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
            File deletion should feel uncomfortable.
            That discomfort keeps systems safe.
            Teach students to double-check before destructive actions.
          </p>
        </section>
      </div>
    );
  }
}
