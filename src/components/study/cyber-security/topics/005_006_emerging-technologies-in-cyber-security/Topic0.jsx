import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import threatEnginePy from "./topic0_files/threat_horizon_simulator.py?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgKillChainId = useId();
  const svgPillarsId = useId();

  // =========================================================================
  // STUDIO 1: THREAT HORIZON TIMELINE & METRICS EVOLUTION
  // =========================================================================
  const [selectedEra, setSelectedEra] = useState("2026"); // "2010", "2018", "2026"

  const eraProfiles = {
    "2010": {
      name: "Perimeter & Castle-and-Moat Era (2010)",
      dwellTime: "210 Days Average Dwell Time",
      timeToExploit: "720 Hours (30 Days TTE)",
      vectors: "Manual port scanning, unpatched DMZ web servers, macro viruses",
      defense: "Static stateful firewalls, signature-based antivirus, tape backups",
      badgeColor: "bg-slate-800 text-slate-300 border-slate-700"
    },
    "2018": {
      name: "Cloud, Mobile & Hybrid DMZ Era (2018)",
      dwellTime: "56 Days Average Dwell Time",
      timeToExploit: "48 Hours TTE",
      vectors: "Credential stuffing, credential phishing, Ransomware-as-a-Service",
      defense: "SIEM log correlation, EDR endpoint agents, SMS 2FA",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
    },
    "2026": {
      name: "Autonomous AI & Quantum Horizon Era (2026+)",
      dwellTime: "4.2 Days (Sub-minute automated compromise)",
      timeToExploit: "15 Minutes (Instant AI Weaponization)",
      vectors: "GenAI deepfakes, AI autonomous swarms, software supply chain backdoors",
      defense: "Zero Trust (NIST SP 800-207), AI-SOAR playbooks, FIDO2 passkeys, PQC",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700"
    }
  };

  const currentEra = eraProfiles[selectedEra];

  // =========================================================================
  // STUDIO 2: NEXT-GEN RESILIENCE READINESS ASSESSOR
  // =========================================================================
  const [hasZeroTrust, setHasZeroTrust] = useState(true);
  const [hasAiSoar, setHasAiSoar] = useState(true);
  const [hasFido2, setHasFido2] = useState(true);
  const [hasPqc, setHasPqc] = useState(true);

  const readinessAssessment = useMemo(() => {
    let score = 0;
    if (hasZeroTrust) score += 30;
    if (hasAiSoar) score += 25;
    if (hasFido2) score += 25;
    if (hasPqc) score += 20;

    let tier = "";
    let badgeColor = "";
    let desc = "";

    if (score >= 80) {
      tier = "NEXT-GEN QUANTUM & AI RESILIENT ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      desc = "Perimeter is hardened against autonomous machine-speed AI swarms and harvest-now-decrypt-later (HNDL) quantum threats.";
    } else if (score >= 50) {
      tier = "TRANSITIONAL DEFENSE POSTURE ⚠️";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
      desc = "Moderate resilience against automated attacks, but vulnerable to sub-minute AI weaponization and quantum decryption.";
    } else {
      tier = "LEGACY VULNERABLE PERIMETER 🚨";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      desc = "Severe exposure to automated AI phishing, credential stuffing, and perimeter bypass!";
    }

    return { score, tier, badgeColor, desc };
  }, [hasZeroTrust, hasAiSoar, hasFido2, hasPqc]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_ot_zerotrust");

  const regionalDrills = {
    barrackpore_ot_zerotrust: {
      id: "barrackpore_ot_zerotrust",
      title: "Barrackpore Industrial Belt: OT/IT Micro-Segmentation & AI Defense",
      location: "Heavy engineering industrial complex connecting 40 manufacturing plants",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Automated ransomware probes attempted to jump from corporate IT email networks into industrial control PLCs over unsegmented subnets.",
      solution:
        "Deployed Zero Trust micro-segmentation with hardware data diodes and AI-driven Modbus protocol anomaly baselining.",
      outcome:
        "100% containment of lateral movement; zero operational disruption across industrial manufacturing lines."
    },
    kolkata_fintech_soar: {
      id: "kolkata_fintech_soar",
      title: "Salt Lake Sector V FinTech: Autonomous AI-SOAR Transition",
      location: "Cloud remittance core processing 45,000 daily security alerts",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Human SOC analysts experienced alert fatigue, creating a 38-minute response delay during high-velocity credential stuffing campaigns.",
      solution:
        "Integrated AI-driven SOAR playbooks automating 94% of Level-1 triage, isolating compromised tokens and hosts within 4.2 seconds.",
      outcome:
        "Mean Time to Respond (MTTR) dropped from 38 minutes to 4.2 seconds; zero customer fund loss."
    },
    ichapur_defense_data_diode: {
      id: "ichapur_defense_data_diode",
      title: "Ichapur Ordnance Manufacturing: Air-Gapped Physical Data Diodes",
      location: "Classified defense manufacturing and CAD design repositories",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Adversaries attempted covert bidirectional optical and RF exfiltration from sensitive engineering terminal rooms.",
      solution:
        "Installed hardware optical data diodes permitting only unidirectional outbound monitoring telemetry while physically blocking inbound traffic.",
      outcome:
        "Guaranteed physical perimeter isolation; zero inbound exploit vectors into defense production cells."
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
                  Module 005_006 • Topic 0
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                The Evolving Cyber Threat Horizon &amp; Next-Generation Defenses
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
            The modern cybersecurity battleground has transformed from static castle-and-moat network perimeters into dynamic, hyper-connected digital ecosystems.
            Analyze the collapse of <strong>Time-to-Exploit (TTE)</strong>, examine the rise of <strong>Autonomous Adversarial AI</strong> and 
            <strong>Quantum Computing threats (Shor's Algorithm)</strong>, and master the four foundational pillars of next-generation defense: 
            <strong>Zero Trust (NIST SP 800-207)</strong>, <strong>AI-SOAR</strong>, <strong>FIDO2 Passkeys</strong>, and <strong>Post-Quantum Cryptography (PQC)</strong>.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: THREAT HORIZON TIMELINE & METRICS EVOLUTION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⏳</span> Studio 1: Threat Horizon Decadal Evolution (2010 ➔ 2026+)
              </h2>
              <p className="text-xs text-slate-400">
                Select an era to compare attack velocity, dwell times, and defensive paradigms across the history of cyber warfare.
              </p>
            </div>
            <div className="flex gap-2">
              {Object.keys(eraProfiles).map((eraKey) => (
                <button
                  key={eraKey}
                  onClick={() => setSelectedEra(eraKey)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
                    selectedEra === eraKey
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {eraKey} Era
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white">{currentEra.name}</span>
              <span className={clsx("px-2.5 py-1 rounded-full border font-bold text-xs", currentEra.badgeColor)}>
                {currentEra.timeToExploit}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Average Dwell Time</span>
                <span className="font-mono text-amber-400 font-bold">{currentEra.dwellTime}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Time-to-Exploit (TTE)</span>
                <span className="font-mono text-rose-400 font-bold">{currentEra.timeToExploit}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Dominant Threat Vectors</span>
                <span className="text-slate-200">{currentEra.vectors}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Defensive Doctrine</span>
                <span className="text-emerald-400">{currentEra.defense}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: NEXT-GEN RESILIENCE READINESS ASSESSOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Studio 2: Next-Generation Defense Posture &amp; Readiness Assessor
              </h2>
              <p className="text-xs text-slate-400">
                Toggle the 4 core pillars of next-gen defense to evaluate enterprise resilience against automated AI swarms and quantum decryption.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", readinessAssessment.badgeColor)}>
              {readinessAssessment.tier}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Next-Gen Security Controls
              </span>

              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">1. Zero Trust Architecture (NIST SP 800-207)</div>
                  <div className="text-[10px] text-slate-400">Micro-segmentation &amp; continuous contextual authorization</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasZeroTrust}
                  onChange={(e) => setHasZeroTrust(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">2. AI-Driven XDR &amp; Automated SOAR Playbooks</div>
                  <div className="text-[10px] text-slate-400">Sub-second machine-speed threat containment</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasAiSoar}
                  onChange={(e) => setHasAiSoar(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">3. FIDO2 / WebAuthn Hardware Passkeys</div>
                  <div className="text-[10px] text-slate-400">100% phishing-immune origin-bound authentication</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasFido2}
                  onChange={(e) => setHasFido2(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">4. Post-Quantum Cryptography (PQC - FIPS 203/204)</div>
                  <div className="text-[10px] text-slate-400">Lattice-based encryption defeating Shor's Algorithm</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasPqc}
                  onChange={(e) => setHasPqc(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perimeter Defense Score</span>
                  <span className="font-mono text-xl font-extrabold text-purple-400">{readinessAssessment.score}/100</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {readinessAssessment.desc}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Readiness Mandate: </strong> Modern defense requires simultaneous deployment of all 4 pillars to survive automated AI warfare and future quantum decryption.
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
                Case studies of OT micro-segmentation, autonomous SOAR deployments, and hardware data diodes in regional hubs.
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
                >
                  {key === "barrackpore_ot_zerotrust" ? "Barrackpore OT Zero Trust" : key === "kolkata_fintech_soar" ? "Kolkata SOAR Transition" : "Ichapur Data Diodes"}
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
                <span className="font-bold text-purple-400 uppercase text-[10px] tracking-wider block">Next-Gen Architecture</span>
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
              <span>⚠️</span> Common Pitfalls &amp; Mistakes
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Relying on Manual SOC Triage for AI Swarms:</strong> Human analysts cannot respond to sub-minute automated attack chains without SOAR playbooks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring the 'Harvest Now, Decrypt Later' Threat:</strong> Storing long-term sensitive secrets under classical RSA/ECC leaves them exposed to future quantum computers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Assuming Internal Networks are Safe:</strong> Legacy castle-and-moat perimeter models leave internal servers completely unprotected once perimeter is breached.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Next-Gen Defense Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Zero Trust Everywhere:</strong> Treat every internal connection, microservice, and API request as untrusted (NIST SP 800-207).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Automated SOAR Playbooks:</strong> Execute sub-second containment (host isolation, token revocation) automatically upon high-confidence alerts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Adopt Post-Quantum Cryptography (PQC):</strong> Begin transitioning public-key infrastructure to NIST FIPS 203/204 lattice standards.</span>
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
                Why has Time-to-Exploit (TTE) compressed from 45 days to 15 minutes? Because automated AI scanning tools crawl the global IPv4/IPv6 space in seconds, automatically synthesizing exploit payloads as soon as a CVE is published!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Attack surface has expanded into cloud, IoT, OT, and AI agents.</li>
                <li>Zero Trust operates under the 'Assume Breach' doctrine.</li>
                <li>HNDL threats store encrypted data today for future quantum decryption.</li>
                <li>XDR correlates telemetry across endpoints, cloud, network, and identity.</li>
                <li>SOAR playbooks execute sub-second automated threat containment.</li>
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
              <h2 className="text-xl font-bold text-white">Hands-on Evolving Threat Horizon &amp; Next-Gen Defense Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating decadal threat metrics, Cyber Kill Chain speed comparison, and next-gen readiness evaluation
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={threatEnginePy}
            title="threat_horizon_simulator.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="The Evolving Threat Horizon &amp; Next-Gen Defenses FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Detail the key drivers of attack surface expansion and Time-to-Exploit (TTE) compression. Explain the 'Defender's Dilemma' and why the 'Assume Breach' philosophy of Zero Trust Architecture (NIST SP 800-207) is mandatory. Master the 4 pillars of next-gen defense (Zero Trust, AI-SOAR, FIDO2 Passkeys, and Post-Quantum Cryptography) and explain the 'Harvest Now, Decrypt Later' quantum threat."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 0: Evolving Cyber Threat Horizon Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 0 Note"
            downloadFileName="topic0_threat_horizon_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
