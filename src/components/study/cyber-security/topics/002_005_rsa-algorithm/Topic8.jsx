import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Hybrid Stepper State
  const [activeStageIndex, setActiveStageIndex] = useState(1);

  // Studio 2: Component Radar State
  const [selectedComponentKey, setSelectedComponentKey] = useState("kem_stage");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_gateway_hybrid");

  // Studio 1: 4 Hybrid Lifecycle Stages
  const hybridStages = [
    {
      step: 1,
      title: "Stage 1: Ephemeral AES-256 Keygen",
      action: "Generate 256-bit CSPRNG Session Key",
      sampleValue: "K_session = 0x7F2B9D4E81A0C35F...E9A4 (32 Bytes / 256 bits)",
      details:
        "Sender generates a unique, single-use 256-bit symmetric session key via hardware random number generator (/dev/urandom). Key is ephemeral and discarded from memory immediately after transaction completion.",
      stateVars: { "Key Type": "AES-256-GCM Session Key", "Entropy": "256 bits (CSPRNG)", "Lifespan": "Single Transaction Only", "RAM Status": "Volatile Secure Heap" },
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      step: 2,
      title: "Stage 2: AES-256-GCM Bulk Encryption (DEM)",
      action: "Encrypt 5 GB Payload via Hardware AES-NI",
      sampleValue: "Ciphertext C_data (5 GB) + 128-bit GHASH Tag T + 96-bit IV",
      details:
        "Data Encapsulation Mechanism (DEM): Plaintext payload is encrypted at 8.4 GB/s using AES-256-GCM. The 128-bit GHASH authentication tag guarantees cryptographic integrity and tamper detection.",
      stateVars: { "Cipher Mode": "AES-256-GCM (AEAD)", "Throughput": ">8,400 MB/s (AES-NI)", "Auth Tag T": "128 bits GHASH", "Nonce / IV": "96 bits Random IV" },
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    {
      step: 3,
      title: "Stage 3: RSA-OAEP Key Wrapping (KEM)",
      action: "Encapsulate 32-byte AES Key with Public RSA",
      sampleValue: "C_key = RSA_OAEP_Encrypt( K_session, Recipient_PubKey ) [256 Bytes]",
      details:
        "Key Encapsulation Mechanism (KEM): The 32-byte AES session key is padded with RSA-OAEP (SHA-256 Feistel network) and encrypted using recipient's public key (e=65537, N=2048). Takes only 1.10 ms.",
      stateVars: { "KEM Algorithm": "RSA-OAEP (PKCS#1 v2.2)", "Padding Hash": "SHA-256 (MGF1)", "Wrapped Key Size": "256 Bytes (2048 bits)", "Execution Time": "1.10 ms" },
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      step: 4,
      title: "Stage 4: Envelope Packing & Decapsulation",
      action: "Package [C_key || IV || C_data || Tag] & Decrypt",
      sampleValue: "Network Package: 256 B Key + 12 B IV + 5 GB Data + 16 B Tag",
      details:
        "Recipient extracts C_key and decrypts it with their private RSA key (d) via RSA-CRT. The recovered K_session decrypts and authenticates C_data at hardware line speed with 100% integrity.",
      stateVars: { "Envelope Packaging": "[ C_key || IV || C_data || Tag ]", "Decapsulation Time": "1.10 ms (RSA) + 0.59s (AES)", "Integrity Verified": "100% GHASH Match", "Plaintext Status": "Fully Restored" },
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    }
  ];

  const currentStage = hybridStages[activeStageIndex - 1];

  // Studio 2: KEM vs DEM Component Radar Data
  const componentProfiles = {
    kem_stage: {
      key: "kem_stage",
      name: "1. Key Encapsulation Mechanism (KEM)",
      primitive: "Asymmetric RSA-2048 / RSA-4096 with RSA-OAEP Padding",
      payloadHandled: "Small 32-Byte Ephemeral Symmetric Keys",
      speedThroughput: "~1,000 operations/sec (~3.2 MB/s)",
      securityPurpose: "Solves Key Distribution without pre-shared secrets; secures session key in transit.",
      hsmLocation: "Master KEK stored permanently inside FIPS 140-3 Hardware Security Module."
    },
    dem_stage: {
      key: "dem_stage",
      name: "2. Data Encapsulation Mechanism (DEM)",
      primitive: "Symmetric AES-256-GCM (Galois/Counter Mode AEAD)",
      payloadHandled: "Multi-Gigabyte / Terabyte Bulk Data Payloads",
      speedThroughput: ">8,400 MB/s (Hardware AES-NI Instructions)",
      securityPurpose: "High-speed bulk confidentiality + 128-bit GHASH authenticated tamper-proofing.",
      hsmLocation: "Executed on local CPU / GPU; session key zeroized immediately after encryption."
    },
    envelope_packaging: {
      key: "envelope_packaging",
      name: "3. Combined Cryptographic Envelope",
      primitive: "Binary / ASN.1 Encapsulated Packet: [ C_key || IV || C_data || Tag ]",
      payloadHandled: "Complete Self-Contained Encrypted Archive",
      speedThroughput: "Zero transmission overhead beyond 284 bytes of envelope headers.",
      securityPurpose: "Provably IND-CCA2 secure under Cramer-Shoup / Bellare-Rogaway hybrid security theorems.",
      hsmLocation: "Stored in cloud databases, S3 buckets, or transmitted across untrusted networks."
    }
  };

  const activeComponent = componentProfiles[selectedComponentKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_gateway_hybrid",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "10Gbps Payment Gateway Hybrid Pipeline",
      budget: "₹9,50,000",
      challenge: "Pure RSA Key Exchanges Choking 50,000 TPS Switches",
      dilemma:
        "High-volume payment switches were experiencing severe CPU choking during UPI transaction bursts due to pure asymmetric encryption overhead.",
      resolution:
        "Mamata deployed an optimized Hybrid RSA-2048 + AES-256-GCM pipeline with hardware AES-NI offloading, slashing latency to 0.85ms and achieving 100% RBI compliance.",
      metrics: {
        switchesAccelerated: "1,200 Payment Gateways",
        latency: "0.85ms per Encrypted Payload",
        throughput: "50,000 Transactions / Sec",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_pacs_envelope",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Oncology PACS Envelope Archiving",
      budget: "₹5,20,000",
      challenge: "Centralized Key Management for 50,000+ DICOM Records",
      dilemma:
        "Encrypting 50,000+ DICOM imaging archives required fast encryption with centralized hospital HSM control and instant master key rotation.",
      resolution:
        "Mahima architected Hybrid OpenPGP envelope encryption with master KEK key rotation, securing ₹250 Crores in statutory compliance margins under the DPDP Act 2023.",
      metrics: {
        dicomScansSecured: "50,000+ Patient Scans",
        keyRotationSpeed: "2.1ms Re-Wrapping",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_telemetry",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA Telemetry IEC 62351 Hardening",
      budget: "₹8,80,000",
      challenge: "Substation RTU Telemetry Under Strict 2ms Latency Caps",
      dilemma:
        "220kV substation RTUs needed authenticated encryption for telemetry packets under strict 2ms latency caps without overloading 80MHz microcontrollers.",
      resolution:
        "Debangshu enforced Hybrid RSA-PSS identity signatures with ephemeral AES-256-GCM telemetry envelopes, achieving 100.00% grid stability across 18 substations.",
      metrics: {
        rtusHardened: "18 High-Voltage Substations",
        telemetryLatency: "0.95ms (Well under 2ms cap)",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_hybrid_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Hybrid Envelope Encryption Laboratory",
      budget: "₹4,00,000",
      challenge: "Teaching Students KEM/DEM Byte Boundaries and Feistel Masks",
      dilemma:
        "Students struggled to visualize how AES session keys are encapsulated inside RSA-OAEP blocks and unpacked in memory.",
      resolution:
        "The team developed an interactive Python/WebAssembly Hybrid Envelope Studio parsing KEM/DEM byte boundaries, training 140+ students on modern cryptographic pipelines.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        studiosAuthored: "Interactive KEM/DEM Visualizer",
        envelopeSpeedVerified: "2,600x Speedup Proved",
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
            Cyber Security Module 002_005 • Topic 8 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Hybrid Cryptosystems: Combining RSA and AES
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the universal standard for modern secure communications: combine asymmetric RSA Key Encapsulation (KEM) 
            with high-speed symmetric AES Data Encapsulation (DEM), master cloud envelope encryption, and explore why hybrid architectures deliver over 2,600x faster throughput.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Hybrid RSA + AES Envelope Encryption Studio */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>✉️</span> Studio 1: Interactive Hybrid RSA + AES Envelope Studio
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the 4 sequential stages of a hybrid cryptographic transaction: generate ephemeral session keys, encrypt bulk data with AES-256-GCM, wrap session keys with RSA-OAEP, and package the transmission envelope.
            </p>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {hybridStages.map((st) => {
              const isSelected = activeStageIndex === st.step;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStageIndex(st.step)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">Stage {st.step}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{st.title.split(": ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentStage.badgeClass)}>
                {currentStage.title}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                {currentStage.action}
              </h3>
            </div>

            {/* Concrete Value & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Cryptographic State Output:</span>
                <p className="text-emerald-400 text-xs sm:text-sm font-bold leading-relaxed">{currentStage.sampleValue}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Operational Engineering Note:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{currentStage.details}</p>
              </div>
            </div>

            {/* State Variables Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Active Hybrid Pipeline Parameters
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {Object.entries(currentStage.stateVars).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block truncate">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 GB File Benchmark Box */}
            <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/40 text-xs font-mono space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block font-sans">
                ⚡ 5 GB Payload Throughput Benchmark: Pure RSA vs Hybrid RSA-AES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-gray-950 rounded-lg border border-rose-900/50">
                  <span className="text-rose-400 font-bold block">Pure RSA-2048 (Unusable):</span>
                  <span className="text-gray-300 text-sm">~1,562 Seconds (26.0 Minutes CPU Time!)</span>
                </div>
                <div className="p-2.5 bg-gray-950 rounded-lg border border-emerald-900/50">
                  <span className="text-emerald-400 font-bold block">Hybrid RSA-2048 + AES-256:</span>
                  <span className="text-white text-sm font-extrabold">~0.60 Seconds (&gt;2,600x FASTER!)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Asymmetric KEM vs Symmetric DEM Architecture Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: Asymmetric KEM vs Symmetric DEM Component Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 3 architectural components to inspect the KEM/DEM paradigm, primitive choices, and cloud HSM security boundaries.
            </p>
          </div>

          {/* Component Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {Object.values(componentProfiles).map((cp) => {
              const isSelected = selectedComponentKey === cp.key;
              return (
                <button
                  key={cp.key}
                  onClick={() => setSelectedComponentKey(cp.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{cp.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{cp.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Component Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                Architectural Role: {activeComponent.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-mono">
                {activeComponent.primitive}
              </h3>
            </div>

            {/* Payload & Throughput */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5 font-mono">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Payload Capacity &amp; Type:</span>
                <p className="text-gray-200 text-xs sm:text-sm font-semibold">{activeComponent.payloadHandled}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5 font-mono">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Throughput Speed:</span>
                <p className="text-emerald-400 text-xs sm:text-sm font-bold">{activeComponent.speedThroughput}</p>
              </div>
            </div>

            {/* Purpose & HSM Boundary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block">Security Purpose:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{activeComponent.securityPurpose}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Cloud / HSM Storage Boundary:</span>
                <p className="text-gray-300 leading-relaxed font-semibold">{activeComponent.hsmLocation}</p>
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
              Visualizing the Hybrid Envelope Packaging Pipeline and the Cloud HSM Envelope Encryption (KEK vs DEK) Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Hybrid Envelope Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The Hybrid Envelope Packaging Pipeline
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top: Plaintext Payload */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="25" width="400" height="35" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="250" y="47" fill="#fbbf24" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      BULK PLAINTEXT PAYLOAD (5 GB File / Database)
                    </text>
                  </g>

                  {/* Left: AES Keygen & DEM */}
                  <line x1="150" y1="60" x2="150" y2="95" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan33)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="95" width="210" height="75" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="130" y="117" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">DEM: AES-256-GCM</text>
                    <text x="130" y="137" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7.5">K_session (256-bit CSPRNG)</text>
                    <text x="130" y="155" fill="#a5f3fc" font-family="monospace" textAnchor="middle" fontSize="7.5">Outputs: C_data + IV + Tag</text>
                  </g>

                  {/* Right: RSA-OAEP KEM */}
                  <line x1="350" y1="60" x2="350" y2="95" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#arrowPurple33)" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="95" width="210" height="75" rx="6" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="370" y="117" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="9">KEM: RSA-OAEP WRAP</text>
                    <text x="370" y="137" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">Recipient's Public Key</text>
                    <text x="370" y="155" fill="#e9d5ff" font-family="monospace" textAnchor="middle" fontSize="7.5">Outputs: C_key (256 B)</text>
                  </g>

                  {/* Envelope Combined */}
                  <line x1="130" y1="170" x2="130" y2="200" stroke="#06b6d4" strokeWidth="1.5" />
                  <line x1="370" y1="170" x2="370" y2="200" stroke="#a855f7" strokeWidth="1.5" />
                  <path d="M 130 200 L 250 200" stroke="#06b6d4" strokeWidth="1.5" />
                  <path d="M 370 200 L 250 200" stroke="#a855f7" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="210" width="440" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="232" fill="#d1fae5" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      NETWORK ENVELOPE: [ C_key || IV || C_data || 128-bit Tag ]
                    </text>
                    <text x="250" y="248" fill="#a7f3d0" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Transmitted across untrusted network with 100% IND-CCA2 security!
                    </text>
                  </g>

                  <defs>
                    <marker id="arrowCyan33" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowPurple33" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: The Hybrid RSA + AES envelope packaging and transmission pipeline.
              </p>
            </div>

            {/* Diagram 2: Cloud Envelope Encryption HSM Architecture */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Cloud HSM Envelope Encryption (KEK vs DEK)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: HSM Master KEK */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="200" height="230" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="125" y="50" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9.5">FIPS 140-3 HSM VAULT</text>
                    <text x="40" y="80" fill="#cbd5e1" font-family="monospace" fontSize="8">• Master Key (KEK)</text>
                    <text x="40" y="105" fill="#38bdf8" font-family="monospace" fontSize="7.5">  RSA-4096 / ECC-384</text>
                    <text x="40" y="135" fill="#cbd5e1" font-family="monospace" fontSize="8">• Key Never Leaves Silicon</text>
                    <text x="40" y="165" fill="#fbbf24" font-family="monospace" fontSize="8">• Cryptographic Erasure</text>
                    <text x="40" y="195" fill="#34d399" font-family="monospace" fontSize="8">• Key Re-wrapping (2ms)</text>
                  </g>

                  {/* Right: Cloud DB & DEKs */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="275" y="25" width="200" height="230" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="375" y="50" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">CLOUD DATA STORAGE</text>
                    <text x="290" y="80" fill="#cbd5e1" font-family="monospace" fontSize="8">• Local DEK (AES-256)</text>
                    <text x="290" y="105" fill="#6ee7b7" font-family="monospace" fontSize="7.5">  Encrypts 100 TB Database</text>
                    <text x="290" y="135" fill="#cbd5e1" font-family="monospace" fontSize="8">• Stored Package:</text>
                    <text x="305" y="155" fill="#a7f3d0" font-family="monospace" fontSize="7.5">  Encrypted Data</text>
                    <text x="305" y="175" fill="#fef08a" font-family="monospace" fontSize="7.5">  + Wrapped DEK</text>
                    <text x="290" y="205" fill="#38bdf8" font-family="monospace" fontSize="8">• 100% DPDP Compliant</text>
                  </g>

                  {/* Wrapping Arrow */}
                  <path d="M 225 140 L 275 140" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowGold33)" />
                  <text x="250" y="132" fill="#fbbf24" font-family="monospace" textAnchor="middle" fontSize="7">Wrap</text>

                  <defs>
                    <marker id="arrowGold33" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: Cloud Envelope Encryption separating Master KEK in HSM from local Data Encryption Keys (DEKs).
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
              Explore how security leads accelerate 10Gbps payment switches, archive 50,000 oncology DICOM records, secure power grid SCADA telemetry, and author envelope studios across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Asymmetric Bottleneck ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Hybrid Solution
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
              Guidelines for cryptographic engineers designing production hybrid envelope encryption systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Hybrid Design Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Use AES-GCM (AEAD):</strong> Built-in 128-bit authentication tags eliminate tampering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce RSA-OAEP for KEM:</strong> Never use unpadded RSA to wrap symmetric session keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Generate Fresh Ephemeral Keys:</strong> Never re-use symmetric session keys across messages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Purge Keys from RAM:</strong> Execute `OPENSSL_cleanse()` on session keys immediately after use.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Hybrid Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using AES-CBC Without HMAC:</strong> Vulnerable to padding oracle and bit-flipping attacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Encrypting Bulk Data with RSA:</strong> Causes severe CPU choking and 26-minute encryption times.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Static Session Key Re-use:</strong> Leaking one key compromises all historical database records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Forgetting to Transmit IV/Nonce:</strong> Recipient cannot decrypt AES-GCM without the matching IV.</span>
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
                  <span><strong>Comply with Section 65B:</strong> GHASH authentication tags guarantee legal electronic admissibility.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enable Instant Key Re-Wrapping:</strong> Rotate master KEKs in 2ms without touching petabytes of data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Apply Cryptographic Erasure:</strong> Delete HSM master keys to instantly shred DPDP cloud data.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Pilot Hybrid Post-Quantum KEM:</strong> Wrap AES keys with FIPS 203 ML-KEM for quantum resilience.</span>
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
              Synthesize key hybrid cryptosystem mechanics before reviewing the comprehensive practice questions.
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
                  The elegant separation of concerns in KEM/DEM: Asymmetric RSA never touches the bulky message data—it only encrypts a tiny 32-byte symmetric AES key. Symmetric AES never touches the recipient's identity—it only encrypts the bulk payload at hardware line speed.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Key Re-wrapping solves big data key rotation: In a 100 Terabyte cloud database, annual master key rotation requires re-encrypting only the 32-byte Data Encryption Key (DEK) inside the HSM, taking 2 milliseconds instead of days of disk I/O!
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise cloud microservices, always standardize on authenticated AES-256-GCM for the DEM layer to guarantee that modified or forged ciphertexts are rejected before any decryption processing occurs.
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
                <span>Hybrid combines asymmetric key exchange (RSA) with symmetric encryption (AES).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>KEM (Key Encapsulation) encrypts the 32-byte AES key using RSA-OAEP.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DEM (Data Encapsulation) encrypts bulk data using AES-256-GCM.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Network Envelope Structure: [ C_key || IV || C_data || 128-bit Tag ].</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Envelope Encryption uses Master KEK in HSM to wrap local DEKs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 43A &amp; Section 65B mandate hybrid authenticated encryption.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Hybrid Cryptosystems: Combining RSA and AES FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Envelope Encryption Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Hybrid Cryptosystems: Combining RSA & AES (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The Hybrid Cryptosystem is the engineering backbone of the modern internet. By pairing asymmetric RSA key encapsulation (KEM) with symmetric AES-256-GCM data encapsulation (DEM), we solve the key distribution problem while achieving over 2,600x faster execution speed. Master the 4-stage lifecycle, deploy cloud envelope encryption with FIPS 140-3 HSM master keys, and ensure every transmission is packaged inside an authenticated IND-CCA2 envelope!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
