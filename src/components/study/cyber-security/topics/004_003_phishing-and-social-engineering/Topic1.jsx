import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

const Topic1 = () => {
  // Unique SVG IDs
  const svgInfluenceId = useId();

  // Studio 1: Active Principle Selection
  const [selectedPrincipleKey, setSelectedPrincipleKey] = useState("authority_principle_bec");

  // Studio 2: Live Persuasion Susceptibility Calculator State
  const [persuasionIntensity, setPersuasionIntensity] = useState(3.5);
  const [psychSusceptibility, setPsychSusceptibility] = useState(2.0);
  const [verificationFriction, setVerificationFriction] = useState(1); // 1 = None, 50 = Email Confirmation, 500 = Out-of-Band Voice Call

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_bec_dual_auth");

  // Studio 4: Anti-Influence Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("dual_auth_workflow_python");

  // 8 Influence Profiles for Studio 1
  const influenceDatabase = {
    authority_principle_bec: {
      key: "authority_principle_bec",
      name: "1. The Authority Principle & CEO Wire Fraud (BEC)",
      category: "HIERARCHICAL DEFERENCE & OBEDIENCE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      psychologicalFoundation: "Milgram obedience to authority: humans reflexively comply with institutional rank",
      weaponizedAttackScenario:
        "Spoofs executive display names to demand urgent, confidential wire transfers: 'Mamata, I am in a confidential board meeting in Kolkata, wire ₹45 Lakhs to vendor immediately'.",
      vulnerabilityImpact:
        "Subordinate employees defer to authority and fear insubordination, actively bypassing established multi-step accounting controls to comply with the perceived executive order.",
      telemetryIndicator: "Accounting staff initiating wire transfers based solely on unverified single-party email requests",
      resilientDefense: "Mandatory Out-of-Band (OOB) dual-authorization requiring voice confirmation for all transfers > ₹1,00,000.",
      codeSnippet: `// Authority-Driven BEC Attack Pattern:
// [From: ceo@kolkata-fintech.in (Spoofed Display Name)]
// "Mamata, wire ₹45,00,000 to our legal vendor before 4 PM. Keep this strictly confidential."`
    },
    urgency_fear_principle: {
      key: "urgency_fear_principle",
      name: "2. The Urgency & Fear Principle (Cognitive Myopia)",
      category: "AMYGDALA STRESS & TIME CONSTRAINTS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      psychologicalFoundation: "Fight-or-flight panic overriding the prefrontal cortex during artificial crises",
      weaponizedAttackScenario:
        "Imposes artificial time limits: 'CRITICAL ALERT: Your payroll account will be permanently deactivated in 10 minutes unless verified'.",
      vulnerabilityImpact:
        "Stress hormones trigger cognitive tunnel vision, forcing the victim to focus 100% of mental bandwidth on resolving the crisis while ignoring obvious sender address anomalies.",
      telemetryIndicator: "Employee clicks within 15 seconds of email delivery without reading domain headers",
      resilientDefense: "Trained 30-second 'Stop, Look, Think' cognitive pause protocol and zero-blame reporting.",
      codeSnippet: `// Urgency & Fear Manipulation:
// Subject: "FINAL NOTICE: Corporate Email Termination in 10 Minutes!"
// Impact: Bypasses rational scrutiny ➔ Immediate credential submission!`
    },
    scarcity_fomo_principle: {
      key: "scarcity_fomo_principle",
      name: "3. The Scarcity Principle & Fear of Missing Out (FOMO)",
      category: "RESOURCE RESTRICTION & COMPETITIVE GREED",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      psychologicalFoundation: "Evolutionary hoarding instincts and perceived value of dwindling resources",
      weaponizedAttackScenario:
        "Fake corporate bonuses: 'Diwali Festival Gift Cards: First 25 employees to claim receive ₹25,000 (Only 3 vouchers left!)'.",
      vulnerabilityImpact:
        "Employees rush to claim the scarce resource before colleagues take all allocations, bypassing security caution and entering credentials into spoofed portals.",
      telemetryIndicator: "Spike in concurrent employee logins to newly registered external survey/reward domains",
      resilientDefense: "Centralized internal communication portals for all corporate bonuses and announcements.",
      codeSnippet: `// Scarcity Lure Pattern:
// Subject: "FESTIVAL BONUS: Only 3 Gift Cards Left for Salt Lake Staff - Claim Now!"`
    },
    liking_trust_grooming: {
      key: "liking_trust_grooming",
      name: "4. The Liking & Familiarity Principle (Long-Term Grooming)",
      category: "RAPPORT-BUILDING & SOCIAL CHARM",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      psychologicalFoundation: "Innate human preference to comply with requests from people we like and trust",
      weaponizedAttackScenario:
        "Attackers connect on LinkedIn, compliment the target on publications, discuss West Bengal tech events for 3 weeks, and then share an infected document.",
      vulnerabilityImpact:
        "Emotional affinity and perceived similarity disarm professional skepticism, causing the victim to open weaponized attachments without running standard sandbox scans.",
      telemetryIndicator: "Employees exchanging personal files with external LinkedIn contacts on corporate machines",
      resilientDefense: "Content Disarm & Reconstruction (CDR) stripping all active macros from incoming documents.",
      codeSnippet: `// Ingratiation & Grooming Timeline:
// Week 1: Friendly LinkedIn connection + compliments on SCADA telemetry research.
// Week 2: Casual discussions on power grid engineering in West Bengal.
// Week 3: Sends "Collaborative_Research.docx" (Contains Remote Template Payload!)`
    },
    reciprocity_helpfulness_trap: {
      key: "reciprocity_helpfulness_trap",
      name: "5. The Reciprocity Principle & The Helpfulness Trap",
      category: "OBLIGATION & SOCIAL DEBT",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      psychologicalFoundation: "Universal social norm compelling humans to return favors and assist those in need",
      weaponizedAttackScenario:
        "Attacker performs a small favor (troubleshooting a minor issue or buying tea), then asks: 'Could you quickly let me plug in my USB to print a resume?'.",
      vulnerabilityImpact:
        "The victim feels an unconscious social debt and psychological pressure to be helpful, overriding strict physical security or USB data transfer rules.",
      telemetryIndicator: "Employees inserting unauthorized external USB flash drives into corporate workstations",
      resilientDefense: "Hardware USB port blocking via Group Policy and strict zero-trust physical access controls.",
      codeSnippet: `// Reciprocity Manipulation Pattern:
// Action 1: Attacker provides helpful advice on a public technical forum.
// Action 2: "Since I helped you, could you review this internal file link?" ➔ User complies!`
    },
    social_proof_consensus: {
      key: "social_proof_consensus",
      name: "6. The Social Proof & Consensus Principle (Herd Behavior)",
      category: "PEER CONFORMITY & GROUP VALIDATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      psychologicalFoundation: "Looking to the actions of peers to determine appropriate behavior during uncertainty",
      weaponizedAttackScenario:
        "Spear-phishing lures claim: '94% of the Barrackpore SCADA team has already completed their Aadhaar token update. Only your submission is pending'.",
      vulnerabilityImpact:
        "Believing that respected colleagues have already complied, the victim assumes the request is legitimate and safe, suppressing individual skepticism.",
      telemetryIndicator: "High conversion rates on phishing templates that cite high departmental compliance statistics",
      resilientDefense: "Enterprise passwordless passkey deployment rendering credential submission harmless.",
      codeSnippet: `// Social Proof Lure Text:
// "All senior engineers at the Barrackpore Grid have updated their security tokens. Click here to finalize your pending update."`
    },
    pretexting_elaborate_persona: {
      key: "pretexting_elaborate_persona",
      name: "7. Pretexting & Elaborate Fictional Personas",
      category: "FABRICATED CONTEXT & IDENTITY DECEPTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      psychologicalFoundation: "Creating a coherent, detailed backstory that provides total contextual legitimacy",
      weaponizedAttackScenario:
        "An attacker poses as 'Senior Compliance Auditor Debangshu from State Power Regulatory Commission', citing real project codes to elicit substation IP blocks.",
      vulnerabilityImpact:
        "The depth of accurate technical context and professional vocabulary convinces the target that the request is authorized by high-level management.",
      telemetryIndicator: "Employees releasing internal architectural diagrams or IP range documentation to external emails",
      resilientDefense: "Formal third-party verification protocols and strict data classification policies.",
      codeSnippet: `// Pretexting Blueprint:
// Persona : External Compliance Auditor from West Bengal Electricity Regulatory Commission
// Context : Annual SCADA Security Assessment
// Target  : Substation IP addresses and engineer contact rosters`
    },
    ai_voice_cloning_vishing: {
      key: "ai_voice_cloning_vishing",
      name: "8. AI Voice Cloning & Generative Deepfake Vishing",
      category: "SYNTHETIC BIOMETRIC SPOOFING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      psychologicalFoundation: "Human inability to distinguish neural-synthesized audio from genuine human voices",
      weaponizedAttackScenario:
        "Attackers train generative voice models on 3 minutes of CEO YouTube audio, executing real-time phone calls demanding emergency financial wire transfers.",
      vulnerabilityImpact:
        "The voice on the phone matches the CEO's exact pitch, accent, and inflection, causing the finance manager to execute transfers without secondary verification.",
      telemetryIndicator: "Urgent wire transfers initiated following unverified inbound phone calls",
      resilientDefense: "Pre-shared secret duress passphrases and mandatory dual-signoff on all banking portals.",
      codeSnippet: `// AI Voice Cloning Vishing Attack:
// Input Audio : 3 Minutes of CEO's Public Keynote Speech
// Model Engine: Generative Diffusion Voice Synthesizer
// Execution   : Real-time cloned phone call demanding emergency fund transfer!`
    }
  };

  const activePrinciple = influenceDatabase[selectedPrincipleKey];

  // Studio 2: Live Persuasion Susceptibility Calculations
  const persuasionSimulation = useMemo(() => {
    // Model: P_breach = 1 - e^(- (I_persuasion * S_psych) / R_verify)
    const numerator = persuasionIntensity * psychSusceptibility;
    const exponent = -numerator / verificationFriction;
    const rawBreachProb = (1 - Math.exp(exponent)) * 100;
    const actualBreachProb = verificationFriction >= 500
      ? (rawBreachProb * 0.008).toFixed(2) // Out-of-band voice verification blocks 99.2% of attacks
      : verificationFriction >= 50
      ? (rawBreachProb * 0.30).toFixed(2)  // Secondary email confirmation blocks 70% of attacks
      : rawBreachProb.toFixed(2);           // No verification -> 100% exploit rate

    return {
      rawBreachProb: rawBreachProb.toFixed(2),
      actualBreachProb,
      badgeClass: parseFloat(actualBreachProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualBreachProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualBreachProb) < 2
        ? `IMMUNITY ACHIEVED: With Out-of-Band Voice Verification friction (${verificationFriction}x), actual breach probability is only ${actualBreachProb}% regardless of persuasion intensity (${persuasionIntensity}x)!`
        : `HIGH BREACH RISK: With low verification friction (${verificationFriction}x), persuasion intensity (${persuasionIntensity}x) and psychological susceptibility produce a ${actualBreachProb}% breach probability!`
    };
  }, [persuasionIntensity, psychSusceptibility, verificationFriction]);

  // Studio 4: Anti-Influence Production Code Database
  const codeDatabase = {
    dual_auth_workflow_python: {
      name: "Python Dual-Authorization Out-of-Band Verification Engine",
      code: `import time

class FinancialTransferEngine:
    def __init__(self, threshold_inr=100000):
        self.threshold = threshold_inr # ₹1,00,000 Threshold

    def process_transfer_request(self, requester, amount, recipient_account, channel):
        print(f"[*] Processing Transfer: ₹{amount:,.2f} requested by {requester} via {channel}")
        
        # 1. Authority Check: High value transactions require Dual Authorization
        if amount >= self.threshold:
            print("[!] High Value Transfer Detected -> Triggering Out-of-Band Verification!")
            
            # Require Out-of-Band Voice Call Confirmation
            is_oob_verified = self.verify_out_of_band_voice_call(requester)
            is_secondary_approved = self.get_secondary_executive_signoff()
            
            if is_oob_verified and is_secondary_approved:
                print(f"[+] Transfer APPROVED! ₹{amount:,.2f} disbursed to {recipient_account}")
                return True
            else:
                print("[-] Transfer REJECTED! Failed Out-of-Band verification. Possible BEC Fraud!")
                return False
        else:
            print("[+] Standard Transfer Approved.")
            return True

    def verify_out_of_band_voice_call(self, executive):
        print(f"[+] Out-of-Band phone call completed with {executive} on registered mobile.")
        return True

    def get_secondary_executive_signoff(self):
        print("[+] Secondary Executive (Mamata - FinTech Lead) approved transaction.")
        return True

engine = FinancialTransferEngine()
engine.process_transfer_request("CEO (Spoofed)", 4500000, "Acct_984210", "EMAIL")`,
      explanation: "Production Python dual-authorization engine enforcing secondary approver signoff and out-of-band voice confirmation for high-value financial transfers."
    },
    dmarc_enforcement_powershell: {
      name: "PowerShell Script to Enforce DMARC p=reject in Microsoft Exchange Online",
      code: `# Enforce Strict DMARC p=reject Policy in Exchange Online:
# Connect to Exchange Online PowerShell
Connect-ExchangeOnline -UserPrincipalName admin@kolkata-fintech.in

# 1. Configure Anti-Phishing Policy to Quarantine Spoofed Internal Domains
New-AntiPhishPolicy -Name "Strict_DMARC_Enforcement_Policy" \`
    -EnableOrganizationDomainsProtection $true \`
    -EnableTargetedUserProtection $true \`
    -TargetedUsersToProtect "ceo@kolkata-fintech.in", "cfo@kolkata-fintech.in" \`
    -AuthenticationFailAction Quarantine \`
    -EnableMailboxIntelligenceProtection $true

# 2. Verify DMARC DNS Record:
# DNS TXT: _dmarc.kolkata-fintech.in -> "v=DMARC1; p=reject; rua=mailto:dmarc-reports@kolkata-fintech.in; pct=100"
Write-Host "[+] DMARC p=reject Enforcement ACTIVE! Spoofed executive emails blocked at perimeter." -ForegroundColor Green`,
      explanation: "Configures Microsoft Exchange Online anti-phishing policies to quarantine spoofed internal executive domains failing SPF/DKIM/DMARC alignment."
    },
    sigma_display_name_spoof: {
      name: "Sigma Rule for Executive Display Name Spoofing Detection",
      code: `title: Executive Display Name Spoofing from External Domain (BEC Lure)
id: 8b7d4c2f-3c2d-4a8f-9a8f-2e4b9a8f4e1b
status: production
description: Detects incoming emails with executive display names originating from non-corporate external domains
logsource:
    category: email
    product: m365
detection:
    selection_display_name:
        HeaderFromDisplayName|contains:
            - 'Managing Director'
            - 'Chief Executive Officer'
            - 'Mamata (Lead Architect)'
    filter_internal_domains:
        SenderDomain|endswith:
            - 'kolkata-fintech.in'
            - 'wb-powergrid.gov.in'
    condition: selection_display_name and not filter_internal_domains
level: critical`,
      explanation: "Sigma rule scanning incoming email metadata to alert on external messages whose display name impersonates internal corporate executives."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_bec_dual_auth",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Preventing a ₹3.8 Crore BEC Wire Fraud via Dual-Authorization Protocols",
      threatType: "AUTHORITY BIAS & EXECUTIVE DISPLAY SPOOFING (₹3.8 Crore Lure)",
      budget: "₹48,00,000",
      incident:
        "An adversary spoofed the CEO's display name, sending an email to accounting demanding an urgent ₹3.8 Crore wire transfer for a 'confidential FinTech acquisition'.",
      defenseStrategy:
        "Mamata enforced an Out-of-Band Dual-Authorization policy: the accounting clerk called the CEO on a verified mobile number, exposing the fraud immediately.",
      outcome: "Zero funds transferred; BEC campaign neutralized in 3 minutes; 45 core financial settlement gateways secured.",
      metrics: {
        wireFraudBlocked: "₹3,80,00,000 Saved",
        oobVerificationTime: "3 Minutes",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_urgency_reboot",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "URGENCY & AUTHORITY MANIPULATION (Fake Grid Emergency)",
      title: "Rejecting Urgent Fake Ministry Directives to Reboot Substation RTUs",
      budget: "₹30,00,000",
      incident:
        "An adversary sent urgent emails posing as the State Energy Secretary, ordering substation operators to reboot RTU controllers within 15 minutes to avoid grid failure.",
      defenseStrategy:
        "Debangshu trained operators in the 30-second 'Stop, Look, Think' cognitive pause and established strict out-of-band verification with the state load dispatch center.",
      outcome: "Operators paused, performed out-of-band phone checks, and confirmed the directive was fraudulent; zero substation downtime.",
      metrics: {
        substationUptime: "100% Maintained",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_scarcity_phish",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "SCARCITY & FOMO MANIPULATION (Fake Medical Conference Grants)",
      title: "Neutralizing Scarcity Phishing Lures Promising Oncology Conference Grants",
      budget: "₹23,50,000",
      incident:
        "A phishing campaign targeted oncology doctors offering 'International Oncology Conference Grants: First 5 applicants only (1 remaining)' to steal hospital logins.",
      defenseStrategy:
        "Mahima deployed FIDO2 WebAuthn passkeys across all clinic workstations and trained medical staff on recognizing scarcity and FOMO manipulation.",
      outcome: "Doctors using FIDO2 passkeys could not submit credentials to the spoofed site; 120,000 oncology patient records protected.",
      metrics: {
        passkeyLoginsEnforced: "100% FIDO2 Keys",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_persuasion_matrix_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "PERSUASION SUSCEPTIBILITY MATRIX & COUNTER-INFLUENCE MODEL",
      title: "Modeling Mathematical Resilience of Out-of-Band Verification Protocols",
      budget: "₹20,00,000",
      incident:
        "Researchers analyzed how combining Cialdini's influence vectors increases cognitive compliance, modeling the mathematical mitigation of out-of-band verification.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, proving that out-of-band verification reduces breach probability below 0.9%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 10,000 simulated persuasion trials.",
      metrics: {
        persuasionTrials: "10,000 Test Trials",
        modelAccuracy: "99.1% Predictive Fit",
        modelFramework: "Persuasion Susceptibility Matrix",
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
                Topic 01
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Social Engineering Principles: Authority, Urgency, Scarcity, Trust
            </h1>
            <p className="text-xs text-gray-400">
              Dr. Cialdini's 6 influence principles, Business Email Compromise (BEC), Out-of-Band verification, and IT Act Section 66D.
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

        {/* SECTION 1: Executive Theory & Dr. Cialdini's Principles */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The Science of Persuasion &amp; Manipulation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Psychology of Influence: Dr. Robert Cialdini's 6 Principles in Cyber Attacks
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Social Engineering weaponizes evolutionary human psychology and cognitive heuristics. Threat actors do not need 
              zero-day software exploits if they can exploit <strong>Dr. Robert Cialdini's 6 Principles of Influence</strong>—<strong>Authority</strong> 
              (Milgram compliance in CEO fraud / BEC), <strong>Urgency &amp; Fear</strong> (amygdala panic overriding rational thought), 
              <strong>Scarcity</strong> (fear of missing out on bonuses), <strong>Liking &amp; Trust</strong> (rapport grooming), 
              <strong>Reciprocity</strong> (the helpfulness trap), and <strong>Social Proof</strong> (herd conformity).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BEC & Authority Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Authority Bias &amp; Business Email Compromise (BEC)
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Spoofed CEO Display Name ➔ "Urgent wire transfer required before 4 PM!"
              </div>
              <p className="text-gray-300 leading-relaxed">
                Hierarchical corporate conditioning compels employees to obey perceived executive directives. 
                Deference overrides critical verification, leading accounting staff to bypass standard multi-party approval controls.
              </p>
            </div>

            {/* Out-of-Band & Cognitive Pause Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Out-of-Band Dual-Auth &amp; Cognitive Pause
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Out-of-Band Verification:</strong> Mandatory phone call on registered mobile for transfers.</li>
                <li>• <strong className="text-purple-300">Cognitive Pause (30s):</strong> "Stop, Look, Think" deliberate inspection before clicking.</li>
                <li>• <strong className="text-amber-300">DMARC p=reject:</strong> Enforcing strict cryptographic email domain alignment at gateway.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Cialdini's Principles vs Defense */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Influence Vector Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Cialdini's Influence Vectors &amp; Counter-Influence Shields
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Observe how Authority, Urgency, Scarcity, Trust, and Reciprocity attempt to manipulate human compliance, 
              and how Out-of-Band Dual-Authorization and FIDO2 passkeys neutralize them:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: AUTHORITY */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. AUTHORITY
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Milgram Obedience
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CEO FRAUD / BEC:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Executive Pretext
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Deference to Rank
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: URGENCY & FEAR */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. URGENCY / FEAR
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Amygdala Panic
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  COGNITIVE MYOPIA:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  15-Minute Deadline
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Overrules Logic
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: SCARCITY & FOMO */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. SCARCITY
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  FOMO &amp; Competition
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  LIMITED REWARDS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Festival Bonus Lure
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Rushed Action
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 4: RECIPROCITY & TRUST */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. RECIPROCITY
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Helpfulness Trap
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SOCIAL DEBT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Returning Favors
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Grooming on LinkedIn
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 5: OUT-OF-BAND DUAL AUTH SHIELD */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. DUAL-AUTH SHIELD
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Out-of-Band &amp; Passkeys
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  COUNTER-INFLUENCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Secondary Voice Call
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Wire Fraud!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Component Influence Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Cialdini's Influence Principles &amp; Exploit Vector Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an influence principle or social engineering vector below to examine its psychological foundation, 
              weaponized attack scenario, vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(influenceDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedPrincipleKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedPrincipleKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  PRINCIPLE
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activePrinciple.categoryBadge)}>
                    {activePrinciple.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Psychology: {activePrinciple.psychologicalFoundation}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activePrinciple.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Weaponized Attack Scenario &amp; Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activePrinciple.weaponizedAttackScenario}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activePrinciple.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activePrinciple.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Defense &amp; Boundary Controls
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activePrinciple.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Exploit Pattern &amp; Pretext Structure
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activePrinciple.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Persuasion Susceptibility Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Persuasion Susceptibility &amp; Verification Friction Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust persuasion intensity I, psychological susceptibility S, and verification friction R to model breach probability 
              P_breach = 1 - exp(-(I × S) / R) and see how Out-of-Band voice verification reduces breach probability to under 1%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Influence &amp; Verification Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Persuasion Intensity (I):</span>
                  <span className="text-cyan-400 font-bold font-mono">{persuasionIntensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={persuasionIntensity}
                  onChange={(e) => setPersuasionIntensity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Psychological Susceptibility (S):</span>
                  <span className="text-rose-400 font-bold font-mono">{psychSusceptibility.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.0"
                  step="0.2"
                  value={psychSusceptibility}
                  onChange={(e) => setPsychSusceptibility(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Verification Friction (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setVerificationFriction(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      verificationFriction === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setVerificationFriction(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      verificationFriction === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Email Check (50x)
                  </button>
                  <button
                    onClick={() => setVerificationFriction(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      verificationFriction === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Out-of-Band Call (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Persuasion Susceptibility Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Compliance Probability</span>
                  <span className="text-lg font-extrabold text-white">{persuasionSimulation.rawBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without Verification Friction</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Breach Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{persuasionSimulation.actualBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Verification Friction Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", persuasionSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Defense Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{persuasionSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Anti-Influence Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Verification &amp; DMARC Policy Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Anti-Influence &amp; DMARC Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python Out-of-Band verification engines, PowerShell DMARC `p=reject` enforcement scripts, 
              and Sigma detection rules for executive display name spoofing:
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
                Production Engine
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat authority-driven BEC fraud, 
              scarcity lures, and AI voice cloning across West Bengal enterprise and critical infrastructure networks:
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
                  The Incident &amp; Influence Vector
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
                  <strong>Relying on Email Confirmations for Wire Transfers:</strong> If the email is compromised, email confirmations are spoofed.
                </li>
                <li>
                  <strong>Trusting Display Names on Mobile Devices:</strong> Mobile screens hide the real domain; check the full sender address.
                </li>
                <li>
                  <strong>Assuming Friendly Contacts are Safe:</strong> Attackers build rapport over weeks before introducing malicious attachments.
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
                  <strong>Enforce Out-of-Band (OOB) Voice Verification:</strong> Call the requester on a registered number before wiring funds.
                </li>
                <li>
                  <strong>Deploy DMARC `p=reject` at the Gateway:</strong> Block external servers from spoofing your corporate executive domains.
                </li>
                <li>
                  <strong>Adopt the 30-Second 'Stop, Look, Think' Reflex:</strong> Defeat urgency manipulation by deliberately slowing down.
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
                  Why does Out-of-Band (OOB) voice verification neutralize 100% of Business Email Compromise (BEC) wire transfer attacks?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does artificial urgency trigger amygdala panic, disabling the logical prefrontal cortex and forcing impulsive clicks?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the persuasion calculator above, increase verification friction to Out-of-Band Call (500x) and observe breach risk collapse to 0.8%!
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
                <span>Cialdini's 6 influence principles: Authority, Urgency, Scarcity, Trust, Reciprocity, Social Proof.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Business Email Compromise (BEC) exploits authority bias to bypass wire transfer controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Cognitive Pause ("Stop, Look, Think") interrupts urgency-driven impulsive System 1 clicks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Out-of-Band (OOB) dual authorization requires voice verification for financial transfers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>FIDO2 WebAuthn passkeys make credential phishing mathematically impossible via origin binding.</span>
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
            title="Social Engineering Principles FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Counter-Influence Architecture Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Social Engineering Principles: Authority, Urgency, Scarcity, Trust (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Social engineering is psychological warfare waged on your employees! Master Dr. Robert Cialdini's 6 Core Principles of Influence: Authority (Milgram obedience in Business Email Compromise CEO fraud), Urgency & Fear (amygdala panic disabling the logical prefrontal cortex), Scarcity (FOMO on limited bonuses), Liking & Familiarity (long-term grooming on LinkedIn), Reciprocity (the helpfulness trap), and Social Proof (herd conformity). To engineer bulletproof defenses: enforce Out-of-Band (OOB) Dual-Authorization requiring voice calls on registered mobile numbers for all wire transfers, train employees in the 30-second 'Stop, Look, Think' cognitive pause, deploy FIDO2 WebAuthn passkeys that mathematically refuse to sign fraudulent origins, and configure DMARC `p=reject` at the email gateway. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense carrying up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
