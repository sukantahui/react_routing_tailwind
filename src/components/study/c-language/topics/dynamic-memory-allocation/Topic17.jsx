import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import valgrindLeak from './topic17_files/valgrind_leak.c?raw';
import valgrindUseAfterFree from './topic17_files/valgrind_use_after_free.c?raw';
import valgrindInvalidRead from './topic17_files/valgrind_invalid_read.c?raw';

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

const Topic17 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // what is valgrind
    '300ms',  // common errors
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
            Using Tools Like Valgrind
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Automating memory debugging — how Valgrind catches leaks, invalid accesses, and more.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Beyond printf: Automated Memory Analysis
          </h2>
          <p className="leading-relaxed mb-3">
            While <code>printf</code> debugging is useful, it quickly becomes tedious and misses many errors.
            Tools like <strong>Valgrind</strong>, <strong>AddressSanitizer (ASan)</strong>, and
            <strong>LeakSanitizer</strong> automate the detection of memory bugs. They run your program
            under a virtual machine or compile‑time instrumentation and report exactly where memory
            issues occur.
          </p>
          <p className="leading-relaxed">
            This topic introduces Valgrind's Memcheck tool — the most widely used memory debugger on Linux.
            It detects:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Memory leaks</li>
            <li>Use‑after‑free (dangling pointers)</li>
            <li>Double free</li>
            <li>Invalid reads/writes (buffer overflows)</li>
            <li>Uninitialized memory reads</li>
          </ul>
        </section>

        {/* What is Valgrind */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            🔍 How Valgrind Works
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              Valgrind runs your program in a virtual machine that intercepts all memory accesses,
              allocations, and deallocations. It tracks the state of every byte of memory:
              whether it's allocated, freed, initialized, or part of a valid heap block.
            </p>
            <p className="leading-relaxed mb-3">
              When your program does something invalid (e.g., reading a byte that was never initialized),
              Valgrind immediately reports the error with a stack trace, helping you pinpoint the issue.
            </p>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm font-mono">
                $ valgrind --leak-check=full ./myprogram
              </p>
              <p className="text-sm mt-1">
                This runs your program and reports any leaks or errors.
              </p>
            </div>
          </div>
        </section>

        {/* Common Errors Detected */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🐞 What Valgrind Catches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">💧 Memory Leaks</h3>
              <p className="mt-2 leading-relaxed text-sm">
                "definitely lost" — memory that was allocated but never freed, with no pointers to it.
                "indirectly lost" — memory that is reachable only through lost blocks (e.g., in a linked list).
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">⚠️ Invalid Read/Write</h3>
              <p className="mt-2 leading-relaxed text-sm">
                Accessing memory outside allocated bounds (buffer overflow) or reading/writing freed memory.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">❌ Use‑After‑Free</h3>
              <p className="mt-2 leading-relaxed text-sm">
                Dereferencing a pointer after it's been freed. Valgrind marks freed memory as invalid.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🔢 Uninitialized Values</h3>
              <p className="mt-2 leading-relaxed text-sm">
                Reading bytes that were never initialized (e.g., using a local variable before assignment).
              </p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Valgrind Output Example
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 220" className="w-full h-auto" aria-label="Valgrind output illustration">
              <rect width="800" height="220" fill="transparent" />
              <rect x="50" y="30" width="700" height="170" fill="rgba(0,0,0,0.05)" stroke="none" rx="4" />
              <text x="70" y="55" fill="currentColor" className="text-xs font-mono">==12345== HEAP SUMMARY:</text>
              <text x="70" y="75" fill="currentColor" className="text-xs font-mono">==12345==     in use at exit: 100 bytes in 1 blocks</text>
              <text x="70" y="95" fill="currentColor" className="text-xs font-mono">==12345==   total heap usage: 2 allocs, 1 frees, 200 bytes allocated</text>
              <text x="70" y="115" fill="currentColor" className="text-xs font-mono">==12345==</text>
              <text x="70" y="135" fill="#ef4444" className="text-xs font-mono">==12345== 100 bytes in 1 blocks are definitely lost in loss record 1 of 1</text>
              <text x="70" y="155" fill="#ef4444" className="text-xs font-mono">==12345==    at 0x4C2C1F0: malloc (vg_replace_malloc.c:299)</text>
              <text x="70" y="175" fill="#ef4444" className="text-xs font-mono">==12345==    by 0x4005A7: main (leak.c:5)</text>
              <text x="70" y="195" fill="currentColor" className="text-xs font-mono">==12345== LEAK SUMMARY:</text>
              <text x="70" y="215" fill="currentColor" className="text-xs font-mono">==12345==    definitely lost: 100 bytes in 1 blocks</text>
            </svg>
          </div>
        </section>

        {/* Code Examples */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💻 Code Examples (To Run with Valgrind)
          </h2>
          <div className="space-y-6">
            <EditableCCodeBlock
              title="Example 1: Memory leak"
              initialCode={valgrindLeak}
            />
            <EditableCCodeBlock
              title="Example 2: Use‑after‑free"
              initialCode={valgrindUseAfterFree}
            />
            <EditableCCodeBlock
              title="Example 3: Invalid read (buffer overflow)"
              initialCode={valgrindInvalidRead}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls When Using Valgrind
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Not compiling with debug symbols (<code>-g</code>):</strong> Valgrind reports only addresses, not line numbers.</li>
            <li><strong>Running on optimized code (<code>-O2</code>):</strong> Optimizations can confuse Valgrind; use <code>-O0</code> during debugging.</li>
            <li><strong>Ignoring "possibly lost" blocks:</strong> Sometimes false positives, but often real leaks.</li>
            <li><strong>Not using <code>--leak-check=full</code>:</strong> Without it, you only get a summary.</li>
            <li><strong>Running Valgrind on a program that uses lots of memory:</strong> It becomes very slow (10–50x slower). Use sanitizers for faster feedback.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always compile with <code>-g</code> when using Valgrind to get accurate source locations.</li>
              <li>✔️ Use <code>--leak-check=full --show-leak-kinds=all</code> to see every leak.</li>
              <li>✔️ Run Valgrind on a representative workload to catch leaks that occur over time.</li>
              <li>✔️ Integrate Valgrind into your CI pipeline to prevent regressions.</li>
              <li>✔️ For large codebases, consider using <code>--track-origins=yes</code> to track uninitialized values.</li>
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
              <li>☐ I know what Valgrind is and what it detects.</li>
              <li>☐ I can run a program under Valgrind and interpret basic output.</li>
              <li>☐ I understand the difference between "definitely lost" and "possibly lost".</li>
              <li>☐ I compile with <code>-g</code> when debugging with Valgrind.</li>
              <li>☐ I can identify leaks, invalid reads, and use‑after‑free in Valgrind reports.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Try running Valgrind on the provided examples:</p>
            <ul className="list-disc list-inside mt-2">
              <li><code>gcc -g leak.c -o leak</code></li>
              <li><code>valgrind --leak-check=full ./leak</code></li>
              <li>What does the output say about the allocated memory?</li>
              <li>How would you fix each example?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Valgrind + GDB:</strong> Use <code>vgdb</code> to combine Valgrind's error detection with GDB's interactive debugging.</p>
            <p><strong>📦 Speed up:</strong> For faster iterations, use AddressSanitizer (<code>-fsanitize=address</code>) which adds runtime checks with less slowdown.</p>
            <p><strong>🧹 Filter output:</strong> Suppress known leaks from libraries using <code>--suppressions=file.supp</code>.</p>
            <p><strong>📏 Automation:</strong> Run Valgrind on unit tests to catch leaks early.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Valgrind is the memory debugger that every C programmer should master. It finds bugs that are nearly impossible to spot by hand. Spend an hour learning its output — it will save you days of debugging. And remember: Valgrind slows down your program, so use it during development, not in production."
        />
      </div>
    </>
  );
};

export default Topic17;