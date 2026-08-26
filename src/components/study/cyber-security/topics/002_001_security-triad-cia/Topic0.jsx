import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // State for Interactive CIA Triad Studio
  const [selectedAsset, setSelectedAsset] = useState("fintech");
  const [activeThreat, setActiveThreat] = useState("none");
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [hashingEnabled, setHashingEnabled] = useState(true);
  const [haClusteringEnabled, setHaClusteringEnabled] = useState(true);
  const [activePillarTab, setActivePillarTab] = useState("confidentiality");

  // Assets data
  const assets = {
    fintech: {
      name: "Kolkata FinTech UPI Transaction Engine",
      location: "Kolkata Hub",
      lead: "Mamata",
      budget: "₹4,80,000",
      description: "Processes 75,000 live UPI payments per second with zero tolerance for financial ledger tampering.",
      baseC: 98,
      baseI: 99,
      baseA: 99
    },
    hospital: {
      name: "Ichapur Hospital ICU Patient Vitals & EHR",
      location: "Ichapur Health Center",
      lead: "Mahima",
      budget: "₹1,90,000",
      description: "Maintains real-time vital signs and blood type ledgers for critical emergency interventions.",
      baseC: 95,
      baseI: 99,
      baseA: 98
    },
    scada: {
      name: "Barrackpore Blast Furnace SCADA Safety Grid",
      location: "Barrackpore Industrial Belt",
      lead: "Debangshu",
      budget: "₹2,40,000",
      description: "Controls 1600°C molten steel temperature sensors and high-pressure emergency shutoff valves.",
      baseC: 85,
      baseI: 99,
      baseA: 100
    },
    research: {
      name: "Jadavpur Cyber Security Threat Lab Sandbox",
      location: "Jadavpur University Zone",
      lead: "Abhronila",
      budget: "₹3,20,000",
      description: "Stores proprietary malware signatures and zero-day threat intelligence feeds.",
      baseC: 99,
      baseI: 95,
      baseA: 90
    }
  };

  const currentAsset = assets[selectedAsset];

  // Calculate live CIA scores based on controls and threats
  let liveC = currentAsset.baseC;
  let liveI = currentAsset.baseI;
  let liveA = currentAsset.baseA;

  if (!encryptionEnabled) liveC -= 45;
  if (!hashingEnabled) liveI -= 50;
  if (!haClusteringEnabled) liveA -= 40;

  if (activeThreat === "sniffing") {
    liveC = encryptionEnabled ? Math.max(liveC - 10, 85) : Math.max(liveC - 55, 10);
  } else if (activeThreat === "sql_injection") {
    liveI = hashingEnabled ? Math.max(liveI - 15, 80) : Math.max(liveI - 65, 15);
  } else if (activeThreat === "ddos") {
    liveA = haClusteringEnabled ? Math.max(liveA - 15, 82) : Math.max(liveA - 75, 10);
  } else if (activeThreat === "ransomware") {
    liveA = haClusteringEnabled ? Math.max(liveA - 25, 70) : Math.max(liveA - 85, 5);
    liveI = hashingEnabled ? Math.max(liveI - 20, 75) : Math.max(liveI - 60, 20);
  }

  // Clamping
  liveC = Math.max(0, Math.min(100, liveC));
  liveI = Math.max(0, Math.min(100, liveI));
  liveA = Math.max(0, Math.min(100, liveA));

  const getScoreColor = (score) => {
    if (score >= 85) return "text-emerald-400 border-emerald-500 bg-emerald-950/40";
    if (score >= 60) return "text-amber-400 border-amber-500 bg-amber-950/40";
    return "text-rose-400 border-rose-500 bg-rose-950/40";
  };

  const getBarColor = (score) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col space-y-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-sky-950/80 border border-sky-600/60 rounded-full text-xs font-semibold text-sky-300 uppercase tracking-widest">
              Course Module 002_001 • Topic 0
            </span>
            <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-600/60 rounded-full text-xs font-semibold text-emerald-300">
              Cyber Security Foundations
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Introduction to the CIA Triad
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The <strong>CIA Triad</strong> (Confidentiality, Integrity, and Availability) forms the cornerstone
            of modern Information Assurance and Cyber Defense. Master how security controls defend sensitive
            assets, prevent financial fraud, and guarantee operational uptime across enterprise systems in Kolkata,
            Barrackpore, Ichapur, and Jadavpur.
          </p>
        </div>

        {/* Section 1: Conceptual Architecture & Deep Dive */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center space-x-2">
            <span>1. The Three Foundational Pillars of Information Security</span>
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Every cyber defense architecture, encryption protocol, firewall policy, and risk management standard
            (such as ISO/IEC 27001 and NIST CSF) is designed to uphold the three essential pillars of the CIA Triad.
            Click below to inspect each pillar’s technical definition, enforcement mechanisms, and primary threat vectors:
          </p>

          {/* Interactive Pillar Selector Tabs */}
          <div className="flex flex-wrap gap-3 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActivePillarTab("confidentiality")}
              className={clsx(
                "px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300",
                activePillarTab === "confidentiality"
                  ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              🔒 Confidentiality (Secrecy & Privacy)
            </button>
            <button
              onClick={() => setActivePillarTab("integrity")}
              className={clsx(
                "px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300",
                activePillarTab === "integrity"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              🛡️ Integrity (Accuracy & Trust)
            </button>
            <button
              onClick={() => setActivePillarTab("availability")}
              className={clsx(
                "px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300",
                activePillarTab === "availability"
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              ⚡ Availability (Uptime & Resilience)
            </button>
          </div>

          {/* Tab Content Display */}
          {activePillarTab === "confidentiality" && (
            <div className="p-6 bg-slate-900/90 border border-sky-700/50 rounded-xl flex flex-col space-y-4 transition-all duration-300 hover:border-sky-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-sky-300">Confidentiality: Protecting Sensitive Visibility</h3>
                <span className="text-xs bg-sky-950 text-sky-400 px-3 py-1 rounded-full border border-sky-700">
                  Data-at-Rest &bull; Data-in-Transit &bull; Data-in-Use
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Confidentiality ensures that sensitive data, credentials, encryption keys, and intellectual properties
                are never disclosed or accessible to unauthorized individuals, applications, or network listeners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Primary Controls</h4>
                  <p className="text-xs text-slate-300">
                    AES-256-GCM encryption, RSA-4096 asymmetric key exchange, Role-Based Access Control (RBAC), and DLP.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Direct Threat Vectors</h4>
                  <p className="text-xs text-slate-300">
                    Eavesdropping, Wi-Fi packet sniffing, data exfiltration by insiders, credential harvesting, and shoulder surfing.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Enterprise Verification</h4>
                  <p className="text-xs text-slate-300">
                    Dynamic data masking, Tokenization in UPI FinTech gateways, and strict FIPS 140-3 HSM key storage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePillarTab === "integrity" && (
            <div className="p-6 bg-slate-900/90 border border-emerald-700/50 rounded-xl flex flex-col space-y-4 transition-all duration-300 hover:border-emerald-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-emerald-300">Integrity: Guaranteeing Accuracy & Non-Tampering</h3>
                <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-700">
                  Bit-Level Accuracy &bull; Authenticity &bull; Non-Repudiation
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Integrity ensures that information remains perfectly intact, accurate, authentic, and free from unauthorized
                modifications, deletions, malicious SQL injections, or in-transit man-in-the-middle alterations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Primary Controls</h4>
                  <p className="text-xs text-slate-300">
                    Cryptographic hashing (SHA-256/SHA-3), HMAC message signatures, digital certificates, and database ACID locks.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Direct Threat Vectors</h4>
                  <p className="text-xs text-slate-300">
                    Man-in-the-Middle (MitM) payload alteration, SQL Injection database tampering, unauthorized ledger adjustments.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Enterprise Verification</h4>
                  <p className="text-xs text-slate-300">
                    Cryptographic avalanche check: changing a single bit in a 10GB ledger completely alters the SHA-256 checksum.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePillarTab === "availability" && (
            <div className="p-6 bg-slate-900/90 border border-amber-700/50 rounded-xl flex flex-col space-y-4 transition-all duration-300 hover:border-amber-500">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-amber-300">Availability: Ensuring Continuous Service & Uptime</h3>
                <span className="text-xs bg-amber-950 text-amber-400 px-3 py-1 rounded-full border border-amber-700">
                  99.999% "Five Nines" &bull; Fault Tolerance &bull; Disaster Recovery
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Availability guarantees that authorized personnel, hospital doctors, and online banking clients have prompt,
                uninterrupted access to data, computational engines, and critical operational networks whenever required.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Primary Controls</h4>
                  <p className="text-xs text-slate-300">
                    Dual active-passive HA clusters, RAID-10 storage, DDoS Anycast scrubbing, and automated offsite DR backups.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Direct Threat Vectors</h4>
                  <p className="text-xs text-slate-300">
                    Volumetric SYN flood DDoS attacks, ransomware file encryption, electrical blackouts, and physical server floods.
                  </p>
                </div>
                <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Enterprise Verification</h4>
                  <p className="text-xs text-slate-300">
                    Continuous heartbeat ping monitoring, RTO &lt; 15 mins, and RPO = 0 seconds via synchronous replication.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Semantic SVG Diagram */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-sky-400">
            2. Architectural Overview: The CIA Triad Tri-Pillar Model
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            The semantic diagram below visualizes how Confidentiality, Integrity, and Availability converge to form a
            resilient information security shield protecting core digital assets:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex justify-center items-center overflow-x-auto">
            <svg viewBox="0 0 800 400" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradC" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradI" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
                </linearGradient>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
                </radialGradient>
              </defs>

              {/* Central Background Triangle & Glow */}
              <polygon points="400,60 160,340 640,340" fill="url(#centerGlow)" stroke="#334155" strokeWidth="2" strokeDasharray="6,4" />

              {/* Central Core Asset */}
              <circle cx="400" cy="240" r="58" fill="#1e293b" stroke="#818cf8" strokeWidth="3" />
              <text x="400" y="235" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">DIGITAL ASSET</text>
              <text x="400" y="252" fill="#94a3b8" fontSize="11" textAnchor="middle">Protected Data & Service</text>

              {/* Pillar 1: Confidentiality (Top) */}
              <g className="transition-all duration-300 hover:scale-105 cursor-pointer">
                <circle cx="400" cy="60" r="50" fill="url(#gradC)" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="400" y="52" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">CONFIDENTIALITY</text>
                <text x="400" y="70" fill="#bae6fd" fontSize="10" textAnchor="middle">AES-256 &bull; RBAC</text>
                <line x1="400" y1="110" x2="400" y2="182" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="1.5s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Pillar 2: Integrity (Bottom-Left) */}
              <g className="transition-all duration-300 hover:scale-105 cursor-pointer">
                <circle cx="160" cy="340" r="50" fill="url(#gradI)" stroke="#34d399" strokeWidth="2.5" />
                <text x="160" y="332" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">INTEGRITY</text>
                <text x="160" y="350" fill="#a7f3d0" fontSize="10" textAnchor="middle">SHA-256 &bull; HMAC</text>
                <line x1="205" y1="315" x2="350" y2="260" stroke="#34d399" strokeWidth="2" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="1.5s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Pillar 3: Availability (Bottom-Right) */}
              <g className="transition-all duration-300 hover:scale-105 cursor-pointer">
                <circle cx="640" cy="340" r="50" fill="url(#gradA)" stroke="#fbbf24" strokeWidth="2.5" />
                <text x="640" y="332" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">AVAILABILITY</text>
                <text x="640" y="350" fill="#fde68a" fontSize="10" textAnchor="middle">HA &bull; RAID &bull; DR</text>
                <line x1="595" y1="315" x2="450" y2="260" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" values="0;16" dur="1.5s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Boundary Shield Description */}
              <text x="400" y="380" fill="#64748b" fontSize="11" textAnchor="middle">
                Continuous Balance: Weakening any pillar leaves digital assets vulnerable to total compromise
              </text>
            </svg>
          </div>
        </div>

        {/* Section 3: Interactive CIA Triad Studio */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-sky-400">
            3. Interactive CIA Triad Balance & Threat Simulator Studio
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Select an enterprise deployment from West Bengal, simulate malicious threat vectors, and toggle defensive
            controls to observe live security posture degradation and resilience in real time:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-6">
            {/* Asset Selector */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Enterprise Asset in West Bengal:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(assets).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAsset(key)}
                    className={clsx(
                      "p-3 rounded-lg border text-left transition-all duration-300 flex flex-col space-y-1",
                      selectedAsset === key
                        ? "bg-slate-800 border-sky-500 shadow-md shadow-sky-500/20"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{item.location}</span>
                      <span className="text-[10px] text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded">{item.lead}</span>
                    </div>
                    <span className="text-xs text-slate-300 line-clamp-1">{item.name}</span>
                    <span className="text-[11px] font-semibold text-emerald-400">{item.budget}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Threat & Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded-lg border border-slate-800">
              {/* Threat Simulator */}
              <div className="flex flex-col space-y-3">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  1. Trigger Active Cyber Threat Vector:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveThreat("none")}
                    className={clsx(
                      "py-2 px-3 text-xs rounded border transition-all font-medium",
                      activeThreat === "none" ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    🟢 Normal Traffic (Zero Attacks)
                  </button>
                  <button
                    onClick={() => setActiveThreat("sniffing")}
                    className={clsx(
                      "py-2 px-3 text-xs rounded border transition-all font-medium",
                      activeThreat === "sniffing" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    📡 Wi-Fi Packet Sniffing (Confidentiality)
                  </button>
                  <button
                    onClick={() => setActiveThreat("sql_injection")}
                    className={clsx(
                      "py-2 px-3 text-xs rounded border transition-all font-medium",
                      activeThreat === "sql_injection" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    💉 SQL Injection Tamper (Integrity)
                  </button>
                  <button
                    onClick={() => setActiveThreat("ddos")}
                    className={clsx(
                      "py-2 px-3 text-xs rounded border transition-all font-medium",
                      activeThreat === "ddos" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    🌊 100 Gbps DDoS Flood (Availability)
                  </button>
                </div>
              </div>

              {/* Defense Controls */}
              <div className="flex flex-col space-y-3">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  2. Defensive Control Toggles:
                </span>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                    <span className="text-xs text-slate-200">AES-256 Encryption &amp; RBAC (Confidentiality)</span>
                    <input
                      type="checkbox"
                      checked={encryptionEnabled}
                      onChange={(e) => setEncryptionEnabled(e.target.checked)}
                      className="w-4 h-4 text-sky-600 rounded bg-slate-800 border-slate-700"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                    <span className="text-xs text-slate-200">SHA-256 Hashes &amp; Digital Signatures (Integrity)</span>
                    <input
                      type="checkbox"
                      checked={hashingEnabled}
                      onChange={(e) => setHashingEnabled(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded bg-slate-800 border-slate-700"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                    <span className="text-xs text-slate-200">HA Clusters &amp; Anycast DDoS Scrubbing (Availability)</span>
                    <input
                      type="checkbox"
                      checked={haClusteringEnabled}
                      onChange={(e) => setHaClusteringEnabled(e.target.checked)}
                      className="w-4 h-4 text-amber-600 rounded bg-slate-800 border-slate-700"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Live Meter Outputs */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Live CIA Triad Health Scores &amp; Impact Analysis:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Confidentiality Meter */}
                <div className={clsx("p-4 rounded-xl border flex flex-col space-y-2", getScoreColor(liveC))}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">Confidentiality</span>
                    <span className="text-xl font-extrabold">{liveC}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={clsx("h-full transition-all duration-500", getBarColor(liveC))} style={{ width: `${liveC}%` }} />
                  </div>
                  <span className="text-[11px] text-slate-300">
                    {liveC >= 85 ? "Encrypted data is safe from eavesdroppers." : "High risk of unauthorized data exposure!"}
                  </span>
                </div>

                {/* Integrity Meter */}
                <div className={clsx("p-4 rounded-xl border flex flex-col space-y-2", getScoreColor(liveI))}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">Integrity</span>
                    <span className="text-xl font-extrabold">{liveI}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={clsx("h-full transition-all duration-500", getBarColor(liveI))} style={{ width: `${liveI}%` }} />
                  </div>
                  <span className="text-[11px] text-slate-300">
                    {liveI >= 85 ? "Ledgers & hashes match original state." : "Data corruption & tampering detected!"}
                  </span>
                </div>

                {/* Availability Meter */}
                <div className={clsx("p-4 rounded-xl border flex flex-col space-y-2", getScoreColor(liveA))}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">Availability</span>
                    <span className="text-xl font-extrabold">{liveA}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={clsx("h-full transition-all duration-500", getBarColor(liveA))} style={{ width: `${liveA}%` }} />
                  </div>
                  <span className="text-[11px] text-slate-300">
                    {liveA >= 85 ? "High availability failover active (Five 9s)." : "Severe downtime or service outage!"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Four Bengal Case Studies */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-sky-400">
            4. Real-World Case Studies Across West Bengal
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Explore how security engineers apply the CIA Triad to mission-critical infrastructure in Kolkata, Barrackpore,
            Ichapur, and Jadavpur:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  1. Steel Plant Industrial SCADA Safety Grid
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹2,40,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Debangshu &bull; <strong>Location:</strong> Barrackpore Industrial Belt
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu engineered a SCADA sensor telemetry pipeline in Barrackpore. Thermal telemetry must guarantee
                strict <strong>Integrity</strong> (SHA-256 checksums to prevent false sensor injection) and{" "}
                <strong>Availability</strong> (dual-redundant PLC controllers with 99.999% uptime), ensuring molten
                steel blast furnace safety relays fire without delay.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  2. Hospital ICU Patient Vitals &amp; EHR Ledgers
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹1,90,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Mahima &bull; <strong>Location:</strong> Ichapur Critical Care
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mahima deployed an electronic health records network for an Ichapur hospital. Medical histories enforce
                strict <strong>Confidentiality</strong> (AES-256 encryption under patient privacy mandates),{" "}
                <strong>Integrity</strong> (tamper-proof blood group ledgers), and <strong>Availability</strong> (instant
                bed-side retrieval during golden-hour emergencies).
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  3. FinTech High-Volume UPI Payment Engine
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹4,80,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Mamata &bull; <strong>Location:</strong> Kolkata Financial Hub
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mamata deployed a payment settlement engine in Kolkata. Every payment instruction satisfies{" "}
                <strong>Confidentiality</strong> (tokenized card credentials), <strong>Integrity &amp; Non-Repudiation</strong>{" "}
                (HSM-signed transaction hashes), and <strong>Availability</strong> (sub-millisecond active-active server
                clusters processing 75,000 TPS).
              </p>
            </div>

            {/* Case Study 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  4. Cyber Security Incident Response Lab
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹3,20,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Abhronila &bull; <strong>Location:</strong> Jadavpur University Zone
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Abhronila built an interactive security laboratory in Jadavpur. Students simulate attacks against the CIA
                triad, analyzing how ransomware breaches Availability, how SQL injection compromises Integrity, and how
                packet sniffing shatters Confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Common Pitfalls & Practical Advice */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-sky-400">
            5. Common Pitfalls &amp; Professional Advice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center space-x-2">
                <span>⚠️ Common Student Pitfall</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assuming that enabling strong encryption (Confidentiality) automatically guarantees data Integrity.
                Encrypted ciphertext can still be altered or deleted by a Man-in-the-Middle attacker. Always combine
                encryption with cryptographic Message Authentication Codes (HMAC) or Authenticated Encryption (AES-GCM).
              </p>
            </div>
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span>💡 Professional Best Practice</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Apply the principle of <em>Defense-in-Depth</em>: never rely on a single defensive control. Balance all three
                pillars based on business impact, ensure hardware failover handles DoS attacks, and budget enterprise SOC
                infrastructure in Indian Rupees (₹).
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Revision Checklist */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Student Revision Checklist:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Define the 3 pillars: Confidentiality, Integrity, Availability.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Explain how AES-256 protects Confidentiality &amp; SHA-256 protects Integrity.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Distinguish between RTO (Recovery Time) and RPO (Recovery Point).</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Understand the Parkerian Hexad (Authenticity, Possession, Utility).</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Explain Non-Repudiation using asymmetric digital signatures.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Budget enterprise security appliances and HSM clusters in Indian Rupees (₹).</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Introduction to the CIA Triad FAQs" questions={questions} />

        {/* Teacher's Note Section */}
        <Teacher
          note={
            "The CIA Triad is the foundational anchor of all cybersecurity certifications and university curricula. Remember that security is an ongoing balance: over-protecting Confidentiality with extreme access restrictions can destroy Availability for legitimate users, while ignoring Integrity makes stored data completely untrustworthy. Always budget your enterprise firewall and HSM infrastructure in Indian Rupees (₹) and apply Defense-in-Depth!"
          }
        />

        {/* Printable Note Component */}
        <PlainTextPrint
          content={noteText}
          title="Introduction to the CIA Triad"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic1_note.txt"
        />
      </div>
    </div>
  );
};

export default Topic0;
