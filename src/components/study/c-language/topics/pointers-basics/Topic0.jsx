import React from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import stackExample from "./topic0_files/stack_example.c?raw";
import heapExample from "./topic0_files/heap_example.c?raw";

const Topic0 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Memory Model: Stack vs Heap
        </h1>
        <p className="text-lg leading-relaxed">
          A program's memory is divided into several segments. Two critical regions are the <strong className="text-blue-600 dark:text-blue-400">stack</strong> and the <strong className="text-green-600 dark:text-green-400">heap</strong>. Understanding their differences is fundamental to writing efficient and bug-free C/C++ code.
        </p>
      </div>

      {/* Stack & Heap Overview Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Stack Card */}
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
              S
            </div>
            <h2 className="text-2xl font-semibold">Stack</h2>
          </div>
          <p className="leading-relaxed mb-3">
            The stack is a region of memory that operates in a <strong>Last-In-First-Out (LIFO)</strong> manner. It stores local variables, function parameters, and return addresses.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Fast allocation/deallocation (just move stack pointer)</li>
            <li>Fixed size (typically 1–8 MB, can overflow)</li>
            <li>Automatic cleanup when function exits</li>
            <li>Lifetime: tied to the scope of the function</li>
          </ul>
          <div className="mt-4 pt-2 text-xs text-gray-500 dark:text-gray-500 italic">
            Analogy: A stack of sticky notes — you add and remove from the top.
          </div>
        </div>

        {/* Heap Card */}
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl">
              H
            </div>
            <h2 className="text-2xl font-semibold">Heap</h2>
          </div>
          <p className="leading-relaxed mb-3">
            The heap is a region for <strong>dynamic memory allocation</strong>. Memory is manually allocated (e.g., <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">malloc()</code>) and freed (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">free()</code>).
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Slower allocation (must find a suitable block)</li>
            <li>Large available memory (limited by system RAM)</li>
            <li>Manual control: persists until explicitly freed</li>
            <li>Risk of memory leaks and fragmentation</li>
          </ul>
          <div className="mt-4 pt-2 text-xs text-gray-500 dark:text-gray-500 italic">
            Analogy: A bulletin board — you pin notes anywhere, and must remove them yourself.
          </div>
        </div>
      </div>

      {/* Interactive SVG Diagram */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "50ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Memory Layout Visualisation</h3>
        <div className="flex justify-center">
          <svg width="400" height="280" viewBox="0 0 400 280" className="max-w-full h-auto">
            {/* Background memory rectangle */}
            <rect x="50" y="20" width="300" height="240" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" className="text-gray-400 dark:text-gray-500" />
            <text x="190" y="15" textAnchor="middle" fontSize="12" fill="currentColor" className="text-gray-500 dark:text-gray-400">Virtual Memory</text>

            {/* Stack region (top) */}
            <rect x="70" y="30" width="260" height="70" fill="url(#gradStack)" stroke="#3B82F6" strokeWidth="2" rx="4" />
            <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3B82F6">Stack</text>
            <text x="200" y="85" textAnchor="middle" fontSize="10" fill="currentColor" className="text-gray-600 dark:text-gray-300">(grows downward)</text>

            {/* Heap region (bottom) */}
            <rect x="70" y="170" width="260" height="70" fill="url(#gradHeap)" stroke="#10B981" strokeWidth="2" rx="4" />
            <text x="200" y="205" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#10B981">Heap</text>
            <text x="200" y="225" textAnchor="middle" fontSize="10" fill="currentColor" className="text-gray-600 dark:text-gray-300">(grows upward)</text>

            {/* Separator and growth arrows */}
            <line x1="70" y1="120" x2="330" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4" className="text-gray-400" />
            <text x="200" y="115" textAnchor="middle" fontSize="9" fill="currentColor" className="text-gray-400">dynamic boundary</text>

            {/* Animated arrows */}
            <g transform="translate(320, 60)">
              <path d="M0,0 L-8,8 L0,16" fill="none" stroke="#3B82F6" strokeWidth="2" />
              <animate attributeName="transform" attributeType="XML" type="translate" values="0,0; 0,20; 0,0" dur="2s" repeatCount="indefinite" />
            </g>
            <g transform="translate(320, 190)">
              <path d="M0,0 L-8,-8 L0,-16" fill="none" stroke="#10B981" strokeWidth="2" />
              <animate attributeName="transform" attributeType="XML" type="translate" values="0,0; 0,-20; 0,0" dur="2s" repeatCount="indefinite" />
            </g>

            <defs>
              <linearGradient id="gradStack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="gradHeap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Stack grows downward, heap grows upward. Their meeting point is flexible.
        </p>
      </div>

      {/* Detailed sections with staggered animation */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "100ms" }}>
        {/* Stack Deep Dive */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">📚 Stack in Depth</h3>
          <p className="leading-relaxed mb-2">
            Every time a function is called, a <strong>stack frame</strong> is pushed. It contains local variables, function arguments, and the return address. When the function returns, the frame is popped.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/70 p-4 rounded-lg mt-3">
            <p className="font-mono text-sm">void welcome() {`{`}<br />
            &nbsp;&nbsp;int marks = 95; &nbsp; // stored on stack<br />
            &nbsp;&nbsp;char grade = 'A'; &nbsp; // also on stack<br />
            {`}`} // marks and grade are automatically destroyed
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> In Barrackpore CNAT, when <strong>Swadeep</strong> calls a function to calculate his score, all temporary variables live on the stack.
          </p>
        </div>

        {/* Heap Deep Dive */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">🧠 Heap in Depth</h3>
          <p className="leading-relaxed mb-2">
            The heap gives you control over memory lifetime. You request memory using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">malloc()</code> and must explicitly release it with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">free()</code>.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">malloc() prototype:</p>
              <code className="block bg-gray-800 text-gray-100 p-2 rounded text-sm mt-1">void* malloc(size_t size);</code>
              <p className="text-xs mt-1">Returns pointer to allocated memory (or NULL on failure).</p>
            </div>
            <div>
              <p className="font-semibold">free() prototype:</p>
              <code className="block bg-gray-800 text-gray-100 p-2 rounded text-sm mt-1">void free(void* ptr);</code>
              <p className="text-xs mt-1">Releases previously allocated heap memory.</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            <strong>Scenario:</strong> <strong>Tuhina</strong> needs to store a dynamic list of student records that persists after a function ends — she would use heap allocation.
          </p>
        </div>
      </div>

      {/* Code Examples with EditableCCodeBlock */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "150ms" }}>
        <h3 className="text-2xl font-semibold">🔬 See it in Action</h3>
        <EditableCCodeBlock
          title="Example 1: Stack Variables"
          initialCode={stackExample}
        />
        <EditableCCodeBlock
          title="Example 2: Heap Allocation"
          initialCode={heapExample}
        />
      </div>

      {/* Comparison Table */}
      <div className="animate-fade-up overflow-x-auto" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold mb-3">⚖️ Stack vs Heap — Quick Comparison</h3>
        <table className="min-w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr><th className="p-3 text-left">Feature</th><th className="p-3 text-left">Stack</th><th className="p-3 text-left">Heap</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-3 font-medium">Allocation Speed</td><td className="p-3">Very fast (pointer move)</td><td className="p-3">Slower (search + bookkeeping)</td></tr>
            <tr><td className="p-3 font-medium">Lifetime</td><td className="p-3">Automatic (scope-based)</td><td className="p-3">Manual (until free)</td></tr>
            <tr><td className="p-3 font-medium">Size Limit</td><td className="p-3">Fixed, small (stack overflow risk)</td><td className="p-3">Large (RAM dependent)</td></tr>
            <tr><td className="p-3 font-medium">Fragmentation</td><td className="p-3">None</td><td className="p-3">Possible over time</td></tr>
          </tbody>
        </table>
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Stack overflow:</strong> Deep recursion or large local arrays can exceed stack size.</li>
          <li><strong>Memory leak:</strong> Forgetting to free heap memory — program consumes more RAM over time.</li>
          <li><strong>Dangling pointer:</strong> Using a pointer after freeing the heap memory.</li>
          <li><strong>Misunderstanding lifetime:</strong> Returning address of a stack variable from a function → undefined behavior.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use stack for small, short-lived data. Use heap for large or long-lived data.</li>
          <li>Always check <code className="bg-gray-200 dark:bg-gray-700 px-1">malloc()</code> return value for NULL.</li>
          <li>Pair every <code className="bg-gray-200 dark:bg-gray-700 px-1">malloc()</code> with a <code className="bg-gray-200 dark:bg-gray-700 px-1">free()</code> in the same scope or design.</li>
          <li>Avoid deep recursion; consider iterative solutions for large inputs.</li>
        </ul>
      </div>

      {/* Mini Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that stack memory is automatic, heap is manual.</li>
            <li>✅ Know that local variables live on stack; dynamic data lives on heap.</li>
            <li>✅ Can explain the typical memory layout diagram.</li>
            <li>✅ Aware of stack overflow and memory leak consequences.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you allocate 1MB array on stack vs heap?</li>
            <li>Observe carefully the lifetime of a pointer returned from a function.</li>
            <li>Try changing the recursive depth in the example to see stack overflow.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Valgrind / AddressSanitizer:</strong> Use these tools to detect memory leaks and invalid accesses early.</li>
          <li><strong>Stack vs Heap naming:</strong> Choose variable names that hint at lifetime (e.g., <code>tmp_</code> for stack, <code>p_</code> for heap).</li>
          <li><strong>Avoid "magic numbers":</strong> When allocating, use <code>sizeof(type)</code> to stay portable.</li>
          <li><strong>Debug mindset:</strong> Always initialize pointers to NULL after freeing.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In Barrackpore CNAT, I often see students confuse where variables live. Remember: If you use `malloc`, it's heap; if you declare a variable inside a function without `malloc`, it's stack. Visualize the stack frames like a stack of plates, and heap like a warehouse. Always pair `malloc` with `free` to avoid memory leaks. Keep this mental model as we dive deeper into pointers!"
        } />
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
          opacity: 0; /* start invisible */
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic0;