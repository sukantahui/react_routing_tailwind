import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import aiEnginePy from "./topic1_files/ai_ml_cyber_defense.py?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgEntropyId = useId();
  const svgAutoencoderId = useId();

  // =========================================================================
  // STUDIO 1: SUPERVISED PE MALWARE CLASSIFIER
  // =========================================================================
  const [sectionEntropy, setSectionEntropy] = useState(7.45); // 0.0 to 8.0
  const [suspiciousApis, setSuspiciousApis] = useState(6); // 0 to 10
  const [hasValidSignature, setHasValidSignature] = useState(false);

  const malwareClassification = useMemo(() => {
    // Weighted Logistic Regression Sigmoid formula
    const wEntropy = 0.65;
    const wApis = 0.25;
    const wSig = -0.40;
    const bias = -2.8;

    const z = (wEntropy * sectionEntropy) + (wApis * suspiciousApis) + (wSig * (hasValidSignature ? 1.0 : 0.0)) + bias;
    const probability = (1.0 / (1.0 + Math.exp(-z))) * 100.0;
    const isMalware = probability >= 50.0;

    let verdict = "";
    let badgeColor = "";
    let reasoning = "";

    if (isMalware) {
      verdict = "MALICIOUS PE BINARY DETECTED 🚨 (Ransomware / Dropper)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      reasoning = `High entropy (${sectionEntropy.toFixed(2)}/8.0) combined with ${suspiciousApis} dangerous process-injection APIs (VirtualAlloc, CreateRemoteThread) indicates packed or encrypted ransomware payload.`;
    } else {
      verdict = "BENIGN SOFTWARE EXECUTABLE ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      reasoning = `Normal code entropy (${sectionEntropy.toFixed(2)}) and standard API usage within expected software parameters.`;
    }

    return { probability: probability.toFixed(1), isMalware, verdict, badgeColor, reasoning };
  }, [sectionEntropy, suspiciousApis, hasValidSignature]);

  // =========================================================================
  // STUDIO 2: UNSUPERVISED NETWORK ANOMALY DETECTOR
  // =========================================================================
  const [packetRate, setPacketRate] = useState(750); // Pkts/sec (Baseline 120)

  const anomalyDetection = useMemo(() => {
    const baselineMean = 120.0;
    const baselineStd = 25.0;
    const zScore = Math.abs(packetRate - baselineMean) / baselineStd;
    const isAnomaly = zScore > 3.0;

    let verdict = "";
    let badgeColor = "";
    let explanation = "";

    if (isAnomaly) {
      verdict = "UNSUPERVISED ANOMALY TRIGGERED 🚨 (DDoS / Exfiltration)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      explanation = `Packet burst rate (${packetRate} pkts/sec) is ${zScore.toFixed(1)} standard deviations above baseline ($Z > 3.0$). Autoencoder reconstruction loss exceeded threshold!`;
    } else {
      verdict = "NORMAL TRAFFIC PATTERN ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      explanation = `Packet rate is within normal statistical distribution variance ($Z = ${zScore.toFixed(1)} \\le 3.0$).`;
    }

    return { zScore: zScore.toFixed(1), isAnomaly, verdict, badgeColor, explanation };
  }, [packetRate]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_xgboost");

  const regionalDrills = {
    barrackpore_xgboost: {
      id: "barrackpore_xgboost",
      title: "Barrackpore Municipal Treasury: XGBoost Email Malware Gateway",
      location: "Financial communications core filtering 15,000 daily incoming attachments",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Adversaries sent polymorphic Excel macro droppers with high entropy sections disguised as vendor tax receipts.",
      solution:
        "Trained an XGBoost gradient-boosted decision tree on 500,000 PE features with SHAP explainability for SOC analysts.",
      outcome:
        "99.4% detection of zero-day malware droppers; reduced false positive alerts by 94% using digital signature whitelisting."
    },
    kolkata_fintech_autoencoder: {
      id: "kolkata_fintech_autoencoder",
      title: "Salt Lake Sector V FinTech: Deep Autoencoder C2 Discovery",
      location: "Cross-border remittance microservice cluster with 80 production nodes",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Stealthy APT actors deployed an encrypted low-frequency Cobalt Strike C2 beacon transmitting 1 packet every 45 seconds.",
      solution:
        "Deployed Deep Autoencoders trained on East-West NetFlow inter-arrival times, detecting periodic micro-variance anomalies.",
      outcome:
        "Uncovered hidden C2 beaconing channel within 12 minutes of lateral probe; zero customer data exfiltrated."
    },
    ichapur_defense_anti_evasion: {
      id: "ichapur_defense_anti_evasion",
      title: "Ichapur Defense Facility: Adversarial Perturbation Hardening",
      location: "Air-gapped defense manufacturing CAD repositories and binary inspection gates",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries appended benign byte padding to malicious binaries to manipulate AI classifier feature vectors (Evasion Attack).",
      solution:
        "Retrained deep CNN models using adversarial data augmentation (incorporating synthetic perturbed samples) and multi-engine verification.",
      outcome:
        "Eliminated adversarial evasion blind spots; certified 99.8% robustness against adversarial ML perturbations."
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
                  Module 005_006 • Topic 1
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Artificial Intelligence &amp; Machine Learning in Cyber Defense
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
            Machine learning has revolutionized cyber defense by providing high-dimensional statistical pattern recognition across vast volumes of security telemetry.
            Explore <strong>Supervised Learning for PE malware classification</strong>, analyze <strong>Unsupervised Deep Autoencoders for zero-day network anomaly detection</strong>, 
            understand the <strong>Base Rate Fallacy</strong> in highly imbalanced datasets, and master <strong>SHAP explainability</strong> in modern SOC operations.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: SUPERVISED PE MALWARE CLASSIFIER */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🤖</span> Studio 1: Supervised PE Static Malware Classifier Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Adjust section Shannon entropy and dangerous API counts to observe real-time machine learning probability scoring.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", malwareClassification.badgeColor)}>
              {malwareClassification.verdict}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Extracted Static PE Features
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Section Shannon Entropy ($H$):</span>
                  <span className="font-mono text-cyan-400">{sectionEntropy.toFixed(2)} / 8.0 ({sectionEntropy > 7.2 ? "Packed/Encrypted 🚨" : "Plaintext Code ✔"})</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="8.0"
                  step="0.05"
                  value={sectionEntropy}
                  onChange={(e) => setSectionEntropy(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Suspicious Injection APIs (VirtualAlloc, CreateRemoteThread):</span>
                  <span className="font-mono text-rose-400 font-bold">{suspiciousApis} APIs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={suspiciousApis}
                  onChange={(e) => setSuspiciousApis(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer pt-2">
                <div>
                  <div className="font-semibold text-white">Valid Authenticode Digital Signature</div>
                  <div className="text-[10px] text-slate-400">Signed by trusted software vendor CA</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasValidSignature}
                  onChange={(e) => setHasValidSignature(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Malware Probability Score</span>
                  <span className={clsx("font-mono text-2xl font-black", malwareClassification.isMalware ? "text-rose-400" : "text-emerald-400")}>
                    {malwareClassification.probability}%
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {malwareClassification.reasoning}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Feature Importance: </strong> Section entropy contributes 65% of weight, while suspicious memory injection APIs contribute 25% of the malicious score.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: UNSUPERVISED NETWORK ANOMALY DETECTOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📡</span> Studio 2: Unsupervised Network Anomaly Detector (Z-Score / Autoencoder)
              </h2>
              <p className="text-xs text-slate-400">
                Slide the NetFlow packet burst rate to observe statistical anomaly detection without pre-existing attack signatures.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", anomalyDetection.badgeColor)}>
              {anomalyDetection.verdict}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Live NetFlow Telemetry Control
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Packet Rate (Packets / Second):</span>
                  <span className="font-mono text-cyan-400 font-bold">{packetRate} pkts/sec</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1200"
                  step="25"
                  value={packetRate}
                  onChange={(e) => setPacketRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>50 (Low)</span>
                  <span>120 (Baseline Mean)</span>
                  <span>300</span>
                  <span>1200 (Extreme Burst)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Statistical Z-Score</span>
                  <span className={clsx("font-mono text-xl font-extrabold", anomalyDetection.isAnomaly ? "text-rose-400" : "text-emerald-400")}>
                    Z = {anomalyDetection.zScore}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {anomalyDetection.explanation}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Unsupervised Detection Advantage: </strong> Detects novel attacks and zero-days purely by measuring mathematical deviation from baseline behavior.
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
                Case studies of XGBoost static malware analysis, deep autoencoder C2 detection, and adversarial defense in regional SOCs.
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
                  {key === "barrackpore_xgboost" ? "Barrackpore XGBoost" : key === "kolkata_fintech_autoencoder" ? "Kolkata Autoencoder" : "Ichapur Anti-Evasion"}
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
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Vector</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">AI Model Architecture</span>
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
                <span><strong>Relying on Raw Accuracy in Imbalanced Datasets:</strong> A model with 99.9% accuracy can miss 100% of cyber attacks (Base Rate Fallacy).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Adversarial Evasion Attacks:</strong> Attackers append benign byte padding to fool static ML models unless adversarial training is used.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Deploying Black-Box Models without Explainability:</strong> Analysts cannot act on alarms without SHAP/LIME feature justifications.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> AI Cyber Defense Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Optimize for Precision-Recall (PR-AUC):</strong> Tune operating decision thresholds to minimize false alarms while preserving high threat recall.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Combine Supervised and Unsupervised Models:</strong> Use XGBoost for known malware patterns and Autoencoders for zero-day anomalies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Incorporate Digital Signature Whitelisting:</strong> Validate Authenticode certificates to reduce false positive alert volume on trusted software.</span>
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
                Why is Section Shannon Entropy ($H &gt; 7.2$) such a powerful malware feature? Because plaintext compiled code has predictable grammar and structure, whereas encrypted ransomware payloads look mathematically like random noise!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Supervised learning classifies malware using labeled datasets.</li>
                <li>Unsupervised autoencoders detect zero-days via reconstruction loss.</li>
                <li>Shannon entropy ($0.0-8.0$) detects packed and encrypted malware.</li>
                <li>Precision measures alert fidelity; Recall measures threat detection rate.</li>
                <li>SHAP provides explainability for machine learning predictions.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on AI &amp; Machine Learning Cyber Defense Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating PE malware classification, unsupervised network anomaly detection, and evaluation metrics
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={aiEnginePy}
            title="ai_ml_cyber_defense.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Artificial Intelligence &amp; ML in Cyber Defense FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the 3 ML paradigms (Supervised, Unsupervised, Reinforcement Learning) in cyber defense. Detail static PE feature extraction (Section Shannon Entropy, API sequences). Explain why raw Accuracy is misleading due to the Base Rate Fallacy and how Precision, Recall, and F1-Score evaluate models. Describe how Deep Autoencoders detect zero-day network anomalies via reconstruction error."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 1: AI & ML in Cyber Defense Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 1 Note"
            downloadFileName="topic1_ai_ml_defense_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
