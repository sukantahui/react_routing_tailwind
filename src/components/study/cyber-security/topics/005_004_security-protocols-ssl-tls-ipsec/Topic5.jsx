import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import ipsecFrameworkAuditorPy from "./topic5_files/ipsec_framework_auditor.py?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgSpdEngineId = useId();
  const svgEncapsulationId = useId();
  const svgReplayWindowId = useId();

  // =========================================================================
  // STUDIO 1 STATE: SPD / SAD PACKET POLICY SIMULATOR
  // =========================================================================
  const [selectedSpdScenario, setSelectedSpdScenario] = useState("tunnel_protect");

  const spdScenarios = {
    tunnel_protect: {
      title: "1. Corporate Subnet Interconnect (Barrackpore ➔ Kolkata)",
      srcIp: "10.14.2.15",
      dstIp: "10.20.8.44",
      protocol: "TCP (Port 1433 - SQL)",
      spdAction: "PROTECT",
      spdRule: "MATCH: Src=10.14.0.0/16 ➔ Dst=10.20.0.0/16 [PROTECT]",
      sadSpi: "0x88AF1901",
      sadMode: "TUNNEL (ESP)",
      cipherSuite: "AES-256-GCM + ICV-128",
      verdict: "ENCAPSULATE & ENCRYPT: Ingested packet wrapped in New Outer IP (203.0.113.10 ➔ 198.51.100.20) + ESP Header.",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    },
    host_transport: {
      title: "2. Internal Server Host-to-Host (Ichapur DB Cluster)",
      srcIp: "192.168.1.10",
      dstIp: "192.168.1.88",
      protocol: "TCP (Port 5432 - Postgres)",
      spdAction: "PROTECT",
      spdRule: "MATCH: Src=192.168.1.10/32 ➔ Dst=192.168.1.88/32 [PROTECT]",
      sadSpi: "0x4A1F89BC",
      sadMode: "TRANSPORT (ESP)",
      cipherSuite: "AES-256-GCM + ICV-128",
      verdict: "PAYLOAD ENCRYPT: Original IP header preserved; ESP header inserted before TCP payload. Low overhead.",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    dns_bypass: {
      title: "3. Public DNS Resolution (Google Public DNS)",
      srcIp: "10.14.2.15",
      dstIp: "8.8.8.8",
      protocol: "UDP (Port 53 - DNS)",
      spdAction: "BYPASS",
      spdRule: "MATCH: Src=10.14.0.0/16 ➔ Dst=8.8.8.8/32 [BYPASS]",
      sadSpi: "N/A (No SA)",
      sadMode: "NONE (Plaintext Pass-through)",
      cipherSuite: "None (Direct Forwarding)",
      verdict: "BYPASS IPSEC: Packet forwarded immediately in cleartext without IPsec encapsulation overhead.",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    unauthorized_discard: {
      title: "4. Unauthorized Rogue Subnet Range (Default-Deny Catch-All)",
      srcIp: "10.14.2.15",
      dstIp: "198.51.100.99",
      protocol: "UDP (Port 69 - TFTP)",
      spdAction: "DISCARD",
      spdRule: "MATCH: Catch-All Fallback Rule ➔ [DISCARD]",
      sadSpi: "NONE",
      sadMode: "NONE",
      cipherSuite: "None (Drop Counter Incremented)",
      verdict: "DISCARD & LOG: Packet matches default-deny rule; dropped immediately to prevent plaintext WAN leakage.",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    }
  };

  const currentSpd = spdScenarios[selectedSpdScenario];

  // =========================================================================
  // STUDIO 2 STATE: PACKET ENCAPSULATION INSPECTOR (TRANSPORT VS TUNNEL)
  // =========================================================================
  const [encapsulationMode, setEncapsulationMode] = useState("tunnel"); // "transport", "tunnel"
  const [enableNatT, setEnableNatT] = useState(false);

  const overheadDetails = useMemo(() => {
    if (encapsulationMode === "transport") {
      const origIp = 20;
      const espHeader = 8; // SPI (4) + Seq (4)
      const espIv = 8;     // AES-GCM IV
      const payload = 1400;
      const espTrailer = 2; // Pad Len (1) + NextHdr (1)
      const espIcv = 16;   // ICV Tag
      const totalOverhead = espHeader + espIv + espTrailer + espIcv + (enableNatT ? 8 : 0);
      const totalPacketSize = origIp + totalOverhead + payload;
      return {
        modeName: "Transport Mode (Host-to-Host)",
        origIp,
        newOuterIp: 0,
        espHeader,
        espIv,
        payload,
        espTrailer,
        espIcv,
        natTHeader: enableNatT ? 8 : 0,
        totalOverhead,
        totalPacketSize,
        maxSafeMss: 1500 - origIp - totalOverhead - 20, // 20 TCP
        description: "Secures host-to-host communications. Original IP header is untouched; ESP header is inserted before TCP segment."
      };
    } else {
      const origIp = 20;
      const newOuterIp = 20;
      const espHeader = 8;
      const espIv = 8;
      const payload = 1400; // Inner IP (20) + TCP (20) + Data (1360)
      const espTrailer = 2;
      const espIcv = 16;
      const natTHeader = enableNatT ? 8 : 0;
      const totalOverhead = newOuterIp + espHeader + espIv + espTrailer + espIcv + natTHeader;
      const totalPacketSize = totalOverhead + payload;
      return {
        modeName: "Tunnel Mode (Gateway-to-Gateway / Site-to-Site)",
        origIp,
        newOuterIp,
        espHeader,
        espIv,
        payload,
        espTrailer,
        espIcv,
        natTHeader,
        totalOverhead,
        totalPacketSize,
        maxSafeMss: 1500 - totalOverhead - 20 - 20, // 20 outer IP, 20 inner IP, 20 TCP
        description: "Secures entire subnets across public WANs. Entire original IP packet is encrypted and nested in a brand-new outer IP header."
      };
    }
  }, [encapsulationMode, enableNatT]);

  // =========================================================================
  // STUDIO 3 STATE: 64-BIT ANTI-REPLAY SLIDING WINDOW SIMULATOR
  // =========================================================================
  const [windowMaxSeq, setWindowMaxSeq] = useState(100);
  const [windowBitmask, setWindowBitmask] = useState(() => {
    // Initial bitmask with some received packets in the range [37..100]
    let mask = 0n;
    // Mark packet 100, 99, 95, 90, 85, 70, 50 as received
    [100, 99, 95, 90, 85, 70, 50].forEach((seq) => {
      const offset = 100 - seq;
      if (offset &ge; 0 && offset < 64) {
        mask |= 1n << BigInt(offset);
      }
    });
    return mask;
  });
  const [replayHistory, setReplayHistory] = useState([
    { seq: 100, status: "ACCEPTED", reason: "Window advanced (New Head)", time: "18:10:00" },
    { seq: 95, status: "ACCEPTED", reason: "Within window, marked bitmask", time: "18:10:02" },
    { seq: 95, status: "REJECTED", reason: "DUPLICATE: Replay attack detected (Bit 5 already 1)", time: "18:10:05" },
    { seq: 30, status: "REJECTED", reason: "EXPIRED: Sequence < Window Tail (30 < 37)", time: "18:10:08" }
  ]);
  const [inputSeqNumber, setInputSeqNumber] = useState(105);

  const windowTail = Math.max(1, windowMaxSeq - 63);

  const handleInjectSequence = (seqToInject) => {
    const seq = Number(seqToInject);
    if (isNaN(seq) || seq &le; 0) return;

    const timeString = new Date().toLocaleTimeString();

    if (seq &gt; windowMaxSeq) {
      const diff = seq - windowMaxSeq;
      let newMask;
      if (diff < 64) {
        newMask = (windowBitmask << BigInt(diff)) | 1n;
      } else {
        newMask = 1n;
      }
      setWindowBitmask(newMask);
      setWindowMaxSeq(seq);
      setReplayHistory((prev) => [
        { seq, status: "ACCEPTED", reason: `Window advanced (New Head: ${seq})`, time: timeString },
        ...prev.slice(0, 7)
      ]);
    } else if (seq < windowTail) {
      setReplayHistory((prev) => [
        { seq, status: "REJECTED", reason: `EXPIRED: Below window tail (${seq} < ${windowTail})`, time: timeString },
        ...prev.slice(0, 7)
      ]);
    } else {
      const offset = windowMaxSeq - seq;
      const bit = (windowBitmask >&gt; BigInt(offset)) & 1n;
      if (bit === 1n) {
        setReplayHistory((prev) => [
          { seq, status: "REJECTED", reason: `DUPLICATE: Replay packet dropped (Offset ${offset} already seen)`, time: timeString },
          ...prev.slice(0, 7)
        ]);
      } else {
        const newMask = windowBitmask | (1n << BigInt(offset));
        setWindowBitmask(newMask);
        setReplayHistory((prev) => [
          { seq, status: "ACCEPTED", reason: `In-Window: Sequence accepted & bit ${offset} marked`, time: timeString },
          ...prev.slice(0, 7)
        ]);
      }
    }
  };

  const handleResetReplayWindow = () => {
    setWindowMaxSeq(100);
    let mask = 0n;
    [100, 99, 95, 90, 85, 70, 50].forEach((seq) => {
      const offset = 100 - seq;
      if (offset &ge; 0 && offset < 64) {
        mask |= 1n << BigInt(offset);
      }
    });
    setWindowBitmask(mask);
    setReplayHistory([
      { seq: 100, status: "ACCEPTED", reason: "Window reset to Seq=100", time: new Date().toLocaleTimeString() }
    ]);
  };

  // =========================================================================
  // STUDIO 4 STATE: REGIONAL SOC CASE STUDIES
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_kolkata_site_to_site");

  const regionalDrills = {
    barrackpore_kolkata_site_to_site: {
      id: "barrackpore_kolkata_site_to_site",
      title: "Barrackpore Treasury ➔ Kolkata FinTech Core: Site-to-Site IPsec VPN",
      location: "Connecting North 24 Parganas Treasury Hub to Salt Lake Sector V FinTech Center",
      topology: "Gateway-to-Gateway Tunnel Mode (AES-256-GCM + IKEv2)",
      actors: "Susmita (Barrackpore SecOps Lead) & Mamata (Kolkata Network Architect)",
      threatScenario:
        "Adversaries monitoring WAN dark fiber leased lines attempted traffic flow analysis, packet sniffing, and replaying financial batch transfer requests worth ₹45,00,000.",
      solution:
        "Deployed strongSwan IKEv2 ESP Tunnel Mode with AES-256-GCM AEAD, 64-bit Anti-Replay window, and TCP MSS clamped to 1360 bytes in iptables.",
      outcome:
        "100% internal IP address confidentiality; all replayed packets dropped at kernel layer; zero MTU black holes during multi-gigabit banking sync."
    },
    ichapur_internal_db_transport: {
      id: "ichapur_internal_db_transport",
      title: "Ichapur Defense Pension Hub: Host-to-Host Transport Mode Cluster",
      location: "High-security internal datacenter in Ichapur housing 12 application nodes & database cluster",
      topology: "Host-to-Host Transport Mode (In-Kernel XFRM)",
      actors: "Debangshu (Systems Admin) & Mahima (Cryptographic Engineer)",
      threatScenario:
        "Internal rogue contractors on the internal server VLAN attempted ARP spoofing and switch port mirroring to intercept database queries containing pension account balances.",
      solution:
        "Configured Linux native XFRM IPsec Transport Mode directly between web application nodes (192.168.1.10) and PostgreSQL database (192.168.1.88).",
      outcome:
        "Internal sniffing rendered completely useless; zero outer IP encapsulation overhead; wire-speed hardware crypto offloading with AES-NI."
    },
    jadavpur_academic_natt: {
      id: "jadavpur_academic_natt",
      title: "Jadavpur University AI Grid: NAT-Traversal (UDP 4500) Deployment",
      location: "Campus-wide distributed GPU computing cluster across CGNAT and carrier firewalls",
      topology: "Remote Access / Branch IPsec with NAT-T (UDP 4500)",
      actors: "Sukanta Hui (Lead Instructor) & Research Scholars",
      threatScenario:
        "Carrier-Grade NAT (CGNAT) routers were corrupting standard ESP (Protocol 50) packets due to lack of Layer 4 port numbers, severing cluster telemetry.",
      solution:
        "Enabled automatic IKEv2 NAT-Detection (NAT-D) and UDP Port 4500 encapsulation, allowing IPsec ESP packets to pass through multiple nested stateful NATs.",
      outcome:
        "Seamless connectivity across campus NAT routers; stable 24/7 research cluster synchronization."
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
            <span>🛡️ Module 005_004 • Topic 5</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            IPsec Architecture: Network Layer Security Framework
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the RFC 4301 IP Security framework: OSI Layer 3 placement, Security Policy &amp; Association Databases (SPD/SAD/PAD),
            Transport vs Tunnel mode encapsulation, and RFC 4303 Anti-Replay sliding windows.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              RFC 4301 Architecture
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              SPD • SAD • PAD
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Transport vs Tunnel Mode
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              64-Bit Anti-Replay Window
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Linux XFRM Kernel Subsystem
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
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🌐
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The IPsec Architectural Framework (RFC 4301)
              </h2>
              <p className="text-sm text-slate-400">
                Understanding how Network Layer (Layer 3) security delivers transparent, line-rate protection for all IP communications
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In enterprise cybersecurity across <strong className="text-cyan-300">Barrackpore</strong>,{" "}
              <strong className="text-cyan-300">Kolkata</strong>, and <strong className="text-cyan-300">Ichapur</strong>,{" "}
              <strong className="text-white">IP Security (IPsec)</strong> represents the gold standard for Network Layer (Layer 3)
              cryptographic protection. Unlike TLS (which operates at Layer 4/7 and requires application support), IPsec is
              implemented directly within the operating system kernel, securing <em>every</em> upper-layer protocol (TCP, UDP, ICMP, BGP, OSPF)
              completely transparently to running software.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-700/50 transition-all duration-300">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🔒</span> 1. Confidentiality &amp; Integrity
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bulk symmetric encryption (AES-256-GCM, ChaCha20-Poly1305) paired with cryptographic integrity checks
                  (ICV tags) to prevent eavesdropping and unauthorized packet manipulation.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-indigo-700/50 transition-all duration-300">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>⏱️</span> 2. Anti-Replay Sliding Window
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Monotonically incrementing sequence numbers verified against a 64-bit sliding window bitmap in the kernel,
                  silently dropping recorded duplicate packets captured on public transit lines.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-emerald-700/50 transition-all duration-300">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🗄️</span> 3. Triple Database Engine
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Decoupled control and data planes: <strong>SPD</strong> (traffic policies), <strong>SAD</strong> (active keys and SPIs),
                  and <strong>PAD</strong> (peer identity authorization).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE SPD / SAD / PAD KERNEL POLICY ENGINE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⚙️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Kernel Packet Flow &amp; SPD/SAD Policy Engine
                </h2>
                <p className="text-sm text-slate-400">
                  Simulate RFC 4301 packet selector evaluation, SPD action triggering, and SAD Security Parameter Index (SPI) lookups
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
              RFC 4301 Engine
            </span>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(spdScenarios).map(([key, item]) => {
              const isActive = selectedSpdScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSpdScenario(key)}
                  className={clsx(
                    "text-left p-3.5 rounded-xl border transition-all duration-200 text-xs flex flex-col justify-between gap-1.5",
                    isActive
                      ? "bg-cyan-950/70 border-cyan-500 text-white shadow-lg shadow-cyan-950/50"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  )}
                &gt;
                  <span className="font-semibold">{item.title}</span>
                  <span className={clsx("text-[10px] px-2 py-0.5 rounded w-fit border", item.badgeColor)}>
                    Action: {item.spdAction}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Packet Flow Simulator SVG */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2.5">
              <span><strong>Ingested Packet:</strong> Src={currentSpd.srcIp} ➔ Dst={currentSpd.dstIp} ({currentSpd.protocol})</span>
              <span className="font-mono text-cyan-400">Kernel Hook: PRE_ROUTING / XFRM_LOOKUP</span>
            </div>

            <svg
              id={svgSpdEngineId}
              viewBox="0 0 900 240"
              className="w-full h-auto rounded-lg bg-slate-900/60 border border-slate-800/80 shadow-inner"
            >
              {/* Step 1: Ingested Packet */}
              <g transform="translate(30, 40)">
                <rect width="180" height="150" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="90" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                  1. Raw IP Packet
                </text>
                <line x1="15" y1="42" x2="165" y2="42" stroke="#334155" strokeWidth="1" />
                <text x="25" y="65" fill="#38bdf8" fontSize="11" fontFamily="monospace">Src: {currentSpd.srcIp}</text>
                <text x="25" y="88" fill="#38bdf8" fontSize="11" fontFamily="monospace">Dst: {currentSpd.dstIp}</text>
                <text x="25" y="111" fill="#cbd5e1" fontSize="10">Proto: {currentSpd.protocol}</text>
                <rect x="25" y="125" width="130" height="18" rx="4" fill="#1e293b" />
                <text x="90" y="138" textAnchor="middle" fill="#a5f3fc" fontSize="9">User Data Payload</text>
              </g>

              {/* Connecting Arrow 1 */}
              <path d="M 215 115 L 265 115" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrowCyan)" />

              {/* Step 2: SPD Policy Lookup */}
              <g transform="translate(270, 30)">
                <rect width="200" height="170" rx="10" fill="#0b1329" stroke="#0284c7" strokeWidth="2" />
                <text x="100" y="26" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                  2. SPD Selector Engine
                </text>
                <line x1="15" y1="36" x2="185" y2="36" stroke="#0369a1" strokeWidth="1" />
                <text x="20" y="56" fill="#94a3b8" fontSize="10">Checking 5-tuple policies...</text>

                {/* SPD Evaluation Box */}
                <rect
                  x="15"
                  y="68"
                  width="170"
                  height="70"
                  rx="6"
                  fill={currentSpd.spdAction === "PROTECT" ? "#064e3b" : currentSpd.spdAction === "BYPASS" ? "#78350f" : "#881337"}
                  stroke={currentSpd.spdAction === "PROTECT" ? "#10b981" : currentSpd.spdAction === "BYPASS" ? "#f59e0b" : "#f43f5e"}
                  strokeWidth="1.5"
                />
                <text x="100" y="90" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                  ACTION: {currentSpd.spdAction}
                </text>
                <text x="100" y="110" textAnchor="middle" fill="#e2e8f0" fontSize="9">
                  {currentSpd.spdAction === "PROTECT" ? "Apply SA Cryptography" : currentSpd.spdAction === "BYPASS" ? "Cleartext Forwarding" : "Drop at Kernel Interface"}
                </text>
                <text x="100" y="126" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                  Mode: {currentSpd.sadMode}
                </text>

                <text x="100" y="155" textAnchor="middle" fill="#64748b" fontSize="9">RFC 4301 Policy Match</text>
              </g>

              {/* Connecting Arrow 2 */}
              <path d="M 475 115 L 525 115" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />

              {/* Step 3: SAD Query & Outcome */}
              <g transform="translate(530, 40)">
                <rect width="335" height="150" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="167" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                  3. SAD State &amp; Kernel Dispatch
                </text>
                <line x1="15" y1="42" x2="320" y2="42" stroke="#334155" strokeWidth="1" />

                <text x="25" y="66" fill="#cbd5e1" fontSize="11">
                  <tspan fontWeight="bold" fill="#38bdf8">SPI:</tspan> {currentSpd.sadSpi}
                </text>
                <text x="25" y="88" fill="#cbd5e1" fontSize="11">
                  <tspan fontWeight="bold" fill="#38bdf8">Cipher:</tspan> {currentSpd.cipherSuite}
                </text>
                <text x="25" y="110" fill="#cbd5e1" fontSize="11">
                  <tspan fontWeight="bold" fill="#38bdf8">SA Mode:</tspan> {currentSpd.sadMode}
                </text>

                <rect
                  x="20"
                  y="120"
                  width="295"
                  height="22"
                  rx="4"
                  fill={currentSpd.spdAction === "PROTECT" ? "#064e3b" : currentSpd.spdAction === "BYPASS" ? "#78350f" : "#881337"}
                />
                <text x="167" y="135" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  {currentSpd.spdAction === "PROTECT" ? "✔ INJECTED INTO IPSEC TUNNEL" : currentSpd.spdAction === "BYPASS" ? "➔ FORWARDED IN CLEARTEXT" : "❌ SILENTLY DROPPED (DISCARD)"}
                </text>
              </g>

              {/* Arrow definitions */}
              <defs>
                <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
              </defs>
            </svg>

            {/* Explanatory Banner */}
            <div className={clsx("p-4 rounded-xl border text-xs leading-relaxed space-y-1.5", currentSpd.badgeColor)}>
              <div className="font-bold flex items-center gap-2">
                <span>⚡ Security Verdict:</span>
                <span>{currentSpd.verdict}</span>
              </div>
              <p className="opacity-90">
                <strong>Policy Selector:</strong> <code>{currentSpd.spdRule}</code>
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: PACKET ENCAPSULATION INSPECTOR (TRANSPORT VS TUNNEL) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                📦
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 2: Packet Encapsulation &amp; Byte-Level Overhead Inspector
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect the physical wire anatomy of Transport Mode vs Tunnel Mode packets with MTU/MSS impact metrics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEncapsulationMode(encapsulationMode === "transport" ? "tunnel" : "transport")}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950 border border-cyan-700 text-cyan-300 hover:bg-cyan-900 transition-colors"
              &gt;
                Switch to {encapsulationMode === "transport" ? "Tunnel Mode" : "Transport Mode"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={enableNatT}
                onChange={(e) => setEnableNatT(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              /&gt;
              <span className="text-slate-300">Enable NAT-Traversal (NAT-T / UDP Port 4500: +8 Bytes)</span>
            </label>
            <span className="text-slate-400">
              Current Mode: <strong className="text-cyan-300">{overheadDetails.modeName}</strong>
            </span>
          </div>

          {/* Byte Breakdown Visualizer */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            <p className="text-xs text-slate-400 leading-relaxed">
              {overheadDetails.description}
            </p>

            {/* Wire Anatomy Graphic */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Wire Packet Layout ({overheadDetails.totalPacketSize} Bytes Total):
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                {encapsulationMode === "tunnel" && (
                  <div className="bg-blue-950 border border-blue-600 text-blue-300 p-2.5 rounded-lg flex-1 min-w-[130px] text-center">
                    <div className="font-bold">New Outer IP</div>
                    <div className="text-[10px] text-blue-400">20 Bytes (Public)</div>
                    <div className="text-[9px] text-slate-400">Proto: {enableNatT ? "17 (UDP)" : "50 (ESP)"}</div>
                  </div>
                )}

                {enableNatT && (
                  <div className="bg-purple-950 border border-purple-600 text-purple-300 p-2.5 rounded-lg flex-1 min-w-[110px] text-center">
                    <div className="font-bold">UDP (NAT-T)</div>
                    <div className="text-[10px] text-purple-400">8 Bytes</div>
                    <div className="text-[9px] text-slate-400">Port 4500</div>
                  </div>
                )}

                {encapsulationMode === "transport" && (
                  <div className="bg-blue-950 border border-blue-600 text-blue-300 p-2.5 rounded-lg flex-1 min-w-[130px] text-center">
                    <div className="font-bold">Original IP</div>
                    <div className="text-[10px] text-blue-400">20 Bytes (Host)</div>
                    <div className="text-[9px] text-slate-400">Proto: {enableNatT ? "17 (UDP)" : "50 (ESP)"}</div>
                  </div>
                )}

                <div className="bg-cyan-950 border border-cyan-600 text-cyan-300 p-2.5 rounded-lg flex-1 min-w-[130px] text-center">
                  <div className="font-bold">ESP Header</div>
                  <div className="text-[10px] text-cyan-400">16 Bytes (SPI+Seq+IV)</div>
                  <div className="text-[9px] text-slate-400">Plaintext on Wire</div>
                </div>

                <div className="bg-emerald-950 border border-emerald-600 text-emerald-300 p-2.5 rounded-lg flex-[2] min-w-[180px] text-center shadow-lg shadow-emerald-950/40">
                  <div className="font-bold">🔒 ENCRYPTED PAYLOAD</div>
                  <div className="text-[10px] text-emerald-400">
                    {encapsulationMode === "tunnel" ? "Inner IP (20B) + TCP (20B) + Data" : "TCP Segment (20B) + Data"}
                  </div>
                  <div className="text-[9px] text-slate-300">AES-256-GCM Ciphertext</div>
                </div>

                <div className="bg-amber-950 border border-amber-600 text-amber-300 p-2.5 rounded-lg flex-1 min-w-[110px] text-center">
                  <div className="font-bold">ESP Trailer</div>
                  <div className="text-[10px] text-amber-400">2-18 Bytes</div>
                  <div className="text-[9px] text-slate-400">Pad + NextHdr</div>
                </div>

                <div className="bg-rose-950 border border-rose-600 text-rose-300 p-2.5 rounded-lg flex-1 min-w-[120px] text-center">
                  <div className="font-bold">ICV Auth Tag</div>
                  <div className="text-[10px] text-rose-400">16 Bytes</div>
                  <div className="text-[9px] text-slate-400">GMAC-128 Tag</div>
                </div>
              </div>
            </div>

            {/* Calculations & MTU Clamping Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-slate-400 text-xs">Total IPsec Overhead</div>
                <div className="text-xl font-extrabold text-cyan-400 font-mono">+{overheadDetails.totalOverhead} Bytes</div>
                <div className="text-[10px] text-slate-500">Added to each packet</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-slate-400 text-xs">Recommended TCP MSS Clamp</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono">{overheadDetails.maxSafeMss} Bytes</div>
                <div className="text-[10px] text-slate-500">Prevents MTU Black Holes</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center space-y-1">
                <div className="text-slate-400 text-xs">Outer Transit Visibility</div>
                <div className="text-base font-bold text-white">
                  {encapsulationMode === "tunnel" ? "Gateway IPs Only" : "Host IPs Exposed"}
                </div>
                <div className="text-[10px] text-slate-500">
                  {encapsulationMode === "tunnel" ? "Topologies Hidden" : "Direct Host Addressable"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: 64-BIT ANTI-REPLAY SLIDING WINDOW SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                ⏱️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 3: 64-Bit Anti-Replay Sliding Window Simulator (RFC 4303)
                </h2>
                <p className="text-sm text-slate-400">
                  Interactive simulation of sequence number verification, window advancement, and replay attack dropping
                </p>
              </div>
            </div>
            <button
              onClick={handleResetReplayWindow}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Reset Window (Seq=100)
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
            {/* Sequence Controller Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-300 font-semibold">Test Sequence #:</label>
                <input
                  type="number"
                  value={inputSeqNumber}
                  onChange={(e) => setInputSeqNumber(Number(e.target.value))}
                  className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono focus:border-cyan-500 focus:outline-none"
                /&gt;
              </div>

              <button
                onClick={() => handleInjectSequence(inputSeqNumber)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
              &gt;
                Inject Packet ➔
              </button>

              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => handleInjectSequence(windowMaxSeq + 1)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                &gt;
                  +1 Advance ({windowMaxSeq + 1})
                </button>
                <button
                  onClick={() => handleInjectSequence(windowMaxSeq + 5)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                &gt;
                  +5 Jump ({windowMaxSeq + 5})
                </button>
                <button
                  onClick={() => handleInjectSequence(windowMaxSeq)}
                  className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-800 hover:bg-rose-900 text-rose-300 text-[11px]"
                &gt;
                  Replay Head ({windowMaxSeq})
                </button>
                <button
                  onClick={() => handleInjectSequence(Math.max(1, windowTail - 5))}
                  className="px-2.5 py-1 rounded bg-rose-950/80 border border-rose-800 hover:bg-rose-900 text-rose-300 text-[11px]"
                &gt;
                  Expired Old ({Math.max(1, windowTail - 5)})
                </button>
              </div>
            </div>

            {/* Sliding Window Visual Grid */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">
                  Window Tail: <strong className="text-amber-400 font-mono">{windowTail}</strong>
                </span>
                <span className="text-cyan-300">
                  64-Packet Sliding Range: [{windowTail} ... {windowMaxSeq}]
                </span>
                <span className="text-slate-400">
                  Window Head (SeqMax): <strong className="text-emerald-400 font-mono">{windowMaxSeq}</strong>
                </span>
              </div>

              {/* 64-Cell Bitmask Matrix */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>← Window Tail (Older Sequences)</span>
                  <span className="font-mono text-cyan-400">Kernel Bitmask Matrix (1 = Seen/Received, 0 = Pending)</span>
                  <span>Window Head (Newest) →</span>
                </div>

                <div className="grid grid-cols-16 sm:grid-cols-32 gap-1">
                  {Array.from({ length: 64 }).map((_, idx) => {
                    // idx 0 corresponds to windowTail (offset 63), idx 63 corresponds to windowMaxSeq (offset 0)
                    const offset = 63 - idx;
                    const seqNum = windowMaxSeq - offset;
                    const isReceived = (windowBitmask >> BigInt(offset)) & 1n;
                    return (
                      <div
                        key={idx}
                        title={`Seq: ${seqNum} | Bit: ${isReceived ? "1 (Seen)" : "0 (Unseen)"}`}
                        className={clsx(
                          "h-6 rounded flex items-center justify-center text-[8px] font-mono font-bold transition-all duration-200 cursor-help",
                          isReceived
                            ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/50"
                            : "bg-slate-950 border border-slate-800 text-slate-600 hover:border-slate-600"
                        )}
                      >
                        {isReceived ? "1" : "0"}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Packet Log Feed */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Live Anti-Replay Evaluation Log:
              </div>
              <div className="space-y-1.5">
                {replayHistory.map((entry, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "flex flex-wrap items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all",
                      entry.status === "ACCEPTED"
                        ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-300"
                        : "bg-rose-950/40 border-rose-800/80 text-rose-300"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{entry.status === "ACCEPTED" ? "✔ ACCEPTED" : "❌ DROPPED"}</span>
                      <span>[Seq: {entry.seq}]</span>
                      <span className="text-slate-300 font-sans">{entry.reason}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{entry.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS & LINUX XFRM AUDITING SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional SOC Case Studies &amp; Linux XFRM Audit Lab
                </h2>
                <p className="text-sm text-slate-400">
                  Analyze real-world IPsec gateway engineering in West Bengal infrastructure and inspect native Linux kernel XFRM state
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
                &gt;
                  <span className="font-bold">{drill.title}</span>
                  <span className="text-[10px] text-cyan-400">{drill.topology}</span>
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
                Engineers: {currentDrill.actors}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span>🚨</span> Threat Vector &amp; Attack Surface:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <span>🛠️</span> Cryptographic Solution Deployed:
                </div>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-800/80 p-3.5 rounded-xl text-xs text-emerald-300 leading-relaxed flex items-center gap-2">
              <span>✔</span>
              <span><strong>Operational Outcome:</strong> {currentDrill.outcome}</span>
            </div>

            {/* Linux XFRM CLI Terminal Mockup */}
            <div className="mt-4 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-slate-300 text-[11px]">
                <span>terminal@barrackpore-gateway: ~ (Linux Kernel XFRM State)</span>
                <span className="text-cyan-400">ip xfrm state show</span>
              </div>
              <div className="p-4 space-y-3 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                <div>
                  <span className="text-emerald-400 font-bold">$ sudo ip xfrm state show</span>
                </div>
                <div className="text-slate-400">
                  src 203.0.113.10 dst 198.51.100.20<br />
                  &nbsp;&nbsp;proto esp spi <span className="text-cyan-300">0x88af1901</span> reqid 1 mode tunnel<br />
                  &nbsp;&nbsp;replay-window <span className="text-amber-300">64</span> flag esn<br />
                  &nbsp;&nbsp;aead <span className="text-emerald-300">rfc4106(gcm(aes))</span> 0x8f3c9a...128<br />
                  &nbsp;&nbsp;anti-replay context: seq 0x64, oseq 0x0, bitmap 0x0000000000000001<br />
                  &nbsp;&nbsp;sel src 10.14.0.0/16 dst 10.20.0.0/16
                </div>
                <div className="pt-1">
                  <span className="text-emerald-400 font-bold">$ sudo ip xfrm policy show</span>
                </div>
                <div className="text-slate-400">
                  src 10.14.0.0/16 dst 10.20.0.0/16<br />
                  &nbsp;&nbsp;dir out priority 2080 ptype main<br />
                  &nbsp;&nbsp;tmpl src 203.0.113.10 dst 198.51.100.20<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;proto esp reqid 1 <span className="text-cyan-300">mode tunnel</span>
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
                <span><strong>Using AH Across NAT:</strong> Authentication Header includes IP addresses in its ICV checksum. Any NAT device that translates IP addresses causes immediate packet drops. Standardize on ESP.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">2.</span>
                <span><strong>Ignoring MTU / MSS Clamping:</strong> Forgetting that IPsec encapsulation adds ~70 bytes causes packets to exceed 1500-byte WAN MTU. Without TCP MSS clamping, large data transfers silently freeze.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">3.</span>
                <span><strong>Missing Default-Deny Rule:</strong> If an IPsec tunnel goes down and there is no catch-all DISCARD in the SPD, sensitive packets may leak out in plaintext over the public ISP.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">4.</span>
                <span><strong>Sequence Number Rollover:</strong> Failing to configure automated IKE rekeying before sequence counters reach 2^32 - 1 leads to hard tunnel disconnection.</span>
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
                <span><strong>Standardize on AEAD (AES-256-GCM):</strong> Eliminates separate HMAC hashing passes, boosts throughput by 2x-4x, and resists padding oracle attacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span><strong>Enable ESN on High-Speed Links:</strong> 64-bit Extended Sequence Numbers prevent sequence counter exhaustion on 40Gbps/100Gbps datacenter links.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span><strong>Enforce Peer Authorization Database (PAD):</strong> Strictly validate authenticated peer identities against allowed SPD subnets to prevent cross-tenant tunnel hijacking.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span><strong>Automated MSS Clamping in iptables:</strong> Add <code>-j TCPMSS --set-mss 1360</code> to gateway firewalls to guarantee zero fragmentation.</span>
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
                Why is an SA simplex? If two gateways talk, they have two independent SAs: one outbound (encrypting) and one inbound (decrypting).
                Notice how the SPI in the incoming ESP header is the key to finding the correct entry in the receiver's SAD!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Layer 3 placement delivers transparent security to all upper layers.</li>
                <li>SPD dictates policies; SAD holds active keys; PAD authorizes peers.</li>
                <li>Transport Mode = Host-to-Host; Tunnel Mode = Gateway-to-Gateway.</li>
                <li>ESP is Protocol 50; AH is Protocol 51; NAT-T is UDP 4500.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on IPsec Kernel Auditor Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating RFC 4301 SPD/SAD lookups, encapsulation math, and 64-bit anti-replay bitmasks
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={ipsecFrameworkAuditorPy}
            title="ipsec_framework_auditor.py"
            highlightLines={[30, 52, 72, 85, 120]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE SECTION */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="IPsec Architecture &amp; Network Layer Security FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="Remember for your BCA BCAC703 examination: IPsec is an open standards-based framework (RFC 4301), NOT a single standalone encryption algorithm. It uses symmetric ciphers (AES-256-GCM) for the data plane and asymmetric protocols (IKEv2) for the control plane. Always distinguish between Transport Mode (host-to-host, preserving original IP) and Tunnel Mode (gateway-to-gateway, wrapping the entire packet inside a new outer IP header). Pay special attention to why AH fails across NAT routers and how NAT-T (UDP Port 4500) solves this!"
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOADABLE STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: IPsec Architecture Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 5 Note"
            downloadFileName="topic5_ipsec_architecture_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
