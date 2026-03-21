import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import fixedArrayExample from './topic2_files/fixed_array_example.c?raw';
import dynamicArrayExample from './topic2_files/dynamic_array_example.c?raw';
import stringInputExample from './topic2_files/string_input_example.c?raw';

// Keyframes for reveal animations (inline style)
const keyframesStyle = `
  @keyframes fadeSlideUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .animate-fade-slide-up {
      animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-slide-up {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Topic2 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // real-world scenarios
    '300ms',  // svg
    '400ms',  // code examples
    '500ms',  // pitfalls
    '600ms',  // best practices
    '700ms',  // checklist
    '800ms',  // hints
    '900ms',  // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Why Dynamic Memory Allocation?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            When static and stack memory just aren't enough — the real‑world need for flexibility.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The Limitations of Static & Stack Memory
          </h2>
          <p className="leading-relaxed mb-3">
            In many real‑world programs, you don't know how much memory you'll need until runtime.
            Static (global) memory and stack memory are both <strong>fixed‑size</strong> and determined
            at compile time. This leads to two major problems:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>Waste:</strong> Allocating large buffers “just in case” wastes memory.</li>
            <li><strong>Overflow:</strong> If the actual size exceeds the allocated buffer, the program crashes or corrupts data.</li>
          </ul>
          <p>
            Dynamic memory allocation (<code>malloc</code>, <code>calloc</code>, <code>realloc</code>)
            solves these problems by letting you request memory <strong>at runtime</strong> and resize it as needed.
          </p>
        </section>

        {/* Real‑world scenarios */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            🌍 Real‑World Scenarios That Demand Dynamic Memory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <h3 className="text-xl font-medium">📁 File Processing</h3>
              <p className="mt-2 leading-relaxed">
                When reading a file, you often don't know its size in advance. Dynamically allocating a buffer
                that can grow as you read ensures you can handle any file without wasting memory.
              </p>
              <div className="mt-3 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                // read entire file into memory<br/>
                char *buffer = malloc(initial_size);<br/>
                // read and realloc if needed
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <h3 className="text-xl font-medium">📋 Dynamic Collections</h3>
              <p className="mt-2 leading-relaxed">
                Data structures like linked lists, trees, or hash tables need to grow and shrink during
                execution. Each node is allocated on the heap, allowing the structure to scale dynamically.
              </p>
              <div className="mt-3 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                struct Node {`{ int data; struct Node *next; };`}<br/>
                struct Node *newNode = malloc(sizeof(struct Node));
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <h3 className="text-xl font-medium">⌨️ User Input</h3>
              <p className="mt-2 leading-relaxed">
                When asking a user for input (e.g., a name or a sentence), you cannot know its length
                beforehand. A dynamic string buffer can grow to accommodate any input.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <h3 className="text-xl font-medium">🧩 Plugin Systems & Runtime Configuration</h3>
              <p className="mt-2 leading-relaxed">
                Modern applications load plugins or configuration files at runtime. The number and size
                of these are unknown at compile time, making dynamic allocation essential.
              </p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🖼️ Static vs Dynamic Memory
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 300" className="w-full h-auto" aria-label="Comparison of static and dynamic memory">
              <rect width="800" height="300" fill="transparent" />

              {/* Static (stack) region */}
              <rect x="50" y="50" width="300" height="200" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" rx="8" />
              <text x="60" y="80" fill="currentColor" className="text-sm font-mono">Static/Stack (fixed size)</text>
              <rect x="70" y="100" width="260" height="30" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1" />
              <text x="80" y="120" fill="currentColor" className="text-xs">pre‑allocated buffer</text>
              <line x1="70" y1="140" x2="330" y2="140" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
              <text x="150" y="135" fill="#ef4444" className="text-xs">if input exceeds → crash</text>

              {/* Dynamic (heap) region */}
              <rect x="450" y="50" width="300" height="200" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" rx="8" />
              <text x="460" y="80" fill="currentColor" className="text-sm font-mono">Heap (dynamic allocation)</text>
              <rect x="470" y="100" width="150" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="480" y="120" fill="currentColor" className="text-xs">malloc(initial)</text>
              <rect x="470" y="150" width="200" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="480" y="170" fill="currentColor" className="text-xs">realloc(larger)</text>
              <rect x="470" y="200" width="100" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="480" y="220" fill="currentColor" className="text-xs">free()</text>
              <text x="470" y="250" fill="currentColor" className="text-xs">can grow/shrink at runtime</text>

              {/* Arrow from static to heap */}
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                </marker>
              </defs>
              <line x1="350" y1="150" x2="450" y2="150" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="380" y="140" fill="#6b7280" className="text-xs">dynamic memory solves</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code Examples
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Example 1: Fixed array (the problem)"
              initialCode={fixedArrayExample}
            />
            <EditableCCodeBlock
              title="Example 2: Dynamic array (the solution)"
              initialCode={dynamicArrayExample}
            />
            <EditableCCodeBlock
              title="Example 3: Dynamic string input"
              initialCode={stringInputExample}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Forgetting to allocate enough memory:</strong> Off‑by‑one errors are common (e.g., forgetting space for null terminator).</li>
            <li><strong>Not checking allocation success:</strong> <code>malloc</code> can return <code>NULL</code>; using it leads to crashes.</li>
            <li><strong>Memory leaks:</strong> Failing to free memory when it's no longer needed.</li>
            <li><strong>Using stack for large data:</strong> Large local arrays cause stack overflow.</li>
            <li><strong>Mixing allocation types:</strong> Trying to <code>free</code> a stack variable leads to undefined behavior.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always check return value of <code>malloc</code>/<code>calloc</code> and handle allocation failure.</li>
              <li>✔️ For dynamic arrays, start with a reasonable initial capacity and double when full (amortized O(1)).</li>
              <li>✔️ Use <code>realloc</code> to resize only when necessary; avoid calling it on every insertion.</li>
              <li>✔️ Always <code>free</code> memory in the reverse order of allocation to reduce fragmentation.</li>
              <li>✔️ Set pointers to <code>NULL</code> after <code>free</code> to avoid dangling pointers.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I can explain why static/stack memory is not always sufficient.</li>
              <li>☐ I understand when to use dynamic memory (unknown size at compile time, large data, long‑lived data).</li>
              <li>☐ I always check <code>malloc</code> return value.</li>
              <li>☐ I am aware of the dangers of fixed‑size buffers (buffer overflows).</li>
              <li>☐ I know that dynamic memory must be manually freed.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Try changing this...</p>
            <ul className="list-disc list-inside mt-2">
              <li>In the fixed array example, increase the input size beyond 10. What happens?</li>
              <li>In the dynamic array example, what if you forget to <code>free</code> the memory? Run with many operations and observe memory usage.</li>
              <li>What happens if you try to <code>realloc</code> a pointer that wasn't allocated with <code>malloc</code>?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> or sanitizers to detect memory leaks and invalid accesses.</p>
            <p><strong>📦 Performance consideration:</strong> Frequent small allocations can cause fragmentation; consider using memory pools or custom allocators.</p>
            <p><strong>🧹 RAII in C++:</strong> In C++, use smart pointers to automate deallocation; in C, be disciplined.</p>
            <p><strong>📏 Growth strategy:</strong> For dynamic arrays, multiply capacity by a factor (e.g., 1.5 or 2) to achieve amortized O(1) insertion.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Dynamic memory allocation is like renting a warehouse: you pay for exactly what you need, and you must return it when done. Always think about the lifetime of your data. If you allocate memory in one function and need it later, that's a clue that you should use the heap!"
        />
      </div>
    </>
  );
};

export default Topic2;