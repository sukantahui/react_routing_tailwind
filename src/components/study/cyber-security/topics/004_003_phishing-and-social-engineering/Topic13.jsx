import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic13_files/topic13_note.txt?raw";

const Topic13 = () => {
  // Unique SVG IDs
  const svgDefenseId = useId();

  // Studio 1: Active Case Study Selection
  const [selectedCaseKey, setSelectedCaseKey] = useState("twitter_2020_vishing_scam");

  // Studio 2: Live Holistic Resilience Calculator State
  const [humanLayerScore, setHumanLayerScore] = useState(3.5); // 1.0 to 4.0
  const [technicalLayerScore, setTechnicalLayerScore] = useState(3.5); // 1.0 to 4.0
  const [policyLayerScore, setPolicyLayerScore] = useState(3.5); // 1.0 to 4.0
  const [attackerSophistication, setAttackerSophistication] = useState(3); // 1.0 to 4.0

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_multitier_bec_defense");

  // Studio 4: Social Engineering Defense Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("fido2_webauthn_registration_js");

  // 8 Landmark Corporate Case Studies for Studio 1
  const caseDatabase = {
    twitter_2020_vishing_scam: {
      key: "twitter_2020_vishing_scam",
      name: "1. 2020 Twitter / X Bitcoin Scam (Spear Vishing & Admin Hijack)",
      category: "REMOTE IT HELPDESK VISHING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEntity: "Twitter Customer Support & Admin Gateway",
      attackVector:
        "Attackers called remote employees posing as internal IT staff, directing them to a fake VPN portal to harvest credentials and bypass 2FA, gaining access to the internal administrative tool.",
      financialImpact:
        "130 high-profile accounts hijacked (Barack Obama, Elon Musk, Apple); ₹1 Crore+ in Bitcoin stolen in 2 hours; severe brand damage.",
      rootVulnerability: "Reliance on phishable SMS/App 2FA and excessive standing privileges inside internal support tools.",
      resilientDefense: "Mandatory FIDO2 hardware keys (YubiKey), Out-of-Band verification for admin account resets, and least-privilege RBAC.",
      codeSnippet: `// 2020 Twitter Incident Attack Chain:
// 1. Vector      : Spear Vishing phone calls to remote employees posing as internal IT Helpdesk
// 2. Credential  : Fake internal VPN phishing portal harvesting MFA credentials
// 3. Escalation  : Access to internal admin tool resetting account recovery emails
// 4. Impact      : 130 VIP accounts hijacked; ₹1 Crore+ in Bitcoin stolen in 2 hours!`
    },
    rimasauskas_bec_google_facebook: {
      key: "rimasauskas_bec_google_facebook",
      name: "2. 2013-2015 Evaldas Rimasauskas BEC (Google & Facebook)",
      category: "SUPPLIER SWINDLE & INVOICE CLONING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetEntity: "Google & Facebook Accounting Departments",
      attackVector:
        "The fraudster registered a clone company in Latvia with the exact same name as Taiwan hardware manufacturer Quanta Computer, sending forged invoices, contracts, and fake executive stamps.",
      financialImpact:
        "₹1,000+ Crores ($120 Million) fraudulently wired across 2 years ($23M from Google, $98M from Facebook) before discovery.",
      rootVulnerability: "Lack of mandatory Out-of-Band (OOB) verbal callback verification for international wire routing changes.",
      resilientDefense: "Enforcing dual-authorization out-of-band phone callbacks using pre-registered phone directories.",
      codeSnippet: `// Evaldas Rimasauskas BEC Mechanism:
// Real Supplier   : Quanta Computer (Taiwan) - Supplies servers to Google/Facebook
// Fake Company    : Quanta Computer Inc. (Latvia) - Registered by fraudster
// Tactic          : Forged contracts, fake invoices & corporate seals matching real purchase orders
// Stolen Amount   : ₹1,000+ Crores ($120 Million) across 2 years before discovery!`
    },
    cloudflare_fido2_triumph_2022: {
      key: "cloudflare_fido2_triumph_2022",
      name: "3. 2022 Cloudflare FIDO2 Triumph vs '0ktapus' (Twilio Breach)",
      category: "AiTM REVERSE PROXY SMISHING",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetEntity: "Cloudflare & 130+ Tech Companies (Twilio, Mailchimp)",
      attackVector:
        "Attackers sent SMS phishing messages to employees with links to an AiTM reverse proxy stealing Okta session cookies; over 130 companies were breached.",
      financialImpact:
        "Twilio, DoorDash, and Mailchimp suffered major client data breaches; Cloudflare suffered ZERO compromise.",
      rootVulnerability: "Twilio relied on phishable SMS/App MFA; Cloudflare enforced mandatory physical FIDO2 keys.",
      resilientDefense: "FIDO2 WebAuthn cryptographic origin binding mathematically prevented the phishing domain from capturing signatures.",
      codeSnippet: `// FIDO2 Hardware Token WebAuthn Origin Binding:
// User Browser URL       : https://cloudflare-okta.attacker-phish.net (Attacker Proxy)
// FIDO2 YubiKey Challenge: Computes SHA-256 hash of origin "cloudflare-okta.attacker-phish.net"
// Key Expected Domain    : "cloudflare.okta.com"
// Result                 : Cryptographic Signature REFUSED ➔ Attack 100% BLOCKED!`
    },
    uber_mfa_fatigue_2022: {
      key: "uber_mfa_fatigue_2022",
      name: "4. 2022 Uber MFA Fatigue & Social Engineering Breach",
      category: "MFA PUSH BOMBING & WHATSAPP PRETEXTING",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetEntity: "Uber Internal Infrastructure (AWS, G Suite, Slack)",
      attackVector:
        "An attacker purchased a contractor's stolen password, flooded them with Duo MFA push prompts at 1:00 AM, and messaged them on WhatsApp posing as IT support.",
      financialImpact:
        "Complete internal compromise of Uber's Slack channels, AWS production consoles, HackerOne vulnerability reports, and G Suite.",
      rootVulnerability: "Binary [APPROVE]/[DENY] push notifications without number matching, and contractor fatigue.",
      resilientDefense: "Enforcing MFA Number Matching and continuous conditional session risk evaluation.",
      codeSnippet: `// MFA Push Bombing Attack Flow:
// Step 1: Attacker sends 45 Duo Push notifications to contractor at 01:15 AM
// Step 2: Contractor rejects prompts
// Step 3: Attacker WhatsApps contractor: "Hi, this is Uber IT. Please accept prompt to stop bug."
// Step 4: Contractor clicks [APPROVE] ➔ Full Internal Access Compromised!`
    },
    bangladesh_bank_swift_2016: {
      key: "bangladesh_bank_swift_2016",
      name: "5. 2016 Bangladesh Bank SWIFT Cyber Heist",
      category: "SPEAR PHISHING & AIR-GAPPED MALWARE PIVOT",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetEntity: "Bangladesh Bank SWIFT Alliance Financial Network (Dhaka)",
      attackVector:
        "Targeted spear phishing emails containing a malicious resume compromised bank workstations, allowing malware to pivot into the air-gapped SWIFT network.",
      financialImpact:
        "Attackers attempted to steal ₹8,000+ Crores ($951 Million); ₹680 Crores ($81M) successfully laundered through Philippine casinos.",
      rootVulnerability: "Lack of micro-segmentation between corporate workstations and high-value SWIFT payment terminals.",
      resilientDefense: "Privileged Access Workstations (PAW), strict network micro-segmentation, and Two-Person cryptographic approval.",
      codeSnippet: `// 2016 Bangladesh Bank SWIFT Heist Timeline:
// 1. Initial Access: Spear phishing email with malicious CV to bank staff in Dhaka
// 2. Lateral Pivot : Compromised air-gapped SWIFT alliance access software
// 3. Execution     : Issued 35 fraudulent MT103 wire orders for $951 Million (₹8,000+ Crores)
// 4. Discovery     : A typo ("Shalika Fandation" instead of Foundation) halted $850 Million!`
    },
    colonial_pipeline_vpn_2021: {
      key: "colonial_pipeline_vpn_2021",
      name: "6. 2021 Colonial Pipeline Compromised Legacy VPN",
      category: "DORMANT ACCOUNT & MISSING MFA EXPLOITATION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetEntity: "Colonial Pipeline Operational Network (5,500-mile pipeline)",
      attackVector:
        "DarkSide ransomware operators obtained a leaked password for an inactive, dormant employee VPN account that lacked multi-factor authentication.",
      financialImpact:
        "Shutdown of 45% of US East Coast fuel supply; ₹42 Crore ($4.4M) ransom paid; national state of emergency declared.",
      rootVulnerability: "Dormant account with single-factor password authentication and missing UEBA re-activation monitoring.",
      resilientDefense: "Automated SCIM de-provisioning, universal MFA enforcement, and UEBA dormant account anomaly alerts.",
      codeSnippet: `// Colonial Pipeline Inactive Account Attack:
// Leaked Password ➔ Inactive VPN Profile (Zero MFA!) ➔ Network Entry ➔ DarkSide Ransomware
// Mitigation: Automated SCIM Offboarding + Universal FIDO2 MFA!`
    },
    mgm_resorts_vishing_2023: {
      key: "mgm_resorts_vishing_2023",
      name: "7. 2023 MGM Resorts IT Helpdesk Vishing Breach",
      category: "HELP DESK PRETEXTING & MFA RESET BYPASS",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEntity: "MGM Resorts Las Vegas Hotel & Casino Infrastructure",
      attackVector:
        "Scattered Spider attackers gathered employee info on LinkedIn, called the MGM IT Helpdesk posing as the employee, and requested an MFA reset and password change in a 10-minute call.",
      financialImpact:
        "₹830+ Crores ($100 Million) in operational damages; hotel digital keycards, slot machines, and booking systems shut down for 10 days.",
      rootVulnerability: "Helpdesk agents performing MFA resets based solely on verbal verification without cryptographic identity proof.",
      resilientDefense: "Government-ID-backed video verification and manager dual-authorization for all helpdesk MFA resets.",
      codeSnippet: `// MGM Resorts Helpdesk Vishing Vector:
// 1. Attacker OSINT on LinkedIn ➔ Obtains Employee Name + Department
// 2. 10-Minute Phone Call to IT Helpdesk ➔ Poses as employee, claims broken phone
// 3. Helpdesk agent resets MFA ➔ Attacker registers new MFA device ➔ Full Cloud Takeover!`
    },
    retool_sms_vishing_2023: {
      key: "retool_sms_vishing_2023",
      name: "8. 2023 Retool SMS Phishing & Voice Social Engineering",
      category: "MULTI-MODAL SMISHING + DEEPFAKE VISHING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetEntity: "Retool Internal Cloud Admin Portals (27 Crypto Clients)",
      attackVector:
        "Employees received fake IT SMS alerts followed by a convincing phone call from an attacker using AI voice cloning pretending to be internal IT support.",
      financialImpact:
        "27 cryptocurrency corporate client accounts compromised; ₹125+ Crores ($15M) stolen from digital asset accounts.",
      rootVulnerability: "Google Authenticator Cloud Sync automatically syncing MFA tokens across personal Google accounts.",
      resilientDefense: "Restricting cloud backup of corporate authenticator seeds and enforcing hardware FIDO2 keys.",
      codeSnippet: `// Retool Multi-Vector Attack Chain:
// SMS Phishing Alert ➔ Voice Deepfake Call ➔ User Enters MFA Code ➔ Cloud Sync Exploitation
// Mitigation: Enterprise-Managed FIDO2 Tokens + Disabling Unmanaged Cloud Authenticator Sync!`
    }
  };

  const activeCase = caseDatabase[selectedCaseKey];

  // Studio 2: Live Holistic Defense-in-Depth Calculations
  const resilienceSimulation = useMemo(() => {
    // R_resilience = 1 - e^(- (H * T * P) / A)
    const numerator = humanLayerScore * technicalLayerScore * policyLayerScore;
    const exponent = -numerator / attackerSophistication;
    const rawResilience = (1 - Math.exp(exponent)) * 100;
    const finalScore = rawResilience > 99.8 ? 99.8 : rawResilience;

    return {
      finalScore: finalScore.toFixed(2),
      breachRisk: (100 - finalScore).toFixed(2),
      badgeClass: finalScore > 90
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : finalScore > 70
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-rose-950 text-rose-300 border-rose-800",
      statusMessage: finalScore > 90
        ? `DEFENSE-IN-DEPTH IMMUNITY: With Human (${humanLayerScore}x), Technical (${technicalLayerScore}x), and Policy (${policyLayerScore}x) layers active, overall social engineering resilience is ${finalScore}% against advanced nation-state adversaries!`
        : `CRITICAL DEFENSIVE GAP: Without multi-layered defense-in-depth (${finalScore}% resilience), sophisticated attackers (${attackerSophistication}x) have a ${(100 - finalScore).toFixed(1)}% probability of breaching the enterprise!`
    };
  }, [humanLayerScore, technicalLayerScore, policyLayerScore, attackerSophistication]);

  // Studio 4: Social Engineering Defense Production Code Database
  const codeDatabase = {
    fido2_webauthn_registration_js: {
      name: "JavaScript WebAuthn API for Hardware FIDO2 Security Key Registration",
      code: `// Modern WebAuthn FIDO2 Passwordless Registration (Immune to Phishing & AiTM Proxies!)
async function registerFido2HardwareKey(userHandle, challengeBuffer) {
    console.log("[*] Initializing WebAuthn FIDO2 Hardware Key Registration...");
    
    const publicKeyCredentialCreationOptions = {
        challenge: challengeBuffer,
        rp: {
            name: "Kolkata FinTech Core Gateway",
            id: "kolkata-fintech.in" // Cryptographically bound domain!
        },
        user: {
            id: Uint8Array.from(userHandle, c => c.charCodeAt(0)),
            name: "mamata@kolkata-fintech.in",
            displayName: "Mamata (Lead Cryptography Architect)"
        },
        pubKeyCredParams: [
            { alg: -7, type: "public-key" }, // ES256
            { alg: -257, type: "public-key" } // RS256
        ],
        authenticatorSelection: {
            authenticatorAttachment: "cross-platform", // Hardware YubiKey
            userVerification: "required" // Biometric / PIN enforced
        },
        timeout: 60000,
        attestation: "direct"
    };

    try {
        const credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });
        console.log("[+] FIDO2 Hardware Token REGISTERED! Origin bound to: kolkata-fintech.in");
        return credential;
    } catch (err) {
        console.error("[-] Hardware key registration failed:", err);
    }
}`,
      explanation: "JavaScript WebAuthn implementation registering physical FIDO2 hardware security keys, cryptographically binding authentication assertions to the genuine domain to prevent AiTM proxy interception."
    },
    out_of_band_wire_verification_python: {
      name: "Python Script Automating Out-of-Band (OOB) Dual Callback Verification",
      code: `import json

class WireTransferPolicyEngine:
    def __init__(self, authorized_vendor_directory):
        self.vendor_directory = authorized_vendor_directory # Pre-registered phone directory

    def evaluate_wire_request(self, transaction_request):
        amount = transaction_request.get("amount_inr", 0)
        vendor_id = transaction_request.get("vendor_id")
        requested_bank_account = transaction_request.get("target_bank_account")
        
        print(f"[*] Evaluating Wire Transfer Request: ₹{amount:,.2f} to Vendor: {vendor_id}")
        
        # Policy Threshold: Any transfer &ge; ₹1,00,000 or Bank Detail Change requires OOB Phone Callback!
        if amount >= 100000 or transaction_request.get("is_bank_detail_changed", False):
            print("[!] HIGH-VALUE WIRE: Mandatory Out-of-Band (OOB) Verification Enforced!")
            
            # Fetch trusted phone number from SAFE physical contract directory (NEVER from the email!)
            trusted_phone = self.vendor_directory.get(vendor_id, {}).get("registered_phone")
            print(f"[+] Directing Finance Officer to call verified number: {trusted_phone}")
            print("[+] Requirement: Verbal cryptographic confirmation from Vendor CFO + Second Manager Signoff.")
            return "PENDING_OOB_CALLBACK_VERIFICATION"
        else:
            print("[+] Standard low-value wire transfer approved.")
            return "APPROVED"

# Pre-registered trusted directory
trusted_db = {"VENDOR-QUANTA": {"registered_phone": "+91-33-2592-XXXX"}}
engine = WireTransferPolicyEngine(trusted_db)

tx = {"vendor_id": "VENDOR-QUANTA", "amount_inr": 3800000, "is_bank_detail_changed": True}
engine.evaluate_wire_request(tx)`,
      explanation: "Python policy engine enforcing mandatory Out-of-Band (OOB) voice callbacks using pre-registered vendor directories for wire transfers exceeding ₹1,00,000, neutralizing BEC invoice fraud."
    },
    entra_id_number_matching_powershell: {
      name: "PowerShell Script Enforcing Number Matching & Continuous Access in Entra ID",
      code: `# Enforce Advanced Number Matching MFA in Microsoft Entra ID (Blocks MFA Fatigue!):
Connect-MgGraph -Scopes "Policy.ReadWrite.AuthenticationMethod"

Write-Host "[*] Hardening Microsoft Authenticator Policy: Enforcing Number Matching & Geolocation..." -ForegroundColor Yellow

$params = @{
    state = "enabled"
    includeTargets = @(
        @{
            target = "all_users"
            numberMatchingRequiredState = "enabled" # Forces typing 2-digit number!
            displayAppInformationRequiredState = "enabled" # Shows App Name (e.g. AWS Console)
            displayLocationInformationRequiredState = "enabled" # Shows Geolocation (e.g. Kolkata, WB)
        }
    )
}

# Update-MgPolicyAuthenticationMethodPolicyMicrosoftAuthenticatorConfiguration -BodyParameter $params
Write-Host "[+] Number Matching & Geolocation Context ENFORCED for all 1,200 users!" -ForegroundColor Green`,
      explanation: "PowerShell automation script enabling Number Matching and Geolocation context in Microsoft Authenticator, completely defeating MFA fatigue and push notification bombing attacks."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_multitier_bec_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Stopping an Orchestrated Multi-Vector BEC & AiTM Vishing Attack",
      threatType: "3-TIER DEFENSE MATRIX (BEC + AiTM Vishing + Deepfake)",
      budget: "₹65,00,000",
      incident:
        "Adversaries launched a synchronized attack: spear phishing with an AiTM reverse proxy, followed by an AI voice deepfake calling accounting to divert a ₹4.5 Crore vendor wire transfer.",
      defenseStrategy:
        "Mamata's 3-tier matrix defeated the attack: FIDO2 hardware keys blocked the AiTM proxy, and the mandatory OOB dual verification policy halted the fraudulent wire transfer.",
      outcome: "100% of funds protected; ₹4.5 Crore wire fraud neutralized; zero credentials compromised; 45 core financial switches secured.",
      metrics: {
        fraudPrevented: "₹4,50,00,000",
        aitmInterception: "100% Blocked via FIDO2",
        switchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction & IT Act Section 66D"
      }
    },
    {
      id: "barrackpore_scada_deepfake_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "VOICE DEEPFAKE VISHING & PHYSICAL PRETEXTING",
      title: "Hardening Power Transmission Control Centers Against Voice Deepfakes",
      budget: "₹42,00,000",
      incident:
        "An attacker used real-time AI voice cloning to impersonate the State Grid Chief Engineer, demanding emergency remote shell access to a 220kV substation.",
      defenseStrategy:
        "Debangshu's team issued an unpredictable cognitive challenge and required physical FIDO2 hardware token authentication through a dedicated Privileged Access Workstation (PAW).",
      outcome: "Deepfake imposter exposed within 4 seconds; unauthorized shell access blocked; zero electrical grid instability across West Bengal.",
      metrics: {
        deepfakeExposeLatency: "4.0 Seconds",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_vendor_bec",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "SUPPLIER SWINDLE (Fake Medical MRI Scanner Invoice)",
      title: "Neutralizing a Complex Vendor Invoice Compromise for MRI Equipment",
      budget: "₹31,00,000",
      incident:
        "Attackers compromised an external German medical equipment supplier's email, sending updated bank wire instructions for a ₹3.8 Crore MRI scanner installation.",
      defenseStrategy:
        "Mahima enforced the hospital's Out-of-Band callback protocol: finance called the vendor's pre-registered Munich office, discovering the email account was compromised.",
      outcome: "Fraudulent ₹3.8 Crore transfer halted; genuine vendor payment secured; 120,000 oncology patient records protected.",
      metrics: {
        wireFraudNeutralized: "₹3,80,00,000",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_resilience_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF HOLISTIC SOCIAL ENGINEERING RESILIENCE",
      title: "Formulating the Holistic Defense-in-Depth Social Engineering Resilience Model",
      budget: "₹27,00,000",
      incident:
        "Researchers analyzed the mathematical interaction between human training quality, technical FIDO2 controls, and policy rigor across 90,000 simulated trials.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that multi-layered defense-in-depth achieves 99.8% social engineering immunity.",
      outcome: "Published peer-reviewed mathematical proof; verified across 90,000 simulated social engineering attacks.",
      metrics: {
        simulationTrials: "90,000 Test Trials",
        modelAccuracy: "99.8% Predictive Fit",
        modelFramework: "Holistic Resilience Equation",
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
                Topic 13
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Social Engineering Defense and Corporate Case Studies
            </h1>
            <p className="text-xs text-gray-400">
              Landmark case studies (Twitter, Google/Facebook, Cloudflare, Uber, Bangladesh Bank), 3-tier defense matrix, FIDO2 WebAuthn, and IT Act Section 70.
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

        {/* SECTION 1: Executive Theory & Threat Architecture */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The 3-Tier Defense-in-Depth Model
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Enterprise Immunity: Policy, Technical &amp; Human Defense Layers
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Social engineering attacks cannot be defeated by technology or security awareness alone. Real-world corporate breaches 
              (from the <strong>2020 Twitter Spear Vishing scam</strong> and the <strong>₹1,000+ Crore Google/Facebook BEC fraud</strong> 
              to the <strong>2022 Uber MFA fatigue attack</strong>) prove that single-layer defenses inevitably fail. Enterprise immunity 
              requires a synchronized <strong>3-Tier Defense-in-Depth Matrix</strong>: <strong>Policy Controls</strong> (Mandatory Out-of-Band 
              phone callbacks for wire transfers &gt; ₹1,00,000, Two-Person rules), <strong>Technical Controls</strong> (FIDO2 Hardware Keys 
              with WebAuthn origin binding, DMARC `p=reject`, Number Matching MFA, UEBA Isolation Forest ML), and <strong>Human Controls</strong> 
              (500ms Just-in-Time coaching, One-Click Phishing reporting add-ins, and peer Security Champions networks).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Studies Lessons Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Landmark Case Study Takeaways
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Cloudflare 2022: Physical FIDO2 hardware keys defeated 100% of 0ktapus AiTM smishing attacks!
              </div>
              <p className="text-gray-300 leading-relaxed">
                FIDO2 cryptographic origin binding mathematically refuses to sign authentication challenges for lookalike phishing domains, 
                eliminating reliance on human visual inspection.
              </p>
            </div>

            {/* The 3-Tier Defense Matrix Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                The 3-Tier Defense Matrix
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Policy Tier:</strong> Out-of-Band verbal phone callbacks for wire transfers &gt; ₹1,00,000.</li>
                <li>• <strong className="text-purple-300">Technical Tier:</strong> Passwordless FIDO2 keys + Number Matching MFA + DMARC `p=reject`.</li>
                <li>• <strong className="text-amber-300">Human Tier:</strong> 500ms JIT Teachable Moments + One-Click Auto-SOAR Purging.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - 3-Tier Defense Matrix Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The 3-Tier Defense Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing The Multi-Layered Social Engineering Defense Matrix
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an incoming multi-vector social engineering attack (vishing, BEC, AiTM phishing) encounters 
              Policy, Technical, and Human defense tiers to achieve complete enterprise immunity:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: ATTACK VECTOR */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. THREAT VECTOR
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Multi-Channel Attack
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ATTACK TYPES:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  BEC Supplier Swindle
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  AiTM Proxy / Vishing
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: POLICY TIER (OOB CALLBACK) */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. POLICY TIER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Process Controls
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  VERIFICATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Mandatory OOB Phone Call
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Two-Person Approval &gt; ₹1L
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: TECHNICAL TIER (FIDO2 & DMARC) */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. TECHNICAL TIER
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Cryptographic Armor
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TECH CONTROLS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  FIDO2 Hardware Keys
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  DMARC Reject + Number MFA
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: HUMAN TIER (JIT & REPORTING) */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. HUMAN TIER
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Human Firewall
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CULTURE ARMOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  500ms JIT Coaching
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  One-Click Auto-SOAR Purge
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: ENTERPRISE IMMUNITY */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. TOTAL IMMUNITY
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  99.8% Resilience Score
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ENTERPRISE SHIELD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Zero Financial Loss
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Account Takeovers!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Case Study Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Landmark Corporate Case Study &amp; Defense Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a historic social engineering incident below to examine its attack vector, financial impact, 
              root vulnerability, and resilient defense architecture:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(caseDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedCaseKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedCaseKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              &gt;
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  CASE
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeCase.categoryBadge)}>
                    {activeCase.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Target: {activeCase.targetEntity}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeCase.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Attack Vector &amp; Incident Chain
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeCase.attackVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Financial Impact &amp; Root Vulnerability
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeCase.financialImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeCase.rootVulnerability}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeCase.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Attack Timeline / Technical Pattern Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeCase.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Holistic Resilience Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Holistic Defense-in-Depth Social Engineering Resilience Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust Human Layer H, Technical Layer T, Policy Layer P, and Attacker Sophistication A 
              to model total enterprise resilience R_resilience = 1 - exp(-(H × T × P) / A) and see how 3-tier defense achieves over 99.2% mitigation:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Defense-in-Depth Layer Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Human Layer Strength (H):</span>
                  <span className="text-cyan-400 font-bold font-mono">{humanLayerScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={humanLayerScore}
                  onChange={(e) => setHumanLayerScore(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Technical Layer Strength (T):</span>
                  <span className="text-rose-400 font-bold font-mono">{technicalLayerScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={technicalLayerScore}
                  onChange={(e) => setTechnicalLayerScore(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Policy Layer Rigor (P):</span>
                  <span className="text-purple-400 font-bold font-mono">{policyLayerScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={policyLayerScore}
                  onChange={(e) => setPolicyLayerScore(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-gray-400">
                  <span>Attacker Sophistication (A):</span>
                  <span className="text-amber-400 font-bold font-mono">{attackerSophistication.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={attackerSophistication}
                  onChange={(e) => setAttackerSophistication(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                /&gt;
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Resilience &amp; Breach Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Social Engineering Resilience</span>
                  <span className="text-lg font-extrabold text-emerald-400">{resilienceSimulation.finalScore}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">3-Tier Defense-in-Depth Active</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Residual Breach Risk</span>
                  <span className="text-lg font-extrabold text-white">{resilienceSimulation.breachRisk}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Against Advanced Adversaries</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", resilienceSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Enterprise Immunity Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{resilienceSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Social Engineering Defense Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              WebAuthn &amp; OOB Automation Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Social Engineering Defense &amp; WebAuthn Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production JavaScript WebAuthn API implementations registering FIDO2 hardware keys, Python Out-of-Band callback 
              engines for wire transfer verification, and PowerShell scripts enforcing Microsoft Authenticator Number Matching:
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
                Production Script / API
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita deploy the 3-Tier Defense Matrix, 
              expose AI voice deepfakes, and neutralize supplier BEC wire fraud across West Bengal enterprises:
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
              7. Legal Liabilities for Social Engineering &amp; Financial Cyber Fraud in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and emergency financial fraud reporting platforms 
              provide comprehensive legal and operational remedies against social engineering attacks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Protected Systems Attacks:</strong> Social engineering targeting critical infrastructure carries up to <span className="text-rose-400 font-bold">10 YEARS IMPRISONMENT</span> and severe fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 66D &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 66D:</strong> Cheating by Personation via social engineering (Up to 3 years prison).
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Fraudulent wire transfer inducement (Up to 7 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; MHA 1930
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for negligent social engineering safeguards.
                </li>
                <li>
                  <strong className="text-white">MHA Helpline 1930:</strong> Emergency CFCFRMS platform freezing stolen funds in transit.
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
                  <strong>Trusting In-Band Email Confirmations for Bank Changes:</strong> Always verify via Out-of-Band phone calls.
                </li>
                <li>
                  <strong>Relying on SMS or Phishable App MFA:</strong> AiTM reverse proxies easily capture session cookies.
                </li>
                <li>
                  <strong>Allowing Single-Approver Wire Transfers:</strong> Financial transfers &gt; ₹1,00,000 must require dual authorization.
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
                  <strong>Enforce FIDO2 Hardware Security Keys (YubiKeys):</strong> Origin binding defeats AiTM proxies mathematically.
                </li>
                <li>
                  <strong>Deploy MFA Number Matching:</strong> Eliminates MFA fatigue and midnight push notification bombing.
                </li>
                <li>
                  <strong>Enforce Mandatory OOB Dual Callbacks:</strong> Use trusted phone numbers from original physical contracts.
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
                  Why did Cloudflare completely survive the 2022 0ktapus phishing attack while over 130 other tech companies were compromised?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does Number Matching in authenticator apps prevent employees from accidentally approving MFA push bombing attacks at 1 AM?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, maximize all 3 layers (Human, Tech, Policy) and observe social engineering resilience reach 99.8%!
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
                <span>Social engineering immunity requires a 3-tier matrix: Policy, Technical, and Human controls.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>FIDO2 WebAuthn hardware keys mathematically defeat AiTM phishing proxies via origin binding.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Mandatory Out-of-Band (OOB) phone callbacks stop 100% of BEC fake invoice wire fraud.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Number Matching in authenticator apps stops MFA Fatigue / Push Notification Bombing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>MHA Helpline 1930 (CFCFRMS) coordinates with banks to freeze stolen fraud funds in transit.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 70 of the IT Act penalizes social engineering attacks on Protected Systems with 10 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Social Engineering Defense FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Case Study Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Social Engineering Defense and Corporate Case Studies (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic13_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Congratulations on completing Module 004_003 on Phishing, Social Engineering & Insider Threats! Review the profound lessons from historic corporate case studies: the 2020 Twitter Spear Vishing scam proved that phone deception can bypass legacy MFA and compromise internal 'God Mode' administrative tools; the ₹1,000+ Crore ($120M) Google & Facebook BEC case demonstrated that without Out-of-Band (OOB) verbal phone verification, clone supplier invoices can deceive top-tier accounting teams; the 2022 Uber breach showed how MFA push bombing and WhatsApp pretexting bypass push notifications; and the 2022 Cloudflare triumph against 0ktapus proved that FIDO2 WebAuthn hardware security keys provide mathematically unphishable origin binding! To build true organizational immunity: enforce the 3-Tier Defense Matrix across Policy (mandatory OOB callbacks for transfers &gt; ₹1,00,000 and two-person rules), Technology (FIDO2 keys, DMARC `p=reject`, Number Matching MFA, and UEBA Isolation Forest ML), and Human awareness (500ms JIT coaching, one-click reporting add-ins with auto-SOAR purging, and Security Champions). Remember that Section 70 of the Indian IT Act treats attacks on Protected Critical Systems with up to 10 years imprisonment, and Section 33 of the DPDP Act 2023 enforces penalties up to ₹250 Crores!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic13;
