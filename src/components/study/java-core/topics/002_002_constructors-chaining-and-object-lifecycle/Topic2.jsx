import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import constructorVsMethodsDemoCode from "./topic2_files/ConstructorsVsMethodsComparisonDemo.java?raw";
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
          @keyframes comparePulse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-compare {
            animation: comparePulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Core OOP Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Constructors vs Methods: The 10-Point Architectural Comparison
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Demystify the foundational divide of Java Object-Oriented Programming: exploring the precise structural, semantic, and JVM bytecode distinctions between Object Initialization (Constructors) and Operational Behavior (Methods).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The Conceptual Divide: Genesis vs Behavior
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, classes contain two primary callable constructs: <strong>Constructors</strong> and <strong>Methods</strong>. While both contain executable blocks of statements, their roles in the JVM lifecycle are fundamentally distinct:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-5 bg-slate-950 rounded-xl border border-sky-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sky-400 font-bold text-sm">CONSTRUCTOR (&lt;init&gt;)</span>
                <span className="px-2 py-0.5 bg-sky-500/20 text-sky-300 rounded text-[10px]">Birth / Genesis</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Executes <strong>once per object lifetime</strong> during the <code className="text-sky-300 font-mono">new</code> opcode. Its sole purpose is to initialize newly allocated zero-filled bytes in Eden space into a valid, invariant-protected living object.
              </p>
              <div className="text-sky-300 bg-slate-900 p-2 rounded text-[11px]">
                <code>ScholarshipCandidate s = new ScholarshipCandidate(101, &quot;Swadeep&quot;);</code>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-purple-400 font-bold text-sm">METHOD (invokevirtual)</span>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-[10px]">Lifelong Behavior</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Executes <strong>arbitrarily many times</strong> throughout the object's life when explicitly called via the dot (<code className="text-purple-300 font-mono">.</code>) operator. Performs business computations, state mutations, and external interactions.
              </p>
              <div className="text-purple-300 bg-slate-900 p-2 rounded text-[11px]">
                <code>s.evaluateAndAwardScholarship(85.0, 15000.00);</code>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Barrackpore Classroom Story (Sukanta Hui):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> enrolls at the Barrackpore center, his <strong>Admission Form &amp; Registration</strong> is the Constructor—it assigns his permanent Roll Number and sets up his profile once. His daily test appearances, attendance submissions, and fee updates are <strong>Methods</strong>, called repeatedly throughout his course!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Architectural Comparison Matrix: Constructors vs Methods
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the JVM opcode dispatch, lifecycle triggers, and syntactic laws separating Constructors from Methods:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 340"
            className="w-full h-auto animate-compare"
            aria-label="Constructors vs Methods Architectural Comparison Diagram"
          >
            <defs>
              <marker id="arrow1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker id="arrow2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#c084fc" />
              </marker>
            </defs>

            {/* Column 1: Constructor Box */}
            <rect x="30" y="30" width="410" height="280" rx="12" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="235" y="60" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">CONSTRUCTOR (&lt;init&gt;)</text>
            <text x="235" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">Opcode: invokespecial | Runs Once at Birth</text>

            <rect x="50" y="100" width="370" height="35" rx="6" fill="#0369a1" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
            <text x="65" y="122" fill="#e0f2fe" fontSize="10" fontFamily="monospace">Trigger: Implicitly during 'new' keyword</text>

            <rect x="50" y="145" width="370" height="35" rx="6" fill="#0369a1" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
            <text x="65" y="167" fill="#e0f2fe" fontSize="10" fontFamily="monospace">Return Type: NO return type (not even void)</text>

            <rect x="50" y="190" width="370" height="35" rx="6" fill="#0369a1" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
            <text x="65" y="212" fill="#e0f2fe" fontSize="10" fontFamily="monospace">Name: EXACT match with class name</text>

            <rect x="50" y="235" width="370" height="35" rx="6" fill="#0369a1" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
            <text x="65" y="257" fill="#e0f2fe" fontSize="10" fontFamily="monospace">Inheritance / Overriding: FORBIDDEN</text>

            <rect x="50" y="280" width="370" height="20" rx="4" fill="#0c4a6e" />
            <text x="235" y="294" fill="#bae6fd" fontSize="9" textAnchor="middle">Default Generated: YES (if zero constructors written)</text>

            {/* Column 2: Method Box */}
            <rect x="480" y="30" width="410" height="280" rx="12" fill="#0f172a" stroke="#9333ea" strokeWidth="2" />
            <text x="685" y="60" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">METHOD (invokevirtual)</text>
            <text x="685" y="80" fill="#94a3b8" fontSize="10" textAnchor="middle">Opcode: invokevirtual / invokestatic | Lifelong</text>

            <rect x="500" y="100" width="370" height="35" rx="6" fill="#581c87" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1" />
            <text x="515" y="122" fill="#f5d0fe" fontSize="10" fontFamily="monospace">Trigger: Explicitly called via dot (.) operator</text>

            <rect x="500" y="145" width="370" height="35" rx="6" fill="#581c87" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1" />
            <text x="515" y="167" fill="#f5d0fe" fontSize="10" fontFamily="monospace">Return Type: MANDATORY (type or void)</text>

            <rect x="500" y="190" width="370" height="35" rx="6" fill="#581c87" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1" />
            <text x="515" y="212" fill="#f5d0fe" fontSize="10" fontFamily="monospace">Name: Any valid identifier (camelCase)</text>

            <rect x="500" y="235" width="370" height="35" rx="6" fill="#581c87" fillOpacity="0.2" stroke="#c084fc" strokeWidth="1" />
            <text x="515" y="257" fill="#f5d0fe" fontSize="10" fontFamily="monospace">Inheritance / Overriding: PERMITTED</text>

            <rect x="500" y="280" width="370" height="20" rx="4" fill="#3b0764" />
            <text x="685" y="294" fill="#f0abfc" fontSize="9" textAnchor="middle">Default Generated: NEVER (must be coded by developer)</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown Table */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📋</span> Complete 10-Point Technical Comparison Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-700 font-mono">
              <tr>
                <th className="p-3 text-sky-400">#</th>
                <th className="p-3 text-sky-400">Feature</th>
                <th className="p-3 text-sky-300">Constructor</th>
                <th className="p-3 text-purple-300">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">1</td>
                <td className="p-3 font-semibold text-white">Primary Purpose</td>
                <td className="p-3">Initialize newly allocated Heap memory &amp; domain invariants</td>
                <td className="p-3">Execute business behavior &amp; perform calculations on state</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">2</td>
                <td className="p-3 font-semibold text-white">Invocation Trigger</td>
                <td className="p-3 font-mono text-sky-300">Implicitly via 'new', this(), super()</td>
                <td className="p-3 font-mono text-purple-300">Explicitly via dot (.) operator</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">3</td>
                <td className="p-3 font-semibold text-white">Return Type</td>
                <td className="p-3 text-rose-300 font-semibold">NO return type (not even void)</td>
                <td className="p-3 text-emerald-300">MANDATORY return type or void</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">4</td>
                <td className="p-3 font-semibold text-white">Identifier Name</td>
                <td className="p-3">Must match class name with exact case sensitivity</td>
                <td className="p-3">Any valid Java identifier (lowerCamelCase verb)</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">5</td>
                <td className="p-3 font-semibold text-white">Inheritance</td>
                <td className="p-3 text-rose-300">NOT inherited by subclasses</td>
                <td className="p-3 text-emerald-300">Inherited by subclasses (based on visibility)</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">6</td>
                <td className="p-3 font-semibold text-white">Overriding</td>
                <td className="p-3 text-rose-300">CANNOT be overridden</td>
                <td className="p-3 text-emerald-300">CAN be overridden polymorphically</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">7</td>
                <td className="p-3 font-semibold text-white">Default Synthesis</td>
                <td className="p-3 text-emerald-300">Compiler generates no-arg if zero written</td>
                <td className="p-3 text-rose-300">Compiler NEVER generates default methods</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">8</td>
                <td className="p-3 font-semibold text-white">static Modifier</td>
                <td className="p-3 text-rose-300">PROHIBITED (requires 'this' context)</td>
                <td className="p-3 text-emerald-300">PERMITTED for class-level utility routines</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">9</td>
                <td className="p-3 font-semibold text-white">Other Modifiers</td>
                <td className="p-3">Access modifiers only (public, prot, pkg, priv)</td>
                <td className="p-3">final, abstract, synchronized, native, static, default</td>
              </tr>
              <tr className="hover:bg-slate-800/60">
                <td className="p-3 font-mono text-slate-400">10</td>
                <td className="p-3 font-semibold text-white">Bytecode Opcode</td>
                <td className="p-3 font-mono text-amber-300">invokespecial &lt;init&gt;</td>
                <td className="p-3 font-mono text-amber-300">invokevirtual, invokestatic, invokeinterface</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Runnable Java Source Code
        </h2>
        <p className="text-sm text-slate-400">
          Observe how the <code className="text-sky-300 font-mono">ScholarshipCandidate</code> class demonstrates constructor initialization, instance method evaluation, and static method utilities:
        </p>
        <JavaFileLoader
          fileModule={constructorVsMethodsDemoCode}
          title="ConstructorsVsMethodsComparisonDemo.java"
          highlightLines={[58, 81, 99, 155, 159, 168]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Traps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="p-4 bg-rose-950/30 rounded-xl border border-rose-800/40 space-y-2">
            <h3 className="text-rose-300 font-bold text-sm">1. The Return Type Silent Trap</h3>
            <p className="text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">public void Student()</code> compiles with zero errors, but converts the constructor into a normal method! The object fields will silently remain <code className="text-rose-300 font-mono">null</code> and <code className="text-rose-300 font-mono">0</code> upon <code className="text-slate-200 font-mono">new Student()</code>.
            </p>
          </div>

          <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-800/40 space-y-2">
            <h3 className="text-amber-300 font-bold text-sm">2. Calling Overridable Methods in Constructors</h3>
            <p className="text-slate-300 leading-relaxed">
              Never call non-final public methods inside a constructor. If a child class overrides that method, the child override runs <em>before</em> the child's own constructor executes, operating on uninitialized child fields!
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
          <span>💡</span> Think About This... (Conceptual Check)
        </h2>
        <ul className="space-y-3 text-slate-300 text-sm list-disc pl-5 leading-relaxed">
          <li>
            Why did the designers of Java invent <code className="text-sky-300 font-mono">static factory methods</code> (like <code className="text-emerald-300 font-mono">Integer.valueOf(100)</code> or <code className="text-emerald-300 font-mono">List.of(...)</code>) when standard constructors were already available?
          </li>
          <li>
            If a class has 5 constructors and 10 methods, how many total <code className="text-purple-300 font-mono">&lt;init&gt;</code> bytecode methods will appear in the compiled <code className="text-amber-300 font-mono">.class</code> file?
          </li>
        </ul>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Constructors vs Methods FAQs (30 Technical Q&As)"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_002 Topic 2: Constructors vs Methods Detailed Comparison"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_002_topic2_constructors_vs_methods_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <Teacher
        note="Remember my 10-point matrix: A constructor is your birth certificate—invoked once by the JVM to build your foundation. Methods are your skills and actions—called repeatedly throughout your life. Never mix them up, and never put 'void' on your constructor! — Sukanta Hui"
      />
    </div>
  );
}
