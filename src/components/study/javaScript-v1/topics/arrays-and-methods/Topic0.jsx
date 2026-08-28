import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import { ArrowUpRight } from "lucide-react";
import Whiteboard from "../../../../../common/Whiteboard";
export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Creating Arrays, Indexing & Length
        </h2>

        {/* Introduction */}
        <p className="text-slate-300 text-sm leading-relaxed">
          Arrays in JavaScript are ordered collections of values. They can store
          numbers, strings, booleans, objects, or even other arrays. Arrays are
          one of the most frequently used data structures in programming—ideal
          for storing lists like student names, marks, or cities.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          JavaScript arrays are <strong>dynamic</strong> (size can grow or shrink),
          <strong> zero-indexed</strong> (first element at index 0),
          and can store <strong>mixed data types</strong>.
        </p>

        <hr className="border-slate-700" />

        {/* Creating Arrays */}
        <h3 className="text-lg text-slate-200 font-semibold">Creating Arrays</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          An array can be created using square brackets <code>[ ]</code>.
          The values inside are separated by commas.
        </p>
        <a
          href="/play"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 flex items-center gap-2 font-semibold hover:text-sky-300 transition"
        >
          Try your code in Playground
          <ArrowUpRight size={18} />
        </a>
        <EditableCodeBlock
          language="javascript"
          initialCode={
            `const students = ["Sukanta Hui", "Rahul", "Amit"];
const marks = [85, 90, 95];
const mixed = ["Coder & AccoTax", 1977, true];
console.log(students);
console.log(marks);
console.log(mixed);`
          }
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Arrays can contain different types of values—but in real projects,
          keeping data consistent is usually better.
        </p>

        <hr className="border-slate-700" />

        {/* Indexing */}
        <h3 className="text-lg text-slate-200 font-semibold">Indexing</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          JavaScript arrays are <strong>zero-indexed</strong>, meaning:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li><code>index 0</code> → first element</li>
          <li><code>index 1</code> → second element</li>
          <li><code>index 2</code> → third element</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const cities = ["Barrackpore", "Kolkata", "Delhi"];

console.log(cities[0]); // Barrackpore
console.log(cities[1]); // Kolkata
console.log(cities[2]); // Delhi`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          If you access an index that does not exist, JavaScript returns{" "}
          <code>undefined</code>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const items = ["A", "B", "C"];
console.log(items[5]); // undefined`}
        />

        <hr className="border-slate-700" />

        {/* Length Property */}
        <h3 className="text-lg text-slate-200 font-semibold">Length Property</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          The <code>.length</code> property shows how many elements are in an array.
          It updates automatically when values are added or removed.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`const nums = [10, 20, 30, 40];

console.log(nums.length); // 4

nums.push(50);
console.log(nums.length); // 5

nums.pop();
console.log(nums.length); // 4`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          The <code>length</code> property is commonly used in loops, validations,
          and dynamic UI rendering in React.
        </p>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm">
          Arrays form the foundation of most JavaScript programs. Mastering
          creation, indexing, and the <code>.length</code> property prepares you
          for working with loops, array methods (map, filter, reduce), and
          real-world data operations.
        </p>
        my whiteboard
        <Whiteboard/>
      </div>
    );
  }
}
