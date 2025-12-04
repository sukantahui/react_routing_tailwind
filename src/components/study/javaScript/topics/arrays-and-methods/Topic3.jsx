import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-10">

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-sky-300">
          Searching in Arrays — indexOf(), includes(), find(), findIndex()
        </h2>

        {/* INTRO */}
        <p className="text-slate-300 text-sm leading-relaxed">
          JavaScript provides multiple search methods to locate values inside arrays.
          Some return positions, some return actual values, and some return <i>boolean</i>.
          These are extremely useful when managing student lists, course lists, and
          batch records at <strong>Coder & AccoTax, Barrackpore</strong>.
        </p>

        <hr className="border-slate-700" />

        {/* =========================
            1. indexOf()
        ========================== */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">1. indexOf()</h3>

          <p className="text-slate-300 text-sm">
            <code className="text-emerald-300">indexOf()</code> searches for a value
            and returns the <strong>first index</strong> where it is found.
          </p>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p className="font-semibold text-sky-200 mb-1">Syntax</p>
            <pre className="whitespace-pre-wrap text-slate-300">
{`array.indexOf(searchValue, startIndex = 0)

// return type: number
// returns -1 if value not found`}
            </pre>
          </div>

          <EditableCodeBlock
            initialCode={`const courses = ["JavaScript", "Python", "C", "JavaScript"];

console.log(courses.indexOf("Python"));   // 1
console.log(courses.indexOf("JavaScript")); // 0
console.log(courses.indexOf("React"));   // -1`}
            language="javascript"
          />

          <p className="text-slate-400 text-sm">
            Use <code>indexOf()</code> when you simply want the item’s position.
          </p>
        </section>

        <hr className="border-slate-700" />

        {/* =========================
            2. includes()
        ========================== */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">2. includes()</h3>

          <p className="text-slate-300 text-sm">
            <code className="text-emerald-300">includes()</code> checks whether a
            value is present in an array.  
            It returns a <strong>boolean</strong>.
          </p>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p className="font-semibold text-sky-200 mb-1">Syntax</p>
            <pre className="whitespace-pre-wrap">
{`array.includes(searchValue, startIndex = 0)

// return type: boolean`}
            </pre>
          </div>

          <EditableCodeBlock
            initialCode={`const skills = ["HTML", "CSS", "JavaScript"];

console.log(skills.includes("CSS"));   // true
console.log(skills.includes("Python")); // false`}
            language="javascript"
          />

          <p className="text-slate-400 text-sm">
            Use this for quick yes/no checks, like verifying whether
            a student has chosen a particular course.
          </p>
        </section>

        <hr className="border-slate-700" />

        {/* =========================
            3. find()
        ========================== */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">3. find()</h3>

          <p className="text-slate-300 text-sm">
            <code className="text-emerald-300">find()</code> returns the
            <strong> first element </strong> that matches a condition.
          </p>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p className="font-semibold text-sky-200 mb-1">Syntax</p>
            <pre className="whitespace-pre-wrap">
{`array.find(callback(element, index, array))

// return type: element | undefined`}
            </pre>
          </div>

          <EditableCodeBlock
            initialCode={`const students = [
  { name: "Ritaja", marks: 88 },
  { name: "Mounita", marks: 92 },
  { name: "Swadeep", marks: 35 },
];

const topper = students.find(s => s.marks > 90);
console.log(topper);`}
            language="javascript"
          />

          <p className="text-slate-400 text-sm">
            Perfect when you need the <b>actual object/data</b>, not just its index.
          </p>
        </section>

        <hr className="border-slate-700" />

        {/* =========================
            4. findIndex()
        ========================== */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">4. findIndex()</h3>

          <p className="text-slate-300 text-sm">
            <code className="text-emerald-300">findIndex()</code> works like
            <code> find()</code>, but returns the <strong>index</strong> instead.
          </p>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <p className="font-semibold text-sky-200 mb-1">Syntax</p>
            <pre className="whitespace-pre-wrap">
{`array.findIndex(callback(element, index, array))

// return type: number
// returns -1 if no match`}
            </pre>
          </div>

          <EditableCodeBlock
            initialCode={`const students = [
  { name: "Susmita", marks: 70 },
  { name: "Kaustav", marks: 55 },
  { name: "Pranjali", marks: 95 },
];

const index = students.findIndex(s => s.marks < 60);

console.log(index); // 1 (Kaustav)`}
            language="javascript"
          />

          <p className="text-slate-400 text-sm">
            Great for modifying, deleting, or updating a found entry.
          </p>
        </section>

        <hr className="border-slate-700" />

        {/* SUMMARY */}
        <section className="bg-slate-900/40 border border-slate-700 rounded-xl p-4 text-slate-300 text-sm space-y-2">
          <p className="font-semibold text-sky-200">Summary Table</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><code>indexOf()</code> → returns position (number)</li>
            <li><code>includes()</code> → returns true/false</li>
            <li><code>find()</code> → returns first matched element</li>
            <li><code>findIndex()</code> → returns index of first match</li>
          </ul>
        </section>

      </div>
    );
  }
}
