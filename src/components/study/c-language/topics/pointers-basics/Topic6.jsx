import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import readingWriting from "./topic6_files/reading_writing.c?raw";
import complexTypes from "./topic6_files/complex_types.c?raw";

const Topic6 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Reading and Writing Values Using Pointers
        </h1>
        <p className="text-lg leading-relaxed">
          Once a pointer holds a valid address, you can <strong>read</strong> the value at that address (dereference) or <strong>write</strong> a new value into that memory location. This two‑way access is what makes pointers powerful for modifying data indirectly.
        </p>
      </div>

      {/* Core Concepts */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📖 Reading via Pointers</h2>
          <p className="leading-relaxed mb-2">
            To read, you <strong>dereference</strong> the pointer using <code>*</code>. The expression <code>*ptr</code> evaluates to the value stored at the address.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int x = 42;
int *p = &x;
int y = *p;   // y gets 42 (read)
printf("%d", *p); // prints 42`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Reading does not change the pointer or the pointed‑to value.
          </p>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">✍️ Writing via Pointers</h2>
          <p className="leading-relaxed mb-2">
            To write, you assign to the dereferenced pointer. The left‑hand side <code>*ptr = value</code> stores the value into the memory location pointed to.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int x = 10;
int *p = &x;
*p = 20;      // x becomes 20 (write)
*p = *p + 5;  // x becomes 25`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Writing modifies the original variable (or heap memory) directly.
          </p>
        </div>
      </div>

      {/* SVG Illustration */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Pointer Read/Write Flow</h3>
        <div className="flex justify-center">
          <svg width="500" height="200" viewBox="0 0 500 200" className="max-w-full h-auto">
            {/* Variable box */}
            <rect x="40" y="50" width="120" height="80" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" rx="4" />
            <text x="100" y="85" textAnchor="middle" fill="#3B82F6" fontSize="12">x</text>
            <text x="100" y="105" textAnchor="middle" fill="currentColor" fontSize="10">value: 42</text>

            {/* Pointer box */}
            <rect x="280" y="50" width="120" height="80" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" rx="4" />
            <text x="340" y="85" textAnchor="middle" fill="#10B981" fontSize="12">p</text>
            <text x="340" y="105" textAnchor="middle" fill="currentColor" fontSize="10">address: &x</text>

            {/* Arrow */}
            <path d="M280 90 L160 90" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4" />

            {/* Read operation */}
            <path d="M340 150 L340 190 L180 190" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3" />
            <text x="260" y="180" textAnchor="middle" fontSize="10" fill="#3B82F6">Read: y = *p</text>
            <rect x="100" y="170" width="60" height="20" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1" />
            <text x="130" y="185" textAnchor="middle" fontSize="9" fill="currentColor">y = 42</text>

            {/* Write operation */}
            <path d="M340 135 L340 115 L280 115 L280 90" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3" />
            <text x="310" y="125" textAnchor="middle" fontSize="10" fill="#F59E0B">Write: *p = 100</text>
            <text x="100" y="45" textAnchor="middle" fontSize="9" fill="#F59E0B">x becomes 100</text>

            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#10B981" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Reading (<code>*p</code>) fetches the value from the pointed location. Writing (<code>*p = value</code>) changes the pointed location.
        </p>
      </div>

      {/* Deeper Explanation */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 Understanding Lvalues and Rvalues</h3>
          <p className="leading-relaxed mb-2">
            When you dereference a pointer, the result is an <strong>lvalue</strong> – it represents a location in memory. That's why you can assign to <code>*p</code>.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
            {`int *p = &x;
*p = 10;      // OK: *p is an lvalue
int y = *p;   // OK: *p is read as rvalue`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This is the key difference from a plain variable like <code>p</code> itself – <code>p</code> is an lvalue (you can change where it points), <code>*p</code> is also an lvalue (you can change the value it points to).
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">📊 Reading/Writing Different Types</h3>
          <p className="leading-relaxed">
            The pointer type determines how many bytes are read/written. A <code>char*</code> reads/writes one byte, an <code>int*</code> reads/writes 4 bytes, and so on.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/70 p-3 rounded-lg mt-2">
            <code className="text-sm">
              int i = 0x12345678;<br />
              char *cp = (char*)&i;<br />
              *cp = 0xAA;      // writes only the first byte of i<br />
              printf("%x", i);  // output depends on endianness
            </code>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world scenario:</strong> At Barrackpore CNAT, <strong>Ritaja</strong> used a <code>char*</code> to inspect the individual bytes of an integer – useful for serialization and network protocols.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 Practice Reading and Writing</h3>
        <EditableCCodeBlock
          title="Example 1: Basic Reading and Writing"
          initialCode={readingWriting}
        />
        <EditableCCodeBlock
          title="Example 2: Working with Different Types"
          initialCode={complexTypes}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Dereferencing a pointer that is NULL or uninitialized:</strong> Results in crash or undefined behavior.</li>
          <li><strong>Reading before writing:</strong> Using the value from an uninitialized pointer (wild) leads to garbage.</li>
          <li><strong>Type mismatch:</strong> Writing a value of wrong size or alignment can corrupt memory.</li>
          <li><strong>Forgetting the * when reading:</strong> <code>int y = p;</code> assigns the address, not the value.</li>
          <li><strong>Using <code>&amp;</code> instead of <code>*</code>:</strong> <code>printf("%d", &x);</code> prints address, not value.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always initialize pointers before dereferencing (NULL or valid address).</li>
          <li>Check for NULL before reading or writing: <code>if (ptr != NULL) *ptr = value;</code>.</li>
          <li>Use <code>sizeof(*ptr)</code> when allocating memory to avoid type mismatches.</li>
          <li>When writing to a pointer, ensure the target memory is writable (e.g., not a string literal).</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Can read a value using <code>*ptr</code>.</li>
            <li>✅ Can write a value using <code>*ptr = value</code>.</li>
            <li>✅ Understands that <code>*ptr</code> is an lvalue.</li>
            <li>✅ Knows that the pointer's type determines the read/write size.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>What is the difference between <code>p</code> and <code>*p</code>? Write code to print both.</li>
            <li>Observe carefully: what happens if you do <code>*p = *p + 1</code>? Does it change <code>p</code> or the value?</li>
            <li>Try reading and writing through a <code>void*</code> pointer (you'll need casting).</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use compound assignment:</strong> <code>*ptr += 5;</code> reads and writes in one go.</li>
          <li><strong>Pre‑increment with dereference:</strong> <code>*++ptr</code> vs <code>++*ptr</code> – be careful with precedence.</li>
          <li><strong>Volatile qualifier:</strong> When reading/writing memory‑mapped I/O, use <code>volatile</code> to prevent compiler optimizations.</li>
          <li><strong>Debug with <code>printf("%p: %d", ptr, *ptr);</code></strong> to verify pointer contents.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "Students often ask: 'Why can't I just use the variable directly?' The power is in indirection – when you pass a pointer, you can modify the original from anywhere. In our Barrackpore CNAT class, we practice swapping values, modifying arrays, and building linked lists. Remember: reading doesn't change anything; writing does. And always make sure the pointer is valid before you read or write!"
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

export default Topic6;