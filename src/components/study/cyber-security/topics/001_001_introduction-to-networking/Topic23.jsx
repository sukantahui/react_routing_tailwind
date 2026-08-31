// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic23.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 23: Server

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic23_files/topic23_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic23_files/topic23_note.txt?raw';

const Topic23 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeServerId, setActiveServerId] = useState('web');
  const [simulatedResponse, setSimulatedResponse] = useState(null);

  const serverTypes = [
    {
      id: 'web',
      name: 'Web Server',
      ports: 'Port 80 (HTTP) / Port 443 (HTTPS/TLS)',
      software: 'Nginx, Apache HTTP Server, Microsoft IIS, Caddy',
      specs: '16 vCPU, 32GB RAM, 500GB NVMe SSD, 10Gbps NIC',
      desc: 'Listens for HTTP/HTTPS requests from client web browsers, terminates SSL/TLS, and serves HTML/CSS/JS or API endpoints.',
      securityFocus: 'HTTPS certificates (Let’s Encrypt), rate limiting, Web Application Firewall (WAF).',
      estCost: '₹80,000 – ₹1,80,000 (Hardware/Cloud VM)',
      actionTrace: 'Client GET /index.html → TLS 1.3 Handshake → Nginx serves cached static asset in 2.4ms.',
    },
    {
      id: 'database',
      name: 'Database Server',
      ports: 'Port 3306 (MySQL) / Port 5432 (PostgreSQL) / Port 1521 (Oracle)',
      software: 'PostgreSQL, MySQL Enterprise, MongoDB, Oracle DB',
      specs: '32 Core CPU, 128GB ECC RAM, 4x2TB NVMe RAID-10',
      desc: 'Stores and queries structured relational and document data with ACID transaction compliance, indexing, and automated snapshot backups.',
      securityFocus: 'Bound to private subnet IP, encrypted tablespaces (TDE), database user privilege isolation.',
      estCost: '₹2,50,000 – ₹6,00,000',
      actionTrace: 'App Server Query SELECT * FROM students → Query Optimizer → Indexed lookup returned in 0.8ms.',
    },
    {
      id: 'file',
      name: 'File & Storage Server (NAS/SAN)',
      ports: 'Port 445 (SMB/CIFS) / Port 2049 (NFS) / Port 22 (SFTP)',
      software: 'TrueNAS, Synology DSM, Windows Server Storage, Samba',
      specs: '8 Core CPU, 64GB ECC RAM, 8x8TB Enterprise SAS RAID-6',
      desc: 'Provides centralized multi-terabyte file sharing, departmental quotas, volume snapshots, and automated offsite cloud replication.',
      securityFocus: 'NTFS/POSIX Access Control Lists, encryption-at-rest (AES-256), immutable ransomware snapshots.',
      estCost: '₹1,50,000 – ₹4,50,000',
      actionTrace: 'Client maps network drive Z: → Kerberos ticket check → Grants Read/Write to /finance/2026.',
    },
    {
      id: 'dns',
      name: 'DNS & DHCP Server',
      ports: 'Port 53 (DNS UDP/TCP) / Ports 67, 68 (DHCP UDP)',
      software: 'BIND9, CoreDNS, Unbound, Kea DHCP, Microsoft DNS',
      specs: '4 Core CPU, 16GB RAM, Dual Gigabit NICs',
      desc: 'Resolves domain names to IP addresses in sub-milliseconds and automatically leases IP configurations to newly connected clients.',
      securityFocus: 'DNSSEC validation, protection against DNS Amplification and Cache Poisoning.',
      estCost: '₹60,000 – ₹1,20,000',
      actionTrace: 'Client requests lease → DHCP DORA process → Assigns 192.168.10.45, Gateway: 192.168.10.1.',
    },
    {
      id: 'reverse-proxy',
      name: 'Reverse Proxy & Load Balancer',
      ports: 'Ports 80, 443 (Edge Public Gateway)',
      software: 'HAProxy, Nginx Plus, Traefik, Envoy, F5 BIG-IP',
      specs: '16 vCPU, 32GB RAM, Dual 10G/25G SFP+ NICs',
      desc: 'Shields backend servers by terminating incoming traffic, distributing loads via Least Connections/Round Robin, and blocking DDoS.',
      securityFocus: 'DDoS throttling, IP reputation filtering, SSL/TLS offloading, hidden backend IP topology.',
      estCost: '₹1,20,000 – ₹3,50,000',
      actionTrace: '45,000 simultaneous connections → Load balancer routes evenly across Web Node 1, 2, and 3.',
    },
  ];

  const currentServer = serverTypes.find((s) => s.id === activeServerId) || serverTypes[0];

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
      title: '1. Precision Foundry ERP Server Deployment (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu commissioned a 2U rack server with dual Intel Xeon CPUs, 128GB ECC RAM, and a 4x2TB NVMe RAID-10 array in Barrackpore for ₹3,80,000. It processes real-time inventory and machine telemetry for 200 factory workstations with 99.99% uptime.',
      lesson: 'Dual Xeon CPUs and RAID-10 NVMe drives prevent database I/O bottlenecks in factory operations.',
    },
    {
      title: '2. Multi-Speciality Clinic Patient Records Server (Mahima)',
      lead: 'Mahima (Healthcare Network Director - Ichapur)',
      desc: 'Mahima deployed an on-premise Electronic Health Records (EHR) database server in Ichapur. Configured with daily encrypted backups, PostgreSQL on isolated private VLANs, and dual power supplies for ₹2,90,000, ensuring patient history is protected against data loss.',
      lesson: 'Isolating database servers inside private subnets protects confidential healthcare records.',
    },
    {
      title: '3. University Examination Portal Load-Balanced Cluster (Mamata)',
      lead: 'Mamata (Academic IT Administrator - Kolkata)',
      desc: 'Mamata deployed a high-availability server cluster in Kolkata featuring two Nginx reverse proxies and three application nodes (₹6,50,000 total). It handled 45,000 simultaneous student result downloads on exam release day with zero latency degradation.',
      lesson: 'Reverse proxy load balancers shield backend application servers from traffic spikes.',
    },
    {
      title: '4. Educational High-Tech AI Model Training Server (Abhronila)',
      lead: 'Abhronila (Research IT Specialist - Jadavpur)',
      desc: 'Abhronila configured a GPU-accelerated compute server with dual AMD EPYC processors and four enterprise GPUs in Jadavpur for ₹12,00,000. Researchers execute machine learning simulations continuously with remote out-of-band management.',
      lesson: 'Out-of-band management (iDRAC/iLO) allows remote headless administration 24/7.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes serverPulse23 {
          0%, 100% { border-color: rgba(14, 165, 233, 0.3); }
          50% { border-color: rgba(14, 165, 233, 0.8); }
        }
        .glow-server23 {
          animation: serverPulse23 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 23
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Server Architecture • Types • Virtualization • Hardening in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Server
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Enterprise Server Architecture & Systems</span>: understanding Web, Database, File, DNS, and Reverse Proxy Servers, hardware redundancy (ECC, RAID, RPS), virtualization, and cybersecurity hardening with budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'server-foundations', label: '1. Server Architecture' },
              { id: 'interactive-studio', label: '2. Server Stack Studio' },
              { id: 'hardware-redundancy', label: '3. Redundancy & Virtualization' },
              { id: 'svg-farm', label: '4. Server Farm SVG' },
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

        {/* SECTION 1: Server Architecture Foundations */}
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
                What is a Server in Computer Networking?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong className="text-sky-400">Server</strong> is a specialized high-performance computer hardware platform or software daemon engineered to listen for, process, and respond to incoming network requests from multiple client devices (desktops, laptops, smartphones). Unlike standard consumer PCs, servers are built for continuous 24/7/365 availability, massive multi-threaded concurrency, and extreme hardware redundancy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. 24/7/365 Availability</span>
                <p className="text-slate-300 text-xs">Engineered for zero downtime with redundant hot-swap cooling and dual power supplies.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">2. ECC Memory Protection</span>
                <p className="text-slate-300 text-xs">Detects and corrects single-bit RAM errors in real time, preventing kernel crashes.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Hardware RAID Arrays</span>
                <p className="text-slate-300 text-xs">Protects databases and file systems from physical SSD or hard drive failures.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">4. Out-of-Band Remote iLO</span>
                <p className="text-slate-300 text-xs">Remote power cycling and OS installation even when the primary OS is unresponsive.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Server Stack Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-server23">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Enterprise Server Stack Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select an enterprise server role to inspect standard listening ports, software daemons, hardware requirements, security posture, and estimated budgets in <span className="text-emerald-400 font-bold">₹</span>:
            </p>

            {/* Server Type Tabs */}
            <div className="flex flex-wrap gap-2">
              {serverTypes.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setActiveServerId(st.id);
                    setSimulatedResponse(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    activeServerId === st.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {st.name}
                </button>
              ))}
            </div>

            {/* Active Server Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentServer.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Est. Capital Budget: {currentServer.estCost}
                </span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{currentServer.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Standard Ports & Protocol:</span>
                  <span className="text-sky-300 font-bold">{currentServer.ports}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Common Daemon Software:</span>
                  <span className="text-amber-300 font-bold">{currentServer.software}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Recommended Hardware:</span>
                  <span className="text-purple-300 font-bold">{currentServer.specs}</span>
                </div>
              </div>

              {/* Action Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Simulate Client Request-Response Flow:
                  </span>
                  <button
                    onClick={() => setSimulatedResponse(currentServer.actionTrace)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute Client Request ▶
                  </button>
                </div>

                {simulatedResponse && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🚀 <strong>Server Lifecycle Log:</strong> {simulatedResponse}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Redundancy & Virtualization */}
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
                Server Hardware Redundancy & Virtualization
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">Hardware Fault Tolerance Pillars:</span>
                <p className="text-slate-300 text-xs">• 1+1 Hot-Plug Power Supplies connected to separate UPS circuits.</p>
                <p className="text-slate-300 text-xs">• Hardware RAID 10 (Striping + Mirroring) for zero-loss SSD failure recovery.</p>
                <p className="text-slate-300 text-xs">• LACP Link Aggregation bonding dual 10G NICs into a 20G fault-tolerant pipe.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-purple-300 font-sans font-bold">Virtualization & Containers:</span>
                <p className="text-slate-300 text-xs">• Type-1 Bare-Metal Hypervisors (VMware ESXi, Proxmox, KVM) run directly on silicon.</p>
                <p className="text-slate-300 text-xs">• Docker Containers share host kernel, starting in &lt;100ms with megabytes of RAM.</p>
                <p className="text-slate-300 text-xs">• Kubernetes orchestrates automated scaling and self-healing across nodes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Server Farm SVG */}
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
                Multi-Tier Enterprise Server Farm Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Public Clients */}
                <rect x="20" y="20" width="130" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="85" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Public Clients</text>
                <text x="85" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Web & Mobile Apps</text>

                <line x1="150" y1="50" x2="190" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Reverse Proxy / WAF */}
                <rect x="190" y="20" width="150" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="265" y="45" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">Edge Reverse Proxy</text>
                <text x="265" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Nginx / SSL Offload / WAF</text>

                <line x1="340" y1="50" x2="380" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Web & App Tier */}
                <rect x="380" y="20" width="150" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="455" y="45" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">App Cluster (Private)</text>
                <text x="455" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Node.js / Django / Java</text>

                <line x1="530" y1="50" x2="570" y2="50" stroke="#64748b" strokeWidth="2" />

                {/* Database Tier */}
                <rect x="570" y="20" width="150" height="60" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="645" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Database (RAID 10)</text>
                <text x="645" y="65" fill="#a7f3d0" fontSize="8" textAnchor="middle">PostgreSQL / MySQL Cluster</text>

                {/* Bottom Hardening Banner */}
                <rect x="20" y="110" width="700" height="85" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="135" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ENTERPRISE SERVER HARDENING & OUT-OF-BAND GOVERNANCE
                </text>
                <text x="370" y="155" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  SSH Key Authentication Only • UFW Host Firewalls • Fail2ban Brute-Force Defense • Automated Patching
                </text>
                <text x="370" y="175" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Dedicated iDRAC / iLO Management VLAN • Dual Online UPS Backups (₹) • Encrypted Remote Backups
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
                Bengal Enterprise Server Architecture Case Studies
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
                  trap: 'Exposing Database Servers (Port 3306/5432) Directly to the Public Internet',
                  fix: 'Never expose databases publicly. Always bind database daemons to private subnet IP addresses accessible only by application servers.',
                },
                {
                  trap: 'Leaving Default Root Password Authentication Enabled Over SSH',
                  fix: 'Disable password authentication and direct root login in /etc/ssh/sshd_config; enforce public-key authentication with MFA.',
                },
                {
                  trap: 'Building Production Servers with Single Non-ECC Desktop RAM and Single Non-RAID Drives',
                  fix: 'A single flipped bit or disk sector crash will corrupt enterprise databases. Always demand ECC memory and hardware RAID 10.',
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
                  Think of a server like a restaurant kitchen: client waiters bring order tickets (requests), the reverse proxy directs orders to the right chef (application server), and the chef fetches ingredients from the secure storage pantry (database server)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Nginx acts as both a web server (serving HTML) and a reverse proxy (forwarding dynamic requests to Node.js on localhost:3000)!
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
                Student Revision Checklist (Topic 23)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined client-server architecture and the request-response lifecycle',
                'Differentiated server types (Web, Database, File, DNS, DHCP, Reverse Proxy)',
                'Understood server hardware redundancy (ECC RAM, RAID-10, Dual Hot-Plug Power)',
                'Compared Type-1 bare-metal hypervisors (ESXi/KVM) with Containers (Docker)',
                'Applied server hardening techniques (SSH keys, UFW firewall, Fail2ban)',
                'Expressed all enterprise server budgets and hosting costs in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Servers are the powerhouses of the digital economy. Understanding server roles, redundancy, and security hardening is crucial for building robust enterprise infrastructure. In our next topic (Topic 24), we will explore Clients!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Server FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Servers in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic24_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic23;
