import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import overridingFundamentals from "./topic9_files/method_overriding_and_super_fundamentals.py?raw";
import cooperativeSuper from "./topic9_files/cooperative_multiple_inheritance_and_super.py?raw";
import kwargsChaining from "./topic9_files/super_constructor_chaining_and_kwargs.py?raw";
import layeredProcessor from "./topic9_files/banking_transaction_processor_and_discount_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic9_files/topic9_note.txt?raw";

// FAQ Questions
import questions from "./topic9_files/topic9_questions";

/**
 * Topic9: Method Overriding & super() function
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic9() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pipeline");

  // Interactive Layered Discount Stack Playground State
  const [enableScholarship, setEnableScholarship] = useState(true);
  const [enableEarlyBird, setEnableEarlyBird] = useState(true);
  const [enableFestive, setEnableFestive] = useState(true);

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

  // Layered Calculation Simulation
  const baseTuition = 20000;
  const gst = baseTuition * 0.18;
  const layer1Gross = baseTuition + gst;

  let layer2 = layer1Gross;
  if (enableScholarship) {
    layer2 = Math.max(0, layer2 - 3000);
  }

  let layer3 = layer2;
  if (enableEarlyBird) {
    layer3 = Math.max(0, layer3 - 1500);
  }

  let layer4 = layer3;
  if (enableFestive) {
    layer4 = Math.max(0, layer4 * 0.95);
  }

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
            Topic 9
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Method Overriding &amp; the <code className="text-teal-400 font-mono">super()</code> Function
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master polymorphic behavior and inheritance delegation: extending vs replacing parent logic, modern zero-argument <code className="text-teal-300 font-mono">super()</code> in Python 3, cooperative multiple inheritance in diamond graphs, and constructor chaining with <code className="text-cyan-300 font-mono">**kwargs</code>.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔄 Extending vs Replacing Logic
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ⚡ Zero-Argument super() Mechanics
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💎 Cooperative Diamond Traversal
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📦 **kwargs Constructor Forwarding
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: OVERRIDING & super() ESSENTIALS */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧬</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. Method Overriding &amp; The Power of <code className="text-teal-400 font-mono">super()</code>
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              Method overriding occurs when a subclass redefines a method inherited from an ancestor. Subclasses can choose to either <strong>extend</strong> the parent behavior or <strong>completely replace</strong> it:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Type 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Extending via super()</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">super().method() + custom</code>
                <p className="text-[11px] text-slate-300">
                  Executes ancestor logic and layers custom behavior on top. Preserves invariants.
                </p>
              </div>

              {/* Type 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Total Replacement</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">def method(self): ...</code>
                <p className="text-[11px] text-slate-300">
                  Provides entirely fresh logic without calling <code className="text-cyan-300">super()</code>, completely replacing parent behavior.
                </p>
              </div>

              {/* Type 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Cooperative Multiple</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">Next in MRO list</code>
                <p className="text-[11px] text-slate-300">
                  In multiple inheritance, <code className="text-purple-300 font-mono">super()</code> calls the next class in MRO rather than just the direct parent!
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                Zero-Argument super() in Python 3
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                In modern Python 3, write simply <code className="text-teal-300 font-mono">super().method()</code>. Python's compiler automatically extracts the active class and instance from a hidden lexical cell, completely eliminating the legacy Python 2 <code className="text-slate-400 font-mono">super(ClassName, self)</code> boilerplate and copy-paste recursion bugs!
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
                2. Visualizing Method Overriding &amp; Cooperative super()
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pipeline")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pipeline"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Extension Pipeline
              </button>
              <button
                onClick={() => setActiveInteractiveTab("diamond")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "diamond"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Cooperative Diamond Traversal
              </button>
              <button
                onClick={() => setActiveInteractiveTab("stack")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "stack"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Layered Computation Stack
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining execution delegation, cooperative diamond routing, and layered discount calculations:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pipeline" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">METHOD OVERRIDING &amp; super() EXTENSION FLOW</text>

                {/* Left: Parent Class */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Parent Class: BaseStudentReport</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="10 font-mono">def generate_report(self):</text>
                  <text x="40" y="90" fill="#cbd5e1" fontSize="10 font-mono">return f"Student: {'{self.name}'}\nTotal: {'{self.marks}'}"</text>
                  
                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#34d399" fontSize="10 font-bold">Standard Base Output:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="9 font-mono">Student: Priyanka Sen</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="9 font-mono">Total Marks: 485.0 / 500</text>
                </g>

                {/* Right: Subclass */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Subclass: HonorsStudentReport</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="10 font-mono">def generate_report(self):</text>
                  <text x="40" y="90" fill="#34d399" fontSize="10 font-mono font-bold">base_text = super().generate_report()</text>
                  <text x="40" y="115" fill="#ecfdf5" fontSize="10 font-mono">return f"{'{base_text}'}\nThesis: {'{self.thesis}'}"</text>

                  <rect x="20" y="140" width="340" height="75" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="165" fill="#c084fc" fontSize="10 font-bold">Extended Combined Output:</text>
                  <text x="30" y="185" fill="#a7f3d0" fontSize="9 font-mono">✓ Base marks + Honors Thesis distinction!</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "diamond" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">COOPERATIVE super() TRAVERSAL IN DIAMOND TOPOLOGY</text>

                {/* Diamond Nodes */}
                <g transform="translate(30, 40)">
                  {/* Top: BaseHandler */}
                  <rect x="340" y="10" width="180" height="45" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="380" y="38" fill="#99f6e4" fontSize="11 font-mono font-bold">BaseHandler</text>

                  {/* Left: Auth */}
                  <rect x="160" y="100" width="200" height="45" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="180" y="128" fill="#a5f3fc" fontSize="11 font-mono font-bold">AuthenticationHandler</text>

                  {/* Right: Encryption */}
                  <rect x="500" y="100" width="200" height="45" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="530" y="128" fill="#c4b5fd" fontSize="11 font-mono font-bold">EncryptionHandler</text>

                  {/* Bottom: SecureGateway */}
                  <rect x="340" y="200" width="180" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="360" y="228" fill="#a7f3d0" fontSize="11 font-mono font-bold">SecureApiGateway</text>

                  {/* Cooperative Arrows */}
                  <text x="310" y="175" fill="#38bdf8" fontSize="14" fontWeight="bold">1. Start ↓</text>
                  <text x="375" y="128" fill="#38bdf8" fontSize="18" fontWeight="bold">→</text>
                  <text x="385" y="145" fill="#38bdf8" fontSize="9 font-mono">super() calls</text>
                  <text x="590" y="80" fill="#38bdf8" fontSize="14" fontWeight="bold">↑ 3. super()</text>
                </g>

                {/* Explanation Banner */}
                <g transform="translate(30, 290)">
                  <rect x="0" y="0" width="820" height="35" rx="4" fill="#090d16" stroke="#334155" />
                  <text x="20" y="22" fill="#cbd5e1" fontSize="10 font-bold">MRO Order: Gateway → AuthHandler → EncryptionHandler → BaseHandler → object (Every node visited ONCE!)</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">LAYERED CALCULATION PIPELINE VIA super().calculate()</text>

                {/* 4 Layers */}
                <g transform="translate(30, 60)">
                  {/* Layer 1 */}
                  <rect x="0" y="0" width="180" height="200" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Base Tuition</text>
                  <text x="15" y="60" fill="#cbd5e1" fontSize="10 font-mono">Tuition + 18% GST</text>
                  <text x="15" y="90" fill="#34d399" fontSize="11 font-bold">INR 23,600.00</text>
                  <text x="15" y="130" fill="#ecfdf5" fontSize="9">• Root fee computation</text>

                  {/* Arrow 1 */}
                  <text x="190" y="105" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Layer 2 */}
                  <rect x="220" y="0" width="180" height="200" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="235" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">2. Scholarship</text>
                  <text x="235" y="60" fill="#cbd5e1" fontSize="10 font-mono">super() - 3,000</text>
                  <text x="235" y="90" fill="#38bdf8" fontSize="11 font-bold">INR 20,600.00</text>
                  <text x="235" y="130" fill="#ecfdf5" fontSize="9">• Layer 2 reduction</text>

                  {/* Arrow 2 */}
                  <text x="410" y="105" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Layer 3 */}
                  <rect x="440" y="0" width="180" height="200" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="455" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">3. Early Bird</text>
                  <text x="455" y="60" fill="#cbd5e1" fontSize="10 font-mono">super() - 1,500</text>
                  <text x="455" y="90" fill="#c084fc" fontSize="11 font-bold">INR 19,100.00</text>
                  <text x="455" y="130" fill="#ecfdf5" fontSize="9">• Layer 3 voucher</text>

                  {/* Arrow 3 */}
                  <text x="630" y="105" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>

                  {/* Layer 4 */}
                  <rect x="660" y="0" width="180" height="200" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="675" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">4. Festive 5%</text>
                  <text x="675" y="60" fill="#cbd5e1" fontSize="10 font-mono">super() * 0.95</text>
                  <text x="675" y="90" fill="#34d399" fontSize="12 font-mono font-bold">INR 18,145.00</text>
                  <text x="675" y="130" fill="#a7f3d0" fontSize="9 font-bold">✓ Net Disbursed</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE LAYERED DISCOUNT PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Layered Discount Engine (super() Stack)
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Toggle inheritance override layers to see how each <code className="text-teal-300 font-mono">super().calculate()</code> layer dynamically modifies tuition fees:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Layer Toggles */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Inheritance Override Layers
              </span>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <div className="font-bold text-teal-300">Layer 1: BaseTuitionProcessor</div>
                    <div className="text-[11px] text-slate-400">Base Tuition (INR 20,000) + 18% GST</div>
                  </div>
                  <span className="text-teal-400 font-bold">INR {layer1Gross.toLocaleString()}</span>
                </div>

                <label className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-slate-700">
                  <div>
                    <div className="font-bold text-cyan-300">Layer 2: ScholarshipDiscountProcessor</div>
                    <div className="text-[11px] text-slate-400">super().calculate() - INR 3,000.00</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableScholarship}
                    onChange={(e) => setEnableScholarship(e.target.checked)}
                    className="accent-cyan-500 w-4 h-4"
                  />
                </label>

                <label className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-slate-700">
                  <div>
                    <div className="font-bold text-purple-300">Layer 3: EarlyBirdConcessionProcessor</div>
                    <div className="text-[11px] text-slate-400">super().calculate() - INR 1,500.00</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableEarlyBird}
                    onChange={(e) => setEnableEarlyBird(e.target.checked)}
                    className="accent-purple-500 w-4 h-4"
                  />
                </label>

                <label className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono cursor-pointer hover:border-slate-700">
                  <div>
                    <div className="font-bold text-emerald-300">Layer 4: FestivePromoProcessor</div>
                    <div className="text-[11px] text-slate-400">super().calculate() * 0.95 (5% Rebate)</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableFestive}
                    onChange={(e) => setEnableFestive(e.target.checked)}
                    className="accent-emerald-500 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Live Stack Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Dynamic super() Stack Audit Trail
              </span>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs font-mono flex-1">
                <div className="text-slate-400">&gt; 1. Base + GST: INR {layer1Gross.toLocaleString()}</div>
                {enableScholarship && (
                  <div className="text-cyan-300">&gt; 2. Scholarship Applied: -INR 3,000 → INR {layer2.toLocaleString()}</div>
                )}
                {enableEarlyBird && (
                  <div className="text-purple-300">&gt; 3. Early Bird Applied: -INR 1,500 → INR {layer3.toLocaleString()}</div>
                )}
                {enableFestive && (
                  <div className="text-emerald-300">&gt; 4. Festive 5% Rebate Applied: → INR {layer4.toLocaleString()}</div>
                )}

                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between font-bold text-sm">
                  <span className="text-slate-300">FINAL NET PAYABLE:</span>
                  <span className="text-teal-300">
                    INR {layer4.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER METHOD OVERRIDING MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Method Overriding &amp; Delegation Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Pattern</th>
                  <th className="py-3.5 px-4 font-bold">Code Syntax</th>
                  <th className="py-3.5 px-4 font-bold">MRO Traversal Behavior</th>
                  <th className="py-3.5 px-4 font-bold">Primary Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Extended Overriding</td>
                  <td className="py-3 px-4 font-mono text-slate-200">super().method()</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Delegates to next MRO class</td>
                  <td className="py-3 px-4">Constructor chaining, layered filters, logging</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Total Replacement</td>
                  <td className="py-3 px-4 font-mono text-slate-200">def method(self): ...</td>
                  <td className="py-3 px-4 text-rose-400">Completely halts ancestor MRO traversal</td>
                  <td className="py-3 px-4">Custom algorithms completely supplanting parent</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Cooperative Diamond</td>
                  <td className="py-3 px-4 font-mono text-slate-200">super().process(payload)</td>
                  <td className="py-3 px-4 text-purple-300 font-bold">Passes execution across siblings</td>
                  <td className="py-3 px-4">Middleware chains, serializer mixins, authorization</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">**kwargs Constructor</td>
                  <td className="py-3 px-4 font-mono text-slate-200">super().__init__(**kwargs)</td>
                  <td className="py-3 px-4">Consumes needed kwargs, forwards remainder</td>
                  <td className="py-3 px-4">Multi-inheritance classes with heterogeneous arguments</td>
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
            Explore 4 production-grade Python scripts demonstrating method overriding, cooperative diamond hierarchies, **kwargs constructor chaining, and layered fee calculations:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "method_overriding_and_super_fundamentals.py",
                code: overridingFundamentals,
                description: "Method overriding, extending parent logic via super(), and total replacement patterns.",
              },
              {
                filename: "cooperative_multiple_inheritance_and_super.py",
                code: cooperativeSuper,
                description: "Cooperative multiple inheritance and diamond problem resolution via MRO linear sequence.",
              },
              {
                filename: "super_constructor_chaining_and_kwargs.py",
                code: kwargsChaining,
                description: "Forwarding **kwargs through cooperative super().__init__() constructors in multi-mixin hierarchies.",
              },
              {
                filename: "banking_transaction_processor_and_discount_engine.py",
                code: layeredProcessor,
                description: "Enterprise Layered Transaction & Tuition Concession Processing Engine with super() calculation stacks.",
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
                <span>❌</span> Trap 1: Hardcoding `Parent.method(self)`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-rose-300 font-mono">ParentClass.method(self)</code> bypasses Python's MRO and causes diamond multiple inheritance to execute parent methods multiple times.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Always use zero-argument <code className="text-emerald-300">super().method()</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Incompatible Override Signatures (LSP)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Changing parameter counts in an overridden method breaks polymorphic callers expecting the base class signature.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> Subclasses must accept all arguments expected by parent methods.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Omission of `super()` in Mixins
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If a mixin in a cooperative diamond omits <code className="text-purple-300 font-mono">super().method()</code>, MRO traversal terminates early and subsequent mixins never execute.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Every cooperative mixin must forward calls to <code className="text-emerald-300">super().method()</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Copy-Pasting Legacy Python 2 `super()`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-cyan-300 font-mono">super(Parent, self)</code> inside a child class searches starting from Parent again, causing an infinite loop!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Rule:</span> In Python 3, write zero-argument <code className="text-emerald-300">super()</code>.
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
            Comprehensive question-and-answer repository covering method overriding, super() mechanics, cooperative multiple inheritance, and MRO traversal:
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
            Download or print the complete reference sheet with method overriding patterns, cooperative super() recipes, and layered fee calculations:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic9_method_overriding_and_super_notes.txt"
              title="Print Topic 9 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
