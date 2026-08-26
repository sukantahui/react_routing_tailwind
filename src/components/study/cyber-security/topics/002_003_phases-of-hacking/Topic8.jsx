import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Privilege Escalation Vector State
  const [selectedVectorKey, setSelectedVectorKey] = useState("windows_token");

  // Studio 2: Lateral Movement Pivot State
  const [activeHopIndex, setActiveHopIndex] = useState(0);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_bloodhound");

  // Privilege Escalation Vectors Data for Studio 1
  const privEscVectors = {
    windows_token: {
      key: "windows_token",
      name: "Token Impersonation (SeImpersonatePrivilege)",
      os: "Windows Server (IIS / SQL Service Accounts)",
      direction: "VERTICAL ESCALATION (Service Account -> SYSTEM)",
      flaw: "Service accounts holding SeImpersonatePrivilege can impersonate connecting SYSTEM named pipes.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      icon: "🥔",
      sampleSyntax: "whoami /priv\nPrintSpoofer.exe -i -c cmd.exe\n# Output: Spawns NT AUTHORITY\\SYSTEM prompt!",
      remediation: "Remove SeImpersonatePrivilege from non-administrative service accounts; migrate to Virtual Accounts."
    },
    unquoted_path: {
      key: "unquoted_path",
      name: "Unquoted Service Paths",
      os: "Windows (x86 / x64)",
      direction: "VERTICAL ESCALATION (Standard User -> SYSTEM)",
      flaw: "Service ImagePath contains spaces without quotes; Windows looks for partial executables (e.g. C:\\Program.exe).",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      icon: "📁",
      sampleSyntax: "wmic service get name,displayname,pathname,startmode | findstr /i 'auto' | findstr /i /v '\"' | findstr /i /v 'C:\\Windows\\'\n# Drop malicious binary at C:\\Program Files\\Vuln.exe",
      remediation: "Wrap all service binary paths in quotation marks inside registry ImagePath values."
    },
    linux_suid: {
      key: "linux_suid",
      name: "Linux SUID Binaries (GTFOBins)",
      os: "Linux / UNIX",
      direction: "VERTICAL ESCALATION (Low-Priv User -> Root UID 0)",
      flaw: "SUID bit is set on standard utilities with shell-escape functions (e.g. /usr/bin/find).",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "🐧",
      sampleSyntax: "find / -perm -4000 2>/dev/null\n/usr/bin/find . -exec /bin/sh -p \\; -quit\n# id -> uid=1000 euid=0(root) ROOT SHELL!",
      remediation: "Audit SUID permissions with `chmod u-s /usr/bin/find` and enforce least privilege."
    },
    sudo_nopasswd: {
      key: "sudo_nopasswd",
      name: "Sudo NOPASSWD Shell Escapes",
      os: "Linux (/etc/sudoers)",
      direction: "VERTICAL ESCALATION (Standard User -> Root)",
      flaw: "Sudoers file allows running specific binaries as root without requiring a password.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "🔑",
      sampleSyntax: "sudo -l\n# Output: (ALL) NOPASSWD: /usr/bin/vim\nsudo vim -c ':!/bin/bash'",
      remediation: "Restrict sudo commands to dedicated scripts with restricted shell arguments; eliminate NOPASSWD."
    },
    kernel_dirtypipe: {
      key: "kernel_dirtypipe",
      name: "Dirty Pipe Kernel Exploit (CVE-2022-0847)",
      os: "Linux Kernel 5.8 to 5.16.11",
      direction: "VERTICAL ESCALATION (Any Local User -> Root)",
      flaw: "Kernel pipe buffer flag flaw allows unprivileged users to overwrite read-only page cache memory (/etc/passwd).",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "💥",
      sampleSyntax: "./dirtypipe /etc/passwd 1 'root:0:0:' 'root:$6$hacked...:0:0:'\nsu root # Instant root login!",
      remediation: "Update Linux kernel to patched release (5.16.11+, 5.15.25+, 5.10.102+)."
    }
  };

  const activeVector = privEscVectors[selectedVectorKey];

  // Lateral Movement Pivot Chain Data for Studio 2
  const pivotHops = [
    {
      hop: 0,
      title: "Hop 0: Initial Foothold (Marketing Laptop)",
      ipAddress: "192.168.1.50",
      compromisedEntity: "Standard User: Mamata Sen (No Local Admin)",
      actionTaken: "Executed phishing reverse shell in Phase 3.",
      nextStep: "Run WinPEAS to discover unquoted path and dump LSASS RAM using Mimikatz.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    {
      hop: 1,
      title: "Hop 1: Pivot to Internal Database Server",
      ipAddress: "192.168.2.10 (SQL Server)",
      compromisedEntity: "Local Admin NTLM Hash Dumped from Workstation",
      actionTaken: "Executed Pass-the-Hash via wmiexec.py over Port 445.",
      nextStep: "Extracted SQL Service Account Kerberos TGS Ticket using GetUserSPNs.py (Kerberoasting).",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      hop: 2,
      title: "Hop 2: Pivot to Core Banking File Server",
      ipAddress: "192.168.2.20 (File Server)",
      compromisedEntity: "Overpass-the-Hash Kerberos TGT Imported (Rubeus)",
      actionTaken: "BloodHound graph query revealed Helpdesk User has GenericAll rights over Domain Admin.",
      nextStep: "Abused Active Directory ACL to reset Domain Admin password or grant DCSync rights.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      hop: 3,
      title: "Hop 3: Full Domain Controller Takeover",
      ipAddress: "10.0.0.1 (Kolkata Primary Domain Controller)",
      compromisedEntity: "Domain Admins Group Compromised (DCSync Attack)",
      actionTaken: "Executed secretsdump.py to extract all 5,000 corporate Active Directory password hashes!",
      nextStep: "Complete Enterprise Network Compromised (Crown-Jewel Breach).",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    }
  ];

  const currentHop = pivotHops[activeHopIndex];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_bloodhound",
      lead: "Mamata",
      role: "Lead Threat Hunter",
      location: "Kolkata FinTech Operations Center",
      title: "Active Directory BloodHound Attack Path Audit",
      budget: "₹9,50,000",
      technique: "BloodHound Graph Analysis & ACL Hardening",
      dilemma:
        "Auditing internal Active Directory permissions to eliminate hidden multi-hop privilege escalation paths leading to Domain Admins.",
      resolution:
        "Mamata ran SharpHound, mapped a 3-hop attack path in BloodHound where a helpdesk user had GenericAll rights over a database server, and revoked the excessive Active Directory ACLs.",
      metrics: {
        attackPathsSevered: "14 Shortest Paths to Domain Admin",
        excessiveAclsRevoked: "42 Misconfigured Permissions",
        tierZeroIsolation: "100% Tier 0 Architecture Enforced",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_suid",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "Linux SUID Binary & GTFOBins Hardening",
      budget: "₹5,20,000",
      technique: "LinPEAS SUID Auditing & Sudo Remediation",
      dilemma:
        "A clinical telemetry Linux server had an accidental SUID bit set on `/usr/bin/find`, allowing any local user to escape to root.",
      resolution:
        "Mahima ran LinPEAS, identified the GTFOBins vulnerability, removed the SUID bit (`chmod u-s /usr/bin/find`), and authored automated Ansible compliance playbooks to audit permissions continuously.",
      metrics: {
        suidBinariesHardened: "1 Dangerous SUID Binary Stripped",
        sudoersSanitized: "100% NOPASSWD Shell Escapes Removed",
        ansibleAuditCompliance: "Continuous Daily Compliance Check",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_laps",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA Lateral Pivot Blocking with Microsoft LAPS",
      budget: "₹8,80,000",
      technique: "LAPS Deployment & Host Firewall Micro-segmentation",
      dilemma:
        "Preventing threat actors who compromise a substation engineering laptop from using Pass-the-Hash to pivot laterally into SCADA RTU switchgears.",
      resolution:
        "Debangshu deployed Microsoft LAPS across all substation machines, randomizing local admin passwords, and configured host firewall rules blocking peer-to-peer SMB (port 445) traffic.",
      metrics: {
        localAdminPasswordsRandomized: "48 Substation Workstations",
        lateralSmbBlocked: "100% Workstation-to-Workstation Drop",
        passTheHashNeutralized: "100% Lateral Pivot Resistance",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_potato",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "PrintSpoofer Token Impersonation Laboratory",
      budget: "₹4,00,000",
      technique: "SeImpersonatePrivilege & Named Pipe Impersonation",
      dilemma:
        "Teaching university cybersecurity students how Windows named pipe impersonation works under low-privilege service accounts.",
      resolution:
        "The team built a Windows Server lab demonstrating `PrintSpoofer.exe` exploiting `SeImpersonatePrivilege`, guiding 140+ students through token duplication mechanics and Windows service hardening.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        toolsMastered: "PrintSpoofer, GodPotato, WinPEAS",
        hardeningGuideAuthored: "Windows Virtual Account Migration",
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
            Cyber Security Module 002_003 • Topic 8 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privilege Escalation and Lateral Movement
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct post-exploitation privilege elevation and network pivoting: master Windows token impersonation 
            (PrintSpoofer), Linux SUID binary GTFOBins escapes, Pass-the-Hash tradecraft, and BloodHound Active Directory attack path mapping.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Privilege Escalation Vector Simulator & GTFOBins / Potato Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🚀</span> Studio 1: Privilege Escalation Vector Simulator &amp; Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an escalation vector to inspect its target operating system, root cause vulnerability, sample CLI exploit syntax, and defensive remediation patch.
            </p>
          </div>

          {/* Vector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(privEscVectors).map((vec) => {
              const isSelected = selectedVectorKey === vec.key;
              return (
                <button
                  key={vec.key}
                  onClick={() => setSelectedVectorKey(vec.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{vec.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{vec.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{vec.os.split(" ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Vector Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeVector.badgeClass)}>
                  {activeVector.direction}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeVector.name} ({activeVector.os})
                </h3>
              </div>
            </div>

            {/* Flaw Description */}
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-indigo-400 font-bold uppercase tracking-wider block">Root Cause Security Misconfiguration:</span>
              <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">{activeVector.flaw}</p>
            </div>

            {/* Sample CLI Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Sample Execution / Exploit Syntax:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {activeVector.sampleSyntax}
              </pre>
            </div>

            {/* Remediation Patch */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Defensive Hardening &amp; Remediation:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeVector.remediation}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Lateral Movement Pivoting & BloodHound Attack Path Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🗺️</span> Studio 2: Lateral Movement Pivoting &amp; Attack Path Lab
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Step through a realistic multi-hop Active Directory lateral movement chain: from initial workstation compromise to Database pivoting, Kerberoasting, and Domain Controller takeover.
            </p>
          </div>

          {/* Pivot Hop Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {pivotHops.map((hop, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHopIndex(idx)}
                className={clsx(
                  "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                  activeHopIndex === idx
                    ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                    : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                )}
              >
                <div className="font-bold text-xs">{hop.title.split(": ")[0]}</div>
                <div className="text-[10px] text-gray-400 truncate mt-0.5">{hop.title.split(": ")[1]}</div>
              </button>
            ))}
          </div>

          {/* Active Pivot Hop Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentHop.badgeClass)}>
                  {currentHop.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Target Host: {currentHop.ipAddress}
                </h3>
              </div>
            </div>

            {/* Compromised Entity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Compromised Security Context</span>
                <p className="text-gray-200 font-semibold">{currentHop.compromisedEntity}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Lateral Movement Tradecraft Used</span>
                <p className="text-gray-300">{currentHop.actionTaken}</p>
              </div>
            </div>

            {/* Next Step in Attack Path */}
            <div className="p-4 bg-gray-900 rounded-xl border border-amber-900/30 space-y-1 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Next Lateral Pivot in BloodHound Graph:</span>
              <p className="text-gray-200 font-mono text-[11.5px] leading-relaxed">{currentHop.nextStep}</p>
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
              Visualizing Vertical vs Horizontal Privilege Escalation and Multi-Hop Lateral Movement Attack Paths.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Vertical vs Horizontal Privilege Escalation */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Vertical vs Horizontal Privilege Escalation
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Top Level: Root / SYSTEM */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="160" y="25" width="180" height="50" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="250" y="47" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="10.5">ROOT / SYSTEM (UID 0)</text>
                    <text x="250" y="60" fill="#fca5a5" textAnchor="middle" fontSize="8">Highest Administrative Rights</text>
                  </g>

                  {/* Vertical Escalation Arrow */}
                  <path d="M 250 160 L 250 85" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrowRed15)" />
                  <text x="310" y="125" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="8.5">VERTICAL ESCALATION</text>
                  <text x="310" y="138" fill="#94a3b8" textAnchor="middle" fontSize="7.5">(SUID / PrintSpoofer)</text>

                  {/* Middle Level: Standard Users */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="40" y="170" width="160" height="55" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="120" y="195" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">USER: Mamata (ID 104)</text>
                    <text x="120" y="208" fill="#a5b4fc" textAnchor="middle" fontSize="8">Standard Workstation User</text>
                  </g>

                  {/* Horizontal Escalation Arrow */}
                  <path d="M 200 197 L 290 197" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowAmber15)" />
                  <text x="250" y="190" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8">HORIZONTAL</text>
                  <text x="250" y="215" fill="#94a3b8" textAnchor="middle" fontSize="7.5">(IDOR / Session Steal)</text>

                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="300" y="170" width="160" height="55" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="380" y="195" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">USER: Debangshu (ID 105)</text>
                    <text x="380" y="208" fill="#a5b4fc" textAnchor="middle" fontSize="8">Peer Standard User</text>
                  </g>

                  {/* Summary Box */}
                  <text x="250" y="280" fill="#94a3b8" textAnchor="middle" fontSize="8.5">
                    Vertical elevates permission level; Horizontal accesses peer accounts at the same level.
                  </text>

                  <defs>
                    <marker id="arrowRed15" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowAmber15" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: Vertical escalation elevates to Root/SYSTEM; Horizontal escalation accesses peer user data.
              </p>
            </div>

            {/* Diagram 2: BloodHound Lateral Movement Path */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span>🗺️</span> Diagram B: BloodHound Multi-Hop Lateral Pivot Path
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Node 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="30" width="95" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="67" y="52" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">LAPTOP</text>
                    <text x="67" y="65" fill="#94a3b8" textAnchor="middle" fontSize="7">192.168.1.50</text>
                  </g>

                  <path d="M 115 55 L 140 55" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrowCyan15)" />

                  {/* Node 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="145" y="30" width="95" height="50" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="192" y="52" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">DB SERVER</text>
                    <text x="192" y="65" fill="#a5f3fc" textAnchor="middle" fontSize="7">Pass-the-Hash</text>
                  </g>

                  <path d="M 240 55 L 265 55" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan15)" />

                  {/* Node 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="270" y="30" width="95" height="50" rx="6" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="317" y="52" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="8.5">FILE SERVER</text>
                    <text x="317" y="65" fill="#e9d5ff" textAnchor="middle" fontSize="7">Kerberoasting</text>
                  </g>

                  <path d="M 365 55 L 390 55" stroke="#d8b4fe" strokeWidth="1.5" markerEnd="url(#arrowCyan15)" />

                  {/* Node 4: DC */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="395" y="30" width="85" height="50" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="437" y="52" fill="#fee2e2" fontWeight="bold" textAnchor="middle" fontSize="8.5">DOMAIN DC</text>
                    <text x="437" y="65" fill="#fca5a5" textAnchor="middle" fontSize="7">10.0.0.1 (DCSync)</text>
                  </g>

                  {/* Operational Summary */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="115" width="460" height="165" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="250" y="140" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="11">ENTERPRISE LATERAL CONTAINMENT DEFENSE</text>
                    <text x="35" y="165" fill="#cbd5e1" font-family="monospace" fontSize="8.5">• Deploy Microsoft LAPS: Randomizes local admin passwords per computer</text>
                    <text x="35" y="183" fill="#cbd5e1" font-family="monospace" fontSize="8.5">• Enforce Tiered Administration: Tier 0 Admins NEVER log into Tier 2 laptops</text>
                    <text x="35" y="201" fill="#cbd5e1" font-family="monospace" fontSize="8.5">• Workstation Micro-segmentation: Block lateral peer-to-peer Port 445 SMB</text>
                    <text x="250" y="235" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="9">IT Act 2000 Section 70: Hacking protected systems carries up to 10 years prison.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan15" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: BloodHound Active Directory multi-hop attack path from workstation to Domain Controller.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Privilege Escalation Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads execute BloodHound attack path audits, SUID binary hardening, LAPS SCADA pivot blocking, and PrintSpoofer token labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Technical Dilemma ({currentLocalScenario.technique})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Security Action &amp; Remediation
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
              Guidelines for ethical penetration testers and Active Directory security architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Escalation Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Audit Misconfigurations First:</strong> Run LinPEAS / WinPEAS before attempting risky kernel exploits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Map Active Directory with BloodHound:</strong> Discover multi-hop delegation attack paths in minutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deploy Microsoft LAPS:</strong> Randomizing local admin passwords eliminates 90%+ of lateral movement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Strip SeImpersonatePrivilege:</strong> Remove dangerous token rights from non-system service accounts.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Escalation Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Firing Unstable Kernel Exploits:</strong> Triggers instant BSOD / Kernel Panic on production servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Reusing Local Admin Passwords:</strong> Allows attackers to Pass-the-Hash across the entire enterprise.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Domain Admins on Workstations:</strong> Leaves high-privilege credentials in workstation LSASS memory.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Pivoting to Protected Systems:</strong> Violates IT Act Section 70 (Carries 10 years imprisonment).</span>
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
                  <span><strong>Enforce Tiered Administration:</strong> Isolate Tier 0 Domain Admins completely from Tier 2 endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Host Micro-segmentation:</strong> Block workstation-to-workstation Port 445 SMB communication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit SUID Binaries via Ansible:</strong> Strip SUID bits from standard system command utilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Quote All Service Paths:</strong> Wrap all executable paths in quotes in registry ImagePath entries.</span>
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
              Synthesize key privilege escalation and lateral movement concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Defensive Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Microsoft LAPS is one of the most effective security controls ever created: by ensuring every workstation has a unique, randomized local administrator password, an attacker who compromises one laptop cannot Pass-the-Hash to any other computer in the building.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How BloodHound models Active Directory: by treating users, groups, and computers as nodes in a graph database, complex multi-hop delegation chains that human administrators overlook become immediately obvious to security auditors.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise hardening projects, always enforce the Tiered Administration Model: ensure Domain Admins (Tier 0) never log into standard user workstations (Tier 2), protecting administrative credentials from memory harvesting.
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
                <span>Vertical escalation moves up to Root/SYSTEM; Horizontal accesses peers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SeImpersonatePrivilege enables Potato exploits (PrintSpoofer) to capture SYSTEM.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Linux SUID binaries (find, vim) allow root shell escapes via GTFOBins.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BloodHound maps Active Directory attack paths to Domain Admins via Neo4j.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Pass-the-Hash moves laterally over SMB using extracted NTLM hashes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 70 punishes accessing protected systems with 10 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Privilege Escalation and Lateral Movement FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Privilege Escalation and Lateral Movement (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Perimeter security is only the outer gate. True cybersecurity resilience is proven internally: when an initial compromised workstation cannot elevate privileges due to SUID hardening and cannot pivot laterally due to Microsoft LAPS and micro-segmentation, you have won the architectural battle. Always design networks with internal friction and zero trust."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
