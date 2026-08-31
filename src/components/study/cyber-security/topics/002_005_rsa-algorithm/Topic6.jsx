import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: Attack Vector Simulator State
  const [selectedAttackKey, setSelectedAttackKey] = useState("wiener_attack");

  // Studio 2: Hardening Strategy State
  const [selectedDefenseKey, setSelectedDefenseKey] = useState("oaep_padding");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_wiener_audit");

  // Studio 1: 4 Attack Profiles Data
  const attackProfiles = {
    wiener_attack: {
      key: "wiener_attack",
      name: "1. Wiener's Continued Fraction Attack (1990)",
      category: "Small Private Exponent Cryptanalysis",
      mathMechanism: "Continued Fraction expansion of (e / N) yields convergents k/d; one convergent yields the exact secret key d in polynomial time.",
      vulnerabilityBound: "d < (1/3) * N^(0.25)  [e.g. d < 2^512 for 2048-bit modulus]",
      exploitSpeed: "< 0.05 seconds (Trivial Polynomial Time O(log N))",
      remedy: "Always generate private key d with full 2048-bit entropy; never truncate d to speed up decryption.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    fermat_factorization: {
      key: "fermat_factorization",
      name: "2. Fermat's Difference of Squares Factorization",
      category: "Algebraic Prime Distribution Flaw",
      mathMechanism: "Every odd integer N = x² - y² = (x - y)(x + y); if p ≈ q, x = (p+q)/2 ≈ √N, finding y² = x² - N in a few loop iterations.",
      vulnerabilityBound: "|p - q| < 2^(n/4)  [Primes chosen too close together]",
      exploitSpeed: "< 0.01 seconds (A few loops starting from ⌈√N⌉)",
      remedy: "Enforce random prime separation |p - q| > 2^900 during key generation.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    bleichenbacher_oracle: {
      key: "bleichenbacher_oracle",
      name: "3. Bleichenbacher Padding Oracle (Million Message)",
      category: "Implementation & Error Oracle Vulnerability",
      mathMechanism: "Server returns distinguishable errors for invalid PKCS#1 v1.5 padding; attacker sends adapted ciphertexts C' = C * s^e mod N to halve intervals.",
      vulnerabilityBound: "PKCS#1 v1.5 Padding with error feedback",
      exploitSpeed: "~1,000,000 queries (Few minutes of automated API requests)",
      remedy: "Standardize on RSA-OAEP with SHA-256 and enforce uniform constant-time error responses.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    bellcore_fault: {
      key: "bellcore_fault",
      name: "4. Bellcore CRT Hardware Fault Injection (1997)",
      category: "Physical Side-Channel & Laser Glitching",
      mathMechanism: "A single laser or voltage glitch corrupts m₁ mod p while m₂ mod q is correct; attacker computes gcd((S')^e - M, N) = q in 1 millisecond.",
      vulnerabilityBound: "Unverified RSA-CRT signature generation",
      exploitSpeed: "Single fault glitch → Instant Factorization in 0.001 ms",
      remedy: "Always verify signatures ((S')^e mod N == M) inside hardware BEFORE transmitting to network.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const currentAttack = attackProfiles[selectedAttackKey];

  // Studio 2: Hardening Strategies Data
  const defenseProfiles = {
    oaep_padding: {
      key: "oaep_padding",
      name: "1. RSA-OAEP & RSA-PSS Padding (PKCS#1 v2.2)",
      mechanism: "2-round Feistel network with SHA-256 and randomized 256-bit salt.",
      threatsNeutralized: "Bleichenbacher padding oracle, multiplicative malleability, and Hastad broadcast attacks.",
      compliance: "Mandatory under Indian IT Act Section 43A and RFC 8017."
    },
    full_entropy_d: {
      key: "full_entropy_d",
      name: "2. Full-Entropy Private Exponent Generation",
      mechanism: "Generate d across the entire modular ring [1, φ(N)-1] with 2048 bits of entropy.",
      threatsNeutralized: "Wiener's Continued Fraction attack (d < N^0.25) and Boneh-Durfee lattice attack (d < N^0.292).",
      compliance: "Enforced by FIPS 186-5 and Reserve Bank of India (RBI)."
    },
    constant_time_montgomery: {
      key: "constant_time_montgomery",
      name: "3. Constant-Time Montgomery Ladder",
      mechanism: "Executes uniform multiply and square operations on EVERY clock cycle regardless of key bit values.",
      threatsNeutralized: "Simple Power Analysis (SPA), Differential Power Analysis (DPA), and execution timing leaks.",
      compliance: "Mandatory for FIPS 140-3 Level 3/4 Hardware Security Modules."
    },
    cryptographic_blinding: {
      key: "cryptographic_blinding",
      name: "4. Cryptographic Blinding (C' = C * r^e mod N)",
      mechanism: "Randomizes ciphertext with secret random factor r before modular exponentiation.",
      threatsNeutralized: "Flush+Reload CPU cache-timing attacks and physical power correlation.",
      compliance: "Default implementation standard in OpenSSL 3.0 and BoringSSL."
    },
    post_quantum_hybrid: {
      key: "post_quantum_hybrid",
      name: "5. Post-Quantum Hybrid Migration (FIPS 203 ML-KEM)",
      mechanism: "Combines classical X25519/RSA key agreement with high-dimensional lattice Kyber-768.",
      threatsNeutralized: "Shor's quantum factoring algorithm and Harvest Now, Decrypt Later (HNDL) adversaries.",
      compliance: "NIST 2024 PQC Standards (FIPS 203 & 204) and NCIIPC directives."
    }
  };

  const activeDefense = defenseProfiles[selectedDefenseKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_wiener_audit",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Banking HSM Wiener & Boneh-Durfee Security Audit",
      budget: "₹9,50,000",
      flaw: "Legacy HSMs Running Low Private Exponent Optimizations",
      dilemma:
        "Auditing 24 core payment switch HSMs against low private exponent attacks and lattice reduction where truncated private keys d risked instant algebraic recovery.",
      resolution:
        "Mamata enforced full-entropy 2048-bit private key generation and e=65537 across all banking HSM clusters, achieving 100% mathematical immunity to Wiener/Boneh-Durfee attacks and meeting RBI compliance.",
      metrics: {
        hsmsAudited: "24 Core Banking HSMs",
        entropyEnforced: "Full 2048-bit Private Key d",
        wienerImmunity: "100% Mathematical Immunity",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_cache_hardening",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Hospital EHR Flush+Reload Side-Channel Hardening",
      budget: "₹5,20,000",
      flaw: "Multi-Tenant Cloud Servers Leaking RSA Tables via L3 Cache",
      dilemma:
        "Multi-tenant cloud servers hosting 100,000+ patient MRI records were vulnerable to CPU cache-timing leaks during sliding-window exponentiation table lookups.",
      resolution:
        "Mahima deployed constant-time branchless table lookups and cryptographic blinding in the hospital cryptographic engine, neutralizing 100% of Flush+Reload side-channel threats under the DPDP Act 2023.",
      metrics: {
        cacheLeaksBlocked: "100% Flush+Reload Immunity",
        mriScansSecured: "100,000+ DICOM Records",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_bellcore_defense",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Bellcore Fault Defense & Grid Hardening",
      budget: "₹8,80,000",
      flaw: "Electromagnetic Grid Noise Inducing Faulty CRT Signatures",
      dilemma:
        "High-voltage electromagnetic interference causing occasional single-bit faults during RTU CRT signing, exposing prime factors to eavesdroppers via Bellcore gcd attacks.",
      resolution:
        "Debangshu enforced pre-transmission signature verification in RTU firmware, discarding faulty signatures and maintaining 100.00% grid stability and zero unauthorized control tripping.",
      metrics: {
        rtusHardened: "18 High-Voltage Substations",
        bellcoreVulnerability: "0% Factorization Risk",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_vulnerability_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Asymmetric Vulnerability & Exploit Laboratory",
      budget: "₹4,00,000",
      flaw: "Teaching Fermat Factorization & Wiener Continued Fractions",
      dilemma:
        "Teaching computer science students how to exploit Fermat factorization and Wiener continued fractions in Python without conceptual confusion.",
      resolution:
        "The team authored an interactive vulnerability playground demonstrating algebraic cracking of weak RSA keys, training 140+ students on defense-in-depth and Post-Quantum Kyber.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        exploitDemosAuthored: "Wiener + Fermat + Bleichenbacher",
        pqcBenchmarked: "FIPS 203 ML-KEM Migration",
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
            Cyber Security Module 002_005 • Topic 6 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Security Strengths and Factorization Vulnerabilities of RSA
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the complete attack surface of RSA: master Wiener&apos;s Continued Fraction attack (d &lt; (1/3) N^(1/4)), 
            Fermat difference-of-squares factorization, Bleichenbacher padding oracle attacks, Bellcore CRT laser fault injection, and Post-Quantum Shor defenses.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: RSA Attack Vector Taxonomy & Vulnerability Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Studio 1: RSA Attack Surface &amp; Vulnerability Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 4 major RSA attack vectors to inspect its mathematical operating principle, vulnerability boundary, exploit execution time, and defensive patch.
            </p>
          </div>

          {/* Attack Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {Object.values(attackProfiles).map((att) => {
              const isSelected = selectedAttackKey === att.key;
              return (
                <button
                  key={att.key}
                  onClick={() => setSelectedAttackKey(att.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{att.name.split(". ")[1].split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{att.category}</div>
                </button>
              );
            })}
          </div>

          {/* Active Attack Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentAttack.badgeClass)}>
                Attack Vector: {currentAttack.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {currentAttack.category}
              </h3>
            </div>

            {/* Math Mechanism & Vulnerability Bound */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5 font-mono">
                <span className="text-rose-400 font-bold uppercase tracking-wider block font-sans">Mathematical Exploit Mechanism:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed">{currentAttack.mathMechanism}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5 font-mono">
                <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">Vulnerability Bound &amp; Trigger:</span>
                <p className="text-amber-300 text-xs sm:text-sm font-bold leading-relaxed">{currentAttack.vulnerabilityBound}</p>
              </div>
            </div>

            {/* Speed & Remedy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1 font-mono">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Exploitation Execution Time:</span>
                <span className="font-bold text-rose-400 text-xs sm:text-sm">{currentAttack.exploitSpeed}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">Mandatory Defensive Remedy:</span>
                <span className="font-bold text-emerald-300 text-xs sm:text-sm">{currentAttack.remedy}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Asymmetric Attack Hardening Radar */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🛡️</span> Studio 2: Asymmetric Attack Hardening Radar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 5 defense strategies to explore how blue team cryptographic architects harden production RSA deployments.
            </p>
          </div>

          {/* Defense Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(defenseProfiles).map((def) => {
              const isSelected = selectedDefenseKey === def.key;
              return (
                <button
                  key={def.key}
                  onClick={() => setSelectedDefenseKey(def.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{def.name.split(". ")[1].split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{def.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Defense Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-emerald-950 text-emerald-300 border-emerald-800">
                Defense Strategy: {activeDefense.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                Hardening Architecture &amp; Countermeasure
              </h3>
            </div>

            {/* Mechanism & Threats Neutralized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Engineering Mechanism:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold leading-relaxed">{activeDefense.mechanism}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Threat Vectors Neutralized:</span>
                <p className="text-gray-200 font-semibold leading-relaxed">{activeDefense.threatsNeutralized}</p>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Indian &amp; Global Compliance Standard:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeDefense.compliance}</p>
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
              Visualizing the 4-Tier RSA Attack Surface Matrix and Wiener's Continued Fraction Convergent Recovery Pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 4-Tier Attack Surface Matrix */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 4-Tier RSA Attack Surface Matrix
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="55" rx="4" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="35" y="47" fill="#f87171" fontWeight="bold" fontSize="9">1. MATHEMATICAL FACTORIZATION</text>
                    <text x="210" y="47" fill="#cbd5e1" font-family="monospace" fontSize="8">GNFS (L[1/3]) • Fermat (x²-y²) • Pollard (p-1)</text>
                    <text x="450" y="47" fill="#fca5a5" textAnchor="end" fontSize="7.5">Modulus Target</text>
                    <text x="35" y="67" fill="#94a3b8" fontSize="7.5">Defeated by: 2048-bit modulus + strong primes (|p-q| &gt; 2⁹⁰⁰).</text>
                  </g>

                  {/* Tier 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="90" width="460" height="55" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="35" y="112" fill="#fbbf24" fontWeight="bold" fontSize="9">2. LOW EXPONENT &amp; ALGEBRAIC</text>
                    <text x="210" y="112" fill="#cbd5e1" font-family="monospace" fontSize="8">Wiener (d &lt; N⁰·²⁵) • Boneh-Durfee • Hastad</text>
                    <text x="450" y="112" fill="#fef08a" textAnchor="end" fontSize="7.5">Exponent Target</text>
                    <text x="35" y="132" fill="#94a3b8" fontSize="7.5">Defeated by: Full-entropy d + standard e = 65537.</text>
                  </g>

                  {/* Tier 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="155" width="460" height="55" rx="4" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="35" y="177" fill="#c084fc" fontWeight="bold" fontSize="9">3. SIDE-CHANNEL &amp; HARDWARE FAULT</text>
                    <text x="220" y="177" fill="#cbd5e1" font-family="monospace" fontSize="8">Bleichenbacher • SPA/DPA • Flush+Reload • Bellcore</text>
                    <text x="450" y="177" fill="#e9d5ff" textAnchor="end" fontSize="7.5">Silicon Target</text>
                    <text x="35" y="197" fill="#94a3b8" fontSize="7.5">Defeated by: RSA-OAEP + Montgomery Ladder + Blinding + CRT Verification.</text>
                  </g>

                  {/* Tier 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="220" width="460" height="55" rx="4" fill="#18181b" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="35" y="242" fill="#38bdf8" fontWeight="bold" fontSize="9">4. QUANTUM COMPUTER FACTORING</text>
                    <text x="210" y="242" fill="#cbd5e1" font-family="monospace" fontSize="8">Shor's Algorithm O((log N)³) • HNDL Threat</text>
                    <text x="450" y="242" fill="#cffafe" textAnchor="end" fontSize="7.5">Quantum Target</text>
                    <text x="35" y="262" fill="#94a3b8" fontSize="7.5">Defeated by: Transition to NIST FIPS 203 ML-KEM Lattice Cryptography.</text>
                  </g>

                  <text x="250" y="300" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Comprehensive defense-in-depth hardens production RSA across all 4 architectural attack tiers.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: The 4-tier RSA attack surface spanning Factorization, Exponents, Side-Channels, and Quantum threat models.
              </p>
            </div>

            {/* Diagram 2: Wiener Continued Fraction Convergent Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Wiener's Continued Fraction Convergent State Machine
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Vulnerable Input */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="25" width="400" height="40" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="250" y="49" fill="#f87171" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      FLAW: Small Private Exponent d &lt; (1/3) * N^(1/4)
                    </text>
                  </g>

                  {/* Continued Fractions */}
                  <line x1="250" y1="65" x2="250" y2="95" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed32)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="95" width="400" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="250" y="117" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      1. Compute Continued Fractions of (e / N)
                    </text>
                    <text x="250" y="132" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Generates sequence of rational convergents: [k₀/d₀, k₁/d₁, k₂/d₂, ...]
                    </text>
                  </g>

                  {/* Test Convergents */}
                  <line x1="250" y1="140" x2="250" y2="170" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold32)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="170" width="400" height="50" rx="4" fill="#18181b" stroke="#a855f7" />
                    <text x="250" y="192" fill="#c084fc" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="8.5">
                      2. For each convergent k/d: Compute φ'(N) = (e * d - 1) / k
                    </text>
                    <text x="250" y="208" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Test if roots of x² - (N - φ' + 1)x + N = 0 are integer primes p, q!
                    </text>
                  </g>

                  {/* Extracted Key */}
                  <line x1="250" y1="220" x2="250" y2="245" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple32)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="245" width="400" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="269" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      PRIVATE KEY d &amp; PRIMES p, q EXTRACTED IN &lt; 0.05 SECONDS!
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowRed32" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowGold32" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                    <marker id="arrowPurple32" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: Wiener's continued fraction convergent state machine extracting small private keys $d$.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Vulnerability Hardening Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads audit banking HSMs against Wiener/Boneh-Durfee attacks, neutralize Flush+Reload cache timing in hospital servers, harden power grid RTUs against Bellcore laser glitches, and author exploit labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Vulnerability Threat ({currentLocalScenario.flaw})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Remediation Action
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
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
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
              Guidelines for cryptographic engineers securing public-key cryptosystems against advanced threat actors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Hardening Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Full-Entropy Private Exponent d:</strong> Never truncate private key bits (Defeats Wiener/Boneh-Durfee).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Constant-Time Montgomery Math:</strong> Uniform power traces eliminate SPA and timing side channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Pre-Verify CRT Signatures:</strong> Discard corrupted signatures to block Bellcore laser fault factoring.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Large Prime Separation:</strong> Ensure $|p - q| &gt; 2^{900}$ to defeat Fermat factoring.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Hardening Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Choosing Small Private Exponent d:</strong> Wiener's continued fractions crack $d &lt; N^{0.25}$ in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Choosing Primes Too Close:</strong> Fermat's difference of squares factors $N = x^2 - y^2$ instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using PKCS#1 v1.5 Padding:</strong> Bleichenbacher padding oracles decrypt sessions in ~1M queries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Transmitting Unverified CRT Signatures:</strong> Single laser glitch reveals prime factors via $\gcd$.</span>
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
                  <span><strong>Comply with CERT-In 6-Hour Rule:</strong> Maintain automated playbooks for key compromise reporting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Branchless Table Lookups:</strong> Block Flush+Reload cache attacks in virtualized cloud servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Pilot Post-Quantum Hybrid TLS:</strong> Combine X25519 with FIPS 203 ML-KEM to defeat Shor attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act Section 33:</strong> Avoid ₹250 Crores penalty via FIPS 140-3 HSM key storage.</span>
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
              Synthesize foundational RSA security concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cryptographic Security
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Wiener's attack works: If private exponent $d &lt; (1/3) N^{1/4}$, the fraction $e/N$ is so close to $k/d$ that computing Continued Fraction convergents of $e/N$ produces $k/d$ directly, extracting private key $d$ in milliseconds.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The Bellcore fault vulnerability: If a single bit in $m_1 \bmod p$ is corrupted while $m_2 \bmod q$ is correct, $(S')^e - M$ is divisible by $q$ but not $p$. Therefore $\gcd((S')^e - M, N)$ extracts prime factor $q$ instantly. Always verify signatures before transmitting!
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud deployments, begin piloting hybrid post-quantum key agreement (`X25519Kyber768Draft00`) to protect confidential corporate communications against 'Harvest Now, Decrypt Later' quantum adversaries.
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
                <span>Wiener's attack cracks d &lt; (1/3) * N^(1/4) via Continued Fractions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Boneh-Durfee expands Wiener's bound to d &lt; N^(0.292) using LLL lattices.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Fermat's method factors close primes (|p - q| &lt; 2^(n/4)) via N = x² - y².</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Bleichenbacher padding oracle decrypts PKCS#1 v1.5 in ~1M queries.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Bellcore fault injection on unverified CRT signatures factors N via gcd.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Shor's quantum algorithm factors RSA in O((log N)³); migrate to FIPS 203.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Security Strengths and Factorization Vulnerabilities FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Vulnerability Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Security Strengths & Factorization Vulnerabilities (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The history of RSA cryptanalysis is a masterclass in why theoretical security differs from real-world engineering. While factoring a 2048-bit modulus remains infeasible on classical supercomputers via GNFS, subtle flaws—such as choosing small private exponents (Wiener's attack), picking close primes (Fermat's method), relying on PKCS#1 v1.5 error oracles (Bleichenbacher), or transmitting unverified CRT signatures (Bellcore)—can compromise keys in seconds. Always enforce full 2048-bit entropy, RSA-OAEP padding, constant-time Montgomery math, and pre-transmission signature verification to ensure invincible defense."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
