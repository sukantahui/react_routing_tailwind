import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Studio 1: Paradigm Inspector State
  const [activeParadigmKey, setActiveParadigmKey] = useState("steganography");

  // Studio 2: Comparative Dimension State
  const [selectedDimensionKey, setSelectedDimensionKey] = useState("primary_goal");

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_soc_dlp");

  // Studio 1: 3-Way Paradigm Profiles Data
  const paradigmProfiles = {
    cryptography: {
      key: "cryptography",
      name: "1. Cryptography (Scrambled Meaning)",
      tagline: "Scrambles plaintext into random-looking ciphertext; existence is open, meaning is hidden.",
      outputAppearance: "0x4a8b9f12c7d4... (Obvious pseudo-random binary cipher noise)",
      attackerPerspective: "Adversary knows communication exists; goal is Cryptanalysis (crack key / read text).",
      carrierRelationship: "No carrier media; the message itself is mathematically transformed.",
      robustness: "High bit integrity required; transmission via standard TCP/IP digital networks.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    steganography: {
      key: "steganography",
      name: "2. Steganography (Concealed Existence)",
      tagline: "Conceals a secret payload inside an innocent cover media; communication existence is hidden.",
      outputAppearance: "Innocent-looking JPEG photo of Kolkata Victoria Memorial (Zero visual difference)",
      attackerPerspective: "Adversary must detect if hidden data exists; goal is Steganalysis (P[Stego] &gt; 0.5).",
      carrierRelationship: "Completely UNRELATED: Cover image is disposable wrapping for secret payload.",
      robustness: "Low: Vulnerable to lossy JPEG compression, image filtering, and active DLP sanitization.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    },
    watermarking: {
      key: "watermarking",
      name: "3. Digital Watermarking (Protected Carrier)",
      tagline: "Permanently embeds copyright or forensic metadata directly into host multimedia signals.",
      outputAppearance: "Imperceptible signal embedded in DWT/DCT coefficients (PSNR > 40 dB, SSIM > 0.99)",
      attackerPerspective: "Adversary tries to strip/erase the watermark to pirate or tamper with the host media.",
      carrierRelationship: "DIRECTLY BOUND: The payload is the host image's copyright ID or medical patient metadata.",
      robustness: "High: Must survive aggressive lossy JPEG compression, cropping, rotation, and re-broadcasting.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    }
  };

  const currentParadigm = paradigmProfiles[activeParadigmKey];

  // Studio 2: 6 Comparative Dimensions
  const comparativeDimensions = {
    primary_goal: {
      key: "primary_goal",
      name: "1. Primary Objective",
      crypto: "Confidentiality: Hide the MEANING of the message.",
      stego: "Covertness: Hide the very EXISTENCE of the communication.",
      watermark: "Asset Protection: Protect the HOST CARRIER media itself.",
      verdict: "Each addresses a fundamentally different threat model in information security."
    },
    detectability: {
      key: "detectability",
      name: "2. Visibility & Detectability",
      crypto: "Openly visible as scrambled ciphertext noise.",
      stego: "Completely concealed; cover media looks 100% innocent.",
      watermark: "Imperceptible (invisible signal) or visible (semi-transparent logo).",
      verdict: "Steganography is the only paradigm where detection of the channel constitutes total failure."
    },
    payload_relation: {
      key: "payload_relation",
      name: "3. Payload-Carrier Relationship",
      crypto: "No carrier media involved (Direct mathematical mapping).",
      stego: "UNRELATED: Cover image is just a disposable shipping vehicle.",
      watermark: "DIRECTLY BOUND: Payload represents the host image's copyright or patient ID.",
      verdict: "Watermarks protect the container; Steganography protects the passenger."
    },
    adversary_attack: {
      key: "adversary_attack",
      name: "4. Primary Adversary Attack",
      crypto: "Cryptanalysis (Recovering secret key or decrypting ciphertext).",
      stego: "Steganalysis (Detecting the statistical presence of hidden bits).",
      watermark: "Watermark Removal / Tampering (Stripping DRM / altering medical scans).",
      verdict: "Steganalysis succeeds upon detection; Cryptanalysis requires mathematical key extraction."
    },
    robustness: {
      key: "robustness",
      name: "5. Robustness to Signal Attacks",
      crypto: "N/A (Requires 100% bit-exact transmission over network protocols).",
      stego: "Low (Wiped out easily by lossy JPEG compression or DLP re-encoding).",
      watermark: "High (Engineered specifically to survive lossy compression, cropping, and noise).",
      verdict: "Watermarks survive lossy media channels; Steganography assumes uncorrupted channels."
    },
    indian_law: {
      key: "indian_law",
      name: "6. Indian Legal & Regulatory Context",
      crypto: "IT Act Section 69: Mandatory assistance with decryption keys (Up to 7 years jail).",
      stego: "DPDP Act 2023: Malicious stego triggers maximum ₹250 Crores penalty (Aggravation).",
      watermark: "Indian Copyright Act Section 65A/B: Up to 2 years jail for watermark removal.",
      verdict: "Indian cyber statutes clearly delineate lawful cryptography from illegal steganographic evasion."
    }
  };

  const activeDimension = comparativeDimensions[selectedDimensionKey];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_soc_dlp",
      lead: "Mamata",
      role: "Lead Cryptographic Auditor",
      location: "Kolkata FinTech Operations Center",
      title: "SOC DLP Steganography Exfiltration Detection",
      budget: "₹9,50,000",
      challenge: "Malicious Insider Exfiltrating Credit Cards via Social Media Memes",
      dilemma:
        "A malicious insider was attempting to exfiltrate 25,000 customer credit card records by hiding encrypted CSV archives inside innocent social media meme image uploads.",
      resolution:
        "Mamata deployed deep packet inspection DLP with active JPEG sanitization (lossy re-encoding at QF 80), neutralizing 100% of spatial stego payloads and reporting the incident under IT Act Section 69.",
      metrics: {
        recordsProtected: "25,000 Credit Card Profiles",
        stegoPayloadsNeutralized: "100% Active Sanitization",
        dpdpLiabilityPrevented: "₹250 Crores Potential Fine",
        compliance: "RBI & IT Act Section 69 Charter"
      }
    },
    {
      id: "ichapur_genetic_crypto_watermark",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur General Hospital",
      title: "Genetic EHR Crypto-Watermark Integration",
      budget: "₹5,20,000",
      challenge: "Protecting Whole-Genome Sequences from Theft & Misattribution",
      dilemma:
        "Protecting sensitive human whole-genome sequencing datasets across cloud oncology servers from unauthorized data theft, misattribution, and privacy leaks.",
      resolution:
        "Mahima deployed AES-256 encryption for the genomic payload and embedded a reversible DWT watermark in the DICOM header, achieving both clinical non-repudiation and DPDP Act 2023 compliance.",
      metrics: {
        genomeFilesSecured: "10,000+ Patient Profiles",
        cryptoWatermarkSync: "AES-256 + Reversible DWT",
        diagnosticIntegrity: "100% Lossless Restoration",
        compliance: "NABH & India DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_timing_stego",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "SCADA RTU Network Timing Stego Defense",
      budget: "₹8,80,000",
      challenge: "Rogue Substation Malware Exfiltrating Telemetry via Packet Delays",
      dilemma:
        "Rogue substation malware exfiltrating sensitive 220kV power grid telemetry via subtle Modbus TCP inter-packet timing delays.",
      resolution:
        "Debangshu deployed network traffic jitter normalization gateways on RTU communication lines, eliminating microsecond timing modulation channels and maintaining 100% grid security.",
      metrics: {
        covertChannelsBlocked: "100% Timing Stego Elimination",
        substationsHardened: "18 High-Voltage Substations",
        gridUptime: "100.00% Zero Disruption",
        compliance: "CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_chisquare_lab",
      lead: "Abhronila & Susmita",
      role: "University Crypto & Stego Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Chi-Square Steganalysis & F5 Matrix Laboratory",
      budget: "₹4,00,000",
      challenge: "Teaching Students Why Spatial LSB Breaks Under Chi-Square",
      dilemma:
        "Teaching computer science students why simple LSB is easily broken by Chi-Square analysis and how Matrix Embedding (F5 algorithm) evades first-order statistical detection.",
      resolution:
        "The team authored an interactive Python steganalysis suite comparing Chi-Square curves across clean, LSB, and F5 images, training 140+ students on deep learning steganalysis (SRNet).",
      metrics: {
        studentsTrained: "140+ BCA Cyber Students",
        steganalysisSuitesAuthored: "Chi-Square + Sample Pair + SRNet",
        f5MatrixEfficiencySimulated: "1.5 Bits / Modification",
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
            Cyber Security Module 002_004 • Topic 10 of 12
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Steganography vs Digital Watermarking vs Cryptography
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Deconstruct the holy trinity of information hiding: master the architectural differences between 
            scrambling content (Cryptography), concealing existence (Steganography), and protecting media assets (Digital Watermarking).
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: 3-Way Paradigm Interactive Inspector */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎭</span> Studio 1: The Information Hiding Trinity Inspector
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the three information-hiding paradigms to inspect what the output looks like, what the attacker sees, how the payload relates to the carrier, and the core defense goal.
            </p>
          </div>

          {/* Paradigm Switcher Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.values(paradigmProfiles).map((pr) => {
              const isSelected = activeParadigmKey === pr.key;
              return (
                <button
                  key={pr.key}
                  onClick={() => setActiveParadigmKey(pr.key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-sm text-gray-200">{pr.name.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{pr.name.split(" (")[1].replace(")", "")}</div>
                </button>
              );
            })}
          </div>

          {/* Active Paradigm Detail Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", currentParadigm.badgeClass)}>
                  {currentParadigm.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {currentParadigm.tagline}
                </h3>
              </div>
            </div>

            {/* Output Appearance vs Attacker View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1.5">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">Output Artifact Appearance:</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{currentParadigm.outputAppearance}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-1.5">
                <span className="text-rose-400 font-bold uppercase tracking-wider block">Attacker Goal &amp; Perspective:</span>
                <p className="text-gray-300 leading-relaxed">{currentParadigm.attackerPerspective}</p>
              </div>
            </div>

            {/* Carrier & Robustness */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Payload-Carrier Relationship</span>
                <span className="font-bold text-emerald-400 text-xs sm:text-sm">{currentParadigm.carrierRelationship}</span>
              </div>
              <div className="bg-gray-900 p-3.5 rounded-xl border border-gray-800 space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Channel Robustness Requirement</span>
                <span className="font-bold text-indigo-300 text-xs sm:text-sm">{currentParadigm.robustness}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Dimensional Comparative Matrix & Steganalysis Radar */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 2: Multi-Dimensional Head-to-Head Radar
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select one of the 6 fundamental dimensions to see how Cryptography, Steganography, and Digital Watermarking compare side-by-side.
            </p>
          </div>

          {/* Dimension Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(comparativeDimensions).map((cd) => {
              const isSelected = selectedDimensionKey === cd.key;
              return (
                <button
                  key={cd.key}
                  onClick={() => setSelectedDimensionKey(cd.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                &gt;
                  <div className="font-bold text-gray-200 truncate">{cd.name.split(". ")[1]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{cd.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Dimension 3-Way Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-indigo-950 text-indigo-300 border-indigo-800">
                Comparative Dimension: {activeDimension.name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                3-Way Architectural Comparison
              </h3>
            </div>

            {/* 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-2">
                <span className="text-blue-400 font-bold uppercase tracking-wider block">1. Cryptography</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeDimension.crypto}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">2. Steganography</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeDimension.stego}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-2">
                <span className="text-purple-400 font-bold uppercase tracking-wider block">3. Digital Watermarking</span>
                <p className="text-gray-200 leading-relaxed font-semibold">{activeDimension.watermark}</p>
              </div>
            </div>

            {/* Engineering Verdict */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <span className="text-cyan-400 font-bold uppercase tracking-wider block">Architectural Synthesis:</span>
              <p className="text-gray-300 leading-relaxed">{activeDimension.verdict}</p>
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
              Visualizing the 3-Way Information Hiding Paradigm Pipeline and Steganalysis Chi-Square ($\chi^2$) Histogram Attacks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: 3-Way Paradigm Pipeline */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The 3 Information Hiding Disciplines
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Cryptography Block */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="25" width="460" height="70" rx="6" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="35" y="47" fill="#818cf8" fontWeight="bold" fontSize="9.5">1. CRYPTOGRAPHY</text>
                    <text x="180" y="47" fill="#cbd5e1" font-family="monospace" fontSize="8">Plaintext ➔ AES-256 ➔ Ciphertext</text>
                    <text x="450" y="47" fill="#fca5a5" textAnchor="end" fontSize="7.5">Meaning Hidden</text>
                    <text x="35" y="70" fill="#94a3b8" fontSize="7.5">Adversary sees ciphertext; knows encrypted communication is taking place.</text>
                  </g>

                  {/* Steganography Block */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="460" height="70" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="35" y="127" fill="#34d399" fontWeight="bold" fontSize="9.5">2. STEGANOGRAPHY</text>
                    <text x="180" y="127" fill="#cbd5e1" font-family="monospace" fontSize="8">Secret Data ➔ F5 Embed ➔ Innocent Image</text>
                    <text x="450" y="127" fill="#a7f3d0" textAnchor="end" fontSize="7.5">Existence Hidden</text>
                    <text x="35" y="150" fill="#94a3b8" fontSize="7.5">Cover image looks 100% benign; eavesdropper does not suspect secret channel.</text>
                  </g>

                  {/* Watermarking Block */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="70" rx="6" fill="#18181b" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="35" y="207" fill="#c084fc" fontWeight="bold" fontSize="9.5">3. DIGITAL WATERMARKING</text>
                    <text x="180" y="207" fill="#cbd5e1" font-family="monospace" fontSize="8">Copyright ID ➔ DWT Embed ➔ Protected Media</text>
                    <text x="450" y="207" fill="#d8b4fe" textAnchor="end" fontSize="7.5">Carrier Protected</text>
                    <text x="35" y="230" fill="#94a3b8" fontSize="7.5">Permanently modifies media signal; survives lossy compression &amp; pirated copies.</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Multi-Layered Security: Encrypt with AES ➔ Hide via F5 Stego ➔ Watermark with DWT!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.1: Comparative architectural pipelines of Cryptography, Steganography, and Digital Watermarking.
              </p>
            </div>

            {/* Diagram 2: Chi-Square Steganalysis PoV Attack */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span>📊</span> Diagram B: Chi-Square ($\chi^2$) Histogram Steganalysis Attack
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Left: Pristine Image Histogram */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="25" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#34d399" strokeWidth="1.5" />
                    <text x="130" y="47" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">PRISTINE NATURAL IMAGE</text>
                    <rect x="50" y="110" width="30" height="90" fill="#064e3b" />
                    <text x="65" y="215" fill="#d1fae5" textAnchor="middle" fontSize="7.5">2k (214)</text>
                    <rect x="85" y="145" width="30" height="55" fill="#064e3b" />
                    <text x="100" y="215" fill="#d1fae5" textAnchor="middle" fontSize="7.5">2k+1(215)</text>
                    <rect x="135" y="80" width="30" height="120" fill="#064e3b" />
                    <rect x="170" y="125" width="30" height="75" fill="#064e3b" />
                    <text x="130" y="240" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8">Natural Asymmetric PoVs (High χ²)</text>
                  </g>

                  {/* Right: Stego Image Histogram */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="25" width="210" height="230" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="370" y="47" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="9.5">LSB STEGO MODIFIED IMAGE</text>
                    <rect x="290" y="128" width="30" height="72" fill="#450a0a" />
                    <text x="305" y="215" fill="#fee2e2" textAnchor="middle" fontSize="7.5">2k (214)</text>
                    <rect x="325" y="128" width="30" height="72" fill="#450a0a" />
                    <text x="340" y="215" fill="#fee2e2" textAnchor="middle" fontSize="7.5">2k+1(215)</text>
                    <rect x="375" y="102" width="30" height="98" fill="#450a0a" />
                    <rect x="410" y="102" width="30" height="98" fill="#450a0a" />
                    <text x="370" y="240" fill="#f87171" fontWeight="bold" textAnchor="middle" fontSize="8">Artificial Symmetry (χ² drops to 0!)</text>
                  </g>

                  <text x="250" y="290" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Chi-Square detects spatial LSB steganography in seconds by measuring equalized Pairs of Values.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 10.2: Statistical Chi-Square ($\chi^2$) analysis detecting artificial equalization in LSB Pairs of Values (PoVs).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Information Hiding Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads detect insider steganographic data exfiltration, integrate crypto-watermarking in hospital genetics, defend power grids against timing stego, and author steganalysis labs across Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                &gt;
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
                  <span>⚡</span> Information Hiding Threat ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Security Architecture Action
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
              Guidelines for cybersecurity defenders and enterprise Data Loss Prevention architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Information Hiding Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Encrypt Before Steganography:</strong> Layer AES-256 inside stego for true defense-in-depth.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Implement Active DLP Sanitization:</strong> Transcode outgoing public images to destroy hidden LSBs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Matrix Embedding (F5):</strong> Minimize cover pixel modifications to evade Chi-Square steganalysis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Normalize Network Jitter:</strong> Defeat protocol timing steganography across critical SCADA links.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Hiding Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Confusing Stego with Watermarking:</strong> Watermark protects the carrier; Stego protects the payload.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Relying on Plain LSB Stego:</strong> Chi-Square and Sample Pair steganalysis detect LSB in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Over-Embedding Secret Bits:</strong> High capacity (&gt;0.1 bpp) triggers statistical anomaly alarms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Violating IT Act Section 69:</strong> Refusing to assist lawful decryption carries 7 years imprisonment.</span>
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
                  <span><strong>Deploy Deep Learning Steganalysis:</strong> Use SRNet CNN models to detect adaptive stego (S-UNIWARD).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act 2023:</strong> Guard against malicious insider exfiltration penalties (₹250 Cr).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Audit Zero-Width Unicode in DLP:</strong> Flag invisible characters (`U+200B`) in outgoing text/emails.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Combine Crypto + Watermarking:</strong> Encrypt patient EHR databases and watermark DICOM viewer sessions.</span>
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
              Synthesize key information-hiding distinctions before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cybersecurity Defenders
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  The fundamental three-way distinction: Cryptography protects the MEANING of the message (existence is obvious); Steganography conceals the EXISTENCE of the message (the cover file looks innocent); Digital Watermarking protects the CARRIER MEDIA itself (by permanently embedding copyright/provenance).
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  Why Steganalysis works: modifying the least significant bits of pixel pairs (214 and 215) creates unnatural statistical symmetry between even and odd frequencies. Chi-Square ($\chi^2$) analysis detects this artificial symmetry in milliseconds.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all enterprise DLP configurations, enforce Active Content Sanitization on outgoing web attachments: by simply re-encoding outgoing PNG/BMP images into lossy JPEG with quality factor 85, you permanently strip hidden spatial stego payloads with zero disruption to real users.
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
                <span>Crypto hides MEANING; Stego hides EXISTENCE; Watermark protects CARRIER.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Stego payload is disposable wrapping; Watermark payload is bound to host media.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Chi-Square (χ²) analysis detects Spatial LSB by measuring equalized Pairs of Values.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Matrix Embedding (F5) embeds multiple bits with minimal cover modifications.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Zero-Width Unicode (`U+200B`) enables invisible linguistic steganography in text.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 69 mandates up to 7 years jail for refusing decryption assistance.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Steganography vs Digital Watermarking vs Cryptography FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Steganography vs Digital Watermarking vs Cryptography (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The holy trinity of information hiding—Cryptography, Steganography, and Digital Watermarking—forms the bedrock of modern data security and privacy. Remember the golden distinctions: Cryptography scrambles meaning, Steganography conceals existence, and Digital Watermarking defends the host carrier asset. In your career as a cybersecurity defender, always remember to deploy multi-layered defenses: encrypt the data, watermark the asset, and sanitize outgoing channels to neutralize covert steganographic leaks."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
