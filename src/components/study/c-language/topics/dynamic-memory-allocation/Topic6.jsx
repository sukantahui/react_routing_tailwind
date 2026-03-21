import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import simpleFree from './topic6_files/simple_free.c?raw';
import freeNull from './topic6_files/free_null.c?raw';
import doubleFreeDemo from './topic6_files/double_free_demo.c?raw';

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

const Topic6 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // prototype
    '300ms',  // importance
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
            Releasing Memory with free
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            The art of giving back — why deallocation is just as important as allocation.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The Golden Rule: Every malloc Must Have a Free
          </h2>
          <p className="leading-relaxed mb-3">
            In C, the programmer is responsible for memory management. When you allocate memory on the heap,
            you must eventually return it to the system using <code>free()</code>. Failing to do so leads to
            <strong>memory leaks</strong> — a gradual exhaustion of available memory that can crash your program
            or even the whole system.
          </p>
          <p className="leading-relaxed">
            <code>free</code> tells the memory manager that the block is no longer needed, allowing it to be
            reused for future allocations. It's a simple function, but using it incorrectly can cause
            catastrophic bugs.
          </p>
        </section>

        {/* Prototype & Behaviour */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📜 free — Prototype & Behaviour
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="font-mono text-sm mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
              void free(void *ptr);
            </div>
            <ul className="space-y-2">
              <li><strong>Purpose:</strong> Deallocates memory previously allocated by <code>malloc</code>, <code>calloc</code>, or <code>realloc</code>.</li>
              <li><strong>Parameter:</strong> <code>ptr</code> – pointer to the memory block to be freed.</li>
              <li><strong>Return type:</strong> <code>void</code> (no return value).</li>
              <li><strong>If ptr is NULL:</strong> <code>free(NULL)</code> does nothing and is safe (by standard).</li>
              <li><strong>After free:</strong> The pointer becomes a <strong>dangling pointer</strong> — using it leads to undefined behavior.</li>
            </ul>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
              <p className="text-sm"><strong>⚠️ Critical:</strong> You must never free the same pointer twice (double free), free memory not obtained from the heap, or use freed memory.</p>
            </div>
          </div>
        </section>

        {/* Importance of Deallocation */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🚨 Why Deallocation Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">📉 Memory Leaks</h3>
              <p className="mt-2 leading-relaxed">
                Each allocation that is not freed consumes memory. In long‑running programs (servers, GUIs,
                embedded devices), leaks accumulate until the system runs out of memory, causing crashes or
                slowdowns.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">⚡ Performance</h3>
              <p className="mt-2 leading-relaxed">
                Proper freeing allows memory to be reused, reducing the need for new allocations from the OS
                and improving cache locality.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🔒 Stability</h3>
              <p className="mt-2 leading-relaxed">
                Forgetting to free leads to resource exhaustion. In embedded systems, this can brick devices.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">📦 Portability</h3>
              <p className="mt-2 leading-relaxed">
                Some environments (like real‑time OS) have limited heap; releasing memory correctly is mandatory.
              </p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing Free
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 260" className="w-full h-auto" aria-label="free memory illustration">
              <rect width="800" height="260" fill="transparent" />

              {/* Before free */}
              <rect x="50" y="30" width="300" height="100" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" rx="6" />
              <text x="60" y="55" fill="currentColor" className="text-sm">Heap before free</text>
              <rect x="70" y="70" width="260" height="40" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1" />
              <text x="80" y="95" fill="currentColor" className="text-xs">Allocated block (ptr)</text>

              {/* After free */}
              <rect x="450" y="30" width="300" height="100" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" rx="6" />
              <text x="460" y="55" fill="currentColor" className="text-sm">Heap after free</text>
              <rect x="470" y="70" width="260" height="40" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 2" />
              <text x="480" y="95" fill="currentColor" className="text-xs">Freed block (available for reuse)</text>

              {/* Arrow */}
              <defs>
                <marker id="arrowFree" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#22c55e" />
                </marker>
              </defs>
              <line x1="350" y1="80" x2="450" y2="80" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowFree)" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="380" y="70" fill="#22c55e" className="text-xs">free(ptr)</text>

              {/* Dangling pointer warning */}
              <rect x="50" y="170" width="700" height="50" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" rx="6" />
              <text x="60" y="200" fill="#ef4444" className="text-sm">⚠️ After free, ptr becomes a dangling pointer — do NOT dereference it!</text>
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
              title="Example 1: Simple malloc and free"
              initialCode={simpleFree}
            />
            <EditableCCodeBlock
              title="Example 2: free(NULL) is safe"
              initialCode={freeNull}
            />
            <EditableCCodeBlock
              title="Example 3: Double free (danger!)"
              initialCode={doubleFreeDemo}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Double free:</strong> Calling <code>free</code> twice on the same pointer leads to undefined behavior (crash or corruption).</li>
            <li><strong>Using after free:</strong> Dereferencing a freed pointer (dangling pointer) can cause crashes or silent data corruption.</li>
            <li><strong>Freeing non‑heap memory:</strong> Passing a pointer to stack or global variable to <code>free</code> is undefined.</li>
            <li><strong>Forgetting to free:</strong> Memory leaks, especially in loops or long‑running functions.</li>
            <li><strong>Not setting pointer to NULL after free:</strong> Leads to accidental reuse of freed memory.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always pair every <code>malloc</code>/<code>calloc</code>/<code>realloc</code> with a matching <code>free</code>.</li>
              <li>✔️ After freeing a pointer, set it to <code>NULL</code> to prevent dangling references.</li>
              <li>✔️ Free memory in the reverse order of allocation to reduce fragmentation.</li>
              <li>✔️ Use static analysis tools (like Valgrind) to detect leaks and double frees.</li>
              <li>✔️ In functions that allocate and return memory, document who is responsible for freeing.</li>
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
              <li>☐ I know that <code>free(NULL)</code> is safe and does nothing.</li>
              <li>☐ I understand that after <code>free</code>, the pointer becomes invalid.</li>
              <li>☐ I always set freed pointers to <code>NULL</code> to avoid accidental reuse.</li>
              <li>☐ I never double‑free.</li>
              <li>☐ I check for memory leaks using tools or careful design.</li>
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
              <li>In the double free example, uncomment the second <code>free</code> and see what happens.</li>
              <li>What happens if you call <code>free</code> on a pointer that was allocated on the stack?</li>
              <li>Use Valgrind to detect leaks in the "simple_free" example after removing the free call.</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> with <code>--leak-check=full</code> to find leaks and invalid frees.</p>
            <p><strong>📦 Resource management:</strong> In C, adopt a "cleanup" label pattern (goto cleanup) to ensure free in error paths.</p>
            <p><strong>🧹 RAII in C++:</strong> If you switch to C++, use smart pointers to automate deallocation.</p>
            <p><strong>📏 Code style:</strong> Keep allocation and deallocation in the same scope when possible to make pairing obvious.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Think of free as returning library books: you must bring them back so others can use them. Forgetting leads to clutter (memory leaks). Setting the pointer to NULL after free is like removing the bookmark so you don't accidentally try to read a returned book. In exams, double free and use-after-free are classic pitfalls — master them!"
        />
      </div>
    </>
  );
};

export default Topic6;