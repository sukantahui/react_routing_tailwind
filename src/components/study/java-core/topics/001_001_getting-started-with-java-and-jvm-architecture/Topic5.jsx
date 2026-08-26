// Topic5.jsx
// Topic 6: Introduction to JDK, JRE and JVM
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook reserved for future enhancements (analytics / subtle animations)
    this.setState({ ready: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Introduction to JDK, JRE and JVM
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            To truly understand how Java works, you must clearly distinguish between
            the JDK, JRE, and JVM. These three form the backbone of the Java platform.
          </p>
        </header>

        {/* ================= BIG PICTURE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            The Big Picture
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Many beginners try to memorize JDK, JRE, and JVM as definitions.
            Instead, think of them as <strong>tools with specific responsibilities</strong>
            in the Java ecosystem.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Swadeep writes a Java program in a lab at Barrackpore and Tuhina
            runs it later in Naihati, all three — JDK, JRE, and JVM — play
            different but connected roles.
          </p>
        </section>

        {/* ================= VISUAL OVERVIEW SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            How JDK, JRE and JVM Fit Together
          </h2>

          <svg
            viewBox="0 0 900 300"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="JDK JRE JVM relationship diagram"
          >
            {/* JDK */}
            <rect x="80" y="40" width="740" height="200" rx="18" fill="#38bdf8" />
            <text x="450" y="70" textAnchor="middle" fontSize="16" fill="#0f172a">
              JDK (Java Development Kit)
            </text>

            {/* JRE */}
            <rect x="160" y="90" width="580" height="120" rx="16" fill="#a855f7" />
            <text x="450" y="120" textAnchor="middle" fontSize="15" fill="#0f172a">
              JRE (Java Runtime Environment)
            </text>

            {/* JVM */}
            <rect x="300" y="145" width="300" height="50" rx="12" fill="#22c55e" />
            <text x="450" y="175" textAnchor="middle" fontSize="14" fill="#0f172a">
              JVM (Java Virtual Machine)
            </text>
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            The JDK contains the JRE, and the JRE contains the JVM.
          </p>
        </section>

        {/* ================= JVM ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            JVM (Java Virtual Machine)
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The <strong>JVM</strong> is the engine that actually runs Java programs.
            It reads <strong>bytecode</strong> and converts it into machine-specific
            instructions.
          </p>
          <ul className="list-disc list-inside space-y-1 max-w-4xl">
            <li><strong>Purpose:</strong> Execute Java bytecode</li>
            <li><strong>Why needed:</strong> Enables platform independence</li>
            <li><strong>When used:</strong> Every time a Java program runs</li>
          </ul>
        </section>

        {/* ================= JRE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            JRE (Java Runtime Environment)
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The <strong>JRE</strong> provides the environment required to run Java
            applications. It includes the JVM and core libraries.
          </p>
          <ul className="list-disc list-inside space-y-1 max-w-4xl">
            <li><strong>Includes:</strong> JVM + standard Java libraries</li>
            <li><strong>Purpose:</strong> Run Java programs</li>
            <li><strong>Who needs it:</strong> End users, not necessarily developers</li>
          </ul>
        </section>

        {/* ================= JDK ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            JDK (Java Development Kit)
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The <strong>JDK</strong> is a complete toolkit for Java developers.
            It contains the JRE plus development tools like the compiler.
          </p>

          <JavaCodeBlock
            language="bash"
            code={`javac HelloWorld.java
java HelloWorld`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Tool:</strong> <code>javac</code><br />
            <strong>Type:</strong> Compiler<br />
            <strong>Purpose:</strong> Converts source code into bytecode<br />
            <strong>When & Why:</strong> Used during program development
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Thinking JDK, JRE, and JVM are the same</li>
            <li>Installing only JRE when learning Java programming</li>
            <li>Believing JVM alone can compile Java code</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Always install JDK for learning and development</li>
            <li>Understand the role of each component clearly</li>
            <li>Use diagrams to remember their relationship</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I explain JVM, JRE, and JDK in my own words?</li>
            <li>Do I know which one is needed for development?</li>
            <li>Can I draw their relationship from memory?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            This topic is foundational. Students must never proceed further if
            they cannot clearly differentiate JDK, JRE, and JVM.
            Treat this as a mental model, not a definition-learning exercise.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A useful classroom trick is to ask learners to explain these three
            components using a real-life setup from their locality or classroom.
            If the explanation is logical, they are ready for compilation and
            execution flow topics.
          </p>
        </section>
      </div>
    );
  }
}
