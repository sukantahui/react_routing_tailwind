import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* --------------------------------------------------------
            Title
        -------------------------------------------------------- */}
        <h2 className="text-xl font-semibold text-sky-300">
          Destructuring in JavaScript (Arrays & Objects) — ES6 Feature
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Destructuring is an elegant ES6 feature that lets you extract values
          from arrays or properties from objects in a clean, readable way.  
          This technique is essential in all modern JavaScript codebases, including
          projects taught at <strong>Coder & AccoTax, Barrackpore</strong>.
        </p>


        {/* --------------------------------------------------------
            1. Array Destructuring (Basic)
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Array Destructuring (Basic)
        </h3>

        <CodeBlock
          language="javascript"
          code={`const students = ["Ritaja", "Mounita", "Swadeep"];

const [first, second, third] = students;

console.log(first);  // Ritaja
console.log(second); // Mounita
console.log(third);  // Swadeep`}
        />

        <p className="text-slate-400 text-sm">
          The variables receive values based on position.
        </p>


        {/* --------------------------------------------------------
            2. Skip Values in Array Destructuring
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Skipping Values During Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const marks = [88, 92, 95, 90];

const [english, , math] = marks;

console.log(english); // 88
console.log(math);    // 95`}
        />


        {/* --------------------------------------------------------
            3. Default Values
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Default Values in Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const scores = [85];

const [science, history = 75] = scores;

console.log(science); // 85
console.log(history); // 75 (default value)`}
        />


        {/* --------------------------------------------------------
            4. Object Destructuring Basics
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Object Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const student = {
  name: "Devangshu",
  age: 17,
  course: "JavaScript"
};

const { name, age, course } = student;

console.log(name);   // Devangshu
console.log(age);    // 17
console.log(course); // JavaScript`}
        />

        <p className="text-slate-400 text-sm">
          Here, variable names must match object keys.
        </p>


        {/* --------------------------------------------------------
            5. Object Destructuring with Renaming
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Renaming Variables While Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const teacher = {
  fullName: "Sukanta Hui",
  subject: "JavaScript",
  centre: "Coder & AccoTax"
};

const { fullName: instructor, subject: topic } = teacher;

console.log(instructor); // Sukanta Hui
console.log(topic);      // JavaScript`}
        />


        {/* --------------------------------------------------------
            6. Default Values in Object Destructuring
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          6. Default Values for Missing Keys
        </h3>

        <CodeBlock
          language="javascript"
          code={`const profile = {
  name: "Susmita"
};

const { name, email = "not provided" } = profile;

console.log(name);  // Susmita
console.log(email); // not provided`}
        />


        {/* --------------------------------------------------------
            7. Nested Object Destructuring
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          7. Nested Object Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const registration = {
  student: {
    name: "Kaustav",
    address: {
      city: "Barrackpore",
      pin: 700120
    }
  }
};

const {
  student: {
    name: stuName,
    address: { city, pin }
  }
} = registration;

console.log(stuName); // Kaustav
console.log(city);    // Barrackpore
console.log(pin);     // 700120`}
        />


        {/* --------------------------------------------------------
            8. Destructuring in Functions
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          8. Destructuring in Function Parameters
        </h3>

        <CodeBlock
          language="javascript"
          code={`function greet({ name, course }) {
  console.log(\`Welcome \${name} to \${course}!\`);
}

greet({ name: "Pranjali", course: "JavaScript ES6" });
// Welcome Pranjali to JavaScript ES6!`}
        />


        {/* --------------------------------------------------------
            9. Mixing Array + Object Destructuring
        -------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          9. Combining Array and Object Destructuring
        </h3>

        <CodeBlock
          language="javascript"
          code={`const data = [
  { name: "Ritaja", score: 91 },
  { name: "Mounita", score: 94 }
];

const [{ name: s1, score: sc1 }, { name: s2, score: sc2 }] = data;

console.log(s1, sc1); // Ritaja 91
console.log(s2, sc2); // Mounita 94`}
        />


        {/* --------------------------------------------------------
            Summary Box
        -------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Destructuring extracts values from arrays & objects easily</li>
            <li>Array destructuring is position-based</li>
            <li>Object destructuring is key-based</li>
            <li>Supports renaming, default values & nested patterns</li>
            <li>Used everywhere in modern JavaScript</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            Mastering destructuring is essential for writing clean, modern JavaScript in professional projects.
          </p>
        </section>

      </div>
    );
  }
}
