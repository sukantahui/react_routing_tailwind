import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stringSwitchDemoCode from "./topic10_files/StringSwitchHashCodeDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowString {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(14, 165, 233, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-str {
            animation: glowString 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 10
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Switch with Strings &amp; Internal HashCode Matching
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master String switching in Java (introduced in Java 7 / Project Coin): two-stage bytecode compilation (<code className="text-sky-300 font-mono">hashCode()</code> jump table + <code className="text-emerald-400 font-mono">.equals()</code> equality verification), hash collision resilience (<code className="text-amber-300 font-mono">&quot;FB&quot;</code> vs <code className="text-amber-300 font-mono">&quot;Ea&quot;</code>), defensive null pointer prevention, and tuition payment gateway dispatches in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> How String Switching Works Under the Hood
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Introduced in <strong>Java SE 7</strong>, switching on <code className="text-sky-400 font-mono">String</code> objects provides clean readability over nested <code className="text-sky-300 font-mono">.equals()</code> chains.
          </p>
          <p>
            Because the JVM lacks a native string jump instruction, the Java compiler (<code className="text-purple-300 font-mono">javac</code>) translates a String switch into a synchronized <strong>two-stage bytecode execution</strong>:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm font-mono">
            <li><strong>Stage 1 (Hash Jump):</strong> Evaluates <code className="text-sky-300">str.hashCode()</code> in an integer jump table.</li>
            <li><strong>Stage 2 (Collision Guard):</strong> Calls <code className="text-emerald-400">str.equals(&quot;caseString&quot;)</code> to confirm exact content identity.</li>
            <li><strong>Stage 3 (Execution):</strong> Jumps to the user&apos;s code block.</li>
          </ol>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Tuition Payment Gateway):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a tuition payment gateway in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By dispatching across payment mode strings (<code className="text-sky-300 font-mono">&quot;UPI&quot;</code>, <code className="text-sky-300 font-mono">&quot;NEFT&quot;</code>, <code className="text-sky-300 font-mono">&quot;NET_BANKING&quot;</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> achieved fast two-stage hash dispatch with zero crash risk across payment kiosks in Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Two-Stage Bytecode Pipeline &amp; Hash Collision Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How hashCode() jump tables and .equals() verification work together to guarantee 100% collision safety:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="String Switch Bytecode Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradStage1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradStage2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradCollision" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Stage 1 - HashCode Jump */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradStage1)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Stage 1: HashCode Jump</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">int hash = s.hashCode();</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="10">lookupswitch on integer hash</text>
            <text x="55" y="142" fill="#a7f3d0" fontSize="10">Fast O(log N) / O(1) jump</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              32-Bit Integer Table
            </text>

            {/* Box 2: Stage 2 - Equality Verification */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradStage2)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Stage 2: .equals() Check</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (s.equals(&quot;UPI&quot;)) idx = 0;</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">Verifies true content match</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Guards against hash collision</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Exact String Verification
            </text>

            {/* Box 3: Hash Collision Example */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradCollision)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Collision: &quot;FB&quot; vs &quot;Ea&quot;</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">&quot;FB&quot;.hash == &quot;Ea&quot;.hash (2236)</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">Chained .equals() in bucket 2236</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Zero incorrect matches!</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              100% Collision Safe
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Java 7 Project Coin: Two-stage compilation guarantees O(1)/O(log N) hash lookup with zero collision defects.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Internal String Switch Decompilation Architecture
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Step Name</th>
                <th className="p-3 font-semibold text-emerald-400">Bytecode Operation</th>
                <th className="p-3 font-semibold text-amber-400">Purpose</th>
                <th className="p-3 font-semibold text-rose-400">Exception / Edge Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">1. Null Check / Hash</td>
                <td className="p-3 font-mono text-xs">invokevirtual String.hashCode()</td>
                <td className="p-3 text-xs">Extracts 32-bit integer hash of selector</td>
                <td className="p-3 text-xs text-rose-400 font-bold">Throws NullPointerException if null!</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-300">2. Hash Jump Table</td>
                <td className="p-3 font-mono text-xs">lookupswitch on hash value</td>
                <td className="p-3 text-xs">Jumps to hash bucket label</td>
                <td className="p-3 text-xs">Jumps to default if hash unknown</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-300">3. Equality Check</td>
                <td className="p-3 font-mono text-xs">invokevirtual String.equals()</td>
                <td className="p-3 text-xs">Verifies string content equality</td>
                <td className="p-3 text-xs text-emerald-400">Resolves hash collisions</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-300">4. Action Switch</td>
                <td className="p-3 font-mono text-xs">tableswitch on branchIndex</td>
                <td className="p-3 text-xs">Executes developer&apos;s statement body</td>
                <td className="p-3 text-xs">Standard break/fall-through rules apply</td>
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
            StringSwitchHashCodeDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates payment gateway string switching, hash collision handling (<code className="text-amber-300 font-mono">&quot;FB&quot;</code> vs <code className="text-amber-300 font-mono">&quot;Ea&quot;</code>), and defensive null-safe switches in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={stringSwitchDemoCode}
          title="StringSwitchHashCodeDemo.java"
          highlightLines={[22, 23, 26, 29, 39, 40, 52, 67, 70]}
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
              <span>❌</span> Pitfall 1: Passing a Null String to Switch
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In traditional Java 7-16 switch, passing <code className="text-rose-300 font-mono">null</code> throws an immediate <code className="text-rose-400 font-mono">NullPointerException</code> before any case or default block can execute!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always validate <code className="bg-slate-900 px-1 py-0.5 rounded">if (str == null) return;</code> or use Java 21 <code className="bg-slate-900 px-1 py-0.5 rounded">case null -&gt;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Normalize Strings for Case Tolerance
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              String matching is strictly case-sensitive. Use <code className="text-emerald-400 font-mono">switch (input.trim().toUpperCase())</code> to tolerate mixed-case user inputs safely.
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
            🤔 <em>&ldquo;Why can&apos;t the JVM switch on Strings directly with a single opcode without computing hash codes?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Hardware Instruction Limitations! CPU instructions and JVM opcodes operate on fixed-size registers (32-bit/64-bit integers). A String is a variable-length heap-allocated object containing an array of UTF-16 characters. By reducing the string to its 32-bit <code className="text-sky-300 font-mono">hashCode()</code>, the compiler leverages native integer jump tables, only performing character comparisons when hashes match!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Switch with Strings FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 10: Switch with Strings & HashCode Internals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: String switch is one of the most practical additions to Java. Understanding the two-stage hashCode + equals mechanism helps you appreciate how high-level Java syntax maps cleanly to JVM jump tables. In Topic 11, we step into modern Java 14+ with Switch Expressions and Arrow Syntax! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
