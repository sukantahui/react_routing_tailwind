import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import splitTunnelAuditorPy from "./topic8_files/split_tunnel_auditor.py?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgArchitectureId = useId();
  const svgAttackFlowId = useId();

  // Studio 1: Active Tunneling Mode State
  const [selectedTunnelMode, setSelectedTunnelMode] = useState("full_tunnel"); // "full_tunnel", "standard_split", "inverse_split", "sase_edge"

  // Studio 2: Live Dual-Homed Pivot & Attack Lab State
  const [localNetworkEnv, setLocalNetworkEnv] = useState("untrusted_cafe"); // "untrusted_cafe", "home_wifi", "compromised_hotspot"
  const [endpointTunnelPolicy, setEndpointTunnelPolicy] = useState("split_no_isolation"); // "full_tunnel_secure", "split_no_isolation", "split_with_isolation"
  const [simulatedAttackType, setSimulatedAttackType] = useState("pivot_attack"); // "passive_sniff", "pivot_attack", "malware_exfil"

  // Studio 3: Bandwidth Hairpinning & Cost Calculator State
  const [remoteUserCount, setRemoteUserCount] = useState(600); // 50 to 5000 users
  const [videoTrafficPerDay, setVideoTrafficPerDay] = useState(3.5); // 0.5 to 10 GB/day/user
  const [gatewayBandwidthGbps, setGatewayBandwidthGbps] = useState(1.0); // 0.2 to 10 Gbps

  // Studio 4: Regional SOC Incident Drills State
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_dual_home");

  // Tunnel Architecture Specifications for Studio 1
  const tunnelArchitectures = {
    full_tunnel: {
      key: "full_tunnel",
      title: "1. Full Tunneling (Default-Route Encapsulation)",
      badge: "Maximum Security / Heavy Hairpinning",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      defaultRoute: "0.0.0.0/0 ➔ dev tun0 (Encrypted Tunnel to Corporate Gateway)",
      intranetTraffic: "Encapsulated & Inspected by Corporate Perimeter Firewall (NGFW/DLP)",
      internetTraffic: "Hairpinned through Corporate Datacenter Gateway before Web Egress",
      securityLevel: "100% Centralized Visibility & Threat Prevention",
      bandwidthImpact: "Very High WAN Utilization (Hairpinning/Traffic Tromboning)",
      dnsHandling: "Internal Corporate DNS Exclusively Enforced (Zero DNS Leaks)",
      complianceStatus: "Required for RBI Banking, PCI-DSS 4.0, and HIPAA Core Environments",
      verdict: "Essential for financial and high-assurance operations; demands high datacenter WAN bandwidth."
    },
    standard_split: {
      key: "standard_split",
      title: "2. Standard Split Tunneling (Split-Include)",
      badge: "High Performance / High Attack Surface",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      defaultRoute: "0.0.0.0/0 ➔ dev wlan0 (Direct Public Internet via Local ISP)",
      intranetTraffic: "10.0.0.0/8 & 172.16.0.0/12 ➔ dev tun0 (Only Private Subnets Encrypted)",
      internetTraffic: "Direct Local Breakout (Bypasses Corporate NGFW, DLP, and Proxies)",
      securityLevel: "High Risk of Dual-Homed Bridge Attacks, DNS Leaks, & DLP Blind Spots",
      bandwidthImpact: "Zero Corporate WAN Hairpinning for Public Web Streams",
      dnsHandling: "Prone to Multi-Homed DNS Leaks (Queries resolve over public ISP)",
      complianceStatus: "Prohibited in Cardholder Data Environments without strict Host Isolation",
      verdict: "Optimizes WAN bandwidth but leaves endpoints vulnerable to lateral pivoting and unmonitored exfiltration."
    },
    inverse_split: {
      key: "inverse_split",
      title: "3. Inverse Split Tunneling (Split-Exclude / SaaS Bypass)",
      badge: "Balanced Enterprise Hybrid",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      defaultRoute: "0.0.0.0/0 ➔ dev tun0 (Full Tunneling for General Internet & Intranet)",
      intranetTraffic: "All Corporate Subnets Encrypted & Inspected",
      internetTraffic: "Excluded Trusted SaaS (Microsoft 365, Teams, Zoom) Breakout Locally",
      securityLevel: "High Security with Specific Whitelisted Cloud Exceptions",
      bandwidthImpact: "Medium: 60-70% reduction in video hairpinning load",
      dnsHandling: "Corporate DNS for Intranet; Dynamic FQDN resolution for excluded SaaS",
      complianceStatus: "Widely accepted for general corporate and hybrid enterprise deployments",
      verdict: "The industry sweet spot: protects web browsing while eliminating video conference gateway congestion."
    },
    sase_edge: {
      key: "sase_edge",
      title: "4. SASE & Cloud-Delivered Security (Next-Gen)",
      badge: "Modern Gold Standard",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
      defaultRoute: "0.0.0.0/0 ➔ dev tun0 (Full Tunnel to Nearest Cloud Edge PoP in Kolkata)",
      intranetTraffic: "ZTNA Micro-Segmented Proxying to Specific Internal Applications",
      internetTraffic: "Inspected at Cloud Edge by Cloud SWG, CASB, and Cloud DLP",
      securityLevel: "100% Inspection Everywhere with Near-Zero Datacenter Bottlenecks",
      bandwidthImpact: "Zero Datacenter Hairpinning; Traffic stays at the Cloud Edge",
      dnsHandling: "Cloud Anycast Secure DNS with Real-Time Threat Blocking",
      complianceStatus: "Exceeds traditional compliance; aligns with NIST SP 800-207 Zero Trust",
      verdict: "Replaces traditional on-prem VPN concentrators with scalable, low-latency cloud inspection."
    }
  };

  // Studio 2: Live Attack Lab Computation
  const attackSimulationResult = useMemo(() => {
    let status = "SAFE";
    let riskBadge = "bg-emerald-950 text-emerald-300 border-emerald-700";
    let headline = "✔ Endpoint Isolated & Intranet Protected";
    let technicalFlow = "";
    let forensicFinding = "";

    if (endpointTunnelPolicy === "split_no_isolation") {
      status = "COMPROMISED";
      riskBadge = "bg-rose-950 text-rose-300 border-rose-700";
      headline = "🚨 CRITICAL BREACH: Dual-Homed Intranet Pivot Successful!";

      if (simulatedAttackType === "pivot_attack") {
        technicalFlow =
          "1. Attacker on local Wi-Fi (" +
          (localNetworkEnv === "untrusted_cafe"
            ? "Jadavpur Coffee Shop Hotspot"
            : localNetworkEnv === "compromised_hotspot"
            ? "Compromised Ichapur Router"
            : "Barrackpore Home Subnet") +
          ") exploits local OS port 445.\n" +
          "2. Attacker detects active tun0 interface (10.14.0.88) and routes packets via local forwarder.\n" +
          "3. Malicious packets bypass Corporate Perimeter NGFW, reaching internal Barrackpore ERP Database (10.14.0.5)!";
        forensicFinding =
          "Forensic log shows lateral SMB movement across virtual tun0 adapter originating from unauthorized 192.168.1.x MAC.";
      } else if (simulatedAttackType === "passive_sniff") {
        technicalFlow =
          "1. Attacker captures unencrypted public web requests sent over local Wi-Fi.\n" +
          "2. DNS queries for internal company hostnames leak over UDP 53 to local ISP.\n" +
          "3. Attacker maps corporate internal naming structure without triggering any corporate alerts.";
        forensicFinding = "DNS Leak Detected: Queries for 'payroll.internal' resolved by local residential Wi-Fi gateway.";
      } else {
        technicalFlow =
          "1. Malware payload downloaded over uninspected local internet channel.\n" +
          "2. Malware establishes outbound C2 beacon over direct ISP wlan0 interface.\n" +
          "3. Exfiltrates sensitive customer records from corporate 10.14.0.0/16 subnet directly to public cloud storage.";
        forensicFinding = "Data Loss Prevention Blind Spot: 1.4 GB exfiltrated to mega.nz via local ISP with 0 corporate alerts.";
      }
    } else if (endpointTunnelPolicy === "split_with_isolation") {
      status = "CONTAINED";
      riskBadge = "bg-amber-950 text-amber-300 border-amber-700";
      headline = "⚠️ ATTACK MITIGATED: Host Isolation Dropped Local Pivot";
      technicalFlow =
        "1. Attacker sends ARP poisoning and probe packets to client machine on local LAN.\n" +
        "2. Local Endpoint Firewall (Windows Defender / iptables) drops all local LAN traffic.\n" +
        "3. Lateral bridge attempt to 10.14.0.0/16 is blocked at the client kernel.";
      forensicFinding = "Local Firewall blocked 420 unauthorized inbound connection attempts from local 192.168.x.x subnet.";
    } else {
      // full_tunnel_secure
      status = "HARDENED";
      riskBadge = "bg-emerald-950 text-emerald-300 border-emerald-700";
      headline = "🛡️ 100% HARDENED: Full Tunnel + Central NGFW Active";
      technicalFlow =
        "1. All inbound and outbound packets (0.0.0.0/0) forced into encrypted VPN tunnel.\n" +
        "2. Central NGFW in Barrackpore Datacenter inspects and logs all web requests.\n" +
        "3. Local LAN communication is completely suppressed; DNS queries locked to internal resolver (10.0.0.53).";
      forensicFinding = "100% Centralized Audit Trail Verified. Zero packet leakage across physical wlan0 interface.";
    }

    return {
      status,
      riskBadge,
      headline,
      technicalFlow,
      forensicFinding
    };
  }, [localNetworkEnv, endpointTunnelPolicy, simulatedAttackType]);

  // Studio 3: Bandwidth & Financial Hairpinning Computation
  const calculatedWanMetrics = useMemo(() => {
    const workingDays = 22;
    // Total monthly video/SaaS data in GB
    const monthlyVideoGb = remoteUserCount * videoTrafficPerDay * workingDays;
    const monthlyVideoTb = (monthlyVideoGb / 1024).toFixed(2);

    // Peak bandwidth during simultaneous video call hours (assuming 35% concurrency)
    const peakConcurrentUsers = remoteUserCount * 0.35;
    const peakBandwidthRequiredMbps = (peakConcurrentUsers * 2.8).toFixed(1); // 2.8 Mbps per HD video call
    const peakBandwidthRequiredGbps = (Number(peakBandwidthRequiredMbps) / 1000).toFixed(2);

    // Saturation percentage against provisioned gateway bandwidth
    const gatewayCapacityMbps = gatewayBandwidthGbps * 1000;
    const saturationPercent = Math.min(
      100,
      Math.round((Number(peakBandwidthRequiredMbps) / gatewayCapacityMbps) * 100)
    );

    // Monthly WAN Leased Line bandwidth cost in INR (₹)
    // Approx rate: ₹3.8 per GB of overage / enterprise transit in India
    const monthlyExtraWanCostInr = monthlyVideoGb * 3.8;
    const monthlyCostInLakhs = (monthlyExtraWanCostInr / 100000).toFixed(2);

    // Latency penalty estimation
    const latencyPenaltyMs = saturationPercent > 80 ? "85ms (Severe Jitter & Lag)" : "22ms (Mild Overhead)";

    return {
      monthlyVideoTb,
      peakBandwidthRequiredGbps,
      saturationPercent,
      monthlyCostInLakhs,
      latencyPenaltyMs
    };
  }, [remoteUserCount, videoTrafficPerDay, gatewayBandwidthGbps]);

  // Studio 4: Regional West Bengal SOC Drills Data
  const regionalDrills = {
    barrackpore_dual_home: {
      id: "barrackpore_dual_home",
      title: "Barrackpore Municipal Tax Gateway: Dual-Homed Ransomware Infiltration",
      location: "Barrackpore Central Core connecting 8 Remote Tax Assessment Desks",
      threatScenario:
        "Susmita connected her remote laptop to an unpatched residential Wi-Fi network in Ichapur. Split Tunneling was active without host isolation. Malware on an infected home PC bridged through Susmita's laptop into the 10.14.0.0/16 municipal tax database.",
      solution:
        "Sukanta Hui and Debangshu immediately revoked split tunneling, pushed a GPO enforcing Full Tunneling with Always-On Kill Switch, and enabled host-isolation firewall rules.",
      outcome:
        "Lateral bridge was severed in under 4 minutes; 0 data compromised; certified compliant with CERT-In guidelines."
    },
    kolkata_it_gateway_crash: {
      id: "kolkata_it_gateway_crash",
      title: "Salt Lake Sector V IT Hub: 100% WAN Saturation & Inverse Tunneling",
      location: "Sector V Enterprise Datacenter servicing 1,200 Remote Developers",
      threatScenario:
        "During an all-hands video conference, 1,200 developers on Full Tunneling pushed 2.8 Gbps of Zoom traffic through a 1 Gbps gateway, crashing internal Git and ERP servers.",
      solution:
        "Mamata, Mahima, and Abhronila implemented Inverse Split Tunneling via dynamic FQDN bypass for Microsoft 365 and Zoom CIDR IP blocks.",
      outcome:
        "Corporate WAN utilization plummeted from 100% to 18%; saved ₹4.2 Lakhs/month in bandwidth burst charges; zero impact on corporate code security."
    }
  };

  const currentArchitecture = tunnelArchitectures[selectedTunnelMode];
  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_003 • Topic 8</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Split Tunneling vs Full Tunneling
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the critical security, routing, and financial trade-offs between centralized
            perimeter inspection and local internet breakout in enterprise VPN architectures.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Default Route 0.0.0.0/0
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Dual-Homed Pivot Risk
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Bandwidth Hairpinning (₹)
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              SASE &amp; Inverse Split
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
          @keyframes pulseGlow {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.8)); }
          }
          @keyframes warningFlash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
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
                1. Architectural Foundations: Where Does 0.0.0.0/0 Point?
              </h2>
              <p className="text-sm text-slate-400">
                Understanding the OS routing table mechanism that dictates packet encapsulation
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              When a remote worker (such as <strong className="text-white">Susmita</strong> or{" "}
              <strong className="text-white">Debangshu</strong>) establishes a VPN connection from home
              or a coffee shop in <strong className="text-cyan-300">Barrackpore</strong> or{" "}
              <strong className="text-cyan-300">Kolkata</strong>, the client operating system must decide how
              to route every single network packet. This routing decision is governed entirely by the{" "}
              <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-mono text-xs">
                OS Routing Table
              </code>
              .
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-emerald-700/60 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                    <span>🔒</span> Full Tunneling (Default-Route)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    High Security
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  The VPN virtual interface (<code className="text-emerald-300 font-mono text-xs">tun0</code>) claims the
                  default route (<code className="text-emerald-300 font-mono text-xs">0.0.0.0/0</code>).{" "}
                  <strong>100% of packets</strong> are encrypted and backhauled to the corporate gateway.
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Central Next-Gen Firewall &amp; DLP inspect all traffic.</li>
                  <li>Zero exposure to local Wi-Fi eavesdroppers or DNS leaks.</li>
                  <li>
                    <strong className="text-rose-400">Trade-off:</strong> Severe WAN bandwidth hairpinning and video latency.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-rose-700/60 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-rose-400 flex items-center gap-2">
                    <span>⚡</span> Split Tunneling (Selective Routing)
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    High Speed / Risky
                  </span>
                </div>
                <p className="text-sm text-slate-300">
                  The local physical adapter (<code className="text-rose-300 font-mono text-xs">wlan0</code>) retains the default route.
                  Only designated private corporate subnets (<code className="text-rose-300 font-mono text-xs">10.0.0.0/8</code>) enter the VPN.
                </p>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Video calls and public browsing exit directly via home ISP.</li>
                  <li>Massive reduction in corporate WAN bandwidth bills.</li>
                  <li>
                    <strong className="text-rose-400">Trade-off:</strong> Endpoint becomes a dual-homed bridge for attackers.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE ARCHITECTURE & ROUTE TABLE VISUALIZER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
                🗺️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Interactive Tunneling Architecture &amp; Packet Flow
                </h2>
                <p className="text-sm text-slate-400">
                  Select a tunneling mode to inspect kernel routing tables and animated packet pathways
                </p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(tunnelArchitectures).map((key) => {
                const item = tunnelArchitectures[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTunnelMode(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border",
                      selectedTunnelMode === key
                        ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(". ")[1].split(" (")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Mode Banner */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">{currentArchitecture.title}</h3>
              <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold border", currentArchitecture.badgeColor)}>
                {currentArchitecture.badge}
              </span>
            </div>

            {/* Dynamic Instructional SVG Architecture Diagram */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <svg
                id={svgArchitectureId}
                viewBox="0 0 880 320"
                className="w-full min-w-[700px] h-auto"
                aria-label="Interactive VPN Tunneling Packet Routing Diagram"
              >
                <defs>
                  <linearGradient id="tunnelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="directGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e11d48" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                  </linearGradient>
                  <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#22d3ee" />
                  </marker>
                  <marker id="arrowRose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#fb7185" />
                  </marker>
                </defs>

                {/* Left: Remote Client Node */}
                <g transform="translate(40, 70)">
                  <rect width="180" height="180" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <rect width="180" height="36" rx="12" fill="#1e293b" />
                  <text x="90" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    💻 Remote Client (Kolkata)
                  </text>
                  <text x="20" y="65" fill="#94a3b8" fontSize="11">User: Mamata / Susmita</text>
                  <text x="20" y="85" fill="#94a3b8" fontSize="11">Physical IP: 192.168.1.45</text>
                  <text x="20" y="105" fill="#38bdf8" fontSize="11">VPN IP: 10.14.0.88</text>
                  
                  {/* Virtual and Physical Interface Badges */}
                  <rect x="15" y="125" width="68" height="24" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                  <text x="49" y="141" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">tun0 (VPN)</text>

                  <rect x="95" y="125" width="70" height="24" rx="4" fill="#312e81" stroke="#6366f1" strokeWidth="1" />
                  <text x="130" y="141" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">wlan0 (ISP)</text>
                </g>

                {/* Center: Encrypted Tunnel Pathway */}
                <rect x="260" y="60" width="340" height="70" rx="10" fill="url(#tunnelGrad)" opacity="0.15" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="6,4" />
                <text x="430" y="85" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">
                  🔐 Encrypted IPsec / WireGuard Tunnel (tun0)
                </text>
                <text x="430" y="105" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  {selectedTunnelMode === "standard_split" ? "Carries Corporate Subnet (10.0.0.0/8) Only" : "Carries 100% of IP Packets (0.0.0.0/0)"}
                </text>

                {/* Animated Packet on Tunnel */}
                <path d="M 220,110 L 620,110" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#arrowCyan)" />
                <circle r="5" fill="#22d3ee">
                  <animateMotion path="M 220,110 L 620,110" dur="2.5s" repeatCount="indefinite" />
                </circle>

                {/* Center Lower: Direct Local ISP Bypass */}
                {selectedTunnelMode !== "full_tunnel" && (
                  <>
                    <rect x="260" y="180" width="340" height="70" rx="10" fill="url(#directGrad)" opacity="0.15" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="6,4" />
                    <text x="430" y="205" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">
                      ⚡ Direct Local Internet Breakout (wlan0)
                    </text>
                    <text x="430" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">
                      Bypasses Corporate NGFW &amp; DLP Inspection (YouTube, Zoom, Direct Web)
                    </text>
                    <path d="M 220,230 L 620,230" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrowRose)" />
                    <circle r="5" fill="#fb7185">
                      <animateMotion path="M 220,230 L 620,230" dur="2.0s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {/* Right Top: Corporate Datacenter Node */}
                <g transform="translate(640, 30)">
                  <rect width="200" height="120" rx="12" fill="#0f172a" stroke="#059669" strokeWidth="2" />
                  <rect width="200" height="30" rx="12" fill="#064e3b" />
                  <text x="100" y="20" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                    🏢 Barrackpore Datacenter
                  </text>
                  <text x="15" y="55" fill="#94a3b8" fontSize="10">NGFW &amp; DLP: {selectedTunnelMode === "standard_split" ? "Intranet Only" : "100% Inspected"}</text>
                  <text x="15" y="75" fill="#94a3b8" fontSize="10">Intranet Database: 10.14.0.5</text>
                  <text x="15" y="95" fill="#34d399" fontSize="10">Gateway IP: 203.0.113.1</text>
                </g>

                {/* Right Bottom: Public Web & SaaS */}
                <g transform="translate(640, 175)">
                  <rect width="200" height="115" rx="12" fill="#0f172a" stroke="#e11d48" strokeWidth="2" />
                  <rect width="200" height="30" rx="12" fill="#881337" />
                  <text x="100" y="20" fill="#fecdd3" fontSize="12" fontWeight="bold" textAnchor="middle">
                    ☁️ Public Internet &amp; SaaS
                  </text>
                  <text x="15" y="55" fill="#94a3b8" fontSize="10">Zoom / Microsoft 365 / YouTube</text>
                  <text x="15" y="75" fill="#94a3b8" fontSize="10">
                    Inspection: {selectedTunnelMode === "full_tunnel" ? "Hairpinned at Datacenter" : "Unmonitored / Direct"}
                  </text>
                  <text x="15" y="95" fill="#f43f5e" fontSize="10">WAN Load: {selectedTunnelMode === "full_tunnel" ? "Max Saturation" : "Zero Load"}</text>
                </g>
              </svg>
            </div>

            {/* Route Table & Security Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Kernel Route Table Configuration
                </h4>
                <div className="bg-slate-950 p-2.5 rounded font-mono text-xs text-slate-300 space-y-1 border border-slate-800">
                  <p className="text-cyan-300"># Active Default &amp; Subnet Routes:</p>
                  <p>{currentArchitecture.defaultRoute}</p>
                  <p className="text-slate-400">Intranet: {currentArchitecture.intranetTraffic}</p>
                  <p className="text-slate-400">Internet: {currentArchitecture.internetTraffic}</p>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Security &amp; Regulatory Verdict
                </h4>
                <div className="text-xs text-slate-300 space-y-1.5">
                  <p><strong className="text-white">Security Posture:</strong> {currentArchitecture.securityLevel}</p>
                  <p><strong className="text-white">Compliance:</strong> {currentArchitecture.complianceStatus}</p>
                  <p className="text-emerald-400 font-semibold">{currentArchitecture.verdict}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE DUAL-HOMED PIVOT & ATTACK SIMULATION LAB */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-800 text-rose-400 text-xl">
              🎯
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 2: Dual-Homed Bridge &amp; Pivot Attack Simulator
              </h2>
              <p className="text-sm text-slate-400">
                Observe how an attacker on local unencrypted Wi-Fi exploits split tunneling to breach internal ERP databases
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control 1: Local Network Environment */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Local Network Environment
              </label>
              <select
                value={localNetworkEnv}
                onChange={(e) => setLocalNetworkEnv(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="untrusted_cafe">Jadavpur Public Cafe Wi-Fi (Untrusted)</option>
                <option value="compromised_hotspot">Ichapur Compromised Hotspot</option>
                <option value="home_wifi">Barrackpore Residential Wi-Fi</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Simulates presence of adversarial sniffers and automated botnets on local LAN.
              </p>
            </div>

            {/* Control 2: Endpoint Tunnel Policy */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. Endpoint VPN &amp; Host Policy
              </label>
              <select
                value={endpointTunnelPolicy}
                onChange={(e) => setEndpointTunnelPolicy(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="split_no_isolation">Split Tunnel (No Host Isolation - Vulnerable)</option>
                <option value="split_with_isolation">Split Tunnel + Endpoint Host Isolation GPO</option>
                <option value="full_tunnel_secure">Full Tunneling + Always-On Kill Switch</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Configures local firewall filtering and OS packet routing flags.
              </p>
            </div>

            {/* Control 3: Adversary Attack Vector */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                3. Simulated Attack Vector
              </label>
              <select
                value={simulatedAttackType}
                onChange={(e) => setSimulatedAttackType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="pivot_attack">Lateral Pivot into Intranet ERP (Port 445/SMB)</option>
                <option value="passive_sniff">Local DNS Leak &amp; Session Sniffing</option>
                <option value="malware_exfil">Drive-by Malware &amp; DLP Bypass Exfiltration</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Executes automated penetration testing scenario across virtual interfaces.
              </p>
            </div>
          </div>

          {/* Simulation Output Dashboard */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white">Threat Trajectory &amp; Forensic Output:</span>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", attackSimulationResult.riskBadge)}>
                {attackSimulationResult.headline}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider">
                  Attack Sequence Flow:
                </h4>
                <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                  {attackSimulationResult.technicalFlow}
                </pre>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-cyan-400 uppercase tracking-wider">
                  Forensic Telemetry &amp; Detection Note:
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {attackSimulationResult.forensicFinding}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-amber-300">Security Architect Takeaway:</strong> Never permit split tunneling
                  without enforcing <code className="text-cyan-300 font-mono">net.ipv4.ip_forward = 0</code> and local
                  host isolation firewalls to drop untrusted local subnet bridging.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: BANDWIDTH HAIRPINNING & FINANCIAL CALCULATOR (INR ₹) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              💰
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 3: Bandwidth Hairpinning &amp; Gateway Cost Calculator (INR ₹)
              </h2>
              <p className="text-sm text-slate-400">
                Calculate corporate WAN gateway saturation and monthly transit cost penalty incurred by Full Tunneling
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slider 1: Remote Workforce Size */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Remote Employees:</span>
                <span className="text-cyan-400 font-mono text-sm">{remoteUserCount} Users</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={remoteUserCount}
                onChange={(e) => setRemoteUserCount(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Number of remote staff streaming meetings, SaaS, and video over the VPN.
              </p>
            </div>

            {/* Slider 2: Video Traffic per Day */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Daily Video / SaaS Data:</span>
                <span className="text-cyan-400 font-mono text-sm">{videoTrafficPerDay} GB / User</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.5"
                value={videoTrafficPerDay}
                onChange={(e) => setVideoTrafficPerDay(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Includes Microsoft Teams, Zoom HD calls, cloud downloads, and streaming.
              </p>
            </div>

            {/* Slider 3: Gateway Leased Line Bandwidth */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Corporate WAN Leased Line:</span>
                <span className="text-cyan-400 font-mono text-sm">{gatewayBandwidthGbps} Gbps</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5.0"
                step="0.2"
                value={gatewayBandwidthGbps}
                onChange={(e) => setGatewayBandwidthGbps(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Total provisioned symmetric internet pipe at the Barrackpore datacenter.
              </p>
            </div>
          </div>

          {/* Computed Metrics Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Monthly Hairpinned Data</div>
              <div className="text-2xl font-extrabold text-white font-mono">
                {calculatedWanMetrics.monthlyVideoTb} <span className="text-sm font-normal text-cyan-400">TB</span>
              </div>
              <div className="text-[11px] text-slate-400">Wasted Datacenter Transit</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Peak Gateway Saturation</div>
              <div className={clsx(
                "text-2xl font-extrabold font-mono",
                calculatedWanMetrics.saturationPercent > 85
                  ? "text-rose-400 animate-pulse"
                  : calculatedWanMetrics.saturationPercent > 60
                  ? "text-amber-400"
                  : "text-emerald-400"
              )}>
                {calculatedWanMetrics.saturationPercent}%
              </div>
              <div className="text-[11px] text-slate-400">
                Peak Load: {calculatedWanMetrics.peakBandwidthRequiredGbps} Gbps
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Monthly Hairpin Bandwidth Bill</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">
                ₹{calculatedWanMetrics.monthlyCostInLakhs} <span className="text-sm font-normal text-white">Lakhs</span>
              </div>
              <div className="text-[11px] text-slate-400">Extra WAN Leased Line Cost</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">User Video Call Jitter</div>
              <div className="text-lg font-bold text-cyan-300 font-mono">
                {calculatedWanMetrics.latencyPenaltyMs.split(" ")[0]}
              </div>
              <div className="text-[11px] text-slate-400">{calculatedWanMetrics.latencyPenaltyMs.split("(")[1]?.replace(")", "")}</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMPREHENSIVE COMPARISON MATRIX & TRADE-OFF TABLE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              📊
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                2. Enterprise Trade-Off Comparison Matrix
              </h2>
              <p className="text-sm text-slate-400">
                Side-by-side technical evaluation across security, performance, cost, and compliance parameters
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-300 font-semibold">
                  <th className="p-3">Evaluation Parameter</th>
                  <th className="p-3 text-emerald-400">Full Tunneling (Default-Route)</th>
                  <th className="p-3 text-rose-400">Split Tunneling (Split-Include)</th>
                  <th className="p-3 text-cyan-400">Inverse Split / SASE (Modern)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Default Route (0.0.0.0/0)</td>
                  <td className="p-3 text-emerald-300">dev tun0 (Corporate Gateway)</td>
                  <td className="p-3 text-rose-300">dev wlan0 (Local ISP Gateway)</td>
                  <td className="p-3 text-cyan-300">dev tun0 (SaaS dynamically excluded)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Central Security Inspection</td>
                  <td className="p-3 text-emerald-300">100% (NGFW, DLP, IDS, Proxy)</td>
                  <td className="p-3 text-rose-300">Fragmented (Endpoint Only)</td>
                  <td className="p-3 text-cyan-300">100% Web + Cloud SWG Inspection</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Dual-Homed Pivot Vulnerability</td>
                  <td className="p-3 text-emerald-300">Blocked by Tunnel Gateway Policy</td>
                  <td className="p-3 text-rose-300 font-bold">HIGH RISK (Bridge to Intranet)</td>
                  <td className="p-3 text-cyan-300">Mitigated via Host Isolation</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">DNS Leak Risk</td>
                  <td className="p-3 text-emerald-300">Zero (Corporate DNS Enforced)</td>
                  <td className="p-3 text-rose-300">High (Multi-Homed ISP Exposure)</td>
                  <td className="p-3 text-cyan-300">Zero (Encrypted Anycast DNS)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Gateway Bandwidth Load</td>
                  <td className="p-3 text-rose-300">Severe Hairpinning Saturation</td>
                  <td className="p-3 text-emerald-300">Minimal (Direct ISP egress)</td>
                  <td className="p-3 text-emerald-300">Low (SaaS offloaded locally)</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-sans font-medium text-white">Regulatory Mandates</td>
                  <td className="p-3 text-emerald-300">Mandatory for Banking / PCI-DSS</td>
                  <td className="p-3 text-rose-300">Requires Written Compliance Exemption</td>
                  <td className="p-3 text-cyan-300">Meets NIST Zero Trust SP 800-207</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* REAL-WORLD USAGE EXAMPLES (4 DETAILED SCENARIOS) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🏢
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                3. Real-World Enterprise Implementation Scenarios
              </h2>
              <p className="text-sm text-slate-400">
                Industry-proven architectures deployed across banking, development, defense, and remote healthcare
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-emerald-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🏦</span> Scenario 1: Core Banking &amp; FinTech Gateway
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Full Tunneling
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Susmita audits transaction databases for a Barrackpore FinTech hub.
                Under RBI regulations and PCI-DSS, zero uninspected traffic is permitted.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-emerald-300 border border-slate-800">
                Policy: Always-On Full Tunnel with Device Certificates + Local Host Isolation + 100% DLP SSL Decryption.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Zero risk of data exfiltration; complete forensic packet capture; meets financial audit standards.
              </p>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-cyan-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>💻</span> Scenario 2: High-Volume SaaS Engineering
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Inverse Split
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Debangshu and Mamata collaborate with 800 remote engineers in Salt Lake, Kolkata,
                using GitHub, Jira, and Zoom HD daily.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-cyan-300 border border-slate-800">
                Policy: Full Tunneling default route; dynamic FQDN exclusion for *.zoom.us, *.microsoft.com, and *.github.com.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Video latency drops from 95ms to 18ms; corporate WAN bandwidth consumption drops by 68%.
              </p>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>📱</span> Scenario 3: Mobile Field Workers &amp; MDM
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Per-App VPN
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Mahima manages mobile inspection tablets in Ichapur. Personal social media
                must not touch the municipal intranet.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-indigo-300 border border-slate-800">
                Policy: Mobile Device Management (MDM) Per-App VPN profile binds exclusively to the Municipal Inspection App binary.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Personal cellular data traffic never reaches the datacenter; municipal records stay 100% encrypted.
              </p>
            </div>

            {/* Example 4 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 hover:border-amber-700/60 transition-all duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>☁️</span> Scenario 4: Cloud-First Zero Trust Architecture
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  SASE / ZTNA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Context:</strong> Abhronila designs a modern cloud security perimeter across multiple regional offices
                in West Bengal.
              </p>
              <div className="bg-slate-900 p-2.5 rounded font-mono text-[11px] text-amber-300 border border-slate-800">
                Policy: SASE Cloud PoP in Kolkata delivers Cloud SWG + CASB + ZTNA without any physical on-premises VPN concentrators.
              </div>
              <p className="text-xs text-slate-400">
                <strong>Result:</strong> Complete inspection for all web and internal apps with single-digit roundtrip latency.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC INCIDENT DRILLS (WEST BENGAL CASE STUDIES) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
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
                onClick={() => setActiveDrillKey("barrackpore_dual_home")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "barrackpore_dual_home"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Barrackpore Dual-Home Drill
              </button>
              <button
                onClick={() => setActiveDrillKey("kolkata_it_gateway_crash")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                  activeDrillKey === "kolkata_it_gateway_crash"
                    ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                )}
              >
                Sector V WAN Saturation Drill
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white">{currentDrill.title}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-700 font-mono">
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
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              🐍
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                4. Programmatic Route Auditing &amp; Hairpinning Analysis (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Inspect OS route tables, assess dual-homed bridge risks, and calculate financial WAN penalties
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={splitTunnelAuditorPy}
            title="split_tunnel_auditor.py"
            highlightLines={[43, 76, 110, 131]}
          />
        </section>

        {/* ========================================================================= */}
        {/* TIPS & TRICKS, PITFALLS, BEST PRACTICES & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-300 hover:border-cyan-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 text-xl">
              💡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                5. Professional Wisdom, Common Pitfalls &amp; Student Checklist
              </h2>
              <p className="text-sm text-slate-400">
                Essential engineering habits, common beginner misconceptions, and revision points
              </p>
            </div>
          </div>

          {/* Tips & Tricks */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🚀</span> Professional Tips &amp; Tricks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">1. Always Enforce MSS Clamping:</strong>
                <p className="text-slate-400">
                  VPN encapsulation expands packet size. Configure <code className="text-cyan-300 font-mono">--clamp-mss-to-pmtu</code> on
                  firewalls to prevent MTU fragmentation and mysterious file upload stalls.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Kill Switch via Endpoint Firewall:</strong>
                <p className="text-slate-400">
                  Never rely on software GUI checkboxes alone. Implement persistent local firewall rules dropping all outbound
                  traffic on physical adapters unless the destination is the VPN server IP.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Dynamic FQDN Split Exclusion:</strong>
                <p className="text-slate-400">
                  Hardcoding static IP subnets for Microsoft 365 or Zoom fails frequently. Use Dynamic DNS interception
                  to exclude SaaS services by fully qualified domain name in real time.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Disable IPv6 on Physical Adapters:</strong>
                <p className="text-slate-400">
                  If the VPN tunnel only routes IPv4, native residential IPv6 connections will bypass the tunnel in cleartext.
                  Either dual-stack the VPN tunnel or disable physical IPv6 during connection.
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
                <strong className="text-rose-300">Misconception 1: "Split Tunneling is inherently secure because of AES."</strong>
                <p className="text-slate-400">
                  While the data inside the tunnel is encrypted with AES-256, the unencrypted local network link allows local
                  attackers to pivot into the laptop and enter the tunnel from behind the encryption layer!
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "Full Tunneling prevents all malware infection."</strong>
                <p className="text-slate-400">
                  Full Tunneling routes traffic through corporate firewalls, but if the datacenter lacks SSL Forward Proxy
                  decryption, encrypted HTTPS malware payloads will pass through undetected.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Enabling OS IP Forwarding on Client Laptops:</strong>
                <p className="text-slate-400">
                  Developers testing Docker or VM networks frequently set <code className="text-cyan-300 font-mono">net.ipv4.ip_forward = 1</code>,
                  inadvertently converting their laptop into an open router for the entire public coffee shop Wi-Fi!
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Ignoring Multi-Homed DNS Leakage:</strong>
                <p className="text-slate-400">
                  Windows Smart Multi-Homed Name Resolution sends queries across all adapters simultaneously. Without Group Policy
                  mitigation, internal corporate hostnames leak directly to residential ISPs.
                </p>
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className="bg-cyan-950/40 border border-cyan-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <span>💭</span> Pedagogical Hints for System Analysts
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-cyan-200">Think about:</strong> Where does the default route (0.0.0.0/0) point on an employee&apos;s laptop when they connect to the VPN?</li>
              <li><strong className="text-cyan-200">Observe carefully:</strong> How video conference traffic behaves when 500 remote staff join a town hall meeting under Full Tunneling vs Inverse Split.</li>
              <li><strong className="text-cyan-200">Try changing this:</strong> Disable <code className="text-cyan-300 font-mono">ip_forward</code> in Linux and observe how packet bridging between wlan0 and tun0 is dropped instantly.</li>
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
                <span>Explain 0.0.0.0/0 routing differences in Full vs Split Tunneling</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Define Bandwidth Hairpinning and calculate monthly WAN costs in ₹</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe the technical mechanics of a Dual-Homed Pivot Bridge Attack</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Contrast traditional Split Tunneling with Modern SASE / ZTNA Cloud Edge</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="Split Tunneling vs Full Tunneling Security Trade-offs FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="Split Tunneling vs Full Tunneling Security Trade-offs Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic8_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI) */}
        {/* ========================================================================= */}
        <Teacher
          note="In enterprise cybersecurity engineering, there is no one-size-fits-all tunneling policy. As security architects, we must balance the rigorous non-negotiable compliance demands of core financial databases (which mandate 100% Full Tunneling and Host Isolation) against the real-world bandwidth physics of 1,000+ remote workers streaming high-definition SaaS collaboration calls. Always remember: when deploying Split Tunneling, your perimeter defense is only as strong as the host isolation policies running in the remote worker's local kernel. Never permit split tunneling without locking down IP forwarding, binding DNS strictly to corporate resolvers, and enforcing automated endpoint posture checks!"
        />

      </div>
    </div>
  );
};

export default Topic8;
