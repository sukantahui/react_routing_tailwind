import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  // Unique SVG IDs
  const svgAnatomyId = useId();

  // Studio 1: Active Layer Selection
  const [selectedLayerKey, setSelectedLayerKey] = useState("envelope_vs_header_from");

  // Studio 2: Live Phishing Compromise Calculator State
  const [phishVolume, setPhishVolume] = useState(100000);
  const [gatewayEfficiency, setGatewayEfficiency] = useState(99.8); // 95% to 99.9%
  const [humanClickRate, setHumanClickRate] = useState(3.0); // 1% to 10%
  const [passkeysActive, setPasskeysActive] = useState(false);

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_header_forensics");

  // Studio 4: Phishing Forensics Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("header_parser_python");

  // 8 Structural Layer Profiles for Studio 1
  const layerDatabase = {
    envelope_vs_header_from: {
      key: "envelope_vs_header_from",
      name: "1. Envelope From (RFC 5321) vs Header From (RFC 5322)",
      category: "ROUTING vs VISIBLE DISPLAY SPOOFING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      rfcStandard: "RFC 5321 (SMTP MAIL FROM) vs RFC 5322 (Message Header From:)",
      exploitationVector:
        "The SMTP transport envelope uses `MAIL FROM: attacker@foreign-host.xyz` for bounce routing, while the email body injects `From: 'Mamata' <mamata@kolkata-fintech.in>`. Email clients show only the visible Header From.",
      vulnerabilityImpact:
        "Recipients see their trusted colleague's legitimate corporate email address, believing the message originated from internal systems, suppressing skepticism.",
      telemetryIndicator: "Mismatched Return-Path and From headers in raw message source",
      resilientDefense: "Enforcing strict DMARC Alignment with `p=reject` policy at the mail gateway.",
      codeSnippet: `// SMTP Routing vs Visible Header:
MAIL FROM: <attacker@foreign-vps.xyz>  <-- Envelope From (Routing)
From: "Mamata (FinTech Lead)" <mamata@kolkata-fintech.in>  <-- Header From (Visible!)`
    },
    display_name_spoofing: {
      key: "display_name_spoofing",
      name: "2. Display Name Spoofing & Mobile Client Truncation",
      category: "USER INTERFACE VISUAL TRUNCATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      rfcStandard: "Display-Name <addr-spec> formatting",
      exploitationVector:
        "Setting the friendly display name to 'ICICI Bank Support' or 'Managing Director' while using a free webmail address (`icici-support-492@gmail.com`).",
      vulnerabilityImpact:
        "Mobile email apps truncate long headers, hiding the actual Gmail address and displaying only 'ICICI Bank Support', tricking mobile users at 3x the rate of desktop users.",
      telemetryIndicator: "Inbound external emails where display name matches internal executive roster",
      resilientDefense: "External email banner tagging (`[EXTERNAL]`) and SEG display name impersonation filters.",
      codeSnippet: `// Display Name Spoofing Header:
From: "ICICI Bank Security Alert" <support-alert948@free-mailer.xyz>
// Mobile view displays only: "ICICI Bank Security Alert"`
    },
    hyperlink_anchor_mismatch: {
      key: "hyperlink_anchor_mismatch",
      name: "3. Hyperlink Anchor Text vs Destination Href Deception",
      category: "HTML EMBEDDED URL SPOOFING",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      rfcStandard: "HTML <a> Anchor Element",
      exploitationVector:
        "The visible text reads `https://www.kolkata-fintech.in/login`, but the HTML `href` attribute directs the browser to `https://attacker-c2.net/login.php`.",
      vulnerabilityImpact:
        "Users read the trusted URL in the body text and click without hovering over the link to verify the true destination URL in the status bar.",
      telemetryIndicator: "Click-through events where destination IP does not match domain in anchor text",
      resilientDefense: "Time-of-Click URL rewriting (SafeLinks) and user awareness training on URL hovering.",
      codeSnippet: `<!-- Anchor Text Mismatch -->
<a href="https://attacker-c2.net/auth/login.php">
  https://www.kolkata-fintech.in/secure/login
</a>`
    },
    subdomain_masking_typosquatting: {
      key: "subdomain_masking_typosquatting",
      name: "4. Subdomain Masking & Typo-Squatted Root Domains",
      category: "DNS HIERARCHY MANIPULATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      rfcStandard: "RFC 1035 Domain Name System",
      exploitationVector:
        "Registering `attacker-domain.in` and creating subdomains: `https://login.microsoft.com.attacker-domain.in/auth`.",
      vulnerabilityImpact:
        "Users read from left to right, see `login.microsoft.com`, and conclude it is authentic, failing to recognize that the authoritative root domain is `attacker-domain.in`.",
      telemetryIndicator: "DNS requests resolving multi-level subdomains matching corporate brand names",
      resilientDefense: "Web filtering proxies blocking newly registered domains (NRDs < 30 days old).",
      codeSnippet: `// Subdomain Masking Breakdown:
// [Subdomain Prefix: login.microsoft.com].[Root Domain: evil-host].[TLD: in]
// Authoritative Host: attacker-host.net (Attacker's Server!)`
    },
    html_smuggling_blobs: {
      key: "html_smuggling_blobs",
      name: "5. HTML Smuggling & Client-Side Blob Construction",
      category: "PERIMETER SCANNER EVASION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      rfcStandard: "W3C File API & Blob Objects",
      exploitationVector:
        "The email attaches an innocent `.html` file containing Base64 JavaScript that constructs a malicious `.iso` or `.exe` file inside browser RAM using `Blob` objects.",
      vulnerabilityImpact:
        "No executable binaries traverse the email gateway, completely bypassing static attachment scanners and antivirus hash lookups.",
      telemetryIndicator: "Browser process spawning file downloads from `blob:` URI schemes",
      resilientDefense: "Content Disarm & Reconstruction (CDR) stripping all active JavaScript from HTML attachments.",
      codeSnippet: `// HTML Smuggling JavaScript Payload:
const b64Data = "TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQAA...";
const bytes = Uint8Array.from(atob(b64Data), c => c.charCodeAt(0));
const blob = new Blob([bytes], { type: "application/octet-stream" });
const a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "Salary_Slip.iso";
a.click(); // File assembled locally in browser memory!`
    },
    quishing_qr_code_evasion: {
      key: "quishing_qr_code_evasion",
      name: "6. Quishing (QR Code Phishing) & Image-Only Evasion",
      category: "NLP FILTER EVASION & MOBILE PIVOT",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      rfcStandard: "ISO/IEC 18004 QR Code Matrix",
      exploitationVector:
        "Replacing text hyperlinks with a PNG image of a QR code: 'Scan this QR code with your mobile to complete mandatory 2FA authentication'.",
      vulnerabilityImpact:
        "Email text filters see zero links to inspect; scanning shifts the attack surface to unmanaged employee personal smartphones.",
      telemetryIndicator: "Inbound emails containing high-contrast square matrix images with zero body text",
      resilientDefense: "Computer Vision OCR gateway engines automatically decoding QR codes and analyzing destination URLs.",
      codeSnippet: `// Quishing Attack Flow:
// [Email Body: "Scan QR Code for MFA"] ➔ [Embedded PNG QR Code] 
// ➔ [Scanned by Employee Mobile] ➔ [Navigates to Phishing Portal]`
    },
    zero_font_css_obfuscation: {
      key: "zero_font_css_obfuscation",
      name: "7. Zero-Font & Hidden CSS Keyword Obfuscation",
      category: "KEYWORD FILTER EVASION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      rfcStandard: "W3C CSS Level 3",
      exploitationVector:
        "Injecting hidden HTML spans with `font-size:0px` or `display:none` between letters: `P<span style='font-size:0px'>xyz</span>assword`.",
      vulnerabilityImpact:
        "Spam filters read `Pxyzassword` and permit the message; the rendered email in the user's browser displays 'Password' seamlessly.",
      telemetryIndicator: "HTML emails containing excessive inline styles with zero font sizes or negative margins",
      resilientDefense: "Normalized HTML rendering before passing email text to Natural Language Processing (NLP) models.",
      codeSnippet: `<!-- Zero-Font CSS Obfuscation -->
<p>
  Please verify your P<span style="font-size:0px;color:transparent;">hidden_garbage_text</span>assword 
  to prevent immediate account suspension.
</p>`
    },
    anti_crawler_fingerprinting: {
      key: "anti_crawler_fingerprinting",
      name: "8. Anti-Crawler Dynamic Landing Page Fingerprinting",
      category: "DYNAMIC CLOUD SCANNER EVASION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      rfcStandard: "HTTP/1.1 Request Header Inspection",
      exploitationVector:
        "Phishing servers inspect the visitor's IP, User-Agent, and ASN; security scanners (Palo Alto, VirusTotal) receive a clean Wikipedia page, while real users get the phishing portal.",
      vulnerabilityImpact:
        "Automated security crawlers flag the link as benign (clean verdict), allowing the phishing lure to reach employee inboxes.",
      telemetryIndicator: "Discrepant HTTP response bodies when requested from cloud ASNs vs residential ISPs",
      resilientDefense: "Time-of-Click dynamic sandboxing using residential IP proxies for destination analysis.",
      codeSnippet: `// Anti-Scanner Fingerprinting (PHP):
if (is_cloud_security_crawler($_SERVER['REMOTE_ADDR'])) {
    header("Location: https://en.wikipedia.org"); // Serves clean page to scanners!
    exit();
} else {
    render_credential_phish_portal(); // Serves phishing site to real victim!
}`
    }
  };

  const activeLayer = layerDatabase[selectedLayerKey];

  // Studio 2: Live Phishing Compromise Calculations
  const compromiseSimulation = useMemo(() => {
    // N_compromise = V_phish * (1 - E_gateway) * R_click * R_submit
    const gatewayPassThroughRate = (100 - gatewayEfficiency) / 100;
    const deliveredPhishCount = phishVolume * gatewayPassThroughRate;
    const clickedPhishCount = deliveredPhishCount * (humanClickRate / 100);
    const submitRate = passkeysActive ? 0.0 : 0.45; // 45% enter credentials without passkeys, 0% with FIDO2 passkeys
    const actualCompromisedAccounts = Math.round(clickedPhishCount * submitRate);

    return {
      deliveredPhishCount: Math.round(deliveredPhishCount),
      clickedPhishCount: Math.round(clickedPhishCount),
      actualCompromisedAccounts,
      badgeClass: actualCompromisedAccounts > 10
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : actualCompromisedAccounts > 0
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: passkeysActive
        ? `100% IMMUNITY ACHIEVED: Even with ${Math.round(clickedPhishCount)} employees clicking delivered phishing links, FIDO2 WebAuthn Passkeys drive credential submissions to ZERO!`
        : `ENTERPRISE AT RISK: Without FIDO2 passkeys, ${Math.round(clickedPhishCount)} phishing clicks result in ${actualCompromisedAccounts} compromised corporate accounts!`
    };
  }, [phishVolume, gatewayEfficiency, humanClickRate, passkeysActive]);

  // Studio 4: Phishing Header Forensics Production Code Database
  const codeDatabase = {
    header_parser_python: {
      name: "Python Script to Parse Raw RFC 5322 Headers & Extract Hops",
      code: `import email
from email import policy

def analyze_phishing_headers(raw_email_str):
    msg = email.message_from_string(raw_email_str, policy=policy.default)
    
    print("[*] --- EMAIL HEADER FORENSICS BREAKDOWN ---")
    print(f"[+] Subject       : {msg['Subject']}")
    print(f"[+] Visible From  : {msg['From']}")
    print(f"[+] Return-Path   : {msg['Return-Path']}")
    print(f"[+] Reply-To      : {msg['Reply-To']}")
    print(f"[+] Message-ID    : {msg['Message-ID']}")
    print(f"[+] Auth-Results  : {msg['Authentication-Results']}")
    
    # Trace Received Hops (Bottom to Top)
    received_hops = msg.get_all('Received', [])
    print(f"\\n[*] Total Routing Hops: {len(received_hops)}")
    for i, hop in enumerate(reversed(received_hops)):
        print(f"  [Hop {i+1} - Originating Server] {hop.strip()}")

# Test with simulated spoofed header
raw_sample = """Received: from foreign-vps.xyz (103.25.10.50) by mx.kolkata-fintech.in; Sun, 23 Aug 2026 04:15:02 +0530
From: "Mamata (FinTech Lead)" <mamata@kolkata-fintech.in>
Return-Path: <attacker@foreign-vps.xyz>
Subject: URGENT: Action Required on Financial Settlement
Authentication-Results: dkim=fail; dmarc=fail (p=reject)"""

analyze_phishing_headers(raw_sample)`,
      explanation: "Python script parsing raw RFC 5322 email headers, extracting hop routing paths from bottom to top, and detecting Return-Path mismatches."
    },
    dmarc_gateway_powershell: {
      name: "PowerShell Script to Configure Strict DMARC & Quarantine Actions",
      code: `# Configure Strict DMARC p=reject Enforcement in Microsoft Exchange Online:
Connect-ExchangeOnline -UserPrincipalName admin@kolkata-fintech.in

# 1. Enforce Quarantine & Reject Policies for Spoofed Domains
Set-HostedContentFilterPolicy -Identity "Default" \`
    -SpamAction Quarantine \`
    -HighConfidenceSpamAction Quarantine \`
    -BulkSpamAction Quarantine \`
    -MarkAsSpamNdrBackscatter On

# 2. Add Mail Flow Rule to Prepend [EXTERNAL] Warning on Inbound Mail
New-TransportRule -Name "Prepend External Warning Banner" \`
    -FromScope NotInOrganization \`
    -ApplyHtmlDisclaimerLocation Prepend \`
    -ApplyHtmlDisclaimerText "<div style='background-color:#ffebe6;border:2px solid #de350b;padding:8px;font-size:12px;color:#bf2600;'><b>[EXTERNAL EMAIL]</b> Verify sender before clicking links or entering passwords.</div>"

Write-Host "[+] DMARC & External Banner Policies ENFORCED!" -ForegroundColor Green`,
      explanation: "PowerShell script configuring Microsoft 365 Exchange Online anti-spoofing policies and prepending prominent external warning banners."
    },
    yara_html_smuggling_detector: {
      name: "YARA Rule to Detect HTML Smuggling in Email Attachments",
      code: `rule Detect_HTML_Smuggling_Blob_Download {
    meta:
        description = "Detects HTML Smuggling payloads creating Blobs and triggering automated downloads"
        author = "Sukanta Hui - Coder & AccoTax"
        reference = "BCAC703 Cyber Security - Topic 02"
        date = "2026-08-23"
    strings:
        $blob1 = "new Blob(" ascii nocase
        $blob2 = "URL.createObjectURL(" ascii nocase
        $octet = "application/octet-stream" ascii nocase
        $download = ".download =" ascii nocase
        $click = ".click()" ascii nocase
        $b64_pe = "TVqQAAMAAAAEAAAA" ascii wide // Common Base64 PE Header
    condition:
        ($blob1 and $blob2 and $download and $click) or
        ($octet and $blob1 and $b64_pe)
}`,
      explanation: "Production YARA rule scanning email attachments for HTML Smuggling JavaScript patterns (Blob construction, octet-stream MIME types, and automated click events)."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_header_forensics",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Deconstructing a Multi-Hop Spoofed Financial Settlement Phishing Email",
      threatType: "HEADER FROM SPOOFING & DMARC ALIGNMENT BYPASS",
      budget: "₹45,00,000",
      incident:
        "An adversary sent spoofed emails appearing as `settlements@kolkata-fintech.in` with mismatched Return-Paths to divert ₹2.4 Crore vendor payments.",
      defenseStrategy:
        "Mamata parsed the raw RFC 5322 headers, identified the unauthenticated originating VPS IP, and enforced strict DMARC `p=reject` policies at the gateway.",
      outcome: "All spoofed settlement emails dropped at the gateway; 45 core financial nodes secured; zero financial loss.",
      metrics: {
        spoofedEmailsBlocked: "100% Dropped",
        settlementNodesProtected: "45 Core Switches",
        dmarcPolicy: "p=reject (100% Enforced)",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_open_redirect_scada",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "OPEN REDIRECT & SUBDOMAIN PHISHING (Turbine Safety Alert)",
      title: "Neutralizing Open Redirect Phishing Disguised as Turbine Safety Alerts",
      budget: "₹28,000,00",
      incident:
        "Adversaries used an open redirect on a reputable university website (`https://edu.in/redirect.php?url=...`) to bypass the grid's email URL filter.",
      defenseStrategy:
        "Debangshu deployed Time-of-Click URL rewriting and dynamic deep-link inspection to detonate redirect chains before browser rendering.",
      outcome: "The malicious final destination was intercepted and blocked in real time; zero substation engineering PCs compromised.",
      metrics: {
        openRedirectsNeutralized: "100% Intercepted",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_quishing_mobile_clinic",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "QUISHING (QR CODE PHISHING) & MOBILE MFA HARVESTING",
      title: "Protecting Clinic Staff from Quishing QR Codes Targeting Personal Mobiles",
      budget: "₹22,00,000",
      incident:
        "Attackers delivered emails containing QR code images claiming to update doctors' payroll profiles, bypassing traditional text spam filters.",
      defenseStrategy:
        "Mahima deployed Computer Vision OCR gateway scanners to decode QR codes in transit and enforced FIDO2 passkeys across all 120 clinic workstations.",
      outcome: "Gateways decoded and blocked the malicious QR URLs; FIDO2 passkeys prevented credential theft; 120,000 patient records protected.",
      metrics: {
        quishingLuresBlocked: "100% Filtered",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_detection_accuracy_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF PHISHING COMPROMISE PROBABILITY",
      title: "Quantifying Phishing Compromise Probability & FIDO2 Passkey Mathematical Immunity",
      budget: "₹18,50,000",
      incident:
        "Researchers modeled the exact relationship between incoming volume, gateway catch rate, human click rates, and credential submission rates.",
      defenseStrategy:
        "Susmita and Abhronila proved mathematically that FIDO2 passkeys force submission rates to zero, eliminating enterprise compromise regardless of email volume.",
      outcome: "Published peer-reviewed mathematical proof in IEEE Transactions; verified across 500,000 simulated phishing messages.",
      metrics: {
        simulationVolume: "500,000 Emails",
        mathematicalAccuracy: "99.8% Fit",
        modelFramework: "Phishing Compromise Equation",
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
                Topic 02
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Phishing Fundamentals: Anatomy of a Phishing Email
            </h1>
            <p className="text-xs text-gray-400">
              Envelope vs Header From spoofing, anchor text deception, HTML smuggling, Quishing, DMARC alignment, and IT Act Section 66D.
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

        {/* SECTION 1: Executive Theory & Structural Anatomy */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The Architecture of Deception
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Anatomy of a Phishing Email: 7 Structural Layers &amp; Technical Deceptions
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              A modern phishing email is a carefully engineered exploit consisting of <strong>7 distinct structural layers</strong>: 
              <strong>Envelope From</strong> (SMTP routing) vs <strong>Header From</strong> (visible display), <strong>Display Name Spoofing</strong>, 
              <strong>Subject Line Manipulation</strong>, <strong>Hyperlink Anchor Text Deception</strong>, <strong>Visual Brand Impersonation</strong>, 
              <strong>Weaponized Attachments</strong> (HTML Smuggling blobs &amp; ISO containers), and <strong>Email Authentication Headers</strong> (SPF, DKIM, DMARC).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Envelope vs Header From Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                RFC 5321 (Envelope) vs RFC 5322 (Header From)
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                MAIL FROM: &lt;attacker@vps.xyz&gt; ➔ From: "Mamata" &lt;mamata@kolkata-fintech.in&gt;
              </div>
              <p className="text-gray-300 leading-relaxed">
                SMTP separates routing from message content. Attackers route mail via their own infrastructure while spoofing 
                the visible display address. Neutralizing this requires enforcing DMARC Alignment with <code className="text-rose-400">p=reject</code>.
              </p>
            </div>

            {/* HTML Smuggling & Quishing Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Evasion Innovations: HTML Smuggling &amp; Quishing
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">HTML Smuggling:</strong> Base64 JS builds `.iso`/`.exe` in browser RAM via Blob objects.</li>
                <li>• <strong className="text-purple-300">Quishing (QR Codes):</strong> Replaces text URLs with PNG QR codes to evade text NLP filters.</li>
                <li>• <strong className="text-amber-300">Time-of-Click Rewriting:</strong> Detonates destination URLs in real time upon click.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Anatomy of a Phishing Email */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Phishing Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Structural Anatomy &amp; Gateway Inspection Pipeline
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how an incoming phishing message is disassembled and inspected across the 5 gateway defense tiers:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: SMTP INGRESS */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. SMTP INGRESS
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  RFC 5321 / 5322
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  HEADERS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Envelope From
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Received Hops IP
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: DMARC & AUTH */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. DMARC GATEWAY
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Alignment Check
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ENFORCEMENT:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SPF + DKIM Match
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  p=reject Policy
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: AI COMPUTER VISION */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. COMPUTER VISION
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Logo &amp; QR OCR
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DETECTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  CNN Brand Scanner
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Quishing Decoded
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: TIME-OF-CLICK SANDBOX */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. LINK REWRITING
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Time-of-Click
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DYNAMIC CHECK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Sandbox Detonation
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Follows Redirects
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
                  Origin Binding
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ZERO SUBMISSION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Refuses Spoofed Site
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  0 Compromises!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Layer Phishing Deceptions Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Phishing Anatomy &amp; Technical Deception Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an email structural layer or evasion vector below to examine its RFC standard, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(layerDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedLayerKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedLayerKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  LAYER
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeLayer.categoryBadge)}>
                    {activeLayer.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Standard: {activeLayer.rfcStandard}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeLayer.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeLayer.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeLayer.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeLayer.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Gateway Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeLayer.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Header / Code Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeLayer.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Phishing Compromise Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Phishing Compromise Probability &amp; Gateway Efficiency Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust incoming phishing volume V, email gateway filter efficiency E, and human click rate R_click 
              to model enterprise compromises N = V × (1 - E) × R_click × R_submit, and toggle FIDO2 passkeys:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Volume &amp; Filter Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Monthly Phishing Volume (V):</span>
                  <span className="text-cyan-400 font-bold font-mono">{phishVolume.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={phishVolume}
                  onChange={(e) => setPhishVolume(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Gateway Efficiency (E):</span>
                  <span className="text-emerald-400 font-bold font-mono">{gatewayEfficiency.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="95.0"
                  max="99.9"
                  step="0.1"
                  value={gatewayEfficiency}
                  onChange={(e) => setGatewayEfficiency(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Human Click Rate (R_click):</span>
                  <span className="text-rose-400 font-bold font-mono">{humanClickRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={humanClickRate}
                  onChange={(e) => setHumanClickRate(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="pt-2 border-t border-gray-800">
                <button
                  onClick={() => setPasskeysActive(!passkeysActive)}
                  className={clsx(
                    "w-full py-2.5 px-3 rounded-lg border font-bold text-xs transition-all flex items-center justify-between",
                    passkeysActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-700"
                  )}
                >
                  <span>FIDO2 WebAuthn Passkeys:</span>
                  <span className={clsx("px-2 py-0.5 rounded text-[10px]", passkeysActive ? "bg-emerald-900 text-white" : "bg-gray-800 text-gray-400")}>
                    {passkeysActive ? "ENFORCED (0% Submissions)" : "DISABLED (45% Submissions)"}
                  </span>
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Compromise Pipeline Telemetry</h3>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Delivered to Inbox</span>
                  <span className="text-lg font-extrabold text-amber-400">{compromiseSimulation.deliveredPhishCount}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Bypassed Gateway</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">User Link Clicks</span>
                  <span className="text-lg font-extrabold text-rose-400">{compromiseSimulation.clickedPhishCount}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Human Errors</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Breaches</span>
                  <span className="text-lg font-extrabold text-white">{compromiseSimulation.actualCompromisedAccounts}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Credentials Stolen</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", compromiseSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Architecture Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{compromiseSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Phishing Forensics Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Header Forensics &amp; YARA Rules Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Phishing Forensics &amp; Gateway Engineering Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python email header forensic parsers, PowerShell DMARC quarantine enforcement scripts, 
              and YARA detection rules for HTML Smuggling attachments:
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
                Forensic Tool / Rule
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita deconstruct email headers, 
              neutralize open redirects, and decode Quishing QR codes across West Bengal enterprise networks:
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
                  The Incident &amp; Deception Vector
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
              7. Legal Liabilities for Phishing Operations in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law and evidentiary statutes treat email phishing, domain spoofing, 
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
                  <strong className="text-white">Cheating by Personation:</strong> Sending deceptive phishing emails spoofing banks or corporate portals carries up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for accessing mailboxes with harvested credentials.
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
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement email authentication safeguards.
                </li>
                <li>
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of all phishing compromises within <strong className="text-white">6 hours</strong>.
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
                  <strong>Trusting the Visible `From:` Header:</strong> Anyone can forge the visible `From:`; inspect raw `Received:` hops.
                </li>
                <li>
                  <strong>Scanning Only Body Text:</strong> Quishing embeds QR code images and HTML smuggling hides binaries in RAM.
                </li>
                <li>
                  <strong>Relying on Static URL Scanners:</strong> Dynamic anti-crawler fingerprinting serves clean pages to scanners.
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
                  <strong>Deploy DMARC `p=reject`:</strong> Enforces cryptographic domain alignment, blocking exact spoofing.
                </li>
                <li>
                  <strong>Implement Time-of-Click Link Rewriting:</strong> Detonates destination links in a sandbox upon click.
                </li>
                <li>
                  <strong>Deploy FIDO2 WebAuthn Passkeys:</strong> Origin binding makes password theft mathematically impossible.
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
                  Why does reading `Received:` headers from bottom to top reveal the true originating server IP?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why do HTML Smuggling attachments leave zero binary signatures on the perimeter email gateway?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the compromise calculator above, toggle FIDO2 WebAuthn Passkeys to ON and observe compromises drop to ZERO!
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
                <span>Envelope From (RFC 5321) routes mail; Header From (RFC 5322) is what the user sees.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Anchor text deception hides malicious destinations behind trusted display text.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>HTML smuggling uses Base64 Blobs in JavaScript to construct binaries locally in RAM.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Time-of-Click link rewriting detonates URLs in sandboxes when clicked, defeating delays.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DMARC p=reject enforces alignment between visible From and SPF/DKIM signing domains.</span>
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
            title="Phishing Fundamentals FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Email Security Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Phishing Fundamentals: Anatomy of a Phishing Email (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Phishing remains the #1 initial access vector in modern cyber warfare! Master the 7 structural layers of a phishing email: understand the difference between RFC 5321 Envelope From (routing) and RFC 5322 Header From (the visible display that attackers spoof). Learn how anchor text deception hides malicious destinations behind trusted text, how HTML Smuggling uses Base64 Blobs to assemble `.iso` malware inside browser RAM without triggering gateway scanners, and how Quishing shifts the attack surface to unmanaged mobile phones via QR code images. To build bulletproof enterprise email defenses: enforce DMARC `p=reject` at the gateway to eliminate exact domain spoofing, deploy Computer Vision OCR to detect brand logo impersonation, implement Time-of-Click link rewriting with real-time sandbox detonation, and mandate FIDO2 WebAuthn passkeys that mathematically refuse to sign fraudulent origins. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
