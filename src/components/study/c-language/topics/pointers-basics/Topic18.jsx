import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import segfaultExamples from "./topic18_files/segfault_examples.c?raw";
import safePractices from "./topic18_files/safe_practices.c?raw";

const Topic18 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Segmentation Fault Basics
        </h1>
        <p className="text-lg leading-relaxed">
          A <strong>segmentation fault</strong> (segfault) occurs when a program tries to access memory it doesn't have permission to use. It's the operating system's way of saying: "You stepped out of bounds!" Understanding why segfaults happen is the first step to preventing them.
        </p>
      </div>

      {/* Common Causes Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">💥 Dereferencing NULL</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int *p = NULL;
*p = 5;   // Segfault (trying to write to address 0)`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            NULL points to address 0, which is protected by the OS. This is one of the most common segfaults.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📦 Accessing Freed Memory</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int *p = malloc(10);
free(p);
*p = 5;   // Use-after-free → segfault or corruption`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Memory may be returned to the OS or reused, causing invalid access.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📏 Buffer Overflow</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int arr[5];
arr[10] = 42;   // Out-of-bounds → may segfault`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Accessing memory beyond array bounds can corrupt other data or crash.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📝 Writing to Read‑Only Memory</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`char *s = "Hello";
s[0] = 'h';   // String literal in read-only section → segfault`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Modifying string literals or other read‑only data triggers a segfault.
          </p>
        </div>
      </div>

      {/* SVG: Memory Protection */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">What Happens on a Segfault</h3>
        <div className="flex justify-center">
          <svg width="500" height="200" viewBox="0 0 500 200" className="max-w-full h-auto">
            <rect x="30" y="20" width="440" height="140" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="250" y="15" textAnchor="middle" fontSize="12">Process Memory</text>
            <rect x="50" y="40" width="100" height="30" fill="#10B981" fillOpacity="0.3" stroke="#10B981" />
            <text x="100" y="60" textAnchor="middle" fontSize="10">Code (r-x)</text>
            <rect x="50" y="80" width="100" height="30" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" />
            <text x="100" y="100" textAnchor="middle" fontSize="10">Data (rw-)</text>
            <rect x="50" y="120" width="100" height="30" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" />
            <text x="100" y="140" textAnchor="middle" fontSize="10">Heap (rw-)</text>
            <rect x="350" y="40" width="100" height="80" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" />
            <text x="400" y="70" textAnchor="middle" fontSize="10">Stack (rw-)</text>
            <text x="400" y="100" textAnchor="middle" fontSize="8">(grows down)</text>

            {/* Illegal access arrow */}
            <path d="M200 160 L200 110" stroke="#EF4444" strokeWidth="2" strokeDasharray="4" />
            <text x="210" y="135" fill="#EF4444" fontSize="11">Invalid access →</text>
            <rect x="180" y="165" width="120" height="25" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" />
            <text x="240" y="183" textAnchor="middle" fill="#EF4444" fontSize="10">Segmentation Fault (SIGSEGV)</text>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          When a program touches memory it isn't allowed to, the OS kills it with a segfault.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 How the OS Handles Memory Access</h3>
          <p className="leading-relaxed">
            The OS gives each process a virtual address space. Some addresses are unmapped (like 0x0) or have protection bits (read‑only). When the CPU tries to access an invalid address, it raises a page fault, and the OS sends the <code>SIGSEGV</code> signal, which typically terminates the program.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`$ ./myprogram
Segmentation fault (core dumped)`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Core dumps can be used to debug with <code>gdb</code>.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🐞 Debugging Segmentation Faults</h3>
          <p className="leading-relaxed">
            Use a debugger (gdb) or tools like Valgrind to pinpoint the exact line causing the fault.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`gcc -g program.c -o program
gdb ./program
(gdb) run
(gdb) backtrace   # see where it crashed`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Ritaja</strong> used <code>gdb</code> to trace a segfault back to a NULL pointer dereference after a failed <code>malloc</code>.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 See Segfaults (Carefully!)</h3>
        <EditableCCodeBlock
          title="Example 1: Common Segfault Scenarios"
          initialCode={segfaultExamples}
        />
        <EditableCCodeBlock
          title="Example 2: Safe Practices to Avoid Segfaults"
          initialCode={safePractices}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Ignoring NULL checks:</strong> <code>malloc</code> can return NULL; dereferencing it causes segfault.</li>
          <li><strong>Off‑by‑one errors:</strong> Accessing <code>arr[size]</code> instead of <code>arr[size-1]</code>.</li>
          <li><strong>Use‑after‑free:</strong> Continuing to use a pointer after freeing it.</li>
          <li><strong>Stack overflow:</strong> Deep recursion or large local arrays can overflow the stack, leading to segfault.</li>
          <li><strong>Assuming a segfault always gives a core dump:</strong> May need to set limits (<code>ulimit -c unlimited</code>).</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always check pointers before dereferencing: <code>if (ptr != NULL) *ptr = value;</code>.</li>
          <li>After <code>free()</code>, set the pointer to <code>NULL</code>.</li>
          <li>Use bounds checking when accessing arrays (e.g., keep track of size).</li>
          <li>Compile with <code>-Wall -Wextra</code> to catch warnings that may indicate potential segfaults.</li>
          <li>Run programs with <code>valgrind</code> or <code>AddressSanitizer</code> during development.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand what a segmentation fault is.</li>
            <li>✅ Can identify common causes (NULL, out‑of‑bounds, use‑after‑free).</li>
            <li>✅ Knows how to use <code>gdb</code> or <code>valgrind</code> to find the source.</li>
            <li>✅ Can write code that avoids these pitfalls.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>Why does dereferencing a NULL pointer always crash, but a wild pointer might not?</li>
            <li>Observe carefully: In the segfault examples, which lines are commented out? Uncomment them and see what happens.</li>
            <li>Try using <code>gdb</code> to examine the state at the moment of crash.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Enable core dumps:</strong> <code>ulimit -c unlimited</code>, then use <code>gdb program core</code>.</li>
          <li><strong>Use <code>assert</code> to catch invalid states early:</strong> <code>assert(ptr != NULL);</code>.</li>
          <li><strong>Compile with <code>-fsanitize=address</code> to get precise error messages for memory issues.</strong></li>
          <li><strong>Keep your code modular:</strong> Isolate risky pointer operations into well‑tested functions.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "Segmentation faults are your program's way of telling you something went wrong with memory. Don't fear them – they are your debugging friends. In our Barrackpore CNAT class, we always run code with Valgrind and AddressSanitizer to catch these early. Remember: a NULL pointer dereference is a clear bug; a wild pointer dereference is a time bomb. Always initialize and check pointers. And when you get a segfault, don't just re‑run – debug it!"
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

export default Topic18;