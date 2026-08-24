import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import duckFundamentals from "./topic11_files/polymorphism_and_duck_typing_fundamentals.py?raw";
import operatorPoly from "./topic11_files/operator_overloading_polymorphism.py?raw";
import protocolsPEP from "./topic11_files/protocols_and_structural_subtyping.py?raw";
import gatewayEngine from "./topic11_files/multichannel_notification_and_payment_engine.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic11_files/topic11_note.txt?raw";

// FAQ Questions
import questions from "./topic11_files/topic11_questions";

/**
 * Topic11: Polymorphism & Duck Typing in Python
 * Module: 003_001_object-oriented-python
 * Segment: 3 (Advanced Python Programming)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic11() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("duckengine");

  // Interactive Gateway Dispatcher State
  const [selectedGateway, setSelectedGateway] = useState("razorpay");
  const [amountInr, setAmountInr] = useState(18000);

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

  const gateways = {
    razorpay: {
      name: "Razorpay UPI Gateway",
      currency: "INR",
      status: "SETTLED (Instant UPI Transfer)",
      ref: `RZP-STU-901-${amountInr}`,
      notification: `[WhatsApp API -> +91-9830011111] Payment of INR ${amountInr.toLocaleString()} verified. Welcome to Coder & AccoTax!`,
      isError: false,
    },
    stripe: {
      name: "Stripe International Card",
      currency: `USD ($${(amountInr / 85.0).toFixed(2)})`,
      status: `SETTLED ($${(amountInr / 85.0).toFixed(2)} USD via Stripe)`,
      ref: `STRIPE-INT-404-X4`,
      notification: `[Email SMTP Service -> student@overseas.com] Subject: Transaction Confirmation | Body: INR ${amountInr.toLocaleString()} processed.`,
      isError: false,
    },
    campus: {
      name: "Campus Cash Desk",
      currency: "INR Cash",
      status: "CASHIER_VERIFIED (Barrackpore Lab Desk)",
      ref: `CAMPUS-CASH-102-01`,
      notification: `[Telecom SMS Gateway -> +91-9830022222] Physical cash receipt generated for INR ${amountInr.toLocaleString()}.`,
      isError: false,
    },
    incompatible: {
      name: "Incompatible Payment Adapter",
      currency: "N/A",
      status: "CRASHED",
      ref: "N/A",
      notification: "N/A",
      isError: true,
      errorMsg: "AttributeError: 'IncompatiblePaymentAdapter' object has no attribute 'process_transaction'",
    },
  };

  const currentGw = gateways[selectedGateway];

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
            Topic 11
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Object-Oriented Programming (OOP) in Python
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Polymorphism &amp; <span className="text-teal-400">Duck Typing</span> in Python
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Master Python's dynamic polymorphic dispatch: the Duck Typing philosophy, eliminating brittle <code className="text-rose-400 font-mono">type(x) == Y</code> checks, operator overloading, modern static duck typing with <code className="text-teal-300 font-mono">typing.Protocol</code> (PEP 544), and building polymorphic multi-channel adapters.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🦆 Duck Typing Philosophy
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            ➕ Operator Overloading (__add__)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📜 typing.Protocol (PEP 544)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            💳 Multi-Channel Polymorphic Hub
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE DUCK TYPING PHILOSOPHY */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🦆</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Duck Typing Philosophy: Focus on Capabilities
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <blockquote className="p-4 bg-slate-950/80 rounded-xl border-l-4 border-teal-500 font-medium text-slate-200 not-italic">
              "If it walks like a duck and quacks like a duck, it's a duck."
            </blockquote>

            <p>
              In Python, polymorphism does <strong>NOT</strong> require rigid abstract base classes or explicit inheritance trees. As long as an object provides the required methods, Python executes them cleanly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Type 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg">
                <div className="text-teal-400 font-bold text-base mb-1">1️⃣ Dynamic Duck Typing</div>
                <code className="text-xs font-mono text-teal-300 block mb-1">obj.generate("Report")</code>
                <p className="text-[11px] text-slate-300">
                  Zero inheritance needed. Python executes methods based on attribute presence at runtime.
                </p>
              </div>

              {/* Type 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg">
                <div className="text-cyan-400 font-bold text-base mb-1">2️⃣ Operator Overloading</div>
                <code className="text-xs font-mono text-cyan-300 block mb-1">def __add__(self, other):</code>
                <p className="text-[11px] text-slate-300">
                  Built-in operators (+, *, ==) adapt polymorphically to custom domain objects.
                </p>
              </div>

              {/* Type 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg">
                <div className="text-purple-400 font-bold text-base mb-1">3️⃣ Protocols (PEP 544)</div>
                <code className="text-xs font-mono text-purple-300 block mb-1">class Payer(Protocol):</code>
                <p className="text-[11px] text-slate-300">
                  Static duck typing for type checkers (mypy) and runtime validation via <code className="text-purple-300">@runtime_checkable</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-rose-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Anti-Pattern: Explicit Type Checking (type(x) == Y)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-400 font-mono">if type(x) == RazorpayGateway:</code> destroys polymorphism, rejects compatible subclasses, and prevents developers from passing mock objects in unit tests. Always embrace Duck Typing or Protocols!
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
                2. Visualizing Duck Typing &amp; Protocol Architectures
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("duckengine")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "duckengine"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Duck Typing Dispatch
              </button>
              <button
                onClick={() => setActiveInteractiveTab("protocols")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "protocols"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Nominal vs Structural Subtyping
              </button>
              <button
                onClick={() => setActiveInteractiveTab("adapters")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "adapters"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Polymorphic Gateway Pipeline
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining dynamic dispatch, structural Protocol shape matching, and multi-channel adapters:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "duckengine" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">DUCK TYPING DYNAMIC DISPATCH ENGINE</text>

                {/* Left: Caller */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="340" height="240" rx="8" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="30" fill="#99f6e4" fontSize="12" fontWeight="bold">Polymorphic Caller Function</text>
                  <text x="20" y="65" fill="#ecfdf5" fontSize="10 font-mono">def publish_report(engine, title):</text>
                  <text x="40" y="90" fill="#34d399" fontSize="10 font-mono font-bold">return engine.generate(title)</text>

                  <rect x="20" y="125" width="300" height="90" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="150" fill="#a7f3d0" fontSize="10 font-bold">Zero Type Verification:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="9 font-mono">Accepts ANY object implementing</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="9 font-mono">the `.generate(title)` method!</text>
                </g>

                {/* Arrows */}
                <g transform="translate(385, 110)">
                  <text x="10" y="10" fill="#38bdf8" fontSize="20" fontWeight="bold">↗</text>
                  <text x="10" y="55" fill="#38bdf8" fontSize="20" fontWeight="bold">→</text>
                  <text x="10" y="100" fill="#38bdf8" fontSize="20" fontWeight="bold">↘</text>
                </g>

                {/* Right: 3 Unrelated Classes */}
                <g transform="translate(430, 50)">
                  <rect x="0" y="0" width="410" height="65" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="25" fill="#a5f3fc" fontSize="11 font-bold">PDFReportGenerator</text>
                  <text x="20" y="45" fill="#ecfdf5" fontSize="9 font-mono">def generate(self, title): return "PDF stream"</text>

                  <rect x="0" y="85" width="410" height="65" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="110" fill="#c4b5fd" fontSize="11 font-bold">ExcelSpreadsheetGenerator</text>
                  <text x="20" y="130" fill="#ecfdf5" fontSize="9 font-mono">def generate(self, title): return "Excel XML"</text>

                  <rect x="0" y="170" width="410" height="65" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="195" fill="#a7f3d0" fontSize="11 font-bold">HTMLWebReportGenerator</text>
                  <text x="20" y="215" fill="#ecfdf5" fontSize="9 font-mono">def generate(self, title): return "&lt;html&gt;..."</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "protocols" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">NOMINAL SUBTYPING (INHERITANCE) VS STRUCTURAL PROTOCOLS (PEP 544)</text>

                {/* Left: Nominal */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="12" fontWeight="bold">Nominal Subtyping (Inheritance)</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="10">• Subtyping is determined by CLASS NAME</text>
                  <text x="20" y="85" fill="#cbd5e1" fontSize="10">• Requires explicit: `class Card(PaymentBase):`</text>
                  
                  <rect x="20" y="125" width="340" height="90" rx="4" fill="#090d16" stroke="#6d28d9" />
                  <text x="30" y="150" fill="#fda4af" fontSize="10 font-bold">Limitation:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="9">Third-party classes cannot become subtypes</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="9">without modifying their source code inheritance!</text>
                </g>

                {/* Right: Structural */}
                <g transform="translate(460, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Structural Subtyping (typing.Protocol)</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="10">• Subtyping is determined by SHAPE &amp; METHODS</text>
                  <text x="20" y="85" fill="#34d399" fontSize="10 font-mono">class AutoPayable(Protocol):</text>
                  <text x="40" y="105" fill="#34d399" fontSize="10 font-mono">def process_charge(self, amt): ...</text>

                  <rect x="20" y="130" width="340" height="85" rx="4" fill="#022c22" stroke="#059669" />
                  <text x="30" y="155" fill="#a7f3d0" fontSize="10 font-bold">Advantage:</text>
                  <text x="30" y="175" fill="#ecfdf5" fontSize="9">Any external class matching the method signature</text>
                  <text x="30" y="195" fill="#ecfdf5" fontSize="9">is automatically a valid subtype (Duck Typing)!</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">MULTI-CHANNEL POLYMORPHIC GATEWAY DISPATCHER</text>

                {/* Central Hub */}
                <g transform="translate(30, 90)">
                  <rect x="0" y="0" width="320" height="150" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="30" fill="#a5f3fc" fontSize="12" fontWeight="bold">UnifiedInstitutionalHub</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="9 font-mono">execute_student_enrollment(</text>
                  <text x="40" y="80" fill="#38bdf8" fontSize="9 font-mono">gateway_adapter, student, amt):</text>
                  <text x="20" y="110" fill="#34d399" fontSize="9 font-mono">gateway_adapter.process_transaction()</text>
                  <text x="20" y="130" fill="#34d399" fontSize="9 font-mono">gateway_adapter.dispatch_alert()</text>
                </g>

                {/* Connectors */}
                <g transform="translate(360, 100)">
                  <text x="10" y="20" fill="#38bdf8" fontSize="18" fontWeight="bold">↗</text>
                  <text x="10" y="70" fill="#38bdf8" fontSize="18" fontWeight="bold">→</text>
                  <text x="10" y="120" fill="#38bdf8" fontSize="18" fontWeight="bold">↘</text>
                </g>

                {/* 3 Channels */}
                <g transform="translate(410, 40)">
                  <rect x="0" y="0" width="430" height="70" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="15" y="25" fill="#99f6e4" fontSize="11 font-bold">1. RazorpayUpiGateway</text>
                  <text x="15" y="45" fill="#ecfdf5" fontSize="8 font-mono">UPI Transfer + Instant WhatsApp Notification</text>

                  <rect x="0" y="90" width="430" height="70" rx="6" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="15" y="115" fill="#c4b5fd" fontSize="11 font-bold">2. StripeInternationalGateway</text>
                  <text x="15" y="135" fill="#ecfdf5" fontSize="8 font-mono">USD Card Charge + SMTP Email Confirmation</text>

                  <rect x="0" y="180" width="430" height="70" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="15" y="205" fill="#a7f3d0" fontSize="11 font-bold">3. CampusCashDeskGateway</text>
                  <text x="15" y="225" fill="#ecfdf5" fontSize="8 font-mono">Cashier Receipt Ledger + Telecom SMS Alert</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE GATEWAY DISPATCHER PLAYGROUND */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎮</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Multi-Channel Gateway Dispatcher Playground
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Select a payment adapter and enter an enrollment amount to watch the polymorphic dispatcher execute without checking object types:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
            {/* Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Select Polymorphic Adapter
              </span>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedGateway("razorpay")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedGateway === "razorpay"
                      ? "bg-teal-950/80 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-teal-300">1. RazorpayUpiGateway</div>
                  <div className="text-[11px] text-slate-400">Domestic UPI + Instant WhatsApp Alert</div>
                </button>

                <button
                  onClick={() => setSelectedGateway("stripe")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedGateway === "stripe"
                      ? "bg-cyan-950/80 border-cyan-500 text-cyan-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-cyan-300">2. StripeInternationalGateway</div>
                  <div className="text-[11px] text-slate-400">USD Card Processing + SMTP Email Alert</div>
                </button>

                <button
                  onClick={() => setSelectedGateway("campus")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedGateway === "campus"
                      ? "bg-purple-950/80 border-purple-500 text-purple-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-purple-300">3. OfflineCampusCashGateway</div>
                  <div className="text-[11px] text-slate-400">Cashier Verification + Telecom SMS Alert</div>
                </button>

                <button
                  onClick={() => setSelectedGateway("incompatible")}
                  className={clsx(
                    "p-3 rounded-lg text-left text-xs font-mono transition-all border",
                    selectedGateway === "incompatible"
                      ? "bg-rose-950/80 border-rose-500 text-rose-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="font-bold text-rose-300">4. Incompatible Adapter (Missing Method)</div>
                  <div className="text-[11px] text-slate-400">Demonstrates AttributeError Duck Typing failure</div>
                </button>
              </div>

              {/* Amount Slider */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Tuition Amount:</span>
                  <span className="text-teal-300 font-bold">INR {amountInr.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={amountInr}
                  onChange={(e) => setAmountInr(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>
            </div>

            {/* Live Dispatch Output */}
            <div className="space-y-3 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Polymorphic Hub Dispatch Trace
              </span>

              <div className={clsx(
                "p-4 rounded-xl border flex-1 space-y-2.5 text-xs font-mono",
                currentGw.isError ? "bg-rose-950/40 border-rose-800" : "bg-slate-900 border-slate-800"
              )}>
                {!currentGw.isError ? (
                  <>
                    <div className="text-slate-400">
                      Target Gateway: <span className="text-teal-300 font-bold">{currentGw.name}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400">1. Transaction Processing:</span>
                      <div className="text-emerald-300 font-bold mt-1">✓ {currentGw.status}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Ref: {currentGw.ref}</div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400">2. Polymorphic Notification:</span>
                      <div className="text-cyan-300 mt-1 break-words leading-relaxed text-[11px]">
                        {currentGw.notification}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                      Zero <code className="text-teal-400">if type ==</code> checks used! Pure duck typing execution.
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 text-rose-300">
                    <div className="font-bold text-rose-400 text-sm">❌ AttributeError Caught!</div>
                    <p className="text-[11px] leading-relaxed">
                      {currentGw.errorMsg}
                    </p>
                    <div className="p-2.5 bg-slate-950 rounded border border-rose-900 text-[11px] text-emerald-400 font-bold">
                      ✓ Fix: Implement `.process_transaction()` and `.dispatch_alert()` on adapter class!
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER POLYMORPHISM MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Polymorphism Approaches Reference Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Polymorphism Paradigm</th>
                  <th className="py-3.5 px-4 font-bold">Mechanism</th>
                  <th className="py-3.5 px-4 font-bold">Coupling Level</th>
                  <th className="py-3.5 px-4 font-bold">Primary Architectural Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Duck Typing</td>
                  <td className="py-3 px-4">Dynamic method dispatch at runtime</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Zero Coupling</td>
                  <td className="py-3 px-4">Maximum flexibility; unrelated classes interoperate freely</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">typing.Protocol (PEP 544)</td>
                  <td className="py-3 px-4">Structural Subtyping interface contracts</td>
                  <td className="py-3 px-4 text-cyan-400 font-bold">Loose Coupling</td>
                  <td className="py-3 px-4">Static type checking (mypy) + optional runtime checkable</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Operator Overloading</td>
                  <td className="py-3 px-4">Magic methods (__add__, __mul__, __eq__)</td>
                  <td className="py-3 px-4">Operator Level</td>
                  <td className="py-3 px-4">Expressive domain-driven mathematical value objects</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Abstract Base Classes (ABC)</td>
                  <td className="py-3 px-4">Nominal inheritance (@abstractmethod)</td>
                  <td className="py-3 px-4 text-amber-400">Strict Nominal</td>
                  <td className="py-3 px-4">Instantiating incomplete subclasses is forbidden at runtime</td>
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
            Explore 4 production-grade Python scripts demonstrating Duck Typing, operator overloading, PEP 544 Protocols, and multi-channel gateway hubs:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "polymorphism_and_duck_typing_fundamentals.py",
                code: duckFundamentals,
                description: "Duck Typing and polymorphic document generation across completely unrelated classes.",
              },
              {
                filename: "operator_overloading_polymorphism.py",
                code: operatorPoly,
                description: "Operator polymorphism with built-in types and custom MoneyINR domain arithmetic.",
              },
              {
                filename: "protocols_and_structural_subtyping.py",
                code: protocolsPEP,
                description: "Static Duck Typing with typing.Protocol (PEP 544) and @runtime_checkable validation.",
              },
              {
                filename: "multichannel_notification_and_payment_engine.py",
                code: gatewayEngine,
                description: "Enterprise Multi-Channel Gateway Dispatcher unifying Razorpay, Stripe, and Campus Cash desk.",
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
                <span>❌</span> Trap 1: Checking `if type(x) == ClassName`
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hardcoding exact class checks rejects compatible subclasses and valid duck-typed objects, completely sabotaging polymorphism.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Trust duck typing or use <code className="text-emerald-300">isinstance(x, Protocol)</code>.
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Forgetting `NotImplemented` in Operators
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Raising <code className="text-amber-300 font-mono">TypeError</code> directly inside <code className="text-amber-300 font-mono">__add__</code> prevents Python from trying reflected operations (<code className="text-amber-300 font-mono">__radd__</code>).
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Return <code className="text-emerald-300">NotImplemented</code> instead of raising exceptions.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Missing `@runtime_checkable` on Protocols
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Calling <code className="text-purple-300 font-mono">isinstance(obj, MyProtocol)</code> without decorating the Protocol raises <code className="text-purple-300 font-mono">TypeError: Only @runtime_checkable protocols support isinstance()</code>.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Decorate with <code className="text-emerald-300">@runtime_checkable</code>.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Silent Duck Typing Signature Mismatches
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If an adapter defines <code className="text-cyan-300 font-mono">def process(self):</code> but the caller invokes <code className="text-cyan-300 font-mono">obj.process(amount)</code>, a runtime <code className="text-cyan-300 font-mono">TypeError</code> occurs.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use <code className="text-emerald-300">typing.Protocol</code> and static linters (mypy) to verify signatures.
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
            Comprehensive question-and-answer repository covering Polymorphism, Duck Typing, operator overloading, and typing.Protocol:
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
            Download or print the complete reference sheet with Duck Typing design rules, Protocol blueprints, and multi-channel adapter patterns:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic11_polymorphism_and_duck_typing_notes.txt"
              title="Print Topic 11 Study Notes"
            />
          </div>

          {/* Teacher Bio Card */}
          <Teacher />
        </section>

      </div>
    </div>
  );
}
