// src/components/study/cyber-security/topics/001_001_introduction-to-networking/Topic41.jsx
// React 19 Function-based Component
// Module: 001_001_introduction-to-networking
// Topic 41: Networking in Healthcare

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic41_files/topic41_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic41_files/topic41_note.txt?raw';

const Topic41 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedMedicalId, setSelectedMedicalId] = useState('dicom-pacs');
  const [medicalSimLog, setMedicalSimLog] = useState(null);

  const medicalProfiles = [
    {
      id: 'dicom-pacs',
      name: 'High-Speed 10G MRI/CT DICOM Image Transfer to PACS',
      clinicalUse: 'Neurological Stroke Diagnostic Triage in Barrackpore Hospital',
      networkPath: 'MRI Scanner (10G Fiber) ➔ Medical Core Switch (Jumbo MTU 9000) ➔ 120TB PACS SAN Array',
      protocolPayload: 'DICOM C-STORE (TCP Port 104) • 1.8 GB 3D Uncompressed Volumetric CT Series',
      securityControl: 'Dedicated Storage VLAN 60 + AES-256 Storage Encryption + TLS 1.3 in Transit',
      latencyThroughput: '3.6 Seconds Transfer Time (9.6 Gbps Wire Speed) • Zero Packet Drops',
      estHardwareBudget: '₹8,50,000 (Dual 10G SFP+ Managed Switches & 80TB RAID-6 SAN Storage Array)',
      desc: 'High-speed diagnostic imaging transfer allowing radiologists to load high-resolution MRI scans in seconds.',
      simResult: 'MRI Scanner initiates DICOM C-STORE &rarr; Transmits 1.8GB dataset over MTU 9000 -&gt; PACS confirms C-STORE-RSP (Status: 0x0000 Success in 3.6s).',
    },
    {
      id: '5g-ambulance',
      name: 'Smart 5G Connected Ambulance Real-Time Telemetry to ER',
      clinicalUse: 'Emergency Cardiac Arrest Patient in Transit to Kolkata Trauma Center',
      networkPath: '12-Lead ECG Monitor + 4K Camera ➔ 5G Cellular Bonded Router ➔ Encrypted IPsec ➔ Hospital ER Console',
      protocolPayload: 'Real-Time FHIR JSON Stream + H.265 Ultra-Low Latency Video over WebRTC',
      securityControl: 'Hardware-Encrypted Cellular IPsec VPN + Mutual TLS (mTLS) + GPS Geofencing',
      latencyThroughput: '12 ms RTT Cellular Latency • 50 Mbps Upstream • Zero Radio Dropout',
      estHardwareBudget: '₹1,85,000 (Ruggedized 5G Multi-SIM Gateway & Telemedicine Module)',
      desc: 'Streams live cardiac rhythm and patient telemetry to hospital trauma surgeons before ambulance arrival.',
      simResult: 'Ambulance connects over 5G -> Transmits live 12-lead ECG stream -> ER Cardiologist reviews data -> Prepares Cath Lab before arrival.',
    },
    {
      id: 'iomt-microsegmentation',
      name: 'ICU Medical IoT (IoMT) Infusion Pump & Ventilator Isolation',
      clinicalUse: 'Intensive Care Unit Patient Life-Support in Ichapur Hospital',
      networkPath: 'Smart Infusion Pump / Ventilator ➔ Medical Switch (VLAN 50) ➔ Clinical Central Station',
      protocolPayload: 'HL7 v2.5.1 / FHIR Device Metric Observation over HTTPS (Port 443)',
      securityControl: 'Strict Layer-2/3 Firewall Microsegmentation (Zero Internet Access & Port Whitelisting)',
      latencyThroughput: '&lt; 2 ms Internal Deterministic Latency • 100% Guaranteed SLA',
      estHardwareBudget: '₹3,20,000 (Medical Next-Gen Firewall & Microsegmentation Appliance)',
      desc: 'Isolates critical patient ventilators and pumps into a private zone, blocking lateral malware propagation.',
      simResult: 'Infusion Pump sends drug infusion rate to central console -> Firewall blocks unauthorized lateral scanning -> Patient stays safe.',
    },
    {
      id: 'medjack-defense',
      name: 'Medjack Exploitation Defended by Deep Packet Inspection (DPI)',
      clinicalUse: 'Defending Legacy Blood Gas Analyzer running Embedded Windows XP in Jadavpur',
      networkPath: 'Infected Office Laptop ➔ Tries SMB Port 445 Lateral Pivot ➔ Hospital Next-Gen Firewall DPI',
      protocolPayload: 'Malicious Ransomware SMB Exploit Payload targeting Legacy Medical Terminal',
      securityControl: 'Deep Packet Inspection (DPI) + Virtual Patching + Automated Host Quarantine',
      latencyThroughput: 'Exploit Dropped in 15 Milliseconds • Zero Infection Spread',
      estHardwareBudget: '₹4,50,000 (Enterprise Healthcare Threat Prevention & EDR Sensor)',
      desc: 'Stops attackers from exploiting unpatched legacy medical hardware to steal confidential patient databases.',
      simResult: 'Infected PC initiates SMB exploit to blood analyzer -> NGFW DPI engine detects WannaCry signature -> Drops packet & isolates laptop.',
    },
  ];

  const currentMedical = medicalProfiles.find((m) => m.id === selectedMedicalId) || medicalProfiles[0];

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
      title: '1. Multi-Speciality Hospital 10G PACS & Jumbo Frame Rollout (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu upgraded hospital radiology networks in Barrackpore with dual 10G optical switches and 9000-byte Jumbo Frames for ₹6,50,000. 1.8GB MRI multi-slice image series load on doctor diagnostic workstations in 3.6 seconds, accelerating critical stroke triage decisions.',
      lesson: 'Jumbo Frames (MTU 9000) over 10G storage fabrics eliminate latency bottlenecks for massive radiological imaging.',
    },
    {
      title: '2. Diagnostic Clinic IoMT Infusion Pump Microsegmentation (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima implemented strict VLAN microsegmentation and Next-Gen Firewall policies for 80 smart infusion pumps and patient monitors in Ichapur for ₹2,10,000. Isolating medical devices from the general hospital office subnet blocked lateral scanning and unauthorized firmware tampering.',
      lesson: 'Isolating unpatchable biomedical hardware into dedicated VLANs prevents lateral ransomware spread in hospitals.',
    },
    {
      title: '3. State Health Tele-ICU & 5G Ambulance Telemetry (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata engineered a dedicated 5G cellular IPsec and WebRTC tele-ICU network in Kolkata for ₹4,80,000. Senior intensivist doctors in Kolkata monitor rural district ICU ventilators and review live ECG waveforms from transit ambulances in real time with sub-15ms latency.',
      lesson: '5G cellular IPsec links and WebRTC video enable life-saving real-time remote intensive care and ambulance triage.',
    },
    {
      title: '4. Cyber Security Lab Medical Device DPI & Ransomware Audit (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila audited medical IoT security in Jadavpur for ₹1,15,000 using Deep Packet Inspection (DPI). DPI detected and neutralized an unpatched buffer overflow vulnerability in legacy blood analyzer firmware, establishing an air-gapped immutable backup vault for patient records.',
      lesson: 'Deep Packet Inspection and immutable offline backups protect hospital patient records from destructive cyber attacks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes medPulse41 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-med41 {
          animation: medPulse41 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_001 • Topic 41
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security & Networking Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Networking in Healthcare • DICOM/PACS • IoMT • FHIR & Telemedicine in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Networking in Healthcare
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Hospital & Healthcare Information Networking</span>: mastering DICOM/PACS imaging over 10G Jumbo-Frame fabrics, HL7/FHIR clinical APIs, Medical IoT (IoMT) biomedical microsegmentation, 5G smart ambulance telemetry, Medjack defense, and healthcare hardware budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'med-foundations', label: '1. Healthcare Network Pillars' },
              { id: 'interactive-studio', label: '2. Clinical Simulator' },
              { id: 'clinical-protocols', label: '3. Medical Protocol Matrix' },
              { id: 'svg-hospital', label: '4. Hospital Architecture SVG' },
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

        {/* SECTION 1: Healthcare Network Pillars */}
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
                Why is Networking Mission-Critical in Healthcare?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Healthcare networking directly impacts human lives. In a modern hospital, networks transport life-critical patient ECG telemetry, multi-gigabyte MRI/CT radiological imaging (DICOM/PACS), real-time ventilator adjustments, electronic health records (FHIR), and 5G emergency trauma video feeds. Zero-downtime reliability, ultra-low latency, and ironclad biomedical cybersecurity are non-negotiable requirements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. DICOM & 10G PACS</span>
                <p className="text-slate-300 text-xs">High-throughput radiological storage with 9000-byte Jumbo Frames loading scans in seconds.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. IoMT Segmentation</span>
                <p className="text-slate-300 text-xs">Isolates unpatchable infusion pumps and ICU ventilators from general office subnets.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. 5G Smart Ambulance</span>
                <p className="text-slate-300 text-xs">Streams 12-lead ECGs and patient vitals to emergency room doctors before hospital arrival.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. HIPAA Privacy (₹)</span>
                <p className="text-slate-300 text-xs">Protects patient records with end-to-end AES-256 encryption and air-gapped backups.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Clinical Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-med41">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Hospital Medical Network & PACS Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a clinical healthcare network scenario to inspect data flows, protocol payloads, biomedical isolation rules, and simulated emergency execution:
            </p>

            {/* Medical Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {medicalProfiles.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMedicalId(m.id);
                    setMedicalSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedMedicalId === m.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {m.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Medical Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentMedical.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Infrastructure Budget: {currentMedical.estHardwareBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Clinical Context & Medical Goal:</span>
                <span className="text-sky-300 font-bold">{currentMedical.clinicalUse}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Network Path Routing:</span>
                <span className="text-slate-300">{currentMedical.networkPath}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Protocol & Payload:</span>
                  <span className="text-purple-300 font-bold">{currentMedical.protocolPayload}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Security Isolation Guard:</span>
                  <span className="text-rose-300 font-bold">{currentMedical.securityControl}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans">Latency & Throughput:</span>
                  <span className="text-emerald-300 font-bold" dangerouslySetInnerHTML={{ __html: currentMedical.latencyThroughput }} />
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Clinical Workflow & Emergency Telemetry:
                  </span>
                  <button
                    onClick={() => setMedicalSimLog(currentMedical.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Execute Medical Simulation ▶
                  </button>
                </div>

                {medicalSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🏥 <strong>Hospital Clinical Telemetry:</strong> {medicalSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Medical Protocol Matrix */}
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
                Healthcare Standards & Medical Protocol Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Medical Standard</th>
                    <th className="p-2.5 text-sky-400">Transport & Port</th>
                    <th className="p-2.5 text-amber-400">Clinical Function in Hospital</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">DICOM C-STORE</td>
                    <td className="p-2.5 text-sky-300">TCP Port 104</td>
                    <td className="p-2.5">High-resolution radiological imaging transfer (MRI, X-ray, 3D CT)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">HL7 FHIR</td>
                    <td className="p-2.5 text-sky-300">HTTPS Port 443 (JSON REST API)</td>
                    <td className="p-2.5">Interoperable electronic health records (EHR), lab orders, and vital signs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">HL7 v2.x (MLLP)</td>
                    <td className="p-2.5 text-sky-300">TCP Ports 2575 / 5000+</td>
                    <td className="p-2.5">Legacy clinical event notifications (Patient Admission ADT, Lab Results ORU)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">WebRTC / H.265</td>
                    <td className="p-2.5 text-sky-300">UDP SRTP (Ports 50000+)</td>
                    <td className="p-2.5">Real-time Tele-ICU video consultations and 5G ambulance streaming</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Hospital Architecture SVG */}
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
                Multi-Tier Hospital Network Hierarchy & PACS / IoMT Isolation Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Tier 1: IoMT Life Support */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="100" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">1. IOMT LIFE-SUPPORT</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">ICU Ventilators • Infusion Pumps</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Isolated VLAN 50 (Zero Internet)</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 2: 10G PACS Radiology */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="280" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">2. 10G PACS RADIOLOGY</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">MRI / CT Scanners • 120TB SAN</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Jumbo Frames (MTU 9000)</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 3: Core EHR & Telemedicine */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="42" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. HOSPITAL CORE EHR</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">FHIR APIs • Tele-ICU Command</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Mutual TLS + EDR Protection</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Tier 4: 5G Ambulance Gateway */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="640" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">4. 5G AMBULANCE UPLINK</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">12-Lead ECG • Live Video</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Encrypted Cellular IPsec</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  HEALTHCARE SECURITY PRINCIPLE: BIOMEDICAL ISOLATION ➔ IMMUTABLE AIR-GAPPED RANSOMWARE DEFENSE
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  DICOM TCP Port 104 • HL7 FHIR REST APIs • 802.11r Medical Cart Fast Roaming (&lt; 50ms) • Sub-10ms Robotic Surgery
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Deep Packet Inspection (DPI) • Medical 10G PACS & IoMT Firewall Appliances (₹8,50,000 Setup)
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
                Bengal Operations & Healthcare Infrastructure Case Studies
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
                  trap: 'Placing Legacy Unpatchable Medical Devices Directly on the Open Hospital Office Subnet',
                  fix: 'Biomedical devices running legacy OS versions cannot be patched. Always isolate infusion pumps and ventilators into locked IoMT VLANs with zero internet access.',
                },
                {
                  trap: 'Neglecting 9000-Byte Jumbo Frames on High-Throughput Radiology PACS Networks',
                  fix: 'Standard 1500-byte MTUs create severe CPU interrupt overhead during 2GB 3D CT scan transfers. Enable Jumbo Frames across all imaging switches and SAN arrays.',
                },
                {
                  trap: 'Failing to Maintain Air-Gapped Immutable Offline Backups for Patient Electronic Health Records',
                  fix: 'Online network-attached backups are encrypted by modern ransomware. Maintain offline air-gapped immutable WORM copies to guarantee rapid recovery without ransom.',
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
                  Think of hospital network segmentation like an Intensive Care sterile quarantine ward: life-support equipment is kept in isolated cleanrooms where contamination from outside office computers cannot enter!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how 802.11r fast-roaming allows mobile nursing carts to roam between hospital corridor APs in under 50ms without disconnecting active patient chart entries!
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
                Student Revision Checklist (Topic 41)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped DICOM imaging protocols (TCP Port 104) and 10G PACS storage architectures',
                'Evaluated HL7 and FHIR RESTful JSON APIs with Mutual TLS (mTLS) security',
                'Configured Medical IoT (IoMT) VLAN microsegmentation for life-support devices',
                'Analyzed 5G smart ambulance telemetry and sub-50ms 802.11r Wi-Fi fast roaming',
                'Defended against Medjack and hospital ransomware with air-gapped immutable backups',
                'Formulated realistic hospital PACS and medical network budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Healthcare networks preserve human life through low-latency telemetry and biomedical isolation. In our next topic (Topic 42), we will explore Networking in Government in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Networking in Healthcare FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Networking in Healthcare in Computer Networks"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic42_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic41;
