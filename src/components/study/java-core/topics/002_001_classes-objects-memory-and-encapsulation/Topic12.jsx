import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import accessModifiersDemoCode from "./topic12_files/AccessModifiersOverviewDemo.java?raw";
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
          @keyframes expandRings {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.02); opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-rings {
            animation: expandRings 4s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Visibility &amp; Access Control Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Access Modifiers Overview: <code className="text-purple-400 font-mono">private</code>, <code className="text-sky-400 font-mono">default</code>, <code className="text-amber-400 font-mono">protected</code>, <code className="text-emerald-400 font-mono">public</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete 4-tier visibility architecture of Java: analyzing the full 4x4 access matrix, understanding package boundaries, cross-package subclass inheritance rules with <code className="text-amber-400 font-mono">protected</code>, method overriding visibility constraints, and applying the Principle of Least Privilege.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>📊</span> The Complete 4x4 Access Control Matrix
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java controls member and type visibility across 4 architectural scopes:
          </p>

          <div className="w-full overflow-x-auto rounded-xl border border-slate-700 bg-slate-950 p-4 font-mono text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-sky-400">
                  <th className="py-2.5 px-3">Access Modifier</th>
                  <th className="py-2.5 px-3 text-center">Same Class</th>
                  <th className="py-2.5 px-3 text-center">Same Package</th>
                  <th className="py-2.5 px-3 text-center">Subclass (Diff Pkg)</th>
                  <th className="py-2.5 px-3 text-center">World (Anywhere)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-purple-400">private</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-sky-400">default (package-private)</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-amber-400">protected</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">public</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300 space-y-2">
            <p className="font-medium text-indigo-300">Classroom Case Study (Barrackpore Person &amp; Trainee Hierarchy):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> extended <code className="text-sky-300 font-mono">AcademyPerson</code>, his subclass gained direct access to <code className="text-amber-400 font-mono">protected double scholarshipAllowanceInr</code> and <code className="text-emerald-400 font-mono">public String personFullName</code>, but his private national ID remained completely hidden within the parent class.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Concentric Rings of Visibility: From Inner Sanctum to Global Highway
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing Sukanta Hui&apos;s 4 concentric rings of Java access control:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 330"
            className="w-full h-auto"
            aria-label="Concentric Rings of Java Access Modifiers Diagram"
          >
            {/* Ring 4: Public (Global Highway) */}
            <rect x="25" y="25" width="870" height="280" rx="14" fill="#022c22" stroke="#10b981" strokeWidth="2" />
            <text x="50" y="52" fill="#34d399" fontSize="12" fontWeight="bold">RING 4: PUBLIC (The Global Highway)</text>
            <text x="50" y="68" fill="#a7f3d0" fontSize="9">Accessible by all classes across all packages &amp; modules</text>

            {/* Ring 3: Protected (Extended Family) */}
            <rect x="60" y="80" width="800" height="210" rx="12" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
            <text x="80" y="105" fill="#fde68a" fontSize="12" fontWeight="bold">RING 3: PROTECTED (The Extended Family)</text>
            <text x="80" y="120" fill="#fef3c7" fontSize="9">Accessible in same package + all subclasses across different packages</text>

            {/* Ring 2: Default (The Village) */}
            <rect x="100" y="135" width="720" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
            <text x="120" y="158" fill="#bae6fd" fontSize="12" fontWeight="bold">RING 2: DEFAULT / PACKAGE-PRIVATE (The Village)</text>
            <text x="120" y="172" fill="#bae6fd" fontSize="9">Accessible only to classes residing within the exact same package</text>

            {/* Ring 1: Private (Inner Sanctum) */}
            <rect x="140" y="188" width="640" height="75" rx="8" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
            <text x="160" y="212" fill="#f3e8ff" fontSize="12" fontWeight="bold">RING 1: PRIVATE (The Inner Sanctum)</text>
            <text x="160" y="228" fill="#e9d5ff" fontSize="9">Strictly confined to the enclosing declaring class and its nestmates</text>
            <text x="160" y="246" fill="#fde047" fontSize="9" fontWeight="bold">&check; Foundation of True OOP Encapsulation &amp; Data Hiding</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Live Interactive Java Demonstration */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
            <span>💻</span> Production Java Demonstration
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
            AccessModifiersOverviewDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The code below demonstrates all 4 access levels inside the declaring class, inherited subclass access across package boundaries, and same-package collaborator access:
        </p>

        <JavaFileLoader
          fileName="AccessModifiersOverviewDemo.java"
          code={accessModifiersDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Overriding Visibility Rule
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When overriding a method in a subclass, visibility can stay the same or widen (e.g. <code className="text-sky-300 font-mono">protected &rarr; public</code>), but can NEVER be narrowed (<code className="text-rose-400 font-mono">public &rarr; protected</code> causes a compile error).
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Top-Level Class Constraints
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Top-level outer classes can only be <code className="text-emerald-300 font-mono">public</code> or <code className="text-emerald-300 font-mono">package-private</code> (no modifier). They can never be <code className="text-rose-400 font-mono">private</code> or <code className="text-rose-400 font-mono">protected</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Sub-Packages Are Independent
            </h3>
            <p className="text-slate-300 leading-relaxed">
              In Java, <code className="text-purple-300 font-mono">com.app.core</code> and <code className="text-purple-300 font-mono">com.app.core.util</code> are treated as two distinct, unrelated packages. They do NOT share package-private access.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Principle of Least Privilege
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Always start by declaring members <code className="text-amber-300 font-mono">private</code>. Elevate to <code className="text-amber-300 font-mono">package-private</code> for subsystem collaboration, <code className="text-amber-300 font-mono">protected</code> for template hooks, and <code className="text-amber-300 font-mono">public</code> only for stable API contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Defensive Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Bad Practice */}
          <div className="p-5 bg-rose-950/20 rounded-xl border border-rose-500/30 space-y-3">
            <h3 className="text-rose-400 font-bold text-base flex items-center gap-2">
              <span>❌</span> Pitfall: Declaring Protected Fields in Public Classes
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Declaring fields <code className="text-rose-300 font-mono">protected</code> exposes them to all classes in the same package and creates permanent subclass dependencies that cannot be refactored later.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// DANGEROUS: Protected field locks implementation
public class Parent {
    protected double balance; // Hard to refactor later!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Private Fields with Protected Accessors
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Keep fields private and provide <code className="text-emerald-300 font-mono">protected</code> getter/setter methods for subclasses, preserving encapsulation and safe refactoring.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Private field with protected accessor
public class Parent {
    private double balance;
    protected double getBalance() { return balance; }
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 p-6 md:p-8 rounded-2xl border border-indigo-500/30">
        <h2 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why does Java forbid private abstract methods?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          The <code className="text-indigo-300 font-mono">abstract</code> keyword is an explicit command demanding that a subclass <strong>must</strong> provide an implementation. However, the <code className="text-indigo-300 font-mono">private</code> keyword dictates that the method is strictly invisible to all subclasses! Combining them creates an unresolvable architectural paradox: a subclass would be forced to override a method it is not permitted to see! Hence, the compiler rejects <code className="text-rose-400 font-mono">private abstract</code> on sight.
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Think of Java's access modifiers as concentric rings of trust: Private is your inner sanctum, Default is your local village, Protected is your extended family, and Public is the global highway. Guard your sanctum and open only official gates to the highway."
        mentor="Sukanta Hui"
        role="Lead Java Architect & Senior Academic Mentor"
        location="Barrackpore & Naihati Campus, West Bengal"
      />

      {/* Section 8: FAQ Catalog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>❓</span> Frequently Asked Technical Questions (30 Q&amp;As)
        </h2>
        <FAQTemplate questions={questions} />
      </section>

      {/* Section 9: Plain Text Printable Reference */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-300 flex items-center gap-2">
            <span>🖨️</span> Printable Quick Reference Note
          </h2>
        </div>
        <PlainTextPrint
          content={noteText}
          fileName="Topic12_Access_Modifiers_Overview_Note.txt"
        />
      </section>
    </div>
  );
}
