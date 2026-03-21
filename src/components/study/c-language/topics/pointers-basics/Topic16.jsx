import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import voidPointerExample from "./topic16_files/void_pointer_example.c?raw";
import typeCasting from "./topic16_files/type_casting.c?raw";

const Topic16 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Void Pointers (Generic Pointers) & Type Casting
        </h1>
        <p className="text-lg leading-relaxed">
          A <code>void*</code> pointer is a generic pointer that can hold the address of any data type. It cannot be dereferenced directly; you must first cast it to a concrete type. This flexibility makes it essential for writing generic functions like <code>qsort</code> and <code>memcpy</code>.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔘 What is a Void Pointer?</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`void *ptr;   // can point to any type

int x = 10;
ptr = &x;    // OK

char c = 'A';
ptr = &c;    // also OK`}
          </pre>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>No associated data type – just an address.</li>
            <li>Cannot be dereferenced without casting.</li>
            <li>Used for generic functions and memory operations.</li>
          </ul>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔄 Type Casting</h2>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`void *vptr = &x;
int *iptr = (int*)vptr;   // cast to int*
printf("%d", *iptr);`}
          </pre>
          <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
            <li>Casting tells the compiler how to interpret the memory.</li>
            <li>Explicit casts are required for void pointers.</li>
            <li>Used to regain type information.</li>
          </ul>
        </div>
      </div>

      {/* SVG: Void Pointer Casting */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Void Pointer: Generic Container</h3>
        <div className="flex justify-center">
          <svg width="450" height="180" viewBox="0 0 450 180" className="max-w-full h-auto">
            {/* Data boxes */}
            <rect x="30" y="30" width="80" height="50" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" />
            <text x="70" y="55" textAnchor="middle" fontSize="10">int x</text>
            <rect x="30" y="100" width="80" height="50" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
            <text x="70" y="125" textAnchor="middle" fontSize="10">char c</text>

            {/* Void pointer */}
            <rect x="180" y="65" width="100" height="40" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" />
            <text x="230" y="90" textAnchor="middle" fill="#F59E0B" fontSize="12">void *vptr</text>

            {/* Arrows */}
            <path d="M180 85 L110 55" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4" />
            <path d="M180 85 L110 125" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4" />

            {/* Casting labels */}
            <text x="280" y="130" fontSize="10">(int*)vptr → int*</text>
            <text x="280" y="150" fontSize="10">(char*)vptr → char*</text>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          A <code>void*</code> can point to any type, but you must cast it before dereferencing.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Why Can't You Dereference a void*?</h3>
          <p className="leading-relaxed">
            The compiler doesn't know how many bytes to read or what operation to perform. Dereferencing requires type information. Casting provides that information.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void *vp = &x;
// *vp = 10;   // ERROR: incomplete type
*(int*)vp = 10;   // OK: cast before dereference`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This is why <code>malloc</code> returns <code>void*</code> – it's generic, and you cast it to your needed type.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔁 Generic Functions with void*</h3>
          <p className="leading-relaxed">
            The standard library uses <code>void*</code> to create generic functions. For example, <code>qsort</code> works on any array type because it receives a <code>void*</code> to the array and a comparison function that casts back.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void qsort(void *base, size_t nmemb, size_t size,
           int (*compar)(const void *, const void *));`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Sreeparna</strong> wrote a generic swap function that works with any data type using <code>void*</code> and <code>memcpy</code>.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Void Pointers & Casting</h3>
        <EditableCCodeBlock
          title="Example 1: Void Pointer to Different Types"
          initialCode={voidPointerExample}
        />
        <EditableCCodeBlock
          title="Example 2: Type Casting in Action"
          initialCode={typeCasting}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Dereferencing a void* without casting:</strong> Compiler error.</li>
          <li><strong>Pointer arithmetic on void*:</strong> Not allowed (size unknown). Cast to <code>char*</code> for byte arithmetic.</li>
          <li><strong>Forgetting to cast the return of malloc:</strong> In C, it's optional, but in C++ it's required. Casting can hide missing <code>#include &lt;stdlib.h&gt;</code>.</li>
          <li><strong>Incorrect casting leading to misaligned access:</strong> Casting to a larger type may cause alignment issues.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always cast a <code>void*</code> to the correct type before dereferencing or performing arithmetic.</li>
          <li>Use <code>void*</code> to write generic functions, but ensure the caller provides enough information (e.g., size).</li>
          <li>When casting, prefer C‑style casts <code>(type*)ptr</code> for clarity in C.</li>
          <li>If you need byte‑level manipulation, cast to <code>unsigned char*</code> to avoid sign extension issues.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that <code>void*</code> is a generic pointer.</li>
            <li>✅ Know that you must cast before dereferencing or pointer arithmetic.</li>
            <li>✅ Can write a simple generic function using <code>void*</code>.</li>
            <li>✅ Recognize common library functions that use <code>void*</code> (malloc, qsort, memcpy).</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you try to add 1 to a <code>void*</code>? Why is it disallowed?</li>
            <li>Observe carefully: In the generic swap example, why do we need to pass the size?</li>
            <li>Try writing a generic function that prints any type, using a format string and casting.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>void*</code> with <code>memcpy</code> to implement type‑agnostic copying.</strong></li>
          <li><strong>For alignment‑sensitive casts, consider <code>_Alignas</code> or use standard alignment macros.</strong></li>
          <li><strong>When writing generic functions, accept <code>void*</code> and a function pointer for operations (like <code>qsort</code>).</strong></li>
          <li><strong>Remember that <code>char*</code> is the only pointer type that can alias any other type – useful for byte operations.</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In our Barrackpore CNAT class, we often use the analogy: 'void* is like an empty box that can hold anything, but you need to label it before opening it.' Casting is that label. Void pointers are the foundation of generic programming in C. Practice by implementing a generic swap function – it's a small but powerful exercise that solidifies the concept."
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

export default Topic16;