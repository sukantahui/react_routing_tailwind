// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic40.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 40: Networking in Education

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic40_files/topic40_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic40_files/topic40_note.txt?raw';

const Topic40 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedEduId, setSelectedEduId] = useState('eduroam-wifi');
  const [eduSimLog, setEduSimLog] = useState(null);

  const eduProfiles = [
    {
      id: 'eduroam-wifi',
      name: 'High-Density Auditorium Wi-Fi 6 & Eduroam Roaming',
      context: 'Auditorium in Kolkata (350 Concurrent Laptops & Phones)',
      networkPath: 'Student Device ➔ Wi-Fi 6 AP (OFDMA) ➔ Campus Controller ➔ National RADIUS Proxy ➔ Home Campus',
      vlanQos: 'VLAN 30 (Eduroam) • WPA3 Enterprise • 20 Mbps Guaranteed QoS per client',
      securityControl: '802.1X EAP-TTLS/PEAP cryptographic authentication with zero cleartext sniffing.',
      estHardwareBudget: '₹4,20,000 (Campus Hardware Wi-Fi Controller & 30 AP Stack)',
      desc: 'Seamless international wireless roaming allowing visiting researchers to connect instantly with home credentials.',
      simResult: 'Visiting Scholar logs into "eduroam" → EAP Request proxied to IIT Kharagpur RADIUS → Access Granted in 320ms.',
    },
    {
      id: 'cbt-exam-lockdown',
      name: 'Secure Computer-Based Testing (CBT) Online Examination Center',
      context: '120-Seat University Medical Entrance Examination Hall in Ichapur',
      networkPath: 'Exam Terminal ➔ Locked Access Switch (VLAN 40) ➔ Internal Exam Server (No Internet)',
      vlanQos: 'VLAN 40 (Air-Gapped / Egress-Blocked) • Full Gigabit Wire Rate to Local Exam DB',
      securityControl: 'Safe Exam Browser (SEB) client locks desktop; firewall drops all external WAN traffic.',
      estHardwareBudget: '₹1,45,000 (Managed 48-Port Switch Stack & Dual Local Assessment Servers)',
      desc: 'Tamper-proof examination environment preventing web searching, USB cheating, and unauthorized communication.',
      simResult: 'Examinee launches SEB → Firewall blocks external web requests → Local exam paper loads securely → 0 Cheating Vectors.',
    },
    {
      id: 'result-portal-surge',
      name: 'Semester Result Publication Surge with Cloud CDN Caching',
      context: 'University Examination Portal in Barrackpore (450,000 Concurrent Hits)',
      networkPath: 'Student Browser ➔ Cloudflare Edge CDN ➔ Virtual Waiting Room ➔ Origin NGINX ➔ Sharded DB',
      vlanQos: 'Cloud Ingress 100 Gbps • &lt; 5 ms Cached Scorecard Delivery • 99.99% Availability',
      securityControl: 'Queue-It Virtual Waiting Room + Cloudflare DDoS Scrubbing + Captcha Protection',
      estHardwareBudget: '₹85,000 / month (Cloud CDN & Auto-Scaling Result Server Farm)',
      desc: 'High-concurrency cloud architecture absorbing massive traffic spikes during semester score releases.',
      simResult: '450K students query results at 12:00 PM → CDN serves 99.1% of scorecards from cache → Origin DB load stays at 12%.',
    },
    {
      id: 'hpc-research-cluster',
      name: 'University AI & Supercomputing Research Cluster (NKN Link)',
      context: 'Computational Physics & AI Laboratory in Jadavpur (64 GPU Nodes)',
      networkPath: 'Compute Node ➔ 100G InfiniBand / RoCE Fabric ➔ Storage NAS ➔ 10 Gbps NKN Fiber Uplink',
      vlanQos: 'VLAN 70 (HPC Cluster) • Sub-Microsecond RDMA Latency • 10 Gbps NKN Dedicated Uplink',
      securityControl: 'Strict Perimeter Bastion Host + MFA for SSH Access + Quarantined Sandbox Subnet',
      estHardwareBudget: '₹4,20,000 (100G RoCE Switch Fabric & NKN Gateway Router)',
      desc: 'High-performance computing cluster processing complex molecular modeling and AI training datasets.',
      simResult: 'MPI job dispatched across 64 GPU nodes → RoCE fabric delivers 0.8μs inter-node latency → Simulation finished in 4 hours.',
    },
  ];

  const currentEdu = eduProfiles.find((e) => e.id === selectedEduId) || eduProfiles[0];

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
      title: '1. Engineering College Wi-Fi 6 & Eduroam Deployment (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu deployed 45 enterprise Wi-Fi 6 Access Points and an Eduroam RADIUS gateway across an engineering campus in Barrackpore for ₹3,80,000. Over 2,400 students and visiting IIT faculty experience seamless high-speed roaming across academic blocks and research laboratories.',
      lesson: 'Eduroam with Wi-Fi 6 OFDMA provides scalable, zero-friction wireless access across academic institutions.',
    },
    {
      title: '2. Medical College Online CBT Examination Center (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima configured a locked 120-seat Computer-Based Testing (CBT) examination center in Ichapur for ₹1,45,000. Firewall rules restrict examination terminals strictly to the local assessment server, while Safe Exam Browser blocks unauthorized internet searches during university medical exams.',
      lesson: 'VLAN isolation and Safe Exam Browser enforce bulletproof exam integrity during high-stakes assessments.',
    },
    {
      title: '3. University Result Publishing Cloud CDN Architecture (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata architected a Cloudflare CDN edge caching and virtual waiting room solution in Kolkata for ₹85,000. When 450,000 students accessed semester results simultaneously, 99.1% of traffic was served from regional edge caches, keeping origin database CPU utilization under 15%.',
      lesson: 'Cloud CDN caching and virtual waiting rooms protect origin databases from catastrophic surge crashes.',
    },
    {
      title: '4. Cyber Security Lab HPC Research Cluster Isolation (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila engineered an isolated 100G RoCE supercomputing research cluster in Jadavpur for ₹4,20,000. The network provides sub-microsecond latency for AI training and molecular simulation, while strict boundary firewalls block unauthorized external access from public campus Wi-Fi networks.',
      lesson: 'Supercomputing clusters require dedicated high-speed low-latency fabrics isolated behind bastion gateways.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes eduPulse40 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-edu40 {
          animation: eduPulse40 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 40
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Networking in Education • Campus LANs • NKN • Eduroam & CBT in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Networking in Education
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Educational & Academic Campus Networking</span>: mastering National Knowledge Network (NKN) uplinks, global Eduroam 802.1X roaming, secure Computer-Based Testing (CBT) examination center design, high-density Wi-Fi 6 auditoriums, and campus network budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'edu-foundations', label: '1. Academic Network Pillars' },
              { id: 'interactive-studio', label: '2. Campus Simulator' },
              { id: 'ssid-matrix', label: '3. Multi-SSID & VLAN Matrix' },
              { id: 'svg-campus', label: '4. Campus Hierarchy & NKN SVG' },
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

        {/* SECTION 1: Academic Network Pillars */}
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
                How Does Computer Networking Transform Education?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Modern academic institutions rely on high-speed, secure, and resilient network fabrics. From gigabit National Knowledge Network (NKN) research uplinks to high-density Wi-Fi 6 auditoriums, global Eduroam wireless roaming, secure online computer-based examination centers, and supercomputing clusters, networking underpins modern learning, research, and university administration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. NKN Optical Uplink</span>
                <p className="text-slate-300 text-xs">National Knowledge Network providing 1G-10G ultra-low latency research backbones.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Global Eduroam</span>
                <p className="text-slate-300 text-xs">802.1X RADIUS federation allowing seamless secure wireless roaming worldwide.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. CBT Exam Security</span>
                <p className="text-slate-300 text-xs">Locked exam VLANs with Safe Exam Browser preventing cheating during online tests.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Wi-Fi 6 & QoS (₹)</span>
                <p className="text-slate-300 text-xs">High-density APs supporting 350+ clients per auditorium with fair bandwidth quotas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Campus Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-edu40">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Campus Educational Network & CBT Exam Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select an educational network deployment to inspect network routes, VLAN security scoping, bandwidth quotas, and simulated exam/roaming telemetry:
            </p>

            {/* Edu Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {eduProfiles.map((e) => (
                <button
                  key={e.id}
                  onClick={() => {
                    setSelectedEduId(e.id);
                    setEduSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedEduId === e.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {e.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Edu Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentEdu.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Infrastructure Budget: {currentEdu.estHardwareBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Academic Context & Scale:</span>
                <span className="text-sky-300 font-bold">{currentEdu.context}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Network Path Routing:</span>
                <span className="text-slate-300">{currentEdu.networkPath}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">VLAN & QoS Allocation:</span>
                  <span className="text-slate-300" dangerouslySetInnerHTML={{ __html: currentEdu.vlanQos }} />
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Security & Compliance Guard:</span>
                  <span className="text-slate-300">{currentEdu.securityControl}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Campus Operational & Policy Audit:
                  </span>
                  <button
                    onClick={() => setEduSimLog(currentEdu.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  >
                    Execute Campus Network Audit ▶
                  </button>
                </div>

                {eduSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🎓 <strong>Campus Network Telemetry:</strong> {eduSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Multi-SSID & VLAN Matrix */}
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
                Campus Multi-SSID & VLAN Segmentation Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">SSID Name</th>
                    <th className="p-2.5 text-sky-400">VLAN ID & Security</th>
                    <th className="p-2.5 text-amber-400">Access Scope</th>
                    <th className="p-2.5 text-emerald-400">Bandwidth Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Campus-Faculty</td>
                    <td className="p-2.5 text-sky-300">VLAN 10 • WPA3 Enterprise (802.1X)</td>
                    <td className="p-2.5">Intranet, Gradebook, ERP, Full Internet</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Uncapped High Priority (DSCP EF)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Campus-Student</td>
                    <td className="p-2.5 text-sky-300">VLAN 20 • 802.1X PEAP / Portal</td>
                    <td className="p-2.5">LMS, Digital Library, Filtered Internet</td>
                    <td className="p-2.5 text-amber-300">5 GB / Day Quota (Throttled to 1M)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Eduroam</td>
                    <td className="p-2.5 text-sky-300">VLAN 30 • 802.1X RADIUS Proxy</td>
                    <td className="p-2.5">Research databases & Outbound Internet</td>
                    <td className="p-2.5 text-emerald-300">20 Mbps per client guaranteed</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Campus-Guest</td>
                    <td className="p-2.5 text-sky-300">VLAN 90 • Captive Portal (Mobile OTP)</td>
                    <td className="p-2.5">Isolated Internet ONLY (No Intranet)</td>
                    <td className="p-2.5 text-rose-300">5 Mbps capped (60 min session timeout)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Campus Hierarchy & NKN SVG */}
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
                Campus Multi-Building Hierarchy & National Knowledge Network (NKN) Uplink
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Academic Buildings / Classrooms */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. ACADEMIC BLOCKS</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Smart Classrooms • CBT Labs</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Wi-Fi 6 APs + PoE+ Switches</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Building Distribution Layer */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="280" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. DISTRIBUTION LAYER</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Inter-VLAN Routing • ACLs</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">10G LACP Optical Trunk</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Central Data Center & Core */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. CAMPUS CORE & DC</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">RADIUS • LMS • HPC Cluster</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Dual Redundant Core Switches</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* NKN / Internet Gateway */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="640" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">4. NKN FIBER GATEWAY</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">10 Gbps NKN Direct Link</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Layer 7 UTM & Content Filter</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  CAMPUS NETWORK GOVERNANCE: 802.1X WPA3 ENTERPRISE ➔ NKN 10G OPTICAL RESEARCH BACKBONE
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  Eduroam Global RADIUS Roaming • Safe Exam Browser (SEB) CBT Isolation • Cloud CDN Result Surges
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Layer-7 Content Filtering • High-Density Wi-Fi 6 Controller Stacks (₹4,20,000 Setup)
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
                Bengal Operations & Academic Network Case Studies
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
                  trap: 'Deploying Standalone Consumer Wi-Fi Routers in University Auditoriums',
                  fix: 'Consumer routers collapse with more than 30 clients. Deploy centralized enterprise Wi-Fi 6 APs with OFDMA to handle 250+ clients per hall.',
                },
                {
                  trap: 'Conducting Online Examinations on Open, Unrestricted Academic Subnets',
                  fix: 'Open subnets allow examinees to cheat via messaging apps and Google. Isolate exam terminals into locked VLANs using Safe Exam Browser.',
                },
                {
                  trap: 'Neglecting Content Filtering and Bandwidth Quota Management on Student Hostels',
                  fix: 'A few students downloading unthrottled torrents can consume the entire campus pipe. Enforce Layer-7 application limits and daily data quotas.',
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
                  Think of Eduroam like a global university student ID card: wherever you travel in the academic world, the host campus recognizes your home university credentials without issuing a local temporary pass!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Cloud CDN edge caching absorbs 99% of traffic surges during board examination result publication, protecting origin servers from crashing!
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
                Student Revision Checklist (Topic 40)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped National Knowledge Network (NKN) architecture and campus fiber backbones',
                'Evaluated Eduroam global 802.1X RADIUS federation and WPA3 Enterprise encryption',
                'Configured secure Computer-Based Testing (CBT) examination networks with Safe Exam Browser',
                'Scaled Learning Management Systems (LMS) with Kubernetes, Redis, and Cloud CDNs',
                'Mitigated rogue DHCP servers, Wi-Fi tethers, and result publishing traffic surges',
                'Formulated realistic campus Wi-Fi 6 and CBT examination budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Academic networks nurture knowledge and global scientific collaboration. In our next topic (Topic 41), we will explore Networking in Healthcare in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Networking in Education FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Networking in Education in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic41_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic40;
