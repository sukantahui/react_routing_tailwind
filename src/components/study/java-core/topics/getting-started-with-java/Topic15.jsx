// Topic15.jsx
// Topic 16: Common Compilation and Runtime Errors in Java
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic15 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
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
            Common Compilation and Runtime Errors in Java
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Errors are a normal part of learning Java. Understanding the type of error
            helps you fix it quickly and confidently.
          </p>
        </header>

        {/* ================= ERROR TYPES ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Types of Errors in Java
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java errors are broadly divided into <strong>compilation errors</strong>
            and <strong>runtime errors</strong>. The time at which the error occurs
            determines how it should be handled.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Swadeep writes code in Barrackpore, the compiler checks rules first.
            When the program runs later in Naihati, the JVM checks runtime behavior.
          </p>
        </section>

        {/* ================= COMPILATION ERRORS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Compilation Errors
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Compilation errors occur when the Java compiler (<code>javac</code>)
            detects violations of Java syntax or rules. The program does not
            produce a <code>.class</code> file if compilation fails.
          </p>

          <JavaCodeBlock
            language="java"
            code={`class Test {
    public static void main(String[] args) {
        System.out.println("Hello")
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Error:</strong> Missing semicolon<br />
            <strong>Detected by:</strong> Compiler<br />
            <strong>When:</strong> Before execution starts
          </p>
        </section>

        {/* ================= RUNTIME ERRORS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Runtime Errors
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Runtime errors occur while the program is running. These errors are
            detected by the JVM, not the compiler.
          </p>

          <JavaCodeBlock
            language="java"
            code={`class Divide {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        System.out.println(a / b);
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Error:</strong> ArithmeticException (division by zero)<br />
            <strong>Detected by:</strong> JVM<br />
            <strong>When:</strong> During execution
          </p>
        </section>

        {/* ================= ERROR COMPARISON ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Compilation vs Runtime Errors
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Compilation vs Runtime errors comparison"
          >
            <rect x="80" y="80" width="300" height="100" rx="14" fill="#38bdf8" />
            <text x="230" y="120" textAnchor="middle" fontSize="14" fill="#0f172a">Compilation Errors</text>
            <text x="230" y="145" textAnchor="middle" fontSize="12" fill="#0f172a">Detected by Compiler</text>

            <rect x="520" y="80" width="300" height="100" rx="14" fill="#f97316" />
            <text x="670" y="120" textAnchor="middle" fontSize="14" fill="#0f172a">Runtime Errors</text>
            <text x="670" y="145" textAnchor="middle" fontSize="12" fill="#0f172a">Detected by JVM</text>
          </svg>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Ignoring compiler error messages</li>
            <li>Assuming runtime errors are syntax errors</li>
            <li>Not reading stack trace carefully</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Fix compilation errors first</li>
            <li>Read runtime error messages top-down</li>
            <li>Understand error type before fixing</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I distinguish compilation vs runtime errors?</li>
            <li>Do I know who detects each error?</li>
            <li>Can I fix errors systematically?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should be trained to pause and classify the error first
            before attempting a fix. This habit saves enormous time in advanced
            programming topics.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Encourage learners to reproduce common errors intentionally and
            explain them aloud. Verbalizing errors improves debugging skills.
          </p>
        </section>
      </div>
    );
  }
}
