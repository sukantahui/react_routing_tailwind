import React, { useState } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // State for Access Control & Confidentiality Simulator
  const [selectedUser, setSelectedUser] = useState("mahima");
  const [accessModel, setAccessModel] = useState("abac");
  const [networkLocation, setNetworkLocation] = useState("trusted");
  const [devicePosture, setDevicePosture] = useState("compliant");
  const [targetAssetTier, setTargetAssetTier] = useState("confidential");
  const [encryptionAtRest, setEncryptionAtRest] = useState(true);
  const [dynamicMasking, setDynamicMasking] = useState(true);

  // Users data
  const users = {
    mamata: {
      name: "Mamata",
      role: "FinTech Compliance Auditor",
      location: "Kolkata HQ",
      clearance: 3, // 1: Public, 2: Internal, 3: Confidential, 4: Top Secret
      budget: "₹6,50,000"
    },
    mahima: {
      name: "Mahima",
      role: "Chief Critical Care Physician",
      location: "Ichapur Hospital",
      clearance: 4,
      budget: "₹2,20,000"
    },
    debangshu: {
      name: "Debangshu",
      role: "Industrial SCADA Safety Engineer",
      location: "Barrackpore Steel Plant",
      clearance: 3,
      budget: "₹3,10,000"
    },
    abhronila: {
      name: "Abhronila",
      role: "Principal Threat Intelligence Analyst",
      location: "Jadavpur Research Lab",
      clearance: 4,
      budget: "₹4,40,000"
    }
  };

  const currentUser = users[selectedUser];

  // Asset Tiers
  const assetTiers = {
    public: { name: "Public Press Release", tierLevel: 1, sampleData: "Public Announcement - Cybersecurity Workshop 2026" },
    internal: { name: "Internal Staff Roster", tierLevel: 2, sampleData: "Employee ID: 4092, Department: Quality Control, Shift: Morning" },
    confidential: { name: "Financial Ledger & Customer PAN", tierLevel: 3, sampleData: "Card Number: 4532-8921-7734-9012, Balance: ₹14,50,000" },
    top_secret: { name: "SCADA Core Firmware & Master Keys", tierLevel: 4, sampleData: "Root Master Key: 0x9F4A8B... | Valve Safety Override PIN: 8492" }
  };

  const currentAsset = assetTiers[targetAssetTier];

  // Evaluate Access Decision
  let accessGranted = false;
  let decisionReason = "";
  let bellLaPadulaStatus = "PASS";

  if (accessModel === "rbac") {
    // RBAC: Static role vs tier
    if (currentUser.clearance >= currentAsset.tierLevel) {
      accessGranted = true;
      decisionReason = `RBAC: Role '${currentUser.role}' has assigned clearance Level ${currentUser.clearance} >= Tier Level ${currentAsset.tierLevel}.`;
    } else {
      accessGranted = false;
      decisionReason = `RBAC Denied: Role '${currentUser.role}' lacks clearance for Level ${currentAsset.tierLevel} data.`;
    }
  } else if (accessModel === "abac") {
    // ABAC: Clearance + Environment checks
    if (currentUser.clearance >= currentAsset.tierLevel) {
      if (networkLocation === "trusted" && devicePosture === "compliant") {
        accessGranted = true;
        decisionReason = `ABAC Permit: Subject clearance Level ${currentUser.clearance}, trusted hospital/corporate network, and compliant device posture validated.`;
      } else {
        accessGranted = false;
        decisionReason = `ABAC Denied: Environmental context violation! Network: '${networkLocation}', Device Posture: '${devicePosture}'. Context risk too high.`;
      }
    } else {
      accessGranted = false;
      decisionReason = `ABAC Denied: Subject clearance Level ${currentUser.clearance} insufficient for Resource tier Level ${currentAsset.tierLevel}.`;
    }
  } else if (accessModel === "bell_lapadula") {
    // Bell-LaPadula: Strict No Read Up
    if (currentUser.clearance >= currentAsset.tierLevel) {
      accessGranted = true;
      bellLaPadulaStatus = "NO READ UP SATISFIED";
      decisionReason = `Bell-LaPadula 'Simple Security Property' satisfied: Subject clearance (${currentUser.clearance}) >= Object classification (${currentAsset.tierLevel}).`;
    } else {
      accessGranted = false;
      bellLaPadulaStatus = "NO READ UP VIOLATION";
      decisionReason = `Bell-LaPadula Violation: 'No Read Up' blocked access. Subject clearance (${currentUser.clearance}) < Object classification (${currentAsset.tierLevel}).`;
    }
  }

  // Display Payload rendering with Dynamic Masking
  const getRenderedData = () => {
    if (!accessGranted) return "[ACCESS DENIED - CONFIDENTIALITY POLICY ENFORCED]";
    if (dynamicMasking && targetAssetTier === "confidential") {
      return "Card Number: XXXX-XXXX-XXXX-9012, Balance: ₹14,50,000 (Dynamic Masking Active)";
    }
    return currentAsset.sampleData;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col space-y-12">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-sky-950/80 border border-sky-600/60 rounded-full text-xs font-semibold text-sky-300 uppercase tracking-widest">
              Course Module 002_001 • Topic 1
            </span>
            <span className="px-3 py-1 bg-indigo-950/80 border border-indigo-600/60 rounded-full text-xs font-semibold text-indigo-300">
              Information Assurance
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Confidentiality: Concepts and Controls
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Explore the core architectural controls of <strong>Confidentiality</strong> across the three states of digital
            data: Data-at-Rest, Data-in-Transit, and Data-in-Use. Master access control models (DAC, MAC, RBAC, ABAC, Bell-LaPadula),
            hardware-isolated enclaves, tokenization, dynamic data masking, and enterprise DLP implementations in West Bengal.
          </p>
        </div>

        {/* Section 1: The Three States of Data */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-sky-400">
            1. The Three States of Digital Data &amp; Core Confidentiality Controls
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Confidentiality cannot be achieved with a single firewall or encryption key. Security architects enforce
            layered cryptographic and logical controls across all three operational states of information:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* State 1: Data-at-Rest */}
            <div className="p-6 bg-slate-900 border border-sky-800/50 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-sky-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">💾</span>
                <h3 className="text-base font-bold text-sky-300">Data-at-Rest (Storage)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Data residing on persistent storage volumes, NVMe drives, database tables, backup tapes, and cloud object stores.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                <span className="text-[11px] font-bold text-sky-400 uppercase">Key Controls:</span>
                <ul className="text-[11px] text-slate-300 list-disc list-inside space-y-0.5">
                  <li>Full Disk Encryption (AES-XTS-512)</li>
                  <li>Transparent DB Encryption (TDE)</li>
                  <li>FIPS 140-3 Level 3 HSM Key Vaults</li>
                  <li>Crypto-Shredding on sanitization</li>
                </ul>
              </div>
            </div>

            {/* State 2: Data-in-Transit */}
            <div className="p-6 bg-slate-900 border border-emerald-800/50 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-emerald-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🌐</span>
                <h3 className="text-base font-bold text-emerald-300">Data-in-Transit (Network)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Data traversing corporate LAN switches, Wi-Fi access points, public fiber links, and microservice REST/gRPC APIs.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase">Key Controls:</span>
                <ul className="text-[11px] text-slate-300 list-disc list-inside space-y-0.5">
                  <li>TLS 1.3 with Perfect Forward Secrecy</li>
                  <li>Mutual TLS (mTLS) for microservices</li>
                  <li>IPsec VPN &amp; WireGuard Tunnels</li>
                  <li>Unidirectional Optical Data Diodes</li>
                </ul>
              </div>
            </div>

            {/* State 3: Data-in-Use */}
            <div className="p-6 bg-slate-900 border border-amber-800/50 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-amber-500">
              <div className="flex items-center space-x-2">
                <span className="text-xl">⚡</span>
                <h3 className="text-base font-bold text-amber-300">Data-in-Use (Memory/CPU)</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Data actively loaded in RAM buffers, CPU L1/L2 caches, processor registers, and hypervisor memory spaces.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex flex-col space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase">Key Controls:</span>
                <ul className="text-[11px] text-slate-300 list-disc list-inside space-y-0.5">
                  <li>Confidential Computing (Intel SGX/AMD SEV)</li>
                  <li>Dynamic Data Masking (DDM)</li>
                  <li>Zero-Knowledge Tokenization Vaults</li>
                  <li>Hardware Memory Bus Encryption</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Semantic SVG Architecture Diagram */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-sky-400">
            2. Architectural Overview: Multi-Layered Confidentiality Defense
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            This diagram illustrates how Access Governance, Cryptographic Pipelines, and DLP Enforcers surround
            sensitive enterprise data assets:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex justify-center items-center overflow-x-auto">
            <svg viewBox="0 0 820 380" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="layerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Outer Layer: Identity & Access Control */}
              <rect x="20" y="20" width="780" height="340" rx="14" fill="url(#layerGrad)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
              <text x="40" y="50" fill="#38bdf8" fontSize="13" fontWeight="bold">LAYER 1: ACCESS GOVERNANCE (RBAC / ABAC / BELL-LAPADULA)</text>

              {/* Middle Layer: Cryptography & Transmission */}
              <rect x="70" y="75" width="680" height="250" rx="12" fill="#0284c7" fillOpacity="0.1" stroke="#0ea5e9" strokeWidth="2" />
              <text x="90" y="105" fill="#0ea5e9" fontSize="12" fontWeight="bold">LAYER 2: CRYPTOGRAPHIC TUNNELS &amp; ENCLAVES (TLS 1.3 / AES-256 / HSM)</text>

              {/* Inner Layer: Data Protection & Masking */}
              <rect x="120" y="130" width="580" height="160" rx="10" fill="#059669" fillOpacity="0.15" stroke="#10b981" strokeWidth="2" />
              <text x="140" y="160" fill="#10b981" fontSize="12" fontWeight="bold">LAYER 3: DATA ENCLAVE &amp; DLP (TOKENIZATION / DYNAMIC MASKING)</text>

              {/* Core Crown Jewel Asset */}
              <rect x="250" y="185" width="320" height="80" rx="8" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
              <text x="410" y="215" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">RESTRICTED DIGITAL ASSETS</text>
              <text x="410" y="235" fill="#c084fc" fontSize="11" textAnchor="middle">Cardholder PAN &bull; Patient EHR &bull; SCADA Keys</text>
              <text x="410" y="252" fill="#94a3b8" fontSize="10" textAnchor="middle">AES-256-GCM Encrypted &bull; FIPS 140-3 HSM</text>

              {/* Left Egress Inspection */}
              <g transform="translate(140, 205)">
                <circle cx="0" cy="0" r="16" fill="#0369a1" stroke="#38bdf8" />
                <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">DLP</text>
                <text x="0" y="24" fill="#94a3b8" fontSize="9" textAnchor="middle">OCR Scan</text>
              </g>

              {/* Right Policy Enforcer */}
              <g transform="translate(680, 205)">
                <circle cx="0" cy="0" r="16" fill="#047857" stroke="#34d399" />
                <text x="0" y="4" fill="#ffffff" fontSize="10" textAnchor="middle">ABAC</text>
                <text x="0" y="24" fill="#94a3b8" fontSize="9" textAnchor="middle">Context Guard</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Section 3: Interactive Studio */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-sky-400">
            3. Interactive Confidentiality Matrix &amp; Access Control Policy Simulator Studio
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm">
            Test how access control models evaluate security clearances, dynamic environmental attributes, and
            confidentiality policies for enterprise users across West Bengal:
          </p>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-6">
            {/* User & Access Model Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Select Requester */}
              <div className="flex flex-col space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  1. Select Access Requester (Subject):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(users).map(([key, item]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedUser(key)}
                      className={clsx(
                        "p-3 rounded-lg border text-left transition-all duration-300 flex flex-col space-y-1",
                        selectedUser === key
                          ? "bg-slate-800 border-sky-500 shadow-md shadow-sky-500/20"
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">{item.name}</span>
                        <span className="text-[10px] text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded">Lvl {item.clearance}</span>
                      </div>
                      <span className="text-[11px] text-slate-300 line-clamp-1">{item.role}</span>
                      <span className="text-[10px] text-slate-500">{item.location}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Access Model */}
              <div className="flex flex-col space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  2. Select Access Control Policy Engine:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setAccessModel("rbac")}
                    className={clsx(
                      "p-2.5 rounded-lg border text-center text-xs font-semibold transition-all",
                      accessModel === "rbac" ? "bg-sky-950 border-sky-500 text-sky-300" : "bg-slate-950 border-slate-800 text-slate-400"
                    )}
                  >
                    RBAC
                    <span className="block text-[10px] font-normal text-slate-500">Role-Based</span>
                  </button>
                  <button
                    onClick={() => setAccessModel("abac")}
                    className={clsx(
                      "p-2.5 rounded-lg border text-center text-xs font-semibold transition-all",
                      accessModel === "abac" ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-slate-950 border-slate-800 text-slate-400"
                    )}
                  >
                    ABAC
                    <span className="block text-[10px] font-normal text-slate-500">Attribute/Context</span>
                  </button>
                  <button
                    onClick={() => setAccessModel("bell_lapadula")}
                    className={clsx(
                      "p-2.5 rounded-lg border text-center text-xs font-semibold transition-all",
                      accessModel === "bell_lapadula" ? "bg-indigo-950 border-indigo-500 text-indigo-300" : "bg-slate-950 border-slate-800 text-slate-400"
                    )}
                  >
                    Bell-LaPadula
                    <span className="block text-[10px] font-normal text-slate-500">No Read Up</span>
                  </button>
                </div>

                {/* Resource Tier Selector */}
                <div className="pt-2 flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Target Resource Classification:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(assetTiers).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => setTargetAssetTier(key)}
                        className={clsx(
                          "py-1.5 px-2 text-[11px] rounded border text-left font-medium transition-all",
                          targetAssetTier === key ? "bg-slate-800 border-sky-400 text-sky-300" : "bg-slate-950 border-slate-800 text-slate-400"
                        )}
                      >
                        Tier {item.tierLevel}: {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Attributes & Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-lg border border-slate-800">
              {/* Context 1: Network */}
              <div className="flex flex-col space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Network Location:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setNetworkLocation("trusted")}
                    className={clsx(
                      "flex-1 py-1.5 text-xs rounded border transition-all",
                      networkLocation === "trusted" ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    )}
                  >
                    🏢 Corporate/Hospital LAN
                  </button>
                  <button
                    onClick={() => setNetworkLocation("untrusted")}
                    className={clsx(
                      "flex-1 py-1.5 text-xs rounded border transition-all",
                      networkLocation === "untrusted" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    )}
                  >
                    ☕ Public Wi-Fi
                  </button>
                </div>
              </div>

              {/* Context 2: Device */}
              <div className="flex flex-col space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Device Posture:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setDevicePosture("compliant")}
                    className={clsx(
                      "flex-1 py-1.5 text-xs rounded border transition-all",
                      devicePosture === "compliant" ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    )}
                  >
                    🛡️ Managed &amp; Compliant
                  </button>
                  <button
                    onClick={() => setDevicePosture("unmanaged")}
                    className={clsx(
                      "flex-1 py-1.5 text-xs rounded border transition-all",
                      devicePosture === "unmanaged" ? "bg-rose-950 border-rose-500 text-rose-300" : "bg-slate-900 border-slate-800 text-slate-400"
                    )}
                  >
                    ⚠️ Unmanaged Device
                  </button>
                </div>
              </div>

              {/* Context 3: Data Masking Toggle */}
              <div className="flex flex-col space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Presentation Controls:</span>
                <label className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800 cursor-pointer">
                  <span className="text-xs text-slate-300">Dynamic Data Masking (DDM)</span>
                  <input
                    type="checkbox"
                    checked={dynamicMasking}
                    onChange={(e) => setDynamicMasking(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded bg-slate-800 border-slate-700"
                  />
                </label>
              </div>
            </div>

            {/* Live Policy Decision & Output Console */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Access Enforcement Engine Output:
                </span>
                <span
                  className={clsx(
                    "px-3 py-1 text-xs font-bold rounded-full border",
                    accessGranted ? "bg-emerald-950 text-emerald-400 border-emerald-600" : "bg-rose-950 text-rose-400 border-rose-600"
                  )}
                >
                  {accessGranted ? "ACCESS GRANTED (PERMIT)" : "ACCESS DENIED (DROP)"}
                </span>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded border border-slate-800 font-mono">
                {decisionReason}
              </p>

              <div className="flex flex-col space-y-1 pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Rendered Data Stream:</span>
                <div className="p-3 bg-slate-900 rounded border border-slate-800 font-mono text-xs text-sky-300 break-all">
                  {getRenderedData()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Four Bengal Case Studies */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-sky-400">
            4. Real-World Confidentiality Case Studies in West Bengal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Study 1 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  1. SCADA Sensor Data Diode Enclave
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹3,10,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Debangshu &bull; <strong>Location:</strong> Barrackpore Industrial Belt
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Debangshu implemented an air-gapped sensor telemetry encryption enclave in Barrackpore. All metallurgical
                telemetry is encrypted using AES-256-GCM at rest, transmitted over unidirectional optical data diodes,
                ensuring sensitive alloy manufacturing formulas remain strictly confidential against industrial espionage.
              </p>
            </div>

            {/* Case Study 2 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  2. Telemedicine Patient EHR Privacy &amp; ABAC
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹2,20,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Mahima &bull; <strong>Location:</strong> Ichapur Health Center
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mahima engineered a HIPAA/DPDP-compliant patient health records portal in Ichapur. Patient medical histories
                are encrypted with AES-256 at rest, masked dynamically for nursing staff, and governed by ABAC rules requiring
                GPS location verification and smartcard biometric authentication before unlocking oncology records.
              </p>
            </div>

            {/* Case Study 3 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  3. Core Banking PCI-DSS Tokenization Vault
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹6,50,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Mamata &bull; <strong>Location:</strong> Kolkata Financial District
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Mamata deployed a high-security PCI-DSS Tokenization Vault in Kolkata. Real customer cardholder PANs never enter
                merchant web databases; random 64-bit surrogate tokens are used for all transaction settlements, with root master
                keys secured inside a dedicated FIPS 140-3 Level 3 Hardware Security Module (HSM).
              </p>
            </div>

            {/* Case Study 4 */}
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-3 transition-all duration-300 hover:border-slate-600">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-100 text-base">
                  4. Academic Threat Intel Sandbox DLP Grid
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-semibold">
                  ₹4,40,000 Budget
                </span>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Engineer:</strong> Abhronila &bull; <strong>Location:</strong> Jadavpur University Campus
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                Abhronila deployed an endpoint and network DLP infrastructure across cyber research labs in Jadavpur. The DLP
                engine uses deep packet inspection and Optical Character Recognition (OCR) scanning to prevent unauthorized
                exfiltration of zero-day vulnerability exploit source code and research datasets.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Common Pitfalls & Professional Advice */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-sky-400">
            5. Common Pitfalls &amp; Professional Advice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-rose-300 flex items-center space-x-2">
                <span>⚠️ Common Architectural Mistake</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Storing master encryption keys on the same web server disk as the encrypted database files. If an attacker
                executes a directory traversal attack or pulls a server image snapshot, they steal both the ciphertext and
                the decryption key simultaneously. Always isolate master keys in dedicated HSMs or Key Management Services (KMS).
              </p>
            </div>
            <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex flex-col space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center space-x-2">
                <span>💡 Professional Best Practice</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Implement <em>Zero Trust Dynamic ABAC</em> alongside Tokenization. Never let applications process raw cardholder
                PANs or Aadhaar numbers if surrogate tokens suffice. Ensure all enterprise DLP and HSM infrastructure procurement
                is budgeted in Indian Rupees (₹).
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
              <span>Differentiate Data-at-Rest, Data-in-Transit, and Data-in-Use.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Explain how AES-256-GCM and TLS 1.3 enforce confidentiality.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Compare DAC, MAC, RBAC, and ABAC access control models.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>State the Bell-LaPadula rules: "No Read Up, No Write Down".</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Explain Tokenization, Dynamic Data Masking (DDM), and DLP.</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sky-400">✓</span>
              <span>Formulate enterprise DLP and HSM budgets in Indian Rupees (₹).</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQTemplate title="Confidentiality: Concepts and Controls FAQs" questions={questions} />

        {/* Teacher's Note Section */}
        <Teacher
          note={
            "Remember that Confidentiality is never just 'turning on encryption'. True confidentiality requires protecting data at rest with AES-256, in transit with TLS 1.3, and in use with hardware-isolated enclaves (Intel SGX/AMD SEV) and dynamic masking. Never hardcode encryption keys in code, enforce strict ABAC least privilege, and budget enterprise DLP appliances in Indian Rupees (₹)!"
          }
        />

        {/* Printable Note Component */}
        <PlainTextPrint
          content={noteText}
          title="Confidentiality: Concepts and Controls"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic2_note.txt"
        />
      </div>
    </div>
  );
};

export default Topic1;
