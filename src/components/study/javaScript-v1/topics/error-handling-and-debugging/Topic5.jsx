import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Basic Code Quality Practices: Naming, Comments & Small Functions
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Clean code is not optional—it's a necessity. At <strong>Coder & AccoTax
            Barrackpore</strong>, teachers like <strong>Sukanta Hui</strong> and
            <strong> Tanusree Hui</strong> always encourage students (Ritaja,
            Devangshu, Mounita, Susmita, Kaustav etc.) to write code that is not
            just functional, but readable and maintainable.
          </p>

          {/* SECTION 1 - NAMING */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">1. Meaningful Variable & Function Names</h2>

            <p className="text-slate-300 text-sm mb-3">
              Good names make code self-explanatory. Bad names create confusion.
              Follow these rules:
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>Use <strong>camelCase</strong> for variables & functions</li>
              <li>Use clear, descriptive words (not <code>a1</code>, <code>data</code>, <code>x</code>)</li>
              <li>Function names must represent actions</li>
            </ul>

            <CodeBlock
              language="javascript"
              code={`
// ❌ Bad
let n = 80;
function fn(a) { return a * 2; }

// ✅ Good
let studentMarks = 80;
function doubleValue(value) { return value * 2; }
`}
            />
          </section>

          {/* SECTION 2 - COMMENTS */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">2. Write Helpful Comments (But Not Too Many)</h2>

            <p className="text-slate-300 text-sm mb-3">
              Comments should explain <em>why</em> something is done, not just repeat
              what the code already shows.
            </p>

            <CodeBlock
              language="javascript"
              code={`
// Good comment:
 // Calculate total marks for Ritaja
function getTotal(marks) {
  return marks.reduce((sum, m) => sum + m, 0);
}

// Bad comment:
 // loop runs
for(let i=0; i<5; i++) {}
`}
            />

            <p className="text-slate-400 text-xs">
              Comments must add value, not noise.
            </p>
          </section>

          {/* SECTION 3 - SMALL FUNCTIONS */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">3. Keep Functions Small & Focused</h2>

            <p className="text-slate-300 text-sm mb-3">
              A function should do <strong>one thing</strong> and do it well.
              This makes your code:
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>Easier to understand</li>
              <li>Easier to debug</li>
              <li>Easier to test</li>
              <li>Easier to reuse</li>
            </ul>

            <CodeBlock
              language="javascript"
              code={`
// ❌ Bad — too many responsibilities
function processStudent(student) {
  console.log("Saving to database...");
  console.log("Sending email...");
  console.log("Generating report...");
}

// ✅ Good — small, single-purpose functions
function saveStudent(student) {}
function sendEmail(to, subject) {}
function generateReport(student) {}
`}
            />
          </section>

          {/* SECTION 4 - FORMAT & CONSISTENCY */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">4. Consistent Spacing & Formatting</h2>

            <p className="text-slate-300 text-sm">
              Write code that looks clean. This helps both you and your teammates—
              especially when working in professional environments.
            </p>

            <CodeBlock
              language="javascript"
              code={`
// ❌ Messy
function add(a,b){return a+b;}

// ✅ Neat & readable
function add(a, b) {
  return a + b;
}
`}
            />
          </section>

          {/* SECTION 5 - CHECKLIST */}
          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">Mini Clean Code Checklist</h2>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1 mt-2">
              <li>Meaningful names</li>
              <li>Short, focused functions</li>
              <li>Helpful comments</li>
              <li>Consistent formatting</li>
              <li>Remove unused variables/code</li>
              <li>Avoid deeply nested if/else</li>
            </ul>

            <p className="text-slate-400 text-xs mt-2">
              Follow this checklist and your code will look professional—just like
              students trained at Coder & AccoTax.
            </p>
          </section>

        </div>
      </div>
    );
  }
}
