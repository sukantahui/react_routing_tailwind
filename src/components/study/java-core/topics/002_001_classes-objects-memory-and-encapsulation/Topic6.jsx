import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import npeDemoCode from "./topic6_files/NullReferenceAndNpeAnatomyDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes trapWarning {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-trap-warn {
            animation: trapWarning 2.5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Fault Diagnostics &amp; Defensive Coding
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Null Reference and the Anatomy of <code className="text-rose-400 font-mono">NullPointerException</code> (NPE)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect the anatomy of Java&apos;s most notorious runtime fault: understanding the <code className="text-rose-400 font-mono">null</code> memory literal (<code className="text-slate-300 font-mono">0x00000000</code>), analyzing the 8 classic NPE triggers, exploring Java 14+ JEP 358 Helpful NPE diagnostics, and mastering modern defensive patterns with <code className="text-emerald-400 font-mono">Objects.requireNonNull</code> and <code className="text-emerald-400 font-mono">java.util.Optional</code>.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>💥</span> The 8 Classic Triggers of NullPointerException
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, <code className="text-rose-400 font-mono">null</code> signifies the complete absence of a Heap object address. Attempting any operation that expects a valid physical instance causes the JVM to trigger a hardware trap signal and throw a runtime <code className="text-rose-400 font-mono">NullPointerException</code>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-500/30">
              <span className="text-rose-400 font-bold block mb-1">1. Method Call</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-rose-300">nullRef.toUpperCase()</code> invokes virtual dispatch on zero address.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-500/30">
              <span className="text-rose-400 font-bold block mb-1">2. Field Access</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-rose-300">nullStudent.name</code> attempts reading offset of null pointer.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-500/30">
              <span className="text-rose-400 font-bold block mb-1">3. Array Length</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-rose-300">nullArr.length</code> fails because no array header exists.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-500/30">
              <span className="text-rose-400 font-bold block mb-1">4. Array Indexing</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-rose-300">nullArr[0]</code> fails calculating element memory offset.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30">
              <span className="text-amber-400 font-bold block mb-1">5. Auto-Unboxing</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-amber-300">int x = (Integer) null</code> silently invokes <code className="text-amber-200">.intValue()</code>!
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30">
              <span className="text-amber-400 font-bold block mb-1">6. For-Each Loop</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-amber-300">for (var x : nullList)</code> invokes <code className="text-amber-200">.iterator()</code> on null.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30">
              <span className="text-amber-400 font-bold block mb-1">7. Lock Monitor</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-amber-300">synchronized(nullLock)</code> fails to acquire Mark Word lock.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-500/30">
              <span className="text-amber-400 font-bold block mb-1">8. Throw Null</span>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-amber-300">throw null</code> throws NPE instead of target exception.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Swadeep&apos;s Chained Address Dereference):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> was registered with an unassigned postal address, executing <code className="text-rose-300 font-mono">swadeep.getPostalAddressDirect().getCity().toLowerCase()</code> crashed with a Java 14+ JEP 358 diagnostic: <em className="text-slate-300">&ldquo;Cannot invoke Address.getCity() because the return value of getPostalAddressDirect() is null&rdquo;</em>. Wrapping the return type in <code className="text-emerald-400 font-mono">Optional&lt;Address&gt;</code> completely shielded the application!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Architectural Diagnosis: Null Dereference Trap vs Optional Shield
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the unsafe direct null dereference signal trap with the guarded <code className="text-emerald-400 font-mono">Optional</code> functional shield:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 330"
            className="w-full h-auto"
            aria-label="Null Dereference Trap vs Optional Shield Architecture Diagram"
          >
            <defs>
              <linearGradient id="npeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <linearGradient id="optGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Box: Unsafe Null Dereference Trap */}
            <rect x="25" y="25" width="415" height="280" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="232" y="52" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">UNSAFE DIRECT DEREFERENCE</text>
            <text x="232" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Stack Variable = 0x00000000 (null)</text>

            <rect x="40" y="85" width="385" height="50" rx="6" fill="#450a0a" stroke="#f87171" strokeWidth="1" />
            <text x="50" y="105" fill="#fca5a5" fontSize="10" fontFamily="monospace">swadeep.getPostalAddressDirect()</text>
            <text x="50" y="123" fill="#fecaca" fontSize="11" fontWeight="bold" fontFamily="monospace">&rarr; Returns NULL (0x00000000)</text>

            <rect x="40" y="145" width="385" height="50" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="50" y="165" fill="#bae6fd" fontSize="10" fontFamily="monospace">.getCity() [invokevirtual]</text>
            <text x="50" y="183" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">&rarr; CRASH! Hardware Page Fault Trapped</text>

            <rect x="40" y="205" width="385" height="85" rx="6" fill="#020617" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="225" fill="#f87171" fontSize="10" fontWeight="bold">Java 14+ JEP 358 Diagnostic Message:</text>
            <text x="50" y="245" fill="#fca5a5" fontSize="9" fontFamily="monospace">"Cannot invoke Address.getCity() because the</text>
            <text x="50" y="260" fill="#fca5a5" fontSize="9" fontFamily="monospace"> return value of getPostalAddressDirect() is null"</text>
            <text x="50" y="278" fill="#fecaca" fontSize="9" fontWeight="bold">&rarr; Throws java.lang.NullPointerException</text>

            {/* Right Box: Modern Defensive Optional Shield */}
            <rect x="475" y="25" width="420" height="280" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="685" y="52" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">DEFENSIVE OPTIONAL&lt;T&gt; SHIELD</text>
            <text x="685" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Functional Safe Traversal Pattern</text>

            <rect x="490" y="85" width="390" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="500" y="105" fill="#a7f3d0" fontSize="10" fontFamily="monospace">swadeep.getPostalAddress()</text>
            <text x="500" y="123" fill="#ecfdf5" fontSize="11" fontWeight="bold" fontFamily="monospace">&rarr; Returns Optional.empty()</text>

            <rect x="490" y="145" width="390" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="500" y="165" fill="#a7f3d0" fontSize="10" fontFamily="monospace">.map(Address::getCity)</text>
            <text x="500" y="183" fill="#ecfdf5" fontSize="11" fontWeight="bold" fontFamily="monospace">&rarr; Safely skipped! Still Optional.empty()</text>

            <rect x="490" y="205" width="390" height="85" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="500" y="225" fill="#6ee7b7" fontSize="10" fontWeight="bold">.orElse("Campus Hostel (Default)")</text>
            <text x="500" y="248" fill="#fef08a" fontSize="11" fontWeight="bold" fontFamily="monospace">&rarr; Value: "Campus Hostel (Default)"</text>
            <text x="500" y="272" fill="#a7f3d0" fontSize="10">Zero Exceptions Thrown &middot; 100% Type-Safe Delivery &middot; Production Ready</text>
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
            NullReferenceAndNpeAnatomyDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The runnable source code below reproduces the 8 classic NPE triggers, captures Java 14+ JEP 358 diagnostics, and tests modern defensive validation patterns in real time:
        </p>

        <JavaFileLoader
          fileName="NullReferenceAndNpeAnatomyDemo.java"
          code={npeDemoCode}
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
              <span>📌</span> What Does NOT Throw NPE
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Calling a <code className="text-sky-300 font-mono">static</code> method via a null reference (<code className="text-slate-300 font-mono">nullRef.staticMethod()</code>) and using <code className="text-sky-300 font-mono">null instanceof Type</code> do NOT throw NPEs because static dispatch and type-checks do not dereference the pointer.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Fail-Fast with Objects.requireNonNull
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Always validate constructor and API parameters immediately at the system boundary using <code className="text-emerald-300 font-mono">Objects.requireNonNull(arg, "msg")</code> to prevent null from polluting downstream application layers.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Return Empty Collections, Never Null
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Follow Joshua Bloch&apos;s Effective Java guideline: methods returning collections or arrays should return <code className="text-purple-300 font-mono">Collections.emptyList()</code> or <code className="text-purple-300 font-mono">new int[0]</code> rather than <code className="text-rose-400 font-mono">null</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Yoda Equality Comparisons
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Always write <code className="text-amber-300 font-mono">&quot;Target&quot;.equals(variable)</code> instead of <code className="text-rose-400 font-mono">variable.equals(&quot;Target&quot;)</code>. The literal on the left ensures 100% null safety without defensive if-checks.
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
              <span>❌</span> Pitfall: Catching NullPointerException to Handle Business Logic
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Catching NPE in a try-catch block masks code defects, degrades JVM performance, and can swallow unexpected null pointer bugs in completely different parts of the block.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// ANTI-PATTERN: Never catch NPE for flow control!
try {
    return student.getAddress().getCity();
} catch (NullPointerException e) {
    return "Default City"; // Dangerous!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Explicit Invariants &amp; Optional Traversal
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Model optional associations with <code className="text-emerald-300 font-mono">Optional&lt;T&gt;</code> and use functional chains to declare fallback defaults cleanly.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// CLEAN PATTERN: Functional Optional pipeline
return student.getPostalAddress()
    .map(Address::getCity)
    .orElse("Default City");`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 p-6 md:p-8 rounded-2xl border border-rose-500/30">
        <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why doesn&apos;t the JVM check if (ptr == 0) before every method call?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Adding an explicit software <code className="text-amber-300 font-mono">if (pointer == null)</code> check before every single bytecode instruction would slow down Java program execution by 15% to 25%! Instead, HotSpot relies on the CPU&apos;s Memory Management Unit (MMU). Address 0 is intentionally left unmapped in virtual memory. When dereferenced, the OS hardware triggers a <strong>Page Fault (SIGSEGV)</strong>, which the HotSpot signal handler instantly intercepts and converts into a <code className="text-rose-300 font-mono">NullPointerException</code> with zero steady-state performance overhead!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Never view a NullPointerException as an unfortunate accident. An NPE is the compiler and runtime telling you that you neglected to define a boundary contract. Validate at the entrance, return Optionals at the exit, and your codebase will stand unshakable."
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
          fileName="Topic6_Null_Reference_and_NPE_Anatomy_Note.txt"
        />
      </section>
    </div>
  );
}
