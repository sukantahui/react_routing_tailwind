import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import simSwapPy from "./topic5_files/sim_swap_ss7_analyzer.py?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgSs7Id = useId();
  const svgSimId = useId();

  // =========================================================================
  // STUDIO 1: SS7 SIGNALING PROTOCOL INTERCEPTION SIMULATOR
  // =========================================================================
  const [ss7Step, setSs7Step] = useState(1);

  const ss7FlowSteps = [
    {
      step: 1,
      sender: "Adversary Terminal",
      receiver: "Home Location Register (HLR)",
      packet: "MAP_SEND_ROUTING_INFO_FOR_SM (SRI_SM)",
      desc: "Attacker queries victim's phone number (+91 98300 12345) over international SS7 signaling hub."
    },
    {
      step: 2,
      sender: "Victim HLR",
      receiver: "Adversary Terminal",
      packet: "SRI_SM Response (IMSI Leaked)",
      desc: "HLR leaks victim's internal IMSI (404450123456789) and serving MSC gateway address."
    },
    {
      step: 3,
      sender: "Adversary Terminal",
      receiver: "Victim HLR",
      packet: "MAP_UPDATE_LOCATION (Spoofed Roaming)",
      desc: "Attacker falsely claims subscriber has roamed to attacker's foreign rogue MSC."
    },
    {
      step: 4,
      sender: "Bank SMS Gateway",
      receiver: "Adversary Rogue MSC",
      packet: "MT-ForwardSM (Cleartext SMS OTP)",
      desc: "Bank sends 6-digit OTP; network routes SMS directly to attacker's terminal in cleartext!"
    }
  ];

  const currentSs7 = ss7FlowSteps[ss7Step - 1] || ss7FlowSteps[0];

  // =========================================================================
  // STUDIO 2: SIM SWAP TIMELINE & CARRIER API VERIFIER
  // =========================================================================
  const [simAgeHours, setSimAgeHours] = useState(2.5); // Hours since SIM card was replaced
  const [txAmount, setTxAmount] = useState(450000); // Transaction amount in INR

  const simSwapAssessment = useMemo(() => {
    const isRecentSwap = simAgeHours < 48.0;

    let verdict = "";
    let action = "";
    let badgeColor = "";

    if (isRecentSwap) {
      verdict = "HIGH FRAUD RISK: RECENT SIM SWAP DETECTED 🚨";
      action = `Carrier API Alert: SIM card changed ${simAgeHours}h ago (< 48h safety window). Transaction of ₹${txAmount.toLocaleString('en-IN')} BLOCKED and account temporarily frozen.`;
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    } else {
      verdict = "SIM INTEGRITY VERIFIED ✔";
      action = `SIM IMSI is stable (${simAgeHours} hours old). Carrier API permits SMS OTP dispatch for transaction of ₹${txAmount.toLocaleString('en-IN')}.`;
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    }

    return { isRecentSwap, verdict, action, badgeColor };
  }, [simAgeHours, txAmount]);

  // =========================================================================
  // STUDIO 3: AUTHENTICATION CHANNEL SECURITY MATRIX
  // =========================================================================
  const channels = [
    {
      name: "SMS OTP",
      simSwap: "VULNERABLE ❌",
      ss7Interception: "VULNERABLE ❌",
      aitmPhishing: "VULNERABLE ❌",
      malwareSniff: "VULNERABLE ❌",
      nistLevel: "RESTRICTED (Deprecated)",
      color: "border-rose-800 bg-rose-950/30"
    },
    {
      name: "Email OTP",
      simSwap: "SAFE ✔",
      ss7Interception: "SAFE ✔",
      aitmPhishing: "VULNERABLE ❌",
      malwareSniff: "VULNERABLE ❌",
      nistLevel: "RESTRICTED (Single Point)",
      color: "border-amber-800 bg-amber-950/30"
    },
    {
      name: "Software TOTP (Google Auth)",
      simSwap: "IMMUNE ✔",
      ss7Interception: "IMMUNE ✔",
      aitmPhishing: "VULNERABLE ❌",
      malwareSniff: "MODERATE RISK ⚠️",
      nistLevel: "AAL2 (Standard Enterprise)",
      color: "border-cyan-800 bg-cyan-950/30"
    },
    {
      name: "FIDO2 Hardware Key (YubiKey)",
      simSwap: "IMMUNE ✔",
      ss7Interception: "IMMUNE ✔",
      aitmPhishing: "IMMUNE (Origin Bound) 🛡️",
      malwareSniff: "IMMUNE (Hardware Secure) 🛡️",
      nistLevel: "AAL3 (Phishing Resistant)",
      color: "border-emerald-800 bg-emerald-950/30"
    }
  ];

  // =========================================================================
  // STUDIO 4: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_sim_swap");

  const regionalDrills = {
    barrackpore_sim_swap: {
      id: "barrackpore_sim_swap",
      title: "Barrackpore Retail Banking: SIM-Swap Fraud Syndicate",
      location: "Commercial bank branch serving local industrial suppliers",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Forensic Analyst)",
      threatScenario:
        "Adversaries bribed a local telecom franchise agent in Ichapur with ₹10,000 to issue duplicate SIM cards, intercepting SMS OTPs to drain ₹45,00,000 across 8 merchant accounts.",
      solution:
        "Integrated real-time telecom Carrier SIM-Swap API checking: any transaction exceeding ₹25,000 triggers an automated IMSI-age check, blocking OTPs if the SIM was changed within 48 hours.",
      outcome:
        "100% detection of subsequent SIM-swap takeover attempts; ₹32,00,000 in fraudulent transfers stopped at the perimeter."
    },
    kolkata_fintech_ss7: {
      id: "kolkata_fintech_ss7",
      title: "Salt Lake Sector V FinTech: International SS7 Interception",
      location: "Cross-border remittance gateway handling corporate executive accounts",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Nation-state actors leased foreign SS7 Global Title access to silently intercept executive SMS OTPs via forged `MAP_UPDATE_LOCATION` messages without disabling the executives' local SIM cards.",
      solution:
        "Deactivated SMS OTP entirely for executive accounts; mandated FIDO2 WebAuthn hardware security keys and deployed SS7 signaling firewalls at carrier gateways.",
      outcome:
        "Eliminated all telecommunication signaling interception risks; certified NIST AAL3 compliance across all executive portals."
    },
    ichapur_defense_sms_deprecation: {
      id: "ichapur_defense_sms_deprecation",
      title: "Ichapur Ordnance Manufacturing: Total SMS Deprecation Roadmap",
      location: "Defense contractor supplier portal with 1,200 external vendors",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Vendors operating on unencrypted 2G GSM cellular networks in remote industrial zones were vulnerable to IMSI Catcher (false cell tower) eavesdropping.",
      solution:
        "Migrated all 1,200 vendor accounts to offline app-based TOTP (RFC 6238) with hardware passkey enrollment.",
      outcome:
        "Zero dependency on insecure cellular telecom infrastructure; eliminated all over-the-air SMS interception vulnerabilities."
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
                <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 5
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                SMS/Email OTPs &amp; Vulnerabilities (SIM Swapping, SS7 Interception)
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            SMS and Email OTPs represent the most widespread yet fundamentally vulnerable authentication mechanisms in modern consumer banking.
            Analyze the telecommunication mechanics of <strong>SIM Swapping</strong>, dissect <strong>SS7 (Signaling System No. 7)</strong> location 
            spoofing and cleartext SMS interception, explore <strong>IMSI Catchers (Stingrays)</strong>, and evaluate carrier-grade 
            <strong>SIM-Swap verification APIs</strong> and NIST SP 800-63B deprecation guidelines.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: SS7 SIGNALING INTERCEPTION SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📡</span> Studio 1: SS7 Cellular Signaling Protocol Interception Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Step through the legacy SS7 MAP protocol exploitation flow allowing adversaries to silently redirect banking SMS OTPs.
              </p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((stepNum) => (
                <button
                  key={stepNum}
                  onClick={() => setSs7Step(stepNum)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    ss7Step === stepNum
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  Step {stepNum}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Step {currentSs7.step} of 4: {currentSs7.packet}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentSs7.sender} ➔ {currentSs7.receiver}
              </span>
            </div>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
              {currentSs7.desc}
            </p>

            {/* Semantic SVG Map for SS7 Flow */}
            <div className="pt-2">
              <svg
                className="w-full h-40 bg-slate-900/50 rounded-lg p-2 overflow-visible"
                viewBox="0 0 700 140"
                aria-label="SS7 Interception Map"
              >
                {/* Node 1: Attacker Terminal */}
                <g transform="translate(40, 25)">
                  <rect x="0" y="0" width="130" height="90" rx="8" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                  <text x="65" y="30" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Adversary Terminal</text>
                  <text x="65" y="55" fill="#fca5a5" fontSize="8" textAnchor="middle">Leased SS7 Gateway</text>
                  <text x="65" y="75" fill="#cbd5e1" fontSize="8" textAnchor="middle">Spoofs MAP Packets</text>
                </g>

                {/* Arrow 1 */}
                <path d="M 180 70 L 270 70" stroke={ss7Step >= 2 ? "#f59e0b" : "#475569"} strokeWidth="2" strokeDasharray={ss7Step === 1 ? "4 4" : "none"} />

                {/* Node 2: Telecom Core HLR */}
                <g transform="translate(280, 25)">
                  <rect x="0" y="0" width="130" height="90" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="65" y="30" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">Carrier HLR / VLR</text>
                  <text x="65" y="55" fill="#c7d2fe" fontSize="8" textAnchor="middle">Subscriber Registry</text>
                  <text x="65" y="75" fill="#cbd5e1" fontSize="8" textAnchor="middle">Leaks IMSI Data</text>
                </g>

                {/* Arrow 2 */}
                <path d="M 420 70 L 510 70" stroke={ss7Step >= 4 ? "#10b981" : "#475569"} strokeWidth="2" strokeDasharray={ss7Step === 3 ? "4 4" : "none"} />

                {/* Node 3: Bank SMS Gateway */}
                <g transform="translate(520, 25)">
                  <rect x="0" y="0" width="140" height="90" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="70" y="30" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">Bank SMS-C Gateway</text>
                  <text x="70" y="55" fill="#a7f3d0" fontSize="8" textAnchor="middle">Dispatches SMS OTP</text>
                  <text x="70" y="75" fill="#cbd5e1" fontSize="8" textAnchor="middle">Cleartext Delivery</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: SIM SWAP TIMELINE & CARRIER API VERIFIER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📱</span> Studio 2: Carrier-Grade SIM-Swap Detection API Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Simulate how financial transaction systems query telecom carrier APIs to detect recent SIM swaps and freeze fraudulent OTPs.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", simSwapAssessment.badgeColor)}>
              {simSwapAssessment.verdict}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Hours Elapsed Since SIM Card Replacement:</span>
                  <span className="font-mono text-amber-400">{simAgeHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="72"
                  step="0.5"
                  value={simAgeHours}
                  onChange={(e) => setSimAgeHours(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.5h (Immediate Swap)</span>
                  <span>24h</span>
                  <span>48h (Safety Threshold)</span>
                  <span>72h (Safe)</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Banking Transfer Amount:</span>
                  <span className="font-mono text-emerald-400">₹{txAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={txAmount}
                  onChange={(e) => setTxAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Carrier Fraud Engine Evaluation
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {simSwapAssessment.action}
                </p>
                <div className="text-[11px] text-slate-400">
                  <strong>Policy: </strong> In accordance with RBI and TRAI guidelines, transactions exceeding ₹25,000 require SIM-age verification. A SIM swap within 48 hours triggers automatic OTP suppression.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: AUTHENTICATION CHANNEL SECURITY MATRIX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <span>📊</span> Studio 3: Authentication Channel Security &amp; Resistance Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Comparative analysis of authentication mechanisms across telecommunication and cryptographic threat vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            {channels.map((ch, idx) => (
              <div key={idx} className={clsx("p-4 rounded-xl border space-y-3", ch.color)}>
                <div className="border-b border-slate-800 pb-2">
                  <div className="font-bold text-white text-sm">{ch.name}</div>
                  <div className="text-[10px] text-slate-400">{ch.nistLevel}</div>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">SIM Swap:</span>
                    <span className="font-bold">{ch.simSwap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SS7 Sniff:</span>
                    <span className="font-bold">{ch.ss7Interception}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">AitM Phish:</span>
                    <span className="font-bold">{ch.aitmPhishing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Malware:</span>
                    <span className="font-bold">{ch.malwareSniff}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 4: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Forensic investigation of SIM swap syndicates and international SS7 eavesdropping across regional critical infrastructure.
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
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_sim_swap" ? "Barrackpore SIM Swap" : key === "kolkata_fintech_ss7" ? "Kolkata SS7 Attack" : "Ichapur SMS Deprecation"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-amber-400 font-mono bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Attack Vector</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Remediation Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Security Outcome</span>
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
              <span>⚠️</span> Common Pitfalls &amp; Vulnerabilities
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Relying on SMS OTP for Administrative Logins:</strong> Leaves critical root accounts vulnerable to SIM swapping and international SS7 routing heists.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Carrier SIM-Swap Timestamps:</strong> Processing large fund transfers immediately after a SIM swap allows syndicates to drain accounts before victims notice service loss.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Allowing Unconditional Password Resets via Email:</strong> A single compromised mailbox grants attackers immediate access to all associated 2FA reset links.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Defensive Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Mandate FIDO2 Hardware Passkeys:</strong> Completely decouple authentication from cellular telecommunication networks and phone numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce 24-48h Cooling Off Windows:</strong> Impose strict transfer caps following any mobile phone number update on financial portals.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Integrate Real-Time Telecom APIs:</strong> Query telecom carrier registries to detect recent IMSI changes before dispatching SMS OTPs.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300">Think About:</span>
              <p className="leading-relaxed">
                Why does app-based TOTP (Google Authenticator) continue working normally even after a SIM swap? Because TOTP keys are stored directly in your phone's internal storage and calculate codes using hardware time, completely independent of your phone number!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>SMS OTP is classified as RESTRICTED under NIST SP 800-63B.</li>
                <li>SIM swapping transfers the MSISDN to an attacker-controlled IMSI.</li>
                <li>SS7 lacks mutual cryptographic authentication between global carriers.</li>
                <li>`SRI_SM` queries leak target IMSI and serving MSC addresses.</li>
                <li>Carrier SIM-Swap APIs block OTP delivery within 48h of SIM replacement.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on SIM Swap &amp; SS7 Interception Analyzer Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating SS7 signaling message traces, IMSI leakage, and carrier-grade SIM-swap fraud detection
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={simSwapPy}
            title="sim_swap_ss7_analyzer.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="SMS/Email OTPs &amp; Vulnerabilities FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Detail the exact vulnerability chain of SMS OTPs. Differentiate between MSISDN (phone number), IMSI (SIM chip ID), and IMEI (handset hardware). Explain how SS7 signaling lacks cryptographic authentication, allowing attackers to query HLRs via MAP_SEND_ROUTING_INFO_FOR_SM (SRI_SM) and spoof MAP_UPDATE_LOCATION to redirect SMS. Finally, explain why NIST SP 800-63B deprecates SMS OTP and how Carrier SIM-Swap Timestamp APIs mitigate fraud."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: SMS/Email OTP Vulnerabilities Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 5 Note"
            downloadFileName="topic5_sms_vulnerabilities_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
