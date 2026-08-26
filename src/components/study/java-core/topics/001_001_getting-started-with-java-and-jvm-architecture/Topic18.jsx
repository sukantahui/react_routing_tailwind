// Topic18.jsx
// Topic 19: Basic Debugging using Output Statements
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic18 extends Component {
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
            Basic Debugging using Output Statements
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Before using advanced debuggers, programmers rely on output statements
            to understand how a program behaves at runtime.
          </p>
        </header>

        {/* ================= WHY DEBUGGING ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Debugging is Necessary
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Debugging is the process of finding and fixing errors in a program.
            Output-based debugging helps us "see" what the program is doing
            internally.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Tuhina tests her logic in Barrackpore and the output is unexpected,
            printing intermediate values helps identify where things go wrong.
          </p>
        </section>

        {/* ================= DEBUGGING TOOL ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Output Statements as Debugging Tools
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Methods like <code>System.out.println()</code> are not only for displaying
            final results. They are widely used to inspect variable values,
            conditions, and execution flow.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>API:</strong> System.out.println()<br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Display runtime information
          </p>
        </section>

        {/* ================= EXAMPLE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Debugging Example
          </h2>

          <JavaCodeBlock
            language="java"
            code={`class DebugExample {
    public static void main(String[] args) {
        int total = 0;
        for (int i = 1; i <= 5; i++) {
            total = total + i;
            System.out.println("i = " + i + ", total = " + total);
        }
    }
}`}
          />

          <p className="leading-relaxed max-w-4xl">
            Each iteration prints the current value of <code>i</code> and
            <code>total</code>. This allows us to verify whether the loop behaves
            as expected.
          </p>
        </section>

        {/* ================= EXECUTION FLOW ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Visualizing the Debugging Flow
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Debugging using output statements flow"
          >
            <rect x="60" y="110" width="200" height="60" rx="12" fill="#38bdf8" />
            <text x="160" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Code Executes</text>

            <rect x="350" y="110" width="200" height="60" rx="12" fill="#a855f7" />
            <text x="450" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Print Values</text>

            <rect x="640" y="110" width="200" height="60" rx="12" fill="#22c55e" />
            <text x="740" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Analyze Output</text>

            <line x1="260" y1="140" x2="350" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="550" y1="140" x2="640" y2="140" stroke="#475569" strokeWidth="2" />
          </svg>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Printing only final output instead of intermediate values</li>
            <li>Forgetting to remove debug prints after fixing the issue</li>
            <li>Misinterpreting printed results</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Print variable names along with values</li>
            <li>Use clear labels in output</li>
            <li>Remove or comment debug statements after use</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I debug logic using output statements?</li>
            <li>Do I know what to print and where?</li>
            <li>Can I interpret intermediate results?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Output-based debugging teaches disciplined thinking. Students must
            learn to ask "what should happen next" before looking at results.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Encourage learners to predict printed values before running code.
            This bridges the gap between logic and execution.
          </p>
        </section>
      </div>
    );
  }
}
