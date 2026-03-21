import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import danglingExample from './topic7_files/dangling_example.c?raw';
import nullAfterFree from './topic7_files/null_after_free.c?raw';
import preventDangling from './topic7_files/prevent_dangling.c?raw';

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

const Topic7 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // what
    '300ms',  // why dangerous
    '400ms',  // prevention
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
            Dangling Pointers After free
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            The phantom pointer that points to nowhere — understanding and preventing this dangerous bug.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            What is a Dangling Pointer?
          </h2>
          <p className="leading-relaxed mb-3">
            A <strong>dangling pointer</strong> is a pointer that continues to hold the address of memory
            that has already been freed (deallocated). The pointer still "points" somewhere, but the
            memory it refers to is no longer valid. Accessing it leads to <strong>undefined behavior</strong>.
          </p>
          <p className="leading-relaxed">
            Dangling pointers are among the most insidious bugs in C because they may work sometimes,
            crash unpredictably, or cause silent data corruption.
          </p>
        </section>

        {/* Why it's dangerous */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💀 Why Dangling Pointers Are Dangerous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">💥 Crashes</h3>
              <p className="mt-2 leading-relaxed">
                The most common outcome: segmentation fault or access violation when you try to use freed memory.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🔁 Silent Corruption</h3>
              <p className="mt-2 leading-relaxed">
                If the memory has been reallocated to another part of the program, modifying it corrupts unrelated data.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🐞 Heisenbugs</h3>
              <p className="mt-2 leading-relaxed">
                Bugs that disappear when you try to debug them — because the memory layout changes under the debugger.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🔒 Security Vulnerabilities</h3>
              <p className="mt-2 leading-relaxed">
                Use‑after‑free can be exploited to execute arbitrary code or leak sensitive information.
              </p>
            </div>
          </div>
        </section>

        {/* Prevention Strategies */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            🛡️ How to Prevent Dangling Pointers
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <ul className="space-y-3">
              <li><strong>✔️ Set pointer to NULL after free:</strong> <code>free(ptr); ptr = NULL;</code> — subsequent dereference will cause a clean crash (segfault) rather than silent corruption.</li>
              <li><strong>✔️ Avoid returning pointers to local (stack) variables:</strong> They become invalid as soon as the function returns.</li>
              <li><strong>✔️ Use copies when necessary:</strong> If you need to keep a value after freeing, copy it.</li>
              <li><strong>✔️ Design clear ownership:</strong> Document which function is responsible for freeing memory.</li>
              <li><strong>✔️ Use static analysis tools:</strong> Valgrind, AddressSanitizer can detect use‑after‑free.</li>
              <li><strong>✔️ In C++, use smart pointers:</strong> <code>std::unique_ptr</code>, <code>std::shared_ptr</code> automate lifetime.</li>
            </ul>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing Dangling Pointers
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 280" className="w-full h-auto" aria-label="Dangling pointer diagram">
              <rect width="800" height="280" fill="transparent" />

              {/* Before free */}
              <text x="50" y="30" fill="currentColor" className="text-sm">1. Before free:</text>
              <rect x="50" y="50" width="200" height="50" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="60" y="80" fill="currentColor" className="text-xs">Heap block (valid)</text>
              <line x1="270" y1="75" x2="350" y2="75" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="290" y="70" fill="currentColor" className="text-xs">ptr</text>
              <circle cx="360" cy="75" r="12" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" />
              <text x="355" y="80" fill="currentColor" className="text-xs">ptr</text>

              {/* After free — dangling */}
              <text x="50" y="150" fill="currentColor" className="text-sm">2. After free(ptr):</text>
              <rect x="50" y="170" width="200" height="50" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" rx="4" strokeDasharray="5 3" />
              <text x="60" y="200" fill="#ef4444" className="text-xs">Freed block (invalid)</text>
              <line x1="270" y1="195" x2="350" y2="195" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" strokeDasharray="5 3" />
              <text x="290" y="190" fill="#ef4444" className="text-xs">ptr still points here!</text>
              <circle cx="360" cy="195" r="12" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" />
              <text x="355" y="200" fill="#ef4444" className="text-xs">ptr</text>
              <text x="420" y="195" fill="#ef4444" className="text-xs">DANGLING</text>

              {/* Prevention: set to NULL */}
              <text x="50" y="250" fill="currentColor" className="text-sm">3. Prevention: set ptr = NULL after free</text>
              <line x1="50" y1="270" x2="750" y2="270" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
              <text x="60" y="270" fill="#22c55e" className="text-xs">free(ptr); ptr = NULL; → safe, dereference will crash cleanly</text>

              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#3b82f6" />
                </marker>
                <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
                </marker>
              </defs>
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
              title="Example 1: Dangling pointer after free"
              initialCode={danglingExample}
            />
            <EditableCCodeBlock
              title="Example 2: Preventing with NULL after free"
              initialCode={nullAfterFree}
            />
            <EditableCCodeBlock
              title="Example 3: Returning pointer to local variable (dangling)"
              initialCode={preventDangling}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Forgetting to set pointer to NULL after free:</strong> Leads to accidental reuse later.</li>
            <li><strong>Assuming freed memory is immediately reused:</strong> It might not be, hiding bugs until later.</li>
            <li><strong>Returning address of local variable:</strong> The stack frame is gone, but the pointer is still used.</li>
            <li><strong>Using the same pointer after free in a different function:</strong> Especially when pointers are passed around.</li>
            <li><strong>Not checking if a pointer is NULL before use:</strong> Even after setting to NULL, always check.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Immediately after <code>free</code>, set the pointer to <code>NULL</code>.</li>
              <li>✔️ Avoid returning pointers to local variables; allocate on heap if data must outlive the function.</li>
              <li>✔️ Use a consistent naming convention to indicate ownership (e.g., <code>owner_ptr</code>, <code>view_ptr</code>).</li>
              <li>✔️ In functions that accept pointers, document whether they expect ownership or not.</li>
              <li>✔️ Use tools like Valgrind and AddressSanitizer regularly to catch dangling pointer bugs.</li>
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
              <li>☐ I understand what a dangling pointer is and why it's dangerous.</li>
              <li>☐ I always set freed pointers to <code>NULL</code>.</li>
              <li>☐ I never return pointers to local stack variables.</li>
              <li>☐ I check pointers for <code>NULL</code> before dereferencing when possible.</li>
              <li>☐ I use tools to detect use‑after‑free.</li>
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
              <li>In the dangling example, what happens if you use the pointer after free? Does it crash or give wrong values?</li>
              <li>Try to compile with AddressSanitizer (<code>-fsanitize=address</code>) and see how it reports the error.</li>
              <li>What would happen if you free the pointer, then allocate new memory, and the new memory gets the same address? How would that affect the dangling pointer?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind --tool=memcheck</code> to find use‑after‑free. It's a lifesaver.</p>
            <p><strong>📦 Resource management:</strong> In C, use the "goto cleanup" pattern to ensure freed pointers are set to NULL in error paths.</p>
            <p><strong>🧹 RAII in C++:</strong> If you switch to C++, use <code>std::unique_ptr</code> to automatically manage lifetime.</p>
            <p><strong>📏 Code review:</strong> Always double‑check that every <code>free</code> is followed by <code>ptr = NULL</code> (or the pointer goes out of scope).</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="A dangling pointer is like a door key that still fits the lock even after the lock has been removed. It looks like it should work, but it leads to chaos. The simplest and most effective defense: after free, set the pointer to NULL. This turns a subtle corruption into a clean crash, which is far easier to debug."
        />
      </div>
    </>
  );
};

export default Topic7;