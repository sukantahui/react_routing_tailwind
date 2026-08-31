import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dataLeaksDemoCode from "./topic17_files/EncapsulationBestPracticesAndDataLeaksDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shieldPulse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-shield-pulse {
            animation: shieldPulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 17 (Capstone)
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Encapsulation Best Practices &amp; Security
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Encapsulation Best Practices and Avoiding Data Leaks
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the definitive guide to industrial-grade encapsulation: dissecting the 5 insidious data leak vectors (constructor aliasing, getter leaks, array exposures, mutable Date tampering, and premature <code className="text-emerald-400 font-mono">this</code> escapes) and applying Sukanta Hui&apos;s 5-Point Fortification Protocol to build impenetrable domain entities.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🛡️</span> The 5 Major Encapsulation Data Leaks
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Simply making fields <code className="text-emerald-300 font-mono">private</code> is NOT enough to guarantee encapsulation. If references to mutable objects are exposed, external code can mutate Heap memory directly:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-xs mb-1">1. Constructor Leak</h3>
              <p className="text-slate-300 font-sans text-xs">
                Direct assignment of mutable params allows caller to mutate object state externally.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-xs mb-1">2. Getter Leak</h3>
              <p className="text-slate-300 font-sans text-xs">
                Returning live collections lets callers call <code className="text-rose-300">list.clear()</code>.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-xs mb-1">3. Array Leak</h3>
              <p className="text-slate-300 font-sans text-xs">
                Arrays are always mutable; returning raw arrays lets callers overwrite elements.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-xs mb-1">4. Mutable Date</h3>
              <p className="text-slate-300 font-sans text-xs">
                Legacy <code className="text-rose-300">Date.setTime()</code> retroactively corrupts timestamps.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-xs mb-1">5. &apos;this&apos; Escape</h3>
              <p className="text-slate-300 font-sans text-xs">
                Publishing <code className="text-rose-300">this</code> to threads before constructor finishes.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Vulnerable vs Fortified Trainee Profiles):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> used a vulnerable profile with private fields, an external attacker cleared his course list, zeroed his top exam score, and rolled back his admission date to 1970 via mutable references! When refactored into our <code className="text-emerald-400 font-mono">FortifiedTraineeProfile</code> with defensive copies and unmodifiable collection wrappers, every attack was 100% repelled!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 5 Data Leaks vs The 5 Fortified Defensive Seals
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the vulnerable data leak channels with Sukanta Hui&apos;s 5-Point Fortification Protocol:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="Encapsulation Data Leaks vs Defensive Seals Diagram"
          >
            {/* Left Box: Vulnerable Class */}
            <rect x="25" y="25" width="415" height="270" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="232" y="52" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">VULNERABLE ENCAPSULATION (DATA LEAKS)</text>
            <text x="232" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Private Fields with Direct Reference Exposure</text>

            <rect x="40" y="85" width="385" height="35" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="107" fill="#fca5a5" fontSize="9" fontFamily="monospace">Leak 1: this.list = inputList; (Aliased Input)</text>

            <rect x="40" y="125" width="385" height="35" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="147" fill="#fca5a5" fontSize="9" fontFamily="monospace">Leak 2: return this.list; (Caller calls .clear())</text>

            <rect x="40" y="165" width="385" height="35" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="187" fill="#fca5a5" fontSize="9" fontFamily="monospace">Leak 3: return this.scores; (Array mutated: [0]=0)</text>

            <rect x="40" y="205" width="385" height="35" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="227" fill="#fca5a5" fontSize="9" fontFamily="monospace">Leak 4: java.util.Date (Mutated via .setTime(0))</text>

            <rect x="40" y="245" width="385" height="35" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="267" fill="#fca5a5" fontSize="9" fontFamily="monospace">Leak 5: EventBus.register(this) in constructor</text>

            {/* Right Box: Fortified Class */}
            <rect x="480" y="25" width="415" height="270" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="687" y="52" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">FORTIFIED ENCAPSULATION (5 SEALS)</text>
            <text x="687" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Defensive Copying &middot; Immutable Armor</text>

            <rect x="495" y="85" width="385" height="35" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="505" y="107" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Seal 1: this.list = new ArrayList&lt;&gt;(input);</text>

            <rect x="495" y="125" width="385" height="35" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="505" y="147" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Seal 2: return Collections.unmodifiableList(list);</text>

            <rect x="495" y="165" width="385" height="35" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="505" y="187" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Seal 3: return this.scores.clone();</text>

            <rect x="495" y="205" width="385" height="35" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="505" y="227" fill="#a7f3d0" fontSize="9" fontFamily="monospace">Seal 4: Use java.time.LocalDate (Immutable!)</text>

            <rect x="495" y="245" width="385" height="35" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="505" y="267" fill="#fde047" fontSize="9" fontWeight="bold">Seal 5: Complete construction before publishing</text>
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
            EncapsulationBestPracticesAndDataLeaksDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The executable Java code below demonstrates the real-world exploitation of 4 subtle data leaks, followed by the rigorous verification of all 5 fortified defensive seals:
        </p>

        <JavaFileLoader
          fileName="EncapsulationBestPracticesAndDataLeaksDemo.java"
          code={dataLeaksDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Security Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Dual Defensive Copying
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Defensive copying is mandatory on BOTH sides: copy on input in constructors and setters, and copy or unmodify on output in getters.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Modern java.time Immutability
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Never use legacy <code className="text-rose-300 font-mono">java.util.Date</code>. Modern <code className="text-emerald-300 font-mono">java.time.LocalDate</code> and <code className="text-emerald-300 font-mono">Instant</code> are inherently immutable, eliminating temporal data leaks completely.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Avoid Public Static Arrays
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Declaring <code className="text-rose-300 font-mono">public static final String[]</code> allows any class in the JVM to overwrite array elements. Use <code className="text-purple-300 font-mono">List.of(...)</code> instead.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Seal Classes with &apos;final&apos;
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Declare domain classes <code className="text-amber-300 font-mono">final</code> unless explicitly architected for inheritance to prevent malicious subclass overrides from breaking invariant defenses.
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
              <span>❌</span> Pitfall: Publishing &apos;this&apos; in Constructors
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Registering <code className="text-rose-300 font-mono">this</code> in listeners or starting threads inside a constructor exposes partially initialized, corrupted object state to other threads.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// DANGEROUS THIS ESCAPE:
public MyListener() {
    EventBus.register(this); // Escapes before init!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Static Factory Construction
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Complete full constructor initialization first, then register the finished instance via a static factory method.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Two-phase construction
public static MyListener createAndRegister() {
    MyListener l = new MyListener();
    EventBus.register(l);
    return l;
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/10 p-6 md:p-8 rounded-2xl border border-emerald-500/30">
        <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why is Shallow Defensive Copying NOT enough for complex collections?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Writing <code className="text-emerald-300 font-mono">new ArrayList&lt;&gt;(list)</code> creates a <strong>shallow copy</strong>: it clones the list container, but both lists still point to the <em>exact same element objects</em> in Heap memory! If the elements inside the list are mutable (e.g. <code className="text-amber-300 font-mono">List&lt;Address&gt;</code> or <code className="text-amber-300 font-mono">List&lt;Date&gt;</code>), the caller can call <code className="text-rose-400 font-mono">list.get(0).setCity(&quot;Hacked&quot;)</code> and corrupt the object&apos;s state! For complex objects, <strong>Deep Defensive Copying</strong> (cloning each individual element) is strictly required!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Encapsulation is not a single keyword; it is a code of honour. Build your classes with private final state, defensively copy every mutable input and output, and guard your invariants like a fortress. When your foundations are unbreakable, your enterprise software will stand for decades."
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
          fileName="Topic17_Encapsulation_Best_Practices_and_Data_Leaks_Note.txt"
        />
      </section>
    </div>
  );
}
