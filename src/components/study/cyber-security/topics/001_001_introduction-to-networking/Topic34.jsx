// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic34.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 34: Frame

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic34_files/topic34_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic34_files/topic34_note.txt?raw';

const Topic34 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedFrameId, setSelectedFrameId] = useState('std-ipv4');
  const [frameDissectionLog, setFrameDissectionLog] = useState(null);

  const frameProfiles = [
    {
      id: 'std-ipv4',
      name: 'Standard IPv4 Untagged Frame (1518 Bytes)',
      type: 'Standard Access Port Frame',
      preambleSFD: '8 Bytes (7B Preamble + 1B SFD)',
      dstMac: '00:1A:2B:3C:4D:5E (Server NIC)',
      srcMac: 'D4:A1:19:88:22:11 (Client Gateway)',
      vlanTag: 'None (Untagged Access Port)',
      etherType: '0x0800 (IPv4 Internet Protocol)',
      payloadSize: '1500 Bytes (20B IP + 20B TCP + 1460B Data)',
      fcsCrc: '0x7F8E12A4 (32-Bit CRC Checksum Valid)',
      desc: 'Standard Ethernet frame transmitted across office access switches in Barrackpore.',
      switchAction: 'Switch reads Dest MAC 00:1A:2B:3C:4D:5E → Looks up CAM Table → Forwards out GigabitEthernet0/1.',
    },
    {
      id: 'vlan-tagged',
      name: 'IEEE 802.1Q Tagged Trunk Frame (1522 Bytes)',
      type: '802.1Q Trunk Carrier Frame',
      preambleSFD: '8 Bytes (Clock Sync)',
      dstMac: '00:00:0C:07:AC:01 (Core Router)',
      srcMac: '00:50:56:A1:B2:C3 (Healthcare VM)',
      vlanTag: 'TPID: 0x8100 • Priority: 5 (VoIP/Medical) • VLAN ID: 20',
      etherType: '0x0800 (Encapsulated IPv4)',
      payloadSize: '1500 Bytes (Protected Patient Record)',
      fcsCrc: '0x3D9B55C2 (CRC Validated across Tagged Frame)',
      desc: 'Multiplexed trunk frame carrying isolated hospital VLAN 20 traffic across Kolkata fiber backbone.',
      switchAction: 'Trunk port ingests frame → Preserves VLAN 20 tag → Forwards across inter-building optical fiber trunk.',
    },
    {
      id: 'arp-broadcast',
      name: 'ARP Address Resolution Broadcast Frame (64 Bytes)',
      type: 'Layer-2 Broadcast Frame',
      preambleSFD: '8 Bytes (Clock Sync)',
      dstMac: 'FF:FF:FF:FF:FF:FF (Universal Broadcast)',
      srcMac: '00:1A:2B:99:88:77 (Host Machine)',
      vlanTag: 'None',
      etherType: '0x0806 (Address Resolution Protocol)',
      payloadSize: '28 Bytes ARP Payload + 18 Bytes Padding = 46B Payload',
      fcsCrc: '0x12FA90B1 (CRC Validated)',
      desc: 'Broadcast request asking for the MAC address of 192.168.1.1, padded to reach the 64-byte minimum size.',
      switchAction: 'Switch receives broadcast on Port 4 → Copies and floods frame to Ports 1, 2, 3, 5, 6 on VLAN 10.',
    },
    {
      id: 'malformed-runt',
      name: 'Malformed Runt Collision Fragment (42 Bytes)',
      type: 'Corrupted Collision Fragment',
      preambleSFD: '8 Bytes',
      dstMac: '00:1A:2B:??:??:?? (Truncated Header)',
      srcMac: 'D4:A1:??:??:??:??',
      vlanTag: 'None',
      etherType: 'Unknown / Truncated',
      payloadSize: '16 Bytes (Fragmented during transmission)',
      fcsCrc: '0xBAD00000 (CRC-32 Checksum Failed)',
      desc: 'Corrupted fragment produced by a half-duplex cable collision or damaged RJ-45 connector.',
      switchAction: 'Switch ASIC detects frame size under 64 bytes and invalid FCS → Drops frame silently; increments Runt counter.',
    },
  ];

  const currentFrame = frameProfiles.find((f) => f.id === selectedFrameId) || frameProfiles[0];

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
      title: '1. Precision Foundry VLAN Hopping Mitigation (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu discovered double-tagging vulnerability risks in Barrackpore. Changed default native VLAN 1 to an isolated unused VLAN 999 and enabled `switchport nonegotiate` across 48 managed switch ports for ₹38,000, neutralizing VLAN hopping penetration attempts.',
      lesson: 'Changing the default native VLAN on switch trunks defeats double-tagging VLAN hopping attacks.',
    },
    {
      title: '2. Diagnostic Clinic 802.1Q Medical Cart VLAN Trunking (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima configured 802.1Q tagged VLAN trunks across hospital access switches in Ichapur for ₹52,000. X-ray telemetry frames are tagged with VLAN 20 and QoS Priority 5 (PCP), guaranteeing zero packet drop during simultaneous staff file downloads.',
      lesson: '802.1Q VLAN tagging isolates mission-critical medical telemetry from general hospital traffic.',
    },
    {
      title: '3. Financial Brokerage MACsec Layer-2 Frame Encryption (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata enabled IEEE 802.1AE MACsec hardware encryption on inter-building dark fiber switches in Kolkata for ₹85,000 in switch licenses. All Ethernet frames traversing underground campus conduits are encrypted with AES-256 GCM in hardware silicon.',
      lesson: 'MACsec hardware encryption secures all Ethernet frames directly on physical cables against wiretapping.',
    },
    {
      title: '4. Cyber Security Lab Wireshark CRC Error Auditing (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila investigated random packet drops on research switches in Jadavpur for ₹15,000 in fiber testing tools. Wireshark frame analysis revealed 12% FCS CRC errors caused by a bent patch cable; replacing the optical lead restored full 1 Gbps frame throughput.',
      lesson: 'Monitoring switch CRC/FCS error counters quickly identifies damaged physical copper and fiber cables.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes frmPulse34 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-frm34 {
          animation: frmPulse34 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 34
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Frame • IEEE 802.3 Anatomy • 802.1Q VLANs • MACsec in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Frame
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Data Link Layer (Layer 2) Framing Architecture</span>: dissecting the IEEE 802.3 frame structure, 4-byte 802.1Q VLAN tagging, CRC-32 Frame Check Sequence (FCS) verification, minimum 64-byte padding math, MACsec hardware encryption, and managed switch budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'frm-foundations', label: '1. Frame Foundations' },
              { id: 'interactive-studio', label: '2. Frame Inspector Studio' },
              { id: 'frame-structure', label: '3. IEEE 802.3 Anatomy' },
              { id: 'svg-layout', label: '4. 802.3 & VLAN SVG' },
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

        {/* SECTION 1: Frame Foundations */}
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
                What is a Data Link Frame?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Frame</strong> is the Protocol Data Unit (PDU) operating at <strong className="text-indigo-400">OSI Layer 2 (Data Link Layer)</strong>. It encapsulates Layer 3 IP packets with physical hardware addressing (Source and Destination MAC addresses), protocol type identification (EtherType), and an error-detecting Frame Check Sequence (FCS) trailer, delivering data reliably across physical cables between directly connected nodes on a local switch fabric.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. 14-Byte Header</span>
                <p className="text-slate-300 text-xs">Destination MAC (6B) + Source MAC (6B) + EtherType Protocol Tag (2B).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. 4-Byte 802.1Q Tag</span>
                <p className="text-slate-300 text-xs">Inserts TPID 0x8100 and 12-bit VLAN ID for isolated trunk multiplexing.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. 4-Byte CRC-32 FCS</span>
                <p className="text-slate-300 text-xs">Mathematical error-detecting trailer validating frame integrity on wire.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. 64B-1518B Range</span>
                <p className="text-slate-300 text-xs">Frames under 64B are dropped as Runts; frames over 1518B are Giants.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Frame Inspector Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-frm34">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Layer-2 Frame Inspector & VLAN Tagging Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select an Ethernet frame profile to inspect MAC headers, 802.1Q VLAN tags, EtherType fields, CRC-32 FCS validation, and simulated switch forwarding:
            </p>

            {/* Frame Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {frameProfiles.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFrameId(f.id);
                    setFrameDissectionLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedFrameId === f.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {f.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Frame Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentFrame.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-600">
                  Category: {currentFrame.type}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Destination MAC:</span>
                  <span className="text-sky-300 font-bold">{currentFrame.dstMac}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Source MAC:</span>
                  <span className="text-amber-300 font-bold">{currentFrame.srcMac}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">EtherType Protocol:</span>
                  <span className="text-emerald-300 font-bold">{currentFrame.etherType}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-300 font-sans font-bold">802.1Q VLAN Tag:</span>
                  <span className="text-slate-200">{currentFrame.vlanTag}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Payload Size:</span>
                  <span className="text-slate-200">{currentFrame.payloadSize}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans font-bold">FCS Trailer:</span>
                  <span className="text-slate-200">{currentFrame.fcsCrc}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Ingest Frame into Switch ASIC Pipeline:
                  </span>
                  <button
                    onClick={() => setFrameDissectionLog(currentFrame.switchAction)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Process Frame on Switch ▶
                  </button>
                </div>

                {frameDissectionLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    ⚙️ <strong>Switch CAM Forwarding Log:</strong> {frameDissectionLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Frame Structure */}
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
                IEEE 802.3 Ethernet Frame Field Breakdown
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Field Name</th>
                    <th className="p-2.5 text-sky-400">Length</th>
                    <th className="p-2.5 text-amber-400">Purpose & Bit Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Preamble & SFD</td>
                    <td className="p-2.5 text-sky-300">8 Bytes</td>
                    <td className="p-2.5">7B alternating 10101010 + 1B 10101011 (Clock Synchronization)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Destination MAC</td>
                    <td className="p-2.5 text-sky-300">6 Bytes (48 bits)</td>
                    <td className="p-2.5">Target physical interface (Unicast / Multicast / Broadcast)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Source MAC</td>
                    <td className="p-2.5 text-sky-300">6 Bytes (48 bits)</td>
                    <td className="p-2.5">Originating physical interface (Learned into Switch CAM Table)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">802.1Q Tag (Optional)</td>
                    <td className="p-2.5 text-purple-300">4 Bytes</td>
                    <td className="p-2.5">TPID 0x8100 + 3b Priority + 1b DEI + 12b VLAN ID (1–4094)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">EtherType / Length</td>
                    <td className="p-2.5 text-sky-300">2 Bytes</td>
                    <td className="p-2.5">Protocol tag: 0x0800 (IPv4), 0x86DD (IPv6), 0x0806 (ARP)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Payload / Data</td>
                    <td className="p-2.5 text-emerald-300">46 – 1500 Bytes</td>
                    <td className="p-2.5">Layer 3 IP Packet (Padded with zeros if under 46 bytes)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Frame Check Seq (FCS)</td>
                    <td className="p-2.5 text-rose-300 font-bold">4 Bytes</td>
                    <td className="p-2.5">CRC-32 Error detection trailer computed over MACs through Payload</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: 802.3 & VLAN SVG */}
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
                IEEE 802.3 Ethernet Frame Architecture with 802.1Q VLAN Tag
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Preamble */}
                <rect x="20" y="20" width="80" height="70" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="60" y="45" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">PREAMBLE</text>
                <text x="60" y="60" fill="#cbd5e1" fontSize="7" textAnchor="middle">8 Bytes (Sync)</text>

                {/* Dest MAC */}
                <rect x="105" y="20" width="95" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="152" y="45" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">DEST MAC</text>
                <text x="152" y="60" fill="#cbd5e1" fontSize="7" textAnchor="middle">6 Bytes (48b)</text>

                {/* Src MAC */}
                <rect x="205" y="20" width="95" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="252" y="45" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">SRC MAC</text>
                <text x="252" y="60" fill="#cbd5e1" fontSize="7" textAnchor="middle">6 Bytes (48b)</text>

                {/* 802.1Q VLAN */}
                <rect x="305" y="20" width="85" height="70" rx="6" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="347" y="45" fill="#d8b4fe" fontSize="9" fontWeight="bold" textAnchor="middle">802.1Q TAG</text>
                <text x="347" y="60" fill="#cbd5e1" fontSize="7" textAnchor="middle">4B (VLAN 20)</text>

                {/* EtherType */}
                <rect x="395" y="20" width="75" height="70" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
                <text x="432" y="45" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">TYPE</text>
                <text x="432" y="60" fill="#cbd5e1" fontSize="7" textAnchor="middle">2B (0x0800)</text>

                {/* Payload */}
                <rect x="475" y="20" width="165" height="70" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="557" y="45" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">DATA PAYLOAD</text>
                <text x="557" y="60" fill="#cbd5e1" fontSize="7" textAnchor="middle">46 – 1500 Bytes (IP Packet)</text>

                {/* FCS */}
                <rect x="645" y="20" width="75" height="70" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="682" y="45" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">FCS (CRC)</text>
                <text x="682" y="60" fill="#cbd5e1" fontSize="7" textAnchor="middle">4 Bytes</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  FRAME LIMITS: MINIMUM 64 BYTES (WITH PADDING) ➔ MAXIMUM 1518 BYTES (1522 WITH VLAN)
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  CRC-32 Error Detection • IEEE 802.1AE MACsec Hardware Encryption • Priority-Based Flow Control (PFC)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  VLAN Hopping Mitigation (Native VLAN 999) • Managed Enterprise Switches (₹48,500 24-Port Gigabit)
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
                Bengal Operations & Layer-2 Framing Case Studies
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
                  trap: 'Leaving Native VLAN 1 Active on All Switch Trunk Ports',
                  fix: 'Leaving Native VLAN 1 default enables Double-Tagging VLAN Hopping attacks. Always reassign native VLAN to an unused ID (e.g. VLAN 999) and disable DTP.',
                },
                {
                  trap: 'Assuming Frame Corruption Triggers an Error Message Back to Sender',
                  fix: 'Layer 2 switches silently drop frames that fail CRC-32 FCS checks without sending ICMP or error replies. Higher-layer TCP handles retransmissions.',
                },
                {
                  trap: 'Forgetting That 802.1Q Adds 4 Bytes to the Standard Frame Size',
                  fix: 'Standard frames are 1518 bytes; tagged VLAN frames are 1522 bytes. Switch ports on trunk links must support at least 1522 bytes to avoid baby giant drops.',
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
                  Think of a frame like a cargo shipping container: the MAC addresses are the barcodes on the container, the EtherType is the manifest, the IP packet is the cargo inside, and the FCS is the tamper-evident security seal!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how an ARP Request frame uses all-ones destination MAC (FF:FF:FF:FF:FF:FF) and padding to reach exactly 64 bytes on the physical wire!
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
                Student Revision Checklist (Topic 34)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped standard IEEE 802.3 Ethernet frame fields (Preamble, MACs, EtherType, FCS)',
                'Understood why frames require padding to meet the 64-byte minimum size threshold',
                'Deconstructed the 4-byte 802.1Q VLAN tag (TPID 0x8100, Priority, DEI, 12-bit VLAN ID)',
                'Differentiated between Runt frames, Giant frames, and configured Jumbo frames',
                'Mastered VLAN Hopping double-tagging attacks and native VLAN mitigation',
                'Formulated realistic managed switch and MACsec security budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Frames transport our digital world across physical wires. In our next topic (Topic 35), we will explore Network Protocols in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Frame FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Data Link Frames in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic35_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic34;
