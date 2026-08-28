import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-sky-300">
        Dot Notation vs Bracket Notation
      </h2>

      <p className="text-slate-300 text-sm">
        JavaScript provides two ways to access object properties —
        <strong>dot notation</strong> and <strong>bracket notation</strong>.
        Both are important depending on the situation.
      </p>

      {/* Dot Notation */}
      <h3 className="text-lg font-semibold text-slate-200">
        Dot Notation (Most Common)
      </h3>
      <CodeBlock
        code={`const student = {
  name: "Mounita",
  course: "JavaScript",
  batch: "Evening"
};

console.log(student.name);     // Mounita
console.log(student.course);   // JavaScript`}
        language="javascript"
      />

      {/* Bracket Notation */}
      <h3 className="text-lg font-semibold text-slate-200">
        Bracket Notation (For dynamic or spaced keys)
      </h3>
      <CodeBlock
        code={`const teacher = {
  "full name": "Tanusree Hui",
  subject: "JavaScript",
  experience: 12
};

console.log(teacher["full name"]);  // Tanusree Hui`}
        language="javascript"
      />

      {/* Dynamic Keys Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Example: Accessing Keys Dynamically
      </h3>
      <CodeBlock
        code={`const studentMarks = {
  Ritaja: 95,
  Swadeep: 88,
  Kaustav: 90
};

const name = "Ritaja";  
console.log(studentMarks[name]);  // 95`}
        language="javascript"
      />

      {/* Mixed Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Mixed Example — Real Use Case at Coder & AccoTax
      </h3>
      <CodeBlock
        code={`const report = {
  studentName: "Pranjali",
  "current module": "Objects & OOP",
  progress: "Excellent",
  teacher: "Chandan Das"
};

console.log(report.studentName);        // Dot notation
console.log(report["current module"]);  // Bracket notation`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Use dot notation when possible.  
        Use bracket notation when the key has spaces, special characters, or is dynamic.
      </p>

    </div>
  );
}
