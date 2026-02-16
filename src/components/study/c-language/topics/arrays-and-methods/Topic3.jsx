import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic3_files/example1.c?raw";
import example2 from "./topic3_files/example2.c?raw";
import example3 from "./topic3_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic3 = () => {
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
            Topic 3: Common operations on one‑dimensional arrays (search, insert, delete)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How to find an element, add a new one, or remove an existing one – and why these operations behave differently than on lists.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">🔍 Operations on arrays</h2>
          <p className="leading-relaxed">
            Because arrays occupy a fixed block of contiguous memory, insertions and deletions are not as simple as in higher‑level data structures. You cannot just “add” or “remove” a slot – you must shift elements to maintain contiguity.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li><strong>Search</strong> – traverse the array and compare each element (linear search). If sorted, binary search is faster (but that’s a future topic).</li>
            <li><strong>Insert</strong> – to insert at position <code>p</code>, shift all elements from <code>p</code> to <code>size-1</code> one step to the right, then place the new value. This requires enough capacity (the array must be declared larger than current size).</li>
            <li><strong>Delete</strong> – to delete at position <code>p</code>, shift all elements from <code>p+1</code> to <code>size-1</code> one step to the left. The last slot becomes unused (but still exists).</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, students sit in a row of fixed chairs. If a new student (Abhronila) joins and must sit between Debangshu and Ritaja, everyone from that point must move one chair right. If someone leaves, the rest shuffle left. That’s exactly how array insert/delete work.
            </p>
          </div>
        </section>

        {/* SVG Illustration: shifting elements */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🔄 Shifting elements for insert/delete</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="480" height="200" viewBox="0 0 480 200" className="max-w-full h-auto">
              {/* Before insertion */}
              <text x="30" y="30" className="text-sm font-medium">Before insert at index 2:</text>
              {[0,1,2,3].map((i) => (
                <g key={`before-${i}`}>
                  <rect x={30 + i*60} y="40" width="50" height="40" fill="none" stroke="#3b82f6" strokeWidth="2" rx="2" />
                  <text x={30 + i*60 + 25} y="65" textAnchor="middle" fill="currentColor">{i===0?'A':i===1?'B':i===2?'C':i===3?'D':''}</text>
                </g>
              ))}
              {/* After insertion */}
              <text x="30" y="110" className="text-sm font-medium">After insert 'X' at index 2:</text>
              {[0,1,2,3,4].map((i) => (
                <g key={`after-${i}`}>
                  <rect x={30 + i*48} y="120" width="40" height="40" fill="none" stroke="#10b981" strokeWidth="2" rx="2" />
                  <text x={30 + i*48 + 20} y="145" textAnchor="middle" fill="currentColor" fontSize="12">
                    {i===0?'A':i===1?'B':i===2?'X':i===3?'C':i===4?'D':''}
                  </text>
                </g>
              ))}
              {/* Arrows showing shift */}
              <line x1="140" y1="110" x2="110" y2="130" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="200" y1="110" x2="160" y2="130" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Inserting at index 2 shifts C and D to the right; deleting would shift them left.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Implementing operations</h2>

          <EditableCCodeBlock
            title="Example 1: Linear search"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Returns the first index where the value is found, or -1 if not present.
          </p>

          <EditableCCodeBlock
            title="Example 2: Insert at a given position"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Delete at a given position"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Always check if the array has capacity before insert</strong> – otherwise you’ll overflow.</li>
            <li><strong>For search, return early when found</strong> – no need to continue after finding the element.</li>
            <li><strong>Use <code>memmove</code> for shifting</strong> – it handles overlapping memory correctly and is optimized. But for learning, manual loops are fine.</li>
            <li><strong>Keep track of the current number of elements separately from array size</strong> – a variable <code>n</code> that changes during insert/delete.</li>
            <li><strong>When deleting, you don’t need to “erase” the last element</strong> – just reduce <code>n</code>; the old value is ignored.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Forgetting to shift in the correct direction</p>
              <p className="text-sm">Insert: shift right starting from the end. Delete: shift left starting from the deletion point. Reversing the loop direction leads to overwriting.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Not updating the size variable</p>
              <p className="text-sm">After insert, <code>n</code> must increase; after delete, <code>n</code> must decrease. Forgetting this breaks later operations.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Assuming array indices start at 1 in shift loops</p>
              <p className="text-sm">When shifting from position p, the loop must go from p to n-1 (or n-2) correctly.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Encapsulate each operation in a function – this makes the code reusable and easier to test.</li>
            <li>Pass both the array and the current size (and capacity for insert) to functions.</li>
            <li>Validate indices: <code>if (pos &lt; 0 || pos &gt;= n) return error;</code> and for insert also check <code>n &lt; capacity</code>.</li>
            <li>Use meaningful variable names: <code>current_size</code>, <code>capacity</code>, <code>position</code>.</li>
            <li>Consider returning a status code (success/failure) instead of modifying a global variable.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Search: linear scan – O(n) time.</li>
            <li>✔️ Insert: shift right from end to position – O(n).</li>
            <li>✔️ Delete: shift left from position+1 to end – O(n).</li>
            <li>✔️ Always maintain a separate size variable.</li>
            <li>✔️ Check bounds and capacity before operations.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “When you insert at position 2, why must you shift from the last element backwards? Try shifting forward from position 2 and see what happens to the element at position 3.”
          </p>
          <p className="italic mt-2">
            In Example 2, modify the loop direction to <code>for (int i = pos; i &lt; n; i++)</code> and observe the result.
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
              💬 “At <strong>Naihati CNAT</strong>, I use a physical strip of paper with boxes drawn on it. To insert a new box in the middle, we cut and slide – that’s exactly what the computer does. Students remember the ‘paper cutting’ analogy forever.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> Insert and delete are expensive for arrays because they require shifting many elements. That’s why other structures (linked lists) exist. But for small arrays or when order matters, shifting is fine.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic3;