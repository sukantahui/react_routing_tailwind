import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import addressOfDeref from "./topic5_files/address_of_deref.c?raw";
import commonMistakes from "./topic5_files/common_mistakes.c?raw";

const Topic5 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Address‑of (&amp;) &amp; Dereference (*) Operators
        </h1>
        <p className="text-lg leading-relaxed">
          The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&amp;</code> operator gives you the <strong>address</strong> of a variable. The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*</code> operator (dereference) lets you <strong>access the value at an address</strong>. Together, they form the foundation of pointer manipulation in C.
        </p>
      </div>

      {/* Two‑Card Explanation */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl text-blue-600 dark:text-blue-400">&amp;</span>
            <h2 className="text-2xl font-semibold">Address‑of Operator</h2>
          </div>
          <p className="leading-relaxed">
            The <code>&amp;</code> operator returns the memory address where a variable is stored.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int age = 25;
int *ptr = &age;   // ptr holds address of age`}
          </pre>
          <p className="mt-2 text-sm">
            <strong>Prototype:</strong> <code>type* ptr = &amp;variable;</code> — works with any variable (including array elements, struct members).
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            You can only take the address of <strong>lvalues</strong> (things that have a memory location). Constants, literals, and expressions like <code>&amp;(a+b)</code> are invalid.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl text-green-600 dark:text-green-400">*</span>
            <h2 className="text-2xl font-semibold">Dereference Operator</h2>
          </div>
          <p className="leading-relaxed">
            The <code>*</code> operator (when used as a unary operator) accesses the value stored at the address held by a pointer.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int x = 10;
int *p = &x;
printf("%d", *p);   // prints 10
*p = 20;            // changes x to 20`}
          </pre>
          <p className="mt-2 text-sm">
            <strong>Prototype:</strong> <code>value = *pointer;</code> — the type of <code>*pointer</code> is the type the pointer points to.
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Dereferencing an invalid pointer (NULL, wild, or freed) leads to undefined behavior.
          </p>
        </div>
      </div>

      {/* SVG Visualizing & and * */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">How &amp; and * Work Together</h3>
        <div className="flex justify-center">
          <svg width="480" height="220" viewBox="0 0 480 220" className="max-w-full h-auto">
            {/* Variable box */}
            <rect x="40" y="60" width="120" height="80" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" rx="4" />
            <text x="100" y="95" textAnchor="middle" fill="#3B82F6" fontSize="12">x</text>
            <text x="100" y="115" textAnchor="middle" fill="currentColor" fontSize="10">value: 42</text>
            <text x="100" y="135" textAnchor="middle" fill="currentColor" fontSize="9" className="text-gray-500">address: 0x7ffc</text>

            {/* Pointer box */}
            <rect x="280" y="60" width="120" height="80" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" rx="4" />
            <text x="340" y="95" textAnchor="middle" fill="#10B981" fontSize="12">p</text>
            <text x="340" y="115" textAnchor="middle" fill="currentColor" fontSize="10">value: 0x7ffc</text>
            <text x="340" y="135" textAnchor="middle" fill="currentColor" fontSize="9" className="text-gray-500">address: 0x7fe0</text>

            {/* Arrow from p to x */}
            <path d="M280 100 L160 100" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4" />
            <text x="220" y="90" textAnchor="middle" fill="#10B981" fontSize="10">p = &x</text>

            {/* Labels for operators */}
            <text x="40" y="50" fontSize="12" fill="#3B82F6">&amp;x gives this address</text>
            <text x="280" y="50" fontSize="12" fill="#10B981">*p gives this value</text>
            <path d="M100 150 L100 180 L340 180 L340 150" stroke="gray" strokeWidth="1" strokeDasharray="3" />
            <text x="220" y="195" textAnchor="middle" fontSize="10" fill="currentColor">*p == x</text>

            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#10B981" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          <code>&amp;x</code> returns the address of <code>x</code> (stored in <code>p</code>). <code>*p</code> retrieves the value at that address (the value of <code>x</code>).
        </p>
      </div>

      {/* Deep Dive: The Operators in Detail */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Address‑of (&amp;) – More Than Just a Symbol</h3>
          <p className="leading-relaxed mb-2">
            <code>&amp;</code> is a <strong>unary operator</strong> that yields the address of its operand. It can only be applied to <strong>lvalues</strong> (objects that occupy memory). Examples:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><code>&amp;var</code> — address of a variable</li>
            <li><code>&amp;array[i]</code> — address of an array element</li>
            <li><code>&amp;struct.member</code> — address of a structure member</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Cannot use &amp; on:</strong> literals (<code>&amp;5</code>), expressions (<code>&amp;(a+b)</code>), register variables, or bit‑fields.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📖 Dereference (*) – The Gateway to Pointed‑to Data</h3>
          <p className="leading-relaxed mb-2">
            When used as a unary operator (not multiplication), <code>*</code> accesses the value at the address stored in a pointer. It yields an <strong>lvalue</strong>, meaning you can assign to it.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int x = 10;
int *p = &x;
*p = 20;          // x becomes 20
int y = *p + 5;   // y = 25`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The type of <code>*p</code> is the base type of the pointer. So <code>int *p</code> → <code>*p</code> is an <code>int</code>. This is why type matters: <code>char *cp</code> → <code>*cp</code> reads one byte.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Practice with &amp; and *</h3>
        <EditableCCodeBlock
          title="Example 1: Using &amp; and *"
          initialCode={addressOfDeref}
        />
        <EditableCCodeBlock
          title="Example 2: Common Mistakes"
          initialCode={commonMistakes}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Confusing &amp; and * in declarations:</strong> <code>int *p = &amp;x;</code> — the <code>*</code> is part of declaration, not dereference.</li>
          <li><strong>Using &amp; with constants/expressions:</strong> <code>&amp;(a+b)</code> is invalid.</li>
          <li><strong>Dereferencing NULL or uninitialized pointer:</strong> Leads to crash or undefined behavior.</li>
          <li><strong>Forgetting &amp; when passing to scanf:</strong> <code>scanf("%d", x)</code> instead of <code>&amp;x</code> — common source of crashes.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always ensure a pointer is initialized before dereferencing.</li>
          <li>Use <code>&amp;</code> only on lvalues; check compiler warnings.</li>
          <li>In <code>scanf</code>, always pass <code>&amp;variable</code> for non‑array types.</li>
          <li>When you see a pointer <code>p</code>, mentally separate: <code>p</code> is an address, <code>*p</code> is the value.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that <code>&amp;</code> yields an address, <code>*</code> accesses the value at an address.</li>
            <li>✅ Can read <code>int *p = &amp;x;</code> as "p is a pointer to int, initialized with address of x".</li>
            <li>✅ Know that <code>*p</code> is an lvalue (can be assigned to).</li>
            <li>✅ Recognize that <code>&amp;</code> cannot be applied to literals or expressions.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What happens if you try to print <code>&amp;x</code> with <code>%d</code> instead of <code>%p</code>?</li>
            <li>Observe carefully: <code>printf("%d\n", *(&amp;x));</code> – what does this print and why?</li>
            <li>Try writing <code>int *p = &amp;x;</code> and then <code>int y = *p;</code>. Is there any difference between <code>y</code> and <code>*(&amp;x)</code>?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Read <code>&amp;</code> as "address of" and <code>*</code> as "value at".</strong> This mental translation helps.</li>
          <li><strong>Use <code>gdb</code> to explore:</strong> <code>print &amp;x</code> and <code>print *(&amp;x)</code>.</li>
          <li><strong>Understand that <code>&amp;*p == p</code> and <code>*&amp;x == x</code>.</strong> These identities are often useful in reasoning.</li>
          <li><strong>Compiler warnings:</strong> Enable <code>-Wall</code> to catch invalid uses of <code>&amp;</code>.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In Barrackpore CNAT, I often see students mix up & and * when reading code. A simple trick: & gives you a box (address), * opens the box. Practice writing small programs that assign values through pointers. Remember: & is the 'address of' operator, * is the 'dereference' operator. They are inverses: &*p == p and *&x == x."
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

export default Topic5;