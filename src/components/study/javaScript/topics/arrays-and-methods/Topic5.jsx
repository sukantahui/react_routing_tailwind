import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-10">

        {/* TITLE + INTRO */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300">
            Higher-Order Array Methods —
            <span className="text-sky-100"> map(), filter(), reduce()</span>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            In modern JavaScript, arrays behave like small data pipelines.
            Methods like <code className="text-emerald-300">map()</code>,
            <code className="text-emerald-300"> filter()</code>, and
            <code className="text-emerald-300"> reduce()</code> allow you to transform,
            clean, and analyze data in a clean, expressive, and readable way.
            These are widely used in React apps, dashboards, APIs, and real-world
            applications like those we create at Coder &amp; AccoTax, Barrackpore.
          </p>

          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
            <p className="font-semibold text-sky-200">Why “higher-order” methods?</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>They accept a function as an argument (callback).</li>
              <li>They often return a new transformed array or a single result.</li>
              <li>They make code shorter, modern, clean & easy to maintain.</li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            MAP()
        ============================================================ */}
        <section className="space-y-5">
          <h3 className="text-xl font-semibold text-sky-300">
            1. map() — Transform Every Element
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            <code className="text-emerald-300">map()</code> creates a
            <strong> new array </strong> by applying a function to every element.
            The original array is unchanged.
          </p>

          {/* Syntax */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p className="font-semibold text-sky-200 mb-1">Syntax</p>
            <EditableCodeBlock
              initialCode={`const result = array.map((value, index, array) => {
  return /* transformed value */;
});`}
              language="javascript"
            />
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 1 — Double numbers
            </p>
            <EditableCodeBlock
              initialCode={`const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled);`}
              language="javascript"
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 2 — Extract only student names
            </p>
            <EditableCodeBlock
              initialCode={`const students = [
  { name: "Ritaja", marks: 88 },
  { name: "Mounita", marks: 92 },
  { name: "Devangshu", marks: 81 }
];
const names = students.map(s => s.name);
console.log(names);`}
              language="javascript"
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 3 — Create formatted labels
            </p>
            <EditableCodeBlock
              initialCode={`const students = [
  { name: "Pranjali", course: "JavaScript" },
  { name: "Susmita", course: "Python" },
  { name: "Kaustav", course: "Full Stack" }
];

const labels = students.map(s => \`\${s.name} — \${s.course}\`);
console.log(labels);`}
              language="javascript"
            />
          </div>

          {/* Common Mistakes */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-100 space-y-2">
            <p className="font-semibold text-amber-300">Common mistakes</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Forgetting to <strong>return</strong> the value inside map().</li>
              <li>Expecting map() to modify the original array (it doesn’t).</li>
              <li>Using map() only for side-effects → use forEach instead.</li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            FILTER()
        ============================================================ */}
        <section className="space-y-5">
          <h3 className="text-xl font-semibold text-sky-300">
            2. filter() — Keep Only Matching Items
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            <code className="text-emerald-300">filter()</code> also returns
            a <strong>new array</strong>, but only keeps elements for which the
            callback returns <code>true</code>.
          </p>

          {/* Syntax */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p className="font-semibold text-sky-200 mb-1">Syntax</p>
            <EditableCodeBlock
              initialCode={`const result = array.filter((value, index, array) => {
  return /* condition */; // keep item if true
});`}
              language="javascript"
            />
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 1 — Keep even numbers
            </p>
            <EditableCodeBlock
              initialCode={`const nums = [1,2,3,4,5,6];
const even = nums.filter(n => n % 2 === 0);
console.log(even);`}
              language="javascript"
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 2 — Students who passed
            </p>
            <EditableCodeBlock
              initialCode={`const students = [
  { name: "Ritaja", marks: 85 },
  { name: "Swadeep", marks: 38 },
  { name: "Susmita", marks: 74 },
  { name: "Kaustav", marks: 29 }
];

const passed = students.filter(s => s.marks >= 40);
console.log(passed);`}
              language="javascript"
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 3 — Search filter (JavaScript courses)
            </p>
            <EditableCodeBlock
              initialCode={`const courses = [
  "JavaScript Basics",
  "JavaScript Advanced",
  "Python for Data Analysis",
  "Tally with GST",
  "Full Stack Web Development"
];

const query = "javascript";
const result = courses.filter(c =>
  c.toLowerCase().includes(query.toLowerCase())
);

console.log(result);`}
              language="javascript"
            />
          </div>
        </section>

        {/* ============================================================
            REDUCE()
        ============================================================ */}
        <section className="space-y-5">
          <h3 className="text-xl font-semibold text-sky-300">
            3. reduce() — Convert Array → One Final Value
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            <code className="text-emerald-300">reduce()</code> compresses an entire
            array into one single result — sum, average, object, or anything
            you want to produce.
          </p>

          {/* Syntax */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p className="font-semibold text-sky-200 mb-1">Syntax</p>
            <EditableCodeBlock
              initialCode={`const result = array.reduce((accumulator, value, index, array) => {
  return /* updated accumulator */;
}, initialValue);`}
              language="javascript"
            />
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 1 — Sum of numbers
            </p>
            <EditableCodeBlock
              initialCode={`const marks = [78, 85, 90];
const total = marks.reduce((acc, m) => acc + m, 0);
console.log(total);`}
              language="javascript"
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-slate-200 text-sm">
              Example 2 — Count passed students
            </p>
            <EditableCodeBlock
              initialCode={`const students = [
  { name: "Ritaja", marks: 85 },
  { name: "Swadeep", marks: 38 },
  { name: "Susmita", marks: 74 },
  { name: "Kaustav", marks: 29 }
];

const passedCount = students.reduce((acc, s) => {
  return s.marks >= 40 ? acc + 1 : acc;
}, 0);

console.log(passedCount);`}
              language="javascript"
            />
          </div>
        </section>

      </div>
    );
  }
}
