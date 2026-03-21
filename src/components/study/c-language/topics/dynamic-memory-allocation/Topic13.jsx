import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import basicNullCheck from './topic13_files/basic_null_check.c?raw';
import multiAllocCheck from './topic13_files/multi_allocation_check.c?raw';
import missingCheckDemo from './topic13_files/missing_check_demo.c?raw';

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

const Topic13 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // why
    '300ms',  // when
    '400ms',  // patterns
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
            Error Handling: Checking NULL After Allocation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            The one check that can save your program from crashing — and why it's non‑negotiable.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Why NULL Checks Are Mandatory
          </h2>
          <p className="leading-relaxed mb-3">
            Every dynamic allocation function (<code>malloc</code>, <code>calloc</code>, <code>realloc</code>)
            returns a pointer. On success, it points to usable memory. On failure, it returns <code>NULL</code>.
            Failure can happen for many reasons: the system is out of memory, the request size is too large,
            or the heap is exhausted/fragmented.
          </p>
          <p className="leading-relaxed">
            Dereferencing a <code>NULL</code> pointer causes <strong>undefined behavior</strong> — most often
            a segmentation fault that crashes your program. In embedded systems, it could cause a hard fault.
            A proper check is the only way to ensure your program can recover or fail gracefully.
          </p>
        </section>

        {/* When Does Allocation Fail */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            💥 When Does Allocation Return NULL?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">⚠️ Out of Memory</h3>
              <p className="mt-2 leading-relaxed">
                The system has no more virtual memory to satisfy the request. This is common in
                resource‑constrained environments or when leaks accumulate.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">📏 Request Too Large</h3>
              <p className="mt-2 leading-relaxed">
                Even if total memory is available, a single request may exceed the allocator's maximum
                block size (e.g., trying to allocate several gigabytes on a 32‑bit system).
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">🧩 Fragmentation</h3>
              <p className="mt-2 leading-relaxed">
                The heap may have enough total free space, but it's split into many small blocks, and
                no single block is large enough.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-medium">📌 Zero‑Size Request</h3>
              <p className="mt-2 leading-relaxed">
                <code>malloc(0)</code> may return <code>NULL</code> or a non‑NULL pointer that cannot be
                dereferenced. The standard says the behavior is implementation‑defined; always avoid it.
              </p>
            </div>
          </div>
        </section>

        {/* Proper Error Handling Patterns */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            🛡️ Proper NULL Check Patterns
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-medium mb-2">Single Allocation</h3>
            <div className="font-mono text-sm p-3 bg-gray-100 dark:bg-gray-700 rounded mb-3">
            <pre>{`    
    int *ptr = (int*)malloc(sizeof(int));<br/>
    if (ptr == NULL) {
        fprintf(stderr, "Allocation failed");
        return EXIT_FAILURE;<br/>
    }
    *ptr = 42;`}
            </pre>  
            </div>

            <h3 className="text-xl font-medium mb-2 mt-4">Multiple Allocations (Goto Cleanup)</h3>
            <div className="font-mono text-sm p-3 bg-gray-100 dark:bg-gray-700 rounded">
              int *a = NULL, *b = NULL;<br/>
              a = malloc(...);<br/>
              if (!a) goto cleanup;<br/>
              b = malloc(...);<br/>
              if (!b) goto cleanup;<br/>
              // use a and b<br/>
              cleanup:<br/>
              &nbsp;&nbsp;free(a);<br/>
              &nbsp;&nbsp;free(b);<br/>
              &nbsp;&nbsp;return error_code;
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm"><strong>💡 Tip:</strong> Always initialize pointers to <code>NULL</code> so that <code>free</code> is safe even if allocation fails.</p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ NULL Check Flow
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 600 300" className="w-full h-auto" aria-label="NULL check flow chart">
              <rect width="600" height="300" fill="transparent" />

              {/* Start */}
              <rect x="250" y="20" width="100" height="30" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="2" rx="4" />
              <text x="275" y="40" fill="currentColor" className="text-xs">malloc()</text>
              <line x1="300" y1="50" x2="300" y2="80" stroke="#6b7280" strokeWidth="2" />

              {/* Decision diamond */}
              <polygon points="300,90 340,120 300,150 260,120" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" />
              <text x="275" y="125" fill="currentColor" className="text-xs">ptr == NULL?</text>
              <line x1="300" y1="150" x2="300" y2="190" stroke="#ef4444" strokeWidth="2" />
              <line x1="340" y1="120" x2="400" y2="120" stroke="#22c55e" strokeWidth="2" />

              {/* Failure branch */}
              <rect x="230" y="190" width="140" height="40" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="250" y="215" fill="currentColor" className="text-xs">Handle error (log, exit, etc.)</text>
              <line x1="300" y1="230" x2="300" y2="270" stroke="#ef4444" strokeWidth="2" />
              <rect x="250" y="270" width="100" height="25" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" rx="4" />
              <text x="270" y="287" fill="currentColor" className="text-xs">Return error</text>

              {/* Success branch */}
              <rect x="410" y="100" width="140" height="40" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="2" rx="4" />
              <text x="430" y="125" fill="currentColor" className="text-xs">Use pointer safely</text>
              <line x1="480" y1="140" x2="480" y2="180" stroke="#22c55e" strokeWidth="2" />
              <rect x="430" y="180" width="100" height="25" fill="rgba(34,197,94,0.2)" stroke="#22c55e" strokeWidth="1" rx="4" />
              <text x="455" y="197" fill="currentColor" className="text-xs">Continue</text>
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
              title="Example 1: Basic NULL check"
              initialCode={basicNullCheck}
            />
            <EditableCCodeBlock
              title="Example 2: Handling multiple allocations"
              initialCode={multiAllocCheck}
            />
            <EditableCCodeBlock
              title="Example 3: Missing check (dangerous)"
              initialCode={missingCheckDemo}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[6] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Omitting the check:</strong> Assuming allocation always succeeds leads to crashes.</li>
            <li><strong>Checking after dereference:</strong> <code>*ptr = 42; if (!ptr) ...</code> – the dereference already crashed.</li>
            <li><strong>Not initializing pointers to NULL before cleanup:</strong> Freeing uninitialized pointer is undefined.</li>
            <li><strong>Ignoring partial allocation failures:</strong> After one allocation fails, you must free already allocated ones.</li>
            <li><strong>Using <code>ptr == NULL</code> but not handling it:</strong> Only logging and continuing is dangerous.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Always check every allocation return value against <code>NULL</code>.</li>
              <li>✔️ Initialize all pointer variables to <code>NULL</code> so <code>free</code> is safe.</li>
              <li>✔️ Use a consistent error handling strategy: return error code, log, and clean up.</li>
              <li>✔️ For multiple allocations, use a <code>goto cleanup</code> pattern or a dedicated function to release resources.</li>
              <li>✔️ Document that functions returning heap pointers can return <code>NULL</code>; caller must check.</li>
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
              <li>☐ I always check the return value of <code>malloc</code>/<code>calloc</code>/<code>realloc</code>.</li>
              <li>☐ I know what to do when allocation fails (log, clean up, return error).</li>
              <li>☐ I never dereference a pointer before checking for <code>NULL</code>.</li>
              <li>☐ I initialize pointers to <code>NULL</code> before using them in cleanup code.</li>
              <li>☐ I understand that ignoring <code>NULL</code> can cause crashes or security vulnerabilities.</li>
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
              <li>In the missing check example, what would happen if you try to allocate a huge size?</li>
              <li>How would you modify the multi-allocation example to also handle the case where the second allocation fails?</li>
              <li>Why is it important to free already‑allocated memory if a later allocation fails?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> to detect dereference of NULL? Actually, Valgrind will catch it as an invalid read/write. But better to prevent.</p>
            <p><strong>📦 Defensive programming:</strong> Wrap allocation in a macro that checks and aborts if allocation fails – but only in simple tools, not in libraries.</p>
            <p><strong>🧹 RAII in C++:</strong> If you switch to C++, use smart pointers (std::unique_ptr) that automatically handle NULL checks.</p>
            <p><strong>📏 Code review:</strong> Always look for missing NULL checks in code reviews; they are a frequent source of bugs.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Checking NULL after allocation is like checking the parachute before jumping – you don't skip it. I've seen students lose hours debugging segfaults that a simple 'if (!ptr)' would have prevented. Make it a reflex: after every allocation, immediately check and handle failure. Your future self will thank you."
        />
      </div>
    </>
  );
};

export default Topic13;