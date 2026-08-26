import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import eerEnginePy from "./topic7_files/eer_far_frr_calculator.py?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgCurveId = useId();
  const svgDistId = useId();

  // =========================================================================
  // STUDIO 1: INTERACTIVE THRESHOLD (θ) VS FAR & FRR SIMULATOR
  // =========================================================================
  const [decisionThreshold, setDecisionThreshold] = useState(0.50); // 0.0 to 1.0

  const accuracyMetrics = useMemo(() => {
    const t = decisionThreshold;
    // Approximated Sigmoid distributions
    const far = (100.0 / (1.0 + Math.exp(12.0 * (t - 0.45)))).toFixed(3);
    const frr = (100.0 / (1.0 + Math.exp(-12.0 * (t - 0.55)))).toFixed(3);
    const tpr = (100.0 - parseFloat(frr)).toFixed(2);

    let status = "";
    let badgeColor = "";
    let posture = "";

    if (t &ge; 0.75) {
      status = "HIGH SECURITY (Near Zero-FAR)";
      posture = "Imposters strictly blocked (FAR < 0.01%), but legitimate users will experience ~6-10% false rejections requiring rescanning.";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    } else if (t <= 0.35) {
      status = "HIGH CONVENIENCE (Near Zero-FRR)";
      posture = "Legitimate users pass instantly (FRR < 0.01%), but imposter risk increases significantly (FAR ~3-5%).";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
    } else {
      status = "BALANCED (Equal Error Rate Region)";
      posture = "Optimal trade-off between security and user convenience. Ideal for standard corporate and banking environments.";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    }

    return { far, frr, tpr, status, posture, badgeColor };
  }, [decisionThreshold]);

  // =========================================================================
  // STUDIO 2: OPERATIONAL DEPLOYMENT PROFILES
  // =========================================================================
  const [selectedProfile, setSelectedProfile] = useState("commercial");

  const operationalProfiles = {
    defense: {
      title: "1. High Security & Defense (Barrackpore Treasury Core)",
      threshold: 0.85,
      far: "0.001% (Zero Imposter Tolerance)",
      frr: "6.5% (Occasional Retry Required)",
      target: "Military gates, bank treasury authorization, nuclear control rooms.",
      desc: "Prioritizes Type II error elimination (FAR) at the expense of user convenience."
    },
    commercial: {
      title: "2. Balanced Commercial (Salt Lake FinTech & Enterprise SSO)",
      threshold: 0.50,
      far: "0.1% (Standard EER Balance)",
      frr: "0.1% (Low User Friction)",
      target: "Corporate office turnstiles, consumer banking mobile apps.",
      desc: "Balances Type I and Type II errors at the Equal Error Rate (EER) crossover point."
    },
    transit: {
      title: "3. High Throughput Public Transit (Kolkata Metro Turnstiles)",
      threshold: 0.25,
      far: "2.5% (Secondary CCTV Monitoring)",
      frr: "0.001% (Zero Queue Delays)",
      target: "Metro railway smart turnstiles, theme park admission gates.",
      desc: "Minimizes Type I errors (FRR) to prevent crowd congestion and passenger stampedes."
    }
  };

  const currentProfile = operationalProfiles[selectedProfile];

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_threshold");

  const regionalDrills = {
    barrackpore_threshold: {
      id: "barrackpore_threshold",
      title: "Barrackpore Municipal Treasury: High-Security Threshold Tuning",
      location: "Financial disbursement core approving ₹85,00,000 monthly budgets",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Standard EER threshold (theta = 0.50) allowed a near-match fingerprint from a similar-looking contractor to pass during a penetration test.",
      solution:
        "Recalibrated matching threshold to theta = 0.88 (FAR < 0.0001%), accepting a slight winter FRR increase from dry skin, backed up by FIDO2 token fallback.",
      outcome:
        "100% elimination of imposter false acceptances; zero fraudulent authorization incidents reported."
    },
    kolkata_metro_turnstile: {
      id: "kolkata_metro_turnstile",
      title: "Kolkata Metro Turnstile: Zero-FRR Queue Optimization",
      location: "High-density transit gates processing 45,000 commuters per hour",
      engineers: "Mahima (Lead Systems Engineer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "During morning peak rush hour, a strict threshold (theta = 0.65) caused 4.2% false rejections, creating severe queue bottlenecks and angry commuter crowds.",
      solution:
        "Tuned turnstile threshold to theta = 0.28 (FRR < 0.001%), relying on secondary overhead CCTV surveillance and security guards for perimeter assurance.",
      outcome:
        "Passenger clearance time dropped to under 280 milliseconds; eliminated platform entry bottlenecks entirely."
    },
    ichapur_dual_tier: {
      id: "ichapur_dual_tier",
      title: "Ichapur Defense Facility: Dynamic Risk-Tiered Thresholding",
      location: "Critical defense manufacturing plant with tiered access perimeters",
      engineers: "Abhronila (Chief InfoSec Officer) & Incident Response Team",
      threatScenario:
        "A static single-threshold policy caused excessive employee friction at outer administrative gates while being insufficiently strict at subterranean ammunition vaults.",
      solution:
        "Deployed context-aware adaptive thresholding: outer administrative turnstiles use theta = 0.45 (balanced), while inner ammunition vault gates enforce theta = 0.90 + mandatory dual-custody verification.",
      outcome:
        "Seamless daily administrative flow paired with impenetrable fortress security for lethal asset storage."
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
                  Module 005_005 • Topic 7
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Biometric Accuracy Metrics: False Acceptance Rate (FAR) &amp; False Rejection Rate (FRR)
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
            Biometric accuracy is governed by statistical trade-offs rather than absolute deterministic matching.
            Master the mathematical formulation of <strong>False Acceptance Rate (FAR / Type II Error)</strong> and 
            <strong>False Rejection Rate (FRR / Type I Error)</strong>, locate the <strong>Equal Error Rate (EER / Crossover Error Rate CER)</strong>, 
            analyze <strong>DET &amp; ROC curves</strong>, and calibrate operational decision thresholds ($\theta$) for defense vs high-throughput transit.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: INTERACTIVE THRESHOLD (θ) VS FAR & FRR SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🎚️</span> Studio 1: Decision Threshold ($\theta$) vs Error Trade-off Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Slide the decision threshold ($\theta$) from 0.0 to 1.0 to observe the inverse relationship between FAR (Security) and FRR (Convenience).
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", accuracyMetrics.badgeColor)}>
              {accuracyMetrics.status}
            </div>
          </div>

          <div className="space-y-6">
            {/* Threshold Slider */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>Decision Threshold ($\theta$):</span>
                <span className="font-mono text-cyan-400 text-base">$\theta = {decisionThreshold.toFixed(2)}$</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.01"
                value={decisionThreshold}
                onChange={(e) => setDecisionThreshold(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              /&gt;
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.05 (Lenient / High FAR)</span>
                <span>0.50 (EER Crossover)</span>
                <span>0.95 (Strict / High FRR)</span>
              </div>
            </div>

            {/* Metrics Output Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 space-y-1">
                <span className="text-xs text-rose-400 font-bold uppercase tracking-wider block">
                  False Acceptance Rate (FAR) [Type II]
                </span>
                <div className="text-2xl font-bold font-mono text-white">{accuracyMetrics.far}%</div>
                <p className="text-[11px] text-slate-400">Probability of admitting an unauthorized imposter.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-1">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  False Rejection Rate (FRR) [Type I]
                </span>
                <div className="text-2xl font-bold font-mono text-white">{accuracyMetrics.frr}%</div>
                <p className="text-[11px] text-slate-400">Probability of falsely rejecting a genuine user.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 space-y-1">
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                  True Positive Rate (TPR)
                </span>
                <div className="text-2xl font-bold font-mono text-white">{accuracyMetrics.tpr}%</div>
                <p className="text-[11px] text-slate-400">$TPR = 100\% - FRR$ (Genuine Acceptance Rate).</p>
              </div>
            </div>

            {/* Posture Analysis Card */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Operational Security Posture: </strong>
              {accuracyMetrics.posture}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: EQUAL ERROR RATE (EER) & DISTRIBUTION VISUALIZER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <span>📈</span> Studio 2: Genuine vs Imposter Distributions &amp; Equal Error Rate (EER)
            </h2>
            <p className="text-xs text-slate-400">
              Visualizing the statistical overlap of Genuine (same person) vs Imposter (different persons) similarity scores.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <svg
              className="w-full h-56 bg-slate-900/60 rounded-xl p-2 overflow-visible"
              viewBox="0 0 700 200"
              aria-label="FAR FRR Distributions"
            >
              {/* Axes */}
              <line x1="60" y1="20" x2="60" y2="160" stroke="#475569" strokeWidth="1.5" />
              <line x1="60" y1="160" x2="660" y2="160" stroke="#475569" strokeWidth="1.5" />
              <text x="50" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Probability Density</text>
              <text x="360" y="185" fill="#94a3b8" fontSize="10" textAnchor="middle">Similarity Score ($s$) ➔</text>

              {/* Imposter Distribution Bell Curve (Left, Cyan/Rose) */}
              <path
                d="M 60 160 Q 180 20 300 160"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
              />
              <text x="180" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
                Imposter Distribution
              </text>

              {/* Genuine Distribution Bell Curve (Right, Emerald) */}
              <path
                d="M 260 160 Q 450 20 640 160"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />
              <text x="450" y="45" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                Genuine Distribution
              </text>

              {/* Dynamic Threshold Line */}
              {(() => {
                const tx = 60 + decisionThreshold * 580;
                return (
                  <g>
                    <line x1={tx} y1="20" x2={tx} y2="160" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx={tx} cy="20" r="4" fill="#38bdf8" />
                    <text x={tx} y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                      $\theta = {decisionThreshold.toFixed(2)}$
                    </text>
                  </g>
                );
              })()}

              {/* EER Intersection Marker at 0.50 */}
              <g transform="translate(280, 135)">
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
                <text x="10" y="4" fill="#fbbf24" fontSize="10" fontWeight="bold">EER Crossover ($FAR=FRR$)</text>
              </g>
            </svg>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <div><strong className="text-rose-400">FAR Region: </strong> Imposters right of threshold $\theta$.</div>
              <div><strong className="text-emerald-400">FRR Region: </strong> Genuine left of threshold $\theta$.</div>
              <div><strong className="text-amber-400">EER Point: </strong> Exact curve intersection.</div>
              <div><strong className="text-cyan-400">d' Separation: </strong> Distance between peak means.</div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: OPERATIONAL PROFILES */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚙️</span> Studio 3: Operational Deployment Profiles &amp; Calibration
              </h2>
              <p className="text-xs text-slate-400">
                Examine standard industry threshold calibrations across defense facilities, commercial web portals, and public transit gates.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(operationalProfiles).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedProfile(key);
                    setDecisionThreshold(operationalProfiles[key].threshold);
                  }}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    selectedProfile === key
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key === "defense" ? "High Security Defense" : key === "commercial" ? "Commercial Balanced" : "Transit High Flow"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentProfile.title}</span>
              <span className="text-xs text-cyan-400 font-mono bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                Calibrated $\theta = {currentProfile.threshold}$
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">FAR Objective</span>
                <p className="text-rose-400 font-mono font-bold">{currentProfile.far}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">FRR Objective</span>
                <p className="text-amber-400 font-mono font-bold">{currentProfile.frr}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Target Facilities</span>
                <p className="text-slate-300">{currentProfile.target}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
              <strong className="text-white">Strategic Justification: </strong>
              {currentProfile.desc}
            </p>
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
                Case studies of threshold calibration, queue bottlenecks, and dual-tier policies across regional infrastructure.
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
                &gt;
                  {key === "barrackpore_threshold" ? "Barrackpore Treasury" : key === "kolkata_metro_turnstile" ? "Kolkata Metro Turnstile" : "Ichapur Dual-Tier"}
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
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Operational Failure</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Threshold Calibration</span>
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
                <span><strong>Assuming Zero-FAR is Free of Consequences:</strong> Setting $\theta = 0.99$ drives FRR so high that real users are constantly falsely rejected.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring 1:N Population Error Scaling:</strong> In a 100,000-user database, a 0.01% FAR generates a 99.99% cumulative false match rate!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Treating Vendor Marketing EER as Field Truth:</strong> Laboratory EER figures degrade significantly in dusty, humid, or variable lighting field environments.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Best Practices &amp; Engineering Rules
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Multi-Modal Score Fusion:</strong> Combining Face + Fingerprint reduces composite FAR exponentially while keeping FRR low.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Use Dynamic Contextual Thresholds:</strong> Shift decision threshold based on transaction value in ₹ and ambient risk score.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Provide Multi-Factor Fallback Channels:</strong> Always pair high-threshold biometrics with FIDO2 hardware PIN fallback for false rejection recovery.</span>
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
                Why is Equal Error Rate (EER) evaluated under laboratory conditions? Because in actual deployment, nobody runs a system at exact EER! Defense systems shift right (low FAR), while metro transit shifts left (low FRR)!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>FAR = Type II Error (Imposter accepted / Total Imposter attempts).</li>
                <li>FRR = Type I Error (Genuine user rejected / Total Genuine attempts).</li>
                <li>EER (CER) is the crossover point where $FAR = FRR$.</li>
                <li>Higher threshold $\theta$ decreases FAR (more secure) but increases FRR.</li>
                <li>DET curves plot FRR vs FAR on probit logarithmic scales.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on EER, FAR, FRR &amp; DET Accuracy Calculator Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating Gaussian score distributions, threshold tuning, EER crossover points, and DET trade-off curves
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={eerEnginePy}
            title="eer_far_frr_calculator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Biometric Accuracy Metrics (FAR, FRR &amp; EER) FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Write out the exact mathematical definitions of False Acceptance Rate (FAR / Type II Error) and False Rejection Rate (FRR / Type I Error). Draw the classic Genuine vs Imposter distribution bell curves and clearly label the Equal Error Rate (EER / CER) crossover point. Contrast the operational threshold tuning required for a high-security bank treasury (low FAR) versus a high-throughput metro railway turnstile (low FRR)."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: Biometric Accuracy Metrics Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 7 Note"
            downloadFileName="topic7_accuracy_metrics_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
