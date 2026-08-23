import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import iamEnginePy from "./topic11_files/iam_governance_engine.py?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgAbacId = useId();
  const svgPamId = useId();

  // =========================================================================
  // STUDIO 1: DYNAMIC ABAC POLICY DECISION POINT (PDP) SANDBOX
  // =========================================================================
  const [subjectRole, setSubjectRole] = useState("FINANCE_OFFICER"); // "FINANCE_OFFICER", "TREASURY_DIRECTOR"
  const [transferAmount, setTransferAmount] = useState(350000); // INR
  const [accessHour, setAccessHour] = useState(14); // 0 to 23 (14:00 is 2 PM)
  const [ipSubnet, setIpSubnet] = useState("10.14.20.105"); // Office vs External
  const [hasFido2Mfa, setHasFido2Mfa] = useState(true);

  const abacDecision = useMemo(() => {
    // 1. Time restriction: 08:00 to 20:00 IST
    if (accessHour < 8 || accessHour > 20) {
      return {
        decision: "DENIED ❌ (Off-Hours Access)",
        reason: `ABAC Rule Violation: Treasury disbursements are strictly prohibited outside official working hours (08:00 - 20:00 IST). Current attempt: ${accessHour}:00 IST.`,
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
      };
    }

    // 2. IP Subnet restriction
    if (!ipSubnet.startsWith("10.14.")) {
      return {
        decision: "DENIED ❌ (Untrusted External IP)",
        reason: `ABAC Rule Violation: Access originated from untrusted external IP (${ipSubnet}). Financial approvals must originate from the Barrackpore Municipal Treasury private intranet (10.14.0.0/16).`,
        badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
      };
    }

    // 3. High-Value Tier Checks (> ₹5,00,000)
    if (transferAmount > 500000) {
      if (!hasFido2Mfa) {
        return {
          decision: "STEP-UP MFA REQUIRED ⚠️",
          reason: `High-Value Policy: Transfers exceeding ₹5,00,000 require live hardware FIDO2 re-authentication from the approver.`,
          badgeColor: "bg-amber-950 text-amber-300 border-amber-700"
        };
      }
      if (subjectRole !== "TREASURY_DIRECTOR") {
        return {
          decision: "DENIED ❌ (Insufficient Authority)",
          reason: `Role Constraint: Transfers exceeding ₹5,00,000 require TREASURY_DIRECTOR approval. Current role (${subjectRole}) is capped at ₹5,00,000.`,
          badgeColor: "bg-rose-950 text-rose-300 border-rose-700"
        };
      }
    }

    return {
      decision: "PERMITTED ✔ (Access Granted)",
      reason: `All ABAC contextual policies satisfied. Transfer of ₹${transferAmount.toLocaleString('en-IN')} approved under role ${subjectRole} on trusted intranet.`,
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700"
    };
  }, [subjectRole, transferAmount, accessHour, ipSubnet, hasFido2Mfa]);

  // =========================================================================
  // STUDIO 2: PRIVILEGED ACCESS MANAGEMENT (PAM) JIT ELEVATION
  // =========================================================================
  const [jitDuration, setJitDuration] = useState(30); // 30 or 60 minutes
  const [isDualApproved, setIsDualApproved] = useState(true);

  const pamStatus = useMemo(() => {
    if (!isDualApproved) {
      return {
        status: "ELEVATION PENDING SUPERVISOR REVIEW ⏳",
        badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
        desc: "Dual-custody approval requirement: A second senior security architect must review the emergency maintenance change ticket before root credentials unlock."
      };
    }
    return {
      status: "JIT ROOT PRIVILEGES ACTIVE ✔ (Zero Standing Privileges)",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      desc: `Ephemeral root SSH certificate issued (Valid for ${jitDuration} minutes). Full session keystrokes and video recording actively streamed to SIEM. Auto-revokes upon timer expiry.`
    };
  }, [jitDuration, isDualApproved]);

  // =========================================================================
  // STUDIO 3: REGIONAL SOC CASE STUDIES (WEST BENGAL)
  // =========================================================================
  const [activeDrillKey, setActiveDrillKey] = useState("barrackpore_iam_overhaul");

  const regionalDrills = {
    barrackpore_iam_overhaul: {
      id: "barrackpore_iam_overhaul",
      title: "Barrackpore Municipal Treasury: Enterprise Zero Trust IAM Overhaul",
      location: "Central municipal finance core managing annual budgets of ₹42,00,00,000",
      engineers: "Susmita (SecOps Lead) & Debangshu (Senior Systems Architect)",
      threatScenario:
        "350 staff members operated with static passwords on legacy on-prem Active Directory; departing contractors retained orphan accounts for up to 6 months.",
      solution:
        "Deployed Cloud IdP with SCIM 2.0 automated HR sync for instantaneous JML lifecycle de-provisioning, enforced ABAC contextual rules for disbursements, and mandated YubiKey 5 NFC passkeys.",
      outcome:
        "Orphan accounts completely eliminated (0.0%); 100% compliance with ISO 27001 and CAG municipal audit frameworks."
    },
    kolkata_fintech_pam: {
      id: "kolkata_fintech_pam",
      title: "Salt Lake Sector V FinTech: Zero Standing Privileges & JIT PAM",
      location: "Core payment gateway microservices managing 150 production Kubernetes nodes",
      engineers: "Mahima (Lead Cryptographer) & Mamata (Infrastructure Lead)",
      threatScenario:
        "Developers held permanent static SSH root keys on personal laptops, creating severe lateral movement risks if an endpoint was compromised.",
      solution:
        "Implemented CyberArk PAM with Zero Standing Privileges (ZSP); developers request ephemeral 45-minute SSH certificates tied to Jira change tickets with dual-custody approval.",
      outcome:
        "Eliminated standing admin credentials entirely; complete session replay indexing for PCI-DSS compliance."
    },
    ichapur_defense_paw: {
      id: "ichapur_defense_paw",
      title: "Ichapur Defense Facility: Hardened Privileged Access Workstations (PAWs)",
      location: "Air-gapped defense manufacturing SCADA and CAD infrastructure",
      engineers: "Abhronila (CISO) & Incident Response Specialists",
      threatScenario:
        "Spear-phishing emails targeting administrative workstations attempted credential theft from LSASS memory via Pass-the-Hash.",
      solution:
        "Deployed dedicated physical PAWs for all system administrators with zero email/web access, Credential Guard virtualization isolation, and hardware FIDO2 smartcard logon.",
      outcome:
        "Administrative credentials isolated from web attack vectors; 100% defeat of credential harvesting and Pass-the-Hash attempts."
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
                <span className="px-3 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Module 005_005 • Topic 11
                </span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-semibold">
                  BCA BCAC703 • Cyber Security
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Enterprise Identity &amp; Access Management (IAM) Case Study
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Classroom Lab:</span>
              <span className="text-xs font-bold text-indigo-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Barrackpore • West Bengal
              </span>
            </div>
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Enterprise Identity and Access Management (IAM) synthesizes authentication, authorization, governance, and privileged controls into an end-to-end security fabric.
            Explore <strong>Attribute-Based Access Control (ABAC - NIST SP 800-162)</strong> runtime policy engines, 
            <strong>Privileged Access Management (PAM) with Zero Standing Privileges (ZSP)</strong> and Just-In-Time (JIT) elevation, 
            <strong>Joiner-Mover-Leaver (JML) automated SCIM lifecycles</strong>, and <strong>Separation of Duties (SoD)</strong> governance.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* STUDIO 1: DYNAMIC ABAC POLICY DECISION POINT (PDP) */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>⚙️</span> Studio 1: Dynamic ABAC (Attribute-Based Access Control) Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Tune Subject, Resource, Action, and Environment attributes to observe runtime Policy Decision Point (PDP) evaluations.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", abacDecision.badgeColor)}>
              {abacDecision.decision}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attribute Controls */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                Contextual Attribute Inputs
              </span>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold block">Subject Role:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSubjectRole("FINANCE_OFFICER")}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      subjectRole === "FINANCE_OFFICER"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    )}
                  >
                    Finance Officer (Max ₹5,00,000)
                  </button>
                  <button
                    onClick={() => setSubjectRole("TREASURY_DIRECTOR")}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      subjectRole === "TREASURY_DIRECTOR"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    )}
                  >
                    Treasury Director (Unlimited)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Transfer Amount:</span>
                  <span className="font-mono text-emerald-400">₹{transferAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="25000"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-semibold">
                  <span>Environment Time (IST):</span>
                  <span className="font-mono text-cyan-400">{accessHour}:00 IST ({accessHour >= 8 && accessHour <= 20 ? "Working Hours ✔" : "Off-Hours ❌"})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  step="1"
                  value={accessHour}
                  onChange={(e) => setAccessHour(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setIpSubnet("10.14.20.105")}
                  className={clsx(
                    "p-2 rounded-lg text-[11px] font-bold border transition-all text-center",
                    ipSubnet.startsWith("10.14.")
                      ? "bg-indigo-950 text-indigo-300 border-indigo-700"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  Office Intranet (10.14.20.105)
                </button>
                <button
                  onClick={() => setIpSubnet("203.115.42.88")}
                  className={clsx(
                    "p-2 rounded-lg text-[11px] font-bold border transition-all text-center",
                    !ipSubnet.startsWith("10.14.")
                      ? "bg-rose-950 text-rose-300 border-rose-700"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  )}
                >
                  External Public IP (203.115.42.88)
                </button>
              </div>
            </div>

            {/* Policy Evaluation Output */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Policy Decision Point (PDP) Evaluation
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {abacDecision.reason}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div><strong>XACML PDP Rule Architecture: </strong> Evaluates dynamic predicates across Subject + Resource + Action + Environment dimensions simultaneously.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO 2: PRIVILEGED ACCESS MANAGEMENT (PAM) JIT ELEVATION */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>🛡️</span> Studio 2: Privileged Access Management (PAM) Just-In-Time (JIT) Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Experience Zero Standing Privileges (ZSP): request temporary root access tied to a change ticket with dual-custody review.
              </p>
            </div>
            <div className={clsx("px-3 py-1 rounded-full text-xs font-bold border", pamStatus.badgeColor)}>
              {pamStatus.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                JIT Elevation Request Parameters
              </span>

              <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer">
                <div>
                  <div className="font-semibold text-white">Dual-Custody Supervisor Approval (Checker)</div>
                  <div className="text-[10px] text-slate-400">Senior SecOps Architect formally signed change ticket</div>
                </div>
                <input
                  type="checkbox"
                  checked={isDualApproved}
                  onChange={(e) => setIsDualApproved(e.target.checked)}
                  className="accent-indigo-500 w-4 h-4"
                />
              </label>

              <div className="space-y-1.5">
                <span className="text-slate-300 font-semibold block">Ephemeral Elevation Duration:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setJitDuration(30)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      jitDuration === 30
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    )}
                  >
                    30 Minutes (Standard Patch)
                  </button>
                  <button
                    onClick={() => setJitDuration(60)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                      jitDuration === 60
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-900 text-slate-400 border border-slate-800"
                    )}
                  >
                    60 Minutes (Emergency DB Re-index)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between text-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  PAM Security Governance State
                </span>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-800">
                  {pamStatus.desc}
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                <strong>ZSP Compliance: </strong> Privileges expire automatically when the timer reaches zero. Passwords rotate in CyberArk vault upon session closure.
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
                Real-world enterprise IAM overhauls, PAM migrations, and PAW deployments across state infrastructure.
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
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  )}
                >
                  {key === "barrackpore_iam_overhaul" ? "Barrackpore IAM" : key === "kolkata_fintech_pam" ? "Kolkata PAM ZSP" : "Ichapur PAW Deployment"}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-base font-bold text-white">{currentDrill.title}</span>
              <span className="text-xs text-indigo-400 font-mono bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
                {currentDrill.location}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              <strong className="text-slate-300">Lead SecOps Engineers: </strong> {currentDrill.engineers}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase text-[10px] tracking-wider block">Operational Vulnerability</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.threatScenario}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400 uppercase text-[10px] tracking-wider block">Enterprise IAM Architecture</span>
                <p className="text-slate-300 leading-relaxed">{currentDrill.solution}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Auditable Outcome</span>
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
              <span>⚠️</span> Common IAM Governance Pitfalls
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Neglecting the 'Mover' in JML Lifecycle:</strong> Adding new department roles without revoking old permissions creates dangerous Privilege Creep.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Allowing Permanent Standing Admin Accounts:</strong> Static root/domain admin passwords are primary targets for lateral movement and ransomware.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Ignoring Machine Identities:</strong> Hardcoding API keys and database passwords into microservice config files leaks secrets to Github.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🛡️</span> Enterprise IAM Best Practices
            </h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Enforce Zero Standing Privileges (ZSP):</strong> Grant admin rights only Just-In-Time (JIT) with mandatory dual-custody approval.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Automate JML via SCIM 2.0:</strong> Instantly de-provision all SaaS and on-prem access within 30 seconds of employee termination.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Implement Contextual ABAC &amp; Maker-Checker:</strong> Restrict high-value transactions to trusted subnets and enforce dual-authorization.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HINT & MINI CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base border-b border-slate-800 pb-3">
            <span>💡</span> Instructor Hints &amp; Retention Checklist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-300">Think About:</span>
              <p className="leading-relaxed">
                Why does modern PAM eliminate static root passwords entirely? Because engineers check out temporary short-lived SSH certificates, meaning nobody knows the underlying root password and there is nothing to steal!
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300">Student Checklist:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>ABAC evaluates Subject, Resource, Action, and Environment at runtime.</li>
                <li>Zero Standing Privileges (ZSP) grants admin rights only Just-In-Time (JIT).</li>
                <li>JML lifecycle automation via SCIM 2.0 eliminates orphan accounts.</li>
                <li>Separation of Duties (SoD) enforces Maker-Checker dual authorization.</li>
                <li>Privileged Access Workstations (PAWs) isolate admin logins from web malware.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PYTHON LAB CODE LOADER */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400 text-lg">
              🐍
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hands-on Enterprise IAM Governance Lab Script</h2>
              <p className="text-xs text-slate-400">
                Standalone Python script simulating ABAC policy decisions, PAM JIT elevation, and Separation of Duties (SoD) toxic combination detection
              </p>
            </div>
          </div>
          <PythonFileLoader
            fileModule={iamEnginePy}
            title="iam_governance_engine.py"
            highlightLines={[25, 45, 65, 85, 105]}
          />
        </section>

        {/* ========================================================================= */}
        {/* FAQ TEMPLATE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <FAQTemplate
            title="Enterprise IAM &amp; Governance FAQs"
            questions={questions}
          />
        </section>

        {/* ========================================================================= */}
        {/* TEACHER'S NOTE */}
        {/* ========================================================================= */}
        <Teacher
          note="For your BCA BCAC703 examination: Master the 4 pillars of enterprise IAM (Authentication, Authorization, IGA Governance, and PAM). Differentiate between RBAC and ABAC across Subject, Resource, Action, and Environment dimensions. Explain the Joiner-Mover-Leaver (JML) lifecycle and how SCIM 2.0 prevents Orphan Accounts and Privilege Creep. Detail the architecture of Zero Standing Privileges (ZSP), Just-In-Time (JIT) elevation, and Separation of Duties (SoD) Maker-Checker workflows."
        />

        {/* ========================================================================= */}
        {/* PLAIN TEXT PRINT & STUDY GUIDE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Topic 11: Enterprise IAM & Governance Study Guide"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 11 Note"
            downloadFileName="topic11_enterprise_iam_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
