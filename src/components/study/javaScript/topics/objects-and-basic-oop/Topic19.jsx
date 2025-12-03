import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic19 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          Deep copy: structuredClone() and JSON technique
        </h2>

        <p>
          In JavaScript, objects are assigned and copied by <strong>reference</strong>.
          This means when you copy an object using <code>=</code> or a shallow
          copy method (spread operator <code>{`{...obj}`}</code>,
          <code>Object.assign()</code>, etc.), the nested objects are still
          shared between copies. Therefore, modifying one affects the other.
        </p>

        <p>
          A <strong>deep copy</strong> creates a completely independent clone of
          the object and all its nested structures. This ensures that modifying
          the clone does NOT affect the original.
        </p>

        <h3 className="text-lg font-semibold">📌 Why Deep Copy is Needed</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>To avoid accidental mutations caused by reference sharing</li>
          <li>To safely process API responses without modifying originals</li>
          <li>To work with immutable patterns in React/Redux</li>
          <li>To clone state objects before updating</li>
        </ul>

        <h3 className="text-lg font-semibold">📌 Methods for Deep Copy</h3>
        <p>There are two common approaches:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>structuredClone()</strong> — A modern, built-in browser API
            that performs a true deep clone for most data types.
          </li>
          <li>
            <strong>JSON.parse(JSON.stringify(...))</strong> — An older but
            widely used trick that works for simple objects but has limitations.
          </li>
        </ul>

        <hr className="border-slate-700" />

        {/* ------------------------------------------------------ */}
        {/* Example 1 */}
        {/* ------------------------------------------------------ */}

        <h3 className="text-lg font-semibold">
          1️⃣ Deep Copy using <code>structuredClone()</code>
        </h3>

        <p>
          <code>structuredClone()</code> is the most reliable and modern technique.
          It supports:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Objects</li>
          <li>Arrays</li>
          <li>Nested objects</li>
          <li>Dates</li>
          <li>Maps, Sets</li>
          <li>Typed arrays</li>
          <li>Many complex structures</li>
        </ul>

        <p className="mt-2">
          It <strong>does not copy functions</strong> or class instances, but
          for most data it is 100% accurate.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Deep copy using structuredClone (modern browsers)
const batch = {
  name: "Full Stack",
  mentor: { name: "Sukanta Hui", subject: "MERN" },
};

const deepCopy = structuredClone(batch); // deep copy

deepCopy.mentor.subject = "Java + Spring";

console.log("Original:", batch);
console.log("Deep copy:", deepCopy);`}
        />

        <hr className="border-slate-700" />

        {/* ------------------------------------------------------ */}
        {/* Example 2 */}
        {/* ------------------------------------------------------ */}

        <h3 className="text-lg font-semibold">
          2️⃣ Deep Copy using <code>JSON.parse(JSON.stringify())</code>
        </h3>

        <p>This method:</p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Converts the object into a JSON string</li>
          <li>Then parses the string back into a new object</li>
          <li>Removes all references to the original object</li>
        </ul>

        <p>
          It works well for simple objects containing only:
          <strong>strings, numbers, booleans, arrays, and plain objects</strong>.
        </p>

        <p>
          But it <strong>fails for</strong>: Dates, functions, undefined,
          Infinity, Maps, Sets, DOM nodes, and circular structures.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Deep copy using JSON.parse(JSON.stringify(...))
const student = {
  name: "Devangshu",
  skills: ["HTML", "CSS", "JavaScript"],
  address: {
    city: "Barrackpore",
    state: "West Bengal",
  },
};

const deepCopyStudent = JSON.parse(JSON.stringify(student));

deepCopyStudent.address.city = "Kolkata";
deepCopyStudent.skills.push("React");

console.log("Original:", student);
console.log("Deep copy:", deepCopyStudent);`}
        />

        <hr className="border-slate-700" />

        {/* ------------------------------------------------------ */}
        {/* Example 3 */}
        {/* ------------------------------------------------------ */}

        <h3 className="text-lg font-semibold">3️⃣ Limitations of JSON Technique</h3>

        <p>
          The JSON method cannot handle many JavaScript data types. Below are
          common examples:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Date objects</strong> become strings</li>
          <li><strong>Functions</strong> are removed</li>
          <li><strong>undefined</strong> is removed</li>
          <li><strong>Infinity / NaN</strong> become <code>null</code></li>
          <li><strong>Maps, Sets</strong> are lost</li>
          <li>It cannot clone <strong>circular references</strong></li>
        </ul>

        <p className="mt-2">
          Because of these issues, <strong>structuredClone()</strong> is generally
          preferred when available.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Limitations of JSON technique
const data = {
  name: "Ritaja",
  joinedOn: new Date(),
  greet: function () {
    console.log("Hi!");
  },
};

const cloned = JSON.parse(JSON.stringify(data));

console.log("Original date:", data.joinedOn instanceof Date); // true
console.log("Cloned date:", cloned.joinedOn instanceof Date);  // false (string)
console.log("Original has greet:", typeof data.greet);         // function
console.log("Cloned has greet:", typeof cloned.greet);         // undefined`}
        />

        <hr className="border-slate-700" />

        <h3 className="text-lg font-semibold">📌 Summary</h3>

        <ul className="list-disc pl-6 space-y-1">
          <li>
            Use <strong>structuredClone()</strong> for modern, safe deep copy.
          </li>
          <li>
            Use <strong>JSON.parse(JSON.stringify())</strong> only for simple
            object structures.
          </li>
          <li>
            Never use shallow copy when nested objects exist — changes will leak
            into the original due to reference sharing.
          </li>
        </ul>
      </div>
    );
  }
}
