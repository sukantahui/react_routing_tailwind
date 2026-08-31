// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic38.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 38: Real-life Networking Examples

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic38_files/topic38_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic38_files/topic38_note.txt?raw';

const Topic38 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedNetworkId, setSelectedNetworkId] = useState('enterprise-campus');
  const [packetTraceLog, setPacketTraceLog] = useState(null);

  const realLifeNetworks = [
    {
      id: 'enterprise-campus',
      name: 'Enterprise 3-Tier Campus Network (Core/Dist/Access)',
      scope: 'Corporate Headquarters in Kolkata (3 Buildings, 1,200 Endpoints)',
      hopsTrace: 'PC (Access 802.1X) ➔ L3 Distribution (VLAN Routing) ➔ 100G Fiber Core ➔ Dual NGFW ➔ ISP BGP',
      bandwidthLatency: '10 Gbps Backbone • &lt; 0.8 ms Intra-Campus Latency • 99.999% SLA',
      redundancyTech: 'VRRP Default Gateway + LACP Port-Channels + Dual BGP Internet Leased Lines',
      securityLayer: '802.1X RADIUS + DHCP Snooping + Dynamic ARP Inspection + Layer 7 NGFW',
      estHardwareBudget: '₹2,40,000 (Cisco Catalyst 9300 Core Stack & PoE Switches)',
      desc: 'Modular enterprise architecture serving administrative workstations, Wi-Fi 6 APs, and server clusters.',
      traceSimulation: 'Client PC (10.0.1.50) → 802.1X Auth OK → Switch Port-Channel (LACP) → Core VRRP Master → Dual ISP BGP → 0 Packet Drops.',
    },
    {
      id: 'ftth-smart-home',
      name: 'Residential Smart Home & FTTH Optical Broadband',
      scope: 'Smart Residence in Barrackpore (25 Smart IoT & Streaming Devices)',
      hopsTrace: 'ISP Central Office OLT ➔ 1:64 Optical Splitter ➔ Home ONT ➔ Wi-Fi 6 Router (WPA3) ➔ Smart TVs/Phones',
      bandwidthLatency: '300 Mbps Symmetric Fiber • 3.2 ms RTT to Regional IXP • 99.5% SLA',
      redundancyTech: 'GPON Automatic Laser Power Control + Dynamic Bandwidth Allocation (DBA)',
      securityLayer: 'WPA3 Personal Encryption + Isolated Guest Wi-Fi SSID + SPI Firewall + DDNS',
      estHardwareBudget: '₹14,500 (GPON ONT Modem + Dual-Band Wi-Fi 6 Gigabit Router)',
      desc: 'High-speed fiber-to-the-home broadband streaming 4K HDR video and controlling automated Zigbee smart lights.',
      traceSimulation: 'Phone sends 4K stream request → Wi-Fi 6 OFDMA → Home ONT → 1490nm Downstream Optical Pulses → Smooth playback at 300 Mbps.',
    },
    {
      id: 'cloud-cdn-streaming',
      name: 'Global E-Commerce & Video Streaming CDN Fabric',
      scope: 'High-Traffic Web & Streaming Portal (500,000 Concurrent Bengal Users)',
      hopsTrace: 'User Browser ➔ BGP Anycast DNS ➔ Cloudflare Edge Cache (Kolkata IXP) ➔ NGINX L7 ALB ➔ K8s Pods',
      bandwidthLatency: '100 Gbps Aggregate Ingress • &lt; 4 ms Edge Response • 99.99% SLA',
      redundancyTech: 'BGP Anycast Multi-Region Failover + Kubernetes Auto-Scaling Pod Replicas',
      securityLayer: 'Cloud WAF (DDoS Scrubbing) + TLS 1.3 Key Exchange + Bot Protection',
      estHardwareBudget: '₹1,65,000 / month (Cloud CDN, WAF & Managed K8s Cluster)',
      desc: 'Global cloud edge architecture delivering instantaneous page loads during festive e-commerce flash sales.',
      traceSimulation: 'Browser requests video chunk → BGP Anycast routes to Kolkata IXP Edge Cache → Cache Hit (98.4%) → Video served in 3.8 ms.',
    },
    {
      id: 'municipal-cctv-ring',
      name: 'Municipal Smart City 4K CCTV Industrial Fiber Ring',
      scope: 'Urban Traffic Command Center in Jadavpur (20 4K ANPR Cameras)',
      hopsTrace: '4K ANPR IP Camera (PoE+) ➔ Outdoor Ruggedized Switch ➔ G.8032 ERPS Fiber Ring ➔ Police Command NVR',
      bandwidthLatency: '10 Gbps Industrial Ring • &lt; 1.5 ms Video Latency • &lt; 35 ms Ring Healing',
      redundancyTech: 'ITU-T G.8032 Ethernet Ring Protection Switching (ERPS) Fiber Ring',
      securityLayer: 'MAC Address Port Security + Video VLAN Isolation + IP67 Weatherproof Enclosures',
      estHardwareBudget: '₹4,80,000 (10 Outdoor Industrial PoE Switches + 20 4K ANPR Cameras)',
      desc: 'Fault-tolerant municipal surveillance ring recording vehicle license plates continuously across major road intersections.',
      traceSimulation: 'Fiber cut simulated between Pole 4 and Pole 5 → G.8032 ERPS unblocks Ring Protection Link in 28ms → Zero video frames lost.',
    },
  ];

  const currentNetwork = realLifeNetworks.find((n) => n.id === selectedNetworkId) || realLifeNetworks[0];

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
      title: '1. Precision Foundry Campus Core Switch & LACP Trunking (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu upgraded factory network infrastructure in Barrackpore with dual Cisco Catalyst 9300 core switches and 4-port 10G LACP aggregated trunks for ₹2,40,000. Shop-floor CNC machine telemetry and automated robotic quality control cameras now operate with zero packet drops and < 0.8 ms latency.',
      lesson: 'Core-Distribution-Access hierarchy with LACP link bundling eliminates local bottlenecks in industrial plants.',
    },
    {
      title: '2. Diagnostic Clinic Dual-ISP BGP Multi-Homing & VRRP (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed dual Internet leased lines (Airtel and Tata) with BGP multi-homing and VRRP gateway redundancy in Ichapur for ₹1,85,000. When a local road-widening project cut the primary fiber cable, hospital telemedicine video calls failed over to the secondary link in 1.4 seconds.',
      lesson: 'Dual-ISP multi-homing with VRRP guarantees uninterrupted high availability for mission-critical healthcare.',
    },
    {
      title: '3. University Campus Wi-Fi 6 & 802.1X NAC Network (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed 60 enterprise Wi-Fi 6 Access Points and 802.1X RADIUS authentication in Kolkata for ₹3,50,000. Over 3,500 concurrent students access digital library resources with WPA3 Enterprise encryption, while visitor devices are automatically isolated into an OTP-verified guest VLAN.',
      lesson: '802.1X network access control with WPA3 Enterprise provides scalable security for dense campus wireless environments.',
    },
    {
      title: '4. Municipal Smart City CCTV Industrial Fiber Ring (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila engineered a 10-node industrial outdoor G.8032 ERPS optical fiber ring in Jadavpur for ₹4,80,000. Connecting 20 4K ANPR traffic cameras to ruggedized PoE+ switches, the network heals optical fiber cuts in under 35 milliseconds, ensuring continuous traffic monitoring.',
      lesson: 'G.8032 ERPS industrial rings provide sub-50ms fault recovery for outdoor smart municipal infrastructure.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes realPulse38 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-real38 {
          animation: realPulse38 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 38
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Real-life Networking Examples • FTTH • Enterprise LAN • Cloud CDN & Municipal CCTV in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Real-life Networking Examples
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Real-Life Networking Implementations & Operational Architectures</span>: mastering residential FTTH GPON broadband, enterprise 3-tier Core/Distribution campus LANs, global cloud CDN streaming fabrics, smart city municipal G.8032 ERPS CCTV rings, and hardware sizing in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'top-foundations', label: '1. Top Real-Life Topologies' },
              { id: 'interactive-studio', label: '2. Scenario Simulator' },
              { id: 'url-journey', label: '3. 7-Step URL Packet Journey' },
              { id: 'svg-multitier', label: '4. Multi-Tier Real-Life SVG' },
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

        {/* SECTION 1: Top Real-Life Topologies */}
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
                Where is Computer Networking Used in Real Life?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every digital interaction in modern society—from streaming video on a smart TV in Barrackpore to executing automated stock trades in Kolkata—relies on carefully architected real-life networking paradigms. Understanding how protocols, physical cables, routing tables, and security policies combine into robust systems is the essence of professional network engineering.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Residential FTTH</span>
                <p className="text-slate-300 text-xs">GPON optical splitters and Wi-Fi 6 gigabit routers powering modern smart homes.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. 3-Tier Enterprise</span>
                <p className="text-slate-300 text-xs">Core-Distribution-Access hierarchy delivering line-rate corporate switching.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Cloud CDN Streaming</span>
                <p className="text-slate-300 text-xs">BGP Anycast and local IXP edge caches serving millions of concurrent streams.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Smart CCTV Rings (₹)</span>
                <p className="text-slate-300 text-xs">Industrial G.8032 ERPS outdoor fiber rings with 35ms fault recovery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Scenario Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-real38">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Real-Life Network Simulator & Packet Trace Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a production real-life network topology to inspect hop traces, latency, bandwidth capacity, redundancy protocols, and simulated failover tests:
            </p>

            {/* Network Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {realLifeNetworks.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setSelectedNetworkId(n.id);
                    setPacketTraceLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedNetworkId === n.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {n.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Network Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentNetwork.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Infrastructure Budget: {currentNetwork.estHardwareBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Operational Deployment Scope:</span>
                <span className="text-sky-300 font-bold">{currentNetwork.scope}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">End-to-End Hop Journey:</span>
                <span className="text-slate-300">{currentNetwork.hopsTrace}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Bandwidth & Latency:</span>
                  <span className="text-emerald-300 font-bold" dangerouslySetInnerHTML={{ __html: currentNetwork.bandwidthLatency }} />
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Redundancy Mechanism:</span>
                  <span className="text-purple-300 font-bold">{currentNetwork.redundancyTech}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Security Boundary:</span>
                  <span className="text-rose-300 font-bold">{currentNetwork.securityLayer}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Production Packet Trace & Resiliency Simulation:
                  </span>
                  <button
                    onClick={() => setPacketTraceLog(currentNetwork.traceSimulation)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Run Real-World Packet Trace ▶
                  </button>
                </div>

                {packetTraceLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🌐 <strong>Production Telemetry Log:</strong> {packetTraceLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 7-Step URL Packet Journey */}
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
                The 7-Step End-to-End Packet Journey (Typing a URL in a Browser)
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Step Number</th>
                    <th className="p-2.5 text-sky-400">Protocol Involved</th>
                    <th className="p-2.5 text-emerald-400">Operational Function in Real Life</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Step 1: Network Init</td>
                    <td className="p-2.5 text-sky-300">DHCP (Port 67/68)</td>
                    <td className="p-2.5">Assigns client IP (10.0.1.50), subnet mask, default gateway, and DNS resolver</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Step 2: Layer 2 Resolution</td>
                    <td className="p-2.5 text-sky-300">ARP (0x0806)</td>
                    <td className="p-2.5">Broadcasts to find the physical MAC address of the local default gateway</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Step 3: Name Resolution</td>
                    <td className="p-2.5 text-sky-300">DNS (Port 53 UDP)</td>
                    <td className="p-2.5">Recursively resolves human domain (wb.gov.in) to 32-bit IPv4 address (103.25.10.4)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Step 4: Reliable Transport</td>
                    <td className="p-2.5 text-sky-300">TCP 3-Way Handshake</td>
                    <td className="p-2.5">SYN ➔ SYN-ACK ➔ ACK synchronizes sequence numbers on Port 443</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Step 5: Cryptographic Security</td>
                    <td className="p-2.5 text-sky-300">TLS 1.3 Handshake</td>
                    <td className="p-2.5">ECDHE Curve25519 derives symmetric AES-256 GCM session keys in 1-RTT</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Step 6: Content Fetching</td>
                    <td className="p-2.5 text-sky-300">HTTP/2 or HTTP/3</td>
                    <td className="p-2.5">Multiplexed GET request fetches HTML, CSS, JavaScript, and images</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Step 7: Render & Teardown</td>
                    <td className="p-2.5 text-sky-300">Browser DOM & TCP FIN</td>
                    <td className="p-2.5">DOM renders the visual page; 4-way FIN teardown cleanly closes socket</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Multi-Tier Real-Life SVG */}
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
                Multi-Tier Real-Life Network Architecture (Home ➔ Campus ➔ Cloud ➔ Core DC)
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Tier 1: Smart Home FTTH */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. SMART HOME (FTTH)</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">GPON ONT + Wi-Fi 6 Router</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">300 Mbps Optical Broadband</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 2: Enterprise Campus */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="280" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. ENTERPRISE CAMPUS</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Core-Distribution-Access</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">802.1X + VRRP + 10G LACP</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 3: Cloud CDN IXP */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="460" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">3. CLOUD CDN & IXP</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">BGP Anycast Edge Cache</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Sub-4ms Streaming Delivery</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 4: Core Data Center */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. CORE DATA CENTER</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Leaf-Spine 100G Fabric</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">K8s Pods & Sharded Databases</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  REAL-WORLD ARCHITECTURE: ZERO SINGLE POINTS OF FAILURE ➔ DUAL POWER, VRRP & DUAL BGP
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  FTTH GPON • 3-Tier Enterprise Campus Switching • G.8032 ERPS Smart City CCTV Rings • Anycast CDNs
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Dynamic ARP Inspection (DAI) • NetFlow Telemetry • Enterprise Core Switch Stacks (₹2,40,000)
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
                Bengal Operations & Real-Life Deployment Case Studies
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
                  trap: 'Deploying Unmanaged Switches in Environments Where Loops Can Be Accidentally Plugged',
                  fix: 'Unmanaged switches lack Spanning Tree Protocol, causing broadcast storms that freeze the network. Always deploy managed switches with RSTP/MSTP enabled.',
                },
                {
                  trap: 'Relying on a Single Router as a Single Point of Failure for Critical Services',
                  fix: 'A single router failure knocks out the entire organization. Configure First Hop Redundancy (VRRP/HSRP) across dual router gateways with dual ISP links.',
                },
                {
                  trap: 'Neglecting Clock Synchronization (NTP) Across Network Devices and Firewalls',
                  fix: 'Unsynchronized system clocks make it impossible to correlate forensic security logs during incident response. Configure all devices to sync with NTP servers.',
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
                  Think of the 7-step URL journey like calling an ambulance: you get an address (DHCP/ARP), dial the number (DNS), confirm the connection (TCP Handshake), verify patient identity (TLS), and transfer medical data (HTTP)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how G.8032 ERPS industrial fiber rings recover from physical cable breaks in under 35 milliseconds, ensuring municipal traffic surveillance cameras never lose a single frame!
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
                Student Revision Checklist (Topic 38)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped real-world FTTH, 3-tier enterprise campus, and cloud CDN streaming topologies',
                'Traced the 7-step end-to-end packet journey from DHCP/ARP to DNS, TCP, TLS 1.3, and HTTP',
                'Evaluated First Hop Redundancy Protocols (VRRP/HSRP) and Dual-ISP BGP multi-homing',
                'Analyzed Municipal G.8032 ERPS industrial fiber rings and Power over Ethernet (PoE+)',
                'Configured Layer-2 defenses (DHCP Snooping, Dynamic ARP Inspection, Port Security)',
                'Formulated realistic enterprise campus and smart city budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Real-life networking ties every protocol and cable into the heartbeat of modern society. In our next topic (Topic 39), we will explore Networking in Banking in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Real-life Networking Examples FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Real-life Networking Examples in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic39_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic38;
