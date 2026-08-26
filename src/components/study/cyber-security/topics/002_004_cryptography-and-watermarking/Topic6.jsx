import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: Comparative Dimension State
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("speed_throughput");

  // Studio 2: Hybrid Pipeline Active Step State
  const [activeHybridStep, setActiveHybridStep] = useState(1);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_switch_hybrid");

  // Studio 1: 6-Dimension Head-to-Head Comparative Data
  const comparativeDimensions = {
    speed_throughput: {
      key: "speed_throughput",
      name: "1. Speed & Bulk Throughput",
      symmetricValue: "5 to 10+ GB/s (Ultra-High Speed via Hardware AES-NI instructions)",
      asymmetricValue: "5 to 10 MB/s (Slow multi-precision modular exponentiation math)",
      ratio: "~1,000x to 10,000x Performance Difference",
      technicalVerdict: "Symmetric AES is mandatory for bulk database, cloud storage, and video stream encryption.",
      winner: "Symmetric Encryption (By a factor of 1000x)",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    key_distribution: {
      key: "key_distribution",
      name: "2. Key Distribution & Scaling",
      symmetricValue: "Quadratic Key Explosion: N(N-1)/2 keys (For 5,000 users = 12.5 Million keys)",
      asymmetricValue: "Linear Key Scaling: Exactly 2N keys (For 5,000 users = 10,000 keys in PKI)",
      ratio: "1,250x Reduction in Key Management Overhead",
      technicalVerdict: "Asymmetric PKI completely eliminates the circular key distribution dilemma.",
      winner: "Asymmetric Encryption (Linear PKI Scaling)",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    resource_power: {
      key: "resource_power",
      name: "3. Resource & Battery Overhead",
      symmetricValue: "<1 KB RAM; ~0.6 CPU cycles/byte; minimal battery drain on IoT sensors",
      asymmetricValue: ">8 KB RAM; thousands of CPU cycles; heavy thermal battery draw on mobile",
      ratio: "98.5% Energy Savings for Symmetric AES & Lightweight ECDH",
      technicalVerdict: "Battery-powered smart meters and mobile UPI apps require lightweight symmetric/ECC math.",
      winner: "Symmetric Encryption & ECC (Ultra-low footprint)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    key_length: {
      key: "key_length",
      name: "4. Key Length & Security Margins",
      symmetricValue: "AES-128 (128 bits) / AES-256 (256 bits) &rarr; Optimal Shannon diffusion",
      asymmetricValue: "RSA-2048 (2048 bits) / RSA-4096 (4096 bits) / ECC-256 (256 bits)",
      ratio: "ECC-256 matches RSA-3072 security with 10x smaller key size",
      technicalVerdict: "Symmetric provides maximum bits of security per byte of key material.",
      winner: "Symmetric & ECC (Highest Entropy Density)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    non_repudiation: {
      key: "non_repudiation",
      name: "5. Non-Repudiation & Signatures",
      symmetricValue: "CANNOT provide Non-Repudiation (Both parties hold the exact same key)",
      asymmetricValue: "TRUE Non-Repudiation (ONLY author holds private key; valid under IT Act Sec 5)",
      ratio: "Exclusive Asymmetric Capability",
      technicalVerdict: "Asymmetric digital signatures (DSCs) are legally mandated for commercial contracts and banking.",
      winner: "Asymmetric Encryption (Exclusive Legal Signatures)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    quantum_vulnerability: {
      key: "quantum_vulnerability",
      name: "6. Quantum Computing Resistance",
      symmetricValue: "SAFE (Grover's algorithm halves key length; AES-256 retains 128-bit quantum security)",
      asymmetricValue: "100% BROKEN (Shor's algorithm solves factoring and DLP in polynomial time)",
      ratio: "Requires Migration to NIST FIPS 203 ML-KEM",
      technicalVerdict: "Symmetric AES-256 is quantum-safe today; Asymmetric must transition to lattice PQC.",
      winner: "Symmetric AES-256 (Grover Resistant)",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  };

  const activeDimension = comparativeDimensions[selectedDimensionKey];

  // Studio 2: 4-Phase Hybrid Pipeline Steps
  const hybridStepsData = [
    {
      step: 1,
      title: "Phase 1: Asymmetric Key Agreement & CA Authentication",
      operation: "Client and Server exchange X.509 digital certificates and execute Ephemeral Elliptic Curve Diffie-Hellman (ECDHE).",
      keyUsed: "Server's Private Key signs handshake; Ephemeral ECDHE keys establish Shared Secret Z.",
      status: "Identity Verified • Zero Pre-Shared Key Needed",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      step: 2,
      title: "Phase 2: Ephemeral Symmetric Session Key Derivation",
      operation: "The computed shared secret Z is passed into HKDF-Extract and HKDF-Expand with session nonces.",
      keyUsed: "Outputs a cryptographically strong, 256-bit symmetric session key (K_session).",
      status: "Ephemeral 256-bit AES Master Key Derived",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    {
      step: 3,
      title: "Phase 3: High-Speed Symmetric Bulk Data Encryption",
      operation: "The multi-gigabyte database payload or video stream is encrypted using AES-256-GCM at 8.4 GB/s.",
      keyUsed: "K_session + 96-bit CSPRNG Nonce + 128-bit GMAC Authentication Tag (T).",
      status: "100% Confidentiality & Integrity Verified in Real Time",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    {
      step: 4,
      title: "Phase 4: Key Zeroization & Perfect Forward Secrecy",
      operation: "Upon session close, K_session and ephemeral ECDHE parameters are wiped from RAM using secure zeroization.",
      keyUsed: "Memory wiped: `memset_s(K_session, 0, 32)`.",
      status: "Guarantees Perfect Forward Secrecy (PFS)",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  ];

  const currentHybridStep = hybridStepsData.find((s) => s.step === activeHybridStep) || hybridStepsData[0];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_switch_hybrid",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "High-Throughput Payment Switch Hybrid TLS",
      budget: "₹9,50,000",
      challenge: "Processing 15,000 TPS on Banking Switches without RSA Bottlenecks",
      dilemma:
        "High-throughput IMPS/NEFT payment switches handling 15,000 transactions/sec were severely bottlenecked by legacy pure RSA encryption operations.",
      resolution:
        "Mamata re-architected the switch to a Hybrid TLS 1.3 model (ECDHE key exchange + AES-256-GCM bulk payload), achieving 15,000 TPS at 1.2ms latency and 100% RBI compliance.",
      metrics: {
        throughputAchieved: "15,000 Transactions / Second",
        latencyReduction: "Dropped from 48ms to 1.2ms",
        pfsEnforced: "100% Ephemeral ECDHE Handshakes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_pgp_ehr",
      lead: "Mahima",
      role: "Chief Healthcare Information Officer",
      location: "Ichapur General Hospital",
      title: "Multi-Gigabyte EHR PGP Hybrid Archive",
      budget: "₹5,20,000",
      challenge: "Secure Bulk Transfer of 40 GB Genomic Datasets",
      dilemma:
        "Transmitting 40 GB whole-genome sequencing files to medical research centers securely without CPU exhaustion or memory stack overflows.",
      resolution:
        "Mahima deployed PGP/GPG hybrid envelope encryption (AES-256 payload + RSA-4096 recipient public key wrapping), securing 50,000+ patient records and achieving full DPDP Act 2023 compliance.",
      metrics: {
        fileSizeEncrypted: "40 GB Whole-Genome Datasets",
        encryptionSpeed: "5.2 GB/s Hardware AES Throughput",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_thermal_ot",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Battery & Thermal Optimization",
      budget: "₹8,80,000",
      challenge: "Remote Line Sensor Thermal Throttling under RSA",
      dilemma:
        "Battery-powered remote sensor RTUs in 220kV power lines suffered thermal throttling and premature battery exhaustion under pure RSA encryption.",
      resolution:
        "Debangshu migrated sensor telemetry to lightweight ECDH key agreement with hardware AES-GCM, reducing energy consumption by 98% and extending remote sensor battery life to 7 years.",
      metrics: {
        energyConsumption: "98.5% Power Reduction",
        sensorBatteryLife: "Extended from 6 Months to 7 Years",
        telemetryUptime: "100.00% Zero Thermal Throttling",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_throughput_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "1000x Throughput Benchmarking Laboratory",
      budget: "₹4,00,000",
      challenge: "Visualizing the 1000x Speed Gap Between AES and RSA",
      dilemma:
        "Demonstrating to university students why asymmetric ciphers cannot encrypt multi-gigabyte video files directly without catastrophic slowdowns.",
      resolution:
        "The team authored a Python benchmark suite comparing AES-GCM (8.4 GB/s) vs RSA-2048 (6.2 MB/s), guiding 140+ students through building 4-phase hybrid cryptosystems and verifying legal non-repudiation.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        benchmarkGapDemonstrated: "1,350x Speed Difference",
        hybridPipelinesAuthored: "Python HKDF + AES-GCM + ECDHE Suite",
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
            Cyber Security Module 002_004 • Topic 6 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Symmetric vs Asymmetric Encryption Comparison
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the architectural trade-offs between Symmetric and Asymmetric cryptosystems: master 
            the 1,000x speed difference, quadratic vs linear key scaling, non-repudiation, and the 4-phase Hybrid Cryptosystem (Envelope Encryption).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: 360-Degree Symmetric vs Asymmetric Comparative Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 1: 360-Degree Head-to-Head Comparative Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 6 fundamental cryptographic dimensions to evaluate the head-to-head architectural differences between Symmetric and Asymmetric paradigms.
            </p>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(comparativeDimensions).map((dim) => {
              const isSelected = selectedDimensionKey === dim.key;
              return (
                <button
                  key={dim.key}
                  onClick={() => setSelectedDimensionKey(dim.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{dim.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{dim.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Dimension Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDimension.badgeClass)}>
                  Comparative Dimension: {activeDimension.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Architectural Evaluation &amp; Trade-off
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Performance Gap</span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">{activeDimension.ratio}</span>
              </div>
            </div>

            {/* Symmetric vs Asymmetric Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Symmetric Paradigm (AES / ChaCha20)</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeDimension.symmetricValue}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/30 space-y-2">
                <span className="text-indigo-400 font-bold uppercase tracking-wider block">Asymmetric Paradigm (RSA / ECC / PQC)</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeDimension.asymmetricValue}</p>
              </div>
            </div>

            {/* Verdict & Winner */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <div className="flex justify-between items-center pb-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider">Engineering Verdict:</span>
                <span className="text-amber-400 font-bold font-mono text-[11px]">Best Suited: {activeDimension.winner}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{activeDimension.technicalVerdict}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-Phase Hybrid Cryptosystem Interactive Pipeline */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔄</span> Studio 2: 4-Phase Hybrid Cryptosystem Interactive Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 4 discrete phases of a modern Hybrid Cryptosystem (used in TLS 1.3, SSH, and PGP) to observe how asymmetric key agreement and symmetric bulk encryption work in seamless harmony.
            </p>
          </div>

          {/* Step Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {hybridStepsData.map((hs) => (
              <button
                key={hs.step}
                onClick={() => setActiveHybridStep(hs.step)}
                className={clsx(
                  "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                  activeHybridStep === hs.step
                    ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                    : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                )}
              &gt;
                <div className="font-bold text-gray-200">Phase {hs.step}</div>
                <div className="text-[10px] text-gray-400 truncate mt-0.5">{hs.title.split(": ")[1]}</div>
              </button>
            ))}
          </div>

          {/* Active Hybrid Step Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentHybridStep.badgeClass)}>
                  {currentHybridStep.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentHybridStep.title}
                </h3>
              </div>
            </div>

            {/* Operation & Key Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Cryptographic Operation</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{currentHybridStep.operation}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Key Material Involved</span>
                <p className="text-gray-300 leading-relaxed font-mono">{currentHybridStep.keyUsed}</p>
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
              Visualizing the Quadratic vs Linear Key Growth and the 4-Phase Hybrid Cryptosystem Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Key Growth Comparison */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Symmetric (N(N-1)/2) vs Asymmetric (2N) Keys
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Symmetric Mesh */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="205" height="240" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="127" y="47" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="10">SYMMETRIC PAIRWISE MESH</text>
                    <circle cx="75" cy="90" r="14" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="75" y="93" fill="#c7d2fe" textAnchor="middle" fontSize="8">Node A</text>
                    <circle cx="180" cy="90" r="14" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="180" y="93" fill="#c7d2fe" textAnchor="middle" fontSize="8">Node B</text>
                    <circle cx="75" cy="180" r="14" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="75" y="183" fill="#c7d2fe" textAnchor="middle" fontSize="8">Node C</text>
                    <circle cx="180" cy="180" r="14" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="180" y="183" fill="#c7d2fe" textAnchor="middle" fontSize="8">Node D</text>
                    {/* Intersecting Key Lines */}
                    <line x1="89" y1="90" x2="166" y2="90" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="75" y1="104" x2="75" y2="166" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="180" y1="104" x2="180" y2="166" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="89" y1="180" x2="166" y2="180" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="85" y1="100" x2="170" y2="170" stroke="#f59e0b" strokeWidth="1" />
                    <line x1="85" y1="170" x2="170" y2="100" stroke="#f59e0b" strokeWidth="1" />
                    <text x="127" y="225" fill="#fca5a5" textAnchor="middle" fontSize="8.5">Keys = N(N-1)/2</text>
                    <text x="127" y="245" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8.5">5,000 Nodes = 12.5M Keys!</text>
                  </g>

                  {/* Right: Asymmetric PKI */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="25" width="215" height="240" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="367" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">ASYMMETRIC PKI DIRECTORY</text>
                    <rect x="300" y="70" width="135" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="367" y="94" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">X.509 CA DIRECTORY</text>
                    {/* User Nodes pointing to CA */}
                    <circle cx="295" cy="165" r="14" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="295" y="168" fill="#c7d2fe" textAnchor="middle" fontSize="7.5">User A</text>
                    <circle cx="440" cy="165" r="14" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="440" y="168" fill="#c7d2fe" textAnchor="middle" fontSize="7.5">User B</text>
                    <line x1="305" y1="152" x2="340" y2="110" stroke="#34d399" strokeWidth="1.5" />
                    <line x1="430" y1="152" x2="395" y2="110" stroke="#34d399" strokeWidth="1.5" />
                    <text x="367" y="225" fill="#34d399" textAnchor="middle" fontSize="8.5">Keys = Exactly 2 * N</text>
                    <text x="367" y="245" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">5,000 Nodes = 10,000 Keys</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Asymmetric PKI transforms unmanageable quadratic key growth into manageable linear directories.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: Quadratic key explosion ($O(N^2)$) in symmetric networks vs linear directory scaling ($O(N)$) in Asymmetric PKI.
              </p>
            </div>

            {/* Diagram 2: Hybrid Cryptosystem (Envelope Encryption) */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>📦</span> Diagram B: The 4-Phase Hybrid Envelope Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Phase 1: Asymmetric Key Agreement */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="50" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1" />
                    <text x="35" y="47" fill="#818cf8" fontWeight="bold" fontSize="9">PHASE 1: Asymmetric Key Agreement</text>
                    <text x="260" y="47" fill="#cbd5e1" font-family="monospace" fontSize="8">ECDHE (P-256) + X.509 CA Certificate</text>
                    <text x="450" y="47" fill="#34d399" textAnchor="end" fontSize="7.5">Identity Auth</text>
                  </g>

                  {/* Phase 2: HKDF Derivation */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="85" width="460" height="50" rx="6" fill="#18181b" stroke="#06b6d4" strokeWidth="1" />
                    <text x="35" y="107" fill="#22d3ee" fontWeight="bold" fontSize="9">PHASE 2: HKDF Session Derivation</text>
                    <text x="260" y="107" fill="#cbd5e1" font-family="monospace" fontSize="8">HKDF_Expand( SharedSecret, "AES", 32 )</text>
                    <text x="450" y="107" fill="#34d399" textAnchor="end" fontSize="7.5">256-bit Key</text>
                  </g>

                  {/* Phase 3: Bulk Data Transfer */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="145" width="460" height="50" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="35" y="167" fill="#34d399" fontWeight="bold" fontSize="9">PHASE 3: Bulk Data Transfer (AES-GCM)</text>
                    <text x="260" y="167" fill="#cbd5e1" font-family="monospace" fontSize="8">AES_256_GCM( Big_Payload, K_session )</text>
                    <text x="450" y="167" fill="#34d399" textAnchor="end" fontSize="7.5">8.4 GB/s Speed</text>
                  </g>

                  {/* Phase 4: Zeroization */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="205" width="460" height="50" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1" />
                    <text x="35" y="227" fill="#c084fc" fontWeight="bold" fontSize="9">PHASE 4: Key Zeroization (PFS)</text>
                    <text x="260" y="227" fill="#cbd5e1" font-family="monospace" fontSize="8">memset_s( K_session, 0, 32 )</text>
                    <text x="450" y="227" fill="#34d399" textAnchor="end" fontSize="7.5">PFS Wiped</text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Hybrid Cryptosystems power 100% of modern HTTPS, SSH, TLS 1.3, Signal, and WhatsApp!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: The 4-phase Hybrid Cryptosystem (Envelope Encryption) pipeline uniting asymmetric key setup with symmetric bulk throughput.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Hybrid Architecture Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security architects deploy hybrid TLS 1.3 on 15,000 TPS payment switches, archive 40 GB genomic datasets with PGP, optimize SCADA RTU battery lifespans, and benchmark throughput across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Architectural Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Hybrid Security Action
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
              Guidelines for system architects designing production hybrid cryptosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Hybrid Cryptography Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Deploy Hybrid Models:</strong> Asymmetric for key agreement; Symmetric for bulk data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Perfect Forward Secrecy:</strong> Ephemeral ECDHE guarantees past traffic cannot be decrypted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Envelope Encryption in Cloud:</strong> Wrap local Data Keys (DEKs) using HSM Master Keys (KEKs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Wipe Session Keys:</strong> Zeroize ephemeral key memory immediately upon connection close.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Comparative Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Encrypting Bulk Data with RSA:</strong> Causes massive CPU spikes, memory exhaustion, and latency.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Claiming Symmetric HMAC is Non-Repudiable:</strong> Both parties share the key; either could forge it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Pairwise Symmetric Key Scaling:</strong> Managing N(N-1)/2 keys in large networks leads to total chaos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Quantum Threat to RSA/ECC:</strong> Shor's algorithm will break classical public-key cryptography.</span>
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
                  <span><strong>Standardize on TLS 1.3:</strong> Disables legacy static RSA key exchange and enforces ECDHE AEAD.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with IT Act Section 43A:</strong> Deploy certified hybrid encryption across all cloud APIs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Implement Public Key Pinning:</strong> Protect mobile banking apps against compromised root CAs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Prepare for Hybrid PQC (Kyber+X25519):</strong> Pilot Post-Quantum key exchange in production environments.</span>
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
              Synthesize key comparison and hybrid cryptosystem concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Enterprise Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why modern digital security is never a choice between Symmetric and Asymmetric cryptography: Asymmetric algorithms solve the impossible problem of identity, trust, and key establishment among strangers; Symmetric algorithms solve the problem of processing petabytes of data at gigabit wire speeds.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The 4-Phase Hybrid pipeline: Notice how Ephemeral Diffie-Hellman (ECDHE) creates a temporary shared secret, HKDF expands it into an AES session key, AES-256-GCM transfers the payload at 8.4 GB/s, and secure zeroization wipes the memory to guarantee Perfect Forward Secrecy.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future cloud architectures, never pass bulk database files directly into KMS or HSM encryption functions; always use Envelope Encryption to generate a local Data Encryption Key (DEK) for high-speed local processing.
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
                <span>Symmetric is ~1,000x faster (bulk data); Asymmetric solves key setup &amp; identity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Key Scaling: Symmetric requires N(N-1)/2 keys; Asymmetric requires 2N keys in PKI.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Asymmetric digital signatures provide legal Non-Repudiation under IT Act Section 5.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Hybrid Cryptosystems combine Asymmetric key agreement with Symmetric AES-GCM.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Grover's algorithm halves symmetric keys (AES-256 safe); Shor's breaks RSA/ECC.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023 enforces up to ₹250 Crores penalty for unencrypted personal data leaks.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Symmetric vs Asymmetric Encryption Comparison FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Symmetric vs Asymmetric Encryption Comparison (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Understanding the comparative synergy between Symmetric and Asymmetric cryptography is the hallmark of a master cybersecurity architect. Recognize why we never choose one over the other in production systems: Asymmetric cryptography provides the keys and identity, while Symmetric cryptography provides the speed and armor. Together, they create the Hybrid Cryptosystems that secure our entire modern world."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
