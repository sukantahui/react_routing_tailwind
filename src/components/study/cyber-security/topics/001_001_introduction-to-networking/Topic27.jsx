// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic27.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 27: Network Address

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic27_files/topic27_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic27_files/topic27_note.txt?raw';

const Topic27 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedSubnetId, setSelectedSubnetId] = useState('slash24');
  const [routingDecisionLog, setRoutingDecisionLog] = useState(null);

  const subnetProfiles = [
    {
      id: 'slash24',
      name: 'Class C Standard Subnet (/24)',
      cidr: '/24',
      sampleIP: '192.168.10.45',
      networkID: '192.168.10.0',
      subnetMask: '255.255.255.0',
      broadcastIP: '192.168.10.255',
      usableRange: '192.168.10.1 – 192.168.10.254',
      hostBits: 8,
      totalHosts: 254,
      desc: 'Standard local subnetwork for student computer labs and departmental offices in Kolkata.',
      routingTrace: 'Host 192.168.10.45 & 255.255.255.0 &rarr; Target Network is 192.168.10.0. Local switch delivers frame directly via ARP.',
    },
    {
      id: 'slash28',
      name: 'Small Department / DMZ Subnet (/28)',
      cidr: '/28',
      sampleIP: '192.168.50.9',
      networkID: '192.168.50.0',
      subnetMask: '255.255.255.240',
      broadcastIP: '192.168.50.15',
      usableRange: '192.168.50.1 – 192.168.50.14',
      hostBits: 4,
      totalHosts: 14,
      desc: 'High-security micro-subnet for factory CNC controllers in Barrackpore and healthcare DMZ servers.',
      routingTrace: 'Host 192.168.50.9 & 255.255.255.240 -&gt; Network 192.168.50.0. Block size = 16. Broadcast = 192.168.50.15.',
    },
    {
      id: 'slash30',
      name: 'Point-to-Point WAN Link (/30)',
      cidr: '/30',
      sampleIP: '10.0.99.1',
      networkID: '10.0.99.0',
      subnetMask: '255.255.255.252',
      broadcastIP: '10.0.99.3',
      usableRange: '10.0.99.1 – 10.0.99.2',
      hostBits: 2,
      totalHosts: 2,
      desc: 'Dedicated serial / fiber router-to-router point-to-point trunk link with zero wasted IP addresses.',
      routingTrace: 'Host 10.0.99.1 sends packet to 10.0.99.2 (Next-Hop Gateway) across point-to-point fiber interface.',
    },
    {
      id: 'slash16',
      name: 'Class B Enterprise Campus Grid (/16)',
      cidr: '/16',
      sampleIP: '172.16.45.102',
      networkID: '172.16.0.0',
      subnetMask: '255.255.0.0',
      broadcastIP: '172.16.255.255',
      usableRange: '172.16.0.1 – 172.16.255.254',
      hostBits: 16,
      totalHosts: 65534,
      desc: 'Large university campus aggregation grid in Jadavpur supporting multiple faculties and Wi-Fi networks.',
      routingTrace: '172.16.45.102 & 255.255.0.0 -> Core Layer-3 Switch routes between internal departmental VLANs at 40Gbps.',
    },
  ];

  const currentSubnet = subnetProfiles.find((s) => s.id === selectedSubnetId) || subnetProfiles[0];

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
      title: '1. Precision Foundry VLSM Subnet Segmentation (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu partitioned the 10.10.0.0/16 private network in Barrackpore into dedicated departmental subnets using VLSM: CNC Shop (10.10.1.0/24), Accounts (10.10.2.0/28), and Robotics (10.10.3.0/26), keeping broadcast domains isolated and secure.',
      lesson: 'VLSM customizes subnet sizes to departmental needs, eliminating wasted IP addresses.',
    },
    {
      title: '2. Diagnostic Clinic Private DMZ & Bastion Isolation (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima placed healthcare database servers on an isolated private subnet (172.20.5.0/24) in Ichapur. Doctor workstations access patient files strictly through a Bastion Jump Host over SSH/TLS, blocking unauthorized lateral subnet access.',
      lesson: 'Non-routable private subnets and bastion gateways protect sensitive medical records.',
    },
    {
      title: '3. University Campus Static Public IP Block Leasing (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata procured a static public /29 IP block (5 usable public IPs) from an enterprise ISP in Kolkata for ₹2,500/month (₹30,000/year). Configured with PAT (NAT Overload), 4,000 campus students browse the Internet seamlessly through one shared public gateway IP.',
      lesson: 'Port Address Translation (PAT) allows thousands of internal hosts to share one public IP.',
    },
    {
      title: '4. Cyber Security Lab ARP Poisoning Defense (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila enabled Dynamic ARP Inspection (DAI) and DHCP Snooping on managed core switches in Jadavpur for ₹65,000 in switch licensing. DAI validates every ARP reply against the DHCP binding database, neutralizing Man-in-the-Middle credential interception attempts.',
      lesson: 'Dynamic ARP Inspection prevents attackers from forging MAC-to-IP address bindings.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes addressPulse27 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-address27 {
          animation: addressPulse27 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 27
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Network Address • IPv4 & IPv6 • Subnetting • ARP • Budgeting in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Network Address
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Network Addressing & Subnetting Architecture</span>: mastering IPv4 and IPv6 structure, Subnet Masks, CIDR prefix notation, Usable Host calculations ($2^H - 2$), Address Resolution Protocol (ARP), and public IP leasing budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'address-foundations', label: '1. Addressing Hierarchy' },
              { id: 'interactive-studio', label: '2. Subnet Calculator Studio' },
              { id: 'private-ranges', label: '3. RFC 1918 & Special Ranges' },
              { id: 'svg-stack', label: '4. 4-Layer Addressing SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Addressing Foundations */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                What is a Network Address?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Network Address</strong> is a unique numerical or logical identifier assigned to a network interface or an entire subnetwork that enables routers, switches, and hosts to locate, route, and deliver data packets across local area networks (LANs) and the global Internet.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Layer 2 Physical MAC</span>
                <p className="text-slate-300 text-xs">48-bit hex burned-in identifier for local frame delivery on the switch.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Layer 3 Logical IP</span>
                <p className="text-slate-300 text-xs">IPv4 (32-bit) / IPv6 (128-bit) for end-to-end packet routing across routers.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Layer 4 Port Number</span>
                <p className="text-slate-300 text-xs">16-bit address (0–65535) identifying the specific target software daemon.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Layer 7 Domain URL</span>
                <p className="text-slate-300 text-xs">Human-readable FQDN (www.college.edu) resolved by DNS over Port 53.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Subnet Calculator Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-address27">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Subnet Calculator & Network Address Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a CIDR prefix to calculate Network ID, Subnet Mask, Broadcast IP, Usable Host Range, and simulated packet routing evaluation:
            </p>

            {/* Subnet Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {subnetProfiles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSubnetId(s.id);
                    setRoutingDecisionLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedSubnetId === s.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {s.name}
                </button>
              ))}
            </div>

            {/* Active Subnet Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentSubnet.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Usable Hosts: 2^{currentSubnet.hostBits} - 2 = {currentSubnet.totalHosts} Hosts
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Network Address (Host 0s):</span>
                  <span className="text-sky-300 font-bold">{currentSubnet.networkID}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Subnet Mask:</span>
                  <span className="text-amber-300 font-bold">{currentSubnet.subnetMask}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Broadcast IP (Host 1s):</span>
                  <span className="text-rose-300 font-bold">{currentSubnet.broadcastIP}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-purple-300 font-bold font-sans">Usable Host IP Range:</span>
                <span className="text-slate-200">{currentSubnet.usableRange}</span>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Bitwise Logical AND Routing Test:
                  </span>
                  <button
                    onClick={() => setRoutingDecisionLog(currentSubnet.routingTrace)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Evaluate Route Mask ▶
                  </button>
                </div>

                {routingDecisionLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛣️ <strong>Router Bitwise AND Result:</strong> {routingDecisionLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: RFC 1918 & Special Ranges */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                RFC 1918 Private IPv4 Ranges & Special Reserved Addresses
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">RFC 1918 Private Subnets (Non-Routable on Internet):</span>
                <p className="text-slate-300 text-xs">• Class A: 10.0.0.0/8 (10.0.0.0 to 10.255.255.255 - 16.7M hosts)</p>
                <p className="text-slate-300 text-xs">• Class B: 172.16.0.0/12 (172.16.0.0 to 172.31.255.255 - 1M hosts)</p>
                <p className="text-slate-300 text-xs">• Class C: 192.168.0.0/16 (192.168.0.0 to 192.168.255.255 - 65K hosts)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-purple-300 font-sans font-bold">Special Reserved Addresses:</span>
                <p className="text-slate-300 text-xs">• Loopback (127.0.0.1 / ::1): Localhost inter-process testing.</p>
                <p className="text-slate-300 text-xs">• APIPA / Link-Local (169.254.0.0/16): Self-assigned on DHCP failure.</p>
                <p className="text-slate-300 text-xs">• Default Route (0.0.0.0/0): Matches all internet traffic.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: 4-Layer Addressing SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                4-Layer Network Addressing Stack Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Layer 7 Application */}
                <rect x="20" y="20" width="160" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="42" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Layer 7 URL / FQDN</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="7" textAnchor="middle">https://www.college.edu</text>
                <text x="100" y="70" fill="#fde68a" fontSize="7" textAnchor="middle">Resolved by DNS (Port 53)</text>

                <line x1="180" y1="50" x2="210" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Layer 4 Transport */}
                <rect x="210" y="20" width="150" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="285" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">Layer 4 Port Number</text>
                <text x="285" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Port 443 (HTTPS)</text>
                <text x="285" y="70" fill="#a7f3d0" fontSize="7" textAnchor="middle">Ephemeral Port: 54123</text>

                <line x1="360" y1="50" x2="390" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Layer 3 Logical */}
                <rect x="390" y="20" width="160" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="470" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">Layer 3 Logical IP</text>
                <text x="470" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">IP: 103.25.10.4 / 192.168.1.50</text>
                <text x="470" y="70" fill="#fde68a" fontSize="7" textAnchor="middle">Subnet Mask: 255.255.255.0</text>

                <line x1="550" y1="50" x2="580" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Layer 2 Physical */}
                <rect x="580" y="20" width="140" height="60" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="650" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Layer 2 MAC</text>
                <text x="650" y="58" fill="#cbd5e1" fontSize="7" textAnchor="middle">00:1A:2B:3C:4D:5E</text>
                <text x="650" y="70" fill="#fde68a" fontSize="7" textAnchor="middle">Resolved via ARP</text>

                {/* Bottom Address Lifecycle Banner */}
                <rect x="20" y="110" width="700" height="85" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="135" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  HIERARCHICAL ADDRESS RESOLUTION (DNS ➔ TCP PORT ➔ IP ROUTING ➔ ARP ➔ MAC)
                </text>
                <text x="370" y="155" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Bitwise Logical AND extracts Network ID for routing • Dynamic ARP Inspection (DAI) protects MAC binding
                </text>
                <text x="370" y="175" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Static Public IP Block Leasing (/29 @ ₹2,500/mo) • Port Address Translation (PAT / NAT Overload)
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations & Subnet Architecture Case Studies
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
                &gt;
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
        &gt;
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
                  trap: 'Attempting to Assign the First or Last IP of a Subnet to a Host',
                  fix: 'The first address (host bits all 0s) is the Network ID; the last address (host bits all 1s) is the Broadcast IP. Both are reserved and cannot be assigned to hosts.',
                },
                {
                  trap: 'Assuming APIPA (169.254.x.x) Means Normal Internet Connection',
                  fix: '169.254.x.x is a link-local fallback address indicating that the DHCP server failed to respond and the host has zero external network connectivity.',
                },
                {
                  trap: 'Overlapping Private Subnets Across Site-to-Site IPSec VPN Tunnels',
                  fix: 'If both branch offices use 192.168.1.0/24, routers cannot determine whether a packet is local or remote. Always assign distinct subnets (e.g. 10.1.0.0/24 vs 10.2.0.0/24).',
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
        &gt;
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
                  Think of network addressing like a postal letter: the Domain Name is the recipient name, the IP Address is the street address and city PIN code, the Port Number is the apartment room number, and the MAC Address is the physical mailbox!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how changing the subnet mask from /24 (254 hosts) to /28 (14 hosts) divides a single network into 16 smaller isolated broadcast domains!
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 27)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the 4-layer addressing stack (MAC, IP, Port, Domain Name)',
                'Mastered the IPv4 Subnet Mask and the 2^H - 2 usable host formula',
                'Memorized the RFC 1918 Private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)',
                'Traced the Address Resolution Protocol (ARP) and DHCP DORA 4-step lifecycle',
                'Understood CIDR prefix notation (/24, /28, /30, /16) and VLSM design',
                'Formulated realistic ISP public IP block and subnet leasing budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Network addresses are the navigational coordinates of all digital communications. In our next topic (Topic 28), we will explore MAC Addresses in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Network Address FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Network Addresses in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic28_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic27;
