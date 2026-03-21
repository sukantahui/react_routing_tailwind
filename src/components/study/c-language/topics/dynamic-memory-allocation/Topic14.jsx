import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import goodPatterns from './topic14_files/good_patterns.c?raw';
import badPatterns from './topic14_files/bad_patterns.c?raw';
import cleanupPattern from './topic14_files/cleanup_pattern.c?raw';

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

const Topic14 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // patterns
    '300ms',  // pitfalls
    '400ms',  // svg
    '500ms',  // code examples
    '600ms',  // best practices
    '700ms',  // checklist
    '800ms',  // hints
    '900ms',  // tips
  ];

  const getSectionClass = () => clsx('animate-fade-slide-up', 'opacity-0');

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 dark:bg-gray-900 bg-gray-50 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <div className={getSectionClass()} style={{ animationDelay: sectionDelays[0] }}>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Typical Patterns & Pitfalls in Dynamic Allocation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            What to do, what to avoid — a professional's guide to safe heap management.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Patterns That Work, Pitfalls That Break
          </h2>
          <p className="leading-relaxed mb-3">
            Dynamic memory management is powerful but error‑prone. Over the years, programmers have developed
            reliable patterns that prevent leaks, corruption, and crashes. Equally important is knowing the
            common pitfalls that lead to bugs.
          </p>
          <p className="leading-relaxed">
            This topic consolidates the most important patterns and warns against the most frequent mistakes.
            Mastering these will make your C code robust and maintainable.
          </p>
        </section>

        {/* Good Patterns */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Good Patterns
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <ul className="space-y-4">
              <li>
                <strong className="text-green-500">1. Check allocation result:</strong> Always verify that <code>malloc</code>/<code>calloc</code>/<code>realloc</code> returned non‑<code>NULL</code>.
              </li>
              <li>
                <strong className="text-green-500">2. Use <code>sizeof(*ptr)</code>:</strong> <code>ptr = malloc(sizeof(*ptr));</code> avoids type mismatches.
              </li>
              <li>
                <strong className="text-green-500">3. Set freed pointers to <code>NULL</code>:</strong> Prevents accidental double free or use‑after‑free.
              </li>
              <li>
                <strong className="text-green-500">4. Pair allocations and frees in the same scope:</strong> Easier to track ownership.
              </li>
              <li>
                <strong className="text-green-500">5. Use cleanup sections (goto or function):</strong> Centralized error handling ensures all allocated resources are freed.
              </li>
              <li>
                <strong className="text-green-500">6. Grow arrays by doubling capacity:</strong> Provides amortized O(1) insertion.
              </li>
              <li>
                <strong className="text-green-500">7. Document ownership:</strong> Comments like <code>// caller must free returned pointer</code> clarify responsibility.
              </li>
            </ul>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            ❌ Common Pitfalls
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <ul className="space-y-4">
              <li>
                <strong className="text-red-500">1. Forgetting to check <code>NULL</code>:</strong> Dereferencing <code>NULL</code> crashes or corrupts.
              </li>
              <li>
                <strong className="text-red-500">2. Memory leaks:</strong> Not freeing memory, especially in error paths.
              </li>
              <li>
                <strong className="text-red-500">3. Double free:</strong> Calling <code>free</code> twice on the same pointer → undefined behavior.
              </li>
              <li>
                <strong className="text-red-500">4. Use‑after‑free:</strong> Accessing memory after it's freed → dangling pointer.
              </li>
              <li>
                <strong className="text-red-500">5. Buffer overflow:</strong> Writing beyond allocated size, often due to off‑by‑one or missing null terminator.
              </li>
              <li>
                <strong className="text-red-500">6. Freeing non‑heap memory:</strong> Passing stack or global address to <code>free</code>.
              </li>
              <li>
                <strong className="text-red-500">7. Incorrect <code>sizeof</code>:</strong> <code>malloc(10 * sizeof(int*))</code> when you meant <code>int</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing Good vs Bad
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 200" className="w-full h-auto" aria-label="Good vs bad patterns">
              <rect width="800" height="200" fill="transparent" />

              {/* Good side */}
              <rect x="50" y="20" width="320" height="160" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" rx="8" />
              <text x="70" y="45" fill="currentColor" className="text-sm font-semibold">✅ Good Pattern</text>
              <text x="70" y="75" fill="currentColor" className="text-xs">• Check malloc return</text>
              <text x="70" y="95" fill="currentColor" className="text-xs">• Set ptr = NULL after free</text>
              <text x="70" y="115" fill="currentColor" className="text-xs">• Use sizeof(*ptr)</text>
              <text x="70" y="135" fill="currentColor" className="text-xs">• Cleanup section</text>
              <text x="70" y="155" fill="currentColor" className="text-xs">• Free in reverse order</text>

              {/* Bad side */}
              <rect x="430" y="20" width="320" height="160" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" rx="8" />
              <text x="450" y="45" fill="currentColor" className="text-sm font-semibold">❌ Bad Pattern</text>
              <text x="450" y="75" fill="currentColor" className="text-xs">• No NULL check</text>
              <text x="450" y="95" fill="currentColor" className="text-xs">• Forgetting free</text>
              <text x="450" y="115" fill="currentColor" className="text-xs">• Double free</text>
              <text x="450" y="135" fill="currentColor" className="text-xs">• Use after free</text>
              <text x="450" y="155" fill="currentColor" className="text-xs">• Buffer overflow</text>
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
              title="Example 1: Good patterns (safe allocation, cleanup)"
              initialCode={goodPatterns}
            />
            <EditableCCodeBlock
              title="Example 2: Bad patterns (memory leaks, dangling pointers)"
              initialCode={badPatterns}
            />
            <EditableCCodeBlock
              title="Example 3: Cleanup pattern with goto"
              initialCode={cleanupPattern}
            />
          </div>
        </section>

        {/* Best Practices Summary */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📋 Best Practices Summary
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ <strong>Always check return values.</strong> Treat allocation as fallible.</li>
              <li>✔️ <strong>Use <code>sizeof(*ptr)</code></strong> to avoid type mismatches.</li>
              <li>✔️ <strong>Set freed pointers to <code>NULL</code></strong> to prevent double free and use‑after‑free.</li>
              <li>✔️ <strong>Centralize cleanup</strong> with a goto‑label or a dedicated function.</li>
              <li>✔️ <strong>Free in reverse order</strong> to reduce fragmentation.</li>
              <li>✔️ <strong>Document ownership</strong> clearly in comments.</li>
              <li>✔️ <strong>Use tools</strong> like Valgrind, AddressSanitizer regularly.</li>
            </ul>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            📋 Mini Checklist
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-1">
              <li>☐ I check every allocation for NULL.</li>
              <li>☐ I free every allocation exactly once.</li>
              <li>☐ I set pointers to NULL after free.</li>
              <li>☐ I never use a pointer after freeing it.</li>
              <li>☐ I use a consistent cleanup pattern (goto cleanup).</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Think about...</p>
            <ul className="list-disc list-inside mt-2">
              <li>In the bad patterns example, what happens if you run it with a tool like Valgrind?</li>
              <li>How would you modify the cleanup pattern to handle a third allocation?</li>
              <li>Why is it dangerous to rely on the system to free memory at program exit?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[9] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind --leak-check=full</code> to catch leaks and use‑after‑free.</p>
            <p><strong>📦 Code review checklist:</strong> For every allocation, ensure there's a corresponding free in all code paths.</p>
            <p><strong>🧹 Modern C:</strong> Use <code>_Static_assert</code> to verify sizes and consider using <code>alloca</code> for small, short‑lived allocations.</p>
            <p><strong>📏 Avoid <code>realloc</code> for tiny increments:</strong> Double capacity instead to maintain O(1) amortized cost.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Dynamic allocation is a two‑edged sword. The patterns I've shown you are battle‑tested and will save you countless hours of debugging. Always, always free what you allocate — and set the pointer to NULL. This simple habit turns a subtle bug into a clean crash, which is infinitely easier to fix."
        />
      </div>
    </>
  );
};

export default Topic14;