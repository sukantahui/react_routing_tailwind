import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import encapsulationLevels from "./topic6_files/encapsulation_levels_and_name_mangling.py?raw";
import dataHiding from "./topic6_files/data_hiding_and_invariant_protection.py?raw";
import inheritanceSafety from "./topic6_files/name_mangling_inheritance_safety.py?raw";
import secureVault from "./topic6_files/secure_banking_vault_and_wallet.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic6_files/topic6_note.txt?raw";

// FAQ Questions
import questions from "./topic6_files/topic6_questions";

/**
 * Topic6: Encapsulation & Data Hiding (Public, Protected _var, Private __var, Name Mangling)
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic6() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("levels");

  // Interactive Vault Simulator State
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [reserve, setReserve] = useState(500000);
  const [passphraseInput, setPassphraseInput] = useState("");
  const [mangledInspect, setMangledInspect] = useState(false);
  const [directError, setDirectError] = useState(false);
  const [auditLog, setAuditLog] = useState([
    "Vault initialized with Reserve: INR 500,000.00"
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

  const handleDirectAccess = () => {
    setDirectError(true);
    setMangledInspect(false);
    setAuditLog((prev) => [
      "CRITICAL: AttributeError raised on vault.__passphrase_hash!",
      ...prev,
    ]);
  };

  const handleMangledAccess = () => {
    setMangledInspect(true);
    setDirectError(false);
    setAuditLog((prev) => [
      "WARNING: vault._InstitutionalSecurityVault__passphrase_hash inspected via mangled name!",
      ...prev,
    ]);
  };

  const handleUnlock = () => {
    if (passphraseInput === "AccoTaxMasterKey2026!") {
      setIsUnlocked(true);
      setAuditLog((prev) => ["SUCCESS: Vault session UNLOCKED with master passphrase.", ...prev]);
    } else {
      setAuditLog((prev) => ["ALERT: Unauthorized unlock attempt with invalid passphrase!", ...prev]);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setAuditLog((prev) => ["INFO: Vault session manually LOCKED.", ...prev]);
  };

  const handleDisburse = () => {
    if (!isUnlocked) {
      setAuditLog((prev) => ["DENIED: Disbursement rejected - Vault is LOCKED!", ...prev]);
      return;
    }
    if (reserve < 50000) return;
    const newReserve = reserve - 50000;
    setReserve(newReserve);
    setAuditLog((prev) => [
      `DISBURSEMENT: Released INR 50,000.00 | Remaining Reserve: INR ${newReserve.toLocaleString()}`,
      ...prev,
    ]);
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
            Topic 6
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Encapsulation &amp; Data Hiding (<code className="text-teal-400 font-mono">_var</code>, <code className="text-rose-400 font-mono">__var</code>, Name Mangling)
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's encapsulation conventions: Public attributes, Protected single underscores (<code className="text-amber-300 font-mono">_var</code>), Private double underscores (<code className="text-rose-400 font-mono">__var</code>), CPython's Name Mangling engine (<code className="text-teal-300 font-mono">_ClassName__var</code>), and subclass collision prevention.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Public vs Protected vs Private
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚙️ CPython Name Mangling (_Class__var)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🤝 "Consenting Adults" Philosophy
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏛️ Institutional Security Vault Patterns
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE THREE ACCESS CONVENTIONS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔐</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Encapsulation Conventions &amp; Access Modifiers in Python
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              In Python, access levels are enforced by <strong>naming conventions</strong> and <strong>compiler name mangling</strong> rather than rigid hardware memory barriers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Public */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Public (var)</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">self.account_id = "ACC"</code>
                <p className="text-[11px] text-slate-300">
                  Unrestricted access. Part of the public API contract; freely readable and mutable by client code.
                </p>
              </div>

              {/* Protected */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 shadow-lg">
                <div className="text-amber-400 font-bold text-base mb-1">2️⃣ Protected (_var)</div>
                <code className="text-xs font-mono text-amber-300 block mb-1">self._balance = 5000.0</code>
                <p className="text-[11px] text-slate-300">
                  Single leading underscore. Signals internal use for class and subclasses. Not enforced by CPython runtime.
                </p>
              </div>

              {/* Private */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 shadow-lg">
                <div className="text-rose-400 font-bold text-base mb-1">3️⃣ Private (__var)</div>
                <code className="text-xs font-mono text-rose-300 block mb-1">self.__pin_hash = "sha256"</code>
                <p className="text-[11px] text-slate-300">
                  Double leading underscore. CPython compiler automatically transforms the name to <code className="text-rose-300">_ClassName__var</code> in RAM.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Python Philosophy: "We Are All Consenting Adults Here"
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Python assumes developers are responsible and respect conventions. Private variables are not cryptographically locked against introspection; Name Mangling exists primarily to prevent subclass attribute clobbering.
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
                2. Visualizing Name Mangling &amp; Inheritance Safety
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("levels")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "levels"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Access Modifiers Spectrum
              </button>
              <button
                onClick={() => setActiveInteractiveTab("mangling")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "mangling"
                    ? "bg-rose-900/50 text-rose-300 border border-rose-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                CPython Name Mangling Engine
              </button>
              <button
                onClick={() => setActiveInteractiveTab("collision")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "collision"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Subclass Collision Prevention
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining syntax transformations, memory dictionary renames, and inheritance isolation:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "levels" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">PYTHON ACCESS MODIFIERS SPECTRUM</text>

                {/* 3 Spectrum Columns */}
                <g transform="translate(30, 50)">
                  {/* Public */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Public: self.user</text>
                  <text x="15" y="60" fill="#ecfdf5" fontSize="10 font-mono">acc.user</text>
                  <rect x="15" y="90" width="220" height="50" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="25" y="115" fill="#34d399" fontSize="10 font-bold">Unrestricted Access</text>
                  <text x="25" y="130" fill="#ecfdf5" fontSize="9">Client code can read &amp; mutate</text>
                  <text x="15" y="180" fill="#cbd5e1" fontSize="10">• Standard API methods</text>
                  <text x="15" y="200" fill="#cbd5e1" fontSize="10">• Display attributes</text>

                  {/* Protected */}
                  <rect x="280" y="0" width="250" height="240" rx="8" fill="#451a03" stroke="#d97706" />
                  <text x="295" y="30" fill="#fde68a" fontSize="12" fontWeight="bold">Protected: self._balance</text>
                  <text x="295" y="60" fill="#fef3c7" fontSize="10 font-mono">acc._balance</text>
                  <rect x="295" y="90" width="220" height="50" rx="4" fill="#78350f" stroke="#b45309" />
                  <text x="305" y="115" fill="#fde68a" fontSize="10 font-bold">Convention Only (PEP 8)</text>
                  <text x="305" y="130" fill="#fef3c7" fontSize="9">Please don't touch externally</text>
                  <text x="295" y="180" fill="#cbd5e1" fontSize="10">• Subclass readable</text>
                  <text x="295" y="200" fill="#cbd5e1" fontSize="10">• Internal helper state</text>

                  {/* Private */}
                  <rect x="560" y="0" width="250" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="575" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Private: self.__pin</text>
                  <text x="575" y="60" fill="#ffe4e6" fontSize="10 font-mono">acc.__pin (AttributeError!)</text>
                  <rect x="575" y="90" width="220" height="50" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="585" y="115" fill="#fda4af" fontSize="10 font-bold">CPython Name Mangling</text>
                  <text x="585" y="130" fill="#ffe4e6" fontSize="9">Renamed to _Class__pin in RAM</text>
                  <text x="575" y="180" fill="#cbd5e1" fontSize="10">• Hashed credentials</text>
                  <text x="575" y="200" fill="#cbd5e1" fontSize="10">• Subclass collision guard</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "mangling" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#f43f5e" fontSize="14" fontWeight="bold">HOW CPYTHON NAME MANGLING OPERATES IN RAM</text>

                {/* Left: Syntax */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Class Definition: BankAccount</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="10 font-mono">class BankAccount:</text>
                  <text x="40" y="85" fill="#ecfdf5" fontSize="10 font-mono">def __init__(self, pin):</text>
                  <text x="60" y="110" fill="#34d399" fontSize="10 font-mono font-bold">self.__pin = pin</text>
                  <rect x="20" y="140" width="340" height="75" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="165" fill="#a7f3d0" fontSize="10 font-bold">Compiler Translation Rule:</text>
                  <text x="30" y="185" fill="#ecfdf5" fontSize="9 font-mono">__attr → _ + ClassName + __attr</text>
                  <text x="30" y="202" fill="#ecfdf5" fontSize="9 font-mono">__pin  → _BankAccount__pin</text>
                </g>

                {/* Right: RAM Inspection */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#4c0519" stroke="#f43f5e" />
                  <text x="20" y="30" fill="#fda4af" fontSize="12" fontWeight="bold">Actual RAM Heap (__dict__ Keys)</text>
                  <text x="20" y="65" fill="#cbd5e1" fontSize="10 font-mono">acc.__dict__ = {'{'}</text>
                  <text x="40" y="90" fill="#38bdf8" fontSize="10 font-mono">'account_holder': 'Debolina',</text>
                  <text x="40" y="115" fill="#fde68a" fontSize="10 font-mono">'_balance': 15000.0,</text>
                  <text x="40" y="140" fill="#fda4af" fontSize="10 font-mono font-bold">'_BankAccount__pin': '7421'</text>
                  <text x="20" y="165" fill="#cbd5e1" fontSize="10 font-mono">{'}'}</text>

                  <rect x="20" y="180" width="340" height="40" rx="4" fill="#881337" stroke="#e11d48" />
                  <text x="30" y="205" fill="#ffe4e6" fontSize="10">Direct `acc.__pin` throws AttributeError!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">SUBCLASS COLLISION PREVENTION: _Parent__var &amp; _Child__var</text>

                {/* Parent & Child */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Parent &amp; Child Classes</text>
                  <text x="20" y="60" fill="#ecfdf5" fontSize="10 font-mono">class BaseService:</text>
                  <text x="40" y="80" fill="#34d399" fontSize="10 font-mono font-bold">self.__config = "BASE_API"</text>

                  <text x="20" y="120" fill="#ecfdf5" fontSize="10 font-mono">class AnalyticsService(BaseService):</text>
                  <text x="40" y="140" fill="#c084fc" fontSize="10 font-mono font-bold">self.__config = "ANALYTICS_API"</text>

                  <rect x="20" y="170" width="340" height="50" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="195" fill="#a7f3d0" fontSize="10 font-bold">Same private variable name used in both!</text>
                </g>

                {/* Coexistence in RAM */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Coexistence in Single Instance RAM</text>
                  <text x="20" y="70" fill="#cbd5e1" fontSize="10 font-mono">instance.__dict__ contains:</text>

                  <rect x="20" y="100" width="340" height="40" rx="4" fill="#090d16" stroke="#14b8a6" />
                  <text x="30" y="125" fill="#34d399" fontSize="10 font-mono font-bold">'_BaseService__config': 'BASE_API'</text>

                  <rect x="20" y="150" width="340" height="40" rx="4" fill="#090d16" stroke="#8b5cf6" />
                  <text x="30" y="175" fill="#c084fc" fontSize="10 font-mono font-bold">'_AnalyticsService__config': 'ANALYTICS_API'</text>

                  <text x="20" y="215" fill="#ecfdf5" fontSize="10 font-bold">✓ Zero collision! Both coexist peacefully in RAM.</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE VAULT SIMULATOR */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Security Vault &amp; Name Mangling Inspector
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Interact with the live <code className="text-teal-300 font-mono">InstitutionalSecurityVault</code> to test private access, name mangling, and session authentication:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Vault Operations &amp; Introspection
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleDirectAccess}
                  className="bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-700 p-2.5 rounded-lg text-xs font-mono text-left transition-all"
                >
                  1. Try Direct Access: <code className="text-rose-200">vault.__passphrase_hash</code> (Raises Error)
                </button>

                <button
                  onClick={handleMangledAccess}
                  className="bg-teal-950/70 hover:bg-teal-900 text-teal-300 border border-teal-700 p-2.5 rounded-lg text-xs font-mono text-left transition-all"
                >
                  2. Inspect Mangled: <code className="text-teal-200">vault._InstitutionalSecurityVault__passphrase_hash</code>
                </button>

                <div className="pt-2">
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Master Passphrase: <span className="text-slate-500 font-normal">(AccoTaxMasterKey2026!)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={passphraseInput}
                      onChange={(e) => setPassphraseInput(e.target.value)}
                      placeholder="AccoTaxMasterKey2026!"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-teal-300 font-mono"
                    />
                    <button
                      onClick={handleUnlock}
                      className="bg-teal-900 hover:bg-teal-800 text-teal-200 border border-teal-700 px-3 py-2 rounded-lg text-xs font-mono font-bold"
                    >
                      Unlock
                    </button>
                    <button
                      onClick={handleLock}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2 rounded-lg text-xs font-mono"
                    >
                      Lock
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleDisburse}
                  className="w-full bg-cyan-900/70 hover:bg-cyan-800 text-cyan-200 border border-cyan-700 p-2.5 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  Disburse Treasury Funds (INR 50,000.00)
                </button>
              </div>

              {/* Direct Error Display */}
              {directError && (
                <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-lg text-xs font-mono text-rose-300">
                  <div className="font-bold">❌ AttributeError:</div>
                  'InstitutionalSecurityVault' object has no attribute '__passphrase_hash'
                </div>
              )}

              {/* Mangled Value Display */}
              {mangledInspect && (
                <div className="p-3 bg-teal-950/50 border border-teal-800 rounded-lg text-xs font-mono text-teal-300 break-all">
                  <div className="font-bold text-teal-400">✓ Mangled RAM Value Exposed:</div>
                  9a4f21b7c4... (SHA-256 Hash stored in _InstitutionalSecurityVault__passphrase_hash)
                </div>
              )}
            </div>

            {/* Live Vault Status & Audit */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Treasury Vault State &amp; Immutable Audit Trail
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Session Status:</span>
                  <span className={clsx("font-bold px-2 py-0.5 rounded", isUnlocked ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-rose-950 text-rose-300 border border-rose-700")}>
                    {isUnlocked ? "UNLOCKED (ACTIVE)" : "LOCKED"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Available Reserve:</span>
                  <span className="text-teal-300 font-bold text-sm">
                    INR {reserve.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 overflow-y-auto max-h-36 flex-1">
                {auditLog.map((entry, idx) => (
                  <div key={idx} className="text-slate-400">
                    &gt; {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER ENCAPSULATION MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Encapsulation Conventions Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Notation</th>
                  <th className="py-3.5 px-4 font-bold">Example</th>
                  <th className="py-3.5 px-4 font-bold">CPython Runtime Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Recommended Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Public</td>
                  <td className="py-3 px-4 font-mono text-slate-200">self.name</td>
                  <td className="py-3 px-4">No restrictions; fully visible in __dict__</td>
                  <td className="py-3 px-4">Public API contracts and regular properties</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Protected</td>
                  <td className="py-3 px-4 font-mono text-slate-200">self._balance</td>
                  <td className="py-3 px-4">No runtime restriction; PEP 8 convention warning</td>
                  <td className="py-3 px-4">Internal helpers and subclass-accessible data</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">Private</td>
                  <td className="py-3 px-4 font-mono text-slate-200">self.__pin</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">Name mangled to _Class__pin</td>
                  <td className="py-3 px-4">Subclass collision safety and private tokens</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Dunder (Magic)</td>
                  <td className="py-3 px-4 font-mono text-slate-200">__init__, __str__</td>
                  <td className="py-3 px-4">Reserved by Python language specification</td>
                  <td className="py-3 px-4">System hooks; never invent custom dunders</td>
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
            Explore 4 production-grade Python scripts demonstrating access levels, hashed credentials, subclass collision avoidance, and institutional treasury vaults:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "encapsulation_levels_and_name_mangling.py",
                code: encapsulationLevels,
                description: "The 3 access levels (public, protected _var, private __var) and CPython Name Mangling internals.",
              },
              {
                filename: "data_hiding_and_invariant_protection.py",
                code: dataHiding,
                description: "Data hiding with SHA-256 hashed PINs, masked account IDs, and security lockout counters.",
              },
              {
                filename: "name_mangling_inheritance_safety.py",
                code: inheritanceSafety,
                description: "Subclass inheritance attribute collision avoidance: why _Parent__var and _Child__var safely coexist.",
              },
              {
                filename: "secure_banking_vault_and_wallet.py",
                code: secureVault,
                description: "Enterprise Institutional Security Vault with multi-factor passphrases, locked sessions, and audit ledgers.",
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
                <span>❌</span> Trap 1: Assuming `__var` is Truly Private
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">obj._ClassName__var</code> allows direct external reading and mutation in RAM. Never rely on double underscores for critical data encryption.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use proper cryptographic encryption / hashing for sensitive passwords.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Overusing `__var` Instead of `_var`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Using double underscores everywhere makes debugging, testing, and subclassing unnecessarily difficult.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">PEP 8 Rule:</span> Use single underscore <code className="text-emerald-300">_var</code> for 95%+ of internal attributes.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Subclasses Calling Parent `__private`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                A subclass calling <code className="text-purple-300 font-mono">self.__private_method()</code> looks for <code className="text-purple-300 font-mono">_Child__private_method</code> and crashes with <code className="text-purple-300 font-mono">AttributeError</code>!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">_protected_method</code> if subclasses need to access or override it.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Inventing Custom Dunder Names
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Naming custom attributes <code className="text-cyan-300 font-mono">__custom__</code> risks colliding with future Python language magic dunder methods.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Reserved exclusively for Python language internals.
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
            Comprehensive question-and-answer repository covering encapsulation, data hiding, name mangling, and consenting adults philosophy:
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
            Download or print the complete reference sheet with access modifier comparison tables, name mangling formulas, and security vault patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic6_encapsulation_and_name_mangling_notes.txt"
              title="Print Topic 6 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
