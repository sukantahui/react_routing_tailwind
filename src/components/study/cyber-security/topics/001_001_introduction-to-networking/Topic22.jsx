// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic22.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 22: Basic Networking Components

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic22_files/topic22_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic22_files/topic22_note.txt?raw';

const Topic22 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeComponentId, setActiveComponentId] = useState('switch');
  const [packetActionMessage, setPacketActionMessage] = useState(null);

  const componentsList = [
    {
      id: 'hub',
      name: 'Network Hub',
      layer: 'Layer 1 (Physical)',
      pdu: 'Bits',
      collisionDomain: '1 Shared across all ports (High Collisions)',
      broadcastDomain: '1 Shared (Forwards everything to everyone)',
      desc: 'Multi-port physical repeater that broadcasts incoming electrical signals to every connected port indiscriminately.',
      role: 'Obsolete legacy device; replaced by switches due to packet collisions and eavesdropping security risks.',
      priceRange: '₹800 – ₹1,500 (Legacy)',
      behavior: 'Broadcasts packet indiscriminately to Port 1, Port 2, Port 3, Port 4.',
    },
    {
      id: 'switch',
      name: 'Network Switch (Layer 2)',
      layer: 'Layer 2 (Data Link)',
      pdu: 'Frames',
      collisionDomain: '1 Dedicated per port (Collision-Free)',
      broadcastDomain: '1 Shared per VLAN',
      desc: 'Intelligent multiport bridge that inspects incoming MAC headers and forwards frames directly to the destination port via its CAM Table.',
      role: 'The foundational building block of modern local area networks (LANs).',
      priceRange: '₹3,500 – ₹35,000 (24-port Gigabit)',
      behavior: 'Reads destination MAC -> Forwards frame exclusively to Port 2 (Recipient).',
    },
    {
      id: 'router',
      name: 'Network Router',
      layer: 'Layer 3 (Network)',
      pdu: 'Packets',
      collisionDomain: '1 Dedicated per interface',
      broadcastDomain: 'Breaks / Isolates Broadcast Domains',
      desc: 'Connects dissimilar subnets and networks together by inspecting IP headers and consulting dynamic IP Routing Tables (OSPF, BGP).',
      role: 'Directs traffic between local office LANs and the Internet WAN, performing NAT and firewalling.',
      priceRange: '₹12,000 – ₹1,50,000 (Enterprise Grade)',
      behavior: 'Decrements TTL, rewrites MAC header, and routes packet to the next-hop gateway on Subnet B.',
    },
    {
      id: 'wap',
      name: 'Wireless Access Point (WAP)',
      layer: 'Layer 2 (Data Link)',
      pdu: 'Frames (802.11 <-> 802.3)',
      collisionDomain: 'Shared RF Medium (Half-Duplex CSMA/CA)',
      broadcastDomain: '1 Shared with connected switch VLAN',
      desc: 'Transceiver that bridges wireless radio signals (Wi-Fi 6) to the wired Ethernet backbone switch via PoE Category 6 cabling.',
      role: 'Enables mobile laptops, smartphones, and tablets to access enterprise local and cloud services.',
      priceRange: '₹6,000 – ₹25,000 (Dual-Band PoE+)',
      behavior: 'Converts 802.11 Wi-Fi radio frame into 802.3 Ethernet frame and passes to PoE switch.',
    },
    {
      id: 'firewall',
      name: 'Hardware Firewall / NGFW',
      layer: 'Layer 3 to 7 (Multilayer)',
      pdu: 'Packets / Sessions / Payloads',
      collisionDomain: '1 Dedicated per interface',
      broadcastDomain: 'Isolates Untrusted WAN from Trusted LAN',
      desc: 'Dedicated perimeter security appliance performing stateful packet inspection, deep packet inspection (DPI), and intrusion prevention (IPS).',
      role: 'Blocks malicious incoming probes, filters unauthorized ports, and terminates secure IPSec VPN tunnels.',
      priceRange: '₹45,000 – ₹5,00,000+ (FortiGate / Cisco Firepower)',
      behavior: 'Inspects packet payload against Threat Database -> Passes clean packet; Drops malicious exploit.',
    },
  ];

  const currentComp = componentsList.find((c) => c.id === activeComponentId) || componentsList[1];

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
      title: '1. Precision Foundry Switch Modernization (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Engineer - Barrackpore)',
      desc: 'Debangshu upgraded an industrial plant in Barrackpore from legacy unmanaged hubs to two 24-port Gigabit Managed Layer-2 Switches (₹70,000 total). This eliminated packet collisions, boosted production ERP throughput by 400%, and enabled port-level security.',
      lesson: 'Replacing broadcast hubs with managed switches eliminates network congestion instantly.',
    },
    {
      title: '2. Diagnostic Clinic Hardware & PoE Setup (Mahima)',
      lead: 'Mahima (Healthcare Network Director - Ichapur)',
      desc: 'Mahima installed a high-speed networking rack with an enterprise router (₹25,000), a 16-port PoE+ Switch (₹32,000), and three ceiling-mounted Wi-Fi 6 APs (₹45,000) in Ichapur, powering diagnostic lab monitors without separate electrical conduits.',
      lesson: 'PoE switches deliver power and gigabit data over a single Cat6 cable, slashing electrical costs.',
    },
    {
      title: '3. Multi-Department College Computer Lab Grid (Mamata)',
      lead: 'Mamata (Academic IT Administrator - Kolkata)',
      desc: 'Mamata configured a 48-port Layer-3 Multilayer Switch (₹85,000) with Cat6 structured cabling and patch panels in Kolkata, isolating Accounts, Exam Cell, and Student Labs into distinct VLANs with wire-speed inter-VLAN routing.',
      lesson: 'Layer-3 switches route inter-departmental traffic locally without creating router bottlenecks.',
    },
    {
      title: '4. Educational High-Tech Lab Optical Fiber Backbone (Abhronila)',
      lead: 'Abhronila (Research IT Specialist - Jadavpur)',
      desc: 'Abhronila deployed 10G SFP+ optical fiber transceivers (₹18,000/pair) with OM4 multi-mode fiber cabling in Jadavpur, connecting high-performance computing clusters to central storage SANs with sub-millisecond latency.',
      lesson: 'SFP+ fiber transceivers provide modular, future-proof multi-gigabit throughput.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes compGlow22 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-comp22 {
          animation: compGlow22 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 22
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Basic Networking Components • Hardware • Media • Pricing in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Basic Networking Components
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Computer Network Hardware & Infrastructure Components</span>: understanding End Devices, Hubs, Switches, Routers, Access Points, Firewalls, Transmission Media, and connector standards with capital budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'components-overview', label: '1. Hardware Taxonomy' },
              { id: 'interactive-inspector', label: '2. Component Inspector Studio' },
              { id: 'layer-mapping', label: '3. Layer & Domain Mapping' },
              { id: 'svg-ecosystem', label: '4. Network Ecosystem SVG' },
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

        {/* SECTION 1: Hardware Taxonomy */}
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
                Taxonomy of Networking Hardware Components
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Modern computer networks are constructed by orchestrating four essential categories of hardware. Understanding the role, OSI layer placement, and transmission unit (bits, frames, or packets) of each component is vital for cybersecurity defense, network design, and troubleshooting.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. End Devices (Hosts)</span>
                <p className="text-slate-300 text-xs">Desktops, Servers, Laptops, VoIP Phones, IP Cameras, and IoT Sensors.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Intermediary Devices</span>
                <p className="text-slate-300 text-xs">Switches, Routers, Hubs, WAPs, Firewalls, Modems, and Gateways.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Network Interfaces</span>
                <p className="text-slate-300 text-xs">NICs (48-bit MAC Address), SFP+ Fiber Transceivers, and Media Converters.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Transmission Media</span>
                <p className="text-slate-300 text-xs">Cat6/6a UTP Copper (RJ-45), Optical Fiber (Single/Multi-Mode), Patch Panels.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Component Inspector Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-comp22">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Network Hardware Inspector Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a hardware component to inspect its OSI layer, PDU, collision/broadcast domain isolation, pricing in <span className="text-emerald-400 font-bold">₹</span>, and operational behavior:
            </p>

            {/* Component Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {componentsList.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => {
                    setActiveComponentId(comp.id);
                    setPacketActionMessage(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    activeComponentId === comp.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {comp.name}
                </button>
              ))}
            </div>

            {/* Active Component Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">
                  {currentComp.name} — <span className="text-sky-400 font-mono">{currentComp.layer}</span>
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Cost: {currentComp.priceRange}
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{currentComp.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Protocol Data Unit (PDU):</span>
                  <span className="text-sky-300 font-bold">{currentComp.pdu}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Collision Domain:</span>
                  <span className="text-amber-300 font-bold">{currentComp.collisionDomain}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Broadcast Domain:</span>
                  <span className="text-rose-300 font-bold">{currentComp.broadcastDomain}</span>
                </div>
              </div>

              {/* Packet Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    📡 Simulate Data Forwarding Action:
                  </span>
                  <button
                    onClick={() => setPacketActionMessage(currentComp.behavior)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Send Packet Through {currentComp.name.split(' ')[0]} ▶
                  </button>
                </div>

                {packetActionMessage && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    ⚡ <strong>Forwarding Trace:</strong> {packetActionMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Layer & Domain Mapping */}
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
                Component OSI Layer & Domain Isolation Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Component</th>
                    <th className="p-2.5 text-sky-400">OSI Layer</th>
                    <th className="p-2.5 text-indigo-400">PDU</th>
                    <th className="p-2.5 text-amber-400">Collision Domain</th>
                    <th className="p-2.5 text-rose-400">Broadcast Domain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Hub / Repeater</td>
                    <td className="p-2.5 text-sky-300">Layer 1 (Physical)</td>
                    <td className="p-2.5 text-indigo-300">Bits</td>
                    <td className="p-2.5 text-rose-400 font-bold">1 Shared (Collisions)</td>
                    <td className="p-2.5 text-amber-300">1 Shared</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 2 Switch</td>
                    <td className="p-2.5 text-sky-300">Layer 2 (Data Link)</td>
                    <td className="p-2.5 text-indigo-300">Frames</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1 Per Port (Isolated)</td>
                    <td className="p-2.5 text-amber-300">1 Shared per VLAN</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 3 Switch</td>
                    <td className="p-2.5 text-sky-300">Layer 2 & 3</td>
                    <td className="p-2.5 text-indigo-300">Frames / Packets</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1 Per Port (Isolated)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Isolated per VLAN</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Network Router</td>
                    <td className="p-2.5 text-sky-300">Layer 3 (Network)</td>
                    <td className="p-2.5 text-indigo-300">Packets</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1 Per Interface</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Isolated per Subnet</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Hardware Firewall</td>
                    <td className="p-2.5 text-sky-300">Layer 3 – 7</td>
                    <td className="p-2.5 text-indigo-300">Packets / Payloads</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1 Per Interface</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Security Boundary</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Network Ecosystem SVG */}
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
                Multi-Layer Network Component Ecosystem Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* End Devices */}
                <rect x="20" y="20" width="140" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="90" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. End Devices</text>
                <text x="90" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">PCs, Servers, VoIP Phones</text>

                <line x1="160" y1="50" x2="200" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Layer 2 Switch */}
                <rect x="200" y="20" width="150" height="60" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="275" y="45" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">2. Layer 2 Switch</text>
                <text x="275" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">MAC Table • Port Isolation</text>

                <line x1="350" y1="50" x2="390" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Layer 3 Router */}
                <rect x="390" y="20" width="150" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="465" y="45" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">3. Layer 3 Router</text>
                <text x="465" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">IP Routing • Subnet Isolation</text>

                <line x1="540" y1="50" x2="580" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Firewall & Internet */}
                <rect x="580" y="20" width="140" height="60" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="650" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Firewall / WAN</text>
                <text x="650" y="65" fill="#a7f3d0" fontSize="8" textAnchor="middle">Perimeter Defense • ISP ONT</text>

                {/* Bottom Media Bar */}
                <rect x="20" y="110" width="700" height="85" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="135" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  TRANSMISSION MEDIA & STRUCTURED CABLING BACKBONE
                </text>
                <text x="370" y="155" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Cat6/Cat6a Copper (1Gbps/10Gbps RJ-45) • OM4 Multi-Mode & OS2 Single-Mode Fiber (10G/40G SFP+)
                </text>
                <text x="370" y="175" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Patch Panels (MDF / IDF) • Power over Ethernet (PoE 802.3at/bt) • UPS Battery Backups
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
                Bengal Operations & Enterprise Hardware Case Studies
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
                  trap: 'Confusing Hubs with Switches and Assuming Both Are Identical',
                  fix: 'Hubs operate at Layer 1 and broadcast all bits to all ports (causing packet collisions); switches operate at Layer 2 and forward frames selectively by MAC address.',
                },
                {
                  trap: 'Exceeding the 100-Meter Distance Limit for Copper Twisted-Pair Cables',
                  fix: 'Category 6 Ethernet cables suffer excessive signal attenuation beyond 100 meters (90m solid in-wall + 10m patch cords). Use optical fiber or repeaters for longer runs.',
                },
                {
                  trap: 'Connecting Switch Ports Directly to Wall Jacks Without Patch Panels',
                  fix: 'Direct cabling causes mechanical strain and port breakage. Always terminate solid in-wall copper into rack patch panels first, using flexible patch cords for switch connections.',
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
                  Think of networking components like postal logistics: the NIC is your home mailbox, the Switch is the local neighborhood sorting room, the Router is the national postal highway, and the Firewall is the security inspection checkpoint!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how a Layer 2 switch isolates collision domains to each port, but still forwards broadcast frames (FF:FF:FF:FF:FF:FF) to everyone until a Router blocks it!
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
                Student Revision Checklist (Topic 22)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Differentiated between End Devices and Intermediary Connecting Hardware',
                'Explained the operational contrast between Hubs, Switches, and Routers',
                'Mapped each component to its corresponding OSI Layer and PDU (Bits/Frames/Packets)',
                'Understood Collision Domain vs Broadcast Domain isolation boundaries',
                'Mastered copper Cat6 (RJ-45) and fiber optic (SFP/LC) cable standards',
                'Formulated realistic hardware procurement budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Mastering physical networking hardware forms the bedrock of both computer network administration and cyber security defense. In our next topic (Topic 23), we will explore Servers in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Basic Networking Components FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Basic Networking Components"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic23_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic22;
