import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import biometricEnginePy from "./topic6_files/biometric_matching_engine.py?raw";

const Topic6 = () => {
  // Unique SVG IDs
  const svgFingerprintId = useId();
  const svgFaceId = useId();
  const svgIrisId = useId();

  // =========================================================================
  // STUDIO 1: MULTI-MODAL BIOMETRIC MATCHING ENGINE
  // =========================================================================
  const [selectedModality, setSelectedModality] = useState("fingerprint"); // "fingerprint", "face", "iris"

  const modalityDetails = {
    fingerprint: {
      name: "Fingerprint Minutiae Matching (ISO/IEC 19794-2)",
      features: "Ridge Endings, Bifurcations, Core & Delta Points",
      metric: "Minutiae Spatial Euclidean Distance & Orientation Angle Diff",
      threshold: "Score &ge; 75% Minutiae Agreement",
      typicalEer: "~0.1% Equal Error Rate",
      probeScore: "88.4%",
      verdict: "MATCH VERIFIED ✔: 24/28 Minutiae Points aligned within 10-pixel radius.",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700"
    },
    face: {
      name: "3D Facial Deep Landmark Embeddings (ArcFace / FaceNet)",
      features: "128-Dimensional Normalized Vector Embeddings (Hypersphere)",
      metric: "Cosine Similarity: (A · B) / (||A|| * ||B||)",
      threshold: "Cosine Similarity >= 0.82",
      typicalEer: "~0.05% Equal Error Rate (with 3D IR Mesh)",
      probeScore: "0.914 Similarity",
      verdict: "MATCH VERIFIED ✔: High confidence vector alignment on 68 landmark points.",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-700"
    },
    iris: {
      name: "Daugman's IrisCode Recognition (2D Gabor Wavelets)",
      features: "2048-bit Phase Demodulation Binary Code + Noise Mask",
      metric: "Fractional Hamming Distance: HD = sum(A XOR B) / N",
      threshold: "Hamming Distance HD &le; 0.32 (<= 32% bit difference)",
      typicalEer: "~1 in 4 Million (Highest Unique Entropy)",
      probeScore: "HD = 0.184 (81.6% Bit Match)",
      verdict: "MATCH VERIFIED ✔: Extreme confidence iris muscle trabecular match.",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    }
  };

  const currentModality = modalityDetails[selectedModality];

  // =========================================================================
  // STUDIO 2: PRESENTATION ATTACK DETECTION (PAD / LIVENESS SANDBOX)
  // =========================================================================
  const [has3dDepth, setHas3dDepth] = useState(true);
  const [hasThermalHeat, setHasThermalHeat] = useState(true);
  const [hasMicroBlink, setHasMicroBlink] = useState(true);

  const livenessResult = useMemo(() => {
    let score = 0;
    if (has3dDepth) score += 40;
    if (hasThermalHeat) score += 35;
    if (hasMicroBlink) score += 25;

    let status = "";
    let badgeColor = "";
    let description = "";

    if (score &ge; 75) {
      status = "LIVE HUMAN VERIFIED ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      description = "All physical biometric indicators (3D depth curvature, 36.8°C thermal signature, and micro-blink dynamics) confirmed. Presentation attack rejected.";
    } else {
      status = "PRESENTATION ATTACK DETECTED (SPOOF REJECTED) 🚨";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      description = "Artifact failure detected! The presentation matches a 2D photograph, printed silicon mask, or tablet screen playback. Access blocked.";
    }

    return { score, status, badgeColor, description };
  }, [has3dDepth, hasThermalHeat, hasMicroBlink]);

  // =========================================================================
  // STUDIO 3: CANCELLABLE BIOMETRICS (BIOHASHING SANDBOX)
  // =========================================================================
  const [transformKeyId, setTransformKeyId] = useState("Key_A"); // "Key_A", "Key_B"

  const bioHashOutputs = {
    Key_A: {
      name: "Transform Matrix Key Alpha (Seed: 0x9F42A1)",
      hashOutput: "c8e19b44f2d70318aa90c834e591720d",
      correlationWithOther: "0.02 (Completely Uncorrelated)",
      desc: "If this template is leaked in a database breach, revoke Key Alpha and issue Key Beta to instantly renew identity from the same finger."
    },
    Key_B: {
      name: "Transform Matrix Key Beta (Seed: 0x3B887C)",
      hashOutput: "4a73f8e9102c918a24bf6390145de899",
      correlationWithOther: "0.01 (Completely Uncorrelated)",
      desc: "Fresh mathematical template generated from the exact same biological finger without raw biometric exposure."
    }
  };

  const currentBioHash = bioHashOutputs[transformKeyId];

  // =========================================================================
  // STUDIO 4: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_biometrics");

  const regionalDrills = {
    barrackpore_biometrics: {
      id: "barrackpore_biometrics",
      title: "Barrackpore Municipal Treasury: High-Assurance Biometric Authorization",
      location: "Municipal financial disbursement core managing monthly disbursements of ₹85,00,000",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Adversaries attempted proxy attendance and unauthorized treasury approvals using lifted latent prints cast onto conductive gelatin molds (gummy fingers).",
      solution:
        "Deployed ultrasonic 3D sub-dermal fingerprint scanners combined with 3D infrared dot projectors and mandatory liveness pulse oximetry.",
      outcome:
        "100% defeat of presentation spoof attacks; all municipal disbursements authenticated by verified live personnel."
    },
    kolkata_fintech_iris: {
      id: "kolkata_fintech_iris",
      title: "Salt Lake Sector V FinTech: Dual-Eye Iris Recognition Vault Entry",
      location: "Tier-4 data center housing core cryptographic hardware security modules (HSMs)",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "High staff turnover and variable lighting conditions caused false rejection spikes with legacy 2D facial cameras during late-night maintenance shifts.",
      solution:
        "Migrated to dual-eye Near-Infrared (NIR) Iris scanning using Daugman's 2048-bit algorithm with a strict Hamming Distance threshold of HD &le; 0.30.",
      outcome:
        "Zero false acceptances over 36 months; seamless entry in complete darkness; audit certified under ISO 27001 physical security standards."
    },
    ichapur_liveness_upgrade: {
      id: "ichapur_liveness_upgrade",
      title: "Ichapur Defense Facility: Anti-Deepfake Presentation Defense",
      location: "High-security defense manufacturing cells and engineering terminal rooms",
      engineers: "Abhronila (CISO) & Incident Response Team",
      threatScenario:
        "Adversaries tested real-time deepfake video injection and high-resolution tablet screen playback against optical gate access cameras.",
      solution:
        "Integrated dual-modality passive liveness (rPPG blood pulse detection + thermal heat sensor array) and FIDO2 physical token requirement.",
      outcome:
        "Deepfake video playback instantly blocked at the optical gate; automated alarm dispatched to SOC within 2 seconds."
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
                <span className="px-3 py-1 bg-purple-950 text-purple-400 border border-purple-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 6
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Biometric Authentication: Fingerprint, Facial Recognition &amp; Iris Scanning
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-purple-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Biometric authentication binds digital identity directly to biological characteristics ("Something You ARE").
            Explore the mathematics of <strong>Fingerprint Minutiae extraction</strong>, <strong>3D Facial Deep Neural Embeddings</strong>, 
            and <strong>Daugman's IrisCode Hamming Distance</strong>. Analyze the <strong>non-revocability dilemma</strong>, evaluate 
            <strong>Cancellable Biometrics (BioHashing)</strong>, and master <strong>ISO/IEC 30107-3 Presentation Attack Detection (Liveness)</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: MULTI-MODAL BIOMETRIC MATCHING ENGINE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>👁️</span> Studio 1: Multi-Modal Biometric Matching &amp; Feature Extractor
              </h2>
              <p className="text-xs text-slate-400">
                Compare physiological biometric extraction algorithms across Fingerprints, 3D Facial Embeddings, and IrisCodes.
              </p>
            </div>
            <div className="flex gap-2">
              {Object.keys(modalityDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedModality(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200",
                    selectedModality === key
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{currentModality.name}</span>
                <span className={clsx("text-xs px-2.5 py-1 rounded-full border font-semibold", currentModality.badgeColor)}>
                  {currentModality.typicalEer}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Feature Vectors Extracted:</span>
                  <span className="text-slate-200">{currentModality.features}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Matching Metric &amp; Formula:</span>
                  <span className="text-slate-200 font-mono text-[11px]">{currentModality.metric}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Decision Threshold ($\theta$):</span>
                  <span className="text-cyan-300 font-mono">{currentModality.threshold}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-500 font-semibold block">Simulated Probe Score:</span>
                  <span className="text-emerald-300 font-mono font-bold">{currentModality.probeScore}</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300">
                {currentModality.verdict}
              </div>
            </div>

            {/* Semantic SVG Representation */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Feature Space Topology
              </span>
              <svg
                className="w-40 h-40 bg-slate-900 rounded-xl p-2"
                viewBox="0 0 100 100"
                aria-label="Biometric Feature Map"
              >
                {selectedModality === "fingerprint" && (
                  <g>
                    {/* Fingerprint Ridge Arcs */}
                    <path d="M 20 80 Q 50 10 80 80" fill="none" stroke="#6366f1" strokeWidth="2" />
                    <path d="M 30 80 Q 50 25 70 80" fill="none" stroke="#6366f1" strokeWidth="2" />
                    <path d="M 40 80 Q 50 40 60 80" fill="none" stroke="#6366f1" strokeWidth="2" />
                    {/* Minutiae Points */}
                    <circle cx="50" cy="40" r="3" fill="#a855f7" />
                    <circle cx="35" cy="60" r="3" fill="#06b6d4" />
                    <circle cx="65" cy="60" r="3" fill="#06b6d4" />
                  </g>
                )}
                {selectedModality === "face" && (
                  <g>
                    {/* 3D Facial Landmark Mesh */}
                    <ellipse cx="50" cy="50" rx="30" ry="38" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                    <circle cx="38" cy="42" r="2.5" fill="#38bdf8" />
                    <circle cx="62" cy="42" r="2.5" fill="#38bdf8" />
                    <path d="M 50 45 L 47 58 L 53 58 Z" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <path d="M 40 70 Q 50 78 60 70" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    {/* Mesh Lines */}
                    <line x1="38" y1="42" x2="50" y2="45" stroke="#0891b2" strokeWidth="0.8" strokeDasharray="1 1" />
                    <line x1="62" y1="42" x2="50" y2="45" stroke="#0891b2" strokeWidth="0.8" strokeDasharray="1 1" />
                  </g>
                )}
                {selectedModality === "iris" && (
                  <g>
                    {/* Iris Rings & Gabor Filter Mesh */}
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="2" />
                    <circle cx="50" cy="50" r="16" fill="#022c22" stroke="#059669" strokeWidth="2" />
                    {/* Crypts Pattern */}
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="50" y1="12" x2="50" y2="34" stroke="#6ee7b7" strokeWidth="1" />
                    <line x1="50" y1="66" x2="50" y2="88" stroke="#6ee7b7" strokeWidth="1" />
                  </g>
                )}
              </svg>
              <span className="text-[10px] text-slate-500">Live Mathematical Feature Mesh</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: PRESENTATION ATTACK DETECTION (LIVENESS SANDBOX) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Studio 2: ISO/IEC 30107-3 Presentation Attack Detection (Liveness Sandbox)
              </h2>
              <p className="text-xs text-slate-400">
                Toggle physical sensor parameters to simulate spoof attempts (2D photos, masks, gummy fingers) vs live humans.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", livenessResult.badgeColor)}>
              {livenessResult.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Physical Sensor Liveness Verification Toggles
              </span>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">3D Structured Light Depth Grid</div>
                  <div className="text-[10px] text-slate-400">Verifies true physical facial curvature (Rejects flat 2D photos)</div>
                </div>
                <input
                  type="checkbox"
                  checked={has3dDepth}
                  onChange={(e) => setHas3dDepth(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                /&gt;
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Thermal Heat Signature (36.8°C)</div>
                  <div className="text-[10px] text-slate-400">Detects biological body temperature (Rejects cold silicon/latex masks)</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasThermalHeat}
                  onChange={(e) => setHasThermalHeat(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                /&gt;
              </label>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Micro-Blink &amp; Saccade Dynamics</div>
                  <div className="text-[10px] text-slate-400">Monitors involuntary micro-movements (Rejects static replicas)</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasMicroBlink}
                  onChange={(e) => setHasMicroBlink(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                /&gt;
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Liveness Confidence Score</span>
                  <span className="font-mono text-lg font-extrabold text-purple-400">{livenessResult.score}/100</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {livenessResult.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: CANCELLABLE BIOMETRICS (BIOHASHING) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🔄</span> Studio 3: Cancellable Biometrics (BioHashing Sandbox)
              </h2>
              <p className="text-xs text-slate-400">
                Solve the non-revocability dilemma by applying non-invertible transform keys to biological templates.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTransformKeyId("Key_A")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  transformKeyId === "Key_A"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              &gt;
                Transform Key Alpha
              </button>
              <button
                onClick={() => setTransformKeyId("Key_B")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                  transformKeyId === "Key_B"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                )}
              &gt;
                Revoke &amp; Issue Key Beta 🔄
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white">{currentBioHash.name}</span>
              <span className="font-mono text-purple-400">Cross-Correlation: {currentBioHash.correlationWithOther}</span>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-cyan-300 break-all text-xs">
              Stored BioHash Digest: {currentBioHash.hashOutput}
            </div>

            <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-lg border border-slate-800">
              {currentBioHash.desc}
            </p>
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
                Forensic analysis of gummy fingers, deepfakes, and dual-eye iris deployments in critical regional hubs.
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
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key === "barrackpore_biometrics" ? "Barrackpore Biometrics" : key === "kolkata_fintech_iris" ? "Kolkata Iris Vault" : "Ichapur Liveness"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-purple-400 font-mono bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
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
                <span className="font-bold text-purple-400 uppercase text-[10px] tracking-wider block">Biometric Architecture</span>
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
                <span><strong>Storing Raw Biometric Images in Central Databases:</strong> If breached, biological identities cannot be revoked or reset, causing permanent compromise.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Deploying 2D Optical Cameras without Liveness:</strong> Allows adversaries to bypass gates using printed photographs, tablet screen playback, or deepfakes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Assuming Biometrics are 100% Deterministic:</strong> Biometrics are probabilistic similarity scores; poorly tuned thresholds cause high false rejections.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Biometric Engineering Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Isolate Templates in Hardware Secure Enclaves:</strong> Keep biometric matching local on the client device chip (TPM / Apple Secure Enclave).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Mandate ISO/IEC 30107-3 Liveness Verification:</strong> Combine 3D infrared structured light, thermal imaging, and rPPG blood pulse detection.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Cancellable BioHashing:</strong> Store only non-invertible transformed templates to ensure templates can be re-issued if leaked.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-purple-300">Think About:</span>
              <p className="leading-relaxed">
                Why is Daugman's IrisCode matching so fast? Because unwrapped irises are encoded into 2048-bit binary strings, allowing modern CPUs to compare millions of eye codes per second using simple bitwise XOR instructions!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Fingerprints match on Minutiae (Ridge Endings &amp; Bifurcations).</li>
                <li>Face recognition uses 128-D/512-D Cosine Similarity embeddings.</li>
                <li>Iris recognition uses Daugman's algorithm with Hamming Distance (HD &lt; 0.32).</li>
                <li>The Non-Revocability dilemma is solved via Cancellable BioHashing.</li>
                <li>ISO/IEC 30107-3 defines Presentation Attack Detection (PAD) standards.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-950 border border-purple-800 text-purple-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Biometric Matching &amp; PAD Analyzer Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script implementing Minutiae matching, Cosine face similarity, IrisCode Hamming distance, and liveness testing
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={biometricEnginePy}
            title="biometric_matching_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Biometric Authentication Technologies FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the technical principles of the 3 primary biometric modalities (Fingerprint minutiae, Face embeddings, and IrisCode Hamming distance). Be prepared to explain the Biometric Non-Revocability Dilemma and how Cancellable Biometrics (BioHashing) resolves it. Detail active vs passive Presentation Attack Detection (PAD / Liveness) techniques under ISO/IEC 30107-3."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: Biometric Authentication Technologies Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 6 Note"
            downloadFileName="topic6_biometrics_technologies_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
