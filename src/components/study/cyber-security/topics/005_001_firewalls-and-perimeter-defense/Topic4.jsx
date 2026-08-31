import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic4_files/stateful_engine.py?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgConntrackTableId = useId();
  const svgTcpFsmId = useId();

  // Studio 1: Active Conntrack State Record Selection
  const [selectedConntrackState, setSelectedConntrackState] = useState("established_https");

  // Studio 2: Live TCP State Transition Simulator State
  const [selectedPacketStep, setSelectedPacketStep] = useState("handshake_syn");
  const [synCookieMode, setSynCookieMode] = useState(false);
  const [ftpAlgEnabled, setFtpAlgEnabled] = useState(true);

  // Studio 3: Conntrack Table Sizing & SYN Cookie Sizing
  const [maxConntrackEntries, setMaxConntrackEntries] = useState(1000000); // 100K to 5M entries
  const [hashBuckets, setHashBuckets] = useState(262144); // 32K to 1M buckets
  const [synFloodRateKpps, setSynFloodRateKpps] = useState(250); // 10 to 1,000 Kpps

  // Studio 4: Regional West Bengal Tabletop Drill State
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_tax_conntrack");

  // Conntrack State Records Database for Studio 1
  const conntrackRecords = {
    established_https: {
      key: "established_https",
      title: "1. ESTABLISHED (HTTPS Web Session)",
      proto: "TCP (6)",
      origTuple: "10.10.1.50:51200 ➔ 203.0.113.88:443",
      replyTuple: "203.0.113.88:443 ➔ 10.10.1.50:51200",
      tcpState: "ESTABLISHED",
      timeoutRemaining: "431,980s (~5 Days)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      explanation: "3-way handshake verified bidirectionally; return packets matching the reply tuple pass automatically without requiring static inbound ACL holes."
    },
    syn_sent_outbound: {
      key: "syn_sent_outbound",
      title: "2. NEW (Outbound SYN Request)",
      proto: "TCP (6)",
      origTuple: "10.10.1.75:58300 ➔ 198.51.100.25:22",
      replyTuple: "198.51.100.25:22 ➔ 10.10.1.75:58300",
      tcpState: "SYN_SENT",
      timeoutRemaining: "58s",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      explanation: "Internal client transmitted initial SYN packet; kernel allocated state entry awaiting server SYN+ACK response within 60-second window."
    },
    related_ftp_data: {
      key: "related_ftp_data",
      title: "3. RELATED (Active FTP Dynamic Pinhole)",
      proto: "TCP (6)",
      origTuple: "172.16.1.10:20 ➔ 10.10.1.50:52140",
      replyTuple: "10.10.1.50:52140 ➔ 172.16.1.10:20",
      tcpState: "SYN_SENT (ALG Pinhole)",
      timeoutRemaining: "28s",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      explanation: "FTP ALG helper (`nf_conntrack_ftp`) parsed `PORT` command in control stream and dynamically opened temporary pinhole on port 52140."
    },
    invalid_out_of_state: {
      key: "invalid_out_of_state",
      title: "4. INVALID (Unsolicited ACK / Injected Packet)",
      proto: "TCP (6)",
      origTuple: "198.51.100.99:60000 ➔ 10.10.1.50:22",
      replyTuple: "NONE (No Matching Session)",
      tcpState: "NONE (Out of State)",
      timeoutRemaining: "0s (Instant Drop)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      explanation: "Unsolicited ACK probe arriving without a prior outbound session; rejected by state engine, completely neutralizing ACK spoofing attacks!"
    }
  };

  // Studio 2: Live Packet Step Database
  const packetStepScenarios = {
    handshake_syn: {
      id: "handshake_syn",
      stepName: "Step 1: Outbound Client SYN",
      src: "10.10.1.50:51200",
      dst: "203.0.113.88:443",
      flags: "SYN=1, ACK=0",
      conntrackAction: "PERMIT (Allocates State: NEW / SYN_SENT)",
      memoryAllocated: "~320 Bytes Kernel Slab RAM",
      analysis: "Legitimate connection initiation; firewall registers session tuple in conntrack hash table."
    },
    handshake_syn_ack: {
      id: "handshake_syn_ack",
      stepName: "Step 2: Inbound Server SYN+ACK",
      src: "203.0.113.88:443",
      dst: "10.10.1.50:51200",
      flags: "SYN=1, ACK=1",
      conntrackAction: "PERMIT (State Transition: SYN_RECV)",
      memoryAllocated: "State Updated",
      analysis: "Matches expected reply tuple; verifies server is online and responding to legitimate handshake."
    },
    handshake_final_ack: {
      id: "handshake_final_ack",
      stepName: "Step 3: Outbound Client Final ACK",
      src: "10.10.1.50:51200",
      dst: "203.0.113.88:443",
      flags: "SYN=0, ACK=1",
      conntrackAction: "PERMIT (State Transition: ESTABLISHED)",
      memoryAllocated: "State Confirmed (5-Day Timeout)",
      analysis: "3-way handshake fully completed; bidirectional data transfer enabled with sequence window verification."
    },
    unsolicited_ack_scan: {
      id: "unsolicited_ack_scan",
      stepName: "Threat 1: Attacker Unsolicited ACK Probe",
      src: "198.51.100.99:62000",
      dst: "10.10.1.50:22 (SSH)",
      flags: "SYN=0, ACK=1",
      conntrackAction: "🛡️ DROPPED (State: INVALID)",
      memoryAllocated: "0 Bytes (Zero State Allocated)",
      analysis: "No matching conntrack record exists in table; packet discarded as out-of-state noise."
    },
    out_of_window_injection: {
      id: "out_of_window_injection",
      stepName: "Threat 2: Injected RST with Forged Seq Number",
      src: "203.0.113.88:443",
      dst: "10.10.1.50:51200",
      flags: "RST=1 (Seq: 99999999)",
      conntrackAction: "🛡️ DROPPED (Window Validation Failed)",
      memoryAllocated: "Session Maintained",
      analysis: "Sequence number outside valid sliding window (`RCV.NXT <= Seq <= RCV.NXT + Window`); injection attack neutralized."
    }
  };

  // Studio 3: Calculations
  const calculatedCapacity = useMemo(() => {
    // RAM requirement: entries * ~320 bytes
    const ramMB = Math.round((maxConntrackEntries * 320) / (1024 * 1024));

    // Average hash chain length (Max Entries / Buckets)
    const avgChainLength = (maxConntrackEntries / hashBuckets).toFixed(1);

    // SYN flood duration to fill state table without SYN cookies (seconds)
    const secondsToFillTable = synFloodRateKpps > 0 ? (maxConntrackEntries / (synFloodRateKpps * 1000)).toFixed(2) : "0";

    // 5-Year Hardware & License TCO (INR ₹ Lakhs)
    const applianceCostLakhs = (12.0 + (maxConntrackEntries / 500000) * 1.5).toFixed(2);
    const annualLicenseLakhs = 2.4;
    const fiveYearTcoLakhs = (Number(applianceCostLakhs) + annualLicenseLakhs * 5).toFixed(2);

    return {
      ramMB,
      avgChainLength,
      secondsToFillTable,
      fiveYearTcoLakhs
    };
  }, [maxConntrackEntries, hashBuckets, synFloodRateKpps]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_tax_conntrack: {
      id: "barrackpore_tax_conntrack",
      title: "Barrackpore Civic Tax Gateway Conntrack Optimization",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      stateCapacity: "2,000,000 Concurrent Stateful Sessions",
      threatScenario: "Adversaries launched a 350,000 SYN/sec flood during tax filing deadline to trigger conntrack table exhaustion.",
      solution: "Sukanta Hui and Debangshu expanded `nf_conntrack_max` to 2,000,000, tuned `hashsize` to 524,288, and enabled `tcp_syncookies = 1`. Incomplete SYN handshakes were challenged cryptographically with zero RAM allocation.",
      outcome: "Absorbed flood seamlessly; 100% legitimate citizen payment transactions processed with zero packet drops."
    },
    saltlake_fintech_spi: {
      id: "saltlake_fintech_spi",
      title: "Salt Lake Sector V Interbank Switch High-Availability SPI",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      stateCapacity: "5,000,000 Active TCP Financial Streams",
      threatScenario: "High-frequency TCP injection and RST teardown attempts targeting active clearinghouse transactions.",
      solution: "Mamata and Mahima configured strict TCP sequence number window checking and deployed `conntrackd` real-time state table synchronization across dual Active-Passive NGFW clusters.",
      outcome: "Prevented 100% of TCP reset injection probes; failover occurred in 220ms without terminating a single active banking session."
    }
  };

  const currentRecord = conntrackRecords[selectedConntrackState];
  const currentStep = packetStepScenarios[selectedPacketStep];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_001 • Topic 4</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Stateful Inspection Firewalls (Stateful Packet Inspection - SPI)
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the core engine of third-generation network defense. Understand the Linux Netfilter <strong className="text-sky-400">Connection Tracking (`conntrack`) table</strong>, bidirectional tuple hashing, TCP Finite State Machines, <strong className="text-emerald-400">Application Layer Gateway (ALG) pinholes</strong>, and RFC 4987 SYN Cookie flood protection.
          </p>
        </header>

        {/* SECTION 1: STATEFUL CONNTRACK ARCHITECTURE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The Stateful Connection Tracking (`conntrack`) Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              How the Linux kernel state table correlates original requests with expected replies to permit dynamic return flows.
            </p>
          </div>

          {/* SVG 1: CONNTRACK STATE TABLE ARCHITECTURE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Bidirectional Stateful Hash Table &amp; Tuple Mapping
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Netfilter nf_conntrack Architecture</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgConntrackTableId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Stateful Inspection Conntrack Table Diagram"
              >
                {/* INGRESS FLOW (CLIENT) */}
                <rect x="20" y="50" width="160" height="180" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  INTERNAL CLIENT
                </text>
                <text x="100" y="95" fill="#94a3b8" fontSize="8.5" textAnchor="middle">
                  10.10.1.50:51200
                </text>
                <rect x="35" y="110" width="130" height="40" rx="4" fill="#1e293b" />
                <text x="100" y="128" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  1. TCP SYN (seq=X)
                </text>
                <text x="100" y="142" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Initiates Outbound Flow
                </text>
                <text x="100" y="180" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                  State: NEW
                </text>

                {/* ARROW 1: TO CONNTRACK TABLE */}
                <path d="M 180 130 L 290 130" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* STATE TABLE (CONNTRACK ENGINE) */}
                <rect x="290" y="30" width="270" height="220" rx="10" fill="#030712" stroke="#0284c7" strokeWidth="2.5" />
                <text x="425" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  KERNEL CONNTRACK TABLE
                </text>
                <text x="425" y="70" fill="#94a3b8" fontSize="7.5" textAnchor="middle">
                  In-Memory Slab RAM (~320 Bytes/Entry)
                </text>

                {/* Original Direction */}
                <rect x="305" y="85" width="240" height="45" rx="5" fill="#082f49" stroke="#38bdf8" />
                <text x="315" y="103" fill="#bae6fd" fontSize="8" fontWeight="bold">
                  ORIGINAL: 10.10.1.50:51200 ➔ 203.0.113.88:443
                </text>
                <text x="315" y="118" fill="#7dd3fc" fontSize="7.5">
                  Proto: TCP | Seq: X | State: SYN_SENT
                </text>

                {/* Reply Direction */}
                <rect x="305" y="140" width="240" height="45" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="315" y="158" fill="#a7f3d0" fontSize="8" fontWeight="bold">
                  REPLY: 203.0.113.88:443 ➔ 10.10.1.50:51200
                </text>
                <text x="315" y="173" fill="#6ee7b7" fontSize="7.5">
                  Expected Ack: X+1 | State: ESTABLISHED
                </text>

                <text x="425" y="215" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Auto-Permits Matching Return Packets!
                </text>
                <text x="425" y="230" fill="#fbcfe8" fontSize="7.5" textAnchor="middle">
                  Drops Out-of-State ACK Scans!
                </text>

                {/* ARROW 2: TO SERVER */}
                <path d="M 560 130 L 670 130" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* DESTINATION SERVER */}
                <rect x="670" y="50" width="160" height="180" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="750" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  WEB SERVER
                </text>
                <text x="750" y="95" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  203.0.113.88:443
                </text>
                <rect x="685" y="110" width="130" height="40" rx="4" fill="#064e3b" />
                <text x="750" y="128" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  2. SYN+ACK Reply
                </text>
                <text x="750" y="142" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Matches Reply Tuple
                </text>
                <text x="750" y="180" fill="#34d399" fontSize="8" textAnchor="middle">
                  State: ESTABLISHED
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: CONNTRACK RECORD INSPECTOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Live Conntrack Table State Record Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the internal fields and timeout lifetimes of various connection states inside the Linux kernel state table.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentRecord.badgeColor)}>
              {currentRecord.tcpState}
            </span>
          </div>

          {/* Record Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(conntrackRecords).map((rec) => (
              <button
                key={rec.key}
                onClick={() => setSelectedConntrackState(rec.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedConntrackState === rec.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {rec.title}
              </button>
            ))}
          </div>

          {/* Active Record Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentRecord.title}
                </h3>
                <span className="text-gray-400 font-sans">Protocol: {currentRecord.proto} • Remaining Session Timer: {currentRecord.timeoutRemaining}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentRecord.badgeColor)}>
                Active State
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  Original Direction Tuple:
                </span>
                <div className="text-gray-200 text-xs">{currentRecord.origTuple}</div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  Expected Reply Direction Tuple:
                </span>
                <div className="text-gray-200 text-xs">{currentRecord.replyTuple}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Kernel Evaluation &amp; Security Logic:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentRecord.explanation}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE TCP TRANSITION & PACKET DROPPER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live TCP State Transition &amp; Out-of-State Dropper Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate standard 3-way handshakes, unsolicited ACK scans, and sequence window validation against the state engine.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Live State Engine
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Simulated Packet Action:</label>
              <select
                value={selectedPacketStep}
                onChange={(e) => setSelectedPacketStep(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(packetStepScenarios).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.stepName}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Application Layer Gateway (FTP ALG):</label>
              <button
                onClick={() => setFtpAlgEnabled(!ftpAlgEnabled)}
                className={clsx(
                  "w-full p-2.5 rounded-lg text-xs font-semibold border transition-all",
                  ftpAlgEnabled
                    ? "bg-purple-950/80 text-purple-300 border-purple-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {ftpAlgEnabled ? "✔ FTP ALG Active (Dynamic RELATED Pinholes)" : "❌ FTP ALG Disabled"}
              </button>
            </div>
          </div>

          {/* Packet Execution Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Inspected Flow &amp; TCP Flags:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentStep.src} ➔ {currentStep.dst} [{currentStep.flags}]
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-gray-300 font-mono text-[11px]">
                  Memory: {currentStep.memoryAllocated}
                </span>
                <span className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border",
                  currentStep.conntrackAction.includes("PERMIT")
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                    : "bg-rose-950 text-rose-300 border-rose-700"
                )}>
                  {currentStep.conntrackAction}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Stateful Engine Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentStep.analysis}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: STATEFUL ENGINE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Stateful Conntrack &amp; SYN Cookie Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python implementation demonstrating bidirectional tuple matching, TCP state transitions, and RFC 4987 SYN Cookie generation.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              stateful_engine.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="stateful_engine.py"
            highlightLines={[25, 41, 62, 77]}
          />
        </section>

        {/* STUDIO 3: CONNTRACK SIZING & SYN COOKIE CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Conntrack Table Sizing &amp; SYN Flood Resistance Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate kernel slab RAM consumption, hash chain optimization, and SYN Cookie flood protection thresholds.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              State Table Sizing
            </span>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Conntrack Max Entries:</span>
                <span className="text-sky-400 font-bold">{maxConntrackEntries.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="100000"
                value={maxConntrackEntries}
                onChange={(e) => setMaxConntrackEntries(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Hash Table Buckets:</span>
                <span className="text-indigo-400 font-bold">{hashBuckets.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="32768"
                max="1048576"
                step="32768"
                value={hashBuckets}
                onChange={(e) => setHashBuckets(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>SYN Flood Rate (Kpps):</span>
                <span className="text-rose-400 font-bold">{synFloodRateKpps} Kpps</span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={synFloodRateKpps}
                onChange={(e) => setSynFloodRateKpps(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Required Kernel Slab RAM</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedCapacity.ramMB} MB</div>
              <span className="text-[10px] text-gray-500 block">Avg Chain Length: {calculatedCapacity.avgChainLength} Entries/Bucket</span>
            </div>

            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Table Exhaustion Window (No Cookies)</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{calculatedCapacity.secondsToFillTable} sec</div>
              <span className="text-[10px] text-gray-500 block">Without RFC 4987 SYN Cookies</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year HA Stateful Cluster TCO</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">₹{calculatedCapacity.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Includes Dual Appliance State Sync</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • State Capacity: {currentDrill.stateCapacity}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                Conntrack Sync Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Stateful Defense Engineering:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
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
                <span>Stateful Packet Inspection (SPI) tracks active session lifecycles in an in-memory State Table.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Linux Netfilter `conntrack` manages bidirectional tuples (Original + Reply).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>4 core connection states: `NEW`, `ESTABLISHED`, `RELATED`, and `INVALID`.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Sequence Number Window Tracking defeats blind TCP spoofing and out-of-order packet injection.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>ALG helper modules (`nf_conntrack_ftp`) parse payloads to open temporary `RELATED` pinholes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Conntrack table exhaustion is mitigated by SYN Cookies (RFC 4987) and shortening SYN timeouts.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Stateful Packet Inspection (SPI) Firewalls FAQs"
            subtitle="30 In-depth Practice Questions & SPI Conntrack Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Stateful Packet Inspection (SPI) Firewalls (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 4 of Module 005_001! In this lesson, we mastered Stateful Packet Inspection (SPI), the undisputed workhorse of enterprise Layer 3/4 perimeter defense. Understand how the Linux kernel `conntrack` subsystem stores bidirectional tuples in memory, enabling automatic return traffic permission without exposing permanent open ports. Always remember the four core connection states: NEW, ESTABLISHED, RELATED (used by FTP/SIP ALG helpers), and INVALID (which discards unsolicited ACK probes). To protect your stateful firewalls against DoS attacks, configure RFC 4987 SYN Cookies and tune `nf_conntrack_max` to ensure memory capacity during peak traffic. In Topic 5, we will ascend to Layer 7 to explore Application-Level Gateways and Proxy Firewalls!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic4;
