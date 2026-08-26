import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic3_files/signature_vs_anomaly.py?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgAhoCorasickId = useId();
  const svgGaussianCurveId = useId();

  // Studio 1: Active Comparison Dimension Selection
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("zero_day_detection");

  // Studio 2: Live Simulator State
  const [selectedTrafficPattern, setSelectedTrafficPattern] = useState("known_log4shell");
  const [signatureEngineActive, setSignatureEngineActive] = useState(true);
  const [anomalyEngineActive, setAnomalyEngineActive] = useState(true);

  // Studio 3: Sizing & Sizing Calculations
  const [zScoreThreshold, setZScoreThreshold] = useState(3.0); // 2.0 to 4.5 sigma
  const [dailyEventsMillions, setDailyEventsMillions] = useState(25); // 5 to 100 Million events
  const [trainingWindowDays, setTrainingWindowDays] = useState(30); // 7 to 60 days

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_fintech_zeroday");

  // Comparison Database for Studio 1
  const comparisonDimensions = {
    detection_principle: {
      key: "detection_principle",
      title: "1. Core Detection Principle",
      category: "Theoretical Foundation",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      signatureDetail: "Pattern matching against pre-compiled database of known CVE exploit bytes and regex rules (Snort/YARA).",
      anomalyDetail: "Mathematical comparison of live traffic metrics against a learned normal baseline profile (Gaussian Z-score).",
      verdict: "Signatures block what is known to be evil; Anomaly engines block what deviates from normal behavior."
    },
    zero_day_detection: {
      key: "zero_day_detection",
      title: "2. Zero-Day & Novel Exploit Detection",
      category: "Threat Coverage",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      signatureDetail: "Completely blind (0% detection). Requires prior discovery, CVE assignment, and signature deployment.",
      anomalyDetail: "High detection capability. Flags abnormal behavioral side-effects (entropy spikes, rate anomalies, exfiltration).",
      verdict: "Anomaly detection is the indispensable safety net for catching novel, unpatched zero-day intrusions."
    },
    false_positive_rate: {
      key: "false_positive_rate",
      title: "3. False Positive Operational Overhead",
      category: "SOC Efficiency",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      signatureDetail: "Extremely low (Near 0% on well-tuned specific rules). Only matches explicit exploit strings.",
      anomalyDetail: "High false alarm rate. Benign business events (promotional sales, software updates) trigger alarms.",
      verdict: "Signatures minimize analyst burnout; Anomaly engines require continuous baseline recalibration."
    },
    computational_model: {
      key: "computational_model",
      title: "4. Computational Complexity & Algorithms",
      category: "Algorithmic Performance",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      signatureDetail: "Aho-Corasick Deterministic Finite Automaton (DFA) multi-pattern matching in single linear pass O(N).",
      anomalyDetail: "Gaussian normal distributions, Shannon Entropy calculations, PCA, and Isolation Forest models.",
      verdict: "Signatures run at deterministic wire speed; Anomaly engines require state tracking and statistical memory."
    }
  };

  // Studio 2: Live Injected Traffic Patterns Database
  const trafficPatterns = {
    known_log4shell: {
      id: "known_log4shell",
      label: "Known Log4Shell Diagnostic Pattern (${diagnostic_jndi:ldap://test.internal/a})",
      payloadType: "Known CVE-2021-44228",
      rateCps: 12.0,
      entropy: 4.1,
      sigMatch: "✔ MATCHED SID-101 (Log4Shell JNDI Injection)",
      anomalyScore: "Z = +0.2 (Within Normal Rate Limits)",
      verdict: "🚨 THREAT CAUGHT BY SIGNATURE ENGINE (Exact CVE Match!)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Aho-Corasick DFA matched the '${diagnostic_jndi:' byte pattern in single pass. Signature engine dispatched instant high-confidence alert."
    },
    polymorphic_zeroday: {
      id: "polymorphic_zeroday",
      label: "Polymorphic Zero-Day RCE (Custom Encrypted Shellcode)",
      payloadType: "Novel Zero-Day (0 Known Signatures)",
      rateCps: 95.0,
      entropy: 7.8,
      sigMatch: "❌ NO MATCH (0 of 35,000 Signatures Matched)",
      anomalyScore: "Z = +4.82 (Rate & High-Entropy Anomaly!)",
      verdict: "⚠️ THREAT CAUGHT BY ANOMALY ENGINE (Zero-Day Behavioral Spike!)",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      explanation: "Signature engine missed the novel shellcode, but Anomaly engine detected abnormal request rate (95 CPS) and high Shannon entropy (7.8 bits/byte), catching the zero-day!"
    },
    normal_citizen_traffic: {
      id: "normal_citizen_traffic",
      label: "Standard Citizen Portal Browsing (Clean HTTP GET /taxes)",
      payloadType: "Benign Production Traffic",
      rateCps: 14.5,
      entropy: 3.6,
      sigMatch: "❌ NO MATCH (Clean)",
      anomalyScore: "Z = -0.14 (Normal Baseline)",
      verdict: "✔ CLEAN TRAFFIC (Passed Both Engines)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      explanation: "Both Signature and Anomaly engines confirmed normal operational parameters with zero alerts generated."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedTuningMetrics = useMemo(() => {
    // False alarm rate estimate based on Z-score threshold
    const falsePositiveRatePercent = zScoreThreshold < 2.5 ? 2.8 : (zScoreThreshold < 3.5 ? 0.25 : 0.03);
    const dailyFalseAlarms = Math.round((dailyEventsMillions * 1000000 * (falsePositiveRatePercent / 100)));

    // 5-Year SOC Analyst Triage TCO (INR ₹ Lakhs)
    const annualAnalystHours = (dailyFalseAlarms * 0.02 * 365).toFixed(0);
    const annualAnalystCostLakhs = ((Number(annualAnalystHours) * 350) / 100000).toFixed(2);
    const fiveYearTcoLakhs = (Number(annualAnalystCostLakhs) * 5 + 6.0).toFixed(2);

    return {
      falsePositiveRatePercent,
      dailyFalseAlarms,
      annualAnalystHours,
      fiveYearTcoLakhs
    };
  }, [zScoreThreshold, dailyEventsMillions, trainingWindowDays]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_fintech_zeroday: {
      id: "barrackpore_fintech_zeroday",
      title: "Barrackpore Municipal Civic Tax Gateway Zero-Day Outbreak",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      hybridSetup: "Aho-Corasick Multi-Pattern NIDS + Gaussian Z-Score Anomaly Engine",
      threatScenario: "Adversaries deployed a custom zero-day polymorphic dropper that evaded all 35,000 static Snort rules.",
      solution: "Sukanta Hui, Mamata, and Mahima utilized a hybrid detection pipeline. While the signature engine saw zero matches, the anomaly engine flagged an extreme spike in outbound high-entropy DNS tunneling (Z = +4.8).",
      outcome: "Attacker C2 connection severed in 1.4 seconds; new signature synthesized and deployed within 15 minutes; zero data lost."
    },
    saltlake_portal_tuning: {
      id: "saltlake_portal_tuning",
      title: "Salt Lake Sector V E-Governance Portal Festive Spike Baseline Tuning",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      hybridSetup: "Adaptive Sliding-Window Anomaly Profiler (30-Day Training Window)",
      threatScenario: "Durga Puja festival civic registration traffic caused legitimate requests to surge 400%, threatening to trigger 50,000 false anomaly alerts.",
      solution: "Abhronila, Susmita, and Debangshu adjusted the seasonal moving-average baseline and set dynamic Z-score thresholding (Z > 3.8), suppressing false alarms.",
      outcome: "Zero false-positive service disruptions; 100% of genuine SQLi attacks accurately caught; full CERT-In compliance verified."
    }
  };

  const currentDimension = comparisonDimensions[selectedDimensionKey];
  const currentPattern = trafficPatterns[selectedTrafficPattern];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Signature-based vs Anomaly-based / Heuristic Detection
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the core mathematical and algorithmic foundations of threat detection. Explore <strong className="text-sky-400">Aho-Corasick Multi-Pattern DFA Matching</strong>, <strong className="text-emerald-400">Gaussian Z-Score Anomaly Modeling</strong>, Shannon Entropy analysis, catching <strong className="text-purple-400">Zero-Day Attacks</strong>, and balancing the <strong className="text-amber-400">False Alarm Trade-off</strong>.
          </p>
        </header>

        {/* SECTION 1: AHO-CORASICK & GAUSSIAN CURVE SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Algorithmic Architectures: Aho-Corasick DFA vs Gaussian Z-Score Curve
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing single-pass deterministic string matching on the left and Gaussian statistical anomaly thresholds on the right.
            </p>
          </div>

          {/* SVG 1: AHO-CORASICK & GAUSSIAN CURVE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Aho-Corasick Trie DFA (Signatures) ➔ Gaussian Bell Curve (Anomalies)
              </span>
              <span className="text-[11px] text-gray-400 font-mono">O(N) Match &amp; 3-Sigma Threshold</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgAhoCorasickId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Aho Corasick and Gaussian Anomaly Diagram"
              >
                {/* LEFT: AHO-CORASICK DFA */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  AHO-CORASICK MULTI-PATTERN DFA (SIGNATURES)
                </text>

                {/* ROOT NODE */}
                <circle cx="100" cy="140" r="16" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="144" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">ROOT</text>

                {/* TRIE BRANCH 1: $jndi: */}
                <path d="M 116 130 L 180 90" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="195" cy="85" r="14" fill="#1e1b4b" stroke="#6366f1" />
                <text x="195" y="89" fill="#ffffff" fontSize="7.5" textAnchor="middle">"$"</text>

                <path d="M 209 85 L 265 85" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="280" cy="85" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="280" y="89" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">jndi:</text>

                <text x="335" y="89" fill="#fca5a5" fontSize="7.5" fontWeight="bold">MATCH SID-101!</text>

                {/* TRIE BRANCH 2: union select */}
                <path d="M 116 150 L 180 190" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="195" cy="195" r="14" fill="#1e1b4b" stroke="#6366f1" />
                <text x="195" y="199" fill="#ffffff" fontSize="7.5" textAnchor="middle">"u"</text>

                <path d="M 209 195 L 265 195" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="280" cy="195" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="280" y="199" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">select</text>

                <text x="335" y="199" fill="#fca5a5" fontSize="7.5" fontWeight="bold">MATCH SID-103!</text>

                <text x="215" y="240" fill="#bae6fd" fontSize="7.5" textAnchor="middle">
                  Single pass O(N) evaluation across 35,000 rules simultaneously
                </text>

                {/* RIGHT: GAUSSIAN BELL CURVE */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  GAUSSIAN STATISTICAL ANOMALY MODEL (Z &gt; 3.0)
                </text>

                {/* BELL CURVE PATH */}
                <path
                  d="M 470 200 C 530 200, 580 80, 635 80 C 690 80, 740 200, 800 200"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                />

                {/* MEAN LINE */}
                <line x1="635" y1="80" x2="635" y2="200" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="635" y="215" fill="#93c5fd" fontSize="8" fontWeight="bold" textAnchor="middle">Mean (μ = 15 CPS)</text>

                {/* 3 SIGMA THRESHOLD */}
                <line x1="740" y1="120" x2="740" y2="200" stroke="#ef4444" strokeWidth="2" />
                <text x="740" y="215" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">+3σ (Z = 3.0)</text>

                {/* ANOMALY ZONE SHADING */}
                <rect x="740" y="120" width="60" height="80" fill="#450a0a" opacity="0.6" />
                <text x="770" y="155" fill="#fca5a5" fontSize="7.5" fontWeight="bold" textAnchor="middle">ANOMALY</text>
                <text x="770" y="168" fill="#fee2e2" fontSize="7" textAnchor="middle">ALERT ZONE</text>

                <text x="635" y="240" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Mathematical formula: Z = (x - μ) / σ &gt; 3.0 (99.7% Normal Confidence)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: COMPARISON MATRIX */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Signature-Based vs Anomaly-Based Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the fundamental trade-offs in zero-day coverage, false alarm rates, and computational execution models.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentDimension.badgeColor)}>
              {currentDimension.category}
            </span>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(comparisonDimensions).map((d) => (
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
                <span className="text-gray-400">Dimension Category: {currentDimension.category}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentDimension.badgeColor)}>
                Active Matrix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-sky-950/80 space-y-2">
                <span className="text-sky-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>📜</span> Signature-Based Detection:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.signatureDetail}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-950/80 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>📈</span> Anomaly-Based / Heuristic Detection:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentDimension.anomalyDetail}</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-950/40 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                🧠 Engineering Axiom:
              </span>
              <p className="text-indigo-200 font-mono text-xs">{currentDimension.verdict}</p>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE DETECTION SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Signature Matcher vs Statistical Anomaly Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inject known CVE exploits, zero-day encrypted payloads, and clean traffic to compare detection efficacy.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Dual Engine Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Traffic Scenario:</label>
              <select
                value={selectedTrafficPattern}
                onChange={(e) => setSelectedTrafficPattern(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(trafficPatterns).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Aho-Corasick Signature Engine:</label>
              <button
                onClick={() => setSignatureEngineActive(!signatureEngineActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  signatureEngineActive
                    ? "bg-sky-950/80 text-sky-300 border-sky-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {signatureEngineActive ? "✔ 35,000 Signatures Active" : "❌ Signatures Disabled"}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Statistical Anomaly Engine:</label>
              <button
                onClick={() => setAnomalyEngineActive(!anomalyEngineActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  anomalyEngineActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {anomalyEngineActive ? "✔ Anomaly Z-Score Active" : "❌ Anomaly Engine Disabled"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Ingress Payload Stream:
                </span>
                <span className="text-white font-bold text-sm">{currentPattern.label}</span>
                <span className="text-gray-400 text-xs block">Classification: {currentPattern.payloadType}</span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentPattern.badgeColor
              )}>
                {currentPattern.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <span className="text-sky-400 font-bold text-[11px] block">📜 Signature Matcher Output:</span>
                <p className="text-gray-200 font-mono text-[11px]">{currentPattern.sigMatch}</p>
                <span className="text-[10px] text-gray-500 block">DFA Trie Evaluation</span>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold text-[11px] block">📈 Anomaly Engine Output:</span>
                <p className="text-gray-200 font-mono text-[11px]">{currentPattern.anomalyScore}</p>
                <span className="text-[10px] text-gray-500 block">Rate CPS: {currentPattern.rateCps} • Shannon Entropy: {currentPattern.entropy}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                Detection Reasoning:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentPattern.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: DUAL ENGINE CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Dual Signature &amp; Statistical Anomaly Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation calculating Shannon entropy and Gaussian Z-scores alongside signature matching.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              signature_vs_anomaly.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="signature_vs_anomaly.py"
            highlightLines={[25, 39, 52, 68]}
          />
        </section>

        {/* STUDIO 3: ANOMALY TUNING & SOC SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Anomaly Sensitivity &amp; Z-Score Threshold Sizing Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate daily false alarm rates, analyst triage workload, and 5-year operational triage cost in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Tuning Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Z-Score Sensitivity Threshold:</span>
                <span className="text-sky-400 font-bold">Z = {zScoreThreshold} σ</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="4.5"
                step="0.1"
                value={zScoreThreshold}
                onChange={(e) => setZScoreThreshold(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">Lower = More Zero-Days, More False Alarms</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Daily Perimeter Events:</span>
                <span className="text-purple-400 font-bold">{dailyEventsMillions}M Events/Day</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={dailyEventsMillions}
                onChange={(e) => setDailyEventsMillions(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Baseline Training Window:</span>
                <span className="text-emerald-400 font-bold">{trainingWindowDays} Days</span>
              </div>
              <input
                type="range"
                min="7"
                max="60"
                step="7"
                value={trainingWindowDays}
                onChange={(e) => setTrainingWindowDays(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Estimated False Alarm Rate</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{calculatedTuningMetrics.falsePositiveRatePercent}%</div>
              <span className="text-[10px] text-gray-500 block">~{calculatedTuningMetrics.dailyFalseAlarms.toLocaleString()} False Alerts / Day</span>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Annual Analyst Triage Load</span>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">{calculatedTuningMetrics.annualAnalystHours} Hours/Yr</div>
              <span className="text-[10px] text-gray-500 block">Manual Verification &amp; Tuning</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Hybrid SOC TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedTuningMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Analyst Labor + ML Engine Nodes</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Setup: {currentDrill.hybridSetup}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Hybrid Defense Execution:</span>
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
                <span>Signature-based IDS detects known attacks with near-zero false positives using pattern databases.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Signature-based IDS is completely blind to novel zero-day exploits.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Anomaly-based IDS establishes a normal baseline and detects unknown zero-days via statistical deviation.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Anomaly-based IDS suffers from higher false-positive rates due to unexpected legitimate traffic spikes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>The Aho-Corasick DFA algorithm enables multi-pattern matching across 30,000+ rules in a single pass.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Gaussian Z-Score (Z = (x - μ)/σ &gt; 3.0) is the foundational mathematical model for anomaly detection.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Signature vs Anomaly Detection FAQs"
            subtitle="30 In-depth Practice Questions & Detection Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Signature vs Anomaly Detection (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: In Topic 3, we explored the mathematical and philosophical foundations of detection engines. Keep this core rule in mind: Signature-based systems (using the Aho-Corasick DFA algorithm) give you ultra-fast, deterministic protection against 95%+ of known commodity attacks with zero false alarms; however, they cannot catch zero-day exploits. Anomaly-based engines (using Gaussian Z-scores and Shannon entropy) catch unknown zero-days and stealthy data exfiltration, but require disciplined baseline calibration to prevent false alarm storms. Modern cybersecurity architectures always combine both into a Hybrid Detection Engine! In Topic 4, we will take a deep dive into Statistical Anomaly Detection and Machine Learning in IDS!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic3;
