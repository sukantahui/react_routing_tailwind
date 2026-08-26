// Topic16.jsx
// Topic 17: Using System.out.print() and System.out.println()
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic16 extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: false };
  }

  componentDidMount() {
    // Lifecycle hook reserved for subtle animations / analytics
    this.setState({ ready: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Using System.out.print() and System.out.println()
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Output statements are the first tools Java learners use to see program results.
            Understanding how printing works is essential for learning and debugging.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Output Statements Matter
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java programs often run invisibly. Output statements act like a
            conversation window between the program and the user.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Abhronila tests her logic in Shyamnagar, printing values helps her
            understand whether the program is behaving as expected.
          </p>
        </section>

        {/* ================= API OVERVIEW ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Understanding the API
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Both <code>print()</code> and <code>println()</code> are methods of the
            <code>PrintStream</code> class, accessed via <code>System.out</code>.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Class:</strong> PrintStream<br />
            <strong>Object:</strong> System.out<br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Display output on console
          </p>
        </section>

        {/* ================= println ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            System.out.println()
          </h2>

          <JavaCodeBlock
            language="java"
            code={`System.out.println("Hello Java");
System.out.println("Welcome to Programming");`}
          />

          <p className="leading-relaxed max-w-4xl">
            <code>println()</code> prints the message and then moves the cursor to
            the next line. This makes output clean and readable.
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Signature:</strong> println(data)<br />
            <strong>Return Type:</strong> void<br />
            <strong>When & Why:</strong> Used when each output should appear on a new line
          </p>
        </section>

        {/* ================= print ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            System.out.print()
          </h2>

          <JavaCodeBlock
            language="java"
            code={`System.out.print("Java ");
System.out.print("Programming");`}
          />

          <p className="leading-relaxed max-w-4xl">
            <code>print()</code> displays output without moving to a new line.
            Multiple print statements appear on the same line.
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Signature:</strong> print(data)<br />
            <strong>Return Type:</strong> void<br />
            <strong>When & Why:</strong> Used to control formatting manually
          </p>
        </section>

        {/* ================= OUTPUT VISUAL ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Visualizing the Output
          </h2>

          <svg
            viewBox="0 0 900 240"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="print vs println output behavior"
          >
            <rect x="80" y="80" width="300" height="100" rx="14" fill="#38bdf8" />
            <text x="230" y="115" textAnchor="middle" fontSize="14" fill="#0f172a">println()</text>
            <text x="230" y="140" textAnchor="middle" fontSize="12" fill="#0f172a">Moves to next line</text>

            <rect x="520" y="80" width="300" height="100" rx="14" fill="#a855f7" />
            <text x="670" y="115" textAnchor="middle" fontSize="14" fill="#0f172a">print()</text>
            <text x="670" y="140" textAnchor="middle" fontSize="12" fill="#0f172a">Same line output</text>
          </svg>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Expecting print() to move to a new line</li>
            <li>Using println() for formatted output unintentionally</li>
            <li>Forgetting quotes around strings</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Use println() for most beginner programs</li>
            <li>Switch to print() when formatting output</li>
            <li>Label outputs clearly for readability</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Do I know when to use print vs println?</li>
            <li>Can I predict the output before running?</li>
            <li>Can I format output intentionally?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Encourage students to predict output on paper before execution.
            This habit strengthens logical thinking and reduces blind trial-and-error.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Output statements later become debugging tools. Mastery here directly
            improves problem-solving in loops and conditions.
          </p>
        </section>
      </div>
    );
  }
}
