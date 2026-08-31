import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import enterpriseVpnDeployerPy from "./topic11_files/enterprise_vpn_deployer.py?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgBlueprintId = useId();
  const svgClusterFlowId = useId();

  // Studio 1: Active Architecture Tier State
  const [activeTierKey, setActiveTierKey] = useState("dmz_concentrators"); // "perimeter_ddos", "dmz_concentrators", "core_vlans", "identity_aaa", "endpoint_fleet"

  // Studio 2: Live Persona Policy Workbench State
  const [selectedPersonaKey, setSelectedPersonaKey] = useState("susmita_executive"); // "susmita_executive", "debangshu_contractor", "mamata_admin", "mahima_field"
  const [simulatedMfaMethod, setSimulatedMfaMethod] = useState("fido2_passkey"); // "fido2_passkey", "totp_authenticator", "sms_otp"
  const [simulateDiskEncryption, setSimulateDiskEncryption] = useState(true);
  const [simulateEdrActive, setSimulateEdrActive] = useState(true);
  const [simulateOsPatched, setSimulateOsPatched] = useState(true);

  // Studio 3: Gateway Capacity & Sizing Planning Engine (INR ₹)
  const [totalRemoteWorkforce, setTotalRemoteWorkforce] = useState(1500); // 100 to 5000 users
  const [peakConcurrencyPercent, setPeakConcurrencyPercent] = useState(45); // 20% to 90%
  const [avgThroughputPerUserMbps, setAvgThroughputPerUserMbps] = useState(3.2); // 1.0 to 10.0 Mbps

  // Studio 4: Regional Capstone Case Study State
  const [activeCaseStudyPhase, setActiveCaseStudyPhase] = useState("phase_1_audit"); // "phase_1_audit", "phase_2_architecture", "phase_3_incidents", "phase_4_certification"

  // Architecture Tier Specifications for Studio 1
  const architectureTiers = {
    perimeter_ddos: {
      key: "perimeter_ddos",
      title: "Tier 1: Edge Perimeter & Cloud DDoS Scrubbing",
      badge: "External Shield",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700",
      description: "Upstream BGP Anycast routing paired with cloud DDoS scrubbing centers (Cloudflare/Akamai) absorbs volumetric SYN/UDP floods before traffic touches enterprise edge firewalls.",
      components: ["BGP Anycast Routing", "Cloud DDoS Scrubbing", "Perimeter NGFW Cluster (Active-Passive)", "Geo-IP Filtering (Drop non-Indian IP blocks)"],
      securityFunction: "Filters malicious volumetric attacks and blocks unauthorized geographic regions."
    },
    dmz_concentrators: {
      key: "dmz_concentrators",
      title: "Tier 2: DMZ Gateway Cluster & VRRP Redundancy",
      badge: "High Availability Gateway",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      description: "Active-Active strongSwan IKEv2 / WireGuard concentrator nodes deployed in the DMZ with Virtual Router Redundancy Protocol (VRRP) providing sub-second failover.",
      components: ["Active-Active VPN Concentrators", "VRRP Virtual IP (203.0.113.10)", "Outbound-Only ZTNA App Connectors", "TCP MSS Clamping Engine (1360B)"],
      securityFunction: "Terminates cryptographic tunnels, enforces MSS clamping, and manages session state."
    },
    core_vlans: {
      key: "core_vlans",
      title: "Tier 3: Core Switching & Dynamic 802.1Q Segmentation",
      badge: "Internal Micro-Segmentation",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-700",
      description: "Core switches isolate remote traffic into department VLANs based on RADIUS attributes, preventing lateral movement between contractors and finance servers.",
      components: ["Corporate Prod VLAN 100 (ERP/DB)", "Contractor DMZ VLAN 200 (Jira/Git)", "Quarantine VLAN 900 (Remediation)", "Internal State Firewalls"],
      securityFunction: "Enforces strict network-layer isolation between user personas and server tiers."
    },
    identity_aaa: {
      key: "identity_aaa",
      title: "Tier 4: Identity, AAA & Compliance Control Plane",
      badge: "Zero Trust Control Plane",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      description: "Centralized cloud IdP (Microsoft Entra ID / Okta) enforcing SAML 2.0, FIDO2 WebAuthn passkeys, conditional access policies, and 180-day SIEM audit logging.",
      components: ["Microsoft Entra ID / Okta", "FIDO2 / WebAuthn Hardware Keys", "Automated SCEP PKI CA", "Splunk / Elastic SIEM (180-Day Retention)"],
      securityFunction: "Validates user identity, assesses device posture, and maintains forensic audit trails."
    },
    endpoint_fleet: {
      key: "endpoint_fleet",
      title: "Tier 5: Secure Remote Endpoint Fleet (Laptops & Mobile)",
      badge: "Hardened Endpoints",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      description: "Corporate-managed endpoints hardened via Microsoft Intune MDM with Always-On VPN, Kill Switch, CrowdStrike EDR, and BitLocker disk encryption.",
      components: ["Always-On VPN Client with Kill Switch", "CrowdStrike Falcon EDR Agent", "BitLocker / FileVault Full Disk Encryption", "Local Host Isolation Firewall GPO"],
      securityFunction: "Guarantees endpoint integrity and prevents local Wi-Fi dual-homed bridge pivoting."
    }
  };

  // Studio 2: Live Persona Policy Workbench Computation
  const personaPolicyResult = useMemo(() => {
    // Posture Health Scoring (0 to 100)
    let score = 0;
    if (simulateDiskEncryption) score += 35;
    if (simulateEdrActive) score += 35;
    if (simulateOsPatched) score += 30;

    let isMfaCompliant = simulatedMfaMethod === "fido2_passkey";
    let isPosturePassed = score >= 80;

    let decisionTitle = "✔ ACCESS GRANTED: Least-Privilege Active";
    let decisionBadge = "bg-emerald-950 text-emerald-300 border-emerald-700";
    let assignedSubnet = "Production Corporate VLAN 100 (10.14.10.0/24)";
    let tunnelMode = "Always-On Full Tunnel (AES-256-GCM)";
    let explanation = "Identity, phishing-resistant MFA, and device health posture verified successfully.";

    if (selectedPersonaKey === "debangshu_contractor") {
      assignedSubnet = "Contractor DMZ VLAN 200 (10.14.200.0/24) - Port 443 Only";
      tunnelMode = "Clientless ZTNA (HTML5 Browser Isolation Sandbox)";
      explanation = "Third-party contractor assigned to isolated browser sandbox with 0 internal IP routability.";
    }

    if (!isMfaCompliant) {
      decisionTitle = "❌ ACCESS DENIED: Insecure MFA Method";
      decisionBadge = "bg-rose-950 text-rose-300 border-rose-700";
      assignedSubnet = "Quarantine VLAN 999 (Blocked)";
      tunnelMode = "Connection Dropped (SMS/Voice OTP prohibited)";
      explanation = "SMS and Voice OTPs are vulnerable to SIM swapping and AiTM phishing proxies under CERT-In directives.";
    } else if (!isPosturePassed) {
      decisionTitle = "⚠️ QUARANTINED: Device Posture Health Failure";
      decisionBadge = "bg-amber-950 text-amber-300 border-amber-700";
      assignedSubnet = "Remediation VLAN 900 (Walled Garden)";
      tunnelMode = "Restricted Remediation Tunnel (Access to Windows Update / Antivirus only)";
      explanation = "Endpoint health score (" + score + "/100) fell below the mandatory 80-point threshold.";
    }

    return {
      score,
      isMfaCompliant,
      isPosturePassed,
      decisionTitle,
      decisionBadge,
      assignedSubnet,
      tunnelMode,
      explanation
    };
  }, [selectedPersonaKey, simulatedMfaMethod, simulateDiskEncryption, simulateEdrActive, simulateOsPatched]);

  // Studio 3: Capacity Planning & Infrastructure Sizing Computation (INR ₹)
  const capacitySizingMetrics = useMemo(() => {
    const concurrentUsers = Math.ceil(totalRemoteWorkforce * (peakConcurrencyPercent / 100.0));
    const totalPeakBandwidthMbps = concurrentUsers * avgThroughputPerUserMbps;
    const totalPeakBandwidthGbps = (totalPeakBandwidthMbps / 1000.0).toFixed(2);

    // Gateway Cluster Hardware Sizing (Each node handles up to 3.0 Gbps / 2,000 tunnels)
    const activeNodesNeeded = Math.max(2, Math.ceil(Number(totalPeakBandwidthGbps) / 3.0));
    const totalNodesInCluster = activeNodesNeeded + 1; // +1 Passive/N+1 redundancy
    const totalClusterCapacityGbps = (activeNodesNeeded * 3.0).toFixed(1);

    const clusterUtilizationPercent = Math.min(
      100,
      Math.round((Number(totalPeakBandwidthGbps) / Number(totalClusterCapacityGbps)) * 100)
    );

    // Financial Sizing (INR ₹ Lakhs)
    const hardwareCapExLakhs = (totalNodesInCluster * 6.5).toFixed(2); // Enterprise appliances
    const annualWanLeasedLinesLakhs = (Number(totalPeakBandwidthGbps) * 16.5).toFixed(2); // ₹16.5L/Gbps/yr
    const annualSocMonitoringLakhs = 6.0;
    const totalAnnualTcoLakhs = (
      Number(hardwareCapExLakhs) / 3 +
      Number(annualWanLeasedLinesLakhs) +
      annualSocMonitoringLakhs
    ).toFixed(2);

    return {
      concurrentUsers,
      totalPeakBandwidthGbps,
      activeNodesNeeded,
      totalNodesInCluster,
      totalClusterCapacityGbps,
      clusterUtilizationPercent,
      hardwareCapExLakhs,
      annualWanLeasedLinesLakhs,
      totalAnnualTcoLakhs
    };
  }, [totalRemoteWorkforce, peakConcurrencyPercent, avgThroughputPerUserMbps]);

  // Studio 4: Regional Capstone Case Study Data (Barrackpore Smart City & FinTech)
  const caseStudyPhases = {
    phase_1_audit: {
      key: "phase_1_audit",
      title: "Phase 1: Baseline Architecture Audit & Vulnerability Discovery",
      subtitle: "Barrackpore Municipal Core servicing 1,500 Remote Employees & 12 External Software Vendors",
      findings: [
        "Vulnerability 1: Legacy PPTP and standalone L2TP used by remote property tax collection desks.",
        "Vulnerability 2: Third-party web developers granted unrestricted 10.14.0.0/16 subnet access over standard VPN.",
        "Vulnerability 3: Mixed broadband ISPs (BSNL/Airtel PPPoE) causing Path MTU Black Hole upload freezes (> 2MB).",
        "Vulnerability 4: Static Pre-Shared Keys (PSKs) hardcoded in client configurations without individual revocation."
      ],
      leadArchitect: "Sukanta Hui (Lead Security Architect)"
    },
    phase_2_architecture: {
      key: "phase_2_architecture",
      title: "Phase 2: High Availability Zero-Trust Blueprint Design",
      subtitle: "Designing the 4-Tier Multi-Zone Perimeter and Identity Control Plane",
      findings: [
        "Tier 1: Upstream BGP Anycast routing with Cloud DDoS scrubbing and Geo-IP filtering.",
        "Tier 2: Active-Active strongSwan IKEv2 / WireGuard gateway cluster with VRRP (Virtual IP 203.0.113.10).",
        "Tier 3: 802.1Q dynamic VLAN segmentation: Production VLAN 100 vs Contractor DMZ VLAN 200.",
        "Tier 4: Microsoft Entra ID integration enforcing FIDO2 WebAuthn passkeys and 180-day SIEM syslog logging."
      ],
      leadArchitect: "Susmita & Mamata (Core Infrastructure Team)"
    },
    phase_3_incidents: {
      key: "phase_3_incidents",
      title: "Phase 3: Production Rollout & Incident Remediation Drills",
      subtitle: "Overcoming Real-World Roadblocks during Deployment Across West Bengal",
      findings: [
        "Drill 1: Contractor Malware Infiltration contained via Clientless ZTNA browser sandboxing (0 lateral spread).",
        "Drill 2: Tax assessment upload freezes eliminated via TCP MSS Clamping to 1360 bytes on all gateways.",
        "Drill 3: Intermediate CA expiration outage permanently solved via automated Microsoft Intune SCEP enrollment.",
        "Drill 4: Mobile tablet battery drain fixed by tuning WireGuard PersistentKeepalive from 10s to 45s."
      ],
      leadArchitect: "Debangshu & Mahima (Field & Dev Engineering)"
    },
    phase_4_certification: {
      key: "phase_4_certification",
      title: "Phase 4: Regulatory Audit Certification & Operational Outcomes",
      subtitle: "Full Compliance Certification under CERT-In, RBI FinTech Directives, and ISO 27001 ISMS",
      findings: [
        "Outcome 1: 100% eradication of lateral subnet attack surface; zero open listening ports on Shodan.",
        "Outcome 2: 0 security breaches, 0 credential compromises, and 0 unplanned outages across 12 months.",
        "Outcome 3: Gateway TCO reduced by 42% compared to monolithic proprietary hardware appliances.",
        "Outcome 4: Certified compliant under CERT-In ICT guidelines and Reserve Bank of India cybersecurity mandates."
      ],
      leadArchitect: "Sukanta Hui & Entire Engineering Team"
    }
  };

  const currentTier = architectureTiers[activeTierKey];
  const currentCasePhase = caseStudyPhases[activeCaseStudyPhase];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HEADER SECTION (CAPSTONE) */}
        {/* ========================================================================= */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <span>🏆 Module 005_003 • Topic 11 (Capstone Synthesis)</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Enterprise VPN Deployment &amp; Secure Remote Worker Case Study
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Synthesize all cryptographic, routing, posture assessment, and Zero Trust principles into an
            industrial-grade, high-availability remote access architecture certified under CERT-In &amp; RBI mandates.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Multi-Tier Defense-in-Depth
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              AAA &amp; FIDO2 MFA Pipeline
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Active-Active VRRP Clustering
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
              Barrackpore Smart City Blueprint
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
          @keyframes pulseGlowGold {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(234, 179, 8, 0.8)); }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* CORE CONCEPTUAL OVERVIEW & ARCHITECTURAL FOUNDATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              🏛️
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                1. The Enterprise Remote Access Master Architecture
              </h2>
              <p className="text-sm text-slate-400">
                Bridging perimeter defense, cryptographic gateways, identity federation, and endpoint posture into a unified system
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              In production enterprise networks across <strong className="text-cyan-300">Barrackpore</strong> and{" "}
              <strong className="text-cyan-300">Kolkata</strong>, securing remote workers requires far more than a simple
              VPN server. It demands an integrated, multi-tier defense-in-depth architecture where{" "}
              <strong className="text-white">every tier assumes breach</strong> and validates identity, device health, and
              least-privilege authorization continuously.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 text-sm flex items-center gap-1.5">
                  <span>🛡️</span> 1. Perimeter &amp; DMZ Layer
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Active-Active gateway clusters running behind VRRP and DDoS scrubbing, terminating WireGuard and IPsec
                  IKEv2 tunnels with automated TCP MSS clamping.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <span>🔑</span> 2. Identity &amp; AAA Control Plane
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SAML 2.0 / OIDC federation with Microsoft Entra ID, enforcing phishing-resistant FIDO2 passkeys and
                  automated SCEP X.509 certificate enrollment.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-indigo-400 text-sm flex items-center gap-1.5">
                  <span>📊</span> 3. Dynamic Micro-Segmentation
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Core switch 802.1Q dynamic VLAN tagging separating executives (VLAN 100), contractors (VLAN 200), and
                  quarantined unhealthy devices (VLAN 900).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE MULTI-TIER BLUEPRINT VISUALIZER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
                🗺️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 1: Enterprise Multi-Tier Blueprint Visualizer
                </h2>
                <p className="text-sm text-slate-400">
                  Inspect the five architectural tiers of an industrial-grade remote access infrastructure
                </p>
              </div>
            </div>

            {/* Tier Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(architectureTiers).map((key) => {
                const item = architectureTiers[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTierKey(key)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border",
                      activeTierKey === key
                        ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    {item.title.split(":")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tier Display Banner */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-white">{currentTier.title}</h3>
              <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-semibold border", currentTier.badgeColor)}>
                {currentTier.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{currentTier.description}</p>

            {/* Dynamic Master Architecture SVG Topology */}
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 overflow-x-auto">
              <svg
                id={svgBlueprintId}
                viewBox="0 0 880 340"
                className="w-full min-w-[700px] h-auto"
                aria-label="Enterprise Multi-Tier VPN Architecture Blueprint"
              >
                <defs>
                  <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                  </linearGradient>
                  <marker id="arrowMaster" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#34d399" />
                  </marker>
                </defs>

                {/* Node 1: Remote Endpoint */}
                <g transform="translate(20, 90)">
                  <rect width="160" height="150" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <rect width="160" height="30" rx="10" fill="#1e293b" />
                  <text x="80" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    💻 Remote Client
                  </text>
                  <text x="15" y="55" fill="#94a3b8" fontSize="10">Susmita / Mamata</text>
                  <text x="15" y="75" fill="#94a3b8" fontSize="10">MFA: FIDO2 Passkey</text>
                  <text x="15" y="95" fill="#34d399" fontSize="10">EDR + BitLocker: OK</text>
                  <rect x="15" y="110" width="130" height="22" rx="4" fill="#064e3b" />
                  <text x="80" y="125" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Score: 100/100 (Pass)
                  </text>
                </g>

                {/* Node 2: Perimeter DDoS & Edge Router */}
                <g transform="translate(220, 90)">
                  <rect width="150" height="150" rx="10" fill="#0f172a" stroke="#0891b2" strokeWidth="2" />
                  <rect width="150" height="30" rx="10" fill="#083344" />
                  <text x="75" y="20" fill="#67e8f9" fontSize="11" fontWeight="bold" textAnchor="middle">
                    🛡️ Edge Perimeter
                  </text>
                  <text x="12" y="55" fill="#94a3b8" fontSize="10">BGP Anycast Scrubbing</text>
                  <text x="12" y="75" fill="#94a3b8" fontSize="10">Geo-IP: India Only</text>
                  <text x="12" y="95" fill="#38bdf8" fontSize="10">DDoS Threshold: 40Gbps</text>
                  <rect x="12" y="110" width="126" height="22" rx="4" fill="#164e63" />
                  <text x="75" y="125" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Clean Traffic Forward
                  </text>
                </g>

                {/* Node 3: DMZ VPN Concentrator Cluster (VRRP) */}
                <g transform="translate(410, 60)">
                  <rect width="210" height="210" rx="12" fill="#0f172a" stroke="#059669" strokeWidth="2" />
                  <rect width="210" height="32" rx="12" fill="#064e3b" />
                  <text x="105" y="22" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                    🏢 Gateway Cluster (VRRP)
                  </text>
                  <text x="15" y="60" fill="#94a3b8" fontSize="10">VIP: 203.0.113.10 (VRRP 51)</text>
                  <text x="15" y="80" fill="#94a3b8" fontSize="10">Node A (Active) + Node B (Active)</text>
                  <text x="15" y="100" fill="#34d399" fontSize="10">Capacity: 8.0 Gbps AES-NI</text>
                  <text x="15" y="120" fill="#94a3b8" fontSize="10">MSS Clamped: 1360 Bytes</text>
                  <text x="15" y="140" fill="#38bdf8" fontSize="10">AAA: RADIUS + SAML 2.0</text>
                  <rect x="15" y="165" width="180" height="26" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                  <text x="105" y="182" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Sub-Second VRRP Failover
                  </text>
                </g>

                {/* Node 4: Core Production VLANs & Internal Servers */}
                <g transform="translate(660, 30)">
                  <rect width="200" height="85" rx="8" fill="#0f172a" stroke="#059669" strokeWidth="1.5" />
                  <rect width="200" height="22" rx="8" fill="#064e3b" />
                  <text x="100" y="15" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Corp Prod VLAN 100 (ERP/DB)
                  </text>
                  <text x="12" y="45" fill="#94a3b8" fontSize="9">Tax Core (10.14.20.15)</text>
                  <text x="12" y="65" fill="#34d399" fontSize="9">Access: Full-Time Staff Only</text>
                </g>

                <g transform="translate(660, 130)">
                  <rect width="200" height="85" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
                  <rect width="200" height="22" rx="8" fill="#1e1b4b" />
                  <text x="100" y="15" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Contractor DMZ VLAN 200
                  </text>
                  <text x="12" y="45" fill="#94a3b8" fontSize="9">Git &amp; Jira Portal (Port 443)</text>
                  <text x="12" y="65" fill="#818cf8" fontSize="9">Access: Clientless ZTNA</text>
                </g>

                <g transform="translate(660, 230)">
                  <rect width="200" height="85" rx="8" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
                  <rect width="200" height="22" rx="8" fill="#422006" />
                  <text x="100" y="15" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Quarantine VLAN 900
                  </text>
                  <text x="12" y="45" fill="#94a3b8" fontSize="9">Remediation Portal (WSUS)</text>
                  <text x="12" y="65" fill="#facc15" fontSize="9">Score &lt; 80 / Unhealthy Hosts</text>
                </g>

                {/* Animated Packet Pathways */}
                <path d="M 180,165 L 220,165" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowMaster)" />
                <path d="M 370,165 L 410,165" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowMaster)" />
                <path d="M 620,130 L 660,70" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrowMaster)" />
                <path d="M 620,165 L 660,165" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowMaster)" />

                <circle r="4" fill="#34d399">
                  <animateMotion path="M 180,165 L 220,165" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle r="4" fill="#34d399">
                  <animateMotion path="M 370,165 L 410,165" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>

            {/* Components Tag Cloud */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Active Tier Components &amp; Security Controls:
              </div>
              <div className="flex flex-wrap gap-2">
                {currentTier.components.map((comp, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-300">
                    ✔ {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE PERSONA ACCESS POLICY WORKBENCH */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 text-xl">
              👥
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 2: Live Enterprise Persona Access Policy Workbench
              </h2>
              <p className="text-sm text-slate-400">
                Simulate different remote worker roles, MFA methods, and device health posture criteria to evaluate access decisions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Control 1: Persona */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Remote Worker Persona
              </label>
              <select
                value={selectedPersonaKey}
                onChange={(e) => setSelectedPersonaKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="susmita_executive">Susmita (Finance Lead / Executive - Barrackpore)</option>
                <option value="debangshu_contractor">Debangshu (Third-Party Contractor - Jadavpur)</option>
                <option value="mamata_admin">Mamata (SOC Infrastructure Lead - Kolkata)</option>
                <option value="mahima_field">Mahima (Municipal Field Inspector - Ichapur)</option>
              </select>
              <p className="text-[11px] text-slate-400">
                Determines base role entitlement and assigned corporate VLAN subnet.
              </p>
            </div>

            {/* Control 2: MFA Method */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                2. MFA Authentication Factor
              </label>
              <select
                value={simulatedMfaMethod}
                onChange={(e) => setSimulatedMfaMethod(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="fido2_passkey">FIDO2 / WebAuthn Hardware Passkey (Compliant)</option>
                <option value="totp_authenticator">TOTP Authenticator App (Microsoft/Google)</option>
                <option value="sms_otp">SMS / Voice OTP (Insecure - Non-Compliant)</option>
              </select>
              <p className="text-[11px] text-slate-400">
                SMS OTP is strictly rejected under CERT-In and RBI cyber guidelines.
              </p>
            </div>

            {/* Control 3: Device Health Checkboxes */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                3. Endpoint Posture Telemetry
              </label>
              <div className="space-y-1.5 text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateDiskEncryption}
                    onChange={(e) => setSimulateDiskEncryption(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>BitLocker / FileVault Encrypted (+35 pts)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateEdrActive}
                    onChange={(e) => setSimulateEdrActive(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>CrowdStrike EDR Running (+35 pts)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateOsPatched}
                    onChange={(e) => setSimulateOsPatched(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span>OS Patches &lt; 30 Days Old (+30 pts)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Persona Policy Decision Card */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Posture Health Score:</span>
                <span className={clsx(
                  "font-mono font-bold text-sm px-2 py-0.5 rounded",
                  personaPolicyResult.score >= 80 ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-rose-950 text-rose-300 border border-rose-800"
                )}>
                  {personaPolicyResult.score} / 100
                </span>
              </div>
              <span className={clsx("px-3 py-1 rounded-full text-xs font-bold border", personaPolicyResult.decisionBadge)}>
                {personaPolicyResult.decisionTitle}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-400 uppercase tracking-wider">
                  Network Assignment &amp; Tunnel Mode:
                </div>
                <p><strong className="text-white">Assigned Network:</strong> {personaPolicyResult.assignedSubnet}</p>
                <p><strong className="text-white">Tunnel Policy:</strong> {personaPolicyResult.tunnelMode}</p>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-400 uppercase tracking-wider">
                  Policy Decision Rationale:
                </div>
                <p className="text-slate-300 leading-relaxed">{personaPolicyResult.explanation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: CAPACITY PLANNING & CLUSTER SIZING ENGINE (INR ₹) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xl">
              📊
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Studio 3: Gateway Sizing, Geo-Redundancy &amp; Capacity Engine (INR ₹)
              </h2>
              <p className="text-sm text-slate-400">
                Calculate gateway cluster sizing, redundant WAN leased line requirements, and annual operational TCO
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slider 1: Total Workforce */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Total Remote Workforce:</span>
                <span className="text-emerald-400 font-mono text-sm">{totalRemoteWorkforce} Users</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={totalRemoteWorkforce}
                onChange={(e) => setTotalRemoteWorkforce(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Total remote employees, field staff, and third-party contractors.
              </p>
            </div>

            {/* Slider 2: Concurrency Ratio */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Peak Concurrency Ratio:</span>
                <span className="text-emerald-400 font-mono text-sm">{peakConcurrencyPercent}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="5"
                value={peakConcurrencyPercent}
                onChange={(e) => setPeakConcurrencyPercent(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Percentage of employees connected simultaneously during peak business hours.
              </p>
            </div>

            {/* Slider 3: Average Throughput */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-300">Avg Bandwidth / User:</span>
                <span className="text-emerald-400 font-mono text-sm">{avgThroughputPerUserMbps} Mbps</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="6.0"
                step="0.2"
                value={avgThroughputPerUserMbps}
                onChange={(e) => setAvgThroughputPerUserMbps(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Accounts for Teams/Zoom HD calls, database queries, and cloud SaaS.
              </p>
            </div>
          </div>

          {/* Sizing Computed Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Peak Concurrent Tunnels</div>
              <div className="text-2xl font-extrabold text-white font-mono">
                {capacitySizingMetrics.concurrentUsers} <span className="text-sm font-normal text-emerald-400">Active</span>
              </div>
              <div className="text-[11px] text-slate-400">Simultaneous VPN Sessions</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Peak Bandwidth Demand</div>
              <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                {capacitySizingMetrics.totalPeakBandwidthGbps} <span className="text-sm font-normal text-white">Gbps</span>
              </div>
              <div className="text-[11px] text-slate-400">WAN Internet Capacity Required</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Cluster Nodes Required</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">
                {capacitySizingMetrics.totalNodesInCluster} <span className="text-sm font-normal text-white">Nodes</span>
              </div>
              <div className="text-[11px] text-slate-400">
                {capacitySizingMetrics.activeNodesNeeded} Active + 1 Standby (VRRP)
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Annual Cluster TCO (₹)</div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                ₹{capacitySizingMetrics.totalAnnualTcoLakhs} <span className="text-sm font-normal text-white">Lakhs</span>
              </div>
              <div className="text-[11px] text-slate-400">Hardware + 2 Gbps Leased Line</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL CAPSTONE CASE STUDY (BARRACKPORE MUNICIPAL & FINTECH) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-all duration-300 hover:border-emerald-500/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 text-xl">
                🏛️
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Studio 4: Regional Capstone Case Study (Barrackpore Smart City)
                </h2>
                <p className="text-sm text-slate-400">
                  Walk through the four phases of modernizing remote access infrastructure across West Bengal
                </p>
              </div>
            </div>

            {/* Phase Selector */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(caseStudyPhases).map((key, idx) => (
                <button
                  key={key}
                  onClick={() => setActiveCaseStudyPhase(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                    activeCaseStudyPhase === key
                      ? "bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-900/40"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                  )}
                >
                  Phase {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{currentCasePhase.title}</h3>
                <p className="text-xs text-slate-400">{currentCasePhase.subtitle}</p>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-700 font-mono">
                👨‍💼 {currentCasePhase.leadArchitect}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentCasePhase.findings.map((item, idx) => (
                <div key={idx} className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 block mb-1">Key Action / Finding {idx + 1}:</strong>
                  {item}
                </div>
              ))}
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
                4. Programmatic Enterprise Deployment &amp; Sizing Engine (Python)
              </h2>
              <p className="text-sm text-slate-400">
                Inspect AAA pipeline logic, posture health scoring, and gateway capacity sizing formulas in Python
              </p>
            </div>
          </div>

          <PythonFileLoader
            fileModule={enterpriseVpnDeployerPy}
            title="enterprise_vpn_deployer.py"
            highlightLines={[42, 65, 87, 110]}
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
                5. Professional Wisdom, Common Pitfalls &amp; Capstone Checklist
              </h2>
              <p className="text-sm text-slate-400">
                Production-grade architectural standards for senior network security leaders
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
                <strong className="text-white">1. Enforce FIDO2 Passkeys on IdP:</strong>
                <p className="text-slate-400">
                  Never permit SMS OTPs for remote VPN access. Hardware FIDO2 WebAuthn keys provide origin-bound protection
                  that is 100% immune to AiTM reverse proxy phishing kits.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">2. Segment Contractors with Clientless ZTNA:</strong>
                <p className="text-slate-400">
                  Never give third-party vendors full subnet VPN routing. Use HTML5 browser sandboxes granting access strictly
                  to port 443 web services, eliminating lateral malware risks.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">3. Automate SCEP Certificate Lifecycles:</strong>
                <p className="text-slate-400">
                  Deploy SCEP via Microsoft Intune for 60-day automated certificate renewals. This prevents catastrophic
                  mass lockouts caused by manual root CA expiration oversight.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-white">4. Always Clamp TCP MSS to 1360 Bytes:</strong>
                <p className="text-slate-400">
                  Ensure all gateway clusters clamp TCP MSS to 1360 bytes. This permanently eliminates Path MTU Black Holes
                  on mixed PPPoE broadband networks across India.
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
                <strong className="text-rose-300">Misconception 1: "A single large VPN gateway is enough for HA."</strong>
                <p className="text-slate-400">
                  A single gateway is a catastrophic single point of failure. Always deploy Active-Active or Active-Passive
                  pairs with VRRP to ensure sub-second failover.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Misconception 2: "Posture checks are only needed at initial login."</strong>
                <p className="text-slate-400">
                  Static checks leave the network blind to mid-day malware infections. Implement CARTA continuous telemetry
                  to revoke tunnels immediately if EDR reports a breach.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 3: Placing VPN Concentrators Directly on the Production LAN:</strong>
                <p className="text-slate-400">
                  If the gateway appliance suffers a zero-day exploit (Ivanti CVE-2023-46805), attackers gain direct root access
                  to Domain Controllers. Always isolate concentrators inside a DMZ.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <strong className="text-rose-300">Pitfall 4: Neglecting 180-Day Log Retention:</strong>
                <p className="text-slate-400">
                  Failing to retain VPN authentication and NetFlow logs for 180+ days violates CERT-In cyber directives and
                  cripples post-breach forensic investigations.
                </p>
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className="bg-emerald-950/40 border border-emerald-800/80 p-5 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <span>💭</span> Pedagogical Hints for Senior Security Architects
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong className="text-emerald-200">Think about:</strong> How does VRRP Virtual IP failover maintain active VPN sessions during a gateway node reboot?</li>
              <li><strong className="text-emerald-200">Observe carefully:</strong> How the AAA pipeline in Studio 2 quarantines an unpatched device to VLAN 900 without disconnecting it entirely.</li>
              <li><strong className="text-emerald-200">Try changing this:</strong> Adjust workforce concurrency in Studio 3 to calculate required Active-Active cluster nodes and annual WAN leased-line costs in INR (₹).</li>
            </ul>
          </div>

          {/* Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <span>✅</span> Module 005_003 Capstone Mastery Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Explain the 4-tier defense-in-depth remote access architecture</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Describe the 3-stage AAA authentication and posture scoring pipeline</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Calculate peak gateway bandwidth and cluster sizing in INR (₹)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                <span>Synthesize all 12 topics of Module 005_003: VPNs &amp; Tunneling</span>
              </label>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE (30 COMPREHENSIVE QUESTIONS) */}
        {/* ========================================================================= */}
        <FAQTemplate
          title="Enterprise VPN Deployment & Remote Worker Case Study FAQs"
          questions={questions}
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & DOWNLOAD (TOPIC NOTE) */}
        {/* ========================================================================= */}
        <PlainTextPrint
          content={noteText}
          title="Enterprise VPN Deployment Capstone Academic Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic Note"
          downloadFileName="topic11_note.txt"
        />

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE (SUKANTA HUI - CAPSTONE CONCLUSION) */}
        {/* ========================================================================= */}
        <Teacher
          note="Congratulations on completing Module 005_003: VPNs and Tunneling! Throughout these 12 comprehensive topics, we have journeyed from the historical origins of Point-to-Point Protocol (PPP) and legacy PPTP/L2TP flaws, through the mathematical mechanics of IPsec ESP and WireGuard cryptographic routing, all the way to modern Zero Trust Network Access (ZTNA) and enterprise High Availability clustering. As you step out into the cybersecurity industry as network architects and SOC defense leaders, remember Sukanta Hui's core philosophy: Real-world security is not about blindly trusting a single technology; it is about orchestrating identity, cryptography, device health, and network segmentation into a resilient, self-healing ecosystem. Build with defense-in-depth, always verify continuously, and design architectures that empower secure global productivity!"
        />

      </div>
    </div>
  );
};

export default Topic11;
