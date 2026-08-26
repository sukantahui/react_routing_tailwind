import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 2 — Searching, Sorting & Filtering Arrays of Objects
        </h1>
        <p className="text-slate-300 text-sm">
          In real-world JavaScript (and React apps), you will constantly work with{" "}
          <b>arrays of objects</b> — students, products, users, tasks, courses etc.
          In this topic, we practice <code>filter()</code>, <code>find()</code>,{" "}
          <code>findIndex()</code>, <code>sort()</code>, <code>some()</code>,{" "}
          <code>every()</code>, and method chaining with objects.
        </p>
      </header>

      {/* 1. FILTER WITH MULTIPLE CONDITIONS */}
      <section className="space-y-4">
        <h2 className="text-xl text-emerald-300 font-semibold">
          1. filter() — Multiple Conditions on Objects
        </h2>

        <p className="text-slate-300 text-sm">
          Use <code>filter()</code> when you need to keep only those objects that pass
          certain conditions — for example, students who are in{" "}
          <code>"JavaScript"</code> course and have marks ≥ 80.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja",   marks: 92, course: "JavaScript", city: "Barrackpore" },
  { name: "Swadeep",  marks: 45, course: "Python",     city: "Kolkata" },
  { name: "Susmita",  marks: 88, course: "JavaScript", city: "Barrackpore" },
  { name: "Kaustav",  marks: 67, course: "Python",     city: "Barasat" },
];

const jsToppers = students.filter(
  s => s.course === "JavaScript" && s.marks >= 80
);

console.log("JavaScript toppers:", jsToppers);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const products = [
  { name: "Laptop",   price: 55000, inStock: true },
  { name: "Keyboard", price: 1200,  inStock: false },
  { name: "Mouse",    price: 600,   inStock: true },
  { name: "Monitor",  price: 7000,  inStock: true },
];

// Filter products that are in stock AND price < 5000
const affordableInStock = products.filter(
  p => p.inStock && p.price < 5000
);

console.log("Affordable & in stock:", affordableInStock);`}
          language="javascript"
        />
      </section>

      {/* 2. FIND & FINDINDEX */}
      <section className="space-y-4">
        <h2 className="text-xl text-yellow-300 font-semibold">
          2. find() & findIndex() — Locate Objects Quickly
        </h2>

        <p className="text-slate-300 text-sm">
          <code>find()</code> returns the <b>first matching object</b>.{" "}
          <code>findIndex()</code> returns the <b>index/position</b> of that object.  
          These are useful when editing or deleting a specific item.
        </p>

        <EditableCodeBlock
          initialCode={`const users = [
  { id: 1, name: "Ritaja",   role: "admin" },
  { id: 2, name: "Susmita",  role: "student" },
  { id: 3, name: "Devangshu",role: "teacher" },
];

// find admin
const adminUser = users.find(u => u.role === "admin");
console.log("Admin user:", adminUser);

// findIndex of teacher
const teacherIndex = users.findIndex(u => u.role === "teacher");
console.log("Teacher index:", teacherIndex);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const tasks = [
  { id: 1, title: "HTML Practice",        completed: true },
  { id: 2, title: "JavaScript Assignment", completed: false },
  { id: 3, title: "React Project",         completed: false },
];

const firstPendingTask = tasks.find(t => !t.completed);
const firstPendingIndex = tasks.findIndex(t => !t.completed);

console.log("First pending task:", firstPendingTask);
console.log("Index of first pending:", firstPendingIndex);`}
          language="javascript"
        />
      </section>

      {/* 3. SORT OBJECTS */}
      <section className="space-y-4">
        <h2 className="text-xl text-blue-300 font-semibold">
          3. sort() — Sorting Arrays of Objects
        </h2>

        <p className="text-slate-300 text-sm">
          <code>sort()</code> can sort objects by marks, price, name, etc.  
          Always remember: <b>sort() mutates the original array</b>.  
          Use <code>slice()</code> first if you want to keep the original.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Susmita", marks: 74 },
  { name: "Mounita", marks: 91 },
  { name: "Kaustav", marks: 67 },
  { name: "Pranjali", marks: 88 },
];

// clone first to avoid mutating original
const sortedByMarksDesc = students
  .slice()
  .sort((a, b) => b.marks - a.marks);

console.log("Original:", students);
console.log("Sorted (high → low):", sortedByMarksDesc);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const courses = [
  { title: "JavaScript Basics" },
  { title: "Advance Excel" },
  { title: "Full Stack Development" },
  { title: "Python for Data Analysis" },
];

const sortedByTitle = courses
  .slice()
  .sort((a, b) => a.title.localeCompare(b.title));

console.log("Sorted by title:", sortedByTitle);`}
          language="javascript"
        />
      </section>

      {/* 4. VALIDATION WITH some() & every() */}
      <section className="space-y-4">
        <h2 className="text-xl text-purple-300 font-semibold">
          4. some() & every() — Validation on Arrays of Objects
        </h2>

        <p className="text-slate-300 text-sm">
          <code>some()</code> → returns <code>true</code> if <b>at least one</b> item passes. <br />
          <code>every()</code> → returns <code>true</code> if <b>all</b> items pass.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja",  marks: 92 },
  { name: "Swadeep", marks: 45 },
  { name: "Susmita", marks: 74 },
];

const anyFailed  = students.some(s => s.marks < 40);
const allPassed  = students.every(s => s.marks >= 40);

console.log("Any failed? ", anyFailed);
console.log("All passed? ", allPassed);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const users = [
  { name: "Admin",   email: "admin@cnat.in" },
  { name: "Student", email: "" },
  { name: "Guest",   email: "guest@cnat.in" },
];

// Check if any user has missing email
const anyMissingEmail = users.some(u => !u.email);

console.log("Any missing email? ", anyMissingEmail);`}
          language="javascript"
        />
      </section>

      {/* 5. CHAINING METHODS */}
      <section className="space-y-4">
        <h2 className="text-xl text-rose-300 font-semibold">
          5. Chaining Methods — filter → sort → map
        </h2>

        <p className="text-slate-300 text-sm">
          In professional code (like React dashboards), we often chain methods:  
          <code>filter()</code> → <code>sort()</code> → <code>map()</code> to prepare data for UI.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja",   marks: 92, course: "JavaScript" },
  { name: "Susmita",  marks: 74, course: "Python" },
  { name: "Kaustav",  marks: 67, course: "JavaScript" },
  { name: "Devangshu",marks: 81, course: "JavaScript" },
  { name: "Pranjali", marks: 88, course: "Python" },
];

// Goal: Show TOP JavaScript students as label strings
// Steps: filter → sort → map

const topJsLabels = students
  .filter(s => s.course === "JavaScript" && s.marks >= 70)  // keep JS students with marks ≥ 70
  .slice()                                                  // clone before sort (safe habit)
  .sort((a, b) => b.marks - a.marks)                        // sort high → low
  .map(s => \`\${s.name} (\${s.marks})\`);                   // create label strings

console.log("Top JS Students:", topJsLabels);`}
          language="javascript"
        />
      </section>

      {/* TEACHER NOTE */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
        <p className="font-semibold text-sky-200">
          Teacher&apos;s Note — by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
        </p>
        <p>
          When you work with API data (students, products, users), you will almost always use 
          <code> filter()</code>, <code>find()</code>, <code>sort()</code>, <code>some()</code>,{" "}
          <code>every()</code>, and <code>map()</code> in combination.
        </p>
        <p>
          Try to think in <b>pipelines</b>: “Take data → filter → sort → map → show in UI”.
          If you practice these patterns carefully now, building dashboards and React tables
          will feel much easier later.
        </p>
      </section>

      {/* MINI PRACTICE */}
      <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
        <p className="font-semibold text-emerald-300">Mini Practice — For Your Notebook</p>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Create an array of 6–7 product objects (name, price, category, inStock).</li>
          <li>Use <code>filter()</code> to get only products from category <code>"Electronics"</code> and price &lt; 5000.</li>
          <li>Use <code>sort()</code> to order them by price (low → high).</li>
          <li>Use <code>map()</code> to convert them into label strings like <code>"Laptop — ₹45000"</code>.</li>
        </ol>
        <p className="text-slate-400 mt-1">
          Try to write the full solution using a single chained expression.
        </p>
      </section>
    </div>
  );
}
