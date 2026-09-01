import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic6_files/example1.c?raw";
import example2 from "./topic6_files/example2.c?raw";
import example3 from "./topic6_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic6 = () => {
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
            Topic 6: Passing arrays to functions (call by reference behavior in C)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How arrays behave when passed to functions – and why you can modify them inside the function.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">📦 Array parameters are pointers</h2>
          <p className="leading-relaxed">
            In C, when you pass an array to a function, it <strong>decays to a pointer</strong> to its first element. The function receives a copy of that pointer, not a copy of the whole array. This is often called “pass by reference” behavior because through the pointer, the function can modify the original array elements.
          </p>
          <p className="leading-relaxed mt-4">
            The function parameter can be written as <code>int arr[]</code> or <code>int *arr</code> – they are equivalent. However, the size information is lost; inside the function, <code>sizeof(arr)</code> gives the size of the pointer, not the array. Therefore, you must pass the size separately.
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, teacher Sukanta Hui gives Tuhina the address of the class register (pointer). Tuhina can go and update marks directly. If Sukanta had given her a photocopy (pass by value), changes wouldn't affect the original. Arrays use the address model.
            </p>
          </div>
        </section>

        {/* SVG Illustration: pointer decay */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🧠 Array decay visualization</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="450" height="150" viewBox="0 0 450 150" className="max-w-full h-auto">
              {/* Original array in main */}
              <rect x="40" y="20" width="200" height="40" fill="none" stroke="#3b82f6" strokeWidth="2" rx="2" />
              <text x="60" y="45" fill="currentColor">arr in main: [10,20,30,40]</text>
              
              {/* Pointer being passed */}
              <line x1="140" y1="60" x2="140" y2="90" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <circle cx="140" cy="100" r="15" fill="none" stroke="#ef4444" strokeWidth="2" />
              <text x="140" y="105" textAnchor="middle" fill="#ef4444" fontSize="12">ptr</text>
              
              {/* Function parameter receives pointer */}
              <rect x="100" y="110" width="150" height="40" fill="none" stroke="#10b981" strokeWidth="2" rx="2" />
              <text x="125" y="135" fill="#10b981">func(int *arr)</text>
              
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            The function receives a pointer to the first element – no array copy is made.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Passing arrays in C</h2>

          <EditableCCodeBlock
            title="Example 1: Modifying array inside function"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            The change inside <code>doubleElements</code> affects the original array.
          </p>

          <EditableCCodeBlock
            title="Example 2: Passing size explicitly"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Using const for read‑only arrays"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Always pass the array size as a separate parameter</strong> – don't rely on a global constant or sentinel values.</li>
            <li><strong>Use <code>const</code> for input arrays</strong> – if the function shouldn't modify the array, declare parameter as <code>const int arr[]</code>. This catches accidental modifications.</li>
            <li><strong>Prefer <code>int arr[]</code> syntax for readability</strong> when the parameter is intended to be an array, even though it's a pointer.</li>
            <li><strong>Remember that <code>sizeof(arr)</code> inside function gives pointer size</strong> – common mistake; always use passed size.</li>
            <li><strong>For multidimensional arrays, all but the first dimension must be specified</strong> (covered in later topics).</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Using <code>sizeof(arr)</code> inside function to get array length</p>
              <p className="text-sm"><code>sizeof(arr)</code> returns size of pointer (typically 8 bytes), not the array. This leads to incorrect loop bounds.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Assuming array is passed by value (copied)</p>
              <p className="text-sm">Some beginners think the function gets its own copy; they're surprised when modifications affect the original.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Forgetting to pass size, and using a sentinel (like -1) to mark end</p>
              <p className="text-sm">That works for strings (null terminator) but not for general arrays of numbers where -1 could be valid data.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Declare functions that process arrays with parameters: <code>void process(int arr[], size_t n)</code>.</li>
            <li>If the function does not modify the array, add <code>const</code>: <code>void print(const int arr[], size_t n)</code>.</li>
            <li>Document whether the function expects a valid array and what the size means.</li>
            <li>When passing part of an array, use pointer arithmetic: <code>process(&arr[start], count)</code>.</li>
            <li>In the function body, use the passed size for loops, not <code>sizeof</code>.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Arrays decay to pointers when passed to functions.</li>
            <li>✔️ Inside function, <code>sizeof(arr)</code> gives pointer size, not array size.</li>
            <li>✔️ Always pass the array size explicitly.</li>
            <li>✔️ Use <code>const</code> for read‑only arrays.</li>
            <li>✔️ Modifications inside function affect the original array.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “If you declare <code>void func(int arr[])</code>, try printing <code>sizeof(arr)</code> inside. Compare it with <code>sizeof</code> in main. The difference shows the decay.”
          </p>
          <p className="italic mt-2">
            What happens if you pass <code>&arr[2]</code> to a function expecting an array? (Hint: it's still a pointer, but now it points to the third element.)
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
              💬 “At <strong>Naihati CNAT</strong>, I hold up a sheet of paper with numbers and say: ‘If I give this sheet to Debangshu and ask him to double the numbers, he’ll write on the same sheet. That’s pass‑by‑reference. If I give him a photocopy, changes stay on the copy – that’s pass‑by‑value. Arrays use the first model.’”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> The array name is not a variable you can assign to, but the pointer parameter is – you can do <code>arr++</code> inside the function. That’s another clue it's a pointer.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic6;