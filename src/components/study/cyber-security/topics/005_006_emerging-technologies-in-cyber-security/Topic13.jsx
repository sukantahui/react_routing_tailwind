import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic13_files/topic13_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import nextgenEnginePy from "./topic13_files/nextgen_security_synthesis.py?raw";

const Topic13 = () => {
  // Unique SVG IDs
  const svg5PillarId = useId();
  const svgDefenseOnionId = useId();

  // =========================================================================
  // STUDIO 1: 5-PILLAR ARCHITECTURE SYNTHESIS & RESILIENCE CALCULATOR
  // =========================================================================
  const [p1AiSoar, setP1AiSoar] = useState(true);
  const [p2BlockchainDid, setP2BlockchainDid] = useState(true);
  const [p3QkdPhotonic, setP3QkdPhotonic] = useState(true);
  const [p4NistPqc, setP4NistPqc] = useState(true);
  const [p5ZeroTrust, setP5ZeroTrust] = useState(true);

  const resilienceAssessment = useMemo(() => {
    let score = 0;
    if (p1AiSoar) score += 20;
    if (p2BlockchainDid) score += 20;
    if (p3QkdPhotonic) score += 20;
    if (p4NistPqc) score += 20;
    if (p5ZeroTrust) score += 20;

    let tier = "";
    let badgeColor = "";
    let desc = "";

    if (score === 100) {
      tier = "TIER-5: TRANSCENDENT NEXT-GEN RESILIENCE ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      desc = "Maximum state-of-the-art security posture. Unified machine-speed AI self-healing, sovereign DID identity, quantum-safe transit, and physical Heisenberg unbreakability.";
    } else if (score &ge; 60) {
      tier = "TIER-3: TRANSITIONAL HYBRID RESILIENCE ⚠️";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
      desc = "Partially modernized infrastructure. Gaps remain in either quantum readiness, autonomous remediation, or continuous zero-trust authorization.";
    } else {
      tier = "TIER-1: OBSOLETE LEGACY PERIMETER (CRITICAL RISK) 🚨";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      desc = "High-risk legacy perimeter. Vulnerable to machine-speed AI attacks, lateral ransomware spread, and Harvest-Now-Decrypt-Later quantum cracking.";
    }

    return { score, tier, badgeColor, desc };
  }, [p1AiSoar, p2BlockchainDid, p3QkdPhotonic, p4NistPqc, p5ZeroTrust]);

  // =========================================================================
  // STUDIO 2: LIVE MULTILATERAL COORDINATED ATTACK SIMULATION
  // =========================================================================
  const [attackLaunched, setAttackLaunched] = useState(false);

  const attackSimulation = useMemo(() => {
    if (!attackLaunched) {
      return {
        overall: "STANDBY (Click 'Launch Multilateral Nation-State Attack')",
        badgeColor: "bg-slate-800 text-slate-400 border-slate-700",
        stages: [
          { name: "1. AI Deepfake Phishing & Credential Theft", status: "PENDING", details: "Waiting for simulation trigger..." },
          { name: "2. East-West Lateral Movement & SMB Probing", status: "PENDING", details: "Waiting for simulation trigger..." },
          { name: "3. Harvest Now, Decrypt Later (Quantum Archival)", status: "PENDING", details: "Waiting for simulation trigger..." }
        ]
      };
    }

    const stage1Success = p5ZeroTrust && p2BlockchainDid;
    const stage2Success = p5ZeroTrust;
    const stage3Success = p4NistPqc || p3QkdPhotonic;

    const allNeutralized = stage1Success && stage2Success && stage3Success;

    return {
      overall: allNeutralized ? "ATTACK COMPLETELY REPELLED ✔ (All 3 Stages Neutralized)" : "BREACH OCCURRED 🚨 (Defensive Gaps Exploited)",
      badgeColor: allNeutralized ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-rose-950 text-rose-300 border-rose-700",
      stages: [
        {
          name: "1. AI Deepfake Phishing & Credential Theft",
          status: stage1Success ? "NEUTRALIZED ✔" : "COMPROMISED 🚨",
          details: stage1Success
            ? "Zero Trust PDP required FIDO2 passkey & W3C DID credential. Stolen password was rejected!"
            : "Single-factor login accepted stolen password! Attacker gained initial network foothold."
        },
        {
          name: "2. East-West Lateral Movement & SMB Probing",
          status: stage2Success ? "NEUTRALIZED ✔" : "COMPROMISED 🚨",
          details: stage2Success
            ? "Layer-7 Micro-Segmentation dropped all port scans; crown-jewel databases were invisible (SDP)."
            : "Flat VLAN allowed attacker to scan internal network and compromise database server!"
        },
        {
          name: "3. Harvest Now, Decrypt Later (Quantum Archival)",
          status: stage3Success ? "NEUTRALIZED ✔" : "COMPROMISED 🚨",
          details: stage3Success
            ? "Traffic was encrypted with NIST FIPS 203 ML-KEM-768 & QKD OTP. Quantum computers cannot crack it!"
            : "Traffic encrypted with legacy RSA-2048 was archived. Shor's algorithm will crack it in 2032!"
        }
      ]
    };
  }, [attackLaunched, p5ZeroTrust, p2BlockchainDid, p4NistPqc, p3QkdPhotonic]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_5pillar_synthesis");

  const regionalDrills = {
    barrackpore_5pillar_synthesis: {
      id: "barrackpore_5pillar_synthesis",
      title: "Barrackpore Municipal Treasury: Complete 5-Pillar Architecture",
      location: "Municipal financial infrastructure processing ₹85,00,000 daily across 40 departments",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Coordinated multi-vector attack combining AI voice phishing, zero-day API exploits, and fiber interception.",
      solution:
        "Unified deployment of Zero Trust SDP, autonomous eBPF hot-patching (280ms), NIST FIPS 203 ML-KEM, and 28 km dark fiber QKD link.",
      outcome:
        "100% defense success across all attack vectors; zero downtime; zero municipal funds or citizen records compromised."
    },
    kolkata_fintech_transcendent: {
      id: "kolkata_fintech_transcendent",
      title: "Salt Lake Sector V FinTech: Transcendent Banking Hub",
      location: "High-value RTGS remittance gateway processing ₹50,00,00,000 in daily interbank clearings",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Nation-state actors attempted traffic harvesting and lateral ransomware injection across cloud microservices.",
      solution:
        "Integrated Continuous Access Evaluation (CAE), W3C DID Zero-Knowledge identity verification, and ML-DSA-65 digital signatures.",
      outcome:
        "Sub-200ms threat revocation; achieved 100% quantum resilience 4 years ahead of RBI regulatory deadlines."
    },
    ichapur_defense_quantum_enclave: {
      id: "ichapur_defense_quantum_enclave",
      title: "Ichapur Ordnance Manufacturing: Quantum Defense Enclave",
      location: "Classified defense manufacturing CAD and telemetry communications",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Advanced persistent threat (APT) automated bots launched continuous recon and cryptanalytic probing.",
      solution:
        "Deployed Moving Target Defense (MTD) rotating container IPs every 60s, paired with free-space optical QKD links.",
      outcome:
        "Adversary reconnaissance rendered instantly obsolete; certified compliance with NSA CNSA 2.0 defense standards."
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
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 13 (Capstone Synthesis)
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Synthesizing Next-Gen Security Architectures for the Modern Era
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Capstone Lab:</span>
              <span className="text-xs font-bold text-emerald-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            The capstone synthesis unifies all five emerging cybersecurity pillars into an impenetrable, 
            multi-layered defense-in-depth architecture.
            Synthesize <strong>Autonomous AI &amp; Predictive SOAR (Pillar 1)</strong>, 
            <strong>Blockchain &amp; Decentralized Identity (Pillar 2)</strong>, 
            <strong>Quantum Key Distribution (Pillar 3)</strong>, 
            <strong>NIST Post-Quantum Cryptography (Pillar 4)</strong>, and 
            <strong>Zero Trust Architecture (Pillar 5)</strong> to evaluate the 
            <strong>Next-Gen Cyber Resilience Maturity Index (0–100%)</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: 5-PILLAR ARCHITECTURE SYNTHESIS & RESILIENCE CALCULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🏛️</span> Studio 1: 5-Pillar Next-Gen Architecture Synthesis &amp; Resilience Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Toggle the 5 emerging pillars to calculate your enterprise composite resilience score and maturity tier.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", resilienceAssessment.badgeColor)}>
              {resilienceAssessment.tier}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                The 5 Foundational Security Pillars
              </span>

              {/* Pillar 1 */}
              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Pillar 1: Autonomous AI &amp; Predictive SOAR</span>
                  <span className="text-[10px] text-slate-400">Sub-second eBPF hot-patching &amp; UEBA scoring</span>
                </div>
                <input
                  type="checkbox"
                  checked={p1AiSoar}
                  onChange={(e) => setP1AiSoar(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                /&gt;
              </label>

              {/* Pillar 2 */}
              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Pillar 2: Blockchain DID &amp; WORM Audit Logs</span>
                  <span className="text-[10px] text-slate-400">W3C Verifiable Credentials &amp; Zero-Knowledge Proofs</span>
                </div>
                <input
                  type="checkbox"
                  checked={p2BlockchainDid}
                  onChange={(e) => setP2BlockchainDid(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                /&gt;
              </label>

              {/* Pillar 3 */}
              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Pillar 3: Quantum Key Distribution (QKD)</span>
                  <span className="text-[10px] text-slate-400">Heisenberg unbreakability on crown-jewel dark fiber</span>
                </div>
                <input
                  type="checkbox"
                  checked={p3QkdPhotonic}
                  onChange={(e) => setP3QkdPhotonic(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                /&gt;
              </label>

              {/* Pillar 4 */}
              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Pillar 4: NIST Post-Quantum Cryptography</span>
                  <span className="text-[10px] text-slate-400">FIPS 203 ML-KEM &amp; FIPS 204 ML-DSA standards</span>
                </div>
                <input
                  type="checkbox"
                  checked={p4NistPqc}
                  onChange={(e) => setP4NistPqc(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                /&gt;
              </label>

              {/* Pillar 5 */}
              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Pillar 5: Zero Trust Architecture (NIST SP 800-207)</span>
                  <span className="text-[10px] text-slate-400">Continuous CAE &amp; SDP invisible micro-segmentation</span>
                </div>
                <input
                  type="checkbox"
                  checked={p5ZeroTrust}
                  onChange={(e) => setP5ZeroTrust(e.target.checked)}
                  className="accent-emerald-500 w-4 h-4"
                /&gt;
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Composite Resilience Index</span>
                  <span className="font-mono text-3xl font-extrabold text-emerald-400">{resilienceAssessment.score}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={clsx(
                      "h-full transition-all duration-500",
                      resilienceAssessment.score === 100
                        ? "bg-emerald-500 shadow-lg shadow-emerald-500/50"
                        : resilienceAssessment.score >= 60
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    )}
                    style={{ width: `${resilienceAssessment.score}%` }}
                  /&gt;
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                  {resilienceAssessment.desc}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-sans">
                <strong>Transcendent Synthesis: </strong> When all 5 pillars operate in concert, adversaries face mathematical and physical impossibility across every vector of the MITRE ATT&amp;CK matrix!
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: LIVE MULTILATERAL COORDINATED ATTACK SIMULATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚔️</span> Studio 2: Live Multilateral Coordinated Cyber Attack Simulation
              </h2>
              <p className="text-xs text-slate-400">
                Launch a simulated 3-stage nation-state attack to test how your configured 5-pillar defenses intercept threats.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", attackSimulation.badgeColor)}>
              {attackSimulation.overall}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-300">Test your active 5-pillar configuration against real-world attack vectors:</span>
              <button
                onClick={() => setAttackLaunched(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-950 transition-all duration-200"
              &gt;
                Launch Multilateral Attack ⚡
              </button>
            </div>

            <div className="space-y-3">
              {attackSimulation.stages.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800/80 pb-1">
                    <span className="font-bold text-white">{st.name}</span>
                    <span className={clsx("font-bold text-xs", st.status.includes("NEUTRALIZED") ? "text-emerald-400" : st.status.includes("COMPROMISED") ? "text-rose-400" : "text-slate-500")}>
                      {st.status}
                    </span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">{st.details}</p>
                </div>
              ))}
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
                Case studies of municipal 5-pillar synthesis, FinTech quantum hubs, and defense manufacturing enclaves.
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
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                &gt;
                  {key === "barrackpore_5pillar_synthesis" ? "Barrackpore 5-Pillar Synthesis" : key === "kolkata_fintech_transcendent" ? "Kolkata FinTech Hub" : "Ichapur Defense Enclave"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Threat Scenario</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">5-Pillar Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block">Measurable Outcome</span>
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
              <span>⚠️</span> Common Synthesis Pitfalls
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Deploying Security Silos in Isolation:</strong> Deploying PQC without Zero Trust leaves internal networks open to lateral movement breaches.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Cryptographic Agility:</strong> Hardcoding single algorithms prevents rapid swapping if mathematical vulnerabilities emerge.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Treating Compliance as Security:</strong> Passing annual compliance audits does not guarantee resilience against 24/7 machine-speed AI attacks.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Next-Gen Synthesis Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce 5-Pillar Defense-in-Depth:</strong> Combine AI speed, blockchain auditability, QKD photonics, PQC math, and Zero Trust access.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Automate Continuous CBOM DevSecOps:</strong> Ensure 100% of software builds enforce NIST FIPS 203/204 post-quantum compliance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Sovereign Decentralized Identity:</strong> Eliminate password databases using W3C DIDs, FIDO2 passkeys, and Zero-Knowledge Proofs.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Think About:</span>
              <p className="leading-relaxed">
                Why is cybersecurity in 2030 considered a unified science rather than isolated tools? Because an attacker who bypasses one layer (e.g. stealing a password) is immediately blocked by the next layer (Zero Trust PDP requiring FIDO2), and their network probes are dropped by micro-segmentation while the AI hot-patches the exploit in 280ms!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>5 Pillars: AI/SOAR, Blockchain DID, QKD, NIST PQC, and Zero Trust.</li>
                <li>NIST FIPS 203 (ML-KEM-768) and FIPS 204 (ML-DSA-65) are mandatory.</li>
                <li>Zero Trust NIST SP 800-207 enforces continuous CAE and SDP boundaries.</li>
                <li>QKD provides Heisenberg unbreakability for crown-jewel infrastructure.</li>
                <li>Autonomous eBPF hot-patching closes the machine-speed velocity gap.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Next-Gen Security Synthesis Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating composite 5-pillar resilience scoring and multilateral nation-state attack defense
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={nextgenEnginePy}
            title="nextgen_security_synthesis.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Synthesizing Next-Gen Security Architectures FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the holistic synthesis of all 5 emerging cybersecurity pillars (Autonomous AI/SOAR, Blockchain DID, QKD photonics, NIST PQC standards, and Zero Trust Architecture). Explain how these technologies interact in a multi-layered defense-in-depth framework to neutralize both machine-speed AI attacks and future quantum computer threats. Detail the 2030 Cyber Resilience Maturity Model from Tier-1 Legacy to Tier-5 Transcendent."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 13: Next-Gen Security Synthesis Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 13 Note"
            downloadFileName="topic13_nextgen_synthesis_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic13;
