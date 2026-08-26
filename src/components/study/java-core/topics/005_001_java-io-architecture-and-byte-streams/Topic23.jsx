// src/components/study/java-core/file-handling/Topic23.jsx
// Topic 24: Auto-closing Resources & Best Practices
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

export default class Topic23 extends Component {
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
            Auto-Closing Resources & Best Practices
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Auto-closing resources is not just a Java feature —
            it is a <strong>professional discipline</strong>.
            This topic teaches how Java guarantees cleanup
            and how developers must structure code responsibly.
          </p>
        </header>

        {/* ======================================================
            WHAT IS AUTO-CLOSING
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What Does “Auto-Closing” Really Mean?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Auto-closing means Java automatically calls
            <code> close()</code> on a resource
            when execution leaves the <code>try</code> block —
            even if an exception occurs.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            This works only for classes that implement
            <code> AutoCloseable</code>.
          </p>
        </section>

        {/* ======================================================
            HOW JAVA CLOSES RESOURCES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. How Java Closes Resources Internally
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>JVM tracks resources declared in try-with-resources</li>
            <li>On exit, <code>close()</code> is invoked automatically</li>
            <li>Closure happens in <strong>reverse order</strong></li>
            <li>Suppressed exceptions are handled safely</li>
          </ul>
        </section>

        {/* ======================================================
            EXAMPLE: MULTIPLE RESOURCES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Auto-Closing Multiple Resources
          </h2>

          <JavaCodeBlock
            code={`try (
    FileReader fr = new FileReader("input.txt");
    BufferedReader br = new BufferedReader(fr);
    FileWriter fw = new FileWriter("output.txt")
) {
    fw.write(br.readLine());
} catch (IOException e) {
    e.printStackTrace();
}`}
          />

          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Java closes:
            <strong> FileWriter → BufferedReader → FileReader</strong>
          </p>
        </section>

        {/* ======================================================
            WHY MANUAL CLOSE IS DANGEROUS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Why Manual Closing Is Risky
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Exceptions may skip <code>close()</code></li>
            <li>Nested try-catch becomes messy</li>
            <li>Memory leaks and file locks</li>
            <li>Hard-to-debug production issues</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A report generator in <strong>Ichapur</strong>
            opens hundreds of files daily.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            One forgotten <code>close()</code> can block the entire system.
            Auto-closing prevents this silently.
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
            <li>Using resources outside try block</li>
            <li>Believing GC will close files</li>
            <li>Combining manual close with try-with-resources</li>
            <li>Ignoring suppressed exceptions</li>
          </ul>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Best Practices (Professional Level)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Always prefer try-with-resources</li>
            <li>Keep resource scope minimal</li>
            <li>One responsibility per try block</li>
            <li>Never rely on garbage collection</li>
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
            If a class holds something external (file, socket, DB),
            ask yourself: “Who closes it?”
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
            <li>Uses AutoCloseable</li>
            <li>Closed automatically</li>
            <li>Safe even on exceptions</li>
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
            Resource management separates beginners from professionals.
            This habit must be built early — it pays for a lifetime.
          </p>
        </section>
      </div>
    );
  }
}
