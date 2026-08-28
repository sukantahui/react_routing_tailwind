import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic9() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-sky-300">
          Topic 9 — Real-World Datasets (Students, Courses, Products, Tasks)
        </h1>

        <p className="text-slate-300 text-sm">
          In real applications — dashboards, portals, admin panels, mobile apps —  
          data always comes as <b>arrays of objects</b>.  
          Here we explore the most common real-world dataset patterns and how to process them using
          functional array methods like <code>map()</code>, <code>filter()</code>, <code>reduce()</code>,
          <code>sort()</code>, <code>find()</code>, and <code>flatMap()</code>.
        </p>
      </header>

      {/* SECTION 1 – STUDENTS DATASET */}
      <section className="space-y-4">
        <h2 className="text-xl text-emerald-300 font-semibold">
          1. Students Dataset — Results, Topper List, Pass Count
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", marks: 92, course: "JS" },
  { name: "Susmita", marks: 78, course: "JS" },
  { name: "Kaustav", marks: 55, course: "Python" },
  { name: "Devangshu", marks: 81, course: "Python" },
  { name: "Swadeep", marks: 34, course: "JS" }
];

// Find pass, fail, toppers & average
const passed = students.filter(s => s.marks >= 40);

const toppers = [...students].sort((a, b) => b.marks - a.marks).slice(0, 3);

const average =
  students.reduce((sum, s) => sum + s.marks, 0) / students.length;

console.log("Passed:", passed);
console.log("Top 3:", toppers);
console.log("Average Marks:", average);`}
          language="javascript"
        />
      </section>

      {/* SECTION 2 – COURSES DATASET */}
      <section className="space-y-4">
        <h2 className="text-xl text-yellow-300 font-semibold">
          2. Courses Dataset — Enrollment & Performance Analytics
        </h2>

        <p className="text-slate-400 text-sm">
          Exactly like data used in institute dashboards such as Coder & AccoTax.
        </p>

        <EditableCodeBlock
          initialCode={`const courses = [
  { name: "JavaScript", students: 40, avgMarks: 78 },
  { name: "Python", students: 35, avgMarks: 82 },
  { name: "Full Stack", students: 25, avgMarks: 74 },
  { name: "Excel", students: 60, avgMarks: 88 }
];

// Weighted score = avgMarks * students
const analysis = courses
  .map(c => ({ ...c, weighted: c.students * c.avgMarks }))
  .sort((a, b) => b.weighted - a.weighted);

const topCourse = analysis[0];

const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);

console.log("Top Course:", topCourse);
console.log("Total Students:", totalStudents);
console.log("Sorted by Performance:", analysis);`}
          language="javascript"
        />
      </section>

      {/* SECTION 3 – PRODUCTS DATASET */}
      <section className="space-y-4">
        <h2 className="text-xl text-indigo-300 font-semibold">
          3. Products Dataset — Filtering, Sorting, Recommending
        </h2>

        <EditableCodeBlock
          initialCode={`const products = [
  { name: "Laptop", price: 55000, rating: 4.8, category: "Electronics" },
  { name: "Mouse", price: 650, rating: 4.2, category: "Accessories" },
  { name: "Keyboard", price: 1500, rating: 4.5, category: "Accessories" },
  { name: "Monitor", price: 9000, rating: 4.7, category: "Electronics" },
  { name: "Pen Drive", price: 450, rating: 4.0, category: "Electronics" }
];

// Filter → Sort → Recommend
const bestElectronics = products
  .filter(p => p.category === "Electronics")
  .filter(p => p.price < 20000)
  .sort((a, b) => b.rating - a.rating)
  .map(p => p.name);

console.log("Recommended Electronics:", bestElectronics);`}
          language="javascript"
        />
      </section>

      {/* SECTION 4 – TASKS DATASET */}
      <section className="space-y-4">
        <h2 className="text-xl text-rose-300 font-semibold">
          4. Tasks Dataset — Priority Handling, Deadlines, Completion
        </h2>

        <EditableCodeBlock
          initialCode={`const tasks = [
  { title: "Study JS", priority: "High", done: false },
  { title: "Pay Bills", priority: "Medium", done: true },
  { title: "Practice Coding", priority: "High", done: true },
  { title: "Gaming", priority: "Low", done: false }
];

const priorityOrder = { High: 1, Medium: 2, Low: 3 };

// Filter incomplete → Sort by priority
const todoList = tasks
  .filter(t => !t.done)
  .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

// Count completed
const completed = tasks.filter(t => t.done).length;

console.log("To-Do Tasks:", todoList);
console.log("Completed Count:", completed);`}
          language="javascript"
        />
      </section>

      {/* SECTION 5 – MERGED REAL DATASET */}
      <section className="space-y-4">
        <h2 className="text-xl text-teal-300 font-semibold">
          5. Multi-Dataset Pipeline — Mixed Analytics (Students × Courses)
        </h2>

        <p className="text-slate-400 text-sm">
          A real dashboard often uses data coming from 2–3 API endpoints.
        </p>

        <EditableCodeBlock
          initialCode={`const students = [
  { name: "Ritaja", course: "JS", marks: 92 },
  { name: "Susmita", course: "JS", marks: 78 },
  { name: "Kaustav", course: "Python", marks: 55 },
  { name: "Devangshu", course: "Python", marks: 81 }
];

const courses = [
  { name: "JS", teacher: "Sukanta Hui" },
  { name: "Python", teacher: "Tanusree Hui" }
];

// Merge student with teacher info
const merged = students.map(s => ({
  ...s,
  teacher: courses.find(c => c.name === s.course)?.teacher
}));

console.log(merged);`}
          language="javascript"
        />
      </section>

      {/* SECTION 6 – DASHBOARD STYLE: FLAT + REDUCE */}
      <section className="space-y-4">
        <h2 className="text-xl text-purple-300 font-semibold">
          6. Dashboard Dataset — Flatten All User Tasks + Summary
        </h2>

        <EditableCodeBlock
          initialCode={`const users = [
  {
    name: "Sukanta",
    tasks: [
      { title: "JS Class", score: 90 },
      { title: "Project Review", score: 88 }
    ]
  },
  {
    name: "Tanusree",
    tasks: [
      { title: "Python Practice", score: 82 },
      { title: "Excel Tutorial", score: 91 }
    ]
  }
];

// Flatten all tasks from all users
const allTasks = users.flatMap(u => u.tasks);

const totalScore = allTasks.reduce((s, t) => s + t.score, 0);

console.log("All Tasks:", allTasks);
console.log("Total Score:", totalScore);`}
          language="javascript"
        />
      </section>

      {/* TEACHER NOTE */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300">
        <p className="font-semibold text-sky-200 mb-1">Teacher’s Note by Sukanta Hui</p>
        <p>
          Real-world datasets allow you to understand how JavaScript powers dashboards,
          analytics pages, student portals, product catalogs, and admin systems.  
          These patterns repeat everywhere — in React apps, Node.js APIs, and data processing pipelines.  
          Mastering them prepares you for actual industry-level development.
        </p>
      </section>

    </div>
  );
}
