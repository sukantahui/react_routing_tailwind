import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Iterating Arrays — for, for...of & forEach()
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-sm leading-relaxed">
          Looping through arrays is one of the most important concepts in JavaScript.
          There are multiple ways to iterate over lists—each useful in different
          situations. Below we explore the three most common ways with full syntax,
          explanation, and examples.
        </p>

        <hr className="border-slate-700" />

        {/* ============================================================
            1) FOR LOOP
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">1. Classic for Loop</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          The <code>for</code> loop is the oldest and most flexible loop.
          You manually control:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>starting point</li>
          <li>ending condition</li>
          <li>increment/decrement</li>
        </ul>

        {/* Syntax */}
        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300 leading-relaxed">
          <strong>Syntax:</strong><br />
          <code>
            for (initialization; condition; update) {"{"} <br />
            &nbsp;&nbsp; // code <br />
            {"}"}
          </code>
          <br /><br />
          <strong>Return Type:</strong> No return value.  
          The loop simply runs the statements.
        </div>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`const nums = [10, 20, 30];

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}`}
        />

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Sum of elements
const marks = [80, 90, 95];
let total = 0;

for (let i = 0; i < marks.length; i++) {
  total += marks[i];
}

console.log("Total:", total); // 265`}
        />

        <hr className="border-slate-700" />

        {/* ============================================================
            2) FOR...OF LOOP
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">2. for...of Loop</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>for...of</code> is a modern loop that directly gives you **each value**
          from an iterable like an array.  
          This makes it cleaner and easier to read than a classic <code>for</code> loop.
        </p>

        {/* Syntax */}
        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300 leading-relaxed">
          <strong>Syntax:</strong><br />
          <code>
            for (let value of array) {"{"} <br />
            &nbsp;&nbsp; // code using value <br />
            {"}"}
          </code>
          <br /><br />
          <strong>Return Type:</strong> No return value.
        </div>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`const nums = [10, 20, 30];

for (let value of nums) {
  console.log(value);
}`}
        />

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Names of students
const students = ["Ritaja", "Susmita", "Pranjali"];

for (let name of students) {
  console.log("Student:", name);
}`}
        />

        <hr className="border-slate-700" />

        {/* ============================================================
            3) forEach()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">3. forEach()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>forEach()</code> is a higher-order function that takes a callback.
          It executes the callback once for each element.
        </p>

        {/* Syntax */}
        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300 leading-relaxed">
          <strong>Syntax:</strong><br />
          <code>
            array.forEach(function(value, index, array) {"{"} <br />
            &nbsp;&nbsp; // code <br />
            {"}"});
          </code>
          <br /><br />
          <strong>Return Type:</strong> <code>undefined</code> (always).  
          It does **not** return a new array.
        </div>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`const nums = [10, 20, 30];

nums.forEach(n => console.log(n));`}
        />

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Access index also
const courses = ["JavaScript", "Python", "C"];

courses.forEach((course, index) => {
  console.log(index, course);
});`}
        />

        {/* Example 3 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Realistic use — Print marksheet
const report = [
  { name: "Devangshu", marks: 91 },
  { name: "Kaustav", marks: 88 },
  { name: "Mounita", marks: 95 },
];

report.forEach((item) => {
  console.log(\`\${item.name} scored \${item.marks}\`);
});`}
        />

        <hr className="border-slate-700" />

        {/* BONUS SECTION */}
        <h3 className="text-lg text-slate-200 font-semibold">
          When should you use each loop?
        </h3>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-2">
          <li>
            <strong>for loop →</strong> full control (start, end, increment)
          </li>
          <li>
            <strong>for...of →</strong> cleanest way to loop values
          </li>
          <li>
            <strong>forEach →</strong> best for array-only operations & callback style
          </li>
        </ul>

        <hr className="border-slate-700" />

        {/* SUMMARY */}
        <p className="text-slate-400 text-sm">
          Iterating arrays is the foundation for all data-processing tasks in JavaScript.
          Choosing the right loop makes your code readable, efficient, and professional.
        </p>

      </div>
    );
  }
}
