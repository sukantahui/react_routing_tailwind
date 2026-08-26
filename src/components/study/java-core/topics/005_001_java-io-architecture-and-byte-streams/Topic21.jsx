// src/components/study/java-core/file-handling/Topic21.jsx
// Topic 22: Exception Handling with File I/O
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

export default class Topic21 extends Component {
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
            Exception Handling with File I/O
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            File operations are risky — files may not exist, permissions may fail,
            or I/O may break. Java forces us to handle these risks using
            <strong> checked exceptions</strong>.
          </p>
        </header>

        {/* ======================================================
            WHY EXCEPTIONS ARE REQUIRED
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Why Exception Handling Is Mandatory in File I/O
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Java file handling APIs throw checked exceptions like
            <code> FileNotFoundException</code> and <code>IOException</code>.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Compiler forces handling (checked exceptions)</li>
            <li>Prevents silent program crashes</li>
            <li>Makes programs robust and predictable</li>
          </ul>
        </section>

        {/* ======================================================
            COMMON FILE I/O EXCEPTIONS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Common File I/O Exceptions
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li><code>FileNotFoundException</code> – file missing or wrong path</li>
            <li><code>IOException</code> – general I/O failure</li>
            <li><code>SecurityException</code> – permission issues</li>
          </ul>
        </section>

        {/* ======================================================
            TRY-CATCH WITH FILE I/O
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Using try-catch with File I/O
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Purpose:</strong> Handle runtime failures safely
          </p>

          <JavaCodeBlock
            code={`try {
    FileReader reader = new FileReader("data.txt");
    BufferedReader br = new BufferedReader(reader);

    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }

    br.close();
} catch (FileNotFoundException e) {
    System.out.println("File not found");
} catch (IOException e) {
    System.out.println("I/O error occurred");
}`}
          />
        </section>

        {/* ======================================================
            FINALLY BLOCK
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. The finally Block
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>finally</code> block executes whether an exception occurs or not.
            It is traditionally used to close resources.
          </p>

          <JavaCodeBlock
            code={`FileReader reader = null;

try {
    reader = new FileReader("file.txt");
} catch (Exception e) {
    System.out.println("Error occurred");
} finally {
    try {
        if (reader != null) reader.close();
    } catch (IOException e) {
        System.out.println("Close failed");
    }
}`}
          />
        </section>

        {/* ======================================================
            THROWS KEYWORD
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Using throws Keyword
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Instead of handling exceptions inside a method, you can
            pass responsibility to the caller using <code>throws</code>.
          </p>

          <JavaCodeBlock
            code={`void readFile() throws IOException {
    FileReader reader = new FileReader("data.txt");
    reader.close();
}`}
          />
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            6. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A school application in <strong>Barrackpore</strong>
            reads configuration files on startup.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            If the file is missing, the program shows a clear error
            instead of crashing — thanks to proper exception handling.
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
            <li>Catching generic <code>Exception</code> everywhere</li>
            <li>Ignoring exception messages</li>
            <li>Forgetting to close files</li>
            <li>Empty catch blocks</li>
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
            <li>Catch specific exceptions first</li>
            <li>Always close resources</li>
            <li>Use meaningful error messages</li>
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
            If the compiler complains — it is protecting you.
            Do not fight checked exceptions; handle them properly.
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
            <li>File I/O uses checked exceptions</li>
            <li>try-catch prevents crashes</li>
            <li>Resources must be closed</li>
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
            Students often fear exceptions.
            Teach them that exception handling is not noise —
            it is *professional responsibility*.
          </p>
        </section>
      </div>
    );
  }
}
