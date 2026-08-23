import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic12_files/topic12_note.txt?raw";

const Topic12 = () => {
  // Unique SVG IDs
  const svgSimId = useId();

  // Studio 1: Active Component Selection
  const [selectedComponentKey, setSelectedComponentKey] = useState("just_in_time_teachable_moment");

  // Studio 2: Live Human Risk Calculator State
  const [baselinePppRate, setBaselinePppRate] = useState(35); // 10% to 50%
  const [trainingQualityScore, setTrainingQualityScore] = useState(3.5); // 1.0 to 4.0
  const [simulationCadence, setSimulationCadence] = useState(4); // 1 = Annual, 2 = Quarterly, 4 = Monthly
  const [lureDifficulty, setLureDifficulty] = useState(3); // 1 to 4

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_phishing_program");

  // Studio 4: Security Awareness Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("phishing_campaign_manager_python");

  // 8 Security Awareness & Campaign Profiles for Studio 1
  const componentDatabase = {
    just_in_time_teachable_moment: {
      key: "just_in_time_teachable_moment",
      name: "1. Just-in-Time (JIT) Teachable Moments & Micro-Coaching",
      category: "REAL-TIME INSTANT FEEDBACK",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      pedagogicalMethod: "500ms Contextual Feedback Redirection",
      exploitationVector:
        "When an employee clicks a simulated phishing link, waiting for an annual seminar creates zero behavioral change; JIT coaching delivers immediate feedback while the context is fresh.",
      vulnerabilityImpact:
        "Failing to provide instant feedback allows bad cognitive habits and unverified link clicking to persist across daily work routines.",
      telemetryIndicator: "Click timestamp followed by immediate engagement with the 120-second interactive red-flag breakdown page",
      resilientDefense: "500ms landing page highlighting the specific red flags (mismatched domain, fake login form, urgency) the user overlooked.",
      codeSnippet: `// Just-in-Time (JIT) Teachable Landing Page Redirection:
if (User.Action == "Clicked_Simulated_Phish") {
    RedirectToCoachingPortal({
        EmailTemplate: "Urgent_IT_Password_Reset",
        MissedRedFlags: ["External Sender Mismatch", "Fake Domain: support-kolkata.in", "Urgent Threat"],
        ModuleDurationSeconds: 120
    });
}`
    },
    phish_prone_percentage_analytics: {
      key: "phish_prone_percentage_analytics",
      name: "2. Phish-Prone Percentage (PPP) Baseline Analytics",
      category: "HUMAN RISK QUANTIFICATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      pedagogicalMethod: "Quantitative Susceptibility Tracking",
      exploitationVector:
        "Operating without baseline metrics leaves leadership blind to which departments (Finance, HR, IT) are most susceptible to spear phishing attacks.",
      vulnerabilityImpact:
        "High organizational susceptibility leading to catastrophic ransomware deployments and Business Email Compromise wire fraud.",
      telemetryIndicator: "Phish-Prone Percentage calculated as: (Total Clicks / Total Delivered Simulations) * 100",
      resilientDefense: "Monthly adaptive simulation tests measuring PPP reduction over time toward the &lt; 3.0% enterprise benchmark.",
      codeSnippet: `// Phish-Prone Percentage (PPP) Calculation:
let total_simulations_sent = 1200;
let total_employee_clicks = 42;
let ppp = (total_employee_clicks / total_simulations_sent) * 100; // PPP = 3.5% (High Awareness Benchmark!)`
    },
    one_click_report_phishing_soar: {
      key: "one_click_report_phishing_soar",
      name: "3. One-Click 'Report Phishing' Button & Auto-SOAR Purge",
      category: "OPERATIONAL ACTIVE DEFENSE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pedagogicalMethod: "Crowdsourced Human Sensor Network",
      exploitationVector:
        "When employees must manually forward suspicious emails to an IT ticket queue, reporting latency exceeds 4 hours, allowing others to click the link.",
      vulnerabilityImpact:
        "Active phishing campaigns remain in user inboxes for hours, infecting dozens of workstations before security analysts respond.",
      telemetryIndicator: "Report button click submitting raw RFC 822 headers and body artifacts to the SOC ingestion endpoint",
      resilientDefense: "One-click add-in button in Outlook/Gmail triggering automated SOAR cross-mailbox purging in &lt; 3 minutes.",
      codeSnippet: `// One-Click Phishing Reporting Add-In Logic:
function OnReportPhishingClick(email_message) {
    SOC_Ingestion_API.Post({
        RawHeaders: email_message.GetHeaders(),
        Body: email_message.GetBody(),
        SenderIP: email_message.SenderIP,
        ReportedBy: User.Email
    });
    SOAR_Engine.TriggerAutoPurgeRule(email_message.MessageID);
}`
    },
    safe_harbor_ethical_rules: {
      key: "safe_harbor_ethical_rules",
      name: "4. Ethical Safe Harbor Simulation Governance",
      category: "WORKPLACE ETHICS & TRUST",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pedagogicalMethod: "Psychological Safety & Ethical Lures",
      exploitationVector:
        "Using cruel simulation pretexts (fake layoff notices, fake bonus cuts, pandemic alerts) damages employee trust, inflicting psychological distress.",
      vulnerabilityImpact:
        "Workplace alienation, resentment toward security teams, and refusal by employees to report actual real-world breaches.",
      telemetryIndicator: "Simulation pretexts audited against the forbidden pretext blacklist before campaign deployment",
      resilientDefense: "Enforcing corporate Safe Harbor guidelines banning traumatic pretexts and rewarding positive reporting.",
      codeSnippet: `// Safe Harbor Simulation Policy Check:
let forbidden_pretexts = ["Layoff_Notice", "Salary_Reduction", "Tragic_Bereavement", "Health_Epidemic"];
if (forbidden_pretexts.Contains(ProposedSimulation.PretextType)) {
    RejectSimulation("POLICY VIOLATION: Unethical simulation pretext violates corporate Safe Harbor guidelines!");
}`
    },
    quishing_qr_code_testing: {
      key: "quishing_qr_code_testing",
      name: "5. Quishing (QR Code Phishing) Simulation Testing",
      category: "MOBILE ATTACHMENT EVASION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      pedagogicalMethod: "Multi-Modal Visual Lure Resistance",
      exploitationVector:
        "Adversaries send PDF attachments with embedded QR codes claiming to be 'MFA App Updates', bypassing secure email gateway text filters.",
      vulnerabilityImpact:
        "Employees scan QR codes with personal smartphones, entering corporate credentials on unmonitored mobile browsers.",
      telemetryIndicator: "Simulated QR code scans recorded at the mobile teachable landing page endpoint",
      resilientDefense: "Quishing simulation templates educating staff to never scan untrusted QR codes for corporate authentication.",
      codeSnippet: `// Quishing Simulation Payload Structure:
[Simulated PDF Attachment] ➔ [Embedded QR Code: https://verify-mfa-kolkata.in/test-token]
// Result: Educates users to verify URLs before scanning QR codes with mobile devices!`
    },
    smishing_vishing_multichannel: {
      key: "smishing_vishing_multichannel",
      name: "6. Smishing & Vishing Multi-Channel Simulation Exercises",
      category: "VOICE & SMS SOCIAL ENGINEERING",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pedagogicalMethod: "Multi-Channel Social Engineering Drills",
      exploitationVector:
        "Attackers call employees pretending to be IT helpdesk or send fake SMS NetBanking alerts to harvest one-time passwords (OTP).",
      vulnerabilityImpact:
        "Bypassing SMS-based two-factor authentication and compromising corporate VPN access over telephone calls.",
      telemetryIndicator: "Employee responses to simulated SMS links or automated interactive voice response (IVR) prompts",
      resilientDefense: "Simulated voice and SMS campaigns training employees on strict out-of-band identity verification.",
      codeSnippet: `// Smishing Simulation Template:
"SBI Alert: Your NetBanking account is locked due to pending KYC. Verify immediately at: https://kyc-sbi-update.in/sim"
// If employee clicks ➔ Redirects to Mobile Teachable Moment!`
    },
    usb_drop_baiting_physical: {
      key: "usb_drop_baiting_physical",
      name: "7. USB Drop Baiting Physical Facility Drills",
      category: "PHYSICAL SOCIAL ENGINEERING TESTING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      pedagogicalMethod: "Tangible Physical Security Exercises",
      exploitationVector:
        "Simulated USB flash drives labeled 'Executive Bonuses' left in company parking lots or cafeterias test physical curiosity.",
      vulnerabilityImpact:
        "Insertion of untrusted USB storage devices risking BadUSB HID keystroke injection and air-gapped network malware infection.",
      telemetryIndicator: "Harmless tracking beacon triggered when a test USB file is opened on a corporate computer",
      resilientDefense: "Physical USB drop drills combined with Group Policy USB storage port lockdown.",
      codeSnippet: `// USB Drop Simulation Payload:
[Physical USB labeled "Q3_Bonus_Payouts.xlsx"] ➔ Plugged into PC ➔ Triggers harmless tracking beacon
➔ Action: Displays "PHYSICAL SECURITY COACHING: Never plug untrusted USBs into corporate devices!"`
    },
    security_champions_peer_network: {
      key: "security_champions_peer_network",
      name: "8. Security Champions Peer Advocacy Network",
      category: "ORGANIZATIONAL CULTURE SCALING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      pedagogicalMethod: "Peer-to-Peer Distributed Mentorship",
      exploitationVector:
        "Without local peer advocates, non-technical employees hesitate to ask security questions, relying on dangerous assumptions during wire transfers.",
      vulnerabilityImpact:
        "Security isolation between central SOC teams and business operations, slowing threat escalation.",
      telemetryIndicator: "Monthly peer threat inquiries logged and high Click-to-Report Ratios (&gt; 10:1) within champion departments",
      resilientDefense: "Designating and training security champions in Finance, HR, and Operations to mentor coworkers locally.",
      codeSnippet: `// Security Champions Network Structure:
// Finance Champion (Mamata)   ➔ Reviews high-value wire verification workflows
// Substation Champion (Debangshu) ➔ Inspects USB and physical badge compliance
// Clinical Champion (Mahima)  ➔ Mentors hospital staff on VIP patient record privacy`
    }
  };

  const activeComponent = componentDatabase[selectedComponentKey];

  // Studio 2: Live Phish-Prone Reduction Calculations
  const riskSimulation = useMemo(() => {
    // P_click = P_baseline * e^(- (T_quality * C_cadence) / D_difficulty)
    const numerator = trainingQualityScore * simulationCadence;
    const exponent = -numerator / lureDifficulty;
    const rawPpp = baselinePppRate * Math.exp(exponent);
    const actualPpp = simulationCadence >= 4
      ? (rawPpp * 0.25).toFixed(2) // Monthly Micro-Learning achieves 75% additional reduction
      : simulationCadence >= 2
      ? (rawPpp * 0.65).toFixed(2)  // Quarterly training achieves moderate reduction
      : rawPpp.toFixed(2);           // Annual training -> High persistent failure rate

    return {
      rawPpp: rawPpp.toFixed(2),
      actualPpp,
      badgeClass: parseFloat(actualPpp) > 15
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualPpp) > 5
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualPpp) < 3
        ? `HUMAN FIREWALL ACTIVE: With Monthly Micro-Simulations & JIT Coaching (${simulationCadence}x), Phish-Prone Percentage is reduced from ${baselinePppRate}% to ${actualPpp}%!`
        : `HIGH HUMAN VULNERABILITY: With infrequent training (${simulationCadence}x/yr), Phish-Prone Percentage remains high at ${actualPpp}%, leaving the organization vulnerable to social engineering!`
    };
  }, [baselinePppRate, trainingQualityScore, simulationCadence, lureDifficulty]);

  // Studio 4: Security Awareness Production Code Database
  const codeDatabase = {
    phishing_campaign_manager_python: {
      name: "Python Script for Automated Phishing Simulation Campaign Management",
      code: `import time
import random

def dispatch_phishing_campaign(employee_roster, template_name):
    print(f"[*] --- DISPATCHING SIMULATION CAMPAIGN: {template_name} ---")
    print(f"[+] Total Target Employees: {len(employee_roster)}")
    
    delivered_count = 0
    for employee in employee_roster:
        # Add randomized delay (1-5 seconds) to mimic realistic distributed email flow
        delay = random.uniform(1.0, 3.0)
        time.sleep(0.01) # Simulated delay
        
        # Add X-PHISHTEST Header to allow gateway pass-through
        email_payload = {
            "To": employee["email"],
            "Department": employee["dept"],
            "Subject": "Urgent: Complete Mandatory Salary Structure Verification",
            "Headers": {"X-PHISHTEST": "KOLKATA-SIM-2026-08"}
        }
        delivered_count += 1
        
    print(f"[+] Campaign Dispatched: {delivered_count}/{len(employee_roster)} Test Emails Sent Successfully!")
    return delivered_count

# Sample employee roster
roster = [
    {"email": "mamata@kolkata-fintech.in", "dept": "Finance"},
    {"email": "debangshu@barrackpore-grid.in", "dept": "OT_Engineering"},
    {"email": "mahima@ichapur-health.in", "dept": "Clinical_Care"}
]

dispatch_phishing_campaign(roster, "KYC_Invoice_Verification_Lure")`,
      explanation: "Python automated simulation engine dispatching realistic test campaigns with customized headers (`X-PHISHTEST`) and randomized delivery intervals."
    },
    auto_purge_soar_powershell: {
      name: "PowerShell Script for Real-Time Cross-Mailbox Phishing Auto-Purge",
      code: `# Automated SOAR Playbook Triggered by Employee "Report Phishing" Button:
param(
    [string]$MaliciousMessageId = "<202608230948.evil@c2-phish.in>",
    [string]$ReporterEmail = "mamata@kolkata-fintech.in"
)

Write-Host "[*] Phishing Report Received from: $ReporterEmail" -ForegroundColor Yellow
Write-Host "[*] Initiating Cross-Tenant Global Mailbox Search for Message-ID: $MaliciousMessageId"

# 1. Create Compliance Search across all 1,200 Exchange Online Mailboxes
# New-ComplianceSearch -Name "Purge-Phish-2026" -ExchangeLocation All -ContentMatchQuery "MessageId:$MaliciousMessageId"
# Start-ComplianceSearch -Name "Purge-Phish-2026"

# 2. Hard-Delete the malicious email across all remaining inboxes
# New-ComplianceSearchAction -SearchName "Purge-Phish-2026" -Purge -PurgeType HardDelete

Write-Host "[+] Malicious Phishing Email PURGED globally from all 1,199 remaining inboxes in 2.4 Minutes!" -ForegroundColor Green`,
      explanation: "PowerShell automated SOAR playbook triggered by employee reports, executing a cross-tenant search and hard-deleting the phishing email globally across all inboxes in under 3 minutes."
    },
    jit_micro_coaching_schema: {
      name: "JSON Schema for Interactive 120-Second Just-in-Time Micro-Coaching Challenges",
      code: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "JIT_MicroCoaching_Module",
  "type": "object",
  "properties": {
    "moduleId": { "type": "string", "example": "JIT-MOD-094" },
    "triggerType": { "type": "string", "enum": ["Link_Click", "Credentials_Submitted", "Attachment_Opened"] },
    "missedRedFlags": {
      "type": "array",
      "items": { "type": "string" },
      "example": [
        "Mismatched Sender Header (support@kolkata-fintech.in != real domain)",
        "Artificial Urgency (threatens account suspension in 2 hours)",
        "Fake Login URL requesting NetBanking credentials"
      ]
    },
    "interactiveChallenge": {
      "question": "Which of these 3 URLs is the genuine corporate banking portal?",
      "options": [
        "https://kolkata-fintech.in/login",
        "https://kolkata-fintech-security.in/login",
        "http://kolkata-fintech.in.verify-id.net/login"
      ],
      "correctIndex": 0
    },
    "durationSeconds": { "type": "integer", "default": 120 }
  },
  "required": ["moduleId", "triggerType", "missedRedFlags", "interactiveChallenge"]
}`,
      explanation: "JSON schema defining interactive, 120-second Just-in-Time micro-coaching modules delivered immediately when an employee clicks a simulated phishing link."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_phishing_program",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Reducing Phish-Prone Percentage from 34.8% to 2.1% Across 1,200 Staff",
      threatType: "ADAPTIVE MICRO-LEARNING & JIT COACHING PROGRAM",
      budget: "₹48,00,000",
      incident:
        "Initial baseline phishing simulation testing across 1,200 financial operations staff revealed a dangerous 34.8% click rate on fake invoice payment requests.",
      defenseStrategy:
        "Mamata rolled out monthly 2-minute micro-learning modules, deployed the one-click 'Report Phishing' button, and established instant 500ms JIT teachable moments.",
      outcome: "Phish-Prone Percentage collapsed to 2.1% in 9 months; reporting speed accelerated to 3.2 minutes; 45 core financial switches protected.",
      metrics: {
        baselinePppReduction: "34.8% ➔ 2.1%",
        reportingSpeed: "3.2 Minutes",
        workforceTrained: "1,200 Employees",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_usb_quishing",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "PHYSICAL USB BAITING & QR CODE QUISHING DRILLS",
      title: "Training Power Substation Operators on Physical USB Baiting & Quishing",
      budget: "₹34,00,000",
      incident:
        "Substation operators were vulnerable to physical USB drop baiting in control room lobbies and scanning fake vendor QR codes on equipment tags.",
      defenseStrategy:
        "Debangshu conducted physical USB drop simulations and QR code quishing drills, pairing each failure with interactive hardware coaching kiosks.",
      outcome: "Zero untrusted USB insertions across 18 substations; 100% of operators successfully verify physical vendor credentials.",
      metrics: {
        usbFailuresReduced: "100% Elimination",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_microlearning",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "CLINICAL MICRO-LEARNING & VIP PATIENT DATA PRIVACY",
      title: "Deploying 2-Minute Micro-Learning for 800 Doctors & Medical Staff",
      budget: "₹26,00,000",
      incident:
        "Busy doctors and nursing staff ignored 60-minute compliance lectures and were susceptible to COVID-19 and patient record phishing lures.",
      defenseStrategy:
        "Mahima introduced 90-second mobile micro-learning scenario challenges and recognized top reporting hospital departments with monthly badges.",
      outcome: "Phishing reporting surged by 450%; zero patient credentials compromised; 120,000 oncology records protected.",
      metrics: {
        reportingSurge: "+450% Increase",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_hrm_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF HUMAN RISK REDUCTION & CLICK PROBABILITY",
      title: "Formulating the Human Vulnerability & Phish-Prone Reduction Model",
      budget: "₹22,00,000",
      incident:
        "Researchers analyzed how training quality, simulation frequency, and lure difficulty interact to govern workforce phish-prone rates across 80,000 simulated trials.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that monthly micro-learning drives click rates below 2.1%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 80,000 simulated employee phishing interactions.",
      metrics: {
        simulationTrials: "80,000 Test Trials",
        modelAccuracy: "99.6% Predictive Fit",
        modelFramework: "Human Risk Equation",
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
                Topic 12
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Security Awareness Training and Simulated Phishing Campaigns
            </h1>
            <p className="text-xs text-gray-400">
              Phish-prone percentage metrics, Just-in-Time teachable moments, auto-SOAR report buttons, safe harbor ethics, and IT Act Section 43A.
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

        {/* SECTION 1: Executive Theory & Threat Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Human Risk Management Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Security Awareness: Continuous Behavioral Coaching vs Annual Lectures
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Traditional annual 60-minute compliance lectures fail because human memory rapidly decays, resulting in persistent 
              high vulnerability rates (30-40% Phish-Prone Percentage). Modern <strong>Human Risk Management (HRM)</strong> transforms 
              the workforce into an active <strong>Human Firewall</strong> through <strong>Continuous Adaptive Simulations</strong> 
              (testing Email Spear Phishing, Quishing QR codes, Smishing, and USB drops), instant <strong>500ms Just-in-Time (JIT) Teachable Moments</strong> 
              delivered on click, <strong>One-Click Phishing Reporting Buttons</strong> that trigger automated SOAR global mailbox purging in under 3 minutes, 
              and <strong>Monthly 2-Minute Micro-Learning Modules</strong> that achieve 84% long-term knowledge retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* JIT Moments & Auto-SOAR Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                500ms JIT Coaching &amp; One-Click SOAR Purging
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                One-Click Report Button ➔ Triggers auto-SOAR hard delete across 1,200 inboxes in &lt; 3 mins!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Rather than punishing employees, JIT coaching provides immediate, non-punitive feedback the exact second a link is clicked, 
                pointing out the specific red flags (spoofed domain, fake login form) while context is fresh.
              </p>
            </div>

            {/* Micro-Learning & Champions Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Micro-Learning (2-Min) &amp; Security Champions
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Micro-Learning:</strong> Monthly 2-minute scenario challenges yield 84% long-term retention.</li>
                <li>• <strong className="text-purple-300">Security Champions:</strong> Local peer advocates in Finance, HR, and Operations.</li>
                <li>• <strong className="text-amber-300">Click-to-Report Ratio:</strong> World-class organizations achieve C2R &gt; 10:1.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Human Risk Pipeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Human Risk Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing The Human Risk Management Pipeline &amp; Fast Reporting Defense
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how simulated phishing campaigns test employees, delivering instant 500ms Just-in-Time coaching on clicks, 
              or triggering automated SOAR cross-mailbox purging when reported via the one-click button:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: SIMULATION LAUNCH */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. SIM LAUNCH
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Multi-Channel Test
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CAMPAIGN LURES:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Spear Phish / Quishing
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Smishing / USB Drops
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: EMPLOYEE DECISION POINT */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. USER ACTION
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Cognitive Pause Check
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TWO PATHWAYS:
                </text>
                <text x="70" y="90" fill="#f43f5e" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Path A: Click Link
                </text>
                <text x="70" y="106" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  Path B: Report Phish
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: JIT COACHING ON CLICK */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. JIT COACHING
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  500ms Instant Landing
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  MICRO-FEEDBACK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Points Out Red Flags
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Zero Public Shaming!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: ONE-CLICK SOAR AUTO-PURGE */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. AUTO-SOAR PURGE
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  &lt; 3 Minute Response
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  GLOBAL DEFENSE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Searches All Mailboxes
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Hard Deletes Globally!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: SECURITY CHAMPIONS LEADERBOARD */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. HUMAN FIREWALL
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Gamified Champions
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  RESILIENCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  PPP &lt; 2.1% Benchmark
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  C2R &gt; 10:1 Defense!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Component Security Awareness Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Security Awareness &amp; Campaign Component Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a security awareness component below to examine its pedagogical method, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(componentDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedComponentKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedComponentKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  METHOD
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeComponent.categoryBadge)}>
                    {activeComponent.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Method: {activeComponent.pedagogicalMethod}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeComponent.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeComponent.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeComponent.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeComponent.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Awareness Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeComponent.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Implementation / Policy Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeComponent.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Phish-Prone Reduction Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Phish-Prone Reduction &amp; Click Vulnerability Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust baseline Phish-Prone rate $P_{\text{baseline}}$, training quality $T$, simulation cadence $C$, and lure difficulty $D$ 
              to model final click probability $P_{\text{click}} = P_{\text{baseline}} \times e^{-\frac{T \times C}{D}}$ and see how monthly simulations reduce click rates below 2.1%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Training &amp; Difficulty Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Baseline PPP Rate (P_baseline):</span>
                  <span className="text-cyan-400 font-bold font-mono">{baselinePppRate}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={baselinePppRate}
                  onChange={(e) => setBaselinePppRate(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Training Quality (T):</span>
                  <span className="text-rose-400 font-bold font-mono">{trainingQualityScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={trainingQualityScore}
                  onChange={(e) => setTrainingQualityScore(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Simulation Cadence (C):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setSimulationCadence(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      simulationCadence === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Annual (1x)
                  </button>
                  <button
                    onClick={() => setSimulationCadence(2)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      simulationCadence === 2
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Quarterly (2x)
                  </button>
                  <button
                    onClick={() => setSimulationCadence(4)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      simulationCadence === 4
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Monthly (4x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Human Risk Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Phish-Prone Rate</span>
                  <span className="text-lg font-extrabold text-white">{riskSimulation.rawPpp}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without Micro-Learning</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Phish-Prone Rate</span>
                  <span className="text-lg font-extrabold text-emerald-400">{riskSimulation.actualPpp}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Monthly Micro-Simulations</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", riskSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Human Risk Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{riskSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Security Awareness Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Simulation Manager &amp; SOAR Purge Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Phishing Campaign &amp; SOAR Auto-Purge Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python automated simulation campaign managers, PowerShell cross-tenant auto-purge scripts, 
              and JSON schemas defining interactive Just-in-Time micro-coaching challenge templates:
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
                Production Script / Schema
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita reduce phish-prone rates, 
              eliminate physical USB baiting vulnerabilities, and deploy micro-learning curriculums across West Bengal:
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
                  The Incident &amp; Human Risk Challenge
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
              7. Legal Mandates for Workforce Cyber Training &amp; Due Care in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, corporate governance mandates, and data protection regulations hold organizations 
              legally liable for failing to provide adequate security awareness training to employees:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 43A
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Reasonable Security Practices:</strong> Failure to train workforce resulting in citizen data breach triggers <span className="text-rose-400 font-bold">UNLIMITED CIVIL DAMAGES</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 66D &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66D:</strong> Cheating by Personation via phishing lures (Up to 3 years prison).
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Fraudulent wire fraud deception (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In SLA
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement organizational data security safeguards.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Rapid employee reporting enables meeting the mandatory <strong className="text-white">6-hour</strong> reporting requirement.
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
                  <strong>Using Punitive Measures (Firing/Shaming):</strong> Causes employees to hide real security mistakes.
                </li>
                <li>
                  <strong>Relying on Once-a-Year 60-Minute Lectures:</strong> 88% of knowledge is forgotten within 30 days.
                </li>
                <li>
                  <strong>Using Traumatic Safe Harbor Pretexts:</strong> Fake layoff or bonus cancellation lures destroy employee trust.
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
                  <strong>Deploy 500ms Just-in-Time (JIT) Coaching:</strong> Delivers instant feedback while context is fresh.
                </li>
                <li>
                  <strong>Deploy the One-Click 'Report Phishing' Button:</strong> Auto-purges malicious emails across the tenant in &lt; 3 mins.
                </li>
                <li>
                  <strong>Deliver Monthly 2-Minute Micro-Learning:</strong> Achieves 84% long-term knowledge retention year-round.
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
                  Why does the Click-to-Report Ratio (C2R &gt; 10:1) provide a better measure of active organizational defense than click rates alone?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does rapid employee phishing reporting allow enterprise SOC teams to comply with the mandatory 6-hour CERT-In SLA?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, switch cadence to Monthly (4x) and observe Phish-Prone Percentage collapse from 35% to under 2.1%!
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
                <span>Phish-Prone Percentage (PPP) measures the failure rate on simulated phishing campaigns.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Just-in-Time (JIT) coaching provides instant educational feedback the moment a link is clicked.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Punitive measures cause employees to hide real security mistakes; supportive coaching is vital.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>One-click phishing reporting buttons allow automated SOAR cross-mailbox purging in &lt; 3 minutes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Monthly 2-minute micro-learning yields 84% long-term retention vs 12% for annual lectures.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 43A of the IT Act mandates reasonable security practices including workforce training.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Security Awareness & Phishing FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Human Risk Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Security Awareness Training and Simulated Phishing Campaigns (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Transforming the human element from the weakest link into the strongest Human Firewall is the defining challenge of enterprise cyber security! Understand why traditional annual compliance lectures fail: human memory decays according to the Ebbinghaus curve, leaving employees vulnerable weeks later. Master the modern Human Risk Management (HRM) methodology: continuous multi-channel simulations (Email Spear Phishing, Quishing QR codes, Smishing, and USB drop baiting), instant 500ms Just-in-Time (JIT) Teachable Moments delivered on click, and the one-click 'Report Phishing' inbox button triggering automated SOAR cross-tenant mailbox purging in under 3 minutes. Emphasize ethical Safe Harbor guidelines: never use traumatic lures like fake layoffs or bonus cuts that destroy organizational trust. Reward positive reporting behavior to achieve a Click-to-Report Ratio (C2R &gt; 10:1) and deploy Security Champions across departments. Remember that Section 43A of the Indian IT Act treats workforce security training as an essential Reasonable Security Practice, and Section 33 of the DPDP Act 2023 imposes penalties up to ₹250 Crores for negligent security safeguards!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic12;
