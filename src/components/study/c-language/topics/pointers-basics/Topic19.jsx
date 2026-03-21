import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import unsafeExamples from "./topic19_files/memory_safety_unsafe.c?raw";
import safePractices from "./topic19_files/memory_safety_safe.c?raw";

const Topic19 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Introduction to Memory Safety & Safe Pointer Practices
        </h1>
        <p className="text-lg leading-relaxed">
          Memory safety means ensuring that a program accesses only memory it is entitled to, and does so correctly. In C, where memory management is manual, unsafe pointer usage can lead to crashes, data corruption, and security vulnerabilities. Adopting safe pointer practices is essential for writing robust and secure code.
        </p>
      </div>

      {/* Core Concepts */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔒 What Is Memory Safety?</h2>
          <p className="leading-relaxed">
            Memory safety guarantees that a program:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Does not access memory outside allocated regions (no buffer overflows).</li>
            <li>Does not use memory after it has been freed (no use‑after‑free).</li>
            <li>Does not double‑free the same memory.</li>
            <li>Does not dereference invalid pointers (NULL or wild).</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Languages like Rust enforce memory safety at compile time; in C, we must be vigilant.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🛡️ Safe Pointer Practices</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Always initialize pointers (to NULL or a valid address).</li>
            <li>Check for NULL before dereferencing.</li>
            <li>Use bounds checking when accessing arrays.</li>
            <li>Set pointers to NULL after freeing them.</li>
            <li>Prefer stack allocation when possible to avoid manual management.</li>
          </ul>
        </div>
      </div>

      {/* SVG: Memory Safety Risks */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Common Memory Safety Violations</h3>
        <div className="flex justify-center">
          <svg width="500" height="180" viewBox="0 0 500 180" className="max-w-full h-auto">
            <rect x="30" y="20" width="100" height="100" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1.5" />
            <text x="80" y="50" textAnchor="middle" fontSize="10">Buffer</text>
            <text x="80" y="70" textAnchor="middle" fontSize="9">Overflow</text>
            <path d="M130 70 L170 70" stroke="#EF4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
            <text x="150" y="60" fontSize="9" fill="#EF4444">write beyond</text>

            <rect x="190" y="20" width="100" height="100" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="240" y="50" textAnchor="middle" fontSize="10">Freed</text>
            <text x="240" y="70" textAnchor="middle" fontSize="9">Memory</text>
            <path d="M290 70 L330 70" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
            <text x="310" y="60" fontSize="9" fill="#F59E0B">use after free</text>

            <rect x="350" y="20" width="100" height="100" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="400" y="50" textAnchor="middle" fontSize="10">NULL</text>
            <text x="400" y="70" textAnchor="middle" fontSize="9">Pointer</text>
            <path d="M450 70 L470 70" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
            <text x="460" y="60" fontSize="9" fill="#3B82F6">dereference</text>

            <defs>
              <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#EF4444" /></marker>
              <marker id="arrowOrange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#F59E0B" /></marker>
              <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><polygon points="0 0, 6 3, 0 6" fill="#3B82F6" /></marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Memory safety violations: buffer overflows, use‑after‑free, and NULL dereferences.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Why Memory Safety Matters</h3>
          <p className="leading-relaxed">
            Memory unsafety is the root cause of many critical bugs: crashes, data corruption, and security vulnerabilities like buffer overflow exploits. In embedded systems, it can cause hardware malfunction. By adopting safe practices, you not only make your code more reliable but also protect against potential attacks.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`// Unsafe: no bounds checking
char buf[10];
strcpy(buf, "This string is way too long");  // overflow

// Safe: use strncpy or check length
strncpy(buf, src, sizeof(buf)-1);
buf[sizeof(buf)-1] = '\\0';`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> The infamous Morris worm (1988) exploited a buffer overflow in <code>fingerd</code>. Modern security relies on memory‑safe practices.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🛠️ Safe Pointer Techniques</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Initialize pointers:</strong> <code>int *p = NULL;</code> – makes it easy to check validity.</li>
            <li><strong>Check bounds manually:</strong> Always validate indices before array access.</li>
            <li><strong>Use <code>const</code> for read‑only pointers:</strong> <code>const int *p</code> prevents accidental modification.</li>
            <li><strong>After <code>free()</code>, set pointer to <code>NULL</code>:</strong> <code>free(p); p = NULL;</code> avoids dangling pointers.</li>
            <li><strong>Prefer stack allocation for small, fixed‑size data:</strong> No risk of leaks or use‑after‑free.</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> At Barrackpore CNAT, <strong>Tuhina</strong> always uses <code>strncpy</code> and checks the result to avoid buffer overflows.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Unsafe vs Safe Code</h3>
        <EditableCCodeBlock
          title="Example 1: Unsafe Practices (Causes Crashes/Exploits)"
          initialCode={unsafeExamples}
        />
        <EditableCCodeBlock
          title="Example 2: Safe Practices (Robust & Secure)"
          initialCode={safePractices}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Trusting input without validation:</strong> Never assume data fits in your buffer.</li>
          <li><strong>Forgetting to include the null terminator:</strong> After <code>strncpy</code> or manual copy, always add <code>'\0'</code>.</li>
          <li><strong>Double‑free:</strong> Freeing the same pointer twice corrupts heap metadata.</li>
          <li><strong>Returning pointers to local variables:</strong> Creates dangling pointer.</li>
          <li><strong>Ignoring compiler warnings:</strong> Warnings often point to potential memory safety issues.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Adopt a "defensive programming" mindset: validate all inputs, check all allocations.</li>
          <li>Use static analysis tools (e.g., <code>clang‑static‑analyzer</code>) and sanitizers (AddressSanitizer, UndefinedBehaviorSanitizer).</li>
          <li>Keep memory management contained: allocate and free in the same scope when possible.</li>
          <li>For strings, use <code>snprintf</code> or <code>strlcpy</code> (where available) for safer copying.</li>
          <li>Document pointer ownership: who is responsible for freeing memory.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand the concept of memory safety.</li>
            <li>✅ Can identify unsafe pointer usage in code.</li>
            <li>✅ Knows safe alternatives for common operations.</li>
            <li>✅ Uses tools like Valgrind or AddressSanitizer to detect issues.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What are the consequences of a buffer overflow beyond crashing?</li>
            <li>Observe carefully: In the unsafe example, why does <code>strcpy</code> cause a segfault only sometimes?</li>
            <li>Try running the safe example with different inputs – does it ever overflow?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Enable compiler protections:</strong> Use <code>-D_FORTIFY_SOURCE=2</code> and <code>-fstack-protector-strong</code> to harden code.</li>
          <li><strong>Use <code>reallocarray</code> or <code>calloc</code> for safer allocation (multiplication overflow checks).</strong></li>
          <li><strong>Prefer <code>fgets</code> over <code>gets</code> (never use <code>gets</code>!).</strong></li>
          <li><strong>Adopt a consistent naming convention for pointers that must be freed (e.g., <code>p_</code> prefix).</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "Memory safety is not just about avoiding crashes; it's about writing reliable, secure software. In our Barrackpore CNAT class, we stress that every pointer must be treated as a potential bomb until proven safe. Use tools, check your code, and never trust input. The safe habits you learn now will serve you for your entire career."
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
          opacity: 0;
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

export default Topic19;