import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import travDemoCode from "./topic8_files/ArrayTraversalStandardAndReverseDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowTraversal {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-tr {
            animation: glowTraversal 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Traversing Arrays: Standard Forward Loops &amp; Reverse Traversal
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master linear array traversal techniques in Java (JLS §14.14): standard forward scanning (<code className="text-emerald-400 font-mono">0 to length - 1</code>), reverse chronological processing (<code className="text-sky-300 font-mono">length - 1 down to 0</code>), step-skipping loops, two-pointer in-place array reversal, and student fee auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Forward, Reverse &amp; In-Place Two-Pointer Iteration
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Array traversal is the systematic processing of every element in the array:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-emerald-400 font-mono">Forward Traversal:</strong> Iterates <code className="text-emerald-400 font-mono">for (int i = 0; i &lt; arr.length; i++)</code> for accumulation and in-place updates.
            </li>
            <li>
              <strong className="text-sky-300 font-mono">Reverse Traversal:</strong> Iterates <code className="text-sky-300 font-mono">for (int i = arr.length - 1; i &gt;= 0; i--)</code> for latest-first auditing.
            </li>
            <li>
              <strong className="text-purple-300 font-mono">Two-Pointer In-Place Reversal:</strong> Swaps <code className="text-purple-300 font-mono">left</code> and <code className="text-purple-300 font-mono">right</code> pointers moving toward the center in <code className="text-emerald-400 font-mono">O(N)</code> time and <code className="text-emerald-400 font-mono">O(1)</code> space.
            </li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Fee Ledger Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, <strong>Debangshu</strong>, and <strong>Pritam</strong> recorded tuition fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹20,000</code>). Forward traversal computed the total batch revenue (₹79,000), while reverse traversal displayed latest enrollments first across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Forward, Reverse &amp; Two-Pointer Convergence
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How index pointers traverse and reverse arrays in memory:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Traversal Engine Diagram"
          >
            <defs>
              <linearGradient id="gradFwd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradRev" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradTwoPtr" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Forward Traversal */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradFwd)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Forward Traversal</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">for (int i=0; i&lt;len; i++)</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">0 &rarr; 1 &rarr; 2 &rarr; 3 &rarr; 4</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Chronological &amp; Accumulation</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Sequential Left-to-Right
            </text>

            {/* Box 2: Reverse Traversal */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradRev)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Reverse Traversal</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">for (i=len-1; i&gt;=0; i--)</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">4 &rarr; 3 &rarr; 2 &rarr; 1 &rarr; 0</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Latest-First (LIFO Audits)</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Sequential Right-to-Left
            </text>

            {/* Box 3: Two-Pointer Convergence */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradTwoPtr)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Two-Pointer Reversal</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">left=0 &rarr; &larr; right=len-1</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">swap(a[left++], a[right--])</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">O(N) Time | O(1) Memory</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              In-Place Array Inversion
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.14: Index-based loops allow linear traversal, in-place element mutations, and two-pointer memory algorithms.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Traversal Patterns &amp; Use Cases
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Pattern Name</th>
                <th className="p-3 font-semibold text-emerald-400">Loop Header Syntax</th>
                <th className="p-3 font-semibold text-purple-400">Typical Use Case</th>
                <th className="p-3 font-semibold text-amber-400">Time &amp; Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-400 font-bold">Standard Forward</td>
                <td className="p-3 text-slate-300">`for (int i=0; i&lt;arr.length; i++)`</td>
                <td className="p-3 text-sky-300 font-sans">Accumulation, searching, in-place mutation</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N)$ Time, $O(1)$ Space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-400 font-bold">Reverse Traversal</td>
                <td className="p-3 text-slate-300">`for (int i=arr.length-1; i&gt;=0; i--)`</td>
                <td className="p-3 text-sky-300 font-sans">LIFO processing, right-shifting elements</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N)$ Time, $O(1)$ Space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-400 font-bold">Step-Skipping</td>
                <td className="p-3 text-slate-300">`for (int i=0; i&lt;arr.length; i+=2)`</td>
                <td className="p-3 text-sky-300 font-sans">Even/Odd position sampling</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N/2)$ Time, $O(1)$ Space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-400 font-bold">Two-Pointer In-Place</td>
                <td className="p-3 text-slate-300">`while (left &lt; right)`</td>
                <td className="p-3 text-sky-300 font-sans">Array reversal, palindrome checking</td>
                <td className="p-3 text-emerald-400 font-bold">$O(N)$ Time, $O(1)$ Space</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            ArrayTraversalStandardAndReverseDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program demonstrates chronological forward accumulation, reverse latest-first traversal, step-skipping, and two-pointer in-place reversal in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={travDemoCode}
          title="ArrayTraversalStandardAndReverseDemo.java"
          highlightLines={[25, 26, 33, 40, 48, 49, 50, 51, 52, 53]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Starting Reverse Loops at `arr.length`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int i = arr.length; i &gt;= 0; i--)</code> crashes on the first iteration with <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>! Always initialize with <code className="text-emerald-400 font-mono">int i = arr.length - 1;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Two-Pointer In-Place Reversal to Save Memory
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Avoid allocating a new auxiliary array (<code className="text-rose-300 font-mono">new int[arr.length]</code>) just to reverse elements. Two-pointer convergence reverses elements in-place with zero memory allocation overhead ($O(1)$ space).
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Why does two-pointer array reversal stop at `while (left &lt; right)` instead of `while (left &lt;= right)`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Redundant Middle Self-Swap! When <code className="text-sky-300 font-mono">left == right</code> (at the exact middle element of an odd-length array), swapping an element with itself (<code className="text-slate-300 font-mono">arr[mid] = arr[mid]</code>) performs a useless write instruction. Stopping at <code className="text-emerald-400 font-bold">left &lt; right</code> is cleaner and faster!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Traversal FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 8: Array Traversal (Forward & Reverse)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic8_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, Debangshu, and Pritam: Array traversal is the heartbeat of all data processing. Master forward accumulation, reverse latest-first scans, and two-pointer in-place reversals! In Topic 9, we master the Enhanced For-Each Loop and its read-only limitations! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
