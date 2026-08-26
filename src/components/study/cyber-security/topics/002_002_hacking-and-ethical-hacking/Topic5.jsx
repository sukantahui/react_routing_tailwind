import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Studio 1: Grey Hat Ethical Spectrum Scenario State
  const [selectedSpectrumKey, setSelectedSpectrumKey] = useState("unsolicited_vdp");

  // Studio 2: CVD 90-Day Disclosure Timeline State
  const [activeCvdDayIndex, setActiveCvdDayIndex] = useState(0);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_staging");

  // Spectrum Scenarios Data for Studio 1
  const spectrumScenarios = {
    pure_white: {
      key: "pure_white",
      title: "1. Authorized Contract Penetration Test",
      hatType: "White Hat (100% Lawful)",
      icon: "🛡️",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      authorization: "Signed Rules of Engagement (RoE) & Non-Disclosure Agreement",
      malice: "ZERO (100% Defensive Intent)",
      legalityVerdict: "100% LAWFUL (Protected under Contract & Safe Harbor)",
      corporateResponse: "Accept formal final report, remediate verified CVEs, and issue professional consulting invoice payment in ₹ INR."
    },
    unsolicited_vdp: {
      key: "unsolicited_vdp",
      title: "2. Unsolicited Report via security.txt / VDP",
      hatType: "Grey Hat (Borderline / Altruistic)",
      icon: "⚖️",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      authorization: "NO prior contract (Probed live web endpoint via RFC 9116 security.txt policy)",
      malice: "ZERO (Reported privately without leaking data or demanding ransoms)",
      legalityVerdict: "LEGAL GREY AREA (Safe Harbor applies if vendor has a published VDP)",
      corporateResponse: "Triage bug report, verify safe PoC, thank researcher, award discretionary bug bounty (₹25,000 - ₹1,00,000), and release coordinated patch."
    },
    altruistic_worm: {
      key: "altruistic_worm",
      title: "3. Altruistic Vigilante Worm (Linux.Wifatch)",
      hatType: "Grey Hat (Vigilante / Non-Malicious)",
      icon: "🐛",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      authorization: "ZERO Authorization (Autonomous worm propagation across millions of IP addresses)",
      malice: "NONE (Kills malware and secures default passwords, but alters third-party devices)",
      legalityVerdict: "ILLEGAL (Violates IT Act 2000 Section 43/66 & CFAA for unauthorized device modification)",
      corporateResponse: "Dissect binary in sandbox, reverse-engineer propagation logic, and advise customers to update firmware manually."
    },
    public_zero_day_drop: {
      key: "public_zero_day_drop",
      title: "4. Full Disclosure (Immediate Public 0-Day Drop)",
      hatType: "Grey Hat (Disruptive / Aggressive)",
      icon: "📢",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      authorization: "ZERO Authorization",
      malice: "LOW / RECKLESS (Intends to force patch, but leaves all users exposed to Black Hat exploitation)",
      legalityVerdict: "CIVIL & CRIMINAL EXPOSURE (Violates NDA/TOS; risk of lawsuit under IT Act Section 43 for damages)",
      corporateResponse: "Declare emergency Severity 1 incident, deploy immediate WAF hot-patch rules within 2 hours, and notify CERT-In."
    },
    vuln_extortion: {
      key: "vuln_extortion",
      title: "5. Vulnerability Extortion (Demanding Ransom)",
      hatType: "Black Hat (Pure Cybercrime)",
      icon: "💀",
      color: "from-red-600 to-rose-700",
      badgeClass: "bg-red-950 text-red-300 border-red-800",
      authorization: "ZERO Authorization",
      malice: "EXTREME (Financial blackmail under threat of data leakage)",
      legalityVerdict: "SEVERELY CRIMINAL (Extortion IPC 384 + IT Act 2000 Section 66 -> Up to 3-7 Yrs Jail)",
      corporateResponse: "Refuse extortion demand, isolate compromised endpoints, engage specialized forensic negotiators, and file FIR with Cyber Crime Cell."
    }
  };

  const activeSpectrum = spectrumScenarios[selectedSpectrumKey];

  // CVD 90-Day Timeline Data for Studio 2
  const cvdTimelinePhases = [
    {
      day: "Day 00",
      title: "Vulnerability Discovery & Private Encrypted Report",
      icon: "🔍",
      actor: "Security Researcher",
      action:
        "Researcher discovers an unauthenticated IDOR or SQLi flaw, prepares a harmless proof-of-concept (PoC), and submits an encrypted PGP report to the vendor's security team via `security.txt`.",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700"
    },
    {
      day: "Day 01 - 14",
      title: "Vendor Triage & Root Cause Verification",
      icon: "🕵️‍♂️",
      actor: "Enterprise Security Triage Team",
      action:
        "Vendor acknowledges receipt within 48 hours, reproduces the flaw in an isolated staging environment, assigns a tracking CVE ID, and validates CVSS severity with the researcher.",
      badgeClass: "bg-indigo-900/50 text-indigo-300 border-indigo-700"
    },
    {
      day: "Day 15 - 60",
      title: "Patch Engineering & Regression Testing",
      icon: "⚙️",
      actor: "Software Engineering & QA Team",
      action:
        "Developers write the source code fix (e.g. parameterized queries, object-level ACL checks), execute comprehensive regression tests, and backport security patches across supported versions.",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    },
    {
      day: "Day 61 - 90",
      title: "Staged Deployment & Safe Harbor Resolution",
      icon: "🚀",
      actor: "DevOps & Bug Bounty Program Leads",
      action:
        "Security update is deployed globally across cloud clusters and firmware channels. Vendor awards the agreed bug bounty in ₹ INR, invites the researcher to re-test, and agrees on public advisory text.",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    },
    {
      day: "Day 90+",
      title: "Coordinated Public Security Advisory Release",
      icon: "📢",
      actor: "Joint Vendor & Researcher Release",
      action:
        "Joint publication of the official CVE Security Advisory detailing the flaw, remediation instructions for customers, and formal Hall of Fame attribution acknowledging the researcher.",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700"
    }
  ];

  const currentCvdPhase = cvdTimelinePhases[activeCvdDayIndex];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_staging",
      lead: "Mamata",
      role: "Lead Security Operations Manager",
      location: "Kolkata FinTech Startup",
      title: "Unsolicited Staging API Report Handling",
      budget: "₹5,50,000",
      disclosureModel: "Coordinated Vulnerability Disclosure (CVD)",
      dilemma:
        "An independent student researcher discovered an unauthenticated IDOR parameter vulnerability on the company's staging server without holding a prior testing contract.",
      resolution:
        "Because the researcher followed CVD rules and did not download customer records, Mamata validated the bug, awarded a ₹50,000 discretionary bounty, and published a formal RFC 9116 `security.txt` file.",
      metrics: {
        triageSpeed: "< 12 Hours",
        bountyAwarded: "₹50,000 Discretionary Award",
        legalOutcome: "Safe Harbor Granted (No Lawsuit)",
        compliance: "ISO/IEC 29147 Vulnerability Disclosure"
      }
    },
    {
      id: "ichapur_premature",
      lead: "Mahima",
      role: "Chief Hospital Information Officer",
      location: "Ichapur General Hospital",
      title: "Premature 0-Day Blog Drop Response",
      budget: "₹4,20,000",
      disclosureModel: "Emergency Zero-Day Incident Response",
      dilemma:
        "A grey-hat blogger publicly posted an unpatched vulnerability in the hospital's infusion pump controller on Reddit after waiting only 24 hours instead of the standard 90-day CVD window.",
      resolution:
        "Mahima deployed emergency firewall micro-segmentation, notified national CERT-In within 6 hours under statutory directives, and released a vendor firmware update before malicious syndicates could weaponize it.",
      metrics: {
        incidentContainment: "2.5 Hours",
        regulatoryReporting: "CERT-In 6-Hour Directive Met",
        patientSafety: "100% Medical Devices Secured",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_modbus",
      lead: "Debangshu",
      role: "Industrial OT Security Architect",
      location: "Barrackpore Industrial Grid",
      title: "Benign Modbus Port Scanning Survey",
      budget: "₹6,00,000",
      disclosureModel: "NCIIPC Critical Infrastructure Disclosure",
      dilemma:
        "An academic researcher scanned industrial Modbus TCP port 502 across West Bengal IP blocks, sending unsolicited emails warning that power substation interfaces were exposed to the public internet.",
      resolution:
        "Debangshu verified the alert, isolated the exposed substation IP addresses behind hardware VPN tunnels, and educated the researcher on how to route future critical findings lawfully through NCIIPC RVDP.",
      metrics: {
        substationsHardened: "4 Regional 220kV Substations",
        vulnerabilityRemediated: "Modbus 502 Unauthenticated Interface",
        reportingChannel: "Transitioned to NCIIPC RVDP",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_cvd",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Directors",
      location: "Jadavpur University AI Labs",
      title: "University CVD Policy Framework",
      budget: "₹3,80,000",
      disclosureModel: "Academic Coordinated Disclosure Policy",
      dilemma:
        "Creating an institutional framework to guide passionate university students on how to report security vulnerabilities ethically without risking criminal prosecution under IT Act Section 66.",
      resolution:
        "Formulated the Jadavpur Responsible Vulnerability Disclosure Program, providing students with safe-harbor mock targets and establishing direct reporting pipelines to CERT-In and corporate bug bounty programs.",
      metrics: {
        studentsTrained: "250+ BCA & M.Tech Scholars",
        safeHarborPrograms: "12 Partner Enterprise VDPs",
        legalIncidents: "Zero Violations",
        compliance: "University Ethics Committee Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cyber Security Module 002_002 • Topic 5 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hacker Taxonomy: Grey Hat Hackers
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Navigate the ambiguous middle ground of cybersecurity: individuals who probe systems without authorization but without 
            malicious intent. Explore the legal realities under Indian IT Act 2000 Section 66, iconic case studies (Khalil Shreateh, Linux.Wifatch), 
            and the 90-day Coordinated Vulnerability Disclosure (CVD) framework.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: The Grey Hat Ethical Spectrum & Legal Risk Evaluator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎭</span> Studio 1: The Grey Hat Ethical Spectrum &amp; Legal Risk Evaluator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Analyze how differing disclosure behaviors determine whether an action is lawful, ethically grey, or outright criminal extortion under cyber law.
            </p>
          </div>

          {/* Spectrum Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {Object.values(spectrumScenarios).map((sc) => {
              const isSelected = selectedSpectrumKey === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedSpectrumKey(sc.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{sc.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{sc.title.split(". ")[1]}</div>
                  <div className={clsx("mt-1 text-[10px] px-1.5 py-0.5 rounded border inline-block", sc.badgeClass)}>
                    {sc.hatType.split(" (")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Spectrum Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeSpectrum.badgeClass)}>
                  {activeSpectrum.hatType}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeSpectrum.title}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Legal Classification</span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-300">{activeSpectrum.legalityVerdict.split(" (")[0]}</span>
              </div>
            </div>

            {/* Authorization vs Malice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-indigo-300 font-bold uppercase tracking-wider block">Authorization Status</span>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{activeSpectrum.authorization}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Malicious Intent Assessment</span>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{activeSpectrum.malice}</p>
              </div>
            </div>

            {/* Recommended Response */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Recommended Corporate &amp; Legal Response:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeSpectrum.corporateResponse}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Coordinated Vulnerability Disclosure (CVD) 90-Day Timeline Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⏱️</span> Studio 2: Coordinated Vulnerability Disclosure (CVD) 90-Day Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through the industry-standard 90-day CVD lifecycle practiced by Google Project Zero, CERT-In, and ISO/IEC 29147.
            </p>
          </div>

          {/* Timeline Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {cvdTimelinePhases.map((phase, idx) => {
              const isSelected = activeCvdDayIndex === idx;
              return (
                <button
                  key={phase.day}
                  onClick={() => setActiveCvdDayIndex(idx)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] font-mono text-indigo-400 font-bold">{phase.day}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{phase.title.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active CVD Phase Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentCvdPhase.badgeClass)}>
                  {currentCvdPhase.day} • {currentCvdPhase.actor}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentCvdPhase.title}
                </h3>
              </div>
            </div>

            {/* Action Description */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Operational Action &amp; Best Practices</span>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{currentCvdPhase.action}</p>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={activeCvdDayIndex === 0}
                onClick={() => setActiveCvdDayIndex((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-750 disabled:opacity-40 text-gray-300 rounded-lg text-xs font-semibold border border-gray-700 transition"
              >
                ← Previous Stage
              </button>
              <span className="text-xs text-gray-500 font-mono">
                Stage {activeCvdDayIndex + 1} / 5
              </span>
              <button
                disabled={activeCvdDayIndex === cvdTimelinePhases.length - 1}
                onClick={() => setActiveCvdDayIndex((prev) => Math.min(cvdTimelinePhases.length - 1, prev + 1))}
                className="px-3.5 py-1.5 bg-indigo-900/80 hover:bg-indigo-850 disabled:opacity-40 text-indigo-200 rounded-lg text-xs font-semibold border border-indigo-700 transition"
              >
                Next Stage →
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 3-Hat Taxonomy Spectrum and the 90-Day Coordinated Vulnerability Disclosure (CVD) Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: The 3-Hat Taxonomy Spectrum */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🎩</span> Diagram A: The 3-Hat Hacker Taxonomy Spectrum
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* White Hat */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="135" height="260" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="87" y="50" fill="#a7f3d0" fontWeight="bold" textAnchor="middle" fontSize="11">WHITE HAT</text>
                    <text x="87" y="66" fill="#6ee7b7" textAnchor="middle" fontSize="8.5">Ethical / Defensive</text>
                    <line x1="30" y1="80" x2="145" y2="80" stroke="#047857" />
                    <text x="87" y="105" fill="#ffffff" textAnchor="middle" fontSize="8.5">Authorization: YES</text>
                    <text x="87" y="125" fill="#ffffff" textAnchor="middle" fontSize="8.5">Signed RoE</text>
                    <text x="87" y="150" fill="#ffffff" textAnchor="middle" fontSize="8.5">Malice: NONE</text>
                    <text x="87" y="180" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9">100% LAWFUL</text>
                    <text x="87" y="200" fill="#a7f3d0" textAnchor="middle" fontSize="8">Career Pentester</text>
                  </g>

                  {/* Grey Hat */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="20" width="140" height="260" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="50" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="11">GREY HAT</text>
                    <text x="250" y="66" fill="#fde68a" textAnchor="middle" fontSize="8.5">Ambiguous Middle</text>
                    <line x1="190" y1="80" x2="310" y2="80" stroke="#b45309" />
                    <text x="250" y="105" fill="#ffffff" textAnchor="middle" fontSize="8.5">Authorization: NO</text>
                    <text x="250" y="125" fill="#fca5a5" textAnchor="middle" fontSize="8.5">Unauthorized Access</text>
                    <text x="250" y="150" fill="#ffffff" textAnchor="middle" fontSize="8.5">Malice: NONE</text>
                    <text x="250" y="180" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">LEGAL RISK</text>
                    <text x="250" y="200" fill="#fde68a" textAnchor="middle" fontSize="8">VDP / Bug Bounty</text>
                  </g>

                  {/* Black Hat */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="20" width="135" height="260" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="412" y="50" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="11">BLACK HAT</text>
                    <text x="412" y="66" fill="#fca5a5" textAnchor="middle" fontSize="8.5">Malicious Threat</text>
                    <line x1="355" y1="80" x2="470" y2="80" stroke="#b91c1c" />
                    <text x="412" y="105" fill="#ffffff" textAnchor="middle" fontSize="8.5">Authorization: NO</text>
                    <text x="412" y="125" fill="#fca5a5" textAnchor="middle" fontSize="8.5">Illegal Trespass</text>
                    <text x="412" y="150" fill="#f87171" textAnchor="middle" fontSize="8.5">Malice: EXTREME</text>
                    <text x="412" y="180" fill="#ef4444" fontWeight="bold" textAnchor="middle" fontSize="9">SEVERELY CRIMINAL</text>
                    <text x="412" y="200" fill="#fca5a5" textAnchor="middle" fontSize="8">Ransomware / Extort</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.1: The 3-Hat taxonomy spectrum defined by authorization, intent, and legality under cyber law.
              </p>
            </div>

            {/* Diagram 2: The 90-Day CVD Process */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⏱️</span> Diagram B: The 90-Day Coordinated Disclosure Workflow
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">Day 0: Report</text>
                    <text x="85" y="56" fill="#94a3b8" textAnchor="middle" fontSize="8">PGP to security.txt</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan3)" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">Day 1-14: Triage</text>
                    <text x="250" y="56" fill="#c7d2fe" textAnchor="middle" fontSize="8">Verify PoC &amp; Assign CVE</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowCyan3)" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="42" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">Day 15-60: Fix</text>
                    <text x="415" y="56" fill="#fde68a" textAnchor="middle" fontSize="8">Code Patch &amp; Test</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="415" y="132" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="10">Day 61-89: Deploy</text>
                    <text x="415" y="146" fill="#a5f3fc" textAnchor="middle" fontSize="8">Rollout &amp; Award ₹</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowCyan3)" />

                  {/* Step 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="110" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">Day 90: Advisory</text>
                    <text x="250" y="146" fill="#a7f3d0" textAnchor="middle" fontSize="8">Public Joint Advisory</text>
                  </g>

                  {/* Safe Harbor Banner */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="200" width="460" height="85" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="225" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="12">THE POWER OF RESPONSIBLE SAFE HARBOR</text>
                    <text x="250" y="245" fill="#d1fae5" textAnchor="middle" fontSize="9.5">Channeling raw hacker curiosity into legitimate, rewarded white-hat defense</text>
                    <text x="250" y="262" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">Protects good-faith researchers under ISO/IEC 29147 &amp; RFC 9116 security.txt</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 5.2: Coordinated Vulnerability Disclosure (CVD) provides a structured 90-day timeline to protect end users.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Disclosure Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads handle unsolicited reports, premature zero-day drops, and student disclosure policies in Kolkata, Ichapur, Barrackpore, and Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">VDP / Research Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Professional Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-2">
                <h4 className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Disclosure Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Professional Engineering Resolution
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Disclosure Metrics &amp; Compliance Standards
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines to navigate the boundary between research curiosity and legal compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Responsible Researcher Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Check for `security.txt`:</strong> Always look for `/.well-known/security.txt` before sending reports.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Minimal Proof-of-Concept:</strong> Prove execution with `SELECT version()`, never dump customer database tables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Respect 90-Day CVD Grace:</strong> Give engineering teams reasonable time to test and deploy complex fixes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Encrypt with PGP:</strong> Protect sensitive vulnerability reports in transit using the vendor's public key.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Legal &amp; Ethical Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Demanding Money (Extortion):</strong> Conditioning bug reports on payment is a criminal offense under IPC 384.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Public Social Media Drops:</strong> Leaking zero-days on Twitter/Reddit voids all safe harbor protections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Modifying Live User Accounts:</strong> Testing exploits on real customers' profiles (like Khalil Shreateh) violates laws.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Scope Boundaries:</strong> Probing unlisted third-party partner servers without permission.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Corporate Governance Rules
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Publish Legal Safe Harbor:</strong> Explicitly promise not to sue researchers who report in good faith.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Acknowledge within 48h:</strong> Fast triage acknowledgment prevents frustrated researchers from going public.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt ISO/IEC 29147:</strong> Align institutional vulnerability disclosure with international standards.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Honor Researchers Publicly:</strong> Include ethical researchers in your corporate Security Hall of Fame.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize key Grey Hat concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Security Researchers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why good intentions provide zero legal immunity in court: under Section 66 of India's IT Act 2000, unauthorized access is a strict liability offense regardless of your helpful intentions.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the 90-day Coordinated Vulnerability Disclosure (CVD) window strikes a balance: giving vendors time to protect users while guaranteeing the researcher's right to publish findings.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future web development projects, always include an RFC 9116 `security.txt` file at `/.well-known/security.txt` so ethical researchers know exactly how to reach your security team.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Interview Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Grey Hats test without authorization but without malice.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Good intentions do NOT grant legal immunity under IT Act Sec 66.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CVD grants a standard 90-day grace period for vendor patches.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>RFC 9116 standardizes `/.well-known/security.txt`.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Khalil Shreateh proved a Facebook flaw on Zuckerberg's wall.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Safe Harbor policies channel grey hats into white hat careers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Hacker Taxonomy: Grey Hat Hackers FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Hacker Taxonomy: Grey Hat Hackers (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As you develop your technical skills in BCA cybersecurity, you will frequently discover accidental vulnerabilities in everyday websites and portals across West Bengal. Never succumb to the temptation of unauthorized testing or public 0-day drops. Always look for `security.txt`, respect the 90-day Coordinated Vulnerability Disclosure process, and practice within legal Bug Bounty programs with Safe Harbor. Your professional reputation and legal freedom are your greatest assets."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
