import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import instantiationDemoCode from "./topic3_files/ObjectInstantiationNewKeywordDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseGlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.35)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.75)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-glow {
            animation: pulseGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Object Creation &amp; Runtime Lifecycle
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Object Instantiation using the <code className="text-sky-400 font-mono">'new'</code> Keyword
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Unveil the precise 5-phase JVM lifecycle triggered when the <code className="text-sky-400 font-mono">new</code> operator executes: exploring dynamic Heap allocation in Eden space, the HotSpot 64-bit Object Header (Mark Word &amp; Klass Word), default zero-initialization, instance blocks, and constructor binding.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>⚡</span> The 5 Sequential Phases of <code className="font-mono">new ClassName()</code>
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a Java statement like <code className="text-emerald-400 font-mono">CourseEnrollment student = new CourseEnrollment(1001, "Swadeep", "Java", 8500.0);</code> executes, the JVM carries out 5 rigorous internal operations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30 flex flex-col justify-between">
              <div>
                <span className="text-sky-400 font-bold block mb-1">Phase 1</span>
                <h3 className="text-white font-bold text-xs mb-1">Class Loading</h3>
                <p className="text-slate-400 font-sans text-xs">
                  Locates <code className="text-sky-300">.class</code>, loads to Metaspace, runs static initializers once.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <span className="text-indigo-400 font-bold block mb-1">Phase 2</span>
                <h3 className="text-white font-bold text-xs mb-1">Heap Allocation</h3>
                <p className="text-slate-400 font-sans text-xs">
                  Calculates size (Header + Fields + 8B Padding) &amp; claims Eden memory.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30 flex flex-col justify-between">
              <div>
                <span className="text-purple-400 font-bold block mb-1">Phase 3</span>
                <h3 className="text-white font-bold text-xs mb-1">Zero Init</h3>
                <p className="text-slate-400 font-sans text-xs">
                  Fills memory with type defaults: <code className="text-purple-300">0, 0.0, false, null</code>.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 flex flex-col justify-between">
              <div>
                <span className="text-amber-400 font-bold block mb-1">Phase 4</span>
                <h3 className="text-white font-bold text-xs mb-1">Instance Inits</h3>
                <p className="text-slate-400 font-sans text-xs">
                  Executes field defaults &amp; <code className="text-amber-300">&#123; ... &#125;</code> instance initializer blocks.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-emerald-400 font-bold block mb-1">Phase 5</span>
                <h3 className="text-white font-bold text-xs mb-1">Constructor</h3>
                <p className="text-slate-400 font-sans text-xs">
                  Runs <code className="text-emerald-300">&lt;init&gt;()</code>, validates invariants, and returns Heap pointer to Stack.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore &amp; Naihati Labs):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> was registered in our Barrackpore lab, Phase 1 loaded the academy static metadata into Metaspace. When <strong>Tuhina Das</strong> registered next in Naihati, Phase 1 was completely bypassed because the class definition was already compiled in memory!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Architectural Memory Model: Stack Pointer &amp; Heap Object Anatomy
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the JVM Stack frame holding the 64-bit reference address pointing to the Eden Heap Object Layout (Mark Word, Klass Word, Instance Fields, and 8-byte Alignment Padding):
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 900 320"
            className="w-full h-auto"
            aria-label="Object Instantiation Stack and Heap Memory Diagram"
          >
            <defs>
              <linearGradient id="stackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id="heapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
            </defs>

            {/* Left Box: Thread Stack Frame */}
            <rect x="30" y="30" width="260" height="260" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="160" y="60" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Thread Call Stack</text>
            <text x="160" y="78" fill="#94a3b8" fontSize="10" textAnchor="middle">main() Stack Frame</text>

            <rect x="45" y="100" width="230" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">swadeepEnrollment</text>
            <text x="55" y="142" fill="#fef08a" fontSize="12" fontWeight="bold" fontFamily="monospace">Value: 0x7BA4F24F</text>

            <rect x="45" y="175" width="230" height="60" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="55" y="197" fill="#94a3b8" fontSize="11" fontFamily="monospace">tuhinaEnrollment</text>
            <text x="55" y="217" fill="#86efac" fontSize="12" fontWeight="bold" fontFamily="monospace">Value: 0x5D099F62</text>

            <text x="160" y="270" fill="#64748b" fontSize="10" textAnchor="middle">Holds 32/64-bit Reference Pointers</text>

            {/* Connecting Pointer Arrow */}
            <path
              d="M 275 130 C 350 130, 390 100, 445 100"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              markerEnd="url(#arrow)"
            />

            {/* Right Box: JVM Heap Memory (Eden Space) */}
            <rect x="450" y="30" width="420" height="260" rx="10" fill="#0f172a" stroke="#059669" strokeWidth="2" />
            <text x="660" y="55" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">JVM Heap (Eden Generation)</text>
            <text x="660" y="72" fill="#94a3b8" fontSize="10" textAnchor="middle">Memory Address: 0x7BA4F24F</text>

            {/* Object Header Section */}
            <rect x="465" y="85" width="390" height="32" rx="4" fill="#042f2e" stroke="#10b981" strokeWidth="1" />
            <text x="475" y="105" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Mark Word (8B) : HashCode, GC Age, Lock State</text>

            <rect x="465" y="122" width="390" height="32" rx="4" fill="#042f2e" stroke="#10b981" strokeWidth="1" />
            <text x="475" y="142" fill="#a7f3d0" fontSize="10" fontFamily="monospace">Klass Word (4/8B) : Pointer to Metaspace Class Metadata</text>

            {/* Instance Fields Section */}
            <rect x="465" y="160" width="390" height="70" rx="4" fill="#134e4a" stroke="#14b8a6" strokeWidth="1" />
            <text x="475" y="180" fill="#ccfbf1" fontSize="10" fontFamily="monospace">int enrollmentId = 1001 (4 Bytes)</text>
            <text x="475" y="196" fill="#ccfbf1" fontSize="10" fontFamily="monospace">String studentName = "Swadeep Paul" (Reference Pointer)</text>
            <text x="475" y="212" fill="#ccfbf1" fontSize="10" fontFamily="monospace">double courseFeeInr = 8500.00 (8 Bytes)</text>

            {/* Padding Section */}
            <rect x="465" y="235" width="390" height="25" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            <text x="475" y="252" fill="#94a3b8" fontSize="10" fontFamily="monospace">Alignment Padding (0-7 Bytes to round to 8-byte boundary)</text>

            <text x="660" y="280" fill="#6ee7b7" fontSize="10" textAnchor="middle">Physical Object Size = Header + Fields + Padding</text>
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
            ObjectInstantiationNewKeywordDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The complete runnable source code below traces the 5 JVM instantiation phases in real-time, validates domain parameters, and demonstrates anonymous object garbage-collection eligibility:
        </p>

        <JavaFileLoader
          fileName="ObjectInstantiationNewKeywordDemo.java"
          code={instantiationDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; JVM Technical Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Reference vs Object Identity
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The <code className="text-sky-300 font-mono">new</code> keyword produces a reference memory address. The variable on the Stack only holds this pointer. Two distinct objects created with identical parameters will have distinct Heap memory addresses (<code className="text-red-400 font-mono">objA == objB</code> is <code className="text-red-400 font-mono">false</code>).
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> HotSpot Object Header Structure
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Every Java object in memory has an overhead of 12 to 16 bytes: an 8-byte <strong>Mark Word</strong> (hash, GC age, lock state) and a 4/8-byte <strong>Klass Word</strong> (Metaspace type pointer).
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Bytecode Triad: <code className="font-mono">new</code>, <code className="font-mono">dup</code>, <code className="font-mono">invokespecial</code>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The Java compiler emits 3 consecutive bytecode instructions: <code className="text-purple-300 font-mono">new</code> to allocate uninitialized Heap space, <code className="text-purple-300 font-mono">dup</code> to duplicate the pointer, and <code className="text-purple-300 font-mono">invokespecial &lt;init&gt;</code> to run the constructor.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Anonymous Object Lifecycle
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Writing <code className="text-amber-300 font-mono">new CourseEnrollment(...).displayCard();</code> creates an object without storing it in a named reference variable. It is immediately eligible for Garbage Collection once the statement completes.
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
              <span>❌</span> Anti-Pattern: Allowing 'this' to Escape during Construction
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Publishing the object reference to an event listener or starting a thread inside a constructor exposes partially initialized, invalid state to other threads.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// UNSAFE: 'this' escapes before fields are set!
public CourseManager(EventListener listener) {
    listener.register(this); // Dangerous race condition!
    this.academyId = 101;
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Safe Construction &amp; Guarded Invariants
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Perform all validation and field initialization first. Only register or publish the object via a static factory method after the constructor returns cleanly.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Static Factory Method pattern
public static CourseManager createAndRegister(EventListener listener) {
    CourseManager mgr = new CourseManager(101);
    listener.register(mgr); // Fully constructed!
    return mgr;
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-sky-500/10 p-6 md:p-8 rounded-2xl border border-amber-500/30">
        <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
          <span>💡</span> Think About This: Can the JVM allocate objects without Heap memory?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Through a JIT compiler optimization known as <strong>Escape Analysis</strong> (Scalar Replacement), if the JVM proves that an object created via <code className="text-amber-300 font-mono">new Point(x, y)</code> never escapes the method scope (never returned, never stored in a field, never shared across threads), the JVM can deconstruct the object and allocate its primitive fields directly onto the CPU registers or Stack frame, eliminating Heap allocation and Garbage Collection overhead entirely!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="When you type 'new', you are not just allocating bytes in RAM—you are ushering a new autonomous entity into existence. Guard its creation with rigorous validations so that no invalid object ever walks the memory of your application."
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
          fileName="Topic3_Object_Instantiation_New_Keyword_Note.txt"
        />
      </section>
    </div>
  );
}
