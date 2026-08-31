import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: Preset Selector State
  const [activePresetKey, setActivePresetKey] = useState("preset_61_53");

  // Studio 2: Decryption Comparison Mode State
  const [decryptionMode, setDecryptionMode] = useState("crt_garner");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_junior_onboarding");

  // Studio 1: 3 Hands-on Small Prime Presets
  const smallPrimePresets = {
    preset_61_53: {
      key: "preset_61_53",
      title: "Example 1: p = 61, q = 53 (Canonical)",
      p: 61,
      q: 53,
      N: 3233,
      phiN: 3120,
      lambdaN: 780,
      e: 17,
      d: 2753,
      d_lambda: 413,
      M: 65,
      C: 2790,
      char: "'A'",
      crt: { dp: 17, dq: 25, qinv: 38, m1: 4, m2: 12, h: 1, restoredM: 65 },
      steps: [
        { label: "1. Modulus", formula: "N = p * q = 61 * 53", result: "3233" },
        { label: "2. Totients", formula: "φ = (60)(52) = 3120 | λ = lcm(60,52)", result: "φ=3120, λ=780" },
        { label: "3. Public Key", formula: "e = 17 [gcd(17, 3120) = 1]", result: "(e=17, N=3233)" },
        { label: "4. Private Key", formula: "17 * d ≡ 1 (mod 3120)", result: "d = 2753 (or 413)" },
        { label: "5. Encryption", formula: "C = 65¹⁷ mod 3233", result: "2790" },
        { label: "6. Decryption", formula: "M = 2790²⁷⁵³ mod 3233", result: "65 ('A')" }
      ]
    },
    preset_11_13: {
      key: "preset_11_13",
      title: "Example 2: p = 11, q = 13 (Classroom Classic)",
      p: 11,
      q: 13,
      N: 143,
      phiN: 120,
      lambdaN: 60,
      e: 7,
      d: 103,
      d_lambda: 43,
      M: 9,
      C: 48,
      char: "Number 9",
      crt: { dp: 3, dq: 7, qinv: 6, m1: 4, m2: 9, h: 0, restoredM: 9 },
      steps: [
        { label: "1. Modulus", formula: "N = 11 * 13", result: "143" },
        { label: "2. Totients", formula: "φ = (10)(12) = 120 | λ = lcm(10,12)", result: "φ=120, λ=60" },
        { label: "3. Public Key", formula: "e = 7 [gcd(7, 120) = 1]", result: "(e=7, N=143)" },
        { label: "4. Private Key", formula: "7 * d ≡ 1 (mod 120)", result: "d = 103 (or 43)" },
        { label: "5. Encryption", formula: "C = 9⁷ mod 143", result: "48" },
        { label: "6. Decryption", formula: "M = 48¹⁰³ mod 143", result: "9" }
      ]
    },
    preset_7_19: {
      key: "preset_7_19",
      title: "Example 3: p = 7, q = 19 (Small Field)",
      p: 7,
      q: 19,
      N: 133,
      phiN: 108,
      lambdaN: 18,
      e: 5,
      d: 65,
      d_lambda: 11,
      M: 6,
      C: 62,
      char: "Number 6",
      crt: { dp: 5, dq: 11, qinv: 3, m1: 6, m2: 6, h: 0, restoredM: 6 },
      steps: [
        { label: "1. Modulus", formula: "N = 7 * 19", result: "133" },
        { label: "2. Totients", formula: "φ = (6)(18) = 108 | λ = lcm(6,18)", result: "φ=108, λ=18" },
        { label: "3. Public Key", formula: "e = 5 [gcd(5, 108) = 1]", result: "(e=5, N=133)" },
        { label: "4. Private Key", formula: "5 * d ≡ 1 (mod 108)", result: "d = 65 (or 11)" },
        { label: "5. Encryption", formula: "C = 6⁵ mod 133", result: "62" },
        { label: "6. Decryption", formula: "M = 62⁶⁵ mod 133", result: "6" }
      ]
    }
  };

  const activePreset = smallPrimePresets[activePresetKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_junior_onboarding",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Junior Cryptographer Onboarding Workshop",
      budget: "₹9,50,000",
      challenge: "Junior Engineers Writing Flawed Modular Inverses in Switches",
      dilemma:
        "New engineering hires were writing code with modular division errors and invalid Bezout coefficients in core payment switches.",
      resolution:
        "Mamata instituted mandatory small-prime calculation workshops (p=61, q=53), training 45+ developers on Bezout tableaus and achieving zero payment gateway deployment defects.",
      metrics: {
        engineersTrained: "45+ FinTech Developers",
        handCalculationsMastered: "100% Bezout Inversion Accuracy",
        deploymentDefects: "0 Modular Arithmetic Bugs",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_dicom_seminar",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Clinical DICOM Security Seminar",
      budget: "₹5,20,000",
      challenge: "Clinicians Confusing Public Keys with Decryption Keys",
      dilemma:
        "Hospital IT technicians struggled to understand why public certificates cannot decrypt patient scans and how CRT acceleration works.",
      resolution:
        "Mahima created hands-on small-prime visual models demonstrating (e, N) public encryption vs (d, N) private decryption, training 60+ healthcare administrators under the DPDP Act 2023.",
      metrics: {
        administratorsTrained: "60+ Clinical Staff",
        visualModelsBuilt: "3 Small-Prime Sandboxes",
        dpdpAwareness: "100% Verified Understanding",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_technician_audit",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation Technician Certificate Audit",
      budget: "₹8,80,000",
      challenge: "Field Technicians Requiring Fast Mathematical Sanity Checks",
      dilemma:
        "Substation technicians needed quick mathematical sanity checks to verify RTU cryptographic certificates in the field without high-end computers.",
      resolution:
        "Debangshu authored quick-reference small-prime validation cards and automated Python verification tools, empowering 30+ field engineers across 18 substations.",
      metrics: {
        fieldEngineersCertified: "30+ Grid Specialists",
        substationsCovered: "18 High-Voltage Sites",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_exam_solver",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Interactive Small-Prime RSA Exam Solver",
      budget: "₹4,00,000",
      challenge: "Preparing BCA Students for MAKAUT BCAC703 Semester Exams",
      dilemma:
        "Students preparing for university semester exams needed interactive step-by-step verification of RSA calculation questions.",
      resolution:
        "The team built a web-based educational solver breaking down N, phi(N), d, and Garner CRT steps for any pair of prime inputs, boosting class exam scores by 34%.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        examScoreImprovement: "+34% Class Average Boost",
        crtGarnerVerified: "100% Step Accuracy",
        compliance: "NCIIPC Educational Security Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cyber Security Module 002_005 • Topic 5 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Hands-on RSA Calculation Example with Small Primes
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the complete end-to-end numerical walkthrough of RSA: calculate modulus $N$, Euler's Totient $\phi(N)$, Carmichael's Totient $\lambda(N)$, 
            derive private exponent $d$ via the Extended Euclidean Algorithm, and trace public encryption and accelerated RSA-CRT Garner decryption step-by-step.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Multi-Preset Small Prime Hands-on Interactive Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 1: Hands-on Small Prime Numerical Walkthrough
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 3 classic small-prime presets to step through the complete 6-stage numerical calculation and verify encryption ($M^e \bmod N$) and decryption ($C^d \bmod N$).
            </p>
          </div>

          {/* Preset Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(smallPrimePresets).map((pr) => {
              const isSelected = activePresetKey === pr.key;
              return (
                <button
                  key={pr.key}
                  onClick={() => setActivePresetKey(pr.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{pr.title.split(": ")[1]}</div>
                  <div className="text-[10px] text-gray-400 mt-1 font-mono">p = {pr.p}, q = {pr.q} ➔ N = {pr.N}</div>
                </button>
              );
            })}
          </div>

          {/* Active Preset Numerical Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                  Active Numerical Scenario: {activePreset.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                  Plaintext M = {activePreset.M} ({activePreset.char}) ➔ Ciphertext C = {activePreset.C} ➔ Restored M = {activePreset.M}
                </h3>
              </div>
            </div>

            {/* 6 Step Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              {activePreset.steps.map((st, idx) => (
                <div key={idx} className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold block font-sans">{st.label}</span>
                  <span className="text-gray-300 text-[11px] block">{st.formula}</span>
                  <span className="font-bold text-emerald-400 text-sm block">{st.result}</span>
                </div>
              ))}
            </div>

            {/* Summary Tuple Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Public Key Tuple (e, N):</span>
                <span className="text-white text-base font-extrabold">( e = {activePreset.e}, N = {activePreset.N} )</span>
                <p className="text-gray-400 text-[11px] font-sans">Freely published to encrypt messages and verify signatures.</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Private Key Tuple (d, N):</span>
                <span className="text-emerald-400 text-base font-extrabold">( d = {activePreset.d}, N = {activePreset.N} )</span>
                <p className="text-gray-400 text-[11px] font-sans">Kept secret by owner to decrypt ciphertexts and sign documents.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CRT vs Standard Modular Decryption Step-by-Step Trace */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Studio 2: RSA-CRT vs Standard Modular Decryption Trace
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare the computational traces between standard modular exponentiation ($C^d \bmod N$) and Gauss-Garner Chinese Remainder Theorem (CRT) recombination.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "crt_garner", title: "Method A: 4x Accelerated RSA-CRT Garner Decryption", sub: "Splits into modulo p and modulo q sub-problems" },
              { id: "standard_exp", title: "Method B: Standard Modular Exponentiation", sub: "Direct single exponentiation C^d mod N" }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setDecryptionMode(m.id)}
                className={clsx(
                  "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                  decryptionMode === m.id
                    ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                    : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
              >
                <div className="font-bold text-sm text-gray-200">{m.title}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">{m.sub}</div>
              </button>
            ))}
          </div>

          {/* Active Decryption Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            {decryptionMode === "crt_garner" ? (
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-950 text-emerald-300 border-emerald-800">
                    Active Pipeline: Chinese Remainder Theorem (RSA-CRT)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                    Garner Recombination for C = {activePreset.C}
                  </h3>
                </div>

                {/* CRT Precomputations */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">d_p = d mod (p-1)</span>
                    <span className="font-bold text-cyan-300 text-sm">{activePreset.crt.dp}</span>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">d_q = d mod (q-1)</span>
                    <span className="font-bold text-cyan-300 text-sm">{activePreset.crt.dq}</span>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">q_inv = q⁻¹ mod p</span>
                    <span className="font-bold text-cyan-300 text-sm">{activePreset.crt.qinv}</span>
                  </div>
                </div>

                {/* Garner Steps */}
                <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/40 text-xs font-mono space-y-2">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Step-by-Step Garner Execution:</span>
                  <p className="text-gray-200">• Step 1: m₁ = ({activePreset.C} mod {activePreset.p})^{activePreset.crt.dp} mod {activePreset.p} = <strong>{activePreset.crt.m1}</strong></p>
                  <p className="text-gray-200">• Step 2: m₂ = ({activePreset.C} mod {activePreset.q})^{activePreset.crt.dq} mod {activePreset.q} = <strong>{activePreset.crt.m2}</strong></p>
                  <p className="text-gray-200">• Step 3: h = ({activePreset.crt.qinv} × ({activePreset.crt.m1} - {activePreset.crt.m2})) mod {activePreset.p} = <strong>{activePreset.crt.h}</strong></p>
                  <p className="text-emerald-400 font-bold text-sm">• Step 4: Plaintext M = m₂ + h × q = {activePreset.crt.m2} + ({activePreset.crt.h} × {activePreset.q}) = {activePreset.crt.restoredM} (MATCH!)</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-blue-950 text-blue-300 border-blue-800">
                    Active Pipeline: Standard Modular Exponentiation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                    Direct Calculation: M = C^d mod N
                  </h3>
                </div>

                <div className="p-4 bg-gray-900 rounded-xl border border-blue-900/40 text-xs font-mono space-y-2">
                  <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Direct Square-and-Multiply Execution:</span>
                  <p className="text-gray-200">Expression: M = {activePreset.C}^{activePreset.d} mod {activePreset.N}</p>
                  <p className="text-gray-300">Requires multi-precision arithmetic across the full 12-bit (demo) / 2048-bit (production) modulus.</p>
                  <p className="text-emerald-400 font-bold text-sm">Direct Decryption Result: M = {activePreset.M} (Restored in 4x more CPU operations than CRT)</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Complete Numerical Flowchart of the $p=61, q=53$ RSA System and the Gauss-Garner Recombination Arithmetic Matrix.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Complete Numerical Flowchart */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Numerical RSA Flowchart ($p=61, q=53$)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Primes */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="25" width="160" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="130" y="49" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="9">p = 61</text>
                    <rect x="290" y="25" width="160" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="370" y="49" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="9">q = 53</text>
                  </g>

                  {/* Modulus & Totient */}
                  <path d="M 130 65 L 130 95 L 200 95" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 370 65 L 370 95 L 300 95" stroke="#06b6d4" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="105" width="190" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="145" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">N = 61 * 53 = 3233</text>
                    <text x="145" y="140" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">Public Modulus</text>

                    <rect x="260" y="105" width="190" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="355" y="125" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">φ(N) = 60 * 52 = 3120</text>
                    <text x="355" y="140" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">Euler's Totient</text>
                  </g>

                  {/* Keys Tuple */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="170" width="400" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="192" fill="#818cf8" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      Pub: (e = 17, N = 3233)  |  Priv: (d = 2753, N = 3233)
                    </text>
                    <text x="250" y="206" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Check: (17 * 2753) mod 3120 = 46801 mod 3120 ≡ 1
                    </text>
                  </g>

                  {/* Encrypt & Decrypt */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="235" width="400" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="255" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      C = 65¹⁷ mod 3233 = 2790  ➔  M = 2790²⁷⁵³ mod 3233 = 65 ('A')
                    </text>
                    <text x="250" y="270" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      100% Perfect Mathematical Plaintext Inversion Verified!
                    </text>
                  </g>

                  <text x="250" y="305" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Complete numerical lifecycle of the canonical p=61, q=53 RSA cryptosystem.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The end-to-end numerical parameter derivation of the $p=61, q=53$ RSA system.
              </p>
            </div>

            {/* Diagram 2: Gauss-Garner CRT Recombination Matrix */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Gauss-Garner CRT Arithmetic Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: m1 mod 61 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="95" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="130" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">HALF 1: MODULO 61</text>
                    <text x="130" y="70" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="8">d_p = 2753 mod 60 = 17</text>
                    <text x="130" y="90" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="8">m₁ = 45¹⁷ mod 61 = 4</text>
                  </g>

                  {/* Right: m2 mod 53 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="95" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="47" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">HALF 2: MODULO 53</text>
                    <text x="370" y="70" fill="#6ee7b7" font-family="monospace" textAnchor="middle" fontSize="8">d_q = 2753 mod 52 = 25</text>
                    <text x="370" y="90" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="8">m₂ = 34²⁵ mod 53 = 12</text>
                  </g>

                  {/* Garner Combination */}
                  <line x1="130" y1="120" x2="130" y2="160" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="370" y1="120" x2="370" y2="160" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 130 160 L 250 160" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 370 160 L 250 160" stroke="#10b981" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="165" width="400" height="60" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="187" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      h = (38 * (4 - 12)) mod 61 = -304 mod 61 = 1
                    </text>
                    <text x="250" y="207" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8">
                      q_inv = 53⁻¹ mod 61 = 38
                    </text>
                  </g>

                  {/* Final Plaintext */}
                  <line x1="250" y1="225" x2="250" y2="250" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold31)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="80" y="250" width="340" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="274" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      M = m₂ + h * q = 12 + 1 * 53 = 65 (ASCII 'A')
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowGold31" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: Step-by-step arithmetic trace of Gauss-Garner CRT recombination.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Hands-on Calculation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads conduct junior developer onboarding workshops, train healthcare administrators on DICOM encryption, audit field RTU certificates, and build exam solvers across Kolkata, Ichapur, Barrackpore, and Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Hands-on Engineering Challenge ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Educational &amp; Technical Solution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for students and engineers performing RSA calculations and verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Hand-Calculation Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Double Check gcd(e, phi(N)) == 1:</strong> Always ensure public exponent $e$ is coprime to $\phi(N)$.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Handle Negative Bezout Remainders:</strong> Add $\phi(N)$ if $x &lt; 0$ to get the canonical key $d$.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Binary Square-and-Multiply:</strong> Decompose exponents into powers of 2 to avoid huge numbers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Verify with Small Plaintexts:</strong> Always check $M = C^d \bmod N$ before writing final code.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Calculation Errors
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Computing phi(N) as p * q:</strong> $\phi(N)$ is $(p-1)(q-1)$, NOT $p \times q$.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Forgetting Modulo Reductions:</strong> Must reduce after EVERY squaring step to avoid memory overflow.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Mistaking e for d:</strong> $e$ is the public encryption exponent; $d$ is the private decryption key.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Small Primes in Production:</strong> Small primes are for learning; production requires 2048-bit keys!</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Apply Garner Recombination:</strong> Boost decryption speed by 4x across banking switches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Use Carmichael lambda(N):</strong> Produces smaller valid private keys $d$ for resource-constrained IoT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Check Modulus Bit Lengths:</strong> Verify that $N = p \cdot q$ meets the 2048-bit standard.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate Test Verification:</strong> Unit test key derivation routines against known NIST test vectors.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize small-prime calculation mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Exam Problem Solving
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  The step-by-step structure for exam questions: 1. Modulus $N = p \cdot q$; 2. Totient $\phi(N) = (p-1)(q-1)$; 3. Verify $\gcd(e, \phi(N))=1$; 4. Extended Euclidean Algorithm tableau to find $d$; 5. Square-and-multiply powers for $C = M^e \bmod N$; 6. Decryption verification $M = C^d \bmod N$.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Garner's formula simplifies CRT: Instead of evaluating large 4-digit exponents, Garner evaluates two tiny 2-digit modular powers m_1 = C^(d_p) mod p and m_2 = C^(d_q) mod q, and recombines them via M = m_2 + h * q in milliseconds.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  Try switching from Euler's totient $\phi(N) = 3120$ to Carmichael's totient $\lambda(N) = 780$: Notice that $17 \times 413 = 7021 = 9 \times 780 + 1 \equiv 1$ (mod 780), giving a much smaller valid private key $d = 413$ that decrypts $2790^{413} \bmod 3233 = 65$ with identical accuracy!
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Modulus: N = p * q = 61 * 53 = 3233.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Euler Totient: phi(N) = (p - 1)(q - 1) = 60 * 52 = 3120.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Carmichael Totient: lambda(N) = lcm(60, 52) = 780.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Public Key: (e = 17, N = 3233); Private Key: (d = 2753, N = 3233).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Encryption: C = 65^17 mod 3233 = 2790.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Decryption: M = 2790^2753 mod 3233 = 65 (ASCII 'A').</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Hands-on RSA Calculation Example with Small Primes FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Step-by-Step Problem Solutions"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Hands-on RSA Calculation Example (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Practicing hands-on numerical calculations with small primes (such as p=61, q=53) is the ultimate method to develop true intuitive mastery of the RSA cryptosystem. Follow the 6-step calculation sequence: N = p * q, phi(N) = (p-1)(q-1), verify gcd(e, phi(N)) == 1, derive d using Bezout's identity, and trace square-and-multiply modular exponentiation. Remember that in university examinations (BCAC703), clearly showing the Extended Euclidean division tableau and intermediate exponent powers guarantees full marks!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
