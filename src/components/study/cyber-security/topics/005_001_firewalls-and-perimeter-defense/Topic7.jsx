import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic7_files/arch_simulator.py?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgTopologiesId = useId();
  const svgHeterogeneousId = useId();

  // Studio 1: Active Architecture Tab Selection
  const [selectedArchKey, setSelectedArchKey] = useState("screened_subnet_dmz");

  // Studio 2: Live Architecture Blast Radius Simulator State
  const [selectedAttackScenario, setSelectedAttackScenario] = useState("compromised_dmz_web");
  const [activeArchitecture, setActiveArchitecture] = useState("screened_subnet"); // dual_homed, screened_host, screened_subnet
  const [vendorDiversityEnabled, setVendorDiversityEnabled] = useState(true);

  // Studio 3: Sizing & Availability Calculator
  const [annualBudgetLakhs, setAnnualBudgetLakhs] = useState(35); // 10 to 100 Lakhs
  const [datacenterTier, setDatacenterTier] = useState("tier3"); // tier2, tier3, tier4
  const [enterpriseRevenueCrores, setEnterpriseRevenueCrores] = useState(80); // ₹ Crores

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_dmz_drill");

  // Architectural Topologies Database for Studio 1
  const architectureTopologies = {
    dual_homed_host: {
      key: "dual_homed_host",
      title: "1. Dual-Homed Host Architecture",
      structure: "1 Computer with 2 Network Interface Cards (NICs)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      securityLevel: "Low to Moderate (Single Point of Failure)",
      kernelConfig: "IP Forwarding MUST be disabled (`net.ipv4.ip_forward = 0`).",
      operationalFlow: "All traffic must terminate on local application-level proxy daemons; no direct Layer 3 packet routing occurs between NICs.",
      criticalVulnerability: "If an attacker achieves root access or exploits a local buffer overflow, they enable IP forwarding and instantly gain full access to the internal network."
    },
    screened_host: {
      key: "screened_host",
      title: "2. Screened Host Architecture",
      structure: "1 Edge Screening Router + 1 Bastion Host on LAN",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      securityLevel: "Moderate (LAN at High Risk)",
      kernelConfig: "Screening Router enforces ACLs permitting external traffic ONLY to Bastion IP.",
      operationalFlow: "External users connect to Bastion Host; Bastion proxies connections to internal LAN. Screening router drops direct external access to user desktops.",
      criticalVulnerability: "The Bastion Host is physically attached to the internal private LAN! If the bastion is compromised, the attacker is already inside the corporate subnet."
    },
    screened_subnet_dmz: {
      key: "screened_subnet_dmz",
      title: "3. Screened Subnet (DMZ) Architecture",
      structure: "Isolated Buffer Subnet with Tri-Homed or Dual Firewalls",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      securityLevel: "High to Military Grade (Gold Standard)",
      kernelConfig: "Strict One-Way Access Policy: DMZ servers can NEVER initiate connections to LAN.",
      operationalFlow: "Public servers (Web, DNS, Mail) reside in the DMZ. External users reach the DMZ only; internal databases are shielded behind an internal firewall tier.",
      criticalVulnerability: "Compromise of a DMZ web server is strictly contained in the buffer subnet; internal databases remain completely protected."
    },
    heterogeneous_back_to_back: {
      key: "heterogeneous_back_to_back",
      title: "4. Heterogeneous Back-to-Back Dual Firewalls",
      structure: "2 Separate Firewalls from Different Vendors in Series",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      securityLevel: "Maximum Defense-in-Depth (Zero-Day Resilient)",
      kernelConfig: "Vendor A (Palo Alto) at Edge + Vendor B (Fortinet) at Internal Core.",
      operationalFlow: "External firewall filters WAN traffic into DMZ; Internal firewall filters DMZ traffic into LAN. If a zero-day breaches Vendor A, the exploit fails at Vendor B.",
      criticalVulnerability: "Increased configuration complexity and management overhead across two distinct firewall operating systems."
    }
  };

  // Studio 2: Attack Scenarios Database
  const attackScenarios = {
    compromised_dmz_web: {
      id: "compromised_dmz_web",
      label: "Compromised DMZ Web Server ➔ Lateral SMB Scan (Port 445)",
      src: "172.16.1.10 (Compromised Web Server)",
      dst: "10.10.4.50:445 (Internal DB)",
      dualHomedResult: "VULNERABLE (If Host Root Compromised)",
      screenedHostResult: "COMPROMISED (Bastion on same LAN switch!)",
      screenedSubnetResult: "🛡️ CONTAINED (Internal Firewall dropped Port 445 scan!)",
      analysis: "In a Screened Subnet, the internal firewall drops unsolicited SMB scans from the DMZ, completely halting lateral ransomware propagation."
    },
    direct_wan_ssh_probe: {
      id: "direct_wan_ssh_probe",
      label: "External WAN Attacker ➔ Direct SSH Probe to Internal Workstation",
      src: "198.51.100.25:54200",
      dst: "10.10.1.50:22 (Internal LAN)",
      dualHomedResult: "DROPPED (IP Forwarding Disabled)",
      screenedHostResult: "DROPPED (Screening Router ACL)",
      screenedSubnetResult: "🛡️ DROPPED (External Firewall Default-Deny)",
      analysis: "All three architectures block direct unauthenticated WAN-to-LAN connections when properly configured."
    },
    authorized_db_query: {
      id: "authorized_db_query",
      label: "Legitimate Web Application Query ➔ Internal Database Pinhole",
      src: "172.16.1.10:48200 (DMZ Web)",
      dst: "10.10.4.50:5432 (PostgreSQL)",
      dualHomedResult: "PROXIED",
      screenedHostResult: "PERMITTED",
      screenedSubnetResult: "✔ PERMITTED (mTLS Pinhole Rule #40)",
      analysis: "Explicitly whitelisted database pinhole permits parameterized queries via mutual TLS while blocking all other ports."
    }
  };

  // Studio 3: Sizing Calculations
  const calculatedAvailability = useMemo(() => {
    // Annual downtime hours based on architecture
    const singleFwDowntimeHours = datacenterTier === "tier4" ? 0.8 : 4.5;
    const dualFwDowntimeHours = datacenterTier === "tier4" ? 0.05 : 0.4;

    // Availability percentage
    const singleAvailability = (100 - (singleFwDowntimeHours / 8760) * 100).toFixed(4);
    const dualAvailability = (100 - (dualFwDowntimeHours / 8760) * 100).toFixed(4);

    // DPDP Act 2023 Risk Exposure Protection (₹ Crores)
    const maxDPDPPenalty = 250;
    const riskExposureProtectionCrores = (enterpriseRevenueCrores * 0.15 + maxDPDPPenalty * 0.25).toFixed(2);

    // 5-Year Hardware TCO (INR ₹ Lakhs)
    const hardwareCostLakhs = (annualBudgetLakhs * 1.8).toFixed(2);

    return {
      singleAvailability,
      dualAvailability,
      singleFwDowntimeHours,
      dualFwDowntimeHours,
      riskExposureProtectionCrores,
      hardwareCostLakhs
    };
  }, [annualBudgetLakhs, datacenterTier, enterpriseRevenueCrores]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_dmz_drill: {
      id: "barrackpore_dmz_drill",
      title: "Barrackpore Municipal Civic Portal Screened Subnet DMZ",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      topology: "Screened Subnet with Heterogeneous Back-to-Back Firewalls",
      threatScenario: "Nation-state threat actor exploited an RCE vulnerability on the public web server, attempting to pivot into municipal tax databases.",
      solution: "Sukanta Hui and Debangshu architected a Screened Subnet with Palo Alto at the edge and Fortinet at the internal core. The compromised web server in the DMZ was blocked from initiating connections to the internal LAN by the internal screening firewall.",
      outcome: "Breach strictly contained in DMZ buffer; zero citizen tax or Aadhaar records compromised; avoided ₹18 Crores in potential extortion and DPDP penalties."
    },
    saltlake_clearinghouse: {
      id: "saltlake_clearinghouse",
      title: "Salt Lake Sector V Interbank Clearinghouse Dual-DMZ",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      topology: "3-Tier Multi-Tier Dual DMZ (Web DMZ -> App DMZ -> Core Vault)",
      threatScenario: "Sophisticated API exploit targeting transaction submission endpoints across 50,000 requests/second.",
      solution: "Mamata and Mahima deployed a Dual-DMZ architecture: Web presentation tier connects only to Application middleware in DMZ 2 via gRPC mTLS; zero direct database reachability exists from the web tier.",
      outcome: "Maintained 99.999% uptime for core UPI transactions with complete database isolation."
    }
  };

  const currentArch = architectureTopologies[selectedArchKey];
  const currentAttack = attackScenarios[selectedAttackScenario];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🏛️ Module 005_001 • Topic 7</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Firewall Architectures: Dual-Homed, Screened Host &amp; DMZ
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the physical and logical blueprint of perimeter protection. Understand the evolutionary progression from vulnerable <strong className="text-rose-400">Dual-Homed Hosts</strong> and <strong className="text-amber-400">Screened Hosts</strong> to resilient <strong className="text-emerald-400">Screened Subnet (DMZ)</strong> and <strong className="text-purple-400">Heterogeneous Back-to-Back</strong> architectures.
          </p>
        </header>

        {/* SECTION 1: TOPOLOGIES COMPARISON SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The 3 Classic Firewall Architectural Topologies
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the structural layout, trust boundaries, and single-point-of-failure vulnerabilities across architectures.
            </p>
          </div>

          {/* SVG 1: TOPOLOGY LAYOUTS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Architectural Topology Evolution: Dual-Homed vs Screened Host vs Screened Subnet
              </span>
              <span className="text-[11px] text-gray-400 font-mono">NIST SP 800-41 Aligned</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgTopologiesId}
                viewBox="0 0 850 320"
                className="w-full max-w-4xl h-auto"
                aria-label="Firewall Architectures Comparison Diagram"
              >
                {/* 1. DUAL-HOMED HOST */}
                <rect x="20" y="30" width="250" height="260" rx="8" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="145" y="55" fill="#f43f5e" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  1. DUAL-HOMED HOST
                </text>
                <text x="145" y="70" fill="#fda4af" fontSize="7.5" textAnchor="middle">
                  (Single Chokepoint Host)
                </text>

                <rect x="35" y="85" width="65" height="40" rx="4" fill="#27272a" />
                <text x="67" y="110" fill="#a1a1aa" fontSize="8" textAnchor="middle">Internet</text>

                <path d="M 100 105 L 120 105" stroke="#f43f5e" strokeWidth="2" />

                <rect x="120" y="85" width="70" height="75" rx="5" fill="#881337" stroke="#f43f5e" />
                <text x="155" y="105" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Dual-Homed</text>
                <text x="155" y="120" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">PC (2 NICs)</text>
                <text x="155" y="145" fill="#fecdd3" fontSize="6.5" textAnchor="middle">ip_forward=0</text>

                <path d="M 190 105 L 210 105" stroke="#f43f5e" strokeWidth="2" />

                <rect x="210" y="85" width="50" height="40" rx="4" fill="#064e3b" />
                <text x="235" y="110" fill="#34d399" fontSize="8" textAnchor="middle">LAN</text>

                <rect x="35" y="180" width="220" height="95" rx="5" fill="#27272a" />
                <text x="45" y="198" fill="#fca5a5" fontSize="8" fontWeight="bold">⚠️ Single Point of Failure:</text>
                <text x="45" y="215" fill="#e4e4e7" fontSize="7.5">Root compromise on host allows</text>
                <text x="45" y="228" fill="#e4e4e7" fontSize="7.5">attacker to enable ip_forward=1,</text>
                <text x="45" y="241" fill="#e4e4e7" fontSize="7.5">bridging Internet directly to LAN.</text>

                {/* 2. SCREENED HOST */}
                <rect x="290" y="30" width="255" height="260" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="417" y="55" fill="#f59e0b" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  2. SCREENED HOST
                </text>
                <text x="417" y="70" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  (Router + Bastion on LAN)
                </text>

                <rect x="305" y="85" width="55" height="40" rx="4" fill="#27272a" />
                <text x="332" y="110" fill="#a1a1aa" fontSize="8" textAnchor="middle">Internet</text>

                <path d="M 360 105 L 380 105" stroke="#f59e0b" strokeWidth="2" />

                <rect x="380" y="85" width="60" height="50" rx="5" fill="#78350f" stroke="#f59e0b" />
                <text x="410" y="105" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Screening</text>
                <text x="410" y="118" fill="#fde68a" fontSize="7.5" textAnchor="middle">Router</text>

                <path d="M 440 105 L 460 105" stroke="#f59e0b" strokeWidth="2" />

                <rect x="460" y="85" width="75" height="75" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="497" y="102" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">LAN Subnet</text>
                <rect x="468" y="110" width="60" height="20" rx="3" fill="#f59e0b" />
                <text x="497" y="123" fill="#000000" fontSize="7" fontWeight="bold" textAnchor="middle">Bastion Host</text>
                <text x="497" y="145" fill="#a7f3d0" fontSize="7" textAnchor="middle">User PCs</text>

                <rect x="305" y="180" width="225" height="95" rx="5" fill="#27272a" />
                <text x="315" y="198" fill="#fde68a" fontSize="8" fontWeight="bold">⚠️ High LAN Risk:</text>
                <text x="315" y="215" fill="#e4e4e7" fontSize="7.5">Bastion sits on internal LAN switch!</text>
                <text x="315" y="228" fill="#e4e4e7" fontSize="7.5">If Bastion is breached, attacker</text>
                <text x="315" y="241" fill="#e4e4e7" fontSize="7.5">scans LAN via ARP/SMB directly.</text>

                {/* 3. SCREENED SUBNET (DMZ) */}
                <rect x="565" y="30" width="265" height="260" rx="8" fill="#030712" stroke="#10b981" strokeWidth="2" />
                <text x="697" y="55" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  3. SCREENED SUBNET (DMZ)
                </text>
                <text x="697" y="70" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  (Enterprise Gold Standard)
                </text>

                <rect x="575" y="85" width="45" height="35" rx="4" fill="#27272a" />
                <text x="597" y="106" fill="#a1a1aa" fontSize="7" textAnchor="middle">WAN</text>

                <path d="M 620 102 L 635 102" stroke="#38bdf8" strokeWidth="2" />

                <rect x="635" y="85" width="40" height="50" rx="4" fill="#082f49" stroke="#38bdf8" />
                <text x="655" y="105" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">Ext FW</text>

                <path d="M 675 102 L 690 102" stroke="#38bdf8" strokeWidth="2" />

                <rect x="690" y="85" width="45" height="50" rx="4" fill="#1e1b4b" stroke="#f59e0b" />
                <text x="712" y="103" fill="#f59e0b" fontSize="7" fontWeight="bold" textAnchor="middle">DMZ</text>
                <text x="712" y="116" fill="#ffffff" fontSize="6.5" textAnchor="middle">Web/DNS</text>

                <path d="M 735 102 L 750 102" stroke="#10b981" strokeWidth="2" />

                <rect x="750" y="85" width="40" height="50" rx="4" fill="#064e3b" stroke="#10b981" />
                <text x="770" y="105" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">Int FW</text>

                <path d="M 790 102 L 805 102" stroke="#10b981" strokeWidth="2" />

                <rect x="805" y="85" width="20" height="35" rx="3" fill="#064e3b" />
                <text x="815" y="106" fill="#ffffff" fontSize="6" textAnchor="middle">LAN</text>

                <rect x="575" y="180" width="245" height="95" rx="5" fill="#022c22" stroke="#10b981" />
                <text x="585" y="198" fill="#34d399" fontSize="8" fontWeight="bold">✔ Blast Radius Isolated:</text>
                <text x="585" y="215" fill="#a7f3d0" fontSize="7.5">DMZ web hack is stopped by Internal FW.</text>
                <text x="585" y="228" fill="#a7f3d0" fontSize="7.5">Zero direct connectivity to LAN.</text>
                <text x="585" y="241" fill="#a7f3d0" fontSize="7.5">Core database remains 100% safe!</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: ARCHITECTURAL TOPOLOGIES EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Firewall Architectural Topologies Inspector
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the physical layout, operational flow, kernel configurations, and failure mode risks for each architecture.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentArch.badgeColor)}>
              {currentArch.title}
            </span>
          </div>

          {/* Architecture Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(architectureTopologies).map((a) => (
              <button
                key={a.key}
                onClick={() => setSelectedArchKey(a.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedArchKey === a.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {a.title}
              </button>
            ))}
          </div>

          {/* Active Topology Detail Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-sky-400">●</span> {currentArch.title}
                </h3>
                <span className="text-gray-400 font-sans">Physical Structure: {currentArch.structure}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentArch.badgeColor)}>
                {currentArch.securityLevel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                  ⚙️ Operational Flow &amp; Routing Mechanics:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentArch.operationalFlow}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  🔧 Mandatory Kernel Configuration:
                </span>
                <p className="text-gray-200 font-mono text-xs">{currentArch.kernelConfig}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-900/50 space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚠️ Critical Vulnerability &amp; Blast Radius Exposure:
              </span>
              <p className="text-rose-200 leading-relaxed">{currentArch.criticalVulnerability}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: BLAST RADIUS & COMPROMISE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Multi-Tier Zone Traversal &amp; Blast Radius Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate lateral attack attempts across architectures to see which topologies contain breaches vs which expose the internal LAN.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-sky-950 border border-sky-800 text-sky-300 text-xs font-mono self-start sm:self-auto">
              Zone Router
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Attack / Traversal Scenario:</label>
              <select
                value={selectedAttackScenario}
                onChange={(e) => setSelectedAttackScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(attackScenarios).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Heterogeneous Vendor Diversity (Dual FW):</label>
              <button
                onClick={() => setVendorDiversityEnabled(!vendorDiversityEnabled)}
                className={clsx(
                  "w-full p-2.5 rounded-lg text-xs font-semibold border transition-all",
                  vendorDiversityEnabled
                    ? "bg-purple-950/80 text-purple-300 border-purple-800"
                    : "bg-amber-950/80 text-amber-300 border-amber-800"
                )}
              >
                {vendorDiversityEnabled ? "✔ Heterogeneous Firewalls (Palo Alto + Fortinet)" : "⚠️ Homogeneous (Single Vendor Both Tiers)"}
              </button>
            </div>
          </div>

          {/* Attack Outcome Comparison Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Simulated Flow Traversal:
              </span>
              <div className="font-mono text-sky-300 text-xs sm:text-sm">
                {currentAttack.src} ➔ {currentAttack.dst}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-slate-900 border border-rose-950/60 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">1. Dual-Homed Host</span>
                <div className="text-xs font-bold text-rose-400">{currentAttack.dualHomedResult}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-amber-950/60 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">2. Screened Host</span>
                <div className="text-xs font-bold text-amber-400">{currentAttack.screenedHostResult}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-emerald-950/60 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">3. Screened Subnet (DMZ)</span>
                <div className="text-xs font-bold text-emerald-400">{currentAttack.screenedSubnetResult}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Architectural Rationale:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentAttack.analysis}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: ARCHITECTURE SIMULATOR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Topology Router &amp; Zone Traversal Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the complete Python script evaluating packet routing and breach blast radiuses across Dual-Homed, Screened Host, and Screened Subnet topologies.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              arch_simulator.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="arch_simulator.py"
            highlightLines={[25, 41, 55, 68]}
          />
        </section>

        {/* STUDIO 3: AVAILABILITY & MTBF CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Heterogeneous Firewall Availability &amp; DPDP Liability Protection
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate uptime availability differences between single and dual back-to-back firewalls, and statutory penalty protection under the DPDP Act 2023.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Availability Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Annual Security Budget:</span>
                <span className="text-sky-400 font-bold">₹{annualBudgetLakhs} Lakhs</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={annualBudgetLakhs}
                onChange={(e) => setAnnualBudgetLakhs(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Datacenter Reliability Tier:</span>
                <span className="text-purple-400 font-bold uppercase">{datacenterTier}</span>
              </div>
              <select
                value={datacenterTier}
                onChange={(e) => setDatacenterTier(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gray-200 focus:outline-none"
              >
                <option value="tier2">Tier 2 Datacenter (99.741% Uptime)</option>
                <option value="tier3">Tier 3 Datacenter (99.982% Uptime)</option>
                <option value="tier4">Tier 4 Datacenter (99.995% Uptime)</option>
              </select>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Enterprise Revenue:</span>
                <span className="text-emerald-400 font-bold">₹{enterpriseRevenueCrores} Crores</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={enterpriseRevenueCrores}
                onChange={(e) => setEnterpriseRevenueCrores(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Single Firewall Availability</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{calculatedAvailability.singleAvailability}%</div>
              <span className="text-[10px] text-gray-500 block">~{calculatedAvailability.singleFwDowntimeHours} Hours Downtime/Year</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Dual Back-to-Back Availability</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedAvailability.dualAvailability}%</div>
              <span className="text-[10px] text-gray-500 block">~{calculatedAvailability.dualFwDowntimeHours} Hours Downtime/Year</span>
            </div>

            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Avoided DPDP Breach Liability</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">₹{calculatedAvailability.riskExposureProtectionCrores} Cr</div>
              <span className="text-[10px] text-gray-500 block">Protected via Screened Subnet Isolation</span>
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
                DMZ Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Architectural Defense Strategy:</span>
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
                <span>Dual-Homed Host disables kernel IP forwarding (`ip_forward=0`); relies on application proxies.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Screened Host pairs an edge router with a bastion host physically located on the internal LAN.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Screened Subnet (DMZ) is the gold standard, isolating public servers in a dedicated buffer subnet.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Tri-Homed Firewall has 3 physical interfaces: Outside (WAN), DMZ (Public Servers), Inside (LAN).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Dual Back-to-Back Firewalls provide the highest defense, especially when using heterogeneous vendors.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Core DMZ rule: DMZ servers are strictly forbidden from initiating connections into the internal LAN.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Firewall Architectures: Dual-Homed, Screened Host & DMZ FAQs"
            subtitle="30 In-depth Practice Questions & Topology Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Firewall Architectures: Dual-Homed, Screened Host & DMZ (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Topic 7 of Module 005_001! In this lesson, we explored the physical and logical architectures of firewall design. Always remember: architecture dictates security posture! A Dual-Homed host suffers from a single-point-of-failure; a Screened Host leaves the internal LAN dangerously exposed if the bastion is breached; but a Screened Subnet (DMZ) provides true isolation. The foundational rule of DMZ engineering is the strict One-Way Connection Policy: internal users can administer DMZ servers, but DMZ servers can NEVER initiate connections to the internal LAN (with the sole exception of encrypted, tightly scoped database pinholes). In high-security environments, deploy Heterogeneous Back-to-Back firewalls from different vendors to defeat zero-day firmware exploits. In Topic 8, we will explore Demilitarized Zone (DMZ) Design & Bastion Hosts in exhaustive detail!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic7;
