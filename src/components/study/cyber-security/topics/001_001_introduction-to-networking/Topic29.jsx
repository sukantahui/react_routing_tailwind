// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic29.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 29: IP Address

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic29_files/topic29_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic29_files/topic29_note.txt?raw';

const Topic29 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedIpId, setSelectedIpId] = useState('class-c');
  const [packetRoutingTrace, setPacketRoutingTrace] = useState(null);

  const ipProfiles = [
    {
      id: 'class-c',
      name: 'Class C Private Subnet (192.168.1.100/24)',
      version: 'IPv4 (32-bit)',
      binaryRep: '11000000.10101000.00000001.01100100',
      scope: 'Private RFC 1918 (Non-Routable on Internet)',
      mask: '255.255.255.0 (/24 Prefix)',
      netVsHost: '24 Network Bits (192.168.1.0) • 8 Host Bits (100)',
      usableHosts: '254 Usable Hosts (.1 to .254)',
      desc: 'Standard local address for laptops and desktop workstations in Barrackpore and Kolkata offices.',
      simulation: 'Host dispatches packet → Switch checks local /24 mask → Directly delivers to local file server.',
    },
    {
      id: 'class-b-private',
      name: 'Class B Enterprise Private (172.16.45.10/16)',
      version: 'IPv4 (32-bit)',
      binaryRep: '10101100.00010000.00101101.00001010',
      scope: 'Private RFC 1918 (Enterprise Core LAN)',
      mask: '255.255.0.0 (/16 Prefix)',
      netVsHost: '16 Network Bits (172.16.0.0) • 16 Host Bits (45.10)',
      usableHosts: '65,534 Usable Hosts',
      desc: 'Mid-to-large enterprise campus grid in Jadavpur supporting multiple faculty buildings and Wi-Fi pools.',
      simulation: 'Packet enters Core Layer-3 switch → Inter-VLAN routing forwards across high-speed 40G fiber trunk.',
    },
    {
      id: 'public-class-a',
      name: 'Public Class A Static IP (8.8.8.8)',
      version: 'IPv4 (32-bit)',
      binaryRep: '00001000.00001000.00001000.00001000',
      scope: 'Public Globally Routable (Anycast Public DNS)',
      mask: '255.0.0.0 (Legacy /8 Anycast Route)',
      netVsHost: '8 Network Bits • 24 Host Bits',
      usableHosts: 'Global Anycast DNS Service',
      desc: 'Globally unique public IP address routed via BGP to the nearest regional Internet exchange point in Kolkata.',
      simulation: 'Client query → BGP routes to topologically nearest Kolkata ISP POP in 4.2ms.',
    },
    {
      id: 'ipv6-gua',
      name: 'IPv6 Global Unicast (2001:db8:acad:1::50/64)',
      version: 'IPv6 (128-bit)',
      binaryRep: '0010000000000001:0000110110111000:1010110010101101:0000000000000001:...',
      scope: 'Public Globally Routable (GUA 2000::/3)',
      mask: '/64 Global Prefix (Standard IPv6 Subnet)',
      netVsHost: '64 Routing Prefix Bits • 64 Interface ID Host Bits',
      usableHosts: '18.4 Quintillion Hosts (2^64) per Subnet',
      desc: 'Next-generation Internet address configured via SLAAC; eliminates NAT and provides direct end-to-end security.',
      simulation: 'Router Advertisement received → SLAAC autoconfigures Interface ID → Direct end-to-end TLS session.',
    },
  ];

  const currentIp = ipProfiles.find((i) => i.id === selectedIpId) || ipProfiles[0];

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
      title: '1. Precision Foundry Dual-Stack IPv4/IPv6 Rollout (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu configured dual-stack routing on an industrial plant in Barrackpore for ₹55,000. Legacy CNC machines communicate over private IPv4 (10.20.0.0/24), while modern cloud telemetry servers utilize global IPv6 (2001:db8:acad::/64) with zero NAT overhead.',
      lesson: 'Dual-stack architecture enables modern IPv6 adoption without breaking legacy industrial equipment.',
    },
    {
      title: '2. Diagnostic Clinic Static Public IP & VPN Setup (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima leased a static public /29 IPv4 block in Ichapur for ₹2,200/month (₹26,400/year). Configured with Port Address Translation (PAT) and an IPsec VPN tunnel, remote doctors securely access patient MRI scans with encrypted Layer 3 transport.',
      lesson: 'Static public IPs enable permanent IPsec VPN endpoints for remote healthcare consults.',
    },
    {
      title: '3. University Campus BGP IP Multihoming (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata implemented BGP multihoming with two independent telecom ISPs in Kolkata for ₹1,80,000 annually. The campus ASN announces its public /24 IP block (103.25.10.0/24), providing automatic failover if one fiber provider suffers a link cut.',
      lesson: 'BGP multihoming guarantees 99.999% internet uptime for mission-critical university portals.',
    },
    {
      title: '4. High-Tech Cyber Lab Anti-Spoofing & Geo-IP Defense (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila implemented Unicast Reverse Path Forwarding (uRPF) and Geo-IP blocking on perimeter firewalls in Jadavpur for ₹85,000. The system drops incoming spoofed packets whose source IP does not match authentic routing paths, neutralizing DDoS reflection.',
      lesson: 'uRPF and egress filtering prevent networks from launching or receiving spoofed IP packets.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes ipPulse29 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-ip29 {
          animation: ipPulse29 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 29
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              IP Address • IPv4 vs IPv6 • Classless CIDR • NAT & VPN in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            IP Address
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Internet Protocol (IP) Addressing Architecture</span>: mastering IPv4 octet structures, IPv6 128-bit hexadecimal notation, Classful legacy vs CIDR, RFC 1918 private scopes, NAT/PAT, and public IP block budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'ip-foundations', label: '1. IP Architecture' },
              { id: 'interactive-studio', label: '2. IP Conversion Studio' },
              { id: 'v4-vs-v6', label: '3. IPv4 vs IPv6 Matrix' },
              { id: 'svg-anatomy', label: '4. 32-Bit / 128-Bit SVG' },
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

        {/* SECTION 1: IP Foundations */}
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
                What is an IP (Internet Protocol) Address?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              An <strong className="text-sky-400">IP Address</strong> is a logical numerical label assigned to every device participating in a computer network that uses the Internet Protocol for communication. Operating at <strong className="text-indigo-400">OSI Layer 3 (Network Layer)</strong>, it provides hierarchical, globally routable addressing that enables routers to forward packets end-to-end across multiple intermediate networks and geographic locations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Hierarchical Routing</span>
                <p className="text-slate-300 text-xs">Network ID directs packets to subnets; Host ID identifies specific interfaces.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Global End-to-End</span>
                <p className="text-slate-300 text-xs">Source and Destination IP addresses remain constant throughout transmission.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. RFC 1918 Private Pools</span>
                <p className="text-slate-300 text-xs">10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 enable safe local re-use.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. 128-Bit IPv6 Next-Gen</span>
                <p className="text-slate-300 text-xs">Provides 340 undecillion addresses, eliminating NAT and broadcast overhead.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: IP Conversion Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-ip29">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive IP Address Architecture & Conversion Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select an IP address category to inspect binary representation, subnet prefix, public vs private scope, and simulated routing trace:
            </p>

            {/* IP Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {ipProfiles.map((ip) => (
                <button
                  key={ip.id}
                  onClick={() => {
                    setSelectedIpId(ip.id);
                    setPacketRoutingTrace(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedIpId === ip.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {ip.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active IP Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentIp.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-600">
                  Format: {currentIp.version}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Binary Bitstream Representation:</span>
                <span className="text-slate-200 break-all">{currentIp.binaryRep}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Scope & Routability:</span>
                  <span className="text-sky-300 font-bold">{currentIp.scope}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Subnet Mask / Prefix:</span>
                  <span className="text-amber-300 font-bold">{currentIp.mask}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Host Capacity:</span>
                  <span className="text-emerald-300 font-bold">{currentIp.usableHosts}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs">
                <span className="text-purple-300 font-bold">Network vs Host Breakdown:</span>
                <p className="text-slate-300 font-mono">{currentIp.netVsHost}</p>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Simulate Layer 3 Packet Routing & Mask Check:
                  </span>
                  <button
                    onClick={() => setPacketRoutingTrace(currentIp.simulation)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Forward IP Packet ▶
                  </button>
                </div>

                {packetRoutingTrace && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🛣️ <strong>Router Forwarding Log:</strong> {packetRoutingTrace}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: IPv4 vs IPv6 Matrix */}
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
                IPv4 vs IPv6 Architectural Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Feature</th>
                    <th className="p-2.5 text-sky-400">IPv4</th>
                    <th className="p-2.5 text-emerald-400">IPv6</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Address Length</td>
                    <td className="p-2.5 text-sky-300">32 bits (4 octets)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">128 bits (16 octets)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Total Address Space</td>
                    <td className="p-2.5 text-slate-300">~4.3 Billion (2^32)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">~3.4 x 10^38 (2^128)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Notation Format</td>
                    <td className="p-2.5">Dotted-Decimal (192.168.1.1)</td>
                    <td className="p-2.5">Hexadecimal Colons (2001:db8::1)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Broadcast Addressing</td>
                    <td className="p-2.5 text-amber-400">Supported (Broadcast Storms)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Eliminated (Replaced by Multicast)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Configuration Method</td>
                    <td className="p-2.5">Manual / DHCPv4</td>
                    <td className="p-2.5 text-emerald-300">SLAAC (Stateless) / DHCPv6</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">NAT Requirement</td>
                    <td className="p-2.5 text-rose-400">Mandatory (Address Depletion)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Not Required (Direct End-to-End)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: 32-Bit / 128-Bit SVG */}
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
                IPv4 32-Bit Octet Architecture & IPv6 128-Bit Hex Structure
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* IPv4 Octet Block */}
                <rect x="20" y="20" width="340" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="190" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                  IPV4 32-BIT DOTTED-DECIMAL (4 OCTETS)
                </text>
                <text x="190" y="58" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  [192] . [168] . [1] . [100] • 8 Bits per Octet
                </text>
                <text x="190" y="73" fill="#fde68a" fontSize="8" textAnchor="middle">
                  Network Portion (Mask) + Host Portion = 32 Bits Total
                </text>

                {/* IPv6 Hex Block */}
                <rect x="380" y="20" width="340" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="550" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  IPV6 128-BIT HEXADECIMAL (8 GROUPS)
                </text>
                <text x="550" y="58" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  [2001:0db8:acad:0001] : [0000:0000:0000:0050]
                </text>
                <text x="550" y="73" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                  64-Bit Routing Prefix + 64-Bit Interface ID (SLAAC)
                </text>

                {/* Bottom Routing Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ROUTING HIERARCHY: LONGEST PREFIX MATCH & NETWORK ADDRESS TRANSLATION (NAT)
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  RFC 1918 Private Pools (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) • Static Public /29 Blocks (₹2,500/mo)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Unicast Reverse Path Forwarding (uRPF) • Geo-IP Defense • IPsec Layer-3 Encrypted Tunnels
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
                Bengal Operations & IP Address Case Studies
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
                  trap: 'Attempting to Use the Double-Colon (::) Twice in an IPv6 Address',
                  fix: 'The double-colon :: can only appear ONCE in an IPv6 address; using it twice creates mathematical ambiguity when expanding the zero groups.',
                },
                {
                  trap: 'Configuring RFC 1918 Private IPs on Public Domain DNS A-Records',
                  fix: 'Private IPs (192.168.x.x / 10.x.x.x) are non-routable on the Internet. Public DNS records must point strictly to public static IP addresses.',
                },
                {
                  trap: 'Assuming IPv6 Still Uses Broadcast for Address Discovery',
                  fix: 'IPv6 completely eliminates broadcast addresses; it uses targeted Multicast (e.g. ff02::1 for all nodes) to preserve device CPU and battery.',
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
                  Think of an IP address like a phone number with country and area codes: the Network ID is the Kolkata city code (033), while the Host ID is your unique home telephone line number!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how NAT routers allow hundreds of devices to browse the Internet simultaneously using only one public IP address by assigning unique port numbers!
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
                Student Revision Checklist (Topic 29)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped 32-bit IPv4 octets and converted dotted-decimal to binary',
                'Differentiated between legacy Classful classes (A, B, C, D, E) and modern CIDR',
                'Memorized the RFC 1918 Private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)',
                'Mastered 128-bit IPv6 structure, zero-compression rules, and SLAAC autoconfiguration',
                'Understood NAT/PAT (Port Address Translation) and IPsec Layer-3 encryption',
                'Formulated realistic ISP static public IP and BGP multihoming budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: IP addressing is the core foundation of all global routing across the Internet. In our next topic (Topic 30), we will explore Bandwidth in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="IP Address FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="IP Addresses in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic30_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic29;
