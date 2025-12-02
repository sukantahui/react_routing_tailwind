import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-sky-300">
        Object Literals — Keys, Values & Methods
      </h2>

      <p className="text-slate-300 text-sm">
        Objects in JavaScript are collections of key–value pairs.  
        They allow you to store related data together, just like a student
        or teacher profile at Coder & AccoTax, Barrackpore.
      </p>

      {/* Basic Example */}
      <h3 className="text-lg font-semibold text-slate-200">Basic Object</h3>
      <CodeBlock
        code={`const student = {
  name: "Ritaja",
  course: "JavaScript",
  batch: "Morning",
  score: 92
};

console.log(student.name);
console.log(student.score);`}
        language="javascript"
      />

      {/* Methods Example */}
      <h3 className="text-lg font-semibold text-slate-200">Object With Method</h3>
      <CodeBlock
        code={`const teacher = {
  name: "Sukanta Hui",
  subject: "JavaScript",
  institute: "Coder & AccoTax",
  
  introduce() {
    console.log(\`Hello, I am \${this.name}, teaching \${this.subject}.\`);
  }
};

teacher.introduce();`}
        language="javascript"
      />

      {/* Realistic Example */}
      <h3 className="text-lg font-semibold text-slate-200">Realistic Classroom Example</h3>
      <CodeBlock
        code={`const studentProfile = {
  name: "Devangshu",
  city: "Barrackpore",
  enrolled: true,
  courses: ["JavaScript", "Python", "C"],
  marks: {
    js: 89,
    python: 92,
    c: 85
  },
  
  showReport() {
    console.log(\`\${this.name}'s JS score: \${this.marks.js}\`);
  }
};

studentProfile.showReport();`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Objects allow data and functions to live together — a key concept
        before learning OOP in JavaScript.
      </p>

    </div>
  );
}
