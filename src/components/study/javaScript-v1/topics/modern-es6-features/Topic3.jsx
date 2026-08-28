import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* --------------------------------------------------------
            TITLE
        -------------------------------------------------------- */}
        <h2 className="text-xl font-semibold text-sky-300">
          Spread & Rest Operators (...) — ES6 Feature
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          The <strong>spread</strong> and <strong>rest</strong> operators are among the most
          powerful ES6 features.  
          They simplify array/object handling, function arguments, and data merging —
          extremely useful in real-world JavaScript taught at <strong>Coder & AccoTax, Barrackpore</strong>.
        </p>

        {/* --------------------------------------------------------
            1. SPREAD — EXPANDING arrays
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Spread Operator — Expanding Arrays
        </h3>

        <CodeBlock
          language="javascript"
          code={`const students1 = ["Ritaja", "Mounita"];
const students2 = ["Kaustav", "Swadeep"];

const allStudents = [...students1, ...students2];

console.log(allStudents);
// ["Ritaja", "Mounita", "Kaustav", "Swadeep"]`}
        />


        {/* --------------------------------------------------------
            2. COPY arrays using SPREAD
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Copy an Array (Shallow Copy) Using Spread
        </h3>

        <CodeBlock
          language="javascript"
          code={`const original = ["Devangshu", "Pranjali"];
const copy = [...original];

copy.push("Susmita");

console.log(original); // ["Devangshu", "Pranjali"]
console.log(copy);     // ["Devangshu", "Pranjali", "Susmita"]`}
        />

        <p className="text-slate-400 text-sm">
          Spread prevents accidental mutation of the original array.
        </p>


        {/* --------------------------------------------------------
            3. Spread with OBJECTS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Spread in Objects
        </h3>

        <CodeBlock
          language="javascript"
          code={`const teacher = {
  name: "Sukanta Hui",
  centre: "Coder & AccoTax",
};

const details = {
  subject: "JavaScript",
  city: "Barrackpore"
};

const profile = { ...teacher, ...details };

console.log(profile);
/*
{
  name: "Sukanta Hui",
  centre: "Coder & AccoTax",
  subject: "JavaScript",
  city: "Barrackpore"
}
*/`}
        />


        {/* --------------------------------------------------------
            4. REST — collecting multiple function args
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          4. Rest Operator — Collect Extra Function Arguments
        </h3>

        <CodeBlock
          language="javascript"
          code={`function addMarks(name, ...scores) {
  console.log(name, scores);
}

addMarks("Mounita", 88, 92, 95);
/*
"Mounita" [88, 92, 95]
*/`}
        />

        <p className="text-slate-400 text-sm">
          The function groups extra arguments into an array.
        </p>


        {/* --------------------------------------------------------
            5. REST in array destructuring
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Rest Operator in Array Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const marks = [90, 85, 92, 88];

const [first, ...remaining] = marks;

console.log(first);      // 90
console.log(remaining);  // [85, 92, 88]`}
        />


        {/* --------------------------------------------------------
            6. REST in object destructuring
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          6. Rest Operator in Object Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const student = {
  name: "Ritaja",
  age: 17,
  city: "Barrackpore",
  course: "ES6"
};

const { name, ...info } = student;

console.log(name); // "Ritaja"
console.log(info);
/*
{
  age: 17,
  city: "Barrackpore",
  course: "ES6"
}
*/`}
        />


        {/* --------------------------------------------------------
            7. Spread vs Rest — Key Difference
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          7. Spread vs Rest — The Difference
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          ✔ <strong>Spread</strong> — EXPANDS values  
          ✔ <strong>Rest</strong> — COLLECTS values  
        </p>

        <CodeBlock
          language="javascript"
          code={`const arr = [1, 2, 3];

// SPREAD EXPANDS
console.log(...arr);  // 1 2 3

// REST COLLECTS
const [a, ...b] = arr;
console.log(b);      // [2, 3]`}
        />


        {/* --------------------------------------------------------
            8. Combining REST & SPREAD in practical example
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          8. Practical Example — Student Ranking System
        </h3>

        <CodeBlock
          language="javascript"
          code={`const topScores = [98, 96, 94];
const newScores = [92, 91];

// merge score lists using SPREAD
const allScores = [...topScores, ...newScores];

console.log(allScores);
// [98, 96, 94, 92, 91]

// get topper + remaining using REST
const [topper, ...others] = allScores;

console.log(topper); // 98
console.log(others); // [96, 94, 92, 91]`}
        />


        {/* --------------------------------------------------------
            SUMMARY
        -------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Spread expands arrays/objects</li>
            <li>Rest collects leftover values</li>
            <li>Spread is used for merging & copying data</li>
            <li>Rest is used in functions and destructuring</li>
            <li>Both are essential in modern ES6+ JavaScript</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            Mastering spread + rest makes JavaScript code far cleaner and more efficient.
          </p>
        </section>

      </div>
    );
  }
}
