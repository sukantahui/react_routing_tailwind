import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

const Topic11 = () => {
  // Unique SVG IDs
  const svgTimelineId = useId();

  // Studio 1: Active Case Study Selection
  const [selectedCaseKey, setSelectedCaseKey] = useState("dyn_dns_2016_mirai");

  // Studio 2: Live Incident Response Timeline & RTI Calculator State
  const [incidentPeakVolume, setIncidentPeakVolume] = useState(1350); // 100 to 2500 Gbps
  const [elapsedMitigationMinutes, setElapsedMitigationMinutes] = useState(8); // 1 to 30 Minutes
  const [targetSlaMinutes, setTargetSlaMinutes] = useState(15); // 5 to 60 Minutes
  const [automatedDiversionEnabled, setAutomatedDiversionEnabled] = useState(true); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_github_playbook");

  // Studio 4: Case Study Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("dual_provider_dns_terraform");

  // 8 Historic DDoS Milestone Profiles for Studio 1
  const caseStudiesDatabase = {
    dyn_dns_2016_mirai: {
      key: "dyn_dns_2016_mirai",
      name: "1. 2016 Dyn DNS Outage (1.2 Tbps Mirai Botnet)",
      year: "October 21, 2016",
      category: "DNS SINGLE POINT OF FAILURE (SPOF)",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      peakVolume: "~1.2 Tbps & Millions of QPS",
      attackVector:
        "The Mirai botnet (~100k infected CCTV cameras/DVRs) bombarded Dyn's authoritative DNS servers with recursive DNS queries, TCP SYN, and UDP floods, knocking out Twitter, Netflix, Spotify, GitHub, and Amazon across the US and Europe.",
      architecturalLesson: "DNS Single Point of Failure (SPOF); forced the industry to adopt Dual-Provider Anycast DNS (Route 53 + Cloudflare).",
      mitigationTime: "Multiple Waves over 10 Hours",
      codeSnippet: `// Dyn DNS 2016 Architectural Takeaway:
// Flaw   : Single Authoritative DNS Provider (ns1.p01.dynect.net)
// Impact : Twitter, Netflix, Spotify, GitHub went dark globally!
// Remedy : Dual-Provider Anycast DNS (AWS Route 53 + Cloudflare Active-Active)`
    },
    github_memcached_2018: {
      key: "github_memcached_2018",
      name: "2. 2018 GitHub Memcached Reflection (1.35 Tbps)",
      year: "February 28, 2018",
      category: "UDP AMPLIFICATION (51,200x) & FAST SCRUBBING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      peakVolume: "1.35 Tbps & 126.9 Million PPS",
      attackVector:
        "Adversaries weaponized open Memcached servers on UDP port 11211 (51,200x multiplier) to launch a 1.35 Tbps flood; GitHub's automated systems engaged Akamai Prolexic Anycast scrubbers, restoring full service in 8 minutes.",
      architecturalLesson: "Automated BGP Anycast diversion within 5 minutes; disabling UDP by default (`-U 0`) in Memcached 1.5.6+.",
      mitigationTime: "8 Minutes Total (Automated Scrubbing SLA)",
      codeSnippet: `// GitHub 2018 8-Minute Mitigation Timeline:
// 17:21 UTC ➔ 1.35 Tbps Spike Detected by NetFlow Telemetry
// 17:26 UTC ➔ Automated BGP Anycast Shift to Akamai Prolexic
// 17:30 UTC ➔ 1.35 Tbps Scrubbed 100%; GitHub 100% Operational!`
    },
    aws_shield_cldap_2020: {
      key: "aws_shield_cldap_2020",
      name: "3. 2020 AWS Shield CLDAP Reflection (2.3 Tbps)",
      year: "February 2020",
      category: "RECORD VOLUMETRIC UDP AMPLIFICATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      peakVolume: "2.3 Tbps (Record for 2020)",
      attackVector:
        "Threat actors abused Connectionless LDAP (CLDAP) on UDP port 389 (70x multiplier) targeting an AWS customer; absorbed entirely by AWS Shield's automated global Anycast edge without customer downtime.",
      architecturalLesson: "Massive global Anycast scrubbing capacity (> 100 Tbps) absorbs multi-terabit floods seamlessly.",
      mitigationTime: "0 Seconds (Always-On Anycast Scrubbing)",
      codeSnippet: `// AWS Shield 2020 Record Defense:
// Attack Vector : CLDAP UDP Port 389 Reflection (70x Multiplier)
// Peak Volume   : 2.3 Tbps Ingress Bandwidth
// Mitigation    : Automated Anycast Ingestion across Global AWS PoPs`
    },
    google_cloud_46m_rps_2022: {
      key: "google_cloud_46m_rps_2022",
      name: "4. 2022 Google Cloud HTTPS Flood (46M RPS)",
      year: "June 2022",
      category: "ENCRYPTED LAYER 7 HTTPS BOTNET FLOOD",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      peakVolume: "46 Million Requests Per Second (RPS)",
      attackVector:
        "A 5,296-node botnet across 132 countries launched an encrypted HTTPS flood (equivalent to 10 days of Wikipedia traffic in seconds); mitigated by Google Cloud Armor ML Adaptive Protection.",
      architecturalLesson: "Machine Learning-driven Adaptive Protection auto-generates granular WAF rules to block Layer 7 floods in seconds.",
      mitigationTime: "Seconds (ML Auto-Generated WAF Rule)",
      codeSnippet: `// Google Cloud Armor 46M RPS ML Defense:
// Attack Vector : Encrypted HTTPS GET Floods via Residential Proxies
// Peak Request  : 46,000,000 RPS (All Wikipedia Daily Traffic in 10s!)
// Mitigation    : Cloud Armor ML Adaptive Protection Auto-Generated Rule`
    },
    http2_rapid_reset_2023: {
      key: "http2_rapid_reset_2023",
      name: "5. 2023 HTTP/2 Rapid Reset (398M RPS - CVE-2023-44487)",
      year: "August-October 2023",
      category: "PROTOCOL STREAM CANCELLATION EXPLOIT",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      peakVolume: "398 Million RPS (Historic L7 Record!)",
      attackVector:
        "Exploited HTTP/2 stream multiplexing by sending hundreds of thousands of concurrent HEADERS followed by instant RST_STREAM frames, generating 398M RPS from just 20,000 bot nodes against Google, Cloudflare, and AWS.",
      architecturalLesson: "Enforce strict HTTP/2 stream concurrency limits (`max_concurrent_streams = 128`) and RST frame rate limiting.",
      mitigationTime: "Immediate Edge Mitigation via Patched Proxies",
      codeSnippet: `// HTTP/2 Rapid Reset CVE-2023-44487 Defense:
// Vulnerability : HEADERS + Instant RST_STREAM Multiplexing Loop
// Peak Volume   : 398 Million RPS (Google Cloud Peak Record!)
// Defense       : http2_max_concurrent_streams 128; + RST Frame Rate Limiting`
    },
    krebs_security_mirai_2016: {
      key: "krebs_security_mirai_2016",
      name: "6. 2016 Krebs on Security Mirai Attack (620 Gbps)",
      year: "September 2016",
      category: "JOURNALIST & MEDIA FREEDOM ATTACK",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      peakVolume: "620 Gbps (GRE + SYN + HTTP)",
      attackVector:
        "Threat actors targeted investigative journalist Brian Krebs after he exposed commercial booter networks (vDos), generating 620 Gbps of traffic; protected by Google Project Shield at zero cost.",
      architecturalLesson: "Birth of free Anycast DDoS protection for civil society, journalists, and non-profits (Google Project Shield).",
      mitigationTime: "Migrated to Google Project Shield",
      codeSnippet: `// Krebs on Security 620 Gbps Profile:
// Target      : krebsonsecurity.com (Investigative Journalism)
// Volume      : 620 Gbps GRE & TCP SYN Flood
// Outcome     : Google Project Shield stepped in to provide free Anycast defense!`
    },
    spamhaus_cyberbunker_2013: {
      key: "spamhaus_cyberbunker_2013",
      name: "7. 2013 Spamhaus vs Cyberbunker (300 Gbps DNS)",
      year: "March 2013",
      category: "OPEN RECURSIVE DNS AMPLIFICATION",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      peakVolume: "300 Gbps (Historic Record for 2013)",
      attackVector:
        "Cyberbunker launched a 300 Gbps DNS reflection attack against Spamhaus using open recursive DNS resolvers (70x multiplier), congesting European Internet Exchange Points (LINX & AMS-IX).",
      architecturalLesson: "Highlighted the global threat of open DNS resolvers, spurring internet-wide remediation campaigns (Shadowserver).",
      mitigationTime: "Multi-Day Anycast Dilution via Cloudflare",
      codeSnippet: `// Spamhaus 2013 300 Gbps Attack:
// Vector      : DNS Amplification using Open Recursive Resolvers (Port 53)
// Volume      : 300 Gbps (Historic Record for 2013)
// Consequence : Congested London (LINX) & Amsterdam (AMS-IX) Internet Exchanges!`
    },
    estonia_cyberwarfare_2007: {
      key: "estonia_cyberwarfare_2007",
      name: "8. 2007 Estonia National Cyber Warfare Campaign",
      year: "April-May 2007",
      category: "FIRST GEOPOLITICAL NATION-STATE DDoS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      peakVolume: "~100 Mbps (Historic for 2007)",
      attackVector:
        "Following political disputes in Tallinn, botnets flooded Estonia's parliament, banks, and newspapers with distributed ping and HTTP floods for 3 weeks, paralyzing online banking nationwide.",
      architecturalLesson: "First national-scale DDoS attack in human history; triggered the creation of NATO's CCDCOE cyber defense center.",
      mitigationTime: "3 Weeks of Geopolitical Warfare",
      codeSnippet: `// Estonia 2007 National Cyber Warfare Milestone:
// Target      : Republic of Estonia (Government, Parliamentary, Banking Portals)
// Vector      : Distributed Ping Floods & Botnet HTTP Swarms (3 Weeks)
// Outcome     : Established NATO Cooperative Cyber Defence Centre of Excellence (CCDCOE)`
    }
  };

  const activeCase = caseStudiesDatabase[selectedCaseKey];

  // Studio 2: Live Incident Response Timeline & Recovery Time Index (RTI) Calculations
  const simulationResults = useMemo(() => {
    // 1. Recovery Time Index (RTI):
    // RTI = elapsedMitigationMinutes / targetSlaMinutes
    let effectiveElapsedMinutes = elapsedMitigationMinutes;
    if (automatedDiversionEnabled) {
      effectiveElapsedMinutes = Math.min(5, elapsedMitigationMinutes); // Capped at 5 mins with automation
    }

    const rti = (effectiveElapsedMinutes / targetSlaMinutes).toFixed(2);
    const rtiNum = parseFloat(rti);

    // 2. Enterprise Availability Resilience:
    // If RTI <= 1.0 ➔ 100.0% Resilience; If RTI > 1.0 ➔ Resilience drops
    let resiliencePct = 100.0;
    if (rtiNum > 1.0) {
      resiliencePct = Math.max(0, 100.0 - (rtiNum - 1.0) * 50.0);
    }

    return {
      effectiveElapsedMinutes,
      rti,
      resiliencePct: resiliencePct.toFixed(1),
      badgeClass: rtiNum <= 1.0
        ? "bg-emerald-950 text-emerald-300 border-emerald-800"
        : rtiNum <= 1.5
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-rose-950 text-rose-300 border-rose-800",
      statusMessage: automatedDiversionEnabled
        ? `AUTOMATED BGP ANYCAST PLAYBOOK ACTIVE: Traffic shifted to cloud scrubbers in ${effectiveElapsedMinutes} minutes (RTI = ${rti} <= 1.0); Enterprise Availability Resilience is 100.0%, fully satisfying the ${targetSlaMinutes}-minute SLA!`
        : rtiNum <= 1.0
        ? `INCIDENT MITIGATED WITHIN SLA: Manual response completed in ${effectiveElapsedMinutes} minutes (RTI = ${rti} <= 1.0); Resilience is 100.0%!`
        : `DISASTER RECOVERY SLA BREACHED: Mitigation took ${effectiveElapsedMinutes} minutes exceeding the ${targetSlaMinutes}-minute SLA (RTI = ${rti} > 1.0); Resilience dropped to ${resiliencePct.toFixed(1)}%!`
    };
  }, [incidentPeakVolume, elapsedMitigationMinutes, targetSlaMinutes, automatedDiversionEnabled]);

  // Studio 4: Case Study Production Code Database
  const codeDatabase = {
    dual_provider_dns_terraform: {
      name: "Terraform Dual-Provider Anycast DNS Architecture (Eliminating Dyn 2016 SPOF)",
      code: `# Dual-Provider Redundant Anycast DNS Configuration (Defeating Dyn 2016 SPOF):

# 1. Primary DNS Provider: AWS Route 53 Anycast Mesh
resource "aws_route53_zone" "primary_zone" {
  name = "fintech-kolkata.in"
}

resource "aws_route53_record" "api_endpoint_aws" {
  zone_id = aws_route53_zone.primary_zone.zone_id
  name    = "api.fintech-kolkata.in"
  type    = "A"
  ttl     = 300
  records = ["103.25.10.50"]
}

# 2. Secondary DNS Provider: Cloudflare Global Anycast Mesh
resource "cloudflare_zone" "secondary_zone" {
  account_id = var.cloudflare_account_id
  name       = "fintech-kolkata.in"
}

resource "cloudflare_record" "api_endpoint_cf" {
  zone_id = cloudflare_zone.secondary_zone.id
  name    = "api"
  type    = "A"
  value   = "103.25.10.50"
  ttl     = 300
  proxied = true
}

# Result: If AWS Route 53 is hit with 1.2 Tbps flood, recursive resolvers seamlessly resolve via Cloudflare!`,
      explanation: "Terraform configuration provisioning redundant, dual-provider Anycast DNS zones on AWS Route 53 and Cloudflare, completely eliminating DNS single points of failure like the 2016 Dyn DNS blackout."
    },
    python_bgp_diversion_script: {
      name: "Python Automated BGP Diversion Script (Replicating GitHub 2018 5-Minute Playbook)",
      code: `# Python Automated BGP Anycast Diversion Script (Replicating GitHub 2018 5-Minute Recovery):
import netmiko
import time

def trigger_automated_bgp_diversion(router_ip, victim_prefix):
    print(f"[*] ALERT: 1.35 Tbps Flood Detected on Prefix {victim_prefix}!")
    print("[*] Initiating Automated BGP Anycast Diversion to Cloud Scrubbing Center...")
    
    device = {
        "device_type": "cisco_ios",
        "ip": router_ip,
        "username": "admin",
        "password": "SecuredPassword2026!"
    }
    
    commands = [
        "router bgp 65001",
        f"neighbor 103.25.10.2 route-map DIVERT-TO-SCRUBBER out",
        "clear ip bgp * soft out"
    ]
    
    with netmiko.ConnectHandler(**device) as net_connect:
        output = net_connect.send_config_set(commands)
        print(output)
        
    print("[✔] SUCCESS: Traffic Diverted to Cloud Scrubber in 4.2 Minutes (Recovery SLA Satisfied)!")

if __name__ == "__main__":
    trigger_automated_bgp_diversion("103.25.10.1", "103.25.10.0/24")`,
      explanation: "Python automation script that connects to edge border routers upon NetFlow alarm trigger, shifting BGP prefix advertisements to cloud scrubbing centers within 5 minutes, replicating GitHub's historic 8-minute recovery SLA."
    },
    nginx_rapid_reset_conf: {
      name: "Nginx HTTP/2 Rapid Reset (CVE-2023-44487) Mitigation Configuration",
      code: `# Nginx HTTP/2 Rapid Reset (CVE-2023-44487) Hardening Configuration:
http {
    # 1. Cap Maximum Concurrent Multiplexed HTTP/2 Streams
    http2_max_concurrent_streams 128; # Default is often 128, explicitly enforce!
    
    # 2. Disable HTTP/2 Server Push to Reduce Memory Consumption
    http2_max_concurrent_pushes 0;
    
    # 3. Buffer Allocation Controls for Stream Multiplexing
    http2_body_preread_size 64k;
    http2_max_field_size 16k;
    http2_max_header_size 32k;
    
    server {
        listen 443 ssl http2;
        server_name kolkata-fintech.in;
        
        # Patched Nginx automatically terminates connections generating excessive RST_STREAM frames!
        location / {
            proxy_pass http://backend_pool;
        }
    }
}`,
      explanation: "Nginx configuration hardening HTTP/2 stream multiplexing by capping concurrent streams to 128 and disabling server pushes, neutralizing HTTP/2 Rapid Reset stream cancellation flood loops."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_github_playbook",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Executing the GitHub 8-Minute Playbook Against a 1.1 Tbps UDP Reflection Assault",
      threatType: "MEMCACHED & UDP AMPLIFICATION ASSAULT (1.1 Tbps Ingress Flood)",
      budget: "₹89,00,000",
      incident:
        "An adversary launched an 1.1 Tbps UDP reflection flood targeting the payment gateway during evening interbank settlement closing.",
      defenseStrategy:
        "Mamata executed the automated GitHub BGP Anycast diversion playbook, shifting ingress traffic to cloud scrubbers in 4.5 minutes.",
      outcome: "1.1 Tbps flood absorbed in silicon; 0% transaction loss; ₹3,800 Crores in UPI and RTGS settlements completed on schedule.",
      metrics: {
        attackPeakBandwidth: "1,100.0 Gbps (1.1 Tbps)",
        recoveryDuration: "4.5 Minutes (SLA < 15m)",
        settlementVolumeProtected: "₹3,800 Crores",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_dual_dns",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "DNS SPOF OUTAGE & SCADA TELEMETRY RESOLUTION THREAT",
      title: "Eliminating DNS Single Points of Failure via Dual-Provider Anycast DNS",
      budget: "₹57,00,000",
      incident:
        "A Mirai botnet flood hit the primary DNS provider for the state power grid, threatening to prevent substations from resolving telemetry API gateways.",
      defenseStrategy:
        "Debangshu deployed a Dual-Provider Anycast DNS architecture (AWS Route 53 + Cloudflare), enabling seamless automatic resolution failover.",
      outcome: "Substation RTUs resolved telemetry endpoints with 0.0 ms disruption; 100% regional power stability across North 24 Parganas.",
      metrics: {
        dnsResolutionUptime: "100.0% (Zero SPOF)",
        substationsHardened: "18 High-Voltage Nodes",
        telemetryDelay: "0.0 ms impact",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_rapid_reset",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "HTTP/2 RAPID RESET STREAM CANCEL FLOOD (300,000 RPS Attack)",
      title: "Mitigating HTTP/2 Rapid Reset Floods on Oncology Patient Booking Gateways",
      budget: "₹42,00,000",
      incident:
        "An automated botnet exploited HTTP/2 stream cancellations (CVE-2023-44487) with 300,000 RPS to crash the hospital's chemotherapy appointment servers.",
      defenseStrategy:
        "Mahima deployed Nginx stream concurrency caps (`max_concurrent_streams = 128`) and WAF RST frame rate limiters.",
      outcome: "Rapid Reset flood dropped at the proxy edge with 0% backend CPU impact; 120,000 oncology patient records protected.",
      metrics: {
        streamCancellationDropped: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_case_study_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "HISTORICAL DDOS EVOLUTION & RECOVERY TIME INDEX (RTI) MODELING",
      title: "Formulating the Historical Mitigation Recovery Time Index in IEEE Transactions",
      budget: "₹34,00,000",
      incident:
        "Researchers modeled the evolution of DDoS mitigation efficiency across 8 historic milestones from 2007 to 2023.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical proof in IEEE Transactions, demonstrating that automated Anycast diversion drives RTI to 0.30.",
      outcome: "Published peer-reviewed mathematical proof; verified across 200,000 simulated disaster recovery scenarios.",
      metrics: {
        simulationTrials: "200,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Recovery Time Index (RTI) Formulation",
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
                Topic 11
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              DDoS Attack Case Studies (Dyn DNS, GitHub DDoS Mitigation)
            </h1>
            <p className="text-xs text-gray-400">
              Dyn DNS 2016 SPOF, GitHub 2018 1.35 Tbps Memcached 8-min recovery, HTTP/2 Rapid Reset 2023, and IT Act Section 66F.
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
              Historical Milestones &amp; Architectural Evolution
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Evolution of Real-World DDoS: From 2007 Nation-State Attacks to 398M RPS Rapid Reset
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Analyzing historical DDoS incidents provides invaluable engineering lessons in infrastructure resilience, 
              incident response automation, and architectural redundancy. In <strong>October 2016</strong>, the <strong>Dyn DNS Outage (~1.2 Tbps Mirai Botnet)</strong> 
              exposed the catastrophic vulnerability of <strong>DNS Single Point of Failure (SPOF)</strong>, taking down Twitter, Netflix, Spotify, and GitHub. 
              In <strong>February 2018</strong>, <strong>GitHub's 1.35 Tbps Memcached Reflection Attack</strong> set a global benchmark for automated incident response, 
              engaging Akamai Prolexic Anycast scrubbers and achieving full recovery in just <strong>8 minutes</strong>. 
              In <strong>2023</strong>, <strong>HTTP/2 Rapid Reset (CVE-2023-44487)</strong> shattered all Layer 7 records with <strong>398 Million RPS</strong> 
              stream cancellation floods. These milestones prove that modern resilience requires <strong>Dual-Provider Anycast DNS</strong>, 
              <strong>Automated BGP Diversion Playbooks</strong>, and <strong>Hardware Silicon Scrubbing</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dyn & GitHub Contrast Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                Dyn DNS (2016) vs GitHub (2018)
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                Dyn 2016: Single DNS Provider ➔ Global Blackout | GitHub 2018: Automated Anycast ➔ 8-Min Recovery!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Dyn exposed the danger of architectural centralization; GitHub demonstrated the triumph of automated cloud scrubbing and fast BGP Anycast diversion.
              </p>
            </div>

            {/* Rapid Reset & Modern Lessons Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                HTTP/2 Rapid Reset &amp; Architectural Mandates
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Dual-Provider DNS:</strong> Route 53 + Cloudflare eliminates DNS single points of failure.</li>
                <li>• <strong className="text-purple-300">HTTP/2 Stream Limits:</strong> `max_concurrent_streams = 128` blocks Rapid Reset loops.</li>
                <li>• <strong className="text-amber-300">Memcached Remediation:</strong> Disabling UDP (`-U 0`) eliminated 51,200x reflection vectors.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Historical Timeline Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Historical DDoS Evolution Timeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing the Exponential Growth of DDoS: 2007 Estonia to 2023 Rapid Reset
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how attack volumes exploded from 100 Mbps ping floods in 2007 to multi-terabit Memcached reflection and 398 Million RPS Layer 7 floods in 2023:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* MILESTONE 1: 2007 ESTONIA */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. 2007 ESTONIA
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  100 Mbps Ping Flood
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  FIRST NATION WAR:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Paralyzed Banks
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Created NATO CCDCOE
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* MILESTONE 2: 2016 DYN DNS */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. 2016 DYN DNS
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  1.2 Tbps Mirai Botnet
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  DNS SPOF OUTAGE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Twitter, Netflix Down
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Dual-Provider DNS Born!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* MILESTONE 3: 2018 GITHUB MEMCACHED */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. 2018 GITHUB
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  1.35 Tbps Memcached
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  8-MIN RECOVERY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Automated BGP Shift
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Akamai Anycast Scrub!
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* MILESTONE 4: 2020 AWS 2.3 TBPS */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. 2020 AWS SHIELD
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  2.3 Tbps CLDAP Flood
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TERABIT EDGE:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Always-On Ingestion
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  0-Second Disruption!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* MILESTONE 5: 2023 RAPID RESET */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. 2023 RAPID RESET
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  398M RPS (HTTP/2)
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  CVE-2023-44487:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Stream Reset Abuse
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  Fixed in Web Proxies!
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
              3. Historic DDoS Attack Case Study Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a historic DDoS milestone below to examine its timeline, peak volume, attack mechanics, 
              architectural lessons learned, and mitigation SLA:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(caseStudiesDatabase).map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedCaseKey(item.key)}
                className={clsx(
                  "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between text-xs space-y-2",
                  selectedCaseKey === item.key
                    ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-950/50"
                    : "bg-[#0c101c] border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-200"
                )}
              >
                <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded border bg-rose-950 text-rose-300 border-rose-800 self-start">
                  {item.year.split(" ")[0]}
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
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Date: {activeCase.year}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-bold font-mono">
                    Peak: {activeCase.peakVolume}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{activeCase.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                    Attack Mechanics &amp; Global Impact
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeCase.attackVector}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
                    Mitigation Timeline &amp; SLA Benchmark
                  </span>
                  <p className="text-gray-300 leading-relaxed font-semibold">{activeCase.mitigationTime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                    Architectural Lesson Learned
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeCase.architecturalLesson}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Configuration Syntax Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeCase.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Recovery Time Index (RTI) Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Incident Response Recovery Time Index (RTI) Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust attack volume V_attack, manual mitigation activation time, target disaster recovery SLA,
              and toggle automated BGP diversion to model the Recovery Time Index RTI = (T_active - T_onset) / SLA_rec and Enterprise Availability Resilience:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Incident Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Attack Peak Volume:</span>
                  <span className="text-rose-400 font-bold font-mono">{incidentPeakVolume} Gbps</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={incidentPeakVolume}
                  onChange={(e) => setIncidentPeakVolume(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Manual Mitigation Elapsed Time:</span>
                  <span className="text-amber-400 font-bold font-mono">{elapsedMitigationMinutes} Minutes</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={elapsedMitigationMinutes}
                  onChange={(e) => setElapsedMitigationMinutes(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Disaster Recovery SLA Target:</span>
                  <span className="text-cyan-400 font-bold font-mono">{targetSlaMinutes} Minutes</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={targetSlaMinutes}
                  onChange={(e) => setTargetSlaMinutes(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block">Automated BGP Anycast Diversion Playbook:</span>
                <button
                  onClick={() => setAutomatedDiversionEnabled(!automatedDiversionEnabled)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    automatedDiversionEnabled
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {automatedDiversionEnabled ? "✔ AUTOMATED SHIFT (< 5 Mins)" : "MANUAL RESPONSE DELAY"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Recovery Index &amp; Resilience Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Recovery Time Index (RTI)</span>
                  <span className="text-lg font-extrabold text-cyan-400">{simulationResults.rti}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Target: RTI &le; 1.0 (Optimal)</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Enterprise Availability Resilience</span>
                  <span className="text-lg font-extrabold text-emerald-400">{simulationResults.resiliencePct}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Elapsed Time: {simulationResults.effectiveElapsedMinutes} Mins</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">Playbook Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Case Study Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Dual DNS, Python BGP &amp; Rapid Reset Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Terraform Dual Anycast DNS &amp; Python BGP Diversion Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore Terraform dual-provider Anycast DNS architectures eliminating Dyn 2016 SPOF risks, 
              Python automated BGP diversion scripts replicating GitHub's 8-minute recovery SLA, and Nginx HTTP/2 Rapid Reset patches:
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita execute the GitHub 8-minute playbook for Kolkata payment gateways, 
              deploy Dual-Provider DNS for Barrackpore power grids, and mitigate Rapid Reset floods across West Bengal:
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
                  The Incident &amp; Multi-Terabit Threat
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
              7. Legal Penalties for Historic Scale DDoS Attacks in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              strictly penalize launching multi-terabit volumetric or botnet DDoS attacks with severe civil liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Multi-terabit attacks on critical infrastructure carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 43(f) &amp; 70
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 43(f):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for denial of access.
                </li>
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems DDoS (Up to 10 years prison).
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IPC 420
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for single-point-of-failure negligence.
                </li>
                <li>
                  <strong className="text-white">IPC Section 420:</strong> DDoS extortion fraud (Up to 7 years prison).
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
                  <strong>Relying on a Single Authoritative DNS Provider:</strong> Vulnerable to complete outage if attacked (Dyn 2016).
                </li>
                <li>
                  <strong>Leaving UDP Enabled on Public Caching Servers:</strong> Vulnerable to 51,200x Memcached amplification abuse.
                </li>
                <li>
                  <strong>Relying on Manual BGP Route Changes:</strong> Takes 30+ minutes instead of automated 5-minute diversion.
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
                  <strong>Deploy Dual-Provider Anycast DNS (Route 53 + Cloudflare):</strong> Guarantees 100% DNS availability.
                </li>
                <li>
                  <strong>Automate BGP Anycast Diversion Playbooks:</strong> Replicates GitHub's historic 8-minute recovery SLA.
                </li>
                <li>
                  <strong>Harden HTTP/2 Web Proxies:</strong> Caps concurrent multiplexed streams to 128 to block Rapid Reset.
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
                  Why did the 2016 Dyn DNS attack take down Netflix and Amazon even though their origin web servers were running with zero issues?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How did GitHub achieve a 100% recovery in under 8 minutes when attacked by the largest 1.35 Tbps Memcached flood in history?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Automated BGP Anycast Diversion and observe Recovery Time Index collapse to under 0.50!
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
                <span>The 2016 Dyn DNS attack took down Twitter, Netflix, and GitHub due to DNS Single Point of Failure.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dual-Provider Anycast DNS (Route 53 + Cloudflare) permanently eliminates single-provider DNS SPOFs.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>GitHub mitigated a historic 1.35 Tbps Memcached flood in 8 minutes using automated Akamai scrubbing.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Memcached reflection was globally remediated by disabling UDP by default (`-U 0`) in Memcached 1.5.6+.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>HTTP/2 Rapid Reset (CVE-2023-44487) generated 398 Million RPS floods by abusing stream cancellations.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F of the IT Act penalizes multi-terabit DDoS cyber terrorism with Life Imprisonment.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="DDoS Attack Case Studies FAQs"
            subtitle="30 Moderate to Expert Practice Questions & Historical Milestone Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="DDoS Attack Case Studies (Dyn DNS, GitHub DDoS Mitigation) (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Analyzing real-world historic DDoS case studies is the ultimate test of cybersecurity education, transforming theoretical knowledge into battle-tested architectural wisdom! Master the 5 historic milestones: 1. Dyn DNS (October 2016): Mirai IoT botnets generated ~1.2 Tbps against Dyn's authoritative name servers, taking down Twitter, Netflix, Spotify, and GitHub due to DNS Single Point of Failure (SPOF); the permanent industry remedy was Dual-Provider Redundant Anycast DNS (AWS Route 53 + Cloudflare); 2. GitHub Memcached (February 2018): Attackers weaponized open Memcached UDP port 11211 (51,200x multiplier) for a record 1.35 Tbps (126.9 Mpps) flood; GitHub executed an automated BGP Anycast diversion playbook to Akamai Prolexic scrubbers in 5 minutes, achieving full recovery in 8 minutes with zero data corruption; 3. AWS Shield (February 2020): Mitigated a 2.3 Tbps CLDAP reflection flood seamlessly using global Anycast edge ingestion; 4. Google Cloud (June 2022): Mitigated a 46 Million RPS HTTPS flood using Adaptive ML WAF protection; 5. HTTP/2 Rapid Reset (CVE-2023-44487, Fall 2023): Generated 398 Million RPS floods abusing HTTP/2 stream multiplexing and instant RST_STREAM frames, remediated by capping `max_concurrent_streams = 128` and RST rate limiting. Remember that Section 70 of the Indian IT Act penalizes attacks on designated Protected Systems with up to 10 years imprisonment, and Section 66F treats multi-terabit DDoS cyber terrorism against national infrastructure with Life Imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
