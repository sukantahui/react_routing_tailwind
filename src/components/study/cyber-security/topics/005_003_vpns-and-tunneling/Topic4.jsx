import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic4_files/tunnel_encapsulation_sim.py?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgTierModelId = useId();
  const svgMssClampingId = useId();

  // Studio 1: Active Protocol Tier Selection
  const [selectedTierKey, setSelectedTierKey] = useState("three_tier_model");

  // Studio 2: Live Encapsulation & MTU Simulator State
  const [selectedTunnelProto, setSelectedTunnelProto] = useState("ipsec_esp");
  const [passengerPacketBytes, setPassengerPacketBytes] = useState(1460); // 500 to 1500 Bytes
  const [enableMssClamping, setEnableMssClamping] = useState(false);

  // Studio 3: Performance & Overhead Calculations
  const [carrierLinkSpeedMbps, setCarrierLinkSpeedMbps] = useState(500); // 50 to 2000 Mbps
  const [averagePacketSizeParam, setAveragePacketSizeParam] = useState(1360); // 256 to 1420 Bytes
  const [remoteBranchCountParam, setRemoteBranchCountParam] = useState(8); // 1 to 20 branches

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_mtu_tuning");

  // Comparison Database for Studio 1
  const protocolTiers = {
    three_tier_model: {
      key: "three_tier_model",
      title: "1. The 3-Tier Protocol Model",
      category: "Layered Hierarchy",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Passenger Protocol (Private Data) ➔ Encapsulating Protocol (Security Envelope) ➔ Carrier Protocol (Public Transport).",
      examples: "Passenger: 10.10.1.5 | Encapsulating: IPsec ESP (Proto 50) | Carrier: Public IPv4 + UDP Port 4500.",
      advantage: "Decouples internal private addressing from public internet routing, allowing non-routable packets to traverse public ISPs.",
      verdict: "The foundation of all modern tunneling; every packet is systematically nested into routable envelopes."
    },
    carrier_udp_advantage: {
      key: "carrier_udp_advantage",
      title: "2. UDP as Mandatory Carrier Transport",
      category: "Transport Dynamics",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "UDP provides connectionless, zero-retransmission transport without internal state machines.",
      examples: "WireGuard (UDP 51820), IPsec NAT-T (UDP 4500), OpenVPN (UDP 1194).",
      advantage: "Allows the passenger application's TCP stack to manage flow control and retransmissions cleanly without interference.",
      verdict: "High-performance VPNs mandate UDP to achieve line-rate throughput and predictable low latency."
    },
    tcp_meltdown_hazard: {
      key: "tcp_meltdown_hazard",
      title: "3. The TCP-over-TCP Meltdown Phenomenon",
      category: "Performance Collapse",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      description: "Running a TCP application inside a TCP VPN tunnel causes dual, competing retransmission timers upon packet loss.",
      examples: "OpenVPN over TCP Port 443 across public Wi-Fi or mobile cellular.",
      advantage: "Only useful as a fallback to bypass strict corporate firewalls that block all UDP traffic.",
      verdict: "Avoid TCP carriers whenever possible; packet loss causes latency to spike from 20ms to 12,000ms!"
    },
    mtu_mss_clamping: {
      key: "mtu_mss_clamping",
      title: "4. MTU Overhead & TCP MSS Clamping",
      category: "Packet Optimization",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "VPN headers expand 1500B packets beyond link MTU. MSS clamping rewrites TCP SYN packets to force smaller segments.",
      examples: "Cisco: `ip tcp adjust-mss 1360` • WireGuard MTU: 1420 Bytes.",
      advantage: "Completely eliminates Path MTU Blackhole silent drops and avoids costly router CPU packet fragmentation.",
      verdict: "Mandatory configuration on every enterprise router terminating IPsec, GRE, or WireGuard tunnels."
    }
  };

  // Studio 2: Live Protocol Overhead Profiles
  const protocolOverheads = {
    wireguard: {
      id: "wireguard",
      name: "WireGuard (Noise Protocol)",
      carrier: "UDP Port 51820",
      overheadBytes: 32,
      recommendedMss: 1420,
      meltdownRisk: false
    },
    ipsec_esp: {
      id: "ipsec_esp",
      name: "IPsec ESP Tunnel Mode (NAT-T)",
      carrier: "UDP Port 4500",
      overheadBytes: 68,
      recommendedMss: 1380,
      meltdownRisk: false
    },
    gre_ipsec: {
      id: "gre_ipsec",
      name: "GRE over IPsec (Multicast/BGP)",
      carrier: "UDP Port 4500 / Proto 47",
      overheadBytes: 92,
      recommendedMss: 1360,
      meltdownRisk: false
    },
    openvpn_tcp: {
      id: "openvpn_tcp",
      name: "OpenVPN over TCP (Port 443)",
      carrier: "TCP Port 443",
      overheadBytes: 88,
      recommendedMss: 1340,
      meltdownRisk: true
    }
  };

  // Studio 2: Live Calculation Logic
  const encapsulationResult = useMemo(() => {
    const proto = protocolOverheads[selectedTunnelProto];
    const effectivePassenger = enableMssClamping
      ? Math.min(passengerPacketBytes, proto.recommendedMss)
      : passengerPacketBytes;

    const totalWireBytes = effectivePassenger + proto.overheadBytes;
    const isExceedingMtu = totalWireBytes > 1500;

    if (proto.meltdownRisk) {
      return {
        status: "MELTDOWN_HAZARD",
        verdict: "⚠️ TCP-OVER-TCP MELTDOWN RISK: Dual Retransmissions Detected!",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        totalWireBytes,
        overhead: proto.overheadBytes,
        effectivePassenger,
        carrier: proto.carrier,
        fragmentation: isExceedingMtu ? "YES (Exceeds 1500B Ethernet MTU)" : "NO (Within 1500B)",
        explanation: "Outer carrier is TCP Port 443. Packet loss will trigger exponential back-offs in both inner and outer TCP stacks, causing latency spikes and bufferbloat!"
      };
    } else if (isExceedingMtu) {
      return {
        status: "FRAGMENTATION_WARNING",
        verdict: "🚨 PMTU BLACKHOLE HAZARD: Packet Exceeds 1500B MTU!",
        badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
        totalWireBytes,
        overhead: proto.overheadBytes,
        effectivePassenger,
        carrier: proto.carrier,
        fragmentation: "YES (1500B exceeded - Packet fragmented or dropped!)",
        explanation: `Passenger packet (${effectivePassenger}B) + VPN overhead (${proto.overheadBytes}B) = ${totalWireBytes}B. Exceeds standard 1500B Ethernet MTU. Enable TCP MSS Clamping to fix!`
      };
    } else {
      return {
        status: "OPTIMAL",
        verdict: "✔ OPTIMAL ENCAPSULATION: Zero Fragmentation & High Throughput!",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        totalWireBytes,
        overhead: proto.overheadBytes,
        effectivePassenger,
        carrier: proto.carrier,
        fragmentation: "NO (100% Fits within 1500B Ethernet Frame)",
        explanation: `Packet successfully encapsulated without fragmentation. Total wire size: ${totalWireBytes} Bytes. Running on connectionless ${proto.carrier} transport.`
      };
    }
  }, [selectedTunnelProto, passengerPacketBytes, enableMssClamping]);

  // Studio 3: Performance Calculations
  const calculatedWanMetrics = useMemo(() => {
    const proto = protocolOverheads[selectedTunnelProto];
    // Overhead bandwidth percentage
    const overheadPercent = ((proto.overheadBytes / averagePacketSizeParam) * 100).toFixed(1);
    const usableBandwidthMbps = (carrierLinkSpeedMbps * (1 - Number(overheadPercent) / 100)).toFixed(0);

    // 5-Year Enterprise WAN Optimization & Gateway TCO (INR ₹ Lakhs)
    const centralGatewayHardwareLakhs = (Number(carrierLinkSpeedMbps) * 0.02 + 8.5).toFixed(2);
    const branchRoutersLakhs = (remoteBranchCountParam * 0.95).toFixed(2);
    const fiveYearTcoLakhs = (Number(centralGatewayHardwareLakhs) + Number(branchRoutersLakhs) + 4.5).toFixed(2);

    return {
      overheadPercent,
      usableBandwidthMbps,
      fiveYearTcoLakhs
    };
  }, [selectedTunnelProto, averagePacketSizeParam, carrierLinkSpeedMbps, remoteBranchCountParam]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_mtu_tuning: {
      id: "barrackpore_mtu_tuning",
      title: "Barrackpore Municipal Civic Portal PDF Download & SCADA MTU Tuning",
      location: "Barrackpore Municipal Hub to 6 Branch Revenue Centers",
      protocolStack: "Route-Based IPsec VTI + Automated TCP MSS Clamping @ 1360 Bytes",
      threatScenario: "Citizen tax PDF downloads froze indefinitely at 99% due to a Path MTU Blackhole caused by upstream ISP ICMP packet filtering.",
      solution: "Sukanta Hui, Mamata, and Mahima diagnosed the 1568-byte fragmentation issue and enforced `ip tcp adjust-mss 1360` across all central VTI interfaces.",
      outcome: "PDF download times plummeted from 15 seconds to 220ms; 0% packet fragmentation; 100% CERT-In compliance."
    },
    saltlake_wireguard_migration: {
      id: "saltlake_wireguard_migration",
      title: "Salt Lake Sector V Cloud Datacenter WireGuard Modernization",
      location: "Sector V Core Hub connecting 200 Hybrid Remote Engineers",
      protocolStack: "WireGuard UDP Port 51820 (32B Overhead / MTU 1420B)",
      threatScenario: "Legacy OpenVPN over TCP port 443 suffered catastrophic TCP-over-TCP meltdown during monsoon cellular connectivity fluctuations.",
      solution: "Abhronila, Susmita, and Debangshu migrated the remote workforce to UDP-based WireGuard tunnels with MTU clamped to 1420 bytes.",
      outcome: "Latency reduced by 82%; TCP retransmission storm completely eliminated; line-rate video calls maintained."
    }
  };

  const currentTier = protocolTiers[selectedTierKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Tunneling Concepts: Encapsulation &amp; Carrier Protocols
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the 3-layer tunneling hierarchy. Understand <strong className="text-sky-400">Passenger, Encapsulating &amp; Carrier Protocols</strong>, why <strong className="text-emerald-400">UDP is Mandatory</strong> to avoid <strong className="text-rose-400">TCP-over-TCP Meltdown</strong>, and how <strong className="text-purple-400">TCP MSS Clamping</strong> eliminates <strong className="text-amber-400">Path MTU Blackholes</strong>.
          </p>
        </header>

        {/* SECTION 1: 3-TIER HIERARCHY & MSS CLAMPING SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The 3-Tier Encapsulation Model &amp; Path MTU Resolution
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 3-layer packet nesting hierarchy on the left and the MTU fragmentation vs MSS clamping solution on the right.
            </p>
          </div>

          {/* SVG 1: 3-TIER HIERARCHY & MSS CLAMPING */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Passenger ➔ Encapsulating ➔ Carrier ➔ Path MTU MSS Clamping
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Packet Architecture &amp; MTU Tuning</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgTierModelId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="3-Tier Tunneling Hierarchy and MTU MSS Clamping Diagram"
              >
                {/* LEFT: 3-TIER PROTOCOL HIERARCHY */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  THE 3-TIER TUNNELING PACKET HIERARCHY
                </text>

                {/* LAYER 3: CARRIER PROTOCOL */}
                <rect x="35" y="58" width="360" height="42" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                <text x="215" y="76" fill="#c7d2fe" fontSize="8" fontWeight="bold" textAnchor="middle">
                  1. CARRIER PROTOCOL (Public Routable Transport)
                </text>
                <text x="215" y="92" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Public IP Header (203.0.113.88 ➔ 198.51.100.1) + UDP Port 4500 / 51820
                </text>

                {/* LAYER 2: ENCAPSULATING PROTOCOL */}
                <rect x="55" y="106" width="320" height="52" rx="4" fill="#082f49" stroke="#0284c7" />
                <text x="215" y="124" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  2. ENCAPSULATING PROTOCOL (Cryptographic Wrapper)
                </text>
                <text x="215" y="140" fill="#ffffff" fontSize="7" textAnchor="middle">
                  IPsec ESP Header (SPI: 0x100A, Seq: #42) + AEAD Auth Tag (HMAC)
                </text>
                <text x="215" y="152" fill="#fde68a" fontSize="6.5" textAnchor="middle">
                  Overhead: 32 Bytes (WireGuard) to 68 Bytes (IPsec ESP)
                </text>

                {/* LAYER 1: PASSENGER PROTOCOL */}
                <rect x="75" y="164" width="280" height="85" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="215" y="182" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
                  3. PASSENGER PROTOCOL (Private Payload)
                </text>
                <text x="215" y="198" fill="#ffffff" fontSize="7" textAnchor="middle">
                  Inner Private IP Header: 10.10.1.5 ➔ 10.20.1.50 (TCP/443)
                </text>
                <text x="215" y="214" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">
                  Citizen Tax Records / SCADA Modbus Command
                </text>
                <text x="215" y="235" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">
                  100% Encrypted &amp; Protected
                </text>

                {/* RIGHT: MTU HAZARD VS MSS CLAMPING */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  MTU OVERHEAD &amp; TCP MSS CLAMPING RESOLUTION
                </text>

                {/* MTU OVERHEAD HAZARD */}
                <rect x="455" y="58" width="175" height="185" rx="6" fill="#450a0a" stroke="#ef4444" />
                <text x="542" y="78" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Unclamped MTU Hazard
                </text>
                <text x="542" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Passenger Packet: 1500B</text>
                <text x="542" y="112" fill="#ffffff" fontSize="6.5" textAnchor="middle">• VPN Overhead: +68B</text>
                <text x="542" y="128" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="middle">
                  Total Wire: 1568 Bytes
                </text>
                <text x="542" y="146" fill="#fca5a5" fontSize="6.5" textAnchor="middle">• Exceeds 1500B MTU!</text>
                <text x="542" y="162" fill="#ffffff" fontSize="6.5" textAnchor="middle">• DF Bit Set = Dropped</text>
                <text x="542" y="185" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  PMTU BLACKHOLE!
                </text>
                <text x="542" y="225" fill="#fca5a5" fontSize="6.5" textAnchor="middle">
                  Downloads Freeze at 99%
                </text>

                {/* MSS CLAMPING SOLUTION */}
                <rect x="640" y="58" width="175" height="185" rx="6" fill="#064e3b" stroke="#10b981" />
                <text x="727" y="78" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  TCP MSS Clamped (1380B)
                </text>
                <text x="727" y="98" fill="#ffffff" fontSize="6.5" textAnchor="middle">• Clamped MSS: 1380B</text>
                <text x="727" y="112" fill="#ffffff" fontSize="6.5" textAnchor="middle">• IP/TCP Headers: +40B</text>
                <text x="727" y="126" fill="#ffffff" fontSize="6.5" textAnchor="middle">• VPN Overhead: +68B</text>
                <text x="727" y="144" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">
                  Total Wire: 1488 Bytes
                </text>
                <text x="727" y="162" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">• Fits inside 1500B MTU</text>
                <text x="727" y="185" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  0% FRAGMENTATION
                </text>
                <text x="727" y="225" fill="#34d399" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                  Fast &amp; Hitless Transfers
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: PROTOCOL TIERS MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Protocol Tiers &amp; Carrier Dynamics Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the 3-Tier Hierarchy, UDP vs TCP carrier transport dynamics, TCP Meltdown hazards, and MSS Clamping mechanics.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentTier.badgeColor)}>
              {currentTier.category}
            </span>
          </div>

          {/* Tier Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(protocolTiers).map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedTierKey(t.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedTierKey === t.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {t.title}
              </button>
            ))}
          </div>

          {/* Active Tier Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentTier.title}</h3>
                <span className="text-gray-400">Category: {currentTier.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentTier.badgeColor)}>
                Active Tier
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Technical Description:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentTier.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  🛡️ Architectural Advantage:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentTier.advantage}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-indigo-950/80 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  📜 Examples &amp; Protocols:
                </span>
                <p className="text-indigo-200 font-mono text-xs">{currentTier.examples}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentTier.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE ENCAPSULATION & MTU SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Encapsulation &amp; MTU/MSS Clamping Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Adjust passenger packet size and tunnel protocol to test MTU limits, TCP-over-TCP meltdown hazards, and MSS clamping auto-resolution.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              MTU Inspector Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Tunneling Protocol:</label>
              <select
                value={selectedTunnelProto}
                onChange={(e) => setSelectedTunnelProto(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                {Object.values(protocolOverheads).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.overheadBytes}B Overhead)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-300 font-semibold">
                <span>Passenger Packet Size:</span>
                <span className="text-sky-400 font-mono">{passengerPacketBytes} Bytes</span>
              </div>
              <input
                type="range"
                min="500"
                max="1500"
                step="20"
                value={passengerPacketBytes}
                onChange={(e) => setPassengerPacketBytes(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Router TCP MSS Clamping:</label>
              <button
                onClick={() => setEnableMssClamping(!enableMssClamping)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  enableMssClamping
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-md shadow-emerald-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              &gt;
                {enableMssClamping ? `✔ MSS Clamped @ ${protocolOverheads[selectedTunnelProto].recommendedMss}B` : "❌ Unclamped (Raw 1500B Packets)"}
              </button>
            </div>
          </div>

          {/* Encapsulation Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Encapsulated Wire Calculation:
                </span>
                <span className="text-white font-bold text-sm">
                  Passenger ({encapsulationResult.effectivePassenger}B) + VPN Overhead ({encapsulationResult.overhead}B) = {encapsulationResult.totalWireBytes} Bytes
                </span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                encapsulationResult.badgeColor
              )}>
                {encapsulationResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">Carrier Transport &amp; Wire Size:</span>
                <div className="text-gray-300 text-xs">Carrier: {encapsulationResult.carrier}</div>
                <div className="text-gray-300 text-xs">Total Wire Size: {encapsulationResult.totalWireBytes} / 1500 Bytes</div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold text-[11px] block">Fragmentation Status:</span>
                <div className="text-gray-300 text-xs">{encapsulationResult.fragmentation}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                Engineering Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed font-sans">{encapsulationResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: TUNNEL ENCAPSULATION CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Tunnel Encapsulation &amp; MTU Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation calculating protocol overheads, detecting MTU fragmentation violations, and simulating TCP-over-TCP meltdown.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              tunnel_encapsulation_sim.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="tunnel_encapsulation_sim.py"
            highlightLines={[18, 30, 42, 58]}
          />
        </section>

        {/* STUDIO 3: WAN BANDWIDTH & OVERHEAD SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Carrier Throughput, Latency &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate effective usable bandwidth, protocol overhead percentage, and 5-year WAN optimization &amp; gateway TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              WAN Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Carrier Link Speed:</span>
                <span className="text-sky-400 font-bold">{carrierLinkSpeedMbps} Mbps</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={carrierLinkSpeedMbps}
                onChange={(e) => setCarrierLinkSpeedMbps(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Average Packet Size:</span>
                <span className="text-purple-400 font-bold">{averagePacketSizeParam} Bytes</span>
              </div>
              <input
                type="range"
                min="256"
                max="1420"
                step="64"
                value={averagePacketSizeParam}
                onChange={(e) => setAveragePacketSizeParam(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Remote Branch Sites:</span>
                <span className="text-emerald-400 font-bold">{remoteBranchCountParam} Branches</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={remoteBranchCountParam}
                onChange={(e) => setRemoteBranchCountParam(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              /&gt;
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Header Overhead Penalty</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedWanMetrics.overheadPercent}% Bandwidth</div>
              <span className="text-[10px] text-gray-500 block">Based on packet size distribution</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Effective Usable Speed</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedWanMetrics.usableBandwidthMbps} Mbps</div>
              <span className="text-[10px] text-gray-500 block">Payload throughput after encapsulation</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year WAN TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedWanMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Core Gateway + Branch Edge Routers</span>
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
              &gt;
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Stack: {currentDrill.protocolStack}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical MTU Optimization:</span>
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
                <span>The 3-layer tunneling model consists of Passenger Protocol, Encapsulating Protocol, and Carrier Protocol.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>UDP is the mandatory carrier protocol for high-performance VPNs to avoid TCP-over-TCP meltdown.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>TCP-over-TCP meltdown causes catastrophic latency spikes due to dual retransmission timers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>VPN encapsulation adds 32 to 92 bytes of overhead, requiring MSS clamping to 1360–1420 bytes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Path MTU Blackhole occurs when oversized packets with the DF bit set are dropped silently by routers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all VPN gateway connection logs and transmission parameters.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Tunneling Concepts &amp; Carrier Protocols FAQs"
            subtitle="30 In-depth Practice Questions &amp; Encapsulation Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Tunneling Concepts &amp; Carrier Protocols (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 4 demystifies the mechanics of packet encapsulation! Always remember the 3-layer rule: Passenger (your private IP data), Encapsulating (IPsec ESP / WireGuard), and Carrier (Public UDP transport). Never run TCP as the outer carrier protocol unless absolutely forced by restrictive firewalls, as TCP-over-TCP meltdown will cause catastrophic connection stalls. Furthermore, remember that VPN encapsulation adds 32–92 bytes of overhead; always configure TCP MSS clamping (`ip tcp adjust-mss 1360` to 1380) on your edge routers to eliminate Path MTU blackhole drops! In Topic 5, we will explore IPsec VPNs: Tunnel Mode vs Transport Mode!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic4;
