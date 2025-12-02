import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-sky-300">
        Nested Objects & Arrays of Objects
      </h2>

      <p className="text-slate-300 text-sm">
        Objects can contain more objects inside them.  
        This helps model real-world structured data — such as storing complete student info at Coder & AccoTax, Barrackpore.
      </p>

      {/* Nested Object Example */}
      <h3 className="text-lg font-semibold text-slate-200">Nested Object</h3>

      <CodeBlock
        code={`const student = {
  name: "Susmita",
  course: "JavaScript",
  address: {
    city: "Barrackpore",
    pin: 700120
  },
  marks: {
    js: 92,
    python: 88
  }
};

console.log(student.address.city); // Barrackpore
console.log(student.marks.js);     // 92`}
        language="javascript"
      />

      {/* Arrays of Objects */}
      <h3 className="text-lg font-semibold text-slate-200">
        Array of Objects
      </h3>

      <CodeBlock
        code={`const students = [
  { name: "Ritaja", score: 91 },
  { name: "Mounita", score: 89 },
  { name: "Kaustav", score: 86 }
];

console.log(students[0].name);    // Ritaja
console.log(students[2].score);   // 86`}
        language="javascript"
      />

      {/* Classroom List Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Realistic Classroom Example — Coder & AccoTax
      </h3>

      <CodeBlock
        code={`const batch = {
  batchName: "JS Evening Batch",
  teacher: {
    name: "Sukanta Hui",
    experience: 15
  },
  students: [
    { name: "Devangshu", attendance: 95 },
    { name: "Pranjali", attendance: 98 },
    { name: "Swadeep", attendance: 92 }
  ]
};

console.log(batch.teacher.name);             // Sukanta Hui
console.log(batch.students[1].name);         // Pranjali
console.log(batch.students[2].attendance);   // 92`}
        language="javascript"
      />

      {/* Deep Nested Example */}
      <h3 className="text-lg font-semibold text-slate-200">
        Deeply Nested Example
      </h3>

      <CodeBlock
        code={`const institute = {
  name: "Coder & AccoTax",
  location: "Barrackpore",
  departments: {
    programming: {
      teachers: [
        { name: "Chandan Das", subject: "C Programming" },
        { name: "Ritaja Ghosh", subject: "Python" }
      ],
      labs: ["Lab-1", "Lab-2"]
    },
    accounts: {
      teachers: [
        { name: "Tanusree Hui", subject: "Tally Prime" },
        { name: "Mounita Bhandari", subject: "GST Filing" }
      ]
    }
  }
};

console.log(institute.departments.programming.teachers[0].name);  
// Chandan Das

console.log(institute.departments.accounts.teachers[1].subject);
// GST Filing`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Nested objects and arrays help structure complex data in a readable and organised way — essential for modern JavaScript development.
      </p>

    </div>
  );
}
