import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import arrayDecay from "./topic9_files/array_decay.c?raw";
import arrayVsPointer from "./topic9_files/array_vs_pointer.c?raw";

const Topic9 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Arrays & Pointers: The Array Decay Concept
        </h1>
        <p className="text-lg leading-relaxed">
          In C, arrays and pointers are closely related. When an array name is used in most expressions, it <strong>decays</strong> to a pointer to its first element. Understanding this decay is crucial to mastering array manipulation and pointer arithmetic.
        </p>
      </div>

      {/* Concept Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📉 What is Array Decay?</h2>
          <p className="leading-relaxed">
            In most contexts, the name of an array evaluates to the address of its first element. This is called "decay" because the array type is lost – it becomes a pointer.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int arr[5] = {1,2,3,4,5};
int *p = arr;    // arr decays to &arr[0]
// Now p can be used like an array`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Analogy:</strong> At Barrackpore CNAT, <strong>Debangshu</strong> thinks of an array as a row of lockers. The array name is like the building address – it points to the first locker, not the entire row.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">⚠️ Exceptions (No Decay)</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><code>sizeof(arr)</code> – gives total size of array, not pointer size.</li>
            <li><code>&amp;arr</code> – gives address of the whole array (type is pointer to array).</li>
            <li>String literals used to initialize character arrays: <code>char str[] = "hello";</code> (no decay here).</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Understanding these exceptions prevents many bugs.
          </p>
        </div>
      </div>

      {/* SVG: Array Decay Visualization */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Array Name → Pointer to First Element</h3>
        <div className="flex justify-center">
          <svg width="450" height="180" viewBox="0 0 450 180" className="max-w-full h-auto">
            <rect x="40" y="30" width="320" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
            {[0,1,2,3,4].map(i => (
              <rect key={i} x={40 + i*64} y="30" width="64" height="50" fill="none" stroke="gray" strokeWidth="1" />
            ))}
            <text x={72 + 0*64} y="65" textAnchor="middle" fontSize="12">arr[0]</text>
            <text x={72 + 1*64} y="65" textAnchor="middle" fontSize="12">arr[1]</text>
            <text x={72 + 2*64} y="65" textAnchor="middle" fontSize="12">arr[2]</text>
            <text x={72 + 3*64} y="65" textAnchor="middle" fontSize="12">arr[3]</text>
            <text x={72 + 4*64} y="65" textAnchor="middle" fontSize="12">arr[4]</text>

            {/* Decay arrow */}
            <path d="M200 100 L200 140" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
            <text x="210" y="120" fill="#10B981" fontSize="12">decays to</text>
            <rect x="150" y="145" width="100" height="30" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="200" y="165" textAnchor="middle" fill="#10B981" fontSize="12">&amp;arr[0]</text>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          The array name <code>arr</code> becomes a pointer to its first element in most expressions.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 How Decay Affects Function Calls</h3>
          <p className="leading-relaxed">
            When you pass an array to a function, it decays to a pointer. This is why the function receives a pointer, not a copy of the array.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`void printArray(int *arr, int size) { // arr is a pointer
    for(int i=0; i<size; i++)
        printf("%d ", arr[i]); // arr[i] works because of decay
}

int main() {
    int nums[] = {1,2,3};
    printArray(nums, 3); // nums decays to pointer
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This explains why you must pass the size separately – the pointer carries no length information.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 The Exceptions: When Arrays Don't Decay</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong><code>sizeof(arr)</code></strong>: returns total bytes of the array, not pointer size.</li>
            <li><strong><code>&amp;arr</code></strong>: yields address of the entire array (type is <code>int (*)[n]</code>).</li>
            <li><strong>String literal initialization:</strong> <code>char s[] = "hello";</code> – here <code>s</code> is an array, not a pointer.</li>
          </ul>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int arr[10];
printf("%zu\\n", sizeof(arr));     // 40 (if int=4)
printf("%zu\\n", sizeof(&arr));    // 8 (pointer size)`}
          </pre>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Observe Decay in Action</h3>
        <EditableCCodeBlock
          title="Example 1: Array Decay and sizeof"
          initialCode={arrayDecay}
        />
        <EditableCCodeBlock
          title="Example 2: Array vs Pointer Differences"
          initialCode={arrayVsPointer}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Assuming arrays are passed by value:</strong> They decay to pointers, so modifications inside a function affect the original array.</li>
          <li><strong>Using <code>sizeof</code> on array parameter:</strong> Inside a function, the parameter is a pointer, so <code>sizeof</code> returns pointer size, not array size.</li>
          <li><strong>Confusing <code>&amp;arr</code> with <code>arr</code>:</strong> <code>&amp;arr</code> is a pointer to the whole array, while <code>arr</code> decays to pointer to first element. Their types differ.</li>
          <li><strong>Forgetting that decay doesn't happen everywhere:</strong> Applying <code>sizeof</code> to an array works as expected only in the scope where the array is declared.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always pass the array size explicitly to functions that receive arrays (since they see only a pointer).</li>
          <li>Use <code>sizeof(arr) / sizeof(arr[0])</code> to get element count, but only in the same scope where the array is defined.</li>
          <li>If you need to preserve array type information, consider wrapping the array in a struct (rare) or using C11's <code>_Static_assert</code> to check sizes.</li>
          <li>Be consistent: treat array parameters as pointers in function declarations (e.g., <code>int arr[]</code> is equivalent to <code>int *arr</code>).</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that array names decay to pointers to their first element.</li>
            <li>✅ Know the exceptions: <code>sizeof</code>, <code>&amp;</code>, and string literal initialization.</li>
            <li>✅ Can explain why arrays are passed to functions as pointers.</li>
            <li>✅ Recognize the difference between <code>arr</code> and <code>&amp;arr</code>.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you try to assign an array to another array? <code>int a[5], b[5]; a = b;</code> – why is it invalid?</li>
            <li>Observe carefully: How does <code>sizeof</code> behave inside a function vs in <code>main</code> for the same array?</li>
            <li>Try printing <code>arr</code> and <code>&amp;arr</code> – they have the same value but different types. How can you verify?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>static</code> in function parameters (C99):</strong> <code>void func(int arr[static 10])</code> hints that at least 10 elements are expected.</li>
          <li><strong>When you need to pass a multidimensional array,</strong> only the first dimension decays; others must be specified.</li>
          <li><strong>Understand that <code>arr[i]</code> is syntactic sugar for <code>*(arr + i)</code>.</strong> This equivalence is fundamental.</li>
          <li><strong>For generic array functions,</strong> accept <code>void*</code> and element size to work with any array type (like <code>qsort</code>).</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In our Barrackpore CNAT class, we call array decay the 'shape‑shifting' of arrays. I tell students: 'An array is a fixed block of memory, but its name transforms into a pointer when you use it.' The exceptions are crucial: use sizeof in the same scope to get the true size. Also, remember that passing an array to a function is passing a pointer – modifications will be visible outside. This is both powerful and dangerous, so stay vigilant!"
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

export default Topic9;