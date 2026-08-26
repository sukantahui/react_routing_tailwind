import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import stackHeapDemoCode from "./topic4_files/StackHeapMemoryModelDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulsePointer {
            0%, 100% { stroke-dashoffset: 0; }
            50% { stroke-dashoffset: 12; }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pointer-flow {
            stroke-dasharray: 6 3;
            animation: pulsePointer 2.5s linear infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            JVM Memory Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Memory Model: Reference Variables on Stack Pointing to Object Instances on Heap
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dive deep into the dual-engine JVM memory runtime: understanding how thread-private LIFO Stack Frames manage local execution contexts and 64-bit reference pointers, while the globally shared JVM Heap manages object graphs, generational collections, and pass-by-value pointer mutations.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🧠</span> Stack vs Heap: Dual-Engine JVM Runtime Architecture
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The Java Virtual Machine organizes application memory into two primary runtime data areas with vastly different responsibilities:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-5 bg-slate-950 rounded-xl border border-sky-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sky-400 font-bold text-sm">Thread Call Stack (LIFO)</h3>
                <span className="px-2 py-0.5 bg-sky-500/20 text-sky-300 rounded text-[10px]">Thread-Private</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 font-sans text-xs">
                <li>• Stores method <strong>Stack Frames</strong> (LVT, Operand Stack, Frame Data).</li>
                <li>• Holds primitive local variables directly (e.g. <code className="text-sky-300">int, double, boolean</code>).</li>
                <li>• Holds 64-bit/32-bit reference handles pointing to Heap memory addresses.</li>
                <li>• Ultra-fast allocation/deallocation (adjusts CPU stack pointer on frame exit).</li>
                <li>• Throws <code className="text-rose-400 font-mono">StackOverflowError</code> on runaway recursion.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-emerald-400 font-bold text-sm">JVM Heap Memory (Dynamic)</h3>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px]">Thread-Shared</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 font-sans text-xs">
                <li>• Stores all <strong>Class Instances (Objects)</strong> and Array structures.</li>
                <li>• Holds all instance variables (primitives and references) inside object memory.</li>
                <li>• Partitioned into Young Gen (Eden, S0, S1) and Old / Tenured Generation.</li>
                <li>• Managed automatically by the Garbage Collector tracing GC Roots.</li>
                <li>• Throws <code className="text-rose-400 font-mono">OutOfMemoryError: Java heap space</code> on exhaustion.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Pass-by-Value Reference Semantics):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> was passed into <code className="text-emerald-400 font-mono">upgradeScholarship(swadeep, 3000.0)</code>, Java copied the 64-bit address <code className="text-sky-300 font-mono">0x31BEFD9F</code> into the parameter slot. Mutating the object modified the shared Heap record. However, when <strong>Tuhina Das</strong> was passed to <code className="text-purple-400 font-mono">attemptReferenceReassignment(tuhina)</code>, reassigning the parameter only modified the callee's local Stack slot, leaving Tuhina's original record completely untouched!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> JVM Memory Anatomy: Stack Frames, Pointers &amp; Generational Heap
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Interactive visual tracing of Stack Frame execution and Heap object allocation:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 340"
            className="w-full h-auto"
            aria-label="Stack Frames and Heap Generational Memory Diagram"
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
                id="ptrArrow"
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
                id="ptrArrow2"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
              </marker>
            </defs>

            {/* Left Box: Thread Call Stack */}
            <rect x="25" y="25" width="310" height="290" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="180" y="52" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">THREAD CALL STACK (LIFO)</text>
            <text x="180" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Thread-1 Stack (-Xss1m)</text>

            {/* Stack Frame 1: main() */}
            <rect x="40" y="85" width="280" height="100" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <text x="50" y="103" fill="#bae6fd" fontSize="10" fontWeight="bold">Stack Frame: main()</text>
            <rect x="50" y="112" width="260" height="22" rx="3" fill="#0f172a" />
            <text x="58" y="127" fill="#fef08a" fontSize="9" fontFamily="monospace">int baseYear = 2026 (Primitive)</text>
            <rect x="50" y="138" width="260" height="22" rx="3" fill="#0f172a" />
            <text x="58" y="153" fill="#38bdf8" fontSize="9" fontFamily="monospace">swadeepRef = 0x31BEFD9F (Pointer)</text>
            <rect x="50" y="164" width="260" height="16" rx="3" fill="#0f172a" />
            <text x="58" y="176" fill="#a855f7" fontSize="9" fontFamily="monospace">tuhinaRef  = 0x0EED1F14 (Pointer)</text>

            {/* Stack Frame 2: upgradeScholarship() */}
            <rect x="40" y="195" width="280" height="95" rx="6" fill="#1e293b" stroke="#06b6d4" strokeWidth="1" />
            <text x="50" y="213" fill="#67e8f9" fontSize="10" fontWeight="bold">Stack Frame: upgradeScholarship()</text>
            <rect x="50" y="222" width="260" height="25" rx="3" fill="#0f172a" />
            <text x="58" y="238" fill="#38bdf8" fontSize="9" fontFamily="monospace">recordParam = 0x31BEFD9F [Copy]</text>
            <rect x="50" y="252" width="260" height="25" rx="3" fill="#0f172a" />
            <text x="58" y="268" fill="#fef08a" fontSize="9" fontFamily="monospace">double bonusInr = 3000.00</text>

            <text x="180" y="306" fill="#64748b" fontSize="8" textAnchor="middle">Stack Frames pushed on call, popped on return</text>

            {/* Pointers connecting Stack to Heap */}
            <path
              d="M 320 150 C 400 150, 420 120, 500 120"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              className="animate-pointer-flow"
              markerEnd="url(#ptrArrow)"
            />
            <path
              d="M 320 235 C 400 235, 420 135, 500 135"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="4 2"
              markerEnd="url(#ptrArrow)"
            />
            <path
              d="M 320 172 C 400 172, 420 230, 500 230"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              className="animate-pointer-flow"
              markerEnd="url(#ptrArrow2)"
            />

            {/* Right Box: JVM Heap Memory */}
            <rect x="470" y="25" width="425" height="290" rx="10" fill="#0f172a" stroke="#059669" strokeWidth="2" />
            <text x="682" y="52" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">JVM HEAP MEMORY (Shared, Managed by GC)</text>
            <text x="682" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Young Generation (Eden) &amp; Tenured Old Gen</text>

            {/* Heap Object 1: Swadeep Record */}
            <rect x="490" y="85" width="385" height="95" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <div className="flex items-center justify-between">
              <text x="500" y="103" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace">Object @ 0x31BEFD9F (StudentScholarshipRecord)</text>
            </div>
            <rect x="500" y="110" width="365" height="20" rx="3" fill="#022c22" />
            <text x="510" y="124" fill="#6ee7b7" fontSize="9" fontFamily="monospace">Header: [Mark Word: 8B] [Klass Word: 4B]</text>
            <rect x="500" y="134" width="365" height="40" rx="3" fill="#022c22" />
            <text x="510" y="148" fill="#ecfdf5" fontSize="9" fontFamily="monospace">studentId=101 | studentName="Swadeep Paul"</text>
            <text x="510" y="164" fill="#fde047" fontSize="9" fontFamily="monospace">campus="Barrackpore Central" | fee=₹15,000.00</text>

            {/* Heap Object 2: Tuhina Record */}
            <rect x="490" y="195" width="385" height="95" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="1.5" />
            <text x="500" y="213" fill="#e9d5ff" fontSize="10" fontWeight="bold" fontFamily="monospace">Object @ 0x0EED1F14 (StudentScholarshipRecord)</text>
            <rect x="500" y="220" width="365" height="20" rx="3" fill="#1e1b4b" />
            <text x="510" y="234" fill="#c084fc" fontSize="9" fontFamily="monospace">Header: [Mark Word: 8B] [Klass Word: 4B]</text>
            <rect x="500" y="244" width="365" height="40" rx="3" fill="#1e1b4b" />
            <text x="510" y="258" fill="#faf5ff" fontSize="9" fontFamily="monospace">studentId=102 | studentName="Tuhina Das"</text>
            <text x="510" y="274" fill="#fde047" fontSize="9" fontFamily="monospace">campus="Naihati" | fee=₹14,500.00</text>

            <text x="682" y="306" fill="#6ee7b7" fontSize="8" textAnchor="middle">All instances dynamically allocated; collected when GC Roots are severed</text>
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
            StackHeapMemoryModelDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The code below traces Stack Frame allocations, reference pointer passing, pass-by-value mutations, reference reassignments, and GC eligibility in real-time:
        </p>

        <JavaFileLoader
          fileName="StackHeapMemoryModelDemo.java"
          code={stackHeapDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; JVM Memory Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Java is Purely Pass-by-Value
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When passing an object reference to a method, the 64-bit memory pointer value is copied to the parameter slot on the callee&apos;s Stack Frame. Mutating fields alters the shared Heap object, but reassigning the parameter variable only updates the local Stack slot.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Stack Frame Zero-GC Reclamation
            </h3>
            <p className="text-slate-300 leading-relaxed">
              When a method completes, the JVM CPU Stack Pointer simply decrements/increments to pop the frame. All local variables and pointers are reclaimed in nanoseconds with zero Garbage Collector workload!
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> GC Roots &amp; Reachability Graph
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The JVM Garbage Collector traces live objects starting from active Stack variables, JNI pointers, and static class references (GC Roots). When all references to a Heap object are removed, it is marked as unreachable and recycled.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Reference Size &amp; Compressed OOPs
            </h3>
            <p className="text-slate-300 leading-relaxed">
              On 64-bit HotSpot JVMs with heaps under 32 GB, <code className="text-amber-300 font-mono">-XX:+UseCompressedOops</code> is enabled by default, compressing 64-bit pointers down to 32 bits (4 bytes) by taking advantage of 8-byte object alignment.
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
              <span>❌</span> Pitfall: Assuming Parameter Reassignment Modifies Caller
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Beginners often believe that reassigning a method parameter <code className="text-rose-300 font-mono">param = new Student()</code> swaps the caller&apos;s object. Because Java passes copies of reference pointers, the caller&apos;s variable remains completely unchanged.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// BUGGY ASSUMPTION:
void replaceStudent(Student s) {
    s = new Student("New Student"); // Caller's variable NEVER changes!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Return New Instance or Mutate via Invariants
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Either return the newly created instance from the method, or mutate fields through guarded domain methods on the existing reference.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// CLEAN DESIGN: Return the new object
Student replaceStudent(Student existing) {
    return new Student("New Student"); // Caller receives new pointer explicitly
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-sky-500/10 p-6 md:p-8 rounded-2xl border border-indigo-500/30">
        <h2 className="text-xl font-bold text-indigo-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why does Java avoid manual pointer arithmetic?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          In languages like C/C++, raw memory pointers allow arithmetic (<code className="text-indigo-300 font-mono">ptr++</code>), leading to buffer overflows, dangling pointers, and memory corruption. In Java, reference variables on the Stack are strictly opaque handles managed by the JVM. You can dereference behaviors via the dot (<code className="text-indigo-300 font-mono">.</code>) operator, but you can never perform address math, guaranteeing memory safety and thread integrity!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Think of the Stack as the active stream of your thoughts—fleeting, fast, and organized in strict sequence. The Heap is the library of your permanent knowledge. Keep your Stack lightweight, and protect your Heap with disciplined encapsulation."
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
          fileName="Topic4_Stack_Heap_Memory_Model_Note.txt"
        />
      </section>
    </div>
  );
}
