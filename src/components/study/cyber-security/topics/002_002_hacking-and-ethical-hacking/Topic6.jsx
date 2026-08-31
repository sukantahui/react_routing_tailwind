import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

const Topic6 = () => {
  // Studio 1: Team Triad Selector State
  const [selectedTeamKey, setSelectedTeamKey] = useState("purple_team");

  // Studio 2: Purple Team Atomic Simulation State
  const [selectedAtomicTechniqueKey, setSelectedAtomicTechniqueKey] = useState("t1003_lsass");
  const [isRuleTuned, setIsRuleTuned] = useState(false);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_kerberoast");

  // Team Triad Data for Studio 1
  const teamTriadData = {
    red_team: {
      key: "red_team",
      name: "Red Team (Offensive Adversary Emulation)",
      icon: "⚔️",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      mission:
        "Act as an advanced threat actor (APT) to test an enterprise's defense-in-depth posture, detection capabilities, incident response velocity, and physical security barriers without prior warning.",
      arsenal: "Cobalt Strike, Sliver C2, BloodHound, Mimikatz, Direct Syscalls (SysWhispers), Proxmark3, Rubber Ducky",
      keyMetrics: "Objective Compromise Rate, Adversary Dwell Time Evasion, Time to First Domain Admin",
      keyDeliverable: "Adversarial Attack Path Narrative, SOC Detection Evasion Analysis, Executive Debrief Presentation"
    },
    blue_team: {
      key: "blue_team",
      name: "Blue Team (Defensive SOC & Incident Response)",
      icon: "🛡️",
      color: "from-blue-500 to-indigo-600",
      badgeClass: "bg-blue-900/50 text-blue-300 border-blue-700",
      mission:
        "Continuously monitor infrastructure telemetry 24/7, detect anomalous behavior, hunt for stealthy adversaries, contain active intrusions, and execute forensic incident response.",
      arsenal: "Splunk Enterprise SIEM, Microsoft Sentinel, CrowdStrike Falcon EDR, Cortex XSOAR, Suricata IDS, Zeek",
      keyMetrics: "MTTD (< 1 min), MTTA (< 10 mins), MTTR (< 60 mins), Mean Time to Contain (1-10-60 Rule)",
      keyDeliverable: "Incident Triage Register, Forensic Root Cause Analysis, 6-Hour Statutory CERT-In Notification"
    },
    purple_team: {
      key: "purple_team",
      name: "Purple Team (Collaborative Detection Engineering)",
      icon: "🔮",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      mission:
        "Serve as the continuous collaborative bridge uniting Red and Blue teams: executing atomic tests against defensive controls and tuning SIEM/EDR detection rules in a real-time closed feedback loop.",
      arsenal: "Atomic Red Team, MITRE Caldera, Sigma Rules Compiler (pySigma), Yara, VECTR Maturity Dashboard",
      keyMetrics: "MITRE ATT&CK Matrix Coverage %, Alert True-Positive Ratio, False Positive Reduction Rate",
      keyDeliverable: "Custom Sigma / Yara Detection Rule Registry, Continuous Telemetry Gap Remediation Plan"
    }
  };

  const activeTeam = teamTriadData[selectedTeamKey];

  // Atomic Testing Techniques Data for Studio 2
  const atomicTechniques = {
    t1003_lsass: {
      key: "t1003_lsass",
      techniqueId: "T1003.001",
      title: "LSASS Memory Credential Dumping (Mimikatz / Comsvcs)",
      command: "rundll32.exe C:\\windows\\System32\\comsvcs.dll, MiniDump (Get-Process lsass).Id C:\\temp\\lsass.dmp full",
      baselineStatus: "MISS (Default SIEM lacked process creation command-line logging)",
      tunedSigmaRule:
        "title: LSASS Dump via Comsvcs DLL\nlogsource:\n  category: process_creation\n  product: windows\ndetection:\n  selection:\n    Image|endswith: '\\rundll32.exe'\n    CommandLine|contains|all: ['comsvcs.dll', 'MiniDump']\n  condition: selection\nlevel: critical",
      tunedStatus: "ALERT (Instant Severity-1 Critical Breach Alert Triggered in SIEM & EDR)"
    },
    t1059_powershell: {
      key: "t1059_powershell",
      techniqueId: "T1059.001",
      title: "Obfuscated Base64 Encoded PowerShell Command Execution",
      command: "powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQA...",
      baselineStatus: "MISS (Standard Antivirus bypassed by Base64 payload in RAM)",
      tunedSigmaRule:
        "title: Suspicious Encoded PowerShell Execution\nlogsource:\n  category: process_creation\n  product: windows\ndetection:\n  selection:\n    Image|endswith: '\\powershell.exe'\n    CommandLine|contains: ['-EncodedCommand', '-enc', '-w hidden']\n  condition: selection\nlevel: high",
      tunedStatus: "BLOCKED (Host Isolated automatically via Cortex SOAR Playbook in 1.4s)"
    },
    t1047_wmi: {
      key: "t1047_wmi",
      techniqueId: "T1047",
      title: "Lateral Movement via Windows Management Instrumentation (WMI)",
      command: "wmic /node:192.168.1.50 process call create 'powershell.exe -c Get-Service'",
      baselineStatus: "MISS (Treated as benign administrative traffic by firewall)",
      tunedSigmaRule:
        "title: Remote Process Creation via WMI\nlogsource:\n  category: process_creation\n  product: windows\ndetection:\n  selection:\n    ParentImage|endswith: '\\WmiPrvSE.exe'\n    Image|endswith: ['\\cmd.exe', '\\powershell.exe']\n  condition: selection\nlevel: high",
      tunedStatus: "DETECTED (High-Fidelity IOA Flagged in Microsoft Sentinel Console)"
    },
    t1490_vssadmin: {
      key: "t1490_vssadmin",
      techniqueId: "T1490",
      title: "Shadow Copy Deletion & Ransomware Inhibit System Recovery",
      command: "vssadmin.exe delete shadows /all /quiet",
      baselineStatus: "MISS (Executed without triggering basic Windows Defender alert)",
      tunedSigmaRule:
        "title: Volume Shadow Copy Deletion via VSSAdmin\nlogsource:\n  category: process_creation\n  product: windows\ndetection:\n  selection:\n    Image|endswith: '\\vssadmin.exe'\n    CommandLine|contains|all: ['delete', 'shadows']\n  condition: selection\nlevel: critical",
      tunedStatus: "TERMINATED (Process killed in RAM and immutable S3 backup locked)"
    }
  };

  const activeTechnique = atomicTechniques[selectedAtomicTechniqueKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_kerberoast",
      lead: "Mamata",
      role: "Lead Blue Team SOC Manager",
      location: "Kolkata FinTech Operations Center",
      title: "Active Directory Kerberoasting Defense",
      budget: "₹8,50,000",
      teamFocus: "Blue Team Detection & Honeytoken Deployment",
      dilemma:
        "A stealthy adversary queried Active Directory Service Principal Names (SPNs) for core banking SQL servers, attempting to extract and crack Kerberos TGS ticket hashes offline.",
      resolution:
        "Mamata deployed canary honeytoken accounts with fake SPNs (`svc_sql_decoy`). The instant the adversary requested a ticket for the decoy account, the SIEM triggered an automated Tier-1 breach alarm, isolating the compromised host in 4 minutes.",
      metrics: {
        mttdAchieved: "42 Seconds",
        mttrAchieved: "4.2 Minutes (1-10-60 Benchmark Met)",
        honeytokenFired: "100% True-Positive Detection",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_purple",
      lead: "Mahima",
      role: "Principal Purple Team Engineer",
      location: "Ichapur General Hospital",
      title: "Purple Team Hospital EDR Validation",
      budget: "₹5,20,000",
      teamFocus: "Purple Team Atomic Testing Workshop",
      dilemma:
        "Validating whether the hospital's EDR and SIEM would detect the specific Living-off-the-Land (LOLBins) and Shadow Copy deletion techniques used by LockBit 3.0 ransomware.",
      resolution:
        "Mahima led a collaborative 3-day Purple Team exercise using Atomic Red Team. The team executed 25 atomic tests, authoring 18 custom Sigma rules that elevated telemetry coverage across 40 critical ICU servers from 32% to 98%.",
      metrics: {
        atomicTestsRun: "25 MITRE ATT&CK Techniques",
        detectionCoverage: "98% Telemetry Matrix",
        sigmaRulesAuthored: "18 Custom Signatures",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_red",
      lead: "Debangshu",
      role: "Lead OT Red Team Operator",
      location: "Barrackpore Industrial Power Grid",
      title: "220kV Substation Adversary Emulation",
      budget: "₹6,80,000",
      teamFocus: "Red Team Threat Emulation & Malleable C2",
      dilemma:
        "Emulating a nation-state threat actor (APT) targeting industrial SCADA RTU controllers to test whether internal OT engineers would notice stealthy lateral movement.",
      resolution:
        "Debangshu utilized malleable C2 profiles that disguised beacon traffic as legitimate industrial telemetry. He successfully reached the engineering workstation without triggering alarms, demonstrating the urgent need for OT network micro-segmentation.",
      metrics: {
        redTeamObjective: "100% Objective Completed",
        scadaDowntime: "0.00 Seconds (Safe Emulation)",
        remediationPlan: "Unidirectional Optical Data Diodes",
        compliance: "CEA Cyber Security Framework"
      }
    },
    {
      id: "jadavpur_syscall",
      lead: "Abhronila & Susmita",
      role: "Detection Engineering Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Direct System Call EDR Hook Detection",
      budget: "₹4,20,000",
      teamFocus: "Purple Team Detection Engineering Research",
      dilemma:
        "Advanced Red Teams use Direct System Calls (SysWhispers) to bypass user-mode EDR hooks in `ntdll.dll`, executing unmonitored memory injection.",
      resolution:
        "The team authored detection rules that hook kernel-mode ETW-Ti (Event Tracing for Windows - Threat Intelligence), creating high-fidelity Sigma rules that detect direct assembly syscalls and publishing the research to the open-source community.",
      metrics: {
        etwTiRulesPublished: "4 Open-Source Sigma Signatures",
        evasionsNeutralized: "SysWhispers2 & Inline Hooks",
        academicImpact: "National Cyber Research Commendation",
        compliance: "Open-Source Security Standards"
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
            Cyber Security Module 002_002 • Topic 6 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Specialized Hackers: Red, Blue, and Purple Teams
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Master the specialized dynamic triad of enterprise cyber defense: Offensive Adversary Emulation (Red Team), 
            Defensive SOC &amp; Incident Response (Blue Team), and Continuous Collaborative Detection Engineering (Purple Team). 
            Explore the 1-10-60 benchmark, Atomic Red Team testing, and universal Sigma detection rules.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Red vs Blue vs Purple Team Mission & Arsenal Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔮</span> Studio 1: The Specialized Team Triad &amp; Tooling Arsenal
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a specialized team to inspect its core operational mission, primary weapon systems, performance benchmarks (MTTD/MTTR), and tangible deliverable outputs.
            </p>
          </div>

          {/* Team Switcher Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(teamTriadData).map((team) => {
              const isSelected = selectedTeamKey === team.key;
              return (
                <button
                  key={team.key}
                  onClick={() => setSelectedTeamKey(team.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{team.icon}</div>
                  <div className="font-bold text-sm text-gray-200 mt-1">{team.name.split(" (")[0]}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-0.5">{team.name.split(" (")[1]?.replace(")", "")}</div>
                </button>
              );
            })}
          </div>

          {/* Active Team Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeTeam.badgeClass)}>
                  {activeTeam.name.split(" (")[0]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Operational Mandate &amp; Strategy
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Key Performance Metric</span>
                <span className="text-xs sm:text-sm font-bold text-amber-300">{activeTeam.keyMetrics.split(", ")[0]}</span>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Primary Mission Objective</span>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{activeTeam.mission}</p>
            </div>

            {/* Arsenal & Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-purple-300 font-bold uppercase tracking-wider block">Primary Arsenal &amp; Toolset</span>
                <p className="text-gray-300 font-mono text-[11px] leading-relaxed">{activeTeam.arsenal}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1.5">
                <span className="text-amber-300 font-bold uppercase tracking-wider block">Operational Benchmarks</span>
                <p className="text-gray-300 text-[11px] leading-relaxed">{activeTeam.keyMetrics}</p>
              </div>
            </div>

            {/* Deliverable */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Primary Operational Deliverable:</span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeTeam.keyDeliverable}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Purple Team Collaborative Emulation & Detection Tuning Lab */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧪</span> Studio 2: Purple Team Collaborative Detection Engineering Lab
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an offensive MITRE ATT&amp;CK technique, observe the initial detection gap, and apply a tuned Sigma detection rule to verify instant telemetry enhancement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Technique Selector Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Select Atomic Attack Technique
              </h3>

              <div className="space-y-2">
                {Object.values(atomicTechniques).map((tech) => {
                  const isSelected = selectedAtomicTechniqueKey === tech.key;
                  return (
                    <button
                      key={tech.key}
                      onClick={() => {
                        setSelectedAtomicTechniqueKey(tech.key);
                        setIsRuleTuned(false);
                      }}
                      className={clsx(
                        "w-full p-3 rounded-xl text-left transition border text-xs space-y-0.5",
                        isSelected
                          ? "bg-indigo-950/90 text-white border-indigo-500 shadow-md"
                          : "bg-gray-900 text-gray-400 border-gray-800 hover:bg-gray-850 hover:text-white"
                      )}
                    >
                      <div className="flex justify-between">
                        <span className="font-mono text-indigo-300 font-bold">{tech.techniqueId}</span>
                        <span className="text-[10px] text-gray-500">Atomic Test</span>
                      </div>
                      <div className="font-semibold text-gray-200 truncate">{tech.title.split(" (")[0]}</div>
                    </button>
                  );
                })}
              </div>

              {/* Action Button to Tune Rule */}
              <button
                onClick={() => setIsRuleTuned(!isRuleTuned)}
                className={clsx(
                  "w-full py-2.5 rounded-xl font-bold text-xs transition duration-200 border",
                  isRuleTuned
                    ? "bg-emerald-950 text-emerald-300 border-emerald-700 hover:bg-emerald-900"
                    : "bg-purple-900 text-purple-200 border-purple-600 hover:bg-purple-850"
                )}
              >
                {isRuleTuned ? "✓ Detection Rule Active (Reset Lab)" : "⚡ Apply Purple Team Sigma Rule"}
              </button>
            </div>

            {/* Execution Simulation Card (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeTechnique.title}</h3>
                  <span className="text-xs text-gray-400">MITRE ATT&amp;CK {activeTechnique.techniqueId}</span>
                </div>
                <div className={clsx(
                  "text-xs font-bold px-3 py-1 rounded-full border",
                  isRuleTuned ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-rose-950 text-rose-300 border-rose-800"
                )}>
                  {isRuleTuned ? "100% BLOCKED / ALERTED" : "DEFENSIVE BLINDSPOT (MISS)"}
                </div>
              </div>

              {/* Atomic Command */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Red Team Atomic Command Executed:
                </span>
                <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[11px] font-mono text-gray-300 overflow-x-auto">
                  {activeTechnique.command}
                </pre>
              </div>

              {/* Detection Status Comparison */}
              <div className="space-y-2 text-xs">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                  Blue Team SIEM / EDR Telemetry Status:
                </span>
                <div className={clsx(
                  "p-3.5 rounded-xl border transition-all duration-300",
                  isRuleTuned ? "bg-emerald-950/60 border-emerald-700/60 text-emerald-200" : "bg-rose-950/60 border-rose-700/60 text-rose-200"
                )}>
                  <div className="font-bold">{isRuleTuned ? activeTechnique.tunedStatus : activeTechnique.baselineStatus}</div>
                </div>
              </div>

              {/* Tuned Sigma Rule Display */}
              {isRuleTuned && (
                <div className="space-y-1.5 animate-fadeIn">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    Purple Team Sigma Rule Applied:
                  </span>
                  <pre className="p-3 bg-gray-900 rounded-xl border border-emerald-900/40 text-[10.5px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {activeTechnique.tunedSigmaRule}
                  </pre>
                </div>
              )}
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
              Visualizing the Red, Blue, and Purple Team Triad Interaction Model and the SANS/NIST 6-Stage Incident Response Lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Team Triad Interaction Model */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                <span>🔮</span> Diagram A: The Red, Blue &amp; Purple Team Triad
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Red Circle */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="160" cy="110" r="85" fill="#450a0a" stroke="#ef4444" strokeWidth="2" fillOpacity="0.8" />
                    <text x="120" y="95" fill="#fee2e2" fontWeight="bold" fontSize="13">RED TEAM</text>
                    <text x="120" y="112" fill="#fca5a5" fontSize="8.5">Offensive TTPs</text>
                    <text x="120" y="126" fill="#fca5a5" fontSize="8.5">Cobalt Strike</text>
                  </g>

                  {/* Blue Circle */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <circle cx="340" cy="110" r="85" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" fillOpacity="0.8" />
                    <text x="340" y="95" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="13">BLUE TEAM</text>
                    <text x="340" y="112" fill="#a5b4fc" textAnchor="middle" fontSize="8.5">Defensive SOC</text>
                    <text x="340" y="126" fill="#a5b4fc" textAnchor="middle" fontSize="8.5">SIEM / EDR</text>
                  </g>

                  {/* Purple Overlap Area */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <ellipse cx="250" cy="110" rx="45" ry="60" fill="#3b0764" stroke="#d8b4fe" strokeWidth="2" />
                    <text x="250" y="105" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="11">PURPLE</text>
                    <text x="250" y="120" fill="#e9d5ff" textAnchor="middle" fontSize="8">TEAM</text>
                  </g>

                  {/* Continuous Improvement Banner */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="220" width="460" height="70" rx="8" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="250" y="245" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="11">CONTINUOUS CLOSED-LOOP DETECTION TUNING</text>
                    <text x="250" y="262" fill="#cbd5e1" textAnchor="middle" fontSize="9">Atomic Red Test -&gt; Telemetry Gap Identified -&gt; Sigma Rule Authored -&gt; 100% Defense</text>
                    <text x="250" y="278" fill="#d8b4fe" textAnchor="middle" fontSize="8.5">"Red tests, Blue monitors, Purple unifies for unbreakable enterprise defense."</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.1: The Purple Team unites offensive Red testing and defensive Blue monitoring into a continuous improvement loop.
              </p>
            </div>

            {/* Diagram 2: SANS/NIST 6-Stage Incident Response */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <span>🛡️</span> Diagram B: SANS/NIST 6-Stage Incident Response
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. Preparation</text>
                    <text x="85" y="56" fill="#94a3b8" textAnchor="middle" fontSize="8">Playbooks &amp; EDR</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan4)" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">2. Identification</text>
                    <text x="250" y="56" fill="#c7d2fe" textAnchor="middle" fontSize="8">SIEM Telemetry</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowCyan4)" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="42" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">3. Containment</text>
                    <text x="415" y="56" fill="#fde68a" textAnchor="middle" fontSize="8">Isolate Subnets</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="415" y="132" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10">4. Eradication</text>
                    <text x="415" y="146" fill="#fca5a5" textAnchor="middle" fontSize="8">Kill C2 &amp; Reset PWD</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowCyan4)" />

                  {/* Step 5 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="110" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">5. Recovery</text>
                    <text x="250" y="146" fill="#a7f3d0" textAnchor="middle" fontSize="8">Restore Clean WORM</text>
                  </g>

                  <path d="M 185 135 L 155 135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCyan4)" />

                  {/* Step 6 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="130" height="50" rx="6" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
                    <text x="85" y="132" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="10">6. Lessons Learn</text>
                    <text x="85" y="146" fill="#e9d5ff" textAnchor="middle" fontSize="8">Post-Mortem &amp; Sigma</text>
                  </g>

                  {/* Statutory Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="195" width="460" height="90" rx="8" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="250" y="220" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11.5">INDIAN STATUTORY INCIDENT MANDATES</text>
                    <text x="250" y="238" fill="#cbd5e1" textAnchor="middle" fontSize="9">Mandatory CERT-In Notification within 6 Hours • 180-Day Centralized Log Archival</text>
                    <text x="250" y="255" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">CrowdStrike 1-10-60 Rule: 1 min detect, 10 min triage, 60 min remediate</text>
                    <text x="250" y="272" fill="#fbbf24" textAnchor="middle" fontSize="8">DPDP Act 2023 Penalty Cap: ₹250 Crores for failure to safeguard data</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan4" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 6.2: SANS/NIST 6-stage Incident Response lifecycle with Indian statutory compliance benchmarks.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Specialized Team Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Examine how Red, Blue, and Purple teams collaborate to defend enterprise infrastructure across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">SOC / Red Team Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Operational Threat &amp; Dilemma
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Team Collaborative Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Compliance Standards
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
              Guidelines to maximize the synergy between Red, Blue, and Purple teams in enterprise operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Collaborative Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Honeytokens:</strong> Plant decoy admin SPNs in AD for zero-false-positive intrusion alerts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Adopt Sigma Rules:</strong> Write universal YAML detection signatures that translate across any SIEM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Practice Atomic Tests:</strong> Test one MITRE technique at a time with Atomic Red Team.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Target 1-10-60 SLA:</strong> 1 min detect, 10 min triage, 60 min full containment.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Team Pitfalls to Avoid
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ego-Driven Red Teaming:</strong> Treating exercises as a competition to embarrass Blue team analysts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Alert Fatigue:</strong> Leaving thousands of un-tuned false-positive alarms active in the SIEM console.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Static Hash Reliance:</strong> Relying on file hashes rather than behavioral IOAs at the top of the Pyramid of Pain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing Incident Mandates:</strong> Failing to report confirmed breaches to CERT-In within 6 hours.</span>
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
                  <span><strong>Institutionalize Purple Teaming:</strong> Run weekly joint detection engineering workshops.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Automate with SOAR:</strong> Build automated playbooks to isolate endpoints and block malicious IPs instantly.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce 180-Day Log Archival:</strong> Retain immutable telemetry in compliance with CERT-In directives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Track MITRE ATT&amp;CK Coverage:</strong> Quantify enterprise detection maturity using heatmaps.</span>
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
              Synthesize key Red, Blue, and Purple team concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Defensive &amp; Offensive Practitioners
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why David Bianco's Pyramid of Pain places TTPs at the apex: blocking an IP address is easy for attackers to bypass, but detecting behavioral techniques forces attackers to redesign their entire tradecraft.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Purple Teaming removes the friction between Red and Blue: testing one atomic technique in real time with defenders watching their SIEM screens eliminates months of guesswork.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future detection engineering work, author detection rules in vendor-neutral Sigma YAML format so they can be compiled instantly into Splunk, Elastic, or Azure Sentinel.
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
                <span>Red emulates adversaries; Blue defends; Purple unites.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CrowdStrike 1-10-60 Rule: 1m detect, 10m triage, 60m contain.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SANS 6-stage IR: Prep, Identify, Contain, Eradicate, Recover, Lessons.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Pyramid of Pain: TTPs at the top are most painful to alter.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Sigma rules provide universal YAML detection signatures.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates incident notification within 6 hours.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Specialized Hackers: Red, Blue, and Purple Teams FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Specialized Hackers: Red, Blue, and Purple Teams (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The future of enterprise defense in India lies in Purple Teaming. An offensive Red Team that doesn't help the Blue Team improve is wasting corporate resources, and a Blue Team that refuses to test against real-world adversarial TTPs is operating in blind complacency. Embrace the collaborative spirit: test aggressively, detect accurately, automate relentlessly, and elevate the cybersecurity resilience of our nation."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
