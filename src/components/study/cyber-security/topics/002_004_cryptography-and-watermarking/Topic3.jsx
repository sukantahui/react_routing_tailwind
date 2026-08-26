import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Studio 1: Node Slider State for N(N-1)/2 Key Calculator
  const [nodeCount, setNodeCount] = useState(100);

  // Studio 2: Cipher Paradigm State
  const [selectedCipherFamily, setSelectedCipherFamily] = useState("block_cipher");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_kerberos");

  // Studio 1: Key Scaling Calculations
  const scalingMetrics = useMemo(() => {
    const n = BigInt(nodeCount);
    const symmetricPairwiseKeys = (n * (n - 1n)) / 2n;
    const kdcKeys = n;
    const asymmetricKeys = 2n * n;

    return {
      symmetric: symmetricPairwiseKeys.toLocaleString(),
      kdc: kdcKeys.toLocaleString(),
      asymmetric: asymmetricKeys.toLocaleString(),
      isCritical: nodeCount > 500
    };
  }, [nodeCount]);

  // Studio 2: Stream vs Block Cipher Comparison Data
  const cipherFamilyData = {
    stream_cipher: {
      key: "stream_cipher",
      name: "Stream Ciphers (ChaCha20 / Salsa20)",
      category: "CONTINUOUS PSEUDORANDOM BITSTREAM",
      processingUnit: "Bit-by-Bit or Byte-by-Byte via bitwise XOR: C_i = P_i ⊕ Keystream_i.",
      throughputLatency: "Ultra-low latency; 3x faster than software AES on ARM / mobile devices without hardware acceleration.",
      modeRequirement: "Zero block mode required; does not require padding (No PKCS#7 needed).",
      criticalVulnerability: "Two-Time Pad Flaw: Reusing the same (Key, Nonce) pair completely eliminates the key (C1 ⊕ C2 = P1 ⊕ P2).",
      optimalUseCase: "Real-time voice/video streaming, mobile telemedicine, low-power IoT microcontrollers.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800",
      icon: "🌊"
    },
    block_cipher: {
      key: "block_cipher",
      name: "Block Ciphers (AES-256 / Rijndael)",
      category: "FIXED 128-BIT BLOCK TRANSFORMATION",
      processingUnit: "Discrete 128-bit (16-byte) blocks processed through 10-14 rounds of substitution and permutation.",
      throughputLatency: "Over 5-10 GB/s on modern CPUs using hardware AES-NI instruction sets.",
      modeRequirement: "Requires modes of operation (GCM, CBC, CTR) and padding for bulk data streams.",
      criticalVulnerability: "Deterministic pattern leakage in ECB mode (ECB Penguin) and padding oracle attacks in unauthenticated CBC.",
      optimalUseCase: "Enterprise database encryption, TLS 1.3 web traffic, cloud storage, banking payment switches.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "🧱"
    }
  };

  const activeFamily = cipherFamilyData[selectedCipherFamily];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_kerberos",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Kerberos KDC Scaling for 2,500 Branches",
      budget: "₹9,50,000",
      challenge: "Managing 3,123,750 Symmetric Pairwise Keys across Branches",
      dilemma:
        "Managing individual pairwise shared keys across 2,500 bank branches required generating and securely distributing over 3.12 Million distinct keys!",
      resolution:
        "Mamata deployed a 3-tier Kerberos Key Distribution Center (KDC) with Ticket Granting Services (TGS), reducing key storage from 3,123,750 keys to just 2,500 master keys and enforcing AES-256 session tickets.",
      metrics: {
        keysReduced: "From 3,123,750 to 2,500 Keys",
        kdcArchitecture: "3-Tier KDC (AS + TGS Tickets)",
        sessionSecurity: "Ephemeral AES-256 Session Keys",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_chacha20",
      lead: "Mahima",
      role: "Chief Healthcare Technology Officer",
      location: "Ichapur General Hospital",
      title: "ChaCha20-Poly1305 Telemedicine Rollout",
      budget: "₹5,20,000",
      challenge: "Software AES Latency on ARM Medical Tablets",
      dilemma:
        "Low-power ARM tablets used by rural doctors lacked AES-NI hardware, causing 300ms video lag in software AES encryption.",
      resolution:
        "Mahima migrated mobile telemetry to ChaCha20-Poly1305 (pure ARX integer math), achieving zero latency and full constant-time side-channel immunity under the DPDP Act 2023.",
      metrics: {
        latencyReduction: "Dropped from 300ms to 8ms",
        cpuArchitecture: "Pure ARX Constant-Time Math",
        tabletDeployment: "100% Rural Health Clinics",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_hsm_ot",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU 90-Day Key Rollover & HSM Hardening",
      budget: "₹8,80,000",
      challenge: "Static Plaintext Symmetric Keys in Flash EEPROM",
      dilemma:
        "Substation 220kV RTUs used static 5-year-old symmetric keys stored in plaintext flash memory, vulnerable to physical extraction.",
      resolution:
        "Debangshu deployed DIN-rail mounted hardware HSMs with automated 90-day cryptographic key rollover and zeroization protection, guaranteeing zero key extraction even if physical substations are breached.",
      metrics: {
        hsmCertification: "FIPS 140-3 Level 3 Tamper Resistant",
        keyRotationSchedule: "Automated 90-Day Key Rollover",
        zeroizationTrigger: "Hardware Tamper-Evident Switches",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_benchmarking",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "AES-NI vs ChaCha20 Benchmarking Laboratory",
      budget: "₹4,00,000",
      challenge: "Hardware vs Software Symmetric Performance Trade-offs",
      dilemma:
        "Demonstrating the computational trade-offs between hardware-accelerated block ciphers and software stream ciphers across diverse hardware platforms.",
      resolution:
        "The team built a Python & C benchmarking suite measuring throughput across 140+ student laptops, proving AES-NI reaches 8.2 GB/s on x86 CPUs while ChaCha20 dominates on embedded microcontrollers.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        aesNiThroughput: "8.2 GB/s on Hardware Silicon",
        chacha20Throughput: "1.4 GB/s in Pure Software",
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
            Cyber Security Module 002_004 • Topic 3 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Symmetric Key Cryptography (Secret Key Encryption)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the foundational workhorse of digital security: resolve the N(N-1)/2 Key Scaling Crisis, 
            compare Stream Ciphers (ChaCha20) vs Block Ciphers (AES-256), and deploy Hardware Security Modules (HSMs) under Indian cyber law.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: The N(N-1)/2 Key Scaling Crisis Calculator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧮</span> Studio 1: The N(N-1)/2 Symmetric Key Scaling Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Adjust the slider to simulate the number of communicating nodes in an enterprise network. Compare how pairwise symmetric keys grow quadratically ($N(N-1)/2$) versus Kerberos KDC ($N$) and Asymmetric ($2N$).
            </p>
          </div>

          <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6 shadow-2xl">
            {/* Slider Control */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-300 font-bold uppercase tracking-wider">Number of Network Nodes (N):</span>
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-indigo-400">{nodeCount.toLocaleString()} Nodes</span>
              </div>
              <input
                type="range"
                min="2"
                max="3000"
                step="10"
                value={nodeCount}
                onChange={(e) => setNodeCount(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              /&gt;
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Card 1: Pairwise Symmetric */}
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/40 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Pairwise Symmetric Keys</span>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">{scalingMetrics.symmetric}</div>
                <div className="text-[11px] text-gray-400 font-mono">Formula: [ N * (N - 1) ] / 2</div>
                <div className="text-[10px] text-rose-300 font-semibold pt-1">
                  {nodeCount &gt; 200 ? "⚠️ Administratively Unmanageable Key Explosion!" : "Manageable for small local setups"}
                </div>
              </div>

              {/* Card 2: Kerberos KDC */}
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/40 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Kerberos KDC Master Keys</span>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">{scalingMetrics.kdc}</div>
                <div className="text-[11px] text-gray-400 font-mono">Formula: Exactly N Centralized Keys</div>
                <div className="text-[10px] text-emerald-300 font-semibold pt-1">
                  ✔ 99.9% Storage Reduction via Centralized KDC!
                </div>
              </div>

              {/* Card 3: Asymmetric Pairs */}
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/40 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Asymmetric Key Pairs</span>
                <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono">{scalingMetrics.asymmetric}</div>
                <div className="text-[11px] text-gray-400 font-mono">Formula: 2 * N (1 Public + 1 Private)</div>
                <div className="text-[10px] text-blue-300 font-semibold pt-1">
                  ✔ Linear Growth (Public Key Infrastructure - PKI)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Stream Cipher vs Block Cipher Architectural Comparison */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧱</span> Studio 2: Stream Cipher vs Block Cipher Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle between Stream Ciphers (ChaCha20) and Block Ciphers (AES-256) to compare processing mechanics, hardware latency, mode dependencies, and vulnerability vectors.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(cipherFamilyData).map((fam) => {
              const isSelected = selectedCipherFamily === fam.key;
              return (
                <button
                  key={fam.key}
                  onClick={() => setSelectedCipherFamily(fam.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{fam.icon}</div>
                  <div className="font-bold text-sm text-gray-200 mt-1">{fam.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{fam.category}</div>
                </button>
              );
            })}
          </div>

          {/* Active Family Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeFamily.badgeClass)}>
                  {activeFamily.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeFamily.name}
                </h3>
              </div>
            </div>

            {/* Processing Unit */}
            <div className="p-4 bg-gray-900 rounded-xl border border-blue-900/30 space-y-1 text-xs">
              <span className="text-blue-400 font-bold uppercase tracking-wider block">Core Processing Mechanics:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeFamily.processingUnit}</p>
            </div>

            {/* 3 Comparative Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Throughput &amp; Latency</span>
                <p className="text-gray-200 leading-relaxed">{activeFamily.throughputLatency}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Modes &amp; Padding</span>
                <p className="text-gray-200 leading-relaxed">{activeFamily.modeRequirement}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Critical Vulnerability Vector</span>
                <p className="text-gray-300 leading-relaxed">{activeFamily.criticalVulnerability}</p>
              </div>
            </div>

            {/* Optimal Use Case */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-indigo-900/30 text-xs space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Enterprise Production Deployment:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeFamily.optimalUseCase}</p>
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
              Visualizing the Symmetric Cryptosystem Architecture and Kerberos 3-Tier KDC Protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Symmetric Key Cryptosystem */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Symmetric Shared Secret Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Alice (Sender) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="40" width="110" height="90" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="75" y="65" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">ALICE (Sender)</text>
                    <text x="75" y="80" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Plaintext (P)</text>
                    <rect x="30" y="90" width="90" height="25" rx="4" fill="#083344" />
                    <text x="75" y="106" fill="#cffafe" textAnchor="middle" fontSize="7.5">Encrypt: E_k(P)</text>
                  </g>

                  {/* Public Wire (Center) */}
                  <line x1="130" y1="85" x2="370" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="250" y="75" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="8.5">UNTRUSTED PUBLIC INTERNET</text>
                  <text x="250" y="98" fill="#fca5a5" font-family="monospace" textAnchor="middle" fontSize="8">Ciphertext (C = E_k(P))</text>

                  {/* Bob (Receiver) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="370" y="40" width="110" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="425" y="65" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">BOB (Receiver)</text>
                    <text x="425" y="80" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Decrypted (P)</text>
                    <rect x="380" y="90" width="90" height="25" rx="4" fill="#083344" />
                    <text x="425" y="106" fill="#cffafe" textAnchor="middle" fontSize="7.5">Decrypt: D_k(C)</text>
                  </g>

                  {/* Shared Secret Key Box (Bottom Center) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="150" y="160" width="200" height="70" rx="6" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="185" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10">SHARED SECRET KEY (K)</text>
                    <text x="250" y="200" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8.5">256-bit AES Master Key</text>
                    <text x="250" y="215" fill="#94a3b8" textAnchor="middle" fontSize="7.5">Stored inside FIPS 140-3 Hardware HSMs</text>
                  </g>

                  {/* Secure Key Flow Lines */}
                  <path d="M 75 130 L 75 195 L 150 195" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 425 130 L 425 195 L 350 195" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />

                  <text x="250" y="275" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Key Distribution Dilemma: How to transmit Key K securely before encrypted sessions begin.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.1: Symmetric encryption using a single shared secret key, requiring a secure key distribution channel.
              </p>
            </div>

            {/* Diagram 2: Kerberos 3-Tier KDC Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🎫</span> Diagram B: Kerberos KDC Ticket-Granting Protocol
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central KDC Box (Top) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="130" y="20" width="240" height="90" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10.5">KEY DISTRIBUTION CENTER (KDC)</text>
                    <text x="250" y="62" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8.5">1. Authentication Service (AS)</text>
                    <text x="250" y="80" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="8.5">2. Ticket Granting Service (TGS)</text>
                  </g>

                  {/* Client (Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="160" width="130" height="85" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="85" y="185" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9.5">CLIENT</text>
                    <text x="85" y="202" fill="#a5b4fc" textAnchor="middle" fontSize="7.5">User Mamata</text>
                    <text x="85" y="222" fill="#94a3b8" textAnchor="middle" fontSize="6.5">Holds TGT + Session Key</text>
                  </g>

                  {/* Resource Server (Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="160" width="130" height="85" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="415" y="185" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9.5">FILE SERVER</text>
                    <text x="415" y="202" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">Core Banking DB</text>
                    <text x="415" y="222" fill="#94a3b8" textAnchor="middle" fontSize="6.5">Validates Service Ticket</text>
                  </g>

                  {/* Flows */}
                  <path d="M 85 160 L 150 110" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="90" y="130" fill="#6366f1" fontSize="7.5">1. AS-REQ (Login)</text>

                  <path d="M 190 110 L 120 160" stroke="#34d399" strokeWidth="1.5" />
                  <text x="175" y="145" fill="#34d399" fontSize="7.5">2. TGT Ticket</text>

                  <path d="M 150 202 L 350 202" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGold21)" />
                  <text x="250" y="195" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">3. AP-REQ (Service Ticket)</text>

                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Reduces N(N-1)/2 keys to N master keys; distributes ephemeral symmetric AES session keys.
                  </text>

                  <defs>
                    <marker id="arrowGold21" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 3.2: The Kerberos 3-Tier KDC protocol issuing encrypted symmetric session tickets.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Symmetric Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads scale Kerberos KDC for 2,500 bank branches, deploy ChaCha20 on rural telemedicine tablets, enforce SCADA 90-day HSM key rollover, and benchmark AES-NI across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Key Management Challenge ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Security Architecture Action
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
              Guidelines for cryptographic engineers managing enterprise symmetric keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Symmetric Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Envelope Encryption:</strong> Wrap Data Encryption Keys (DEKs) using HSM Master Keys (KEKs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use AES-NI on x86:</strong> Constant-time hardware instructions eliminate software cache-timing attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use ChaCha20 on ARM:</strong> Pure ARX integer math provides 3x speedup on mobile devices without crypto silicon.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enable Crypto-Shredding:</strong> Deleting a user's DEK satisfies DPDP Act 2023 data erasure mandates.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Symmetric Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Pairwise Key Explosion:</strong> Relying on pairwise keys in large networks creates $N(N-1)/2$ chaos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Reusing Nonces in ChaCha20:</strong> Reusing a keystream cancels out the key and exposes plaintexts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Unauthenticated Stream Ciphers:</strong> Flipping ciphertext bits alters decrypted plaintext silently.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Storing Keys in Plaintext Files:</strong> Violates RBI Master Directions and IT Act Section 43A.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Governance
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy FIPS 140-3 HSMs:</strong> Master keys must never leave tamper-resistant silicon in cleartext.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate 90-Day Key Rotation:</strong> Rotate symmetric keys regularly in cloud KMS to minimize blast radius.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt Hybrid Cryptosystems:</strong> Combine asymmetric key exchange (RSA/ECC) with high-speed AES.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with IT Act Section 69:</strong> Ensure technical processes exist for lawful decryption orders.</span>
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
              Synthesize key symmetric cryptography and key management concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cryptographers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  The fundamental trade-off of symmetric cryptography: it provides unparalleled throughput and computational efficiency (gigabytes per second), but introduces the difficult challenge of key distribution and quadratic key explosion ($N(N-1)/2$).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How modern enterprise architectures solve this dilemma via Hybrid Cryptography (Envelope Encryption): asymmetric cryptography (RSA/ECC) is used only to securely exchange a tiny 256-bit symmetric session key, and high-speed symmetric AES-GCM is used to encrypt the multi-gigabyte payload.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future cloud architectures, never store root encryption keys in server application environment files; always integrate with dedicated Key Management Services (KMS) or Hardware Security Modules (HSMs) with automated key rotation policies.
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
                <span>Symmetric cryptography uses the exact same shared key for encryption &amp; decryption.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Key Scaling Crisis: N users require N(N-1)/2 keys; solved by Kerberos KDC or Hybrid PKI.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stream Ciphers encrypt bit-by-bit (ChaCha20); Block Ciphers encrypt 128-bit blocks (AES).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Two-Time Pad flaw cancels keystream: C1 ⊕ C2 = P1 ⊕ P2.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>AES-NI instructions execute in constant time, eliminating cache-timing leaks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Crypto-shredding enables permanent data erasure under the Indian DPDP Act 2023.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Symmetric Key Cryptography (Secret Key Encryption) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Symmetric Key Cryptography (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Symmetric Key Cryptography is the undisputed engine of modern cybersecurity. While asymmetric cryptography solves identity and key exchange, symmetric ciphers like AES-256 and ChaCha20 handle 99.9% of all bulk data encryption across our planet. Master the nuances of key distribution, the N(N-1)/2 scaling formula, and hardware HSM isolation to design truly resilient cryptosystems."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
