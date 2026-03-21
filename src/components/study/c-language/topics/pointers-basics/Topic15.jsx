import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import doublePointerSwap from "./topic15_files/double_pointer_swap.c?raw";
import doublePointer2D from "./topic15_files/double_pointer_2d.c?raw";

const Topic15 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Pointer to Pointer (Double Pointer)
        </h1>
        <p className="text-lg leading-relaxed">
          A <strong>pointer to a pointer</strong> (often called a double pointer) is a variable that stores the address of another pointer. It adds another level of indirection and is commonly used when you need to modify a pointer inside a function, handle 2D dynamic arrays, or work with arrays of strings.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📌 What Is a Double Pointer?</h2>
          <p className="leading-relaxed">
            A double pointer is declared with two asterisks: <code>type **ptr;</code>. It holds the address of a pointer variable.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int x = 10;
int *p = &x;   // single pointer
int **pp = &p; // double pointer, holds address of p`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            You can then access <code>x</code> via <code>**pp</code> (double dereference).
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🎯 Why Use a Double Pointer?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Modify a pointer inside a function (like dynamic allocation).</li>
            <li>Create and manage 2D arrays dynamically.</li>
            <li>Work with arrays of strings (e.g., <code>argv</code>).</li>
            <li>Implement linked lists with head pointers.</li>
          </ul>
        </div>
      </div>

      {/* SVG: Double Pointer Relationship */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Indirection: Pointer to Pointer</h3>
        <div className="flex justify-center">
          <svg width="500" height="220" viewBox="0 0 500 220" className="max-w-full h-auto">
            {/* Variable x */}
            <rect x="30" y="80" width="80" height="50" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
            <text x="70" y="105" textAnchor="middle" fill="#3B82F6" fontSize="12">x</text>
            <text x="70" y="125" textAnchor="middle" fill="currentColor" fontSize="10">value: 42</text>

            {/* Pointer p */}
            <rect x="180" y="80" width="100" height="50" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="230" y="105" textAnchor="middle" fill="#10B981" fontSize="12">p (int*)</text>
            <text x="230" y="125" textAnchor="middle" fill="currentColor" fontSize="10">holds &x</text>

            {/* Double pointer pp */}
            <rect x="350" y="80" width="100" height="50" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
            <text x="400" y="105" textAnchor="middle" fill="#F59E0B" fontSize="12">pp (int**)</text>
            <text x="400" y="125" textAnchor="middle" fill="currentColor" fontSize="10">holds &p</text>

            {/* Arrows */}
            <path d="M280 105 L260 105" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowGreen)" />
            <path d="M450 105 L430 105" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowOrange)" />

            {/* Dereference annotations */}
            <text x="70" y="170" fontSize="10">*p = 42</text>
            <text x="230" y="170" fontSize="10">*pp = p (address)</text>
            <text x="400" y="170" fontSize="10">**pp = 42</text>

            <defs>
              <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#10B981" />
              </marker>
              <marker id="arrowOrange" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#F59E0B" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          A double pointer stores the address of a pointer, adding another level of indirection.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Modifying a Pointer Inside a Function</h3>
          <p className="leading-relaxed">
            If you want a function to change a pointer (e.g., allocate memory and assign it to a pointer), you must pass the pointer's address. This is a classic use case for double pointers.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void allocate(int **ptr, int n) {
    *ptr = malloc(n * sizeof(int)); // changes the original pointer
}

int main() {
    int *arr = NULL;
    allocate(&arr, 10); // arr now points to allocated memory
    free(arr);
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Without a double pointer, any change to <code>ptr</code> inside the function would only affect the local copy.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🗂️ Dynamic 2D Arrays</h3>
          <p className="leading-relaxed">
            A double pointer can be used to create a 2D array where each row is allocated separately. The double pointer points to an array of pointers, each pointing to a row.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int rows = 3, cols = 4;
int **matrix = malloc(rows * sizeof(int*));
for (int i = 0; i < rows; i++)
    matrix[i] = malloc(cols * sizeof(int));`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Abhronila</strong> used a double pointer to store student grades for multiple subjects where the number of subjects varied per student.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Double Pointer in Action</h3>
        <EditableCCodeBlock
          title="Example 1: Swapping Pointers Using Double Pointer"
          initialCode={doublePointerSwap}
        />
        <EditableCCodeBlock
          title="Example 2: Dynamic 2D Array Using Double Pointer"
          initialCode={doublePointer2D}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Dereferencing too many times:</strong> <code>**pp</code> when you only wanted <code>*pp</code> leads to wrong value or crash.</li>
          <li><strong>Forgetting to allocate memory for the pointer array:</strong> In 2D dynamic arrays, both the array of pointers and each row must be allocated.</li>
          <li><strong>Memory leaks:</strong> Free each row then the array of pointers in reverse order.</li>
          <li><strong>Incorrect syntax in function calls:</strong> Passing <code>&amp;ptr</code> instead of <code>ptr</code> when the parameter expects a double pointer.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>When a function needs to allocate or modify a pointer, pass a double pointer.</li>
          <li>Always check for <code>NULL</code> after allocation and handle errors.</li>
          <li>Free dynamically allocated 2D arrays correctly: free each row first, then the main pointer array.</li>
          <li>Use <code>const</code> where appropriate to indicate whether the pointed‑to data or the pointer itself is read‑only.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand the syntax and meaning of <code>int **pp</code>.</li>
            <li>✅ Can explain why a double pointer is needed to modify a pointer in a function.</li>
            <li>✅ Know how to allocate and access a dynamic 2D array with double pointers.</li>
            <li>✅ Can correctly dereference double pointers (<code>*pp</code> and <code>**pp</code>).</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What is the type of <code>*pp</code>? What is the type of <code>**pp</code>?</li>
            <li>Observe carefully: In the swap pointers example, why does swapping the pointers change what they point to?</li>
            <li>Try writing a function that returns a dynamically allocated array using a double pointer parameter.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>typedef</code> to simplify:</strong> <code>typedef int* int_ptr; int_ptr *pp;</code> but be cautious with readability.</li>
          <li><strong>In function parameters, the double pointer is often used to return a pointer:</strong> e.g., <code>int createArray(int **arr, int n)</code> returns status and arr is an output parameter.</li>
          <li><strong>For 2D arrays where rows are contiguous, consider using a single allocation and index manually for better cache performance.</strong></li>
          <li><strong>When working with <code>argv</code>, note that it's a double pointer: <code>char **argv</code>.</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In our Barrackpore CNAT class, I tell students: 'If you want to change an int inside a function, you pass an int*. If you want to change a pointer, you pass a pointer to that pointer – a double pointer.' This is a natural extension of the same concept. Practice with dynamic 2D arrays – they are a classic example where double pointers shine. Remember to free in reverse order, and always check allocations!"
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

export default Topic15;