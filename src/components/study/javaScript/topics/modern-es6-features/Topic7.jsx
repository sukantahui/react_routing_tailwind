import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic7 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* --------------------------------------------------------
            TITLE
        -------------------------------------------------------- */}
        <h2 className="text-xl font-semibold text-sky-300">
          Rest Parameters (...args)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Rest parameters allow a function to accept an unlimited number of arguments
          as an array. It replaces the old <code>arguments</code> object and gives
          developers a clean, modern approach to variable-length parameters.
          This feature is extremely useful in real-world JavaScript projects taught at{" "}
          <strong>Coder & AccoTax, Barrackpore</strong>.
        </p>


        {/* --------------------------------------------------------
            1. BASIC REST PARAMETER USAGE
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Basic Example
        </h3>

        <CodeBlock
          language="javascript"
          code={`function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(10, 20));         // 30
console.log(sum(5, 10, 15, 20));  // 50
console.log(sum());               // 0`}
        />

        <p className="text-slate-400 text-sm">
          The <code>...numbers</code> collects all arguments into an array.
        </p>


        {/* --------------------------------------------------------
            2. REST MUST BE THE LAST PARAM
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Rest Parameter Must Come Last
        </h3>

        <CodeBlock
          language="javascript"
          code={`function register(course, teacher, ...students) {
  console.log("Course:", course);
  console.log("Teacher:", teacher);
  console.log("Students:", students);
}

register(
  "JavaScript Advanced",
  "Sukanta Hui",
  "Ritaja",
  "Mounita",
  "Swadeep"
);

/*
Course: JavaScript Advanced
Teacher: Sukanta Hui
Students: ["Ritaja", "Mounita", "Swadeep"]
*/`}
        />


        {/* --------------------------------------------------------
            3. USING REST PARAMETERS IN ARRAY UTILITY FUNCTIONS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Practical Example — Calculate Average Marks
        </h3>

        <CodeBlock
          language="javascript"
          code={`function average(...marks) {
  if (marks.length === 0) return 0;
  return marks.reduce((a, b) => a + b, 0) / marks.length;
}

console.log(average(88, 92, 95)); // 91.66
console.log(average(70));         // 70
console.log(average());           // 0`}
        />

        <p className="text-slate-400 text-sm">
          Great for student scoring systems used in classes.
        </p>


        {/* --------------------------------------------------------
            4. REST PARAM WITH DESTRUCTURING
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Rest Parameter with Array Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const students = ["Kaustav", "Susmita", "Devangshu", "Pranjali"];

const [leader, assistant, ...others] = students;

console.log(leader);    // "Kaustav"
console.log(assistant); // "Susmita"
console.log(others);    // ["Devangshu", "Pranjali"]`}
        />


        {/* --------------------------------------------------------
            5. REST PARAM WITH OBJECTS (useful pattern)
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Rest with Objects (ES6+)
        </h3>

        <CodeBlock
          language="javascript"
          code={`const studentProfile = {
  name: "Ritaja",
  batch: "JS-2025",
  city: "Barrackpore",
  centre: "Coder & AccoTax",
  marks: 92
};

const { name, batch, ...otherDetails } = studentProfile;

console.log(name);          // "Ritaja"
console.log(batch);         // "JS-2025"
console.log(otherDetails);  // { city: "Barrackpore", centre: "Coder & AccoTax", marks: 92 }`}
        />

        <p className="text-slate-400 text-sm">
          Handy when working with filtered API data.
        </p>


        {/* --------------------------------------------------------
            6. REAL-WORLD SCENARIO — ATTENDANCE MANAGER
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          6. Real-World Example — Attendance Manager (Coder & AccoTax)
        </h3>

        <CodeBlock
          language="javascript"
          code={`function markAttendance(teacher, ...students) {
  console.log(\`Attendance taken by: \${teacher}\`);
  console.log("Present students:", students);
}

markAttendance(
  "Tanusree Hui",
  "Ritaja",
  "Kaustav",
  "Susmita",
  "Devangshu"
);

/*
Attendance taken by: Tanusree Hui
Present students: ["Ritaja", "Kaustav", "Susmita", "Devangshu"]
*/`}
        />


        {/* --------------------------------------------------------
            SUMMARY
        -------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><code>...args</code> groups multiple arguments into an array</li>
            <li>Rest must always be the last parameter</li>
            <li>Useful for utility functions (sum, average, filter)</li>
            <li>Works with arrays and object destructuring</li>
            <li>Perfect for team lists, attendance, scoring systems</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            Rest parameters make JavaScript functions flexible, powerful, and easy to reuse.
          </p>
        </section>

      </div>
    );
  }
}
