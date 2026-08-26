import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import namingDemoCode from "./topic2_files/MethodNamingConventionsDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowNaming {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-nm {
            animation: glowNaming 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Clean Code Conventions
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Method Naming Conventions in Java (Verb-Noun <code className="text-emerald-400 font-mono">lowerCamelCase</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master idiomatic Java method taxonomy: active verb-noun pairing, boolean predicates (<code className="text-sky-300 font-mono">isEligible</code>, <code className="text-sky-300 font-mono">hasCompleted</code>), conversion prefixes (<code className="text-purple-300 font-mono">toFormattedCurrency</code>), JavaBeans standards, and fee queries in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Taxonomy of Idiomatic Java Method Names
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java methods represent <strong>actions and behaviors</strong>. By convention, they must begin with a <strong>lowercase active verb</strong> followed by CamelCase nouns or adjectives:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Action Methods</h3>
              <p className="text-emerald-300 mb-1">calculateGrossTuition()</p>
              <p className="text-emerald-300">applyMeritScholarship()</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs mt-2">
                Active verbs that perform computations, data mutations, or orchestrate business operations.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Boolean Predicates</h3>
              <p className="text-sky-300 mb-1">isEligibleForScholarship()</p>
              <p className="text-sky-300">hasCompletedBatch()</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs mt-2">
                Prefixes like <code className="text-sky-300 font-mono">is</code>, <code className="text-sky-300 font-mono">has</code>, <code className="text-sky-300 font-mono">can</code>, and <code className="text-sky-300 font-mono">should</code> returning truth values.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Conversion &amp; Factory</h3>
              <p className="text-purple-300 mb-1">toFormattedCurrency()</p>
              <p className="text-purple-300">List.of(&quot;Barrackpore&quot;)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs mt-2">
                Prefixes like <code className="text-purple-300 font-mono">to</code>, <code className="text-purple-300 font-mono">as</code>, and factory methods like <code className="text-purple-300 font-mono">of</code>, <code className="text-purple-300 font-mono">valueOf</code>.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Academic Administration):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> validated scholarship eligibility (<code className="text-sky-300 font-mono">isEligibleForScholarship(92.5)</code>). Calling <code className="text-emerald-400 font-mono">calculateGrossTuition(4500.0, 6)</code> computed ₹27,000 gross tuition, while <code className="text-purple-300 font-mono">toFormattedCurrency()</code> rendered formatted Indian Rupees (<code className="text-emerald-400 font-semibold">₹22,950.00</code> net payable) cleanly across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Method Naming Taxonomy &amp; Anti-Patterns Matrix
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing clean Java naming conventions with confusing anti-patterns:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Method Naming Taxonomy Diagram"
          >
            <defs>
              <linearGradient id="gradGoodName" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBadName" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Panel 1: Idiomatic Java Taxonomy (Good) */}
            <rect x="30" y="30" width="410" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="235" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">✓ IDIOMATIC JAVA CONVENTIONS (lowerCamelCase)</text>

            <rect x="45" y="70" width="380" height="35" rx="6" fill="#022c22" />
            <text x="55" y="92" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Action: calculateGrossTuition()</text>

            <rect x="45" y="110" width="380" height="35" rx="6" fill="#022c22" />
            <text x="55" y="132" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Boolean: isEligible(), hasCompleted()</text>

            <rect x="45" y="150" width="380" height="35" rx="6" fill="#022c22" />
            <text x="55" y="172" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Conversion: toFormattedCurrency(), asList()</text>

            <rect x="45" y="190" width="380" height="40" rx="6" fill="#064e3b" />
            <text x="235" y="215" fill="#d1fae5" fontSize="10" fontWeight="bold" textAnchor="middle">Self-Documenting &amp; Intention Revealing</text>

            {/* Panel 2: Anti-Patterns (Bad) */}
            <rect x="460" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="655" y="55" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">❌ COMMON ANTI-PATTERNS (Avoid in Java)</text>

            <rect x="475" y="70" width="360" height="35" rx="6" fill="#4c0519" />
            <text x="485" y="92" fill="#fecdd3" fontSize="11" fontFamily="monospace">UpperCamelCase: CalculateGross()</text>
            <text x="760" y="92" fill="#fda4af" fontSize="9">(Looks like a Constructor)</text>

            <rect x="475" y="110" width="360" height="35" rx="6" fill="#4c0519" />
            <text x="485" y="132" fill="#fecdd3" fontSize="11" fontFamily="monospace">snake_case: calculate_fee()</text>
            <text x="760" y="132" fill="#fda4af" fontSize="9">(Python/C style)</text>

            <rect x="475" y="150" width="360" height="35" rx="6" fill="#4c0519" />
            <text x="485" y="172" fill="#fecdd3" fontSize="11" fontFamily="monospace">Vague: doWork(), process(), data()</text>
            <text x="760" y="172" fill="#fda4af" fontSize="9">(Obscures intent)</text>

            <rect x="475" y="190" width="360" height="40" rx="6" fill="#881337" />
            <text x="655" y="215" fill="#ffe4e6" fontSize="10" fontWeight="bold" textAnchor="middle">Causes confusion, poor readability, and bugs</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Always name Java methods using lowerCamelCase verb-noun pairs to maintain industry-standard clean code quality.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Standard Java Method Prefix Taxonomy Guide
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Prefix / Category</th>
                <th className="p-3 font-semibold text-emerald-400">Purpose</th>
                <th className="p-3 font-semibold text-purple-400">Expected Return Type</th>
                <th className="p-3 font-semibold text-amber-400">Examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`calculate` / `compute`</td>
                <td className="p-3 text-slate-300">Mathematical or business algorithm</td>
                <td className="p-3 text-emerald-300">`double`, `int`, `BigDecimal`</td>
                <td className="p-3 text-slate-400">`calculateGrossTuition`, `computeGst`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`is` / `has` / `can`</td>
                <td className="p-3 text-slate-300">Boolean predicate state verification</td>
                <td className="p-3 text-emerald-300">`boolean`</td>
                <td className="p-3 text-slate-400">`isEligible`, `hasCompletedBatch`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`get` / `set`</td>
                <td className="p-3 text-slate-300">JavaBean property accessor &amp; mutator</td>
                <td className="p-3 text-emerald-300">Field Type / `void`</td>
                <td className="p-3 text-slate-400">`getFeeBalance`, `setCampusName`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`to` / `as`</td>
                <td className="p-3 text-slate-300">Type transformation or formatting</td>
                <td className="p-3 text-emerald-300">`String`, `List`, Array</td>
                <td className="p-3 text-slate-400">`toFormattedCurrency`, `asList`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`validate` / `check`</td>
                <td className="p-3 text-slate-300">Input defensive validation</td>
                <td className="p-3 text-emerald-300">`void` (throws exception on failure)</td>
                <td className="p-3 text-slate-400">`validateStudentAge`, `checkBalance`</td>
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
            MethodNamingConventionsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates clean action verbs, boolean predicates, and currency conversion formatting in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={namingDemoCode}
          title="MethodNamingConventionsDemo.java"
          highlightLines={[18, 22, 28, 32, 38, 54, 58, 62]}
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
              <span>❌</span> Pitfall 1: Starting Method Names with an Uppercase Letter
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">void CalculateFee()</code> confuses developers and code analysis tools into mistaking the method for a Class Constructor. Always begin with a lowercase letter: <code className="text-emerald-400 font-mono">void calculateFee()</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Avoid Double Negatives in Boolean Methods
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never name a boolean predicate <code className="text-rose-300 font-mono">isNotInvalid()</code> or <code className="text-rose-300 font-mono">hasNoBalance()</code>; use positive, affirmation-based names like <code className="text-emerald-400 font-mono">isValid()</code> or <code className="text-emerald-400 font-mono">hasBalance()</code>.
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
            🤔 <em>&ldquo;Why should Hungarian notation (like <code className="text-rose-300 font-mono">strGetName()</code> or <code className="text-rose-300 font-mono">dblCalcTotal()</code>) never be used in modern Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Strong Static Typing &amp; Modern IDEs! In Java, variables and return types are strictly enforced by the compiler and displayed in real-time by IDEs. Adding data type prefixes pollutes method names and breaks standard JavaBeans reflection frameworks!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Method Naming Conventions FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 2: Method Naming Conventions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Code is read far more often than it is written. Clean, self-documenting method names make enterprise software readable like plain English. In Topic 3, we master Formal Parameters vs Actual Arguments! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
