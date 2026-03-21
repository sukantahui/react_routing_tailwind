import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import pointerVsIndexing from "./topic10_files/pointer_vs_indexing.c?raw";
import performance from "./topic10_files/performance.c?raw";

const Topic10 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Accessing Arrays: Pointers vs Indexing
        </h1>
        <p className="text-lg leading-relaxed">
          In C, arrays can be accessed using either the subscript operator <code>[]</code> or pointer arithmetic. These two methods are interchangeable because <code>arr[i]</code> is exactly equivalent to <code>*(arr + i)</code>. Understanding both styles gives you flexibility and insight into how C works under the hood.
        </p>
      </div>

      {/* Two Approaches Cards */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📌 Indexing (Subscript) Notation</h2>
          <p className="leading-relaxed">
            The most common way to access array elements: <code>array[index]</code>. It's readable and intuitive.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int scores[] = {85, 92, 78, 88};
int first = scores[0];    // 85
scores[2] = 95;           // modify third element`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This notation works because arrays decay to pointers, and <code>arr[i]</code> is sugar for <code>*(arr + i)</code>.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔗 Pointer Arithmetic Notation</h2>
          <p className="leading-relaxed">
            Using a pointer to traverse the array: <code>*(ptr + offset)</code>. This style is closer to how the machine actually works.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int scores[] = {85, 92, 78, 88};
int *p = scores;           // p points to scores[0]
int first = *p;            // 85
*(p + 2) = 95;             // modify third element`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Often used in low‑level programming and when performance matters.
          </p>
        </div>
      </div>

      {/* SVG: Equivalence */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">arr[i] ⇔ *(arr + i)</h3>
        <div className="flex justify-center">
          <svg width="500" height="140" viewBox="0 0 500 140" className="max-w-full h-auto">
            <rect x="50" y="30" width="60" height="40" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
            <text x="80" y="55" textAnchor="middle" fill="#3B82F6" fontSize="12">arr</text>
            <text x="80" y="80" textAnchor="middle" fontSize="10">address</text>

            <text x="150" y="55" fontSize="16" fill="currentColor">+</text>
            <rect x="170" y="30" width="60" height="40" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="200" y="55" textAnchor="middle" fill="#10B981" fontSize="12">i</text>
            <text x="200" y="80" textAnchor="middle" fontSize="10">offset</text>

            <text x="270" y="55" fontSize="20" fill="currentColor">→</text>
            <rect x="310" y="30" width="80" height="40" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
            <text x="350" y="55" textAnchor="middle" fill="#F59E0B" fontSize="12">*(arr+i)</text>
            <text x="350" y="80" textAnchor="middle" fontSize="10">value</text>

            <text x="420" y="55" fontSize="20" fill="currentColor">⇔</text>
            <rect x="450" y="30" width="40" height="40" fill="#A855F7" fillOpacity="0.2" stroke="#A855F7" strokeWidth="2" />
            <text x="470" y="55" textAnchor="middle" fill="#A855F7" fontSize="12">arr[i]</text>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          The compiler translates subscript notation into pointer arithmetic automatically.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 The Equivalence Explained</h3>
          <p className="leading-relaxed">
            The C standard defines <code>arr[i]</code> as identical to <code>*(arr + i)</code>. This is why array indexing is just syntactic sugar for pointer arithmetic.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int arr[] = {10,20,30};
int *p = arr;
// All these access the same element:
arr[1]   // 20
*(arr+1) // 20
p[1]     // 20
*(p+1)   // 20`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Because of this equivalence, you can also use pointer notation on array names and subscript notation on pointers – they are interchangeable.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">⚡ Performance Considerations</h3>
          <p className="leading-relaxed">
            With modern compilers, indexing and pointer arithmetic produce identical machine code. The choice is primarily about readability.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Indexing</strong> is clearer for simple loops and when the index is used in multiple ways.</li>
            <li><strong>Pointer arithmetic</strong> can be more concise for walking through arrays without a separate index variable.</li>
            <li><strong>Moving pointers (e.g., <code>p++</code>)</strong> can be slightly faster in some old compilers, but modern optimizations make it irrelevant.</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> At Barrackpore CNAT, <strong>Debolina</strong> uses pointer arithmetic in tight loops when she needs to process large data sets, though she notes that clarity is more important unless profiling shows a bottleneck.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Try Both Methods</h3>
        <EditableCCodeBlock
          title="Example 1: Pointer vs Indexing Comparison"
          initialCode={pointerVsIndexing}
        />
        <EditableCCodeBlock
          title="Example 2: Performance Comparison (Conceptual)"
          initialCode={performance}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Off-by-one errors:</strong> When using pointer arithmetic, it's easy to go one past the end (e.g., <code>while(p &lt;= end)</code> vs <code>p &lt; end</code>).</li>
          <li><strong>Mixing array and pointer declarations incorrectly:</strong> <code>int *p = arr;</code> works, but <code>int *p = &arr;</code> gives wrong type.</li>
          <li><strong>Assuming pointer notation is always faster:</strong> Modern compilers optimize both equally; focus on clarity.</li>
          <li><strong>Modifying the base pointer when you still need the start:</strong> If you increment <code>p</code>, you lose the original address unless you keep a copy.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use indexing for simple, straightforward access – it's more readable.</li>
          <li>When you need to traverse an array without an explicit index, consider pointer arithmetic (e.g., <code>while(p &lt; end) {`{ ... p++; }`}</code>).</li>
          <li>If you use pointer arithmetic and need the original address, store it in another variable.</li>
          <li>Be consistent: in a given function, use one style for clarity unless there's a good reason to mix.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that <code>arr[i]</code> is exactly <code>*(arr + i)</code>.</li>
            <li>✅ Can access arrays using both subscript and pointer arithmetic.</li>
            <li>✅ Know that pointers can be indexed (<code>p[i]</code>) and arrays can be dereferenced (<code>*(arr+offset)</code>).</li>
            <li>✅ Recognize when to use each style for readability and maintenance.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What is the difference between <code>p++</code> and <code>p+1</code> in terms of the original pointer value?</li>
            <li>Observe carefully: <code>arr[0]</code> and <code>0[arr]</code> – why does the latter also work?</li>
            <li>Try writing a loop to copy an array using pointer arithmetic and using indexing – which feels more natural to you?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>p = arr; while(p &lt; arr + n){` { ... p++; }`}</code></strong> for pointer traversal – it's a common pattern in low‑level code.</li>
          <li><strong>Prefer indexing when you need the index for other calculations</strong> (e.g., <code>arr[i] = arr[i] * 2;</code>).</li>
          <li><strong>Remember that <code>arr[i]</code> is equivalent to <code>i[arr]</code></strong> because addition is commutative: <code>*(arr + i) == *(i + arr)</code>. This is a quirky but valid syntax.</li>
          <li><strong>When passing arrays to functions,</strong> you can use either style in the function body – the parameter is a pointer, so both work.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In our Barrackpore CNAT class, I encourage students to become bilingual: speak both indexing and pointer arithmetic. The subscript notation is comfortable, but understanding pointer arithmetic is essential when you work with dynamic memory or implement data structures. Remember, they are two faces of the same coin – the compiler translates indexing into pointer arithmetic anyway. Choose what makes your code clearer, but be able to read both."
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

export default Topic10;