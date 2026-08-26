import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic2_files/vpn_architecture_sim.py?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgRemoteAccessId = useId();
  const svgSiteToSiteId = useId();

  // Studio 1: Active Architectural Dimension Selection
  const [selectedArchKey, setSelectedArchKey] = useState("endpoints_and_termination");

  // Studio 2: Live Architecture Simulator State
  const [selectedTrafficSource, setSelectedTrafficSource] = useState("remote_worker"); // "remote_worker", "branch_workstation"
  const [mfaValidationSuccess, setMfaValidationSuccess] = useState(true);

  // Studio 3: Performance & Sizing Calculations
  const [remoteStaffCount, setRemoteStaffCount] = useState(300); // 50 to 1500 users
  const [branchSitesCount, setBranchSitesCount] = useState(5); // 1 to 15 branches
  const [branchBandwidthMbps, setBranchBandwidthMbps] = useState(100); // 50 to 1000 Mbps

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_hybrid_mesh");

  // Comparison Database for Studio 1
  const architecturalDimensions = {
    endpoints_and_termination: {
      key: "endpoints_and_termination",
      title: "1. Endpoints & Termination Model",
      category: "Network Topology",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      raDetail: "Endpoint Host-to-Gateway. The tunnel originates on individual laptops, phones, or tablets and terminates on a central VPN concentrator.",
      s2sDetail: "Gateway-to-Gateway / Router-to-Router. The tunnel originates and terminates on perimeter hardware routers or Next-Gen Firewalls.",
      verdict: "Remote Access terminates directly on user endpoints; Site-to-Site terminates on network infrastructure."
    },
    ip_addressing_and_routing: {
      key: "ip_addressing_and_routing",
      title: "2. IP Addressing & Routing Mechanics",
      category: "Addressing & Routes",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      raDetail: "Dynamic Virtual IP Pool Lease. Gateway assigns a private IP (e.g. 10.200.1.45) to a virtual TUN adapter, injecting host routes.",
      s2sDetail: "Subnet-to-Subnet Routing. Internal LAN subnets (10.10.0.0/16) route transparently across Virtual Tunnel Interfaces (VTIs) using BGP/OSPF.",
      verdict: "Remote Access dynamically leases virtual IPs to clients; Site-to-Site routes entire permanent subnets."
    },
    authentication_and_identity: {
      key: "authentication_and_identity",
      title: "3. Authentication & Identity Validation",
      category: "Identity & Access",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      raDetail: "User-Centric + Device PKI. Combines SAML 2.0 / RADIUS Multi-Factor Authentication (MFA) with machine TPM certificates.",
      s2sDetail: "Device-Centric. Authenticated mutually between routers using Pre-Shared Keys (PSKs) or X.509 Device Certificates.",
      verdict: "Remote Access requires user login credentials; Site-to-Site relies on permanent hardware trust."
    },
    user_experience_and_software: {
      key: "user_experience_and_software",
      title: "4. User Experience & Software Footprint",
      category: "Operational Experience",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      raDetail: "Requires Client Software (WireGuard, OpenVPN Connect, Cisco AnyConnect) or browser (Clientless SSL-VPN). Visible to the user.",
      s2sDetail: "100% Transparent to end-users. Workstations inside branch offices require zero VPN software or manual logins.",
      verdict: "Site-to-Site is completely invisible to users; Remote Access requires client software and user authentication."
    }
  };

  // Studio 2: Live Architecture Simulator Evaluation
  const simulatedRouteResult = useMemo(() => {
    if (selectedTrafficSource === "remote_worker") {
      if (!mfaValidationSuccess) {
        return {
          architecture: "Remote Access VPN (Client-to-Gateway)",
          status: "DENIED",
          verdict: "❌ ACCESS DENIED: MFA Challenge Rejected by IdP!",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
          assignedIp: "None (Session Terminated)",
          tunnelInterface: "None",
          routingMethod: "None",
          explanation: "The remote employee failed the SAML MFA / FIDO2 challenge. The gateway terminated the connection immediately without allocating a virtual IP."
        };
      } else {
        return {
          architecture: "Remote Access VPN (Client-to-Gateway)",
          status: "ESTABLISHED",
          verdict: "✔ REMOTE TUNNEL ACTIVE: Dynamic Virtual IP Leased!",
          badgeColor: "bg-sky-950 text-sky-300 border-sky-700",
          assignedIp: "10.200.1.42 (Leased from Pool 10.200.1.0/24)",
          tunnelInterface: "Virtual Adapter (dev tun0 / WireGuard)",
          routingMethod: "Host Route Injected: 10.20.0.0/16 via 10.200.1.1",
          explanation: "Client authenticated via SAML MFA + TPM Machine Cert. Gateway leased virtual IP 10.200.1.42 and injected corporate routes into the laptop's routing table."
        };
      }
    } else {
      // Site-to-Site Workstation
      return {
        architecture: "Site-to-Site VPN (Router-to-Router / VTI Mesh)",
        status: "ALWAYS_ON_ACTIVE",
        verdict: "✔ 100% TRANSPARENT: Routed via IPsec VTI Tunnel1!",
        badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
        assignedIp: "10.10.1.25 (Original Branch LAN Static IP - No Virtual IP Needed)",
        tunnelInterface: "Hardware Interface (Tunnel1 - IPsec VTI on Cisco Router)",
        routingMethod: "Route-Based BGP Dynamic Steering (10.10.0.0/16 ➔ 10.20.0.0/16)",
        explanation: "Workstation sent standard packet to 10.20.1.50. The branch edge router intercepted, encapsulated in IPsec ESP, and forwarded across VTI Tunnel1 transparently."
      };
    }
  }, [selectedTrafficSource, mfaValidationSuccess]);

  // Studio 3: Performance Calculations
  const calculatedCapacityMetrics = useMemo(() => {
    // Total aggregate Remote Access throughput (Mbps)
    const remoteAccessTotalMbps = remoteStaffCount * 5; // 5 Mbps per user
    const branchOfficesTotalMbps = branchSitesCount * branchBandwidthMbps;
    const aggregateCoreBandwidthGbps = ((remoteAccessTotalMbps + branchOfficesTotalMbps) / 1000).toFixed(2);

    // 5-Year Enterprise Hybrid Concentrator TCO (INR ₹ Lakhs)
    const centralConcentratorLakhs = (Number(aggregateCoreBandwidthGbps) * 3.5 + 12.0).toFixed(2);
    const branchRoutersLakhs = (branchSitesCount * 0.85 + 2.0).toFixed(2);
    const remoteLicensesLakhs = ((remoteStaffCount * 1200 * 5) / 100000).toFixed(2);
    const fiveYearTcoLakhs = (Number(centralConcentratorLakhs) + Number(branchRoutersLakhs) + Number(remoteLicensesLakhs) + 5.0).toFixed(2);

    return {
      remoteAccessTotalMbps,
      branchOfficesTotalMbps,
      aggregateCoreBandwidthGbps,
      fiveYearTcoLakhs
    };
  }, [remoteStaffCount, branchSitesCount, branchBandwidthMbps]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_hybrid_mesh: {
      id: "barrackpore_hybrid_mesh",
      title: "North 24 Parganas Municipal Hybrid Deception & VPN Mesh",
      location: "Barrackpore Main Office, Ichapur Substation, Shyamnagar Center & Salt Lake Datacenter",
      architecture: "Site-to-Site IPsec VTI Mesh (BGP Dynamic Routing) + Remote Access WireGuard Gateway",
      threatScenario: "An attacker severed the primary fiber link in Shyamnagar while launching credential spraying against remote municipal inspectors.",
      solution: "Sukanta Hui, Mamata, and Mahima configured sub-second BGP failover over backup 5G tunnels and enforced SAML FIDO2 MFA on the WireGuard gateway.",
      outcome: "Zero civic portal downtime; 100% of credential spraying attacks blocked by MFA; verified compliance with CERT-In 180-day retention directives."
    },
    saltlake_enterprise_dmvpn: {
      id: "saltlake_enterprise_dmvpn",
      title: "Salt Lake Sector V State E-Governance Dynamic Multipoint (DMVPN) Grid",
      location: "Sector V Central Hub connecting 12 District Collectorates across West Bengal",
      architecture: "Cisco DMVPN (Multipoint GRE + NHRP + Dynamic IPsec) + AnyConnect Remote Access",
      threatScenario: "Direct district-to-district video conferencing overwhelmed the central hub bandwidth, causing severe packet loss.",
      solution: "Abhronila, Susmita, and Debangshu activated DMVPN dynamic spoke-to-spoke tunnels, allowing districts to stream video directly without traversing the central hub.",
      outcome: "Central bandwidth consumption reduced by 68%; latency dropped from 85ms to 14ms; full statutory compliance verified."
    }
  };

  const currentArch = architecturalDimensions[selectedArchKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            VPN Architecture: Remote Access vs Site-to-Site
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the structural paradigms of enterprise tunneling. Compare <strong className="text-sky-400">Remote Access (Client-to-Gateway)</strong> with <strong className="text-emerald-400">Site-to-Site (Router-to-Router)</strong>, explore <strong className="text-purple-400">Virtual Tunnel Interfaces (VTIs) &amp; BGP Dynamic Routing</strong>, and analyze <strong className="text-amber-400">Dynamic Multipoint (DMVPN)</strong> topologies.
          </p>
        </header>

        {/* SECTION 1: ARCHITECTURAL SVGS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Remote Access vs Site-to-Site Structural Topologies
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the client-to-gateway dynamic IP leasing model on the left and the router-to-router transparent VTI subnet mesh on the right.
            </p>
          </div>

          {/* SVG 1: RA VS S2S ARCHITECTURE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Remote Access (Host-to-Gateway) ➔ Site-to-Site (Router-to-Router)
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Dynamic Leasing vs Transparent VTI</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgRemoteAccessId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Remote Access vs Site to Site Architecture Diagram"
              >
                {/* LEFT: REMOTE ACCESS VPN */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  REMOTE ACCESS VPN (CLIENT-TO-GATEWAY)
                </text>

                {/* REMOTE WORKER CLIENT */}
                <rect x="35" y="60" width="105" height="110" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="87" y="78" fill="#7dd3fc" fontSize="7.5" fontWeight="bold" textAnchor="middle">Remote Laptop</text>
                <text x="87" y="94" fill="#ffffff" fontSize="6.5" textAnchor="middle">Client App (TUN)</text>
                <text x="87" y="110" fill="#a7f3d0" fontSize="6.5" textAnchor="middle">Leased IP:</text>
                <text x="87" y="125" fill="#a7f3d0" fontSize="6.5" fontWeight="bold" textAnchor="middle">10.200.1.45</text>
                <text x="87" y="145" fill="#fde68a" fontSize="6.5" textAnchor="middle">SAML MFA FIDO2</text>

                <path d="M 140 115 L 205 115" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />

                {/* CENTRAL VPN CONCENTRATOR */}
                <rect x="205" y="60" width="185" height="185" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="297" y="78" fill="#c7d2fe" fontSize="8" fontWeight="bold" textAnchor="middle">
                  VPN Concentrator Gateway
                </text>
                <text x="297" y="98" fill="#ffffff" fontSize="7" textAnchor="middle">• Dynamic IP Pool: 10.200.1.0/24</text>
                <text x="297" y="116" fill="#ffffff" fontSize="7" textAnchor="middle">• Radius / SAML IdP Verification</text>
                <text x="297" y="134" fill="#a7f3d0" fontSize="7" textAnchor="middle">• Host Posture &amp; EDR Check</text>
                <text x="297" y="152" fill="#fde68a" fontSize="7" textAnchor="middle">• Inactivity Timers &amp; Kill-Switch</text>
                <text x="297" y="175" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Connects to Corporate LAN
                </text>
                <text x="297" y="225" fill="#cbd5e1" fontSize="6.5" textAnchor="middle">
                  Visible to User (Session Active)
                </text>

                {/* RIGHT: SITE-TO-SITE VPN */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                  SITE-TO-SITE VPN (ROUTER-TO-ROUTER)
                </text>

                {/* BRANCH OFFICE LAN */}
                <rect x="455" y="60" width="105" height="110" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="507" y="78" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">Branch Subnet</text>
                <text x="507" y="94" fill="#ffffff" fontSize="6.5" textAnchor="middle">10.10.0.0/16</text>
                <text x="507" y="110" fill="#ffffff" fontSize="6.5" textAnchor="middle">Workstations</text>
                <text x="507" y="130" fill="#fde68a" fontSize="6.5" textAnchor="middle">Zero Client App</text>
                <text x="507" y="150" fill="#a7f3d0" fontSize="6.5" fontWeight="bold" textAnchor="middle">100% Transparent</text>

                <path d="M 560 115 L 610 115" stroke="#10b981" strokeWidth="2" />

                {/* EDGE ROUTERS WITH VTI */}
                <rect x="610" y="60" width="205" height="185" rx="5" fill="#082f49" stroke="#0284c7" />
                <text x="712" y="78" fill="#7dd3fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Route-Based IPsec (VTI)
                </text>
                <text x="712" y="98" fill="#ffffff" fontSize="7" textAnchor="middle">• Permanent 24/7 Always-On Link</text>
                <text x="712" y="116" fill="#ffffff" fontSize="7" textAnchor="middle">• Route-Based VTI (Tunnel1)</text>
                <text x="712" y="134" fill="#a7f3d0" fontSize="7" textAnchor="middle">• Dynamic BGP / OSPF Steering</text>
                <text x="712" y="152" fill="#fde68a" fontSize="7" textAnchor="middle">• Dead Peer Detection (DPD)</text>
                <text x="712" y="175" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Connects to HQ (10.20.0.0/16)
                </text>
                <text x="712" y="225" fill="#cbd5e1" fontSize="6.5" textAnchor="middle">
                  Device Certificate / PSK Auth
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: ARCHITECTURAL COMPARISON MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Remote Access vs Site-to-Site Architectural Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the foundational differences across Network Topology, IP Addressing, Authentication, and User Experience.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentArch.badgeColor)}>
              {currentArch.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(architecturalDimensions).map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedArchKey(d.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedArchKey === d.key
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
                <h3 className="text-base font-bold text-white">{currentArch.title}</h3>
                <span className="text-gray-400">Category: {currentArch.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentArch.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
                  💻 1. Remote Access VPN (Client-to-Gateway):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentArch.raDetail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-950/80 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  🏢 2. Site-to-Site VPN (Router-to-Router):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentArch.s2sDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentArch.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE VPN ROUTING & ARCHITECTURE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live VPN Packet Routing &amp; Architecture Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject packets from a roaming remote worker vs a branch office workstation to observe dynamic IP pool leasing vs static VTI route forwarding.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Architecture Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Network Traffic Origin:</label>
              <select
                value={selectedTrafficSource}
                onChange={(e) => setSelectedTrafficSource(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="remote_worker">1. Roaming Field Inspector (Remote Access VPN)</option>
                <option value="branch_workstation">2. Barrackpore Branch Workstation (Site-to-Site IPsec)</option>
              </select>
            </div>

            {selectedTrafficSource === "remote_worker" ? (
              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-semibold block">SAML Multi-Factor Auth (MFA) State:</label>
                <button
                  onClick={() => setMfaValidationSuccess(!mfaValidationSuccess)}
                  className={clsx(
                    "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                    mfaValidationSuccess
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-800 shadow-md shadow-emerald-500/10"
                      : "bg-rose-950/80 text-rose-300 border-rose-800 shadow-md shadow-rose-500/10"
                  )}
                >
                  {mfaValidationSuccess ? "✔ MFA Challenge SUCCESS (Valid FIDO2 Key)" : "❌ MFA Challenge FAILED (Rejected by IdP)"}
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-semibold block">Edge Router IPsec VTI State:</label>
                <div className="w-full p-2 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-emerald-400 font-mono">
                  ✔ VTI Tunnel1 UP (BGP Peer Established)
                </div>
              </div>
            )}
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Active Architecture:
                </span>
                <span className="text-white font-bold text-sm">{simulatedRouteResult.architecture}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                simulatedRouteResult.badgeColor
              )}>
                {simulatedRouteResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">IP Addressing &amp; Interface:</span>
                <div className="text-gray-300 text-xs">IP: {simulatedRouteResult.assignedIp}</div>
                <div className="text-gray-400 text-[11px]">Interface: {simulatedRouteResult.tunnelInterface}</div>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold text-[11px] block">Routing Mechanics:</span>
                <div className="text-gray-300 text-xs">{simulatedRouteResult.routingMethod}</div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Execution Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed font-sans">{simulatedRouteResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: ARCHITECTURE SIMULATOR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: VPN Architecture Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation contrasting Remote Access virtual IP leasing and MFA verification with Site-to-Site VTI route forwarding.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              vpn_architecture_sim.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="vpn_architecture_sim.py"
            highlightLines={[25, 42, 55, 68]}
          />
        </section>

        {/* STUDIO 3: HYBRID TOPOLOGY SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Hybrid Topology Sizing, Concurrency &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate total datacenter core bandwidth (Gbps), remote worker concurrency, and 5-year hybrid VPN infrastructure TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Capacity Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Remote Staff Count:</span>
                <span className="text-sky-400 font-bold">{remoteStaffCount} Users</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={remoteStaffCount}
                onChange={(e) => setRemoteStaffCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">Traffic: ~{calculatedCapacityMetrics.remoteAccessTotalMbps} Mbps</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Branch Sites Count:</span>
                <span className="text-purple-400 font-bold">{branchSitesCount} Branches</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={branchSitesCount}
                onChange={(e) => setBranchSitesCount(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Bandwidth per Branch:</span>
                <span className="text-emerald-400 font-bold">{branchBandwidthMbps} Mbps</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={branchBandwidthMbps}
                onChange={(e) => setBranchBandwidthMbps(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Core Gateway Throughput</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedCapacityMetrics.aggregateCoreBandwidthGbps} Gbps</div>
              <span className="text-[10px] text-gray-500 block">Remote Access + Branch Mesh</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Connected Entities</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{remoteStaffCount + branchSitesCount} Endpoints</div>
              <span className="text-[10px] text-gray-500 block">Hybrid Roaming + Branch Fleet</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Hybrid TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedCapacityMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Concentrator + Branch Edge + Lic</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.architecture}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical Hybrid Deployment:</span>
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
                <span>Remote Access VPN connects individual roaming endpoints to a central gateway with dynamic virtual IPs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Site-to-Site VPN connects entire branch networks transparently using router-to-router hardware tunnels.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Route-Based VPNs use Virtual Tunnel Interfaces (VTIs) to support dynamic routing (BGP and OSPF).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Dead Peer Detection (DPD) periodically verifies remote router liveness in Site-to-Site tunnels.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Remote Access VPNs mandate Multi-Factor Authentication (MFA) to prevent credential abuse.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all VPN authentication logs synchronized with NPL India NTP servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Remote Access vs Site-to-Site VPN FAQs"
            subtitle="30 In-depth Practice Questions &amp; VPN Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="VPN Architecture: Remote Access vs Site-to-Site (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 2 establishes the core architectural division in enterprise tunneling! Remote Access VPNs terminate on user endpoints, leasing dynamic virtual IPs and enforcing SAML MFA for roaming staff. Site-to-Site VPNs terminate on edge hardware routers, using Route-Based Virtual Tunnel Interfaces (VTIs) and dynamic BGP/OSPF routing to connect entire branch offices transparently with zero client software required. In Topic 3, we will explore Core Security Services in VPNs: Confidentiality, Integrity, and Authentication in deep cryptographic detail!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic2;
