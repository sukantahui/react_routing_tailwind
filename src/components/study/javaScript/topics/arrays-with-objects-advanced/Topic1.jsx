import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-10">

      {/* PAGE TITLE */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-sky-300">
          Introduction to Advanced Array Methods with Objects
        </h1>
        <p className="text-slate-300 text-sm">
          In this topic, we explore how JavaScript’s most powerful array methods work with{" "}
          <b>arrays of objects</b> — the type of data structure used in real-world apps,
          dashboards, e-commerce sites, student records, and more.
        </p>
      </header>

      {/* SECTION: map() with objects */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          1. map() — Transform Objects
        </h2>

        <p className="text-slate-300 text-sm">
          <code>map()</code> is used to transform each object into a new structure.
          This is extremely useful for formatting data coming from APIs.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 88 },
  { name: "Mounita", marks: 92 },
  { name: "Devangshu", marks: 75 }
];

const names = students.map(s => s.name);

console.log(names);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const products = [
  { title: "Laptop", price: 50000 },
  { title: "Keyboard", price: 1200 },
  { title: "Mouse", price: 600 }
];

// Create labels for UI
const labels = products.map(p => \`\${p.title} — Rs. \${p.price}\`);

console.log(labels);`}
          language="javascript"
        />
      </section>

      {/* SECTION: filter() with objects */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-rose-300">
          2. filter() — Selecting Objects Based on Conditions
        </h2>

        <p className="text-slate-300 text-sm">
          <code>filter()</code> is used whenever we need to select only certain items from a list,
          such as “only passed students”, “only expensive products”, etc.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Susmita", marks: 85 },
  { name: "Swadeep", marks: 34 },
  { name: "Kaustav", marks: 73 },
  { name: "Pranjali", marks: 92 }
];

const passed = students.filter(s => s.marks >= 40);

console.log(passed);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const products = [
  { title: "Bag", price: 700 },
  { title: "Shoes", price: 2500 },
  { title: "Watch", price: 1200 }
];

// Filter items above Rs. 1000
const premium = products.filter(p => p.price > 1000);

console.log(premium);`}
          language="javascript"
        />
      </section>

      {/* SECTION: reduce() with objects */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-yellow-300">
          3. reduce() — Summaries, Totals & Analytics
        </h2>

        <p className="text-slate-300 text-sm">
          <code>reduce()</code> is extremely powerful when working with analytics,
          dashboards, and financial calculations.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 88 },
  { name: "Mounita", marks: 92 },
  { name: "Devangshu", marks: 75 }
];

// Total marks
const total = students.reduce((sum, s) => sum + s.marks, 0);

console.log("Total:", total);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const cart = [
  { item: "Laptop", price: 50000, qty: 1 },
  { item: "Mouse", price: 600, qty: 2 },
  { item: "Keyboard", price: 1200, qty: 1 }
];

// Grand total
const bill = cart.reduce((amount, item) => {
  return amount + item.price * item.qty;
}, 0);

console.log("Total Bill:", bill);`}
          language="javascript"
        />
      </section>

      {/* SECTION: find() & sort() */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-indigo-300">
          4. find(), sort(), some(), every() with Objects
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Susmita", marks: 88 },
  { name: "Ritaja", marks: 95 },
  { name: "Mounita", marks: 72 }
];

const topper = students.find(s => s.marks > 90);

console.log(topper);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const products = [
  { title: "Laptop", price: 50000 },
  { title: "Shoes", price: 2000 },
  { title: "Mouse", price: 500 }
];

// Sort by price (low → high)
products.sort((a, b) => a.price - b.price);

console.log(products);`}
          language="javascript"
        />
      </section>

      {/* TEACHER NOTE */}
      <section className="bg-slate-900/50 border border-slate-700 p-4 rounded-xl text-xs text-slate-300">
        <p className="font-semibold text-sky-300 mb-1">
          Teacher’s Note – by Sukanta Hui
        </p>
        <p>
          These examples reflect the real data structures used in your careers:
          student records, product lists, billing systems, analytics dashboards,
          and API responses. Mastering array methods with objects is essential
          for React, frontend development, and any modern JavaScript project.
        </p>
      </section>
    </div>
  );
}
