import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: Anti-Forensics Technique State
  const [selectedTechniqueKey, setSelectedTechniqueKey] = useState("log_wiping");

  // Studio 2: Timestomp Forensic Analysis State
  const [selectedMftFileKey, setSelectedMftFileKey] = useState("malware_exe");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_worm");

  // Anti-Forensics Techniques Data for Studio 1
  const antiForensicTechniques = {
    log_wiping: {
      key: "log_wiping",
      name: "Event Log Deletion & Tampering",
      adversaryGoal: "Erase Windows Security Event Logs and Linux /var/log entries to eliminate intrusion records.",
      ethicalMandate: "NEVER modify or delete client audit logs (doing so destroys compliance and evidence).",
      residualArtifact: "Windows Event ID 1102 ('The audit log was cleared') recorded immediately before deletion.",
      blueTeamDefense: "Centralized Immutable WORM Logging (Write-Once Read-Many) streaming over TLS Syslog.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      icon: "🧹",
      cliSyntax: "wevtutil cl Security\nwevtutil cl System\nClear-EventLog -LogName Application, Security, System"
    },
    timestomping: {
      key: "timestomping",
      name: "File Timestomping (MACE Metadata)",
      adversaryGoal: "Modify Modified, Accessed, Created, Entry (MACE) timestamps to blend malware with legitimate OS files.",
      ethicalMandate: "Do not forge timestamps; record exact test execution times in the engagement log.",
      residualArtifact: "Discrepancy between NTFS $STANDARD_INFORMATION (forged) and $FILE_NAME (true kernel timestamp).",
      blueTeamDefense: "NTFS USN Change Journal ($UsnJrnl) and Master File Table ($MFT) forensic parsers.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      icon: "⏳",
      cliSyntax: "timestomp C:\\Windows\\System32\\malware.exe -m '04/12/2018 10:20:00'\nGet-Item malware.exe | % { $_.CreationTime = '04/12/2018' }"
    },
    file_shredding: {
      key: "file_shredding",
      name: "Secure File Shredding & Deletion",
      adversaryGoal: "Overwrite disk blocks with zeroes or random bytes to prevent forensic file carving recovery.",
      ethicalMandate: "Systematically remove test binaries and document all deleted files in the cleanup sign-off.",
      residualArtifact: "Windows Prefetch (.pf) files, Shimcache, and Amcache.hve preserve execution records and SHA-1 hashes.",
      blueTeamDefense: "Endpoint Detection and Response (EDR) telemetry and Volume Shadow Copies (VSS).",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "📄",
      cliSyntax: "sdelete.exe -p 3 -z C:\\Temp\\payload.exe\nshred -u -z -n 10 /tmp/backdoor.sh"
    },
    memory_hiding: {
      key: "memory_hiding",
      name: "Memory Hiding & PEB Unlinking",
      adversaryGoal: "Unlink malicious DLLs from Process Environment Block (PEB) and hollow processes to evade memory scans.",
      ethicalMandate: "Terminate all background C2 listener threads upon engagement completion.",
      residualArtifact: "Volatility `malfind` flags unbacked executable memory pages (RWX permissions) in RAM dumps.",
      blueTeamDefense: "EDR memory scanners inspecting thread call stacks and kernel-level ETW Threat Intelligence.",
      badgeClass: "bg-cyan-950 text-cyan-300 border-cyan-800",
      icon: "🧠",
      cliSyntax: "Process Hollowing into svchost.exe\nPEB InLoadOrderModuleList Unlinking"
    }
  };

  const activeTechnique = antiForensicTechniques[selectedTechniqueKey];

  // Timestomp Forensic Files Data for Studio 2
  const mftFiles = {
    malware_exe: {
      key: "malware_exe",
      fileName: "C:\\Windows\\System32\\svchost_update.exe",
      standardInfoTime: "2019-05-14 08:30:00 (Forged to look like Windows 10 Install)",
      fileNameTime: "2026-08-23 02:14:35 (True NTFS Kernel Creation Date!)",
      usnRecord: "FileCreate at 2026-08-23 02:14:35 | DataExtend at 02:14:36",
      forensicVerdict: "FORGERY DETECTED: Attacker timestomped $STANDARD_INFORMATION by 7 years; true intrusion occurred today!",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    legit_dll: {
      key: "legit_dll",
      fileName: "C:\\Windows\\System32\\ntdll.dll",
      standardInfoTime: "2024-11-10 14:00:00",
      fileNameTime: "2024-11-10 14:00:00 (Matching Kernel Timestamp)",
      usnRecord: "OS Update Install at 2024-11-10 14:00:00",
      forensicVerdict: "CLEAN: Both $STANDARD_INFORMATION and $FILE_NAME match perfectly. Authentic Microsoft binary.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const activeMftFile = mftFiles[selectedMftFileKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_worm",
      lead: "Mamata",
      role: "Lead Security Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Immutable WORM SIEM Logging Architecture",
      budget: "₹9,50,000",
      focus: "Centralized WORM Syslog & Anti-Tamper SIEM",
      dilemma:
        "Ensuring that malicious insiders or ransomware operators cannot wipe local server audit logs to conceal fraudulent banking transactions.",
      resolution:
        "Mamata deployed real-time TLS Syslog streaming to an immutable WORM Splunk cluster and configured instant SOC alerts on Windows Event ID 1102 ('Audit Log Cleared').",
      metrics: {
        logImmutability: "100% WORM Write-Once Enforcement",
        event1102AlertSLA: "Sub-second SOC Notification",
        certInCompliance: "180-Day Secure Domestic Archival",
        compliance: "RBI Master Direction & CERT-In 2022"
      }
    },
    {
      id: "ichapur_mft",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "NTFS MFT Timestomp Forensic Triage",
      budget: "₹5,20,000",
      focus: "NTFS Master File Table & USN Journal Analysis",
      dilemma:
        "An intruder timestomped a medical database extraction script to blend with legitimate 2018 operating system files on the hospital PACS archive.",
      resolution:
        "Mahima analyzed the hospital PACS server `$MFT` using MFTECmd, uncovered the discrepancy between `$STANDARD_INFORMATION` and `$FILE_NAME`, and reconstructed the exact intrusion timeline.",
      metrics: {
        timestompedFilesIdentified: "1 Forged Extraction Script",
        forensicToolUsed: "MFTECmd & Eric Zimmerman Tools",
        evidenceIntegrity: "Section 65B Certified Chain of Custody",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_optical",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA WORM Optical Archival Compliance",
      budget: "₹8,80,000",
      focus: "Physical Write-Once Optical Archival & NTP Sync",
      dilemma:
        "Ensuring 220kV substation protective relay event logs comply with CEA and CERT-In 180-day retention rules without risk of remote tampering.",
      resolution:
        "Debangshu deployed write-once optical archival systems synchronized with NPL India atomic NTP clocks, guaranteeing immutable legal evidentiary records for all grid operations.",
      metrics: {
        physicalMedia: "WORM Optical Blu-Ray Media",
        clockSynchronization: "NPL India Stratum-1 Atomic NTP",
        logTamperResistance: "100% Physical Write-Once",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_usn",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Digital Forensics USN Journal Laboratory",
      budget: "₹4,00,000",
      focus: "USN Journal, Prefetch, & Memory Volatility Analysis",
      dilemma:
        "Teaching university cybersecurity students how to recover evidence of deleted malware using Prefetch, Shimcache, and USN Journal analysis.",
      resolution:
        "The team built a hands-on digital forensics lab with Autopsy and Volatility, guiding 140+ students through recovering shredded exploit binaries and issuing Section 65B compliant evidence certificates.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        artifactsMastered: "USN Journal, Prefetch, Volatility",
        legalCertificatesIssued: "Section 65B Evidence Protocols",
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
            Cyber Security Module 002_003 • Topic 9 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Phase 5: Covering Tracks (Log Tampering and Anti-Forensics)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct Phase 5 of ethical hacking: master the technical mechanics of event log wiping, 
            file timestomping ($STANDARD_INFORMATION vs $FILE_NAME), secure file shredding, and understand the ethical mandate of professional artifact cleanup.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Anti-Forensics vs Ethical Cleanup Operational Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🧹</span> Studio 1: Anti-Forensics vs Ethical Cleanup Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an anti-forensics vector to compare the malicious goal of an adversary against the strict professional cleanup mandate of an ethical penetration tester.
            </p>
          </div>

          {/* Technique Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(antiForensicTechniques).map((tech) => {
              const isSelected = selectedTechniqueKey === tech.key;
              return (
                <button
                  key={tech.key}
                  onClick={() => setSelectedTechniqueKey(tech.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="text-base sm:text-lg">{tech.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{tech.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{tech.key.replace("_", " ").toUpperCase()}</div>
                </button>
              );
            })}
          </div>

          {/* Active Technique Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeTechnique.badgeClass)}>
                  {activeTechnique.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Adversary Vector vs Ethical Remediation
                </h3>
              </div>
            </div>

            {/* Adversary Goal vs Ethical Mandate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Adversary Malicious Objective:</span>
                <p className="text-gray-300 leading-relaxed">{activeTechnique.adversaryGoal}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Ethical Hacker Cleanup Mandate:</span>
                <p className="text-gray-300 leading-relaxed">{activeTechnique.ethicalMandate}</p>
              </div>
            </div>

            {/* Residual Artifact & Defense */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">Forensic Residual Artifact</span>
                <p className="text-gray-200">{activeTechnique.residualArtifact}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Blue Team Immutable Defense</span>
                <p className="text-gray-200">{activeTechnique.blueTeamDefense}</p>
              </div>
            </div>

            {/* Sample CLI Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Sample Command Syntax:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-indigo-300 overflow-x-auto whitespace-pre-wrap">
                {activeTechnique.cliSyntax}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 2: NTFS Master File Table ($MFT) Timestomp Forensic Validator Sandbox */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 2: NTFS $MFT Timestomp Forensic Validator Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Inspect how digital forensic analysts uncover timestomped malware by comparing user-mode `$STANDARD_INFORMATION` with kernel-locked `$FILE_NAME` attributes in the NTFS Master File Table.
            </p>
          </div>

          {/* File Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(mftFiles).map((mf) => {
              const isSelected = selectedMftFileKey === mf.key;
              return (
                <button
                  key={mf.key}
                  onClick={() => setSelectedMftFileKey(mf.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-sm text-gray-200">{mf.fileName}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{mf.key === "malware_exe" ? "Timestomped Attack Payload" : "Authentic System Binary"}</div>
                </button>
              );
            })}
          </div>

          {/* Active MFT Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border font-mono", activeMftFile.badgeClass)}>
                  {activeMftFile.fileName}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  NTFS Master File Table ($MFT) Record Analysis
                </h3>
              </div>
            </div>

            {/* MFT Attribute Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-amber-900/30 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">$STANDARD_INFORMATION (User-Modifiable)</span>
                <p className="text-gray-200 font-mono text-[11px]">{activeMftFile.standardInfoTime}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-cyan-900/30 space-y-1">
                <span className="text-cyan-400 font-bold uppercase tracking-wider block">$FILE_NAME (Kernel-Enforced NTFS Record)</span>
                <p className="text-gray-200 font-mono text-[11px]">{activeMftFile.fileNameTime}</p>
              </div>
            </div>

            {/* USN Journal Record */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">NTFS USN Change Journal Record ($UsnJrnl:$J):</span>
              <p className="text-gray-200 font-mono text-[11px]">{activeMftFile.usnRecord}</p>
            </div>

            {/* Forensic Verdict */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">Forensic Investigation Verdict:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeMftFile.forensicVerdict}</p>
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
              Visualizing Centralized Immutable WORM Logging and NTFS Master File Table Timestomp Detection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Centralized Immutable WORM Logging */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Centralized WORM Logging vs Local Log Wiping
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Compromised Local Host */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="50" width="160" height="180" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="100" y="75" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="10">COMPROMISED HOST</text>
                    <text x="100" y="90" fill="#94a3b8" textAnchor="middle" fontSize="8">192.168.1.50</text>
                    <rect x="35" y="110" width="130" height="35" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="100" y="128" fill="#fee2e2" textAnchor="middle" fontSize="7.5">wevtutil cl Security</text>
                    <text x="100" y="139" fill="#fca5a5" textAnchor="middle" fontSize="7">(Local Logs Wiped!)</text>
                  </g>

                  {/* Real-Time Stream Arrow */}
                  <path d="M 180 140 L 310 140" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrowGreen16)" />
                  <text x="245" y="130" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">TLS Real-Time Stream</text>

                  {/* Right: Centralized WORM SIEM */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="315" y="50" width="165" height="180" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="397" y="75" fill="#a7f3d0" fontWeight="bold" textAnchor="middle" fontSize="10">IMMUTABLE WORM SIEM</text>
                    <text x="397" y="90" fill="#94a3b8" textAnchor="middle" fontSize="8">10.0.0.99 (Write-Once)</text>
                    <rect x="330" y="110" width="135" height="45" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="397" y="128" fill="#d1fae5" textAnchor="middle" fontSize="8">100% Logs Preserved!</text>
                    <text x="397" y="145" fill="#a7f3d0" textAnchor="middle" fontSize="7">Event 1102 Alert Dispatched</text>
                  </g>

                  {/* Bottom Summary */}
                  <text x="250" y="270" fill="#94a3b8" textAnchor="middle" fontSize="8.5">
                    CERT-In Directions 2022: Mandates 180-Day secure domestic log retention across all ICT systems.
                  </text>

                  <defs>
                    <marker id="arrowGreen16" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: Real-time TLS Syslog streaming preserves event records on immutable WORM SIEM servers.
              </p>
            </div>

            {/* Diagram 2: NTFS MFT Timestomp Detection */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>🔬</span> Diagram B: NTFS $MFT Timestomp Detection
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* File Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="25" width="440" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10.5">FILE: C:\Windows\System32\malware.exe</text>
                    <text x="250" y="62" fill="#a5b4fc" textAnchor="middle" fontSize="8">NTFS Master File Table ($MFT) Record #104822</text>
                  </g>

                  {/* Left Attribute: $STANDARD_INFORMATION */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="95" width="210" height="100" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="135" y="118" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="9">$STANDARD_INFORMATION</text>
                    <text x="135" y="132" fill="#fde68a" textAnchor="middle" fontSize="7.5">(User-Mode Modifiable)</text>
                    <rect x="45" y="145" width="180" height="35" rx="4" fill="#18181b" />
                    <text x="135" y="162" fill="#fbbf24" font-family="monospace" textAnchor="middle" fontSize="8">2018-04-12 10:20:00</text>
                    <text x="135" y="174" fill="#fca5a5" textAnchor="middle" fontSize="7">FORGED BY TIMESTOMP!</text>
                  </g>

                  {/* Right Attribute: $FILE_NAME */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="95" width="210" height="100" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="365" y="118" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">$FILE_NAME</text>
                    <text x="365" y="132" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">(Kernel Driver Enforced)</text>
                    <rect x="275" y="145" width="180" height="35" rx="4" fill="#18181b" />
                    <text x="365" y="162" fill="#38bdf8" font-family="monospace" textAnchor="middle" fontSize="8">2026-08-23 02:14:35</text>
                    <text x="365" y="174" fill="#34d399" textAnchor="middle" fontSize="7">TRUE KERNEL TIMESTAMP!</text>
                  </g>

                  {/* Forensic Alert Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="215" width="440" height="70" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="240" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="10">FORENSIC VERDICT: 8-YEAR ANOMALY DETECTED</text>
                    <text x="250" y="258" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Discrepancy between attributes proves intentional timestomping; true date is 2026!</text>
                    <text x="250" y="272" fill="#94a3b8" textAnchor="middle" fontSize="7.5">IT Act 2000 Section 65: Tampering with computer records carries up to 3 years imprisonment.</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: Comparing NTFS $STANDARD_INFORMATION with $FILE_NAME uncovers forged timestomps.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Forensic Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads deploy immutable WORM SIEM clusters, triage NTFS timestomping, enforce optical SCADA archival, and author USN Journal labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                &gt;
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
                  <span>⚡</span> Anti-Forensics Dilemma ({currentLocalScenario.focus})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Forensic Action &amp; Remediation
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
              Guidelines for ethical penetration testers and digital forensic investigators in Phase 5.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Forensic &amp; Cleanup Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Preserve Client Logs 100%:</strong> Never run log clearing scripts during authorized security audits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Inspect NTFS USN Journals:</strong> The USN Journal records file creations even after secure shredding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Correlate Prefetch &amp; Amcache:</strong> Parse `.pf` files to establish exact executable run timestamps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Document Cleanup Deliverable:</strong> Provide clients with a signed artifact removal sign-off sheet.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Phase 5 Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Wiping Logs to Hide Errors:</strong> Violates IT Act Section 65 and terminates pentest contracts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Leaving Ghost Webshells:</strong> Forgetting uploaded test files creates permanent client breach risks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring NTP Synchronization:</strong> Clock skews make forensic timeline correlation impossible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Missing Section 65B Certificates:</strong> Uncertified electronic logs get thrown out of court.</span>
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
                  <span><strong>Deploy Central WORM SIEM:</strong> Stream event logs over TLS so local deletion attempts fail.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Alert on Event ID 1102:</strong> Treat 'Audit Log Cleared' events as immediate Critical incidents.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Retain 180 Days of Logs:</strong> Comply with CERT-In 2022 domestic log archival mandates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Append-Only History:</strong> Lock shell history files with `chattr +a .bash_history`.</span>
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
              Synthesize key anti-forensics and log tampering concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Forensic Analysts
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why centralized WORM logging is the silver bullet against anti-forensics: because logs are streamed in real time over TLS to a separate write-once SIEM server, even an attacker with root or SYSTEM privileges cannot alter or erase historical records.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The fundamental duality in NTFS metadata: while an attacker can easily forge the `$STANDARD_INFORMATION` attribute using tools like timestomp, the kernel-controlled `$FILE_NAME` attribute preserves the true timestamp, exposing the tampering.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future professional security assessments, always maintain a rigorous 4-step cleanup checklist: terminate all C2 sessions, delete dropped test webshells, revert system configs, and document the cleanup verification in your final client report.
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
                <span>Black Hats delete logs to hide; Ethical Hackers NEVER delete client logs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Timestomping alters $STANDARD_INFO; $FILE_NAME retains true kernel date.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Windows Event ID 1102 records 'The audit log was cleared' (Critical Alert).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Centralized WORM logging streams logs off-site so local deletion fails.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In Directions 2022 mandate rolling 180-day secure log retention.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 65 punishes log tampering with up to 3 years imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Phase 5: Covering Tracks (Log Tampering &amp; Anti-Forensics) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Phase 5: Covering Tracks (Log Tampering &amp; Anti-Forensics) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Phase 5 is where professional ethics and forensic science intersect. An ethical hacker proves their professionalism not by erasing evidence, but by cleaning up their test tools and ensuring client audit logs remain pristine. Always remember Edmond Locard's principle: every digital action leaves a trace in the Master File Table, USN Journal, or centralized SIEM. True mastery lies in understanding these traces to defend the enterprise."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
