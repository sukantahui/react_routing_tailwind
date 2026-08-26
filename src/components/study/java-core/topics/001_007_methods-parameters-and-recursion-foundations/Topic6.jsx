import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import reassignDemoCode from "./topic6_files/ParameterReassignmentVsMutationDemo.java?raw";
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
          @keyframes glowReassign {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ra {
            animation: glowReassign 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 6
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            State Mutation &amp; Pointer Semantics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Parameter Re-assignment vs. Mutating Object Internal State
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Deep-dive into JVM stack and heap interactions: why in-place object and array mutations persist on shared memory, why reassigning parameter references only modifies local stack slots, defensive coding with <code className="text-emerald-400 font-mono">final</code> parameters, and student ledger tests in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Architectural Breakdown: Pointer Update vs. Heap Dereference
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Understanding the difference between <strong>reassigning a variable</strong> and <strong>mutating an object</strong> is essential for avoiding insidious bugs in Java enterprise code:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. In-Place Object Mutation (Heap Dereference)</h3>
              <p className="text-emerald-300 mb-1">account.deductScholarship(5000.0);</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Dereferences the stack pointer and modifies the actual memory block on the Heap. All variables referencing this object immediately reflect the new state.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-2">2. Parameter Reassignment (Local Stack Update)</h3>
              <p className="text-rose-300 mb-1">account = new StudentAccount(...);</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Overwrites only the temporary parameter variable in the method&apos;s stack frame. It has <strong>zero impact</strong> on the caller&apos;s reference or the original Heap object.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Account Demonstrations):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (₹20,000 balance) had his tuition successfully discounted to ₹15,000 via in-place mutation. When <strong>Tuhina</strong> tested <code className="text-rose-300 font-mono">resetAccountReassignment()</code>, reassigning the parameter to a new account left Tuhina&apos;s original record completely intact with ₹15,000 in Indian Rupees (<code className="text-emerald-400 font-semibold">₹15,000.00</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> In-Place Heap Mutation vs. Local Stack Reassignment Flow
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the JVM memory pathways during mutation vs parameter reassignment:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Reassignment vs Mutation Memory Flow Diagram"
          >
            <defs>
              <linearGradient id="gradMut" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradReas" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Panel 1: In-Place Mutation */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="225" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">1. IN-PLACE OBJECT MUTATION</text>

            <rect x="45" y="70" width="150" height="40" rx="6" fill="#1e293b" />
            <text x="120" y="88" fill="#ffffff" fontSize="9" textAnchor="middle">Caller: swadeep</text>
            <text x="120" y="102" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">ptr: 0x30A0 &rarr;</text>

            <rect x="45" y="120" width="150" height="40" rx="6" fill="#1e293b" />
            <text x="120" y="138" fill="#ffffff" fontSize="9" textAnchor="middle">Method: account</text>
            <text x="120" y="152" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">ptr: 0x30A0 &rarr;</text>

            <rect x="225" y="70" width="180" height="90" rx="8" fill="url(#gradMut)" />
            <text x="315" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Shared Heap Object</text>
            <text x="315" y="118" fill="#d1fae5" fontSize="10" textAnchor="middle">Swadeep</text>
            <text x="315" y="138" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">₹20,000 &rarr; ₹15,000</text>

            <text x="225" y="195" fill="#a7f3d0" fontSize="10" textAnchor="middle">Dereferences pointer and mutates Heap!</text>
            <text x="225" y="215" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Caller reflects the discounted fee!</text>

            {/* Panel 2: Parameter Reassignment */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="650" y="55" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">2. PARAMETER REASSIGNMENT</text>

            <rect x="465" y="70" width="150" height="40" rx="6" fill="#1e293b" />
            <text x="540" y="88" fill="#ffffff" fontSize="9" textAnchor="middle">Caller: tuhina</text>
            <text x="540" y="102" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">ptr: 0x70C0 &rarr;</text>

            <rect x="465" y="120" width="150" height="40" rx="6" fill="#1e293b" />
            <text x="540" y="138" fill="#ffffff" fontSize="9" textAnchor="middle">Method: account</text>
            <text x="540" y="152" fill="#f87171" fontSize="9" fontFamily="monospace" textAnchor="middle">ptr: 0x90B0 &times;</text>

            <rect x="645" y="70" width="190" height="90" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="740" y="95" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Original Heap Object</text>
            <text x="740" y="118" fill="#d1fae5" fontSize="10" textAnchor="middle">Tuhina: ₹15,000 (0x70C0)</text>
            <text x="740" y="138" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">CALLER 100% UNCHANGED</text>

            <text x="650" y="195" fill="#fca5a5" fontSize="10" textAnchor="middle">Overwrote only method&apos;s local stack slot.</text>
            <text x="650" y="215" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">Ghost object discarded upon method exit!</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4.1: Reassigning a reference parameter alters only the local stack frame pointer; Heap objects remain unmodified.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comparative Analysis: Reassignment vs. Mutation
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operation Type</th>
                <th className="p-3 font-semibold text-emerald-400">Memory Area Affected</th>
                <th className="p-3 font-semibold text-purple-400">Visible to Caller?</th>
                <th className="p-3 font-semibold text-amber-400">Prevented by `final` Param?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-300 font-bold">Field Mutation (`account.deduct()`)</td>
                <td className="p-3 text-slate-300">Shared Heap memory</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES (Instant)</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO (`final` allows mutation)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-300 font-bold">Array Element Mutation (`arr[0] = v`)</td>
                <td className="p-3 text-slate-300">Shared Heap memory</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES (Instant)</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-300 font-bold">Object Reassignment (`s = new S()`)</td>
                <td className="p-3 text-slate-300">Local Method Stack Frame</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO (Zero effect)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES (Compile Error)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-300 font-bold">Array Reassignment (`arr = new double[]`)</td>
                <td className="p-3 text-slate-300">Local Method Stack Frame</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO (Zero effect)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES (Compile Error)</td>
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
            ParameterReassignmentVsMutationDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates side-by-side execution of object field mutations, array modifications, parameter reassignments, and final parameter protection in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={reassignDemoCode}
          title="ParameterReassignmentVsMutationDemo.java"
          highlightLines={[42, 45, 51, 54, 61, 67, 73, 83, 89, 96]}
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
              <span>❌</span> Pitfall 1: Expecting Parameter Reassignment to Update the Caller
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">void reset(Student s) &#123; s = new Student(); &#125;</code> has zero effect on the caller because it updates only the local stack frame pointer slot!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `final` Parameters to Prevent Accidental Reassignment
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Mark formal parameters as <code className="text-emerald-400 font-mono">final StudentAccount account</code> so the compiler immediately flags any illegal parameter reassignment attempts.
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
            🤔 <em>&ldquo;Does declaring <code className="text-emerald-400 font-mono">final double[] fees</code> make the array elements read-only?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Pointer Immutability vs Element Mutation! <code className="text-emerald-400 font-mono">final</code> locks the <em>array reference pointer</em> (you cannot write <code className="text-rose-300 font-mono">fees = new double[5]</code>), but the <em>array elements</em> (<code className="text-emerald-400 font-mono">fees[0] = 999.0</code>) remain fully mutable!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Parameter Reassignment vs Mutation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 6: Parameter Reassignment vs Mutation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic6_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Never forget: mutating an object changes shared Heap data, while reassigning a parameter changes only a local stack variable. In Topic 7, we master Method Overloading and Compile-Time Polymorphism! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
