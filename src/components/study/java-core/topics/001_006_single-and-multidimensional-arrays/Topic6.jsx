import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lenDemoCode from "./topic6_files/ArrayLengthPropertyDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowLength {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ln {
            animation: glowLength 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 6
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-emerald-400 font-mono">&apos;length&apos;</code> Array Property vs. <code className="text-sky-300 font-mono">String.length()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the three size conventions in Java (JLS §10.7): array <code className="text-emerald-400 font-mono">length</code> (final field), <code className="text-sky-300 font-mono">String.length()</code> (method), <code className="text-purple-300 font-mono">Collection.size()</code> (method), multidimensional matrix row/column bounds, and examination hall capacities in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Three Size Conventions in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java distinguishes between properties, methods, and collections:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Array Property</h3>
              <p className="text-emerald-300 mb-2">int len = arr.length;</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                A <code className="text-emerald-300 font-mono">public final int</code> field in the object header. <strong>No parentheses!</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. String Method</h3>
              <p className="text-sky-300 mb-2">int len = str.length();</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                A public method that counts Unicode characters. <strong>With parentheses!</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Collection Method</h3>
              <p className="text-purple-300 mb-2">int size = list.size();</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                A public method in <code className="text-purple-300 font-mono">Collection</code> interface. <strong>With parentheses!</strong>
              </p>
            </div>
          </div>

          <p>
            <strong>2D Length Rule:</strong> In 2D arrays, <code className="text-emerald-400 font-mono">matrix.length</code> returns the number of <strong>rows</strong>, while <code className="text-sky-300 font-mono">matrix[r].length</code> returns the number of <strong>columns</strong> in row <code className="text-sky-300 font-mono">r</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Multi-Hall Exam Audits):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> inspected a 3-hall seating matrix in Indian Rupees (<code className="text-emerald-400 font-semibold">₹10,000 to ₹20,000</code>). With <strong>Abhronila</strong> and <strong>Debangshu</strong>, they verified that <code className="text-emerald-400 font-mono">labExamHalls.length = 3</code> (total halls) and iterated each hall&apos;s custom capacity (<code className="text-sky-300 font-mono">labExamHalls[r].length</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 3 Size Conventions &amp; Object Header Storage
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How array length, string length, and collection size are resolved in memory:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Length Property Diagram"
          >
            <defs>
              <linearGradient id="gradArrLen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradStrLen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradCollSize" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Array arr.length (Field) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradArrLen)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Array: &apos;arr.length&apos;</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">public final int length;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Stored in 16B Header</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">NO PARENTHESES ()</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Direct Memory Field
            </text>

            {/* Box 2: String str.length() (Method) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradStrLen)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. String: &apos;str.length()&apos;</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">public int length()</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">Method on String class</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">WITH PARENTHESES ()</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              String Method Call
            </text>

            {/* Box 3: Collection list.size() (Method) */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradCollSize)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. List: &apos;list.size()&apos;</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">public int size()</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">Collection Interface</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">WITH PARENTHESES ()</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Collection Method Call
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.7: Array length is a public final field property; String length() and Collection size() are methods.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comparison of Size Access Across Java Types
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Target Type</th>
                <th className="p-3 font-semibold text-emerald-400">Correct Syntax</th>
                <th className="p-3 font-semibold text-purple-400">Category</th>
                <th className="p-3 font-semibold text-rose-400">Common Syntax Bug</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Raw Array (`int[]`)</td>
                <td className="p-3 text-emerald-400 font-bold">`arr.length`</td>
                <td className="p-3 text-slate-300">Final Field Property</td>
                <td className="p-3 text-rose-400">`arr.length()` ❌</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">String (`java.lang.String`)</td>
                <td className="p-3 text-emerald-400 font-bold">`str.length()`</td>
                <td className="p-3 text-slate-300">Instance Method</td>
                <td className="p-3 text-rose-400">`str.length` ❌</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Collection (`List`, `Set`)</td>
                <td className="p-3 text-emerald-400 font-bold">`list.size()`</td>
                <td className="p-3 text-slate-300">Interface Method</td>
                <td className="p-3 text-rose-400">`list.length` ❌</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Map (`java.util.Map`)</td>
                <td className="p-3 text-emerald-400 font-bold">`map.size()`</td>
                <td className="p-3 text-slate-300">Interface Method</td>
                <td className="p-3 text-rose-400">`map.length()` ❌</td>
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
            ArrayLengthPropertyDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program compares array length, string length, collection size, and multidimensional row/column length inspection in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={lenDemoCode}
          title="ArrayLengthPropertyDemo.java"
          highlightLines={[25, 28, 31, 44, 48]}
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
              <span>❌</span> Pitfall 1: Writing `arr.length()` with Parentheses
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Adding parentheses to an array&apos;s length (<code className="text-rose-300 font-mono">arr.length()</code>) causes a compile error (<code className="text-rose-400 font-mono">cannot find symbol: method length()</code>). Remember: <code className="text-emerald-400 font-bold">arr.length</code> has NO parentheses!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `matrix[r].length` for Jagged Array Traversals
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In 2D matrices, never assume all rows have the same length. Always write the inner loop condition as <code className="text-emerald-400 font-mono">c &lt; matrix[r].length</code> to handle irregular/jagged rows safely.
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
            🤔 <em>&ldquo;Why is `length` stored inside the 16-byte object header rather than calculated dynamically?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Peak $O(1)$ Hardware Performance! Storing <code className="text-emerald-400 font-bold">length</code> as a pre-computed 4-byte integer in the object header allows the CPU to fetch the array size in a single L1 cache read without executing a method call or traversing elements!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array 'length' Property FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 6: The 'length' Array Property"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic6_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Remember the golden rule: arr.length has NO parentheses, str.length() HAS parentheses, and list.size() HAS parentheses! In Topic 7, we master ArrayIndexOutOfBoundsException and defensive prevention strategies! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
