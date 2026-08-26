// Topic21.jsx
// Topic 22: Good Coding Practices for Beginners
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic21 extends Component {
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
            Good Coding Practices for Beginners
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Writing correct code is not enough. Good coding practices make programs
            readable, maintainable, and professional from the very beginning.
          </p>
        </header>

        {/* ================= WHY PRACTICES ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Good Coding Practices Matter
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Programs are read many more times than they are written. Clean coding
            habits help others—and your future self—understand the logic easily.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Swadeep shares his Java file with classmates in Barrackpore, good
            formatting and naming immediately make the code easier to follow.
          </p>
        </section>

        {/* ================= NAMING ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Meaningful Naming
          </h2>

          <JavaCodeBlock
            language="java"
            code={`// Bad
int x;

// Good
int totalMarks;`}
          />

          <p className="leading-relaxed max-w-4xl">
            Variable, class, and method names should describe their purpose clearly.
            Avoid short or unclear names unless the scope is very small.
          </p>
        </section>

        {/* ================= FORMATTING ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Proper Indentation & Formatting
          </h2>

          <JavaCodeBlock
            language="java"
            code={`// Poor formatting
if(a>0){System.out.println(a);} 

// Proper formatting
if (a > 0) {
    System.out.println(a);
}`}
          />

          <p className="leading-relaxed max-w-4xl">
            Consistent indentation improves readability and reduces logical errors,
            especially in conditions and loops.
          </p>
        </section>

        {/* ================= COMMENTS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Using Comments Wisely
          </h2>

          <JavaCodeBlock
            language="java"
            code={`// Calculates total marks
int total = theory + practical;`}
          />

          <p className="leading-relaxed max-w-4xl">
            Comments should explain <em>why</em> something is done, not what is
            obvious from the code itself.
          </p>
        </section>

        {/* ================= SMALL METHODS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Keep Code Simple and Small
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Break large logic into smaller, manageable parts. Small methods are
            easier to test and debug.
          </p>
        </section>

        {/* ================= AVOID MAGIC ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Avoid Magic Numbers
          </h2>

          <JavaCodeBlock
            language="java"
            code={`// Bad
if (marks > 40) {
    result = "Pass";
}

// Good
final int PASS_MARKS = 40;
if (marks > PASS_MARKS) {
    result = "Pass";
}`}
          />

          <p className="leading-relaxed max-w-4xl">
            Using named constants makes programs self-explanatory and easy to
            update later.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Poor or inconsistent naming</li>
            <li>No indentation or formatting</li>
            <li>Over-commenting obvious code</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices Summary
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Write code for humans, not just machines</li>
            <li>Be consistent in style</li>
            <li>Review and clean code regularly</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Are my names meaningful?</li>
            <li>Is my code properly formatted?</li>
            <li>Can someone else read my code easily?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Good habits formed early stay for life. Emphasize cleanliness,
            readability, and discipline from the first program itself.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Ask students to review each other’s code. Peer review reinforces
            standards better than correction alone.
          </p>
        </section>
      </div>
    );
  }
}
