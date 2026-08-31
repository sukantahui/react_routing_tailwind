import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Studio 1: Persistence Vector State
  const [selectedVectorKey, setSelectedVectorKey] = useState("registry_run");

  // Studio 2: C2 Beaconing Jitter State
  const [sleepSeconds, setSleepSeconds] = useState(60);
  const [jitterPercent, setJitterPercent] = useState(30);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_wmi");

  // Persistence Vectors Data for Studio 1
  const persistenceVectors = {
    registry_run: {
      key: "registry_run",
      name: "Windows Registry Run Keys",
      os: "Windows (x86 / x64)",
      mechanism: "Executes payload on user login via Registry Startup keys.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800",
      icon: "🗄️",
      sampleSyntax: "reg add 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' /v 'SecurityUpdate' /t REG_SZ /d 'C:\\Users\\Public\\beacon.exe' /f",
      sysmonId: "Sysmon Event ID 13 (RegistryValueSet) • Mitre T1547.001",
      detectionAndRemoval: "Query registry via PowerShell `Get-ItemProperty 'HKCU:...\\Run'` and remove unauthorized value with `Remove-ItemProperty`."
    },
    scheduled_tasks: {
      key: "scheduled_tasks",
      name: "Scheduled Tasks & Services",
      os: "Windows / Linux",
      mechanism: "Executes payload on system boot, user logon, or recurring timer with elevated SYSTEM / Root privileges.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800",
      icon: "⏰",
      sampleSyntax: "schtasks /create /tn 'SystemTelemetrySync' /tr 'C:\\Windows\\Temp\\beacon.exe' /sc onstart /ru SYSTEM",
      sysmonId: "Sysmon Event ID 1 (Process Creation: schtasks.exe) • Mitre T1053.005",
      detectionAndRemoval: "Inspect active tasks via `Get-ScheduledTask` and remove malicious task via `Unregister-ScheduledTask -TaskName 'SystemTelemetrySync'`."
    },
    wmi_subscriptions: {
      key: "wmi_subscriptions",
      name: "Fileless WMI Event Subscriptions",
      os: "Windows Active Directory",
      mechanism: "Triggers command execution inside WMI repository (OBJECTS.DATA) upon system events without files on disk.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800",
      icon: "🕸️",
      sampleSyntax: "$F = Set-WmiInstance __EventFilter -Args @{Name='BootF'; Query='SELECT * FROM __InstanceModificationEvent...'}\n$C = Set-WmiInstance CommandLineEventConsumer -Args @{Name='BootC'; CommandLineTemplate='powershell -File C:\\\\Scripts\\\\maintenance.ps1'}",
      sysmonId: "Sysmon Event ID 19, 20, 21 (WmiEvent) • Mitre T1546.003",
      detectionAndRemoval: "Query WMI subscriptions via `Get-CimInstance -Namespace root\\subscription __EventFilter` and purge malicious bindings."
    },
    systemd_cron: {
      key: "systemd_cron",
      name: "Linux Systemd Daemons & Cron Jobs",
      os: "Linux / UNIX",
      mechanism: "Background system daemon with Restart=always or scheduled crontab reverse shell execution.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800",
      icon: "🐧",
      sampleSyntax: "echo '*/15 * * * * root /usr/bin/python3 -c \"import socket...\"' >> /etc/crontab\nsystemctl enable --now telemetry-helper.service",
      sysmonId: "Auditd SYSCALL crontab_write • Mitre T1053.003 / T1543.002",
      detectionAndRemoval: "Audit `/etc/crontab`, `/etc/systemd/system/`, and check user crontabs via `crontab -l -u root`."
    },
    rootkits_bootkits: {
      key: "rootkits_bootkits",
      name: "Kernel-Mode Rootkits & UEFI Bootkits",
      os: "Firmware / Ring 0 Kernel",
      mechanism: "Direct Kernel Object Manipulation (DKOM) to hide processes; UEFI bootkits persist across OS reinstalls in SPI flash.",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800",
      icon: "👑",
      sampleSyntax: "insmod /tmp/rootkit.ko (Linux LKM)\nUEFI SPI Flash Write: bcdedit /set {default} path \\EFI\\Boot\\bootkit.efi",
      sysmonId: "Driver Load Event ID 6 • Memory Inspection Alerts • Mitre T1542.001 / T1014",
      detectionAndRemoval: "Enforce UEFI Secure Boot, Driver Signature Enforcement (DSE), Hypervisor-Protected Code Integrity (HVCI)."
    }
  };

  const activeVector = persistenceVectors[selectedVectorKey];

  // Calculate 5 Jittered Heartbeat intervals for Studio 2
  const simulatedHeartbeats = useMemo(() => {
    const minSleep = sleepSeconds * (1 - jitterPercent / 100);
    const maxSleep = sleepSeconds * (1 + jitterPercent / 100);
    const randomSamples = [0.42, 0.88, 0.15, 0.95, 0.53];
    return randomSamples.map((r, idx) => {
      const val = minSleep + r * (maxSleep - minSleep);
      return {
        beaconNum: idx + 1,
        interval: val.toFixed(1),
        status: "HTTPS Beacon Sent (Port 443)",
        anomalyScore: jitterPercent > 20 ? "Low (Evades Periodic Detectors)" : "High (Easily Flagged by SIEM)"
      };
    });
  }, [sleepSeconds, jitterPercent]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_wmi",
      lead: "Mamata",
      role: "Lead Threat Hunter",
      location: "Kolkata FinTech Operations Center",
      title: "WMI Event Subscription Persistence Triage",
      budget: "₹9,50,000",
      persistenceType: "Fileless WMI Event Persistence",
      dilemma:
        "Identifying stealthy, fileless persistence planted on core banking Windows terminal servers that bypassed traditional antivirus scanners.",
      resolution:
        "Mamata queried Sysmon Event IDs 19/20/21 and ran PowerShell `Get-CimInstance __EventFilter`, uncovering a malicious WMI persistence trigger, removing the consumer binding, and deploying Sigma alert rules.",
      metrics: {
        wmiBindingsPurged: "1 Malicious FilterConsumer Binding",
        detectionMethod: "Sysmon Event ID 19/20/21",
        diskArtifacts: "0 Files on Disk (Pure WMI)",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "ichapur_ssh",
      lead: "Mahima",
      role: "Chief Healthcare Security Officer",
      location: "Ichapur General Hospital",
      title: "SSH Authorized Keys Persistence Audit",
      budget: "₹5,20,000",
      persistenceType: "Linux SSH Authorized Key Ingress",
      dilemma:
        "A compromised contractor laptop planted a backdoor SSH key on the hospital PACS medical imaging archive to retain unmonitored night access.",
      resolution:
        "Mahima deployed File Integrity Monitoring (FIM) via auditd to monitor `/root/.ssh/authorized_keys`, revoked the unauthorized public key, and enforced certificate-based SSH access with Duo MFA.",
      metrics: {
        unauthorizedKeysRevoked: "1 Rogue Ed25519 Key",
        fimAuditCoverage: "100% Linux PACS Servers",
        mfaEnforcement: "Duo Security Push MFA",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_uefi",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA UEFI Secure Boot Hardening",
      budget: "₹8,80,000",
      persistenceType: "Kernel-Mode Rootkit & Bootkit Defense",
      dilemma:
        "Protecting 220kV substation protective relay servers against advanced nation-state kernel-mode rootkits and UEFI bootkits.",
      resolution:
        "Debangshu enforced hardware UEFI Secure Boot, enabled Microsoft HVCI (Hypervisor-Protected Code Integrity), and locked driver signature enforcement, blocking Ring 0 kernel module loading permanently.",
      metrics: {
        kernelDriverEnforcement: "100% Cryptographic WHQL Signatures",
        bootkitResistance: "Hardware TPM 2.0 + Secure Boot",
        scadaIsolation: "Ring 0 Kernel Protection Active",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_jitter",
      lead: "Abhronila & Susmita",
      role: "University Cyber Research Leads",
      location: "Jadavpur University AI Labs",
      title: "C2 Beaconing & Jitter Telemetry Lab",
      budget: "₹4,00,000",
      persistenceType: "C2 HTTPS Beaconing with Randomized Jitter",
      dilemma:
        "Teaching students how to analyze C2 network jitter and distinguish malicious heartbeat intervals from normal human web browsing traffic.",
      resolution:
        "The team built a network telemetry lab simulating Cobalt Strike HTTPS beacons with 40% jitter, guiding 140+ students through statistical variance analysis in Wireshark and Zeek IDS.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        c2ProfilesSimulated: "Cobalt Strike, Sliver, Havoc",
        telemetryAnalyzed: "Zeek Connection Variance Logs",
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
            Cyber Security Module 002_003 • Topic 7 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Phase 4: Maintaining Access (Backdoors, Rootkits, and Persistence)
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct Phase 4 of ethical hacking: master the technical mechanisms of Windows Registry run keys, 
            fileless WMI event subscriptions, Linux systemd services, C2 HTTPS beaconing with randomized jitter, and kernel rootkit architecture.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Multi-Platform Persistence Arsenal & Mechanism Matrix */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚓</span> Studio 1: Multi-Platform Persistence Arsenal &amp; Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a persistence vector to inspect its operating system target, core execution mechanism, CLI command syntax, Sysmon event ID, and Blue Team removal procedures.
            </p>
          </div>

          {/* Vector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {Object.values(persistenceVectors).map((vec) => {
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
                  <div className="font-bold text-gray-200 mt-1 truncate">{vec.name.split(" ")[0]}</div>
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
                  {activeVector.os} • {activeVector.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Execution Mechanism &amp; Detection Signature
                </h3>
              </div>
            </div>

            {/* Mechanism & Sysmon ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Persistence Mechanism</span>
                <p className="text-gray-200">{activeVector.mechanism}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Sysmon / Auditd Detection ID</span>
                <p className="text-gray-200 font-mono text-[11px]">{activeVector.sysmonId}</p>
              </div>
            </div>

            {/* Sample CLI Syntax */}
            <div className="space-y-1.5 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Sample Command / Script Syntax:</span>
              <pre className="p-3 bg-gray-900 rounded-xl border border-gray-800 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                {activeVector.sampleSyntax}
              </pre>
            </div>

            {/* Detection & Removal */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-emerald-900/30 text-xs space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">Blue Team Remediation &amp; Removal:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeVector.detectionAndRemoval}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Command & Control (C2) Beaconing & Jitter Simulation Lab */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📡</span> Studio 2: C2 Beaconing &amp; Jitter Simulation Lab
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Configure sleep duration and randomized jitter percentage to simulate how modern Command &amp; Control agents (Cobalt Strike, Sliver) disguise heartbeats from network firewalls.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Control Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-5 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Malleable C2 Profile Parameters
              </h3>

              {/* Sleep Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-semibold text-gray-300">
                  <span>Base Sleep Duration:</span>
                  <span className="font-mono text-emerald-400 font-bold">{sleepSeconds} Seconds</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={sleepSeconds}
                  onChange={(e) => setSleepSeconds(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              {/* Jitter Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-semibold text-gray-300">
                  <span>Randomized Jitter %:</span>
                  <span className="font-mono text-purple-400 font-bold">{jitterPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={jitterPercent}
                  onChange={(e) => setJitterPercent(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-[11px] text-gray-400 leading-relaxed">
                Jitter adds random variance to beacon intervals. A {sleepSeconds}s sleep with {jitterPercent}% jitter means heartbeats fire randomly between <strong className="text-indigo-300">{(sleepSeconds * (1 - jitterPercent / 100)).toFixed(1)}s</strong> and <strong className="text-indigo-300">{(sleepSeconds * (1 + jitterPercent / 100)).toFixed(1)}s</strong>.
              </div>
            </div>

            {/* Real-Time Beacon Timeline (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Simulated C2 Beacon Heartbeat Timeline</h3>
                  <span className="text-xs text-gray-400">Outbound HTTPS Port 443 Telemetry</span>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono font-bold">
                  ACTIVE AGENT
                </span>
              </div>

              <div className="space-y-2">
                {simulatedHeartbeats.map((hb) => (
                  <div key={hb.beaconNum} className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-gray-200 font-bold">Beacon #{hb.beaconNum}</span>
                      <span className="text-gray-400 text-[11px]">({hb.interval}s interval)</span>
                    </div>
                    <span className={clsx("text-[10px] px-2 py-0.5 rounded border", hb.anomalyScore.includes("Low") ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-rose-950 text-rose-300 border-rose-800")}>
                      {hb.anomalyScore}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed">
                When Jitter is set to 0%, the agent emits packets at exact mathematical intervals, triggering SIEM periodicity algorithms. Adding 30%+ jitter breaks static periodicity while maintaining C2 contact.
              </p>
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
              Visualizing Windows &amp; Linux Persistence Injection Points and Ring 3 User-Mode vs Ring 0 Kernel-Mode Rootkit Architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Persistence Injection Points */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: Multi-Platform Persistence Hooks
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Central OS Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="180" y="110" width="140" height="90" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="250" y="145" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">OPERATING</text>
                    <text x="250" y="160" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">SYSTEM</text>
                    <text x="250" y="178" fill="#a5b4fc" textAnchor="middle" fontSize="8">Windows / Linux</text>
                  </g>

                  {/* Top-Left: Registry Run */}
                  <line x1="210" y1="110" x2="110" y2="55" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="25" width="140" height="42" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
                    <text x="100" y="47" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">Registry Run Keys</text>
                    <text x="100" y="58" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">HKCU\...\Run</text>
                  </g>

                  {/* Top-Right: Scheduled Tasks */}
                  <line x1="290" y1="110" x2="390" y2="55" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="330" y="25" width="140" height="42" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <text x="400" y="47" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="9">Scheduled Tasks</text>
                    <text x="400" y="58" fill="#fde68a" textAnchor="middle" fontSize="7.5">schtasks / crontab</text>
                  </g>

                  {/* Bottom-Left: WMI Subscriptions */}
                  <line x1="210" y1="200" x2="110" y2="255" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="30" y="240" width="140" height="42" rx="6" fill="#3b0764" stroke="#d8b4fe" strokeWidth="1" />
                    <text x="100" y="262" fill="#f3e8ff" fontWeight="bold" textAnchor="middle" fontSize="9">WMI Subscriptions</text>
                    <text x="100" y="273" fill="#e9d5ff" textAnchor="middle" fontSize="7.5">Fileless EventFilter</text>
                  </g>

                  {/* Bottom-Right: Systemd Services */}
                  <line x1="290" y1="200" x2="390" y2="255" stroke="#6366f1" strokeWidth="1.5" />
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="330" y="240" width="140" height="42" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="400" y="262" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">Systemd / SSH Keys</text>
                    <text x="400" y="273" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">Linux Daemons</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.1: Key persistence hooks used to maintain access across Windows and Linux systems.
              </p>
            </div>

            {/* Diagram 2: User-Mode vs Kernel-Mode Rootkit Rings */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>👑</span> Diagram B: Ring 3 vs Ring 0 Rootkit Architecture
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Ring 3 Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="460" height="95" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="40" y="45" fill="#818cf8" fontWeight="bold" fontSize="10.5">RING 3: USER MODE (Applications, Task Manager, Browsers)</text>
                    <rect x="40" y="55" width="420" height="45" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                    <text x="250" y="75" fill="#c7d2fe" textAnchor="middle" fontSize="9">User-Mode Rootkit: Injects DLLs &amp; hooks Win32 APIs (EnumProcesses)</text>
                    <text x="250" y="90" fill="#94a3b8" textAnchor="middle" fontSize="8">Hides malware from Task Manager, but visible to kernel memory scanners.</text>
                  </g>

                  {/* Middle Ring 0 Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="125" width="460" height="95" rx="8" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="40" y="150" fill="#f87171" fontWeight="bold" fontSize="10.5">RING 0: KERNEL MODE (ntoskrnl.exe, Signed Device Drivers)</text>
                    <rect x="40" y="160" width="420" height="45" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                    <text x="250" y="180" fill="#fee2e2" textAnchor="middle" fontSize="9">Kernel Rootkit: Direct Kernel Object Manipulation (DKOM)</text>
                    <text x="250" y="195" fill="#fca5a5" textAnchor="middle" fontSize="8">Unlinks processes from ActiveProcessLinks; completely invisible to OS kernel!</text>
                  </g>

                  {/* Firmware UEFI Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="230" width="460" height="65" rx="8" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="250" y="255" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="10">UEFI FIRMWARE / BOOTKIT (SPI Flash ROM)</text>
                    <text x="250" y="275" fill="#cbd5e1" textAnchor="middle" fontSize="8">Executes before OS kernel boots; survives full hard drive formatting &amp; OS reinstalls!</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 7.2: Execution privilege rings: Ring 3 User APIs vs Ring 0 Kernel DKOM vs UEFI Bootkits.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Persistence Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads triage WMI persistence, audit SSH authorized keys, enforce UEFI Secure Boot, and analyze C2 jitter telemetry across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                  <span>⚡</span> Persistence Dilemma ({currentLocalScenario.persistenceType})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Threat Hunting &amp; Hardening Action
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
              Guidelines for red teamers and defensive threat hunters managing persistence mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Persistence Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Set Hardcoded Auto-Kill Timers:</strong> Configure all test beacons to self-destruct after the assessment window.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain a Dropped Artifact Log:</strong> Record every modified registry key and scheduled task for Phase 5 cleanup.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Apply 30%+ Jitter to C2 Beacons:</strong> Randomize heartbeat timing to test EDR behavioral anomaly rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Monitor Sysmon Event ID 13:</strong> Track all registry writes to Startup and Run keys in real time.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Persistence Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Leaving Ghost Backdoors Behind:</strong> Forgetting test beacons creates permanent client vulnerabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Zero-Jitter Beacons:</strong> Exact 60-second heartbeats get flagged by SIEM periodicity algorithms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Introducing Contaminants:</strong> Installing backdoors without signed authorization violates IT Act Section 43(c).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring UEFI Firmware:</strong> Failing to verify Secure Boot leaves systems vulnerable to bootkits.</span>
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
                  <span><strong>Enable UEFI Secure Boot &amp; HVCI:</strong> Block unsigned Ring 0 kernel modules and bootkits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy EDR Memory Scanners:</strong> Detect unbacked executable threads (RWX allocations) in RAM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce File Integrity Monitoring:</strong> Track unauthorized writes to `/etc/crontab` and `.ssh/authorized_keys`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Restrict Egress DNS Traffic:</strong> Force all DNS queries through internal logging resolvers to block DNS tunneling.</span>
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
              Synthesize key persistence and backdoor concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Threat Hunters
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why C2 jitter is essential for stealth: if an agent sends heartbeats at exact 60.0-second intervals, SIEM correlation engines easily flag the rigid mathematical pattern. Adding 30% jitter introduces random human-like variance that blends with legitimate web traffic.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  The difference between User-Mode (Ring 3) and Kernel-Mode (Ring 0) rootkits: User-mode rootkits fool Task Manager by hooking Win32 APIs, whereas Kernel rootkits modify low-level operating system linked lists (DKOM), hiding processes from the kernel itself.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future penetration testing assignments, always configure an auto-kill expiration date on every dropped beacon so that test implants automatically terminate and erase themselves when the assessment ends.
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
                <span>Phase 4 maintains access across system reboots and user logoffs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Windows Registry Run keys execute payloads on every user logon.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>WMI Event Subscriptions provide fileless persistence in OBJECTS.DATA.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>C2 Jitter adds random percentage delays between beacon heartbeats.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Kernel rootkits operate in Ring 0 and modify kernel data via DKOM.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 43(c) &amp; 66 penalize unauthorized contaminants.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Phase 4: Maintaining Access (Backdoors, Rootkits &amp; Persistence) FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Phase 4: Maintaining Access (Backdoors, Rootkits &amp; Persistence) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Phase 4 teaches us how real-world adversaries survive inside compromised networks for months. As defenders, we must look beyond obvious files on disk—audit WMI subscriptions, monitor Sysmon Event ID 13 registry modifications, and inspect network telemetry for jittered beacon heartbeats. When you master persistence detection, you deny adversaries their most dangerous weapon: stealth longevity."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
