import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import callByValue from "./topic13_files/call_by_value.c?raw";
import swapUsingPointers from "./topic13_files/swap_using_pointers.c?raw";

const Topic13 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Pointers as Function Parameters: Call by Value vs Simulated Reference
        </h1>
        <p className="text-lg leading-relaxed">
          C uses <strong>call by value</strong> for function arguments – parameters receive copies of the actual arguments. To modify the original variables, we pass pointers, effectively simulating <strong>call by reference</strong>. Understanding this distinction is key to writing functions that alter data outside their own scope.
        </p>
      </div>

      {/* Two Cards: Call by Value vs Call by Reference Simulation */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📦 Call by Value (Default)</h2>
          <p className="leading-relaxed">
            Parameters receive a <strong>copy</strong> of the argument. Changes inside the function do not affect the original.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void increment(int x) {
    x++;   // modifies the copy only
}

int main() {
    int a = 5;
    increment(a);
    printf("%d", a); // still 5
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Simple and safe, but cannot modify the original variable.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🔗 Simulated Call by Reference</h2>
          <p className="leading-relaxed">
            Pass a <strong>pointer</strong> to the variable. The function receives the address, then dereferences to modify the original.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void increment(int *p) {
    (*p)++;   // modifies the original
}

int main() {
    int a = 5;
    increment(&a);
    printf("%d", a); // now 6
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enables functions to change variables outside their scope – essential for swapping, returning multiple values, etc.
          </p>
        </div>
      </div>

      {/* SVG: Visualising Call by Value vs Pointer */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Pass by Value vs Pass by Pointer</h3>
        <div className="flex justify-center">
          <svg width="500" height="220" viewBox="0 0 500 220" className="max-w-full h-auto">
            {/* Call by value */}
            <rect x="30" y="20" width="200" height="60" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="130" y="40" textAnchor="middle" fill="#3B82F6" fontSize="12">Call by Value</text>
            <rect x="50" y="55" width="50" height="25" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" />
            <text x="75" y="72" textAnchor="middle" fontSize="10">a (5)</text>
            <text x="130" y="72" fontSize="16">→</text>
            <rect x="150" y="55" width="50" height="25" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" />
            <text x="175" y="72" textAnchor="middle" fontSize="10">copy (5)</text>
            <text x="200" y="85" fontSize="10">(copy, no change)</text>

            {/* Call by pointer */}
            <rect x="30" y="120" width="200" height="60" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5" />
            <text x="130" y="140" textAnchor="middle" fill="#10B981" fontSize="12">Call by Pointer</text>
            <rect x="50" y="155" width="50" height="25" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
            <text x="75" y="172" textAnchor="middle" fontSize="10">a (5)</text>
            <text x="130" y="172" fontSize="16">→</text>
            <rect x="150" y="155" width="60" height="25" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" />
            <text x="180" y="172" textAnchor="middle" fontSize="9">&amp;a (addr)</text>
            <path d="M180 180 L80 180" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrow)" />
            <text x="210" y="185" fontSize="10">*ptr changes a</text>
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#10B981" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Pass by value copies data; pass by pointer allows modification of the original.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Why Not Real Call by Reference?</h3>
          <p className="leading-relaxed">
            Languages like C++ have true call by reference, where the parameter is an alias to the argument. C only has call by value, but we <strong>simulate</strong> reference semantics by passing addresses. The function receives a pointer (value) that holds the address of the original variable. By dereferencing, we access the original.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`// Simulated reference
void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This pattern is used throughout C libraries (e.g., <code>scanf("%d", &amp;x)</code>).
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔁 Returning Multiple Values</h3>
          <p className="leading-relaxed">
            Since C functions can only return one value, pointers allow you to "return" additional values by writing to passed‑in pointers.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`void divide(int a, int b, int *quot, int *rem) {
    *quot = a / b;
    *rem = a % b;
}

int main() {
    int q, r;
    divide(10, 3, &q, &r);
    printf("quot=%d rem=%d\\n", q, r);
}`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Swadeep</strong> used this technique to compute both sum and product in one function call.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 See the Difference</h3>
        <EditableCCodeBlock
          title="Example 1: Call by Value (No Effect Outside)"
          initialCode={callByValue}
        />
        <EditableCCodeBlock
          title="Example 2: Swap Using Pointers (Works)"
          initialCode={swapUsingPointers}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Forgetting to dereference:</strong> Inside function, using <code>p = newValue;</code> instead of <code>*p = newValue;</code> changes the pointer, not the original.</li>
          <li><strong>Passing NULL without checking:</strong> Dereferencing a NULL pointer in a function leads to crash.</li>
          <li><strong>Passing pointer to local variable:</strong> Returning pointer to local variable from function is UB (dangling pointer).</li>
          <li><strong>Confusing call by value with pointer syntax:</strong> The function <code>void f(int *p)</code> still uses call by value – the pointer itself is copied, but the copy holds the same address.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Use <code>const</code> for pointer parameters that should not modify the data: <code>void print(const int *p)</code>.</li>
          <li>Always check for NULL in functions that accept pointers (especially if they can be NULL).</li>
          <li>Document the intended use: does the function read, write, or both through the pointer?</li>
          <li>When a function needs to modify a variable, pass a pointer and clearly indicate it with <code>_out</code> or similar naming.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that C passes arguments by value (copies).</li>
            <li>✅ Can write functions that modify caller's variables using pointers.</li>
            <li>✅ Know how to pass the address with <code>&amp;</code> and dereference with <code>*</code> inside the function.</li>
            <li>✅ Can return multiple values via pointer parameters.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>If you pass a pointer to a function, is the pointer itself passed by value? What does that mean for the pointer variable inside the function?</li>
            <li>Observe carefully: In the swap function, what happens if you pass <code>swap(&amp;a, &amp;a)</code>? Is it safe?</li>
            <li>Try writing a function that takes two integers and returns their sum and difference using pointers.</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>restrict</code> keyword (C99) when pointers don't alias:</strong> Helps compiler optimise.</li>
          <li><strong>For large structures, pass a pointer to avoid copying overhead.</strong></li>
          <li><strong>Use <code>size_t</code> and <code>const</code> for read‑only buffers:</strong> e.g., <code>void process(const void *data, size_t len);</code></li>
          <li><strong>When a function modifies a pointer itself (like realloc), pass a double pointer.</strong></li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In Barrackpore CNAT, I often say: 'In C, you can't change what you can't point to.' Passing by value is safe but limited; passing pointers gives you the power to modify. The key is remembering to use <code>&amp;</code> at the call and <code>*</code> inside the function. Practice with swap and increment functions until it becomes second nature. And always ask: 'Do I want to change the original or just use its value?' That choice guides whether to pass a value or a pointer."
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

export default Topic13;