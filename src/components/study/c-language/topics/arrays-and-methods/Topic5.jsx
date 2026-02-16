import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic5_files/example1.c?raw";
import example2 from "./topic5_files/example2.c?raw";
import example3 from "./topic5_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic5 = () => {
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
            Topic 5: Time complexity of array operations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How fast (or slow) array operations run, and why it matters when your data grows.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">⏱️ What is time complexity?</h2>
          <p className="leading-relaxed">
            Time complexity describes how the runtime of an algorithm grows as the input size (<code>n</code>) increases. We use <strong>Big‑O notation</strong> to express the upper bound (worst‑case). For arrays:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li><strong>Access by index</strong> – O(1): constant time, because it's just base + offset.</li>
            <li><strong>Search (unsorted)</strong> – O(n): must check each element until found (linear).</li>
            <li><strong>Insert at beginning/middle</strong> – O(n): shifting elements takes time proportional to the number of elements after the insertion point.</li>
            <li><strong>Delete at beginning/middle</strong> – O(n): shifting left is also linear.</li>
            <li><strong>Insert/delete at end (if capacity available)</strong> – O(1): no shifting.</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, finding a student by roll number (index) is instant (O(1)). Finding by name (search) might require asking each student until you find the right one – if there are 100 students, worst case you ask 100. That’s O(n).
            </p>
          </div>
        </section>

        {/* SVG Illustration: complexity graph */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">📈 Complexity growth</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="400" height="200" viewBox="0 0 400 200" className="max-w-full h-auto">
              {/* Axes */}
              <line x1="40" y1="180" x2="360" y2="180" stroke="#888" strokeWidth="1" />
              <line x1="40" y1="180" x2="40" y2="40" stroke="#888" strokeWidth="1" />
              <text x="360" y="170" fill="#888" fontSize="10">n (size)</text>
              <text x="20" y="40" fill="#888" fontSize="10" transform="rotate(-90 20,40)">time</text>
              
              {/* O(1) line */}
              <line x1="40" y1="100" x2="360" y2="100" stroke="#10b981" strokeWidth="2" />
              <text x="300" y="90" fill="#10b981" fontSize="10">O(1) access</text>
              
              {/* O(n) line */}
              <line x1="40" y1="180" x2="360" y2="40" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
              <text x="280" y="60" fill="#ef4444" fontSize="10">O(n) search/insert/delete</text>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            O(1) is flat; O(n) grows linearly. For large n, the difference is huge.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Complexity in code</h2>

          <EditableCCodeBlock
            title="Example 1: O(1) – Access by index"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            No loops, just direct calculation – time is constant regardless of array size.
          </p>

          <EditableCCodeBlock
            title="Example 2: O(n) – Linear search"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: O(n) – Insert at beginning (requires shift)"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Always consider the dominant operation</strong> – a loop inside a loop is O(n²), which can be too slow for large n.</li>
            <li><strong>When inserting/deleting many elements, consider if order matters</strong> – if not, swap with last element (O(1)) instead of shifting.</li>
            <li><strong>Use <code>sizeof</code> to compute n only once</strong> – avoid calling it repeatedly inside loops (though it's constant time anyway).</li>
            <li><strong>Big‑O ignores constants and lower terms</strong> – O(2n) is still O(n). Focus on growth rate.</li>
            <li><strong>Space complexity also matters</strong> – arrays use contiguous memory, which is cache‑friendly (good for speed).</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Assuming all operations are O(1)</p>
              <p className="text-sm">New programmers often think “array” and assume everything is fast. But inserting at the front is expensive.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Confusing best‑case with average‑case</p>
              <p className="text-sm">Linear search best case is O(1) (first element), but we usually care about worst or average.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Ignoring hidden loops (e.g., <code>strlen</code> inside loop condition)</p>
              <p className="text-sm"><code>for (i=0; i&lt;strlen(s); i++)</code> – strlen is O(n) itself, making the whole loop O(n²).</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write efficient code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>If you need frequent insertions/deletions at arbitrary positions, consider a different data structure (linked list, tree).</li>
            <li>For search in sorted arrays, use binary search (O(log n)) – but that’s a future topic.</li>
            <li>When analyzing code, count the number of operations relative to input size.</li>
            <li>Use profiling tools to verify complexity in practice for large inputs.</li>
            <li>Remember that time complexity is about growth, not absolute speed – an O(n) algorithm might be faster than an O(1) one for small n due to overhead.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Access by index: O(1).</li>
            <li>✔️ Search (unsorted): O(n).</li>
            <li>✔️ Insert/delete at arbitrary position: O(n).</li>
            <li>✔️ Insert/delete at end: O(1) if capacity allows.</li>
            <li>✔️ Always think about worst‑case growth.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “If you have to insert 1000 elements at the beginning of an array of size 1000, how many shifts occur in total? (Hint: each insertion shifts all existing elements.) That’s why arrays aren’t ideal for that use case.”
          </p>
          <p className="italic mt-2">
            Try running Example 2 with a very large array and measure the time difference between finding the first element vs the last.
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
              💬 “At <strong>Naihati CNAT</strong>, I ask: ‘If you have 1,000 books on a shelf and I ask for the 5th book, how long does it take? Same as if you had 1,000,000 books – you just count to 5. That’s O(1). But if I ask you to find a book by title, you might have to scan all of them – that’s O(n).’”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> Complexity analysis is about scalability. An algorithm that’s fine for 100 items might be unusable for 1,000,000. Always design with the expected data size in mind.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic5;