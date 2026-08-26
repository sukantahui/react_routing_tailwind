import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Studio 1: Phishing Drill Scenario State
  const [selectedDrillKey, setSelectedDrillKey] = useState("ceo_urgent_wire");
  const [drillActionResult, setDrillActionResult] = useState(null); // 'reported' | 'clicked' | null

  // Studio 2: Security Culture Maturity State
  const [selectedCultureLevel, setSelectedCultureLevel] = useState(4);

  // Studio 3: Local Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_ppp_reduction");

  // Studio 1: Phishing Simulation Drills Data
  const phishingDrills = {
    ceo_urgent_wire: {
      key: "ceo_urgent_wire",
      name: "1. CEO Urgent Vendor Wire Transfer (BEC)",
      fromHeader: "CEO Sukanta Hui <ceo@kolkatafintech-internal.co>",
      subject: "URGENT: Confidential vendor payment needed within 20 mins",
      body:
        "Hi Mamata, I am currently in an executive board meeting and cannot take calls. We have an urgent vendor invoice of ₹14,50,000 for critical cloud infrastructure that must be settled immediately to prevent service disruption. Please initiate the wire transfer to Account: 9021849201 (IFSC: HDFC0001824) right away. Reply once done.",
      psychologicalBias: "Authority Bias + Extreme Urgency & Fear of Disruption",
      redFlags: [
        "Sender domain is 'kolkatafintech-internal.co' (Lookalike spoof, not official domain).",
        "Demands bypassing standard Maker-Checker dual authorization process.",
        "Refuses telephone verification under pretext of 'being in a meeting'.",
        "Extreme urgency designed to bypass rational financial scrutiny."
      ],
      badgeClass: "bg-rose-950 text-rose-300 border-rose-800"
    },
    it_mfa_reset: {
      key: "it_mfa_reset",
      name: "2. IT Helpdesk Mandatory MFA Token Reset",
      fromHeader: "Enterprise IT Support <helpdesk@okta-verify-auth.in>",
      subject: "MANDATORY ACTION: Your Okta MFA token expires in 2 hours",
      body:
        "Attention Employee: Our security audit detected that your corporate Okta Multi-Factor Authentication (MFA) token has expired. Failure to re-authenticate within 2 hours will result in permanent suspension of your corporate email and VPN access. Click here immediately to verify credentials: https://auth.okta-verify-auth.in/login",
      psychologicalBias: "Technical Authority + Fear of Account Suspension + Scarcity",
      redFlags: [
        "Suspicious external URL: 'okta-verify-auth.in' (Phishing credential harvester).",
        "Generic greeting 'Attention Employee' instead of personalized name.",
        "Artificial 2-hour deadline to induce panic and hasty clicking.",
        "Legitimate IT departments never request credential re-entry via email links."
      ],
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    tax_refund_notice: {
      key: "tax_refund_notice",
      name: "3. Income Tax Department Refund Assessment",
      fromHeader: "Income Tax Department <notice@incometaxindia-efiling.org.in>",
      subject: "Tax Assessment Order: Eligible for direct refund of ₹48,500",
      body:
        "Dear Taxpayer, Your electronic tax assessment for AY 2026-27 has been processed. A refund of ₹48,500 has been approved. To credit this refund directly into your bank account, please download the attached form and verify your PAN and Net Banking credentials: Income_Tax_Refund_Form_2026.html",
      psychologicalBias: "Financial Greed + Official Government Authority Bias",
      redFlags: [
        "Attachment is an HTML executable file designed to steal Net Banking passwords.",
        "Income Tax refunds are processed directly via pre-validated bank accounts, never via email forms.",
        "Unofficial email domain attempting to mimic genuine government portals.",
        "Unsolicited financial reward designed to disable critical thinking."
      ],
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    hr_salary_hikes: {
      key: "hr_salary_hikes",
      name: "4. Q4 Employee Salary Hike & Bonus List",
      fromHeader: "Corporate HR Services <hr@kolkatafintech.com.ru>",
      subject: "CONFIDENTIAL: Q4 Performance Bonus and Salary Revision Sheet",
      body:
        "All Staff: The executive committee has approved performance bonuses and salary revisions for Q4. Please find attached the confidential employee-wise compensation appraisal table. Enable macros upon opening to decrypt your personalized appraisal score: 2026_Q4_Salary_Appraisals.xlsm",
      psychologicalBias: "Intense Curiosity + Social Proof & Personal Financial Gain",
      redFlags: [
        "Sender domain ends with '.com.ru' (Foreign lookalike domain).",
        "Demands enabling Excel VBA Macros (Delivers malicious ransomware dropper).",
        "Exploits workplace curiosity regarding peer compensation.",
        "Legitimate HR distributes compensation letters individually via secure ERP portals."
      ],
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    }
  };

  const activeDrill = phishingDrills[selectedDrillKey];

  // Studio 2: Security Culture Maturity Levels Data
  const cultureLevels = [
    {
      level: 1,
      name: "Level 1: Non-Existent / Punitive Culture",
      ppp: "38.5% (High Failure Rate)",
      mttr: "No Reporting (Days/Weeks)",
      championDensity: "0 Security Champions",
      posture: "Fear & Concealment",
      details:
        "Zero formal security awareness. Employees are publicly blamed or punished for errors, causing them to conceal real breaches. Malware dwells undetected for months.",
      badgeClass: "bg-red-950 text-red-300 border-red-800"
    },
    {
      level: 2,
      name: "Level 2: Annual Compliance Tick-Box",
      ppp: "28.0% (Substantial Risk)",
      mttr: "4.5 Hours",
      championDensity: "0 Security Champions",
      posture: "Passive & Boring",
      details:
        "Mandatory 2-hour annual compliance presentation that staff click through without paying attention. Knowledge is forgotten within weeks; Phish-Prone Percentage remains high.",
      badgeClass: "bg-amber-950 text-amber-300 border-amber-800"
    },
    {
      level: 3,
      name: "Level 3: Active Training & Simulated Drills",
      ppp: "11.2% (Moderate Resilience)",
      mttr: "18 Minutes",
      championDensity: "1 Champion per 50 Staff",
      posture: "Continuous Practice",
      details:
        "Monthly unannounced simulated phishing drills combined with automated Just-in-Time (JIT) micro-training. Role-based training deployed for developers and executives.",
      badgeClass: "bg-blue-950 text-blue-300 border-blue-800"
    },
    {
      level: 4,
      name: "Level 4: Metric-Driven & Security Champions",
      ppp: "3.2% (Strong Defense)",
      mttr: "65 Seconds",
      championDensity: "1 Champion per 20 Devs",
      posture: "Proactive Human Firewall",
      details:
        "Security Champions embedded in every engineering squad. Phish-Prone Percentage tracked quarterly; employees report suspicious emails in under 60 seconds; positive reward culture.",
      badgeClass: "bg-purple-950 text-purple-300 border-purple-800"
    },
    {
      level: 5,
      name: "Level 5: Resilient Human Firewall (Adaptive)",
      ppp: "1.2% (World-Class Resilience)",
      mttr: "38 Seconds (Rapid Escalation)",
      championDensity: "1 Champion per 10 Staff",
      posture: "Instinctual Cyber Resilience",
      details:
        "Instinctual security hygiene embedded into corporate DNA. Staff proactively detect deepfake vishing and advanced BEC; continuous gamification; 100% DPDP Act compliance.",
      badgeClass: "bg-emerald-950 text-emerald-300 border-emerald-800"
    }
  ];

  const activeCulture = cultureLevels[selectedCultureLevel - 1];

  // Local West Bengal Scenarios Data
  const localScenarios = [
    {
      id: "kolkata_ppp_reduction",
      lead: "Mamata",
      role: "Lead Cryptographic Architect",
      location: "Kolkata FinTech Operations Center",
      title: "Phish-Prone Percentage Reduction Program",
      budget: "₹12,50,000",
      challenge: "Initial Baseline Showed 34% Phishing Failure Across 500 Nodes",
      dilemma:
        "Initial baseline phishing simulation showed a 34% failure rate across 500 payment nodes, exposing the enterprise to business email compromise and DPDP statutory fines.",
      resolution:
        "Mamata deployed monthly simulated spear-phishing drills with automated JIT micro-training, dropping the Phish-Prone Percentage to 1.4% and reducing SOC incident reporting time to 42 seconds.",
      metrics: {
        baselinePpp: "34.0% Baseline Failure",
        maturePpp: "1.4% World-Class Resilience",
        reportingSpeed: "42 Seconds to SOC Alert",
        compliance: "DPDP Act Section 8(5) & RBI Master Direction"
      }
    },
    {
      id: "ichapur_clinical_hygiene",
      lead: "Mahima",
      role: "Chief Healthcare Forensic Officer",
      location: "Ichapur Clinical Care Network",
      title: "Clinical Healthcare Anti-Phishing Defense",
      budget: "₹7,20,000",
      challenge: "Doctors Opening External Email Attachments on PACS Workstations",
      dilemma:
        "Oncology doctors were opening unverified email attachments on PACS workstations, threatening patient radiology data integrity and clinical surgery continuity.",
      resolution:
        "Mahima built a healthcare-specific micro-training campaign for 350+ medical staff under NABH guidelines, achieving 100% training completion and zero clinical email compromises.",
      metrics: {
        staffTrained: "350+ Healthcare Workers",
        phishingIncidents: "0 Clinical Compromises",
        cleanDeskAdoption: "100% Workstation Lock Rate",
        compliance: "NABH Hospital Guidelines & DPDP Act 2023"
      }
    },
    {
      id: "barrackpore_ot_champions",
      lead: "Debangshu",
      role: "Principal OT Security Architect",
      location: "Barrackpore Industrial Power Grid",
      title: "Substation OT Security Champion Network",
      budget: "₹11,80,000",
      challenge: "Substation Engineers Viewing Cyber Controls as Operational Obstacles",
      dilemma:
        "Substation electrical engineers viewed cybersecurity as an obstacle to 220kV transmission line maintenance, frequently bypassing access control procedures.",
      resolution:
        "Debangshu appointed and trained 18 OT Security Champions across transmission substations, embedding cyber hygiene and clean desk practices into daily shift handover checklists under CEA guidelines.",
      metrics: {
        championsTrained: "18 Substation Engineers",
        substationsCovered: "18 High-Voltage Sites",
        bypassIncidents: "0.00% Zero Policy Bypasses",
        compliance: "CEA Cyber Regulations & NCIIPC Charter"
      }
    },
    {
      id: "jadavpur_human_firewall_lab",
      lead: "Abhronila & Susmita",
      role: "University Governance Research Leads",
      location: "Jadavpur University AI Labs",
      title: "Human Firewall & Social Engineering Laboratory",
      budget: "₹4,50,000",
      challenge: "Students Lacking Hands-on Phishing Simulation & Culture Metrics",
      dilemma:
        "Cybersecurity students lacked hands-on experience designing realistic phishing payloads, tracking PPP metrics, and structuring no-blame security culture programs.",
      resolution:
        "The team developed an interactive Phishing Simulation Engine and Security Culture Maturity tool, training 200+ BCA cyber security students on social engineering psychology and defense.",
      metrics: {
        studentsTrained: "200+ Cyber BCA Students",
        simulationsEngineered: "60+ Phishing Vectors",
        examMastery: "100% Social Engineering Defense",
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
            Course Module 3: Information Security Management • Module 003_001 • Topic 9 of 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Enterprise Security Culture and Awareness Programs
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
            Transform employees into the first line of enterprise cyber defense: master the SETA framework (Education, Training, Awareness), 
            counter social engineering cognitive biases, deploy automated Just-in-Time (JIT) micro-training, and track Phish-Prone Percentage (PPP) KPIs under the DPDP Act 2023.
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* SECTION 1: Interactive Phishing Simulation & Human Firewall Simulator */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🎣</span> Studio 1: Phishing Simulation &amp; Human Firewall Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select a simulated spear-phishing attack payload, inspect the exploited psychological biases, identify red flags, and test your reaction (Report to SOC vs Click Link).
            </p>
          </div>

          {/* Drill Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {Object.values(phishingDrills).map((drill) => {
              const isSelected = selectedDrillKey === drill.key;
              return (
                <button
                  key={drill.key}
                  onClick={() => {
                    setSelectedDrillKey(drill.key);
                    setDrillActionResult(null);
                  }}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="font-bold text-gray-200 truncate">{drill.name.split(". ")[1]?.split(" (")[0]}</div>
                  <div className="text-[10px] text-gray-400 truncate mt-0.5">{drill.name.split(". ")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Phishing Drill Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeDrill.badgeClass)}>
                  Simulation Scenario: {activeDrill.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Exploited Cognitive Bias: {activeDrill.psychologicalBias}
                </h3>
              </div>
            </div>

            {/* Email Header & Body Canvas */}
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 space-y-3 font-mono text-xs">
              <div className="border-b border-gray-800 pb-2 space-y-1">
                <div><span className="text-gray-400">From:</span> <strong className="text-amber-300">{activeDrill.fromHeader}</strong></div>
                <div><span className="text-gray-400">Subject:</span> <strong className="text-white">{activeDrill.subject}</strong></div>
              </div>
              <div className="p-3 bg-gray-950 rounded-lg text-gray-300 leading-relaxed font-sans text-xs sm:text-sm">
                {activeDrill.body}
              </div>
            </div>

            {/* Red Flags Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block font-sans">
                Red Flag Indicators (Things that should make you suspicious):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {activeDrill.redFlags.map((flag, idx) => (
                  <div key={idx} className="bg-gray-900 p-3 rounded-xl border border-gray-800 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">🚩</span>
                    <span className="text-gray-300 leading-relaxed">{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Reaction Buttons */}
            <div className="border-t border-gray-800 pt-4 flex flex-col sm:flex-row items-center gap-3">
              <span className="text-xs font-bold text-gray-400 font-mono uppercase">Simulate Your Action:</span>
              <button
                onClick={() => setDrillActionResult("reported")}
                className="px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 font-bold text-xs transition-all duration-300 flex items-center gap-2"
              >
                <span>🛡️</span> Click "Report Phishing" Button (To SOC in &lt; 30s)
              </button>
              <button
                onClick={() => setDrillActionResult("clicked")}
                className="px-4 py-2.5 rounded-xl bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 font-bold text-xs transition-all duration-300 flex items-center gap-2"
              >
                <span>⚠️</span> Click Link / Download Attachment (Test JIT Training)
              </button>
            </div>

            {/* Drill Action Result Box */}
            {drillActionResult === "reported" && (
              <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-700/60 space-y-1 text-xs animate-fadeIn">
                <span className="text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <span>🏆</span> SUCCESS: Threat Reported in 28 Seconds!
                </span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">
                  Excellent cyber hygiene! You recognized the psychological urgency and lookalike sender domain. The SOC automatically analyzed the payload and blocked the malicious domain enterprise-wide for all 500 employees. Your Phish-Prone score improved!
                </p>
              </div>
            )}

            {drillActionResult === "clicked" && (
              <div className="bg-amber-950/60 p-4 rounded-xl border border-amber-700/60 space-y-2 text-xs animate-fadeIn">
                <span className="text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <span>🎓</span> Just-in-Time (JIT) Micro-Training Triggered (Safe Test)
                </span>
                <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed">
                  Oops! You clicked a simulated phishing email. Don't panic—this was a safe training drill conducted by the CISO office. Look at the red flags you missed: the sender domain was a lookalike and demanded bypassing standard Maker-Checker verification. Next time, always click the "Report Phishing" button in Outlook!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: Enterprise Security Culture Maturity Benchmark (CMMI Levels 1-5) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📈</span> Studio 2: Security Culture Maturity Benchmark (CMMI Levels 1-5)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select an enterprise culture maturity level to explore how awareness evolves from punitive fear and high failure rates to an instinctual, resilient Human Firewall.
            </p>
          </div>

          {/* Level Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {cultureLevels.map((lvl) => {
              const isSelected = selectedCultureLevel === lvl.level;
              return (
                <button
                  key={lvl.level}
                  onClick={() => setSelectedCultureLevel(lvl.level)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left transition-all duration-300 border text-xs",
                    isSelected
                      ? "bg-indigo-950/90 text-white border-indigo-500 shadow-lg shadow-indigo-950/50 scale-[1.02]"
                      : "bg-gray-850 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">Level {lvl.level}</div>
                  <div className="font-bold text-gray-200 mt-0.5 truncate">{lvl.name.split(": ")[1]?.split(" (")[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Culture Breakdown Card */}
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 space-y-6 shadow-2xl">
            <div className="border-b border-gray-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full border", activeCulture.badgeClass)}>
                  Maturity: {activeCulture.name}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Cultural Posture: {activeCulture.posture}
                </h3>
              </div>
              <div className="bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800 text-left sm:text-right">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">Phish-Prone Percentage (PPP)</span>
                <span className="text-base font-extrabold text-emerald-400">{activeCulture.ppp}</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/30 space-y-1">
                <span className="text-blue-400 font-bold uppercase tracking-wider block font-sans">Mean Time to Report (MTTR):</span>
                <p className="text-gray-200 text-xs sm:text-sm font-bold leading-relaxed">{activeCulture.mttr}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-purple-900/30 space-y-1">
                <span className="text-purple-400 font-bold uppercase tracking-wider block font-sans">Security Champion Density:</span>
                <p className="text-emerald-300 text-xs sm:text-sm font-bold leading-relaxed">{activeCulture.championDensity}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1 text-xs">
              <span className="text-amber-400 font-bold uppercase tracking-wider block font-sans">
                Enterprise Cultural Dynamics:
              </span>
              <p className="text-gray-300 leading-relaxed font-semibold">{activeCulture.details}</p>
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
              Visualizing the SETA Framework (Education, Training, Awareness) Hierarchy and the Automated Phishing JIT Micro-Training Feedback Loop.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Diagram 1: SETA Hierarchy */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <span>🔄</span> Diagram A: The SETA Framework Hierarchy (NIST SP 800-50)
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Tier 3: Education (Apex) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="250,20 160,95 340,95" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="250" y="55" fill="#818cf8" fontWeight="bold" textAnchor="middle" fontSize="9">1. SECURITY EDUCATION</text>
                    <text x="250" y="70" fill="#c7d2fe" font-family="monospace" textAnchor="middle" fontSize="7.5">CISSP • CISM • Deep Theory</text>
                  </g>

                  {/* Tier 2: Training (Middle) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="160,95 90,180 410,180 340,95" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="250" y="130" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="9">2. ROLE-BASED TRAINING</text>
                    <text x="250" y="145" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7.5">OWASP DevSecOps • DevOps IAM • Finance BEC</text>
                  </g>

                  {/* Tier 1: Awareness (Base) */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <polygon points="90,180 20,265 480,265 410,180" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="215" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="9.5">3. ENTERPRISE AWARENESS (ALL STAFF)</text>
                    <text x="250" y="230" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">Monthly Phishing Drills • JIT Micro-Learning • Cyber Hygiene</text>
                  </g>

                  <text x="250" y="295" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    SETA builds comprehensive human resilience from all-employee awareness to elite education.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.1: The SETA (Security Education, Training, and Awareness) framework pyramid.
              </p>
            </div>

            {/* Diagram 2: Phishing JIT Feedback Loop */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>⚡</span> Diagram B: Automated Phishing &amp; JIT Training Feedback Loop
              </h3>
              <div className="bg-gray-900/90 rounded-xl p-4 border border-gray-800 overflow-x-auto flex justify-center">
                <svg viewBox="0 0 500 320" className="w-full max-w-lg h-auto text-xs" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1: Simulated Email */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="20" width="135" height="45" rx="4" fill="#083344" stroke="#06b6d4" />
                    <text x="87" y="40" fill="#cffafe" fontWeight="bold" textAnchor="middle" fontSize="8.5">1. SIMULATED DRILL</text>
                    <text x="87" y="54" fill="#67e8f9" font-family="monospace" textAnchor="middle" fontSize="7">Unannounced Email</text>
                  </g>

                  <line x1="155" y1="42" x2="185" y2="42" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrowCyan42)" />

                  {/* Step 2: Employee Action */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="185" y="20" width="130" height="45" rx="4" fill="#1e1b4b" stroke="#6366f1" />
                    <text x="250" y="40" fill="#c7d2fe" fontWeight="bold" textAnchor="middle" fontSize="8.5">2. REACTION TEST</text>
                    <text x="250" y="54" fill="#818cf8" font-family="monospace" textAnchor="middle" fontSize="7">Click or Report?</text>
                  </g>

                  {/* Branch Right: Clicked */}
                  <line x1="315" y1="42" x2="345" y2="42" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed42)" />

                  {/* Step 3: JIT Micro-Learning */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="345" y="20" width="135" height="45" rx="4" fill="#450a0a" stroke="#ef4444" />
                    <text x="412" y="40" fill="#fca5a5" fontWeight="bold" textAnchor="middle" fontSize="8.5">3. JIT TRAINING</text>
                    <text x="412" y="54" fill="#f87171" font-family="monospace" textAnchor="middle" fontSize="7">45s Red Flag Coaching</text>
                  </g>

                  <line x1="412" y1="65" x2="412" y2="105" stroke="#ef4444" strokeWidth="1.5" />

                  {/* Step 4: Metric Updated */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="265" y="105" width="215" height="45" rx="4" fill="#18181b" stroke="#f59e0b" />
                    <text x="372" y="125" fill="#fbbf24" fontWeight="bold" textAnchor="middle" fontSize="8.5">4. METRICS &amp; SCORECARD</text>
                    <text x="372" y="139" fill="#cbd5e1" font-family="monospace" textAnchor="middle" fontSize="7">PPP &amp; MTTR Recalculated</text>
                  </g>

                  <line x1="265" y1="127" x2="235" y2="127" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrowGold42)" />

                  {/* Step 5: Resilient Behavior */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="105" width="215" height="45" rx="4" fill="#064e3b" stroke="#10b981" />
                    <text x="127" y="125" fill="#34d399" fontWeight="bold" textAnchor="middle" fontSize="8.5">5. ADAPTIVE DEFENSE</text>
                    <text x="127" y="139" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7">Human Firewall reporting in &lt; 60s</text>
                  </g>

                  {/* Bottom Box */}
                  <g className="transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <rect x="20" y="185" width="460" height="55" rx="6" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="250" y="207" fill="#34d399" font-family="monospace" fontWeight="bold" textAnchor="middle" fontSize="9">
                      POSITIVE NO-BLAME CYBERSECURITY CULTURE
                    </text>
                    <text x="250" y="224" fill="#d1fae5" font-family="monospace" textAnchor="middle" fontSize="7.5">
                      Empowers employees to report real threats instantly without fear of punishment or shaming.
                    </text>
                  </g>

                  <text x="250" y="285" fill="#94a3b8" textAnchor="middle" fontSize="8">
                    Continuous simulation with immediate feedback reduces Phish-Prone Percentage below 2%.
                  </text>

                  <defs>
                    <marker id="arrowCyan42" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                    </marker>
                    <marker id="arrowRed42" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                    <marker id="arrowGold42" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Figure 9.2: The automated phishing simulation and Just-in-Time micro-training feedback loop.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Localized Real-World Engineering Scenarios (West Bengal) */}
        <section className="space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>🏢</span> Section 4: Security Culture Scenarios (West Bengal)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Explore how security leads reduce phishing failure to 1.4% in Kolkata, train doctors in Ichapur, build OT champion networks in Barrackpore, and simulate social engineering in Jadavpur.
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
                  <span>⚡</span> Human Culture Dilemma ({currentLocalScenario.challenge})
                </h4>
                <p className="text-gray-300 leading-relaxed">{currentLocalScenario.dilemma}</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-xl border border-emerald-900/30 space-y-2">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛡</span> Applied Human Firewall Solution
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
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">{key}</span>
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
              Guidelines for Chief Information Security Officers and training leaders building enterprise security culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Column 1: Tips & Tricks */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-3">
              <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <span>⭐</span> Culture-Building Habits
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Foster Psychological Safety:</strong> Reward staff who report phishing threats rather than blaming errors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Deliver JIT Micro-Training:</strong> Keep feedback lessons under 60 seconds at the exact moment of failure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Embed Security Champions:</strong> Place trained champions in every software engineering squad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span><strong>Enforce Out-of-Band Calls for BEC:</strong> Always call executives via verified numbers before large transfers.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Common Pitfalls */}
            <div className="bg-gray-950 p-5 rounded-2xl border border-rose-900/30 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <span>⚠️</span> Common Awareness Pitfalls
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Annual 2-Hour Classroom Binders:</strong> Staff forget passive slide lectures within 2 weeks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Public Shaming of Failed Users:</strong> Causes terrified employees to hide real malware compromises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>One-Size-Fits-All Training:</strong> Developers need OWASP Top 10, not generic password advice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Ignoring Voice/SMS Vectors:</strong> Neglecting AI deepfake vishing and WhatsApp smishing scams.</span>
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
                  <span><strong>Track Phish-Prone Percentage (PPP):</strong> Target a long-term enterprise failure rate below 2%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Enforce Clean Desk / Clean Screen:</strong> Require mandatory Win+L workstation locking (ISO 27001).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Measure Reporting Velocity:</strong> Train the Human Firewall to alert the SOC in &lt; 60 seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Comply with DPDP Section 8(5):</strong> Document 100% employee privacy training completion for audits.</span>
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
              Synthesize security awareness culture and human firewall principles before reviewing the comprehensive practice questions.
            </p>
          </div>

          {/* Guiding Hints */}
          <div className="bg-gray-950 p-5 rounded-2xl border border-indigo-900/30 space-y-4 text-xs sm:text-sm">
            <h3 className="font-bold text-indigo-300 flex items-center gap-2">
              <span>🔍</span> Pedagogical Hints for Culture Architects
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                <strong className="text-indigo-300 block">Think about...</strong>
                <p className="text-gray-400">
                  Why humans are the first line of defense rather than the weakest link: When an organization builds a positive, blameless culture, employees who spot suspicious emails report them to the SOC in under 60 seconds, allowing security teams to block the attack enterprise-wide before any damage occurs.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-amber-300 block">
                <strong className="text-amber-300 block">Observe carefully...</strong>
                <p className="text-gray-400">
                  How social engineering attacks manipulate psychology: Attackers rarely use sophisticated malware initially; they exploit Authority Bias (impersonating the CEO), Urgency (demanding payment in 15 minutes), and Fear (tax audit threats) to force employees into making emotional, unverified mistakes.
                </p>
              </div>
              <div className="p-3 bg-gray-900 rounded-xl border border-purple-300 block">
                <strong className="text-purple-300 block">Try changing this...</strong>
                <p className="text-gray-400">
                  In all your enterprise security programs, replace punitive shaming with automated Just-in-Time (JIT) micro-training and gamified recognition to empower staff as an impenetrable Human Firewall.
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
                <span>Humans are the First Line of Defense (The Human Firewall).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SETA Triad: Security Education, Training (Role-Based), and Awareness.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>4 Social Engineering Biases: Authority, Urgency, Fear, and Curiosity.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Phish-Prone Percentage (PPP) quantifies employee phishing vulnerability.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DPDP Act Section 8(5) mandates employee training as organizational safeguards.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Clean Desk &amp; Clean Screen policies prevent visual data leaks (ISO 27001).</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Enterprise Security Culture and Awareness Programs FAQs"
            subtitle="30 Moderate to Expert Practice Questions &amp; Human Firewall Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 8: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Enterprise Security Culture and Awareness Programs (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 9: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing all 10 topics of Module 003_001 on Introduction to Information Security Management! Always remember that technology is only as strong as the people who operate it. Build an empowering, positive, no-blame security culture, conduct continuous unannounced phishing drills with Just-in-Time (JIT) micro-training, embed Security Champions in every team, track your Phish-Prone Percentage (PPP), and ensure your organization satisfies all organizational training mandates under Section 8(5) of the Indian DPDP Act 2023!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
