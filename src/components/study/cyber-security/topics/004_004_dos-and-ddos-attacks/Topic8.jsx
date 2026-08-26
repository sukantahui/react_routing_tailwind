import React, { useState, useMemo, useId } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

const Topic8 = () => {
  // Unique SVG IDs
  const svgCniiId = useId();

  // Studio 1: Active Infrastructure Threat Vector Selection
  const [selectedThreatKey, setSelectedThreatKey] = useState("power_grid_scada_relays");

  // Studio 2: Live Cascading Failure & EDoS Cloud Billing Calculator State
  const [attackRps, setAttackRps] = useState(25000); // 1,000 to 100,000 RPS
  const [attackDurationHours, setAttackDurationHours] = useState(6); // 1 to 24 Hours
  const [cloudScalingModel, setCloudScalingModel] = useState("uncapped_autoscaling"); // uncapped_autoscaling vs capped_hardlimit (max 20)
  const [telecomFailureRate, setTelecomFailureRate] = useState(35); // 0 to 90%
  const [powerGridFailureRate, setPowerGridFailureRate] = useState(40); // 0 to 90%
  const [bankingFailureRate, setBankingFailureRate] = useState(50); // 0 to 90%
  const [oobIsolationActive, setOobIsolationActive] = useState(false); // Boolean

  // Studio 3: Regional West Bengal Case Scenario State
  const [activeScenarioId, setActiveScenarioId] = useState("kolkata_fintech_rtgs_defense");

  // Studio 4: Critical Infrastructure Code Tab Selection
  const [activeCodeTab, setActiveCodeTab] = useState("terraform_autoscaling_edos_cap");

  // 8 Critical Infrastructure & Cloud Profiles for Studio 1
  const infrastructureDatabase = {
    power_grid_scada_relays: {
      key: "power_grid_scada_relays",
      name: "1. 220kV Electrical Substation SCADA Protection Relays",
      category: "KINETIC POWER GRID IMPACT",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      cniiSector: "Power & Energy (NCIIPC Core)",
      statutorySection: "Section 70 IT Act (Protected System)",
      exploitationVector:
        "Flooding substation boundary routers with 10 Gbps traffic delays IEC 61850 GOOSE trip signals beyond the 4-millisecond safety limit; protection relays fail to clear short circuits, melting ₹10 Crore transformers.",
      vulnerabilityImpact:
        "Triggers regional cascading blackouts across North 24 Parganas, cutting electricity to hospitals, water treatment plants, and railway signaling.",
      telemetryIndicator: "Surge in jitter and round-trip latency (> 500ms) on IEC 60870-5-104 telemetry streams accompanied by router buffer queue drops",
      resilientDefense: "Deploying Out-of-Band (OOB) OPGW Dark Fiber lines along transmission towers and configuring Cisco QoS DSCP Expedited Forwarding (`EF`).",
      codeSnippet: `// SCADA Telemetry Timing Constraints:
// IEC 61850 GOOSE Trip Signal SLA: < 4.0ms (Mandatory to isolate short circuit)
// Ingress DDoS Router Delay        : 4,500ms (10 Gbps volumetric saturation)
// Consequence                     : Protection Relay fails ➔ Transformer melts!`
    },
    bfsi_upi_rtgs_switches: {
      key: "bfsi_upi_rtgs_switches",
      name: "2. BFSI UPI & RTGS National Interbank Clearing Switches",
      category: "FINANCIAL SECTOR PARALYSIS",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      cniiSector: "Banking, Financial Services & Insurance",
      statutorySection: "Section 70 IT Act & RBI Master Direction",
      exploitationVector:
        "Flooding core banking API gateways with 500k RPS Layer 7 requests starves database connection pools, causing Real-Time Gross Settlement (RTGS) and UPI clearing timeouts.",
      vulnerabilityImpact:
        "Paralyzes billions of Rupees in corporate trade settlements, retail transactions, and ATM networks across West Bengal banks.",
      telemetryIndicator: "Spike in HTTP 504 Gateway Timeouts on `/api/v1/upi/pay` and connection pool exhaustion in HikariCP / pgpool logs",
      resilientDefense: "BGP Anycast routing dilution across 300 global PoPs, Token Bucket rate limiting, and private MPLS interbank clearing rings.",
      codeSnippet: `// BFSI Interbank Gateway Flood:
// Target: /api/v1/rtgs/settlement-clearing
// Volume: 500,000 RPS Distributed Residential Proxy HTTP Flood
// Consequence: Interbank settlement timeout ➔ ₹2,500 Crores in pending transactions locked!`
    },
    submarine_cable_landing: {
      key: "submarine_cable_landing",
      name: "3. Submarine Cable Landing Stations (CLS) & Tier-1 IXPs",
      category: "NATIONAL TELECOM BACKBONE SATURATION",
      categoryBadge: "bg-cyan-950 text-cyan-300 border-cyan-800",
      cniiSector: "Telecommunications & Internet Infrastructure",
      statutorySection: "Section 70 & 70A IT Act",
      exploitationVector:
        "Targeting BGP transit routers at submarine landing stations (Mumbai, Chennai) with multi-terabit amplification floods chokes international internet bandwidth for the entire subcontinent.",
      vulnerabilityImpact:
        "Degrades international cloud access, financial trade gateways, and global SaaS application access nationwide.",
      telemetryIndicator: "Severe packet loss on BGP border peering sessions and massive congestion at National Internet Exchange of India (NIXI) nodes",
      resilientDefense: "National-scale BGP Flowspec (RFC 5575) scrubbing at Tier-1 carrier backbones and Anycast traffic diversion.",
      codeSnippet: `// Strategic Submarine Cable Landing Stations:
// Hubs: Mumbai (VSNL/SMC), Chennai (SMW4), Kochi (SEA-ME-WE 3)
// Attack: 2.5 Tbps Multi-Protocol Reflection Flood targeting Gateway BGP IP
// Defense: BGP Flowspec Scrubbing at NIXI Core Routers!`
    },
    transport_railway_prs: {
      key: "transport_railway_prs",
      name: "4. Railway Passenger Reservation System (PRS) & ADS-B",
      category: "TRANSPORTATION SYSTEM GRIDLOCK",
      categoryBadge: "bg-emerald-950 text-emerald-300 border-emerald-800",
      cniiSector: "Transport & Civil Aviation",
      statutorySection: "Section 70 IT Act & NCIIPC Transport Directive",
      exploitationVector:
        "Flooding the IRCTC reservation gateway during peak Tatkal booking windows (10:00 AM) causes transaction lockups, blocking citizen emergency travel and inflicting heavy revenue losses.",
      vulnerabilityImpact:
        "Gridlocks public railway travel bookings and disrupts air traffic telemetry radar data feeds across eastern regional airports.",
      telemetryIndicator: "Abnormal surge in concurrent HTTP POST sessions on `/tatkal/reserve` accompanied by database lock contention",
      resilientDefense: "Cloud WAF with behavioral bot detection, CAPTCHA rate shaping, and dedicated private fiber for air traffic ADS-B telemetry.",
      codeSnippet: `// Railway PRS Tatkal Window Attack:
// Window : 10:00 AM - 11:00 AM Tatkal Booking
// Attack : 200,000 RPS Headless Bot Flood
// Impact : 150,000 citizens locked out of emergency train bookings!`
    },
    healthcare_icu_telemetry: {
      key: "healthcare_icu_telemetry",
      name: "5. Healthcare ICU Patient Life-Safety Telemetry (IoMT)",
      category: "HUMAN LIFE-SAFETY THREAT",
      categoryBadge: "bg-amber-950 text-amber-300 border-amber-800",
      cniiSector: "Healthcare & Emergency Services",
      statutorySection: "Section 70 IT Act & DPDP Act 2023 Section 8(5)",
      exploitationVector:
        "Flooding hospital internal wireless access points and central telemetry servers disrupts real-time ECG and oxygen alarms, preventing nurses from receiving critical cardiac arrest alerts.",
      vulnerabilityImpact:
        "Direct life-safety hazard resulting in delayed clinical emergency responses and potential patient fatalities in oncology and trauma centers.",
      telemetryIndicator: "Sudden drop in received heartbeat telemetry packets on port 8443 TLS streams accompanied by AP queue overflow",
      resilientDefense: "Air-gapped clinical VLANs with strict QoS priority, dedicated IoMT network switches, and local hardware fail-safe alarms.",
      codeSnippet: `// Healthcare IoMT Life-Safety Risk:
// Target: Central ICU Nursing Telemetry Stream (Port 8443 TLS)
// Attack: 50,000 RPS Layer 7 Flood ➔ 100% Telemetry Packet Drop
// Clinical Result: Critical Arrhythmia Alarm fails to reach Nursing Station!`
    },
    aadhaar_uidai_auth_mesh: {
      key: "aadhaar_uidai_auth_mesh",
      name: "6. Aadhaar UIDAI Authentication Mesh (80M Daily Auth)",
      category: "NATIONAL CITIZEN IDENTITY AT RISK",
      categoryBadge: "bg-indigo-950 text-indigo-300 border-indigo-800",
      cniiSector: "Government & Public Administration",
      statutorySection: "Section 70 IT Act (Designated Protected System)",
      exploitationVector:
        "Flooding Aadhaar biometric and OTP authentication endpoints halts identity verification for food grain distribution (PDS), banking KYC, and passport services.",
      vulnerabilityImpact:
        "Disrupts essential citizen public distribution services and halts nationwide digital financial onboarding.",
      telemetryIndicator: "Surge in authentication queue depth and HSM cryptographic processor utilization reaching 100%",
      resilientDefense: "Geo-redundant Anycast data centers (Manesar, Bengaluru), cryptographic HSM load balancing, and strict per-AUA rate limits.",
      codeSnippet: `// UIDAI Critical Authentication Resilience Metric:
// Daily Transactions : > 80 Million Biometric & OTP Requests
// Availability SLA   : 99.999% (Five Nines)
// Ingress Protection : Multi-Terabit Anycast Scrubbing across Geo-Redundant PoPs`
    },
    cloud_multitenant_noisy_neighbor: {
      key: "cloud_multitenant_noisy_neighbor",
      name: "7. Cloud Multi-Tenant Collateral Damage (Noisy Neighbor)",
      category: "SHARED INFRASTRUCTURE COLLAPSE",
      categoryBadge: "bg-rose-950 text-rose-300 border-rose-800",
      cniiSector: "Cloud Computing & Data Centers",
      statutorySection: "CERT-In Mandatory Directions 2022",
      exploitationVector:
        "A 1 Tbps flood targeting Tenant A saturates shared physical Top-of-Rack (ToR) switches and hypervisor NAT gateways, causing innocent Tenants B and C to suffer complete outages.",
      vulnerabilityImpact:
        "Causes unexpected service collapse for unrelated businesses sharing the same physical cloud availability zone.",
      telemetryIndicator: "High packet loss on virtual network interfaces (vNIC) despite near-zero incoming traffic to the specific tenant VM",
      resilientDefense: "Deploying AWS Dedicated Hosts, isolated Virtual Private Clouds (VPC), and hardware-isolated Direct Connect circuits.",
      codeSnippet: `// Cloud Multi-Tenant Collateral Damage:
// Target: Tenant A (Crypto App) ➔ Receives 1 Tbps Flood
// Shared Resource: Physical Top-of-Rack Switch & NAT Gateway
// Collateral Victims: Tenant B (Kolkata Hospital) suffers 95% packet drops!`
    },
    economic_denial_of_sustainability: {
      key: "economic_denial_of_sustainability",
      name: "8. Economic Denial of Sustainability (EDoS Cloud Billing)",
      category: "FINANCIAL BANKRUPTCY VIA AUTO-SCALING",
      categoryBadge: "bg-purple-950 text-purple-300 border-purple-800",
      targetEcosystem: "Cloud Auto-Scaling Groups (AWS / Azure)",
      statutorySection: "DPDP Act Section 8(5) & IT Act 43(f)",
      exploitationVector:
        "Sending continuous moderate-rate Layer 7 traffic forces cloud auto-scalers to spin up hundreds of EC2 instances, bankrupting the business with ₹45 Lakh monthly hosting bills.",
      vulnerabilityImpact:
        "Forces viable startups and digital health apps to shut down due to financial bankruptcy while the application technically remains online.",
      telemetryIndicator: "Exponential growth in auto-scaling group instance counts and billing alarms triggering without legitimate user traffic growth",
      resilientDefense: "Enforcing strict auto-scaling hard caps (`max_size = 20`) and configuring automated billing circuit breakers.",
      codeSnippet: `// EDoS Cloud Financial Explosion:
// Ingress Rate : 50,000 req/s (Moderate Layer 7 Traffic)
// Auto-Scaler  : Scales from 5 EC2 instances ➔ 500 EC2 instances
// Consequence  : Service remains online, but monthly AWS bill explodes to ₹45,00,000!`
    }
  };

  const activeThreat = infrastructureDatabase[selectedThreatKey];

  // Studio 2: Live Cascading Failure & EDoS Cloud Billing Calculations
  const simulationResults = useMemo(() => {
    // 1. Cascading Interdependency Failure Probability:
    // P_cascade = 1 - (1 - p_telecom)(1 - p_power)(1 - p_banking)
    let pTelecom = telecomFailureRate / 100.0;
    let pPower = powerGridFailureRate / 100.0;
    let pBanking = bankingFailureRate / 100.0;

    if (oobIsolationActive) {
      pTelecom = 0.0;
      pPower = 0.0;
      pBanking = 0.0;
    }

    const pCascade = (1.0 - (1.0 - pTelecom) * (1.0 - pPower) * (1.0 - pBanking)) * 100.0;
    const resiliencyIndex = (100.0 - pCascade).toFixed(1);

    // 2. EDoS Cloud Billing Calculation:
    // Uncapped scales up to 500 instances; Capped hardlimit is max 20 instances:
    const instancesRunning = cloudScalingModel === "uncapped_autoscaling"
      ? Math.min(500, Math.max(5, Math.round(attackRps / 100)))
      : 20;

    const hourlyCostPerInstance = 250; // ₹250 / hour for c5.4xlarge
    const totalAttackComputeCost = instancesRunning * hourlyCostPerInstance * attackDurationHours;
    const baselineMonthlyCost = 150000; // ₹1,50,000 baseline
    const projectedMonthlyBill = baselineMonthlyCost + totalAttackComputeCost * 5; // Assuming 5 attack bursts

    return {
      pCascade: pCascade.toFixed(1),
      resiliencyIndex,
      instancesRunning,
      totalAttackComputeCost: "₹" + totalAttackComputeCost.toLocaleString("en-IN"),
      projectedMonthlyBill: "₹" + projectedMonthlyBill.toLocaleString("en-IN"),
      badgeClass: parseFloat(pCascade) > 50
        ? "bg-rose-950 text-rose-300 border-rose-800"
        : parseFloat(pCascade) > 10
        ? "bg-amber-950 text-amber-300 border-amber-800"
        : "bg-emerald-950 text-emerald-300 border-emerald-800",
      statusMessage: oobIsolationActive
        ? `OUT-OF-BAND DARK FIBER ACTIVE: Industrial SCADA & Core Banking completely isolated from public WAN; cascading failure probability is 0.00%, Infrastructure Resiliency Index is 100.0%!`
        : cloudScalingModel === "capped_hardlimit"
        ? `STRICT AUTO-SCALING HARD CAP ACTIVE: ASG locked at max 20 instances; total attack compute cost capped at ${"₹" + totalAttackComputeCost.toLocaleString("en-IN")}, EDoS bankruptcy completely prevented!`
        : parseFloat(pCascade) > 60
        ? `CATASTROPHIC CASCADING GRID FAILURE: High failure rates in Telecom (${telecomFailureRate}%), Power (${powerGridFailureRate}%), and Banking (${bankingFailureRate}%) create an ${pCascade.toFixed(1)}% cascading regional collapse probability; uncapped auto-scaler generated a ${"₹" + totalAttackComputeCost.toLocaleString("en-IN")} EDoS bill!`
        : `MODERATE INFRASTRUCTURE STRESS: Interdependent cascading collapse probability is ${pCascade.toFixed(1)}%; projected monthly cloud bill is ${"₹" + projectedMonthlyBill.toLocaleString("en-IN")}.`
    };
  }, [attackRps, attackDurationHours, cloudScalingModel, telecomFailureRate, powerGridFailureRate, bankingFailureRate, oobIsolationActive]);

  // Studio 4: Critical Infrastructure Hardening Production Code Database
  const codeDatabase = {
    terraform_autoscaling_edos_cap: {
      name: "Terraform AWS Auto-Scaling Hard Cap & CloudWatch EDoS Billing Alarm Webhook",
      code: `# Terraform Infrastructure-as-Code to Prevent Economic Denial of Sustainability (EDoS):
resource "aws_autoscaling_group" "kolkata_fintech_asg" {
  name                = "kolkata-fintech-asg"
  vpc_zone_identifier = [aws_subnet.private_subnet_a.id, aws_subnet.private_subnet_b.id]
  
  # 1. STRICT AUTO-SCALING HARD CAP (Prevents infinite instance scaling during Layer 7 floods!)
  max_size            = 20         # HARD LIMIT: Cluster will never exceed 20 instances!
  min_size            = 3
  desired_capacity    = 5
  
  health_check_type         = "ELB"
  health_check_grace_period = 300
}

# 2. CloudWatch Billing Alarm to Trigger Automated DDoS Mitigation Webhook
resource "aws_cloudwatch_metric_alarm" "edos_billing_alarm" {
  alarm_name          = "kolkata-edos-billing-circuit-breaker"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "EstimatedCharges"
  namespace           = "AWS/Billing"
  period              = 3600
  statistic           = "Maximum"
  threshold           = 50000      # Triggers if hourly billing exceeds ₹50,000!
  alarm_actions       = [aws_sns_topic.ddos_mitigation_webhook.arn]
}`,
      explanation: "Terraform configuration establishing a strict hard cap on auto-scaling groups (max 20 instances) and configuring a CloudWatch billing alarm webhook to prevent Economic Denial of Sustainability (EDoS) bankruptcies."
    },
    cisco_qos_dscp_scada_sh: {
      name: "Cisco IOS QoS DSCP Expedited Forwarding (EF/46) Priority Queue for SCADA Telemetry",
      code: `! Cisco IOS Router Configuration for Critical SCADA Substation Telemetry Protection:

! 1. Define Access List matching Critical SCADA Protocols (IEC 60870-5-104 & Modbus TCP)
ip access-list extended SCADA_CRITICAL_ACL
 permit tcp any any eq 2404        ! IEC 60870-5-104 Telemetry Port
 permit tcp any any eq 502         ! Modbus TCP Industrial Port
 permit udp any any eq 102         ! IEC 61850 GOOSE Trip Signals

! 2. Create Class Map matching SCADA traffic and DSCP Expedited Forwarding (EF)
class-map match-any CRITICAL_SCADA_CLASS
 match access-group name SCADA_CRITICAL_ACL
 match ip dscp ef                  ! DSCP 46 (Expedited Forwarding)

! 3. Establish Policy Map guaranteeing dedicated Priority Queue under 100% DDoS congestion
policy-map SUBSTATION_QOS_POLICY
 class CRITICAL_SCADA_CLASS
  priority level 1
  police rate percent 25           ! Guaranteed 25% dedicated non-drop bandwidth!
 class class-default
  fair-queue                       ! Drops attack flood packets during link congestion!

! 4. Apply Policy Map to Substation WAN Interface
interface GigabitEthernet0/0/1
 service-policy output SUBSTATION_QOS_POLICY`,
      explanation: "Cisco IOS router configuration establishing strict Quality of Service (QoS) with Expedited Forwarding (`EF` / DSCP 46), guaranteeing sub-second priority queueing for IEC 61850 and Modbus telemetry during heavy DDoS congestion."
    },
    dual_provider_dns_terraform: {
      name: "Terraform Dual-Provider Redundant Anycast DNS Architecture (Route 53 + Cloudflare)",
      code: `# Dual-Provider Redundant Anycast DNS to Eliminate Single Points of Failure (Dyn DNS Style):

# Provider 1: AWS Route 53 Authoritative DNS Zone
resource "aws_route53_zone" "primary_zone" {
  name = "fintech-core.in"
}

resource "aws_route53_record" "api_route53" {
  zone_id = aws_route53_zone.primary_zone.zone_id
  name    = "api.fintech-core.in"
  type    = "A"
  ttl     = 300
  records = ["103.25.10.50"]
}

# Provider 2: Cloudflare Redundant Authoritative DNS Zone
resource "cloudflare_zone" "secondary_zone" {
  account_id = var.cloudflare_account_id
  name       = "fintech-core.in"
}

resource "cloudflare_record" "api_cloudflare" {
  zone_id = cloudflare_zone.secondary_zone.id
  name    = "api"
  type    = "A"
  value   = "103.25.10.50"
  ttl     = 300
  proxied = true
}

# Result: If AWS Route 53 is hit with 1.5 Tbps flood, recursive resolvers seamlessly query Cloudflare!`,
      explanation: "Terraform configuration provisioning redundant, dual-provider Anycast DNS zones on AWS Route 53 and Cloudflare, completely eliminating DNS single points of failure like the 2016 Dyn DNS blackout."
    }
  };

  const activeCode = codeDatabase[activeCodeTab];

  // Studio 3: Regional West Bengal Pedagogical Case Studies
  const localScenarios = [
    {
      id: "kolkata_fintech_rtgs_defense",
      lead: "Mamata",
      role: "Lead FinTech Cryptography Architect",
      location: "Kolkata Salt Lake Sector V Financial Gateway",
      title: "Defending National RTGS & UPI Clearing Switches from Multi-Vector DDoS Floods",
      threatType: "NATIONAL BFSI CLEARING ATTACK (600 Gbps Multi-Vector Flood)",
      budget: "₹82,00,000",
      incident:
        "Adversaries launched a coordinated 600 Gbps volumetric and Layer 7 flood targeting interbank payment settlement gateways during end-of-year financial closing.",
      defenseStrategy:
        "Mamata deployed Dual-Provider Anycast DNS, engaged BGP Anycast cloud scrubbers, and routed critical interbank clearing over a dedicated private MPLS ring.",
      outcome: "600 Gbps flood scrubbed with 0% payment drop; ₹3,200 Crores in daily interbank RTGS settlements completed on schedule.",
      metrics: {
        attackPeakBandwidth: "600.0 Gbps",
        settlementVolumeProtected: "₹3,200 Crores",
        switchesHardened: "45 Core Banking Nodes",
        compliance: "RBI Master Direction on Cyber Security"
      }
    },
    {
      id: "barrackpore_scada_blackout_prevention",
      lead: "Debangshu",
      role: "Principal Industrial OT Security Officer",
      location: "Barrackpore 220kV State Power Transmission Grid",
      threatType: "SCADA TELEMETRY CONGESTION & CASCADING BLACKOUT THREAT",
      title: "Preventing Regional Blackout Cascades via Out-of-Band OPGW Dark Fiber",
      budget: "₹52,00,000",
      incident:
        "A 300 Gbps DDoS flood targeted substation border routers, threatening to delay IEC 61850 GOOSE trip signals and trigger transformer overloads across North 24 Parganas.",
      defenseStrategy:
        "Debangshu migrated all SCADA telemetry to dedicated Out-of-Band (OOB) OPGW Dark Fiber lines and configured Cisco QoS Expedited Forwarding (`EF`).",
      outcome: "Telemetry delay remained under 1.2 ms; protection relays tripped cleanly during grid surges; zero transformer damage; 100% regional power stability.",
      metrics: {
        telemetryLatency: "1.2 ms (Sub-second)",
        substationsHardened: "18 High-Voltage Nodes",
        powerGridStability: "100.0% Uptime",
        statutoryMandate: "NCIIPC Critical Power Infrastructure Directive"
      }
    },
    {
      id: "ichapur_hospital_icu_protection",
      lead: "Mahima",
      role: "Healthcare Data Protection Officer",
      location: "Ichapur Clinical Care & Oncology Center",
      threatType: "HEALTHCARE LIFE-SAFETY TELEMETRY ATTACK (ICU Monitor Flood)",
      title: "Protecting ICU Life-Safety Patient Telemetry from Cloud Collateral Outages",
      budget: "₹38,00,000",
      incident:
        "An 800 Gbps DDoS flood targeting a neighboring crypto tenant on a shared cloud rack caused collateral packet drops on the hospital's central ICU telemetry gateway.",
      defenseStrategy:
        "Mahima migrated ICU patient telemetry to an AWS Dedicated Host with an air-gapped private VLAN and local hardware fail-safe alarms.",
      outcome: "100% of real-time ECG and oxygen telemetry isolated from cloud noise; zero alarm latency; 120,000 electronic health records protected.",
      metrics: {
        telemetryAlarmUptime: "100.0%",
        patientRecordsProtected: "120,000 Oncology Records",
        compliance: "DPDP Act 2023 Section 8(5) & NABH",
        penaltyPrevented: "₹250 Crore DPDP Statutory Fine"
      }
    },
    {
      id: "jadavpur_cascading_model_research",
      lead: "Susmita & Abhronila",
      role: "Senior Cyber Security Researchers",
      location: "Jadavpur University Cryptographic Research Lab",
      threatType: "MATHEMATICAL MODELING OF CRITICAL INFRASTRUCTURE CASCADES",
      title: "Formulating the Interdependent Infrastructure Cascading Failure Model",
      budget: "₹31,00,000",
      incident:
        "Researchers modeled the failure propagation dynamics across 6 critical infrastructure sectors under multi-vector DDoS assaults.",
      defenseStrategy:
        "Susmita and Abhronila published their mathematical model in IEEE Transactions, proving that dedicated Out-of-Band channels reduce cascading failure probabilities from 80.5% to 0.0%.",
      outcome: "Published peer-reviewed mathematical proof; verified across 120,000 simulated national infrastructure failure scenarios.",
      metrics: {
        simulationTrials: "120,000 Test Trials",
        modelAccuracy: "99.9% Predictive Fit",
        modelFramework: "Cascading Interdependency Model",
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
                Topic 08
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Impact of DDoS Attacks on Critical Infrastructure and Cloud Services
            </h1>
            <p className="text-xs text-gray-400">
              CNII physical-cyber convergence, NCIIPC Section 70A, EDoS cloud billing explosions, multi-tenant collateral damage, and IT Act Section 66F.
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
              Critical National Information Infrastructure (CNII) &amp; Cloud Resilience
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              1. The Physical-Cyber Convergence: How DDoS Disrupts National Grids, Banking &amp; Cloud Systems
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              DDoS attacks against <strong>Critical National Information Infrastructure (CNII)</strong> and cloud ecosystems 
              transcend simple web server downtime, directly causing physical grid collapses, economic paralysis, and human life-safety hazards. 
              Under <strong>Section 70 &amp; 70A of the Indian IT Act 2000</strong>, the <strong>National Critical Information Infrastructure Protection Centre (NCIIPC)</strong> 
              oversees 6 vital sectors: <strong>1. Power &amp; Energy</strong> (SCADA 220kV protection relays), <strong>2. Banking &amp; BFSI</strong> (RTGS, UPI, NEFT switches), 
              <strong>3. Telecom &amp; Internet</strong> (Submarine cable landing stations in Mumbai/Chennai), <strong>4. Transport</strong> (Railway PRS), 
              <strong>5. Healthcare</strong> (ICU patient life-safety telemetry), and <strong>6. Government</strong> (Aadhaar UIDAI authentication). 
              In cloud environments, DDoS induces <strong>Economic Denial of Sustainability (EDoS)</strong> by exploiting auto-scaling clusters, 
              and causes <strong>Multi-Tenant Collateral Damage (Noisy Neighbor)</strong> across shared cloud availability zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CNII Kinetic Damage Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-rose-950/60 space-y-3 text-xs">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px] block">
                SCADA Kinetic Impact &amp; Physical Grid Meltdowns
              </span>
              <div className="bg-black/90 p-3 rounded font-mono text-rose-300 border border-rose-950/60 text-[11px]">
                DDoS router congestion &gt; 4ms ➔ Protection relays fail to trip ➔ ₹10 Crore Transformers melt!
              </div>
              <p className="text-gray-300 leading-relaxed">
                Industrial SCADA telemetry requires sub-second timing. Flooding boundary routers prevents trip signals from isolating short circuits, triggering cascading blackout waves across regional power grids.
              </p>
            </div>

            {/* Cloud EDoS & Isolation Box */}
            <div className="bg-[#050811] p-5 rounded-xl border border-emerald-950/60 space-y-3 text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
                EDoS Cloud Hardening &amp; Out-of-Band Networks
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>• <strong className="text-cyan-300">Auto-Scaling Hard Caps:</strong> `max_size = 20` prevents ₹45 Lakh EDoS cloud billing explosions.</li>
                <li>• <strong className="text-purple-300">Out-of-Band (OOB) Dark Fiber:</strong> Completely isolates SCADA telemetry from public internet WANs.</li>
                <li>• <strong className="text-amber-300">Dual-Provider Anycast DNS:</strong> Route 53 + Cloudflare eliminates Dyn DNS-style single points of failure.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Semantic Animated SVG - Critical Infrastructure Visualizer */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              National Infrastructure Defense Pipeline Visualizer
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              2. Visualizing National Anycast Scrubbing vs Critical Power, Banking &amp; Healthcare Infrastructure
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Follow how a 1.2 Tbps volumetric flood targeting India's national infrastructure is scrubbed by Tier-1 Anycast centers, 
              preserving Out-of-Band SCADA power grids, core banking RTGS clearing, and hospital ICU patient monitors:
            </p>
          </div>

          <div className="bg-[#050811] p-4 sm:p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center overflow-x-auto">
            <svg
              className="w-full max-w-4xl h-auto min-w-[720px]"
              viewBox="0 0 880 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* STAGE 1: INGRESS MULTI-TERABIT FLOOD */}
              <g transform="translate(30, 60)">
                <rect width="140" height="140" rx="10" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  1. 1.2 TBPS FLOOD
                </text>
                <text x="70" y="44" fill="#7dd3fc" fontSize="8.5" textAnchor="middle">
                  State-Sponsored Attack
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#0c4a6e" />
                <text x="70" y="74" fill="#bae6fd" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TARGET TARGETS:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Power Grid / Banking
                </text>
                <text x="70" y="106" fill="#7dd3fc" fontSize="7.5" textAnchor="middle">
                  Healthcare &amp; UIDAI
                </text>
              </g>

              {/* ARROW 1 */}
              <path d="M 170 130 L 200 130" stroke="#38bdf8" strokeWidth="3" fill="none" />

              {/* STAGE 2: NATIONAL ANYCAST SCRUBBING MESH */}
              <g transform="translate(200, 60)">
                <rect width="140" height="140" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  2. ANYCAST MESH
                </text>
                <text x="70" y="44" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">
                  10 Tbps Scrubbing PoPs
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#312e81" />
                <text x="70" y="74" fill="#a5b4fc" fontSize="8" fontWeight="bold" textAnchor="middle">
                  NCIIPC SCRUBBING:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  300 Global PoPs
                </text>
                <text x="70" y="106" fill="#c7d2fe" fontSize="7.5" textAnchor="middle">
                  Dilutes 1.2 Tbps Ingress!
                </text>
              </g>

              {/* ARROW 2 */}
              <path d="M 340 130 L 370 130" stroke="#818cf8" strokeWidth="3" fill="none" />

              {/* STAGE 3: OUT-OF-BAND DARK FIBER ISOLATION */}
              <g transform="translate(370, 60)">
                <rect width="140" height="140" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  3. OOB DARK FIBER
                </text>
                <text x="70" y="44" fill="#fecdd3" fontSize="8.5" textAnchor="middle">
                  Zero Public Exposure
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#4c0519" />
                <text x="70" y="74" fill="#fda4af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  PHYSICAL ISOLATION:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  OPGW Power Grid Lines
                </text>
                <text x="70" y="106" fill="#fecdd3" fontSize="7.5" textAnchor="middle">
                  Private Interbank Rings
                </text>
              </g>

              {/* ARROW 3 */}
              <path d="M 510 130 L 540 130" stroke="#f43f5e" strokeWidth="3" fill="none" />

              {/* STAGE 4: CISCO QOS DSCP EXPEDITED FORWARDING */}
              <g transform="translate(540, 60)">
                <rect width="140" height="140" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  4. QOS PRIORITY
                </text>
                <text x="70" y="44" fill="#fde68a" fontSize="8.5" textAnchor="middle">
                  DSCP EF (46) Priority
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#78350f" />
                <text x="70" y="74" fill="#fcd34d" fontSize="8" fontWeight="bold" textAnchor="middle">
                  SUB-SECOND SLA:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  SCADA Latency &lt; 1.5ms
                </text>
                <text x="70" y="106" fill="#fde68a" fontSize="7.5" textAnchor="middle">
                  RTGS 100% Priority!
                </text>
              </g>

              {/* ARROW 4 */}
              <path d="M 680 130 L 710 130" stroke="#f59e0b" strokeWidth="3" fill="none" />

              {/* STAGE 5: RESILIENT CRITICAL INFRASTRUCTURE */}
              <g transform="translate(710, 60)">
                <rect width="140" height="140" rx="10" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="70" y="26" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. PROTECTED CNII
                </text>
                <text x="70" y="44" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">
                  100% National Uptime
                </text>
                <rect x="10" y="55" width="120" height="70" rx="6" fill="#064e3b" />
                <text x="70" y="74" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">
                  NATIONAL STABILITY:
                </text>
                <text x="70" y="90" fill="#ffffff" fontSize="7.5" textAnchor="middle">
                  Power Grid Frequency 50Hz
                </text>
                <text x="70" y="106" fill="#a7f3d0" fontSize="7.5" textAnchor="middle">
                  ICU Alarms 100% Active!
                </text>
              </g>
            </svg>
          </div>
        </section>

        {/* SECTION 3: Studio 1 - 8-Vector Infrastructure Inspector */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Concept Studio 1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              3. Critical Infrastructure &amp; Cloud Threat Vector Inspector
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Select a critical national infrastructure sector or cloud threat vector below to examine its statutory governance, 
              exploitation vector, vulnerability impact, telemetry indicators, and resilient defense:
            </p>
          </div>

          {/* Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {Object.values(infrastructureDatabase).map((item) => (
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
                  CNII SECTOR
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
                  <span className="text-xs px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-cyan-400 font-mono">
                    Sector: {activeThreat.cniiSector}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 font-bold font-mono">
                    {activeThreat.statutorySection}
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
                    Resilient Enterprise Defense &amp; Countermeasures
                  </span>
                  <p className="text-gray-300 leading-relaxed">{activeThreat.resilientDefense}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800 space-y-1.5">
                  <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
                    Technical Mechanism / Timing SLA Example
                  </span>
                  <pre className="bg-black/90 p-3 rounded font-mono text-[11px] text-indigo-200 overflow-x-auto whitespace-pre-wrap border border-indigo-950/50">
                    {activeThreat.codeSnippet}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Studio 2 - Live Cascading Failure & EDoS Laboratory */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Concept Studio 2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              4. Critical Infrastructure Cascading Failure &amp; Cloud EDoS Laboratory
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Adjust attack request rate R_attack, cloud auto-scaling model (Uncapped vs Capped Hardlimit), 
              and interdependent sector failure rates to model cascading collapse probability P_cascade = 1 - ∏ (1 - p_i) and cloud compute billing:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Input Controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Grid &amp; Cloud Simulation Variables</h3>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Attack Request Rate (R_attack):</span>
                  <span className="text-rose-400 font-bold font-mono">{attackRps.toLocaleString()} RPS</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="2000"
                  value={attackRps}
                  onChange={(e) => setAttackRps(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-gray-400">
                  <span>Attack Burst Duration:</span>
                  <span className="text-amber-400 font-bold font-mono">{attackDurationHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={attackDurationHours}
                  onChange={(e) => setAttackDurationHours(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-gray-800"
                />
              </div>

              <div className="space-y-1">
                <span className="text-gray-400 block">Cloud Auto-Scaling Model:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCloudScalingModel("uncapped_autoscaling")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      cloudScalingModel === "uncapped_autoscaling"
                        ? "bg-rose-950 border-rose-500 text-rose-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Uncapped (Max 500)
                  </button>
                  <button
                    onClick={() => setCloudScalingModel("capped_hardlimit")}
                    className={clsx(
                      "p-2 rounded border font-bold text-[10px] transition-all",
                      cloudScalingModel === "capped_hardlimit"
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-gray-950 border-gray-800 text-gray-400"
                    )}
                  >
                    Capped (Max 20)
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-gray-800">
                <span className="text-gray-400 block font-bold text-[10px] uppercase">Interdependent Sector Failure Probabilities:</span>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Telecom Sector (p1):</span>
                    <span className="text-cyan-400 font-mono font-bold">{telecomFailureRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={telecomFailureRate}
                    onChange={(e) => setTelecomFailureRate(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 bg-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Power Grid (p2):</span>
                    <span className="text-amber-400 font-mono font-bold">{powerGridFailureRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={powerGridFailureRate}
                    onChange={(e) => setPowerGridFailureRate(parseInt(e.target.value))}
                    className="w-full accent-amber-500 bg-gray-800"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>Banking BFSI (p3):</span>
                    <span className="text-purple-400 font-mono font-bold">{bankingFailureRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="5"
                    value={bankingFailureRate}
                    onChange={(e) => setBankingFailureRate(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-gray-400 block">Out-of-Band (OOB) Dark Fiber Isolation:</span>
                <button
                  onClick={() => setOobIsolationActive(!oobIsolationActive)}
                  className={clsx(
                    "w-full p-2.5 rounded-lg border font-bold text-xs transition-all",
                    oobIsolationActive
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50"
                      : "bg-gray-950 border-gray-800 text-gray-400"
                  )}
                >
                  {oobIsolationActive ? "✔ OOB DARK FIBER ACTIVE (0% Failure)" : "❌ NO OOB ISOLATION (Full Risk)"}
                </button>
              </div>
            </div>

            {/* Calculated Output Metrics */}
            <div className="bg-[#050811] p-5 rounded-xl border border-gray-800 col-span-1 md:col-span-2 space-y-4 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">National Resiliency &amp; EDoS Billing Telemetry</h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Cascading Interdependency Failure Probability</span>
                  <span className="text-lg font-extrabold text-rose-400">{simulationResults.pCascade}%</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Resiliency Index: {simulationResults.resiliencyIndex}%</span>
                </div>

                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-[10px] uppercase block">Projected Monthly Cloud Compute Bill (EDoS)</span>
                  <span className="text-lg font-extrabold text-amber-400">{simulationResults.projectedMonthlyBill}</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Active Instances: {simulationResults.instancesRunning} EC2 Nodes</span>
                </div>
              </div>

              <div className={clsx("p-4 rounded-lg border font-mono text-xs", simulationResults.badgeClass)}>
                <span className="font-bold block uppercase tracking-wider text-[10px]">National Infrastructure Assessment:</span>
                <p className="mt-1 font-extrabold text-sm leading-relaxed">{simulationResults.statusMessage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Studio 4 - Critical Infrastructure Hardening Code Studio */}
        <section className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-gray-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Infrastructure-as-Code &amp; SCADA QoS Studio
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              5. Production Terraform EDoS Caps &amp; Cisco QoS SCADA Hardening Studio
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Explore Terraform auto-scaling hard cap policies, Cisco IOS QoS DSCP Expedited Forwarding priority queues for SCADA, 
              and dual-provider redundant Anycast DNS architectures:
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
                Production Policy
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
              Explore how cybersecurity leaders Mamata, Debangshu, Mahima, and Susmita protect national RTGS switches, 
              isolate 220kV SCADA power grids, and safeguard ICU patient life-safety monitors across West Bengal:
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
                  The Incident &amp; Infrastructure Threat Vector
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
              7. Legal Penalties for Attacks on Protected Systems &amp; Cyber Terrorism in India
            </h2>
            <p className="text-sm text-gray-300 mt-2">
              Indian cyber law, national infrastructure protection mandates, and criminal mischief statutes 
              strictly penalize DDoS attacks targeting designated Protected Systems and cloud services with severe civil compensation liabilities and life imprisonment:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="bg-gray-950 p-5 rounded-xl border border-rose-950 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                IT Act 2000 Section 66F
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Cyber Terrorism:</strong> Attacks paralyzing critical power or banking systems carry <span className="text-rose-400 font-bold">LIFE IMPRISONMENT</span>.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-blue-950 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                IT Act Section 70 &amp; 70A
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">Section 70:</strong> Protected Systems DDoS (Up to <span className="text-rose-400 font-bold">10 YEARS PRISON</span>).
                </li>
                <li>
                  <strong className="text-white">Section 70A:</strong> NCIIPC National Infrastructure Oversight.
                </li>
              </ul>
            </div>

            <div className="bg-gray-950 p-5 rounded-xl border border-emerald-950 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                DPDP Act 2023 &amp; IT Act 43(f)
              </span>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <strong className="text-white">DPDP Section 33:</strong> Fines up to <span className="text-rose-400 font-bold">₹250 CRORES</span> for critical data availability collapse.
                </li>
                <li>
                  <strong className="text-white">IT Act 43(f):</strong> Civil damages up to <span className="text-rose-400 font-bold">₹1 CRORE</span> for denial of access.
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
                  <strong>Leaving Cloud Auto-Scaling Groups Uncapped:</strong> Allows EDoS attacks to bankrupt the business with ₹45 Lakh bills.
                </li>
                <li>
                  <strong>Relying on a Single Authoritative DNS Provider:</strong> Replicates the single-point-of-failure 2016 Dyn DNS blackout.
                </li>
                <li>
                  <strong>Exposing Industrial SCADA Telemetry to Public WAN:</strong> Risks transformer physical damage from delayed trip signals.
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
                  <strong>Deploy Out-of-Band (OOB) Dark Fiber:</strong> Isolates power grid telemetry completely from public internet attacks.
                </li>
                <li>
                  <strong>Configure Cisco QoS DSCP Expedited Forwarding:</strong> Guarantees sub-second priority for SCADA and banking clearing.
                </li>
                <li>
                  <strong>Establish Dual-Provider Anycast DNS (Route 53 + Cloudflare):</strong> Guarantees 100% DNS availability.
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
                  Why does a delay of only 4.5 milliseconds in SCADA protection relay telemetry cause physical high-voltage transformer meltdowns?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Observe carefully...</span>
                  How does Economic Denial of Sustainability (EDoS) achieve the goal of taking a service down without ever making it return an HTTP error code?
                </li>
                <li className="p-2 bg-gray-900 rounded border border-gray-800">
                  <span className="text-indigo-300 font-bold block">Try changing this...</span>
                  In the laboratory above, activate Out-of-Band Dark Fiber Isolation and observe cascading failure probability collapse to 0.00%!
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
                <span>Section 70 of the IT Act penalizes attacks on designated Protected Systems with up to 10 years prison.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Section 66F penalizes DDoS cyber terrorism against critical national infrastructure with Life Imprisonment.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Economic Denial of Sustainability (EDoS) bankrupts cloud victims by exploiting auto-scaling clusters.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Multi-tenant noisy neighbor contamination causes collateral outages on innocent cloud co-tenants.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Out-of-band (OOB) dark fiber isolates industrial SCADA telemetry from public internet DDoS attacks.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-900 rounded border border-gray-800">
                <span className="text-emerald-400">✔</span>
                <span>Dual-provider Anycast DNS eliminates catastrophic DNS single points of failure (Dyn DNS).</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section className="space-y-4">
          <FAQTemplate
            title="Critical Infrastructure & Cloud DDoS FAQs"
            subtitle="30 Moderate to Expert Practice Questions & CNII Defense Deep Dives"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint Component */}
        <section className="space-y-4">
          <PlainTextPrint
            content={noteText}
            title="Impact of DDoS Attacks on Critical Infrastructure and Cloud Services (Printable Study Guide)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

        {/* SECTION 11: Dedicated Teacher's Note */}
        <section className="pt-4">
          <Teacher
            note="Teacher's Note: Protecting Critical National Information Infrastructure (CNII) and cloud architectures from DDoS attacks represents the ultimate test of cybersecurity engineering, where digital packets directly intersect with physical electrical grid stability, national financial solvency, and human life-safety! Understand the 6 core sectors governed by NCIIPC under Section 70A of the IT Act: Power & Energy, Banking & BFSI, Telecom & Internet, Transportation, Healthcare, and Government Services. Master the physics of kinetic SCADA impact: high-voltage protection relays require IEC 61850 trip signals in under 4 milliseconds to isolate short circuits; router congestion delays signals, melting ₹10 Crore transformers and triggering cascading regional blackouts. In cloud environments, understand Economic Denial of Sustainability (EDoS): attackers exploit auto-scaling EC2 clusters to force bills to explode from ₹50,000 to ₹45,00,000, and Multi-Tenant Noisy Neighbor contamination where shared Top-of-Rack switches drop packets for innocent co-hosted medical and banking tenants. Master enterprise defenses: deploy Out-of-Band (OOB) dark fiber lines along power transmission towers, enforce strict auto-scaling hard caps (`max_size = 20`) with CloudWatch billing alarm webhooks, establish dual-provider Anycast DNS (Route 53 + Cloudflare) to eliminate Dyn DNS single points of failure, and configure Cisco QoS DSCP Expedited Forwarding (`EF` / DSCP 46) for sub-second SCADA priority. Remember that Section 70 of the Indian IT Act penalizes attacks on designated Protected Systems with up to 10 years imprisonment, and Section 66F treats cyber terrorism against national infrastructure with Life Imprisonment!"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
