import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Key Length State
  const [selectedKeyLengthId, setSelectedKeyLengthId] = useState("rsa_2048");

  // Studio 2: Security Tier State
  const [selectedSecurityTier, setSelectedSecurityTier] = useState("tier_128");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_switch_migration");

  // Studio 1: Key Length Profiles
  const keyLengthProfiles = {
    rsa_1024: {
      id: "rsa_1024",
      name: "RSA-1024 (128 Bytes)",
      bits: 1024,
      bytes: 128,
      decimalDigits: 309,
      equivalentSymmetric: "80 bits",
      gnfsComplexity: "Vulnerable (~$1M on custom ASICs)",
      decryptSpeed: "~3,500 ops/sec (0.28 ms)",
      verifySpeed: "~65,000 ops/sec (0.015 ms)",
      tlsHandshakeLatency: "Low (~1.2 KB Certificate Chain)",
      regulatoryStatus: "DEPRECATED (Banned by NIST & CCA India)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    rsa_2048: {
      id: "rsa_2048",
      name: "RSA-2048 (256 Bytes)",
      bits: 2048,
      bytes: 256,
      decimalDigits: 617,
      equivalentSymmetric: "112 bits",
      gnfsComplexity: "~2^112 operations (Secure through 2030)",
      decryptSpeed: "~1,000 ops/sec (1.10 ms)",
      verifySpeed: "~28,000 ops/sec (0.035 ms)",
      tlsHandshakeLatency: "Optimal (~1.8 KB Certificate Chain)",
      regulatoryStatus: "CURRENT STANDARD (Universal Baseline)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    rsa_3072: {
      id: "rsa_3072",
      name: "RSA-3072 (384 Bytes)",
      bits: 3072,
      bytes: 384,
      decimalDigits: 925,
      equivalentSymmetric: "128 bits (Matches AES-128)",
      gnfsComplexity: "~2^128 operations (Secure through 2040)",
      decryptSpeed: "~350 ops/sec (2.85 ms)",
      verifySpeed: "~14,000 ops/sec (0.070 ms)",
      tlsHandshakeLatency: "Moderate (~2.6 KB Certificate Chain)",
      regulatoryStatus: "HIGH-SECURITY STANDARD (Banking / Gov)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    rsa_4096: {
      id: "rsa_4096",
      name: "RSA-4096 (512 Bytes)",
      bits: 4096,
      bytes: 512,
      decimalDigits: 1234,
      equivalentSymmetric: "~140 bits",
      gnfsComplexity: "~2^140 operations (Military Security)",
      decryptSpeed: "~130 ops/sec (8.50 ms)",
      verifySpeed: "~7,000 ops/sec (0.140 ms)",
      tlsHandshakeLatency: "High (~3.6 KB Chain, Multi-Packet Frag)",
      regulatoryStatus: "ROOT CA & 30-YEAR ARCHIVES ONLY",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    rsa_8192: {
      id: "rsa_8192",
      name: "RSA-8192 (1024 Bytes)",
      bits: 8192,
      bytes: 1024,
      decimalDigits: 2466,
      equivalentSymmetric: "~160 bits",
      gnfsComplexity: "Infeasible on Classical Computers",
      decryptSpeed: "~15 ops/sec (65.40 ms)",
      verifySpeed: "~1,800 ops/sec (0.550 ms)",
      tlsHandshakeLatency: "Severe Bottleneck (>7 KB Chain, Severe Frag)",
      regulatoryStatus: "IMPRACTICAL (Migrate to Post-Quantum PQC)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  };

  const activeKeyProfile = keyLengthProfiles[selectedKeyLengthId];

  // Studio 2: Security Equivalence Tiers
  const securityTiers = {
    tier_80: {
      id: "tier_80",
      name: "80-bit Security Tier (Deprecated)",
      symmetric: "2-Key Triple DES (Deprecated)",
      rsa: "RSA-1024 (128 Bytes / 309 Digits)",
      ecc: "ECC-160 (20 Bytes)",
      pqc: "None (Broken)",
      assessment: "Insecure: Factoring within range of custom FPGA/ASIC clusters (~$1M-$5M)."
    },
    tier_112: {
      id: "tier_112",
      name: "112-bit Security Tier (Baseline)",
      symmetric: "3-Key Triple DES (Legacy)",
      rsa: "RSA-2048 (256 Bytes / 617 Digits)",
      ecc: "ECC-224 (28 Bytes)",
      pqc: "ML-KEM-512 (Kyber-512)",
      assessment: "Current universal production minimum standard; compliant through 2030."
    },
    tier_128: {
      id: "tier_128",
      name: "128-bit Security Tier (Standard High-Security)",
      symmetric: "AES-128 / ChaCha20",
      rsa: "RSA-3072 (384 Bytes / 925 Digits)",
      ecc: "ECC-256 (P-256 / Ed25519 - 32 Bytes)",
      pqc: "ML-KEM-768 (Kyber-768 / FIPS 203)",
      assessment: "Recommended for core banking, national identity databases, and long-term storage."
    },
    tier_192: {
      id: "tier_192",
      name: "192-bit Security Tier (Top Secret / Military)",
      symmetric: "AES-192",
      rsa: "RSA-7680 (960 Bytes / 2312 Digits)",
      ecc: "ECC-384 (P-384 - 48 Bytes)",
      pqc: "ML-KEM-1024 (Kyber-1024)",
      assessment: "Military defense grade; RSA-7680 is replaced by ECC-384 and Kyber-1024 due to CPU overhead."
    },
    tier_256: {
      id: "tier_256",
      name: "256-bit Security Tier (Ultra-Long-Term Archive)",
      symmetric: "AES-256 (Quantum Resistant)",
      rsa: "RSA-15360 (1920 Bytes / 4624 Digits)",
      ecc: "ECC-521 (66 Bytes)",
      pqc: "ML-KEM-1024 + State Machine Signatures",
      assessment: "RSA-15360 is completely unusable in software; ECC-521 or Post-Quantum lattices are mandatory."
    }
  };

  const activeTier = securityTiers[selectedSecurityTier];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_switch_migration",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Payment Switch RSA-1024 Decommissioning",
      budget: "₹9,50,000",
      challenge: "Migrating 1,200 Legacy Switches from RSA-1024 to RSA-2048",
      dilemma:
        "Legacy payment nodes were running deprecated RSA-1024 keys, risking regulatory shutdown by RBI and exposure to nation-state ASIC factoring clusters.",
      resolution:
        "Mamata orchestrated an automated zero-downtime migration of 1,200 payment switch endpoints to RSA-2048 with hardware crypto acceleration, maintaining sub-millisecond latency and 100% RBI compliance.",
      metrics: {
        switchesMigrated: "1,200 Payment Nodes",
        latencyOverhead: "0.85ms per Encrypted Packet",
        rsa1024Decommissioned: "100% Zero Legacy Footprint",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_genomic_archive",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "25-Year Genomic Archive Key Selection",
      budget: "₹5,20,000",
      challenge: "Evaluating RSA-2048 vs RSA-4096 for 25-Year Medical Records",
      dilemma:
        "Choosing key lengths for long-term 25-year archiving of 100,000+ patient DNA sequences under the ABDM charter without server throttling.",
      resolution:
        "Mahima implemented RSA-4096 master encryption for long-term cold vaults and ECC P-256 for real-time PACS image viewing, securing ₹250 Crores in statutory compliance margins under the DPDP Act 2023.",
      metrics: {
        recordsSecured: "100,000+ Patient DNA Vaults",
        vaultSecurityLength: "RSA-4096 Master Keys",
        dpdpLiabilityPrevented: "₹250 Crores Statutory Margin",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_rtu_optimization",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Substation RTU Microcontroller Key Optimization",
      budget: "₹8,80,000",
      challenge: "80MHz RTUs Choking on 4096-bit Keys During Grid Tripping",
      dilemma:
        "80MHz RTU microcontrollers were experiencing 1.2-second signature delays on RSA-4096 keys during high-voltage breaker tripping, risking physical substation damage.",
      resolution:
        "Debangshu optimized RTU firmware to use RSA-2048 with hardware CRT acceleration, cutting verification latency to 0.8ms and ensuring 100.00% grid stability across 18 substations.",
      metrics: {
        rtusHardened: "18 High-Voltage Substations",
        verificationLatency: "0.8ms (Down from 1,250ms)",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_benchmark_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "OpenSSL Multi-Key Benchmarking Laboratory",
      budget: "₹4,00,000",
      challenge: "Benchmarking 1024, 2048, 3072, and 4096-bit OpenSSL Curves",
      dilemma:
        "Students needed empirical performance benchmarks comparing 1024, 2048, 3072, and 4096-bit RSA keys across x86 vs ARM64 architectures.",
      resolution:
        "The team authored automated OpenSSL 3.0 benchmarking scripts, training 140+ students on big-number arithmetic scaling and post-quantum hybrid migrations.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        benchmarksAuthored: "OpenSSL 3.0 Speed Suites",
        scalingCurvesAnalyzed: "O(b³) Exponent Scaling Proved",
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
            Cyber Security Module 002_005 • Topic 7 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            RSA Key Lengths: 1024-bit, 2048-bit, and 4096-bit Security
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Analyze the engineering trade-offs between cryptographic security margins and computational latency: evaluate RSA-1024 (deprecated), 
            RSA-2048 (universal standard), RSA-3072 (AES-128 equivalent), and RSA-4096 (Root CA grade), and explore why GNFS sub-exponential complexity forces RSA keys to scale to thousands of bits.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive RSA Key Length Performance & Security Radar */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 1: RSA Key Length Performance &amp; Security Radar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an RSA key length to inspect its physical modulus size, equivalent symmetric security, GNFS factoring complexity, signing throughput, and regulatory compliance status.
            </p>
          </div>

          {/* Key Length Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(keyLengthProfiles).map((kp) => {
              const isSelected = selectedKeyLengthId === kp.id;
              return (
                <button
                  key={kp.id}
                  onClick={() => setSelectedKeyLengthId(kp.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{kp.name.split(" ")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{kp.equivalentSymmetric} Security</div>
                </button>
              );
            })}
          </div>

          {/* Active Key Profile Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeKeyProfile.badgeClass)}>
                  {activeKeyProfile.regulatoryStatus}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                  {activeKeyProfile.name} • {activeKeyProfile.decimalDigits} Decimal Digits
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Symmetric Equivalence</span>
                <span className="text-base font-extrabold text-emerald-400">{activeKeyProfile.equivalentSymmetric}</span>
              </div>
            </div>

            {/* Metrics 4-Box Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">GNFS Factoring Complexity</span>
                <span className="font-bold text-rose-300 text-xs sm:text-sm block">{activeKeyProfile.gnfsComplexity}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Private Decrypt / Sign Speed</span>
                <span className="font-bold text-amber-300 text-xs sm:text-sm block">{activeKeyProfile.decryptSpeed}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Public Encrypt / Verify Speed</span>
                <span className="font-bold text-emerald-300 text-xs sm:text-sm block">{activeKeyProfile.verifySpeed}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">TLS Handshake Packet Impact</span>
                <span className="font-bold text-cyan-300 text-xs sm:text-sm block">{activeKeyProfile.tlsHandshakeLatency}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Asymmetric vs Symmetric Security Equivalence Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Security Equivalence Matrix (NIST SP 800-57)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 5 security tiers to inspect how RSA key sizes compare against Elliptic Curves (ECC), Symmetric AES, and Post-Quantum standards.
            </p>
          </div>

          {/* Tier Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(securityTiers).map((tier) => {
              const isSelected = selectedSecurityTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedSecurityTier(tier.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tier.name.split(" ")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{tier.name.split("(")[1]?.replace(")", "") || "Standard"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Tier Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                Security Tier: {activeTier.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                Asymmetric vs Symmetric vs Post-Quantum Equivalence
              </h3>
            </div>

            {/* 4-Box Equivalence Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Symmetric Cipher (AES)</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeTier.symmetric}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">RSA Asymmetric Modulus</span>
                <span className="font-bold text-purple-300 text-xs sm:text-sm">{activeTier.rsa}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">Elliptic Curve (ECC)</span>
                <span className="font-bold text-emerald-300 text-xs sm:text-sm">{activeTier.ecc}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-cyan-900/30 space-y-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block font-sans">Post-Quantum (PQC)</span>
                <span className="font-bold text-cyan-300 text-xs sm:text-sm">{activeTier.pqc}</span>
              </div>
            </div>

            {/* Assessment Note */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Architectural Assessment:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeTier.assessment}</p>
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
              Visualizing Key Size Growth Curves (RSA vs ECC) and Private Key Signing Speed Scaling ($O(b^3)$).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Key Size Growth Curve */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>📈</span> Diagram A: Security Equivalence Growth Curve (RSA vs ECC)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Axis */}
                  <line x1="50" y1="270" x2="460" y2="270" stroke="#475569" strokeWidth="1.5" />
                  <line x1="50" y1="270" x2="50" y2="30" stroke="#475569" strokeWidth="1.5" />
                  <text x="455" y="290" fill="#94a3b8" textAnchor="end" fontSize="8">Symmetric Equivalent (Bits)</text>
                  <text x="40" y="25" fill="#94a3b8" textAnchor="end" fontSize="8">Key Size (Bits)</text>

                  {/* Ticks */}
                  <text x="120" y="285" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">80-bit</text>
                  <text x="220" y="285" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">112-bit</text>
                  <text x="320" y="285" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">128-bit</text>
                  <text x="420" y="285" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7.5">256-bit</text>

                  {/* RSA Curve (Explodes exponentially due to GNFS L[1/3]) */}
                  <path d="M 120 230 Q 220 200 320 160 T 420 40" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="120" cy="230" r="4" fill="#ef4444" />
                  <text x="120" y="220" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="7">RSA-1024</text>
                  <circle cx="220" cy="200" r="4" fill="#ef4444" />
                  <text x="220" y="190" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="7">RSA-2048</text>
                  <circle cx="320" cy="160" r="4" fill="#ef4444" />
                  <text x="320" y="150" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="7">RSA-3072</text>
                  <circle cx="420" cy="40" r="4" fill="#ef4444" />
                  <text x="420" y="30" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="7">RSA-15360</text>

                  {/* ECC Curve (Linear growth due to Pollard Rho O(sqrt(p))) */}
                  <path d="M 120 260 L 420 235" fill="none" stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="120" cy="260" r="4" fill="#10b981" />
                  <text x="120" y="252" fill="#6ee7b7" font-family="monospace" textAnchor="middle" fontSize="7">ECC-160</text>
                  <circle cx="220" cy="252" r="4" fill="#10b981" />
                  <text x="220" y="244" fill="#6ee7b7" font-family="monospace" textAnchor="middle" fontSize="7">ECC-224</text>
                  <circle cx="320" cy="244" r="4" fill="#10b981" />
                  <text x="320" y="236" fill="#6ee7b7" font-family="monospace" textAnchor="middle" fontSize="7">ECC-256</text>
                  <circle cx="420" cy="235" r="4" fill="#10b981" />
                  <text x="420" y="227" fill="#6ee7b7" font-family="monospace" textAnchor="middle" fontSize="7">ECC-521</text>

                  <text x="250" y="310" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    GNFS sub-exponential complexity forces RSA keys to explode to 15,360 bits to match ECC-521.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: Key size growth comparison: RSA (sub-exponential GNFS) vs ECC (exponential discrete log).
              </p>
            </div>

            {/* Diagram 2: CPU Signing Speed vs Modulus Size */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Private Key Signing Throughput ($O(b^3)$ Scaling)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Bar 1: RSA-1024 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="40" width="380" height="40" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="65" y="64" fill="#cffafe" fontWeight="bold" fontSize="9">RSA-1024</text>
                    <text x="200" y="64" fill="#67e8f9" font-family="monospace" fontSize="8">~3,500 signatures / sec (0.28 ms)</text>
                    <text x="415" y="64" fill="#a5f3fc" textAnchor="end" fontSize="8">DEPRECATED</text>
                  </g>

                  {/* Bar 2: RSA-2048 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="95" width="220" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="65" y="119" fill="#d1fae5" fontWeight="bold" fontSize="9">RSA-2048</text>
                    <text x="180" y="119" fill="#6ee7b7" font-family="monospace" fontSize="8">~1,000 sig/s (1.1 ms)</text>
                    <text x="415" y="119" fill="#34d399" textAnchor="end" fontSize="8">STANDARD</text>
                  </g>

                  {/* Bar 3: RSA-3072 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="150" width="110" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="65" y="174" fill="#c7d2fe" fontWeight="bold" fontSize="9">RSA-3072</text>
                    <text x="170" y="174" fill="#818cf8" font-family="monospace" fontSize="8">~350 sig/s (2.85 ms)</text>
                    <text x="415" y="174" fill="#818cf8" textAnchor="end" fontSize="8">HIGH SECURITY</text>
                  </g>

                  {/* Bar 4: RSA-4096 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="205" width="50" height="40" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="65" y="229" fill="#fca5a5" fontWeight="bold" fontSize="9">RSA-4096</text>
                    <text x="110" y="229" fill="#f87171" font-family="monospace" fontSize="8">~130 sig/s (8.5 ms)</text>
                    <text x="415" y="229" fill="#f87171" textAnchor="end" fontSize="8">ROOT CA ONLY</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Doubling key size from 2048 to 4096 bits reduces signing throughput by 7.7x due to O(b³) scaling.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: Private key signing throughput scaling across RSA key lengths on modern server CPUs.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Key Length Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads decommission legacy RSA-1024 keys across payment switches, evaluate 4096-bit keys for 25-year DNA vaults, optimize RTU microcontrollers, and benchmark OpenSSL suites across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Key Length Bottleneck / Exposure ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Engineering Migration
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
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key.replace(/([A-Z])/g, " $1")}</span>
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
              Guidelines for systems architects and cryptographic engineers designing key lifecycle policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Key Management Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>RSA-2048 as Absolute Baseline:</strong> Strictly ban legacy RSA-1024 across all endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Reserve RSA-4096 for Root CAs:</strong> Ideal for offline certificate authorities with 30-year spans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use ECC on Mobile &amp; IoT:</strong> Deploy Ed25519 or ECDSA P-256 for battery preservation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Factor in TCP MSS Fragmentation:</strong> Audit TLS certificate chain size for high-traffic APIs.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Key Allocation Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Assuming RSA-2048 is 2048-bit Secure:</strong> It provides only 112 bits of symmetric security.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Deploying RSA-4096 on IoT:</strong> Causes 1.2s signature delays and drains batteries in months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using RSA-8192 in Web Servers:</strong> Drops throughput to 15 sigs/sec with zero quantum protection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Retaining RSA-1024 DSCs:</strong> Legally void under Section 35 of the Indian IT Act 2000.</span>
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
                  <span><strong>Enforce CCA India Standards:</strong> Audit all legal signing tokens for 2048-bit RSA keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Maintain Automated Key Lifecycle:</strong> Comply with DPDP Act Section 33 to prevent ₹250 Cr fines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Benchmark with OpenSSL Speed:</strong> Profile server capacity with `openssl speed rsa2048 rsa4096`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Migrate to Post-Quantum Hybrid:</strong> Transition to FIPS 203 ML-KEM instead of inflating RSA.</span>
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
              Synthesize key RSA key length mechanics before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Systems Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why RSA key lengths grow so quickly: The General Number Field Sieve (GNFS) factors integers in sub-exponential time ($L_N[1/3]$), meaning factoring becomes relatively easier as numbers get larger. Therefore, doubling symmetric security from 112 to 256 bits requires multiplying the RSA modulus length by $7.5\times$ (from 2048 to 15,360 bits).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The difference between public verification and private signing: Public verification ($e=65537$) requires only 17 operations across all key sizes (taking &lt;0.05 ms), whereas private signing scales cubically with modulus length ($O(b^3)$), slowing from 1.1 ms (RSA-2048) to 8.5 ms (RSA-4096).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  Never scale RSA beyond 4096 bits to achieve quantum resistance; Shor's quantum algorithm factors RSA-8192 in polynomial time just as easily. Instead, migrate your cryptographic handshakes to NIST Post-Quantum standards (FIPS 203 ML-KEM).
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
                <span>RSA-1024 provides 80-bit security (Deprecated &amp; illegal in India).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RSA-2048 provides 112-bit security (Universal standard through 2030).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RSA-3072 provides 128-bit security (Matches AES-128).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RSA-4096 provides 140-bit security (Root CAs &amp; 30-year archives).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Private signing scales cubically O(b³); RSA-4096 is ~7.7x slower than 2048.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CCA India mandates RSA-2048 minimum for all Class 3 DSCs under IT Act.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="RSA Key Lengths: 1024, 2048, and 4096-bit Security FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Key Allocation Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="RSA Key Lengths: 1024, 2048, 4096-bit (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Choosing the right RSA key length is an essential skill for every software engineer and cybersecurity professional. While RSA-1024 is broken and legally prohibited under Section 35 of the Indian IT Act 2000, RSA-2048 remains the gold standard for web APIs, TLS servers, and Class 3 DSCs through 2030. For offline Root CAs with 30-year lifespans, deploy RSA-4096. Remember: do not attempt to solve the quantum threat by expanding RSA to 8192 bits—transition to NIST Post-Quantum lattice cryptography (FIPS 203 ML-KEM) instead!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
