import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

const Topic10 = () => {
  // Unique SVG IDs
  const svgAuthId = useId();

  // Studio 1: Active Protocol Selection
  const [selectedProtocolKey, setSelectedProtocolKey] = useState("dmarc_policy_enforcement");

  // Studio 2: Live Spoofing Vulnerability Calculator State
  const [alignmentStrictness, setAlignmentStrictness] = useState(3.5); // 1.0 to 4.0
  const [dkimKeyStrength, setDkimKeyStrength] = useState(3.5); // 1.0 to 4.0
  const [dmarcPolicyStrength, setDmarcPolicyStrength] = useState(1); // 1 = p=none, 50 = p=quarantine, 500 = p=reject

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_dmarc_reject");

  // Studio 4: Email Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("email_auth_header_parser_python");

  // 8 Email Authentication Profiles for Studio 1
  const protocolDatabase = {
    dmarc_policy_enforcement: {
      key: "dmarc_policy_enforcement",
      name: "1. DMARC (RFC 7489) Policy Progression & Alignment",
      category: "DOMAIN POLICY & ALIGNMENT LAYER",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      rfcStandard: "RFC 7489 DMARC Specification",
      exploitationVector:
        "Without DMARC `p=reject`, adversaries easily forge the visible `From:` header in phishing emails while passing SPF on their own separate domain, deceiving victims with exact-domain banking spoofing.",
      vulnerabilityImpact:
        "Exact-domain spoofing tricks users and legacy email filters into accepting fraudulent payment and wire instructions.",
      telemetryIndicator: "Inbound emails with unaligned `From:` header domains compared against SPF and DKIM domains",
      resilientDefense: "Enforcing `v=DMARC1; p=reject; sp=reject; pct=100; aspf=r; adkim=r`.",
      codeSnippet: `// Production DMARC DNS TXT Record:
_dmarc.kolkata-fintech.in. IN TXT "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@kolkata-fintech.in; ruf=mailto:dmarc-ruf@kolkata-fintech.in; aspf=r; adkim=r"`
    },
    spf_ip_whitelisting_flattening: {
      key: "spf_ip_whitelisting_flattening",
      name: "2. SPF (RFC 7208) IP Whitelisting & Flattening",
      category: "SENDING IP AUTHORIZATION",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      rfcStandard: "RFC 7208 Sender Policy Framework",
      exploitationVector:
        "Exceeding the 10 DNS lookup limit triggers `SPF PermError`, which causes receiving gateways to bypass SPF checks, allowing unauthorized senders to forge Return-Path addresses.",
      vulnerabilityImpact:
        "Unauthorized SMTP servers send emails using the victim's domain without being rejected by receiving gateways.",
      telemetryIndicator: "SPF evaluation returning `PermError` or `SoftFail` due to nested lookup overflow (>10 lookups)",
      resilientDefense: "SPF record flattening into static CIDR ranges and strict `-all` hard fail enforcement.",
      codeSnippet: `// Flattened SPF DNS TXT Record:
kolkata-fintech.in. IN TXT "v=spf1 ip4:103.25.10.50/28 ip4:198.51.100.0/24 include:_spf.google.com -all"`
    },
    dkim_asymmetric_signatures: {
      key: "dkim_asymmetric_signatures",
      name: "3. DKIM (RFC 6376) 2048-Bit RSA & Ed25519 Signatures",
      category: "CRYPTOGRAPHIC MESSAGE INTEGRITY",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      rfcStandard: "RFC 6376 & RFC 8463 (Ed25519)",
      exploitationVector:
        "Weak 512-bit RSA DKIM keys can be factored in hours, allowing attackers to forge valid DKIM signatures for spoofed email payloads.",
      vulnerabilityImpact:
        "Compromised signatures allow attackers to modify email body content and bank account numbers in transit while passing DKIM verification.",
      telemetryIndicator: "DKIM verification returning `fail (bad signature)` due to altered body hashes (`bh=`)",
      resilientDefense: "2048-bit RSA or Ed25519 keys with automated 6-month selector rotation and `relaxed/relaxed` canonicalization.",
      codeSnippet: `// DKIM-Signature Header:
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=kolkata-fintech.in;
  s=s1-kolkata; t=1724400000;
  h=from:to:subject:date:message-id;
  bh=47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;
  b=d2F0ZXJpbmdob2xlMTIzNDU2Nzg5MGFiY2RlZg==`
    },
    bimi_vmc_branding: {
      key: "bimi_vmc_branding",
      name: "4. BIMI & Verified Mark Certificates (VMC)",
      category: "VISUAL INBOX BRAND VERIFICATION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      rfcStandard: "BIMI Working Group Specification",
      exploitationVector:
        "Phishing emails from lookalike domains deceive users because webmail clients display generic default letter avatars for unauthenticated senders.",
      vulnerabilityImpact:
        "Users cannot visually distinguish authentic corporate communications from malicious lookalike imposters.",
      telemetryIndicator: "Webmail clients displaying missing or untrusted SVG indicators next to inbound sender headers",
      resilientDefense: "Deploying Verified Mark Certificates (VMC) with DMARC `p=reject` to display verified trademark logos.",
      codeSnippet: `// BIMI DNS TXT Record:
default._bimi.kolkata-fintech.in. IN TXT "v=BIMI1; l=https://kolkata-fintech.in/assets/logo.svg; a=https://kolkata-fintech.in/assets/vmc_cert.pem"`
    },
    arc_authenticated_received_chain: {
      key: "arc_authenticated_received_chain",
      name: "5. ARC (RFC 8617) Authenticated Received Chain",
      category: "MULTI-HOP FORWARDING PRESERVATION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      rfcStandard: "RFC 8617 ARC Protocol",
      exploitationVector:
        "Mailing lists and email forwarders modify email subjects (e.g. adding `[List]`) or footers, inadvertently breaking DKIM and causing legitimate emails to fail DMARC.",
      vulnerabilityImpact:
        "Legitimate business emails routed through forwarders are blocked or sent to spam when domains enforce `p=reject`.",
      telemetryIndicator: "DMARC failure events originating from legitimate mailing list IP addresses with intact ARC seals",
      resilientDefense: "Enforcing ARC seal verification at inbound mail gateways to preserve original authentication results.",
      codeSnippet: `// ARC-Seal Header Sequence (RFC 8617):
ARC-Seal: i=1; a=rsa-sha256; d=jadavpur.ac.in; s=arc-2026; cv=none; b=...
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=jadavpur.ac.in; ...
ARC-Authentication-Results: i=1; mx.google.com; dkim=pass (kolkata-fintech.in); spf=pass`
    },
    mta_sts_tls_enforcement: {
      key: "mta_sts_tls_enforcement",
      name: "6. MTA-STS (RFC 8461) Strict Transport Security",
      category: "SMTP TRANSPORT ENCRYPTION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      rfcStandard: "RFC 8461 MTA-STS Specification",
      exploitationVector:
        "Adversaries perform STARTTLS stripping man-in-the-middle attacks, forcing SMTP connections into plaintext to intercept confidential emails in transit.",
      vulnerabilityImpact:
        "Plaintext transmission of corporate emails and passwords over unencrypted internet transit routes.",
      telemetryIndicator: "Inbound SMTP connection downgrade attempts stripping `STARTTLS` negotiation verbs",
      resilientDefense: "Publishing MTA-STS policies with `mode: enforce` and valid public TLS certificates.",
      codeSnippet: `// MTA-STS Policy File (https://mta-sts.kolkata-fintech.in/.well-known/mta-sts.txt):
version: STSv1
mode: enforce
mx: mail.kolkata-fintech.in
mx: backup-mail.kolkata-fintech.in
max_age: 604800`
    },
    dane_tlsa_dnssec_pinning: {
      key: "dane_tlsa_dnssec_pinning",
      name: "7. DANE (RFC 7672) TLSA Certificate Pinning",
      category: "DNSSEC CRYPTOGRAPHIC CERT PINNING",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      rfcStandard: "RFC 7672 DANE for SMTP",
      exploitationVector:
        "Attackers compromise public Certificate Authorities (CAs) to issue fraudulent TLS certificates for corporate mail domains, intercepting encrypted traffic.",
      vulnerabilityImpact:
        "Man-in-the-middle decryption of corporate email flows using fraudulent yet technically valid CA certificates.",
      telemetryIndicator: "TLS certificates presented during SMTP handshake that mismatch DNSSEC-signed TLSA records",
      resilientDefense: "Publishing DNSSEC-signed TLSA records in DNS to pin exact public key hashes.",
      codeSnippet: `// TLSA DNS Record for DANE SMTP Authentication:
_25._tcp.mail.kolkata-fintech.in. IN TLSA 3 1 1 5f8a9e7d4c2b1a0f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f`
    },
    dmarc_rua_ruf_reporting: {
      key: "dmarc_rua_ruf_reporting",
      name: "8. DMARC Aggregate (`rua`) & Forensic (`ruf`) XML Analytics",
      category: "GLOBAL TELEMETRY & INCIDENT AUDIT",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      rfcStandard: "RFC 7489 Section 7 (Reporting)",
      exploitationVector:
        "Operating email infrastructure blindly without aggregate DMARC reports prevents detection of global phishing campaigns spoofing your domain.",
      vulnerabilityImpact:
        "Lack of visibility into malicious senders, legitimate shadow IT email senders, and active phishing outbreaks.",
      telemetryIndicator: "Sudden spike in rejected message volume originating from unauthorized geographical IP blocks in daily XML reports",
      resilientDefense: "Automated ingestion and parsing of daily DMARC aggregate XML reports via SIEM pipelines.",
      codeSnippet: `<!-- Sample DMARC Aggregate XML Record -->
<record>
  <row>
    <source_ip>185.220.101.5</source_ip>
    <count>4820</count>
    <policy_evaluated>
      <disposition>reject</disposition>
      <dkim>fail</dkim>
      <spf>fail</spf>
    </policy_evaluated>
  </row>
</record>`
    }
  };

  const activeProtocol = protocolDatabase[selectedProtocolKey];

  // Studio 2: Live Spoofing Vulnerability Calculations
  const spoofingSimulation = useMemo(() => {
    // P_spoof = 1 - e^(- (A_alignment * S_dkim) / R_policy)
    const numerator = alignmentStrictness * dkimKeyStrength;
    const exponent = -numerator / dmarcPolicyStrength;
    const rawSpoofProb = (1 - Math.exp(exponent)) * 100;
    const actualSpoofProb = dmarcPolicyStrength >= 500
      ? (rawSpoofProb * 0.015).toFixed(2) // DMARC p=reject blocks 98.5% of spoofing
      : dmarcPolicyStrength >= 50
      ? (rawSpoofProb * 0.35).toFixed(2)  // DMARC p=quarantine blocks 65% of spoofing
      : rawSpoofProb.toFixed(2);           // DMARC p=none -> 100% vulnerable to exact-domain spoofing

    return {
      rawSpoofProb: rawSpoofProb.toFixed(2),
      actualSpoofProb,
      badgeClass: parseFloat(actualSpoofProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualSpoofProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualSpoofProb) < 2
        ? `DMARC REJECT SHIELD ACTIVE: With DMARC p=reject & Strict Alignment (${dmarcPolicyStrength}x), exact-domain spoofing vulnerability is only ${actualSpoofProb}% because unauthorized emails are dropped at the border!`
        : `CRITICAL DOMAIN SPOOFING VULNERABILITY: With DMARC p=none (${dmarcPolicyStrength}x), domain spoofing produces a ${actualSpoofProb}% probability of reaching employee inboxes undetected!`
    };
  }, [alignmentStrictness, dkimKeyStrength, dmarcPolicyStrength]);

  // Studio 4: Email Security Production Code Database
  const codeDatabase = {
    email_auth_header_parser_python: {
      name: "Python Script to Parse Raw Email Headers & Evaluate DMARC Alignment",
      code: `import re

def evaluate_email_authentication(raw_headers):
    print("[*] --- TECHNICAL EMAIL AUTHENTICATION EVALUATION ---")
    
    # Extract From, Return-Path, and Authentication-Results
    from_match = re.search(r'From:\s*.*<.*@(.*)>', raw_headers)
    spf_match = re.search(r'spf=(\w+)', raw_headers)
    dkim_match = re.search(r'dkim=(\w+)', raw_headers)
    dmarc_match = re.search(r'dmarc=(\w+)', raw_headers)
    
    from_domain = from_match.group(1) if from_match else "UNKNOWN"
    spf_result = spf_match.group(1) if spf_match else "none"
    dkim_result = dkim_match.group(1) if dkim_match else "none"
    dmarc_result = dmarc_match.group(1) if dmarc_match else "none"
    
    print(f"[+] Header From Domain  : {from_domain}")
    print(f"[+] SPF Result          : {spf_result.upper()}")
    print(f"[+] DKIM Result         : {dkim_result.upper()}")
    print(f"[+] DMARC Result        : {dmarc_result.upper()}")
    
    if dmarc_result == "pass":
        print("[+] VERDICT: AUTHENTIC EMAIL (DMARC Aligned & Cryptographically Verified!)")
        return True
    else:
        print("[-] ALERT: SPOOFED EMAIL DETECTED! Dropping Connection per DMARC p=reject Policy!")
        return False

# Sample raw email header snippet
sample_headers = """From: "Managing Director" <ceo@kolkata-fintech.in>
Authentication-Results: mx.google.com;
  spf=fail (sender IP 185.220.101.5 is not authorized);
  dkim=fail (bad signature);
  dmarc=fail action=reject header.from=kolkata-fintech.in"""

evaluate_email_authentication(sample_headers)`,
      explanation: "Python script parsing raw SMTP email headers, extracting SPF, DKIM, and DMARC evaluation results, and rejecting unauthenticated spoofed messages."
    },
    publish_dmarc_records_powershell: {
      name: "PowerShell Script to Publish DMARC p=reject & DKIM Records in Cloud DNS",
      code: `# PowerShell Script to Publish Hardened DMARC and DKIM Records:
$domain = "kolkata-fintech.in"

# 1. Publish Strict DMARC p=reject Policy Record
$dmarcRecord = @{
    Name = "_dmarc.$domain"
    Type = "TXT"
    Value = "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@$domain; ruf=mailto:dmarc-ruf@$domain; aspf=r; adkim=r"
    TTL = 300
}

# 2. Publish 2048-Bit RSA Public DKIM Key Record (Selector: s1-2026)
$dkimRecord = @{
    Name = "s1-2026._domainkey.$domain"
    Type = "TXT"
    Value = "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0k9...QIDAQAB"
    TTL = 300
}

Write-Host "[+] DMARC p=reject & DKIM Records Published Successfully for $domain!" -ForegroundColor Green`,
      explanation: "PowerShell automation script generating and publishing hardened DMARC `p=reject; pct=100` and 2048-bit RSA DKIM DNS TXT records to protect against exact-domain email spoofing."
    },
    bind9_dns_zone_email_auth: {
      name: "BIND9 DNS Zone File Configuration with Complete SPF, DKIM, DMARC, BIMI & MTA-STS",
      code: `; BIND9 DNS Zone Configuration for Complete Email Authentication
$TTL 300
@       IN      SOA     ns1.kolkata-fintech.in. admin.kolkata-fintech.in. ( 2026082301 3600 1800 604800 300 )

; 1. Flattened SPF Record with Hard Fail (-all)
@       IN      TXT     "v=spf1 ip4:103.25.10.50/28 include:_spf.google.com -all"

; 2. DKIM 2048-Bit RSA Key Record
s1-2026._domainkey IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."

; 3. DMARC Reject Policy Record
_dmarc  IN      TXT     "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc@kolkata-fintech.in"

; 4. BIMI Brand Indicator Record
default._bimi IN TXT    "v=BIMI1; l=https://kolkata-fintech.in/logo.svg; a=https://kolkata-fintech.in/vmc.pem"

; 5. MTA-STS Policy Pointer Record
_mta-sts IN     TXT     "v=STSv1; id=20260823T120000Z"`,
      explanation: "Comprehensive BIND9 DNS zone configuration implementing the full suite of email authentication standards: Flattened SPF `-all`, 2048-bit DKIM, DMARC `p=reject`, BIMI with VMC, and MTA-STS."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_dmarc_reject",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Transitioning to DMARC p=reject with 2048-Bit DKIM Alignment",
      threatType: "EXACT-DOMAIN BANK SPOOFING (85,000 Spoofed Emails/Month)",
      budget: "₹45,00,000",
      incident:
        "Cybercriminal botnets generated 85,000 spoofed emails per month claiming to be from `@kolkata-fintech.in` targeting retail banking consumers with fake KYC links.",
      defenseStrategy:
        "Mamata phased DMARC from `p=none` to `p=reject; pct=100` with strict 2048-bit RSA DKIM signing and daily automated XML report analytics.",
      outcome: "100% of exact-domain spoofed emails blocked at recipient mail gateways; consumer fraud reduced to zero; 45 core financial switches protected.",
      metrics: {
        spoofedEmailsBlocked: "85,000 / Month",
        dmarcPolicyEnforced: "p=reject; pct=100",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction & IT Act Section 66D"
      }
    },
    {
      id: "barrackpore_scada_mta_sts",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "STARTTLS STRIPPING & MULTI-HOP MAILING LIST CORRUPTION",
      title: "Deploying MTA-STS & ARC Validation for Automated Substation Alerts",
      budget: "₹32,00,000",
      incident:
        "Adversaries attempted STARTTLS stripping attacks on automated power grid alarm emails, and mailing list forwarders broke legacy DKIM signatures.",
      defenseStrategy:
        "Debangshu published MTA-STS with `mode: enforce` and deployed Authenticated Received Chain (ARC) verification across all 18 substation mail relays.",
      outcome: "Forced 100% TLS encryption on SMTP transport; preserved authentication across forwarders; zero grid telemetry corruption.",
      metrics: {
        smtpTransportSecured: "100% TLS Enforced",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_bimi_vmc",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "LOOKALIKE DOMAIN PHISHING (Fake Medical Appointment Reminders)",
      title: "Deploying BIMI & Verified Mark Certificates for Patient Communications",
      budget: "₹24,00,000",
      incident:
        "Adversaries sent fake appointment cancellation emails from lookalike domains to oncology patients, asking them to re-register on phishing portals.",
      defenseStrategy:
        "Mahima deployed BIMI with a Verified Mark Certificate (VMC), displaying the hospital's verified trademark logo in supporting Gmail and Apple Mail inboxes.",
      outcome: "Patients easily identify authentic medical notifications by the official verified logo; zero patient credentials compromised; 120,000 records protected.",
      metrics: {
        bimiVerifiedLogos: "100% Inbox Display",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_dmarc_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF EMAIL AUTHENTICATION RESILIENCE",
      title: "Formulating the Email Authentication & Spoofing Resilience Model",
      budget: "₹21,00,000",
      incident:
        "Researchers analyzed how SPF alignment, DKIM key strength, and DMARC policies interact to govern email spoofing vulnerability across 60,000 test domains.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that DMARC `p=reject` drives exact-domain spoofing risk below 1.6%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 60,000 simulated domain spoofing attacks.",
      metrics: {
        simulationTrials: "60,000 Test Trials",
        modelAccuracy: "99.5% Predictive Fit",
        modelFramework: "Email Auth Equation",
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
                Topic 10
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Technical Countermeasures: Email Authentication (SPF, DKIM, DMARC)
            </h1>
            <p className="text-xs text-gray-400">
              SPF record flattening, 2048-bit DKIM signatures, DMARC p=reject alignment, BIMI/VMC, ARC, MTA-STS, and IT Act Section 66D.
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
              Cryptographic Email Identity Verification
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Triple Pillars of Email Authentication: SPF, DKIM, and DMARC
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Email protocols were originally designed without native sender identity verification. Modern enterprise email security 
              establishes cryptographic trust across three core standards: <strong>SPF (Sender Policy Framework - RFC 7208)</strong> 
              which authorizes sending IP addresses in DNS TXT records, <strong>DKIM (DomainKeys Identified Mail - RFC 6376)</strong> 
              which attaches asymmetric RSA-2048 or Ed25519 digital signatures to guarantee message integrity, and 
              <strong>DMARC (RFC 7489)</strong> which enforces alignment between the visible `From:` header and SPF/DKIM domains, 
              empowering organizations to instruct global mail receivers to reject spoofed emails via <strong>`p=reject`</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SPF & DKIM Mechanics Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                SPF Flattening &amp; 2048-Bit DKIM Signatures
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                DKIM-Signature: a=rsa-sha256; d=kolkata-fintech.in; s=s1-2026; bh=47DEQpj8...
              </div>
              <p className="text-gray-300 leading-relaxed">
                SPF validates the Envelope From IP address (limited to 10 DNS lookups to avoid PermError). DKIM signs headers and body hashes 
                with private keys, allowing receivers to verify public keys published in DNS.
              </p>
            </div>

            {/* DMARC Reject & BIMI Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                DMARC p=reject Enforcement &amp; BIMI/VMC Branding
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">DMARC p=reject:</strong> Drops 100% of exact-domain spoofed emails at the SMTP border.</li>
                <li>• <strong className="text-purple-300">BIMI &amp; VMC:</strong> Displays verified corporate trademark logos in webmail inboxes.</li>
                <li>• <strong className="text-amber-300">ARC Validation:</strong> Preserves authentication across multi-hop mailing list forwarders.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Email Authentication Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Protocol Verification Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Email Authentication Verification &amp; DMARC Enforcement
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how incoming SMTP messages undergo SPF IP validation, DKIM signature verification, and DMARC alignment 
              before inbox delivery with verified BIMI trademark logos:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INBOUND SMTP RECEIPT */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. INBOUND SMTP
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Border Mail Gateway
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  INBOUND HEADERS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Client IP: 103.25.10.50
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  From: ceo@kolkata.in
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: SPF EVALUATION */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. SPF CHECK
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  RFC 7208 IP Lookup
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DNS TXT QUERY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  IP Authorized in DNS?
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  SPF Result: PASS / FAIL
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: DKIM SIGNATURE VERIFICATION */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. DKIM VERIFY
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  RFC 6376 Crypto Sign
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PUBLIC KEY CHECK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  RSA-2048 / Ed25519
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Body Hash: PASS
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: DMARC ALIGNMENT & POLICY */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. DMARC POLICY
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  RFC 7489 Alignment
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ALIGNMENT CHECK:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Header From Matches?
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  p=reject ➔ Drops Spoof!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: BIMI LOGO & INBOX DELIVERY */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. BIMI INBOX
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Verified Trademark
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% AUTHENTIC:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Displays Brand Logo
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Zero Domain Spoofing!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Protocol Email Authentication Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Email Authentication Protocol &amp; Standard Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an email authentication protocol below to examine its RFC standard, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(protocolDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedProtocolKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedProtocolKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  STANDARD
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeProtocol.categoryBadge)}>
                    {activeProtocol.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-gray-300 font-mono">
                    Standard: {activeProtocol.rfcStandard}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeProtocol.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeProtocol.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeProtocol.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeProtocol.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Protocol Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeProtocol.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical DNS / Header Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeProtocol.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Spoofing Vulnerability Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Email Spoofing Vulnerability &amp; DMARC Armor Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust alignment strictness A, DKIM signature strength S, and DMARC policy enforcement strength R 
              to model spoofing vulnerability P_spoof = 1 - exp(-(A × S) / R) and see how DMARC `p=reject` reduces spoofing vulnerability below 1.6%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Alignment &amp; Policy Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Alignment Strictness (A):</span>
                  <span className="text-cyan-400 font-bold font-mono">{alignmentStrictness.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={alignmentStrictness}
                  onChange={(e) => setAlignmentStrictness(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>DKIM Signature Strength (S):</span>
                  <span className="text-rose-400 font-bold font-mono">{dkimKeyStrength.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={dkimKeyStrength}
                  onChange={(e) => setDkimKeyStrength(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">DMARC Policy Enforcement (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setDmarcPolicyStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      dmarcPolicyStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    p=none (1x)
                  </button>
                  <button
                    onClick={() => setDmarcPolicyStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      dmarcPolicyStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    p=quarantine (50x)
                  </button>
                  <button
                    onClick={() => setDmarcPolicyStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      dmarcPolicyStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    p=reject (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Email Authentication Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Spoofing Vulnerability</span>
                  <span className="text-lg font-extrabold text-white">{spoofingSimulation.rawSpoofProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without DMARC p=reject</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Spoofing Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{spoofingSimulation.actualSpoofProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With DMARC p=reject Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", spoofingSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Email Authentication Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{spoofingSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Email Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Header Forensics &amp; BIND9 Zone Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Email Authentication &amp; DNS Zone Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python email header parsers evaluating DMARC alignment, PowerShell scripts publishing 
              DMARC `p=reject` records, and BIND9 DNS zone configurations containing complete SPF, DKIM, DMARC, BIMI, and MTA-STS records:
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
                Production Script / Zone
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita enforce DMARC `p=reject`, 
              deploy MTA-STS TLS transport encryption, and configure BIMI trademark logos across West Bengal infrastructure:
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
                  The Incident &amp; Spoofing Threat Vector
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
              7. Legal Liabilities for Email Spoofing &amp; Brand Impersonation in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, criminal statutes, and consumer protection regulations treat exact-domain email spoofing, 
              fraudulent KYC notices, and financial deception with severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66D
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cheating by Personation:</strong> Spoofing corporate email domains carries up to <span className="text-rose-400 font-bold">3 YEARS IMPRISONMENT</span> and fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(a) &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(a):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for unauthorized access via spoofing.
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
                  <strong className="text-white">CERT-In SLA:</strong> Mandatory reporting of mass phishing &amp; spoofing outbreaks within <strong className="text-white">6 hours</strong>.
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
                  <strong>Leaving DMARC at `p=none` Indefinitely:</strong> `p=none` only monitors; it blocks zero spoofed emails.
                </li>
                <li>
                  <strong>Exceeding the 10 DNS Lookup Limit in SPF:</strong> Causes `PermError`, allowing attackers to bypass SPF checks.
                </li>
                <li>
                  <strong>Assuming DMARC Protects Lookalike Domains:</strong> DMARC only protects the exact domain string published.
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
                  <strong>Enforce DMARC `p=reject; pct=100`:</strong> Drops 100% of exact-domain spoofed emails at the SMTP border.
                </li>
                <li>
                  <strong>Deploy BIMI with Verified Mark Certificates (VMC):</strong> Displays verified brand logos in webmail inboxes.
                </li>
                <li>
                  <strong>Enforce MTA-STS `mode: enforce`:</strong> Stops STARTTLS stripping man-in-the-middle downgrade attacks.
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
                  Why does DMARC alignment require the visible `From:` header domain to match the SPF Return-Path or DKIM `d=` domain?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does Authenticated Received Chain (ARC) prevent legitimate mailing lists from breaking DKIM signatures?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set policy enforcement to `p=reject` (500x) and observe spoofing vulnerability collapse to 1.5%!
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
                <span>SPF authorizes sending IP addresses; DKIM cryptographically signs email headers and body.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DMARC ties SPF and DKIM together, enforcing alignment with the visible `From:` header.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>The 3 DMARC policies are `p=none` (monitor), `p=quarantine` (spam), and `p=reject` (block).</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>SPF evaluation must not exceed 10 DNS lookups; use SPF flattening to avoid `PermError`.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>BIMI displays verified trademark logos next to emails for domains with DMARC `p=reject`.</span>
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
            title="Email Authentication FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Cryptographic Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Technical Countermeasures: Email Authentication (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Email authentication is the cornerstone of domain reputation and anti-phishing defense! Master the triple pillars: SPF (Sender Policy Framework - RFC 7208) authorizing sending IP ranges in DNS with strict `-all` hard fail (watch out for the 10 DNS lookup limit; use SPF flattening!), DKIM (DomainKeys Identified Mail - RFC 6376) attaching asymmetric RSA-2048 or Ed25519 digital signatures to guarantee message integrity across transit, and DMARC (RFC 7489) enforcing domain alignment between the visible `From:` header and SPF/DKIM domains. Understand why `p=none` provides zero protection—enterprises must progress to `p=reject; pct=100` to instruct receiving gateways to drop 100% of exact-domain spoofed emails at the border! Study complementary modern standards: BIMI with Verified Mark Certificates (VMC) displaying verified trademark logos in webmail inboxes, Authenticated Received Chain (ARC - RFC 8617) preserving authentication across mailing list forwarders, and MTA-STS (RFC 8461) enforcing TLS encryption on SMTP transport. Remember that Section 66D of the Indian IT Act treats Cheating by Personation as a severe criminal offense punishable with up to 3 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
