import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic0_files/packet_ids.py?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgIdsSubsystemsId = useId();
  const svgPromiscuousId = useId();

  // Studio 1: Active Subsystem Tab Selection
  const [selectedSubsystemKey, setSelectedSubsystemKey] = useState("analysis_engine");

  // Studio 2: Live Packet Sniffer Simulator State
  const [selectedPacketFlow, setSelectedPacketFlow] = useState("syn_port_sweep");
  const [promiscuousModeActive, setPromiscuousModeActive] = useState(true);
  const [heuristicEngineActive, setHeuristicEngineActive] = useState(true);

  // Studio 3: Sizing & Sizing Calculations
  const [tapThroughputGbps, setTapThroughputGbps] = useState(10); // 1 to 40 Gbps
  const [packetCaptureDriver, setPacketCaptureDriver] = useState("dpdk_zero_copy"); // standard_kernel, dpdk_zero_copy
  const [retentionDays, setRetentionDays] = useState(180); // 90 to 365 days

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_bank_tap");

  // Subsystems Database for Studio 1
  const idsSubsystems = {
    sensors_probes: {
      key: "sensors_probes",
      title: "1. Sensors & Probes (Data Capture Subsystem)",
      category: "Packet Ingestion & TAPs",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Deployed on physical network TAPs or switch SPAN mirror ports. Operates network interfaces in Promiscuous Mode, capturing 100% of Ethernet frames across the segment without dropping packets.",
      hardwareTech: "Optical Beam Splitters, Hardware TAPs, AF_PACKET, DPDK zero-copy drivers.",
      operationalAxiom: "Zero packet drop at the sensor is mandatory; dropped packets represent blind spots where attacks slip through undetected."
    },
    analysis_engine: {
      key: "analysis_engine",
      title: "2. Analysis Engine (Detection & Core Logic)",
      category: "Inspection & Pattern Matching",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "The analytical brain of the IDS. Compares packet headers and reassembled byte streams against known signature databases (Aho-Corasick DFA) and tracks heuristic connection state anomalies.",
      hardwareTech: "Multi-core x86 ASICs, Regex Hardware Accelerators, Stream Reassembly Engines.",
      operationalAxiom: "Evaluate signatures against canonical, unescaped payloads to defeat polymorphic obfuscation."
    },
    management_console: {
      key: "management_console",
      title: "3. Alerting & Management Console",
      category: "Reporting & SIEM Telemetry",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "Aggregates, deduplicates, and formats detected indicators of compromise into structured messages (IDMEF / CEF / JSON), streaming alerts over TLS port 6514 to the enterprise SIEM.",
      hardwareTech: "Elasticsearch, Splunk, Wazuh SIEM, Immutable WORM storage.",
      operationalAxiom: "Preserve tamper-proof forensic telemetry for a minimum of 180 days with synchronized NPL India NTP timestamps."
    }
  };

  // Studio 2: Live Injected Packet Flows Database
  const injectedPacketFlows = {
    syn_port_sweep: {
      id: "syn_port_sweep",
      label: "Nmap TCP SYN Port Sweep (Ports 22, 80, 443 in < 1 sec)",
      src: "198.51.100.25:48120",
      dst: "172.16.1.10 (Target)",
      tcpFlags: "SYN (Multiple Ports)",
      verdict: promiscuousModeActive
        ? "🚨 HIGH ALERT: RECONNAISSANCE Port Sweep Detected (SID-2002)"
        : "⚠️ MISSED (Non-Promiscuous Mode Filtered Packets!)",
      badgeColor: promiscuousModeActive ? "bg-rose-950 text-rose-300 border-rose-700" : "bg-amber-950 text-amber-300 border-amber-700",
      explanation: promiscuousModeActive
        ? "Promiscuous NIC captured all half-open SYN packets; Heuristic engine detected 3 distinct destination ports in 0.8s, generating instant SOC alert."
        : "Without Promiscuous Mode, the NIC discarded packets not addressed to its own MAC address!"
    },
    cleartext_password: {
      id: "cleartext_password",
      label: "Cleartext Password Submission over Unencrypted HTTP (Port 80)",
      src: "10.10.1.50:54102",
      dst: "172.16.1.20:80 [ACK]",
      tcpFlags: "ACK (Payload: password=SecretPassword123)",
      verdict: "⚠️ MEDIUM ALERT: Policy Violation - Cleartext Password in Transit (SID-1001)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      explanation: "Payload signature matcher detected `password=` string on unencrypted HTTP flow, flagging an unencrypted credential risk under DPDP Act 2023."
    },
    xmas_scan_probe: {
      id: "xmas_scan_probe",
      label: "Malformed TCP XMAS Scan Probe (FIN-PSH-URG Flags Set)",
      src: "198.51.100.99:59100",
      dst: "172.16.1.10:80 [FIN-PSH-URG]",
      tcpFlags: "FIN_PSH_URG",
      verdict: "🚨 HIGH ALERT: RECONNAISSANCE Malformed TCP Flags (SID-2001)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Analysis engine flagged illegal RFC 793 TCP flag combination used by attackers to fingerprint OS kernels."
    },
    log4shell_jndi_exploit: {
      id: "log4shell_jndi_exploit",
      label: "Zero-Day Log4Shell Diagnostic Probe (${diagnostic_jndi:ldap://...})",
      src: "198.51.100.88:51200",
      dst: "172.16.1.10:443 [ACK]",
      tcpFlags: "ACK (Payload: ${diagnostic_jndi:ldap://test.internal/a})",
      verdict: "🚨 CRITICAL ALERT: EXPLOIT Log4j JNDI RCE Attempt (SID-1003)",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
      explanation: "Deep byte stream signature matched JNDI lookup string in User-Agent header; alert forwarded to SIEM within 45 milliseconds."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedTapMetrics = useMemo(() => {
    // Packet processing capability (Packets Per Second)
    const packetsPerSecondMillions = packetCaptureDriver === "dpdk_zero_copy" ? 14.88 : 1.85;

    // Packet drop rate percentage on multi-gigabit load
    const packetDropPercentage = packetCaptureDriver === "dpdk_zero_copy"
      ? (tapThroughputGbps > 30 ? 0.02 : 0.00).toFixed(2)
      : (tapThroughputGbps * 1.8).toFixed(1);

    // 5-Year Hardware NIDS TCO (INR ₹ Lakhs)
    const applianceHardwareLakhs = (12.0 + tapThroughputGbps * 0.8).toFixed(2);
    const annualStorageLakhs = (retentionDays * 0.025).toFixed(2);
    const fiveYearTcoLakhs = (Number(applianceHardwareLakhs) + Number(annualStorageLakhs) * 5).toFixed(2);

    return {
      packetsPerSecondMillions,
      packetDropPercentage,
      fiveYearTcoLakhs
    };
  }, [tapThroughputGbps, packetCaptureDriver, retentionDays]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_bank_tap: {
      id: "barrackpore_bank_tap",
      title: "Barrackpore Municipal Core Banking Passive TAP Deployment",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      captureArchitecture: "10 Gbps Hardware Optical TAPs with DPDK Zero-Copy NIDS",
      threatScenario: "Adversaries bypassed edge firewalls via compromised VPN credentials, initiating internal lateral reconnaissance against municipal tax databases.",
      solution: "Sukanta Hui and Debangshu installed passive optical TAPs mirroring 10 Gbps East-West traffic into a dedicated NIDS cluster. Mamata and Mahima tuned promiscuous capture; Abhronila's heuristic engine caught anomalous SYN sweeps within 1.2 seconds.",
      outcome: "Attacker lateral movement halted before database breach; 100% forensic pcap preserved for statutory CERT-In audit."
    },
    saltlake_fintech_nids: {
      id: "saltlake_fintech_nids",
      title: "Salt Lake Sector V Commercial Fintech Interbank Switch",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      captureArchitecture: "40 Gbps Redundant NIDS Sensor Farm with SIEM Stream",
      threatScenario: "High-volume credential stuffing swarm attempting to camouflage SQL injection probes inside 80,000 requests/second.",
      solution: "The team deployed an East-West NIDS sensor cluster with real-time stream reassembly. The engine extracted and flagged unencrypted credentials and JNDI exploit headers.",
      outcome: "Zero packet drops; 99.999% transaction visibility maintained; full DPDP Act 2023 compliance verified."
    }
  };

  const currentSubsystem = idsSubsystems[selectedSubsystemKey];
  const currentFlow = injectedPacketFlows[selectedPacketFlow];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 0</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Introduction to Intrusion Detection Systems (IDS)
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the foundational principles of passive perimeter surveillance. Understand the <strong className="text-sky-400">3 core subsystems</strong> (Sensors, Analysis Engine, Alert Console), <strong className="text-emerald-400">Promiscuous Mode</strong> sniffing, James Anderson &amp; Dorothy Denning historical models, and the fundamental dichotomy between <strong className="text-purple-400">Firewalls (The Gate)</strong> and <strong className="text-amber-400">IDS (The Burglar Alarm)</strong>.
          </p>
        </header>

        {/* SECTION 1: IDS SUBSYSTEMS SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The 3 Core Subsystems of an Intrusion Detection System
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              How passive optical TAPs copy line-rate packets into hardware detection engines to produce structured SIEM alerts with zero latency impact.
            </p>
          </div>

          {/* SVG 1: IDS 3 SUBSYSTEMS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Data Capture ➔ Analysis Engine ➔ SIEM Alerting Subsystems
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Out-of-Band Passive Tap</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgIdsSubsystemsId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Intrusion Detection System Architecture Diagram"
              >
                {/* PRODUCTION WIRE */}
                <rect x="20" y="40" width="810" height="45" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="35" y="67" fill="#38bdf8" fontSize="10" fontWeight="bold">PRODUCTION ETHERNET TRUNK (10 Gbps Line Rate)</text>
                <text x="750" y="67" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="end">Zero Inline Latency ✔</text>

                {/* OPTICAL TAP */}
                <circle cx="200" cy="62" r="14" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="66" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">TAP</text>

                {/* MIRROR ARROW DOWN */}
                <path d="M 200 76 L 200 120" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,4" />
                <text x="210" y="105" fill="#f59e0b" fontSize="7.5" fontWeight="bold">Mirrored Copy</text>

                {/* 1. SENSOR / PROBE */}
                <rect x="70" y="120" width="260" height="130" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="145" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                  1. SENSOR / PROBE (Data Capture)
                </text>
                <rect x="85" y="160" width="230" height="75" rx="5" fill="#0c4a6e" />
                <text x="200" y="180" fill="#ffffff" fontSize="8" textAnchor="middle">Promiscuous Mode Sniffing</text>
                <text x="200" y="196" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">DPDK / Libpcap Driver</text>
                <text x="200" y="212" fill="#bae6fd" fontSize="7.5" textAnchor="middle">Kernel Ring Buffer Ingestion</text>

                {/* ARROW 1 TO 2 */}
                <path d="M 330 185 L 370 185" stroke="#38bdf8" strokeWidth="2.5" />

                {/* 2. ANALYSIS ENGINE */}
                <rect x="370" y="120" width="230" height="130" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="485" y="145" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
                  2. ANALYSIS / DETECTION ENGINE
                </text>
                <rect x="385" y="160" width="200" height="75" rx="5" fill="#312e81" />
                <text x="485" y="180" fill="#ffffff" fontSize="8" textAnchor="middle">Signature Byte Matching (DFA)</text>
                <text x="485" y="196" fill="#fca5a5" fontSize="7.5" textAnchor="middle">Heuristic Port Sweep Detector</text>
                <text x="485" y="212" fill="#fde68a" fontSize="7.5" textAnchor="middle">Protocol Anomaly Verification</text>

                {/* ARROW 2 TO 3 */}
                <path d="M 600 185 L 640 185" stroke="#10b981" strokeWidth="2.5" />

                {/* 3. ALERTING CONSOLE */}
                <rect x="640" y="120" width="180" height="130" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="730" y="145" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  3. ALERT CONSOLE
                </text>
                <rect x="655" y="160" width="150" height="75" rx="5" fill="#022c22" />
                <text x="730" y="180" fill="#ffffff" fontSize="8" textAnchor="middle">Structured RFC 5424</text>
                <text x="730" y="196" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">TLS Port 6514 to SIEM</text>
                <text x="730" y="212" fill="#fde68a" fontSize="7.5" textAnchor="middle">180-Day WORM Retention</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: THE ANATOMY OF AN IDS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: The Anatomy of an Intrusion Detection System
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms, operational axioms, and hardware technology behind each subsystem.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentSubsystem.badgeColor)}>
              {currentSubsystem.category}
            </span>
          </div>

          {/* Subsystem Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(idsSubsystems).map((s) => (
              <button
                key={s.key}
                onClick={() => setSelectedSubsystemKey(s.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedSubsystemKey === s.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Active Subsystem Detail Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentSubsystem.title}
                </h3>
                <span className="text-gray-400 font-sans">Subsystem Category: {currentSubsystem.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentSubsystem.badgeColor)}>
                Active Subsystem
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Technical Description &amp; Operations:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentSubsystem.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  🔧 Underlying Hardware &amp; Driver Technologies:
                </span>
                <p className="text-gray-200 font-mono text-xs">{currentSubsystem.hardwareTech}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-900/50 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  🧠 Guiding Operational Axiom:
                </span>
                <p className="text-indigo-200 italic font-mono">"{currentSubsystem.operationalAxiom}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE PACKET SNIFFER SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Network Sniffer &amp; IDS Detection Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject malicious packet streams and observe how the IDS matches signatures, detects port sweeps, and generates alerts.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Sniffer Core
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Injected Packet Flow:</label>
              <select
                value={selectedPacketFlow}
                onChange={(e) => setSelectedPacketFlow(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(injectedPacketFlows).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">NIC Promiscuous Mode Sniffing:</label>
              <button
                onClick={() => setPromiscuousModeActive(!promiscuousModeActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  promiscuousModeActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              >
                {promiscuousModeActive ? "✔ Promiscuous Mode Enabled (100% Ingestion)" : "❌ Promiscuous Disabled (MAC Filtered)"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Heuristic Sweep Tracking:</label>
              <button
                onClick={() => setHeuristicEngineActive(!heuristicEngineActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  heuristicEngineActive
                    ? "bg-purple-950/80 text-purple-300 border-purple-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              >
                {heuristicEngineActive ? "✔ Heuristic Sweep Engine Active" : "❌ Heuristics Disabled"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Sniffed Flow Telemetry:
                </span>
                <div className="font-mono text-sky-300 text-xs sm:text-sm">
                  {currentFlow.src} ➔ {currentFlow.dst} ({currentFlow.tcpFlags})
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentFlow.badgeColor
              )}>
                {currentFlow.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Detection Engine Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentFlow.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: IDS SNIFFER CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Passive Packet Sniffer &amp; Signature Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python implementation demonstrating packet sniffing, signature pattern matching, and heuristic SYN port sweep detection.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              packet_ids.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="packet_ids.py"
            highlightLines={[25, 41, 55, 68]}
          />
        </section>

        {/* STUDIO 3: SIZING & CAPACITY CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: IDS Sensor Placement, Ingestion &amp; 180-Day Storage Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate packet capture rates, ring buffer packet drop percentages, and 5-year NIDS infrastructure TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Sensor Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Mirrored TAP Bandwidth:</span>
                <span className="text-sky-400 font-bold">{tapThroughputGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={tapThroughputGbps}
                onChange={(e) => setTapThroughputGbps(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Packet Capture Driver:</span>
                <span className="text-purple-400 font-bold uppercase">{packetCaptureDriver.replace("_", " ")}</span>
              </div>
              <select
                value={packetCaptureDriver}
                onChange={(e) => setPacketCaptureDriver(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gray-200 focus:outline-none"
              >
                <option value="dpdk_zero_copy">DPDK / PF_RING ZC (Zero-Copy 14.88M pps)</option>
                <option value="standard_kernel">Standard Linux Kernel Socket (1.85M pps)</option>
              </select>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Alert Retention Period:</span>
                <span className="text-emerald-400 font-bold">{retentionDays} Days</span>
              </div>
              <input
                type="range"
                min="90"
                max="365"
                step="30"
                value={retentionDays}
                onChange={(e) => setRetentionDays(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Max Packet Processing Rate</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedTapMetrics.packetsPerSecondMillions} Mpps</div>
              <span className="text-[10px] text-gray-500 block">Per Sensor Core Ingestion</span>
            </div>

            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Ring Buffer Packet Drop</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{calculatedTapMetrics.packetDropPercentage}%</div>
              <span className="text-[10px] text-gray-500 block">Packet Loss during Traffic Spikes</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Redundant NIDS TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedTapMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Hardware TAPs + Sensors + SIEM</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.captureArchitecture}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                NIDS Active
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ NIDS Defensive Strategy:</span>
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
                <span>IDS operates as a passive monitoring system ("Burglar Alarm"), alerting on threats without dropping packets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>James Anderson (1980) and Dorothy Denning (1987) established the foundational models of intrusion detection.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>The 3 core subsystems of an IDS are: Sensors/Probes, Analysis Engine, and Alerting/Management Console.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Promiscuous Mode disables NIC MAC filtering to capture 100% of packets on the mirrored physical segment.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>An IDS deployed out-of-band introduces ZERO forwarding latency to production network traffic.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all IDS alert telemetry synchronized with NPL India NTP servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Introduction to Intrusion Detection Systems (IDS) FAQs"
            subtitle="30 In-depth Practice Questions & IDS Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Intrusion Detection Systems (IDS) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 005_002: Intrusion Detection Systems (IDS), IPS & Honeypots! In Topic 0, we laid the foundational groundwork for passive network surveillance. Always remember the vital distinction between a Firewall and an IDS: a Firewall is the locked door that grants or denies entry, while an IDS is the CCTV camera and burglar alarm that monitors what happens once traffic is inside! Understand the 3 core subsystems—Sensors sniffing in Promiscuous Mode, the Analysis Engine performing signature and heuristic matching, and the Alerting Console forwarding structured RFC 5424 telemetry to the SIEM. Because an IDS operates out-of-band, it provides deep inspection with zero latency impact on production traffic. In Topic 1, we will explore the fundamental Differences between IDS (Passive Detection) and IPS (Active Prevention)!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic0;
