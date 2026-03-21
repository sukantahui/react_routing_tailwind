import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import basicArithmetic from "./topic7_files/basic_arithmetic.c?raw";
import arrayTraversal from "./topic7_files/array_traversal.c?raw";

const Topic7 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Pointer Arithmetic: Increment, Decrement, Addition & Subtraction
        </h1>
        <p className="text-lg leading-relaxed">
          You can perform arithmetic operations on pointers, but it works differently than normal arithmetic. Adding an integer to a pointer moves it forward by that many <strong>elements</strong>, not bytes. This is the foundation for traversing arrays and implementing data structures.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">➕ Addition & Subtraction</h2>
          <p className="leading-relaxed">
            Adding an integer <code>n</code> to a pointer advances it by <code>n * sizeof(*ptr)</code> bytes. Subtracting moves backward.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int arr[5] = {10,20,30,40,50};
int *p = arr;       // points to arr[0]
p = p + 2;          // points to arr[2] (30)
p = p - 1;          // points to arr[1] (20)`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Swadeep</strong> uses pointer addition to iterate through an array without using indices.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">⬆️ Increment & Decrement</h2>
          <p className="leading-relaxed">
            <code>p++</code> moves the pointer to the next element; <code>p--</code> moves to the previous. These are shorthand for <code>p = p + 1</code> and <code>p = p - 1</code>.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int *p = arr;   // points to arr[0]
p++;             // now points to arr[1]
p--;             // back to arr[0]`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Increment and decrement are commonly used in loops to traverse arrays or buffers.
          </p>
        </div>
      </div>

      {/* SVG: Visualizing Pointer Arithmetic */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Pointer Arithmetic on an Array</h3>
        <div className="flex justify-center overflow-x-auto">
          <svg width="550" height="200" viewBox="0 0 550 200" className="max-w-full h-auto">
            {/* Array elements */}
            {[0,1,2,3,4].map(i => (
              <g key={i}>
                <rect x={50 + i*80} y="50" width="70" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <text x={85 + i*80} y="75" textAnchor="middle" fontSize="12" fill="currentColor">{`arr[${i}]`}</text>
                <text x={85 + i*80} y="95" textAnchor="middle" fontSize="10" fill="currentColor">{(i+1)*10}</text>
              </g>
            ))}
            {/* Pointer p at arr[0] initially */}
            <rect x="45" y="120" width="80" height="30" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="85" y="140" textAnchor="middle" fontSize="12" fill="#10B981">p (start)</text>
            <path d="M85 120 L85 100" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
            {/* After p++ */}
            <rect x="125" y="160" width="80" height="30" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
            <text x="165" y="180" textAnchor="middle" fontSize="12" fill="#3B82F6">p++</text>
            <path d="M165 160 L165 100" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4" />
            {/* After p+2 */}
            <rect x="285" y="160" width="80" height="30" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
            <text x="325" y="180" textAnchor="middle" fontSize="12" fill="#F59E0B">p+2</text>
            <path d="M325 160 L325 100" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4" />
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Adding <code>1</code> moves the pointer by one <strong>element</strong> (4 bytes for <code>int</code>). Adding <code>2</code> moves by two elements.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📐 The Math Behind Pointer Arithmetic</h3>
          <p className="leading-relaxed">
            When you add an integer <code>n</code> to a pointer <code>p</code>, the compiler computes:
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm my-2">
            {`new_address = (address_in_p) + n * sizeof(*p)`}
          </pre>
          <p>
            Similarly, subtracting <code>n</code> moves backward by <code>n * sizeof(*p)</code> bytes. This ensures that pointer arithmetic is type‑aware and safe for stepping through arrays.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> If <code>p</code> is a <code>double*</code> and <code>sizeof(double) == 8</code>, then <code>p + 3</code> advances the address by 24 bytes.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔁 Using Arithmetic to Traverse Arrays</h3>
          <p className="leading-relaxed">
            A classic use of pointer arithmetic is iterating over an array without using the subscript operator.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int arr[] = {1,2,3,4,5};
int *p;
for(p = arr; p < arr + 5; p++) {
    printf("%d ", *p);
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This pattern is common in systems programming and is often more efficient than using indices.
          </p>
          <p className="mt-1 text-sm">
            <strong>Classroom story:</strong> <strong>Tuhina</strong> used pointer arithmetic to reverse an array in place – she kept two pointers, one at the start and one at the end, and swapped values while moving them inward.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Try It Yourself</h3>
        <EditableCCodeBlock
          title="Example 1: Basic Pointer Arithmetic"
          initialCode={basicArithmetic}
        />
        <EditableCCodeBlock
          title="Example 2: Traversing Arrays with Pointers"
          initialCode={arrayTraversal}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Assuming +1 moves by one byte:</strong> Pointer arithmetic moves by element size, not byte.</li>
          <li><strong>Going out of bounds:</strong> Incrementing a pointer beyond the array and dereferencing leads to undefined behavior.</li>
          <li><strong>Subtracting pointers of different types:</strong> Pointer subtraction yields the number of elements, but only if both point to the same array.</li>
          <li><strong>Using pointer arithmetic on <code>void*</code>:</strong> Not allowed because the size is unknown. Must cast to a concrete type.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always keep track of the bounds – use a pointer to the end of the array as a sentinel.</li>
          <li>Prefer pointer arithmetic over indexing for performance‑critical loops.</li>
          <li>When using <code>p++</code> inside a loop, be careful about modifying the original pointer if you need it later.</li>
          <li>Use <code>sizeof(*ptr)</code> when allocating memory to stay consistent with pointer arithmetic.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that <code>p + n</code> advances by <code>n * sizeof(*p)</code> bytes.</li>
            <li>✅ Can use <code>++</code> and <code>--</code> to walk through arrays.</li>
            <li>✅ Knows that subtracting two pointers yields the number of elements between them.</li>
            <li>✅ Can write a loop that traverses an array using pointer arithmetic.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What is the difference between <code>p++</code> and <code>++p</code>? Try them in a loop.</li>
            <li>Observe carefully: If <code>p</code> points to the first element, what does <code>p + 5</code> point to? Is it safe to dereference?</li>
            <li>Try using pointer arithmetic to copy an array from one location to another.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>ptrdiff_t</code></strong> for the result of pointer subtraction; it's a signed type defined in <code>&lt;stddef.h&gt;</code>.</li>
          <li><strong>Pointer arithmetic with <code>char*</code></strong> allows byte‑level manipulation because <code>sizeof(char) == 1</code>.</li>
          <li><strong>Watch out for overflow:</strong> On 64‑bit systems, pointer arithmetic wraps around, but it's usually safe within array bounds.</li>
          <li><strong>Combine with <code>const</code>:</strong> Use <code>const int *p</code> to prevent modifying the data while traversing.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "Pointer arithmetic is where pointers truly shine. I tell my Barrackpore CNAT students: 'Think of pointers as cursors – adding 1 moves to the next item, not the next byte.' This mental model helps avoid off‑by‑one errors. Always remember that pointer arithmetic is tied to the type; a char* moves by one byte, an int* by four. Practice with small arrays and print addresses to see the magic!"
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

export default Topic7;