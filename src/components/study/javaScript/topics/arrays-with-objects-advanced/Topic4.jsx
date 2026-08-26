import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 4 — Using <code>find()</code> & <code>findIndex()</code> with Objects
        </h1>

        <p className="text-slate-300 text-sm">
          <code>find()</code> and <code>findIndex()</code> are used to locate a single item
          inside arrays — especially arrays of objects such as students, products,
          tasks, users, etc. These methods are essential when working with API data
          in React applications.
        </p>
      </header>

      {/* 1. find(): Get FIRST matching object */}
      <section className="space-y-4">
        <h2 className="text-xl text-emerald-300 font-semibold">
          1. find() — Returns the FIRST matching item
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 92 },
  { name: "Susmita", marks: 78 },
  { name: "Kaustav", marks: 55 }
];

const topper = students.find(s => s.marks > 90);

console.log(topper);`}
          language="javascript"
        />
      </section>

      {/* 2. find() with multiple conditions */}
      <section className="space-y-4">
        <h2 className="text-xl text-yellow-300 font-semibold">
          2. find() with Multiple Conditions
        </h2>

        <EditableCodeBlock
          initialCode={`const users = [
  { name: "Ritaja", role: "Admin", active: true },
  { name: "Susmita", role: "Student", active: false },
  { name: "Kaustav", role: "Student", active: true }
];

// Find active student
const activeStudent = users.find(
  u => u.role === "Student" && u.active === true
);

console.log(activeStudent);`}
          language="javascript"
        />
      </section>

      {/* 3. find() inside nested objects */}
      <section className="space-y-4">
        <h2 className="text-xl text-indigo-300 font-semibold">
          3. find() in Nested Objects (Deep Search)
        </h2>

        <EditableCodeBlock
          initialCode={`const departments = [
  {
    name: "IT",
    students: ["Ritaja", "Susmita"]
  },
  {
    name: "Accounts",
    students: ["Kaustav", "Pranjali"]
  }
];

// Find department where "Kaustav" belongs
const dept = departments.find(d => d.students.includes("Kaustav"));

console.log(dept);`}
          language="javascript"
        />
      </section>

      {/* 4. findIndex(): Get index instead of object */}
      <section className="space-y-4">
        <h2 className="text-xl text-rose-300 font-semibold">
          4. findIndex() — Returns the INDEX of matching item
        </h2>

        <EditableCodeBlock
          initialCode={`const tasks = [
  { id: 1, title: "Study JS", done: false },
  { id: 2, title: "Practice React", done: false },
  { id: 3, title: "Finish Project", done: true }
];

const index = tasks.findIndex(t => t.done === true);

console.log(index); // 2`}
          language="javascript"
        />
      </section>

      {/* 5. Updating objects using findIndex */}
      <section className="space-y-4">
        <h2 className="text-xl text-teal-300 font-semibold">
          5. Update an Object using findIndex()
        </h2>

        <EditableCodeBlock
          initialCode={`const products = [
  { id: 1, name: "Mouse", price: 400 },
  { id: 2, name: "Keyboard", price: 1500 },
  { id: 3, name: "Monitor", price: 8500 }
];

const idx = products.findIndex(p => p.id === 2);

if (idx !== -1) {
  products[idx].price = 1800; // update price
}

console.log(products);`}
          language="javascript"
        />
      </section>

      {/* 6. Removing objects using findIndex */}
      <section className="space-y-4">
        <h2 className="text-xl text-orange-300 font-semibold">
          6. Remove Object from Array using findIndex()
        </h2>

        <EditableCodeBlock
          initialCode={`const cart = [
  { id: 1, item: "Laptop" },
  { id: 2, item: "Mouse" },
  { id: 3, item: "Keyboard" }
];

const removeId = 2;

const removeIndex = cart.findIndex(c => c.id === removeId);

if (removeIndex !== -1) {
  cart.splice(removeIndex, 1);
}

console.log(cart);`}
          language="javascript"
        />
      </section>

      {/* 7. Real API Simulation */}
      <section className="space-y-4">
        <h2 className="text-xl text-purple-300 font-semibold">
          7. Real API Example — Search User by ID
        </h2>

        <EditableCodeBlock
          initialCode={`const apiUsers = [
  { id: 101, name: "Ritaja", city: "Kolkata" },
  { id: 102, name: "Susmita", city: "Barrackpore" },
  { id: 103, name: "Kaustav", city: "Barrackpore" }
];

const userId = 102;

const user = apiUsers.find(u => u.id === userId);

console.log(user);`}
          language="javascript"
        />
      </section>

      {/* TEACHER NOTE*/}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300">
        <p className="font-semibold text-sky-200 mb-1">Teacher’s Note by Sukanta Hui</p>
        <p>
          In React apps and professional dashboards, <code>find()</code> and <code>findIndex()</code> 
          are used constantly — for selecting a user, updating a record, removing an item,
          or opening a detail page.  
          Practice all examples and try using them in your own API-style datasets.
        </p>
      </section>
    </div>
  );
}
