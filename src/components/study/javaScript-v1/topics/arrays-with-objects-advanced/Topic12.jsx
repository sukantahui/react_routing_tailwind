// Topic12.jsx
import React from "react";
import clsx from "clsx";
import JavaScriptEditableCodeBlock from "../../../../../common/JavaScriptEditableCodeBlock";

// Import raw code examples (grouped into 4 files)
import basicsExamples from "./topic12_files/reduce_examples_basics.js?raw";
import statsExamples from "./topic12_files/reduce_examples_stats.js?raw";
import structuresExamples from "./topic12_files/reduce_examples_structures.js?raw";
import advancedExamples from "./topic12_files/reduce_examples_advanced.js?raw";

// Teacher info – Sukanta Hui
const currentYear = new Date().getFullYear();
const experience = currentYear - 1998; // Started in 1998

const Topic12 = () => {
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
            🔁 Topic 12: 20 Different Examples of reduce()
          </h1>
          <p className="text-lg">
            The <code>.reduce()</code> method is incredibly versatile. This
            topic presents 20 practical examples covering common use cases — from
            simple sums to advanced data transformations.
          </p>
        </section>

        {/* Section 2: Signature & Purpose (quick recap) */}
        <section
          className="fade-slide-up bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">📐</span>
            Quick Recap: reduce() Signature
          </h2>
          <pre className="bg-white dark:bg-gray-950 p-3 rounded-md overflow-x-auto text-sm">
            {`array.reduce((accumulator, currentValue, index, array) => {
  // return updated accumulator
}, initialValue);`}
          </pre>
          <p className="mt-3">
            <strong>Return type:</strong> Any — number, string, object, array.
          </p>
        </section>

        {/* Section 3: Table of contents (visual) */}
        <section
          className="fade-slide-up bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">📋</span>
            What You'll Learn – 20 Examples
          </h2>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>1. Sum of numbers</li>
              <li>2. Average</li>
              <li>3. Product</li>
              <li>4. Concatenate strings</li>
              <li>5. Find maximum</li>
              <li>6. Find minimum</li>
              <li>7. Count occurrences</li>
              <li>8. Group by property</li>
              <li>9. Flatten array of arrays</li>
              <li>10. Array → object (key-value)</li>
            </ul>
            <ul className="list-disc list-inside space-y-1">
              <li>11. Remove duplicates</li>
              <li>12. Partition into two arrays</li>
              <li>13. Running total</li>
              <li>14. Frequency map</li>
              <li>15. Statistics (mean, median, mode)</li>
              <li>16. Merge objects</li>
              <li>17. Lookup table</li>
              <li>18. Validate all (like every)</li>
              <li>19. Check any (like some)</li>
              <li>20. Chaining inside reduce</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Example Group 1 – Basics (1–5) */}
        <section
          className="fade-slide-up space-y-4"
          style={{ animationDelay: "0.4s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">1️⃣</span>
            Basics: Sum, Average, Product, String Concat, Max
          </h2>
          <JavaScriptEditableCodeBlock
            title="Examples 1–5: Basic reduce operations"
            initialCode={basicsExamples}
          />
        </section>

        {/* Section 5: Example Group 2 – Statistics (6–10) */}
        <section
          className="fade-slide-up space-y-4"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">2️⃣</span>
            Statistics: Min, Count, Group, Flatten, Key-Value
          </h2>
          <JavaScriptEditableCodeBlock
            title="Examples 6–10: Statistical and grouping operations"
            initialCode={statsExamples}
          />
        </section>

        {/* Section 6: Example Group 3 – Data Structures (11–15) */}
        <section
          className="fade-slide-up space-y-4"
          style={{ animationDelay: "0.6s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">3️⃣</span>
            Data Structures: Dedupe, Partition, Running Total, Frequency, Stats
          </h2>
          <JavaScriptEditableCodeBlock
            title="Examples 11–15: Building and transforming structures"
            initialCode={structuresExamples}
          />
        </section>

        {/* Section 7: Example Group 4 – Advanced (16–20) */}
        <section
          className="fade-slide-up space-y-4"
          style={{ animationDelay: "0.7s" }}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">4️⃣</span>
            Advanced: Merge, Lookup, Validation, Chaining
          </h2>
          <JavaScriptEditableCodeBlock
            title="Examples 16–20: Advanced reduce patterns"
            initialCode={advancedExamples}
          />
        </section>

        {/* Section 8: Common Pitfalls */}
        <section
          className="fade-slide-up bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-400"
          style={{ animationDelay: "0.8s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400">⚠️</span>
            Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Initial value mismatch:</strong> For sums, start with 0;
              for products, start with 1; for objects, start with {`{}`}.
            </li>
            <li>
              <strong>Mutating accumulator:</strong> Directly modifying objects
              or arrays inside the reducer can cause side effects. Return a new
              value or copy.
            </li>
            <li>
              <strong>Empty array without initial value:</strong> Throws an
              error. Always provide an initial value if the array might be empty.
            </li>
            <li>
              <strong>Overcomplicating:</strong> Sometimes a simple loop is more
              readable. Use reduce only when it clarifies the intent.
            </li>
          </ul>
        </section>

        {/* Section 9: Best Practices & Tips */}
        <section
          className="fade-slide-up bg-green-50 dark:bg-green-900/20 p-6 rounded-xl"
          style={{ animationDelay: "0.9s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400">💡</span>
            Best Practices & Tips
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Name the accumulator meaningfully</strong> –{" "}
              <code>total</code>, <code>grouped</code>, <code>stats</code>.
            </li>
            <li>
              <strong>Use spread or <code>Object.assign</code></strong> to
              update objects immutably.
            </li>
            <li>
              <strong>Combine with other methods</strong> – filter first, then
              reduce, or use reduce to build a structure and then map.
            </li>
            <li>
              <strong>Add comments</strong> for complex reducers – explain what
              the accumulator holds.
            </li>
            <li>
              <strong>Practice with console.log(acc)</strong> inside the reducer
              to understand the transformation step by step.
            </li>
          </ul>
        </section>

        {/* Section 10: Mini Checklist */}
        <section
          className="fade-slide-up bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl"
          style={{ animationDelay: "1.0s" }}
        >
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">✅</span>
            Mini Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>I can write a sum, product, and average using reduce.</li>
            <li>I can group objects by a property.</li>
            <li>I can flatten an array of arrays.</li>
            <li>I can remove duplicates from an array.</li>
            <li>I can create a frequency map.</li>
            <li>I can build a lookup table (object from array).</li>
          </ul>
        </section>

        {/* Section 11: Teacher's Note */}
        <section
          className="fade-slide-up bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg"
          style={{ animationDelay: "1.1s" }}
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
              "Reduce is the chameleon of array methods. Once you master it, you
              can replace many other methods with a single reduce. But remember:
              clarity over cleverness. Use these 20 examples as a reference, but
              always ask yourself: does this reduce make the code easier to
              understand? If not, a simple loop might be better. Practice each
              example until you can write them from memory — that's when the
              pattern clicks."
            </p>
          </div>
        </section>

        {/* Section 12: Hint */}
        <section
          className="fade-slide-up bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl"
          style={{ animationDelay: "1.2s" }}
        >
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">💭</span>
            Hint — Observe carefully…
          </h2>
          <p>
            In example 17 (lookup table), notice how we convert an array of
            students into an object keyed by their name. This pattern is
            extremely useful for fast lookups. Try changing the key to something
            else (like id) and see how the output changes.
          </p>
        </section>

        {/* Section 13: SVG illustration – 20 examples flow */}
        <section
          className="fade-slide-up flex justify-center py-4"
          style={{ animationDelay: "1.3s" }}
        >
          <svg
            width="400"
            height="180"
            viewBox="0 0 400 180"
            className="transition-transform duration-300 hover:scale-105"
          >
            {/* Background */}
            <rect width="400" height="180" fill="none" />
            {/* Title */}
            <text x="20" y="30" fontSize="14" fill="currentColor" fontWeight="bold">
              20 reduce() examples →
            </text>
            {/* Array of small squares representing examples */}
            {Array.from({ length: 20 }, (_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              const x = 30 + col * 30;
              const y = 60 + row * 40;
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    rx="3"
                  >
                    <animate
                      attributeName="stroke"
                      values="currentColor; #3b82f6; currentColor"
                      dur="3s"
                      begin={`${i * 0.1}s`}
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x={x + 5} y={y + 15} fontSize="10" fill="currentColor">
                    {i + 1}
                  </text>
                </g>
              );
            })}
            {/* Arrow to result */}
            <line x1="280" y1="70" x2="350" y2="70" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="350" y="50" width="40" height="40" rx="4" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <text x="355" y="78" fontSize="12" fill="#3b82f6">🎯</text>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
              </marker>
            </defs>
          </svg>
        </section>
      </div>
    </div>
  );
};

export default Topic12;