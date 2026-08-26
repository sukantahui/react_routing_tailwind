// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic36.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 36: Internet vs Intranet

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic36_files/topic36_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic36_files/topic36_note.txt?raw';

const Topic36 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedScenarioId, setSelectedScenarioId] = useState('dmz-reverse-proxy');
  const [scenarioAuditLog, setScenarioAuditLog] = useState(null);

  const scenarioProfiles = [
    {
      id: 'dmz-reverse-proxy',
      name: 'Public Web Request via Screened DMZ Reverse Proxy',
      zone: 'Untrusted WAN (Internet) ➔ DMZ (Semi-Trusted) ➔ Internal Intranet (Trusted)',
      sourceIp: '157.240.22.35 (Public Internet Client in Delhi)',
      dmzTarget: '172.16.1.10:443 (NGINX Reverse Proxy in DMZ)',
      internalTarget: '10.0.5.20:8080 (Private Core ERP Database Cluster)',
      firewallAction: 'External Firewall permits Port 443; Internal Firewall permits DMZ-to-App query only.',
      securityGuard: 'Direct external connection to database port 8080 is strictly blocked by internal firewall.',
      estApplianceCost: '₹1,85,000 (Dual FortiGate UTM Pair)',
      desc: 'Standard multi-tier DMZ architecture protecting corporate ERP data in Barrackpore from Internet threats.',
      simResult: 'External Client -> [Ext Firewall: Allow 443] -> DMZ Reverse Proxy -> [Int Firewall: Allow DB Query] -> 10.0.5.20 (Safe Isolation Enforced).',
    },
    {
      id: 'internal-intranet-erp',
      name: 'Internal Employee High-Speed Intranet Query',
      zone: 'Trusted Internal Intranet (Workstation VLAN ➔ Core Server VLAN)',
      sourceIp: '10.0.1.45 (HR Workstation in Kolkata Office)',
      dmzTarget: 'Bypasses DMZ (Direct East-West Internal Routing)',
      internalTarget: '10.0.5.10 (Internal Payroll File Server)',
      firewallAction: 'Internal Microsegmentation Firewall verifies Kerberos Token & 802.1X NAC.',
      securityGuard: 'High-speed 10 Gbps LAN fabric with < 0.5 ms latency and zero Internet exposure.',
      estApplianceCost: '₹85,000 (10G Core Distribution Switch)',
      desc: 'Authenticated internal employee accessing confidential payroll records within the private Intranet.',
      simResult: 'HR PC (10.0.1.45) -> 802.1X NAC Verified -> Internal Core Switch -> Payroll Server (10.0.5.10) [Transfer speed: 9.8 Gbps].',
    },
    {
      id: 'direct-internet-traffic',
      name: 'Employee Outbound Internet Web Browsing via NAT & Forward Proxy',
      zone: 'Trusted Intranet ➔ Egress Gateway NAT ➔ Public Internet',
      sourceIp: '10.0.2.112 (Internal Workstation in Ichapur)',
      dmzTarget: '172.16.1.50 (Forward Proxy & DLP Gateway)',
      internalTarget: '142.250.193.206 (Google Cloud Public Web Server)',
      firewallAction: 'PAT translates private IP 10.0.2.112:51200 to Public IP 103.25.10.4:61200.',
      securityGuard: 'DLP sensor scans outbound upload payloads; blocks unencrypted Aadhaar / PAN file leaks.',
      estApplianceCost: '₹95,000 (Forward Proxy & Egress DLP Gateway)',
      desc: 'Internal employee accessing external technical documentation safely through an egress forward proxy.',
      simResult: 'Internal PC -> DLP Forward Proxy (Clean) -> PAT NAT Gateway (103.25.10.4) -> External Web Server.',
    },
    {
      id: 'airgap-breach-attempt',
      name: 'Unauthorized Air-Gap Breach Attempt via Rogue USB',
      zone: 'Isolated Industrial SCADA Intranet (Air-Gapped)',
      sourceIp: 'Physical USB Port on SCADA Operator Terminal',
      dmzTarget: 'Zero Physical / Wireless Internet Connectivity',
      internalTarget: '192.168.100.1 (Turbine PLC Controller)',
      firewallAction: 'Endpoint Honeypot triggers instant network isolation on unauthorized port scanning.',
      securityGuard: 'Physical USB drive blocked by Endpoint Protection; rogue Wi-Fi dongle disabled.',
      estApplianceCost: '₹45,000 (USB Sanitization Kiosk & Honeypot)',
      desc: 'Air-gapped power turbine control network in Jadavpur successfully defended against offline malware injection.',
      simResult: 'Malicious USB inserted -> Endpoint EDR blocks payload execution -> Honeypot logs port scan -> Switch port shutdown in 80ms.',
    },
  ];

  const currentScenario = scenarioProfiles.find((s) => s.id === selectedScenarioId) || scenarioProfiles[0];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Precision Foundry DMZ Reverse Proxy Deployment (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu isolated ERP database clusters from the Internet in Barrackpore by deploying an NGINX Reverse Proxy in the DMZ with dual FortiGate firewalls for ₹1,85,000. Customer portal requests are terminated in the DMZ, completely blocking direct external access to internal database ports.',
      lesson: 'Terminating external web connections inside a screened DMZ prevents direct attack vectors against core internal databases.',
    },
    {
      title: '2. Diagnostic Clinic Healthcare Intranet Microsegmentation (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima implemented VLAN microsegmentation on hospital intranet switches in Ichapur for ₹65,000. Radiology MRI machines, patient billing workstations, and doctor consultation tablets are isolated into dedicated VLANs with strict firewall rules, stopping malware propagation across departments.',
      lesson: 'Microsegmentation eliminates flat intranet vulnerabilities, containing infections within single departmental VLANs.',
    },
    {
      title: '3. University Campus Split-Horizon DNS & ZTNA Rollout (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata configured BIND Split-Horizon DNS and Zero Trust application access in Kolkata for ₹85,000. Faculty accessing `payroll.univ.edu` receive internal private IPs on campus and must pass MFA device compliance checks when connecting remotely, eliminating vulnerable legacy VPN gateways.',
      lesson: 'Split-Horizon DNS and ZTNA least privilege protect internal hostnames and enforce continuous identity verification.',
    },
    {
      title: '4. Cyber Security Lab Air-Gap USB Defense & Honeypots (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila deployed internal honeypot sensors and automated USB isolation kiosks in Jadavpur for ₹45,000. When a student plugged in an infected USB drive, the honeypot detected port scan activity within 80 milliseconds, triggering an immediate switch port shutdown before lateral spread.',
      lesson: 'Internal honeypots provide early warning detection against air-gap jumping and insider lateral scanning.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes dmzPulse36 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-dmz36 {
          animation: dmzPulse36 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 36
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Internet vs Intranet • DMZ Architecture • RFC 1918 NAT • ZTNA in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Internet vs Intranet
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Public Internet vs Private Intranet Architectures</span>: mastering 3-tier DMZ perimeter isolation, RFC 1918 private addressing behind NAT, Split-Horizon DNS, Zero Trust Network Access (ZTNA), lateral movement defense, and dual perimeter firewall budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'net-foundations', label: '1. Architectural Comparison' },
              { id: 'interactive-studio', label: '2. Perimeter & DMZ Studio' },
              { id: 'matrix-table', label: '3. Technical Comparison Matrix' },
              { id: 'svg-dmz', label: '4. 3-Tier DMZ Architecture SVG' },
              { id: 'case-studies', label: '5. Bengal Case Studies' },
              { id: 'pitfalls', label: '6. Common Pitfalls' },
              { id: 'hints', label: '7. Guided Hints' },
              { id: 'checklist', label: '8. Revision Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Architectural Comparison */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                What is the Difference Between Internet and Intranet?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The <strong className="text-sky-400">Internet</strong> is a globally accessible, public, decentralized network of interconnected Autonomous Systems (ASNs) operating over public BGP and routable IP addresses. In contrast, an <strong className="text-indigo-400">Intranet</strong> is a private, restricted corporate network accessible strictly to authenticated organizational personnel, utilizing RFC 1918 private addressing behind perimeter firewalls and identity providers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Public vs Private</span>
                <p className="text-slate-300 text-xs">Internet is untrusted and global; Intranet is organizational and private.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. RFC 1918 NAT</span>
                <p className="text-slate-300 text-xs">Intranets use non-routable private IPs (10.0, 172.16, 192.168) translated by NAT.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. 3-Tier DMZ Perimeter</span>
                <p className="text-slate-300 text-xs">Dual firewalls isolate Untrusted WAN, Semi-Trusted DMZ, and Trusted Intranet.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. ZTNA & Firewalls (₹)</span>
                <p className="text-slate-300 text-xs">Zero Trust replaces legacy castle-and-moat models with continuous verification.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Perimeter & DMZ Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-dmz36">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Internet vs Intranet Perimeter & DMZ Security Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a network communication scenario to inspect security zone boundaries (WAN ➔ DMZ ➔ LAN), firewall policies, NAT translation, and simulated security audits:
            </p>

            {/* Scenario Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {scenarioProfiles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedScenarioId(s.id);
                    setScenarioAuditLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedScenarioId === s.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {s.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Scenario Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentScenario.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Appliance Solution: {currentScenario.estApplianceCost}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Traversed Security Zones:</span>
                <span className="text-sky-300 font-bold">{currentScenario.zone}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Source Endpoint IP:</span>
                  <span className="text-amber-300 font-bold">{currentScenario.sourceIp}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">DMZ Buffer Node:</span>
                  <span className="text-purple-300 font-bold">{currentScenario.dmzTarget}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Internal Target:</span>
                  <span className="text-emerald-300 font-bold">{currentScenario.internalTarget}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Firewall Policy Enforcement:</span>
                  <span className="text-slate-300">{currentScenario.firewallAction}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Security Boundary Protection:</span>
                  <span className="text-slate-300">{currentScenario.securityGuard}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Audit Boundary Flow & Perimeter Firewall Decision:
                  </span>
                  <button
                    onClick={() => setScenarioAuditLog(currentScenario.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute Firewall Policy Audit ▶
                  </button>
                </div>

                {scenarioAuditLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛡️ <strong>Firewall Boundary Telemetry:</strong> {scenarioAuditLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Technical Comparison Matrix */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Internet vs Intranet Comprehensive Technical Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Feature Metric</th>
                    <th className="p-2.5 text-sky-400">The Public Internet</th>
                    <th className="p-2.5 text-emerald-400">The Private Intranet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Accessibility</td>
                    <td className="p-2.5 text-sky-300">Public & Global (Anyone worldwide)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Strictly Restricted (Authenticated Staff)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Addressing Architecture</td>
                    <td className="p-2.5 text-sky-300">Public Routable IPv4 / IPv6</td>
                    <td className="p-2.5 text-emerald-300 font-bold">RFC 1918 Private (10.0.0.0, 172.16.0.0, 192.168.0.0)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Routing Mechanism</td>
                    <td className="p-2.5 text-sky-300">BGP (Border Gateway Protocol)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">OSPF, EIGRP, Static Routing (IGP)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Security Trust Zone</td>
                    <td className="p-2.5 text-rose-400">Untrusted (Zero-Trust Required)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Trusted / Microsegmented LAN</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Speed & Latency</td>
                    <td className="p-2.5 text-sky-300">10 Mbps – 1 Gbps (15–300 ms RTT)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">1 Gbps – 100 Gbps (&lt; 1 ms Deterministic RTT)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Cost Structure</td>
                    <td className="p-2.5 text-sky-300">Recurring ISP Bandwidth Leases</td>
                    <td className="p-2.5 text-emerald-300 font-bold">One-Time Hardware Capex + Maintenance (₹)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: 3-Tier DMZ Architecture SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                3-Tier DMZ Perimeter Isolation Architecture (Internet vs DMZ vs Intranet)
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Zone 1: Untrusted Internet */}
                <rect x="20" y="20" width="180" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="110" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">UNTRUSTED ZONE</text>
                <text x="110" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Public Internet (Global)</text>
                <text x="110" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Public BGP & Clients</text>

                <line x1="200" y1="55" x2="220" y2="55" stroke="#f43f5e" strokeWidth="3" />

                {/* External Firewall */}
                <rect x="220" y="30" width="40" height="50" rx="4" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="240" y="58" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">FW 1</text>

                <line x1="260" y1="55" x2="280" y2="55" stroke="#f43f5e" strokeWidth="2" />

                {/* Zone 2: Semi-Trusted DMZ */}
                <rect x="280" y="20" width="180" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="370" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">SEMI-TRUSTED DMZ</text>
                <text x="370" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Reverse Proxy / Web / Mail</text>
                <text x="370" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">172.16.1.0/24 Subnet</text>

                <line x1="460" y1="55" x2="480" y2="55" stroke="#34d399" strokeWidth="2" />

                {/* Internal Firewall */}
                <rect x="480" y="30" width="40" height="50" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="500" y="58" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">FW 2</text>

                <line x1="520" y1="55" x2="540" y2="55" stroke="#34d399" strokeWidth="3" />

                {/* Zone 3: Trusted Intranet */}
                <rect x="540" y="20" width="180" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="630" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">TRUSTED INTRANET</text>
                <text x="630" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Core ERP / Database / HR</text>
                <text x="630" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">10.0.0.0/8 (RFC 1918)</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  PERIMETER RULE: DIRECT INTERNET-TO-INTRANET ACCESS IS BLOCKED ➔ ALL TRAFFIC TERMINATES IN DMZ
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  RFC 1918 Private Addressing • Network Address Translation (PAT) • Split-Horizon DNS • Microsegmentation
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Zero Trust Network Access (ZTNA) • Dual Next-Gen Perimeter Firewalls (₹1,85,000 FortiGate Pair)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations & Perimeter Security Case Studies
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExample(idx)}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedExample === idx
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  )}
                >
                  {cs.title.split('(')[0]}
                </button>
              ))}
            </div>

            {(() => {
              const cs = caseStudies[selectedExample];
              return (
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white text-base">{cs.title}</h3>
                    <span className="text-amber-400 font-mono">{cs.lead}</span>
                  </div>
                  <p className="text-slate-300">{cs.desc}</p>
                  <p className="text-sky-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 6: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Placing Core Database Servers Directly in the DMZ',
                  fix: 'Never place databases in the DMZ. Only place reverse proxies, web servers, and mail relays in the DMZ; databases remain in the isolated internal Intranet.',
                },
                {
                  trap: 'Relying on a Flat, Unsegmented Internal Intranet',
                  fix: 'Flat networks allow ransomware on a single workstation to spread everywhere in seconds. Implement VLAN microsegmentation and ZTNA access policies.',
                },
                {
                  trap: 'Leaking Internal Intranet Hostnames to Public DNS Servers',
                  fix: 'Deploy Split-Horizon DNS so internal server names (e.g. payroll.corp.local) resolve to private IPs internally and are completely hidden from public Internet queries.',
                },
              ].map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                  <span className="text-rose-400 font-semibold text-xs sm:text-sm">⚠️ {p.trap}</span>
                  <p className="text-xs text-slate-300"><strong>Correction:</strong> {p.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think of the Internet like a public city street and the Intranet like a secure company headquarters building: the DMZ is the security check-in lobby where visitors are verified before entering!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Dual-Firewall DMZ setups provide defense-in-depth: even if a hacker breaches the external web server, the internal firewall stops them from reaching the database!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 36)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the differences between the public Internet and private Intranets',
                'Listed RFC 1918 private address ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)',
                'Designed a 3-tier DMZ perimeter architecture (Untrusted -> DMZ -> Trusted Intranet)',
                'Analyzed Split-Horizon DNS and Network Address Translation (NAT/PAT)',
                'Evaluated Lateral Movement, Air-Gap breaches, and Zero Trust Network Access (ZTNA)',
                'Formulated realistic perimeter firewall and DMZ hardware budgets in Indian Rupees (₹)',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Isolating private intranets behind DMZs protects corporate crown jewels. In our next topic (Topic 37), we will explore Extranet B2B architectures in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Internet vs Intranet FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Internet vs Intranet in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic37_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic36;
