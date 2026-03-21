import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import doubleFreeDemo from './topic8_files/double_free_demo.c?raw';
import doubleFreePrevention from './topic8_files/double_free_prevention.c?raw';
import doubleFreeDetection from './topic8_files/double_free_detection.c?raw';

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

const Topic8 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // what is double free
    '300ms',  // consequences
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
            Double Free Errors & Undefined Behavior
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Freeing the same memory twice — a recipe for chaos, corruption, and crashes.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            What is a Double Free?
          </h2>
          <p className="leading-relaxed mb-3">
            A <strong>double free</strong> occurs when you call <code>free()</code> on the same pointer more than once,
            without reallocating the memory in between. This is <strong>undefined behavior</strong> — the C standard
            says nothing about what should happen, and the actual outcome can be a crash, silent corruption,
            or even security vulnerabilities.
          </p>
          <p className="leading-relaxed">
            Double frees are distinct from using a pointer after free (dangling pointer) — they corrupt the
            heap manager's internal data structures, leading to unpredictable failures.
          </p>
        </section>

        {/* Consequences */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💥 Consequences of Double Free
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">💣 Immediate Crash</h3>
              <p className="mt-2 leading-relaxed">
                Most common: the heap manager detects a corrupted free list and aborts the program with a
                segmentation fault or heap corruption error.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🔄 Memory Corruption</h3>
              <p className="mt-2 leading-relaxed">
                The heap metadata is overwritten, causing later allocations to be corrupted. This can manifest
                as strange bugs far away from the actual double free.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🔓 Security Exploits</h3>
              <p className="mt-2 leading-relaxed">
                Double free can be leveraged by attackers to perform arbitrary code execution (e.g.,
                “use‑after‑free” chains). It's a known vulnerability class.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🐞 Heisenbugs</h3>
              <p className="mt-2 leading-relaxed">
                The crash may not happen immediately; the program might run for a while before corrupting
                data, making debugging extremely difficult.
              </p>
            </div>
          </div>
        </section>

        {/* Why undefined behavior */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            ⚠️ Double Free = Undefined Behavior
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              The C standard says that calling <code>free</code> on a pointer that has already been freed
              (or that was not allocated by <code>malloc</code>/<code>calloc</code>/<code>realloc</code>)
              results in <strong>undefined behavior</strong>.
            </p>
            <p className="leading-relaxed">
              This means the compiler is free to assume it never happens, and the program may do anything —
              from working as expected to crashing immediately. The worst part is that the behavior can
              change with compiler versions, optimization levels, or even between runs.
            </p>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
              <p className="text-sm"><strong>⚠️ Important:</strong> Unlike <code>free(NULL)</code> which is safe,
              double free is never safe. Always ensure each pointer is freed exactly once.</p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing Double Free
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 280" className="w-full h-auto" aria-label="Double free diagram">
              <rect width="800" height="280" fill="transparent" />

              {/* Valid state */}
              <text x="50" y="30" fill="currentColor" className="text-sm">1. Valid allocation:</text>
              <rect x="50" y="50" width="200" height="40" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="75" fill="currentColor" className="text-xs">Allocated block</text>
              <text x="270" y="75" fill="currentColor" className="text-xs">ptr →</text>

              {/* First free */}
              <text x="50" y="120" fill="currentColor" className="text-sm">2. free(ptr): block returned to heap</text>
              <rect x="50" y="140" width="200" height="40" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" rx="4" strokeDasharray="4 2" />
              <text x="60" y="165" fill="#22c55e" className="text-xs">Freed (available)</text>
              <text x="270" y="165" fill="currentColor" className="text-xs">ptr still points here</text>

              {/* Double free */}
              <text x="50" y="210" fill="currentColor" className="text-sm">3. free(ptr) AGAIN → 💥 UNDEFINED BEHAVIOR</text>
              <rect x="50" y="230" width="200" height="40" fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth="2" rx="4" strokeDasharray="3 3" />
              <text x="60" y="255" fill="#ef4444" className="text-xs">Corrupted heap metadata</text>
              <text x="270" y="255" fill="#ef4444" className="text-xs">Crash or corruption</text>

              {/* Arrow for progression */}
              <line x1="250" y1="70" x2="250" y2="150" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="250" y1="160" x2="250" y2="240" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 3" />
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
              title="Example 1: Double free (dangerous)"
              initialCode={doubleFreeDemo}
            />
            <EditableCCodeBlock
              title="Example 2: Preventing double free"
              initialCode={doubleFreePrevention}
            />
            <EditableCCodeBlock
              title="Example 3: Detecting double free with AddressSanitizer"
              initialCode={doubleFreeDetection}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Not setting pointer to NULL after free:</strong> Allows accidental double free later.</li>
            <li><strong>Multiple code paths freeing the same pointer:</strong> Especially in error handling or cleanup sections.</li>
            <li><strong>Freeing a pointer that was already freed in a called function:</strong> Lack of clear ownership.</li>
            <li><strong>Assuming free sets pointer to NULL:</strong> It does not; you must do it manually.</li>
            <li><strong>Using pointer after free, then freeing again:</strong> Often seen in complex loops.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ After freeing a pointer, immediately set it to <code>NULL</code>. Then subsequent <code>free(NULL)</code> is safe.</li>
              <li>✔️ Design functions so that memory ownership is clear — document who is responsible for freeing.</li>
              <li>✔️ In cleanup sections, always check if pointer is non‑NULL before freeing (but with NULL after free, this becomes automatic).</li>
              <li>✔️ Use static analysis tools (e.g., Clang Static Analyzer) and sanitizers (AddressSanitizer) to catch double frees.</li>
              <li>✔️ Prefer RAII or smart pointers in C++ to eliminate manual free.</li>
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
              <li>☐ I know what a double free is and why it's undefined behavior.</li>
              <li>☐ I always set pointers to <code>NULL</code> after freeing.</li>
              <li>☐ I ensure that no code path calls <code>free</code> twice on the same pointer.</li>
              <li>☐ I use tools like Valgrind or AddressSanitizer to detect double frees.</li>
              <li>☐ I understand that <code>free(NULL)</code> is safe, but double free is not.</li>
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
              <li>In the double free example, try to compile and run it. What output do you get? Does it crash immediately or later?</li>
              <li>Compile with <code>-fsanitize=address</code> and see how AddressSanitizer reports the double free.</li>
              <li>What happens if you free a pointer, then allocate something else, then free the original pointer again? The memory manager may have reused the block.</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Always compile with <code>-g -fsanitize=address</code> during development. It catches double frees and many other memory errors.</p>
            <p><strong>📦 Code reviews:</strong> Look for missing <code>ptr = NULL</code> after free; it's a red flag.</p>
            <p><strong>🧹 Cleanup pattern:</strong> Use a single cleanup label with a <code>if (ptr) free(ptr); ptr = NULL;</code> structure to centralize deallocation.</p>
            <p><strong>📏 Ownership documentation:</strong> Use comments like <code>// caller must free returned pointer</code> to avoid double frees from unclear responsibility.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Double free is a classic C mistake. I often tell my students: 'If you free a pointer, you become the pointer's ghost — haunting it with NULL.' Setting it to NULL after free makes it safe to call free again, and it immediately signals that the pointer is no longer valid. Use this habit from day one."
        />
      </div>
    </>
  );
};

export default Topic8;