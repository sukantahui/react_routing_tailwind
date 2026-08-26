// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic33.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 33: Packet

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic33_files/topic33_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic33_files/topic33_note.txt?raw';

const Topic33 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedPacketId, setSelectedPacketId] = useState('ipv4-tcp');
  const [packetDissectionLog, setPacketDissectionLog] = useState(null);

  const packetProfiles = [
    {
      id: 'ipv4-tcp',
      name: 'Standard IPv4 TCP Packet (20-Byte Header)',
      type: 'IPv4 Unfragmented Stream',
      versionIHL: 'Version: 4 • IHL: 5 (20 Bytes)',
      totalLength: '1500 Bytes (20B IP + 20B TCP + 1460B Data)',
      flags: 'DF=1 (Don\'t Fragment) • MF=0',
      offset: '0 (First / Complete Segment)',
      ttlProtocol: 'TTL: 64 • Protocol: 6 (TCP)',
      srcDst: '192.168.1.50 &rarr; 103.25.10.4',
      checksum: '0x4A2B (Validated 1\'s Complement)',
      desc: 'Standard unfragmented web/HTTPS transaction packet passing through an edge router in Barrackpore.',
      wiresharkTrace: 'Frame 1: 1514 bytes on wire (14B Eth + 20B IP + 20B TCP + 1460B Payload). IP Checksum: 0x4A2B [correct].',
    },
    {
      id: 'ipv4-frag',
      name: 'IPv4 Fragmented UDP Packet (Fragment 2 of 3)',
      type: 'IPv4 Fragment Stream',
      versionIHL: 'Version: 4 • IHL: 5 (20 Bytes)',
      totalLength: '1500 Bytes (20B IP + 1480B Raw Fragment Data)',
      flags: 'DF=0 • MF=1 (More Fragments Follow)',
      offset: '185 (Byte Offset 1480 = 185 * 8)',
      ttlProtocol: 'TTL: 58 • Protocol: 17 (UDP)',
      srcDst: '172.16.20.10 -&gt; 103.25.10.8',
      checksum: '0x8F1C (Recomputed Checksum)',
      desc: 'Second fragment of a 4000-byte DNS/NFS payload reassembled by the receiving kernel.',
      wiresharkTrace: 'IPv4 Fragment (offset: 1480, length: 1480, more fragments: true). ID: 0xD3A1.',
    },
    {
      id: 'ipv6-base',
      name: 'IPv6 Base Packet (Fixed 40-Byte Header)',
      type: 'IPv6 Next-Gen Packet',
      versionIHL: 'Version: 6 • Traffic Class: 0x00',
      totalLength: 'Payload Length: 1440 Bytes (Fixed 40B Header not included)',
      flags: 'Flow Label: 0x8A12F (High-speed hardware flow)',
      offset: 'Next Header: 6 (TCP) • Hop Limit: 64',
      ttlProtocol: 'Hop Limit: 64 (Replaces TTL)',
      srcDst: '2001:db8:acad:1::50 -> 2001:db8:acad:2::10',
      checksum: 'Eliminated in IPv6 Header (Processed at Layer 4)',
      desc: 'Fixed 40-byte IPv6 packet routed at hardware ASIC line rate across Kolkata core switches.',
      wiresharkTrace: 'Internet Protocol Version 6, Src: 2001:db8:acad:1::50, Dst: 2001:db8:acad:2::10, Next Header: TCP (6).',
    },
    {
      id: 'exploit-teardrop',
      name: 'Malformed Exploit Packet (Teardrop Attack)',
      type: 'Malicious Fragment Overlap',
      versionIHL: 'Version: 4 • IHL: 5',
      totalLength: '600 Bytes (Corrupted Fragment Range)',
      flags: 'DF=0 • MF=0 (Claims to be final fragment)',
      offset: '35 (Starts at byte 280, overlapping Fragment 1)',
      ttlProtocol: 'TTL: 64 • Protocol: 17 (UDP)',
      srcDst: '198.51.100.44 (Spoofed) -> 10.0.1.5',
      checksum: '0x992B (Malicious Craft)',
      desc: 'Overlapping fragment offset engineered by Scapy to trigger kernel memory crash (blocked by DPI firewall).',
      wiresharkTrace: '[WARNING: IP Fragment overlap detected] Firewall Drops Packet: Rule ID 9012 (Teardrop Exploit Mitigation).',
    },
  ];

  const currentPacket = packetProfiles.find((p) => p.id === selectedPacketId) || packetProfiles[0];

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
      title: '1. Precision Foundry IPsec VPN MSS Clamping (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu resolved a database connection freeze between Barrackpore and Kolkata by enabling TCP MSS Clamping (`iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1400`) on enterprise edge routers for ₹32,000. Clamping stopped VPN tunnel MTU fragmentation drops.',
      lesson: 'TCP MSS Clamping eliminates MTU black hole connection freezes across encrypted VPN tunnels.',
    },
    {
      title: '2. Diagnostic Clinic Deep Packet Inspection (DPI) (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima configured Deep Packet Inspection (DPI) on clinical perimeter firewalls in Ichapur for ₹1,45,000. DPI inspects Layer 7 DICOM medical image packet payloads in real-time, blocking malicious executable payloads disguised inside patient ultrasound files.',
      lesson: 'Deep Packet Inspection inspects Layer 7 payloads to block stealth malware hidden in medical files.',
    },
    {
      title: '3. University Campus 10G Hardware Network TAP (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata installed dual-port 10G optical hardware Network TAPs in Kolkata for ₹1,15,000. The TAPs feed full-rate packet mirrors directly to the campus Intrusion Detection System (IDS) with zero packet drops and zero CPU load on core distribution switches.',
      lesson: 'Physical Network TAPs guarantee 100% packet visibility for security monitoring without switch CPU load.',
    },
    {
      title: '4. Cyber Security Lab Fragmentation Exploit Defense (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila tested stateful inspection firewalls in Jadavpur against Teardrop and Tiny Fragment attacks using Scapy for ₹45,000 in testing tools. The firewall enforced minimum 120-byte initial fragment thresholds, dropping malformed overlapping offsets before kernel reassembly.',
      lesson: 'Enforcing fragment boundary validation stops memory corruption and firewall evasion attacks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes pktPulse33 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-pkt33 {
          animation: pktPulse33 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 33
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Packet • IPv4 & IPv6 Header Anatomy • Fragmentation • DPI in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Packet
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Network Packets & Layer-3 Protocol Data Units</span>: dissecting the 20-byte IPv4 header matrix, 40-byte fixed IPv6 architecture, fragmentation math (DF/MF and 8-byte offsets), Deep Packet Inspection (DPI), and hardware Network TAP budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'pkt-foundations', label: '1. Packet Foundations' },
              { id: 'interactive-studio', label: '2. Header Inspector Studio' },
              { id: 'ipv4-matrix', label: '3. 20-Byte Header Matrix' },
              { id: 'svg-anatomy', label: '4. Encapsulation Stack SVG' },
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

        {/* SECTION 1: Packet Foundations */}
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
                What is a Network Packet?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Packet</strong> is the fundamental Protocol Data Unit (PDU) operating at <strong className="text-indigo-400">OSI Layer 3 (Network Layer)</strong>. It encapsulates Layer 4 transport segments (TCP/UDP) with logical addressing metadata (source and destination IP headers), routing flags, and fragmentation parameters, enabling routers to deliver data end-to-end across interconnected networks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. 20-Byte Header</span>
                <p className="text-slate-300 text-xs">Contains 12 core metadata fields including TTL, Protocol, Checksum, and IPs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Fragmentation Flags</span>
                <p className="text-slate-300 text-xs">DF (Don't Fragment) and MF (More Fragments) manage MTU packet splitting.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. 40-Byte IPv6 Header</span>
                <p className="text-slate-300 text-xs">Streamlined fixed structure without checksum, optimized for hardware ASICs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Hardware TAPs (₹)</span>
                <p className="text-slate-300 text-xs">Physical wire splitters providing 100% packet mirror visibility for IDS/IPS.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Header Inspector Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-pkt33">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Packet Header Bit-Level Inspector & Fragmentation Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a packet profile to inspect header fields (TTL, Protocol, DF/MF Flags, Offset, Checksum) and simulated Wireshark capture output:
            </p>

            {/* Packet Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {packetProfiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPacketId(p.id);
                    setPacketDissectionLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedPacketId === p.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {p.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Packet Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentPacket.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-600">
                  Profile: {currentPacket.type}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Version & IHL:</span>
                  <span className="text-sky-300 font-bold">{currentPacket.versionIHL}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Total Length:</span>
                  <span className="text-amber-300 font-bold">{currentPacket.totalLength}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">TTL & Protocol:</span>
                  <span className="text-emerald-300 font-bold">{currentPacket.ttlProtocol}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-300 font-sans font-bold">Flags (DF / MF):</span>
                  <span className="text-slate-200">{currentPacket.flags}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Fragment Offset:</span>
                  <span className="text-slate-200">{currentPacket.offset}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans font-bold">Header Checksum:</span>
                  <span className="text-slate-200">{currentPacket.checksum}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Logical Endpoints:</span>
                <span className="text-white font-bold">{currentPacket.srcDst}</span>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Ingest Packet into Wireshark Dissector Engine:
                  </span>
                  <button
                    onClick={() => setPacketDissectionLog(currentPacket.wiresharkTrace)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Dissect Frame & Payload ▶
                  </button>
                </div>

                {packetDissectionLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🔍 <strong>Wireshark Telemetry Log:</strong> {packetDissectionLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: IPv4 Matrix */}
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
                IPv4 20-Byte Header Architecture Matrix (32-Bit Word Layout)
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Word Row</th>
                    <th className="p-2.5 text-sky-400">Bits 0 – 15</th>
                    <th className="p-2.5 text-emerald-400">Bits 16 – 31</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Word 1 (Bytes 0-3)</td>
                    <td className="p-2.5">Version (4b) + IHL (4b) + DSCP/ECN (8b)</td>
                    <td className="p-2.5 text-amber-300">Total Length (16 bits)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Word 2 (Bytes 4-7)</td>
                    <td className="p-2.5">Identification (16 bits)</td>
                    <td className="p-2.5 text-purple-300">Flags (3b: Res, DF, MF) + Offset (13b)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Word 3 (Bytes 8-11)</td>
                    <td className="p-2.5">Time to Live (TTL: 8b) + Protocol (8b)</td>
                    <td className="p-2.5 text-emerald-300">Header Checksum (16 bits)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Word 4 (Bytes 12-15)</td>
                    <td colSpan="2" className="p-2.5 text-sky-300 font-bold">Source IP Address (32 bits / 4 Bytes)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Word 5 (Bytes 16-19)</td>
                    <td colSpan="2" className="p-2.5 text-emerald-300 font-bold">Destination IP Address (32 bits / 4 Bytes)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Encapsulation Stack SVG */}
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
                Layer-3 Packet Encapsulation & Header Decomposition Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Layer 2 Frame */}
                <rect x="20" y="20" width="700" height="70" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="75" y="42" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">ETH HEADER</text>
                <text x="75" y="58" fill="#64748b" fontSize="7" textAnchor="middle">14 Bytes</text>

                {/* Layer 3 Packet */}
                <rect x="130" y="30" width="530" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="185" y="50" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">IP HEADER (20B)</text>
                <text x="185" y="65" fill="#cbd5e1" fontSize="7" textAnchor="middle">TTL, DF/MF, IPs</text>

                {/* Layer 4 Segment */}
                <rect x="240" y="38" width="410" height="34" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="295" y="55" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">TCP/UDP (20B)</text>
                <text x="295" y="67" fill="#cbd5e1" fontSize="6" textAnchor="middle">Port Numbers</text>

                {/* Layer 7 Payload */}
                <rect x="350" y="44" width="290" height="22" rx="3" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="495" y="59" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">APPLICATION PAYLOAD DATA (HTTP / TLS 1.3 / FILE)</text>

                {/* Frame Trailer */}
                <text x="685" y="42" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">FCS</text>
                <text x="685" y="58" fill="#64748b" fontSize="7" textAnchor="middle">4 Bytes</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ENCAPSULATION: DATA ➔ SEGMENT (L4) ➔ PACKET (L3) ➔ FRAME (L2) ➔ BITS (L1)
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Path MTU Discovery (DF=1) • TCP MSS Clamping (1400B) • 40-Byte Fixed IPv6 Header (Flow Label Hardware Forwarding)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Hardware Network TAPs (₹1,15,000) • Deep Packet Inspection (DPI) • Teardrop & Tiny Fragment Exploit Defense
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
                Bengal Operations & Packet Inspection Case Studies
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
                  trap: 'Blocking All ICMP Messages on Perimeter Firewalls',
                  fix: 'Blocking ICMP Type 3 Code 4 (Fragmentation Needed) breaks Path MTU Discovery (PMTUD), causing mysterious VPN connection freezes on large packet transfers.',
                },
                {
                  trap: 'Assuming Switch SPAN Ports Capture 100% of Packets During Line Congestion',
                  fix: 'When switch ASICs reach high utilization, SPAN mirroring drops packets first to prioritize real traffic. Deploy physical hardware Network TAPs for full packet visibility.',
                },
                {
                  trap: 'Confusing Layer 3 Packets with Layer 2 Frames and Layer 4 Segments',
                  fix: 'A Segment has TCP ports (L4); a Packet has IP addresses (L3); a Frame has MAC addresses and FCS trailer (L2). Keep the encapsulation layers distinct.',
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
                  Think of a network packet like a registered parcel envelope: the IP header is the postal shipping label with sender and receiver addresses, and the TCP segment inside is the actual letter!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the IPv4 Header Checksum changes at every router hop because the Time-To-Live (TTL) field is decremented by 1 at each gateway!
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
                Student Revision Checklist (Topic 33)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the 20-byte IPv4 packet header structure and explained all 12 fields',
                'Differentiated between the DF (Don\'t Fragment) and MF (More Fragments) bit flags',
                'Calculated Fragment Offset (BytePosition / 8) during packet fragmentation',
                'Compared IPv4 20-byte variable headers with IPv6 40-byte fixed headers',
                'Analyzed Teardrop, Tiny Fragment, and MTU Black Hole cyber threats',
                'Formulated realistic hardware Network TAP and Packet Broker budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Network packets carry the global Internet on their headers. In our next topic (Topic 34), we will explore Layer-2 Frames in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Packet FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Network Packets in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic34_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic33;
