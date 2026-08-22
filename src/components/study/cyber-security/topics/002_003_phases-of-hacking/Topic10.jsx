import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: Kill Chain Stage State
  const [selectedKillChainKey, setSelectedKillChainKey] = useState("delivery");

  // Studio 2: MITRE Technique State
  const [selectedTacticKey, setSelectedTacticKey] = useState("cred_access");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_killchain");

  // Cyber Kill Chain 7 Stages Data for Studio 1
  const killChainStages = {
    recon: {
      key: "recon",
      stageNum: 1,
      name: "1. Reconnaissance",
      objective: "Researching target infrastructure, harvesting employee emails, and scanning external IP ranges.",
      mitreTactic: "Reconnaissance (TA0043) & Resource Development (TA0042)",
      mitreTechniques: "T1595 (Active Scanning), T1589 (Gather Victim Identity Info)",
      actorProcedure: "APT29 querying LinkedIn and Shodan for corporate VPN portals and engineer emails.",
      breakPointDefense: "OSINT exposure audits, WHOIS privacy guards, and web application port filtering.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    weaponization: {
      key: "weaponization",
      stageNum: 2,
      name: "2. Weaponization",
      objective: "Coupling an exploit with a backdoor payload into a deliverable package (e.g. Word Macro + C2 Beacon).",
      mitreTactic: "Resource Development (TA0042) & Execution (TA0002)",
      mitreTechniques: "T1587 (Develop Capabilities), T1588 (Obtain Capabilities)",
      actorProcedure: "Lazarus Group compiling malicious Microsoft Office macro document embedding DLL loader.",
      breakPointDefense: "Threat Intelligence sharing via STIX/TAXII; compiling YARA rules on weaponized builders.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    delivery: {
      key: "delivery",
      stageNum: 3,
      name: "3. Delivery",
      objective: "Transmitting weaponized payload to the victim via email attachment, spear-phishing link, or USB.",
      mitreTactic: "Initial Access (TA0001)",
      mitreTechniques: "T1566.001 (Spearphishing Attachment), T1566.002 (Spearphishing Link)",
      actorProcedure: "Transmitting fake 'Urgent_Q3_Incentives.xlsm' to finance employees over email.",
      breakPointDefense: "CRITICAL BREAK POINT: Email sandboxing, DMARC/DKIM/SPF enforcement, and user security training.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    exploitation: {
      key: "exploitation",
      stageNum: 4,
      name: "4. Exploitation",
      objective: "Triggering software vulnerability or tricking the user into executing malicious code.",
      mitreTactic: "Execution (TA0002)",
      mitreTechniques: "T1203 (Exploitation for Client Execution), T1059.001 (PowerShell Execution)",
      actorProcedure: "VBA macro executes hidden PowerShell command downloading stage 2 in memory.",
      breakPointDefense: "CRITICAL BREAK POINT: Microsoft Attack Surface Reduction (ASR) rules, ASLR, DEP, and EDR script blocking.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    installation: {
      key: "installation",
      stageNum: 5,
      name: "5. Installation",
      objective: "Installing a backdoor, scheduled task, or registry run key to maintain persistent access on victim host.",
      mitreTactic: "Persistence (TA0003) & Privilege Escalation (TA0004)",
      mitreTechniques: "T1547.001 (Registry Run Keys), T1053.005 (Scheduled Tasks)",
      actorProcedure: "Payload registers scheduled task executing beacon binary every system startup.",
      breakPointDefense: "Sysmon Event ID 13 / 1 monitoring, Application Whitelisting (AppLocker), and FIM audits.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    c2: {
      key: "c2",
      stageNum: 6,
      name: "6. Command & Control (C2)",
      objective: "Establishing an encrypted, two-way remote communication channel over HTTPS or DNS.",
      mitreTactic: "Command and Control (TA0011)",
      mitreTechniques: "T1071.001 (Web Protocols: HTTPS), T1027 (Obfuscated / Encrypted Channels)",
      actorProcedure: "Cobalt Strike beacon transmitting HTTPS heartbeats with 30% randomized jitter.",
      breakPointDefense: "Next-Gen Firewalls (NGFW) with SSL/TLS Decryption, DNS sinkholing, and statistical traffic jitter analysis.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800"
    },
    actions_objectives: {
      key: "actions_objectives",
      stageNum: 7,
      name: "7. Actions on Objectives",
      objective: "Achieving the final operational goal: data theft, ransomware encryption, or SCADA switchgear sabotage.",
      mitreTactic: "Exfiltration (TA0010) & Impact (TA0040)",
      mitreTechniques: "T1048 (Exfiltration Over Alternative Protocol), T1486 (Data Encrypted for Impact)",
      actorProcedure: "Encrypting production database tables and exfiltrating financial customer records to Mega.nz.",
      breakPointDefense: "Data Loss Prevention (DLP), database micro-segmentation, and immutable offline WORM backups.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    }
  };

  const activeKillChain = killChainStages[selectedKillChainKey];

  // MITRE ATT&CK Tactic & Technique Data for Studio 2
  const mitreTactics = {
    cred_access: {
      key: "cred_access",
      tacticName: "Credential Access (TA0006)",
      techniqueId: "T1003.001",
      techniqueName: "OS Credential Dumping: LSASS Memory",
      description: "Adversaries extract plain-text passwords and NTLM hashes from LSASS memory to move laterally.",
      sigmaRule: "title: LSASS Memory Dump via Procdump\ntags:\n  - attack.credential_access\n  - attack.t1003.001\nlogsource:\n  category: process_creation\ndetection:\n  selection:\n    Image|endswith: '\\procdump.exe'\n    CommandLine|contains: 'lsass'\n  condition: selection",
      atomicRedTeamCmd: "Invoke-AtomicTest T1003.001 -TestNumbers 1",
      d3fendCountermeasure: "D3-PMAR: Process Memory Access Restriction (Windows Credential Guard)",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    execution: {
      key: "execution",
      tacticName: "Execution (TA0002)",
      techniqueId: "T1059.001",
      techniqueName: "Command & Scripting Interpreter: PowerShell",
      description: "Adversaries execute obfuscated PowerShell commands to download and run in-memory payloads.",
      sigmaRule: "title: Suspicious Encoded PowerShell Execution\ntags:\n  - attack.execution\n  - attack.t1059.001\nlogsource:\n  category: process_creation\ndetection:\n  selection:\n    CommandLine|contains:\n      - '-enc'\n      - '-EncodedCommand'\n  condition: selection",
      atomicRedTeamCmd: "Invoke-AtomicTest T1059.001 -TestNumbers 2",
      d3fendCountermeasure: "D3-SPB: Script Execution Blocking (PowerShell Constrained Language Mode)",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    persistence: {
      key: "persistence",
      tacticName: "Persistence (TA0003)",
      techniqueId: "T1547.001",
      techniqueName: "Boot or Logon Autostart: Registry Run Keys",
      description: "Adversaries add registry values under CurrentVersion\\Run to execute payloads on user logon.",
      sigmaRule: "title: Registry Run Key Persistence Addition\ntags:\n  - attack.persistence\n  - attack.t1547.001\nlogsource:\n  category: registry_set\ndetection:\n  selection:\n    TargetObject|contains: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'\n  condition: selection",
      atomicRedTeamCmd: "Invoke-AtomicTest T1547.001 -TestNumbers 1",
      d3fendCountermeasure: "D3-ARA: Application Run Key Auditing & Immutable Registry Locking",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    lateral_move: {
      key: "lateral_move",
      tacticName: "Lateral Movement (TA0008)",
      techniqueId: "T1021.002",
      techniqueName: "Remote Services: SMB/Windows Admin Shares",
      description: "Adversaries use valid credentials or NTLM hashes to execute commands over SMB (PsExec / WMI).",
      sigmaRule: "title: Lateral Movement via PsExec Service Creation\ntags:\n  - attack.lateral_movement\n  - attack.t1021.002\nlogsource:\n  category: service_creation\ndetection:\n  selection:\n    ServiceName|contains: 'PSEXESVC'\n  condition: selection",
      atomicRedTeamCmd: "Invoke-AtomicTest T1021.002 -TestNumbers 1",
      d3fendCountermeasure: "D3-NMS: Network Micro-segmentation & Microsoft LAPS Password Rotation",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeTactic = mitreTactics[selectedTacticKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_killchain",
      lead: "Mamata",
      role: "Lead Security Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Phishing Ransomware Kill Chain Disruption",
      budget: "₹9,50,000",
      framework: "Lockheed Martin Cyber Kill Chain (Delivery & Exploitation)",
      dilemma:
        "A targeted spear-phishing campaign attempted to deliver weaponized Excel macro spreadsheets to bank payment operators.",
      resolution:
        "Mamata configured email sandboxing to break the Kill Chain at Stage 3 (Delivery), mapped 12 MITRE ATT&CK technique IDs in Splunk, and eliminated all endpoint execution risk.",
      metrics: {
        killChainStageBroken: "Stage 3 (Delivery) Neutralized",
        mitreTechniquesMapped: "12 Technique IDs in Splunk SIEM",
        ransomwareExecutionRisk: "0% Endpoint Infiltration",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_ehr_gap",
      lead: "Mahima",
      role: "Chief Healthcare Information Officer",
      location: "Ichapur General Hospital",
      title: "Hospital EHR MITRE Navigator Gap Analysis",
      budget: "₹5,20,000",
      framework: "MITRE ATT&CK Navigator Heatmapping",
      dilemma:
        "Evaluating whether the hospital PACS and patient EHR network could detect APT credential access and persistence attacks.",
      resolution:
        "Mahima built a MITRE ATT&CK Navigator heatmap, identified unmonitored blind spots in WMI persistence (T1546.003), and authored Sigma detection rules to achieve 92% defensive technique coverage.",
      metrics: {
        coverageScore: "Increased from 48% to 92%",
        blindSpotsClosed: "14 Unmonitored Technique IDs",
        sigmaRulesDeployed: "38 Open Sigma Rules in SIEM",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_scada_ics",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA ATT&CK for ICS Protocol Defense",
      budget: "₹8,80,000",
      framework: "MITRE ATT&CK for ICS (Industrial Control Systems)",
      dilemma:
        "Threat actors probing 220kV substation protective relays using unauthorized Modbus function codes to alter trip thresholds.",
      resolution:
        "Debangshu mapped industrial telemetry to MITRE ATT&CK for ICS (T0836 Modify Parameter & T0855 Unauthorized Command Message), deploying deep packet inspection to block non-conforming industrial commands.",
      metrics: {
        icsTechniquesCovered: "T0836, T0855, T0809 (ICS ATT&CK)",
        modbusFilterEnforcement: "100% Whitelisted Function Codes",
        gridReliability: "100.00% Zero Physical Outage",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_atomic_lab",
      lead: "Abhronila & Susmita",
      role: "University Cyber Threat Leads",
      location: "Jadavpur University AI Labs",
      title: "Atomic Red Team & Sigma Detection Laboratory",
      budget: "₹4,00,000",
      framework: "Atomic Red Team & Sigma Detection Engineering",
      dilemma:
        "Teaching university cybersecurity students how to validate SIEM detection rules against real-world MITRE ATT&CK techniques in a controlled virtual cyber range.",
      resolution:
        "The team built a virtualized cyber range using Atomic Red Team and Sigma, guiding 140+ students through testing LSASS dumping (T1003) and authoring vendor-neutral detection rules for enterprise SOCs.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        atomicTestsExecuted: "24 Mapped ATT&CK Tests",
        sigmaSignaturesCreated: "18 Verified Detection Rules",
        compliance: "NCIIPC Educational Security Charter"
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
            Cyber Security Module 002_003 • Topic 10 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Cyber Kill Chain vs MITRE ATT&amp;CK Framework
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct adversary modeling architectures: compare Lockheed Martin's 7-stage sequential Cyber Kill Chain 
            with MITRE ATT&amp;CK's 14 enterprise tactics, master Atomic Red Team validation, and analyze the Pyramid of Pain.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Cyber Kill Chain vs MITRE ATT&CK Interactive Alignment Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⛓️</span> Studio 1: Cyber Kill Chain vs MITRE ATT&amp;CK Alignment Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 7 Cyber Kill Chain stages to inspect its mapped MITRE ATT&amp;CK tactics, technique IDs, threat actor procedure examples, and defensive break points.
            </p>
          </div>

          {/* Kill Chain Stage Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {Object.values(killChainStages).map((stg) => {
              const isSelected = selectedKillChainKey === stg.key;
              return (
                <button
                  key={stg.key}
                  onClick={() => setSelectedKillChainKey(stg.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-xs">Stage {stg.stageNum}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{stg.name.split(". ")[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Kill Chain Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeKillChain.badgeClass)}>
                  LOCKHEED MARTIN STAGE {activeKillChain.stageNum} OF 7
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeKillChain.name}
                </h3>
              </div>
            </div>

            {/* Objective */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Kill Chain Stage Objective:</span>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{activeKillChain.objective}</p>
            </div>

            {/* MITRE Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Mapped MITRE ATT&amp;CK Tactic(s)</span>
                <p className="text-gray-200 font-semibold">{activeKillChain.mitreTactic}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Representative Technique IDs</span>
                <p className="text-gray-200 font-mono text-[11.5px]">{activeKillChain.mitreTechniques}</p>
              </div>
            </div>

            {/* Threat Actor Procedure */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Real-World Threat Actor Procedure:</span>
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300">
                {activeKillChain.actorProcedure}
              </div>
            </div>

            {/* Break Point Defense */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Defensive Break-Point Strategy:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeKillChain.breakPointDefense}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: MITRE ATT&CK Navigator & Atomic Red Team Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Studio 2: MITRE ATT&amp;CK Navigator &amp; Atomic Red Team Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise tactic to inspect its specific ATT&amp;CK Technique ID, Sigma detection rule YAML syntax, Atomic Red Team test execution, and D3FEND countermeasure.
            </p>
          </div>

          {/* Tactic Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(mitreTactics).map((tac) => {
              const isSelected = selectedTacticKey === tac.key;
              return (
                <button
                  key={tac.key}
                  onClick={() => setSelectedTacticKey(tac.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tac.tacticName.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5 font-mono">{tac.techniqueId}</div>
                </button>
              );
            })}
          </div>

          {/* Active Tactic Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border font-mono", activeTactic.badgeClass)}>
                  {activeTactic.techniqueId} • {activeTactic.tacticName}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeTactic.techniqueName}
                </h3>
              </div>
            </div>

            {/* Technique Description */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{activeTactic.description}</p>

            {/* Sigma Rule Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Universal Sigma Detection Rule (YAML):</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-indigo-300 overflow-x-auto whitespace-pre-wrap">
                {activeTactic.sigmaRule}
              </pre>
            </div>

            {/* Atomic Red Team Test & D3FEND */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Atomic Red Team CLI Test</span>
                <p className="text-emerald-300 font-mono text-[11.5px]">{activeTactic.atomicRedTeamCmd}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">MITRE D3FEND Countermeasure</span>
                <p className="text-gray-200">{activeTactic.d3fendCountermeasure}</p>
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
              Visualizing the 7 Sequential Stages of the Cyber Kill Chain and the Pyramid of Pain vs MITRE ATT&amp;CK.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Cyber Kill Chain 7 Stages */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 7-Stage Cyber Kill Chain
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Recon */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="100" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="70" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">1. RECON</text>
                  </g>
                  <line x1="120" y1="50" x2="140" y2="50" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Step 2: Weaponize */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="140" y="30" width="105" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="192" y="55" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8">2. WEAPONIZE</text>
                  </g>
                  <line x1="245" y1="50" x2="265" y2="50" stroke="#6366f1" strokeWidth="1.5" />

                  {/* Step 3: Deliver */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="30" width="100" height="40" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="315" y="55" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8">3. DELIVER</text>
                  </g>
                  <line x1="365" y1="50" x2="385" y2="50" stroke="#f59e0b" strokeWidth="1.5" />

                  {/* Step 4: Exploit */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="385" y="30" width="95" height="40" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="432" y="55" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">4. EXPLOIT</text>
                  </g>

                  {/* Down and back for steps 5-7 */}
                  <line x1="432" y1="70" x2="432" y2="105" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Step 5: Install */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="365" y="105" width="115" height="40" rx="4" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="422" y="130" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8">5. INSTALL</text>
                  </g>
                  <line x1="365" y1="125" x2="335" y2="125" stroke="#d8b4fe" strokeWidth="1.5" />

                  {/* Step 6: C2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="215" y="105" width="120" height="40" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="275" y="130" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8">6. COMMAND &amp; C2</text>
                  </g>
                  <line x1="215" y1="125" x2="185" y2="125" stroke="#06b6d4" strokeWidth="1.5" />

                  {/* Step 7: Actions on Objectives */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="165" height="40" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="102" y="130" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">7. ACTIONS ON OBJ.</text>
                  </g>

                  {/* Operational Summary */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="175" width="460" height="115" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="200" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10.5">BREAKING THE SEQUENTIAL KILL CHAIN</text>
                    <text x="35" y="225" fill="#cbd5e1" font-family="monospace" fontSize="8.5">• Linear Model: Breaking ANY 1 link completely stops the cyber intrusion!</text>
                    <text x="35" y="243" fill="#cbd5e1" font-family="monospace" fontSize="8.5">• Block at Stage 3 (Delivery via Email Filter) -> Stage 4 Exploitation never occurs!</text>
                    <text x="250" y="270" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">NCIIPC &amp; CERT-In map national threat advisories to MITRE ATT&amp;CK IDs.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: The 7 sequential stages of the Cyber Kill Chain; breaking any stage halts the attack.
              </p>
            </div>

            {/* Diagram 2: The Pyramid of Pain */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>⛰️</span> Diagram B: The Pyramid of Pain (David Bianco)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Layer: TTPs */}
                  <polygon points="250,25 210,70 290,70" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="250" y="55" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8">TTPs (TOUGH!)</text>

                  {/* Layer 2: Tools */}
                  <polygon points="210,72 290,72 325,115 175,115" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="250" y="98" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="8.5">Tools (Challenging)</text>

                  {/* Layer 3: Artifacts */}
                  <polygon points="175,117 325,117 360,160 140,160" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1.5" />
                  <text x="250" y="143" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">Host / Network Artifacts (Annoying)</text>

                  {/* Layer 4: Domains & IPs */}
                  <polygon points="140,162 360,162 400,210 100,210" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="250" y="188" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">Domain Names &amp; IP Addresses (Simple / Easy)</text>

                  {/* Layer 5: Hashes */}
                  <polygon points="100,212 400,212 445,265 55,265" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="250" y="242" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="9">Hash Values: SHA-256 / MD5 (Trivial to change)</text>

                  {/* Label */}
                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8.5">
                    Detecting TTPs (Apex) forces adversaries to reinvent their entire operational tradecraft!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: The Pyramid of Pain shows why detecting adversary TTPs inflicts maximum cost on attackers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Threat Modeling Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads break phishing kill chains, execute MITRE Navigator gap analyses, defend SCADA ICS protocols, and author Atomic Red Team labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Modeling Dilemma ({currentLocalScenario.framework})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Strategic Framework Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
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
              Guidelines for SOC analysts and threat intelligence architects applying adversary frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Threat Modeling Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Map Every Alert to MITRE IDs:</strong> Standardizes SIEM alerts across all security tools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Validate with Atomic Red Team:</strong> Test whether SIEM rules actually trigger when techniques run.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Focus on Top of Pyramid:</strong> Detect adversary TTPs to inflict maximum operational pain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Kill Chain for Board:</strong> Communicate attack progression metrics simply to executives.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Modeling Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on File Hashes Alone:</strong> Attackers change hashes in seconds (Bottom of pyramid).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Forcing Kill Chain on Cloud:</strong> Cloud API token breaches bypass delivery and installation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Collecting Unmapped Intel:</strong> Threat feeds are useless if not mapped to Sigma detection rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring ICS/SCADA Matrices:</strong> Standard IT frameworks fail to model physical switchgear threats.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy MITRE Navigator Heatmaps:</strong> Identify defensive blind spots and prioritize engineering budget.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Write Vendor-Neutral Sigma Rules:</strong> Author detection rules in YAML that compile to any SIEM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Adopt MITRE D3FEND:</strong> Map offensive adversary techniques directly to engineering countermeasures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Ingest STIX/TAXII Threat Feeds:</strong> Automate national CERT-In and NCIIPC intelligence updates.</span>
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
              Synthesize key Cyber Kill Chain and MITRE ATT&amp;CK concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Threat Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why the Cyber Kill Chain and MITRE ATT&CK complement each other rather than compete: the Kill Chain provides executive-level phase metrics and perimeter break points, while MITRE ATT&CK gives SOC analysts the granular telemetry to detect specific adversary TTPs.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  David Bianco's Pyramid of Pain: blocking file hashes is trivial for attackers to evade, but detecting and disrupting their Tactics, Techniques, and Procedures (TTPs) at the apex forces them to reinvent their entire operational machinery.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future SOC engineering work, write your detection rules in vendor-neutral Sigma format and validate them against real endpoints using Atomic Red Team scripted tests.
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
                <span>Cyber Kill Chain has 7 sequential stages; breaking 1 stops the attack.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MITRE ATT&CK has 14 Enterprise Tactics (The 'Why') &amp; Techniques (The 'How').</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Procedures represent the exact software implementation used by threat groups.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Pyramid of Pain: Hashes are trivial; TTPs inflict maximum pain on attackers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Atomic Red Team provides scripted tests mapped to ATT&CK technique IDs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>NCIIPC and CERT-In map national threat advisories to MITRE ATT&CK IDs.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Cyber Kill Chain vs MITRE ATT&amp;CK Framework FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Cyber Kill Chain vs MITRE ATT&amp;CK Framework (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Adversary modeling frameworks give cybersecurity engineers a common operational language. When you understand both the high-level sequential break-points of the Cyber Kill Chain and the deep, granular matrix of MITRE ATT&CK, you possess the complete toolkit to advise board directors and empower SOC analysts to hunt down sophisticated threats."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
