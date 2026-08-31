import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import soarEnginePy from "./topic2_files/soar_predictive_engine.py?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgUebaId = useId();
  const svgSoarId = useId();

  // =========================================================================
  // STUDIO 1: MULTI-DIMENSIONAL UEBA ANOMALY SCORING SANDBOX
  // =========================================================================
  const [loginHour, setLoginHour] = useState(2); // 0 to 23 (2:00 AM)
  const [dataVolumeMb, setDataVolumeMb] = useState(1250); // MB transferred
  const [isImpossibleTravel, setIsImpossibleTravel] = useState(true);

  const uebaAssessment = useMemo(() => {
    let risk = 10;
    if (isImpossibleTravel) risk += 45;
    if (loginHour < 6 || loginHour > 22) risk += 20;
    if (dataVolumeMb > 500) risk += 25;

    risk = Math.min(risk, 100);

    let verdict = "";
    let badgeColor = "";
    let action = "";

    if (risk >= 75) {
      verdict = "CRITICAL ANOMALY / ACCOUNT COMPROMISE 🚨";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
      action = "Instant SOAR trigger: Active OAuth tokens revoked, host quarantined, and forensic memory dump dispatched.";
    } else if (risk >= 40) {
      verdict = "MODERATE BEHAVIORAL ANOMALY ⚠️";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
      action = "Adaptive step-up challenge: Forces mandatory FIDO2 hardware passkey re-authentication.";
    } else {
      verdict = "NORMAL BASELINE BEHAVIOR ✔";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
      action = "Activity matches historical peer-group baselines. No containment required.";
    }

    return { risk, verdict, badgeColor, action };
  }, [loginHour, dataVolumeMb, isImpossibleTravel]);

  // =========================================================================
  // STUDIO 2: PREDICTIVE THREAT INTELLIGENCE (CVSS VS EPSS MATRIX)
  // =========================================================================
  const [cvssScore, setCvssScore] = useState(7.5);
  const [hasPublicPoc, setHasPublicPoc] = useState(true);
  const [darkWebMentions, setDarkWebMentions] = useState(35);

  const epssCalculation = useMemo(() => {
    const z = (0.35 * cvssScore) + (1.8 * (hasPublicPoc ? 1.0 : 0.0)) + (0.05 * darkWebMentions) - 4.5;
    const prob = (1.0 / (1.0 + Math.exp(-z))) * 100.0;
    const epssProb = Math.min(Math.max(prob, 0.01), 99.9).toFixed(1);

    let priority = "";
    let badgeColor = "";

    if (parseFloat(epssProb) >= 60.0) {
      priority = "MAXIMUM REMEDIATION PRIORITY 🚨 (Active Exploitation Imminent)";
      badgeColor = "bg-rose-950 text-rose-300 border-rose-700";
    } else if (parseFloat(epssProb) >= 15.0) {
      priority = "HIGH REMEDIATION PRIORITY ⚠️ (Exploit Maturing)";
      badgeColor = "bg-amber-950 text-amber-300 border-amber-700";
    } else {
      priority = "LOW OPERATIONAL RISK ✔ (Theoretical Vulnerability Only)";
      badgeColor = "bg-emerald-950 text-emerald-300 border-emerald-700";
    }

    return { epssProb, priority, badgeColor };
  }, [cvssScore, hasPublicPoc, darkWebMentions]);

  // =========================================================================
  // STUDIO 3: AUTOMATED SOAR PLAYBOOK SIMULATOR
  // =========================================================================
  const [playbookTriggered, setPlaybookTriggered] = useState(false);

  const soarSteps = [
    { name: "1. EDR Host Isolation", target: "WKSTN-FINANCE-04", time: "140ms", status: "ISOLATED ✔" },
    { name: "2. IdP Token Revocation", target: "susmita@bank.in", time: "85ms", status: "REVOKED ✔" },
    { name: "3. Firewall C2 IP Block", target: "198.51.100.77", time: "60ms", status: "BLOCKED ✔" },
    { name: "4. SIEM Ticket Creation", target: "INC-88912", time: "110ms", status: "FILED ✔" }
  ];

  // =========================================================================
  // STUDIO 4: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_soar");

  const regionalDrills = {
    barrackpore_soar: {
      id: "barrackpore_soar",
      title: "Barrackpore Municipal Treasury: Sub-Second SOAR Containment",
      location: "Financial disbursement network managing municipal payments of ₹85,00,000",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "Ransomware dropper executed on an accounting terminal, attempting to enumerate network shares and encrypt files.",
      solution:
        "Deployed automated SOAR playbooks in Microsoft Sentinel, isolating the endpoint and revoking cloud credentials within 395 milliseconds of initial file renaming.",
      outcome:
        "100% containment; zero files encrypted; zero lateral movement across municipal infrastructure."
    },
    kolkata_fintech_epss: {
      id: "kolkata_fintech_epss",
      title: "Salt Lake Sector V FinTech: Risk-Based Vulnerability Management (EPSS)",
      location: "Cloud remittance microservice cluster with 1,200 production Linux nodes",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Security team was overwhelmed with 450 'Critical' CVSS vulnerabilities, causing severe patching fatigue and missed critical zero-days.",
      solution:
        "Integrated FIRST.org EPSS scores into CI/CD pipelines, focusing immediate 24-hour patching exclusively on CVEs with EPSS probability > 10%.",
      outcome:
        "Reduced critical patching backlog by 82%; 100% prevention of in-the-wild exploited vulnerabilities."
    },
    ichapur_defense_ueba: {
      id: "ichapur_defense_ueba",
      title: "Ichapur Defense Facility: Multi-Dimensional UEBA Insider Defense",
      location: "Classified defense manufacturing terminal rooms and engineering vaults",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "A rogue contractor with legitimate credentials attempted to exfiltrate 45 GB of CAD engineering blueprints outside working hours.",
      solution:
        "Deployed UEBA behavioral baselining tracking data volume and geovelocity anomalies, triggering instant session termination and physical terminal lockdown.",
      outcome:
        "Exfiltration blocked within 35 seconds of start; blueprints secured; forensic dossier compiled automatically for legal action."
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
                <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_006 • Topic 2
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                AI-Powered Anomaly Detection, Predictive Threat Intelligence &amp; SOAR
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-amber-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Modern cyber defense requires transitioning from slow, reactive human alerting to predictive, machine-speed automated response.
            Explore <strong>User &amp; Entity Behavior Analytics (UEBA)</strong> anomaly scoring, master 
            <strong>Exploit Prediction Scoring System (EPSS)</strong> predictive vulnerability prioritization, and analyze 
            <strong>Security Orchestration, Automation, and Response (SOAR) playbooks</strong> that contain ransomware in under 500 milliseconds.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: MULTI-DIMENSIONAL UEBA ANOMALY SCORING */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>👤</span> Studio 1: Multi-Dimensional UEBA Behavioral Risk Scoring
              </h2>
              <p className="text-xs text-slate-400">
                Adjust contextual telemetry parameters to observe dynamic risk scoring and automated step-up/block triggers.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", uebaAssessment.badgeColor)}>
              {uebaAssessment.verdict}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Contextual Behavioral Telemetry
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Access Time:</span>
                  <span className="font-mono text-cyan-400">{loginHour}:00 IST ({loginHour >= 6 && loginHour <= 22 ? "Normal Working Hours ✔" : "Off-Hours Anomaly 🚨"})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  step="1"
                  value={loginHour}
                  onChange={(e) => setLoginHour(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Data Transfer Volume:</span>
                  <span className="font-mono text-amber-400 font-bold">{dataVolumeMb} MB ({dataVolumeMb > 500 ? "Bulk Exfil Indicator 🚨" : "Normal Volume ✔"})</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="50"
                  value={dataVolumeMb}
                  onChange={(e) => setDataVolumeMb(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer pt-2">
                <div>
                  <div className="font-semibold text-white">Geovelocity Violation (Impossible Travel)</div>
                  <div className="text-[10px] text-slate-400">Consecutive logins across 7,000 km in under 20 minutes</div>
                </div>
                <input
                  type="checkbox"
                  checked={isImpossibleTravel}
                  onChange={(e) => setIsImpossibleTravel(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Composite UEBA Risk Score</span>
                  <span className={clsx("font-mono text-2xl font-black", uebaAssessment.risk >= 75 ? "text-rose-400" : uebaAssessment.risk >= 40 ? "text-amber-400" : "text-emerald-400")}>
                    {uebaAssessment.risk} / 100
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {uebaAssessment.action}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Peer Group Baseline: </strong> Evaluated against 40 municipal finance employees in Barrackpore. Outlier deviation calculated via Mahalanobis distance.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: PREDICTIVE THREAT INTELLIGENCE (EPSS) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🎯</span> Studio 2: Predictive Threat Intelligence (CVSS vs EPSS Scoring)
              </h2>
              <p className="text-xs text-slate-400">
                Simulate FIRST.org Exploit Prediction Scoring System (EPSS) calculating real-world probability of 30-day in-the-wild exploitation.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", epssCalculation.badgeColor)}>
              {epssCalculation.priority}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Predictive Vulnerability Parameters
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>CVSS Base Score (Severity in a vacuum):</span>
                  <span className="font-mono text-cyan-400 font-bold">CVSS {cvssScore.toFixed(1)} / 10.0</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={cvssScore}
                  onChange={(e) => setCvssScore(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Dark Web / Exploit Forum Chatter Mentions:</span>
                  <span className="font-mono text-rose-400 font-bold">{darkWebMentions} Mentions</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={darkWebMentions}
                  onChange={(e) => setDarkWebMentions(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer pt-2">
                <div>
                  <div className="font-semibold text-white">Public Proof-of-Concept (PoC) on GitHub</div>
                  <div className="text-[10px] text-slate-400">Weaponized exploit script available to script kiddies</div>
                </div>
                <input
                  type="checkbox"
                  checked={hasPublicPoc}
                  onChange={(e) => setHasPublicPoc(e.target.checked)}
                  className="accent-rose-500 w-4 h-4"
                />
              </label>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">EPSS Exploit Probability (30-Day)</span>
                  <span className={clsx("font-mono text-2xl font-black", parseFloat(epssCalculation.epssProb) >= 60 ? "text-rose-400" : "text-emerald-400")}>
                    {epssCalculation.epssProb}%
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {parseFloat(epssCalculation.epssProb) >= 60
                    ? "CRITICAL URGENCY: Active exploit scripts circulating with high dark web demand. Automated botnet scanning in progress."
                    : "THEORETICAL EXPOSURE: High theoretical CVSS score, but zero active in-the-wild exploitation. Can be scheduled for standard monthly maintenance."}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>Strategic Advantage: </strong> Prioritizing by EPSS allows SOC teams to patch the top 5% of actively weaponized flaws, preventing 99% of ransomware intrusions.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 3: AUTOMATED SOAR PLAYBOOK SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚡</span> Studio 3: Sub-Second SOAR Ransomware Containment Playbook
              </h2>
              <p className="text-xs text-slate-400">
                Simulate how SOAR playbooks orchestrate across EDR, IdP, and Firewall APIs in under 400 milliseconds.
              </p>
            </div>
            <button
              onClick={() => setPlaybookTriggered(true)}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-rose-950 transition-all duration-200"
            >
              Trigger Emergency SOAR Playbook ⚡
            </button>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white">Playbook: RANSOMWARE_AUTOMATED_CONTAINMENT_V2</span>
              <span className="font-mono text-emerald-400 font-bold">Total Execution: 395 Milliseconds (0.39s)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {soarSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "p-3 rounded-lg border space-y-1.5 transition-all duration-300",
                    playbookTriggered
                      ? "bg-slate-900 border-emerald-800/80 text-slate-200"
                      : "bg-slate-900/40 border-slate-800 text-slate-500"
                  )}
                >
                  <div className="font-bold text-white text-[11px]">{step.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">Target: {step.target}</div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                    <span className="font-mono text-cyan-400 text-[10px]">{step.time}</span>
                    <span className={clsx("font-bold text-[10px]", playbookTriggered ? "text-emerald-400" : "text-slate-600")}>
                      {playbookTriggered ? step.status : "IDLE"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 text-slate-300 leading-relaxed">
              <strong className="text-white">SOC Outcome: </strong>
              {playbookTriggered
                ? "Ransomware process killed, network adapter disabled, OAuth session revoked, and C2 IP blocked at perimeter before a single file could be encrypted. Mean Time to Respond (MTTR): 395ms."
                : "Awaiting incident alert trigger. Click the button above to simulate automated sub-second containment."}
            </div>
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
                Case studies of SOAR playbooks, EPSS risk prioritization, and UEBA insider detection across state hubs.
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
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_soar" ? "Barrackpore SOAR" : key === "kolkata_fintech_epss" ? "Kolkata EPSS Patching" : "Ichapur UEBA Defense"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-amber-400 font-mono bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
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
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">SOAR / CTI Architecture</span>
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
                <span><strong>Automating Destructive Actions on Crown Jewels without HITL:</strong> Automated SOAR playbooks isolating production database servers can cause catastrophic business outages.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Patching Strictly by CVSS 9.0+:</strong> Over 60% of CVSS 9.0+ CVEs are never exploited in the wild; prioritize with EPSS real-world probabilities.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Treating Static SIEM Rules as Anomaly Detection:</strong> Static rules miss slow-and-low password sprays and distributed credential abuses.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Predictive SOC Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Deploy Human-in-the-Loop (HITL) for Mission-Critical Nodes:</strong> Automate data enrichment instantly, but require 1-click human confirmation before full server shutdown.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Risk-Based Vulnerability Management (RBVM):</strong> Combine CVSS + EPSS + Business Asset Criticality to focus remediation efforts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Continuous Geovelocity &amp; UEBA Baselining:</strong> Detect compromised credentials instantly upon impossible travel violations.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300">Think About:</span>
              <p className="leading-relaxed">
                Why does SOAR achieve sub-500ms response times? Because it dispatches direct REST API calls (to CrowdStrike, Entra ID, and Palo Alto Firewalls) simultaneously in parallel, without waiting for a human analyst to open ticketing tools!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>UEBA evaluates multi-dimensional user baselines and peer groups.</li>
                <li>EPSS predicts the 30-day real-world exploitation probability of CVEs.</li>
                <li>SOAR combines Orchestration, Automation (Playbooks), and Response.</li>
                <li>MTTR is reduced from 45 minutes to sub-500ms via automated playbooks.</li>
                <li>Human-in-the-Loop (HITL) protects crown-jewel database servers from outages.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950 border border-amber-800 text-amber-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on AI Anomaly, Predictive CTI &amp; SOAR Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating UEBA risk scoring, EPSS probability modeling, and automated sub-second SOAR playbook execution
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={soarEnginePy}
            title="soar_predictive_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="AI Anomaly Detection, Predictive CTI &amp; SOAR FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the technical principles of User and Entity Behavior Analytics (UEBA) and how it detects insider threats via peer baselining and geovelocity analysis. Differentiate between CVSS (theoretical severity) and EPSS (real-world exploitation probability). Detail the 3 components of SOAR (Orchestration, Automation, Response) and explain how automated playbooks achieve sub-second MTTR."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 2: AI Anomaly Detection & SOAR Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 2 Note"
            downloadFileName="topic2_soar_predictive_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
