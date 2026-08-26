import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import advEnginePy from "./topic3_files/adversarial_ai_analyzer.py?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgDeepfakeId = useId();
  const svgFgsmId = useId();

  // =========================================================================
  // STUDIO 1: MULTI-MODAL DEEPFAKE FORENSICS SIMULATOR
  // =========================================================================
  const [blinkRate, setBlinkRate] = useState(3.0); // Blinks/min (Normal 12-20)
  const [lipSyncDelay, setLipSyncDelay] = useState(130); // ms (Normal < 40)
  const [hasRppgPulse, setHasRppgPulse] = useState(false);
  const [phaseCoherence, setPhaseCoherence] = useState(0.35); // 0.0 to 1.0 (Normal > 0.70)

  const deepfakeResult = useMemo(() => {
    let score = 100;
    if (blinkRate < 5 || blinkRate > 35) score -= 30;
    if (lipSyncDelay &gt; 80) score -= 35;
    if (!hasRppgPulse) score -= 40;
    if (phaseCoherence < 0.60) score -= 25;

    score = Math.max(score, 0);
    const isSynthetic = score < 60;

    let verdict = "";
    let badgeColor = "";
    let explanation = "";

    if (isSynthetic) {
      verdict = "SYNTHETIC DEEPFAKE DETECTED 🚨 (AI Video/Voice Spoof)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      explanation = "Multi-modal forensic failure: Low blink rate, missing biological rPPG cardiac pulse, and desynchronized lip visemes confirm synthetic GAN video stream!";
    } else {
      verdict = "AUTHENTIC BONA FIDE HUMAN VIDEO ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      explanation = "All biological signals (live 72 BPM cardiac pulse, natural 16 blinks/min, and synchronized acoustic harmonics) verified.";
    }

    return { score, isSynthetic, verdict, badgeColor, explanation };
  }, [blinkRate, lipSyncDelay, hasRppgPulse, phaseCoherence]);

  // =========================================================================
  // STUDIO 2: FGSM ADVERSARIAL EVASION SANDBOX
  // =========================================================================
  const [epsilon, setEpsilon] = useState(0.07); // 0.0 to 0.15

  const fgsmResult = useMemo(() => {
    const baseScore = 0.94;
    const perturbedScore = Math.max(Math.min(baseScore - (epsilon * 8.5), 1.0), 0.0);
    const evasionSuccess = perturbedScore < 0.50;

    let status = "";
    let badgeColor = "";

    if (evasionSuccess) {
      status = "CLASSIFIER EVADED 🚨 (Classified as BENIGN)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    } else {
      status = "MALWARE DETECTED ✔ (Robust against Perturbation)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    }

    return {
      perturbedConfidence: (perturbedScore * 100).toFixed(1),
      evasionSuccess,
      status,
      badgeColor
    };
  }, [epsilon]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_deepfake_defense");

  const regionalDrills = {
    barrackpore_deepfake_defense: {
      id: "barrackpore_deepfake_defense",
      title: "Barrackpore Municipal Treasury: Real-Time Deepfake Video Defense",
      location: "Financial disbursement core approving emergency municipal contracts",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Fraudsters impersonated the Treasury Director on a Zoom video call using a real-time GAN deepfake, demanding an emergency wire transfer of ₹45,00,000.",
      solution:
        "Clerk executed visual head-rotation challenge (revealing face mesh boundary glitch) and enforced mandatory out-of-band FIDO2 hardware passkey authorization.",
      outcome:
        "Deepfake call thwarted within 45 seconds; zero municipal funds lost; forensic incident dossier compiled for law enforcement."
    },
    kolkata_fintech_spectral_defense: {
      id: "kolkata_fintech_spectral_defense",
      title: "Salt Lake Sector V FinTech: Spectral Signature Poisoning Defense",
      location: "Credit card fraud machine learning pipeline trained on 2,000,000 transactions",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Rogue insider injected 500 poisoned transactions containing a specific merchant code trigger (BadNets backdoor) to bypass fraud detection.",
      solution:
        "Deployed SVD Spectral Signature analysis, identifying and pruning poisoned clusters along top covariance eigenvectors before training.",
      outcome:
        "Backdoor trigger neutralized completely; certified 99.9% clean model training integrity."
    },
    ichapur_defense_pgd_hardening: {
      id: "ichapur_defense_pgd_hardening",
      title: "Ichapur Defense Facility: PGD Adversarial Training Hardening",
      location: "Air-gapped defense manufacturing binary inspection and anti-malware gateway",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries crafted Fast Gradient Sign Method (FGSM) byte perturbations on malware droppers to bypass static neural network classifiers.",
      solution:
        "Retrained deep CNN models using Projected Gradient Descent (PGD) adversarial training, generating 100,000 synthetic adversarial samples.",
      outcome:
        "Model robustness against gradient evasion increased from 42% to 99.4%; defeated all adversarial perturbation tests."
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
                <span className="px-3 py-1 bg-rose-950 text-rose-400 border border-rose-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 3
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Adversarial AI: Deepfakes, AI-Crafted Phishing &amp; Model Poisoning
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-rose-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            As artificial intelligence empowers cyber defense, adversaries weaponize AI algorithms to execute unprecedented attacks.
            Explore <strong>Deepfake Video &amp; Voice Cloning forensics</strong> (rPPG blood pulse and acoustic phase coherence), analyze 
            <strong>Inference-time Evasion attacks via Fast Gradient Sign Method (FGSM)</strong>, examine 
            <strong>Training-time Data Poisoning (BadNets Backdoors)</strong>, and master <strong>Adversarial PGD Training</strong> mitigations.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: MULTI-MODAL DEEPFAKE FORENSICS */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🎭</span> Studio 1: Multi-Modal Deepfake Video &amp; Voice Forensic Analyzer
              </h2>
              <p className="text-xs text-slate-400">
                Adjust biological and acoustic telemetry to test multi-modal forensic detection algorithms on synthetic media.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", deepfakeResult.badgeColor)}>
              {deepfakeResult.verdict}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Biological &amp; Signal Telemetry Controls
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Eye Blink Rate:</span>
                  <span className="font-mono text-cyan-400">{blinkRate.toFixed(1)} blinks/min ({blinkRate &ge; 10 && blinkRate &le; 22 ? "Normal Human ✔" : "Abnormal AI Artifact 🚨"})</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="40.0"
                  step="0.5"
                  value={blinkRate}
                  onChange={(e) => setBlinkRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                /&gt;
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Viseme-Phoneme Lip Sync Delay:</span>
                  <span className="font-mono text-amber-400 font-bold">{lipSyncDelay} ms ({lipSyncDelay &le; 40 ? "Synchronized ✔" : "AI Desynchronized 🚨"})</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={lipSyncDelay}
                  onChange={(e) => setLipSyncDelay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                /&gt;
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Acoustic Spectral Phase Coherence:</span>
                  <span className="font-mono text-purple-400 font-bold">{phaseCoherence.toFixed(2)} ({phaseCoherence &ge; 0.7 ? "Natural Voice ✔" : "Neural Cloned Audio 🚨"})</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="1.00"
                  step="0.05"
                  value={phaseCoherence}
                  onChange={(e) => setPhaseCoherence(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                /&gt;
              </div>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer pt-2">
                <div>
                  <div className="font-semibold text-white">Biological rPPG Cardiac Blood Pulse Detected</div>
                  <div className="text-[10px] text-slate-400">Measures sub-dermal capillary blood pulsation</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasRppgPulse}
                  onChange={(e) => setHasRppgPulse(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                /&gt;
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Human Authenticity Score</span>
                  <span className={clsx("font-mono text-2xl font-black", deepfakeResult.isSynthetic ? "text-rose-400" : "text-emerald-400")}>
                    {deepfakeResult.score} / 100
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {deepfakeResult.explanation}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Forensic Architecture: </strong> Combines biological pulse oximetry, involuntary ophthalmic saccades, and high-frequency Fourier phase harmonics.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: FGSM ADVERSARIAL EVASION SANDBOX */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🧪</span> Studio 2: Fast Gradient Sign Method (FGSM) Adversarial Evasion Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Increase adversarial noise epsilon ($\epsilon$) to observe how tiny mathematical perturbations fool neural network malware classifiers.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", fgsmResult.badgeColor)}>
              {fgsmResult.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                FGSM Adversarial Perturbation Control
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Adversarial Epsilon Magnitude ($\epsilon$):</span>
                  <span className="font-mono text-rose-400 font-bold">$\epsilon = {epsilon.toFixed(3)}$</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.14"
                  step="0.005"
                  value={epsilon}
                  onChange={(e) => setEpsilon(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                /&gt;
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.0 (Clean Input)</span>
                  <span>0.05</span>
                  <span>0.14 (Strong Perturbation)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                <div>{"$x_adv = x + \\epsilon \\cdot \sign(\\nabla_x L(\\theta, x, y))$"}</div>
                <div className="text-[10px] text-slate-400">Adds imperceptible byte noise in the direction of the loss gradient.</div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classifier Malware Confidence</span>
                  <span className={clsx("font-mono text-2xl font-black", fgsmResult.evasionSuccess ? "text-emerald-400" : "text-rose-400")}>
                    {fgsmResult.perturbedConfidence}%
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {fgsmResult.evasionSuccess
                    ? "EVASION SUCCESSFUL: The classifier's confidence dropped below 50%, causing the malicious binary to be misclassified as a safe benign file!"
                    : "DETECTION MAINTAINED: Model confidence remains above 50%; malware detected despite adversarial noise."}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Mitigation: </strong> Deploy Projected Gradient Descent (PGD) adversarial training to expand neural decision boundaries against mathematical noise.
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
                Case studies of deepfake video BEC defenses, spectral signature poisoning audits, and PGD hardening in regional hubs.
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
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key === "barrackpore_deepfake_defense" ? "Barrackpore Deepfake" : key === "kolkata_fintech_spectral_defense" ? "Kolkata Spectral Audit" : "Ichapur PGD Hardening"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-rose-400 font-mono bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
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
                <span className="font-bold text-purple-400 uppercase text-[10px] tracking-wider block">Adversarial AI Defense</span>
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
                <span><strong>Relying on Video/Voice Confirmation for Fund Transfers:</strong> Generative AI deepfakes clone executive faces and voices in real time; mandate cryptographic out-of-band FIDO2 authorization.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Training ML Models on Unvetted Datasets:</strong> Allows adversaries to inject BadNets backdoor triggers that cause targeted misclassifications in production.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Adversarial Evasion Perturbations:</strong> Unhardened neural networks can be fooled by tiny FGSM byte modifications.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Adversarial AI Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Multi-Modal Deepfake Forensics:</strong> Verify biological rPPG pulse, acoustic phase coherence, and head-rotation mesh integrity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement PGD Adversarial Training:</strong> Harden classifier decision boundaries against gradient-based evasion attacks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Filter Training Data with Spectral SVD Analysis:</strong> Prune poisoned data clusters before optimizing model weights.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-rose-300">Think About:</span>
              <p className="leading-relaxed">
                Why does asking a video caller to turn their head 90 degrees expose deepfakes? Because 2D GAN face-swap models render faces from a front-facing perspective; extreme profile angles cause the edge blending mesh to stretch and glitch!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>FGSM adds noise in the direction of the loss gradient to fool classifiers.</li>
                <li>BadNets backdoors trigger targeted misclassifications during inference.</li>
                <li>rPPG measures skin micro-color changes from cardiac blood pulse.</li>
                <li>Adversarial PGD training hardens models against evasion noise.</li>
                <li>C2PA cryptographically signs media to verify authentic origin.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-950 border border-rose-800 text-rose-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Adversarial AI &amp; Deepfake Forensics Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating deepfake multi-modal forensics, FGSM evasion perturbations, and BadNets data poisoning
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={advEnginePy}
            title="adversarial_ai_analyzer.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Adversarial AI, Deepfakes &amp; Model Poisoning FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the 3 categories of Adversarial ML (Data Poisoning, Inference-time Evasion via FGSM, and Model Privacy). Detail the mathematical formula of the Fast Gradient Sign Method (FGSM). Explain the biological forensic indicators used to detect synthetic deepfakes (rPPG cardiac blood pulse, blink rates, and lip-audio synchronization). Explain how out-of-band cryptographic FIDO2 authorization neutralizes executive video fraud."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Adversarial AI & Deepfakes Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 3 Note"
            downloadFileName="topic3_adversarial_ai_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
