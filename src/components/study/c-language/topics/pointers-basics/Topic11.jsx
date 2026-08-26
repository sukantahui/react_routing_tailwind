import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import charArrayVsPointer from "./topic11_files/char_array_vs_pointer.c?raw";
import stringModification from "./topic11_files/string_modification.c?raw";

const Topic11 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Pointers and Strings: Character Pointers vs Character Arrays
        </h1>
        <p className="text-lg leading-relaxed">
          In C, strings are represented as null‑terminated character arrays. You can work with them using either <strong>character arrays</strong> (<code>char str[]</code>) or <strong>character pointers</strong> (<code>char *str</code>). Understanding the differences is essential for safe and efficient string handling.
        </p>
      </div>

      {/* Two Representations */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📦 Character Array</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`char str1[] = "Hello";
char str2[10] = "World";`}
          </pre>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>Memory allocated on stack (or static storage if global).</li>
            <li>Contents can be modified (mutable).</li>
            <li>Size is fixed at compile time.</li>
            <li>Array name is a constant address (cannot be reassigned).</li>
          </ul>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔗 Character Pointer</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`char *str1 = "Hello";
char *str2 = malloc(10);
strcpy(str2, "World");`}
          </pre>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>Pointer points to a string literal (often read‑only) or allocated memory.</li>
            <li>Pointer itself can be reassigned to point elsewhere.</li>
            <li>If pointing to a string literal, modifying it is undefined behavior.</li>
            <li>Often used for dynamic strings.</li>
          </ul>
        </div>
      </div>

      {/* SVG: String Memory Layout */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Memory Layout: Array vs Pointer</h3>
        <div className="flex justify-center">
          <svg width="450" height="220" viewBox="0 0 450 220" className="max-w-full h-auto">
            {/* Char array */}
            <rect x="30" y="30" width="200" height="50" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
            <text x="130" y="55" textAnchor="middle" fill="#3B82F6" fontSize="12">char str[] = "Hello"</text>
            <rect x="40" y="85" width="50" height="25" fill="none" stroke="gray" />
            <text x="65" y="102" textAnchor="middle" fontSize="10">H</text>
            <rect x="90" y="85" width="50" height="25" fill="none" stroke="gray" />
            <text x="115" y="102" textAnchor="middle" fontSize="10">e</text>
            <rect x="140" y="85" width="50" height="25" fill="none" stroke="gray" />
            <text x="165" y="102" textAnchor="middle" fontSize="10">l</text>
            <rect x="190" y="85" width="50" height="25" fill="none" stroke="gray" />
            <text x="215" y="102" textAnchor="middle" fontSize="10">l</text>
            <rect x="240" y="85" width="50" height="25" fill="none" stroke="gray" />
            <text x="265" y="102" textAnchor="middle" fontSize="10">o</text>
            <rect x="290" y="85" width="50" height="25" fill="none" stroke="gray" />
            <text x="315" y="102" textAnchor="middle" fontSize="10">\\0</text>

            {/* Char pointer */}
            <rect x="30" y="140" width="120" height="40" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="90" y="165" textAnchor="middle" fill="#10B981" fontSize="12">char *p</text>
            <path d="M150 160 L190 160" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
            <rect x="190" y="130" width="200" height="50" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
            <text x="290" y="155" textAnchor="middle" fill="#F59E0B" fontSize="12">string literal "Hello" (read‑only)</text>
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#10B981" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Character arrays store the string in their own memory (mutable). Character pointers point to string literals (often read‑only) or heap memory.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Mutability and Storage</h3>
          <p className="leading-relaxed">
            A character array allocates storage for the string. The memory is owned by the array and can be freely modified:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`char s[] = "Hello";
s[0] = 'h';  // OK: s is mutable`}
          </pre>
          <p className="leading-relaxed mt-2">
            A character pointer initialized with a string literal points to read‑only memory. Modifying it leads to undefined behavior (often a crash):
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`char *p = "Hello";
p[0] = 'h';  // DANGEROUS: undefined behavior`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Classroom story:</strong> At Barrackpore CNAT, <strong>Ritaja</strong> tried to modify a string literal and got a segmentation fault – a perfect illustration of the difference.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔁 Reassignment and Decay</h3>
          <p className="leading-relaxed">
            A character array name is a constant address; you cannot reassign it to point elsewhere:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`char a[] = "Hello";
a = "World";   // ERROR: array name is not an lvalue`}
          </pre>
          <p className="leading-relaxed mt-2">
            A character pointer can be reassigned to point to different strings:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`char *p = "Hello";
p = "World";   // OK: p now points to another string literal`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            When passing a character array to a function, it decays to a pointer (like any array), so the function sees a <code>char*</code>.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Live Examples</h3>
        <EditableCCodeBlock
          title="Example 1: Character Array vs Character Pointer"
          initialCode={charArrayVsPointer}
        />
        <EditableCCodeBlock
          title="Example 2: Modifying Strings (Safe vs Unsafe)"
          initialCode={stringModification}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Modifying string literals:</strong> <code>char *p = "text"; p[0] = 'T';</code> – causes undefined behavior.</li>
          <li><strong>Using <code>sizeof</code> on a pointer vs array:</strong> <code>sizeof(arr)</code> gives array size, <code>sizeof(ptr)</code> gives pointer size.</li>
          <li><strong>Returning local array from function:</strong> <code>char *func(){` { char s[] = "hello"; return s; }`}</code> – returns a dangling pointer.</li>
          <li><strong>Confusing <code>strlen</code> with <code>sizeof</code>:</strong> <code>strlen</code> counts characters (excluding null), <code>sizeof</code> includes the null and total bytes.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use character arrays (<code>char str[] = "..."</code>) when you need a mutable string with fixed size.</li>
          <li>Use character pointers (<code>char *str = "..."</code>) for read‑only strings or when you need to reassign the pointer.</li>
          <li>Always ensure there's enough space when copying into character arrays (<code>strcpy</code>, <code>strncpy</code>).</li>
          <li>When returning a string from a function, return a pointer to a static array, a heap‑allocated string, or a string literal – never a local array.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that strings are null‑terminated character arrays.</li>
            <li>✅ Can differentiate between <code>char arr[]</code> and <code>char *ptr</code> for strings.</li>
            <li>✅ Know that string literals are read‑only and should not be modified.</li>
            <li>✅ Can correctly use <code>sizeof</code> and <code>strlen</code> on strings.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What does <code>sizeof("Hello")</code> return? Why is it 6, not 5?</li>
            <li>Observe carefully: What happens when you try to modify a string literal on your system? Does it crash or silently work?</li>
            <li>Try declaring <code>char *p = "Hello";</code> and then <code>p = "World";</code> – what changes?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>const</code></strong> to prevent accidental modification: <code>const char *p = "Hello";</code> – now the compiler will catch attempts to write.</li>
          <li><strong>Prefer <code>strlcpy</code> or <code>strncpy</code></strong> over <code>strcpy</code> to avoid buffer overflows (though not standard everywhere).</li>
          <li><strong>For dynamic strings, allocate with <code>malloc</code> and remember to <code>free</code>.</strong></li>
          <li><strong>Use <code>sizeof</code> on array variables</strong> to get the total buffer size, which is useful for bounds checking.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In Barrackpore CNAT, I emphasize that string literals are like constants – they live in a read‑only part of memory. When you write <code>char *p = \"Hello\";</code>, you're not copying the string, just pointing to it. To get a modifiable copy, use an array: <code>char s[] = \"Hello\";</code>. This distinction often shows up in interviews and is the source of many beginner crashes. Always use <code>const</code> when you intend a pointer to read‑only data."
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

export default Topic11;