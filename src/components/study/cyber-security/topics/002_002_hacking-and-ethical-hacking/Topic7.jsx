import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Threat Actor Spectrum State
  const [selectedActorKey, setSelectedActorKey] = useState("nation_state");

  // Studio 2: Diamond Model Case State
  const [selectedDiamondCaseKey, setSelectedDiamondCaseKey] = useState("lazarus_fastcash");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_lazarus");

  // Threat Actor Archetypes Data for Studio 1
  const threatActors = {
    nation_state: {
      key: "nation_state",
      name: "Nation-State / Advanced Persistent Threat (APT)",
      icon: "🎖️",
      color: "from-red-600 to-rose-700",
      badgeClass: "bg-red-950 text-red-300 border-red-800",
      sophistication: "10 / 10 (State-Military Level)",
      fundingINR: "₹100+ Crores (State Intelligence Budgets)",
      primaryMotivation: "Geopolitical Espionage, Military Advantage, Critical Infrastructure Sabotage",
      dwellTime: "Months to Years (Stealthy C2, Living-off-the-Land)",
      primaryVectors: "Proprietary zero-day exploit chains, kernel rootkits, hardware supply-chain backdoors, telecom tapping",
      iconicGroups: "APT28 (Fancy Bear), APT29 (Cozy Bear), Lazarus Group (North Korea), Volt Typhoon (China)"
    },
    cybercrime_syndicate: {
      key: "cybercrime_syndicate",
      name: "Organized Cybercrime Syndicate / RaaS Cartel",
      icon: "💰",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      sophistication: "8 / 10 (Highly Professional)",
      fundingINR: "₹50 - ₹200 Crores (Illicit Extortion Revenues)",
      primaryMotivation: "Direct Financial Theft, Ransomware Extortion, Dark Web Identity Trafficking",
      dwellTime: "Days to Weeks (Rapid Double Extortion Deployment)",
      primaryVectors: "Purchased VPN access (IABs), infostealer credential logs, living-off-the-land (LOLBins), cryptomixing",
      iconicGroups: "LockBit, BlackCat (ALPHV), DarkSide, REvil, Conti Syndicate"
    },
    hacktivist: {
      key: "hacktivist",
      name: "Hacktivist Collective / Ideological Actor",
      icon: "📢",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      sophistication: "4 - 6 / 10 (Variable / Decentralized)",
      fundingINR: "Low / Crowdsourced Volunteer Donations",
      primaryMotivation: "Political Protest, Anti-Corruption, Social Justice, Information Freedom",
      dwellTime: "Hours to Days (High-Visibility Shock Value)",
      primaryVectors: "Volumetric DDoS floods (LOIC/HOIC), web defacements, public Telegram/Pastebin data dumps",
      iconicGroups: "Anonymous, LulzSec, Syrian Electronic Army (SEA), GhostSec"
    },
    insider_threat: {
      key: "insider_threat",
      name: "Insider Threat (Malicious vs Negligent)",
      icon: "👔",
      color: "from-blue-500 to-indigo-600",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      sophistication: "3 - 7 / 10 (Bypasses External Perimeters)",
      fundingINR: "Personal Financial Need / Corporate Bribes",
      primaryMotivation: "Malicious: Financial Bribery / Revenge; Negligent: Carelessness / Policy Shortcuts",
      dwellTime: "Immediate Internal Access (Possesses Valid Auth Keys)",
      primaryVectors: "Abusing valid credentials, exfiltrating databases to USB/GitHub, misconfiguring public S3 buckets",
      iconicGroups: "Disgruntled system administrators, bribed employees, careless third-party contractors"
    },
    script_kiddie: {
      key: "script_kiddie",
      name: "Script Kiddie / Low-Skill Opportunist",
      icon: "🎮",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      sophistication: "2 / 10 (Tool User / Non-Programmer)",
      fundingINR: "Pocket Money / Cheap Subscription (₹800/mo)",
      primaryMotivation: "Boredom, Peer Bragging, Minor Online Vandalism, Trolling",
      dwellTime: "Minutes (Noisy and easily detected)",
      primaryVectors: "Automated mass scanners (Masscan), downloaded cracked exploit tools, commercial DDoS booters/stressers",
      iconicGroups: "Discord script users, automated Shodan bot operators, web defacement hobbyists"
    }
  };

  const activeActor = threatActors[selectedActorKey];

  // Diamond Model Case Studies Data for Studio 2
  const diamondCases = {
    lazarus_fastcash: {
      key: "lazarus_fastcash",
      title: "Lazarus Group FASTCash Central Bank Heist",
      threatType: "Nation-State Financial APT (North Korea)",
      adversary: "Lazarus Group (APT38 / Hidden Cobra)",
      capability: "FASTCash Trojan (ISO 8583 message injection + Memory Hooking on Payment Switch)",
      infrastructure: "Multi-hop compromised VPS servers across Southeast Asia & encrypted C2 tunnels",
      victim: "Inter-bank ATM Payment Switch & Core Banking Settlement Gateway (Kolkata & Global)",
      analyticInsight:
        "Analysts mapped Lazarus's capability (FASTCash) to infrastructure seized in Malaysia, uncovering the full attack chain before illicit ATM withdrawals could drain regional bank accounts.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    },
    volt_typhoon_scada: {
      key: "volt_typhoon_scada",
      title: "Volt Typhoon Industrial Grid Pre-Positioning",
      threatType: "Nation-State Cyber Warfare APT (China)",
      adversary: "Volt Typhoon (Vanguard Panda / Bronze Silhouette)",
      capability: "100% Living-off-the-Land (LOLBins), unquoted service paths, SOHO router firmware implants",
      infrastructure: "KV-botnet (Network of compromised small-office/home-office Netgear/Cisco routers)",
      victim: "Regional 220kV High-Voltage Power Transmission Substation & Municipal Water SCADA",
      analyticInsight:
        "Because Volt Typhoon used zero custom malware binaries, Blue Team analysts identified the adversary strictly through anomalous parent-child process relationships on edge routers.",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700"
    },
    anonymous_ddos: {
      key: "anonymous_ddos",
      title: "Anonymous Ideological Volumetric DDoS Flood",
      threatType: "Hacktivist Collective (Ideological Protest)",
      adversary: "Anonymous Decentralized Collective",
      capability: "LOIC (Low Orbit Ion Cannon) + NTP Amplification Reflection (150 Gbps UDP Flood)",
      infrastructure: "Volunteer crowdsourced workstations + publicly exposed open NTP/DNS resolvers",
      victim: "State University Admission & Examination Results Portal (West Bengal)",
      analyticInsight:
        "While technically unsophisticated, the high volume of traffic paralyzed server bandwidth until upstream Anycast BGP scrubbing and Cloudflare DDoS shields were deployed.",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700"
    }
  };

  const activeDiamondCase = diamondCases[selectedDiamondCaseKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_lazarus",
      lead: "Mamata",
      role: "Lead Threat Intelligence Officer",
      location: "Kolkata FinTech Operations Center",
      title: "Lazarus FASTCash Payment Switch Defense",
      budget: "₹8,50,000",
      threatActor: "Nation-State APT (Lazarus Group)",
      dilemma:
        "Lazarus targeted a regional payment switch with FASTCash malware, attempting to inject fake ATM approval responses to authorize unlimited physical cash withdrawals.",
      resolution:
        "Mamata deployed cryptographic Message Authentication Codes (MAC) on ISO 8583 message queues and isolated the switch inside a Hardware Security Module (HSM), neutralizing the attack.",
      metrics: {
        financialLossAvoided: "₹25+ Crores Daily Volume",
        threatActorNeutralized: "Lazarus FASTCash APT",
        reportingSpeed: "Immediate 6-Hour CERT-In Mandate",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_shodan",
      lead: "Mahima",
      role: "Hospital Information Security Officer",
      location: "Ichapur General Hospital",
      title: "Script-Kiddie Automated Shodan Bot Scan",
      budget: "₹4,20,000",
      threatActor: "Script Kiddie / Automated Botnet",
      dilemma:
        "An automated scanner probed exposed VNC remote desktop ports on clinic workstations using default passwords (`123456`), attempting to deploy commodity ransomware.",
      resolution:
        "Mahima deployed fail2ban automated IP banning, placed all clinic computers behind an encrypted WireGuard VPN, and enforced FIDO2 MFA across all medical workstations.",
      metrics: {
        probesBlocked: "14,000 Automated Port Hits",
        patientDataProtected: "100% Medical Records Secure",
        downtimeAvoided: "Zero System Impact",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_volttyphoon",
      lead: "Debangshu",
      role: "Industrial OT Security Architect",
      location: "Barrackpore Industrial Grid",
      title: "Volt Typhoon Pre-Positioning Defense",
      budget: "₹6,80,000",
      threatActor: "Nation-State APT (Volt Typhoon)",
      dilemma:
        "Detecting stealthy Living-off-the-Land (LotL) pre-positioning activity on substation edge routers before active cyber-kinetic switchgear sabotage could occur.",
      resolution:
        "Debangshu enforced unidirectional optical data diodes and hardware-enforced IEC 62351 cryptographic nonces, completely severing external inbound router tunnels.",
      metrics: {
        gridUptime: "100% Continuous Transmission",
        routerFirmwareAudited: "12 Substation Edge Routers",
        iocShared: "National NCIIPC & CERT-In",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_hacktivist",
      lead: "Abhronila & Susmita",
      role: "University Cyber Threat Leads",
      location: "Jadavpur University AI Labs",
      title: "Hacktivist DDoS & Defacement Shield",
      budget: "₹3,80,000",
      threatActor: "Ideological Hacktivist Collective",
      dilemma:
        "A hacktivist group launched a 40 Gbps DDoS flood and attempted to deface the university student admission portal to protest examination policy changes.",
      resolution:
        "The team routed traffic through Anycast DDoS mitigation scrubbing centers, patched a legacy CMS plugin, and prevented the exfiltration of student identity records.",
      metrics: {
        ddosAbsorbed: "40 Gbps Volumetric Flood",
        serviceRestoration: "< 15 Minutes",
        studentRecordsSecured: "45,000 Admissions Files",
        compliance: "University Cyber Charter"
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
            Cyber Security Module 002_002 • Topic 7 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Threat Actors: Nation-State, Hacktivists &amp; Script Kiddies
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the adversary spectrum: from multi-million-dollar nation-state Advanced Persistent Threats (APTs like Lazarus and Volt Typhoon), 
            to organized ransomware cartels, ideological hacktivists, insider threats, and script kiddies. Master the Diamond Model of Intrusion Analysis 
            and STIX/TAXII threat intelligence.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Threat Actor Spectrum & Capability Profiler */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Studio 1: Threat Actor Spectrum &amp; Capability Profiler
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a threat actor archetype to inspect its sophistication rating, financial backing in Indian Rupees (₹), operational dwell time, and attack vectors.
            </p>
          </div>

          {/* Archetype Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(threatActors).map((actor) => {
              const isSelected = selectedActorKey === actor.key;
              return (
                <button
                  key={actor.key}
                  onClick={() => setSelectedActorKey(actor.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{actor.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{actor.name.split(" / ")[0]}</div>
                  <div className={clsx("mt-1 text-[10px] px-1.5 py-0.5 rounded border inline-block", actor.badgeClass)}>
                    Threat Tier
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Archetype Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeActor.badgeClass)}>
                  {activeActor.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Adversary Profile &amp; Strategic Objective
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Estimated Financial Funding</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400">{activeActor.fundingINR}</span>
              </div>
            </div>

            {/* Motivation & Dwell Time */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase">Sophistication Level</span>
                <span className="font-bold text-indigo-300 text-sm block">{activeActor.sophistication}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase">Primary Motivation</span>
                <span className="font-bold text-white text-xs block">{activeActor.primaryMotivation}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase">Typical Dwell Time</span>
                <span className="font-bold text-emerald-300 text-xs block">{activeActor.dwellTime}</span>
              </div>
            </div>

            {/* Vectors & Iconic Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Primary Exploitation Vectors &amp; TTPs</span>
                <p className="text-gray-300 text-[11px] leading-relaxed">{activeActor.primaryVectors}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-purple-300 font-bold uppercase tracking-wider block">Iconic Real-World Examples / Groups</span>
                <p className="text-gray-300 font-mono text-[11px] leading-relaxed">{activeActor.iconicGroups}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Diamond Model of Intrusion Analysis Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💎</span> Studio 2: The Diamond Model of Intrusion Analysis Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Analyze real-world cyber campaigns by mapping relationships between the 4 core vertices: Adversary, Capability, Infrastructure, and Victim.
            </p>
          </div>

          {/* Case Navigation Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(diamondCases).map((c) => {
              const isSelected = selectedDiamondCaseKey === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setSelectedDiamondCaseKey(c.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{c.title.split(" ")[0]} {c.title.split(" ")[1]}</div>
                  <div className="text-[11px] text-gray-400 mt-1 truncate">{c.threatType}</div>
                </button>
              );
            })}
          </div>

          {/* Active Diamond Model Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDiamondCase.badgeClass)}>
                  {activeDiamondCase.threatType}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeDiamondCase.title}
                </h3>
              </div>
            </div>

            {/* 4 Vertices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Vertex 1: Adversary */}
              <div className="bg-gray-900 p-4 rounded-xl border border-red-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <span>🎖️</span> Vertex 1: Adversary (Who?)
                </span>
                <p className="text-gray-200 font-semibold">{activeDiamondCase.adversary}</p>
              </div>

              {/* Vertex 2: Capability */}
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1.5">
                <span className="text-purple-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <span>⚔️</span> Vertex 2: Capability (What Tools?)
                </span>
                <p className="text-gray-200 font-semibold">{activeDiamondCase.capability}</p>
              </div>

              {/* Vertex 3: Infrastructure */}
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <span>🌐</span> Vertex 3: Infrastructure (Where Hosted?)
                </span>
                <p className="text-gray-200 font-semibold">{activeDiamondCase.infrastructure}</p>
              </div>

              {/* Vertex 4: Victim */}
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <span>🎯</span> Vertex 4: Victim (Target Entity)
                </span>
                <p className="text-gray-200 font-semibold">{activeDiamondCase.victim}</p>
              </div>
            </div>

            {/* Threat Intel Pivoting Insight */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Threat Intelligence Analyst Pivoting Insight:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeDiamondCase.analyticInsight}</p>
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
              Visualizing the Threat Actor Sophistication Hierarchy and the Diamond Model of Intrusion Analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Threat Actor Pyramid */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>🔺</span> Diagram A: The Threat Actor Sophistication Pyramid
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: APTs (Top) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="250,20 180,90 320,90" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="65" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">NATION-STATE APT</text>
                    <text x="250" y="78" fill="#fca5a5" textAnchor="middle" fontSize="7.5">0-Days • ₹100Cr+ Budgets</text>
                  </g>

                  {/* Tier 2: Cybercrime Syndicates */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="180,95 320,95 360,160 140,160" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="125" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">CYBERCRIME SYNDICATES</text>
                    <text x="250" y="140" fill="#fde68a" textAnchor="middle" fontSize="7.5">Ransomware RaaS • LockBit • IABs</text>
                  </g>

                  {/* Tier 3: Hacktivists & Insiders */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="140,165 360,165 410,230 90,230" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="195" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">HACKTIVISTS &amp; INSIDERS</text>
                    <text x="250" y="210" fill="#c7d2fe" textAnchor="middle" fontSize="7.5">Ideological Leaks • Valid Auth Misuse</text>
                  </g>

                  {/* Tier 4: Script Kiddies (Base) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="90,235 410,235 460,300 40,300" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="265" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="11">SCRIPT KIDDIES &amp; OPPORTUNISTS (HIGH VOLUME)</text>
                    <text x="250" y="280" fill="#a7f3d0" textAnchor="middle" fontSize="8">Automated Scanners • DDoS Booters • Default Passwords</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: The Threat Actor hierarchy showing increasing sophistication and financial backing at the apex.
              </p>
            </div>

            {/* Diagram 2: The Diamond Model */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>💎</span> Diagram B: The Diamond Model of Intrusion Analysis
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Diamond Diamond Shape Lines */}
                  <line x1="250" y1="30" x2="80" y2="150" stroke="#6366f1" strokeWidth="2" />
                  <line x1="250" y1="30" x2="420" y2="150" stroke="#6366f1" strokeWidth="2" />
                  <line x1="80" y1="150" x2="250" y2="270" stroke="#6366f1" strokeWidth="2" />
                  <line x1="420" y1="150" x2="250" y2="270" stroke="#6366f1" strokeWidth="2" />
                  <line x1="80" y1="150" x2="420" y2="150" stroke="#4338ca" strokeWidth="1.5" strokeDasharray="4 2" />

                  {/* Top Node: Adversary */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="10" width="140" height="40" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="35" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="11">ADVERSARY</text>
                  </g>

                  {/* Left Node: Capability */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="10" y="130" width="140" height="40" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="80" y="155" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="11">CAPABILITY</text>
                  </g>

                  {/* Right Node: Infrastructure */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="130" width="140" height="40" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="420" y="155" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="11">INFRASTRUCTURE</text>
                  </g>

                  {/* Bottom Node: Victim */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="250" width="140" height="40" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="275" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="11">VICTIM</text>
                  </g>

                  {/* Center Label */}
                  <text x="250" y="145" fill="#a5b4fc" fontWeight="bold" textAnchor="middle" fontSize="9">CORE EVENT</text>
                  <text x="250" y="160" fill="#cbd5e1" textAnchor="middle" fontSize="8">Threat Intel Pivoting</text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: The Diamond Model connects Adversary, Capability, Infrastructure, and Victim during forensic investigations.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Threat Intelligence Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads neutralize threats ranging from state-sponsored APTs to script kiddies across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Defense Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Threat Actor Dilemma ({currentLocalScenario.threatActor})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Defensive Engineering Remedy
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Threat Intelligence Metrics &amp; Deliverables
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
              Guidelines to counter diverse threat actors from nation-state APTs to automated script-kiddie scanners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Threat Intelligence Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use the Diamond Model:</strong> Map Adversary, Capability, Infrastructure, and Victim to pivot investigations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Automate STIX/TAXII Feeds:</strong> Ingest real-time threat intelligence into SIEM to block known APT C2 domains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Zero Trust Architecture:</strong> Assume edge perimeters will be breached; restrict lateral movement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Hardware Isolation for SCADA:</strong> Use unidirectional optical data diodes to protect critical power grids.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Defensive Misconceptions
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>"We Are Too Small to Target":</strong> Small suppliers are frequently targeted as stepping stones to breach enterprise clients.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Script Kiddies:</strong> Automated Shodan bots find unpatched servers within 15 minutes of coming online.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Insider Threats:</strong> Over 30% of critical data breaches originate from employees with valid credentials.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>False-Flag Misattribution:</strong> Blaming an APT purely on code language strings planted by rival threat groups.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Governance Rules
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Mandatory 6-Hour Reporting:</strong> Notify CERT-In immediately upon confirming state-sponsored or critical intrusions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Least Privilege:</strong> Restrict local administrator access to minimize the impact of credential dumping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Immutable Air-Gapped Backups:</strong> Protect recovery snapshots with S3 Object Lock (WORM storage).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Conduct Threat Model Drills:</strong> Regularly evaluate system architecture against MITRE ATT&amp;CK for Enterprise &amp; ICS.</span>
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
              Synthesize key Threat Actor concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Threat Intelligence Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Volt Typhoon's pre-positioning strategy is uniquely dangerous: they leave zero custom malware on disk, living entirely off legitimate native router utilities to maintain silent access for future war.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How the Diamond Model enables threat intelligence pivoting: discovering a new malware Capability allows you to query telemetry for unknown Infrastructure and identify previously unknown Victims.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise security models, design defenses not around a single generic attacker, but map specific defenses against the distinct capabilities of Script Kiddies, Cybercrime Cartels, and APTs.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>APTs are well-funded nation-state groups with multi-year dwell times.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Diamond Model links Adversary, Capability, Infrastructure, and Victim.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Lazarus Group: Bangladesh Bank ($81M) &amp; Axie Infinity heists.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Volt Typhoon pre-positions inside critical infrastructure using LotL.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 66F: Life imprisonment for Cyber Terrorism.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>STIX/TAXII provides standardized transport for threat feeds.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Threat Actors: Nation-State, Hacktivists & Script Kiddies FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Threat Actors: Nation-State, Hacktivists & Script Kiddies (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As future cybersecurity architects graduating in West Bengal, you will face adversaries ranging from bored teenagers running automated port scanners to state-sponsored military units with zero-day exploits. Master the Diamond Model of Intrusion Analysis, ingest standardized STIX/TAXII threat feeds, and enforce Zero Trust principles. When you assume breach and isolate blast radiuses, you render even the most sophisticated nation-state threat actors powerless."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
