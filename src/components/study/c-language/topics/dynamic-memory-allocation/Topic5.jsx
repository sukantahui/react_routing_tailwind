import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import reallocGrow from './topic5_files/realloc_grow.c?raw';
import reallocShrink from './topic5_files/realloc_shrink.c?raw';
import reallocFailure from './topic5_files/realloc_failure.c?raw';

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

const Topic5 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // prototype
    '300ms',  // growing
    '400ms',  // shrinking
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
            Resizing Memory with realloc
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Growing and shrinking heap memory dynamically — the Swiss Army knife of dynamic memory.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            When Static Size Isn't Enough
          </h2>
          <p className="leading-relaxed mb-3">
            In real‑world programs, you often don't know the final size of a data structure at the time of
            allocation. <code>realloc()</code> lets you resize an existing heap block — either to make it
            larger (to accommodate more data) or smaller (to release unused memory).
          </p>
          <p className="leading-relaxed">
            It's the cornerstone of dynamic arrays, expandable buffers, and string builders in C.
          </p>
        </section>

        {/* Prototype & Basics */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📜 realloc — Prototype & Behaviour
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <div className="font-mono text-sm mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
              void* realloc(void *ptr, size_t new_size);
            </div>
            <ul className="space-y-2">
              <li><strong>Purpose:</strong> Change the size of a previously allocated memory block.</li>
              <li><strong>Parameters:</strong> <code>ptr</code> – pointer to previously allocated memory (or <code>NULL</code>), <code>new_size</code> – new size in bytes.</li>
              <li><strong>Return value:</strong> Pointer to the resized block (may be the same as <code>ptr</code> or a new address). Returns <code>NULL</code> on failure; the original block remains unchanged.</li>
              <li><strong>If ptr is NULL:</strong> Behaves like <code>malloc(new_size)</code>.</li>
              <li><strong>If new_size is 0:</strong> Behaves like <code>free(ptr)</code> and returns <code>NULL</code> (implementation‑defined, avoid).</li>
            </ul>
          </div>
        </section>

        {/* Growing Memory */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            📈 Growing a Block
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              When you need more space, <code>realloc</code> attempts to expand the existing block. If there's
              enough contiguous memory after it, the same pointer is returned. Otherwise, a new larger block
              is allocated, the contents are copied, and the old block is freed.
            </p>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm"><strong>💡 Important:</strong> Always store the return value in a temporary
              pointer. If <code>realloc</code> fails, it returns <code>NULL</code> but the original block is
              still valid. Using the original pointer directly would cause a memory leak.</p>
            </div>
          </div>
        </section>

        {/* Shrinking Memory */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-4 mb-4">
            📉 Shrinking a Block
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              You can also shrink a block to release unused memory. <code>realloc</code> may or may not
              move the block when shrinking; it's implementation‑dependent. The contents of the new block
              are preserved up to the smaller size, and the extra bytes are freed.
            </p>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="text-sm"><strong>⚠️ Caution:</strong> Shrinking does not guarantee that memory is
              returned to the OS; it might just mark the extra space as free within the heap.</p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ How realloc Works
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 320" className="w-full h-auto" aria-label="realloc diagram">
              <rect width="800" height="320" fill="transparent" />

              {/* Original block */}
              <rect x="50" y="40" width="200" height="50" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="70" fill="currentColor" className="text-xs">Original block (ptr)</text>

              {/* Success: same address */}
              <rect x="300" y="40" width="300" height="50" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" rx="4" />
              <text x="310" y="70" fill="currentColor" className="text-xs">Expanded (same address) – if space after is free</text>
              <line x1="250" y1="65" x2="300" y2="65" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" />
              <defs>
                <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#22c55e" />
                </marker>
                <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#a855f7" />
                </marker>
              </defs>

              {/* Alternative: move to new address */}
              <rect x="50" y="140" width="200" height="50" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="170" fill="currentColor" className="text-xs">Original block (ptr)</text>
              <rect x="450" y="140" width="300" height="50" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2" rx="4" />
              <text x="460" y="170" fill="currentColor" className="text-xs">New block (contents copied, old freed)</text>
              <line x1="250" y1="165" x2="450" y2="165" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowPurple)" strokeDasharray="5 3" />

              {/* Shrink */}
              <rect x="50" y="240" width="300" height="50" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="270" fill="currentColor" className="text-xs">Original block</text>
              <rect x="50" y="240" width="150" height="50" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="2" rx="4" />
              <text x="60" y="270" fill="currentColor" className="text-xs">Shrunk (size reduced)</text>
              <text x="220" y="270" fill="currentColor" className="text-xs">freed portion</text>
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
              title="Example 1: Growing a dynamic array"
              initialCode={reallocGrow}
            />
            <EditableCCodeBlock
              title="Example 2: Shrinking after use"
              initialCode={reallocShrink}
            />
            <EditableCCodeBlock
              title="Example 3: Proper error handling"
              initialCode={reallocFailure}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Not checking return value:</strong> If <code>realloc</code> fails and returns <code>NULL</code>, the original pointer is lost, causing a memory leak.</li>
            <li><strong>Using original pointer after failure:</strong> The original pointer is still valid, but you must handle failure properly.</li>
            <li><strong>Assuming same address:</strong> Code that relies on the pointer staying the same may break.</li>
            <li><strong>Using <code>realloc</code> with size 0:</strong> Behaviour is implementation‑defined (may act like <code>free</code> but not guaranteed). Avoid.</li>
            <li><strong>Shrinking and assuming memory is returned:</strong> The freed space may not be given back to the OS, causing memory usage to stay high.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always use a temporary pointer to store the result of <code>realloc</code> and check for <code>NULL</code>.</li>
              <li>✔️ If <code>realloc</code> fails, keep the original pointer and handle the error (e.g., log, retry, or exit).</li>
              <li>✔️ For growing dynamic arrays, double the capacity (or multiply by 1.5) to amortize the cost.</li>
              <li>✔️ When shrinking, consider if it's worth the overhead; often it's better to just keep the memory for future growth.</li>
              <li>✔️ Use <code>realloc(NULL, size)</code> as a portable way to allocate memory (though <code>malloc</code> is clearer).</li>
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
              <li>☐ I know the prototype of <code>realloc</code> and how it behaves.</li>
              <li>☐ I always store the return value in a temporary variable and check for <code>NULL</code>.</li>
              <li>☐ I understand that <code>realloc</code> may move the block to a new address.</li>
              <li>☐ I can grow and shrink a dynamic array correctly.</li>
              <li>☐ I handle allocation failures gracefully without leaking memory.</li>
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
              <li>In the growing example, what happens if you remove the temporary pointer and assign directly to <code>arr</code>?</li>
              <li>Try to <code>realloc</code> a very large size (e.g., beyond available memory) and see how <code>NULL</code> is handled.</li>
              <li>What does <code>realloc(ptr, 0)</code> do on your system? Is it consistent with the standard?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[11] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> to detect leaks when <code>realloc</code> fails incorrectly.</p>
            <p><strong>📦 Performance:</strong> Avoid calling <code>realloc</code> for every single element; use exponential growth strategy.</p>
            <p><strong>🧹 Cleanup patterns:</strong> When shrinking, you can use <code>realloc</code> to match the exact needed size after building a collection.</p>
            <p><strong>📏 Portability:</strong> Don't rely on <code>realloc</code> with <code>size == 0</code>; use explicit <code>free</code> and set pointer to <code>NULL</code>.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="realloc is a powerful tool, but with great power comes great responsibility. The golden rule: always use a temporary pointer to capture the return value. This simple habit prevents memory leaks and crashes. In interviews, they love to ask about realloc failure handling — master it!"
        />
      </div>
    </>
  );
};

export default Topic5;