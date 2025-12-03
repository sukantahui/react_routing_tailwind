import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-10">

      {/* TITLE + INTRO */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-sky-300">
          Higher-Order Array Methods — <span className="text-sky-100">map(), filter(), reduce()</span>
        </h2>

        <p className="text-slate-300 text-sm">
          In modern JavaScript, arrays are not just lists — they are powerful data pipelines.
          Methods like <code className="text-emerald-300">map()</code>,{" "}
          <code className="text-emerald-300">filter()</code>, and{" "}
          <code className="text-emerald-300">reduce()</code> let you transform and analyze data
          in a clean, expressive way. These are heavily used in frameworks like React, and
          in professional codebases like those we use at Coder &amp; AccoTax, Barrackpore.
        </p>

        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
          <p className="font-semibold text-sky-200">Why are they called “higher-order methods”?</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>They take a function as an argument (callback function).</li>
            <li>They often return a new array or a single value.</li>
            <li>They make code shorter, clearer, and easier to reason about.</li>
          </ul>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-sky-300">1. map() — Transform Every Element</h3>

        <p className="text-slate-300 text-sm">
          <code className="text-emerald-300">map()</code> creates a <b>new array</b> by applying a
          function to every element of the original array. The original array is not changed.
        </p>

        {/* Syntax stays as CodeBlock */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300">
          <p className="font-semibold text-sky-200 mb-1">Syntax</p>
          <CodeBlock
            code={`const newArray = oldArray.map((item, index, array) => {
  // return transformed value
});`}
            language="javascript"
          />
        </div>

        {/* Example 1 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 1 — Double each number
          </p>
          <EditableCodeBlock
            initialCode={`const nums = [1,2,3];
const doubled = nums.map(n => n*2);
console.log(doubled);`}
            language="javascript"
          />
        </div>

        {/* Example 2 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 2 — Using arrow function
          </p>
          <EditableCodeBlock
            initialCode={`const nums = [5, 10, 15];
const doubled = nums.map(n => n * 2);
console.log(doubled); // [10, 20, 30]`}
            language="javascript"
          />
        </div>

        {/* Example 3 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 3 — Extracting a single property from objects (student names)
          </p>
          <EditableCodeBlock
            initialCode={`const students = [
  { name: "Ritaja", marks: 88 },
  { name: "Mounita", marks: 92 },
  { name: "Devangshu", marks: 81 }
];
const names = students.map(s => s.name);
console.log(names); // ["Ritaja", "Mounita", "Devangshu"]`}
            language="javascript"
          />
        </div>

        {/* Example 4 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 4 — Creating a formatted label list
          </p>
          <EditableCodeBlock
            initialCode={`const students = [
  { name: "Pranjali", course: "JavaScript" },
  { name: "Susmita", course: "Python" },
  { name: "Kaustav", course: "Full Stack" }
];
const labels = students.map(s => s.name + " — " + s.course);
console.log(labels);
// ["Pranjali — JavaScript", "Susmita — Python", "Kaustav — Full Stack"]`}
            language="javascript"
          />
        </div>

        {/* Example 5 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 5 — Map to Boolean (pass / fail)
          </p>
          <EditableCodeBlock
            initialCode={`const marks = [35, 78, 90, 24];
const passStatus = marks.map(m => m >= 40);
console.log(passStatus); // [false, true, true, false]`}
            language="javascript"
          />
        </div>

        {/* Common mistakes stays unchanged */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
          <p className="font-semibold text-amber-300">Common mistakes with map()</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Forgetting to <b>return</b> from the callback.</li>
            <li>Using map() only for side-effects (use forEach instead).</li>
            <li>Expecting map() to modify the original array (it does not).</li>
          </ul>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-sky-300">2. filter() — Keep Only What Passes a Test</h3>

        <p className="text-slate-300 text-sm">
          <code className="text-emerald-300">filter()</code> creates a <b>new array</b> with elements
          that return true from the test function.
        </p>

        {/* Syntax stays static */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300">
          <p className="font-semibold text-sky-200 mb-1">Syntax</p>
          <CodeBlock
            code={`const filteredArray = oldArray.filter((item, index, array) => {
  return true; // keep item
});`}
            language="javascript"
          />
        </div>

        {/* Example 1 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 1 — Keep only even numbers</p>
          <EditableCodeBlock
            initialCode={`const nums = [1, 2, 3, 4, 5, 6];
const evenNums = nums.filter(n => n % 2 === 0);
console.log(evenNums); // [2, 4, 6]`}
            language="javascript"
          />
        </div>

        {/* Example 2 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 2 — Filter students who passed (marks ≥ 40)
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

        {/* Example 3 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 3 — Search based filtering</p>
          <EditableCodeBlock
            initialCode={`const courses = [
  "JavaScript Basics",
  "JavaScript Advanced",
  "Python for Data Analysis",
  "Tally with GST",
  "Full Stack Web Development"
];
const search = "JavaScript";
const jsCourses = courses.filter(c =>
  c.toLowerCase().includes(search.toLowerCase())
);

console.log(jsCourses);`}
            language="javascript"
          />
        </div>

        {/* Example 4 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 4 — Remove invalid values</p>
          <EditableCodeBlock
            initialCode={`const data = [10, null, 25, undefined, 0, NaN, 50];
const clean = data.filter(item => Number.isFinite(item));
console.log(clean);`}
            language="javascript"
          />
        </div>

      </section>

      {/* REDUCE SECTION */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-sky-300">3. reduce() — Turn an Array into a Single Value</h3>

        <p className="text-slate-300 text-sm">
          <code className="text-emerald-300">reduce()</code> accumulates all elements into one value.
        </p>

        {/* Syntax block — not editable */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300">
          <p className="font-semibold text-sky-200 mb-1">Syntax</p>
          <CodeBlock
            code={`const result = array.reduce((acc, curr) => {
  return acc;
}, initialValue);`}
            language="javascript"
          />
        </div>

        {/* Example 1 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 1 — Sum of numbers</p>
          <EditableCodeBlock
            initialCode={`const marks = [78, 85, 90];
const total = marks.reduce((acc, m) => acc + m, 0);
console.log(total);`}
            language="javascript"
          />
        </div>

        {/* Example 2 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 2 — Average marks</p>
          <EditableCodeBlock
            initialCode={`const marks = [78, 85, 90];
            const total = marks.reduce((acc, m) => acc + m, 0);
            const avg = total / marks.length;
            console.log(avg);`}
            language="javascript"
          />
        </div>

        {/* Example 3 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 3 — Count passed students</p>
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

        {/* Example 4 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 4 — Group pass / fail</p>
          <EditableCodeBlock
            initialCode={`const students = [
  { name: "Pranjali", marks: 91 },
  { name: "Devangshu", marks: 45 },
  { name: "Mounita", marks: 33 },
  { name: "Susmita", marks: 77 }
];

const grouped = students.reduce(
  (acc, s) => {
    const key = s.marks >= 40 ? "pass" : "fail";
    acc[key].push(s);
    return acc;
  },
  { pass: [], fail: [] }
);

console.log(grouped);`}
            language="javascript"
          />
        </div>

        {/* Example 5 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 5 — Frequency count</p>
          <EditableCodeBlock
            initialCode={`const marks = [80, 75, 80, 90, 75, 75];

const frequency = marks.reduce((acc, m) => {
  acc[m] = (acc[m] || 0) + 1;
  return acc;
}, {});

console.log(frequency);`}
            language="javascript"
          />
        </div>

      </section>

      {/* REMAINING SECTIONS UNCHANGED (teacher note, practice, daily-use methods, etc.) */}
      {/* ...rest of your file stays exactly the same... */}

    </div>
  );
}
