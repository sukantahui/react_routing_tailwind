import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic6_files/tuning_and_metrics.py?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgConfusionMatrixId = useId();
  const svgBayesianFallacyId = useId();

  // Studio 1: Active Matrix Quadrant Selection
  const [selectedQuadrantKey, setSelectedQuadrantKey] = useState("false_positive");

  // Studio 2: Live Rule Tuning Simulator State
  const [ruleTuningState, setRuleTuningState] = useState("naive_greedy_regex"); // "naive_greedy_regex", "tuned_sql_token", "scanner_whitelisted"
  const [selectedIncidentScenario, setSelectedIncidentScenario] = useState("benign_patient_record");

  // Studio 3: Performance & Sizing Calculations
  const [totalDailyPacketsMillions, setTotalDailyPacketsMillions] = useState(10); // 1 to 50 Million packets
  const [attackPrevalencePercent, setAttackPrevalencePercent] = useState(0.01); // 0.001% to 0.1%
  const [sensorFalsePositiveRate, setSensorFalsePositiveRate] = useState(0.05); // 0.01% to 1.0%

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("barrackpore_health_tuning");

  // Confusion Matrix Database for Studio 1
  const matrixQuadrants = {
    true_positive: {
      key: "true_positive",
      title: "1. True Positive (TP) — Successful Detection",
      classification: "Ground Truth: Attack | Sensor Verdict: Alert/Drop",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      description: "A genuine cyber attack traversed the network and was correctly identified by the IDS/IPS.",
      operationalImpact: "Security Success. Exploit halted or alert dispatched to SOC for rapid containment.",
      formulaContribution: "Increases both Precision (TP / (TP + FP)) and Recall (TP / (TP + FN))."
    },
    false_positive: {
      key: "false_positive",
      title: "2. False Positive (FP) — Type I Error (False Alarm)",
      classification: "Ground Truth: Benign | Sensor Verdict: Alert/Drop",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      description: "Legitimate benign business traffic was incorrectly flagged as an attack due to overly broad signatures.",
      operationalImpact: "Causes severe SOC Alert Fatigue; in an inline IPS, it causes accidental self-inflicted business outages.",
      formulaContribution: "Directly degrades Precision (lowers PPV) and inflates daily analyst triage workload."
    },
    false_negative: {
      key: "false_negative",
      title: "3. False Negative (FN) — Type II Error (Undetected Breach)",
      classification: "Ground Truth: Attack | Sensor Verdict: Pass/Ignore",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-800",
      description: "A malicious exploit or zero-day bypassed inspection undetected due to encryption blind spots or missing rules.",
      operationalImpact: "Catastrophic Security Breach! Adversary establishes persistence, exfiltrates data, and deploys ransomware.",
      formulaContribution: "Directly degrades Recall / Sensitivity (lowers TPR) and represents catastrophic defensive failure."
    },
    true_negative: {
      key: "true_negative",
      title: "4. True Negative (TN) — Normal Operation",
      classification: "Ground Truth: Benign | Sensor Verdict: Pass/Ignore",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      description: "Legitimate everyday business traffic was correctly recognized as clean and passed without generating false noise.",
      operationalImpact: "Normal silent operation. Production workflows and user transactions continue uninterrupted.",
      formulaContribution: "Determines Specificity (TN / (TN + FP)); must exceed 99.9% in multi-gigabit environments."
    }
  };

  // Studio 2: Live Injected Test Scenarios
  const testScenarios = {
    benign_patient_record: {
      id: "benign_patient_record",
      label: "Benign Medical Record ('SELECT medication for patient...')",
      isAttack: false,
      payloadSnippet: "GET /records?action=select_medication&id=1004"
    },
    authorized_nessus_scan: {
      id: "authorized_nessus_scan",
      label: "Authorized Internal Vulnerability Audit (Nessus IP 10.10.99.50)",
      isAttack: false,
      payloadSnippet: "POST /api/check?probe=100054 (Scheduled Vulnerability Audit)"
    },
    genuine_sql_injection: {
      id: "genuine_sql_injection",
      label: "Genuine In-Band SQL Injection (' UNION SELECT username, pass_hash...)",
      isAttack: true,
      payloadSnippet: "GET /api?q=' UNION SELECT user, pass FROM admin_accounts--"
    }
  };

  // Studio 2: Rule Tuning Evaluation Logic
  const ruleTuningResult = useMemo(() => {
    const scenario = testScenarios[selectedIncidentScenario];

    if (ruleTuningState === "naive_greedy_regex") {
      // Loose regex triggers on everything containing "select"
      if (scenario.id === "benign_patient_record") {
        return {
          verdict: "🚨 FALSE POSITIVE (Alert on Benign Word 'select'!)",
          disposition: "Type I Error (FP)",
          precisionShift: "Low Precision (0.2% True Threat Rate)",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
          explanation: "Naive regex `content:\"select\"` matched the legitimate medical word 'select_medication', generating a false alarm!"
        };
      } else if (scenario.id === "authorized_nessus_scan") {
        return {
          verdict: "🚨 FALSE POSITIVE (Alert Storm from Internal Scanner!)",
          disposition: "Type I Error (FP)",
          precisionShift: "Flooding SIEM with 50,000 Expected Scanner Alerts",
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
          explanation: "Scanner triggered thousands of exploit rules; without IP suppression, SOC queue is flooded."
        };
      } else {
        return {
          verdict: "✔ TRUE POSITIVE (SQLi Caught)",
          disposition: "Successful Detection (TP)",
          precisionShift: "Caught threat, but buried in 45,000 false alarms",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Exploit caught, but high false alarm rate risks analyst ignoring it!"
        };
      }
    } else if (ruleTuningState === "tuned_sql_token") {
      if (scenario.id === "benign_patient_record") {
        return {
          verdict: "✔ TRUE NEGATIVE (Clean Traffic Passed)",
          disposition: "Correctly Ignored (TN)",
          precisionShift: "Precision improved to 92.4%",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Tuned SQL grammar tokenization recognized 'select_medication' as a benign variable name, eliminating the false alarm!"
        };
      } else if (scenario.id === "authorized_nessus_scan") {
        return {
          verdict: "⚠️ SCANNER ALERT (Valid Signature Match on Audit IP)",
          disposition: "Expected Scanner Alert (FP in SOC)",
          precisionShift: "Requires IP suppression to eliminate audit noise",
          badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
          explanation: "Signature accurately matched exploit pattern, but internal scanner IP should be suppressed."
        };
      } else {
        return {
          verdict: "✔ TRUE POSITIVE (SQL Injection Caught Cleanly)",
          disposition: "Successful Detection (TP)",
          precisionShift: "High Precision (99.1%)",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Tuned rule matched the full `UNION SELECT ... FROM` syntax with zero false alarms on clean text."
        };
      }
    } else {
      // Scanner Whitelisted + Tuned
      if (scenario.id === "authorized_nessus_scan") {
        return {
          verdict: "✔ SUPPRESSED (Authorized Nessus IP 10.10.99.50 Whitelisted)",
          disposition: "Expected Audit Ignored (TN)",
          precisionShift: "Zero Scanner Noise in SOC Queue",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Snort `suppress` directive silenced alerts from the authorized audit IP, keeping SOC queues clean."
        };
      } else if (scenario.id === "benign_patient_record") {
        return {
          verdict: "✔ TRUE NEGATIVE (Clean Patient Record Passed)",
          disposition: "Clean Operation (TN)",
          precisionShift: "Zero False Alarms",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Tuned token rules passed clean traffic with zero false alarms."
        };
      } else {
        return {
          verdict: "✔ TRUE POSITIVE (High-Fidelity Threat Alert Dispatched!)",
          disposition: "Gold Standard Detection (TP)",
          precisionShift: "Maximum Precision (99.8% True Threat Rate)",
          badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
          explanation: "Genuine SQL injection flagged immediately; SOC receives only high-fidelity verified alerts!"
        };
      }
    }
  }, [ruleTuningState, selectedIncidentScenario]);

  // Studio 3: Performance & Bayesian Calculations
  const calculatedBayesianMetrics = useMemo(() => {
    const totalPackets = totalDailyPacketsMillions * 1000000;
    const actualAttacks = Math.round(totalPackets * (attackPrevalencePercent / 100));
    const actualClean = totalPackets - actualAttacks;

    const truePositives = Math.round(actualAttacks * 0.99); // 99% Recall
    const falseNegatives = actualAttacks - truePositives;
    const falsePositives = Math.round(actualClean * (sensorFalsePositiveRate / 100));
    const totalAlerts = truePositives + falsePositives;

    // True Threat Probability P(Attack | Alert)
    const probRealAttackPercent = totalAlerts > 0 ? ((truePositives / totalAlerts) * 100).toFixed(2) : "0.00";

    // 5-Year Analyst Workload TCO (INR ₹ Lakhs)
    const annualAnalystHours = (falsePositives * 0.015 * 365).toFixed(0);
    const annualAnalystCostLakhs = ((Number(annualAnalystHours) * 350) / 100000).toFixed(2);
    const fiveYearTcoLakhs = (Number(annualAnalystCostLakhs) * 5 + 4.5).toFixed(2);

    return {
      actualAttacks,
      truePositives,
      falseNegatives,
      falsePositives,
      totalAlerts,
      probRealAttackPercent,
      fiveYearTcoLakhs
    };
  }, [totalDailyPacketsMillions, attackPrevalencePercent, sensorFalsePositiveRate]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    barrackpore_health_tuning: {
      id: "barrackpore_health_tuning",
      title: "Barrackpore Municipal Health Registry False Positive Crisis",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      tuningScope: "Web Application NIDS & SQL Injection Tokenization",
      threatScenario: "An un-tuned Snort rule matching `select` generated 45,000 daily false alarms on legitimate patient prescription records, overwhelming the local SOC.",
      solution: "Sukanta Hui, Mamata, and Mahima conducted a Bayesian analysis, refactored the signature to require full SQL grammar tokens, and whitelisted internal backup subnets.",
      outcome: "Daily false alarms dropped from 45,000 to 12; precision jumped to 99.4%; zero legitimate medical records blocked; verified 100% DPDP Act 2023 compliance."
    },
    saltlake_fintech_whitelisting: {
      id: "saltlake_fintech_whitelisting",
      title: "Salt Lake Sector V Core Banking Scanner Whitelisting Drill",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      tuningScope: "Automated Scanner Suppression & Event Filtering",
      threatScenario: "Weekly automated Nessus vulnerability audits triggered 120,000 IDS alerts, burying a simultaneous real brute-force attack.",
      solution: "Abhronila, Susmita, and Debangshu configured Snort `suppress` rules for Nessus scanner IPs and applied `event_filter` rate limits.",
      outcome: "Scanner noise silenced; the real brute-force attack was immediately surfaced and blocked in 1.4 seconds; full forensic audit logs preserved for CERT-In."
    }
  };

  const currentQuadrant = matrixQuadrants[selectedQuadrantKey];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 6</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Handling False Positives &amp; False Negatives in Security Monitoring
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the mathematical and operational discipline of threat classification. Understand the <strong className="text-sky-400">2x2 Confusion Matrix</strong>, Precision vs Recall, the <strong className="text-emerald-400">Bayesian Base Rate Fallacy</strong>, Snort <strong className="text-purple-400">Event Filtering &amp; Suppression</strong>, and eliminating <strong className="text-amber-400">Alert Fatigue</strong>.
          </p>
        </header>

        {/* SECTION 1: CONFUSION MATRIX & BAYESIAN FALLACY SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> The 2x2 Classification Matrix &amp; Bayesian Base Rate Fallacy
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the four detection quadrants on the left and the mathematical proof of the Base Rate Fallacy on the right.
            </p>
          </div>

          {/* SVG 1: CONFUSION MATRIX & BAYESIAN PROOF */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                2x2 Classification Grid ➔ Bayesian Alert Probability Proof
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Precision, Recall &amp; Bayes' Theorem</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgConfusionMatrixId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Confusion Matrix and Bayesian Base Rate Fallacy Diagram"
              >
                {/* LEFT: 2x2 MATRIX */}
                <rect x="20" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="215" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE 2x2 SECURITY CONFUSION MATRIX
                </text>

                {/* TP QUADRANT */}
                <rect x="40" y="60" width="165" height="85" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="122" y="82" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">TRUE POSITIVE (TP)</text>
                <text x="122" y="100" fill="#ffffff" fontSize="7.5" textAnchor="middle">Real Attack ➔ Alerted ✔</text>
                <text x="122" y="118" fill="#a7f3d0" fontSize="7" textAnchor="middle">Successful Defense</text>
                <text x="122" y="132" fill="#fde68a" fontSize="7" fontWeight="bold" textAnchor="middle">Target: MAXIMIZE</text>

                {/* FP QUADRANT */}
                <rect x="225" y="60" width="165" height="85" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="307" y="82" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">FALSE POSITIVE (FP)</text>
                <text x="307" y="100" fill="#ffffff" fontSize="7.5" textAnchor="middle">Benign Traffic ➔ Alerted ⚠️</text>
                <text x="307" y="118" fill="#fde68a" fontSize="7" textAnchor="middle">Type I Error (Alert Fatigue)</text>
                <text x="307" y="132" fill="#fca5a5" fontSize="7" fontWeight="bold" textAnchor="middle">Target: MINIMIZE</text>

                {/* FN QUADRANT */}
                <rect x="40" y="155" width="165" height="85" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="122" y="177" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">FALSE NEGATIVE (FN)</text>
                <text x="122" y="195" fill="#ffffff" fontSize="7.5" textAnchor="middle">Real Attack ➔ Missed ❌</text>
                <text x="122" y="213" fill="#fca5a5" fontSize="7" textAnchor="middle">Type II Error (Breach!)</text>
                <text x="122" y="227" fill="#f87171" fontSize="7" fontWeight="bold" textAnchor="middle">Target: ZERO TOLERANCE</text>

                {/* TN QUADRANT */}
                <rect x="225" y="155" width="165" height="85" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="307" y="177" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">TRUE NEGATIVE (TN)</text>
                <text x="307" y="195" fill="#ffffff" fontSize="7.5" textAnchor="middle">Benign Traffic ➔ Ignored ✔</text>
                <text x="307" y="213" fill="#bae6fd" fontSize="7" textAnchor="middle">Normal Quiet Operation</text>
                <text x="307" y="227" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">Target: Specificity &gt; 99.9%</text>

                {/* RIGHT: BAYESIAN BASE RATE PROOF */}
                <rect x="440" y="20" width="390" height="240" rx="8" fill="#030712" stroke="#10b981" strokeWidth="1.5" />
                <text x="635" y="42" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  THE BAYESIAN BASE RATE FALLACY PROOF
                </text>

                <rect x="460" y="60" width="350" height="45" rx="5" fill="#18181b" stroke="#64748b" />
                <text x="475" y="80" fill="#ffffff" fontSize="8" fontWeight="bold">Sample Stream: 1,000,000 Packets</text>
                <text x="475" y="95" fill="#94a3b8" fontSize="7.5">100 Real Attacks (0.01% Base Rate) • 999,900 Clean Packets</text>

                {/* SENSOR WITH 99% ACCURACY */}
                <rect x="460" y="115" width="350" height="65" rx="5" fill="#064e3b" stroke="#10b981" />
                <text x="475" y="133" fill="#34d399" fontSize="8.5" fontWeight="bold">Sensor Specs: 99% TPR (Recall) • 1% FPR (False Alarm)</text>
                <text x="475" y="150" fill="#a7f3d0" fontSize="7.5">✔ True Positives Caught = 99 Attacks (99% of 100)</text>
                <text x="475" y="167" fill="#fca5a5" fontSize="7.5" fontWeight="bold">⚠️ False Positives Generated = 9,999 Alarms (1% of 999,900)</text>

                {/* BAYESIAN PROBABILITY BOX */}
                <rect x="460" y="190" width="350" height="55" rx="5" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                <text x="635" y="210" fill="#fee2e2" fontSize="9" fontWeight="bold" textAnchor="middle">
                  P(Real Attack | Alert Fired) = 99 / (99 + 9,999) = 0.98%!
                </text>
                <text x="635" y="230" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">
                  🚨 Reality: 99.02% of all alerts received by SOC are FALSE ALARMS!
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: CONFUSION MATRIX EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: The 2x2 Confusion Matrix &amp; Performance Metric Explorer
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore each classification quadrant, its operational risk, and its mathematical contribution to Precision, Recall, and F1-Score.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentQuadrant.badgeColor)}>
              Classification Quadrant
            </span>
          </div>

          {/* Quadrant Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(matrixQuadrants).map((q) => (
              <button
                key={q.key}
                onClick={() => setSelectedQuadrantKey(q.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedQuadrantKey === q.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {q.title}
              </button>
            ))}
          </div>

          {/* Active Quadrant Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentQuadrant.title}</h3>
                <span className="text-gray-400 font-mono">{currentQuadrant.classification}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentQuadrant.badgeColor)}>
                Active Quadrant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                🔍 Technical Description:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentQuadrant.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  ⚙️ Operational Impact on SOC:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentQuadrant.operationalImpact}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-900/50 space-y-1">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] block">
                  📐 Mathematical Formula Impact:
                </span>
                <p className="text-indigo-200 font-mono text-xs">{currentQuadrant.formulaContribution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE RULE TUNING SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live Alert Stream &amp; Rule Tuning Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Observe how refactoring naive greedy regex into strict SQL tokenization and whitelisting authorized scanners improves Precision from 0.2% to 99.8%.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Tuning Lab
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Ingress Incident Scenario:</label>
              <select
                value={selectedIncidentScenario}
                onChange={(e) => setSelectedIncidentScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(testScenarios).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">IDS Rule Tuning State:</label>
              <select
                value={ruleTuningState}
                onChange={(e) => setRuleTuningState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                <option value="naive_greedy_regex">1. Untuned Rule Base (Loose Regex content:"select")</option>
                <option value="tuned_sql_token">2. Tuned SQL Grammar Token (Exact Syntax Match)</option>
                <option value="scanner_whitelisted">3. Tuned + Scanner Suppressed (Production Standard)</option>
              </select>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Tested Ingress Packet Stream:
                </span>
                <span className="text-white font-bold text-sm">{testScenarios[selectedIncidentScenario].label}</span>
                <div className="font-mono text-gray-400 text-[11px] truncate max-w-md">
                  Payload: {testScenarios[selectedIncidentScenario].payloadSnippet}
                </div>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                ruleTuningResult.badgeColor
              )}>
                {ruleTuningResult.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold text-[11px] block">Classification Outcome:</span>
                <div className="text-white font-bold font-mono text-xs">{ruleTuningResult.disposition}</div>
                <span className="text-[10px] text-gray-400 block">{ruleTuningResult.precisionShift}</span>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                  Root Cause Reasoning:
                </span>
                <p className="text-gray-300 leading-relaxed">{ruleTuningResult.explanation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: EVALUATION & BAYESIAN CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Confusion Matrix &amp; Bayesian Base Rate Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation calculating Precision, Recall, Specificity, F1-Score, and proving the Bayesian Base Rate Fallacy.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              tuning_and_metrics.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="tuning_and_metrics.py"
            highlightLines={[20, 35, 52, 65]}
          />
        </section>

        {/* STUDIO 3: BAYESIAN BASE RATE & WORKLOAD SIZING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: Base Rate Fallacy, SOC Alert Fatigue &amp; Workload Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate genuine alert probabilities under Bayes' Theorem, daily false alarm counts, and 5-year SOC analyst triage costs in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              Bayesian Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Daily Total Packets:</span>
                <span className="text-sky-400 font-bold">{totalDailyPacketsMillions}M Packets</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={totalDailyPacketsMillions}
                onChange={(e) => setTotalDailyPacketsMillions(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Attack Base Rate:</span>
                <span className="text-purple-400 font-bold">{attackPrevalencePercent}%</span>
              </div>
              <input
                type="range"
                min="0.001"
                max="0.100"
                step="0.005"
                value={attackPrevalencePercent}
                onChange={(e) => setAttackPrevalencePercent(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-500 block">Real Attacks: ~{calculatedBayesianMetrics.actualAttacks.toLocaleString()}</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Sensor False Alarm Rate (FPR):</span>
                <span className="text-rose-400 font-bold">{sensorFalsePositiveRate}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.50"
                step="0.01"
                value={sensorFalsePositiveRate}
                onChange={(e) => setSensorFalsePositiveRate(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">True Threat Probability</span>
              <div className={clsx("text-2xl font-extrabold font-mono", Number(calculatedBayesianMetrics.probRealAttackPercent) < 10.0 ? "text-rose-400" : "text-emerald-400")}>
                {calculatedBayesianMetrics.probRealAttackPercent}%
              </div>
              <span className="text-[10px] text-gray-500 block">P(Real Attack | Alert Fired)</span>
            </div>

            <div className="p-4 bg-slate-950 border border-amber-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Daily False Alarms Generated</span>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">~{calculatedBayesianMetrics.falsePositives.toLocaleString()} /day</div>
              <span className="text-[10px] text-gray-500 block">Out of {calculatedBayesianMetrics.totalAlerts.toLocaleString()} Total Alerts</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year Analyst Triage TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedBayesianMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">Triage Hours + SIEM Storage</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • Scope: {currentDrill.tuningScope}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono self-start sm:self-auto">
                CERT-In Compliant
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-rose-400 font-bold uppercase tracking-wider block">🚨 Simulated Operational Bottleneck:</span>
              <p className="text-gray-300 leading-relaxed">{currentDrill.threatScenario}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ Signature Tuning Remediation:</span>
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
                <span>True Positive (TP) = Real attack alerted; True Negative (TN) = Clean traffic ignored.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>False Positive (FP / Type I) = Clean traffic alerted (causes alert fatigue and IPS outages).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>False Negative (FN / Type II) = Real attack missed (catastrophic security breach).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>The Base Rate Fallacy explains why even a 99% accurate IDS yields 90%+ false alarms on high-volume traffic.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Snort event_filter and suppress directives prevent alert fatigue from noisy vulnerability scanners.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all tuned signature and alert logs synchronized with NPL India NTP.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Handling False Positives &amp; Negatives FAQs"
            subtitle="30 In-depth Practice Questions &amp; SOC Tuning Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Handling False Positives &amp; Negatives (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 6 highlights the statistical and psychological realities of working in a modern Security Operations Center (SOC)! Never overlook the Bayesian Base Rate Fallacy: when normal traffic accounts for 99.99% of all data on the wire, even an elite security sensor with 99% accuracy will still generate over 90% false alarms unless properly tuned! Always refactor greedy regular expressions into strict token syntax, use Snort event_filter and suppress directives for authorized vulnerability scanners, and eliminate false negative blind spots through full payload stream reassembly. In Topic 7, we will dive deep into Popular IDS/IPS Tools: Snort Rule Syntax and Suricata Overview!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic6;
