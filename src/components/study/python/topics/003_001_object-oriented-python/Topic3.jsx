import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import selfMechanics from "./topic3_files/self_parameter_mechanics_and_bound_methods.py?raw";
import methodChaining from "./topic3_files/method_chaining_and_fluent_interfaces.py?raw";
import methodDelegation from "./topic3_files/method_delegation_and_helpers.py?raw";
import bankingLedger from "./topic3_files/smart_banking_account_ledger.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Instance methods & the self parameter
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("selfinjection");

  // Interactive Method Chaining Simulator State
  const [balance, setBalance] = useState(10000);
  const [chainHistory, setChainHistory] = useState([
    "account = BankAccount('ACC-101', 'Debanjan Roy', 10000.0)"
  ]);
  const [ledger, setLedger] = useState([
    "24-Aug-2026: Opening Balance INR 10,000.00"
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleDeposit = () => {
    const newBal = balance + 2500;
    setBalance(newBal);
    setChainHistory((prev) => [...prev, ".deposit(2500.0)"]);
    setLedger((prev) => [
      `Deposit +INR 2,500.00 | New Balance: INR ${newBal.toLocaleString()}`,
      ...prev,
    ]);
  };

  const handleWithdraw = () => {
    if (balance < 1200) return;
    const newBal = balance - 1200;
    setBalance(newBal);
    setChainHistory((prev) => [...prev, ".withdraw(1200.0)"]);
    setLedger((prev) => [
      `Withdrawal -INR 1,200.00 | Remaining: INR ${newBal.toLocaleString()}`,
      ...prev,
    ]);
  };

  const handleApplyInterest = () => {
    const interest = balance * (0.05 / 12);
    const newBal = balance + interest;
    setBalance(newBal);
    setChainHistory((prev) => [...prev, ".apply_monthly_interest(5.0)"]);
    setLedger((prev) => [
      `Interest Credited +INR ${interest.toFixed(2)} | Balance: INR ${newBal.toLocaleString()}`,
      ...prev,
    ]);
  };

  const handleReset = () => {
    setBalance(10000);
    setChainHistory(["account = BankAccount('ACC-101', 'Debanjan Roy', 10000.0)"]);
    setLedger(["24-Aug-2026: Opening Balance INR 10,000.00"]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans p-4 sm:p-6 md:p-10 pb-28 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped Keyframes for Lightweight Zero-Config Micro-Animations */}
      <style>{`
        .section-hidden {
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .section-visible {
          transform: translateY(0);
        }
        @keyframes pulseGlowTeal {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(20, 184, 166, 0.8)); }
        }
        .animate-glow-teal {
          animation: pulseGlowTeal 3s infinite ease-in-out;
        }
      `}</style>

      {/* ==================================================================== */}
      {/* HEADER SECTION */}
      {/* ==================================================================== */}
      <header
        ref={addToRefs}
        className="section-hidden max-w-5xl mx-auto mb-12 pb-8 border-b border-slate-800/80"
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs sm:text-sm font-mono font-semibold bg-teal-950/80 text-teal-300 px-3 py-1 rounded-full border border-teal-800/80 shadow-sm shadow-teal-950/50">
            Segment 3 • Module 003_001
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Instance Methods &amp; the <code className="text-teal-400 font-mono">self</code> Parameter
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python instance behavior: understanding how <code className="text-teal-300 font-mono">obj.method()</code> translates into <code className="text-cyan-300 font-mono">Class.method(obj)</code>, Bound Methods vs Unbound Functions, method chaining via <code className="text-purple-300 font-mono">return self</code>, internal helper delegation, and multi-object method collaboration.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🧬 Explicit 'self' Parameter Mechanics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🎯 Bound Methods vs Unbound Functions
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔗 Fluent Method Chaining (return self)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🤝 Inter-Object Method Collaboration
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE 'self' PARAMETER */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Explicit <code className="text-teal-400 font-mono">self</code> Parameter &amp; Bound Methods
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, unlike languages with implicit <code className="text-slate-400 font-mono">this</code> keywords (Java, C++), instance methods must explicitly declare <code className="text-teal-300 font-mono">self</code> as their first parameter. When called via an instance, Python automatically passes the calling object as the first argument:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Pillar 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Syntactic Sugar</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">acc.deposit(500)</code>
                <p className="text-[11px] text-slate-300">
                  Readable, object-centric syntax used in standard Python code.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Raw Translation</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">BankAccount.deposit(acc, 500)</code>
                <p className="text-[11px] text-slate-300">
                  What CPython actually executes: passes instance explicitly to class function.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Bound Method</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">&lt;bound method Bank.deposit&gt;</code>
                <p className="text-[11px] text-slate-300">
                  Wraps function + instance; can be passed as a standalone callback!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Zen of Python: Explicit is Better than Implicit
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Explicit <code className="text-teal-300 font-mono">self</code> ensures there is zero confusion between local variables (<code className="text-slate-400 font-mono">amount</code>) and instance attributes (<code className="text-teal-300 font-mono">self.amount</code>) without requiring hidden scoping rules.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: INTERACTIVE VISUAL ARCHITECTURE (SVG TABS) */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                2. Visualizing Method Resolution &amp; Chaining Pipelines
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("selfinjection")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "selfinjection"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                The 'self' Injection Engine
              </button>
              <button
                onClick={() => setActiveInteractiveTab("boundmethods")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "boundmethods"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Bound Method Wrapper
              </button>
              <button
                onClick={() => setActiveInteractiveTab("chaining")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "chaining"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Method Chaining (return self)
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining parameter injection, bound method callables, and fluent pipeline execution:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "selfinjection" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">HOW CPYTHON TRANSLATES METHOD CALLS</text>

                {/* Left: Client call */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="360" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="13" fontWeight="bold">Developer Syntax: acc.deposit(500)</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="11 font-mono">acc = BankAccount("ACC-101", 5000)</text>
                  <text x="20" y="90" fill="#ecfdf5" fontSize="11 font-mono">acc.deposit(500)</text>

                  <rect x="20" y="130" width="320" height="80" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="11 font-bold">Automatic Injection:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="10">• Python extracts instance before dot ('acc')</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="10">• Injects it as first parameter ('self')</text>
                </g>

                {/* Arrow */}
                <g transform="translate(405, 140)">
                  <text x="10" y="30" fill="#38bdf8" fontSize="24" fontWeight="bold">→</text>
                  <text x="-15" y="55" fill="#38bdf8" fontSize="10 font-mono">CPython Engine</text>
                </g>

                {/* Right: Raw Class Call */}
                <g transform="translate(480, 50)">
                  <rect x="0" y="0" width="370" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="13" fontWeight="bold">Raw Underlying Execution</text>
                  <text x="20" y="65" fill="#34d399" fontSize="12 font-mono font-bold">BankAccount.deposit(acc, 500)</text>
                  <text x="20" y="100" fill="#cbd5e1" fontSize="11 font-mono">def deposit(self, amount):</text>
                  <text x="20" y="125" fill="#cbd5e1" fontSize="11 font-mono">    self.balance += amount</text>
                  <rect x="20" y="155" width="330" height="60" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="180" fill="#a5f3fc" fontSize="10 font-bold">self is bound directly to acc!</text>
                  <text x="30" y="200" fill="#cbd5e1" fontSize="9">Directly updates acc.__dict__['balance']</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "boundmethods" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">UNBOUND FUNCTION VS BOUND METHOD WRAPPER</text>

                {/* Left: Class function */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">Class Level: BankAccount.deposit</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="11 font-mono">type(BankAccount.deposit)</text>
                  <text x="20" y="90" fill="#a7f3d0" fontSize="11 font-mono font-bold">→ &lt;class 'function'&gt; (Unbound)</text>
                  
                  <rect x="20" y="120" width="340" height="95" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="145" fill="#f8fafc" fontSize="11 font-bold">Requires Explicit Instance:</text>
                  <text x="30" y="170" fill="#cbd5e1" fontSize="10">Must be called with 2 arguments:</text>
                  <text x="30" y="195" fill="#34d399" fontSize="10 font-mono">BankAccount.deposit(acc, 500)</text>
                </g>

                {/* Right: Bound Method */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Instance Level: acc.deposit</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="11 font-mono">type(acc.deposit)</text>
                  <text x="20" y="90" fill="#34d399" fontSize="11 font-mono font-bold">→ &lt;class 'method'&gt; (Bound Method)</text>

                  <rect x="20" y="120" width="350" height="95" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="145" fill="#34d399" fontSize="11 font-bold">Instance Pre-Bound inside Wrapper:</text>
                  <text x="30" y="170" fill="#ecfdf5" fontSize="10">bound_method.__self__ == acc</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="10 font-bold">Callable with 1 argument: cb(500)</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">METHOD CHAINING: FLUENT BUILDER PIPELINE (return self)</text>

                {/* 3 Chain Steps */}
                <g transform="translate(30, 60)">
                  {/* Step 1 */}
                  <rect x="0" y="0" width="240" height="200" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">.add_item("Course", 15k)</text>
                  <text x="15" y="60" fill="#cbd5e1" fontSize="10 font-mono">self.items.append(...)</text>
                  <text x="15" y="90" fill="#34d399" fontSize="11 font-mono font-bold">return self</text>
                  <text x="15" y="120" fill="#a7f3d0" fontSize="10">Passes same instance forward</text>

                  {/* Arrow 1 */}
                  <text x="250" y="105" fill="#38bdf8" fontSize="24" fontWeight="bold">→</text>

                  {/* Step 2 */}
                  <rect x="280" y="0" width="240" height="200" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="295" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">.apply_discount(1k)</text>
                  <text x="295" y="60" fill="#cbd5e1" fontSize="10 font-mono">self.discount = 1000</text>
                  <text x="295" y="90" fill="#34d399" fontSize="11 font-mono font-bold">return self</text>
                  <text x="295" y="120" fill="#c4b5fd" fontSize="10">Passes same instance forward</text>

                  {/* Arrow 2 */}
                  <text x="530" y="105" fill="#38bdf8" fontSize="24" fontWeight="bold">→</text>

                  {/* Step 3 */}
                  <rect x="560" y="0" width="250" height="200" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="575" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">.build_summary()</text>
                  <text x="575" y="60" fill="#ecfdf5" fontSize="10 font-mono">Calculates GST + Net Total</text>
                  <text x="575" y="90" fill="#34d399" fontSize="11 font-bold">Terminal Method</text>
                  <text x="575" y="120" fill="#ecfdf5" fontSize="10">Returns formatted final string</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE METHOD CHAINING SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Method Chaining &amp; Account Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Execute chained methods sequentially on the live <code className="text-teal-300 font-mono">BankAccount</code> object instance:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Chainable Instance Methods
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleDeposit}
                  className="bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-700 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  .deposit(2500)
                </button>
                <button
                  onClick={handleWithdraw}
                  className="bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-700 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  .withdraw(1200)
                </button>
                <button
                  onClick={handleApplyInterest}
                  className="bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  .apply_interest(5%)
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3.5 py-2 rounded-lg text-xs font-mono transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Chained Pipeline Preview */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                  Constructed Python Expression
                </span>
                <code className="text-xs font-mono text-emerald-300 block bg-slate-950 p-2.5 rounded border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
                  {chainHistory.join("\n  ")}
                </code>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Current Balance:</span>
                  <span className="text-teal-300 font-bold text-sm">
                    INR {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Ledger */}
            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Account Transaction Ledger (self.ledger)
              </span>
              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 overflow-y-auto max-h-48 flex-1">
                {ledger.map((entry, idx) => (
                  <div key={idx} className="text-slate-300">
                    &gt; {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER METHOD TYPES COMPARISON */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Method Types &amp; Invocations Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Method Type</th>
                  <th className="py-3.5 px-4 font-bold">First Parameter</th>
                  <th className="py-3.5 px-4 font-bold">Can Access Instance State?</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Instance Method</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">self (Instance)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">YES (self.__dict__)</td>
                  <td className="py-3 px-4">Standard business logic, state mutations, behaviors</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Class Method (@classmethod)</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">cls (Class)</td>
                  <td className="py-3 px-4 text-rose-400">NO (Only class-level state)</td>
                  <td className="py-3 px-4">Alternative constructors (from_dict), factory methods</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Static Method (@staticmethod)</td>
                  <td className="py-3 px-4 font-mono text-slate-400">None</td>
                  <td className="py-3 px-4 text-rose-400">NO</td>
                  <td className="py-3 px-4">Pure utility functions scoped to class namespace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: LIVE PYTHON CODE LAB */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              5. Interactive Code Lab: Production Scripts
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Explore 4 production-grade Python scripts demonstrating the self injection engine, fluent builder method chaining, helper delegation, and multi-account transfers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "self_parameter_mechanics_and_bound_methods.py",
                code: selfMechanics,
                description: "The explicit 'self' parameter, method translation sugar, and bound method callable objects.",
              },
              {
                filename: "method_chaining_and_fluent_interfaces.py",
                code: methodChaining,
                description: "Method chaining pattern returning self for fluent GST Tax Invoice builders.",
              },
              {
                filename: "method_delegation_and_helpers.py",
                code: methodDelegation,
                description: "Internal helper routines (_helper), method delegation via self, and passing bound methods as callbacks.",
              },
              {
                filename: "smart_banking_account_ledger.py",
                code: bankingLedger,
                description: "Enterprise Multi-Account Banking Ledger Suite with inter-account fund transfers and interest calculations.",
              },
            ]}
          />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: COMMON TRAPS & EDGE CASES */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              6. Common Traps, Anti-Patterns &amp; Edge Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trap 1 */}
            <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
                <span>❌</span> Trap 1: Omission of `self` Parameter
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">def deposit(amount):</code> causes <code className="text-rose-300 font-mono">TypeError: takes 1 positional argument but 2 were given</code> because Python automatically passes the instance!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always include <code className="text-emerald-300">self</code> as the first argument in instance methods.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Reassigning Class Variables via `self`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-amber-300 font-mono">self.branch = "New"</code> creates an attribute in <code className="text-amber-300 font-mono">self.__dict__</code>, shadowing the class variable instead of updating it globally.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Modify class variables via <code className="text-emerald-300">ClassName.branch = "New"</code>.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Returning Mutable Internal Lists Directly
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Returning <code className="text-purple-300 font-mono">return self.ledger</code> allows callers to modify the list externally without validation.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Return defensive copies: <code className="text-emerald-300">return list(self.ledger)</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Forgetting `return self` in Method Chains
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If a chainable method omits <code className="text-cyan-300 font-mono">return self</code>, it returns <code className="text-cyan-300 font-mono">None</code>, causing <code className="text-cyan-300 font-mono">AttributeError: 'NoneType' object has no attribute</code> on the next step.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Every mutator step in a builder must <code className="text-emerald-300">return self</code>.
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: FAQ & INTERVIEW REVIEW QUESTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              7. Master Review &amp; Interview Questions (25 FAQs)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Comprehensive question-and-answer repository covering instance methods, the self parameter, bound methods, and method chaining:
          </p>

          <FAQTemplate questions={questions} />
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 8: STUDY NOTES, PRINTABLE HANDOUT & TEACHER BIO */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📄</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              8. Study Notes, Printable Handout &amp; Teacher Profile
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Download or print the complete reference sheet with method translation diagrams, method chaining templates, and callback passing recipes:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_instance_methods_and_self_notes.txt"
              title="Print Topic 3 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
