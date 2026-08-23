import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

const Topic7 = () => {
  // Unique SVG IDs
  const svgBooterId = useId();

  // Studio 1: Active Booter Underground Mechanism Selection
  const [selectedBooterKey, setSelectedBooterKey] = useState("booter_supply_chain");

  // Studio 2: Live Booter Economic Cost Asymmetry Calculator State
  const [booterMonthlyCost, setBooterMonthlyCost] = useState(2500); // ₹800 to ₹35,000
  const [downtimeHours, setDowntimeHours] = useState(4); // 1 to 24 Hours
  const [hourlyRevenueLoss, setHourlyRevenueLoss] = useState(800000); // ₹1,00,000 to ₹25,00,000
  const [ransomDemand, setRansomDemand] = useState(3500000); // ₹5,00,000 to ₹1,00,00,000
  const [anycastScrubbingActive, setAnycastScrubbingActive] = useState(false); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_rdos_defense");

  // Studio 4: Booter Security Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("origin_cloaking_iptables_sh");

  // 8 Booter & Stresser Underground Profiles for Studio 1
  const booterDatabase = {
    booter_supply_chain: {
      key: "booter_supply_chain",
      name: "1. The 4-Tier Commercial Booter Supply Chain",
      category: "UNDERGROUND CRIME ECOSYSTEM",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEcosystem: "Global DDoS-as-a-Service Market",
      exploitationVector:
        "Infrastructure miners compromise IoT botnets (Mirai) and rent bulletproof VPS hubs to Stresser Developers; Developers build web dashboards and automated WHMCS crypto billing; Telegram Resellers market subscriptions to retail script kiddies.",
      vulnerabilityImpact:
        "Democratizes destructive 500+ Gbps volumetric and Layer 7 attacks, allowing non-technical individuals to launch cyber assaults with one click for under ₹1,500.",
      telemetryIndicator: "Surge in multi-vector attack bursts lasting precisely 300 to 1,200 seconds matching commercial subscription tier limits",
      resilientDefense: "Always-on multi-terabit Anycast cloud scrubbing, origin IP cloaking, and international law enforcement takedowns.",
      codeSnippet: `// 4-Tier Supply Chain:
// Tier 1: Botnet Miners (Compromise 100k IoT bots)
// Tier 2: Stresser Backend Hubs (Aggregate VPS pools & API dispatchers)
// Tier 3: Telegram Resellers (Sell subscription keys)
// Tier 4: Script Kiddies (Click 'Launch Flood' on web portal)`
    },
    fake_legal_disclaimer: {
      key: "fake_legal_disclaimer",
      name: "2. The Legally Void 'Stress Testing' Disclaimer Facade",
      category: "JURISPRUDENTIAL EVASION ATTEMPT",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetEcosystem: "Terms of Service & Domain Evasion",
      exploitationVector:
        "Booter operators place fake disclaimers claiming to be 'authorized network stress-testing tools for system administrators' to evade law enforcement and hosting provider bans.",
      vulnerabilityImpact:
        "Because booters do not verify target IP ownership, global courts and Indian law treat disclaimers as legally void and prosecute operators as criminal enterprises.",
      telemetryIndicator: "Web registration portals requiring zero domain ownership verification before accepting flood target IPs",
      resilientDefense: "Coordinated domain seizures (Operation PowerOFF) and legal prosecution under IT Act Section 43/66/66F.",
      codeSnippet: `// Fake Legal Disclaimer (Legally Void in Court!):
// "By launching this attack, you certify that you own the target IP."
// Judicial Precedent: Operation PowerOFF seized 48 booter domains, ruling disclaimers are legally void!`
    },
    economic_cost_asymmetry: {
      key: "economic_cost_asymmetry",
      name: "3. The 2,500x Economic Cost Asymmetry Model",
      category: "FINANCIAL ASYMMETRY RATIO",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      targetEcosystem: "Corporate Financial Balance Sheets",
      exploitationVector:
        "An attacker spends ₹2,000/month on a booter subscription to inflict over ₹50,00,000 in downtime losses, emergency cloud scrubbing fees, and forensic response costs on the victim.",
      vulnerabilityImpact:
        "Extremely low barrier to entry enables competitors, disgruntled employees, and extortionists to cause massive economic damage with negligible capital expenditure.",
      telemetryIndicator: "Severe disparity between attacker infrastructure cost and victim incident response expenditure",
      resilientDefense: "Deploying always-on cloud scrubbing retainers to absorb floods without incurring per-incident downtime losses.",
      codeSnippet: `// Economic Cost Asymmetry Formula:
// Attacker Cost : ₹2,000 / month (Booter Subscription)
// Defender Cost : ₹50,00,000 (Downtime Losses + Cloud Retainer + Forensics)
// Asymmetry     : 2,500x Cost Imbalance!`
    },
    rdos_extortion_schemes: {
      key: "rdos_extortion_schemes",
      name: "4. Ransom Denial of Service (RDoS) Extortion Operations",
      category: "CRIMINAL FINANCIAL EXTORTION",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      targetEcosystem: "Executive Leadership & Board of Directors",
      exploitationVector:
        "Threat actors (e.g. Armada Collective) launch a 15-minute demonstration flood using a booter, then email executive leadership demanding ₹25-50 Lakhs in Bitcoin to avoid sustained downtime.",
      vulnerabilityImpact:
        "Coerces organizations into paying ransoms; security best practices mandate never paying, as attackers frequently demand more money or sell victim IPs.",
      telemetryIndicator: "Brief 15-minute high-volume volumetric flood followed within hours by an extortion email containing a Bitcoin/Monero address",
      resilientDefense: "Immediate reporting to CERT-In (6-hour SLA), activating cloud scrubbing, and refusing to pay ransom demands.",
      codeSnippet: `// Sample RDoS Extortion Threat:
// "The 15-minute flood today on your Kolkata payment gateway was a test.
// Send 2.5 BTC (approx ₹1,50,00,000) within 24 hours or face 1 Tbps sustained blackout!"`
    },
    headless_puppeteer_bypass: {
      key: "headless_puppeteer_bypass",
      name: "5. Headless Puppeteer Cloudflare / WAF Bypass",
      category: "LAYER 7 CHALLENGE EVASION",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      targetEcosystem: "Cloud WAF JavaScript Interstitial Challenges",
      exploitationVector:
        "Premium booters use automated Chromium browser farms running on cloud servers to solve JavaScript proof-of-work puzzles, harvest valid clearance cookies, and flood origin servers.",
      vulnerabilityImpact:
        "Bypasses simple cloud WAF interstitial challenges, driving Layer 7 HTTP floods directly to backend web applications.",
      telemetryIndicator: "Incoming requests containing valid clearance cookies but exhibiting non-human mouse entropy and abnormal navigation patterns",
      resilientDefense: "Deploying Behavioral Bot Management analyzing mouse trajectory entropy, canvas fingerprinting, and session timing.",
      codeSnippet: `// CF-Bypass Headless Script:
const puppeteer = require('puppeteer-extra');
const page = await browser.newPage();
await page.goto(targetUrl); // Solves JS challenge headless!
const cookie = (await page.cookies()).find(c => c.name === 'cf_clearance');
// Dispatches valid cookie to 50k proxies to flood origin!`
    },
    bulletproof_vps_dispatchers: {
      key: "bulletproof_vps_dispatchers",
      name: "6. Bulletproof VPS Hubs & API Attack Dispatchers",
      category: "HIGH-BANDWIDTH ATTACK CLUSTERS",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      targetEcosystem: "Bulletproof Data Center Hosting Providers",
      exploitationVector:
        "Commercial booters rent high-bandwidth 10-40 Gbps servers in bulletproof data centers that allow IP spoofing, using REST API dispatchers to launch amplification floods on demand.",
      vulnerabilityImpact:
        "Enables a single booter frontend to instantly blast 500+ Gbps of DNS/NTP/Memcached reflection floods with high reliability.",
      telemetryIndicator: "Ingress attack traffic originating from known bulletproof hosting autonomous system numbers (ASNs)",
      resilientDefense: "Upstream ISP BGP Flowspec rules blackholing bulletproof hosting ASN prefix ranges.",
      codeSnippet: `// API Dispatcher Flow:
// User Web Portal ➔ Master Controller ➔ Dispatches JSON Job to 25 Dedicated VPS Hubs
// Each VPS Hub (10 Gbps) ➔ Blasts 100k Amplifiers ➔ Converges 600 Gbps on Target!`
    },
    forensic_db_seizures: {
      key: "forensic_db_seizures",
      name: "7. Forensic Seizure & Analysis of Booter SQL Databases",
      category: "DIGITAL FORENSIC EVIDENCE EXTRACTION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      targetEcosystem: "Seized MySQL / PostgreSQL Transaction Databases",
      exploitationVector:
        "When law enforcement seizes booter servers, digital forensics extracts unencrypted SQL databases containing user login IPs, emails, crypto transaction hashes, and target attack logs.",
      vulnerabilityImpact:
        "Provides irrefutable judicial evidence leading to the arrest and prosecution of thousands of booter subscribers worldwide.",
      telemetryIndicator: "Cross-referencing victim firewall attack timestamps with seized booter SQL `attack_logs` tables",
      resilientDefense: "Preserving forensic packet captures (`pcap`) and server logs to support CBI / Cyber Crime Police investigations.",
      codeSnippet: `// Forensic Evidence SQL Query:
SELECT users.username, users.email, users.reg_ip, attack_logs.target_ip, attack_logs.duration_sec 
FROM attack_logs 
JOIN users ON attack_logs.user_id = users.id 
WHERE attack_logs.target_ip = '103.25.10.50';`
    },
    operation_poweroff_takedowns: {
      key: "operation_poweroff_takedowns",
      name: "8. Operation PowerOFF Global Law Enforcement Takedowns",
      category: "MULTINATIONAL POLICE ENFORCEMENT",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetEcosystem: "International Police Task Forces (FBI / Europol / CBI)",
      exploitationVector:
        "Coordinated multinational operations seizing booter domains, freezing operator cryptocurrency wallets, and dismantling commercial DDoS infrastructure globally.",
      vulnerabilityImpact:
        "Permanently eliminates dozens of major booter services and deters cybercriminals through high-profile criminal convictions.",
      telemetryIndicator: "Sudden drop in global DDoS reflection traffic following coordinated domain seizure waves",
      resilientDefense: "Public-private partnerships between cloud security vendors, national CERTs, and law enforcement agencies.",
      codeSnippet: `// Operation PowerOFF Seizure Notice:
// "THIS DOMAIN HAS BEEN SEIZED by the FBI, Europol, and UK NCA in accordance with a seizure warrant."
// 48+ Major Booter Domains Dismantled!`
    }
  };

  const activeBooter = booterDatabase[selectedBooterKey];

  // Studio 2: Live Booter Economic Cost Asymmetry & Attacker ROI Calculations
  const economicSimulation = useMemo(() => {
    const totalDowntimeLosses = anycastScrubbingActive ? 0 : downtimeHours * hourlyRevenueLoss;
    const cloudRetainerCost = 1000000; // ₹10,00,000 / year standard retainer
    const forensicResponseCost = 800000; // ₹8,00,000 incident response

    const totalDefenderCost = totalDowntimeLosses + cloudRetainerCost + forensicResponseCost;
    const costAsymmetryRatio = (totalDefenderCost / booterMonthlyCost).toFixed(0);

    // Attacker Extortion ROI:
    let attackerRoiPercent = 0;
    if (anycastScrubbingActive) {
      // If scrubbing is active, attack failed completely ➔ -100% ROI!
      attackerRoiPercent = -100.0;
    } else {
      attackerRoiPercent = (((ransomDemand - booterMonthlyCost) / booterMonthlyCost) * 100).toFixed(0);
    }

    return {
      totalDowntimeLosses: "₹" + totalDowntimeLosses.toLocaleString("en-IN"),
      totalDefenderCost: "₹" + totalDefenderCost.toLocaleString("en-IN"),
      costAsymmetryRatio: Number(costAsymmetryRatio).toLocaleString("en-IN") + "x",
      attackerRoiPercent: anycastScrubbingActive ? "-100.0%" : Number(attackerRoiPercent).toLocaleString("en-IN") + "%",
      badgeClass: anycastScrubbingActive
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : "bg-rose-950 text-rose-300 border-rose-800",
      statusMessage: anycastScrubbingActive
        ? `ALWAYS-ON ANYCAST SHIELD ACTIVE: Cloud scrubbing absorbed 100% of booter flood; downtime losses eliminated (₹0); attacker extortion ROI collapsed to -100.0% (Complete Attacker Failure)!`
        : `SEVERE ECONOMIC ASYMMETRY: ₹${booterMonthlyCost.toLocaleString("en-IN")} booter attack inflicted ${"₹" + totalDefenderCost.toLocaleString("en-IN")} in total defender financial losses (${costAsymmetryRatio}x asymmetry); attacker extortion ROI is +${Number(attackerRoiPercent).toLocaleString("en-IN")}%!`
    };
  }, [booterMonthlyCost, downtimeHours, hourlyRevenueLoss, ransomDemand, anycastScrubbingActive]);

  // Studio 4: Booter Defense Production Code Database
  const codeDatabase = {
    origin_cloaking_iptables_sh: {
      name: "Origin IP Cloaking & Cloudflare VIP Whitelisting Linux Shell Script",
      code: `#!/bin/bash
# Origin Server IP Cloaking: Drops Direct-to-IP Booter Floods Bypassing Cloudflare CDN

echo "[*] Flushing existing iptables rules..."
iptables -F
iptables -X

# 1. Allow Loopback and Established Connections
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 2. Allow SSH ONLY from Corporate Management Bastion Subnet (Kolkata NOC)
iptables -A INPUT -p tcp --dport 22 -s 103.25.10.0/24 -j ACCEPT

# 3. Whitelist Official Cloudflare IPv4 Ranges for HTTP/HTTPS Ports 80 & 443
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
    iptables -A INPUT -p tcp -m multiport --dports 80,443 -s $ip -j ACCEPT
done

# 4. DROP ALL OTHER DIRECT INGRESS TRAFFIC (Defeats leaked origin IP booter floods!)
iptables -A INPUT -p tcp -m multiport --dports 80,443 -j DROP
iptables -A INPUT -p udp -j DROP # Drops all Layer 4 UDP reflection floods!

echo "[+] Origin IP Cloaking ACTIVE: Direct-to-IP booter attacks COMPLETELY NEUTRALIZED!"`,
      explanation: "Linux iptables shell script enforcing strict origin cloaking: allows HTTP/HTTPS ingress exclusively from official Cloudflare CDN IP ranges, silently dropping all direct-to-IP booter floods leaked through historic DNS or mail headers."
    },
    booter_honeypot_ingest_py: {
      name: "Python Booter Amplification Honeypot & CERT-In Telemetry Ingest Script",
      code: `# Python Amplification Honeypot Logger to Harvest Booter Attacker Telemetry
import socket
import json
import datetime

HONEYPOT_PORT = 53 # Fake DNS Amplification Port
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("0.0.0.0", HONEYPOT_PORT))

print(f"[*] Booter Honeypot ACTIVE on UDP Port {HONEYPOT_PORT}... Listening for spoofed queries...")

while True:
    data, addr = sock.recvfrom(2048)
    # Extract spoofed victim IP and booter scanner parameters:
    telemetry_log = {
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "booter_reflector_source_ip": addr[0],
        "booter_reflector_port": addr[1],
        "payload_length_bytes": len(data),
        "alert_type": "BOOTER_AMPLIFICATION_PROBE_DETECTED",
        "action": "DROPPED_AND_LOGGED_TO_CERT_IN"
    }
    
    # Save to forensic evidence repository for CBI / Law Enforcement prosecution:
    with open("/var/log/booter_honeypot_evidence.json", "a") as f:
        f.write(json.dumps(telemetry_log) + "\\n")
    print(f"[!] Logged Booter Amplification Probe from {addr[0]} ({len(data)}B)")`,
      explanation: "Python network honeypot daemon capturing incoming booter reflection probe queries, logging forensic metadata (attacker IP, timestamps, payload size) to support national CERT-In incident reporting and law enforcement prosecution."
    },
    bgp_flowspec_booter_vps_filter: {
      name: "BGP Flowspec (RFC 5575) Juniper Script to Blackhole Booter Bulletproof VPS Hubs",
      code: `# BGP Flowspec Policy to Blackhole Known Booter VPS Hubs & Bulletproof ASNs:
routing-options {
    flow {
        route kolkata-booter-blackhole {
            match {
                destination 103.25.10.50/32;             # Protected Gateway VIP
                source 194.26.29.0/24;                   # Known Bulletproof VPS Booter Subnet
                protocol [ tcp udp ];
            }
            then {
                rate-limit 0;                            # Drop 100% of traffic at Tier-1 ISP Core!
                community [ "target:65000:666" ];        # ISP Blackhole Tag
            }
        }
    }
}
# Result: Commercial booter VPS traffic discarded at Tier-1 ISP before touching enterprise uplinks!`,
      explanation: "BGP Flowspec (RFC 5575) policy injected into Tier-1 ISP core routers to discard 100% of traffic originating from bulletproof hosting subnets hosting commercial booter API dispatchers."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_rdos_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Neutralizing a ₹40 Lakhs Diwali Sale RDoS Booter Extortion Campaign",
      threatType: "RANSOM DoS (RDoS) BOOTER EXTORTION (500 Gbps Multi-Vector Flood)",
      budget: "₹76,00,000",
      incident:
        "Extortionists launched a 15-minute 400 Gbps demonstration flood and emailed executive leadership demanding ₹40 Lakhs in Bitcoin during peak Diwali festive shopping.",
      defenseStrategy:
        "Mamata engaged Always-On Anycast cloud scrubbing, cloaked origin IPs behind Cloudflare VIPs, reported the incident to CERT-In within 2 hours, and refused all ransom demands.",
      outcome: "Sustained 500 Gbps booter attack absorbed at cloud edge with 0% downtime; ₹40 Lakh extortion defeated; 100% micro-lending transactions processed.",
      metrics: {
        attackPeakBandwidth: "500.0 Gbps",
        ransomPaymentMade: "₹0 (Defeated)",
        switchesProtected: "45 Financial Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_booter_c2_trace",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "BULLETPROOF VPS BOOTER ATTACK (SCADA Telemetry Flood)",
      title: "Tracing and Blackholing Commercial Booter VPS Hubs Targeting Grid Telemetry",
      budget: "₹48,00,000",
      incident:
        "Adversaries rented a commercial booter service to launch multi-hundred gigabit UDP floods against regional electricity substation telemetry boundary routers.",
      defenseStrategy:
        "Debangshu identified bulletproof VPS source IP prefixes and pushed upstream BGP Flowspec (RFC 5575) blackhole rules to Tier-1 ISPs within 20 minutes.",
      outcome: "Booter traffic discarded at ISP core; telemetry link latency remained at 0.0 ms; electrical grid frequency stabilized across North 24 Parganas.",
      metrics: {
        flowspecRuleDeployTime: "20 Minutes",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_rival_booter_defense",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "COMPETITIVE BOOTER SABOTAGE (Outpatient Portal Flood)",
      title: "Protecting Outpatient Appointment Booking from Rival Booter Assaults",
      budget: "₹35,00,000",
      incident:
        "A rival private clinic rented a ₹2,500/month booter subscription to flood the hospital's appointment booking portal during morning peak registration hours.",
      defenseStrategy:
        "Mahima deployed Behavioral Bot Management with Puppeteer detection and enforced strict origin IP whitelisting.",
      outcome: "Headless CF-bypass bot requests dropped with HTTP 403; appointment booking portal remained 100% available for 1,500 daily patients.",
      metrics: {
        booterBotRequestsDropped: "100% at Edge",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_booter_economics_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF DDoS-AS-A-SERVICE GAME THEORY",
      title: "Formulating the DDoS-as-a-Service Economic Equilibrium & Asymmetry Model",
      budget: "₹29,00,000",
      incident:
        "Researchers modeled the economic cost asymmetry between attacker subscription prices (₹2,000) and defender mitigation expenditure (₹50 Lakhs).",
      defenseStrategy:
        "Susmita and Abhronila published their game-theoretic mathematical model in IEEE Transactions, proving that Always-On Anycast scrubbing drives attacker ROI to negative territory.",
      outcome: "Published peer-reviewed mathematical proof; verified across 80,000 simulated booter economic market conditions.",
      metrics: {
        simulationTrials: "80,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Economic Cost Asymmetry Model",
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
                Module 004_004
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Topic 07
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Botnet Economics: DDoS-for-Hire Services and Stressers
            </h1>
            <p className="text-xs text-gray-400">
              Commercial booters, 2,500x cost asymmetry, RDoS extortion, Operation PowerOFF, and IPC Section 384 / IT Act 66F.
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
              The Underground Commercialization of Cyber Attacks
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Economics of DDoS-for-Hire: Democratizing Destruction via Booter &amp; Stresser Services
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              The rise of <strong>DDoS-for-Hire services (commercial 'Booters' and 'Stressers')</strong> has transformed cyber warfare 
              into an easily accessible commodity. Non-technical adversaries can purchase monthly subscriptions (ranging from 
              <strong>₹800 to ₹35,000/month</strong>) to launch multi-hundred gigabit volumetric and Layer 7 bypass attacks with a single click. 
              The underground economy operates across a 4-tier supply chain: <strong>Infrastructure Miners</strong> (compromising IoT devices and bulletproof VPS hubs), 
              <strong>Stresser Platform Developers</strong> (building web panels and WHMCS crypto billing), <strong>Telegram Resellers</strong>, 
              and <strong>Retail Script Kiddies / Extortionists</strong>. This creates an extreme <strong>2,500:1 economic cost asymmetry</strong>, 
              where a ₹2,000 attack inflicts over ₹50,00,000 in defender financial losses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Economic Cost Asymmetry Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                The 2,500x Economic Cost Asymmetry
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Attacker: ₹2,000/mo ➔ Defender: ₹50,00,000+ (Downtime + Cloud Retainer + Forensics)
              </div>
              <p className="text-gray-300 leading-relaxed">
                Extortion groups (Ransom DoS) demand ₹25-50 Lakhs under threat of sustained blackouts. 
                Deploying always-on Anycast cloud scrubbing eliminates downtime, driving attacker ROI to -100%.
              </p>
            </div>

            {/* Operation PowerOFF & Law Enforcement Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                Operation PowerOFF &amp; Technical Defenses
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Operation PowerOFF:</strong> Seized 48 booter domains and SQL transaction logs worldwide.</li>
                <li>• <strong className="text-purple-300">Origin IP Cloaking:</strong> `iptables` dropping ingress traffic not from CDN VIPs.</li>
                <li>• <strong className="text-amber-300">Behavioral Bot WAF:</strong> Detects headless Puppeteer CF-bypass automation tools.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Booter Supply Chain Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Booter Attack Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing Commercial Booter Dispatch vs Always-On Cloud Anycast Scrubbing
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a script kiddie on Telegram triggers bulletproof VPS dispatchers to launch a 500 Gbps flood, 
              and how Always-On Anycast cloud scrubbing dilutes and neutralizes the attack:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: SCRIPT KIDDIE BUYER */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. RETAIL BUYER
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  Telegram / Web User
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  BOOTER SUBSCRIPTION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Cost: ₹2,000 / month
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Clicks 'Launch Flood'!
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: STRESSER BACKEND API DISPATCHER */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. API DISPATCHER
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  Bulletproof Hubs
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  VPS CLUSTER POOL:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  25 Dedicated 10G VPS
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Dispatches Multi-Vector!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: 500 GBPS MULTI-VECTOR FLOOD */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. 500 GBPS FLOOD
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  RDoS Extortion Assault
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  ATTACK PAYLOAD:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  DNS / NTP + CF-Bypass
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Demand: ₹40 Lakhs!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: CLOUD ANYCAST SCRUBBING CENTER */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. ANYCAST SHIELD
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  10 Tbps Global Scrubbing
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DILUTION &amp; WAF:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  300 Global PoPs
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  Drops 100% Attack!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: CLOAKED ORIGIN SERVER */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. ORIGIN SERVER
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  Kolkata Gateway
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  100% AVAILABLE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Origin IP Cloaked
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Extortion ROI: -100%!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Booter Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Booter &amp; Stresser Underground Mechanism Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select an underground mechanism below to examine its target ecosystem, exploitation vector, 
              vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(booterDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedBooterKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedBooterKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  MECHANISM
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
                  <span className={clsx("text-xs font-bold px-2.5 py-0.5 rounded border", activeBooter.categoryBadge)}>
                    {activeBooter.category}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Target: {activeBooter.targetEcosystem}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeBooter.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Exploitation Vector &amp; Attack Mechanics
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeBooter.exploitationVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Vulnerability Impact &amp; Telemetry Indicator
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeBooter.vulnerabilityImpact}</p>
                  <p className="text-gray-400 text-[11px]">{activeBooter.telemetryIndicator}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeBooter.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Forensic Script Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeBooter.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Booter Economic Cost Asymmetry Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Booter Economic Cost Asymmetry &amp; Attacker ROI Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust monthly booter subscription cost $C_{\text{attack}}$, downtime duration, hourly revenue loss, 
              and extortion ransom demand to model financial cost asymmetry $A_{\text{economic}} = C_{\text{defend}} / C_{\text{attack}}$ and attacker ROI:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Financial &amp; Operational Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Booter Monthly Cost (C_attack):</span>
                  <span className="text-rose-400 font-bold font-mono">₹{booterMonthlyCost.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="35000"
                  step="500"
                  value={booterMonthlyCost}
                  onChange={(e) => setBooterMonthlyCost(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Service Downtime Duration:</span>
                  <span className="text-amber-400 font-bold font-mono">{downtimeHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={downtimeHours}
                  onChange={(e) => setDowntimeHours(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Hourly Business Revenue Loss:</span>
                  <span className="text-cyan-400 font-bold font-mono">₹{hourlyRevenueLoss.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="100000"
                  value={hourlyRevenueLoss}
                  onChange={(e) => setHourlyRevenueLoss(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>RDoS Extortion Ransom Demand:</span>
                  <span className="text-purple-400 font-bold font-mono">₹{ransomDemand.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="5000000"
                  step="250000"
                  value={ransomDemand}
                  onChange={(e) => setRansomDemand(parseInt(e.target.value))}
                  className="w-full accent-purple-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Always-On Anycast Cloud Scrubbing:</span>
                <button
                  onClick={() => setAnycastScrubbingActive(!anycastScrubbingActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    anycastScrubbingActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {anycastScrubbingActive ? "✔ ANYCAST SHIELD ACTIVE (0% Downtime)" : "❌ NO SCRUBBING (Full Downtime)"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Financial Telemetry &amp; Cost Asymmetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Total Defender Financial Losses</span>
                  <span className="text-lg font-extrabold text-rose-400">{economicSimulation.totalDefenderCost}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Downtime Loss: {economicSimulation.totalDowntimeLosses}</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Cost Asymmetry Ratio</span>
                  <span className="text-lg font-extrabold text-amber-400">{economicSimulation.costAsymmetryRatio}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Attacker ROI: {economicSimulation.attackerRoiPercent}</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", economicSimulation.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Economic Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{economicSimulation.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Booter Security Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Origin Cloaking &amp; Honeypot Ingest Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Origin Cloaking &amp; Honeypot Telemetry Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore production origin IP cloaking scripts, Python booter honeypot telemetry collectors, 
              and BGP Flowspec blackhole policies against bulletproof hosting providers:
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
                Production Config
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita defeat ₹40 Lakhs Diwali RDoS extortion, 
              trace bulletproof VPS hubs, and defend outpatient booking portals across West Bengal:
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
                  The Incident &amp; Booter Threat Vector
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
              7. Legal Penalties for Booter Use, Extortion &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, extortion provisions under the Indian Penal Code, and critical infrastructure statutes 
              strictly criminalize purchasing or operating DDoS-for-hire services with severe civil liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Renting booters to paralyze critical infrastructure carries <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IPC Section 384 &amp; IT Act 43(f)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">IPC Section 384:</strong> Ransom DoS (RDoS) extortion carries up to <span className="text-rose-400 font-bold">3 YEARS PRISON</span>.
                </li>
                <li>
                  <strong className="text-white">IT Act 43(f):</strong> Civil compensation up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for denial of access.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for persistent availability safeguards collapse.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> Booter cheating and fraud (Up to 7 years prison).
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
                  <strong>Believing Stresser Terms of Service Disclaimers Protect Users:</strong> Courts treat them as legally void.
                </li>
                <li>
                  <strong>Paying Ransom DoS (RDoS) Extortion Demands:</strong> Attackers often increase demands or sell victim IPs.
                </li>
                <li>
                  <strong>Leaking Origin IP through Historic DNS or Mail Headers:</strong> Allows booters to bypass cloud CDNs.
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
                  <strong>Deploy Always-On Cloud Scrubbing:</strong> Eliminates downtime losses and collapses attacker extortion ROI.
                </li>
                <li>
                  <strong>Enforce Strict Origin IP Cloaking (`iptables`):</strong> Restricts ingress traffic exclusively to CDN VIPs.
                </li>
                <li>
                  <strong>Report Incidents to CERT-In within 6 Hours:</strong> Satisfies statutory cybersecurity directives.
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
                  Why does a ₹2,000 booter subscription create over ₹50 Lakhs in financial losses for an un-scrubbed e-commerce business?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  Why did Operation PowerOFF prosecute not just booter administrators, but also retail subscribers using seized SQL attack logs?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Always-On Anycast Scrubbing and observe attacker extortion ROI collapse to -100.0%!
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
                <span>Booter services commercialize DDoS attacks into point-and-click web subscriptions.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Terms of Service 'stress testing' disclaimers are legally void without owner authorization.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Attacker cost (₹2,000/mo) vs defender cost (₹50 Lakhs) creates a 2,500x economic asymmetry.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Operation PowerOFF seized 48 booter domains and harvested SQL user transaction databases.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Origin IP cloaking drops direct-to-IP booter floods that attempt to bypass cloud CDNs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes Booter Cyber Terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Botnet Economics & Booter FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Stresser Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Botnet Economics: DDoS-for-Hire Services and Stressers (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: The industrialization of DDoS-for-hire services (commercial Booters and Stressers) represents one of the most critical structural challenges in cybersecurity, lowering the barrier to entry so that any non-technical individual can launch multi-hundred gigabit floods for ₹800 to ₹35,000 per month! Understand the 4-tier supply chain: Infrastructure miners compromise IoT botnets and rent bulletproof VPS hubs; Stresser platform developers build automated WHMCS billing portals; Telegram resellers distribute API access tokens; and retail script kiddies launch one-click assaults. Master the economic cost asymmetry: an attacker spending ₹2,000 inflicts over ₹50,00,000 in downtime losses, cloud scrubbing fees, and forensic response costs on the victim, creating an extreme 2,500:1 economic imbalance! Understand why fake 'stress-testing' Terms of Service disclaimers are legally void under global jurisprudence and Indian law, as demonstrated by Operation PowerOFF where law enforcement seized 48 booter domains and harvested SQL user databases to prosecute thousands of registered users. Master enterprise defense: deploy Always-On Anycast cloud scrubbing to eliminate downtime losses, enforce origin IP cloaking (`iptables`) restricting ingress to CDN VIPs, and report attacks to CERT-In within 6 hours. Remember that IPC Section 384 penalizes Ransom DoS (RDoS) extortion with up to 3 years imprisonment, and Section 66F of the IT Act treats booter cyber terrorism with Life Imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
