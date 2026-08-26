// Topic12.jsx
// Topic 13: First Java Program – Explanation Line by Line
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic12 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook reserved for future enhancements
    this.setState({ ready: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            First Java Program – Line by Line Explanation
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Writing the first Java program is a milestone. Understanding every line
            builds confidence and prevents blind memorization.
          </p>
        </header>

        {/* ================= WHY LINE BY LINE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Line-by-Line Understanding Matters
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Beginners often copy their first program without understanding it.
            This topic slows down intentionally and explains <strong>every line</strong>
            so that students know exactly what the compiler and JVM are doing.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Debangshu writes his first program in Barrackpore and runs it
            successfully, confidence grows faster than speed.
          </p>
        </section>

        {/* ================= FIRST PROGRAM ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            The First Java Program
          </h2>

          <JavaCodeBlock
            language="java"
            code={`class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`}
          />
        </section>

        {/* ================= LINE 1 ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Line 1: class HelloWorld
          </h2>
          <p className="leading-relaxed max-w-4xl">
            This line declares a <strong>class</strong> named <code>HelloWorld</code>.
            In Java, all executable code must be inside a class.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>Keyword:</strong> <code>class</code><br />
            <strong>Purpose:</strong> Defines a blueprint<br />
            <strong>When & Why:</strong> Mandatory container for Java programs
          </p>
        </section>

        {/* ================= LINE 2 ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Line 2: public static void main(String[] args)
          </h2>
          <p className="leading-relaxed max-w-4xl">
            This is the <strong>entry point</strong> of the program. The JVM starts
            execution from this method.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>Prototype:</strong> <code>public static void main(String[] args)</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Starting point of execution
          </p>
        </section>

        {/* ================= LINE 3 ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Line 3: System.out.println("Hello, Java!");
          </h2>
          <p className="leading-relaxed max-w-4xl">
            This statement prints text to the console.
            It is often the first visible output students experience.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>API:</strong> <code>System.out.println()</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Display output<br />
            <strong>When & Why:</strong> Used for output and debugging
          </p>
        </section>

        {/* ================= BRACES ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            Braces {"{"} {"}"}
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Curly braces define the beginning and end of blocks.
            Each opening brace must have a corresponding closing brace.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Missing braces are like missing full stops in sentences — meaning breaks.
          </p>
        </section>

        {/* ================= EXECUTION FLOW ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Execution Flow
          </h2>

          <svg
            viewBox="0 0 900 240"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="First Java program execution flow"
          >
            <rect x="60" y="90" width="200" height="60" rx="12" fill="#38bdf8" />
            <text x="160" y="125" textAnchor="middle" fontSize="14" fill="#0f172a">Class</text>

            <rect x="350" y="90" width="200" height="60" rx="12" fill="#a855f7" />
            <text x="450" y="125" textAnchor="middle" fontSize="14" fill="#0f172a">main()</text>

            <rect x="640" y="90" width="200" height="60" rx="12" fill="#22c55e" />
            <text x="740" y="125" textAnchor="middle" fontSize="14" fill="#0f172a">Output</text>

            <line x1="260" y1="120" x2="350" y2="120" stroke="#475569" strokeWidth="2" />
            <line x1="550" y1="120" x2="640" y2="120" stroke="#475569" strokeWidth="2" />
          </svg>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Forgetting semicolons</li>
            <li>Misspelling <code>println</code></li>
            <li>Incorrect main method signature</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Type the first program manually</li>
            <li>Run and modify output text</li>
            <li>Observe compiler messages carefully</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I explain each line?</li>
            <li>Do I know where execution starts?</li>
            <li>Can I modify the output confidently?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should not move ahead until they can explain this program
            without looking at notes. This program becomes the reference point
            for understanding every future Java concept.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Encourage learners to change only the output text first. Small
            modifications reduce fear and improve confidence.
          </p>
        </section>
      </div>
    );
  }
}
