import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import aliasingDemoCode from "./topic5_files/MultipleReferencesSingleObjectDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes convergeGlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-converge-glow {
            animation: convergeGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 5
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Object Aliasing &amp; Shared State
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Multiple Reference Variables Pointing to the Same Object
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the mechanics of Object Aliasing in Java: dissecting how multiple independent Stack reference variables converge on a single Heap object instance, the ripple effects of shared mutable state, reference equality (<code className="text-purple-400 font-mono">==</code>), partial pointer nullification, and defensive copying patterns.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <span>🔗</span> The Anatomy of Object Aliasing
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a reference assignment like <code className="text-purple-400 font-mono">BatchProjectAccount coLead = primaryLead;</code> executes, Java does <strong>not</strong> duplicate the object on the Heap. Instead, both reference variables on the Stack receive the identical 64-bit/32-bit Heap memory address pointer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">1. Zero Allocation</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Pointer copying happens purely on the Stack. Zero bytes are allocated in Heap memory.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">2. Shared Mutation</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Modifying fields through any single alias mutates the shared Heap memory seen by all aliases.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">3. GC Reachability</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Nullifying one alias keeps the Heap object alive as long as at least one active reference remains.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore AI Project Ledger):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> created the project ledger with ₹75,000 budget, <strong>Tuhina Das</strong> (Naihati) and the external financial auditor were assigned aliases. When Tuhina recorded a ₹18,500 sensor expense, Swadeep and the auditor instantly saw the available budget decrease to ₹56,500. Even when Swadeep cleared his variable (<code className="text-purple-400 font-mono">leadRef = null</code>), the ledger stayed 100% active in Heap memory via the remaining aliases!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Converging Reference Architecture: 3 Stack Handles &rarr; 1 Heap Object
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing 3 Stack reference variables pointing to the exact same physical Heap instance:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="Multiple Reference Variables Pointing to Single Object Diagram"
          >
            <defs>
              <marker
                id="aliasArrow1"
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
                id="aliasArrow2"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
              </marker>
              <marker
                id="aliasArrow3"
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

            {/* Left Box: Thread Stack Frame */}
            <rect x="25" y="25" width="310" height="270" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
            <text x="180" y="52" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="middle">THREAD CALL STACK</text>
            <text x="180" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Local Reference Variables in main()</text>

            {/* Reference Slot 1: leadRef */}
            <rect x="40" y="85" width="280" height="55" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <text x="50" y="105" fill="#bae6fd" fontSize="10" fontWeight="bold">leadRef (Swadeep)</text>
            <text x="50" y="125" fill="#fef08a" fontSize="11" fontFamily="monospace">Value: 0x72EA2F77</text>

            {/* Reference Slot 2: coLeadRef */}
            <rect x="40" y="150" width="280" height="55" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1" />
            <text x="50" y="170" fill="#e9d5ff" fontSize="10" fontWeight="bold">coLeadRef (Tuhina)</text>
            <text x="50" y="190" fill="#fef08a" fontSize="11" fontFamily="monospace">Value: 0x72EA2F77</text>

            {/* Reference Slot 3: financeAuditorRef */}
            <rect x="40" y="215" width="280" height="55" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
            <text x="50" y="235" fill="#a7f3d0" fontSize="10" fontWeight="bold">financeAuditorRef (Auditor)</text>
            <text x="50" y="255" fill="#fef08a" fontSize="11" fontFamily="monospace">Value: 0x72EA2F77</text>

            {/* Converging Pointers */}
            <path
              d="M 320 115 C 400 115, 430 140, 500 140"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              markerEnd="url(#aliasArrow1)"
            />
            <path
              d="M 320 178 C 390 178, 430 160, 500 160"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.5"
              markerEnd="url(#aliasArrow2)"
            />
            <path
              d="M 320 242 C 400 242, 430 180, 500 180"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              markerEnd="url(#aliasArrow3)"
            />

            {/* Right Box: Single Shared Heap Object */}
            <rect x="500" y="25" width="395" height="270" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
            <text x="697" y="52" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">SINGLE SHARED HEAP OBJECT</text>
            <text x="697" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Physical Heap Address: 0x72EA2F77</text>

            <rect x="515" y="85" width="365" height="30" rx="4" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
            <text x="525" y="105" fill="#f3e8ff" fontSize="10" fontFamily="monospace">Object Header [Mark Word: 8B | Klass Word: 4B]</text>

            {/* Field Data */}
            <rect x="515" y="125" width="365" height="110" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="525" y="145" fill="#bae6fd" fontSize="10" fontFamily="monospace">projectTitle = "Barrackpore AI &amp; Robotics Lab"</text>
            <text x="525" y="165" fill="#bae6fd" fontSize="10" fontFamily="monospace">leadStudent = "Swadeep Paul"</text>
            <text x="525" y="185" fill="#fde047" fontSize="10" fontFamily="monospace">allocatedBudget = ₹75,000.00</text>
            <text x="525" y="205" fill="#f87171" fontSize="10" fontFamily="monospace">totalExpenses   = ₹30,500.00 [Mutated by Tuhina &amp; Auditor]</text>
            <text x="525" y="225" fill="#4ade80" fontSize="10" fontFamily="monospace">remainingBudget = ₹44,500.00</text>

            <text x="697" y="270" fill="#a7f3d0" fontSize="9" textAnchor="middle">Active GC Roots Count = 3 &rarr; 2 &rarr; 1 &rarr; 0 (Collected)</text>
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
            MultipleReferencesSingleObjectDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The complete runnable source code below traces multiple reference aliasing, mutator ripple effects across aliases, external service parameters, and GC reachability:
        </p>

        <JavaFileLoader
          fileName="MultipleReferencesSingleObjectDemo.java"
          code={aliasingDemoCode}
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
              <span>📌</span> Assignment Copies Addresses, Not Objects
            </h3>
            <p className="text-slate-300 leading-relaxed">
              In <code className="text-sky-300 font-mono">b = a;</code>, only the memory address value on the Stack is copied. No constructor is called, and zero bytes of new Heap memory are allocated.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Identity Comparison with <code className="font-mono">==</code>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When two reference variables are aliases, <code className="text-emerald-300 font-mono">ref1 == ref2</code> always evaluates to <code className="text-emerald-300 font-mono">true</code>, and <code className="text-emerald-300 font-mono">System.identityHashCode()</code> yields identical integer hashes.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Reachability &amp; GC Roots
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Setting one reference variable to <code className="text-purple-300 font-mono">null</code> does NOT destroy the object if another active reference variable still holds its address. Only when all reference paths are severed does the object become eligible for Garbage Collection.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Intrinsic Lock Sharing
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Synchronizing on any alias (<code className="text-amber-300 font-mono">synchronized(leadRef)</code>) acquires the monitor lock on the single underlying Heap object, locking out other threads attempting to synchronize on any other alias.
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
              <span>❌</span> Pitfall: Returning Direct References to Mutable Fields
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Returning private mutable fields (like <code className="text-rose-300 font-mono">Date</code> or <code className="text-rose-300 font-mono">ArrayList</code>) creates an external alias, allowing callers to bypass encapsulation and corrupt internal state.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// DANGEROUS: Leaks internal mutable reference!
public List<Student> getStudents() {
    return this.students; // Caller can call .clear() or .add()!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Defensive Copying &amp; Unmodifiable Wrappers
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Return unmodifiable collection wrappers or cloned copies to seal your internal domain data against unexpected external mutations.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Returns unmodifiable view
public List<Student> getStudents() {
    return Collections.unmodifiableList(this.students);
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-purple-500/10 via-sky-500/10 to-emerald-500/10 p-6 md:p-8 rounded-2xl border border-purple-500/30">
        <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
          <span>💡</span> Think About This: How does Immutability turn Aliasing into a Superpower?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          While aliasing causes bugs in mutable objects, it is a massive performance feature for <strong>Immutable Objects</strong>! Because immutable classes (like <code className="text-purple-300 font-mono">String</code>, <code className="text-purple-300 font-mono">Integer</code>, or Java 16+ <code className="text-purple-300 font-mono">record</code>) guarantee their fields can never change after construction, thousands of threads can safely share aliases to a single instance with zero locks, zero synchronization, and zero memory duplication!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Remember the Golden House Analogy: One physical house on the Heap can have ten keys on the Stack. If one tenant paints the kitchen blue, every other tenant opens the door to blue walls. Respect shared state, or build immutable fortresses."
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
          fileName="Topic5_Multiple_References_Aliasing_Note.txt"
        />
      </section>
    </div>
  );
}
