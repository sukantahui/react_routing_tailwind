// src/components/study/java-core/file-handling/Topic4.jsx
// Topic 5: Creating files and directories using File class
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

export default class Topic4 extends Component {
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
            Creating Files and Directories using File Class
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            After understanding the <code>File</code> class and its constructors,
            the next step is learning how Java programs can
            <strong> create files and directories</strong> on the file system.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Creating Files and Folders – Core Idea
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            In Java, files and directories are created using methods
            of the <code>File</code> class.
            These methods interact directly with the operating system.
          </p>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Java clearly separates:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Creating a <strong>File object</strong></li>
            <li>Creating an <strong>actual file or directory</strong> on disk</li>
          </ul>
        </section>

        {/* ======================================================
            FILE CREATION
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Creating a File using <code>createNewFile()</code>
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>createNewFile()</code> method is used to create
            a new, empty file on disk.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Method signature:</strong> <code>boolean createNewFile()</code>
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Return type:</strong> boolean</li>
            <li><strong>Returns:</strong> true if file is created, false if it already exists</li>
            <li><strong>Throws:</strong> IOException</li>
          </ul>

          <JavaCodeBlock
            code={`import java.io.File;
import java.io.IOException;

public class CreateFileDemo {
    public static void main(String[] args) throws IOException {
        File file = new File("notes.txt");

        if (file.createNewFile()) {
            System.out.println("File created successfully");
        } else {
            System.out.println("File already exists");
        }
    }
}`}
          />
        </section>

        {/* ======================================================
            DIRECTORY CREATION
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Creating Directories using <code>mkdir()</code> and <code>mkdirs()</code>
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Directories (folders) are created using
            <code> mkdir()</code> or <code>mkdirs()</code>.
          </p>

          <div className="mt-3 space-y-4">
            <div>
              <p className="font-semibold">mkdir()</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Creates a single directory. Fails if parent does not exist.
              </p>
            </div>

            <div>
              <p className="font-semibold">mkdirs()</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Creates directory along with all required parent directories.
              </p>
            </div>
          </div>

          <JavaCodeBlock
            code={`File dir1 = new File("reports");
dir1.mkdir();

File dir2 = new File("data/2025/march");
dir2.mkdirs();`}
          />
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Imagine a reporting application used in a coaching center at
            <strong> Ichapur</strong>.
            Each month, the program automatically creates folders like:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>/reports/2025/January</code></li>
            <li><code>/reports/2025/February</code></li>
          </ul>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This structure is created programmatically using
            <code> mkdirs()</code>.
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
            <li>Forgetting to handle IOException</li>
            <li>Assuming directories are created automatically</li>
            <li>Using mkdir() instead of mkdirs()</li>
            <li>Hardcoding system-dependent paths</li>
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
            <li>Check existence before creating files or folders</li>
            <li>Use relative paths where possible</li>
            <li>Handle exceptions gracefully</li>
            <li>Keep directory structure organized</li>
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
            Observe the difference between creating a File object
            and creating the actual file or directory on disk.
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
            <li>createNewFile() creates files</li>
            <li>mkdir() creates single directory</li>
            <li>mkdirs() creates directory hierarchy</li>
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
            Stress the importance of directory structure.
            Clean folder organization reflects professional thinking
            and makes applications easier to maintain.
          </p>
        </section>
      </div>
    );
  }
}
