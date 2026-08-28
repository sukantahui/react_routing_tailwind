import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 3 — reduce(), Grouping, Analytics & Nested Data Processing
        </h1>

        <p className="text-slate-300 text-sm">
          <code>reduce()</code> is the most powerful array method. It helps you calculate totals,
          averages, rankings, group data, build frequency maps, and transform large datasets
          (like API responses). Mastering <code>reduce()</code> means mastering real-world
          JavaScript used in React dashboards, analytics, and backend logic.
        </p>
      </header>

      {/* 1. Basic totals */}
      <section className="space-y-4">
        <h2 className="text-xl text-emerald-300 font-semibold">
          1. reduce() — Calculate Totals
        </h2>

        <EditableCodeBlock
          initialCode={`const marks = [78, 92, 85, 90];

const total = marks.reduce((sum, m) => sum + m, 0);

console.log("Total Marks:", total);`}
          language="javascript"
        />

        <EditableCodeBlock
          initialCode={`const expenses = [
  { item: "Snacks", cost: 40 },
  { item: "Books", cost: 350 },
  { item: "Bus Fare", cost: 15 },
  { item: "Tea", cost: 10 }
];

const totalCost = expenses.reduce((sum, e) => sum + e.cost, 0);

console.log("Total Expense:", totalCost);`}
          language="javascript"
        />
      </section>

      {/* 2. Averages */}
      <section className="space-y-4">
        <h2 className="text-xl text-yellow-300 font-semibold">
          2. Average Calculations
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 92 },
  { name: "Susmita", marks: 88 },
  { name: "Kaustav", marks: 75 },
  { name: "Pranjali", marks: 91 }
];

const avgMarks = students.reduce((acc, s, _, arr) => {
  return acc + s.marks / arr.length;
}, 0);

console.log("Average Marks:", avgMarks.toFixed(2));`}
          language="javascript"
        />
      </section>

      {/* 3. Grouping */}
      <section className="space-y-4">
        <h2 className="text-xl text-rose-300 font-semibold">
          3. Grouping Objects by Property (Reduce Magic)
        </h2>

        <p className="text-slate-300 text-sm">
          Grouping is extremely common in dashboards, admin panels, and analytics.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", course: "JavaScript", marks: 92 },
  { name: "Susmita", course: "Python", marks: 88 },
  { name: "Kaustav", course: "JavaScript", marks: 75 },
  { name: "Devangshu", course: "Python", marks: 91 },
];

const groupByCourse = students.reduce((acc, s) => {
  if (!acc[s.course]) acc[s.course] = [];
  acc[s.course].push(s);
  return acc;
}, {});

console.log(groupByCourse);`}
          language="javascript"
        />
      </section>

      {/* 4. Frequency Map */}
      <section className="space-y-4">
        <h2 className="text-xl text-indigo-300 font-semibold">
          4. Frequency Count (How Many Times a Value Appears)
        </h2>

        <EditableCodeBlock
          initialCode={`const items = ["pen", "book", "pen", "mouse", "book", "pen"];

const frequency = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});

console.log(frequency);`}
          language="javascript"
        />
      </section>

      {/* 5. Reduce for Object Transformations */}
      <section className="space-y-4">
        <h2 className="text-xl text-purple-300 font-semibold">
          5. Convert Arrays → Objects (Very Useful!)
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { id: 1, name: "Ritaja" },
  { id: 2, name: "Susmita" },
  { id: 3, name: "Kaustav" },
];

const mapped = students.reduce((acc, s) => {
  acc[s.id] = s.name;
  return acc;
}, {});

console.log(mapped);
// { 1: "Ritaja", 2: "Susmita", 3: "Kaustav" }`}
          language="javascript"
        />
      </section>

      {/* 6. Nested Data */}
      <section className="space-y-4">
        <h2 className="text-xl text-blue-300 font-semibold">
          6. Handling Nested Data — Extracting Deep Values
        </h2>

        <EditableCodeBlock
          initialCode={`const users = [
  {
    name: "Ritaja",
    orders: [
      { item: "Laptop", price: 55000 },
      { item: "Mouse", price: 600 }
    ]
  },
  {
    name: "Kaustav",
    orders: [
      { item: "Keyboard", price: 1500 },
      { item: "Pen Drive", price: 400 }
    ]
  }
];

const totalSpent = users.reduce((acc, user) => {
  const userTotal = user.orders.reduce((sum, o) => sum + o.price, 0);
  acc[user.name] = userTotal;
  return acc;
}, {});

console.log(totalSpent);`}
          language="javascript"
        />
      </section>

      {/* 7. Chaining */}
      <section className="space-y-4">
        <h2 className="text-xl text-teal-300 font-semibold">
          7. Chaining: filter → sort → reduce
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 92, course: "JS" },
  { name: "Susmita", marks: 78, course: "JS" },
  { name: "Kaustav", marks: 55, course: "Python" },
  { name: "Devangshu", marks: 81, course: "JS" },
  { name: "Swadeep", marks: 34, course: "Python" },
];

const jsAverage = students
  .filter(s => s.course === "JS")
  .sort((a, b) => b.marks - a.marks)
  .reduce((acc, s, _, arr) => acc + s.marks / arr.length, 0);

console.log("JS Average:", jsAverage.toFixed(2));`}
          language="javascript"
        />
      </section>

      {/* 8. Practical Mini Dashboard */}
      <section className="space-y-4">
        <h2 className="text-xl text-orange-300 font-semibold">
          8. Mini Dashboard – Course Analytics
        </h2>

        <EditableCodeBlock
          initialCode={`const courseData = [
  { course: "JS", students: 40, avgMarks: 78 },
  { course: "Python", students: 35, avgMarks: 82 },
  { course: "Full Stack", students: 25, avgMarks: 74 },
  { course: "Excel", students: 60, avgMarks: 88 },
];

const summary = courseData.reduce(
  (acc, c) => {
    acc.totalStudents += c.students;
    acc.totalAvg += c.avgMarks;
    return acc;
  },
  { totalStudents: 0, totalAvg: 0 }
);

summary.overallAvg = summary.totalAvg / courseData.length;

console.log(summary);`}
          language="javascript"
        />
      </section>

      {/* TEACHER NOTE */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300">
        <p className="font-semibold text-sky-200">Teacher’s Note by Sukanta Hui</p>
        <p>
          reduce() is the method that separates beginners from professionals. Once you learn to
          group, summarise, and transform data with reduce(), you can build dashboards, analytics,
          table summaries, and API-based components easily in React.
        </p>
      </section>

    </div>
  );
}
