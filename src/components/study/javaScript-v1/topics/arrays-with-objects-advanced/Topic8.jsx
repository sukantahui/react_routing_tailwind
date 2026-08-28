import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic8() {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-sky-300">
          Deep Array Transformations Inside Nested Objects
        </h1>

        <p className="text-slate-300 text-sm">
          Real-world data is rarely simple. Students have multiple subjects,
          users have multiple orders, products have multiple reviews, and
          departments have multiple employees.  
          This topic trains you to use <code>map()</code>, <code>filter()</code>,
          <code>reduce()</code>, <code>flat()</code>, and <code>flatMap()</code> inside
          deeply nested structures — a must-have skill for React dashboards,
          admin portals, analytics systems, and API data processing.
        </p>
      </header>

      {/* EXAMPLE 1 - NESTED MAP + REDUCE */}
      <section className="space-y-4">
        <h2 className="text-xl text-emerald-300 font-semibold">
          1. Total Marks From Nested Subjects (map + reduce)
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  {
    name: "Ritaja",
    subjects: [
      { name: "JS", marks: 92 },
      { name: "Python", marks: 88 }
    ]
  },
  {
    name: "Susmita",
    subjects: [
      { name: "JS", marks: 78 },
      { name: "Python", marks: 84 }
    ]
  }
];

// Add total marks inside each student
const result = students.map(s => ({
  name: s.name,
  totalMarks: s.subjects.reduce((sum, sub) => sum + sub.marks, 0)
}));

console.log(result);`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 2 - FILTER NESTED DATA */}
      <section className="space-y-4">
        <h2 className="text-xl text-yellow-300 font-semibold">
          2. Filter Students Who Passed All Subjects (every + reduce)
        </h2>

        <EditableCodeBlock
          initialCode={`const students = [
  {
    name: "Kaustav",
    subjects: [
      { sub: "JS", marks: 55 },
      { sub: "Python", marks: 61 }
    ]
  },
  {
    name: "Devangshu",
    subjects: [
      { sub: "JS", marks: 38 },
      { sub: "Python", marks: 70 }
    ]
  }
];

// Only keep students who passed all subjects
const passedAll = students.filter(s =>
  s.subjects.every(sub => sub.marks >= 40)
);

console.log(passedAll);`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 3 - DEEP SORTING INSIDE NESTED ARRAYS */}
      <section className="space-y-4">
        <h2 className="text-xl text-orange-300 font-semibold">
          3. Sort Each Student’s Subjects by Marks
        </h2>

        <EditableCodeBlock
          initialCode={`const data = [
  {
    name: "Ritaja",
    subjects: [
      { sub: "Python", marks: 88 },
      { sub: "JS", marks: 92 }
    ]
  },
  {
    name: "Susmita",
    subjects: [
      { sub: "JS", marks: 78 },
      { sub: "Python", marks: 84 }
    ]
  }
];

// Sort subjects inside each student
const formatted = data.map(s => ({
  ...s,
  subjects: [...s.subjects].sort((a, b) => b.marks - a.marks)
}));

console.log(formatted);`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 4 - NESTED REDUCE FOR GROUPING */}
      <section className="space-y-4">
        <h2 className="text-xl text-indigo-300 font-semibold">
          4. Group Orders by Category Inside Nested Orders
        </h2>

        <EditableCodeBlock
          initialCode={`const users = [
  {
    name: "Sukanta",
    orders: [
      { product: "Laptop", category: "Electronics", price: 55000 },
      { product: "Mouse", category: "Electronics", price: 600 }
    ]
  },
  {
    name: "Mounita",
    orders: [
      { product: "Keyboard", category: "Electronics", price: 1500 },
      { product: "Pen Stand", category: "Stationery", price: 200 }
    ]
  }
];

// Group orders by category
const grouped = users.map(u => ({
  name: u.name,
  categories: u.orders.reduce((acc, o) => {
    if (!acc[o.category]) acc[o.category] = 0;
    acc[o.category] += o.price;
    return acc;
  }, {})
}));

console.log(grouped);`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 5 - FLATTENING NESTED OBJECT ARRAYS */}
      <section className="space-y-4">
        <h2 className="text-xl text-rose-300 font-semibold">
          5. Flatten All Orders From All Users (flatMap)
        </h2>

        <EditableCodeBlock
          initialCode={`const customers = [
  {
    name: "Tanusree",
    orders: [
      { item: "Laptop", price: 55000 },
      { item: "Mouse", price: 600 }
    ]
  },
  {
    name: "Ritaja",
    orders: [
      { item: "Monitor", price: 8500 },
      { item: "Pen Drive", price: 450 }
    ]
  }
];

// Create one flat list of all purchased items
const allOrders = customers.flatMap(c => c.orders);

console.log(allOrders);`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 6 - ADVANCED NESTED PIPELINE */}
      <section className="space-y-4">
        <h2 className="text-xl text-lime-300 font-semibold">
          6. Deep Pipeline: Filter → Flatten → Map → Reduce
        </h2>

        <p className="text-slate-400 text-sm">
          Real-world dataset: department → employees → tasks → task score.
        </p>

        <EditableCodeBlock
          initialCode={`const company = [
  {
    dept: "IT",
    employees: [
      { name: "Ritaja", tasks: [{ score: 90 }, { score: 88 }] },
      { name: "Kaustav", tasks: [{ score: 55 }] }
    ]
  },
  {
    dept: "Accounts",
    employees: [
      { name: "Susmita", tasks: [{ score: 78 }, { score: 82 }] },
      { name: "Pranjali", tasks: [{ score: 91 }] }
    ]
  }
];

// Calculate total score for the entire company
const totalScore = company
  .flatMap(d => d.employees)       // all employees
  .flatMap(e => e.tasks)           // all tasks
  .map(t => t.score)               // extract score
  .reduce((s, x) => s + x, 0);      // sum all

console.log(totalScore);`}
          language="javascript"
        />
      </section>

      {/* EXAMPLE 7 - REAL-WORLD NESTED TRANSFORMATION */}
      <section className="space-y-4">
        <h2 className="text-xl text-purple-300 font-semibold">
          7. API-Like Data Transformation (Nested Courses → Students → Marks)
        </h2>

        <EditableCodeBlock
          initialCode={`const institute = [
  {
    course: "JavaScript",
    batch: [
      { student: "Ritaja", marks: [92, 85, 88] },
      { student: "Susmita", marks: [78, 81, 75] }
    ]
  },
  {
    course: "Python",
    batch: [
      { student: "Kaustav", marks: [55, 60, 52] },
      { student: "Devangshu", marks: [81, 72, 68] }
    ]
  }
];

// Find average marks for each student
const averages = institute.flatMap(c => c.batch).map(s => ({
  name: s.student,
  average:
    s.marks.reduce((sum, m) => sum + m, 0) / s.marks.length
}));

console.log(averages);`}
          language="javascript"
        />
      </section>

      {/* TEACHER NOTE */}
      <section className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300">
        <p className="font-semibold text-sky-200 mb-1">Teacher’s Note by Sukanta Hui</p>
        <p>
          Nested transformations represent real web application data — orders, subjects,
          tasks, categories, logs, courses, products and more.  
          Mastering deep processing gives you a huge advantage when handling API data in
          React applications.  
          Practice every example and try converting your own datasets into deep pipelines.
        </p>
      </section>

    </div>
  );
}
