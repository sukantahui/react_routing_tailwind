import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: EEA Calculation State
  const [selectedEeaKey, setSelectedEeaKey] = useState("eea_17_3120");

  // Studio 2: Modular Exponentiation State
  const [selectedExpKey, setSelectedExpKey] = useState("exp_17");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_montgomery_hsm");

  // Studio 1: Extended Euclidean Algorithm Data
  const eeaScenarios = {
    eea_17_3120: {
      key: "eea_17_3120",
      title: "Scenario A: e = 17, φ(N) = 3120",
      e: 17,
      phiN: 3120,
      gcd: 1,
      d: 2753,
      bezoutForm: "(17 * 2753) + (3120 * -15) = 1",
      verification: "(17 * 2753) mod 3120 = 46801 mod 3120 ≡ 1",
      steps: [
        { r1: 3120, r2: 17, q: 183, r: 9, x1: 0, x2: 1, x: -183 },
        { r1: 17, r2: 9, q: 1, r: 8, x1: 1, x2: -183, x: 184 },
        { r1: 9, r2: 8, q: 1, r: 1, x1: -183, x2: 184, x: -367 },
        { r1: 8, r2: 1, q: 8, r: 0, x1: 184, x2: -367, x: 2753 }
      ]
    },
    eea_7_120: {
      key: "eea_7_120",
      title: "Scenario B: e = 7, φ(N) = 120",
      e: 7,
      phiN: 120,
      gcd: 1,
      d: 103,
      bezoutForm: "(7 * 103) + (120 * -6) = 1",
      verification: "(7 * 103) mod 120 = 721 mod 120 ≡ 1",
      steps: [
        { r1: 120, r2: 7, q: 17, r: 1, x1: 0, x2: 1, x: -17 },
        { r1: 7, r2: 1, q: 7, r: 0, x1: 1, x2: -17, x: 103 }
      ]
    },
    eea_65537_10200: {
      key: "eea_65537_10200",
      title: "Scenario C: e = 65537, φ(N) = 10200",
      e: 65537,
      phiN: 10200,
      gcd: 1,
      d: 3593,
      bezoutForm: "(65537 * 3593) + (10200 * -23087) = 1",
      verification: "(65537 * 3593) mod 10200 = 235474441 mod 10200 ≡ 1",
      steps: [
        { r1: 65537, r2: 10200, q: 6, r: 4337, x1: 1, x2: 0, x: 1 },
        { r1: 10200, r2: 4337, q: 2, r: 1526, x1: 0, x2: 1, x: -2 },
        { r1: 4337, r2: 1526, q: 2, r: 1285, x1: 1, x2: -2, x: 5 },
        { r1: 1526, r2: 1285, q: 1, r: 241, x1: -2, x2: 5, x: -7 },
        { r1: 1285, r2: 241, q: 5, r: 80, x1: 5, x2: -7, x: 40 },
        { r1: 241, r2: 80, q: 3, r: 1, x1: -7, x2: 40, x: -127 }
      ]
    }
  };

  const currentEea = eeaScenarios[selectedEeaKey];

  // Studio 2: Square-and-Multiply Exponent Data
  const expScenarios = {
    exp_17: {
      key: "exp_17",
      title: "Exponent e = 17 (Binary: 10001₂)",
      baseM: 42,
      modN: 3233,
      binaryBits: ["1", "0", "0", "0", "1"],
      totalOps: "4 Squarings + 1 Multiplication = 5 Total Operations",
      naiveOps: "16 Multiplications",
      result: "42^17 mod 3233 = 2557",
      steps: [
        { step: 1, bit: "1", op: "Init", val: 42 },
        { step: 2, bit: "0", op: "Square (42²)", val: 1764 },
        { step: 3, bit: "0", op: "Square (1764² mod 3233)", val: 2603 },
        { step: 4, bit: "0", op: "Square (2603² mod 3233)", val: 994 },
        { step: 5, bit: "1", op: "Square & Multiply (994² * 42 mod 3233)", val: 2557 }
      ]
    },
    exp_65537: {
      key: "exp_65537",
      title: "Exponent e = 65537 (Binary: 10000000000000001₂)",
      baseM: 55,
      modN: 10403,
      binaryBits: ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "1"],
      totalOps: "16 Squarings + 1 Multiplication = 17 Total Operations",
      naiveOps: "65,536 Multiplications",
      result: "55^65537 mod 10403 = 7812",
      steps: [
        { step: 1, bit: "1", op: "Init", val: 55 },
        { step: 2, bit: "0 (x15)", op: "15 Successive Squarings", val: 9142 },
        { step: 17, bit: "1", op: "Final Square & Multiply", val: 7812 }
      ]
    }
  };

  const currentExp = expScenarios[selectedExpKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_montgomery_hsm",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Banking HSM Constant-Time Montgomery Upgrade",
      budget: "₹9,50,000",
      flaw: "Side-Channel SPA Power Spikes During Square-and-Multiply",
      dilemma:
        "Core payment switch HSMs were vulnerable to side-channel power analysis during modular exponentiation operations.",
      resolution:
        "Mamata deployed constant-time Montgomery Ladders with cryptographic blinding across all banking HSMs, neutralizing 100% of SPA power leaks and achieving RBI audit compliance.",
      metrics: {
        hsmsUpgraded: "24 Core Banking HSMs",
        powerLeakesNeutralized: "100% SPA Immunity",
        latency: "0.9ms per 2048-bit Signature",
        compliance: "RBI & PCI-DSS v4.0 HSM Mandate"
      }
    },
    {
      id: "ichapur_eea_pipeline",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Hospital EHR Certificate Extended Euclidean Pipeline",
      budget: "₹5,20,000",
      flaw: "Negative Bezout Coefficients Crashing Key Generation",
      dilemma:
        "Oncology PACS server certificate generation stalled when the Extended Euclidean Algorithm produced negative inverse coefficients.",
      resolution:
        "Mahima authored automated Extended Euclidean inverse modules with canonical modulo phi(N) wrapping, issuing 50,000+ Class-3 DSCs under Section 5 of the IT Act 2000 and DPDP Act 2023.",
      metrics: {
        certificatesIssued: "50,000+ Class-3 DSCs",
        moduloWrapping: "100% Canonical Inverses",
        zeroizationAudit: "100% RAM Ephemeral Purge",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_crt_fault",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation RTU RSA-CRT Fault Defense",
      budget: "₹8,80,000",
      flaw: "Bellcore Fault Injection Vulnerability in SCADA RTUs",
      dilemma:
        "Industrial RTU controllers in high-voltage substations were vulnerable to Bellcore fault injection attacks caused by electromagnetic grid interference.",
      resolution:
        "Debangshu enforced pre-transmission signature verification in RTU firmware, preventing faulty CRT signatures from leaking prime factors p and q, maintaining 100.00% grid security.",
      metrics: {
        substationsHardened: "18 High-Voltage Substations",
        bellcoreVulnerability: "0% Factorization Risk",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_eea_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Extended Euclidean & Square-and-Multiply Laboratory",
      budget: "₹4,00,000",
      flaw: "Visualizing Bezout Tableau & Binary Modular Multiplications",
      dilemma:
        "Teaching computer science students how the Extended Euclidean Algorithm and Square-and-Multiply work in Python without conceptual confusion.",
      resolution:
        "The team built an interactive step-by-step debugger tracing quotient tableaus and binary exponentiation traces, training 140+ students on modular inverses and side-channel hardening.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        eeaDebuggersAuthored: "Bezout Tableau + Square & Multiply",
        montgomerySimulated: "Constant-Time Power Traces",
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
            Cyber Security Module 002_005 • Topic 2 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Modular Arithmetic and Multiplicative Inverse in RSA
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the computational engine of RSA: master Bezout's Identity, the Extended Euclidean Algorithm (EEA) for private key derivation ($e \cdot d \equiv 1$ (mod $\phi(N)$)), 
            Square-and-Multiply binary exponentiation, Montgomery multiplication, and Chinese Remainder Theorem (RSA-CRT) optimization.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Extended Euclidean Algorithm (EEA) Modular Inverse Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 1: Extended Euclidean Algorithm (EEA) Inversion Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a parameter pair $(e, \phi(N))$ to inspect the step-by-step Bezout quotient tableau, derive secret private exponent $d = e^{-1}$ (mod $\phi(N)$), and verify modular unity ($e \cdot d \equiv 1$).
            </p>
          </div>

          {/* EEA Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(eeaScenarios).map((sc) => {
              const isSelected = selectedEeaKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedEeaKey(sc.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-sm text-gray-200">{sc.title.split(": ")[1]}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{sc.title.split(": ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active EEA Tableau Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                Bezout Inversion: {currentEea.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                Private Decryption Key d = {currentEea.d}
              </h3>
            </div>

            {/* Bezout & Verification Formula */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Bezout's Linear Combination</span>
                <span className="font-bold text-cyan-400 text-xs sm:text-sm block">{currentEea.bezoutForm}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Modular Inversion Verification</span>
                <span className="font-bold text-emerald-400 text-xs sm:text-sm block">{currentEea.verification}</span>
              </div>
            </div>

            {/* Step-by-Step Tableau Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Euclidean Division Tableau &amp; Coefficient Tracking
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono text-gray-300 border border-gray-800 rounded-xl overflow-hidden">
                  <thead className="bg-gray-900 text-gray-400 uppercase text-[10px] border-b border-gray-800">
                    <tr>
                      <th className="p-2.5">Dividend (r₁)</th>
                      <th className="p-2.5">Divisor (r₂)</th>
                      <th className="p-2.5">Quotient (q)</th>
                      <th className="p-2.5">Remainder (r)</th>
                      <th className="p-2.5">Bezout x</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-850">
                    {currentEea.steps.map((st, idx) => (
                      <tr key={idx} className="hover:bg-gray-900/60 transition-colors">
                        <td className="p-2.5 text-gray-300">{st.r1}</td>
                        <td className="p-2.5 text-cyan-300">{st.r2}</td>
                        <td className="p-2.5 text-amber-300">{st.q}</td>
                        <td className="p-2.5 font-bold text-emerald-400">{st.r}</td>
                        <td className="p-2.5 text-indigo-300 font-bold">{st.x}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Square-and-Multiply Modular Exponentiation Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Studio 2: Square-and-Multiply Exponentiation Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the binary bits of exponent $e$ to observe how repeated squaring and conditional multiplication reduce computational operations from $O(e)$ to $O(\log e)$.
            </p>
          </div>

          {/* Exponent Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(expScenarios).map((ex) => {
              const isSelected = selectedExpKey === ex.key;
              return (
                <button
                  key={ex.key}
                  onClick={() => setSelectedExpKey(ex.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-sm text-gray-200">{ex.title.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{ex.totalOps}</div>
                </button>
              );
            })}
          </div>

          {/* Active Exponent Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-950 text-emerald-300 border-emerald-800">
                  Binary Exponentiation: {currentExp.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentExp.result}
                </h3>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Square-and-Multiply Complexity:</span>
                <span className="font-bold text-emerald-400 text-xs sm:text-sm">{currentExp.totalOps}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Naive Exponentiation Complexity:</span>
                <span className="font-bold text-rose-400 text-xs sm:text-sm">{currentExp.naiveOps}</span>
              </div>
            </div>

            {/* Step Trace */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Modular Exponentiation Step Execution
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs font-mono">
                {currentExp.steps.map((st) => (
                  <div key={st.step} className="bg-gray-900 p-3 rounded-xl border border-gray-800 space-y-1">
                    <span className="text-[10px] text-indigo-400 uppercase font-bold block">Bit {st.bit} (Step {st.step})</span>
                    <span className="text-gray-300 text-[11px] block">{st.op}</span>
                    <span className="font-bold text-cyan-300 block">Accumulator: {st.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the Extended Euclidean Algorithm State Machine and the Constant-Time Montgomery Ladder Pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Extended Euclidean State Machine */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Extended Euclidean Algorithm State Machine
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Inputs */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="25" width="400" height="40" rx="4" fill="#18181b" stroke="#6366f1" />
                    <text x="250" y="49" fill="#818cf8" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      INPUT: Public Exponent e &amp; Totient φ(N) [with gcd(e, φ) = 1]
                    </text>
                  </g>

                  {/* Loop Box */}
                  <line x1="250" y1="65" x2="250" y2="95" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo28)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="95" width="400" height="85" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="117" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9.5">DIVISION &amp; BEZOUT ACCUMULATION LOOP</text>
                    <text x="250" y="137" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="8">
                      q = r₁ // r₂  |  r = r₁ - q * r₂
                    </text>
                    <text x="250" y="157" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="8">
                      x = x₁ - q * x₂  |  r₁ = r₂, r₂ = r, x₁ = x₂, x₂ = x
                    </text>
                  </g>

                  {/* Negative Correction Box */}
                  <line x1="250" y1="180" x2="250" y2="210" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan28)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="210" width="400" height="40" rx="4" fill="#1e1b4b" stroke="#f59e0b" />
                    <text x="250" y="234" fill="#fbbf24" font-family="monospace" textAnchor="middle" fontSize="8.5">
                      CANONICAL POSITIVE: If x₁ &lt; 0: d = x₁ + φ(N)  Else: d = x₁
                    </text>
                  </g>

                  {/* Output */}
                  <line x1="250" y1="250" x2="250" y2="275" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold28)" />
                  <text x="250" y="295" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                    OUTPUT: Private Decryption Key d = e⁻¹ mod φ(N)
                  </text>

                  <defs>
                    <marker id="arrowIndigo28" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowCyan28" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGold28" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: Extended Euclidean Algorithm state machine deriving positive modular inverse $d$.
              </p>
            </div>

            {/* Diagram 2: Montgomery Ladder Constant-Time Exponentiation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Constant-Time Montgomery Ladder Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step bit = 0 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="210" height="110" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="130" y="55" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">WHEN KEY BIT = 0</text>
                    <text x="130" y="80" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">R₁ = MontMul(R₀, R₁)</text>
                    <text x="130" y="105" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">R₀ = MontMul(R₀, R₀)</text>
                    <text x="130" y="125" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">2 Multiplications Executed</text>
                  </g>

                  {/* Step bit = 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="30" width="210" height="110" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="370" y="55" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">WHEN KEY BIT = 1</text>
                    <text x="370" y="80" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">R₀ = MontMul(R₀, R₁)</text>
                    <text x="370" y="105" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="8.5">R₁ = MontMul(R₁, R₁)</text>
                    <text x="370" y="125" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">2 Multiplications Executed</text>
                  </g>

                  {/* Security Outcome */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="170" width="400" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="195" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      UNIFORM POWER CONSUMPTION (SPA IMMUNITY)
                    </text>
                    <text x="250" y="215" fill="#a7f3d0" textAnchor="middle" fontSize="8">
                      Exactly two multiplications execute on every clock cycle ➔ ZERO POWER SPIKES!
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Montgomery Ladder eliminates simple power analysis and timing side channels in cryptographic hardware.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: Constant-time Montgomery Ladder executing identical operations for bits 0 and 1, defeating SPA side channels.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Modular Arithmetic Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads upgrade banking HSMs with Montgomery Ladders, resolve negative Bezout coefficients in hospital EHRs, harden SCADA RTUs against Bellcore fault injection, and author interactive EEA debuggers across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                &gt;
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
                  <span>⚡</span> Modular Math Vulnerability ({currentLocalScenario.flaw})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Engineering Solution
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
              Guidelines for cryptographic engineers designing modular arithmetic execution engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Modular Engineering Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Handle Negative Bezout Coefficients:</strong> Add $\phi(N)$ if $x &lt; 0$ to get the canonical positive key $d$.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Montgomery Multiplication:</strong> Eliminates expensive hardware integer division operations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Implement Cryptographic Blinding:</strong> Randomize modular operations to defeat timing and SPA leaks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Verify RSA-CRT Signatures:</strong> Check $(S)^e \equiv M \pmod N$ before sending to block Bellcore faults.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Modular Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Naive Variable-Time Math:</strong> Power traces leak private exponent bits directly to eavesdroppers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Skipping gcd(e, phi(N)) == 1:</strong> If not coprime, no modular multiplicative inverse $d$ exists.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Array Table Lookups:</strong> Cache hits leak power table indices via Flush+Reload attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Returning Raw Negative d:</strong> Results in invalid exponentiation operations in standard crypto engines.</span>
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
                  <span><strong>Deploy Constant-Time Montgomery Ladders:</strong> Uniform power traces guarantee FIPS 140-3 compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with Section 65B:</strong> Side-channel immune signatures eliminate court repudiation claims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Accelerate with RSA-CRT:</strong> Deliver 4x faster private key decryption across cloud edge servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Use Branchless Masking:</strong> Protect windowed modular exponentiation from cache-timing leaks.</span>
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
              Synthesize key modular arithmetic principles before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Modular Arithmetic Security
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  How Bezout's Identity links to modular inverses: Because $\gcd(e, \phi(N)) = 1$, there exist integers $d$ and $k$ such that $e \cdot d + \phi(N) \cdot k = 1$. Taking this modulo $\phi(N)$ proves that $e \cdot d \equiv 1$ (mod $\phi(N)$).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why Square-and-Multiply is so fast: Scanning the binary bits of $e$ allows the algorithm to replace $e-1$ multiplications with at most $\log_2(e)$ squarings and multiplications, turning an impossible $10^{616}$-step calculation into 3,072 microsecond operations.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your RSA decryption code, always enable cryptographic blinding ($C' = C \cdot r^e \bmod N$): blinding adds random mathematical noise to physical execution times, making timing attacks and side-channel eavesdropping mathematically impossible.
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
                <span>Modular Multiplicative Inverse: e * d ≡ 1 (mod phi(N)).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Bezout's Identity: e * d + phi(N) * k = gcd(e, phi(N)) = 1.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Extended Euclidean Algorithm finds d in logarithmic time O(log(phi(N))).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Square-and-Multiply computes M^e mod N in O(log e) operations.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Montgomery Multiplication eliminates division via fast bit-shifts.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Chinese Remainder Theorem (CRT) accelerates RSA decryption by 4x.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Modular Arithmetic and Multiplicative Inverse in RSA FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Modular Arithmetic & Multiplicative Inverses (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Modular arithmetic is the practical execution engine of all public-key cryptosystems. Master the Extended Euclidean Algorithm (EEA) to understand how private key d is derived from public exponent e and Euler's Totient phi(N). In modern production environments, always enforce constant-time Montgomery exponentiation, cryptographic blinding, and RSA-CRT verification to ensure your cryptographic implementations remain mathematically sound and immune to physical side-channel attacks."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
