import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic0_files/vpn_tunnel_sim.py?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgVpnTunnelId = useId();
  const svgRemoteVsSiteId = useId();

  // Studio 1: Active Pillar Dimension Selection
  const [selectedPillarKey, setSelectedPillarKey] = useState("confidentiality");

  // Studio 2: Live Encapsulation Simulator State
  const [selectedPayloadType, setSelectedPayloadType] = useState("tax_records");
  const [selectedCipherSuite, setSelectedCipherSuite] = useState("aes_256_gcm");
  const [simulateMitmTamper, setSimulateMitmTamper] = useState(false);

  // Studio 3: Performance & Overhead Calculations
  const [remoteWorkersCount, setRemoteWorkersCount] = useState(250); // 50 to 2000 users
  const [userTrafficMbps, setUserTrafficMbps] = useState(5); // 1 to 25 Mbps
  const [vpnHeaderOverheadBytes, setVpnHeaderOverheadBytes] = useState(60); // 20 to 80 Bytes

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_egov_tunnel");

  // Comparison Database for Studio 1
  const vpnPillars = {
    confidentiality: {
      key: "confidentiality",
      title: "1. Confidentiality (Symmetric Encryption)",
      category: "Data Privacy",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Transforms sensitive plaintext into mathematically indecipherable ciphertext across public networks.",
      ciphers: "AES-256-GCM, AES-256-CBC, ChaCha20-Poly1305.",
      protection: "Renders eavesdropped packets completely useless to ISP wiretappers and rogue Wi-Fi sniffers.",
      verdict: "AES-256-GCM is the modern gold standard, offering authenticated hardware encryption at line rate."
    },
    integrity: {
      key: "integrity",
      title: "2. Data Integrity & Anti-Tampering",
      category: "Cryptographic Hashing",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "Generates a cryptographic authentication tag (HMAC / GHASH) to prove data has not been modified in transit.",
      ciphers: "HMAC-SHA-256, HMAC-SHA-384, Poly1305.",
      protection: "Detects and drops any packet modified, bit-flipped, or injected by a Man-in-the-Middle (MitM) attacker.",
      verdict: "Combined with AEAD ciphers, integrity verification prevents padding-oracle exploits."
    },
    authentication: {
      key: "authentication",
      title: "3. Endpoint & User Authentication",
      category: "Identity Verification",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "Verifies the authentic identity of connecting clients and gateway servers prior to tunnel negotiation.",
      ciphers: "X.509 Digital Certificates (PKI), Pre-Shared Keys (PSK), SAML 2.0 MFA.",
      protection: "Prevents rogue rogue-gateway spoofing and unauthorized intruder access using compromised passwords.",
      verdict: "Always enforce Multi-Factor Authentication (MFA) and TPM-tethered computer certificates."
    },
    anti_replay: {
      key: "anti_replay",
      title: "4. Anti-Replay Protection",
      category: "Sequence Verification",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description: "Attaches a monotonically increasing 32-bit or 64-bit sequence number to every encapsulated packet.",
      ciphers: "IPsec ESP Sequence Numbers, WireGuard Counter Windows.",
      protection: "Maintains a sliding window on the receiver to instantly discard replayed or duplicate captured packets.",
      verdict: "Neutralizes replay attacks where adversaries attempt to re-send intercepted banking or login packets."
    }
  };

  // Studio 2: Live Injected Payloads
  const privatePayloads = {
    tax_records: {
      id: "tax_records",
      label: "Municipal Civic Tax Payment Records",
      innerSrc: "10.10.1.25",
      innerDst: "10.20.1.50 (Central DB)",
      protocol: "TCP/443",
      plaintext: "BARRACKPORE_TAX_PAYMENT_₹45,000_ACCT_99182"
    },
    scada_telemetry: {
      id: "scada_telemetry",
      label: "Water Purification SCADA Modbus Command",
      innerSrc: "10.10.5.12",
      innerDst: "10.30.1.100 (PLC Relay)",
      protocol: "TCP/502",
      plaintext: "MODBUS_CMD_VALVE_OPEN_PURIFICATION_PUMP_04"
    },
    admin_ssh: {
      id: "admin_ssh",
      label: "Datacenter Core Router Administration",
      innerSrc: "10.10.8.4",
      innerDst: "10.50.1.1 (Gateway Router)",
      protocol: "TCP/22",
      plaintext: "SSH_SESSION_CONFIG_INTERFACE_GIGABIT_0/0"
    }
  };

  // Studio 2: Encapsulation & Verification Logic
  const encapsulationResult = useMemo(() => {
    const payload = privatePayloads[selectedPayloadType];

    // Simulated ciphertext generation
    const mockCiphertext = selectedCipherSuite === "aes_256_gcm"
      ? "7F4A99B812C450E72B33880F1A29D4E67789AABBCCDDEEFF00112233"
      : "3B8C1109FA2E6D88AC991834FE7719B00288AA99BBCCDDEEFF123456";

    const mockAuthTag = simulateMitmTamper ? "CORRUPTED_TAG_0x00" : "8F2C11B04E99A1";

    if (simulateMitmTamper) {
      return {
        status: "TAMPERED",
        verdict: "❌ INTEGRITY ERROR: Auth Tag Mismatch! Packet Dropped by Gateway.",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        publicSrc: "203.0.113.88 (Client Public IP)",
        publicDst: "198.51.100.1 (VPN Gateway IP)",
        ciphertext: mockCiphertext,
        authTag: mockAuthTag,
        recoveredPayload: "[REJECTED - DATA TAMPERED IN TRANSIT]",
        explanation: "A simulated Man-in-the-Middle adversary flipped a bit in the encrypted stream. The gateway's HMAC verification failed and the malicious packet was instantly discarded!"
      };
    } else {
      return {
        status: "SECURE",
        verdict: "✔ VERIFIED: Encapsulated, Encrypted & Authenticated Successfully!",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        publicSrc: "203.0.113.88 (Client Public IP)",
        publicDst: "198.51.100.1 (VPN Gateway IP)",
        ciphertext: mockCiphertext,
        authTag: mockAuthTag,
        recoveredPayload: payload.plaintext,
        explanation: "The client private packet was wrapped in an outer public IP header, encrypted with AES-256-GCM, and safely recovered at the Salt Lake gateway."
      };
    }
  }, [selectedPayloadType, selectedCipherSuite, simulateMitmTamper]);

  // Studio 3: Performance Calculations
  const calculatedVpnMetrics = useMemo(() => {
    // Total aggregate VPN bandwidth (Gbps)
    const aggregateBandwidthMbps = remoteWorkersCount * userTrafficMbps;
    const aggregateBandwidthGbps = (aggregateBandwidthMbps / 1000).toFixed(2);

    // Packet overhead percentage on standard 1400-byte packets
    const overheadPercentage = ((vpnHeaderOverheadBytes / 1400) * 100).toFixed(1);
    const recommendedMssClamping = 1500 - 40 - vpnHeaderOverheadBytes; // 1500 - IP/TCP headers (40B) - VPN overhead

    // 5-Year High-Availability Enterprise VPN Concentrator TCO (INR ₹ Lakhs)
    const hardwareConcentratorLakhs = (Number(aggregateBandwidthGbps) * 4.5 + 8.0).toFixed(2);
    const clientLicensesLakhs = ((remoteWorkersCount * 1200 * 5) / 100000).toFixed(2); // ₹1,200/user/yr
    const fiveYearTcoLakhs = (Number(hardwareConcentratorLakhs) + Number(clientLicensesLakhs) + 5.0).toFixed(2);

    return {
      aggregateBandwidthGbps,
      overheadPercentage,
      recommendedMssClamping,
      fiveYearTcoLakhs
    };
  }, [remoteWorkersCount, userTrafficMbps, vpnHeaderOverheadBytes]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_egov_tunnel: {
      id: "barrackpore_egov_tunnel",
      title: "Barrackpore Municipal Remote Workforce Secure Data Tunneling",
      location: "Barrackpore Municipal Office to Salt Lake Sector V State Data Center",
      protocolStack: "WireGuard (ChaCha20-Poly1305) + Certificate TPM Machine Authentication",
      threatScenario: "An attacker on an untrusted public Wi-Fi hotspot in Barrackpore attempted ARP spoofing and packet sniffing against an accountant's laptop.",
      solution: "Sukanta Hui, Mamata, and Mahima configured an always-on WireGuard tunnel with full tunneling and MSS clamping set to 1360 bytes.",
      outcome: "The attacker captured only encrypted ciphertext; zero passwords or citizen tax files were compromised; 100% CERT-In audit compliance."
    },
    ichapur_branch_ipsec: {
      id: "ichapur_branch_ipsec",
      title: "Ichapur Ordnance & Municipal Substation Site-to-Site IPsec Mesh",
      location: "Ichapur Sub-Office to Barrackpore Central Command Hub",
      protocolStack: "Route-Based IPsec VTI (AES-256-GCM + IKEv2 / BGP Routing)",
      threatScenario: "Adversaries attempted to inject BGP route hijacks on the public ISP carrier to intercept SCADA telemetry.",
      solution: "Abhronila, Susmita, and Debangshu deployed hardware IPsec routers with AES-256-GCM and SHA-384 authentication over redundant fiber paths.",
      outcome: "Attempted route hijack failed due to cryptographic Security Association authentication; zero SCADA downtime; full DPDP Act compliance."
    }
  };

  const currentPillar = vpnPillars[selectedPillarKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 0</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Introduction to Virtual Private Networks (VPNs)
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the cryptographic foundations of enterprise secure connectivity. Explore <strong className="text-sky-400">Packet Encapsulation</strong>, authenticated <strong className="text-emerald-400">AES-256-GCM / WireGuard Ciphers</strong>, <strong className="text-purple-400">Remote Access vs Site-to-Site</strong> architectures, and <strong className="text-amber-400">CERT-In Compliance Directives</strong>.
          </p>
        </header>

        {/* SECTION 1: VPN TUNNEL & ENCAPSULATION SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The Cryptographic Tunnel &amp; Packet Encapsulation Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing how private enterprise packets are encrypted, wrapped in public carrier headers, and safely decapsulated at the corporate gateway.
            </p>
          </div>

          {/* SVG 1: VPN ENCAPSULATION & PACKET ANATOMY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Private IP Packet ➔ Encapsulated ESP Carrier Packet ➔ Corporate LAN
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Encapsulation &amp; Decapsulation</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgVpnTunnelId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="VPN Tunneling and Packet Encapsulation Architecture Diagram"
              >
                {/* LEFT: PRIVATE CLIENT PACKET */}
                <rect x="20" y="20" width="220" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="130" y="42" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  1. CLIENT PRIVATE PACKET
                </text>

                <rect x="35" y="60" width="190" height="45" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="130" y="78" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Inner Private IP Header
                </text>
                <text x="130" y="95" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Src: 10.10.1.5 ➔ Dst: 10.20.1.50
                </text>

                <rect x="35" y="115" width="190" height="85" rx="5" fill="#18181b" stroke="#64748b" />
                <text x="130" y="138" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Plaintext Payload
                </text>
                <text x="130" y="160" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  CONFIDENTIAL DATA
                </text>
                <text x="130" y="180" fill="#fde68a" fontSize="7" textAnchor="middle">
                  Tax / SCADA Records
                </text>

                <text x="130" y="235" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Created on Remote Laptop
                </text>

                {/* MIDDLE: ENCAPSULATED TUNNEL OVER INTERNET */}
                <path d="M 240 140 L 270 140" stroke="#38bdf8" strokeWidth="2" />

                <rect x="270" y="20" width="310" height="240" rx="8" fill="#030712" stroke="#6366f1" strokeWidth="1.5" />
                <text x="425" y="42" fill="#c7d2fe" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  2. ENCAPSULATED VPN PACKET
                </text>

                {/* OUTER PUBLIC IP */}
                <rect x="285" y="55" width="280" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                <text x="425" y="72" fill="#c7d2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Outer Public IP Header (Routable on Internet)
                </text>
                <text x="425" y="87" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Src: 203.0.113.88 (Client ISP) ➔ Dst: 198.51.100.1 (HQ Gateway)
                </text>

                {/* IPSEC ESP SECURITY HEADER */}
                <rect x="285" y="100" width="280" height="30" rx="4" fill="#450a0a" stroke="#ef4444" />
                <text x="425" y="118" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  IPsec ESP Header • SPI: 0x100A • Sequence: #42
                </text>

                {/* ENCRYPTED CIPHERTEXT BOX */}
                <rect x="285" y="135" width="280" height="75" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="425" y="153" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  ENCRYPTED PAYLOAD (AES-256-GCM)
                </text>
                <text x="425" y="170" fill="#ffffff" fontSize="6.5" textAnchor="middle">
                  Ciphertext: 7F4A99B812C450E72B33880F...
                </text>
                <text x="425" y="185" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">
                  [Inner Header 10.10.1.5 + Data Payload Encrypted]
                </text>
                <text x="425" y="200" fill="#fde68a" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                  Auth Tag: 8F2C11B04E99A1 (HMAC)
                </text>

                <text x="425" y="240" fill="#6366f1" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Traverses Public Internet Safely
                </text>

                {/* RIGHT: DECAPSULATED AT GATEWAY */}
                <path d="M 580 140 L 610 140" stroke="#10b981" strokeWidth="2" />

                <rect x="610" y="20" width="220" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="720" y="42" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  3. DECAPSULATED AT HQ
                </text>

                <rect x="625" y="60" width="190" height="75" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="720" y="80" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Verified &amp; Decrypted
                </text>
                <text x="720" y="98" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Public Header Stripped
                </text>
                <text x="720" y="115" fill="#a7f3d0" fontSize="7" textAnchor="middle">
                  HMAC Auth Tag Validated
                </text>

                <rect x="625" y="145" width="190" height="85" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="720" y="165" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Delivered to Corporate LAN
                </text>
                <text x="720" y="185" fill="#ffffff" fontSize="7" textAnchor="middle">
                  To: 10.20.1.50 (Server)
                </text>
                <text x="720" y="205" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">
                  Zero Tampering / Leakage
                </text>

                <text x="720" y="245" fill="#10b981" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Intranet Server Receives Packet
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: VPN PILLARS MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Core Cryptographic Pillars of VPN Architecture
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms behind Confidentiality, Data Integrity, Identity Authentication, and Anti-Replay Protection.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentPillar.badgeColor)}>
              {currentPillar.category}
            </span>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(vpnPillars).map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedPillarKey(p.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedPillarKey === p.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentPillar.title}</h3>
                <span className="text-gray-400">Category: {currentPillar.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentPillar.badgeColor)}>
                Active Pillar
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Cryptographic Mechanism:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentPillar.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  🛡️ Threat Protection:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentPillar.protection}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-indigo-950/80 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  📜 Standard Algorithms:
                </span>
                <p className="text-indigo-200 font-mono text-xs">{currentPillar.ciphers}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentPillar.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE ENCAPSULATION & PACKET INSPECTOR SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live VPN Encapsulation &amp; Packet Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Encapsulate private payloads, encrypt with AES-GCM / ChaCha20, and test Man-in-the-Middle tampering detection at the gateway.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Packet Inspector Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Private Data Payload:</label>
              <select
                value={selectedPayloadType}
                onChange={(e) => setSelectedPayloadType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(privatePayloads).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Cryptographic Cipher Suite:</label>
              <select
                value={selectedCipherSuite}
                onChange={(e) => setSelectedCipherSuite(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="aes_256_gcm">AES-256-GCM + SHA-384 (IPsec ESP)</option>
                <option value="chacha20_poly1305">ChaCha20-Poly1305 (WireGuard)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Simulate In-Transit MitM Tamper:</label>
              <button
                onClick={() => setSimulateMitmTamper(!simulateMitmTamper)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  simulateMitmTamper
                    ? "bg-rose-950/80 text-rose-300 border-rose-800"
                    : "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                )}
              >
                {simulateMitmTamper ? "🚨 MitM Injected (Tampered)" : "✔ Clean In-Transit Packet"}
              </button>
            </div>
          </div>

          {/* Encapsulation Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Encapsulated Packet State:
                </span>
                <span className="text-white font-bold text-sm">{privatePayloads[selectedPayloadType].label}</span>
                <div className="font-mono text-gray-400 text-[11px] truncate max-w-md">
                  Inner: {privatePayloads[selectedPayloadType].innerSrc} ➔ {privatePayloads[selectedPayloadType].innerDst} ({privatePayloads[selectedPayloadType].protocol})
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                encapsulationResult.badgeColor
              )}>
                {encapsulationResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-mono">
                <span className="text-sky-400 font-bold text-[11px] block">Outer Public IP Carrier Header:</span>
                <div className="text-gray-300 text-xs">Src: {encapsulationResult.publicSrc}</div>
                <div className="text-gray-300 text-xs">Dst: {encapsulationResult.publicDst}</div>
                <div className="text-[10px] text-gray-500">Protocol: UDP Port 4500 / 51820</div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-mono">
                <span className="text-purple-300 font-bold text-[11px] block">ESP Ciphertext &amp; HMAC Tag:</span>
                <div className="text-gray-300 text-xs truncate">Hex: {encapsulationResult.ciphertext}</div>
                <div className="text-amber-400 text-xs">Auth Tag: {encapsulationResult.authTag}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                Recovered Plaintext at Gateway:
              </span>
              <div className="font-mono text-xs text-white bg-slate-950 p-2 rounded border border-slate-800">
                {encapsulationResult.recoveredPayload}
              </div>
              <p className="text-gray-400 text-[11px] pt-1">{encapsulationResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: VPN TUNNEL CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: VPN Tunneling &amp; Encapsulation Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation serializing inner private packets, encrypting with AES-GCM simulation, appending HMAC authentication tags, and decapsulating at the gateway.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              vpn_tunnel_sim.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="vpn_tunnel_sim.py"
            highlightLines={[25, 40, 52, 65]}
          />
        </section>

        {/* STUDIO 3: VPN OVERHEAD & CAPACITY CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: VPN Overhead, MTU/MSS Clamping &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate total gateway throughput (Gbps), packet encapsulation overhead, optimal MSS clamping, and 5-year enterprise concentrator TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Capacity Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Remote Workers Count:</span>
                <span className="text-sky-400 font-bold">{remoteWorkersCount} Users</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={remoteWorkersCount}
                onChange={(e) => setRemoteWorkersCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Traffic per User:</span>
                <span className="text-purple-400 font-bold">{userTrafficMbps} Mbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={userTrafficMbps}
                onChange={(e) => setUserTrafficMbps(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>VPN Header Overhead:</span>
                <span className="text-emerald-400 font-bold">{vpnHeaderOverheadBytes} Bytes</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="10"
                value={vpnHeaderOverheadBytes}
                onChange={(e) => setVpnHeaderOverheadBytes(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">IPsec ESP / WireGuard / TLS</span>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Gateway Throughput</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedVpnMetrics.aggregateBandwidthGbps} Gbps</div>
              <span className="text-[10px] text-gray-500 block">Overhead: ~{calculatedVpnMetrics.overheadPercentage}% bandwidth</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Optimal MSS Clamping</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedVpnMetrics.recommendedMssClamping} Bytes</div>
              <span className="text-[10px] text-gray-500 block">Prevents packet fragmentation</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year VPN TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedVpnMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Hardware Concentrator + Licenses</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL SOC TABLETOP DRILL */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative regional response scenarios authored by Sukanta Hui and the student cyber engineering team.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              WB Defense Lab
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(regionalDrills).map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrillId(d.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeDrillId === d.id
                    ? "bg-sky-600/20 text-sky-300 border-sky-500/60"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Protocol: {currentDrill.protocolStack}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                CERT-In Compliant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical VPN Execution:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>A VPN provides Confidentiality, Integrity, and Authentication over untrusted public networks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Encapsulation wraps private IP packets inside routable public IP headers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Remote Access VPN connects individual users to a gateway; Site-to-Site connects entire branch subnets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Modern VPN ciphers include AES-256-GCM, AES-256-CBC with HMAC-SHA-256, and ChaCha20-Poly1305.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>VPNs introduce packet overhead (20 to 80 bytes), requiring MSS/MTU clamping to prevent fragmentation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all VPN authentication logs, connection timestamps, and assigned IPs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Introduction to Virtual Private Networks (VPNs) FAQs"
            subtitle="30 In-depth Practice Questions &amp; VPN Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Virtual Private Networks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 005_003: Virtual Private Networks (VPNs) & Tunneling! In Topic 0, we established the foundational cryptographic triad of VPN engineering: Confidentiality (AES-256-GCM / ChaCha20), Integrity (HMAC-SHA-256 / Poly1305), and Authentication (X.509 PKI / MFA). Understand that tunneling is fundamentally about encapsulation: taking a private, non-routable IP packet, encrypting it, and wrapping it in a public carrier IP header. Remember to always configure MSS clamping to prevent TCP fragmentation caused by the 20–80 byte VPN header overhead! In Topic 1, we will explore The Need for Secure Remote Access and Site-to-Site Connectivity!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic0;
