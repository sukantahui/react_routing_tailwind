import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic2_files/nids_vs_hids.py?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgNidsHidsId = useId();
  const svgTlsBlindSpotId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("tls_visibility");

  // Studio 2: Live Hybrid Threat Simulator State
  const [selectedThreatKey, setSelectedThreatKey] = useState("encrypted_sqli");
  const [nidsSensorEnabled, setNidsSensorEnabled] = useState(true);
  const [hidsAgentEnabled, setHidsAgentEnabled] = useState(true);

  // Studio 3: Endpoint Fleet Sizing Calculations
  const [serverFleetCount, setServerFleetCount] = useState(250); // 50 to 5000 servers
  const [agentCpuAllocationPercent, setAgentCpuAllocationPercent] = useState(2.0); // 0.5% to 5.0%
  const [dailyLogMbPerHost, setDailyLogMbPerHost] = useState(150); // 50 to 500 MB

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_secretariat_rootkit");

  // Comparison Database for Studio 1
  const comparisonDimensions = {
    deployment_scope: {
      key: "deployment_scope",
      title: "1. Deployment Scope & Coverage Area",
      category: "Infrastructure Topology",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      nidsDetail: "1 physical or virtual appliance monitors an entire subnet or broadcast domain via SPAN / TAP.",
      hidsDetail: "Requires an individual software agent installed directly on every monitored host operating system.",
      verdict: "NIDS provides broad network-wide coverage rapidly; HIDS provides granular per-server protection."
    },
    tls_visibility: {
      key: "tls_visibility",
      title: "2. Encrypted Traffic (TLS 1.3) Visibility",
      category: "Cryptographic Inspection",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      nidsDetail: "Completely blind to encrypted payloads. Sees only encrypted ciphertext and SNI headers.",
      hidsDetail: "100% Plaintext visibility. Inspects data in memory and application logs post-TLS decryption.",
      verdict: "HIDS is indispensable for inspecting modern encrypted web applications and database transactions."
    },
    host_overhead: {
      key: "host_overhead",
      title: "3. Host CPU, RAM & Disk Overhead",
      category: "Performance & Systems Impact",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      nidsDetail: "0% CPU/RAM impact on production servers. Sensor runs on isolated, dedicated hardware.",
      hidsDetail: "Consumes 1%–5% CPU and 100–300 MB RAM per monitored server for log parsing and file hashing.",
      verdict: "NIDS has zero footprint on mission-critical servers; HIDS requires careful agent CPU throttling."
    },
    fim_capabilities: {
      key: "fim_capabilities",
      title: "4. File Integrity Monitoring (FIM) & Local Syscalls",
      category: "Host Internals & Integrity",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      nidsDetail: "Zero visibility into local operating system files, user processes, privilege escalation, or USB drives.",
      hidsDetail: "Hooks kernel syscalls (inotify / Sysmon) to verify cryptographic SHA-256 hashes of critical binaries in real time.",
      verdict: "HIDS is mandatory for detecting local rootkits, trojaned binaries, and insider file tampering."
    }
  };

  // Studio 2: Live Hybrid Threats Database
  const hybridThreats = {
    encrypted_sqli: {
      id: "encrypted_sqli",
      label: "Encrypted Web SQL Injection over TLS 1.3 (Port 443)",
      trafficType: "HTTPS Port 443",
      nidsVerdict: "⚠️ BLIND (Sees unreadable TLS 1.3 ciphertext ➔ No Alert)",
      nidsBadge: "bg-slate-900 text-gray-400 border-slate-700",
      hidsVerdict: "🚨 CRITICAL ALERT: SQLi Extracted from Post-Decryption Nginx Log",
      hidsBadge: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "NIDS could not decrypt the TLS stream; HIDS agent on the web server read the decrypted request in `/var/log/nginx/access.log` and flagged the SQL injection attack!"
    },
    subnet_port_sweep: {
      id: "subnet_port_sweep",
      label: "Nmap Subnet SYN Port Sweep (254 Hosts Probed in 2 Seconds)",
      trafficType: "Raw Layer 3 Network Packets",
      nidsVerdict: "🚨 HIGH ALERT: Network-Wide Reconnaissance Port Sweep (SID-2002)",
      nidsBadge: "bg-rose-950 text-rose-300 border-rose-700",
      hidsVerdict: "⚠️ IGNORED AS NOISE (Individual host saw only 1 single SYN packet)",
      hidsBadge: "bg-slate-900 text-gray-400 border-slate-700",
      explanation: "NIDS saw the entire 254-host scan pattern across the subnet. Individual HIDS agents received only 1 packet each, which looked like normal background noise."
    },
    rootkit_binary_tamper: {
      id: "rootkit_binary_tamper",
      label: "Local Rootkit Binary Replacement (`/bin/login` Tampered)",
      trafficType: "Local Host Filesystem Event",
      nidsVerdict: "⚠️ BLIND (Zero network traffic generated on wire)",
      nidsBadge: "bg-slate-900 text-gray-400 border-slate-700",
      hidsVerdict: "🚨 CRITICAL ALERT: FIM SHA-256 Hash Mismatch on /bin/login",
      hidsBadge: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Attacker replaced `/bin/login` locally; HIDS kernel hook caught the modification via `inotify` within 40ms, raising a high-priority rootkit alert."
    },
    ssh_brute_force: {
      id: "ssh_brute_force",
      label: "SSH Brute-Force Password Spray (Encrypted Port 22)",
      trafficType: "SSH Layer 4 & Local Auth Log",
      nidsVerdict: "⚠️ PARTIAL (Sees 100 TCP handshakes, but cannot verify login success/failure)",
      nidsBadge: "bg-amber-950 text-amber-300 border-amber-700",
      hidsVerdict: "🚨 HIGH ALERT: 50 Failed SSH Logins (Event ID 4625 / auth.log)",
      hidsBadge: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "HIDS parsed `/var/log/auth.log` directly, identifying the exact targeted user accounts and triggering automated local IP blocking via Active Response."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedFleetMetrics = useMemo(() => {
    // Total daily log generation from all agents (Gigabytes)
    const dailyTotalLogsGb = ((serverFleetCount * dailyLogMbPerHost) / 1024).toFixed(2);

    // Total RAM consumed across the enterprise fleet (Gigabytes)
    const totalFleetRamGb = ((serverFleetCount * 250) / 1024).toFixed(1);

    // 5-Year HIDS Enterprise Management & Storage TCO (INR ₹ Lakhs)
    const annualStorageCostLakhs = (Number(dailyTotalLogsGb) * 180 * 0.0004).toFixed(2);
    const wazuhClusterHardwareLakhs = (8.5 + (serverFleetCount / 500) * 4.2).toFixed(2);
    const fiveYearTcoLakhs = (Number(wazuhClusterHardwareLakhs) + Number(annualStorageCostLakhs) * 5 + 4.5).toFixed(2);

    return {
      dailyTotalLogsGb,
      totalFleetRamGb,
      fiveYearTcoLakhs
    };
  }, [serverFleetCount, agentCpuAllocationPercent, dailyLogMbPerHost]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_secretariat_rootkit: {
      id: "saltlake_secretariat_rootkit",
      title: "Salt Lake Sector V State Secretariat Database FIM Incident",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      hybridSetup: "10 Gbps Perimeter NIDS + 1,200 Wazuh HIDS Endpoint Agents",
      threatScenario: "An insider with valid SSH credentials attempted to replace `/bin/login` on core citizen registry databases to establish persistent backdoors.",
      solution: "Sukanta Hui and Abhronila utilized Wazuh HIDS File Integrity Monitoring (FIM). While NIDS saw legitimate encrypted SSH traffic, HIDS caught the SHA-256 hash mismatch within 40 milliseconds.",
      outcome: "Attacker backdoors neutralized before persistence established; 100% forensic audit logs preserved for CERT-In."
    },
    barrackpore_substation_sweep: {
      id: "barrackpore_substation_sweep",
      title: "Barrackpore Power Substation SCADA Subnet Surveillance",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      hybridSetup: "Passive Optical NIDS on Modbus/DNP3 Core Switches",
      threatScenario: "Automated worm attempting rapid reconnaissance across 120 industrial programmable logic controllers (PLCs).",
      solution: "Because legacy PLCs cannot run HIDS agents, Mamata, Mahima, and Debangshu deployed passive NIDS sensors on optical TAPs, catching the Modbus function code sweep instantly.",
      outcome: "Zero PLC latency introduced; worm halted at switch boundary; full grid operational continuity guaranteed."
    }
  };

  const currentDimension = comparisonDimensions[selectedDimensionKey];
  const currentThreat = hybridThreats[selectedThreatKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Network-based IDS (NIDS) vs Host-based IDS (HIDS)
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Understand the critical architectural synergy between <strong className="text-sky-400">Network-based IDS (NIDS)</strong> wire sniffing and <strong className="text-emerald-400">Host-based IDS (HIDS)</strong> endpoint agents. Master <strong className="text-purple-400">File Integrity Monitoring (FIM)</strong>, OS system calls, overcoming the <strong className="text-amber-400">TLS 1.3 Encrypted Blind Spot</strong>, and rootkit detection.
          </p>
        </header>

        {/* SECTION 1: NIDS VS HIDS ARCHITECTURE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Dual Architecture: Wire Sniffing (NIDS) vs Host Kernel Hooks (HIDS)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing how NIDS monitors subnet wire traffic while HIDS operates inside operating system memory and filesystems.
            </p>
          </div>

          {/* SVG 1: NIDS VS HIDS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Network Wire TAP (NIDS) vs Operating System Agent (HIDS)
              </span>
              <span className="text-[11px] text-gray-400 font-mono">TLS 1.3 Decryption Boundary</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgNidsHidsId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="NIDS vs HIDS Architecture Comparison Diagram"
              >
                {/* LEFT: NIDS ON WIRE */}
                <rect x="20" y="20" width="380" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="210" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  NETWORK-BASED IDS (NIDS SENSOR)
                </text>

                <rect x="40" y="65" width="340" height="40" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="210" y="89" fill="#e0f2fe" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PHYSICAL ETHERNET WIRE (Passive Optical TAP)
                </text>

                <rect x="40" y="115" width="340" height="130" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="210" y="140" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                  NIDS Appliance (Snort / Zeek / Suricata)
                </text>
                <text x="210" y="160" fill="#bae6fd" fontSize="7.5" textAnchor="middle">
                  ✔ Promiscuous Ingestion (10 Gbps)
                </text>
                <text x="210" y="178" fill="#fca5a5" fontSize="7.5" textAnchor="middle">
                  ❌ Blind to TLS 1.3 Encrypted Payloads
                </text>
                <text x="210" y="196" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  ✔ Catches Subnet Port Sweeps &amp; SYN Floods
                </text>
                <text x="210" y="214" fill="#34d399" fontSize="7.5" textAnchor="middle">
                  ✔ 0% Host Overhead on Production Servers
                </text>

                {/* RIGHT: HIDS ON HOST */}
                <rect x="450" y="20" width="380" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="640" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  HOST-BASED IDS (HIDS / EDR AGENT)
                </text>

                <rect x="470" y="65" width="340" height="40" rx="5" fill="#064e3b" stroke="#059669" />
                <text x="640" y="89" fill="#d1fae5" fontSize="8" fontWeight="bold" textAnchor="middle">
                  HOST OPERATING SYSTEM KERNEL &amp; MEMORY
                </text>

                <rect x="470" y="115" width="340" height="130" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
                <text x="640" y="140" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                  HIDS Agent (Wazuh / OSSEC / Sysmon)
                </text>
                <text x="640" y="160" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  ✔ File Integrity Monitoring (FIM SHA-256)
                </text>
                <text x="640" y="178" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  ✔ 100% Plaintext (Post-TLS Decryption)
                </text>
                <text x="640" y="196" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  ✔ System Call Lineage &amp; Privilege Escalation
                </text>
                <text x="640" y="214" fill="#fca5a5" fontSize="7.5" textAnchor="middle">
                  ⚠️ Consumes 1%–3% Host CPU &amp; 200MB RAM
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: NIDS VS HIDS COMPARISON MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: NIDS vs HIDS Architectural Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the behavioral differences across scope, TLS inspection, system overhead, and FIM capabilities.
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
              &gt;
                {d.title}
              </button>
            ))}
          </div>

          {/* Comparison Cards Grid */}
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
              <div className="p-4 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>📡</span> Network-based IDS (NIDS):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.nidsDetail}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-950/80 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>💻</span> Host-based IDS (HIDS):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.hidsDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Architectural Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentDimension.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE HYBRID THREAT SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Hybrid Threat Ingestion &amp; Detection Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject encrypted web exploits, port sweeps, and rootkit binary modifications to compare NIDS vs HIDS visibility.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Hybrid Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Threat Scenario:</label>
              <select
                value={selectedThreatKey}
                onChange={(e) => setSelectedThreatKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              &gt;
                {Object.values(hybridThreats).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">NIDS Wire Sensor State:</label>
              <button
                onClick={() => setNidsSensorEnabled(!nidsSensorEnabled)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  nidsSensorEnabled
                    ? "bg-sky-950/80 text-sky-300 border-sky-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              &gt;
                {nidsSensorEnabled ? "✔ NIDS Wire Sensor Active" : "❌ NIDS Sensor Disabled"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">HIDS Endpoint Agent State:</label>
              <button
                onClick={() => setHidsAgentEnabled(!hidsAgentEnabled)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  hidsAgentEnabled
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              &gt;
                {hidsAgentEnabled ? "✔ HIDS Endpoint Agent Active" : "❌ HIDS Agent Disabled"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Threat Incident:
                </span>
                <span className="text-white font-bold text-sm">{currentThreat.label}</span>
                <span className="text-gray-400 text-xs block">Layer: {currentThreat.trafficType}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sky-400 font-bold text-[11px]">📡 NIDS Sensor Verdict:</span>
                  <span className={clsx("px-2 py-0.5 rounded text-[10px] font-mono border", currentThreat.nidsBadge)}>
                    {nidsSensorEnabled ? "Active Check" : "Sensor Off"}
                  </span>
                </div>
                <p className="text-gray-200 leading-relaxed font-mono text-[11px]">
                  {nidsSensorEnabled ? currentThreat.nidsVerdict : "NIDS sensor disabled; zero packet visibility."}
                </p>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 font-bold text-[11px]">💻 HIDS Agent Verdict:</span>
                  <span className={clsx("px-2 py-0.5 rounded text-[10px] font-mono border", currentThreat.hidsBadge)}>
                    {hidsAgentEnabled ? "Active Check" : "Agent Off"}
                  </span>
                </div>
                <p className="text-gray-200 leading-relaxed font-mono text-[11px]">
                  {hidsAgentEnabled ? currentThreat.hidsVerdict : "HIDS agent disabled; zero local OS visibility."}
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Forensic Correlation Insight:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentThreat.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: DUAL NIDS & HIDS CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Dual NIDS Sniffer &amp; HIDS FIM Monitor
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation demonstrating packet sniffing alongside SHA-256 File Integrity Monitoring (FIM).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              nids_vs_hids.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="nids_vs_hids.py"
            highlightLines={[22, 38, 52, 65]}
          />
        </section>

        {/* STUDIO 3: FLEET SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Endpoint Fleet Sizing, Overhead &amp; Storage Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate daily telemetry volume in GB, total fleet RAM overhead, and 5-year HIDS Manager cluster TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Fleet Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Monitored Server Fleet:</span>
                <span className="text-sky-400 font-bold">{serverFleetCount} Servers</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={serverFleetCount}
                onChange={(e) => setServerFleetCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Agent CPU Cap:</span>
                <span className="text-purple-400 font-bold">{agentCpuAllocationPercent}% CPU</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={agentCpuAllocationPercent}
                onChange={(e) => setAgentCpuAllocationPercent(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Daily Log Telemetry:</span>
                <span className="text-emerald-400 font-bold">{dailyLogMbPerHost} MB/Host</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={dailyLogMbPerHost}
                onChange={(e) => setDailyLogMbPerHost(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              /&gt;
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Daily Log Ingestion</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedFleetMetrics.dailyTotalLogsGb} GB/Day</div>
              <span className="text-[10px] text-gray-500 block">FIM + Syscalls + Auth Logs</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Fleet RAM Allocated</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedFleetMetrics.totalFleetRamGb} GB</div>
              <span className="text-[10px] text-gray-500 block">Across {serverFleetCount} Monitored Endpoints</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year HIDS Cluster TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedFleetMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Wazuh Cluster + Elasticsearch Nodes</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Setup: {currentDrill.hybridSetup}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Hybrid Defensive Strategy:</span>
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
                <span>NIDS monitors entire subnets on the wire; HIDS monitors local operating systems via host agents.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>NIDS is blind to encrypted TLS 1.3 traffic; HIDS sees plaintext data post-decryption.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>HIDS performs File Integrity Monitoring (FIM) using SHA-256 cryptographic baseline hashes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>NIDS introduces zero CPU overhead on servers; HIDS consumes 1–5% host CPU/RAM resources.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Modern Defense-in-Depth requires BOTH NIDS (for network perimeter) AND HIDS (for endpoints).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all NIDS packet alerts and HIDS FIM logs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="NIDS vs HIDS FAQs"
            subtitle="30 In-depth Practice Questions & Host/Network Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="NIDS vs HIDS (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 2 illuminates the essential synergy between wire surveillance and endpoint protection! Remember that with TLS 1.3 encrypting almost all internet traffic, a NIDS by itself has blind spots to payload exploits. Installing HIDS agents (like Wazuh or OSSEC) gives you the power to inspect data after TLS decryption, audit Linux system calls with Auditd, and enforce File Integrity Monitoring (FIM) using SHA-256 hashes to detect rootkits immediately. Deploying NIDS at the perimeter and HIDS across all server endpoints creates an unbreachable Defense-in-Depth posture. In Topic 3, we will explore Signature-based Detection vs Anomaly-based / Heuristic Detection!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic2;
