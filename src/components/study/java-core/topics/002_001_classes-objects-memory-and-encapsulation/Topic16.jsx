import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import realWorldDemoCode from "./topic16_files/RealWorldOopModelingEntitiesDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes entityPulse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-entity-pulse {
            animation: entityPulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 16
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Enterprise Domain Modeling
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Real-World OOP Modeling: BankAccount, Employee, Product, Car Entities
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Apply the complete suite of Object-Oriented Principles to model 4 canonical enterprise entities in pure Java: analyzing financial invariant enforcement and atomic transfers in <code className="text-emerald-400 font-mono">BankAccount</code>, payroll and performance promotions in <code className="text-sky-400 font-mono">Employee</code>, stock shortage prevention in <code className="text-amber-400 font-mono">Product</code>, and finite state machine ignition dynamics in <code className="text-purple-400 font-mono">AutomobileCar</code>.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🏛️</span> The 4 Canonical Enterprise Domain Entities
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Real-world entities are living, autonomous agents that protect their own data and invariants through rich domain behaviors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">1. BankAccount</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Minimum balance invariants (&ge; ₹1,000), atomic <code className="text-emerald-300">transferTo()</code>, and unmodifiable transaction audit trails.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">2. Employee</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Minimum wage limits (&ge; ₹15,000), dynamic HRA (40%) and DA (20%) allowances, and performance-based salary increments.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">3. Product</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Inventory bounds (<code className="text-amber-300">stock &ge; 0</code>), automated shortage rejections on sales, and warehouse restocking.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">4. AutomobileCar</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Finite State Machine: engine ignition, clamped speed (0-220 km/h), proportional fuel consumption, and auto-stall on empty.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Inter-Entity Integration in Barrackpore Hub):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> transferred ₹5,000 to <strong>Tuhina Das</strong>, our <code className="text-emerald-400 font-mono">BankAccount</code> ensured atomicity. Meanwhile, <strong>Abhronila Ray</strong> received a 15% merit promotion in <code className="text-sky-400 font-mono">Employee</code>, our <code className="text-amber-400 font-mono">Product</code> rejected an oversell of Java textbooks, and our <code className="text-purple-400 font-mono">AutomobileCar</code> safely navigated the Kalyani Expressway!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Enterprise Domain Modeling Matrix: State &middot; Invariants &middot; Operations
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the architectural anatomy of the 4 canonical domain entities:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 330"
            className="w-full h-auto"
            aria-label="Enterprise OOP Domain Modeling Matrix Diagram"
          >
            {/* Box 1: BankAccount */}
            <rect x="20" y="20" width="205" height="290" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="122" y="45" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. BankAccount</text>
            <text x="122" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">Financial Domain Entity</text>

            <rect x="30" y="75" width="185" height="65" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="38" y="92" fill="#a7f3d0" fontSize="8" fontWeight="bold">Private State:</text>
            <text x="38" y="107" fill="#6ee7b7" fontSize="7" fontFamily="monospace">- final String accNo</text>
            <text x="38" y="120" fill="#6ee7b7" fontSize="7" fontFamily="monospace">- double balanceInr</text>
            <text x="38" y="133" fill="#6ee7b7" fontSize="7" fontFamily="monospace">- List&lt;String&gt; txns</text>

            <rect x="30" y="148" width="185" height="65" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="38" y="165" fill="#e0e7ff" fontSize="8" fontWeight="bold">Invariants:</text>
            <text x="38" y="180" fill="#c7d2fe" fontSize="7">&bull; balance &ge; ₹1,000.00</text>
            <text x="38" y="195" fill="#c7d2fe" fontSize="7">&bull; Self-transfer blocked</text>
            <text x="38" y="208" fill="#c7d2fe" fontSize="7">&bull; Unmodifiable history</text>

            <rect x="30" y="220" width="185" height="75" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <text x="38" y="238" fill="#fde047" fontSize="8" fontWeight="bold">Operations:</text>
            <text x="38" y="253" fill="#fef08a" fontSize="7" fontFamily="monospace">+ deposit(amt)</text>
            <text x="38" y="266" fill="#fef08a" fontSize="7" fontFamily="monospace">+ withdraw(amt)</text>
            <text x="38" y="280" fill="#fef08a" fontSize="7" fontFamily="monospace">+ transferTo(target, amt)</text>

            {/* Box 2: Employee */}
            <rect x="245" y="20" width="205" height="290" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
            <text x="347" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. Employee</text>
            <text x="347" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">Payroll &amp; HR Domain Entity</text>

            <rect x="255" y="75" width="185" height="65" rx="4" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="263" y="92" fill="#bae6fd" fontSize="8" fontWeight="bold">Private State:</text>
            <text x="263" y="107" fill="#7dd3fc" fontSize="7" fontFamily="monospace">- final int employeeId</text>
            <text x="263" y="120" fill="#7dd3fc" fontSize="7" fontFamily="monospace">- double basicSalary</text>
            <text x="263" y="133" fill="#7dd3fc" fontSize="7" fontFamily="monospace">- double ratingScore</text>

            <rect x="255" y="148" width="185" height="65" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="263" y="165" fill="#e0e7ff" fontSize="8" fontWeight="bold">Invariants:</text>
            <text x="263" y="180" fill="#c7d2fe" fontSize="7">&bull; basic &ge; ₹15,000.00</text>
            <text x="263" y="195" fill="#c7d2fe" fontSize="7">&bull; rating: 1.0 to 5.0</text>
            <text x="263" y="208" fill="#c7d2fe" fontSize="7">&bull; HRA/DA dynamically derived</text>

            <rect x="255" y="220" width="185" height="75" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <text x="263" y="238" fill="#fde047" fontSize="8" fontWeight="bold">Operations:</text>
            <text x="263" y="253" fill="#fef08a" fontSize="7" fontFamily="monospace">+ evaluatePerformance()</text>
            <text x="263" y="266" fill="#fef08a" fontSize="7" fontFamily="monospace">+ calculateGrossSalary()</text>
            <text x="263" y="280" fill="#fef08a" fontSize="7" fontFamily="monospace">+ calculateAnnualCTC()</text>

            {/* Box 3: Product */}
            <rect x="470" y="20" width="205" height="290" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="572" y="45" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">3. Product</text>
            <text x="572" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">E-Commerce Inventory Entity</text>

            <rect x="480" y="75" width="185" height="65" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
            <text x="488" y="92" fill="#fef3c7" fontSize="8" fontWeight="bold">Private State:</text>
            <text x="488" y="107" fill="#fde68a" fontSize="7" fontFamily="monospace">- final String skuCode</text>
            <text x="488" y="120" fill="#fde68a" fontSize="7" fontFamily="monospace">- double unitPriceInr</text>
            <text x="488" y="133" fill="#fde68a" fontSize="7" fontFamily="monospace">- int stockQuantity</text>

            <rect x="480" y="148" width="185" height="65" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="488" y="165" fill="#e0e7ff" fontSize="8" fontWeight="bold">Invariants:</text>
            <text x="488" y="180" fill="#c7d2fe" fontSize="7">&bull; stockQuantity &ge; 0</text>
            <text x="488" y="195" fill="#c7d2fe" fontSize="7">&bull; priceInr &ge; 0.0</text>
            <text x="488" y="208" fill="#c7d2fe" fontSize="7">&bull; Shortage rejection</text>

            <rect x="480" y="220" width="185" height="75" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <text x="488" y="238" fill="#fde047" fontSize="8" fontWeight="bold">Operations:</text>
            <text x="488" y="253" fill="#fef08a" fontSize="7" fontFamily="monospace">+ fulfillOrder(qty)</text>
            <text x="488" y="266" fill="#fef08a" fontSize="7" fontFamily="monospace">+ restockInventory(units)</text>
            <text x="488" y="280" fill="#fef08a" fontSize="7" fontFamily="monospace">+ printCatalogCard()</text>

            {/* Box 4: AutomobileCar */}
            <rect x="695" y="20" width="205" height="290" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
            <text x="797" y="45" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">4. AutomobileCar</text>
            <text x="797" y="60" fill="#94a3b8" fontSize="8" textAnchor="middle">Finite State Machine Entity</text>

            <rect x="705" y="75" width="185" height="65" rx="4" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
            <text x="713" y="92" fill="#f3e8ff" fontSize="8" fontWeight="bold">Private State:</text>
            <text x="713" y="107" fill="#e9d5ff" fontSize="7" fontFamily="monospace">- final String vinNo</text>
            <text x="713" y="120" fill="#e9d5ff" fontSize="7" fontFamily="monospace">- boolean isRunning</text>
            <text x="713" y="133" fill="#e9d5ff" fontSize="7" fontFamily="monospace">- int currentSpeed</text>

            <rect x="705" y="148" width="185" height="65" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="713" y="165" fill="#e0e7ff" fontSize="8" fontWeight="bold">Invariants:</text>
            <text x="713" y="180" fill="#c7d2fe" fontSize="7">&bull; Speed 0-220 km/h clamped</text>
            <text x="713" y="195" fill="#c7d2fe" fontSize="7">&bull; Start requires fuel &gt; 0.5L</text>
            <text x="713" y="208" fill="#c7d2fe" fontSize="7">&bull; Auto-stall on empty</text>

            <rect x="705" y="220" width="185" height="75" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <text x="713" y="238" fill="#fde047" fontSize="8" fontWeight="bold">Operations:</text>
            <text x="713" y="253" fill="#fef08a" fontSize="7" fontFamily="monospace">+ startEngine()</text>
            <text x="713" y="266" fill="#fef08a" fontSize="7" fontFamily="monospace">+ accelerate(delta)</text>
            <text x="713" y="280" fill="#fef08a" fontSize="7" fontFamily="monospace">+ brake(delta) / stop()</text>
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
            RealWorldOopModelingEntitiesDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The comprehensive Java source code below demonstrates the full implementation of all 4 entities, inter-account fund transfers, payroll appraisals, inventory fulfillment, and car ignition state machines:
        </p>

        <JavaFileLoader
          fileName="RealWorldOopModelingEntitiesDemo.java"
          code={realWorldDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Domain Modeling Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Invariant Preservation
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Every domain method must guarantee that the object remains in a valid state both before and after execution. If an operation would breach an invariant, it must be rejected.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Derived vs Backed State
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Values that can be computed from primary fields (like HRA, DA, Gross Salary, Aggregate Percentage) should be implemented as methods rather than stored fields to eliminate synchronization bugs.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Atomic Inter-Object Operations
            </h3>
            <p className="text-slate-300 leading-relaxed">
              In inter-account transfers (<code className="text-purple-300 font-mono">transferTo</code>), ensure the source withdrawal completes before crediting the target, preventing phantom money creation.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Finite State Machine Encapsulation
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Entities with lifecycles (like <code className="text-amber-300 font-mono">AutomobileCar</code>) encapsulate state flags (<code className="text-amber-300 font-mono">isEngineRunning</code>) to block illegal transitions like accelerating with the engine off.
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
              <span>❌</span> Pitfall: Asking for Data and Mutating Externally
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Querying an entity&apos;s stock, subtracting it in a controller, and setting the new stock bypasses invariant checks and creates severe race conditions.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// BAD (Anemic Design):
if (prod.getStock() >= 5) {
    prod.setStock(prod.getStock() - 5); // Invariant bypassed!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: &ldquo;Tell, Don&apos;t Ask&rdquo; Domain Operations
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Invoke a cohesive domain method (<code className="text-emerald-300 font-mono">fulfillCustomerOrder(5)</code>) and let the entity defend its stock internally.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// GOOD (Rich Domain Model):
boolean success = prod.fulfillCustomerOrder(5); // Invariant guarded!`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-indigo-500/10 p-6 md:p-8 rounded-2xl border border-emerald-500/30">
        <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why should production financial systems use BigDecimal instead of double?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Binary floating-point types (<code className="text-emerald-300 font-mono">double</code> and <code className="text-emerald-300 font-mono">float</code>) cannot accurately represent decimal fractions like 0.1 or 0.7 due to IEEE 754 representation limits. Evaluating <code className="text-emerald-300 font-mono">0.1 + 0.2</code> yields <code className="text-amber-300 font-mono">0.30000000000000004</code>! In enterprise banking and accounting engines, even micro-cent round-off errors can trigger financial auditing discrepancies. Enterprise production systems strictly use <code className="text-emerald-300 font-mono">java.math.BigDecimal</code> or integer minor units (paise/cents in <code className="text-emerald-300 font-mono">long</code>) for exact precision!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Never design an entity as a passive corpse waiting for outside code to poke its fields. Design it as a living, intelligent agent that knows its rules, protects its honour, and defends its domain truth."
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
          fileName="Topic16_Real_World_OOP_Modeling_Note.txt"
        />
      </section>
    </div>
  );
}
