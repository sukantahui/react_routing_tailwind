import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import memoryLeakDemo from './topic15_files/memory_leak_demo.c?raw';
import fixedLeak from './topic15_files/fixed_leak.c?raw';
import detectionWithValgrind from './topic15_files/detection_with_valgrind.c?raw';

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

const Topic15 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // what
    '300ms',  // why bad
    '400ms',  // detection
    '500ms',  // svg
    '600ms',  // code examples
    '700ms',  // pitfalls
    '800ms',  // best practices
    '900ms',  // checklist
    '1000ms', // hints
    '1100ms', // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Memory Leaks & Detection Techniques
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            The silent resource killer — how leaks happen, why they matter, and how to catch them.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            What is a Memory Leak?
          </h2>
          <p className="leading-relaxed mb-3">
            A memory leak occurs when dynamically allocated memory is no longer needed but is never freed.
            The program loses all references to that memory, making it impossible to reclaim until the program exits.
            Over time, leaks accumulate, consuming more and more memory until the system runs out, causing slowdowns
            or crashes.
          </p>
          <p className="leading-relaxed">
            In long‑running applications (servers, embedded devices, GUIs), even small leaks can become catastrophic.
            Detecting and fixing leaks is a critical skill for professional C programmers.
          </p>
        </section>

        {/* Why Leaks Are Bad */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💥 Why Memory Leaks Are Dangerous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">📉 Performance Degradation</h3>
              <p className="mt-2 leading-relaxed">
                As memory usage grows, the OS may start swapping, causing slowdowns. In embedded systems,
                it may lead to thrashing or complete failure.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">💣 Crashes & OOM</h3>
              <p className="mt-2 leading-relaxed">
                Eventually, the heap exhausts available memory, and <code>malloc</code> returns <code>NULL</code>,
                leading to a crash if not handled.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🔒 Security Risks</h3>
              <p className="mt-2 leading-relaxed">
                Leaks can expose sensitive data if the leaked memory contains secrets that aren't overwritten.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🐞 Hard‑to‑Debug Bugs</h3>
              <p className="mt-2 leading-relaxed">
                Leaks often manifest long after the faulty code ran, making them difficult to trace.
              </p>
            </div>
          </div>
        </section>

        {/* Detection Techniques */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔍 Detection Techniques
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <ul className="space-y-3">
              <li>
                <strong>🔧 Manual Code Review:</strong> Check that every <code>malloc</code> has a matching <code>free</code>
                in all execution paths. Look for lost pointers (overwritten without free).
              </li>
              <li>
                <strong>🛠️ Valgrind (Memcheck):</strong> The gold standard for leak detection. It runs your program
                and reports leaks, invalid accesses, and double frees.
              </li>
              <li>
                <strong>⚙️ AddressSanitizer (ASan):</strong> A compile‑time instrumentation that detects leaks,
                use‑after‑free, and buffer overflows with minimal overhead.
              </li>
              <li>
                <strong>📊 Static Analysis:</strong> Tools like Clang Static Analyzer, Coverity, or Splint can
                find leaks without running the program.
              </li>
              <li>
                <strong>📝 Logging Allocation Points:</strong> Wrapping <code>malloc</code>/<code>free</code> with
                counters or tracking can help spot leaks in real‑time.
              </li>
            </ul>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Memory Leak Visualization
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 200" className="w-full h-auto" aria-label="Memory leak diagram">
              <rect width="800" height="200" fill="transparent" />

              {/* Heap before leak */}
              <rect x="50" y="30" width="300" height="30" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="50" fill="currentColor" className="text-xs">Heap initially</text>

              {/* Allocation 1 */}
              <rect x="50" y="80" width="100" height="30" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1" />
              <text x="60" y="100" fill="currentColor" className="text-xs">Alloc A</text>

              {/* Allocation 2 (leaked) */}
              <rect x="170" y="80" width="100" height="30" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
              <text x="180" y="100" fill="currentColor" className="text-xs">Alloc B</text>
              <text x="280" y="100" fill="#ef4444" className="text-xs">Leaked (no free)</text>

              {/* Pointer lost */}
              <line x1="220" y1="120" x2="220" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
              <text x="230" y="140" fill="#ef4444" className="text-xs">pointer lost</text>

              {/* After many allocations */}
              <rect x="50" y="160" width="300" height="30" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="60" y="180" fill="currentColor" className="text-xs">Leaked memory accumulates → Out‑of‑Memory</text>
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
              title="Example 1: Classic memory leak"
              initialCode={memoryLeakDemo}
            />
            <EditableCCodeBlock
              title="Example 2: Fixed version (no leak)"
              initialCode={fixedLeak}
            />
            <EditableCCodeBlock
              title="Example 3: Detecting leaks with Valgrind/ASan"
              initialCode={detectionWithValgrind}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls Leading to Leaks
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Missing free in error paths:</strong> When a function returns early, the allocated memory may not be freed.</li>
            <li><strong>Overwriting pointer before free:</strong> <code>ptr = malloc(...); ptr = another;</code> loses the original block.</li>
            <li><strong>Not freeing nested structures:</strong> For linked lists, freeing only the head leaves all nodes leaked.</li>
            <li><strong>Returning without freeing:</strong> Forgetting to free in a function that allocated but didn't return the pointer.</li>
            <li><strong>Using <code>realloc</code> incorrectly:</strong> If <code>realloc</code> fails and you lose the original pointer.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices to Avoid Leaks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always pair allocation and deallocation in the same scope when possible.</li>
              <li>✔️ Use the <code>goto cleanup</code> pattern to ensure freeing in all branches.</li>
              <li>✔️ For structures with nested allocations, write a dedicated <code>destroy</code> function that recursively frees.</li>
              <li>✔️ Set pointers to <code>NULL</code> after freeing to avoid accidental reuse.</li>
              <li>✔️ Regularly run your code under Valgrind or ASan, especially during development.</li>
              <li>✔️ Use static analysis tools to catch leaks early.</li>
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
              <li>☐ I can define a memory leak and explain why it's harmful.</li>
              <li>☐ I know at least three techniques to detect leaks.</li>
              <li>☐ I use Valgrind or AddressSanitizer regularly.</li>
              <li>☐ I ensure every <code>malloc</code> has a matching <code>free</code> in all code paths.</li>
              <li>☐ I check for leaks in error handling code.</li>
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
              <li>Run the leak example with Valgrind: <code>valgrind --leak-check=full ./program</code>. What does it report?</li>
              <li>What happens if you run the fixed version? Does Valgrind still report any issues?</li>
              <li>How would you modify the leak example to free the memory correctly?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Integrate Valgrind into your CI pipeline to catch leaks before they reach production.</p>
            <p><strong>📦 Lightweight tracking:</strong> Wrap <code>malloc</code> and <code>free</code> with macros that increment/decrement counters; log them.</p>
            <p><strong>🧹 In C++:</strong> Use RAII (smart pointers) to automate deallocation and eliminate manual leaks.</p>
            <p><strong>📏 For embedded systems:</strong> Consider static allocation or pool allocators to avoid leaks entirely.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Memory leaks are like a leaky faucet — they waste resources and eventually cause problems. The best way to fight them is to be systematic: every allocation must have a matching free, and every code path (including errors) must be covered. Tools like Valgrind are your best friends. In exams, you'll often be asked to identify and fix leaks — practice with these examples!"
        />
      </div>
    </>
  );
};

export default Topic15;