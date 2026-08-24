import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

// Common Shared Components
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Python Code Examples (Imported with ?raw)
import moduleAnatomy from "./topic3_files/custom_module_anatomy.py?raw";
import exportControl from "./topic3_files/export_control_with_all.py?raw";
import multiModule from "./topic3_files/multi_module_import_demo.py?raw";
import feeManagerModule from "./topic3_files/student_fee_management_module.py?raw";

// Plain Text Note for Printing/Downloading
import noteText from "./topic3_files/topic3_note.txt?raw";

// FAQ Questions
import questions from "./topic3_files/topic3_questions";

/**
 * Topic3: Creating and structuring custom user-defined modules
 * Module: 002_009_modules-packages
 * Segment: 2 (Practical Python for Real-World Development)
 *
 * Premium Dark Theme Default with Rich Micro-Animations & Full Interactivity.
 */
export default function Topic3() {
  const sectionRefs = useRef([]);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState("pep8layout");

  // Interactive Custom Module Architect State
  const [includeCalc, setIncludeCalc] = useState(true);
  const [includeReceipt, setIncludeReceipt] = useState(true);
  const [includePrivate, setIncludePrivate] = useState(false);

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

  const getExportList = () => {
    const exports = [];
    if (includeCalc) exports.push('"calculate_fee"');
    if (includeReceipt) exports.push('"generate_receipt"');
    if (includePrivate) exports.push('"_private_db_sync"');
    return exports;
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
            Segment 2 • Module 002_009
          </span>
          <span className="text-xs sm:text-sm font-mono bg-cyan-950/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-800/80 shadow-sm shadow-cyan-950/50">
            Topic 3
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-400">
            Modules, Packages &amp; Python Standard Library
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Creating &amp; Structuring Custom User-Defined Modules
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 mt-3 max-w-3xl font-normal leading-relaxed">
          Design clean, reusable, production-ready Python modules: canonical PEP 8 layouts, public API whitelisting with <code className="text-teal-300 font-mono">__all__</code>, private symbol encapsulation with leading underscores (<code className="text-purple-300 font-mono">_helper</code>), layered separation of concerns, and self-testing module execution guards.
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            📐 Canonical PEP 8 Module Layout
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🛡️ Public Whitelisting with __all__
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🔒 Private Helper Encapsulation (_name)
          </span>
          <span className="text-xs sm:text-sm bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-lg text-slate-300 font-medium">
            🏗️ Decoupled Multi-Module Architecture
          </span>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ==================================================================== */}
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: THE ANATOMY OF A CUSTOM MODULE */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🧱</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              1. The Anatomy of an Enterprise Python Custom Module
            </h2>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p>
              A Python module is more than just code inside a <code className="text-teal-400 font-mono">.py</code> file. Professional modules follow a standardized architectural structure that maximizes readability, safety, and reusability:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 not-prose">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/60 shadow-lg shadow-teal-950/30">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-base mb-1">
                  <span>1️⃣</span> Module Metadata &amp; Docs
                </div>
                <p className="text-xs text-slate-300">
                  Comprehensive docstring at line 1 (<code className="text-teal-300">__doc__</code>), version, and author metadata.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 shadow-lg shadow-cyan-950/30">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base mb-1">
                  <span>2️⃣</span> Public Whitelist (__all__)
                </div>
                <p className="text-xs text-slate-300">
                  Defines the explicit public contract for consumers using <code className="text-cyan-300">__all__ = [...]</code>.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 shadow-lg shadow-purple-950/30">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-base mb-1">
                  <span>3️⃣</span> Main Guard Self-Tests
                </div>
                <p className="text-xs text-slate-300">
                  Provides standalone test and demo execution via <code className="text-purple-300">if __name__ == '__main__':</code>.
                </p>
              </div>
            </div>

            <div className="bg-slate-950/70 p-5 rounded-xl border-l-4 border-teal-500 border border-slate-800/80">
              <h3 className="text-white font-bold text-base mb-1">
                The Consenting Adults Encapsulation Principle
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Python does not have <code className="text-rose-400 font-mono">private</code> keywords like Java or C++. Instead, Python uses the leading underscore convention (<code className="text-teal-300 font-mono">_internal_helper</code>). It signals: <em>"This is an implementation detail subject to change — do not call this directly outside the module."</em>
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
                2. Visualizing Module Structure &amp; Export Control
              </h2>
            </div>

            {/* Interactive Toggle for Diagram Perspectives */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveInteractiveTab("pep8layout")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "pep8layout"
                    ? "bg-teal-900/50 text-teal-300 border border-teal-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Canonical PEP 8 Layout
              </button>
              <button
                onClick={() => setActiveInteractiveTab("allwhitelist")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "allwhitelist"
                    ? "bg-cyan-900/50 text-cyan-300 border border-cyan-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                __all__ Whitelist Filter
              </button>
              <button
                onClick={() => setActiveInteractiveTab("layered")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeInteractiveTab === "layered"
                    ? "bg-purple-900/50 text-purple-300 border border-purple-700/60 shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Layered Architecture
              </button>
            </div>
          </div>

          <p className="text-slate-300 mb-6 text-base">
            Examining standard module layouts, public export filtering, and multi-file separation of concerns:
          </p>

          {/* SVG Diagram Container */}
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800/90 shadow-2xl">
            {activeInteractiveTab === "pep8layout" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#2dd4bf" fontSize="14" fontWeight="bold">CANONICAL PEP 8 MODULE LAYOUT (Top-to-Bottom Order)</text>

                {/* 6 Layer Blocks */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="810" height="35" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="20" y="22" fill="#99f6e4" fontSize="12" fontWeight="bold">1. Module Docstring ("""...""") &amp; Semantic Versioning</text>

                  <rect x="0" y="45" width="810" height="35" rx="6" fill="#1e293b" stroke="#38bdf8" />
                  <text x="20" y="67" fill="#bae6fd" fontSize="12" fontWeight="bold">2. Grouped Imports (Standard Library → Third-Party → Local Modules)</text>

                  <rect x="0" y="90" width="810" height="35" rx="6" fill="#083344" stroke="#06b6d4" />
                  <text x="20" y="112" fill="#a5f3fc" fontSize="12" fontWeight="bold">3. Public Export Whitelist: __all__ = ["ClassA", "function_b"]</text>

                  <rect x="0" y="135" width="810" height="35" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="20" y="157" fill="#c7d2fe" fontSize="12" fontWeight="bold">4. Module Constants (UPPERCASE_WITH_UNDERSCORES)</text>

                  <rect x="0" y="180" width="810" height="45" rx="6" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="202" fill="#a7f3d0" fontSize="12" fontWeight="bold">5. Classes, Public Functions &amp; Private Internal Helpers (_helper)</text>

                  <rect x="0" y="235" width="810" height="35" rx="6" fill="#312e81" stroke="#6366f1" />
                  <text x="20" y="257" fill="#e0e7ff" fontSize="12" fontWeight="bold">6. Execution Guard: if __name__ == '__main__': (Self-Testing / CLI Entry)</text>
                </g>
              </svg>
            ) : activeInteractiveTab === "allwhitelist" ? (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#38bdf8" fontSize="14" fontWeight="bold">HOW __all__ CONTROLS WILDCARD IMPORTS (from module import *)</text>

                {/* Module symbols source */}
                <g transform="translate(30, 50)">
                  <rect x="0" y="0" width="380" height="240" rx="8" fill="#1e293b" stroke="#475569" />
                  <text x="20" y="30" fill="#f8fafc" fontSize="13" fontWeight="bold">Module Source: fee_manager.py</text>
                  <text x="20" y="60" fill="#34d399" fontSize="12 font-mono">def calculate_fee(): ...</text>
                  <text x="20" y="85" fill="#34d399" fontSize="12 font-mono">def generate_receipt(): ...</text>
                  <text x="20" y="110" fill="#f43f5e" fontSize="12 font-mono">def _internal_db_sync(): ...</text>
                  <text x="20" y="135" fill="#94a3b8" fontSize="12 font-mono">def helper_unlisted(): ...</text>
                  <text x="20" y="170" fill="#38bdf8" fontSize="12 font-mono">__all__ = ['calculate_fee', 'generate_receipt']</text>
                </g>

                {/* Consumer result */}
                <g transform="translate(450, 50)">
                  <rect x="0" y="0" width="390" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="20" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">Consumer: from fee_manager import *</text>
                  <text x="20" y="70" fill="#ecfdf5" fontSize="12">✓ <tspan fill="#34d399" fontWeight="bold">calculate_fee</tspan> is imported into namespace</text>
                  <text x="20" y="100" fill="#ecfdf5" fontSize="12">✓ <tspan fill="#34d399" fontWeight="bold">generate_receipt</tspan> is imported into namespace</text>
                  <text x="20" y="140" fill="#fca5a5" fontSize="12">✗ <tspan fill="#f43f5e">_internal_db_sync</tspan> is HIDDEN (Excluded)</text>
                  <text x="20" y="170" fill="#fca5a5" fontSize="12">✗ <tspan fill="#f43f5e">helper_unlisted</tspan> is HIDDEN (Not in __all__)</text>
                </g>
              </svg>
            ) : (
              <svg viewBox="0 0 880 340" className="w-full h-auto min-w-[700px] font-sans">
                <text x="30" y="30" fill="#c084fc" fontSize="14" fontWeight="bold">MULTI-MODULE LAYERED SEPARATION OF CONCERNS</text>

                {/* 3 Layered Boxes */}
                <g transform="translate(30, 50)">
                  {/* Layer 1 */}
                  <rect x="0" y="0" width="250" height="240" rx="8" fill="#1e1b4b" stroke="#8b5cf6" />
                  <text x="20" y="30" fill="#c4b5fd" fontSize="13" fontWeight="bold">1. Config Layer (config.py)</text>
                  <text x="20" y="60" fill="#cbd5e1" fontSize="11">• Constants &amp; Rates</text>
                  <text x="20" y="80" fill="#cbd5e1" fontSize="11">• Environment Variables</text>
                  <text x="20" y="100" fill="#cbd5e1" fontSize="11">• No business logic!</text>
                  <rect x="20" y="180" width="210" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="30" y="205" fill="#34d399" fontSize="11 font-mono">GST_RATE = 0.18</text>

                  {/* Layer 2 */}
                  <rect x="280" y="0" width="250" height="240" rx="8" fill="#064e3b" stroke="#10b981" />
                  <text x="300" y="30" fill="#a7f3d0" fontSize="13" fontWeight="bold">2. Logic Layer (logic.py)</text>
                  <text x="300" y="60" fill="#ecfdf5" fontSize="11">• Pure calculation functions</text>
                  <text x="300" y="80" fill="#ecfdf5" fontSize="11">• Algorithms &amp; Validation</text>
                  <text x="300" y="100" fill="#ecfdf5" fontSize="11">• Zero print() calls</text>
                  <rect x="300" y="180" width="210" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="310" y="205" fill="#34d399" fontSize="11 font-mono">def calculate_tax(): ...</text>

                  {/* Layer 3 */}
                  <rect x="560" y="0" width="250" height="240" rx="8" fill="#083344" stroke="#06b6d4" />
                  <text x="580" y="30" fill="#a5f3fc" fontSize="13" fontWeight="bold">3. Formatter Layer (ui.py)</text>
                  <text x="580" y="60" fill="#ecfdf5" fontSize="11">• ASCII Receipt formatting</text>
                  <text x="580" y="80" fill="#ecfdf5" fontSize="11">• HTML/JSON Exporters</text>
                  <text x="580" y="100" fill="#ecfdf5" fontSize="11">• CLI output rendering</text>
                  <rect x="580" y="180" width="210" height="40" rx="4" fill="#090d16" stroke="#475569" />
                  <text x="590" y="205" fill="#34d399" fontSize="11 font-mono">def print_receipt(): ...</text>
                </g>
              </svg>
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: INTERACTIVE CUSTOM MODULE ARCHITECT */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              3. Interactive Custom Module Architect &amp; Whitelist Simulator
            </h2>
          </div>

          <p className="text-slate-300 mb-6 text-base leading-relaxed">
            Toggle which functions are included in the module's public <code className="text-teal-400 font-mono">__all__</code> export whitelist and inspect live generated code:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8">
            {/* Left Controls */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block font-bold">
                Configure Public API Whitelist (__all__)
              </span>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeCalc}
                    onChange={(e) => setIncludeCalc(e.target.checked)}
                    className="rounded border-slate-700 text-teal-500 focus:ring-0"
                  />
                  <div>
                    <code className="text-xs font-mono text-emerald-300 font-bold block">calculate_fee</code>
                    <span className="text-[11px] text-slate-400">Public business logic function</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeReceipt}
                    onChange={(e) => setIncludeReceipt(e.target.checked)}
                    className="rounded border-slate-700 text-teal-500 focus:ring-0"
                  />
                  <div>
                    <code className="text-xs font-mono text-emerald-300 font-bold block">generate_receipt</code>
                    <span className="text-[11px] text-slate-400">Public receipt formatting helper</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includePrivate}
                    onChange={(e) => setIncludePrivate(e.target.checked)}
                    className="rounded border-slate-700 text-teal-500 focus:ring-0"
                  />
                  <div>
                    <code className="text-xs font-mono text-rose-400 font-bold block">_private_db_sync</code>
                    <span className="text-[11px] text-slate-400">Internal helper (Anti-pattern to export in __all__)</span>
                  </div>
                </label>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-teal-400 font-bold block mb-1">Active __all__ Whitelist:</span>
                <code>__all__ = [{getExportList().join(", ")}]</code>
              </div>
            </div>

            {/* Right Generated Python Module */}
            <div className="space-y-2 flex flex-col justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Generated Custom Module (fee_manager.py)
              </span>
              <pre className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-teal-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap flex-1 max-h-72">
{`"""Fee Manager Module for Coder & AccoTax."""

import sys
import datetime as dt

__all__ = [${getExportList().join(", ")}]

GST_RATE: float = 0.18

def calculate_fee(base: float) -> float:
    return base * (1 + GST_RATE)

def generate_receipt(student: str, fee: float) -> str:
    return f"Receipt: {student} -> INR {fee:,.2f}"

def _private_db_sync() -> None:
    pass

if __name__ == "__main__":
    print("Self-testing fee_manager module...")
`}
              </pre>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: MASTER CUSTOM MODULE DESIGN MATRIX */}
        {/* ------------------------------------------------------------------ */}
        <section
          ref={addToRefs}
          className="section-hidden bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-950/40 border border-slate-800/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/80"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📊</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              4. Master Custom Module Design Guidelines Matrix
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-200 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold">Element</th>
                  <th className="py-3.5 px-4 font-bold">Naming / Syntax Convention</th>
                  <th className="py-3.5 px-4 font-bold">PEP 8 Placement</th>
                  <th className="py-3.5 px-4 font-bold">Purpose &amp; Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-teal-300 font-semibold">Module Docstring</td>
                  <td className="py-3 px-4 font-mono text-slate-200">"""Module summary."""</td>
                  <td className="py-3 px-4">Line 1 of file</td>
                  <td className="py-3 px-4">Explains module purpose, author, version, and license</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">Import Section</td>
                  <td className="py-3 px-4 font-mono text-slate-200">import stdlib; import 3rd; from . import</td>
                  <td className="py-3 px-4">After docstring</td>
                  <td className="py-3 px-4">Grouped into 3 distinct blocks separated by blank lines</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-blue-300 font-semibold">Public Whitelist</td>
                  <td className="py-3 px-4 font-mono text-slate-200">__all__ = ["func1", "ClassA"]</td>
                  <td className="py-3 px-4">After imports</td>
                  <td className="py-3 px-4">Restricts symbols exported on wildcard imports</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-purple-300 font-semibold">Constants</td>
                  <td className="py-3 px-4 font-mono text-slate-200">GST_RATE, MAX_RETRIES</td>
                  <td className="py-3 px-4">After __all__</td>
                  <td className="py-3 px-4">Configuration constants in uppercase with underscores</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-emerald-300 font-semibold">Private Helpers</td>
                  <td className="py-3 px-4 font-mono text-slate-200">_validate_amount(x)</td>
                  <td className="py-3 px-4">Alongside public logic</td>
                  <td className="py-3 px-4">Leading underscore signals internal implementation details</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-amber-300 font-semibold">Execution Guard</td>
                  <td className="py-3 px-4 font-mono text-slate-200">if __name__ == '__main__':</td>
                  <td className="py-3 px-4">Bottom of file</td>
                  <td className="py-3 px-4">Self-testing code that runs only when executed directly</td>
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
            Explore 4 production-grade Python scripts demonstrating canonical module layout, __all__ export control, multi-module separation of concerns, and student fee managers:
          </p>

          <PythonFileLoader
            files={[
              {
                filename: "custom_module_anatomy.py",
                code: moduleAnatomy,
                description: "Canonical PEP-8 module structure: docstrings, __all__ whitelist, constants, private helpers, and self-testing guard.",
              },
              {
                filename: "export_control_with_all.py",
                code: exportControl,
                description: "How __all__ restricts wildcard exports and encapsulates private internal functions.",
              },
              {
                filename: "multi_module_import_demo.py",
                code: multiModule,
                description: "Layered multi-module architecture: config layer, business logic layer, and presentation orchestration.",
              },
              {
                filename: "student_fee_management_module.py",
                code: feeManagerModule,
                description: "Production student fee calculation and ASCII receipt generator module with type annotations.",
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
                <span>❌</span> Trap 1: Executable Code Outside Functions
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Writing <code className="text-rose-300 font-mono">print()</code> or database queries at the top level of a module causes them to execute immediately whenever another file imports it!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Wrap demo executions inside <code className="text-emerald-300">if __name__ == '__main__':</code>
              </div>
            </div>

            {/* Trap 2 */}
            <div className="p-6 rounded-xl bg-amber-950/30 border border-amber-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <span>❌</span> Trap 2: Typo in `__all__` Identifier Strings
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you misspell a function name in <code className="text-amber-300 font-mono">__all__ = ["calc_feee"]</code>, Python crashes with <code className="text-rose-400 font-mono">AttributeError</code> when imported with wildcard!
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Tip:</span> Ensure strings in <code className="text-emerald-300">__all__</code> match actual function and class names exactly.
              </div>
            </div>

            {/* Trap 3 */}
            <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                <span>❌</span> Trap 3: Heavy I/O at Module Top Level
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Opening heavy files or connecting to network sockets at the module level slows down test suites and crashes scripts if the resource is temporarily offline.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Use lazy initialization functions or factories.
              </div>
            </div>

            {/* Trap 4 */}
            <div className="p-6 rounded-xl bg-cyan-950/30 border border-cyan-800/60 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
                <span>❌</span> Trap 4: Mutating Shared Module-Level Variables
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Modifying a module variable from another file creates hidden coupling and unpredictable concurrency bugs across your application.
              </p>
              <div className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-400">
                <span className="text-emerald-400 font-bold">Fix:</span> Pass state explicitly via function arguments or object instances.
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
            Comprehensive question-and-answer repository covering custom module architecture, __all__ whitelisting, private helper conventions, and multi-module design:
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
            Download or print the complete reference sheet with PEP 8 module layouts, __all__ rules, and layered architecture diagrams:
          </p>

          <div className="mb-10">
            <PlainTextPrint
              content={noteText}
              filename="python_topic3_custom_user_defined_modules_notes.txt"
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
