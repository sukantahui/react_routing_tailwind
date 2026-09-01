import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic0_files/example1.c?raw";
import example2 from "./topic0_files/example2.c?raw";
import example3 from "./topic0_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic0 = () => {
  // Calculate teacher's experience dynamically
  const startYear = 1998;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;

  return (
    <div className="dark" style={{ backgroundColor: "#121212" }}> {/* dark mode default */}
      <style>{animationStyles}</style>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Title section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate">
          <h1 className="text-4xl font-light tracking-tight leading-tight">
            Topic 0: Creating arrays and accessing elements by index
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            Your first step into the world of arrays – how to build them and how to talk to each element individually.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">📘 What is an array?</h2>
          <p className="leading-relaxed">
            An array is a collection of elements of the same type placed in contiguous memory locations. Think of it like a row of lockers in your school corridor – each locker (element) has a fixed position (index) and can hold one item.
          </p>
          <p className="leading-relaxed mt-4">
            In C, we declare an array like this: <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">int marks[5];</code> – this creates 5 integer lockers. To access a specific locker, we use its <strong>index</strong> inside square brackets: <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">marks[2] = 85;</code> (that's the third locker – more on zero‑based indexing later).
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">✨ Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, teacher Sukanta Hui stores the marks of 30 students in an array <code className="bg-blue-100 dark:bg-gray-800 px-1 py-0.5 rounded">marks[30]</code>. The index <code>0</code> holds Swadeep's marks, index <code>1</code> holds Tuhina's, and so on.
            </p>
          </div>
        </section>

        {/* SVG Illustration: array with indices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🧩 Array layout in memory</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="400" height="120" viewBox="0 0 400 120" className="max-w-full h-auto">
              {/* Row of boxes */}
              {[0,1,2,3,4].map((i) => (
                <g key={i}>
                  <rect
                    x={40 + i*70}
                    y="20"
                    width="60"
                    height="60"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    rx="4"
                    className="transition-all duration-300 hover:stroke-4 hover:stroke-blue-400"
                  />
                  <text
                    x={40 + i*70 + 30}
                    y="55"
                    textAnchor="middle"
                    fill="currentColor"
                    className="text-sm font-mono"
                  >
                    {i === 0 ? '89' : i === 1 ? '72' : i === 2 ? '94' : i === 3 ? '68' : '77'}
                  </text>
                  <text
                    x={40 + i*70 + 30}
                    y="95"
                    textAnchor="middle"
                    fill="#6b7280"
                    className="text-xs"
                  >
                    [{i}]
                  </text>
                </g>
              ))}
              {/* Arrow pointing to index 2 */}
              <line x1="190" y1="85" x2="190" y2="70" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="200" y="100" fill="#ef4444" className="text-xs">marks[2] = 94</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Each box holds a value; the number below is the index you use to reach it.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 See it in C</h2>

          <EditableCCodeBlock
            title="Example 1: Declaring and accessing an array"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Observe how <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">marks[2]</code> gives the <strong>third</strong> element because we start counting at 0.
          </p>

          <EditableCCodeBlock
            title="Example 2: Array initialization"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Using a loop to access all elements"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Use named constants for array size</strong> – <code>#define STUDENTS 30</code> makes your code self‑documenting and easy to change.</li>
            <li><strong>Always initialize arrays</strong> – uninitialized arrays contain garbage values, leading to unpredictable bugs. Use <code>= {0};</code> to zero out.</li>
            <li><strong>Remember zero‑based indexing</strong> – the last valid index is <code>size-1</code>. A common industry shorthand: “index = position – 1”.</li>
            <li><strong>sizeof trick</strong> – <code>int n = sizeof(marks) / sizeof(marks[0]);</code> gives the number of elements (works only in the same scope).</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Off‑by‑one errors</p>
              <p className="text-sm">Accessing <code>marks[5]</code> in an array of size 5 – the valid indices are 0–4. This compiles but reads/writes memory that doesn't belong to the array.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Uninitialized access</p>
              <p className="text-sm"><code>int arr[5]; printf("%d", arr[0]);</code> – prints garbage. Always initialize.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Confusing declaration with access</p>
              <p className="text-sm"><code>int arr[5]</code> (declaration) vs <code>arr[2] = 10</code> (access). The brackets have different meanings.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Always check index bounds if the index comes from user input or calculation.</li>
            <li>Use <code>size_t</code> for array indices (unsigned type) to avoid negative indices.</li>
            <li>Prefer <code>for</code> loops when you know the size; they clearly express iteration over indices.</li>
            <li>Document any non‑obvious index usage (e.g., “index 0 stores the head of the list”).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Arrays are zero‑indexed.</li>
            <li>✔️ Declaration: <code>type name[size];</code></li>
            <li>✔️ Access: <code>name[index]</code></li>
            <li>✔️ Valid indices: <code>0</code> to <code>size-1</code></li>
            <li>✔️ Always initialize before use.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “When you see <code>marks[3]</code>, ask yourself: <strong>which student's marks am I looking at?</strong> If the array starts at 0, index 3 corresponds to the <strong>fourth</strong> student – say, Ritaja.”
          </p>
          <p className="italic mt-2">
            Try changing the value of <code>marks[1]</code> in Example 1 and see how it affects the output.
          </p>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[900ms] p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-medium mb-2">🧑‍🏫 Teacher's Note – Sukanta Hui</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Sukanta Hui</strong> (email: <a href="mailto:sukantahui@codernaccotax.co.in" className="underline">sukantahui@codernaccotax.co.in</a>, mobile: 7003756860) has been teaching programming for <strong>{experienceYears} years</strong> (since 1998). His expertise spans Programming Languages, RDBMS, Operating Systems, and Web Development.
            </p>
            <p className="mt-2">
              💬 “When I introduce arrays at <strong>Naihati CNAT</strong>, I tell students: <em>An array is like a row of houses – each house has a unique number (index). You can't change the house number, but you can change who lives there.</em> Remember: the first house is number 0, not 1. This tiny shift in thinking saves hours of debugging.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> Always distinguish between <em>declaring</em> an array and <em>accessing</em> an element. In declaration the size goes inside <code>[]</code>; in access it's the index.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic0;