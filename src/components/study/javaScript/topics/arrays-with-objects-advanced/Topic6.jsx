import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic6() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 5 — Checking Conditions with some() & every() (Objects)
        </h1>

        <p className="text-slate-300 text-sm">
          <code>some()</code> and <code>every()</code> help you quickly check conditions in arrays of
          objects — useful for validations, dashboards, searches, permissions, task status,
          and real-world decision making in JavaScript.
        </p>
      </header>

      {/* INTRO CARD */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
        <p className="font-semibold text-sky-200">Quick Summary</p>
        <ul className="list-disc ml-5 space-y-1">
          <li><code>some()</code> → returns <b>true</b> if <u>at least one</u> item matches the condition.</li>
          <li><code>every()</code> → returns <b>true</b> only if <u>all</u> items match the condition.</li>
        </ul>
      </section>

      {/* EXAMPLE 1 — PASS/FAIL CHECK */}
      <section className="space-y-4">
        <h2 className="text-xl text-emerald-300 font-semibold">
          1. Check if Any Student Failed (some)
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 92 },
  { name: "Susmita", marks: 78 },
  { name: "Kaustav", marks: 55 },
  { name: "Swadeep", marks: 34 }
];

// Check if someone failed
const anyFailed = students.some(s => s.marks < 40);

console.log(anyFailed); // true`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 2 — ALL PASSED */}
      <section className="space-y-4">
        <h2 className="text-xl text-yellow-300 font-semibold">
          2. Check if All Students Passed (every)
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 92 },
  { name: "Susmita", marks: 78 },
  { name: "Kaustav", marks: 55 }
];

// Check if all passed
const allPassed = students.every(s => s.marks >= 40);

console.log(allPassed); // true`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 3 — USER ACTIVE STATUS */}
      <section className="space-y-4">
        <h2 className="text-xl text-indigo-300 font-semibold">
          3. Check If Any User Is Inactive (some)
        </h2>

        <EditableCodeBlock
          initialCode={`const users = [
  { name: "Ritaja", active: true },
  { name: "Susmita", active: true },
  { name: "Kaustav", active: false }
];

// Is any user inactive?
const hasInactive = users.some(u => u.active === false);

console.log(hasInactive); // true`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 4 — ALL USERS ACTIVE */}
      <section className="space-y-4">
        <h2 className="text-xl text-rose-300 font-semibold">
          4. Check If All Users Are Active (every)
        </h2>

        <EditableCodeBlock
          initialCode={`const users = [
  { name: "Devangshu", active: true },
  { name: "Kaustav", active: true },
  { name: "Pranjali", active: true }
];

// All active?
const allActive = users.every(u => u.active);

console.log(allActive); // true`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 5 — PRODUCT AVAILABILITY */}
      <section className="space-y-4">
        <h2 className="text-xl text-purple-300 font-semibold">
          5. Check If Any Product Is Out of Stock
        </h2>

        <EditableCodeBlock
          initialCode={`const products = [
  { name: "Laptop", stock: 12 },
  { name: "Mouse", stock: 0 },
  { name: "Keyboard", stock: 5 }
];

const outOfStock = products.some(p => p.stock === 0);

console.log(outOfStock); // true`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 6 — VALIDATION SYSTEM */}
      <section className="space-y-4">
        <h2 className="text-xl text-lime-300 font-semibold">
          6. Validate If All Required Fields Exist
        </h2>

        <EditableCodeBlock
          initialCode={`const formData = [
  { field: "name", value: "Ritaja", required: true },
  { field: "email", value: "test@example.com", required: true },
  { field: "phone", value: "", required: false }
];

// Check if all required fields are filled
const valid = formData.every(f => {
  if (!f.required) return true;
  return f.value.trim() !== "";
});

console.log(valid);`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 7 — TASK COMPLETION */}
      <section className="space-y-4">
        <h2 className="text-xl text-orange-300 font-semibold">
          7. Task Manager — Check If All Tasks Completed
        </h2>

        <EditableCodeBlock
          initialCode={`const tasks = [
  { task: "Study", done: true },
  { task: "Assignment", done: true },
  { task: "Practice JS", done: false }
];

// All tasks done?
const allDone = tasks.every(t => t.done);

console.log(allDone); // false`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 8 — SEARCH SYSTEM */}
      <section className="space-y-4">
        <h2 className="text-xl text-cyan-300 font-semibold">
          8. Search Check — Any User Matches Keyword?
        </h2>

        <EditableCodeBlock
          initialCode={`const users = [
  { name: "Ritaja", city: "Kolkata" },
  { name: "Susmita", city: "Barrackpore" },
  { name: "Kaustav", city: "Kalyani" }
];

const query = "ka"; // case-insensitive search

const found = users.some(u =>
  u.name.toLowerCase().includes(query) ||
  u.city.toLowerCase().includes(query)
);

console.log(found); // true`}
          language="javascript"
        />
      </section>

      {/* TEACHER NOTE */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300">
        <p className="font-semibold text-sky-200 mb-1">Teacher’s Note by Sukanta Hui</p>
        <p>
          Mastering <code>some()</code> and <code>every()</code> makes your code smarter and cleaner.
          These are essential for validations, dashboard logic, form checking, and permission
          systems. Practice each example with your own datasets — especially student and product data.
        </p>
      </section>

    </div>
  );
}
