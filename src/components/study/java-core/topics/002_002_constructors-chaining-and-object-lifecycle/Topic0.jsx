import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import constructorDemoCode from "./topic0_files/ConstructorFundamentalsAndMandatoryInitDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes genesisGlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(14, 165, 233, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-genesis {
            animation: genesisGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Object Genesis &amp; Initialization Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What is a Constructor and Why Object Initialization is Mandatory
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Enter the gateway of object creation in Java: understanding the exact mechanical division of labor between the <code className="text-sky-400 font-mono">new</code> operator (memory allocation) and the Constructor (state initialization), why uninitialized entities trigger catastrophic <code className="text-rose-400 font-mono">NullPointerException</code> crashes, and how constructors guarantee domain invariants from the very instant of birth.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🏛️</span> The 3-Stage Object Genesis Pipeline
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a Java program executes <code className="text-sky-300 font-mono">Student s = new Student(&quot;Swadeep&quot;);</code>, the JVM executes a strict 3-stage creation pipeline:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">Stage 1: Allocation</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                The <code className="text-sky-300 font-mono">new</code> opcode allocates raw zero-filled bytes in Eden Space (numbers set to 0, references to <code className="text-rose-300 font-mono">null</code>).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">Stage 2: Initialization</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                The constructor (<code className="text-emerald-300 font-mono">&lt;init&gt;</code>) executes on <code className="text-emerald-300 font-mono">this</code>, validating arguments and populating fields.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">Stage 3: Assignment</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                The 64-bit Heap address pointer is returned and stored in the caller&apos;s Stack reference variable.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Uninitialized vs Initialized Trainee in Barrackpore Hub):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> was represented by an uninitialized class, his name defaulted to <code className="text-rose-400 font-mono">null</code>, crashing the portal with a <code className="text-rose-400 font-mono">NullPointerException</code> the moment <code className="text-slate-200 font-mono">getUppercaseName()</code> ran! Refactoring into a parameterized constructor guaranteed that all fields were validated and non-null before any method could ever execute!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Object Genesis Architecture: From Raw Bytes to Valid Living Entity
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how the JVM coordinates the <code className="text-sky-300 font-mono">new</code> operator, Eden memory allocation, constructor execution, and Stack assignment:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="Constructor Object Genesis Architecture Diagram"
          >
            <defs>
              <marker
                id="genArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker
                id="initArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>

            {/* Box 1: Caller Stack Frame */}
            <rect x="25" y="25" width="250" height="270" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="150" y="52" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">CALLER STACK FRAME</text>
            <text x="150" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">main() Method Execution</text>

            <rect x="35" y="85" width="230" height="70" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="45" y="105" fill="#fde047" fontSize="9" fontFamily="monospace">Student s = new Student(...);</text>
            <text x="45" y="125" fill="#94a3b8" fontSize="8">1. Evaluates &apos;new&apos; opcode</text>
            <text x="45" y="140" fill="#94a3b8" fontSize="8">2. Invokes constructor &lt;init&gt;</text>

            <rect x="35" y="170" width="230" height="110" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="45" y="192" fill="#bae6fd" fontSize="9" fontWeight="bold">Local Variable Table (LVT):</text>
            <text x="45" y="212" fill="#7dd3fc" fontSize="9" fontFamily="monospace">Slot 1: ref &apos;s&apos; &rarr; 0x4517D9A3</text>
            <text x="45" y="240" fill="#a7f3d0" fontSize="8" fontWeight="bold">&check; Receives initialized reference</text>
            <text x="45" y="258" fill="#a7f3d0" fontSize="8">after constructor completes!</text>

            {/* Box 2: Stage 1 - Eden Space Allocation */}
            <rect x="310" y="25" width="280" height="270" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="450" y="52" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">STAGE 1: RAW HEAP ALLOCATION</text>
            <text x="450" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">&apos;new&apos; Operator in Eden Space</text>

            <rect x="325" y="85" width="250" height="55" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
            <text x="335" y="105" fill="#fef3c7" fontSize="9" fontWeight="bold">Object Header Allocated (12B):</text>
            <text x="335" y="125" fill="#fde68a" fontSize="8" fontFamily="monospace">Mark Word (8B) + Klass Word (4B)</text>

            <rect x="325" y="150" width="250" height="130" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="335" y="172" fill="#e0e7ff" fontSize="9" fontWeight="bold">Zero-Initialization Phase:</text>
            <text x="335" y="192" fill="#c7d2fe" fontSize="8" fontFamily="monospace">studentId   = 0</text>
            <text x="335" y="208" fill="#fca5a5" fontSize="8" fontFamily="monospace">studentName = null (NPE Hazard!)</text>
            <text x="335" y="224" fill="#fca5a5" fontSize="8" fontFamily="monospace">branch      = null (NPE Hazard!)</text>
            <text x="335" y="240" fill="#c7d2fe" fontSize="8" fontFamily="monospace">scholarship = 0.0</text>
            <text x="335" y="265" fill="#f87171" fontSize="8" fontWeight="bold">&times; Unsafe for use until initialized!</text>

            {/* Box 3: Stage 2 - Constructor Fortification */}
            <rect x="625" y="25" width="270" height="270" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="760" y="52" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">STAGE 2: CONSTRUCTOR INITIALIZATION</text>
            <text x="760" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">invokespecial &lt;init&gt; on &apos;this&apos;</text>

            <rect x="635" y="85" width="250" height="60" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="645" y="105" fill="#a7f3d0" fontSize="9" fontWeight="bold">Validation &amp; Invariant Defense:</text>
            <text x="645" y="123" fill="#fde047" fontSize="8" fontFamily="monospace">Objects.requireNonNull(name)</text>
            <text x="645" y="137" fill="#fde047" fontSize="8" fontFamily="monospace">if (id &lt;= 0) throw IllegalArgumentException</text>

            <rect x="635" y="155" width="250" height="125" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="645" y="175" fill="#34d399" fontSize="9" fontWeight="bold">Living Populated State:</text>
            <text x="645" y="195" fill="#a7f3d0" fontSize="8" fontFamily="monospace">this.studentId   = 101</text>
            <text x="645" y="210" fill="#a7f3d0" fontSize="8" fontFamily="monospace">this.studentName = &quot;Swadeep Paul&quot;</text>
            <text x="645" y="225" fill="#a7f3d0" fontSize="8" fontFamily="monospace">this.campusBranch= &quot;Barrackpore&quot;</text>
            <text x="645" y="240" fill="#a7f3d0" fontSize="8" fontFamily="monospace">this.scholarship = 12500.0</text>
            <text x="645" y="265" fill="#fde047" fontSize="8" fontWeight="bold">&check; 100% Invariant Compliant &amp; NPE-Safe</text>

            {/* Arrows */}
            <path d="M 275 115 L 310 115" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#genArrow)" />
            <path d="M 590 200 L 625 200" stroke="#10b981" strokeWidth="2" markerEnd="url(#initArrow)" />
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
            ConstructorFundamentalsAndMandatoryInitDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The executable Java code below demonstrates the perils of uninitialized objects crashing with <code className="text-rose-400 font-mono">NullPointerException</code>, followed by the invariant defense of a robust parameterized constructor:
        </p>

        <JavaFileLoader
          fileName="ConstructorFundamentalsAndMandatoryInitDemo.java"
          code={constructorDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Constructor Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> &apos;new&apos; vs Constructor
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The <code className="text-sky-300 font-mono">new</code> operator allocates raw memory in Eden space; the constructor initializes that allocated memory on <code className="text-sky-300 font-mono">this</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Compiler Default Suppression
            </h3>
            <p className="text-slate-300 leading-relaxed">
              If NO constructor is written, the compiler generates a default no-arg constructor. As soon as you write ANY custom constructor, the compiler default is permanently suppressed.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> No Return Type Allowed
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Constructors have NO return type (not even <code className="text-rose-400 font-mono">void</code>). Adding <code className="text-rose-400 font-mono">void</code> turns the constructor into a normal instance method!
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Invariant Defense at Birth
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Throwing an exception inside a constructor aborts instantiation immediately, preventing an object from ever existing in an invalid state in Heap memory.
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
              <span>❌</span> Pitfall: Accidental &apos;void&apos; Return Type on Constructor
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Adding <code className="text-rose-300 font-mono">void</code> turns the constructor into a standard method. When calling <code className="text-rose-300 font-mono">new Student()</code>, the compiler will call the default no-arg constructor, leaving fields uninitialized!
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// TRAP: This is a METHOD, NOT a constructor!
public void Student(String name) {
    this.name = name; // Never runs during 'new Student()'
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Clean Constructor Signature with Invariant Validation
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Omit return types completely, match the class name exactly, and validate all parameters before binding.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// TRUE CONSTRUCTOR:
public Student(String name) {
    this.name = Objects.requireNonNull(name, "Name required");
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-sky-500/10 via-emerald-500/10 to-indigo-500/10 p-6 md:p-8 rounded-2xl border border-sky-500/30">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why can a constructor NEVER be marked &apos;static&apos;?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          The <code className="text-sky-300 font-mono">static</code> keyword in Java designates a member that belongs to the class itself and executes without any instance context. However, the fundamental purpose of a constructor is to initialize a <strong>specific physical object instance on the Heap</strong> using the <code className="text-emerald-300 font-mono">this</code> reference pointer! Combining <code className="text-rose-400 font-mono">static</code> with a constructor is a fundamental architectural contradiction: you cannot initialize an instance without an instance context!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="An object must never be born in sin. A constructor is the sacred temple where an entity receives its identity, validates its domain truth, and establishes its lifelong invariants. If you guard object birth, your systems will run bug-free forever."
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
          fileName="Topic0_Constructor_Fundamentals_and_Mandatory_Init_Note.txt"
        />
      </section>
    </div>
  );
}