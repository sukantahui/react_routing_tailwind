// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic35.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 35: Protocol

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic35_files/topic35_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic35_files/topic35_note.txt?raw';

const Topic35 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedProtocolId, setSelectedProtocolId] = useState('tcp-handshake');
  const [protocolSimLog, setProtocolSimLog] = useState(null);

  const protocolProfiles = [
    {
      id: 'tcp-handshake',
      name: 'TCP 3-Way Handshake (Connection-Oriented)',
      layer: 'Layer 4 Transport (Reliable Stream)',
      syntax: 'Source Port (16b), Dest Port (16b), Seq Num (32b), Ack Num (32b), Flags (SYN, ACK)',
      semantics: 'SYN initiates sequence synchronization; SYN-ACK confirms and responds; ACK confirms receipt.',
      timing: 'State Transition: CLOSED -> SYN_SENT -> SYN_RCVD -> ESTABLISHED (Timeout RTO = 1000ms)',
      securityThreat: 'SYN Flood attacks exhausting kernel memory buffers (mitigated by SYN Cookies).',
      estApplianceCost: '₹45,000 (Stateful Firewall Module)',
      desc: 'Reliable connection establishment between client browser in Barrackpore and university web portal in Kolkata.',
      simResult: 'Step 1: Client -> SYN(seq=100) -> Step 2: Server -> SYN-ACK(seq=300, ack=101) -> Step 3: Client -> ACK(ack=301) -> Socket ESTABLISHED.',
    },
    {
      id: 'dns-udp',
      name: 'DNS Domain Name Query (UDP Connectionless)',
      layer: 'Layer 7 Application over Layer 4 UDP (Port 53)',
      syntax: 'Transaction ID (16b), Flags (QR, Opcode, AA, RD, RA), Question Count, Resource Records',
      semantics: 'Query maps human-readable domain name (college.edu) to 32-bit IPv4 address (103.25.10.4).',
      timing: 'Non-blocking single packet exchange; client retransmits if no reply within 2000ms.',
      securityThreat: 'DNS Cache Poisoning / Kaminsky Spoofing (mitigated by DNSSEC cryptographic signing).',
      estApplianceCost: '₹95,000 (Authoritative DNSSEC Appliance)',
      desc: 'High-speed name resolution resolving regional web services in under 4ms.',
      simResult: 'Client sends UDP query for "wb.gov.in" -> Server replies with A-Record (103.25.10.4) + RRSIG DNSSEC signature.',
    },
    {
      id: 'tls-13',
      name: 'TLS 1.3 Cryptographic Handshake (Encrypted Session)',
      layer: 'Layer 7 Cryptographic Security (Port 443)',
      syntax: 'ClientHello (KeyShare, SupportedGroups), ServerHello (ECDHE KeyShare), EncryptedExtensions',
      semantics: 'Negotiates symmetric AES-256 GCM session key with Perfect Forward Secrecy in 1-RTT.',
      timing: 'Single round-trip (1-RTT) or 0-RTT session resumption for returning mobile clients.',
      securityThreat: 'SSL Stripping and Protocol Downgrade attacks (mitigated by HSTS Preload headers).',
      estApplianceCost: '₹65,000 (TLS Hardware Acceleration Card)',
      desc: 'State-of-the-art encryption protecting banking and medical records across West Bengal.',
      simResult: 'ClientHello with ECDHE Curve25519 -> ServerHello returns ephemeral public key -> Session keys derived in 1-RTT.',
    },
    {
      id: 'syn-flood-sim',
      name: 'TCP SYN Flood Exploit with SYN Cookie Defense',
      layer: 'Layer 4 Transport Layer Threat Model',
      syntax: 'Spoofed Source IPs with SYN=1 and ACK=0 flooded at 800,000 packets per second.',
      semantics: 'Attempts to exhaust the server SYN Backlog queue to cause denial of service.',
      timing: 'Attacker never sends final ACK; half-open sockets expire after kernel timeout.',
      securityThreat: 'Server connection table exhaustion (mitigated by kernel SYN Cookies allocating 0 memory).',
      estApplianceCost: '₹1,20,000 (Enterprise DDoS Mitigation Sensor)',
      desc: 'Botnet attack targeting hospital database servers in Ichapur; defended by Linux SYN Cookies.',
      simResult: 'Firewall detects 800K SYN/sec -> Enables SYN Cookies -> Connection state encoded in ISN -> 0 bytes kernel RAM consumed.',
    },
  ];

  const currentProtocol = protocolProfiles.find((p) => p.id === selectedProtocolId) || protocolProfiles[0];

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
      title: '1. Precision Foundry TCP SYN Cookie Hardening (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu defended edge telemetry gateways in Barrackpore against an 800,000 SYN/sec botnet attack by enabling SYN Cookies (`net.ipv4.tcp_syncookies = 1`) on Linux firewalls for ₹35,000 in security audits. Memory backlog exhaustion dropped to 0%, keeping operations live.',
      lesson: 'SYN Cookies eliminate memory allocation for half-open sockets, defeating SYN flood DDoS attacks.',
    },
    {
      title: '2. Diagnostic Clinic TLS 1.3 & HSTS Enforcement (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima enforced TLS 1.3 with Perfect Forward Secrecy (PFS) and HSTS preloading on hospital patient servers in Ichapur for ₹45,000. Protocol downgrade attempts (SSL stripping) were blocked at the browser edge, protecting sensitive healthcare records.',
      lesson: 'HSTS preloading and TLS 1.3 prevent protocol downgrade attacks and protect patient data confidentiality.',
    },
    {
      title: '3. University Campus DNSSEC & RPKI Deployment (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata deployed DNSSEC cryptographic record signing and RPKI BGP validation across the university network in Kolkata for ₹95,000. This neutralized DNS cache poisoning and prevented unauthorized ISP BGP prefix hijacking of the campus website.',
      lesson: 'DNSSEC and RPKI cryptographically validate domain names and BGP routes, preventing traffic hijacking.',
    },
    {
      title: '4. Cyber Security Lab Protocol Fuzzing & IDS Auditing (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila deployed Suricata IDS and protocol fuzzers (Boofuzz) in Jadavpur for ₹1,20,000. Fuzzing discovered a malformed SNMP buffer overflow vulnerability in legacy lab hardware, patching the flaw before unauthorized lateral access could occur.',
      lesson: 'Protocol fuzzing identifies parsing vulnerabilities in network daemons before attackers can exploit them.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes protoPulse35 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-proto35 {
          animation: protoPulse35 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 35
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Protocol • Syntax, Semantics & Timing • TCP State Machines • TLS 1.3 in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Protocol
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Network Protocols & Communication Standards</span>: mastering the 3 pillars (Syntax, Semantics, Timing), TCP state machines and 3-way handshakes, connectionless UDP vs QUIC, TLS 1.3 cryptography, DNSSEC, and IDS/IPS sensor budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'proto-foundations', label: '1. Protocol Pillars' },
              { id: 'interactive-studio', label: '2. State Machine Studio' },
              { id: 'protocol-suite', label: '3. Protocol Suite Matrix' },
              { id: 'svg-pillars', label: '4. Syntax & Semantics SVG' },
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

        {/* SECTION 1: Protocol Foundations */}
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
                What is a Network Protocol?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Protocol</strong> is a formal set of standardized rules, syntax, semantics, and synchronization procedures that govern how digital computing nodes format, exchange, transmit, and verify data across communication channels. It guarantees interoperability across heterogeneous hardware architectures, operating systems, and network mediums.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Syntax (Data Format)</span>
                <p className="text-slate-300 text-xs">Bit structure, field lengths, offsets, and delimiters governing how frames and packets are formed.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Semantics (Meaning)</span>
                <p className="text-slate-300 text-xs">Actionable meaning of each section of bits (control opcodes, error status codes, address targets).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Timing (Synchronization)</span>
                <p className="text-slate-300 text-xs">Speed matching, sequencing, state machine transitions, flow control, and timeout retransmissions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: State Machine Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-proto35">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Protocol State Machine & Syntax Inspector Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a protocol interaction model to inspect Syntax, Semantics, Timing state transitions, security threats, and simulated execution telemetry:
            </p>

            {/* Protocol Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {protocolProfiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProtocolId(p.id);
                    setProtocolSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedProtocolId === p.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {p.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Protocol Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentProtocol.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Appliance / License: {currentProtocol.estApplianceCost}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Layer & Protocol Scope:</span>
                <span className="text-sky-300 font-bold">{currentProtocol.layer}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans font-bold">1. Protocol Syntax:</span>
                  <span className="text-slate-300">{currentProtocol.syntax}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">2. Protocol Semantics:</span>
                  <span className="text-slate-300">{currentProtocol.semantics}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">3. Timing & State Machine:</span>
                  <span className="text-slate-300">{currentProtocol.timing}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Cyber Security Threat Model:</span>
                  <span className="text-slate-300">{currentProtocol.securityThreat}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Protocol Exchange & State Machine Step:
                  </span>
                  <button
                    onClick={() => setProtocolSimLog(currentProtocol.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute Protocol Handshake ▶
                  </button>
                </div>

                {protocolSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🔄 <strong>Protocol State Machine Log:</strong> {protocolSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Protocol Suite Matrix */}
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
                Multi-Layer Protocol Suite & Standard Port Taxonomy
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">OSI Layer</th>
                    <th className="p-2.5 text-sky-400">Key Protocols</th>
                    <th className="p-2.5 text-amber-400">Ports & Standards</th>
                    <th className="p-2.5 text-emerald-400">Primary Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 7 (Application)</td>
                    <td className="p-2.5 text-sky-300">HTTPS, DNS, SSH, SNMP, SMTP</td>
                    <td className="p-2.5 text-amber-300">443, 53, 22, 161, 587</td>
                    <td className="p-2.5">End-user applications, name resolution, encryption</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 4 (Transport)</td>
                    <td className="p-2.5 text-sky-300">TCP, UDP, QUIC</td>
                    <td className="p-2.5 text-amber-300">RFC 793, RFC 768, RFC 9000</td>
                    <td className="p-2.5">Reliability, multiplexing, sequencing, flow control</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 3 (Network)</td>
                    <td className="p-2.5 text-sky-300">IPv4, IPv6, ICMP, IPsec, BGP</td>
                    <td className="p-2.5 text-amber-300">RFC 791, RFC 8200, Port 179</td>
                    <td className="p-2.5">Logical addressing, routing across internetworks</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 2 (Data Link)</td>
                    <td className="p-2.5 text-sky-300">Ethernet, Wi-Fi, 802.1Q, ARP</td>
                    <td className="p-2.5 text-amber-300">IEEE 802.3, 802.11ax, 802.1AE</td>
                    <td className="p-2.5">Hardware MAC frame delivery, error checking (FCS)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Syntax & Semantics SVG */}
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
                The 3 Core Pillars of Network Protocols & State Machine Flow
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Pillar 1: Syntax */}
                <rect x="20" y="20" width="220" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="130" y="45" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">1. SYNTAX (STRUCTURE)</text>
                <text x="130" y="60" fill="#cbd5e1" fontSize="8" textAnchor="middle">Data Format, Bit Lengths & Offsets</text>
                <text x="130" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Governs HOW data is built</text>

                {/* Pillar 2: Semantics */}
                <rect x="260" y="20" width="220" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="370" y="45" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">2. SEMANTICS (MEANING)</text>
                <text x="370" y="60" fill="#cbd5e1" fontSize="8" textAnchor="middle">Control Actions & Status Opcodes</text>
                <text x="370" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Governs WHAT bits represent</text>

                {/* Pillar 3: Timing */}
                <rect x="500" y="20" width="220" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. TIMING (SPEED & STATE)</text>
                <text x="610" y="60" fill="#cbd5e1" fontSize="8" textAnchor="middle">Sequencing, Timeouts & Retries</text>
                <text x="610" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Governs WHEN data is sent</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  TCP 3-WAY HANDSHAKE: SYN ➔ SYN-ACK ➔ ACK (ESTABLISHED) ➔ 4-WAY FIN TEARDOWN
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  TLS 1.3 Perfect Forward Secrecy (PFS) • DNSSEC Cryptographic Signing • RPKI BGP Validation • QUIC (HTTP/3) 0-RTT
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  SYN Cookies Defense against SYN Floods • Real-Time Hardware IDS/IPS Sensors (₹1,20,000)
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
                Bengal Operations & Protocol Security Case Studies
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
                  trap: 'Allowing Cleartext Protocols Like Telnet and Plain HTTP in Production',
                  fix: 'Telnet, SNMPv1/v2c, and HTTP send credentials in plaintext over the wire. Mandate SSH, SNMPv3, and TLS 1.3 across all enterprise endpoints.',
                },
                {
                  trap: 'Disabling TCP SYN Cookies on High-Traffic Web Gateways',
                  fix: 'Disabling SYN Cookies leaves servers vulnerable to memory starvation under botnet SYN floods. Always set net.ipv4.tcp_syncookies = 1.',
                },
                {
                  trap: 'Failing to Implement HSTS Preload Headers on HTTPS Servers',
                  fix: 'Without HSTS, attackers can intercept initial HTTP redirects via SSL Stripping downgrade attacks. Configure Strict-Transport-Security with preload.',
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
                  Think of a network protocol like international air traffic control: pilots and tower operators follow strict phraseology (Syntax), exact command meanings (Semantics), and turn-taking rules (Timing) to prevent mid-air collisions!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how modern QUIC (HTTP/3) combines transport and cryptographic handshakes into a single round trip over UDP, replacing separate TCP and TLS steps!
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
                Student Revision Checklist (Topic 35)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 3 core pillars of any protocol: Syntax, Semantics, and Timing',
                'Traced the TCP 3-Way Handshake (SYN, SYN-ACK, ACK) and 4-Way Teardown (FIN/ACK)',
                'Compared connection-oriented TCP vs connectionless UDP vs next-gen QUIC (HTTP/3)',
                'Evaluated TCP SYN Floods, Protocol Downgrades, and DNS Cache Poisoning attacks',
                'Understood DNSSEC cryptographic validation and RPKI BGP origin authorization',
                'Formulated realistic enterprise IDS/IPS sensor budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Protocols are the grammar of all digital communications. In our next topic (Topic 36), we will explore Internet vs Intranet architectures in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Protocol FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Network Protocols in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic36_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic35;
