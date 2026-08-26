import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import ahVsEspDissectorPy from "./topic6_files/ah_vs_esp_dissector.py?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgDissectorId = useId();
  const svgNatSimulatorId = useId();

  // =========================================================================
  // STUDIO 1 STATE: WIRE HEADER DISSECTOR & CRYPTOGRAPHIC SCOPE
  // =========================================================================
  const [activeHeaderMode, setActiveHeaderMode] = useState("esp_tunnel"); // "ah_transport", "ah_tunnel", "esp_transport", "esp_tunnel", "nested_bundle"

  const headerDissectorModes = {
    ah_transport: {
      name: "AH Transport Mode (RFC 4302)",
      protoNumber: "51 (AH)",
      encryptionStatus: "❌ NONE (Payload in Cleartext)",
      integrityScope: "Immutable IP Header + AH Header + TCP Segment",
      overheadBytes: 24,
      natFriendly: "❌ INCOMPATIBLE (Breaks on NAT)",
      useCase: "Host-to-host integrity where encryption is prohibited by law",
      fields: [
        { label: "Original IP Header", bytes: "20B", type: "auth_partial", desc: "Immutable fields authenticated (TTL, TOS zeroed)" },
        { label: "AH Header", bytes: "8B", type: "auth", desc: "NextHdr (6), PayloadLen (4), SPI (4B), Seq (4B)" },
        { label: "AH ICV Tag", bytes: "16B", type: "auth_tag", desc: "HMAC-SHA256 Signature (Authenticates entire packet)" },
        { label: "TCP Header & Payload", bytes: "1400B", type: "plaintext_auth", desc: "Plaintext on wire! (Eavesdropper can read data)" }
      ]
    },
    ah_tunnel: {
      name: "AH Tunnel Mode (RFC 4302)",
      protoNumber: "51 (AH)",
      encryptionStatus: "❌ NONE (Entire Inner Packet Cleartext)",
      integrityScope: "Outer IP Header + AH Header + Inner IP + Payload",
      overheadBytes: 44,
      natFriendly: "❌ INCOMPATIBLE (Outer IP rewrite breaks ICV)",
      useCase: "Gateway-to-gateway subnet authentication (Deprecated)",
      fields: [
        { label: "New Outer IP Header", bytes: "20B", type: "auth_partial", desc: "Gateway IP addresses (Immutable fields authenticated)" },
        { label: "AH Header & ICV", bytes: "24B", type: "auth", desc: "NextHdr (4 for IPv4), SPI, Seq, HMAC-SHA256 Tag" },
        { label: "Original Inner IP", bytes: "20B", type: "plaintext_auth", desc: "Cleartext internal IP addresses (Visible to ISPs!)" },
        { label: "TCP Payload", bytes: "1380B", type: "plaintext_auth", desc: "Plaintext payload on wire (No confidentiality)" }
      ]
    },
    esp_transport: {
      name: "ESP Transport Mode (RFC 4303)",
      protoNumber: "50 (ESP)",
      encryptionStatus: "✔ FULL (Payload & Trailer Encrypted)",
      integrityScope: "ESP Header + Ciphertext + ESP Trailer",
      overheadBytes: 40,
      natFriendly: "✔ COMPATIBLE (via NAT-T UDP 4500)",
      useCase: "Host-to-host secure database & cluster communication",
      fields: [
        { label: "Original IP Header", bytes: "20B", type: "plaintext_unauth", desc: "Proto=50. Host IP addresses visible on LAN" },
        { label: "ESP Header", bytes: "16B", type: "auth_header", desc: "SPI (4B) + Seq (4B) + IV (8B) [Plaintext for O(1) SAD lookup]" },
        { label: "🔒 Encrypted TCP Segment", bytes: "1400B", type: "encrypted", desc: "AES-256-GCM Ciphertext (TCP ports & data hidden)" },
        { label: "🔒 Encrypted ESP Trailer", bytes: "4B", type: "encrypted", desc: "Padding + PadLen (1B) + NextHdr=6 (1B)" },
        { label: "ESP ICV Auth Tag", bytes: "16B", type: "auth_tag", desc: "GMAC-128 Tag (Verifies ESP Header + Ciphertext)" }
      ]
    },
    esp_tunnel: {
      name: "ESP Tunnel Mode (RFC 4303 - Modern Standard)",
      protoNumber: "50 (ESP)",
      encryptionStatus: "✔ COMPLETE (Inner IP & Payload Encrypted)",
      integrityScope: "ESP Header + Encrypted Inner Packet + ESP Trailer",
      overheadBytes: 60,
      natFriendly: "✔ 100% COMPATIBLE (NAT-T UDP 4500 Standard)",
      useCase: "Site-to-site VPNs, Remote worker tunnels, Zero Trust WANs",
      fields: [
        { label: "New Outer IP Header", bytes: "20B", type: "plaintext_unauth", desc: "Public Gateway IPs (Proto=50 or UDP 4500)" },
        { label: "ESP Header", bytes: "16B", type: "auth_header", desc: "SPI (4B) + Seq (4B) + IV (8B)" },
        { label: "🔒 Encrypted Inner IP Header", bytes: "20B", type: "encrypted", desc: "Internal subnets (10.14.0.0/16) 100% hidden!" },
        { label: "🔒 Encrypted TCP Payload", bytes: "1360B", type: "encrypted", desc: "AES-256-GCM Military Grade Data Encryption" },
        { label: "🔒 Encrypted ESP Trailer", bytes: "4B", type: "encrypted", desc: "Padding + PadLen + NextHdr=4 (IPv4)" },
        { label: "ESP ICV Auth Tag", bytes: "16B", type: "auth_tag", desc: "GMAC-128 Tag (Guarantees zero tampering)" }
      ]
    },
    nested_bundle: {
      name: "Nested AH + ESP Bundle (Historic RFC 2401)",
      protoNumber: "51 (AH) outer, 50 (ESP) inner",
      encryptionStatus: "✔ FULL (ESP Encrypted + AH Outer Auth)",
      integrityScope: "Entire Packet Authenticated by AH",
      overheadBytes: 84,
      natFriendly: "❌ INCOMPATIBLE (AH outer wrapper breaks NAT)",
      useCase: "Legacy military installations requiring outer IP authentication (Deprecated)",
      fields: [
        { label: "Outer IP Header", bytes: "20B", type: "auth_partial", desc: "Proto=51 (AH). Authenticated by outer AH tag" },
        { label: "Outer AH Header & ICV", bytes: "24B", type: "auth", desc: "NextHdr=50 (ESP). AH HMAC over outer IP + ESP" },
        { label: "Inner ESP Header", bytes: "16B", type: "auth_header", desc: "SPI + Seq + IV" },
        { label: "🔒 Encrypted Payload", bytes: "1340B", type: "encrypted", desc: "ESP Ciphertext Payload" },
        { label: "🔒 Encrypted ESP Trailer", bytes: "4B", type: "encrypted", desc: "ESP Padding + NextHdr" },
        { label: "Inner ESP ICV Tag", bytes: "16B", type: "auth_tag", desc: "Inner ESP Auth Tag" }
      ]
    }
  };

  const currentHeader = headerDissectorModes[activeHeaderMode];

  // =========================================================================
  // STUDIO 2 STATE: NAT INCOMPATIBILITY & CHECKSUM BREAKDOWN SANDBOX
  // =========================================================================
  const [natProtocolChoice, setNatProtocolChoice] = useState("ah"); // "ah", "esp_natt"
  const [privateSenderIp, setPrivateSenderIp] = useState("10.14.2.15");
  const [natPublicIp, setNatPublicIp] = useState("203.0.113.10");

  const natSimulationResult = useMemo(() => {
    if (natProtocolChoice === "ah") {
      return {
        protocolName: "Authentication Header (AH - Protocol 51)",
        senderIcvCalculation: `HMAC-SHA256(Key, Src=${privateSenderIp}, Dst=198.51.100.20, Payload) = 0x88AF1901B3C4`,
        natAction: `NAT Router translates Source IP: ${privateSenderIp} ➔ ${natPublicIp}`,
        receiverIcvCalculation: `HMAC-SHA256(Key, Src=${natPublicIp}, Dst=198.51.100.20, Payload) = 0x4A1F89BC99E1`,
        verdict: "❌ CHECKSUM MISMATCH! Receiver computed 0x4A1F89BC, expected 0x88AF1901.",
        kernelAction: "KERNEL DROPS PACKET (XFRM_IN_HDR_ERROR). Connection completely dead.",
        isPass: false,
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
      };
    } else {
      return {
        protocolName: "ESP with NAT-Traversal (ESP / UDP 4500)",
        senderIcvCalculation: `GMAC(Key, AAD=[SPI, Seq], Ciphertext) = 0x9923BCFE110A`,
        natAction: `NAT Router translates Outer IP & UDP Port: ${privateSenderIp}:4500 ➔ ${natPublicIp}:61240`,
        receiverIcvCalculation: `GMAC(Key, AAD=[SPI, Seq], Ciphertext) = 0x9923BCFE110A`,
        verdict: "✔ CHECKSUM VALID! ICV matches because ESP does NOT authenticate outer IP.",
        kernelAction: "KERNEL ACCEPTS & DECRYPTS. Connection functions seamlessly across NAT/PAT.",
        isPass: true,
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
      };
    }
  }, [natProtocolChoice, privateSenderIp, natPublicIp]);

  // =========================================================================
  // STUDIO 3 STATE: CRYPTOGRAPHIC PIPELINE & BENCHMARK STUDIO
  // =========================================================================
  const [simulatedLinkSpeedGbps, setSimulatedLinkSpeedGbps] = useState(10);
  const [simulatedPacketSize, setSimulatedPacketSize] = useState(1400);

  const performanceMetrics = useMemo(() => {
    const pps = (simulatedLinkSpeedGbps * 1e9) / (simulatedPacketSize * 8);

    return {
      ppsFormatted: (pps / 1e6).toFixed(2) + " Mpps",
      aead: {
        cipher: "AES-256-GCM (RFC 4106 AEAD)",
        passes: 1,
        cyclesPerByte: 0.65, // Intel AES-NI + PCLMULQDQ
        cpuUtilization: Math.min(100, Math.round((pps * simulatedPacketSize * 0.65) / 3.5e7)),
        throughput: `${simulatedLinkSpeedGbps} Gbps (Line Rate)`,
        vulnerability: "Zero padding oracle risk (Tag verified before plaintext output)"
      },
      legacy: {
        cipher: "AES-CBC-256 + HMAC-SHA256",
        passes: 2,
        cyclesPerByte: 2.8, // 2 passes without combined pipeline
        cpuUtilization: Math.min(100, Math.round((pps * simulatedPacketSize * 2.8) / 3.5e7)),
        throughput: `${Math.min(simulatedLinkSpeedGbps, 3.4)} Gbps`,
        vulnerability: "Vulnerable to padding oracle attacks if MAC verification is non-constant time"
      },
      ahOnly: {
        cipher: "HMAC-SHA256 (AH - No Encryption)",
        passes: 1,
        cyclesPerByte: 1.2,
        cpuUtilization: Math.min(100, Math.round((pps * simulatedPacketSize * 1.2) / 3.5e7)),
        throughput: `${simulatedLinkSpeedGbps} Gbps`,
        vulnerability: "ZERO CONFIDENTIALITY! All financial and database payloads exposed on wire"
      }
    };
  }, [simulatedLinkSpeedGbps, simulatedPacketSize]);

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_ah_migration");

  const regionalDrills = {
    barrackpore_ah_migration: {
      id: "barrackpore_ah_migration",
      title: "Barrackpore Treasury: Legacy AH to Modern ESP-AEAD Migration",
      location: "Connecting Barrackpore Municipal Treasury Hub to North 24 Parganas Revenue Core",
      engineers: "Susmita (SecOps Lead) & Mamata (Network Architect)",
      threatScenario:
        "Auditors identified that legacy AH Protocol 51 was transmitting inter-branch citizen tax and land mutation queries in cleartext. Dark fiber eavesdroppers could view taxpayer bank balances.",
      solution:
        "Sukanta Hui migrated all IPsec SAs from AH to ESP AES-256-GCM (RFC 4106) with ESN 64-bit sequence counters and TCP MSS clamped to 1360 bytes.",
      outcome:
        "100% confidential transmission of ₹50,00,000 daily transaction batches; router CPU dropped by 42% due to AES-NI hardware offloading."
    },
    ichapur_radar_chacha: {
      id: "ichapur_radar_chacha",
      title: "Ichapur Defense Facility: ChaCha20-Poly1305 on Constrained Hardware",
      location: "Distributed telemetry link across low-power ARM edge gateways in Ichapur Defense Corridor",
      engineers: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Edge telemetry routers lacked dedicated hardware AES-NI instructions. Standard AES-CBC encryption overloaded router CPUs to 98%, causing packet loss.",
      solution:
        "Configured ESP with ChaCha20-Poly1305 (RFC 7634). ChaCha20 runs in constant time on general-purpose ARM registers without requiring special hardware crypto accelerators.",
      outcome:
        "Achieved 950 Mbps wire speed with CPU utilization under 18%; immune to cache-timing attacks."
    },
    kolkata_iot_natt: {
      id: "kolkata_iot_natt",
      title: "Kolkata Smart City IoT Grid: Multi-Tier CGNAT Traversal",
      location: "5,000 traffic monitoring sensors in Salt Lake Sector V routed across telecom Carrier-Grade NAT",
      engineers: "Sukanta Hui (Lead Instructor) & Research Scholars",
      threatScenario:
        "Telecom ISPs deployed symmetric Carrier-Grade NAT (CGNAT), blocking raw ESP Protocol 50 packets due to missing Layer 4 port numbers.",
      solution:
        "Enforced strongSwan `forceencaps = yes` on IoT concentrators, encapsulating all ESP packets inside UDP Port 4500 datagrams.",
      outcome:
        "100% stable tunnel persistence across multi-tiered telecom NATs; zero packet corruption or session drops."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_004 • Topic 6</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            IPsec Protocols: Authentication Header (AH) vs ESP
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Deep-dive forensic dissection of IPsec data-plane protocols: RFC 4302 (AH - Protocol 51) vs RFC 4303 (ESP - Protocol 50),
            mutable field zeroing, NAT-T UDP 4500 mechanics, and AEAD hardware acceleration.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Protocol 51 (AH) vs Protocol 50 (ESP)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Mutable vs Immutable IPv4 Fields
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Why AH Fails Across NAT
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              AEAD AES-GCM vs Legacy 2-Pass
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              RFC 8221 Deprecation Standards
            </span>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SCOPED INLINE KEYFRAME ANIMATIONS */}
        {/* ========================================================================= */}
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL COMPARISON */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              ⚖️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. Architectural Comparison: AH (RFC 4302) vs ESP (RFC 4303)
              </h2>
              <p className="text-sm text-slate-400">
                Understanding why Encapsulating Security Payload (ESP) has completely superseded Authentication Header (AH) in modern security architectures
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In enterprise cybersecurity across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, choosing the correct IPsec data-plane protocol dictates both security posture
              and network routing viability. While <strong className="text-white">AH (Protocol 51)</strong> provides authentication without confidentiality,{" "}
              <strong className="text-white">ESP (Protocol 50)</strong> provides full symmetric encryption, authentication, and NAT-traversal compatibility.
            </p>

            {/* Comparison Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden font-mono">
                <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider border-b border-slate-800 font-sans">
                  <tr>
                    <th className="p-3">Security Service</th>
                    <th className="p-3 text-cyan-400">Authentication Header (AH - Proto 51)</th>
                    <th className="p-3 text-emerald-400">Encapsulating Security Payload (ESP - Proto 50)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50">
                    <td className="p-3 font-semibold font-sans">Data Confidentiality (Encryption)</td>
                    <td className="p-3 text-rose-400 font-bold">❌ NO (Cleartext Payload on Wire)</td>
                    <td className="p-3 text-emerald-400 font-bold">✔ YES (AES-256-GCM / ChaCha20-Poly1305)</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50">
                    <td className="p-3 font-semibold font-sans">Data Integrity &amp; Origin Authentication</td>
                    <td className="p-3 text-emerald-400">✔ YES (Whole Packet HMAC-SHA256)</td>
                    <td className="p-3 text-emerald-400">✔ YES (ESP Payload + Trailer GMAC Tag)</td>
                  </tr>
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50">
                    <td className="p-3 font-semibold font-sans">Anti-Replay Protection</td>
                    <td className="p-3 text-emerald-400">✔ YES (32-bit / 64-bit Sequence Window)</td>
                    <td className="p-3 text-emerald-400">✔ YES (32-bit / 64-bit Sequence Window)</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50">
                    <td className="p-3 font-semibold font-sans">Outer IP Header Integrity</td>
                    <td className="p-3 text-emerald-400">✔ YES (Immutable fields signed)</td>
                    <td className="p-3 text-slate-400">❌ NO (Enables NAT traversal!)</td>
                  </tr>
                  <tr className="bg-slate-900/50 hover:bg-slate-800/50">
                    <td className="p-3 font-semibold font-sans">NAT / PAT Router Compatibility</td>
                    <td className="p-3 text-rose-400 font-bold">❌ FAILS COMPLETELY (ICV Mismatch)</td>
                    <td className="p-3 text-emerald-400 font-bold">✔ 100% COMPATIBLE (NAT-T UDP 4500)</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50">
                    <td className="p-3 font-semibold font-sans">IETF Status (RFC 8221)</td>
                    <td className="p-3 text-amber-400">⚠️ HISTORIC / DEPRECATED</td>
                    <td className="p-3 text-emerald-400">🌟 MANDATORY PRODUCTION STANDARD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: WIRE HEADER DISSECTOR & CRYPTOGRAPHIC SCOPE INSPECTOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🔬
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Wire Packet Dissector &amp; Cryptographic Scope Inspector
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect the physical wire anatomy of AH vs ESP packets, identifying encrypted blocks, authentication scopes, and mutable fields
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
              Protocol: {currentHeader.protoNumber}
            </span>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {Object.entries(headerDissectorModes).map(([key, item]) => {
              const isActive = activeHeaderMode === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveHeaderMode(key)}
                  className={clsx(
                    "text-left p-3 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{item.name.split(" (")[0]}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">+{item.overheadBytes}B Overhead</span>
                </button>
              );
            })}
          </div>

          {/* Wire Anatomy Graphic Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3">
              <div>
                <strong>Active Mode:</strong> <span className="text-cyan-300 font-bold">{currentHeader.name}</span>
                <span className="ml-3 text-slate-500">| Purpose: {currentHeader.useCase}</span>
              </div>
              <div className="font-mono text-xs">
                Encryption: <strong className={clsx(currentHeader.encryptionStatus.startsWith("✔") ? "text-emerald-400" : "text-rose-400")}>
                  {currentHeader.encryptionStatus}
                </strong>
              </div>
            </div>

            {/* Wire Block Breakdown */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Physical Packet Layout on Network Wire:
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {currentHeader.fields.map((field, idx) => {
                  let fieldColor = "bg-slate-900 border-slate-700 text-slate-300";
                  if (field.type === "encrypted") {
                    fieldColor = "bg-emerald-950 border-emerald-600 text-emerald-300 shadow-md shadow-emerald-950/40";
                  } else if (field.type === "auth_tag") {
                    fieldColor = "bg-rose-950 border-rose-600 text-rose-300";
                  } else if (field.type === "auth_header" || field.type === "auth") {
                    fieldColor = "bg-cyan-950 border-cyan-600 text-cyan-300";
                  } else if (field.type === "auth_partial") {
                    fieldColor = "bg-blue-950 border-blue-600 text-blue-300";
                  } else if (field.type === "plaintext_auth") {
                    fieldColor = "bg-amber-950/60 border-amber-600 text-amber-300";
                  }

                  return (
                    <div
                      key={idx}
                      className={clsx("p-3 rounded-lg border flex-1 min-w-[150px] text-center space-y-1", fieldColor)}
                    >
                      <div className="font-bold text-[11px]">{field.label}</div>
                      <div className="text-[10px] opacity-80">{field.bytes}</div>
                      <div className="text-[9px] font-sans opacity-90">{field.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Field Legend & Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Integrity Scope (ICV):</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{currentHeader.integrityScope}</p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">NAT Traversal Viability:</span>
                <p className="text-[11px] font-bold">{currentHeader.natFriendly}</p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Overhead &amp; MSS Clamping:</span>
                <p className="text-cyan-300 text-[11px] font-mono">
                  Overhead: +{currentHeader.overheadBytes}B ➔ Max Safe MSS: {1500 - currentHeader.overheadBytes - 40}B
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: NAT INCOMPATIBILITY & CHECKSUM BREAKDOWN SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🌐
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: NAT Incompatibility &amp; Checksum Failure Sandbox
                </h2>
                <p className="text-sm text-slate-400">
                  Step-by-step simulator demonstrating why AH breaks on NAT routers while ESP with NAT-T (UDP 4500) traverses cleanly
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setNatProtocolChoice("ah")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  natProtocolChoice === "ah"
                    ? "bg-rose-950 border-rose-600 text-rose-300 shadow-md shadow-rose-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                Test AH (Protocol 51)
              </button>
              <button
                onClick={() => setNatProtocolChoice("esp_natt")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  natProtocolChoice === "esp_natt"
                    ? "bg-emerald-950 border-emerald-600 text-emerald-300 shadow-md shadow-emerald-950/50"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                Test ESP NAT-T (UDP 4500)
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {/* 3-Stage NAT Step Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              {/* Stage 1: Sender */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-cyan-400 font-bold font-sans flex items-center justify-between">
                  <span>1. Sender (Private Subnet)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Barrackpore</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div>Src IP: <span className="text-cyan-300">{privateSenderIp}</span></div>
                  <div>Dst IP: <span className="text-slate-400">198.51.100.20</span></div>
                  <div>Proto : <span className="text-amber-400">{natProtocolChoice === "ah" ? "51 (AH)" : "17 (UDP 4500)"}</span></div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400">
                  {natSimulationResult.senderIcvCalculation}
                </div>
              </div>

              {/* Stage 2: NAT Router Translation */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold font-sans flex items-center justify-between">
                  <span>2. ISP / NAT Gateway</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Translation</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div>Translates Src: <span className="text-rose-400">{privateSenderIp}</span> ➔ <span className="text-emerald-400">{natPublicIp}</span></div>
                  <div>Rewrites IPv4 Header Checksum &amp; IP Bytes</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-amber-300">
                  {natSimulationResult.natAction}
                </div>
              </div>

              {/* Stage 3: Receiver Verification */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-indigo-400 font-bold font-sans flex items-center justify-between">
                  <span>3. Receiver Gateway</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Kolkata Core</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div>Arriving Src IP: <span className="text-emerald-300">{natPublicIp}</span></div>
                  <div>Kernel XFRM Recomputes ICV Checksum</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400">
                  {natSimulationResult.receiverIcvCalculation}
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", natSimulationResult.badgeColor)}>
              <div className="font-bold flex items-center gap-2">
                <span>{natSimulationResult.isPass ? "✔" : "❌"}</span>
                <span>{natSimulationResult.verdict}</span>
              </div>
              <p className="opacity-90 font-mono text-[11px]">
                <strong>Kernel Action:</strong> {natSimulationResult.kernelAction}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: CRYPTOGRAPHIC PIPELINE & BENCHMARK STUDIO */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚡
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: AEAD vs Legacy 2-Pass Cryptographic Benchmark
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate CPU cycle overhead and line-rate throughput across Combined AEAD (AES-GCM), Legacy CBC, and AH
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Packet Rate: <strong className="text-cyan-300">{performanceMetrics.ppsFormatted}</strong>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {/* Speed & Packet Size Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Simulated Link Saturation:</span>
                  <span className="text-cyan-400 font-mono">{simulatedLinkSpeedGbps} Gbps</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={simulatedLinkSpeedGbps}
                  onChange={(e) => setSimulatedLinkSpeedGbps(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Average Packet Size (Bytes):</span>
                  <span className="text-emerald-400 font-mono">{simulatedPacketSize} Bytes</span>
                </div>
                <input
                  type="range"
                  min="128"
                  max="1500"
                  step="64"
                  value={simulatedPacketSize}
                  onChange={(e) => setSimulatedPacketSize(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Benchmark Comparative Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Card 1: AEAD AES-GCM */}
              <div className="bg-slate-900 p-4 rounded-xl border border-emerald-800/80 space-y-3 shadow-lg shadow-emerald-950/20">
                <div className="font-bold text-emerald-400 flex items-center justify-between font-sans">
                  <span>1. Combined AEAD (AES-GCM)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">Recommended</span>
                </div>
                <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <div>Passes per Packet : <span className="text-white font-bold">1 Pass</span></div>
                  <div>CPU Clock Cycles  : <span className="text-emerald-300 font-bold">{performanceMetrics.aead.cyclesPerByte} cycles/byte</span></div>
                  <div>Max Throughput    : <span className="text-emerald-400 font-bold">{performanceMetrics.aead.throughput}</span></div>
                  <div>Simulated CPU Load: <span className="text-white font-bold">{performanceMetrics.aead.cpuUtilization}%</span></div>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${performanceMetrics.aead.cpuUtilization}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 font-sans">{performanceMetrics.aead.vulnerability}</p>
              </div>

              {/* Card 2: Legacy Two-Pass */}
              <div className="bg-slate-900 p-4 rounded-xl border border-amber-800/80 space-y-3 shadow-lg shadow-amber-950/20">
                <div className="font-bold text-amber-400 flex items-center justify-between font-sans">
                  <span>2. Legacy 2-Pass (CBC+HMAC)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">Legacy</span>
                </div>
                <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <div>Passes per Packet : <span className="text-amber-400 font-bold">2 Passes (Slow)</span></div>
                  <div>CPU Clock Cycles  : <span className="text-amber-300 font-bold">{performanceMetrics.legacy.cyclesPerByte} cycles/byte</span></div>
                  <div>Max Throughput    : <span className="text-amber-400 font-bold">{performanceMetrics.legacy.throughput}</span></div>
                  <div>Simulated CPU Load: <span className="text-rose-400 font-bold">{performanceMetrics.legacy.cpuUtilization}%</span></div>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${performanceMetrics.legacy.cpuUtilization}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 font-sans">{performanceMetrics.legacy.vulnerability}</p>
              </div>

              {/* Card 3: AH-Only */}
              <div className="bg-slate-900 p-4 rounded-xl border border-rose-800/80 space-y-3 shadow-lg shadow-rose-950/20">
                <div className="font-bold text-rose-400 flex items-center justify-between font-sans">
                  <span>3. AH-Only (No Encryption)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700">Deprecated</span>
                </div>
                <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                  <div>Passes per Packet : <span className="text-white font-bold">1 Pass (Hash only)</span></div>
                  <div>CPU Clock Cycles  : <span className="text-slate-300 font-bold">{performanceMetrics.ahOnly.cyclesPerByte} cycles/byte</span></div>
                  <div>Max Throughput    : <span className="text-white font-bold">{performanceMetrics.ahOnly.throughput}</span></div>
                  <div>Simulated CPU Load: <span className="text-white font-bold">{performanceMetrics.ahOnly.cpuUtilization}%</span></div>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${performanceMetrics.ahOnly.cpuUtilization}%` }} />
                </div>
                <p className="text-[10px] text-rose-300 font-sans">{performanceMetrics.ahOnly.vulnerability}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & LINUX TERMINAL AUDITING SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; Wire Inspection Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world IPsec migrations in West Bengal public and defense infrastructure
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Forensic Lab
            </span>
          </div>

          {/* Drill Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(regionalDrills).map(([key, drill]) => {
              const isActive = activeDrillKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-2",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold">{drill.title}</span>
                  <span className="text-[10px] text-cyan-400">{drill.engineers}</span>
                </button>
              );
            })}
          </div>

          {/* Active Case Study Details Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">{currentDrill.title}</h3>
                <p className="text-xs text-slate-400">Location: {currentDrill.location}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono">
                Engineers: {currentDrill.engineers}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>🚨</span> Vulnerability &amp; Operational Risk:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> Protocol Migration Solution:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux Tcpdump Wire Capture Terminal */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-soc: ~ (Live Wire Inspection)</span>
                <span className="text-cyan-400">tcpdump -nn -i eth0 proto 50 or proto 51</span>
              </div>
              <div className="p-4 space-y-3 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                <div>
                  <span className="text-emerald-400 font-bold">$ sudo tcpdump -nn -i eth0 -v 'proto 50 or proto 51'</span>
                </div>
                <div className="text-slate-400 space-y-1">
                  <div>
                    <span className="text-cyan-300">18:22:01.104</span> IP (tos 0x0, ttl 64, id 4120, proto <span className="text-emerald-400 font-bold">ESP (50)</span>, length 1428)<br />
                    &nbsp;&nbsp;203.0.113.10 &gt; 198.51.100.20: ESP(spi=<span className="text-cyan-300">0x88af1901</span>,seq=101) [AEAD AES-256-GCM 1400B Encrypted Payload]
                  </div>
                  <div className="text-slate-500 pt-1">
                    <span className="text-amber-400">18:22:01.105</span> IP (tos 0x0, ttl 64, id 4121, proto <span className="text-rose-400 font-bold">AH (51)</span>, length 1424) [LEGACY ALERT]<br />
                    &nbsp;&nbsp;10.14.2.15 &gt; 198.51.100.20: AH(spi=<span className="text-amber-300">0x4a1f89bc</span>,seq=55): TCP 10.14.2.15:1433 &gt; 10.20.8.44:1433 [CLEARTEXT PAYLOAD LEAK!]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-rose-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-rose-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>⚠️</span> Common Pitfalls &amp; Traps
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">1.</span>
                <span><strong>Assuming AH Encrypts Data:</strong> Beginners mistakenly deploy AH thinking it encrypts traffic. AH provides zero confidentiality; all data is transmitted in plain cleartext.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Deploying AH Over NAT Boundaries:</strong> NAT modifies IP addresses. Because AH calculates its ICV over the immutable IP header, the receiver drops every packet with a checksum failure.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Blocking Protocol 50 in Upstream Firewalls:</strong> Firewalls frequently permit UDP 500 (IKE) but drop raw IP Protocol 50 (ESP), causing Phase 2 tunnel dropouts. Always enable NAT-T UDP 4500.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Using Legacy Two-Pass (CBC+HMAC) on 10Gbps Links:</strong> AES-CBC requires 2 memory passes, choking router CPUs. Always standardize on single-pass AEAD (AES-GCM).</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-emerald-500/40 transition-all duration-300">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg border-b border-slate-800 pb-3">
              <span>🛡️</span> Production Best Practices
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span><strong>Standardize Exclusively on ESP (RFC 8221):</strong> Deprecate AH across all configurations. ESP in AEAD mode delivers both authenticated integrity and military-grade encryption.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Enable NAT-T (UDP 4500) by Default:</strong> Automatically handles mobile workers, branch offices, and CGNAT environments without manual firewall exceptions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Deploy ChaCha20-Poly1305 on ARM Gateways:</strong> When running IPsec on IoT or ARM edge gateways lacking AES-NI, ChaCha20-Poly1305 delivers 3x faster encryption.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Enforce Strict TCP MSS Clamping (1360B):</strong> Prevents MTU black holes and packet fragmentation on 1500-byte WAN circuits.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST SECTION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why is the Next Header field in ESP located at the very end inside the encrypted trailer rather than in the plaintext header?
                Because if it were outside, an attacker could see whether you are running database queries (Port 1433) or web browsing (Port 443)!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>AH is Protocol 51 (Authentication only, cleartext payload).</li>
                <li>ESP is Protocol 50 (Confidentiality + Authentication).</li>
                <li>AH zeroes mutable fields (TTL, TOS, Checksum) for ICV.</li>
                <li>AH breaks on NAT; ESP NAT-T uses UDP Port 4500.</li>
                <li>AEAD AES-256-GCM is the modern single-pass gold standard.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on AH vs ESP Dissector Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating mutable field zeroing, NAT checksum failure, and AEAD performance benchmarking
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={ahVsEspDissectorPy}
            title="ah_vs_esp_dissector.py"
            highlightLines={[30, 48, 70, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Authentication Header (AH) vs Encapsulating Security Payload (ESP) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA examination, memorize the fundamental difference: AH (Protocol 51) authenticates the whole packet including the IP header but offers ZERO encryption. ESP (Protocol 50) encrypts the payload and authenticates the ESP header and trailer. When asked why AH breaks with NAT, explain that NAT alters the IP address, which is an immutable field in AH's ICV calculation, causing a signature mismatch. Remember that RFC 8221 deprecates AH in favor of ESP with AEAD (AES-256-GCM)!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: AH vs ESP Protocols Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 6 Note"
            downloadFileName="topic6_ah_vs_esp_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
