import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import instanceMethodDemoCode from "./topic8_files/InstanceMethodsDotOperatorDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes chainFlow {
            0% { stroke-dashoffset: 20; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-chain-flow {
            stroke-dasharray: 6 3;
            animation: chainFlow 2.5s linear infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 8
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Behavior Invocation &amp; Dynamic Dispatch
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Instance Methods: Invoking Behaviors on Objects via Dot (<code className="text-sky-400 font-mono">.</code>) Operator
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Unlock the true dynamic nature of Object-Oriented Java: dissecting how the dot operator invokes instance methods on Heap objects, the role of bytecode <code className="text-sky-400 font-mono">invokevirtual</code> and vtable dispatch, the implicit <code className="text-emerald-400 font-mono">this</code> reference in Local Variable Table slot 0, and fluent method chaining design patterns.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🎯</span> The Mechanics of Dot Operator Invocation
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a statement like <code className="text-emerald-400 font-mono">swadeepAccount.creditStipend(6000.0, "Quarter 1");</code> executes, the JVM executes a 4-step sequence under the hood:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">1. Stack Pointer</h3>
              <p className="text-slate-300 font-sans text-xs">
                Reads the 64-bit Heap address pointer from <code className="text-sky-300 font-mono">swadeepAccount</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-1">2. Null Trap Guard</h3>
              <p className="text-slate-300 font-sans text-xs">
                Checks pointer; if <code className="text-rose-300 font-mono">0x00000000</code>, raises <code className="text-rose-300 font-mono">NullPointerException</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/30">
              <h3 className="text-indigo-400 font-bold text-sm mb-1">3. vtable Lookup</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-indigo-300 font-mono">invokevirtual</code> resolves method code in Metaspace vtable.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">4. &apos;this&apos; Binding</h3>
              <p className="text-slate-300 font-sans text-xs">
                Places target object in <code className="text-emerald-300 font-mono">this</code> (LVT slot 0) and executes body.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore &amp; Naihati Scholarship Accounts):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong>&apos;s account was credited with ₹6,000, the method altered Swadeep&apos;s private balance on the Heap. When <strong>Tuhina Das</strong> used fluent chaining (<code className="text-emerald-400 font-mono">tuhina.upgradeTier(&quot;Platinum&quot;).relocateBranch(&quot;Shyamnagar&quot;).creditStipend(4500.0)</code>), each method returned <code className="text-sky-300 font-mono">this</code>, allowing 3 operations to be executed cleanly in a single readable line!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Dynamic Method Dispatch &amp; Implicit &apos;this&apos; Stack Frame Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how the JVM passes the object reference into Local Variable Table slot 0 (<code className="text-indigo-300 font-mono">aload_0</code>) during instance method dispatch:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="Instance Method Dynamic Dispatch and This Binding Diagram"
          >
            <defs>
              <marker
                id="callArrow"
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
                id="thisArrow"
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

            {/* Left Box: Caller Stack Frame */}
            <rect x="25" y="25" width="280" height="270" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="165" y="52" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">CALLER STACK FRAME</text>
            <text x="165" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">main() Method Execution</text>

            <rect x="40" y="85" width="250" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <text x="50" y="105" fill="#bae6fd" fontSize="10" fontWeight="bold">swadeep Reference Pointer</text>
            <text x="50" y="125" fill="#fef08a" fontSize="11" fontFamily="monospace">Value: 0x214C265E</text>

            <rect x="40" y="160" width="250" height="115" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <text x="50" y="180" fill="#94a3b8" fontSize="10" fontWeight="bold">Executing Bytecode:</text>
            <text x="50" y="200" fill="#bae6fd" fontSize="9" fontFamily="monospace">1. aload_1 // Load swadeep</text>
            <text x="50" y="218" fill="#bae6fd" fontSize="9" fontFamily="monospace">2. ldc2_w 6000.0 // Amount</text>
            <text x="50" y="236" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">3. invokevirtual creditStipend</text>
            <text x="50" y="258" fill="#a7f3d0" fontSize="8">&rarr; Pushes new callee stack frame</text>

            {/* Middle Box: Callee Stack Frame with 'this' */}
            <rect x="335" y="25" width="280" height="270" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="475" y="52" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">CALLEE STACK FRAME</text>
            <text x="475" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">creditStipend() Execution</text>

            {/* Local Variable Table */}
            <rect x="350" y="85" width="250" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="360" y="103" fill="#a7f3d0" fontSize="10" fontWeight="bold">Slot 0: this (Implicit Handle)</text>
            <text x="360" y="122" fill="#fef08a" fontSize="11" fontFamily="monospace">Value: 0x214C265E</text>

            <rect x="350" y="145" width="250" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="360" y="163" fill="#bae6fd" fontSize="9" fontFamily="monospace">Slot 1-2: double amount = 6000.0</text>
            <text x="360" y="177" fill="#bae6fd" fontSize="9" fontFamily="monospace">Slot 3  : String remark = "Q1"</text>

            <rect x="350" y="195" width="250" height="85" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
            <text x="360" y="215" fill="#6ee7b7" fontSize="9" fontWeight="bold">Mutating Heap State:</text>
            <text x="360" y="233" fill="#ccfbf1" fontSize="9" fontFamily="monospace">aload_0 // Load this</text>
            <text x="360" y="250" fill="#ccfbf1" fontSize="9" fontFamily="monospace">putfield balanceInr += 6000.0</text>
            <text x="360" y="268" fill="#fef08a" fontSize="9" fontWeight="bold">New Balance = ₹21,000.00</text>

            {/* Right Box: Target Heap Object */}
            <rect x="645" y="25" width="250" height="270" rx="10" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
            <text x="770" y="52" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">TARGET HEAP OBJECT</text>
            <text x="770" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Address: 0x214C265E</text>

            <rect x="660" y="85" width="220" height="35" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
            <text x="670" y="107" fill="#c7d2fe" fontSize="9" fontFamily="monospace">Mark Word &amp; Klass vtable</text>

            <rect x="660" y="130" width="220" height="150" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="670" y="150" fill="#e0e7ff" fontSize="9" fontFamily="monospace">accountId = 101</text>
            <text x="670" y="170" fill="#e0e7ff" fontSize="9" fontFamily="monospace">name = "Swadeep Paul"</text>
            <text x="670" y="190" fill="#e0e7ff" fontSize="9" fontFamily="monospace">campus = "Barrackpore"</text>
            <text x="670" y="210" fill="#fde047" fontSize="10" fontFamily="monospace" fontWeight="bold">balanceInr = ₹21,000.00</text>
            <text x="670" y="230" fill="#4ade80" fontSize="9" fontFamily="monospace">transactions = 2</text>
            <text x="670" y="260" fill="#a5b4fc" fontSize="8">State Mutated Directly on Heap!</text>

            {/* Pointers */}
            <path d="M 290 115 L 350 115" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#callArrow)" />
            <path d="M 600 110 L 660 110" stroke="#10b981" strokeWidth="2" markerEnd="url(#thisArrow)" />
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
            InstanceMethodsDotOperatorDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The code below showcases mutator methods with domain invariant guards, pure calculation behaviors, static versus instance dispatch, and fluent method chaining in action:
        </p>

        <JavaFileLoader
          fileName="InstanceMethodsDotOperatorDemo.java"
          code={instanceMethodDemoCode}
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
              <span>📌</span> The Implicit &apos;this&apos; Parameter
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Every instance method receives the invoking object&apos;s Heap reference address in slot 0 of its Local Variable Table. When compiling field access, javac emits <code className="text-sky-300 font-mono">aload_0</code> followed by <code className="text-sky-300 font-mono">getfield</code> or <code className="text-sky-300 font-mono">putfield</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Fluent API with Return &apos;this&apos;
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Mutators that return <code className="text-emerald-300 font-mono">this</code> allow method chaining (<code className="text-emerald-300 font-mono">obj.setA().setB().execute()</code>), dramatically improving code readability and builder patterns.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Static vs Instance Dispatch
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Static methods use <code className="text-purple-300 font-mono">invokestatic</code> (compile-time early binding, no <code className="text-purple-300 font-mono">this</code>). Instance methods use <code className="text-purple-300 font-mono">invokevirtual</code> (runtime vtable dynamic dispatch).
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> JIT Method Inlining
            </h3>
            <p className="text-slate-300 leading-relaxed">
              For small, frequently invoked instance methods (&lt; 35 bytes of bytecode), the HotSpot C2 compiler inlines the method body directly into the caller, eliminating Stack Frame overhead entirely.
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
              <span>❌</span> Pitfall: Anemic Domain Models (Getter/Setter Bag)
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Pulling data out of an object to perform business logic in external utility classes violates OOP encapsulation and exposes internal state to corruption.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// ANTI-PATTERN: External service manipulates fields!
if (account.getBalance() >= expense) {
    account.setBalance(account.getBalance() - expense);
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: &quot;Tell, Don&apos;t Ask&quot; Behavioral Methods
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Tell the object what action to perform through rich instance methods that validate invariants and encapsulate state mutations internally.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// CLEAN PATTERN: Object manages its own invariants!
boolean success = account.debitExpense(expense, "Lab Fee");`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 p-6 md:p-8 rounded-2xl border border-sky-500/30">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why does Java allow you to call static methods via object references?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          In Java, writing <code className="text-sky-300 font-mono">swadeepAccount.printAcademyScholarshipPolicy();</code> compiles and runs without error even though the method is static. However, this is considered a major code smell! The compiler ignores the runtime object entirely and uses the compile-time declared type (<code className="text-sky-300 font-mono">StudentScholarshipAccount</code>) to generate an <code className="text-sky-300 font-mono">invokestatic</code> instruction. If the reference is null, it still runs without an NPE! Always call static methods using the <code className="text-sky-300 font-mono">ClassName.method()</code> syntax for crystal-clear code intent.
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Never let an object become a helpless bag of numbers. Give it meaningful verbs and let it defend its own boundaries. In the words of OOP pioneers: Tell, Don't Ask."
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
          fileName="Topic8_Instance_Methods_and_Dot_Operator_Note.txt"
        />
      </section>
    </div>
  );
}
