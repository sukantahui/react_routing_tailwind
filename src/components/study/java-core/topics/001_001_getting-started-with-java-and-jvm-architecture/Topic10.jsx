// Topic10.jsx
// Topic 11: Rules of Writing a Java Program
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic10 extends Component {
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
            Rules of Writing a Java Program
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Java follows strict syntactic and structural rules. Learning these rules early
            prevents frustration and frequent compilation errors.
          </p>
        </header>

        {/* ================= WHY RULES MATTER ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Java Rules Are Strict
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java is a <strong>compiled and strongly-typed language</strong>. The compiler
            enforces rules so that programs are predictable, secure, and maintainable.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Just like examination rules in Barrackpore schools ensure fairness,
            Java rules ensure programs behave consistently everywhere.
          </p>
        </section>

        {/* ================= CORE RULES ================= */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Fundamental Rules
          </h2>

          <ul className="list-disc list-inside space-y-3 max-w-4xl">
            <li>
              <strong>Class name must match file name</strong> (when using public class).
            </li>
            <li>
              <strong>Execution starts from main()</strong> method.
            </li>
            <li>
              <strong>Statements must end with a semicolon (;)</strong>.
            </li>
            <li>
              <strong>Java is case-sensitive</strong> (Main ≠ main).
            </li>
            <li>
              <strong>Code must be written inside a class</strong>.
            </li>
          </ul>
        </section>

        {/* ================= SEMICOLON RULE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Semicolon Rule
          </h2>
          <p className="leading-relaxed max-w-4xl">
            In Java, a semicolon marks the end of a statement. Forgetting it is one
            of the most common beginner errors.
          </p>

          <JavaCodeBlock
            language="java"
            code={`int x = 10;      // correct
int y = 20       // error: missing semicolon`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Purpose:</strong> Tells compiler where a statement ends<br />
            <strong>When & Why:</strong> Required for proper parsing of code
          </p>
        </section>

        {/* ================= CASE SENSITIVITY ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Case Sensitivity
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java treats uppercase and lowercase letters as different. This applies
            to keywords, variables, methods, and class names.
          </p>

          <JavaCodeBlock
            language="java"
            code={`int marks = 80;
int Marks = 90; // different variable`}
          />
        </section>

        {/* ================= MAIN METHOD RULE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            main() Method Rule
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The JVM looks specifically for the main method with an exact signature.
            Any deviation results in runtime errors.
          </p>

          <JavaCodeBlock
            language="java"
            code={`public static void main(String[] args) {
    System.out.println("Program runs");
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Prototype:</strong> <code>public static void main(String[] args)</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Entry point of program execution<br />
            <strong>When & Why:</strong> JVM requires this exact signature
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Forgetting semicolons</li>
            <li>Incorrect capitalization of keywords</li>
            <li>Saving file with wrong name</li>
            <li>Writing logic outside the class</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Follow consistent indentation</li>
            <li>Use meaningful names</li>
            <li>Read compiler errors carefully</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Did I save the file with correct name?</li>
            <li>Did I include semicolons correctly?</li>
            <li>Is my main method signature correct?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students must treat Java rules as non-negotiable. Most early errors are
            not logic errors but rule violations. Emphasize discipline before creativity.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A strong habit is to mentally check file name, class name, semicolons,
            and main method signature before running any program.
          </p>
        </section>
      </div>
    );
  }
}
