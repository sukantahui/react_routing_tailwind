import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import vpnPerformanceTunerPy from "./topic10_files/vpn_performance_tuner.py?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgPacketHeaderId = useId();
  const svgMeltdownGraphId = useId();

  // Studio 1: Protocol & MTU Inspector State
  const [selectedProtoKey, setSelectedProtoKey] = useState("ipsec_esp_gcm"); // "wireguard", "ipsec_esp_gcm", "openvpn_tls", "l2tp_ipsec"
  const [innerPayloadBytes, setInnerPayloadBytes] = useState(1400); // 200 to 1460 bytes
  const [enableMssClamping, setEnableMssClamping] = useState(false);

  // Studio 2: Live TCP-over-TCP Meltdown Simulator State
  const [simulatedPacketLoss, setSimulatedPacketLoss] = useState(3.5); // 0% to 15%
  const [simulatedRttMs, setSimulatedRttMs] = useState(45); // 10 to 200 ms
  const [wanLinkSpeedMbps, setWanLinkSpeedMbps] = useState(100); // 10 to 1000 Mbps

  // Studio 3: Key Management & Rekeying Lifecycle State
  const [selectedKeyModel, setSelectedKeyModel] = useState("automated_scep_pki"); // "static_psk", "manual_x509_pki", "automated_scep_pki"
  const [enterpriseFleetSize, setEnterpriseFleetSize] = useState(750); // 50 to 5000 users

  // Studio 4: Regional SOC Case Studies State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_pmtu_blackhole");

  // Protocol Overhead Database for Studio 1
  const protocolSpecs = {
    wireguard: {
      key: "wireguard",
      title: "1. Modern WireGuard (Noise IK / ChaCha20-Poly1305)",
      badge: "Ultra-Lightweight / 32B Overhead",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      outerIp: 20,
      carrierL4: 8, // UDP
      tunnelHeader: 32, // WireGuard message header
      ivSize: 0, // Built into Noise nonce
      icvTag: 16, // Poly1305 MAC
      padding: 0,
      totalOverhead: 76,
      transport: "UDP (Port 51820)",
      recommendedMss: 1384,
      verdict: "Highest throughput, minimal header tax, zero state machine complexity."
    },
    ipsec_esp_gcm: {
      key: "ipsec_esp_gcm",
      title: "2. IPsec ESP Tunnel Mode (AES-256-GCM / IKEv2)",
      badge: "Industry Standard / 60B Overhead",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      outerIp: 20,
      carrierL4: 8, // UDP Port 4500 (NAT-T)
      tunnelHeader: 8, // ESP SPI + Seq
      ivSize: 8, // 64-bit IV
      icvTag: 16, // 128-bit ICV
      padding: 0,
      totalOverhead: 60,
      transport: "UDP 4500 (NAT-T) / IP Protocol 50",
      recommendedMss: 1400,
      verdict: "Hardware-accelerated via AES-NI; robust standard for enterprise gateway interconnects."
    },
    openvpn_tls: {
      key: "openvpn_tls",
      title: "3. OpenVPN over UDP (TLS 1.3 / AES-256-GCM)",
      badge: "Flexible / 74B Overhead",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
      outerIp: 20,
      carrierL4: 8, // UDP
      tunnelHeader: 14, // OpenVPN opcode & session ID
      ivSize: 16, // 128-bit IV
      icvTag: 16, // HMAC / GCM tag
      padding: 0,
      totalOverhead: 74,
      transport: "UDP Port 1194",
      recommendedMss: 1386,
      verdict: "Cross-platform compatibility; requires careful UDP tuning to avoid TCP fallback."
    },
    l2tp_ipsec: {
      key: "l2tp_ipsec",
      title: "4. Legacy L2TP/IPsec (Double Encapsulation)",
      badge: "Heavyweight / 96B Overhead",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      outerIp: 20,
      carrierL4: 8, // UDP 4500
      tunnelHeader: 36, // ESP (8) + UDP 1701 (8) + L2TP (8) + PPP (4) + IV (8)
      ivSize: 8,
      icvTag: 16,
      padding: 8,
      totalOverhead: 96,
      transport: "UDP 1701 + UDP 4500",
      recommendedMss: 1364,
      verdict: "Extremely heavy double encapsulation; high susceptibility to MTU fragmentation."
    }
  };

  // Studio 1: Packet Calculation Logic
  const currentProto = protocolSpecs[selectedProtoKey];
  const packetAudit = useMemo(() => {
    const innerIpTcp = 40; // 20B IP + 20B TCP
    const effectivePayload = enableMssClamping
      ? Math.min(innerPayloadBytes, currentProto.recommendedMss)
      : innerPayloadBytes;

    const totalPacketSize = effectivePayload + innerIpTcp + currentProto.totalOverhead;
    const isFragmented = totalPacketSize > 1500;
    const isBlackHole = isFragmented && !enableMssClamping;

    return {
      effectivePayload,
      totalPacketSize,
      isFragmented,
      isBlackHole,
      overheadPercent: ((currentProto.totalOverhead / totalPacketSize) * 100).toFixed(1)
    };
  }, [selectedProtoKey, innerPayloadBytes, enableMssClamping, currentProto]);

  // Studio 2: Live TCP-over-TCP Meltdown Calculation Logic
  const meltdownAudit = useMemo(() => {
    const lossRate = Math.max(0.0001, simulatedPacketLoss / 100.0);
    const rttSec = simulatedRttMs / 1000.0;

    // Mathis Formula for raw TCP throughput
    const mathisRawBps = (1460 * 8 / rttSec) * (1 / Math.sqrt(lossRate));
    const mathisMbps = Math.min(wanLinkSpeedMbps, mathisRawBps / 1000000);

    // UDP tunnel throughput (resilient)
    const udpThroughputMbps = Math.max(0.2, (mathisMbps * 0.94)).toFixed(2);

    // TCP-over-TCP throughput (quadratic meltdown degradation)
    const tcpInTcpDegradation = 1 / (1 + simulatedPacketLoss * 2.2);
    const tcpInTcpThroughputMbps = Math.max(0.05, (mathisMbps * tcpInTcpDegradation * 0.4)).toFixed(2);

    const throughputLossPercent = Math.round(
      ((Number(udpThroughputMbps) - Number(tcpInTcpThroughputMbps)) / Number(udpThroughputMbps)) * 100
    );

    return {
      udpThroughputMbps,
      tcpInTcpThroughputMbps,
      throughputLossPercent: Math.max(0, throughputLossPercent)
    };
  }, [simulatedPacketLoss, simulatedRttMs, wanLinkSpeedMbps]);

  // Studio 3: Key Management TCO Calculation (INR ₹)
  const keyManagementTco = useMemo(() => {
    let modelTitle = "Automated SCEP/EST PKI (Zero Touch)";
    let adminHoursPerMonth = 4.0;
    let annualSaaSPerUserInr = 450.0; // Certificate management tooling
    let riskVerdict = "SECURE: Automated 60-day rotation; real-time OCSP revocation.";
    let riskBadgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";

    if (selectedKeyModel === "static_psk") {
      modelTitle = "Static Pre-Shared Key (PSK)";
      adminHoursPerMonth = 24.0; // Manual re-keying firefighting
      annualSaaSPerUserInr = 0.0;
      riskVerdict = "CRITICAL NON-COMPLIANCE: Shared static secret violates PCI-DSS 4.0 & RBI directives.";
      riskBadgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    } else if (selectedKeyModel === "manual_x509_pki") {
      modelTitle = "Manual X.509 Certificate Generation (OpenSSL CLI)";
      adminHoursPerMonth = 42.0; // High manual admin overhead
      annualSaaSPerUserInr = 120.0;
      riskVerdict = "HIGH ADMIN BURDEN: Manual enrollment causes frequent outages when certs expire.";
      riskBadgeColor = "bg-amber-950 text-amber-300 border-amber-700";
    }

    const hourlySocRateInr = 850.0; // West Bengal SOC admin rate
    const annualAdminLaborCostLakhs = ((adminHoursPerMonth * 12 * hourlySocRateInr) / 100000).toFixed(2);
    const annualToolingCostLakhs = ((enterpriseFleetSize * annualSaaSPerUserInr) / 100000).toFixed(2);
    const totalKeyTcoLakhs = (Number(annualAdminLaborCostLakhs) + Number(annualToolingCostLakhs)).toFixed(2);

    return {
      modelTitle,
      adminHoursPerMonth,
      annualAdminLaborCostLakhs,
      annualToolingCostLakhs,
      totalKeyTcoLakhs,
      riskVerdict,
      riskBadgeColor
    };
  }, [selectedKeyModel, enterpriseFleetSize]);

  // Studio 4: Regional SOC Incident Drills Data
  const regionalDrills = {
    barrackpore_pmtu_blackhole: {
      id: "barrackpore_pmtu_blackhole",
      title: "Barrackpore Tax Assessment Hub: PMTU Black Hole Outage",
      location: "Barrackpore Municipal Core connecting 85 Remote Tax Assessment Desks",
      threatScenario:
        "Field officers in Ichapur and Barrackpore reported that logging into the tax portal succeeded, but uploading quarterly assessment spreadsheets (.xlsx > 2 MB) caused the browser to hang indefinitely. Firewalls blocked ICMP Type 3 Code 4 packets.",
      solution:
        "Sukanta Hui, Susmita, and Debangshu diagnosed Path MTU Black Holes via 'ping -f -l 1472' and deployed TCP MSS Clamping to 1360 bytes on the central VPN gateway.",
      outcome:
        "100% resolution of spreadsheet upload freezes; packet retransmissions dropped from 42% to 0.1%; zero support tickets."
    },
    kolkata_pki_cert_expiry: {
      id: "kolkata_pki_cert_expiry",
      title: "Salt Lake Sector V FinTech Hub: Root CA Expiration Outage",
      location: "Sector V Enterprise Hub connecting 1,200 Remote Developers",
      threatScenario:
        "A legacy hardcoded Intermediate CA certificate expired on a Sunday night, locking 1,200 remote engineers out of corporate Git and Jira repositories.",
      solution:
        "Mamata, Mahima, and Abhronila implemented automated SCEP certificate lifecycle management via Microsoft Intune with 60-day renewal windows and OCSP stapling.",
      outcome:
        "Automated certificate renewals with zero downtime; emergency revocation window reduced to under 30 seconds for offboarded staff."
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
            <span>🛡️ Module 005_003 • Topic 10</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            VPN Implementation Challenges
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the engineering complexities of packet encapsulation overhead, Path MTU Black Holes,
            TCP-over-TCP Meltdown, and enterprise cryptographic key management.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Header Overhead &amp; Bandwidth Tax
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              PMTU Black Holes &amp; MSS Clamping
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              TCP-over-TCP Meltdown
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              PKI X.509 &amp; SCEP Automation (₹)
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
          @keyframes pulseGlowCyan {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.8)); }
          }
          @keyframes warningBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              ⚙️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Four Fundamental Engineering Hurdles in VPN Deployment
              </h2>
              <p className="text-sm text-slate-400">
                Why deploying enterprise VPNs is rarely as simple as clicking &ldquo;Connect&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              While VPN theory is straightforward, real-world deployment across remote networks in{" "}
              <strong className="text-cyan-300">Barrackpore</strong>, <strong className="text-cyan-300">Kolkata</strong>,
              and residential broadband connections encounters four severe physical and cryptographic roadblocks:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-rose-700/60 transition-all duration-300 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-rose-400 flex items-center gap-2">
                    <span>📦</span> 1. The MTU &amp; PMTU Black Hole Trap
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    Fragmentation
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ethernet limits packets to 1500 bytes. Adding 60+ bytes of VPN headers causes oversized packets to be
                  silently dropped by firewalls that block ICMP errors, causing file uploads to freeze indefinitely!
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-amber-700/60 transition-all duration-300 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-400 flex items-center gap-2">
                    <span>📉</span> 2. The TCP-over-TCP Meltdown
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Latency Collapse
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Running SSL-VPNs over TCP causes cascading retransmission timeouts when packet loss occurs on home Wi-Fi.
                  Both inner and outer TCP stacks enter exponential backoff, crushing throughput by 90%+.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-indigo-700/60 transition-all duration-300 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-indigo-400 flex items-center gap-2">
                    <span>🔑</span> 3. The Cryptographic Key Lifecycle
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    PKI / Rekeying
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Static Pre-Shared Keys (PSKs) create catastrophic single-point-of-failure breach risks. Scaling unique X.509
                  certificates across 1,000+ endpoints requires automated SCEP/EST enrollment and OCSP revocation.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-emerald-700/60 transition-all duration-300 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                    <span>🔋</span> 4. NAT-T &amp; Mobile Battery Drain
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Carrier NAT
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  IPsec ESP lacks port numbers, requiring UDP 4500 NAT-Traversal. To keep cellular NAT state tables open,
                  clients must transmit frequent keepalives, draining battery on mobile field devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE HEADER ENCAPSULATION & MTU/MSS INSPECTOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                📦
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive Packet Encapsulation &amp; MTU/MSS Inspector
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect byte-by-byte header expansion and observe how TCP MSS Clamping prevents Path MTU Black Holes
                </p>
              </div>
            </div>

            {/* Protocol Switcher */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(protocolSpecs).map((key) => {
                const item = protocolSpecs[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedProtoKey(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border",
                      selectedProtoKey === key
                        ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(". ")[1].split(" (")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Controls & Visual Header Graph */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slider: Inner TCP Payload Size */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-300">Inner Application Payload Size:</span>
                  <span className="text-cyan-400 font-mono text-sm">{innerPayloadBytes} Bytes</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="1460"
                  step="20"
                  value={innerPayloadBytes}
                  onChange={(e) => setInnerPayloadBytes(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">
                  Standard web browsing generates 1460-byte payload segments before VPN encapsulation.
                </p>
              </div>

              {/* Toggle: MSS Clamping */}
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🛡️</span> TCP MSS Clamping at Gateway
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Clamp MSS to <code className="text-cyan-300 font-mono">{currentProto.recommendedMss} Bytes</code>
                  </div>
                </div>
                <button
                  onClick={() => setEnableMssClamping(!enableMssClamping)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 border",
                    enableMssClamping
                      ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  {enableMssClamping ? "CLAMPING ON" : "CLAMPING OFF"}
                </button>
              </div>
            </div>

            {/* Dynamic Visual Packet Layout Diagram */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <svg
                id={svgPacketHeaderId}
                viewBox="0 0 880 200"
                className="w-full min-w-[700px] h-auto"
                aria-label="VPN Encapsulated Packet Header Layout"
              >
                {/* Visual Byte Blocks */}
                <g transform="translate(20, 40)">
                  {/* Outer IP */}
                  <rect x="0" y="0" width="100" height="70" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="50" y="30" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle">Outer IP</text>
                  <text x="50" y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">20 Bytes</text>

                  {/* Carrier L4 / Tunnel Header */}
                  <rect x="105" y="0" width="130" height="70" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="170" y="30" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">
                    {currentProto.transport.split(" ")[0]} + Header
                  </text>
                  <text x="170" y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    {currentProto.carrierL4 + currentProto.tunnelHeader} Bytes
                  </text>

                  {/* IV / Nonce */}
                  {currentProto.ivSize > 0 && (
                    <>
                      <rect x="240" y="0" width="70" height="70" rx="6" fill="#311042" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="275" y="30" fill="#e9d5ff" fontSize="11" fontWeight="bold" textAnchor="middle">Crypto IV</text>
                      <text x="275" y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">{currentProto.ivSize} Bytes</text>
                    </>
                  )}

                  {/* Inner Original IP + TCP */}
                  <rect
                    x={currentProto.ivSize > 0 ? 315 : 240}
                    y="0"
                    width="120"
                    height="70"
                    rx="6"
                    fill="#064e3b"
                    stroke="#10b981"
                    strokeWidth="1.5"
                  />
                  <text x={currentProto.ivSize > 0 ? 375 : 300} y="30" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Inner IP + TCP
                  </text>
                  <text x={currentProto.ivSize > 0 ? 375 : 300} y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">40 Bytes</text>

                  {/* Payload Block */}
                  <rect
                    x={currentProto.ivSize > 0 ? 440 : 365}
                    y="0"
                    width="260"
                    height="70"
                    rx="6"
                    fill="#0f172a"
                    stroke={packetAudit.isFragmented ? "#f43f5e" : "#3b82f6"}
                    strokeWidth="2"
                  />
                  <text x={currentProto.ivSize > 0 ? 570 : 495} y="30" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Application Payload
                  </text>
                  <text
                    x={currentProto.ivSize > 0 ? 570 : 495}
                    y="50"
                    fill={packetAudit.isFragmented ? "#f43f5e" : "#38bdf8"}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {packetAudit.effectivePayload} Bytes
                  </text>

                  {/* ICV Tag */}
                  <rect
                    x={currentProto.ivSize > 0 ? 705 : 630}
                    y="0"
                    width="90"
                    height="70"
                    rx="6"
                    fill="#4c0519"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                  />
                  <text x={currentProto.ivSize > 0 ? 750 : 675} y="30" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ICV / MAC
                  </text>
                  <text x={currentProto.ivSize > 0 ? 750 : 675} y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    16 Bytes
                  </text>
                </g>

                {/* Total Size & MTU Indicator Line */}
                <g transform="translate(20, 130)">
                  <line x1="0" y1="10" x2="800" y2="10" stroke="#334155" strokeWidth="2" />
                  {/* Physical 1500B limit line */}
                  <line x1="720" y1="0" x2="720" y2="35" stroke="#eab308" strokeWidth="2" strokeDasharray="3,3" />
                  <text x="720" y="45" fill="#fde047" fontSize="10" textAnchor="middle">Physical MTU Limit (1500B)</text>

                  <text x="0" y="30" fill="#94a3b8" fontSize="11 font-mono">
                    Total Encapsulated Frame: <strong className="text-white">{packetAudit.totalPacketSize} Bytes</strong>
                  </text>
                  <text x="350" y="30" fill="#94a3b8" fontSize="11 font-mono">
                    Header Tax: <strong className="text-cyan-300">{packetAudit.overheadPercent}%</strong>
                  </text>
                </g>
              </svg>
            </div>

            {/* Diagnostic Alert Banner */}
            <div className={clsx(
              "p-4 rounded-xl border flex items-start gap-3 text-xs",
              packetAudit.isBlackHole
                ? "bg-rose-950/80 border-rose-800 text-rose-200"
                : "bg-emerald-950/80 border-emerald-800 text-emerald-200"
            )}>
              <span className="text-lg">{packetAudit.isBlackHole ? "🚨" : "✔"}</span>
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {packetAudit.isBlackHole
                    ? "Path MTU Black Hole Hazard Detected! (Packet Size = " + packetAudit.totalPacketSize + "B > 1500B)"
                    : "Packet Fits Perfectly Inside Physical MTU (Size = " + packetAudit.totalPacketSize + "B <= 1500B)"}
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {packetAudit.isBlackHole
                    ? "Because packet size exceeds 1500 bytes and MSS clamping is disabled, intermediate ISP routers dropping this frame with ICMP blocked will cause file uploads to hang forever!"
                    : "TCP MSS Clamping safely negotiates smaller TCP chunks during the SYN handshake. 100% immune to fragmentation and black hole hangs."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE TCP-OVER-TCP MELTDOWN SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 text-xl">
              📉
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 2: TCP-over-TCP Meltdown &amp; Packet Loss Simulator
              </h2>
              <p className="text-sm text-slate-400">
                Observe how running SSL-VPNs over TCP causes exponential throughput collapse under home Wi-Fi packet loss
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slider 1: Packet Loss */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Wi-Fi Packet Loss Rate:</span>
                <span className="text-rose-400 font-mono text-sm">{simulatedPacketLoss}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12.0"
                step="0.5"
                value={simulatedPacketLoss}
                onChange={(e) => setSimulatedPacketLoss(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Typical residential Wi-Fi packet loss ranges from 1% to 6%.
              </p>
            </div>

            {/* Slider 2: RTT Latency */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Round-Trip Time (RTT):</span>
                <span className="text-cyan-400 font-mono text-sm">{simulatedRttMs} ms</span>
              </div>
              <input
                type="range"
                min="10"
                max="180"
                step="5"
                value={simulatedRttMs}
                onChange={(e) => setSimulatedRttMs(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Network latency between remote worker and Barrackpore datacenter.
              </p>
            </div>

            {/* Slider 3: Link Speed */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Physical Broadband Bandwidth:</span>
                <span className="text-emerald-400 font-mono text-sm">{wanLinkSpeedMbps} Mbps</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="20"
                value={wanLinkSpeedMbps}
                onChange={(e) => setWanLinkSpeedMbps(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                ISP bandwidth provisioned on the remote endpoint.
              </p>
            </div>
          </div>

          {/* Performance Comparison Meter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚀</span> UDP-Based Tunnel (WireGuard / DTLS)
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                {meltdownAudit.udpThroughputMbps} <span className="text-sm font-normal text-emerald-400">Mbps</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Smooth Mathis throughput without inner/outer TCP retransmission collision.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>📉</span> TCP-over-TCP Tunnel (SSL-VPN)
              </div>
              <div className="text-3xl font-extrabold text-rose-400 font-mono">
                {meltdownAudit.tcpInTcpThroughputMbps} <span className="text-sm font-normal text-slate-300">Mbps</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cascading sliding-window backoff collapses usable bandwidth!
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚡</span> Meltdown Throughput Penalty
              </div>
              <div className="text-3xl font-extrabold text-amber-400 font-mono">
                -{meltdownAudit.throughputLossPercent}%
              </div>
              <p className="text-[11px] text-slate-400">
                Bandwidth lost entirely to duplicate retransmissions and queue delay.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: KEY MANAGEMENT & REKEYING LIFECYCLE WORKBENCH (INR ₹) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 text-xl">
                🔑
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: Cryptographic Key Management &amp; Rekeying TCO (INR ₹)
                </h2>
                <p className="text-sm text-slate-400">
                  Compare operational labor costs and compliance risk between static PSKs, manual OpenSSL, and automated SCEP PKI
                </p>
              </div>
            </div>

            {/* Model Switcher */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedKeyModel("static_psk")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  selectedKeyModel === "static_psk"
                    ? "bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Static PSK
              </button>
              <button
                onClick={() => setSelectedKeyModel("manual_x509_pki")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  selectedKeyModel === "manual_x509_pki"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Manual X.509
              </button>
              <button
                onClick={() => setSelectedKeyModel("automated_scep_pki")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  selectedKeyModel === "automated_scep_pki"
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Automated SCEP PKI
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slider: Fleet Size */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Remote Laptops &amp; Endpoints:</span>
                <span className="text-cyan-400 font-mono text-sm">{enterpriseFleetSize} Devices</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={enterpriseFleetSize}
                onChange={(e) => setEnterpriseFleetSize(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Total active workforce requiring unique cryptographic credentials.
              </p>
            </div>

            {/* Computed TCO & Risk Display */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Model:</span>
                <span className="font-bold text-white">{keyManagementTco.modelTitle}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Admin Effort:</span>
                <span className="font-mono text-amber-400">{keyManagementTco.adminHoursPerMonth} Hours / Month</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Annual Total TCO:</span>
                <span className="font-mono text-xl font-extrabold text-cyan-300">
                  ₹{keyManagementTco.totalKeyTcoLakhs} <span className="text-xs font-normal text-white">Lakhs / year</span>
                </span>
              </div>
              <div className={clsx("p-2.5 rounded-lg border text-xs font-medium", keyManagementTco.riskBadgeColor)}>
                {keyManagementTco.riskVerdict}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* REAL-WORLD USAGE EXAMPLES (4 DETAILED SCENARIOS) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🏢
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Real-World Engineering Troubleshooting Scenarios
              </h2>
              <p className="text-sm text-slate-400">
                How senior network architects diagnose and resolve tunneling degradation across West Bengal enterprise hubs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🛠️</span> Scenario 1: PPPoE Residential MTU Clamping
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  MSS Clamping
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita works from home in Ichapur using BSNL FTTH broadband (PPPoE MTU = 1492).
                Tax portal PDF uploads kept timing out.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Fix: Configured &apos;iptables -t mangle -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1360&apos; on the gateway.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> PDF uploads completed in 1.4 seconds; zero fragmentation retransmissions.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>⚡</span> Scenario 2: Eliminating SSL-VPN TCP Meltdown
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  UDP Migration
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu and Mamata experienced severe lag during SSH sessions over OpenVPN TCP
                while roaming on 4G cellular links in Kolkata.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Fix: Migrated mobile clients to WireGuard (UDP Port 51820) with in-kernel cryptographic routing.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> SSH terminal typing latency slashed from 650ms to 24ms under 4% cellular packet loss.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>📱</span> Scenario 3: Mitigating Mobile NAT Keepalive Drain
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Power Tuning
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Mahima inspected municipal meters in Barrackpore on Android tablets.
                Aggressive 10-second keepalives drained device batteries before noon.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Fix: Tuned WireGuard PersistentKeepalive to 45 seconds and enabled on-demand roaming state machine.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Battery life extended by 4.5 hours while maintaining persistent push notification tunnels.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🔐</span> Scenario 4: Automated SCEP Certificate Rotation
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  SCEP / EST
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila manages 1,500 laptops for a Salt Lake FinTech exchange.
                Manual certificate enrollment caused constant expiration outages.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Fix: Deployed Microsoft Intune SCEP connector with automated 60-day renewal cycles and OCSP stapling.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> 100% elimination of certificate expiration tickets; automated revocation on staff termination.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC INCIDENT DRILLS (WEST BENGAL CASE STUDIES) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 text-xl">
                🚨
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional West Bengal SOC Incident Drills
                </h2>
                <p className="text-sm text-slate-400">
                  Real-world enterprise troubleshooting and emergency outage resolution in Barrackpore &amp; Kolkata
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveDrillKey("barrackpore_pmtu_blackhole")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_pmtu_blackhole"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore PMTU Black Hole Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_pki_cert_expiry")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_pki_cert_expiry"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Sector V PKI Expiry Drill
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{currentDrill.title}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-700 font-mono">
                📍 {currentDrill.location}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚠️</span> Threat Scenario:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛠️</span> Technical Solution:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏆</span> Operational Outcome:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* EDUCATIONAL PYTHON SCRIPT LOADER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🐍
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Programmatic MTU Calculation &amp; Meltdown Modeling (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Calculate encapsulation byte expansion, model TCP meltdown degradation, and audit PKI management costs
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={vpnPerformanceTunerPy}
            title="vpn_performance_tuner.py"
            highlightLines={[42, 65, 87, 102]}
          />
        </section>

        {/* ========================================================================= */}
        {/* TIPS & TRICKS, PITFALLS, BEST PRACTICES & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                5. Professional Wisdom, Common Pitfalls &amp; Student Checklist
              </h2>
              <p className="text-sm text-slate-400">
                Essential performance tuning habits, common beginner misconceptions, and revision points
              </p>
            </div>
          </div>

          {/* Tips & Tricks */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🚀</span> Professional Tips &amp; Tricks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">1. Hardcode MSS to 1360 on Gateways:</strong>
                <p className="text-slate-400">
                  Rather than relying on Path MTU discovery, hardcode MSS to 1360 bytes on gateways. This accounts for
                  PPPoE residential links (1492B) and IPsec ESP overhead in one stroke.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Prefer ChaCha20-Poly1305 on Mobile:</strong>
                <p className="text-slate-400">
                  On mobile ARM CPUs lacking AES-NI hardware instructions, ChaCha20-Poly1305 is 3x faster than AES-256-CBC,
                  cutting battery drain and encryption latency significantly.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Automate SCEP with 60-Day Expirations:</strong>
                <p className="text-slate-400">
                  Short certificate lifespans (30–60 days) limit breach windows and eliminate massive CRL distribution files
                  when combined with automated MDM enrollment.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Deploy Active Queue Management (FQ-CoDel):</strong>
                <p className="text-slate-400">
                  Configure FQ-CoDel on VPN gateway virtual interfaces to prevent bufferbloat from introducing 500ms+ jitter
                  during concurrent file downloads and VoIP calls.
                </p>
              </div>
            </div>
          </div>

          {/* Common Pitfalls */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Beginner Misconceptions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 1: "Blocking all ICMP makes the VPN more secure."</strong>
                <p className="text-slate-400">
                  Blocking ICMP Type 3 Code 4 destroys Path MTU Discovery, directly creating PMTU Black Holes where file uploads
                  and large web pages freeze completely!
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "TCP Port 443 is best for VPNs because it bypasses firewalls."</strong>
                <p className="text-slate-400">
                  Running OpenVPN over TCP causes TCP-over-TCP meltdown. Under as little as 3% packet loss, bandwidth collapses
                  due to dual exponential backoff.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Using Pre-Shared Keys (PSK) in Production:</strong>
                <p className="text-slate-400">
                  A single stolen laptop compromises the shared PSK for all employees, violating RBI and PCI-DSS compliance
                  mandates. Always deploy PKI or Curve25519 public keys.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Neglecting NAT Keepalive Battery Impact:</strong>
                <p className="text-slate-400">
                  Setting 10-second keepalives on mobile smartphones keeps cellular radios in high-power transmit mode 24/7,
                  draining field worker batteries before mid-day.
                </p>
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className="bg-cyan-950/40 border border-cyan-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span>💭</span> Pedagogical Hints for System Analysts
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-cyan-200">Think about:</strong> Why does an SSH terminal connect instantly over a VPN, but loading a 5 MB image on a webpage times out?</li>
              <li><strong className="text-cyan-200">Observe carefully:</strong> How Mathis formula explains the 90%+ throughput collapse in TCP-over-TCP tunnels under 4% packet loss in Studio 2.</li>
              <li><strong className="text-cyan-200">Try changing this:</strong> Enable TCP MSS Clamping in Studio 1 and observe how packet size shrinks from 1560B back safely under the 1500B MTU limit.</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <span>✅</span> Student Revision Mini-Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Calculate header encapsulation overhead for WireGuard vs IPsec ESP</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain why Path MTU Black Holes occur and write the iptables TCPMSS rule</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe the mathematical cause of TCP-over-TCP Meltdown</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Compare PSK vs PKI/X.509 and explain automated SCEP certificate enrollment</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="VPN Implementation Challenges: MTU, Latency & Key Management FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="VPN Implementation Challenges Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic10_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="When implementing enterprise VPNs, cryptographic security is only half the battle; the physical physics of network transmission dictates real-world success. You can have the most unbreakable 4096-bit RSA keys in the world, but if your gateway miscalculates Path MTU by a mere 20 bytes, your users will experience catastrophic freezing on every large spreadsheet upload. Always remember Sukanta Hui's golden rules of VPN engineering: 1. Enforce UDP transport to avoid TCP Meltdown; 2. Always clamp TCP MSS to 1360 bytes at your perimeter gateway; and 3. Automate your X.509 certificate lifecycle using SCEP so human error never brings down your enterprise network!"
        />

      </div>
    </div>
  );
};

export default Topic10;
