import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic6() {
  return (
    <div className="space-y-10">

      {/* ============================================================
          SECTION 1 — INTRODUCTION
      ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">
          Truthy &amp; Falsy Values in JavaScript
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          In JavaScript, <strong>every value</strong> becomes either
          <span className="text-emerald-400 font-semibold"> truthy </span>
          or
          <span className="text-rose-400 font-semibold"> falsy </span>
          when evaluated inside conditions such as <code className="text-sky-300">if</code>.
        </p>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Understanding truthy and falsy behavior helps avoid unexpected bugs in conditionals.
        </p>
      </section>

      {/* ============================================================
          SECTION 2 — FALSY VALUES
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-rose-300">
          The 7 Falsy Values
        </h3>

        <p className="text-slate-300 text-sm md:text-base">
          Only these **seven** values are considered falsy:
        </p>

        <ul className="list-disc pl-5 text-slate-400 leading-relaxed space-y-1 text-sm md:text-base">
          <li><code>false</code></li>
          <li><code>0</code></li>
          <li><code>-0</code></li>
          <li><code>""</code> (empty string)</li>
          <li><code>null</code></li>
          <li><code>undefined</code></li>
          <li><code>NaN</code></li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let values = [false, 0, "", null, undefined, NaN];

for (let value of values) {
  if (value) {
    console.log(value, "=> truthy");
  } else {
    console.log(value, "=> falsy");
  }
}`}
        />
      </section>

      {/* ============================================================
          SECTION 3 — TRUTHY VALUES
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-emerald-400">Truthy Values</h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          All other values are truthy. Common examples:
        </p>

        <ul className="list-disc pl-5 text-slate-400 leading-relaxed space-y-1 text-sm md:text-base">
          <li>Any non-zero number (<code>1</code>, <code>-5</code>, <code>3.14</code>)</li>
          <li>Any non-empty string (<code>"0"</code>, <code>"hello"</code>)</li>
          <li><code>[]</code> (empty array)</li>
          <li><code>{`{}`}</code> (empty object)</li>
          <li><code>function() {}</code> (any function)</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let values = [1, -5, "0", " ", [], {}, function() {}];

for (let value of values) {
  if (value) {
    console.log(value, "=> truthy");
  } else {
    console.log(value, "=> falsy");
  }
}`}
        />
      </section>

      {/* ============================================================
          SECTION 4 — TRUTHY/FALSY IN CONDITIONS
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">
          Truthy/Falsy in IF Statements
        </h3>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          JavaScript converts values to boolean automatically:
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let name = "";

if (name) {
  console.log("Name entered:", name);
} else {
  console.log("Please enter your name.");
}`}
        />

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Because <code>""</code> is falsy, the <code>else</code> block runs.
        </p>
      </section>

      {/* ============================================================
          SECTION 5 — COMMON PITFALLS
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-rose-300">
          Common Pitfalls
        </h3>

        <ul className="list-disc pl-5 text-slate-400 leading-relaxed space-y-2 text-sm md:text-base">
          <li><code>0</code> is falsy, but <code>"0"</code> is truthy.</li>
          <li><code>[]</code> is truthy even though it appears "empty".</li>
          <li><code>{`{}`}</code> is truthy — all objects are truthy.</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`console.log(Boolean(0));     // false
console.log(Boolean("0"));   // true
console.log(Boolean([]));    // true
console.log(Boolean({}));    // true`}
        />
      </section>

      {/* ============================================================
          SECTION 6 — DOUBLE NOT (!!)
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">
          Boolean Conversion Using <code>!!</code>
        </h3>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          <code>!!</code> is a quick way to convert any value to a boolean.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`console.log(!!0);        // false
console.log(!!"");       // false
console.log(!!"hello");  // true
console.log(!!123);      // true
console.log(!!null);     // false
console.log(!!{});       // true
console.log(!![]);       // true`}
        />
      </section>

      {/* ============================================================
          SECTION 7 — PRACTICE
      ============================================================ */}
      <section className="space-y-4 pb-4">
        <h3 className="text-xl font-semibold text-emerald-400">
          Practice — Predict the Output
        </h3>

        <p className="text-slate-300 text-sm md:text-base">
          Guess whether each value is truthy or falsy before running the code.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let values = [0, "0", "", " ", null, undefined, [], {}, NaN];

for (let value of values) {
  if (value) {
    console.log(value, "=> truthy");
  } else {
    console.log(value, "=> falsy");
  }
}`}
        />
      </section>

    </div>
  );
}
