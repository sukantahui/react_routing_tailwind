import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import eliminationDemoCode from "./topic12_files/EliminationOfFallthroughDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowShield {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-shield {
            animation: glowShield 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Elimination of Fall-Through in Arrow Switch Expressions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the architectural safety guarantees of modern Java switch: formal elimination of fall-through (JLS §14.11.2, JEP 361), preventing privilege escalation vulnerabilities (CWE-484), comma-separated multi-label sharing (<code className="text-emerald-400 font-mono">case 1, 2, 3 -&gt;</code>), branch scoping isolation, and security clearance audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Zero Fall-Through Architectural Invariant
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java 14+ <strong>Arrow Switch (<code className="text-emerald-400 font-mono">case X -&gt; Y</code>)</strong>, execution of a switch rule is strictly isolated:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            switch ( userRole ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case STUDENT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; grantStudentAccess();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case TEACHER &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; grantTeacherAccess();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case SYSTEM_ADMIN -&gt; grantAdminAccess();
            <br />
            &#125;
          </p>
          <p>
            When a matching case is encountered, <strong>ONLY</strong> the expression or block to the right of <code className="text-emerald-400 font-mono">-&gt;</code> executes. Execution immediately jumps past the entire switch. Fall-through is <strong>impossible by language specification</strong>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Security Clearance Gatekeeper):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> investigated a simulated security leak where a legacy switch without <code className="text-rose-400 font-mono">break;</code> permitted a <code className="text-sky-300 font-mono">STUDENT</code> to execute <code className="text-rose-400 font-mono">SYSTEM_ADMIN</code> commands. By refactoring the authorization gateway to Java 14+ arrow switch rules, <strong>Abhronila</strong> and <strong>Debangshu</strong> made privilege leaks mathematically impossible across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Legacy Fall-Through Vulnerability vs Modern Arrow Isolation
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How legacy colon switch leaks execution downward and how arrow switch guarantees complete isolation:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Elimination of Fall-Through Diagram"
          >
            <defs>
              <linearGradient id="gradLegacyBug" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradArrowSafe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradMultiLabel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Legacy Fall-Through Bug */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradLegacyBug)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Legacy Colon Switch (Bug)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">case STUDENT: read();</text>
            <text x="55" y="122" fill="#fecdd3" fontSize="10">case ADMIN: root(); break;</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">STUDENT leaks into ADMIN!</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Privilege Escalation (CWE-484)
            </text>

            {/* Box 2: Modern Arrow Isolation */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradArrowSafe)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Modern Arrow Switch (Safe)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">case STUDENT -&gt; read();</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">case ADMIN &nbsp;&nbsp;-&gt; root();</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Strict branch isolation!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ 100% Zero Fall-Through
            </text>

            {/* Box 3: Comma-Separated Labels */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradMultiLabel)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Comma-Separated Labels</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">case 1, 2, 3 -&gt; &quot;Q1&quot;;</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">case 4, 5, 6 -&gt; &quot;Q2&quot;;</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">Replaces stacked cases cleanly</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Clean Safe Grouping
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.11.2: Arrow rules terminate automatically upon expression completion; fall-through is eliminated.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Structural Comparison: Fall-Through Mechanics
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Aspect</th>
                <th className="p-3 font-semibold text-rose-400">Colon Syntax (case X:)</th>
                <th className="p-3 font-semibold text-emerald-400">Arrow Syntax (case X -&gt;)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Default Behavior</td>
                <td className="p-3 text-rose-400 font-semibold">Falls through automatically</td>
                <td className="p-3 text-emerald-400 font-semibold">Stops and exits immediately</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Keyword &apos;break;&apos;</td>
                <td className="p-3 text-xs">MANDATORY on every case</td>
                <td className="p-3 text-xs text-rose-400 font-mono">FORBIDDEN (Compilation Error)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Multiple Labels</td>
                <td className="p-3 text-xs font-mono">case 1: case 2: case 3:</td>
                <td className="p-3 text-xs font-mono text-emerald-300 font-bold">case 1, 2, 3 -&gt;</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Compiler Warnings</td>
                <td className="p-3 text-xs text-amber-300">Generates -Xlint:fallthrough warnings</td>
                <td className="p-3 text-xs text-emerald-400">Zero fall-through warnings</td>
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
            EliminationOfFallthroughDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates security authorization with zero fall-through, a simulated legacy missing-break bug, and comma-separated quarterly billing tiers in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={eliminationDemoCode}
          title="EliminationOfFallthroughDemo.java"
          highlightLines={[22, 23, 24, 38, 39, 40, 41, 52, 53, 54, 55]}
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
              <span>❌</span> Pitfall 1: Putting &apos;break;&apos; Inside an Arrow Rule
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">case 1 -&gt; &#123; doWork(); break; &#125;</code> causes a compile error (&quot;break cannot be used to complete a switch rule&quot;).
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Remove <code className="bg-slate-900 px-1 py-0.5 rounded">break;</code>. Arrow rules terminate automatically.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Comma Lists for Multiple Matching Keys
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never try to stack arrow rules. Write <code className="text-emerald-400 font-mono">case &quot;SAT&quot;, &quot;SUN&quot; -&gt; weekendAction();</code> directly.
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
            🤔 <em>&ldquo;If arrow switch has zero fall-through, how do you implement legitimate cascading logic (e.g. VIP level 3 gets level 2 + 1 perks)?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Clean Method Composition! Rather than relying on fragile control-flow fall-through, invoke explicit helper methods: <code className="text-emerald-300 font-mono">case TIER_3 -&gt; &#123; grantTier3Perks(); grantTier2Perks(); grantTier1Perks(); &#125;</code>. This makes business logic transparent and crystal clear in code reviews!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Elimination of Fall-Through FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 12: Elimination of Fall-Through in Arrow Switch"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The elimination of fall-through in arrow switch is one of Java's greatest structural achievements. Your security and business logic will never suffer from missing-break leaks again! In Topic 13, we explore Multiple Case Labels Per Branch (case 1, 2, 3 ->)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
