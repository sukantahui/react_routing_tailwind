import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic7_files/example1.c?raw";
import example2 from "./topic7_files/example2.c?raw";
import example3 from "./topic7_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic7 = () => {
  // Calculate teacher's experience dynamically
  const startYear = 1998;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;

  return (
    <div className="dark" style={{ backgroundColor: "#121212" }}> {/* dark mode default */}
      <style>{animationStyles}</style>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Title section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate">
          <h1 className="text-4xl font-light tracking-tight leading-tight">
            Topic 7: Pointer arithmetic and its relation to array indexing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How C connects pointers and arrays – and why <code>arr[i]</code> is just syntactic sugar for <code>*(arr + i)</code>.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">🔗 Pointer arithmetic defined</h2>
          <p className="leading-relaxed">
            In C, when you add an integer to a pointer, the compiler automatically scales the addition by the size of the pointed-to type. For example, if <code>ptr</code> is an <code>int*</code> and <code>sizeof(int) == 4</code>, then <code>ptr + 1</code> advances the address by 4 bytes, not 1 byte. This scaling is what makes array indexing work.
          </p>
          <p className="leading-relaxed mt-4">
            The expression <code>arr[i]</code> is exactly equivalent to <code>*(arr + i)</code>. The array name <code>arr</code> decays to a pointer to the first element. Adding <code>i</code> gives the address of the i‑th element, and dereferencing retrieves the value. This is why array indices start at 0: <code>arr + 0</code> points to the first element.
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, if the lockers are numbered 0,1,2,… and each locker occupies 1 meter of wall space, then the address of locker <code>i</code> is base address + i meters. Pointer arithmetic works the same way: <code>ptr + i</code> moves i lockers forward, automatically accounting for locker width.
            </p>
          </div>
        </section>

        {/* SVG Illustration: pointer arithmetic */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🧮 Visualizing pointer arithmetic</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="450" height="200" viewBox="0 0 450 200" className="max-w-full h-auto">
              {/* Array boxes */}
              {[0,1,2,3,4].map((i) => (
                <g key={i}>
                  <rect x={30 + i*70} y="50" width="60" height="50" fill="none" stroke="#3b82f6" strokeWidth="2" rx="2" />
                  <text x={30 + i*70 + 30} y="85" textAnchor="middle" fill="currentColor">arr[{i}]</text>
                  <text x={30 + i*70 + 30} y="110" textAnchor="middle" fill="#6b7280" className="text-xs">0x{ (1000 + i*4).toString(16) }</text>
                </g>
              ))}
              {/* Pointer arrow to arr[2] via ptr+2 */}
              <line x1="100" y1="30" x2="170" y2="45" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="70" y="25" fill="#ef4444" fontSize="12">ptr = arr</text>
              <text x="180" y="25" fill="#ef4444" fontSize="12">ptr+2</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            <code>ptr + 2</code> moves two elements forward; <code>*(ptr+2)</code> is the same as <code>arr[2]</code>.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Pointer arithmetic in C</h2>

          <EditableCCodeBlock
            title="Example 1: Array indexing vs pointer arithmetic"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Both forms produce identical machine code.
          </p>

          <EditableCCodeBlock
            title="Example 2: Pointer increment and traversal"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Subtracting pointers (distance between elements)"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Use array indexing for readability</strong> – <code>arr[i]</code> is clearer than <code>*(arr + i)</code> in most cases.</li>
            <li><strong>Pointer arithmetic is essential when working with dynamically allocated memory</strong> – e.g., <code>malloc</code> returns a pointer, and you navigate with <code>ptr + i</code>.</li>
            <li><strong>You can increment a pointer variable</strong> (<code>ptr++</code>) but not the array name itself (<code>arr++</code> is invalid).</li>
            <li><strong>Pointer subtraction gives the number of elements between two pointers</strong> – useful for calculating indices.</li>
            <li><strong>Be careful with pointer arithmetic on <code>void*</code></strong> – not allowed in standard C; cast to <code>char*</code> first for byte‑level operations.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Forgetting that pointer arithmetic scales by type size</p>
              <p className="text-sm"><code>char *cptr; int *iptr; cptr + 1</code> moves 1 byte, <code>iptr + 1</code> moves 4 (or more). Beginners sometimes think it always moves 1 byte.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Applying pointer arithmetic to a pointer that doesn't point to an array</p>
              <p className="text-sm">Adding to a pointer that points to a single variable leads to undefined behavior if dereferenced.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Misunderstanding <code>&arr</code> vs <code>arr</code></p>
              <p className="text-sm"><code>&arr</code> is a pointer to the whole array (type <code>int (*)[5]</code>). <code>&arr + 1</code> jumps by the entire array size, not one element.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>When using pointer arithmetic for iteration, ensure you don't go out of bounds.</li>
            <li>Use <code>const</code> with pointers to prevent unintended modification: <code>const int *ptr</code>.</li>
            <li>If you need byte‑level access, cast to <code>char*</code> and work with bytes.</li>
            <li>Document complex pointer arithmetic with comments – it can be hard to read.</li>
            <li>Prefer array indexing for clarity unless performance measurements show pointer arithmetic is faster (usually they are identical).</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ <code>arr[i] ≡ *(arr + i)</code>.</li>
            <li>✔️ Pointer arithmetic scales by <code>sizeof(type)</code>.</li>
            <li>✔️ You can increment/decrement pointer variables, not array names.</li>
            <li>✔️ Subtracting pointers gives the number of elements between them.</li>
            <li>✔️ Dereferencing a pointer out of bounds is undefined behavior.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “In Example 1, try changing <code>*(ptr + i)</code> to <code>*ptr + i</code>. What happens? (Hint: operator precedence.)”
          </p>
          <p className="italic mt-2">
            “If <code>ptr</code> points to <code>arr[2]</code>, what does <code>ptr[-1]</code> give? Yes, negative indices are allowed as long as they stay within array bounds.”
          </p>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[900ms] p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-medium mb-2">🧑‍🏫 Teacher's Note – Sukanta Hui</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Sukanta Hui</strong> (email: <a href="mailto:sukantahui@codernaccotax.co.in" className="underline">sukantahui@codernaccotax.co.in</a>, mobile: 7003756860) has been teaching programming for <strong>{experienceYears} years</strong> (since 1998). His expertise spans Programming Languages, RDBMS, Operating Systems, and Web Development.
            </p>
            <p className="mt-2">
              💬 “At <strong>Naihati CNAT</strong>, I show students: <code>arr[2]</code> is just a convenient way to write <code>*(arr+2)</code>. Once they understand that, pointer arithmetic becomes intuitive. I also warn them: <code>arr</code> is like a street address – you can't change it, but you can walk along it.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> The equivalence between arrays and pointers is fundamental in C. Mastering pointer arithmetic opens the door to dynamic memory and low‑level programming.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic7;