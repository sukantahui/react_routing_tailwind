import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* --------------------------------------------------------
            TITLE
        -------------------------------------------------------- */}
        <h2 className="text-xl font-semibold text-sky-300">
          Default Parameters in JavaScript (ES6)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Default parameters allow functions to assign values to parameters if no
          value is passed — making your code more reliable, clean, and easy to
          work with. This feature is heavily used in modern JavaScript applications,
          including projects at <strong>Coder & AccoTax, Barrackpore</strong>.
        </p>


        {/* --------------------------------------------------------
            1. BASIC DEFAULT PARAMETERS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Basic Example
        </h3>

        <CodeBlock
          language="javascript"
          code={`function greet(name = "Student") {
  console.log(\`Hello, \${name}!\`);
}

greet("Ritaja"); // Hello, Ritaja!
greet();         // Hello, Student!`}
        />

        <p className="text-slate-400 text-sm">
          The default value is used only when no argument is provided.
        </p>


        {/* --------------------------------------------------------
            2. MULTIPLE DEFAULT PARAMETERS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Multiple Default Parameters
        </h3>

        <CodeBlock
          language="javascript"
          code={`function registerStudent(
  name = "Unknown",
  course = "JavaScript Basics",
  centre = "Coder & AccoTax"
) {
  console.log(\`\${name} enrolled in \${course} at \${centre}\`);
}

registerStudent("Kaustav", "Advanced JS");
// Kaustav enrolled in Advanced JS at Coder & AccoTax

registerStudent();
// Unknown enrolled in JavaScript Basics at Coder & AccoTax`}
        />


        {/* --------------------------------------------------------
            3. DEFAULT VALUES USING EXPRESSIONS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Default Values Can Be Expressions
        </h3>

        <CodeBlock
          language="javascript"
          code={`function generateID(name = "student") {
  return name.toLowerCase().replaceAll(" ", "_") + "_" + Date.now();
}

console.log(generateID("Susmita"));
console.log(generateID());`}
        />

        <p className="text-slate-400 text-sm">
          The default value can even call another function.
        </p>


        {/* --------------------------------------------------------
            4. DEFAULT PARAMETER WITH OBJECTS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Default Parameters in Object Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`function showProfile({
  name = "Student",
  batch = "Not Assigned",
  teacher = "Sukanta Hui"
} = {}) {
  console.log(\`\${name} — Batch: \${batch}, Teacher: \${teacher}\`);
}

showProfile({
  name: "Swadeep",
  batch: "JS-2025"
});

// Default fallback
showProfile();`}
        />

        <p className="text-slate-400 text-sm">
          Powerful when working with API responses or optional form data.
        </p>


        {/* --------------------------------------------------------
            5. DEFAULT WITH ARRAYS
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Default Parameters with Arrays
        </h3>

        <CodeBlock
          language="javascript"
          code={`function printTopStudent([name = "No Student"] = []) {
  console.log("Top Performer:", name);
}

printTopStudent(["Pranjali"]);
printTopStudent();`}
        />


        {/* --------------------------------------------------------
            6. REAL-WORLD EXAMPLE — CLASSROOM SYSTEM
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          6. Real-World Example — Attendance System
        </h3>

        <CodeBlock
          language="javascript"
          code={`function markAttendance(name = "Guest Student", status = "Present") {
  console.log(\`\${name} marked as \${status}.\`);
}

markAttendance("Devangshu", "Late");
markAttendance("Mounita");
markAttendance();`}
        />


        {/* --------------------------------------------------------
            SUMMARY
        -------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Default parameters prevent <code>undefined</code> errors</li>
            <li>They make functions more flexible and user-friendly</li>
            <li>Useful with function overloading-like patterns</li>
            <li>Perfect for object destructuring and API data</li>
            <li>Default values can be variables, expressions, or functions</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            Default parameters are essential in clean, modern JavaScript applications.
          </p>
        </section>

      </div>
    );
  }
}
