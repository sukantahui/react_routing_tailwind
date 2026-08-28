import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Mutating Methods — push(), pop(), shift(), unshift(), splice()
        </h2>

        {/* INTRO */}
        <p className="text-slate-300 text-sm leading-relaxed">
          Mutating methods modify the <strong>original array</strong>.  
          This means the same array in memory is changed, not a new one.
        </p>

        <p className="text-slate-300 text-sm leading-relaxed">
          Below you will see full syntax, explanation, return value, and
          multiple examples for each method.
        </p>

        <hr className="border-slate-700" />


        {/* ============================================================
            1) PUSH()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">1. push()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          <strong>Adds one or more elements at the end</strong> of the array.
        </p>

        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300">
          <strong>Syntax:</strong><br />
          <code>array.push(value1, value2, ...)</code><br />
          <strong>Returns:</strong> new <code>length</code> of the array.
        </div>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Basic push()
const nums = [1, 2, 3];
const result = nums.push(4);

console.log("Array:", nums);         // [1, 2, 3, 4]
console.log("Returned:", result);    // 4 (new length)


// Example 2: Adding multiple values
const students = ["Ritaja", "Devangshu"];
const newLen = students.push("Mounita", "Kaustav");

console.log(students);    // ["Ritaja", "Devangshu", "Mounita", "Kaustav"]
console.log(newLen);      // 4


// Example 3: push() with mixed values
const mixed = [];
mixed.push("Coder", 1977, true);

console.log(mixed);       // ["Coder", 1977, true]`}
        />


        <hr className="border-slate-700" />


        {/* ============================================================
            2) POP()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">2. pop()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          <strong>Removes and returns the last element</strong> of the array.
        </p>

        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300">
          <strong>Syntax:</strong> <code>array.pop()</code><br />
          <strong>Returns:</strong> removed element (or <code>undefined</code> if empty)
        </div>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Basic pop()
const nums = [10, 20, 30];
const removed = nums.pop();

console.log("Removed:", removed);   // 30
console.log("Array:", nums);        // [10, 20]


// Example 2: Pop from single-item array
const skills = ["JavaScript"];
console.log(skills.pop());   // "JavaScript"
console.log(skills);         // []


// Example 3: Popping from empty array
const empty = [];
console.log(empty.pop());    // undefined`}
        />


        <hr className="border-slate-700" />


        {/* ============================================================
            3) SHIFT()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">3. shift()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Removes and returns the <strong>first</strong> element.
        </p>

        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300">
          <strong>Syntax:</strong> <code>array.shift()</code><br />
          <strong>Returns:</strong> removed element.
        </div>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Basic shift()
const items = ["html", "css", "js"];
const first = items.shift();

console.log("Removed:", first);  // "html"
console.log(items);              // ["css", "js"]


// Example 2: Using shift() as queue
const queue = ["Task1", "Task2"];
console.log(queue.shift());     // "Task1"
console.log(queue.shift());     // "Task2"
console.log(queue.shift());     // undefined`}
        />


        <hr className="border-slate-700" />


        {/* ============================================================
            4) UNSHIFT()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">4. unshift()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Adds elements to the <strong>beginning</strong> of the array.
        </p>

        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300">
          <strong>Syntax:</strong><br />
          <code>array.unshift(value1, value2, ...)</code><br />
          <strong>Returns:</strong> new array length
        </div>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Adding at start
const tech = ["Python", "Java"];
const newLength = tech.unshift("JavaScript");

console.log(tech);        // ["JavaScript", "Python", "Java"]
console.log(newLength);   // 3


// Example 2: Multiple values
const arr = [3, 4];
arr.unshift(1, 2);

console.log(arr);         // [1, 2, 3, 4]`}
        />


        <hr className="border-slate-700" />


        {/* ============================================================
            5) SPLICE()
        ============================================================ */}
        <h3 className="text-lg text-slate-200 font-semibold">5. splice()</h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          <strong>Most powerful mutating method.</strong>  
          Removes, inserts, or replaces elements.
        </p>

        <div className="bg-slate-800 border border-slate-700 p-3 rounded text-xs text-sky-300">
          <strong>Syntax:</strong><br />
          <code>array.splice(start, deleteCount, item1, item2, ...)</code>
          <br />
          <strong>Returns:</strong> array of removed items
        </div>

        <EditableCodeBlock
          language="javascript"
          initialCode={`// Example 1: Remove items
const fruits = ["apple", "banana", "mango"];
const removed = fruits.splice(1, 1);

console.log("Removed:", removed);   // ["banana"]
console.log(fruits);                // ["apple", "mango"]


// Example 2: Insert items (no removal)
const colors = ["red", "blue"];
colors.splice(1, 0, "green", "yellow");

console.log(colors);  // ["red", "green", "yellow", "blue"]


// Example 3: Replace items
const nums = [100, 200, 300, 400];
const oldValues = nums.splice(1, 2, 20, 30, 40);

console.log("Replaced:", oldValues); // [200, 300]
console.log(nums);                   // [100, 20, 30, 40, 400]`}
        />

        <p className="text-slate-300 text-sm leading-relaxed">
          <code>splice()</code> is perfect for managing:
        </p>

        <ul className="list-disc pl-6 text-slate-400 text-sm space-y-1">
          <li>menus</li>
          <li>playlist items</li>
          <li>student lists</li>
          <li>positions in arrays</li>
        </ul>

        <hr className="border-slate-700" />

        {/* Summary */}
        <p className="text-slate-400 text-sm">
          Mutating methods are powerful but should be used carefully, especially
          in frameworks like React where immutability is encouraged.  
          Still, understanding them is essential for mastering JavaScript arrays.
        </p>

      </div>
    );
  }
}
