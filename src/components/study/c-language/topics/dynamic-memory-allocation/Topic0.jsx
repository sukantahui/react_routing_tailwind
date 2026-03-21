import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import stackExample from './topic0_files/stack_example.c?raw';
import heapExample from './topic0_files/heap_example.c?raw';
import compareExample from './topic0_files/compare_example.c?raw';

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

const Topic0 = () => {
  // Staggered delays for sections (in order of appearance)
  const sectionDelays = [
    '0ms',
    '100ms',
    '200ms',
    '300ms',
    '400ms',
    '500ms',
    '600ms',
    '700ms',
    '800ms',
    '900ms',
    '1000ms',
  ];

  // Helper to apply fade-slide-up with delay
  const getSectionClass = (index) => {
    return clsx(
      'animate-fade-slide-up',
      'opacity-0' // initial state before animation
    );
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div
          className={getSectionClass(0)}
          style={{ animationDelay: sectionDelays[0] }}
        >
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Stack vs Heap Memory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Understanding where your program stores data — automatic vs manual,
            fast vs flexible.
          </p>
        </div>

        {/* Introduction */}
        <section
          className={getSectionClass(1)}
          style={{ animationDelay: sectionDelays[1] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Why Memory Regions Matter
          </h2>
          <p className="leading-relaxed mb-3">
            In C (and many low‑level languages), memory is divided into two main
            areas: the <span className="font-mono font-bold">stack</span> and the{' '}
            <span className="font-mono font-bold">heap</span>. The stack is
            automatically managed and ideal for short‑lived, fixed‑size data.
            The heap gives you full control — you ask for memory when you need
            it and you must return it when you're done.
          </p>
          <p className="leading-relaxed">
            Getting this distinction right is crucial for building reliable
            software, whether you're writing a simple calculator or a complex
            embedded system. Let's explore their personalities.
          </p>
        </section>

        {/* Stack Memory */}
        <section
          className={getSectionClass(2)}
          style={{ animationDelay: sectionDelays[2] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📚 Stack Memory — Automatic & Fast
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <span className="text-green-500">⚡</span> How it works
              </h3>
              <p className="mt-2 leading-relaxed">
                The stack operates like a stack of plates: last in, first out
                (LIFO). Every time you call a function, a “stack frame” is
                pushed — containing local variables, parameters, and the return
                address. When the function returns, the frame is popped. Memory
                allocation and deallocation happen automatically and are
                extremely fast.
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Managed by the compiler — no manual work</li>
                <li>Fixed size per function (known at compile time)</li>
                <li>Thread‑safe (each thread has its own stack)</li>
                <li>Risk: stack overflow if too much data is placed on it</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Heap Memory */}
        <section
          className={getSectionClass(3)}
          style={{ animationDelay: sectionDelays[3] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🗂️ Heap Memory — Flexible but Manual
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <span className="text-purple-500">🧩</span> Dynamic allocation
            </h3>
            <p className="mt-2 leading-relaxed">
              The heap is a large pool of memory that you can request at runtime
              using functions like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">malloc()</code>,{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">calloc()</code>,{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">realloc()</code>, and must be released with{' '}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">free()</code>. Unlike the stack,
              heap allocations can be of any size (subject to available memory)
              and can persist across function calls.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>You decide when to allocate and deallocate</li>
              <li>Allows building dynamic structures (arrays, lists, trees)</li>
              <li>Accessible from any function via pointers</li>
              <li>Risk: memory leaks, fragmentation, dangling pointers</li>
            </ul>
          </div>
        </section>

        {/* SVG Illustration */}
        <section
          className={getSectionClass(4)}
          style={{ animationDelay: sectionDelays[4] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            🖼️ Visualizing Stack vs Heap
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-auto"
              aria-label="Diagram comparing stack and heap memory"
            >
              {/* Background */}
              <rect width="800" height="400" fill="transparent" />

              {/* Stack Region */}
              <rect x="50" y="50" width="300" height="300" fill="none" stroke="#10b981" strokeWidth="2" rx="8" />
              <text x="60" y="80" fill="currentColor" className="text-sm font-mono">Stack</text>
              {/* Stack frames */}
              <rect x="70" y="100" width="260" height="40" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.5" rx="4" />
              <text x="80" y="125" fill="currentColor" className="text-xs">frame: main()</text>
              <rect x="70" y="150" width="260" height="40" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.5" rx="4" />
              <text x="80" y="175" fill="currentColor" className="text-xs">frame: funcA()</text>
              <rect x="70" y="200" width="260" height="40" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.5" rx="4" />
              <text x="80" y="225" fill="currentColor" className="text-xs">frame: funcB()</text>
              <text x="70" y="280" fill="currentColor" className="text-xs">LIFO → automatic</text>

              {/* Heap Region */}
              <rect x="450" y="50" width="300" height="300" fill="none" stroke="#a855f7" strokeWidth="2" rx="8" />
              <text x="460" y="80" fill="currentColor" className="text-sm font-mono">Heap</text>
              {/* Allocated blocks */}
              <rect x="470" y="100" width="260" height="50" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1.5" rx="4" />
              <text x="480" y="130" fill="currentColor" className="text-xs">malloc(100)</text>
              <rect x="470" y="170" width="260" height="70" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1.5" rx="4" />
              <text x="480" y="210" fill="currentColor" className="text-xs">calloc(5, sizeof(int))</text>
              <rect x="470" y="260" width="260" height="40" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1.5" rx="4" />
              <text x="480" y="285" fill="currentColor" className="text-xs">free() → return to pool</text>
              <text x="470" y="330" fill="currentColor" className="text-xs">manual control, persistent</text>

              {/* Arrows with native SVG animation */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                </marker>
              </defs>
              <line x1="350" y1="200" x2="450" y2="200" stroke="#6b7280" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#arrowhead)">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="370" y="190" fill="#6b7280" className="text-xs">pointers</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section
          className={getSectionClass(5)}
          style={{ animationDelay: sectionDelays[5] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code in Action
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Stack: Automatic local variable"
              initialCode={stackExample}
            />
            <EditableCCodeBlock
              title="Heap: Manual allocation with malloc"
              initialCode={heapExample}
            />
            <EditableCCodeBlock
              title="Comparison: Stack vs Heap lifetime"
              initialCode={compareExample}
            />
          </div>
        </section>

        {/* Common Mistakes */}
        <section
          className={getSectionClass(6)}
          style={{ animationDelay: sectionDelays[6] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Stack overflow:</strong> Declaring huge local arrays (e.g., <code>int arr[1000000];</code>) crashes the program.</li>
            <li><strong>Returning address of stack variable:</strong> This leads to dangling pointer and undefined behavior.</li>
            <li><strong>Forgetting to free heap memory:</strong> Causes memory leaks over time.</li>
            <li><strong>Using heap without checking allocation success:</strong> Always check if <code>malloc</code> returns <code>NULL</code>.</li>
            <li><strong>Misunderstanding lifetime:</strong> Assuming a heap pointer survives after <code>free</code>.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section
          className={getSectionClass(7)}
          style={{ animationDelay: sectionDelays[7] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="font-mono text-sm">✔️ Use stack for small, fixed‑size data with clear lifetime.</p>
              <p className="font-mono text-sm mt-2">✔️ Use heap for large data or when size is unknown until runtime.</p>
              <p className="font-mono text-sm mt-2">✔️ Always pair every <code>malloc</code> with a matching <code>free</code>.</p>
              <p className="font-mono text-sm mt-2">✔️ Set pointer to <code>NULL</code> after freeing to avoid dangling pointer issues.</p>
              <p className="font-mono text-sm mt-2">✔️ Prefer <code>calloc</code> when you need zero‑initialized memory.</p>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section
          className={getSectionClass(8)}
          style={{ animationDelay: sectionDelays[8] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I can explain the difference between stack and heap memory.</li>
              <li>☐ I know which memory region local variables and dynamically allocated memory belong to.</li>
              <li>☐ I always check <code>malloc</code>/<code>calloc</code> return value for <code>NULL</code>.</li>
              <li>☐ I free heap memory exactly once and avoid using it after free.</li>
              <li>☐ I can spot the risk of returning a pointer to a stack variable.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section
          className={getSectionClass(9)}
          style={{ animationDelay: sectionDelays[9] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Think about...</p>
            <ul className="list-disc list-inside mt-2">
              <li>What happens if you try to use a local variable after its function returns?</li>
              <li>Why does the stack allocate memory so fast?</li>
              <li>Try changing the size of the array in the stack example to 1000000 – observe the crash.</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section
          className={getSectionClass(10)}
          style={{ animationDelay: sectionDelays[10] }}
        >
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> or sanitizers to detect leaks and invalid heap usage.</p>
            <p className="mt-2"><strong>📦 Structure awareness:</strong> When building data structures (like linked lists), always allocate nodes on the heap.</p>
            <p className="mt-2"><strong>🧹 Cleanup patterns:</strong> In large functions, organize allocation and deallocation in a “goto cleanup” style or use RAII in C++.</p>
            <p className="mt-2"><strong>📏 Know your limits:</strong> Stack size is often limited to ~8MB; heap can grow up to available RAM.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Remember: the stack is like a whiteboard you erase automatically after each function. The heap is like a personal locker — you must remember to return the key (free the memory). Always visualize memory regions when coding. This will save you hours of debugging!"
        />
      </div>
    </>
  );
};

export default Topic0;