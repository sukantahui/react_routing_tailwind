import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic10_files/honeynet_controller.py?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgProdVsResearchId = useId();
  const svgHoneynetTopologyId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedHoneynetTypeKey, setSelectedHoneynetTypeKey] = useState("operational_objective");

  // Studio 2: Live Honeywall Simulator State
  const [selectedTrafficEvent, setSelectedTrafficEvent] = useState("ingress_dc_attack");
  const [honeywallDataControlActive, setHoneywallDataControlActive] = useState(true);

  // Studio 3: Performance & Sizing Calculations
  const [honeynetNodesCount, setHoneynetNodesCount] = useState(8); // 3 to 30 nodes
  const [dailyPcapGb, setDailyPcapGb] = useState(15); // 5 to 100 GB/day
  const [retentionDays, setRetentionDays] = useState(180); // 90 to 365 days

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_telecom_honeynet");

  // Comparison Database for Studio 1
  const honeynetTypeDimensions = {
    operational_objective: {
      key: "operational_objective",
      title: "1. Core Strategic Objective & Mission",
      category: "Strategic Mission",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      prodDetail: "Direct enterprise risk reduction, immediate intrusion detection, and lateral movement tripwires inside corporate subnets.",
      researchDetail: "Deep threat intelligence gathering, understanding global hacker motives, capturing novel zero-days, and reverse engineering botnets.",
      verdict: "Production honeypots protect your corporate assets; Research honeypots study the global threat landscape."
    },
    placement_and_operators: {
      key: "placement_and_operators",
      title: "2. Network Placement & Operating Teams",
      category: "Operational Context",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      prodDetail: "Placed inside corporate LANs, DMZs, or private cloud VPCs. Operated by internal SOC analysts and Incident Responders.",
      researchDetail: "Exposed directly to the public internet, unrouted darknet IP blocks, and research labs. Operated by CERT-In, Universities, and Labs.",
      verdict: "Production setups sit silently on internal VLANs; Research setups actively invite attacks from the global internet."
    },
    action_on_breach: {
      key: "action_on_breach",
      title: "3. Incident Response Action on Breach",
      category: "Incident Response",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      prodDetail: "Instant containment. Compromised endpoints are immediately quarantined via EDR/SOAR in < 500ms to stop data theft.",
      researchDetail: "Observation & containment. Attackers are allowed to operate for 72+ hours inside the sandbox to capture full TTPs.",
      verdict: "Production prioritizes immediate eradication; Research prioritizes intelligence collection and adversary observation."
    },
    forensic_telemetry: {
      key: "forensic_telemetry",
      title: "4. Forensic Telemetry & Data Collected",
      category: "Forensic Value",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      prodDetail: "High-confidence breach alerts, attacker source IP, compromised credential names, and automated ticket escalation.",
      researchDetail: "Bit-stream disk dumps, in-memory rootkit dumps, decompiled C binaries, and standardized MITRE ATT&CK TTP mapping.",
      verdict: "Research honeynets provide the raw scientific intelligence needed to build new detection rules."
    }
  };

  // Studio 2: Live Honeywall Packet Scenarios
  const trafficEvents = {
    ingress_dc_attack: {
      id: "ingress_dc_attack",
      label: "Ingress Exploit: External Attacker attacks Decoy Domain Controller (Port 445 SMB)",
      srcIp: "198.51.100.22",
      dstIp: "172.20.1.10 (Decoy AD DC)",
      direction: "Ingress → Honeynet",
      isOutbound: false,
      payload: "SMB2 EternalBlue Exploit Probe"
    },
    outbound_lateral_pivot: {
      id: "outbound_lateral_pivot",
      label: "Lateral Pivot Attempt: Compromised Honeypot attempts SSH into Real Database (10.10.1.50)",
      srcIp: "172.20.1.10 (Compromised Honeynet VM)",
      dstIp: "10.10.1.50 (REAL Production Database)",
      direction: "Outbound → Internal RFC 1918",
      isOutbound: true,
      payload: "SSH SYN Connect to Production Database"
    },
    outbound_botnet_flood: {
      id: "outbound_botnet_flood",
      label: "Outbound DDoS Flood: Compromised Honeypot attempts UDP Flood to External Target",
      srcIp: "172.20.1.10 (Compromised Honeynet VM)",
      dstIp: "203.0.113.80 (External Internet Host)",
      direction: "Outbound → Internet",
      isOutbound: true,
      payload: "High-Volume UDP Flood Packet Stream"
    }
  };

  // Studio 2: Honeywall Evaluation Logic
  const honeywallResult = useMemo(() => {
    const event = trafficEvents[selectedTrafficEvent];

    if (!event.isOutbound) {
      return {
        action: "FORWARD & CAPTURE",
        containmentReason: "Ingress Attack Ingested into Honeynet for Forensic Recording",
        pcapLogged: "✔ 100% Full Packet Payload Logged to SIEM",
        verdict: "✔ INGRESS RECORDED (Exploit Trapped in Decoy DC)",
        badgeColor: "bg-sky-950 text-sky-300 border-sky-700",
        explanation: "Honeywall allowed the incoming exploit to reach the decoy Domain Controller; full pcap bytes and kernel syscalls logged invisibly."
      };
    } else {
      // Outbound Traffic from Honeynet
      if (honeywallDataControlActive) {
        if (event.id === "outbound_lateral_pivot") {
          return {
            action: "DROP & ALERT",
            containmentReason: "🛡️ HONEYWALL DATA CONTROL: Dropped attempted pivot to internal RFC 1918 production subnet (10.10.1.50)!",
            pcapLogged: "✔ Pivot attempt recorded for forensic attribution",
            verdict: "🛡️ 100% CONTAINED (Internal Pivot Blocked)",
            badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
            explanation: "The Honeywall's strict RFC 1918 filter blocked the outbound SYN packet, preventing the attacker from compromising real production servers."
          };
        } else {
          return {
            action: "RATE-LIMIT & DROP",
            containmentReason: "🛡️ HONEYWALL DATA CONTROL: Outbound connection rate limit exceeded (5/hour cap enforced)!",
            pcapLogged: "✔ Flood signature extracted & pushed to firewall blocklist",
            verdict: "🛡️ 100% CONTAINED (Outbound DoS Throttled)",
            badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
            explanation: "Honeywall injected TCP RST packets to sever the outbound DDoS flood, ensuring the honeypot cannot be weaponized against third parties."
          };
        }
      } else {
        // Data Control Disabled (Dangerous Misconfiguration)
        return {
          action: "UNCONSTRAINED FORWARD",
          containmentReason: "Warning: Data Control disabled! Honeypot actively attacking other systems!",
          pcapLogged: "Logged during failure",
          verdict: "🚨 CRITICAL HAZARD: Honeynet Weaponized by Attacker!",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
          explanation: "Disabling Honeywall Data Control allowed the attacker to compromise real production servers or participate in external DDoS attacks!"
        };
      }
    }
  }, [selectedTrafficEvent, honeywallDataControlActive]);

  // Studio 3: Performance Calculations
  const calculatedStorageMetrics = useMemo(() => {
    // Total forensic pcap storage required (TB)
    const totalStorageTb = ((dailyPcapGb * retentionDays) / 1024).toFixed(2);

    // 5-Year Multi-Node Honeynet Cluster TCO (INR ₹ Lakhs)
    const hypervisorHardwareLakhs = (honeynetNodesCount * 1.1 + 9.0).toFixed(2);
    const storageHardwareLakhs = (Number(totalStorageTb) * 0.45 + 3.0).toFixed(2);
    const fiveYearTcoLakhs = (Number(hypervisorHardwareLakhs) + Number(storageHardwareLakhs) + 6.0).toFixed(2);

    return {
      totalStorageTb,
      fiveYearTcoLakhs
    };
  }, [honeynetNodesCount, dailyPcapGb, retentionDays]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_telecom_honeynet: {
      id: "barrackpore_telecom_honeynet",
      title: "Barrackpore Telecom Core 72-Hour APT Threat Intelligence Operation",
      location: "Barrackpore Telecom Switching Hub, West Bengal",
      topology: "Multi-Node Honeynet (1 Decoy DC, 2 SQL Databases, 5 Win11 Workstations)",
      threatScenario: "An international Advanced Persistent Threat (APT) group compromised a decoy workstation via a spear-phishing exploit.",
      solution: "Sukanta Hui, Mamata, and Mahima allowed the adversary to operate inside the contained Honeynet for 72 hours, capturing their proprietary in-memory lateral movement scripts.",
      outcome: "When the attacker attempted to pivot into the real municipal tax database, Mamata's Honeywall dropped the outbound SYN packets; 14 new MITRE ATT&CK TTPs documented; full statutory report submitted to CERT-In."
    },
    saltlake_cyber_range_darknet: {
      id: "saltlake_cyber_range_darknet",
      title: "Salt Lake Sector V State Cyber Range Global Darknet Telescope",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      topology: "Routed /20 Darknet Telescope (4,096 Unallocated IP Addresses)",
      threatScenario: "Global scanning noise and automated worm propagation (Mirai / Log4j variants) hit the state's unallocated IP ranges.",
      solution: "Abhronila, Susmita, and Debangshu configured automated pcap collectors and MITRE ATT&CK auto-tagging pipelines across the entire darknet block.",
      outcome: "Identified 48 malicious botnet C2 servers in real time; pushed automated STIX/TAXII blocklists to all West Bengal government perimeter firewalls."
    }
  };

  const currentTypeDimension = honeynetTypeDimensions[selectedHoneynetTypeKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 10</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Honeynets &amp; Production vs Research Honeypots
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the enterprise architecture of multi-node deception networks. Compare <strong className="text-sky-400">Production vs Research Honeypots</strong>, deploy invisible <strong className="text-emerald-400">Honeywall Gateways (Data Control &amp; Data Capture)</strong>, enforce <strong className="text-purple-400">RFC 1918 Containment</strong>, and map adversary behavior to the <strong className="text-amber-400">MITRE ATT&amp;CK Framework</strong>.
          </p>
        </header>

        {/* SECTION 1: PROD VS RESEARCH & HONEYNET TOPOLOGY SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Production vs Research Honeypots &amp; Honeywall Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the distinct operational missions of Production vs Research setups on the left and the multi-node Honeywall topology on the right.
            </p>
          </div>

          {/* SVG 1: PROD VS RESEARCH & HONEYNET TOPOLOGY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Production vs Research Comparison ➔ Multi-Node Honeywall Topology
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Data Control &amp; Invisible Capture</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgProdVsResearchId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Production vs Research Honeynets Diagram"
              >
                {/* LEFT: PROD VS RESEARCH HONEYPOTS */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PRODUCTION VS RESEARCH HONEYPOTS
                </text>

                {/* PRODUCTION HONEYPOT BOX */}
                <rect x="35" y="58" width="175" height="185" rx="6" fill="#082f49" stroke="#0284c7" />
                <text x="122" y="78" fill="#7dd3fc" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  PRODUCTION HONEYPOT
                </text>
                <text x="122" y="98" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Internal Corporate LAN</text>
                <text x="122" y="116" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Operated by Enterprise SOC</text>
                <text x="122" y="134" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">• 100% True-Positive Alerting</text>
                <text x="122" y="152" fill="#fde68a" fontSize="7.5" textAnchor="middle">• Instant SOAR Host Quarantine</text>
                <text x="122" y="175" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Goal: DIRECT RISK REDUCTION
                </text>
                <text x="122" y="225" fill="#bae6fd" fontSize="7" textAnchor="middle">
                  Eliminates SOC Alert Fatigue
                </text>

                {/* RESEARCH HONEYPOT BOX */}
                <rect x="220" y="58" width="175" height="185" rx="6" fill="#1e1b4b" stroke="#6366f1" />
                <text x="307" y="78" fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  RESEARCH HONEYPOT
                </text>
                <text x="307" y="98" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Exposed to Public Internet</text>
                <text x="307" y="116" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Operated by Researchers/CERT</text>
                <text x="307" y="134" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">• Captures Novel Zero-Days</text>
                <text x="307" y="152" fill="#fde68a" fontSize="7.5" textAnchor="middle">• Extended 72h Observation</text>
                <text x="307" y="175" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Goal: THREAT INTELLIGENCE
                </text>
                <text x="307" y="225" fill="#e0e7ff" fontSize="7" textAnchor="middle">
                  Maps MITRE ATT&amp;CK TTPs
                </text>

                {/* RIGHT: MULTI-NODE HONEYNET TOPOLOGY */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  MULTI-NODE HONEYNET &amp; HONEYWALL GATEWAY
                </text>

                {/* INGRESS PATH */}
                <rect x="455" y="60" width="100" height="35" rx="4" fill="#18181b" stroke="#64748b" />
                <text x="505" y="82" fill="#ffffff" fontSize="7.5" textAnchor="middle">Attacker Traffic</text>

                <path d="M 555 77 L 585 77" stroke="#38bdf8" strokeWidth="2" />

                {/* HONEYWALL GATEWAY */}
                <rect x="585" y="55" width="100" height="190" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="635" y="75" fill="#fee2e2" fontSize="8" fontWeight="bold" textAnchor="middle">HONEYWALL</text>
                <text x="635" y="90" fill="#fca5a5" fontSize="7" textAnchor="middle">Layer 2 Bridge</text>
                <text x="635" y="115" fill="#ffffff" fontSize="7" textAnchor="middle">Data Control:</text>
                <text x="635" y="130" fill="#fca5a5" fontSize="6.5" textAnchor="middle">• Drop RFC 1918</text>
                <text x="635" y="145" fill="#fca5a5" fontSize="6.5" textAnchor="middle">• 5 Conns/hr Cap</text>
                <text x="635" y="175" fill="#ffffff" fontSize="7" textAnchor="middle">Data Capture:</text>
                <text x="635" y="190" fill="#34d399" fontSize="6.5" textAnchor="middle">• 100% PCAP</text>
                <text x="635" y="205" fill="#34d399" fontSize="6.5" textAnchor="middle">• eBPF Syscalls</text>
                <text x="635" y="230" fill="#fee2e2" fontSize="6.5" fontWeight="bold" textAnchor="middle">Zero Leakage</text>

                {/* HONEYNET INTERNAL NODES */}
                <path d="M 685 85 L 720 85" stroke="#10b981" strokeWidth="1.5" />
                <rect x="720" y="65" width="95" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="767" y="82" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Decoy AD DC</text>
                <text x="767" y="96" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">Windows Server</text>

                <path d="M 685 150 L 720 150" stroke="#10b981" strokeWidth="1.5" />
                <rect x="720" y="130" width="95" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="767" y="147" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Decoy Database</text>
                <text x="767" y="161" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">PostgreSQL / SQL</text>

                <path d="M 685 215 L 720 215" stroke="#10b981" strokeWidth="1.5" />
                <rect x="720" y="195" width="95" height="40" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="767" y="212" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Decoy Clients</text>
                <text x="767" y="226" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">Windows 11 Nodes</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: PRODUCTION VS RESEARCH MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Production vs Research Honeynet Architectural Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the operational differences across Strategic Objectives, Placement Context, Action on Breach, and Forensic Telemetry.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentTypeDimension.badgeColor)}>
              {currentTypeDimension.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(honeynetTypeDimensions).map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedHoneynetTypeKey(d.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedHoneynetTypeKey === d.key
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
                <h3 className="text-base font-bold text-white">{currentTypeDimension.title}</h3>
                <span className="text-gray-400">Category: {currentTypeDimension.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentTypeDimension.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
                  🏢 1. Production Honeypot:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentTypeDimension.prodDetail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-950/80 space-y-2">
                <span className="text-purple-400 font-bold uppercase tracking-wider text-[11px] block">
                  🔬 2. Research Honeynet:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentTypeDimension.researchDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Axiom:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentTypeDimension.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE HONEYWALL DATA CONTROL SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Honeynet Honeywall Data Control Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Test how the Honeywall Layer-2 gateway intercepts ingress attacks, drops internal RFC 1918 lateral pivots, and throttles outbound denial-of-service streams.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Honeywall Control Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Network Traffic Event:</label>
              <select
                value={selectedTrafficEvent}
                onChange={(e) => setSelectedTrafficEvent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(trafficEvents).map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Honeywall Data Control State:</label>
              <button
                onClick={() => setHoneywallDataControlActive(!honeywallDataControlActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  honeywallDataControlActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-rose-950/80 text-rose-300 border-rose-800"
                )}
              >
                {honeywallDataControlActive ? "✔ Data Control ACTIVE (RFC 1918 Drop & Rate-Limit Enforced)" : "❌ Data Control DISABLED (High Risk!)"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Packet Flow:
                </span>
                <span className="text-white font-bold text-sm">{trafficEvents[selectedTrafficEvent].label}</span>
                <div className="font-mono text-gray-400 text-[11px] truncate max-w-md">
                  {trafficEvents[selectedTrafficEvent].srcIp} ➔ {trafficEvents[selectedTrafficEvent].dstIp} ({trafficEvents[selectedTrafficEvent].direction})
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                honeywallResult.badgeColor
              )}>
                {honeywallResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">Honeywall Gateway Action:</span>
                <div className="text-white font-bold font-mono text-xs">{honeywallResult.action}</div>
                <span className="text-[10px] text-gray-400 block">{honeywallResult.containmentReason}</span>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold text-[11px] block">Data Capture State:</span>
                <p className="text-gray-300 font-mono text-xs">{honeywallResult.pcapLogged}</p>
                <span className="text-[10px] text-gray-500 block">Out-of-band SIEM ingestion</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Forensic Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{honeywallResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: HONEYWALL CONTROLLER CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Honeywall Data Control &amp; Capture Controller
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation enforcing RFC 1918 lateral drop rules, outbound rate-limiting, and invisible packet logging.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              honeynet_controller.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="honeynet_controller.py"
            highlightLines={[22, 34, 48, 62]}
          />
        </section>

        {/* STUDIO 3: HONEYNET TOPOLOGY & STORAGE CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Multi-Node Honeynet Topology, Storage &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate 180-day forensic pcap storage requirements (TB), hypervisor cluster sizing, and 5-year Honeynet infrastructure TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Honeynet Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Honeynet Node Count:</span>
                <span className="text-sky-400 font-bold">{honeynetNodesCount} Nodes</span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={honeynetNodesCount}
                onChange={(e) => setHoneynetNodesCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">AD DC + SQL + Linux + Clients</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Daily Ingress PCAP Volume:</span>
                <span className="text-purple-400 font-bold">{dailyPcapGb} GB/Day</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={dailyPcapGb}
                onChange={(e) => setDailyPcapGb(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Statutory Retention:</span>
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
              <span className="text-[10px] text-gray-500 block">CERT-In 180-Day Mandate</span>
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Required PCAP Storage</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedStorageMetrics.totalStorageTb} TB</div>
              <span className="text-[10px] text-gray-500 block">ZFS RAID-10 Immutable Pool</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Active Decoy Network</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{honeynetNodesCount} Virtual Servers</div>
              <span className="text-[10px] text-gray-500 block">Simulated Active Directory Forest</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Honeynet TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedStorageMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Cluster Hypervisor + Storage SAN</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Topology: {currentDrill.topology}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Honeynet Strategy Executed:</span>
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
                <span>A Honeynet is a network of two or more honeypots simulating an entire realistic enterprise ecosystem.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>The Honeywall gateway performs two mandatory functions: Data Control (containment) and Data Capture (logging).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Production honeypots detect internal intrusions and trigger instant host isolation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Research honeypots study global hacker motives, capture zero-day malware, and map MITRE ATT&amp;CK TTPs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Honeywalls drop all traffic from honeynet nodes destined for internal RFC 1918 private subnets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all honeynet interaction logs synchronized with NPL India NTP servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Honeynets &amp; Production vs Research Honeypots FAQs"
            subtitle="30 In-depth Practice Questions &amp; Honeynet Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Honeynets &amp; Production vs Research (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 10 expands individual honeypots into complete, multi-node enterprise Honeynets! Understand the core division of labor: Production Honeypots sit inside corporate subnets to provide immediate, zero-false-alarm early warning triggers for the SOC; Research Honeypots sit on the open internet to capture zero-day exploits and map adversary TTPs to the MITRE ATT&CK framework over multi-day engagements. Always protect your honeynet with a Layer-2 Honeywall that strictly enforces Data Control (dropping internal RFC 1918 pivots and rate-limiting outbound connections) and Data Capture (invisibly logging 100% of packets). In Topic 11, we will conclude Module 005_002 by exploring Integrating IDS/IPS and Honeypots with SIEM and SOC Operations!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic10;
