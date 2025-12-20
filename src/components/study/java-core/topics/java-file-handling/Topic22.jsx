// src/components/study/java-core/file-handling/Topic22.jsx
// Topic 23: try-with-resources Statement
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

export default class Topic22 extends Component {
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
            try-with-resources Statement
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            The <code>try-with-resources</code> statement is a modern Java feature
            that automatically closes resources like files and streams,
            making code <strong>safer, cleaner, and leak-free</strong>.
          </p>
        </header>

        {/* ======================================================
            THE PROBLEM BEFORE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. The Problem with Traditional try-finally
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Before Java 7, developers had to close resources manually
            using a <code>finally</code> block.
          </p>

          <JavaCodeBlock
            code={`FileReader reader = null;

try {
    reader = new FileReader("data.txt");
    // read file
} catch (IOException e) {
    e.printStackTrace();
} finally {
    try {
        if (reader != null) reader.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            This code works — but it is verbose and error-prone.
          </p>
        </section>

        {/* ======================================================
            WHAT IS TRY-WITH-RESOURCES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. What is try-with-resources?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            <code>try-with-resources</code> automatically closes any object
            that implements the <code>AutoCloseable</code> interface.
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Syntax:</strong>
          </p>

          <JavaCodeBlock
            code={`try (ResourceType resource = new ResourceType()) {
    // use resource
} catch (Exception e) {
    // handle exception
}`}
          />
        </section>

        {/* ======================================================
            FILE I/O EXAMPLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. File I/O using try-with-resources
          </h2>

          <JavaCodeBlock
            code={`try (BufferedReader reader =
         new BufferedReader(new FileReader("data.txt"))) {

    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }

} catch (IOException e) {
    System.out.println("File error occurred");
}`}
          />

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            No explicit <code>close()</code> call is required.
            Java guarantees closure even if an exception occurs.
          </p>
        </section>

        {/* ======================================================
            MULTIPLE RESOURCES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Multiple Resources in One try Block
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

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Resources are closed automatically in reverse order.
          </p>
        </section>

        {/* ======================================================
            WHY AUTOCLOSEABLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. AutoCloseable Interface
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Any class implementing <code>AutoCloseable</code>
            can be used in try-with-resources.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>All Java I/O streams</li>
            <li>Scanner</li>
            <li>Database connections</li>
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
            A configuration loader in <strong>Barrackpore</strong>
            opens multiple files during startup.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Using try-with-resources ensures all files are closed
            even if initialization fails.
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
            <li>Assuming finally is still required</li>
            <li>Forgetting AutoCloseable requirement</li>
            <li>Overcomplicating simple I/O code</li>
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
            <li>Always prefer try-with-resources for I/O</li>
            <li>Keep resource scope minimal</li>
            <li>Let Java manage cleanup</li>
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
            If you see a <code>finally</code> block only closing resources,
            try-with-resources can replace it completely.
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
            <li>Introduced in Java 7</li>
            <li>Uses AutoCloseable</li>
            <li>Closes resources automatically</li>
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
            This is a turning point topic.
            Students who adopt try-with-resources
            start writing *modern, professional Java*.
          </p>
        </section>
      </div>
    );
  }
}
