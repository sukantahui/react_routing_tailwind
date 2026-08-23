import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic5_files/ipsec_mode_inspector.py?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgTunnelModeId = useId();
  const svgTransportModeId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("encapsulation_scope");

  // Studio 2: Live IPsec Mode Simulator State
  const [selectedIpsecMode, setSelectedIpsecMode] = useState("tunnel_esp"); // "tunnel_esp", "transport_esp", "tunnel_ah"
  const [simulatedNatActive, setSimulatedNatActive] = useState(true);

  // Studio 3: Performance & Hardware Crypto Calculations
  const [ipsecThroughputGbps, setIpsecThroughputGbps] = useState(5); // 1 to 20 Gbps
  const [activeTunnelCount, setActiveTunnelCount] = useState(400); // 50 to 5000 SAs
  const [ipsecOverheadBytes, setIpsecOverheadBytes] = useState(68); // 48 to 92 Bytes

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_ipsec_mesh");

  // Comparison Database for Studio 1
  const ipsecDimensions = {
    encapsulation_scope: {
      key: "encapsulation_scope",
      title: "1. Encapsulation & Encryption Scope",
      category: "Packet Anatomy",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      tunnelDetail: "Encrypts the entire original IP packet (Inner IP Header + TCP/UDP + Data). Prepends a brand-new public routable IP header.",
      transportDetail: "Encrypts only the Layer 4 transport payload (TCP/UDP Data). Reuses the original IP header in cleartext.",
      verdict: "Tunnel Mode completely hides internal private IP addresses; Transport Mode preserves original IP headers."
    },
    header_overhead_and_mtu: {
      key: "header_overhead_and_mtu",
      title: "2. Header Overhead & MTU Impact",
      category: "Protocol Overhead",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      tunnelDetail: "Adds 56 to 72 Bytes of overhead (New IP + UDP 4500 + ESP Header + IV + Auth Tag). Requires MSS clamping to 1380B.",
      transportDetail: "Adds 36 to 52 Bytes of overhead (Saves 20 Bytes by omitting the outer IP header). Recommended MSS: 1420B.",
      verdict: "Transport Mode saves 20 bytes per packet, reducing bandwidth consumption on high-volume internal replication."
    },
    nat_traversal_compatibility: {
      key: "nat_traversal_compatibility",
      title: "3. NAT-Traversal & Firewall Compatibility",
      category: "NAT Compatibility",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      tunnelDetail: "100% compatible with NAT-T (UDP Port 4500). Outer IP modifications by home routers do not invalidate the ESP tag.",
      transportDetail: "Compatible with NAT-T for ESP. However, AH in Transport Mode fails across NAT because AH hashes IP addresses.",
      verdict: "ESP with NAT-T (UDP 4500) is the enterprise standard across all public internet and consumer broadband links."
    },
    enterprise_use_cases: {
      key: "enterprise_use_cases",
      title: "4. Primary Enterprise Use Cases",
      category: "Deployment Scenarios",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      tunnelDetail: "Site-to-Site (Gateway-to-Gateway) connecting branch offices to central datacenters, and Remote Access VPNs.",
      transportDetail: "Direct Host-to-Host encryption between internal datacenter database servers, and encryption layer for GRE / L2TP.",
      verdict: "Deploy Tunnel Mode for WAN interconnects; deploy Transport Mode for internal datacenter micro-segmentation."
    }
  };

  // Studio 2: Live Encapsulation Inspector Logic
  const modeInspectionResult = useMemo(() => {
    if (selectedIpsecMode === "tunnel_ah") {
      const isFailed = simulatedNatActive;
      return {
        modeName: "IPsec Authentication Header (AH) - Tunnel Mode",
        status: isFailed ? "NAT_CORRUPTED" : "AH_VALID",
        verdict: isFailed
          ? "❌ AH INTEGRITY FAILURE: NAT Rewrote IP Address! Packet Dropped."
          : "✔ AH INTEGRITY VALID: No NAT detected; Outer IP hash matched.",
        badgeColor: isFailed
          ? "bg-rose-950 text-rose-300 border-rose-700"
          : "bg-emerald-950 text-emerald-300 border-emerald-700",
        outerHeader: "New Public IPv4 Header (203.0.113.88 -> 198.51.100.1)",
        encryptionScope: "NONE (Payload is in CLEARTEXT! AH provides integrity only)",
        overhead: 44,
        explanation: isFailed
          ? "AH calculates an ICV hash across the outer IP header. Because NAT altered the source IP, the receiver's AH hash check failed and the packet was dropped!"
          : "AH verified packet integrity. Note that payload data is completely unencrypted and visible to network sniffers."
      };
    } else if (selectedIpsecMode === "transport_esp") {
      return {
        modeName: "IPsec ESP Transport Mode (Payload-Only Encapsulation)",
        status: "TRANSPORT_ACTIVE",
        verdict: "✔ TRANSPORT MODE ACTIVE: Payload Encrypted (Original IP Visible)",
        badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
        outerHeader: "Original IP Header Preserved (10.10.1.5 -> 10.20.1.50)",
        encryptionScope: "TCP Header + Data Payload ONLY (AES-256-GCM Encrypted)",
        overhead: 48,
        explanation: "Transport mode encrypted the TCP payload while leaving internal IP addresses in cleartext. Saves 20 bytes by omitting the new IP header."
      };
    } else {
      // Default: Tunnel ESP
      return {
        modeName: "IPsec ESP Tunnel Mode (Full Packet Encapsulation)",
        status: "TUNNEL_ACTIVE",
        verdict: "✔ TUNNEL MODE ACTIVE: Full Inner Packet & Addresses Encrypted!",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        outerHeader: "New Public IPv4 Header (203.0.113.88 -> 198.51.100.1) + UDP 4500",
        encryptionScope: "Inner IP (10.10.1.5 -> 10.20.1.50) + TCP + Payload (100% Encrypted)",
        overhead: 68,
        explanation: "Tunnel mode encapsulated the entire original IP packet inside a new public IP carrier with AES-256-GCM encryption. 100% immune to NAT translation."
      };
    }
  }, [selectedIpsecMode, simulatedNatActive]);

  // Studio 3: Performance Calculations
  const calculatedIpsecMetrics = useMemo(() => {
    // Total aggregate packet rate (Mpps)
    const packetProcessingMpps = (((ipsecThroughputGbps * 1000 * 1000 * 1000) / 8) / 1380 / 1000000).toFixed(2);
    // Overhead bandwidth percentage
    const overheadPercentage = ((ipsecOverheadBytes / 1380) * 100).toFixed(1);

    // 5-Year Enterprise IPsec Concentrator TCO (INR ₹ Lakhs)
    const hardwareApplianceLakhs = (ipsecThroughputGbps * 2.2 + 9.0).toFixed(2);
    const tunnelLicenseLakhs = ((activeTunnelCount * 350 * 5) / 100000).toFixed(2);
    const fiveYearTcoLakhs = (Number(hardwareApplianceLakhs) + Number(tunnelLicenseLakhs) + 5.0).toFixed(2);

    return {
      packetProcessingMpps,
      overheadPercentage,
      fiveYearTcoLakhs
    };
  }, [ipsecThroughputGbps, activeTunnelCount, ipsecOverheadBytes]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_ipsec_mesh: {
      id: "barrackpore_ipsec_mesh",
      title: "Barrackpore-to-Salt Lake Core Municipal IPsec Hybrid Deployment",
      location: "Barrackpore Command Hub connecting to Salt Lake Sector V State Datacenter",
      architecture: "Edge Routers: IPsec ESP Tunnel Mode (IKEv2) | Datacenter DB Cluster: IPsec Transport Mode",
      threatScenario: "An attacker on the public fiber link attempted intercepting citizen tax records, while an insider plugged into the datacenter switch to sniff database traffic.",
      solution: "Sukanta Hui, Mamata, and Mahima deployed IPsec ESP Tunnel Mode across the WAN and enforced IPsec Transport Mode between internal database nodes.",
      outcome: "WAN eavesdropper captured only public IP headers; datacenter switch sniffer captured only AES ciphertext; 100% CERT-In compliance."
    },
    ichapur_nat_traversal: {
      id: "ichapur_nat_traversal",
      title: "Ichapur Substation Behind CGNAT Dual-Broadband IPsec Auto-Healing",
      location: "Ichapur Substation (Behind ISP CGNAT) to Barrackpore Command Center",
      architecture: "Route-Based IPsec VTI with NAT-T UDP Port 4500 and BFD Keepalives",
      threatScenario: "Legacy AH configuration failed immediately when the ISP switched to Carrier-Grade NAT (CGNAT 100.64.0.0/10), breaking SCADA telemetry.",
      solution: "Abhronila, Susmita, and Debangshu migrated the link to ESP with NAT-T on UDP 4500 and configured persistent keepalives every 20 seconds.",
      outcome: "Tunnel re-established instantly across CGNAT; zero packet drops; sub-50ms failover maintained."
    }
  };

  const currentDimension = ipsecDimensions[selectedDimensionKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 5</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            IPsec VPNs: Tunnel Mode vs Transport Mode
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the two operational modes of IPsec. Contrast <strong className="text-sky-400">Tunnel Mode (Full Packet Encapsulation)</strong> with <strong className="text-emerald-400">Transport Mode (Payload-Only)</strong>, understand why <strong className="text-rose-400">AH Breaks with NAT</strong>, and explore <strong className="text-purple-400">ESP with NAT-T (UDP 4500)</strong> and <strong className="text-amber-400">IKEv2 Fast Negotiation</strong>.
          </p>
        </header>

        {/* SECTION 1: TUNNEL VS TRANSPORT MODE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> IPsec Packet Anatomy: Tunnel Mode vs Transport Mode
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the full packet encapsulation of Tunnel Mode on the left and the payload-only encryption of Transport Mode on the right.
            </p>
          </div>

          {/* SVG 1: TUNNEL VS TRANSPORT PACKET ANATOMY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Tunnel Mode (New Outer IP) ➔ Transport Mode (Original IP Preserved)
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Packet Anatomy Comparison</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgTunnelModeId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="IPsec Tunnel Mode vs Transport Mode Packet Anatomy Diagram"
              >
                {/* LEFT: IPSEC TUNNEL MODE */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  IPSEC ESP TUNNEL MODE (FULL ENCAPSULATION)
                </text>

                {/* NEW OUTER PUBLIC IP */}
                <rect x="35" y="58" width="360" height="32" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                <text x="215" y="74" fill="#c7d2fe" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  New Public IP Header: 203.0.113.88 ➔ 198.51.100.1 (UDP 4500)
                </text>

                {/* ESP HEADER */}
                <rect x="35" y="94" width="360" height="26" rx="4" fill="#450a0a" stroke="#ef4444" />
                <text x="215" y="111" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  ESP Header: SPI (0x100A) • Sequence Number (#42)
                </text>

                {/* ENCRYPTED PAYLOAD BOX */}
                <rect x="35" y="124" width="360" height="68" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="215" y="142" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ENCRYPTED SCOPE (AES-256-GCM)
                </text>
                <text x="215" y="158" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Original IP Header (10.10.1.5 ➔ 10.20.1.50) + TCP Port 443
                </text>
                <text x="215" y="174" fill="#fde68a" fontSize="7" textAnchor="middle">
                  Data Payload: Citizen Tax Records / SCADA Command
                </text>

                {/* ESP TRAILER & AUTH TAG */}
                <rect x="35" y="196" width="360" height="26" rx="4" fill="#082f49" stroke="#0284c7" />
                <text x="215" y="213" fill="#7dd3fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  ESP Trailer (Padding + Next Header) + ICV Auth Tag (16B)
                </text>

                <text x="215" y="248" fill="#38bdf8" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Site-to-Site &amp; Remote Access Standard (Hides Internal IPs)
                </text>

                {/* RIGHT: IPSEC TRANSPORT MODE */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#a855f7" strokeWidth="1.5" />
                <text x="635" y="42" fill="#c084fc" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  IPSEC ESP TRANSPORT MODE (PAYLOAD-ONLY)
                </text>

                {/* ORIGINAL IP HEADER UNENCRYPTED */}
                <rect x="455" y="58" width="360" height="32" rx="4" fill="#082f49" stroke="#0284c7" />
                <text x="635" y="74" fill="#7dd3fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Original IP Header Preserved (Cleartext): 10.10.1.5 ➔ 10.20.1.50
                </text>

                {/* ESP HEADER */}
                <rect x="455" y="94" width="360" height="26" rx="4" fill="#450a0a" stroke="#ef4444" />
                <text x="635" y="111" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  ESP Header: SPI (0x200B) • Sequence Number (#42)
                </text>

                {/* ENCRYPTED PAYLOAD BOX */}
                <rect x="455" y="124" width="360" height="68" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="635" y="142" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ENCRYPTED SCOPE (AES-256-GCM)
                </text>
                <text x="635" y="158" fill="#ffffff" fontSize="7" textAnchor="middle">
                  TCP / UDP Transport Header (Port 443 / Port 3306)
                </text>
                <text x="635" y="174" fill="#fde68a" fontSize="7" textAnchor="middle">
                  Data Payload: Database Replication / GRE Packet
                </text>

                {/* ESP TRAILER & AUTH TAG */}
                <rect x="455" y="196" width="360" height="26" rx="4" fill="#082f49" stroke="#0284c7" />
                <text x="635" y="213" fill="#7dd3fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  ESP Trailer (Padding + Next Header) + ICV Auth Tag (16B)
                </text>

                <text x="635" y="248" fill="#a855f7" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Host-to-Host LAN / GRE Transport (Saves 20 Bytes)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: IPSEC DIMENSIONS MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Tunnel Mode vs Transport Mode Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the foundational differences across Encapsulation Scope, Overhead, NAT Traversal, and Enterprise Use Cases.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentDimension.badgeColor)}>
              {currentDimension.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(ipsecDimensions).map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDimensionKey(d.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedDimensionKey === d.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Comparison Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDimension.title}</h3>
                <span className="text-gray-400">Category: {currentDimension.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentDimension.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
                  🛡️ 1. IPsec ESP Tunnel Mode (Default WAN Standard):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.tunnelDetail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-950/80 space-y-2">
                <span className="text-purple-400 font-bold uppercase tracking-wider text-[11px] block">
                  ⚙️ 2. IPsec ESP Transport Mode (Host-to-Host):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.transportDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentDimension.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE IPSEC PACKET INSPECTOR SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live IPsec Packet Anatomy &amp; Mode Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Toggle between Tunnel Mode, Transport Mode, and AH to observe exact byte encapsulation scopes and test NAT traversal compatibility.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              IPsec Inspector Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select IPsec Mode &amp; Protocol:</label>
              <select
                value={selectedIpsecMode}
                onChange={(e) => setSelectedIpsecMode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="tunnel_esp">1. IPsec ESP Tunnel Mode (AEAD Encrypted + New Public IP)</option>
                <option value="transport_esp">2. IPsec ESP Transport Mode (Payload Encrypted + Original IP)</option>
                <option value="tunnel_ah">3. IPsec AH Tunnel Mode (Cleartext Payload + Outer IP Hashing)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Simulated NAT Router in Transit:</label>
              <button
                onClick={() => setSimulatedNatActive(!simulatedNatActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  simulatedNatActive
                    ? "bg-amber-950/80 text-amber-300 border-amber-800 shadow-md shadow-amber-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {simulatedNatActive ? "✔ NAT Router Active (Rewriting Public Source IP)" : "❌ No NAT (Direct End-to-End Routing)"}
              </button>
            </div>
          </div>

          {/* Inspection Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Active Mode Evaluation:
                </span>
                <span className="text-white font-bold text-sm">{modeInspectionResult.modeName}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                modeInspectionResult.badgeColor
              )}>
                {modeInspectionResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">Outer Layer-3 Packet Header:</span>
                <div className="text-gray-300 text-xs">{modeInspectionResult.outerHeader}</div>
                <div className="text-gray-500 text-[10px]">Overhead: {modeInspectionResult.overhead} Bytes</div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold text-[11px] block">Encrypted Payload Scope:</span>
                <div className="text-gray-300 text-xs">{modeInspectionResult.encryptionScope}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                Engineering Assessment:
              </span>
              <p className="text-gray-300 leading-relaxed font-sans">{modeInspectionResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: IPSEC MODE INSPECTOR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: IPsec Mode Inspector Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation serializing IPsec Tunnel Mode and Transport Mode packets, computing byte layouts, and validating NAT traversal compatibility.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ipsec_mode_inspector.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="ipsec_mode_inspector.py"
            highlightLines={[22, 38, 52, 68]}
          />
        </section>

        {/* STUDIO 3: IPSEC THROUGHPUT & CONCENTRATOR SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: IPsec Throughput, Tunnel Scaling &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate packet processing rate (Mpps), protocol overhead bandwidth percentage, and 5-year enterprise IPsec concentrator TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              IPsec Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>IPsec Throughput:</span>
                <span className="text-sky-400 font-bold">{ipsecThroughputGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={ipsecThroughputGbps}
                onChange={(e) => setIpsecThroughputGbps(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Active IPsec SAs:</span>
                <span className="text-purple-400 font-bold">{activeTunnelCount} Tunnels</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={activeTunnelCount}
                onChange={(e) => setActiveTunnelCount(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>IPsec Header Overhead:</span>
                <span className="text-emerald-400 font-bold">{ipsecOverheadBytes} Bytes</span>
              </div>
              <input
                type="range"
                min="48"
                max="92"
                step="4"
                value={ipsecOverheadBytes}
                onChange={(e) => setIpsecOverheadBytes(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Packet Processing Rate</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedIpsecMetrics.packetProcessingMpps} Mpps</div>
              <span className="text-[10px] text-gray-500 block">Packets per second throughput</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Overhead Penalty</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedIpsecMetrics.overheadPercentage}% Bandwidth</div>
              <span className="text-[10px] text-gray-500 block">Based on 1380-byte packet size</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year IPsec TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedIpsecMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Concentrator + SA Licenses</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.architecture}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical Hybrid IPsec Deployment:</span>
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
                <span>Tunnel Mode encrypts the entire original IP packet and appends a new public IP header.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Transport Mode encrypts only the Layer 4 payload, preserving the original IP header.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Tunnel Mode is used for Site-to-Site and Remote Access; Transport Mode is used for Host-to-Host.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>AH (Protocol 51) is incompatible with NAT because NAT IP rewriting breaks AH hash integrity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>ESP (Protocol 50) with NAT-T (UDP 4500) is the universal enterprise standard for IPsec VPNs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all IPsec Security Association (SA) negotiation and session logs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="IPsec VPNs: Tunnel Mode vs Transport Mode FAQs"
            subtitle="30 In-depth Practice Questions &amp; IPsec Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="IPsec VPNs: Tunnel vs Transport Mode (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 5 provides clarity on IPsec modes! Always remember: Tunnel Mode is the enterprise standard across public WANs because it encrypts both the data payload AND the inner private IP headers, preventing ISPs and wiretappers from learning internal network addresses. Transport Mode encrypts only the payload while leaving the original IP header in cleartext—ideal for internal datacenter database replication or GRE-over-IPsec encapsulation to save 20 bytes of header overhead. Never deploy AH over public networks because NAT rewrites IP addresses and destroys AH hash verification! In Topic 6, we will explore SSL/TLS-based VPNs: OpenVPN, WireGuard, and Browser-based SSL VPNs!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic5;
