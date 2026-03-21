import React from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import pointerArithmeticSize from "./topic8_files/pointer_arithmetic_size.c?raw";
import structPointer from "./topic8_files/struct_pointer.c?raw";

const Topic8 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Header Section */}
      <div className="animate-fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Pointer Arithmetic & Data Type Size
        </h1>
        <p className="text-lg leading-relaxed">
          The step size of pointer arithmetic is determined by the <strong>type of the pointer</strong>. Adding 1 to a pointer advances it by <code>sizeof(type)</code> bytes, not one byte. This behavior is fundamental to traversing arrays and managing memory correctly.
        </p>
      </div>

      {/* Why Size Matters */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-6" style={{ animationDelay: "50ms" }}>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">📐 Step Size = sizeof(type)</h2>
          <p className="leading-relaxed">
            When you perform arithmetic on a pointer, the compiler automatically scales the integer offset by the size of the pointed-to type.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int *ip;      // sizeof(int) = 4
ip + 1;       // advances by 4 bytes

char *cp;     // sizeof(char) = 1
cp + 1;       // advances by 1 byte

double *dp;   // sizeof(double) = 8
dp + 1;       // advances by 8 bytes`}
          </pre>
        </div>
        <div className="group rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-3">🎯 Why This Matters</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Array traversal works seamlessly.</li>
            <li>You can step through structures element‑by‑element.</li>
            <li>Memory allocation with <code>malloc</code> matches pointer arithmetic.</li>
            <li>Prevents byte‑level errors when working with different types.</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Real‑world:</strong> At Barrackpore CNAT, <strong>Abhronila</strong> used pointer arithmetic on a <code>struct Student*</code> to iterate through an array of records – the step size automatically accounted for the structure size.
          </p>
        </div>
      </div>

      {/* SVG: Different Step Sizes */}
      <div className="animate-fade-up rounded-xl bg-gray-50 dark:bg-gray-800/50 p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700" style={{ animationDelay: "100ms" }}>
        <h3 className="text-xl font-semibold mb-3 text-center">Pointer + 1 Means Different Byte Offsets</h3>
        <div className="flex justify-center overflow-x-auto">
          <svg width="500" height="240" viewBox="0 0 500 240" className="max-w-full h-auto">
            {/* Memory grid */}
            <rect x="40" y="20" width="400" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
            {[0,1,2,3,4,5,6,7].map(i => (
              <rect key={i} x={40 + i*50} y="20" width="50" height="30" fill="none" stroke="gray" strokeWidth="0.5" />
            ))}
            <text x="40" y="15" fontSize="8">0</text>
            <text x="90" y="15" fontSize="8">50</text>
            <text x="140" y="15" fontSize="8">100</text>
            <text x="190" y="15" fontSize="8">150</text>
            <text x="240" y="15" fontSize="8">200</text>
            
            {/* int* line */}
            <rect x="40" y="60" width="100" height="25" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
            <text x="90" y="78" textAnchor="middle" fontSize="10" fill="#3B82F6">int*: 4 bytes</text>
            <path d="M90 85 L90 50" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3" />
            <rect x="140" y="60" width="100" height="25" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
            <text x="190" y="78" textAnchor="middle" fontSize="10" fill="#3B82F6">int* + 1</text>
            <path d="M190 85 L190 50" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3" />
            
            {/* char* line */}
            <rect x="40" y="100" width="50" height="25" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="65" y="118" textAnchor="middle" fontSize="10" fill="#10B981">char*</text>
            <path d="M65 125 L65 50" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3" />
            <rect x="90" y="100" width="50" height="25" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
            <text x="115" y="118" textAnchor="middle" fontSize="10" fill="#10B981">+1</text>
            <path d="M115 125 L115 50" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3" />
            
            {/* double* line */}
            <rect x="40" y="140" width="200" height="25" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
            <text x="140" y="158" textAnchor="middle" fontSize="10" fill="#F59E0B">double*: 8 bytes</text>
            <path d="M140 165 L140 50" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3" />
            <rect x="240" y="140" width="200" height="25" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
            <text x="340" y="158" textAnchor="middle" fontSize="10" fill="#F59E0B">double* + 1</text>
            <path d="M340 165 L340 50" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3" />
          </svg>
        </div>
        <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400">
          Adding 1 to an <code>int*</code> moves by 4 bytes, to a <code>char*</code> by 1 byte, and to a <code>double*</code> by 8 bytes.
        </p>
      </div>

      {/* Deep Dive */}
      <div className="animate-fade-up space-y-8" style={{ animationDelay: "150ms" }}>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🔍 Byte vs Element Movement</h3>
          <p className="leading-relaxed">
            The critical insight: pointer arithmetic works in units of the <strong>base type</strong>. This allows you to treat a block of memory as an array of that type.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`int arr[5] = {1,2,3,4,5};
int *p = arr;           // p points to arr[0]
char *cp = (char*)arr;  // cp points to the same memory, but as bytes

p++;   // now points to arr[1] (4 bytes ahead)
cp++;  // now points to the second byte of arr[0]`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <strong>Example:</strong> <strong>Sreeparna</strong> needed to copy an integer array byte‑by‑byte for serialization. She used a <code>char*</code> to traverse the memory bytewise, while <code>int*</code> gave her element access.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all">
          <h3 className="text-2xl font-semibold mb-3">🧱 Pointer Arithmetic on Structures</h3>
          <p className="leading-relaxed">
            For structures, the step size is the total size of the structure (including padding). This makes it easy to iterate over arrays of structures.
          </p>
          <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm mt-2">
            {`struct Student {
    int id;
    char name[50];
};
struct Student class[30];
struct Student *ptr = class;  // points to class[0]
ptr++;  // now points to class[1] (sizeof(Student) bytes later)`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This is exactly how array indexing works under the hood: <code>class[i]</code> is equivalent to <code>*(class + i)</code>.
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="animate-fade-up space-y-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-2xl font-semibold">💻 See the Step Size in Action</h3>
        <EditableCCodeBlock
          title="Example 1: Different Pointer Types, Different Steps"
          initialCode={pointerArithmeticSize}
        />
        <EditableCCodeBlock
          title="Example 2: Structure Pointer Arithmetic"
          initialCode={structPointer}
        />
      </div>

      {/* Common Pitfalls */}
      <div className="animate-fade-up bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl" style={{ animationDelay: "250ms" }}>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Pitfalls</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Assuming +1 means one byte:</strong> This is only true for <code>char*</code>. For other types, it moves by multiple bytes.</li>
          <li><strong>Using pointer arithmetic on <code>void*</code>:</strong> Not allowed because the size is unknown. Always cast to a concrete type first.</li>
          <li><strong>Misunderstanding pointer subtraction:</strong> Subtracting two pointers yields the number of elements, not bytes.</li>
          <li><strong>Ignoring alignment/padding:</strong> For structures, the actual size may be larger than the sum of members due to padding; pointer arithmetic uses the padded size.</li>
        </ul>
      </div>

      {/* Best Practices */}
      <div className="animate-fade-up bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-5 rounded-r-xl" style={{ animationDelay: "300ms" }}>
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">✅ Best Practices</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Always let the compiler handle scaling – don't manually multiply by <code>sizeof(type)</code>.</li>
          <li>When you need byte‑level movement, use <code>char*</code> or <code>unsigned char*</code>.</li>
          <li>For generic memory operations, use <code>void*</code> but cast to <code>char*</code> for arithmetic.</li>
          <li>Use <code>sizeof(*ptr)</code> to allocate memory so the size matches the pointer type.</li>
        </ul>
      </div>

      {/* Checklist */}
      <div className="animate-fade-up grid md:grid-cols-2 gap-4" style={{ animationDelay: "350ms" }}>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">📋 Student Checklist</h4>
          <ul className="space-y-1 text-sm">
            <li>✅ Understand that <code>ptr + n</code> moves by <code>n * sizeof(*ptr)</code> bytes.</li>
            <li>✅ Can predict the address offset for different pointer types.</li>
            <li>✅ Knows that <code>char*</code> steps by one byte, <code>int*</code> by four (on typical systems).</li>
            <li>✅ Understands that structure pointer arithmetic uses the structure's total size.</li>
          </ul>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-bold text-lg mb-2">💡 Hint Section</h4>
          <p className="text-sm">Think about …</p>
          <ul className="list-disc list-inside text-sm mt-1">
            <li>If you have an <code>int*</code> and you add 1, by how many bytes does it advance? Print the addresses to see.</li>
            <li>Observe carefully: what happens if you add 1 to a <code>void*</code>? Why is it disallowed?</li>
            <li>Try creating an array of structures and using pointer arithmetic to access elements. Does it match <code>array[i]</code>?</li>
          </ul>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="animate-fade-up p-5 border-t border-gray-200 dark:border-gray-700" style={{ animationDelay: "400ms" }}>
        <h3 className="text-xl font-semibold mb-2">🎓 Professional Tips & Tricks</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Use <code>ptrdiff_t</code></strong> for the result of pointer subtraction – it's portable and signed.</li>
          <li><strong>When writing generic functions</strong> that work on any type, accept <code>void*</code> and a size, then cast to <code>char*</code> for arithmetic.</li>
          <li><strong>Compiler optimizations</strong> rely on pointer type information – mismatched types can lead to undefined behavior (strict aliasing).</li>
          <li><strong>Know your platform's sizes</strong> – <code>sizeof(int)</code> may vary. Use <code>sizeof</code> in your code to stay portable.</li>
        </ul>
      </div>

      {/* Teacher's Note */}
      <div className="animate-fade-up" style={{ animationDelay: "450ms" }}>
        <Teacher note={
          "In my Barrackpore CNAT class, I emphasize that pointer arithmetic is 'type‑aware'. If you remember that adding 1 to a pointer moves to the next element of its type, you'll avoid off‑by‑one errors. I often have students print addresses before and after arithmetic to see the byte difference. Also, note that <code>void*</code> cannot be used in arithmetic – you must cast to a concrete type. This is a common interview question!"
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

export default Topic8;