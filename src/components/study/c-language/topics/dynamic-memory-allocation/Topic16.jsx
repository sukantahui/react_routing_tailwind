import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import pointerTracking from './topic16_files/pointer_tracking.c?raw';
import allocationCount from './topic16_files/allocation_count.c?raw';
import debugLeak from './topic16_files/debug_leak.c?raw';

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

const Topic16 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // why printf
    '300ms',  // techniques
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
            Basic Debugging Using printf & Pointer Tracking
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Simple but effective techniques to peek inside your program's memory.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            The Simplest Debugger
          </h2>
          <p className="leading-relaxed mb-3">
            Before using advanced tools like Valgrind or GDB, the humble <code>printf</code> is often the
            fastest way to understand what your code is doing. By strategically placing print statements,
            you can trace the flow of execution, inspect variable values, and verify pointer addresses.
          </p>
          <p className="leading-relaxed">
            When dealing with dynamic memory, printing pointer addresses and the values they point to helps
            you track allocations, detect double frees, and find use‑after‑free bugs. This topic shows you
            how to use <code>printf</code> effectively for memory debugging.
          </p>
        </section>

        {/* Why printf Works */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📢 Why printf Is a Powerful Debugging Tool
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <ul className="space-y-3">
              <li><strong>Immediate feedback:</strong> No setup required – just add a line of code.</li>
              <li><strong>Works everywhere:</strong> On embedded systems, bare metal, or any platform with a console.</li>
              <li><strong>No interference:</strong> Prints the actual state of your program without altering execution (except for timing).</li>
              <li><strong>Easy to control:</strong> Wrap prints with <code>#ifdef DEBUG</code> to enable/disable.</li>
              <li><strong>Combines with tools:</strong> Print allocation IDs, then cross‑reference with Valgrind output.</li>
            </ul>
          </div>
        </section>

        {/* Techniques */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔍 Key Debugging Techniques
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-medium mb-2">1. Print Pointer Addresses</h3>
            <div className="font-mono text-sm p-2 bg-gray-100 dark:bg-gray-700 rounded mb-3">
              printf("ptr = %p\n", (void*)ptr);
            </div>
            <p className="mb-3">Track where each allocation lives and verify that freed memory isn't reused accidentally.</p>

            <h3 className="text-xl font-medium mb-2">2. Print Values Before/After Free</h3>
            <div className="font-mono text-sm p-2 bg-gray-100 dark:bg-gray-700 rounded mb-3">
              printf("Before free: *ptr = %d\n", *ptr);<br/>
              free(ptr);<br/>
              printf("After free: ptr = %p\n", (void*)ptr); // shows dangling address
            </div>

            <h3 className="text-xl font-medium mb-2">3. Track Allocation Counts</h3>
            <div className="font-mono text-sm p-2 bg-gray-100 dark:bg-gray-700 rounded mb-3">
              static int allocations = 0, frees = 0;<br/>
              allocations++; printf("Alloc #%d at %p\n", allocations, ptr);
            </div>
            <p>Detect leaks by comparing counts at program exit.</p>

            <h3 className="text-xl font-medium mb-2">4. Use Function Entry/Exit Logs</h3>
            <div className="font-mono text-sm p-2 bg-gray-100 dark:bg-gray-700 rounded">
              printf("Entering function %s\n", __func__);<br/>
              // ... code ...<br/>
              printf("Exiting %s\n", __func__);
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ printf Debugging in Action
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 200" className="w-full h-auto" aria-label="printf debugging flow">
              <rect width="800" height="200" fill="transparent" />

              <rect x="50" y="30" width="150" height="40" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="80" y="55" fill="currentColor" className="text-xs">malloc()</text>

              <rect x="250" y="30" width="150" height="40" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" rx="4" />
              <text x="280" y="55" fill="currentColor" className="text-xs">printf("ptr=%p", ptr)</text>

              <rect x="450" y="30" width="150" height="40" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2" rx="4" />
              <text x="480" y="55" fill="currentColor" className="text-xs">free(ptr)</text>

              <rect x="650" y="30" width="100" height="40" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="675" y="55" fill="currentColor" className="text-xs">printf("freed")</text>

              <line x1="200" y1="50" x2="250" y2="50" stroke="#6b7280" strokeWidth="2" />
              <line x1="400" y1="50" x2="450" y2="50" stroke="#6b7280" strokeWidth="2" />
              <line x1="600" y1="50" x2="650" y2="50" stroke="#6b7280" strokeWidth="2" />

              <text x="70" y="120" fill="currentColor" className="text-xs">Output:</text>
              <rect x="70" y="130" width="660" height="50" fill="rgba(0,0,0,0.05)" stroke="none" rx="4" />
              <text x="80" y="155" fill="currentColor" className="text-xs font-mono">ptr = 0x7f8a3c001a20</text>
              <text x="80" y="170" fill="currentColor" className="text-xs font-mono">freed</text>
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
              title="Example 1: Tracking pointers with printf"
              initialCode={pointerTracking}
            />
            <EditableCCodeBlock
              title="Example 2: Allocation counter"
              initialCode={allocationCount}
            />
            <EditableCCodeBlock
              title="Example 3: Debugging a memory leak"
              initialCode={debugLeak}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls with printf Debugging
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Missing newline:</strong> Output may not appear immediately; always use <code>\n</code> or <code>fflush(stdout)</code>.</li>
            <li><strong>Printing too much:</strong> Can overwhelm the console and hide important messages.</li>
            <li><strong>Performance impact:</strong> In tight loops, excessive printing can change timing and hide race conditions.</li>
            <li><strong>Forgetting to cast pointers:</strong> Use <code>(void*)ptr</code> to avoid warnings.</li>
            <li><strong>Debug prints left in production code:</strong> Use conditional compilation (<code>#ifdef DEBUG</code>) to remove them.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Use <code>stderr</code> for debugging messages (<code>fprintf(stderr, ...)</code>) to avoid interfering with program output.</li>
              <li>✔️ Add a unique tag to each print (e.g., <code>[DEBUG]</code>) for easy filtering.</li>
              <li>✔️ Print function names using <code>__func__</code> to trace execution flow.</li>
              <li>✔️ For pointer tracking, print both the pointer and the value it points to (if valid).</li>
              <li>✔️ Use a macro like <code>DEBUG_PRINT(fmt, ...)</code> that can be turned off globally.</li>
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
              <li>☐ I can use <code>printf</code> to print pointer addresses.</li>
              <li>☐ I understand the importance of flushing output or adding newlines.</li>
              <li>☐ I can track allocations and frees with counters.</li>
              <li>☐ I know how to conditionally enable debug prints.</li>
              <li>☐ I can identify potential leaks by comparing allocation and free counts.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Observe carefully...</p>
            <ul className="list-disc list-inside mt-2">
              <li>In the pointer tracking example, what happens if you print the value after free? Try to explain the output.</li>
              <li>How would you modify the allocation counter to also track the sizes of allocations?</li>
              <li>What would be the effect of printing inside a loop that runs millions of times? How can you reduce the output?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Add a debug flag (e.g., <code>-DDEBUG</code>) and use <code>#ifdef DEBUG</code> to enable prints only when needed.</p>
            <p><strong>📦 Logging library:</strong> For larger projects, wrap <code>printf</code> in a logging library with levels (error, warning, info, debug).</p>
            <p><strong>🧹 Clean code:</strong> Remove debug prints before committing code, or keep them behind a flag that's off by default.</p>
            <p><strong>📏 Visualize:</strong> Redirect debug output to a file and use tools like <code>grep</code> or <code>awk</code> to analyze it.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="printf debugging is the first tool every programmer should master. It's simple, direct, and works everywhere. When you're stuck, add a print before and after the suspect code – it often reveals the problem. But remember: it's a temporary tool; clean up your debug prints once the bug is fixed!"
        />
      </div>
    </>
  );
};

export default Topic16;