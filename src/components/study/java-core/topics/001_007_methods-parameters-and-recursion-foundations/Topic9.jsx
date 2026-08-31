import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import promoDemoCode from "./topic9_files/TypePromotionOverloadResolutionDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPromotion {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pr {
            animation: glowPromotion 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 9
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Type Widening &amp; Overload Resolution
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Automatic Type Promotion in Method Overloading Resolution
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the official 4-tier overload resolution hierarchy in Java (JLS §15.12.2): exact matching, primitive widening promotion (<code className="text-emerald-400 font-mono">byte → short → int → long → float → double</code>), autoboxing precedence rules, varargs fallbacks, and fee calculation tests in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The 4-Tier Overload Resolution Priority Chain
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When an overloaded method is called, the Java compiler evaluates candidate methods in a strict multi-phase hierarchy:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">Priority 1</h3>
              <p className="text-emerald-300 mb-1">Exact Match</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Argument type matches formal parameter type exactly with zero conversions.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">Priority 2</h3>
              <p className="text-sky-300 mb-1">Primitive Widening</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                <code className="text-sky-300 font-mono">byte/short/char → int → long → float → double</code> without boxing.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">Priority 3</h3>
              <p className="text-purple-300 mb-1">Autoboxing</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Converts primitive to its wrapper class (<code className="text-purple-300 font-mono">int → Integer</code>).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">Priority 4</h3>
              <p className="text-amber-300 mb-1">Varargs Fallback</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Matches variable-arity (<code className="text-amber-300 font-mono">int...</code>) only if all fixed-arity phases fail.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Resolution Proofs):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, passing <code className="text-sky-300 font-mono">byte token = 50</code> promoted to <code className="text-emerald-400 font-mono">processFee(int)</code>, <code className="text-sky-300 font-mono">char &apos;A&apos;</code> promoted to <code className="text-emerald-400 font-mono">65</code>, and <code className="text-sky-300 font-mono">float 12500.50f</code> promoted to <code className="text-emerald-400 font-mono">processFee(double)</code> in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,500.50</code>). Crucially, <strong>Swadeep</strong> saw that primitive widening (<code className="text-sky-300 font-mono">long</code>) beat autoboxing (<code className="text-purple-300 font-mono">Integer</code>) every single time!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 4-Tier Overload Resolution Priority Ladder
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the Java compiler steps through the resolution phases to locate the winning method:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Overload Resolution Priority Ladder"
          >
            <defs>
              <linearGradient id="gradP1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradP2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradP3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradP4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Ladder Tier 1: Exact Match */}
            <rect x="30" y="30" width="820" height="45" rx="8" fill="url(#gradP1)" />
            <text x="50" y="58" fill="#ffffff" fontSize="13" fontWeight="bold">PHASE 1: EXACT MATCH</text>
            <text x="400" y="58" fill="#d1fae5" fontSize="11" fontFamily="monospace">int → m(int) | String → m(String)</text>
            <text x="780" y="58" fill="#ffffff" fontSize="11" fontWeight="bold">PRIORITY 1</text>

            {/* Ladder Tier 2: Primitive Widening */}
            <rect x="30" y="85" width="820" height="45" rx="8" fill="url(#gradP2)" />
            <text x="50" y="113" fill="#ffffff" fontSize="13" fontWeight="bold">PHASE 2: PRIMITIVE WIDENING</text>
            <text x="400" y="113" fill="#e0f2fe" fontSize="11" fontFamily="monospace">byte/short/char → int → long → float → double</text>
            <text x="780" y="113" fill="#ffffff" fontSize="11" fontWeight="bold">PRIORITY 2</text>

            {/* Ladder Tier 3: Autoboxing / Unboxing */}
            <rect x="30" y="140" width="820" height="45" rx="8" fill="url(#gradP3)" />
            <text x="50" y="168" fill="#ffffff" fontSize="13" fontWeight="bold">PHASE 3: AUTOBOXING / UNBOXING</text>
            <text x="400" y="168" fill="#ede9fe" fontSize="11" fontFamily="monospace">int → Integer | Double → double | int → Object</text>
            <text x="780" y="168" fill="#ffffff" fontSize="11" fontWeight="bold">PRIORITY 3</text>

            {/* Ladder Tier 4: Varargs Fallback */}
            <rect x="30" y="195" width="820" height="45" rx="8" fill="url(#gradP4)" />
            <text x="50" y="223" fill="#ffffff" fontSize="13" fontWeight="bold">PHASE 4: VARARGS FALLBACK</text>
            <text x="400" y="223" fill="#fef3c7" fontSize="11" fontFamily="monospace">int... | double... | Object...</text>
            <text x="780" y="223" fill="#ffffff" fontSize="11" fontWeight="bold">PRIORITY 4</text>

            {/* Bottom Caption */}
            <text x="440" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §15.12.2: Primitive Widening ALWAYS beats Autoboxing! Varargs is evaluated last as the ultimate fallback.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Type Promotion Resolution Rules Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Argument Passed</th>
                <th className="p-3 font-semibold text-emerald-400">Overload A</th>
                <th className="p-3 font-semibold text-purple-400">Overload B</th>
                <th className="p-3 font-semibold text-amber-400">Winner</th>
                <th className="p-3 font-semibold text-slate-300">JLS Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`int 10`</td>
                <td className="p-3 text-emerald-300">`void m(long)`</td>
                <td className="p-3 text-purple-300">`void m(Integer)`</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">`m(long)`</td>
                <td className="p-3 text-slate-300 font-sans">Widening beats Autoboxing</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`int 10`</td>
                <td className="p-3 text-emerald-300">`void m(Integer)`</td>
                <td className="p-3 text-purple-300">`void m(int...)`</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">`m(Integer)`</td>
                <td className="p-3 text-slate-300 font-sans">Autoboxing beats Varargs</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`byte 5`</td>
                <td className="p-3 text-emerald-300">`void m(short)`</td>
                <td className="p-3 text-purple-300">`void m(int)`</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">`m(short)`</td>
                <td className="p-3 text-slate-300 font-sans">Narrowest widening match wins</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`null`</td>
                <td className="p-3 text-emerald-300">`void m(Object)`</td>
                <td className="p-3 text-purple-300">`void m(String)`</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">`m(String)`</td>
                <td className="p-3 text-slate-300 font-sans">Most specific subtype rule</td>
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
            TypePromotionOverloadResolutionDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates type promotion, exact matches, widening versus boxing priority, and varargs fallbacks in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={promoDemoCode}
          title="TypePromotionOverloadResolutionDemo.java"
          highlightLines={[20, 25, 30, 35, 40, 47, 51, 64, 76, 84]}
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
              <span>❌</span> Pitfall 1: Attempting Widening Followed by Boxing
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Passing an <code className="text-rose-300 font-mono">int 10</code> to a method taking <code className="text-rose-300 font-mono">Long</code> causes a <code className="text-rose-400 font-mono">Compile Error</code> because Java does not permit widening and boxing in a single step!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Avoid Overloads That Rely on Subtle Type Promotion
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Do not design APIs with confusing combinations like <code className="text-slate-300 font-mono">m(int, long)</code> and <code className="text-slate-300 font-mono">m(long, int)</code>. Keep overload parameter lists distinct and unambiguous.
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
            🤔 <em>&ldquo;Why does <code className="text-emerald-400 font-mono">m(long)</code> beat <code className="text-purple-300 font-mono">m(Integer)</code> when passing <code className="text-sky-300 font-mono">int 10</code>?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Backwards Compatibility! Primitive Widening existed in Java 1.0 (1995), while Autoboxing was added in Java 5 (2004). To ensure existing legacy code never changed behavior, widening was prioritized over autoboxing!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Type Promotion in Overloading FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 9: Type Promotion in Overloading"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic9_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Remember the 4-tier rule: Exact Match > Widening > Autoboxing > Varargs. Widening always beats boxing! In Topic 10, we master Variable Arguments (Varargs) and the Single-Last-Parameter rule! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
