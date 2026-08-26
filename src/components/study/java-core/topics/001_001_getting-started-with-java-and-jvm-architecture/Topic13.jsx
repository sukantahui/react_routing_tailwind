// Topic13.jsx
// Topic 14: Compiling Java Programs using javac
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic13 extends Component {
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
            Compiling Java Programs using <code>javac</code>
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Compilation is the first technical step that turns Java source code into
            bytecode. This topic focuses only on how compilation works using the
            <code>javac</code> compiler.
          </p>
        </header>

        {/* ================= WHAT IS javac ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What is <code>javac</code>?
          </h2>
          <p className="leading-relaxed max-w-4xl">
            <code>javac</code> is the <strong>Java compiler</strong>. It reads Java
            source files (<code>.java</code>) and converts them into bytecode
            (<code>.class</code>) files. This bytecode is later executed by the JVM.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Swadeep types his first command in the lab at Barrackpore,
            <code>javac</code> is the tool that checks whether the program follows
            Java rules before it can ever run.
          </p>
        </section>

        {/* ================= BASIC COMMAND ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Basic Compilation Command
          </h2>

          <JavaCodeBlock
            language="bash"
            code={`javac HelloWorld.java`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Command:</strong> <code>javac</code><br />
            <strong>Input:</strong> Source file (.java)<br />
            <strong>Output:</strong> Bytecode file (.class)<br />
            <strong>Purpose:</strong> Compile Java source code
          </p>
        </section>

        {/* ================= WHAT HAPPENS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What Happens During Compilation
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-4xl">
            <li>Syntax of the program is checked</li>
            <li>Data types and variable names are validated</li>
            <li>Bytecode (.class file) is generated</li>
          </ul>
        </section>

        {/* ================= MULTIPLE FILES ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Compiling Multiple Java Files
          </h2>

          <JavaCodeBlock
            language="bash"
            code={`javac Student.java Teacher.java`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Purpose:</strong> Compile multiple source files together<br />
            <strong>When & Why:</strong> Useful when classes depend on each other
          </p>
        </section>

        {/* ================= COMMON ERRORS ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Compilation Errors
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Missing semicolon</li>
            <li>Class name does not match file name</li>
            <li>Syntax errors (braces, spelling)</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Compile frequently while coding</li>
            <li>Read error messages from top to bottom</li>
            <li>Fix one error at a time</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Did compilation create a .class file?</li>
            <li>Did I fix all syntax errors?</li>
            <li>Do I understand why compilation failed?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should treat the compiler as a strict teacher, not an enemy.
            Every compilation error is guidance toward correct Java syntax.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Encourage learners to intentionally create a small error, observe the
            compiler message, and then fix it. This builds confidence in reading
            and understanding error outputs.
          </p>
        </section>
      </div>
    );
  }
}
