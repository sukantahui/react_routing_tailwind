import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic9_files/honeypot_interaction_sim.py?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgInteractionTiersId = useId();
  const svgHoneywallId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("os_environment");

  // Studio 2: Live Interaction Simulator State
  const [selectedInteractionTier, setSelectedInteractionTier] = useState("low_interaction"); // "low_interaction", "high_interaction_contained", "high_interaction_uncontained"
  const [injectedAttackerCommand, setInjectedAttackerCommand] = useState("recon_uname");

  // Studio 3: Performance & Sizing Calculations
  const [lowInteractionDecoysCount, setLowInteractionDecoysCount] = useState(150); // 10 to 500 decoys
  const [highInteractionVmsCount, setHighInteractionVmsCount] = useState(4); // 1 to 20 VMs
  const [vmRamAllocationGb, setVmRamAllocationGb] = useState(4); // 2 to 16 GB per VM

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_scada_grid");

  // Comparison Database for Studio 1
  const interactionDimensions = {
    os_environment: {
      key: "os_environment",
      title: "1. Operating System Environment & Realism",
      category: "Architectural Foundation",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      lowDetail: "Software Emulation. Emulates specific protocol banners and fixed command dictionaries. No real OS kernel or file execution.",
      mediumDetail: "Application-Level Emulation. Simulates web forms, vulnerable endpoints, and SQL queries (Glastopf / Snare & Tanner).",
      highDetail: "Genuine Real Operating System. Full un-emulated Linux or Windows Server bare-metal or KVM virtual machines.",
      verdict: "High-Interaction runs real kernels for 100% realism; Low-Interaction uses lightweight Python/Go daemons."
    },
    threat_intel_depth: {
      key: "threat_intel_depth",
      title: "2. Threat Intelligence & Forensic Data Captured",
      category: "Intelligence Fidelity",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      lowDetail: "Captures automated port scans, brute-force password lists, and simple worm payloads (Dionaea / Cowrie).",
      mediumDetail: "Captures web application attacks, SQL injection payloads, and Local File Inclusion (LFI) request strings.",
      highDetail: "Captures complete zero-day kernel rootkits, in-memory shellcode, compiled binaries, and live human keystroke timing.",
      verdict: "High-Interaction is indispensable for extracting novel zero-day exploits and analyzing human APT behavior."
    },
    operational_risk: {
      key: "operational_risk",
      title: "3. Operational Security Risk & Attacker Pivoting",
      category: "Risk & Containment",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      lowDetail: "0.0% Operational Risk. The attacker cannot compromise the host, install real malware, or pivot laterally.",
      mediumDetail: "Very Low Risk (< 1.0%). Backend systems remain completely isolated; safe for perimeter placement.",
      highDetail: "High Operational Risk. Compromised real OS can be weaponized as a launchpad unless strict Honeywall containment is enforced.",
      verdict: "High-Interaction demands mandatory Honeywall egress filtering and automated VM snapshot rollback."
    },
    hardware_scale: {
      key: "hardware_scale",
      title: "4. Hardware Resource Footprint & Scalability",
      category: "Infrastructure Cost",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      lowDetail: "Tiny Footprint. A single 16-core server or cloud instance can host 5,000+ virtual low-interaction decoys (Honeyd).",
      mediumDetail: "Low Footprint. Runs multiple emulated web services on standard virtual instances.",
      highDetail: "Heavy Footprint. Requires dedicated RAM, CPU virtualization cores, and NVMe disk storage per VM (2GB–8GB per node).",
      verdict: "Low-Interaction blankets entire enterprise subnets cheaply; High-Interaction is reserved for research DMZs."
    }
  };

  // Studio 2: Live Injected Attacker Commands Database
  const attackerCommands = {
    recon_uname: {
      id: "recon_uname",
      command: "uname -a; whoami; cat /etc/passwd",
      type: "Standard Reconnaissance",
      isKernelExploit: false,
      attemptsPivot: false
    },
    zero_day_rootkit: {
      id: "zero_day_rootkit",
      command: "sample_kernel_privilege_escalation_probe --test-injection",
      type: "Novel Zero-Day Kernel Privilege Escalation",
      isKernelExploit: true,
      attemptsPivot: false
    },
    lateral_pivot_probe: {
      id: "lateral_pivot_probe",
      command: "ssh root@10.10.1.5 (Attempting Outbound Internal Lateral Pivot)",
      type: "Unauthorized Lateral Movement to Production VLAN",
      isKernelExploit: false,
      attemptsPivot: true
    }
  };

  // Studio 2: Execution Result Evaluation Logic
  const interactionResult = useMemo(() => {
    const cmd = attackerCommands[injectedAttackerCommand];

    if (selectedInteractionTier === "low_interaction") {
      if (cmd.id === "recon_uname") {
        return {
          tierLabel: "Low-Interaction Honeypot (Cowrie Emulation)",
          terminalOutput: "Linux ubuntu-srv01 5.4.0-42-generic #46-Ubuntu SMP x86_64 GNU/Linux\nroot\nroot:x:0:0:root:/root:/bin/bash",
          intelCaptured: "Command string & brute-force credentials logged",
          pivotStatus: "✔ 0% Risk (Emulator cannot transmit network packets)",
          verdict: "✔ SAFE EMULATION (Command Logged, Zero Host Risk)",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Cowrie returned a canned response from its virtual filesystem dictionary. Attacker session logged without any real code execution."
        };
      } else if (cmd.id === "zero_day_rootkit") {
        return {
          tierLabel: "Low-Interaction Honeypot (Cowrie Emulation)",
          terminalOutput: "bash: ./cve_2026_dirty_pipe_zero_day: Segmentation fault (simulated)",
          intelCaptured: "Binary saved to /var/lib/cowrie/downloads/ (Payload partially captured)",
          pivotStatus: "✔ 0% Risk (Exploit cannot execute on emulated kernel)",
          verdict: "⚠️ PARTIAL CAPTURE (Kernel Exploit Failed to Execute)",
          badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
          explanation: "Because there is no real Linux kernel, the zero-day binary could not execute its memory hooks. Saved the binary for offline analysis."
        };
      } else {
        return {
          tierLabel: "Low-Interaction Honeypot (Cowrie Emulation)",
          terminalOutput: "ssh: connect to host 10.10.1.5 port 22: Connection refused (Emulated)",
          intelCaptured: "Pivot attempt logged",
          pivotStatus: "✔ Blocked (Emulator has no real networking stack)",
          verdict: "✔ SAFE (Outbound Pivot Impossible in Low-Interaction)",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Low-interaction daemons do not possess real networking sockets, completely preventing lateral movement."
        };
      }
    } else if (selectedInteractionTier === "high_interaction_contained") {
      // High-Interaction with Active Honeywall
      if (cmd.id === "recon_uname") {
        return {
          tierLabel: "High-Interaction VM + eBPF Tracing + Honeywall Gateway",
          terminalOutput: "Linux debian-target 6.1.0-18-amd64 #1 SMP PREEMPT_DYNAMIC Debian x86_64\nroot\nroot:x:0:0:root:/root:/bin/bash\n[eBPF: Syscall execve intercepted]",
          intelCaptured: "Deep kernel telemetry & millisecond keystroke timing recorded",
          pivotStatus: "✔ Honeywall active (Egress rate-limiting enforced)",
          verdict: "✔ HIGH FIDELITY (Real Debian Shell + eBPF Telemetry)",
          badgeColor: "bg-sky-950 text-sky-300 border-sky-700",
          explanation: "Executed on genuine Debian Linux kernel; eBPF invisible tracepoints recorded complete execution context without observable guest agents."
        };
      } else if (cmd.id === "zero_day_rootkit") {
        return {
          tierLabel: "High-Interaction VM + eBPF Tracing + Honeywall Gateway",
          terminalOutput: "[REAL KERNEL EXPLOIT EXECUTED] Ring-0 memory hook installed at 0xFFFFFFFF81000000\n[eBPF Hook]: Zero-Day payload extracted: 0xDEADBEEFCAFE\n[Honeywall]: Automated snapshot rollback scheduled in 60s",
          intelCaptured: "100% Full Zero-Day Kernel Rootkit Memory Payload Extracted!",
          pivotStatus: "✔ Quarantined in isolated sandbox VLAN",
          verdict: "🏆 GOLD STANDARD INTEL (Zero-Day Rootkit Captured in Real Time!)",
          badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
          explanation: "The real kernel executed the novel zero-day, allowing eBPF to capture in-memory shellcode that would have crashed a low-interaction emulator!"
        };
      } else {
        return {
          tierLabel: "High-Interaction VM + eBPF Tracing + Honeywall Gateway",
          terminalOutput: "ssh: connect to host 10.10.1.5 port 22: Connection timed out\n[HONEYWALL GATEWAY]: Dropped outbound packet destined for RFC 1918 internal subnet!",
          intelCaptured: "Attacker pivot attempt recorded with exact target IP",
          pivotStatus: "✔ 100% CONTAINED (Honeywall Dropped Outbound SYN)",
          verdict: "🛡️ THREAT CONTAINED (Honeywall Prevented Lateral Pivot)",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Honeywall bridging firewall intercepted the outbound SYN packet and dropped it, preventing the attacker from reaching production servers."
        };
      }
    } else {
      // High-Interaction Uncontained (Dangerous Misconfiguration)
      return {
        tierLabel: "High-Interaction VM (WITHOUT Honeywall Containment - DANGEROUS!)",
        terminalOutput: "Warning: Outbound traffic unconstrained!\nAttacker established active SSH connection to internal production server 10.10.1.5!",
        intelCaptured: "Compromise logged",
        pivotStatus: "🚨 CRITICAL FAILURE (Attacker Successfully Pivoted into Production!)",
        verdict: "❌ CATASTROPHIC RISK: Honeypot Weaponized by Attacker!",
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
        explanation: "Running a High-Interaction Honeypot without a Honeywall allows attackers to compromise production servers from inside the network perimeter!"
      };
    }
  }, [selectedInteractionTier, injectedAttackerCommand]);

  // Studio 3: Performance Calculations
  const calculatedCapacityMetrics = useMemo(() => {
    // Total RAM required (GB)
    const lowInteractionRamGb = (lowInteractionDecoysCount * 0.002).toFixed(1); // 2MB per decoy
    const highInteractionRamGb = (highInteractionVmsCount * vmRamAllocationGb).toFixed(0);
    const totalRamRequiredGb = (Number(lowInteractionRamGb) + Number(highInteractionRamGb) + 4.0).toFixed(0);

    // 5-Year Hardware Infrastructure TCO (INR ₹ Lakhs)
    const serverHardwareLakhs = (Number(totalRamRequiredGb) * 0.35 + 8.5).toFixed(2);
    const honeywallApplianceLakhs = (6.0).toFixed(2);
    const fiveYearTcoLakhs = (Number(serverHardwareLakhs) + Number(honeywallApplianceLakhs) + 5.0).toFixed(2);

    return {
      lowInteractionRamGb,
      highInteractionRamGb,
      totalRamRequiredGb,
      fiveYearTcoLakhs
    };
  }, [lowInteractionDecoysCount, highInteractionVmsCount, vmRamAllocationGb]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_scada_grid: {
      id: "barrackpore_scada_grid",
      title: "Barrackpore Municipal Water Purification SCADA Deception Defense",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      architecture: "20 Low-Interaction Conpot Modbus PLCs + 1 High-Interaction Honeywall VM",
      threatScenario: "An Advanced Persistent Threat (APT) launched automated Mirai botnet scans across industrial Modbus TCP port 502 while simultaneously deploying a targeted zero-day PLC exploit.",
      solution: "Sukanta Hui, Mamata, and Mahima deployed Conpot low-interaction honeypots across all 20 subnets. The Conpot decoys absorbed 8,400 botnet scans with zero CPU overhead, while the High-Interaction VM trapped the targeted zero-day.",
      outcome: "Zero industrial disruption; zero-day payload extracted via eBPF in 1.2 seconds; Honeywall dropped lateral pivot attempts; 100% CERT-In compliance."
    },
    saltlake_cloud_rootkit: {
      id: "saltlake_cloud_rootkit",
      title: "Salt Lake Sector V State Data Center Zero-Day Rootkit Extraction",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      architecture: "High-Interaction KVM Debian VM + Micro-VM Firecracker Fleet",
      threatScenario: "Adversaries deployed a stealthy ring-0 Linux kernel rootkit designed to subvert user-space IDS sensors and hide cryptocurrency miners.",
      solution: "Abhronila, Susmita, and Debangshu utilized out-of-band eBPF hypervisor tracing on a High-Interaction Debian honeypot to capture the rootkit's raw memory injection.",
      outcome: "Full kernel exploit extracted; YARA rules synthesized and pushed to perimeter firewalls within 15 minutes; VM reverted to pristine base snapshot automatically."
    }
  };

  const currentDimension = interactionDimensions[selectedDimensionKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 9</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Types of Honeypots: Low-Interaction vs High-Interaction
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the operational spectrum of cyber deception. Compare <strong className="text-sky-400">Low-Interaction Emulators (Cowrie, Dionaea, Conpot)</strong> with <strong className="text-emerald-400">High-Interaction Real Operating Systems</strong>, out-of-band <strong className="text-purple-400">eBPF Kernel Tracing</strong>, and strict <strong className="text-amber-400">Honeywall Egress Data Containment</strong>.
          </p>
        </header>

        {/* SECTION 1: INTERACTION TIERS & HONEYWALL SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Low-Interaction Emulation vs High-Interaction Real OS Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing software-emulated command dictionaries on the left and real Linux operating systems with Honeywall egress containment on the right.
            </p>
          </div>

          {/* SVG 1: LOW VS HIGH INTERACTION ARCHITECTURES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Low-Interaction Daemon ➔ High-Interaction VM + Honeywall Gateway
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Emulation vs Real OS &amp; Egress Control</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgInteractionTiersId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Low vs High Interaction Honeypot Architectures Diagram"
              >
                {/* LEFT: LOW-INTERACTION EMULATION */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  LOW-INTERACTION HONEYPOT (COWRIE / DIONAEA)
                </text>

                <rect x="35" y="58" width="360" height="60" rx="6" fill="#082f49" stroke="#0284c7" />
                <text x="215" y="78" fill="#7dd3fc" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Software Protocol Daemon (Python / Go)
                </text>
                <text x="215" y="96" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Simulates SSH, Telnet, SMB • No Real Linux Kernel • No File Execution
                </text>

                <rect x="35" y="128" width="175" height="115" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="122" y="148" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">Core Strengths</text>
                <text x="122" y="168" fill="#ffffff" fontSize="7" textAnchor="middle">• 0.0% Risk of Host Pivot</text>
                <text x="122" y="185" fill="#ffffff" fontSize="7" textAnchor="middle">• 5,000 Decoys per Server</text>
                <text x="122" y="202" fill="#ffffff" fontSize="7" textAnchor="middle">• Traps Automated Botnets</text>
                <text x="122" y="222" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">Massive Subnet Blanket</text>

                <rect x="220" y="128" width="175" height="115" rx="5" fill="#451a03" stroke="#f59e0b" />
                <text x="307" y="148" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">Limitations</text>
                <text x="307" y="168" fill="#ffffff" fontSize="7" textAnchor="middle">• Easily Fingerprintable</text>
                <text x="307" y="185" fill="#ffffff" fontSize="7" textAnchor="middle">• Cannot Run Rootkits</text>
                <text x="307" y="202" fill="#ffffff" fontSize="7" textAnchor="middle">• Misses Novel Zero-Days</text>
                <text x="307" y="222" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="middle">Shallow Forensic Depth</text>

                {/* RIGHT: HIGH-INTERACTION REAL OS */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  HIGH-INTERACTION REAL OS + HONEYWALL GATEWAY
                </text>

                <rect x="460" y="58" width="350" height="52" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="635" y="78" fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Genuine KVM Virtual Machine (Debian / Windows Server)
                </text>
                <text x="635" y="94" fill="#e0e7ff" fontSize="7.5" textAnchor="middle">
                  Real Linux Kernel • Out-of-Band eBPF Syscall Tracing • 100% Realism
                </text>

                <rect x="460" y="118" width="350" height="125" rx="5" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="635" y="138" fill="#fee2e2" fontSize="9" fontWeight="bold" textAnchor="middle">
                  HONEYWALL DATA CONTROL &amp; EGRESS CONTAINMENT
                </text>
                <text x="635" y="158" fill="#fca5a5" fontSize="7.5" textAnchor="middle">
                  🛡️ Egress Rule: DROP all packets destined for Internal Subnets (10.0.0.0/8)
                </text>
                <text x="635" y="176" fill="#fca5a5" fontSize="7.5" textAnchor="middle">
                  🛡️ Rate-Limiting: Maximum 5 outbound TCP connections / hour
                </text>
                <text x="635" y="194" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  ✔ Captures 100% Zero-Day Rootkits &amp; Live Human Hacker TTPs
                </text>
                <text x="635" y="220" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Automated Snapshot Rollback Every 24 Hours
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: INTERACTION TAXONOMY MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Low vs Medium vs High-Interaction Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the architectural trade-offs across Operating System Realism, Intelligence Depth, Operational Risk, and Scalability.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentDimension.badgeColor)}>
              {currentDimension.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(interactionDimensions).map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDimensionKey(d.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedDimensionKey === d.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Comparison Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDimension.title}</h3>
                <span className="text-gray-400">Category: {currentDimension.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentDimension.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] block">
                  ⚙️ 1. Low-Interaction (Cowrie):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.lowDetail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-950/80 space-y-2">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] block">
                  🌐 2. Medium-Interaction (Glastopf):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.mediumDetail}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-950/80 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">
                  💻 3. High-Interaction (Real VM):
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.highDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Verdict:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentDimension.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE INTERACTION LEVEL SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Interaction Level &amp; Attacker Shell Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Execute reconnaissance, zero-day rootkits, and lateral pivot attempts across Low-Interaction vs High-Interaction environments.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Shell Simulator Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Honeypot Deployment Tier:</label>
              <select
                value={selectedInteractionTier}
                onChange={(e) => setSelectedInteractionTier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="low_interaction">1. Low-Interaction Daemon (Cowrie / Dionaea Emulation)</option>
                <option value="high_interaction_contained">2. High-Interaction Real Debian VM + Honeywall Gateway (Recommended)</option>
                <option value="high_interaction_uncontained">3. High-Interaction VM (WITHOUT Honeywall - High Risk!)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Injected Attacker Command / Exploit:</label>
              <select
                value={injectedAttackerCommand}
                onChange={(e) => setInjectedAttackerCommand(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(attackerCommands).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.type}: {c.command}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Active Honeypot Environment:
                </span>
                <span className="text-white font-bold text-sm">{interactionResult.tierLabel}</span>
                <div className="font-mono text-gray-400 text-[11px] truncate max-w-md">
                  Injected Command: {attackerCommands[injectedAttackerCommand].command}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                interactionResult.badgeColor
              )}>
                {interactionResult.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 font-mono space-y-2">
              <span className="text-sky-400 font-bold text-[11px] block">Terminal Output Received by Attacker:</span>
              <pre className="text-gray-200 text-[11px] whitespace-pre-wrap">{interactionResult.terminalOutput}</pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-purple-300 font-bold text-[10px] block">Forensic Intelligence Captured:</span>
                <p className="text-gray-300 text-[11px]">{interactionResult.intelCaptured}</p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-300 font-bold text-[10px] block">Lateral Pivot &amp; Containment State:</span>
                <p className="text-gray-300 text-[11px]">{interactionResult.pivotStatus}</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Execution Analysis:
              </span>
              <p className="text-gray-300 leading-relaxed">{interactionResult.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: INTERACTION SIMULATOR CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Honeypot Interaction &amp; Risk Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation comparing Low-Interaction command dictionary emulation with High-Interaction eBPF syscall tracing and Honeywall containment.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              honeypot_interaction_sim.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="honeypot_interaction_sim.py"
            highlightLines={[22, 38, 55, 70]}
          />
        </section>

        {/* STUDIO 3: INTERACTION SIZING & RAM CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Deception Grid Sizing, RAM Allocation &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate total memory footprints (GB), hardware appliance requirements, and 5-year deception infrastructure TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Capacity Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Low-Interaction Decoys:</span>
                <span className="text-sky-400 font-bold">{lowInteractionDecoysCount} Decoys</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={lowInteractionDecoysCount}
                onChange={(e) => setLowInteractionDecoysCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">RAM: ~{calculatedCapacityMetrics.lowInteractionRamGb} GB (2MB/node)</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>High-Interaction VMs:</span>
                <span className="text-purple-400 font-bold">{highInteractionVmsCount} Real VMs</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={highInteractionVmsCount}
                onChange={(e) => setHighInteractionVmsCount(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>RAM per High-Int VM:</span>
                <span className="text-emerald-400 font-bold">{vmRamAllocationGb} GB RAM</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="2"
                value={vmRamAllocationGb}
                onChange={(e) => setVmRamAllocationGb(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Cluster RAM</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedCapacityMetrics.totalRamRequiredGb} GB RAM</div>
              <span className="text-[10px] text-gray-500 block">Host + Honeywall + VM Allocation</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Total Monitored Decoys</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{lowInteractionDecoysCount + highInteractionVmsCount} Nodes</div>
              <span className="text-[10px] text-gray-500 block">Hybrid Low + High Fleet</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Hybrid TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedCapacityMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Hypervisor + Honeywall Hardware</span>
            </div>
          </div>
        </section>

        {/* STUDIO 4: REGIONAL SOC TABLETOP DRILL */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">06.</span> Studio 4: Regional West Bengal SOC Tabletop Defense Drills
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Collaborative regional response scenarios authored by Sukanta Hui and the student cyber engineering team.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono self-start sm:self-auto">
              WB Defense Lab
            </span>
          </div>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(regionalDrills).map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDrillId(d.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  activeDrillId === d.id
                    ? "bg-sky-600/20 text-sky-300 border-sky-500/60"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200"
                )}
              >
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Architecture: {currentDrill.architecture}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                CERT-In Compliant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Threat Vector:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Tactical Deception Execution:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.solution}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-400 font-bold uppercase tracking-wider block">🏆 Tactical Drill Outcome:</span>
              <p className="text-emerald-200 leading-relaxed">{currentDrill.outcome}</p>
            </div>
          </div>

          {/* Student Mini Checklist */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-sky-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Low-Interaction honeypots (Cowrie, Dionaea, Conpot) emulate services with 0% risk of host compromise.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>High-Interaction honeypots run real operating systems, capturing zero-day kernel rootkits and live human TTPs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Medium-Interaction honeypots (Glastopf) emulate web application logic and SQL injection responses.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>High-Interaction honeypots require Honeywalls with strict egress filtering to prevent attacker pivots.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>eBPF and hypervisor introspection record attacker keystrokes invisibly without in-guest agents.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all honeypot telemetry synchronized with NPL India NTP servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Low vs High-Interaction Honeypots FAQs"
            subtitle="30 In-depth Practice Questions &amp; Deception Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Types of Honeypots (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 9 establishes the fundamental engineering trade-offs between Low-Interaction and High-Interaction deception systems! Deploy Low-Interaction honeypots (like Cowrie for SSH and Conpot for SCADA) across hundreds of internal subnets to create zero-risk, high-density early warning tripwires. When you need deep threat intelligence on sophisticated APT actors and zero-day kernel rootkits, deploy High-Interaction virtual machines; however, never deploy High-Interaction systems without a Honeywall enforcing strict egress containment and automated snapshot rollback! In Topic 10, we will explore Honeynets and Production vs Research Honeypots!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic9;
