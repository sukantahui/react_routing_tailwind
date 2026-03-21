import React from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import EditableCCodeBlock from '../../../../../common/EditableCCodeBlock';

// Import C code examples as raw strings
import singleObject from './topic12_files/single_object.c?raw';
import arrayAlloc from './topic12_files/array_allocation.c?raw';
import structureWithPointer from './topic12_files/structure_with_pointer.c?raw';

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

const Topic12 = () => {
  const sectionDelays = [
    '0ms',    // header
    '100ms',  // intro
    '200ms',  // single object
    '300ms',  // arrays
    '400ms',  // structures
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
            Common Allocation Patterns
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
            Single objects, arrays, and structures — the building blocks of dynamic memory.
          </p>
        </div>

        {/* Introduction */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[1] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            Recurring Patterns in Heap Management
          </h2>
          <p className="leading-relaxed mb-3">
            Most dynamic memory usage falls into a few common patterns. Recognizing these patterns helps you
            write cleaner, more maintainable code. This topic covers the three most frequent allocation scenarios:
            allocating a single object, allocating an array of objects, and allocating structures that contain
            pointers to other heap‑allocated data.
          </p>
          <p className="leading-relaxed">
            Mastering these patterns gives you a solid foundation for building dynamic data structures like
            linked lists, trees, and dynamic strings.
          </p>
        </section>

        {/* Single Object */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[2] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            📦 Pattern 1: Single Object Allocation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              Allocating a single object (like a struct or a scalar) is straightforward:
            </p>
            <div className="font-mono text-sm p-3 bg-gray-100 dark:bg-gray-700 rounded mb-3">
              MyStruct *ptr = (MyStruct*)malloc(sizeof(MyStruct));
            </div>
            <p className="leading-relaxed">
              After allocation, you can access members using <code>ptr-&gt member</code>. Don't forget to free it later.
            </p>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm"><strong>💡 Tip:</strong> Use <code>sizeof(*ptr)</code> to avoid type mismatches: <code>malloc(sizeof(*ptr))</code>.</p>
            </div>
          </div>
        </section>

        {/* Arrays */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[3] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            📚 Pattern 2: Array Allocation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              For arrays of objects, you allocate <code>count * sizeof(element)</code> bytes. You can use <code>malloc</code>
              (uninitialized) or <code>calloc</code> (zero‑initialized).
            </p>
            <div className="font-mono text-sm p-3 bg-gray-100 dark:bg-gray-700 rounded mb-3">
              int *arr = (int*)malloc(10 * sizeof(int));<br/>
              MyStruct *arr2 = (MyStruct*)calloc(5, sizeof(MyStruct));
            </div>
            <p className="leading-relaxed">
              Access elements like a normal array: <code>arr[i]</code>. Remember to free the entire block with one <code>free</code> call.
            </p>
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="text-sm"><strong>⚠️ Warning:</strong> Never mix <code>malloc</code> and <code>free</code> per element; free the whole block once.</p>
            </div>
          </div>
        </section>

        {/* Structures with Pointers */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[4] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-4 mb-4">
            🔗 Pattern 3: Structures Containing Pointers
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
            <p className="leading-relaxed mb-3">
              Often a structure holds pointers to other heap data. For example, a linked list node:
            </p>
            <div className="font-mono text-sm p-3 bg-gray-100 dark:bg-gray-700 rounded mb-3">
              struct Node {`{ int value; struct Node *next; }`};
            </div>
            <p className="leading-relaxed mb-3">
              You must allocate the node itself, and then separately allocate any data it points to (unless the pointer is to shared/static data). Freeing must happen in reverse order: free the inner pointers first, then the outer structure.
            </p>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-sm"><strong>✅ Good practice:</strong> Write a dedicated cleanup function that traverses and frees the entire structure.</p>
            </div>
          </div>
        </section>

        {/* SVG Illustration */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[5] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-4 mb-4">
            🖼️ Visualizing Allocation Patterns
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl">
            <svg viewBox="0 0 800 300" className="w-full h-auto" aria-label="Allocation patterns">
              <rect width="800" height="300" fill="transparent" />

              {/* Single object */}
              <rect x="50" y="30" width="180" height="60" fill="rgba(34,197,94,0.1)" stroke="#22c55e" strokeWidth="2" rx="4" />
              <text x="60" y="55" fill="currentColor" className="text-xs">Single object</text>
              <text x="60" y="75" fill="currentColor" className="text-xs">ptr → [MyStruct]</text>

              {/* Array */}
              <rect x="300" y="30" width="280" height="60" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" rx="4" />
              <text x="310" y="55" fill="currentColor" className="text-xs">Array of 5 elements</text>
              {[320, 360, 400, 440, 480].map((x, i) => (
                <rect key={i} x={x} y="65" width="30" height="20" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1" />
              ))}
              <text x="325" y="80" fill="currentColor">0</text>
              <text x="365" y="80" fill="currentColor">1</text>
              <text x="405" y="80" fill="currentColor">2</text>
              <text x="445" y="80" fill="currentColor">3</text>
              <text x="485" y="80" fill="currentColor">4</text>

              {/* Structure with pointers */}
              <rect x="50" y="140" width="200" height="80" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="60" y="165" fill="currentColor" className="text-xs">Node {`{ value, next }`}</text>
              <line x1="160" y1="185" x2="250" y2="185" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow12)" />
              <rect x="260" y="155" width="150" height="50" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" rx="4" />
              <text x="270" y="180" fill="currentColor" className="text-xs">Next node</text>
              <text x="270" y="195" fill="currentColor" className="text-xs">(heap allocated)</text>

              <defs>
                <marker id="arrow12" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10" fill="#ef4444" />
                </marker>
              </defs>
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
              title="Example 1: Single object allocation"
              initialCode={singleObject}
            />
            <EditableCCodeBlock
              title="Example 2: Array allocation (malloc vs calloc)"
              initialCode={arrayAlloc}
            />
            <EditableCCodeBlock
              title="Example 3: Structure with nested pointers (linked list)"
              initialCode={structureWithPointer}
            />
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[7] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-orange-500 pl-4 mb-4">
            ⚠️ Common Pitfalls
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <li><strong>Forgetting to allocate for nested pointers:</strong> Structure allocated, but pointer members still point to garbage.</li>
            <li><strong>Freeing in wrong order:</strong> Freeing the outer structure before inner pointers → memory leak.</li>
            <li><strong>Using <code>sizeof(ptr)</code> instead of <code>sizeof(*ptr)</code>:</strong> Allocates space for a pointer, not the object.</li>
            <li><strong>Mixing array and scalar free:</strong> Trying to free each element of a dynamically allocated array individually.</li>
            <li><strong>Not handling allocation failures:</strong> After a failure, partial cleanup can leak.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[8] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
            ✅ Best Practices
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-2">
              <li>✔️ Use <code>sizeof(*ptr)</code> to allocate: <code>malloc(sizeof(*ptr))</code> avoids type repetition.</li>
              <li>✔️ For arrays, prefer <code>calloc</code> if you need zero‑initialization.</li>
              <li>✔️ For structures with nested pointers, write a dedicated <code>free_XXX</code> function that recursively frees.</li>
              <li>✔️ Always check allocation success and handle failure.</li>
              <li>✔️ Use consistent naming: <code>create_XXX</code> for allocation + initialization, <code>destroy_XXX</code> for deallocation.</li>
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
              <li>☐ I know how to allocate a single object on the heap.</li>
              <li>☐ I can allocate and access a dynamic array.</li>
              <li>☐ I understand how to allocate structures that contain pointers to other heap data.</li>
              <li>☐ I know the correct order for freeing nested structures.</li>
              <li>☐ I always check allocation return values.</li>
            </ul>
          </div>
        </section>

        {/* Hint Section */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[10] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-4">
            💡 Hint Section
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
            <p className="italic">Think about...</p>
            <ul className="list-disc list-inside mt-2">
              <li>In the linked list example, what would happen if you free the node before its next pointer?</li>
              <li>How would you allocate a 2D array using a single <code>malloc</code> call?</li>
              <li>Why is it better to use <code>sizeof(*ptr)</code> instead of <code>sizeof(MyStruct)</code>?</li>
            </ul>
          </div>
        </section>

        {/* Tips & Tricks */}
        <section className={getSectionClass()} style={{ animationDelay: sectionDelays[11] }}>
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-4 mb-4">
            🔧 Professional Tips & Tricks
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
            <p><strong>🎯 Debugging mindset:</strong> Use <code>valgrind</code> to verify that you free all allocated memory, especially in complex structures.</p>
            <p><strong>📦 Memory efficiency:</strong> For structures with pointers, consider allocating the structure and its data in one block to reduce fragmentation and improve locality.</p>
            <p><strong>🧹 Cleanup patterns:</strong> Always pair creation and destruction functions; document ownership.</p>
            <p><strong>📏 Code readability:</strong> Use typedefs to simplify complex types and reduce typing errors.</p>
          </div>
        </section>

        {/* Teacher's Note */}
        <Teacher
          note="Patterns are the grammar of programming. Mastering these three allocation patterns will let you build almost any dynamic data structure. Remember: allocate from the outside in, free from the inside out. When in doubt, draw the memory layout on paper — it will guide your allocation and deallocation order."
        />
      </div>
    </>
  );
};

export default Topic12;