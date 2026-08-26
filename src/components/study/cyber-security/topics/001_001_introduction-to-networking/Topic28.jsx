// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic28.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 28: MAC Address

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic28_files/topic28_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic28_files/topic28_note.txt?raw';

const Topic28 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedMacId, setSelectedMacId] = useState('unicast');
  const [camLearningLog, setCamLearningLog] = useState(null);

  const macProfiles = [
    {
      id: 'unicast',
      name: 'Unicast Vendor Hardware MAC',
      mac: '00:1A:2B:3C:4D:5E',
      firstOctetBin: '00000000',
      igBit: '0 (Unicast / Individual Host)',
      ulBit: '0 (Globally Unique IEEE OUI)',
      ouiVendor: '00:1A:2B — Intel Corporation',
      deviceSerial: '3C:4D:5E — NIC Physical Serial',
      desc: 'Standard physical burned-in hardware address (BIA) on desktop and server NICs.',
      camSimulation: 'Frame enters Switch Port 1 -> Switch learns [00:1A:2B:3C:4D:5E -> Port 1, VLAN 10] with 300s aging timer.',
    },
    {
      id: 'randomized',
      name: 'Locally Administered Randomized MAC (LAA)',
      mac: 'DA:A1:19:67:89:BC',
      firstOctetBin: '11011010',
      igBit: '0 (Unicast)',
      ulBit: '1 (Locally Administered / Randomized)',
      ouiVendor: 'None (Generated in RAM by iOS / Android / Windows)',
      deviceSerial: 'A1:19:67:89:BC — Ephemeral Pseudorandom Hash',
      desc: 'Mobile privacy MAC address generated dynamically to defeat Wi-Fi location tracking across public venues.',
      camSimulation: 'Smartphone connects to Campus Wi-Fi -> Switch records randomized LAA MAC on Port 24 (AP Trunk).',
    },
    {
      id: 'multicast',
      name: 'IPv4 Multicast Group MAC',
      mac: '01:00:5E:00:00:05',
      firstOctetBin: '00000001',
      igBit: '1 (Multicast / Group Address)',
      ulBit: '0 (Globally Unique IANA Prefix)',
      ouiVendor: '01:00:5E — IANA IPv4 Multicast Block',
      deviceSerial: '00:00:05 — Maps to OSPF Multicast 224.0.0.5',
      desc: 'Layer 2 multicast destination frame delivered simultaneously to all subscribed router nodes.',
      camSimulation: 'Switch inspects IGMP Snooping table -> Forwards multicast stream only to subscribed router ports.',
    },
    {
      id: 'broadcast',
      name: 'Universal Broadcast MAC',
      mac: 'FF:FF:FF:FF:FF:FF',
      firstOctetBin: '11111111',
      igBit: '1 (Broadcast to All Stations)',
      ulBit: '1 (Universal All-Ones Mask)',
      ouiVendor: 'Universal Broadcast (All 48 bits = 1)',
      deviceSerial: 'FF:FF:FF — Reaches Every Host on LAN',
      desc: 'Special address for ARP Requests (Who has 192.168.1.1?) and DHCP Discover broadcasts.',
      camSimulation: 'Switch receives broadcast on Port 3 -> Copies & floods frame to Ports 1, 2, 4, 5... on VLAN 10.',
    },
  ];

  const currentMac = macProfiles.find((m) => m.id === selectedMacId) || macProfiles[0];

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
      title: '1. Precision Foundry Switch Port Security Lockdown (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu configured `switchport port-security maximum 1` and `mac-address sticky` across 48 managed switch ports in Barrackpore for ₹42,000. When an unauthorized laptop was attached, the port immediately shut down, preventing rogue device access to factory telemetry.',
      lesson: 'Port security with sticky MAC binding stops unauthorized physical device attachments.',
    },
    {
      title: '2. Diagnostic Clinic Medical Cart Dynamic MAC VLANs (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima configured 802.1X MAC Authentication Bypass (MAB) on diagnostic carts in Ichapur. The RADIUS server identifies medical device MAC OUIs, automatically assigning them to an isolated HIPAA-compliant VLAN without manual configuration.',
      lesson: 'MAC Authentication Bypass (MAB) automatically classifies IoT medical carts into secure VLANs.',
    },
    {
      title: '3. University Campus Public Wi-Fi MAC Randomization (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata configured the campus captive portal in Kolkata to support iOS/Android private MAC randomization. The system authenticates students via 802.1X user credentials rather than hardware MACs, protecting student privacy across university grounds.',
      lesson: 'Modern enterprise networks authenticate users via 802.1X rather than unverified MAC filters.',
    },
    {
      title: '4. High-Tech Cyber Lab MAC Flooding & DAI Defense (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila simulated a MAC flooding attack (100,000 fake MACs) in Jadavpur using `macof`. Managed core switches equipped with Dynamic ARP Inspection (DAI) and Port Security blocked the overflow in 12ms, preventing CAM exhaustion and packet sniffing.',
      lesson: 'Port security limits active MACs per port, neutralizing CAM table exhaustion attacks instantly.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes macPulse28 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-mac28 {
          animation: macPulse28 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 28
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              MAC Address • OUI Anatomy • Switch CAM Tables • Port Security in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            MAC Address
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Media Access Control (MAC) Physical Addressing</span>: dissecting 48-bit hardware structures (OUI vs Device ID), I/G and U/L bit flags, switch CAM table learning algorithms, MAC flooding defense, and port security budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'mac-foundations', label: '1. MAC Architecture' },
              { id: 'interactive-studio', label: '2. MAC & CAM Studio' },
              { id: 'cam-mechanics', label: '3. CAM Table Mechanics' },
              { id: 'svg-anatomy', label: '4. 48-Bit Binary SVG' },
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

        {/* SECTION 1: MAC Foundations */}
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
                What is a MAC Address?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Media Access Control (MAC) Address</strong>—also termed a Physical Address, Hardware Address, or Burned-In Address (BIA)—is a globally unique 48-bit (6-byte) hexadecimal identifier etched into the non-volatile EEPROM silicon of every Network Interface Card (NIC). Operating at <strong className="text-indigo-400">OSI Layer 2 (Data Link Layer)</strong>, it provides flat, link-local physical addressing to deliver Ethernet frames across a local switch fabric.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. 24-Bit Vendor OUI</span>
                <p className="text-slate-300 text-xs">First 3 octets assigned by IEEE Registration Authority to hardware manufacturers.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. 24-Bit Device Serial</span>
                <p className="text-slate-300 text-xs">Last 3 octets assigned by the manufacturer as a unique hardware serial.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Switch CAM Lookup</span>
                <p className="text-slate-300 text-xs">Switches learn source MACs dynamically to direct frames without flooding.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Port Security Lock</span>
                <p className="text-slate-300 text-xs">Enforces maximum 1 MAC per switch port, neutralizing MAC flooding attacks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MAC & CAM Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-mac28">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive MAC Address Bit-Level Inspector & CAM Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a MAC address category to inspect first-octet binary flags (I/G and U/L bits), OUI vendor lookup, and switch CAM table learning trace:
            </p>

            {/* MAC Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {macProfiles.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMacId(m.id);
                    setCamLearningLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedMacId === m.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {m.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active MAC Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentMac.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-600">
                  MAC: {currentMac.mac}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">First Octet Binary:</span>
                  <span className="text-sky-300 font-bold">{currentMac.firstOctetBin}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">I/G Bit 0 (Unicast/Multicast):</span>
                  <span className="text-amber-300 font-bold">{currentMac.igBit}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">U/L Bit 1 (Global/Local):</span>
                  <span className="text-purple-300 font-bold">{currentMac.ulBit}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">24-Bit OUI Vendor Match:</span>
                  <span className="text-slate-200">{currentMac.ouiVendor}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">24-Bit Device Serial:</span>
                  <span className="text-slate-200">{currentMac.deviceSerial}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Simulate Switch CAM Table Learning & Forwarding:
                  </span>
                  <button
                    onClick={() => setCamLearningLog(currentMac.camSimulation)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Ingest Frame into Switch ▶
                  </button>
                </div>

                {camLearningLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    📦 <strong>Switch CAM Table Action:</strong> {camLearningLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CAM Table Mechanics */}
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
                Switch CAM Table Learning & Cyber Security Defenses
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">Switch CAM Learning Lifecycle:</span>
                <p className="text-slate-300 text-xs">• 1. Reads Source MAC of incoming frame to update `[MAC &rarr; Port]` table.</p>
                <p className="text-slate-300 text-xs">• 2. Looks up Destination MAC; forwards point-to-point if learned.</p>
                <p className="text-slate-300 text-xs">• 3. Unknown unicast frames are flooded out of all active VLAN ports.</p>
                <p className="text-slate-300 text-xs">• 4. Unused dynamic entries age out after 300 seconds (5 minutes).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-purple-300 font-sans font-bold">Cyber Security Countermeasures:</span>
                <p className="text-slate-300 text-xs">• Switch Port Security (`maximum 1`) stops MAC flooding CAM exhaustion.</p>
                <p className="text-slate-300 text-xs">• Dynamic ARP Inspection (DAI) blocks malicious MAC spoofing on the wire.</p>
                <p className="text-slate-300 text-xs">• IEEE 802.1AE MACsec encrypts frames at Layer 2 with AES-256 GCM.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: 48-Bit Binary SVG */}
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
                48-Bit MAC Address Binary Architecture & Switch CAM Flow
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 24-Bit OUI Vendor */}
                <rect x="20" y="20" width="340" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="190" y="42" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ORGANIZATIONALLY UNIQUE IDENTIFIER (OUI)
                </text>
                <text x="190" y="58" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  First 24 Bits (3 Octets: 00:1A:2B) • Assigned by IEEE
                </text>
                <text x="190" y="73" fill="#fde68a" fontSize="8" textAnchor="middle">
                  Bit 0: Unicast/Multicast (I/G) • Bit 1: Global/Local (U/L)
                </text>

                {/* 24-Bit Device Serial */}
                <rect x="380" y="20" width="340" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="550" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  VENDOR-ASSIGNED DEVICE SERIAL
                </text>
                <text x="550" y="58" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Last 24 Bits (3 Octets: 3C:4D:5E) • Unique NIC Serial
                </text>
                <text x="550" y="73" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                  Burned into EEPROM (BIA) • 16.7 Million Unique IDs per OUI
                </text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  LAYER 2 SWITCHING: SOURCE MAC LEARNING & DESTINATION CAM LOOKUP
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Rewritten at every router hop (Source = Outgoing Router MAC, Dest = Next Hop MAC) • IP addresses stay constant
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Switch Port Security (`maximum 1`) • Sticky MAC Learning • Dynamic ARP Inspection (DAI)
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
                Bengal Operations & MAC Address Case Studies
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
                  trap: 'Assuming MAC Addresses Remain the Same Across the Entire Internet Journey',
                  fix: 'MAC addresses are stripped and rewritten at every intermediate router hop. Only Layer 3 source and destination IP addresses remain constant end-to-end.',
                },
                {
                  trap: 'Relying Solely on MAC Whitelist Filtering for Wi-Fi Security',
                  fix: 'Wireless MAC addresses are transmitted in plaintext over the air. Attackers can sniff authorized MACs with Wireshark and spoof them in seconds. Always mandate WPA3-Enterprise.',
                },
                {
                  trap: 'Leaving Managed Switch Ports Open Without Port Security',
                  fix: 'Without port security (`switchport port-security maximum 1`), an attacker running `macof` can flood 100,000 fake MACs, turning the switch into a broadcast hub and sniffing all LAN packets.',
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
                  Think of a MAC address like the license plate on a delivery truck: it gets you through local neighborhood toll gates (switches), but at every state checkpoint (router), a new local carrier picks up the package!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how modern smartphones display randomized MAC addresses (e.g. starting with x2, x6, xA, xE) when connecting to public Wi-Fi networks in Kolkata!
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
                Student Revision Checklist (Topic 28)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Decomposed a 48-bit MAC address into 24-bit OUI and 24-bit Device Serial',
                'Explained the I/G (Unicast/Multicast) and U/L (Global/Local) bit flags in Octet 1',
                'Mastered switch CAM table learning, forwarding, and unknown unicast flooding',
                'Differentiated between Physical BIA in ROM and Spoofed/Randomized MAC in RAM',
                'Understood MAC Flooding attacks, Switch Port Security, and Dynamic ARP Inspection',
                'Formulated managed switch and enterprise security budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: MAC addressing forms the physical bedrock of all local network switching. In our next topic (Topic 29), we will explore IP Addresses in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="MAC Address FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="MAC Addresses in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic29_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic28;
