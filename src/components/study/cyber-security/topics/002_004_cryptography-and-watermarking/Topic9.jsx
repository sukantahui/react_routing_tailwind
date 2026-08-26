import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: Embedding Domain State
  const [activeDomainKey, setActiveDomainKey] = useState("dct_frequency");
  const [alphaStrength, setAlphaStrength] = useState(0.15); // Embedding factor alpha

  // Studio 2: Watermark Taxonomy Selector State
  const [selectedTaxonomyKey, setSelectedTaxonomyKey] = useState("invisible_robust");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_4k_broadcast");

  // Studio 1: Dynamic Metrics based on Domain & Alpha
  const liveMetrics = useMemo(() => {
    let basePsnr = 45;
    let baseSsim = 0.995;
    let jpegSurvival = "0%";

    if (activeDomainKey === "spatial_lsb") {
      basePsnr = 48.5 - alphaStrength * 20;
      baseSsim = 0.998 - alphaStrength * 0.05;
      jpegSurvival = "0% (Wiped completely by lossy JPEG quantization)";
    } else if (activeDomainKey === "dct_frequency") {
      basePsnr = 44.2 - alphaStrength * 18;
      baseSsim = 0.992 - alphaStrength * 0.04;
      jpegSurvival = `${Math.min(99, Math.round(50 + alphaStrength * 100))}% (Survives QF=50..90)`;
    } else if (activeDomainKey === "dwt_wavelet") {
      basePsnr = 43.0 - alphaStrength * 16;
      baseSsim = 0.989 - alphaStrength * 0.03;
      jpegSurvival = `${Math.min(99, Math.round(65 + alphaStrength * 80))}% (Survives QF=30..90 & Cropping)`;
    }

    return {
      psnr: Math.max(25, basePsnr).toFixed(2),
      ssim: Math.max(0.85, baseSsim).toFixed(3),
      jpegSurvival,
      isImperceptible: basePsnr >= 38.0
    };
  }, [activeDomainKey, alphaStrength]);

  // Studio 1: Domain Profiles
  const domainProfiles = {
    spatial_lsb: {
      key: "spatial_lsb",
      name: "Spatial Domain (LSB Embedding)",
      operation: "Modifies the 8th bit of raw pixel color values directly in RAM: I'(x, y) = (I & 0xFE) | W.",
      advantage: "Massive payload capacity and blazingly fast CPU execution with zero complex transforms.",
      fatalFlaw: "Zero Robustness: Wiped out instantly by standard JPEG compression, noise, or simple resizing.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    dct_frequency: {
      key: "dct_frequency",
      name: "Discrete Cosine Transform (DCT Frequency)",
      operation: "Transforms 8x8 pixel blocks into frequency spectrum; embeds in Middle-Frequency AC coefficients.",
      advantage: "Optimal trade-off: Invisible to Human Visual System (HVS) while surviving lossy JPEG compression.",
      fatalFlaw: "Vulnerable to aggressive spatial cropping and geometric rotation without synchronization markers.",
      badgeClass: "bg-indigo-950 text-indigo-300 border-indigo-800"
    },
    dwt_wavelet: {
      key: "dwt_wavelet",
      name: "Discrete Wavelet Transform (2D-DWT)",
      operation: "Decomposes image into 4 multi-resolution sub-bands: LL (Approx), LH (Horiz), HL (Vert), HH (Diag).",
      advantage: "Extreme Resilience: Survives multi-scale resizing, spatial cropping, and JPEG2000 compression.",
      fatalFlaw: "Higher computational complexity during forward/inverse wavelet transform filters.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  };

  const currentDomain = domainProfiles[activeDomainKey];

  // Studio 2: Watermark Taxonomy Profiles Data
  const taxonomyProfiles = {
    visible: {
      key: "visible",
      name: "1. Visible Watermark",
      purpose: "Visual deterrence & public branding (e.g. TV broadcast network logo, stock photo previews).",
      robustness: "Perceptually Obvious (PSNR < 25 dB); easily cropped if placed along borders.",
      tamperSensitivity: "Low: Meant for visual deterrence rather than forensic integrity.",
      legalStandard: "Indian Copyright Act Section 65A (Technological Protection Measures).",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    invisible_robust: {
      key: "invisible_robust",
      name: "2. Invisible Robust Watermark (DCT/DWT)",
      purpose: "Persistent copyright protection, DRM broadcast tracking, and traitor tracing.",
      robustness: "High: Survives lossy JPEG compression (QF 40..90), scaling, filtering, and noisy channels.",
      tamperSensitivity: "Low: Tolerates benign compression while keeping watermark intact.",
      legalStandard: "Indian Copyright Act Section 65B (Rights Management Information - Up to 2 Years Jail).",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    fragile_forensic: {
      key: "fragile_forensic",
      name: "3. Fragile Forensic Watermark (Spatial LSB)",
      purpose: "Integrity verification for medical radiology X-rays, legal evidence, and satellite imagery.",
      robustness: "Zero: Breaks completely if a single pixel is modified by an attacker.",
      tamperSensitivity: "Extreme: Pinpoints the exact X-Y pixel coordinates of unauthorized alterations.",
      legalStandard: "Indian Evidence Act Section 65B (Forensic Proof of Non-Tampering).",
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    semi_fragile: {
      key: "semi_fragile",
      name: "4. Semi-Fragile Watermark (Wavelet Sub-Bands)",
      purpose: "Content authentication for digital land deeds, cadastral maps, and official certificates.",
      robustness: "Selective: Tolerates benign archival compression (JPEG 80%) without alerting.",
      tamperSensitivity: "High: Flags malicious content edits (e.g. erasing a boundary line or doctor's signature).",
      legalStandard: "Digital Personal Data Protection Act 2023 & Land Records Integrity.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const activeTaxonomy = taxonomyProfiles[selectedTaxonomyKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_4k_broadcast",
      lead: "Mamata",
      role: "Lead Multimedia Security Architect",
      location: "Kolkata Media Operations Center",
      title: "4K Streaming Broadcast Piracy DWT Watermarking",
      budget: "₹9,50,000",
      challenge: "Real-Time Bengali 4K Live Broadcast Re-Streaming Leaks",
      dilemma:
        "High-definition regional Bengali streaming broadcasts were being illegally restreamed on social platforms with stripped video metadata.",
      resolution:
        "Mamata deployed real-time DWT-DCT spread spectrum watermarking with dynamic subscriber ID injection, identifying illegal restream sources within 90 seconds and achieving full Section 65A legal compliance.",
      metrics: {
        streamThroughput: "4K Ultra-HD 60 FPS",
        leakDetectionTime: "Under 90 Seconds",
        psnrFidelity: "44.8 dB (Pristine Visual Quality)",
        compliance: "Indian Copyright Act Section 65A/B"
      }
    },
    {
      id: "ichapur_dicom_watermark",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Radiology DICOM Reversible Lossless Watermarking",
      budget: "₹5,20,000",
      challenge: "Embedding Patient Metadata Without Pixel Distortion",
      dilemma:
        "Medical radiology scans required patient metadata embedding without causing any permanent pixel alteration that could impair diagnostic tumor detection.",
      resolution:
        "Mahima deployed Difference Expansion Reversible Watermarking across 50,000+ MRI scans, allowing 100% lossless cover image reconstruction during clinical analysis under the DPDP Act 2023.",
      metrics: {
        mriScansSecured: "50,000+ DICOM Records",
        diagnosticReversibility: "100% Bit-for-Bit Lossless",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_land_watermark",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Land Records Registry",
      title: "Digital Land Deed Semi-Fragile Tamper Detection",
      budget: "₹8,80,000",
      challenge: "Detecting Subtle Digital Boundary Alterations on Cadastral Maps",
      dilemma:
        "Land registry cadastral maps and ownership deeds were vulnerable to subtle digital boundary alterations in high-stakes property disputes.",
      resolution:
        "Debangshu integrated semi-fragile wavelets, tolerating benign archival compression while instantly flagging and localizing fraudulent parcel boundary modifications.",
      metrics: {
        cadastralMapsSecured: "12,000+ Digital Land Deeds",
        tamperLocalization: "Exact 8x8 Pixel Grid Accuracy",
        archivalCompressionTolerated: "JPEG Quality Factor 80+",
        compliance: "West Bengal Land Reforms Act Charter"
      }
    },
    {
      id: "jadavpur_watermark_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto Research Leads",
      location: "Jadavpur University AI Labs",
      title: "DCT / DWT Avalanche & Robustness Benchmarking Lab",
      budget: "₹4,00,000",
      challenge: "Benchmarking PSNR vs JPEG Compression Attack Degradation",
      dilemma:
        "Demonstrating to university students why spatial LSB fails under JPEG compression while frequency DCT survives and how SVD singular values resist noise.",
      resolution:
        "The team authored a Python image watermarking testbed comparing PSNR vs JPEG compression quality factor (QF 10..100), training 140+ students on SVD matrix stability and Tardos collusion resistance.",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        algorithmsBenchmarked: "LSB vs DCT vs DWT vs SVD",
        collusionResistanceTested: "Tardos Code Matrix",
        compliance: "NCIIPC Educational Security Charter"
      }
    }
  ];

  const currentLocalScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-gray-900 via-slate-900 to-indigo-950 border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cyber Security Module 002_004 • Topic 9 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Digital Watermarking: Spatial and Frequency Domain Techniques
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the science of multimedia signal protection: master Spatial LSB vs Frequency DCT/DWT embedding, 
            perceptual fidelity (PSNR/SSIM), reversible watermarking in DICOM radiology, and Indian Copyright Act Section 65A/B statutory protections.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Spatial LSB vs Frequency DCT/DWT Watermark Interactive Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🔬</span> Studio 1: Spatial LSB vs Frequency DCT/DWT Embedding Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle between Spatial LSB, Frequency DCT, and Wavelet DWT embedding domains. Adjust the Embedding Strength slider ($\alpha$) to see how it impacts Peak Signal-to-Noise Ratio (PSNR), SSIM, and JPEG compression attack survival in real time.
            </p>
          </div>

          {/* Domain Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(domainProfiles).map((dp) => {
              const isSelected = activeDomainKey === dp.key;
              return (
                <button
                  key={dp.key}
                  onClick={() => setActiveDomainKey(dp.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-sm text-gray-200">{dp.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{dp.name.includes("(") ? dp.name.split("(")[1].replace(")", "") : "Domain"}</div>
                </button>
              );
            })}
          </div>

          {/* Active Domain Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentDomain.badgeClass)}>
                  {currentDomain.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Mathematical Transformation &amp; Embedding
                </h3>
              </div>
            </div>

            {/* Operation Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Mathematical Mechanism</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{currentDomain.operation}</p>
                <p className="text-emerald-400 text-[11px] pt-1 font-semibold">{currentDomain.advantage}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Attack Vulnerability &amp; Limitation</span>
                <p className="text-gray-300 leading-relaxed">{currentDomain.fatalFlaw}</p>
              </div>
            </div>

            {/* Interactive Alpha Slider */}
            <div className="p-4 bg-gray-900 rounded-xl border border-indigo-900/40 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300 font-bold uppercase">Embedding Factor (Alpha: {alphaStrength.toFixed(2)})</span>
                <span className="text-indigo-400 font-mono font-semibold">Lower = More Invisible | Higher = More Robust</span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.45"
                step="0.01"
                value={alphaStrength}
                onChange={(e) => setAlphaStrength(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Live Fidelity & Robustness Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">PSNR Fidelity (Target: &gt;38 dB)</span>
                <span className={clsx("font-bold text-base sm:text-lg", liveMetrics.isImperceptible ? "text-emerald-400" : "text-rose-400")}>
                  {liveMetrics.psnr} dB
                </span>
                <span className="text-[10px] text-gray-500 block">{liveMetrics.isImperceptible ? "Imperceptible to human eyes" : "Visual artifacts visible!"}</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">SSIM Structural Similarity</span>
                <span className="font-bold text-indigo-300 text-base sm:text-lg">{liveMetrics.ssim}</span>
                <span className="text-[10px] text-gray-500 block">Structure correlation score</span>
              </div>

              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Lossy JPEG Survival Rate</span>
                <span className="font-bold text-amber-400 text-xs sm:text-sm mt-1 block">{liveMetrics.jpegSurvival}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Watermark Taxonomy & Attack Resilience Radar */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: Watermark Taxonomy &amp; Statutory Protection Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore the 4 watermark archetypes (Visible, Invisible Robust, Fragile Forensic, and Semi-Fragile) to analyze their purpose, robustness against attacks, and Indian Copyright Act Section 65A/B compliance.
            </p>
          </div>

          {/* Taxonomy Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(taxonomyProfiles).map((tax) => {
              const isSelected = selectedTaxonomyKey === tax.key;
              return (
                <button
                  key={tax.key}
                  onClick={() => setSelectedTaxonomyKey(tax.key)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{tax.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{tax.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Taxonomy Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeTaxonomy.badgeClass)}>
                  {activeTaxonomy.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeTaxonomy.purpose}
                </h3>
              </div>
            </div>

            {/* Robustness & Tamper Sensitivity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-1">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">Attack Robustness Profile:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeTaxonomy.robustness}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">Tamper Detection Sensitivity:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeTaxonomy.tamperSensitivity}</p>
              </div>
            </div>

            {/* Indian Statutory Protection */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-amber-900/30 text-xs space-y-1">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">Indian Legal Standard &amp; Penalties:</span>
              <p className="text-gray-200 font-semibold leading-relaxed">{activeTaxonomy.legalStandard}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Semantic SVG Architectural Diagrams */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🖼</span> Section 3: Semantic Conceptual Diagrams
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualizing the 2D-DCT Frequency Spectrum and the 2D-DWT Wavelet Sub-Band Decomposition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 2D-DCT 8x8 Frequency Spectrum */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: 2D-DCT 8x8 Frequency Spectrum Layout
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Box */}
                  <rect x="50" y="25" width="400" height="240" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="250" y="47" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="10">2D-DCT FREQUENCY COEFFICIENT SPECTRUM</text>

                  {/* DC Component (Top-Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="65" width="80" height="40" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="110" y="85" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8">DC (0,0)</text>
                    <text x="110" y="97" fill="#fee2e2" textAnchor="middle" fontSize="6.5">DO NOT TOUCH!</text>
                  </g>

                  {/* Low Frequencies */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="160" y="65" width="120" height="40" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="220" y="88" fill="#c7d2fe" textAnchor="middle" fontSize="8">Low Frequencies (HVS Visible)</text>
                  </g>

                  {/* Middle Frequencies (Optimal Embedding Band) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="120" width="280" height="55" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="210" y="145" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">
                      MIDDLE FREQUENCIES (OPTIMAL EMBEDDING ZONE)
                    </text>
                    <text x="210" y="162" fill="#d1fae5" textAnchor="middle" fontSize="7.5">
                      Survives lossy JPEG compression with ZERO visible image distortion!
                    </text>
                  </g>

                  {/* High Frequencies */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="190" width="360" height="50" rx="4" fill="#1c1917" stroke="#78716c" />
                    <text x="250" y="212" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">
                      HIGH FREQUENCIES (Fine Textures / Noise)
                    </text>
                    <text x="250" y="228" fill="#94a3b8" textAnchor="middle" fontSize="7.5">
                      Discarded by standard lossy JPEG quantization tables ➔ Avoid embedding here!
                    </text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Middle-frequency AC coefficients provide the sweet spot between invisibility and JPEG survival.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: 2D-DCT frequency coefficient distribution highlighting the middle-frequency robust embedding zone.
              </p>
            </div>

            {/* Diagram 2: 2D-DWT Wavelet Sub-Band Decomposition */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>📐</span> Diagram B: 2D-DWT Multi-Resolution Sub-Band Decomposition
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Box */}
                  <rect x="50" y="25" width="400" height="240" rx="8" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                  <text x="250" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="10">2D-DWT 4-BAND WAVELET DECOMPOSITION</text>

                  {/* LL1 (Top-Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="65" width="170" height="85" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="155" y="102" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">LL1 (Approximation)</text>
                    <text x="155" y="117" fill="#a5f3fc" textAnchor="middle" fontSize="7.5">Low-Frequency Global Structure</text>
                  </g>

                  {/* HL1 (Top-Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="65" width="170" height="85" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="345" y="102" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">HL1 (Vertical Details)</text>
                    <text x="345" y="117" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">★ Primary Robust Embedding Band</text>
                  </g>

                  {/* LH1 (Bottom-Left) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="70" y="165" width="170" height="85" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="155" y="202" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="9">LH1 (Horizontal Details)</text>
                    <text x="155" y="217" fill="#a7f3d0" textAnchor="middle" fontSize="7.5">★ Primary Robust Embedding Band</text>
                  </g>

                  {/* HH1 (Bottom-Right) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="260" y="165" width="170" height="85" rx="4" fill="#1c1917" stroke="#78716c" />
                    <text x="345" y="202" fill="#cbd5e1" textAnchor="middle" fontSize="9">HH1 (Diagonal Details)</text>
                    <text x="345" y="217" fill="#94a3b8" textAnchor="middle" fontSize="7.5">High-Frequency Corner Noise</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Embedding in HL1 and LH1 directional bands gives extreme resilience against scaling &amp; cropping.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: 2D-DWT multi-resolution wavelet sub-band structure (LL, LH, HL, HH).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Watermarking Engineering Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how multimedia architects track 4K broadcast piracy, deploy reversible DICOM watermarking in hospital radiology, protect digital land deeds, and benchmark algorithms across Kolkata, Ichapur, Barrackpore, and Jadavpur.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {localScenarios.map((sc) => {
              const isSelected = activeScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sc.location}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{sc.lead}</div>
                  <div className="text-[11px] text-gray-400 truncate mt-1">{sc.title}</div>
                </button>
              );
            })}
          </div>

          {/* Active Local Scenario Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                  {currentLocalScenario.location} • {currentLocalScenario.role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentLocalScenario.title} (Led by {currentLocalScenario.lead})
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Project Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Multimedia Security Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Architecture &amp; Watermark Action
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Operational Metrics &amp; Deliverables
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(currentLocalScenario.metrics).map(([key, val]) => (
                  <div key={key} className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-bold text-white text-xs sm:text-sm mt-0.5 block">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Professional Tips, Common Pitfalls & Best Practices */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>💡</span> Section 5: Professional Mindset, Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Guidelines for multimedia engineers and forensic digital copyright architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Watermarking Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Default to DWT-DCT Mid-Bands:</strong> Optimal balance between imperceptibility and compression survival.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Maintain PSNR &gt; 38 dB:</strong> Ensure watermark additions remain completely invisible to the human eye.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Reversible Watermarking for Healthcare:</strong> 100% lossless restoration for DICOM scans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Traitor Tracing:</strong> Inject dynamic user IDs when employees download confidential files.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Watermarking Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Using Spatial LSB for Copyright:</strong> Wiped out instantly by standard JPEG compression.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Modifying DC Low Frequencies:</strong> Causes severe, objectionable visual block distortions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Modifying High Frequencies:</strong> Completely discarded by standard JPEG lossy quantization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Setting Alpha Too High:</strong> Ruined PSNR (&lt;30 dB) makes watermarks obvious and distracting.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Blue Team Hardening
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with Copyright Act Section 65A/B:</strong> Log forensic watermark hashes for legal claims.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Spread Spectrum DSSS:</strong> Spread watermark across hundreds of frequency bins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Implement Dual Watermarking:</strong> Combine robust copyright with fragile tamper localization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Deploy Tardos Collusion Codes:</strong> Defeat multi-user video averaging attacks mathematically.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 6: Pedagogical Hints & Mini Checklist */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎯</span> Section 6: Guiding Hints &amp; Student Mini Checklist
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Synthesize key digital watermarking concepts before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Multimedia Engineers
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  The fundamental difference between Encryption and Watermarking: Encryption protects data during transit across the network wire, but once the legitimate user decrypts the file, encryption disappears. Watermarking permanently alters the media signal itself, protecting the content even after it is copied, shared, or re-broadcast.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why the 2D-DCT middle frequencies are the "Goldilocks zone": low frequencies alter overall brightness and create visual distortion; high frequencies are thrown away by lossy JPEG quantization. Middle frequencies survive lossy compression while remaining invisible to the Human Visual System.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all medical or forensic imaging projects, never use permanent lossy watermarks; always implement Reversible Watermarking (Difference Expansion) to allow 100% bit-for-bit restoration of the original scan during clinical diagnosis.
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Watermarking embeds permanent copyright/forensic data into host media.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Robust watermarks survive compression; Fragile watermarks detect tampering.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Spatial LSB modifies raw 8th bit; high capacity but ZERO robustness against JPEG.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Frequency DCT embeds in middle-frequency AC bands for optimal imperceptibility.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DWT decomposes into LL, LH, HL, HH bands for multi-scale cropping resilience.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Indian Copyright Act 1957 Section 65A/B imposes up to 2 years jail for watermark removal.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Digital Watermarking: Spatial and Frequency Domain Techniques FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Digital Watermarking: Spatial and Frequency Domain Techniques (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Digital Watermarking brings mathematical signal processing directly into the realm of intellectual property and cyber defense. Notice how we balance human perception (PSNR/SSIM) with mathematical robustness against JPEG compression and cropping. Pay special attention to why spatial LSB fails in real-world broadcast networks, why 2D-DCT middle frequencies rule lossy compression, and how the Indian Copyright Act Section 65A and 65B give digital watermarks teeth in Indian courts."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
