import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import oopDemoCode from "./topic0_files/OopVsProceduralFoundationsDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowOop {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-op {
            animation: glowOop 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Segment 2 · OOP Core Mechanics
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Introduction to Object-Oriented Programming (OOP) vs. Procedural Programming
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Welcome to Segment 2! Transition from procedural step-by-step function routines to the enterprise standard of Object-Oriented Programming: understanding why procedural global data leads to state corruption, how OOP bundles <code className="text-sky-300 font-mono">State (fields)</code> and <code className="text-emerald-300 font-mono">Behavior (methods)</code> into cohesive classes, and enforcing domain invariants via Data Hiding.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Fundamental Paradigm Shift
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In procedural programming (like C), data structures and functions live apart. In Object-Oriented Programming (OOP), objects represent self-protecting entities that control their own state:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-2">1. Procedural Paradigm (Decoupled Data)</h3>
              <p className="text-rose-300 mb-1">int[] balances; void deposit(int id, double amt);</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Data is stored in global parallel arrays or structs. Any external code can maliciously or accidentally set <code className="text-rose-300 font-mono">balances[0] = -50000.0</code> without validation.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. OOP Paradigm (Encapsulated Entity)</h3>
              <p className="text-emerald-300 mb-1">class BankAccount &#123; private double balance; &#125;</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                State is marked <code className="text-emerald-400 font-mono">private</code>. All interactions occur through validated methods (<code className="text-emerald-400 font-mono">deposit()</code>, <code className="text-emerald-400 font-mono">withdraw()</code>), making state corruption impossible.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Account Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> created an account with ₹25,000. When he attempted to withdraw ₹50,000, the encapsulated <code className="text-emerald-400 font-mono">withdraw()</code> method rejected the transaction safely, keeping his remaining balance at <code className="text-emerald-400 font-semibold">₹18,000.00</code> after valid ₹12,000 withdrawal!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Procedural Vulnerability vs. OOP Encapsulation Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how OOP wraps private data within an impenetrable validated method barrier:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="OOP vs Procedural Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradProc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <linearGradient id="gradOop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Panel: Procedural Vulnerability */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="225" y="55" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">1. PROCEDURAL: DECOUPLED &amp; VULNERABLE</text>

            <rect x="45" y="70" width="360" height="40" rx="4" fill="#450a0a" />
            <text x="55" y="90" fill="#fca5a5" fontSize="10" fontFamily="monospace">Global Arrays : accountNumbers[], balances[]</text>
            <text x="55" y="103" fill="#fecaca" fontSize="9">Data is exposed globally with zero access protection</text>

            <rect x="45" y="120" width="360" height="40" rx="4" fill="#450a0a" />
            <text x="55" y="140" fill="#fca5a5" fontSize="10" fontFamily="monospace">Functions     : deposit(), withdraw()</text>
            <text x="55" y="153" fill="#fecaca" fontSize="9">Functions operate externally on raw array slots</text>

            <text x="225" y="215" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">❌ Any code can corrupt balances[i] = -99999.0</text>

            {/* Right Panel: OOP Encapsulation */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="650" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. OOP: ENCAPSULATED SELF-PROTECTING ENTITY</text>

            <rect x="465" y="70" width="370" height="50" rx="6" fill="#022c22" />
            <text x="475" y="92" fill="#a7f3d0" fontSize="10" fontWeight="bold">PRIVATE STATE (Hidden from External World)</text>
            <text x="475" y="108" fill="#6ee7b7" fontSize="9" fontFamily="monospace">private int accountNumber; private double balanceInr;</text>

            <rect x="465" y="130" width="370" height="50" rx="6" fill="#064e3b" />
            <text x="475" y="152" fill="#a7f3d0" fontSize="10" fontWeight="bold">PUBLIC VALIDATED BEHAVIOR (Guarded Gateway)</text>
            <text x="475" y="168" fill="#6ee7b7" fontSize="9" fontFamily="monospace">public void deposit(amt); public boolean withdraw(amt);</text>

            <text x="650" y="225" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">✓ Invariants Guaranteed: Balance never negative!</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              OOP protects business rules by encapsulating private state behind public validating method gateways.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Procedural vs. Object-Oriented Architecture Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Architectural Dimension</th>
                <th className="p-3 font-semibold text-rose-400">Procedural Paradigm (C / Pascal)</th>
                <th className="p-3 font-semibold text-emerald-400">Object-Oriented Paradigm (Java)</th>
                <th className="p-3 font-semibold text-amber-400">Core Advantage in OOP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Organization Unit</td>
                <td className="p-3 text-rose-300">Functions / Procedures</td>
                <td className="p-3 text-emerald-300 font-bold">Classes &amp; Objects</td>
                <td className="p-3 text-slate-300 font-sans">Direct mapping to real-world domain models</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Data Security</td>
                <td className="p-3 text-rose-300">Global &amp; Unprotected</td>
                <td className="p-3 text-emerald-300 font-bold">Encapsulated via `private`</td>
                <td className="p-3 text-slate-300 font-sans">Eliminates accidental state corruption</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Coupling &amp; Cohesion</td>
                <td className="p-3 text-rose-300">Tight coupling, low cohesion</td>
                <td className="p-3 text-emerald-300 font-bold">Loose coupling, high cohesion</td>
                <td className="p-3 text-slate-300 font-sans">Easy to maintain, test, and scale</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Code Reusability</td>
                <td className="p-3 text-rose-300">Function copying / libraries</td>
                <td className="p-3 text-emerald-300 font-bold">Inheritance &amp; Polymorphism</td>
                <td className="p-3 text-slate-300 font-sans">Extensible without modifying existing code</td>
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
            OopVsProceduralFoundationsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program contrasts the procedural banking model with an encapsulated OOP BankAccount entity.
        </p>

        <JavaFileLoader
          fileModule={oopDemoCode}
          title="OopVsProceduralFoundationsDemo.java"
          highlightLines={[18, 24, 34, 38, 41, 51, 60, 78, 86, 95]}
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
              <span>❌</span> Pitfall 1: Making Fields Public (Bags of Data Anti-Pattern)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">public class Account &#123; public double balance; &#125;</code> destroys encapsulation. External callers can bypass all business rules and set negative balances. Always keep fields <code className="text-emerald-400 font-mono">private</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Validate Domain Invariants at Ingress
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Enforce all business invariants (non-negative amounts, positive account IDs, non-null names) inside constructors and mutator methods before modifying object state.
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
            🤔 <em>&ldquo;Why is an Object described as having an Identity, State, and Behavior?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Memory Architecture! Two different BankAccount objects can have the exact same state (e.g. ₹25,000 balance and holder name &ldquo;Swadeep&rdquo;), but they reside at <strong>different Heap memory addresses</strong>, giving each object its own distinct Identity!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="OOP vs Procedural FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 002_001 Topic 0: OOP vs Procedural Programming"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="002_001_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="Welcome Swadeep, Tuhina, Abhronila, and Debangshu to Segment 2: Object-Oriented Programming Deep Dive! You are now stepping into professional enterprise software design. In Topic 1, we master Real-World Domain Modeling: Mapping Entities to State and Behavior! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
