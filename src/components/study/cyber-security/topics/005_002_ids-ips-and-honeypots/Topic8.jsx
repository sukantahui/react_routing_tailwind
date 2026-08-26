import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic8_files/deception_engine.py?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgGoldenAxiomId = useId();
  const svgDeceptionGridId = useId();

  // Studio 1: Active Deception Asset Selection
  const [selectedDeceptionAssetKey, setSelectedDeceptionAssetKey] = useState("canary_token");

  // Studio 2: Live Tripwire Simulator State
  const [selectedTripwireScenario, setSelectedTripwireScenario] = useState("canary_docx_open");

  // Studio 3: Performance & Sizing Calculations
  const [internalSubnetsCount, setInternalSubnetsCount] = useState(8); // 2 to 32 VLANs
  const [plantedDecoysCount, setPlantedDecoysCount] = useState(45); // 10 to 200 Decoys
  const [threatInteractionRatePerMonth, setThreatInteractionRatePerMonth] = useState(3); // 1 to 20 traps triggered/mo

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_clearing_insider");

  // Deception Assets Database for Studio 1
  const deceptionAssets = {
    decoy_servers: {
      key: "decoy_servers",
      title: "1. Decoy Servers & Network Honeypots",
      category: "Network Infrastructure Deception",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      mechanism: "Full or lightweight emulated servers (SSH, RDP, Web, SMB) running on unallocated enterprise IP addresses.",
      strategicValue: "Traps automated network scanners, lateral SMB worms, and human attackers conducting internal subnet sweeps.",
      alertConfidence: "100% True Positive. Legitimate production users have zero business reason to connect to decoy IPs."
    },
    canary_token: {
      key: "canary_token",
      title: "2. Canarytokens & Honeyfiles (Bait Documents)",
      category: "Data & File Deception",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      mechanism: "Documents (Word, Excel, PDF) embedded with invisible DNS/HTTP beacon webhooks planted on network shares.",
      strategicValue: "Detects ransomware enumeration, insider data theft, and unauthorized folder browsing the moment a file is opened.",
      alertConfidence: "100% True Positive. Generates instant webhook notifications containing the intruder's exact source IP."
    },
    ad_honey_credential: {
      key: "ad_honey_credential",
      title: "3. Active Directory Honeycredentials (Honey Accounts)",
      category: "Identity & Credential Deception",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      mechanism: "Fake Domain Administrator accounts (e.g. `svc_backup_admin`) configured with Service Principal Names (SPN).",
      strategicValue: "Instantly exposes Kerberoasting attacks, LDAP enumeration, and lateral password spraying.",
      alertConfidence: "100% True Positive. Any Kerberos ticket request (AS-REQ / TGS-REQ) for the honey account triggers immediate lockdown."
    },
    honeyports: {
      key: "honeyports",
      title: "4. Honeyports & Port Decoy Listeners",
      category: "Endpoint & Perimeter Deception",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      mechanism: "Lightweight socket daemon listening on unused high ports (e.g., TCP 2222, 7777, 8888) on production servers.",
      strategicValue: "Detects fast TCP port scanning (Nmap / Masscan) on the first probe and automatically drops the source IP.",
      alertConfidence: "100% True Positive. Production applications never connect to the closed honeyport."
    }
  };

  // Studio 2: Live Tripwire Scenarios Database
  const tripwireScenarios = {
    canary_docx_open: {
      id: "canary_docx_open",
      label: "Insider Opens Canary Honeyfile ('executive_salaries_2026.docx')",
      threatActor: "Malicious Internal Staff / Ransomware Operator",
      targetDecoy: "Honeyfile: \\\\share\\finance\\salaries_2026.docx",
      observedEvent: "HTTP / DNS Webhook Beacon Fired to Defense Server",
      verdict: "🚨 CRITICAL BREACH: Canarytoken Opened on Host 10.10.4.15!",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Canarytoken embedded inside the decoy Word document triggered an instant webhook callback the microsecond it was opened, identifying the rogue employee's workstation with zero false alarms."
    },
    honeyport_ssh_scan: {
      id: "honeyport_ssh_scan",
      label: "Attacker Port-Sweeps Decoy Honeyport 2222 on Core Switch",
      threatActor: "External Adversary / Automated Recon Worm",
      targetDecoy: "Honeyport: core-switch-01.barrackpore.gov:2222",
      observedEvent: "TCP SYN Packet Received on Inactive Port",
      verdict: "🚨 RECONNAISSANCE DETECTED: Attacker IP 198.51.100.88 Auto-Blocked!",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Honeyport listener intercepted the initial SYN probe; automated SOAR script dynamically added the attacker's IP to the firewall drop table in 12 milliseconds."
    },
    ad_kerberoast_probe: {
      id: "ad_kerberoast_probe",
      label: "Adversary Requests Kerberos Ticket for Honey SPN ('svc_treasury_adm')",
      threatActor: "Lateral APT Intruder (Kerberoasting Exploit)",
      targetDecoy: "AD Honeycredential: svc_treasury_adm (SPN: treasury/auth.local)",
      observedEvent: "Windows Security Event ID 4769 (TGS-REQ for Honey Account)",
      verdict: "🚨 ACTIVE KERBEROASTING: Host Isolated & Domain Admin Alerts Fired!",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
      explanation: "Adversary attempted to extract Kerberos password hashes for offline cracking; because the honey account is never used by legitimate systems, the attempt proved 100% malicious intent."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedDeceptionMetrics = useMemo(() => {
    // Probability of attacker hitting a trap during a 5-host lateral sweep
    const totalAssetsEstimate = internalSubnetsCount * 30 + plantedDecoysCount;
    const trapDensityPercent = ((plantedDecoysCount / totalAssetsEstimate) * 100).toFixed(1);
    const detectionProbabilityPercent = Math.min(99.9, (1 - Math.pow(1 - (plantedDecoysCount / totalAssetsEstimate), 5)) * 100).toFixed(1);

    // 5-Year Deception Grid Infrastructure TCO (INR ₹ Lakhs)
    const decoyApplianceLakhs = (plantedDecoysCount * 0.12 + 6.0).toFixed(2);
    const canaryTokenCloudLakhs = (4.5).toFixed(2);
    const fiveYearTcoLakhs = (Number(decoyApplianceLakhs) + Number(canaryTokenCloudLakhs) + 5.0).toFixed(2);

    return {
      trapDensityPercent,
      detectionProbabilityPercent,
      fiveYearTcoLakhs
    };
  }, [internalSubnetsCount, plantedDecoysCount, threatInteractionRatePerMonth]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_clearing_insider: {
      id: "saltlake_clearing_insider",
      title: "Salt Lake Sector V State Financial Clearing House Insider Breach",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      deceptionSetup: "Canarytoken Honeyfiles + Active Directory Honeycredentials",
      threatScenario: "A rogue contractor with valid internal VPN credentials attempted to steal confidential interbank settlement keys by scanning internal shares.",
      solution: "Sukanta Hui and Mamata planted Canarytoken honeyfiles (`clearing_master_keys.docx`) and created a fake Domain Admin honey-account (`svc_treasury_adm`).",
      outcome: "When the insider opened the honeyfile, an instant alert fired in 450ms; workstation isolated via EDR; zero real financial data compromised; 100% CERT-In compliance."
    },
    barrackpore_grid_deception: {
      id: "barrackpore_grid_deception",
      title: "Barrackpore Power Substation SCADA Deception Minefield",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      deceptionSetup: "Virtual IEC-104 & Modbus Decoy PLCs across Dark IP Subnets",
      threatScenario: "Adversaries deployed a custom worm designed to scan industrial control networks and trip circuit breakers.",
      solution: "Mahima, Abhronila, and Susmita populated 3 unallocated /24 VLANs with virtual Modbus honeypots running isolated sandbox listeners.",
      outcome: "The worm scanned the decoy IP space first, triggering automated firewall isolation in 1.4 seconds; zero real electrical relays disrupted; forensic telemetry archived for CERT-In."
    }
  };

  const currentAsset = deceptionAssets[selectedDeceptionAssetKey];
  const currentScenario = tripwireScenarios[selectedTripwireScenario];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 8</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Honeypots: Purpose, Value &amp; Deception Technology
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Transform passive network defense into an active cognitive minefield. Understand <strong className="text-sky-400">The Golden Honeypot Axiom</strong>, <strong className="text-emerald-400">Canarytokens &amp; Honeyfiles</strong>, <strong className="text-purple-400">Active Directory Honeycredentials</strong>, and <strong className="text-amber-400">Zero-False-Positive SOC Alerting</strong>.
          </p>
        </header>

        {/* SECTION 1: THE GOLDEN AXIOM & ASYMMETRIC DECEPTION SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The Golden Honeypot Axiom &amp; Asymmetric Deception Grid
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing how honeypots eliminate alert fatigue on the left and reverse the attacker's asymmetric advantage on the right.
            </p>
          </div>

          {/* SVG 1: THE GOLDEN AXIOM & ASYMMETRIC GAME THEORY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                The Golden Honeypot Axiom ➔ Asymmetric Game Theory Reversal
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Zero False Positives &amp; Deception Minefield</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgGoldenAxiomId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Golden Honeypot Axiom and Deception Grid Diagram"
              >
                {/* LEFT: THE GOLDEN HONEYPOT AXIOM */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE GOLDEN HONEYPOT AXIOM
                </text>

                <rect x="35" y="58" width="360" height="75" rx="6" fill="#082f49" stroke="#0284c7" />
                <text x="215" y="78" fill="#7dd3fc" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  "A Honeypot Has Zero Authorized Business Activity."
                </text>
                <text x="215" y="98" fill="#ffffff" fontSize="8" textAnchor="middle">
                  Legitimate Users: 0 | Authorized Traffic: 0 Packets
                </text>
                <text x="215" y="118" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ANY Interaction == 100% Malicious Intruder!
                </text>

                {/* COMPARISON BOX */}
                <rect x="35" y="145" width="175" height="100" rx="5" fill="#451a03" stroke="#f59e0b" />
                <text x="122" y="165" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">Production Server</text>
                <text x="122" y="185" fill="#ffffff" fontSize="7" textAnchor="middle">10,000 Real Users</text>
                <text x="122" y="202" fill="#fca5a5" fontSize="7" textAnchor="middle">High False Positive Rate</text>
                <text x="122" y="225" fill="#fde68a" fontSize="7" textAnchor="middle">Alert Fatigue in SOC</text>

                <rect x="220" y="145" width="175" height="100" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="307" y="165" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">Decoy Honeypot</text>
                <text x="307" y="185" fill="#ffffff" fontSize="7" textAnchor="middle">0 Real Users</text>
                <text x="307" y="202" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">0% FALSE POSITIVES</text>
                <text x="307" y="225" fill="#a7f3d0" fontSize="7" textAnchor="middle">100% True Positive Alert</text>

                {/* RIGHT: ASYMMETRIC DECEPTION MINEFIELD */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  REVERSING THE ATTACKER'S ADVANTAGE
                </text>

                <rect x="460" y="60" width="350" height="50" rx="5" fill="#1e1b4b" stroke="#6366f1" />
                <text x="635" y="80" fill="#c7d2fe" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Traditional Asymmetry: Attacker Advantage
                </text>
                <text x="635" y="98" fill="#e0e7ff" fontSize="7.5" textAnchor="middle">
                  Defender must protect 100% of assets; Attacker needs only 1 flaw!
                </text>

                <rect x="460" y="120" width="350" height="125" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="635" y="140" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                  Deception Asymmetry: DEFENDER ADVANTAGE
                </text>
                <text x="635" y="162" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  • 10 Real Servers + 50 Decoy Honeypots Planted
                </text>
                <text x="635" y="180" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  • Attacker has 83.3% probability of hitting a trap on first scan!
                </text>
                <text x="635" y="198" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  • A single mistake by the attacker triggers instant host isolation!
                </text>
                <text x="635" y="222" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Adversary Time Dilated &amp; Exposed in Real Time
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: DECEPTION ASSETS EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Cyber Deception Technology Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the technical mechanisms, strategic threat coverage, and 100% confidence alerting models across Decoy Servers, Canarytokens, AD Honeycredentials, and Honeyports.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentAsset.badgeColor)}>
              {currentAsset.category}
            </span>
          </div>

          {/* Asset Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(deceptionAssets).map((a) => (
              <button
                key={a.key}
                onClick={() => setSelectedDeceptionAssetKey(a.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedDeceptionAssetKey === a.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              &gt;
                {a.title}
              </button>
            ))}
          </div>

          {/* Active Asset Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentAsset.title}</h3>
                <span className="text-gray-400">Category: {currentAsset.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentAsset.badgeColor)}>
                Active Deception Asset
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                ⚙️ Technical Mechanism:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentAsset.mechanism}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  🎯 Strategic Threat Value:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentAsset.strategicValue}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-indigo-950/80 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  🛡️ Alert Confidence &amp; SOC Efficacy:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentAsset.alertConfidence}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE DECEPTION TRIPWIRE SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Cyber Deception Tripwire Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Simulate an insider opening a Canarytoken document, an attacker scanning a honeyport, or a Kerberoasting attack against a honey-administrator.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Tripwire Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="space-y-1">
            <label className="text-xs text-gray-300 font-semibold block">Select Deception Incident Scenario:</label>
            <select
              value={selectedTripwireScenario}
              onChange={(e) => setSelectedTripwireScenario(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
            &gt;
              {Object.values(tripwireScenarios).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Tripwire Incident:
                </span>
                <span className="text-white font-bold text-sm">{currentScenario.label}</span>
                <span className="text-gray-400 text-xs block">
                  Threat Actor: {currentScenario.threatActor} • Decoy: {currentScenario.targetDecoy}
                </span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentScenario.badgeColor
              )}>
                {currentScenario.verdict}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Observed Deception Forensic Signal:
              </span>
              <div className="font-mono text-xs text-purple-300 pb-1">{currentScenario.observedEvent}</div>
              <p className="text-gray-300 leading-relaxed">{currentScenario.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: DECEPTION ENGINE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Cyber Deception &amp; Honeypot Telemetry Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation processing Honeyport connections, Canarytoken webhooks, and Active Directory honeycredentials.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              deception_engine.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="deception_engine.py"
            highlightLines={[18, 30, 48, 62]}
          />
        </section>

        {/* STUDIO 3: DECEPTION GRID SIZING & ROI CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Deception Grid ROI, Alert Confidence &amp; Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate lateral tripwire density, breach detection probability, and 5-year deception infrastructure TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Deception Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Enterprise Subnets:</span>
                <span className="text-sky-400 font-bold">{internalSubnetsCount} VLANs</span>
              </div>
              <input
                type="range"
                min="2"
                max="32"
                step="2"
                value={internalSubnetsCount}
                onChange={(e) => setInternalSubnetsCount(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Planted Decoys &amp; Tokens:</span>
                <span className="text-purple-400 font-bold">{plantedDecoysCount} Decoys</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={plantedDecoysCount}
                onChange={(e) => setPlantedDecoysCount(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              /&gt;
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Simulated Monthly Probes:</span>
                <span className="text-emerald-400 font-bold">{threatInteractionRatePerMonth} Probes/Mo</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={threatInteractionRatePerMonth}
                onChange={(e) => setThreatInteractionRatePerMonth(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              /&gt;
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Subnet Trap Density</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedDeceptionMetrics.trapDensityPercent}% Decoys</div>
              <span className="text-[10px] text-gray-500 block">Of Total Network IP Space</span>
            </div>

            <div className="p-4 bg-slate-950 border border-emerald-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Lateral Breach Catch Rate</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{calculatedDeceptionMetrics.detectionProbabilityPercent}% Catch</div>
              <span className="text-[10px] text-gray-500 block">Within First 5 Lateral Probes</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Deception TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedDeceptionMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Decoy Fabric + Canary Platform</span>
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
              &gt;
                {d.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentDrill.title}</h3>
                <span className="text-gray-400">Location: {currentDrill.location} • Setup: {currentDrill.deceptionSetup}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Deception Strategy Executed:</span>
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
                <span>The Golden Honeypot Axiom: Any traffic touching a honeypot is 100% malicious (Zero False Positives).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Honeypots waste attacker time, detect lateral movement, and capture zero-day threat intelligence.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Canarytokens / Honeyfiles trigger automated DNS/HTTP webhooks when opened or accessed.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Active Directory Honeycredentials detect Kerberoasting and lateral password spraying.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Enticement is legally permitted; Entrapment involves coercing someone into committing a crime.</span>
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
            title="Honeypots &amp; Cyber Deception FAQs"
            subtitle="30 In-depth Practice Questions &amp; Deception Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Honeypots &amp; Cyber Deception (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: In Topic 8, we step into the proactive world of Cyber Deception! Never forget the Golden Honeypot Axiom: because honeypots have zero authorized production users, any connection touching a honeypot is 100% malicious by definition! Deploying Canarytoken bait files, fake Active Directory honeycredentials, and decoy honeyports reverses the attacker's asymmetric advantage: an intruder must guess right 100% of the time, while touching even a single decoy exposes their entire campaign to the SOC with zero false alarms! In Topic 9, we will dive deep into Types of Honeypots: Low-Interaction vs High-Interaction Honeypots!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic8;
