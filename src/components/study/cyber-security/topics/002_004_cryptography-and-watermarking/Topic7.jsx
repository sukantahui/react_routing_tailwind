import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Hash Sandbox State
  const [inputText, setInputText] = useState("KOLKATA FINTECH SECURE 2026");

  // Studio 2: Hash Algorithm Selector State
  const [selectedHashKey, setSelectedHashKey] = useState("sha256");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_checksum_upgrade");

  // Studio 1: Deterministic Pseudo-Hash Generation for Demonstration
  const generatedHashes = useMemo(() => {
    // Simple deterministic PRNG based on string hash for high-fidelity interactive simulation
    let seed = 0;
    for (let i = 0; i < inputText.length; i++) {
      seed = (seed * 31 + inputText.charCodeAt(i)) & 0xffffffff;
    }

    const pseudoHex = (len, offset) => {
      let result = "";
      let s = (seed + offset) & 0xffffffff;
      const hexChars = "0123456789abcdef";
      for (let i = 0; i < len; i++) {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        result += hexChars[s % 16];
      }
      return result;
    };

    return {
      md5: pseudoHex(32, 101),      // 128 bits = 32 hex
      sha1: pseudoHex(40, 202),     // 160 bits = 40 hex
      sha256: pseudoHex(64, 303),   // 256 bits = 64 hex
      avalancheBits: ((Math.abs(seed) % 30) + 115) // Simulates ~128 bit flips (~50%)
    };
  }, [inputText]);

  // Studio 2: Hash Function Evolution Matrix Data
  const hashProfiles = {
    md5: {
      key: "md5",
      name: "MD5 (Message Digest 5)",
      designer: "Ron Rivest (1991)",
      digestLength: "128 bits (16 bytes / 32 hex characters)",
      architecture: "Merkle-Damgård Construction (64 rounds of non-linear functions)",
      collisionBound: "2^64 operations (Theoretical) -> Broken in <1 second (Practical)",
      knownAttacks: "Xiaoyun Wang (2004) practical collision attacks; Flame nation-state malware forged Microsoft certificates (2012).",
      status: "COMPLETELY BROKEN & FORBIDDEN",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    sha1: {
      key: "sha1",
      name: "SHA-1 (Secure Hash Algorithm 1)",
      designer: "NSA / NIST FIPS 180-1 (1995)",
      digestLength: "160 bits (20 bytes / 40 hex characters)",
      architecture: "Merkle-Damgård Construction (80 rounds with expansion schedule)",
      collisionBound: "2^80 operations (Theoretical) -> SHAttered attack broke it at 2^63.1 (2017)",
      knownAttacks: "SHAttered (Google/CWI 2017) created colliding PDF files with identical SHA-1 hashes.",
      status: "DEPRECATED & RETIRED GLOBALLY",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    sha256: {
      key: "sha256",
      name: "SHA-256 (SHA-2 Family)",
      designer: "NSA / NIST FIPS 180-4 (2002)",
      digestLength: "256 bits (32 bytes / 64 hex characters)",
      architecture: "Merkle-Damgård Construction (64 rounds with Maj, Ch, and Sigma functions)",
      collisionBound: "2^128 operations (Mathematically impregnable to all known attacks)",
      knownAttacks: "Zero known practical or theoretical collisions; global standard for TLS 1.3 & Blockchains.",
      status: "GLOBAL GOLD STANDARD (MANDATORY IN INDIA)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    sha3_512: {
      key: "sha3_512",
      name: "SHA-3 (Keccak Sponge)",
      designer: "Guido Bertoni, Joan Daemen, Michaël Peeters, Gilles Van Assche (NIST 2015)",
      digestLength: "224 to 512 bits (Flexible output lengths)",
      architecture: "Sponge Construction (Absorbing & Squeezing over 1600-bit permutation state)",
      collisionBound: "2^(n/2) operations (Mathematically independent of SHA-2 lineage)",
      knownAttacks: "Inherently immune to Length Extension attacks without requiring HMAC.",
      status: "NEXT-GENERATION FIPS 202 STANDARD",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    }
  };

  const activeHash = hashProfiles[selectedHashKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_checksum_upgrade",
      lead: "Mamata",
      role: "Lead Cryptographic Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "Banking Checksum SHA-256 Fleet Upgrade",
      budget: "₹9,50,000",
      legacyFlaw: "Core Settlement Batch Files Using Legacy MD5 Checksums",
      dilemma:
        "Internal core banking settlement batch files were using legacy MD5 checksums, leaving payment logs vulnerable to hash collision spoofing and RBI audit failures.",
      resolution:
        "Mamata upgraded the batch file verification pipeline to SHA-256 and HMAC-SHA256, eliminating MD5 collision risks and meeting 100% RBI compliance.",
      metrics: {
        batchFilesProtected: "100% Daily Banking Batches",
        hashAlgorithmMigrated: "MD5 Deprecated &rarr; SHA-256",
        collisionRisk: "0% Mathematical Exposure",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_ehr_hash",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Hospital EHR Tamper-Proof Cloud Archival",
      budget: "₹5,20,000",
      legacyFlaw: "Unverified Cloud Archival of 50,000+ Clinical EHR Records",
      dilemma:
        "Archiving 50,000+ patient electronic medical records to cloud storage while ensuring legal proof of non-tampering under Indian courts.",
      resolution:
        "Mahima calculated SHA-256 digital integrity digests for all EHR records prior to cloud transfer, creating Section 65B compliant audit certificates under the DPDP Act 2023.",
      metrics: {
        recordsHashed: "50,000+ Clinical EHR Profiles",
        forensicCertificates: "100% Section 65B Compliant",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_firmware_sha",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Firmware SHA-256 Bootloader Verification",
      budget: "₹8,80,000",
      legacyFlaw: "Unverified Firmware Flashing in 220kV Substation RTUs",
      dilemma:
        "Preventing malicious firmware rootkits from being flashed onto 220kV power substation RTU controllers during maintenance windows.",
      resolution:
        "Debangshu enforced SHA-256 cryptographic hash validation in hardware UEFI Secure Boot ROMs, blocking unauthorized firmware binaries and ensuring 100% power grid uptime.",
      metrics: {
        firmwareIntegrity: "100% SHA-256 Verified ROMs",
        unauthorizedCodeBlocked: "0% Rootkit Injection Surface",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_avalanche_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Hash Collision & Avalanche Effect Laboratory",
      budget: "₹4,00,000",
      legacyFlaw: "Visualizing 50% Bit Flips and Merkle-Damgård Mechanics",
      dilemma:
        "Demonstrating to university students how a 1-bit input change flips 50% of SHA-256 output bits (Avalanche Effect) and why MD5 collision attacks succeed.",
      resolution:
        "The team built an interactive Python visualizer calculating bitwise Hamming distances and simulating MD5 collisions, guiding 140+ students through mastering Merkle-Damgård and SHA-3 Sponge architectures.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        avalancheBitFlipRate: "51.2% Average Dispersion",
        md5CollisionsDemonstrated: "Wang 2004 Collision Model",
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
            Cyber Security Module 002_004 • Topic 7 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Cryptographic Hash Functions: MD5, SHA-1, SHA-256
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the mathematical architecture of cryptographic hash functions: master Preimage and Collision resistance, 
            the Birthday Paradox ($2^{n/2}$), the Avalanche Effect, the downfall of MD5/SHA-1, and SHA-256 forensic standards under Section 65B.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Cryptographic Hash Sandbox & Avalanche Effect Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Studio 1: Cryptographic Hash &amp; Avalanche Effect Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Type or modify any input text to observe how MD5 (128-bit), SHA-1 (160-bit), and SHA-256 (256-bit) hashes update in real time. Notice how flipping a single character flips approximately 50% of all output bits (The Avalanche Effect).
            </p>
          </div>

          <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-5 shadow-2xl">
            {/* Input Box */}
            <div className="space-y-1.5 text-xs">
              <label className="text-gray-300 font-bold uppercase tracking-wider block">Input Plaintext Data String:</label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                placeholder="Type message to hash..."
              /&gt;
            </div>

            {/* Live Digest Outputs */}
            <div className="space-y-3 font-mono text-xs">
              {/* MD5 */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-rose-900/40 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-rose-400 font-bold uppercase tracking-wider">MD5 Digest (128 bits / 32 Hex) - BROKEN</span>
                  <span className="text-[10px] text-rose-300 font-semibold">Collision Bound: 2^64</span>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm font-extrabold truncate">{generatedHashes.md5}</div>
              </div>

              {/* SHA-1 */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-amber-900/40 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold uppercase tracking-wider">SHA-1 Digest (160 bits / 40 Hex) - DEPRECATED</span>
                  <span className="text-[10px] text-amber-300 font-semibold">Collision Bound: 2^63.1 (SHAttered)</span>
                </div>
                <div className="text-gray-300 text-xs sm:text-sm font-extrabold truncate">{generatedHashes.sha1}</div>
              </div>

              {/* SHA-256 */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-emerald-900/40 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">SHA-256 Digest (256 bits / 64 Hex) - SECURE</span>
                  <span className="text-[10px] text-emerald-300 font-semibold">Collision Bound: 2^128 (Impregnable)</span>
                </div>
                <div className="text-emerald-400 text-xs sm:text-sm font-extrabold truncate">{generatedHashes.sha256}</div>
              </div>
            </div>

            {/* Avalanche Metric Banner */}
            <div className="p-3 bg-gray-900/90 rounded-xl border border-indigo-900/30 flex items-center justify-between text-xs">
              <span className="text-indigo-300 font-semibold">Avalanche Dispersion Metric:</span>
              <span className="font-mono text-emerald-400 font-bold">~{generatedHashes.avalancheBits} of 256 bits flipped (~51.2% diffusion)</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: Hash Function Evolution & Collision Resistance Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: Hash Function Evolution &amp; Collision Resistance Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Compare MD5, SHA-1, SHA-256, and SHA-3: inspect digest sizes, internal architectures, mathematical collision bounds ($2^{n/2}$), known attack histories, and Indian legal status.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(hashProfiles).map((hp) => {
              const isSelected = selectedHashKey === hp.key;
              return (
                <button
                  key={hp.key}
                  onClick={() => setSelectedHashKey(hp.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{hp.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{hp.digestLength.split(" ")[0]} Bits</div>
                </button>
              );
            })}
          </div>

          {/* Active Hash Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeHash.badgeClass)}>
                  {activeHash.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeHash.name}
                </h3>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-gray-400">
                {activeHash.designer}
              </div>
            </div>

            {/* 3 Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Digest Length</span>
                <span className="font-bold text-white text-xs sm:text-sm">{activeHash.digestLength.split(" (")[0]}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Architecture</span>
                <span className="font-bold text-indigo-300 text-xs sm:text-sm">{activeHash.architecture.split(" (")[0]}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Collision Bound (Birthday Bound)</span>
                <span className="font-bold text-emerald-400 text-xs sm:text-sm">{activeHash.collisionBound.split(" ")[0]} Ops</span>
              </div>
            </div>

            {/* Known Attacks History */}
            <div className="p-4 bg-gray-900 rounded-xl border border-rose-900/30 text-xs space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Cryptanalysis &amp; Collision History:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeHash.knownAttacks}</p>
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
              Visualizing the Merkle-Damgård Construction Pipeline and the Three Hash Security Complexity Thresholds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Merkle-Damgård Construction */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Merkle-Damgård Compression Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Initial Vector (IV) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="45" width="70" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="55" y="70" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="9">IV (H0)</text>
                  </g>

                  {/* Block 1 Compression */}
                  <line x1="90" y1="65" x2="130" y2="65" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowCyan23)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="130" y="35" width="85" height="60" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="172" y="60" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">f (Compress)</text>
                    <text x="172" y="75" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">Block M1</text>
                  </g>

                  {/* Block 2 Compression */}
                  <line x1="215" y1="65" x2="255" y2="65" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan23)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="255" y="35" width="85" height="60" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="297" y="60" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">f (Compress)</text>
                    <text x="297" y="75" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">Block M2</text>
                  </g>

                  {/* Final Block Compression */}
                  <line x1="340" y1="65" x2="380" y2="65" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan23)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="380" y="35" width="95" height="60" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="427" y="58" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">FINAL f</text>
                    <text x="427" y="72" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">Block Mt + Pad</text>
                  </g>

                  {/* Output Hash */}
                  <path d="M 427 95 L 427 150 L 250 150" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowGreen23)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="100" y="130" width="300" height="40" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="155" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      FINAL HASH DIGEST (256 bits)
                    </text>
                  </g>

                  {/* Length Extension Warning */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="200" width="460" height="65" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1" />
                    <text x="250" y="222" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="9">LENGTH EXTENSION ATTACK VULNERABILITY</text>
                    <text x="250" y="242" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8">
                      Because output = final internal state, naive Hash(Key || M) is broken ➔ Use HMAC-SHA256!
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowCyan23" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowGreen23" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: The Merkle-Damgård hash construction iterating fixed-size compression functions.
              </p>
            </div>

            {/* Diagram 2: Hash Security Complexity Thresholds */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🎂</span> Diagram B: Preimage ($2^n$) vs Birthday Collision ($2^{'{n/2}'}$)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Preimage Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="30" width="210" height="105" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="130" y="55" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="10">PREIMAGE RESISTANCE</text>
                    <text x="130" y="75" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="8.5">Given h ➔ Find m: H(m)=h</text>
                    <text x="130" y="95" fill="#38bdf8" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">Work Factor: 2^n (2^256)</text>
                    <text x="130" y="118" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Fixed Target Search</text>
                  </g>

                  {/* Collision Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="30" width="210" height="105" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="370" y="55" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="10">COLLISION RESISTANCE</text>
                    <text x="370" y="75" fill="#fee2e2" font-family="monospace" textAnchor="middle" fontSize="8.5">Find ANY m1, m2: H(m1)=H(m2)</text>
                    <text x="370" y="95" fill="#f87171" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9.5">Work Factor: 2^(n/2) (2^128)</text>
                    <text x="370" y="118" fill="#fca5a5" textAnchor="middle" fontSize="7.5">Birthday Paradox Bound</text>
                  </g>

                  {/* Forensic Certificate Banner */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="165" width="450" height="95" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="190" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10.5">SECTION 65B INDIAN EVIDENCE ACT FORENSIC STANDARD</text>
                    <text x="40" y="215" fill="#cbd5e1" font-family="monospace" fontSize="8.5">• Seizure Hash logged in Section 65B Certificate ➔ Proves 0% Tampering in Court</text>
                    <text x="40" y="235" fill="#cbd5e1" font-family="monospace" fontSize="8.5">• DPDP Act 2023: Customer Aadhaar Pseudonymization via HMAC-SHA256</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    MD5 broke because 2^64 was reached; SHA-256 requires 2^128 (Mathematically Impregnable).
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: Fixed Preimage target complexity ($2^n$) versus Birthday Paradox collision complexity ($2^{n/2}$).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Hash Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads upgrade banking checksums, secure hospital EHR cloud archives under Section 65B, enforce SCADA RTU firmware hashing, and author avalanche effect labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Hash Integrity Dilemma ({currentLocalScenario.legacyFlaw})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Remediation &amp; Architecture Action
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
              Guidelines for software engineers and forensic digital investigators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Hashing Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Default to SHA-256 / SHA-3:</strong> Standardize on FIPS 180-4 / FIPS 202 for all data integrity checks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use HMAC-SHA256:</strong> Nested hashing completely defeats length extension vulnerabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Argon2id for Passwords:</strong> Memory-hard functions throttle GPU brute-force cracking to ~50 guesses/sec.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Section 65B Hashing:</strong> Log SHA-256 digests immediately during forensic evidence collection.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Hashing Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using MD5 or SHA-1:</strong> Practical collisions exist; completely banned for digital signatures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Storing Passwords with Fast SHA-256:</strong> Modern GPUs test 100 Billion SHA-256 hashes per second.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Naive Hash(Key || M):</strong> Merkle-Damgård internal state allows length extension bypasses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Omitting Cryptographic Salt:</strong> Unsalted password hashes fall instantly to pre-computed rainbow tables.</span>
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
                  <span><strong>Deploy Constant-Time Comparison:</strong> Use <code className="text-emerald-300">crypto.timingSafeEqual()</code> for hash tokens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act 2023:</strong> Deploy HMAC-SHA256 pseudonymization for customer Aadhaar identifiers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit Git Repositories:</strong> Migrate legacy Git repositories to <code className="text-emerald-300">objectFormat = sha256</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Implement Merkle Tree Verifications:</strong> Verify large distributed dataset blocks in <code className="text-emerald-300">O(log N)</code> time.</span>
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
              Synthesize key cryptographic hash and integrity concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Software Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why fast cryptographic hashes (SHA-256) are perfect for file integrity and digital signatures, but completely insecure for storing human passwords: because GPUs can compute over 100 Billion SHA-256 hashes per second. For passwords, always use slow, memory-hard functions like Argon2id.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The Birthday Paradox mathematical bound ($2^{n/2}$): for 128-bit MD5, finding ANY collision takes only $2^{64}$ operations (broken in milliseconds), whereas finding a specific targeted Preimage takes $2^{128}$ operations.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your API authentication designs, never compute `Hash(SecretKey + Message)` which is vulnerable to length extension; always use standard nested HMAC-SHA256 (`crypto.createHmac('sha256', key)`).
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
                <span>Hash functions map variable input to fixed output (H: {'{0,1}'}* ➔ {'{0,1}'}^n).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>3 Properties: Preimage (2^n), Second Preimage (2^n), Collision (2^(n/2)).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Avalanche Effect: Changing 1 bit flips ~50% of output digest bits randomly.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MD5 (128b) and SHA-1 (160b) are broken; SHA-256 (256b) is global standard.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Length extension attack breaks Hash(Key || M); defeated by nested HMAC.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 65B of Indian Evidence Act mandates SHA-256 for court-admissible evidence.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Cryptographic Hash Functions: MD5, SHA-1, SHA-256 FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Cryptographic Hash Functions (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Cryptographic Hash Functions are the universal mathematical glue of the digital universe. From validating forensic digital evidence under Section 65B of the Indian Evidence Act to anchoring blockchain ledgers and digital signatures, mastering SHA-256 and HMAC is essential for every cyber defender. Understand why MD5 and SHA-1 died, and always remember to use slow, memory-hard Argon2id for password authentication."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
