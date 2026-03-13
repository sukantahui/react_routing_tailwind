// Topic11.jsx
import React from "react";
import clsx from "clsx";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";

// Import raw code examples (must be placed in topic11_files/)
import totalsExample from "./topic11_files/totals.js?raw";
import groupingExample from "./topic11_files/grouping.js?raw";
import analyticsExample from "./topic11_files/analytics.js?raw";

// Teacher info – Sukanta Hui
const currentYear = new Date().getFullYear();
const experience = currentYear - 1998; // Started in 1998

const Topic11 = () => {
  // Sample static data for live preview (used in explanatory sections)
  const sampleStudents = [
    { name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
    { name: "Tuhina", marks: 92, city: "Naihati CNAT" },
    { name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
    { name: "Debangshu", marks: 88, city: "Naihati CNAT" },
    { name: "Ritaja", marks: 95, city: "Barrackpore CNAT" },
  ];

  const totalMarks = sampleStudents.reduce((sum, s) => sum + s.marks, 0);

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
            📊 Topic 11: Reduce Examples
          </h1>
          <p className="text-lg">
            The <code>.reduce()</code> method is the Swiss Army knife of array
            transformations. It lets you boil down an array to a single value —
            a number, an object, another array, or anything you need.
          </p>
        </section>

        {/* Section 2: Signature & Purpose */}
        <section
          className="fade-slide-up bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">📐</span>
            Signature & Purpose
          </h2>
          <pre className="bg-white dark:bg-gray-950 p-3 rounded-md overflow-x-auto text-sm">
            {`array.reduce((accumulator, currentValue, index, array) => {
  // return new accumulator
}, initialValue);`}
          </pre>
          <p className="mt-3">
            <strong>Return type:</strong> Whatever you return from the reducer
            (number, string, object, array).<br />
            <strong>Purpose:</strong> Transform an array into any single
            aggregated result — sum, average, grouped object, flattened array,
            etc.<br />
            <strong>When to use:</strong> Whenever you need to derive a single
            value from many items.
          </p>
        </section>

        {/* Section 3: Live Preview – simple sum */}
        <section
          className="fade-slide-up bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">🧮</span>
            Quick Example: Total Marks
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
              <p className="font-medium">Students:</p>
              <ul className="text-sm list-disc list-inside">
                {sampleStudents.map((s) => (
                  <li key={s.name}>
                    {s.name} – {s.marks}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              ➡️
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
              <p className="font-medium">Total Marks:</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalMarks}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                (using <code>.reduce()</code>)
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Code Examples (EditableCodeBlock) */}
        <section
          className="fade-slide-up space-y-6"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">📝</span>
            Deep Dive with Editable Examples
          </h2>

          <JavaScriptEditableCodeBlock
            title="Example 1: Totals – sum, average, product"
            initialCode={totalsExample}
          />

          <JavaScriptEditableCodeBlock
            title="Example 2: Grouping – by city, by category"
            initialCode={groupingExample}
          />

          <JavaScriptEditableCodeBlock
            title="Example 3: Analytics – count, min, max, frequency"
            initialCode={analyticsExample}
          />
        </section>

        {/* Section 5: Common Pitfalls */}
        <section
          className="fade-slide-up bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-400"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400">⚠️</span>
            Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Forgetting the initial value:</strong> If you omit it,
              reduce uses the first element as accumulator and starts from the
              second. This can cause errors (e.g., when summing objects).
            </li>
            <li>
              <strong>Mutating the accumulator accidentally:</strong> Always
              return a new accumulator or copy if you need immutability.
            </li>
            <li>
              <strong>Not returning anything:</strong> The reducer must return
              the updated accumulator; otherwise you get <code>undefined</code>.
            </li>
            <li>
              <strong>Using reduce when simpler methods exist:</strong> For
              simple sums, <code>forEach</code> or <code>for...of</code> might be
              more readable.
            </li>
          </ul>
        </section>

        {/* Section 6: Best Practices & Tips */}
        <section
          className="fade-slide-up bg-green-50 dark:bg-green-900/20 p-6 rounded-xl"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">💡</span>
            Best Practices & Tips
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Always provide an initial value</strong> – it makes the
              code predictable and handles empty arrays gracefully.
            </li>
            <li>
              <strong>Use descriptive accumulator names</strong> like{" "}
              <code>total</code>, <code>grouped</code>, <code>stats</code>.
            </li>
            <li>
              <strong>For complex accumulators (objects/arrays),</strong> return
              a new copy to avoid side effects (e.g.,{" "}
              <code>{`{...acc, [key]: value}`}</code>).
            </li>
            <li>
              <strong>Combine with other methods:</strong> Often you filter or
              map before reducing for cleaner logic.
            </li>
            <li>
              <strong>Use <code>reduceRight</code></strong> when you need to
              process from right to left (e.g., nested structure evaluation).
            </li>
          </ul>
        </section>

        {/* Section 7: Mini Checklist */}
        <section
          className="fade-slide-up bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl"
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">✅</span>
            Mini Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>I can calculate a sum, average, or product using reduce.</li>
            <li>I can group objects by a property into an object.</li>
            <li>I can count occurrences of values.</li>
            <li>I can find min/max using reduce.</li>
            <li>I understand the role of the initial value.</li>
          </ul>
        </section>

        {/* Section 8: Teacher's Note */}
        <section
          className="fade-slide-up bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg"
          style={{ animationDelay: "0.8s" }}
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
              "Reduce is the most powerful array method, but also the most
              intimidating. Start with simple sums, then move to grouping. I tell
              my students: <strong>think of reduce as a conveyor belt</strong>{" "}
              where each item adds something to a growing package. Use
              <code>console.log(acc)</code> inside the reducer to see the
              progress — it's the best way to debug."
            </p>
          </div>
        </section>

        {/* Section 9: Hint Section */}
        <section
          className="fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl"
          style={{ animationDelay: "0.9s" }}
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">💭</span>
            Hint — Think about…
          </h2>
          <p>
            How would you use reduce to transform an array of students into an
            object where keys are cities and values are arrays of student names?
            Try to sketch the reducer function before looking at Example 2.
          </p>
        </section>

        {/* Section 10: SVG illustration – conveyor belt analogy */}
        <section
          className="fade-slide-up flex justify-center py-4"
          style={{ animationDelay: "1.0s" }}
        >
          <svg
            width="400"
            height="160"
            viewBox="0 0 400 160"
            className="transition-transform duration-300 hover:scale-105"
          >
            {/* Conveyor belt line */}
            <line
              x1="20"
              y1="100"
              x2="380"
              y2="100"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="6 6"
            />
            {/* Items on belt */}
            <circle cx="60" cy="80" r="12" fill="none" stroke="currentColor" strokeWidth="2">
              <animate attributeName="r" values="12;15;12" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="55" y="85" fontSize="10" fill="currentColor">S</text>
            <circle cx="120" cy="80" r="12" fill="none" stroke="currentColor" strokeWidth="2">
              <animate attributeName="r" values="12;15;12" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <text x="115" y="85" fontSize="10" fill="currentColor">T</text>
            <circle cx="180" cy="80" r="12" fill="none" stroke="currentColor" strokeWidth="2">
              <animate attributeName="r" values="12;15;12" dur="2s" begin="0.6s" repeatCount="indefinite" />
            </circle>
            <text x="175" y="85" fontSize="10" fill="currentColor">A</text>

            {/* Accumulator box */}
            <rect x="280" y="40" width="100" height="60" rx="8" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <text x="300" y="70" fontSize="12" fill="#3b82f6" fontWeight="bold">accumulator</text>
            <text x="310" y="90" fontSize="10" fill="currentColor">(growing)</text>

            {/* Arrow from items to box */}
            <line x1="200" y1="80" x2="270" y2="70" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
              </marker>
            </defs>

            {/* Label */}
            <text x="20" y="140" fontSize="12" fill="currentColor">{`reduce( (acc, item) => newAcc, initial )`}</text>
          </svg>
        </section>
      </div>
    </div>
  );
};

export default Topic11;