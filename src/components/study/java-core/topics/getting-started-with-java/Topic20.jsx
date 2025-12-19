// Topic20.jsx
// Topic 21: Writing and Running Java Programs using an IDE
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic20 extends Component {
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
            Writing and Running Java Programs using an IDE
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            IDEs simplify the process of writing, compiling, and running Java programs.
            This topic shows how beginners typically work inside an IDE.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Big Picture Workflow
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Inside an IDE, many steps happen automatically. When you click
            <strong> Run </strong>, the IDE internally compiles the code using
            <code> javac </code> and executes it using the <code> java </code> command.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Abhronila works on her first project in Shyamnagar, the IDE
            hides complexity so she can focus on learning logic.
          </p>
        </section>

        {/* ================= IDE WORKFLOW SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            IDE Workflow
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="IDE workflow for Java programs"
          >
            <rect x="60" y="110" width="200" height="60" rx="12" fill="#38bdf8" />
            <text x="160" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Write Code</text>

            <rect x="350" y="110" width="200" height="60" rx="12" fill="#a855f7" />
            <text x="450" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Compile</text>

            <rect x="640" y="110" width="200" height="60" rx="12" fill="#22c55e" />
            <text x="740" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">Run</text>

            <line x1="260" y1="140" x2="350" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="550" y1="140" x2="640" y2="140" stroke="#475569" strokeWidth="2" />
          </svg>
        </section>

        {/* ================= STEP 1 ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Step 1: Creating a Java Class
          </h2>
          <p className="leading-relaxed max-w-4xl">
            IDEs provide templates for creating Java classes. This prevents
            mistakes in class and main method structure.
          </p>

          <JavaCodeBlock
            language="java"
            code={`public class HelloIDE {
    public static void main(String[] args) {
        System.out.println("Hello from IDE");
    }
}`}
          />
        </section>

        {/* ================= STEP 2 ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Step 2: Running the Program
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Clicking the <strong>Run</strong> button triggers compilation and
            execution. Errors, if any, are shown instantly.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Behind the scenes:</strong> IDE calls javac → java
          </p>
        </section>

        {/* ================= IDE FEATURES ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Helpful IDE Features
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-4xl">
            <li>Syntax highlighting</li>
            <li>Error markers and hints</li>
            <li>Auto-import and suggestions</li>
            <li>Integrated console output</li>
          </ul>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Ignoring red error markers</li>
            <li>Running without saving changes</li>
            <li>Depending fully on IDE fixes without understanding</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Read error messages shown by IDE</li>
            <li>Understand what IDE auto-fixes do</li>
            <li>Practice both IDE and command-line execution</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I create and run a Java class in an IDE?</li>
            <li>Do I understand what happens when I click Run?</li>
            <li>Can I locate console output?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            IDE usage should reinforce fundamentals, not replace them. Students
            must be reminded that IDEs automate compilation and execution steps
            they already know.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Ask learners to explain what the IDE is doing internally. If they can
            describe javac and java involvement, understanding is solid.
          </p>
        </section>
      </div>
    );
  }
}
