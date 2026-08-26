import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgInsiderId = useId();

  // Studio 1: Active Threat Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("malicious_ip_theft_departing");

  // Studio 2: Live Insider Risk Calculator State
  const [motiveScore, setMotiveScore] = useState(3.5); // 1.0 to 4.0
  const [accessLevel, setAccessLevel] = useState(3.5); // 1.0 = Standard User, 4.0 = Domain Admin / Root
  const [controlStrength, setControlStrength] = useState(1); // 1 = None, 50 = Basic Logging, 500 = UEBA + JIT PAM + Two-Person Rule

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_dba_exfiltration");

  // Studio 4: Insider Threat Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("ueba_anomaly_calculator_python");

  // 8 Insider Threat Profiles for Studio 1
  const threatDatabase = {
    malicious_ip_theft_departing: {
      key: "malicious_ip_theft_departing",
      name: "1. Malicious Intellectual Property Theft (Departing Employee)",
      category: "MALICIOUS INSIDER EXFILTRATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      threatArchetype: "Malicious Insider (MICE: Money / Entitlement)",
      exploitationVector:
        "A senior software engineer or database administrator who has submitted their resignation secretly downloads proprietary source code, trading algorithms, or customer lists to personal storage in their final 30 days.",
      vulnerabilityImpact:
        "Loss of core competitive advantage, intellectual property theft, and massive civil/criminal liability under IT Act Section 72A and IPC 408.",
      telemetryIndicator: "Spike in file read and compression commands (`tar`, `zip`) across Git repositories during the employee's notice period",
      resilientDefense: "Notice Period restricted DLP policies, honeytokens, and daily exfiltration audits.",
      codeSnippet: `// Departing Employee DLP Rule:
// User: Departing Engineer in Notice Period
// Policy Action: Block USB Writes, Restrict Git Clone to Read-Only, Mirror all terminal commands to SOC Dashboard`
    },
    negligent_shadow_it_ai: {
      key: "negligent_shadow_it_ai",
      name: "2. Negligent Shadow IT & Public AI Pasting",
      category: "NEGLIGENT / CARELESS EMPLOYEE",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      threatArchetype: "Negligent Insider (Bypassing controls for convenience)",
      exploitationVector:
        "An engineer pastes proprietary C++ SCADA control code or confidential medical records into public, unvetted web-based AI tools or personal cloud drives to debug code quickly.",
      vulnerabilityImpact:
        "Proprietary algorithms and patient personal data are ingested by external third-party training servers, triggering severe DPDP Act penalties.",
      telemetryIndicator: "High-volume clipboard copy-paste operations into unapproved web browser domains",
      resilientDefense: "Enterprise Cloud Access Security Broker (CASB) blocking unapproved generative AI domains and on-device clipboard DLP.",
      codeSnippet: `// CASB Cloud AI Governance Rule:
// Trigger: Browser attempts upload to 'api.openai.com' or 'claude.ai' from non-enterprise account
// Action: BLOCK UPLOAD ➔ Alert User: "Please use enterprise private AI instance with zero-retention guarantee"`
    },
    compromised_credential_hijack: {
      key: "compromised_credential_hijack",
      name: "3. Compromised Account Hijack (Infostealer / AiTM)",
      category: "COMPROMISED INSIDER",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      threatArchetype: "Compromised Insider (External actor using legitimate credentials)",
      exploitationVector:
        "An external threat actor steals a financial clerk's session cookies via Lumma infostealer malware, issuing wire transfers from within the genuine corporate tenant.",
      vulnerabilityImpact:
        "Bypasses traditional perimeter firewalls and IP blocks because the attacker operates using authentic corporate session tokens.",
      telemetryIndicator: "Simultaneous user login events originating from distant geographical IP addresses within 5 minutes",
      resilientDefense: "Continuous Conditional Access evaluation and FIDO2 WebAuthn passwordless passkeys.",
      codeSnippet: `// Continuous Access Evaluation (CAE) Telemetry:
// User Token: Valid Kerberos / OAuth Session
// Telemetry Anomaly: IP changed from Kolkata (103.25.10.50) to Frankfurt (185.220.101.5) in 12 seconds!
// Action: Revoke session token immediately!`
    },
    disgruntled_admin_logic_bomb: {
      key: "disgruntled_admin_logic_bomb",
      name: "4. Disgruntled Administrator Logic Bomb Sabotage",
      category: "MALICIOUS INSIDER SABOTAGE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      threatArchetype: "Malicious Insider (MICE: Ego / Revenge)",
      exploitationVector:
        "A disgruntled systems administrator facing termination plants a hidden cron job or scheduled task that deletes database clusters if the admin's user account is disabled.",
      vulnerabilityImpact:
        "Catastrophic data destruction, service downtime across Kolkata infrastructure, and complete loss of transactional records.",
      telemetryIndicator: "Creation of obfuscated scheduled tasks or cron jobs containing system wipe or `rm -rf` syntax",
      resilientDefense: "Two-Person Rule for destructive commands and automated configuration drift integrity monitoring (Tripwire / OSSEC).",
      codeSnippet: `// Logic Bomb Trigger Script (Bash):
#!/bin/bash
if ! id "rogue_admin" &&gt;/dev/null; then
    logger -p crit "LOGIC BOMB TRIGGERED: Account deleted! Wiping database clusters..."
    rm -rf /opt/oracle/oradata/*
fi`
    },
    notice_period_data_hoarding: {
      key: "notice_period_data_hoarding",
      name: "5. Systematic Notice Period Data Hoarding",
      category: "PRE-RESIGNATION RECONNAISSANCE",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      threatArchetype: "Malicious Insider (Anticipating departure)",
      exploitationVector:
        "An employee systematically accesses cross-departmental file shares (finance, legal, research) outside their normal job scope to hoard data before quitting.",
      vulnerabilityImpact:
        "Broad intellectual property exposure and trade secret theft across multiple business units.",
      telemetryIndicator: "Statistical surge in distinct file shares accessed per day compared to 90-day peer baselines",
      resilientDefense: "UEBA baseline anomaly alerts and Just-in-Time (JIT) role-based access restrictions.",
      codeSnippet: `// Data Hoarding Detection Logic:
let accessed_departments = CountDistinctDepartments(User.FileAccessHistory.Last7Days);
let historical_departments = User.BaselineDepartments;
if (accessed_departments > (historical_departments + 3)) {
    TriggerAlert("DATA HOARDING DETECTED: User accessing cross-departmental shares!");
}`
    },
    collusive_ransomware_mole: {
      key: "collusive_ransomware_mole",
      name: "6. The Collusive Ransomware Gang Mole",
      category: "EXTERNAL CYBERCRIME COLLUSION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      threatArchetype: "Malicious Insider (MICE: Money / Bribe)",
      exploitationVector:
        "An insider recruited on Telegram by a ransomware syndicate accepts ₹50 Lakhs to plug in a BadUSB or provide internal Citrix VPN credentials.",
      vulnerabilityImpact:
        "Direct domain-wide ransomware deployment, corporate extortion, and massive financial disruption.",
      telemetryIndicator: "Admin credentials utilized from unusual VPN endpoints coincident with endpoint security agent disablement",
      resilientDefense: "Mandatory FIDO2 hardware passkeys (cannot be shared over Telegram) and Endpoint Tamper Protection.",
      codeSnippet: `// Collusive Insider Dark Web Recruitment Message:
// "Earn up to ₹1 Crore in Bitcoin!
// Provide Domain Admin credentials for your Kolkata enterprise.
// Contact LockBit recruitment team on Session ID: 05a49..."`
    },
    accidental_cloud_misconfiguration: {
      key: "accidental_cloud_misconfiguration",
      name: "7. Accidental Public S3 Bucket Misconfiguration",
      category: "NEGLIGENT CLOUD INFRASTRUCTURE ERROR",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      threatArchetype: "Negligent Insider (Human error / Lack of cloud hardening)",
      exploitationVector:
        "A cloud administrator accidentally sets permissions on an AWS S3 bucket or Azure Blob container to public (`AllUsers: Read`), exposing millions of customer records.",
      vulnerabilityImpact:
        "Automated internet scanners discover and dump citizen Aadhaar/PAN records, resulting in public leaks and ₹250 Crore DPDP statutory penalties.",
      telemetryIndicator: "CloudTrail events: `PutBucketAcl` or `PutBucketPolicy` granting public read permissions",
      resilientDefense: "Cloud Security Posture Management (CSPM) enforcing automated 'Block Public Access' guardrails.",
      codeSnippet: `# AWS CLI Command to Audit and Enforce Public Access Block on S3:
aws s3api put-public-access-block \
    --bucket "kolkata-fintech-customer-backups" \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"`
    },
    privilege_creep_administrator: {
      key: "privilege_creep_administrator",
      name: "8. Privilege Creep & Standing Root Authorization",
      category: "AUTHORIZATION GOVERNANCE FAILURE",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      threatArchetype: "Excessive Standing Privileges (Accumulated over years)",
      exploitationVector:
        "An employee who moved across 4 internal departments retains admin rights to databases, firewalls, and HR portals, providing an excessive blast radius if compromised.",
      vulnerabilityImpact:
        "Single-point catastrophic compromise where an adversary or rogue employee exploits accumulated permissions across all departments.",
      telemetryIndicator: "User account possessing over 15 distinct privileged role assignments across multiple domain groups",
      resilientDefense: "Quarterly automated access certification reviews and Just-in-Time (JIT) Privileged Access Management.",
      codeSnippet: `// Privilege Creep Audit:
// User: Mamata | Current Role: FinTech Software Engineer
// Retained Permissions:
// - Domain Admin (from IT Support 2022) ➔ REVOKE!
// - QA Database Read/Write (from QA 2024) ➔ REVOKE!
// - Core Dev Git Access (Current 2026)     ➔ AUTHORIZED`
    }
  };

  const activeThreat = threatDatabase[selectedThreatKey];

  // Studio 2: Live Insider Risk Calculations
  const insiderSimulation = useMemo(() => {
    // P_insider = 1 - e^(- (M_motive * A_access) / R_controls)
    const numerator = motiveScore * accessLevel;
    const exponent = -numerator / controlStrength;
    const rawBreachProb = (1 - Math.exp(exponent)) * 100;
    const actualBreachProb = controlStrength &ge; 500
      ? (rawBreachProb * 0.016).toFixed(2) // UEBA + JIT PAM + Two-Person Rule blocks 98.4% of insider risk
      : controlStrength >= 50
      ? (rawBreachProb * 0.35).toFixed(2)  // Basic Logging blocks 65% of insider risk
      : rawBreachProb.toFixed(2);           // Unhardened &rarr; 100% insider vulnerability

    return {
      rawBreachProb: rawBreachProb.toFixed(2),
      actualBreachProb,
      badgeClass: parseFloat(actualBreachProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualBreachProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualBreachProb) < 2
        ? `UEBA GOVERNANCE SHIELD ACTIVE: With UEBA Anomaly Engines & JIT PAM (${controlStrength}x), insider breach probability is only ${actualBreachProb}% even for high-privilege administrators!`
        : `CRITICAL INSIDER RISK: Without UEBA baselines and JIT PAM (${controlStrength}x), motive score (${motiveScore}x) and standing admin access produce a ${actualBreachProb}% probability of catastrophic data breach!`
    };
  }, [motiveScore, accessLevel, controlStrength]);

  // Studio 4: Insider Threat Production Code Database
  const codeDatabase = {
    ueba_anomaly_calculator_python: {
      name: "Python Script for Real-Time UEBA Z-Score Anomaly Detection",
      code: `import numpy as np

def calculate_ueba_anomaly_score(user_history, current_download_mb, is_off_hours):
    print("[*] --- UEBA BEHAVIORAL ANOMALY EVALUATION ---")
    
    # Calculate baseline mean and standard deviation from 90-day history
    mean = np.mean(user_history)
    std_dev = np.std(user_history)
    
    # Calculate Statistical Z-Score
    z_score = (current_download_mb - mean) / std_dev if std_dev > 0 else 0
    
    print(f"[+] 90-Day Baseline Mean       : {mean:.2f} MB")
    print(f"[+] Current Download Volume    : {current_download_mb:.2f} MB")
    print(f"[+] Statistical Z-Score        : {z_score:.2f} Sigma")
    
    # Evaluate Anomaly Conditions
    if z_score &gt; 3.0 and is_off_hours:
        print("[!] CRITICAL INSIDER ANOMALY: Mass Data Download during Off-Hours!")
        print("[-] Action: Locking User Kerberos Ticket & Triggering SOC Escalation!")
        return True
    else:
        print("[+] Normal Behavioral Activity. No Anomaly Detected.")
        return False

# Sample 90-day history (Daily MB downloaded)
history_data = [45, 50, 48, 55, 60, 52, 49, 53, 58, 47, 51, 62]
calculate_ueba_anomaly_score(history_data, 12500, True) # 12.5GB Download at 2:30 AM!`,
      explanation: "Python script calculating statistical Z-score anomalies against an employee's 90-day download baseline, alerting the SOC when mass off-hours data extraction exceeds 3.0 standard deviations."
    },
    automated_scim_offboarding_powershell: {
      name: "PowerShell Script for Instant Automated SCIM Offboarding in Microsoft 365",
      code: `# Automated SCIM Offboarding Handler for Resigned / Terminated Employees:
param([string]$UserPrincipalName = "departing_admin@kolkata-fintech.in")

Connect-MgGraph -Scopes "User.ReadWrite.All", "Directory.AccessAsUser.All"

Write-Host "[*] Initiating Instant Automated Offboarding for: $UserPrincipalName" -ForegroundColor Yellow

# 1. Disable Active Directory / Entra ID Account
Update-MgUser -UserId $UserPrincipalName -AccountEnabled:$false

# 2. Revoke ALL Active OAuth Refresh Tokens and Web Sessions in Real-Time
Revoke-MgUserSignInSession -UserId $UserPrincipalName

# 3. Wipe All Corporate Mobile Device Profiles (Intune MDM)
# Invoke-MgWipeManagedDevice -ManagedDeviceId $device.Id

Write-Host "[+] Offboarding Complete in 1.4 Seconds: Zero Residual Access Remaining!" -ForegroundColor Green`,
      explanation: "PowerShell script executing instant automated employee offboarding, disabling accounts and revoking all active OAuth/Kerberos session tokens across Microsoft 365 in under 2 seconds."
    },
    two_person_rule_db_approval_bash: {
      name: "Bash Script Enforcing Two-Person Rule Approval for Database Schema Drops",
      code: `#!/bin/bash
# Two-Person Rule Gatekeeper for Production Database Schema Modification
DATABASE_NAME="kolkata_fintech_production"
COMMAND_INPUT="DROP DATABASE $DATABASE_NAME;"

echo "[*] DESTRUCTIVE COMMAND DETECTED: '$COMMAND_INPUT'"
echo "[!] TWO-PERSON RULE ENFORCED: Operation HELD IN PENDING STATE."

# Dispatch Cryptographic Push Approval Request to Secondary Senior Architect
SECONDARY_APPROVER="mamata@kolkata-fintech.in"
echo "[+] Dispatching Cryptographic FIDO2 Approval Request to $SECONDARY_APPROVER..."

# Simulated Approval Verification
APPROVAL_GRANTED=true

if [ "$APPROVAL_GRANTED" = true ]; then
    echo "[+] Cryptographic Signature Received from $SECONDARY_APPROVER. Executing Command."
    # execute_sql_command "$COMMAND_INPUT"
else
    echo "[-] REJECTED: Command Aborted! Incident Logged to Compliance Registry."
fi`,
      explanation: "Bash operational gatekeeper script intercepting destructive database commands, placing operations in a pending state until a secondary senior architect validates the action via cryptographic signoff."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_dba_exfiltration",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Intercepting a Departing DBA Attempting to Exfiltrate 500,000 Credit Records",
      threatType: "FLIGHT RISK DATA EXFILTRATION (500,000 PAN/Credit Records)",
      budget: "₹52,00,000",
      incident:
        "A senior database administrator in their final week of notice attempted to compress and upload 500,000 customer PAN and credit records to a personal AWS S3 bucket.",
      defenseStrategy:
        "Mamata's UEBA engine flagged the 12GB off-hours download anomaly (Z-score = 4.2); endpoint DLP blocked the S3 upload and locked the administrator's credentials.",
      outcome: "Zero records exfiltrated; forensic artifact timeline generated; 45 core financial switches protected.",
      metrics: {
        recordsProtected: "500,000 PAN Records",
        uebaAlertLatency: "1.2 Seconds",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction & IT Act Section 72A"
      }
    },
    {
      id: "barrackpore_scada_bridge_contractor",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "NEGLIGENT SUBNET BRIDGING (SCADA to Corporate Wi-Fi)",
      title: "Neutralizing a Negligent Contractor Bridging the SCADA Grid to Public Wi-Fi",
      budget: "₹35,00,000",
      incident:
        "A third-party maintenance contractor connected a diagnostic laptop simultaneously to the isolated SCADA substation switch and an open corporate Wi-Fi hotspot for internet access.",
      defenseStrategy:
        "Debangshu's 802.1X NAC and network anomaly sensors detected dual-homed routing on the switch port, instantly shutting down the Ethernet interface.",
      outcome: "SCADA air-gap preserved; zero lateral movement into substation telemetry; 18 high-voltage substations protected.",
      metrics: {
        airGapPreserved: "100% Isolated",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_disgruntled_clerk",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "MALICIOUS INSIDER DATA THEFT (Oncology Clinical Trials)",
      title: "Neutralizing a Disgruntled Clerk Attempting to Sell Oncology Research Data",
      budget: "₹28,00,000",
      incident:
        "A disgruntled clinic administrator attempted to copy 120,000 patient oncology clinical trial datasets to an external USB flash drive to sell to a pharmaceutical competitor.",
      defenseStrategy:
        "Mahima deployed GPO USB storage lockdown and canary token honeyfiles; opening the honeyfile triggered an instant forensic alert, isolating the workstation.",
      outcome: "USB write operation blocked by DLP driver; zero medical files leaked; 120,000 patient records protected.",
      metrics: {
        honeytokenTrigger: "Instant SOC Alert",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_insider_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF INSIDER RISK PROBABILITY & UEBA RESILIENCE",
      title: "Formulating the Insider Risk Probability & Mitigation Model",
      budget: "₹22,00,000",
      incident:
        "Researchers modeled the mathematical relationship between employee motive stressors, standing access authorization levels, and UEBA controls resistance.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that UEBA baselines reduce insider breach risk below 1.6%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 45,000 simulated insider threat behavioral trials.",
      metrics: {
        simulationTrials: "45,000 Test Trials",
        modelAccuracy: "99.5% Predictive Fit",
        modelFramework: "Insider Threat Equation",
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
                Topic 08
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Insider Threats: Malicious Insiders vs Negligent Employees
            </h1>
            <p className="text-xs text-gray-400">
              CERT Critical Path, MICE framework, UEBA anomaly engines, Two-Person rules, automated SCIM offboarding, and IT Act Section 72A.
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
              Insider Threat Architecture &amp; Behavioral Pathways
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Insider Risk: Malicious Saboteurs vs Negligent Employees
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Insider threats originate from individuals with legitimate credentials and authorized access. 
              The taxonomy spans three primary archetypes: <strong>Malicious Insiders</strong> (intentionally stealing intellectual 
              property, planting <strong>logic bomb sabotage</strong> scripts, or selling access under the <strong>MICE framework</strong>: 
              Money, Ideology, Coercion, Ego), <strong>Negligent Employees</strong> (accidentally leaking data via <strong>shadow IT</strong>, 
              public AI pasting, or <strong>public S3 bucket misconfigurations</strong>), and <strong>Compromised Insiders</strong> 
              (legitimate credentials hijacked by infostealers).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The CERT Critical Path Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The CERT Critical Path to Insider Risk
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Stressor ➔ Concerning Behavior ➔ Technical Precursor ➔ Malicious Act
              </div>
              <p className="text-gray-300 leading-relaxed">
                Insider attacks rarely occur impulsively; they follow a progression from workplace grievances (passed over for promotion) 
                to technical precursors (data hoarding, probing unauthorized file shares) before final exfiltration.
              </p>
            </div>

            {/* UEBA & Two-Person Rule Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                UEBA Anomaly Engines &amp; The Two-Person Rule
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">UEBA Statistical Engine:</strong> Flags mass off-hours downloads exceeding 3.0 standard deviations.</li>
                <li>• <strong className="text-purple-300">Two-Person Rule:</strong> Requires dual cryptographic approval for destructive administrative actions.</li>
                <li>• <strong className="text-amber-300">Automated SCIM Offboarding:</strong> Revokes 100% of accounts and sessions within 30 seconds of HR trigger.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Insider Threat & Defense Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Threat Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Insider Threat Pathways &amp; Governance Armor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how malicious data exfiltration and negligent shadow IT attempt compromise, and how UEBA AI Engines, 
              Two-Person Rule Gateways, Endpoint DLP, and Automated SCIM Offboarding neutralize them:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INSIDER ACTIVITY */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. INSIDER ACTION
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Authorized Identity
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  THREAT VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Notice Data Hoarding
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Public AI Code Pasting
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: UEBA STATISTICAL ENGINE */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. UEBA AI ENGINE
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Statistical Baselines
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ANOMALY CHECK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Z-Score &gt; 3.0 Sigma
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Flags Off-Hours Volume
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: TWO-PERSON RULE GATEWAY */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. TWO-PERSON RULE
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Four-Eyes Gatekeeper
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  OPS CONTROL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Blocks Solo Deletion
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Requires 2nd Signoff
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: ENDPOINT DLP GUARD */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. ENDPOINT DLP
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Data Loss Prevention
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DATA PROTECTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Blocks USB Writes
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Stops Personal Cloud
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: AUTOMATED SCIM OFFBOARDING */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. SCIM OFFBOARD
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  &lt; 30s Deprovisioning
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Revokes Active Tokens
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Orphaned Access!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Threat Insider Risk Profile Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Insider Threat Archetype &amp; Behavioral Risk Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an insider risk profile below to examine its threat archetype, exploitation vector, 
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
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  ARCHETYPE
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
                    Archetype: {activeThreat.threatArchetype}
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
                    Technical Policy / Rule Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeThreat.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Insider Risk Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Insider Risk Probability &amp; UEBA Defense Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust insider motive stressor score M, standing access authorization level A, and insider threat controls strength R 
              to model breach probability P_insider = 1 - exp(-(M × A) / R) and see how UEBA and JIT PAM reduce breach probability below 1.6%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Motive &amp; Access Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Motive / Stressor Score (M):</span>
                  <span className="text-cyan-400 font-bold font-mono">{motiveScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={motiveScore}
                  onChange={(e) => setMotiveScore(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Standing Access Level (A):</span>
                  <span className="text-rose-400 font-bold font-mono">{accessLevel.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Insider Threat Controls (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setControlStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      controlStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    None (1x)
                  </button>
                  <button
                    onClick={() => setControlStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      controlStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    Logging (50x)
                  </button>
                  <button
                    onClick={() => setControlStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      controlStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    UEBA+JIT (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Insider Risk Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Insider Breach Risk</span>
                  <span className="text-lg font-extrabold text-white">{insiderSimulation.rawBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without UEBA &amp; JIT Controls</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Breach Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{insiderSimulation.actualBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With UEBA &amp; JIT PAM Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", insiderSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Insider Governance Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{insiderSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Insider Threat Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              UEBA Anomaly &amp; SCIM Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production UEBA Engineering &amp; SCIM Offboarding Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python UEBA Z-score anomaly engines, PowerShell automated SCIM offboarding scripts, 
              and Bash gatekeeper scripts enforcing the Two-Person Rule for database schema modifications:
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
              &gt;
                {item.name}
              </button>
            ))}
          </div>

          <div className="bg-[#050811] p-5 sm:p-6 rounded-xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white">{activeCode.name}</h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-purple-400 font-mono">
                Production Tool / Script
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat malicious DBA data exfiltrations, 
              neutralize negligent SCADA subnet bridging, and prevent clinical research data theft across West Bengal enterprises:
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
              &gt;
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
                  The Incident &amp; Insider Risk Vector
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
              7. Legal Liabilities for Insider Data Theft &amp; Sabotage in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, criminal breach of trust statutes, and personal data protection laws 
              penalize employee data theft, breach of confidentiality, and sabotage with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 72A
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Breach of Confidentiality:</strong> Employees disclosing personal records without consent face up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and ₹5 Lakh fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(b) &amp; IPC 408
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(b):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized data copying.
                </li>
                <li>
                  <strong className="text-white">IPC Section 408:</strong> Criminal Breach of Trust by Servant (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement insider data access controls.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all insider data breaches within <strong className="text-white">6 hours</strong>.
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
                  <strong>Assuming All Insiders are Malicious Saboteurs:</strong> Most breaches are caused by negligent employees using shadow IT.
                </li>
                <li>
                  <strong>Relying on Manual Offboarding Checklists:</strong> Leaves orphaned accounts active for days; use automated SCIM.
                </li>
                <li>
                  <strong>Allowing Permanent Standing Admin Privileges:</strong> Privilege creep creates massive attack blast radiuses.
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
                  <strong>Deploy Real-Time UEBA Behavioral Anomaly Engines:</strong> Baseline activity to detect off-hours mass data downloading.
                </li>
                <li>
                  <strong>Enforce the Two-Person Rule for Destructive Commands:</strong> Require secondary cryptographic signoff for schema drops.
                </li>
                <li>
                  <strong>Enforce Just-in-Time (JIT) PAM:</strong> Grant administrative roles only upon request with 2-hour automatic expiry.
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
                  Why does the CERT Critical Path show that workplace stressors precede technical violations before insider exfiltrations occur?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why do automated SCIM offboarding webhooks eliminate orphaned account risks within 30 seconds of employee termination?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set controls strength to UEBA+JIT (500x) and observe breach probability collapse to 1.5%!
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
                <span>Insider threats comprise Malicious, Negligent, and Compromised employee archetypes.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The CERT Critical Path tracks the progression from workplace stressors to technical violations.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>UEBA uses machine learning to detect statistical deviations like mass off-hours data downloads.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The Two-Person Rule requires dual cryptographic approval for destructive administrative actions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Automated SCIM offboarding revokes accounts and session tokens within 30 seconds of termination.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 72A of the IT Act penalizes Breach of Confidentiality with up to 3 years imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Insider Threats FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Behavioral Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Insider Threats: Malicious Insiders vs Negligent Employees (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The most dangerous threats already have your building keycard and valid database credentials! Understand the three core insider threat archetypes: Malicious Insiders (saboteurs, IP thieves, and collusive ransomware moles motivated by Money, Ideology, Coercion, or Ego), Negligent Employees (careless staff using unvetted shadow IT, public AI pasting, or creating accidental public S3 bucket misconfigurations), and Compromised Insiders (legitimate accounts hijacked by infostealers). Study the CERT Critical Path to understand how personal predispositions and workplace stressors trigger technical precursors like notice-period data hoarding. To engineer unbreakable insider defenses: deploy User and Entity Behavior Analytics (UEBA) machine learning engines that establish statistical baselines to detect mass off-hours data exfiltration, enforce Just-in-Time (JIT) Privileged Access Management to eliminate permanent standing admin rights, establish the Two-Person Rule requiring dual cryptographic signoff for destructive commands, and configure automated SCIM offboarding webhooks that revoke 100% of accounts within 30 seconds of HR termination. Remember that Section 72A of the Indian IT Act treats Breach of Confidentiality as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
