import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import styleDemoCode from "./topic10_files/GoogleJavaStyleCleanCodeDemo.java?raw";
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
          @keyframes glowStyle {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-st {
            animation: glowStyle 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Engineering Standards · Google Java Style
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Writing Clean, Readable Code Conforming to Google Java Style Guide
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master industry-standard source code hygiene: Google Java Style Guide formatting (2-space indents, 100-character column limits, Egyptian braces), identifier naming conventions (<code className="text-sky-300 font-mono">UpperCamelCase</code>, <code className="text-emerald-300 font-mono">lowerCamelCase</code>, <code className="text-amber-300 font-mono">UPPER_SNAKE_CASE</code>), elimination of wildcard imports &amp; magic numbers, and defensive contract guards.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Core Pillars of Google Java Style
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The Google Java Style Guide is the benchmark across Fortune 500 engineering teams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. 2-Space Indentation &amp; Braces</h3>
              <p className="text-sky-300 mb-1">2 Spaces | Egyptian Braces</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                No tabs (<code className="text-rose-300 font-mono">\t</code>). Opening brace on the same line; braces mandatory for all conditionals and loops.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Strict Naming Conventions</h3>
              <p className="text-emerald-300 mb-1">Classes: Upper | Vars: lower</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                UpperCamelCase for Types, lowerCamelCase for methods/variables, and UPPER_SNAKE_CASE for constants.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-2">3. Zero Wildcards &amp; Magic Numbers</h3>
              <p className="text-amber-300 mb-1">No .* | static final Constants</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Specific imports only; all hardcoded business literals extracted to named constants.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Production Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> structured a production student ledger in Indian Rupees (<code className="text-emerald-400 font-semibold">₹79,591.00 Net Revenue</code>), leveraging immutable Java Records, Javadoc comments, and defensive <code className="text-sky-300 font-mono">Objects.requireNonNull()</code> checks.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Google Java Style Architecture &amp; Anatomy
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing code structure, naming conventions, and layout rules:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Google Java Style Guide Anatomy Diagram"
          >
            <defs>
              <linearGradient id="gradStyleLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradStyleRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: Naming Conventions */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. IDENTIFIER NAMING CONVENTIONS</text>

            <rect x="45" y="70" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">Classes / Records : UpperCamelCase (StudentLedgerEntry)</text>

            <rect x="45" y="110" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">Methods / Vars    : lowerCamelCase (computeFinalFee)</text>

            <rect x="45" y="150" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="172" fill="#bae6fd" fontSize="10" fontFamily="monospace">Constants         : UPPER_SNAKE_CASE (GST_TAX_RATE)</text>

            <text x="225" y="215" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Self-Documenting Code | Minimal Variable Scope</text>

            {/* Right Panel: Formatting & Layout Rules */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. FORMATTING &amp; HYGIENE RULES</text>

            <rect x="465" y="70" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="92" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Indentation : 2 Spaces (No tabs, 100-char col width)</text>

            <rect x="465" y="110" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="132" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Imports     : No Wildcards (import java.util.List;)</text>

            <rect x="465" y="150" width="370" height="35" rx="4" fill="#022c22" />
            <text x="475" y="172" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">Validation  : Objects.requireNonNull(param, &quot;msg&quot;)</text>

            <text x="650" y="215" fill="#a7f3d0" fontSize="9" textAnchor="middle">Egyptian Braces | Mandatory Braces on All Conditionals</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Google Java Style guarantees consistency across large distributed engineering teams.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Clean Code Style Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Rule Element</th>
                <th className="p-3 font-semibold text-rose-400">Anti-Pattern (Avoid)</th>
                <th className="p-3 font-semibold text-emerald-400">Google Style Standard (Required)</th>
                <th className="p-3 font-semibold text-amber-400">Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Indentation</td>
                <td className="p-3 text-rose-300">4 spaces or tabs (`\t`)</td>
                <td className="p-3 text-emerald-300 font-bold">Exactly 2 spaces</td>
                <td className="p-3 text-slate-300 font-sans">Consistent display across all terminals and editors</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Imports</td>
                <td className="p-3 text-rose-300">`import java.util.*;`</td>
                <td className="p-3 text-emerald-300 font-bold">`import java.util.List;`</td>
                <td className="p-3 text-slate-300 font-sans">Prevents namespace pollution and name collisions</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Magic Numbers</td>
                <td className="p-3 text-rose-300">`fee * 0.18;`</td>
                <td className="p-3 text-emerald-300 font-bold">`fee * GST_TAX_RATE;`</td>
                <td className="p-3 text-slate-300 font-sans">Self-documenting business intent</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Single-line Ifs</td>
                <td className="p-3 text-rose-300">`if (x &lt; 0) return 0;`</td>
                <td className="p-3 text-emerald-300 font-bold">`if (x &lt; 0) &#123; return 0; &#125;`</td>
                <td className="p-3 text-slate-300 font-sans">Prevents dangling else and accidental multi-line bugs</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Declarations</td>
                <td className="p-3 text-rose-300">`int x, y, z;`</td>
                <td className="p-3 text-emerald-300 font-bold">`int x; int y; int z;`</td>
                <td className="p-3 text-slate-300 font-sans">One variable declaration per line enhances git diffs</td>
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
            GoogleJavaStyleCleanCodeDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program conforms strictly to the Google Java Style Guide, implementing student billing and invoice reporting.
        </p>

        <JavaFileLoader
          fileModule={styleDemoCode}
          title="GoogleJavaStyleCleanCodeDemo.java"
          highlightLines={[18, 23, 27, 34, 40, 56, 60, 72, 85, 96]}
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
              <span>❌</span> Pitfall 1: Omitting Braces on Single-Line Conditionals
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (err) return;</code> without braces makes code fragile to future line additions (e.g. Apple&apos;s famous <code className="text-rose-400 font-mono">goto fail;</code> SSL bug). Always wrap in <code className="text-emerald-400 font-mono">&#123; ... &#125;</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Automate Formatting with `google-java-format`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Integrate <code className="text-emerald-400 font-mono">google-java-format</code> in your IDE on save and CI/CD pre-commit hooks to eliminate code style debates during code reviews entirely.
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
            🤔 <em>&ldquo;Why does Google Java Style require 100 characters per line instead of 80 or 120?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Multi-Window Productivity! A 100-character line width allows software engineers to comfortably view side-by-side code diffs and 3-way git merge windows simultaneously on standard 1080p and 4K displays!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Google Java Style Guide FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 10: Google Java Style Clean Code"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Code is read ten times more often than it is written. Writing clean, style-compliant code is the hallmark of a true professional. In Topic 11, we enter the Segment 1 Comprehensive Multiple Choice Question Exam! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
