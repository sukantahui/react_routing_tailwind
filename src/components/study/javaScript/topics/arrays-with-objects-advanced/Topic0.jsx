import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-10">

      {/* ------------------------------ */}
      {/* TITLE */}
      {/* ------------------------------ */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-sky-300">
          Topic 0 — Working with Arrays of Objects
        </h2>

        <p className="text-slate-300 text-sm">
          In real-world JavaScript applications, <b>arrays of objects</b> are everywhere —
          students, tasks, users, products, courses, orders, API responses and more.
        </p>

        <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
          <p className="font-semibold text-sky-200">Why this topic matters</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>APIs always return JSON arrays of objects.</li>
            <li>Frontend UI lists (React components) use this structure.</li>
            <li>map(), filter(), reduce(), find(), and sort() become powerful only with objects.</li>
          </ul>
        </div>
      </section>

      {/* ------------------------------ */}
      {/* EXAMPLE 1 – Students List */}
      {/* ------------------------------ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">
          1. Example Dataset — Students
        </h3>

        <p className="text-slate-300 text-sm">
          Students have name, marks, subjects and unique IDs:
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { id: 1, name: "Ritaja", marks: 85, subject: "Math" },
  { id: 2, name: "Mounita", marks: 92, subject: "Computer" },
  { id: 3, name: "Devangshu", marks: 76, subject: "English" },
  { id: 4, name: "Kaustav", marks: 45, subject: "History" }
];

console.log(students);`}
          language="javascript"
        />

        <p className="text-slate-400 text-xs">
          This structure is common in dashboards, report cards, attendance apps etc.
        </p>
      </section>

      {/* ------------------------------ */}
      {/* EXAMPLE 2 – Products List */}
      {/* ------------------------------ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-emerald-300">
          2. Example Dataset — Products
        </h3>

        <p className="text-slate-300 text-sm">
          A typical product list includes price, category and rating:
        </p>

        <EditableCodeBlock
          initialCode={`const products = [
  { id: 101, name: "Laptop", price: 55000, category: "Electronics", rating: 4.4 },
  { id: 102, name: "Mobile", price: 20000, category: "Electronics", rating: 4.1 },
  { id: 103, name: "Chair", price: 1200, category: "Furniture", rating: 3.8 }
];

console.log(products);`}
          language="javascript"
        />
      </section>

      {/* ------------------------------ */}
      {/* EXAMPLE 3 – Tasks List */}
      {/* ------------------------------ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-yellow-300">
          3. Example Dataset — Tasks
        </h3>

        <p className="text-slate-300 text-sm">
          Task lists used in todo apps and productivity dashboards:
        </p>

        <EditableCodeBlock
          initialCode={`const tasks = [
  { id: 1, title: "Prepare JS Notes", completed: false, priority: "High" },
  { id: 2, title: "Teach Arrays to Swadeep", completed: true, priority: "Medium" },
  { id: 3, title: "Check Assignments of Ritaja", completed: false, priority: "Low" }
];

console.log(tasks);`}
          language="javascript"
        />
      </section>

      {/* ------------------------------ */}
      {/* WHY USE ARRAY OF OBJECTS */}
      {/* ------------------------------ */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 space-y-2">
        <p className="font-semibold text-sky-200">Where you see Arrays of Objects?</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>User lists from backend APIs</li>
          <li>Product catalogs (ecommerce)</li>
          <li>Student management systems</li>
          <li>React list rendering using map()</li>
          <li>Chat messages, notifications, orders</li>
        </ul>
      </section>

      {/* ------------------------------ */}
      {/* HOW WE WILL USE THIS */}
      {/* ------------------------------ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-violet-300">
          How this topic connects with the next ones
        </h3>

        <p className="text-slate-300 text-sm">
          Next topics will use this dataset to teach:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li><b>map()</b> — extracting fields, transforming objects</li>
          <li><b>filter()</b> — selecting objects based on conditions</li>
          <li><b>reduce()</b> — computing totals, analytics, grouping</li>
          <li><b>find(), findIndex()</b> — locating objects</li>
          <li><b>sort()</b> — sorting by marks, price, ratings</li>
          <li><b>Chaining methods</b> — filter → sort → map pipelines</li>
        </ul>
      </section>

      {/* ------------------------------ */}
      {/* TEACHER NOTE */}
      {/* ------------------------------ */}
      <section className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
        <p className="font-semibold text-sky-200">Teacher’s Note (by Sukanta Hui)</p>
        <p>
          Encourage students to explore the datasets by modifying fields, adding new
          objects, or adjusting values. Hands-on exploration helps them build confidence
          before learning advanced transformations in later topics.
        </p>

        <ul className="list-disc ml-5">
          <li>Ask them to add new students or change marks.</li>
          <li>Let them try sorting based on price or rating.</li>
          <li>Let them try finding a task using find().</li>
        </ul>

        <p>
          Once they understand how the datasets look, map(), filter() and reduce() become
          very easy.
        </p>
      </section>

    </div>
  );
}
