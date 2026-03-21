import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import mallocExample from './topic3_files/malloc_example.c?raw';
import callocExample from './topic3_files/calloc_example.c?raw';
import compareExample from './topic3_files/compare_example.c?raw';

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

const Topic3 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // malloc
    '300ms',  // calloc
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
            malloc & calloc — Allocating Heap Memory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Requesting memory from the heap: the essential tools for dynamic memory management.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The Heap Allocation Functions
          </h2>
          <p className="leading-relaxed mb-3">
            The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">malloc()</code> (memory allocation) and{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">calloc()</code> (contiguous allocation) functions
            are the primary ways to obtain memory from the heap. Both are declared in <code>&lt;stdlib.h&gt;</code>.
          </p>
          <p className="leading-relaxed">
            They return a pointer to the allocated memory block (or <code>NULL</code> on failure) and the allocated memory
            remains valid until you explicitly free it with <code>free()</code>.
          </p>
        </section>

        {/* malloc */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📦 malloc — Uninitialized Memory
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <div className="font-mono text-sm mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
              void* malloc(size_t size);
            </div>
            <ul className="space-y-2">
              <li><strong>Purpose:</strong> Allocates <code>size</code> bytes of uninitialized memory.</li>
              <li><strong>Return type:</strong> <code>void*</code> (generic pointer). You cast it to the desired type.</li>
              <li><strong>When to use:</strong> When you need raw memory and will initialize it yourself immediately.</li>
              <li><strong>Key point:</strong> The memory contains garbage values — you must set it before reading.</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
              <p className="text-sm"><strong>⚠️ Important:</strong> Always check the return value against <code>NULL</code> before using the pointer.</p>
            </div>
          </div>
        </section>

        {/* calloc */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🧹 calloc — Zero‑Initialized Memory
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <div className="font-mono text-sm mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
              void* calloc(size_t nmemb, size_t size);
            </div>
            <ul className="space-y-2">
              <li><strong>Purpose:</strong> Allocates memory for an array of <code>nmemb</code> elements, each of <code>size</code> bytes, and initializes all bytes to zero.</li>
              <li><strong>Return type:</strong> <code>void*</code> (generic pointer).</li>
              <li><strong>When to use:</strong> When you need zero‑initialized memory (e.g., arrays, structures with default values).</li>
              <li><strong>Key point:</strong> <code>calloc</code> is slightly slower than <code>malloc</code> because it writes zeros, but it guarantees no garbage values.</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
              <p className="text-sm"><strong>💡 Tip:</strong> For large allocations, <code>calloc</code> might be more efficient because the OS can supply already zeroed pages.</p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ How malloc & calloc Work
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 280" className="w-full h-auto" aria-label="malloc vs calloc illustration">
              <rect width="800" height="280" fill="transparent" />

              {/* malloc block */}
              <rect x="50" y="30" width="300" height="100" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" rx="6" />
              <text x="60" y="55" fill="currentColor" className="text-sm font-mono">malloc(10 * sizeof(int))</text>
              <rect x="70" y="70" width="260" height="45" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 2" />
              <text x="80" y="95" fill="currentColor" className="text-xs">uninitialized (garbage values)</text>
              <text x="80" y="115" fill="currentColor" className="text-xs">must set before use</text>

              {/* calloc block */}
              <rect x="450" y="30" width="300" height="100" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" rx="6" />
              <text x="460" y="55" fill="currentColor" className="text-sm font-mono">calloc(10, sizeof(int))</text>
              <rect x="470" y="70" width="260" height="45" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              <text x="480" y="85" fill="currentColor" className="text-xs">all bytes set to 0</text>
              <text x="480" y="105" fill="currentColor" className="text-xs">safe to use immediately</text>

              {/* comparison arrows */}
              <defs>
                <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                </marker>
              </defs>
              <line x1="350" y1="80" x2="450" y2="80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow2)" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="380" y="70" fill="#6b7280" className="text-xs">both allocate heap memory</text>

              {/* memory layout example */}
              <text x="50" y="200" fill="currentColor" className="text-sm font-semibold">malloc result:</text>
              <rect x="50" y="210" width="300" height="30" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="1" />
              <text x="60" y="230" fill="currentColor" className="text-xs">0x?? | 0x?? | 0x?? | 0x?? ... (unknown)</text>

              <text x="450" y="200" fill="currentColor" className="text-sm font-semibold">calloc result:</text>
              <rect x="450" y="210" width="300" height="30" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1" />
              <text x="460" y="230" fill="currentColor" className="text-xs">0x00 | 0x00 | 0x00 | 0x00 ... (all zero)</text>
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
              title="Example 1: malloc for a single integer"
              initialCode={mallocExample}
            />
            <EditableCCodeBlock
              title="Example 2: calloc for an array of structures"
              initialCode={callocExample}
            />
            <EditableCCodeBlock
              title="Example 3: Comparing malloc vs calloc"
              initialCode={compareExample}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Not checking return value:</strong> Using a <code>NULL</code> pointer leads to crash.</li>
            <li><strong>Forgetting to cast:</strong> In C, <code>void*</code> is implicitly convertible, but explicit cast improves readability.</li>
            <li><strong>Under‑allocating:</strong> Forgetting to multiply by <code>sizeof(type)</code> (e.g., <code>malloc(10)</code> instead of <code>malloc(10 * sizeof(int))</code>).</li>
            <li><strong>Assuming <code>malloc</code> zeros memory:</strong> It doesn't — reading uninitialized memory leads to undefined behavior.</li>
            <li><strong>Using <code>calloc</code> with zero elements:</strong> It may return a non‑<code>NULL</code> pointer that cannot be dereferenced.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always check the return value of <code>malloc</code>/<code>calloc</code> and handle failure gracefully.</li>
              <li>✔️ Use <code>sizeof(*ptr)</code> to avoid type errors: <code>malloc(sizeof(*ptr))</code>.</li>
              <li>✔️ Prefer <code>calloc</code> when you need zero‑initialized memory; it's clearer and often safer.</li>
              <li>✔️ Cast the result to the target pointer type for clarity (though not strictly required in C).</li>
              <li>✔️ Keep track of allocated sizes to avoid buffer overflows.</li>
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
              <li>☐ I know the prototypes of <code>malloc</code> and <code>calloc</code>.</li>
              <li>☐ I always check for <code>NULL</code> after allocation.</li>
              <li>☐ I understand the difference between uninitialized (<code>malloc</code>) and zero‑initialized (<code>calloc</code>) memory.</li>
              <li>☐ I correctly compute allocation size using <code>sizeof</code>.</li>
              <li>☐ I know that both allocate from the heap and require a matching <code>free</code>.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Try changing this...</p>
            <ul className="list-disc list-inside mt-2">
              <li>What happens if you forget to multiply by <code>sizeof(int)</code> in <code>malloc(10)</code> and then assign integers?</li>
              <li>Modify the malloc example to use <code>calloc</code> and see how the output changes.</li>
              <li>What if you request zero bytes with <code>malloc(0)</code> or <code>calloc(0, 0)</code>? Check the standard.</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> to detect reads of uninitialized memory from <code>malloc</code>.</p>
            <p><strong>📦 Performance:</strong> For large allocations, <code>malloc</code> is often faster because <code>calloc</code> writes zeros; but <code>calloc</code> can be optimized by the OS.</p>
            <p><strong>🧹 Safety:</strong> In C++, prefer <code>new</code>/<code>delete</code> or containers; in C, always pair allocation with <code>free</code> in a clear scope.</p>
            <p><strong>📏 Readability:</strong> Use a macro like <code>#define NEW_ARRAY(type, n) (type*)calloc(n, sizeof(type))</code> to simplify code.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="malloc and calloc are your gateways to the heap. Remember: malloc gives you a blank canvas with random paint, calloc gives you a clean white canvas. Always initialize your memory before use — that's the difference between predictable behavior and mysterious bugs. And never forget to free!"
        />
      </div>
    </>
  );
};

export default Topic3;