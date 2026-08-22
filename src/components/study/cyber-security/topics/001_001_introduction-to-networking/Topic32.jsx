// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic32.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 32: Throughput

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic32_files/topic32_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic32_files/topic32_note.txt?raw';

const Topic32 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedThroughputId, setSelectedThroughputId] = useState('fiber-1g');
  const [throughputBenchmarkLog, setThroughputBenchmarkLog] = useState(null);

  const throughputProfiles = [
    {
      id: 'fiber-1g',
      name: '1 Gbps Clean Optical Fiber (Zero Loss)',
      pathLinks: '10G Core -> 1G Aggregation -> 1G Endpoint',
      bottleneckCap: '1,000 Mbps (1 Gbps)',
      packetLoss: '0.001% (Clean Fiber)',
      rtt: '15 ms',
      mathisLimit: '940 Mbps (Single Stream)',
      goodputEfficiency: '94.2% (~117.7 MB/s Payload)',
      estApplianceCost: '₹35,000 (Managed Gigabit Switch)',
      desc: 'Ideal enterprise connection with balanced MTU, zero packet loss, and high TCP window scale.',
      benchmarkSim: 'iPerf3 1-Stream = 938 Mbps. iPerf3 8-Streams = 985 Mbps (Wire rate reached with 94.2% goodput).',
    },
    {
      id: 'bottleneck-wan',
      name: 'Multi-Hop WAN with 50 Mbps Bottleneck Link',
      pathLinks: '10G Local -> 1G ISP -> 50 Mbps WAN -> 10G Remote Cloud',
      bottleneckCap: '50 Mbps (Bottleneck Link Rule)',
      packetLoss: '0.1% (Intermediate Queue Drops)',
      rtt: '45 ms',
      mathisLimit: '48.5 Mbps (Capped by min link)',
      goodputEfficiency: '91.5% (~5.7 MB/s Payload)',
      estApplianceCost: '₹18,500 / month (Internet Leased Line)',
      desc: 'Throughput is strictly capped by the 50 Mbps intermediate WAN link regardless of 10G endpoint NICs.',
      benchmarkSim: 'Bottleneck Link Rule enforced: min(10000, 1000, 50, 10000) = 50 Mbps maximum achieved throughput.',
    },
    {
      id: 'lossy-wifi',
      name: 'Lossy Campus Wi-Fi (3% Packet Loss with TCP Cubic)',
      pathLinks: '300 Mbps Wi-Fi 6 -> 1G Switch -> 1G Gateway',
      bottleneckCap: '300 Mbps Radio Bandwidth',
      packetLoss: '3.0% (RF Noise & Wall Interference)',
      rtt: '25 ms',
      mathisLimit: '18.4 Mbps (Mathis Penalty under Cubic)',
      goodputEfficiency: '62.0% (Massive Retransmission Overhead)',
      estApplianceCost: '₹65,000 (Enterprise Wi-Fi 6 AP Controller)',
      desc: 'TCP Cubic collapses under random wireless RF loss; upgrading to TCP BBR restores speed to 140 Mbps.',
      benchmarkSim: 'Mathis formula limit active: 3% loss cuts single-stream TCP throughput by 88% due to AIMD window halving.',
    },
    {
      id: 'san-jumbo',
      name: '10 Gbps SAN Storage with 9000-Byte Jumbo Frames',
      pathLinks: '10G Server NIC -> 40G Core -> 10G NVMe Array',
      bottleneckCap: '10,000 Mbps (10 Gbps Line Rate)',
      packetLoss: '0.000% (Lossless DCB / PFC Enabled)',
      rtt: '1 ms (Intra-Rack SAN)',
      mathisLimit: '9,850 Mbps (Single iSCSI Stream)',
      goodputEfficiency: '98.9% (~1.23 GB/s Payload with Jumbo MTU)',
      estApplianceCost: '₹1,45,000 (10G Lossless SAN Switch & SFP+)',
      desc: 'Jumbo Frames (MTU 9000) reduce CPU interrupt overhead by 83%, delivering near-perfect wire speed.',
      benchmarkSim: 'Jumbo frame MTU 9000 delivers 9.85 Gbps throughput; 50GB database backup completes in 41 seconds.',
    },
  ];

  const currentProfile = throughputProfiles.find((t) => t.id === selectedThroughputId) || throughputProfiles[0];

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
      title: '1. Precision Foundry 10G SAN Jumbo Frame Rollout (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu enabled 9000-byte Jumbo Frames on a 10G iSCSI storage network in Barrackpore for ₹45,000 in switch transceivers. Backup replication throughput jumped from 4.2 Gbps to 9.6 Gbps, reducing 2TB database backup time from 65 minutes to 28 minutes.',
      lesson: 'Jumbo Frames (MTU 9000) slash CPU interrupts and unlock full wire speed on 10G networks.',
    },
    {
      title: '2. Diagnostic Clinic NGFW Threat Inspection Sizing (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed a Next-Gen Firewall (FortiGate 100F) in Ichapur for ₹1,85,000. Sizing the firewall for 1 Gbps Threat Protection Throughput ensured real-time SSL/TLS malware scanning without slowing down doctor MRI image transfers across 50 clinical workstations.',
      lesson: 'Always size firewalls based on Threat Inspection Throughput rather than raw Layer-4 ratings.',
    },
    {
      title: '3. University Examination Portal TCP BBR Acceleration (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata enabled the TCP BBR congestion algorithm on Linux web servers in Kolkata for ₹25,000 in system upgrades. Result publication throughput increased by 240% across mobile 4G/5G student clients experiencing 2–4% wireless packet loss.',
      lesson: 'TCP BBR maintains high throughput in lossy wireless environments where TCP Cubic stalls.',
    },
    {
      title: '4. Cyber Security Lab Multi-Stream iPerf3 Benchmarking (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila benchmarked enterprise core switches in Jadavpur for ₹55,000 in test appliances. Single-stream TCP throughput achieved 1.4 Gbps due to window limits; running 8 parallel iPerf3 streams (`iperf3 -P 8`) saturated the full 10 Gbps optical line rate.',
      lesson: 'Multi-stream benchmarking bypasses single-buffer limits to measure true aggregate network capacity.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes tpPulse32 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-tp32 {
          animation: tpPulse32 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 32
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Throughput • Bottleneck Dynamics • Mathis Formula • NGFW Sizing in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Throughput
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Network Throughput & Transfer Dynamics</span>: mastering the Bottleneck Link Rule, Mathis' Formula for TCP under packet loss, Protocol Stack Goodput efficiency, Jumbo Frames (MTU 9000), TCP BBR vs Cubic, and Next-Gen Firewall threat inspection sizing in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'tp-foundations', label: '1. Throughput Foundations' },
              { id: 'interactive-studio', label: '2. Bottleneck & Mathis Studio' },
              { id: 'goodput-table', label: '3. Protocol Overhead Table' },
              { id: 'svg-bottleneck', label: '4. Bottleneck Dynamics SVG' },
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

        {/* SECTION 1: Throughput Foundations */}
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
                What is Network Throughput?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong className="text-sky-400">Throughput</strong> is the actual rate of successful data delivery over a communication channel per unit of time, measured in bits per second (bps, Mbps, Gbps) or bytes per second (MB/s). It reflects real-world network performance after accounting for packet loss, protocol headers, congestion window algorithms, and bottleneck links.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Bottleneck Rule</span>
                <p className="text-slate-300 text-xs">Throughput &le; min(R1, R2, ..., RN) is strictly limited by the slowest link in the path.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Mathis' TCP Formula</span>
                <p className="text-slate-300 text-xs">Throughput &le; (MSS / RTT) * (1 / &radic;p) demonstrates severe speed drops under packet loss.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Jumbo Frames (9K)</span>
                <p className="text-slate-300 text-xs">Expands MTU from 1500 to 9000 bytes, slashing CPU interrupt overhead by 83%.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. NGFW Sizing (₹)</span>
                <p className="text-slate-300 text-xs">Enterprise firewalls must be sized for Threat Inspection Throughput, not raw L4 speed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Bottleneck & Mathis Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-tp32">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Throughput Bottleneck & Mathis Formula Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a network scenario to inspect path link capacities, packet loss impact via Mathis' formula, Goodput efficiency, and simulated iPerf3 benchmark:
            </p>

            {/* Throughput Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {throughputProfiles.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedThroughputId(t.id);
                    setThroughputBenchmarkLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedThroughputId === t.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {t.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Throughput Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentProfile.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Hardware/Lease: {currentProfile.estApplianceCost}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Multi-Hop Path Capacities:</span>
                <span className="text-sky-300 font-bold">{currentProfile.pathLinks}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Bottleneck Link Cap:</span>
                  <span className="text-amber-300 font-bold">{currentProfile.bottleneckCap}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Packet Loss Rate:</span>
                  <span className="text-rose-300 font-bold">{currentProfile.packetLoss}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Mathis TCP Limit:</span>
                  <span className="text-emerald-300 font-bold">{currentProfile.mathisLimit}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-purple-300 font-bold font-sans">Effective Payload Goodput:</span>
                <span className="text-slate-200">{currentProfile.goodputEfficiency}</span>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Run iPerf3 Multi-Stream Throughput Benchmark:
                  </span>
                  <button
                    onClick={() => setThroughputBenchmarkLog(currentProfile.benchmarkSim)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute iPerf3 Test ▶
                  </button>
                </div>

                {throughputBenchmarkLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    📊 <strong>iPerf3 Benchmark Output:</strong> {throughputBenchmarkLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Goodput Table */}
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
                Protocol Stack Overhead & Goodput Decomposition (1500-Byte MTU)
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Protocol Layer</th>
                    <th className="p-2.5 text-sky-400">Header Size</th>
                    <th className="p-2.5 text-amber-400">Function in Frame</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 2 Ethernet</td>
                    <td className="p-2.5 text-sky-300">18 Bytes (14B Header + 4B FCS)</td>
                    <td className="p-2.5">Source/Dest MAC addressing & Frame Check Sequence</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 3 IPv4</td>
                    <td className="p-2.5 text-sky-300">20 Bytes</td>
                    <td className="p-2.5">Source/Dest IP addressing, TTL, and checksum</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 4 TCP</td>
                    <td className="p-2.5 text-sky-300">20–32 Bytes (with options)</td>
                    <td className="p-2.5">Port numbers, sequence numbers, window scale, ACK</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Layer 7 TLS 1.3</td>
                    <td className="p-2.5 text-sky-300">~29 Bytes</td>
                    <td className="p-2.5">AES-GCM encryption record header & auth tag</td>
                  </tr>
                  <tr className="bg-emerald-950/30">
                    <td className="p-2.5 font-bold text-emerald-300 font-sans">Useful Payload (Goodput)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">~1401 Bytes (~93.4%)</td>
                    <td className="p-2.5 text-emerald-300">Actual application file or database payload</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Bottleneck Dynamics SVG */}
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
                Multi-Hop Bottleneck Link Dynamics & Throughput Funnel Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Hop 1: 10G LAN */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">HOP 1: LOCAL LAN</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">10 Gbps Switch Fabric</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Capacity = 10,000 Mbps</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Hop 2: Bottleneck WAN Link */}
                <rect x="200" y="30" width="160" height="50" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="280" y="50" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">HOP 2: BOTTLENECK</text>
                <text x="280" y="65" fill="#fecdd3" fontSize="8" textAnchor="middle">50 Mbps WAN Leased Line</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Hop 3: Core ISP */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">HOP 3: CORE ISP</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">1 Gbps Metro Fiber</text>
                <text x="460" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Capacity = 1,000 Mbps</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Hop 4: Cloud DC */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">HOP 4: CLOUD DC</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">40 Gbps Data Center</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Capacity = 40,000 Mbps</text>

                {/* Bottom Bottleneck Rule Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  BOTTLENECK LINK PRINCIPLE: END-TO-END THROUGHPUT &le; MIN(10G, 50M, 1G, 40G) = 50 MBPS
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Mathis Formula: Throughput &le; (MSS / RTT) * (1 / &radic;p) • 9000-byte Jumbo Frames deliver 98.9% Goodput efficiency
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  TCP BBR Congestion Acceleration • Next-Gen Firewall Threat Inspection Sizing (₹1,85,000 FortiGate 100F)
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
                Bengal Operations & Throughput Engineering Case Studies
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
                  trap: 'Assuming a 10Gbps Network Card Will Automatically Deliver 10Gbps Over the Internet',
                  fix: 'End-to-end throughput is bounded by the slowest intermediate link (Bottleneck Link Rule). If an ISP link is 50 Mbps, throughput cannot exceed 50 Mbps.',
                },
                {
                  trap: 'Purchasing Firewalls Based on Raw Layer-4 Throughput Rather Than Threat Prevention Throughput',
                  fix: 'Enabling SSL decryption, IPS, and Antivirus scans reduces raw firewall throughput by 70–85%. Always size firewall appliances for Threat Protection Throughput.',
                },
                {
                  trap: 'Ignoring Packet Loss When Benchmarking Single-Stream TCP File Transfers',
                  fix: 'Under Mathis\' formula, even 1% packet loss causes TCP Cubic to repeatedly halve its congestion window, drastically reducing single-stream throughput. Use TCP BBR.',
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
                  Think of throughput like water flowing through connected pipes of different diameters: water can only flow as fast as the narrowest pipe in the entire plumbing system!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how enabling 9000-byte Jumbo Frames on storage networks expands payload capacity by 6x, reducing packet header overhead and CPU load!
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
                Student Revision Checklist (Topic 32)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the Bottleneck Link Rule: Throughput <= min(R1, R2, ..., RN)',
                'Calculated TCP throughput limits using Mathis\' Formula: (MSS / RTT) * (1 / sqrt(p))',
                'Decomposed protocol stack overheads and calculated Goodput efficiency percentage',
                'Evaluated Jumbo Frames (MTU 9000) and NIC Hardware Offloading (TSO/RSS)',
                'Compared TCP BBR vs TCP Cubic behavior in lossy wireless environments',
                'Formulated realistic Next-Generation Firewall and 10G SAN budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Throughput is the ultimate metric of real-world network performance. In our next topic (Topic 33), we will explore Network Packets in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Throughput FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Throughput in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic33_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic32;
