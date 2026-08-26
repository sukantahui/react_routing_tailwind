// src/components/study/cyber-security/topics/001_002_cyber-security-definition/Topic6.jsx
// React 19 Function-based Component
// Module: 001_002_cyber-security-definition
// Topic 6: Cyber Threat Landscape

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedActorId, setSelectedActorId] = useState('apt-nation-state');
  const [threatSimLog, setThreatSimLog] = useState(null);

  const threatProfiles = [
    {
      id: 'apt-nation-state',
      name: 'Nation-State Advanced Persistent Threat (APT)',
      motivation: 'Geopolitical Cyber Espionage & Strategic Critical Infrastructure Sabotage',
      attackerProfile: 'Highly funded military intelligence units using custom zero-days and living-off-the-land techniques.',
      mitreTactics: 'T1566 Phishing ➔ T1059.001 PowerShell Execution ➔ T1078 Valid Accounts ➔ T1048 Exfiltration',
      dwellTimeSLA: 'Stealth Dwell Time: 180+ Days • Bypasses Static Antivirus Scanners',
      estBudget: '₹8,50,000 (Commercial CTI Threat Intelligence Feeds & Behavioral EDR Sandboxing)',
      desc: 'Top-tier state-sponsored actors targeting sovereign defense, power grids, and research labs.',
      simResult: 'APT adversary executes stealth memory injection via PowerShell &rarr; EDR flags anomalous IoA behavior -&gt; Blocks C2 beacon in 3.8 seconds.',
    },
    {
      id: 'ecrime-ransomware',
      name: 'Cyber Criminal Syndicates (Ransomware-as-a-Service)',
      motivation: 'Pure Financial Extortion & Cryptocurrency Ransom Extraction',
      attackerProfile: 'Organized e-Crime cartels deploying double extortion ransomware and affiliate networks.',
      mitreTactics: 'T1190 Exploit Public App ➔ T1490 Inhibit System Recovery (vssadmin delete) ➔ T1486 Data Encrypted',
      dwellTimeSLA: 'Fast-Moving: Initial Breach to Domain Ransom within 4 to 12 Hours',
      estBudget: '₹5,20,000 (Endpoint Detection & Response - EDR + Immutable Backup Vault)',
      desc: 'Financially motivated gangs that encrypt enterprise files and threaten public data leaks.',
      simResult: 'Ransomware invokes `vssadmin delete shadows` -> EDR agent intercepts shadow copy tampering -> Terminates process in 1.2s -> 0 Files Encrypted.',
    },
    {
      id: 'insider-threat',
      name: 'Insider Threat: Malicious & Compromised Accounts',
      motivation: 'Financial Gain, Corporate Espionage, Sabotage, or Revenge',
      attackerProfile: 'Authorized employees or contractors abusing legitimate administrative credentials.',
      mitreTactics: 'T1078.002 Domain Accounts ➔ T1005 Data from Local System ➔ T1052.001 Exfiltration over USB',
      dwellTimeSLA: 'Difficult to Detect: Exploits Pre-Existing Legitimate Authorization Access',
      estBudget: '₹4,50,000 (User & Entity Behavior Analytics - UEBA + Endpoint DLP Platform)',
      desc: 'Internal personnel with valid passwords who bypass external perimeter firewalls entirely.',
      simResult: 'Privileged user queries 50,000 customer credit card records at 2:00 AM -> UEBA flags anomaly score 98/100 -> Revokes token in 450ms.',
    },
    {
      id: 'hacktivist-swarm',
      name: 'Hacktivist Collectives & Disinformation Swarms',
      motivation: 'Political Protest, Ideological Agenda, and Social Disruption',
      attackerProfile: 'Decentralized activist groups orchestrating multi-gigabit DDoS attacks and web defacements.',
      mitreTactics: 'T1498 Network Denial of Service ➔ T1491 Web Defacement ➔ T1584 Compromised Infrastructure',
      dwellTimeSLA: 'Loud & Immediate: Aims for Instant Public Visibility and Brand Disruption',
      estBudget: '₹3,80,000 (Cloud-Native BGP Anycast Anti-DDoS Scrubbing & WAF Gateway)',
      desc: 'Ideologically driven groups that overwhelm web servers to send political messages.',
      simResult: 'Hacktivist botnet floods 60 Gbps UDP flood -> Cloud scrubber absorbs volumetric traffic -> Web portal maintains 100% uptime with zero slowdown.',
    },
  ];

  const currentActor = threatProfiles.find((t) => t.id === selectedActorId) || threatProfiles[0];

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
      title: '1. Precision Foundry MITRE ATT&CK TTP Behavioral Mapping (Debangshu)',
      lead: 'Debangshu (Lead Infrastructure Architect - Barrackpore)',
      desc: 'Debangshu mapped foundry network telemetry to the MITRE ATT&CK matrix in Barrackpore for ₹3,80,000. When an adversary attempted LOLBin execution via `certutil.exe`, automated EDR behavioral rules intercepted the technique (T1105 Ingress Tool Transfer) in 8 seconds.',
      lesson: 'Mapping defensive detections to MITRE ATT&CK TTPs catches stealth living-off-the-land attacks.',
    },
    {
      title: '2. Diagnostic Clinic Ransomware RaaS Behavioral Defense (Mahima)',
      lead: 'Mahima (Healthcare Network Coordinator - Ichapur)',
      desc: 'Mahima deployed an advanced EDR and behavioral sandbox solution in Ichapur for ₹4,20,000. When an employee opened a weaponized invoice, the system detected Volume Shadow Copy deletion commands (`vssadmin delete shadows`), terminating the ransomware process before encryption began.',
      lesson: 'Behavioral IoAs intercept ransomware execution before files are locked, rendering new malware signatures irrelevant.',
    },
    {
      title: '3. State Research University STIX/TAXII Threat Feed Ingestion (Mamata)',
      lead: 'Mamata (Campus Systems Administrator - Kolkata)',
      desc: 'Mamata integrated automated STIX/TAXII threat intelligence feeds into university firewalls in Kolkata for ₹5,20,000. The firewall autonomously blocked 14,000 newly active botnet command-and-control IPs streamed in real time from international CERT advisories.',
      lesson: 'Automated CTI feed ingestion updates perimeter blocklists against global emerging threats in real time.',
    },
    {
      title: '4. Cyber Security Lab APT Attribution & Reverse Engineering Sandbox (Abhronila)',
      lead: 'Abhronila (Research Security Specialist - Jadavpur)',
      desc: 'Abhronila established a malware reverse engineering laboratory in Jadavpur for ₹2,40,000. Students dissect live nation-state APT samples in isolated Ghidra sandboxes, extracting custom C2 signatures and authoring YARA rules for national threat intelligence repositories.',
      lesson: 'Malware reverse engineering uncovers hidden adversary infrastructure and powers national proactive defense.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes threatPulse6 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-threat6 {
          animation: threatPulse6 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 1 • Module 001_002 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Cyber Security Fundamentals
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Cyber Threat Landscape • Actor Taxonomy • MITRE ATT&CK & Pyramid of Pain in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Cyber Threat Landscape
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">The Cyber Threat Landscape, Actor Taxonomy & Advanced Threat Intelligence</span>: analyzing Script Kiddies, Hacktivists, e-Crime Syndicates, Insider Threats, Nation-State APTs, David Bianco's Pyramid of Pain, the MITRE ATT&CK matrix, and threat intelligence budgeting in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'threat-foundations', label: '1. Landscape Taxonomy' },
              { id: 'interactive-studio', label: '2. Threat Actor Studio' },
              { id: 'pyramid-matrix', label: '3. Pyramid of Pain Matrix' },
              { id: 'svg-landscape', label: '4. Threat Spectrum SVG' },
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

        {/* SECTION 1: Landscape Taxonomy */}
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
                Understanding the Dynamic Cyber Threat Landscape
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The Cyber Threat Landscape encompasses the complete, evolving spectrum of threat actors, malicious attack vectors, exploit frameworks, and vulnerabilities targeting digital infrastructure globally. Moving beyond reactive signature matching, modern cyber defense requires understanding adversary motivations, tracking tactical TTPs via MITRE ATT&CK, and ascending the Pyramid of Pain to neutralize intrusions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Threat Actors</span>
                <p className="text-slate-300 text-xs">Script Kiddies, Hacktivists, e-Crime cartels, Insiders, and Nation-State APTs.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. MITRE ATT&CK</span>
                <p className="text-slate-300 text-xs">14 tactical adversary objectives from Initial Access to Impact.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-sans font-bold">3. Pyramid of Pain</span>
                <p className="text-slate-300 text-xs">Ascending from trivial hash blocks to tough adversary TTP disruption.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. CTI Automation (₹)</span>
                <p className="text-slate-300 text-xs">STIX/TAXII real-time threat intelligence feeds and behavioral IoA detection.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Threat Actor Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-threat6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Cyber Threat Landscape & Actor Taxonomy Simulator Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select a threat actor profile to inspect adversary motivations, MITRE ATT&CK tactical sequences, dwell time characteristics, and simulated defensive neutralization:
            </p>

            {/* Actor Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {threatProfiles.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedActorId(t.id);
                    setThreatSimLog(null);
                  }}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedActorId === t.id
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                &gt;
                  {t.name.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Active Actor Details */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <h3 className="text-lg font-bold text-white">{currentActor.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  CTI Defense Budget: {currentActor.estBudget}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-slate-400 font-sans">Primary Strategic Motivation:</span>
                <span className="text-sky-300 font-bold">{currentActor.motivation}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1 text-xs font-mono">
                <span className="text-amber-400 font-sans font-bold">Adversary Tradecraft & Profile:</span>
                <span className="text-slate-300">{currentActor.attackerProfile}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-purple-400 font-sans font-bold">MITRE ATT&CK Tactic Chain:</span>
                  <span className="text-slate-300">{currentActor.mitreTactics}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Dwell Time & Speed Characteristic:</span>
                  <span className="text-slate-300">{currentActor.dwellTimeSLA}</span>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                    ⚡ Execute Threat Landscape Attack & Detection Simulation:
                  </span>
                  <button
                    onClick={() => setThreatSimLog(currentActor.simResult)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-all shadow-md shadow-sky-950"
                  &gt;
                    Simulate Threat Actor ▶
                  </button>
                </div>

                {threatSimLog && (
                  <div className="mt-2 p-3 bg-slate-950 rounded-lg border border-sky-800/60 text-xs font-mono text-emerald-300">
                    🎯 <strong>Threat Intelligence Telemetry:</strong> {threatSimLog}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Pyramid of Pain Matrix */}
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
                David Bianco's Pyramid of Pain Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Indicator Level</th>
                    <th className="p-2.5 text-sky-400">Indicator Example</th>
                    <th className="p-2.5 text-rose-400">Attacker Effort to Change</th>
                    <th className="p-2.5 text-emerald-400">Defensive Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">1. Hash Values</td>
                    <td className="p-2.5 text-sky-300">MD5 / SHA-256 binary hash</td>
                    <td className="p-2.5 text-slate-400">Trivial (recompile changes 1 bit)</td>
                    <td className="p-2.5 text-slate-400">Minimal (easily bypassed)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">2. IP Addresses</td>
                    <td className="p-2.5 text-sky-300">C2 IP Address (e.g. 198.51.100.22)</td>
                    <td className="p-2.5 text-amber-300">Easy (switch proxy/VPN server)</td>
                    <td className="p-2.5 text-amber-300">Low (short-term block)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">3. Domain Names</td>
                    <td className="p-2.5 text-sky-300">Phishing / C2 Domain Name</td>
                    <td className="p-2.5 text-amber-300">Simple (register $2 domain or DGA)</td>
                    <td className="p-2.5 text-amber-300">Moderate (DNS sinkholing)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">4. Network Artifacts</td>
                    <td className="p-2.5 text-sky-300">Custom User-Agent, URI structure</td>
                    <td className="p-2.5 text-rose-300">Annoying (must alter C2 protocol code)</td>
                    <td className="p-2.5 text-emerald-300">High (breaks automation)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">5. Tools</td>
                    <td className="p-2.5 text-sky-300">Mimikatz, Cobalt Strike beacon</td>
                    <td className="p-2.5 text-rose-300">Challenging (must write custom tools)</td>
                    <td className="p-2.5 text-emerald-300">Very High (forces R&D delay)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">6. TTPs</td>
                    <td className="p-2.5 text-sky-300">Pass-the-Hash, LOLBin Execution</td>
                    <td className="p-2.5 text-rose-400 font-bold">TOUGH! (must relearn new behavior)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">MAXIMUM (completely neutralizes attack)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Threat Spectrum SVG */}
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
                The Cyber Threat Actor Spectrum & The Pyramid of Pain
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Threat Actor 1: Script Kiddie */}
                <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="100" y="42" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. SCRIPT KIDDIES</text>
                <text x="100" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Automated Tools • Amateurs</text>
                <text x="100" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Blocked by Basic Firewalls</text>

                <line x1="180" y1="55" x2="200" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Threat Actor 2: e-Crime RaaS */}
                <rect x="200" y="20" width="160" height="70" rx="8" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="42" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">2. e-CRIME SYNDICATES</text>
                <text x="280" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Ransomware RaaS • Fraud</text>
                <text x="280" y="73" fill="#a7f3d0" fontSize="7" textAnchor="middle">Defended by EDR + WORM</text>

                <line x1="360" y1="55" x2="380" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Threat Actor 3: Insiders */}
                <rect x="380" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="42" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">3. INSIDER THREATS</text>
                <text x="460" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Valid User Credentials</text>
                <text x="460" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">Defended by UEBA + DLP</text>

                <line x1="540" y1="55" x2="560" y2="55" stroke="#64748b" strokeWidth="2" />

                {/* Threat Actor 4: Nation-State APT */}
                <rect x="560" y="20" width="160" height="70" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="640" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">4. NATION-STATE APT</text>
                <text x="640" y="58" fill="#cbd5e1" fontSize="8" textAnchor="middle">Military-Grade Espionage</text>
                <text x="640" y="73" fill="#fde68a" fontSize="7" textAnchor="middle">MITRE ATT&CK TTP Defense</text>

                {/* Bottom Banner */}
                <rect x="20" y="115" width="700" height="80" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <text x="370" y="140" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ASCENDING THE PYRAMID OF PAIN: DETECTING ADVERSARY BEHAVIOR & TACTICAL TTPs
                </text>
                <text x="370" y="160" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                  STIX/TAXII Threat Ingestion • Living-off-the-Land (LOLBins) Defense • Behavioral Indicators of Attack (IoAs)
                </text>
                <text x="370" y="180" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  Commercial Cyber Threat Intelligence (CTI) & Behavioral EDR Sandboxes (₹5,20,000 Setup)
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
                Bengal Operations & Threat Intelligence Case Studies
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
                  trap: 'Relying Exclusively on Static MD5/SHA-256 File Hashes for Malware Detection',
                  fix: 'Adversaries recompile malware to generate brand-new hashes in seconds (Level 1 of Pyramid of Pain). Detect adversary behavioral TTPs (Level 6).',
                },
                {
                  trap: 'Assuming Antivirus Scanners Catch Living-off-the-Land (LOLBin) Attacks',
                  fix: 'Adversaries use legitimate Windows system binaries (PowerShell, certutil) which traditional antivirus trusts. Deploy behavioral EDR with IoA detection.',
                },
                {
                  trap: 'Ignoring Dwell Time and Waiting for Automated Antivirus Alarms to Trigger',
                  fix: 'Stealth APTs hide for months without triggering alarms. Conduct proactive, hypothesis-driven threat hunting across endpoint telemetry.',
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
                  Think of the Pyramid of Pain like catching a master bank robber: blocking their getaway car license plate (IP address) is easy for them to switch, but blocking their specific safecracking methodology (TTP) stops the robbery completely!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how behavioral Indicators of Attack (IoAs) detect ransomware the exact millisecond it executes `vssadmin delete shadows`, long before any user file is encrypted!
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
                Student Revision Checklist (Topic 6)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped the five major threat actor categories across the Cyber Threat Landscape',
                'Evaluated David Bianco\'s Pyramid of Pain and understood why TTP detection is paramount',
                'Mastered the MITRE ATT&CK matrix structure and mapped enterprise defensive coverage',
                'Differentiated between Indicators of Compromise (IoCs) and Indicators of Attack (IoAs)',
                'Analyzed Living-off-the-Land (LOLBins), Ransomware-as-a-Service (RaaS), and Dwell Time',
                'Formulated realistic enterprise threat intelligence budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Knowing your adversary's motivations and tradecraft transforms reactive defense into proactive threat hunting. In our next topic (Topic 7), we will explore Cyber Crime in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Cyber Threat Landscape FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Cyber Threat Landscape in Cyber Security"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
