import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import quantumEnginePy from "./topic7_files/shor_quantum_threat_simulator.py?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgComplexityId = useId();
  const svgMoscaId = useId();

  // =========================================================================
  // STUDIO 1: SHOR'S ALGORITHM FACTORIZATION & QUBIT REQUIREMENTS
  // =========================================================================
  const [selectedTarget, setSelectedTarget] = useState("RSA-2048"); // "RSA-1024", "RSA-2048", "RSA-4096", "ECC-256"

  const targetProfiles = {
    "RSA-1024": {
      name: "RSA-1024 (Legacy Public Key)",
      classicalTime: "1,000 Supercomputer Years",
      logicalQubits: "2,051 Logical Qubits",
      physicalQubits: "2,051,000 Physical Qubits (Surface Code)",
      quantumCrackTime: "1.8 Hours on a CRQC",
      vulnerabilityTier: "CATASTROPHIC QUANTUM COLLAPSE 🚨",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    },
    "RSA-2048": {
      name: "RSA-2048 (Current Global Standard)",
      classicalTime: "300 Trillion Years (Classical GNFS)",
      logicalQubits: "4,099 Logical Qubits",
      physicalQubits: "4,099,000 Physical Qubits (Surface Code)",
      quantumCrackTime: "8.4 Hours on a CRQC",
      vulnerabilityTier: "CATASTROPHIC QUANTUM COLLAPSE 🚨",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    },
    "RSA-4096": {
      name: "RSA-4096 (High Security Public Key)",
      classicalTime: "> 10^20 Years (Age of Universe)",
      logicalQubits: "8,195 Logical Qubits",
      physicalQubits: "8,195,000 Physical Qubits (Surface Code)",
      quantumCrackTime: "38 Hours on a CRQC",
      vulnerabilityTier: "POLYNOMIAL TIME BREAKDOWN 🚨",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    },
    "ECC-256": {
      name: "ECC-256 (NIST P-256 / Ed25519)",
      classicalTime: "10 Billion Years (Pollard's Rho)",
      logicalQubits: "2,330 Logical Qubits (Fewer than RSA!)",
      physicalQubits: "2,330,000 Physical Qubits (Surface Code)",
      quantumCrackTime: "1.5 Hours on a CRQC",
      vulnerabilityTier: "BREAKS FIRST (Earlier than RSA-2048!) 🚨",
      badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
    }
  };

  const currentTarget = targetProfiles[selectedTarget];

  // =========================================================================
  // STUDIO 2: MOSCA'S THEOREM & HNDL RISK CALCULATOR
  // =========================================================================
  const [shelfLifeX, setShelfLifeX] = useState(15); // Years data must remain secret
  const [migrationTimeY, setMigrationTimeY] = useState(3); // Years to complete PQC transition
  const [quantumArrivalZ, setQuantumArrivalZ] = useState(7); // Years until CRQC online

  const moscaAssessment = useMemo(() => {
    const totalRiskWindow = shelfLifeX + migrationTimeY;
    const isExposed = totalRiskWindow > quantumArrivalZ;

    let status = "";
    let badgeColor = "";
    let action = "";

    if (isExposed) {
      status = "CRITICAL HNDL EXPOSURE 🚨 (X + Y > Z)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      action = `Adversaries intercepting ciphertext today will decrypt it in year ${quantumArrivalZ}. Since data must remain secret for ${shelfLifeX} years and migration takes ${migrationTimeY} years, your systems are ALREADY breached! Immediate hybrid PQC TLS transition required.`;
    } else {
      status = "PQC MIGRATION WINDOW SECURE ✔ (X + Y <= Z)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      action = "Migration will complete before a Cryptanalytically Relevant Quantum Computer arrives. Data secrecy will be preserved.";
    }

    return { totalRiskWindow, isExposed, status, badgeColor, action };
  }, [shelfLifeX, migrationTimeY, quantumArrivalZ]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_pqc_audit");

  const regionalDrills = {
    barrackpore_pqc_audit: {
      id: "barrackpore_pqc_audit",
      title: "Barrackpore Municipal Treasury: Mosca's Theorem & PQC Transition",
      location: "Municipal pension and property deed archives storing 15-year confidential records",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Long-term municipal tax records encrypted under RSA-2048 were exposed to foreign nation-state 'Harvest Now, Decrypt Later' (HNDL) bulk collection.",
      solution:
        "Applied Mosca's Theorem, initiating an emergency 2-year hybrid PQC rollout (X25519Kyber768) across all municipal VPN gateways.",
      outcome:
        "Neutralized HNDL traffic harvesting; eliminated quantum decryption exposure across ₹85,00,000 in municipal contracts."
    },
    kolkata_fintech_grover_hardening: {
      id: "kolkata_fintech_grover_hardening",
      title: "Salt Lake Sector V FinTech: Grover-Resilient AES-256 Upgrade",
      location: "Cloud remittance tokenization vaults storing 4,500,000 customer payment records",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Legacy payment databases encrypted with AES-128 faced quantum effective security reduction to 64 bits under Grover's Algorithm.",
      solution:
        "Upgraded all database tokenization and field-level encryption engines to AES-256, providing a permanent 128-bit quantum security floor.",
      outcome:
        "Guaranteed mathematical quantum immunity against Grover search; certified 100% compliance with RBI post-quantum guidelines."
    },
    ichapur_defense_hybrid_vpn: {
      id: "ichapur_defense_hybrid_vpn",
      title: "Ichapur Defense Facility: Hybrid Classical-PQC Tunneling",
      location: "Classified defense manufacturing and CAD engineering WAN links",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries recorded IPsec VPN traffic over telecom fiber lines with intent to run Shor's algorithm once CRQCs emerge.",
      solution:
        "Deployed WireGuard and IPsec tunnels upgraded with dual-encapsulation (ECDH + NIST FIPS 203 ML-KEM-768).",
      outcome:
        "Zero data decryptable by future quantum computers; validated 100% throughput across 10Gbps encrypted WAN links."
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
                  Module 005_006 • Topic 7
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Quantum Computing Threat to Modern Cryptography (Shor's Algorithm)
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
            Quantum computers harness quantum superposition and entanglement to solve fundamental mathematical problems exponentially faster than classical computers.
            Examine how <strong>Shor's Algorithm ($O((\log N)^3)$) completely breaks RSA, Diffie-Hellman, and ECC</strong>, analyze 
            <strong>Grover's Algorithm quadratic key-halving on AES</strong>, calculate the <strong>Logical vs Physical Qubit requirements under Surface Codes</strong>, 
            and apply <strong>Mosca's Theorem ($X+Y&gt;Z$)</strong> to counter <strong>Harvest Now, Decrypt Later (HNDL)</strong> attacks.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: SHOR'S FACTORIZATION & QUBIT CALCULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚛️</span> Studio 1: Shor's Algorithm Factorization &amp; Qubit Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Select a public-key algorithm to compare classical GNFS crack times against polynomial-time quantum factorization.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", currentTarget.badgeColor)}>
              {currentTarget.vulnerabilityTier}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {Object.keys(targetProfiles).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedTarget(key)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    selectedTarget === key
                      ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">{currentTarget.name}</span>
                <span className="font-mono text-rose-400 font-bold">Quantum Break Time: {currentTarget.quantumCrackTime}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Classical Time to Crack</span>
                  <span className="font-mono text-emerald-400 font-bold">{currentTarget.classicalTime}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Logical Qubits Needed</span>
                  <span className="font-mono text-cyan-400 font-bold">{currentTarget.logicalQubits}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Physical Qubits Needed</span>
                  <span className="font-mono text-amber-400 font-bold">{currentTarget.physicalQubits}</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Shor's Algorithm Complexity</span>
                  <span className="font-mono text-rose-400 font-bold">$O((\log N)^3)$ Polynomial</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 leading-relaxed font-sans">
                <strong className="text-white">Forensic Note: </strong>
                {selectedTarget === "ECC-256"
                  ? "CRITICAL PARADOX: Despite offering 128-bit classical security, ECC-256 requires only ~2,330 logical qubits (compared to 4,099 for RSA-2048). ECC will fall to earlier, smaller quantum computers before RSA!"
                  : "Shor's algorithm uses the Quantum Fourier Transform (QFT) to solve the Hidden Subgroup Problem, reducing prime factorization from exponential to polynomial time."}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: MOSCA'S THEOREM & HNDL RISK CALCULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⏳</span> Studio 2: Mosca's Theorem &amp; 'Harvest Now, Decrypt Later' (HNDL) Assessor
              </h2>
              <p className="text-xs text-slate-400">
                Evaluate enterprise exposure under Michele Mosca's Theorem ($X + Y &gt; Z$) to determine if your archived data is already compromised.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", moscaAssessment.badgeColor)}>
              {moscaAssessment.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Mosca's Theorem Variables
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Data Secrecy Shelf-Life ($X$):</span>
                  <span className="font-mono text-amber-400 font-bold">{shelfLifeX} Years (Defense/Financial Records)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={shelfLifeX}
                  onChange={(e) => setShelfLifeX(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Enterprise Migration Timeline ($Y$):</span>
                  <span className="font-mono text-cyan-400 font-bold">{migrationTimeY} Years (PQC Transition)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={migrationTimeY}
                  onChange={(e) => setMigrationTimeY(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Quantum Arrival Horizon ($Z$):</span>
                  <span className="font-mono text-rose-400 font-bold">{quantumArrivalZ} Years (CRQC Emergence)</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={quantumArrivalZ}
                  onChange={(e) => setQuantumArrivalZ(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 font-mono">
                  <span className="text-slate-400">Total Vulnerability Window:</span>
                  <span className={clsx("text-base font-bold", moscaAssessment.isExposed ? "text-rose-400" : "text-emerald-400")}>
                    X + Y = {moscaAssessment.totalRiskWindow} Years vs Z ({quantumArrivalZ} Years)
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  {moscaAssessment.action}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>HNDL Countermeasure: </strong> Deploy Hybrid Classical-PQC TLS (X25519Kyber768) immediately to neutralize ongoing data harvesting today!
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
                Case studies of municipal PQC roadmaps, Grover-resilient AES-256 migrations, and hybrid quantum VPNs.
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
                  {key === "barrackpore_pqc_audit" ? "Barrackpore PQC Audit" : key === "kolkata_fintech_grover_hardening" ? "Kolkata AES-256 Hardening" : "Ichapur Hybrid VPN"}
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
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Quantum-Resilient Architecture</span>
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
                <span><strong>Assuming RSA-4096 is Quantum-Safe:</strong> Doubling RSA key size merely increases Shor's crack time from 8 hours to 38 hours; it remains broken in polynomial time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring the 'Harvest Now, Decrypt Later' Threat:</strong> Waiting for physical quantum computers before deploying PQC leaves all archived data permanently compromised.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Assuming AES-128 is Secure Against Quantum Search:</strong> Grover's algorithm halves key strength to 64 bits; migrate immediately to AES-256.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Quantum Readiness Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Hybrid TLS 1.3 (X25519 + ML-KEM-768):</strong> Combine classical and post-quantum key encapsulation to protect transit data today.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Standardize on AES-256 &amp; SHA-384/512:</strong> Maintain a permanent 128-bit quantum security floor against Grover's algorithm.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Crypto-Agility Across Systems:</strong> Design software so cryptographic algorithms can be swapped via configuration without code rewrites.</span>
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
                Why does ECC-256 break on a smaller quantum computer than RSA-2048? Because ECC uses much smaller mathematical group sizes (256 bits vs 2048 bits), requiring only ~2,330 logical qubits compared to ~4,099 for RSA-2048!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Shor's Algorithm breaks RSA, DH, and ECC in polynomial time $O((\log N)^3)$.</li>
                <li>Grover's Algorithm halves symmetric key bit security (AES-128 $\rightarrow$ 64 bits).</li>
                <li>AES-256 retains 128-bit quantum security and is permanently safe.</li>
                <li>Mosca's Theorem: If $X + Y &gt; Z$, systems are already exposed to HNDL.</li>
                <li>Hybrid TLS 1.3 combines classical and post-quantum keys for safe transit.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on Shor's Algorithm &amp; Quantum Threat Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating Shor's factorization, Grover's key halving, Surface Code qubit counts, and Mosca's risk formula
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={quantumEnginePy}
            title="shor_quantum_threat_simulator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Quantum Computing Threat &amp; Shor's Algorithm FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the mathematical mechanics of Shor's Algorithm ($O((\log N)^3)$ polynomial time) and explain which public-key algorithms it breaks. Contrast it with Grover's Algorithm ($O(\sqrt{N})$ quadratic search) and explain why AES-256 remains secure. State Mosca's Theorem ($X+Y>Z$) and detail the 'Harvest Now, Decrypt Later' (HNDL) threat model. Explain the difference between Physical and Logical Qubits under Surface Code error correction."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: Quantum Computing Threat Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 7 Note"
            downloadFileName="topic7_quantum_threat_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
