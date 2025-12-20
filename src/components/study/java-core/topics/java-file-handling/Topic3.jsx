// src/components/study/java-core/file-handling/Topic3.jsx
// Topic 4: File class – purpose and constructors
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

export default class Topic3 extends Component {
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
            File Class – Purpose and Constructors
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            The <strong>File</strong> class is the starting point of file handling in Java.
            It represents files and directories and allows programs to
            examine and manage them safely.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What is the File Class?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>java.io.File</code> class represents the name and path of a file
            or directory in the file system.  
            It <strong>does not read or write data</strong> — it only provides
            information and operations related to files.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Think of the File class as a <em>file manager</em>, not a file editor.
          </p>
        </section>

        {/* ======================================================
            REAL-WORLD ANALOGY
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Real-World Analogy
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Imagine a school office in <strong>Shyamnagar</strong>.
            The register cabinet tells you:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Whether a register exists</li>
            <li>Its name</li>
            <li>Its size</li>
            <li>Whether it can be opened</li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            The File class plays the same role — it gives information
            <strong>about</strong> files, not the content inside them.
          </p>
        </section>

        {/* ======================================================
            PURPOSE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Purpose of the File Class
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Check if a file or directory exists</li>
            <li>Create new files or folders</li>
            <li>Delete files safely</li>
            <li>Check permissions (read/write)</li>
            <li>Get file size and path information</li>
          </ul>
        </section>

        {/* ======================================================
            CONSTRUCTORS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. File Class Constructors
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The File class provides multiple constructors to create
            File objects in different ways.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold">Constructor 1:</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <code>File(String pathname)</code>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Used when the full file path is known.
              </p>
            </div>

            <div>
              <p className="font-semibold">Constructor 2:</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <code>File(String parent, String child)</code>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Used to combine a directory path with a file name.
              </p>
            </div>

            <div>
              <p className="font-semibold">Constructor 3:</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <code>File(File parent, String child)</code>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Used when a parent File object already exists.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            CODE EXAMPLES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            5. Examples of File Constructors
          </h2>

          <JavaCodeBlock
            code={`import java.io.File;

public class FileDemo {
    public static void main(String[] args) {

        File f1 = new File("data.txt");

        File f2 = new File("C:/school", "students.txt");

        File folder = new File("reports");
        File f3 = new File(folder, "result.txt");
    }
}`}
          />
        </section>

        {/* ======================================================
            IMPORTANT CLARIFICATION
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            Important Clarification
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Creating a File object does <strong>not</strong> create the actual file
            on disk. It only creates a Java object representing the file path.
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
            <li>Thinking File reads or writes data</li>
            <li>Assuming the file exists after creating a File object</li>
            <li>Using wrong path separators</li>
            <li>Hardcoding system-specific paths</li>
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
            <li>Always check file existence before operations</li>
            <li>Use relative paths when possible</li>
            <li>Separate file metadata from file data handling</li>
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
            Observe carefully: creating a File object and creating a file
            on disk are two different actions.
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
            <li>File represents path and metadata</li>
            <li>File does not handle data</li>
            <li>Constructors define how paths are created</li>
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
            Spend time clarifying that File is not a stream.
            Once students grasp this separation, file handling becomes
            structured and predictable instead of confusing.
          </p>
        </section>
      </div>
    );
  }
}
