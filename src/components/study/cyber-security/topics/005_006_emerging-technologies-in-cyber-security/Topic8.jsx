import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import qkdEnginePy from "./topic8_files/qkd_bb84_simulator.py?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgPolarizationId = useId();
  const svgQkdPipelineId = useId();

  // =========================================================================
  // STUDIO 1: BB84 PHOTON TRANSMISSION & EAVESDROPPING SANDBOX
  // =========================================================================
  const [eveInterceptionPct, setEveInterceptionPct] = useState(0); // 0% to 100%

  const qkdSimulation = useMemo(() => {
    // Baseline optical noise ~1.5%
    // Eve induces 25% error on intercepted photons: QBER = 1.5 + (evePct / 100) * 25.0
    const baselineNoise = 1.5;
    const inducedError = (eveInterceptionPct / 100.0) * 25.0;
    const measuredQber = Math.min(baselineNoise + inducedError, 26.5).toFixed(1);
    const isAborted = parseFloat(measuredQber) > 11.0;

    let verdict = "";
    let badgeColor = "";
    let explanation = "";

    if (isAborted) {
      verdict = "QKD EXCHANGE ABORTED 🚨 (Eavesdropper / Eve Detected!)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      explanation = `Quantum Bit Error Rate (${measuredQber}%) exceeded the 11.0% Shor-Preskill security bound. Eve's intercept-resend measurements collapsed photon states, permanently altering polarizations!`;
    } else {
      verdict = "QKD KEY ESTABLISHED SECURELY ✔ (Unconditional Secrecy)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      explanation = `QBER (${measuredQber}%) is within normal optical fiber thermal limits ($\le 11.0\%$). Error correction (Cascade) and privacy amplification (Toeplitz hashing) extracted a clean 256-bit symmetric key.`;
    }

    return { measuredQber, isAborted, verdict, badgeColor, explanation };
  }, [eveInterceptionPct]);

  // Sample 8-photon transmission trace
  const photonTrace = useMemo(() => {
    const aliceBits = [1, 0, 1, 1, 0, 1, 0, 0];
    const aliceBases = ["+", "x", "x", "+", "+", "x", "+", "x"];
    const bobBases = ["+", "+", "x", "x", "+", "x", "+", "+"];
    
    return aliceBits.map((bit, idx) => {
      const match = aliceBases[idx] === bobBases[idx];
      const evePerturbed = eveInterceptionPct > 50 && !match;
      return {
        id: idx + 1,
        aliceBit: bit,
        aliceBase: aliceBases[idx],
        bobBase: bobBases[idx],
        match,
        siftedBit: match ? bit : "-"
      };
    });
  }, [eveInterceptionPct]);

  // =========================================================================
  // STUDIO 2: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_kolkata_qkd");

  const regionalDrills = {
    barrackpore_kolkata_qkd: {
      id: "barrackpore_kolkata_qkd",
      title: "Barrackpore-to-Kolkata Dark Fiber QKD Link (28 km)",
      location: "Dedicated underground dark fiber connecting Barrackpore Treasury to Salt Lake Core",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Adversary attempted physical fiber splicing tap on roadside junction box to intercept municipal treasury traffic.",
      solution:
        "Deployed continuous BB84 QKD laser transceivers operating at 1550nm wavelength with single-photon APDs.",
      outcome:
        "Physical fiber tap induced immediate QBER spike from 1.8% to 26.4%, triggering auto-abort in 0.4 seconds; zero keys leaked."
    },
    kolkata_fintech_otp_vault: {
      id: "kolkata_fintech_otp_vault",
      title: "Salt Lake Sector V FinTech: One-Time Pad (OTP) Inter-Bank Settlement",
      location: "High-value RTGS remittance hub processing ₹50,00,00,000 in daily interbank clearings",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Nation-state actors deployed fiber harvesting taps to archive encrypted interbank transactions for future quantum decryption.",
      solution:
        "Paired continuous QKD key streams with Vernam One-Time Pad (OTP) encryption for interbank transactions.",
      outcome:
        "Achieved Shannon Unconditional Information-Theoretic Security; data is mathematically unbreakable by any future supercomputer."
    },
    ichapur_defense_optical_qkd: {
      id: "ichapur_defense_optical_qkd",
      title: "Ichapur Defense Facility: Free-Space Atmospheric Laser QKD",
      location: "Inter-building point-to-point line-of-sight laser interconnects (800 meters)",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Covert optical eavesdropping attempts using optical telescopes and beam-splitters across defense facility perimeter.",
      solution:
        "Deployed free-space BB84 laser transceivers with active beam tracking and Decoy State protocol modulation.",
      outcome:
        "Decoy state statistics detected 100% of optical beam-splitter interception probes; zero classified CAD designs compromised."
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
                <span className="px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 8
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Quantum Key Distribution (QKD) &amp; The BB84 Protocol
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-teal-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Quantum Key Distribution (QKD) is the only cryptographic technology whose security is guaranteed by the fundamental 
            <strong>Laws of Quantum Physics (Heisenberg Uncertainty &amp; No-Cloning Theorem)</strong> rather than mathematical unbreakability.
            Master the step-by-step mechanics of the <strong>BB84 Protocol</strong>, explore 
            <strong>Rectilinear ($+$) and Diagonal ($\times$) photon polarization</strong>, analyze 
            <strong>Quantum Bit Error Rate (QBER)</strong> detection of Eve's Intercept-Resend attacks, and examine 
            <strong>Decoy State Protocols</strong> and <strong>One-Time Pad (OTP)</strong> integration.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: BB84 TRANSMISSION & EAVESDROPPING SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔬</span> Studio 1: BB84 Quantum Channel &amp; Eve Interception Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Slide Eve's interception percentage to observe how quantum measurement collapse drives up QBER and triggers automated aborts.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", qkdSimulation.badgeColor)}>
              {qkdSimulation.verdict}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Quantum Optical Channel Controls
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Eve Intercept-Resend Eavesdropping Rate:</span>
                  <span className={clsx("font-mono font-bold text-sm", eveInterceptionPct > 0 ? "text-rose-400" : "text-emerald-400")}>
                    {eveInterceptionPct}% ({eveInterceptionPct === 0 ? "Clean Fiber ✔" : "Active Tap 🚨"})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={eveInterceptionPct}
                  onChange={(e) => setEveInterceptionPct(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0% (Clean)</span>
                  <span>45% (Threshold ~11%)</span>
                  <span>100% (Full Interception ~25% QBER)</span>
                </div>
              </div>

              {/* Live 8-Photon Transmission Table */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Sample Photon Sifting Trace (Alice ➔ Bob)</span>
                <div className="grid grid-cols-8 gap-1 text-center font-mono text-[10px]">
                  {photonTrace.map((p) => (
                    <div
                      key={p.id}
                      className={clsx(
                        "p-1.5 rounded border",
                        p.match ? "bg-emerald-950/60 border-emerald-800/80 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-600"
                      )}
                    >
                      <div className="text-[9px] text-slate-400">#{p.id}</div>
                      <div className="text-white font-bold">{p.aliceBase}</div>
                      <div className="text-teal-400">{p.bobBase}</div>
                      <div className="font-bold border-t border-slate-800 pt-0.5">{p.siftedBit}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 pt-1">
                  <span>Row 1: Alice Base</span>
                  <span>Row 2: Bob Base</span>
                  <span className="text-emerald-400">Row 3: Sifted Bit</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Measured QBER</span>
                    <span className={clsx("font-mono font-bold text-lg", qkdSimulation.isAborted ? "text-rose-400" : "text-emerald-400")}>
                      {qkdSimulation.measuredQber}%
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">Security Threshold</span>
                    <span className="font-mono font-bold text-amber-400 text-lg">11.0% Max</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  {qkdSimulation.explanation}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Physics Guarantee: </strong> Under the No-Cloning Theorem, Eve cannot copy an unknown quantum state; measuring it forces a 50% basis guess error, mathematically creating detectable 25% QBER!
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: REGIONAL SOC CASE STUDIES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 2: Regional SOC Incident Response Drills (West Bengal)
              </h2>
              <p className="text-xs text-slate-400">
                Case studies of fiber-optic QKD links, One-Time Pad interbank settlements, and atmospheric defense lasers.
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
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_kolkata_qkd" ? "Barrackpore 28km QKD" : key === "kolkata_fintech_otp_vault" ? "Kolkata OTP Settlement" : "Ichapur Laser QKD"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-teal-400 font-mono bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
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
                <span className="font-bold text-teal-400 uppercase text-[10px] tracking-wider block">QKD Architecture</span>
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
                <span><strong>Assuming QKD Replaces Digital Signatures:</strong> QKD only distributes symmetric keys between two active endpoints; it cannot sign documents or encrypt stored data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Public Classical Channel Authentication:</strong> An unauthenticated sifting channel allows Man-in-the-Middle attackers to impersonate both parties.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Overlooking Photon Number Splitting (PNS):</strong> Weak coherent lasers emitting multi-photon pulses allow Eve to steal keys without error; use Decoy States.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> QKD Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Decoy State Protocol:</strong> Modulate laser intensities randomly to detect selective multi-photon beam-splitting attacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Apply Privacy Amplification (Toeplitz Hashing):</strong> Compress sifted keys to eliminate any partial information leaked during transmission.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Pair QKD with One-Time Pad (OTP):</strong> Achieve true unconditional information-theoretic secrecy for mission-critical crown-jewel links.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-teal-300">Think About:</span>
              <p className="leading-relaxed">
                Why can Eve never tap a QKD fiber silently? Because the Heisenberg Uncertainty Principle dictates that measuring an unknown photon collapses its quantum state! When Eve guesses the wrong basis (50% of the time), she introduces a detectable 25% error rate that triggers an instant abort!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>QKD security is guaranteed by quantum physics, not mathematical complexity.</li>
                <li>BB84 uses Rectilinear ($+$) and Diagonal ($\times$) non-orthogonal bases.</li>
                <li>Sifting compares basis choices over an authenticated classical channel.</li>
                <li>Eve's intercept-resend attack introduces a theoretical 25% QBER spike.</li>
                <li>Shor-Preskill bound aborts the exchange if QBER exceeds 11.0%.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-950 border border-teal-800 text-teal-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on QKD BB84 Protocol &amp; QBER Simulator Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating photon polarization, Eve intercept-resend eavesdropping, sifting phase, and QBER threshold evaluation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={qkdEnginePy}
            title="qkd_bb84_simulator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Quantum Key Distribution (QKD) &amp; BB84 FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the step-by-step phases of the BB84 protocol (Preparation, Measurement, Sifting, and QBER estimation). Explain why an Intercept-Resend attack by Eve creates a 25% error rate ($0.5 \times 0.5 = 0.25$) and state the 11.0% Shor-Preskill security bound. Contrast QKD (physics-based point-to-point key distribution) with PQC (mathematical software algorithms). Detail the Decoy State protocol defense against Photon Number Splitting (PNS)."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 8: QKD & BB84 Protocol Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 8 Note"
            downloadFileName="topic8_qkd_bb84_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
