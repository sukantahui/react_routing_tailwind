import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import anonymousDemoCode from "./topic9_files/AnonymousObjectsAndUseCasesDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes singlePulse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-single-pulse {
            animation: singlePulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 9
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Single-Use Invocations &amp; Memory Dynamics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Anonymous Objects: Creation and Valid Use Cases
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore the mechanics and production patterns of Anonymous Objects in Java: analyzing fire-and-forget single-statement executions, transient method parameter passing, immediate Garbage Collection eligibility, and dissecting the dangerous &ldquo;state loss&rdquo; anti-pattern when mutating unnamed instances.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>⚡</span> The 4 Valid Production Use Cases for Anonymous Objects
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An anonymous object is created when <code className="text-amber-300 font-mono">new ClassName(...)</code> executes without storing its 64-bit Heap address into a named reference variable on the Stack. It has 4 primary production use cases:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">1. Fire &amp; Forget</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Executing a single action: <code className="text-amber-300">new Dispatcher().sendAlert()</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">2. Method Argument</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Passing transient payload: <code className="text-sky-300">ledger.record(new Receipt(...))</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">3. Factory Return</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Returning new instances cleanly: <code className="text-emerald-300">return new StudentRecord(...)</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">4. Chained Execution</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Chaining fluent methods on a single unnamed builder pipeline.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Classroom Case Study (Barrackpore Fee Accounting Ledger):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> and <strong>Tuhina Das</strong> submitted payments, passing anonymous <code className="text-amber-300 font-mono">new PaymentGatewayReceipt(&quot;TXN-9081&quot;, &quot;Swadeep&quot;, 8500.0)</code> into the ledger allowed the accounting service to extract the fee and update cumulative revenue without polluting the caller&apos;s Stack frame with single-use temporary variables!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Anonymous Object Memory Lifecycle: Creation &rarr; Execution &rarr; Immediate GC
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how the JVM manages Stack operand evaluation, Heap allocation in Eden, and instantaneous Garbage Collection eligibility upon statement completion:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 310"
            className="w-full h-auto"
            aria-label="Anonymous Object Memory Lifecycle Diagram"
          >
            <defs>
              <marker
                id="execArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
              <marker
                id="gcArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>

            {/* Left Box: Thread Stack Frame */}
            <rect x="25" y="25" width="280" height="260" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="165" y="52" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">CALLER STACK FRAME</text>
            <text x="165" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Local Variable Table (LVT)</text>

            <rect x="40" y="85" width="250" height="70" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="50" y="105" fill="#f87171" fontSize="10" fontWeight="bold">NO Named Variable Created!</text>
            <text x="50" y="125" fill="#94a3b8" fontSize="9" fontFamily="monospace">LVT Slot = Empty / Unused</text>
            <text x="50" y="142" fill="#94a3b8" fontSize="9">Reference stays only on Operand Stack</text>

            <rect x="40" y="170" width="250" height="95" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <text x="50" y="190" fill="#bae6fd" fontSize="9" fontWeight="bold">Bytecode Pipeline:</text>
            <text x="50" y="208" fill="#fef08a" fontSize="9" fontFamily="monospace">1. new &amp; dup (Pushes 0x4517D9A3)</text>
            <text x="50" y="224" fill="#fef08a" fontSize="9" fontFamily="monospace">2. invokespecial &lt;init&gt;</text>
            <text x="50" y="240" fill="#fef08a" fontSize="9" fontFamily="monospace">3. invokevirtual dispatchSms</text>
            <text x="50" y="256" fill="#f87171" fontSize="8">&rarr; Semicolon pops reference!</text>

            {/* Middle Box: Target Anonymous Heap Object */}
            <rect x="345" y="25" width="310" height="260" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="500" y="52" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">ANONYMOUS HEAP OBJECT</text>
            <text x="500" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Address: 0x4517D9A3 (Eden Space)</text>

            <rect x="360" y="85" width="280" height="35" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
            <text x="370" y="107" fill="#fde68a" fontSize="9" fontFamily="monospace">Mark Word (8B) + Klass Word (4B)</text>

            <rect x="360" y="130" width="280" height="75" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="370" y="150" fill="#e0e7ff" fontSize="9" fontFamily="monospace">campusHub = "Barrackpore"</text>
            <text x="370" y="170" fill="#4ade80" fontSize="9" fontFamily="monospace">Method: dispatchSmsNotification()</text>
            <text x="370" y="190" fill="#bae6fd" fontSize="9" fontFamily="monospace">Runs successfully on &apos;this&apos;!</text>

            <rect x="360" y="215" width="280" height="55" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="370" y="235" fill="#fca5a5" fontSize="9" fontWeight="bold">Post-Execution State:</text>
            <text x="370" y="252" fill="#fca5a5" fontSize="9" fontFamily="monospace">Active GC Roots = 0 (Orphaned!)</text>

            {/* Right Box: JVM Garbage Collector */}
            <rect x="695" y="25" width="200" height="260" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="795" y="52" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">JVM GARBAGE COLLECTOR</text>
            <text x="795" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Minor GC in Eden Space</text>

            <rect x="710" y="95" width="170" height="170" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1" />
            <text x="720" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">Reclamation Cycle:</text>
            <text x="720" y="150" fill="#94a3b8" fontSize="9">1. Object identified</text>
            <text x="720" y="165" fill="#94a3b8" fontSize="9">   as unreachable.</text>
            <text x="720" y="190" fill="#94a3b8" fontSize="9">2. Eden memory chunk</text>
            <text x="720" y="205" fill="#94a3b8" fontSize="9">   reset and recycled.</text>
            <text x="720" y="235" fill="#4ade80" fontSize="9" fontWeight="bold">Memory Zero-Cost Exit</text>

            {/* Arrows */}
            <path d="M 290 120 L 345 120" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#execArrow)" />
            <path d="M 655 240 L 695 240" stroke="#ef4444" strokeWidth="2" markerEnd="url(#gcArrow)" />
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
            AnonymousObjectsAndUseCasesDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The code below showcases single-use fire-and-forget executions, passing anonymous objects as method parameters, temporary calculations, and illustrates the state loss pitfall:
        </p>

        <JavaFileLoader
          fileName="AnonymousObjectsAndUseCasesDemo.java"
          code={anonymousDemoCode}
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
              <span>📌</span> Immediate GC Eligibility
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Because no Stack reference variable holds the Heap address pointer, the anonymous object loses all GC Root reachability as soon as the statement terminates.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Bytecode Economy
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Anonymous objects save <code className="text-emerald-300 font-mono">astore</code> and <code className="text-emerald-300 font-mono">aload</code> bytecode instructions by keeping the reference directly on the operand stack rather than storing and reloading it from the Local Variable Table.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Collections Retain References
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Passing an anonymous object to a collection (<code className="text-purple-300 font-mono">list.add(new Student(&quot;Tuhina&quot;))</code>) preserves the object! The list&apos;s internal array holds the reference, preventing Garbage Collection.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Beware of Closeable Leaks
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Never use anonymous objects for native OS resources (like <code className="text-rose-400 font-mono">new FileInputStream(&quot;...&quot;).read()</code>). Without a reference, you cannot invoke <code className="text-rose-400 font-mono">close()</code>, causing OS file descriptor leaks.
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
              <span>❌</span> Pitfall: Calling Multiple Methods on Separate Anonymous Objects
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Every <code className="text-rose-300 font-mono">new</code> creates a distinct object instance. Mutating state on one anonymous object will never reflect when calling another method on a newly instantiated anonymous object.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// BUG: Operates on 2 different objects!
new TraineeScoreCard().addScore(50);
new TraineeScoreCard().printFinalScore(); // Prints 0!`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Use Named Variables for Stateful Multi-Step Work
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Whenever state must be accumulated or queried across distinct statements, store the object in a named reference variable.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// CORRECT: Single object preserves state!
TraineeScoreCard card = new TraineeScoreCard();
card.addScore(50);
card.printFinalScore(); // Prints 50!`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 p-6 md:p-8 rounded-2xl border border-amber-500/30">
        <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why is synchronizing on an anonymous object completely useless?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Writing <code className="text-amber-300 font-mono">synchronized(new Object()) &#123; ... &#125;</code> compiles without warnings, but provides <strong>zero concurrency protection</strong>! Thread synchronization requires competing threads to acquire the monitor lock of the <em>exact same shared Heap object</em>. When each thread creates its own anonymous object, every thread acquires its own private, isolated lock simultaneously, completely destroying mutual exclusion!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Think of an anonymous object as a courier on a bicycle—it delivers a message or performs an errand and departs into memory recycling. If an entity represents a student, bank account, or system ledger, give it a proud named variable on the Stack."
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
          fileName="Topic9_Anonymous_Objects_and_Use_Cases_Note.txt"
        />
      </section>
    </div>
  );
}
