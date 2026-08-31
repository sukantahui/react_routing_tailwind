import React, { useState, useEffect, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import totpEnginePy from "./topic4_files/totp_hotp_generator.py?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgClockId = useId();
  const svgTruncateId = useId();

  // =========================================================================
  // STUDIO 1: LIVE REAL-TIME TOTP GENERATOR & TRUNCATION VISUALIZER
  // =========================================================================
  const [secondsRemaining, setSecondsRemaining] = useState(24);
  const [activeCode, setActiveCode] = useState("849201");
  const [activeCounter, setActiveCounter] = useState(57392104);
  const [activeOffset, setActiveOffset] = useState(7);
  const [activeDigestSnippet, setActiveDigestSnippet] = useState("3a7f9b2c01e4d8f5");

  // Simulated live 30s countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Generate new simulated code
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          const newCounter = activeCounter + 1;
          const newOffset = Math.floor(Math.random() * 16);
          setActiveCode(newCode);
          setActiveCounter(newCounter);
          setActiveOffset(newOffset);
          setActiveDigestSnippet(Math.random().toString(16).substring(2, 18));
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeCounter]);

  // =========================================================================
  // STUDIO 2: CLOCK DRIFT & TOLERANCE WINDOW SIMULATOR
  // =========================================================================
  const [clockDriftSeconds, setClockDriftSeconds] = useState(0); // -60 to +60 seconds
  const [toleranceSteps, setToleranceSteps] = useState(1); // +/- 1 step (30s)

  const driftAssessment = useMemo(() => {
    const timeStep = 30;
    const clientCounterOffset = Math.floor(clockDriftSeconds / timeStep);
    const isAccepted = Math.abs(clientCounterOffset) <= toleranceSteps;

    let verdict = "";
    let badgeColor = "";

    if (isAccepted) {
      verdict = "ACCEPTED ✔: Drift is within server tolerance window (W = ±" + toleranceSteps * timeStep + "s).";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else {
      verdict = "REJECTED ❌: Clock drift (" + clockDriftSeconds + "s) exceeds tolerance window. User rejected!";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    }

    return { clientCounterOffset, isAccepted, verdict, badgeColor };
  }, [clockDriftSeconds, toleranceSteps]);

  // =========================================================================
  // STUDIO 3: HOTP COUNTER DESYNCHRONIZATION SANDBOX
  // =========================================================================
  const [clientHotpCounter, setClientHotpCounter] = useState(12);
  const [serverHotpCounter, setServerHotpCounter] = useState(8);
  const [lookAheadWindow, setLookAheadWindow] = useState(10);

  const hotpSyncState = useMemo(() => {
    const diff = clientHotpCounter - serverHotpCounter;
    let status = "";
    let color = "";

    if (diff === 0) {
      status = "SYNCHRONIZED (Counters Match)";
      color = "bg-emerald-950 text-emerald-300 border-emerald-700";
    } else if (diff > 0 && diff <= lookAheadWindow) {
      status = "DESYNCHRONIZED (Recoverable via Look-Ahead: +" + diff + " steps)";
      color = "bg-amber-950 text-amber-300 border-amber-700";
    } else if (diff > lookAheadWindow) {
      status = "PERMANENTLY DESYNCHRONIZED (Exceeds Look-Ahead Window: +" + diff + " steps)";
      color = "bg-rose-950 text-rose-300 border-rose-700";
    } else {
      status = "SERVER AHEAD (Replay / Counter Rollback Detected)";
      color = "bg-rose-950 text-rose-300 border-rose-700";
    }

    return { diff, status, color };
  }, [clientHotpCounter, serverHotpCounter, lookAheadWindow]);

  const advanceClientCounter = () => {
    setClientHotpCounter((prev) => prev + 1);
  };

  const simulateSuccessfulLogin = () => {
    if (clientHotpCounter >= serverHotpCounter && clientHotpCounter - serverHotpCounter <= lookAheadWindow) {
      setServerHotpCounter(clientHotpCounter);
    }
  };

  // =========================================================================
  // STUDIO 4: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_ntp");

  const regionalDrills = {
    barrackpore_ntp: {
      id: "barrackpore_ntp",
      title: "Barrackpore Municipal Treasury: NTP Drift Resolution",
      location: "Municipal financial authorization portal with 350 active accounting staff",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "At month-end salary processing, 42 municipal accountants reported that their Google Authenticator 6-digit codes were rejected, bringing payroll authorization to a standstill.",
      solution:
        "Forensic root-cause analysis revealed that the local FreeRADIUS authentication server had lost NTP sync, drifting 48 seconds ahead of UTC. Configured redundant Chrony NTP servers and automated time drift alarms.",
      outcome:
        "Server time locked within 2 milliseconds of Indian Standard Time (IST); 100% login success rate restored immediately."
    },
    kolkata_fintech_replay: {
      id: "kolkata_fintech_replay",
      title: "Salt Lake Sector V FinTech: TOTP Replay Attack Defense",
      location: "Merchant settlement API handling ₹12,00,00,000 daily disbursements",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Adversaries sniffing unencrypted Wi-Fi in local cafes captured valid TOTP codes submitted by merchant clerks and replayed them 12 seconds later to authorize secondary fund transfers.",
      solution:
        "Engineered Redis atomic counter locks with 60-second TTL: when a code matching time counter T is consumed, any secondary submission with identical counter is rejected instantly.",
      outcome:
        "Zero unauthorized transfer replays; 100% single-use enforcement certified under PCI-DSS 4.0 standards."
    },
    ichapur_hotp_hardware: {
      id: "ichapur_hotp_hardware",
      title: "Ichapur Ordnance Facility: Hardware HOTP Token Deployment",
      location: "Air-gapped high-security manufacturing cells with zero cellular reception",
      engineers: "Abhronila (Chief Security Officer) & Hardware Engineers",
      threatScenario:
        "Staff in shielded subterranean bunkers could not receive SMS or push notifications, requiring offline physical key fobs resistant to counter desynchronization.",
      solution:
        "Deployed OATH HOTP hardware key fobs with a calibrated look-ahead window of s = 20 and server-side rate-limiting after 3 consecutive failures.",
      outcome:
        "100% reliable offline authentication in shielded facilities; zero desynchronization lockouts reported over 24 months."
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
                  Module 005_005 • Topic 4
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                Time-based One-Time Passwords (TOTP) &amp; HMAC-based OTP (HOTP)
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
            Time-based One-Time Passwords (RFC 6238) and HMAC-based OTPs (RFC 4226) power the global standard for offline, app-based 2FA.
            Explore the mathematics of <strong>HMAC-SHA1</strong> and <strong>Dynamic Truncation (DT)</strong>, master 
            <strong>Base32 secret encoding</strong>, simulate <strong>Clock Drift tolerance windows</strong>, and examine 
            atomic replay protection and <strong>HOTP look-ahead resynchronization</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: LIVE REAL-TIME TOTP GENERATOR & TRUNCATION ENGINE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⏱️</span> Studio 1: Live Real-Time TOTP Generator &amp; Dynamic Truncation Engine
              </h2>
              <p className="text-xs text-slate-400">
                Observe the live 30-second time-step cycle and how RFC 6238 extracts a 6-digit integer from a 20-byte HMAC-SHA1 digest.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Time-Step Countdown:</span>
              <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-700 rounded-full font-mono text-xs font-bold">
                {secondsRemaining}s remaining
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Live Authenticator Display Card */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between items-center text-center space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Google Authenticator Profile</span>
                <div className="text-sm font-bold text-white">Barrackpore Treasury: Susmita</div>
              </div>

              {/* 6-Digit Display */}
              <div className="bg-slate-900 px-6 py-4 rounded-2xl border border-cyan-500/50 shadow-lg shadow-cyan-950/50 space-y-1">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-cyan-300 tracking-wider">
                  {activeCode.slice(0, 3)} {activeCode.slice(3)}
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${(secondsRemaining / 30) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                Time Counter: <span className="text-cyan-400">{activeCounter}</span> (Epoch / 30)
              </div>
            </div>

            {/* Truncation Step-by-Step Anatomy */}
            <div className="md:col-span-2 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                  RFC 4226 / 6238 Dynamic Truncation (DT) Breakdown
                </span>
                <span className="text-cyan-400 font-mono text-[10px]">Algorithm: HMAC-SHA1</span>
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span>1. 20-Byte HMAC Digest:</span>
                  <span className="font-mono text-slate-400 text-[10px]">{activeDigestSnippet}... (160 bits)</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span>2. Dynamic Offset ($HS[19] \ \& \ 0x0F$):</span>
                  <span className="font-mono text-cyan-300 font-bold">Offset = {activeOffset} (0 to 15)</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span>3. 4-Byte Extraction ($HS[Offset : Offset+4]$):</span>
                  <span className="font-mono text-indigo-300 font-bold">4 Bytes Extracted</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
                  <span>4. Mask MSB ($Binary \ \& \ 0x7FFFFFFF$):</span>
                  <span className="font-mono text-purple-300">Positive 31-bit Integer</span>
                </div>
                <div className="p-2.5 bg-cyan-950/40 rounded-lg border border-cyan-800/80 flex items-center justify-between font-bold">
                  <span className="text-cyan-300">5. Modulo Reduction ($Binary \pmod{10^6}$):</span>
                  <span className="font-mono text-white text-sm tracking-wider">{activeCode}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: CLOCK DRIFT & TOLERANCE WINDOW SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🕰️</span> Studio 2: Clock Drift &amp; Server Tolerance Window Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Simulate client mobile phone clock inaccuracies and observe how the server's tolerance window ($W = \pm 1$ step) accepts or rejects codes.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", driftAssessment.badgeColor)}>
              {driftAssessment.isAccepted ? "VALIDATION SUCCESS" : "VALIDATION FAILED"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Client Mobile Phone Clock Drift:</span>
                  <span className="font-mono text-cyan-400">
                    {clockDriftSeconds > 0 ? `+${clockDriftSeconds}s (Fast)` : clockDriftSeconds < 0 ? `${clockDriftSeconds}s (Slow)` : "0s (Perfect UTC Sync)"}
                  </span>
                </div>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  step="5"
                  value={clockDriftSeconds}
                  onChange={(e) => setClockDriftSeconds(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-60s (Slow)</span>
                  <span>-30s (Step -1)</span>
                  <span>0s</span>
                  <span>+30s (Step +1)</span>
                  <span>+60s (Fast)</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-300 font-semibold">Server Tolerance Setting:</span>
                <span className="font-mono text-cyan-400 font-bold">W = ±1 Step (±30s Window)</span>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Server Authentication Verification Result
                </span>
                <div className={clsx("p-3.5 rounded-lg border text-xs md:text-sm font-semibold", driftAssessment.badgeColor)}>
                  {driftAssessment.verdict}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  When a client clock drifts by more than $\pm 30 seconds$, the generated time counter advances to $T \pm 2$, 
                  causing legitimate authentication requests to fail completely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: HOTP DESYNCHRONIZATION & LOOK-AHEAD SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔄</span> Studio 3: HOTP Counter Desynchronization &amp; Resync Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Simulate physical key fob button presses offline and observe how the server uses a Look-Ahead Window ($s=10$) to catch up.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", hotpSyncState.color)}>
              {hotpSyncState.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Client Hardware Key Fob */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Physical Hardware Token (Key Fob)
              </span>
              <div className="text-2xl font-bold font-mono text-cyan-300">
                Counter $C_client = {clientHotpCounter}$
              </div>
              <button
                onClick={advanceClientCounter}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition-colors"
              >
                Press Token Button (Advance $C$) 🔘
              </button>
            </div>

            {/* Server Verification State */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Authentication Server State
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-300">
                Counter $C_server = {serverHotpCounter}$
              </div>
              <button
                onClick={simulateSuccessfulLogin}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors"
              >
                Submit Code &amp; Resync 🚀
              </button>
            </div>

            {/* Look-Ahead Config & Math */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-white">Look-Ahead Parameter ($s$):</span>
                <span className="font-mono text-cyan-400 font-bold">{lookAheadWindow} steps</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Server checks candidate counters from $C_server+1$ to $C_server+{lookAheadWindow}$.
                Current Counter Gap: <strong className="text-white font-mono">{hotpSyncState.diff} steps</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 4: REGIONAL SOC DRILLS */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 4: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Forensic investigation of clock drift, replay attacks, and offline tokens in regional enterprise operations.
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
                  {key === "barrackpore_ntp" ? "Barrackpore NTP Drift" : key === "kolkata_fintech_replay" ? "Kolkata FinTech Replay" : "Ichapur Hardware Tokens"}
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
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Incident Failure Vector</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Cryptographic Remediation</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Operational Outcome</span>
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
                <span><strong>Omitting Atomic Replay Prevention:</strong> Allowing the same valid TOTP code to be re-submitted multiple times within the 30-second window.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Server NTP Synchronization:</strong> Unsynchronized server clocks drift outside the tolerance window, causing total login failures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Storing Plaintext Base32 Secrets in Database:</strong> Stolen database dumps allow adversaries to clone all user authenticators offline.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Cryptographic Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Use Constant-Time Comparison:</strong> Prevent nanosecond side-channel timing attacks by verifying codes with `crypto.timingSafeEqual()`.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Encrypt TOTP Secrets with KMS/HSM:</strong> Protect Base32 seed keys at rest using envelope encryption (AES-256-GCM).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Strict Replay Cache (Redis):</strong> Mark validated counter steps as consumed with a 60-second TTL to guarantee single-use.</span>
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
                Why does TOTP need no internet connection on your phone? Because both your phone and the server share the exact same Base32 secret key and compute HMAC-SHA1 using the same Unix epoch time counter ($T = \lfloor time/30 \rfloor$)!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>HOTP Formula: $HOTP(K, C) = Truncate(HMAC-SHA1(K, C)) \pmod{10^d}$.</li>
                <li>TOTP Formula: $TOTP(K, T) = HOTP(K, \lfloor time/30 \rfloor)$.</li>
                <li>Dynamic Truncation uses low 4 bits of last byte as offset (0 to 15).</li>
                <li>Tolerance Window ($W = \pm 1$ step) prevents clock drift lockouts.</li>
                <li>Atomic Redis cache prevents 30-second window code replay attacks.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on RFC 6238 TOTP &amp; RFC 4226 HOTP Generator Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script implementing HMAC-SHA1 hashing, Dynamic Truncation, tolerance windows, and atomic replay guards
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={totpEnginePy}
            title="totp_hotp_generator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="TOTP &amp; HOTP Cryptographic FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the mathematical difference between HOTP (RFC 4226, event counter C) and TOTP (RFC 6238, time counter T = floor(Epoch/30)). Write out the 5 steps of Dynamic Truncation (DT) including the offset extraction (HS[19] & 0x0F) and MSB masking (& 0x7FFFFFFF). Explain how servers handle clock drift with tolerance windows (W = ±1) and how atomic caches stop replay attacks within the 30-second window."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: TOTP & HOTP Cryptography Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 4 Note"
            downloadFileName="topic4_totp_hotp_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
