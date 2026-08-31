import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Studio 1: Historical Eras Timeline State
  const [selectedEraKey, setSelectedEraKey] = useState("era2_1980s");

  // Studio 2: Morris Worm Sandbox State
  const [reinfectionChance, setReinfectionChance] = useState(7); // 1 in N (default 7)
  const [simulationHosts, setSimulationHosts] = useState(100);   // Number of simulated ARPANET nodes

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_museum");

  // Historic Eras Timeline Data
  const erasData = {
    era1_1970s: {
      key: "era1_1970s",
      eraName: "1950s - 1970s: The Mainframe & Phone Phreaking Era",
      tagline: "Intellectual Curiosity, Model Railroads & In-Band Signaling",
      icon: "🚂",
      color: "from-blue-500 to-indigo-600",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      primaryMotivation: "Exploration, Curiosity, Optimizing Mainframe Code & Free Phone Routing",
      iconicTools: "PDP-1 Assembly, 2600 Hz Toy Whistle, Electronic Blue Boxes",
      keyMilestones: [
        "1959: MIT Tech Model Railroad Club (TMRC) coins the term 'hack' for ingenious technical problem-solving.",
        "1971: John Draper ('Captain Crunch') discovers 2600 Hz tone in cereal box whistle to reset AT&T trunk lines.",
        "1972: Steve Wozniak and Steve Jobs build and sell digital 'Blue Boxes' before founding Apple Computer."
      ],
      economicImpactINR: "Minimal direct financial theft (~₹50 Lakhs in unbilled AT&T trunk minutes)",
      defensiveMilestone: "Separation of control signaling from voice channels (Out-of-band Common Channel Signaling SS7)."
    },
    era2_1980s: {
      key: "era2_1980s",
      eraName: "1980s: The PC Revolution, BBS Era & First Internet Worm",
      tagline: "Subculture Manifestos, Wardialing & The Birth of CERT",
      icon: "💾",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      primaryMotivation: "Subculture Exploration, Ego, Peer Recognition & System Discovery",
      iconicTools: "ToneLoc Wardialers, 300-baud Acoustic Modems, C Fingerd Exploits",
      keyMilestones: [
        "1983: Release of Hollywood movie 'WarGames' prompts President Reagan to order national cyber defenses.",
        "1986: Loyd Blankenship ('The Mentor') publishes 'The Hacker Manifesto' in Phrack Issue 7.",
        "1986: US Congress passes Computer Fraud and Abuse Act (CFAA), establishing federal criminalization.",
        "1988: Robert Tappan Morris releases the Morris Worm, crashing ~10% of ARPANET and leading to the creation of CERT."
      ],
      economicImpactINR: "₹80 Crores ($10M) in ARPANET recovery and forensic analysis",
      defensiveMilestone: "Founding of the world's first Computer Emergency Response Team (CERT) at Carnegie Mellon."
    },
    era3_1990s: {
      key: "era3_1990s",
      eraName: "1990s: Dot-Com Boom, Remote Access Trojans & DEF CON",
      tagline: "Commercial Web Expansion, Cult of the Dead Cow & Stack Smashing",
      icon: "🌐",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      primaryMotivation: "Activism, Software Cracking (DRM), Remote Administration & Espionage",
      iconicTools: "Back Orifice, NetBus, Smashing the Stack (Phrack 49), Nmap Port Scanner",
      keyMilestones: [
        "1993: Jeff Moss ('The Dark Tangent') organizes DEF CON 1 in Las Vegas, establishing global hacker conferences.",
        "1995: FBI captures Kevin Mitnick ('Condor') following high-profile IP spoofing and social engineering intrusions.",
        "1996: Aleph One publishes 'Smashing the Stack for Fun and Profit' in Phrack 49, standardizing buffer overflow exploitation.",
        "1998: Cult of the Dead Cow (cDc) releases 'Back Orifice' at DEF CON 6, exposing severe Windows 95/98 vulnerabilities."
      ],
      economicImpactINR: "₹1,200 Crores in corporate investigations and perimeter firewalls",
      defensiveMilestone: "Invention of stateful inspection firewalls (Check Point) and early network IDS."
    },
    era4_2000s: {
      key: "era4_2000s",
      eraName: "2000s: Monetization, Mass-Mailing Worms & Banking Trojans",
      tagline: "Organized Cybercrime, Botnets & Instantaneous UDP Worms",
      icon: "💳",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      primaryMotivation: "Direct Financial Theft, Carding Forums, Identity Fraud & Botnet Extortion",
      iconicTools: "Zeus Banking Trojan, ILOVEYOU VBScript, SQL Slammer, CarderPlanet",
      keyMilestones: [
        "1999-2000: Melissa Virus and ILOVEYOU Worm spread globally via Outlook address books in under 24 hours.",
        "2000: India enacts the landmark Information Technology Act, 2000 (Section 43 & Section 66).",
        "2003: SQL Slammer (376 bytes UDP) infects 75,000 servers in 10 minutes, doubling every 8.5 seconds.",
        "2007: Zeus Banking Trojan pioneers Man-in-the-Browser (MitB) credential harvesting on bank portals."
      ],
      economicImpactINR: "₹85,000 Crores ($10B+) across global financial institutions and email outages",
      defensiveMilestone: "Widespread adoption of OS ASLR (Address Space Layout Randomization) and DEP (Data Execution Prevention)."
    },
    era5_2010s: {
      key: "era5_2010s",
      eraName: "2010s: Nation-State Cyber Warfare & Ransomware Syndicates",
      tagline: "Stuxnet Kinetic Sabotage, Operation Aurora & Double Extortion RaaS",
      icon: "☢️",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      primaryMotivation: "Geopolitical Cyber Warfare, Critical Infrastructure Sabotage & Multi-Crore RaaS",
      iconicTools: "Stuxnet SCADA Rootkits, EternalBlue SMB Exploit, LockBit, Cobalt Strike",
      keyMilestones: [
        "2009-2010: Operation Aurora targets Google; Google responds by inventing Zero Trust (BeyondCorp).",
        "2010: Stuxnet physically destroys 1,000+ Iranian centrifuges at Natanz, pioneering cyber-kinetic warfare.",
        "2017: WannaCry and NotPetya weaponize NSA's EternalBlue exploit, causing ₹30,000+ Crores in global collateral damage.",
        "2019: Maze ransomware pioneers 'Double Extortion' (stealing data before encrypting to force payment)."
      ],
      economicImpactINR: "₹3,50,000 Crores ($40B+) in ransomware shutdowns and critical infrastructure rebuilding",
      defensiveMilestone: "Transition to Zero Trust Architecture (ZTA), EDR behavioral monitoring, and Bug Bounty platforms."
    },
    era6_2020s: {
      key: "era6_2020s",
      eraName: "2020s - Present: Supply Chain Poisoning & Generative AI Threats",
      tagline: "Build-Pipeline Backdoors, Deepfake Vishing & Statutory Privacy Enforcement",
      icon: "🤖",
      color: "from-cyan-500 to-blue-600",
      badgeClass: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
      primaryMotivation: "Supply Chain Compromise, Autonomous AI Exploits & State-Sponsored Espionage",
      iconicTools: "SUNBURST Build Backdoor, WormGPT, Deepfake Voice Cloners, FIDO2 Passkeys",
      keyMilestones: [
        "2020: SolarWinds SUNBURST backdoors upstream build pipelines, infecting 18,000 enterprise customers.",
        "2021: Colonial Pipeline ransomware shuts down 5,500 miles of fuel pipelines via inactive VPN account.",
        "2023: India enacts the Digital Personal Data Protection (DPDP) Act with penalties up to ₹250 Crores.",
        "2024+: Emergence of AI-driven polymorphic shellcode, automated vulnerability synthesis, and real-time deepfake Vishing."
      ],
      economicImpactINR: "₹10,00,000 Crores+ ($120B+) in annual global cybercrime and supply chain disruptions",
      defensiveMilestone: "Mandatory FIDO2 hardware passkeys, Software Bill of Materials (SBOM), and AI-driven SOC automation."
    }
  };

  const activeEra = erasData[selectedEraKey];

  // Calculations for Morris Worm Replication Simulator (Studio 2)
  const morrisMetrics = useMemo(() => {
    // Morris worm formula: If already infected, it rolls a 1-in-N dice (default 1/7).
    // If dice rolls 1, it infects AGAIN, spawning a duplicate process.
    const averageProcessesPerHost = 1 + (10 / reinfectionChance);
    const totalProcessesRunning = Math.round(simulationHosts * averageProcessesPerHost);
    const cpuLoadPercentage = Math.min(100, Math.round((totalProcessesRunning / (simulationHosts * 1.5)) * 100));
    const crashRisk = cpuLoadPercentage > 85 ? "CRITICAL (Server Crash)" : cpuLoadPercentage > 50 ? "Severe Thrashing" : "Operational";
    const crashColor = cpuLoadPercentage > 85 ? "text-rose-400" : cpuLoadPercentage > 50 ? "text-amber-400" : "text-emerald-400";

    return {
      averageProcessesPerHost: averageProcessesPerHost.toFixed(1),
      totalProcessesRunning,
      cpuLoadPercentage: `${cpuLoadPercentage}%`,
      crashRisk,
      crashColor
    };
  }, [reinfectionChance, simulationHosts]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_museum",
      lead: "Mamata",
      role: "Lead Cybersecurity Curator & Historian",
      location: "Kolkata Science & Technology Museum",
      title: "ARPANET & ERNET Computing Evolution Exhibit",
      budget: "₹5,50,000",
      historicalLesson:
        "In 1986, India launched ERNET (Education and Research Network) connecting premier universities. Mamata's exhibit illustrates how early academic networks had zero encryption or authentication because designers naively assumed all users were trusted researchers.",
      evolutionaryShift:
        "The shift from early naive trust (where anyone could telnet into servers) to modern Zero Trust architecture where every microservice call requires mTLS cryptographic verification.",
      metrics: {
        networkAnalyzed: "ERNET 1986 vs ARPANET 1988",
        historicalImpact: "Origin of Indian Cyber Protocols",
        studentsEducated: "1,200+ BCA Students",
        compliance: "National Science Heritage"
      }
    },
    {
      id: "ichapur_malware",
      lead: "Mahima",
      role: "Senior Healthcare Security Analyst",
      location: "Ichapur General Hospital",
      title: "Boot-Sector to Double Extortion Analysis",
      budget: "₹4,20,000",
      historicalLesson:
        "Mahima audits hospital backup systems by tracing how malware evolved from 1990s floppy-disk boot sector viruses (like Michelangelo) that merely corrupted local disks, to 2020s LockBit ransomware syndicates that secretly exfiltrate patient oncology files before encrypting servers.",
      evolutionaryShift:
        "Offline cold backups were 100% effective against 1990s disk wipers, but are insufficient against modern 'Double Extortion' where attackers threaten to publish stolen patient Aadhaar cards online under the DPDP Act.",
      metrics: {
        evolutionSpan: "1992 Michelangelo to 2026 LockBit",
        threatModel: "Double Extortion Defense",
        mitigationStrategy: "Air-Gapped S3 WORM + Egress Lockdown",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada",
      lead: "Debangshu",
      role: "Industrial OT Protection Historian",
      location: "Barrackpore Industrial Grid",
      title: "Wardialing to Cyber-Kinetic Grid Sabotage",
      budget: "₹6,00,000",
      historicalLesson:
        "In the 1980s, hackers used wardialers like ToneLoc to find serial modems on telephone switches. Debangshu's research traces how that evolved into 2010 Stuxnet and 2016 Industroyer (CrashOverride) malware capable of opening 220kV high-voltage circuit breakers to cause regional blackouts.",
      evolutionaryShift:
        "Industrial SCADA systems historically operated on 'security through obscurity' (assuming serial protocols were unhackable). Today, industrial controllers must enforce cryptographic HMAC nonces directly in hardware.",
      metrics: {
        threatEvolution: "1983 WarGames to 2010 Stuxnet",
        substationSecured: "Barrackpore 220kV Substation",
        defenseArchitecture: "Unidirectional Optical Diodes",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_morris",
      lead: "Abhronila & Susmita",
      role: "Cyber Threat Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Morris Worm C Source Code Decompilation",
      budget: "₹3,80,000",
      historicalLesson:
        "The research team compiled the original 1988 C source code of the Morris Worm inside an isolated virtual machine, examining the exact stack buffer overflow in `fingerd` caused by the unsafe standard library function `gets()`.",
      evolutionaryShift:
        "The 1988 Morris Worm taught software engineering that memory safety is non-negotiable, leading to modern memory-safe programming languages (Rust, Go) and compiler protections (Stack Canaries, ASLR).",
      metrics: {
        flawAnalyzed: "C gets() Stack Overflow",
        historicalImpact: "First Internet Worm (1988)",
        labSafety: "100% Host-Only Virtualized Subnet",
        compliance: "Academic Research Exemption"
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
            Cyber Security Module 002_002 • Topic 1 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Evolution of Hacking: From Curiosity to Cyber Threats
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Trace the six-decade journey of cybersecurity: from 1950s MIT model railroad enthusiasts and 1970s telephone phreakers, 
            to the 1988 Morris Worm, 2000s banking botnets, 2010s Stuxnet cyber-kinetic warfare, and modern AI-driven supply chain attacks.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Historic Eras Interactive Timeline & Threat Metric Explorer */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⏳</span> Studio 1: The 6-Decade Historic Evolution of Hacking
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an era to explore its cultural drivers, iconic threat vectors, economic damages in Indian Rupees (₹), and landmark defensive milestones.
            </p>
          </div>

          {/* Era Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.values(erasData).map((era) => {
              const isSelected = selectedEraKey === era.key;
              return (
                <button
                  key={era.key}
                  onClick={() => setSelectedEraKey(era.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{era.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{era.eraName.split(":")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{era.eraName.split(":")[1]?.trim()}</div>
                </button>
              );
            })}
          </div>

          {/* Active Era Detailed Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeEra.badgeClass)}>
                  {activeEra.eraName.split(":")[0]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeEra.eraName}
                </h3>
                <p className="text-xs sm:text-sm text-indigo-300 italic mt-0.5">{activeEra.tagline}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Estimated Global Economic Loss</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400">{activeEra.economicImpactINR}</span>
              </div>
            </div>

            {/* Motivation & Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase tracking-wider">Primary Motivation</span>
                <span className="text-sm font-bold text-white block">{activeEra.primaryMotivation}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase tracking-wider">Iconic Tools &amp; Exploitation Vectors</span>
                <span className="text-sm font-mono text-purple-300 block">{activeEra.iconicTools}</span>
              </div>
            </div>

            {/* Key Milestones */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>🚩</span> Landmark Historic Milestones
              </h4>
              <div className="space-y-2 text-xs">
                {activeEra.keyMilestones.map((m, idx) => (
                  <div key={idx} className="bg-gray-900/70 p-3 rounded-lg border border-gray-800/80 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                    <span className="text-gray-300 leading-relaxed">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emerging Defensive Countermeasure */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Defensive Countermeasure Born from this Era:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeEra.defensiveMilestone}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Morris Worm (1988) Forensic Sandbox Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🐛</span> Studio 2: The 1988 Morris Worm Replication Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Simulate Robert Morris's fatal 1-in-N replication flaw that turned an innocent network measurement experiment into the world's first global internet crash.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Simulation Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-5 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Worm Replication Parameters
              </h3>

              {/* Re-infection Chance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">Re-infection Probability (1 in N):</span>
                  <span className="font-mono text-amber-300 font-bold">1 in {reinfectionChance} ({(100 / reinfectionChance).toFixed(1)}%)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={reinfectionChance}
                  onChange={(e) => setReinfectionChance(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>1 in 1 (Infinite Loop Crash)</span>
                  <span>1 in 7 (Morris Original)</span>
                  <span>1 in 20 (Gentle Spread)</span>
                </div>
              </div>

              {/* Network Hosts Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-semibold">Simulated ARPANET Hosts:</span>
                  <span className="font-mono text-indigo-300 font-bold">{simulationHosts} Servers</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={simulationHosts}
                  onChange={(e) => setSimulationHosts(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Technical Root Cause Box */}
              <div className="p-3.5 bg-gray-900 rounded-xl border border-gray-800 text-[11px] text-gray-300 space-y-1">
                <strong className="text-indigo-300 block">The 3 Morris Worm Exploit Vectors:</strong>
                <p className="text-gray-400">1. <code className="text-rose-400">fingerd gets()</code> stack buffer overflow.</p>
                <p className="text-gray-400">2. <code className="text-amber-400">sendmail DEBUG</code> mode arbitrary command execution.</p>
                <p className="text-gray-400">3. <code className="text-purple-400">rsh/rexec</code> dictionary password attacks.</p>
              </div>
            </div>

            {/* Calculated Impact & CPU Exhaustion Display (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">ARPANET CPU Load &amp; Process Thrashing</h3>
                  <span className="text-xs text-gray-400">November 2, 1988 Retrospective Model</span>
                </div>
                <div className={clsx("text-xl sm:text-2xl font-extrabold tracking-tight", morrisMetrics.crashColor)}>
                  {morrisMetrics.crashRisk}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Avg Copies per Host</span>
                  <span className="text-lg font-bold text-amber-300">{morrisMetrics.averageProcessesPerHost} Processes</span>
                  <span className="text-[10px] text-gray-500 block">Forked duplicate daemons</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">Total Worm Processes</span>
                  <span className="text-lg font-bold text-rose-300">{morrisMetrics.totalProcessesRunning} PIDs</span>
                  <span className="text-[10px] text-gray-500 block">Choking UNIX process tables</span>
                </div>

                <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-gray-400 block text-[11px]">System CPU Exhaustion</span>
                  <span className="text-lg font-bold text-emerald-300">{morrisMetrics.cpuLoadPercentage}</span>
                  <span className="text-[10px] text-gray-500 block">Process queue deadlock</span>
                </div>
              </div>

              {/* Historical Consequence Note */}
              <div className="bg-gray-900/90 p-5 rounded-xl border border-indigo-900/30 space-y-2 text-xs">
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏛</span> Historical Significance: The Genesis of Modern Incident Response
                </h4>
                <p className="text-gray-400 leading-relaxed text-[11px]">
                  Morris never intended to crash the internet. To prevent sysadmins from stopping his worm by running a fake dummy process, 
                  he added logic: <em>"Even if the host says it is already infected, re-infect it 1 out of 7 times anyway."</em> 
                  This exponential multi-forking choked ~6,000 servers (10% of the ARPANET), leading directly to the conviction of Morris under the CFAA and the founding of <strong>CERT/CC</strong>.
                </p>
              </div>
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
              Visualizing the 6-Decade Evolution of Threat Velocity and the Anatomy of the 1988 Morris Worm infection loop.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 6-Decade Threat Spectrum */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>📈</span> Diagram A: 6-Decade Evolution of Hacking Motivations &amp; Damage
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: 1960s-1970s */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="460" height="40" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="35" y="45" fill="#c7d2fe" fontWeight="bold" fontSize="10.5">1960s-70s: Curiosity &amp; Phreaking</text>
                    <text x="250" y="45" fill="#94a3b8" fontSize="9">MIT TMRC • 2600 Hz Cap'n Crunch • Blue Boxes</text>
                    <text x="465" y="45" fill="#a5b4fc" fontWeight="bold" textAnchor="end" fontSize="9.5">Low Impact</text>
                  </g>

                  {/* Step 2: 1980s */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="68" width="460" height="40" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                    <text x="35" y="93" fill="#e0e7ff" fontWeight="bold" fontSize="10.5">1980s: Subculture &amp; Early Worms</text>
                    <text x="250" y="93" fill="#c7d2fe" fontSize="9">Morris Worm 1988 • CFAA Law • Hacker Manifesto</text>
                    <text x="465" y="93" fill="#818cf8" fontWeight="bold" textAnchor="end" fontSize="9.5">CERT Born</text>
                  </g>

                  {/* Step 3: 1990s */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="116" width="460" height="40" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <text x="35" y="141" fill="#fef3c7" fontWeight="bold" fontSize="10.5">1990s: Web Commercialization &amp; RATs</text>
                    <text x="250" y="141" fill="#fde68a" fontSize="9">Back Orifice (cDc) • Kevin Mitnick • DEF CON 1</text>
                    <text x="465" y="141" fill="#f59e0b" fontWeight="bold" textAnchor="end" fontSize="9.5">Firewalls</text>
                  </g>

                  {/* Step 4: 2000s */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="164" width="460" height="40" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                    <text x="35" y="189" fill="#fee2e2" fontWeight="bold" fontSize="10.5">2000s: Cybercrime &amp; Botnets</text>
                    <text x="250" y="189" fill="#fca5a5" fontSize="9">SQL Slammer • Zeus Banking Trojan • ILOVEYOU</text>
                    <text x="465" y="189" fill="#ef4444" fontWeight="bold" textAnchor="end" fontSize="9.5">₹85,000 Cr</text>
                  </g>

                  {/* Step 5: 2010s */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="212" width="460" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="35" y="237" fill="#d1fae5" fontWeight="bold" fontSize="10.5">2010s: Nation-States &amp; RaaS</text>
                    <text x="250" y="237" fill="#6ee7b7" fontSize="9">Stuxnet SCADA • WannaCry • Double Extortion</text>
                    <text x="465" y="237" fill="#10b981" fontWeight="bold" textAnchor="end" fontSize="9.5">Zero Trust</text>
                  </g>

                  {/* Step 6: 2020s */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="260" width="460" height="45" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="35" y="287" fill="#cffafe" fontWeight="bold" fontSize="11">2020s+: Supply Chain &amp; AI Attacks</text>
                    <text x="250" y="287" fill="#a5f3fc" fontSize="9">SolarWinds SUNBURST • WormGPT • DPDP Act ₹250 Cr</text>
                    <text x="465" y="287" fill="#06b6d4" fontWeight="bold" textAnchor="end" fontSize="10">AI SOC</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.1: Hacking transformed from academic curiosity into multi-crore cyber warfare and AI-driven supply chain attacks.
              </p>
            </div>

            {/* Diagram 2: Morris Worm Infection Loop */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>🐛</span> Diagram B: Anatomy of the 1988 Morris Worm Infection Loop
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Target Scanning */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="60" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="45" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10.5">1. Target Discovery</text>
                    <text x="85" y="60" fill="#94a3b8" textAnchor="middle" fontSize="8.5">Reads /etc/hosts &amp; gateways</text>
                  </g>

                  {/* Arrow 1 to 2 */}
                  <path d="M 150 50 L 185 50" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowAmber)" />

                  {/* Step 2: 3-Pronged Exploit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="190" y="20" width="145" height="60" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="262" y="45" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10.5">2. Tri-Vector Exploit</text>
                    <text x="262" y="60" fill="#fde68a" textAnchor="middle" fontSize="8.5">fingerd / sendmail / rsh</text>
                  </g>

                  {/* Arrow 2 to 3 */}
                  <path d="M 335 50 L 370 50" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />

                  {/* Step 3: Check Infection */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="375" y="20" width="105" height="60" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="427" y="45" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">3. Check Status</text>
                    <text x="427" y="60" fill="#a5b4fc" textAnchor="middle" fontSize="8">Already infected?</text>
                  </g>

                  {/* Downward Connector */}
                  <path d="M 427 80 L 427 140" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4: The Fatal 1-in-7 Bug */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="50" y="140" width="400" height="65" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="165" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="11">4. THE FATAL 1-IN-7 RE-INFECTION FLAW</text>
                    <text x="250" y="182" fill="#fca5a5" textAnchor="middle" fontSize="9">Even if Target answers "YES", worm infects again 1 out of 7 times to bypass fake processes</text>
                  </g>

                  {/* Downward Arrow */}
                  <path d="M 250 205 L 250 240" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowAmber)" />

                  {/* Step 5: CPU Exhaustion */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="40" y="240" width="420" height="65" rx="8" fill="#18181b" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="250" y="265" fill="#ffe4e6" fontWeight="bold" textAnchor="middle" fontSize="11">5. CATASTROPHIC CPU DEADLOCK (ARPANET CRASH)</text>
                    <text x="250" y="282" fill="#fda4af" textAnchor="middle" fontSize="9">Dozens of copies forked per host -&gt; 6,000 servers froze -&gt; DARPA creates CERT/CC</text>
                  </g>

                  <defs>
                    <marker id="arrowAmber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 1.2: A single algorithmic replication bug turned an academic experiment into a global network outage.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Engineering Evolution Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how technological evolution shapes practical cybersecurity engineering across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Exhibit / Research Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Historical Lesson vs Evolutionary Shift */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-indigo-900/30 space-y-2">
                <h4 className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📜</span> Historical Context &amp; Lesson
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.historicalLesson}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🔄</span> Modern Defensive Paradigm Shift
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.evolutionaryShift}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Research Deliverables &amp; Architectural Metrics
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
              Historic wisdom to prevent 20th-century mistakes from compromising 21st-century cloud infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Professional Historical Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Eliminate In-Band Signaling:</strong> Never mix network control planes with public user data channels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Audit Upstream Dependencies:</strong> Enforce automated SBOM scans to prevent SolarWinds-style build poisoning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Assume Perimeter Failure:</strong> Implement Zero Trust micro-segmentation assuming external firewalls will fail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Memory-Safe Languages:</strong> Adopt Rust or Go to eliminate buffer overflows at the compiler level.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Historical Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Security Through Obscurity:</strong> Assuming unadvertised ports or proprietary protocols will not be found.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on Backups Alone:</strong> Failing to protect against Double Extortion data exfiltration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Unsafe C APIs:</strong> Calling `gets()`, `strcpy()`, or `sprintf()` without explicit bounds validation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Neglecting Stale Accounts:</strong> Leaving inactive VPN profiles alive without Multi-Factor Authentication.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Best Practices
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Implement Immutable Backups:</strong> Use S3 Object Lock (WORM storage) to prevent ransomware wiping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce FIDO2 Passkeys:</strong> Stop modern credential phishing and MitB banking attacks completely.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Continuous Threat Intelligence:</strong> Ingest automated STIX/TAXII threat feeds into SIEM to block known IoCs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Mandatory 6-Hour Reporting:</strong> Comply with CERT-In directives upon detecting critical compromises.</span>
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
              Synthesize key evolutionary milestones before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for System Designers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why SQL Slammer spread across the world in 10 minutes: it used connectionless UDP packets, requiring zero round-trip handshake time.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Stuxnet marked a permanent turning point in human history: malware was no longer just about stealing data, but destroying physical physical machines.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future software builds, replace legacy un-signed build pipelines with cryptographically signed artifact verification and automated dependency pinning.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Points to Remember for Exams)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>John Draper: 2600 Hz Cap'n Crunch whistle.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Morris Worm (1988): fingerd gets() ➔ CERT born.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>WarGames (1983) led to US CFAA 1986.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SQL Slammer: 376-byte UDP packet worm.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stuxnet (2010): First SCADA kinetic weapon.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SolarWinds (2020): Supply chain build poison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Evolution of Hacking: From Curiosity to Cyber Threats FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Evolution of Hacking: From Curiosity to Cyber Threats (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As you study the history of hacking from the 1950s MIT railroad clubs to modern state-sponsored APTs, recognize that the underlying technical principles have not fundamentally changed—what changed is the stakes. A simple buffer overflow in 1988 crashed an academic ARPANET; a similar memory bug today can shut down an ICU hospital or a high-voltage power grid in West Bengal. Learn from the past to build resilient, unyielding defenses for the future."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
