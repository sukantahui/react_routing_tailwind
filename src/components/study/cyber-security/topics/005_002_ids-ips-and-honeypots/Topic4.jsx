import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic4_files/ml_ids_model.py?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgAutoencoderId = useId();
  const svgFeatureVectorId = useId();

  // Studio 1: Active ML Paradigm Selection
  const [selectedMlParadigmKey, setSelectedMlParadigmKey] = useState("unsupervised_autoencoder");

  // Studio 2: Live AI Threat Detection Simulator State
  const [selectedFlowScenario, setSelectedFlowScenario] = useState("apt_covert_beacon");
  const [autoencoderThreshold, setAutoencoderThreshold] = useState(0.35); // 0.15 to 0.75 MSE
  const [isolationForestActive, setIsolationForestActive] = useState(true);

  // Studio 3: Performance & GPU Sizing Calculations
  const [flowsPerSecondThousands, setFlowsPerSecondThousands] = useState(50); // 10k to 500k flows/sec
  const [featureVectorDimensions, setFeatureVectorDimensions] = useState(22); // 10 to 60 features
  const [modelRetrainingFrequencyDays, setModelRetrainingFrequencyDays] = useState(14); // 7 to 60 days

  // Studio 4: Regional West Bengal SOC Drill
  const [activeDrillId, setActiveDrillId] = useState("saltlake_fintech_cloud");

  // ML Paradigms Database for Studio 1
  const mlParadigms = {
    supervised_classification: {
      key: "supervised_classification",
      title: "1. Supervised Learning (Known Attack Classification)",
      algorithms: "Random Forest, XGBoost, Support Vector Machines (SVM), MLP",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-800",
      trainingData: "Pre-labeled datasets (CIC-IDS2017, NSL-KDD) with tagged 'DDoS', 'PortScan', 'BruteForce'.",
      strengths: "Extremely high precision (> 99.5%) and near-zero false alarms on known exploit families.",
      limitations: "Completely blind to novel zero-day attacks whose feature distributions deviate from training labels."
    },
    unsupervised_autoencoder: {
      key: "unsupervised_autoencoder",
      title: "2. Unsupervised Learning & Deep Autoencoders (Zero-Day Outliers)",
      algorithms: "Deep Autoencoders (MSE Reconstruction Loss), Isolation Forest, DBSCAN, LOF",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      trainingData: "Requires NO labeled attack data. Learns intrinsic geometric manifold of normal network flows.",
      strengths: "Exceptional at discovering novel zero-day exploits, fileless malware beacons, and data exfiltration.",
      limitations: "Higher false-positive rates on noisy networks; requires continuous baseline recalibration."
    },
    semi_supervised_ocsvm: {
      key: "semi_supervised_ocsvm",
      title: "3. Semi-Supervised Learning (One-Class Boundary Defense)",
      algorithms: "One-Class SVM (OC-SVM), Minimum Covariance Determinant (MCD)",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      trainingData: "Trained exclusively on 100% verified clean baseline traffic.",
      strengths: "Draws a tight mathematical hyper-sphere around normal traffic; anything falling outside is flagged.",
      limitations: "Vulnerable to baseline poisoning if malicious samples contaminate the initial clean baseline."
    }
  };

  // Studio 2: Live Injected Flow Scenarios Database
  const flowScenarios = {
    apt_covert_beacon: {
      id: "apt_covert_beacon",
      label: "APT Fileless PowerShell Covert Beacon (45-Min Periodic Check-in)",
      duration: "0.25s",
      packets: 6,
      bytes: 1200,
      meanIat: "2700.0s (45m)",
      entropy: 7.85,
      reconstructionMse: 0.894,
      verdict: "🚨 CRITICAL ALERT: AI Anomaly Detected (Zero-Day APT Beacon)",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Autoencoder Reconstruction Loss (MSE = 0.894) wildly exceeded threshold (0.350) due to extreme IAT periodicity and high payload entropy (7.85 bits/byte), uncovering the covert C2 channel."
    },
    syn_flood_volumetric: {
      id: "syn_flood_volumetric",
      label: "High-Rate TCP SYN Flood (25,000 Embryonic Sessions / Sec)",
      duration: "1.0s",
      packets: 25000,
      bytes: 1500000,
      meanIat: "0.04ms",
      entropy: 2.1,
      reconstructionMse: 1.450,
      verdict: "🚨 CRITICAL ALERT: Volumetric Rate & SYN/ACK Ratio Anomaly",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700",
      explanation: "Both Isolation Forest and Autoencoder flagged extreme volumetric outlier scores (MSE = 1.450), triggering automated rate-limiting."
    },
    normal_https_web: {
      id: "normal_https_web",
      label: "Normal Citizen Banking Session (Encrypted HTTPS TLS 1.3)",
      duration: "8.5s",
      packets: 52,
      bytes: 28400,
      meanIat: "163.4ms",
      entropy: 4.2,
      reconstructionMse: 0.082,
      verdict: "✔ CLEAN FLOW (Within Normal Latent Manifold)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      explanation: "Reconstruction Loss (MSE = 0.082) remained well below anomaly threshold (0.350); classified as clean normal traffic."
    }
  };

  // Studio 3: Performance Calculations
  const calculatedGpuMetrics = useMemo(() => {
    // Flow vectors processed per second (Million Metrics/Sec)
    const totalFeatureIngestionMillions = ((flowsPerSecondThousands * 1000 * featureVectorDimensions) / 1000000).toFixed(2);

    // Estimated daily false positive alerts
    const falsePositiveRatePercent = autoencoderThreshold < 0.25 ? 1.8 : (autoencoderThreshold < 0.45 ? 0.15 : 0.02);
    const dailyFalseAlerts = Math.round(((flowsPerSecondThousands * 1000 * 86400 * falsePositiveRatePercent) / 100));

    // 5-Year AI Inference Cluster TCO (INR ₹ Lakhs)
    const gpuServerHardwareLakhs = (14.5 + (flowsPerSecondThousands / 100) * 3.8).toFixed(2);
    const retrainingOpsLakhs = (modelRetrainingFrequencyDays * 0.12).toFixed(2);
    const fiveYearTcoLakhs = (Number(gpuServerHardwareLakhs) + Number(retrainingOpsLakhs) * 5 + 8.0).toFixed(2);

    return {
      totalFeatureIngestionMillions,
      dailyFalseAlerts,
      fiveYearTcoLakhs
    };
  }, [flowsPerSecondThousands, featureVectorDimensions, autoencoderThreshold, modelRetrainingFrequencyDays]);

  // Studio 4: Regional West Bengal Scenarios
  const regionalDrills = {
    saltlake_fintech_cloud: {
      id: "saltlake_fintech_cloud",
      title: "Salt Lake Sector V Interbank Cloud Exchange AI Defense Drill",
      location: "Sector V, Salt Lake City, Kolkata, West Bengal",
      aiArchitecture: "Deep Autoencoder (Reconstruction MSE) + XGBoost Ensemble",
      threatScenario: "Adversaries deployed a stealthy fileless PowerShell beacon communicating with foreign infrastructure every 45 minutes, evading static Snort rules.",
      solution: "Sukanta Hui and Mahima deployed an Autoencoder Deep Learning model streaming 22 flow features. The model flagged the periodic beaconing flow with an abnormal MSE of 0.894 (threshold 0.350).",
      outcome: "Zero-day command channel severed within 1.2 seconds; infected node isolated; 100% telemetry preserved for statutory CERT-In audit."
    },
    barrackpore_substation_ai: {
      id: "barrackpore_substation_ai",
      title: "Barrackpore Power Grid Substation SCADA Anomaly Profiling",
      location: "Barrackpore, North 24 Parganas, West Bengal",
      aiArchitecture: "One-Class SVM (OC-SVM) Baseline Model on DNP3 Protocols",
      threatScenario: "Simulated unauthorized industrial protocol injection attempting to trip circuit breakers with abnormal function codes.",
      solution: "Mamata, Abhronila, and Susmita trained an OC-SVM exclusively on 30 days of verified clean grid telemetry. When the attack injected anomalous function code sequences, the OC-SVM flagged the boundary deviation.",
      outcome: "Zero grid disruption; unauthorized command blocked before execution; verified 100% DPDP Act and CERT-In compliance."
    }
  };

  const currentParadigm = mlParadigms[selectedMlParadigmKey];
  const currentScenario = flowScenarios[selectedFlowScenario];
  const currentDrill = regionalDrills[activeDrillId];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER SECTION */}
        <header className="text-center space-y-4 border-b border-slate-800 pb-8 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-800/80 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span>🛡️ Module 005_002 • Topic 4</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Statistical Anomaly Detection &amp; Machine Learning in IDS
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Master the mathematical and cognitive frontiers of intrusion detection. Understand <strong className="text-sky-400">Deep Autoencoders &amp; Reconstruction Loss (MSE)</strong>, <strong className="text-emerald-400">Isolation Forests</strong>, Flow Feature Extraction (IAT, Shannon Entropy), and defending against <strong className="text-purple-400">Adversarial Evasion &amp; Model Poisoning</strong>.
          </p>
        </header>

        {/* SECTION 1: AUTOENCODER & FEATURE EXTRACTION SVG */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-sky-400">01.</span> Neural Autoencoder Architecture &amp; Reconstruction Error Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing how input flow vectors are compressed into a low-dimensional latent bottleneck and reconstructed to calculate Mean Squared Error (MSE).
            </p>
          </div>

          {/* SVG 1: AUTOENCODER PIPELINE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Input Feature Vector (X) ➔ Bottleneck (Z) ➔ Reconstructed Vector (X') ➔ MSE Loss
              </span>
              <span className="text-[11px] text-gray-400 font-mono">Deep Learning Anomaly Model</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center overflow-x-auto">
              <svg
                id={svgAutoencoderId}
                viewBox="0 0 850 280"
                className="w-full max-w-4xl h-auto"
                aria-label="Deep Autoencoder Anomaly Detection Diagram"
              >
                {/* INPUT LAYER */}
                <rect x="30" y="40" width="160" height="200" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="110" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                  INPUT FLOW VECTOR (X)
                </text>
                <text x="110" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Flow Duration (s)</text>
                <text x="110" y="112" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Total Packets &amp; Bytes</text>
                <text x="110" y="134" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Packet IAT Mean &amp; Var</text>
                <text x="110" y="156" fill="#ffffff" fontSize="7.5" textAnchor="middle">• SYN / ACK Ratio</text>
                <text x="110" y="178" fill="#ffffff" fontSize="7.5" textAnchor="middle">• Shannon Flow Entropy</text>
                <text x="110" y="200" fill="#ffffff" fontSize="7.5" textAnchor="middle">• TCP Window Size</text>
                <text x="110" y="222" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">22 Raw Dimensions</text>

                {/* ENCODER ARROWS */}
                <path d="M 190 140 L 260 140" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="225" y="132" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">ENCODER</text>

                {/* LATENT BOTTLENECK LAYER */}
                <rect x="260" y="80" width="120" height="120" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="320" y="105" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">
                  LATENT SPACE (Z)
                </text>
                <text x="320" y="130" fill="#a5b4fc" fontSize="7.5" textAnchor="middle">Bottleneck Core</text>
                <text x="320" y="150" fill="#e0e7ff" fontSize="7.5" textAnchor="middle">Compressed Manifold</text>
                <text x="320" y="175" fill="#fde68a" fontSize="8" fontWeight="bold" textAnchor="middle">4 Dimensions</text>

                {/* DECODER ARROWS */}
                <path d="M 380 140 L 450 140" stroke="#6366f1" strokeWidth="2.5" />
                <text x="415" y="132" fill="#6366f1" fontSize="8" fontWeight="bold" textAnchor="middle">DECODER</text>

                {/* RECONSTRUCTED OUTPUT */}
                <rect x="450" y="40" width="160" height="200" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                <text x="530" y="65" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  RECONSTRUCTED (X')
                </text>
                <text x="530" y="90" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">Duration Reconstructed</text>
                <text x="530" y="112" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">Packets Reconstructed</text>
                <text x="530" y="134" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">IAT Reconstructed</text>
                <text x="530" y="156" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">SYN Ratio Reconstructed</text>
                <text x="530" y="178" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">Entropy Reconstructed</text>
                <text x="530" y="200" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">Window Reconstructed</text>
                <text x="530" y="222" fill="#fde68a" fontSize="7.5" fontWeight="bold" textAnchor="middle">22 Output Dimensions</text>

                {/* COMPARATOR ARROW */}
                <path d="M 610 140 L 660 140" stroke="#10b981" strokeWidth="2.5" />

                {/* MSE LOSS EVALUATOR */}
                <rect x="660" y="70" width="160" height="140" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                <text x="740" y="95" fill="#fee2e2" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  MSE LOSS EVALUATOR
                </text>
                <text x="740" y="118" fill="#fca5a5" fontSize="7.5" textAnchor="middle">MSE = (1/K) Σ (x_i - x'_i)²</text>

                <rect x="675" y="135" width="130" height="30" rx="4" fill="#7f1d1d" />
                <text x="740" y="154" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  Loss &gt; 0.35 ➔ ALERT!
                </text>

                <text x="740" y="185" fill="#fecaca" fontSize="7" textAnchor="middle">
                  Zero-Day Outlier Identified
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* STUDIO 1: ML PARADIGMS EXPLORER */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">02.</span> Studio 1: Machine Learning Paradigms for Intrusion Detection
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore the algorithms, training datasets, detection capabilities, and operational limits of Supervised, Unsupervised, and Semi-Supervised models.
              </p>
            </div>
            <span className={clsx("px-3 py-1 rounded border text-xs font-mono self-start sm:self-auto", currentParadigm.badgeColor)}>
              AI Paradigm
            </span>
          </div>

          {/* Paradigm Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {Object.values(mlParadigms).map((p) => (
              <button
                key={p.key}
                onClick={() => setSelectedMlParadigmKey(p.key)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border",
                  selectedMlParadigmKey === p.key
                    ? "bg-slate-800 text-white border-sky-500 shadow-md shadow-sky-500/10"
                    : "bg-slate-950 text-gray-400 border-slate-800 hover:text-gray-200 hover:border-slate-700"
                )}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Paradigm Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{currentParadigm.title}</h3>
                <span className="text-gray-400 font-mono">Algorithms: {currentParadigm.algorithms}</span>
              </div>
              <span className={clsx("px-2.5 py-1 rounded-full text-xs font-mono border self-start sm:self-auto", currentParadigm.badgeColor)}>
                Active Model
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                📊 Training Data Requirements:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentParadigm.trainingData}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                  ✔ Core Strengths &amp; Advantages:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentParadigm.strengths}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-rose-950/80 space-y-1">
                <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px] block">
                  ⚠️ Operational Limitations &amp; Blind Spots:
                </span>
                <p className="text-gray-300 leading-relaxed">{currentParadigm.limitations}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO 2: LIVE AUTOENCODER SIMULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">03.</span> Studio 2: Live AI Threat Detection &amp; Reconstruction Loss Simulator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Ingest covert APT beacons, volumetric SYN floods, and clean web flows to observe how the neural autoencoder calculates Reconstruction Error (MSE).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 text-xs font-mono self-start sm:self-auto">
              Autoencoder Core
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Select Network Flow Scenario:</label>
              <select
                value={selectedFlowScenario}
                onChange={(e) => setSelectedFlowScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-gray-200 focus:border-sky-500 focus:outline-none"
              >
                {Object.values(flowScenarios).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Autoencoder Anomaly Threshold (MSE θ):</label>
              <input
                type="range"
                min="0.15"
                max="0.75"
                step="0.05"
                value={autoencoderThreshold}
                onChange={(e) => setAutoencoderThreshold(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
              <span className="text-[10px] text-gray-400 font-mono">Current Threshold θ = {autoencoderThreshold}</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-300 font-semibold block">Isolation Forest Outlier Ensemble:</label>
              <button
                onClick={() => setIsolationForestActive(!isolationForestActive)}
                className={clsx(
                  "w-full p-2 rounded-lg text-xs font-semibold border transition-all",
                  isolationForestActive
                    ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                    : "bg-slate-950 text-gray-400 border-slate-800"
                )}
              >
                {isolationForestActive ? "✔ Isolation Forest Active" : "❌ Tree Ensemble Disabled"}
              </button>
            </div>
          </div>

          {/* Execution Result Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Simulated Ingress Flow Feature Vector:
                </span>
                <span className="text-white font-bold text-sm">{currentScenario.label}</span>
                <span className="text-gray-400 text-xs block">
                  Duration: {currentScenario.duration} • Packets: {currentScenario.packets} • Bytes: {currentScenario.bytes} • Mean IAT: {currentScenario.meanIat} • Shannon Entropy: {currentScenario.entropy}
                </span>
              </div>
              <span className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-extrabold font-mono border self-start sm:self-auto",
                currentScenario.reconstructionMse > autoencoderThreshold
                  ? "bg-rose-950 text-rose-300 border-rose-700"
                  : "bg-emerald-950 text-emerald-300 border-emerald-700"
              )}>
                {currentScenario.reconstructionMse > autoencoderThreshold
                  ? `🚨 ANOMALY ALERT (MSE: ${currentScenario.reconstructionMse} > θ)`
                  : `✔ NORMAL FLOW (MSE: ${currentScenario.reconstructionMse} <= θ)`}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-sans">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-[10px] block">
                Model Evaluation &amp; Reconstruction Logic:
              </span>
              <p className="text-gray-300 leading-relaxed">{currentScenario.explanation}</p>
            </div>
          </div>
        </section>

        {/* PYTHON LAB: AUTOENCODER MODEL CODE */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">04.</span> Python Forensic Lab: Deep Autoencoder &amp; Isolation Forest Engine
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Inspect the Python implementation calculating flow feature vectors, neural compression, and Mean Squared Error (MSE) loss.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-gray-300 text-xs font-mono self-start sm:self-auto">
              ml_ids_model.py
            </span>
          </div>

          <PythonFileLoader
            fileModule={pythonCode}
            title="ml_ids_model.py"
            highlightLines={[25, 41, 55, 68]}
          />
        </section>

        {/* STUDIO 3: GPU SIZING & RETRAINING CALCULATOR */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">05.</span> Studio 3: ML Model Ingestion Rate, Retraining &amp; TCO Calculator
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Calculate real-time feature vector ingestion rates, daily false alarm estimates, and 5-year GPU cluster inference TCO in INR (₹).
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-mono self-start sm:self-auto">
              AI Sizing Engine
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Ingress Flow Rate:</span>
                <span className="text-sky-400 font-bold">{flowsPerSecondThousands}k Flows/Sec</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={flowsPerSecondThousands}
                onChange={(e) => setFlowsPerSecondThousands(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Feature Dimensions:</span>
                <span className="text-purple-400 font-bold">{featureVectorDimensions} Dimensions</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="2"
                value={featureVectorDimensions}
                onChange={(e) => setFeatureVectorDimensions(Number(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Model Retraining Cycle:</span>
                <span className="text-emerald-400 font-bold">Every {modelRetrainingFrequencyDays} Days</span>
              </div>
              <input
                type="range"
                min="7"
                max="60"
                step="7"
                value={modelRetrainingFrequencyDays}
                onChange={(e) => setModelRetrainingFrequencyDays(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Sizing Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-sky-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Feature Ingestion Speed</span>
              <div className="text-2xl font-extrabold text-sky-400 font-mono">{calculatedGpuMetrics.totalFeatureIngestionMillions} M/sec</div>
              <span className="text-[10px] text-gray-500 block">Real-Time Vector Pipeline</span>
            </div>

            <div className="p-4 bg-slate-950 border border-rose-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Estimated Daily False Alerts</span>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">~{calculatedGpuMetrics.dailyFalseAlerts.toLocaleString()} /day</div>
              <span className="text-[10px] text-gray-500 block">Requires Baseline Retraining</span>
            </div>

            <div className="p-4 bg-slate-950 border border-purple-950/80 rounded-xl space-y-1">
              <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">5-Year AI Cluster TCO</span>
              <div className="text-2xl font-extrabold text-purple-400 font-mono">₹{calculatedGpuMetrics.fiveYearTcoLakhs} Lakhs</div>
              <span className="text-[10px] text-gray-500 block">GPU Inference Nodes + MLOps</span>
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
                <span className="text-gray-400">Location: {currentDrill.location} • AI Model: {currentDrill.aiArchitecture}</span>
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
              <span className="text-sky-400 font-bold uppercase tracking-wider block">🛡️ AI Defense Execution:</span>
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
                <span>Supervised ML (Random Forest/XGBoost) detects known attacks; Unsupervised ML (Isolation Forest) detects zero-days.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Autoencoder anomaly detection flags intrusions when Reconstruction Error (MSE) exceeds threshold θ.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>One-Class SVM (OC-SVM) is trained exclusively on clean baseline network traffic.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Feature engineering extracts temporal, volumetric, and Shannon entropy metrics from network flows.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>Adversarial Evasion attacks perturb feature vectors to bypass ML classifier decision boundaries.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-slate-900 rounded border border-slate-800">
                <span className="text-emerald-400">✔</span>
                <span>CERT-In mandates 180-day retention of all ML anomaly telemetry synchronized with NPL India NTP servers.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 30 COMPREHENSIVE PRACTICE QUESTIONS & ANSWERS */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <FAQTemplate
            title="Statistical Anomaly & Machine Learning in IDS FAQs"
            subtitle="30 In-depth Practice Questions & AI Model Deep Dives"
            questions={questions}
          />
        </section>

        {/* PRINTABLE STUDY GUIDE NOTE */}
        <section className="space-y-4 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
          <PlainTextPrint
            content={noteText}
            title="Statistical Anomaly & Machine Learning in IDS (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* TEACHER SUKANTA HUI PROFILE FOOTER */}
        <footer className="pt-4">
          <Teacher
            note="Teacher's Note: Topic 4 demystifies the practical application of Artificial Intelligence and Machine Learning in modern cybersecurity! Always understand the distinct roles: Supervised models (like Random Forest and XGBoost) excel at categorizing known malware families from labeled data, while Unsupervised models (such as Autoencoders and Isolation Forests) are the ultimate guardians for detecting novel zero-day exploits and subtle APT beaconing by measuring Mean Squared Error (MSE) reconstruction loss. Be vigilant against adversarial machine learning threats like feature perturbation and model poisoning by retraining your models with continuous sliding-window validation. In Topic 5, we will explore Inline vs Tap/SPAN Port Deployment Modes!"
          />
        </footer>

      </div>
    </div>
  );
};

export default Topic4;
