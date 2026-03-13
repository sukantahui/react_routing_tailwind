// Topic0.jsx
import React from "react";
import clsx from "clsx";
// import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";

// Import raw code examples (must be placed in topic0_files/)
import studentsArrayExample from "./topic0_files/students_array.js?raw";
import productsArrayExample from "./topic0_files/products_array.js?raw";
import tasksArrayExample from "./topic0_files/tasks_array.js?raw";

// Teacher info – Sukanta Hui
const currentYear = new Date().getFullYear();
const experience = currentYear - 1998; // Started in 1998

const Topic0 = () => {
  // Sample static data for live preview
  const sampleStudents = [
    { id: 1, name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
    { id: 2, name: "Tuhina", marks: 92, city: "Naihati CNAT" },
    { id: 3, name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
    { id: 4, name: "Debangshu", marks: 88, city: "Naihati CNAT" },
    { id: 5, name: "Ritaja", marks: 95, city: "Barrackpore CNAT" },
  ];

  const sampleProducts = [
    { id: 101, name: "Laptop", price: 55000, inStock: true },
    { id: 102, name: "Mouse", price: 600, inStock: false },
    { id: 103, name: "Keyboard", price: 1200, inStock: true },
  ];

  const sampleTasks = [
    { id: 201, title: "Complete project", status: "pending" },
    { id: 202, title: "Review code", status: "in-progress" },
    { id: 203, title: "Update docs", status: "done" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-8 leading-relaxed">
      {/* inline keyframes for fade-slide-up */}
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-slide-up {
          animation: fadeSlideUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* Main container with staggered children */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section 1: Title and intro */}
        <section
          className="fade-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            📚 Topic 0: Working with Arrays of Objects
          </h1>
          <p className="text-lg">
            In real‑world applications, we often deal with collections of
            structured data — students, products, tasks. Arrays of objects are
            the perfect way to store and manipulate such data in JavaScript.
          </p>
        </section>

        {/* Section 2: What & Why */}
        <section
          className="fade-slide-up bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">🧠</span>
            What is an Array of Objects?
          </h2>
          <p>
            An array of objects is simply a list where each element is an object
            containing key‑value pairs. This structure mirrors real‑life lists:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Students</strong> — each student has name, marks, city.
            </li>
            <li>
              <strong>Products</strong> — each product has name, price, stock
              status.
            </li>
            <li>
              <strong>Tasks</strong> — each task has title, status, due date.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Why?</strong> It keeps related data together and allows us
            to perform bulk operations (like filtering, sorting, or calculating
            totals) easily.
          </p>
        </section>

        {/* Section 3: Signature / Prototype */}
        <section
          className="fade-slide-up bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">📐</span>
            Syntax & Signature
          </h2>
          <p className="mb-2">
            <strong>Array of objects</strong> is just a regular array literal
            containing object literals:
          </p>
          <pre className="bg-white dark:bg-gray-950 p-3 rounded-md overflow-x-auto text-sm">
            {`const students = [
  { id: 1, name: "Swadeep", marks: 85 },
  { id: 2, name: "Tuhina", marks: 92 },
];`}
          </pre>
          <p className="mt-2">
            <strong>Return type:</strong> Always an array (even if empty). Each
            element is an object with the same shape (usually).
          </p>
          <p className="mt-2">
            <strong>Purpose:</strong> Store multiple records with consistent
            fields. Used whenever you have a list of entities.
          </p>
        </section>

        {/* Section 4: Accessing & Iterating */}
        <section
          className="fade-slide-up bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">🔍</span>
            Accessing & Iterating
          </h2>
          <p className="mb-3">
            You can access properties using dot or bracket notation. To work
            with every object, loop through the array:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-md">
              <h3 className="font-medium mb-2">🔹 for loop</h3>
              <pre className="text-xs overflow-x-auto">
                {`for (let i = 0; i < students.length; i++) {
  console.log(students[i].name);
}`}
              </pre>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-md">
              <h3 className="font-medium mb-2">🔹 for...of</h3>
              <pre className="text-xs overflow-x-auto">
                {`for (let student of students) {
  console.log(student.name);
}`}
              </pre>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-md">
              <h3 className="font-medium mb-2">🔹 forEach</h3>
              <pre className="text-xs overflow-x-auto">
                {`students.forEach(student => {
  console.log(student.name);
});`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 5: Live Preview – Students, Products, Tasks */}
        <section
          className="fade-slide-up space-y-6"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">👩‍🎓</span>
            Live Examples
          </h2>

          {/* Students Cards */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-4">📋 Students</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
                >
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {student.name}
                  </p>
                  <p className="text-sm">Marks: {student.marks}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {student.city}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Products Cards */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-4">📦 Products</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
                >
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {product.name}
                  </p>
                  <p className="text-sm">₹{product.price}</p>
                  <p
                    className={clsx(
                      "text-sm",
                      product.inStock
                        ? "text-green-500"
                        : "text-red-500 dark:text-red-400"
                    )}
                  >
                    {product.inStock ? "In stock" : "Out of stock"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks Cards */}
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-medium mb-4">✅ Tasks</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
                >
                  <p className="font-semibold text-purple-600 dark:text-purple-400">
                    {task.title}
                  </p>
                  <p className="text-sm capitalize">
                    Status:{" "}
                    <span
                      className={clsx(
                        task.status === "done"
                          ? "text-green-500"
                          : task.status === "in-progress"
                          ? "text-yellow-500"
                          : "text-gray-500"
                      )}
                    >
                      {task.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Code Examples (EditableCodeBlock) */}
        <section
          className="fade-slide-up space-y-6"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">📝</span>
            Code Deep Dive
          </h2>

          <JavaScriptEditableCodeBlock 
            title="Example 1: Students Array"
            initialCode={studentsArrayExample}
          />

          <JavaScriptEditableCodeBlock 
            title="Example 2: Products Array with Loop"
            initialCode={productsArrayExample}
          />

          <JavaScriptEditableCodeBlock 
            title="Example 3: Tasks Array – Adding a New Task"
            initialCode={tasksArrayExample}
          />
        </section>

        {/* Section 7: Common Pitfalls */}
        <section
          className="fade-slide-up bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-400"
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400">⚠️</span>
            Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Reference vs value:</strong> Objects are stored by
              reference. Modifying an object in one place affects all references.
            </li>
            <li>
              <strong>Assuming all objects have same properties:</strong> Always
              check for existence (e.g., <code>student?.marks</code>).
            </li>
            <li>
              <strong>Using <code>const</code> for array but still changing
              content:</strong> <code>const</code> prevents reassignment, but you
              can still modify objects inside.
            </li>
            <li>
              <strong>Forgetting to initialize arrays:</strong> Accessing
              <code>students[0].name</code> on an empty array throws an error.
            </li>
          </ul>
        </section>

        {/* Section 8: Best Practices & Tips */}
        <section
          className="fade-slide-up bg-green-50 dark:bg-green-900/20 p-6 rounded-xl"
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">💡</span>
            Best Practices & Tips
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Consistent property names</strong> across all objects for
              predictability.
            </li>
            <li>
              <strong>Use <code>const</code> for arrays</strong> that won't be
              reassigned (makes intent clear).
            </li>
            <li>
              <strong>Add unique <code>id</code> fields</strong> to easily
              identify and update objects.
            </li>
            <li>
              <strong>Prefer <code>forEach</code> or <code>for...of</code></strong>{" "}
              for readability over traditional <code>for</code> when index isn't
              needed.
            </li>
            <li>
              <strong>Use optional chaining (<code>?.</code>)</strong> when
              accessing deep properties to avoid runtime errors.
            </li>
          </ul>
        </section>

        {/* Section 9: Mini Checklist */}
        <section
          className="fade-slide-up bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl"
          style={{ animationDelay: "0.9s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">✅</span>
            Mini Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>I can create an array of objects with meaningful data.</li>
            <li>I can access and modify object properties inside the array.</li>
            <li>I can loop through the array using at least two methods.</li>
            <li>I understand the reference behaviour of objects.</li>
            <li>I know how to add and remove items from the array.</li>
          </ul>
        </section>

        {/* Section 10: Teacher's Note */}
        <section
          className="fade-slide-up bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg"
          style={{ animationDelay: "1s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-400">🧑‍🏫</span>
            Teacher's Note — Sukanta Hui
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Sukanta Hui</strong> — Programming Language, RDBMs,
              Operating System, Web Development
            </p>
            <p>📧 sukantahui@codernaccotax.co.in | 📞 7003756860</p>
            <p>
              ⏳ Teaching since 1998 — <strong>{experience} years</strong> of
              experience.
            </p>
            <p className="mt-3 italic">
              "Arrays of objects are the bread and butter of real‑world coding.
              Encourage students to think of them as digital filing cabinets:
              each drawer (object) holds related papers (properties). Practice
              by building small apps — a to‑do list, a product catalog, a grade
              tracker. Always inspect your data with <code>console.table()</code>{" "}
              to see the structure at a glance."
            </p>
          </div>
        </section>

        {/* Hint Section */}
        <section
          className="fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl"
          style={{ animationDelay: "1.1s" }}
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">💭</span>
            Hint — Think about…
          </h2>
          <p>
            How would you update the marks of a student named "Ritaja" without
            changing the rest? Try writing a loop that finds the right object
            and modifies it.
          </p>
        </section>

        {/* SVG illustration (conceptual) */}
        <section
          className="fade-slide-up flex justify-center py-4"
          style={{ animationDelay: "1.2s" }}
        >
          <svg
            width="300"
            height="120"
            viewBox="0 0 300 120"
            className="transition-transform duration-300 hover:scale-105"
          >
            {/* Array bracket left */}
            <text x="10" y="60" fontSize="40" fill="currentColor" opacity="0.8">
              [
            </text>
            {/* Object 1 */}
            <rect
              x="40"
              y="30"
              width="70"
              height="60"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text x="50" y="50" fontSize="10" fill="currentColor">
              name: "Swadeep"
            </text>
            <text x="50" y="70" fontSize="10" fill="currentColor">
              marks: 85
            </text>
            {/* comma */}
            <text x="115" y="60" fontSize="30" fill="currentColor">
              ,
            </text>
            {/* Object 2 */}
            <rect
              x="130"
              y="30"
              width="70"
              height="60"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* subtle SVG animation */}
              <animate
                attributeName="stroke"
                values="currentColor; #3b82f6; currentColor"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>
            <text x="140" y="50" fontSize="10" fill="currentColor">
              name: "Tuhina"
            </text>
            <text x="140" y="70" fontSize="10" fill="currentColor">
              marks: 92
            </text>
            {/* comma */}
            <text x="205" y="60" fontSize="30" fill="currentColor">
              ,
            </text>
            {/* Object 3 */}
            <rect
              x="220"
              y="30"
              width="70"
              height="60"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text x="230" y="50" fontSize="10" fill="currentColor">
              name: "Abhronila"
            </text>
            <text x="230" y="70" fontSize="10" fill="currentColor">
              marks: 78
            </text>
            {/* Array bracket right */}
            <text x="295" y="60" fontSize="40" fill="currentColor">
              ]
            </text>
          </svg>
        </section>
      </div>
    </div>
  );
};

export default Topic0;