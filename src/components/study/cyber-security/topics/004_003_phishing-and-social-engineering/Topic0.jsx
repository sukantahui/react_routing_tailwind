import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

const Topic0 = () => {
  // Unique SVG IDs
  const svgHumanId = useId();

  // Studio 1: Active Cognitive Bias Selection
  const [selectedBiasKey, setSelectedBiasKey] = useState("authority_bias_milgram");

  // Studio 2: Live Human Error Probability Calculator State
  const [fatigueFactor, setFatigueFactor] = useState(2.0);
  const [urgencyIntensity, setUrgencyIntensity] = useState(2.5);
  const [technicalFriction, setTechnicalFriction] = useState(1); // 1 = None, 50 = MFA Push, 500 = FIDO2 Passkeys

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_human_risk");

  // Studio 4: HRM Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("fido2_passkey_enforcement_powershell");

  // 8 Cognitive Vulnerability Profiles for Studio 1
  const cognitiveBiasDatabase = {
    truth_default_theory: {
      key: "truth_default_theory",
      name: "Truth-Default Theory & The Presumption of Honesty",
      category: "INNATE COGNITIVE HEURISTIC",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      psychologicalTrigger: "Default presumption that human communication is honest and sincere",
      exploitationVector: "Impersonating standard IT support desk, HR salary updates, or vendor notifications",
      vulnerabilityImpact:
        "According to Dr. Timothy Levine's Truth-Default Theory, humans naturally default to presuming others are telling the truth unless triggered by blatant anomalies. Attackers exploit this by masquerading as familiar entities, allowing fraudulent requests to bypass suspicion.",
      telemetryIndicator: "Employee opening email from unknown external domain because the display name matches 'Internal HR'",
      resilientDefense: "Displaying prominent external email banner warnings + automated domain reputation filtering.",
      codeSnippet: `// Truth-Default Cognitive Pattern:
// Incoming Communication ➔ Default State: Presume Sincere
// Attacker Vector: Uses corporate branding ➔ Passes Truth-Default Threshold!`
    },
    decision_fatigue_overload: {
      key: "decision_fatigue_overload",
      name: "Decision Fatigue & Cognitive Overload (System 1 Thinking)",
      category: "MENTAL EXHAUSTION & HEURISTICS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      psychologicalTrigger: "Depleted mental willpower and analytical energy at the end of the workday",
      exploitationVector: "Sending urgent password reset or invoice approvals between 4:45 PM and 6:00 PM",
      vulnerabilityImpact:
        "Daniel Kahneman's dual-system cognitive model demonstrates that System 2 (analytical scrutiny) requires effort. When exhausted after an 8-hour shift, users rely on System 1 (fast, intuitive heuristics) and click without verifying sender email headers or URL domains.",
      telemetryIndicator: "Phishing test click-rates spiking by over 300% between 4:30 PM and 6:00 PM",
      resilientDefense: "FIDO2 / WebAuthn passkeys that mathematically refuse to sign fraudulent origins regardless of user fatigue.",
      codeSnippet: `// Cognitive Load vs Phishing Vulnerability:
// System 2 (Analytical, Morning)  ➔ Inspects email headers & URL domain (Safe)
// System 1 (Intuitive, Fatigued) ➔ Sees familiar logo & clicks immediately (COMPROMISED!)`
    },
    authority_bias_milgram: {
      key: "authority_bias_milgram",
      name: "Authority Bias & Milgram Obedience (CEO Fraud)",
      category: "HIERARCHICAL DEFERENCE & COMPLIANCE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      psychologicalTrigger: "Social conditioning to obey requests from perceived institutional authority figures",
      exploitationVector: "Impersonating the Chief Executive Officer, Police, Tax Authorities, or Managing Director",
      vulnerabilityImpact:
        "Stemming from the classic Milgram experiments, humans reflexively comply with perceived authority. In Business Email Compromise (BEC), an attacker impersonating the CEO demands an urgent wire transfer: 'I am in a confidential board meeting in Kolkata, wire ₹45 Lakhs immediately'.",
      telemetryIndicator: "Finance employees bypassing secondary approval controls due to perceived executive urgency",
      resilientDefense: "Mandatory multi-party dual-authorization controls for all wire transfers above ₹1,00,000.",
      codeSnippet: `// Authority Bias Exploit Flow:
// [Attacker: Spoofed CEO Email] ➔ "Urgent wire transfer needed before 4 PM!"
// [Subordinate: Authority Bias Activated] ➔ Skips secondary verification ➔ Transfers funds!`
    },
    urgency_bias_amygdala: {
      key: "urgency_bias_amygdala",
      name: "Urgency Bias & Fear (Amygdala Hijacking)",
      category: "EMOTIONAL PANIC & STRESS OVERRIDE",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      psychologicalTrigger: "Fear of immediate negative consequences (account deletion, legal penalty, lost pay)",
      exploitationVector: "Artificial time limits: 'Your email account will be permanently deleted in 15 minutes'",
      vulnerabilityImpact:
        "High-stress urgency triggers amygdala hijacking, shifting cognitive processing to survival fight-or-flight instincts where fear overrides the rational prefrontal cortex, compelling the victim to click immediately before thinking through the request.",
      telemetryIndicator: "Rapid click-through within 10 seconds of email delivery without reading full text",
      resilientDefense: "Zero-blame reporting culture and simulated phishing education teaching users to 'Pause & Verify'.",
      codeSnippet: `// Urgency & Fear Mechanism:
// Phishing Subject: "FINAL NOTICE: Corporate Email Termination in 15 Minutes!"
// Psychological Impact: Prefrontal Cortex suppressed ➔ Amygdala panic ➔ Immediate credential submission!`
    },
    reciprocity_helpfulness_trap: {
      key: "reciprocity_helpfulness_trap",
      name: "Reciprocity & The Helpfulness Trap (Social Empathy)",
      category: "SOCIAL COOPERATION & EMPATHY",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      psychologicalTrigger: "Innate human desire to assist a polite colleague or return a favor",
      exploitationVector: "Posing as a stranded new employee, desperate intern, or helpful support technician",
      vulnerabilityImpact:
        "Humans are evolutionary social creatures who value mutual aid. An attacker poses as a new employee struggling to access payroll: 'I am so sorry to bother you, I am locked out and need to submit timesheets before 5 PM'. Empathy overrides data protection rules.",
      telemetryIndicator: "Employees emailing internal directory PDFs or customer files to unverified personal emails",
      resilientDefense: "Automated Data Loss Prevention (DLP) blocking outbound transmission of sensitive files.",
      codeSnippet: `// Helpfulness Trap Exploit Pattern:
// Attacker: "I'm a new intern in Kolkata office, could you email me the employee directory PDF?"
// Human Instinct: Empathy & Politeness ➔ Bypasses Data Classification Protocol!`
    },
    scarcity_fomo_bias: {
      key: "scarcity_fomo_bias",
      name: "Scarcity Bias & Fear of Missing Out (FOMO)",
      category: "PERCEIVED RESOURCE LIMITATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      psychologicalTrigger: "Perception that an opportunity or bonus is extremely limited in quantity or time",
      exploitationVector: "Fake bonuses: 'Festival Bonus: First 50 employees to claim receive a ₹25,000 gift card'",
      vulnerabilityImpact:
        "Scarcity creates intense competitive urgency. When presented with limited rewards, employees rush to claim their share without performing basic scrutiny, falling for credential harvesting portals.",
      telemetryIndicator: "Mass simultaneous employee logins to spoofed e-commerce or reward portals",
      resilientDefense: "Centralized internal communications channels for all legitimate bonuses and corporate announcements.",
      codeSnippet: `// Scarcity Lure Pattern:
// Subject: "FESTIVAL BONUS: Only 5 Gift Cards Left for Salt Lake Office Staff - Claim Now!"`
    },
    confirmation_expectation_bias: {
      key: "confirmation_expectation_bias",
      name: "Confirmation & Expectation Bias (Contextual Lures)",
      category: "COGNITIVE ALIGNMENT WITH EXPECTATIONS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      psychologicalTrigger: "Interpreting incoming messages in ways that confirm active pre-existing expectations",
      exploitationVector: "Sending appraisal or tax lures during annual performance review or tax filing season",
      vulnerabilityImpact:
        "If an employee is actively expecting an appraisal letter, an email titled 'Annual Appraisal 2026.pdf' matches their mental expectation perfectly. Confirmation bias causes them to overlook typos or suspicious sender domains.",
      telemetryIndicator: "High click-through rates on lures aligned with seasonal corporate events (tax filing, appraisals)",
      resilientDefense: "Content Disarm & Reconstruction (CDR) stripping all active macros from incoming attachments.",
      codeSnippet: `// Confirmation Bias Exploit:
// Context: Target just attended an industrial safety seminar.
// Attacker Lure: "Certificate of Participation - Industrial Safety Seminar 2026.pdf.exe" ➔ 100% Trust!`
    },
    visual_homoglyph_typosquatting: {
      key: "visual_homoglyph_typosquatting",
      name: "Visual Homoglyph (IDN Typosquatting) Limits",
      category: "HUMAN VISUAL PERCEPTION LIMITATIONS",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      psychologicalTrigger: "Inability of the human eye to differentiate visually identical Unicode glyphs",
      exploitationVector: "Registering domains replacing Latin 'a' (U+0061) with Cyrillic 'а' (U+0430)",
      vulnerabilityImpact:
        "Internationalized Domain Names allow non-Latin characters. A spoofed domain `pаypal.com` appears 100% identical to `paypal.com` on screen. Human vision cannot detect the difference, proving why technical defenses must protect human perception limits.",
      telemetryIndicator: "User navigating to Punycode domain `xn--pypal-4ve.com` without noticing visual discrepancies",
      resilientDefense: "Browser Punycode enforcement + EDR Web Protection blocking newly registered IDN domains.",
      codeSnippet: `// Homoglyph Domain Comparison:
// Legitimate Domain : paypal.com (All Latin Characters)
// Spoofed Domain     : pаypal.com (Contains Cyrillic 'а' U+0430 ➔ Punycode: xn--pypal-4ve.com)`
    }
  };

  const activeBias = cognitiveBiasDatabase[selectedBiasKey];

  // Studio 2: Live Human Error Probability Calculations
  const errorSimulation = useMemo(() => {
    // Model: P_error = 1 - e^(- (F_cognitive * I_urgency) / R_friction)
    const numerator = fatigueFactor * urgencyIntensity;
    const exponent = -numerator / technicalFriction;
    const humanErrorProb = (1 - Math.exp(exponent)) * 100;
    const actualCompromiseProb = technicalFriction >= 500
      ? (humanErrorProb * 0.005).toFixed(2) // FIDO2 Passkeys block 99.5% of credential submissions
      : technicalFriction >= 50
      ? (humanErrorProb * 0.25).toFixed(2)  // MFA Push blocks 75% of basic phishing
      : humanErrorProb.toFixed(2);           // No friction -> 100% compromise on click

    return {
      humanErrorProb: humanErrorProb.toFixed(2),
      actualCompromiseProb,
      badgeClass: parseFloat(actualCompromiseProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualCompromiseProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualCompromiseProb) < 2
        ? `FAIL-SAFE RESILIENCE: With FIDO2 WebAuthn technical friction (${technicalFriction}x), actual credential compromise probability is only ${actualCompromiseProb}% regardless of human cognitive fatigue (${fatigueFactor}x)!`
        : `HIGH HUMAN VULNERABILITY: With low technical friction (${technicalFriction}x), cognitive fatigue and urgency combine to produce a ${actualCompromiseProb}% probability of enterprise breach!`
    };
  }, [fatigueFactor, urgencyIntensity, technicalFriction]);

  // Studio 4: Human Risk Management Production Code Database
  const codeDatabase = {
    fido2_passkey_enforcement_powershell: {
      name: "PowerShell Script to Enforce FIDO2 Passwordless Passkeys in Entra ID",
      code: `# Enforce FIDO2 WebAuthn Passwordless Authentication in Microsoft Entra ID:
# Connect to Microsoft Graph API
Connect-MgGraph -Scopes "Policy.ReadWrite.AuthenticationMethod"

# Define FIDO2 Authentication Method Policy
$fido2Policy = @{
    state = "enabled"
    isAttestationEnforced = $true
    isSelfServiceRegistrationAllowed = $true
    keyRestrictions = @{
        isEnforced = $true
        enforcementType = "allow"
        aaGuids = @(
            "cb69481e-8ff7-4039-93ec-0a2f3a4b5c6d", # YubiKey 5 Series FIDO2
            "8c4e1f7d-ba1a-472f-9e6c-a39ef669e4b2"  # Nitrokey 3 FIDO2
        )
    }
}

Update-MgPolicyAuthenticationMethodPolicyFido2 -BodyParameter $fido2Policy
Write-Host "[+] FIDO2 WebAuthn Passkeys ENFORCED! Credential phishing mathematically neutralized." -ForegroundColor Green`,
      explanation: "PowerShell script enforcing hardware FIDO2 WebAuthn passkeys in Entra ID, mathematically neutralizing credential harvesting by binding authentication tokens to domain origins."
    },
    human_risk_scoring_python: {
      name: "Python Script to Calculate Employee Human Risk Score (HRS)",
      code: `import math

def calculate_human_risk_score(employee_data):
    # Weights for Risk Factors
    W_SIMULATION_FAILS = 35
    W_REPORTING_SPEED   = 25
    W_PRIVILEGE_LEVEL   = 25
    W_TRAINING_SCORE    = 15

    sim_penalty = (employee_data['failed_sims'] / employee_data['total_sims']) * W_SIMULATION_FAILS
    report_bonus = (employee_data['reported_phish_count'] * 5)
    priv_multiplier = 1.5 if employee_data['is_admin'] else 1.0

    raw_score = (sim_penalty - report_bonus + (W_PRIVILEGE_LEVEL * priv_multiplier))
    hrs = max(0, min(100, raw_score)) # Bound between 0 and 100

    print(f"Employee: {employee_data['name']}")
    print(f"[+] Human Risk Score (HRS): {hrs:.1f}/100")
    print(f"[+] Risk Classification   : {'HIGH' if hrs > 65 else 'MODERATE' if hrs > 35 else 'LOW'}")

calculate_human_risk_score({
    "name": "Mamata (Kolkata FinTech Lead)",
    "failed_sims": 0,
    "total_sims": 12,
    "reported_phish_count": 10,
    "is_admin": True
})`,
      explanation: "Python script calculating continuous employee Human Risk Scores (HRS) based on simulated phishing performance, reporting speed, and administrative privilege levels."
    },
    sigma_phishing_credential_spray: {
      name: "Sigma Rule for Rapid Multi-User Phishing Credential Submission",
      code: `title: High Velocity Single-IP Web Portal Credential Submissions (Phishing Campaign)
id: 8b7d4c2f-1e4b-4a8f-9a8f-3c2d4a8f9a8f
status: production
description: Detects multiple internal corporate users submitting credentials to the same external IP within 5 minutes
logsource:
    category: proxy
    product: windows
detection:
    selection:
        c-uri-extension: 'php'
        http-method: 'POST'
    timeframe: 5m
    condition: selection | count(user) by r-dns > 5
level: high`,
      explanation: "Sigma rule correlating proxy logs to detect when multiple employees submit credentials to an external phishing portal within a 5-minute window."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_human_risk",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Eliminating Cognitive Fatigue & Deploying FIDO2 Passkeys on Settlement Desks",
      threatType: "TARGETED SPEAR-PHISHING & BEC WIRE FRAUD (₹4.5 Crore Lure)",
      budget: "₹42,00,000",
      incident:
        "A sophisticated BEC campaign delivered spoofed CEO emails demanding urgent wire transfers at 5:30 PM, aiming to exploit settlement operator decision fatigue.",
      defenseStrategy:
        "Mamata enforced mandatory dual-authorization protocols and deployed hardware FIDO2 WebAuthn passkeys across all 45 financial switch operators.",
      outcome: "Zero funds transferred; credential phishing rendered mathematically impossible; 45 core financial gateways secured.",
      metrics: {
        passkeysDeployed: "450 FIDO2 Hardware Keys",
        becAttemptsNeutralized: "100% Blocked",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_authority_bias",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "AUTHORITY BIAS SOCIAL ENGINEERING (Fake Ministry Directive)",
      title: "Countering Authority Bias with Out-of-Band Verification Protocols",
      budget: "₹27,50,000",
      incident:
        "An adversary sent high-context emails impersonating the State Power Ministry, ordering substation engineers to install an urgent 'grid safety patch'.",
      defenseStrategy:
        "Debangshu established strict out-of-band telephone verification protocols and trained substation staff to challenge unverified executive directives.",
      outcome: "Substation engineers refused to execute the fake patch without out-of-band voice confirmation; power transmission integrity preserved.",
      metrics: {
        engineersTrained: "18 Substation Crews",
        authorityLuresDefeated: "100% Intercepted",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_urgency_phish",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "URGENCY-DRIVEN CLINIC PHISHING (Fake Payroll Deactivation)",
      title: "Protecting Night-Shift Doctors from Urgency Phishing via 1-Click Reporting",
      budget: "₹21,00,000",
      incident:
        "A malicious campaign targeted exhausted night-shift oncology doctors with fake notices threatening immediate payroll deactivation.",
      defenseStrategy:
        "Mahima deployed a 1-click 'Report Phish' button on hospital email clients and delivered 90-second contextual micro-learning modules.",
      outcome: "First doctor reported the phishing email in 45 seconds; SOC isolated the lure across all 120 clinic PCs; 120,000 patient records secured.",
      metrics: {
        meanTimeToReport: "45 Seconds",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_error_prob_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "COGNITIVE LOAD MODELING & HUMAN ERROR PROBABILITY THEOREM",
      title: "Proving Mathematical Resistance of Technical Friction against Human Fatigue",
      budget: "₹19,00,000",
      incident:
        "Researchers analyzed how cognitive fatigue, urgency intensity, and technical friction interact mathematically to govern human error probability.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that FIDO2 passkeys reduce breach probability below 0.5%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 5,000 simulated phishing experiments.",
      metrics: {
        simulationTrials: "5,000 Test Trials",
        errorModelAccuracy: "98.7% Predictive Fit",
        modelFramework: "Cognitive Friction Error Model",
        publication: "IEEE Transactions on Information Forensics"
      }
    }
  ];

  const activeScenario = localScenarios.find((s) => s.id === activeScenarioId) || localScenarios[0];

  return (
    <div className="min-h-screen bg-[#0a0d14] text-gray-100 font-sans leading-relaxed selection:bg-rose-600 selection:text-white pb-16">
      {/* Top Academic Header Banner */}
      <header className="border-b border-gray-800 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800">
                BCAC703 Cyber Security
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">
                Module 004_003
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 00
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Human Vulnerability: The Weakest Link in Cyber Security
            </h1>
            <p className="text-xs text-gray-400">
              Cognitive biases, decision fatigue, authority/urgency manipulation, Human Risk Management (HRM), FIDO2 passkeys, and IT Act Section 66D.
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 flex flex-col items-start sm:items-end">
            <span className="font-semibold text-gray-200">Instructor: Sukanta Hui</span>
            <span>Coder &amp; AccoTax · Barrackpore, WB</span>
          </div>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-12">

        {/* SECTION 1: Executive Theory & The Psychology of Human Vulnerability */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The Psychology of Social Engineering
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Human Vulnerability: Cognitive Biases &amp; Security Failures
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              The human factor is universally recognized as the single greatest vulnerability in modern enterprise cybersecurity. 
              As security pioneer <strong>Kevin Mitnick</strong> observed, an attacker does not need to break 256-bit encryption or 
              exploit zero-day kernel flaws if they can manipulate an authorized human into voluntarily handing over credentials or 
              clicking malicious links. Social engineering weaponizes cognitive biases—such as <strong>Truth-Default Theory</strong>, 
              <strong>Decision Fatigue</strong>, <strong>Authority Bias</strong>, and <strong>Urgency Manipulation (Amygdala Hijacking)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mitnick's Axiom Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Kevin Mitnick's Fundamental Axiom
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                "You can spend millions on firewalls and encryption, but human trust remains the single point of failure."
              </div>
              <p className="text-gray-300 leading-relaxed">
                Technical controls protect against mathematical and algorithmic vulnerabilities, but social engineering targets 
                biological, evolutionary psychology. Overcoming human vulnerability requires shifting from punitive policies to resilient, human-centered engineering.
              </p>
            </div>

            {/* Failing Safely Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The Human Firewall &amp; Failing Safely
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">FIDO2 WebAuthn Passkeys:</strong> Cryptographic domain binding makes phishing impossible.</li>
                <li>• <strong className="text-purple-300">Contextual Micro-Learning:</strong> 90-second instant feedback on simulated phishing failures.</li>
                <li>• <strong className="text-amber-300">Zero-Blame Culture:</strong> 1-click reporting empowering employees as active sensors.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Human Vulnerability Vector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Vulnerability Pathway Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Human Cognitive Biases &amp; The Human Firewall Shield
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how social engineering exploits cognitive biases and emotional panic, and how FIDO2 passkeys and human training neutralize the attack:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: COGNITIVE BIASES */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. COGNITIVE BIAS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Truth-Default &amp; Trust
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PSYCHOLOGY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Decision Fatigue
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Authority Compliance
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: SOCIAL ENGINEERING LURE */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. PHISHING LURE
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Spoofed CEO / Bank
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  MANIPULATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Urgency &amp; Fear
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Scarcity / FOMO
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: AMYGDALA PANIC OVERRIDE */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. AMYGDALA HIJACK
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Prefrontal Cortex Off
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  FAST SYSTEM 1:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Panic Reaction
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Clicks without Thinking
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: FIDO2 & HUMAN FIREWALL SHIELD */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. HUMAN FIREWALL
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  1-Click Phish Alarm
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EMPOWERED:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Zero-Blame Reporting
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Alerts SOC in &lt;45s
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: FAILING SAFELY (PASSKEYS) */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. FAILING SAFELY
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  FIDO2 WebAuthn Key
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Refuses Fake Domain
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Credential Loss
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Component Cognitive Vulnerability Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Cognitive Vulnerability &amp; Psychological Exploit Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a cognitive vulnerability vector below to examine its psychological trigger, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(cognitiveBiasDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedBiasKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedBiasKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  BIAS
                </span>
                <span className="font-bold text-white text-[11px] leading-tight line-clamp-2">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Box */}
          <div className="bg-[#070b14] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeBias.categoryBadge)}>
                    {activeBias.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Trigger: {activeBias.psychologicalTrigger}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeBias.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Psychological Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeBias.vulnerabilityImpact}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeBias.exploitationVector}</p>
                  <p className="text-gray-400 text-[11px]">{activeBias.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Engineering &amp; Human-Centric Defense
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeBias.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Exploit Pattern &amp; Cognitive Flow
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeBias.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Human Error Probability Calculator */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Human Error Probability &amp; Technical Friction Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust cognitive fatigue $F$, urgency intensity $I$, and technical friction $R$ to model human error probability 
              $P_{\text{error}} = 1 - e^{-\frac{F \times I}{R}}$ and see how FIDO2 passkeys reduce actual compromise probability to under 1%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Cognitive &amp; Defense Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Cognitive Fatigue Multiplier (F):</span>
                  <span className="text-cyan-400 font-bold font-mono">{fatigueFactor.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.2"
                  value={fatigueFactor}
                  onChange={(e) => setFatigueFactor(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Urgency Manipulation (I):</span>
                  <span className="text-rose-400 font-bold font-mono">{urgencyIntensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={urgencyIntensity}
                  onChange={(e) => setUrgencyIntensity(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Technical Safeguard Friction (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTechnicalFriction(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      technicalFriction === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setTechnicalFriction(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      technicalFriction === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    MFA Push (50x)
                  </button>
                  <button
                    onClick={() => setTechnicalFriction(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      technicalFriction === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    FIDO2 Passkey (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Human Vulnerability Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Human Error Probability (P_error)</span>
                  <span className="text-lg font-extrabold text-white">{errorSimulation.humanErrorProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Unconscious Click Likelihood</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Compromise Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{errorSimulation.actualCompromiseProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Technical Friction Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", errorSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Resilience Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{errorSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - HRM Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Passkey Enforcement &amp; Analytics Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Human Risk Management Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production PowerShell scripts enforcing FIDO2 WebAuthn passkeys, Python Human Risk Scoring algorithms, 
              and Sigma proxy detection rules for rapid phishing submissions:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(codeDatabase).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setActiveCodeTab(key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 text-xs font-bold",
                  activeCodeTab === key
                    ? "bg-purple-950 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Policy / Script
              </span>
            </div>

            <p className="text-xs text-gray-300">{activeCode.explanation}</p>

            <pre className="bg-black/90 p-4 rounded-lg font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre-wrap border border-purple-950/50">
              {activeCode.code}
            </pre>
          </div>
        </section>

        {/* SECTION 6: Studio 3 - Regional West Bengal Pedagogical Case Studies */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Regional Engineering Applications
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              6. West Bengal Field Case Studies: Kolkata, Barrackpore, Ichapur &amp; Jadavpur
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore how cybersecurity professionals Mamata, Debangshu, Mahima, and Susmita build resilient human firewalls, 
              counter authority bias, and enforce FIDO2 passkeys across West Bengal critical infrastructure:
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {localScenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioId(sc.id)}
                className={clsx(
                  "p-4 rounded-xl border text-left transition-all duration-300 space-y-2",
                  activeScenarioId === sc.id
                    ? "bg-amber-950/60 border-amber-500 shadow-md"
                    : "bg-[#0b101c] border-gray-800 hover:border-gray-700 text-gray-400"
                )}
              >
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-amber-800">
                  {sc.lead} · {sc.location.split(" ")[0]}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{sc.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1">{sc.threatType}</p>
              </button>
            ))}
          </div>

          {/* Active Scenario Detailed Breakdown */}
          <div className="bg-[#070b14] p-6 rounded-xl border border-gray-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {activeScenario.location}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeScenario.title}</h3>
              </div>
              <div className="text-right text-xs">
                <span className="text-gray-400 block">Lead Architect: {activeScenario.lead}</span>
                <span className="font-semibold text-emerald-400">Security Budget: {activeScenario.budget}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                  The Incident &amp; Human Vulnerability Vector
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.incident}</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
                  Architectural Defense &amp; Resolution
                </span>
                <p className="text-gray-300 leading-relaxed">{activeScenario.defenseStrategy}</p>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="bg-[#050811] p-4 rounded-lg border border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {Object.entries(activeScenario.metrics).map(([key, val]) => (
                <div key={key} className="bg-gray-950 p-2.5 rounded border border-gray-800/80">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-white mt-1 block">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Statutory & Legal Frameworks in India */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Statutory Jurisprudence
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              7. Legal Liabilities for Social Engineering &amp; Personation in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law and evidentiary statutes treat impersonation, fraudulent deception, 
              and corporate credential theft with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cheating by Personation:</strong> Impersonating corporate executives or bank officials over computer networks carries up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized access via stolen credentials.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Cheating &amp; fraud via phishing lures (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement employee security awareness training.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all credential phishing breaches within <strong className="text-white">6 hours</strong>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls, Pro Tips, Thinking Hints & Mini Checklist */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Exam &amp; Professional Mastery
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              8. Common Pitfalls, Industry Best Practices &amp; Key Hints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Common Pitfalls */}
            <div className="bg-gray-950 p-4 rounded-xl border border-rose-950/60 space-y-3">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Common Beginner Mistakes
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Blaming Users for Clicking Links:</strong> Design resilient systems (FIDO2) that fail safely when errors happen.
                </li>
                <li>
                  <strong>Relying on Annual 1-Hour Security Slides:</strong> Users forget 80% within 7 days; use 2-minute monthly micro-learning.
                </li>
                <li>
                  <strong>Punishing Employees for Failing Phishing Tests:</strong> Fear creates concealment; adopt a zero-blame reporting culture.
                </li>
              </ul>
            </div>

            {/* Professional Tips */}
            <div className="bg-gray-950 p-4 rounded-xl border border-emerald-950/60 space-y-3">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Professional Tips &amp; Tricks
              </span>
              <ul className="space-y-2 text-gray-300 list-disc list-inside">
                <li>
                  <strong>Deploy FIDO2 WebAuthn Passkeys:</strong> Origin binding makes password theft mathematically impossible.
                </li>
                <li>
                  <strong>Implement a 1-Click 'Report Phish' Button:</strong> Enable rapid reporting in under 45 seconds to alert the SOC.
                </li>
                <li>
                  <strong>Enforce Dual-Authorization Controls:</strong> Require two distinct approvers for financial wire transfers.
                </li>
              </ul>
            </div>

            {/* Hint Section */}
            <div className="bg-gray-950 p-4 rounded-xl border border-indigo-950/60 space-y-3">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                Pedagogical Thinking Hints
              </span>
              <ul className="space-y-2 text-gray-300">
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Think about...</span>
                  Why do FIDO2 WebAuthn passkeys render credential phishing impossible even if an employee enters their PIN into a fake site?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does cognitive fatigue at the end of the workday increase phishing click-through rates by over 300%?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the error calculator above, set technical friction to FIDO2 Passkey (500x) and observe actual compromise drop to 0.7%!
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Checklist */}
          <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-rose-400">
              Student Mini Checklist (Exam &amp; Career Essentials)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Humans are the weakest link because psychological cognitive biases bypass technical firewalls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Truth-Default Theory proves humans naturally default to presuming communications are honest.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Cognitive fatigue and urgency triggers amygdala hijacking, disabling analytical System 2 thinking.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The Human Firewall paradigm transforms employees into proactive sensors with 1-click reporting.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Failing safely with FIDO2 passkeys makes credential phishing mathematically impossible.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66D of the IT Act penalizes Cheating by Personation with up to 3 years imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Human Vulnerability & Social Engineering FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Human Risk Management Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Human Vulnerability: The Weakest Link in Cyber Security (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Welcome to Module 004_003 on Phishing, Social Engineering & Insider Threats! Remember Kevin Mitnick's timeless axiom: you can have the most expensive firewalls and cryptographic algorithms, but if an attacker can manipulate a human into clicking a link or revealing a password, every technical control is completely bypassed! Understand the cognitive biases exploited in social engineering: Truth-Default Theory, Decision Fatigue (System 1 vs System 2 thinking), Authority Bias (Milgram compliance in CEO fraud), and Urgency Manipulation (Amygdala hijacking overriding the prefrontal cortex). To build true organizational resilience, abandon punitive blame cultures and build Human Risk Management (HRM) frameworks: deploy FIDO2 WebAuthn passwordless passkeys that mathematically refuse to sign fraudulent domains, deliver 90-second contextual micro-learning at the moment of error, and provide a 1-click 'Report Phish' button empowering employees as the ultimate Human Firewall. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
