// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic25.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 25: NIC (Network Interface Card)

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic25_files/topic25_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic25_files/topic25_note.txt?raw';

const Topic25 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeNicId, setActiveNicId] = useState('copper');
  const [frameProcessingLog, setFrameProcessingLog] = useState(null);

  const nicProfiles = [
    {
      id: 'copper',
      name: 'Gigabit Ethernet Copper NIC (RJ-45)',
      speed: '10/100/1000 Mbps (1Gbps Full Duplex)',
      busInterface: 'PCIe x1 / Motherboard Integrated LOM',
      mediaConnector: 'RJ-45 Jack (Category 6 UTP Copper up to 100m)',
      sampleMAC: '00:1A:2B : 3C:4D:5E (Intel Corp)',
      oui: '00:1A:2B (Vendor OUI: Intel)',
      serial: '3C:4D:5E (Unique Device Serial)',
      features: 'Hardware Checksum Offload, Wake-on-LAN (WoL), PXE Boot ROM',
      estCost: '₹1,200 – ₹2,800',
      simulation: 'PCIe DMA fetches packet &rarr; MAC ASIC appends 00:1A:2B:3C:4D:5E & CRC32 -&gt; PHY transmits 1Gbps differential voltages on Cat6.',
    },
    {
      id: 'fiber',
      name: '10G/25G Dual-Port SFP+ Fiber NIC',
      speed: '10Gbps / 25Gbps Line Rate per Port',
      busInterface: 'PCIe 3.0/4.0 x8 Slot with Heat Sink',
      mediaConnector: 'Dual SFP+ Cages (LC Multi-Mode OM4 / Single-Mode OS2 Fiber)',
      sampleMAC: 'A4:BF:01 : 98:76:54 (Broadcom Inc)',
      oui: 'A4:BF:01 (Vendor OUI: Broadcom)',
      serial: '98:76:54 (Unique Device Serial)',
      features: 'SR-IOV Virtualization (32 VFs), 9KB Jumbo Frames, LACP Teaming',
      estCost: '₹14,000 – ₹28,000 (with Transceivers)',
      simulation: '10Gbps packet stream -> Interrupt Coalescing batches 32 frames -> Transceivers pulse 850nm laser light with 0% EMI.',
    },
    {
      id: 'wireless',
      name: 'Wi-Fi 6E / 7 Wireless WNIC',
      speed: 'Up to 2.4Gbps (2x2 MU-MIMO OFDMA)',
      busInterface: 'M.2 2230 PCIe / USB 3.0 Dongle',
      mediaConnector: 'Dual-Band RP-SMA External Antennas (2.4GHz / 5GHz / 6GHz)',
      sampleMAC: 'F8:E4:3B : 12:AB:CD (Qualcomm)',
      oui: 'F8:E4:3B (Vendor OUI: Qualcomm)',
      serial: '12:AB:CD (Unique Device Serial)',
      features: 'WPA3-Enterprise Cryptography, Target Wake Time (TWT), Beamforming',
      estCost: '₹2,500 – ₹5,500',
      simulation: 'WPA3 Handshake verified -> 1024-QAM modulates 6GHz radio frequency -> Transmits over airwaves.',
    },
    {
      id: 'virtual',
      name: 'Virtual Network Adapter (vNIC)',
      speed: 'Virtual Line Rate (10G/40G Bus Speed)',
      busInterface: 'Hypervisor Software Emulation (virtio-net / vmxnet3)',
      mediaConnector: 'Virtual Switch (vSwitch / Open vSwitch Bridge)',
      sampleMAC: '00:50:56 : 89:AB:CD (VMware OUI)',
      oui: '00:50:56 (Vendor OUI: VMware)',
      serial: '89:AB:CD (Generated VM Serial)',
      features: 'VLAN 802.1Q Tagging, Dynamic vCPU Interrupt Steering, Zero Hardware Cost',
      estCost: '₹0 (Software Defined)',
      simulation: 'Hypervisor kernel memory copy -> Forwards frame across virtual switch trunk directly to adjacent VM.',
    },
  ];

  const currentNic = nicProfiles.find((n) => n.id === activeNicId) || nicProfiles[0];

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
      title: '1. Precision Foundry Server 10G NIC Upgrade (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu upgraded an ERP database server in Barrackpore with an Intel Dual-Port 10G SFP+ PCIe NIC (₹21,000 including transceivers). Configured with 802.3ad LACP bonding, it doubled throughput to 20Gbps and eliminated factory telemetry bottlenecks.',
      lesson: 'Dual-port NIC bonding delivers instant failover redundancy and double bandwidth.',
    },
    {
      title: '2. Diagnostic Clinic Wi-Fi 6E Wireless NIC Rollout (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima equipped mobile ultrasound diagnostic carts in Ichapur with Intel Wi-Fi 6E PCIe cards (₹3,200/cart), enabling uninterrupted 2.4Gbps video streaming to doctor consoles without trailing physical cables across patient beds.',
      lesson: 'Enterprise wireless NICs provide clean mobility without compromising data transfer speed.',
    },
    {
      title: '3. University Computer Lab PXE Network Booting (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata enabled PXE Boot ROM on 80 client desktop NICs in Kolkata. Students boot into standardized Linux lab environments over 1Gbps copper LANs without local hard drives, saving ₹3,20,000 in storage hardware costs.',
      lesson: 'PXE boot chips on NICs eliminate individual hard drive management in computer labs.',
    },
    {
      title: '4. High-Tech Cyber Lab Promiscuous Sniffing Array (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila configured a dedicated 4-port Gigabit NIC in Promiscuous Mode in Jadavpur for ₹12,500, feeding full-duplex traffic to Wireshark and Zeek IDS to detect lateral malware spread across research subnets in real time.',
      lesson: 'Promiscuous mode allows security sensors to inspect all passing packet streams.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes nicPulse25 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-nic25 {
          animation: nicPulse25 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 25
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              NIC • MAC Addressing • PHY/MAC Architecture • Budgeting in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            NIC (Network Interface Card)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Network Interface Cards (NICs)</span>: understanding Layer 1 PHY and Layer 2 MAC controllers, 48-bit MAC address decomposition (OUI vs Device ID), promiscuous sniffing, hardware offloads, and enterprise budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'nic-foundations', label: '1. NIC Architecture' },
              { id: 'interactive-studio', label: '2. NIC Inspector Studio' },
              { id: 'mac-anatomy', label: '3. MAC & Offload Engines' },
              { id: 'svg-anatomy', label: '4. NIC Hardware SVG' },
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

        {/* SECTION 1: NIC Foundations */}
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
                What is a Network Interface Card (NIC)?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Network Interface Card (NIC)</strong>—also referred to as a Network Adapter or LAN Card—is a specialized hardware controller that connects a computer to network transmission media. Operating across <strong className="text-indigo-400">Layer 1 (Physical)</strong> and <strong className="text-emerald-400">Layer 2 (Data Link)</strong>, it translates internal parallel host data into serial physical waveforms (electrical pulses, light signals, or RF waves) and vice-versa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Dual-Layer Bridge</span>
                <p className="text-slate-300 text-xs">PHY transceiver chip handles Layer 1; MAC ASIC handles Layer 2 framing.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Burned-In MAC</span>
                <p className="text-slate-300 text-xs">48-bit globally unique hardware identifier in non-volatile EEPROM.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. DMA Direct Memory</span>
                <p className="text-slate-300 text-xs">Transfers packets directly to host RAM without saturating the CPU.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Hardware Offloads</span>
                <p className="text-slate-300 text-xs">Computes TCP/IP checksums and segments 9KB Jumbo frames at line speed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: NIC Inspector Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-nic25">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Network Interface Card Inspector Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a NIC hardware adapter to inspect bus interface, connector type, MAC address breakdown (OUI vs Serial), hardware offloads, and pricing in <span className="text-emerald-400 font-bold">₹</span>:
            </p>

            {/* NIC Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {nicProfiles.map((nic) => (
                <button
                  key={nic.id}
                  onClick={() => {
                    setActiveNicId(nic.id);
                    setFrameProcessingLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    activeNicId === nic.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {nic.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active NIC Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentNic.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Hardware Cost: {currentNic.estCost}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-amber-400 font-sans font-bold">Rated Wire Speed:</span>
                  <span className="text-slate-200">{currentNic.speed}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Bus Interface & Slot:</span>
                  <span className="text-slate-200">{currentNic.busInterface}</span>
                </div>
              </div>

              {/* MAC Address Breakdown */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2 text-xs font-mono">
                <span className="text-slate-300 font-sans font-bold">48-Bit MAC Address Decomposition:</span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold">
                    OUI Vendor (24-bit): {currentNic.oui}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                    Device Serial (24-bit): {currentNic.serial}
                  </span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Simulate Frame Transmission & PHY Serialization:
                  </span>
                  <button
                    onClick={() => setFrameProcessingLog(currentNic.simulation)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Serialize Frame ▶
                  </button>
                </div>

                {frameProcessingLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    📡 <strong>NIC ASIC Serialization Trace:</strong> {frameProcessingLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MAC & Offload Engines */}
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
                Advanced NIC Operating Modes & Hardware Offload Engines
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">Promiscuous Mode & MAC Security:</span>
                <p className="text-slate-300 text-xs">• Promiscuous Mode passes ALL passing frames to Wireshark/tcpdump.</p>
                <p className="text-slate-300 text-xs">• Switch Port Security limits active MAC addresses to prevent MAC Flooding attacks.</p>
                <p className="text-slate-300 text-xs">• Dynamic ARP Inspection (DAI) blocks malicious MAC spoofing on the wire.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-purple-300 font-sans font-bold">Hardware Performance Offloads:</span>
                <p className="text-slate-300 text-xs">• TCP Segmentation Offload (TSO) breaks large buffers on the card.</p>
                <p className="text-slate-300 text-xs">• 9,000-byte Jumbo Frames slash CPU interrupts during SAN file transfers.</p>
                <p className="text-slate-300 text-xs">• SR-IOV provides direct virtual functions to VMs, bypassing software latency.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: NIC Hardware SVG */}
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
                Internal Hardware Architecture of a Network Interface Card
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Host PCIe Bus */}
                <rect x="20" y="20" width="130" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="85" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. PCIe Host Bus</text>
                <text x="85" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">PCIe x4 / x8 Slot</text>

                <line x1="150" y1="50" x2="190" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* DMA Controller */}
                <rect x="190" y="20" width="140" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="260" y="45" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">2. DMA Controller</text>
                <text x="260" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">RAM Buffer Transfer</text>

                <line x1="330" y1="50" x2="370" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* MAC Controller ASIC & EEPROM */}
                <rect x="370" y="20" width="160" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="450" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. MAC Controller</text>
                <text x="450" y="57" fill="#cbd5e1" fontSize="8" textAnchor="middle">CRC32 • Framing</text>
                <text x="450" y="70" fill="#a7f3d0" fontSize="7" textAnchor="middle">48-Bit MAC EEPROM</text>

                <line x1="530" y1="50" x2="570" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* PHY Chip & Port */}
                <rect x="570" y="20" width="150" height="60" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="645" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. PHY & Connector</text>
                <text x="645" y="57" fill="#cbd5e1" fontSize="8" textAnchor="middle">Signal Transceiver</text>
                <text x="645" y="70" fill="#fde68a" fontSize="7" textAnchor="middle">RJ-45 / SFP+ / Wi-Fi</text>

                {/* Bottom Banner */}
                <rect x="20" y="110" width="700" height="85" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="135" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  OSI LAYER 1 (PHY) & LAYER 2 (MAC) DUAL-LAYER PROCESSING
                </text>
                <text x="370" y="155" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Converts parallel host memory bytes into serialized differential signals • Checks FCS CRC32 error codes
                </text>
                <text x="370" y="175" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Link Aggregation (LACP 802.3ad) • Hardware Interrupt Coalescing • PXE Network Boot ROM
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
                Bengal Operations & Enterprise NIC Case Studies
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
                  trap: 'Assuming MAC Addresses Can Never Be Changed in Network Packets',
                  fix: 'While the hardware EEPROM is permanently burned-in, the operating system driver can spoof the outgoing source MAC address easily.',
                },
                {
                  trap: 'Enabling Jumbo Frames (MTU 9000) on the Server NIC Only',
                  fix: 'Jumbo Frames must be configured across every intermediary switch port and storage target; otherwise packets exceeding 1500 bytes will be dropped.',
                },
                {
                  trap: 'Using Low-End Desktop Realtek NICs in Production High-Throughput Linux Servers',
                  fix: 'Consumer chips lack hardware queues and offload engines, causing heavy CPU interrupt spikes and dropped packets under load.',
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
                  Think of a NIC like a postal passport: the first 24 bits (OUI) state your country/issuing authority (manufacturer), while the last 24 bits are your unique passport serial number!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the status LED on an RJ-45 NIC blinks green when packets are being actively processed by the MAC controller ASIC!
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
                Student Revision Checklist (Topic 25)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined the role and dual-layer operation (Layer 1 PHY / Layer 2 MAC) of a NIC',
                'Broken down the 48-bit MAC address into 24-bit OUI and 24-bit Device Serial',
                'Explained Promiscuous Mode and its role in Wireshark packet capture',
                'Differentiated between Wired Copper, Optical SFP+, Wireless, and Virtual vNICs',
                'Understood advanced features: Checksum Offload, DMA, PXE Boot, and LACP Teaming',
                'Formulated realistic NIC hardware and fiber transceiver budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Network Interface Cards form the critical hardware bridge between software kernels and physical transmission cables. In our next topic (Topic 26), we will explore Transmission Media Overview!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="NIC FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Network Interface Card (NIC) in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic26_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic25;
