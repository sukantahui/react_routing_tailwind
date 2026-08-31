import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Studio 1: Cyber Law Offense Calculator State
  const [selectedOffenseKey, setSelectedOffenseKey] = useState("sec_66_hacking");

  // Studio 2: Section 65B Forensic Validator State
  const [hashMatches, setHashMatches] = useState(true);
  const [writeBlockerUsed, setWriteBlockerUsed] = useState(true);
  const [chainOfCustodyLogged, setChainOfCustodyLogged] = useState(true);
  const [officerSigned, setOfficerSigned] = useState(true);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_highcourt");

  // Cyber Offenses Data for Studio 1
  const cyberOffenses = {
    sec_65_source: {
      key: "sec_65_source",
      title: "Tampering with Source Documents",
      section: "IT Act Section 65",
      icon: "📜",
      color: "from-amber-500 to-yellow-600",
      badgeClass: "bg-amber-900/50 text-amber-300 border-amber-700",
      maxImprisonment: "Up to 3 Years Imprisonment",
      maxFineINR: "₹2,00,000 (Two Lakhs)",
      legalNature: "Cognizable, Bailable",
      description:
        "Knowingly or intentionally concealing, destroying, or altering any computer source code required to be maintained by regulatory law or corporate compliance.",
      trialCourt: "Judicial Magistrate First Class / Metropolitan Magistrate"
    },
    sec_66_hacking: {
      key: "sec_66_hacking",
      title: "Hacking & Unauthorized Access",
      section: "IT Act Section 66 (with Sec 43)",
      icon: "💻",
      color: "from-rose-500 to-red-600",
      badgeClass: "bg-rose-900/50 text-rose-300 border-rose-700",
      maxImprisonment: "Up to 3 Years Imprisonment",
      maxFineINR: "₹5,00,000 (Five Lakhs)",
      legalNature: "Cognizable, Bailable",
      description:
        "Accessing, downloading, introducing viruses, or damaging any computer system dishonestly or fraudulently without the owner's explicit written permission.",
      trialCourt: "Chief Judicial Magistrate / Cyber Appellate Tribunal"
    },
    sec_66c_identity: {
      key: "sec_66c_identity",
      title: "Identity Theft & Password Stealing",
      section: "IT Act Section 66C / 66D",
      icon: "🪪",
      color: "from-purple-500 to-indigo-600",
      badgeClass: "bg-purple-900/50 text-purple-300 border-purple-700",
      maxImprisonment: "Up to 3 Years Imprisonment",
      maxFineINR: "₹1,00,000 (One Lakh)",
      legalNature: "Cognizable, Bailable",
      description:
        "Fraudulently making use of electronic signatures, passwords, or biometrics of another person, or cheating by personation via phishing portals.",
      trialCourt: "Judicial Magistrate First Class"
    },
    sec_66f_terrorism: {
      key: "sec_66f_terrorism",
      title: "Cyber Terrorism (Grid Sabotage)",
      section: "IT Act Section 66F",
      icon: "☢️",
      color: "from-red-600 to-rose-700",
      badgeClass: "bg-red-950 text-red-300 border-red-800",
      maxImprisonment: "LIFE IMPRISONMENT (Mandatory)",
      maxFineINR: "Unlimited Statutory Fine",
      legalNature: "Cognizable, NON-BAILABLE",
      description:
        "Cyber attacks intended to threaten the unity, integrity, security, or sovereignty of India or strike terror in people by disrupting critical infrastructure.",
      trialCourt: "Sessions Court / Special NIA Cyber Court"
    },
    sec_70_protected: {
      key: "sec_70_protected",
      title: "Unauthorized Access to Protected Systems",
      section: "IT Act Section 70",
      icon: "🏭",
      color: "from-orange-500 to-amber-600",
      badgeClass: "bg-orange-900/50 text-orange-300 border-orange-700",
      maxImprisonment: "Up to 10 Years Imprisonment",
      maxFineINR: "Heavy Financial Penalties",
      legalNature: "Cognizable, NON-BAILABLE",
      description:
        "Gaining or attempting to gain unauthorized access to computer systems officially designated as Critical Information Infrastructure (SCADA, Banking, Defense).",
      trialCourt: "Sessions Court"
    },
    dpdp_act_breach: {
      key: "dpdp_act_breach",
      title: "Personal Data Breach Negligence",
      section: "DPDP Act 2023 Section 33",
      icon: "🛡️",
      color: "from-emerald-500 to-teal-600",
      badgeClass: "bg-emerald-900/50 text-emerald-300 border-emerald-700",
      maxImprisonment: "Civil Administrative Financial Sanctions",
      maxFineINR: "Up to ₹250,00,00,000 (₹250 Crores)",
      legalNature: "Adjudicatory Board Proceedings",
      description:
        "Failure by a Data Fiduciary to implement reasonable technical security safeguards to prevent personal data breaches affecting citizen privacy.",
      trialCourt: "Data Protection Board of India (DPBI) & High Court"
    }
  };

  const activeOffense = cyberOffenses[selectedOffenseKey];

  // Forensic Evidence Admissibility Evaluator for Studio 2
  const evidenceAdmissibility = useMemo(() => {
    let isValid = true;
    let issues = [];

    if (!hashMatches) {
      isValid = false;
      issues.push("CRITICAL HASH MISMATCH: SHA-256 hash of working forensic copy does not match original evidence drive. Evidence discarded for potential tampering.");
    }

    if (!writeBlockerUsed) {
      isValid = false;
      issues.push("CONTAMINATION RISK: Hardware write-blocker was NOT used. OS file access timestamps modified during acquisition.");
    }

    if (!chainOfCustodyLogged) {
      isValid = false;
      issues.push("CHAIN OF CUSTODY GAP: Physical evidence transfer signatures are missing. Court will rule evidence inadmissible.");
    }

    if (!officerSigned) {
      isValid = false;
      issues.push("SECTION 65B DEFICIENCY: Official Section 65B Certificate is missing manager signature and hardware specifications.");
    }

    return {
      isValid,
      status: isValid ? "100% ADMISSIBLE IN COURT (Section 65B Validated)" : "INADMISSIBLE (Evidence Thrown Out of Court)",
      statusColor: isValid ? "text-emerald-400" : "text-rose-400",
      badgeClass: isValid ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-rose-950 text-rose-300 border-rose-800",
      issues
    };
  }, [hashMatches, writeBlockerUsed, chainOfCustodyLogged, officerSigned]);

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_highcourt",
      lead: "Mamata",
      role: "Principal Cyber Forensics Expert",
      location: "Kolkata High Court Jurisdiction",
      title: "Section 65B Electronic Evidence Certification",
      budget: "₹7,50,000",
      statuteSection: "Indian Evidence Act Section 65B & IT Act Sec 66",
      dilemma:
        "Presenting digital server logs and RAM memory dumps as primary evidence in a multi-crore corporate database exfiltration trial.",
      resolution:
        "Mamata prepared a certified Section 65B electronic certificate verifying hardware write-blocker acquisition, matching SHA-256 hashes, and unbroken chain of custody logs, securing full legal admissibility and conviction.",
      metrics: {
        hashAlgorithm: "SHA-256 Bit-Stream Match",
        courtVerdict: "Evidence Fully Admitted",
        statuteEnforced: "IT Act Section 66 & Sec 65B",
        compliance: "Bharatiya Sakshya Adhiniyam 2023"
      }
    },
    {
      id: "ichapur_dpdp",
      lead: "Mahima",
      role: "Chief Compliance Officer",
      location: "Ichapur General Hospital",
      title: "DPDP Act 2023 Data Fiduciary Audit",
      budget: "₹5,20,000",
      statuteSection: "DPDP Act 2023 Sections 8, 9, and 33",
      dilemma:
        "Structuring third-party medical cloud data processing contracts to prevent hospital exposure to the ₹250 Crore penalty ceiling under the DPDP Act.",
      resolution:
        "Drafted formal Data Processing Agreements (DPA) enforcing AES-256 field-level encryption, explicit patient consent logs, and mandatory 6-hour incident escalation protocols.",
      metrics: {
        liabilityShielded: "₹250 Crores Statutory Cap",
        patientConsentAudited: "45,000 Digital Records",
        fiduciaryRole: "Hospital Classified as Data Fiduciary",
        compliance: "DPBI & NABH Digital Standards"
      }
    },
    {
      id: "barrackpore_sec70",
      lead: "Debangshu",
      role: "Industrial OT Security Architect",
      location: "Barrackpore 220kV Substation Grid",
      title: "Section 70 Protected System SCADA Charter",
      budget: "₹6,80,000",
      statuteSection: "IT Act 2000 Section 70 & Section 66F",
      dilemma:
        "Formulating legal and technical access control compliance for a 220kV power transmission substation officially gazetted as a 'Protected System'.",
      resolution:
        "Implemented strict biometric physical access barriers and hardware data diodes, ensuring that any unauthorized intrusion triggers immediate 10-year criminal penal escalation under Section 70.",
      metrics: {
        statutoryClassification: "Protected System (Sec 70)",
        penalDeterrent: "Up to 10 Years Imprisonment",
        gridSecurityStandard: "IEC 62351 Cryptographic Nonces",
        compliance: "NCIIPC & CEA Cyber Security Regulations"
      }
    },
    {
      id: "jadavpur_safeharbor",
      lead: "Abhronila & Susmita",
      role: "Cyber Law Clinic Directors",
      location: "Jadavpur University Cyber Law Clinic",
      title: "Bug Bounty Safe Harbor Legal Clinic",
      budget: "₹3,80,000",
      statuteSection: "CFAA 18 U.S.C. § 1030 & IT Act Sec 66",
      dilemma:
        "Advising university student security researchers on conducting vulnerability research safely without risking criminal prosecution under IT Act Section 66 or the US CFAA.",
      resolution:
        "Authored a comprehensive guide on evaluating Bug Bounty Safe Harbor agreements, teaching researchers how to verify in-scope domains and follow Coordinated Vulnerability Disclosure (CVD).",
      metrics: {
        studentsAdvised: "180+ Ethical Hackers",
        safeHarborPoliciesVerified: "24 Enterprise VDPs",
        legalDisputes: "Zero Criminal Referrals",
        compliance: "DOJ 2022 Good-Faith Research Directive"
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
            Cyber Security Module 002_002 • Topic 8 of 12
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
            Legal vs Illegal Hacking: Cyber Law &amp; Authorization
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            The legal line separating an ethical defender from a convicted felon is explicit written authorization. Master the Indian Information 
            Technology Act 2000 (Sections 43, 65, 66, 66C, 66D, 66F, 70), Digital Personal Data Protection (DPDP) Act 2023 penalties up to ₹250 Crores, 
            and Section 65B digital evidence admissibility.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Indian IT Act & DPDP Statutory Penalty Calculator & Offense Classifier */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>⚖️</span> Studio 1: Indian Cyber Law Statutory Penalty Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a cyber offense to analyze its statutory imprisonment term, financial penalties in Indian Rupees (₹), cognizable/bail classification, and trial jurisdiction.
            </p>
          </div>

          {/* Offense Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.values(cyberOffenses).map((offense) => {
              const isSelected = selectedOffenseKey === offense.key;
              return (
                <button
                  key={offense.key}
                  onClick={() => setSelectedOffenseKey(offense.key)}
                  className={clsx(
                    "p-3 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-base sm:text-lg">{offense.icon}</div>
                  <div className="font-bold text-gray-200 mt-1 truncate">{offense.section.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{offense.title.split(" &")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Offense Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeOffense.badgeClass)}>
                  {activeOffense.section}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  {activeOffense.title}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Maximum Imprisonment</span>
                <span className="text-sm sm:text-base font-extrabold text-rose-400">{activeOffense.maxImprisonment}</span>
              </div>
            </div>

            {/* Statutory Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase">Maximum Financial Fine</span>
                <span className="font-bold text-amber-300 text-sm block">{activeOffense.maxFineINR}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase">Bail &amp; Cognizability</span>
                <span className="font-bold text-indigo-300 text-xs block">{activeOffense.legalNature}</span>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
                <span className="text-gray-400 block text-[11px] font-semibold uppercase">Trial Court Jurisdiction</span>
                <span className="font-bold text-emerald-300 text-xs block">{activeOffense.trialCourt}</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 text-xs space-y-1">
              <span className="text-gray-400 font-bold uppercase tracking-wider block">Statutory Legal Definition:</span>
              <p className="text-gray-200 leading-relaxed font-semibold">{activeOffense.description}</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Section 65B Indian Evidence Act & Forensic Admissibility Validator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏛️</span> Studio 2: Section 65B Electronic Evidence &amp; Chain of Custody Validator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Toggle forensic acquisition conditions to test whether electronic records (logs, pcap files, disk images) meet statutory admissibility requirements under Indian Evidence Act Section 65B.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Forensic Conditions Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                Forensic Acquisition Protocol Checklist
              </h3>

              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 p-2.5 bg-gray-900 rounded-xl border border-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hashMatches}
                    onChange={(e) => setHashMatches(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-700 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-gray-300 font-semibold">Bit-Stream SHA-256 Hash Verified (100% Match)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 bg-gray-900 rounded-xl border border-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={writeBlockerUsed}
                    onChange={(e) => setWriteBlockerUsed(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-700 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-gray-300 font-semibold">Hardware Write-Blocker Used During Acquisition</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 bg-gray-900 rounded-xl border border-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chainOfCustodyLogged}
                    onChange={(e) => setChainOfCustodyLogged(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-700 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-gray-300 font-semibold">Unbroken Chain of Custody Log Signed</span>
                </label>

                <label className="flex items-center gap-2.5 p-2.5 bg-gray-900 rounded-xl border border-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={officerSigned}
                    onChange={(e) => setOfficerSigned(e.target.checked)}
                    className="rounded bg-gray-800 border-gray-700 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-gray-300 font-semibold">Signed Section 65B Electronic Certificate Attached</span>
                </label>
              </div>
            </div>

            {/* Legal Verdict Display (7 Cols) */}
            <div className="lg:col-span-7 bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Court Admissibility Verdict</h3>
                  <span className="text-xs text-gray-400">Section 65B Indian Evidence Act Compliance</span>
                </div>
                <div className={clsx("text-xs font-bold px-3 py-1 rounded-full border uppercase", evidenceAdmissibility.badgeClass)}>
                  {evidenceAdmissibility.isValid ? "ADMISSIBLE EVIDENCE" : "INADMISSIBLE DEFECT"}
                </div>
              </div>

              {/* Status Note */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                  Judicial Evaluation:
                </span>
                <div className={clsx("p-4 rounded-xl border font-bold text-sm", evidenceAdmissibility.statusColor, evidenceAdmissibility.isValid ? "bg-emerald-950/60 border-emerald-800/60" : "bg-rose-950/60 border-rose-800/60")}>
                  {evidenceAdmissibility.status}
                </div>
              </div>

              {/* Defect List */}
              {evidenceAdmissibility.issues.length > 0 ? (
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-rose-400 uppercase tracking-wider block">Legal Defects Identified:</span>
                  <div className="space-y-1.5">
                    {evidenceAdmissibility.issues.map((issue, idx) => (
                      <div key={idx} className="p-3 bg-gray-900 rounded-lg border border-rose-900/40 text-rose-300">
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-900 rounded-xl border border-emerald-900/40 text-xs text-emerald-300 space-y-1">
                  <strong className="block font-bold">✓ 100% Statutory Admissibility Standard Achieved:</strong>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    The evidence meets all criteria established by the Supreme Court of India in <em>Anvar P.V. v. P.K. Basheer</em> (2014) and <em>Arjun Panditrao Khotkar v. Kailash Kushanrao Gorantyal</em> (2020).
                  </p>
                </div>
              )}
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
              Visualizing the Indian Cyber Law Statutory Penalty Spectrum and the Section 65B Evidence Chain of Custody.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: Indian IT Act Statutory Penalty Spectrum */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>⚖️</span> Diagram A: Indian Cyber Law Penalties &amp; Offense Spectrum
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 1: Civil Section 43 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="460" height="42" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                    <text x="35" y="42" fill="#c7d2fe" fontWeight="bold" fontSize="10.5">Section 43: Civil Data Damage</text>
                    <text x="260" y="42" fill="#94a3b8" fontSize="8.5">Civil Compensation to Victim</text>
                    <text x="465" y="42" fill="#a5b4fc" fontWeight="bold" textAnchor="end" fontSize="9.5">Civil Adjudication</text>
                  </g>

                  {/* Tier 2: Criminal Section 66 / 66C / 66D */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="70" width="460" height="42" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1" />
                    <text x="35" y="92" fill="#e0e7ff" fontWeight="bold" fontSize="10.5">Section 66 / 66C / 66D: Hacking &amp; Phishing</text>
                    <text x="260" y="92" fill="#c7d2fe" fontSize="8.5">Up to 3 Years Prison + ₹5L Fine</text>
                    <text x="465" y="92" fill="#818cf8" fontWeight="bold" textAnchor="end" fontSize="9.5">Bailable</text>
                  </g>

                  {/* Tier 3: Section 70 Protected Systems */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="120" width="460" height="42" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                    <text x="35" y="142" fill="#fef3c7" fontWeight="bold" fontSize="10.5">Section 70: Protected Systems (SCADA)</text>
                    <text x="260" y="142" fill="#fde68a" fontSize="8.5">Up to 10 Years Prison</text>
                    <text x="465" y="142" fill="#f59e0b" fontWeight="bold" textAnchor="end" fontSize="9.5">Non-Bailable</text>
                  </g>

                  {/* Tier 4: Section 66F Cyber Terrorism */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="170" width="460" height="42" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="35" y="192" fill="#fee2e2" fontWeight="bold" fontSize="10.5">Section 66F: Cyber Terrorism</text>
                    <text x="260" y="192" fill="#fca5a5" fontSize="8.5">LIFE IMPRISONMENT</text>
                    <text x="465" y="192" fill="#ef4444" fontWeight="bold" textAnchor="end" fontSize="9.5">Non-Bailable</text>
                  </g>

                  {/* Tier 5: DPDP Act 2023 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="220" width="460" height="45" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="35" y="244" fill="#d1fae5" fontWeight="bold" fontSize="11">DPDP Act 2023: Corporate Data Negligence</text>
                    <text x="260" y="244" fill="#a7f3d0" fontSize="8.5">Up to ₹250 Crores Statutory Penalty</text>
                    <text x="465" y="244" fill="#34d399" fontWeight="bold" textAnchor="end" fontSize="10">DPBI Penalty</text>
                  </g>

                  {/* Statutory Note */}
                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="9">
                    Indian Cyber Jurisprudence enforces strict liability: Good intentions offer zero legal defense.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.1: The statutory spectrum of Indian cyber penalties from civil fines to mandatory life imprisonment.
              </p>
            </div>

            {/* Diagram 2: Section 65B Evidence Protocol */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>📜</span> Diagram B: Section 65B Evidence Chain of Custody
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="130" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="85" y="42" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="10">1. Acquisition</text>
                    <text x="85" y="56" fill="#94a3b8" textAnchor="middle" fontSize="8">Hardware Write-Blocker</text>
                  </g>

                  <path d="M 150 45 L 180 45" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowCyan5)" />

                  {/* Step 2 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="50" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="250" y="42" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="10">2. Verification</text>
                    <text x="250" y="56" fill="#c7d2fe" textAnchor="middle" fontSize="8">Bit-stream SHA-256</text>
                  </g>

                  <path d="M 315 45 L 345 45" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowCyan5)" />

                  {/* Step 3 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="20" width="130" height="50" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="415" y="42" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="10">3. Custody Log</text>
                    <text x="415" y="56" fill="#fde68a" textAnchor="middle" fontSize="8">Seals &amp; Signature</text>
                  </g>

                  <path d="M 415 70 L 415 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Step 4 */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="350" y="110" width="130" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="415" y="132" fill="#d1fae5" fontWeight="bold" textAnchor="middle" fontSize="10">4. Sec 65B Cert</text>
                    <text x="415" y="146" fill="#a7f3d0" textAnchor="middle" fontSize="8">Manager Affidavit</text>
                  </g>

                  <path d="M 350 135 L 320 135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowCyan5)" />

                  {/* Step 5: Court Admission */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="110" width="295" height="50" rx="6" fill="#18181b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x="167" y="135" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="11">5. 100% JUDICIAL ADMISSIBILITY</text>
                    <text x="167" y="150" fill="#cbd5e1" textAnchor="middle" fontSize="8.5">Admitted as Valid Trial Proof in Indian High Courts</text>
                  </g>

                  {/* Landmark Supreme Court Precedents */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="190" width="460" height="95" rx="8" fill="#18181b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="215" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="11">LANDMARK SUPREME COURT OF INDIA PRECEDENTS</text>
                    <text x="250" y="235" fill="#cbd5e1" textAnchor="middle" fontSize="9">Anvar P.V. v. P.K. Basheer (2014) • Arjun Panditrao Khotkar v. Kailash Gorantyal (2020)</text>
                    <text x="250" y="252" fill="#a7f3d0" textAnchor="middle" fontSize="8.5">"Secondary digital evidence without a Section 65B certificate is wholly inadmissible in court."</text>
                    <text x="250" y="270" fill="#fbbf24" textAnchor="middle" fontSize="8">Bharatiya Sakshya Adhiniyam, 2023 continues this mandatory evidentiary rule.</text>
                  </g>

                  <defs>
                    <marker id="arrowCyan5" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 8.2: The mandatory 5-stage protocol required to admit electronic evidence in Indian courts under Section 65B.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Cyber Jurisprudence Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how cybersecurity leaders navigate digital evidence admissibility, DPDP Act audits, and protected system charters in Kolkata, Ichapur, Barrackpore, and Jadavpur.
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
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Legal &amp; Compliance Budget</span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400">{currentLocalScenario.budget}</span>
              </div>
            </div>

            {/* Dilemma vs Resolution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900 p-4 rounded-xl border border-rose-900/30 space-y-2">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⚡</span> Legal Dilemma &amp; Statute
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Professional Cyber Law Remedy
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.resolution}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Jurisprudence Deliverables &amp; Compliance Standards
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
              Guidelines to maintain complete legal compliance and protect digital evidence during security audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Essential Legal Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Always Sign the RoE First:</strong> Never send a single packet without a signed contract.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Attach Section 65B Certificates:</strong> Accompany all digital evidence with signed 65B affidavits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Use Hardware Write Blockers:</strong> Preserve disk timestamps during forensic image acquisitions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Respect 6-Hour CERT-In Rule:</strong> Report confirmed security breaches within 6 hours.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Legal Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Scope Creep Violations:</strong> Scanning unlisted third-party partner servers without permission.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Live Reconfiguration:</strong> Modifying client server settings yourself rather than reporting them.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Breaking Custody Logs:</strong> Leaving evidence drives unsealed introduces doubt in court.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Extortion Demands:</strong> Demanding bounties under threat of data leakage violates IPC 384.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Best Practices */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span>🛡</span> Enterprise Governance Rules
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Act 2023:</strong> Enforce technical safeguards to avoid ₹250 Crore penalty caps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>180-Day Log Archival:</strong> Maintain centralized immutable SIEM audit trails within India.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Designate Section 70 Assets:</strong> Apply maximum security to gazetted Critical Information Infrastructure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Publish RFC 9116 security.txt:</strong> Provide clear, legally protected reporting channels for researchers.</span>
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
              Synthesize key legal and cyber law principles before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Cybersecurity Legal Practitioners
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why Section 65B of the Indian Evidence Act is mandatory: without a sworn certificate describing the computer and confirming regular operational integrity, defense lawyers can easily claim electronic logs were forged.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How Section 70 (Protected Systems) elevates the legal stakes: accessing an ordinary corporate server carries up to 3 years imprisonment, but accessing a gazetted power grid or nuclear SCADA network carries up to 10 years imprisonment.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In your future enterprise contracts, ensure that third-party cloud agreements clearly define the Data Fiduciary and Data Processor roles under the DPDP Act 2023 with mandatory 6-hour incident escalation clauses.
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
                <span>Signed RoE is mandatory before sending any packets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 66: Up to 3 yrs imprisonment + ₹5L fine.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act 2000 Section 66F: Life imprisonment for Cyber Terrorism.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>IT Act Section 70: Up to 10 yrs for Protected Systems.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Indian Evidence Act Sec 65B certificate is mandatory.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act 2023: Penalty cap up to ₹250 Crores.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Legal vs Illegal Hacking: Cyber Law & Authorization FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Architectural Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Legal vs Illegal Hacking: Cyber Law & Authorization (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: As you complete your BCA cybersecurity training, always remember that technical skill without rigorous legal compliance is a fast track to criminal liability. In the courtroom, your Section 65B certificates, chain of custody logs, and signed Rules of Engagement are what prove your professionalism. Respect the law, protect citizen privacy under the DPDP Act 2023, and stand as an unyielding defender of our nation's digital infrastructure."
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
