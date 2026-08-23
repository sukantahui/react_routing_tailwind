import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import ztnaPolicyEnginePy from "./topic9_files/ztna_policy_engine.py?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgTopologyId = useId();
  const svgBlastRadiusId = useId();

  // Studio 1: Active Access Paradigm State
  const [activeParadigm, setActiveParadigm] = useState("ztna_sdp"); // "traditional_vpn", "ztna_sdp", "ztna_clientless"

  // Studio 2: Live Lateral Movement & Exploit Simulator State
  const [selectedPersona, setSelectedPersona] = useState("debangshu_contractor"); // "debangshu_contractor", "susmita_finance", "mamata_admin"
  const [activeDefenseMode, setActiveDefenseMode] = useState("ztna_zero_trust"); // "traditional_vpn_concentrator", "ztna_zero_trust"
  const [adversaryAction, setAdversaryAction] = useState("nmap_subnet_sweep"); // "nmap_subnet_sweep", "lateral_smb_pivot", "public_gateway_exploit"

  // Studio 3: Migration Sizing & TCO Calculator State (INR ₹)
  const [enterpriseHeadcount, setEnterpriseHeadcount] = useState(800); // 50 to 5000 users
  const [internalAppCount, setInternalAppCount] = useState(24); // 5 to 100 apps
  const [hardwareRefreshLakhs, setHardwareRefreshLakhs] = useState(18.5); // 5 to 50 Lakhs

  // Studio 4: Regional SOC Incident Drills State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_contractor_breach");

  // Access Paradigm Database for Studio 1
  const accessParadigms = {
    traditional_vpn: {
      key: "traditional_vpn",
      title: "1. Traditional VPN (Castle-and-Moat / Layer 3)",
      badge: "Implicit Network Trust / High Risk",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      accessScope: "Broad Subnet Access: User is placed directly on 10.14.0.0/16 intranet",
      publicAttackSurface: "Public IP open on TCP/UDP Port 443 & 500 (Vulnerable on Shodan)",
      lateralMovementRisk: "CRITICAL: Any infected laptop can ping, port-scan, and probe all servers",
      postureEvaluation: "Static (One-time credential check at 9 AM login)",
      shodanVisibility: "100% Discoverable on Shodan (Monolithic Public Gateway)",
      verdict: "Obsolete legacy architecture; exposes entire enterprise to lateral ransomware spread."
    },
    ztna_sdp: {
      key: "ztna_sdp",
      title: "2. Cloud ZTNA (Endpoint-Initiated / Software-Defined Perimeter)",
      badge: "Least-Privilege / 100% Dark Cloud",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      accessScope: "Per-Application Micro-Tunnel: Ephemeral Layer 7 mTLS proxy to authorized apps only",
      publicAttackSurface: "ZERO Inbound Ports: Outbound-only connectors to distributed Cloud Edge",
      lateralMovementRisk: "ELIMINATED: Zero Layer 3 IP assignment; adjacent intranet servers are invisible",
      postureEvaluation: "Continuous (CARTA real-time verification on every single request)",
      shodanVisibility: "0% (Completely Dark; Nmap scans show 0 open listening ports)",
      verdict: "Modern Gold Standard for employee remote access; aligns with NIST SP 800-207."
    },
    ztna_clientless: {
      key: "ztna_clientless",
      title: "3. Clientless ZTNA (Service-Initiated / Reverse Proxy Isolation)",
      badge: "Zero-Footprint / Contractor Safe",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      accessScope: "Browser Sandbox: HTML5 streaming of internal Web, SSH, and RDP sessions",
      publicAttackSurface: "Managed Cloud Reverse Proxy with FIDO2 WebAuthn authentication",
      lateralMovementRisk: "ZERO: Zero software installed; no network packets leave the cloud container",
      postureEvaluation: "Conditional browser security + IdP risk score evaluation",
      shodanVisibility: "0% (Applications hidden behind reverse authenticated proxy)",
      verdict: "Ideal for third-party contractors, auditors, and unmanaged BYOD smartphones."
    }
  };

  // Studio 2: Live Adversary Exploit Simulation Logic
  const exploitSimulationResult = useMemo(() => {
    let status = "BLOCKED";
    let riskBadge = "bg-emerald-950 text-emerald-300 border-emerald-700";
    let headline = "🛡️ ATTACK NEUTRALIZED: Zero Trust Policy Enforced";
    let blastRadiusText = "0 Servers Exposed (Target App Micro-Segmented)";
    let technicalFlow = "";
    let forensicTelemetry = "";

    if (activeDefenseMode === "traditional_vpn_concentrator") {
      status = "BREACHED";
      riskBadge = "bg-rose-950 text-rose-300 border-rose-700";
      headline = "🚨 CATASTROPHIC BREACH: Lateral Movement & Subnet Takeover!";

      if (adversaryAction === "nmap_subnet_sweep") {
        blastRadiusText = "65,534 IP Addresses Exposed on 10.14.0.0/16 Subnet";
        technicalFlow =
          "1. Adversary executes 'nmap -sS 10.14.0.0/16' over the virtual tun0 VPN adapter.\n" +
          "2. Laptop's internal IP (10.14.0.88) responds and sweeps all corporate servers.\n" +
          "3. Discovers 14 internal web apps, 3 Oracle DBs, and SCADA Grid controller (10.14.99.1:502)!";
        forensicTelemetry =
          "Alert: 4,500 SYN packets per second detected traversing VPN tunnel interface from single remote user.";
      } else if (adversaryAction === "lateral_smb_pivot") {
        blastRadiusText = "All Windows Domain Controllers & File Shares Compromised";
        technicalFlow =
          "1. Adversary dumps local LSASS password hashes on the remote laptop.\n" +
          "2. Initiates lateral Pass-the-Hash SMB connection to 10.14.20.15 (Municipal Tax Database).\n" +
          "3. Corporate VPN gateway allows direct Layer 3 TCP port 445 traffic without application-level checks!";
        forensicTelemetry =
          "Critical Incident: Lateral Mimikatz ticket injection detected on internal finance database cluster.";
      } else {
        // public_gateway_exploit
        blastRadiusText = "Entire Perimeter Gateway Compromised (Root OS Shell Acquired)";
        technicalFlow =
          "1. Attacker finds public VPN gateway on Shodan (Port 443 open).\n" +
          "2. Sends unauthenticated RCE exploit (CVE-2023-46805 / Ivanti zero-day).\n" +
          "3. Dumps all active user VPN session keys and Active Directory passwords from gateway memory!";
        forensicTelemetry =
          "Perimeter Alert: Core VPN appliance memory injected with web-shell backdoor.";
      }
    } else {
      // ztna_zero_trust
      status = "IMMUNE";
      riskBadge = "bg-emerald-950 text-emerald-300 border-emerald-700";
      headline = "✔ 100% IMMUNE: Attack Contained at Endpoint";

      if (adversaryAction === "nmap_subnet_sweep") {
        blastRadiusText = "0 Servers Exposed (Network Layer 3 is 100% Dark)";
        technicalFlow =
          "1. Adversary attempts 'nmap -sS 10.14.0.0/16'.\n" +
          "2. Client OS kernel drops all raw TCP SYN packets because no internal IP/route exists.\n" +
          "3. ZTNA agent detects unauthorized port scan and flags user risk score to 100 (Quarantine)!";
        forensicTelemetry =
          "ZTNA Agent Alert: Local socket anomaly detected; user session revoked and SOC notified.";
      } else if (adversaryAction === "lateral_smb_pivot") {
        blastRadiusText = "0 Servers Exposed (Role-Based Least Privilege Enforced)";
        technicalFlow =
          "1. Adversary attempts to connect to Municipal Tax Database (10.14.20.15:445).\n" +
          "2. ZTNA broker checks user role: '" +
          (selectedPersona === "debangshu_contractor"
            ? "DEVELOPER_CONTRACTOR"
            : selectedPersona === "susmita_finance"
            ? "FINANCE_OFFICER"
            : "SOC_ADMIN") +
          "'.\n" +
          "3. Access DENIED: No micro-tunnel provisioned for unapproved SMB port; lateral pivot impossible!";
        forensicTelemetry =
          "Policy Enforcement: Micro-tunnel request dropped by cloud policy decision point (PDP).";
      } else {
        // public_gateway_exploit
        blastRadiusText = "0 Public Inbound Ports Open (Zero Shodan Exposure)";
        technicalFlow =
          "1. Attacker attempts to scan corporate public IP.\n" +
          "2. ZTNA connectors use outbound-only connections; zero listening ports open on firewall.\n" +
          "3. Exploit payload dropped silently by perimeter router with 0 response!";
        forensicTelemetry =
          "Perimeter Telemetry: Zero responsive listening sockets. 100% immune to gateway RCE exploits.";
      }
    }

    return {
      status,
      riskBadge,
      headline,
      blastRadiusText,
      technicalFlow,
      forensicTelemetry
    };
  }, [activeDefenseMode, selectedPersona, adversaryAction]);

  // Studio 3: TCO & Migration Cost Calculation (INR ₹)
  const calculatedTcoMetrics = useMemo(() => {
    // Traditional Hardware VPN Annual Costs (INR ₹ Lakhs)
    const vpnApplianceRefreshLakhs = (Number(hardwareRefreshLakhs) / 3).toFixed(2); // Amortized over 3 years
    const vpnWanLeasedLinesLakhs = ((enterpriseHeadcount * 2200 * 12) / 100000).toFixed(2); // WAN transit
    const vpnMaintenanceLakhs = ((enterpriseHeadcount * 600 * 12) / 100000).toFixed(2);
    const totalVpnAnnualLakhs = (
      Number(vpnApplianceRefreshLakhs) +
      Number(vpnWanLeasedLinesLakhs) +
      Number(vpnMaintenanceLakhs)
    ).toFixed(2);

    // Cloud ZTNA Annual Costs (INR ₹ Lakhs)
    // Approx SaaS rate: ₹350/user/month in Indian enterprise market
    const ztnaSubscriptionAnnualLakhs = ((enterpriseHeadcount * 350 * 12) / 100000).toFixed(2);
    const ztnaConnectorInfraLakhs = (internalAppCount * 0.15).toFixed(2); // Lightweight VMs
    const totalZtnaAnnualLakhs = (
      Number(ztnaSubscriptionAnnualLakhs) + Number(ztnaConnectorInfraLakhs)
    ).toFixed(2);

    // Savings Calculation
    const netAnnualSavingsLakhs = (Number(totalVpnAnnualLakhs) - Number(totalZtnaAnnualLakhs)).toFixed(2);
    const savingsPercent = Math.round(
      ((Number(totalVpnAnnualLakhs) - Number(totalZtnaAnnualLakhs)) / Number(totalVpnAnnualLakhs)) * 100
    );

    return {
      totalVpnAnnualLakhs,
      totalZtnaAnnualLakhs,
      netAnnualSavingsLakhs,
      savingsPercent: Math.max(0, savingsPercent)
    };
  }, [enterpriseHeadcount, internalAppCount, hardwareRefreshLakhs]);

  // Studio 4: Regional West Bengal SOC Scenarios
  const regionalDrills = {
    barrackpore_contractor_breach: {
      id: "barrackpore_contractor_breach",
      title: "Barrackpore Municipal Core: Contractor Subnet Isolation",
      location: "Barrackpore Municipal Datacenter connecting 12 External Software Vendors",
      threatScenario:
        "A third-party developer's laptop was infected with infostealer malware. Under the legacy SSL-VPN, the infected device initiated automated SMB sweeps across the 10.14.0.0/16 municipal subnet, reaching the property tax assessment database.",
      solution:
        "Sukanta Hui, Susmita, and Mamata decommissioned the legacy VPN and deployed Clientless ZTNA. Contractors now authenticate via FIDO2 passkeys to an isolated browser sandbox with access strictly to the Web CMS on port 443.",
      outcome:
        "All lateral subnet access eradicated; municipal tax databases rendered 100% dark to external vendors; full compliance with West Bengal e-Governance guidelines."
    },
    kolkata_fintech_gateway_exploit: {
      id: "kolkata_fintech_gateway_exploit",
      title: "Salt Lake Sector V FinTech Hub: Zero-Day Gateway Exploit Containment",
      location: "Sector V Enterprise Hub servicing 1,500 Remote Employees",
      threatScenario:
        "Nation-state actors exploited an unauthenticated RCE zero-day on the public hardware VPN concentrator (CVE-2023-46805), dumping Active Directory credentials from the gateway's memory.",
      solution:
        "Abhronila and Debangshu migrated the 1,500 users to Cloud-Native ZTNA with outbound-only connectors, shutting down all public listening ports on perimeter firewalls.",
      outcome:
        "Public attack surface reduced to zero open ports; Shodan reconnaissance rendered impossible; single-sign-on latency slashed by 45%."
    }
  };

  const currentParadigm = accessParadigms[activeParadigm];
  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 9</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Zero Trust Network Access (ZTNA) vs Traditional VPNs
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transition from legacy castle-and-moat network perimeters to identity-driven,
            least-privilege application micro-segmentation governed by NIST SP 800-207.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              NIST SP 800-207 Zero Trust
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Software-Defined Perimeter (SDP)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Dark Cloud Architecture
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              CARTA Continuous Telemetry
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
          @keyframes pulseGlowEmerald {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(16, 185, 129, 0.8)); }
          }
          @keyframes scanLine {
            0% { transform: translateY(0); }
            100% { transform: translateY(100%); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              🏰
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Death of Castle-and-Moat: Why VPNs Fail Modern Security
              </h2>
              <p className="text-sm text-slate-400">
                How implicit network trust enables catastrophic lateral movement and why Zero Trust replaces it
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In traditional enterprise networking across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, perimeter defense functioned on a{" "}
              <strong className="text-white">&ldquo;Castle-and-Moat&rdquo;</strong> model. Once an employee or third-party
              contractor authenticated to the VPN concentrator, the system granted them an internal IP address with broad{" "}
              <code className="text-rose-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-mono text-xs">
                Layer 3/4 Network Routability
              </code>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-rose-700/60 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-rose-400 flex items-center gap-2">
                    <span>❌</span> The Legacy VPN Fallacy (Implicit Trust)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    High Blast Radius
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  A VPN authenticates the user once at login and gives them a key to the entire intranet. If{" "}
                  <strong className="text-white">Debangshu&apos;s</strong> laptop is infected with malware, the attacker
                  can scan, probe, and exploit all <strong className="text-rose-300">65,534 hosts</strong> on the internal subnet!
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Unrestricted Nmap scanning and SMB lateral movement.</li>
                  <li>Public listening ports open on the internet (Shodan targets).</li>
                  <li>Static authentication that ignores mid-session malware infections.</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-emerald-700/60 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                    <span>🛡️</span> The Zero Trust Axiom (Never Trust, Always Verify)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Micro-Segmented
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  <strong className="text-emerald-300">NIST SP 800-207 ZTNA</strong> grants access strictly to individual{" "}
                  <strong className="text-white">Layer 7 applications</strong>, never the network. The endpoint never receives
                  an internal IP address and internal servers remain 100% dark.
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Zero open inbound ports on perimeter firewalls (100% Dark Cloud).</li>
                  <li>Lateral movement rendered physically impossible across subnets.</li>
                  <li>Continuous Adaptive Risk and Trust Assessment (CARTA).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE PARADIGM SWITCHER & TOPOLOGY VISUALIZER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
                🗺️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Architectural Paradigm Switcher &amp; Network Topology
                </h2>
                <p className="text-sm text-slate-400">
                  Switch between Traditional VPN, Client-Based ZTNA, and Clientless ZTNA to inspect access boundaries
                </p>
              </div>
            </div>

            {/* Paradigm Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(accessParadigms).map((key) => {
                const item = accessParadigms[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveParadigm(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border",
                      activeParadigm === key
                        ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(". ")[1].split(" (")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Paradigm Banner */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">{currentParadigm.title}</h3>
              <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold border", currentParadigm.badgeColor)}>
                {currentParadigm.badge}
              </span>
            </div>

            {/* Dynamic Instructional SVG Topology Diagram */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <svg
                id={svgTopologyId}
                viewBox="0 0 880 340"
                className="w-full min-w-[700px] h-auto"
                aria-label="Traditional VPN vs ZTNA Micro-Segmentation Network Topology"
              >
                <defs>
                  <linearGradient id="vpnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="ztnaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                  </linearGradient>
                  <marker id="arrowEmerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#10b981" />
                  </marker>
                  <marker id="arrowRoseVpn" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#f43f5e" />
                  </marker>
                </defs>

                {/* Left Node: User Endpoint */}
                <g transform="translate(30, 80)">
                  <rect width="180" height="180" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <rect width="180" height="36" rx="12" fill="#1e293b" />
                  <text x="90" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    💻 Remote Client (Susmita)
                  </text>
                  <text x="15" y="65" fill="#94a3b8" fontSize="11">Location: Barrackpore</text>
                  <text x="15" y="85" fill="#94a3b8" fontSize="11">Role: Finance Officer</text>
                  <text x="15" y="105" fill={activeParadigm === "traditional_vpn" ? "#f43f5e" : "#10b981"} fontSize="11" fontWeight="bold">
                    {activeParadigm === "traditional_vpn" ? "VPN IP: 10.14.0.88" : "No Intranet IP Assigned"}
                  </text>
                  <rect x="15" y="125" width="150" height="26" rx="4" fill={activeParadigm === "traditional_vpn" ? "#881337" : "#064e3b"} />
                  <text x="90" y="142" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {activeParadigm === "traditional_vpn" ? "Layer 3/4 Subnet Access" : "Layer 7 Ephemeral mTLS Proxy"}
                  </text>
                </g>

                {/* Center Node: Policy Enforcement Point (Gateway / ZTNA Cloud Broker) */}
                <g transform="translate(300, 70)">
                  <rect
                    width="230"
                    height="200"
                    rx="14"
                    fill="#0f172a"
                    stroke={activeParadigm === "traditional_vpn" ? "#e11d48" : "#059669"}
                    strokeWidth="2"
                    strokeDasharray={activeParadigm === "traditional_vpn" ? "none" : "4,2"}
                  />
                  <rect width="230" height="36" rx="14" fill={activeParadigm === "traditional_vpn" ? "#881337" : "#064e3b"} />
                  <text x="115" y="24" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    {activeParadigm === "traditional_vpn" ? "🏢 Hardware VPN Gateway" : "☁️ ZTNA Identity & Policy Broker"}
                  </text>
                  <text x="15" y="65" fill="#94a3b8" fontSize="10">
                    Public Ports: {activeParadigm === "traditional_vpn" ? "TCP 443 OPEN (Shodan Target)" : "0 Open Inbound (100% Dark)"}
                  </text>
                  <text x="15" y="85" fill="#94a3b8" fontSize="10">
                    Trust Model: {activeParadigm === "traditional_vpn" ? "Implicit Trust upon Login" : "Continuous CARTA Evaluation"}
                  </text>
                  <text x="15" y="105" fill="#94a3b8" fontSize="10">
                    MFA / IdP: {activeParadigm === "traditional_vpn" ? "Static RADIUS/LDAP" : "OIDC + FIDO2 Passkeys"}
                  </text>
                  <text x="15" y="125" fill="#94a3b8" fontSize="10">
                    Connector: {activeParadigm === "traditional_vpn" ? "Inbound Port Forwarding" : "Outbound-Only WireGuard Tunnel"}
                  </text>

                  {/* Shodan Alert Badge on VPN */}
                  {activeParadigm === "traditional_vpn" ? (
                    <g transform="translate(20, 145)">
                      <rect width="190" height="24" rx="4" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
                      <text x="95" y="16" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">
                        ⚠️ High CVE-2023-46805 RCE Risk
                      </text>
                    </g>
                  ) : (
                    <g transform="translate(20, 145)">
                      <rect width="190" height="24" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                      <text x="95" y="16" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                        ✔ 100% Dark to Internet Scanners
                      </text>
                    </g>
                  )}
                </g>

                {/* Animated Connection Arrow (Client to Broker) */}
                <path
                  d="M 210,170 L 300,170"
                  stroke={activeParadigm === "traditional_vpn" ? "#f43f5e" : "#10b981"}
                  strokeWidth="3"
                  markerEnd={activeParadigm === "traditional_vpn" ? "url(#arrowRoseVpn)" : "url(#arrowEmerald)"}
                />
                <circle r="4" fill={activeParadigm === "traditional_vpn" ? "#f43f5e" : "#10b981"}>
                  <animateMotion path="M 210,170 L 300,170" dur="1.8s" repeatCount="indefinite" />
                </circle>

                {/* Right Node 1: Authorized App (ERP / Jira) */}
                <g transform="translate(620, 30)">
                  <rect width="230" height="75" rx="10" fill="#0f172a" stroke="#059669" strokeWidth="2" />
                  <rect width="230" height="24" rx="10" fill="#064e3b" />
                  <text x="115" y="16" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    📗 Authorized App: Jira &amp; ERP (10.14.10.8)
                  </text>
                  <text x="15" y="45" fill="#94a3b8" fontSize="10">Access: Permitted under Least-Privilege</text>
                  <text x="15" y="62" fill="#34d399" fontSize="10">Decision: Micro-tunnel active (Port 443)</text>
                </g>

                {/* Right Node 2: Restricted Core Database (Property Tax) */}
                <g transform="translate(620, 130)">
                  <rect
                    width="230"
                    height="75"
                    rx="10"
                    fill="#0f172a"
                    stroke={activeParadigm === "traditional_vpn" ? "#f43f5e" : "#334155"}
                    strokeWidth="2"
                  />
                  <rect width="230" height="24" rx="10" fill={activeParadigm === "traditional_vpn" ? "#881337" : "#1e293b"} />
                  <text
                    x="115"
                    y="16"
                    fill={activeParadigm === "traditional_vpn" ? "#fecdd3" : "#64748b"}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    📕 Tax Assessment Core (10.14.20.15)
                  </text>
                  <text x="15" y="45" fill="#94a3b8" fontSize="10">
                    VPN Status: {activeParadigm === "traditional_vpn" ? "🚨 EXPOSED TO LATERAL SWEEP" : "🔒 100% Dark & Invisible"}
                  </text>
                  <text x="15" y="62" fill="#94a3b8" fontSize="10">
                    ZTNA Status: {activeParadigm === "traditional_vpn" ? "Routable over Subnet" : "Access Blocked by Role Policy"}
                  </text>
                </g>

                {/* Right Node 3: Critical SCADA Grid */}
                <g transform="translate(620, 230)">
                  <rect
                    width="230"
                    height="75"
                    rx="10"
                    fill="#0f172a"
                    stroke={activeParadigm === "traditional_vpn" ? "#f43f5e" : "#334155"}
                    strokeWidth="2"
                  />
                  <rect width="230" height="24" rx="10" fill={activeParadigm === "traditional_vpn" ? "#881337" : "#1e293b"} />
                  <text
                    x="115"
                    y="16"
                    fill={activeParadigm === "traditional_vpn" ? "#fecdd3" : "#64748b"}
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    ⚡ SCADA Power Grid (10.14.99.1:502)
                  </text>
                  <text x="15" y="45" fill="#94a3b8" fontSize="10">
                    VPN Status: {activeParadigm === "traditional_vpn" ? "🚨 REACHABLE VIA PORT SCAN" : "🔒 Completely Segmented"}
                  </text>
                  <text x="15" y="62" fill="#94a3b8" fontSize="10">
                    ZTNA Status: Zero Route Exists in Client Kernel
                  </text>
                </g>

                {/* Connection Lines from Broker to Apps */}
                <path d="M 530,110 L 620,70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowEmerald)" />
                {activeParadigm === "traditional_vpn" ? (
                  <>
                    <path d="M 530,170 L 620,170" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrowRoseVpn)" />
                    <path d="M 530,220 L 620,265" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,2" markerEnd="url(#arrowRoseVpn)" />
                  </>
                ) : null}
              </svg>
            </div>

            {/* Architecture Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Access Scope &amp; Attack Surface
                </h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <p><strong className="text-white">Network Scope:</strong> {currentParadigm.accessScope}</p>
                  <p><strong className="text-white">Attack Surface:</strong> {currentParadigm.publicAttackSurface}</p>
                  <p><strong className="text-white">Shodan Risk:</strong> {currentParadigm.shodanVisibility}</p>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Lateral Movement &amp; Posture Verification
                </h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <p><strong className="text-white">Lateral Pivot Risk:</strong> {currentParadigm.lateralMovementRisk}</p>
                  <p><strong className="text-white">Posture Checks:</strong> {currentParadigm.postureEvaluation}</p>
                  <p className="text-emerald-400 font-semibold">{currentParadigm.verdict}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE LATERAL MOVEMENT & EXPLOIT LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-800 text-rose-400 text-xl">
              🎯
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 2: Live Adversary Lateral Movement &amp; Blast Radius Lab
              </h2>
              <p className="text-sm text-slate-400">
                Simulate a compromised user account to test how traditional VPNs enable subnet takeovers while ZTNA stops lateral pivoting
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control 1: User Persona */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Compromised User Persona
              </label>
              <select
                value={selectedPersona}
                onChange={(e) => setSelectedPersona(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="debangshu_contractor">Debangshu (Contract Developer - Jadavpur)</option>
                <option value="susmita_finance">Susmita (Finance Officer - Barrackpore)</option>
                <option value="mamata_admin">Mamata (SOC Infrastructure Admin - Kolkata)</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Determines assigned role credentials and least-privilege application entitlements.
              </p>
            </div>

            {/* Control 2: Defense Architecture Mode */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Enterprise Defense Architecture
              </label>
              <select
                value={activeDefenseMode}
                onChange={(e) => setActiveDefenseMode(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="traditional_vpn_concentrator">Traditional Hardware VPN (Castle-and-Moat)</option>
                <option value="ztna_zero_trust">Cloud ZTNA SDP (Zero Implicit Trust)</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Switches between broad Layer 3 routing and per-application micro-tunnels.
              </p>
            </div>

            {/* Control 3: Adversary Exploit Action */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                3. Adversary Exploit Action
              </label>
              <select
                value={adversaryAction}
                onChange={(e) => setAdversaryAction(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="nmap_subnet_sweep">Nmap Subnet Sweep (10.14.0.0/16)</option>
                <option value="lateral_smb_pivot">Pass-the-Hash SMB Lateral Movement (Port 445)</option>
                <option value="public_gateway_exploit">Public Gateway Zero-Day Exploit (CVE-2023-46805)</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Simulates adversarial post-exploitation tactics and network traversal attempts.
              </p>
            </div>
          </div>

          {/* Simulation Output Dashboard */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white">Exploit Trajectory &amp; Blast Radius:</span>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", exploitSimulationResult.riskBadge)}>
                {exploitSimulationResult.headline}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-rose-400 uppercase tracking-wider">
                    Attack Execution Trace:
                  </h4>
                  <span className="text-[11px] font-mono text-amber-300">
                    Blast Radius: {exploitSimulationResult.blastRadiusText}
                  </span>
                </div>
                <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                  {exploitSimulationResult.technicalFlow}
                </pre>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider">
                  SOC Telemetry &amp; Detection Finding:
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {exploitSimulationResult.forensicTelemetry}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-cyan-300">Architectural Insight:</strong> In ZTNA, access is granted strictly to
                  individual sockets via ephemeral mTLS micro-tunnels. An attacker who compromises a developer&apos;s laptop
                  cannot even send an ARP request to adjacent databases because no network-layer bridge exists!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: TCO SIZING & MIGRATION CALCULATOR (INR ₹) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              💰
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 3: ZTNA Migration Sizing &amp; TCO Calculator (INR ₹)
              </h2>
              <p className="text-sm text-slate-400">
                Compare annual capital and operational expenditures between hardware VPN concentrators and Cloud ZTNA SaaS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slider 1: Enterprise Headcount */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Remote Employees / Contractors:</span>
                <span className="text-emerald-400 font-mono text-sm">{enterpriseHeadcount} Users</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={enterpriseHeadcount}
                onChange={(e) => setEnterpriseHeadcount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Total remote staff accessing internal applications and web services.
              </p>
            </div>

            {/* Slider 2: Internal Application Count */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Internal Apps Protected:</span>
                <span className="text-emerald-400 font-mono text-sm">{internalAppCount} Apps</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="1"
                value={internalAppCount}
                onChange={(e) => setInternalAppCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Number of ERP, Git, Jira, Oracle, and SSH services connected to ZTNA.
              </p>
            </div>

            {/* Slider 3: Hardware Refresh Cost */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Legacy Appliance Refresh Budget:</span>
                <span className="text-emerald-400 font-mono text-sm">₹{hardwareRefreshLakhs} Lakhs</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={hardwareRefreshLakhs}
                onChange={(e) => setHardwareRefreshLakhs(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Capital expenditure required every 3 years for hardware VPN upgrades.
              </p>
            </div>
          </div>

          {/* Computed Metrics Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Legacy Hardware VPN Annual TCO</div>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">
                ₹{calculatedTcoMetrics.totalVpnAnnualLakhs} <span className="text-sm font-normal text-white">Lakhs</span>
              </div>
              <div className="text-[11px] text-slate-400">Hardware + WAN Leased Lines</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Cloud ZTNA SaaS Annual TCO</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                ₹{calculatedTcoMetrics.totalZtnaAnnualLakhs} <span className="text-sm font-normal text-white">Lakhs</span>
              </div>
              <div className="text-[11px] text-slate-400">Zero Hardware Maintenance</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Net Annual Cost Savings</div>
              <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                ₹{calculatedTcoMetrics.netAnnualSavingsLakhs} <span className="text-sm font-normal text-white">Lakhs</span>
              </div>
              <div className="text-[11px] text-slate-400">Recurring Annual TCO Savings</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Attack Surface Reduction</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                99.8%
              </div>
              <div className="text-[11px] text-slate-400">Zero Public Inbound Ports</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE COMPARISON MATRIX & CARTA MODEL */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              📊
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Technical Comparison: Legacy VPN vs Zero Trust Architecture
              </h2>
              <p className="text-sm text-slate-400">
                Detailed structural evaluation across access scope, attack surface, posture, and compliance
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-300 font-semibold">
                  <th className="p-3">Technical Dimension</th>
                  <th className="p-3 text-rose-400">Traditional VPN Concentrator</th>
                  <th className="p-3 text-emerald-400">Zero Trust Network Access (ZTNA)</th>
                  <th className="p-3 text-cyan-400">Security Benefit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Access Model</td>
                  <td className="p-3 text-rose-300">Broad Subnet Access (Layer 3/4)</td>
                  <td className="p-3 text-emerald-300">Per-Application Micro-Tunnel (Layer 7)</td>
                  <td className="p-3 text-cyan-300">Least-Privilege Enforcement</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Inbound Public Ports</td>
                  <td className="p-3 text-rose-300">Open TCP 443 / UDP 500 (Shodan Exposed)</td>
                  <td className="p-3 text-emerald-300">ZERO Inbound Ports (Outbound-Only Connectors)</td>
                  <td className="p-3 text-cyan-300">Immunity to RCE &amp; Port Scanners</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Lateral Movement</td>
                  <td className="p-3 text-rose-300 font-bold">Unrestricted Subnet Scanning (Nmap/SMB)</td>
                  <td className="p-3 text-emerald-300">Physically Impossible (No Subnet Route)</td>
                  <td className="p-3 text-cyan-300">Ransomware Lateral Containment</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Trust Evaluation</td>
                  <td className="p-3 text-rose-300">Static (Single handshake at morning login)</td>
                  <td className="p-3 text-emerald-300">Continuous CARTA (Real-time telemetry)</td>
                  <td className="p-3 text-cyan-300">Instant Mid-Session Revocation</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Contractor &amp; BYOD Access</td>
                  <td className="p-3 text-rose-300">High Risk (Exposes entire intranet subnet)</td>
                  <td className="p-3 text-emerald-300">Safe (Clientless Browser Isolation Sandboxes)</td>
                  <td className="p-3 text-cyan-300">Zero Unmanaged Device Exposure</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Compliance Standard</td>
                  <td className="p-3 text-rose-300">Legacy Perimeter Security</td>
                  <td className="p-3 text-emerald-300">NIST SP 800-207 &amp; CISA ZTMM Optimal</td>
                  <td className="p-3 text-cyan-300">Meets Modern Zero Trust Mandates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* REAL-WORLD USAGE EXAMPLES (4 DETAILED SCENARIOS) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              🏢
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Real-World Enterprise Implementation Scenarios
              </h2>
              <p className="text-sm text-slate-400">
                How modern enterprises deploy ZTNA across development, finance, cloud SaaS, and third-party contractors
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>👨‍💻</span> Scenario 1: Third-Party Developer Isolation
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Clientless ZTNA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu works as an external contractor in Jadavpur, developing
                front-end code for the Barrackpore municipal portal.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Policy: Service-Initiated ZTNA gives Debangshu access ONLY to Git (Port 22) and Jira (Port 443) via browser sandboxing.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Debangshu cannot ping or reach the municipal tax core database; zero software required on his laptop.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🏦</span> Scenario 2: Continuous Posture Verification
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Agentic ZTNA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita processes municipal payroll from Barrackpore on a corporate laptop.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Policy: Endpoint-Initiated ZTNA continuously verifies BitLocker encryption, CrowdStrike EDR status, and OS patch freshness.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> If Susmita connects an unauthorized infected USB, the ZTNA agent revokes payroll access in milliseconds.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>⚡</span> Scenario 3: Eliminating Public Gateway RCEs
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Dark Cloud
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Mamata manages 8 on-prem datacenters in Kolkata. Legacy VPN concentrators suffered
                frequent zero-day exploit attempts.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Policy: Replaced hardware concentrators with Dockerized ZTNA App Connectors initiating outbound-only tunnels to Cloud Edge.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> All 65,535 external ports closed on perimeter firewalls; 100% immune to internet-wide automated CVE exploits.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🤝</span> Scenario 4: Frictionless M&amp;A Network Integration
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Layer 7 Proxying
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila oversees a merger between two FinTech companies in Salt Lake both using
                overlapping <code className="text-amber-300 font-mono">10.0.0.0/8</code> subnets.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Policy: Deployed ZTNA application connectors in both environments, routing users strictly by domain names (FQDNs).
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Zero IP address renumbering or complex NAT routing required; day-one secure application access achieved.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC INCIDENT DRILLS (WEST BENGAL CASE STUDIES) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
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
                  Real-world enterprise case studies and emergency incident responses executed in Barrackpore &amp; Kolkata
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveDrillKey("barrackpore_contractor_breach")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_contractor_breach"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore Contractor Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_fintech_gateway_exploit")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_fintech_gateway_exploit"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Sector V Zero-Day Drill
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{currentDrill.title}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-emerald-300 border border-slate-700 font-mono">
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
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              🐍
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Programmatic Zero Trust Context &amp; Micro-Tunnel Engine (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Inspect device health posture, evaluate least-privilege role policies, and quantify lateral movement blast radius
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={ztnaPolicyEnginePy}
            title="ztna_policy_engine.py"
            highlightLines={[42, 65, 87, 100]}
          />
        </section>

        {/* ========================================================================= */}
        {/* TIPS & TRICKS, PITFALLS, BEST PRACTICES & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                5. Professional Wisdom, Common Pitfalls &amp; Student Checklist
              </h2>
              <p className="text-sm text-slate-400">
                Essential Zero Trust engineering principles, common beginner misconceptions, and revision points
              </p>
            </div>
          </div>

          {/* Tips & Tricks */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🚀</span> Professional Tips &amp; Tricks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">1. Start with Contractors &amp; Vendors:</strong>
                <p className="text-slate-400">
                  Begin your ZTNA migration with third-party contractors using Clientless Browser Isolation. This immediately
                  neutralizes your highest-risk attack surface without requiring software agent rollouts.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Deploy Outbound Connectors in Pairs:</strong>
                <p className="text-slate-400">
                  Always deploy at least two App Connectors inside each datacenter or VPC for High Availability (HA). Connectors
                  operate in active-active outbound mode without requiring public virtual IP addresses.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Enforce FIDO2 Passkeys on IdP:</strong>
                <p className="text-slate-400">
                  Integrate your ZTNA broker with an IdP enforcing phishing-resistant FIDO2 hardware keys. This renders credential
                  theft and adversary-in-the-middle (AiTM) phishing attacks 100% ineffective.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Close Inbound Port 443 on Firewalls:</strong>
                <p className="text-slate-400">
                  Once ZTNA connectors are active, permanently delete inbound NAT forwarding rules for your old VPN concentrators.
                  Your organization should show 0 open listening ports on Shodan!
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
                <strong className="text-rose-300">Misconception 1: "ZTNA is just a faster VPN."</strong>
                <p className="text-slate-400">
                  ZTNA is fundamentally different: a VPN connects a device to a network, whereas ZTNA connects an authenticated
                  user to an authorized application without ever granting network routing privileges!
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "ZTNA only works for HTTP/HTTPS websites."</strong>
                <p className="text-slate-400">
                  Modern ZTNA endpoint agents create authenticated Layer 4 micro-tunnels supporting legacy client-server protocols,
                  including SSH (port 22), RDP (port 3389), and Oracle SQL (port 1521).
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Failing to Enforce Device Health Posture:</strong>
                <p className="text-slate-400">
                  If your ZTNA policy only checks username and password without verifying EDR status and BitLocker encryption,
                  compromised malware-infected laptops will still gain access to sensitive corporate apps.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Leaving Legacy VPN Gateways Powered On:</strong>
                <p className="text-slate-400">
                  Migrating 90% of staff to ZTNA while leaving an unpatched legacy VPN online for a few legacy users leaves the
                  front door wide open to automated ransomware exploitation.
                </p>
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className="bg-emerald-950/40 border border-emerald-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <span>💭</span> Pedagogical Hints for System Analysts
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-emerald-200">Think about:</strong> Why does giving an internal IP address (e.g., 10.14.0.88) to a remote laptop create an immediate security hazard?</li>
              <li><strong className="text-emerald-200">Observe carefully:</strong> How outbound-only App Connectors eliminate the need to open port 443 or port 500 on external corporate firewalls.</li>
              <li><strong className="text-emerald-200">Try changing this:</strong> Simulate an infected contractor persona in Studio 2 and observe how ZTNA drops lateral SMB connection attempts.</li>
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
                <span>Explain the difference between Network Access (VPN) and Application Access (ZTNA)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Define the Software-Defined Perimeter (SDP) Control Plane vs Data Plane</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain how outbound-only App Connectors make internal servers invisible to Shodan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe CARTA continuous posture verification across the four trust pillars</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="Zero Trust Network Access (ZTNA) vs Traditional VPNs FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="Zero Trust Network Access (ZTNA) vs Traditional VPNs Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic9_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="As future cybersecurity engineers and network architects, you must understand that the era of trusting endpoints simply because they reside behind a VPN tunnel is over. Traditional VPNs were built for a 1990s world where applications lived in a single physical building. In our modern cloud-distributed landscape, the network is untrusted by default. Zero Trust Network Access (ZTNA) embodies the gold standard of modern defensive engineering: grant access strictly to verified applications on healthy devices, enforce continuous real-time posture checks, and make your infrastructure completely dark to internet scanners. When designing enterprise access architectures, always remember: never trust the network, always verify the identity!"
        />

      </div>
    </div>
  );
};

export default Topic9;
