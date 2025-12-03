import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-10">

      {/* TITLE + INTRO */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-sky-300">
          Higher-Order Array Methods — <span className="text-sky-100">map(), filter(), reduce()</span>
        </h2>

        <p className="text-slate-300 text-sm">
          In modern JavaScript, arrays are not just lists — they are powerful data pipelines.
          Methods like <code className="text-emerald-300">map()</code>,{" "}
          <code className="text-emerald-300">filter()</code>, and{" "}
          <code className="text-emerald-300">reduce()</code> let you transform and analyze data
          in a clean, expressive way. These are heavily used in frameworks like React, and
          in professional codebases like those we use at Coder &amp; AccoTax, Barrackpore.
        </p>

        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
          <p className="font-semibold text-sky-200">Why are they called “higher-order methods”?</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>They take a function as an argument (callback function).</li>
            <li>They often return a new array or a single value.</li>
            <li>They make code shorter, clearer, and easier to reason about.</li>
          </ul>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-sky-300">1. map() — Transform Every Element</h3>

        <p className="text-slate-300 text-sm">
          <code className="text-emerald-300">map()</code> creates a <b>new array</b> by applying a
          function to every element of the original array. The original array is not changed.
        </p>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300">
          <p className="font-semibold text-sky-200 mb-1">Syntax</p>
          <CodeBlock
            code={`const newArray = oldArray.map((item, index, array) => {
  // return transformed value
});`}
            language="javascript"
          />
        </div>

        {/* Example 1 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 1 — Double each number
          </p>
          <EditableCodeBlock
  initialCode={`const nums = [1,2,3];
const doubled = nums.map(n => n*2);
console.log(doubled);`}
  language="javascript"
/>
        </div>

        {/* Example 2 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 2 — Using arrow function
          </p>
          <CodeBlock
            code={`const nums = [5, 10, 15];

const doubled = nums.map(n => n * 2);

console.log(doubled); // [10, 20, 30]`}
            language="javascript"
          />
        </div>

        {/* Example 3 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 3 — Extracting a single property from objects (student names)
          </p>
          <CodeBlock
            code={`const students = [
  { name: "Ritaja", marks: 88 },
  { name: "Mounita", marks: 92 },
  { name: "Devangshu", marks: 81 }
];

const names = students.map(s => s.name);

console.log(names); // ["Ritaja", "Mounita", "Devangshu"]`}
            language="javascript"
          />
        </div>

        {/* Example 4 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 4 — Creating a formatted label list
          </p>
          <CodeBlock
            code={`const students = [
  { name: "Pranjali", course: "JavaScript" },
  { name: "Susmita", course: "Python" },
  { name: "Kaustav", course: "Full Stack" }
];

const labels = students.map(s => s.name + " — " + s.course);

console.log(labels);
// ["Pranjali — JavaScript", "Susmita — Python", "Kaustav — Full Stack"]`}
            language="javascript"
          />
        </div>

        {/* Example 5 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 5 — Map to Boolean (pass / fail)
          </p>
          <CodeBlock
            code={`const marks = [35, 78, 90, 24];

const passStatus = marks.map(m => m >= 40);

console.log(passStatus); // [false, true, true, false]`}
            language="javascript"
          />
        </div>

        {/* Common mistakes */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
          <p className="font-semibold text-amber-300">Common mistakes with map()</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Forgetting to <b>return</b> from the callback.</li>
            <li>Trying to use <code>map()</code> only for side-effects (use <code>forEach()</code> then).</li>
            <li>Expecting <code>map()</code> to modify the original array (it does not).</li>
          </ul>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-sky-300">2. filter() — Keep Only What Passes a Test</h3>

        <p className="text-slate-300 text-sm">
          <code className="text-emerald-300">filter()</code> creates a <b>new array</b> that contains
          only the elements for which the callback returns <code>true</code>.
        </p>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300">
          <p className="font-semibold text-sky-200 mb-1">Syntax</p>
          <CodeBlock
            code={`const filteredArray = oldArray.filter((item, index, array) => {
  // return true to keep the item
  // return false to throw it away
});`}
            language="javascript"
          />
        </div>

        {/* Example 1 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 1 — Keep only even numbers</p>
          <CodeBlock
            code={`const nums = [1, 2, 3, 4, 5, 6];

const evenNums = nums.filter(n => n % 2 === 0);

console.log(evenNums); // [2, 4, 6]`}
            language="javascript"
          />
        </div>

        {/* Example 2 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 2 — Filter students who passed (marks ≥ 40)
          </p>
          <CodeBlock
            code={`const students = [
  { name: "Ritaja", marks: 85 },
  { name: "Swadeep", marks: 38 },
  { name: "Susmita", marks: 74 },
  { name: "Kaustav", marks: 29 }
];

const passed = students.filter(s => s.marks >= 40);

console.log(passed);
// [
//   { name: "Ritaja", marks: 85 },
//   { name: "Susmita", marks: 74 }
// ]`}
            language="javascript"
          />
        </div>

        {/* Example 3 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 3 — Filter based on text (search)
          </p>
          <CodeBlock
            code={`const courses = [
  "JavaScript Basics",
  "JavaScript Advanced",
  "Python for Data Analysis",
  "Tally with GST",
  "Full Stack Web Development"
];

const search = "JavaScript";

const jsCourses = courses.filter(c =>
  c.toLowerCase().includes(search.toLowerCase())
);

console.log(jsCourses);
// ["JavaScript Basics", "JavaScript Advanced"]`}
            language="javascript"
          />
        </div>

        {/* Example 4 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 4 — Filter invalid values (remove null, undefined, NaN)
          </p>
          <CodeBlock
            code={`const data = [10, null, 25, undefined, 0, NaN, 50];

const clean = data.filter(item => Number.isFinite(item));

console.log(clean); // [10, 25, 0, 50]`}
            language="javascript"
          />
        </div>

        {/* Common mistakes */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
          <p className="font-semibold text-amber-300">Common mistakes with filter()</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Returning the item instead of <code>true</code>/<code>false</code> (though objects are truthy).</li>
            <li>Forgetting that it does not modify the original array.</li>
            <li>Using complex conditions without breaking them into readable parts.</li>
          </ul>
        </div>
      </section>

      {/* REDUCE SECTION */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-sky-300">3. reduce() — Turn an Array into a Single Value</h3>

        <p className="text-slate-300 text-sm">
          <code className="text-emerald-300">reduce()</code> takes all elements of an array and
          “reduces” them to one value: a number, a string, an object, or even another array.
        </p>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300">
          <p className="font-semibold text-sky-200 mb-1">Syntax</p>
          <CodeBlock
            code={`const result = array.reduce(
  (accumulator, currentValue, index, array) => {
    // update and return accumulator
    return accumulator;
  },
  initialValue
);`}
            language="javascript"
          />
        </div>

        {/* Example 1 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 1 — Sum of numbers</p>
          <CodeBlock
            code={`const marks = [78, 85, 90];

const total = marks.reduce((acc, m) => acc + m, 0);

console.log(total); // 253`}
            language="javascript"
          />
        </div>

        {/* Example 2 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">Example 2 — Average marks</p>
          <CodeBlock
            code={`const marks = [78, 85, 90];

const total = marks.reduce((acc, m) => acc + m, 0);
const avg = total / marks.length;

console.log("Average:", avg); // Average: 84.333...`}
            language="javascript"
          />
        </div>

        {/* Example 3 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 3 — Count how many students passed
          </p>
          <CodeBlock
            code={`const students = [
  { name: "Ritaja", marks: 85 },
  { name: "Swadeep", marks: 38 },
  { name: "Susmita", marks: 74 },
  { name: "Kaustav", marks: 29 }
];

const passedCount = students.reduce((acc, s) => {
  if (s.marks >= 40) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log("Passed:", passedCount); // Passed: 2`}
            language="javascript"
          />
        </div>

        {/* Example 4 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 4 — Group students by pass / fail
          </p>
          <CodeBlock
            code={`const students = [
  { name: "Pranjali", marks: 91 },
  { name: "Devangshu", marks: 45 },
  { name: "Mounita", marks: 33 },
  { name: "Susmita", marks: 77 }
];

const grouped = students.reduce(
  (acc, s) => {
    if (s.marks >= 40) {
      acc.pass.push(s);
    } else {
      acc.fail.push(s);
    }
    return acc;
  },
  { pass: [], fail: [] }
);

console.log(grouped.pass); // students who passed
console.log(grouped.fail); // students who failed`}
            language="javascript"
          />
        </div>

        {/* Example 5 */}
        <div className="space-y-2">
          <p className="font-semibold text-slate-200 text-sm">
            Example 5 — Build frequency count (how many times each mark appears)
          </p>
          <CodeBlock
            code={`const marks = [80, 75, 80, 90, 75, 75];

const frequency = marks.reduce((acc, m) => {
  if (!acc[m]) {
    acc[m] = 1;
  } else {
    acc[m] = acc[m] + 1;
  }
  return acc;
}, {});

console.log(frequency);
// { "75": 3, "80": 2, "90": 1 }`}
            language="javascript"
          />
        </div>

        {/* Common mistakes */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
          <p className="font-semibold text-amber-300">Common mistakes with reduce()</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>Forgetting the <b>initial value</b> (second argument) and getting unexpected results.</li>
            <li>Making the reducer callback too complex — then it becomes hard to read.</li>
            <li>Using <code>reduce()</code> when a combination of <code>map()</code> and <code>filter()</code> would be simpler.</li>
          </ul>
        </div>
      </section>

      {/* WHEN TO USE WHAT */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">
          4. When to use map(), filter(), and reduce()
        </h3>

        <div className="grid md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/70 border border-sky-700/60 rounded-2xl p-4 space-y-2">
            <p className="font-semibold text-sky-200">Use map() when...</p>
            <ul className="list-disc ml-5 space-y-1 text-slate-300">
              <li>You want to transform each element.</li>
              <li>Array length stays the same.</li>
              <li>Example: format student names, change marks, add extra fields.</li>
            </ul>
          </div>

          <div className="bg-slate-900/70 border border-emerald-700/60 rounded-2xl p-4 space-y-2">
            <p className="font-semibold text-emerald-200">Use filter() when...</p>
            <ul className="list-disc ml-5 space-y-1 text-slate-300">
              <li>You want to remove some elements.</li>
              <li>Array length may become smaller.</li>
              <li>Example: students with marks ≥ 40, active users only.</li>
            </ul>
          </div>

          <div className="bg-slate-900/70 border border-violet-700/60 rounded-2xl p-4 space-y-2">
            <p className="font-semibold text-violet-200">Use reduce() when...</p>
            <ul className="list-disc ml-5 space-y-1 text-slate-300">
              <li>You want a single summary value.</li>
              <li>Example: total marks, average, grouped object, frequency map.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TEACHER NOTE */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
        <p className="font-semibold text-sky-200">Teacher&apos;s Note (by Sukanta Hui)</p>
        <p>
          Whenever you write loops like <code>for</code> or <code>while</code> in your JavaScript
          projects at Coder &amp; AccoTax, try to pause for a moment and ask:
        </p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Can this be written with <code>map()</code>, <code>filter()</code> or <code>reduce()</code>?</li>
          <li>Will that version be shorter and clearer for my future self or my classmates?</li>
        </ul>
        <p>
          Practicing this regularly will slowly move you from “basic looping” to
          “professional JavaScript thinking” — the style expected in real-world projects and
          interviews.
        </p>
      </section>

      {/* MINI PRACTICE */}
      <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
        <p className="font-semibold text-emerald-300">Mini Practice (for Homework)</p>
        <ul className="list-decimal ml-5 space-y-1">
          <li>
            Use <code>map()</code> to convert an array of student names into
            <code>"Mr./Ms. &lt;name&gt;"</code> format.
          </li>
          <li>
            Use <code>filter()</code> to keep only those students whose marks are between 60 and 90.
          </li>
          <li>
            Use <code>reduce()</code> to find the highest marks from an array of numbers.
          </li>
        </ul>
        <p className="text-slate-400 mt-1">
          Try these on your own, then compare with a friend or with your teacher in class.
        </p>
      </section>

      {/* -------------------------------------------------- */}
      {/* 🔥 ESSENTIAL DAILY-USE ARRAY METHODS */}
      {/* -------------------------------------------------- */}

      <section className="space-y-10 mt-10">

        <h2 className="text-2xl font-semibold text-sky-300">
          Essential Daily-Use Array Methods (Must Know for Real-World JavaScript)
        </h2>

        {/* forEach */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-emerald-300">1. forEach() — Loop through items</h3>
          <p className="text-slate-300 text-sm">
            <code>forEach()</code> runs a function for every array element.
            It does NOT return anything (unlike map).
          </p>

          <CodeBlock
            code={`const names = ["Ritaja", "Susmita", "Kaustav"];

names.forEach(name => {
  console.log("Student:", name);
});`}
            language="javascript"
          />

          <CodeBlock
            code={`const nums = [1, 2, 3];
let sum = 0;

nums.forEach(n => sum += n);

console.log(sum); // 6`}
            language="javascript"
          />
        </div>

        {/* find */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-yellow-300">2. find() — Get FIRST matching item</h3>
          <p className="text-slate-300 text-sm">
            Returns the first element that satisfies the condition.
            Very useful in forms, tables, and API data.
          </p>

          <CodeBlock
            code={`const students = [
  { name: "Ritaja", marks: 92 },
  { name: "Swadeep", marks: 38 },
  { name: "Susmita", marks: 88 }
];

const topper = students.find(s => s.marks > 90);

console.log(topper); 
// { name: "Ritaja", marks: 92 }`}
            language="javascript"
          />

          <CodeBlock
            code={`const nums = [5, 10, 15, 20];
console.log(nums.find(n => n > 12)); // 15`}
            language="javascript"
          />
        </div>

        {/* some */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-orange-300">3. some() — Check if ANY item passes</h3>
          <p className="text-slate-300 text-sm">
            Returns true if at least one element satisfies the condition.
          </p>

          <CodeBlock
            code={`const marks = [33, 48, 75, 80];

const hasFailed = marks.some(m => m < 40);

console.log(hasFailed); // true`}
            language="javascript"
          />
        </div>

        {/* every */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-purple-300">4. every() — Check if ALL items pass</h3>
          <p className="text-slate-300 text-sm">
            Useful for validating forms or checking data consistency.
          </p>

          <CodeBlock
            code={`const marks = [78, 80, 92, 88];

console.log(marks.every(m => m >= 40)); 
// true`}
            language="javascript"
          />

          <CodeBlock
            code={`const names = ["Ritaja", "Mounita", "Kaustav"];
console.log(names.every(n => typeof n === "string")); // true`}
            language="javascript"
          />
        </div>

        {/* includes */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-pink-300">5. includes() — Check if value exists</h3>

          <CodeBlock
            code={`const subjects = ["HTML", "CSS", "JavaScript"];

console.log(subjects.includes("JavaScript")); // true
console.log(subjects.includes("Python")); // false`}
            language="javascript"
          />
        </div>

        {/* sort */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-blue-300">6. sort() — Sort arrays</h3>
          <p className="text-slate-300 text-sm">
            ⚠️ Sorting numbers requires a compare function.
          </p>

          <CodeBlock
            code={`const nums = [5, 20, 3, 10];

nums.sort((a, b) => a - b);
console.log(nums); // [3, 5, 10, 20]`}
            language="javascript"
          />

          <CodeBlock
            code={`const students = [
  { name: "Susmita", marks: 74 },
  { name: "Mounita", marks: 91 },
  { name: "Kaustav", marks: 67 }
];

students.sort((a, b) => b.marks - a.marks);

console.log(students); // Sorted by marks (highest first)`}
            language="javascript"
          />
        </div>

        {/* slice */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-rose-300">7. slice() — Extract portion (non-destructive)</h3>

          <CodeBlock
            code={`const nums = [10, 20, 30, 40, 50];

const part = nums.slice(1, 4); 
console.log(part); // [20, 30, 40]

console.log(nums); // original unchanged`}
            language="javascript"
          />
        </div>

        {/* splice */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-red-400">8. splice() — Add / Remove items (changes original!)</h3>

          <CodeBlock
            code={`const nums = [10, 20, 30, 40];

// remove
nums.splice(1, 2);
console.log(nums); // [10, 40]

// add
nums.splice(1, 0, 25, 35);
console.log(nums); // [10, 25, 35, 40]`}
            language="javascript"
          />
        </div>

        {/* flat */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-teal-300">9. flat() — Flatten nested arrays</h3>

          <CodeBlock
            code={`const arr = [1, [2, 3], [4, [5]]];

console.log(arr.flat(1)); 
// [1, 2, 3, 4, [5]]

console.log(arr.flat(2)); 
// [1, 2, 3, 4, 5]`}
            language="javascript"
          />
        </div>

        {/* flatMap */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-indigo-300">10. flatMap() — map() + flat() together</h3>

          <CodeBlock
            code={`const sentences = ["hello world", "coder accotax"];

const words = sentences.flatMap(s => s.split(" "));

console.log(words);
// ["hello", "world", "coder", "accotax"]`}
            language="javascript"
          />
        </div>

        {/* Array.from */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-lime-300">11. Array.from() — Convert anything to array</h3>

          <CodeBlock
            code={`console.log(Array.from("ABC"));
// ["A", "B", "C"]`}
            language="javascript"
          />

          <CodeBlock
            code={`const nums = Array.from({ length: 5 }, (_, i) => i + 1);

console.log(nums); // [1, 2, 3, 4, 5]`}
            language="javascript"
          />
        </div>

        {/* isArray */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-cyan-300">12. Array.isArray()</h3>

          <CodeBlock
            code={`console.log(Array.isArray([1,2,3])); // true
console.log(Array.isArray("coder")); // false`}
            language="javascript"
          />
        </div>

        {/* join */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-fuchsia-300">13. join() — Convert array → string</h3>

          <CodeBlock
            code={`const names = ["Ritaja", "Mounita", "Susmita"];

console.log(names.join(", "));
// "Ritaja, Mounita, Susmita"`}
            language="javascript"
          />
        </div>

        {/* Teacher note */}
        <div className="bg-slate-900/60 p-4 border border-slate-700 rounded-2xl text-xs text-slate-300">
          <p className="font-semibold text-sky-200 mb-1">Teacher’s Note by Sukanta Hui</p>
          <p>
            These array methods are not “extra” — they are daily tools every developer uses.
            In React applications, 80% of data handling (API results, tables, lists, UI rendering)
            is done with these exact functions.
            Practice each method until it feels natural.
          </p>
        </div>

      </section>


    </div>
  );
}
