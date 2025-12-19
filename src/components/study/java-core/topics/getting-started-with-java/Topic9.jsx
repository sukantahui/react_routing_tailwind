// Topic9.jsx
// Topic 10: Java Program Structure (class, main method, braces)
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook reserved for future enhancements (animations / analytics)
    this.setState({ ready: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Java Program Structure
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Every Java program follows a fixed structure. Understanding this structure
            removes fear and prevents common beginner mistakes.
          </p>
        </header>

        {/* ================= OVERVIEW ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What Makes a Valid Java Program
          </h2>
          <p className="leading-relaxed max-w-4xl">
            A basic Java program is built using three essential components:
            a <strong>class</strong>, the <strong>main method</strong>, and
            properly matched <strong>braces</strong>. Missing any of these
            results in compilation errors.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Tuhina writes her first Java program in Barrackpore,
            these components act like the classroom rules that must
            be followed before learning advanced topics.
          </p>
        </section>

        {/* ================= STRUCTURE SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Structure of a Java Program
          </h2>

          <svg
            viewBox="0 0 900 320"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java program structure diagram"
          >
            {/* Class */}
            <rect x="60" y="40" width="780" height="240" rx="18" fill="#38bdf8" />
            <text x="450" y="70" textAnchor="middle" fontSize="16" fill="#0f172a">Class</text>

            {/* Main method */}
            <rect x="120" y="90" width="660" height="150" rx="14" fill="#a855f7" />
            <text x="450" y="120" textAnchor="middle" fontSize="15" fill="#0f172a">main() Method</text>

            {/* Statements */}
            <rect x="180" y="140" width="540" height="70" rx="12" fill="#22c55e" />
            <text x="450" y="180" textAnchor="middle" fontSize="14" fill="#0f172a">Statements</text>
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Java code is always written inside a class, and execution starts from
            the main method.
          </p>
        </section>

        {/* ================= CLASS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            1. Class
          </h2>
          <p className="leading-relaxed max-w-4xl">
            A <strong>class</strong> is a blueprint that contains variables and methods.
            In Java, all executable code must be written inside a class.
          </p>

          <JavaCodeBlock
            language="java"
            code={`class Sample {
    // code goes here
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Keyword:</strong> <code>class</code><br />
            <strong>Purpose:</strong> Defines a blueprint for objects<br />
            <strong>When & Why:</strong> Mandatory container for Java code
          </p>
        </section>

        {/* ================= MAIN METHOD ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            2. main() Method
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The <strong>main method</strong> is the entry point of a Java program.
            The JVM always starts execution from this method.
          </p>

          <JavaCodeBlock
            language="java"
            code={`public static void main(String[] args) {
    // program starts here
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Prototype:</strong> <code>public static void main(String[] args)</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Starting point of program execution<br />
            <strong>When & Why:</strong> Required for JVM to run the program
          </p>
        </section>

        {/* ================= BRACES ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Braces {"{"} {"}"}
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Curly braces define the beginning and end of a block.
            Java is very strict about matching braces correctly.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A missing brace is like forgetting to close a classroom door —
            everything inside becomes confusing.
          </p>
        </section>

        {/* ================= COMPLETE PROGRAM ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Complete Java Program Structure
          </h2>

          <JavaCodeBlock
            language="java"
            code={`class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            This program follows correct class structure, main method syntax,
            and balanced braces.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Writing code outside the class</li>
            <li>Misspelling the main method</li>
            <li>Mismatched or missing braces</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Indent code properly to visualize blocks</li>
            <li>Use meaningful class names</li>
            <li>Always check brace alignment</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I write a basic Java program from memory?</li>
            <li>Do I know where execution starts?</li>
            <li>Can I identify structural errors?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should practice writing the program structure repeatedly
            without copying. Structure mistakes should be corrected immediately,
            as they block progress in all future topics.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A useful drill is to ask learners to write only the class and main
            method skeleton first, then add logic later. This builds confidence
            and discipline.
          </p>
        </section>
      </div>
    );
  }
}
