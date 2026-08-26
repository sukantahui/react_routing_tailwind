// Topic17.jsx
// Topic 18: Difference between print() and println()
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic17 extends Component {
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
            Difference between print() and println()
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Although <code>print()</code> and <code>println()</code> look similar, their
            behavior is different. Choosing the correct one improves readability
            and debugging efficiency.
          </p>
        </header>

        {/* ================= CORE IDEA ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Core Difference
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The only difference is that <strong>println()</strong> moves the cursor to
            the next line after printing, while <strong>print()</strong> does not.
            This small difference has a big impact on output formatting.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Swadeep prints marks of students in Barrackpore, choosing the
            correct method decides whether the output looks clean or confusing.
          </p>
        </section>

        {/* ================= SIDE BY SIDE ================= */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Side-by-Side Example
          </h2>

          <JavaCodeBlock
            language="java"
            code={`System.out.print("Java");
System.out.print("Programming");`}
          />

          <JavaCodeBlock
            language="java"
            code={`System.out.println("Java");
System.out.println("Programming");`}
          />
        </section>

        {/* ================= OUTPUT COMPARISON ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Output Comparison
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Output difference between print and println"
          >
            <rect x="60" y="80" width="350" height="120" rx="14" fill="#38bdf8" />
            <text x="235" y="115" textAnchor="middle" fontSize="14" fill="#0f172a">print()</text>
            <text x="235" y="145" textAnchor="middle" fontSize="12" fill="#0f172a">JavaProgramming</text>

            <rect x="490" y="80" width="350" height="120" rx="14" fill="#a855f7" />
            <text x="665" y="115" textAnchor="middle" fontSize="14" fill="#0f172a">println()</text>
            <text x="665" y="145" textAnchor="middle" fontSize="12" fill="#0f172a">Java\nProgramming</text>
          </svg>
        </section>

        {/* ================= TECHNICAL DETAILS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Technical Explanation
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Both methods belong to the <code>PrintStream</code> class and return
            <code>void</code>. Internally, <code>println()</code> adds a newline character
            after printing the data.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Class:</strong> PrintStream<br />
            <strong>Return Type:</strong> void<br />
            <strong>Difference:</strong> Newline handling
          </p>
        </section>

        {/* ================= WHEN TO USE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            When to Use Which
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-4xl">
            <li>Use <code>println()</code> for simple outputs and logs</li>
            <li>Use <code>print()</code> for formatted or inline output</li>
            <li>Mix both carefully for table-like output</li>
          </ul>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Expecting print() to move to next line</li>
            <li>Using println() everywhere without formatting</li>
            <li>Confusing output layout while debugging</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Predict output before running code</li>
            <li>Use println() during debugging</li>
            <li>Switch to print() for precise formatting</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I explain the difference clearly?</li>
            <li>Can I predict output layout?</li>
            <li>Do I know when to mix both?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students often underestimate this topic. Emphasize that clean output
            reflects clean thinking. Output formatting becomes critical in
            debugging and user-facing programs.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A good exercise is to ask learners to design a small report-like output
            using both methods intentionally.
          </p>
        </section>
      </div>
    );
  }
}
