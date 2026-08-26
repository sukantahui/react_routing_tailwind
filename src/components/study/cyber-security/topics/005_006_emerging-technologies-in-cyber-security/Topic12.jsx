import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic12_files/topic12_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import autoEnginePy from "./topic12_files/autonomous_quantum_defense.py?raw";

const Topic12 = () => {
  // Unique SVG IDs
  const svgSelfHealingId = useId();
  const svgMoscaId = useId();

  // =========================================================================
  // STUDIO 1: AUTONOMOUS AI ZERO-DAY HOT-PATCH SYNTHESIZER
  // =========================================================================
  const [vulnType, setVulnType] = useState("BUFFER_OVERFLOW"); // "BUFFER_OVERFLOW", "USE_AFTER_FREE", "INTEGER_OVERFLOW"
  const [patchExecuted, setPatchExecuted] = useState(false);

  const vulnProfiles = {
    BUFFER_OVERFLOW: {
      title: "Memory Buffer Overflow (strcpy into fixed stack buffer)",
      cve: "CVE-2026-9812 (CVSS 9.8 Critical)",
      vulnerableCode: "strcpy(dest_buffer, user_input);",
      synthesizedFix: "strncpy(dest_buffer, user_input, sizeof(dest_buffer) - 1);\ndest_buffer[sizeof(dest_buffer) - 1] = '\\0';",
      synthesisTime: "240 ms",
      injectionMethod: "eBPF XDP Kernel-Level Memory Rewrite"
    },
    USE_AFTER_FREE: {
      title: "Pointer Use-After-Free in Microservice Session Cache",
      cve: "CVE-2026-4419 (CVSS 9.1 Critical)",
      vulnerableCode: "free(session_ptr);\nprocess_session(session_ptr);",
      synthesizedFix: "free(session_ptr);\nsession_ptr = NULL;",
      synthesisTime: "195 ms",
      injectionMethod: "Live User-Space Shared Library Hooking"
    },
    INTEGER_OVERFLOW: {
      title: "Integer Overflow in Wire Transfer Amount Calculation",
      cve: "CVE-2026-7730 (CVSS 8.8 High)",
      vulnerableCode: "total = current_balance + incoming_transfer;",
      synthesizedFix: "if (incoming_transfer > UINT64_MAX - current_balance) return ERR_OVERFLOW;\ntotal = current_balance + incoming_transfer;",
      synthesisTime: "310 ms",
      injectionMethod: "eBPF Instruction Rewrite at NIC Layer"
    }
  };

  const currentVuln = vulnProfiles[vulnType];

  // =========================================================================
  // STUDIO 2: CBOM & MOSCA'S THEOREM QUANTUM RISK CALCULATOR
  // =========================================================================
  const [shelfLifeX, setShelfLifeX] = useState(15); // Years (0 to 30)
  const [migrationTimeY, setMigrationTimeY] = useState(5); // Years (1 to 10)
  const [crqcArrivalZ, setCrqcArrivalZ] = useState(10); // Years (1 to 20)

  const moscaAssessment = useMemo(() => {
    const sumXY = shelfLifeX + migrationTimeY;
    const isPeril = sumXY > crqcArrivalZ;
    const delta = sumXY - crqcArrivalZ;

    let verdict = "";
    let badgeColor = "";
    let explanation = "";

    if (isPeril) {
      verdict = `CRITICAL QUANTUM PERIL 🚨 (${delta}-Year HNDL Window)`;
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      explanation = `Mosca's Inequality is violated ($${shelfLifeX} + ${migrationTimeY} = ${sumXY} > ${crqcArrivalZ}$). Adversaries harvesting encrypted data today can decrypt it in Year ${crqcArrivalZ}, compromising secrets while they still require active secrecy for another ${delta} years!`;
    } else {
      verdict = "QUANTUM RESILIENT ✔ (Safe Migration Window)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      explanation = `Mosca's Inequality is satisfied ($${shelfLifeX} + ${migrationTimeY} = ${sumXY} \\le ${crqcArrivalZ}$). Enterprise PQC migration will be completed before a cryptanalytically relevant quantum computer arrives.`;
    }

    return { sumXY, isPeril, delta, verdict, badgeColor, explanation };
  }, [shelfLifeX, migrationTimeY, crqcArrivalZ]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_ebpf_hotpatch");

  const regionalDrills = {
    barrackpore_ebpf_hotpatch: {
      id: "barrackpore_ebpf_hotpatch",
      title: "Barrackpore Municipal Treasury: Sub-Second Autonomous Hot-Patching",
      location: "Municipal financial disbursement API server farm managing ₹85,00,000 daily",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Zero-day remote code execution probe targeted municipal wire authorization microservices at 02:14 AM.",
      solution:
        "Deployed DARPA CGC-inspired autonomous defense engine with eBPF XDP live kernel patch synthesis.",
      outcome:
        "Synthesized AST memory bounds check and injected hot-patch in 280 milliseconds; 0.00s server downtime."
    },
    kolkata_fintech_cbom_audit: {
      id: "kolkata_fintech_cbom_audit",
      title: "Salt Lake Sector V FinTech: Enterprise CBOM & Mosca Quantum Audit",
      location: "Cloud payments switch maintaining 1,400 production Git repositories",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Audit revealed 12,000 legacy RSA-2048 keys and certificates vulnerable to 'Harvest Now, Decrypt Later'.",
      solution:
        "Automated Cryptographic Bill of Materials (CBOM) scanning with automated ML-KEM / ML-DSA code refactoring.",
      outcome:
        "Closed a 6-year Mosca HNDL exposure window; achieved 100% post-quantum compliance 4 years ahead of mandates."
    },
    ichapur_defense_moving_target: {
      id: "ichapur_defense_moving_target",
      title: "Ichapur Ordnance Manufacturing: Moving Target Defense & Honeynet Swarm",
      location: "Defense manufacturing telemetry and CAD engineering compute clusters",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Foreign APT automated reconnaissance bots mapped internal IP subnets to prepare spear-phishing attacks.",
      solution:
        "Deployed Moving Target Defense (MTD) rotating internal container IPs every 60 seconds and spawning dynamic honeypots.",
      outcome:
        "APT reconnaissance data invalidated every 60s; 14 adversary scanners trapped in deception honeypots."
    }
  };

  const currentDrill = regionalDrills[activeDrillKey];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ========================================================================= */}
        {/* HEADER SECTION */}
        {/* ========================================================================= */}
        <header className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 12
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Future Outlook: Autonomous Cyber Defense &amp; Quantum Resilience
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            As machine-speed AI attacks and quantum computing approach reality, cybersecurity must transform into a 
            fully autonomous, mathematically resilient science.
            Explore <strong>Autonomous Cyber Defense (DARPA Cyber Grand Challenge)</strong> with sub-second genetic patch synthesis, 
            master <strong>eBPF live kernel hot-patching with 0.00s downtime</strong>, evaluate 
            <strong>Cryptographic Bill of Materials (CBOM)</strong> discovery, and analyze 
            <strong>Mosca's Theorem ($X+Y&gt;Z$)</strong> to eliminate "Harvest Now, Decrypt Later" risks.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: AUTONOMOUS AI ZERO-DAY HOT-PATCH SYNTHESIZER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🤖</span> Studio 1: Autonomous AI Vulnerability Repair &amp; eBPF Hot-Patch Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Select a vulnerability type to simulate machine-speed symbolic root cause analysis, AST genetic patch synthesis, and live kernel injection.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", patchExecuted ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-slate-800 text-slate-400 border-slate-700")}>
              {patchExecuted ? "AUTONOMOUS HOT-PATCH DEPLOYED ✔ (0.00s Downtime)" : "AWAITING SYNTHESIS TRIGGER"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Discovered Zero-Day Vulnerability
              </span>

              <div className="flex gap-2">
                {Object.keys(vulnProfiles).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setVulnType(key);
                      setPatchExecuted(false);
                    }}
                    className={clsx(
                      "flex-1 py-1.5 rounded-lg text-[11px] font-bold border transition-all duration-200",
                      vulnType === key
                        ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950 border-cyan-500"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    )}
                  >
                    {key.replace("_", " ")}
                  </button>
                ))}
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                  <span className="text-rose-400 font-bold">{currentVuln.cve}</span>
                  <span className="text-slate-500 text-[10px]">Symbolic Analysis</span>
                </div>
                <div className="text-slate-300">{currentVuln.title}</div>
                <div className="p-2 bg-slate-950 rounded text-rose-300 border border-rose-900/50 overflow-x-auto">
                  <code>{currentVuln.vulnerableCode}</code>
                </div>
              </div>

              <button
                onClick={() => setPatchExecuted(true)}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg shadow-cyan-950 transition-all duration-200"
              >
                Synthesize &amp; Hot-Deploy AI Patch ⚡
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Autonomous Remediation Telemetry
                </span>

                {patchExecuted ? (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-emerald-800/60 font-mono text-[11px] space-y-1">
                      <div className="flex justify-between text-emerald-400 font-bold">
                        <span>Synthesis Time: {currentVuln.synthesisTime}</span>
                        <span>Downtime: 0.00s</span>
                      </div>
                      <div className="text-cyan-300 text-[10px]">Method: {currentVuln.injectionMethod}</div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1 overflow-x-auto">
                      <div className="text-[10px] text-slate-500 uppercase font-sans">Synthesized Memory-Safe AST Replacement:</div>
                      <pre className="text-emerald-300 whitespace-pre-wrap">{currentVuln.synthesizedFix}</pre>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-900/40 rounded-lg border border-slate-800 text-slate-500 text-center py-8">
                    Click 'Synthesize &amp; Hot-Deploy AI Patch' to watch sub-second closed-loop repair.
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Zero-Downtime Guarantee: </strong> eBPF live memory rewrites hook execution pointers directly inside running processes without restarting containers or dropping active TCP sockets!
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: CBOM & MOSCA'S THEOREM QUANTUM RISK CALCULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⏳</span> Studio 2: Cryptographic Bill of Materials (CBOM) &amp; Mosca's Quantum Risk Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Adjust the three Mosca variables ($X$, $Y$, $Z$) to calculate enterprise "Harvest Now, Decrypt Later" exposure windows.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", moscaAssessment.badgeColor)}>
              {moscaAssessment.verdict}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Mosca's Inequality Parameters ($X + Y &gt; Z$)
              </span>

              {/* Slider X */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Data Secrecy Shelf Life ($X$):</span>
                  <span className="font-mono text-cyan-400 font-bold">{shelfLifeX} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={shelfLifeX}
                  onChange={(e) => setShelfLifeX(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <span className="text-[10px] text-slate-500">Duration intercepted data remains confidential (Banking: 15-20 yrs, Defense: 30 yrs).</span>
              </div>

              {/* Slider Y */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Enterprise PQC Migration Time ($Y$):</span>
                  <span className="font-mono text-amber-400 font-bold">{migrationTimeY} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={migrationTimeY}
                  onChange={(e) => setMigrationTimeY(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <span className="text-[10px] text-slate-500">Time required to inventory CBOM and deploy NIST FIPS 203/204 across all systems.</span>
              </div>

              {/* Slider Z */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>CRQC Quantum Computer Arrival ($Z$):</span>
                  <span className="font-mono text-purple-400 font-bold">{crqcArrivalZ} Years</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  value={crqcArrivalZ}
                  onChange={(e) => setCrqcArrivalZ(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-[10px] text-slate-500">Estimated years until a 4,100-logical qubit quantum computer cracks RSA-2048.</span>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Total Vulnerability Horizon (X + Y)</span>
                    <span className="font-mono font-bold text-white text-lg">{moscaAssessment.sumXY} Years</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">CRQC Arrival (Z)</span>
                    <span className="font-mono font-bold text-purple-400 text-lg">{crqcArrivalZ} Years</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  {moscaAssessment.explanation}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Harvest Now, Decrypt Later (HNDL): </strong> If $X + Y &gt; Z$, data is already compromised today because attackers are archiving current encrypted network traffic to crack once $Z$ is reached!
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 3: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Case studies of autonomous eBPF kernel patching, enterprise CBOM audits, and moving target defense honeynets.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(regionalDrills).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDrillKey(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    activeDrillKey === key
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_ebpf_hotpatch" ? "Barrackpore eBPF Hot-Patch" : key === "kolkata_fintech_cbom_audit" ? "Kolkata CBOM Audit" : "Ichapur Moving Target"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Scenario</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Resilience Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Measurable Outcome</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMON PITFALLS & BEST PRACTICES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls &amp; Mistakes
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Waiting for CRQC Arrival Before Migrating:</strong> Harvest Now, Decrypt Later means data is being stolen today; migration must occur immediately.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Deploying Unverified AI Patches:</strong> Hot-patching without formal regression sandboxes can introduce severe functional outages in production.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Neglecting Cryptographic Bill of Materials (CBOM):</strong> Attempting PQC migration without a machine-readable CBOM leaves hidden RSA dependencies active.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Future Resilience Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Automate Continuous CBOM Audits:</strong> Scan CI/CD pipelines to block commits that introduce non-post-quantum cryptographic libraries.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement eBPF Live Kernel Hot-Patching:</strong> Neutralize zero-day vulnerabilities in sub-seconds without server reboots or socket drops.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Moving Target Defense (MTD):</strong> Dynamically rotate IP addresses and rebuild ephemeral container pods every 15 minutes.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Think About:</span>
              <p className="leading-relaxed">
                Why does Mosca's Theorem mandate immediate PQC migration even if quantum computers are 10 years away? Because if your data must stay secret for 15 years ($X=15$) and your migration takes 5 years ($Y=5$), $15 + 5 = 20 &gt; 10$! Adversaries archiving traffic today will decrypt your secrets 10 years before their shelf life expires!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>DARPA Cyber Grand Challenge proved autonomous discovery and hot-patching.</li>
                <li>eBPF enables zero-downtime kernel-level patch injection in sub-seconds.</li>
                <li>Cryptographic Bill of Materials (CBOM) inventories all crypto assets.</li>
                <li>Mosca's Theorem ($X+Y&gt;Z$) measures HNDL quantum peril windows.</li>
                <li>Moving Target Defense (MTD) randomizes attack surfaces continuously.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Autonomous Cyber Defense &amp; Quantum Resilience Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating automated patch synthesis, CBOM discovery, and Mosca's theorem risk calculation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={autoEnginePy}
            title="autonomous_quantum_defense.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Autonomous Cyber Defense &amp; Quantum Resilience FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the concepts of Autonomous Cyber Defense (DARPA Cyber Grand Challenge milestones: automated discovery, genetic patch synthesis, and zero-downtime hot-patching via eBPF). Detail the Cryptographic Bill of Materials (CBOM) and explain Mosca's Theorem of Quantum Risk ($X + Y > Z$) with a numerical calculation demonstrating the 'Harvest Now, Decrypt Later' (HNDL) peril window. Describe Moving Target Defense (MTD) and multi-agent AI co-evolution."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 12: Autonomous Defense & Quantum Resilience Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 12 Note"
            downloadFileName="topic12_autonomous_resilience_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic12;
