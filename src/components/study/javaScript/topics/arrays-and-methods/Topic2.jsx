import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Non-Mutating Methods — slice() & concat()
        </h2>

        {/* Intro */}
        <p className="text-slate-300 text-sm leading-relaxed">
          Non-mutating methods return <strong>new arrays</strong> instead of
          modifying the original one. These methods are extremely important in
          modern JavaScript—especially in React and functional programming,
          where immutability helps keep data predictable.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          Below you will learn full syntax, return type, usage explanation, and
          multiple examples for both methods.
        </p>

        <hr className="border-slate-700" />

        {/* ============================================================
            SLICE()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">1. slice()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>slice()</code> returns a portion of an array without changing the original.
        </p>

        {/* Syntax Box */}
        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300 leading-relaxed">
          <strong>Syntax:</strong><br />
          <code>array.slice(start, end)</code>
          <br /><br />
          <strong>Parameters:</strong><br />
          • <code>start</code> → starting index (inclusive) <br />
          • <code>end</code> → ending index (exclusive)
          <br /><br />
          <strong>Return Type:</strong> A <strong>new array</strong> containing selected elements.
        </div>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Basic slice()
const numbers = [10, 20, 30, 40, 50];

const part = numbers.slice(1, 4);

console.log(part);       // [20, 30, 40]
console.log(numbers);    // original unchanged`}
        />

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Copy entire array
const names = ["Sukanta", "Ritaja", "Mounita"];

const copy = names.slice();
console.log(copy);       // ["Sukanta", "Ritaja", "Mounita"]`}
        />

        {/* Example 3 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: Negative index (count from end)
const nums = [100, 200, 300, 400, 500];

console.log(nums.slice(-3));     // [300, 400, 500]
console.log(nums.slice(-4, -1)); // [200, 300, 400]`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          Because <code>slice()</code> does not mutate the original array,
          it's perfect for pagination, partial lists, or creating safe copies.
        </p>

        <hr className="border-slate-700" />

        {/* ============================================================
            CONCAT()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">2. concat()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>concat()</code> merges two or more arrays and returns a new one.
        </p>

        {/* Syntax Box */}
        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300 leading-relaxed">
          <strong>Syntax:</strong><br />
          <code>array1.concat(array2, array3, ...)</code>
          <br /><br />
          <strong>Return Type:</strong> A <strong>new array</strong> containing all merged values.
        </div>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Basic merging
const a = [1, 2];
const b = [3, 4];

const combined = a.concat(b);

console.log(combined); // [1, 2, 3, 4]
console.log(a);        // unchanged
console.log(b);        // unchanged`}
        />

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 2: Multiple arrays
const x = [1];
const y = [2, 3];
const z = [4, 5];

const result = x.concat(y, z, [6, 7]);

console.log(result); // [1, 2, 3, 4, 5, 6, 7]`}
        />

        {/* Example 3 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 3: concat with mixed types
const data1 = ["Coder"];
const data2 = [1977, true, { city: "Barrackpore" }];

const finalData = data1.concat(data2);

console.log(finalData);
// ["Coder", 1977, true, { city: "Barrackpore" }]`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>concat()</code> is a clean alternative to using loops for merging
          lists, and it ensures your original arrays remain unchanged.
        </p>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm">
          Non-mutating methods like <code>slice()</code> and <code>concat()</code>
          help keep data immutable and predictable. Mastering them prepares you
          for advanced array operations and best practices used in React.
        </p>

      </div>
    );
  }
}
