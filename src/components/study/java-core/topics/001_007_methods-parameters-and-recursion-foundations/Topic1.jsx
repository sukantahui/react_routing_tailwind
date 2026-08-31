import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import anatomyDemoCode from "./topic1_files/MethodDeclarationAnatomyDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowAnatomy {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-an {
            animation: glowAnatomy 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Grammar &amp; Syntax Specification
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Anatomy of a Method Declaration in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect every grammatical token of Java method declarations (JLS §8.4): access modifiers, non-access keywords (<code className="text-emerald-400 font-mono">static</code>, <code className="text-sky-300 font-mono">final</code>), return types, formal parameter lists, <code className="text-amber-300 font-mono">throws</code> clauses, and student fee deduction validation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The 6 Grammatical Tokens of a Method
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, a method declaration defines an explicit interface contract consisting of 6 essential components:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Modifiers</h3>
              <p className="text-sky-300 mb-1">public static final</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Defines visibility scope (<code className="text-sky-300 font-mono">public</code>, <code className="text-sky-300 font-mono">private</code>) and behavioral traits (<code className="text-emerald-400 font-mono">static</code> for class-level, <code className="text-amber-300 font-mono">final</code> to prevent overriding).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Return Type &amp; Name</h3>
              <p className="text-emerald-300 mb-1">double processFee(...)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Specifies output data type (<code className="text-emerald-300 font-mono">double</code> or <code className="text-rose-300 font-mono">void</code>) and the verb-noun camelCase identifier.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Parameters &amp; Throws</h3>
              <p className="text-purple-300 mb-1">(params) throws Ex</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Specifies required inputs and advertises potential checked/unchecked exceptions to callers.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Fee Deduction Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (₹25,000 balance) and <strong>Tuhina</strong> (₹15,000 balance) tested fee deductions in Indian Rupees (<code className="text-emerald-400 font-semibold">₹5,000 to ₹12,000</code>). When <strong>Debangshu</strong> attempted an overdraft deduction of ₹10,000 on a ₹3,000 balance, the <code className="text-amber-300 font-mono">throws IllegalArgumentException</code> contract safely prevented account corruption across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Complete Structural Breakdown of Method Declaration
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How each token is mapped and parsed by the Java compiler:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Method Declaration Anatomy Diagram"
          >
            <defs>
              <linearGradient id="gradTokMod" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradTokRet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradTokName" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradTokParams" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradTokThrows" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
            </defs>

            {/* Header Box: The Full Method Header */}
            <rect x="25" y="30" width="830" height="55" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <text x="40" y="62" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold">public static final</text>
            <text x="210" y="62" fill="#10b981" fontSize="13" fontFamily="monospace" fontWeight="bold">double</text>
            <text x="270" y="62" fill="#a78bfa" fontSize="13" fontFamily="monospace" fontWeight="bold">processFeeDeduction</text>
            <text x="440" y="62" fill="#fbbf24" fontSize="13" fontFamily="monospace" fontWeight="bold">(String name, double bal, double amt)</text>
            <text x="740" y="62" fill="#f472b6" fontSize="12" fontFamily="monospace" fontWeight="bold">throws Ex</text>

            {/* Explanatory Cards for each Token */}
            {/* Card 1: Modifiers */}
            <rect x="25" y="105" width="150" height="115" rx="8" fill="url(#gradTokMod)" opacity="0.9" />
            <text x="100" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1. MODIFIERS</text>
            <rect x="35" y="135" width="130" height="75" rx="4" fill="#082f49" />
            <text x="42" y="153" fill="#bae6fd" fontSize="9" fontFamily="monospace">public: Global access</text>
            <text x="42" y="171" fill="#bae6fd" fontSize="9" fontFamily="monospace">static: Class level</text>
            <text x="42" y="189" fill="#bae6fd" fontSize="9" fontFamily="monospace">final: No override</text>

            {/* Card 2: Return Type */}
            <rect x="190" y="105" width="140" height="115" rx="8" fill="url(#gradTokRet)" opacity="0.9" />
            <text x="260" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2. RETURN TYPE</text>
            <rect x="200" y="135" width="120" height="75" rx="4" fill="#022c22" />
            <text x="208" y="153" fill="#a7f3d0" fontSize="9" fontFamily="monospace">double: Primitive</text>
            <text x="208" y="171" fill="#a7f3d0" fontSize="9" fontFamily="monospace">void: No result</text>
            <text x="208" y="189" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Object / Record</text>

            {/* Card 3: Method Name */}
            <rect x="345" y="105" width="150" height="115" rx="8" fill="url(#gradTokName)" opacity="0.9" />
            <text x="420" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3. METHOD NAME</text>
            <rect x="355" y="135" width="130" height="75" rx="4" fill="#2e1065" />
            <text x="363" y="153" fill="#ddd6fe" fontSize="9" fontFamily="monospace">verbNoun format</text>
            <text x="363" y="171" fill="#ddd6fe" fontSize="9" fontFamily="monospace">camelCase style</text>
            <text x="363" y="189" fill="#ddd6fe" fontSize="9" fontFamily="monospace">Unique in scope</text>

            {/* Card 4: Parameters */}
            <rect x="510" y="105" width="180" height="115" rx="8" fill="url(#gradTokParams)" opacity="0.9" />
            <text x="600" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4. PARAMETERS</text>
            <rect x="520" y="135" width="160" height="75" rx="4" fill="#451a03" />
            <text x="528" y="153" fill="#fde68a" fontSize="9" fontFamily="monospace">Formal inputs list</text>
            <text x="528" y="171" fill="#fde68a" fontSize="9" fontFamily="monospace">(Type paramName)</text>
            <text x="528" y="189" fill="#fde68a" fontSize="9" fontFamily="monospace">Forms Method Signature</text>

            {/* Card 5: Throws Clause */}
            <rect x="705" y="105" width="150" height="115" rx="8" fill="url(#gradTokThrows)" opacity="0.9" />
            <text x="780" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">5. THROWS CLAUSE</text>
            <rect x="715" y="135" width="130" height="75" rx="4" fill="#500724" />
            <text x="723" y="153" fill="#fbcfe8" fontSize="9" fontFamily="monospace">Exception contract</text>
            <text x="723" y="171" fill="#fbcfe8" fontSize="9" fontFamily="monospace">Checked/Unchecked</text>
            <text x="723" y="189" fill="#fbcfe8" fontSize="9" fontFamily="monospace">Informs callers</text>

            {/* Bottom Caption */}
            <text x="440" y="260" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4.2: Method Signature = [Method Name] + [Parameter Types]. Return type and modifiers are NOT in signature!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Method Declaration Elements Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Component</th>
                <th className="p-3 font-semibold text-emerald-400">Required or Optional?</th>
                <th className="p-3 font-semibold text-purple-400">Included in Method Signature?</th>
                <th className="p-3 font-semibold text-amber-400">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Access Modifiers</td>
                <td className="p-3 text-slate-400 font-sans">Optional (defaults to package-private)</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO</td>
                <td className="p-3 text-slate-300">`public`, `private`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Return Type</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ REQUIRED</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO</td>
                <td className="p-3 text-slate-300">`double`, `void`, `String`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">Method Name</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ REQUIRED</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES</td>
                <td className="p-3 text-slate-300">`processFeeDeduction`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-300 font-bold">Parameter List</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ REQUIRED (can be empty `()`)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES</td>
                <td className="p-3 text-slate-300">`(String name, double fee)`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-300 font-bold">Throws Clause</td>
                <td className="p-3 text-slate-400 font-sans">Optional</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO</td>
                <td className="p-3 text-slate-300">`throws IllegalArgumentException`</td>
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
            MethodDeclarationAnatomyDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates complete method declaration syntax, parameter validation, defensive guard clauses, and exception contracts in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={anatomyDemoCode}
          title="MethodDeclarationAnatomyDemo.java"
          highlightLines={[21, 22, 27, 31, 39, 46, 61, 62]}
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
              <span>❌</span> Pitfall 1: Assuming Return Type Distinguishes Overloaded Methods
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Declaring <code className="text-rose-300 font-mono">int compute(int x)</code> and <code className="text-rose-300 font-mono">double compute(int x)</code> in the same class produces a <code className="text-rose-400 font-mono">Compile Error</code> because their method signatures (<code className="text-slate-300 font-mono">compute(int)</code>) are completely identical!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Ensure All Execution Paths Return a Value
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In non-void methods, every conditional branch must either return an appropriate value or throw an explicit exception to guarantee complete control flow termination.
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
            🤔 <em>&ldquo;Why can&apos;t a method returning primitive <code className="text-emerald-400 font-mono">double</code> return <code className="text-rose-400 font-mono">null</code>?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Primitive Stack Storage! Primitives in Java hold raw 64-bit binary values directly in stack frames without reference pointers. Only Object references can store the <code className="text-rose-300 font-mono">null</code> address pointer!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Method Declaration Anatomy FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 1: Anatomy of a Method Declaration"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Never confuse a Method Declaration with its Method Signature! The signature is strictly Name + Parameter Types only. In Topic 2, we explore Method Naming Conventions in camelCase verb-noun style! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
