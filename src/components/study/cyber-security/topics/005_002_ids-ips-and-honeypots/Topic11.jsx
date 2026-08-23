import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic11_files/siem_soc_pipeline.py?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgSiemPipelineId = useId();
  const svgTriageFunnelId = useId();

  // Studio 1: Active Integration Dimension Selection
  const [selectedIntegrationKey, setSelectedIntegrationKey] = useState("multi_source_correlation");

  // Studio 2: Live Multi-Source Correlation State
  const [nidsAlertActive, setNidsAlertActive] = useState(true);
  const [deceptionAlertActive, setDeceptionAlertActive] = useState(true);
  const [edrAlertActive, setEdrAlertActive] = useState(true);

  // Studio 3: Performance & Sizing Calculations
  const [eventsPerSecondThousands, setEventsPerSecondThousands] = useState(15); // 1k to 50k EPS
  const [kafkaBrokersCount, setKafkaBrokersCount] = useState(3); // 1 to 8 Kafka brokers
  const [retentionDays, setRetentionDays] = useState(180); // 90 to 365 days

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_state_soc_drill");

  // Integration Dimensions Database for Studio 1
  const integrationDimensions = {
    distributed_ingestion: {
      key: "distributed_ingestion",
      title: "1. Distributed Ingestion & Stream Buffering",
      category: "Data Pipeline",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Sensors stream structured JSON (Suricata EVE JSON, Cowrie logs, Wazuh events) into Apache Kafka message brokers.",
      benefit: "Buffers sudden DDoS traffic bursts (up to 100,000 EPS) without dropping critical security logs or crashing databases.",
      standards: "Normalizes raw fields into Elastic Common Schema (ECS) or Open Cybersecurity Schema Framework (OCSF)."
    },
    multi_source_correlation: {
      key: "multi_source_correlation",
      title: "2. Multi-Source Incident Correlation",
      category: "Analytical Engine",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "Correlates external NIDS exploit probes with internal Canarytoken file access and endpoint EDR process spawns across a 5-minute window.",
      benefit: "Elevates alert confidence to 100%, collapsing 1,000 noisy individual alarms into a single actionable P1 Incident ticket.",
      standards: "Sigma detection rules compiled universally across Elasticsearch, Splunk, and Microsoft Sentinel."
    },
    soar_automation: {
      key: "soar_automation",
      title: "3. SOAR Automated Response Playbooks",
      category: "Automated Orchestration",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      description: "Automated playbooks execute API calls: pushes firewall drop rules, isolates compromised hosts in EDR, and revokes Active Directory sessions in < 500ms.",
      benefit: "Shrinks Mean Time to Respond (MTTR) from hours to under 1 second without human manual latency.",
      standards: "Enforces safety circuit breakers to prevent denial-of-service in automated containment workflows."
    },
    statutory_compliance: {
      key: "statutory_compliance",
      title: "4. CERT-In Mandates & Legal Compliance",
      category: "Governance & Law",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description: "Statutory requirements for 180-day immutable log preservation and mandatory 6-hour incident reporting to CERT-In.",
      benefit: "Guarantees legally undisputed forensic timelines under the Indian Evidence Act and the DPDP Act 2023.",
      standards: "Mandatory system clock synchronization with National Physical Laboratory (NPL) India NTP servers."
    }
  };

  // Studio 2: Multi-Source Correlation Evaluation Logic
  const correlationResult = useMemo(() => {
    const activeCount = (nidsAlertActive ? 1 : 0) + (deceptionAlertActive ? 1 : 0) + (edrAlertActive ? 1 : 0);

    if (activeCount === 3) {
      return {
        incidentId: "INC-2026-WB-9912",
        severity: "CRITICAL P1 (Confirmed Multi-Stage Breach)",
        confidence: "100% (Gold Standard Multi-Source Correlation)",
        soarAction: "✔ SOAR Playbook 01 Executed: Firewall Block (12ms) + EDR Host Isolated (350ms) + CERT-In Draft Ready",
        verdict: "🚨 CRITICAL BREACH NEUTRALIZED: Tri-Vector Threat Contained in < 400ms!",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        explanation: "Suricata flagged the external SQLi probe, Canarytoken trapped the internal credential read, and Wazuh EDR caught the PowerShell process injection from the same source IP. Zero doubt of active attack!"
      };
    } else if (activeCount === 2) {
      if (deceptionAlertActive) {
        return {
          incidentId: "INC-2026-WB-9913",
          severity: "HIGH P2 (Confirmed Deception Tripwire Hit)",
          confidence: "100% (Zero False Positive Axiom)",
          soarAction: "✔ SOAR Playbook 02 Executed: Compromised Workstation Isolated in 420ms",
          verdict: "🛡️ LATERAL INTRUDER ISOLATED (Canarytoken Hit)",
          badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
          explanation: "Deception asset touched by unauthorized user. Because honeypots have zero legitimate traffic, the SOAR engine safely quarantined the host automatically."
        };
      } else {
        return {
          incidentId: "INC-2026-WB-9914",
          severity: "MEDIUM P3 (NIDS + EDR Event)",
          confidence: "85% (Requires Tier-1 Analyst Review)",
          soarAction: "⚠️ Automated Research Completed: Ticket dispatched to Tier-1 SOC Queue",
          verdict: "⚠️ INCIDENT ESCALATED (Awaiting Analyst Triage)",
          badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
          explanation: "NIDS and EDR matched, but lack of deception tripwire requires human analyst verification to ensure it is not an authorized penetration test."
        };
      }
    } else if (activeCount === 1) {
      return {
        incidentId: "N/A (Single Raw Alert)",
        severity: "LOW P4 (Uncorrelated Sensor Event)",
        confidence: "40% (Potential False Alarm / Noise)",
        soarAction: "Logged in SIEM 180-day index; no automated containment triggered",
        verdict: "✔ UNCORRELATED ALERT (Logged in SIEM)",
        badgeColor: "bg-slate-800 text-gray-300 border-slate-700",
        explanation: "Single un-correlated alert logged in SIEM data lake. Awaiting secondary signals before escalating to an incident ticket."
      };
    } else {
      return {
        incidentId: "N/A",
        severity: "INFORMATIONAL",
        confidence: "0%",
        soarAction: "Normal quiet SOC monitoring",
        verdict: "✔ SYSTEM QUIET (No Active Signals)",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        explanation: "All sensors quiet. Normal legitimate business traffic flowing across all subnets."
      };
    }
  }, [nidsAlertActive, deceptionAlertActive, edrAlertActive]);

  // Studio 3: Performance Calculations
  const calculatedSocMetrics = useMemo(() => {
    // Total daily events (Millions)
    const dailyEventsMillions = ((eventsPerSecondThousands * 1000 * 86400) / 1000000).toFixed(1);
    const dailyStorageGb = ((Number(dailyEventsMillions) * 1000000 * 500) / (1024 * 1024 * 1024)).toFixed(1); // 500 bytes/event
    const totalRetentionTb = ((Number(dailyStorageGb) * retentionDays) / 1024).toFixed(2);

    // 5-Year Enterprise SIEM / SOAR TCO (INR ₹ Lakhs)
    const kafkaAndSiemClusterLakhs = (kafkaBrokersCount * 4.5 + 14.0).toFixed(2);
    const storageSanLakhs = (Number(totalRetentionTb) * 0.40 + 5.0).toFixed(2);
    const fiveYearTcoLakhs = (Number(kafkaAndSiemClusterLakhs) + Number(storageSanLakhs) + 12.0).toFixed(2);

    return {
      dailyEventsMillions,
      dailyStorageGb,
      totalRetentionTb,
      fiveYearTcoLakhs
    };
  }, [eventsPerSecondThousands, kafkaBrokersCount, retentionDays]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_state_soc_drill: {
      id: "saltlake_state_soc_drill",
      title: "Salt Lake Sector V State SOC Coordinated Multi-Vector Defense",
      location: "State Data Center SOC, Sector V, Salt Lake City, West Bengal",
      siemSoarStack: "Suricata EVE JSON + Wazuh EDR + Canarytokens ➔ Kafka ➔ OpenSearch + Shuffle SOAR",
      threatScenario: "Adversaries launched a multi-vector attack: external credential spraying, a zero-day SQL injection probe on the civic tax portal, and lateral movement toward a Canarytoken share.",
      solution: "Sukanta Hui, Mamata, and Mahima utilized real-time multi-source correlation. The SIEM linked all 3 vectors in 220ms, triggering Mahima's SOAR playbook to block the external IP and isolate the internal workstation.",
      outcome: "Attack terminated in 380 milliseconds; zero financial data stolen; formal statutory 6-hour incident report submitted to CERT-In; 100% DPDP Act compliance."
    },
    barrackpore_substation_correlation: {
      id: "barrackpore_substation_correlation",
      title: "Barrackpore Municipal Substation SCADA Deception & SIEM Integration",
      location: "Barrackpore Telecom & Energy Gateway, North 24 Parganas, West Bengal",
      siemSoarStack: "Conpot SCADA + Snort NIDS ➔ Rsyslog TLS ➔ Wazuh SIEM ➔ Automated Firewall DAG",
      threatScenario: "An insider attempted to probe industrial Modbus PLC relays and download confidential grid diagrams.",
      solution: "Abhronila, Susmita, and Debangshu correlated a Conpot Modbus tripwire hit with an active internal Active Directory login, identifying the exact physical switch port.",
      outcome: "Workstation isolated automatically via 802.1X port security in 1.4 seconds; zero electrical grid downtime; complete immutable forensic telemetry archived."
    }
  };

  const currentIntegration = integrationDimensions[selectedIntegrationKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 11 (Grand Finale)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Integrating IDS/IPS &amp; Honeypots with SIEM and SOC Operations
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Achieve unified cyber supremacy. Integrate <strong className="text-sky-400">Suricata NIDS, Wazuh HIDS &amp; Canarytokens</strong> into <strong className="text-emerald-400">Apache Kafka &amp; SIEM Pipelines</strong>, execute sub-second <strong className="text-purple-400">SOAR Automated Playbooks</strong>, and enforce <strong className="text-amber-400">CERT-In 180-Day &amp; 6-Hour Mandates</strong>.
          </p>
        </header>

        {/* SECTION 1: SIEM PIPELINE & TRIAGE FUNNEL SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Ingestion-to-Containment Pipeline &amp; SOC Triage Funnel
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 4-stage telemetry pipeline on the left and the alert reduction triage cone on the right.
            </p>
          </div>

          {/* SVG 1: SIEM PIPELINE & TRIAGE CONE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                4-Stage Telemetry Pipeline ➔ SOC Incident Reduction Funnel
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Kafka, SIEM, SOAR &amp; CERT-In</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgSiemPipelineId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Unified SIEM SOC Integration Pipeline Diagram"
              >
                {/* LEFT: 4-STAGE PIPELINE */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  UNIFIED SIEM &amp; SOAR TELEMETRY PIPELINE
                </text>

                {/* STAGE 1: INGESTION */}
                <rect x="35" y="58" width="80" height="185" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="75" y="78" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">1. SENSORS</text>
                <text x="75" y="100" fill="#ffffff" fontSize="7" textAnchor="middle">• Suricata</text>
                <text x="75" y="120" fill="#ffffff" fontSize="7" textAnchor="middle">• Snort 3</text>
                <text x="75" y="140" fill="#ffffff" fontSize="7" textAnchor="middle">• Wazuh</text>
                <text x="75" y="160" fill="#ffffff" fontSize="7" textAnchor="middle">• Canary</text>
                <text x="75" y="180" fill="#ffffff" fontSize="7" textAnchor="middle">• Cowrie</text>
                <text x="75" y="225" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">EVE JSON</text>

                {/* STAGE 2: KAFKA BUFFER */}
                <rect x="125" y="58" width="80" height="185" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="165" y="78" fill="#c7d2fe" fontSize="8" fontWeight="bold" textAnchor="middle">2. KAFKA</text>
                <text x="165" y="105" fill="#ffffff" fontSize="7" textAnchor="middle">Buffer Bus</text>
                <text x="165" y="125" fill="#e0e7ff" fontSize="6.5" textAnchor="middle">50,000 EPS</text>
                <text x="165" y="150" fill="#ffffff" fontSize="7" textAnchor="middle">ECS Schema</text>
                <text x="165" y="170" fill="#e0e7ff" fontSize="6.5" textAnchor="middle">Normalized</text>
                <text x="165" y="225" fill="#fde68a" fontSize="7" fontWeight="bold" textAnchor="middle">Zero Loss</text>

                {/* STAGE 3: SIEM CORRELATION */}
                <rect x="215" y="58" width="90" height="185" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="260" y="78" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">3. SIEM</text>
                <text x="260" y="105" fill="#ffffff" fontSize="7" textAnchor="middle">Correlation</text>
                <text x="260" y="125" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">Multi-Source</text>
                <text x="260" y="150" fill="#ffffff" fontSize="7" textAnchor="middle">5-Tuple Link</text>
                <text x="260" y="170" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">Sigma Rules</text>
                <text x="260" y="225" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">180d Logs</text>

                {/* STAGE 4: SOAR ACTION */}
                <rect x="315" y="58" width="80" height="185" rx="5" fill="#450a0a" stroke="#ef4444" />
                <text x="355" y="78" fill="#fee2e2" fontSize="8" fontWeight="bold" textAnchor="middle">4. SOAR</text>
                <text x="355" y="105" fill="#ffffff" fontSize="7" textAnchor="middle">Playbooks</text>
                <text x="355" y="125" fill="#fca5a5" fontSize="6.5" textAnchor="middle">FW Block</text>
                <text x="355" y="150" fill="#ffffff" fontSize="7" textAnchor="middle">EDR Isolate</text>
                <text x="355" y="170" fill="#fca5a5" fontSize="6.5" textAnchor="middle">AD Revoke</text>
                <text x="355" y="225" fill="#fee2e2" fontSize="7" fontWeight="bold" textAnchor="middle">&lt; 500ms</text>

                {/* RIGHT: SOC TRIAGE FUNNEL */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE SOC INCIDENT TRIAGE FUNNEL
                </text>

                {/* FUNNEL LAYER 1: RAW PACKETS */}
                <path d="M 460 60 L 810 60 L 780 100 L 490 100 Z" fill="#18181b" stroke="#64748b" />
                <text x="635" y="84" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100,000 Raw Network Packets / Sec (Perimeter Links)
                </text>

                {/* FUNNEL LAYER 2: RAW ALERTS */}
                <path d="M 490 105 L 780 105 L 740 145 L 530 145 Z" fill="#082f49" stroke="#0284c7" />
                <text x="635" y="129" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  1,000 Raw Sensor &amp; Honeypot Alerts / Day
                </text>

                {/* FUNNEL LAYER 3: CORRELATED INCIDENTS */}
                <path d="M 530 150 L 740 150 L 700 190 L 570 190 Z" fill="#1e1b4b" stroke="#6366f1" />
                <text x="635" y="174" fill="#c7d2fe" fontSize="8" fontWeight="bold" textAnchor="middle">
                  25 Correlated Actionable Incidents (SOAR Triaged)
                </text>

                {/* FUNNEL LAYER 4: CRITICAL BREACHES */}
                <path d="M 570 195 L 700 195 L 670 235 L 600 235 Z" fill="#450a0a" stroke="#ef4444" />
                <text x="635" y="219" fill="#fee2e2" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  3 Critical Breaches
                </text>
                <text x="635" y="250" fill="#fde68a" fontSize="7" textAnchor="middle">
                  Tier-2/3 Human Forensics + Statutory CERT-In 6-Hour Notice
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: SIEM & SOAR INTEGRATION MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Unified SIEM &amp; SOAR Integration Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical architecture across Distributed Ingestion, Multi-Source Correlation, SOAR Playbooks, and Statutory CERT-In Compliance.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentIntegration.badgeColor)}>
              {currentIntegration.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(integrationDimensions).map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedIntegrationKey(d.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedIntegrationKey === d.key
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
                <h3 className="text-base font-bold text-white">{currentIntegration.title}</h3>
                <span className="text-gray-400">Category: {currentIntegration.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentIntegration.badgeColor)}>
                Active Architecture
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Technical Description:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentIntegration.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  🎯 Operational SOC Benefit:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentIntegration.benefit}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-indigo-950/80 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  📜 Standards &amp; Formats:
                </span>
                <p className="text-indigo-200 font-mono text-xs">{currentIntegration.standards}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE MULTI-SOURCE CORRELATION SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Multi-Source Correlation &amp; SOAR Playbook Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Toggle NIDS, Deception, and EDR sensor signals from a single attacker IP to observe real-time incident correlation and automated SOAR containment.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Correlation Lab
            </span>
          </div>

          {/* Controls Bar: Multi-Signal Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Suricata NIDS Sensor:</label>
              <button
                onClick={() => setNidsAlertActive(!nidsAlertActive)}
                className={clsx(
                  "w-full p-2.5 rounded-lg text-xs font-semibold border transition-all",
                  nidsAlertActive
                    ? "bg-sky-950/80 text-sky-300 border-sky-800 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {nidsAlertActive ? "✔ SQLi Exploit Fired" : "❌ No NIDS Signal"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Canarytoken Honeyfile:</label>
              <button
                onClick={() => setDeceptionAlertActive(!deceptionAlertActive)}
                className={clsx(
                  "w-full p-2.5 rounded-lg text-xs font-semibold border transition-all",
                  deceptionAlertActive
                    ? "bg-purple-950/80 text-purple-300 border-purple-800 shadow-md shadow-purple-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {deceptionAlertActive ? "✔ Canary Tripwire Hit" : "❌ No Deception Signal"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Wazuh Host EDR Agent:</label>
              <button
                onClick={() => setEdrAlertActive(!edrAlertActive)}
                className={clsx(
                  "w-full p-2.5 rounded-lg text-xs font-semibold border transition-all",
                  edrAlertActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-md shadow-emerald-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {edrAlertActive ? "✔ Process Injection Fired" : "❌ No EDR Signal"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Correlated SIEM Incident Ticket:
                </span>
                <span className="text-white font-bold text-sm">{correlationResult.incidentId} • {correlationResult.severity}</span>
                <span className="text-gray-400 text-xs block">Confidence: {correlationResult.confidence}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                correlationResult.badgeColor
              )}>
                {correlationResult.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-purple-300 font-bold uppercase tracking-wider text-[10px] block">
                ⚡ SOAR Automated Playbook Actions Executed:
              </span>
              <div className="font-mono text-xs text-emerald-300 pb-1">{correlationResult.soarAction}</div>
              <p className="text-gray-300 leading-relaxed font-sans">{correlationResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: SIEM & SOAR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: SIEM Multi-Source Correlation &amp; SOAR Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation normalizing Suricata, Canarytoken, and EDR events, correlating 5-tuples, and executing automated containment playbooks.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              siem_soc_pipeline.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="siem_soc_pipeline.py"
            highlightLines={[22, 35, 48, 62]}
          />
        </section>

        {/* STUDIO 3: SOC INGESTION & STORAGE SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: SOC Ingestion Sizing, Kafka Throughput &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate daily event volume (Millions), 180-day storage requirements (TB), and 5-year enterprise SIEM/SOAR infrastructure TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              SOC Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Ingestion Rate (EPS):</span>
                <span className="text-sky-400 font-bold">{eventsPerSecondThousands}k Events/Sec</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={eventsPerSecondThousands}
                onChange={(e) => setEventsPerSecondThousands(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Kafka Message Brokers:</span>
                <span className="text-purple-400 font-bold">{kafkaBrokersCount} Nodes</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={kafkaBrokersCount}
                onChange={(e) => setKafkaBrokersCount(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>CERT-In Log Retention:</span>
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
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Daily Event Volume</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedSocMetrics.dailyEventsMillions} M /day</div>
              <span className="text-[10px] text-gray-500 block">~{calculatedSocMetrics.dailyStorageGb} GB Ingested Daily</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">180-Day Immutable Storage</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedSocMetrics.totalRetentionTb} TB</div>
              <span className="text-[10px] text-gray-500 block">Hot SSD + Cold S3 Object Pool</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year SIEM/SOAR TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedSocMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Kafka + OpenSearch + SOAR</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Stack: {currentDrill.siemSoarStack}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                CERT-In Compliant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Multi-Vector Threat:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Integrated SIEM &amp; SOAR Response:</span>
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
                <span>SIEM normalizes diverse sensor logs into standardized schemas (Elastic Common Schema - ECS).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Multi-source correlation links IDS alerts, honeypot decoys, and EDR telemetry into consolidated incidents.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>SOAR playbooks automate firewall IP blocks, host isolation, and account revocation in &lt; 1 second.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Deception alerts (100% True Positive) enable safe automated SOAR isolation without human delay.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all SIEM logs synchronized with NPL India NTP servers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates reporting confirmed cybersecurity incidents within 6 hours of discovery.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Integrating IDS/IPS &amp; Honeypots with SIEM/SOC FAQs"
            subtitle="30 In-depth Practice Questions &amp; SOC Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Integrating IDS/IPS &amp; Honeypots with SIEM (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 005_002: Intrusion Detection, IPS & Honeypots! In this grand finale, we tied every component together into the unified cognitive Security Operations Center (SOC). Remember the master architecture: Network IDS/IPS (like Suricata with Hyperscan) provides line-rate packet inspection at the perimeter, Cyber Deception (Canarytokens and Honeynets) lays an invisible minefield of 100% True-Positive tripwires across internal subnets, SIEM correlates multiple data sources into a single ground truth, and SOAR automated playbooks neutralize threats in milliseconds! Always enforce the 180-day log retention mandate and 6-hour breach notification timeline under statutory CERT-In directives and the DPDP Act 2023. You have mastered the art and science of proactive intrusion detection and deception engineering!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic11;
