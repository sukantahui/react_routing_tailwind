import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import encapsulationDemoCode from "./topic10_files/EncapsulationPrincipleDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes shieldGlow {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 18px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-shield-glow {
            animation: shieldGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 10
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Core OOP Principles
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Encapsulation Principle: Bundling Data and Methods into a Single Unit
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundational cornerstone of Object-Oriented Architecture: understanding how Encapsulation creates an impenetrable protective capsule that bundles private state with validating behaviors, guarantees domain invariants, prevents unauthorized state corruption, and enables seamless internal evolution.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🛡️</span> The Two Pillars of Encapsulation
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Encapsulation is not merely making fields private—it is the deliberate architectural union of <strong>Data Bundling</strong> and <strong>Invariant Protection</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">1. Data Bundling</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Cohesively packaging private fields and the methods that operate on them into a single autonomous class entity.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">2. Invariant Defense</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Ensuring business rules (e.g. <code className="text-emerald-300">balance &ge; 0</code>) can never be violated by outside code.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">3. Implementation Hiding</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Internal storage can change freely without breaking any client caller interacting with the public contract.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Unencapsulated vs Encapsulated Accounts):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> used an unencapsulated account with public fields, buggy external code set his balance to <code className="text-rose-400 font-mono">-₹99,999.00</code> and cleared his name! When refactored into an encapsulated entity, our guarded mutator (<code className="text-emerald-400 font-mono">withdrawFunds</code>) instantly rejected illegal overdraws and automatically recorded every deposit and withdrawal into an immutable audit log!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Protective Capsule Architecture: Public API Shielding Private State
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing vulnerable direct field access with the encapsulated fortress architecture:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="Encapsulation Protective Capsule Diagram"
          >
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Box: Unencapsulated Anti-Pattern */}
            <rect x="25" y="25" width="395" height="270" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="222" y="52" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">UNENCAPSULATED (VULNERABLE)</text>
            <text x="222" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Public Fields Exposed to Direct Manipulation</text>

            <rect x="40" y="85" width="365" height="40" rx="4" fill="#450a0a" stroke="#f87171" strokeWidth="1" />
            <text x="50" y="110" fill="#fca5a5" fontSize="10" fontFamily="monospace">public double balanceInr = -99999.0;</text>

            <rect x="40" y="132" width="365" height="40" rx="4" fill="#450a0a" stroke="#f87171" strokeWidth="1" />
            <text x="50" y="157" fill="#fca5a5" fontSize="10" fontFamily="monospace">public String studentName = ""; // Corrupted</text>

            <rect x="40" y="180" width="365" height="100" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="50" y="202" fill="#f87171" fontSize="10" fontWeight="bold">Critical Architecture Defects:</text>
            <text x="50" y="222" fill="#fca5a5" fontSize="9">&bull; Zero Invariant Validation (Negative balance allowed)</text>
            <text x="50" y="238" fill="#fca5a5" fontSize="9">&bull; Zero Audit Trail (Untracked field writes)</text>
            <text x="50" y="254" fill="#fca5a5" fontSize="9">&bull; Tight Coupling (Renaming field breaks all callers)</text>
            <text x="50" y="270" fill="#f87171" fontSize="9" fontWeight="bold">→ Complete Data Integrity Failure</text>

            {/* Right Box: Encapsulated Protective Capsule */}
            <rect x="450" y="25" width="445" height="270" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="672" y="52" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">ENCAPSULATED CAPSULE (FORTRESS)</text>
            <text x="672" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Public Guarded API Protecting Private Invariants</text>

            {/* Outer Protective Shell (Methods) */}
            <rect x="465" y="85" width="415" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="475" y="105" fill="#a7f3d0" fontSize="10" fontWeight="bold">Public Guarded Methods (The Protective Shell):</text>
            <text x="475" y="123" fill="#fde047" fontSize="9" fontFamily="monospace">+ depositStipend(amt) | + withdrawFunds(amt) | + getBalance()</text>
            <text x="475" y="137" fill="#6ee7b7" fontSize="8">All requests validated before touching internal state</text>

            {/* Inner Core (Private Data) */}
            <rect x="465" y="155" width="415" height="125" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
            <text x="475" y="175" fill="#34d399" fontSize="10" fontWeight="bold">Hidden Private State &amp; Invariant Core:</text>
            <text x="475" y="195" fill="#a7f3d0" fontSize="9" fontFamily="monospace">- private double balanceInr (Guaranteed &ge; 0)</text>
            <text x="475" y="210" fill="#a7f3d0" fontSize="9" fontFamily="monospace">- private String studentName (Guaranteed non-blank)</text>
            <text x="475" y="225" fill="#a7f3d0" fontSize="9" fontFamily="monospace">- private List&lt;String&gt; auditLog (Secured immutable view)</text>
            <text x="475" y="250" fill="#fde047" fontSize="9" fontWeight="bold">&check; 100% Invariant Preservation &amp; Zero Corruption</text>
            <text x="475" y="266" fill="#a7f3d0" fontSize="8">Internal implementation can refactor freely without breaking callers</text>
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
            EncapsulationPrincipleDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The code below contrasts the catastrophic state corruption of public fields with the invariant defense and immutable audit logging of a fully encapsulated entity:
        </p>

        <JavaFileLoader
          fileName="EncapsulationPrincipleDemo.java"
          code={encapsulationDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Architecture Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Invariant Guarantee
            </h3>
            <p className="text-slate-300 leading-relaxed">
              A well-encapsulated class makes it impossible for external code to place an object into an invalid or illegal state, regardless of what inputs are supplied to public methods.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Centralized Audit &amp; Event Hook
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Because all state mutations flow through guarded instance methods, logging, validation, security checks, and event publications are centralized in single points of truth.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Loose Coupling &amp; Safe Refactoring
            </h3>
            <p className="text-slate-300 leading-relaxed">
              You can refactor internal data structures (e.g. changing <code className="text-purple-300 font-mono">double</code> to <code className="text-purple-300 font-mono">BigDecimal</code>) without changing the signature of public methods or breaking dependent client classes.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Immutable Collection Views
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Always wrap internal mutable collections with <code className="text-amber-300 font-mono">Collections.unmodifiableList()</code> before returning them in getters to prevent external tampering.
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
              <span>❌</span> Pitfall: Blind Getters and Setters for Every Field
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Automatically generating public getters and setters without validation creates an &ldquo;Anemic Domain Model&rdquo; that offers zero real protection over public fields.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// PSEUDO-ENCAPSULATION:
private double balance;
public void setBalance(double b) {
    this.balance = b; // No validation! Anyone can set -99999.0
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Purpose-Driven Behavioral Methods
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Replace raw setters with domain actions (<code className="text-emerald-300 font-mono">deposit()</code>, <code className="text-emerald-300 font-mono">withdraw()</code>) that enforce invariants and record state transitions.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// TRUE ENCAPSULATION:
public boolean deposit(double amount) {
    if (amount <= 0) return false;
    this.balance += amount;
    return true;
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/10 p-6 md:p-8 rounded-2xl border border-emerald-500/30">
        <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why is a class with 100% getters and setters NOT truly encapsulated?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          If every private field has an unvalidated public getter and setter, external code can still read the raw internal data, modify it outside the class, and write it back in. This completely defeats Data Hiding! True encapsulation requires providing <strong>behaviors</strong> (<code className="text-emerald-300 font-mono">enrollStudent()</code>, <code className="text-emerald-300 font-mono">applyDiscount()</code>, <code className="text-emerald-300 font-mono">terminateAccount()</code>) rather than exposing the raw internal nuts and bolts.
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="A class without encapsulation is a house without walls—anyone can walk in and smash the furniture. Build your classes as fortified capsules: private data within, guarded gates at the constructor, and purposeful methods defending your business truth."
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
          fileName="Topic10_Encapsulation_Principle_Note.txt"
        />
      </section>
    </div>
  );
}
