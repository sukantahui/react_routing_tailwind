// src/components/study/java-core/file-handling/Topic5.jsx
// Topic 6: File properties – exists(), canRead(), canWrite(), length()
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

export default class Topic5 extends Component {
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
            File Properties in Java
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Before reading from or writing to a file, a Java program must
            <strong> examine file properties</strong>.
            These properties help programs make safe and intelligent decisions.
          </p>
        </header>

        {/* ======================================================
            CORE IDEA
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why File Properties Matter
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            File properties describe the current state of a file.
            They help answer important questions such as:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Does the file exist?</li>
            <li>Can the program read it?</li>
            <li>Is writing allowed?</li>
            <li>How large is the file?</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Professional programs <strong>never assume</strong> file conditions —
            they always check first.
          </p>
        </section>

        {/* ======================================================
            exists()
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. <code>exists()</code>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Signature:</strong> <code>boolean exists()</code>
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Checks whether the file or directory actually exists on disk.
          </p>

          <JavaCodeBlock
            code={`File file = new File("data.txt");

if (file.exists()) {
    System.out.println("File exists");
} else {
    System.out.println("File not found");
}`}
          />
        </section>

        {/* ======================================================
            canRead() & canWrite()
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. <code>canRead()</code> and <code>canWrite()</code>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Signatures:</strong> <code>boolean canRead()</code>,
            <code> boolean canWrite()</code>
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            These methods check whether the program has permission
            to read from or write to a file.
          </p>

          <JavaCodeBlock
            code={`File file = new File("report.txt");

System.out.println(file.canRead());
System.out.println(file.canWrite());`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Permissions depend on the operating system and security settings.
          </p>
        </section>

        {/* ======================================================
            length()
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. <code>length()</code>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Signature:</strong> <code>long length()</code>
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Returns the size of the file in bytes.
            If the file does not exist, it returns <code>0</code>.
          </p>

          <JavaCodeBlock
            code={`File file = new File("video.mp4");
System.out.println("Size: " + file.length() + " bytes");`}
          />
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A result-processing application in <strong>Barrackpore</strong>
            checks whether the result file exists and whether it can be written
            before generating marksheets for <strong>Debangshu</strong> and others.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Without these checks, the program may crash or corrupt data.
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
            <li>Skipping exists() check</li>
            <li>Assuming permissions are always granted</li>
            <li>Using length() on non-existing files</li>
            <li>Confusing file size with number of lines</li>
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
            <li>Always validate file state before operations</li>
            <li>Check permissions explicitly</li>
            <li>Log file size for debugging large files</li>
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
            Observe how each property answers a specific safety question
            before performing file operations.
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
            <li>exists() checks presence</li>
            <li>canRead() and canWrite() check permissions</li>
            <li>length() gives file size in bytes</li>
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
            Teach students that checking file properties is a habit,
            not an extra step. This mindset prevents bugs,
            data loss, and security issues in real applications.
          </p>
        </section>
      </div>
    );
  }
}
