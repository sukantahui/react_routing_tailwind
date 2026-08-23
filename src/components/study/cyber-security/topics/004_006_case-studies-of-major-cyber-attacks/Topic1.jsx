import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgPurdueId = useId();
  const svgSabotageCycleId = useId();

  // Studio 1: Centrifuge Frequency Sabotage State
  const [activeSabotagePhase, setActiveSabotagePhase] = useState("overspeed"); // overspeed, normal, deceleration
  const [centrifugeFrequencyHz, setCentrifugeFrequencyHz] = useState(1410); // 2 to 1410 Hz
  const [rootkitTelemetrySpoofActive, setRootkitTelemetrySpoofActive] = useState(true);

  // Studio 2: 4 Zero-Day & Certificate Decompiler State
  const [selectedExploitKey, setSelectedExploitKey] = useState("cve_2010_2568_lnk");

  // Studio 3: SCADA Hardening & Mechanical Interlock State
  const [dataDiodeActive, setDataDiodeActive] = useState(true);
  const [plcRootOfTrustEnabled, setPlcRootOfTrustEnabled] = useState(true);
  const [analogMechanicalInterlock, setAnalogMechanicalInterlock] = useState(true);
  const [usbPortBlockingPolicy, setUsbPortBlockingPolicy] = useState(true);

  // Studio 4: Regional Ichapur Water Treatment SCADA Audit Tab
  const [activeRegionalLabTab, setActiveRegionalLabTab] = useState("audit_findings");

  // 4 Zero-Days Database for Studio 2
  const zeroDaysDatabase = {
    cve_2010_2568_lnk: {
      key: "cve_2010_2568_lnk",
      title: "CVE-2010-2568 — Windows Shell LNK Shortcut Parsing (RCE)",
      type: "Remote Code Execution (Air-Gap Jumper)",
      affected: "Windows 2000, XP, Server 2003, Vista, Windows 7",
      mechanism:
        "Windows Explorer automatically parsed `.lnk` and `.pif` shortcut files when opening a folder or USB drive to display icons. Stuxnet crafted an icon resource pointing to `~WTR4141.tmp` on the USB root, invoking `Control_RunDLL` to execute payload DLLs silently without requiring any user click.",
      impact: "Allowed Stuxnet to jump across physical air-gaps via infected contractor USB thumb drives.",
      mitre: "T1091 (Replication Through Removable Media), T1204 (User Execution)"
    },
    cve_2010_2729_spooler: {
      key: "cve_2010_2729_spooler",
      title: "CVE-2010-2729 — Print Spooler Service Vulnerability (MS10-061)",
      type: "Remote Code Execution (Lateral Spread)",
      affected: "Windows Print Spooler (`spoolsv.exe`) on Windows XP, Server 2003/2008",
      mechanism:
        "An unauthenticated attacker sent a specially crafted print request to the Windows Print Spooler service over RPC/SMB. The service failed to validate permissions when creating printer job files, allowing Stuxnet to write a malicious binary to `C:\\Windows\\System32\\` and execute it as SYSTEM.",
      impact: "Enabled rapid lateral spread across internal air-gapped LAN workstations.",
      mitre: "T1210 (Exploitation of Remote Services), T1068 (Exploitation for Privilege Escalation)"
    },
    cve_2010_3338_taskscheduler: {
      key: "cve_2010_3338_taskscheduler",
      title: "CVE-2010-3338 — Task Scheduler Memory Corruption (LPE)",
      type: "Local Privilege Escalation",
      affected: "Windows Vista and Windows 7 Task Scheduler",
      mechanism:
        "Stuxnet exploited an integer truncation flaw during the parsing of legacy `.job` task files inside `schedsvc.dll`. By crafting a corrupted CRC in the job header, it hijacked execution flow and elevated local low-privilege accounts to `NT AUTHORITY\\SYSTEM`.",
      impact: "Bypassed Windows User Account Control (UAC) to install kernel-level rootkit drivers.",
      mitre: "T1068 (Exploitation for Privilege Escalation), T1053 (Scheduled Task/Job)"
    },
    cve_2010_2743_win32k: {
      key: "cve_2010_2743_win32k",
      title: "CVE-2010-2743 — Win32k Keyboard Layout Subsystem (LPE)",
      type: "Kernel-Mode Privilege Escalation",
      affected: "Windows 2000, XP, Server 2003, Vista, Windows 7",
      mechanism:
        "The Win32k kernel component (`win32k.sys`) failed to properly validate keyboard layout handle indices in user-mode callbacks. Stuxnet crafted an index out of bounds, overwriting kernel function pointers to achieve direct ring-0 kernel code execution.",
      impact: "Granted ring-0 kernel execution to install the Realtek/JMicron signed filter drivers.",
      mitre: "T1068 (Exploitation for Privilege Escalation), T1014 (Rootkit)"
    }
  };

  // Live Centrifuge Sabotage Physics Calculations for Studio 1
  const centrifugeMetrics = useMemo(() => {
    let rpm = centrifugeFrequencyHz * 60;
    let tensileStressPct = 0;
    let statusText = "Normal Operation";
    let statusColor = "text-emerald-400";
    let physicalDamageRisk = "Negligible (Safe operating window)";

    if (centrifugeFrequencyHz > 1200) {
      tensileStressPct = Math.min(100, Math.round(((centrifugeFrequencyHz - 1064) / (1410 - 1064)) * 70 + 30));
      statusText = "CRITICAL: Rotational Tensile Overpressure!";
      statusColor = "text-rose-400";
      physicalDamageRisk = "Severe: Rotor aluminium expands, tearing vacuum seals and causing destructive explosion.";
    } else if (centrifugeFrequencyHz < 100) {
      tensileStressPct = 95;
      statusText = "CRITICAL: Harmonic Resonance Deceleration Crash!";
      statusColor = "text-amber-400";
      physicalDamageRisk = "Catastrophic: Passing through sub-harmonic resonance causes severe wobble; rotor shatters against casing.";
    } else if (centrifugeFrequencyHz >= 1000 && centrifugeFrequencyHz <= 1100) {
      tensileStressPct = 15;
      statusText = "Nominal Enrichment Speed";
      statusColor = "text-emerald-400";
      physicalDamageRisk = "Optimal operational baseline for U-235 gas isotope separation.";
    } else {
      tensileStressPct = 45;
      statusText = "Non-Optimal Speed Window";
      statusColor = "text-yellow-400";
      physicalDamageRisk = "Moderate rotor vibration; reduced enrichment efficiency.";
    }

    // Telemetry spoofing
    const displayedOperatorFrequencyHz = rootkitTelemetrySpoofActive ? 1064 : centrifugeFrequencyHz;
    const displayedOperatorRpm = displayedOperatorFrequencyHz * 60;

    return {
      rpm: rpm.toLocaleString(),
      tensileStressPct,
      statusText,
      statusColor,
      physicalDamageRisk,
      displayedOperatorFrequencyHz,
      displayedOperatorRpm: displayedOperatorRpm.toLocaleString()
    };
  }, [centrifugeFrequencyHz, rootkitTelemetrySpoofActive]);

  // Handle Preset Phase Button Clicks
  const handlePhaseChange = (phase) => {
    setActiveSabotagePhase(phase);
    if (phase === "overspeed") {
      setCentrifugeFrequencyHz(1410);
    } else if (phase === "normal") {
      setCentrifugeFrequencyHz(1064);
    } else if (phase === "deceleration") {
      setCentrifugeFrequencyHz(2);
    }
  };

  // Studio 3 Calculation: Security Resilience Score
  const securityHardeningScore = useMemo(() => {
    let score = 0;
    if (dataDiodeActive) score += 25;
    if (plcRootOfTrustEnabled) score += 25;
    if (analogMechanicalInterlock) score += 30;
    if (usbPortBlockingPolicy) score += 20;
    return score;
  }, [dataDiodeActive, plcRootOfTrustEnabled, analogMechanicalInterlock, usbPortBlockingPolicy]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* TOPIC HEADER HERO BANNER */}
        <header className="relative bg-gradient-to-r from-amber-950 via-slate-900 to-red-950 border border-amber-800/40 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <span>BCAC703 — Cyber Security Track</span>
              <span>•</span>
              <span>Module 004.006 — Topic 1</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Case Study 1: Stuxnet (2010) — The First Cyber Weapon & SCADA Sabotage
            </h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-4xl leading-relaxed">
              Deep forensic deconstruction of Operation Olympic Games: How weaponized code breached an air-gapped nuclear facility via USB zero-days, hooked Siemens PLC firmware, falsified SCADA telemetry, and physically shattered 1,000 uranium centrifuges.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-gray-400">
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">4x Zero-Day Suite (CVE-2010-2568)</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Stolen Realtek/JMicron Signatures</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Siemens S7-300 & OB35 Hooking</span>
              <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">Harmonic Frequency Sabotage</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: ARCHITECTURAL PURDUE MODEL & STUXNET INTRUSION MAPPING */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">01.</span> The Purdue Model & Stuxnet's Cross-Layer Penetration
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Visualizing how Stuxnet penetrated from external contractors into deep physical industrial hardware.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-mono">
              Purdue ICS Levels 0-4
            </span>
          </div>

          {/* SVG INFOGRAPHIC: The Purdue Model Infiltration */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Interactive Architectural Map: Stuxnet Infection & Exploitation Path across Purdue Levels
            </h4>
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 900 230" className="w-full min-w-[700px] h-56">
                <defs>
                  <linearGradient id={`${svgPurdueId}_grad`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Level 4: Enterprise / Contractor */}
                <rect x="20" y="20" width="160" height="180" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <text x="100" y="45" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">LEVEL 4: CONTRACTOR</text>
                <text x="100" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">External Laptop / USB</text>
                <text x="100" y="100" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">CVE-2010-2568 LNK</text>
                <text x="100" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Air-gap jumped via</text>
                <text x="100" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">infected thumb drives</text>
                <rect x="35" y="155" width="130" height="26" rx="6" fill="#7f1d1d" />
                <text x="100" y="172" textAnchor="middle" fill="#fecaca" fontSize="9" fontWeight="bold">Stolen Realtek Cert</text>

                {/* Arrow 1 */}
                <line x1="180" y1="110" x2="205" y2="110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

                {/* Level 3: Plant Operations */}
                <rect x="205" y="20" width="160" height="180" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                <text x="285" y="45" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">LEVEL 3: OPERATIONS</text>
                <text x="285" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">Engineering Workstation</text>
                <text x="285" y="100" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Siemens STEP 7</text>
                <text x="285" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">`s7otbxdx.dll` hooked</text>
                <text x="285" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Print Spooler Exploit</text>
                <rect x="220" y="155" width="130" height="26" rx="6" fill="#1e3a8a" />
                <text x="285" y="172" textAnchor="middle" fill="#bfdbfe" fontSize="9" fontWeight="bold">DLL Shim Interceptor</text>

                {/* Arrow 2 */}
                <line x1="365" y1="110" x2="390" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Level 2: Supervisory HMI */}
                <rect x="390" y="20" width="160" height="180" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="470" y="45" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">LEVEL 2: CONTROL HMI</text>
                <text x="470" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">Siemens WinCC SCADA</text>
                <text x="470" y="100" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">Telemetry Spoofing</text>
                <text x="470" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Replays 21-sec benign loop</text>
                <text x="470" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">to blind human operators</text>
                <rect x="405" y="155" width="130" height="26" rx="6" fill="#4c1d95" />
                <text x="470" y="172" textAnchor="middle" fill="#ddd6fe" fontSize="9" fontWeight="bold">Operator Blindfold</text>

                {/* Arrow 3 */}
                <line x1="550" y1="110" x2="575" y2="110" stroke="#f59e0b" strokeWidth="3" />

                {/* Level 1: PLC Controller */}
                <rect x="575" y="20" width="150" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="650" y="45" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">LEVEL 1: PLCs</text>
                <text x="650" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">Siemens S7-315 / S7-417</text>
                <text x="650" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">OB35 Interrupt Hook</text>
                <text x="650" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">MC7 Bytecode injection</text>
                <text x="650" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">overwrites motor frequency</text>
                <rect x="585" y="155" width="130" height="26" rx="6" fill="#78350f" />
                <text x="650" y="172" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">Malicious Ladder Logic</text>

                {/* Arrow 4 */}
                <line x1="725" y1="110" x2="745" y2="110" stroke="#ef4444" strokeWidth="3" />

                {/* Level 0: Physical Machinery */}
                <rect x="745" y="20" width="140" height="180" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <text x="815" y="45" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">LEVEL 0: PROCESS</text>
                <text x="815" y="70" textAnchor="middle" fill="#cbd5e1" fontSize="10">IR-1 Gas Centrifuges</text>
                <text x="815" y="100" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">1410 Hz ➔ 2 Hz Crash</text>
                <text x="815" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">Rotor overpressure &</text>
                <text x="815" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">harmonic resonance</text>
                <rect x="752" y="155" width="125" height="26" rx="6" fill="#991b1b" />
                <text x="815" y="172" textAnchor="middle" fill="#fee2e2" fontSize="9" fontWeight="bold">~1,000 Shattered Rotors</text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTIVE CENTRIFUGE FREQUENCY & SABOTAGE MANIPULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">02.</span> Studio 1: SCADA Centrifuge Frequency & Telemetry Spoofing Lab
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate the Stuxnet harmonic sabotage cycle. Compare actual physical rotor speed with what human operators saw on their spoofed WinCC screens.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-red-950 border border-red-800 text-red-300 text-xs font-mono self-start sm:self-auto">
              Harmonic Sabotage Simulator
            </span>
          </div>

          {/* Phase Preset Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handlePhaseChange("overspeed")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                activeSabotagePhase === "overspeed"
                  ? "bg-rose-950/60 border-rose-600 text-rose-200 ring-2 ring-rose-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-rose-400 text-sm">Phase 1: Overspeed Surge (1,410 Hz)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Spikes frequency to 84,600 RPM for 15 minutes, exceeding tensile yield strength.
              </p>
            </button>

            <button
              onClick={() => handlePhaseChange("normal")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                activeSabotagePhase === "normal"
                  ? "bg-emerald-950/60 border-emerald-600 text-emerald-200 ring-2 ring-emerald-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-emerald-400 text-sm">Phase 2: Stealth Normal (1,064 Hz)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Maintains normal 63,840 RPM for 27 days to disguise sabotage as manufacturing flaws.
              </p>
            </button>

            <button
              onClick={() => handlePhaseChange("deceleration")}
              className={clsx(
                "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                activeSabotagePhase === "deceleration"
                  ? "bg-amber-950/60 border-amber-600 text-amber-200 ring-2 ring-amber-500"
                  : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
              )}
            >
              <div className="font-bold text-amber-400 text-sm">Phase 3: Resonant Deceleration (2 Hz)</div>
              <p className="text-[11px] text-gray-400 mt-1">
                Slows frequency to 120 RPM for 50 minutes; harmonic resonance causes severe lateral rotor crash.
              </p>
            </button>
          </div>

          {/* Manual Frequency Slider & Telemetry Spoof Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 border border-slate-800 rounded-xl p-5">
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-300">Manual Centrifuge Frequency Injection (VFD):</span>
                <span className="font-mono text-amber-400 font-bold">{centrifugeFrequencyHz} Hz ({centrifugeMetrics.rpm} RPM)</span>
              </div>
              <input
                type="range"
                min={2}
                max={1500}
                value={centrifugeFrequencyHz}
                onChange={(e) => setCentrifugeFrequencyHz(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>2 Hz (Decel Crash)</span>
                <span>1,064 Hz (Normal IR-1)</span>
                <span>1,410 Hz (Tensile Rupture)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Stuxnet PLC Telemetry Rootkit</div>
                <div className="text-[11px] text-gray-400">Replays 21-sec recorded normal sensor buffer to HMI</div>
              </div>
              <button
                onClick={() => setRootkitTelemetrySpoofActive(!rootkitTelemetrySpoofActive)}
                className={clsx(
                  "px-3 py-1.5 rounded text-xs font-bold transition-all",
                  rootkitTelemetrySpoofActive ? "bg-amber-600 text-white" : "bg-slate-700 text-gray-300"
                )}
              >
                {rootkitTelemetrySpoofActive ? "ROOTKIT ACTIVE (Spoofing)" : "ROOTKIT DISABLED (Real)"}
              </button>
            </div>
          </div>

          {/* Side-by-Side Reality vs Operator View Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Operator WinCC Screen (Spoofed) */}
            <div className="bg-slate-950 border border-blue-900/60 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Human Operator HMI Screen (Siemens WinCC)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                  Station: Natanz-Cascade-04
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Displayed Operating Frequency:</span>
                  <span className="font-mono font-bold text-emerald-400">{centrifugeMetrics.displayedOperatorFrequencyHz} Hz</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Displayed Rotor Speed:</span>
                  <span className="font-mono font-bold text-emerald-400">{centrifugeMetrics.displayedOperatorRpm} RPM</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Pressure Sensor Telemetry:</span>
                  <span className="font-mono font-bold text-emerald-400">1.02 Bar (Optimal Vacuum)</span>
                </div>
                <div className="p-3 rounded bg-emerald-950/30 border border-emerald-800/60 text-emerald-200 text-xs text-center font-semibold">
                  STATUS: All 164 Cascade Centrifuges Operating Within Safe Limits
                </div>
              </div>
            </div>

            {/* Actual Physical Centrifuge Cascade (Reality) */}
            <div className="bg-slate-950 border border-red-900/60 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" /> Real Physical Machine State (Natanz Level 0)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                  Kinetic Reality
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Actual Rotor Frequency:</span>
                  <span className="font-mono font-bold text-rose-400">{centrifugeFrequencyHz} Hz</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Actual Rotor RPM:</span>
                  <span className="font-mono font-bold text-rose-400">{centrifugeMetrics.rpm} RPM</span>
                </div>
                <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-gray-400">Rotational Tensile Stress:</span>
                  <span className="font-mono font-bold text-amber-400">{centrifugeMetrics.tensileStressPct}% of Max Structural Limit</span>
                </div>
                <div className={clsx("p-3 rounded border text-xs text-center font-bold", centrifugeFrequencyHz === 1064 ? "bg-emerald-950/30 border-emerald-800 text-emerald-300" : "bg-rose-950/50 border-rose-700 text-rose-200")}>
                  {centrifugeMetrics.statusText}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: 4 ZERO-DAY & CERTIFICATE DECOMPILER LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">03.</span> Studio 2: The 4 Zero-Days & Stolen Digital Certificate Decompiler
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the four unprecedented Windows zero-days burned in Stuxnet and analyze the stolen Realtek/JMicron code-signing certificates.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Zero-Day Exploit Matrix
            </span>
          </div>

          {/* Exploit Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {Object.values(zeroDaysDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedExploitKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between",
                  selectedExploitKey === item.key
                    ? "bg-purple-600/20 border-purple-500 text-purple-200 ring-1 ring-purple-500 shadow-md"
                    : "bg-slate-950 border-slate-800 text-gray-400 hover:bg-slate-800"
                )}
              >
                <div className="font-bold text-white text-xs">{item.title.split(" — ")[0]}</div>
                <div className="text-[10px] text-purple-400 mt-1">{item.type}</div>
              </button>
            ))}
          </div>

          {/* Active Exploit Deep Dive Details */}
          {(() => {
            const exp = zeroDaysDatabase[selectedExploitKey];
            return (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <span className="font-semibold text-gray-300">Exploit Category:</span> {exp.type}
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded text-[11px] font-mono text-purple-300">
                    MITRE ATT&CK: {exp.mitre}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-amber-400 font-semibold uppercase tracking-wider">
                      Technical Vulnerability Mechanism
                    </span>
                    <p className="text-gray-300 leading-relaxed font-sans">{exp.mechanism}</p>
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 space-y-2">
                    <span className="text-rose-400 font-semibold uppercase tracking-wider">
                      Role in Natanz Intrusion Campaign
                    </span>
                    <p className="text-gray-300 leading-relaxed font-sans">{exp.impact}</p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-gray-400">
                      <span className="font-semibold text-gray-300">Affected Windows Targets:</span> {exp.affected}
                    </div>
                  </div>
                </div>

                {/* Stolen Certificate Code Box */}
                <div className="bg-black/50 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                    Stolen Code Signing Certificate Artifact (Driver mrxnet.sys):
                  </span>
                  <pre className="text-[11px] font-mono text-gray-300 overflow-x-auto leading-relaxed bg-slate-950 p-3 rounded border border-slate-800">
{`Certificate Information:
  Issued To: Realtek Semiconductor Corp.
  Issued By: VeriSign Class 3 Code Signing 2004 CA
  Serial Number: 17 99 e7 9d 1a 99 f3 01 e0 4e a2 8e 53 f4 88 df
  Valid From: 06/08/2008 to 06/09/2010
  Status: REVOKED by VeriSign on July 16, 2010 (Post-Stuxnet discovery)
  Bypass Effect: Permitted 64-bit Kernel driver loading on Windows without triggering OS unsigned alerts!`}
                  </pre>
                </div>
              </div>
            );
          })()}
        </section>

        {/* STUDIO 3: MODERN INDUSTRIAL SCADA DEFENSE & MECHANICAL FAILSAFE LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">04.</span> Studio 3: Industrial Defense-in-Depth & Mechanical Failsafe Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Configure layered OT security controls. Learn why physical analog mechanical interlocks are the ultimate safeguard against zero-day software sabotage.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono self-start sm:self-auto">
              ICS Hardening Simulator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Defensive Toggle Controls */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
              <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                Industrial Defensive Controls Configuration
              </h3>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">1. Optical Hardware Data Diode</div>
                  <div className="text-[11px] text-gray-400">Unidirectional physical fiber link (Blocks USB/Inbound traffic)</div>
                </div>
                <button
                  onClick={() => setDataDiodeActive(!dataDiodeActive)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    dataDiodeActive ? "bg-emerald-600 text-white" : "bg-slate-700 text-gray-400"
                  )}
                >
                  {dataDiodeActive ? "DEPLOYED (+25 pts)" : "OFF"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">2. PLC Firmware Root of Trust</div>
                  <div className="text-[11px] text-gray-400">Cryptographically signed ladder logic verification (Rejects OB35 injection)</div>
                </div>
                <button
                  onClick={() => setPlcRootOfTrustEnabled(!plcRootOfTrustEnabled)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    plcRootOfTrustEnabled ? "bg-emerald-600 text-white" : "bg-slate-700 text-gray-400"
                  )}
                >
                  {plcRootOfTrustEnabled ? "ACTIVE (+25 pts)" : "OFF"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">3. Analog Mechanical Failsafe Interlock</div>
                  <div className="text-[11px] text-gray-400">Physical centrifugal governor cuts power if speed &gt; 1150 Hz (Unhackable by software)</div>
                </div>
                <button
                  onClick={() => setAnalogMechanicalInterlock(!analogMechanicalInterlock)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    analogMechanicalInterlock ? "bg-emerald-600 text-white" : "bg-slate-700 text-gray-400"
                  )}
                >
                  {analogMechanicalInterlock ? "INSTALLED (+30 pts)" : "OFF"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">4. Physical USB Port Lock & GPO Block</div>
                  <div className="text-[11px] text-gray-400">Blocks mass storage drivers on all engineering workstations</div>
                </div>
                <button
                  onClick={() => setUsbPortBlockingPolicy(!usbPortBlockingPolicy)}
                  className={clsx(
                    "px-3 py-1.5 rounded font-bold transition-all",
                    usbPortBlockingPolicy ? "bg-emerald-600 text-white" : "bg-slate-700 text-gray-400"
                  )}
                >
                  {usbPortBlockingPolicy ? "ENFORCED (+20 pts)" : "OFF"}
                </button>
              </div>
            </div>

            {/* Live Hardening Score & Defense Analysis */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
                  SCADA Facility Security Posture Analysis
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-3 rounded bg-slate-900 border border-slate-800">
                    <span className="text-gray-400">Total Defense Resilience Index:</span>
                    <span className="font-mono font-extrabold text-emerald-400 text-base">{securityHardeningScore} / 100</span>
                  </div>

                  <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-white block">Kinetic Sabotage Resilience:</span>
                    <p className="text-gray-300 text-[11px] leading-relaxed">
                      {securityHardeningScore === 100
                        ? "PERFECT: Multi-tier defense active. Even if 4 zero-days breach the workstation, the PLC Root of Trust rejects unsigned bytecode, and the physical mechanical governor prevents explosive overspeed."
                        : securityHardeningScore >= 60
                        ? "MODERATE: Good software/network boundaries, but missing analog mechanical failsafes leaves equipment vulnerable to direct PLC firmware compromise."
                        : "CRITICAL DEFICIENCY: High vulnerability to USB air-gap jumping and remote ladder logic tampering (identical to Natanz 2010 posture)."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800 text-xs text-blue-200 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-blue-300">
                  Golden Rule of Critical Infrastructure Security:
                </span>
                <p>
                  "Software controls can always be subverted by zero-day malware. Physical systems protecting life and national infrastructure must always maintain independent, analog mechanical interlocks that software cannot command."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL ICHAPUR WATER TREATMENT SCADA AUDIT LAB */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">05.</span> Studio 4: Regional Classroom Lab — Ichapur Water Treatment SCADA Audit
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Hands-on practical exercise: Mamata, Mahima, Abhronila, Susmita, and Debangshu harden a regional water treatment intake pump station against Stuxnet-style PLC tampering.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              Regional OT Audit
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Pedagogical Team Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-amber-950 text-amber-300 border border-amber-800 px-3 py-1 rounded-full font-medium">
                Lead OT Auditor: Sukanta Hui
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mamata (PLC Engineer)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Mahima (SCADA Architect)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Abhronila (Threat Hunter)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Susmita (Incident Commander)
              </span>
              <span className="bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full border border-slate-700">
                Debangshu (Hardware Specialist)
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveRegionalLabTab("audit_findings")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "audit_findings"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                1. Audit Findings in Ichapur
              </button>
              <button
                onClick={() => setActiveRegionalLabTab("remediation_steps")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  activeRegionalLabTab === "remediation_steps"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                2. Deployed Defensive Architecture
              </button>
            </div>

            {/* Tab Contents */}
            {activeRegionalLabTab === "audit_findings" ? (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-rose-400">Vulnerabilities Discovered by Debangshu & Mamata:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Unrestricted USB Use:</span> Pump maintenance engineers frequently plugged personal USB drives into the primary WinCC control workstation in Ichapur.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Unauthenticated S7Comm:</span> The Siemens S7-300 PLCs controlling the river intake valves accepted bytecode downloads without password authentication or RSA signature verification.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Absence of Analog Pressure Valves:</span> High-pressure water lines relied solely on electronic pressure transducer signals with no physical spring-loaded burst disks.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Remediation Executed by Susmita, Mahima & Abhronila:</span>
                  <ul className="list-disc list-inside space-y-1.5 text-gray-300">
                    <li>
                      <span className="font-semibold text-white">Mechanical USB Blockers:</span> Inserted physical RJ-45 and USB lock plugs into all workstation chassis.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Optical Data Diode:</span> Installed a unidirectional fiber transmitter so telemetry can flow outward to Kolkata monitoring centers without accepting inbound packets.
                    </li>
                    <li>
                      <span className="font-semibold text-white">Mechanical Spring-Loaded Relief Valves:</span> Installed analog mechanical pressure relief valves on high-pressure pipelines that physically open at 8.0 Bar regardless of software state.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">06.</span> Academic Note & Printable Revision Guide
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Print or export clean ASCII academic notes prepared by Sukanta Hui for BCA semester revision.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ASCII Revision Guide
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <PlainTextPrint
              text={noteText}
              fileName="Topic1_Stuxnet_Case_Study_Notes.txt"
            />
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">07.</span> Comprehensive Exam & Interview Question Bank
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                30 in-depth conceptual, analytical, and forensic questions with code snippets, hints, and model answers on Stuxnet and SCADA sabotage.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 text-xs font-mono self-start sm:self-auto">
              30 Topic Questions
            </span>
          </div>

          <FAQTemplate questions={questions} />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher />
        </footer>

      </div>
    </div>
  );
};

export default Topic1;
