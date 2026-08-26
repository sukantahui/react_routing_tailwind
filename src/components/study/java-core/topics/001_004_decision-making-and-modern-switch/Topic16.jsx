import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import patternDemoCode from "./topic16_files/PatternMatchingGuardsDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPattern {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pat {
            animation: glowPattern 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 16
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Advanced Modern Java
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Guard Conditions &amp; Pattern Matching in Switch (Java 17–21)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master polymorphic pattern matching and guard clauses in Java 21 (JEP 441): type patterns (<code className="text-purple-400 font-mono">case Student s -&gt;</code>), fine-grained <code className="text-emerald-400 font-mono">when</code> guard predicates, pattern dominance rules, safe null handling (<code className="text-sky-300 font-mono">case null -&gt;</code>), and polymorphic educational grant audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Evolution to Polymorphic Pattern Matching
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Standardized in <strong>Java SE 21</strong> (JEP 441), switch statements and expressions can match against <strong>Type Patterns</strong> and refine matching with <strong><code className="text-emerald-400 font-mono">when</code> guard clauses</strong>:
          </p>
          <p className="font-mono text-purple-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            switch ( payload ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case null &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; handleNull();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case Student s when s.getMarks() &gt;= 90 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; awardHonors(s);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case Student s when s.getMarks() &gt;= 60 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; regularAdmission(s);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case Student s &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; remedialProgram(s);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case CorporateGrant g when g.getAmount() &gt;= 100000.0 -&gt; majorSponsorship(g);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;default &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; handleUnknown(payload);
            <br />
            &#125;
          </p>
          <p>
            <strong>Pattern Dominance:</strong> Guarded, specific patterns MUST appear before broad, unguarded patterns. Placing <code className="text-rose-300 font-mono">case Student s</code> before <code className="text-emerald-300 font-mono">case Student s when s.getMarks() &gt;= 90</code> is a compile-time error because the broad case dominates the guarded case!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Heterogeneous Grant Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an institutional grant auditor in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By processing mixed payload objects (<code className="text-purple-300 font-mono">StudentRecord</code>, <code className="text-purple-300 font-mono">CorporateGrant</code>, <code className="text-sky-300 font-mono">String</code>) using Java 21 pattern matching and <code className="text-emerald-400 font-mono">when</code> guards, <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated all explicit type casting and null pointer bugs across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Pattern Matching Flow, &apos;when&apos; Guards &amp; Dominance Rule
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How type matching, guard condition filtering, and dominance analysis operate in Java 21:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Pattern Matching and Guard Conditions Diagram"
          >
            <defs>
              <linearGradient id="gradTypePattern" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradWhenGuard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradDominance" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Box 1: Type Pattern Matching */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradTypePattern)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Type Pattern Matching</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="55" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">case Student s -&gt; ...</text>
            <text x="55" y="122" fill="#ddd6fe" fontSize="10">Auto-casts to Student &apos;s&apos;</text>
            <text x="55" y="142" fill="#ede9fe" fontSize="10">Zero explicit casting needed!</text>
            <text x="160" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Type-Safe Polymorphism
            </text>

            {/* Box 2: 'when' Guard Clause */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradWhenGuard)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. &apos;when&apos; Guard Clause</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="10" fontFamily="monospace">case Student s when s.marks()&gt;=90</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">Refines match with boolean logic</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Replaces nested if statements</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Fine-Grained Filtering
            </text>

            {/* Box 3: Pattern Dominance */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradDominance)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Dominance Ordering</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="615" y="102" fill="#fca5a5" fontSize="10" fontFamily="monospace">1. case Student s when ..</text>
            <text x="615" y="122" fill="#fca5a5" fontSize="10">2. case Student s &rarr; Fallback</text>
            <text x="615" y="142" fill="#fecdd3" fontSize="10">Broad case MUST follow guarded!</text>
            <text x="720" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Compiler Dominance Rule
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JEP 441 (Java 21): Pattern matching with &apos;when&apos; guards unifies polymorphic dispatch, record deconstruction, and null safety.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Java 21 Pattern Matching vs. Legacy Java 8 Cascade
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-rose-400">Legacy Java 8 (`instanceof` Cascade)</th>
                <th className="p-3 font-semibold text-emerald-400">Java 21 Pattern Switch (`when`)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Type Casting</td>
                <td className="p-3 text-xs text-rose-400 font-mono">Student s = (Student) obj; (Manual Cast)</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">case Student s -&gt; (Auto-Cast)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Guard Predicates</td>
                <td className="p-3 text-xs">Nested inside if blocks</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">case Student s when s.marks() &gt;= 90 -&gt;</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Null Handling</td>
                <td className="p-3 text-xs">Explicit if (obj == null) check</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">case null -&gt; (Handled directly)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Dominance Checking</td>
                <td className="p-3 text-xs text-rose-400">NO (Dead code passes silently)</td>
                <td className="p-3 text-xs text-emerald-400">YES (Compiler rejects dominated branches)</td>
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
            PatternMatchingGuardsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates Java 21 pattern matching switch on records and objects, <code className="text-emerald-400 font-mono">when</code> guard predicates, pattern dominance ordering, and explicit null handling in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={patternDemoCode}
          title="PatternMatchingGuardsDemo.java"
          highlightLines={[39, 41, 44, 47, 49, 52, 54, 63, 64, 65]}
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
              <span>❌</span> Pitfall 1: Placing Unguarded Type Patterns Before Guarded Ones
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">case String s -&gt; ... case String s when s.isEmpty() -&gt; ...</code> causes a compile-time error (&quot;this case label is dominated by a preceding case label&quot;).
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always order from most specific (guarded) down to broad (unguarded).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use &apos;case null -&gt;&apos; for Expressive Null Safety
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In Java 21, include <code className="text-emerald-400 font-mono">case null -&gt; ...</code> or <code className="text-emerald-400 font-mono">case null, default -&gt; ...</code> to make null handling explicit and immune to NPEs.
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
            🤔 <em>&ldquo;How does pattern matching in switch eliminate the need for the Visitor Pattern in OOP?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Data-Oriented Programming (DOP)! Historically, adding new operations across a class hierarchy required implementing the complex Visitor design pattern (with double dispatch <code className="text-sky-300 font-mono">accept(visitor)</code>). With sealed classes and pattern matching switch in Java 21, you can write new operations in a single exhaustive switch expression with <code className="text-emerald-400 font-mono">when</code> guards without modifying any domain classes!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Pattern Matching & Guards FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 16: Guard Conditions & Pattern Matching in Switch"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic16_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Pattern matching with 'when' guards is the cutting-edge future of Java decision making. Master pattern dominance and enjoy writing clean polymorphic code! In our final Topic 17, we conclude Module 001_004 with Best Practices for Clean, Maintainable Conditional Logic! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
