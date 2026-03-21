import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import simpleDynamicArray from './topic9_files/simple_dynamic_array.c?raw';
import dynamicArrayWithGrowth from './topic9_files/dynamic_array_growth.c?raw';
import dynamicArrayWithShrink from './topic9_files/dynamic_array_shrink.c?raw';

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

const Topic9 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // concept
    '300ms',  // implementation
    '400ms',  // svg
    '500ms',  // code examples
    '600ms',  // pitfalls
    '700ms',  // best practices
    '800ms',  // checklist
    '900ms',  // hints
    '1000ms', // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Building Dynamic Arrays (Resizable Arrays)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Creating flexible containers that grow and shrink as needed — the C way.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The Need for Resizable Arrays
          </h2>
          <p className="leading-relaxed mb-3">
            In many real-world scenarios, you don't know how many elements you'll need at compile time.
            A dynamic array (often called a <strong>vector</strong> or <strong>resizable array</strong>) solves
            this by automatically managing memory. It starts with a small capacity and grows (or shrinks)
            as elements are added or removed.
          </p>
          <p className="leading-relaxed">
            This topic shows you how to build such a structure from scratch using <code>malloc</code>,
            <code>realloc</code>, and <code>free</code>. Understanding this builds a solid foundation for
            understanding higher‑level containers like C++ <code>std::vector</code>.
          </p>
        </section>

        {/* Core Concepts */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📦 Anatomy of a Dynamic Array
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              A dynamic array is typically implemented as a structure containing:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong>data</strong> – pointer to the heap‑allocated block of memory.</li>
              <li><strong>size</strong> – current number of elements stored.</li>
              <li><strong>capacity</strong> – total number of elements that can be stored without reallocation.</li>
            </ul>
            <p>When you add an element and <code>size == capacity</code>, you grow the array — usually doubling the capacity — using <code>realloc</code>. Similarly, you may shrink when too much memory is unused.</p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
              <p className="text-sm"><strong>💡 Strategy:</strong> Doubling capacity ensures amortized O(1) insertion, because reallocations happen rarely.</p>
            </div>
          </div>
        </section>

        {/* Implementation Steps */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Implementing the Core Operations
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-medium mb-2">Initialization</h3>
            <p className="font-mono text-sm mb-3">create(initial_capacity) – allocate memory and set size=0, capacity=initial.</p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">Append / Push</h3>
            <p className="font-mono text-sm mb-3">if size == capacity → capacity *= 2; realloc; then store element at data[size++]</p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">Access</h3>
            <p className="font-mono text-sm mb-3">return data[index] (bounds checking optional)</p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">Remove / Pop</h3>
            <p className="font-mono text-sm mb-3">size--; optionally shrink if size is below a threshold (e.g., capacity/4)</p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">Destruction</h3>
            <p className="font-mono text-sm">free(data);</p>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Dynamic Array Growth
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 260" className="w-full h-auto" aria-label="Dynamic array growth">
              <rect width="800" height="260" fill="transparent" />

              {/* Initial state */}
              <text x="50" y="30" fill="currentColor" className="text-sm">Initial: capacity=4, size=3</text>
              <rect x="50" y="50" width="320" height="50" fill="none" stroke="#3b82f6" strokeWidth="2" rx="4" />
              {[70, 130, 190, 250].map((x, i) => (
                <rect key={i} x={x} y="60" width="50" height="30" fill={i<3 ? "rgba(59,130,246,0.2)" : "rgba(156,163,175,0.2)"} stroke={i<3 ? "#3b82f6" : "#9ca3af"} strokeWidth="1" />
              ))}
              <text x="85" y="80" fill="currentColor">A</text>
              <text x="145" y="80" fill="currentColor">B</text>
              <text x="205" y="80" fill="currentColor">C</text>
              <text x="265" y="80" fill="gray">-</text>

              {/* After append, grow */}
              <text x="50" y="130" fill="currentColor" className="text-sm">Append D → capacity doubled to 8, size=4</text>
              <rect x="50" y="150" width="560" height="50" fill="none" stroke="#22c55e" strokeWidth="2" rx="4" />
              {[70, 130, 190, 250, 310, 370, 430, 490].map((x, i) => (
                <rect key={i} x={x} y="160" width="50" height="30" fill={i<4 ? "rgba(34,197,94,0.2)" : "rgba(156,163,175,0.2)"} stroke={i<4 ? "#22c55e" : "#9ca3af"} strokeWidth="1" />
              ))}
              <text x="85" y="180" fill="currentColor">A</text>
              <text x="145" y="180" fill="currentColor">B</text>
              <text x="205" y="180" fill="currentColor">C</text>
              <text x="265" y="180" fill="currentColor">D</text>

              {/* Arrow */}
              <defs>
                <marker id="arrow9" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#22c55e" />
                </marker>
              </defs>
              <line x1="380" y1="80" x2="380" y2="150" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow9)" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="390" y="115" fill="#22c55e" className="text-xs">realloc</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code Examples
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Example 1: Simple dynamic array"
              initialCode={simpleDynamicArray}
            />
            <EditableCCodeBlock
              title="Example 2: Growth strategy (doubling)"
              initialCode={dynamicArrayWithGrowth}
            />
            <EditableCCodeBlock
              title="Example 3: Shrinking strategy"
              initialCode={dynamicArrayWithShrink}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Forgetting to update capacity after realloc:</strong> leads to buffer overflows.</li>
            <li><strong>Not checking realloc return value:</strong> if it fails, you lose the original pointer.</li>
            <li><strong>Growing by a fixed amount (e.g., +1):</strong> results in O(n²) insertion cost.</li>
            <li><strong>Shrinking too aggressively:</strong> can cause repeated reallocations when elements are added/removed frequently (thrashing).</li>
            <li><strong>Not freeing memory on destruction:</strong> memory leak.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Use a growth factor (typically 2 or 1.5) to achieve amortized O(1) insertion.</li>
              <li>✔️ Store capacity and size as separate variables to avoid expensive <code>sizeof</code> calculations.</li>
              <li>✔️ When shrinking, consider a threshold (e.g., shrink when size ≤ capacity/4) to avoid thrashing.</li>
              <li>✔️ Always use a temporary pointer for <code>realloc</code> and check for failure.</li>
              <li>✔️ Provide clear interfaces: functions like <code>append</code>, <code>get</code>, <code>set</code>, <code>free</code>.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I understand the three components: data pointer, size, capacity.</li>
              <li>☐ I know how to grow an array using realloc with doubling strategy.</li>
              <li>☐ I can implement a safe realloc check with a temporary pointer.</li>
              <li>☐ I can shrink an array safely (optional).</li>
              <li>☐ I can free the entire dynamic array when done.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Think about...</p>
            <ul className="list-disc list-inside mt-2">
              <li>What would happen if you use <code>realloc</code> on every append (growth factor 1)? How does performance change?</li>
              <li>If you allocate 1 million elements, what's the memory overhead of storing size and capacity?</li>
              <li>How would you handle insertion in the middle? Would you need to shift elements?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> to check for memory leaks and off‑by‑one errors.</p>
            <p><strong>📦 Performance:</strong> For large arrays, preallocate capacity to avoid reallocations (e.g., <code>reserve()</code>).</p>
            <p><strong>🧹 Code reuse:</strong> Implement dynamic arrays generically using <code>void*</code> and element size (like <code>qsort</code>).</p>
            <p><strong>📏 Memory overhead:</strong> For tiny elements, store pointers to heap objects or use a pool allocator.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Building your own dynamic array is a rite of passage for C programmers. The doubling strategy is not just a trick — it's a proven technique used in C++ std::vector and many other containers. Mastering this will give you deep insight into how high‑level languages manage memory under the hood."
        />
      </div>
    </>
  );
};

export default Topic9;