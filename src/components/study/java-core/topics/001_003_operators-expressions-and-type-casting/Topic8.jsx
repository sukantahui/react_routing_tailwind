import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import equalityDemoCode from "./topic8_files/EqualityCheckPrimitivesVsObjectsDemo.java?raw";
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
          @keyframes glowEquality {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(14, 165, 233, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-equality {
            animation: glowEquality 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Equality Check: Primitive <code className="text-sky-400">==</code> vs. Object Reference Comparison &amp; <code className="text-emerald-400">.equals()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the architectural distinction between stack bit comparison and heap address identity: why <code className="text-sky-300 font-mono">==</code> compares values on primitives but memory pointers on objects, String Constant Pool interning, the dangerous <code className="text-rose-400 font-mono">Integer</code> cache trap (<code className="text-rose-400 font-mono">200 == 200</code> is false!), null-safe comparisons, and student verification in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Stack Memory Bits vs. Heap Reference Addresses
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, the <code className="text-sky-300 font-mono">==</code> operator behaves differently based on whether the operands are <strong>Primitive types</strong> or <strong>Reference types (Objects)</strong>:
          </p>
          <p>
            <strong>Primitive <code className="text-sky-300 font-mono">==</code>:</strong> Compares the literal binary bit values stored directly on the current Thread Stack frame (e.g. <code className="text-emerald-300 font-mono">15000 == 15000</code>).
            <br />
            <strong>Object <code className="text-rose-300 font-mono">==</code>:</strong> Compares the 32/64-bit Heap memory address stored in the reference variable (Reference Identity), checking whether both variables point to the exact same object in Heap memory.
            <br />
            <strong>Object <code className="text-emerald-300 font-mono">.equals()</code>:</strong> Compares the logical state and internal contents of the objects when properly overridden.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Admission Identity):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> created a student enrollment verification engine. By overriding <code className="text-emerald-300 font-mono">equals()</code> and <code className="text-emerald-300 font-mono">hashCode()</code> in the <code className="text-sky-300 font-mono">Student</code> class, <strong>Abhronila</strong> and <strong>Debangshu</strong> detected duplicate student registrations across Naihati and Shyamnagar by matching roll numbers and course fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) rather than comparing volatile heap memory addresses.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Primitive Stack Comparison vs. Object Heap Reference Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How stack bit comparison differs from heap address pointers and the String Pool:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Primitive Equality vs Object Reference Comparison Diagram"
          >
            <defs>
              <linearGradient id="gradPrimEq" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradHeapEq" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradCacheTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Primitive Value (==) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradPrimEq)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Primitives (Stack)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int a = 15000;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int b = 15000;</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">a == b → true (Compares stack bits)</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Direct Bit Value Match
            </text>

            {/* Box 2: Object Reference (==) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradHeapEq)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Objects (Heap Memory)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">s1 = new String(&quot;B&quot;);</text>
            <text x="335" y="122" fill="#fca5a5" fontSize="11" fontFamily="monospace">s2 = new String(&quot;B&quot;);</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">s1 == s2 → FALSE! (Diff addresses)</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Use s1.equals(s2) for Content
            </text>

            {/* Box 3: Integer Cache Trap */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradCacheTrap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Integer Cache Trap</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Integer 100 == 100 → true</text>
            <text x="615" y="122" fill="#fca5a5" fontSize="11" fontFamily="monospace">Integer 200 == 200 → FALSE!</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Cached only in [-128..127]!</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Always Use Objects.equals()
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              String Pool: String literals share canonical instances; `new String()` forces new Heap objects.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Equality Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Comparison Expression</th>
                <th className="p-3 font-semibold text-emerald-400">Result</th>
                <th className="p-3 font-semibold text-amber-400">Comparison Type</th>
                <th className="p-3 font-semibold text-slate-400">JVM Architectural Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">10 == 10</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3">Primitive Value</td>
                <td className="p-3 text-xs">Direct stack memory bit comparison</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">&quot;Java&quot; == &quot;Java&quot;</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3">String Literal Identity</td>
                <td className="p-3 text-xs">Both point to the same String Constant Pool instance in Heap</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">&quot;Java&quot; == new String(&quot;Java&quot;)</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3">Reference Address</td>
                <td className="p-3 text-xs">`new` allocates a distinct object outside the constant pool</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">&quot;Java&quot;.equals(new String(&quot;Java&quot;))</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3">Logical Content</td>
                <td className="p-3 text-xs">Overridden `.equals()` inspects character sequences</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">Integer.valueOf(100) == Integer.valueOf(100)</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3">Wrapper Cache Identity</td>
                <td className="p-3 text-xs">Values in range [-128, 127] are pre-cached singletons</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">Integer.valueOf(200) == Integer.valueOf(200)</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3">Heap Object Identity</td>
                <td className="p-3 text-xs">Values exceeding 127 allocate new Heap instances (THE TRAP!)</td>
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
            EqualityCheckPrimitivesVsObjectsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates primitive bit equality, String Pool interning, the dangerous Integer cache trap (<code className="text-rose-400 font-mono">200 == 200</code>), null-safe comparisons, and custom domain entity equality in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={equalityDemoCode}
          title="EqualityCheckPrimitivesVsObjectsDemo.java"
          highlightLines={[25, 26, 38, 39, 40, 41, 42, 43, 50, 54, 55, 65, 66, 76, 77]}
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
              <span>❌</span> Pitfall 1: Comparing Strings with == Instead of .equals()
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (userInput == &quot;Barrackpore&quot;)</code> works during development with static literals but will intermittently fail in production whenever the string comes from a Scanner, API payload, or database query!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use <code className="bg-slate-900 px-1 py-0.5 rounded">&quot;Barrackpore&quot;.equals(userInput)</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">Objects.equals(a, b)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Comparing Wrapper Objects with == (The Integer Cache Trap)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Comparing <code className="text-sky-300 font-mono">Integer</code>, <code className="text-sky-300 font-mono">Long</code>, or <code className="text-sky-300 font-mono">Double</code> objects with <code className="text-rose-300 font-mono">==</code> produces tests that pass for small numbers (<code className="text-emerald-300 font-mono">&lt;= 127</code>) but fail mysteriously for numbers greater than 127.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Never use <code className="bg-slate-900 px-1 py-0.5 rounded">==</code> on Wrapper classes; use <code className="bg-slate-900 px-1 py-0.5 rounded">a.equals(b)</code>.
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
            🤔 <em>&ldquo;Why does `Integer a = 100, b = 100; a == b` evaluate to true, but `Integer c = 200, d = 200; c == d` evaluates to false?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The JVM Integer Cache! Autoboxing calls <code className="text-sky-300 font-mono">Integer.valueOf()</code>. Java pre-allocates and caches integers from <code className="text-emerald-400 font-mono">-128 to +127</code> in a static cache array. For <code className="text-emerald-400 font-mono">100</code>, both <code className="text-sky-300 font-mono">a</code> and <code className="text-sky-300 font-mono">b</code> point to the same cached object. For <code className="text-rose-400 font-mono">200</code> (which is &gt; 127), the JVM instantiates two distinct Heap objects with different memory addresses!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Primitive vs Object Equality FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 8: Primitive == vs Object Reference Equality"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic8_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: This is one of the most critical topics in all of Java development. Always remember: '==' compares stack bits for primitives and heap addresses for objects. Never compare Strings or Wrapper classes with '==' in production code—always use .equals() or Objects.equals(). In Topic 9, we dive into Logical Operators (&&, ||, !)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
