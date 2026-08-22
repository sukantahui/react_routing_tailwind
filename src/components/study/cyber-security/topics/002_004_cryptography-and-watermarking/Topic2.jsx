import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Studio 1: Classical Cipher Interactive State
  const [activeCipherType, setActiveCipherType] = useState("caesar");
  const [userPlaintext, setUserPlaintext] = useState("KOLKATA FINTECH SECURE");
  const [caesarShift, setCaesarShift] = useState(3);
  const [vigenereKey, setVigenereKey] = useState("BENGAL");

  // Studio 2: Classical Architecture Matrix State
  const [selectedArchKey, setSelectedArchKey] = useState("mono_sub");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_freq_workshop");

  // Studio 1: Real-time Classical Encryption Computation
  const calculatedCiphertext = useMemo(() => {
    const cleanText = userPlaintext.toUpperCase().replace(/[^A-Z]/g, "");
    if (!cleanText) return "";

    if (activeCipherType === "caesar") {
      return cleanText
        .split("")
        .map((char) => {
          const p = char.charCodeAt(0) - 65;
          const c = (p + caesarShift) % 26;
          return String.fromCharCode(c + 65);
        })
        .join("");
    } else if (activeCipherType === "affine") {
      // a = 5, b = 8: C = (5P + 8) mod 26
      const a = 5;
      const b = 8;
      return cleanText
        .split("")
        .map((char) => {
          const p = char.charCodeAt(0) - 65;
          const c = (a * p + b) % 26;
          return String.fromCharCode(c + 65);
        })
        .join("");
    } else if (activeCipherType === "vigenere") {
      const cleanKey = vigenereKey.toUpperCase().replace(/[^A-Z]/g, "") || "A";
      return cleanText
        .split("")
        .map((char, idx) => {
          const p = char.charCodeAt(0) - 65;
          const k = cleanKey.charCodeAt(idx % cleanKey.length) - 65;
          const c = (p + k) % 26;
          return String.fromCharCode(c + 65);
        })
        .join("");
    } else if (activeCipherType === "railfence") {
      // 3-Rail Fence
      const numRails = 3;
      const fence = Array.from({ length: numRails }, () => []);
      let rail = 0;
      let direction = 1;

      for (const char of cleanText) {
        fence[rail].push(char);
        rail += direction;
        if (rail === numRails - 1 || rail === 0) {
          direction *= -1;
        }
      }
      return fence.flat().join("");
    }
    return cleanText;
  }, [userPlaintext, activeCipherType, caesarShift, vigenereKey]);

  // Classical Architecture Data for Studio 2
  const classicalArchitectures = {
    mono_sub: {
      key: "mono_sub",
      name: "Monoalphabetic Substitution (Caesar / Affine)",
      category: "SUBSTITUTION (CONFUSION)",
      mechanism: "Fixed 1-to-1 mapping where each plaintext character is replaced by a single static ciphertext character.",
      shannonProperty: "Shannon Confusion (Alters character identity; attempts to hide relationship with key).",
      cryptanalysisFlaw: "Preserves language letter frequencies (ETAOIN SHRDLU); broken in seconds via frequency analysis.",
      modernLegacy: "Evolved into S-Boxes (Substitution Boxes) in modern DES and AES block ciphers.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "🔤"
    },
    poly_sub: {
      key: "poly_sub",
      name: "Polyalphabetic Substitution (Vigenère)",
      category: "POLYALPHABETIC SUBSTITUTION",
      mechanism: "Successive letters are encrypted using different Caesar shifts based on a repeating passphrase keyword.",
      shannonProperty: "Enhanced Confusion (Flattens single-letter frequency spikes across multiple alphabets).",
      cryptanalysisFlaw: "Repeated words align with key intervals; broken via Kasiski Examination and Index of Coincidence (IoC).",
      modernLegacy: "Precursor to pseudorandom keystream generators in Stream Ciphers (ChaCha20, RC4).",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      icon: "📑"
    },
    polygraphic_playfair: {
      key: "polygraphic_playfair",
      name: "Polygraphic Substitution (Playfair / Hill)",
      category: "DIGRAPHIC / MATRIX SUBSTITUTION",
      mechanism: "Encrypts blocks of 2 letters (Playfair 5x5 grid) or vectors of N letters (Hill linear algebra matrix multiplication).",
      shannonProperty: "Higher-Order Confusion (Expands single-letter search space to 676 digrams, eliminating single-letter spikes).",
      cryptanalysisFlaw: "Hill cipher falls to Known-Plaintext Attack via modular matrix inversion ($K = C \\cdot P^{-1} \\bmod 26$).",
      modernLegacy: "Direct foundation of AES `MixColumns()` matrix multiplication step over Galois Field $GF(2^8)$.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "📐"
    },
    transposition_rail: {
      key: "transposition_rail",
      name: "Transposition Ciphers (Rail Fence / Columnar)",
      category: "TRANSPOSITION (DIFFUSION)",
      mechanism: "Characters are rearranged in position (via zig-zag rails or keyword-ordered column extraction) without changing letter identity.",
      shannonProperty: "Shannon Diffusion (Spreads letter positions across the message to destroy sequential language patterns).",
      cryptanalysisFlaw: "Retains 100% of original letter frequencies; broken via Anagramming and digram cluster analysis.",
      modernLegacy: "Direct foundation of AES `ShiftRows()` cyclic byte permutations and P-Boxes in DES.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "🔀"
    }
  };

  const activeArch = classicalArchitectures[selectedArchKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_freq_workshop",
      lead: "Mamata",
      role: "Lead Cryptographic Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "Cryptanalysis Frequency Workshop",
      budget: "₹9,50,000",
      focus: "Monoalphabetic Frequency Analysis & Python Cracking",
      dilemma:
        "Demonstrating why proprietary monoalphabetic letter masking in legacy financial audit logs violates IT Act Section 43A.",
      resolution:
        "Mamata built a Python frequency analysis solver that broke the bank's custom 26-character substitution mapping in 0.04 seconds, proving the necessity of migrating to AES-256-GCM.",
      metrics: {
        crackingTime: "0.04 Seconds (Automated Solver)",
        legacyMaskingDeprecated: "100% Custom Substitution Removed",
        standardEnforced: "FIPS 197 Validated AES-256",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_transposition",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Columnar Transposition Anonymization Triage",
      budget: "₹5,20,000",
      focus: "Transposition Anagramming & Medical Record De-anonymization",
      dilemma:
        "An unvetted healthcare software vendor attempted to anonymize sensitive patient names using a simple 6-rail columnar transposition cipher.",
      resolution:
        "Mahima executed an anagramming cryptanalysis attack, reconstructing 100% of patient names and enforcing FIPS 140-3 validated encryption across all hospital PACS databases under the DPDP Act 2023.",
      metrics: {
        patientNamesReconstructed: "100% De-anonymization Success",
        vendorRemediation: "Enforced FIPS 140-3 AES Modules",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scytale",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA Bit-Interleaving Diffusion Audit",
      budget: "₹8,80,000",
      focus: "Classical Scytale to Modern SCADA Bit Diffusion",
      dilemma:
        "Tracing how ancient Spartan Scytale transposition evolved into modern Modbus telemetry bit interleaving and CRC error checks.",
      resolution:
        "Debangshu audited substation RTU communication channels, verifying that modern CRC error-checking and AES-GCM diffusion prevent electromagnetic noise corruption across 220kV power transmission corridors.",
      metrics: {
        bitDiffusionRate: "100% Interleaved Packet Robustness",
        gridNoiseImmunity: "Zero Transmission Bit Flips",
        scadaProtocolIntegrity: "AES-GCM Authenticated Telemetry",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_hill",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Hill Cipher Linear Algebra Laboratory",
      budget: "₹4,00,000",
      focus: "Modular Matrix Inversion & Polygraphic Cryptanalysis",
      dilemma:
        "Teaching university students how modular matrix inversion works in Python without division errors during 3x3 Hill cipher decryption.",
      resolution:
        "The team authored a linear algebra cryptanalysis toolkit calculating modular determinants and adjugate matrices modulo 26, guiding 140+ students through encrypting and decrypting 3x3 Hill ciphers.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        matrixInvertersAuthored: "Python Modular Adjugate Engine",
        cipherBypassesDemonstrated: "Known-Plaintext Matrix Inversion",
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
            Cyber Security Module 002_004 • Topic 2 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Classical Ciphers: Substitution and Transposition
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Explore the historical origins of cryptography: master Monoalphabetic substitution (Caesar, Affine), 
            Polyalphabetic ciphers (Vigenère, Playfair, Hill), Transposition (Rail Fence, Columnar), and their modern fusion into Product Ciphers.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Classical Cipher Interactive Encryption & Decryption Engine */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚙️</span> Studio 1: Classical Cipher Interactive Encryption Engine
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a classical cipher type, customize parameters (shift, keyword), and type your plaintext to observe real-time mathematical encryption and character transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Control Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-5 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Cipher Selector &amp; Parameters
              </h3>

              {/* Cipher Type Selector */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "caesar", label: "Caesar Shift" },
                  { id: "affine", label: "Affine (5x + 8)" },
                  { id: "vigenere", label: "Vigenère" },
                  { id: "railfence", label: "Rail Fence (3 Rails)" }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCipherType(c.id)}
                    className={clsx(
                      "p-2.5 rounded-xl text-left border text-xs font-bold transition-all",
                      activeCipherType === c.id
                        ? "bg-indigo-950 text-white border-indigo-500 shadow-md shadow-indigo-950/50"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Plaintext Input */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-bold uppercase tracking-wider block">Enter Plaintext Message:</label>
                <input
                  type="text"
                  value={userPlaintext}
                  onChange={(e) => setUserPlaintext(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  placeholder="Type message here..."
                />
              </div>

              {/* Dynamic Parameter Sliders */}
              {activeCipherType === "caesar" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300 font-semibold">
                    <span>Caesar Shift Key (K):</span>
                    <span className="font-mono text-emerald-400 font-bold">+{caesarShift}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={caesarShift}
                    onChange={(e) => setCaesarShift(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              )}

              {activeCipherType === "vigenere" && (
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold uppercase tracking-wider block">Vigenère Keyword:</label>
                  <input
                    type="text"
                    value={vigenereKey}
                    onChange={(e) => setVigenereKey(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-emerald-300 font-mono text-xs focus:outline-none focus:border-indigo-500 uppercase"
                  />
                </div>
              )}
            </div>

            {/* Live Transformation Output (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Live Mathematical Encryption Output</h3>
                  <span className="text-xs text-gray-400">Modulo 26 Transformation</span>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono font-bold">
                  {activeCipherType.toUpperCase()} CIPHER
                </span>
              </div>

              {/* Ciphertext Display */}
              <div className="space-y-1.5">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Generated Ciphertext (C):</span>
                <pre className="p-4 bg-gray-900 rounded-xl border border-gray-800 font-mono text-sm sm:text-base font-extrabold text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                  {calculatedCiphertext || "(No input provided)"}
                </pre>
              </div>

              {/* Transformation Formula Note */}
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[11.5px] text-gray-300 leading-relaxed font-mono">
                {activeCipherType === "caesar" && `Formula: C = (P + ${caesarShift}) mod 26`}
                {activeCipherType === "affine" && `Formula: C = (5*P + 8) mod 26 (gcd(5, 26) = 1)`}
                {activeCipherType === "vigenere" && `Formula: C_i = (P_i + Key[i mod ${vigenereKey.length || 1}]) mod 26`}
                {activeCipherType === "railfence" && `Formula: 3-Rail Zig-Zag Transposition Concatenation`}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Substitution vs Transposition Architectural Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: Substitution vs Transposition Architectural Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare monoalphabetic, polyalphabetic, polygraphic, and transposition cipher paradigms: inspect their mathematical mechanism, Shannon property, cryptanalysis weakness, and legacy in modern AES design.
            </p>
          </div>

          {/* Architecture Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(classicalArchitectures).map((arch) => {
              const isSelected = selectedArchKey === arch.key;
              return (
                <button
                  key={arch.key}
                  onClick={() => setSelectedArchKey(arch.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{arch.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{arch.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{arch.category.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Architecture Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeArch.badgeClass)}>
                  {activeArch.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeArch.name}
                </h3>
              </div>
            </div>

            {/* Mechanism Description */}
            <div className="p-4 bg-gray-900 rounded-xl border border-blue-900/30 space-y-1 text-xs">
              <span className="text-blue-400 font-bold uppercase tracking-wider block">Mathematical Mechanism:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeArch.mechanism}</p>
            </div>

            {/* Shannon Property vs Cryptanalysis Flaw */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Shannon Property Provided</span>
                <p className="text-gray-200 leading-relaxed">{activeArch.shannonProperty}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Historic Cryptanalysis Flaw</span>
                <p className="text-gray-300 leading-relaxed">{activeArch.cryptanalysisFlaw}</p>
              </div>
            </div>

            {/* Modern Legacy in AES */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-purple-900/30 text-xs space-y-1">
              <span className="text-purple-400 font-bold uppercase tracking-wider block">Modern Cryptographic Legacy (AES &amp; DES):</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeArch.modernLegacy}</p>
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
              Visualizing Substitution (Confusion) vs Transposition (Diffusion) and the Modern Product Cipher Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Substitution vs Transposition */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Substitution (Confusion) vs Transposition (Diffusion)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Plaintext Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="40" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="50" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10.5">PLAINTEXT: "H E L L O"</text>
                  </g>

                  {/* Left: Substitution Path */}
                  <line x1="140" y1="65" x2="140" y2="105" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan20)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="105" width="210" height="110" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="135" y="130" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">SUBSTITUTION (Confusion)</text>
                    <text x="135" y="145" fill="#a5f3fc" textAnchor="middle" fontSize="8">Replaces Character Identity</text>
                    <rect x="50" y="158" width="170" height="35" rx="4" fill="#18181b" />
                    <text x="135" y="180" fill="#38bdf8" font-family="monospace" textAnchor="middle" fontSize="9">"K H O O R" (Shift +3)</text>
                  </g>

                  {/* Right: Transposition Path */}
                  <line x1="360" y1="65" x2="360" y2="105" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen20)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="105" width="210" height="110" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="365" y="130" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">TRANSPOSITION (Diffusion)</text>
                    <text x="365" y="145" fill="#a7f3d0" textAnchor="middle" fontSize="8">Permutes Linear Order</text>
                    <rect x="280" y="158" width="170" height="35" rx="4" fill="#18181b" />
                    <text x="365" y="180" fill="#34d399" font-family="monospace" textAnchor="middle" fontSize="9">"H L O E L" (Reordered)</text>
                  </g>

                  {/* Bottom: Shannon Synthesis */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="235" width="460" height="55" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="258" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9.5">CLAUDE SHANNON'S PRODUCT CIPHER SYNTHESIS</text>
                    <text x="250" y="274" fill="#cbd5e1" textAnchor="middle" fontSize="8">Combining Substitution (S-Boxes) + Transposition (P-Boxes) across rounds creates AES!</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan20" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen20" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.1: Substitution changes letter identities (Confusion), whereas Transposition rearranges letter positions (Diffusion).
              </p>
            </div>

            {/* Diagram 2: Playfair 5x5 Matrix & SPN Product Cipher */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>📐</span> Diagram B: Playfair 5x5 Matrix &amp; SPN Product Rounds
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Playfair Matrix */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="200" height="230" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="125" y="55" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="10">PLAYFAIR 5x5 MATRIX</text>
                    <rect x="40" y="70" width="170" height="135" rx="4" fill="#1e1b4b" />
                    <text x="125" y="95" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="9">M   O   N   A   R</text>
                    <text x="125" y="120" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="9">C   H   Y   B   D</text>
                    <text x="125" y="145" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="9">E   F   G  I/J  K</text>
                    <text x="125" y="170" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="9">L   P   Q   S   T</text>
                    <text x="125" y="195" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="9">U   V   W   X   Z</text>
                    <text x="125" y="225" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Digram Rectangle Rule: "EA" -> "IM"</text>
                  </g>

                  {/* Right: Modern AES SPN Round */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="30" width="220" height="230" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="365" y="55" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">AES SPN ROUND STEPS</text>
                    <rect x="270" y="75" width="190" height="32" rx="4" fill="#083344" />
                    <text x="365" y="95" fill="#cffafe" textAnchor="middle" fontSize="8.5">1. SubBytes() [S-Box Confusion]</text>
                    <rect x="270" y="115" width="190" height="32" rx="4" fill="#064e3b" />
                    <text x="365" y="135" fill="#d1fae5" textAnchor="middle" fontSize="8.5">2. ShiftRows() [Permutation Diffusion]</text>
                    <rect x="270" y="155" width="190" height="32" rx="4" fill="#083344" />
                    <text x="365" y="175" fill="#cffafe" textAnchor="middle" fontSize="8.5">3. MixColumns() [Matrix Diffusion]</text>
                    <rect x="270" y="195" width="190" height="32" rx="4" fill="#3b0764" />
                    <text x="365" y="215" fill="#f3e8ff" textAnchor="middle" fontSize="8.5">4. AddRoundKey() [XOR Subkey]</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    IT Act 2000 Section 43A: Classical ciphers are legally obsolete; AES-256 is mandatory.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 2.2: From Playfair 5x5 digraphic matrices to AES Substitution-Permutation Network (SPN) rounds.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Classical Cryptanalysis Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads conduct cryptanalysis workshops, prevent medical record de-anonymization, trace SCADA bit interleaving, and author Hill cipher labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Classical Cipher Flaw ({currentLocalScenario.focus})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Cryptanalysis Action &amp; Remediation
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
              Guidelines for cryptanalysts and students studying classical ciphers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Cryptanalysis Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Check Single-Letter Frequencies:</strong> 'E' (12.7%) and 'T' (9.1%) instantly expose monoalphabetic ciphers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Kasiski for Vigenère:</strong> Find the GCD of distances between repeated trigraphs to deduce key length.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Verify Affine Coprimality:</strong> Ensure <code className="text-indigo-300">gcd(a, 26) = 1</code> before attempting encryption.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Remember Product Ciphers:</strong> Modern AES succeeds by uniting substitution and transposition.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Classical Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Assuming 26! Key Space is Secure:</strong> Monoalphabetic substitution falls to frequency analysis in 0.04s.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Deploying ROT13 as Encryption:</strong> ROT13 is purely an obfuscation tool with zero cryptographic strength.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Non-Invertible Hill Matrices:</strong> If <code className="text-rose-300">gcd(det(K), 26) != 1</code>, decryption fails completely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Violating IT Act Section 43A:</strong> Using classical ciphers for commercial customer data is illegal.</span>
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
                  <span><strong>Enforce FIPS 197 Standards:</strong> Migrate all legacy text scrambling to AES-256-GCM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit Vendor Encryption Modules:</strong> Ensure third-party vendors do not use classical ciphers for data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Understand Feistel vs SPN:</strong> Feistel operates on half-blocks; SPN transforms whole blocks in parallel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce DPDP Act 2023 Compliance:</strong> Deploy state-of-the-art cryptographic safeguards across all databases.</span>
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
              Synthesize key substitution and transposition concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cryptanalysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why neither substitution alone nor transposition alone is secure: substitution alters character identity but preserves positions and language statistics; transposition scrambles positions but preserves letter identities. Modern block ciphers combine both across 10 to 14 rounds to eliminate both flaws.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The mathematical elegance of the Affine cipher: why the key $a$ must be coprime to 26 ($\gcd(a, 26) = 1$). If $a$ shared a common factor with 26 (like $a=2$ or $a=13$), multiple plaintext letters would map to the exact same ciphertext letter, making unambiguous decryption mathematically impossible.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future academic cryptanalysis experiments, write a Python script that calculates the Index of Coincidence ($I_c$) across ciphertext slices to automatically deduce the key length of polyalphabetic ciphers.
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
                <span>Substitution replaces letters (Confusion); Transposition rearranges (Diffusion).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Caesar cipher has only 25 usable keys; ROT13 is self-inverting (K=13).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Affine Cipher requires gcd(a, 26) = 1 for modular inverse decryption.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Playfair cipher encrypts pairs of letters (digrams) using a 5x5 matrix.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Vigenère is broken via Kasiski examination and Index of Coincidence (IoC).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Product ciphers combine Substitution + Transposition across multiple rounds.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Classical Ciphers: Substitution &amp; Transposition FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Classical Ciphers: Substitution &amp; Transposition (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Classical ciphers are the historical cradle of all modern cryptography. When you understand how Caesar, Vigenère, Playfair, and Hill ciphers were broken by frequency analysis and linear algebra, you understand why Claude Shannon's fusion of Substitution and Transposition into multi-round Product Ciphers (Feistel and SPN) became the immortal foundation of modern AES."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
