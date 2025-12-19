// Topic8.jsx
// Topic 9: How Java Source Code Is Converted to Bytecode
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic8 extends Component {
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
            How Java Source Code Is Converted to Bytecode
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            This topic zooms into the compilation phase and explains how Java source
            code (.java) is transformed into platform-independent bytecode (.class).
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            The Big Idea
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java achieves platform independence by compiling source code into
            <strong> bytecode</strong>, not machine code. Bytecode is an intermediate
            representation understood by the JVM, not by the operating system directly.
          </p>
          <p className="leading-relaxed max-w-4xl">
            This means a program written by Swadeep in Barrackpore produces the
            same bytecode file that Abhronila can execute later in Naihati or Ichapur.
          </p>
        </section>

        {/* ================= COMPILATION PIPELINE SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Compilation Pipeline
          </h2>

          <svg
            viewBox="0 0 960 280"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java source to bytecode pipeline"
          >
            {/* Source */}
            <rect x="40" y="110" width="200" height="60" rx="12" fill="#38bdf8" />
            <text x="140" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Source (.java)</text>

            {/* Compiler */}
            <rect x="280" y="110" width="200" height="60" rx="12" fill="#a855f7" />
            <text x="380" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">javac</text>

            {/* Bytecode */}
            <rect x="520" y="110" width="200" height="60" rx="12" fill="#22c55e" />
            <text x="620" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Bytecode (.class)</text>

            {/* JVM */}
            <rect x="760" y="90" width="160" height="100" rx="14" fill="#eab308" />
            <text x="840" y="135" textAnchor="middle" fontSize="14" fill="#0f172a">JVM</text>

            {/* Arrows */}
            <line x1="240" y1="140" x2="280" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="480" y1="140" x2="520" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="720" y1="140" x2="760" y2="140" stroke="#475569" strokeWidth="2" />
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            The compiler produces bytecode once; the JVM consumes it wherever needed.
          </p>
        </section>

        {/* ================= COMPILER STAGES ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Stages Inside the Compiler
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-4xl">
            <li><strong>Lexical analysis:</strong> Breaks code into tokens</li>
            <li><strong>Syntax analysis:</strong> Checks grammar rules</li>
            <li><strong>Semantic analysis:</strong> Validates types and names</li>
            <li><strong>Bytecode generation:</strong> Produces .class files</li>
          </ul>
        </section>

        {/* ================= COMMAND DEMO ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Converting Source to Bytecode
          </h2>

          <JavaCodeBlock
            language="bash"
            code={`javac Sample.java`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Command:</strong> <code>javac</code><br />
            <strong>Type:</strong> Java compiler
            <br />
            <strong>Purpose:</strong> Converts .java source into .class bytecode
            <br />
            <strong>When & Why:</strong> Used before any Java program can run
          </p>
        </section>

        {/* ================= WHY BYTECODE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Java Uses Bytecode
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Bytecode acts as a universal format. Instead of writing separate
            machine code for Windows, Linux, and macOS, Java generates one
            bytecode file that each JVM understands.
          </p>
          <p className="leading-relaxed max-w-4xl">
            This design greatly reduces development effort and increases
            software reliability across platforms.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Expecting machine code output from javac</li>
            <li>Deleting .class files and trying to run programs</li>
            <li>Confusing bytecode with JVM execution</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Always check compilation output</li>
            <li>Understand errors before fixing them</li>
            <li>Keep source and bytecode files organized</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Do I know what bytecode is?</li>
            <li>Can I explain how javac works?</li>
            <li>Do I understand why bytecode is platform independent?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should clearly remember that <strong>bytecode is not executable by the OS</strong>.
            It is designed only for the JVM. Confusing this point often leads to
            misunderstandings about platform independence.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A good classroom check is to ask learners to explain why Java does not
            produce .exe files. If they answer in terms of JVM and bytecode,
            the concept is well understood.
          </p>
        </section>
      </div>
    );
  }
}
