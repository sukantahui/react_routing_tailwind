// Topic14.jsx
// Topic 15: Running Java Programs using java command
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic14 extends Component {
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
            Running Java Programs using <code>java</code> Command
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            After compilation, Java programs are executed using the <code>java</code> command.
            This topic explains how execution works and how the JVM starts your program.
          </p>
        </header>

        {/* ================= WHAT IS java ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What is the <code>java</code> Command?
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The <code>java</code> command is a <strong>JVM launcher</strong>. It starts the
            Java Virtual Machine and tells it which compiled class to execute.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Tuhina runs her first program in a Naihati computer lab, the
            <code>java</code> command is responsible for loading the class and invoking
            the <code>main</code> method.
          </p>
        </section>

        {/* ================= BASIC EXECUTION ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Basic Execution Command
          </h2>

          <JavaCodeBlock
            language="bash"
            code={`java HelloWorld`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Command:</strong> <code>java</code><br />
            <strong>Input:</strong> Class name (without .class)<br />
            <strong>Purpose:</strong> Start JVM and execute bytecode<br />
            <strong>When & Why:</strong> Used after successful compilation
          </p>
        </section>

        {/* ================= WHY NO EXTENSION ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why We Do NOT Use .class Extension
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The <code>java</code> command works with <strong>class names</strong>, not file names.
            The JVM uses the class loader to locate the corresponding <code>.class</code> file
            internally.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Writing <code>java HelloWorld.class</code> will cause an error because the JVM
            expects a fully qualified class name.
          </p>
        </section>

        {/* ================= EXECUTION FLOW ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What Happens During Execution
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java execution flow using java command"
          >
            <rect x="60" y="110" width="200" height="60" rx="12" fill="#38bdf8" />
            <text x="160" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">java Command</text>

            <rect x="350" y="110" width="200" height="60" rx="12" fill="#a855f7" />
            <text x="450" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">JVM Starts</text>

            <rect x="640" y="110" width="200" height="60" rx="12" fill="#22c55e" />
            <text x="740" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">main() Executes</text>

            <line x1="260" y1="140" x2="350" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="550" y1="140" x2="640" y2="140" stroke="#475569" strokeWidth="2" />
          </svg>
        </section>

        {/* ================= COMMAND LINE ARGUMENTS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Passing Command-Line Arguments
          </h2>

          <JavaCodeBlock
            language="bash"
            code={`java Sum 10 20`}
          />

          <JavaCodeBlock
            language="java"
            code={`class Sum {
    public static void main(String[] args) {
        int a = Integer.parseInt(args[0]);
        int b = Integer.parseInt(args[1]);
        System.out.println(a + b);
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Parameter:</strong> <code>String[] args</code><br />
            <strong>Purpose:</strong> Accept runtime values<br />
            <strong>When & Why:</strong> Useful for dynamic input during execution
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Using .class extension with java command</li>
            <li>Running program without compiling</li>
            <li>Incorrect class name or spelling</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Always check compilation success before running</li>
            <li>Run programs from correct directory</li>
            <li>Understand error messages shown by JVM</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Did I run the program without file extension?</li>
            <li>Did the JVM start successfully?</li>
            <li>Can I pass command-line arguments?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students must clearly separate compilation and execution in their minds.
            Most runtime confusion occurs when learners try to run code that has not
            compiled successfully.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A helpful exercise is to intentionally run a program with the wrong class
            name and observe the JVM error. Understanding these messages builds
            execution confidence.
          </p>
        </section>
      </div>
    );
  }
}
