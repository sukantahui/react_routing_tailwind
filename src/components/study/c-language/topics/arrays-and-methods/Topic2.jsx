import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic2_files/example1.c?raw";
import example2 from "./topic2_files/example2.c?raw";
import example3 from "./topic2_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic2 = () => {
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
            Topic 2: Understanding zero-based indexing and bounds safety
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            Why arrays start at index 0, and how to stay within safe boundaries.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">🔢 Zero-based indexing: why 0?</h2>
          <p className="leading-relaxed">
            In C, array indices start at 0 because of how arrays map to memory. The name of an array (<code>arr</code>) is a pointer to its first element. The expression <code>arr[i]</code> is defined as <code>*(arr + i)</code>. If the first element were at index 1, the compiler would have to subtract 1 for every access – inefficient. Zero-based indexing makes pointer arithmetic simple: <code>arr + i</code> points directly to the i‑th element.
          </p>
          <p className="leading-relaxed mt-4">
            <strong>Bounds safety:</strong> C does <em>not</em> check if an index is valid. Accessing <code>arr[size]</code> (one past the end) or any index outside [0, size‑1] leads to <strong>undefined behavior</strong> – your program might crash, corrupt data, or appear to work (making bugs hard to find).
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, the lockers are numbered 0,1,2,… If a student asks for locker #30 but there are only 30 lockers (indices 0‑29), the caretaker doesn't stop them – they might open a wall or another student's bag. That's what out‑of‑bounds access does to your program.
            </p>
          </div>
        </section>

        {/* SVG Illustration: valid vs out-of-bounds */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🎯 Valid indices vs out‑of‑bounds</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="450" height="150" viewBox="0 0 450 150" className="max-w-full h-auto">
              {/* Array boxes 0..4 */}
              {[0,1,2,3,4].map((i) => (
                <g key={i}>
                  <rect
                    x={30 + i*70}
                    y="30"
                    width="60"
                    height="60"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    rx="4"
                  />
                  <text
                    x={30 + i*70 + 30}
                    y="65"
                    textAnchor="middle"
                    fill="currentColor"
                  >
                    {i}
                  </text>
                  <text
                    x={30 + i*70 + 30}
                    y="100"
                    textAnchor="middle"
                    fill="#6b7280"
                    className="text-xs"
                  >
                    index {i}
                  </text>
                </g>
              ))}
              {/* Out-of-bounds marker at index 5 */}
              <rect
                x="380"
                y="30"
                width="60"
                height="60"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 4"
                rx="4"
              />
              <text x="410" y="65" textAnchor="middle" fill="#ef4444" className="text-sm">?</text>
              <text x="410" y="100" textAnchor="middle" fill="#ef4444" className="text-xs">index 5 (invalid)</text>
              <line x1="410" y1="90" x2="410" y2="110" stroke="#ef4444" strokeWidth="2" />
              <text x="200" y="140" textAnchor="middle" fill="#ef4444" className="text-xs">⚠️ out of bounds ⚠️</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Indices 0 through 4 are safe. Index 5 (size) is out‑of‑bounds – accessing it is undefined behavior.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Zero‑based indexing in action</h2>

          <EditableCCodeBlock
            title="Example 1: Correct indexing"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            The loop runs while <code>i &lt; 5</code>, never reaching index 5.
          </p>

          <EditableCCodeBlock
            title="Example 2: Out‑of‑bounds disaster"
            initialCode={example2}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            This code compiles but may crash or print garbage. <strong>Never do this!</strong>
          </p>

          <EditableCCodeBlock
            title="Example 3: Safe bounds checking"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Always use <code>size_t</code> for indices</strong> – it's unsigned and matches the type returned by <code>sizeof</code>. This avoids negative indices.</li>
            <li><strong>Loop condition: <code>i &lt; n</code> not <code>i &lt;= n</code></strong> – the last valid index is <code>n-1</code>.</li>
            <li><strong>When accepting index input, validate it</strong>: <code>if (index &gt;= 0 &amp;&amp; index &lt; size)</code> before use.</li>
            <li><strong>Use <code>assert(index &lt; size)</code> in debug builds</strong> to catch out‑of‑bounds early.</li>
            <li><strong>Remember: <code>arr[size]</code> is not part of the array</strong> – it's one past the end, but you can take its address for pointer comparisons (never dereference).</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Off‑by‑one in loops</p>
              <p className="text-sm"><code>for (i = 1; i &lt;= 5; i++)</code> when array has 5 elements – this accesses indices 1‑5, missing index 0 and going out of bounds at 5.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Assuming bounds checking</p>
              <p className="text-sm">C does not check – out‑of‑bounds access silently corrupts memory. Other languages like Java do check, but C trusts the programmer.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Using signed int for indices and accepting negative values</p>
              <p className="text-sm"><code>int i = -1; arr[i];</code> – also undefined behavior. Use <code>size_t</code> to avoid negatives.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Always declare array size as a named constant (<code>#define SIZE 5</code>) and use it consistently.</li>
            <li>In functions that receive an array, also pass its size as a parameter – don't assume a global size.</li>
            <li>When iterating, prefer <code>for (size_t i = 0; i &lt; n; i++)</code>.</li>
            <li>If you need to access an element from user input, validate the index first.</li>
            <li>Use tools like Valgrind or AddressSanitizer to catch out‑of‑bounds errors during testing.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ First element index = 0, last index = size‑1.</li>
            <li>✔️ C does not check bounds – it's your responsibility.</li>
            <li>✔️ Accessing outside [0, size‑1] is undefined behavior.</li>
            <li>✔️ Loop condition: <code>i &lt; size</code> (not ≤).</li>
            <li>✔️ Validate any index from external input.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “If you have an array of 10 elements, the indices are 0–9. When you write <code>for (i = 0; i &lt;= 9; i++)</code> it works, but the professional habit is <code>i &lt; 10</code> because it directly relates to the size.”
          </p>
          <p className="italic mt-2">
            Try changing the loop in Example 2 to <code>i &lt;= 5</code> – what happens? (Run it and see the unpredictable output.)
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
              💬 “At <strong>Naihati CNAT</strong>, I ask students: <em>If I give you a row of 5 houses numbered 1 to 5, and I say 'go to house number 0', what happens?</em> They laugh and say there's no house 0. Then I explain that in C, house numbers start at 0, so the fifth house is number 4. That shift in thinking cements zero‑based indexing.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> Bounds safety is like checking both sides before crossing the road. In C, there's no traffic light – you must look yourself.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic2;