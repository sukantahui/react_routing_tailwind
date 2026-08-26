// Topic19.jsx
// Topic 20: Introduction to IDEs (BlueJ, IntelliJ IDEA, Eclipse – overview)
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic19 extends Component {
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
            Introduction to IDEs (BlueJ, IntelliJ IDEA, Eclipse)
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            An IDE (Integrated Development Environment) provides everything needed
            to write, compile, run, and debug Java programs from a single interface.
          </p>
        </header>

        {/* ================= WHAT IS IDE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What is an IDE?
          </h2>
          <p className="leading-relaxed max-w-4xl">
            An IDE combines a source code editor, compiler integration, runtime
            environment, and debugging tools. It reduces manual work and improves
            productivity.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Debangshu practices Java in Ichapur, an IDE immediately highlights
            mistakes that would otherwise appear only during compilation.
          </p>
        </section>

        {/* ================= WHY IDE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Java Developers Use IDEs
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-4xl">
            <li>Syntax highlighting and auto-completion</li>
            <li>Instant error detection</li>
            <li>One-click run and debug</li>
            <li>Project and file management</li>
          </ul>
        </section>

        {/* ================= IDE WORKSPACE SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            IDE as a Complete Workspace
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="IDE components overview"
          >
            <rect x="60" y="90" width="200" height="80" rx="14" fill="#38bdf8" />
            <text x="160" y="130" textAnchor="middle" fontSize="14" fill="#0f172a">Code Editor</text>

            <rect x="350" y="90" width="200" height="80" rx="14" fill="#a855f7" />
            <text x="450" y="130" textAnchor="middle" fontSize="14" fill="#0f172a">Compiler Tools</text>

            <rect x="640" y="90" width="200" height="80" rx="14" fill="#22c55e" />
            <text x="740" y="130" textAnchor="middle" fontSize="14" fill="#0f172a">Debugger</text>

            <line x1="260" y1="130" x2="350" y2="130" stroke="#475569" strokeWidth="2" />
            <line x1="550" y1="130" x2="640" y2="130" stroke="#475569" strokeWidth="2" />
          </svg>
        </section>

        {/* ================= BLUEJ ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">BlueJ</h2>
          <p className="leading-relaxed max-w-4xl">
            BlueJ is designed for beginners and schools. It visually represents
            classes and objects, making object-oriented concepts easier to grasp.
          </p>
          <ul className="list-disc list-inside space-y-1 max-w-4xl">
            <li>Ideal for beginners and ICSE/ISC students</li>
            <li>Simple and distraction-free interface</li>
            <li>Focus on class–object relationship</li>
          </ul>
        </section>

        {/* ================= INTELLIJ ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">IntelliJ IDEA</h2>
          <p className="leading-relaxed max-w-4xl">
            IntelliJ IDEA is a professional IDE widely used in the software industry.
            It provides intelligent code analysis and advanced refactoring tools.
          </p>
          <ul className="list-disc list-inside space-y-1 max-w-4xl">
            <li>Industry-standard IDE</li>
            <li>Smart suggestions and refactoring</li>
            <li>Excellent debugging support</li>
          </ul>
        </section>

        {/* ================= ECLIPSE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Eclipse</h2>
          <p className="leading-relaxed max-w-4xl">
            Eclipse is an open-source IDE used in education and enterprise projects.
            It is extensible through plugins and supports multiple languages.
          </p>
          <ul className="list-disc list-inside space-y-1 max-w-4xl">
            <li>Free and open source</li>
            <li>Highly extensible</li>
            <li>Used in large Java projects</li>
          </ul>
        </section>

        {/* ================= IDE VS TERMINAL ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            IDE vs Command Line
          </h2>
          <p className="leading-relaxed max-w-4xl">
            IDEs internally use <code>javac</code> and <code>java</code> commands.
            Understanding command-line basics helps students appreciate what the
            IDE automates.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">Common Beginner Mistakes</h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Relying on IDE without understanding errors</li>
            <li>Ignoring warnings and suggestions</li>
            <li>Assuming IDE fixes logic mistakes automatically</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">Best Practices</h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Learn Java basics before heavy IDE usage</li>
            <li>Read and understand IDE error messages</li>
            <li>Practice occasionally using terminal</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">Student Checklist</h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Do I know what an IDE is?</li>
            <li>Can I name BlueJ, IntelliJ IDEA, and Eclipse?</li>
            <li>Do I know what the IDE automates?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Teacher’s Note</h2>
          <p className="leading-relaxed max-w-4xl">
            IDEs should be introduced only after students understand compilation
            and execution basics. Otherwise, learning becomes mechanical.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Encourage learners to explain what happens when they click the Run
            button. Conceptual clarity here pays dividends later.
          </p>
        </section>
      </div>
    );
  }
}
