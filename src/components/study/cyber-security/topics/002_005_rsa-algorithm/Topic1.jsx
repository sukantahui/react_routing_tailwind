import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: Prime Preset Selector State
  const [selectedPresetKey, setSelectedPresetKey] = useState("preset_61_53");

  // Studio 2: Primality Test Selector State
  const [selectedPrimalityKey, setSelectedPrimalityKey] = useState("miller_rabin");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_millerrabin_hsm");

  // Studio 1: Prime Presets Data
  const primePresets = {
    preset_61_53: {
      key: "preset_61_53",
      name: "Pair 1: p = 61, q = 53",
      p: 61,
      q: 53,
      N: 3233,
      phiN: 3120,
      lambdaN: 780,
      gcd_p1_q1: 4,
      sampleBaseA: 17,
      eulerCheck: "17^3120 mod 3233 ≡ 1",
      tagline: "Classic small prime pair demonstrating Euler vs Carmichael totients."
    },
    preset_101_103: {
      key: "preset_101_103",
      name: "Pair 2: p = 101, q = 103 (Twin Primes)",
      p: 101,
      q: 103,
      N: 10403,
      phiN: 10200,
      lambdaN: 5100,
      gcd_p1_q1: 2,
      sampleBaseA: 23,
      eulerCheck: "23^10200 mod 10403 ≡ 1",
      tagline: "Twin prime pair demonstrating Fermat difference of squares vulnerability."
    },
    preset_137_139: {
      key: "preset_137_139",
      name: "Pair 3: p = 137, q = 139 (Strong Twin Primes)",
      p: 137,
      q: 139,
      N: 19043,
      phiN: 18768,
      lambdaN: 9384,
      gcd_p1_q1: 2,
      sampleBaseA: 47,
      eulerCheck: "47^18768 mod 19043 ≡ 1",
      tagline: "Higher-capacity prime pair showcasing totient group structure."
    }
  };

  const activePreset = primePresets[selectedPresetKey];

  // Studio 2: Primality Testing Comparison Data
  const primalityTestProfiles = {
    trial_division: {
      key: "trial_division",
      name: "1. Trial Division",
      complexity: "O( sqrt(N) ) [Exponential time]",
      errorBound: "0% Error (Deterministic)",
      status: "Infeasible for 1024-bit numbers (Requires 2^512 divisions / Billions of years).",
      vulnerability: "Computationally impossible for generating cryptographic keys.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    fermat_test: {
      key: "fermat_test",
      name: "2. Fermat Primality Test",
      complexity: "O( k * log^3(N) ) [Fast]",
      errorBound: "High (Unreliable)",
      status: "BROKEN & INSECURE: Completely fooled by Carmichael Numbers (e.g. 561 = 3*11*17).",
      vulnerability: "Infinitely many composite numbers falsely pass as prime for all coprime bases.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    miller_rabin: {
      key: "miller_rabin",
      name: "3. Miller-Rabin Primality Test (FIPS 186-5)",
      complexity: "O( k * log^3(N) ) [Ultra-Fast: ~1.2 ms]",
      errorBound: " &le; 4^(-k) (For k=64 rounds: Error < 2^-128)",
      status: "GLOBAL GOLD STANDARD: Mandatory for all commercial RSA key generation.",
      vulnerability: "None in practice: Mathematically impossible for a composite imposter to pass 64 rounds.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    aks_test: {
      key: "aks_test",
      name: "4. AKS Primality Test (Agrawal-Kayal-Saxena, IIT Kanpur)",
      complexity: "O( log^6(N) ) [Deterministic Polynomial Time]",
      errorBound: "0% Error (Unconditionally Deterministic)",
      status: "HISTORIC BREAKTHROUGH (2002): Proved that PRIMES is in computational class P.",
      vulnerability: "Higher constant factors make it slower in production hardware than Miller-Rabin.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  };

  const activePrimality = primalityTestProfiles[selectedPrimalityKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_millerrabin_hsm",
      lead: "Mamata",
      role: "Lead Cryptographic Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "Miller-Rabin 64-Round HSM KeyGen Upgrade",
      budget: "₹9,50,000",
      flaw: "Legacy HSM Running Only 10 Primality Rounds",
      dilemma:
        "Internal banking HSM key generation algorithms were running only 10 primality rounds, risking composite key generation and RBI audit failure.",
      resolution:
        "Mamata upgraded the HSM firmware to enforce 64-round Miller-Rabin primality testing, reducing composite error probability to < 2^(-128) and meeting 100% RBI compliance.",
      metrics: {
        primalityRoundsEnforced: "64 Miller-Rabin Iterations",
        errorProbability: "< 2^-128 (Mathematical Zero)",
        hsmsUpgraded: "24 Core Banking HSMs",
        compliance: "RBI & FIPS 186-5 Primality Standard"
      }
    },
    {
      id: "ichapur_totient_pacs",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "2048-Bit Hospital Certificate Euler Totient Pipeline",
      budget: "₹5,20,000",
      flaw: "Memory Leaks During Euler Totient Inversion in RAM",
      dilemma:
        "Hospital EHR servers required automated key generation pipelines that calculate phi(N) and Carmichael's lambda(N) without intermediate memory leakage.",
      resolution:
        "Mahima deployed automated key generation microservices with secure RAM zeroization, issuing 50,000+ Class-3 DSCs under Section 5 of the IT Act 2000 and DPDP Act 2023.",
      metrics: {
        certificatesIssued: "50,000+ Class-3 DSCs",
        totientOptimization: "Carmichael lambda(N) Speedup",
        zeroizationAudit: "100% Ephemeral RAM Purge",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_gnfs_benchmark",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU GNFS Factoring Threshold Benchmark",
      budget: "₹8,80,000",
      flaw: "Close Prime Factorization Risk on Industrial Gateways",
      dilemma:
        "Auditing 220kV power substation RTU cryptographic modules against Pollard's Rho and Fermat difference-of-squares attacks.",
      resolution:
        "Debangshu enforced strong prime generation (|p - q| > 2^900) across all industrial gateways, ensuring 100.00% resilience against algebraic factorization attacks and zero power grid downtime.",
      metrics: {
        primeSeparation: "|p - q| &gt; 2^900 Bits",
        fermatAttackImmunity: "100% Mathematical Immunity",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_aks_totient_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Euler Totient & AKS Primality Laboratory",
      budget: "₹4,00,000",
      flaw: "Teaching Students Euler's Totient Invariance & AKS Proofs",
      dilemma:
        "Teaching computer science students how Euler's Totient phi(N) and Carmichael's lambda(N) work in Python without modular arithmetic confusion.",
      resolution:
        "The team built an interactive number-theoretic sandbox computing gcd(e, phi(N)) and demonstrating Euler's theorem invariance (a^phi(N) ≡ 1 mod N), training 140+ students on the AKS and Miller-Rabin tests.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        pythonSandboxesAuthored: "Euler phi(N) + Carmichael lambda(N)",
        aksTheoremVerified: "Deterministic Polynomial Time P",
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
            Cyber Security Module 002_005 • Topic 1 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Mathematical Foundations of RSA: Prime Factorization and Euler's Totient
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the core number-theoretic engines of asymmetric cryptography: Euler's Totient &phi;(N) = (p-1)(q-1), 
            Carmichael's totient &lambda;(N), Euler's Theorem (a^&phi;(N) &equiv; 1 (mod N)), Miller-Rabin 64-round primality validation, and GNFS factorization complexity.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Euler's Totient & Prime Factorization Interactive Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 1: Euler's Totient &phi;(N) &amp; Prime Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a prime pair (p, q) to inspect how modulus N = p &times; q, Euler's Totient &phi;(N), and Carmichael's Totient &lambda;(N) are computed, and verify Euler's Theorem (a^&phi;(N) &equiv; 1 (mod N)).
            </p>
          </div>

          {/* Prime Preset Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(primePresets).map((pr) => {
              const isSelected = selectedPresetKey === pr.key;
              return (
                <button
                  key={pr.key}
                  onClick={() => setSelectedPresetKey(pr.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-sm text-gray-200">{pr.name}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{pr.tagline}</div>
                </button>
              );
            })}
          </div>

          {/* Active Preset Mathematical Output Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                Number Theory Computation: {activePreset.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                Prime Product &amp; Group Orders
              </h3>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Prime Factors (p, q)</span>
                <span className="font-bold text-cyan-400 text-sm">{activePreset.p}, {activePreset.q}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Modulus N = p * q</span>
                <span className="font-bold text-amber-300 text-sm">{activePreset.N}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Euler φ(N) = (p-1)(q-1)</span>
                <span className="font-bold text-emerald-400 text-sm">{activePreset.phiN}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Carmichael λ(N) = lcm</span>
                <span className="font-bold text-indigo-300 text-sm">{activePreset.lambdaN}</span>
              </div>
            </div>

            {/* Euler Theorem Verification */}
            <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/40 text-xs font-mono space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Euler's Theorem Verification (Base a = {activePreset.sampleBaseA}):</span>
              <p className="text-white text-xs sm:text-sm font-extrabold">{activePreset.eulerCheck}</p>
              <p className="text-gray-400 text-[11px] font-sans mt-1">
                Because gcd({activePreset.sampleBaseA}, {activePreset.N}) = 1, raising {activePreset.sampleBaseA} to power &phi;({activePreset.N}) = {activePreset.phiN} modulo {activePreset.N} mathematically resets to 1!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Primality Testing Comparison Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Primality Testing Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare Miller-Rabin (FIPS 186-5), the AKS deterministic test (IIT Kanpur), the flawed Fermat test, and classical trial division.
            </p>
          </div>

          {/* Test Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(primalityTestProfiles).map((pt) => {
              const isSelected = selectedPrimalityKey === pt.key;
              return (
                <button
                  key={pt.key}
                  onClick={() => setSelectedPrimalityKey(pt.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{pt.name.split(". ")[1].split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{pt.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Primality Test Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activePrimality.badgeClass)}>
                  {activePrimality.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Computational Complexity: {activePrimality.complexity}
                </h3>
              </div>
            </div>

            {/* Error Bound & Cryptographic Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Error Probability:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activePrimality.errorBound}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Cryptographic Industry Status:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activePrimality.status}</p>
              </div>
            </div>

            {/* Vulnerability Analysis */}
            <div className="p-4 bg-gray-900 rounded-xl border border-rose-900/30 text-xs space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Vulnerability &amp; Limitations:</span>
              <p className="text-gray-300 leading-relaxed">{activePrimality.vulnerability}</p>
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
              Visualizing Euler's Totient Coprime Group Order and the Miller-Rabin 64-Round Primality Testing Flowchart.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Euler's Totient Coprime Group Order */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Euler's Totient Inclusions &amp; Exclusions
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Total Space Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="450" height="230" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="40" y="50" fill="#818cf8" fontWeight="bold" fontSize="10">TOTAL MODULAR SPACE [1 .. N = p * q] (pq Integers)</text>
                  </g>

                  {/* Multiples of p */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="70" width="180" height="90" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="140" y="95" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">MULTIPLES OF p</text>
                    <text x="140" y="115" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="8">{'{p, 2p, 3p, ... qp}'}</text>
                    <text x="140" y="135" fill="#cffafe" textAnchor="middle" fontSize="8">Count = q integers</text>
                  </g>

                  {/* Multiples of q */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="70" width="180" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="360" y="95" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">MULTIPLES OF q</text>
                    <text x="360" y="115" fill="#6ee7b7" font-family="monospace" textAnchor="middle" fontSize="8">{'{q, 2q, 3q, ... pq}'}</text>
                    <text x="360" y="135" fill="#d1fae5" textAnchor="middle" fontSize="8">Count = p integers</text>
                  </g>

                  {/* Overlap & Result */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="180" width="400" height="60" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="202" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      COPRIMES φ(N) = pq - q - p + 1 = (p - 1) * (q - 1)
                    </text>
                    <text x="250" y="222" fill="#cbd5e1" textAnchor="middle" fontSize="8">
                      Subtract non-coprimes, add back single common multiple (pq) counted twice!
                    </text>
                  </g>

                  <text x="250" y="290" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Inclusion-Exclusion Principle proves that φ(p * q) = (p - 1)(q - 1) with 100% mathematical precision.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: Inclusion-exclusion algebraic visualization proving $\phi(N) = (p - 1)(q - 1)$.
              </p>
            </div>

            {/* Diagram 2: Miller-Rabin Flowchart */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Miller-Rabin 64-Round Primality Flowchart
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="25" width="400" height="40" rx="4" fill="#18181b" stroke="#6366f1" />
                    <text x="250" y="49" fill="#818cf8" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      1. Decompose N - 1 = 2^s * d (with d odd)
                    </text>
                  </g>

                  {/* Step 2 */}
                  <line x1="250" y1="65" x2="250" y2="95" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowIndigo27)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="95" width="400" height="40" rx="4" fill="#18181b" stroke="#06b6d4" />
                    <text x="250" y="119" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="8.5">
                      2. Pick random base a ∈ [2, N-2] and compute x = a^d mod N
                    </text>
                  </g>

                  {/* Step 3 */}
                  <line x1="250" y1="135" x2="250" y2="165" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan27)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="165" width="400" height="45" rx="4" fill="#18181b" stroke="#10b981" />
                    <text x="250" y="185" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="8.5">
                      3. If x == 1 or x == N-1: Pass round! Else square x up to s-1 times.
                    </text>
                    <text x="250" y="200" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      If x becomes 1 without passing through N-1 ➔ COMPOSITE!
                    </text>
                  </g>

                  {/* Step 4 */}
                  <line x1="250" y1="210" x2="250" y2="240" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen27)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="240" width="400" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="262" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      4. Repeat 64 Independent Rounds ➔ PROBABLY PRIME (Error &lt; 2^-128)
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowIndigo27" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1" />
                    </marker>
                    <marker id="arrowCyan27" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen27" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: The FIPS 186-5 Miller-Rabin probabilistic primality test workflow achieving error bound &lt; 2^-128.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Number Theory Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads upgrade banking HSMs to 64-round Miller-Rabin primality testing, optimize hospital PACS key generation, benchmark GNFS factoring against close primes, and author AKS totient labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Number Theory Challenge ({currentLocalScenario.flaw})
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
              Guidelines for cryptographic engineers implementing asymmetric key generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Number Theory Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 64-Round Miller-Rabin:</strong> Eliminates composite false positives ($P &lt; 2^{-128}$).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Carmichael lambda(N):</strong> Produces smaller private exponents $d$ for faster operations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Large Prime Separation:</strong> Ensure $|p - q| &gt; 2^{900}$ to defeat Fermat factoring.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Erase phi(N) from RAM:</strong> Once keygen completes, securely zeroize $p$, $q$, and $\phi(N)$.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Math Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Fermat's Primality Test:</strong> Carmichael numbers (like 561) fool Fermat tests completely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Choosing Close Primes:</strong> Fermat's difference of squares factors $N = x^2 - y^2$ in seconds.</span>
                  <span><strong>Choosing Close Primes:</strong> Fermat's difference of squares factors N = x^2 - y^2 in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Generating Smooth Primes:</strong> If p-1 has small factors, Pollard's p-1 breaks the key instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Publishing phi(N):</strong> Revealing phi(N) allows anyone to calculate private key d = e^-1 (mod phi(N)).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Skipping Coprimality Check:</strong> If gcd(e, phi(N)) != 1, modular inverse d does not exist.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Small Prime Generation:</strong> Primes smaller than 1024 bits can be factored by GNFS in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Predictable Pseudo-Primes:</strong> Non-CSPRNG random seeds lead to total private key compromise.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Keygen Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 64-Round Miller-Rabin:</strong> Error rate bounded below 2^-128 for certified primality.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Standardize Public Exponent e=65537:</strong> Optimal balance of security and verification speed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy FIPS 140-3 Hardware:</strong> Generate (p, q) inside air-gapped HSM silicon vaults.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Zeroize phi(N) Post-Keygen:</strong> Immediate memory purge via OPENSSL_cleanse().</span>
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
              Synthesize key prime generation and totient calculation mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Number Theorists
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why factoring N instantly breaks RSA: The private exponent d is computed from phi(N) = (p-1)(q-1). If an attacker factors N = p * q, they calculate phi(N) in 0.001 ms and compute the secret private key d using the Extended Euclidean Algorithm!
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Euler's Totient phi(N) differs from Carmichael's Lambda lambda(N): While phi(N) = (p-1)(q-1), lambda(N) = lcm(p-1, q-1) generates the exact minimal exponent required for RSA modular cycling, producing smaller valid private keys d.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your RSA key generators, always check that gcd(e, phi(N)) = 1 before computing the modular multiplicative inverse d = e^-1 (mod phi(N)); if not coprime, pick new primes p and q.
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
                <span>Euler's Totient: phi(N) = (p - 1) * (q - 1).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Carmichael Totient: lambda(N) = lcm(p - 1, q - 1).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Euler's Theorem: a^phi(N) ≡ 1 (mod N) whenever gcd(a, N) = 1.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Miller-Rabin with k=64 rounds reduces error to &lt; 2^-128 (FIPS 186-5).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AKS test (IIT Kanpur, 2002) proved that PRIMES is in deterministic class P.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Fermat's difference of squares factors close primes: N = x^2 - y^2.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Mathematical Foundations of RSA FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Mathematical Foundations of RSA (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Number theory is the magnificent mathematical backbone of public-key cryptography. Understanding Euler's Totient function phi(N) = (p-1)(q-1), Carmichael's totient lambda(N), and Euler's theorem a^phi(N) ≡ 1 mod N provides the direct mathematical key to why RSA decryption is 100% invariant and correct. Remember to always enforce 64-round Miller-Rabin primality testing and large prime separation to keep your RSA keys mathematically invincible against Pollard and Fermat attacks."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
