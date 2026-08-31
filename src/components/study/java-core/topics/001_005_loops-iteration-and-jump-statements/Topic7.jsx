import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import forEachDemoCode from "./topic7_files/EnhancedForEachLoopDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowForEach {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-fe {
            animation: glowForEach 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Enhanced <code className="text-emerald-400">&apos;for-each&apos;</code> Loop: Iterating Sequences &amp; Arrays
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master index-free sequence iteration in Java (JLS §14.14.2, Java 5+): array and Iterable traversal, compiler bytecode desugaring (Iterator vs cached indexed loops), the read-only modification trap, and student scholarship honors auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Clean, Index-Free Iteration
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Introduced in Java 5, the <strong>Enhanced <code className="text-emerald-400 font-mono">for-each</code> loop</strong> provides clean, self-documenting syntax for traversing arrays and <code className="text-purple-300 font-mono">Iterable</code> collections without index management:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            for ( Student s : honorsCandidates ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;System.out.printf(&quot;Student: %s | Fee: ₹%,.2f%n&quot;, s.name(), s.tuitionFee());
            <br />
            &#125;
          </p>
          <p>
            <strong>Under the Hood:</strong> For arrays, the Java compiler transforms the code into an optimized indexed loop with length caching. For collections, it transforms into an <code className="text-purple-300 font-mono">Iterator&lt;T&gt;</code> loop calling <code className="text-sky-300 font-mono">hasNext()</code> and <code className="text-sky-300 font-mono">next()</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Honors Scholarship Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> processed honors scholarship awards in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By traversing the candidate record list directly with <code className="text-emerald-400 font-mono">for (Student s : list)</code>, <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated all index variables and bounds checking traps across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Enhanced &apos;for-each&apos; Compiler Transformation Engine
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the Java compiler transforms for-each loops on arrays vs. collections under the hood:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="For Each Compiler Transformation Diagram"
          >
            <defs>
              <linearGradient id="gradSourceForEach" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradArrayTransform" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradCollectionTransform" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Java Source Code */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradSourceForEach)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Java Source Code</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">for (T item : seq) &#123;</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;process(item);</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">&#125; // Clean &amp; readable</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Syntactic Sugar
            </text>

            {/* Box 2: Array Desugaring */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradArrayTransform)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Array Transformation</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="10" fontFamily="monospace">int len = arr.length;</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="10" fontFamily="monospace">for (int i=0; i&lt;len; i++)</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">T item = arr[i];</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Indexed Loop (Cached Length)
            </text>

            {/* Box 3: Collection Desugaring */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradCollectionTransform)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Collection Transformation</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Iterator&lt;T&gt; it = c.iterator();</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="10" fontFamily="monospace">while (it.hasNext()) &#123;</text>
            <text x="615" y="142" fill="#ede9fe" fontSize="10">T item = it.next(); &#125;</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Iterator Interface Pipeline
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.14.2: for-each automatically generates optimized indexed loops for arrays and Iterator pipelines for collections.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Enhanced &apos;for-each&apos; vs. Traditional Indexed &apos;for&apos;
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Dimension</th>
                <th className="p-3 font-semibold text-emerald-400">Enhanced `for-each` Loop</th>
                <th className="p-3 font-semibold text-purple-400">Traditional Indexed `for` Loop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Readability</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">Extremely high (Zero boilerplate)</td>
                <td className="p-3 text-xs">Moderate (Requires counter management)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Modifying Array Elements</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ IMPOSSIBLE (Read-only copy)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ YES (`arr[i] = newVal`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Index Access</td>
                <td className="p-3 text-xs text-rose-400">No index available</td>
                <td className="p-3 text-xs text-emerald-400">Direct integer index `i`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Traversal Direction</td>
                <td className="p-3 text-xs">Forward-only</td>
                <td className="p-3 text-xs text-emerald-400">Forward, backward (`i--`), custom steps (`i += 2`)</td>
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
            EnhancedForEachLoopDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates array and collection traversal, record filtering, and the read-only modification trap in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={forEachDemoCode}
          title="EnhancedForEachLoopDemo.java"
          highlightLines={[25, 26, 38, 39, 48, 49]}
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
              <span>❌</span> Pitfall 1: Reassigning the Loop Variable Expecting Array Mutation
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int score : scores) score += 10;</code> mutates only the local copy <code className="text-slate-300 font-mono">score</code>; the original <code className="text-rose-300 font-mono">scores[i]</code> array elements remain completely unmodified!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Prefer `for-each` Everywhere by Default (Effective Java Item 58)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use enhanced <code className="text-emerald-400 font-mono">for-each</code> loops for all read-only traversals to eliminate boundary mistakes and off-by-one errors.
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
            🤔 <em>&ldquo;Why does calling `list.remove(item)` inside a for-each loop throw `ConcurrentModificationException`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> ModCount Consistency! Under the hood, the compiler creates an <code className="text-purple-300 font-mono">Iterator</code>. The <code className="text-purple-300 font-mono">Iterator</code> tracks the collection&apos;s internal <code className="text-sky-300 font-mono">modCount</code>. When you call <code className="text-rose-300 font-mono">list.remove()</code> directly instead of <code className="text-emerald-300 font-mono">iterator.remove()</code>, the <code className="text-sky-300 font-mono">modCount</code> changes unexpectedly, causing the iterator to fail-fast on its next check!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Enhanced 'for-each' Loop FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 7: Enhanced 'for-each' Loop"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic7_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The enhanced for-each loop is your best friend for clean, read-only data processing. Remember the read-only rule: reassigning the loop variable does not modify the underlying array! In Topic 8, we explore Infinite Loops: legitimate use cases and accidental causes! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
