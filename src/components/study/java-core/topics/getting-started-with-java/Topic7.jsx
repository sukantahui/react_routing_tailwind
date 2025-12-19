// Topic7.jsx
// Topic 8: Java Compilation and Execution Process
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook reserved for future analytics / subtle animations
    this.setState({ ready: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Java Compilation and Execution Process
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            This topic explains how Java source code is transformed step by step
            into a running program using the compiler and the JVM.
          </p>
        </header>

        {/* ================= OVERVIEW ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Overview of the Process
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java follows a <strong>two-phase execution model</strong>. First, the
            source code is compiled into bytecode. Then, the JVM executes that
            bytecode on the target machine.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Abhronila writes a program in Barrackpore and Swadeep runs it later
            in Naihati, the same bytecode is reused — only the JVM changes.
          </p>
        </section>

        {/* ================= STEP FLOW SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Step-by-Step Flow
          </h2>

          <svg
            viewBox="0 0 960 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java compilation and execution flow"
          >
            {/* Source */}
            <rect x="40" y="110" width="200" height="60" rx="12" fill="#38bdf8" />
            <text x="140" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">.java File</text>

            {/* Compiler */}
            <rect x="280" y="110" width="200" height="60" rx="12" fill="#a855f7" />
            <text x="380" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">javac Compiler</text>

            {/* Bytecode */}
            <rect x="520" y="110" width="200" height="60" rx="12" fill="#22c55e" />
            <text x="620" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">.class Bytecode</text>

            {/* JVM */}
            <rect x="760" y="80" width="160" height="120" rx="14" fill="#eab308" />
            <text x="840" y="130" textAnchor="middle" fontSize="14" fill="#0f172a">JVM</text>
            <text x="840" y="155" textAnchor="middle" fontSize="12" fill="#0f172a">Executes</text>

            {/* Arrows */}
            <line x1="240" y1="140" x2="280" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="480" y1="140" x2="520" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="720" y1="140" x2="760" y2="140" stroke="#475569" strokeWidth="2" />
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Compilation happens once, but execution can happen many times on different machines.
          </p>
        </section>

        {/* ================= COMPILATION PHASE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Phase 1: Compilation
          </h2>
          <p className="leading-relaxed max-w-4xl">
            During compilation, the Java compiler checks syntax errors and
            converts source code into platform-independent bytecode.
          </p>

          <JavaCodeBlock
            language="bash"
            code={`javac Test.java`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Tool:</strong> <code>javac</code><br />
            <strong>Type:</strong> Compiler<br />
            <strong>Purpose:</strong> Converts .java to .class<br />
            <strong>When & Why:</strong> Used before running any Java program
          </p>
        </section>

        {/* ================= EXECUTION PHASE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Phase 2: Execution
          </h2>
          <p className="leading-relaxed max-w-4xl">
            During execution, the JVM loads the bytecode, verifies it,
            and executes instructions using the interpreter or JIT compiler.
          </p>

          <JavaCodeBlock
            language="bash"
            code={`java Test`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Tool:</strong> <code>java</code><br />
            <strong>Type:</strong> JVM launcher<br />
            <strong>Purpose:</strong> Starts JVM and executes bytecode<br />
            <strong>When & Why:</strong> Used to run compiled Java programs
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Trying to run a .java file without compiling</li>
            <li>Using file extension while running (java Test.java)</li>
            <li>Ignoring compilation errors and warnings</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Always compile before execution</li>
            <li>Fix compilation errors first</li>
            <li>Understand each phase clearly</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I explain both compilation and execution?</li>
            <li>Do I know the role of javac and java commands?</li>
            <li>Can I identify errors from each phase?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should be trained to mentally separate compilation errors
            from runtime errors. If this separation is clear now, debugging
            becomes much easier in later topics.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A good exercise is to deliberately create a syntax error and observe
            the compiler message, then fix it and run the program. This builds
            confidence and practical understanding.
          </p>
        </section>
      </div>
    );
  }
}
