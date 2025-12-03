import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Object Literals — Keys, Values & Methods
        </h2>

        {/* INTRO THEORY */}
        <p className="text-slate-300 text-sm leading-relaxed">
          In JavaScript, an <strong>object</strong> is a collection of key–value
          pairs. Each key is also known as a <strong>property</strong>, and the
          associated value can be anything — a string, number, array, another
          object, or even a function.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          Object literals use a simple syntax with curly braces{" "}
          <code>{`{}`}</code>. They form the foundation of JavaScript programming
          and are used everywhere — storing user details, settings, course info,
          API data, and more.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          At <strong>Coder &amp; AccoTax, Barrackpore</strong>, objects can
          represent entities like students, teachers, batches, or classroom data.
        </p>

        <hr className="border-slate-700" />

        {/* Basic Object */}
        <h3 className="text-lg font-semibold text-slate-200">Basic Object</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          This example shows a simple student profile stored as an object.
          Each key stores one piece of information about the student.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const student = {
  name: "Ritaja",
  course: "JavaScript",
  batch: "Morning",
  score: 92
};

console.log(student.name);
console.log(student.score);`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Notice how we access values using dot notation like{" "}
          <code>student.name</code> and <code>student.score</code>.
        </p>

        <hr className="border-slate-700" />

        {/* Methods Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          Object With Method
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          A method is simply a function defined inside an object. You can use
          methods to perform operations using the object’s own data, accessed
          through <code>this</code>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const teacher = {
  name: "Sukanta Hui",
  subject: "JavaScript",
  institute: "Coder & AccoTax",

  introduce() {
    console.log(\`Hello, I am \${this.name}, teaching \${this.subject}.\`);
  }
};

teacher.introduce();`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Inside the <code>introduce()</code> method,{" "}
          <code>this.name</code> refers to the <strong>teacher</strong> object
          itself.
        </p>

        <hr className="border-slate-700" />

        {/* Realistic Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          Realistic Classroom Example
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Objects can also contain nested data structures like arrays and other
          objects. This allows us to build complex models such as full student
          profiles.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const studentProfile = {
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
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Here, <strong>studentProfile</strong> contains:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>A string (<code>name</code>)</li>
          <li>A boolean (<code>enrolled</code>)</li>
          <li>An array (<code>courses</code>)</li>
          <li>A nested object (<code>marks</code>)</li>
          <li>A method (<code>showReport()</code>)</li>
        </ul>

        <p className="text-slate-300 text-sm leading-relaxed">
          This shows how flexible and powerful JavaScript objects can be.
        </p>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm">
          Objects allow you to organize related data and functionality together —
          a major concept before learning about classes, prototypes, and full OOP
          in JavaScript.
        </p>
      </div>
    );
  }
}
