import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import literalVsArray from "./topic12_files/literal_vs_array.c?raw";
import correctUsage from "./topic12_files/correct_usage.c?raw";

const Topic12 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Immutable String Literals vs Modifiable Arrays
        </h1>
        <p className="text-lg leading-relaxed">
          C distinguishes between <strong>string literals</strong> (read‑only) and <strong>modifiable character arrays</strong>. Attempting to modify a string literal leads to undefined behavior, while arrays can be safely changed. Understanding this difference is crucial for writing robust string code.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔒 Immutable String Literals</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`char *str = "Hello";
// str[0] = 'h'; // ❌ undefined behavior`}
          </pre>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>Stored in read‑only memory (often .rodata section).</li>
            <li>Same literal may be shared to save memory.</li>
            <li>Any attempt to modify results in crash or silent corruption.</li>
            <li>Use <code>const char *</code> to enforce read‑only intent.</li>
          </ul>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">✏️ Modifiable Character Arrays</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`char arr[] = "Hello";
arr[0] = 'h'; // ✅ safe`}
          </pre>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>Memory allocated on stack (or static storage).</li>
            <li>Contents are writable; you can change any character.</li>
            <li>Array size is determined by the string length plus null.</li>
            <li>Often used when you need to build or modify strings.</li>
          </ul>
        </div>
      </div>

      {/* SVG: Memory Layout */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Memory Regions: Read‑Only vs Read‑Write</h3>
        <div className="flex justify-center">
          <svg width="500" height="200" viewBox="0 0 500 200" className="max-w-full h-auto">
            {/* Read-only region */}
            <rect x="30" y="20" width="200" height="70" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4" />
            <text x="130" y="45" textAnchor="middle" fill="#F59E0B" fontSize="12">Read‑Only Section (.rodata)</text>
            <text x="130" y="70" textAnchor="middle" fontSize="10">"Hello" (string literal)</text>

            {/* Writeable region */}
            <rect x="270" y="20" width="200" height="70" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
            <text x="370" y="45" textAnchor="middle" fill="#10B981" fontSize="12">Stack / Data Section</text>
            <text x="370" y="70" textAnchor="middle" fontSize="10">char arr[] = "Hello"</text>

            {/* Arrow from pointer to literal */}
            <path d="M400 110 L180 90" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4" />
            <text x="290" y="105" textAnchor="middle" fontSize="9" fill="#F59E0B">char *p = "Hello"</text>

            <rect x="380" y="120" width="100" height="25" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1" />
            <text x="430" y="138" textAnchor="middle" fontSize="10">arr[] → writable</text>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          String literals reside in read‑only memory; character arrays are stored in writable memory.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Why Are String Literals Immutable?</h3>
          <p className="leading-relaxed">
            String literals are stored in a read‑only section of memory for efficiency and safety. The C standard says modifying them is <strong>undefined behavior</strong>, allowing compilers to optimize (e.g., share identical literals). On many systems, writing to a literal causes a segmentation fault.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`char *p = "immutable";
p[0] = 'I';   // May crash or silently corrupt`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Debangshu</strong> learned this the hard way when his program crashed while trying to uppercase a string literal.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔧 How to Get a Modifiable Copy</h3>
          <p className="leading-relaxed">
            If you need a mutable string, you have three main options:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><strong>Character array initialization:</strong> <code>char s[] = "Hello";</code> – copies the literal into writable memory.</li>
            <li><strong>Dynamic allocation:</strong> <code>char *s = malloc(6); strcpy(s, "Hello");</code> – heap memory you can modify.</li>
            <li><strong>Static array:</strong> <code>static char s[6]; strcpy(s, "Hello");</code> – global/static writable storage.</li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`// Safe copy
char buffer[20];
strcpy(buffer, "Hello");
buffer[0] = 'h';   // OK`}
          </pre>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 See the Difference</h3>
        <EditableCCodeBlock
          title="Example 1: Immutable Literal vs Modifiable Array"
          initialCode={literalVsArray}
        />
        <EditableCCodeBlock
          title="Example 2: Correct Ways to Create Mutable Strings"
          initialCode={correctUsage}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Modifying string literals directly:</strong> <code>char *p = "text"; p[0] = 'T';</code> – undefined behavior.</li>
          <li><strong>Returning a pointer to a local array:</strong> <code>char *func(){` { char s[] = "local"; return s; }`}</code> – dangling pointer.</li>
          <li><strong>Confusing <code>char *str = "..."</code> with modifiability:</strong> It's a pointer to read‑only memory.</li>
          <li><strong>Assuming all string literals are stored in the same way:</strong> Compilers may place them in different sections, but they are always read‑only.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use <code>const char *</code> for pointers that should point to read‑only strings: <code>const char *msg = "Hello";</code></li>
          <li>When you need to modify a string, declare it as a character array: <code>char s[] = "initial";</code></li>
          <li>If you must work with a literal and need to change it, copy it into an array first.</li>
          <li>Avoid returning pointers to local arrays; instead, use dynamic allocation or pass a buffer from the caller.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Know that string literals are read‑only; modifying them is UB.</li>
            <li>✅ Can create modifiable strings using arrays or dynamic allocation.</li>
            <li>✅ Understand the difference between <code>char *p = "text";</code> and <code>char a[] = "text";</code>.</li>
            <li>✅ Use <code>const</code> to prevent accidental modification of read‑only data.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What does the compiler do if you try to modify a literal? Try it with and without optimization.</li>
            <li>Observe carefully: What is the difference in memory layout between <code>char s[] = "Hi";</code> and <code>char *s = "Hi";</code>?</li>
            <li>Try writing a function that takes a <code>char*</code> and modifies it. Pass both an array and a literal – what happens?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>const</code> religiously:</strong> It helps the compiler catch accidental modifications and documents intent.</li>
          <li><strong>String pooling:</strong> Many compilers store identical literals only once. This can save memory but also makes modification dangerous.</li>
          <li><strong>When you need a modifiable string from a literal, use:</strong> <code>char buf[] = "literal";</code> – it's efficient and safe.</li>
          <li><strong>For large strings, consider dynamic allocation to avoid stack overflow.</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In our Barrackpore CNAT class, I stress: 'String literals are constants, period.' If you want to change a string, you must have your own storage. The array form <code>char s[] = \"...\"</code> gives you that storage. Using <code>const char *</code> for pointers to literals is a good habit that will save you from debugging crashes. Always remember: the difference between a pointer to a literal and an array is not just syntax – it's a fundamental memory safety issue."
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

export default Topic12;