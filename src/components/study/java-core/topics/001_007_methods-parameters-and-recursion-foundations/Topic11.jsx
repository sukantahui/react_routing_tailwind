import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import staticDemoCode from "./topic11_files/StaticVsInstanceMethodsDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowStatic {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-st {
            animation: glowStatic 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Object vs Class Scope
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Static Methods vs. Instance Methods in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the architectural boundary between class-level and object-level logic in Java (JLS §8.4.3.2): understanding why static methods lack a <code className="text-rose-300 font-mono">this</code> pointer, shared Metaspace state, instance Heap mutation, and student fee ledger management in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Two Fundamental Execution Scopes in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, methods belong either to the <strong>Class as a whole</strong> (Static) or to an <strong>individual Object instance</strong> (Instance):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Static Methods (Class-Level)</h3>
              <p className="text-sky-300 mb-1">StudentAccount.calculateStandardGst(20000)</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Belongs to the Class globally. Invoked without instantiating objects with <code className="text-slate-300 font-mono">new</code>. Has <strong>no `this` reference</strong> and cannot access instance fields directly.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Instance Methods (Object-Level)</h3>
              <p className="text-emerald-300 mb-1">swadeep.makePayment(6000.0)</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Belongs to a specific heap-allocated object instance. Has an implicit <code className="text-emerald-400 font-mono">this</code> pointer allowing direct access and mutation of individual instance fields.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Academic Accounts):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, calling the static method <code className="text-sky-300 font-mono">calculateStandardGst(20000.0)</code> computed 18% GST (₹3,600) globally without creating any objects. When <strong>Swadeep</strong> (₹18,000 &rarr; ₹12,000), <strong>Tuhina</strong> (₹25,000 &rarr; ₹15,000), and <strong>Abhronila</strong> (₹12,000 &rarr; ₹8,000) made payments in Indian Rupees (<code className="text-emerald-400 font-semibold">₹4,000 to ₹10,000</code>), their instance methods mutated their private Heap balances while incrementing the shared static counter to 3 students.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Class-Level Metaspace Scope vs. Heap Object Instance Scope
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing global class utilities with distinct object state mutations on the Heap:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Static vs Instance Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradMeta" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradInst1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradInst2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Panel 1: Metaspace (Class Scope) */}
            <rect x="30" y="30" width="370" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="215" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. CLASS SCOPE (Metaspace)</text>

            <rect x="45" y="70" width="340" height="45" rx="6" fill="#082f49" />
            <text x="55" y="90" fill="#bae6fd" fontSize="10" fontFamily="monospace">static calculateStandardGst(amt)</text>
            <text x="55" y="105" fill="#7dd3fc" fontSize="9">&rarr; Pure calculation utility (NO &apos;this&apos; pointer)</text>

            <rect x="45" y="125" width="340" height="45" rx="6" fill="#082f49" />
            <text x="55" y="145" fill="#bae6fd" fontSize="10" fontFamily="monospace">static totalEnrolledStudents = 3</text>
            <text x="55" y="160" fill="#7dd3fc" fontSize="9">&rarr; Shared counter across all instances</text>

            <text x="215" y="200" fill="#38bdf8" fontSize="10" textAnchor="middle">Called via: StudentAccount.method()</text>
            <text x="215" y="218" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Zero Object Creation Required</text>

            {/* Panel 2: Heap Instances (Object Scope) */}
            <rect x="440" y="30" width="410" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="645" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. OBJECT SCOPE (Heap Instances)</text>

            {/* Instance 1 */}
            <rect x="455" y="70" width="185" height="110" rx="8" fill="url(#gradInst1)" />
            <text x="547" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Instance: Swadeep</text>
            <text x="547" y="110" fill="#d1fae5" fontSize="9" textAnchor="middle">Course: Java Core</text>
            <text x="547" y="130" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">₹18,000 &rarr; ₹12,000</text>
            <text x="547" y="165" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">swadeep.makePayment()</text>

            {/* Instance 2 */}
            <rect x="650" y="70" width="185" height="110" rx="8" fill="url(#gradInst2)" />
            <text x="742" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Instance: Tuhina</text>
            <text x="742" y="110" fill="#ede9fe" fontSize="9" textAnchor="middle">Course: FullStack</text>
            <text x="742" y="130" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">₹25,000 &rarr; ₹15,000</text>
            <text x="742" y="165" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">tuhina.makePayment()</text>

            <text x="645" y="210" fill="#a7f3d0" fontSize="10" textAnchor="middle">Each object holds independent state via &apos;this&apos; pointer</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4.3.2: Static methods belong to the class type; Instance methods operate dynamically on Heap object instances.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Static vs. Instance Methods Architecture Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Architectural Metric</th>
                <th className="p-3 font-semibold text-emerald-400">Static Methods</th>
                <th className="p-3 font-semibold text-purple-400">Instance Methods</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Belongs To</td>
                <td className="p-3 text-emerald-300 font-sans">The Class itself (Metaspace)</td>
                <td className="p-3 text-purple-300 font-sans">Specific Object instance (Heap)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Invocation Syntax</td>
                <td className="p-3 text-slate-300">`ClassName.method()`</td>
                <td className="p-3 text-slate-300">`objectRef.method()`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`this` Reference Availability</td>
                <td className="p-3 text-rose-400 font-bold font-sans">❌ NO (Compile Error)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES (Implicit pointer)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Method Overriding</td>
                <td className="p-3 text-rose-400 font-sans">❌ Cannot be overridden (Hiding only)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Overridden dynamically via vtable</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Primary Use Case</td>
                <td className="p-3 text-slate-300 font-sans">Math helpers, utilities, factories</td>
                <td className="p-3 text-slate-300 font-sans">Entity behaviors &amp; state mutations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            StaticVsInstanceMethodsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates static tax calculation, shared enrollment counting, and student account instance payments in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={staticDemoCode}
          title="StaticVsInstanceMethodsDemo.java"
          highlightLines={[36, 46, 54, 59, 63, 75, 82, 88, 97]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Referencing `this` Inside Static Methods
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">this.feeBalance</code> inside a static method produces a <code className="text-rose-400 font-mono">Compile Error: non-static variable this cannot be referenced from a static context</code>. Static methods have no active object instance!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Lock Utility Classes with a Private Constructor
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If a class contains only static methods (like <code className="text-emerald-400 font-mono">Math</code> or <code className="text-emerald-400 font-mono">FeeUtils</code>), declare a <code className="text-emerald-400 font-mono">private FeeUtils() &#123;&#125;</code> constructor to prevent useless object instantiation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;What happens if <code className="text-rose-300 font-mono">StudentAccount s = null;</code> and you execute <code className="text-emerald-400 font-mono">s.calculateStandardGst(100);</code>?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Compile-Time Binding! It does <strong>NOT</strong> throw a NullPointerException! The compiler replaces <code className="text-slate-300 font-mono">s.calculateStandardGst()</code> with <code className="text-emerald-400 font-mono">StudentAccount.calculateStandardGst()</code> at compile-time because static methods belong to the Class, not the instance pointer!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Static vs Instance Methods FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 11: Static vs Instance Methods"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic11_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Static methods belong to the Class globally, while Instance methods belong to individual Heap objects. In Topic 12, we embark on the fascinating world of Recursion: Base Cases and Recursive Steps! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
