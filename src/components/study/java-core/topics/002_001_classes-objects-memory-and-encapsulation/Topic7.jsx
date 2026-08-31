import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import lifecycleDemoCode from "./topic7_files/InstanceVariablesAndLifecycleDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes cycleFlow {
            0% { stroke-dashoffset: 24; }
            100% { stroke-dashoffset: 0; }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-cycle-flow {
            stroke-dasharray: 6 3;
            animation: cycleFlow 3s linear infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 7
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            State Initialization &amp; Object Lifecycle
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Instance Variables: Default Initialization Values and Object Lifecycle
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the complete internal mechanics of non-static instance fields: contrasting Heap-allocated instance variables with Stack-allocated local variables, analyzing JVM automatic zero-initialization rules for all 8 primitive types, and tracing an object&apos;s full 8-stage lifecycle from Metaspace class loading to Garbage Collection memory reclamation.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>📊</span> JVM Default Zero-Initialization Rules
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Unlike local variables on the Stack (which must be explicitly assigned before reading), the JVM guarantees that all instance fields on the Heap are zero-initialized during object memory allocation before user code executes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">Integers</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-sky-300">byte, short, int, long</code> default to <code className="text-sky-200 font-bold">0</code> / <code className="text-sky-200 font-bold">0L</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">Floating Points</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-emerald-300">float, double</code> default to <code className="text-emerald-200 font-bold">0.0f</code> / <code className="text-emerald-200 font-bold">0.0d</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">Booleans &amp; Chars</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-purple-300">boolean</code> → <code className="text-purple-200 font-bold">false</code>, <code className="text-purple-300">char</code> → <code className="text-purple-200 font-bold">&apos;\u0000&apos;</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">References</h3>
              <p className="text-slate-300 font-sans text-xs">
                All class, interface, and array references default to <code className="text-amber-200 font-bold">null</code>.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Trainee Profile Lifecycle):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> was instantiated with our default constructor in the Barrackpore lab, reading <code className="text-emerald-400 font-mono">defaultInt</code> and <code className="text-emerald-400 font-mono">defaultBoolean</code> yielded <code className="text-sky-300 font-mono">0</code> and <code className="text-sky-300 font-mono">false</code> safely. In contrast, reading an unassigned Stack local variable produced an immediate compilation error!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 8-Stage Complete Object Lifecycle Timeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Tracing a Java object from Metaspace class definition to Garbage Collection memory recycling:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 310"
            className="w-full h-auto"
            aria-label="8-Stage Object Lifecycle Diagram"
          >
            <defs>
              <linearGradient id="stageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Stages Row 1 (Stages 1 to 4) */}
            {/* Stage 1 */}
            <rect x="25" y="30" width="195" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="35" y="52" fill="#38bdf8" fontSize="11" fontWeight="bold">Stage 1: Class Loading</text>
            <text x="35" y="70" fill="#94a3b8" fontSize="9">Metaspace loads bytecode</text>
            <text x="35" y="85" fill="#bae6fd" fontSize="9" fontFamily="monospace">static fields initialized</text>
            <text x="35" y="100" fill="#bae6fd" fontSize="9" fontFamily="monospace">&lt;clinit&gt; runs once</text>
            <text x="35" y="125" fill="#fde047" fontSize="8">Birth of Class Template</text>

            {/* Stage 2 */}
            <rect x="250" y="30" width="195" height="110" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="260" y="52" fill="#06b6d4" fontSize="11" fontWeight="bold">Stage 2: Heap Allocation</text>
            <text x="260" y="70" fill="#94a3b8" fontSize="9">Eden space bytes claimed</text>
            <text x="260" y="85" fill="#cffafe" fontSize="9" fontFamily="monospace">Mark Word (8B) allocated</text>
            <text x="260" y="100" fill="#cffafe" fontSize="9" fontFamily="monospace">Klass Word (4/8B) set</text>
            <text x="260" y="125" fill="#fde047" fontSize="8">Physical Memory Claimed</text>

            {/* Stage 3 */}
            <rect x="475" y="30" width="195" height="110" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="485" y="52" fill="#10b981" fontSize="11" fontWeight="bold">Stage 3: Zero-Init</text>
            <text x="485" y="70" fill="#94a3b8" fontSize="9">JVM default zero-wipe</text>
            <text x="485" y="85" fill="#a7f3d0" fontSize="9" fontFamily="monospace">primitives = 0 / false</text>
            <text x="485" y="100" fill="#a7f3d0" fontSize="9" fontFamily="monospace">references = null</text>
            <text x="485" y="125" fill="#fde047" fontSize="8">Type-Safe Memory Blank</text>

            {/* Stage 4 */}
            <rect x="700" y="30" width="195" height="110" rx="8" fill="#0f172a" stroke="#84cc16" strokeWidth="1.5" />
            <text x="710" y="52" fill="#84cc16" fontSize="11" fontWeight="bold">Stage 4: Explicit Inits</text>
            <text x="710" y="70" fill="#94a3b8" fontSize="9">Inline field evaluations</text>
            <text x="710" y="85" fill="#d9f99d" fontSize="9" fontFamily="monospace">fee = 5000.00</text>
            <text x="710" y="100" fill="#d9f99d" fontSize="9" fontFamily="monospace">branch = "Barrackpore"</text>
            <text x="710" y="125" fill="#fde047" fontSize="8">Top-to-Bottom Order</text>

            {/* Connecting Arrows Top Row */}
            <path d="M 220 85 L 250 85" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <path d="M 445 85 L 475 85" stroke="#06b6d4" strokeWidth="2" fill="none" />
            <path d="M 670 85 L 700 85" stroke="#10b981" strokeWidth="2" fill="none" />

            {/* Stages Row 2 (Stages 5 to 8) */}
            {/* Stage 5 */}
            <rect x="700" y="170" width="195" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="710" y="192" fill="#f59e0b" fontSize="11" fontWeight="bold">Stage 5: Instance Block</text>
            <text x="710" y="210" fill="#94a3b8" fontSize="9">&#123; ... &#125; Block executes</text>
            <text x="710" y="225" fill="#fef3c7" fontSize="9" fontFamily="monospace">Shared prep logic</text>
            <text x="710" y="240" fill="#fef3c7" fontSize="9" fontFamily="monospace">timestamp = now()</text>
            <text x="710" y="265" fill="#fde047" fontSize="8">Runs on every 'new'</text>

            {/* Stage 6 */}
            <rect x="475" y="170" width="195" height="110" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
            <text x="485" y="192" fill="#a855f7" fontSize="11" fontWeight="bold">Stage 6: Constructor</text>
            <text x="485" y="210" fill="#94a3b8" fontSize="9">&lt;init&gt; method body runs</text>
            <text x="485" y="225" fill="#f3e8ff" fontSize="9" fontFamily="monospace">super() called first</text>
            <text x="485" y="240" fill="#f3e8ff" fontSize="9" fontFamily="monospace">parameter overrides</text>
            <text x="485" y="265" fill="#fde047" fontSize="8">Object Initialization Complete</text>

            {/* Stage 7 */}
            <rect x="250" y="170" width="195" height="110" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="260" y="192" fill="#3b82f6" fontSize="11" fontWeight="bold">Stage 7: In-Use (Reachable)</text>
            <text x="260" y="210" fill="#94a3b8" fontSize="9">Active GC Root on Stack</text>
            <text x="260" y="225" fill="#bfdbfe" fontSize="9" fontFamily="monospace">profile.displayCard()</text>
            <text x="260" y="240" fill="#bfdbfe" fontSize="9" fontFamily="monospace">Normal runtime life</text>
            <text x="260" y="265" fill="#fde047" fontSize="8">Active Entity Duty</text>

            {/* Stage 8 */}
            <rect x="25" y="170" width="195" height="110" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="35" y="192" fill="#ef4444" fontSize="11" fontWeight="bold">Stage 8: Unreachable &amp; GC</text>
            <text x="35" y="210" fill="#94a3b8" fontSize="9">Stack reference cleared</text>
            <text x="35" y="225" fill="#fca5a5" fontSize="9" fontFamily="monospace">profile = null;</text>
            <text x="35" y="240" fill="#fca5a5" fontSize="9" fontFamily="monospace">GC sweeps memory</text>
            <text x="35" y="265" fill="#ef4444" fontSize="8">Memory Recycled to Heap</text>

            {/* Connecting Arrows Bottom Row */}
            <path d="M 700 225 L 670 225" stroke="#f59e0b" strokeWidth="2" fill="none" />
            <path d="M 475 225 L 445 225" stroke="#a855f7" strokeWidth="2" fill="none" />
            <path d="M 250 225 L 220 225" stroke="#3b82f6" strokeWidth="2" fill="none" />
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
            InstanceVariablesAndLifecycleDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The code below tests default zero-initialization across all 8 primitives, contrasts instance variables with unassigned local variables, and traces object lifecycle termination:
        </p>

        <JavaFileLoader
          fileName="InstanceVariablesAndLifecycleDemo.java"
          code={lifecycleDemoCode}
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
              <span>📌</span> Heap Zero-Initialization Guarantee
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Every instance variable allocated on the Heap is guaranteed to have a default value (<code className="text-sky-300 font-mono">0, 0.0, false, null</code>). Reading an uninitialized instance field is 100% legal, whereas reading an uninitialized local variable causes a compile error.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Initialization Order Sequence
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Default Zero-Init → Explicit inline field initializers (in code order) → Instance initializer blocks (<code className="text-emerald-300 font-mono">&#123; ... &#125;</code>) → Constructor body (<code className="text-emerald-300 font-mono">&lt;init&gt;</code>).
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Blank Final Fields
            </h3>
            <p className="text-slate-300 leading-relaxed">
              A <code className="text-purple-300 font-mono">final</code> instance variable without an inline initializer is a &ldquo;blank final&rdquo;. It does not receive default zeroing and MUST be assigned exactly once in every constructor before exiting.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Modern Post-Mortem Cleanup
            </h3>
            <p className="text-slate-300 leading-relaxed">
              <code className="text-rose-400 font-mono">finalize()</code> is deprecated and removed. Modern applications use <code className="text-amber-300 font-mono">java.lang.ref.Cleaner</code> and <code className="text-amber-300 font-mono">AutoCloseable</code> for deterministic cleanup of native resources.
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
              <span>❌</span> Pitfall: Calling Overridable Methods in Constructors
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              If a superclass constructor invokes an overridable method, dynamic dispatch executes the child method before the child&apos;s own instance initializers have run, reading uninitialized default zeros.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// DANGEROUS: Invokes uninitialized child state!
class SuperClass {
    SuperClass() { init(); } // BAD! Overridable method
    void init() {}
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Call Only Final or Private Methods
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Constructors should only invoke <code className="text-emerald-300 font-mono">private</code>, <code className="text-emerald-300 font-mono">final</code>, or <code className="text-emerald-300 font-mono">static</code> helper methods to guarantee safe, deterministic field state.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Only private helper called in constructor
class SafeClass {
    SafeClass() { setupState(); }
    private void setupState() { /* Safe */ }
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-purple-500/10 p-6 md:p-8 rounded-2xl border border-emerald-500/30">
        <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why does Java reorder your instance variables in RAM?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          If you declare fields in the order <code className="text-emerald-300 font-mono">byte b; long l; byte c;</code>, naive sequential layout would require 7 bytes of padding after <code className="text-emerald-300 font-mono">b</code> and 7 bytes after <code className="text-emerald-300 font-mono">c</code> to align to 8-byte CPU boundaries (wasting 14 bytes per object!). The HotSpot JVM automatically reorders fields in memory (Field Packing), placing 8-byte longs together, then 4-byte ints, then 2-byte shorts, clustering bytes together to eliminate alignment padding entirely!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Every instance variable is a brick in your domain model's foundation. Never rely on default zero values to define business meaning—declare your invariants explicitly and let the constructor be the sacred boundary of truth."
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
          fileName="Topic7_Instance_Variables_and_Lifecycle_Note.txt"
        />
      </section>
    </div>
  );
}
