import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import layoutExample from './topic1_files/layout_example.c?raw';
import staticExample from './topic1_files/static_example.c?raw';
import bssExample from './topic1_files/bss_example.c?raw';

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

const Topic1 = () => {
  // Staggered delays for sections (in order of appearance)
  const sectionDelays = [
    '0ms',      // header
    '100ms',    // intro
    '200ms',    // code/data
    '300ms',    // stack
    '400ms',    // heap
    '500ms',    // svg
    '600ms',    // code examples
    '700ms',    // pitfalls
    '800ms',    // best practices
    '900ms',    // checklist
    '1000ms',   // hints
    '1100ms',   // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Memory Layout of a C Program
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            How your program is organised in memory — code, data, stack, and heap.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The Four Pillars of Program Memory
          </h2>
          <p className="leading-relaxed mb-3">
            When a C program runs, the operating system loads it into memory in a
            well‑defined layout. Understanding this layout is essential for writing
            efficient, bug‑free code. Every process has four main segments:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Code (Text) segment:</strong> Read‑only machine instructions.</li>
            <li><strong>Data segment:</strong> Global and static variables (initialized and uninitialized).</li>
            <li><strong>Stack:</strong> Automatic variables and function call frames.</li>
            <li><strong>Heap:</strong> Dynamically allocated memory.</li>
          </ul>
          <p className="mt-3 leading-relaxed">
            This layout explains why local variables vanish after a function ends,
            while global variables persist, and why you must manually manage heap memory.
          </p>
        </section>

        {/* Code & Data Segments */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📜 Code (Text) & Data Segments
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <span className="text-green-500">🔒</span> Code Segment
              </h3>
              <p className="mt-2 leading-relaxed">
                Also called the <strong>text segment</strong>, this area contains the compiled
                machine code of your program. It is typically <strong>read‑only</strong> to prevent
                accidental modification, and shared among multiple running instances of the
                same program.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <h3 className="text-xl font-medium flex items-center gap-2">
                <span className="text-green-500">📊</span> Data Segment
              </h3>
              <p className="mt-2 leading-relaxed">
                The data segment holds global and static variables. It is split into:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li><strong>Initialized data (.data):</strong> Variables with explicit initial values (e.g., <code>int x = 5;</code>).</li>
                <li><strong>Uninitialized data (.bss):</strong> Variables without explicit initialization; the OS zeros them before program start.</li>
              </ul>
              <p className="mt-2 text-sm italic">
                💡 Tip: Uninitialized global/static variables don’t occupy space in the executable file — they are set up at runtime.
              </p>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            📚 Stack Segment
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <p className="leading-relaxed">
              The stack stores function call frames (local variables, parameters, return
              addresses). It grows and shrinks automatically as functions are called and
              return. Each thread has its own stack, and stack size is limited (usually
              a few MB). Exceeding this limit causes a <strong>stack overflow</strong>.
            </p>
            <div className="mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
              
              <pre>
{`// Example: variables on the stack
void foo() {
  int a = 10;        // on stack
  char str[20];      // on stack
} // a and str are automatically destroyed here`}
  </pre>
            </div>
          </div>
        </section>

        {/* Heap */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🗂️ Heap Segment
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <p className="leading-relaxed">
              The heap is a large pool of memory used for dynamic allocation
              (<code>malloc</code>, <code>calloc</code>, <code>realloc</code>). Unlike the stack,
              heap memory must be explicitly freed with <code>free()</code>. It can grow (using
              <code>brk</code>/<code>sbrk</code> or <code>mmap</code>) and is shared across all
              threads. Improper management leads to memory leaks or fragmentation.
            </p>
            <div className="mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
              // Example: allocating on the heap<br/>
              int *p = (int*)malloc(sizeof(int));<br/>
              *p = 42;<br/>
              free(p); // must free
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing Memory Layout
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 450" className="w-full h-auto" aria-label="Memory layout diagram">
              <rect width="800" height="450" fill="transparent" />

              {/* Code segment */}
              <rect x="50" y="30" width="300" height="60" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="65" fill="currentColor" className="text-sm font-mono">Code (Text) - read‑only</text>

              {/* Data segment */}
              <rect x="50" y="110" width="300" height="80" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" rx="4" />
              <text x="60" y="135" fill="currentColor" className="text-sm font-mono">Data segment</text>
              <rect x="70" y="150" width="260" height="15" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1" rx="2" />
              <text x="80" y="163" fill="currentColor" className="text-xs">.data (initialized globals/statics)</text>
              <rect x="70" y="170" width="260" height="15" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1" rx="2" />
              <text x="80" y="183" fill="currentColor" className="text-xs">.bss (uninitialized globals/statics)</text>

              {/* Stack (grows down) */}
              <rect x="450" y="30" width="300" height="160" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="2" rx="4" />
              <text x="460" y="55" fill="currentColor" className="text-sm font-mono">Stack (grows downward)</text>
              <rect x="470" y="70" width="260" height="30" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1" rx="2" />
              <text x="480" y="90" fill="currentColor" className="text-xs">frame: main()</text>
              <rect x="470" y="105" width="260" height="30" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1" rx="2" />
              <text x="480" y="125" fill="currentColor" className="text-xs">frame: funcA()</text>
              <text x="470" y="165" fill="currentColor" className="text-xs">↓ automatic, LIFO</text>

              {/* Heap (grows up) */}
              <rect x="450" y="250" width="300" height="160" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" rx="4" />
              <text x="460" y="275" fill="currentColor" className="text-sm font-mono">Heap (grows upward)</text>
              <rect x="470" y="290" width="260" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" rx="2" />
              <text x="480" y="310" fill="currentColor" className="text-xs">malloc(100)</text>
              <rect x="470" y="330" width="260" height="30" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" rx="2" />
              <text x="480" y="350" fill="currentColor" className="text-xs">calloc(5, 8)</text>
              <text x="470" y="390" fill="currentColor" className="text-xs">↑ manual allocation</text>

              {/* Arrow showing growth direction */}
              <defs>
                <marker id="arrowUp" markerWidth="10" markerHeight="10" refX="5" refY="9" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                </marker>
                <marker id="arrowDown" markerWidth="10" markerHeight="10" refX="5" refY="1" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                </marker>
              </defs>
              <line x1="410" y1="190" x2="410" y2="250" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowUp)" strokeDasharray="4 2">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="380" y="220" fill="#6b7280" className="text-xs">grows toward</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code Examples
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Example 1: Memory layout of different variables"
              initialCode={layoutExample}
            />
            <EditableCCodeBlock
              title="Example 2: Static variables (data segment)"
              initialCode={staticExample}
            />
            <EditableCCodeBlock
              title="Example 3: BSS vs Data segment"
              initialCode={bssExample}
            />
          </div>
        </section>

        {/* Common Mistakes */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Confusing static and global:</strong> Both live in data segment but have different scope.</li>
            <li><strong>Returning pointer to local variable:</strong> That memory (stack) is invalid after return → dangling pointer.</li>
            <li><strong>Assuming heap grows indefinitely:</strong> It's limited by virtual memory; forgetting to free leads to exhaustion.</li>
            <li><strong>Stack overflow:</strong> Large local arrays or deep recursion can crash the program.</li>
            <li><strong>Not understanding .bss vs .data:</strong> Uninitialized globals don't increase executable size, but they do consume RAM at runtime.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Keep global/static variables to a minimum — prefer passing parameters.</li>
              <li>✔️ Use stack for small, short‑lived data; use heap for large or long‑lived data.</li>
              <li>✔️ Always initialize global variables explicitly to avoid accidental reliance on .bss zeroing.</li>
              <li>✔️ For large structures, allocate on the heap to avoid stack overflow.</li>
              <li>✔️ Understand that <code>const</code> global variables may reside in read‑only memory (part of text segment).</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I can name the four segments of a C program’s memory layout.</li>
              <li>☐ I know which variables go into .data, .bss, stack, and heap.</li>
              <li>☐ I understand why returning a pointer to a local variable is dangerous.</li>
              <li>☐ I can explain the difference between initialized and uninitialized global/static variables.</li>
              <li>☐ I am aware of stack overflow risks and how to avoid them.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Observe carefully...</p>
            <ul className="list-disc list-inside mt-2">
              <li>Run the examples and note the addresses printed – which region do they belong to?</li>
              <li>Try declaring a large array inside <code>main()</code> and watch the program crash (stack overflow).</li>
              <li>Compare the size of your executable with and without an initialized global variable.</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[11] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>objdump -h</code> or <code>size</code> to inspect section sizes.</p>
            <p><strong>📦 Embedded systems:</strong> Memory layout is often defined by linker scripts – you can place variables in specific sections.</p>
            <p><strong>🧹 Cleanup patterns:</strong> Always free heap memory in reverse order of allocation to reduce fragmentation.</p>
            <p><strong>📏 Know your limits:</strong> On Linux, use <code>ulimit -s</code> to see stack size; on Windows, it's set at compile time.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Think of the program layout as a city: code is the 'library' (read‑only), data is the 'town hall' (global state), stack is the 'temporary workspaces', and heap is the 'warehouse' (flexible storage). Mastering these zones is the first step to becoming a memory expert!"
        />
      </div>
    </>
  );
};

export default Topic1;