import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import classDemoCode from "./topic2_files/ClassDefinitionSyntaxAndAnatomyDemo.java?raw";
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
          @keyframes glowClass {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-cl {
            animation: glowClass 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Class Structure &amp; Syntax
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Class Definition: Syntax, Anatomy, and Naming Conventions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete architectural anatomy of a production-ready Java class: dissecting the 8 structural sections from package headers and class modifiers to static constants, private instance fields, guarded constructors, static factory methods, validating accessors, and overridden <code className="text-emerald-400 font-mono">equals()</code> &amp; <code className="text-emerald-400 font-mono">hashCode()</code> contracts.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The 8 Structural Sections of a Complete Java Class
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A production Java class is an organized blueprint partitioned into 8 standardized sections:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">1. Header &amp; Imports</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Package declaration, specific imports, and class access modifiers.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">2. Constants &amp; Fields</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                `static final` constants and `private` encapsulated instance variables.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">3. Constructors &amp; Factory</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Guarded object initialization and clean static factory methods.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">4. Methods &amp; Overrides</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Domain business methods, getters/setters, and `equals()`/`hashCode()`.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Academic Records):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> created a complete student profile with 94.0% marks, <strong>Abhronila</strong> was instantiated via a static factory method with 100.0% marks, and our <code className="text-emerald-400 font-mono">equals()</code> test proved that two distinct objects with Roll #101 are logically equal while residing at different Heap addresses!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Class Architecture Anatomy &amp; Memory Equality Dissection
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the 8 class anatomy tiers with the reference equality (`==`) vs logical equality (`equals()`) memory layout:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Class Anatomy and Memory Diagram"
          >
            <defs>
              <linearGradient id="gradAnatLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradAnatRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: 8-Section Class Anatomy */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. CLASS ANATOMY (8 Sections)</text>

            <rect x="45" y="70" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="87" fill="#bae6fd" fontSize="9" fontFamily="monospace">1. package &amp; specific imports</text>

            <rect x="45" y="98" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="115" fill="#bae6fd" fontSize="9" fontFamily="monospace">2. public final class StudentProfile</text>

            <rect x="45" y="126" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="143" fill="#bae6fd" fontSize="9" fontFamily="monospace">3. public static final String ACADEMY_NAME</text>

            <rect x="45" y="154" width="360" height="25" rx="4" fill="#082f49" />
            <text x="55" y="171" fill="#bae6fd" fontSize="9" fontFamily="monospace">4. private int rollNumber; private String fullName;</text>

            <text x="225" y="215" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Constructors → Domain Methods → equals/hashCode</text>

            {/* Right Panel: equals() vs == Memory Layout */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. EQUALITY DISSECTION (== vs .equals())</text>

            <rect x="465" y="70" width="370" height="40" rx="4" fill="#022c22" />
            <text x="475" y="90" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Stack Reference A → Heap Address 0x100 [Roll: 101]</text>
            <text x="475" y="103" fill="#6ee7b7" fontSize="9">Stack Reference B → Heap Address 0x200 [Roll: 101]</text>

            <rect x="465" y="120" width="370" height="35" rx="4" fill="#450a0a" />
            <text x="475" y="142" fill="#fca5a5" fontSize="10" fontFamily="monospace">refA == refB       : FALSE (0x100 != 0x200)</text>

            <rect x="465" y="165" width="370" height="40" rx="4" fill="#022c22" />
            <text x="475" y="185" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">refA.equals(refB)  : TRUE (Both have Roll #101 ✓)</text>

            <text x="650" y="225" fill="#a7f3d0" fontSize="9" textAnchor="middle">Logical Field Equality vs Memory Identity</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Standard class structure ensures maintainability; overriding equals() &amp; hashCode() guarantees correct collection behavior.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Class Modifier &amp; Element Visibility Rules
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Class Element</th>
                <th className="p-3 font-semibold text-emerald-400">Recommended Modifier</th>
                <th className="p-3 font-semibold text-purple-400">Naming Convention</th>
                <th className="p-3 font-semibold text-amber-400">Core Invariant Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Top-Level Class</td>
                <td className="p-3 text-emerald-300">`public` or default</td>
                <td className="p-3 text-purple-300 font-bold">`UpperCamelCase`</td>
                <td className="p-3 text-slate-300 font-sans">Public class name must match `.java` file name</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Static Constants</td>
                <td className="p-3 text-emerald-300">`public static final`</td>
                <td className="p-3 text-amber-300 font-bold">`UPPER_SNAKE_CASE`</td>
                <td className="p-3 text-slate-300 font-sans">Immutable shared constants (no magic numbers)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Instance Fields</td>
                <td className="p-3 text-rose-300 font-bold">`private`</td>
                <td className="p-3 text-purple-300 font-bold">`lowerCamelCase`</td>
                <td className="p-3 text-slate-300 font-sans">Encapsulated state accessed only via methods</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Constructors</td>
                <td className="p-3 text-emerald-300">`public` (or `private`)</td>
                <td className="p-3 text-purple-300 font-bold">Matches Class Name</td>
                <td className="p-3 text-slate-300 font-sans">NO return type (not even `void`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Domain Methods</td>
                <td className="p-3 text-emerald-300">`public`</td>
                <td className="p-3 text-purple-300 font-bold">`lowerCamelCase` verbs</td>
                <td className="p-3 text-slate-300 font-sans">Operate on encapsulated state with validation</td>
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
            ClassDefinitionSyntaxAndAnatomyDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program defines a complete student profile class adhering to the 8 structural anatomy sections.
        </p>

        <JavaFileLoader
          fileModule={classDemoCode}
          title="ClassDefinitionSyntaxAndAnatomyDemo.java"
          highlightLines={[20, 26, 32, 40, 48, 55, 62, 70, 83, 91, 100]}
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
              <span>❌</span> Pitfall 1: Overriding `equals()` Without Overriding `hashCode()`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If you override <code className="text-rose-300 font-mono">equals()</code> but omit <code className="text-rose-300 font-mono">hashCode()</code>, two logically equal objects will produce different hash buckets, breaking <code className="text-slate-300 font-mono">HashSet</code> and <code className="text-slate-300 font-mono">HashMap</code> lookups. Always override both together!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Static Factory Methods for Named Construction
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Static factory methods like <code className="text-emerald-400 font-mono">StudentProfile.createFullMarksStudent(...)</code> provide descriptive names and prevent constructor overloading confusion.
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
            🤔 <em>&ldquo;Why can&apos;t a top-level class in Java be marked `private` or `protected`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Accessibility Scope! A top-level class marked `private` would be accessible to no other code, rendering it completely useless to the JVM ClassLoader. Only nested inner classes can be marked `private` or `protected`!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Class Definition Anatomy FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_001 Topic 2: Class Definition Syntax & Anatomy"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_001_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Master this 8-section blueprint structure. Every professional Java codebase in the world follows this exact anatomical layout. In Topic 3, we dive into Object Instantiation using the 'new' Keyword! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
