import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic1_files/example1.c?raw";
import example2 from "./topic1_files/example2.c?raw";
import example3 from "./topic1_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic1 = () => {
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
            Topic 1: Array memory model and contiguous memory concept
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How arrays are stored in memory – one element right after another – and why that matters for performance.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">📦 What does “contiguous” mean?</h2>
          <p className="leading-relaxed">
            When you declare an array in C, the compiler reserves a block of memory large enough to hold all its elements. These elements are placed in <strong>consecutive memory locations</strong> – that is, one after another without gaps. This layout is called <em>contiguous memory allocation</em>.
          </p>
          <p className="leading-relaxed mt-4">
            If you know the address of the first element (<code>&arr[0]</code>), you can find the address of any other element by adding the index multiplied by the size of each element. This is why array access is so fast: <code>arr[i]</code> is just <code>base_address + i * element_size</code>.
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              Think of a row of lockers in the <strong>Barrackpore CNAT</strong> corridor. If locker #0 is at the start of the row, locker #1 is immediately next to it, locker #2 next to that, and so on. To find locker #5, you just walk past 5 lockers from the start – you don't need a map.
            </p>
          </div>
        </section>

        {/* SVG Illustration: memory addresses */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🧠 Memory layout of an array</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="500" height="180" viewBox="0 0 500 180" className="max-w-full h-auto">
              {/* Memory cells with addresses */}
              {[0,1,2,3,4].map((i) => {
                const baseAddr = 0x7ffe20; // example base address
                const addr = baseAddr + i * 4; // assume int is 4 bytes
                return (
                  <g key={i} className="transition-all duration-300 hover:opacity-80">
                    <rect
                      x={40 + i*80}
                      y="30"
                      width="70"
                      height="60"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      rx="4"
                    />
                    <text
                      x={40 + i*80 + 35}
                      y="65"
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-sm font-mono"
                    >
                      {i === 0 ? '89' : i === 1 ? '72' : i === 2 ? '94' : i === 3 ? '68' : '77'}
                    </text>
                    <text
                      x={40 + i*80 + 35}
                      y="110"
                      textAnchor="middle"
                      fill="#6b7280"
                      className="text-xs font-mono"
                    >
                      0x{addr.toString(16)}
                    </text>
                    <text
                      x={40 + i*80 + 35}
                      y="130"
                      textAnchor="middle"
                      fill="#6b7280"
                      className="text-xs"
                    >
                      [index {i}]
                    </text>
                  </g>
                );
              })}
              {/* Arrow showing contiguousness */}
              <line x1="75" y1="20" x2="415" y2="20" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
              <text x="200" y="15" fill="#ef4444" className="text-xs">contiguous memory</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Each element occupies its own memory address; addresses increase by the size of the data type (here 4 bytes for int).
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Exploring memory addresses in C</h2>

          <EditableCCodeBlock
            title="Example 1: Printing addresses of array elements"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Notice how the addresses are equally spaced – the gap is exactly <code>sizeof(int)</code> (usually 4 bytes).
          </p>

          <EditableCCodeBlock
            title="Example 2: Pointer arithmetic"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Array name as a pointer"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Use <code>%p</code> to print pointers</strong> – it formats addresses in a readable way (usually hexadecimal). Cast to <code>(void*)</code> to be safe.</li>
            <li><strong>Remember that <code>arr + i</code> is the same as <code>&arr[i]</code></strong> – both give the address of the i‑th element.</li>
            <li><strong><code>sizeof(arr) / sizeof(arr[0])</code> works only in the scope where <code>arr</code> was declared</strong> – once passed to a function, it decays to a pointer and this trick fails.</li>
            <li><strong>Contiguous layout means cache‑friendly</strong> – iterating sequentially over an array is extremely fast because the CPU prefetches consecutive memory.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Confusing pointer arithmetic with integer arithmetic</p>
              <p className="text-sm"><code>arr + 1</code> increments by the size of the element, not by 1 byte. This is automatic, but beginners sometimes try to manually add bytes.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Assuming arrays are stored with gaps</p>
              <p className="text-sm">Some think elements might be separated by extra bytes – but in C, arrays are strictly contiguous with no padding between elements.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Misusing <code>&arr</code> vs <code>arr</code></p>
              <p className="text-sm"><code>&arr</code> gives the address of the entire array (type <code>int (*)[5]</code>), while <code>arr</code> decays to pointer to first element. Their values may be the same but types differ.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use array indexing <code>arr[i]</code> for readability; use pointer arithmetic only when you need to manipulate pointers directly.</li>
            <li>When printing addresses, always cast to <code>(void*)</code> to match <code>%p</code> format specifier.</li>
            <li>If you need the number of elements in a function, pass the size as a separate parameter – don't rely on <code>sizeof</code> inside the function.</li>
            <li>Document any pointer arithmetic with comments, as it can be less obvious than indexing.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Array elements are stored contiguously in memory.</li>
            <li>✔️ Address of <code>arr[i]</code> = base address + i * element_size.</li>
            <li>✔️ <code>arr + i</code> equals <code>&arr[i]</code>.</li>
            <li>✔️ Pointer arithmetic automatically scales by element size.</li>
            <li>✔️ Use <code>%p</code> to print addresses.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “When you see <code>arr[3]</code>, the computer translates it to <code>*(arr + 3)</code>. Try writing both forms in your code – they produce identical machine instructions.”
          </p>
          <p className="italic mt-2">
            Observe carefully: In Example 2, why does <code>ptr + 2</code> give the address of the third element, not the second? Because starting from <code>ptr = &arr[0]</code>, adding 2 moves forward by 2 elements.
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
              💬 “At <strong>Naihati CNAT</strong>, I draw a long rectangle on the board and divide it into small boxes. I label the first box with address 1000, the next 1004, 1008, etc. Students immediately see the pattern – <em>the addresses jump by the size of the data type</em>. This visual sticks.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> The array's name <code>arr</code> is not a variable; you cannot do <code>arr++</code>. It's a constant pointer to the first element. However, you can assign another pointer and increment that.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic1;