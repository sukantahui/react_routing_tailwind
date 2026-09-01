import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic4_files/example1.c?raw";
import example2 from "./topic4_files/example2.c?raw";
import example3 from "./topic4_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic4 = () => {
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
            Topic 4: Loop patterns for processing arrays (forward, reverse, nested loops)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            Mastering the three fundamental loop patterns that let you traverse, manipulate, and analyze arrays effectively.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">🔄 Three essential loop patterns</h2>
          <p className="leading-relaxed">
            Arrays are processed by iterating over their indices. The pattern you choose depends on the task:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li><strong>Forward traversal</strong> – from first to last element (increasing index). Used for summing, searching, printing, etc.</li>
            <li><strong>Reverse traversal</strong> – from last to first (decreasing index). Useful when you need to process elements in reverse order, or when shifting elements during insertion/deletion.</li>
            <li><strong>Nested loops</strong> – a loop inside another loop. Used for comparing each element with others, working with 2D structures (like matrices), or generating combinations.</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, if teacher Sukanta Hui wants to call students by roll number: forward (1 to N), reverse (N to 1), or nested (pair each student with every other for a group activity). Each pattern has its purpose.
            </p>
          </div>
        </section>

        {/* SVG Illustration: loop directions */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🧭 Visualizing loop directions</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="400" height="180" viewBox="0 0 400 180" className="max-w-full h-auto">
              {/* Array boxes */}
              {[0,1,2,3,4].map((i) => (
                <rect key={i} x={40 + i*60} y="30" width="50" height="40" fill="none" stroke="#3b82f6" strokeWidth="2" rx="2" />
              ))}
              {/* Forward arrow */}
              <line x1="45" y1="80" x2="290" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowFwd)" />
              <text x="150" y="100" fill="#10b981" className="text-xs">forward</text>
              {/* Reverse arrow */}
              <line x1="290" y1="120" x2="45" y2="120" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRev)" />
              <text x="150" y="140" fill="#ef4444" className="text-xs">reverse</text>
              {/* Nested loops: two indices */}
              <text x="150" y="170" fill="#8b5cf6" className="text-xs">nested: i and j</text>
              <defs>
                <marker id="arrowFwd" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#10b981" />
                </marker>
                <marker id="arrowRev" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Forward: 0→4, Reverse: 4→0. Nested loops explore pairs (i,j).
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Loop patterns in C</h2>

          <EditableCCodeBlock
            title="Example 1: Forward traversal (sum and print)"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            The classic <code>for (i = 0; i &lt; n; i++)</code> loop.
          </p>

          <EditableCCodeBlock
            title="Example 2: Reverse traversal (print backwards)"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Nested loops – find duplicate values"
            initialCode={example3}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Nested loops compare each element with every later element (O(n²) time).
          </p>
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Forward loops are the default</strong> – they read naturally and are cache‑friendly.</li>
            <li><strong>Reverse loops often use <code>i--</code></strong> – but be careful with unsigned indices (use <code>i &gt; 0</code> and then subtract).</li>
            <li><strong>For nested loops, keep variable names clear</strong> – <code>i</code> for outer, <code>j</code> for inner. Avoid reusing the same name.</li>
            <li><strong>Optimize inner loop bounds</strong> – if comparing pairs, start <code>j = i+1</code> to avoid duplicate comparisons and self‑comparison.</li>
            <li><strong>When processing 2D arrays mentally, think rows (outer) and columns (inner).</strong></li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Off‑by‑one in reverse loops</p>
              <p className="text-sm"><code>for (i = n; i &gt;= 0; i--)</code> – when i = n, it's out of bounds. Correct: <code>i = n-1; i &gt;= 0; i--</code>.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Using <code>size_t</code> (unsigned) in reverse loops</p>
              <p className="text-sm"><code>for (size_t i = n-1; i &gt;= 0; i--)</code> – when i becomes 0 and decrements, it wraps to a huge value, causing infinite loop. Solution: use signed or different condition.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Nested loop inefficiency</p>
              <p className="text-sm">Comparing every element with every other (including itself) wastes time. Always think: do I need j from 0 or from i+1?</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use meaningful loop variable names when nested loops are complex (e.g., <code>row</code>, <code>col</code>).</li>
            <li>Keep loop bodies short – if they grow long, extract into a function.</li>
            <li>Prefer <code>for</code> loops for counting iterations; they clearly separate initialization, condition, and increment.</li>
            <li>When processing arrays in reverse with <code>size_t</code>, use a common pattern: <code>size_t i = n; while (i-- &gt; 0) { /* use arr[i] */ }</code>.</li>
            <li>Comment non‑obvious loop patterns, especially nested ones.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Forward: start = 0, condition i &lt; n, increment i++.</li>
            <li>✔️ Reverse: start = n-1, condition i &gt;= 0, decrement i--.</li>
            <li>✔️ Nested: outer loop controls one dimension, inner loop another.</li>
            <li>✔️ Avoid off‑by‑one errors.</li>
            <li>✔️ Consider unsigned pitfalls in reverse.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “When you write a nested loop, ask: what is the relationship between i and j? In Example 3, why do we start j from i+1? Try changing it to j=0 and see what happens (duplicate reports and self‑comparisons).”
          </p>
          <p className="italic mt-2">
            For reverse loops, if you use <code>size_t</code>, try the <code>while (i-- &gt; 0)</code> trick – it's concise and safe.
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
              💬 “At <strong>Naihati CNAT</strong>, I tell students: loops are your array’s best friend. Forward is like reading a book from page 1 to end. Reverse is like skimming backwards. Nested loops? That's like comparing every student's answer with every other – useful for finding matches, but expensive if overused.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> Always double‑check your loop bounds – a single off‑by‑one error can hide in your code for hours. Use the <code>size_t</code> reverse pattern with confidence.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic4;