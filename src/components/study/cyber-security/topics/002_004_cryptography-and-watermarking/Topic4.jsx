import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Studio 1: AES 4-Step Round Inspector State
  const [activeAesStep, setActiveAesStep] = useState("subbytes");

  // Studio 2: Cipher Evolution Selector State
  const [selectedCipherKey, setSelectedCipherKey] = useState("aes256");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_atm_switch");

  // Studio 1: AES 4-Step Data & Matrices
  const aesStepsData = {
    subbytes: {
      stepNum: 1,
      name: "1. SubBytes() Step",
      operation: "Non-linear byte substitution using multiplicative inverse in Galois Field GF(2^8) + affine mapping.",
      shannonRole: "Provides Shannon Confusion (Destroys algebraic relations between plaintext and key).",
      matrixState: [
        ["63", "EB", "9F", "A0"],
        ["C0", "2B", "77", "15"],
        ["7A", "8F", "3C", "9E"],
        ["11", "D4", "B0", "88"]
      ],
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    shiftrows: {
      stepNum: 2,
      name: "2. ShiftRows() Step",
      operation: "Cyclic left byte shift: Row 0 shifted by 0, Row 1 by 1, Row 2 by 2, Row 3 by 3 bytes.",
      shannonRole: "Provides Inter-Column Diffusion (Permutes row bytes across different columns).",
      matrixState: [
        ["63", "EB", "9F", "A0"], // Row 0: Shift 0
        ["2B", "77", "15", "C0"], // Row 1: Shift 1 Left
        ["3C", "9E", "7A", "8F"], // Row 2: Shift 2 Left
        ["88", "11", "D4", "B0"]  // Row 3: Shift 3 Left
      ],
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    mixcolumns: {
      stepNum: 3,
      name: "3. MixColumns() Step",
      operation: "Matrix multiplication of each column vector by a fixed Maximum Distance Separable (MDS) matrix in GF(2^8).",
      shannonRole: "Provides Intra-Column High Dispersion Diffusion (1 byte change flips all 4 column bytes).",
      matrixState: [
        ["BA", "75", "F4", "2D"],
        ["84", "A4", "8D", "B3"],
        ["E5", "7A", "22", "61"],
        ["02", "C9", "4A", "F8"]
      ],
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    addroundkey: {
      stepNum: 4,
      name: "4. AddRoundKey() Step",
      operation: "Bitwise XOR of the 128-bit State matrix with the corresponding 128-bit subkey from the AES Key Schedule.",
      shannonRole: "Injects Cryptographic Key Material (Protects state against inversion without secret subkey).",
      matrixState: [
        ["4F", "1C", "9B", "82"],
        ["D7", "3E", "55", "A1"],
        ["10", "F8", "6C", "44"],
        ["B9", "27", "8A", "CE"]
      ],
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const currentAesStep = aesStepsData[activeAesStep];

  // Studio 2: Cipher Evolution Data
  const cipherEvolutionData = {
    des: {
      key: "des",
      name: "Data Encryption Standard (DES)",
      standard: "FIPS 46-3 (Standardized in 1977 by IBM & NIST)",
      blockSize: "64 bits (8 bytes)",
      keyLength: "56 bits effective (8 parity bits discarded -> 2^56 keys)",
      structure: "16-Round Feistel Network with uninvertible round function F",
      roundCount: "16 Rounds",
      knownAttacks: "Exhaustive Key Search: Broken in 22 hours by EFF Deep Crack (1999); broken in <1 hour on modern GPUs.",
      status: "COMPLETELY BROKEN & OBSOLETE",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    triple_des: {
      key: "triple_des",
      name: "Triple-DES (3DES / TDEA)",
      standard: "FIPS 46-3 / ANSI X9.52 (Standardized in 1998)",
      blockSize: "64 bits (8 bytes)",
      keyLength: "112 bits (2-Key) / 168 bits (3-Key) nominal; 112 bits effective",
      structure: "48-Round Feistel Network applying Encrypt-Decrypt-Encrypt (EDE)",
      roundCount: "48 Feistel Rounds (3 x 16 rounds)",
      knownAttacks: "Sweet32 Attack (CVE-2016-2183): Birthday paradox collision after 2^32 blocks (~32 GB) leaks plaintext.",
      status: "OFFICIALLY BANNED & DEPRECATED (Dec 2023 by NIST & RBI)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    aes256: {
      key: "aes256",
      name: "Advanced Encryption Standard (AES-256)",
      standard: "FIPS 197 (Standardized in 2001 by Rijmen & Daemen)",
      blockSize: "128 bits (16 bytes arranged in a 4x4 State matrix)",
      keyLength: "256 bits (32 bytes -> 2^256 keys = 1.15 x 10^77 search space)",
      structure: "14-Round Substitution-Permutation Network (SPN)",
      roundCount: "14 Rounds (10 for 128-bit, 12 for 192-bit, 14 for 256-bit)",
      knownAttacks: "Biclique Cryptanalysis: Minor theoretical speedup (2^126.1); 100% computationally secure.",
      status: "GLOBAL GOLD STANDARD (MANDATORY WORLDWIDE & RBI)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeCipher = cipherEvolutionData[selectedCipherKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_atm_switch",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "ATM Switch 3DES-to-AES Fleet Migration",
      budget: "₹9,50,000",
      legacyFlaw: "1,200 ATM Switches Running Deprecated 3DES",
      dilemma:
        "1,200 ATM payment transaction switches across West Bengal were running legacy 3DES, facing immediate RBI regulatory non-compliance penalties and Sweet32 collision risks.",
      resolution:
        "Mamata led the fleet-wide firmware upgrade to AES-256-GCM with hardware HSM PIN blocks, eliminating Sweet32 collision risks and achieving 100% RBI compliance.",
      metrics: {
        atmsUpgraded: "1,200 Payment Terminals",
        cipherMigrated: "3DES Deprecated -> AES-256-GCM",
        sweet32Vulnerability: "0% Collision Surface",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_pacs_aes",
      lead: "Mahima",
      role: "Chief Healthcare Information Officer",
      location: "Ichapur General Hospital",
      title: "Hospital PACS Archive Cipher Modernization",
      budget: "₹5,20,000",
      legacyFlaw: "Legacy Single-DES in PACS DICOM Storage",
      dilemma:
        "Radiologists storing patient MRI scans were using legacy single-DES encryption modules from 2005, leaving 50,000+ patient records vulnerable to GPU cracking.",
      resolution:
        "Mahima refactored the DICOM storage cluster to AES-256-GCM with automated envelope encryption, securing 50,000+ patient records and meeting DPDP Act 2023 statutory standards.",
      metrics: {
        recordsSecured: "50,000+ Clinical EHR Profiles",
        encryptionThroughput: "4.8 GB/s Hardware Speed",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_aes_ni",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Substation RTU AES-NI Hardware Acceleration",
      budget: "₹8,80,000",
      legacyFlaw: "3DES Cryptographic Latency on 220kV Grid RTUs",
      dilemma:
        "Upgrading 220kV substation RTUs from 3DES to AES without causing telemetry packet latency or overloading embedded CPUs.",
      resolution:
        "Debangshu deployed AES-NI accelerated industrial gateways, reducing cryptographic latency from 45ms to 0.4ms and ensuring 100% real-time grid protection telemetry.",
      metrics: {
        latencyReduction: "Dropped from 45ms to 0.4ms",
        hardwareAcceleration: "Intel AES-NI Constant-Time Silicon",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_aes_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "AES 4-Step Internal State Laboratory",
      budget: "₹4,00,000",
      legacyFlaw: "Teaching Galois Field GF(2^8) MixColumns Math",
      dilemma:
        "Teaching computer science students how finite Galois Field GF(2^8) multiplication works inside the AES `MixColumns` step without arithmetic confusion.",
      resolution:
        "The team authored a Python visualizer stepping through `SubBytes`, `ShiftRows`, `MixColumns`, and `AddRoundKey`, guiding 140+ students through encrypting custom 128-bit state matrices.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        pythonVisualizersAuthored: "Interactive 4x4 State Matrix Engine",
        mathVerified: "Galois Field GF(2^8) Arithmetic",
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
            Cyber Security Module 002_004 • Topic 4 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Popular Symmetric Ciphers: DES, 3DES, and AES
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the four-decade evolution of symmetric block ciphers: analyze the downfall of 56-bit DES, 
            the Sweet32 deprecation of 3DES, and the mathematical mechanics of AES-256 (SubBytes, ShiftRows, MixColumns, AddRoundKey).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: AES 4-Step Internal State Matrix Interactive Inspector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 1: AES 4-Step Internal State Matrix Inspector
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 4 internal mathematical operations executed during each round of AES encryption. Observe how the 128-bit ($4 \times 4$ byte) State matrix transforms across SubBytes, ShiftRows, MixColumns, and AddRoundKey.
            </p>
          </div>

          {/* Step Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "subbytes", label: "1. SubBytes()", sub: "S-Box Confusion" },
              { id: "shiftrows", label: "2. ShiftRows()", sub: "Row Permutation" },
              { id: "mixcolumns", label: "3. MixColumns()", sub: "Galois Diffusion" },
              { id: "addroundkey", label: "4. AddRoundKey()", sub: "SubKey XOR" }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setActiveAesStep(st.id)}
                className={clsx(
                  "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                  activeAesStep === st.id
                    ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                    : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                )}
              >
                <div className="font-bold text-sm text-gray-200">{st.label}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{st.sub}</div>
              </button>
            ))}
          </div>

          {/* Active Step Breakdown & 4x4 Matrix Display */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentAesStep.badgeClass)}>
                  AES Round Step {currentAesStep.stepNum} of 4
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentAesStep.name}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Details (7 Cols) */}
              <div className="lg:col-span-7 space-y-4 text-xs">
                <div className="p-4 bg-gray-900 rounded-xl border border-blue-900/30 space-y-1">
                  <span className="text-blue-400 font-bold uppercase tracking-wider block">Mathematical Operation:</span>
                  <p className="text-gray-200 leading-relaxed font-semibold">{currentAesStep.operation}</p>
                </div>
                <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/30 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider block">Shannon Cryptographic Role:</span>
                  <p className="text-gray-300 leading-relaxed">{currentAesStep.shannonRole}</p>
                </div>
              </div>

              {/* Right 4x4 State Matrix (5 Cols) */}
              <div className="lg:col-span-5 bg-gray-900 p-5 rounded-2xl border border-gray-800 space-y-3 flex flex-col items-center">
                <span className="text-xs text-indigo-400 font-mono font-bold uppercase">
                  128-bit State Matrix ($4 \times 4$ Bytes)
                </span>
                <div className="grid grid-cols-4 gap-2 font-mono text-center text-xs sm:text-sm">
                  {currentAesStep.matrixState.flat().map((byteVal, idx) => (
                    <div
                      key={idx}
                      className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-950 border border-indigo-800/60 rounded-lg text-emerald-400 font-bold shadow-inner"
                    >
                      0x{byteVal}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-gray-500 text-center">
                  Hexadecimal representation of 16-byte internal cipher state
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Symmetric Cipher Evolution Matrix (DES vs 3DES vs AES-256) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: Symmetric Cipher Evolution Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare DES (1977), 3DES (1998), and AES-256 (2001): evaluate block sizes, key spaces, internal structures, known vulnerabilities, and Indian banking regulatory compliance.
            </p>
          </div>

          {/* Cipher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(cipherEvolutionData).map((cip) => {
              const isSelected = selectedCipherKey === cip.key;
              return (
                <button
                  key={cip.key}
                  onClick={() => setSelectedCipherKey(cip.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{cip.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 mt-1 font-mono">{cip.blockSize} • {cip.keyLength.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Cipher Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCipher.badgeClass)}>
                  {activeCipher.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeCipher.name}
                </h3>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-gray-400">
                {activeCipher.standard}
              </div>
            </div>

            {/* 4 Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Block Size</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeCipher.blockSize}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Key Length</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeCipher.keyLength.split(" ")[0]} Bits</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Structure</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeCipher.structure.split(" ")[1] || "SPN"}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Round Count</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeCipher.roundCount}</span>
              </div>
            </div>

            {/* Known Attacks */}
            <div className="p-4 bg-gray-900 rounded-xl border border-rose-900/30 text-xs space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Known Cryptanalysis &amp; Vulnerability History:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeCipher.knownAttacks}</p>
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
              Visualizing the DES Feistel vs AES SPN Architecture and 3DES Sweet32 Collision Mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: DES Feistel vs AES SPN */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: DES Feistel vs AES SPN Structure
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: DES Feistel */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="200" height="240" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="125" y="47" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="10">DES FEISTEL (64-bit Block)</text>
                    <rect x="40" y="65" width="75" height="35" rx="4" fill="#1e1b4b" />
                    <text x="77" y="87" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="9">L (32b)</text>
                    <rect x="135" y="65" width="75" height="35" rx="4" fill="#083344" />
                    <text x="172" y="87" fill="#cffafe" font-family="monospace" textAnchor="middle" fontSize="9">R (32b)</text>
                    <rect x="55" y="115" width="140" height="40" rx="4" fill="#3b0764" />
                    <text x="125" y="138" fill="#f3e8ff" textAnchor="middle" fontSize="8.5">Round F(R, K_i) ⊕ L</text>
                    <text x="125" y="185" fill="#fca5a5" textAnchor="middle" fontSize="8">• 50% transformed per round</text>
                    <text x="125" y="200" fill="#fca5a5" textAnchor="middle" fontSize="8">• 16 Feistel Rounds Required</text>
                    <text x="125" y="240" fill="#ef4444" fontWeight="bold" textAnchor="middle" fontSize="8.5">56-bit Key -> BROKEN</text>
                  </g>

                  {/* Right: AES SPN */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="25" width="220" height="240" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="365" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">AES SPN (128-bit Block)</text>
                    <rect x="275" y="65" width="180" height="45" rx="4" fill="#064e3b" />
                    <text x="365" y="87" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="9">State Matrix (16 Bytes)</text>
                    <text x="365" y="100" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">All 128 bits transformed simultaneously</text>
                    <rect x="275" y="125" width="180" height="55" rx="4" fill="#083344" />
                    <text x="365" y="145" fill="#cffafe" textAnchor="middle" fontSize="8">SubBytes -> ShiftRows</text>
                    <text x="365" y="160" fill="#cffafe" textAnchor="middle" fontSize="8">-> MixColumns -> AddRoundKey</text>
                    <text x="365" y="205" fill="#34d399" textAnchor="middle" fontSize="8">• 100% transformed in parallel</text>
                    <text x="365" y="240" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">256-bit Key -> UNBREAKABLE</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    RBI Directives: 3DES is prohibited; AES-256-GCM is legally mandatory.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.1: Structural comparison between DES half-block Feistel and AES whole-block SPN networks.
              </p>
            </div>

            {/* Diagram 2: 3DES EDE & Sweet32 Attack */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: 3DES EDE Sequence &amp; Sweet32 Collision
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: 3DES EDE Sequence */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="95" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10">3DES ENCRYPT-DECRYPT-ENCRYPT (EDE) PIPELINE</text>
                    <text x="35" y="70" fill="#cbd5e1" font-family="monospace" fontSize="8.5">C = E_K3( D_K2( E_K1( Plaintext ) ) )</text>
                    <text x="35" y="90" fill="#94a3b8" fontSize="7.5">When K1 == K2 == K3: Decryption cancels 1st encryption -> Reverts to Single DES!</text>
                  </g>

                  {/* Bottom: Sweet32 Attack Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="135" width="460" height="145" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="157" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="10">SWEET32 COLLISION ATTACK (CVE-2016-2183)</text>
                    <text x="35" y="180" fill="#cbd5e1" font-family="monospace" fontSize="8.5">Root Cause: 64-bit Block Size -> sqrt(2^64) = 2^32 Blocks (~32 GB of Traffic)</text>
                    <rect x="35" y="195" width="430" height="35" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="250" y="217" fill="#fee2e2" font-family="monospace" textAnchor="middle" fontSize="8.5">
                      Block Collision (C_i == C_j) => Plaintext XOR Leaked: P_i ⊕ P_j = C_{i-1} ⊕ C_{j-1}
                    </text>
                    <text x="250" y="255" fill="#fca5a5" textAnchor="middle" fontSize="8">
                      NIST &amp; RBI Mandate: Complete global phaseout of 3DES by December 31, 2023.
                    </text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 4.2: 3DES EDE pipeline and the Sweet32 birthday collision vulnerability on 64-bit blocks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Cipher Modernization Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security architects migrate 1,200 ATM switches from 3DES, modernize hospital PACS storage, deploy AES-NI on 220kV power grid RTUs, and author Galois Field labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Legacy Cipher Dilemma ({currentLocalScenario.legacyFlaw})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Modernization Action &amp; Remediation
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
              Guidelines for software engineers and enterprise cryptographic architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Cipher Engineering Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Default to AES-256-GCM:</strong> Enforce 128-bit block size and authenticated encryption.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enable CPU AES-NI:</strong> Leverage hardware silicon for constant-time 8 GB/s throughput.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Audit Legacy Codebases:</strong> Search for and eliminate any remaining DES or 3DES references.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce 96-bit Nonces:</strong> Never reuse nonces with the same AES master key.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Cipher Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using 3DES in Production:</strong> Sweet32 collision attacks expose sessions after 32 GB of data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing 56-bit DES with 64-bit:</strong> 8 bits are discarded parity, leaving a trivial search space.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Software S-Box Lookups:</strong> Creates cache-timing side-channel vulnerabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Violating RBI Directives:</strong> Running 3DES on banking switches incurs statutory penalties.</span>
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
                  <span><strong>Enforce FIPS 197 Standards:</strong> Standardize enterprise cryptographic pipelines on AES-256.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Hardware Security Modules:</strong> Store AES root master keys inside FIPS 140-3 HSMs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act 2023:</strong> Deploy certified encryption to avoid ₹250 Crore penalties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate 90-Day Key Rollover:</strong> Limit the volume of data encrypted under a single key.</span>
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
              Synthesize key DES, 3DES, and AES concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cryptographic Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why block size matters just as much as key size: 3DES nominal key length was 168 bits, but because its block size was only 64 bits, the Birthday Paradox caused block collisions after only 32 GB of data (Sweet32 attack), forcing its global deprecation.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The 4 internal round steps of AES: SubBytes provides non-linear Confusion via Galois Field $GF(2^8)$ multiplicative inverses; ShiftRows and MixColumns provide intra- and inter-column Diffusion; AddRoundKey injects the secret subkey.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise projects, verify that your server production environments have CPU AES-NI instruction support enabled, guaranteeing constant-time hardware encryption at over 8 GB/s.
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
                <span>DES has 64-bit block size, 56-bit effective key, and 16 Feistel rounds (Broken).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3DES uses Encrypt-Decrypt-Encrypt (EDE); deprecated due to Sweet32 attack.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Sweet32 attack exploits 64-bit block collisions after 2^32 blocks (~32 GB).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AES has 128-bit block size: AES-128 (10r), AES-192 (12r), AES-256 (14r).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>4 AES round steps: SubBytes (S-Box), ShiftRows, MixColumns, AddRoundKey.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RBI directives mandate complete retirement of 3DES and migration to AES-256.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Popular Symmetric Ciphers: DES, 3DES, and AES FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Popular Symmetric Ciphers: DES, 3DES, and AES (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The historical journey from DES to 3DES to AES is one of the greatest triumphs in computer science history. Notice how 56-bit DES taught us the limits of key length, how 3DES taught us that 64-bit block sizes fail under high network bandwidth (Sweet32), and how AES-256's Substitution-Permutation Network gave the world an unbreakable mathematical standard. Master these four round operations—SubBytes, ShiftRows, MixColumns, AddRoundKey—and you will understand the heartbeat of modern cryptography."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
