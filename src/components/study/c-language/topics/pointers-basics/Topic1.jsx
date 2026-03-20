import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import pointerBasics from "./topic1_files/pointer_basics.c?raw";
import pointerSwap from "./topic1_files/pointer_swap.c?raw";

const Topic1 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Pointers: The Heart of C
        </h1>
        <p className="text-lg leading-relaxed">
          A pointer is a variable that stores the <strong>memory address</strong> of another variable. Pointers are what give C its power — enabling dynamic memory, efficient arrays, and direct hardware access. Mastering pointers is essential for systems programming.
        </p>
      </div>

      {/* Why Pointers Matter */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔑 Why Pointers?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Pass large structures efficiently (by reference)</li>
            <li>Dynamic memory allocation (heap)</li>
            <li>Implement data structures (linked lists, trees)</li>
            <li>Interact with hardware / memory-mapped I/O</li>
            <li>Optimize performance (avoid copying)</li>
          </ul>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📌 Pointers in Real Life</h2>
          <p className="leading-relaxed">
            Imagine a library: instead of carrying a heavy book everywhere, you keep a <strong>call number</strong> (pointer) that tells you exactly where the book is. Similarly, a pointer holds the location of data, not the data itself.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> At Barrackpore CNAT, <strong>Swadeep</strong> tells <strong>Tuhina</strong> the room number (pointer) where the assignment is kept, rather than carrying the assignment himself.
          </p>
        </div>
      </div>

      {/* Conceptual SVG */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Pointer Concept</h3>
        <div className="flex justify-center">
          <svg width="400" height="180" viewBox="0 0 400 180" className="max-w-full h-auto">
            <rect x="50" y="40" width="100" height="60" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" rx="4" />
            <text x="100" y="75" textAnchor="middle" fill="#3B82F6" fontSize="12">Variable x</text>
            <text x="100" y="95" textAnchor="middle" fill="currentColor" fontSize="10">value: 42</text>
            <text x="100" y="115" textAnchor="middle" fill="currentColor" fontSize="9" className="text-gray-500">address: 0x7ffc</text>

            <rect x="250" y="40" width="100" height="60" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" rx="4" />
            <text x="300" y="75" textAnchor="middle" fill="#10B981" fontSize="12">Pointer p</text>
            <text x="300" y="95" textAnchor="middle" fill="currentColor" fontSize="10">value: 0x7ffc</text>
            <text x="300" y="115" textAnchor="middle" fill="currentColor" fontSize="9" className="text-gray-500">address: 0x7fe0</text>

            <path d="M200 70 L240 70" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
            <text x="220" y="60" textAnchor="middle" fill="#10B981" fontSize="10">points to</text>

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                <polygon points="0 0, 10 5, 0 10" fill="#10B981" />
              </marker>
            </defs>
            <path d="M200 70 L230 70" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          A pointer stores the address of another variable. Here, <code>p</code> holds the address of <code>x</code>.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Pointer Fundamentals</h3>
          <p className="leading-relaxed mb-3">
            A pointer is declared with a base type followed by an asterisk (<code>*</code>). The type indicates what kind of data the pointer points to — this is important for pointer arithmetic and dereferencing.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int *ptr;      // pointer to an integer
char *cptr;    // pointer to a character
double *dptr;  // pointer to a double`}
          </pre>
          <p className="mt-3">
            The size of a pointer itself (the variable that holds the address) is usually 8 bytes on 64-bit systems, regardless of what it points to.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔧 Operations on Pointers</h3>
          <ul className="space-y-2">
            <li><strong>&amp; (address-of):</strong> Gets the memory address of a variable.</li>
            <li><strong>* (dereference):</strong> Accesses the value stored at the address held by the pointer.</li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int a = 10;
int *p = &a;   // p holds address of a
printf("%d", *p); // prints 10 (dereferencing)
*p = 20;       // changes a to 20`}
          </pre>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Live Code Examples</h3>
        <EditableCCodeBlock
          title="Example 1: Basic Pointer Usage"
          initialCode={pointerBasics}
        />
        <EditableCCodeBlock
          title="Example 2: Swapping Values (Call by Reference)"
          initialCode={pointerSwap}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Uninitialized pointers:</strong> Using a pointer before giving it a valid address leads to undefined behavior (segmentation fault).</li>
          <li><strong>Dereferencing NULL:</strong> Always check for NULL before dereferencing.</li>
          <li><strong>Type mismatch:</strong> Assigning address of one type to a pointer of another type without casting can cause issues.</li>
          <li><strong>Forgetting the * in declarations:</strong> <code>int* p, q;</code> declares p as pointer, q as int, not both pointers.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always initialize pointers to NULL or a valid address.</li>
          <li>Use descriptive names: <code>pStudent</code>, <code>ptrAge</code> to indicate pointer intent.</li>
          <li>When declaring multiple pointers, place * next to the variable name: <code>int *a, *b;</code>.</li>
          <li>Check for NULL after dynamic allocation.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that a pointer stores an address.</li>
            <li>✅ Know the address-of (&amp;) and dereference (*) operators.</li>
            <li>✅ Can declare pointers of different types.</li>
            <li>✅ Recognize that pointer size is independent of pointed type.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you print a pointer with <code>%p</code> vs <code>%d</code>?</li>
            <li>Observe carefully: <code>int *p, q;</code> — what type is q?</li>
            <li>Try changing the swap function to pass values instead of pointers — does it work?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Read pointer declarations right-to-left:</strong> <code>int * const p;</code> → p is constant pointer to int.</li>
          <li><strong>Use <code>size_t</code> for pointer arithmetic and sizes.</strong></li>
          <li><strong>Debug with <code>printf("%p", ptr);</code></strong> to see addresses.</li>
          <li><strong>Initialize pointers immediately</strong> to avoid wild pointers.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In our Barrackpore CNAT class, I often tell students: 'A pointer is just a number that represents a memory location.' Once you internalize that, many pointer concepts become clearer. The asterisk * has three meanings: multiplication, pointer declaration, and dereference — context is key. Start with simple examples and always trace the addresses."
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

export default Topic1;