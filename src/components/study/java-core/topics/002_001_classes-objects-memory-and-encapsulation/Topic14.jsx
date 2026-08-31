import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import setterValidationDemoCode from "./topic14_files/SetterValidationAndIntegrityDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes checkpointPulse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(245, 158, 11, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-checkpoint {
            animation: checkpointPulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Domain Invariant &amp; Integrity Defense
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Adding Business Validation Logic Inside Setters to Protect Object Integrity
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the defensive implementation of mutator methods: turning setters into rigorous border checkpoints through input sanitization, precompiled regex format bounds, numeric range limits, cross-field conditional invariants, and state transition lifecycle guards.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🛡️</span> The 5-Stage Setter Validation Pipeline
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            An unvalidated setter leaves an application vulnerable to corrupted memory, invalid calculations, and security leaks. A production-ready setter executes a disciplined 5-stage validation pipeline:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-700">
              <h3 className="text-sky-400 font-bold text-xs mb-1">1. Null Check</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-sky-300">Objects.requireNonNull()</code> rejects missing references.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-700">
              <h3 className="text-purple-400 font-bold text-xs mb-1">2. Sanitization</h3>
              <p className="text-slate-300 font-sans text-xs">
                Trim spaces, strip formatting symbols, and lowercase emails.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-700">
              <h3 className="text-emerald-400 font-bold text-xs mb-1">3. Regex Bounds</h3>
              <p className="text-slate-300 font-sans text-xs">
                Validate phone numbers &amp; emails with static regex patterns.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-700">
              <h3 className="text-amber-400 font-bold text-xs mb-1">4. Range Checks</h3>
              <p className="text-slate-300 font-sans text-xs">
                Enforce numeric bounds: <code className="text-amber-300">score &ge; 0 &amp;&amp; score &le; 100</code>.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-700">
              <h3 className="text-rose-400 font-bold text-xs mb-1">5. State Invariants</h3>
              <p className="text-slate-300 font-sans text-xs">
                Guard cross-field logic and block illegal lifecycle jumps.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Classroom Case Study (Barrackpore Trainee Admission System):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> was registered, our setter sanitized his phone number from <code className="text-slate-200 font-mono">+91 98301 23456</code> to <code className="text-amber-300 font-mono">9830123456</code>, lowercased his email, verified his 92.5% entrance score, and granted a 25% merit scholarship. When an unauthorized change attempted to assign scholarship to a student below 75% or modify a GRADUATED student, the setter threw an <code className="text-rose-400 font-mono">IllegalStateException</code>!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Setter Checkpoint Pipeline: Input → Inspection → Safe Mutation vs Exception
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the decision flow of a guarded setter method defending object integrity:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 310"
            className="w-full h-auto"
            aria-label="Setter Validation Pipeline Diagram"
          >
            <defs>
              <marker
                id="pipeArrow"
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
                id="rejectArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
              <marker
                id="passArrow"
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

            {/* Stage 1: Incoming Untrusted Argument */}
            <rect x="25" y="25" width="200" height="260" rx="10" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <text x="125" y="52" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">INCOMING UNTRUSTED INPUT</text>
            <text x="125" y="68" fill="#64748b" fontSize="8" textAnchor="middle">REST JSON / UI Form / CSV</text>

            <rect x="35" y="85" width="180" height="40" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="45" y="105" fill="#fde047" fontSize="9" fontFamily="monospace">rawPhone = "+91 98301 23456"</text>
            <text x="45" y="118" fill="#94a3b8" fontSize="8">or rawScore = 150.0</text>

            <rect x="35" y="135" width="180" height="40" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="45" y="155" fill="#fde047" fontSize="9" fontFamily="monospace">rawEmail = "Swadeep@EDU"</text>
            <text x="45" y="168" fill="#94a3b8" fontSize="8">Mixed casing &amp; whitespaces</text>

            <rect x="35" y="185" width="180" height="85" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="45" y="205" fill="#f87171" fontSize="9" fontWeight="bold">Potential Hazards:</text>
            <text x="45" y="222" fill="#fca5a5" fontSize="8">&bull; Null pointers</text>
            <text x="45" y="238" fill="#fca5a5" fontSize="8">&bull; Negative/overflow values</text>
            <text x="45" y="254" fill="#fca5a5" fontSize="8">&bull; Malformed string formats</text>

            {/* Stage 2: The Guarded Setter Pipeline */}
            <rect x="260" y="25" width="370" height="260" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="445" y="52" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">GUARDED SETTER CHECKPOINT PIPELINE</text>
            <text x="445" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">Step-by-step invariant enforcement</text>

            <rect x="275" y="85" width="340" height="35" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
            <text x="285" y="105" fill="#fef3c7" fontSize="9" fontFamily="monospace">1. Objects.requireNonNull(input)</text>

            <rect x="275" y="125" width="340" height="35" rx="4" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="285" y="145" fill="#bae6fd" fontSize="9" fontFamily="monospace">2. Sanitize: trim().replaceAll()</text>

            <rect x="275" y="165" width="340" height="35" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="285" y="185" fill="#e0e7ff" fontSize="9" fontFamily="monospace">3. Regex Pattern Bounds &amp; Range Checks</text>

            <rect x="275" y="205" width="340" height="35" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="285" y="225" fill="#a7f3d0" fontSize="9" fontFamily="monospace">4. Cross-Field &amp; Lifecycle State Guards</text>

            {/* Stage 3: Two Outcomes (Rejected Exception vs Safe Mutation) */}
            <rect x="665" y="25" width="230" height="120" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="780" y="52" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">VIOLATION: FAIL-FAST</text>
            <text x="675" y="75" fill="#fca5a5" fontSize="8" fontFamily="monospace">throw IllegalArgumentException</text>
            <text x="675" y="92" fill="#fca5a5" fontSize="8" fontFamily="monospace">or IllegalStateException</text>
            <text x="675" y="112" fill="#fca5a5" fontSize="8">&bull; Zero state corruption in Heap</text>

            <rect x="665" y="160" width="230" height="125" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
            <text x="780" y="185" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">PASS: SAFE MUTATION</text>
            <text x="675" y="208" fill="#a7f3d0" fontSize="8" fontFamily="monospace">this.contactPhone = "9830123456"</text>
            <text x="675" y="225" fill="#a7f3d0" fontSize="8" fontFamily="monospace">this.verifiedEmail = "swadeep@edu"</text>
            <text x="675" y="250" fill="#fde047" fontSize="8" fontWeight="bold">&check; 100% Invariant Compliant</text>

            {/* Arrows */}
            <path d="M 225 105 L 260 105" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#pipeArrow)" />
            <path d="M 630 105 L 665 75" stroke="#ef4444" strokeWidth="2" markerEnd="url(#rejectArrow)" />
            <path d="M 630 225 L 665 225" stroke="#10b981" strokeWidth="2" markerEnd="url(#passArrow)" />
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
            SetterValidationAndIntegrityDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The executable code below illustrates input sanitization, regex formatting, range validation, conditional invariants, and state transition guards:
        </p>

        <JavaFileLoader
          fileName="SetterValidationAndIntegrityDemo.java"
          code={setterValidationDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Fail-Fast Principle
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Throw descriptive unchecked exceptions (<code className="text-sky-300 font-mono">IllegalArgumentException</code>, <code className="text-sky-300 font-mono">IllegalStateException</code>) immediately upon detecting invalid inputs rather than failing silently.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Precompiled Regex Efficiency
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Always compile regex patterns once as <code className="text-emerald-300 font-mono">private static final Pattern</code> to avoid expensive regex recompilation on every setter execution.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Constructors Delegate to Setters (DRY)
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Calling validated setters inside constructors guarantees that initialization and subsequent updates share the exact same validation rules without code duplication.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Cross-Field &amp; State Guards
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Setters can inspect relationships between multiple fields (e.g. scholarship vs entrance score) and lock operations once an entity reaches terminal states (e.g. GRADUATED).
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
              <span>❌</span> Pitfall: Silent Failure via Empty Returns or Log-Only
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Writing <code className="text-rose-300 font-mono">if (fee &lt; 0) return;</code> hides errors from callers, leading to silent state desynchronization and corrupted transaction records.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// BUG-PRONE: Caller thinks fee was updated!
public void setFee(double fee) {
    if (fee < 0) return; // NEVER FAIL SILENTLY!
    this.fee = fee;
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Explicit Informative Exception Throwing
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Throw an exception with a rich error message containing the field name, supplied invalid value, and expected constraint.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Instant feedback in production stack traces
public void setFee(double fee) {
    if (fee < 0.0) throw new IllegalArgumentException("Fee cannot be negative: ₹" + fee);
    this.fee = fee;
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 p-6 md:p-8 rounded-2xl border border-amber-500/30">
        <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why should database uniqueness checks NOT be placed inside entity setters?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Entity classes belong in the <strong>Domain Layer</strong> and should remain lightweight, pure in-memory representations. If a setter executes <code className="text-amber-300 font-mono">database.isEmailUnique(email)</code>, it introduces network latency, database connection dependencies, and breaks unit tests. Unique constraints belong in a <strong>Domain Service</strong> or database unique index; entity setters focus strictly on format, range, sanitization, and state invariants!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="A country without border security collapses from within; a class without validated setters collapses from data corruption. Inspect every passport, sanitize every crate, and turn away illegal cargo at the gate."
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
          fileName="Topic14_Setter_Validation_and_Integrity_Note.txt"
        />
      </section>
    </div>
  );
}
